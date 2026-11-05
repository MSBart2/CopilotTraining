/*
  Copilot Plugins & APM — deck-only diagrams.
  Shared frames and patterns provide the standard layouts; these scenes cover
  the configuration flow and artifact panels this argument needs.
*/
(() => {
  const { svg, html, esc } = window.Kit;

  const artifact = (s) => {
    const W = 1440;
    const H = 520;
    const gap = 24;
    const n = s.panels.length;
    const pw = (W - gap * (n - 1)) / n;
    const panelMarkup = s.panels.map((p, i) => {
      const x = i * (pw + gap);
      const color = p.z || (i ? 'local' : 'purple');
      const at = 300 + 220 * i;
      const title = svg.text(x + 24, 38, p.title, { cls: 't-lg panel-title', anchor: 'start' });
      const lines = p.lines.map((line, j) => {
        const indent = (line.match(/^ */) || [''])[0].length;
        return svg.text(x + 24 + indent * 12, 86 + j * 31, line.trim() || ' ', { cls: 'artifact-line', anchor: 'start' });
      }).join('');
      const frame = svg.rect(x, 0, pw, H, { cls: 'box artifact-panel', r: 18 });
      return svg.g(svg.enter(frame + title + lines, at), { cls: `z-${color}` });
    }).join('');
    const label = `${s.title}. ${s.panels.map((p) => `${p.title}: ${p.lines.join('. ')}`).join('. ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, panelMarkup, 'artifact')}${html.footnote(s.footnote)}`;
  };

  const flow = (s) => {
    const W = 1440;
    const H = 390;
    const gap = 22;
    const n = s.nodes.length;
    const cw = (W - gap * (n - 1)) / n;
    const y = 40;
    const ch = 278;
    let body = '';
    s.nodes.forEach((node, i) => {
      const x = i * (cw + gap);
      const cx = x + cw / 2;
      const at = 350 + 330 * i;
      const lines = window.Kit.wrap(node.detail, Math.max(20, Math.floor(cw / 15)));
      const panel =
        svg.rect(x, y, cw, ch, { cls: 'box flow-panel', r: 18 }) +
        svg.text(x + 22, y + 44, `0${i + 1}`, { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(cx, y + 104, node.title, { cls: 't-lg flow-title' }) +
        lines.map((line, j) => svg.text(cx, y + 158 + 30 * j, line, { cls: 't-muted flow-detail' })).join('');
      body += svg.g(svg.enter(panel, at), { cls: `z-${node.z || 'local'}` });
      if (i < n - 1) {
        const x1 = x + cw + 4;
        const x2 = x1 + gap - 8;
        const cy = y + ch / 2;
        body += svg.trace(`M${x1} ${cy}L${x2} ${cy}`, { cls: 'wire link', at: at + 180, dur: 300 });
        body += svg.pop(svg.path(`M${x2 - 9} ${cy - 8}L${x2} ${cy}L${x2 - 9} ${cy + 8}`, { cls: 'wire link' }), at + 460);
      }
    });
    const label = `${s.title}. ${s.nodes.map((node, i) => `${i + 1}, ${node.title}: ${node.detail}`).join('. Then ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'flow')}${html.footnote(s.footnote)}`;
  };

  const stack = (s) => flow(s);

  const configRing = (s) => {
    const cx = 380;
    const cy = 380;
    const r = 220;
    const items = [
      { angle: -90, label: 'Manifest', z: 'purple' },
      { angle: 0, label: 'Lockfile', z: 'green' },
      { angle: 90, label: 'Repository', z: 'local' },
      { angle: 180, label: 'Owner review', z: 'orange' }
    ];
    const coords = items.map((item) => {
      const rad = item.angle * Math.PI / 180;
      return { ...item, x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
    });
    const ring = svg.path(
      `M${coords[0].x} ${coords[0].y} C${cx + r * .8} ${cy - r * .8} ${cx + r * .8} ${cy + r * .8} ${coords[1].x} ${coords[1].y}
       C${cx + r * .8} ${cy + r * .8} ${cx - r * .8} ${cy + r * .8} ${coords[2].x} ${coords[2].y}
       C${cx - r * .8} ${cy + r * .8} ${cx - r * .8} ${cy - r * .8} ${coords[3].x} ${coords[3].y}
       C${cx - r * .8} ${cy - r * .8} ${cx + r * .8} ${cy - r * .8} ${coords[0].x} ${coords[0].y}`,
      { cls: 'wire faint' }
    );
    const points = coords.map((item, i) => {
      const at = 350 + i * 260;
      const box = svg.rect(item.x - 98, item.y - 30, 196, 60, { cls: 'zone', r: 30 });
      const text = svg.text(item.x, item.y + 8, item.label, { cls: 'z-text ring-label' });
      return svg.g(svg.pop(box + text, at), { cls: `z-${item.z}` });
    }).join('');
    const center = svg.g(
      svg.circle(cx, cy, 108, { cls: 'task' }) +
      svg.text(cx, cy - 8, 'Copilot', { cls: 't-lg' }) +
      svg.text(cx, cy + 30, 'capability', { cls: 't-muted' }),
      { cls: 'z-purple' }
    );
    return svg.scene(760, 760, 'A repository manifest and lockfile connect a Copilot capability to a maintainer review.', ring + center + points, 'title-ring');
  };

  window.SCENES = { artifact, flow, stack, 'config-ring': configRing };
})();
