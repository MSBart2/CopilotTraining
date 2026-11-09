// Review state lives in the repository so it is versioned and hand-editable.
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

export const FORMAT = 'copilottraining.talk-review';
export const VERSION = 1;
export const STAGES = ['to-review', 'in-review', 'reviewed', 'pushed'];
export const STATUSES = ['unreviewed', 'ok', 'needs-fix', 'fixed'];
const SLUG = /^[a-z0-9][a-z0-9-]*$/;

export class StoreError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export const storePath = (root) => path.join(root, 'tech-talks', 'review-status.json');
const empty = () => ({ format: FORMAT, version: VERSION, talks: {} });
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const optStr = (v) => v === undefined || typeof v === 'string';

function validate(data, file) {
  const bad = (why) => new StoreError('review_store_invalid', `${file} is not a recognized review file (${why}). It was left unchanged.`);
  if (!isObj(data)) throw bad('not an object');
  if (data.format !== FORMAT) throw bad(`format is ${JSON.stringify(data.format)}`);
  if (data.version !== VERSION) throw bad(`version is ${JSON.stringify(data.version)}`);
  if (!isObj(data.talks)) throw bad('talks is not an object');
  for (const [slug, t] of Object.entries(data.talks)) {
    if (!SLUG.test(slug) || !isObj(t)) throw bad(`talk ${slug}`);
    if (!STAGES.includes(t.stage) || !optStr(t.note) || !optStr(t.updated)) throw bad(`talk ${slug} fields`);
    if (t.slides !== undefined) {
      if (!isObj(t.slides)) throw bad(`talk ${slug} slides`);
      for (const [id, s] of Object.entries(t.slides)) {
        if (!isObj(s) || !STATUSES.includes(s.status) || !optStr(s.note) || !optStr(s.updated)) throw bad(`slide ${slug}/${id}`);
      }
    }
  }
  return data;
}

export async function readStore(root) {
  const file = storePath(root);
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') return empty();
    throw new StoreError('review_store_unreadable', `Could not read ${file}: ${err.message}`);
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new StoreError('review_store_invalid', `${file} is not valid JSON (${err.message}). It was left unchanged.`);
  }
  return validate(data, file);
}

function normalize(data) {
  const talks = {};
  for (const slug of Object.keys(data.talks).sort()) {
    const t = data.talks[slug];
    const slides = t.slides && Object.keys(t.slides).length
      ? Object.fromEntries(Object.keys(t.slides).sort().map((id) => [id, t.slides[id]])) : undefined;
    talks[slug] = { stage: t.stage, ...(t.note ? { note: t.note } : {}), ...(t.updated ? { updated: t.updated } : {}), ...(slides ? { slides } : {}) };
  }
  return { format: FORMAT, version: VERSION, talks };
}

const writes = new Map();

export function updateStore(root, mutate) {
  const file = storePath(root);
  const next = (writes.get(file) ?? Promise.resolve()).catch(() => {}).then(() => saveStore(root, mutate));
  writes.set(file, next);
  const clear = () => { if (writes.get(file) === next) writes.delete(file); };
  next.then(clear, clear);
  return next;
}

async function saveStore(root, mutate) {
  const file = storePath(root);
  const data = await readStore(root);
  const result = mutate(data);
  const tmp = `${file}.${process.pid}.${randomUUID()}.tmp`;
  try {
    await writeFile(tmp, `${JSON.stringify(normalize(data), null, 2)}\n`, 'utf8');
    await rename(tmp, file);
  } catch (err) {
    await unlink(tmp).catch(() => {});
    throw new StoreError('review_store_write_failed', `Could not save ${file}: ${err.message}`);
  }
  return result;
}
