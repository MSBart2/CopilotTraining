/*
  Agentic SDLC deck-only visuals. Shared frames and patterns stay in slides/native.
*/
(() => {
  const { svg, html } = window.Kit;

  const deliveryConfidence = (s) => {
    const request = svg.enter(
      svg.rect(0, 0, 736, 88, { cls: 'box soft', r: 16 }) +
      svg.text(24, 28, 'DEVELOPER REQUEST', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(24, 62, s.task, { anchor: 'start' }), 200);
    const handoffs = s.handoffs.map((step, i) => {
      const y = 122 + i * 130;
      const connector = svg.trace(`M32 ${y - 34}L32 ${y}`, { cls: 'wire', at: 400 + i * 250, dur: 350 });
      const card = svg.g(
        svg.rect(0, y, 736, 108, { cls: 'box', r: 16 }) +
        svg.rect(0, y + 18, 4, 72, { cls: 'card-edge', r: 2 }) +
        svg.circle(32, y + 32, 13, { cls: 'zone' }) +
        svg.text(32, y + 37, String(i + 1), { cls: 't-xs z-text' }) +
        svg.text(60, y + 42, step.title, { cls: 't-lg', anchor: 'start' }) +
        svg.text(710, y + 39, step.artifact, { cls: 't-sm t-mono z-text', anchor: 'end' }) +
        svg.text(60, y + 80, step.detail, { cls: 't-muted', anchor: 'start' }),
        { cls: `z-${step.z}` });
      return connector + svg.enter(card, 450 + i * 250);
    }).join('');
    const label = `Example handoff. Developer request: ${s.task} ${s.handoffs.map((step) => `${step.title}: ${step.artifact}. ${step.detail}`).join(' ')}`;
    return `${html.pill(s)}
      <div class="confidence-layout">
        <div class="confidence-copy">
          <h2 class="m-in">${html.esc(s.title)}</h2>
          <p class="subtitle m-in" style="--at:150ms">${html.esc(s.subtitle)}</p>
        </div>
        <div class="confidence-example">
          <p class="confidence-label m-in">Example handoff</p>
          ${svg.scene(736, 490, label, request + handoffs, 'confidence-handoff')}
        </div>
      </div>
      <div class="confidence-route m-in" style="--at:1250ms">
        <p class="confidence-label">${html.esc(s.routingLabel)}</p>
        <ol>${s.routing.map((step) => `<li>${html.esc(step)}</li>`).join('')}</ol>
        <p class="confidence-takeaway">${html.esc(s.highlight)}</p>
      </div>`;
  };

  const sdlcLoop = () => {
    const W = 760;
    const C = 380;
    const nodes = [
      { x: 380, y: 145, z: 'purple', title: 'Repository', detail: 'context + boundaries' },
      { x: 635, y: 380, z: 'orange', title: 'PR governance', detail: 'intent + authority' },
      { x: 380, y: 615, z: 'green', title: 'CI evidence', detail: 'checks + provenance' },
      { x: 125, y: 380, z: 'local', title: 'Adoption', detail: 'practice + feedback' }
    ];
    let body = svg.circle(C, C, 260, { cls: 'ring' }) + svg.circle(C, C, 128, { cls: 'ring' });
    const points = nodes.map((n) => [n.x, n.y]);
    points.forEach(([x, y], i) => {
      const [nx, ny] = points[(i + 1) % points.length];
      body += svg.trace(`M${x} ${y}L${nx} ${ny}`, { cls: 'wire', at: 400 + i * 220, dur: 700 });
    });
    nodes.forEach((n, i) => {
      body += svg.g(
        svg.rect(n.x - 112, n.y - 44, 224, 88, { cls: 'zone', r: 18 }) +
        svg.text(n.x, n.y - 4, n.title, { cls: 't-lg z-text' }) +
        svg.text(n.x, n.y + 25, n.detail, { cls: 't-xs z-text' }),
        { cls: `z-${n.z}` });
    });
    body += svg.g(
      svg.rect(C - 106, C - 54, 212, 108, { cls: 'box task', r: 20 }) +
      svg.text(C, C - 8, 'Agent-scale', { cls: 't-lg' }) +
      svg.text(C, C + 24, 'delivery system', { cls: 't-sm' }),
      { cls: 'z-purple' });
    return svg.scene(W, W,
      'A delivery loop connects repository context, pull-request governance, CI evidence, and developer adoption around agent-scale work.',
      body, 'sdlc-loop');
  };

  const maturityMap = (s) => {
    const W = 1440;
    const gap = 16;
    const cw = (W - gap * 4) / 5;
    const y = 48;
    const h = 452;
    const rise = `M${cw / 2} 14L${W - cw / 2} 14`;
    const progression =
      svg.text(0, 20, 'PLATFORM + ADOPTION RISE TOGETHER', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.trace(`M330 14L${W - 12} 14`, { cls: 'wire', at: 200, dur: 1100 }) +
      svg.path(`M${W - 22} 6L${W - 10} 14L${W - 22} 22`, { cls: 'wire' }) +
      svg.ride(rise, { z: 'purple', at: 1500, dur: 3200, r: 5 });
    const cards = s.levels.map((l, i) => {
      const x = i * (cw + gap);
      const hero = l.level === s.launchpad;
      const band = (yy, label, value, color) =>
        svg.g(svg.rect(x + 16, yy, cw - 32, 100, { cls: 'zone', r: 12 }) +
          svg.text(x + 32, yy + 28, label, { cls: 't-xs t-mono', anchor: 'start' }) +
          svg.lines(x + 32, yy + 60, value, { cls: 'mm-val z-text', anchor: 'start', max: 19, lh: 25 }),
          { cls: `z-${color}` });
      const badge = hero
        ? svg.pop(svg.chip(x + cw - 112, y + 20, 'LAUNCHPAD', { z: 'purple', size: 13, h: 26, pad: 12, cls: 'mm-badge' }).markup, 1300)
        : '';
      return svg.enter(svg.g(
        svg.rect(x, y, cw, h, { cls: hero ? 'box task' : 'box', r: 18 }) +
        svg.text(x + 24, y + 40, l.level, { cls: 't-sm t-mono z-text', anchor: 'start' }) +
        svg.text(x + 24, y + 80, l.name, { cls: 't-lg', anchor: 'start' }) +
        band(y + 104, 'PLATFORM', l.platform, 'local') +
        band(y + 216, 'ADOPTION', l.adoption, 'github') +
        svg.path(`M${x + 24} ${y + 340}L${x + cw - 24} ${y + 340}`, { cls: 'wire faint' }) +
        svg.text(x + 24, y + 372, 'UNLOCKS', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.lines(x + 24, y + 406, l.unlock, { cls: 'mm-unlock', anchor: 'start', max: 17, lh: 28 }),
        { cls: `z-${hero ? 'purple' : 'local'}` }), 300 + 160 * i) + badge;
    }).join('');
    const label = `Five maturity levels pair platform and adoption signals; ${s.launchpad} is the launchpad. ${s.levels.map((l) => `${l.level} ${l.name}: platform ${l.platform}; adoption ${l.adoption}; unlocks ${l.unlock}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, y + h, label, progression + cards, 'maturity-map')}${html.footnote(s.footnote)}`;
  };

  const l3Requirements = (s) => {
    const W = 1440;
    const gap = 32;
    const pw = (W - gap) / 2;
    const ph = 372;
    const panel = (x, col, z, at) => svg.enter(svg.g(
      svg.rect(x, 0, pw, ph, { cls: 'box', r: 18 }) +
      svg.rect(x, 0, pw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(x + 32, 42, col.kicker, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(x + 32, 80, col.title, { cls: 't-lg', anchor: 'start' }) +
      svg.path(`M${x + 32} 102L${x + pw - 32} 102`, { cls: 'wire faint' }) +
      col.items.map((item, i) => {
        const cy = 140 + i * 50;
        return svg.rect(x + 32, cy - 13, 26, 26, { cls: 'tick-box', r: 6 }) +
          svg.trace(`M${x + 38} ${cy}L${x + 43} ${cy + 6}L${x + 53} ${cy - 7}`, { cls: 'check l3-check', at: at + 300 + 140 * i, dur: 260 }) +
          svg.text(x + 76, cy + 7, item, { cls: 'l3-item', anchor: 'start' });
      }).join(''),
      { cls: `z-${z}` }), at);
    const ty = ph + 28;
    let cx = 300;
    const chips = s.targets.map((t, i) => {
      const chip = svg.chip(cx, ty + 28, t, { z: 'orange', size: 17, h: 40, pad: 16 });
      cx += chip.w + 14;
      return svg.pop(chip.markup, 1500 + 120 * i);
    }).join('');
    const strip = svg.enter(
      svg.rect(0, ty, W, 96, { cls: 'box soft', r: 16 }) +
      svg.text(28, ty + 42, s.targetsLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(28, ty + 68, s.targetsNote, { cls: 't-xs', anchor: 'start' }), 1300) + chips;
    const label = `${s.title}. ${s.platform.title}: ${s.platform.items.join('; ')}. ${s.adoption.title}: ${s.adoption.items.join('; ')}. ${s.targetsLabel}, ${s.targetsNote}: ${s.targets.join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, ty + 96, label,
      panel(0, s.platform, 'local', 300) + panel(pw + gap, s.adoption, 'github', 500) + strip,
      'l3-requirements')}${html.footnote(s.footnote)}`;
  };

  const instructionStack = (s) => {
    const W = 1440;
    const rowH = 68;
    const gap = 12;
    const body = s.layers.map((item, i) => {
      const y = i * (rowH + gap);
      return svg.g(
        svg.rect(0, y, W, rowH, { cls: 'box', r: 14 }) +
        svg.rect(12, y + 8, 126, rowH - 16, { cls: 'zone', r: 12 }) +
        svg.text(75, y + 42, item.label, { cls: 't-xs t-mono z-text' }) +
        svg.text(172, y + 42, item.name, { cls: 't-sm', anchor: 'start' }) +
        svg.text(570, y + 42, item.detail, { cls: 't-xs', anchor: 'start' }),
        { cls: `z-${item.z}` });
    }).join('');
    return `${html.head(s)}${svg.scene(W, s.layers.length * (rowH + gap) - gap,
      `Instruction hierarchy: ${s.layers.map((l) => `${l.label}, ${l.name}: ${l.detail}`).join('. ')}`,
      body, 'instruction-stack')}${html.footnote(s.footnote)}`;
  };

  const volumeBreakpoint = (s) => {
    const W = 1440;
    const num = (v) => Number(v.replace(/,/g, ''));
    const capacity = Math.round((W * num(s.left.value)) / num(s.right.value));
    const unitX = (v) => v.replace(/,/g, '').length * 33 + (v.match(/,/g) || []).length * 14 + 18;
    const row = (y0, item, z, at, width) => svg.g(
      svg.text(0, y0 + 52, item.value, { cls: 'vb-num z-text', anchor: 'start' }) +
      svg.text(unitX(item.value), y0 + 52, item.label, { cls: 't-muted', anchor: 'start' }) +
      svg.text(W, y0 + 50, item.caption, { cls: 't-xs t-mono', anchor: 'end' }) +
      svg.rect(0, y0 + 72, W, 36, { cls: 'box soft', r: 8 }) +
      svg.trace(`M0 ${y0 + 90}L${width} ${y0 + 90}`, { cls: 'vb-bar', at, dur: width > 200 ? 1400 : 300 }),
      { cls: `z-${z}` });
    const ratio = svg.chip(0, 0, s.ratio, { z: 'purple', size: 22, h: 38, pad: 22 });
    const body =
      row(0, s.left, 'orange', 400, capacity) +
      row(150, s.right, 'github', 900, W) +
      svg.pop(svg.chip(W - ratio.w, 118, s.ratio, { z: 'purple', size: 22, h: 38, pad: 22 }).markup, 2300) +
      svg.g(svg.trace(`M${capacity} 214L${capacity} 272`, { cls: 'wire dashed z-stroke', at: 2400, dur: 300 }) +
        svg.enter(svg.text(capacity + 14, 292, s.marker, { cls: 't-xs z-text', anchor: 'start' }), 2600), { cls: 'z-orange' }) +
      svg.enter(
        svg.g(svg.rect(0, 320, W, 160, { cls: 'box', r: 18 }) +
          svg.text(36, 366, 'FROM', { cls: 't-xs t-mono', anchor: 'start' }) +
          svg.text(36, 408, s.from.title, { cls: 't-lg t-muted', anchor: 'start' }) +
          svg.text(36, 444, s.from.detail, { cls: 't-sm t-muted', anchor: 'start' })) +
        svg.trace('M560 400L668 400', { cls: 'wire link', at: 3000, dur: 300 }) +
        svg.path('M656 390L670 400L656 410', { cls: 'wire link' }) +
        svg.g(svg.rect(704, 336, W - 720, 128, { cls: 'zone', r: 14 }) +
          svg.text(736, 370, 'TO', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
          svg.text(736, 410, s.to.title, { cls: 't-lg', anchor: 'start' }) +
          svg.text(736, 444, s.to.detail, { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-purple' }),
        2800);
    return `${html.head(s)}${svg.scene(W, 480,
      `Illustrative review-volume comparison: a reviewer reads ${s.left.value} lines per day; agent-scale output is ${s.right.value} lines per day, ${s.ratio}. ${s.marker}. The shift is from ${s.from.title.toLowerCase()} to ${s.to.title.toLowerCase()}.`,
      body, 'volume-breakpoint')}`;
  };

  const repoDecision = (s) => {
    const W = 1440;
    const T = Math.round(W * s.threshold.value);
    const gauge =
      svg.enter(
        svg.text(0, 22, s.gaugeLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(W, 22, s.gaugeNote, { cls: 't-xs', anchor: 'end' }) +
        svg.g(svg.rect(0, 42, T, 52, { cls: 'zone', r: 12 }) +
          svg.text(T / 2, 75, s.below, { cls: 't-sm z-text' }), { cls: 'z-local' }) +
        svg.g(svg.rect(T + 6, 42, W - T - 6, 52, { cls: 'zone', r: 12 }) +
          svg.text((T + W) / 2, 75, s.above, { cls: 't-sm z-text' }), { cls: 'z-purple' }) +
        svg.text(0, 122, '0%', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(W, 122, '100%', { cls: 't-xs t-mono', anchor: 'end' }), 200) +
      svg.g(svg.trace(`M${T + 3} 30L${T + 3} 106`, { cls: 'wire dashed z-stroke', at: 900, dur: 300 }), { cls: 'z-orange' });
    const chip = svg.chip(0, 0, s.threshold.label, { z: 'orange', size: 17, h: 34, pad: 16 });
    const marker = svg.pop(svg.chip(T + 3 - chip.w / 2, 108, s.threshold.label, { z: 'orange', size: 17, h: 34, pad: 16 }).markup, 1100);
    const top = 170;
    const ph = 326;
    const pw = (W - 32) / 2;
    const panel = (x, col, z, at) => svg.enter(svg.g(
      svg.rect(x, top, pw, ph, { cls: 'box', r: 18 }) +
      svg.rect(x, top, pw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(x + 32, top + 44, col.label, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      col.items.map(([title, detail], i) => {
        const y = top + 92 + i * 62;
        return svg.circle(x + 40, y - 7, 6, { cls: 'rd-dot' }) +
          svg.text(x + 62, y, title, { cls: 'rd-item', anchor: 'start' }) +
          svg.text(x + 62, y + 24, detail, { cls: 't-xs', anchor: 'start' });
      }).join('') +
      svg.rect(x + 24, top + ph - 70, pw - 48, 48, { cls: 'zone', r: 12 }) +
      svg.text(x + pw / 2, top + ph - 39, col.outcome, { cls: 't-sm z-text' }),
      { cls: `z-${z}` }), at);
    const label = `${s.gaugeLabel}: below ${s.threshold.label}, ${s.below}; above it, ${s.above}. ${s.keep.label}: ${s.keep.items.map((i) => i.join(', ')).join('; ')}. ${s.keep.outcome}. ${s.consolidate.label}: ${s.consolidate.items.map((i) => i.join(', ')).join('; ')}. ${s.consolidate.outcome}.`;
    return `${html.head(s)}${svg.scene(W, top + ph, label,
      gauge + marker + panel(0, s.keep, 'orange', 1400) + panel(pw + 32, s.consolidate, 'purple', 1600),
      'repo-decision')}`;
  };

  const topology = (s) => {
    const W = 1440;
    const H = 470;
    const tree = s.tree.map(([path, note, hot], i) => {
      const y = 104 + i * 34;
      return svg.text(32, y, path, { cls: `tp-tree${hot ? ' tp-hot' : ''}`, anchor: 'start' }) +
        (note ? svg.text(262, y, note, { cls: 't-xs', anchor: 'start' }) : '');
    }).join('');
    const workspace = svg.enter(svg.g(
      svg.rect(0, 0, 450, H, { cls: 'box', r: 18 }) +
      svg.rect(0, 0, 450, 6, { cls: 'card-top', r: 3 }) +
      svg.text(32, 46, 'ONE PRODUCT WORKSPACE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      tree, { cls: 'z-local' }), 200);

    const bx = 482;
    const bw = 470;
    const node = (x, y, name, z) => svg.g(
      svg.rect(x, y, 170, 52, { cls: 'zone', r: 12 }) +
      svg.text(x + 85, y + 33, name, { cls: 'tp-node z-text' }), { cls: `z-${z}` });
    const lx = bx + 50;
    const rx = bx + bw - 220;
    const boundary = svg.enter(
      svg.rect(bx, 0, bw, H, { cls: 'box', r: 18 }) +
      svg.text(bx + 32, 46, 'ENFORCED BOUNDARY', { cls: 't-xs t-mono', anchor: 'start' }) +
      node(lx, 80, 'apps/web', 'github') + node(rx, 80, 'libs/data', 'github') +
      node(lx, 214, 'libs/auth', 'local') + node(rx, 214, 'libs/payments', 'local') +
      svg.g(svg.trace(`M${lx + 85} 136L${lx + 85} 208`, { cls: 'wire z-stroke tp-edge', at: 700, dur: 400 }) +
        svg.text(lx + 100, 178, '✓ allowed', { cls: 't-xs z-text', anchor: 'start' }), { cls: 'z-green' }) +
      svg.g(svg.trace(`M${rx + 85} 136L${rx + 85} 208`, { cls: 'wire dashed z-stroke tp-edge', at: 1000, dur: 400 }) +
        svg.text(rx + 100, 178, '✕ blocked', { cls: 't-xs z-text', anchor: 'start' }), { cls: 'z-orange' }), 400) +
      svg.enter(svg.g(
        svg.rect(bx + 28, 296, bw - 56, 146, { cls: 'zone', r: 12 }) +
        s.lint.map((line, i) => svg.text(bx + 52, 330 + i * 30, line, { cls: `tp-lint${i === 0 ? ' z-text' : ''}`, anchor: 'start' })).join(''),
        { cls: 'z-orange' }), 1300);

    const cx = bx + bw + 32;
    const cw = W - cx;
    const plane = svg.enter(svg.g(
      svg.rect(cx, 0, cw, H, { cls: 'box', r: 18 }) +
      svg.rect(cx, 0, cw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(cx + 32, 46, 'SEPARATE CONTROL PLANE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(cx + 32, 74, 'when isolation earns its cost', { cls: 't-xs', anchor: 'start' }) +
      s.plane.map(([title, detail], i) => {
        const y = 104 + i * 88;
        return svg.rect(cx + 28, y, cw - 56, 72, { cls: 'zone', r: 12 }) +
          svg.text(cx + 52, y + 31, title, { cls: 't-sm z-text', anchor: 'start' }) +
          svg.text(cx + 52, y + 56, detail, { cls: 't-xs', anchor: 'start' });
      }).join('') +
      svg.text(cx + cw / 2, 104 + s.plane.length * 88 + 34, s.planeNote, { cls: 't-xs' }),
      { cls: 'z-purple' }), 1700);

    const label = `Workspace tree: ${s.tree.map(([p, n]) => `${p.replace(/[├└─\s]+/g, ' ').trim()}${n ? ` (${n})` : ''}`).join(', ')}. Enforced boundary: apps/web may import libs/auth; libs/data importing libs/payments is blocked. Lint output: ${s.lint.join(' ')}. Separate control plane: ${s.plane.map((p) => p.join(', ')).join('; ')}. ${s.planeNote}.`;
    return `${html.head(s)}${svg.scene(W, H, label, workspace + boundary + plane, 'topology')}`;
  };

  const polyrepoStrategies = (s) => {
    const W = 1440;
    const rowH = 92;
    const gap = 12;
    const top = 34;
    const lw = 340;
    const rx = lw + 64;
    const header =
      svg.text(0, 18, s.leftLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(rx, 18, s.rightLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(W - 24, 18, s.toolLabel, { cls: 't-xs t-mono', anchor: 'end' });
    const rows = s.rows.map((r, i) => {
      const y = top + i * (rowH + gap);
      const at = 300 + i * 260;
      let cy = y + (rowH - (r.tools.length * 30 + (r.tools.length - 1) * 8)) / 2;
      const tools = r.tools.map((t) => {
        const probe = svg.chip(0, 0, t, { size: 15, h: 30, pad: 14 });
        const chip = svg.chip(W - 24 - probe.w, cy, t, { z: 'github', size: 15, h: 30, pad: 14, cls: 'pr-tool' });
        cy += 38;
        return chip.markup;
      }).join('');
      return svg.enter(
        svg.g(svg.rect(0, y, lw, rowH, { cls: 'zone', r: 14 }) +
          svg.text(24, y + 38, r.gives, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
          svg.text(24, y + 66, r.givesDetail, { cls: 't-xs', anchor: 'start' }), { cls: 'z-local' }) +
        svg.trace(`M${lw + 12} ${y + rowH / 2}L${rx - 14} ${y + rowH / 2}`, { cls: 'wire link', at: at + 150, dur: 250 }) +
        svg.path(`M${rx - 24} ${y + rowH / 2 - 8}L${rx - 12} ${y + rowH / 2}L${rx - 24} ${y + rowH / 2 + 8}`, { cls: 'wire link' }) +
        svg.g(svg.rect(rx, y, W - rx, rowH, { cls: 'box', r: 14 }) +
          svg.text(rx + 28, y + 40, r.strategy, { cls: 'rd-item', anchor: 'start' }) +
          svg.text(rx + 28, y + 68, r.detail, { cls: 't-xs', anchor: 'start' }) + tools, { cls: 'z-purple' }),
        at);
    }).join('');
    const sy = top + s.rows.length * (rowH + gap) + 8;
    const cost = svg.enter(svg.g(
      svg.rect(0, sy, W, 64, { cls: 'zone', r: 14 }) +
      svg.text(28, sy + 39, s.cost.label, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(170, sy + 39, s.cost.text, { cls: 't-sm', anchor: 'start' }),
      { cls: 'z-orange' }), 1500);
    const label = `${s.title}. ${s.rows.map((r) => `${r.gives} (${r.givesDetail}): ${r.strategy}. ${r.detail}. Tools: ${r.tools.join(', ')}`).join('. ')}. ${s.cost.label}: ${s.cost.text}`;
    return `${html.head(s)}${svg.scene(W, sy + 64, label, header + rows + cost, 'polyrepo-strategies')}`;
  };

  const issueContract = (s) => {
    const W = 1440;
    const iw = 820;
    const lineH = 24;
    let y = 96;
    const blocks = s.sections.map((sec) => {
      const h = 30 + sec.lines.length * lineH + 10;
      const b = { ...sec, y, h };
      y += h + 8;
      return b;
    });
    const H = y + 4;
    const state = svg.chip(28, 22, s.issue.state, { z: 'green', size: 15, h: 30, pad: 12 });
    const issue = svg.enter(
      svg.rect(0, 0, iw, H, { cls: 'box', r: 18 }) + state.markup +
      svg.text(28 + state.w + 16, 46, s.issue.title, { cls: 'ic-title', anchor: 'start' }) +
      svg.text(28, 78, s.issue.meta, { cls: 't-xs t-mono', anchor: 'start' }), 200);
    const sections = blocks.map((b, i) => svg.enter(svg.g(
      svg.rect(24, b.y, iw - 48, b.h, { cls: 'box soft', r: 10 }) +
      svg.rect(24, b.y, 5, b.h, { cls: 'card-top', r: 2 }) +
      svg.text(48, b.y + 26, `## ${b.heading}`, { cls: 'ic-head z-text', anchor: 'start' }) +
      b.lines.map((l, j) => svg.text(48, b.y + 26 + lineH * (j + 1), l, { cls: 'ic-line', anchor: 'start' })).join(''),
      { cls: `z-${b.z}` }), 500 + i * 380)).join('');
    const notes = blocks.map((b, i) => svg.g(
      svg.trace(`M${iw - 24} ${b.y + b.h / 2}L${iw + 40} ${b.y + b.h / 2}`, { cls: 'wire z-stroke', at: 700 + i * 380, dur: 250 }) +
      svg.enter(svg.rect(iw + 40, b.y, W - iw - 40, b.h, { cls: 'zone', r: 12 }) +
        svg.text(iw + 64, b.y + b.h / 2 - 4, b.role, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.text(iw + 64, b.y + b.h / 2 + 20, b.why, { cls: 't-xs', anchor: 'start' }), 800 + i * 380),
      { cls: `z-${b.z}` })).join('');
    const label = `Illustrative issue: ${s.issue.title}. ${s.issue.meta}. ${blocks.map((b) => `${b.heading}: ${b.lines.join(' ')} — ${b.role}: ${b.why}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, issue + sections + notes, 'issue-contract')}`;
  };

  const prEvidence = (s) => {
    const W = 1440;
    const pw = 820;
    const H = 490;
    const badge = (x, y, n, at) => svg.pop(svg.g(
      svg.circle(x, y, 15, { cls: 'pe-badge' }) +
      svg.text(x, y + 6, String(n), { cls: 'pe-num' }), { cls: 'z-purple' }), at);
    const session = svg.chip(0, 0, s.pr.session, { size: 15, h: 30, pad: 14 });
    const draft = svg.chip(28, 58, 'Open', { z: 'green', size: 14, h: 26, pad: 10 });
    const tabs = ['Conversation', 'Commits', 'Checks', 'Files changed'];
    let tx = 28;
    const tabMarkup = tabs.map((t) => {
      const m = svg.text(tx, 116, t, { cls: `t-xs t-mono${t === 'Conversation' ? ' pe-tab-on' : ''}`, anchor: 'start' });
      tx += t.length * 9 + 34;
      return m;
    }).join('');
    const filesX = 28 + tabs.slice(0, 3).reduce((n, t) => n + t.length * 9 + 34, 0) + 'Files changed'.length * 9 + 22;
    const checks = s.pr.checks.map(([name, ok], i) => {
      const cy = 330 + i * 26;
      return svg.g(
        svg.text(52, cy, ok ? '✓' : '●', { cls: 'pe-mark z-text' }) +
        svg.text(76, cy, name, { cls: 'pe-check', anchor: 'start' }) +
        svg.text(pw - 48, cy, ok ? 'Required' : 'Waiting', { cls: 't-xs', anchor: 'end' }),
        { cls: ok ? 'z-green' : 'z-orange' });
    }).join('');
    const pr = svg.enter(
      svg.rect(0, 0, pw, H, { cls: 'box', r: 18 }) +
      svg.text(28, 42, s.pr.title, { cls: 'ic-title', anchor: 'start' }) +
      draft.markup +
      svg.text(28 + draft.w + 12, 77, s.pr.branch, { cls: 't-xs t-mono', anchor: 'start' }) +
      tabMarkup +
      svg.path(`M24 130L${pw - 24} 130`, { cls: 'wire faint' }) +
      svg.rect(24, 144, pw - 48, 74, { cls: 'box soft', r: 10 }) +
      svg.text(48, 172, s.pr.closes, { cls: 't-sm', anchor: 'start' }) +
      svg.text(48, 200, s.pr.summary, { cls: 't-xs', anchor: 'start' }) +
      svg.chip(pw - 48 - session.w, 166, s.pr.session, { z: 'purple', size: 15, h: 30, pad: 14 }).markup +
      svg.text(48, 248, s.pr.review, { cls: 't-xs', anchor: 'start' }) +
      svg.g(svg.rect(24, 266, pw - 48, H - 284, { cls: 'zone', r: 12 }) +
        svg.text(48, 296, 'MERGE BOX · REQUIRED CHECKS', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-github' }) +
      checks, 200);
    const badges =
      badge(30, 172, 1, 1000) + badge(pw - 52 - session.w, 181, 2, 1400) +
      badge(30, 290, 3, 1800) + badge(filesX, 110, 4, 2200);
    const sx = pw + 40;
    const sw = W - sx;
    const sh = 110;
    const steps = s.steps.map((st, i) => {
      const y0 = i * (sh + 16);
      const where = svg.chip(0, 0, st.where, { size: 14, h: 28, pad: 12 });
      return svg.enter(
        svg.rect(sx, y0, sw, sh, { cls: 'box', r: 14 }) +
        svg.g(svg.circle(sx + 34, y0 + 34, 15, { cls: 'pe-badge' }) +
          svg.text(sx + 34, y0 + 40, String(i + 1), { cls: 'pe-num' }), { cls: 'z-purple' }) +
        svg.text(sx + 62, y0 + 41, st.title, { cls: 'rd-item', anchor: 'start' }) +
        svg.chip(W - 20 - where.w, y0 + 18, st.where, { z: 'github', size: 14, h: 28, pad: 12 }).markup +
        st.detail.map((d, j) => svg.text(sx + 62, y0 + 70 + j * 22, d, { cls: 't-xs', anchor: 'start' })).join(''),
        1000 + i * 400);
    }).join('');
    const label = `Illustrative pull request opened by Copilot: ${s.pr.title}. ${s.pr.closes}. ${s.pr.session}. ${s.pr.review}. Checks: ${s.pr.checks.map(([n, ok]) => `${n} ${ok ? 'passed' : 'waiting'}`).join(', ')}. Reading order: ${s.steps.map((st, i) => `${i + 1}. ${st.title} (${st.where}): ${st.detail.join(' ')}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, pr + badges + steps, 'pr-evidence')}`;
  };

  const gateSort = (s) => {
    const W = 1440;
    const gap = 24;
    const LH = 430;
    const count = (l) => l.gates ? l.gates.length : l.groups.reduce((n, g) => n + g.gates.length, 0);
    let x = 0;
    const lanes = s.lanes.map((l, i) => {
      const lx = x;
      const lw = l.w;
      x += lw + gap;
      const at = 300 + i * 700;
      let body = '';
      if (l.gates) {
        const rows = Math.ceil(l.gates.length / 2);
        body = l.gates.map((g, j) => svg.enter(
          svg.text(lx + 28 + Math.floor(j / rows) * 300, 160 + (j % rows) * 28, `✓ ${g}`, { cls: 'gs-item', anchor: 'start' }), at + 200 + j * 60)).join('');
      } else {
        let y = 160;
        body = l.groups.map((g, k) => {
          const lines = svg.text(lx + 28, y, g.cp, { cls: 'gs-item gs-cp', anchor: 'start' }) +
            g.gates.map((gt, j) => svg.text(lx + 48, y + 28 * (j + 1), gt, { cls: 'gs-item gs-sub', anchor: 'start' })).join('');
          y += 28 * (g.gates.length + 1) + 18;
          return svg.enter(lines, at + 200 + k * 300);
        }).join('');
      }
      return svg.enter(svg.g(
        svg.rect(lx, 0, lw, LH, { cls: 'box', r: 18 }) +
        svg.rect(lx, 0, lw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(lx + 28, 36, `${l.label} · ${count(l)} GATES`, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(lx + 28, 66, l.question, { cls: 'gs-q', anchor: 'start' }) +
        svg.chip(lx + 28, 80, l.mechanism, { z: l.z, size: 15, h: 28, pad: 12 }).markup +
        svg.path(`M${lx + 28} 124L${lx + lw - 28} 124`, { cls: 'wire faint' }) +
        body +
        svg.enter(svg.rect(lx + 20, LH - 56, lw - 40, 40, { cls: 'zone', r: 12 }) +
          svg.text(lx + lw / 2, LH - 30, l.result, { cls: 't-sm z-text' }), at + 1100),
        { cls: `z-${l.z}` }), at);
    }).join('');
    const total = s.lanes.reduce((n, l) => n + count(l), 0);
    const SY = LH + 20;
    const SH = 72;
    const lead = 210;
    const cw = (W - lead - 20) / s.checkpoints.length;
    const strip = svg.enter(
      svg.rect(0, SY, W, SH, { cls: 'box soft', r: 14 }) +
      svg.text(24, SY + 31, `${total} GATES →`, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(24, SY + 53, `${s.checkpoints.length} CHECKPOINTS`, { cls: 't-xs t-mono', anchor: 'start' }) +
      s.checkpoints.map((c, i) => {
        const cx = lead + i * cw;
        return svg.g(
          svg.circle(cx + 18, SY + SH / 2, 16, { cls: 'pe-badge' }) +
          svg.text(cx + 18, SY + SH / 2 + 6, String(i + 1), { cls: 'pe-num' }) +
          svg.text(cx + 46, SY + 31, c.name, { cls: 'gs-q', anchor: 'start' }) +
          svg.text(cx + 46, SY + 54, c.who, { cls: 't-xs', anchor: 'start' }),
          { cls: `z-${c.z}` });
      }).join(''), 2900);
    const gatesOf = (l) => l.gates ? l.gates.join('; ') : l.groups.map((g) => `${g.cp}: ${g.gates.join('; ')}`).join('. ');
    const label = `${total} illustrative manual gates sorted. ${s.lanes.map((l) => `${l.label}, ${count(l)} gates. ${l.question} Mechanism: ${l.mechanism}. Gates: ${gatesOf(l)}. Result: ${l.result}`).join('. ')}. The four human checkpoints: ${s.checkpoints.map((c, i) => `${i + 1}. ${c.name}, ${c.who}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, SY + SH, label, lanes + strip, 'gate-sort')}`;
  };
  const contextReview = (s) => {
    const W = 1440;
    const gap = 24;
    const pw = (W - gap) / 2;
    const DH = 104;
    const diff = svg.enter(
      svg.rect(0, 0, W, DH, { cls: 'box', r: 16 }) +
      svg.text(28, 30, s.diff.label, { cls: 't-xs t-mono', anchor: 'start' }) +
      s.diff.lines.map((l, i) =>
        svg.text(28, 62 + i * 28, l.at, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(300, 62 + i * 28, l.code, { cls: 'cr-code', anchor: 'start' })).join(''), 300);
    const PY = DH + 20;
    const PH = 310;
    const panel = (p, x, z, body, at) => svg.enter(svg.g(
      svg.rect(x, PY, pw, PH, { cls: 'box', r: 18 }) +
      svg.rect(x, PY, pw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(x + 28, PY + 34, p.label, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(x + pw - 28, PY + 34, p.where, { cls: 't-xs', anchor: 'end' }) +
      svg.rect(x + 24, PY + 48, pw - 48, 62, { cls: 'box soft', r: 10 }) +
      svg.text(x + 44, PY + 72, p.file, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(x + 44, PY + 98, p.cmd, { cls: 'cr-code', anchor: 'start' }) +
      body +
      svg.enter(svg.rect(x + 20, PY + PH - 52, pw - 40, 38, { cls: 'zone', r: 12 }) +
        svg.text(x + pw / 2, PY + PH - 27, p.result, { cls: 't-sm z-text' }), at + 1100),
      { cls: `z-${z}` }), at);
    const hits = s.rule.hits.map((h, i) => {
      const y = PY + 152 + i * 46;
      const chip = svg.chip(0, 0, h.verdict, { z: h.z, size: 15, h: 30, pad: 12 });
      return svg.enter(
        svg.text(44, y, `✕ ${h.at}`, { cls: 'cr-code', anchor: 'start' }) +
        svg.chip(pw - 44 - chip.w, y - 21, h.verdict, { z: h.z, size: 15, h: 30, pad: 12 }).markup, 1300 + i * 250);
    }).join('');
    const rx = pw + gap;
    const c = s.copilot.comment;
    const comment = svg.enter(
      svg.text(rx + 44, PY + 148, s.copilot.quiet, { cls: 't-xs', anchor: 'start' }) +
      svg.g(
        svg.rect(rx + 24, PY + 164, pw - 48, 78, { cls: 'zone', r: 12 }) +
        svg.text(rx + 44, PY + 186, c.at, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        c.text.map((t, j) => svg.text(rx + 44, PY + 210 + j * 22, t, { cls: 't-sm', anchor: 'start' })).join(''),
        { cls: 'z-purple' }), 2300);
    const OY = PY + PH + 20;
    const OH = 64;
    let cx = 250;
    const chips = s.owner.choices.map((t, i) => {
      const chip = svg.chip(cx, OY + 17, t, { z: 'orange', size: 16, h: 30, pad: 16 });
      cx += chip.w + 12;
      return svg.pop(chip.markup, 2900 + i * 120);
    }).join('');
    const owner = svg.enter(svg.g(
      svg.rect(0, OY, W, OH, { cls: 'zone', r: 14 }) +
      svg.text(28, OY + 38, 'THE OWNER DECIDES', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(W - 28, OY + 38, s.owner.note, { cls: 't-xs', anchor: 'end' }),
      { cls: 'z-orange' }), 2700) + chips;
    const label = `Same diff, two reviewers. ${s.diff.lines.map((l) => `${l.at}: ${l.code}`).join('; ')}. ${s.rule.label}, ${s.rule.where}, ${s.rule.file}: ${s.rule.cmd}. Findings: ${s.rule.hits.map((h) => `${h.at}, ${h.verdict}`).join('; ')}. ${s.rule.result}. ${s.copilot.label}, ${s.copilot.where}, ${s.copilot.file}: ${s.copilot.cmd}. Comment on ${c.at}: ${c.text.join(' ')} ${s.copilot.quiet}. ${s.copilot.result}. The owner decides: ${s.owner.choices.join(', ')}. ${s.owner.note}`;
    return `${html.head(s)}${svg.scene(W, OY + OH, label,
      diff + panel(s.rule, 0, 'github', hits, 900) + panel(s.copilot, rx, 'purple', comment, 1800) + owner, 'context-review')}`;
  };
  const codeOwners = (s) => {
    const W = 1440;
    const fw = 470;
    const H1 = 330;
    const file = svg.enter(svg.g(
      svg.rect(0, 0, fw, H1, { cls: 'box', r: 18 }) +
      svg.rect(0, 0, fw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(28, 42, '.github/CODEOWNERS', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      s.rules.map(([path, owner, hot], i) => {
        const y = 88 + i * 38;
        return svg.text(28, y, path, { cls: `co-line${hot ? ' co-hot' : ''}`, anchor: 'start' }) +
          svg.text(fw - 28, y, owner, { cls: `co-line${hot ? ' co-hot' : ''}`, anchor: 'end' });
      }).join(''),
      { cls: 'z-local' }), 200);
    const px = fw + 32;
    const pw = W - px;
    const routes = svg.enter(
      svg.rect(px, 0, pw, 206, { cls: 'box', r: 18 }) +
      svg.text(px + 28, 38, s.prLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
      s.files.map(([path, owner], i) => {
        const y = 56 + i * 48;
        const at = 800 + i * 350;
        return svg.g(svg.rect(px + 24, y, 360, 38, { cls: 'zone', r: 10 }) +
          svg.text(px + 44, y + 25, path, { cls: 'co-file z-text', anchor: 'start' }), { cls: 'z-github' }) +
          svg.trace(`M${px + 396} ${y + 19}L${px + 470} ${y + 19}`, { cls: 'wire link', at, dur: 250 }) +
          svg.pop(svg.chip(px + 484, y + 3, owner, { z: 'orange', size: 16, h: 32, pad: 16 }).markup, at + 200) +
          svg.enter(svg.text(W - 28, y + 25, 'requested when the PR opens', { cls: 't-xs', anchor: 'end' }), at + 300);
      }).join(''), 500);
    const rules = svg.enter(svg.g(
      svg.rect(px, 224, pw, 106, { cls: 'zone', r: 14 }) +
      svg.text(px + 28, 256, s.rulesetLabel, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      s.ruleset.map((r, i) => svg.text(px + 28 + (i % 2) * 450, 288 + Math.floor(i / 2) * 28, `✓ ${r}`, { cls: 't-xs co-rule', anchor: 'start' })).join(''),
      { cls: 'z-github' }), 2000);
    const bw = (W - 48) / 3;
    const why = s.why.map(([title, detail], i) => svg.enter(svg.g(
      svg.rect(i * (bw + 24), H1 + 24, bw, 100, { cls: 'zone', r: 14 }) +
      svg.text(i * (bw + 24) + 28, H1 + 62, title, { cls: 'rd-item z-text', anchor: 'start' }) +
      svg.text(i * (bw + 24) + 28, H1 + 92, detail, { cls: 't-xs', anchor: 'start' }),
      { cls: 'z-green' }), 2400 + i * 200)).join('');
    const label = `CODEOWNERS file: ${s.rules.map(([p, o]) => `${p} ${o}`).join('; ')}. ${s.prLabel}: ${s.files.map(([f, o]) => `${f} requests ${o}`).join('; ')}. ${s.rulesetLabel}: ${s.ruleset.join('; ')}. Why it is faster: ${s.why.map(([t, d]) => `${t}, ${d}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, H1 + 124, label, file + routes + rules + why, 'code-owners')}`;
  };

  const todayPlan = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - 2 * gap) / 3;
    const top = 24;
    const cardH = 370;
    const body = s.horizons.map((h, i) => {
      const x = i * (cw + gap);
      const z = h.z || ['green', 'local', 'purple'][i];
      const lines = h.items.map((item, j) => {
        const yy = top + 130 + j * 72;
        return svg.circle(x + 38, yy - 8, 8, { cls: 'focus-ring' }) +
          svg.lines(x + 70, yy, item, { cls: 't-sm', anchor: 'start', max: 33, lh: 23 });
      }).join('');
      return svg.g(
        svg.rect(x, top, cw, cardH, { cls: 'box', r: 18 }) +
        svg.rect(x, top, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 28, top + 54, `${String(i + 1).padStart(2, '0')} · ${h.label}`, { cls: 't-lg z-text', anchor: 'start' }) +
        lines,
        { cls: `z-${z}` });
    }).join('');
    return `${html.head(s)}${svg.scene(W, 420,
      `${s.title}. ${s.horizons.map((h) => `${h.label}: ${h.items.join('; ')}`).join('. ')}. These are proposed actions, not completed tasks. ${s.takeaway}`,
      body, 'today-plan')}<p class="takeaway"><span class="k">🔑 Transfer</span>${window.Kit.esc(s.takeaway)}</p>`;
  };

  const ciStages = (s) => {
    const W = 1440;
    const gap = 24;
    const cw = (W - gap * 2) / 3;
    const CH = 420;
    const cards = s.stages.map((st, i) => {
      const x = i * (cw + gap);
      const at = 300 + i * 600;
      const checks = st.checks.map((c, j) => svg.enter(
        svg.text(x + 28, 238 + j * 32, `✓ ${c}`, { cls: 'gs-item', anchor: 'start' }), at + 300 + j * 90)).join('');
      return svg.enter(svg.g(
        svg.rect(x, 0, cw, CH, { cls: 'box', r: 18 }) +
        svg.rect(x, 0, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 28, 40, `STAGE ${i + 1} · ${st.when}`, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + 28, 104, st.budget, { cls: 'cs-budget', anchor: 'start' }) +
        svg.text(x + cw - 28, 104, 'proposed budget', { cls: 't-xs', anchor: 'end' }) +
        svg.text(x + 28, 148, 'WHO WAITS', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + 28, 176, st.waiter, { cls: 'gs-q', anchor: 'start' }) +
        svg.path(`M${x + 28} 200L${x + cw - 28} 200`, { cls: 'wire faint' }) +
        checks +
        svg.enter(svg.rect(x + 20, CH - 60, cw - 40, 44, { cls: 'zone', r: 12 }) +
          svg.text(x + cw / 2, CH - 32, st.fail, { cls: 't-sm z-text' }), at + 900),
        { cls: `z-${st.z}` }), at);
    }).join('');
    const SY = CH + 20;
    const strip = svg.enter(svg.rect(0, SY, W, 56, { cls: 'box soft', r: 14 }) +
      svg.text(W / 2, SY + 35, s.note, { cls: 't-sm' }), 2400);
    const label = `Three CI stages. ${s.stages.map((st, i) => `Stage ${i + 1}, ${st.when}, proposed budget ${st.budget}. Who waits: ${st.waiter}. Runs: ${st.checks.join(', ')}. On failure: ${st.fail}.`).join(' ')} ${s.note}`;
    return `${html.head(s)}${svg.scene(W, SY + 56, label, cards + strip, 'ci-stages')}`;
  };
  const ciClock = (s) => {
    const W = 1440;
    const x0 = 230;
    const k = (W - x0 - 60) / s.max;
    const X = (m) => x0 + m * k;
    const legend = svg.enter(
      svg.g(svg.rect(x0, 0, 18, 18, { cls: 'card-top', r: 4 }) +
        svg.text(x0 + 28, 15, s.legend.agent, { cls: 't-xs', anchor: 'start' }), { cls: 'z-purple' }) +
      svg.g(svg.rect(x0 + 300, 0, 18, 18, { cls: 'zone', r: 4 }) +
        svg.text(x0 + 328, 15, s.legend.ci, { cls: 't-xs', anchor: 'start' }), { cls: 'z-github' }), 200);
    const BH = 50;
    const totals = [];
    const lanes = s.lanes.map((l, i) => {
      const y = 48 + i * 104;
      let m = 0;
      let segs = '';
      for (let r = 0; r < s.rounds; r += 1) {
        segs += svg.enter(svg.g(svg.rect(X(m), y, s.agent * k, BH, { cls: 'card-top', r: 4 }), { cls: 'z-purple' }), 500 + m * 9);
        m += s.agent;
        const w = l.ci * k;
        segs += svg.enter(svg.g(svg.rect(X(m) + 2, y, w - 4, BH, { cls: 'zone', r: 6 }) +
          (w > 120 ? svg.text(X(m) + w / 2, y + 31, `CI · ${l.ci} min`, { cls: 't-xs z-text' }) : ''), { cls: 'z-github' }), 500 + m * 9);
        m += l.ci;
      }
      totals.push(m);
      return svg.text(0, y + 22, l.label, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(0, y + 46, `${s.rounds} fix-and-push rounds`, { cls: 't-xs', anchor: 'start' }) +
        segs +
        svg.enter(svg.text(X(m) + 14, y + 33, `${m} min`, { cls: 'cs-total', anchor: 'start' }), 500 + m * 9);
    }).join('');
    const fastY = 48 + 104;
    const saved = totals[0] - totals[1];
    const gain = svg.enter(svg.g(
      svg.text(X(totals[1]) + 110, fastY + 33, `Same ${s.rounds} rounds, ${saved} minutes sooner`, { cls: 't-sm z-text', anchor: 'start' }),
      { cls: 'z-green' }), 3000);
    const AY = fastY + BH + 30;
    const ticks = [];
    for (let m = 0; m <= s.max; m += 60) ticks.push(m);
    const axis = svg.path(`M${x0} ${AY}L${X(s.max)} ${AY}`, { cls: 'wire faint' }) +
      ticks.map((m) => svg.path(`M${X(m)} ${AY - 6}L${X(m)} ${AY + 6}`, { cls: 'wire faint' }) +
        svg.text(X(m), AY + 26, m === 0 ? '0' : `${m / 60} h`, { cls: 't-xs' })).join('');
    const CY = AY + 58;
    const CH = 130;
    const gap = 24;
    const cw = (W - gap * 2) / 3;
    const cards = s.waiters.map((wt, i) => {
      const x = i * (cw + gap);
      return svg.enter(svg.g(
        svg.rect(x, CY, cw, CH, { cls: 'box', r: 16 }) +
        svg.rect(x, CY + 20, 4, CH - 40, { cls: 'card-edge', r: 2 }) +
        svg.text(x + 28, CY + 48, wt.who, { cls: 'gs-q', anchor: 'start' }) +
        svg.text(x + 28, CY + 86, wt.detail, { cls: 't-sm', anchor: 'start' }),
        { cls: 'z-github' }), 3300 + i * 200);
    }).join('');
    const SY = CY + CH + 20;
    const strip = svg.enter(svg.g(svg.rect(0, SY, W, 56, { cls: 'zone', r: 14 }) +
      svg.text(W / 2, SY + 35, s.point, { cls: 't-sm z-text' }), { cls: 'z-orange' }), 4000);
    const label = `Illustrative timeline. ${s.rounds} fix-and-push rounds with ${s.agent} minutes of agent work each. ${s.lanes.map((l, i) => `${l.label}: ${totals[i]} minutes total`).join('; ')}. Same rounds, ${saved} minutes sooner. ${s.waiters.map((wt) => `${wt.who}: ${wt.detail}`).join('. ')}. ${s.point}`;
    return `${html.head(s)}${svg.scene(W, SY + 56, label, legend + lanes + gain + axis + cards + strip, 'ci-clock')}`;
  };
  const affectedGraph = (s) => {
    const W = 1440;
    const GW = 860;
    const H = 420;
    const NW = 180;
    const NH = 48;
    const pos = Object.fromEntries(s.nodes.map((n) => [n.id, n]));
    const state = (id) => id === s.changed ? 'changed' : s.affected.includes(id) ? 'affected' : 'skipped';
    const hot = (a, b) => state(a) !== 'skipped' && state(b) !== 'skipped';
    const edges = s.edges.map(([a, b]) => {
      const p = pos[a];
      const q = pos[b];
      return hot(a, b)
        ? svg.trace(`M${q.x} ${q.y - NH / 2}L${p.x} ${p.y + NH / 2}`, { cls: 'wire link', at: 1300, dur: 500 })
        : svg.path(`M${p.x} ${p.y + NH / 2}L${q.x} ${q.y - NH / 2}`,         { cls: 'wire' });
            }).join('');
            const nodes = s.nodes.map((n) => {
      const st = state(n.id);
      const x = n.x - NW / 2;
      const y = n.y - NH / 2;
      if (st === 'changed') {
        return svg.pop(svg.g(svg.rect(x, y, NW, NH, { cls: 'card-top', r: 12 }) +
          svg.text(n.x, n.y + 6, n.id, { cls: 'ag-node ag-on' }), { cls: 'z-purple' }), 900);
      }
      if (st === 'affected') {
        return svg.enter(svg.g(svg.rect(x, y, NW, NH, { cls: 'zone ag-ring', r: 12 }) +
          svg.text(n.x, n.y + 6, n.id, { cls: 'ag-node z-text' }), { cls: 'z-purple' }), 1700);
      }
      return svg.rect(x, y, NW, NH, { cls: 'box', r: 12 }) +
        svg.text(n.x, n.y + 6, n.id, { cls: 'ag-node ag-off' });
    }).join('');
    const key = [['changed', 'card-top', 'Changed'], ['affected', 'zone ag-ring', 'Depends on the change'], ['skipped', 'box', 'Not affected: skipped']];
    let lx = 40;
    const legend = key.map(([, cls, text]) => {
      const m = svg.g(svg.rect(lx, H - 40, 18, 18, { cls, r: 4 }) +
        svg.text(lx + 28, H - 25, text, { cls: 't-xs', anchor: 'start' }), { cls: 'z-purple' });
      lx += 60 + text.length * 8.4;
      return m;
    }).join('');
    const graph = svg.enter(
      svg.rect(0, 0, GW, H, { cls: 'box', r: 18 }) +
      svg.text(28, 38, s.graphLabel, { cls: 't-xs t-mono', anchor: 'start' }) +
      edges + nodes + legend, 200);
    const px = GW + 24;
    const pw = W - px;
    const runs = s.runs.map(([id, why], j) => svg.enter(
      svg.text(px + 28, 206 + j * 28, `✓ ${id}`, { cls: 'cr-code', anchor: 'start' }) +
      svg.text(px + pw - 28, 206 + j * 28, why, { cls: 't-xs', anchor: 'end' }), 2000 + j * 150)).join('');
    const panel = svg.enter(svg.g(
      svg.rect(px, 0, pw, H, { cls: 'box', r: 18 }) +
      svg.rect(px, 0, pw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(px + 28, 38, s.stepLabel, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.rect(px + 24, 56, pw - 48, 84, { cls: 'box soft', r: 10 }) +
      s.cmd.map((c, j) => svg.text(px + 44 + (c.length - c.trimStart().length) * 9.6, 90 + j * 30, c.trim(), { cls: 'cr-code', anchor: 'start' })).join('') +
      svg.text(px + 28, 176, `RUNS · ${s.runs.length} PROJECTS`, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      runs +
      svg.enter(svg.text(px + 28, 302, `SKIPS · ${s.skips.length} PROJECTS`, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(px + 28, 330, s.skips.join(', '), { cls: 'ag-node ag-off', anchor: 'start' }), 2500) +
      svg.enter(svg.g(svg.rect(px + 20, H - 62, pw - 40, 44, { cls: 'zone', r: 12 }) +
        svg.text(px + pw / 2, H - 34, s.result, { cls: 't-sm z-text' }), { cls: 'z-green' }), 2800),
      { cls: 'z-github' }), 600);
    const SY = H + 20;
    const strip = svg.enter(svg.g(svg.rect(0, SY, W, 56, { cls: 'zone', r: 14 }) +
      svg.text(W / 2, SY + 35, s.boundary, { cls: 't-sm z-text' }), { cls: 'z-orange' }), 3200);
    const label = `Project dependency graph. ${s.changed} changed. Dependencies: ${s.edges.map(([a, b]) => `${a} depends on ${b}`).join('; ')}. Affected: ${s.affected.join(', ')}. ${s.stepLabel}: ${s.cmd.join(' ')}. Runs: ${s.runs.map(([id, why]) => `${id}, ${why}`).join('; ')}. Skips: ${s.skips.join(', ')}. ${s.result}. ${s.boundary}`;
    return `${html.head(s)}${svg.scene(W, SY + 56, label, graph + panel + strip, 'affected-graph')}`;
  };
  const flakeAnatomy = (s) => {
    const W = 1440;
    const TH = 230;
    const lw = 700;
    const rx = lw + 24;
    const rw = W - rx;
    const runs = s.runs.map((r, j) => {
      const y = 116 + j * 40;
      const z = r.pass ? 'green' : 'orange';
      return svg.enter(
        svg.text(28, y, `Run ${j + 1}`, { cls: 't-sm', anchor: 'start' }) +
        svg.chip(110, y - 21, r.pass ? '✓ passed' : '✕ failed', { z, size: 15, h: 30, pad: 12 }).markup +
        svg.text(250, y, r.note, { cls: 'gs-item', anchor: 'start' }), 500 + j * 450);
    }).join('');
    const left = svg.enter(svg.g(
      svg.rect(0, 0, lw, TH, { cls: 'box', r: 18 }) +
      svg.rect(0, 0, lw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(28, 38, s.commit, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(28, 70, s.test, { cls: 'cr-code', anchor: 'start' }) +
      runs,
      { cls: 'z-github' }), 200);
    const causes = s.causes.map(([cause, fix], j) => svg.enter(
      svg.text(rx + 28, 76 + j * 32, cause, { cls: 'gs-item', anchor: 'start' }) +
      svg.text(rx + 300, 76 + j * 32, `→ ${fix}`, { cls: 'gs-item gs-sub', anchor: 'start' }), 1600 + j * 120)).join('');
    const right = svg.enter(svg.g(
      svg.rect(rx, 0, rw, TH, { cls: 'box', r: 18 }) +
      svg.rect(rx, 0, rw, 6, { cls: 'card-top', r: 3 }) +
      svg.text(rx + 28, 38, 'COMMON CAUSE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(rx + 300, 38, 'USUAL FIX', { cls: 't-xs t-mono', anchor: 'start' }) +
      causes,
      { cls: 'z-local' }), 1400);
    const MY = TH + 20;
    const MH = 100;
    const hurt = svg.enter(svg.g(
      svg.rect(0, MY, W, MH, { cls: 'zone', r: 16 }) +
      svg.text(28, MY + 34, s.hurtLabel, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      s.hurts.map((h, j) => svg.text(28 + j * 720, MY + 72, h, { cls: 't-sm', anchor: 'start' })).join(''),
      { cls: 'z-orange' }), 2400);
    const PY = MY + MH + 20;
    const PH = 126;
    const gap = 20;
    const pw = (W - gap * 3) / 4;
    const policy = s.policy.map((p, i) => {
      const x = i * (pw + gap);
      return svg.enter(svg.g(
        svg.rect(x, PY, pw, PH, { cls: 'box', r: 16 }) +
        svg.circle(x + 34, PY + 36, 16, { cls: 'pe-badge' }) +
        svg.text(x + 34, PY + 42, String(i + 1), { cls: 'pe-num' }) +
        svg.text(x + 62, PY + 43, p.step, { cls: 'gs-q', anchor: 'start' }) +
        p.lines.map((t, j) => svg.text(x + 24, PY + 80 + j * 26, t, { cls: 'gs-item', anchor: 'start' })).join(''),
        { cls: `z-${p.z}` }), 3000 + i * 200);
    }).join('');
    const label = `${s.commit}. ${s.test}. ${s.runs.map((r, j) => `Run ${j + 1}: ${r.pass ? 'passed' : 'failed'}, ${r.note}`).join('. ')}. Common causes and fixes: ${s.causes.map(([c, f]) => `${c}: ${f}`).join('; ')}. ${s.hurtLabel}: ${s.hurts.join(' ')} Flake policy: ${s.policy.map((p) => `${p.step}: ${p.lines.join(' ')}`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(W, PY + PH, label, left + right + hurt + policy, 'flake-anatomy')}`;
  };
  const opinionatedCi = (s) => {
    const W = 1440;
    const x0 = 290;
    const BH = 52;
    const bars = s.bars.map((b, i) => {
      const y = i * 80;
      let x = x0;
      const segs = b.segs.map(([text, w, z], j) => {
        const sx = x;
        x += w;
        return svg.enter(svg.g(svg.rect(sx + 2, y, w - 4, BH, { cls: z === 'github' ? 'card-top' : 'zone', r: 8 }) +
          svg.text(sx + w / 2, y + 32, text, { cls: z === 'github' ? 't-xs ag-on' : 't-xs z-text' }), { cls: `z-${z}` }), 300 + i * 900 + j * 250);
      }).join('');
      return svg.text(0, y + 24, b.label, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(0, y + 46, b.sub, { cls: 't-xs', anchor: 'start' }) +
        segs + (b.note ? svg.enter(svg.g(svg.text(x + 20, y + 33, b.note, { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-green' }), 2000) : '');
    }).join('');
    const cols = [0, 200, 600, 1040];
    const HY = 184;
    const head = s.head.map((h, j) => svg.text(cols[j] + 24, HY, h, { cls: 't-xs t-mono', anchor: 'start' })).join('');
    const rows = s.rows.map((r, i) => {
      const y = HY + 16 + i * 70;
      return svg.enter(
        svg.rect(0, y, W, 60, { cls: 'box', r: 12 }) +
        svg.text(cols[0] + 24, y + 37, r[0], { cls: 'gs-q', anchor: 'start' }) +
        svg.text(cols[1] + 24, y + 37, r[1], { cls: 'gs-item gs-sub', anchor: 'start' }) +
        svg.g(svg.text(cols[2] + 24, y + 37, r[2], { cls: 'oc-pick', anchor: 'start' }), { cls: 'z-purple' }) +
        svg.text(cols[3] + 24, y + 37, r[3], { cls: 'gs-item', anchor: 'start' }), 2300 + i * 250);
    }).join('');
    const SY = HY + 16 + s.rows.length * 70 + 10;
    const strip = svg.enter(svg.g(svg.rect(0, SY, W, 56, { cls: 'zone', r: 14 }) +
      svg.text(W / 2, SY + 35, s.point, { cls: 't-sm z-text' }), { cls: 'z-green' }), 3300);
    const label = `Two CI runs, conceptual lengths. ${s.bars.map((b) => `${b.label}: ${b.segs.map(([t]) => t).join(', then ')}`).join('. ')}. ${s.rows.map((r) => `${r[0]}: ${r[1]} versus ${r[2]}; ${r[3]}`).join('. ')}. ${s.point}`;
    return `${html.head(s)}${svg.scene(W, SY + 56, label, bars + head + rows + strip, 'opinionated-ci')}`;
  };
  const slsaProvenance = (s) => {
    const W = 1440;
    const NW = 256;
    const gap = 40;
    const NH = 150;
    const flow = s.flow.map((n, i) => {
      const x = i * (NW + gap);
      const at = 300 + i * 350;
      const arrow = i < s.flow.length - 1
        ? svg.trace(`M${x + NW + 6} ${NH / 2}L${x + NW + gap - 8} ${NH / 2}M${x + NW + gap - 16} ${NH / 2 - 8}L${x + NW + gap - 8} ${NH / 2}L${x + NW + gap - 16} ${NH / 2 + 8}`, { cls: 'wire link', at: at + 250, dur: 250 })
        : '';
      return svg.enter(svg.g(
        svg.rect(x, 0, NW, NH, { cls: 'box', r: 16 }) +
        svg.rect(x, 0, NW, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 22, 34, `${i + 1} · ${n.step}`, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + 22, 68, n.what, { cls: 'gs-q', anchor: 'start' }) +
        svg.text(x + 22, 98, n.mono, { cls: 'cr-code', anchor: 'start' }) +
        svg.text(x + 22, 128, n.sub, { cls: 't-xs', anchor: 'start' }),
        { cls: `z-${n.z}` }), at) + arrow;
    }).join('');
    const CY = NH + 20;
    const CH = 104;
    const cw = 860;
    const code = (c, x, w, z, at) => svg.enter(svg.g(
      svg.rect(x, CY, w, CH, { cls: 'box', r: 16 }) +
      svg.rect(x, CY + 18, 4, CH - 36, { cls: 'card-edge', r: 2 }) +
      svg.text(x + 28, CY + 32, c.label, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      c.lines.map((l, j) => svg.text(x + 28 + (l.length - l.trimStart().length) * 9.6, CY + 62 + j * 26, l.trim(), { cls: 'cr-code', anchor: 'start' })).join(''),
      { cls: `z-${z}` }), at);
    const codes = code(s.sign, 0, cw, 'purple', 2100) + code(s.verify, cw + 24, W - cw - 24, 'green', 2400);
    const BY = CY + CH + 20;
    const BH = 196;
    const bw = (W - 48) / 3;
    const col = (c, i, body) => {
      const x = i * (bw + 24);
      return svg.enter(svg.g(
        svg.rect(x, BY, bw, BH, { cls: 'box', r: 16 }) +
        svg.rect(x, BY, bw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 24, BY + 36, c.label, { cls: 't-xs t-mono z-text', anchor: 'start' }) + body(x),
        { cls: `z-${c.z}` }), 2800 + i * 250);
    };
    const list = (c) => (x) => c.items.map((t, j) => svg.text(x + 24, BY + 76 + j * 38, `${c.mark} ${t}`, { cls: 'gs-item', anchor: 'start' })).join('');
    const levels = (x) => s.levels.items.map(([lv, text, tag], j) => {
      const y = BY + 76 + j * 40;
      return svg.chip(x + 24, y - 21, lv, { z: 'purple', size: 15, h: 28, pad: 10 }).markup +
        svg.text(x + 76, y, text, { cls: 'gs-item', anchor: 'start' }) +
        (tag ? svg.text(x + bw - 24, y, tag, { cls: 't-xs z-text', anchor: 'end' }) : '');
    }).join('');
    const bottom = col(s.proves, 0, list(s.proves)) + col(s.scope, 1, list(s.scope)) + col(s.levels, 2, levels);
    const label = `Provenance flow. ${s.flow.map((n, i) => `${i + 1}. ${n.step}: ${n.what}, ${n.mono}, ${n.sub}`).join('. ')}. ${s.sign.label}: ${s.sign.lines.join(' ')}. ${s.verify.label}: ${s.verify.lines.join(' ')}. ${s.proves.label}: ${s.proves.items.join('; ')}. ${s.scope.label}: ${s.scope.items.join('; ')}. ${s.levels.label}: ${s.levels.items.map(([lv, t, tag]) => `${lv} ${t}${tag ? ` (${tag})` : ''}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, BY + BH, label, flow + codes + bottom, 'slsa-provenance')}`;
  };
  const phaseRoadmap = (s) => {
    const W = 1440;
    const RH = 64;
    const sw = W / s.rail.length;
    const rail = svg.path(`M${sw / 2} ${RH / 2}L${W - sw / 2} ${RH / 2}`, { cls: 'wire faint' }) +
      s.rail.map((r, i) => {
        const cx = sw / 2 + i * sw;
        const n = i + 1;
        const done = n < s.phase;
        const on = n === s.phase;
        const z = done ? 'green' : on ? 'purple' : 'github';
        const dot = on
          ? svg.circle(cx, RH / 2, 22, { cls: 'pe-badge' }) + svg.text(cx, RH / 2 + 6, String(n), { cls: 'pe-num' })
          : done
            ? svg.circle(cx, RH / 2, 18, { cls: 'pe-badge' }) + svg.text(cx, RH / 2 + 6, '✓', { cls: 'pe-num' })
            : svg.circle(cx, RH / 2, 18, { cls: 'box' }) + svg.text(cx, RH / 2 + 6, String(n), { cls: 't-xs' });
        const lx = cx + (on ? 34 : 30);
        return svg.g(dot +
          svg.text(lx, RH / 2 - 4, `PHASE ${n} · ${r.level}`, { cls: `t-xs t-mono${on || done ? ' z-text' : ''}`, anchor: 'start' }) +
          svg.text(lx, RH / 2 + 18, r.name, { cls: on ? 'pr-on' : 't-xs', anchor: 'start' }),
          { cls: `z-${z}` });
      }).join('');
    const top = svg.enter(rail, 200);
    const CY = RH + 18;
    const CH = 304;
    const gap = 24;
    const cw = (W - gap) / 2;
    const cols = s.columns.map((c, i) => {
      const x = i * (cw + gap);
      const at = 500 + i * 400;
      const items = c.items.map(([text, tag], j) => {
        const y = CY + 96 + j * 52;
        const chip = tag ? svg.chip(0, 0, tag, { z: 'github', size: 14, h: 26, pad: 10 }) : null;
        return svg.enter(
          svg.rect(x + 28, y - 16, 18, 18, { cls: 'pr-box', r: 4 }) +
          svg.text(x + 60, y, text, { cls: 'pr-item', anchor: 'start' }) +
          (chip ? svg.chip(x + cw - 28 - chip.w, y - 19, tag, { z: 'github', size: 14, h: 26, pad: 10 }).markup : ''),
          at + 200 + j * 120);
      }).join('');
      return svg.enter(svg.g(
        svg.rect(x, CY, cw, CH, { cls: 'box', r: 18 }) +
        svg.rect(x, CY, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 28, CY + 44, c.title, { cls: 'gs-q', anchor: 'start' }) +
        svg.text(x + cw - 28, CY + 44, 'TAUGHT IN', { cls: 't-xs t-mono', anchor: 'end' }) +
        svg.path(`M${x + 28} ${CY + 62}L${x + cw - 28} ${CY + 62}`, { cls: 'wire faint' }) +
        items,
        { cls: `z-${c.z}` }), at);
    }).join('');
    const EY = CY + CH + 18;
    const EH = 64;
    const lead = 250;
    const ew = (W - lead - 24) / s.exit.items.length;
    const exit = svg.enter(svg.g(
      svg.rect(0, EY, W, EH, { cls: 'zone', r: 14 }) +
      svg.text(28, EY + 39, s.exit.label, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      s.exit.items.map((t, i) => svg.text(lead + i * ew, EY + 39, `✓ ${t}`, { cls: 'pr-item', anchor: 'start' })).join(''),
      { cls: 'z-green' }), 1900);
    const label = `Roadmap: ${s.rail.map((r, i) => `Phase ${i + 1}, ${r.level} ${r.name}`).join('; ')}. Current: phase ${s.phase}. ${s.columns.map((c) => `${c.title}: ${c.items.map(([t, tag]) => `${t}${tag ? ` (${tag})` : ''}`).join('; ')}`).join('. ')}. ${s.exit.label}: ${s.exit.items.join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, EY + EH, label, top + cols + exit, 'phase-roadmap')}`;
  };
  const valueRecap = (s) => {
    const W = 1440;
    const C = { part: 0, before: 190, after: 650, ev: 1112 };
    const head = svg.enter(
      [['TAUGHT IN', C.part], ['BEFORE', C.before], ['AFTER', C.after], ['EVIDENCE YOU CAN OPEN', C.ev]]
        .map(([t, x], i) => svg.g(svg.text(x, 16, t, { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: `z-${['purple', 'orange', 'green', 'local'][i]}` })).join(''),
      200);
    const RH = 64;
    const rows = s.rows.map((r, i) => {
      const y = 34 + i * 76;
      const cy = y + RH / 2;
      const at = 500 + i * 450;
      const chip = svg.chip(C.part, y + 6, r.part, { z: 'purple', size: 14, h: 26, pad: 10 });
      return svg.enter(
        chip.markup +
        svg.text(C.part, y + 56, r.topic, { cls: 'pr-item', anchor: 'start' }) +
        svg.rect(C.before, y, 420, RH, { cls: 'box', r: 12 }) +
        svg.text(C.before + 24, cy + 6, r.before, { cls: 'gs-item gs-sub', anchor: 'start' }), at) +
        svg.trace(`M${C.before + 428} ${cy}L${C.after - 10} ${cy}M${C.after - 18} ${cy - 8}L${C.after - 10} ${cy}L${C.after - 18} ${cy + 8}`, { cls: 'wire link', at: at + 150, dur: 200 }) +
        svg.enter(svg.g(
          svg.rect(C.after, y, 446, RH, { cls: 'zone', r: 12 }) +
          svg.text(C.after + 24, cy + 6, `✓ ${r.after}`, { cls: 'pr-on', anchor: 'start' }),
          { cls: 'z-green' }), at + 250) +
        svg.enter(svg.g(
          svg.rect(C.ev, y, W - C.ev, RH, { cls: 'box', r: 12 }) +
          svg.rect(C.ev, y + 14, 4, RH - 28, { cls: 'card-edge', r: 2 }) +
          svg.text(C.ev + 24, cy + 6, r.evidence, { cls: 'cr-code', anchor: 'start' }),
          { cls: 'z-local' }), at + 350);
    }).join('');
    const TY = 34 + s.rows.length * 76 + 30;
    const TH = 112;
    const gap = 24;
    const tw = (W - gap * 2) / 3;
    const targets = svg.enter(svg.g(svg.text(0, TY + 4, s.targets.label, { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-purple' }), 2400) +
      s.targets.items.map((m, i) => {
        const x = i * (tw + gap);
        const y = TY + 20;
        return svg.enter(svg.g(
          svg.rect(x, y, tw, TH, { cls: 'box', r: 16 }) +
          svg.rect(x, y, tw, 6, { cls: 'card-top', r: 3 }) +
          svg.text(x + 104, y + 76, m.value, { cls: 'vr-val' }) +
          svg.text(x + 200, y + 50, m.detail, { cls: 'pr-on', anchor: 'start' }) +
          svg.text(x + 200, y + 80, m.from, { cls: 't-xs t-mono z-text', anchor: 'start' }),
          { cls: 'z-purple' }), 2600 + i * 250);
      }).join('');
    const label = `Value recap. ${s.rows.map((r) => `${r.part}, ${r.topic}: before, ${r.before}; after, ${r.after}; evidence: ${r.evidence}`).join('. ')}. ${s.targets.label}: ${s.targets.items.map((m) => `${m.value}, ${m.detail} (${m.from})`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, TY + 20 + TH, label, head + rows + targets, 'value-recap')}`;
  };  window.SCENES = {
    'delivery-confidence': deliveryConfidence,
    'sdlc-loop': sdlcLoop,
    'maturity-map': maturityMap,
    'l3-requirements': l3Requirements,
    'instruction-stack': instructionStack,
    'volume-breakpoint': volumeBreakpoint,
    'repo-decision': repoDecision,
    topology,
    'polyrepo-strategies': polyrepoStrategies,
    'issue-contract': issueContract,
    'pr-evidence': prEvidence,
    'gate-sort': gateSort,
    'context-review': contextReview,
    'code-owners': codeOwners,
    'ci-stages': ciStages,
    'ci-clock': ciClock,
    'affected-graph': affectedGraph,
    'flake-anatomy': flakeAnatomy,
    'opinionated-ci': opinionatedCi,
    'slsa-provenance': slsaProvenance,
    'phase-roadmap': phaseRoadmap,
    'value-recap': valueRecap,
    'today-plan': todayPlan
  };
})();
