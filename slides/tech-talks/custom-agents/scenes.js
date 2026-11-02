/*
  Custom Agents — deck-only visuals.
  Shared frames and patterns stay in slides/native; these scenes draw this talk's
  runtime evidence, configuration anatomy, and resolution tables.
*/
(() => {
  const { svg, html, esc, wrap } = window.Kit;

  const runtimeRing = (s) => {
    const W = 760;
    const C = 380;
    const file = '.github/agents/test-writer.agent.md';
    const nodes = [
      { x: 220, y: 34, w: 320, h: 94, cx: 380, cy: 81, z: 'local', label: s.runtimes?.[0] || 'VS Code' },
      { x: 22, y: 534, w: 320, h: 94, cx: 182, cy: 581, z: 'remote', label: s.runtimes?.[1] || 'Copilot CLI' },
      { x: 418, y: 534, w: 320, h: 94, cx: 578, cy: 581, z: 'github', label: s.runtimes?.[2] || 'Copilot cloud agent' }
    ];
    const center = { x: 176, y: 284, w: 408, h: 174 };
    const paths = nodes.map((n, i) => {
      const start = i === 0 ? [C, 128] : [i === 1 ? 330 : 430, 520];
      const end = i === 0 ? [C, center.y] : [i === 1 ? center.x + 96 : center.x + center.w - 96, center.y + center.h];
      const d = `M${start[0]} ${start[1]}C${start[0]} ${Math.round((start[1] + end[1]) / 2)} ${end[0]} ${Math.round((start[1] + end[1]) / 2)} ${end[0]} ${end[1]}`;
      return svg.trace(d, { cls: `wire z-${n.z}`, at: 320 + i * 260, dur: 850 }) +
        svg.ride(d, { z: n.z, at: 1500 + i * 280, dur: 2800, r: 6 });
    }).join('');
    const nodeMarkup = nodes.map((n, i) => svg.enter(
      svg.g(
        svg.rect(n.x, n.y, n.w, n.h, { cls: 'zone', r: 20 }) +
        svg.lines(n.cx, n.cy + 7, n.label, { cls: 't-lg z-text', max: 24, lh: 27 }),
        { cls: `z-${n.z}` }), 520 + i * 180)).join('');
    const fileCard = svg.pop(svg.g(
      svg.rect(center.x, center.y, center.w, center.h, { cls: 'box task', r: 24 }) +
      svg.text(C, center.y + 48, 'ONE SHARED PROFILE', { cls: 't-xs t-mono' }) +
      svg.lines(C, center.y + 91, file, { cls: 't-mono t-sm', max: 34, lh: 25 }) +
      svg.text(C, center.y + 148, 'role · tools · body · model', { cls: 't-xs' }),
      { cls: 'z-purple' }), 200);
    const label = `One shared custom agent file, ${file}, enters three runtimes: ${nodes.map((n) => n.label).join(', ')}. Each runtime resolves the profile in its own context.`;
    return svg.scene(W, 660, label, paths + nodeMarkup + fileCard, 'runtime-ring');
  };

  const outcomes = (s) => {
    const W = 1440;
    const gap = 22;
    const cw = (W - gap * 2) / 3;
    const y = 12;
    const h = 376;
    const body = s.cards.map((card, i) => {
      const x = i * (cw + gap);
      let cy = y + 108;
      const entries = card.lines.map((line, j) => {
        const lines = wrap(line, 34);
        const output = svg.text(x + 28, cy, `${j === 0 ? '•' : '·'} ${lines[0]}`, { cls: j === 0 ? 't-lg' : 't-sm outcome-line', anchor: 'start' }) +
          lines.slice(1).map((part, k) => svg.text(x + 48, cy + (k + 1) * 25, part, { cls: 't-sm outcome-line', anchor: 'start' })).join('');
        cy += Math.max(34, lines.length * 25 + 10);
        return output;
      }).join('');
      return svg.enter(
        svg.g(
          svg.rect(x, y, cw, h, { cls: 'box', r: 22 }) +
          svg.g(svg.rect(x, y, cw, 7, { cls: 'card-top', r: 3 }), { cls: `z-${card.z}` }) +
          svg.text(x + 28, y + 58, card.title, { cls: 't-lg', anchor: 'start' }) +
          entries,
          {}), 280 + i * 260);
    }).join('');
    const label = `${s.title}. ${s.cards.map((c) => `${c.title}: ${c.lines.join('; ')}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, 400, label, body, 'outcomes')}${html.footnote(s.footnote)}`;
  };

  const table = (s) => {
    const W = 1440;
    const headerH = 54;
    const cols = s.columns;
    const declared = cols.map((c) => c.width || 1);
    const total = declared.reduce((a, b) => a + b, 0);
    const widths = declared.map((w) => (W * w) / total);
    const xs = widths.map((_, i) => widths.slice(0, i).reduce((a, b) => a + b, 0));
    const header = cols.map((col, i) => svg.g(
      svg.rect(xs[i], 0, widths[i] - 8, headerH, { cls: 'zone', r: 10 }) +
      svg.lines(xs[i] + 16, 23, col.label, { cls: 't-xs t-mono z-text tbl-head', anchor: 'start', max: Math.max(12, Math.floor(widths[i] / 11)), lh: 19 }),
      { cls: `z-${col.z || 'accent'}` })).join('');

    let y = headerH + 10;
    const body = s.rows.map((row, ri) => {
      const cells = row.cells.map((cell, ci) => {
        const value = Array.isArray(cell) ? cell.join(' · ') : String(cell);
        const max = Math.max(12, Math.floor((widths[ci] - 34) / 10.1));
        return wrap(value, max);
      });
      const maxLines = Math.max(...cells.map((lines) => lines.length));
      const rh = Math.max(54, maxLines * 24 + 18);
      const background = svg.rect(0, y, W, rh, { cls: ri % 2 ? 'box soft' : 'box', r: 8 });
      const cellMarkup = cells.map((lines, ci) => {
        const lineH = 23;
        const firstBaseline = y + Math.max(24, (rh - lines.length * lineH) / 2 + 17);
        const text = lines.map((line, li) => svg.text(xs[ci] + 16, firstBaseline + li * lineH, line, {
          cls: ci === 0 ? 't-sm tbl-key' : 't-sm tbl-cell',
          anchor: 'start'
        })).join('');
        const divider = ci ? svg.path(`M${xs[ci] - 4} ${y + 10}L${xs[ci] - 4} ${y + rh - 10}`, { cls: 'wire faint' }) : '';
        return divider + text;
      }).join('');
      const result = svg.enter(background + cellMarkup, 260 + ri * 150);
      y += rh + 8;
      return result;
    }).join('');
    const labels = `${s.title}. ${cols.map((c) => c.label).join('; ')}. ${s.rows.map((r) => r.cells.join('; ')).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, y, labels, header + body, 'evidence-table')}${html.footnote(s.footnote)}`;
  };

  const anatomy = (s) => {
    const W = 1440;
    const H = 430;
    const leftW = 760;
    const gap = 24;
    const rightX = leftW + gap;
    const rightW = W - rightX;
    const codePanel =
      svg.rect(0, 0, leftW, H, { cls: 'box', r: 18 }) +
      svg.text(26, 40, '.github/agents/test-writer.agent.md · excerpt', { cls: 't-xs t-mono', anchor: 'start' });
    let y = 88;
    const code = s.codeLines.map((line) => {
      const lines = wrap(line, 58);
      const out = lines.map((part) => {
        const text = svg.text(28, y, part, { cls: 't-mono t-sm anatomy-code', anchor: 'start' });
        y += 30;
        return text;
      }).join('');
      return out;
    }).join('');
    const features = s.features.map((feature, i) => {
      const fy = i * 136;
      return svg.enter(
        svg.rect(rightX, fy, rightW, 120, { cls: 'box soft', r: 16 }) +
        svg.text(rightX + 24, fy + 37, feature.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(rightX + 24, fy + 72, feature.detail, { cls: 't-sm t-muted', anchor: 'start', max: 54, lh: 24 }),
        380 + i * 230);
    }).join('');
    const label = `Configuration anatomy for test-writer. The excerpt carries ${s.codeLines.join('; ')}. ${s.features.map((f) => `${f.title}: ${f.detail}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, codePanel + svg.enter(code, 260) + features, 'anatomy')}`;
  };

  const paired = (s) => {
    const W = 1440;
    const gap = 26;
    const cw = (W - gap) / 2;
    const H = 468;
    const body = [s.left, s.right].map((panel, i) => {
      const x = i * (cw + gap);
      const header = svg.g(
        svg.rect(x, 0, cw, 74, { cls: 'zone', r: 17 }) +
        svg.lines(x + 24, 42, panel.title, { cls: 't-lg z-text', anchor: 'start', max: 38, lh: 28 }),
        { cls: `z-${panel.z}` });
      const rows = panel.items.map((item, j) => {
        const iy = 98 + j * 116;
        const detail = wrap(item.detail, 47);
        return svg.enter(
          svg.rect(x, iy, cw, 102, { cls: 'box soft', r: 14 }) +
          svg.text(x + 22, iy + 32, item.title, { cls: 't-sm t-mono', anchor: 'start' }) +
          detail.map((line, k) => svg.text(x + 22, iy + 62 + k * 23, line, { cls: 't-sm t-muted paired-detail', anchor: 'start' })).join(''),
          420 + j * 230);
      }).join('');
      return header + rows;
    }).join('');
    const label = `${s.title}. ${[s.left, s.right].map((p) => `${p.title}: ${p.items.map((x) => `${x.title}, ${x.detail}`).join('; ')}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'paired')}${html.footnote(s.footnote)}`;
  };

  const controls = (s) => {
    const W = 1440;
    const rowH = 104;
    const gap = 14;
    const tagW = 230;
    const tagX = W - tagW;
    const body = s.rows.map((row, i) => {
      const y = i * (rowH + gap);
      const descX = 505;
      const descW = tagX - descX - 28;
      const labelLines = wrap(row.label, 25);
      const labelY = y + (rowH - labelLines.length * 25) / 2 + 23;
      const descLines = wrap(row.description, 52);
      const descY = y + (rowH - descLines.length * 32) / 2 + 24;
      return svg.g(
        svg.enter(
          svg.rect(0, y, tagX - 36, rowH, { cls: 'box soft', r: 14 }) +
          svg.g(svg.circle(36, y + rowH / 2, 13, { cls: 'signal' }), { cls: `z-${row.z}` }) +
          labelLines.map((line, k) => svg.text(76, labelY + k * 25, line, { cls: 'sig-label t-mono', anchor: 'start' })).join('') +
          descLines.map((line, k) => svg.text(descX, descY + k * 32, line, { cls: 't-muted sig-desc', anchor: 'start' })).join(''),
          300 + i * 230) +
        svg.g(svg.rect(tagX, y + 20, tagW, 64, { cls: 'zone', r: 32 }) +
          svg.lines(tagX + tagW / 2, y + 43, row.tag, { cls: 'z-text sig-tag', max: 22, lh: 20 }),
        { cls: `z-${row.z}` }));
    }).join('');
    const label = `${s.title}. ${s.rows.map((r) => `${r.label}: ${r.description} ${r.tag}.`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, s.rows.length * rowH + (s.rows.length - 1) * gap, label, body, 'controls')}${html.footnote(s.footnote)}`;
  };

  window.SCENES = {
    'runtime-ring': runtimeRing,
    outcomes,
    table,
    anatomy,
    paired,
    controls
  };
})();
