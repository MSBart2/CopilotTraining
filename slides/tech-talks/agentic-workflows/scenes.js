/*
  Deck-only title and closing visuals. Teaching diagrams reuse shared frames and patterns.
*/
(() => {
  const { svg, measure } = window.Kit;

  /* Title visual: Continuous AI on Actions runners at the centre, the Agent Factory's workflow families
     around it, each with one GitHub-published result and coloured by what it writes. */
  const USE_RING = 760;
  const useCaseRing = (s) => {
    const W = USE_RING;
    const C = W / 2;
    const cy = 384;
    const rx = 268;
    const ry = 236;
    const kinds = Object.fromEntries(s.triggers.map((t) => [t.key, t]));
    const nodes = s.uses.map((u, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / s.uses.length;
      return { ...u, z: kinds[u.kind].z, x: C + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
    });
    const arc = `M${C - rx} ${cy}A${rx} ${ry} 0 1 1 ${C + rx} ${cy}A${rx} ${ry} 0 1 1 ${C - rx} ${cy}Z`;
    let body = svg.path(arc, { cls: 'ring' }) + svg.circle(C, cy, 140, { cls: 'ring' });
    nodes.forEach((n, i) => {
      const d = `M${C} ${cy}L${n.x.toFixed(1)} ${n.y.toFixed(1)}`;
      body += svg.g(svg.trace(d, { at: 500 + 90 * i, dur: 700 }), { cls: `z-${n.z}` }) +
        svg.ride(d, { z: n.z, at: 1500 + 380 * i, dur: 3040, r: 6 });
    });
    nodes.forEach((n, i) => {
      const w = Math.round(Math.max(measure(n.label, 19), measure(n.stat, 15)) + 36);
      const h = 66;
      const card = svg.g(svg.rect(n.x - w / 2, n.y - h / 2, w, h, { cls: 'zone', r: 14 }) +
        svg.text(n.x, n.y - 6, n.label, { cls: 't-sm z-text' }), { cls: `z-${n.z}` }) +
        svg.text(n.x, n.y + 20, n.stat, { cls: 't-xs t-muted' });
      body += svg.pop(card, 700 + 90 * i);
    });
    const cw = 230;
    const ch = 150;
    body += svg.pop(svg.g(svg.rect(C - cw / 2, cy - ch / 2, cw, ch, { cls: 'box task', r: 20 }), { cls: 'z-purple' }) +
      svg.text(C, cy - 34, s.centre.kicker, { cls: 't-xs t-mono' }) +
      svg.text(C, cy + 8, s.centre.title, { cls: 't-lg' }) +
      svg.text(C, cy + 44, s.centre.detail, { cls: 't-muted t-sm' }), 150);
    body += svg.halo(C, cy, 122, { z: 'purple', at: 1200 });
    body += svg.g(svg.text(C, 54, s.ringLabel, { cls: 't-xs t-mono' }), { cls: 'z-purple' });
    const legend = s.triggers.map((t) => ({ ...t, w: Math.round(measure(t.label, 17) + 36) }));
    const gap = 16;
    let x = C - (legend.reduce((sum, t) => sum + t.w, 0) + gap * (legend.length - 1)) / 2;
    legend.forEach((t, i) => {
      body += svg.pop(svg.chip(x, 672, t.label, { z: t.z, size: 17, h: 36, pad: 18 }).markup, 1700 + 120 * i);
      x += t.w + gap;
    });
    body += svg.text(C, 742, s.ringFoot, { cls: 't-xs t-muted' });
    const label = `${s.ringLabel}. ${s.centre.title} ${s.centre.kicker.toLowerCase()}: ${nodes.map((n) => `${n.label}, ${n.stat} (${kinds[n.kind].label})`).join('; ')}. ${s.ringFoot}`;
    return svg.scene(W, W, label, body, 'use-case-ring');
  };

  /* Gap lanes: one illustrative issue fans out to a keyword script, an agentic workflow, and a model
     holding a write token; each lane shows the output it produces, including what a hidden line does.
     Data: issue{kicker,trigger,title,body,hiddenLabel,hidden,meta}, lanes[3]{kicker,title,z,hero?,mech,chips[{label,z}],result,ok}. */
  const gapLanes = (s) => {
    const W = 1440;
    const iw = 404;
    const lx = 524;
    const lw = W - lx;
    const rowH = 140;
    const rowGap = 20;
    const H = s.lanes.length * (rowH + rowGap) - rowGap;
    const iy = 0;
    const ih = H;
    const is = s.issue;
    let body = '';

    body += svg.enter(svg.g(svg.rect(0, iy, iw, ih, { cls: 'zone', r: 20 }), { cls: 'z-local' }) +
      svg.g(svg.text(28, iy + 44, is.kicker.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-local' }) +
      svg.lines(28, iy + 96, is.title, { cls: 't-lg', anchor: 'start', max: 22, lh: 38 }) +
      svg.lines(28, iy + 190, is.body, { cls: 't-sm t-muted', anchor: 'start', max: 34, lh: 28 }), 150);
    const trig = svg.chip(0, 0, is.trigger, { z: 'local', size: 15, h: 32, pad: 14 });
    body += svg.pop(svg.chip(iw - 24 - trig.w, iy + 20, is.trigger, { z: 'local', size: 15, h: 32, pad: 14 }).markup, 500);
    const hy = iy + 292;
    body += svg.pop(svg.g(
      svg.rect(20, hy, iw - 40, 96, { cls: 'zone dashed', r: 14 }) +
      svg.text(40, hy + 36, is.hiddenLabel.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(40, hy + 70, is.hidden, { cls: 't-sm', anchor: 'start' }), { cls: 'z-orange' }), 800);
    body += svg.enter(svg.text(28, ih - 30, is.meta, { cls: 't-xs t-mono t-muted', anchor: 'start' }), 400);

    s.lanes.forEach((lane, i) => {
      const top = i * (rowH + rowGap);
      const mid = top + rowH / 2;
      const at = 1500 + 450 * i;
      const wire = Kit.curve(iw, H / 2, lx, mid);
      body += svg.g(svg.trace(wire, { cls: lane.hero ? 'route' : 'wire', at: 1100 + 150 * i, dur: 700 }), { cls: `z-${lane.z}` }) +
        svg.ride(wire, { z: lane.z, at: 1900 + 450 * i, dur: 2600, r: 6 });

      const frame = svg.g(svg.rect(lx, top, lw, rowH, { cls: lane.hero ? 'zone' : 'box soft', r: 18 }), { cls: `z-${lane.z}` });
      const id = svg.g(svg.text(lx + 30, top + 42, lane.kicker.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: `z-${lane.z}` }) +
        svg.text(lx + 30, top + 80, lane.title, { cls: 't-lg', anchor: 'start' }) +
        svg.text(lx + 30, top + 114, lane.mech, { cls: 't-xs t-mono t-muted', anchor: 'start' });
      const ox = lx + 420;
      const divider = svg.path(`M${ox - 28} ${top + 24}L${ox - 28} ${top + rowH - 24}`, { cls: 'wire faint' });
      body += svg.enter(frame + id + divider, at);

      let cx0 = ox;
      const chips = lane.chips.map((c, k) => {
        const chip = svg.chip(cx0, top + 30, c.label, { z: c.z, size: 17, h: 36, pad: 16 });
        cx0 += chip.w + 12;
        return svg.pop(chip.markup, at + 350 + 120 * k);
      }).join('');
      body += chips + svg.enter(svg.lines(ox, top + 100, lane.result, { cls: lane.hero ? 't-sm' : 't-sm t-muted', anchor: 'start', max: 46, lh: 26 }), at + 500);

      const mx = W - 56;
      body += svg.pop(svg.g(
        svg.circle(mx, mid, 26, { cls: 'stop' }) +
        svg.text(mx, mid + 9, lane.ok ? '✓' : '✗', { cls: 't-lg z-text' }), { cls: lane.ok ? 'z-green' : 'z-orange' }), at + 750);
      if (lane.hero) body += svg.halo(mx, mid, 34, { z: 'green', at: at + 1100 });
    });

    body += svg.pop(svg.g(svg.circle(iw, H / 2, 9, { cls: 'stop' }), { cls: 'z-local' }), 1000);

    const label = `Illustrative issue ${is.kicker}, ${is.trigger} starts all three automations: ${is.title}. ${is.body} ${is.hiddenLabel}: ${is.hidden}. ${s.lanes.map((l) =>
      `${l.title} (${l.mech}): ${l.chips.map((c) => c.label).join(', ')}. ${l.result}. ${l.ok ? 'Acceptable' : 'Not acceptable'}.`).join(' ')}`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'gap-lanes')}${Kit.html.footnote(s.footnote)}`;
  };
  /* Task sort: real tasks run through the three-part test; only a row passing all three routes to an
     agentic workflow, and every other row names the tool it belongs in.
     Data: checks[3]{label,z}, rows[{task,detail,pass[3],route,z}]. */
  const taskSort = (s) => {
    const W = 1440;
    const headH = 44;
    const rowH = 70;
    const rowGap = 10;
    const H = headH + s.rows.length * (rowH + rowGap) - rowGap;
    const cols = [700, 830, 960];
    const rx = W - 24;
    let body = '';
    body += svg.text(28, 26, 'TASK', { cls: 't-xs t-mono t-muted', anchor: 'start' });
    s.checks.forEach((c, k) => {
      body += svg.g(svg.text(cols[k], 26, c.label.toUpperCase(), { cls: 't-xs t-mono z-text' }), { cls: `z-${c.z}` });
    });
    body += svg.text(rx, 26, 'BELONGS IN', { cls: 't-xs t-mono t-muted', anchor: 'end' });

    s.rows.forEach((row, i) => {
      const top = headH + i * (rowH + rowGap);
      const mid = top + rowH / 2;
      const at = 300 + 260 * i;
      const all = row.pass.every(Boolean);
      const frame = all
        ? svg.g(svg.rect(0, top, W, rowH, { cls: 'zone', r: 14 }), { cls: 'z-purple' })
        : svg.rect(0, top, W, rowH, { cls: 'box soft', r: 14 });
      body += svg.enter(frame +
        svg.text(28, mid - 4, row.task, { cls: all ? 't-sm' : 't-sm t-muted', anchor: 'start' }) +
        svg.text(28, mid + 22, row.detail, { cls: 't-xs t-mono t-muted', anchor: 'start' }), at);
      row.pass.forEach((ok, k) => {
        const mark = ok
          ? svg.g(svg.circle(cols[k], mid, 15, { cls: 'stop' }) + svg.text(cols[k], mid + 6, '✓', { cls: 't-sm z-text' }), { cls: 'z-green' })
          : svg.text(cols[k], mid + 7, '✗', { cls: 't-sm t-muted' });
        body += svg.pop(mark, at + 120 + 90 * k);
      });
      const w = svg.chip(0, 0, row.route, { z: row.z, size: 17, h: 36, pad: 16 }).w;
      body += svg.pop(svg.chip(rx - w, mid - 18, row.route, { z: row.z, size: 17, h: 36, pad: 16 }).markup, at + 480);
    });

    const label = `${s.title}. ${s.rows.map((r) => `${r.task} (${r.detail}): ${s.checks.map((c, k) => `${c.label} ${r.pass[k] ? 'yes' : 'no'}`).join(', ')}; belongs in ${r.route}`).join('. ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'task-sort')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Factory scorecard: the shared scorecard plus a footnote that carries a live source link.
     Data: cards (as scorecard), footnote, link{href,label}. */
  const linkFoot = (text, link) => {
    const { esc } = window.Kit;
    const a = link
      ? ` <a class="foot-link" href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label)} ↗</a>`
      : '';
    return `<p class="footnote">${esc(text || '')}${a}</p>`;
  };

  const factoryScorecard = (s) => `${window.PATTERNS.scorecard({ ...s, footnote: '' })}${linkFoot(s.footnote, s.link)}`;

  /* The shared four-phases pattern with a clickable source link in the footnote. Data: four-phases data + footnote, link{label,href}. */
  const wizardLink = (s) => `${window.PATTERNS['four-phases']({ ...s, footnote: '' })}${linkFoot(s.footnote, s.link)}`;

  /* IssueOps lanes: who acts at each stage. Rows are actors (person, agent, repository write);
     columns are stages. A token walks down each column, then hands off to the next person.
     Data: lanes[3]{icon,label,z}, phases[{title,cells[3]{title,detail,chips?,z?}}]. */
  const issueopsLanes = (s) => {
    const W = 1440;
    const labelW = 150;
    const gapX = 64;
    const headH = 46;
    const rowH = 124;
    const gapY = 20;
    const colW = (W - labelW - gapX * (s.phases.length - 1)) / s.phases.length;
    const H = headH + 3 * rowH + 2 * gapY;
    const colX = (c) => labelW + c * (colW + gapX);
    const rowY = (r) => headH + r * (rowH + gapY);
    const pad = 26;
    let body = '';

    s.lanes.forEach((lane, r) => {
      const y = rowY(r) + rowH / 2;
      body += svg.enter(svg.g(
        svg.text(0, y - 4, lane.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(0, y + 32, lane.label.toUpperCase(), { cls: 't-xs t-mono z-text col-label', anchor: 'start' }), { cls: `z-${lane.z}` }), 150 + 80 * r);
    });

    const pts = [];
    s.phases.forEach((p, c) => {
      const x = colX(c);
      const mx = x + colW / 2;
      if (c) pts.push([x - 4, rowY(0) + rowH / 2]);
      pts.push([mx, rowY(0) + rowH / 2], [mx, rowY(2) + rowH / 2]);
      if (c < s.phases.length - 1) pts.push([x + colW + 4, rowY(2) + rowH / 2]);
    });
    const walk = Kit.through(pts);
    body += svg.path(walk, { cls: 'wire faint' });
    body += svg.trace(walk, { cls: 'wire link', at: 500, dur: 3400 });

    s.phases.forEach((p, c) => {
      const x = colX(c);
      const base = 400 + 1100 * c;
      body += svg.enter(svg.text(x + 4, 26, `${c + 1} · ${p.title.toUpperCase()}`, { cls: 't-sm t-mono col-label', anchor: 'start' }), base - 200);
      p.cells.forEach((cell, r) => {
        const y = rowY(r);
        const z = cell.z || s.lanes[r].z;
        let inner = svg.rect(x, y, colW, rowH, { cls: 'zone', r: 16 });
        inner += svg.text(x + pad, y + 46, cell.title, { cls: 'aw-cell-title', anchor: 'start' });
        if (cell.chips) {
          let cx0 = x + pad;
          cell.chips.forEach((label) => {
            const chip = svg.chip(cx0, y + 66, label, { z, size: 16, h: 30, pad: 12 });
            inner += chip.markup;
            cx0 += chip.w + 10;
          });
          if (cell.detail) inner += svg.text(x + colW - pad, y + 46, cell.detail, { cls: 'aw-cell-detail t-mono', anchor: 'end' });
        } else {
          inner += svg.text(x + pad, y + 84, cell.detail, { cls: 'aw-cell-detail', anchor: 'start' });
        }
        body += svg.enter(svg.g(inner, { cls: `z-${z}` }), base + 300 * r);
      });
    });
    body += svg.ride(walk, { z: 'purple', at: 3900, dur: 5200, r: 8 });

    const label = `${s.title}. ${s.phases.map((p, c) => `${c + 1}, ${p.title}: ${p.cells.map((cell, r) => `${s.lanes[r].label}: ${cell.title}, ${cell.chips ? `${cell.chips.join(', ')}${cell.detail ? `, ${cell.detail}` : ''}` : cell.detail}`).join('; ')}`).join('. ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'issueops-lanes')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Route fork: one planned issue, one human decision, two implementation routes that rejoin at human review.
     Data: issue{kicker,title}, decide{icon,label}, top{kicker,best,z,stations[{label,chip}],between},
     bottom{kicker,best,z,session,steps[],gate}, merge{icon,title,detail}. */
  const routeFork = (s) => {
    const W = 1440;
    const H = 500;
    const cy = 250;
    const ty = 140;
    const by = 360;
    const srcW = 220;
    const dx = 300;
    const mergeX = 1220;
    const t0 = 430;
    const t1 = 1110;
    let body = '';

    const track = (y) => Kit.through([[dx + 36, cy], [t0 - 10, y], [t1 + 10, y], [mergeX, cy]]);
    const topPath = track(ty);
    const botPath = track(by);
    body += svg.path(topPath, { cls: 'wire faint' }) + svg.path(botPath, { cls: 'wire faint' });
    body += svg.g(svg.trace(topPath, { cls: 'route', at: 1000, dur: 1600 }), { cls: `z-${s.top.z}` });
    body += svg.g(svg.trace(botPath, { cls: 'route', at: 1200, dur: 1600 }), { cls: `z-${s.bottom.z}` });
    body += svg.path(`M${srcW} ${cy}L${dx - 36} ${cy}`, { cls: 'wire link' });

    body += svg.enter(svg.g(
      svg.rect(0, cy - 74, srcW, 148, { cls: 'zone', r: 16 }) +
      svg.text(24, cy - 32, s.issue.kicker, { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
      svg.lines(24, cy + 4, s.issue.title, { cls: 'aw-cell-title', anchor: 'start', max: 16, lh: 30 }), { cls: 'z-green' }), 200);

    body += svg.pop(svg.g(
      svg.circle(dx, cy, 36, { cls: 'stop' }) +
      svg.text(dx, cy + 12, s.decide.icon, { cls: 't-emoji' }) +
      svg.lines(dx, cy + 66, s.decide.label, { cls: 't-sm z-text', max: 14, lh: 22 }), { cls: 'z-orange' }), 600);

    const top = s.top;
    body += svg.enter(svg.g(
      svg.text(t0, ty - 76, top.kicker.toUpperCase(), { cls: 't-sm t-mono z-text col-label', anchor: 'start' }) +
      svg.text(t1, ty - 76, top.best, { cls: 'aw-cell-detail', anchor: 'end' }), { cls: `z-${top.z}` }), 1000);
    const sx = (i) => t0 + 70 + i * ((t1 - t0 - 140) / (top.stations.length - 1));
    top.stations.forEach((st, i) => {
      const x = sx(i);
      const chip = svg.chip(0, 0, st.chip, { size: 14, h: 26, pad: 10 });
      body += svg.pop(svg.g(
        svg.circle(x, ty, 20, { cls: 'stop' }) +
        svg.text(x, ty - 32, st.label, { cls: 'aw-cell-title' }) +
        svg.chip(x - chip.w / 2, ty + 32, st.chip, { z: top.z, size: 14, h: 26, pad: 10 }).markup, { cls: `z-${top.z}` }), 1400 + 260 * i);
      if (i < top.stations.length - 1) {
        const mx = (x + sx(i + 1)) / 2;
        body += svg.pop(svg.g(
          svg.rect(mx - 9, ty - 9, 18, 18, { cls: 'stop', r: 3 }) +
          svg.text(mx, ty - 22, top.between, { cls: 't-xs z-text' }), { cls: 'z-orange' }), 1530 + 260 * i);
      }
    });

    const bot = s.bottom;
    const sessW = 520;
    const gateX = t0 + sessW + 110;
    let sess = svg.rect(t0, by - 38, sessW, 76, { cls: 'zone', r: 38 }) +
      svg.text(t0 + 30, by - 4, bot.session, { cls: 'aw-cell-title', anchor: 'start' });
    let sxp = t0 + 30;
    bot.steps.forEach((label) => {
      const chip = svg.chip(sxp, by + 6, label, { z: bot.z, size: 14, h: 24, pad: 10 });
      sess += chip.markup;
      sxp += chip.w + 8;
    });
    body += svg.enter(svg.g(sess, { cls: `z-${bot.z}` }), 1600);
    body += svg.pop(svg.g(
      svg.rect(gateX - 6, by - 34, 12, 68, { cls: 'stop', r: 6 }) +
      svg.text(gateX, by - 46, bot.gate, { cls: 't-sm t-mono z-text' }), { cls: 'z-green' }), 2000);
    body += svg.enter(svg.g(
      svg.text(t0, by + 86, bot.kicker.toUpperCase(), { cls: 't-sm t-mono z-text col-label', anchor: 'start' }) +
      svg.text(t1, by + 86, bot.best, { cls: 'aw-cell-detail', anchor: 'end' }), { cls: `z-${bot.z}` }), 1600);

    const m = s.merge;
    body += svg.enter(svg.g(
      svg.rect(mergeX, cy - 74, W - mergeX, 148, { cls: 'zone', r: 16 }) +
      svg.text(mergeX + 24, cy - 22, m.icon, { cls: 't-emoji', anchor: 'start' }) +
      svg.text(mergeX + 24, cy + 22, m.title, { cls: 'aw-cell-title', anchor: 'start' }) +
      svg.text(mergeX + 24, cy + 50, m.detail, { cls: 'aw-cell-detail', anchor: 'start' }), { cls: 'z-orange' }), 2400);

    body += svg.ride(topPath, { z: top.z, at: 2800, dur: 4200, r: 7 });
    body += svg.ride(botPath, { z: bot.z, at: 3100, dur: 4200, r: 7 });

    const label = `${s.title}. ${s.issue.kicker} ${s.issue.title} reaches ${s.decide.label}. Route one, ${top.kicker}: ${top.stations.map((st) => `${st.label} (${st.chip})`).join(', ')}, ${top.between} between stages; ${top.best}. Route two, ${bot.kicker}: ${bot.session}, ${bot.steps.join(', ')}, then ${bot.gate}; ${bot.best}. Both end at ${m.title}, ${m.detail}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'route-fork')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Actor chain: who holds which authority, in run order. Phases group the actors before, during, and after the run.
     Data: phases[{label,from,to}], actors[{icon,name,role,z,does,limit{label,text}}]. */
  const actorChain = (s) => {
    const W = 1440;
    const n = s.actors.length;
    const gap = 34;
    const cw = (W - gap * (n - 1)) / n;
    const top = 58;
    const ch = 330;
    const H = top + ch;
    const pad = 22;
    const cx = (i) => i * (cw + gap);
    let body = '';

    s.phases.forEach((p, k) => {
      const x1 = cx(p.from);
      const x2 = cx(p.to) + cw;
      body += svg.enter(
        svg.path(`M${x1 + 6} 40L${x1 + 6} 30L${x2 - 6} 30L${x2 - 6} 40`, { cls: 'wire' }) +
        svg.text((x1 + x2) / 2, 18, p.label.toUpperCase(), { cls: 't-xs t-mono col-label' }), 100 + 150 * k);
    });

    s.actors.forEach((a, i) => {
      const x = cx(i);
      const at = 400 + 380 * i;
      let inner = svg.rect(x, top, cw, ch, { cls: 'zone', r: 18 }) +
        svg.text(x + pad, top + 52, a.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(x + pad, top + 98, a.name, { cls: 'aw-cell-title', anchor: 'start' }) +
        svg.lines(x + pad, top + 126, a.role, { cls: 'aw-cell-detail', anchor: 'start', max: 26, lh: 22 }) +
        svg.path(`M${x + pad} ${top + 170}L${x + cw - pad} ${top + 170}`, { cls: 'wire faint' }) +
        svg.text(x + pad, top + 200, 'DOES', { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
        svg.lines(x + pad, top + 226, a.does, { cls: 't-sm', anchor: 'start', max: 26, lh: 22 }) +
        svg.text(x + pad, top + 278, a.limit.label.toUpperCase(), { cls: 't-xs t-mono t-muted col-label', anchor: 'start' }) +
        svg.lines(x + pad, top + 302, a.limit.text, { cls: 't-sm t-muted', anchor: 'start', max: 26, lh: 22 });
      body += svg.enter(svg.g(inner, { cls: `z-${a.z}` }), at);
      if (i < n - 1) {
        const ax = x + cw + gap / 2;
        const ay = top + 80;
        body += svg.pop(svg.path(`M${ax - 7} ${ay - 9}L${ax + 4} ${ay}L${ax - 7} ${ay + 9}`, { cls: 'wire link' }), at + 250);
      }
    });

    const label = `${s.title}. ${s.actors.map((a) => `${a.name}, ${a.role}: does ${a.does}; ${a.limit.label} ${a.limit.text}`).join('. ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'actor-chain')}${Kit.html.footnote(s.footnote)}`;
  };

  /* File anatomy: a condensed source file with its two halves bracketed and explained.
     Data: file, code[{t, part:'fm'|'body'}], halves{fm,body}{kicker,title,z,chips[]}, compile{cmd,out}. */
  const fileAnatomy = (s) => {
    const W = 1440;
    const lh = 25;
    const codeW = 790;
    const barH = 40;
    const padY = 22;
    const H = barH + padY * 2 + s.code.length * lh;
    const rx = codeW + 70;
    const rw = W - rx;
    const exp = /(\$\{\{[^}]*\}\})/;
    const esc = window.Kit.esc;
    let body = '';

    body += svg.rect(0, 0, codeW, H, { cls: 'box', r: 16 });
    body += svg.path(`M0 ${barH}L${codeW} ${barH}`, { cls: 'wire faint' });
    ['orange', 'green', 'local'].forEach((z, i) => { body += svg.g(svg.circle(24 + 22 * i, barH / 2, 6, { cls: 'stop' }), { cls: `z-${z}` }); });
    body += svg.text(codeW / 2, barH / 2 + 6, s.file, { cls: 't-xs t-mono' });

    const span = { fm: [], body: [] };
    s.code.forEach((ln, i) => {
      const y = barH + padY + i * lh + 18;
      span[ln.part].push(y);
      const raw = ln.t;
      let tspans;
      if (raw === '---') tspans = `<tspan class="aw-code-fence">${esc(raw)}</tspan>`;
      else if (raw.startsWith('#')) tspans = `<tspan class="aw-code-head">${esc(raw)}</tspan>`;
      else if (ln.part === 'fm' && raw.includes(':')) {
        const k = raw.indexOf(':');
        tspans = `<tspan class="aw-code-key">${esc(raw.slice(0, k + 1))}</tspan><tspan>${esc(raw.slice(k + 1))}</tspan>`;
      } else {
        tspans = raw.split(exp).map((part) => (exp.test(part) ? `<tspan class="aw-code-expr">${esc(part)}</tspan>` : `<tspan>${esc(part)}</tspan>`)).join('');
      }
      body += svg.enter(`<text x="26" y="${y}" xml:space="preserve" class="aw-code">${tspans}</text>`, 200 + 45 * i);
    });

    const half = (key, at) => {
      const h = s.halves[key];
      const ys = span[key];
      const y1 = ys[0] - 14;
      const y2 = ys[ys.length - 1] + 2;
      const mid = (y1 + y2) / 2;
      const bx = codeW + 18;
      let g = svg.path(`M${bx} ${y1}L${bx + 12} ${y1}L${bx + 12} ${y2}L${bx} ${y2}`, { cls: 'route' }) +
        svg.path(`M${bx + 12} ${mid}L${rx} ${mid}`, { cls: 'route' });
      const cardH = 150;
      const cy0 = Math.max(0, Math.min(H - cardH, mid - cardH / 2));
      g += svg.rect(rx, cy0, rw, cardH, { cls: 'zone', r: 16 }) +
        svg.text(rx + 24, cy0 + 34, h.kicker.toUpperCase(), { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
        svg.text(rx + 24, cy0 + 70, h.title, { cls: 'aw-cell-title', anchor: 'start' });
      let chx = rx + 24;
      h.chips.forEach((c) => {
        const chip = svg.chip(chx, cy0 + 94, c, { z: h.z, size: 15, h: 28, pad: 11 });
        g += chip.markup;
        chx += chip.w + 8;
      });
      return svg.enter(svg.g(g, { cls: `z-${h.z}` }), at);
    };
    body += half('fm', 1300);
    body += half('body', 1900);

    const label = `${s.title}. ${s.file}, condensed: ${s.code.map((l) => l.t).join(' / ')}. ${['fm', 'body'].map((k) => `${s.halves[k].kicker}: ${s.halves[k].title} (${s.halves[k].chips.join(', ')})`).join('. ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'file-anatomy')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Lock jobs: source → compile → lock strip, then the lock's job graph colored by who holds a model or a write.
     Data: files{src,lock}{name,detail}, cmd, jobs[{name,role,kind:'model'|'write'|'infra',perm,row,col}], edges[[from,to]], legend[{kind,text}]. */
  const lockJobs = (s) => {
    const W = 1440;
    const kindZ = { model: 'purple', write: 'green', infra: 'github' };
    const fileW = 470;
    const stripH = 64;
    let body = '';

    const fileCard = (x, f, z, at) => svg.enter(svg.g(
      svg.rect(x, 0, fileW, stripH, { cls: 'zone', r: 14 }) +
      svg.text(x + 22, 40, f.name, { cls: 't-sm t-mono', anchor: 'start' }) +
      svg.text(x + fileW - 22, 40, f.detail, { cls: 't-xs t-muted', anchor: 'end' }), { cls: `z-${z}` }), at);
    body += fileCard(0, s.files.src, 'local', 100);
    const ax1 = fileW + 24;
    const ax2 = W - fileW - 24;
    body += svg.trace(`M${ax1} ${stripH / 2}L${ax2} ${stripH / 2}`, { cls: 'route', at: 350, dur: 600 });
    body += svg.pop(svg.path(`M${ax2 - 12} ${stripH / 2 - 9}L${ax2} ${stripH / 2}L${ax2 - 12} ${stripH / 2 + 9}`, { cls: 'wire link' }), 900);
    body += svg.enter(svg.g(svg.text((ax1 + ax2) / 2, stripH / 2 - 12, s.cmd, { cls: 't-sm t-mono z-text' }), { cls: 'z-github' }), 500);
    body += fileCard(W - fileW, s.files.lock, 'github', 950);

    const top = 120;
    const gap = 40;
    const cw = (W - gap * 4) / 5;
    const rowY = [top, top + 200];
    const ch = 156;
    const pos = (j) => ({ x: j.col * (cw + gap), y: rowY[j.row] });
    const byName = Object.fromEntries(s.jobs.map((j) => [j.name, j]));

    s.edges.forEach(([a, b], k) => {
      const p = pos(byName[a]);
      const q = pos(byName[b]);
      let d;
      if (p.y === q.y) d = `M${p.x + cw} ${p.y + ch / 2}L${q.x} ${q.y + ch / 2}`;
      else d = `M${p.x + cw / 2} ${p.y + ch}L${p.x + cw / 2} ${q.y + ch / 2}L${q.x} ${q.y + ch / 2}`;
      body += svg.trace(d, { cls: 'route', at: 1500 + 180 * k, dur: 400 });
    });

    s.jobs.forEach((j, i) => {
      const { x, y } = pos(j);
      const z = kindZ[j.kind];
      const chip = svg.chip(x + 20, y + ch - 44, j.perm, { z: j.kind === 'model' ? 'local' : z, size: 15, h: 28, pad: 11 });
      const inner = svg.rect(x, y, cw, ch, { cls: 'zone', r: 16 }) +
        svg.text(x + 20, y + 36, j.name, { cls: 'aw-cell-title t-mono', anchor: 'start' }) +
        (j.kind === 'model' ? svg.text(x + cw - 18, y + 36, 'MODEL', { cls: 't-xs t-mono z-text col-label', anchor: 'end' }) : '') +
        svg.lines(x + 20, y + 64, j.role, { cls: 'aw-cell-detail', anchor: 'start', max: 26, lh: 21 }) +
        chip.markup;
      body += svg.enter(svg.g(inner, { cls: `z-${z}` }), 1150 + 150 * i);
    });

    const ly = rowY[1] + 22;
    s.legend.forEach((l, k) => {
      body += svg.enter(svg.g(
        svg.circle(14, ly + k * 48, 9, { cls: 'stop' }) +
        svg.text(36, ly + k * 48 + 6, l.text, { cls: 't-sm', anchor: 'start' }), { cls: `z-${kindZ[l.kind]}` }), 2400 + 120 * k);
    });

    const H = rowY[1] + ch;
    const label = `${s.title}. ${s.files.src.name} (${s.files.src.detail}) compiles with ${s.cmd} to ${s.files.lock.name} (${s.files.lock.detail}). Jobs: ${s.jobs.map((j) => `${j.name}, ${j.kind === 'model' ? 'runs a model, ' : ''}${j.role}, ${j.perm}`).join('; ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'lock-jobs')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Write handoff: the agent job records proposals; a different job on a different runner, holding the write token, checks and applies them.
     Data: agent{kicker,title,token,tools[],file,proposals[]}, gate{title,detail}, writer{kicker,title,token,checks[],result}. */
  const writeHandoff = (s) => {
    const W = 1440;
    const H = 450;
    const bw = 540;
    const pad = 26;
    const rx = W - bw;
    let body = '';

    const box = (x, b, z, at, inner) => svg.enter(svg.g(
      svg.rect(x, 0, bw, H, { cls: 'zone', r: 18 }) +
      svg.text(x + pad, 36, b.kicker.toUpperCase(), { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
      svg.text(x + pad, 76, b.title, { cls: 'aw-cell-title', anchor: 'start' }) +
      svg.chip(x + pad, 94, b.token, { z: b.tokenZ, size: 15, h: 30, pad: 12 }).markup + inner, { cls: `z-${z}` }), at);

    let a = svg.text(pad, 160, 'SAFE-OUTPUT TOOLS IT CAN CALL', { cls: 't-xs t-mono t-muted col-label', anchor: 'start' });
    let tx = pad;
    let ty = 174;
    s.agent.tools.forEach((t) => {
      const c = svg.chip(tx, ty, t, { z: 'purple', size: 15, h: 28, pad: 10 });
      if (tx + c.w > bw - pad) { tx = pad; ty += 36; }
      a += svg.chip(tx, ty, t, { z: 'purple', size: 15, h: 28, pad: 10 }).markup;
      tx += c.w + 8;
    });
    const fy = ty + 56;
    a += svg.rect(pad, fy, bw - pad * 2, H - fy - pad, { cls: 'box', r: 12 }) +
      svg.text(pad + 18, fy + 30, s.agent.file, { cls: 't-xs t-mono t-muted', anchor: 'start' });
    s.agent.proposals.forEach((p, k) => { a += svg.text(pad + 18, fy + 64 + 28 * k, p, { cls: 'aw-code', anchor: 'start' }); });
    body += box(0, s.agent, 'purple', 100, a);

    const mx1 = bw + 18;
    const mx2 = rx - 18;
    const mid = (mx1 + mx2) / 2;
    const my = H / 2;
    const d = `M${mx1} ${my}L${mx2} ${my}`;
    body += svg.trace(d, { cls: 'route', at: 1000, dur: 700 });
    body += svg.ride(d, { z: 'purple', at: 1100, dur: 1400, r: 8 });
    body += svg.pop(svg.path(`M${mx2 - 12} ${my - 9}L${mx2} ${my}L${mx2 - 12} ${my + 9}`, { cls: 'wire link' }), 1600);
    body += svg.enter(svg.g(
      svg.rect(mid - 92, my - 42, 184, 84, { cls: 'zone', r: 14 }) +
      svg.text(mid, my - 8, s.gate.title, { cls: 't-sm' }) +
      svg.text(mid, my + 20, s.gate.detail, { cls: 't-xs t-muted' }), { cls: 'z-orange' }), 1200);
    body += svg.enter(svg.lines(mid, my + 80, s.handoff, { cls: 't-xs t-mono t-muted', max: 18, lh: 20 }), 1200);

    let w = svg.text(rx + pad, 160, 'CHECKS BEFORE ANY WRITE', { cls: 't-xs t-mono t-muted col-label', anchor: 'start' });
    s.writer.checks.forEach((c, k) => {
      const y = 196 + 36 * k;
      w += svg.text(rx + pad, y, '✓', { cls: 't-sm z-text', anchor: 'start' }) +
        svg.text(rx + pad + 28, y, c, { cls: 't-sm', anchor: 'start' });
    });
    const ry = H - 86;
    w += svg.rect(rx + pad, ry, bw - pad * 2, 60, { cls: 'box', r: 12 }) +
      svg.text(rx + bw / 2, ry + 37, s.writer.result, { cls: 't-sm z-text' });
    body += box(rx, s.writer, 'green', 2000, w);

    const label = `${s.title}. ${s.agent.title} (${s.agent.kicker}, ${s.agent.token}) can call ${s.agent.tools.join(', ')} and records ${s.agent.proposals.join('; ')} in ${s.agent.file}. ${s.handoff}, through ${s.gate.title}: ${s.gate.detail}. ${s.writer.title} (${s.writer.kicker}, ${s.writer.token}) checks ${s.writer.checks.join('; ')}, then ${s.writer.result}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'write-handoff')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Injection gates: one hostile issue tries five moves along the run; each meets an independent gate.
     Data: source{kicker,title}, target{kicker,title}, zones[{label,from,to,z}], gates[{ask,name,stops,open?,openNote?}]. */
  const injectionGates = (s) => {
    const W = 1440;
    const nodeW = 150;
    const n = s.gates.length;
    const gx0 = nodeW + 30;
    const colW = (W - 2 * gx0) / n;
    const lineY = 210;
    const H = 470;
    const gxc = (i) => gx0 + colW * i + colW / 2;
    let body = '';

    s.zones.forEach((z, k) => {
      const x1 = gx0 + colW * z.from + 6;
      const x2 = gx0 + colW * (z.to + 1) - 6;
      body += svg.enter(svg.g(
        svg.rect(x1, lineY - 70, x2 - x1, 140, { cls: 'zone', r: 16 }) +
        svg.text((x1 + x2) / 2, lineY + 56, z.label.toUpperCase(), { cls: 't-xs t-mono z-text col-label' }), { cls: `z-${z.z}` }), 100 + 100 * k);
    });

    const node = (x, d, z, at) => svg.enter(svg.g(
      svg.rect(x, lineY - 50, nodeW, 100, { cls: 'zone', r: 14 }) +
      svg.text(x + nodeW / 2, lineY - 16, d.kicker.toUpperCase(), { cls: 't-xs t-mono z-text col-label' }) +
      svg.lines(x + nodeW / 2, lineY + 12, d.title, { cls: 't-sm', max: 14, lh: 22 }), { cls: `z-${z}` }), at);
    body += node(0, s.source, 'orange', 200);
    body += node(W - nodeW, s.target, 'green', 2600);

    const d = `M${nodeW} ${lineY}L${W - nodeW} ${lineY}`;
    body += svg.trace(d, { cls: 'route', at: 400, dur: 1800 });
    body += svg.ride(d, { z: 'orange', at: 500, dur: 2200, r: 8 });

    s.gates.forEach((g, i) => {
      const x = gxc(i);
      const at = 600 + 380 * i;
      const askY = 30;
      let inner = svg.rect(x - colW / 2 + 10, 0, colW - 20, 76, { cls: 'box', r: 12 }) +
        svg.lines(x, askY, `“${g.ask}”`, { cls: 't-sm', max: 20, lh: 22 }) +
        svg.path(`M${x} 80L${x} ${lineY - 44}`, { cls: 'wire faint' });
      inner += svg.path(`M${x} ${lineY - 40}L${x} ${lineY + 40}`, { cls: g.open ? 'aw-gate open' : 'aw-gate' });
      inner += svg.circle(x, lineY, 17, { cls: 'stop' }) + svg.text(x, lineY + 6, String(i + 1), { cls: 't-xs t-mono aw-gate-num' });
      inner += svg.text(x, lineY + 116, g.name, { cls: 'aw-cell-title' }) +
        svg.lines(x, lineY + 146, g.open ? g.openNote : g.stops, { cls: g.open ? 'aw-cell-detail aw-open-note' : 'aw-cell-detail', max: 22, lh: 21 });
      body += svg.enter(svg.g(inner, { cls: g.open ? 'z-orange' : 'z-green' }), at);
    });

    const label = `${s.title}. ${s.source.title} travels toward ${s.target.title}. ${s.gates.map((g, i) => `Gate ${i + 1}, ${g.name}: the issue asks "${g.ask}"; ${g.open ? g.openNote : g.stops}`).join('. ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'injection-gates')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Prompt to draft: the wizard's Finish prompt is pasted into a coding agent in the target repo, which opens a draft PR.
     Data: prompt{kicker,title,lines[{t,kind?:'head'|'add'}],addLabel}, agent{kicker,title,where[],readsLabel,reads[]}, draft{kicker,title,dir,files[],insideLabel,inside[]}. */
  const promptToDraft = (s) => {
    const W = 1440;
    const H = 500;
    const gap = 64;
    const ws = [560, 360, 392];
    const xs = [0, ws[0] + gap, ws[0] + ws[1] + gap * 2];
    const pad = 24;
    const esc = window.Kit.esc;
    let body = '';

    const col = (i, c, z, at, inner) => svg.enter(svg.g(
      svg.rect(xs[i], 0, ws[i], H, { cls: 'zone', r: 18 }) +
      svg.text(xs[i] + pad, 36, c.kicker.toUpperCase(), { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
      svg.text(xs[i] + pad, 74, c.title, { cls: 'aw-cell-title', anchor: 'start' }) + inner, { cls: `z-${z}` }), at);

    const ticks = (x, y, items, at0, step = 34) => items.map((t, k) => svg.enter(
      svg.text(x, y + step * k, '✓', { cls: 't-sm z-text', anchor: 'start' }) +
      svg.text(x + 26, y + step * k, t, { cls: 't-sm', anchor: 'start' }), at0 + 90 * k)).join('');

    const px = xs[0] + pad;
    const boxY = 96;
    let p = svg.rect(px, boxY, ws[0] - pad * 2, H - boxY - pad, { cls: 'box', r: 12 });
    let ly = boxY + 34;
    s.prompt.lines.forEach((ln, k) => {
      if (ln.kind === 'add' && s.prompt.lines[k - 1]?.kind !== 'add') {
        ly += 10;
        p += svg.text(px + 18, ly, s.prompt.addLabel.toUpperCase(), { cls: 't-xs t-mono aw-open-note col-label', anchor: 'start' });
        ly += 28;
      }
      const cls = ln.kind === 'head' ? 'aw-code-head' : ln.kind === 'add' ? 'aw-code-add' : '';
      p += svg.enter(`<text x="${px + 18}" y="${ly}" xml:space="preserve" class="aw-code"><tspan class="${cls}">${esc(ln.t)}</tspan></text>`, 250 + 60 * k);
      ly += 26;
    });
    body += col(0, s.prompt, 'github', 100, p);

    const ax = xs[1] + pad;
    let a = '';
    let wy = 96;
    if (s.agent.setup) {
      const su = s.agent.setup;
      const sh = 80;
      a += svg.enter(svg.g(
        svg.rect(ax, wy, ws[1] - pad * 2, sh, { cls: 'box', r: 12 }) +
        svg.text(ax + 16, wy + 24, su.label.toUpperCase(), { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
        svg.text(ax + 16, wy + 50, su.cmd, { cls: 't-sm t-mono', anchor: 'start' }) +
        svg.text(ax + 16, wy + 70, su.detail, { cls: 't-xs t-muted', anchor: 'start' }), { cls: 'z-github' }), 1200);
      wy += sh + 14;
    }
    s.agent.where.forEach((w) => {
      a += svg.chip(ax, wy, w, { z: 'purple', size: 15, h: 30, pad: 12 }).markup;
      wy += 36;
    });
    a += svg.text(ax, wy + 30, s.agent.readsLabel.toUpperCase(), { cls: 't-xs t-mono t-muted col-label', anchor: 'start' });
    a += ticks(ax, wy + 62, s.agent.reads, 1500, 30);
    body += col(1, s.agent, 'purple', 1100, a);

    const dx = xs[2] + pad;
    const fbH = 40 + 30 * s.draft.files.length;
    let d = svg.rect(dx, 96, ws[2] - pad * 2, fbH, { cls: 'box', r: 12 }) +
      svg.text(dx + 16, 124, s.draft.dir, { cls: 't-xs t-mono t-muted', anchor: 'start' });
    s.draft.files.forEach((f, k) => {
      d += `<text x="${dx + 16}" y="${154 + 30 * k}" xml:space="preserve" class="aw-code"><tspan class="aw-code-add">+ </tspan><tspan>${esc(f)}</tspan></text>`;
    });
    const iy = 96 + fbH + 44;
    d += svg.text(dx, iy, s.draft.insideLabel.toUpperCase(), { cls: 't-xs t-mono t-muted col-label', anchor: 'start' });
    d += ticks(dx, iy + 38, s.draft.inside, 2500);
    body += col(2, s.draft, 'green', 2200, d);

    [0, 1].forEach((i) => {
      const x1 = xs[i] + ws[i] + 8;
      const x2 = xs[i + 1] - 8;
      const y = H / 2;
      const path = `M${x1} ${y}L${x2} ${y}`;
      const at = i ? 2000 : 900;
      body += svg.trace(path, { cls: 'route', at, dur: 300 });
      body += svg.ride(path, { z: i ? 'green' : 'purple', at: at + 100, dur: 600, r: 7 });
      body += svg.pop(svg.path(`M${x2 - 11} ${y - 8}L${x2} ${y}L${x2 - 11} ${y + 8}`, { cls: 'wire link' }), at + 300);
    });

    const label = `${s.title}. ${s.prompt.kicker}: ${s.prompt.lines.map((l) => l.t).join(' ')}. ${s.agent.kicker}: ${s.agent.setup ? `${s.agent.setup.label}, ${s.agent.setup.cmd}, ${s.agent.setup.detail}; then ` : ''}${s.agent.where.join(', ')}; it reads ${s.agent.reads.join(', ')}. ${s.draft.kicker}: ${s.draft.title} adding ${s.draft.files.join(' and ')}, containing ${s.draft.inside.join(', ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'prompt-to-draft')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Draft review: the draft's frontmatter as a review diff, with numbered markers tied to the reviewer's decisions.
     Data: file, code[{t, mark?, add?}], decisions[{n,verb,title,detail,z}]. */
  const draftReview = (s) => {
    const W = 1440;
    const lh = 27;
    const codeW = 700;
    const barH = 40;
    const padY = 20;
    const H = barH + padY * 2 + s.code.length * lh;
    const esc = window.Kit.esc;
    const zOf = Object.fromEntries(s.decisions.map((d) => [d.n, d.z]));
    let body = '';

    body += svg.rect(0, 0, codeW, H, { cls: 'box', r: 16 });
    body += svg.path(`M0 ${barH}L${codeW} ${barH}`, { cls: 'wire faint' });
    body += svg.text(codeW / 2, barH / 2 + 6, s.file, { cls: 't-xs t-mono' });

    s.code.forEach((ln, i) => {
      const top = barH + padY + i * lh;
      const y = top + 19;
      const at = 200 + 40 * i;
      if (ln.add) body += svg.enter(svg.g(svg.rect(8, top, codeW - 16, lh, { cls: 'zone', r: 6 }), { cls: 'z-orange' }), 1600);
      const k = ln.t.indexOf(':');
      const lead = ln.add ? '+ ' : '  ';
      const tspans = k > 0
        ? `<tspan class="${ln.add ? 'aw-code-add' : 'aw-code-key'}">${esc(lead + ln.t.slice(0, k + 1))}</tspan><tspan>${esc(ln.t.slice(k + 1))}</tspan>`
        : `<tspan>${esc(lead + ln.t)}</tspan>`;
      body += svg.enter(`<text x="18" y="${y}" xml:space="preserve" class="aw-code">${tspans}</text>`, at);
      if (ln.mark) {
        const cx = codeW - 30;
        body += svg.pop(svg.g(svg.circle(cx, top + lh / 2, 12, { cls: 'stop' }) +
          svg.text(cx, top + lh / 2 + 5, String(ln.mark), { cls: 't-xs t-mono aw-gate-num' }), { cls: `z-${zOf[ln.mark]}` }), 1300 + 120 * ln.mark);
      }
    });

    const rx = codeW + 44;
    const rw = W - rx;
    const gap = 14;
    const ch = (H - gap * (s.decisions.length - 1)) / s.decisions.length;
    s.decisions.forEach((d, k) => {
      const y = k * (ch + gap);
      const verb = svg.chip(rx + 64, y + 18, d.verb, { z: d.z, size: 14, h: 26, pad: 10 });
      const inner = svg.rect(rx, y, rw, ch, { cls: 'zone', r: 14 }) +
        svg.circle(rx + 34, y + 32, 16, { cls: 'stop' }) +
        svg.text(rx + 34, y + 38, String(d.n), { cls: 't-xs t-mono aw-gate-num' }) +
        verb.markup +
        svg.text(rx + 64 + verb.w + 14, y + 38, d.title, { cls: 'aw-cell-title', anchor: 'start' }) +
        svg.lines(rx + 64, y + 72, d.detail, { cls: 'aw-cell-detail', anchor: 'start', max: 62, lh: 21 });
      body += svg.enter(svg.g(inner, { cls: `z-${d.z}` }), 1400 + 250 * k);
    });

    const label = `${s.title}. ${s.file}: ${s.code.map((l) => `${l.add ? 'added ' : ''}${l.t}${l.mark ? ` (decision ${l.mark})` : ''}`).join(' / ')}. ${s.decisions.map((d) => `${d.n}, ${d.verb}: ${d.title}. ${d.detail}`).join(' ')}`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'draft-review')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Refine loop: a second prompt to the same coding agent, then the staged run loop that earns promotion.
     Data: prompt{kicker,text,detail}, steps[{title,cmd?[],detail,z}], loop{from,to,label}, gateLabel. */
  const refineLoop = (s) => {
    const W = 1440;
    const bubbleH = 110;
    const top = bubbleH + 56;
    const n = s.steps.length;
    const gap = 40;
    const cw = (W - gap * (n - 1)) / n;
    const ch = 220;
    const H = top + ch + 86;
    const sx = (i) => i * (cw + gap);
    let body = '';

    body += svg.enter(svg.g(
      svg.rect(0, 0, W, bubbleH, { cls: 'zone', r: 20 }) +
      svg.text(28, 38, s.prompt.kicker.toUpperCase(), { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
      svg.text(28, 82, s.prompt.text, { cls: 'aw-prompt', anchor: 'start' }) +
      svg.lines(W - 28, 52, s.prompt.detail, { cls: 'aw-cell-detail', anchor: 'end', max: 48, lh: 23 }), { cls: 'z-purple' }), 100);
    const dx = cw / 2;
    body += svg.trace(`M${dx} ${bubbleH + 6}L${dx} ${top - 8}`, { cls: 'route', at: 700, dur: 300 });
    body += svg.pop(svg.path(`M${dx - 8} ${top - 19}L${dx} ${top - 8}L${dx + 8} ${top - 19}`, { cls: 'wire link' }), 950);

    s.steps.forEach((st, i) => {
      const x = sx(i);
      let inner = svg.rect(x, top, cw, ch, { cls: 'zone', r: 16 }) +
        svg.text(x + 20, top + 32, `STEP ${i + 1}`, { cls: 't-xs t-mono z-text col-label', anchor: 'start' }) +
        svg.text(x + 20, top + 68, st.title, { cls: 'aw-cell-title', anchor: 'start' });
      let y = top + 100;
      (st.cmd || []).forEach((c) => { inner += svg.text(x + 20, y, c, { cls: 't-xs t-mono z-text', anchor: 'start' }); y += 22; });
      inner += svg.lines(x + 20, y + (st.cmd ? 8 : 0), st.detail, { cls: 'aw-cell-detail', anchor: 'start', max: 25, lh: 21 });
      body += svg.enter(svg.g(inner, { cls: `z-${st.z}` }), 1000 + 280 * i);
      if (i < n - 1) {
        const y0 = top + ch / 2;
        const x1 = x + cw + 4;
        const x2 = x + cw + gap - 4;
        body += svg.trace(`M${x1} ${y0}L${x2} ${y0}`, { cls: 'route', at: 1200 + 280 * i, dur: 200 });
        body += svg.pop(svg.path(`M${x2 - 9} ${y0 - 7}L${x2} ${y0}L${x2 - 9} ${y0 + 7}`, { cls: 'wire link' }), 1350 + 280 * i);
      }
    });

    const lx1 = sx(s.loop.from) + cw / 2;
    const lx2 = sx(s.loop.to) + cw / 2;
    const ly0 = top + ch + 6;
    const ly1 = top + ch + 46;
    const loop = `M${lx1} ${ly0}L${lx1} ${ly1}L${lx2} ${ly1}L${lx2} ${ly0 + 4}`;
    body += svg.trace(loop, { cls: 'route', at: 2600, dur: 600 });
    body += svg.pop(svg.path(`M${lx2 - 8} ${ly0 + 15}L${lx2} ${ly0 + 4}L${lx2 + 8} ${ly0 + 15}`, { cls: 'wire link' }), 3150);
    body += svg.enter(svg.g(svg.text((lx1 + lx2) / 2, ly1 + 30, s.loop.label, { cls: 't-sm z-text' }), { cls: 'z-orange' }), 2800);
    const gx = sx(n - 1) - gap / 2;
    body += svg.enter(svg.g(svg.text(gx, top - 14, s.gateLabel, { cls: 't-xs t-mono z-text' }), { cls: 'z-green' }), 2400);

    const label = `${s.title}. ${s.prompt.kicker}: ${s.prompt.text}. ${s.prompt.detail}. ${s.steps.map((st, i) => `Step ${i + 1}, ${st.title}: ${(st.cmd || []).join(' ')} ${st.detail}`).join('. ')}. ${s.loop.label}; ${s.gateLabel}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'refine-loop')}${Kit.html.footnote(s.footnote)}`;
  };

  /* Automation fork: Copilot automations and agentic workflows side by side, one practical question per row,
     ending in the choice each column fits. Data: cols[2]{kicker,title,z}, rows[{q,a[2]}], pick{q,a[2]}, footnote, link. */
  const automationFork = (s) => {
    const W = 1440;
    const qW = 236;
    const gap = 18;
    const colW = (W - qW - gap * 2) / 2;
    const xs = [qW + gap, qW + gap * 2 + colW];
    const headH = 82;
    const rowH = 64;
    const rowGap = 10;
    const top = headH + 16;
    const pickY = top + s.rows.length * (rowH + rowGap) + 8;
    const pickH = 84;
    const H = pickY + pickH;
    let body = '';

    s.cols.forEach((c, i) => {
      body += svg.pop(svg.g(svg.rect(xs[i], 0, colW, headH, { cls: 'zone', r: 16 }) +
        svg.text(xs[i] + colW / 2, 30, c.kicker, { cls: 't-xs t-mono z-text' }) +
        svg.text(xs[i] + colW / 2, 62, c.title, { cls: 'aw-cell-title' }), { cls: `z-${c.z}` }), 150 + 200 * i);
    });

    s.rows.forEach((r, k) => {
      const y = top + k * (rowH + rowGap);
      let row = svg.text(0, y + rowH / 2 + 8, r.q, { cls: 'aw-cell-title', anchor: 'start' });
      r.a.forEach((txt, i) => {
        row += svg.g(svg.rect(xs[i], y, colW, rowH, { cls: 'box', r: 12 }), { cls: `z-${s.cols[i].z}` }) +
          svg.text(xs[i] + 22, y + rowH / 2 + 7, txt, { cls: 'aw-fork-cell', anchor: 'start' });
      });
      body += svg.enter(row, 600 + 180 * k);
    });

    const pickAt = 700 + 180 * s.rows.length;
    let pick = svg.g(svg.text(0, pickY + pickH / 2 + 8, s.pick.q, { cls: 'aw-cell-title z-text', anchor: 'start' }), { cls: 'z-orange' });
    s.pick.a.forEach((txt, i) => {
      pick += svg.g(svg.rect(xs[i], pickY, colW, pickH, { cls: 'zone', r: 14 }) +
        svg.text(xs[i] + colW / 2, pickY + pickH / 2 + 8, txt, { cls: 'aw-cell-title' }), { cls: `z-${s.cols[i].z}` });
    });
    body += svg.enter(pick, pickAt);

    const label = `${s.title}. ${s.cols.map((c) => `${c.kicker}: ${c.title}`).join(' versus ')}. ${s.rows.map((r) => `${r.q} ${r.a[0]} / ${r.a[1]}`).join('. ')}. ${s.pick.q}: ${s.pick.a[0]} / ${s.pick.a[1]}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'automation-fork')}${linkFoot(s.footnote, s.link)}`;
  };

  /* Automation tree: a recurring job meets three yes/no questions. Any yes drops to the agentic workflow bar
     with its reason; three noes end at Copilot automation.
     Data: start{kicker,title}, questions[3]{kicker,q,why}, aw{kicker,title}, auto{kicker,title,detail,uses}. */
  const automationTree = (s) => {
    const W = 1440;
    const gap = 54;
    const startW = 170;
    const qW = 282;
    const autoW = W - startW - qW * 3 - gap * 4;
    const topH = 176;
    const mid = topH / 2;
    const barY = topH + 92;
    const barH = 168;
    const H = barY + barH;
    const xs = [startW + gap, startW + gap * 2 + qW, startW + gap * 3 + qW * 2];
    const autoX = xs[2] + qW + gap;
    const arrow = (x1, y1, x2, y2, at) => {
      const d = `M${x1} ${y1}L${x2} ${y2}`;
      const head = y1 === y2
        ? `M${x2 - 11} ${y2 - 8}L${x2} ${y2}L${x2 - 11} ${y2 + 8}`
        : `M${x2 - 8} ${y2 - 11}L${x2} ${y2}L${x2 + 8} ${y2 - 11}`;
      return svg.trace(d, { cls: 'wire link', at, dur: 280 }) + svg.pop(svg.path(head, { cls: 'wire link' }), at + 260);
    };
    let body = '';

    body += svg.pop(svg.g(svg.rect(0, 0, startW, topH, { cls: 'box task', r: 18 }) +
      svg.text(startW / 2, 58, s.start.kicker, { cls: 't-xs t-mono' }) +
      svg.lines(startW / 2, 98, s.start.title, { cls: 'aw-cell-title', max: 12, lh: 28 }), { cls: 'z-orange' }), 150);
    body += arrow(startW + 6, mid, xs[0] - 6, mid, 400);

    const awAt = 700 + 3 * 520;
    s.questions.forEach((q, i) => {
      const x = xs[i];
      const at = 600 + 520 * i;
      body += svg.enter(svg.g(svg.rect(x, 0, qW, topH, { cls: 'zone', r: 18 }) +
        svg.text(x + qW / 2, 40, q.kicker, { cls: 't-xs t-mono z-text' }) +
        svg.lines(x + qW / 2, 84, q.q, { cls: 'aw-cell-title', max: 21, lh: 30 }), { cls: 'z-orange' }), at);
      const nextX = i < 2 ? xs[i + 1] : autoX;
      body += arrow(x + qW + 6, mid, nextX - 6, mid, at + 260) +
        svg.enter(svg.text(x + qW + gap / 2, mid - 14, 'no', { cls: 't-xs t-mono t-muted' }), at + 300);
      body += arrow(x + qW / 2, topH + 6, x + qW / 2, barY - 6, at + 200) +
        svg.enter(svg.g(svg.text(x + qW / 2 + 14, topH + 52, 'yes', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-purple' }), at + 240);
    });

    let bar = svg.rect(0, barY, xs[2] + qW, barH, { cls: 'zone', r: 18 }) +
      svg.text(startW / 2 + 6, barY + 62, s.aw.kicker, { cls: 't-xs t-mono z-text' }) +
      svg.lines(startW / 2 + 6, barY + 98, s.aw.title, { cls: 'aw-cell-title', max: 12, lh: 28 });
    s.questions.forEach((q, i) => {
      bar += svg.lines(xs[i] + qW / 2, barY + 62, q.why, { cls: 'aw-fork-cell', max: 26, lh: 27 });
    });
    body += svg.enter(svg.g(bar, { cls: 'z-purple' }), awAt);

    const auto = svg.rect(autoX, 0, autoW, H, { cls: 'zone', r: 18 }) +
      svg.text(autoX + autoW / 2, 46, s.auto.kicker, { cls: 't-xs t-mono z-text' }) +
      svg.lines(autoX + autoW / 2, 90, s.auto.title, { cls: 'aw-cell-title', max: 16, lh: 30 }) +
      svg.lines(autoX + autoW / 2, 186, s.auto.detail, { cls: 'aw-fork-cell', max: 19, lh: 27 }) +
      s.auto.uses.map((u, k) => svg.text(autoX + autoW / 2, 316 + k * 30, u, { cls: 'aw-cell-detail' })).join('');
    body += svg.enter(svg.g(auto, { cls: 'z-local' }), awAt + 250);

    const label = `${s.title}. ${s.start.title}. ${s.questions.map((q) => `${q.q} Yes: ${s.aw.title}, because ${q.why}. No: next`).join('. ')}. All no: ${s.auto.kicker}, ${s.auto.title}. ${s.auto.detail}. ${s.auto.uses.join(', ')}.`;
    return `${Kit.html.head(s)}${svg.scene(W, H, label, body, 'automation-tree')}${linkFoot(s.footnote, s.link)}`;
  };

  window.SCENES = {
    'use-case-ring': useCaseRing,
    'gap-lanes': gapLanes,
    'task-sort': taskSort,
    'factory-scorecard': factoryScorecard,
    'issueops-lanes': issueopsLanes,
    'route-fork': routeFork,
    'actor-chain': actorChain,
    'file-anatomy': fileAnatomy,
    'lock-jobs': lockJobs,
    'write-handoff': writeHandoff,
    'injection-gates': injectionGates,
    'wizard-link': wizardLink,
    'prompt-to-draft': promptToDraft,
    'draft-review': draftReview,
    'refine-loop': refineLoop,
    'automation-fork': automationFork,
    'automation-tree': automationTree
  };
})();
