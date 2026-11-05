/* Deck-only visuals. Shared frames and patterns stay in slides/native/. */
(() => {
  const { svg, html, esc, measure } = window.Kit;

  /* Title and closing visual: a practitioner prompt drives Copilot through query, plan, and
     review; Azure context feeds the first two steps; a human owner holds the final decision. */
  const ring = () => {
    const arrow = (x, y, at) => svg.pop(svg.path(`M${x - 12} ${y - 10}L${x} ${y}L${x - 12} ${y + 10}`, { cls: 'wire link' }), at);
    const down = (x, y, at) => svg.pop(svg.path(`M${x - 10} ${y - 12}L${x} ${y}L${x + 10} ${y - 12}`, { cls: 'wire link' }), at);

    let body = svg.enter(svg.g(
      svg.rect(0, 0, 760, 96, { cls: 'zone', r: 18 }) +
      svg.text(28, 36, 'PRACTITIONER ASKS', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(28, 72, '› Is payments-subnet ready for this Bicep change?', { cls: 't-sm t-mono', anchor: 'start' }),
      { cls: 'z-local' }), 150);

    body += svg.trace('M380 96L380 160', { cls: 'wire link', at: 420, dur: 260 }) + down(380, 166, 620);

    const steps = [
      { cx: 120, title: 'QUERY', detail: 'scope · fields · time' },
      { cx: 380, title: 'PLAN', detail: 'assumptions visible' },
      { cx: 640, title: 'REVIEW', detail: 'evidence · provenance' }
    ];
    const sy = 172;
    const sw = 220;
    const sh = 128;
    body += svg.enter(svg.g(
      svg.rect(-6, sy - 4, 772, sh + 8, { cls: 'zone dashed', r: 24 }), { cls: 'z-purple' }), 560);
    steps.forEach((st, i) => {
      body += svg.enter(svg.g(
        svg.rect(st.cx - sw / 2, sy + 10, sw, sh - 20, { cls: 'box task', r: 18 }) +
        svg.text(st.cx, sy + 58, st.title, { cls: 't-lg' }) +
        svg.text(st.cx, sy + 90, st.detail, { cls: 't-xs' }),
        { cls: 'z-purple' }), 700 + i * 260);
      if (i < steps.length - 1) {
        const x1 = st.cx + sw / 2;
        const x2 = steps[i + 1].cx - sw / 2;
        body += svg.trace(`M${x1 + 6} ${sy + sh / 2}L${x2 - 6} ${sy + sh / 2}`, { cls: 'wire link', at: 900 + i * 260, dur: 220 }) +
          arrow(x2 - 4, sy + sh / 2, 1080 + i * 260);
      }
    });
    body += svg.pop(svg.g(svg.text(24, sy - 18, 'COPILOT PROPOSES', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-purple' }), 700);

    const ay = 382;
    const ah = 168;
    const chips = [
      { cx: 88, label: 'Azure Skills', z: 'purple' },
      { cx: 246, label: 'Azure MCP', z: 'remote' },
      { cx: 404, label: 'Azure APIs', z: 'green' }
    ];
    body += svg.enter(svg.g(
      svg.rect(0, ay, 490, ah, { cls: 'zone', r: 20 }) +
      svg.text(24, ay + 36, 'AZURE CONTEXT', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(466, ay + 36, 'informs', { cls: 't-sm z-text', anchor: 'end' }),
      { cls: 'z-remote' }), 1550);
    chips.forEach((c, i) => {
      body += svg.enter(svg.g(
        svg.rect(c.cx - 70, ay + 66, 140, 74, { cls: 'box', r: 14 }) +
        svg.text(c.cx, ay + 110, c.label, { cls: 't-sm z-text' }),
        { cls: `z-${c.z}` }), 1700 + i * 140);
    });
    [120, 380].forEach((x, i) => {
      const d = `M${x} ${ay}L${x} ${sy + sh + 4}`;
      body += svg.enter(svg.g(
        svg.path(d, { cls: 'route dashed' }) +
        svg.path(`M${x - 10} ${sy + sh + 16}L${x} ${sy + sh + 4}L${x + 10} ${sy + sh + 16}`, { cls: 'route' }),
        { cls: 'z-remote' }), 2150 + i * 160) +
        svg.ride(d, { z: 'remote', at: 2600 + i * 220, dur: 1800, r: 5 });
    });

    const ox = 530;
    body += svg.trace(`M640 ${sy + sh + 4}L640 ${ay - 10}`, { cls: 'wire link', at: 2400, dur: 300 }) + down(640, ay - 4, 2680);
    body += svg.pop(svg.g(
      svg.rect(ox, ay, 230, ah, { cls: 'box task', r: 20 }) +
      svg.text(ox + 115, ay + 36, 'HUMAN OWNER', { cls: 't-xs t-mono z-text' }) +
      svg.text(ox + 115, ay + 86, 'approves', { cls: 't-lg z-text' }) +
      svg.text(ox + 115, ay + 126, 'the next action', { cls: 't-sm' }),
      { cls: 'z-orange' }), 2800);

    return svg.scene(760, 560,
      'A practitioner asks about an Azure change. Copilot queries, plans, and reviews; Azure Skills, Azure MCP, and Azure APIs inform the query and plan; a human owner approves the next action.',
      body, 'azure-loop');
  };

  /* Core question as three lanes: each lens runs from the role that needs it to what that role leaves with. */
  const coreLanes = (s) => {
    const W = 1440;
    const gap = 28;
    const cw = (W - gap * 2) / 3;
    const tones = ['local', 'remote', 'orange'];
    let body = '';
    s.routing.forEach((lens, i) => {
      const x = i * (cw + gap);
      const c = x + cw / 2;
      const z = tones[i];
      const r = s.roles[i];
      const st = s.stats[i];
      const at = 450 + i * 260;
      body += svg.enter(svg.rect(x, 0, cw, 436, { cls: 'box soft', r: 22 }), at - 150);
      body += svg.pop(svg.g(
        svg.rect(x + 20, 20, cw - 40, 60, { cls: 'zone', r: 14 }) +
        svg.text(c, 59, lens.toUpperCase(), { cls: 't-sm t-mono z-text' }),
        { cls: `z-${z}` }), at);
      body += svg.enter(
        svg.text(x + 40, 140, r.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.text(x + 94, 136, r.title, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 40, 180, r.description, { cls: 't-muted t-sm', anchor: 'start', max: 44, lh: 26 }),
        at + 200);
      body += svg.trace(`M${c} 238L${c} 284`, { cls: 'wire link', at: at + 450, dur: 240 }) +
        svg.pop(svg.path(`M${c - 10} 274L${c} 286L${c + 10} 274`, { cls: 'wire link' }), at + 650);
      body += svg.enter(svg.g(
        svg.rect(x + 20, 300, cw - 40, 116, { cls: 'zone', r: 16 }) +
        svg.text(x + 44, 342, st.title, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.lines(x + 44, 376, st.description, { cls: 't-muted t-sm', anchor: 'start', max: 46, lh: 24 }),
        { cls: 'z-green' }), at + 750);
    });
    const label = `${s.title} ${s.highlight || ''} ${s.routing.map((l, i) => `${l}: the ${s.roles[i].title} needs it to ${s.roles[i].description.toLowerCase()} and leaves with ${s.stats[i].title.toLowerCase()}.`).join(' ')}`;
    return `${html.pill(s)}
      <h2 class="question m-in">“${esc(s.title)}”</h2>
      ${s.subtitle ? `<p class="subtitle m-in" style="--at:150ms">${esc(s.subtitle)}</p>` : ''}
      ${svg.scene(W, 436, label, body, 'core-lanes')}`;
  };

  /* Part 1, step 1: a broad ask returns a pile; a scoped ask returns one resource with the needed fields. */
  const scopedAsk = (s) => {
    const cw = 680;
    const rx = 760;
    let body =
      svg.text(0, 18, 'BROAD ASK', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.g(svg.text(rx, 18, 'SCOPED ASK', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-local' });

    body += svg.enter(
      svg.rect(0, 36, cw, 100, { cls: 'box soft', r: 16 }) +
      svg.text(28, 72, 'PLATFORM ENGINEER ASKS', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(28, 108, '› What storage accounts do we have?', { cls: 't-sm t-mono', anchor: 'start' }), 300);
    body += svg.enter(
      svg.text(0, 172, 'no subscription · no resource · no fields', { cls: 't-xs t-mono', anchor: 'start' }), 600);
    let pile = svg.rect(0, 196, cw, 176, { cls: 'box soft', r: 16 }) +
      svg.text(28, 228, 'COPILOT RETURNS · 38 accounts · 6 subscriptions', { cls: 't-xs t-mono', anchor: 'start' });
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        pile += svg.rect(28 + c * 158, 246 + r * 28, 142, 18, { cls: 'box soft', r: 6 });
      }
    }
    body += svg.enter(pile, 800);
    body += svg.enter(
      svg.rect(0, 392, cw, 64, { cls: 'box soft', r: 16 }) +
      svg.text(cw / 2, 431, 'Dozens of accounts. Which one is production payments?', { cls: 't-sm t-muted' }), 1200);

    body += svg.enter(svg.g(
      svg.rect(rx, 36, cw, 100, { cls: 'zone', r: 16 }) +
      svg.text(rx + 28, 72, 'PLATFORM ENGINEER ASKS', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(rx + 28, 108, '› In payments-prod / payments-rg, show paystore-prod', { cls: 't-sm t-mono', anchor: 'start' }),
      { cls: 'z-local' }), 1500);
    const chips = ['subscription', 'resource group', 'resource', 'fields'];
    let cx0 = rx;
    chips.forEach((label, i) => {
      const w = Math.round(measure(label, 15) + 32);
      body += svg.pop(svg.g(
        svg.rect(cx0, 152, w, 32, { cls: 'zone', r: 16 }) +
        svg.text(cx0 + w / 2, 173, label, { cls: 't-xs t-mono z-text' }),
        { cls: 'z-local' }), 1800 + i * 120);
      cx0 += w + 10;
    });
    const fields = [
      ['sku', 'Standard_GRS'],
      ['networkAcls', 'prod-vnet · 2 IP rules'],
      ['minimumTls', 'TLS1_2'],
      ['publicBlobAccess', 'disabled']
    ];
    let one = svg.rect(rx, 196, cw, 176, { cls: 'box', r: 16 }) +
      svg.text(rx + 28, 228, 'COPILOT RETURNS · paystore-prod', { cls: 't-xs t-mono', anchor: 'start' });
    fields.forEach(([k, v], i) => {
      one += svg.text(rx + 28, 266 + i * 28, k, { cls: 't-sm t-mono t-muted', anchor: 'start' }) +
        svg.text(rx + 260, 266 + i * 28, v, { cls: 't-sm t-mono', anchor: 'start' });
    });
    body += svg.enter(one, 2400);
    body += svg.enter(svg.g(
      svg.rect(rx, 392, cw, 64, { cls: 'zone', r: 16 }) +
      svg.text(rx + cw / 2, 431, 'One resource, the fields the staging decision needs', { cls: 't-sm z-text' }),
      { cls: 'z-green' }), 2800);

    const label = 'A platform engineer asks two ways. Broad ask, "What storage accounts do we have?", returns dozens of accounts and no decision. Scoped ask names subscription payments-prod, resource group payments-rg, resource paystore-prod, and fields; Copilot returns one resource with SKU, network rules, TLS, and public access.';
    return `${html.head(s)}${svg.scene(1440, 456, label, body, 'scoped-ask')}${html.footnote(s.footnote)}`;
  };

  /* Part 1, step 2: the answer carries a receipt. Each callout names the reviewer's question for its rows. */
  const answerReceipt = (s) => {
    const cx = 380;
    const cw = 680;
    const y0 = 92;
    const lh = 34;
    const rows = [
      ['subscription', 'payments-prod'],
      ['resourceGroup', 'payments-rg'],
      ['resource', 'paystore-prod'],
      ['principal', 'platform-eng · Reader'],
      ['sku', 'Standard_GRS'],
      ['networkAcls', 'prod-vnet · 2 IP rules'],
      ['minimumTls', 'TLS1_2'],
      ['publicBlobAccess', 'disabled'],
      ['queriedAt', '10:02 UTC · Resource Manager']
    ];
    const groups = [
      { from: 0, to: 2, side: 'L', z: 'local', title: 'Scope', ask: 'Is this the right resource?' },
      { from: 3, to: 3, side: 'R', z: 'remote', title: 'Identity', ask: 'Who could see this view?' },
      { from: 4, to: 7, side: 'L', z: 'purple', title: 'Fields', ask: 'Does it answer the task?' },
      { from: 8, to: 8, side: 'R', z: 'github', title: 'Freshness', ask: 'Is it still true?' }
    ];
    const rowTop = (i) => y0 + i * lh - 24;
    let card = svg.rect(cx, 0, cw, y0 + rows.length * lh + 6, { cls: 'box', r: 18 }) +
      svg.text(cx + 28, 44, 'COPILOT RETURNS', { cls: 't-xs t-mono', anchor: 'start' });
    let bands = '';
    let text = '';
    groups.forEach((g, i) => {
      bands += svg.enter(svg.g(
        svg.rect(cx + 14, rowTop(g.from), cw - 28, (g.to - g.from + 1) * lh, { cls: 'zone', r: 8 }),
        { cls: `z-${g.z}` }), 900 + i * 450);
    });
    rows.forEach(([k, v], i) => {
      text += svg.text(cx + 32, y0 + i * lh, k, { cls: 't-sm t-mono t-muted', anchor: 'start' }) +
        svg.text(cx + 260, y0 + i * lh, v, { cls: 't-sm t-mono', anchor: 'start' });
    });
    let body = svg.enter(card, 250) + bands + svg.enter(text, 400);
    groups.forEach((g, i) => {
      const at = 900 + i * 450;
      const midY = rowTop(g.from) + ((g.to - g.from + 1) * lh) / 2;
      const left = g.side === 'L';
      const bx = left ? 0 : 1120;
      const edge = left ? cx : cx + cw;
      const near = left ? bx + 320 : bx;
      body += svg.trace(`M${edge} ${midY}L${near} ${midY}`, { cls: 'wire', at: at + 100, dur: 260 });
      body += svg.enter(svg.g(
        svg.rect(bx, midY - 48, 320, 96, { cls: 'zone', r: 16 }) +
        svg.text(bx + 24, midY - 8, g.title, { cls: 't-lg z-text', anchor: 'start' }) +
        svg.text(bx + 24, midY + 26, g.ask, { cls: 't-sm t-muted', anchor: 'start' }),
        { cls: `z-${g.z}` }), at + 250);
    });
    const label = 'Copilot answer for paystore-prod with four labelled parts: scope rows (subscription payments-prod, resource group payments-rg, resource paystore-prod) answer "is this the right resource"; principal platform-eng with Reader role answers "who could see this view"; SKU, network rules, TLS, and public access fields answer "does it answer the task"; query time 10:02 UTC answers "is it still true".';
    return `${html.head(s)}${svg.scene(1440, y0 + rows.length * lh + 6, label, body, 'answer-receipt')}${html.footnote(s.footnote)}`;
  };

  /* Part 1, step 3: chat context is a snapshot; Azure keeps moving. A follow-up answered from the
     10:02 snapshot misses the 10:15 change until the engineer re-queries. */
  const contextDrift = (s) => {
    const lx = 190;
    const chatY = 24;
    const azY = 214;
    const axisY = 330;
    const t = { a: 330, b: 640, c: 960, d: 1270 };
    let body =
      svg.text(0, chatY + 62, 'CHAT CONTEXT', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(0, azY + 42, 'AZURE STATE', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.path(`M${lx} ${axisY}L1440 ${axisY}`, { cls: 'wire faint' });

    body += svg.enter(
      svg.rect(lx, azY, t.b - lx, 64, { cls: 'box soft', r: 12 }) +
      svg.text((lx + t.b) / 2, azY + 40, 'networkAcls · 2 IP rules', { cls: 't-sm t-mono t-muted' }), 200);
    body += svg.enter(svg.g(
      svg.rect(t.b, azY, 1440 - t.b, 64, { cls: 'zone', r: 12 }) +
      svg.text((t.b + 1440) / 2, azY + 40, 'networkAcls · 3 IP rules', { cls: 't-sm t-mono z-text' }),
      { cls: 'z-remote' }), 1300);

    const card = (x, y, w, h, kicker, line1, line2, z, at, soft) => svg.enter(svg.g(
      svg.rect(x - w / 2, y, w, h, { cls: soft ? 'box soft dashed' : z ? 'zone' : 'box', r: 14 }) +
      svg.text(x, y + 30, kicker, { cls: `t-xs t-mono${z ? ' z-text' : ''}` }) +
      svg.text(x, y + 62, line1, { cls: 't-sm t-mono' }) +
      (line2 ? svg.text(x, y + 90, line2, { cls: 't-xs' }) : ''),
      { cls: z ? `z-${z}` : '' }), at);

    body += card(t.a, chatY, 280, 106, 'COPILOT RETURNS · 10:02', '2 IP rules', 'receipt captured in chat', 'local', 500);
    body += svg.trace(`M${t.a + 140} ${chatY + 53}L${t.c - 150} ${chatY + 53}`, { cls: 'wire dashed', at: 900, dur: 900 });
    body += svg.pop(svg.text((t.a + t.c) / 2, chatY + 40, 'snapshot carried forward', { cls: 't-xs t-mono' }), 1400);

    body += svg.pop(svg.g(svg.circle(t.b, azY, 9, { cls: 'stop' }), { cls: 'z-remote' }), 1300);
    body += svg.enter(
      svg.text(t.b, azY + 100, '10:15 · teammate adds a partner IP rule', { cls: 't-sm' }), 1500);

    body += card(t.c, chatY, 300, 106, 'FOLLOW-UP · 10:40', 'Which IP rules stay?', 'answered from 10:02 · misses one', null, 2000, true);
    body += card(t.d, chatY, 300, 106, 'ENGINEER RE-QUERIES · 10:41', '3 IP rules', 'fresh receipt · new queriedAt', 'green', 2600);
    body += svg.trace(`M${t.d} ${azY}L${t.d} ${chatY + 112}`, { cls: 'wire link', at: 2500, dur: 300 }) +
      svg.pop(svg.path(`M${t.d - 10} ${chatY + 124}L${t.d} ${chatY + 112}L${t.d + 10} ${chatY + 124}`, { cls: 'wire link' }), 2700);

    [['10:02', t.a], ['10:15', t.b], ['10:40', t.c], ['10:41', t.d]].forEach(([lbl, x], i) => {
      body += svg.pop(svg.path(`M${x} ${axisY - 8}L${x} ${axisY + 8}`, { cls: 'wire' }) +
        svg.text(x, axisY + 34, lbl, { cls: 't-xs t-mono' }), 300 + i * 200);
    });

    body += svg.enter(svg.g(
      svg.rect(0, 392, 1440, 64, { cls: 'zone', r: 16 }) +
      svg.text(720, 431, 'Re-query when the property can change and the decision depends on it', { cls: 't-sm z-text' }),
      { cls: 'z-orange' }), 3000);

    const label = 'Timeline. 10:02: Copilot returns paystore-prod with 2 IP rules, captured in chat. 10:15: a teammate adds a partner IP rule in Azure, now 3 rules. 10:40: a follow-up answered from the 10:02 snapshot misses the new rule. 10:41: the engineer re-queries and gets a fresh receipt with 3 rules. Rule: re-query when the property can change and the decision depends on it.';
    return `${html.head(s)}${svg.scene(1440, 456, label, body, 'context-drift')}${html.footnote(s.footnote)}`;
  };

  /* Part 1, step 4: Copilot reports what production has; the engineer decides what staging gets, and why. */
  const stagingDraft = (s) => {
    const col = { set: 0, prod: 220, draft: 600, dec: 940, why: 1110 };
    const bw = 300;
    const rh = 52;
    const rg = 8;
    const y0 = 44;
    const tones = { KEEP: 'green', CHANGE: 'purple', DROP: null, 'ASK OWNER': 'orange' };
    const rows = [
      ['SKU', 'Standard_GRS', 'Standard_LRS', 'CHANGE', 'no geo-redundancy needed'],
      ['Network', 'prod-vnet', 'staging-vnet', 'CHANGE', 'stay off the prod network'],
      ['Office IP rule', 'allowed', 'allowed', 'KEEP', 'team still needs access'],
      ['CI/CD IP rule', 'allowed', 'removed', 'DROP', 'prod pipeline only'],
      ['Partner IP rule', 'allowed · 10:15', 'owner decides', 'ASK OWNER', 'not yours to grant'],
      ['Minimum TLS', 'TLS 1.2', 'TLS 1.2', 'KEEP', 'security baseline'],
      ['Public blob access', 'disabled', 'disabled', 'KEEP', 'security baseline']
    ];
    let body =
      svg.text(col.set, 20, 'SETTING', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.g(svg.text(col.prod, 20, 'PRODUCTION HAS · COPILOT, 10:41', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-local' }) +
      svg.text(col.draft, 20, 'STAGING GETS', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.g(svg.text(col.dec, 20, 'YOUR CALL', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-orange' }) +
      svg.text(col.why, 20, 'WHY', { cls: 't-xs t-mono', anchor: 'start' });
    rows.forEach(([k, prod, draft, dec, why], i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      const z = tones[dec];
      const at = 350 + i * 220;
      body += svg.enter(
        svg.text(col.set, mid + 6, k, { cls: 't-sm', anchor: 'start' }) +
        svg.rect(col.prod, y, bw, rh, { cls: 'box soft', r: 10 }) +
        svg.text(col.prod + 18, mid + 6, prod, { cls: 't-sm t-mono t-muted', anchor: 'start' }) +
        svg.path(`M${col.prod + bw + 14} ${mid}L${col.draft - 16} ${mid}`, { cls: 'wire link' }) +
        svg.path(`M${col.draft - 26} ${mid - 8}L${col.draft - 16} ${mid}L${col.draft - 26} ${mid + 8}`, { cls: 'wire link' }) +
        svg.rect(col.draft, y, bw, rh, { cls: 'box', r: 10 }) +
        svg.text(col.draft + 18, mid + 6, draft, { cls: 't-sm t-mono', anchor: 'start' }),
        at);
      body += svg.pop(svg.g(
        svg.rect(col.dec, y + 6, 146, rh - 12, { cls: z ? 'zone' : 'box soft', r: 20 }) +
        svg.text(col.dec + 73, mid + 6, dec, { cls: `t-xs t-mono${z ? ' z-text' : ''}` }),
        { cls: z ? `z-${z}` : '' }), at + 160) +
        svg.enter(svg.text(col.why, mid + 6, why, { cls: 't-sm t-muted', anchor: 'start' }), at + 220);
    });
    const by = y0 + rows.length * (rh + rg) + 12;
    body += svg.enter(svg.g(
      svg.rect(0, by, 1440, 64, { cls: 'zone', r: 16 }) +
      svg.text(720, by + 39, 'Every difference from production is on purpose → Part 2 turns these decisions into a plan', { cls: 't-sm z-text' }),
      { cls: 'z-purple' }), 350 + rows.length * 220 + 200);
    const label = `Copilot reports what production paystore has at 10:41; the engineer decides what staging gets. ${rows.map(([k, p, d, dec, why]) => `${k}: production ${p}, staging ${d}, ${dec}, because ${why}`).join('; ')}. Every difference is deliberate, and Part 2 turns the decisions into a plan.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'staging-draft')}`;
  };

  /* Part 2 helpers */
  const arrowR = (x, y, at) => svg.pop(svg.path(`M${x - 10} ${y - 9}L${x} ${y}L${x - 10} ${y + 9}`, { cls: 'wire link' }), at);
  const band = (y, text, z, at) => svg.enter(svg.g(
    svg.rect(0, y, 1440, 64, { cls: 'zone', r: 16 }) +
    svg.text(720, y + 39, text, { cls: 't-sm z-text' }),
    { cls: `z-${z}` }), at);
  const tag = (x, y, w, h, text, z, at) => svg.pop(svg.g(
    svg.rect(x, y, w, h, { cls: z ? 'zone' : 'box soft', r: h / 2 }) +
    svg.text(x + w / 2, y + h / 2 + 5, text, { cls: `t-xs t-mono${z ? ' z-text' : ''}` }),
    { cls: z ? `z-${z}` : '' }), at);

  /* Part 2, the ticket: Copilot compresses the path to a reviewable plan; review and approval keep their length. */
  const ticketTime = (s) => {
    const x0 = 210;
    const ppm = 20;
    const bh = 72;
    const rev = 300;
    let body = svg.enter(
      svg.rect(0, 0, 1440, 92, { cls: 'box', r: 18 }) +
      svg.text(32, 36, 'TICKET · PLATFORM ENGINEERING', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(32, 72, 'Stand up paystore-staging', { cls: 't-lg', anchor: 'start' }) +
      svg.text(1408, 72, 'storage account · staging-vnet · settings from Part 1', { cls: 't-sm t-muted', anchor: 'end' }),
      250);
    body += svg.enter(
      svg.text(0, 148, 'TIME TO A REVIEWABLE PLAN', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(1440, 148, '≈ representative estimates · time your own', { cls: 't-xs t-mono', anchor: 'end' }),
      450);

    const row = (y, name, total, segs, zone, at) => {
      let out = svg.enter(
        svg.text(0, y + 30, name, { cls: 't-sm', anchor: 'start' }) +
        svg.text(0, y + 64, total, { cls: 't-lg', anchor: 'start' }), at);
      let x = x0;
      segs.forEach(([label, min], i) => {
        const w = min * ppm;
        const inner = svg.rect(x, y, w - 4, bh, { cls: zone ? 'zone' : 'box soft', r: 10 }) +
          (label ? svg.text(x + w / 2, y + bh / 2 + 6, label, { cls: `t-sm${zone ? ' z-text' : ' t-muted'}` }) : '');
        out += svg.enter(zone ? svg.g(inner, { cls: `z-${zone}` }) : inner, at + 150 + i * 180);
        x += w;
      });
      return { out, end: x };
    };

    const hand = row(176, 'By hand', '≈45 min', [['Look up both environments', 15], ['Docs and policy', 10], ['Write the Bicep', 20]], null, 650);
    const rx1 = hand.end + 16;
    body += hand.out + svg.enter(svg.g(
      svg.rect(rx1, 176, rev, bh, { cls: 'zone', r: 10 }) +
      svg.text(rx1 + rev / 2, 176 + bh / 2 + 6, 'Review + approve', { cls: 't-sm z-text' }), { cls: 'z-orange' }), 1400);

    const cop = row(300, 'With Copilot', '≈8 min', [['', 2], ['', 3], ['', 3]], 'purple', 1800);
    const rx2 = cop.end + 16;
    body += cop.out +
      svg.enter(svg.text(x0, 300 + bh + 30, 'clarify · check · draft', { cls: 't-xs t-mono', anchor: 'start' }), 2300) +
      svg.enter(svg.g(
        svg.rect(rx2, 300, rev, bh, { cls: 'zone', r: 10 }) +
        svg.text(rx2 + rev / 2, 300 + bh / 2 + 6, 'Review + approve', { cls: 't-sm z-text' }), { cls: 'z-orange' }), 2400) +
      svg.enter(
        svg.rect(rx2 + rev + 24, 300, 1440 - (rx2 + rev + 24), bh, { cls: 'box soft dashed', r: 10 }) +
        svg.text((rx2 + rev + 24 + 1440) / 2, 300 + bh / 2 + 6, 'review starts ≈37 min sooner', { cls: 't-sm t-muted' }), 2700);

    body += band(430, 'Next: this ticket, step by step → Clarify · Check · Decide', 'purple', 3000);
    const label = 'Ticket: stand up paystore-staging, a storage account in staging-vnet using the settings from Part 1. Representative estimates of time to a reviewable plan: by hand about 45 minutes (look up both environments 15, docs and policy 10, write the Bicep 20); with Copilot about 8 minutes across clarify, check, and draft, so review starts about 37 minutes sooner. Review and approval keep the same length on both rows. Next: clarify, check, decide.';
    return `${html.head(s)}${svg.scene(1440, 494, label, body, 'ticket-time')}`;
  };

  /* Part 2, step 1: each open point becomes a question, an answer, and the person who owns the answer. */
  const clarifyQuestions = (s) => {
    const col = { q: 0, a: 540, who: 1150 };
    const rh = 54;
    const rg = 10;
    const y0 = 140;
    const rows = [
      ['Which region?', 'East US 2, same as production', 'ENGINEER', 'local'],
      ['Which subnet?', 'staging-vnet / storage-subnet', 'ENGINEER', 'local'],
      ['Account name?', 'stpaystorestg', 'ENGINEER', 'local'],
      ['How does the office reach it?', 'office IP rule, from Part 1', 'ENGINEER', 'local'],
      ['Partner IP rule?', 'open', 'PAYMENTS OWNER', 'orange']
    ];
    let body = svg.enter(svg.g(
      svg.rect(0, 0, 1440, 72, { cls: 'zone', r: 16 }) +
      svg.text(28, 44, 'ENGINEER ASKS', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(220, 44, '› Plan paystore-staging from the settings we decided', { cls: 't-sm t-mono', anchor: 'start' }),
      { cls: 'z-local' }), 250);
    body += svg.enter(
      svg.g(svg.text(col.q, 116, 'COPILOT ASKS FIRST', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-purple' }) +
      svg.text(col.a, 116, 'ANSWER', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(col.who, 116, 'WHO ANSWERS', { cls: 't-xs t-mono', anchor: 'start' }), 450);
    rows.forEach(([q, ans, who, z], i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      const at = 650 + i * 280;
      body += svg.enter(
        svg.g(svg.rect(col.q, y, 470, rh, { cls: 'zone', r: 12 }) +
          svg.text(col.q + 22, mid + 6, q, { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-purple' }), at);
      body += svg.trace(`M${col.q + 484} ${mid}L${col.a - 14} ${mid}`, { cls: 'wire link', at: at + 120, dur: 160 }) +
        arrowR(col.a - 12, mid, at + 260);
      body += svg.enter(
        svg.rect(col.a, y, 570, rh, { cls: who === 'ENGINEER' ? 'box' : 'box soft dashed', r: 12 }) +
        svg.text(col.a + 22, mid + 6, ans, { cls: `t-sm t-mono${who === 'ENGINEER' ? '' : ' t-muted'}`, anchor: 'start' }), at + 200);
      body += tag(col.who, y + 7, 290, rh - 14, who, z, at + 260);
    });
    const by = y0 + rows.length * (rh + rg) + 14;
    body += band(by, 'Five answers, five assumptions. None of them checked yet.', 'remote', 650 + rows.length * 280 + 100);
    const label = `Engineer asks Copilot to plan paystore-staging from the decided settings. Copilot asks first: ${rows.map(([q, a, w]) => `${q} ${a}, answered by ${w.toLowerCase()}`).join('; ')}. Five answers, five assumptions, none checked yet.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'clarify-questions')}`;
  };

  /* Part 2, step 2: live checks confirm three answers, overturn the office IP rule, and leave the partner rule open. */
  const liveChecks = (s) => {
    const col = { as: 0, q: 360, r: 960 };
    const rh = 56;
    const rg = 12;
    const y0 = 44;
    const rows = [
      ['East US 2', 'Is Standard_LRS offered in the region?', 'CONFIRMED', 'SKU offered', 'green'],
      ['storage-subnet', 'Does the subnet exist, with room for an endpoint?', 'CONFIRMED', '41 free IPs', 'green'],
      ['stpaystorestg', 'Is the name free across Azure?', 'CONFIRMED', 'name available', 'green'],
      ['Office IP rule', 'Does policy on staging-rg allow public access?', 'OVERTURNED', 'policy denies it', 'orange'],
      ['Partner IP rule', 'Has the payments owner answered?', 'OPEN', 'waiting on owner', null]
    ];
    let body = svg.enter(
      svg.text(col.as, 20, 'ASSUMPTION', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.g(svg.text(col.q, 20, 'LIVE CHECK', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-remote' }) +
      svg.text(col.r, 20, 'RESULT', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(1440, 20, 'checked 11:05 · as platform-eng', { cls: 't-xs t-mono', anchor: 'end' }), 250);
    rows.forEach(([as, q, verdict, detail, z], i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      const at = 450 + i * 320 + (i === 3 ? 300 : 0);
      if (i === 3) {
        body += svg.enter(svg.g(svg.rect(-12, y - 6, 1464, rh + 12, { cls: 'zone', r: 16 }), { cls: 'z-orange' }), at - 100);
      }
      body += svg.enter(
        svg.rect(col.as, y, 320, rh, { cls: 'box soft', r: 12 }) +
        svg.text(col.as + 20, mid + 6, as, { cls: 't-sm t-mono', anchor: 'start' }), at);
      body += svg.enter(svg.g(
        svg.rect(col.q, y, 560, rh, { cls: 'zone', r: 12 }) +
        svg.text(col.q + 20, mid + 6, q, { cls: 't-sm', anchor: 'start' }), { cls: 'z-remote' }), at + 120);
      body += tag(col.r, y + 8, 170, rh - 16, verdict, z, at + 260) +
        svg.enter(svg.text(col.r + 194, mid + 6, detail, { cls: 't-sm', anchor: 'start' }), at + 320);
    });
    const by = y0 + rows.length * (rh + rg) + 18;
    body += band(by, 'The check changed the plan → a private endpoint replaces the office IP rule', 'purple', 450 + rows.length * 320 + 500);
    const label = `Live checks at 11:05 as platform-eng. ${rows.map(([a, q, v, d]) => `${a}: ${q} ${v}, ${d}`).join('. ')}. The check changed the plan: a private endpoint replaces the office IP rule.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'live-checks')}`;
  };

  /* Part 2, step 3: the approver's view, the plan with its evidence, changes, and open items. */
  const planReceipt = (s) => {
    const w = 700;
    const h = 186;
    const gx = 40;
    const gy = 24;
    const blocks = [
      { z: 'purple', k: 'WHAT CHANGES · what-if preview', cmd: '$ az deployment group what-if …', lines: ['+ storage account  stpaystorestg', '+ private endpoint → storage-subnet', '+ private DNS zone link'], foot: '3 create · 0 modify · 0 delete', mono: true },
      { z: 'remote', k: 'WHAT BACKS IT', lines: ['Settings: Part 1 decisions, 10:41 receipt', 'Region, subnet, name: live checks, 11:05', 'Identity for every read: platform-eng'], foot: 'every line has a time and an identity' },
      { z: 'green', k: 'WHAT THE CHECKS CHANGED', lines: ['Office IP rule → private endpoint', 'Reason: staging-rg policy denies public access'], foot: 'caught before any Bicep ran' },
      { z: 'orange', k: 'STILL OPEN', lines: ['Partner IP rule · payments owner', 'Left out of this change'], foot: 'follows as its own change' }
    ];
    let body = svg.enter(
      svg.text(0, 22, 'CHANGE REQUEST · stand up paystore-staging', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(1440, 22, 'approver: platform lead', { cls: 't-xs t-mono', anchor: 'end' }), 250);
    blocks.forEach((b, i) => {
      const x = (i % 2) * (w + gx);
      const y = 44 + Math.floor(i / 2) * (h + gy);
      body += svg.enter(svg.g(
        svg.rect(x, y, w, h, { cls: 'zone', r: 18 }) +
        svg.text(x + 28, y + 38, b.k, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        (b.cmd ? svg.text(x + 28, y + 72, b.cmd, { cls: 't-xs t-mono t-muted', anchor: 'start' }) : '') +
        b.lines.map((l, j) => svg.text(x + 28, y + (b.cmd ? 108 : 80) + j * 30, l, { cls: `t-sm${b.mono ? ' t-mono' : ''}`, anchor: 'start' })).join('') +
        svg.text(x + w - 28, y + 38, b.foot, { cls: 't-xs t-mono', anchor: 'end' }),
        { cls: `z-${b.z}` }), 450 + i * 450);
    });
    const by = 44 + 2 * h + gy + 28;
    body += svg.enter(
      svg.rect(0, by, 1440, 64, { cls: 'box', r: 16 }) +
      svg.text(720, by + 39, 'Nothing here asks the approver to trust the chat', { cls: 't-sm' }), 450 + 4 * 450 + 200);
    const label = `Change request for paystore-staging, approver platform lead. ${blocks.map((b) => `${b.k}: ${b.lines.join('; ')}; ${b.foot}`).join('. ')}. Nothing here asks the approver to trust the chat.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'plan-receipt')}`;
  };

  /* Part 2, step 3: handoffs with named owners; approval gates the deploy wherever it runs. */
  const approvalPath = (s) => {
    const cw = 256;
    const gap = 40;
    const ch = 300;
    const stages = [
      { z: 'purple', icon: '🤖', title: 'Copilot proposes', d: 'Plan, Bicep, and the evidence behind them', id: 'chat · read-only' },
      { z: 'local', icon: '🧑‍💻', title: 'Engineer validates', d: 'Runs what-if, lint, and policy checks', id: 'engineer' },
      { z: 'orange', icon: '🧑‍⚖️', title: 'Lead approves', d: 'Reads the plan and its evidence, then signs off', id: 'named approver' },
      { z: 'remote', icon: '🚀', title: 'Deploy runs', d: 'In this chat or a pipeline, as approved', id: 'engineer or pipeline' },
      { z: 'green', icon: '🔁', title: 'Engineer re-queries', d: 'New receipt matches the plan', id: 'chat · read-only' }
    ];
    let body = '';
    stages.forEach((st, i) => {
      const x = i * (cw + gap);
      const at = 300 + i * 420;
      body += svg.enter(svg.g(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x, 0, cw, 8, { cls: 'card-top', r: 4 }) +
        svg.text(x + 24, 66, st.icon, { cls: 't-emoji', anchor: 'start' }) +
        svg.lines(x + 24, 122, st.title, { cls: 't-lg', anchor: 'start', max: 14, lh: 34 }) +
        svg.lines(x + 24, 196, st.d, { cls: 't-sm t-muted', anchor: 'start', max: 24, lh: 24 }),
        { cls: `z-${st.z}` }), at);
      body += tag(x + 20, ch - 56, cw - 40, 38, st.id.toUpperCase(), st.z, at + 200);
      if (i < stages.length - 1) {
        body += svg.trace(`M${x + cw + 6} ${ch / 2}L${x + cw + gap - 8} ${ch / 2}`, { cls: 'wire link', at: at + 300, dur: 150 }) +
          arrowR(x + cw + gap - 6, ch / 2, at + 420);
      }
    });
    body += band(ch + 40, 'Approval is the gate, wherever the deploy runs → Part 3 deploys from this same chat', 'orange', 300 + stages.length * 420 + 100);
    const label = `Approval path for paystore-staging. ${stages.map((st) => `${st.title}: ${st.d}, as ${st.id}`).join('. ')}. Approval is the gate wherever the deploy runs; Part 3 deploys from this same chat.`;
    return `${html.head(s)}${svg.scene(1440, ch + 104, label, body, 'approval-path')}`;
  };

  /* Part 3: one deploy prompt crosses four layers; each layer can stop it. */
  const deployStack = (s) => {
    const col = { k: 0, d: 330, stop: 1000 };
    const rh = 74;
    const rg = 14;
    const y0 = 128;
    const layers = [
      { z: 'purple', k: 'SKILL', n: 'azure-deploy', d: 'Checks the plan is Validated, then runs the deployment', stop: 'plan not Validated' },
      { z: 'local', k: 'HOST', n: 'Copilot', d: 'Shows the command and waits for your yes', stop: 'you decline' },
      { z: 'remote', k: 'TOOLS', n: 'Azure MCP · az CLI', d: 'Carry the call to Azure as your signed-in identity', stop: 'tool not available' },
      { z: 'orange', k: 'AZURE', n: 'Resource Manager', d: 'Checks your role on staging-rg before any write', stop: 'role does not allow it' }
    ];
    let body = svg.enter(svg.g(
      svg.rect(0, 0, 1440, 72, { cls: 'zone', r: 16 }) +
      svg.text(28, 44, 'ENGINEER, 11:20', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(220, 44, '› Deploy the approved paystore-staging plan', { cls: 't-sm t-mono', anchor: 'start' }),
      { cls: 'z-local' }), 250);
    body += svg.enter(
      svg.text(col.k, 112, 'LAYER', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(col.d, 112, 'WHAT IT DOES FOR THIS TICKET', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(col.stop, 112, 'STOPS THE DEPLOY WHEN', { cls: 't-xs t-mono', anchor: 'start' }), 450);
    layers.forEach((l, i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      const at = 650 + i * 380;
      body += svg.enter(svg.g(
        svg.rect(col.k, y, 300, rh, { cls: 'zone', r: 14 }) +
        svg.text(col.k + 22, y + 30, l.k, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(col.k + 22, y + 58, l.n, { cls: 't-sm', anchor: 'start' }),
        { cls: `z-${l.z}` }), at);
      body += svg.enter(
        svg.rect(col.d, y, 640, rh, { cls: 'box', r: 14 }) +
        svg.text(col.d + 22, mid + 6, l.d, { cls: 't-sm', anchor: 'start' }), at + 150);
      body += svg.enter(
        svg.rect(col.stop, y, 440, rh, { cls: 'box soft dashed', r: 14 }) +
        svg.text(col.stop + 22, mid + 6, l.stop, { cls: 't-sm t-muted', anchor: 'start' }), at + 280);
      if (i < layers.length - 1) {
        body += svg.trace(`M150 ${y + rh + 2}L150 ${y + rh + rg - 2}`, { cls: 'wire link', at: at + 330, dur: 80 });
      }
    });
    const by = y0 + layers.length * (rh + rg) + 10;
    body += band(by, 'Four layers, four chances to say no. All four said yes → paystore-staging deploys', 'green', 650 + layers.length * 380 + 100);
    const label = `Engineer at 11:20: deploy the approved paystore-staging plan. ${layers.map((l) => `${l.k}, ${l.n}: ${l.d}; stops the deploy when ${l.stop}`).join('. ')}. All four say yes, and paystore-staging deploys.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'deploy-stack')}`;
  };

  /* Part 3: the skill chain is a set of gates on one plan file. */
  const skillGates = (s) => {
    const cw = 440;
    const gap = 60;
    const ch = 270;
    const skills = [
      { n: 'azure-prepare', does: 'Writes the plan and Bicep from Part 2', file: 'status: Ready for Validation', gate: 'your approval of the plan' },
      { n: 'azure-validate', does: 'Runs the checks against the plan', file: 'status: Validated', gate: 'only this skill may set Validated' },
      { n: 'azure-deploy', does: 'Runs az deployment on staging-rg', file: 'deployment result', gate: 'stops unless Validated; asks before destructive steps' }
    ];
    let body = svg.enter(
      svg.text(0, 20, 'ONE PLAN FILE · .azure/deployment-plan.md', { cls: 't-xs t-mono', anchor: 'start' }), 250);
    skills.forEach((k, i) => {
      const x = i * (cw + gap);
      const at = 450 + i * 520;
      body += svg.enter(svg.g(
        svg.rect(x, 40, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x, 40, cw, 8, { cls: 'card-top', r: 4 }) +
        svg.text(x + 28, 96, k.n, { cls: 't-lg t-mono', anchor: 'start' }) +
        svg.lines(x + 28, 140, k.does, { cls: 't-sm t-muted', anchor: 'start', max: 40, lh: 26 }) +
        svg.rect(x + 28, 186, cw - 56, 44, { cls: 'zone', r: 10 }) +
        svg.text(x + 48, 214, k.file, { cls: 't-xs t-mono z-text', anchor: 'start' }),
        { cls: 'z-purple' }), at);
      body += svg.enter(svg.g(
        svg.text(x + 28, 262, 'GATE', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.lines(x + 92, 262, k.gate, { cls: 't-xs', anchor: 'start', max: 40, lh: 22 }),
        { cls: 'z-orange' }), at + 200);
      if (i < skills.length - 1) {
        body += svg.trace(`M${x + cw + 8} ${40 + ch / 2}L${x + cw + gap - 8} ${40 + ch / 2}`, { cls: 'wire link', at: at + 350, dur: 150 }) +
          arrowR(x + cw + gap - 6, 40 + ch / 2, at + 480);
      }
    });
    body += band(40 + ch + 36, 'The skills check the plan. The lead’s approval from Part 2 is the human gate in front of them.', 'orange', 450 + skills.length * 520 + 100);
    const label = `Azure Skills chain on one plan file, .azure/deployment-plan.md. ${skills.map((k) => `${k.n}: ${k.does}; produces ${k.file}; gate: ${k.gate}`).join('. ')}. The skills check the plan; the lead's approval is the human gate in front of them.`;
    return `${html.head(s)}${svg.scene(1440, 40 + ch + 100, label, body, 'skill-gates')}`;
  };

  /* Part 3: one deploy traced from prompt to receipt, all in the same chat. */
  const deployTrace = (s) => {
    const col = { t: 0, who: 110, what: 380 };
    const rh = 56;
    const rg = 12;
    const rows = [
      ['11:20', 'ENGINEER', 'local', 'Deploy the approved paystore-staging plan', false],
      ['11:20', 'COPILOT', 'purple', 'Run az deployment group create on staging-rg?  [y/N]', true],
      ['11:21', 'ENGINEER', 'orange', 'y  · the command matches the approved plan', false],
      ['11:21', 'AZURE', 'remote', 'Role check: Contributor on staging-rg → write allowed', true],
      ['11:24', 'RESULT', 'green', '3 created · 0 modified · 0 deleted, same as the what-if', true],
      ['11:25', 'RE-QUERY', 'green', 'stpaystorestg · Standard_LRS · public access off · private endpoint', true]
    ];
    let body = '';
    rows.forEach(([t, who, z, what, mono], i) => {
      const y = i * (rh + rg);
      const mid = y + rh / 2;
      const at = 300 + i * 450;
      body += svg.enter(svg.text(col.t, mid + 6, t, { cls: 't-sm t-mono t-muted', anchor: 'start' }), at);
      body += tag(col.who, y + 8, 230, rh - 16, who, z, at + 80);
      body += svg.enter(
        svg.rect(col.what, y, 1440 - col.what, rh, { cls: 'box', r: 12 }) +
        svg.text(col.what + 22, mid + 6, what, { cls: `t-sm${mono ? ' t-mono' : ''}`, anchor: 'start' }), at + 180);
    });
    const by = rows.length * (rh + rg) + 12;
    body += band(by, 'The receipt matches the plan → ticket closed, without leaving the chat', 'green', 300 + rows.length * 450 + 100);
    const label = `Deploy trace in one chat. ${rows.map(([t, w, , what]) => `${t} ${w}: ${what}`).join('. ')}. The receipt matches the plan; ticket closed without leaving the chat.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'deploy-trace')}`;
  };

  /* Part 3: setup is four choices, each with a check. */
  const setupChoices = (s) => {
    const cw = 330;
    const gap = 40;
    const ch = 300;
    const steps = [
      { z: 'purple', n: '1', t: 'Plugin', d: 'Install the Azure Skills plugin in your Copilot host', c: 'skills appear in the host' },
      { z: 'remote', n: '2', t: 'MCP server', d: 'Add Azure MCP to the host configuration', c: 'Azure tools are listed' },
      { z: 'local', n: '3', t: 'Subscription', d: 'Sign in and select the staging subscription', c: 'az account show' },
      { z: 'orange', n: '4', t: 'Identity', d: 'Decide which principal, with which role, on which scope', c: 'role on staging-rg only' }
    ];
    let body = '';
    steps.forEach((st, i) => {
      const x = i * (cw + gap);
      const at = 350 + i * 400;
      body += svg.enter(svg.g(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x, 0, cw, 8, { cls: 'card-top', r: 4 }) +
        svg.circle(x + 50, 62, 24, { cls: 'zone' }) +
        svg.text(x + 50, 71, st.n, { cls: 't-sm t-mono z-text' }) +
        svg.text(x + 90, 72, st.t, { cls: 't-lg', anchor: 'start' }) +
        svg.lines(x + 28, 130, st.d, { cls: 't-sm t-muted', anchor: 'start', max: 28, lh: 26 }) +
        svg.text(x + 28, 222, 'CHECK', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.rect(x + 24, 236, cw - 48, 44, { cls: 'zone', r: 10 }) +
        svg.text(x + 44, 264, st.c, { cls: 't-xs t-mono z-text', anchor: 'start' }),
        { cls: `z-${st.z}` }), at);
      if (i < steps.length - 1) {
        body += svg.trace(`M${x + cw + 6} ${ch / 2}L${x + cw + gap - 8} ${ch / 2}`, { cls: 'wire link', at: at + 250, dur: 120 }) +
          arrowR(x + cw + gap - 6, ch / 2, at + 360);
      }
    });
    body += band(ch + 40, 'First run: one read-only query in the scope you chose, then read its receipt', 'green', 350 + steps.length * 400 + 100);
    const label = `Setup in four choices. ${steps.map((st) => `${st.n}. ${st.t}: ${st.d}; check: ${st.c}`).join('. ')}. First run: one read-only query in the chosen scope, then read its receipt.`;
    return `${html.head(s)}${svg.scene(1440, ch + 104, label, body, 'setup-choices')}`;
  };

  /* Part 3: what Copilot can reach and what Azure allows are two separate dials. */
  const toolsVsRights = (s) => {
    const col = { a: 0, reach: 520, role: 800, out: 1080 };
    const rh = 60;
    const rg = 14;
    const y0 = 44;
    const rows = [
      ['Read paystore-staging config', ['EXPOSED', 'green'], ['READER', 'green'], ['WORKS', 'green']],
      ['Deploy to staging-rg', ['EXPOSED', 'green'], ['CONTRIBUTOR', 'green'], ['WORKS, AFTER YOUR YES', 'green']],
      ['Deploy to prod-rg', ['EXPOSED', 'green'], ['NO ROLE', 'orange'], ['AZURE DENIES', 'orange']],
      ['Read Key Vault secrets', ['NOT EXPOSED', null], ['n/a', null], ['NEVER OFFERED', null]]
    ];
    let body = svg.enter(
      svg.text(col.a, 20, 'ACTION', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.g(svg.text(col.reach, 20, 'COPILOT CAN REACH IT', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-remote' }) +
      svg.g(svg.text(col.role, 20, 'YOUR ROLE ALLOWS IT', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-orange' }) +
      svg.text(col.out, 20, 'OUTCOME', { cls: 't-xs t-mono', anchor: 'start' }), 250);
    rows.forEach(([a, reach, role, out], i) => {
      const y = y0 + i * (rh + rg);
      const mid = y + rh / 2;
      const at = 450 + i * 400;
      body += svg.enter(
        svg.rect(col.a, y, 480, rh, { cls: 'box', r: 12 }) +
        svg.text(col.a + 22, mid + 6, a, { cls: 't-sm', anchor: 'start' }), at);
      body += tag(col.reach, y + 10, 240, rh - 20, reach[0], reach[1], at + 120) +
        tag(col.role, y + 10, 240, rh - 20, role[0], role[1], at + 220) +
        tag(col.out, y + 10, 360, rh - 20, out[0], out[1], at + 320);
    });
    const by = y0 + rows.length * (rh + rg) + 16;
    body += band(by, 'Narrow both dials: expose the task’s tools, grant the task’s scope', 'purple', 450 + rows.length * 400 + 100);
    const label = `Two separate dials: what Copilot can reach and what your Azure role allows. ${rows.map(([a, r, ro, o]) => `${a}: ${r[0].toLowerCase()}, role ${ro[0].toLowerCase()}, ${o[0].toLowerCase()}`).join('. ')}. Narrow both: expose the task's tools and grant the task's scope.`;
    return `${html.head(s)}${svg.scene(1440, by + 64, label, body, 'tools-vs-rights')}`;
  };

  /* Part 4 helper: a header row plus rows of cells. A cell is text, { t, mono, muted }, or { tag, z }. */
  const grid = (cols, rows, opt = {}) => {
    const y0 = opt.y0 ?? 44;
    const rh = opt.rh ?? 64;
    const rg = opt.rg ?? 12;
    const at0 = opt.at0 ?? 400;
    const step = opt.step ?? 380;
    let body = svg.enter(cols.map((c) => c.z
      ? svg.g(svg.text(c.x, 20, c.head, { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: `z-${c.z}` })
      : svg.text(c.x, 20, c.head, { cls: 't-xs t-mono', anchor: 'start' })).join(''), at0 - 150);
    rows.forEach((r, i) => {
      const y = y0 + i * (rh + rg);
      const at = at0 + i * step;
      r.forEach((cell, j) => {
        const c = cols[j];
        const a = at + j * 110;
        if (cell && cell.tag) {
          body += tag(c.x, y + 10, c.w, rh - 20, cell.tag, cell.z, a);
          return;
        }
        const t = typeof cell === 'string' ? cell : cell.t;
        const cls = `t-sm${cell.mono ? ' t-mono' : ''}${cell.muted ? ' t-muted' : ''}`;
        body += svg.enter(
          svg.rect(c.x, y, c.w, rh, { cls: j === 0 ? 'box' : 'box soft', r: 12 }) +
          svg.lines(c.x + 20, y + rh / 2 + 6 - ((Math.ceil(t.length / (c.max || 99)) - 1) * 11), t, { cls, anchor: 'start', max: c.max || 99, lh: 22 }), a);
      });
    });
    return { body, end: y0 + rows.length * (rh + rg), last: at0 + rows.length * step };
  };
  const cellText = (cell) => (typeof cell === 'string' ? cell : cell.tag || cell.t);

  /* Part 4: four separate green lights let paystore-staging deploy. */
  const fourGreenLights = (s) => {
    const cw = 336;
    const gap = 32;
    const ch = 330;
    const lights = [
      { z: 'local', k: 'AUTHENTICATION', q: 'Who is connected?', yes: 'platform-eng, signed in', ev: 'az account show', by: 'Microsoft Entra ID' },
      { z: 'remote', k: 'AUTHORIZATION', q: 'What may it do?', yes: 'Contributor on staging-rg', ev: 'role assignment', by: 'Azure RBAC' },
      { z: 'orange', k: 'APPROVAL', q: 'Accept the change?', yes: 'Platform lead signed off', ev: 'Part 2 · what-if', by: 'Your change process' },
      { z: 'purple', k: 'CONFIRMATION', q: 'Run it now?', yes: 'Engineer typed y', ev: '11:21 · matches plan', by: 'Copilot host' }
    ];
    let body = '';
    lights.forEach((y, i) => {
      const x = i * (cw + gap);
      const at = 350 + i * 450;
      body += svg.enter(svg.g(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x, 0, cw, 8, { cls: 'card-top', r: 4 }) +
        svg.text(x + 26, 46, y.k, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + 26, 92, y.q, { cls: 't-lg', anchor: 'start' }) +
        svg.text(x + 26, 146, 'THE GREEN LIGHT', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + 26, 176, y.yes, { cls: 't-sm', anchor: 'start' }) +
        svg.rect(x + 22, 196, cw - 44, 40, { cls: 'zone', r: 10 }) +
        svg.text(x + 40, 222, y.ev, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + 26, 280, 'GIVEN BY', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(x + 26, 308, y.by, { cls: 't-sm t-muted', anchor: 'start' }),
        { cls: `z-${y.z}` }), at);
    });
    body += band(ch + 36, 'A clicked yes grants no role, and a role grants no approval', 'orange', 350 + lights.length * 450 + 100);
    const label = `Four separate green lights deployed paystore-staging. ${lights.map((y) => `${y.k.toLowerCase()}: ${y.q} ${y.yes} (${y.ev}), given by ${y.by}`).join('. ')}. A clicked yes grants no role, and a role grants no approval.`;
    return `${html.head(s)}${svg.scene(1440, ch + 100, label, body, 'four-green-lights')}`;
  };

  /* Part 4: a role means something only at a scope. */
  const roleScope = (s) => {
    const cols = [
      { x: 0, w: 220, head: 'ROLE' },
      { x: 250, w: 420, head: 'CAN' },
      { x: 700, w: 320, head: 'CANNOT' },
      { x: 1050, w: 390, head: 'IN THIS STORY', z: 'orange' }
    ];
    const rows = [
      [{ tag: 'READER', z: 'remote' }, 'Read config, run queries', { t: 'Change anything', muted: true }, { t: 'prod-rg · Part 1 reads', mono: true }],
      [{ tag: 'CONTRIBUTOR', z: 'remote' }, 'Create, change, delete resources', { t: 'Grant access to others', muted: true }, { t: 'staging-rg · Part 3 deploy', mono: true }],
      [{ tag: 'OWNER', z: 'orange' }, 'Everything, plus grant access', { t: 'n/a', muted: true }, { t: 'nobody in this chat', mono: true }]
    ];
    const g = grid(cols, rows, { rh: 76, rg: 14 });
    const body = g.body + band(g.end + 20, 'Smallest role at the smallest scope: Reader on prod-rg, Contributor on staging-rg', 'green', g.last + 100);
    const label = `Roles at scopes. ${rows.map((r) => r.map(cellText).join(', ')).join('. ')}. Smallest role at the smallest scope.`;
    return `${html.head(s)}${svg.scene(1440, g.end + 84, label, body, 'role-scope')}`;
  };

  /* Part 4: one connection reads production, another writes staging, production changes take the pipeline. */
  const connections = (s) => {
    const cols = [
      { x: 0, w: 200, head: '' },
      { x: 230, w: 380, head: 'PRODUCTION · READ', z: 'remote' },
      { x: 640, w: 380, head: 'STAGING · WRITE', z: 'purple' },
      { x: 1050, w: 390, head: 'PRODUCTION · CHANGE', z: 'orange' }
    ];
    const rows = [
      [{ t: 'Identity', muted: true }, 'prod-read connection', 'staging connection', 'pipeline identity'],
      [{ t: 'Role · scope', muted: true }, { t: 'Reader · prod-rg', mono: true }, { t: 'Contributor · staging-rg', mono: true }, { t: 'Contributor · prod-rg', mono: true }],
      [{ t: 'Used for', muted: true }, 'Facts to copy and compare', 'Deploying approved plans', 'Approved production changes'],
      [{ t: 'In this story', muted: true }, { tag: 'PART 1 · 10:41', z: 'remote' }, { tag: 'PART 3 · 11:21', z: 'purple' }, { tag: 'NOT FROM THIS CHAT', z: 'orange' }]
    ];
    const g = grid(cols, rows, { rh: 62, rg: 12, step: 340 });
    const body = g.body + band(g.end + 20, 'Every receipt names its connection, so you always know which environment you touched', 'green', g.last + 100);
    const label = `Separate connections. ${cols.slice(1).map((c, j) => `${c.head}: ${rows.map((r) => `${cellText(r[0])} ${cellText(r[j + 1])}`).join(', ')}`).join('. ')}. Every receipt names its connection.`;
    return `${html.head(s)}${svg.scene(1440, g.end + 84, label, body, 'connections')}`;
  };

  /* Part 4: the open partner rule goes to its owners; Copilot gathers facts and drafts the ask. */
  const ownerDecides = (s) => {
    const half = 690;
    const rx = 750;
    let body = svg.enter(svg.g(
      svg.rect(0, 0, 1440, 68, { cls: 'zone', r: 16 }) +
      svg.text(28, 42, 'STILL OPEN FROM PART 2', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(320, 42, 'Add the partner IP rule to stpaystorestg?', { cls: 't-sm', anchor: 'start' }),
      { cls: 'z-orange' }), 250);
    body += svg.enter(
      svg.g(svg.text(0, 112, 'FACTS COPILOT GATHERED', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-remote' }) +
      svg.g(svg.text(rx, 112, 'DECISIONS AND THEIR OWNERS', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-orange' }), 450);
    const facts = [
      ['paystore-prod has had the rule since 10:15', 'production receipt'],
      ['staging-rg policy denies public network access', 'policy check, 11:05']
    ];
    const asks = [
      ['Does the partner need staging at all?', 'PAYMENTS OWNER'],
      ['Is a policy exception allowed here?', 'POLICY OWNER']
    ];
    facts.forEach(([t, src], i) => {
      const y = 132 + i * 92;
      body += svg.enter(
        svg.rect(0, y, half, 78, { cls: 'box', r: 14 }) +
        svg.text(24, y + 34, t, { cls: 't-sm', anchor: 'start' }) +
        svg.text(24, y + 60, src, { cls: 't-xs t-mono t-muted', anchor: 'start' }), 650 + i * 300);
    });
    asks.forEach(([q, who], i) => {
      const y = 132 + i * 92;
      const at = 1350 + i * 300;
      body += svg.enter(
        svg.rect(rx, y, half, 78, { cls: 'box', r: 14 }) +
        svg.text(rx + 24, y + 46, q, { cls: 't-sm', anchor: 'start' }), at) +
        tag(rx + half - 230, y + 20, 206, 38, who, 'orange', at + 150);
    });
    body += svg.enter(svg.g(
      svg.rect(0, 330, 1440, 72, { cls: 'zone', r: 16 }) +
      svg.text(28, 373, 'COPILOT', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(160, 373, 'Drafts one message to both owners, with both facts. The engineer sends it.', { cls: 't-sm', anchor: 'start' }),
      { cls: 'z-purple' }), 2200);
    body += band(422, 'Having access to the resource is not owning the decision → the change waits', 'orange', 2500);
    const label = `Still open from Part 2: add the partner IP rule to stpaystorestg. Facts Copilot gathered: ${facts.map((f) => `${f[0]} (${f[1]})`).join('; ')}. Decisions and owners: ${asks.map((a) => `${a[0]} ${a[1].toLowerCase()}`).join('; ')}. Copilot drafts one message to both owners with both facts; the engineer sends it. Having access to the resource is not owning the decision; the change waits.`;
    return `${html.head(s)}${svg.scene(1440, 486, label, body, 'owner-decides')}`;
  };

  /* Part 4: the same four questions carry to other Azure tasks. */
  const otherTasks = (s) => {
    const cols = [
      { x: 0, w: 330, head: 'TASK' },
      { x: 360, w: 330, head: 'COPILOT READS', z: 'remote' },
      { x: 720, w: 400, head: 'CHECK BEFORE TRUSTING IT', z: 'green' },
      { x: 1150, w: 290, head: 'WHO DECIDES', z: 'orange' }
    ];
    const rows = [
      ['Clone an environment', 'Source config, target policy', 'Every difference is on purpose', { tag: 'PLATFORM LEAD', z: 'orange' }],
      ['Investigate an incident', 'Log Analytics workspace', 'Query, time window, sample size', { tag: 'SERVICE OWNER', z: 'orange' }],
      ['Review IaC before merge', 'Bicep and live state', 'what-if output matches intent', { tag: 'CHANGE APPROVER', z: 'orange' }],
      ['Run a background audit', 'Subscription inventory', 'Report, run time, identity used', { tag: 'NAMED TASK OWNER', z: 'orange' }]
    ];
    const g = grid(cols, rows, { rh: 62, rg: 12, step: 360 });
    const body = g.body + band(g.end + 20, 'Same questions every time: what was read, as whom, what proves it, who decides', 'purple', g.last + 100);
    const label = `The same questions on other tasks. ${rows.map((r) => `${cellText(r[0])}: Copilot reads ${cellText(r[1])}; check ${cellText(r[2])}; ${cellText(r[3]).toLowerCase()} decides`).join('. ')}.`;
    return `${html.head(s)}${svg.scene(1440, g.end + 84, label, body, 'other-tasks')}`;
  };

  /* Closer: one habit per part, each anchored to its moment in the paystore-staging story. */
  const storyRecap = (s) => {
    const cw = 336;
    const gap = 32;
    const ch = 330;
    const parts = [
      { z: 'remote', k: 'PART 1 · QUERY', when: '10:41', moment: ['Re-query catches the', '10:15 partner rule'], habit: ['Every answer', 'carries a receipt'], check: 'scope · identity · time' },
      { z: 'purple', k: 'PART 2 · PLAN', when: '11:05', moment: ['Policy check turns the', 'IP rule into an endpoint'], habit: ['Check live', 'before you plan'], check: 'what-if · 3 · 0 · 0' },
      { z: 'green', k: 'PART 3 · DEPLOY', when: '11:24', moment: ['The result matches', 'the approved what-if'], habit: ['Hold the deploy', 'to the preview'], check: 're-query after deploy' },
      { z: 'orange', k: 'PART 4 · AUTHORITY', when: '4 green lights', moment: ['The partner rule waits', 'for its two owners'], habit: ['Know who gave', 'each green light'], check: 'role · approval · confirm' }
    ];
    let body = '';
    parts.forEach((p, i) => {
      const x = i * (cw + gap);
      const at = 350 + i * 450;
      body += svg.enter(svg.g(
        svg.rect(x, 0, cw, ch, { cls: 'box', r: 18 }) +
        svg.rect(x, 0, cw, 8, { cls: 'card-top', r: 4 }) +
        svg.text(x + 26, 44, p.k, { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(x + 26, 90, p.when, { cls: 't-lg t-mono z-text', anchor: 'start' }) +
        p.moment.map((l, j) => svg.text(x + 26, 124 + j * 26, l, { cls: 't-sm t-muted', anchor: 'start' })).join('') +
        svg.path(`M${x + 26} 184 H${x + cw - 26}`, { cls: 'wire' }) +
        svg.text(x + 26, 218, 'THE HABIT', { cls: 't-xs t-mono', anchor: 'start' }) +
        p.habit.map((l, j) => svg.text(x + 26, 256 + j * 40, l, { cls: 't-lg', anchor: 'start' })).join(''),
        { cls: `z-${p.z}` }), at);
      body += svg.enter(svg.g(
        svg.rect(x, ch + 16, cw, 48, { cls: 'zone', r: 12 }) +
        svg.text(x + cw / 2, ch + 47, p.check, { cls: 't-xs t-mono z-text' }),
        { cls: `z-${p.z}` }), at + 200);
    });
    body += band(ch + 100, 'Scope, evidence, and an owner travel with every Azure answer', 'green', 350 + parts.length * 450 + 150);
    const label = `One ticket, four habits. ${parts.map((p) => `${p.k.toLowerCase()}: at ${p.when}, ${p.moment.join(' ')}. Habit: ${p.habit.join(' ')}. Check: ${p.check}`).join('. ')}. Scope, evidence, and an owner travel with every Azure answer.`;
    return `${html.head(s)}${svg.scene(1440, ch + 164, label, body, 'story-recap')}`;
  };

  window.SCENES = {
    'azure-ring': ring,
    'core-lanes': coreLanes,
    'scoped-ask': scopedAsk,
    'answer-receipt': answerReceipt,
    'context-drift': contextDrift,
    'staging-draft': stagingDraft,
    'ticket-time': ticketTime,
    'clarify-questions': clarifyQuestions,
    'live-checks': liveChecks,
    'plan-receipt': planReceipt,
    'approval-path': approvalPath,
    'deploy-stack': deployStack,
    'skill-gates': skillGates,
    'deploy-trace': deployTrace,
    'setup-choices': setupChoices,
    'tools-vs-rights': toolsVsRights,
    'four-green-lights': fourGreenLights,
    'role-scope': roleScope,
    'connections': connections,
    'owner-decides': ownerDecides,
    'other-tasks': otherTasks,
    'story-recap': storyRecap
  };
})();
