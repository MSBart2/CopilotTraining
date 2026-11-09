// One loopback HTTP server per canvas instance: page, JSON API, live events, and read-only deck files.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SLIDES_ROOT } from './repo.mjs';

const PUBLIC_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const PAGES = { '/': ['index.html', 'text/html'], '/app.js': ['app.js', 'text/javascript'], '/app.css': ['app.css', 'text/css'] };
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const DECK_PREFIXES = ['native/', 'tech-talks/'];
const MAX_BODY = 64 * 1024;

const send = (res, code, body, type = 'application/json') => {
  res.writeHead(code, { 'content-type': `${type}; charset=utf-8`, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(type === 'application/json' ? JSON.stringify(body) : body);
};

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(Object.assign(new Error('Request body too large.'), { status: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); }
      catch { reject(Object.assign(new Error('Request body must be JSON.'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

export class InstanceServer {
  constructor({ api, log }) {
    this.api = api;
    this.log = log;
    this.clients = new Set();
    this.focus = null;
    this.server = http.createServer((req, res) => this.route(req, res).catch((err) => {
      const status = err.status ?? (err.code ? 400 : 500);
      if (status >= 500) this.log?.(`talk-review: ${err.message}`);
      if (!res.headersSent) send(res, status, { error: err.message, code: err.code ?? 'error' });
      else res.end();
    }));
  }

  async start() {
    await new Promise((resolve, reject) => {
      this.server.once('error', reject);
      this.server.listen(0, '127.0.0.1', resolve);
    });
    this.port = this.server.address().port;
    this.origin = `http://127.0.0.1:${this.port}`;
    this.ping = setInterval(() => this.emit('ping', {}), 25000);
    return this;
  }

  get url() { return `${this.origin}/`; }
  get live() { return this.server.listening; }

  emit(event, data) {
    const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of this.clients) res.write(frame);
  }

  setFocus(slug) {
    this.focus = slug ?? null;
    this.emit('focus', { talk: this.focus });
  }

  async close() {
    clearInterval(this.ping);
    for (const res of this.clients) res.end();
    this.clients.clear();
    await new Promise((resolve) => this.server.close(() => resolve()));
  }

  async route(req, res) {
    // Loopback only: reject other hosts (DNS rebinding) and cross-origin writes.
    if (req.headers.host !== `127.0.0.1:${this.port}`) return send(res, 421, { error: 'Unexpected host.' });
    const url = new URL(req.url, this.origin);
    const p = url.pathname;

    if (req.method === 'GET' && PAGES[p]) {
      const [file, type] = PAGES[p];
      return send(res, 200, await readFile(path.join(PUBLIC_DIR, file), 'utf8'), type);
    }
    if (req.method === 'GET' && p === '/api/board') return send(res, 200, { ...(await this.api.board()), focus: this.focus });
    if (req.method === 'GET' && p === '/api/talk') return send(res, 200, await this.api.talk(url.searchParams.get('talk')));
    if (req.method === 'GET' && p === '/api/events') {
      res.writeHead(200, { 'content-type': 'text/event-stream', 'cache-control': 'no-store', connection: 'keep-alive' });
      res.write(`event: focus\ndata: ${JSON.stringify({ talk: this.focus })}\n\n`);
      this.clients.add(res);
      req.on('close', () => this.clients.delete(res));
      return;
    }
    if (req.method === 'GET' && p.startsWith('/deck/')) return this.deck(res, p.slice('/deck/'.length));

    if (req.method === 'POST' && p.startsWith('/api/')) {
      if (req.headers.origin && req.headers.origin !== this.origin) return send(res, 403, { error: 'Cross-origin request rejected.' });
      if (!(req.headers['content-type'] ?? '').startsWith('application/json')) return send(res, 415, { error: 'Content-Type must be application/json.' });
      const body = await readJson(req);
      if (p === '/api/stage') return send(res, 200, await this.api.setStage(body.talk, body.stage));
      if (p === '/api/talk-note') return send(res, 200, await this.api.setTalkNote(body.talk, body.note));
      if (p === '/api/slide') return send(res, 200, await this.api.setSlide(body.talk, body.slide, body.status, body.note));
    }
    return send(res, 404, { error: 'Not found.' });
  }

  async deck(res, rel) {
    let decoded;
    try { decoded = decodeURIComponent(rel); } catch { return send(res, 400, { error: 'Bad path.' }); }
    if (decoded.includes('\0') || decoded.split(/[\\/]/).includes('..') || !DECK_PREFIXES.some((x) => decoded.startsWith(x))) {
      return send(res, 404, { error: 'Not found.' });
    }
    const file = path.resolve(SLIDES_ROOT, decoded);
    const type = TYPES[path.extname(file).toLowerCase()];
    if (!file.startsWith(SLIDES_ROOT + path.sep) || !type) return send(res, 404, { error: 'Not found.' });
    try {
      if (!(await stat(file)).isFile()) return send(res, 404, { error: 'Not found.' });
    } catch { return send(res, 404, { error: 'Not found.' }); }
    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
    res.end(await readFile(file));
  }
}
