// Reads the repository: active talks, their slide lists, and Git state.
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);

// lib/ → talk-review/ → extensions/ → .github/ → repository root
export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
export const SLIDES_ROOT = path.join(REPO_ROOT, 'slides');
const TALKS_DIR = path.join(REPO_ROOT, 'tech-talks');
const DECKS_DIR = path.join(SLIDES_ROOT, 'tech-talks');

export class RepoError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export function assertRepo() {
  if (!existsSync(TALKS_DIR) || !existsSync(DECKS_DIR)) {
    throw new RepoError('repo_not_found', `Expected tech-talks/ and slides/tech-talks/ under ${REPO_ROOT}.`);
  }
}

function parseFrontmatter(text) {
  const src = text.replace(/\r\n/g, '\n');
  if (!src.startsWith('---\n')) return { fm: {}, body: src };
  const end = src.indexOf('\n---', 4);
  if (end < 0) return { fm: {}, body: src };
  const fm = {};
  for (const line of src.slice(4, end).split('\n')) {
    const m = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return { fm, body: src.slice(end + 4) };
}

export async function listTalks() {
  assertRepo();
  const talks = [];
  for (const entry of await readdir(TALKS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const readme = path.join(TALKS_DIR, entry.name, 'README.md');
    if (!existsSync(readme)) continue;
    const { fm, body } = parseFrontmatter(await readFile(readme, 'utf8'));
    if (fm.status !== 'active') continue;
    const slug = entry.name;
    const title = (/^# (.+)$/m.exec(body)?.[1] ?? slug).trim();
    const kind = existsSync(path.join(DECKS_DIR, slug, 'slides.js')) ? 'native'
      : existsSync(path.join(DECKS_DIR, `${slug}.md`)) ? 'slidev' : 'none';
    talks.push({ slug, title, section: fm.section ?? '', updated: fm.updated ?? '', exec: slug.startsWith('exec-'), kind });
  }
  return talks.sort((a, b) => a.slug.localeCompare(b.slug));
}

const slideCache = new Map();

export async function loadSlides(talk) {
  const file = talk.kind === 'native' ? path.join(DECKS_DIR, talk.slug, 'slides.js')
    : talk.kind === 'slidev' ? path.join(DECKS_DIR, `${talk.slug}.md`) : null;
  if (!file) return [];
  const { mtimeMs } = await stat(file);
  const hit = slideCache.get(file);
  if (hit && hit.mtimeMs === mtimeMs) return hit.slides;
  const text = await readFile(file, 'utf8');
  let slides;
  if (talk.kind === 'native') {
    // slides.js is the repository's own deck data: an IIFE that assigns window.DECK.
    const sandbox = { window: {} };
    try {
      vm.runInNewContext(text, sandbox, { timeout: 2000, filename: file });
    } catch (err) {
      throw new RepoError('deck_unreadable', `Could not read ${path.relative(REPO_ROOT, file)}: ${err.message}`);
    }
    const list = sandbox.window.DECK?.slides;
    if (!Array.isArray(list)) throw new RepoError('deck_unreadable', `${path.relative(REPO_ROOT, file)} did not define window.DECK.slides.`);
    slides = list.map((s, i) => ({
      n: i + 1, id: String(s.id ?? `slide-${i + 1}`), part: Number.isInteger(s.part) ? s.part : 0,
      title: String(s.title ?? ''), seconds: Number.isFinite(s.seconds) ? s.seconds : null
    }));
  } else {
    slides = [...text.matchAll(/<!--\s*SLIDE:\s*(.+?)\s*-->/g)].map((m, i) => ({
      n: i + 1, id: `slide-${i + 1}`, part: 0, title: m[1], seconds: null
    }));
  }
  slideCache.set(file, { mtimeMs, slides });
  return slides;
}

let gitCache = { at: 0, value: null };

async function git(args) {
  try {
    const { stdout } = await run('git', args, { cwd: REPO_ROOT, maxBuffer: 8 * 1024 * 1024, windowsHide: true });
    return stdout;
  } catch {
    return null;
  }
}

export async function gitState() {
  if (gitCache.value && Date.now() - gitCache.at < 3000) return gitCache.value;
  const status = await git(['status', '--porcelain=v1', '--untracked-files=all']);
  const ahead = await git(['log', '@{u}..HEAD', '--name-only', '--format=']);
  const clean = (p) => p.trim().replace(/^"|"$/g, '');
  const dirty = (status ?? '').split('\n').filter(Boolean).map((l) => clean(l.slice(3).split(' -> ').pop()));
  const unpushed = [...new Set((ahead ?? '').split('\n').map(clean).filter(Boolean))];
  const value = { available: status !== null, hasUpstream: ahead !== null, dirty, unpushed };
  gitCache = { at: Date.now(), value };
  return value;
}

export function gitCounts(state, slug) {
  const mine = (p) => p.startsWith(`tech-talks/${slug}/`) || p.startsWith(`slides/tech-talks/${slug}/`) || p === `slides/tech-talks/${slug}.md`;
  return { uncommitted: state.dirty.filter(mine).length, unpushed: state.unpushed.filter(mine).length };
}

export function deckLink(talk, slide) {
  if (talk.kind !== 'native') return null;
  return `/deck/tech-talks/${encodeURIComponent(talk.slug)}/index.html${slide ? `#${encodeURIComponent(slide.id)}` : ''}`;
}
