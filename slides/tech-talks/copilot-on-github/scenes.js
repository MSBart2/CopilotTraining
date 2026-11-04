/*
  Copilot on GitHub — deck-only proof scenes.
  Shared frames and patterns stay in slides/native; these diagrams carry only
  the event map, issue proof, and the #221 timeline and zooms.
*/
(() => {
  const { svg, html, wrap, measure, esc } = window.Kit;

  const eventMap = (s) => {
    const W = 1440;
    const labelW = 176;
    const x0 = 190;
    const gap = 14;
    const cols = s.map.columns.length;
    const cw = (W - x0 - gap * (cols - 1)) / cols;
    const cxs = s.map.columns.map((_, i) => x0 + i * (cw + gap) + cw / 2);
    const stopY = 78;
    const laneY = 156;
    const lh = 74;
    const lg = 10;
    const lanesEnd = laneY + s.map.rows.length * (lh + lg) - lg;
    const H = lanesEnd + 6;
    const last = cols - 1;
    const body = [];

    body.push(svg.g(svg.rect(cxs[last] - cw / 2 - 7, stopY - 40, cw + 14, H - stopY + 38, { cls: 'box soft', r: 20 }), { cls: 'z-orange' }));

        const route = `M${cxs[0]} ${stopY}L${cxs[last]} ${stopY}`;
    body.push(svg.path(route, { cls: 'wire faint' }));
    body.push(svg.trace(route, { cls: 'route z-purple', at: 300, dur: 1200 }));

    const from = cxs[3];
    const to = cxs[1];
    const loop = `M${from} ${stopY - 26}C${from} ${stopY - 84},${to} ${stopY - 84},${to} ${stopY - 26}`;
    body.push(svg.trace(loop, { cls: 'wire link dashed', at: 1500, dur: 900 }));
    body.push(svg.pop(svg.path(`M${to - 9} ${stopY - 40}L${to} ${stopY - 27}L${to + 9} ${stopY - 40}`, { cls: 'wire link' }), 2400));
    body.push(svg.ride(loop, { z: 'purple', at: 2600, dur: 2600, r: 6 }));
    const loopLabel = 'every push reopens review and scan';
    const lw = Math.round(measure(loopLabel, 15) + 32);
    body.push(svg.pop(svg.chip((from + to) / 2 - lw / 2, 0, loopLabel, { z: 'purple', size: 15, h: 30, pad: 16 }).markup, 1900));

    s.map.columns.forEach((name, i) => {
      const x = cxs[i];
      const z = i === last ? 'orange' : 'purple';
      body.push(svg.pop(svg.g(
        svg.circle(x, stopY, 24, { cls: 'stop' }) +
        svg.text(x, stopY + 8, String(i + 1), { cls: 't-sm z-text' }),
        { cls: `z-${z}` }), 300 + 280 * i));
      body.push(svg.enter(svg.g(svg.text(x, stopY + 52, name, { cls: 't-sm z-text' }), { cls: `z-${z}` }), 380 + 280 * i));
    });
    body.push(svg.halo(cxs[last], stopY, 34, { z: 'orange', at: 1800 }));

    s.map.rows.forEach((row, ri) => {
      const y = laneY + ri * (lh + lg);
      const at = 900 + 160 * ri;
      let lane = svg.g(
        svg.rect(0, y, labelW, lh, { cls: 'zone', r: 14 }) +
        svg.rect(0, y, 6, lh, { cls: 'card-edge', r: 3 }) +
        svg.text(22, y + lh / 2 + 6, row.label, { cls: 't-sm z-text', anchor: 'start' }),
        { cls: `z-${row.z}` });
      row.cells.forEach((label, ci) => {
        const x = x0 + ci * (cw + gap);
        const decide = ci === last;
        const human = decide && row.z === 'orange';
        const blocked = decide && /cannot/i.test(label);
        const cls = human ? 'task' : blocked ? 'zone dashed' : 'zone';
        const lines = wrap(label, 22);
        const ty = y + lh / 2 + 6 - ((lines.length - 1) * 20) / 2;
        lane += svg.g(
          svg.rect(x, y, cw, lh, { cls, r: 14 }) +
          svg.lines(x + cw / 2, ty, label, { cls: human ? 't-sm' : 't-sm z-text', max: 22, lh: 20 }),
          { cls: `z-${row.z}` });
      });
      body.push(svg.enter(lane, at));
    });

    const label = `${s.title}. Stages: ${s.map.columns.join(', ')}; each push from Steer loops back to Push. ${s.map.rows.map((r) => `${r.label}: ${r.cells.join('; ')}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body.join(''), 'event-map')}${html.footnote(s.footnote)}`;
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
    if (s.issue.href) right = link(s.issue.href, svg.g(right + svg.text(rx + rw - 28, 54, 'open ↗', { cls: 't-xs z-text', anchor: 'end' }), { cls: 'z-purple' }), 'Open FanHub issue #159');
    const label = `${s.title}. Issue contract: ${s.issue.blocks.map((b) => `${b.label}: ${b.text}`).join('. ')}. FanHub example: ${s.issue.example.join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, left + right, 'issue-proof')}`;
  };

  const makePrStack = (closing) => () => {
    const W = 760;
    const C = W / 2;
    const rows = [
      { z: 'purple', icon: '🛠️', name: 'Cloud agent', tag: 'PRODUCE', detail: closing ? 'Draft inspected: commits, tests, session log' : 'Commits on its own branch, plus a session log' },
      { z: 'github', icon: '🔎', name: 'Code review', tag: 'REASON', detail: closing ? 'No open issues on the final head' : 'Assessment and threads on the current head' },
      { z: 'green', icon: '📏', name: 'Code Quality', tag: 'MEASURE', detail: closing ? 'Rules pass at the team threshold' : 'Rule findings scanned on every push' }
    ];
    let body = '';

    body += svg.enter(svg.g(
      svg.rect(150, 16, 460, 86, { cls: 'zone', r: 18 }) +
      svg.text(186, 70, '📝', { cls: 't-emoji', anchor: 'start' }) +
      svg.text(240, 54, closing ? 'Issue closed' : 'Bounded issue', { cls: 't-lg z-text', anchor: 'start' }) +
      svg.text(240, 82, closing ? 'acceptance criteria met' : 'intent + acceptance criteria', { cls: 't-xs', anchor: 'start' }),
      { cls: 'z-orange' }), 150);
    body += svg.trace(`M${C} 102L${C} 140`, { cls: 'wire link', at: 450, dur: 300 });

    const top = 140;
    const rowH = 96;
    const rowGap = 14;
    const rowTop = top + 70;
    const panelH = 70 + rows.length * (rowH + rowGap) + 6;
    body += svg.enter(
      svg.rect(28, top, W - 56, panelH, { cls: 'box', r: 22 }) +
      svg.g(svg.chip(56, top + 20, closing ? 'Merged' : 'Draft', { z: closing ? 'green' : 'purple', size: 15, h: 30, pad: 14 }).markup, {}) +
      svg.text(closing ? 150 : 134, top + 42, closing ? 'Evidence named by commit' : 'One pull request · one head commit', { cls: 't-sm', anchor: 'start' }), 500);

    const spineX = 74;
    const firstY = rowTop + rowH / 2;
    const lastY = rowTop + (rows.length - 1) * (rowH + rowGap) + rowH / 2;
    const spine = `M${spineX} ${firstY}L${spineX} ${lastY}`;
    body += svg.path(spine, { cls: 'wire faint' });
    body += svg.trace(spine, { cls: closing ? 'route z-green' : 'route z-purple', at: 900, dur: 1000 });

    rows.forEach((r, i) => {
      const y = rowTop + i * (rowH + rowGap);
      const cy = y + rowH / 2;
      body += svg.enter(svg.g(
        svg.rect(110, y, W - 152, rowH, { cls: 'zone', r: 16 }) +
        svg.text(132, y + 60, r.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(186, y + 42, r.name, { cls: 't-lg z-text', anchor: 'start' }) +
        (closing
          ? svg.g(svg.path(`M${W - 92} ${y + 34}l8 8l15 -17`, { cls: 'check' }), { cls: 'z-green' })
          : svg.text(W - 66, y + 40, r.tag, { cls: 't-xs t-mono z-text', anchor: 'end' })) +
        svg.text(186, y + 74, r.detail, { cls: 't-xs', anchor: 'start' }),
        { cls: `z-${r.z}` }), 800 + 240 * i);
      body += svg.pop(svg.g(svg.circle(spineX, cy, 12, { cls: 'stop' }), { cls: `z-${r.z}` }), 900 + 240 * i);
    });

    const panelEnd = top + panelH;
    const mergeY = panelEnd + 36;
    body += svg.trace(`M${C} ${panelEnd}L${C} ${mergeY}`, { cls: 'wire link', at: 1700, dur: 300 });
    body += svg.enter(svg.g(
      svg.rect(150, mergeY, 460, 92, { cls: 'task', r: 18 }) +
      svg.text(186, mergeY + 60, '🧑‍💻', { cls: 't-emoji', anchor: 'start' }) +
      svg.text(240, mergeY + 42, closing ? 'Merged by a person' : 'Approve and merge', { cls: 't-lg', anchor: 'start' }) +
      svg.text(240, mergeY + 72, closing ? 'decision recorded, revert path named' : 'a person ends the loop', { cls: 't-xs z-text', anchor: 'start' }),
      { cls: 'z-orange' }), 1900);
    body += svg.halo(C, mergeY + 46, 56, { z: 'orange', at: 2300 });
    body += svg.ride(spine, { z: closing ? 'green' : 'purple', at: 2200, dur: 2400, r: 6 });

    return svg.scene(W, W,
      closing
        ? 'The loop closed: the issue is resolved, the cloud agent’s draft was inspected, code review reports no open issues on the final head, Code Quality rules pass, and a person merged with the decision recorded.'
        : 'A bounded issue becomes one draft pull request. Copilot cloud agent produces commits, Copilot code review reasons about the head, GitHub Code Quality measures it, and a person approves and merges.',
      body, closing ? 'pr-closed' : 'pr-stack');
  };
  const prStack = makePrStack(false);
  const prClosed = makePrStack(true);

  const prAnatomy = (s) => {
    const W = 1440;
    const n = s.rows.length;
    const top = 58;
    const rh = 66;
    const rg = 10;
    const H = top + n * (rh + rg) - rg + 4;
    const pw = 520;
    const cx0 = 640;
    const bars = [[0.72, 0.5], [0.4, 0.58, 0.3], [0.62, 0.44], [0.5, 0.66], [0.36, 0.36, 0.36], [0.56]];
    let body = svg.enter(
      svg.rect(0, 0, pw, H, { cls: 'box', r: 20 }) +
      svg.chip(22, 14, 'Draft', { z: 'purple', size: 15, h: 30, pad: 14 }).markup +
      svg.text(102, 35, 'Agent pull request', { cls: 't-sm', anchor: 'start' }), 100);
    body += svg.enter(
      svg.text(cx0, 35, 'WHAT THE PR OWNER ASKS', { cls: 't-xs t-mono', anchor: 'start' }), 300);
    s.rows.forEach((r, i) => {
      const y = top + i * (rh + rg);
      const mid = y + rh / 2;
      const at = 400 + 180 * i;
      let section = svg.rect(18, y, pw - 36, rh, { cls: 'zone', r: 12 }) +
        svg.text(40, y + 26, r.tag.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' });
      let bx = 40;
      (bars[i] || [0.5]).forEach((f) => {
        const bw = (pw - 120) * f / (bars[i] || [0.5]).length * 1.6;
        section += svg.rect(bx, y + 40, Math.min(bw, pw - 80 - bx), 10, { cls: 'card-top', r: 5 });
        bx += Math.min(bw, pw - 80 - bx) + 12;
      });
      section += svg.circle(pw - 44, mid, 16, { cls: 'stop' }) +
        svg.text(pw - 44, mid + 6, String(i + 1), { cls: 't-sm z-text' });
      body += svg.enter(svg.g(section, { cls: `z-${r.z}` }), at);
      body += svg.g(svg.trace(`M${pw - 26} ${mid}L${cx0 - 8} ${mid}`, { cls: 'wire link', at: at + 150, dur: 300 }), {});
      body += svg.enter(svg.g(
        svg.rect(cx0, y, W - cx0, rh, { cls: 'box', r: 14 }) +
        svg.rect(cx0, y, 6, rh, { cls: 'card-edge', r: 3 }) +
        svg.text(cx0 + 28, y + rh / 2 + 7, r.label, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(cx0 + 230, y + rh / 2 + 6, r.description, { cls: 't-muted', anchor: 'start' }),
        { cls: `z-${r.z}` }), at + 250);
    });
    const label = `${s.title}. ${s.rows.map((r, i) => `${i + 1}. ${r.label}, found in the ${r.tag}: ${r.description}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'pr-anatomy')}${html.footnote(s.footnote)}`;
  };

  const reviewLoop = (s) => {
    const L = s.loop;
    const W = 1440;
    const H = 452;
    const nw = 310;
    const nh = 100;
    const ex = 0;
    const ew = 300;
    const eh = 92;
    const lx = 440;
    const rx = 920;
    const ty = 30;
    const by = 300;
    const pos = [[lx, ty], [rx, ty], [rx, by], [lx, by]];
    const ctr = pos.map(([x, y]) => [x + nw / 2, y + nh / 2]);
    let body = '';

    const ins = [lx, ty + nh / 2];
    L.entries.forEach((e, i) => {
      const y = 18 + i * (eh + 26);
      const my = y + eh / 2;
      body += svg.enter(svg.g(
        svg.rect(ex, y, ew, eh, { cls: 'zone', r: 16 }) +
        svg.rect(ex, y, 6, eh, { cls: 'card-edge', r: 3 }) +
        svg.text(ex + 26, y + 40, e.label, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.text(ex + 26, y + 68, e.tag, { cls: 't-xs t-mono', anchor: 'start' }),
        { cls: `z-${e.z}` }), 150 + 160 * i);
      body += svg.trace(`M${ew + 6} ${my}C${ew + 70} ${my},${ins[0] - 70} ${ins[1]},${ins[0] - 6} ${ins[1]}`, { cls: 'wire link', at: 500 + 160 * i, dur: 420 });
    });

    L.nodes.forEach((n, i) => {
      const [x, y] = pos[i];
      const isPush = i === 3;
      body += svg.enter(svg.g(
        svg.rect(x, y, nw, nh, { cls: isPush ? 'zone dashed' : 'zone', r: 18 }) +
        svg.text(x + nw / 2, y + 42, n.title, { cls: 't-lg z-text' }) +
        svg.text(x + nw / 2, y + 74, n.detail, { cls: 't-xs' }),
        { cls: `z-${n.z}` }), 900 + 260 * i);
    });

    const top = `M${lx + nw + 8} ${ctr[0][1]}L${rx - 8} ${ctr[1][1]}`;
    const right = `M${ctr[1][0]} ${ty + nh + 8}L${ctr[2][0]} ${by - 8}`;
    const bottom = `M${rx - 8} ${ctr[2][1]}L${lx + nw + 8} ${ctr[3][1]}`;
    const left = `M${ctr[3][0]} ${by - 8}L${ctr[0][0]} ${ty + nh + 8}`;
    const head = (x, y, dir) => {
      const d = { r: `M${x - 12} ${y - 9}L${x} ${y}L${x - 12} ${y + 9}`, l: `M${x + 12} ${y - 9}L${x} ${y}L${x + 12} ${y + 9}`,
        d: `M${x - 9} ${y - 12}L${x} ${y}L${x + 9} ${y - 12}`, u: `M${x - 9} ${y + 12}L${x} ${y}L${x + 9} ${y + 12}` }[dir];
      return svg.path(d, { cls: 'wire link' });
    };
    body += svg.trace(top, { cls: 'wire link', at: 1250, dur: 350 }) + svg.pop(head(rx - 8, ctr[1][1], 'r'), 1550);
    body += svg.trace(right, { cls: 'wire link', at: 1500, dur: 350 }) + svg.pop(head(ctr[2][0], by - 8, 'd'), 1800);
    body += svg.trace(bottom, { cls: 'wire link', at: 1760, dur: 350 }) + svg.pop(head(lx + nw + 8, ctr[3][1], 'l'), 2060);
    body += svg.trace(left, { cls: 'wire link dashed', at: 2020, dur: 350 }) + svg.pop(head(ctr[0][0], ty + nh + 8, 'u'), 2320);

    const tag = (cxp, cyp, text, z, at) => {
      const w = Math.round(measure(text, 15) + 32);
      return svg.pop(svg.chip(cxp - w / 2, cyp - 15, text, { z, size: 15, h: 30, pad: 16 }).markup, at);
    };
    body += tag(ctr[1][0], (ty + nh + by) / 2, L.needsWork, 'orange', 1650);
    body += tag(ctr[0][0], (ty + nh + by) / 2, L.gate, 'purple', 2300);

    const mx = (lx + nw + rx) / 2;
    const my = (ty + nh + by) / 2;
    body += svg.enter(
      svg.text(mx, my - 6, 'REPAIR LOOP', { cls: 't-xs t-mono' }) +
      svg.text(mx, my + 20, 'one review per head', { cls: 't-xs' }), 2400);
    const loopPath = `M${ctr[0][0]} ${ctr[0][1]}L${ctr[1][0]} ${ctr[1][1]}L${ctr[2][0]} ${ctr[2][1]}L${ctr[3][0]} ${ctr[3][1]}Z`;
    body += svg.ride(loopPath, { z: 'purple', at: 2600, dur: 4200, r: 7 });

    const xx = rx + nw + 50;
    const xw = W - xx;
    const xy = ty + 4;
    body += svg.trace(`M${rx + nw + 8} ${ctr[1][1]}L${xx - 8} ${ctr[1][1]}`, { cls: 'wire link', at: 2700, dur: 250 });
    body += svg.enter(svg.text((rx + nw + xx) / 2, ctr[1][1] - 14, '✓', { cls: 't-sm' }), 2800);
    body += svg.pop(svg.g(
      svg.rect(xx, xy, xw, nh - 8, { cls: 'task', r: 18 }) +
      svg.text(xx + xw / 2, xy + 40, L.exit.title, { cls: 't-sm' }) +
      svg.text(xx + xw / 2, xy + 66, L.exit.detail, { cls: 't-xs z-text' }),
      { cls: 'z-orange' }), 2900);
    body += svg.enter(svg.lines(xx + xw / 2, xy + nh + 24, L.exitLabel, { cls: 't-xs t-mono', max: 16, lh: 18 }), 3000);

    const label = `${s.title}. Entry: ${L.entries.map((e) => `${e.label} (${e.tag})`).join(', ')}. Loop: ${L.nodes.map((n) => `${n.title}, ${n.detail}`).join(' → ')}; when ${L.needsWork}, repair; the new push returns to review ${L.gate}. With ${L.exitLabel}, ${L.exit.title.toLowerCase()}: ${L.exit.detail}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'review-loop')}${html.footnote(s.footnote)}`;
  };

  const effortTiers = (s) => {
    const W = 1440;
    const x0 = 150;
    const x1 = W - 30;
    const lo = Math.log(0.05);
    const hi = Math.log(25);
    const xv = (v) => x0 + ((Math.log(v) - lo) / (hi - lo)) * (x1 - x0);
    const money = (v) => (v < 1 ? `$${v.toFixed(2)}` : Number.isInteger(v) ? `$${v}` : `$${v.toFixed(2)}`);
    const axisY = 24;
    const rowY = 58;
    const rowH = 46;
    let body = '';

    [0.05, 0.25, 1, 5, 25].forEach((v) => {
      const x = xv(v);
      body += svg.text(x, axisY, money(v), { cls: 't-xs t-mono' });
      body += svg.path(`M${x} ${axisY + 12}L${x} ${rowY + s.tiers.length * rowH}`, { cls: 'wire faint' });
    });
    body += svg.text(0, axisY, 'PER REVIEW', { cls: 't-xs t-mono', anchor: 'start' });

    s.tiers.forEach((t, i) => {
      const y = rowY + i * rowH + rowH / 2;
      const a = xv(t.min);
      const b = xv(t.max);
      const m = xv(t.avg);
      body += svg.enter(svg.g(
        svg.text(0, y + 7, t.name, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.rect(a, y - 9, b - a, 18, { cls: 'zone', r: 9 }) +
        svg.circle(m, y, 11, { cls: 'stop' }) +
        svg.text(m, y - 18, `~${money(t.avg)}`, { cls: 't-sm z-text' }),
        { cls: `z-${t.z}` }), 300 + 260 * i);
    });

    const cardY = rowY + s.tiers.length * rowH + 30;
    const gap = 24;
    const cw = (W - gap * 2) / 3;
    const ch = 190;
    s.tiers.forEach((t, i) => {
      const x = i * (cw + gap);
      const total = t.avg * s.pushes;
      let card = svg.rect(x, cardY, cw, ch, { cls: i === 1 ? 'zone' : 'box', r: 18 }) +
        svg.rect(x, cardY, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 26, cardY + 50, t.name, { cls: 't-lg z-text', anchor: 'start' });
      if (t.badge) {
        const bw = Math.round(measure(t.badge, 14) + 28);
        card += svg.chip(x + cw - bw - 22, cardY + 26, t.badge, { z: t.z, size: 14, h: 28, pad: 14 }).markup;
      }
      card += svg.text(x + 26, cardY + 82, t.model.toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.lines(x + 26, cardY + 116, t.use, { cls: 't-muted t-sm', anchor: 'start', max: 52, lh: 24 }) +
        svg.text(x + 26, cardY + ch - 22, `${s.pushes} reviewed pushes ≈ ${money(total)}`, { cls: 't-sm z-text', anchor: 'start' });
      body += svg.enter(svg.g(card, { cls: `z-${t.z}` }), 1100 + 220 * i);
    });

    const H = cardY + ch + 4;
    const label = `${s.title}. Estimated AI credits per review: ${s.tiers.map((t) => `${t.name}${t.badge ? ` (${t.badge})` : ''} ${money(t.min)} to ${money(t.max)}, average about ${money(t.avg)}, for ${t.use.toLowerCase()}; ${s.pushes} reviewed pushes cost about ${money(t.avg * s.pushes)}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'effort-tiers')}${html.footnote(s.footnote)}`;
  };

  const reviewSetup = (s) => {
    const D = s.setup;
    const W = 1440;
    const pw = 520;
    const rx = W - pw;
    const top = 0;
    const rowY = 72;
    const rh = 54;
    const H = rowY + Math.max(D.policy.length, D.files.length) * rh + 18;
    let body = '';

    let left = svg.rect(0, top, pw, H, { cls: 'box', r: 20 }) +
      svg.rect(0, top, pw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(26, 46, D.policyTitle.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' });
    D.policy.forEach((p, i) => {
      const y = rowY + i * rh;
      const cy = y + rh / 2;
      const end = pw - 24;
      let row = (i ? svg.path(`M24 ${y}L${pw - 24} ${y}`, { cls: 'wire faint' }) : '') +
        svg.text(26, cy + 6, p.label, { cls: 't-sm', anchor: 'start' });
      if (p.control === 'toggle') {
        row += svg.rect(end - 54, cy - 14, 54, 28, { cls: 'zone', r: 14 }) +
          svg.circle(end - 14, cy, 10, { cls: 'stop' });
      } else if (p.control === 'segments') {
        const sw = 92;
        p.options.forEach((o, j) => {
          const x = end - sw * (p.options.length - j);
          row += svg.rect(x, cy - 16, sw - 4, 32, { cls: j === p.selected ? 'task' : 'zone', r: 10 }) +
            svg.text(x + (sw - 4) / 2, cy + 5, o, { cls: j === p.selected ? 't-sm' : 't-xs z-text' });
        });
      } else {
        const w = Math.round(measure(p.value, 14) + 28);
        row += svg.chip(end - w, cy - 14, p.value, { z: 'github', size: 14, h: 28, pad: 14 }).markup;
      }
      left += svg.enter(row, 250 + 120 * i);
    });
    body += svg.g(left, { cls: 'z-github' });

    const cw = 250;
    const cx = (pw + rx) / 2;
    const cy = H / 2;
    const ch = 132;
    body += svg.trace(`M${pw + 6} ${cy}L${cx - cw / 2 - 8} ${cy}`, { cls: 'wire link', at: 1100, dur: 300 });
    body += svg.trace(`M${rx - 6} ${cy}L${cx + cw / 2 + 8} ${cy}`, { cls: 'wire link', at: 1100, dur: 300 });
    body += svg.pop(svg.path(`M${cx - cw / 2 - 20} ${cy - 9}L${cx - cw / 2 - 8} ${cy}L${cx - cw / 2 - 20} ${cy + 9}`, { cls: 'wire link' }), 1400);
    body += svg.pop(svg.path(`M${cx + cw / 2 + 20} ${cy - 9}L${cx + cw / 2 + 8} ${cy}L${cx + cw / 2 + 20} ${cy + 9}`, { cls: 'wire link' }), 1400);
    body += svg.enter(svg.text(cx, cy - ch / 2 - 28, D.policyEdge, { cls: 't-xs t-mono' }), 1300);
    body += svg.enter(svg.text(cx, cy + ch / 2 + 40, D.contextEdge, { cls: 't-xs t-mono' }), 1300);
    body += svg.pop(svg.g(
      svg.rect(cx - cw / 2, cy - ch / 2, cw, ch, { cls: 'task', r: 20 }) +
      svg.text(cx, cy - 20, '🔎', { cls: 't-emoji' }) +
      svg.lines(cx, cy + 20, D.core.title, { cls: 't-sm', max: 22, lh: 22 }) +
      svg.text(cx, cy + 46, D.core.detail, { cls: 't-xs z-text' }),
      { cls: 'z-purple' }), 1500);
    body += svg.halo(cx, cy, 90, { z: 'purple', at: 1800 });

    let right = svg.rect(rx, top, pw, H, { cls: 'box', r: 20 }) +
      svg.rect(rx, top, pw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(rx + 26, 46, D.contextTitle.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' });
    D.files.forEach((f, i) => {
      const y = rowY + i * rh;
      const x = rx + 30 + f.depth * 30;
      const iy = y + 14;
      let row = '';
      if (f.depth) row += svg.path(`M${x - 18} ${y - 10}L${x - 18} ${iy + 10}L${x - 6} ${iy + 10}`, { cls: 'wire faint' });
      row += f.folder
        ? svg.rect(x, iy + 2, 22, 16, { cls: 'zone', r: 3 }) + svg.rect(x, iy - 2, 10, 6, { cls: 'zone', r: 2 })
        : svg.rect(x + 3, iy - 2, 16, 22, { cls: 'zone', r: 3 });
      row += svg.text(x + 34, iy + 16, f.name, { cls: f.folder ? 't-sm t-muted' : 't-sm', anchor: 'start' });
      if (f.scope) {
        const w = Math.round(measure(f.scope, 13) + 24);
        row += svg.g(svg.chip(rx + pw - 24 - w, iy, f.scope, { z: f.z || 'purple', size: 13, h: 26, pad: 12 }).markup, {});
      }
      right += svg.enter(svg.g(row, { cls: `z-${f.z || 'purple'}` }), 600 + 120 * i);
    });
    body += svg.g(right, { cls: 'z-purple' });

    const label = `${s.title}. ${D.policyTitle}: ${D.policy.map((p) => p.options ? `${p.label}: ${p.options.join(', ')} (${p.options[p.selected]} default)` : p.value ? `${p.label}: ${p.value}` : p.label).join('; ')}. ${D.contextTitle}: ${D.files.filter((f) => !f.folder).map((f) => `${f.name} (${f.scope})`).join('; ')}. Both feed ${D.core.title}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'review-setup')}${html.footnote(s.footnote)}`;
  };

  const gapProof = (s) => {
    const G = s.gap;
    const W = 1440;
    const H = 430;
    const gap = 50;
    const aw = 430;
    const cw = 430;
    const bw = W - aw - cw - gap * 2;
    const ax = 0;
    const bx = aw + gap;
    const cx = bx + bw + gap;
    const tick = (x, y) => svg.path(`M${x} ${y}l7 7l13 -15`, { cls: 'check' });
    const cross = (x, y) => svg.path(`M${x} ${y - 9}l18 18M${x + 18} ${y - 9}l-18 18`, { cls: 'check' });
    const panel = (x, w, title, z) => svg.g(
      svg.rect(x, 0, w, H, { cls: 'box', r: 20 }) +
      svg.rect(x, 0, w, 6, { cls: 'card-top', r: 3 }) +
      svg.text(x + 24, 44, title.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' }),
      { cls: `z-${z}` });
    let body = '';

    let a = panel(ax, aw, G.checksTitle, 'green');
    const pw = (aw - 48 - 12) / 2;
    G.tests.forEach((t, i) => {
      const x = ax + 24 + (i % 2) * (pw + 12);
      const y = 66 + Math.floor(i / 2) * 54;
      a += svg.g(svg.rect(x, y, pw, 44, { cls: 'zone', r: 12 }) + tick(x + 14, y + 22) +
        svg.text(x + 46, y + 28, t, { cls: 't-xs z-text', anchor: 'start' }), { cls: 'z-green' });
    });
    a += svg.g(svg.rect(ax + 24, 174, aw - 48, 44, { cls: 'zone', r: 12 }) + tick(ax + 38, 196) +
      svg.text(ax + 70, 202, G.build, { cls: 't-xs z-text', anchor: 'start' }), { cls: 'z-green' });
    const by = 238;
    const bh = H - by - 20;
    a += svg.rect(ax + 24, by, aw - 48, bh, { cls: 'box soft', r: 12 }) +
      svg.path(`M${ax + 24} ${by + 30}L${ax + aw - 24} ${by + 30}`, { cls: 'wire faint' }) +
      [0, 1, 2].map((k) => svg.circle(ax + 44 + k * 18, by + 15, 5, { cls: 'stop' })).join('') +
      svg.text(ax + aw - 40, by + 21, 'browser', { cls: 't-xs t-mono', anchor: 'end' });
    const btnX = ax + aw / 2 - 70;
    const btnY = by + 56;
    a += svg.g(
      svg.rect(btnX, btnY, 140, 44, { cls: 'zone dashed', r: 10 }) +
      svg.text(btnX + 70, btnY + 29, 'Retry', { cls: 't-sm z-text' }) +
      svg.path(`M${btnX + 118} ${btnY + 30}l0 24l6 -6l6 11l5 -3l-6 -10l9 -1z`, { cls: 'wire' }) +
      svg.text(ax + aw / 2, btnY + 86, G.blind, { cls: 't-xs z-text' }),
      { cls: 'z-orange' });
    body += svg.enter(G.checksHref ? link(G.checksHref, a, 'Open the draft commit on #198') : a, 200);

    body += svg.trace(`M${aw + 8} ${H / 2}L${bx - 10} ${H / 2}`, { cls: 'wire link', at: 900, dur: 250 });

    let b = panel(bx, bw, G.reviewTitle, 'github');
    b += svg.g(svg.text(bx + 24, 98, '🔎', { cls: 't-emoji', anchor: 'start' }) +
      svg.text(bx + 76, 88, 'Copilot', { cls: 't-sm z-text', anchor: 'start' }) +
      svg.text(bx + 76, 110, 'review comment', { cls: 't-xs', anchor: 'start' }), { cls: 'z-github' });
    G.findings.forEach((f, i) => {
      const y = 140 + i * 90;
      const wrapLink = (inner) => (G.findingLinks && G.findingLinks[i] ? link(G.findingLinks[i], inner, 'Open the Copilot review thread') : inner);
      b += wrapLink(svg.g(
        svg.rect(bx + 24, y, bw - 48, 76, { cls: 'zone', r: 14 }) +
        svg.rect(bx + 24, y, 6, 76, { cls: 'card-edge', r: 3 }) +
        svg.circle(bx + 56, y + 38, 13, { cls: 'stop' }) +
        svg.text(bx + 56, y + 44, '!', { cls: 't-sm z-text' }) +
        svg.lines(bx + 84, y + 44 - (wrap(f, 38).length - 1) * 12, f, { cls: 't-sm', anchor: 'start', max: 38, lh: 24 }) +
        svg.text(bx + bw - 40, y + 44, '↗', { cls: 't-xs z-text', anchor: 'end' }),
        { cls: 'z-orange' }));
    });
    body += svg.enter(b, 1000);

    body += svg.trace(`M${bx + bw + 8} ${H / 2}L${cx - 10} ${H / 2}`, { cls: 'wire link', at: 1700, dur: 250 });

    let c = panel(cx, cw, G.proofTitle, 'purple');
    const tw = Math.round(measure(G.testName, 15) + 32);
    c += svg.chip(cx + cw / 2 - tw / 2, 70, G.testName, { z: 'purple', size: 15, h: 30, pad: 16 }).markup;
    const card = (y, st, z, mark, cls) => svg.g(
      svg.rect(cx + 24, y, cw - 48, 108, { cls, r: 16 }) +
      mark(cx + 50, y + 54) +
      svg.text(cx + 92, y + 46, st.label, { cls: 't-xs', anchor: 'start' }) +
      svg.text(cx + 92, y + 80, st.result, { cls: 't-lg z-text', anchor: 'start' }),
      { cls: `z-${z}` });
    c += card(122, G.before, 'orange', cross, 'zone');
    c += svg.path(`M${cx + cw / 2} 238L${cx + cw / 2} 276`, { cls: 'wire link' }) +
      svg.path(`M${cx + cw / 2 - 9} 266L${cx + cw / 2} 278L${cx + cw / 2 + 9} 266`, { cls: 'wire link' });
    c += card(292, G.after, 'green', tick, 'task');
    body += svg.enter(G.proofHref ? link(G.proofHref, c, 'Open the maintainer follow-up on #198') : c, 1800);

    const label = `${s.title}. ${G.checksTitle}: ${G.tests.length} passing component tests and a passing build; ${G.blind}. ${G.reviewTitle}: ${G.findings.join(' ')} ${G.proofTitle}: ${G.testName} ${G.before.result} ${G.before.label.toLowerCase()}, then ${G.after.result} ${G.after.label.toLowerCase()}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'gap-proof')}${html.footnote(s.footnote)}`;
  };

  const link = (href, inner, title) => {
    const ext = /^https?:/.test(href);
    return `<a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${title ? `<title>${esc(title)}</title>` : ''}${inner}</a>`;
  };
  const arrowHead = (x, y) => svg.path(`M${x - 12} ${y - 9}L${x} ${y}L${x - 12} ${y + 9}`, { cls: 'wire link' });

  const prTimeline = (s) => {
    const T = s.timeline;
    const W = 1440;
    const labelW = 150;
    const x0 = 176;
    const x1 = W - 20;
    const sec = (t) => { const [h, m, x] = t.split(':').map(Number); return h * 3600 + m * 60 + (x || 0); };
    const t0 = sec(T.start);
    const t1 = sec(T.end);
    const xt = (t) => x0 + ((sec(t) - t0) / (t1 - t0)) * (x1 - x0);
    const tickY = 62;
    const laneY = 78;
    const lh = 82;
    const lg = 8;
    const laneIdx = (id) => T.lanes.findIndex((l) => l.id === id);
    const laneMid = (id) => laneY + laneIdx(id) * (lh + lg) + lh / 2;
    const H = laneY + T.lanes.length * (lh + lg) - lg + 4;
    let body = '';

    T.moments.forEach((m, i) => {
      const a = xt(m.from);
      const b = xt(m.to);
      const text = `${m.key} · ${m.label}`;
      const w = Math.round(measure(text, 14) + 28);
      body += svg.enter(
        svg.g(svg.rect(a, 34, b - a, H - 34, { cls: 'box soft', r: 14 }), { cls: 'z-purple' }) +
        link(`#${m.slide}`, svg.chip((a + b) / 2 - w / 2, 0, text, { z: 'purple', size: 14, h: 28, pad: 14 }).markup, `Zoom in: slide ${m.slide}`),
        1600 + 200 * i);
    });

    for (let m = 0; m <= (t1 - t0) / 60; m += 5) {
      const x = x0 + ((m * 60) / (t1 - t0)) * (x1 - x0);
      const mm = 30 + m;
      const label = `${15 + Math.floor(mm / 60)}:${String(mm % 60).padStart(2, '0')}`;
      body += svg.text(x, tickY, label, { cls: 't-xs t-mono' }) +
        svg.path(`M${x} ${tickY + 8}L${x} ${H}`, { cls: 'wire faint' });
    }

    T.lanes.forEach((l, i) => {
      const y = laneY + i * (lh + lg);
      body += svg.g(
        svg.rect(0, y, labelW, lh, { cls: 'zone', r: 12 }) +
        svg.rect(0, y, 6, lh, { cls: 'card-edge', r: 3 }) +
        svg.text(20, y + lh / 2 + 6, l.label, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.path(`M${x0} ${y + lh / 2}L${x1} ${y + lh / 2}`, { cls: 'wire faint' }),
        { cls: `z-${l.z}` });
    });

    const pushes = T.events.filter((e) => e.push);
    pushes.forEach((e, i) => {
      const x = xt(e.t);
      const qy = laneMid('quality');
      body += svg.enter(svg.path(`M${x} ${laneMid(e.lane) + 10}L${x} ${qy - 12}`, { cls: 'wire faint' }), 400 + 60 * i);
      const tick = svg.g(svg.rect(x + 1, qy - 11, 5, 22, { cls: 'card-top', r: 2 }), { cls: 'z-green' });
      body += svg.enter(link(e.href, tick, `Code Quality scan on ${e.label === 'staged push' ? '8a752d2' : e.label}`), 500 + 60 * i);
    });

    const zOf = (e) => e.tone || T.lanes[laneIdx(e.lane)].z;
    const flip = {};
    T.events.slice().sort((a, b) => sec(a.t) - sec(b.t)).forEach((e, i) => {
      const x = xt(e.t);
      const y = laneMid(e.lane);
      const z = zOf(e);
      flip[e.lane] = !flip[e.lane];
      let mark = e.big
        ? svg.circle(x, y, 13, { cls: 'task' })
        : svg.circle(x, y, 9, { cls: 'stop' });
      if (e.label) {
        const above = e.lane === 'agent' && !flip[e.lane];
        const ly = above ? y - 18 : y + 31;
        const w = measure(e.label, 15);
        const anchor = x - w / 2 < x0 - 8 ? 'start' : 'middle';
        mark += svg.text(anchor === 'start' ? x - 8 : x, ly, e.label, { cls: e.lane === 'agent' ? 't-xs t-mono z-text' : 't-xs z-text', anchor });
      }
      body += svg.pop(link(e.href, svg.g(mark, { cls: `z-${z}` }), `${e.t} UTC · ${e.title}`), 300 + 70 * i);
    });

    const label = `${s.title}. Timeline of FanHub #221 across ${T.lanes.map((l) => l.label).join(', ')}: ${T.events.slice().sort((a, b) => sec(a.t) - sec(b.t)).map((e) => `${e.t} ${T.lanes[laneIdx(e.lane)].label}: ${e.title}`).join('; ')}. Moments: ${T.moments.map((m) => `${m.key}, ${m.label}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'pr-timeline')}${html.footnote(s.footnote)}`;
  };

  const artifactChain = (s) => {
    const W = 1440;
    const n = s.chain.length;
    const gap = 40;
    const cw = (W - gap * (n - 1)) / n;
    const cardY = 48;
    const ch = 360;
    const H = cardY + ch + 4;
    const xs = s.chain.map((_, i) => i * (cw + gap));
    let body = '';

    (s.groups || []).forEach((g, i) => {
      const a = xs[g.span[0]];
      const b = xs[g.span[1]] + cw;
      const text = `${g.key} · ${g.label}`;
      const w = Math.round(measure(text, 14) + 28);
      body += svg.enter(
        svg.path(`M${a + 12} 30L${a + 12} 16L${b - 12} 16L${b - 12} 30`, { cls: 'wire faint' }) +
        svg.chip((a + b) / 2 - w / 2, 2, text, { z: 'purple', size: 14, h: 28, pad: 14 }).markup,
        150 + 200 * i);
    });

    s.chain.forEach((c, i) => {
      const x = xs[i];
      const y = cardY;
      const card = svg.rect(x, y, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x, y, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 24, y + 38, c.when, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + 24, y + 76, c.actor, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(x + 24, y + 110, c.status, { cls: 't-sm', anchor: 'start' }) +
        svg.path(`M${x + 24} ${y + 130}L${x + cw - 24} ${y + 130}`, { cls: 'wire faint' }) +
        svg.lines(x + 24, y + 166, `“${c.quote}”`, { cls: 't-muted t-sm', anchor: 'start', max: 31, lh: 25 }) +
        svg.text(x + 24, y + ch - 24, c.ref, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + cw - 24, y + ch - 24, 'open ↗', { cls: 't-xs z-text', anchor: 'end' });
      body += svg.enter(link(c.href, svg.g(card, { cls: `z-${c.z}` }), `${c.when} · ${c.actor} · ${c.status}`), 400 + 300 * i);
      if (i < n - 1) {
        const ay = cardY + ch / 2;
        body += svg.trace(`M${x + cw + 6} ${ay}L${xs[i + 1] - 8} ${ay}`, { cls: 'wire link', at: 600 + 300 * i, dur: 200 }) +
          svg.pop(arrowHead(xs[i + 1] - 6, ay), 780 + 300 * i);
      }
    });

    const label = `${s.title}. ${s.chain.map((c) => `${c.when}, ${c.actor}, ${c.status}: ${c.quote}`).join(' Then ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'artifact-chain')}${html.footnote(s.footnote)}`;
  };

  const sameLine = (s) => {
    const C = s.code;
    const W = 1440;
    const cw = 620;
    const rx = 680;
    const rw = W - rx;
    const lineY = 92;
    const lh = 26;
    const codeH = lineY + C.lines.length * lh;
    const resY = codeH + 30;
    const resH = 84;
    const H = resY + resH + 4;
    let body = '';

    const m0 = C.mark[0] - C.first;
    const m1 = C.mark[1] - C.first;
    const hy0 = lineY + m0 * lh - 19;
    const hy1 = lineY + m1 * lh + 9;
    let code = svg.rect(0, 0, cw, codeH, { cls: 'box', r: 18 }) +
      svg.text(24, 40, C.file, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(cw - 24, 40, `${C.ref} ↗`, { cls: 't-xs t-mono z-text', anchor: 'end' }) +
      svg.path(`M24 58L${cw - 24} 58`, { cls: 'wire faint' }) +
      svg.g(svg.rect(14, hy0, cw - 28, hy1 - hy0, { cls: 'zone', r: 8 }), { cls: 'z-orange' });
    C.lines.forEach((ln, i) => {
      const y = lineY + i * lh;
      code += svg.text(56, y, String(C.first + i), { cls: 't-xs t-mono', anchor: 'end' }) +
        svg.text(76, y, ln.replace(/^ +/, (m) => '\u00a0'.repeat(m.length)), { cls: 't-xs t-mono', anchor: 'start' }).replace('<text ', '<text style="font-variant-ligatures:none" ');
    });
    body += svg.enter(link(C.href, svg.g(code, { cls: 'z-orange' }), `Commit ${C.ref}: ${C.file}`), 200);

    const ch = (codeH - 24) / 2;
    const hm = (hy0 + hy1) / 2;
    s.comments.forEach((c, i) => {
      const y = i * (ch + 24);
      const cy = y + ch / 2;
      body += svg.trace(`M${cw + 6} ${hm}C${cw + 34} ${hm},${rx - 34} ${cy},${rx - 8} ${cy}`, { cls: 'wire link', at: 700 + 400 * i, dur: 350 });
      const card = svg.rect(rx, y, rw, ch, { cls: 'zone', r: 18 }) +
        svg.rect(rx, y, 6, ch, { cls: 'card-edge', r: 3 }) +
        svg.text(rx + 28, y + 36, c.actor, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.text(rx + rw - 24, y + 36, `${c.when} ↗`, { cls: 't-xs t-mono', anchor: 'end' }) +
        svg.text(rx + 28, y + 76, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(rx + 28, y + 110, c.body, { cls: 't-muted t-sm', anchor: 'start', max: 72, lh: 24 });
      body += svg.enter(link(c.href, svg.g(card, { cls: `z-${c.z}` }), `${c.when} · ${c.actor}: ${c.title}`), 900 + 400 * i);
    });

    const n = s.resolution.length;
    const gap = 54;
    const pw = (W - gap * (n - 1)) / n;
    s.resolution.forEach((r, i) => {
      const x = i * (pw + gap);
      const pill = svg.rect(x, resY, pw, resH, { cls: i === n - 1 ? 'task' : 'zone', r: 16 }) +
        svg.text(x + 24, resY + 32, `${r.when} · ${r.actor}`, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + pw - 20, resY + 32, '↗', { cls: 't-xs z-text', anchor: 'end' }) +
        svg.text(x + 24, resY + 62, r.text, { cls: 't-sm', anchor: 'start' });
      body += svg.enter(link(r.href, svg.g(pill, { cls: `z-${r.z}` }), `${r.when} · ${r.actor}: ${r.text}`), 1800 + 300 * i);
      if (i < n - 1) {
        const ay = resY + resH / 2;
        body += svg.trace(`M${x + pw + 6} ${ay}L${x + pw + gap - 8} ${ay}`, { cls: 'wire link', at: 2000 + 300 * i, dur: 200 }) +
          svg.pop(arrowHead(x + pw + gap - 6, ay), 2150 + 300 * i);
      }
    });

    const label = `${s.title}. Code at ${C.ref} in ${C.file}, lines ${C.mark[0]} to ${C.mark[1]}. ${s.comments.map((c) => `${c.actor} at ${c.when}: ${c.title}. ${c.body}`).join(' ')} Resolution: ${s.resolution.map((r) => `${r.when} ${r.actor}: ${r.text}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'same-line')}${html.footnote(s.footnote)}`;
  };

  const pipelineVsMap = (s) => {
    const M = s.map;
    const W = 1440;
    const lw = 520;
    const rx = 580;
    const rw = W - rx;
    const top = 0;
    const ph = 330;
    const qY = ph + 26;
    const qH = 92;
    const H = qY + qH + 4;
    let body = '';

    let left = svg.rect(0, top, lw, ph, { cls: 'box soft', r: 20 }) +
      svg.text(24, 40, 'PIPELINE THINKING', { cls: 't-xs t-mono', anchor: 'start' });
    const n = s.pipeline.length;
    const bw = 96;
    const bg = (lw - 48 - bw * n) / (n - 1);
    s.pipeline.forEach((p, i) => {
      const x = 24 + i * (bw + bg);
      left += svg.rect(x, 66, bw, 50, { cls: 'box soft', r: 10 }) + svg.text(x + bw / 2, 97, p, { cls: 't-sm t-muted' });
      if (i < n - 1) left += svg.path(`M${x + bw + 6} 91L${x + bw + bg - 6} 91`, { cls: 'wire faint' });
    });
    s.before.forEach((b, i) => {
      const y = 170 + i * 52;
      left += svg.g(svg.path(`M30 ${y - 14}l12 12M42 ${y - 14}l-12 12`, { cls: 'check' }), { cls: 'z-orange' }) +
        svg.lines(58, y - 2, b, { cls: 't-sm t-muted', anchor: 'start', max: 44, lh: 22 });
    });
    body += svg.enter(left, 100);

    body += svg.enter(svg.g(svg.rect(rx, top, rw, ph, { cls: 'box', r: 20 }) +
      svg.text(rx + 24, 40, 'EVENT MAP', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-purple' }), 400);

    const cx = rx + rw / 2 - 40;
    const cy = 172;
    const nw = 210;
    const nh = 64;
    const node = (n, x, y, at) => svg.enter(svg.g(
      svg.rect(x - nw / 2, y - nh / 2, nw, nh, { cls: 'zone', r: 14 }) +
      svg.text(x, y - 4, n.title, { cls: 't-sm z-text' }) +
      svg.text(x, y + 20, n.detail, { cls: 't-xs' }),
      { cls: `z-${n.z}` }), at);
    const ax = cx - 240;
    const rxn = cx + 240;
    const ty = cy - 86;
    const by = cy + 86;
    body += node(M.agent, ax, ty, 700) + node(M.person, ax, by, 800) +
      node(M.review, rxn, ty, 1300) + node(M.quality, rxn, by, 1400);
    body += svg.pop(svg.g(
      svg.circle(cx, cy, 58, { cls: 'task' }) +
      svg.text(cx, cy - 2, M.hub.title, { cls: 't-sm' }) +
      svg.text(cx, cy + 22, M.hub.detail, { cls: 't-xs z-text' }),
      { cls: 'z-purple' }), 1000);
    body += svg.halo(cx, cy, 70, { z: 'purple', at: 1200 });
    const edge = (d, at, cls = 'wire link') => svg.trace(d, { cls, at, dur: 350 });
    body += edge(`M${ax + nw / 2 + 4} ${ty}C${cx - 60} ${ty},${cx - 70} ${cy - 30},${cx - 56} ${cy - 16}`, 900);
    body += edge(`M${ax + nw / 2 + 4} ${by}C${cx - 60} ${by},${cx - 70} ${cy + 30},${cx - 56} ${cy + 16}`, 950);
    body += edge(`M${cx + 56} ${cy - 16}C${cx + 70} ${cy - 30},${cx + 60} ${ty},${rxn - nw / 2 - 6} ${ty}`, 1200);
    body += edge(`M${cx + 56} ${cy + 16}C${cx + 70} ${cy + 30},${cx + 60} ${by},${rxn - nw / 2 - 6} ${by}`, 1250);
    const back = `M${rxn} ${by + nh / 2 + 4}C${rxn} ${by + 56},${ax} ${by + 56},${ax} ${by + nh / 2 + 4}`;
    body += svg.g(svg.trace(back, { cls: 'wire link dashed', at: 1700, dur: 600 }), {});
    body += svg.ride(back, { z: 'green', at: 2400, dur: 2600, r: 6 });
    body += svg.enter(svg.text(cx, by + 30, M.back, { cls: 't-xs z-text' }), 2000, 'z-green');
    body += svg.enter(svg.text(rxn, cy + 6, M.wake, { cls: 't-xs t-mono' }), 1500);
    const ex = rx + rw - 24;
    const mw = Math.round(measure(M.exit, 15) + 30);
    body += svg.pop(svg.g(
      svg.chip(ex - mw, 18, M.exit, { z: 'orange', size: 15, h: 30, pad: 15 }).markup +
      svg.text(ex - mw - 10, 38, 'only a person', { cls: 't-xs z-text', anchor: 'end' }),
      { cls: 'z-orange' }), 2500);

    const qn = s.metrics.length;
    const qg = 24;
    const qw = (W - qg * (qn - 1)) / qn;
    s.metrics.forEach((m, i) => {
      const x = i * (qw + qg);
      body += svg.enter(svg.g(
        svg.rect(x, qY, qw, qH, { cls: 'zone', r: 16 }) +
        svg.text(x + 26, qY + 40, m.value, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(x + 26, qY + 72, m.detail, { cls: 't-sm t-muted', anchor: 'start' }),
        { cls: 'z-purple' }), 2700 + 150 * i);
    });

    const label = `${s.title}. Pipeline thinking: ${s.pipeline.join(' then ')}; ${s.before.join(' ')} Event map: ${M.agent.title} and ${M.person.title} push a ${M.hub.title.toLowerCase()}; ${M.wake}: ${M.review.title} and ${M.quality.title}; ${M.back}; only a person merges. Ask of every pull request: ${s.metrics.map((m) => `${m.value} ${m.detail}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'pipeline-vs-map')}`;
  };

  const roleMoves = (s, ctx) => {
    const W = 1440;
    const n = s.roles.length;
    const gap = 36;
    const cw = (W - gap * (n - 1)) / n;
    const ch = 360;
    const tY = ch + 24;
    const tH = 66;
    const H = tY + tH + 4;
    const ids = ((ctx && ctx.deck && ctx.deck.slides) || []).map((x) => x.id);
    const num = (id) => ids.indexOf(id) + 1;
    let body = '';

    s.roles.forEach((r, i) => {
      const x = i * (cw + gap);
      let card = svg.rect(x, 0, cw, ch, { cls: 'box', r: 20 }) +
        svg.rect(x, 0, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 26, 58, r.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(x + 78, 50, r.role, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(x + 78, 76, r.goal.toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' });
      r.steps.forEach((st, j) => {
        const y = 130 + j * 64;
        card += svg.circle(x + 42, y - 6, 15, { cls: 'stop' }) +
          svg.text(x + 42, y, String(j + 1), { cls: 't-sm z-text' }) +
          svg.lines(x + 72, y - (wrap(st, 34).length - 1) * 11, st, { cls: 't-sm', anchor: 'start', max: 34, lh: 22 });
      });
      let chips = '';
      let cx = x + 26 + measure('Learned in', 15) + 12;
      r.refs.forEach((id) => {
        const k = num(id);
        if (!k) return;
        const text = `slide ${k}`;
        const w = Math.round(measure(text, 14) + 28);
        chips += link(`#${k}`, svg.chip(cx, ch - 50, text, { z: r.z, size: 14, h: 28, pad: 14 }).markup, `Jump to slide ${k}`);
        cx += w + 10;
      });
      card += svg.text(x + 26, ch - 31, 'Learned in', { cls: 't-xs', anchor: 'start' });
      body += svg.enter(svg.g(card, { cls: `z-${r.z}` }) + svg.g(chips, { cls: `z-${r.z}` }), 300 + 300 * i);
      if (i < n - 1) {
        const ay = ch / 2;
        body += svg.trace(`M${x + cw + 6} ${ay}L${x + cw + gap - 8} ${ay}`, { cls: 'wire link', at: 500 + 300 * i, dur: 200 }) +
          svg.pop(arrowHead(x + cw + gap - 6, ay), 680 + 300 * i);
      }
    });

    body += svg.enter(svg.g(
      svg.rect(0, tY, W, tH, { cls: 'task', r: 16 }) +
      svg.path(`M28 ${tY + tH / 2}l9 9l17 -19`, { cls: 'check' }) +
      svg.text(70, tY + tH / 2 + 7, s.takeaway, { cls: 't-sm', anchor: 'start' }),
      { cls: 'z-green' }), 1400);

    const label = `${s.title}. ${s.roles.map((r) => `${r.role}, goal ${r.goal}: ${r.steps.join(' ')}`).join(' ')} ${s.takeaway}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'role-moves')}`;
  };

  window.SCENES = {
    'role-moves': roleMoves,
    'pipeline-vs-map': pipelineVsMap,
    'pr-timeline': prTimeline,
    'artifact-chain': artifactChain,
    'same-line': sameLine,
    'gap-proof': gapProof,
    'review-setup': reviewSetup,
    'effort-tiers': effortTiers,
    'review-loop': reviewLoop,
    'event-map': eventMap,
    'issue-proof': issueProof,
    'pr-stack': prStack,
    'pr-closed': prClosed,
    'pr-anatomy': prAnatomy
  };
})();
