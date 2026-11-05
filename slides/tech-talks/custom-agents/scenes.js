/*
  Custom Agents — deck-only visuals.
  Shared frames and patterns stay in slides/native; these scenes draw one agent file
  read by five Copilot surfaces, the field tables, the ID ladder, and the file anatomy.
*/
(() => {
  const { svg, html, wrap } = window.Kit;

  const cellText = (cell) => (cell && typeof cell === 'object' && !Array.isArray(cell) ? cell.t : Array.isArray(cell) ? cell.join(' · ') : String(cell));

  /* Title visual: one agent file at the centre, five Copilot surfaces around it. */
  const runtimeRing = (s) => {
    const W = 760;
    const H = 680;
    const C = [380, 360];
    const nodes = (s.surfaces || []).map((n, i) => ({ ...n, ...[
      { cx: 380, cy: 70 },
      { cx: 630, cy: 230 },
      { cx: 570, cy: 600 },
      { cx: 190, cy: 600 },
      { cx: 130, cy: 230 }
    ][i] }));
    const nw = 220;
    const nh = 84;
    const wires = nodes.map((n, i) => {
      const d = `M${C[0]} ${C[1]}L${n.cx} ${n.cy}`;
      return svg.trace(d, { cls: `wire z-${n.z}`, at: 320 + i * 180, dur: 700 }) +
        svg.ride(d, { z: n.z, at: 1700 + i * 260, dur: 2600, r: 6 });
    }).join('');
    const nodeMarkup = nodes.map((n, i) => {
      const lines = wrap(n.label, 15);
      const y0 = n.cy + 8 - ((lines.length - 1) * 26) / 2;
      return svg.enter(svg.g(
        svg.rect(n.cx - nw / 2, n.cy - nh / 2, nw, nh, { cls: 'zone', r: 18 }) +
        lines.map((l, k) => svg.text(n.cx, y0 + k * 26, l, { cls: 'z-text ring-label' })).join(''),
        { cls: `z-${n.z}` }), 520 + i * 180);
    }).join('');
    const card = { x: 220, y: 285, w: 320, h: 150 };
    const fileCard = svg.pop(svg.g(
      svg.rect(card.x, card.y, card.w, card.h, { cls: 'box task', r: 22 }) +
      svg.text(C[0], card.y + 40, 'ONE AGENT FILE', { cls: 't-xs t-mono' }) +
      svg.text(C[0], card.y + 78, '.github/agents/', { cls: 't-mono t-sm' }) +
      svg.text(C[0], card.y + 102, 'test-writer.agent.md', { cls: 't-mono t-sm' }) +
      svg.text(C[0], card.y + 132, 'description · body · fields', { cls: 't-xs' }),
      { cls: 'z-purple' }), 200);
    const label = `One agent file, .github/agents/test-writer.agent.md, at the centre of five Copilot surfaces: ${nodes.map((n) => n.label).join(', ')}.`;
    return svg.scene(W, H, label, wires + nodeMarkup + fileCard, 'runtime-ring');
  };

  /* Cold open: one agent file beside five surface columns. Each column lights the lines that
     surface reads, in turn; the description and body end lit in all five. */
  const litLines = (s) => {
    const W = 1440;
    const codeW = 690;
    const colX = 730;
    const colW = (W - colX) / s.surfaces.length;
    const headH = 66;
    const rowY = headH + 18;
    const rh = 56;
    const rg = 8;
    const step = 560;
    const colAt = (i) => 500 + i * step;
    const header = svg.text(24, 40, s.fileLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
      s.surfaces.map((sf, i) => {
        const x = colX + i * colW;
        const lines = wrap(sf.label, 12);
        const y0 = headH / 2 + 6 - ((lines.length - 1) * 19) / 2;
        return svg.enter(svg.g(
          svg.rect(x + 4, 0, colW - 8, headH, { cls: 'zone', r: 12 }) +
          lines.map((l, k) => svg.text(x + colW / 2, y0 + k * 19, l, { cls: 't-xs z-text lit-head' })).join(''),
          { cls: `z-${sf.z}` }), colAt(i));
      }).join('');
    let body = '';
    let haloes = '';
    s.fileLines.forEach((row, ri) => {
      const y = rowY + ri * (rh + rg);
      const mid = y + rh / 2;
      const core = row.marks.every((m) => m === 1);
      body += svg.g(
        svg.rect(0, y, W, rh, { cls: core ? 'zone' : 'box soft', r: 10 }) +
        svg.text(24, mid + 6, row.code, { cls: 't-mono t-sm lit-code', anchor: 'start' }) +
        (row.note ? svg.text(codeW - 12, mid + 6, row.note, { cls: 't-xs', anchor: 'end' }) : ''),
        { cls: core ? 'z-purple' : '' });
      row.marks.forEach((m, ci) => {
        const cx = colX + ci * colW + colW / 2;
        const at = colAt(ci) + 120 + ri * 50;
        if (m === 1) {
          body += svg.pop(svg.g(svg.circle(cx, mid, 12, { cls: 'signal' }), { cls: core ? 'z-purple' : 'z-green' }), at);
          if (core) haloes += svg.halo(cx, mid, 12, { z: 'purple', at: colAt(s.surfaces.length) + 200 });
        } else if (m === '?') {
          body += svg.pop(svg.g(svg.circle(cx, mid, 13, { cls: 'stop' }) + svg.text(cx, mid + 6, '?', { cls: 't-sm z-text' }), { cls: 'z-purple' }), at);
        } else {
          body += svg.enter(svg.circle(cx, mid, 8, { cls: 'lit-off' }), at);
        }
      });
    });
    const ly = rowY + s.fileLines.length * (rh + rg) + 22;
    const legend = svg.g(svg.circle(colX - 254, ly - 6, 9, { cls: 'signal' }), { cls: 'z-purple' }) +
      svg.text(colX - 236, ly, 'core: every surface', { cls: 't-xs', anchor: 'start' }) +
      svg.g(svg.circle(colX + 12, ly - 6, 9, { cls: 'signal' }), { cls: 'z-green' }) +
      svg.text(colX + 30, ly, 'documented for that surface', { cls: 't-xs', anchor: 'start' }) +
      svg.circle(colX + 290, ly - 6, 7, { cls: 'lit-off' }) +
      svg.text(colX + 306, ly, 'skipped or not documented', { cls: 't-xs', anchor: 'start' }) +
      svg.g(svg.circle(colX + 548, ly - 6, 10, { cls: 'stop' }) + svg.text(colX + 548, ly - 1, '?', { cls: 't-xs z-text' }), { cls: 'z-purple' }) +
      svg.text(colX + 566, ly, 'check in the app', { cls: 't-xs', anchor: 'start' });
    const H = ly + 8;
    const label = `${s.title}. ${s.fileLines.map((r) => `${r.code}: ${r.marks.map((m, i) => `${s.surfaces[i].label} ${m === 1 ? 'reads it' : m === '?' ? 'check in the app' : 'skips it'}`).join(', ')}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, header + body + svg.enter(legend, colAt(s.surfaces.length)) + haloes, 'lit-lines')}${html.footnote(s.footnote)}`;
  };

  /* Evidence table. A cell can be a string or { t, z } to mark it with a zone colour. */
  const table = (s) => {
    const W = 1440;
    const headerH = 54;
    const cols = s.columns;
    const declared = cols.map((c) => c.width || 1);
    const total = declared.reduce((a, b) => a + b, 0);
    const widths = declared.map((w) => (W * w) / total);
    const xs = widths.map((_, i) => widths.slice(0, i).reduce((a, b) => a + b, 0));
    const header = cols.map((col, i) => {
      const max = Math.max(12, Math.floor(widths[i] / 11));
      const n = wrap(col.label, max).length;
      return svg.g(
        svg.rect(xs[i], 0, widths[i] - 8, headerH, { cls: 'zone', r: 10 }) +
        svg.lines(xs[i] + 16, headerH / 2 + 6 - ((n - 1) * 19) / 2, col.label, { cls: 't-xs t-mono z-text tbl-head', anchor: 'start', max, lh: 19 }),
        { cls: `z-${col.z || 'accent'}` });
    }).join('');

    let y = headerH + 10;
    const body = s.rows.map((row, ri) => {
      const cells = row.cells.map((cell, ci) => {
        const max = Math.max(12, Math.floor((widths[ci] - 34) / 10.1));
        return { lines: wrap(cellText(cell), max), z: cell && typeof cell === 'object' && !Array.isArray(cell) ? cell.z : row.z && ci === 0 ? row.z : null };
      });
      const maxLines = Math.max(...cells.map((c) => c.lines.length));
      const rh = Math.max(54, maxLines * 24 + 18);
      const background = svg.rect(0, y, W, rh, { cls: ri % 2 ? 'box soft' : 'box', r: 8 });
      const cellMarkup = cells.map(({ lines, z }, ci) => {
        const lineH = 23;
        const firstBaseline = y + Math.max(24, (rh - lines.length * lineH) / 2 + 17);
        const cls = z ? 't-sm z-text tbl-mark' : ci === 0 ? 't-sm tbl-key' : 't-sm tbl-cell';
        const text = lines.map((line, li) => svg.text(xs[ci] + 16, firstBaseline + li * lineH, line, { cls, anchor: 'start' })).join('');
        const divider = ci ? svg.path(`M${xs[ci] - 4} ${y + 10}L${xs[ci] - 4} ${y + rh - 10}`, { cls: 'wire faint' }) : '';
        return divider + (z ? svg.g(text, { cls: `z-${z}` }) : text);
      }).join('');
      const result = svg.enter(background + cellMarkup, 260 + ri * 150);
      y += rh + 8;
      return result;
    }).join('');
    const labels = `${s.title}. ${cols.map((c) => c.label).join('; ')}. ${s.rows.map((r) => r.cells.map(cellText).join('; ')).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, y, labels, header + body, 'evidence-table')}${html.footnote(s.footnote)}`;
  };

  /* Agent file anatomy: code excerpt on the left (lines may carry a zone highlight), the jobs on the right. */
  const anatomy = (s) => {
    const W = 1440;
    const leftW = 760;
    const gap = 24;
    const rightX = leftW + gap;
    const rightW = W - rightX;
    const charW = 10;
    let y = 88;
    const code = s.codeLines.map((entry) => {
      const line = typeof entry === 'string' ? entry : entry.t;
      const z = typeof entry === 'string' ? null : entry.z;
      const indent = line.length - line.trimStart().length;
      const lines = wrap(line.trimStart(), 68 - indent);
      const top = y - 22;
      const text = lines.map((part, k) => {
        const x = 28 + (indent + (k ? 2 : 0)) * charW;
        const t = svg.text(x, y, part, { cls: z ? 't-mono t-sm anatomy-code z-text' : 't-mono t-sm anatomy-code', anchor: 'start' });
        y += 30;
        return t;
      }).join('');
      return z ? svg.g(svg.rect(14, top, leftW - 28, lines.length * 30 + 4, { cls: 'zone', r: 8 }) + text, { cls: `z-${z}` }) : text;
    }).join('');
    const H = Math.max(s.features.length * 124, y - 8);
    const fh = (H - 2 * 16) / 3;
    const features = s.features.map((feature, i) => {
      const fy = i * (fh + 16);
      return svg.enter(svg.g(
        svg.rect(rightX, fy, rightW, fh, { cls: 'box soft', r: 16 }) +
        (feature.z ? svg.rect(rightX, fy, 6, fh, { cls: 'card-edge', r: 3 }) : '') +
        svg.text(rightX + 24, fy + 40, feature.title, { cls: feature.z ? 't-lg z-text' : 't-lg', anchor: 'start' }) +
        svg.lines(rightX + 24, fy + 76, feature.detail, { cls: 't-sm t-muted', anchor: 'start', max: 54, lh: 24 }),
        { cls: feature.z ? `z-${feature.z}` : '' }), 380 + i * 230);
    }).join('');
    const codePanel =
      svg.rect(0, 0, leftW, H, { cls: 'box', r: 18 }) +
      svg.text(26, 40, s.fileLabel || '.github/agents/test-writer.agent.md', { cls: 't-xs t-mono', anchor: 'start' });
    const label = `${s.title}. The excerpt reads: ${s.codeLines.map((l) => (typeof l === 'string' ? l : l.t)).join('; ')}. ${s.features.map((f) => `${f.title}: ${f.detail}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, codePanel + svg.enter(code, 260) + features, 'anatomy')}${html.footnote(s.footnote)}`;
  };

  /* ID precedence: four scopes as a ladder; two files with the same ID collide and the nearer one stays lit. */
  const idLadder = (s) => {
    const W = 1440;
    const lw = 900;
    const rh = 88;
    const rg = 16;
    const n = s.rungs.length;
    const H = n * (rh + rg) - rg;
    const chipW = 270;
    const chipX = lw - chipW - 24;
    let body = '';
    s.rungs.forEach((r, i) => {
      const y = i * (rh + rg);
      const mid = y + rh / 2;
      body += svg.enter(
        svg.rect(0, y, lw, rh, { cls: 'box', r: 14 }) +
        svg.g(svg.circle(44, mid, 22, { cls: 'stop' }) + svg.text(44, mid + 7, String(i + 1), { cls: 't-sm' }), { cls: `z-${r.z}` }) +
        svg.text(90, mid - 6, r.scope, { cls: 't-lg', anchor: 'start' }) +
        svg.text(90, mid + 24, r.folder, { cls: 't-xs t-mono', anchor: 'start' }), 300 + i * 180);
    });
    s.collide.forEach((c, k) => {
      const y = c.rung * (rh + rg);
      const chip = svg.rect(chipX, y + 16, chipW, rh - 32, { cls: 'zone', r: (rh - 32) / 2 }) +
        svg.text(chipX + chipW / 2, y + rh / 2 + 6, s.file, { cls: 't-sm t-mono z-text' });
      const tag = svg.text(chipX - 18, y + rh / 2 + 6, c.tag, { cls: 't-sm z-text ladder-tag', anchor: 'end' });
      if (c.wins) {
        body += svg.g(svg.glide(chip, [0, -40], 1300 + k * 300) + svg.pop(tag, 2400), { cls: 'z-purple' }) +
          svg.halo(chipX + chipW / 2, y + rh / 2, 30, { z: 'purple', at: 2600 });
      } else {
        body += svg.g(svg.glide(svg.g(chip, { cls: 'dim m-dim', at: 2200 }), [0, 40], 1300 + k * 300) + svg.pop(tag, 2400), { cls: 'z-orange' });
      }
    });
    const rx = lw + 36;
    const rw = W - rx;
    let ry = 82;
    const rules = s.rules.map((rule, i) => {
      const at = 900 + i * 220;
      const out = svg.enter(
        rule.code.map((c, k) => svg.text(rx + 26, ry + k * 28, c, { cls: 't-sm t-mono', anchor: 'start' })).join('') +
        svg.text(rx + 26, ry + rule.code.length * 28 + 4, rule.note, { cls: 't-xs', anchor: 'start' }), at);
      ry += rule.code.length * 28 + 66;
      return out;
    }).join('');
    const panel = svg.rect(rx, 0, rw, H, { cls: 'box soft', r: 16 }) +
      svg.text(rx + 26, 38, 'THE ID COMES FROM THE FILENAME', { cls: 't-xs t-mono', anchor: 'start' });
    const label = `${s.title}. Scopes from nearest to farthest: ${s.rungs.map((r) => `${r.scope} (${r.folder})`).join(', ')}. ${s.file} exists in ${s.collide.map((c) => `${s.rungs[c.rung].scope}: ${c.tag}`).join(' and ')}. ${s.rules.map((r) => `${r.code.join(' ')}: ${r.note}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body + panel + rules, 'id-ladder')}${html.footnote(s.footnote)}`;
  };

  /* Selection controls: each field, its meaning on one surface, and the effect tag. */
  const controls = (s) => {
    const W = 1440;
    const rowH = 104;
    const gap = 14;
    const tagW = 230;
    const tagX = W - tagW;
    const body = s.rows.map((row, i) => {
      const y = i * (rowH + gap);
      const descX = 505;
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
          svg.lines(tagX + tagW / 2, y + 59 - (wrap(row.tag, 22).length - 1) * 10, row.tag, { cls: 'z-text sig-tag', max: 22, lh: 20 }),
        { cls: `z-${row.z}` }));
    }).join('');
    const label = `${s.title}. ${s.rows.map((r) => `${r.label}: ${r.description} ${r.tag}.`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, s.rows.length * rowH + (s.rows.length - 1) * gap, label, body, 'controls')}${html.footnote(s.footnote)}`;
  };

  /* Customization primitives: each card names the job it owns; the hero card is the one the slide argues for. */
  const primitives = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - gap) / 2;
    const ch = 196;
    const rows = Math.ceil(s.cards.length / 2);
    const body = s.cards.map((c, i) => {
      const x = (i % 2) * (cw + gap);
      const y = Math.floor(i / 2) * (ch + gap);
      const card =
        svg.rect(x, y, cw, ch, { cls: c.hero ? 'box task' : 'box', r: 20 }) +
        svg.text(x + 34, y + 70, c.icon, { cls: 't-emoji score-icon', anchor: 'start' }) +
        svg.text(x + 104, y + 66, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.text(x + cw - 34, y + 62, `owns ${c.owns}`, { cls: 't-xs t-mono z-text', anchor: 'end' }) +
        svg.lines(x + 34, y + 122, c.description, { cls: 't-muted score-desc', anchor: 'start', max: 54, lh: 32 });
      return svg.enter(svg.g(card, { cls: c.hero ? 'z-purple' : 'z-accent' }), 350 + 260 * i);
    }).join('');
    const label = `${s.title}. ${s.cards.map((c) => `${c.title} owns ${c.owns}: ${c.description}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, rows * ch + (rows - 1) * gap, label, body, 'scorecard')}${html.footnote(s.footnote)}`;
  };

  window.SCENES = {
    'runtime-ring': runtimeRing,
    'lit-lines': litLines,
    'id-ladder': idLadder,
    table,
    anatomy,
    controls,
    primitives
  };
})();
