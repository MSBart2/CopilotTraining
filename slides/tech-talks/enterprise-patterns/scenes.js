/*
  Deck-only visuals for Scaling GitHub Copilot Across Organizations.
  Shared frames and patterns do the teaching; this one scene frames the talk
  with an owned baseline connected to repository scope, skills, settings, and review.
*/
(() => {
  const { svg } = window.Kit;

  const orgRing = () => {
    const W = 760;
    const H = 760;
    const cx = 380;
    const cy = 380;
    const radius = 248;
    const nodes = [
      { label: 'org rules', z: 'purple', angle: -90 },
      { label: 'repo scope', z: 'local', angle: -30 },
      { label: 'shared skills', z: 'remote', angle: 30 },
      { label: 'team settings', z: 'orange', angle: 90 },
      { label: 'metrics', z: 'green', angle: 150 },
      { label: 'review owner', z: 'github', angle: 210 }
    ];
    let body = svg.circle(cx, cy, radius, { cls: 'ring' }) +
      svg.circle(cx, cy, 132, { cls: 'ring' });

    nodes.forEach((node, i) => {
      const a = node.angle * Math.PI / 180;
      const x = cx + radius * Math.cos(a);
      const y = cy + radius * Math.sin(a);
      const d = `M${cx} ${cy}L${x.toFixed(1)} ${y.toFixed(1)}`;
      const w = Math.round(svg && window.Kit.measure(node.label, 20) + 52);
      const h = 52;
      body += svg.g(svg.path(d, { cls: 'wire faint' }), { cls: `z-${node.z}` });
      body += svg.g(svg.trace(d, { cls: 'route', at: 300 + 150 * i, dur: 700 }), { cls: `z-${node.z}` });
      body += svg.pop(
        svg.g(
          svg.rect(x - w / 2, y - h / 2, w, h, { cls: 'zone', r: 26 }) +
          svg.text(x, y + 7, node.label, { cls: 't-sm z-text' }),
          { cls: `z-${node.z}` }
        ),
        750 + 140 * i
      );
    });

    body += svg.pop(
      svg.g(
        svg.rect(cx - 145, cy - 82, 290, 164, { cls: 'box task', r: 22 }) +
        svg.text(cx, cy - 28, 'SHARED BASELINE', { cls: 't-xs t-mono' }) +
        svg.text(cx, cy + 10, 'Owner + scope', { cls: 't-lg' }) +
        svg.text(cx, cy + 48, 'Evidence + review', { cls: 't-lg' }),
        { cls: 'z-purple' }
      ),
      150
    );
    body += svg.halo(cx, cy, 148, { z: 'purple', at: 1100 });
    const route = `M${cx} ${cy}L${cx} ${cy - radius}M${cx} ${cy}L${cx + radius * .866} ${cy - radius * .5}M${cx} ${cy}L${cx + radius * .866} ${cy + radius * .5}M${cx} ${cy}L${cx} ${cy + radius}M${cx} ${cy}L${cx - radius * .866} ${cy + radius * .5}M${cx} ${cy}L${cx - radius * .866} ${cy - radius * .5}`;
    body += svg.ride(route, { z: 'green', at: 1600, dur: 3600, r: 6 });

    return svg.scene(
      W,
      H,
      'A shared Copilot guidance baseline connects to organization rules, repository scope, reusable skills, managed settings, metrics, and a human review owner.',
      body,
      'org-ring'
    );
  };

  window.SCENES = { 'org-ring': orgRing };
})();
