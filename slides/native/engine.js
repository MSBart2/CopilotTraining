/*
  Native deck engine.
  Load order: kit.js, frames.js (window.FRAMES), patterns.js (window.PATTERNS),
  the deck's slides.js (window.DECK), the deck's scenes.js (window.SCENES), then engine.js.
  A slide renders scenes[slide.scene || slide.id]; deck scenes override patterns, which override frames.

  The deck shows one slide at a time. Entering a slide marks it live on the next
  frame, so CSS motion restarts on every visit. Reduced motion, print, overview,
  the notes page, and ?settled show each slide's final state.
*/
(() => {
  const { esc, html } = window.Kit;
  const deck = window.DECK;
  const scenes = { ...window.FRAMES, ...window.PATTERNS, ...window.SCENES };
  if (!deck || !Array.isArray(deck.slides)) throw new Error('engine: window.DECK.slides is missing');

  const root = document.documentElement;
  root.classList.add('js');
  const params = new URLSearchParams(location.search);
  if (params.has('settled')) root.classList.add('settled');
  const slides = deck.slides;
  const total = slides.length;
  const channel = 'BroadcastChannel' in window ? new BroadcastChannel(`deck:${deck.meta.slug}`) : null;

  const pendingScene = (s) => `${html.head(s)}<div class="pending">Native scene pending for <code>${esc(s.id)}</code>.<br>This slide's content is unchanged; its new layout has not been authored yet.</div>`;

  const renderStage = (slide, i) => {
    const name = slide.scene || slide.id;
    const scene = scenes[name];
    let body;
    try {
      body = scene ? scene(slide, { index: i, total, deck, scenes }) : pendingScene(slide);
    } catch (err) {
      console.error(`scene "${slide.id}" failed`, err);
      body = `<div class="pending" style="color:var(--red)">Scene <code>${esc(slide.id)}</code> threw: ${esc(err.message)}</div>`;
    }
    const part = slide.part ? ` part-${slide.part}` : '';
    const progress = slide.chrome === false ? '' :
      `<div class="deck-progress" aria-hidden="true"><span>${esc(deck.meta.short || deck.meta.title)}</span><span class="bar"><span class="fill" style="--p:${(i + 1) / total}"></span></span><span>${i + 1} / ${total}</span></div>`;
    return `<div class="viewport"><div class="stage s-${esc(slide.id)} sc-${esc(name)}${part}"><div class="stage-body">${body}</div>${progress}</div></div>`;
  };

  const sizeObserver = new ResizeObserver((entries) => {
    for (const e of entries) if (e.contentRect.width) e.target.style.setProperty('--scale', e.contentRect.width / 1600);
  });
  const observeViewports = (scope) => scope.querySelectorAll('.viewport').forEach((v) => sizeObserver.observe(v));

  /* Speaker notes page */
  const notesRoot = document.getElementById('notes');
  if (notesRoot) {
    root.classList.add('settled');
    const seconds = slides.reduce((sum, s) => sum + (s.seconds || 0), 0);
    const mmss = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
    const summary = document.getElementById('notes-summary');
    if (summary) summary.textContent = `${total} slides${seconds ? ` · about ${mmss(seconds)} speaking time` : ''}`;
    const brief = document.getElementById('notes-brief');
    if (brief) brief.innerHTML = [['Question', deck.meta.question], ['Thesis', deck.meta.thesis]]
      .filter(([, v]) => v).map(([k, v]) => `<p><b>${k}</b> ${esc(v)}</p>`).join('');
    const line = (n) => {
      const cls = n.startsWith('"') ? 'say' : n.startsWith('→') ? 'next' : '';
      return `<p${cls ? ` class="${cls}"` : ''}>${n}</p>`;
    };
    const list = (title, items, cls = '') => (items?.length ? `<aside class="${cls}"><h3>${title}</h3><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul></aside>` : '');
    notesRoot.innerHTML = slides.map((s, i) => `
      <article id="${esc(s.id)}" data-n="${i + 1}">
        <p class="meta">${String(i + 1).padStart(2, '0')} · ${esc(s.section || '')}${s.seconds ? ` · ${mmss(s.seconds)}` : ''}</p>
        <h2><a href="index.html#${esc(s.id)}">${esc(s.title)}</a></h2>
        <div class="slide">${renderStage(s, i)}</div>
        <div class="copy">
          ${s.notes?.length ? s.notes.map(line).join('') : '<p class="empty">No speaker notes yet.</p>'}
          ${list('Live demo', s.cue, 'cue')}
          ${list('Know', s.know)}
          ${s.sources?.length ? list('Sources', s.sources.map((x) => `<a href="${esc(x.href)}" target="_blank" rel="noopener">${esc(x.label)}</a>`)) : ''}
        </div>
      </article>`).join('');
    observeViewports(notesRoot);

    const KEY = `deck:${deck.meta.slug}:hide-previews`;
    const previews = document.getElementById('hide-previews');
    const follow = document.getElementById('follow');
    const applyPreviews = (hide) => { document.body.classList.toggle('no-previews', hide); if (previews) previews.checked = hide; };
    applyPreviews(params.get('previews') ? params.get('previews') === 'off' : localStorage.getItem(KEY) === '1');
    previews?.addEventListener('change', () => { localStorage.setItem(KEY, previews.checked ? '1' : '0'); applyPreviews(previews.checked); });
    if (channel) channel.onmessage = ({ data }) => {
      if (!data?.id || (follow && !follow.checked)) return;
      notesRoot.querySelectorAll('article.is-following').forEach((a) => a.classList.remove('is-following'));
      const target = document.getElementById(data.id);
      target?.classList.add('is-following');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return;
  }

  /* Presentation page */
  const deckRoot = document.getElementById('deck');
  if (!deckRoot) throw new Error('engine: missing #deck or #notes container');
  document.body.classList.add('deck');
  deckRoot.innerHTML = slides.map((s, i) =>
    `<section class="slide" id="${esc(s.id)}" data-n="${i + 1}" aria-label="${esc(s.title)}" aria-roledescription="slide">${renderStage(s, i)}</section>`).join('');
  observeViewports(deckRoot);
  const pages = [...deckRoot.querySelectorAll('.slide')];

  let current = -1;
  const show = (index, { replace = true } = {}) => {
    const next = Math.max(0, Math.min(total - 1, index));
    if (next === current) return;
    const prev = pages[current];
    if (prev) prev.classList.remove('is-current', 'is-live');
    current = next;
    const page = pages[current];
    page.classList.add('is-current');
    // Two frames: the first lays out the slide, the second starts its motion from zero.
    requestAnimationFrame(() => requestAnimationFrame(() => { if (pages[current] === page) page.classList.add('is-live'); }));
    const hash = `#${page.id}`;
    if (location.hash !== hash) history[replace ? 'replaceState' : 'pushState'](null, '', hash);
    document.title = `${slides[current].title} · ${deck.meta.title}`;
    channel?.postMessage({ id: page.id, index: current });
  };
  const replay = () => { const page = pages[current]; page.classList.remove('is-live'); void page.offsetWidth; page.classList.add('is-live'); };

  const fromLocation = () => {
    const key = decodeURIComponent(location.hash.slice(1)) || params.get('slide') || '';
    if (/^\d+$/.test(key)) return Number(key) - 1;
    const found = slides.findIndex((s) => s.id === key);
    return found >= 0 ? found : 0;
  };

  const toggleOverview = (on = !document.body.classList.contains('overview')) => {
    document.body.classList.toggle('overview', on);
    root.classList.toggle('settled', on || params.has('settled'));
    if (on) pages[current]?.scrollIntoView({ block: 'center' });
    else replay();
  };

  const isInteractive = (el) => el instanceof Element && el.closest('a,button,input,select,textarea,[contenteditable]:not([contenteditable="false"])');
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || isInteractive(e.target)) return;
    const k = e.key;
    let handled = true;
    if (['ArrowRight', 'ArrowDown', 'PageDown', 'Enter'].includes(k) || (k === ' ' && !e.shiftKey)) show(current + 1);
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k) || (k === ' ' && e.shiftKey)) show(current - 1);
    else if (k === 'Home') show(0);
    else if (k === 'End') show(total - 1);
    else if (k === 'o' || k === 'O' || (k === 'Escape' && document.body.classList.contains('overview'))) toggleOverview();
    else if (k === 'r' || k === 'R') replay();
    else if (k === 'n' || k === 'N') window.open(`notes.html#${pages[current].id}`, `notes-${deck.meta.slug}`);
    else if (k === 'f' || k === 'F') (document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen?.());
    else handled = false;
    if (handled) e.preventDefault();
  });

  deckRoot.addEventListener('click', (e) => {
    if (e.button !== 0 || isInteractive(e.target) || window.getSelection()?.toString()) return;
    if (document.body.classList.contains('overview')) {
      const page = e.target.closest('.slide');
      if (page) { show(pages.indexOf(page)); toggleOverview(false); }
      return;
    }
    show(current + (e.shiftKey ? -1 : 1));
  });

  let touchX = null;
  deckRoot.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') touchX = e.clientX; });
  deckRoot.addEventListener('pointerup', (e) => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener('hashchange', () => show(fromLocation()));
  window.addEventListener('beforeprint', () => root.classList.add('settled'));
  window.addEventListener('afterprint', () => root.classList.toggle('settled', params.has('settled')));

  window.DeckRuntime = { show, replay, get index() { return current; }, total, slides };
  show(fromLocation());
})();
