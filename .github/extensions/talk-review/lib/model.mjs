// Combines repository data and review state into the board and per-talk views.
import { listTalks, loadSlides, gitState, gitCounts, deckLink, REPO_ROOT } from './repo.mjs';
import { readStore, updateStore, STAGES, STATUSES } from './store.mjs';

export { STAGES, STATUSES };

export class InputError extends Error {
  constructor(message) { super(message); this.code = 'invalid_input'; }
}

const now = () => new Date().toISOString();
const MAX_NOTE = 2000;

function cleanNote(note) {
  if (note === undefined) return undefined;
  if (typeof note !== 'string') throw new InputError('note must be a string.');
  if (note.length > MAX_NOTE) throw new InputError(`note must be at most ${MAX_NOTE} characters.`);
  return note.trim();
}

async function findTalk(slug) {
  if (typeof slug !== 'string' || !slug) throw new InputError('talk must be a talk slug, such as "vscode-latest".');
  const talks = await listTalks();
  const talk = talks.find((t) => t.slug === slug);
  if (!talk) {
    const err = new InputError(`Unknown or inactive talk "${slug}". Active talks: ${talks.map((t) => t.slug).join(', ')}.`);
    err.code = 'unknown_talk';
    throw err;
  }
  return talk;
}

function counts(slides, reviewSlides = {}) {
  const c = { ok: 0, fixed: 0, 'needs-fix': 0, unreviewed: 0 };
  for (const s of slides) c[reviewSlides[s.id]?.status ?? 'unreviewed'] += 1;
  return c;
}

export async function getBoard() {
  const [talks, store, git] = await Promise.all([listTalks(), readStore(REPO_ROOT), gitState()]);
  const items = [];
  for (const talk of talks) {
    const review = store.talks[talk.slug];
    let slides = [];
    let deckError = null;
    try { slides = await loadSlides(talk); } catch (err) { deckError = err.message; }
    const seconds = slides.reduce((a, s) => a + (s.seconds ?? 0), 0);
    items.push({
      ...talk,
      stage: review?.stage ?? 'to-review',
      note: review?.note ?? '',
      reviewUpdated: review?.updated ?? null,
      slideCount: slides.length,
      minutes: seconds ? Math.round(seconds / 6) / 10 : null,
      counts: counts(slides, review?.slides),
      git: git.available ? gitCounts(git, talk.slug) : null,
      deck: deckLink(talk),
      deckError
    });
  }
  return { stages: STAGES, statuses: STATUSES, git: { available: git.available, hasUpstream: git.hasUpstream }, talks: items };
}

export async function getTalk(slug) {
  const talk = await findTalk(slug);
  const [store, slides, git] = await Promise.all([readStore(REPO_ROOT), loadSlides(talk), gitState()]);
  const review = store.talks[slug] ?? {};
  return {
    ...talk,
    stage: review.stage ?? 'to-review',
    note: review.note ?? '',
    counts: counts(slides, review.slides),
    git: git.available ? gitCounts(git, slug) : null,
    deck: deckLink(talk),
    slides: slides.map((s) => ({
      ...s,
      status: review.slides?.[s.id]?.status ?? 'unreviewed',
      note: review.slides?.[s.id]?.note ?? '',
      deck: deckLink(talk, s)
    }))
  };
}

export async function setTalkStage(slug, stage, note) {
  await findTalk(slug);
  if (!STAGES.includes(stage)) throw new InputError(`stage must be one of: ${STAGES.join(', ')}.`);
  const clean = cleanNote(note);
  await updateStore(REPO_ROOT, (data) => {
    const t = data.talks[slug] ?? { stage };
    t.stage = stage;
    if (clean !== undefined) t.note = clean;
    t.updated = now();
    data.talks[slug] = t;
  });
  return { talk: slug, stage, ...(clean !== undefined ? { note: clean } : {}) };
}

export async function setTalkNote(slug, note) {
  await findTalk(slug);
  const clean = cleanNote(note) ?? '';
  await updateStore(REPO_ROOT, (data) => {
    const t = data.talks[slug] ?? { stage: 'to-review' };
    t.note = clean;
    t.updated = now();
    data.talks[slug] = t;
  });
  return { talk: slug, note: clean };
}

function resolveSlide(slides, ref) {
  const asNumber = typeof ref === 'number' ? ref : typeof ref === 'string' && /^\d+$/.test(ref) ? Number(ref) : null;
  const slide = asNumber !== null ? slides[asNumber - 1] : slides.find((s) => s.id === ref);
  if (!slide) throw new InputError(`slide must be a 1-based slide number (1–${slides.length}) or a slide id.`);
  return slide;
}

export async function setSlideReview(slug, ref, status, note) {
  const talk = await findTalk(slug);
  if (status !== undefined && !STATUSES.includes(status)) throw new InputError(`status must be one of: ${STATUSES.join(', ')}.`);
  const slide = resolveSlide(await loadSlides(talk), ref);
  const clean = cleanNote(note);
  let saved;
  await updateStore(REPO_ROOT, (data) => {
    const t = data.talks[slug] ?? { stage: 'to-review' };
    const slides = t.slides ?? {};
    const prev = slides[slide.id] ?? { status: 'unreviewed' };
    const next = { status: status ?? prev.status, note: clean !== undefined ? clean : prev.note ?? '', updated: now() };
    if (next.status === 'unreviewed' && !next.note) delete slides[slide.id];
    else slides[slide.id] = { status: next.status, ...(next.note ? { note: next.note } : {}), updated: next.updated };
    t.slides = slides;
    t.updated = now();
    data.talks[slug] = t;
    saved = { talk: slug, slide: slide.n, id: slide.id, title: slide.title, status: next.status, note: next.note };
  });
  return saved;
}
