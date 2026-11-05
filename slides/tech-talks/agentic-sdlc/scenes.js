/*
  Agentic SDLC deck-only visuals. Shared frames and patterns stay in slides/native.
*/
(() => {
  const { svg, html } = window.Kit;

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
    const gap = 12;
    const cw = (W - gap * 4) / 5;
    const y = 16;
    const h = 376;
    const cards = s.levels.map((l, i) => {
      const x = i * (cw + gap);
      const z = i === 4 ? 'purple' : i === 2 ? 'green' : 'local';
      const band = (yy, label, value, color) =>
        svg.g(svg.rect(x + 12, yy, cw - 24, 74, { cls: 'zone', r: 12 }) +
          svg.text(x + 26, yy + 24, label, { cls: 't-xs t-mono', anchor: 'start' }) +
          svg.lines(x + 26, yy + 52, value, { cls: 't-sm z-text', anchor: 'start', max: 25, lh: 20 }),
          { cls: `z-${color}` });
      return svg.g(
        svg.rect(x, y, cw, h, { cls: 'box', r: 18 }) +
        svg.rect(x, y, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.text(x + 22, y + 46, `${l.level} · ${l.name}`, { cls: 't-lg', anchor: 'start' }) +
        band(y + 64, 'PLATFORM', l.platform, z) +
        band(y + 148, 'ADOPTION', l.adoption, i === 2 ? 'green' : 'github') +
        svg.text(x + 24, y + 272, 'UNLOCKS', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.lines(x + 24, y + 306, l.unlock, { cls: 't-sm', anchor: 'start', max: 24, lh: 22 }),
        { cls: `z-${z}` });
    }).join('');
    const label = `Five maturity levels pair platform and adoption signals. ${s.levels.map((l) => `${l.level} ${l.name}: platform ${l.platform}; adoption ${l.adoption}; unlocks ${l.unlock}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, 410, label, cards, 'maturity-map')}${html.footnote(s.footnote)}`;
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
    const top = 36;
    const h = 300;
    const gap = 160;
    const cw = (W - gap) / 2;
    const card = (x, item, z) => svg.g(
      svg.rect(x, top, cw, h, { cls: 'zone', r: 22 }) +
      svg.text(x + cw / 2, top + 118, item.value, { cls: 'z-text stat' }) +
      svg.text(x + cw / 2, top + 174, item.label, { cls: 't-lg z-text' }) +
      svg.lines(x + cw / 2, top + 228, item.detail, { cls: 't-muted t-sm', max: 42, lh: 26 }),
      { cls: `z-${z}` });
    const leftX = 0;
    const rightX = cw + gap;
    const body = card(leftX, s.left, 'local') +
      svg.trace(`M${cw + 26} ${top + 150}L${rightX - 28} ${top + 150}`, { cls: 'wire link', at: 450, dur: 600 }) +
      svg.g(svg.text(W / 2, top + 130, '×50', { cls: 't-lg z-text' }), { cls: 'z-purple' }) +
      card(rightX, s.right, 'purple') +
      svg.g(svg.rect(48, top + h + 24, W - 96, 70, { cls: 'box', r: 16 }) +
        svg.text(W / 2, top + h + 68, s.takeaway, { cls: 't-sm' }), { cls: 'z-green' });
    return `${html.head(s)}${svg.scene(W, 440,
      `Illustrative review-volume comparison: ${s.left.value} to ${s.right.value} lines per reviewer per day. The decision is to validate intent, risk, and evidence.`,
      body, 'volume-breakpoint')}`;
  };

  const topology = (s) => {
    const W = 1440;
    const body =
      svg.g(svg.rect(28, 22, 440, 392, { cls: 'box', r: 18 }) +
        svg.text(52, 62, 'ONE PRODUCT WORKSPACE', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.rect(54, 92, 176, 88, { cls: 'zone', r: 14 }) +
        svg.text(142, 128, 'apps/', { cls: 't-lg' }) +
        svg.text(142, 154, 'deployable units', { cls: 't-xs' }) +
        svg.rect(264, 92, 176, 88, { cls: 'zone', r: 14 }) +
        svg.text(352, 128, 'libs/', { cls: 't-lg' }) +
        svg.text(352, 154, 'shared modules', { cls: 't-xs' }) +
        svg.rect(54, 208, 386, 72, { cls: 'box soft', r: 12 }) +
        svg.text(247, 238, '.github/workflows/', { cls: 't-sm' }) +
        svg.text(247, 260, 'required checks + owner routing', { cls: 't-xs' }) +
        svg.rect(54, 302, 386, 78, { cls: 'zone', r: 12 }) +
        svg.text(247, 334, 'nx.json + dependency graph', { cls: 't-sm' }) +
        svg.text(247, 357, 'boundaries + affected analysis', { cls: 't-xs' }),
        { cls: 'z-local' }) +
      svg.g(svg.rect(530, 22, 356, 392, { cls: 'box', r: 18 }) +
        svg.text(708, 62, 'ENFORCED BOUNDARY', { cls: 't-xs t-mono' }) +
        svg.rect(580, 112, 256, 84, { cls: 'zone', r: 14 }) +
        svg.text(708, 145, 'Allowed dependency', { cls: 't-sm z-text' }) +
        svg.text(708, 170, 'apps/web → libs/auth', { cls: 't-xs z-text' }) +
        svg.trace('M708 212L708 262', { cls: 'wire link', at: 500, dur: 450 }) +
        svg.rect(580, 272, 256, 94, { cls: 'zone', r: 14 }) +
        svg.text(708, 308, 'Forbidden import', { cls: 't-sm z-text' }) +
        svg.text(708, 334, 'lint fails with file + rule', { cls: 't-xs z-text' }),
        { cls: 'z-orange' }) +
      svg.g(svg.rect(948, 22, 456, 392, { cls: 'box', r: 18 }) +
        svg.text(1176, 62, 'SEPARATE CONTROL PLANE WHEN NEEDED', { cls: 't-xs t-mono' }) +
        svg.rect(1000, 112, 352, 76, { cls: 'zone', r: 14 }) +
        svg.text(1176, 143, 'Golden templates', { cls: 't-sm z-text' }) +
        svg.text(1176, 167, 'shared workflows + scaffolds', { cls: 't-xs z-text' }) +
        svg.rect(1000, 210, 352, 76, { cls: 'zone', r: 14 }) +
        svg.text(1176, 241, 'Policy + standards', { cls: 't-sm z-text' }) +
        svg.text(1176, 265, 'access, audit, independent updates', { cls: 't-xs z-text' }) +
        svg.rect(1000, 308, 352, 64, { cls: 'box soft', r: 14 }) +
        svg.text(1176, 347, 'Use when isolation earns its cost', { cls: 't-xs' }),
        { cls: 'z-purple' }) +
      svg.trace('M468 214L530 214', { cls: 'wire link', at: 700, dur: 400 }) +
      svg.trace('M886 214L948 214', { cls: 'wire link', at: 900, dur: 400 });
    return `${html.head(s)}${svg.scene(W, 440,
      'A monorepo can hold applications, libraries, workflow policy, and a dependency graph together. Enforced boundaries reject forbidden imports. A separate control plane can hold shared templates and policies when isolation is required.',
      body, 'topology')}`;
  };

  const intentContract = (s) => {
    const W = 1440;
    const rowH = 78;
    const gap = 14;
    const body = s.intent.map(([key, value], i) => {
      const y = i * (rowH + gap);
      const z = ['purple', 'orange', 'local', 'green'][i];
      return svg.g(
        svg.rect(0, y, 250, rowH, { cls: 'zone', r: 14 }) +
        svg.text(125, y + 47, key.toUpperCase(), { cls: 't-xs t-mono z-text' }) +
        svg.rect(276, y, W - 276, rowH, { cls: 'box', r: 14 }) +
        svg.lines(310, y + 34, value, { cls: 't-sm', anchor: 'start', max: 100, lh: 23 }),
        { cls: `z-${z}` });
    }).join('');
    return `${html.head(s)}${svg.scene(W, s.intent.length * (rowH + gap) - gap,
      `Illustrative task contract with intent, constraint, rate and expiry rules, and acceptance evidence. The developer owns the request; Copilot proposes the implementation.`,
      body, 'intent-contract')}`;
  };

  const evidenceCards = (s) => {
    const W = 1440;
    const gap = 24;
    const cw = (W - gap) / 2;
    const ch = 122;
    const rowGap = 18;
    const body = s.cards.map((c, i) => {
      const x = (i % 2) * (cw + gap);
      const y = Math.floor(i / 2) * (ch + rowGap);
      const z = ['purple', 'green', 'orange', 'local', 'github', 'runtime'][i % 6];
      return svg.g(
        svg.rect(x, y, cw, ch, { cls: 'box', r: 16 }) +
        svg.rect(x + 18, y + 20, 54, 54, { cls: 'zone', r: 12 }) +
        svg.text(x + 45, y + 57, c.icon, { cls: 't-emoji' }) +
        svg.text(x + 94, y + 43, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 94, y + 78, c.description, { cls: 't-muted t-sm', anchor: 'start', max: 58, lh: 22 }),
        { cls: `z-${z}` });
    }).join('');
    return `${html.head(s)}${svg.scene(W, 402,
      `${s.title}: ${s.cards.map((c) => `${c.title}: ${c.description}`).join('. ')}. These are artifacts to inspect, not check results.`,
      body, 'evidence-cards')}${html.footnote(s.footnote)}`;
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

  const phaseChecklist = (s) => {
    const W = 1440;
    const top = 12;
    const h = 382;
    const gap = 28;
    const cw = (W - gap) / 2;
    const panel = (x, title, items, z) => {
      const rows = items.map((item, i) => {
        const yy = top + 104 + i * 62;
        return svg.circle(x + 34, yy - 7, 7, { cls: 'stop' }) +
          svg.lines(x + 58, yy, item, { cls: 't-sm', anchor: 'start', max: 56, lh: 22 });
      }).join('');
      return svg.g(
        svg.rect(x, top, cw, h, { cls: 'box', r: 18 }) +
        svg.rect(x, top, cw, 6, { cls: 'card-top', r: 3 }) +
        svg.lines(x + 28, top + 48, title, { cls: 't-lg', anchor: 'start', max: 32, lh: 28 }) +
        rows,
        { cls: `z-${z}` });
    };
    const body = svg.text(W / 2, 0, s.phase, { cls: 't-xs t-mono' }) +
      panel(0, s.leftTitle, s.left, 'local') +
      panel(cw + gap, s.rightTitle, s.right, 'purple') +
      svg.g(svg.rect(20, top + h + 20, W - 40, 62, { cls: 'zone', r: 14 }) +
        svg.lines(W / 2, top + h + 45, s.evidence, { cls: 't-sm z-text', max: 115, lh: 22 }),
        { cls: 'z-green' });
    return `${html.head(s)}${svg.scene(W, 484,
      `${s.phase}. Platform and tooling: ${s.left.join('; ')}. Adoption and governance: ${s.right.join('; ')}. Advance when: ${s.evidence}`,
      body, 'phase-checklist')}`;
  };

  window.SCENES = {
    'sdlc-loop': sdlcLoop,
    'maturity-map': maturityMap,
    'instruction-stack': instructionStack,
    'volume-breakpoint': volumeBreakpoint,
    topology,
    'intent-contract': intentContract,
    'evidence-cards': evidenceCards,
    'phase-checklist': phaseChecklist,
    'today-plan': todayPlan
  };
})();
