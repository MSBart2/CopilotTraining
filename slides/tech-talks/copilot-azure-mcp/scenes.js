/* Deck-only visuals. Shared frames and patterns stay in slides/native/. */
(() => {
  const { svg, html } = window.Kit;

  const ring = () => {
    const nodes = [
      { x: 120, title: 'QUERY', detail: 'scope + fields', z: 'local' },
      { x: 320, title: 'PLAN', detail: 'assumptions', z: 'purple' },
      { x: 520, title: 'REVIEW', detail: 'evidence + owner', z: 'orange' }
    ];
    const y = 310;
    let body = svg.path(`M150 ${y}L610 ${y}`, { cls: 'wire faint' });
    body += svg.trace(`M150 ${y}L610 ${y}`, { cls: 'route z-purple', at: 400, dur: 1300 });
    nodes.forEach((n, i) => {
      body += svg.enter(
        svg.rect(n.x - 82, y - 56, 164, 112, { cls: 'box', r: 18 }) +
        svg.text(n.x, y - 10, n.title, { cls: 't-lg' }) +
        svg.text(n.x, y + 26, n.detail, { cls: 't-xs' }),
        500 + i * 350, `z-${n.z}`);
      body += svg.pop(svg.circle(n.x, y - 56, 11, { cls: 'stop' }), 650 + i * 350);
    });
    body += svg.g(
      svg.rect(170, 105, 420, 90, { cls: 'zone', r: 18 }) +
      svg.text(380, 145, 'AZURE CONTEXT', { cls: 't-xs t-mono z-text' }) +
      svg.text(380, 177, 'informs · does not approve', { cls: 't-lg z-text' }),
      { cls: 'z-green' });
    return svg.scene(760, 620,
      'A three-step loop: query scoped Azure context, plan a proposal, and review evidence with a human owner.', body, 'azure-loop');
  };

  const threePaths = (s) => {
    const cols = [
      { x: 0, z: 'local', title: 'Manual Azure work', a: 'Person selects tools', b: 'Person sequences checks', c: 'Person reviews and acts' },
      { x: 492, z: 'remote', title: 'MCP tools', a: 'Expose structured calls', b: 'Server calls with identity', c: 'Azure authorizes each call' },
      { x: 984, z: 'purple', title: 'Skills + MCP', a: 'Guidance may shape steps', b: 'Host may call available tools', c: 'People still verify and own' }
    ];
    let body = '';
    cols.forEach((c, i) => {
      body += svg.enter(
        svg.rect(c.x, 20, 456, 360, { cls: 'box', r: 20 }) +
        svg.rect(c.x, 20, 456, 8, { cls: 'card-top', r: 4 }) +
        svg.text(c.x + 30, 78, c.title, { cls: 't-lg', anchor: 'start' }) +
        svg.rect(c.x + 28, 112, 400, 58, { cls: 'zone', r: 12 }) +
        svg.text(c.x + 228, 149, c.a, { cls: 't-sm z-text' }) +
        svg.rect(c.x + 28, 190, 400, 58, { cls: 'zone', r: 12 }) +
        svg.text(c.x + 228, 227, c.b, { cls: 't-sm z-text' }) +
        svg.rect(c.x + 28, 268, 400, 72, { cls: 'zone', r: 12 }) +
        svg.lines(c.x + 228, 298, c.c, { cls: 't-sm z-text', max: 30, lh: 23 }),
        350 + i * 260, `z-${c.z}`);
    });
    const label = `${s.title}. Manual work sequences the checks; MCP exposes structured calls; Skills may guide a host workflow. People verify and own consequential actions in every case.`;
    return `${html.head(s)}${svg.scene(1440, 400, label, body, 'three-paths')}${html.footnote(s.footnote)}`;
  };

  const planEvidence = (s) => {
    const left = 0;
    const right = 744;
    let body =
      svg.text(left + 18, 38, 'PLAN INPUT', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(right + 18, 38, 'SAMPLE CHECK OUTPUT', { cls: 't-xs t-mono', anchor: 'start' });
    const rows = [
      ['East US · Standard S2', 'Capacity available?', 'ILLUSTRATIVE · VERIFY'],
      ['prod-vnet / payments-subnet', 'Subnet exists?', 'ILLUSTRATIVE · VERIFY'],
      ['payments-subnet firewall', 'Rule required?', 'PROPOSED CHANGE · REVIEW']
    ];
    rows.forEach((r, i) => {
      const y = 66 + i * 112;
      const at = 350 + i * 300;
      body += svg.enter(
        svg.rect(left, y, 650, 88, { cls: 'box soft', r: 14 }) +
        svg.text(left + 24, y + 33, r[0], { cls: 't-sm', anchor: 'start' }) +
        svg.text(left + 24, y + 64, r[1], { cls: 't-xs', anchor: 'start' }) +
        svg.g(svg.rect(right, y, 650, 88, { cls: 'zone', r: 14 }) +
          svg.text(right + 325, y + 52, r[2], { cls: 't-xs t-mono z-text' }), { cls: 'z-orange' }),
        at);
    });
    const label = 'Illustrative planning example pairs three proposed infrastructure inputs with checks explicitly marked illustrative or requiring review.';
    return `${html.head(s)}${svg.scene(1440, 420, label, body, 'plan-evidence')}`;
  };

  const stackArchitecture = (s) => {
    const x = [0, 365, 730, 1095];
    const items = [
      { title: 'Copilot host', detail: 'context · tools · controls', z: 'local' },
      { title: 'Azure Skills', detail: 'workflow guidance', z: 'purple' },
      { title: 'Azure MCP', detail: 'structured tool server', z: 'remote' },
      { title: 'Azure APIs', detail: 'authenticate + authorize', z: 'green' }
    ];
    let body = '';
    items.forEach((it, i) => {
      body += svg.enter(
        svg.rect(x[i], 110, 300, 180, { cls: 'box', r: 18 }) +
        svg.text(x[i] + 150, 166, it.title, { cls: 't-lg' }) +
        svg.lines(x[i] + 150, 214, it.detail, { cls: 't-muted t-sm', max: 24, lh: 26 }),
        350 + i * 260, `z-${it.z}`);
      if (i < items.length - 1) {
        const d = `M${x[i] + 300} 200L${x[i + 1] - 14} 200`;
        body += svg.trace(d, { cls: `wire link ${i === 2 ? 'z-orange' : ''}`, at: 700 + i * 320, dur: 420 });
        body += svg.pop(svg.path(`M${x[i + 1] - 24} 190L${x[i + 1] - 12} 200L${x[i + 1] - 24} 210`, { cls: 'wire link' }), 900 + i * 320);
      }
    });
    body += svg.g(
      svg.rect(165, 340, 1110, 64, { cls: 'zone', r: 16 }) +
      svg.text(720, 380, 'Guidance is not permission · tool availability is not approval', { cls: 't-sm z-text' }),
      { cls: 'z-orange' });
    const label = 'Copilot host may use Azure Skills guidance and Azure MCP tools. The Azure service authenticates and authorizes calls. Guidance and tool availability do not grant permission or approval.';
    return `${html.head(s)}${svg.scene(1440, 430, label, body, 'stack-architecture')}`;
  };

  const authorityMap = (s) => {
    const rows = [
      { x: 0, z: 'local', title: 'Authentication', prompt: 'Who is connected?', result: 'Principal + credential' },
      { x: 365, z: 'remote', title: 'Authorization', prompt: 'What can it do here?', result: 'Role + scope + policy' },
      { x: 730, z: 'orange', title: 'Host confirmation', prompt: 'Does the host ask first?', result: 'Tool approval control' },
      { x: 1095, z: 'purple', title: 'Owner approval', prompt: 'Who accepts the change?', result: 'Governed workflow' }
    ];
    let body = '';
    rows.forEach((r, i) => {
      body += svg.enter(
        svg.rect(r.x, 60, 300, 290, { cls: 'box', r: 18 }) +
        svg.rect(r.x + 18, 82, 264, 58, { cls: 'zone', r: 12 }) +
        svg.lines(r.x + 150, 106, r.title, { cls: 't-sm z-text', max: 22, lh: 22 }) +
        svg.lines(r.x + 150, 196, r.prompt, { cls: 't-lg', max: 22, lh: 30 }) +
        svg.lines(r.x + 150, 264, r.result, { cls: 't-muted t-sm', max: 24, lh: 24 }),
        350 + i * 250, `z-${r.z}`);
    });
    const label = 'Four distinct checks: authentication identifies the principal; authorization limits operations; host confirmation gates a tool call; owner approval accepts a change.';
    return `${html.head(s)}${svg.scene(1440, 390, label, body, 'authority-map')}`;
  };

  const verifyProposal = (s) => {
    const lx = 0;
    const rx = 744;
    const pairs = [
      ['Bicep: payments-subnet', 'Evidence: subnet ID + delegation', 'CHECK SCOPE + CURRENT STATE'],
      ['Bicep: consumption plan', 'Evidence: networking support', 'CHECK SERVICE CONSTRAINTS'],
      ['Bicep: SQL firewall range', 'Evidence: allowed network path', 'CHECK IDENTITY + POLICY']
    ];
    let body =
      svg.text(lx + 20, 34, 'DECLARED INPUT', { cls: 't-xs t-mono', anchor: 'start' }) +
      svg.text(rx + 20, 34, 'REVIEW EVIDENCE', { cls: 't-xs t-mono', anchor: 'start' });
    pairs.forEach((p, i) => {
      const y = 58 + i * 106;
      body += svg.enter(
        svg.rect(lx, y, 650, 78, { cls: 'box soft', r: 12 }) +
        svg.text(lx + 22, y + 47, p[0], { cls: 't-sm', anchor: 'start' }) +
        svg.g(svg.rect(rx, y, 650, 78, { cls: 'zone', r: 12 }) +
          svg.text(rx + 325, y + 34, p[1], { cls: 't-sm z-text' }) +
          svg.text(rx + 325, y + 59, p[2], { cls: 't-xs t-mono z-text' }), { cls: 'z-green' }),
        350 + i * 300);
    });
    const label = 'Illustrative Bicep assumptions are paired with required review evidence for network, service plan, and identity/policy.';
    return `${html.head(s)}${svg.scene(1440, 390, label, body, 'verify-proposal')}`;
  };

  window.SCENES = {
    'azure-ring': ring,
    'three-paths': threePaths,
    'plan-evidence': planEvidence,
    'stack-architecture': stackArchitecture,
    'authority-map': authorityMap,
    'verify-proposal': verifyProposal
  };
})();
