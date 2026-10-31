/*
  Standard frame slides shared by every native deck.
  Scenes: title, core-question, contents, opener, before-after, today, references, thanks.
  Load after kit.js. A deck's own scenes.js can override any of these by name, and the
  validator reports each override so copies stay deliberate.
*/
(() => {
  const { svg, html, esc, measure } = window.Kit;
  const TONES = ['local', 'remote', 'github', 'runtime'];

  /* Title and thank-you take an optional deck visual: s.visual names a deck scene that returns one svg.scene. */
  const visual = (s, ctx) => {
    if (!s.visual) return '';
    const v = ctx.scenes && ctx.scenes[s.visual];
    if (!v) throw new Error(`visual "${s.visual}" is not defined in the deck's scenes`);
    return v(s, ctx);
  };
  const logo = (s) => (s.logo === false ? '' : `<img class="logo" src="${esc(s.logo || '../sdp-logo.png')}" alt="SDP">`);

  /* Title: logo, headline, subtitle, tagline, and meta on the left; the deck's visual on the right. */
  const title = (s, ctx) => `
      <div class="title-copy">
        ${logo(s)}
        <h1>${esc(s.title)}</h1>
        ${s.subtitle ? `<p class="title-sub">${esc(s.subtitle)}</p>` : ''}
        ${s.tagline ? `<p class="tagline">${esc(s.tagline)}</p>` : ''}
        ${s.meta ? `<p class="meta">${esc(s.meta)}</p>` : ''}
      </div>
      ${visual(s, ctx)}`;

  /* Core question: the question, the routing words, the audiences, and what they leave with.
     Data: routing[], routingLabel?, roles[{icon,title,description}], stats[{title,description}], highlight?. */
  const coreQuestion = (s) => {
    const W = 1440;
    const n = s.routing.length;
    const step = W / n;
    const ry = 44;
    const centers = s.routing.map((_, i) => step * (i + 0.5));
    const line = `M${centers[0]} ${ry}L${centers[n - 1]} ${ry}`;
    const routing =
      (s.routingLabel ? svg.text(W / 2, 0, s.routingLabel.toUpperCase(), { cls: 't-xs t-mono' }) : '') +
      svg.g(svg.trace(line, { cls: 'wire', at: 500, dur: 900 }), {}) +
      svg.ride(line, { z: 'purple', at: 1600, dur: 2800, r: 6 }) +
      centers.map((cxp, i) => {
        const label = s.routing[i];
        const w = Math.round(measure(label, 24) + 56);
        return svg.pop(svg.chip(cxp - w / 2, ry - 26, label, { z: 'purple', size: 24, h: 52, pad: 28, r: 10, cls: 'route-word' }).markup, 450 + 220 * i);
      }).join('');
    const cw = (W - 2 * 28) / 3;
    const cardY = 112;
    const roles = s.roles.map((r, i) => {
      const x = i * (cw + 28);
      return svg.enter(
        svg.rect(x, cardY, cw, 140, { cls: 'box', r: 18 }) +
        svg.text(x + 28, cardY + 50, r.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(x + 80, cardY + 46, r.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 28, cardY + 88, r.description, { cls: 't-muted', anchor: 'start', max: 40, lh: 28 }), 1300 + 140 * i);
    }).join('');
    const statY = cardY + 168;
    const stats = s.stats.map((st, i) => {
      const x = i * (cw + 28);
      return svg.enter(
        svg.g(svg.rect(x, statY, cw, 104, { cls: 'zone', r: 18 }), { cls: 'z-green' }) +
        svg.g(svg.text(x + 28, statY + 44, st.title, { cls: 't-lg z-text', anchor: 'start' }), { cls: 'z-green' }) +
        svg.lines(x + 28, statY + 78, st.description, { cls: 't-muted t-sm', anchor: 'start', max: 52 }), 1800 + 140 * i);
    }).join('');
    const label = `${s.title} ${s.highlight || ''} For ${s.roles.map((r) => r.title).join(', ')}. You leave with: ${s.stats.map((st) => st.title).join(', ')}.`;
    return `${html.pill(s)}
      <h2 class="question m-in">“${esc(s.title)}”</h2>
      ${s.subtitle ? `<p class="subtitle m-in" style="--at:150ms">${esc(s.subtitle)}</p>` : ''}
      ${svg.scene(W, statY + 104, label, routing + roles + stats, 'core')}`;
  };

  /* Contents: the parts as stops on one route; each card links to its first slide.
     Data: sections[{icon,title,subtitle,blurb,slide,z?}]. */
  const contents = (s) => {
    const W = 1440;
    const n = s.sections.length;
    const gap = 24;
    const cw = (W - gap * (n - 1)) / n;
    const ly = 46;
    const xs = s.sections.map((_, i) => i * (cw + gap));
    const line = `M${xs[0] + cw / 2} ${ly}L${xs[n - 1] + cw / 2} ${ly}`;
    const lineDur = 1500;
    const body = s.sections.map((sec, i) => {
      const x = xs[i];
      const c = x + cw / 2;
      const z = sec.z || TONES[i % TONES.length];
      const at = 400 + (lineDur * i) / Math.max(1, n - 1);
      const stop = svg.pop(svg.g(svg.circle(c, ly, 28, { cls: 'stop' }) + svg.text(c, ly + 9, String(i + 1), { cls: 't-lg' }), { cls: `z-${z}` }), at);
      const card = svg.enter(
        svg.g(svg.rect(x, 104, cw, 380, { cls: 'box', r: 20 }) + svg.rect(x, 104, cw, 6, { cls: 'card-top', r: 3 }), { cls: `z-${z}` }) +
        svg.text(x + 30, 172, sec.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.lines(x + 30, 232, sec.title, { cls: 't-lg', anchor: 'start', max: 16, lh: 34 }) +
        svg.g(svg.text(x + 30, 318, sec.subtitle, { cls: 't-sm z-text', anchor: 'start' }), { cls: `z-${z}` }) +
        svg.lines(x + 30, 358, sec.blurb, { cls: 't-muted t-sm', anchor: 'start', max: 30, lh: 26 }) +
        svg.text(x + 30, 456, `→ slide ${sec.slide}`, { cls: 't-xs t-mono', anchor: 'start' }), at + 150);
      return `<a href="#${sec.slide}" aria-label="Go to part ${i + 1}, ${esc(sec.title)}, slide ${sec.slide}">${card}</a>${stop}`;
    }).join('');
    const label = `${n} parts: ${s.sections.map((x, i) => `${i + 1}. ${x.title}, ${x.subtitle.toLowerCase()}`).join('; ')}.`;
    return `${html.head(s)}${svg.scene(W, 490, label,
      svg.path(line, { cls: 'wire faint' }) + svg.trace(line, { cls: 'route z-purple', at: 400, dur: lineDur }) +
      svg.ride(line, { z: 'purple', at: 400 + lineDur + 300, dur: 3200, r: 7 }) + body, 'contents')}`;
  };

  /* Part opener: shared by every part slide. Data: cards[3]{icon,title,blurb}, terminal{context,detail}. */
  const opener = (s, { deck }) => {
    const parts = deck.slides.filter((x) => x.scene === 'opener').length;
    const W = 1440;
    const cw = 440;
    const gap = (W - cw * 3) / 2;
    const y = 18;
    const h = 196;
    const mid = y + h / 2;
    const xs = s.cards.map((_, i) => i * (cw + gap));
    const spine = `M${cw / 2} ${mid}L${xs[2] + cw / 2} ${mid}`;
    const links = xs.slice(0, -1).map((x, i) => {
      const d = `M${x + cw + 10} ${mid}L${xs[i + 1] - 14} ${mid}`;
      return svg.trace(d, { cls: 'wire link', at: 650 + 260 * i, dur: 320 }) +
        svg.pop(svg.path(`M${xs[i + 1] - 24} ${mid - 9}L${xs[i + 1] - 12} ${mid}L${xs[i + 1] - 24} ${mid + 9}`, { cls: 'wire link' }), 950 + 260 * i);
    }).join('');
    const cards = s.cards.map((c, i) => {
      const x = xs[i];
      return svg.enter(
        svg.rect(x, y, cw, h, { cls: 'box card', r: 20 }) +
        svg.rect(x, y, 6, h, { cls: 'card-edge', r: 3 }) +
        svg.text(x + 40, y + 66, c.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(x + 40, y + 124, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.text(x + 40, y + 160, c.blurb, { cls: 't-muted', anchor: 'start' }), 450 + 260 * i);
    }).join('');
    const label = `Part ${s.part}: ${s.title}. ${s.cards.map((c) => `${c.title}: ${c.blurb}`).join('. ')}.`;
    return `
      <div class="opener-num" aria-hidden="true">${String(s.part).padStart(2, '0')}</div>
      <p class="kicker m-in">Part ${s.part} of ${parts}</p>
      <h1 class="m-in" style="--at:80ms">${esc(s.title)}</h1>
      <p class="subtitle m-in" style="--at:180ms">${esc(s.subtitle)}</p>
      ${svg.scene(W, y + h + 18, label, svg.g(svg.path(spine, { cls: 'wire faint' }) + svg.ride(spine, { z: 'accent', at: 1600, dur: 2600, r: 6 }) + links + cards, { cls: 'z-accent' }), 'opener-cards')}
      <p class="terminal m-in" style="--at:1100ms"><span class="caret">❯</span><span class="m-type" style="--at:1250ms;--n:${s.terminal.context.length};--dur:${s.terminal.context.length * 32}ms">${esc(s.terminal.context)}</span><span class="sep">·</span><span class="detail">${esc(s.terminal.detail)}</span></p>`;
  };

  /* Before/After: each habit gives way to its counterpart, then the talk's numbers land.
     Data: before[], after[] (same length), metrics[3]{value,detail}. */
  const beforeAfter = (s) => {
    const W = 1440;
    const gap = 120;
    const cw = (W - gap) / 2;
    const rh = 64;
    const rg = 12;
    const y0 = 40;
    const rx = cw + gap;
    let body =
      svg.g(svg.text(0, 22, 'BEFORE', { cls: 't-xs t-mono col-label z-text', anchor: 'start' }), { cls: 'z-orange' }) +
      svg.g(svg.text(rx, 22, 'AFTER', { cls: 't-xs t-mono col-label z-text', anchor: 'start' }), { cls: 'z-green' });
    s.before.forEach((b, i) => {
      const top = y0 + i * (rh + rg);
      const mid = top + rh / 2;
      const at = 350 + 380 * i;
      body += svg.g(svg.enter(
        svg.rect(0, top, cw, rh, { cls: 'box soft', r: 14 }) +
        svg.text(28, mid + 8, b, { cls: 'ba-item', anchor: 'start' }), at), { cls: 'ba-left' });
      body += svg.trace(`M${cw + 18} ${mid}L${rx - 22} ${mid}`, { cls: 'wire link', at: at + 200, dur: 260 }) +
        svg.pop(svg.path(`M${rx - 32} ${mid - 9}L${rx - 20} ${mid}L${rx - 32} ${mid + 9}`, { cls: 'wire link' }), at + 440);
      body += svg.g(svg.enter(
        svg.rect(rx, top, cw, rh, { cls: 'zone', r: 14 }) +
        svg.text(rx + 28, mid + 8, '✓', { cls: 'z-text ba-mark', anchor: 'start' }) +
        svg.text(rx + 62, mid + 8, s.after[i], { cls: 'ba-item', anchor: 'start' }), at + 480), { cls: 'z-green' });
    });
    const my = y0 + s.before.length * (rh + rg) + 24;
    const mh = 144;
    const mw = (W - 2 * 28) / 3;
    const metricsAt = 350 + 380 * (s.before.length - 1) + 510;
    s.metrics.forEach((m, i) => {
      const x = i * (mw + 28);
      body += svg.g(svg.pop(svg.g(
        svg.rect(x, my, mw, mh, { cls: 'zone', r: 18 }) +
        svg.text(x + mw / 2, my + 80, m.value, { cls: 'z-text ba-num' }) +
        svg.text(x + mw / 2, my + 124, m.detail, { cls: 't-muted' }), {}), metricsAt + 180 * i), { cls: 'z-purple' });
    });
    const label = `${s.title}. ${s.before.map((b, i) => `Before: ${b}; after: ${s.after[i]}`).join('. ')}. ${s.metrics.map((m) => `${m.value} ${m.detail}`).join(', ')}.`;
    return `${html.head(s)}${svg.scene(W, my + mh, label, body, 'before-after')}`;
  };

  /* Today, this week, this month: a short timeline with a checklist under each stop.
     Data: horizons[3]{icon,label,z?,items[]}, takeaway. */
  const today = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - gap * 2) / 3;
    const ty = 34;
    const cy = 86;
    const lh = 30;
    const wrapped = s.horizons.map((h) => h.items.map((it) => Kit.wrap(it, 30)));
    const itemsH = Math.max(...wrapped.map((w) => w.reduce((a, l) => a + l.length * lh + 22, 0)));
    const ch = 104 + itemsH + 12;
    const centers = s.horizons.map((_, i) => i * (cw + gap) + cw / 2);
    const track = `M${centers[0]} ${ty}L${centers[2]} ${ty}`;
    let body = svg.trace(track, { cls: 'wire', at: 300, dur: 1200 }) + svg.ride(track, { z: 'purple', at: 2600, dur: 3000, r: 6 });
    let tick = 0;
    let column = 0;
    const tickAt = (k) => 1100 + 320 * k + 600 * column;
    s.horizons.forEach((h, i) => {
      column = i;
      const x = i * (cw + gap);
      const at = 400 + 420 * i;
      let iy = cy + 112;
      const items = wrapped[i].map((lines, j) => {
        const y = iy;
        iy += lines.length * lh + 22;
        return svg.enter(
          svg.rect(x + 34, y - 22, 24, 24, { cls: 'tick-box', r: 5 }) +
          svg.trace(`M${x + 39} ${y - 10}L${x + 45} ${y - 4}L${x + 54} ${y - 16}`, { cls: 'check', at: tickAt(tick++), dur: 440 }) +
          lines.map((l, k) => svg.text(x + 76, y + k * lh, l, { anchor: 'start' })).join(''), at + 400 + 160 * j);
      }).join('');
      body += svg.g(
        svg.pop(svg.circle(centers[i], ty, 16, { cls: 'stop' }), at) +
        svg.enter(
          svg.rect(x, cy, cw, ch, { cls: 'box', r: 20 }) +
          svg.rect(x, cy, cw, 6, { cls: 'card-top', r: 3 }) +
          svg.text(x + 34, cy + 62, h.icon, { cls: 't-emoji', anchor: 'start' }) +
          svg.text(x + 88, cy + 58, h.label, { cls: 't-lg z-text', anchor: 'start' }), at + 120) +
        items, { cls: `z-${h.z || ['green', 'local', 'purple'][i]}` });
    });
    const label = `${s.title}. ${s.horizons.map((h) => `${h.label}: ${h.items.join('; ')}`).join('. ')}. Key takeaway: ${s.takeaway}`;
    return `${html.head(s)}${svg.scene(W, cy + ch, label, body, 'today')}
      <p class="takeaway m-in" style="--at:${tickAt(tick - 1) + 440 + 300}ms"><span class="k">🔑 Key Takeaway</span>${esc(s.takeaway)}</p>`;
  };

  /* References: live links, grouped and colour-keyed. Data: groups[{icon,title,z,items[{href,label,description}]}]. */
  const references = (s) => {
    let n = 0;
    const groups = s.groups.map((g) => `
      <section class="ref-group z-${g.z || 'local'}">
        <h3 class="m-in" style="--at:${200 + 120 * n}ms"><span aria-hidden="true">${g.icon || ''}</span>${esc(g.title)}</h3>
        ${g.items.map((it) => {
          n += 1;
          const url = it.href.replace(/^https?:\/\//, '');
          return `<a class="ref m-in" style="--at:${250 + 120 * n}ms" href="${esc(it.href)}" target="_blank" rel="noopener">
            <b>${esc(it.label)}</b><span>${esc(it.description)}</span><code>${esc(url)}</code></a>`;
        }).join('')}
      </section>`).join('');
    return `${html.head(s)}<div class="refs">${groups}</div>`;
  };

  /* Thank you: closing line and summary cards on the left; the deck's visual (or the prompt) on the right.
     Data: subtitle, cards[{value,detail}], prompt, visual?. */
  const thanks = (s, ctx) => `
      <div class="title-copy">
        ${logo(s)}
        <h1>${esc(s.title)}</h1>
        ${s.subtitle ? `<p class="title-sub thanks-sub">${esc(s.subtitle)}</p>` : ''}
        ${s.cards ? `<div class="thanks-cards">${s.cards.map((c, i) => `<div class="m-in" style="--at:${500 + 160 * i}ms"><b>${esc(c.value)}</b><span>${esc(c.detail)}</span></div>`).join('')}</div>` : ''}
        ${!s.visual && s.prompt ? `<p class="thanks-prompt m-in" style="--at:1000ms">${esc(s.prompt)}</p>` : ''}
      </div>
      ${visual(s, ctx)}`;

  window.FRAMES = { title, 'core-question': coreQuestion, contents, opener, 'before-after': beforeAfter, today, references, thanks };
})();
