// Tech-talk review canvas: a stage board for active talks plus slide-by-slide review.
// Review state is saved in tech-talks/review-status.json so it is versioned with the talks.
import { watch } from 'node:fs';
import path from 'node:path';
import { createCanvas, CanvasError, joinSession } from '@github/copilot-sdk/extension';
import { REPO_ROOT, assertRepo } from './lib/repo.mjs';
import { getBoard, getTalk, setTalkStage, setTalkNote, setSlideReview, STAGES, STATUSES } from './lib/model.mjs';
import { InstanceServer } from './lib/server.mjs';

const CANVAS_ID = 'copilottraining-talk-review';
const instances = new Map();
let session;
let watcher;
let watchTimer;

const log = (message) => session?.log(message, { level: 'warning', ephemeral: true }).catch(() => {});

const asCanvasError = (err) => (err instanceof CanvasError ? err
  : err?.code ? new CanvasError(err.code, err.message)
    : new CanvasError('talk_review_failed', err?.message ?? String(err)));

const guard = (fn) => async (...args) => {
  try { return await fn(...args); } catch (err) { throw asCanvasError(err); }
};

function broadcast(event, data = {}) {
  for (const inst of instances.values()) inst.emit(event, data);
}

function ensureWatcher() {
  if (watcher || !instances.size) return;
  try {
    watcher = watch(path.join(REPO_ROOT, 'tech-talks'), (_evt, name) => {
      if (name && name !== 'review-status.json') return;
      clearTimeout(watchTimer);
      watchTimer = setTimeout(() => broadcast('changed'), 150);
    });
    watcher.on('error', () => { watcher?.close(); watcher = undefined; });
  } catch (err) {
    log(`talk-review: file watch unavailable (${err.message}); edits from the canvas and agent still refresh it.`);
  }
}

function stopWatcherIfIdle() {
  if (instances.size || !watcher) return;
  watcher.close();
  watcher = undefined;
}

const mutate = (fn) => async (...args) => {
  const result = await fn(...args);
  broadcast('changed');
  return result;
};

const api = {
  board: getBoard,
  talk: getTalk,
  setStage: mutate(setTalkStage),
  setTalkNote: mutate(setTalkNote),
  setSlide: mutate(setSlideReview)
};

const talkProp = { type: 'string', description: 'Talk slug, the folder name under tech-talks/, for example "vscode-latest".' };
const stageProp = { type: 'string', enum: STAGES, description: 'Review stage of the whole talk.' };
const statusProp = { type: 'string', enum: STATUSES, description: 'Review status of one slide.' };
const noteProp = { type: 'string', maxLength: 2000, description: 'Short reviewer note. An empty string clears it.' };

function summary(board) {
  const by = Object.fromEntries(STAGES.map((s) => [s, 0]));
  for (const t of board.talks) by[t.stage] += 1;
  return `${board.talks.length} active talks · ${by['to-review']} to review · ${by['in-review']} in review · ${by.reviewed} reviewed · ${by.pushed} pushed`;
}

const canvas = createCanvas({
  id: CANVAS_ID,
  displayName: 'Tech-talk review',
  description: 'Board of active CopilotTraining tech talks by review stage, with slide-by-slide review status and notes.',
  inputSchema: {
    type: 'object',
    properties: { talk: { ...talkProp, description: 'Optional talk slug to open straight into its slide review.' } },
    additionalProperties: false
  },
  actions: [
    {
      name: 'list_talks',
      description: 'List active tech talks with review stage, slide counts, slide review progress, and uncommitted or unpushed file counts.',
      handler: guard(async () => {
        const board = await getBoard();
        return { summary: summary(board), talks: board.talks.map(({ deckError, deck, ...t }) => ({ ...t, ...(deckError ? { deckError } : {}) })) };
      })
    },
    {
      name: 'get_talk_review',
      description: 'Get one talk with every slide: number, id, part, title, seconds, review status, and note.',
      inputSchema: { type: 'object', properties: { talk: talkProp }, required: ['talk'], additionalProperties: false },
      handler: guard(async ({ input }) => {
        const { deck, slides, ...talk } = await getTalk(input?.talk);
        return { ...talk, slides: slides.map(({ deck: _d, ...s }) => s) };
      })
    },
    {
      name: 'set_talk_stage',
      description: 'Move a talk to a review stage, optionally with a note.',
      inputSchema: { type: 'object', properties: { talk: talkProp, stage: stageProp, note: noteProp }, required: ['talk', 'stage'], additionalProperties: false },
      handler: guard(({ input }) => api.setStage(input?.talk, input?.stage, input?.note))
    },
    {
      name: 'set_slide_review',
      description: 'Record the review status and/or note for one slide, identified by 1-based slide number or slide id.',
      inputSchema: {
        type: 'object',
        properties: {
          talk: talkProp,
          slide: { type: ['integer', 'string'], description: '1-based slide number, or the slide id from slides.js.' },
          status: statusProp,
          note: noteProp
        },
        required: ['talk', 'slide'],
        additionalProperties: false
      },
      handler: guard(({ input }) => api.setSlide(input?.talk, input?.slide, input?.status, input?.note))
    },
    {
      name: 'focus_talk',
      description: 'Show a talk\'s slide review in this canvas, or pass no talk to return to the board.',
      inputSchema: { type: 'object', properties: { talk: talkProp }, additionalProperties: false },
      handler: guard(async ({ instanceId, input }) => {
        const inst = instances.get(instanceId);
        if (!inst?.live) throw new CanvasError('canvas_not_open', 'Open this canvas instance before focusing a talk.');
        if (input?.talk) await getTalk(input.talk);
        inst.setFocus(input?.talk ?? null);
        return { focused: input?.talk ?? 'board' };
      })
    }
  ],
  open: guard(async ({ instanceId, input }) => {
    assertRepo();
    if (input !== undefined && input !== null && (typeof input !== 'object' || Array.isArray(input))) {
      throw new CanvasError('invalid_input', 'Open input must be an object, for example {} or {"talk":"vscode-latest"}.');
    }
    const focus = input?.talk;
    if (focus !== undefined) await getTalk(focus);
    const board = await getBoard();
    let inst = instances.get(instanceId);
    if (!inst?.live) {
      if (inst) instances.delete(instanceId);
      inst = await new InstanceServer({ api, log }).start();
      instances.set(instanceId, inst);
      ensureWatcher();
    }
    if (focus !== undefined) inst.setFocus(focus);
    return { url: inst.url, title: focus ? `Review · ${focus}` : 'Tech-talk review', status: summary(board) };
  }),
  onClose: async ({ instanceId }) => {
    const inst = instances.get(instanceId);
    instances.delete(instanceId);
    await inst?.close();
    stopWatcherIfIdle();
  }
});

session = await joinSession({ canvases: [canvas] });
