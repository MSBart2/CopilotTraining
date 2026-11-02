/*
  Harness Fundamentals — deck-only proof scenes.
  Shared frames and patterns stay in slides/native; these drawings are specific
  to the argument about five harness jobs and an application-owned host.
*/
(() => {
  const { svg, html, esc } = window.Kit;
  const W = 1440;

  const describeRows = (s, rows) =>
    `${s.title}. ${rows.map((r) => `${r.label}. ${r.detail} ${r.proof || ''}`).join(' ')}`;

  const codePanel = (s, y) => {
    if (!s.code?.length) return { markup: '', height: 0 };
    const height = 44 + 20 * s.code.length;
    const markup =
      svg.rect(0, y, W, height, { cls: 'box soft', r: 12 }) +
      svg.text(18, y + 19, s.codeSource, { cls: 't-xs t-mono', anchor: 'start' }) +
      s.code.map((line, i) => svg.text(22, y + 48 + i * 20, line, { cls: 't-sm t-mono', anchor: 'start' })).join('');
    return { markup, height };
  };

  const jobRows = (s) => {
    const rh = 72;
    const gap = 10;
    const labelX = 28;
    const detailX = 242;
    const proofX = 1000;
    const rows = s.rows.map((r, i) => {
      const y = i * (rh + gap);
      const tone = r.z || 'accent';
      const body =
        svg.rect(0, y, W, rh, { cls: 'box soft', r: 14 }) +
        svg.rect(0, y, 7, rh, { cls: 'card-edge', r: 4 }) +
        svg.text(labelX, y + 44, r.label, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(detailX, y + 32, r.detail, { cls: 't-muted t-sm', anchor: 'start', max: 58, lh: 23 }) +
        svg.text(proofX, y + 42, r.proof, { cls: 't-xs t-mono', anchor: 'start' });
      return svg.g(svg.enter(body, 250 + i * 120), { cls: `z-${tone}` });
    }).join('');
    const height = s.rows.length * rh + (s.rows.length - 1) * gap;
    return `${html.head(s)}${svg.scene(W, height, describeRows(s, s.rows), rows, 'job-rows')}${html.footnote(s.footnote)}`;
  };

  const detailRows = (s) => {
    const rh = s.rows.length > 5 ? 76 : 88;
    const gap = 8;
    const labelX = 24;
    const detailX = 268;
    const proofX = 820;
    const rows = s.rows.map((r, i) => {
      const y = i * (rh + gap);
      const tone = r.z || 'accent';
      const body =
        svg.rect(0, y, W, rh, { cls: 'box soft', r: 13 }) +
        svg.rect(0, y, 6, rh, { cls: 'card-edge', r: 3 }) +
        svg.lines(labelX, y + 32, r.label, { cls: 't-sm t-mono', anchor: 'start', max: 22, lh: 20 }) +
        svg.lines(detailX, y + 32, r.detail, { cls: 't-sm', anchor: 'start', max: 45, lh: 21 }) +
        svg.lines(proofX, y + 29, r.proof, { cls: 't-xs', anchor: 'start', max: 52, lh: 19 });
      return svg.g(svg.enter(body, 250 + i * 110), { cls: `z-${tone}` });
    }).join('');
    const header = s.columns ? `
      <div class="table-head">
        <span>${esc(s.columns[0])}</span><span>${esc(s.columns[1])}</span><span>${esc(s.columns[2])}</span>
      </div>` : '';
    const rowsHeight = s.rows.length * rh + (s.rows.length - 1) * gap;
    const codeY = rowsHeight + 16;
    const code = codePanel(s, codeY);
    const height = rowsHeight + (code.height ? 16 + code.height : 0);
    const label = `${describeRows(s, s.rows)} ${s.code?.join(' ') || ''}`;
    return `${html.head(s)}${header}${svg.scene(W, height, label, rows + code.markup, 'detail-rows')}${html.footnote(s.footnote)}`;
  };

  const flow = (s) => {
    const gap = 28;
    const count = s.nodes.length;
    const cw = (W - gap * (count - 1)) / count;
    const y = 44;
    const ch = 278;
    const mid = y + ch / 2;
    const arrows = s.nodes.slice(0, -1).map((_, i) => {
      const x1 = i * (cw + gap) + cw + 6;
      const x2 = (i + 1) * (cw + gap) - 8;
      const d = `M${x1} ${mid}L${x2} ${mid}`;
      return svg.trace(d, { cls: 'wire link', at: 550 + i * 240, dur: 400 }) +
        svg.pop(svg.path(`M${x2 - 11} ${mid - 8}L${x2} ${mid}L${x2 - 11} ${mid + 8}`, { cls: 'wire link' }), 850 + i * 240);
    }).join('');
    const cards = s.nodes.map((n, i) => {
      const x = i * (cw + gap);
      const tone = n.z || ['local', 'purple', 'green', 'orange'][i % 4];
      const detailLines = window.Kit.wrap(n.detail, count > 3 ? 26 : 34);
      const content =
        svg.rect(x, y, cw, ch, { cls: 'zone', r: 20 }) +
        svg.circle(x + 38, y + 42, 17, { cls: 'stop' }) +
        svg.text(x + 38, y + 48, String(i + 1), { cls: 't-sm' }) +
        svg.lines(x + 28, y + 104, n.title, { cls: 't-lg', anchor: 'start', max: count > 3 ? 22 : 26, lh: 34 }) +
        svg.lines(x + 28, y + 160, n.detail, { cls: 't-muted t-sm', anchor: 'start', max: count > 3 ? 30 : 38, lh: 28 }) +
        (n.actor ? svg.text(x + 28, y + ch - 26, n.actor, { cls: 't-xs t-mono', anchor: 'start' }) : '');
      return svg.g(svg.enter(content, 350 + i * 220), { cls: `z-${tone}` });
    }).join('');
    const footer = s.footer ? `<p class="footnote">${esc(s.footer)}</p>` : '';
    const rowsHeight = y + ch + 10;
    const codeY = rowsHeight + 16;
    const code = codePanel(s, codeY);
    const label = `${s.title}. ${s.nodes.map((n) => `${n.title}: ${n.detail}`).join('. ')}. ${s.code?.join(' ') || ''} ${s.footer || ''}`;
    return `${html.head(s)}${svg.scene(W, rowsHeight + (code.height ? 16 + code.height : 0), label, arrows + cards + code.markup, 'flow')}${footer}`;
  };

  const evidenceRows = (s) => {
    const rh = 92;
    const gap = 10;
    const rows = s.rows.map((r, i) => {
      const y = i * (rh + gap);
      const content =
        svg.rect(0, y, W, rh, { cls: 'box soft', r: 14 }) +
        svg.rect(0, y, 7, rh, { cls: 'card-edge', r: 4 }) +
        svg.text(24, y + 52, r.label, { cls: 't-sm t-mono', anchor: 'start' }) +
        svg.lines(292, y + 38, r.detail, { cls: 't-sm', anchor: 'start', max: 43, lh: 22 }) +
        svg.lines(824, y + 35, r.proof, { cls: 't-xs', anchor: 'start', max: 48, lh: 19 });
      return svg.g(svg.enter(content, 300 + i * 160), { cls: `z-${r.z || 'accent'}` });
    }).join('');
    const height = s.rows.length * rh + (s.rows.length - 1) * gap;
    return `${html.head(s)}${svg.scene(W, height, describeRows(s, s.rows), rows, 'evidence-rows')}${html.footnote(s.footnote)}`;
  };

  const releaseFlow = (s) => {
    const gap = 18;
    const count = s.nodes.length;
    const cw = (W - gap * (count - 1)) / count;
    const y = 30;
    const ch = 320;
    let markup = '';
    const labels = [];
    s.nodes.forEach((n, i) => {
      const x = i * (cw + gap);
      const tone = n.z || 'accent';
      const lines = window.Kit.wrap(n.detail, 25);
      markup += svg.g(svg.enter(
        svg.rect(x, y, cw, ch, { cls: 'zone', r: 18 }) +
        svg.text(x + 24, y + 50, n.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 24, y + 100, n.detail, { cls: 't-sm t-muted', anchor: 'start', max: 28, lh: 26 }) +
        svg.text(x + 24, y + ch - 28, ['Person', 'Copilot', 'Service', 'Person'][i], { cls: 't-xs t-mono', anchor: 'start' }), 350 + i * 220), { cls: `z-${tone}` });
      labels.push(`${n.title}: ${n.detail}`);
      if (i < count - 1) {
        const cy = y + ch / 2;
        const x1 = x + cw + 3;
        const x2 = (i + 1) * (cw + gap) - 3;
        markup += svg.trace(`M${x1} ${cy}L${x2} ${cy}`, { cls: 'wire link', at: 600 + i * 260, dur: 380 });
        markup += svg.pop(svg.path(`M${x2 - 10} ${cy - 7}L${x2} ${cy}L${x2 - 10} ${cy + 7}`, { cls: 'wire link' }), 900 + i * 260);
      }
    });
    const label = `${s.title}. ${labels.join('. ')}. ${s.footer}`;
    return `${html.head(s)}${svg.scene(W, y + ch + 16, label, markup, 'release-flow')}${html.footnote(s.footer)}`;
  };

  const appIdeas = (s) => {
    const gap = 18;
    const cols = 3;
    const cw = (W - gap * (cols - 1)) / cols;
    const ch = 184;
    const rowGap = 14;
    const cards = s.cards.map((c, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = col * (cw + gap);
      const y = row * (ch + rowGap);
      const detail = window.Kit.wrap(c.detail, 38);
      const content =
        svg.rect(x, y, cw, ch, { cls: 'zone', r: 18 }) +
        svg.text(x + 24, y + 48, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 24, y + 92, c.detail, { cls: 't-muted t-sm', anchor: 'start', max: 46, lh: 25 });
      return svg.g(svg.enter(content, 300 + i * 130), { cls: `z-${c.z || 'accent'}` });
    }).join('');
    const height = 2 * ch + rowGap;
    const label = `${s.title}. ${s.cards.map((c) => `${c.title}: ${c.detail}`).join('. ')}. ${s.footer}`;
    return `${html.head(s)}${svg.scene(W, height, label, cards, 'app-ideas')}<p class="footnote">${esc(s.footer)}</p>`;
  };

  const harnessLoop = (s) => {
    const C = 380;
    const ring = svg.circle(C, C, 225, { cls: 'ring' });
    const nodes = [
      { x: 280, y: 58, label: 'LOOP', z: 'local' },
      { x: 515, y: 206, label: 'CONTEXT', z: 'remote' },
      { x: 480, y: 470, label: 'TOOLS', z: 'github' },
      { x: 162, y: 526, label: 'CONTROL', z: 'orange' },
      { x: 56, y: 272, label: 'EVIDENCE', z: 'green' }
    ];
    let wires = '';
    const centers = nodes.map((n) => [n.x + 82, n.y + 32]);
    centers.forEach((p, i) => {
      const q = centers[(i + 1) % centers.length];
      const d = `M${p[0]} ${p[1]}Q${C} ${C} ${q[0]} ${q[1]}`;
      wires += svg.path(d, { cls: 'wire link' });
      wires += svg.ride(d, { z: nodes[i].z, at: 650 + i * 160, dur: 3000, r: 5 });
    });
    const cards = nodes.map((n, i) => svg.g(
      svg.rect(n.x, n.y, 164, 64, { cls: 'zone', r: 18 }) +
      svg.text(n.x + 82, n.y + 39, n.label, { cls: 't-sm t-mono z-text' }),
      { cls: `z-${n.z}`, style: `--at:${180 + i * 140}ms` }
    )).join('');
    const center =
      svg.circle(C, C, 112, { cls: 'task' }) +
      svg.text(C, C - 15, 'AGENT', { cls: 't-xs t-mono' }) +
      svg.text(C, C + 18, 'turn ↻', { cls: 't-lg' });
    const label = 'A harness loop connects five jobs: loop, context, tools, control, and evidence.';
    return svg.scene(760, 760, label, ring + wires + svg.g(center, { cls: 'z-purple' }) + cards, 'harness-loop');
  };

  window.SCENES = {
    'harness-loop': harnessLoop,
    'job-rows': jobRows,
    flow,
    'detail-rows': detailRows,
    'evidence-rows': evidenceRows,
    'release-flow': releaseFlow,
    'app-ideas': appIdeas
  };
})();
