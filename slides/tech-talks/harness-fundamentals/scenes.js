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
      s.code.map((line, i) => svg.text(22, y + 48 + i * 20, line, { cls: 't-sm t-mono code-line', anchor: 'start' })).join('');
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

  // Each job twice: the pi hook you wire into a loop you run, then the SDK option or call that covers it.
  const sdkMirror = (s) => {
    const rh = 80;
    const gap = 10;
    const top = 34;
    const jobW = 176;
    const piX = 196;
    const piW = 560;
    const sdkX = 836;
    const sdkW = W - sdkX;
    const header =
      svg.text(piX + 20, 16, s.columns[0].toUpperCase(), { cls: 't-xs t-mono t-muted col-head', anchor: 'start' }) +
      svg.text(sdkX + 20, 16, s.columns[1].toUpperCase(), { cls: 't-xs t-mono col-head', anchor: 'start' });
    const rows = s.rows.map((r, i) => {
      const y = top + i * (rh + gap);
      const mid = y + rh / 2;
      const arrow = `M${piX + piW + 14} ${mid}L${sdkX - 14} ${mid}`;
      const job =
        svg.rect(0, y, jobW, rh, { cls: 'zone', r: 14 }) +
        svg.text(jobW / 2, mid + 9, r.label, { cls: 't-lg z-text' });
      const pi =
        svg.rect(piX, y, piW, rh, { cls: 'box soft', r: 14 }) +
        svg.text(piX + 20, y + 34, r.pi, { cls: 't-sm t-mono t-muted', anchor: 'start' }) +
        svg.text(piX + 20, y + 60, r.piNote, { cls: 't-xs', anchor: 'start' });
      const sdk =
        svg.rect(sdkX, y, sdkW, rh, { cls: 'zone', r: 14 }) +
        svg.text(sdkX + 20, y + 34, r.sdk, { cls: 't-sm t-mono z-text', anchor: 'start' }) +
        svg.text(sdkX + 20, y + 60, r.sdkNote, { cls: 't-xs', anchor: 'start' });
      const head = `M${sdkX - 24} ${mid - 7}L${sdkX - 14} ${mid}L${sdkX - 24} ${mid + 7}`;
      const link = svg.path(arrow, { cls: 'wire link' }) + svg.path(head, { cls: 'wire link' }) +
        svg.ride(arrow, { z: r.z, at: 900 + i * 140, dur: 1600, r: 5 });
      return svg.g(
        svg.enter(job, 200 + i * 110) + svg.enter(pi, 260 + i * 110) + link + svg.enter(sdk, 420 + i * 110),
        { cls: `z-${r.z}` }
      );
    }).join('');
    const height = top + s.rows.length * rh + (s.rows.length - 1) * gap;
    const label = `${s.title}. ${s.rows.map((r) => `${r.label}: pi ${r.pi}, ${r.piNote}; SDK ${r.sdk}, ${r.sdkNote}.`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, height, label, header + rows, 'sdk-mirror')}${html.footnote(s.footnote)}`;
  };

  // Same tool request, two people: gate 1 (SDK permission) passes both; gate 2 (the app's service) decides per person.
  const twoGates = (s) => {
    const cols = [
      { x: 0, w: 300 },
      { x: 316, w: 340 },
      { x: 672, w: 360 },
      { x: 1048, w: W - 1048 }
    ];
    const reqH = 56;
    const headY = reqH + 22;
    const headH = 64;
    const rowY = headY + headH + 8;
    const rh = 92;
    const gap = 10;
    const request = svg.g(
      svg.rect(0, 0, W, reqH, { cls: 'zone', r: 14 }) +
      svg.text(24, 35, s.request, { cls: 't-sm t-mono z-text', anchor: 'start' }),
      { cls: 'z-local' }
    );
    const heads = s.columns.map((c, i) => svg.g(
      svg.text(cols[i].x + 18, headY + 20, c.title.toUpperCase(), { cls: `t-xs t-mono col-head${c.z ? ' z-text' : ''}`, anchor: 'start' }) +
      svg.text(cols[i].x + 18, headY + 48, c.question, { cls: 't-sm', anchor: 'start' }),
      { cls: c.z ? `z-${c.z}` : '' }
    )).join('');
    const cell = (i, y, c) => {
      const tone = c.z || 'accent';
      const body = svg.rect(cols[i].x, y, cols[i].w, rh, { cls: c.z ? 'zone' : 'box soft', r: 14 }) +
        svg.text(cols[i].x + 18, y + 38, `${c.mark ? `${c.mark} ` : ''}${c.label}`, { cls: `t-sm${c.z ? ' z-text' : ''}`, anchor: 'start' }) +
        svg.lines(cols[i].x + 18, y + 64, c.note, { cls: 't-xs', anchor: 'start', max: Math.floor(cols[i].w / 8.6), lh: 19 });
      return svg.g(body, { cls: `z-${tone}` });
    };
    const rows = s.rows.map((r, ri) => {
      const y = rowY + ri * (rh + gap);
      const at = 500 + ri * 900;
      return r.cells.map((c, ci) => svg.enter(cell(ci, y, c), at + ci * 220)).join('');
    }).join('');
    const tableH = rowY + s.rows.length * rh + (s.rows.length - 1) * gap;
    const code = codePanel(s, tableH + 20);
    const height = tableH + (code.height ? 20 + code.height : 0);
    const label = `${s.title}. ${s.request}. ${s.rows.map((r) => r.cells.map((c) => `${c.label}: ${c.note}`).join('; ')).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, height, label, svg.enter(request, 200) + svg.enter(heads, 350) + rows + code.markup, 'two-gates')}${html.footnote(s.footnote)}`;
  };

  const detailRows = (s) => {
    const rh = s.rows.length > 5 ? 76 : 88;
    const gap = 8;
    const labelX = 24;
    const detailX = 268;
    const proofX = 820;
    // Column headings live inside the scene so they stay aligned with, and attached to, the rows.
    const top = s.columns ? 34 : 0;
    const header = s.columns
      ? [labelX, detailX, proofX].map((x, i) => svg.text(x, 16, s.columns[i].toUpperCase(), { cls: 't-xs t-mono t-muted col-head', anchor: 'start' })).join('')
      : '';
    const rows = s.rows.map((r, i) => {
      const y = top + i * (rh + gap);
      const tone = r.z || 'accent';
      const body =
        svg.rect(0, y, W, rh, { cls: 'box soft', r: 13 }) +
        svg.rect(0, y, 6, rh, { cls: 'card-edge', r: 3 }) +
        svg.lines(labelX, y + 32, r.label, { cls: 't-sm t-mono', anchor: 'start', max: 22, lh: 20 }) +
        svg.lines(detailX, y + 32, r.detail, { cls: 't-sm', anchor: 'start', max: 45, lh: 21 }) +
        svg.lines(proofX, y + 29, r.proof, { cls: 't-xs', anchor: 'start', max: 52, lh: 19 });
      return svg.g(svg.enter(body, 250 + i * 110), { cls: `z-${tone}` });
    }).join('');
    const rowsHeight = top + s.rows.length * rh + (s.rows.length - 1) * gap;
    const codeY = rowsHeight + 16;
    const code = codePanel(s, codeY);
    const height = rowsHeight + (code.height ? 16 + code.height : 0);
    const label = `${describeRows(s, s.rows)} ${s.code?.join(' ') || ''}`;
    return `${html.head(s)}${svg.scene(W, height, label, header + rows + code.markup, 'detail-rows')}${html.footnote(s.footnote)}`;
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

  // Rows that pair a label with the real code behind it and the outcome; `where` cites file:line under the label.
  const codeRows = (s) => {
    const gap = 10;
    const labelX = 24;
    const codeX = 284;
    const codeW = 700;
    const proofX = codeX + codeW + 24;
    const top = s.columns ? 34 : 0;
    const header = s.columns
      ? [labelX, codeX + 16, proofX].map((x, i) => svg.text(x, 16, s.columns[i].toUpperCase(), { cls: 't-xs t-mono t-muted col-head', anchor: 'start' })).join('')
      : '';
    let y = top;
    const rows = s.rows.map((r, i) => {
      const lines = [].concat(r.code || []);
      const labelLines = Kit.wrap(r.label, 26).length;
      const rh = Math.max(s.rowHeight || 78, 30 + lines.length * 22, 30 + labelLines * 20 + (r.where ? 24 : 0));
      const tone = r.z || 'accent';
      const body =
        svg.rect(0, y, W, rh, { cls: 'box soft', r: 13 }) +
        svg.rect(0, y, 6, rh, { cls: 'card-edge', r: 3 }) +
        svg.lines(labelX, y + 30, r.label, { cls: 't-sm', anchor: 'start', max: 26, lh: 20 }) +
        (r.where ? svg.text(labelX, y + 30 + labelLines * 20 + 10, r.where, { cls: 't-xs t-mono', anchor: 'start' }) : '') +
        svg.rect(codeX, y + 10, codeW, rh - 20, { cls: 'box', r: 8 }) +
        lines.map((l, li) => svg.text(codeX + 16, y + 10 + (rh - 20) / 2 - ((lines.length - 1) * 22) / 2 + 6 + li * 22, l, { cls: 't-xs t-mono code-line', anchor: 'start' })).join('') +
        svg.lines(proofX, y + 30, r.proof, { cls: 't-xs', anchor: 'start', max: 46, lh: 19 });
      const out = svg.g(svg.enter(body, 250 + i * 120), { cls: `z-${tone}` });
      y += rh + gap;
      return out;
    }).join('');
    const rowsHeight = y - gap;
    const code = codePanel(s, rowsHeight + 16);
    const height = rowsHeight + (code.height ? 16 + code.height : 0);
    const label = `${s.title}. ${s.rows.map((r) => `${r.label}: ${[].concat(r.code || []).join(' ')}. ${r.proof}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, height, label, header + rows + code.markup, 'code-rows')}${html.footnote(s.footnote)}`;
  };

  // A JSONL file view: each record on one line, tagged by who wrote it, revealed in order.
  const jsonlFile = (s) => {
    const bar = 40;
    const tagW = 150;
    const lh = 44;
    const pad = 22;
    const height = bar + pad + s.lines.length * lh + pad - 10;
    const frame =
      svg.rect(0, 0, W, height, { cls: 'box', r: 16 }) +
      svg.rect(0, 0, W, bar, { cls: 'box soft', r: 16 }) +
      svg.text(20, bar / 2 + 6, s.file, { cls: 't-xs t-mono', anchor: 'start' });
    const lines = s.lines.map((l, i) => {
      const y = bar + pad + i * lh;
      const tag = svg.g(
        svg.rect(16, y, tagW, 32, { cls: 'zone', r: 8 }) +
        svg.text(16 + tagW / 2, y + 21, l.tag, { cls: 't-xs t-mono z-text' }),
        { cls: `z-${l.z || 'accent'}` }
      );
      return svg.enter(tag + svg.text(16 + tagW + 16, y + 21, l.line, { cls: 't-xs t-mono code-line', anchor: 'start' }), 300 + i * 260);
    }).join('');
    const label = `${s.title}. ${s.lines.map((l) => `${l.tag}: ${l.line}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, height, label, frame + lines, 'jsonl-file')}${html.footnote(s.footnote)}`;
  };

  // Recap: one row per harness job, before (dim, struck) and after (job-colored), then three proof stats.
  const recap = (s) => {
    const jobW = 150;
    const gap = 18;
    const colW = (W - jobW - gap - 60) / 2;
    const bx = jobW + gap;
    const ax = bx + colW + 60;
    const rh = 70;
    const rg = 12;
    const y0 = 34;
    let body =
      svg.g(svg.text(bx, 18, s.beforeLabel.toUpperCase(), { cls: 't-xs t-mono col-label z-text', anchor: 'start' }), { cls: 'z-orange' }) +
      svg.g(svg.text(ax, 18, s.afterLabel.toUpperCase(), { cls: 't-xs t-mono col-label z-text', anchor: 'start' }), { cls: 'z-green' });
    s.rows.forEach((r, i) => {
      const top = y0 + i * (rh + rg);
      const mid = top + rh / 2;
      const at = 300 + i * 320;
      body += svg.g(svg.enter(
        svg.rect(0, top, jobW, rh, { cls: 'zone', r: 14 }) +
        svg.text(jobW / 2, mid + 7, r.job, { cls: 't-sm t-mono z-text' }), at), { cls: `z-${r.z}` });
      body += svg.enter(
        svg.rect(bx, top, colW, rh, { cls: 'box soft', r: 14 }) +
        svg.text(bx + 22, mid + 7, r.before, { cls: 't-sm t-muted', anchor: 'start' }), at + 80);
      body += svg.trace(`M${bx + colW + 10} ${mid}L${ax - 14} ${mid}`, { cls: 'wire link', at: at + 200, dur: 220 }) +
        svg.pop(svg.path(`M${ax - 24} ${mid - 8}L${ax - 13} ${mid}L${ax - 24} ${mid + 8}`, { cls: 'wire link' }), at + 400);
      body += svg.g(svg.enter(
        svg.rect(ax, top, colW, rh, { cls: 'zone', r: 14 }) +
        svg.text(ax + 22, mid + 7, r.after, { cls: 't-sm', anchor: 'start' }), at + 420), { cls: `z-${r.z}` });
    });
    const sy = y0 + s.rows.length * (rh + rg) + 18;
    const sh = 148;
    const sw = (W - 2 * 24) / 3;
    const statsAt = 300 + s.rows.length * 320 + 300;
    s.stats.forEach((m, i) => {
      const x = i * (sw + 24);
      body += svg.g(svg.pop(svg.g(
        svg.rect(x, sy, sw, sh, { cls: 'zone', r: 18 }) +
        svg.text(x + sw / 2, sy + 84, m.value, { cls: 'z-text ba-num' }) +
        svg.text(x + sw / 2, sy + 124, m.detail, { cls: 't-muted t-sm' }), {}), statsAt + 160 * i), { cls: `z-${m.z || 'purple'}` });
    });
    const label = `${s.title}. ${s.rows.map((r) => `${r.job}: before, ${r.before}; after, ${r.after}`).join('. ')}. ${s.stats.map((m) => `${m.value} ${m.detail}`).join(', ')}.`;
    return `${html.head(s)}${svg.scene(W, sy + sh, label, body, 'recap')}`;
  };

  // Illustrative release-dashboard mockup: the existing status pane beside the embedded SDK panel, with what the model adds.
  const dashboardMockup = (s) => {
    const m = s.mock;
    const leftW = 600;
    const rightX = 640;
    const rightW = W - rightX;
    const paneH = 450;
    const bar = 40;
    const windowFrame = (x, w, title, z) => svg.g(
      svg.rect(x, 0, w, paneH, { cls: 'box', r: 16 }) +
      svg.rect(x, 0, w, bar, { cls: 'zone', r: 16 }) +
      [0, 1, 2].map((i) => svg.circle(x + 22 + i * 18, bar / 2, 5, { cls: 'task' })).join('') +
      svg.text(x + 84, bar / 2 + 6, title, { cls: 't-xs t-mono z-text', anchor: 'start' }),
      { cls: `z-${z}` }
    );
    const statusRow = (r, i) => {
      const y = 112 + i * 58;
      return svg.rect(20, y, leftW - 40, 48, { cls: 'box soft', r: 10 }) +
        svg.text(38, y + 30, r.label, { cls: 't-sm', anchor: 'start' }) +
        svg.g(svg.text(leftW - 38, y + 30, r.value, { cls: 't-sm z-text', anchor: 'end' }), { cls: `z-${r.z || 'accent'}` });
    };
    const statusBadge = svg.chip(leftW - 20 - Kit.measure(m.badge, 15) - 28, 58, m.badge, { z: 'orange', size: 15, h: 30 });
    const left =
      windowFrame(0, leftW, m.appTitle, 'local') +
      svg.text(20, 84, m.release, { cls: 't-lg', anchor: 'start' }) +
      statusBadge.markup +
      m.status.map(statusRow).join('') +
      svg.g(
        svg.rect(20, 300, leftW - 40, 56, { cls: 'zone', r: 12 }) +
        svg.text(40, 334, m.deploy, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.text(leftW - 38, 334, m.deployNote, { cls: 't-xs', anchor: 'end' }),
        { cls: 'z-orange' }
      ) +
      svg.text(20, 400, m.leftCaption, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(20, 426, m.leftCaption2, { cls: 't-xs', anchor: 'start' });
    const bubbleW = Kit.measure(m.ask, 17) + 40;
    const ask = svg.g(
      svg.rect(W - 20 - bubbleW, 56, bubbleW, 40, { cls: 'zone', r: 12 }) +
      svg.text(W - 40, 82, m.ask, { cls: 't-sm z-text', anchor: 'end' }),
      { cls: 'z-local' }
    );
    const tool = svg.g(
      svg.rect(rightX + 20, 108, rightW - 40, 34, { cls: 'box soft', r: 10 }) +
      svg.text(rightX + 36, 131, m.tool, { cls: 't-xs t-mono', anchor: 'start' }),
      { cls: 'z-github' }
    );
    const answer = m.answer.map((a, i) => {
      const y = 196 + i * 62;
      return svg.g(
        svg.circle(rightX + 38, y - 6, 12, { cls: 'task' }) +
        svg.text(rightX + 38, y - 1, String(a.n), { cls: 't-xs z-text' }),
        { cls: 'z-green' }
      ) + svg.text(rightX + 62, y, a.text, { cls: 't-sm', anchor: 'start' });
    }).join('');
    let ax = rightX + 20;
    const actions = m.actions.map((label) => {
      const chip = svg.chip(ax, 380, label, { z: 'purple', size: 15, h: 34 });
      ax += chip.w + 10;
      return chip.markup;
    }).join('');
    const right =
      windowFrame(rightX, rightW, m.panelTitle, 'purple') +
      ask + tool +
      svg.rect(rightX + 20, 154, rightW - 40, 212, { cls: 'box soft', r: 12 }) +
      answer + actions;
    const stripY = paneH + 22;
    const cw = (W - 2 * 16) / 3;
    const strip = s.adds.map((a, i) => {
      const x = i * (cw + 16);
      return svg.g(
        svg.rect(x, stripY, cw, 58, { cls: 'zone', r: 12 }) +
        svg.circle(x + 30, stripY + 29, 12, { cls: 'task' }) +
        svg.text(x + 30, stripY + 34, String(i + 1), { cls: 't-xs z-text' }) +
        svg.text(x + 54, stripY + 35, a, { cls: 't-sm z-text', anchor: 'start' }),
        { cls: 'z-green' }
      );
    }).join('');
    const height = stripY + 58;
    const label = `${s.title}. Existing dashboard: ${m.status.map((r) => `${r.label} ${r.value}`).join(', ')}; ${m.deploy}, ${m.deployNote}. Copilot panel: ${m.ask} ${m.tool}. ${m.answer.map((a) => a.text).join(' ')} Actions: ${m.actions.join(', ')}. The agent adds: ${s.adds.join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, height, label,
      svg.enter(left, 200) + svg.enter(right, 600) + svg.enter(strip, 1400), 'dashboard-mockup')}${html.footnote(s.footer)}`;
  };

  // Idea cards: the question, what the model adds, the read-only tools, and what stays human; an optional tag marks real examples.
  const appIdeas = (s) => {
    const gap = 18;
    const cols = 3;
    const cw = (W - gap * (cols - 1)) / cols;
    const ch = 236;
    const rowGap = 14;
    const cards = s.cards.map((c, i) => {
      const x = (i % cols) * (cw + gap);
      const y = Math.floor(i / cols) * (ch + rowGap);
      const tag = c.tag ? svg.chip(x + cw - 20 - (Kit.measure(c.tag, 13) + 24), y + 18, c.tag, { z: 'green', size: 13, h: 26 }).markup : '';
      const content =
        svg.rect(x, y, cw, ch, { cls: 'zone', r: 18 }) +
        svg.text(x + 22, y + 40, `${c.icon ? c.icon + '  ' : ''}${c.title}`, { cls: 't-sm z-text', anchor: 'start' }) +
        tag +
        svg.lines(x + 22, y + 76, `“${c.ask}”`, { cls: 't-sm', anchor: 'start', max: 44, lh: 22 }) +
        svg.lines(x + 22, y + 128, c.adds, { cls: 't-xs t-muted', anchor: 'start', max: 56, lh: 19 }) +
        svg.text(x + 22, y + ch - 44, `Tools: ${c.tools}`, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + 22, y + ch - 18, `Stays human: ${c.human}`, { cls: 't-xs', anchor: 'start' });
      return svg.g(svg.enter(content, 300 + i * 130), { cls: `z-${c.z || 'accent'}` });
    }).join('');
    const rows = Math.ceil(s.cards.length / cols);
    const height = rows * ch + (rows - 1) * rowGap;
    const label = `${s.title}. ${s.cards.map((c) => `${c.title}: ${c.ask} ${c.adds} Tools: ${c.tools}. Stays human: ${c.human}.`).join(' ')} ${s.footer}`;
    return `${html.head(s)}${svg.scene(W, height, label, cards, 'app-ideas')}<p class="footnote">${esc(s.footer)}</p>`;
  };

  // Two nested cycles: turns (model call, gated tools, results) repeat inside one run (prompt to final answer).
  const harnessLoop = () => {
    const C = 380;
    const circlePath = (r) => `M${C - r} ${C}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0`;
    const RUN = 300;
    const TURN = 150;
    const run = svg.path(circlePath(RUN), { cls: 'wire link dashed' }) +
      svg.ride(circlePath(RUN), { z: 'local', at: 900, dur: 12000, r: 6 });
    const turn = svg.path(circlePath(TURN), { cls: 'wire link' }) +
      svg.ride(circlePath(TURN), { z: 'purple', at: 700, dur: 3000, r: 6 });
    const card = (cx, cy, label, z, at) => svg.g(
      svg.rect(cx - 78, cy - 28, 156, 56, { cls: 'zone', r: 16 }) +
      svg.text(cx, cy + 7, label, { cls: 't-sm t-mono z-text' }),
      { cls: `z-${z}`, style: `--at:${at}ms` }
    );
    const at = (deg, r) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)];
    const cards =
      card(...at(-90, TURN), 'CONTEXT', 'remote', 260) +
      card(...at(30, TURN), 'CONTROL', 'orange', 400) +
      card(...at(150, TURN), 'TOOLS', 'github', 540) +
      card(...at(-90, RUN), 'LOOP', 'local', 680) +
      card(...at(90, RUN), 'EVIDENCE', 'green', 820);
    const center = svg.g(
      svg.circle(C, C, 70, { cls: 'task' }) +
      svg.text(C, C + 2, 'TURN ↻', { cls: 't-lg' }) +
      svg.text(C, C + 28, 'per model call', { cls: 't-xs' }),
      { cls: 'z-purple' }
    );
    const runLabel =
      svg.text(C, C - RUN + 62, 'RUN ↻ prompt → final answer', { cls: 't-xs t-mono' }) +
      svg.text(C, C + RUN - 50, 'every turn emits events', { cls: 't-xs t-mono' });
    const label = 'Turns repeat inside a run. Each turn: context feeds the model, control gates requested tools, and tool results return for the next turn. The loop decides whether the run takes another turn or ends with a final answer, and evidence comes out of every turn.';
    return svg.scene(760, 760, label, run + turn + center + cards + runLabel, 'harness-loop');
  };

  window.SCENES = {
    'harness-loop': harnessLoop,
    'job-rows': jobRows,
    'sdk-mirror': sdkMirror,
    'two-gates': twoGates,
    flow,
    'detail-rows': detailRows,
    'code-rows': codeRows,
    'jsonl-file': jsonlFile,
    recap,
    'dashboard-mockup': dashboardMockup,
    'app-ideas': appIdeas
  };
})();
