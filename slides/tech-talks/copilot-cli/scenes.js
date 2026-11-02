/*
  GitHub Copilot CLI — deck-only title/closing and locality visuals.
  Shared frames and patterns provide the teaching layouts.
*/
(() => {
  const { svg } = window.Kit;

  const sessionBridge = () => {
    const W = 760;
    const C = 380;
    const center =
      svg.g(svg.rect(260, 312, 240, 136, { cls: 'box', r: 24 }), { cls: 'z-purple' }) +
      svg.text(C, 366, 'ONE SESSION', { cls: 't-xs t-mono' }) +
      svg.text(C, 406, 'follows the work', { cls: 't-lg' }) +
      svg.text(C, 434, 'with human steering', { cls: 't-xs' });
    const nodes = [
      { x: 275, y: 62, z: 'purple', title: 'Intent', detail: 'ask · plan · approve' },
      { x: 485, y: 250, z: 'local', title: 'Execution', detail: 'tools at the task' },
      { x: 310, y: 560, z: 'green', title: 'Context', detail: 'compact · remember' },
      { x: 42, y: 402, z: 'orange', title: 'Operator', detail: 'review · redirect' },
      { x: 42, y: 190, z: 'github', title: 'Time + place', detail: 'delegate · reconnect' }
    ];
    const orbit = svg.circle(C, C, 274, { cls: 'ring' });
    const spokes = nodes.map((n, i) => {
      const nx = n.x + 98;
      const ny = n.y + 43;
      const d = `M${C} ${C}L${nx} ${ny}`;
      return svg.g(svg.trace(d, { at: 400 + i * 120, dur: 700 }), { cls: `z-${n.z}` }) +
        svg.ride(d, { z: n.z, at: 1250 + i * 140, dur: 2600, r: 5 });
    }).join('');
    const cards = nodes.map((n, i) =>
      svg.g(
        svg.pop(svg.rect(n.x, n.y, 196, 86, { cls: 'zone', r: 18 }), 650 + i * 140) +
        svg.text(n.x + 98, n.y + 36, n.title, { cls: 't-lg z-text' }) +
        svg.text(n.x + 98, n.y + 64, n.detail, { cls: 't-xs' }),
        { cls: `z-${n.z}` })
    ).join('');
    return svg.scene(W, W,
      'One durable Copilot CLI session connects intent, execution, context, time, place, and the human operator.',
      orbit + spokes + center + cards, 'session-bridge');
  };

  const hostLocality = (s) => {
    const W = 1440;
    const H = 430;
    const y = 86;
    const h = 220;
    const boxes = [
      { x: 16, w: 300, z: 'orange', title: 'Operator', lines: ['Browser or mobile', 'reviews · steers · approves'] },
      { x: 385, w: 300, z: 'purple', title: 'Remote session', lines: ['Web / mobile view', 'same session context'] },
      { x: 754, w: 300, z: 'local', title: 'CLI on the host', lines: ['commands run here', 'host permissions still apply'] },
      { x: 1123, w: 300, z: 'green', title: 'Host files and logs', lines: ['bulk corpus stays here', 'context may reach service'] }
    ];
    const cards = boxes.map((b, i) =>
      svg.g(
        svg.enter(
          svg.rect(b.x, y, b.w, h, { cls: 'zone', r: 22 }) +
          svg.text(b.x + b.w / 2, y + 62, b.title, { cls: 't-lg z-text' }) +
          svg.lines(b.x + b.w / 2, y + 112, b.lines[0], { cls: 't-sm', max: 26, lh: 30 }) +
          svg.lines(b.x + b.w / 2, y + 154, b.lines[1], { cls: 't-xs', max: 32, lh: 26 }),
          350 + i * 180),
        { cls: `z-${b.z}` })
    ).join('');
    const links = [
      { d: 'M316 196L385 196', z: 'orange', label: 'device' },
      { d: 'M685 196L754 196', z: 'purple', label: 'steering' },
      { d: 'M1054 196L1123 196', z: 'green', label: 'local read' }
    ].map((l, i) =>
      svg.g(svg.trace(l.d, { cls: 'wire link', at: 700 + 220 * i, dur: 450 }) +
        svg.ride(l.d, { z: l.z, at: 1250 + 220 * i, dur: 2200, r: 6 }),
      { cls: `z-${l.z}` })
    ).join('');
    const caption = svg.text(W / 2, 370,
      s.id === 'staging-transfer'
        ? 'Start with an authorized staging task; keep tools scoped and inspect the evidence.'
        : 'Execution stays on the host; the operator’s control surface can be elsewhere.',
      { cls: 't-sm' });
    return `${window.Kit.html.head(s)}${svg.scene(W, H,
      'The operator steers a remote session; Copilot tools run on the host beside its files and logs.',
      links + cards + caption, 'host-locality')}${window.Kit.html.footnote(s.footnote)}`;
  };

  window.SCENES = {
    'session-bridge': sessionBridge,
    'host-locality': hostLocality
  };
})();
