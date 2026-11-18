/*
  Workshop layouts: window.WORKSHOP.
  Workshop decks facilitate hands-on modules. The module README and exercise files stay
  the learner's source; these layouts frame the work, keep the current exercise visible
  while people build, and make every check observable. Layout names start with "ws-".
  Load after patterns.js and before the deck's slides.js. Styles live in workshop.css.
*/
(() => {
  const { esc } = window.Kit;

  /* Inline text: escaped, with `code` spans (taken literally, so globs keep their **) and **bold** elsewhere. */
  const fmt = (v) => String(v ?? '').split(/(`[^`]+`)/).map((part) => (/^`[^`]+`$/.test(part)
    ? `<code>${esc(part.slice(1, -1))}</code>`
    : esc(part).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>'))).join('');
  const list = (items = [], cls = '') => (items.length ? `<ul class="${cls}">${items.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>` : '');
  const at = (i, step = 90, start = 120) => `style="--at:${start + i * step}ms"`;
  const link = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  const copyBtn = (text) => `<button class="ws-copy" type="button" data-copy="${esc(text)}">Copy</button>`;
  /* One delegated handler for every Copy button; buttons never advance the slide. */
  document.addEventListener('click', (e) => {
    const btn = e.target instanceof Element && e.target.closest('.ws-copy');
    if (!btn) return;
    e.preventDefault();
    navigator.clipboard?.writeText(btn.dataset.copy).then(() => {
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
    });
  });
  const repoHref = (deck, file) => (deck.meta.repo ? `${deck.meta.repo}${file}` : `../../../${file}`);

  const KINDS = {
    frame: 'Module', concept: 'Concept', example: 'Example', demo: 'Instructor demo',
    work: 'Your turn', check: 'Checkpoint', debrief: 'Debrief', mindful: 'Mindful moment'
  };
  /* Content under the headline fills the remaining height and centers, so short slides don't sit high. */
  const body = (inner, cls = '') => `<div class="ws-body ${cls}">${inner}</div>`;
  /* One color per FanHub persona across every module; a slide's `tone` overrides it. */
  const PERSONA_TONES = { Jessica: 'amber', David: 'blue', Sarah: 'green', Elena: 'purple', Marcus: 'orange', Rafael: 'cyan' };
  const tone = (p) => p.tone || PERSONA_TONES[p.name] || 'base';
  const avatar = (p) => `<span class="ws-avatar p-${esc(tone(p))}" aria-hidden="true">${esc(String(p.name).charAt(0))}</span>`;

  /* Module rail: the whole workshop journey with this module lit. */
  const rail = (deck, { labels = false } = {}) => {
    const journey = deck.meta.journey || [];
    if (!journey.length) return '';
    return `<ol class="ws-rail${labels ? ' labelled' : ''}" aria-label="Workshop modules">${journey.map((m) => {
      const state = m.id === deck.meta.module ? 'on' : m.done ? 'done' : '';
      return `<li class="${state}"${state === 'on' ? ' aria-current="step"' : ''}><b>${esc(m.id)}</b>${labels ? `<span>${esc(m.label)}</span>` : ''}</li>`;
    }).join('')}</ol>`;
  };

  /* Header: module, slide kind, place in the module, and the exercise in play. */
  const head = (s, { deck }) => {
    const kind = s.kind || 'concept';
    const crumbs = [
      `<span class="ws-module">${esc(deck.meta.module)} · ${esc(deck.meta.short)}</span>`,
      `<span class="ws-kind k-${esc(kind)}">${esc(KINDS[kind] || kind)}</span>`,
      s.crumb ? `<span class="ws-crumb">${fmt(s.crumb)}</span>` : '',
      s.ex ? `<span class="ws-ex">Exercise ${esc(s.ex)}</span>` : ''
    ].join('');
    return `<header class="ws-head"><div class="ws-crumbs">${crumbs}</div>${rail(deck)}</header>
      <h2>${fmt(s.title)}</h2>${s.subtitle ? `<p class="subtitle">${fmt(s.subtitle)}</p>` : ''}`;
  };
  const callout = (s) => (s.callout ? `<p class="ws-callout">${fmt(s.callout)}</p>` : '');

  const W = {};

  W['ws-title'] = (s, ctx) => {
    const { deck } = ctx;
    return `<div class="ws-title">
      <div class="ws-title-main">
        <img class="ws-logo" src="${esc(s.logo || '../sdp-logo.png')}" alt="SDP">
        <p class="ws-eyebrow">${esc(deck.meta.eyebrow || 'Hands-on workshop')}</p>
        <div class="ws-title-row"><span class="ws-num">${esc(s.number)}</span><h1>${fmt(s.title)}</h1></div>
        <p class="subtitle">${fmt(s.subtitle)}</p>
        ${s.quote ? `<blockquote class="ws-quote"><p>${fmt(s.quote.text)}</p><cite>${esc(s.quote.who)}</cite></blockquote>` : ''}
        ${s.facts ? `<dl class="ws-facts">${s.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${fmt(v)}</dd></div>`).join('')}</dl>` : ''}
      </div>
      ${rail(deck, { labels: true })}
    </div>`;
  };

  W['ws-story'] = (s, ctx) => `${head(s, ctx)}
    ${body(`
      ${s.quote ? `<blockquote class="ws-hero-quote m-in" ${at(0)}><p>${fmt(s.quote.text)}</p><cite>${esc(s.quote.who)}</cite></blockquote>` : ''}
      <div class="ws-grid cols-${s.people.length}">${s.people.map((p, i) => `
        <div class="ws-card ws-person p-${esc(tone(p))} m-in" ${at(i + 1)}>
          <div class="ws-person-head">${avatar(p)}<p class="ws-who">${esc(p.name)}<span>${esc(p.role)}</span></p></div>
          <p class="ws-line">${fmt(p.line)}</p>
          ${p.gap ? `<p class="ws-gap">${fmt(p.gap)}</p>` : ''}
        </div>`).join('')}
      </div>
      ${s.bridge ? `<p class="ws-mission m-in" ${at(s.people.length + 1)}><span>${esc(s.bridgeLabel || 'Mission')}</span>${fmt(s.bridge)}</p>` : ''}`, 'ws-story')}`;

  /* The team's perspective: misconceptions learners often arrive with (before), then the same people after the module.
     Keep each persona's tone constant across the pair so the room can read the shift card by card. */
  W['ws-team'] = (s, ctx) => {
    const after = s.mode === 'after';
    return `${head({ ...s, subtitle: '', kind: after ? 'debrief' : 'frame' }, ctx)}
    <div class="ws-team ${after ? 'is-after' : 'is-before'}"${after ? '' : ' data-mark="Wrong answers"'}>
      <span class="ws-stamp">${esc(s.stamp || (after ? '\u2713 After the module' : '\u26a0 Wrong answers only'))}</span>
      <div class="ws-grid cols-3">${s.people.map((p, i) => `
        <div class="ws-card ws-voice p-${esc(tone(p))} m-in" ${at(i, 70)}>
          <div class="ws-person-head">${avatar(p)}<p class="ws-who">${esc(p.name)}<span>${esc(p.archetype)}</span></p></div>
          <p class="ws-said">${fmt(p.line)}</p>
          ${p.note ? `<p class="ws-aside">${fmt(p.note)}</p>` : ''}
        </div>`).join('')}
      </div>
    </div>`;
  };

  /* Mindful moment: pause and reframe. A shift in thinking, then the reference that grounds it. */
  W['ws-mindful'] = (s, ctx) => `${head({ ...s, kind: 'mindful' }, ctx)}
    ${body(`
      <div class="ws-shift">
        <div class="ws-thought from m-in" ${at(0)}><p class="ws-tag">${esc(s.from.label || 'Traditional thinking')}</p><p>${fmt(s.from.text)}</p></div>
        <span class="ws-shift-arrow m-in" ${at(1)} aria-hidden="true">\u2192</span>
        <div class="ws-thought to m-in" ${at(2)}><p class="ws-tag">${esc(s.to.label || 'AI-native thinking')}</p><p>${fmt(s.to.text)}</p></div>
      </div>
      ${s.rows ? `<div class="ws-panel ws-table-wrap m-in" ${at(3)}><table class="ws-table dense">
        <thead><tr>${s.columns.map((c) => `<th>${fmt(c)}</th>`).join('')}</tr></thead>
        <tbody>${s.rows.map((r) => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="ws-key"' : ''}>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>` : ''}
      ${callout(s)}`, 'ws-mindful')}`;

  /* Eras: how the work changed over time, oldest first. Each era has an optional portrait, its years,
     what it valued (chips), and what it produced (outcomes); `good` ticks the outcomes instead of crossing them.
     The last era is the current one and carries the accent. */
  W['ws-eras'] = (s, ctx) => `${head(s, ctx)}
    ${body(`<div class="ws-grid cols-${s.eras.length} ws-eras">${s.eras.map((e, i) => `
      <div class="ws-card ws-era${i === s.eras.length - 1 ? ' is-now' : ''} m-in" ${at(i, 160)}>
        <div class="ws-era-head">
          ${e.image ? `<img class="ws-era-img" src="${esc(e.image)}" alt="${esc(e.alt || e.name)}">` : ''}
          <div class="ws-era-id">
            <p class="ws-tag">${esc(e.years)}</p>
            <h3>${fmt(e.name)}</h3>
            <div class="ws-era-traits">${(e.traits || []).map((t) => `<span class="ws-chip">${fmt(t)}</span>`).join('')}</div>
          </div>
        </div>
        ${e.label ? `<p class="ws-era-label">${fmt(e.label)}</p>` : ''}
        ${list(e.outcomes, e.good ? 'ws-checks ws-ticked' : 'ws-xs')}
      </div>`).join('')}
    </div>${callout(s)}`)}`;

  W['ws-outcomes'] = (s, ctx) => `${head(s, ctx)}
    ${body(`<div class="ws-grid cols-${s.cols || 2} ws-outcomes">${s.items.map((it, i) => `
      <div class="ws-card m-in" ${at(i)}>
        ${it.mark ? `<span class="ws-mark" aria-hidden="true">${esc(it.mark)}</span>` : ''}
        <p class="ws-tag">${esc(it.tag)}</p>
        <h3>${fmt(it.title)}</h3>
        ${it.file ? `<p class="ws-file">${fmt(it.file)}</p>` : ''}
        <p>${fmt(it.blurb)}</p>
      </div>`).join('')}
    </div>${callout(s)}`)}`;

  /* Tables. `hops` numbers the first column down a spine (a request moving through layers);
     `merge` collapses a row whose values match in every column, so the rows that differ stand out. */
  W['ws-table'] = (s, ctx) => {
    const cols = s.columns.length;
    const row = (r, i) => {
      const key = `<td class="ws-key">${s.hops ? `<span class="ws-hop-n">${i + 1}</span>` : ''}${fmt(r[0])}</td>`;
      const rest = r.slice(1);
      const same = s.merge && rest.length > 1 && rest.every((c) => c === rest[0]);
      return same
        ? `<tr class="ws-same">${key}<td colspan="${cols - 1}"><span class="ws-same-val">${fmt(rest[0])}</span><span class="ws-same-tag">${esc(s.mergeLabel || 'same everywhere')}</span></td></tr>`
        : `<tr${s.merge ? ' class="ws-differs"' : ''}>${key}${rest.map((c) => `<td>${fmt(c)}</td>`).join('')}</tr>`;
    };
    return `${head(s, ctx)}
    ${body(`${s.lead ? `<p class="ws-lead">${fmt(s.lead)}</p>` : ''}
    <div class="ws-panel ws-table-wrap"><table class="ws-table${s.dense ? ' dense' : ''}${s.hops ? ' ws-hops' : ''}">
      <thead><tr>${s.columns.map((c) => `<th>${fmt(c)}</th>`).join('')}</tr></thead>
      <tbody>${s.rows.map(row).join('')}</tbody>
    </table></div>${callout(s)}`)}`;
  };

  W['ws-stack'] = (s, ctx) => `${head(s, ctx)}
    ${body(`<ol class="ws-stack">${s.layers.map((l, i) => `
      <li class="ws-layer t-${esc(l.tone || 'base')} m-in" ${at(i)}>
        <span class="ws-layer-n">${esc(l.n ?? i + 1)}</span>
        <div class="ws-layer-what"><b>${fmt(l.name)}</b><span class="ws-file">${fmt(l.file)}</span></div>
        <p>${fmt(l.role)}</p>
        <span class="ws-when">${fmt(l.when)}</span>
      </li>`).join('')}
    </ol>${callout(s)}`)}`;

  /* Light, safe syntax tinting for markdown/YAML-style files. Input is one raw line; output is escaped markup. */
  const tintInline = (t) => esc(t)
    .replace(/\*\*([^*]+)\*\*/g, '<b class="tk-b">**$1**</b>')
    .replace(/'([^']*)'/g, '<span class="tk-str">\'$1\'</span>')
    .replace(/(\s#\s.*)$/, '<span class="tk-mute">$1</span>');
  const tintLine = (line, state) => {
    if (/^---\s*$/.test(line)) { state.front = !state.front; return `<span class="tk-mute">${esc(line)}</span>`; }
    if (state.front) {
      const m = line.match(/^(\s*)([\w-]+)(:)(.*)$/);
      if (m) return `${esc(m[1])}<span class="tk-key">${esc(m[2])}</span><span class="tk-mute">:</span>${tintInline(m[4])}`;
    }
    if (/^#{1,6}\s/.test(line)) return `<span class="tk-head">${esc(line)}</span>`;
    const li = line.match(/^(\s*)([-*]|\d+\.)(\s+)(.*)$/);
    if (li) return `${esc(li[1])}<span class="tk-mute">${esc(li[2])}</span>${li[3]}${tintInline(li[4])}`;
    if (/^\s*(#|\/\/)/.test(line)) return `<span class="tk-mute">${esc(line)}</span>`;
    return tintInline(line);
  };
  /* Terminal lines: `$ cmd` is a prompt, `# note` a comment, anything else output. */
  const termLine = (line) => {
    const p = line.match(/^(\$|>|PS>)\s?(.*)$/);
    if (p) return `<span class="tk-prompt">${esc(p[1])}</span> <span class="tk-cmd">${esc(p[2])}</span>`;
    if (/^\s*#/.test(line)) return `<span class="tk-mute">${esc(line)}</span>`;
    return `<span class="tk-out">${esc(line)}</span>`;
  };

  /* Editor or terminal window with numbered pins that tie lines to the notes beside it.
     mode: 'editor' (default, line numbers + tinting) or 'terminal' (prompt/output, no numbers).
     annotations[].lines pins those 1-based lines to the note with the same number. */
  W['ws-code'] = (s, ctx) => {
    const term = s.mode === 'terminal';
    const nums = !term && s.numbers !== false;
    const notes = s.annotations || [];
    const pins = {};
    const pinNo = [];
    let next = 0;
    notes.forEach((a, i) => {
      const lines = a.lines || (a.line ? [a.line] : []);
      if (lines.length) pinNo[i] = ++next;
      lines.forEach((n) => { (pins[n] = pins[n] || []).push(pinNo[i]); });
    });
    const state = { front: false };
    const lines = s.code.replace(/^\n+|\s+$/g, '').split('\n').map((raw, i) => {
      const n = i + 1;
      const pin = pins[n] ? `<span class="ws-pins">${pins[n].map((p) => `<b>${p}</b>`).join('')}</span>` : '';
      const text = term ? termLine(raw) : tintLine(raw, state);
      return `<span class="ln${pins[n] ? ' pinned' : ''}"${nums ? ` data-n="${n}"` : ''}>${text || ' '}${pin}</span>`;
    }).join('');
    const title = s.file || (term ? 'Terminal' : '');
    return `${head(s, ctx)}
    ${body(`<div class="ws-split${notes.length ? '' : ' solo'}">
      <figure class="ws-win ${term ? 'is-term' : 'is-editor'}${nums ? '' : ' no-nums'} m-in" ${at(0)}>
        <figcaption class="ws-win-bar"><span class="ws-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="ws-win-title">${esc(title)}</span>${s.lang ? `<span class="ws-win-lang">${esc(s.lang)}</span>` : ''}</figcaption>
        <pre class="ws-win-body"><code>${lines}</code></pre>
      </figure>
      ${notes.length ? `<div class="ws-notes">${notes.map((a, i) => `
        <div class="ws-card ws-note m-in" ${at(i + 1)}><p class="ws-tag">${pinNo[i] ? `<b class="ws-pin-n">${pinNo[i]}</b>` : ''}${fmt(a.label)}</p><p>${fmt(a.text)}</p></div>`).join('')}
      </div>` : ''}
    </div>${callout(s)}`)}`;
  };

  /* File cards: an editor-tab header, the question the file answers, and what goes in or stays out. */
  const fileCard = (side, i) => `
      <div class="ws-card ws-filecard t-${esc(side.tone || 'base')} m-in" ${at(i)}>
        <div class="ws-tab"><span class="ws-tab-ext">${esc((side.file.split('.').pop() || '').toUpperCase())}</span>${esc(side.file)}</div>
        <h3>${fmt(side.title)}</h3>
        ${side.answers ? `<p class="ws-answers"><span>Answers</span>${fmt(side.answers)}</p>` : ''}
        <div class="ws-chips in"><span class="ws-chips-label">Include</span>${side.include.map((x) => `<span class="ws-chip">${fmt(x)}</span>`).join('')}</div>
        ${side.leave ? `<div class="ws-chips out"><span class="ws-chips-label">Leave out</span>${side.leave.map((x) => `<span class="ws-chip">${fmt(x)}</span>`).join('')}</div>` : ''}
        ${side.note ? `<p class="ws-filenote">${fmt(side.note)}</p>` : ''}
      </div>`;

  W['ws-compare'] = (s, ctx) => `${head(s, ctx)}
    ${body(`<div class="ws-grid cols-${s.sides.length}${s.flow ? ' ws-flow' : ''}">${s.sides.map((side, i) => (side.include ? fileCard(side, i) : `
      <div class="ws-card ws-side t-${esc(side.tone || 'base')} m-in" ${at(i)}>
        ${side.who ? `<p class="ws-actor a-${side.who === 'Copilot' ? 'copilot' : 'you'}">${s.flow ? `<b>${i + 1}</b>` : ''}${esc(side.who)}</p>` : ''}
        <h3>${fmt(side.title)}</h3>
        ${side.file ? `<p class="ws-file">${fmt(side.file)}</p>` : ''}
        ${list(side.items)}
      </div>`)).join('')}
    </div>${callout(s)}`)}`;

  /* Roadmap as a timeline: each exercise is as wide as its minutes, grouped by part, with a running clock. */
  W['ws-roadmap'] = (s, ctx) => {
    const TONES = ['orange', 'red', 'purple', 'blue'];
    const sum = (items) => items.reduce((n, x) => n + (x.minutes || 0), 0);
    let clock = 0;
    let n = 0;
    return `${head(s, ctx)}
    ${body(`<div class="ws-track">${s.groups.map((g, gi) => `
      <section class="ws-phase t-${esc(g.tone || TONES[gi % TONES.length])}" style="flex:${sum(g.items)} 1 0">
        <p class="ws-phase-label">${fmt(g.label)}</p>
        <div class="ws-phase-row">${g.items.map((x) => {
          const start = clock;
          clock += x.minutes || 0;
          return `
          <div class="ws-seg m-in" style="flex:${x.minutes} 1 0;--at:${120 + (n++) * 80}ms">
            <span class="ws-seg-min">${esc(x.minutes)} min</span>
            <p class="ws-seg-id">${esc(x.id)}</p>
            <p class="ws-seg-title">${fmt(x.title)}</p>
            <p class="ws-seg-lead">${avatar({ name: x.lead })}${esc(x.lead)}</p>
            <p class="ws-seg-at">${start}\u2013${clock} min</p>
          </div>`;
        }).join('')}</div>
      </section>`).join('')}
    </div>${callout(s)}`)}`;
  };

  /* Glob cards: the pattern, one path it matches, one it skips, and what the rules are for. */
  W['ws-globs'] = (s, ctx) => `${head(s, ctx)}
    ${body(`<div class="ws-grid cols-${s.cols || 3} ws-globs">${s.globs.map((g, i) => `
      <div class="ws-card ws-glob m-in" ${at(i, 70)}>
        <p class="ws-glob-pat"><code>${esc(g.glob)}</code></p>
        <p class="ws-glob-label">${fmt(g.label)}</p>
        <p class="ws-glob-path hit"><span aria-label="matches">\u2713</span><code>${esc(g.hit)}</code></p>
        ${g.miss ? `<p class="ws-glob-path miss"><span aria-label="skips">\u2717</span><code>${esc(g.miss)}</code></p>` : ''}
        <p class="ws-glob-use">${fmt(g.use)}</p>
      </div>`).join('')}
    </div>${callout(s)}`)}`;

  /* Match: one open file, its path segments marked, and each instruction file that loads or skips for it. */
  W['ws-match'] = (s, ctx) => {
    let path = esc(s.open);
    (s.marks || []).forEach((m) => { path = path.replace(esc(m.text), `<mark class="t-${esc(m.tone)}">${esc(m.text)}</mark>`); });
    return `${head(s, ctx)}
    ${body(`<div class="ws-match">
      <div class="ws-open m-in" ${at(0)}><span class="ws-open-tag">Open in the editor</span><code class="ws-open-path">${path}</code></div>
      <ol class="ws-match-rows">${s.rows.map((r, i) => `
        <li class="ws-match-row ${r.on ? 'on' : 'off'} t-${esc(r.tone || 'base')} m-in" ${at(i + 1)}>
          <span class="ws-match-state" aria-label="${r.on ? 'loads' : 'skipped'}">${r.on ? '\u2713' : '\u2717'}</span>
          <span class="ws-match-file">${fmt(r.file)}</span>
          <span class="ws-match-glob">${r.glob ? `<code>${esc(r.glob)}</code>` : esc(r.always || 'always')}</span>
          <span class="ws-match-adds">${fmt(r.adds)}</span>
        </li>`).join('')}
      </ol>
    </div>${callout(s)}`)}`;
  };

  /* Variants: one card per rule file, each with its glob and a short sample that shows the rules at work. */
  W['ws-variants'] = (s, ctx) => `${head(s, ctx)}
    ${body(`<div class="ws-grid cols-${s.items.length} ws-variants">${s.items.map((v, i) => `
      <div class="ws-card ws-variant t-${esc(v.tone || 'base')} m-in" ${at(i)}>
        <div class="ws-variant-head"><span class="ws-variant-badge">${esc(v.badge)}</span><h3>${fmt(v.title)}</h3></div>
        <p class="ws-variant-glob"><span>${v.file ? 'File' : 'applyTo'}</span><code>${esc(v.file || v.glob)}</code></p>
        <pre class="ws-variant-code"><code>${esc(v.code.trim())}</code></pre>
        ${v.rules ? `<div class="ws-variant-rules">${v.rules.map((x) => `<span class="ws-chip">${fmt(x)}</span>`).join('')}</div>` : ''}
      </div>`).join('')}
    </div>${callout(s)}`)}`;

  /* Route: where a rule belongs, broad to specific. Scope pill, the need, an arrow, the file, and why. */
  W['ws-route'] = (s, ctx) => `${head(s, ctx)}
    ${body(`${s.lead ? `<p class="ws-route-lead">${fmt(s.lead)}</p>` : ''}
    <ol class="ws-route">${s.rows.map((r, i) => `
      <li class="ws-route-row t-${esc(r.tone || 'base')} m-in" ${at(i, 70)}>
        <span class="ws-route-scope">${esc(r.scope)}</span>
        <p class="ws-route-need">${fmt(r.need)}</p>
        <span class="ws-route-arrow" aria-hidden="true">\u2192</span>
        <p class="ws-route-file">${fmt(r.file)}</p>
        <p class="ws-route-why">${fmt(r.why)}</p>
      </li>`).join('')}
    </ol>${callout(s)}`)}`;

  /* Pointers: one always-on file whose link lines (targets[].line) point at the files that hold the detail. */
  W['ws-pointers'] = (s, ctx) => {
    const r = s.root;
    const state = { front: false };
    const pinOf = {};
    s.targets.filter((t) => t.line).forEach((t, i) => { pinOf[t.line] = i + 1; });
    const lines = r.lines.map((raw, i) => {
      const p = pinOf[i + 1];
      return `<span class="ln${p ? ' pinned' : ''}">${tintLine(raw, state) || ' '}${p ? `<span class="ws-pins"><b>${p}</b></span>` : ''}</span>`;
    }).join('');
    return `${head(s, ctx)}
    ${body(`<div class="ws-pointers">
      <figure class="ws-win is-editor no-nums ws-ptr-root m-in" ${at(0)}>
        <figcaption class="ws-win-bar"><span class="ws-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="ws-win-title">${esc(r.file)}</span><span class="ws-win-lang">${esc(r.badge || 'always on')}</span></figcaption>
        <pre class="ws-win-body"><code>${lines}</code></pre>
      </figure>
      <div class="ws-ptr-targets">${s.targets.map((t, i) => `
        <div class="ws-card ws-ptr-target${t.optional ? ' is-optional' : ''} m-in" ${at(i + 1)}>
          <p class="ws-tag">${t.line ? `<b class="ws-pin-n">${pinOf[t.line]}</b>` : ''}${fmt(t.file)}${t.optional ? '<span class="ws-ptr-opt">only when needed</span>' : ''}</p>
          <h3>${fmt(t.question)}</h3>
          <p>${fmt(t.holds)}</p>
        </div>`).join('')}
      </div>
    </div>${callout(s)}`)}`;
  };

  /* People list: persona avatars for known names, plain text otherwise ("All"). */
  const people = (names) => String(names || '').split(/,\s*/).filter(Boolean)
    .map((name) => (PERSONA_TONES[name] ? `<span class="ws-who-chip">${avatar({ name })}${esc(name)}</span>` : `<span class="ws-who-chip">${esc(name)}</span>`)).join('');

  /* The workboard stays on screen while people build: goal, steps, timebox, artifact, done-when. */
  W['ws-exercise'] = (s, ctx) => {
    const ex = s.exercise;
    return `${head({ ...s, kind: 'work', ex: ex.id }, ctx)}
    ${body(`<div class="ws-board">
      <section class="ws-board-main">
        <p class="ws-goal">${fmt(s.goal)}</p>
        <ol class="ws-steps">${s.steps.map((x) => `<li>${fmt(x)}</li>`).join('')}</ol>
        ${(s.prompt ? [].concat(s.prompt) : []).map((p) => {
          const text = (p.text || p).trim();
          return `<div class="ws-panel ws-prompt"><p class="ws-prompt-bar"><span class="ws-tag">${esc(p.label || 'Paste into Copilot Chat')}</span>${copyBtn(text)}</p><pre><code>${esc(text)}</code></pre></div>`;
        }).join('')}
      </section>
      <div class="ws-board-side">
        <div class="ws-timebox"><b>${esc(ex.minutes)}</b><span>min</span><em>timebox</em></div>
        <div class="ws-roles"><span class="ws-role">Lead</span>${people(ex.lead)}${ex.support ? `<span class="ws-role">Support</span>${people(ex.support)}` : ''}</div>
        <div class="ws-card ws-artifact"><p class="ws-tag">You produce</p>${list(s.artifacts)}</div>
        <div class="ws-card ws-done"><p class="ws-tag">Done when</p>${list(s.done, 'ws-checks')}</div>
        <p class="ws-full">${link(repoHref(ctx.deck, ex.file), `Full steps \u2197 ${ex.file.split('/').pop()}`)}</p>
      </div>
    </div>`)}`;
  };

  /* Checkpoint: the test as chat messages (an optional first line before "\n› " names the open file),
     then what success looks like and how to recover. */
  const chatAsk = (a) => {
    const [file, q] = a.includes('\n› ') ? a.split('\n› ') : [null, a];
    return `<div class="ws-msg">${file ? `<p class="ws-msg-file"><span>Open</span><code>${esc(file.trim())}</code></p>` : ''}
      <div class="ws-bubble"><span class="ws-you" aria-hidden="true">You</span><p>${esc(q.trim())}</p>${copyBtn(q.trim())}</div></div>`;
  };
  /* Terminal checks: each ask is a command with a Copy button; a line starting with "#" is a caption. */
  const termAsk = (a) => (/^\s*#/.test(a)
    ? `<p class="ws-cmd-note">${esc(a.replace(/^\s*#\s?/, ''))}</p>`
    : `<div class="ws-cmd"><code><span class="tk-prompt">$</span> <span class="tk-cmd">${esc(a.trim())}</span></code>${copyBtn(a.trim())}</div>`);
  W['ws-check'] = (s, ctx) => `${head({ ...s, kind: 'check' }, ctx)}
    ${body(`<div class="ws-check${s.refs ? ' has-refs' : ''}">
      <section class="ws-chat${s.mode === 'terminal' ? ' is-term' : ''} m-in" ${at(0)}>
        <p class="ws-chat-bar"><span class="ws-chat-dot" aria-hidden="true"></span>${fmt(s.where || (s.mode === 'terminal' ? 'Terminal' : 'Copilot Chat'))}</p>
        ${(Array.isArray(s.ask) ? s.ask : [s.ask]).map(s.mode === 'terminal' ? termAsk : chatAsk).join('')}
        ${s.refs ? `<div class="ws-msg ws-reply"><div class="ws-bubble is-copilot"><span class="ws-bot" aria-hidden="true">Copilot</span><div><p class="ws-refs-label">References</p><p class="ws-ref-files">${s.refs.map((f) => `<code>${esc(f)}</code>`).join('')}</p></div></div></div>` : ''}
      </section>
      <div class="ws-check-side">
        <section class="ws-card ws-expect t-good m-in" ${at(1)}><p class="ws-tag">Look for</p>${list(s.expect, 'ws-checks')}</section>
        <section class="ws-card ws-recover t-human m-in" ${at(2)}><p class="ws-tag">If not</p>${list(s.recover)}</section>
      </div>
    </div>`)}`;

  /* Quotes take the speaker's persona color. */
  const quote = (q, cls = 'small') => `<blockquote class="ws-quote ${cls}${PERSONA_TONES[q.who] ? ` p-${PERSONA_TONES[q.who]}` : ''}"><p>${fmt(q.text)}</p><cite>${esc(q.who)}</cite></blockquote>`;

  W['ws-debrief'] = (s, ctx) => `${head({ ...s, kind: 'debrief' }, ctx)}
    ${body(`<div class="ws-shift ws-debrief-shift">
        <div class="ws-card ws-side t-before m-in" ${at(0)}><h3>Before the module</h3>${list(s.before, 'ws-xs')}</div>
        <span class="ws-shift-arrow m-in" ${at(1)} aria-hidden="true">\u2192</span>
        <div class="ws-card ws-side t-good m-in" ${at(2)}><h3>After the module</h3>${list(s.after, 'ws-checks ws-ticked')}</div>
      </div>
      <div class="ws-grid cols-${(s.quotes || []).length || 1}">${(s.quotes || []).map((q) => quote(q)).join('')}</div>
      ${s.transfer ? `<p class="ws-transfer"><span>Your work</span> ${fmt(s.transfer)}</p>` : ''}`, 'ws-debrief')}`;

  W['ws-checklist'] = (s, ctx) => `${head({ ...s, kind: s.kind || 'check' }, ctx)}
    ${body(`<div class="ws-grid cols-${s.groups.length} ws-checklist">${s.groups.map((g, i) => `
      <div class="ws-card ws-cl t-${esc(g.tone || 'base')} m-in" ${at(i)}>
        ${g.mark ? `<span class="ws-mark" aria-hidden="true">${esc(g.mark)}</span>` : ''}
        ${g.tag ? `<p class="ws-tag">${fmt(g.tag)}</p>` : ''}
        <h3>${fmt(g.label)}</h3>${list(g.items, 'ws-checks')}
      </div>`).join('')}
    </div>${callout(s)}`)}`;

  W['ws-next'] = (s, ctx) => `${head({ ...s, kind: 'frame' }, ctx)}
    ${body(`<div class="ws-next">
      <section class="ws-carry-path">
        <p class="ws-tag">${fmt(s.carryLabel || 'What carries forward')}</p>
        <ol class="ws-carry-list">${s.carry.map(([m, how], i) => `
          <li class="${i === 0 ? 'is-next ' : ''}m-in" ${at(i, 70)}><b>${fmt(m)}</b><span>${fmt(how)}</span></li>`).join('')}
        </ol>
      </section>
      <section class="ws-card ws-up m-in" ${at(s.carry.length)}>
        <p class="ws-tag">Next up</p>
        <h3>${fmt(s.next.title)}</h3>
        <p>${fmt(s.next.blurb)}</p>
        ${s.next.quote ? quote(s.next.quote) : ''}
        ${s.next.file ? `<p class="ws-full">${link(repoHref(ctx.deck, s.next.file), `Read ahead \u2197 ${s.next.file.split('/').slice(-2).join('/')}`)}</p>` : ''}
      </section>
    </div>`)}`;

  const host = (href) => { try { return new URL(href).hostname.replace(/^www\./, ''); } catch { return ''; } };
  W['ws-refs'] = (s, ctx) => `${head({ ...s, kind: 'frame' }, ctx)}
    ${body(`<div class="ws-grid cols-${s.groups.length} ws-refs">${s.groups.map((g, i) => `
      <div class="ws-card ws-ref-group t-${esc(g.tone || 'base')} m-in" ${at(i)}><h3>${fmt(g.label)}</h3>
        <ul class="ws-ref-list">${g.links.map((l) => `<li><a class="ws-ref" href="${esc(l.href)}" target="_blank" rel="noopener"><span class="ws-ref-label">${esc(l.label)}</span><span class="ws-ref-host">${esc(host(l.href))} \u2197</span></a></li>`).join('')}</ul>
      </div>`).join('')}
    </div>${callout(s)}`)}`;

  window.WORKSHOP = W;
})();
