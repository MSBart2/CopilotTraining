#!/usr/bin/env node
/*
  Validate a native HTML deck.
  Usage: node scripts/validate-native-deck.mjs tech-talks/surfaces [--shots <dir>] [--live] [--only 1,5,6]
  Serves slides/ over HTTP, then checks every slide for runtime errors, scene labels,
  text that escapes the 1600×900 frame, overlapping scene text, text that spills out of its card, keyboard and hash
  navigation, and one PDF page per slide. Exits non-zero on any failure.
*/
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const args = process.argv.slice(2);
const deckRel = args.find((a) => !a.startsWith('--'))?.replace(/\\/g, '/').replace(/\/$/, '');
if (!deckRel) { console.error('usage: validate-native-deck.mjs <category/slug> [--shots dir] [--live] [--only 1,2]'); process.exit(2); }
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const shots = flag('--shots');
const live = args.includes('--live');
const only = flag('--only')?.split(',').map(Number);

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/${deckRel}/`;

const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('requestfailed', (r) => errors.push(`request failed: ${r.url()}`));
page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });

await page.goto(`${base}index.html?settled`);
await page.waitForFunction(() => window.DeckRuntime);
const deck = await page.evaluate(() => window.DECK.slides.map((s) => ({ id: s.id, title: s.title })));
const overrides = await page.evaluate(() => Object.keys(window.SCENES || {}).filter((k) => (window.FRAMES && k in window.FRAMES) || (window.PATTERNS && k in window.PATTERNS)));
for (const k of overrides) console.warn(`warning: deck scene "${k}" overrides a shared frame or pattern; promote the improvement to slides/native/ or rename the scene`);
if (shots) fs.mkdirSync(shots, { recursive: true });

const inspect = () => page.evaluate(() => {
  const slide = document.querySelector('.slide.is-current');
  const stage = slide.querySelector('.stage').getBoundingClientRect();
  const pending = !!slide.querySelector('.pending');
  const scenes = [...slide.querySelectorAll('svg.scene')];
  const unlabeled = scenes.filter((s) => !s.getAttribute('aria-label')).length;
  const out = [];
  const texts = [...slide.querySelectorAll('.stage-body :is(h1,h2,p,li,.pill), svg.scene text')];
  for (const el of texts) {
    const r = el.getBoundingClientRect();
    if (!r.width) continue;
    if (r.left < stage.left - 1 || r.right > stage.right + 1 || r.top < stage.top - 1 || r.bottom > stage.bottom + 1)
      out.push(`"${el.textContent.trim().slice(0, 40)}" leaves the frame`);
  }
  const progress = slide.querySelector('.deck-progress')?.getBoundingClientRect();
  const body = [...slide.querySelectorAll('.stage-body > *')];
  if (progress) for (const el of body) {
    const r = el.getBoundingClientRect();
    if (r.height && r.bottom > progress.top + 2) out.push(`<${el.tagName.toLowerCase()}${el.className?.baseVal !== undefined ? ` class="${el.className.baseVal}"` : el.className ? ` class="${el.className}"` : ''}> runs into the progress bar`);
  }
  const svgTexts = [...slide.querySelectorAll('svg.scene text')].map((t) => ({ t: t.textContent.trim(), r: t.getBoundingClientRect() })).filter((x) => x.r.width);
  for (let i = 0; i < svgTexts.length; i += 1) for (let j = i + 1; j < svgTexts.length; j += 1) {
    const a = svgTexts[i].r; const b = svgTexts[j].r;
    const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (w > 3 && h > 3) out.push(`text overlap: "${svgTexts[i].t}" × "${svgTexts[j].t}"`);
  }
  // Text that straddles the edge of a card drawn in the same group has outgrown its card.
  for (const t of slide.querySelectorAll('svg.scene text')) {
    const a = t.getBoundingClientRect();
    if (!a.width) continue;
    for (const box of t.parentNode.querySelectorAll(':scope > rect:is(.box,.zone)')) {
      const b = box.getBoundingClientRect();
      const w = Math.min(a.right, b.right) - Math.max(a.left, b.left);
      const h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      const inside = a.left >= b.left - 2 && a.right <= b.right + 2 && a.top >= b.top - 2 && a.bottom <= b.bottom + 2;
      if (w > 3 && h > 3 && !inside) out.push(`"${t.textContent.trim().slice(0, 40)}" spills out of its card`);
    }
  }
  return { id: slide.id, pending, scenes: scenes.length, unlabeled, problems: out };
});

const report = [];
for (let i = 0; i < deck.length; i += 1) {
  const n = i + 1;
  if (only && !only.includes(n)) continue;
  await page.evaluate((h) => { location.hash = h; }, `#${n}`);
  await page.waitForFunction((id) => document.querySelector('.slide.is-current')?.id === id, deck[i].id);
  await page.evaluate(() => document.fonts.ready);
  const r = await inspect();
  const where = `${String(n).padStart(2, '0')} ${r.id}`;
  if (!r.pending && r.unlabeled) fail(where, `${r.unlabeled} scene SVG without aria-label`);
  r.problems.forEach((p) => fail(where, p));
  report.push(`${where.padEnd(28)} ${r.pending ? 'pending' : `${r.scenes} scene(s)`}${r.problems.length ? `  ⚠ ${r.problems.length}` : ''}`);
  if (shots) await page.locator('.slide.is-current .viewport').screenshot({ path: path.join(shots, `${String(n).padStart(2, '0')}-${r.id}.png`) });
}

if (shots && live) {
  const lp = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  lp.on('pageerror', (e) => errors.push(e.message));
  for (let i = 0; i < deck.length; i += 1) {
    const n = i + 1;
    if (only && !only.includes(n)) continue;
    await lp.goto(`${base}index.html#${n}`);
    await lp.waitForFunction(() => document.querySelector('.slide.is-current.is-live'));
    for (const t of [500, 2500]) {
      await lp.waitForTimeout(t === 500 ? 500 : 2000);
      await lp.locator('.slide.is-current .viewport').screenshot({ path: path.join(shots, `${String(n).padStart(2, '0')}-${deck[i].id}.live-${t}.png`) });
    }
  }
  await lp.close();
}

/* Navigation */
await page.goto(`${base}index.html?settled#1`);
await page.waitForFunction(() => window.DeckRuntime);
const at = () => page.evaluate(() => window.DeckRuntime.index);
await page.keyboard.press('ArrowRight');
if ((await at()) !== 1) fail('nav', 'ArrowRight did not advance');
await page.keyboard.press('ArrowLeft');
if ((await at()) !== 0) fail('nav', 'ArrowLeft did not go back');
await page.keyboard.press('End');
if ((await at()) !== deck.length - 1) fail('nav', 'End did not reach the last slide');
await page.keyboard.press('Home');
if ((await at()) !== 0) fail('nav', 'Home did not reach the first slide');
await page.goto(`${base}index.html#${deck[Math.min(4, deck.length - 1)].id}`);
await page.waitForFunction(() => window.DeckRuntime);
if ((await at()) !== Math.min(4, deck.length - 1)) fail('nav', 'id hash deep link failed');
await page.goto(`${base}index.html?slide=${Math.min(3, deck.length)}`);
await page.waitForFunction(() => window.DeckRuntime);
if ((await at()) !== Math.min(2, deck.length - 1)) fail('nav', 'numeric ?slide= deep link failed');

/* Notes page renders every slide */
const notes = await browser.newPage({ viewport: { width: 1200, height: 900 } });
notes.on('pageerror', (e) => errors.push(`notes: ${e.message}`));
await notes.goto(`${base}notes.html`);
const notesCount = await notes.locator('#notes article').count();
if (notesCount !== deck.length) fail('notes', `${notesCount} articles for ${deck.length} slides`);

/* Notes are the talk's teaching source: every slide carries a talk track and a time budget. */
const talk = await page.evaluate(() => window.DECK.slides.map((s) => ({
  id: s.id, seconds: s.seconds || 0,
  lines: [...(s.notes || []), ...(s.know || []), ...(s.cue || [])].map(String)
})));
const unnoted = talk.filter((s) => !s.lines.length).map((s) => s.id);
const untimed = talk.filter((s) => !s.seconds).map((s) => s.id);
if (unnoted.length) console.warn(`warning: no speaker notes on ${unnoted.join(', ')}`);
if (untimed.length) console.warn(`warning: no seconds budget on ${untimed.join(', ')}`);
for (const s of talk) {
  if (s.lines.some((l) => /\bshould\b/i.test(l))) fail(`notes ${s.id}`, 'uses "should"; state the requirement, condition, or capability directly');
  if (s.lines.some((l) => /<(?!\/?(b|i|em|strong|code|kbd|br)\b)|&(?![a-z]+;|#\d+;)/i.test(l))) fail(`notes ${s.id}`, 'raw < or & renders as HTML; rephrase or escape');
}
const totalSeconds = talk.reduce((n, s) => n + s.seconds, 0);

/* Print: one settled page per slide */
const pdf = await page.pdf({ width: '16in', height: '9in', printBackground: true });
const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
if (pages !== deck.length) fail('print', `${pages} PDF pages for ${deck.length} slides`);
if (shots) fs.writeFileSync(path.join(shots, 'deck.pdf'), pdf);

errors.forEach((e) => fail('runtime', e));
await browser.close();
server.close();

console.log(report.join('\n'));
console.log(`\n${deck.length} slides · ${report.filter((l) => l.includes('pending')).length} pending · PDF ${pages} pages · talk ${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`);
if (failures.length) { console.log(`\n✗ ${failures.length} problem(s)\n  ${failures.join('\n  ')}`); process.exit(1); }
console.log('✓ native deck checks passed');
