/*
  Deck-only title and closing visuals. Teaching diagrams reuse shared frames and patterns.
*/
(() => {
  const { svg } = window.Kit;

  const authorityChain = (label, nodes, foot) => {
    const W = 760;
    const H = 760;
    const centers = [140, 380, 620];
    const y = 330;
    const boxW = 194;
    const boxH = 180;
    let body = '';
    const path = `M${centers[0]} ${y}L${centers[2]} ${y}`;
    body += svg.path(path, { cls: 'wire faint' });
    body += svg.trace(path, { cls: 'route z-purple', at: 350, dur: 1000 });
    body += svg.ride(path, { z: 'purple', at: 1450, dur: 2400, r: 8 });
    nodes.forEach((node, i) => {
      const x = centers[i] - boxW / 2;
      const card = svg.rect(x, y - boxH / 2, boxW, boxH, { cls: 'box card', r: 20 }) +
        svg.text(centers[i], y - 42, node.kicker, { cls: 't-xs t-mono' }) +
        svg.lines(centers[i], y + 2, node.title, { cls: 't-lg', max: 16, lh: 34 }) +
        svg.lines(centers[i], y + 70, node.detail, { cls: 't-muted t-sm', max: 22, lh: 26 });
      body += svg.pop(svg.g(card, { cls: `z-${node.z}` }), 250 + i * 240);
    });
    body += svg.g(svg.text(W / 2, 134, label, { cls: 't-xs t-mono' }), { cls: 'z-purple' });
    body += svg.text(W / 2, 578, foot, { cls: 't-sm' });
    body += svg.halo(W / 2, y, 18, { z: 'purple', at: 1100 });
    return svg.scene(W, H, `${label}. ${nodes.map((n) => `${n.kicker}: ${n.title}, ${n.detail}`).join('. ')}. ${foot}`, body, 'authority-chain');
  };

  const authorityRing = () => authorityChain(
    'READABLE AUTHORITY',
    [
      { kicker: 'SOURCE · .md', title: 'Declare', detail: 'trigger · inputs', z: 'local' },
      { kicker: 'LOCK · .yml', title: 'Compile', detail: 'jobs · limits', z: 'purple' },
      { kicker: 'RUN · audit', title: 'Inspect', detail: 'outputs · cost', z: 'green' }
    ],
    'The maintainer reviews each handoff.'
  );

  const closingContract = () => authorityChain(
    'TRANSFER THE DECISION',
    [
      { kicker: '1 · CHOOSE', title: 'Recurs', detail: 'needs judgment', z: 'local' },
      { kicker: '2 · NARROW', title: 'Small write', detail: 'one declared action', z: 'purple' },
      { kicker: '3 · REVIEW', title: 'Human checks', detail: 'review output', z: 'green' }
    ],
    'Which chore in your repository passes all three tests?'
  );

  window.SCENES = {
    'authority-ring': authorityRing,
    'closing-contract': closingContract
  };
})();
