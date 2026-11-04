/*
  VS Code Agents: Pick, Place, Steer, Keep. Deck-only scenes.
  Verb colours stay fixed everywhere: Pick purple, Place cyan, Steer pink, Keep green.
  Orange marks a limit or a human decision.
*/
(() => {
  const { svg: v, html, wrap, measure, esc } = window.Kit;
  const SC = {};
  const W = 1440;
  const STATUS_Z = { GA: 'green', Stable: 'green', Preview: 'remote', Experimental: 'orange', 'Exp.': 'orange', Baseline: 'github', Base: 'github', Workflow: 'github', Flow: 'github' };

  const T = (x, y, s, cls = 't-sm', anchor = 'start') => v.text(x, y, s, { cls, anchor });
  const L = (x, y, s, max, cls = 't-sm', lh = 24, anchor = 'start') => v.lines(x, y, s, { max, cls, lh, anchor });
  const zg = (z, inner, extra = '') => v.g(inner, { cls: `z-${z}${extra ? ` ${extra}` : ''}` });
  const card = (x, y, w, h, { z = 'github', cls = 'box', label, dash } = {}, inner = '') =>
    zg(z, v.rect(x, y, w, h, { cls: `${cls}${dash ? ' dashed' : ''}`, r: 10 }) +
      (label ? T(x + 18, y + 28, label, 't-xs t-mono z-text vk-mark') : '') + inner);
  const arrow = (x1, y1, x2, y2, { z = 'github', at = 0, dash = false } = {}) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const k = 12;
    const p = (s) => `${(x2 - k * Math.cos(a + s)).toFixed(1)} ${(y2 - k * Math.sin(a + s)).toFixed(1)}`;
    const line = `M${x1} ${y1}L${x2} ${y2}`;
    const body = dash ? v.enter(v.path(line, { cls: 'wire zw dashed' }), at) : v.trace(line, { cls: 'wire zw', at, dur: 450 });
    return zg(z, body + v.pop(v.path(`M${p(-0.5)}L${x2} ${y2}L${p(0.5)}`, { cls: 'wire zw' }), at + 380));
  };
  const curveArrow = (d, end, angle, { z = 'github', at = 0, dash = true } = {}) => {
    const [x2, y2] = end;
    const k = 12;
    const p = (s) => `${(x2 - k * Math.cos(angle + s)).toFixed(1)} ${(y2 - k * Math.sin(angle + s)).toFixed(1)}`;
    return zg(z, v.enter(v.path(d, { cls: `wire zw${dash ? ' dashed' : ''}` }) +
      v.path(`M${p(-0.5)}L${x2} ${y2}L${p(0.5)}`, { cls: 'wire zw' }), at));
  };
  const badges = (list = [], extra = [], at = 0) => {
    let x = 0;
    const chips = [...list.map((b) => ({ text: b.text, z: STATUS_Z[b.status] || 'github' })), ...extra].map((b) => {
      const c = v.chip(x, 0, b.text, { z: b.z, size: 15, h: 30, r: 6 });
      x += c.w + 12;
      return c.markup;
    }).join('');
    return v.enter(chips, at);
  };
  const boundary = (y, text, at = 1600) => {
    const n = wrap(text, 132).length;
    const h = 22 + n * 24;
    return { h, markup: v.enter(zg('orange', v.rect(0, y, W, h, { cls: 'zone', r: 8 }) +
      T(20, y + 29, 'BOUNDARY', 't-xs t-mono z-text vk-mark') + L(150, y + 29, text, 132, 't-sm', 24)), at) };
  };
  const frame = (s, h, label, inner) => html.head(s) + v.scene(W, h, label, inner, 'vk') + html.footnote(s.footnote);
  const badgeText = (s) => (s.badges || []).map((b) => b.text).join('; ');

  /* ── Title: one card for every agent run; four verbs lock on clockwise in run order ── */
  SC['four-verbs'] = (s) => {
    const cardG = v.enter(zg('github', v.rect(110, 262, 540, 236, { cls: 'box', r: 16 }) +
      T(138, 298, s.cardLabel, 't-xs t-mono vk-mark') +
      v.path('M138 312H622', { cls: 'wire' }) +
      L(138, 396, s.cardBody, 34, 'vk-prompt', 36)), 0);
    const spots = [
      { x: 110, anchor: 'start', vy: 124, iy: 18, cy: 146, from: [0, -240], link: 'top' },
      { x: 650, anchor: 'end', vy: 124, iy: 18, cy: 146, from: [260, 0], link: 'top' },
      { x: 650, anchor: 'end', vy: 646, iy: 690, cy: 522, from: [0, 240], link: 'bottom' },
      { x: 110, anchor: 'start', vy: 646, iy: 690, cy: 522, from: [-260, 0], link: 'bottom' }
    ];
    const verbs = s.verbs.map((vb, i) => {
      const p = spots[i];
      const at = 500 + i * 450;
      const sizes = vb.chips.map((c) => Math.round(measure(c, 20) + 40));
      const total = sizes.reduce((a, b) => a + b, 0) + (sizes.length - 1) * 10;
      let cx = p.anchor === 'start' ? p.x : p.x - total;
      const chips = vb.chips.map((c, j) => {
        const m = v.chip(cx, p.cy, c, { z: vb.z, size: 20, h: 40, pad: 20, r: 8 }).markup;
        cx += sizes[j] + 10;
        return m;
      }).join('');
      const mid = p.anchor === 'start' ? p.x + total / 2 : p.x - total / 2;
      const link = p.link === 'top' ? `M${mid} 188L${mid} 260` : `M${mid} 500L${mid} 520`;
      return zg(vb.z,
        v.glide(T(p.x, p.vy, vb.verb, 'vk-verb', p.anchor) + T(p.x, p.iy, `0${i + 1}`, 't-xs t-mono vk-mark', p.anchor), p.from, at) +
        v.trace(link, { cls: 'wire zw', at: at + 300, dur: 300 }) +
        v.pop(chips, at + 350));
    }).join('');
    const loop = 'M110 280L110 262L650 262L650 498L110 498L110 280';
    return v.scene(760, 760,
      `${s.cardLabel}: ${s.cardBody} Four decisions lock on in run order: Pick with Compare, Place with a cloud session, Steer with Stop Shell, Keep with Keep and Undo.`,
      cardG + verbs + v.ride(loop, { z: 'purple', at: 2600, dur: 4200, r: 6 }), 'vk');
  };

  /* ── Thanks: the four verbs with their questions ── */
  SC['closing-verbs'] = (s) => {
    const rows = s.verbs.map((vb, i) => {
      const y = 96 + i * 128;
      return v.enter(zg(vb.z, T(0, y, vb.verb, 'vk-verb') + T(300, y - 8, vb.q, 't-lg')), 200 + i * 220);
    }).join('');
    return v.scene(760, 640, `Pick, place, steer, keep: ${s.verbs.map((x) => `${x.verb}, ${x.q}`).join(' ')} ${s.prompt}`,
      rows + v.enter(v.path('M0 548H760', { cls: 'wire' }) + T(0, 610, s.prompt, 't-lg'), 1200), 'vk');
  };

  /* ── Core question · feature wall: every mapped feature as a neutral chip, shuffled; one answer line ── */
  SC['feature-wall'] = (s) => {
    const NAME = 18;
    const VER = 14;
    const H = 40;
    const GAP = 12;
    const ROW = 56;
    const verText = (f) => (f.version === 'base' ? 'baseline' : f.version);
    const sized = s.wall.map((f) => {
      const nw = Math.round(measure(f.name, NAME) * 1.06);
      const bw = Math.round(measure(verText(f), VER) * 1.1 + 18);
      return { ...f, nw, bw, w: 14 + 8 + 10 + nw + 12 + bw + 8 };
    });
    const rows = [];
    sized.forEach((c) => {
      const row = rows[rows.length - 1];
      const used = row ? row.reduce((a, x) => a + x.w, 0) + row.length * GAP : 0;
      if (row && used + c.w <= W) row.push(c);
      else rows.push([c]);
    });
    // Fixed pseudo-random cascade order and small vertical offsets, so the wall feels scattered but stays on a grid.
    const jitter = (i) => ((i * 37) % 7) - 3;
    const order = sized.map((_, i) => (i * 23) % sized.length);
    let i = 0;
    const chips = rows.map((row, r) => {
      const natural = row.reduce((a, x) => a + x.w, 0);
      const last = r === rows.length - 1;
      const gap = last ? GAP : (W - natural) / (row.length - 1 || 1);
      let x = last ? (W - natural - GAP * (row.length - 1)) / 2 : 0;
      return row.map((c) => {
        const y = r * ROW + 6 + jitter(i);
        const at = 120 + order[i] * 32;
        i += 1;
        const bx = x + c.w - 8 - c.bw;
        const m = v.pop(
          zg('github', v.rect(x, y, c.w, H, { cls: 'box', r: 10 })) +
          zg(STATUS_Z[c.status] || 'github', v.circle(x + 18, y + H / 2, 4, { cls: 'vk-dot' })) +
          T(x + 32, y + 26, c.name, 'vk-chip') +
          v.rect(bx, y + 8, c.bw, H - 16, { cls: 'vk-opt', r: 6 }) +
          T(bx + c.bw / 2, y + 25, verText(c), 't-xs t-mono', 'middle'), at);
        x += c.w + gap;
        return m;
      }).join('');
    }).join('');
    const ay = rows.length * ROW + 52;
    const answer = v.enter(v.path(`M0 ${ay - 40}H${W}`, { cls: 'wire' }) + T(W / 2, ay + 4, s.answer, 'vk-big', 'middle'), 120 + sized.length * 32 + 400);
    const label = `${s.title} ${sized.length} agent features from VS Code 1.140–1.144 and the baseline, in no particular order: ${sized.map((c) => `${c.name} (${verText(c)}, ${c.status})`).join(', ')}. ${s.answer}`;
    return `${html.pill(s)}<h2 class="question m-in">“${esc(s.title)}”</h2>` + v.scene(W, ay + 16, label, chips + answer, 'vk');
  };

  /* ── Four decisions: verb, question, autonomy added, control added ── */
  SC['verb-grid'] = (s) => {
    const cw = (W - 3 * 24) / 4;
    const cols = s.columns.map((c, i) => {
      const x = i * (cw + 24);
      const at = 200 + i * 260;
      const box = (y, item, label, cls, z) => card(x, y, cw, 118, { z, cls, label },
        L(x + 18, y + 56, item.name, 30, 't-sm', 24) +
        zg(STATUS_Z[item.status] || 'github', T(x + 18, y + 106, item.rel, 't-xs t-mono z-text')));
      return v.enter(
        card(x, 0, cw, 64, { z: c.z, cls: 'zone' }, T(x + 20, 45, c.verb, 'vk-verb-sm') + T(x + cw - 20, 40, `0${i + 1}`, 't-xs t-mono', 'end')) +
        L(x + 4, 100, c.question, 32, 't-sm', 24), at) +
        v.enter(box(150, c.autonomy, 'AUTONOMY ADDED', 'box', 'github'), at + 300) +
        v.enter(box(290, c.control, 'CONTROL ADDED', 'zone', c.z), at + 500);
    }).join('');
    const cx = s.columns.map((_, i) => i * (cw + 24) + cw / 2);
    const line = (base) => cx.map((x, i) => `${i ? 'L' : 'M'}${x} ${base - i * 18}`).join('');
    const auto = line(478);
    const ctrl = line(500);
    const dots = (base, z) => zg(z, cx.map((x, i) => v.circle(x, base - i * 18, 6, { cls: 'vk-dot' })).join(''));
    const chart =
      zg('github', v.enter(v.path(auto, { cls: 'wire zw dashed' }), 1800)) + dots(478, 'github') +
      zg('purple', v.trace(ctrl, { cls: 'wire zw', at: 2000, dur: 900 })) + dots(500, 'purple') +
      v.enter(zg('github', v.path('M0 548H40', { cls: 'wire zw dashed' }) + T(52, 554, 'Autonomy added', 't-xs')) +
        zg('purple', v.path('M220 548H260', { cls: 'wire zw' }) + T(272, 554, 'Control added', 't-xs')) +
        T(W, 554, 'They rise together, release by release', 't-xs', 'end'), 2400);
    const label = `Four decisions. ${s.columns.map((c) => `${c.verb}: ${c.question} Autonomy added: ${c.autonomy.name} (${c.autonomy.rel}). Control added: ${c.control.name} (${c.control.rel}).`).join(' ')} Autonomy and control rise together.`;
    return frame(s, 562, label, cols + chart);
  };

  /* ── Pick · compare: five operating steps, a reading-the-results example, then the boundary ── */
  SC.compare = (s) => {
    const n = s.steps.length;
    const gap = 22;
    const cw = (W - (n - 1) * gap) / n;
    const max = Math.floor((cw - 36) / 8.8);
    const dL = Math.max(...s.steps.map((st) => wrap(st.body, max).length));
    const top = 56;
    const ch = 116 + (dL - 1) * 24 + 26;
    const steps = s.steps.map((st, i) => {
      const x = i * (cw + gap);
      const z = i === n - 1 ? 'orange' : 'pick';
      return v.enter(card(x, top, cw, ch, { z, cls: i === n - 1 ? 'zone' : 'box', label: `0${i + 1} · ${st.label}` },
        T(x + 18, top + 70, st.action, 'vk-name') + L(x + 18, top + 110, st.body, max, 't-sm', 24)), 200 + i * 300);
    }).join('');
    const sy = top + ch + 24;
    const rowH = 44;
    const story = v.enter(card(0, sy, W, 44 + s.story.length * rowH, { z: 'pick', cls: 'zone', label: s.storyLabel },
      s.story.map((r, i) => {
        const y = sy + 70 + i * rowH;
        const win = i === s.story.length - 1;
        return T(18, y, r.who, 't-sm t-mono') + T(200, y, r.what, 't-sm t-mono') +
          (r.result ? zg(win ? 'green' : 'orange', T(W - 18, y, r.result, 't-sm z-text', 'end')) : '');
      }).join('')), 200 + n * 300);
    const by = sy + 44 + s.story.length * rowH + 24;
    const b = boundary(by, s.boundary, 300 + n * 300);
    const label = `${s.title}. ${badgeText(s)}. ${s.steps.map((st, i) => `Step ${i + 1}, ${st.label.toLowerCase()}: ${st.action}. ${st.body}`).join(' ')} Reading the results: ${s.story.map((r) => `${r.who}: ${r.what}${r.result ? `. ${r.result}` : ''}`).join('; ')}. Boundary: ${s.boundary}`;
    return frame(s, by + b.h, label, badges(s.badges) + steps + story + b.markup);
  };

  /* ── Pick · Fusion: effort choice → routed models → usage detail ── */
  SC.fusion = (s) => {
    const opts = s.efforts.map((e, i) => {
      const y = 96 + i * 58;
      return v.rect(18, y, 344, 46, { cls: `vk-opt${i === 0 ? ' on' : ''}`, r: 8 }) + T(40, y + 30, e, 't-sm') +
        (i === 0 ? T(340, y + 30, 'selected', 't-xs t-mono', 'end') : '');
    }).join('');
    const effort = v.enter(card(0, 56, 380, 260, { z: 'pick', cls: 'zone', label: 'EFFORT · YOU CHOOSE' }, opts + T(18, 294, 'High and Max: plan limits apply', 't-xs')), 200);
    const list = (x, items) => items.map((t, i) => T(x, 130 + i * 52, `•  ${t}`, 't-sm')).join('');
    const route = v.enter(card(470, 56, 460, 260, { z: 'github', label: 'FUSION ROUTES · COPILOT CHOOSES' }, list(492, s.route)), 800);
    const usage = v.enter(card(1020, 56, 420, 260, { z: 'pick', cls: 'zone', label: 'USAGE DETAIL · YOU INSPECT' }, list(1042, s.usage)), 1400);
    const wires = arrow(380, 186, 466, 186, { z: 'pick', at: 600 }) + arrow(930, 186, 1016, 186, { z: 'pick', at: 1200 });
    const b = boundary(340, s.boundary, 1900);
    const label = `${s.title}. ${badgeText(s)}. The developer chooses Standard, High, or Max effort. Fusion ${s.route.join(', ').toLowerCase()}. Usage detail: ${s.usage.join(', ').toLowerCase()}. Boundary: ${s.boundary}`;
    return frame(s, 340 + b.h, label, badges(s.badges) + effort + route + usage + wires + b.markup);
  };

  /* ── Pick · route setup: four steps beside the config, one highlighted line; on-device alternative ── */
  SC['route-setup'] = (s) => {
    const top = 56;
    const steps = s.steps.map((st, i) => {
      const y = top + i * 92;
      return v.enter(zg('pick', v.rect(0, y, 560, 78, { cls: 'box', r: 10 }) +
        T(20, y + 33, '0' + (i + 1), 't-xs t-mono z-text vk-mark') + T(64, y + 33, st.k, 't-sm') + T(64, y + 61, st.v, 't-xs')), 200 + i * 250);
    }).join('');
    const lh = 26;
    const h = 56 + s.json.length * lh;
    const hi = s.json.findIndex((l) => l.includes(s.highlight));
    const hy = top + 52 + hi * lh;
    const code = s.json.map((l, k) => T(624, top + 70 + k * lh, l.replace(/^ +/, (m) => '\u00a0'.repeat(m.length)), 't-sm t-mono' + (k === hi ? ' z-text' : ''))).join('');
    const json = v.enter(card(600, top, 840, h, { z: 'github', label: s.file }) +
      zg('keep', v.rect(612, hy, 816, 26, { cls: 'zone', r: 6 }) + code), 1200) +
      v.enter(zg('keep', T(1060, hy + 19, s.why, 't-xs z-text')), 1700);
    const oy = top + Math.max(h, 4 * 92 - 14) + 24;
    const od = s.onDevice;
    const dev = v.enter(card(0, oy, W, 104, { z: 'orange', cls: 'zone', dash: true, label: od.label },
      zg('orange', T(18, oy + 64, od.needs.join('  ·  '), 't-sm z-text')) + T(18, oy + 90, od.how, 't-xs')), 2000);
    const label = s.title + '. ' + badgeText(s) + '. Steps: ' + s.steps.map((st, i) => (i + 1) + ', ' + st.k + ': ' + st.v).join('; ') +
      '. ' + s.file + ' model entry includes ' + s.highlight + '. ' + s.why + ' ' + od.label + ': needs ' + od.needs.join(', ') + '. ' + od.how;
    return frame(s, oy + 104, label, badges(s.badges) + steps + json + dev);
  };

  /* ── Pick · route proof: same follow-up, two answers; then what the run does and does not check ── */
  SC['route-proof'] = (s) => {
    const top = 56;
    const convo = v.enter(card(0, top, W, 64, { z: 'github' },
      T(20, top + 40, 'Turn 1', 't-xs t-mono vk-mark') + T(110, top + 40, '“' + s.turn1 + '”', 't-sm') +
      T(560, top + 40, 'Turn 2', 't-xs t-mono vk-mark') + T(650, top + 40, '“' + s.turn2 + '”', 't-sm')), 200);
    const cy = top + 88;
    const cw = (W - 24) / 2;
    const ch = 196;
    const cols = s.runs.map((r, i) => {
      const x = i * (cw + 24);
      return v.enter(card(x, cy, cw, ch, { z: r.z, cls: 'zone', label: r.label },
        T(x + 18, cy + 68, r.sends, 't-sm') +
        zg(r.z, T(x + 18, cy + 128, 'Answer:  “' + r.answer + '”', 't-lg z-text')) +
        T(x + 18, cy + 170, r.note, 't-xs')), 700 + i * 700);
    }).join('');
    const obs = v.enter(T(W, cy + ch + 26, s.observed, 't-xs t-mono', 'end'), 2000);
    const ly = cy + ch + 48;
    const lanes = s.lanes.map((ln, i) => {
      const y = ly + i * 56;
      const icon = ln.ok
        ? zg('green', v.circle(20, y + 22, 14, { cls: 'stop' }) + v.path('M13 ' + (y + 22) + 'l5 6l10 -12', { cls: 'check' }))
        : zg('orange', v.circle(20, y + 22, 14, { cls: 'stop' }) + T(20, y + 29, '?', 't-sm z-text', 'middle'));
      return v.enter(icon + zg(ln.ok ? 'green' : 'orange', T(50, y + 29, ln.label, 't-xs t-mono z-text vk-mark')) + T(330, y + 29, ln.body, 't-sm'), 2300 + i * 300);
    }).join('');
    const b = boundary(ly + 2 * 56 + 8, s.boundary, 2900);
    const label = s.title + '. Turn 1: ' + s.turn1 + ' Turn 2: ' + s.turn2 + ' ' +
      s.runs.map((r) => r.label + ': ' + r.sends + '. Answer: ' + r.answer + ' ' + r.note).join(' ') + ' ' + s.observed + '. ' +
      s.lanes.map((ln) => ln.label + ': ' + ln.body).join('. ') + '. Boundary: ' + s.boundary;
    return frame(s, ly + 2 * 56 + 8 + b.h, label, badges(s.badges) + convo + cols + obs + lanes + b.markup);
  };

  /* ── Roundup: one parameterised "also shipped" grid per verb ── */
  SC.roundup = (s) => {
    const n = s.items.length;
    const cols = n === 4 || n === 2 ? 2 : 3;
    const gap = 24;
    const cw = (W - (cols - 1) * gap) / cols;
    const max = Math.floor((cw - 36) / 8.8);
    const uL = Math.max(...s.items.map((it) => wrap(it.use, max).length));
    const bL = Math.max(...s.items.map((it) => wrap(it.limit, max).length));
    const useY = 128;
    const bLabelY = useY + (uL - 1) * 24 + 36;
    const bY = bLabelY + 24;
    const ch = bY + (bL - 1) * 24 + 22;
    const top = 50;
    const cards = s.items.map((it, i) => {
      const x = (i % cols) * (cw + gap);
      const y = top + Math.floor(i / cols) * (ch + gap);
      const ver = v.chip(x + 18, y + 16, it.version, { z: s.z, size: 15, h: 28, r: 6 });
      const st = v.chip(x + 18 + ver.w + 10, y + 16, it.status, { z: STATUS_Z[it.status] || 'github', size: 15, h: 28, r: 6 });
      return v.enter(card(x, y, cw, ch, { z: s.z },
        ver.markup + st.markup +
        T(x + 18, y + 82, it.name, 'vk-name') +
        L(x + 18, y + useY, it.use, max, 't-sm', 24) +
        zg('orange', T(x + 18, y + bLabelY, 'BOUNDARY', 't-xs t-mono z-text vk-mark') + L(x + 18, y + bY, it.limit, max, 't-sm z-text', 24))), 300 + i * 200);
    }).join('');
    const rows = Math.ceil(n / cols);
    const head = v.enter(v.chip(0, 0, `ALSO SHIPPED FOR ${s.verb.toUpperCase()}`, { z: s.z, size: 15, h: 30, r: 6 }).markup, 0);
    const label = `${s.title}. ${s.items.map((it) => `${it.name}, ${it.version}, ${it.status}: ${it.use} Boundary: ${it.limit}`).join(' ')}`;
    return frame(s, top + rows * ch + (rows - 1) * gap, label, head + cards);
  };

  /* ── Place · cloud relay: VS Code → cloud workspace → GitHub Mobile → VS Code ── */
  SC['cloud-relay'] = (s) => {
    const two = s.step === 2;
    const col = (x, z, label, lines, { cls = 'box', dim = false, at = 0 } = {}) =>
      v.enter(v.g(card(x, 56, 400, 230, { z, cls, label }, lines.map((t, i) => L(x + 18, 120 + i * 60, t, 36, 't-sm', 24)).join('')),
        { cls: dim ? 'dim' : '' }), at);
    const vs = col(0, 'place', 'VS CODE · LAPTOP', two
      ? ['Reopens the session from the list', 'Reviews the changes and test results']
      : ['New → Environment: Cloud', 'Choose Repository, send the task'], { at: 200 });
    const cloud = col(520, 'place', 'CLOUD WORKSPACE · GITHUB', ['Runs in a separate cloud workspace', 'Session keeps running'], { cls: 'zone', at: two ? 200 : 700 });
    const mobile = col(1040, 'place', 'GITHUB MOBILE', two
      ? ['Developer checks progress', 'Same session, same conversation']
      : ['Next: check progress from the phone'], { dim: !two, at: two ? 700 : 1100 });
    const pulse = v.halo(870, 90, 9, { z: 'place', at: 1500 }) + zg('place', v.circle(870, 90, 9, { cls: 'vk-dot' }));
    let body = badges(s.badges) + vs + cloud + mobile + pulse;
    let y;
    if (!two) {
      body += arrow(400, 171, 516, 171, { z: 'place', at: 500 }) +
        v.pop(v.chip(0, 304, 'Laptop closed · the cloud session continues', { z: 'orange', size: 16, h: 34, r: 8 }).markup, 1300);
      y = 360;
    } else {
      body += arrow(920, 171, 1036, 171, { z: 'place', at: 500 }) +
        curveArrow('M1240 286C1240 336 200 336 200 290', [200, 290], -Math.PI / 2, { z: 'place', at: 1000 }) +
        v.enter(T(720, 352, 'Returns to VS Code · same conversation', 't-sm', 'middle'), 1100);
      const ledger = (x, z, label, items, at) => v.enter(card(x, 372, 460, 108, { z, cls: 'zone', label }, items.map((it, i) => T(x + 18, 434 + i * 30, it, 't-sm')).join('')), at);
      body += ledger(0, 'place', 'REOPENS IN VS CODE', s.travels, 1400) + ledger(490, 'orange', 'STAYS IN THE CLOUD WORKSPACE', s.stays, 1600) + ledger(980, 'keep', 'COMES HOME THROUGH GIT', s.home, 1800);
      y = 502;
    }
    const b = boundary(y, s.boundary, 1900);
    const label = two
      ? `${s.title}. ${badgeText(s)}. The developer checks the cloud session from GitHub Mobile, then returns to the same conversation in VS Code. Reopens in VS Code: ${s.travels.join(', ')}. Stays in the cloud workspace: ${s.stays.join(', ')}. Comes home through Git: ${s.home.join('; ')}. Boundary: ${s.boundary}`
      : `${s.title}. ${badgeText(s)}. The developer starts a new cloud session for a long-running task from VS Code; it runs in a separate cloud workspace on GitHub infrastructure and keeps running after the laptop closes. Boundary: ${s.boundary}`;
    return frame(s, y + b.h, label, body + b.markup);
  };

  /* ── Place · hosts: Agent Host lifetime, Remote Environments, remote delegation, readiness check ── */
  SC['host-check'] = (s) => {
    const pw = 456;
    const px = (i) => i * (pw + 36);
    const p1 = v.enter(card(px(0), 56, pw, 300, { z: 'place', label: 'AGENT HOST · SESSION LIFETIME' },
      ['●  The session lives on the host', '○  The client window closes; the session continues', '↺  Reconnect, then check host and repository']
        .map((t, i) => L(18, 124 + i * 74, t, 38, 't-sm', 24)).join('')), 200);
    const envRows = s.environments.map((e, i) => {
      const y = 92 + i * 62;
      return v.rect(px(1) + 18, y, pw - 36, 50, { cls: 'vk-opt', r: 8 }) +
        v.circle(px(1) + 42, y + 25, 7, { cls: 'vk-dot-off' }) + T(px(1) + 62, y + 31, e, 't-sm') +
        T(px(1) + pw - 34, y + 31, 'status · connect', 't-xs t-mono', 'end');
    }).join('');
    const p2 = v.enter(card(px(1), 56, pw, 300, { z: 'place', cls: 'zone', label: 'REMOTE ENVIRONMENTS DIALOG' }, envRows), 700);
    const p3 = v.enter(card(px(2), 56, pw, 300, { z: 'orange', label: 'REMOTE DELEGATION · OFF BY DEFAULT', dash: true },
      T(px(2) + 18, 124, 'Task needs: OS, memory, CPU, model', 't-sm') +
      T(px(2) + 18, 158, '→  a host with matching capacity', 't-sm') +
      s.tools.map((t, i) => T(px(2) + 18, 214 + i * 30, t, 't-xs t-mono')).join('') +
      T(px(2) + 18, 330, 'Coordinating Agents window stays connected', 't-xs')), 1200);
    let cx = 560;
    const ticks = s.checklist.map((c) => {
      const m = v.rect(cx, 398, 22, 22, { cls: 'vk-tick', r: 5 }) + T(cx + 34, 416, c, 't-sm');
      cx += 34 + measure(c, 18) + 60;
      return m;
    }).join('');
    const check = v.enter(zg('orange', v.rect(0, 380, W, 58, { cls: 'zone', r: 8 }) +
      T(20, 415, 'CHECK BEFORE YOU SEND IT', 't-xs t-mono z-text vk-mark') + ticks), 1700);
    const label = `${s.title}. ${badgeText(s)}. The Agent Host keeps a session alive when the client window closes. The Remote Environments dialog lists ${s.environments.join(', ')}. Remote delegation tools (${s.tools.join(', ')}) match task needs to host capacity and are off by default. Before work runs on a remote, check: ${s.checklist.join(', ')}.`;
    return frame(s, 440, label, badges(s.badges) + p1 + p2 + p3 + check);
  };

  /* ── Steer · shells: Background Shells list; Stop Shell on one attached shell ── */
  SC.shells = (s) => {
    const session = v.enter(card(0, 56, 400, 302, { z: 'keep', label: 'AGENT SESSION' },
      L(18, 108, '❯ Run the tests and fix what fails', 32, 't-sm', 24) +
      L(18, 176, 'The test run hangs; the developer stops only that shell', 32, 't-xs', 22) +
      T(18, 330, '✓ Session and conversation keep going', 't-sm z-text')), 200);
    const pill = v.pop(v.chip(460, 56, '⟳  Background Shells · command, runtime, output', { z: 'steer', size: 17, h: 40, r: 20 }).markup, 500);
    const rows = s.shells.map((r, i) => {
      const y = 112 + i * 84;
      const btn = r.action ? zg('orange', v.rect(1050, y + 18, 160, 38, { cls: 'vk-opt on', r: 8 }) + T(1130, y + 43, r.action, 't-sm', 'middle')) : '';
      return v.enter(card(460, y, 980, 74, { z: r.z, label: null, dash: r.dashed },
        T(484, y + 32, r.cmd, 't-sm t-mono') + T(484, y + 58, r.meta, 't-xs') + btn +
        T(1420, y + 44, r.result, 't-sm z-text', 'end')), 800 + i * 300);
    }).join('');
    const b = boundary(384, s.boundary, 2000);
    const label = `${s.title}. ${badgeText(s)}. Background Shells lists ${s.shells.map((r) => `${r.cmd} (${r.meta}): ${r.result}`).join('; ')}. The session keeps going. Boundary: ${s.boundary}`;
    return frame(s, 384 + b.h, label, badges(s.badges) + session + pill + rows + b.markup);
  };

  /* ── Steer · assisted permissions: risk assessment, then the edits show up as ordinary uncommitted changes ── */
  SC['permission-flow'] = (s) => {
    const req = v.enter(card(0, 130, 250, 140, { z: 'github', label: 'TOOL REQUEST' }, L(18, 186, 'The agent asks to call a tool', 20, 't-sm', 26)), 200);
    const risk = v.enter(card(320, 130, 270, 140, { z: 'steer', cls: 'zone', label: 'RISK ASSESSMENT' }, L(338, 186, 'An LLM rates the call before it runs', 22, 't-sm', 26)), 600);
    const auto = v.enter(card(670, 64, 290, 116, { z: 'steer', cls: 'zone', label: 'LOW RISK' },
      T(688, 124, 'Runs without asking', 't-sm') + T(688, 156, 'Assessed as low risk', 't-xs')), 1000);
    const ask = v.enter(card(670, 220, 290, 116, { z: 'orange', cls: 'zone', label: 'HIGHER OR UNKNOWN RISK' },
      T(688, 280, 'The developer confirms', 't-sm') + T(688, 312, 'Prompt, as today', 't-xs')), 1200);
    const keep = v.enter(card(1060, 100, 380, 200, { z: 'keep', cls: 'zone', label: 'WHERE THE EDITS SHOW UP' },
      L(1078, 156, 'Source Control, as uncommitted changes, like any edit', 32, 't-sm', 26) + L(1078, 248, 'Read the diff before you commit', 20, 't-lg z-text', 34)), 1800);
    const sep = v.enter(v.path('M1010 60V340', { cls: 'wire dashed' }), 1600);
    const wires = arrow(250, 200, 316, 200, { z: 'steer', at: 400 }) +
      arrow(590, 180, 666, 124, { z: 'steer', at: 800 }) + arrow(590, 220, 666, 276, { z: 'orange', at: 900 }) +
      arrow(960, 124, 1056, 170, { z: 'github', at: 1500, dash: true }) + arrow(960, 276, 1056, 232, { z: 'github', at: 1500, dash: true });
    const b = boundary(362, s.boundary, 2100);
    const label = `${s.title}. ${badgeText(s)}. ${s.prereq}. A tool request goes to a risk assessment; low-risk calls run without asking; higher-risk or unknown-risk calls come to the developer. Whatever the calls edit shows up in Source Control as ordinary uncommitted changes; the developer reads the diff before committing. Boundary: ${s.boundary}`;
    return frame(s, 362 + b.h, label, badges(s.badges, [{ text: s.prereq, z: 'orange' }]) + req + risk + auto + ask + sep + keep + wires + b.markup);
  };

  /* ── Steer · sandbox: the approved edit stays inside; the wider reach stops at the edge ── */
  SC.sandbox = (s) => {
    const inner = v.g(card(40, 110, 520, 120, { z: 'keep', label: 'APPROVED OPERATION' }, T(58, 178, s.allowed, 't-sm') + T(58, 208, 'inside the workspace', 't-xs')));
    const box = v.enter(card(0, 56, 900, 270, { z: 'steer', cls: 'zone', label: 'SANDBOX · OS OR HOST-PROCESS RESTRICTIONS · WINDOWS, MACOS, LINUX', dash: true }) + inner +
      zg('keep', T(600, 178, '✓  Allowed', 't-lg z-text')), 200);
    const reach = arrow(300, 230, 300, 280, { z: 'orange', at: 900 }) + arrow(300, 280, 884, 280, { z: 'orange', at: 1100 }) +
      v.pop(zg('orange', v.path('M890 268l20 24M910 268l-20 24', { cls: 'wire zw' })), 1500);
    const blocked = v.enter(card(980, 110, 460, 120, { z: 'orange', label: 'SAME COMMAND, WIDER REACH' }, L(998, 166, s.blocked, 40, 't-sm', 24)), 1300) +
      v.enter(zg('orange', T(980, 288, '✗  Blocked at the sandbox edge', 't-lg z-text')), 1600);
    const b = boundary(350, s.boundary, 1900);
    const label = `${s.title}. ${badgeText(s)}; setting ${s.setting}. Allowed inside the sandbox: ${s.allowed}. Blocked at the edge: ${s.blocked}. Boundary: ${s.boundary}`;
    return frame(s, 350 + b.h, label, badges(s.badges, [{ text: s.setting, z: 'steer' }]) + box + reach + blocked + b.markup);
  };

  /* ── Steer · computer use: enable, request, approve or reject, stop and inspect ── */
  SC['desktop-approve'] = (s) => {
    const cw = 330;
    const cards = s.actions.map((a, i) => {
      const x = i * (cw + 40);
      const human = i === s.humanStep;
      return v.enter(card(x, 64, cw, 190, { z: human ? 'orange' : 'steer', cls: human ? 'zone' : 'box', label: `STEP 0${i + 1}` },
        T(x + 18, 124, a.title, 't-lg') + L(x + 18, 164, a.body, 30, 't-sm', 24)), 200 + i * 350) +
        (i < 3 ? arrow(x + cw + 2, 159, x + cw + 36, 159, { z: 'steer', at: 450 + i * 350 }) : '');
    }).join('');
    const loop = v.enter(zg('orange', T(905, 300, s.note, 't-sm z-text', 'middle')), 1800);
    const b = boundary(352, s.boundary, 2100);
    const label = `${s.title}. ${badgeText(s)}. ${s.actions.map((a, i) => `Step ${i + 1}, ${a.title}: ${a.body}`).join('. ')}. ${s.note}. Boundary: ${s.boundary}`;
    return frame(s, 352 + b.h, label, badges(s.badges, [{ text: 'Same decision, different case', z: 'steer' }]) + cards + loop + b.markup);
  };

  /* ── Keep · working set: Keep or Undo per file; disk state follows ── */
  SC['working-set'] = (s) => {
    const rows = s.files.map((f, i) => {
      const y = 100 + i * 62;
      const btn = (x, text, on, z) => zg(z, v.rect(x, y + 9, 100, 34, { cls: `vk-opt${on ? ' on' : ''}`, r: 8 }) + T(x + 50, y + 32, text, 't-sm', 'middle'));
      return v.enter(v.rect(18, y, 884, 52, { cls: 'vk-opt', r: 8 }) +
        T(36, y + 32, f.path, 't-sm t-mono') + T(400, y + 32, f.what, 't-xs') +
        btn(680, 'Keep', f.keep, 'keep') + btn(796, 'Undo', !f.keep, 'orange'), 500 + i * 260);
    }).join('');
    const kept = s.files.filter((f) => f.keep).length;
    const undone = s.files.length - kept;
    const list = v.enter(card(0, 56, 920, 300, { z: 'keep', label: `WORKING SET · ${s.files.length} CHANGED FILES` }), 200) + rows;
    const disk = v.enter(card(960, 56, 480, 300, { z: 'keep', cls: 'zone', label: 'WHAT EACH BUTTON DOES' },
      T(978, 124, `${kept} kept`, 'vk-big z-text') +
      L(978, 160, s.keepMeans, 40, 't-sm', 24) +
      zg('orange', T(978, 236, `${undone} undone`, 'vk-big z-text')) +
      L(978, 272, s.undoMeans, 40, 't-sm', 24)), 1700);
    const b = boundary(380, s.boundary, 2000);
    const label = `${s.title}. ${badgeText(s)}. Changed files: ${s.files.map((f) => `${f.path}, ${f.what}: ${f.keep ? 'Keep' : 'Undo'}`).join('; ')}. ${kept} kept: ${s.keepMeans}. ${undone} undone: ${s.undoMeans}. Boundary: ${s.boundary}`;
    return frame(s, 380 + b.h, label, badges(s.badges) + list + disk + b.markup);
  };

  /* ── Keep · scoped discard: choose branch, session, or last turn before discarding ── */
  SC['discard-scope'] = (s) => {
    const tabs = s.scopes.map((sc, i) => {
      const x = i * 180;
      const on = i === s.selected;
      return zg(on ? 'orange' : 'github', v.rect(x, 92, 170, 46, { cls: `vk-opt${on ? ' on' : ''}`, r: 8 }) + T(x + 85, 122, sc, 't-sm', 'middle'));
    }).join('');
    const explain = s.scopes.map((sc, i) => T(0, 196 + i * 40, `${sc}: ${s.explain[i]}`, i === s.selected ? 't-sm' : 't-xs')).join('');
    const selector = v.enter(T(0, 74, s.pickLabel, 't-xs t-mono vk-mark') + tabs + explain, 200);
    const layers = s.layers.map((l, i) => {
      const y = 64 + i * 66;
      const gone = i === 0;
      const mine = i === s.layers.length - 1;
      return v.enter(card(640, y, 600, 56, { z: gone ? 'orange' : mine ? 'keep' : 'github', cls: gone || mine ? 'zone' : 'box' }, T(664, y + 35, l, 't-sm')) +
        zg(gone ? 'orange' : 'keep', T(1440, y + 35, gone ? 'Discarded' : mine ? 'Kept · yours' : 'Kept', 't-sm z-text', 'end')), 600 + i * 220);
    }).join('');
    const b = boundary(350, s.boundary, 1800);
    const label = `${s.title}. ${badgeText(s)}. Changesets: ${s.scopes.map((sc, i) => `${sc}, ${s.explain[i]}`).join('; ')}; selected: ${s.scopes[s.selected]}. Discarded: ${s.layers[0]}. Kept: ${s.layers.slice(1).join('; ')}. Boundary: ${s.boundary}`;
    return frame(s, 350 + b.h, label, badges(s.badges) + selector + layers + b.markup);
  };

  /* ── Keep · browser loop: screenshot → element feedback → proposed CSS → fresh recapture ── */
  // A small browser window: one element out of place (dashed orange) before the fix, aligned after it.
  const miniPage = (x, y, fixed) =>
    v.rect(x, y, 150, 168, { cls: 'vk-phone', r: 10 }) +
    v.path(`M${x} ${y + 26}H${x + 150}`, { cls: 'wire' }) +
    v.circle(x + 14, y + 13, 4, { cls: 'vk-dot-off' }) + v.circle(x + 28, y + 13, 4, { cls: 'vk-dot-off' }) +
    v.rect(x + 14, y + 42, 122, 14, { cls: 'vk-field', r: 3 }) + v.rect(x + 14, y + 64, 122, 14, { cls: 'vk-field', r: 3 }) +
    (fixed ? v.rect(x + 14, y + 96, 122, 30, { cls: 'vk-btn', r: 5 })
      : v.rect(x + 34, y + 104, 122, 30, { cls: 'vk-btn', r: 5 }) + v.rect(x + 30, y + 100, 130, 38, { cls: 'vk-clip', r: 6 }));
  SC['browser-loop'] = (s) => {
    const cw = 330;
    const zs = ['github', 'steer', 'orange', 'keep'];
    const stages = s.stages.map((st, i) => {
      const x = i * (cw + 40);
      const y = 56;
      let inner = '';
      if (i === 0) inner = miniPage(x + 82, y + 46, false) + L(x + 18, y + 238, st.body, 30, 't-sm', 24);
      if (i === 1) inner = v.rect(x + 18, y + 50, 294, 128, { cls: 'vk-bubble', r: 10 }) + L(x + 34, y + 86, st.body, 26, 't-sm', 26) +
        T(x + 18, y + 252, 'Element context travels with it', 't-xs');
      if (i === 2) inner = s.css.map((c, k) => T(x + 30, y + 80 + k * 30, c.replace(/^ +/, (m) => '\u00a0'.repeat(m.length)), 't-sm t-mono')).join('') +
        T(x + 18, y + 252, st.body, 't-xs');
      if (i === 3) inner = miniPage(x + 82, y + 46, true) + L(x + 18, y + 238, st.body, 30, 't-sm z-text', 24);
      return v.enter(card(x, y, cw, 272, { z: zs[i], cls: i === 3 ? 'zone' : 'box', label: `0${i + 1} · ${st.label}` }, inner), 200 + i * 400) +
        (i < 3 ? arrow(x + cw + 2, y + 136, x + cw + 36, y + 136, { z: 'keep', at: 500 + i * 400 }) : '');
    }).join('');
    const loop = curveArrow('M1275 328C1275 372 555 372 555 332', [555, 332], -Math.PI / 2, { z: 'steer', at: 1900 }) +
      v.enter(T(915, 390, 'Still wrong? Comment again, then recapture', 't-xs', 'middle'), 2000);
    const notes = v.enter(zg('keep', v.rect(0, 410, W, 48, { cls: 'zone', r: 8 }) + T(18, 440, s.privacy, 't-xs z-text')), 2200);
    const label = `${s.title}. ${badgeText(s)}. ${s.stages.map((st, i) => `Step ${i + 1}, ${st.label.toLowerCase()}: ${st.body}`).join('. ')}. Proposed CSS: ${s.css.join(' ')}. If still wrong, comment again and recapture. ${s.privacy}`;
    return frame(s, 460, label, badges(s.badges) + stages + loop + notes);
  };

  /* ── Keep · evidence columns: runner status, page measurement, diff review ── */
  SC['evidence-columns'] = (s) => {
    const cw = 456;
    const cols = s.columns.map((c, i) => {
      const x = i * (cw + 36);
      let fields;
      if (c.fields.length > 2 || /^[A-Z]+$/.test(c.fields[0])) {
        let fx = x + 18;
        fields = c.fields.map((f) => {
          const ch = v.chip(fx, 140, f, { z: c.z, size: 17, h: 38, r: 8 });
          fx += ch.w + 12;
          return ch.markup;
        }).join('');
      } else {
        fields = c.fields.map((f, k) => T(x + 18, 160 + k * 38, f, 't-sm t-mono')).join('');
      }
      return v.enter(card(x, 0, cw, 300, { z: c.z, label: c.label },
        L(x + 18, 74, c.question, 36, 'vk-q', 28) + fields + L(x + 18, 252, c.note, 44, 't-xs', 22)), 200 + i * 400);
    }).join('');
    const strip = s.ifDisagree ? v.enter(zg('keep', v.rect(0, 324, W, 52, { cls: 'zone', r: 8 }) +
      T(20, 356, 'IF THEY DISAGREE', 't-xs t-mono z-text vk-mark') + T(210, 357, s.ifDisagree, 't-sm')), 1400) : '';
    const by = s.ifDisagree ? 392 : 330;
    const b = boundary(by, s.boundary, 1700);
    const label = `${s.title}. ${s.columns.map((c) => `${c.label}: ${c.question} Fields: ${c.fields.join(', ')}. ${c.note}`).join(' ')}${s.ifDisagree ? ` If they disagree: ${s.ifDisagree}` : ''} Boundary: ${s.boundary}`;
    return frame(s, by + b.h, label, cols + strip + b.markup);
  };

  /* ── Release map: every feature filed under its verb, with release and status ── */
  SC['release-map'] = (s) => {
    const cw = (W - 3 * 24) / 4;
    const cols = s.columns.map((c, i) => {
      const x = i * (cw + 24);
      const rows = c.items.map(([name, ver, status, hero], k) => {
        const y = 92 + k * 34;
        const tag = ver === 'base' ? (status === 'Base' ? 'Baseline' : `Base · ${status}`) : `${ver} · ${status}`;
        return zg(c.z, v.circle(x + 14, y - 6, 6, { cls: hero ? 'vk-dot' : 'vk-dot-off' })) + T(x + 30, y, name, 'vk-row') +
          zg(STATUS_Z[status] || 'github', T(x + cw - 8, y, tag, 't-xs t-mono z-text', 'end'));
      }).join('');
      return v.enter(card(x, 0, cw, 52, { z: c.z, cls: 'zone' }, T(x + 18, 38, c.verb, 'vk-verb-sm') + T(x + cw - 18, 34, `${c.items.length} features`, 't-xs t-mono', 'end')) + rows, 200 + i * 300);
    }).join('');
    const legendItems = [['green', 'GA · Stable'], ['remote', 'Preview'], ['orange', 'Experimental'], ['github', 'Baseline or workflow']];
    let lx = 0;
    const legend = legendItems.map(([z, t]) => {
      const m = zg(z, T(lx, 482, `■ ${t}`, 't-xs z-text'));
      lx += measure(t, 15) + 70;
      return m;
    }).join('') + zg('purple', v.circle(lx + 10, 476, 6, { cls: 'vk-dot' }) + T(lx + 24, 482, 'hero slide', 't-xs') +
      v.circle(lx + 140, 476, 6, { cls: 'vk-dot-off' }) + T(lx + 154, 482, 'roundup', 't-xs'));
    const label = `${s.title}. ${s.columns.map((c) => `${c.verb}: ${c.items.map(([n, ver, st]) => `${n} ${ver === 'base' ? 'baseline' : ver} ${st}`).join(', ')}`).join('. ')}. ${s.notesOnly}.`;
    return frame(s, 522, label, cols + v.enter(legend + T(0, 516, s.notesOnly, 't-xs'), 1600));
  };

  window.SCENES = SC;
})();
