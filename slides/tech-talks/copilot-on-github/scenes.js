/*
  Copilot on GitHub — deck-only proof scenes.
  Shared frames and patterns stay in slides/native; these diagrams carry only
  the event map, issue proof, split evidence, and observed-run timeline.
*/
(() => {
  const { svg, html, wrap } = window.Kit;

  const eventMap = (s) => {
    const W = 1440;
    const headH = 48;
    const left = 152;
    const gap = 9;
    const cw = (W - left - gap * 4) / 5;
    const rowY = headH + 10;
    const rh = 77;
    const rg = 10;
    const body = [];
    s.map.columns.forEach((name, i) => {
      const x = left + i * (cw + gap);
      body.push(svg.lines(x + cw / 2, 28, name, { cls: 't-xs t-mono', max: 17, lh: 18 }));
    });
    s.map.rows.forEach((row, ri) => {
      const y = rowY + ri * (rh + rg);
      body.push(svg.g(
        svg.rect(0, y, left - 12, rh, { cls: 'box soft', r: 12 }) +
        svg.lines(15, y + 32, row.label, { cls: 't-sm', anchor: 'start', max: 13, lh: 20 }),
        { cls: `z-${row.z}` }));
      row.cells.forEach((label, ci) => {
        const x = left + ci * (cw + gap);
        const lines = wrap(label, 22);
        const lineStart = y + (rh - (lines.length - 1) * 21) / 2 + 7;
        const card = svg.rect(x, y, cw, rh, { cls: 'zone', r: 12 }) +
          svg.lines(x + cw / 2, lineStart, label, { cls: 't-sm z-text', anchor: 'middle', max: 22, lh: 21 });
        body.push(svg.g(card, { cls: `z-${row.z}` }));
      });
    });
    const legendY = rowY + s.map.rows.length * (rh + rg) + 2;
    body.push(svg.g(
      svg.circle(16, legendY, 8, { cls: 'signal' }) +
      svg.text(34, legendY + 6, 'person acts', { cls: 't-xs', anchor: 'start' }),
      { cls: 'z-orange' }));
    body.push(svg.g(
      svg.circle(236, legendY, 8, { cls: 'signal' }) +
      svg.text(254, legendY + 6, 'configured event wakes agent', { cls: 't-xs', anchor: 'start' }),
      { cls: 'z-purple' }));
    const label = `${s.title}. Columns: ${s.map.columns.join(', ')}. ${s.map.rows.map((r) => `${r.label}: ${r.cells.join('; ')}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, legendY + 18, label, body.join(''), 'event-map')}${html.footnote(s.footnote)}`;
  };

  const split = (s) => {
    const W = 1440;
    const H = 452;
    const gap = 28;
    const cw = (W - gap) / 2;
    const panels = [
      { x: 0, title: s.diagram.leftTitle, items: s.diagram.left, z: 'github' },
      { x: cw + gap, title: s.diagram.rightTitle, items: s.diagram.right, z: 'purple' }
    ];
    const inner = panels.map((panel) => {
      let y = 112;
      let content = svg.rect(panel.x, 6, cw, H - 12, { cls: 'box', r: 18 }) +
        svg.lines(panel.x + 30, 56, panel.title, { cls: 't-lg', anchor: 'start', max: 34, lh: 30 });
      panel.items.forEach((item, i) => {
        const lines = wrap(item, 42);
        content += svg.g(svg.circle(panel.x + 34, y - 6, 8, { cls: 'signal' }), { cls: `z-${panel.z}` });
        content += svg.lines(panel.x + 58, y, item, { cls: 't-muted', anchor: 'start', max: 42, lh: 26 });
        y += Math.max(48, lines.length * 28 + 20);
      });
      return svg.g(content, { cls: `z-${panel.z}` });
    }).join('');
    const label = `${s.title}. ${panels.map((p) => `${p.title}: ${p.items.join('; ')}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, inner, 'proof-split')}${html.footnote(s.footnote)}`;
  };

  const issueProof = (s) => {
    const W = 1440;
    const H = 474;
    const lx = 0;
    const lw = 616;
    const rx = 644;
    const rw = W - rx;
    let left = svg.rect(lx, 6, lw, H - 12, { cls: 'box', r: 18 }) +
      svg.text(lx + 28, 54, 'A REUSABLE ISSUE CONTRACT', { cls: 't-xs t-mono', anchor: 'start' });
    let y = 112;
    s.issue.blocks.forEach((block, i) => {
      left += svg.text(lx + 28, y, block.label, { cls: 't-lg', anchor: 'start' });
      left += svg.lines(lx + 28, y + 38, block.text, { cls: 't-muted', anchor: 'start', max: 44, lh: 26 });
      y += 112;
    });

    let right = svg.rect(rx, 6, rw, H - 12, { cls: 'zone', r: 18 }) +
      svg.g(svg.text(rx + 28, 54, 'IN PRACTICE · FANHUB ISSUE #159', { cls: 't-xs t-mono', anchor: 'start' }), { cls: 'z-purple' });
    y = 116;
    s.issue.example.forEach((line, i) => {
      right += svg.g(svg.circle(rx + 34, y - 7, 7, { cls: 'signal' }), { cls: 'z-purple' });
      right += svg.lines(rx + 60, y, line, { cls: 't-muted', anchor: 'start', max: 47, lh: 27 });
      y += 76;
    });
    const label = `${s.title}. Issue contract: ${s.issue.blocks.map((b) => `${b.label}: ${b.text}`).join('. ')}. FanHub example: ${s.issue.example.join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, left + right, 'issue-proof')}`;
  };

  const eventStep = (s) => {
    const W = 1440;
    const H = 360;
    const n = s.event.items.length;
    const gap = n === 3 ? 18 : 28;
    const cw = (W - gap * (n - 1)) / n;
    const x0 = (W - (cw * n + gap * (n - 1))) / 2;
    const top = 40;
    const ch = 278;
    const colors = new Set(['orange', 'purple', 'github', 'green']);
    let body = svg.g(
      svg.text(W / 2, 20, s.event.label, { cls: 't-xs t-mono' }),
      {});
    const centers = s.event.items.map((_, i) => x0 + i * (cw + gap) + cw / 2);
    if (centers.length > 1) {
      body += svg.path(`M${centers[0]} 42L${centers[centers.length - 1]} 42`, { cls: 'wire faint' });
      body += svg.trace(`M${centers[0]} 42L${centers[centers.length - 1]} 42`, { cls: 'route z-purple', at: 350, dur: 700 });
    }
    s.event.items.forEach((item, i) => {
      const x = x0 + i * (cw + gap);
      const z = colors.has(item.z) ? item.z : 'purple';
      const card = svg.rect(x, top, cw, ch, { cls: 'box', r: 18 }) +
        svg.g(svg.circle(centers[i], 42, 10, { cls: 'stop' }), { cls: `z-${z}` }) +
        svg.text(x + 24, top + 44, item.when, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.g(svg.text(x + 24, top + 88, item.actor, { cls: 't-lg z-text', anchor: 'start' }), { cls: `z-${z}` }) +
        svg.lines(x + 24, top + 138, item.what, { cls: 't-muted', anchor: 'start', max: n === 3 ? 31 : 47, lh: 29 });
      body += svg.g(card, { cls: `z-${z}` });
    });
    const label = `${s.title}. ${s.event.label}. ${s.event.items.map((it) => `${it.when}, ${it.actor}: ${it.what}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'event-step')}`;
  };

  const evidence = (s) => {
    if (s.diagram?.type === 'split') return split(s);
    return `${html.head(s)}${svg.scene(1440, 420, s.title, '', 'proof-pending')}`;
  };

  window.SCENES = {
    'event-map': eventMap,
    'issue-proof': issueProof,
    'event-step': eventStep,
    evidence
  };
})();
