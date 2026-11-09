/*
  Copilot with Foundry — deck-only diagrams.
  Shared frames and patterns remain in slides/native; these scenes show this talk's actors.
*/
(() => {
  const { svg, html, esc, measure } = window.Kit;
  const textBox = (x, y, w, h, title, body, z = 'local', opts = {}) => {
    const tx = x + (opts.pad || 24);
    const bodyY = y + (opts.bodyY || 78);
    return svg.g(
      svg.rect(x, y, w, h, { cls: opts.soft ? 'box soft' : 'box', r: opts.r || 18 }) +
      svg.text(tx, y + 42, title, { cls: opts.titleClass || 't-lg', anchor: 'start' }) +
      svg.lines(tx, bodyY, body, { cls: 't-muted', anchor: 'start', max: opts.max || 42, lh: opts.lh || 28 }),
      { cls: `z-${z}` });
  };
  const frame = (s, label, inner, height = 490, name = s.id) =>
    `${html.head(s)}${svg.scene(1440, height, label, inner, name)}`;

  /* Core question as three owner lanes: each routing step sits above the role that owns it,
     and each card counts down to the single human gate. */
  const memoryQuestion = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - 2 * gap) / 3;
    const ry = 58;
    const y0 = 124;
    const ch = 268;
    const stops = [];
    s.lanes.forEach((lane, i) => {
      const cxp = i * (cw + gap) + cw / 2;
      const spread = lane.stage.length > 1 ? 112 : 0;
      lane.stage.forEach((word, j) => stops.push({ word, z: lane.z, x: cxp + (j - (lane.stage.length - 1) / 2) * 2 * spread }));
    });
    const line = `M${stops[0].x} ${ry}L${stops[stops.length - 1].x} ${ry}`;
    const routing =
      svg.text(0, 14, (s.routingLabel || '').toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.trace(line, { cls: 'wire', at: 400, dur: 900 }) +
      svg.ride(line, { z: 'purple', at: 1500, dur: 3000, r: 6 }) +
      stops.map((st, k) => {
        const w = Math.round(measure(st.word, 22) + 48);
        return svg.pop(svg.chip(st.x - w / 2, ry - 22, st.word, { z: st.z, size: 22, h: 44, pad: 24, r: 10, cls: 'route-word' }).markup, 350 + 200 * k);
      }).join('') +
      s.lanes.map((lane, i) => {
        const cxp = i * (cw + gap) + cw / 2;
        return svg.g(svg.trace(`M${cxp} ${ry + 24}L${cxp} ${y0 - 2}`, { cls: 'wire z-stroke', at: 1100 + 150 * i, dur: 300 }), { cls: `z-${lane.z}` });
      }).join('');
    const lanes = s.lanes.map((lane, i) => {
      const x = i * (cw + gap);
      const sy = y0 + 196;
      return svg.enter(svg.g(
        svg.rect(x, y0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x + 18, y0, cw - 36, 5, { cls: 'card-top', r: 2 }) +
        svg.text(x + 28, y0 + 58, lane.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(x + 82, y0 + 54, lane.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 28, y0 + 98, lane.description, { cls: 't-muted', anchor: 'start', max: 32, lh: 28 }) +
        svg.path(`M${x + 28} ${y0 + 150}L${x + cw - 28} ${y0 + 150}`, { cls: 'wire faint' }) +
        svg.text(x + 28, sy + 30, lane.num, { cls: 'q-num z-text', anchor: 'start' }) +
        svg.text(x + 102, sy - 4, lane.stat, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.lines(x + 102, sy + 26, lane.detail, { cls: 't-muted t-sm', anchor: 'start', max: 34, lh: 24 }),
        { cls: `z-${lane.z}` }), 1200 + 160 * i);
    }).join('');
    const label = `${s.title} Decide ${s.lanes.map((l) => `${l.stage.join(' and ')} with the ${l.title.toLowerCase()} (${l.num} ${l.stat})`).join(', then ')}.`;
    return `${html.pill(s)}
      <h2 class="question m-in">“${esc(s.title)}”</h2>
      ${s.subtitle ? `<p class="subtitle m-in" style="--at:150ms">${esc(s.subtitle)}</p>` : ''}
      ${svg.scene(W, y0 + ch + 4, label, routing + lanes, 'core memory-question')}`;
  };

  const memoryMap = () => {
    const W = 760;
    const C = W / 2;
    const line1 = 'M125 380C210 235 285 190 380 190';
    const line2 = 'M635 380C550 235 475 190 380 190';
    const body =
      svg.circle(C, C, 255, { cls: 'ring' }) +
      svg.trace(line1, { cls: 'route z-local', at: 350, dur: 700 }) +
      svg.trace(line2, { cls: 'route z-purple', at: 900, dur: 700 }) +
      svg.ride(line1, { z: 'local', at: 1400, dur: 2200, r: 6 }) +
      svg.ride(line2, { z: 'purple', at: 1650, dur: 2200, r: 6 }) +
      svg.pop(textBox(222, 42, 316, 126, 'Coding question', 'What changed? Why?', 'purple', { max: 30, bodyY: 82 })) +
      svg.enter(textBox(28, 364, 288, 168, 'GitHub evidence', 'Code · commits · PRs · issues', 'local', { max: 28, bodyY: 90 })) +
      svg.enter(textBox(444, 364, 288, 168, 'Foundry IQ', 'Decision records · constraints · rationale', 'purple', { max: 27, bodyY: 90 }), 250);
    return svg.scene(W, 560, 'A coding question connects separately to GitHub implementation evidence and Foundry IQ organizational decision records.', body, 'memory-map');
  };

  const codeGap = (s) => {
    const prX = 556;
    const prW = 1440 - prX;
    const gaps = ['Who accepted the fraud risk?', 'Why a bypass instead of a fix?', 'When does the bypass come out?'];
    const body =
      svg.g(svg.rect(0, 0, 520, 300, { cls: 'box', r: 18 }) +
        svg.text(28, 40, 'CheckoutService.cs · illustrative code', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(28, 96, '// fix premium timeouts (#9021)', { cls: 't-sm t-mono t-muted', anchor: 'start' }) +
        svg.text(28, 146, 'if (customer.IsPremium)', { cls: 't-lg t-mono', anchor: 'start' }) +
        svg.text(28, 188, '{', { cls: 't-lg t-mono', anchor: 'start' }) +
        svg.text(60, 230, 'bypassFraudChecks();', { cls: 't-lg t-mono z-text', anchor: 'start' }) +
        svg.text(28, 270, '}', { cls: 't-lg t-mono', anchor: 'start' }), { cls: 'z-purple' }) +
      svg.enter(svg.g(
        svg.rect(prX, 0, prW, 300, { cls: 'box', r: 18 }) +
        svg.rect(prX + 18, 0, prW - 36, 5, { cls: 'card-top', r: 2 }) +
        svg.text(prX + 28, 40, 'WHAT THE PULL REQUEST SAYS', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(prX + 28, 82, '#413  Skip fraud check for premium checkout', { cls: 't-lg', anchor: 'start' }) +
        svg.text(prX + 28, 114, 'merged Mar 2023 · 1 file · +4 −0 · 1 approval', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.path(`M${prX + 28} 134L${prX + prW - 28} 134`, { cls: 'wire faint' }) +
        svg.text(prX + 28, 170, '“Premium checkouts are timing out at payment.', { cls: 't-muted', anchor: 'start' }) +
        svg.text(prX + 36, 200, 'Skip the fraud check for IsPremium. Fixes #9021.”', { cls: 't-muted', anchor: 'start' }) +
        svg.text(prX + 28, 240, 'Review comment: “LGTM”', { cls: 't-muted', anchor: 'start' }) +
        svg.text(prX + 28, 276, 'Issue #9021 · Premium checkout times out at payment step · closed', { cls: 't-sm t-mono', anchor: 'start' }),
        { cls: 'z-local' }), 200) +
      svg.enter(svg.g(svg.rect(0, 324, 1440, 116, { cls: 'zone', r: 18 }) +
        svg.text(32, 360, 'NOT IN THE HISTORY · THE REASON LIVES SOMEWHERE ELSE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        gaps.map((g, i) => {
          const x = 32 + i * 470;
          return svg.circle(x + 10, 404, 7, { cls: 'z-fill' }) + svg.text(x + 30, 412, g, { anchor: 'start' });
        }).join(''), { cls: 'z-orange' }), 500);
    return frame(s, 'An illustrative pull request records the symptom and the change, a premium-checkout timeout fixed by skipping the fraud check with a one-word approval, but not who accepted the risk, why a bypass was chosen, or when it comes out.', body, 444, 'code-gap');
  };

  /* Two provider lanes under one MCP client: call → service with its own access check → what it returns.
     The owners who grant scope and approve change sit outside the request path. */
  const integrationMap = (s) => {
    const W = 1440;
    const cw = 690;
    const hostX = 410;
    const hostW = 620;
    const sy = 196;
    const sh = 156;
    const ry = 384;
    const rh = 92;
    const oy = 500;
    const oh = 64;
    const host = svg.pop(svg.g(
      svg.rect(hostX, 0, hostW, 108, { cls: 'box', r: 18 }) +
      svg.rect(hostX + 18, 0, hostW - 36, 5, { cls: 'card-top', r: 2 }) +
      svg.text(hostX + 28, 64, '🤖', { cls: 't-emoji', anchor: 'start' }) +
      svg.text(hostX + 84, 46, 'Copilot · the only agent · MCP client', { cls: 't-lg', anchor: 'start' }) +
      svg.text(hostX + 84, 80, 'The model proposes a call; the client sends it', { cls: 't-muted', anchor: 'start' }),
      { cls: 'z-accent' }));
    const lane = (i, z, call, icon, title, owns, check, returns) => {
      const x = i * (W - cw);
      const cx = x + cw / 2;
      const branch = `M${W / 2} 108L${W / 2} 150L${cx} 150L${cx} ${sy}`;
      const at = 500 + 300 * i;
      const cmid = (W / 2 + cx) / 2;
      const cwid = Math.round(measure(call, 17) + 36);
      return svg.g(
        svg.trace(branch, { cls: 'wire z-stroke', at, dur: 700 }) +
        svg.ride(branch, { z, at: at + 1600, dur: 2600, r: 6 }) +
        svg.pop(svg.chip(cmid - cwid / 2, 133, call, { z, size: 17, h: 34, pad: 18 }).markup, at + 300) +
        svg.enter(
          svg.rect(x, sy, cw, sh, { cls: 'box', r: 18 }) +
          svg.rect(x + 18, sy, cw - 36, 5, { cls: 'card-top', r: 2 }) +
          svg.text(x + 28, sy + 56, icon, { cls: 't-emoji', anchor: 'start' }) +
          svg.text(x + 82, sy + 50, title, { cls: 't-lg', anchor: 'start' }) +
          svg.text(x + 82, sy + 84, owns, { cls: 't-muted', anchor: 'start' }) +
          svg.path(`M${x + 28} ${sy + 106}L${x + cw - 28} ${sy + 106}`, { cls: 'wire faint' }) +
          svg.text(x + 28, sy + 138, `🔐  ${check}`, { cls: 't-sm z-text', anchor: 'start' }), at + 200) +
        svg.trace(`M${cx} ${sy + sh}L${cx} ${ry}`, { cls: 'wire z-stroke', at: at + 900, dur: 300 }) +
        svg.enter(
          svg.rect(x, ry, cw, rh, { cls: 'zone', r: 16 }) +
          svg.text(x + 28, ry + 34, 'RETURNS FOR THE BYPASS', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
          svg.text(x + 28, ry + 70, returns, { anchor: 'start' }), at + 1100),
        { cls: `z-${z}` });
    };
    const body = host +
      lane(0, 'local', 'search PR history', '🐙', 'GitHub MCP server', 'Owns repository, commits, pull requests, issues', 'Checks the token’s repository scopes', 'PR #413 · issue #9021 · the 4-line diff') +
      lane(1, 'purple', 'retrieve decision records', '🧠', 'Foundry IQ knowledge base', 'Owns the index over crawled decision records', 'Checks the caller’s Search Index Data Reader role', 'Decision record · Mar 2023 · with citation') +
      svg.enter(svg.g(
        svg.rect(0, oy, W, oh, { cls: 'zone', r: 16 }) +
        svg.text(28, oy + 39, 'OUTSIDE THE REQUEST PATH', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(340, oy + 41, '👤  Resource owner grants each scope', { cls: 'sd-label', anchor: 'start' }) +
        svg.text(860, oy + 41, '✅  Service owner approves any change', { cls: 'sd-label', anchor: 'start' }),
        { cls: 'z-orange' }), 2200);
    return frame(s, 'Copilot, the only agent and the MCP client, sends one call to the GitHub MCP server, which checks token scopes and returns PR 413, issue 9021, and the diff, and another to the Foundry IQ knowledge base MCP endpoint, which checks the caller has the Search Index Data Reader role and returns the March 2023 decision record with a citation. Outside the request path, the resource owner grants each scope and the service owner approves any change.', body, oy + oh + 4, 'integration-map');
  };

  const deploymentManifest = (s) => {
    const cards = [
      [0, 0, '1 · Foundry project', 'host: azure.ai.project · model deployment for the knowledge base', 'purple'],
      [738, 0, '2 · Search service', 'AZURE_SEARCH_ENDPOINT · an existing service, set per azd environment', 'remote'],
      [0, 204, '3 · postprovision hook', 'provision_kb.py · creates the index, knowledge sources, and knowledge base', 'orange'],
      [738, 204, '4 · Output: KB_MCP_ENDPOINT', 'The one value Copilot needs, pasted into .vscode/mcp.json', 'local']
    ];
    const body = cards.map(([x, y, title, description, z], i) =>
      svg.enter(textBox(x, y, 700, 174, title, description, z, { max: 40, bodyY: 86, lh: 30 }), 150 * i)).join('') +
      svg.text(720, 402, 'Shape from the azure.yaml reference and the Foundry IQ quickstart · no agent, no toolbox', { cls: 't-xs t-mono' });
    return frame(s, 'One azure.yaml declares the Foundry project and model deployment and points at an existing search service; a postprovision hook creates the index, knowledge sources, and knowledge base, and outputs the knowledge base MCP endpoint that Copilot uses.', body, 430, 'deployment-manifest');
  };

  /* Two ways into a knowledge base: crawled into an index, or asked live through a remote source. */
  const sourceQuality = (s) => {
    const W = 1440;
    const cw = 700;
    const y0 = 40;
    const ch = 350;
    const by = y0 + ch + 22;
    const bh = 66;
    const lanes = s.lanes.map((lane, i) => {
      const x = i * (W - cw);
      let cx = x + 28;
      const chips = lane.chips.map((c) => {
        const chip = svg.chip(cx, y0 + 76, c, { z: lane.z, size: 17, h: 34, pad: 16 });
        cx += chip.w + 10;
        return chip.markup;
      }).join('');
      return svg.enter(svg.g(
        svg.text(x, 22, lane.kind.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.rect(x, y0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x + 18, y0, cw - 36, 5, { cls: 'card-top', r: 2 }) +
        svg.text(x + 28, y0 + 52, lane.title, { cls: 't-lg', anchor: 'start' }) +
        chips +
        lane.examples.map((e, k) =>
          svg.circle(x + 36, y0 + 156 + k * 36, 5, { cls: 'z-fill' }) +
          svg.text(x + 54, y0 + 163 + k * 36, e, { anchor: 'start' })).join('') +
        svg.path(`M${x + 28} ${y0 + 256}L${x + cw - 28} ${y0 + 256}`, { cls: 'wire faint' }) +
        lane.facts.map((f, k) => svg.text(x + 28, y0 + 292 + k * 34, f, { cls: 't-sm t-muted', anchor: 'start' })).join(''),
        { cls: `z-${lane.z}` }), 200 + 300 * i);
    }).join('');
    const band = svg.enter(svg.g(
      svg.rect(0, by, W, bh, { cls: 'zone', r: 16 }) +
      svg.text(28, by + 41, 'THE RULE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(170, by + 42, s.rule, { cls: 'sd-label', anchor: 'start' }), { cls: 'z-orange' }), 1000);
    const label = `${s.title}. ${s.lanes.map((l) => `${l.kind}: ${l.title} from ${l.chips.join(', ')}, for example ${l.examples.join('; ')}. ${l.facts.join('. ')}`).join('. ')}. ${s.rule}`;
    return frame(s, label, lanes + band, by + bh + 4, 'source-quality');
  };

  /* Three controls, three owners: each card shows the question, the bypass agent's answer, who sets it,
     and the observable signal when it is missing. */
  const identityBoundary = (s) => {
    const W = 1440;
    const gap = 36;
    const cw = (W - 2 * gap) / 3;
    const ch = 330;
    const cards = s.controls.map((c, i) => {
      const x = i * (cw + gap);
      return svg.enter(svg.g(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x + 18, 0, cw - 36, 5, { cls: 'card-top', r: 2 }) +
        svg.text(x + 28, 52, `${i + 1}`, { cls: 't-lg t-mono z-text', anchor: 'start' }) +
        svg.text(x + 64, 52, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.text(x + 28, 90, c.question, { cls: 't-muted', anchor: 'start' }) +
        svg.path(`M${x + 28} 114L${x + cw - 28} 114`, { cls: 'wire faint' }) +
        svg.text(x + 28, 148, 'FOR THE BYPASS QUESTION', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.lines(x + 28, 182, c.answer, { anchor: 'start', max: 34, lh: 28 }) +
        svg.text(x + 28, 254, c.ownerLabel.toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + 28, 282, c.owner, { cls: 't-sm', anchor: 'start' }) +
        svg.text(x + 28, 314, `If missing: ${c.missing}`, { cls: 't-sm t-muted', anchor: 'start' }),
        { cls: `z-${c.z}` }), 200 + 250 * i);
    }).join('');
    const links = s.controls.slice(1).map((_, i) => {
      const x = (i + 1) * (cw + gap);
      return svg.trace(`M${x - gap} ${ch / 2}L${x} ${ch / 2}`, { cls: 'wire', at: 900 + 200 * i, dur: 250 });
    }).join('');
    const by = ch + 26;
    const band = svg.enter(svg.g(
      svg.rect(0, by, W, 66, { cls: 'zone', r: 16 }) +
      svg.text(W / 2, by + 43, s.rule, { cls: 't-lg t-mono z-text' }), { cls: 'z-accent' }), 1400);
    const label = `${s.title}. ${s.controls.map((c) => `${c.title}: ${c.question} For the bypass question, ${c.answer}. ${c.ownerLabel}: ${c.owner}. If missing: ${c.missing}.`).join(' ')} ${s.rule}.`;
    return frame(s, label, cards + links + band, by + 70, 'identity-boundary');
  };

  /* The decision record as a document: each field lines up with the PR question it answers. */
  const illustrativeReview = (s) => {
    const W = 1440;
    const dw = 980;
    const qx = dw + 60;
    const top = 112;
    const rh = 66;
    const doc = svg.g(
      svg.rect(0, 0, dw, top + s.fields.length * rh + 14, { cls: 'box', r: 18 }) +
      svg.rect(18, 0, dw - 36, 5, { cls: 'card-top', r: 2 }) +
      svg.text(28, 40, s.recordPath, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(28, 80, s.recordTitle, { cls: 't-lg', anchor: 'start' }) +
      svg.text(dw - 28, 40, s.recordMeta, { cls: 't-xs', anchor: 'end' }) +
      s.fields.map((f, i) => {
        const y = top + i * rh;
        return svg.path(`M28 ${y}L${dw - 28} ${y}`, { cls: 'wire faint' }) +
          svg.text(28, y + 41, f.label.toUpperCase(), { cls: 't-xs t-mono', anchor: 'start' }) +
          svg.text(230, y + 42, f.text, { cls: f.answers ? '' : 't-muted', anchor: 'start' });
      }).join(''), { cls: 'z-purple' });
    const answers = s.fields.map((f, i) => {
      if (!f.answers) return '';
      const y = top + i * rh + 33;
      const w = Math.round(measure(f.answers, 17) + 36);
      return svg.g(
        svg.trace(`M${dw + 4} ${y}L${qx - 8} ${y}`, { cls: 'wire z-stroke', at: 900 + 250 * i, dur: 250 }) +
        svg.pop(svg.chip(qx, y - 17, f.answers, { z: 'green', size: 17, h: 34, pad: 18 }).markup, 1100 + 250 * i),
        { cls: 'z-green' });
    }).join('');
    const label = `${s.recordTitle}, ${s.recordMeta}. ${s.fields.map((f) => `${f.label}: ${f.text}${f.answers ? ` (answers: ${f.answers})` : ''}`).join('. ')}.`;
    return frame(s, label,
      svg.g(svg.text(qx, top + s.fields.findIndex((f) => f.answers) * rh - 4, 'ANSWERS THE PR’S QUESTION', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-green' }) + doc + answers,
      top + s.fields.length * rh + 18, 'illustrative-review');
  };

  /* Same question, two provider sets, side by side. */
  const answerCompare = (s) => {
    const W = 1440;
    const qh = 60;
    const py = qh + 24;
    const cw = 696;
    const rh = 52;
    const ph = 64 + s.panes[0].rows.length * rh + 8;
    const oy = py + ph + 16;
    const oh = 60;
    const question = svg.g(
      svg.rect(0, 0, W, qh, { cls: 'box soft', r: 14 }) +
      svg.text(28, 39, '❯', { cls: 'z-text', anchor: 'start' }) +
      svg.text(60, 39, s.question, { anchor: 'start' }), { cls: 'z-accent' });
    const panes = s.panes.map((p, i) => {
      const x = i * (W - cw);
      const at = 300 + 500 * i;
      return svg.enter(svg.g(
        svg.rect(x, py, cw, ph, { cls: 'box', r: 18 }) +
        svg.rect(x + 18, py, cw - 36, 5, { cls: 'card-top', r: 2 }) +
        svg.text(x + 28, py + 44, p.label, { cls: 't-lg', anchor: 'start' }) +
        svg.text(x + cw - 28, py + 42, p.calls, { cls: 't-xs t-mono z-text', anchor: 'end' }) +
        p.rows.map(([tag, text, z], k) => {
          const y = py + 64 + k * rh;
          return svg.path(`M${x + 28} ${y}L${x + cw - 28} ${y}`, { cls: 'wire faint' }) +
            svg.g(svg.text(x + 28, y + 35, tag, { cls: 't-sm t-mono z-text', anchor: 'start' }), { cls: z ? `z-${z}` : '' }) +
            svg.text(x + 170, y + 35, text, { cls: z === 'orange' ? 't-muted' : '', anchor: 'start' });
        }).join(''),
        { cls: `z-${p.z}` }), at) +
        svg.enter(svg.g(
          svg.rect(x, oy, cw, oh, { cls: 'zone', r: 16 }) +
          svg.text(x + 28, oy + 38, p.outcome, { cls: 'sd-label z-text', anchor: 'start' }), { cls: `z-${p.outcomeZ}` }), at + 400);
    }).join('');
    const label = `${s.question} ${s.panes.map((p) => `${p.label} (${p.calls}): ${p.rows.map((r) => `${r[0]}, ${r[1]}`).join('; ')}. ${p.outcome}.`).join(' ')}`;
    return frame(s, label, question + panes, oy + oh + 4, 'answer-compare');
  };

  /* The routing instruction on the left; the bypass question's run on the right, each step tagged with the line that drove it. */
  const agentTools = (s) => {
    const W = 1440;
    const lw = 560;
    const rx = 600;
    const sy = 44;
    const rh = 58;
    const H = sy + s.steps.length * rh;
    const badge = (x, y, k) => svg.g(svg.circle(x, y, 14, { cls: 'zone' }) + svg.text(x, y + 6, k, { cls: 't-xs t-mono z-text' }), { cls: 'z-accent' });
    const left = svg.enter(svg.g(
      svg.rect(0, 0, lw, H, { cls: 'box', r: 18 }) +
      svg.rect(18, 0, lw - 36, 5, { cls: 'card-top', r: 2 }) +
      svg.text(28, 36, s.file, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(28, 82, 'TOOLS', { cls: 't-xs t-mono', anchor: 'start' }) +
      s.tools.map((t, i) => {
        const y = 96 + i * 42;
        return svg.chip(28, y, t.name, { z: t.z, size: 17, h: 32, pad: 14 }).markup +
          svg.text(190, y + 22, t.endpoint, { cls: 't-xs t-mono', anchor: 'start' });
      }).join('') +
      svg.text(28, 210, 'INSTRUCTIONS', { cls: 't-xs t-mono', anchor: 'start' }) +
      s.instructions.map((r, i) => {
        const y = 228 + i * 41;
        return badge(42, y + 16, r.k) + svg.text(70, y + 22, r.text, { cls: 't-sm', anchor: 'start' });
      }).join(''),
      { cls: 'z-purple' }));
    const steps = svg.g(svg.text(rx, 26, s.stepsLabel, { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-accent' }) +
      s.steps.map((st, i) => {
        const y = sy + i * rh;
        return svg.enter(
          svg.path(`M${rx} ${y}L${W} ${y}`, { cls: 'wire faint' }) +
          svg.g(
            svg.circle(rx + 18, y + 29, 16, { cls: 'zone' }) +
            svg.text(rx + 18, y + 35, String(i + 1), { cls: 't-sm z-text' }) +
            svg.text(rx + 50, y + 37, st.name, { cls: 'sd-label z-text', anchor: 'start' }), { cls: `z-${st.z}` }) +
          (st.stop ? svg.g(svg.text(rx + 236, y + 37, st.detail, { cls: 'z-text', anchor: 'start' }), { cls: `z-${st.z}` }) : svg.text(rx + 236, y + 37, st.detail, { anchor: 'start' })) +
          (st.rule ? badge(W - 18, y + 29, st.rule) : ''),
          500 + 260 * i);
      }).join('');
    const by = H + 24;
    const band = svg.enter(svg.g(
      svg.rect(0, by, W, 60, { cls: 'zone', r: 16 }) +
      svg.text(W / 2, by + 39, s.rule, { cls: 'sd-label z-text' }), { cls: 'z-accent' }), 500 + 260 * s.steps.length + 200);
    const label = `${s.file}. Tools: ${s.tools.map((t) => `${t.name} at ${t.endpoint}`).join(', ')}. Instructions: ${s.instructions.map((r) => `${r.k}, ${r.text}`).join(' ')} ${s.stepsLabel}: ${s.steps.map((st, i) => `${i + 1} ${st.name}, ${st.detail}${st.rule ? ` (line ${st.rule})` : ''}`).join('; ')}. ${s.rule}.`;
    return frame(s, label, left + steps + band, by + 64, 'agent-tools');
  };

  /* Four overheard phrases as scenario cards: where it surfaces, what is missing, where the answer lives, and who asks versus who still knows. */
  const signalScenarios = (s) => {
    const W = 1440;
    const gap = 24;
    const cw = (W - gap) / 2;
    const ch = 262;
    const vx = 132;
    const cards = s.scenarios.map((c, i) => {
      const x = (i % 2) * (cw + gap);
      const y = Math.floor(i / 2) * (ch + gap);
      let cx = x + vx;
      const chips = c.look.map((l) => {
        const chip = svg.chip(cx, y + 110, l, { z: c.z, size: 15, h: 30, pad: 12 });
        cx += chip.w + 10;
        return chip.markup;
      }).join('');
      const label = (ty, k) => svg.text(x + 26, ty, k, { cls: 't-xs t-mono', anchor: 'start' });
      return svg.enter(
        svg.rect(x, y, cw, ch, { cls: 'box', r: 18 }) +
        svg.g(
          svg.rect(x + 18, y, cw - 36, 5, { cls: 'card-top', r: 2 }) +
          svg.text(x + 26, y + 52, c.quote, { cls: 't-lg z-text', anchor: 'start' }) +
          svg.text(x + cw - 26, y + 48, `HEARD IN · ${c.heard.toUpperCase()}`, { cls: 't-xs t-mono z-text', anchor: 'end' }), { cls: `z-${c.z}` }) +
        label(y + 92, 'MISSING') +
        svg.text(x + vx, y + 92, c.missing, { cls: 't-sm', anchor: 'start' }) +
        label(y + 131, 'LOOK IN') + chips +
        svg.path(`M${x + 26} ${y + 164}L${x + cw - 26} ${y + 164}`, { cls: 'wire faint' }) +
        label(y + 200, 'ASKS') +
        svg.text(x + vx, y + 200, c.asks, { cls: 't-sm', anchor: 'start' }) +
        label(y + 236, 'KNOWS') +
        svg.g(svg.text(x + vx, y + 236, c.knows, { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-green' }),
        300 + 260 * i);
    }).join('');
    const label = s.scenarios.map((c) => `${c.quote}, heard in ${c.heard}. Missing: ${c.missing}. Look in ${c.look.join(', ')}. Asks: ${c.asks}. Knows: ${c.knows}.`).join(' ');
    return frame(s, label, cards, 2 * ch + gap + 4, 'signal-scenarios');
  };

  /* Three kinds of debt that retrieval surfaces: what the record says, how the gap shows, and who gets the issue. */
  const surfacedDebt = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - gap * 2) / 3;
    const ch = 400;
    const field = (x, y, k, body, cls = 't-sm') =>
      svg.text(x + 26, y, k, { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.lines(x + 26, y + 30, body, { cls, anchor: 'start', max: 40, lh: 26 });
    const cards = s.finds.map((f, i) => {
      const x = i * (cw + gap);
      return svg.enter(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 18 }) +
        svg.g(svg.rect(x + 18, 0, cw - 36, 5, { cls: 'card-top', r: 2 }) +
          svg.text(x + 26, 50, f.kind, { cls: 't-lg z-text', anchor: 'start' }), { cls: `z-${f.z}` }) +
        field(x, 100, 'THE RECORD SAYS', f.found, 't-sm t-muted') +
        field(x, 214, 'THE SIGNAL', f.signal) +
        svg.path(`M${x + 26} ${ch - 112}L${x + cw - 26} ${ch - 112}`, { cls: 'wire faint' }) +
        svg.g(field(x, ch - 80, 'THE MOVE', f.move, 't-sm z-text'), { cls: 'z-green' }),
        300 + 320 * i);
    }).join('');
    const by = ch + 24;
    const band = svg.enter(svg.g(
      svg.rect(0, by, W, 64, { cls: 'zone', r: 16 }) +
      svg.text(W / 2, by + 41, s.rule, { cls: 'sd-label z-text' }), { cls: 'z-accent' }), 300 + 320 * s.finds.length + 200);
    const label = `${s.finds.map((f) => `${f.kind}. The record says ${f.found} Signal: ${f.signal}. Move: ${f.move}.`).join(' ')} ${s.rule}.`;
    return frame(s, label, cards + band, by + 68, 'surfaced-debt');
  };

  /* Org-level readiness: four checks a team runs with existing tools, each with its "if no" move, and the pilot a full pass earns. */
  const readinessChecks = (s) => {
    const W = 1440;
    const y0 = 40;
    const rh = 92;
    const rg = 12;
    const hx = 600;
    const nx = 1120;
    const head = svg.text(80, 20, 'CHECK', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(hx, 20, 'HOW TO CHECK THIS WEEK', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.g(svg.text(nx, 20, 'IF NO', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-orange' });
    const rows = s.checks.map((c, i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      return svg.enter(
        svg.rect(0, y, W, rh, { cls: 'box', r: 16 }) +
        svg.g(svg.circle(40, mid, 20, { cls: 'zone' }) +
          svg.text(40, mid + 7, String(i + 1), { cls: 't-sm z-text' }), { cls: 'z-purple' }) +
        svg.text(80, mid + 8, c.q, { anchor: 'start' }) +
        svg.path(`M${hx - 24} ${y + 18}L${hx - 24} ${y + rh - 18}`, { cls: 'wire faint' }) +
        svg.lines(hx, mid + 6 - (Kit.wrap(c.how, 54).length - 1) * 13, c.how, { cls: 't-sm t-muted', anchor: 'start', max: 54, lh: 26 }) +
        svg.path(`M${nx - 24} ${y + 18}L${nx - 24} ${y + rh - 18}`, { cls: 'wire faint' }) +
        svg.g(svg.text(nx, mid + 6, c.no, { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-orange' }),
        300 + 260 * i);
    }).join('');
    const by = y0 + s.checks.length * (rh + rg) + 8;
    const band = svg.enter(svg.g(
      svg.rect(0, by, W, 64, { cls: 'zone', r: 16 }) +
      svg.text(W / 2, by + 41, s.pass, { cls: 'sd-label z-text' }), { cls: 'z-green' }), 300 + 260 * s.checks.length + 200);
    const label = `${s.checks.map((c, i) => `Check ${i + 1}: ${c.q}. How: ${c.how}. If no: ${c.no}.`).join(' ')} ${s.pass}.`;
    return frame(s, label, head + rows + band, by + 68, 'readiness-checks');
  };

  /* Role-by-role before and after for the running example, closing on the authority split. */
  const teamShift = (s) => {
    const W = 1440;
    const rw = 200;
    const bx = 224;
    const bw = 560;
    const ax = 864;
    const aw = W - ax;
    const y0 = 36;
    const rh = 70;
    const rg = 14;
    const head = svg.g(svg.text(bx, 20, 'BEFORE', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-orange' }) +
      svg.g(svg.text(ax, 20, 'AFTER', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-green' });
    const rows = s.rows.map((r, i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      const at = 300 + 340 * i;
      return svg.enter(
        svg.g(svg.rect(0, y, rw, rh, { cls: 'zone', r: 14 }) +
          svg.text(rw / 2, mid + 8, r.role, { cls: 'sd-label z-text' }), { cls: `z-${r.z}` }) +
        svg.rect(bx, y, bw, rh, { cls: 'box soft', r: 14 }) +
        svg.text(bx + 24, mid + 8, r.before, { cls: 't-muted', anchor: 'start' }), at) +
        svg.trace(`M${bx + bw + 12} ${mid}L${ax - 14} ${mid}`, { cls: 'wire link', at: at + 180, dur: 220 }) +
        svg.enter(svg.g(
          svg.rect(ax, y, aw, rh, { cls: 'zone', r: 14 }) +
          svg.text(ax + 24, mid + 8, '✓', { cls: 'z-text', anchor: 'start' }) +
          svg.text(ax + 56, mid + 8, r.after, { anchor: 'start' }), { cls: 'z-green' }), at + 220);
    }).join('');
    const by = y0 + s.rows.length * (rh + rg) + 10;
    const band = svg.enter(svg.g(
      svg.rect(0, by, W, 64, { cls: 'zone', r: 16 }) +
      svg.text(W / 2, by + 41, s.rule, { cls: 'sd-label z-text' }), { cls: 'z-accent' }), 300 + 340 * s.rows.length + 200);
    const label = `${s.rows.map((r) => `${r.role}. Before: ${r.before}. After: ${r.after}.`).join(' ')} ${s.rule}.`;
    return frame(s, label, head + rows + band, by + 68, 'team-shift');
  };

  window.SCENES = {
    'memory-map': memoryMap,
    'code-gap': codeGap,
    'memory-question': memoryQuestion,
    'integration-map': integrationMap,
    'source-quality': sourceQuality,
    'answer-compare': answerCompare,
    'deployment-manifest': deploymentManifest,
    'identity-boundary': identityBoundary,
    'illustrative-review': illustrativeReview,
    'agent-tools': agentTools,
    'signal-scenarios': signalScenarios,
    'surfaced-debt': surfacedDebt,
    'readiness-checks': readinessChecks,
    'team-shift': teamShift
  };
})();
