/*
  Kit: the shared vocabulary that deck scenes compose.
  Scenes return markup strings and hold no runtime state. The engine decides when
  motion plays; scenes only declare what moves, when (--at), and how long (--dur).
*/
(() => {
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const attrs = (o) => Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false && v !== '')
    .map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  const tag = (name, a = {}, inner) => (inner === undefined ? `<${name}${attrs(a)}/>` : `<${name}${attrs(a)}>${inner}</${name}>`);
  const timing = ({ at, dur, fx, fy, style } = {}) => [
    at !== undefined && `--at:${at}ms`,
    dur !== undefined && `--dur:${dur}ms`,
    fx !== undefined && `--fx:${fx}px`,
    fy !== undefined && `--fy:${fy}px`,
    style
  ].filter(Boolean).join(';');
  const cx = (...names) => names.filter(Boolean).join(' ');

  /* Average glyph width for the brand sans at weight 600; scenes use it to size chips. */
  const measure = (s, size = 17) => String(s).length * size * 0.56;
  const wrap = (s, max) => String(s).split(/\s+/).reduce((out, word) => {
    const last = out[out.length - 1];
    if (last !== undefined && `${last} ${word}`.length <= max) out[out.length - 1] = `${last} ${word}`;
    else out.push(word);
    return out;
  }, []);

  const svg = {
    scene: (w, h, label, inner, cls = '') =>
      tag('svg', { class: cx('scene', cls), viewBox: `0 0 ${w} ${h}`, role: 'img', 'aria-label': label, preserveAspectRatio: 'xMidYMid meet' }, inner),
    g: (inner, { cls, ...t } = {}) => tag('g', { class: cls, style: timing(t) }, inner),
    rect: (x, y, w, h, { cls = 'box', r = 12 } = {}) => tag('rect', { x, y, width: w, height: h, rx: r, class: cls }),
    circle: (x, y, r, { cls } = {}) => tag('circle', { cx: x, cy: y, r, class: cls }),
    path: (d, { cls = 'wire' } = {}) => tag('path', { d, class: cls }),
    text: (x, y, s, { cls, anchor = 'middle' } = {}) => tag('text', { x, y, 'text-anchor': anchor, class: cls }, esc(s)),
    lines: (x, y, s, { max = 24, lh = 28, cls, anchor = 'middle' } = {}) =>
      tag('text', { x, y, 'text-anchor': anchor, class: cls },
        wrap(s, max).map((line, i) => tag('tspan', { x, dy: i ? lh : 0 }, esc(line))).join('')),

    /* A label chip, fully rounded unless r is given. Returns { markup, w, h } so callers can lay out rows. */
    chip: (x, y, label, { z, size = 17, h = 32, pad = 14, r = h / 2, cls = '' } = {}) => {
      const w = Math.round(measure(label, size) + pad * 2);
      const markup = tag('g', { class: cx(z && `z-${z}`, cls) },
        tag('rect', { x, y, width: w, height: h, rx: r, class: 'chip-base' }) +
        tag('rect', { x, y, width: w, height: h, rx: r, class: 'chip' }) +
        tag('text', { x: x + w / 2, y: y + h / 2 + size * 0.36, 'text-anchor': 'middle', class: 'chip-text t-sm', style: `font-size:${size}px` }, esc(label)));
      return { markup, w, h };
    },

    /* Motion wrappers */
    enter: (inner, at = 0, cls = '') => tag('g', { class: cx('m-in', cls), style: timing({ at }) }, inner),
    pop: (inner, at = 0, cls = '') => tag('g', { class: cx('m-pop', cls), style: timing({ at }) }, inner),
    glide: (inner, [fx, fy], at = 0, cls = '') => tag('g', { class: cx('m-glide', cls), style: timing({ at, fx, fy }) }, inner),
    trace: (d, { cls = 'wire', at = 0, dur = 900 } = {}) =>
      tag('path', { d, pathLength: 1, class: cx('m-trace', cls), style: timing({ at, dur }) }),
    stream: (d, { z, at = 0, base = true } = {}) =>
      (base ? tag('path', { d, class: 'wire' }) : '') +
      tag('path', { d, class: cx('m-stream', z && `z-${z}`), style: timing({ at }) }),
    ride: (d, { z, at = 0, dur = 2200, r = 7, once = false } = {}) =>
      tag('circle', { r, class: cx('m-ride', z && `z-${z}`, once && 'once'), style: timing({ at, dur, style: `offset-path:path('${d}')` }) }),
    halo: (x, y, r, { z, at = 0 } = {}) => tag('circle', { cx: x, cy: y, r, class: cx('m-halo focus-ring', z && `z-${z}`), style: timing({ at }) })
  };

  /* Path helpers */
  const curve = (x1, y1, x2, y2, bend = 0.5) => {
    const mx = x1 + (x2 - x1) * bend;
    return `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  };
  const through = (points, r = 18) => {
    if (points.length < 2) return '';
    let d = `M${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i += 1) {
      const [px, py] = points[i - 1];
      const [x, y] = points[i];
      const mx = (px + x) / 2;
      d += Math.abs(py - y) < 1 ? `L${x} ${y}` : `C${mx} ${py} ${mx} ${y} ${x} ${y}`;
    }
    return d;
  };

  /* HTML chrome shared by content slides */
  const html = {
    esc,
    pill: (s) => (s.pill ? `<div class="pill">${esc(s.pill)}</div>` : ''),
    steps: (s) => (s.steps ? `<div class="steps" role="img" aria-label="Step ${s.steps.current} of ${s.steps.total}">${Array.from({ length: s.steps.total }, (_, i) => `<i class="${i + 1 === s.steps.current ? 'on' : i + 1 < s.steps.current ? 'done' : ''}"></i>`).join('')}</div>` : ''),
    head: (s) => `${s.steps ? `<div class="head-row">${html.pill(s)}${html.steps(s)}</div>` : html.pill(s)}<h2>${esc(s.title)}</h2>${s.subtitle ? `<p class="subtitle">${esc(s.subtitle)}</p>` : ''}`,
    footnote: (text) => (text ? `<p class="footnote">${esc(text)}</p>` : '')
  };

  window.Kit = { svg, html, esc, measure, wrap, curve, through, cx };
})();
