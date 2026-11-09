/*
  Copilot Chat Internals — deck-only scenes.
  Generic `rows` (labelled evidence rows) and `columns` (three explanation cards), plus two
  product mocks: `logs-tree` (the Logs view in tree mode) and `flow-chart` (the Agent Flow Chart).
  It draws event lists, setting lists, span trees, and comparison rows. Everything else
  uses the shared frames (native/frames.js) and patterns (native/patterns.js).
*/
(() => {
  const { svg, html, wrap, curve } = window.Kit;

  /* Data: rows[{ label, detail?, tag?, z?, tz?, indent?, hl? }], labelW?, tagW?, mono? (labels), monoDetail?, colLabels?[3]. */
  const rows = (s) => {
    const W = 1440;
    const IND = 48;
    const PAD = 24;
    const GAP = 12;
    const LH = 28;
    const L = 22;
    const D = 20;
    const labelW = s.labelW || 340;
    const hasTag = s.rows.some((r) => r.tag);
    const tagW = s.tagW || 230;
    const lPx = s.mono ? L * 0.64 : L * 0.6;
    const dPx = s.monoDetail ? D * 0.64 : D * 0.58;
    let y = 0;
    let body = '';
    if (s.colLabels) {
      const dx = labelW + 16;
      body += svg.text(PAD, 20, s.colLabels[0].toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(dx, 20, s.colLabels[1].toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' }) +
        (hasTag && s.colLabels[2] ? svg.text(W - 12 - tagW / 2, 20, s.colLabels[2].toUpperCase(), { cls: 't-xs t-mono' }) : '');
      y = 40;
    }
    s.rows.forEach((r, i) => {
      const x = (r.indent || 0) * IND;
      const lMax = Math.max(8, Math.floor((labelW - PAD - 12) / lPx));
      const lLines = wrap(r.label, lMax);
      const dx = x + labelW + 16;
      const dRight = W - (hasTag ? tagW + 36 : PAD);
      const dMax = Math.max(10, Math.floor((dRight - dx) / dPx));
      const dLines = r.detail ? wrap(r.detail, dMax) : [];
      const n = Math.max(lLines.length, dLines.length, 1);
      const h = Math.max(s.rowH || 64, 22 + n * LH + 10);
      const mid = y + h / 2;
      const lY = mid - ((lLines.length - 1) * LH) / 2 + 8;
      const dY = mid - ((dLines.length - 1) * LH) / 2 + 7;
      const tag = r.tag
        ? svg.g(
          svg.rect(W - 12 - tagW, mid - 21, tagW, 42, { cls: 'zone', r: 21 }) +
          svg.text(W - 12 - tagW / 2, mid + 7, r.tag, { cls: 'z-text rw-tag' }),
          { cls: `z-${r.tz || r.z || 'accent'}` })
        : '';
      const row = svg.g(
        svg.rect(x, y, W - x, h, { cls: r.hl ? 'zone' : 'box', r: 14 }) +
        lLines.map((l, k) => svg.text(x + PAD, lY + k * LH, l, { cls: `rw-label${s.mono ? ' t-mono' : ''}`, anchor: 'start' })).join('') +
        dLines.map((l, k) => svg.text(dx, dY + k * LH, l, { cls: `t-muted rw-detail${s.monoDetail ? ' t-mono' : ''}`, anchor: 'start' })).join('') +
        tag,
        { cls: `z-${r.z || 'accent'}` });
      body += svg.enter(row, 300 + 170 * i);
      y += h + GAP;
    });
    const H = y - GAP;
    const label = `${s.title}. ${s.rows.map((r) => `${r.label}${r.detail ? `: ${r.detail}` : ''}${r.tag ? ` (${r.tag})` : ''}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'rows')}${html.footnote(s.footnote)}`;
  };

  /* Logs view mock. Data: tree[{ type, z, text, indent?, status?, sz?, hl?, expand? }], filters[{ label, z?, on? }]. */
  const logsTree = (s) => {
    const W = 1440;
    const IND = 46;
    const RH = 46;
    const GAP = 8;
    const TYPE_W = 170;
    let body = '';
    body += svg.enter(
      svg.rect(0, 0, W, 60, { cls: 'box head', r: 14 }) +
      svg.text(24, 38, 'Agent Debug Logs', { cls: 'lt-title', anchor: 'start' }) +
      svg.text(232, 38, '› Logs', { cls: 't-muted lt-title', anchor: 'start' }) +
      (() => {
        let x = W - 24;
        const parts = [];
        const toggle = [{ label: 'Tree', on: true }, { label: 'List' }].reverse();
        toggle.forEach((t) => {
          const c = svg.chip(0, 0, t.label, { size: 16, h: 30 });
          x -= c.w;
          parts.push(svg.chip(x, 15, t.label, { z: t.on ? 'accent' : undefined, size: 16, h: 30, cls: t.on ? '' : 'lt-off' }).markup);
          x -= 8;
        });
        x -= 18;
        [...s.filters].reverse().forEach((f) => {
          const c = svg.chip(0, 0, f.label, { size: 16, h: 30 });
          x -= c.w;
          parts.push(svg.chip(x, 15, f.label, { z: f.z || 'accent', size: 16, h: 30, cls: f.on ? 'lt-on' : 'lt-off' }).markup);
          x -= 8;
        });
        return parts.join('');
      })(), 150);
    let y = 80;
    const stack = [];
    s.tree.forEach((r, i) => {
      const lv = r.indent || 0;
      const x = 16 + lv * IND;
      const mid = y + RH / 2;
      let wires = '';
      if (lv > 0 && stack[lv - 1] !== undefined) {
        const px = 16 + (lv - 1) * IND + 22;
        wires = svg.path(`M${px} ${stack[lv - 1]}L${px} ${mid}L${x} ${mid}`, { cls: 'wire faint' });
      }
      stack[lv] = mid;
      stack.length = lv + 1;
      const type = svg.g(
        svg.rect(x + 10, mid - 15, TYPE_W, 30, { cls: 'chip', r: 8 }) +
        svg.text(x + 10 + TYPE_W / 2, mid + 6, r.type, { cls: 'chip-text lt-type' }),
        { cls: `z-${r.z || 'accent'}` });
      const status = r.status
        ? svg.g(
          svg.rect(W - 130, mid - 15, 110, 30, { cls: 'chip', r: 15 }) +
          svg.text(W - 75, mid + 6, r.status, { cls: 'chip-text lt-type' }),
          { cls: `z-${r.sz || 'green'}` })
        : '';
      const row = svg.g(
        svg.rect(x, y, W - x, RH, { cls: r.hl ? 'zone' : 'box soft', r: 10 }) +
        type +
        svg.text(x + TYPE_W + 30, mid + 7, r.text, { cls: `lt-text${r.mono ? ' t-mono' : ''}`, anchor: 'start' }) +
        status,
        { cls: `z-${r.hl ? 'orange' : r.z || 'accent'}` });
      body += svg.enter(wires + row, 350 + 140 * i);
      y += RH + GAP;
      if (r.expand) {
        const ex = x + IND;
        const h = 34 + r.expand.length * 28;
        body += svg.enter(
          svg.path(`M${x + 22} ${mid + RH / 2}L${x + 22} ${y + h / 2}L${ex} ${y + h / 2}`, { cls: 'wire faint' }) +
          svg.g(svg.rect(ex, y, W - ex, h, { cls: 'zone dashed', r: 10 }) +
            r.expand.map((l, k) => svg.text(ex + 24, y + 30 + k * 28, l, { cls: `lt-exp t-mono${k ? ' t-muted' : ' z-text'}`, anchor: 'start' })).join(''),
          { cls: 'z-orange' }),
          350 + 140 * i + 300);
        y += h + GAP;
      }
    });
    const H = y - GAP;
    const label = `${s.title}. A Logs view in tree mode: ${s.tree.map((r) => `${r.type}: ${r.text}${r.status ? ` (${r.status})` : ''}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'logs-tree')}${html.footnote(s.footnote)}`;
  };

  /* Flow chart mock. Data: nodes[{ id, kind, title, detail?, z, x, y, w?, sel?, err? }], edges[[from, to]], inspect{ head, lines[] }, hints[]. */
  const flowChart = (s) => {
    const W = 1440;
    const NH = 92;
    const byId = Object.fromEntries(s.nodes.map((n) => [n.id, { w: 230, ...n }]));
    let body = '';
    s.edges.forEach(([a, b], i) => {
      const A = byId[a];
      const B = byId[b];
      body += svg.trace(curve(A.x + A.w, A.y + NH / 2, B.x, B.y + NH / 2), { cls: 'wire link', at: 500 + 160 * i, dur: 600 });
    });
    s.nodes.forEach((n0, i) => {
      const n = byId[n0.id];
      const z = n.err ? 'orange' : n.z;
      const chip = svg.chip(n.x + 14, n.y - 15, n.kind, { z, size: 14, h: 28 });
      const node = svg.g(
        svg.rect(n.x, n.y, n.w, NH, { cls: n.sel || n.err ? 'zone' : 'box', r: 14 }) +
        (n.sel ? svg.rect(n.x - 6, n.y - 6, n.w + 12, NH + 12, { cls: 'focus-ring', r: 18 }) : '') +
        chip.markup +
        svg.text(n.x + 18, n.y + 46, n.title, { cls: 'fc-title', anchor: 'start' }) +
        (n.detail ? svg.text(n.x + 18, n.y + 74, n.detail, { cls: 't-muted fc-detail', anchor: 'start' }) : ''),
        { cls: `z-${z}` });
      body += svg.pop(node, 250 + 160 * i);
    });
    const sel = s.nodes.map((n) => byId[n.id]).find((n) => n.sel);
    const ix = 1090;
    const iw = W - ix;
    const iy = 120;
    const ih = 70 + s.inspect.lines.length * 36 + 10;
    body += svg.enter(
      svg.g(
        svg.rect(ix, iy, iw, ih, { cls: 'zone', r: 16 }) +
        svg.text(ix + 22, iy + 42, s.inspect.head, { cls: 'z-text fc-title', anchor: 'start' }) +
        s.inspect.lines.map((l, k) => svg.text(ix + 22, iy + 84 + k * 36, l, { cls: 't-muted fc-detail', anchor: 'start' })).join(''),
        { cls: `z-${sel ? sel.z : 'accent'}` }),
      1700);
    const maxY = Math.max(...s.nodes.map((n) => n.y + NH), iy + ih);
    let hx = 0;
    const hy = maxY + 40;
    const hints = s.hints.map((h, k) => {
      const c = svg.chip(hx, hy, h, { z: k ? 'accent' : 'purple', size: 16, h: 34 });
      hx += c.w + 12;
      return c.markup;
    }).join('');
    body += svg.enter(hints, 1900);
    const H = hy + 34;
    const label = `${s.title}. ${s.nodes.map((n) => `${n.kind} ${n.title}`).join(', ')}. Selected: ${s.inspect.head}. ${s.hints.join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'flow-chart')}${html.footnote(s.footnote)}`;
  };

  /* Three explanation columns. Data: columns[{ head, z, items[{ t, d?, mono? }] }]. */
  const columns = (s) => {
    const W = 1440;
    const GAP = 28;
    const n = s.columns.length;
    const cw = (W - GAP * (n - 1)) / n;
    const PAD = 24;
    const tMax = Math.floor((cw - PAD * 2) / (19 * 0.56));
    const dMaxSans = Math.floor((cw - PAD * 2) / (17 * 0.55));
    const dMaxMono = Math.floor((cw - PAD * 2) / (16 * 0.61));
    const laid = s.columns.map((c) => {
      let y = 80;
      const parts = c.items.map((it) => {
        const tl = it.t ? wrap(it.t, tMax) : [];
        const dl = it.d ? wrap(it.d, it.mono ? dMaxMono : dMaxSans) : [];
        const top = y;
        y += tl.length * 26 + dl.length * 23 + 22;
        return { tl, dl, top, mono: it.mono };
      });
      return { c, parts, h: y };
    });
    const colH = Math.max(...laid.map((l) => l.h));
    const H = colH + (s.band ? 92 : 0);
    let body = '';
    laid.forEach(({ c, parts }, i) => {
      const x = i * (cw + GAP);
      let col = svg.rect(x, 0, cw, colH, { cls: 'zone', r: 18 }) +
        svg.rect(x, 0, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + PAD, 50, c.head, { cls: 'z-text col-head', anchor: 'start' });
      parts.forEach((p) => {
        col += p.tl.map((l, k) => svg.text(x + PAD, p.top + 20 + k * 26, l, { cls: 'col-t', anchor: 'start' })).join('') +
          p.dl.map((l, k) => svg.text(x + PAD, p.top + 20 + p.tl.length * 26 + k * 23, l, { cls: `t-muted col-d${p.mono ? ' t-mono' : ''}`, anchor: 'start' })).join('');
      });
      body += svg.enter(svg.g(col, { cls: `z-${c.z || 'accent'}` }), 300 + 350 * i);
    });
    if (s.band) {
      const by = colH + 28;
      body += svg.enter(svg.g(
        svg.rect(0, by, W, 64, { cls: 'zone', r: 32 }) +
        svg.circle(40, by + 32, 14, { cls: 'z-fill' }) +
        svg.text(40, by + 39, '!', { cls: 't-dark' }) +
        svg.text(72, by + 40, s.band, { cls: 'z-text band-t', anchor: 'start' }),
        { cls: 'z-accent' }), 300 + 350 * n);
    }
    const label = `${s.title}. ${s.columns.map((c) => `${c.head}: ${c.items.map((it) => `${it.t}${it.d ? ` (${it.d})` : ''}`).join('; ')}`).join('. ')}.${s.band ? ` ${s.band}` : ''}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'columns')}${html.footnote(s.footnote)}`;
  };

  /* Claim and its evidence. Data: claim{ who, text }, evidence[{ view, line, note, status }], verdict. */
  const verify = (s) => {
    const W = 1440;
    const CW = 430;
    const EX = 540;
    const EH = 118;
    const EG = 18;
    const stackH = s.evidence.length * EH + (s.evidence.length - 1) * EG;
    const cl = wrap(s.claim.text, 34);
    const ch = 110 + cl.length * 30;
    const cy = (stackH - ch) / 2;
    let body = svg.enter(svg.g(
      svg.rect(0, cy, CW, ch, { cls: 'zone', r: 18 }) +
      svg.rect(0, cy, 6, ch, { cls: 'card-edge', r: 3 }) +
      svg.chip(26, cy + 24, 'claim', { z: 'purple', size: 15, h: 28 }).markup +
      svg.text(26 + 90, cy + 44, s.claim.who, { cls: 'z-text vf-who', anchor: 'start' }) +
      cl.map((l, k) => svg.text(26, cy + 92 + k * 30, l, { cls: 'vf-claim t-mono', anchor: 'start' })).join(''),
      { cls: 'z-purple' }), 200);
    s.evidence.forEach((ev, i) => {
      const y = i * (EH + EG);
      const mid = y + EH / 2;
      const last = i === s.evidence.length - 1;
      const at = 700 + 450 * i;
      body += svg.trace(curve(CW, cy + ch / 2, EX, mid), { cls: 'wire link', at, dur: 500 });
      const st = svg.chip(0, 0, ev.status, { size: 16, h: 32 });
      body += svg.enter(svg.g(
        svg.rect(EX, y, W - EX, EH, { cls: last ? 'zone' : 'box', r: 16 }) +
        svg.text(EX + 26, y + 34, ev.view.toUpperCase(), { cls: 't-xs t-mono col-label', anchor: 'start' }) +
        svg.text(EX + 26, y + 72, ev.line, { cls: 'vf-line t-mono', anchor: 'start' }) +
        svg.text(EX + 26, y + 100, ev.note, { cls: 't-muted vf-note', anchor: 'start' }) +
        svg.chip(W - 24 - st.w - 40, mid - 16, ev.status, { z: 'green', size: 16, h: 32 }).markup +
        svg.circle(W - 40, mid, 14, { cls: 'stop' }) +
        svg.path(`M${W - 47} ${mid}l5 5l9 -10`, { cls: 'check' }),
        { cls: 'z-green' }), at + 250);
    });
    const vy = stackH + 30;
    body += svg.enter(svg.g(
      svg.rect(0, vy, W, 64, { cls: 'zone', r: 32 }) +
      svg.circle(40, vy + 32, 15, { cls: 'z-fill' }) +
      svg.path(`M32 ${vy + 32}l6 6l10 -12`, { cls: 'check vf-dark' }) +
      svg.text(72, vy + 41, s.verdict, { cls: 'z-text band-t', anchor: 'start' }),
      { cls: 'z-green' }), 700 + 450 * s.evidence.length + 200);
    const H = vy + 64;
    const label = `${s.title}. Claim: ${s.claim.text}. ${s.evidence.map((e) => `${e.view}: ${e.line} (${e.status})`).join('. ')}. ${s.verdict}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'verify')}${html.footnote(s.footnote)}`;
  };

  /* Two side-by-side runbooks. Data: panels[{ head, tag, z, steps[{ t, d, mono? }], watch }]. */
  const runbook = (s) => {
    const W = 1440;
    const GAP = 32;
    const n = s.panels.length;
    const pw = (W - GAP * (n - 1)) / n;
    const PAD = 28;
    const tx = PAD + 50;
    const dMax = Math.floor((pw - tx - PAD) / (17 * 0.55));
    const laid = s.panels.map((p) => {
      let y = 96;
      const steps = p.steps.map((st) => {
        const dl = wrap(st.d, st.mono ? Math.floor(dMax * 0.9) : dMax);
        const top = y;
        y += 30 + dl.length * 24 + 18;
        return { ...st, dl, top };
      });
      return { p, steps, h: y };
    });
    const stepsH = Math.max(...laid.map((l) => l.h));
    const H = stepsH + 70;
    let body = '';
    laid.forEach(({ p, steps }, i) => {
      const x = i * (pw + GAP);
      const tag = svg.chip(0, 0, p.tag, { size: 15, h: 28 });
      let g = svg.rect(x, 0, pw, H, { cls: 'zone', r: 18 }) +
        svg.rect(x, 0, pw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + PAD, 52, p.head, { cls: 'z-text col-head', anchor: 'start' }) +
        svg.chip(x + pw - PAD - tag.w, 30, p.tag, { z: p.z, size: 15, h: 28 }).markup;
      steps.forEach((st, k) => {
        g += svg.enter(
          svg.circle(x + PAD + 17, st.top + 12, 17, { cls: 'z-fill' }) +
          svg.text(x + PAD + 17, st.top + 19, String(k + 1), { cls: 't-dark rb-num' }) +
          svg.text(x + tx, st.top + 20, st.t, { cls: 'col-t', anchor: 'start' }) +
          st.dl.map((l, j) => svg.text(x + tx, st.top + 46 + j * 24, l, { cls: `t-muted col-d${st.mono ? ' t-mono' : ''}`, anchor: 'start' })).join(''),
          500 + 300 * k + 150 * i);
        if (k < steps.length - 1) g += svg.path(`M${x + PAD + 17} ${st.top + 32}L${x + PAD + 17} ${steps[k + 1].top - 8}`, { cls: 'wire faint' });
      });
      g += svg.enter(
        svg.path(`M${x + PAD} ${stepsH + 4}L${x + pw - PAD} ${stepsH + 4}`, { cls: 'wire faint dashed' }) +
        svg.g(svg.circle(x + PAD + 12, stepsH + 36, 12, { cls: 'z-fill' }) +
          svg.text(x + PAD + 12, stepsH + 42, '!', { cls: 't-dark rb-num' }) +
          svg.text(x + PAD + 36, stepsH + 43, p.watch, { cls: 'z-text rb-watch', anchor: 'start' }), { cls: 'z-orange' }),
        500 + 300 * p.steps.length + 150 * i);
      body += svg.enter(svg.g(g, { cls: `z-${p.z}` }), 200 + 200 * i);
    });
    const label = `${s.title}. ${s.panels.map((p) => `${p.head} (${p.tag}): ${p.steps.map((st, k) => `${k + 1}. ${st.t}: ${st.d}`).join('; ')}. Watch for: ${p.watch}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'runbook')}${html.footnote(s.footnote)}`;
  };

  /* Before-to-evidence lanes, one per question. Data: lanes[{ q, z, before, after, where }], band. */
  const recap = (s) => {
    const W = 1440;
    const GAP = 24;
    const n = s.lanes.length;
    const lw = (W - GAP * (n - 1)) / n;
    const PAD = 22;
    const max = Math.floor((lw - PAD * 2) / (19 * 0.55));
    const bl = s.lanes.map((l) => wrap(l.before, max));
    const al = s.lanes.map((l) => wrap(l.after, max - 2));
    const BH = 40 + Math.max(...bl.map((x) => x.length)) * 26;
    const AH = 40 + Math.max(...al.map((x) => x.length)) * 26;
    const by = 70;
    const ay = by + BH + 70;
    const wy = ay + AH + 22;
    const LH = wy + 34 + 22;
    let body = '';
    s.lanes.forEach((l, i) => {
      const x = i * (lw + GAP);
      const cxm = x + lw / 2;
      const at = 300 + 380 * i;
      const where = svg.chip(0, 0, l.where, { size: 15, h: 30 });
      body += svg.enter(svg.g(
        svg.rect(x, 0, lw, LH, { cls: 'box soft', r: 18 }) +
        svg.rect(x, 0, lw, 6, { cls: 'card-top', r: 3 }) +
        svg.circle(x + PAD + 15, 38, 15, { cls: 'z-fill' }) +
        svg.text(x + PAD + 15, 44, String(i + 1), { cls: 't-dark rb-num' }) +
        svg.text(x + PAD + 42, 45, l.q, { cls: 'z-text rc-q', anchor: 'start' }) +
        svg.rect(x + 14, by, lw - 28, BH, { cls: 'box soft rc-before', r: 12 }) +
        bl[i].map((t, k) => svg.text(x + PAD + 6, by + 32 + k * 26, t, { cls: 't-muted rc-before-t', anchor: 'start' })).join(''),
        { cls: `z-${l.z}` }), at);
      body += svg.trace(`M${cxm} ${by + BH + 8}L${cxm} ${ay - 12}`, { cls: 'wire link', at: at + 250, dur: 400 }) +
        svg.enter(svg.path(`M${cxm - 8} ${ay - 20}l8 9l8 -9`, { cls: 'wire link' }), at + 550);
      body += svg.enter(svg.g(
        svg.rect(x + 14, ay, lw - 28, AH, { cls: 'zone', r: 12 }) +
        svg.path(`M${x + PAD + 4} ${ay + 26}l6 6l11 -13`, { cls: 'check' }) +
        al[i].map((t, k) => svg.text(x + PAD + 34, ay + 32 + k * 26, t, { cls: 'rc-after-t', anchor: 'start' })).join(''),
        { cls: 'z-green' }) +
        svg.chip(cxm - where.w / 2, wy, l.where, { z: l.z, size: 15, h: 30 }).markup, at + 600);
    });
    let H = LH;
    if (s.band) {
      const y = LH + 26;
      body += svg.enter(svg.g(
        svg.rect(0, y, W, 64, { cls: 'zone', r: 32 }) +
        svg.circle(40, y + 32, 15, { cls: 'z-fill' }) +
        svg.path(`M32 ${y + 32}l6 6l10 -12`, { cls: 'check vf-dark' }) +
        svg.text(72, y + 41, s.band, { cls: 'z-text band-t', anchor: 'start' }),
        { cls: 'z-green' }), 300 + 380 * n + 400);
      H = y + 64;
    }
    const label = `${s.title}. ${s.lanes.map((l) => `${l.q} Before: ${l.before}. After: ${l.after} (${l.where}).`).join(' ')}${s.band ? ` ${s.band}` : ''}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'recap')}${html.footnote(s.footnote)}`;
  };

  window.SCENES = { rows, 'logs-tree': logsTree, 'flow-chart': flowChart, columns, verify, runbook, recap };
})();
