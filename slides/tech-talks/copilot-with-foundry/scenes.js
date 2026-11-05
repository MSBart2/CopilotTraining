/*
  Copilot with Foundry — deck-only diagrams.
  Shared frames and patterns remain in slides/native; these scenes show this talk's actors.
*/
(() => {
  const { svg, html } = window.Kit;
  const textBox = (x, y, w, h, title, body, z = 'local', opts = {}) => {
    const tx = x + (opts.pad || 24);
    const bodyY = y + (opts.bodyY || 78);
    return svg.g(
      svg.rect(x, y, w, h, { cls: opts.soft ? 'box soft' : 'box', r: opts.r || 18 }) +
      svg.text(tx, y + 42, title, { cls: opts.titleClass || 't-lg', anchor: 'start' }) +
      svg.lines(tx, bodyY, body, { cls: 't-muted', anchor: 'start', max: opts.max || 42, lh: opts.lh || 28 }),
      { cls: `z-${z}` });
  };
  const pill = (x, y, label, z) => svg.chip(x, y, label, { z, size: 17, h: 34, pad: 16 }).markup;
  const frame = (s, label, inner, height = 490, name = s.id) =>
    `${html.head(s)}${svg.scene(1440, height, label, inner, name)}`;

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
    const body =
      svg.g(svg.rect(0, 20, 560, 214, { cls: 'box', r: 18 }) +
        svg.text(28, 58, 'CheckoutService.cs · illustrative code', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(42, 112, 'if (customer.IsPremium)', { cls: 't-lg t-mono', anchor: 'start' }) +
        svg.text(70, 154, '{', { cls: 't-lg t-mono', anchor: 'start' }) +
        svg.text(94, 194, 'bypassFraudChecks();', { cls: 't-lg t-mono z-text', anchor: 'start' }) +
        svg.text(70, 222, '}', { cls: 't-lg t-mono', anchor: 'start' }), { cls: 'z-purple' }) +
      svg.enter(textBox(608, 20, 832, 98, 'Repository can establish', 'Sample trace: PR #413 · issue #9021 · commit history', 'local', { bodyY: 70, max: 60, lh: 24 })) +
      svg.enter(textBox(608, 138, 832, 98, 'Repository does not establish', 'Why the exception was accepted · whether it remains valid', 'orange', { bodyY: 70, max: 60, lh: 24 }), 250) +
      svg.g(svg.rect(0, 276, 1440, 102, { cls: 'zone', r: 18 }) +
        svg.text(32, 316, 'OPEN QUESTION', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(32, 354, 'Which authoritative decision record explains this behavior today?', { cls: 't-lg', anchor: 'start' }), { cls: 'z-orange' });
    return frame(s, 'An illustrative code branch has a sample PR and issue trace, while its rationale and current validity remain unknown.', body, 410, 'code-gap');
  };

  const integrationMap = (s) => {
    const body =
      svg.pop(textBox(420, 6, 600, 98, 'MCP-capable agent host', 'Model proposes; client sends a tool request', 'purple', { bodyY: 70, max: 45, lh: 24 })) +
      svg.trace('M720 108L720 150M720 150L340 150L340 190M720 150L1100 150L1100 190', { cls: 'wire link', at: 450, dur: 850 }) +
      svg.enter(textBox(52, 190, 560, 134, 'GitHub MCP service', 'Repository, commits, pull requests, issues', 'local', { bodyY: 82, max: 42 })) +
      svg.enter(textBox(828, 190, 560, 134, 'Foundry IQ toolbox', 'Knowledge base and organizational records', 'purple', { bodyY: 82, max: 42 }), 300) +
      svg.trace('M332 326L332 362M1108 326L1108 362', { cls: 'wire link', at: 1000, dur: 500 }) +
      svg.enter(textBox(52, 370, 560, 112, 'GitHub-owned context', 'Implementation evidence from the repository', 'local', { bodyY: 74, max: 42 })) +
      svg.enter(textBox(828, 370, 560, 112, 'Foundry-owned context', 'Cited rationale from indexed sources', 'purple', { bodyY: 74, max: 42 }), 500) +
      pill(586, 130, 'tool request', 'purple') +
      svg.text(720, 344, 'Each service checks its own configured access', { cls: 't-xs t-mono' });
    return frame(s, 'The Copilot client requests two distinct providers; GitHub and Foundry services return their own implementation and organizational evidence.', body, 500, 'integration-map');
  };

  const deploymentManifest = (s) => {
    const cards = [
      [0, 0, 'Service', 'host: azure.ai.agent\\nproject · source · environment', 'local'],
      [738, 0, 'Model deployment', 'name · deployment identifier · dependency', 'purple'],
      [0, 204, 'Runtime endpoint', 'endpoint: /api/agent · application route', 'remote'],
      [738, 204, 'Tool endpoints', 'GITHUB_MCP_ENDPOINT\\nTOOLBOX_ENDPOINT', 'orange']
    ];
    const body = cards.map(([x, y, title, description, z], i) =>
      svg.enter(textBox(x, y, 700, 174, title, description.replace('\\n', ' · '), z, { max: 40, bodyY: 86, lh: 30 }), 150 * i)).join('') +
      svg.text(720, 402, 'Illustrative fields only · validate schema and values in the current sample', { cls: 't-xs t-mono' });
    return frame(s, 'An illustrative azure.yaml manifest groups host, model, endpoint, and tool configuration without asserting a validated deployment.', body, 430, 'deployment-manifest');
  };

  const identityBoundary = (s) => {
    const body =
      svg.trace('M450 186L520 186M920 186L990 186', { cls: 'wire link', at: 500, dur: 650 }) +
      svg.enter(textBox(0, 76, 430, 222, '1 · Workload identity', 'Which agent or service is calling?', 'purple', { max: 34, bodyY: 92, lh: 30 })) +
      svg.enter(textBox(505, 76, 430, 222, '2 · Resource permission', 'Which source may that identity read?', 'remote', { max: 34, bodyY: 92, lh: 30 }), 250) +
      svg.enter(textBox(1010, 76, 430, 222, '3 · Human approval', 'Who accepts or rejects a consequential change?', 'orange', { max: 34, bodyY: 92, lh: 30 }), 500) +
      svg.text(720, 360, 'Identity ≠ permission ≠ approval', { cls: 't-lg t-mono z-text' });
    return frame(s, 'Managed identity identifies a workload; resource permissions authorize access; a human owner approves consequential changes.', body, 410, 'identity-boundary');
  };

  const illustrativeReview = (s) => {
    const body =
      svg.g(svg.rect(90, 12, 1260, 400, { cls: 'box', r: 18 }) +
        svg.text(132, 64, 'ILLUSTRATIVE TEACHING RECORD · NOT A LIVE RETRIEVAL', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(132, 124, 'Architecture review · March 2023', { cls: 't-lg', anchor: 'start' }) +
        svg.text(132, 184, 'Problem', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(132, 222, 'Fraud-service latency was described as affecting checkout.', { cls: 't-muted t-sm', anchor: 'start' }) +
        svg.text(132, 270, 'Decision', { cls: 't-xs t-mono', anchor: 'start' }) +
        svg.text(132, 308, 'A temporary premium-customer bypass was approved pending migration.', { cls: 't-muted t-sm', anchor: 'start' }) +
        svg.text(132, 354, 'Review condition', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
        svg.text(132, 392, 'Revisit after migration; current status must be independently verified.', { cls: 't-muted t-sm', anchor: 'start' }), { cls: 'z-purple' });
    return frame(s, 'An explicitly illustrative March 2023 architecture review records a past rationale and a review condition, not current authorization.', body, 430, 'illustrative-review');
  };

  const agentTools = (s) => {
    const body =
      svg.pop(textBox(440, 0, 560, 110, 'Agent configuration', 'Two named MCP tools; instructions route the question', 'purple', { bodyY: 78, max: 46 })) +
      svg.trace('M720 116L720 164M720 164L340 164L340 198M720 164L1100 164L1100 198', { cls: 'wire link', at: 450, dur: 700 }) +
      svg.enter(textBox(0, 198, 660, 166, 'name: github', 'GITHUB_MCP_ENDPOINT · implementation evidence: code, PRs, issues', 'local', { bodyY: 88, max: 45, lh: 28 })) +
      svg.enter(textBox(780, 198, 660, 166, 'name: org_memory', 'TOOLBOX_ENDPOINT · organizational evidence: decisions and rationale', 'purple', { bodyY: 88, max: 45, lh: 28 }), 300) +
      svg.text(720, 420, 'Example configuration, not a validated SDK sample', { cls: 't-xs t-mono' });
    return frame(s, 'The sample agent names separate GitHub and Foundry IQ MCP tools and keeps the evidence domains visible.', body, 460, 'agent-tools');
  };

  const reasoningLoop = (s) => {
    const items = [
      ['1 · Trace', 'Client requests GitHub evidence', 'local'],
      ['2 · Find gap', 'Agent recognizes why is missing', 'orange'],
      ['3 · Retrieve', 'Client requests Foundry IQ', 'purple'],
      ['4 · Synthesize', 'Agent links code and decision', 'purple'],
      ['5 · Verify', 'Owner checks date and present state', 'orange'],
      ['6 · Propose', 'Agent offers a validation issue', 'green']
    ];
    const w = 448;
    const h = 156;
    const gx = 48;
    const gy = 198;
    const gapX = 24;
    const gapY = 28;
    const nodes = items.map(([title, detail, z], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return svg.enter(textBox(col * (w + gapX), row * (h + gapY), w, h, title, detail, z, { bodyY: 90, max: 33, lh: 28 }), 180 * i);
    }).join('');
    const links =
      svg.trace('M492 274L516 274M964 274L988 274M1230 356L1230 382M988 464L964 464M516 464L492 464', { cls: 'wire link', at: 450, dur: 1100 }) +
      svg.g(svg.text(720, 180, 'Action stops at a human-reviewed proposal', { cls: 't-xs t-mono z-text' }), { cls: 'z-orange' });
    return frame(s, 'Six steps move from repository trace through organizational retrieval and current verification to a proposal for human review.', nodes + links, 540, 'reasoning-loop');
  };

  const freshnessEvidence = (s) => {
    const body =
      svg.enter(textBox(0, 36, 440, 258, 'Historical source', 'Decision date\\nOwner and scope\\nCitation and review condition', 'purple', { bodyY: 92, max: 34, lh: 32 })) +
      svg.enter(textBox(500, 36, 440, 258, 'Current evidence', 'Present system state\\nLater decisions or policy\\nOwner confirms scope', 'remote', { bodyY: 92, max: 34, lh: 32 }), 250) +
      svg.enter(textBox(1000, 36, 440, 258, 'Review result', 'Evidence agrees → propose\\nEvidence conflicts → escalate\\nEvidence missing → ask', 'orange', { bodyY: 92, max: 34, lh: 32 }), 500) +
      svg.trace('M440 164L500 164M940 164L1000 164', { cls: 'wire link', at: 750, dur: 600 }) +
      svg.text(720, 364, 'Retrieval relevance is not proof of truth or freshness', { cls: 't-lg t-mono' });
    return frame(s, 'A historical citation and current-state evidence feed a review result; missing or conflicting evidence triggers a question or escalation.', body, 420, 'freshness-evidence');
  };

  const decisionTree = (s) => {
    const gates = [
      ['1', 'A consequential why-question?', 'No → stay with existing context'],
      ['2', 'Authoritative record exists?', 'No → capture the decision'],
      ['3', 'Access approved for this caller?', 'No → request owner review'],
      ['4', 'Current evidence supports a change?', 'No → ask or escalate']
    ];
    const body = gates.map(([n, title, no], i) => {
      const y = i * 100;
      const x = 70;
      return svg.enter(
        svg.g(svg.rect(x, y, 850, 78, { cls: 'box', r: 14 }) +
          svg.circle(x + 38, y + 39, 20, { cls: 'stop' }) +
          svg.text(x + 38, y + 46, n, { cls: 't-xs t-mono' }) +
          svg.text(x + 80, y + 48, title, { cls: 't-sm', anchor: 'start' }), { cls: 'z-purple' }) +
        svg.g(svg.text(1010, y + 30, no, { cls: 't-xs z-text', anchor: 'start' }) +
          svg.text(1010, y + 56, 'NO', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-orange' }), 160 * i);
    }).join('') +
      svg.trace('M108 80L108 96M108 180L108 196M108 280L108 296', { cls: 'wire link', at: 550, dur: 700 }) +
      svg.g(svg.rect(70, 414, 850, 70, { cls: 'zone', r: 14 }) +
        svg.text(110, 457, 'YES at all gates → retrieve, verify, then propose for human review', { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-green' });
    return frame(s, 'Four decision gates route missing sources, unapproved access, or unsupported current evidence away from autonomous action.', body, 500, 'decision-tree');
  };

  const estimateFilter = (s) => {
    const body =
      svg.g(svg.rect(0, 34, 610, 318, { cls: 'box', r: 20 }) +
        svg.text(305, 112, '5–10%', { cls: 'ba-num z-text' }) +
        svg.text(305, 166, 'SOURCE README HEURISTIC', { cls: 't-xs t-mono' }) +
        svg.text(305, 224, 'No measured task sample supplied', { cls: 't-muted t-sm' }) +
        svg.text(305, 270, 'Do not present as a universal rate', { cls: 't-muted t-sm' }), { cls: 'z-orange' }) +
      svg.enter(textBox(680, 34, 760, 318, 'Measure locally', 'Sample real tasks; label question and provider; record decision impact; track false matches and reviewer effort; define a window and owner.', 'local', { bodyY: 96, max: 45, lh: 40 })) +
      svg.text(720, 408, 'Estimate → local observation → adoption decision', { cls: 't-lg t-mono' });
    return frame(s, 'The five-to-ten-percent figure is explicitly an unmeasured README heuristic; adoption decisions require local task observations.', body, 460, 'estimate-filter');
  };

  const implementationArtifacts = (s) => {
    const boxes = [
      [0, 0, 'azure.yaml', 'Deployment shape\\nCheck host, model, project, endpoints', 'local'],
      [738, 0, 'setup-foundry-iq.py', 'Knowledge setup sketch\\nCheck API, index, sources, identity', 'purple'],
      [0, 194, 'combined-context-agent.py', 'Two-tool agent example\\nCheck names, endpoints, permissions', 'remote'],
      [738, 194, 'context-layer-reference.md', 'Question router\\nKeep a copy in team documentation', 'green']
    ];
    const body = boxes.map(([x, y, title, desc, z], i) =>
      svg.enter(textBox(x, y, 700, 166, title, desc.replace('\\n', ' · '), z, { bodyY: 84, max: 45 }), 150 * i)).join('') +
      svg.g(svg.rect(0, 386, 1440, 72, { cls: 'zone', r: 16 }) +
        svg.text(24, 431, 'Start read-only or proposal-only · validate evidence and authority before write access', { cls: 't-sm z-text', anchor: 'start' }), { cls: 'z-orange' });
    return frame(s, 'Four named artifacts from the README support a bounded pilot, with a proposal-only authority boundary.', body, 470, 'implementation-artifacts');
  };

  window.SCENES = {
    'memory-map': memoryMap,
    'code-gap': codeGap,
    'integration-map': integrationMap,
    'deployment-manifest': deploymentManifest,
    'identity-boundary': identityBoundary,
    'illustrative-review': illustrativeReview,
    'agent-tools': agentTools,
    'reasoning-loop': reasoningLoop,
    'freshness-evidence': freshnessEvidence,
    'decision-tree': decisionTree,
    'estimate-filter': estimateFilter,
    'implementation-artifacts': implementationArtifacts
  };
})();
