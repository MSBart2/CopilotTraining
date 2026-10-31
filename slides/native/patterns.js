/*
  Reusable layout patterns shared by every native deck.
  Scenes: terminal, showdown, scorecard, relay (alias: patterns), signals, four-phases.
  Load after kit.js. A deck's own scenes.js can override any of these by name.
*/
(() => {
  const { svg, html, esc } = window.Kit;

  /* Terminal transcript: the prompt and request type out, then the agent's evidence lands line by line.
     Data: transcript[{type: prompt|user|thinking|response|divider|outcome, ...}], termTitle?. */
  const terminal = (s) => {
    let t = 400;
    const typed = (text, cps = 22) => {
      const span = `<span class="m-type" style="--at:${t}ms;--n:${text.length};--dur:${text.length * cps}ms">${esc(text)}</span>`;
      t += text.length * cps + 250;
      return span;
    };
    const line = (cls, inner) => `<div class="tl ${cls} m-in" style="--at:${t}ms">${inner}</div>`;
    const rows = s.transcript.map((e) => {
      if (e.type === 'prompt') { const at = t; return `<div class="tl prompt m-in" style="--at:${at}ms"><span class="caret">$</span>${typed(e.text, 60)}</div>`; }
      if (e.type === 'user') { const at = t; return `<div class="tl user m-in" style="--at:${at}ms"><span class="caret">❯</span>${typed(e.text)}</div>`; }
      if (e.type === 'thinking') {
        const out = line('think', `<span class="who">${esc(e.label)}</span><span class="dots" aria-hidden="true">${[0, 1, 2].map((i) => `<i class="m-breathe" style="--at:${i * 200}ms"></i>`).join('')}</span>`);
        t += 600;
        return out;
      }
      if (e.type === 'response') return e.lines.map((l) => { const out = line('resp', `<span class="bullet">•</span>${esc(l)}`); t += 300; return out; }).join('');
      if (e.type === 'divider') { const out = `<hr class="tl-rule m-in" style="--at:${t}ms">`; t += 250; return out; }
      if (e.type === 'outcome') { const out = line('outcome', `<span class="ok">✓</span>${esc(e.text)}`); t += 350; return out; }
      return '';
    }).join('');
    return `${html.head(s)}
      <div class="term m-in" style="--at:150ms">
        <div class="term-bar" aria-hidden="true"><i></i><i></i><i></i>${s.termTitle ? `<span>${esc(s.termTitle)}</span>` : ''}</div>
        <div class="term-body">${rows}</div>
      </div>${html.footnote(s.footnote)}`;
  };

  /* Showdown: the single-path attempt fades back while the composed route lights up step by step.
     Data: leftLabel, rightLabel, pairs[{left{label,note}, right{label,note,z,optional?}}],
     outcomeLeft{icon,label}, outcomeRight{icon,label}. Optional steps draw dashed. */
  const showdown = (s) => {
    const W = 1440;
    const gap = 120;
    const cw = (W - gap) / 2;
    const rh = 84;
    const rg = 10;
    const y0 = 44;
    const rx = cw + gap;
    const n = s.pairs.length;
    const last = n - 1;
    const mids = s.pairs.map((_, i) => y0 + i * (rh + rg) + rh / 2);
    const oy = y0 + n * (rh + rg) + 8;
    const oh = 64;
    const firstOptional = s.pairs.findIndex((p) => p.right.optional);
    const solidEnd = firstOptional > 0 ? firstOptional - 1 : last;
    let body =
      svg.text(0, 22, s.leftLabel.toUpperCase(), { cls: 't-xs t-mono col-label', anchor: 'start' }) +
      svg.g(svg.text(rx, 22, s.rightLabel.toUpperCase(), { cls: 't-xs t-mono col-label z-text', anchor: 'start' }), { cls: 'z-green' });
    const spineX = rx + 30;
    const spine = `M${spineX} ${mids[0]}L${spineX} ${mids[last]}`;
    body += svg.trace(`M${spineX} ${mids[0]}L${spineX} ${mids[solidEnd]}`, { cls: 'wire', at: 900, dur: 1100 });
    if (solidEnd < last) body += svg.trace(`M${spineX} ${mids[solidEnd]}L${spineX} ${mids[last]}`, { cls: 'wire dashed', at: 2000, dur: 400 });
    s.pairs.forEach((p, i) => {
      const top = mids[i] - rh / 2;
      const at = 350 + 300 * i;
      body += svg.g(svg.enter(
        svg.rect(0, top, cw, rh, { cls: 'box soft', r: 14 }) +
        svg.text(26, top + 36, p.left.label, { cls: 'sd-label', anchor: 'start' }) +
        svg.text(26, top + 62, p.left.note, { cls: 't-xs', anchor: 'start' }), at), { cls: 'sd-left' });
      const r = p.right;
      const note = Kit.wrap(r.note, 64);
      body += svg.g(svg.enter(
        svg.rect(rx + 56, top, cw - 56, rh, { cls: r.optional ? 'zone dashed' : 'zone', r: 14 }) +
        svg.text(rx + 80, top + (note.length > 1 ? 30 : 36), r.label, { cls: 'sd-label', anchor: 'start' }) +
        note.map((l, k) => svg.text(rx + 80, top + (note.length > 1 ? 54 : 62) + k * 20, l, { cls: 't-xs', anchor: 'start' })).join(''), at + 150) +
        svg.pop(svg.circle(spineX, mids[i], 10, { cls: 'stop' }), at + 650), { cls: `z-${r.z}` });
      body += svg.g(svg.enter(svg.text(cw + gap / 2, mids[i] + 9, 'vs', { cls: 't-xs t-mono vs' }), at + 100), {});
    });
    body += svg.g(svg.enter(
      svg.rect(0, oy, cw, oh, { cls: 'zone', r: 16 }) +
      svg.text(26, oy + 41, `${s.outcomeLeft.icon}  ${s.outcomeLeft.label}`, { cls: 'sd-label z-text', anchor: 'start' }), 1800), { cls: 'z-orange' });
    body += svg.g(svg.pop(svg.g(
      svg.rect(rx, oy, cw, oh, { cls: 'zone', r: 16 }) +
      svg.text(rx + 26, oy + 41, `${s.outcomeRight.icon}  ${s.outcomeRight.label}`, { cls: 'sd-label z-text', anchor: 'start' }), {}), 2500), { cls: 'z-green' });
    body += svg.ride(spine, { z: 'green', at: 2700, dur: 2800, r: 7 });
    const label = `${s.leftLabel} versus ${s.rightLabel}. ${s.pairs.map((p) => `${p.left.label} (${p.left.note}) versus ${p.right.label} (${p.right.note})`).join('. ')}. Outcome: ${s.outcomeLeft.label}, versus ${s.outcomeRight.label}.`;
    return `${html.head(s)}${svg.scene(W, oy + oh, label, body, 'showdown')}${html.footnote(s.footnote)}`;
  };

  /* Scorecard: evidence cards in a 2-column grid, each checked off once it lands.
     Data: cards[{icon,title,description}]. */
  const scorecard = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - gap) / 2;
    const ch = 196;
    const rows = Math.ceil(s.cards.length / 2);
    const body = s.cards.map((c, i) => {
      const x = (i % 2) * (cw + gap);
      const y = Math.floor(i / 2) * (ch + gap);
      const at = 350 + 260 * i;
      const ccx = x + cw - 56;
      const ccy = y + 56;
      return svg.enter(
        svg.rect(x, y, cw, ch, { cls: 'box', r: 20 }) +
        svg.text(x + 34, y + 70, c.icon, { cls: 't-emoji score-icon', anchor: 'start' }) +
        svg.text(x + 104, y + 66, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 34, y + 124, c.description, { cls: 't-muted score-desc', anchor: 'start', max: 46, lh: 32 }), at) +
        svg.g(svg.pop(svg.circle(ccx, ccy, 22, { cls: 'stop' }), at + 300) +
          svg.trace(`M${ccx - 10} ${ccy}L${ccx - 3} ${ccy + 8}L${ccx + 11} ${ccy - 8}`, { cls: 'check', at: at + 500, dur: 300 }), { cls: 'z-green' });
    }).join('');
    const label = `${s.title}: ${s.cards.map((c) => `${c.title}. ${c.description}`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, rows * ch + (rows - 1) * gap, label, body, 'scorecard')}`;
  };

  /* Relay: three reusable handoffs, each a packet passed down a chain of three surfaces.
     Data: columns[3]{icon,title,description,items[3],z[3]}. */
  const relay = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - gap * 2) / 3;
    const ch = 470;
    const body = s.columns.map((c, i) => {
      const x = i * (cw + gap);
      const at = 350 + 300 * i;
      const ny = [258, 330, 402];
      const nx = x + 30;
      const nw = cw - 60;
      const lane = `M${x + cw / 2} ${ny[0] + 20}L${x + cw / 2} ${ny[2] + 20}`;
      const nodes = c.items.map((it, j) => svg.g(svg.pop(svg.g(
        svg.rect(nx, ny[j], nw, 44, { cls: 'zone', r: 22 }) +
        svg.text(x + cw / 2, ny[j] + 29, it, { cls: 'z-text pat-node' }), {}), at + 500 + 220 * j), { cls: `z-${c.z[j]}` })).join('');
      const arrows = [0, 1].map((j) => svg.trace(`M${x + cw / 2} ${ny[j] + 46}L${x + cw / 2} ${ny[j + 1] - 2}`, { cls: 'wire link', at: at + 650 + 220 * j, dur: 200 })).join('');
      return svg.enter(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 20 }) +
        svg.text(x + 30, 66, c.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.lines(x + 30, 122, c.title, { cls: 't-lg pat-title', anchor: 'start', max: 22, lh: 32 }) +
        svg.lines(x + 30, 186, c.description, { cls: 't-muted pat-desc', anchor: 'start', max: 36, lh: 26 }), at) +
        arrows + nodes + svg.ride(lane, { z: c.z[2], at: at + 1600, dur: 2400, r: 6 });
    }).join('');
    const label = `${s.title}: ${s.columns.map((c) => `${c.title}. ${c.description} Surfaces: ${c.items.join(', then ')}.`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, ch, label, body, 'patterns')}`;
  };

  /* Boundary signals: each signal lights in turn and points at the tag it calls for.
     Data: rows[{label,description,tag,z}]. */
  const signals = (s) => {
    const W = 1440;
    const rh = 74;
    const rg = 12;
    const tagW = 220;
    const body = s.rows.map((r, i) => {
      const y = i * (rh + rg);
      const mid = y + rh / 2;
      const at = 350 + 260 * i;
      const tx = W - tagW;
      return svg.g(
        svg.enter(svg.rect(0, y, W - tagW - 70, rh, { cls: 'box soft', r: 14 }) +
          svg.text(76, mid + 8, r.label, { cls: 'sig-label', anchor: 'start' }) +
          svg.text(330, mid + 8, r.description, { cls: 't-muted sig-desc', anchor: 'start' }), at) +
        svg.pop(svg.circle(36, mid, 13, { cls: 'signal' }), at + 200) +
        svg.halo(36, mid, 13, { z: r.z, at: at + 300 }) +
        svg.trace(`M${W - tagW - 66} ${mid}L${tx - 8} ${mid}`, { cls: 'wire link', at: at + 350, dur: 220 }) +
        svg.pop(svg.g(svg.rect(tx, y + 10, tagW, rh - 20, { cls: 'zone', r: (rh - 20) / 2 }) +
          svg.text(tx + tagW / 2, mid + 8, r.tag, { cls: 'z-text sig-tag' }), {}), at + 500),
        { cls: `z-${r.z}` });
    }).join('');
    const H = s.rows.length * (rh + rg) - rg;
    const label = `${s.title}. ${s.rows.map((r) => `${r.label}: ${r.description}. Move to ${r.tag}.`).join(' ')}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, 'signals')}${html.footnote(s.footnote)}`;
  };

  /* Rising phases: a staircase whose risers are gates the dot must cross; the target stage is purple.
     Data: stages[{label,name,icon,description,target?}], stageLabel? ('Phase'), gateLabel? ('✓ evidence'). */
  const phases = (s) => {
    const W = 1440;
    const n = s.stages.length;
    const gap = 20;
    const bw = (W - gap * (n - 1)) / n;
    const rise = 72;
    const top = (i) => 64 + (n - 1 - i) * rise;
    const base = top(0) + 220;
    const xs = s.stages.map((_, i) => i * (bw + gap));
    const stageLabel = (s.stageLabel || 'Phase').toUpperCase();
    const gateLabel = s.gateLabel || '✓ evidence';
    let walk = `M${xs[0]} ${top(0)}`;
    let body = '';
    s.stages.forEach((st, i) => {
      const x = xs[i];
      const y = top(i);
      const at = 350 + 380 * i;
      walk += `L${x + bw} ${y}` + (i < n - 1 ? `L${xs[i + 1]} ${top(i + 1)}` : '');
      const cls = st.target ? 'z-purple' : 'z-accent';
      body += svg.g(svg.enter(
        svg.rect(x, y, bw, base - y, { cls: st.target ? 'zone' : 'box', r: 18 }) +
        svg.text(x + 26, y + 46, `${stageLabel} ${st.label}`, { cls: 't-xs t-mono z-text phase-label', anchor: 'start' }) +
        svg.text(x + bw - 26, y + 50, st.icon, { cls: 't-emoji', anchor: 'end' }) +
        svg.text(x + 26, y + 92, st.name, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 26, y + 130, st.description, { cls: 't-muted phase-desc', anchor: 'start', max: 28, lh: 28 }), at), { cls });
      if (i < n - 1) {
        const gx = x + bw + gap / 2;
        const gy = top(i + 1) - 34;
        body += svg.pop(svg.g(
          svg.rect(gx - 66, gy - 18, 132, 34, { cls: 'zone', r: 17 }) +
          svg.text(gx, gy + 6, gateLabel, { cls: 't-xs z-text gate-label' }), { cls: 'z-green' }), at + 450);
      }
    });
    const tx = xs[n - 1] + bw / 2;
    const target = s.stages.find((st) => st.target);
    const label = `${s.title}. ${s.stages.map((st) => `${stageLabel.toLowerCase()} ${st.label}, ${st.name}: ${st.description}`).join('. ')}. A gate (${gateLabel}) separates each step${target ? `; ${target.name} is the target` : ''}.`;
    return `${html.head(s)}${svg.scene(W, base, label,
      body + svg.trace(walk, { cls: 'route z-accent stair', at: 400, dur: 1600 }) +
      svg.halo(tx, top(n - 1), 12, { z: 'purple', at: 2400 }) +
      svg.ride(walk, { z: 'green', at: 2200, dur: 3600, r: 7 }), 'phases')}${html.footnote(s.footnote)}`;
  };

  window.PATTERNS = { terminal, showdown, scorecard, relay, patterns: relay, signals, 'four-phases': phases };
})();
