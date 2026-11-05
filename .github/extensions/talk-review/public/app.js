// Client for the tech-talk review canvas. All data is inserted with textContent.
const STAGE_LABEL = { 'to-review': 'To review', 'in-review': 'In review', reviewed: 'Reviewed', pushed: 'Pushed' };
const STATUS_LABEL = { unreviewed: 'Unreviewed', ok: 'OK', 'needs-fix': 'Needs fix', fixed: 'Fixed' };
const $ = (id) => document.getElementById(id);
const state = { board: null, talk: null, view: 'board', filter: 'all' };

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'style') Object.assign(node.style, v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) if (c !== null && c !== undefined && c !== false) node.append(c);
  return node;
}

function say(message, error = false) {
  const s = $('status');
  s.textContent = message;
  s.classList.toggle('error', error);
}

async function call(path, body) {
  const res = await fetch(path, body === undefined ? {} : {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status}).`);
  return data;
}

function stageSelect(value, label, onchange, focusKey) {
  const select = el('select', { 'aria-label': label, 'data-focus': focusKey, onchange });
  for (const s of state.board?.stages ?? Object.keys(STAGE_LABEL)) select.append(el('option', { value: s, text: STAGE_LABEL[s] ?? s }));
  select.value = value;
  return select;
}

function bar(counts, total) {
  const reviewed = total - counts.unreviewed;
  const pct = (n) => `${total ? (n / total) * 100 : 0}%`;
  return el('div', { class: 'bar', role: 'img', 'aria-label': `${reviewed} of ${total} slides reviewed: ${counts.ok} OK, ${counts.fixed} fixed, ${counts['needs-fix']} need a fix` },
    el('span', { class: 'ok', style: { width: pct(counts.ok) } }),
    el('span', { class: 'fixed', style: { width: pct(counts.fixed) } }),
    el('span', { class: 'needs-fix', style: { width: pct(counts['needs-fix']) } }));
}

function gitBadges(git) {
  if (!git) return [];
  return [
    git.uncommitted ? el('span', { class: 'badge warn', text: `${git.uncommitted} uncommitted`, title: 'Files under this talk with uncommitted changes' }) : null,
    git.unpushed ? el('span', { class: 'badge warn', text: `${git.unpushed} unpushed`, title: 'Files under this talk changed in commits not yet pushed' }) : null
  ];
}

async function setStage(talk, stage) {
  try {
    await call('/api/stage', { talk, stage });
    say(`${talk} moved to ${STAGE_LABEL[stage]}.`);
  } catch (err) { say(err.message, true); await refresh(); }
}

function card(t) {
  const reviewed = t.slideCount - t.counts.unreviewed;
  return el('li', { class: 'card', style: { '--stage': `var(--${t.stage})` } },
    el('button', { type: 'button', class: 'open', text: t.title, 'data-slug': t.slug, 'data-focus': `open-${t.slug}`, onclick: () => openTalk(t.slug) }),
    el('div', { class: 'slug', text: t.slug }),
    el('div', { class: 'meta', text: [
      t.kind === 'native' ? 'Native' : t.kind === 'slidev' ? 'Slidev' : 'No deck',
      t.exec ? 'Exec' : null,
      t.slideCount ? `${t.slideCount} slides` : null,
      t.minutes ? `${t.minutes} min` : null,
      t.updated ? `updated ${t.updated}` : null
    ].filter(Boolean).join(' · ') }),
    t.slideCount ? bar(t.counts, t.slideCount) : null,
    t.slideCount ? el('div', { class: 'meta', text: `${reviewed}/${t.slideCount} reviewed${t.counts['needs-fix'] ? ` · ${t.counts['needs-fix']} need a fix` : ''}` }) : null,
    t.note ? el('div', { class: 'note', text: t.note }) : null,
    el('div', { class: 'card-foot' },
      el('div', { class: 'badges' }, gitBadges(t.git), t.deckError ? el('span', { class: 'badge err', text: 'deck unreadable', title: t.deckError }) : null),
      stageSelect(t.stage, `Stage for ${t.title}`, (e) => setStage(t.slug, e.target.value), `stage-${t.slug}`)));
}

function renderBoard() {
  const board = state.board;
  const by = Object.fromEntries(board.stages.map((s) => [s, []]));
  for (const t of board.talks) by[t.stage].push(t);
  const counts = board.stages.map((s) => `${by[s].length} ${STAGE_LABEL[s].toLowerCase()}`).join(' · ');
  $('summary').textContent = `${board.talks.length} active talks · ${counts}${board.git.available ? '' : ' · Git status unavailable'}`;
  $('board').replaceChildren(...board.stages.map((s) => el('section', { class: 'column', style: { '--stage': `var(--${s})` }, 'aria-labelledby': `col-${s}` },
    el('div', { class: 'column-head' }, el('h2', { id: `col-${s}`, text: STAGE_LABEL[s] }), el('span', { class: 'count', text: String(by[s].length) })),
    by[s].length ? el('ul', { class: 'cards' }, by[s].map(card)) : el('p', { class: 'empty', text: 'Nothing here yet.' }))));
}

async function saveSlide(slug, slide, patch, label) {
  try {
    const r = await call('/api/slide', { talk: slug, slide, ...patch });
    say(`Slide ${r.slide} ${label}.`);
  } catch (err) { say(err.message, true); await refresh(); }
}

function slideRows() {
  const t = state.talk;
  const shown = t.slides.filter((s) => state.filter === 'all' || s.status === state.filter);
  if (!shown.length) return [el('tr', {}, el('td', { colspan: '5', class: 'empty', text: 'No slides match this filter.' }))];
  const rows = [];
  let part = null;
  for (const s of shown) {
    if (s.part !== part && state.filter === 'all') {
      part = s.part;
      rows.push(el('tr', { class: 'part-row' }, el('td', { colspan: '5', text: s.part ? `Part ${s.part}` : 'Frame' })));
    }
    const status = el('select', { 'aria-label': `Status for slide ${s.n}`, 'data-focus': `status-${s.id}`,
      onchange: (e) => saveSlide(t.slug, s.n, { status: e.target.value }, `marked ${STATUS_LABEL[e.target.value]}`) });
    for (const v of Object.keys(STATUS_LABEL)) status.append(el('option', { value: v, text: STATUS_LABEL[v] }));
    status.value = s.status;
    const note = el('input', { type: 'text', maxlength: '2000', value: s.note, 'aria-label': `Note for slide ${s.n}`, 'data-focus': `note-${s.id}`, placeholder: 'Add a note',
      onchange: (e) => saveSlide(t.slug, s.n, { note: e.target.value }, 'note saved'),
      onkeydown: (e) => { if (e.key === 'Enter') e.target.blur(); } });
    note.value = s.note;
    const title = s.deck ? el('a', { href: s.deck, target: '_blank', rel: 'noopener', text: s.title, title: 'Open this slide in the deck' }) : el('span', { text: s.title });
    rows.push(el('tr', { style: { '--row': s.status === 'unreviewed' ? 'transparent' : `var(--${s.status})` } },
      el('td', { class: 'num', text: String(s.n) }),
      el('td', {}, title, el('span', { class: 'part', text: s.id })),
      el('td', { class: 'min', text: s.seconds ? (s.seconds / 60).toFixed(1) : '' }),
      el('td', { class: 'status' }, status),
      el('td', { class: 'note' }, note)));
  }
  return rows;
}

function renderTalk() {
  const t = state.talk;
  $('talk-title').textContent = t.title;
  const reviewed = t.slides.length - t.counts.unreviewed;
  $('talk-meta').textContent = [t.slug, t.section, t.updated ? `updated ${t.updated}` : null,
    t.git?.uncommitted ? `${t.git.uncommitted} uncommitted files` : null, t.git?.unpushed ? `${t.git.unpushed} unpushed files` : null].filter(Boolean).join(' · ');
  const deck = $('talk-deck');
  deck.hidden = !t.deck;
  if (t.deck) deck.href = t.deck;
  const stage = $('talk-stage');
  if (!stage.options.length) for (const s of state.board?.stages ?? Object.keys(STAGE_LABEL)) stage.append(el('option', { value: s, text: STAGE_LABEL[s] }));
  stage.value = t.stage;
  if (document.activeElement !== $('talk-note')) $('talk-note').value = t.note;
  $('progress').replaceChildren(
    el('span', { text: `${reviewed} of ${t.slides.length} slides reviewed · ${t.counts.ok} OK · ${t.counts.fixed} fixed · ${t.counts['needs-fix']} need a fix` }),
    bar(t.counts, t.slides.length));
  $('slide-rows').replaceChildren(...slideRows());
}

function preserveFocus(render) {
  const active = document.activeElement;
  const key = active?.getAttribute?.('data-focus');
  const value = active?.value;
  const sel = typeof active?.selectionStart === 'number' ? [active.selectionStart, active.selectionEnd] : null;
  render();
  if (!key) return;
  const again = document.querySelector(`[data-focus="${CSS.escape(key)}"]`);
  if (!again) return;
  if (again.tagName === 'INPUT') again.value = value;
  again.focus();
  if (sel && again.setSelectionRange) again.setSelectionRange(...sel);
}

function show(view) {
  state.view = view;
  $('board-view').hidden = view !== 'board';
  $('talk-view').hidden = view !== 'talk';
}

async function openTalk(slug) {
  try {
    state.talk = await call(`/api/talk?talk=${encodeURIComponent(slug)}`);
    show('talk');
    renderTalk();
    $('back').focus();
  } catch (err) { say(err.message, true); }
}

function backToBoard() {
  const slug = state.talk?.slug;
  state.talk = null;
  show('board');
  renderBoard();
  if (slug) document.querySelector(`.card .open[data-slug="${CSS.escape(slug)}"]`)?.focus();
}

async function refresh() {
  try {
    state.board = await call('/api/board');
    if (state.view === 'board') preserveFocus(renderBoard);
    if (state.view === 'talk' && state.talk) {
      state.talk = await call(`/api/talk?talk=${encodeURIComponent(state.talk.slug)}`);
      preserveFocus(renderTalk);
    }
  } catch (err) { say(err.message, true); }
}

$('back').addEventListener('click', backToBoard);
$('talk-stage').addEventListener('change', (e) => setStage(state.talk.slug, e.target.value));
$('talk-note').addEventListener('change', async (e) => {
  try { await call('/api/talk-note', { talk: state.talk.slug, note: e.target.value }); say('Talk note saved.'); }
  catch (err) { say(err.message, true); }
});
for (const radio of document.querySelectorAll('input[name="filter"]')) {
  radio.addEventListener('change', (e) => { state.filter = e.target.value; renderTalk(); });
}

const events = new EventSource('/api/events');
events.addEventListener('changed', () => refresh());
events.addEventListener('focus', (e) => {
  const { talk } = JSON.parse(e.data);
  if (talk) openTalk(talk);
  else if (state.view === 'talk') backToBoard();
});

state.board = await call('/api/board').catch((err) => { say(err.message, true); return null; });
if (state.board) {
  renderBoard();
  if (state.board.focus) await openTalk(state.board.focus);
}
