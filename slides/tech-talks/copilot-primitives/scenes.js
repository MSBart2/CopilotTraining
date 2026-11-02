/*
  Deck-only visuals: artifact inspection and the title/closing primitive map.
  Shared frames and patterns carry the rest of the talk.
*/
(() => {
  const { svg, html } = window.Kit;

  const primitiveMap = () => {
    const W = 760;
    const rows = [
      { title: 'Instructions', detail: 'Stable context · repository or path', z: 'local', icon: '📋' },
      { title: 'Custom Prompts', detail: 'Human-triggered · task recipe', z: 'remote', icon: '💬' },
      { title: 'Skills', detail: 'Relevant task · linked resources', z: 'purple', icon: '⚡' },
      { title: 'Agents', detail: 'Selected role · configured tools', z: 'orange', icon: '🤖' }
    ];
    const x = 68;
    const w = 624;
    const h = 112;
    const gap = 34;
    const y0 = 34;
    const midX = x + w / 2;
    const spine = `M${midX} ${y0 + h / 2}L${midX} ${y0 + 3 * (h + gap) + h / 2}`;
    const cards = rows.map((r, i) => {
      const y = y0 + i * (h + gap);
      return svg.g(
        svg.enter(
          svg.rect(x, y, w, h, { cls: 'box card', r: 20 }) +
          svg.rect(x, y, 7, h, { cls: 'card-edge', r: 3 }) +
          svg.text(x + 42, y + 48, r.icon, { cls: 't-emoji', anchor: 'start' }) +
          svg.text(x + 100, y + 48, r.title, { cls: 't-lg primitive-label', anchor: 'start' }) +
          svg.text(x + 100, y + 82, r.detail, { cls: 't-muted t-sm', anchor: 'start' }),
          300 + 260 * i
        ),
        { cls: `z-${r.z}` }
      );
    }).join('');
    const links = rows.slice(0, -1).map((_, i) => {
      const y1 = y0 + i * (h + gap) + h;
      const y2 = y1 + gap;
      return svg.trace(`M${midX} ${y1}L${midX} ${y2}`, { cls: 'wire link', at: 800 + i * 240, dur: 220 }) +
        svg.pop(svg.path(`M${midX - 8} ${y2 - 9}L${midX} ${y2}L${midX + 8} ${y2 - 9}`, { cls: 'wire link' }), 1000 + i * 240);
    }).join('');
    return svg.scene(W, 650,
      'Instructions establish shared context, prompts capture human-triggered recipes, skills package linked resources, and agents define a selected role.',
      svg.path(spine, { cls: 'wire faint' }) +
      svg.ride(spine, { z: 'purple', at: 1800, dur: 3200, r: 6 }) +
      links + cards,
      'primitive-map');
  };

  const artifact = (s) => {
    const a = s.artifact;
    const W = 1440;
    const H = 500;
    const leftW = 820;
    const gap = 28;
    const rightX = leftW + gap;
    const rightW = W - rightX;
    const panel = (x, w, z) => svg.g(svg.rect(x, 0, w, H, { cls: 'box', r: 18 }), { cls: `z-${z}` });
    const code = [
      svg.text(30, 42, a.filename, { cls: 't-sm t-mono artifact-filename', anchor: 'start' }),
      svg.text(30, 72, a.badge, { cls: 't-xs t-mono artifact-badge', anchor: 'start' }),
      ...a.lines.map((line, i) => svg.lines(34, 112 + i * 30, line || ' ', {
        cls: 't-mono t-sm artifact-code',
        anchor: 'start',
        max: 68,
        lh: 23
      }))
    ].join('');
    const proof = [
      svg.text(rightX + 28, 44, a.proofTitle, { cls: 't-lg', anchor: 'start' }),
      ...a.proof.map((item, i) => {
        const y = 104 + i * 122;
        const z = i === a.proof.length - 1 ? 'orange' : i === 1 ? 'green' : 'purple';
        return svg.g(
          svg.enter(
            svg.rect(rightX + 22, y, rightW - 44, 104, { cls: 'zone', r: 14 }) +
            svg.text(rightX + 42, y + 34, item.title, { cls: 't-sm z-text artifact-proof-title', anchor: 'start' }) +
            svg.lines(rightX + 42, y + 66, item.text, {
              cls: 't-muted t-xs artifact-proof-text',
              anchor: 'start',
              max: 42,
              lh: 22
            }),
            350 + 220 * i
          ),
          { cls: `z-${z}` }
        );
      })
    ].join('');

    return `${html.head(s)}
      ${svg.scene(W, H,
        `${s.title}. Illustrative artifact ${a.filename}. ${a.proof.map((p) => `${p.title}: ${p.text}`).join('. ')}`,
        panel(0, leftW, 'local') + panel(rightX, rightW, 'purple') + code + proof,
        'artifact')}`;
  };

  window.SCENES = {
    'primitive-map': primitiveMap,
    artifact
  };
})();
