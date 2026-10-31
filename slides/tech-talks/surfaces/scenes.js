/*
  Which Copilot Where? — deck-only scenes and visuals.
  Each scene returns markup for one slide. Motion is declared with Kit wrappers and
  plays once on entry; the settled state is the final frame.
  Standard slides come from native/frames.js and reusable layouts from native/patterns.js.
*/
(() => {
  const { svg, html, esc, measure, cx } = window.Kit;

  /* Matrix geometry, shared by the matrix and every route slide. */
  const M = { w: 1440, h: 556, head: 248, colW: 286, gap: 12, top: 76, rowH: 88, rowGap: 8, chipH: 32, chipGap: 8, pad: 14 };
  const colX = (i) => M.head + M.gap + i * (M.colW + M.gap);
  const rowY = (r) => M.top + r * (M.rowH + M.rowGap);
  const chipW = (label) => Math.round(measure(label) + 28);
  const key = (row, column, item) => `${row}|${column}|${item}`;

  /* Lay chips into lines that fit the cell, centred both ways. */
  const layoutCell = (items, x, y) => {
    const max = M.colW - M.pad * 2;
    const lines = [];
    for (const label of items) {
      const w = chipW(label);
      const line = lines[lines.length - 1];
      if (line && line.w + M.chipGap + w <= max) { line.items.push({ label, w }); line.w += M.chipGap + w; }
      else lines.push({ items: [{ label, w }], w });
    }
    const blockH = lines.length * M.chipH + (lines.length - 1) * M.chipGap;
    let cy = y + (M.rowH - blockH) / 2;
    const out = [];
    for (const line of lines) {
      let cxp = x + (M.colW - line.w) / 2;
      for (const it of line.items) { out.push({ ...it, x: cxp, y: cy }); cxp += it.w + M.chipGap; }
      cy += M.chipH + M.chipGap;
    }
    return out;
  };

  /*
    Builds the matrix in layers so a route can sit between the cell backgrounds and
    the chips. `focus` (a Set of chip keys) dims everything off the route.
  */
  const buildMatrix = (matrix, { animate = true, focus = null } = {}) => {
    const chips = new Map();
    const onRoute = (r, c) => focus && [...focus].some((k) => k.startsWith(`${r.label}|${c.key}|`));
    const rowsOn = new Set(focus ? [...focus].map((k) => k.split('|')[0]) : []);
    const colsOn = new Set(focus ? [...focus].map((k) => k.split('|')[1]) : []);
    const dim = (on) => (focus && !on ? 'dim m-dim' : '');
    const dimAt = { at: 150 };

    const axis = svg.text(18, 30, matrix.axis[0], { cls: 't-xs', anchor: 'start' }) + svg.text(18, 54, matrix.axis[1], { cls: 't-xs', anchor: 'start' });

    const heads = matrix.columns.map((c, i) => {
      const x = colX(i);
      const inner = svg.rect(x, 0, M.colW, 64, { cls: 'zone', r: 12 }) +
        svg.text(x + M.colW / 2, 28, c.label) +
        svg.text(x + M.colW / 2, 52, c.detail, { cls: 't-xs' });
      const g = svg.g(inner, { cls: cx(`z-${c.key}`, dim(colsOn.has(c.key))), ...dimAt });
      return animate ? svg.enter(g, 80 * i) : g;
    }).join('');

    let back = '';
    let front = '';
    matrix.rows.forEach((r, ri) => {
      const y = rowY(ri);
      const at = 320 + 90 * ri;
      let rowBack = svg.g(
        svg.rect(0, y, M.head, M.rowH, { cls: 'box head', r: 12 }) +
        svg.text(22, y + 40, r.icon, { cls: 't-lg', anchor: 'start' }) +
        svg.text(70, y + 38, r.label, { anchor: 'start' }) +
        svg.text(70, y + 64, r.detail, { cls: 't-xs', anchor: 'start' }),
        { cls: dim(rowsOn.has(r.label)), ...dimAt });
      let rowFront = '';
      matrix.columns.forEach((c, ci) => {
        const x = colX(ci);
        const items = r.cells[c.key] || [];
        rowBack += svg.g(svg.rect(x, y, M.colW, M.rowH, { cls: items.length ? 'zone' : 'box soft', r: 12 }),
          { cls: cx(`z-${c.key}`, items.length && dim(onRoute(r, c))), ...dimAt });
        layoutCell(items, x, y).forEach((chip, j) => {
          const k = key(r.label, c.key, chip.label);
          chips.set(k, { ...chip, cx: chip.x + chip.w / 2, cy: chip.y + M.chipH / 2 });
          const on = focus?.has(k);
          const markup = svg.g(svg.chip(chip.x, chip.y, chip.label, { z: c.key, h: M.chipH, cls: on ? 'on' : '' }).markup,
            { cls: dim(on), ...dimAt });
          rowFront += animate ? svg.pop(markup, at + 180 + 50 * j) : markup;
        });
      });
      back += animate ? svg.enter(rowBack, at) : rowBack;
      front += rowFront;
    });

    return { back: axis + heads + back, front, chips };
  };

  /* Route path: arcs over neighbours on one line, bulges beside stacked chips, curves elsewhere. */
  const routePath = (pts) => pts.reduce((d, [x, y], i) => {
    if (!i) return `M${x} ${y}`;
    const [px, py] = pts[i - 1];
    if (Math.abs(py - y) < 1) return `${d}Q${(px + x) / 2} ${y - 112} ${x} ${y}`;
    if (Math.abs(px - x) < 70) {
      const side = i % 2 ? Math.max(px, x) + 120 : Math.min(px, x) - 120;
      return `${d}C${side} ${py} ${side} ${y} ${x} ${y}`;
    }
    const mx = (px + x) / 2;
    return `${d}C${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, '');

  /* Seven surfaces on a ring around a centre card. Shared by the title and closing slides. */
  const RING = 760;
  const ring = (surfaces, centre) => {
    const W = RING;
    const C = W / 2;
    const R = 292;
    const zones = { 'VS Code': 'local', 'Copilot CLI': 'remote', 'GitHub.com Chat': 'github', 'Coding agent': 'github', 'Code Review': 'github', 'Copilot app': 'purple', 'Copilot SDK': 'runtime' };
    const nodes = surfaces.map((label, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / surfaces.length;
      return { label, z: zones[label], x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
    });
    const spokes = nodes.map((n, i) => {
      const d = `M${C} ${C}L${n.x.toFixed(1)} ${n.y.toFixed(1)}`;
      return svg.g(svg.trace(d, { at: 500 + 90 * i, dur: 700 }), { cls: `z-${n.z}` }) +
        svg.ride(d, { z: n.z, at: 1500 + 420 * i, dur: 2940, r: 6 });
    }).join('');
    const chips = nodes.map((n, i) => {
      const w = chipW(n.label) + 12;
      const chip = svg.chip(n.x - w / 2, n.y - 22, n.label, { z: n.z, size: 19, h: 44, pad: 20 });
      return svg.pop(chip.markup, 700 + 90 * i);
    }).join('');
    return svg.circle(C, C, R, { cls: 'ring' }) +
      svg.circle(C, C, 150, { cls: 'ring' }) +
      spokes + chips +
      svg.pop(svg.g(svg.rect(C - centre.w / 2, C - centre.h / 2, centre.w, centre.h, { cls: 'box task', r: 20 }), { cls: 'z-purple' }) + centre.inner(C), 150) +
      svg.halo(C, C, 132, { z: 'purple', at: 1200 });
  };

  /* Title visual: the task card at the centre routes to seven surfaces. */
  const surfaceRing = (s) => svg.scene(RING, RING, 'A task card at the centre routes to seven Copilot surfaces: VS Code, Copilot CLI, GitHub.com Chat, coding agent, Code Review, the Copilot app, and the Copilot SDK.', ring(s.surfaces, {
    w: 260, h: 140,
    inner: (C) => svg.text(C, C - 26, 'ELIGIBLE WORK', { cls: 't-xs t-mono' }) +
      svg.text(C, C + 10, 'Which surface', { cls: 't-lg' }) +
      svg.text(C, C + 48, 'owns it next?', { cls: 't-lg' })
  }), 'title-map');

  /* Closing visual: the opening ring returns, now holding the question for the room. */
  const closingRing = (s, { deck }) => {
    const surfaces = deck.slides.find((x) => x.id === 'title').surfaces;
    const q = Kit.wrap(s.prompt, 18);
    return svg.scene(RING, RING, `Seven Copilot surfaces ring the closing question: ${s.prompt}`, ring(surfaces, {
      w: 300, h: 60 + q.length * 38,
      inner: (C) => q.map((l, k) => svg.text(C, C + 10 + (k - (q.length - 1) / 2) * 38, l, { cls: 't-lg' })).join('')
    }), 'title-map');
  };

  const matrix = (s, { deck }) => {
    const m = buildMatrix(deck.matrix);
    const label = 'Matrix of five control surfaces by four execution locations. VS Code and Copilot CLI reach local, remote, and GitHub execution; GitHub.com and the Copilot app steer GitHub-hosted work; your product hosts the Copilot SDK in its own runtime.';
    return `${html.head(s)}${svg.scene(M.w, M.h, label, m.back + m.front, 'matrix')}${html.footnote(s.footnote)}`;
  };

  const route = (s, { deck }) => {
    const focus = new Set(s.steps.map((st) => key(st.row, st.column, st.item)));
    const m = buildMatrix(deck.matrix, { animate: false, focus });
    const pts = s.steps.map((st) => {
      const c = m.chips.get(key(st.row, st.column, st.item));
      if (!c) throw new Error(`route step not in matrix: ${st.row} / ${st.column} / ${st.item}`);
      return [c.cx, c.cy, c];
    });
    const d = routePath(pts);
    const traceAt = 650;
    const traceDur = 650 * Math.max(1, pts.length - 1);
    const badges = pts.map(([, , c], i) => {
      const at = traceAt + (pts.length > 1 ? (i / (pts.length - 1)) * traceDur : 0);
      return svg.pop(svg.circle(c.x + 2, c.y + 1, 15, { cls: 'badge-dot' }) + svg.text(c.x + 2, c.y + 7, String(i + 1), { cls: 't-dark t-sm' }), at);
    }).join('');
    const motion = pts.length > 1
      ? svg.g(svg.trace(d, { cls: 'route', at: traceAt, dur: traceDur }), { cls: 'z-purple' }) +
        svg.ride(d, { z: 'purple', at: traceAt + traceDur + 300, dur: 1000 + 700 * pts.length, r: 8 })
      : svg.halo(pts[0][0], pts[0][1], 34, { z: 'purple', at: traceAt });
    const where = s.steps.map((st, i) => `${i + 1}: ${st.row} ${st.item} (${st.column})`).join(', ');
    const label = `${s.role} route across the surface matrix. ${where}. Artifact: ${s.outcome}.`;
    return `${html.head(s)}${svg.scene(M.w, M.h, label, m.back + motion + m.front + badges, 'matrix')}
      <p class="route-caption m-in" style="--at:${traceAt + traceDur}ms"><span><b>${esc(s.role)}</b> follows the numbered route</span><span>Artifact: <b>${esc(s.outcome)}</b></span></p>`;
  };


  /* Decision tree: one root question, four outcome branches, and the surfaces each context selects. */
  const tree = (s) => {
    const W = 1440;
    const n = s.branches.length;
    const gap = 24;
    const cw = (W - gap * (n - 1)) / n;
    const rootW = 780;
    const root = { x: (W - rootW) / 2, y: 0, h: 60 };
    const by = 92;
    const bh = 140;
    const ly = by + bh + 26;
    const lh = 78;
    const lgap = 10;
    let body = '';
    let pick = '';
    s.branches.forEach((b, i) => {
      const x = i * (cw + gap);
      const c = x + cw / 2;
      const at = 450 + 180 * i;
      body += svg.trace(`M${W / 2} ${root.h}C${W / 2} ${root.h + 24} ${c} ${by - 24} ${c} ${by}`, { cls: 'wire', at: at - 150, dur: 450 });
      body += svg.enter(
        svg.rect(x, by, cw, bh, { cls: 'box', r: 18 }) +
        svg.text(x + 22, by + 44, b.icon, { cls: 't-emoji intent-icon', anchor: 'start' }) +
        svg.text(x + 64, by + 40, b.intent, { cls: 'intent', anchor: 'start' }) +
        svg.lines(x + 22, by + 76, b.prompt, { cls: 't-sm', anchor: 'start', max: 34, lh: 24 }) +
        svg.text(x + 22, by + bh - 16, b.roles, { cls: 't-xs', anchor: 'start' }), at);
      const sx = x + 16;
      const lastMid = ly + (b.routes.length - 1) * (lh + lgap) + lh / 2;
      body += svg.trace(`M${sx} ${by + bh}L${sx} ${lastMid}`, { cls: 'wire', at: at + 300, dur: 400 });
      b.routes.forEach((r, j) => {
        const lx = x + 36;
        const lw = cw - 36;
        const top = ly + j * (lh + lgap);
        const mid = top + lh / 2;
        const lat = at + 500 + 140 * j;
        body += svg.trace(`M${sx} ${mid}L${lx} ${mid}`, { cls: 'wire', at: lat - 120, dur: 200 });
        body += svg.pop(svg.g(
          svg.rect(lx, top, lw, lh, { cls: 'zone', r: 14 }) +
          svg.text(lx + 18, top + 23, r.condition, { cls: 't-xs', anchor: 'start' }) +
          svg.text(lx + 18, top + 49, r.surface, { cls: 'z-text', anchor: 'start' }) +
          svg.text(lx + 18, top + 69, r.detail, { cls: 't-xs', anchor: 'start' }), { cls: `z-${r.z}` }), lat);
        if (i === 2 && j === 1) {
          pick = `M${W / 2} ${root.h}C${W / 2} ${root.h + 24} ${c} ${by - 24} ${c} ${by}L${c} ${by + bh}C${c} ${by + bh + 20} ${sx} ${by + bh + 6} ${sx} ${by + bh + 30}L${sx} ${mid}L${lx} ${mid}`;
        }
      });
    });
    const rootBox = svg.pop(svg.g(svg.rect(root.x, root.y, rootW, root.h, { cls: 'box task', r: 32 }), { cls: 'z-purple' }) +
      svg.text(W / 2, root.y + 40, s.root, { cls: 't-lg' }), 100);
    const height = ly + 3 * lh + 2 * lgap;
    const label = `Decision tree. ${s.root} ${s.branches.map((b) => `${b.intent} (${b.roles}): ${b.routes.map((r) => `${r.condition} → ${r.surface}`).join('; ')}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, height, label,
      rootBox + svg.ride(pick, { z: 'purple', at: 2600, dur: 3000, r: 7 }) + body, 'tree')}${html.footnote(s.footnote)}`;
  };

  /* Paired onboarding: two role lanes, each a four-stop journey from first task to the exit signal. */
  const ROW_TONE = { keep: 'green', move: 'accent', stop: 'orange' };
  const onboard = (s) => {
    const W = 1440;
    const gap = 48;
    const cw = (W - gap) / 2;
    const hh = 76;
    const top0 = hh + 28;
    const rh = 94;
    const rg = 10;
    const body = s.lanes.map((lane, li) => {
      const x = li * (cw + gap);
      const t0 = 300 + li * 220;
      const rail = x + 20;
      const mids = lane.items.map((_, j) => top0 + j * (rh + rg) + rh / 2);
      const railD = `M${rail} ${hh}L${rail} ${mids[mids.length - 1]}`;
      const header = svg.enter(svg.g(
        svg.rect(x, 0, cw, hh, { cls: 'zone', r: 18 }) +
        svg.text(x + 24, 50, lane.icon, { cls: 't-emoji', anchor: 'start' }) +
        `<text x="${x + 76}" y="48" text-anchor="start" class="t-lg">${esc(lane.role)} <tspan class="z-text lane-surface">· ${esc(lane.surface)}</tspan></text>`,
        { cls: `z-${lane.z}` }), t0);
      const rows = lane.items.map((it, j) => {
        const top = mids[j] - rh / 2;
        const tone = ROW_TONE[it.kind];
        const lines = Kit.wrap(it.detail, it.kind === 'move' || it.kind === 'stop' ? 33 : 38);
        const y0 = mids[j] - (lines.length - 1) * 15 + 8;
        const at = t0 + 350 + j * 160;
        const row =
          svg.rect(x + 40, top, cw - 40, rh, { cls: tone ? 'zone' : 'box soft', r: 14 }) +
          svg.text(x + 60, mids[j] + 6, it.title.toUpperCase(), { cls: `t-xs t-mono row-label${tone ? ' z-text' : ''}`, anchor: 'start' }) +
          lines.map((l, k) => svg.text(x + 250, y0 + k * 30, l, { cls: 'row-detail', anchor: 'start' })).join('') +
          (it.kind === 'move' ? svg.text(x + cw - 22, mids[j] + 9, '➜', { cls: 'z-text row-mark', anchor: 'end' }) : '') +
          (it.kind === 'stop' ? svg.text(x + cw - 22, mids[j] + 9, '⊘', { cls: 'z-text row-mark', anchor: 'end' }) : '');
        const stop = svg.pop(svg.circle(rail, mids[j], 9, { cls: 'stop' }), at);
        return svg.g(svg.enter(row, at), { cls: tone ? `z-${tone}` : `z-${lane.z}` }) + svg.g(stop, { cls: `z-${tone || lane.z}` });
      }).join('');
      return svg.g(svg.trace(railD, { cls: 'wire', at: t0 + 200, dur: 900 }), {}) + header + rows +
        svg.ride(railD, { z: lane.z, at: t0 + 1300, dur: 2400, r: 6 });
    }).join('');
    const H = top0 + 4 * rh + 3 * rg;
    const label = s.lanes.map((l) => `${l.role}, ${l.surface}: ${l.items.map((i) => `${i.title}: ${i.detail}`).join('. ')}.`).join(' ');
    return `${html.head(s)}${svg.scene(W, H, label, body, 'onboard')}`;
  };


  window.SCENES = { 'surface-ring': surfaceRing, 'closing-ring': closingRing, matrix, route, 'route-by-outcome': tree, onboard };
})();