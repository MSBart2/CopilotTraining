/*
  Agentic SDLC — native teaching source.
  Numeric claims inherited from the long README are explicitly marked as
  illustrative scenarios or planning targets unless the slide says otherwise.
*/
(() => {
  const S = (id, part, title, more = {}) => ({
    id, part, title, section: part ? `Part ${part}` : 'Frame', ...more
  });

  const SRC = {
    agentrc: { label: 'AgentRC repository', href: 'https://github.com/microsoft/agentrc' },
    agentrcConcepts: { label: 'AgentRC concepts and maturity model', href: 'https://github.com/microsoft/agentrc/blob/main/docs/concepts.md' },
    actions: { label: 'GitHub Actions documentation', href: 'https://docs.github.com/en/actions' },
    caching: { label: 'GitHub Actions caching guide', href: 'https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows' },
    nx: { label: 'Nx monorepo tools', href: 'https://nx.dev/' },
    slsa: { label: 'SLSA supply-chain security framework', href: 'https://slsa.dev/' }
  };
  const ref = (...keys) => keys.map((key) => SRC[key]);

  const slides = [
    S('title', 0, 'Agentic SDLC', {
      subtitle: 'Designing the SDLC Your Agents Deserve',
      tagline: 'Platform readiness, developer adoption, and governance compound together.',
      meta: 'CopilotTraining · Practitioner Tech Talk',
      visual: 'sdlc-loop',
      thesis: 'L3 is the launchpad: reliable context, repeatable checks, and habitual use create the conditions for outcome-focused governance and measured autonomy.',
      duration: 90,
      sources: ref('agentrcConcepts')
    }),
    S('core-question', 0, 'How do I get agent-scale delivery without losing confidence in what we ship?', {
      subtitle: 'A practical route: assess maturity, tighten the handoffs, and measure what the evidence can support.',
      highlight: 'Platform and adoption advance together; L3 is where repeatability and quality first compound.',
      routingLabel: 'Build trust in sequence',
      routing: ['assess', 'govern', 'verify', 'scale'],
      roles: [
        { icon: '🧑‍💻', title: 'Developer', description: 'Give an agent bounded work and enough repository context.' },
        { icon: '🏗️', title: 'Platform owner', description: 'Make builds, boundaries, and policy results repeatable.' },
        { icon: '🛡️', title: 'Reviewer', description: 'Approve intent, risk, and outcomes using visible evidence.' }
      ],
      stats: [
        { title: 'One maturity map', description: 'Rate platform and adoption separately.' },
        { title: 'Three system layers', description: 'Repository, PR governance, and CI.' },
        { title: 'A local next step', description: 'Try the walkthrough in your own fork.' }
      ],
      sources: ref('agentrcConcepts', 'actions')
    }),
    S('contents', 0, 'Four decisions, one delivery system', {
      sections: [
        { icon: '📐', title: 'Maturity Model', subtitle: 'Assess the launchpad', blurb: 'Read platform signals beside adoption and governance.', slide: 4 },
        { icon: '🔀', title: 'PR Workflows', subtitle: 'Move review up-stack', blurb: 'Give Copilot intent; give owners evidence and authority.', slide: 11 },
        { icon: '🏭', title: 'Trust Manufacturing', subtitle: 'Make CI a signal', blurb: 'Shorten feedback, control flakes, and preserve provenance.', slide: 18 },
        { icon: '🗺️', title: 'Implementation Roadmap', subtitle: 'Advance by evidence', blurb: 'Use L3 as a foundation, then expand with measured gates.', slide: 25 }
      ],
      sources: ref('agentrcConcepts', 'actions')
    }),

    S('part-1', 1, 'Maturity Model', {
      scene: 'opener',
      subtitle: 'Rate the platform and the team together before choosing an investment.',
      cards: [
        { icon: '📊', title: 'Five levels', blurb: 'Functional through autonomous' },
        { icon: '🏗️', title: 'Two dimensions', blurb: 'Platform readiness + adoption' },
        { icon: '🎯', title: 'A launchpad', blurb: 'L3 makes repeatability compound' }
      ],
      terminal: { context: 'Assess → Govern → Trust → Scale', detail: 'Find the next constraint; invest there first.' }
    }),
    S('maturity-map', 1, 'Maturity is a paired assessment, not a feature checklist', {
      scene: 'maturity-map',
      subtitle: 'A high platform score cannot substitute for team habits—or the reverse.',
      levels: [
        { level: 'L1', name: 'Functional', platform: 'Build + basic CI stable', adoption: 'Environment is being established', unlock: 'Repeatable baseline' },
        { level: 'L2', name: 'Documented', platform: 'Setup + conventions explicit', adoption: 'Copilot use starts to recur', unlock: 'Shared context' },
        { level: 'L3', name: 'Standardized', platform: 'CI, ownership, security gates', adoption: 'Daily use; bounded delegation', unlock: 'Quality infrastructure' },
        { level: 'L4', name: 'Optimized', platform: 'Enterprise tools + orchestration', adoption: 'Governance and use iterated', unlock: 'Context-aware workflows' },
        { level: 'L5', name: 'Autonomous', platform: 'Intent, policy, provenance', adoption: 'Outcome validation + measurement', unlock: 'Measured autonomy' }
      ],
      sources: ref('agentrcConcepts')
    }),
    S('l3-launchpad', 1, 'L3 is the first point where the parts compound', {
      scene: 'signals',
      rows: [
        { label: 'Platform floor', description: 'Build, test, lint, and deploy run repeatably.', tag: 'CI evidence', z: 'local' },
        { label: 'Agent context', description: 'Versioned instructions and deterministic setup guide work.', tag: 'Context', z: 'purple' },
        { label: 'Owner routing', description: 'Branch rules and CODEOWNERS preserve human authority.', tag: 'Authority', z: 'orange' },
        { label: 'Quality controls', description: 'Security checks and review run on every eligible PR.', tag: 'Verification', z: 'green' },
        { label: 'Adoption proof', description: 'Teams use bounded delegation and inspect the results.', tag: 'Practice', z: 'github' }
      ],
      footnote: 'Original maturity thresholds are planning signals, not universal certification criteria.',
      sources: ref('agentrcConcepts', 'actions')
    }),
    S('volume-breakpoint', 1, 'More generated code moves scarcity toward review capacity', {
      scene: 'volume-breakpoint',
      subtitle: 'The 50× comparison is a planning illustration, not a measured productivity result.',
      left: { value: '300', label: 'lines / reviewer / day', detail: 'Illustrative baseline from the source talk' },
      right: { value: '15,000', label: 'lines / reviewer / day', detail: 'Illustrative agent-scale comparison' },
      takeaway: 'The useful shift is from reading every line to validating intent, risk, and evidence.',
      sources: ref('agentrcConcepts')
    }),
    S('instruction-hierarchy', 1, 'Version the instructions where the task can use them', {
      scene: 'instruction-stack',
      layers: [
        { label: 'ORG', name: 'Organization policy', detail: 'Shared defaults; verify which surfaces receive them.', z: 'local' },
        { label: 'REPO', name: '.github/copilot-instructions.md', detail: 'Architecture, conventions, and common workflows.', z: 'purple' },
        { label: 'AGENT', name: 'AGENTS.md', detail: 'Build, test, and contribution steps for the agent workspace.', z: 'github' },
        { label: 'TASK', name: 'Prompt files + skills', detail: 'Reusable task workflow and acceptance context.', z: 'orange' },
        { label: 'REVIEW', name: 'Coding guidelines', detail: 'Review expectations maintained with the code.', z: 'green' }
      ],
      footnote: 'The source README notes organization instructions do not apply to every IDE surface; verify current scope before relying on them.',
      sources: ref('agentrc', 'agentrcConcepts')
    }),
    S('repo-decision', 1, 'Choose repository boundaries from change patterns and hard constraints', {
      scene: 'showdown',
      subtitle: 'A monorepo is a useful candidate when one feature routinely crosses repositories; it is not a universal default.',
      leftLabel: 'KEEP BOUNDARIES',
      rightLabel: 'CONSIDER A MONOREPO',
      pairs: [
        { left: { label: 'Independent lifecycle', note: 'Separate release cadence is real' }, right: { label: 'Frequent shared change', note: 'One feature spans multiple components', z: 'purple' } },
        { left: { label: 'Hard access boundary', note: 'Regulation or security requires separation' }, right: { label: 'Coordination is recurring', note: 'Multiple PRs and handoffs per feature', z: 'green' } },
        { left: { label: 'Temporary acquisition state', note: 'Plan an explicit revisit signal' }, right: { label: 'Cross-repo rate >30%', note: 'Source talk’s proposed decision threshold', z: 'orange' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Keep separation when it protects a real boundary' },
      outcomeRight: { icon: '↔', label: 'Pilot consolidation when coordination dominates' },
      footnote: 'The 30% threshold is a proposal to test against your own PR history, not an industry benchmark.',
      sources: ref('nx')
    }),
    S('monorepo-topology', 1, 'An atomic workspace makes ownership and dependencies inspectable', {
      scene: 'topology',
      subtitle: 'Keep deployable units distinct while sharing one dependency graph and CI view.',
      sources: ref('nx', 'actions')
    }),

    S('part-2', 2, 'PR Workflows', {
      scene: 'opener',
      subtitle: 'Keep humans accountable for intent and risk while automation handles repeatable checks.',
      cards: [
        { icon: '📝', title: 'Intent', blurb: 'What must the change do?' },
        { icon: '🧾', title: 'Evidence', blurb: 'What did the system verify?' },
        { icon: '🧑‍⚖️', title: 'Authority', blurb: 'Who can approve or stop it?' }
      ],
      terminal: { context: 'Bound coordination costs; review capacity is next.', detail: 'Move human attention to decisions automation cannot own.' }
    }),
    S('review-maturity', 2, 'Review mode evolves with readiness and delegation', {
      scene: 'signals',
      rows: [
        { label: 'L1 · Functional', description: 'Manual verification while the build baseline stabilizes.', tag: 'Manual', z: 'local' },
        { label: 'L2 · Documented', description: 'Human review uses shared repository context.', tag: 'Assisted', z: 'purple' },
        { label: 'L3 · Standardized', description: 'Repeatable CI, Code Review, branch rules, and owner checks.', tag: 'Gated', z: 'green' },
        { label: 'L4 · Optimized', description: 'Context-aware checks route exceptions to accountable owners.', tag: 'Exceptions', z: 'orange' },
        { label: 'L5 · Autonomous', description: 'People validate outcomes against policy and intent.', tag: 'Outcome', z: 'github' }
      ],
      sources: ref('agentrcConcepts', 'actions')
    }),
    S('intent-contract', 2, 'A bounded request gives Copilot intent, constraints, and acceptance evidence', {
      scene: 'intent-contract',
      subtitle: 'Illustrative password-reset request; the developer defines the contract, Copilot proposes an implementation.',
      intent: [
        ['Intent', 'Add password reset to user settings'],
        ['Constraint', 'Use existing email service; leave auth middleware unchanged'],
        ['Rule', 'Link expires in 1 hour; limit 3 attempts per hour'],
        ['Evidence', 'Email within 2 minutes; audit every request']
      ],
      sources: ref('actions')
    }),
    S('evidence-bundle', 2, 'A reviewer can inspect evidence without treating it as approval', {
      scene: 'evidence-cards',
      cards: [
        { icon: '📝', title: 'Intent', description: 'Link requirements, constraints, and acceptance criteria.' },
        { icon: '🧪', title: 'Tests', description: 'Show exact run status and domain-level result.' },
        { icon: '🔒', title: 'Security', description: 'Report secrets, SAST, and dependency checks.' },
        { icon: '🏗️', title: 'Architecture', description: 'Record boundary and dependency-graph results.' },
        { icon: '⚡', title: 'Performance', description: 'Compare measured behavior with a stated budget.' },
        { icon: '🚦', title: 'Deploy + rollback', description: 'Show staging, smoke, and recovery evidence.' }
      ],
      footnote: 'The example counts and pass results in the long README are illustrative, not observed production evidence.',
      sources: ref('actions')
    }),
    S('governance-gates', 2, 'Automate repeatable policy; reserve human approval for named decisions', {
      scene: 'four-phases',
      stageLabel: 'Human checkpoint',
      gateLabel: 'Evidence required',
      stages: [
        { label: '1', name: 'Intent validation', icon: '📝', description: 'Developer or product owner confirms scope and acceptance.' },
        { label: '2', name: 'Security risk', icon: '🔒', description: 'Security owner handles high-risk changes and exceptions.' },
        { label: '3', name: 'Architectural fit', icon: '🏗️', description: 'Code owner reviews boundary and design changes.' },
        { label: '4', name: 'Outcome validation', icon: '👤', description: 'Service owner approves the result and deployment readiness.', target: true }
      ],
      footnote: 'The source proposes 22 manual gates becoming 4 checkpoints and about 90% automated checks. These are design targets, not measured results.',
      sources: ref('actions', 'agentrcConcepts')
    }),
    S('context-aware-review', 2, 'Context can improve a warning; the agent does not become the approver', {
      scene: 'showdown',
      subtitle: 'Illustrative comparison from the source material—not a reported evaluation.',
      leftLabel: 'PATTERN MATCH',
      rightLabel: 'CONTEXTUAL TRIAGE',
      pairs: [
        { left: { label: 'Find “email”', note: 'Same rule for fixtures and production' }, right: { label: 'Inspect the use', note: 'Separate example data from real input', z: 'purple' } },
        { left: { label: 'Emit a warning', note: 'High noise may bury useful signals' }, right: { label: 'Explain the reason', note: 'Attach file and code-path evidence', z: 'green' } },
        { left: { label: 'Reviewer decides', note: 'Rule does not establish a violation' }, right: { label: 'Owner verifies', note: 'Human resolves sensitive findings', z: 'orange' } }
      ],
      outcomeLeft: { icon: '!', label: 'Rule output is a lead to inspect' },
      outcomeRight: { icon: '→', label: 'Agent output is triage evidence, not clearance' },
      sources: ref('actions')
    }),
    S('human-ownership', 2, 'CODEOWNERS routes decisions; branch rules keep approval with people', {
      scene: 'signals',
      rows: [
        { label: 'Copilot proposes', description: 'Coding agent creates a draft change and explains its work.', tag: 'Proposal', z: 'purple' },
        { label: 'CI verifies', description: 'Required checks report build, tests, and policy results.', tag: 'Evidence', z: 'green' },
        { label: 'Code owner reviews', description: 'Sensitive routes, data, and workflow changes reach owners.', tag: 'Review', z: 'orange' },
        { label: 'Service owner', description: 'Authorized human accepts merge or deployment risk.', tag: 'Authority', z: 'github' },
        { label: 'Team recovers', description: 'A failed check blocks; owner fixes, scopes, or escalates.', tag: 'Recovery', z: 'local' }
      ],
      sources: ref('actions')
    }),

    S('part-3', 3, 'Trust Manufacturing', {
      scene: 'opener',
      subtitle: 'CI produces timely, repeatable evidence that people can trust and act on.',
      cards: [
        { icon: '⏱️', title: 'Fast feedback', blurb: 'Shorten the agent iteration loop' },
        { icon: '🧪', title: 'Reliable checks', blurb: 'Make flaky signals visible' },
        { icon: '📜', title: 'Provenance', blurb: 'Record what was built and checked' }
      ],
      terminal: { context: 'A green check is evidence—not a guarantee.', detail: 'Trust depends on scope, repeatability, and ownership.' }
    }),
    S('trust-pipeline', 3, 'Stage CI so fast checks unblock iteration and deep checks protect release', {
      scene: 'four-phases',
      stageLabel: 'Validation stage',
      gateLabel: 'Failure blocks',
      stages: [
        { label: '1', name: 'Fast feedback', icon: '⚡', description: 'Build, affected tests, lint, and high-severity security; target under 10 minutes.' },
        { label: '2', name: 'Comprehensive', icon: '🔎', description: 'Full tests, deep security, performance, architecture, and compliance; target under 30 minutes.' },
        { label: '3', name: 'Pre-production', icon: '🚦', description: 'Staging, smoke, migration, rollback, and load checks when relevant.' , target: true }
      ],
      footnote: 'Targets are proposed budgets; keep owner escalation for high-risk failures and avoid skipping checks to meet the clock.',
      sources: ref('actions')
    }),
    S('ci-feedback', 3, 'Feedback time is a lever; the throughput figures are scenario math', {
      scene: 'showdown',
      subtitle: 'The source compares four repair iterations at 60-minute and 8-minute CI durations.',
      leftLabel: '60-MINUTE CI',
      rightLabel: '8-MINUTE CI',
      pairs: [
        { left: { label: '4 waits × 60 min', note: '240 minutes of CI waiting' }, right: { label: '4 waits × 8 min', note: '32 minutes of CI waiting', z: 'purple' } },
        { left: { label: 'Plus generation + fixes', note: 'Total elapsed time depends on task' }, right: { label: 'Plus generation + fixes', note: 'Same work; less waiting', z: 'green' } }
      ],
      outcomeLeft: { icon: '≈', label: 'Idle share estimated at 80%' },
      outcomeRight: { icon: '≈', label: 'Productive share estimated at 95%' },
      footnote: 'Idle/productive shares and 3 vs. 15 features/day are source estimates. Measure your own queue, runtime, and repair loop.',
      sources: ref('actions')
    }),
    S('affected-analysis', 3, 'Affected analysis runs the dependency closure of what changed', {
      scene: 'terminal',
      termTitle: 'ILLUSTRATIVE Nx COMMANDS · NOT A RECORDED RUN',
      transcript: [
        { type: 'prompt', text: 'git diff --name-only main...HEAD' },
        { type: 'response', lines: ['Changed: libs/auth/src/session.ts'] },
        { type: 'divider' },
        { type: 'prompt', text: 'nx affected:test --base=main' },
        { type: 'response', lines: ['Resolve the project dependency graph', 'Run tests for directly and transitively affected projects', 'Reuse valid cached results for unaffected inputs'] },
        { type: 'outcome', text: 'Illustrative budget math: 4 min tests + 1 min lint + 3 min build = 8 min' }
      ],
      footnote: 'The original README compares an 80-minute full-suite example with an 8-minute affected example; those timings are illustrative.',
      sources: ref('nx')
    }),
    S('flake-policy', 3, 'A flake needs an owner and a quarantine path before it erodes the signal', {
      scene: 'signals',
      rows: [
        { label: 'First failure', description: 'Capture the run, environment, seed, and affected test.', tag: 'Triage', z: 'purple' },
        { label: 'Critical-path flake', description: 'Quarantine visibly; keep the rest of the suite informative.', tag: 'Contain', z: 'orange' },
        { label: 'Named test owner', description: 'Fix within the proposed two-day window or delete with rationale.', tag: 'Repair', z: 'local' },
        { label: 'Weekly measurement', description: 'Track flake rate; original target is below 2%.', tag: 'Measure', z: 'green' }
      ],
      footnote: '“Zero tolerance” in the source is an operational policy for the critical path, not a claim that every test can be proven flake-free.',
      sources: ref('actions')
    }),
    S('hermetic-cache', 3, 'Pinned inputs make builds reproducible; correct cache keys make them faster', {
      scene: 'showdown',
      subtitle: 'Use immutable inputs first; cache only outputs whose validity you can establish.',
      leftLabel: 'UNPINNED INPUTS',
      rightLabel: 'REPEATABLE BUILD',
      pairs: [
        { left: { label: 'Floating base image', note: 'Same commit can see new packages' }, right: { label: 'Image digest + lockfile', note: 'Declare exact build inputs', z: 'purple' } },
        { left: { label: 'npm install', note: 'Resolution may change over time' }, right: { label: 'npm ci', note: 'Use the committed lockfile', z: 'green' } },
        { left: { label: 'Broad cache reuse', note: 'Stale results can hide a change' }, right: { label: 'Key by inputs', note: 'Invalidate on lockfile or source changes', z: 'orange' } }
      ],
      outcomeLeft: { icon: '!', label: 'Different inputs; uncertain signal' },
      outcomeRight: { icon: '→', label: 'Same declared inputs; inspectable result' },
      footnote: 'The source’s 23-to-3-minute cached-build example is illustrative, not a measured result for your pipeline.',
      sources: ref('actions', 'caching', 'nx')
    }),
    S('attestations', 3, 'An attestation records provenance; a reviewer still decides whether it is sufficient', {
      scene: 'terminal',
      termTitle: 'PROVENANCE FIELDS TO INSPECT',
      transcript: [
        { type: 'user', text: 'What produced this artifact, from which source and inputs?' },
        { type: 'response', lines: ['builder: GitHub Actions', 'source: repository URI + commit digest', 'materials: dependency identifiers', 'metadata: invocation and completeness'] },
        { type: 'divider' },
        { type: 'thinking', label: 'Release owner checks policy and trust boundary' },
        { type: 'outcome', text: 'Attestation supports audit; it does not prove the artifact is safe by itself.' }
      ],
      sources: ref('slsa', 'actions')
    }),

    S('part-4', 4, 'Roadmap to L5', {
      scene: 'opener',
      subtitle: 'Move one bottleneck at a time; each phase leaves observable evidence.',
      cards: [
        { icon: '⚙️', title: 'Phase 1 · L3', blurb: 'Repeatable foundation' },
        { icon: '🤖', title: 'Phase 2 · L4', blurb: 'Governed optimization' },
        { icon: '📈', title: 'Phase 3 · L5', blurb: 'Measured autonomy' }
      ],
      terminal: { context: 'Platform + adoption advance together', detail: 'Promotion follows evidence, not the label.' }
    }),
    S('phase-l3', 4, 'Phase 1 makes the everyday path repeatable', {
      scene: 'phase-checklist',
      phase: 'Phase 1 · L3 Standardized',
      leftTitle: 'Platform & tooling',
      left: ['Audit cross-repo changes; test a monorepo case', 'Build, test, lint, and deploy through CI', 'Add boundaries, CODEOWNERS, and security checks', 'Target PR checks under 10 minutes; track flakes'],
      rightTitle: 'Adoption & governance',
      right: ['Version repo instructions and AGENTS.md', 'Use structured issues for bounded agent tasks', 'Start automatic review and human owner checks', 'Baseline use, review time, and quality signals'],
      evidence: 'Advance when agent-created work follows the same repeatable checks and ownership rules.'
    }),
    S('phase-l4', 4, 'Phase 2 optimizes governance around real exceptions', {
      scene: 'phase-checklist',
      phase: 'Phase 2 · L4 Optimized',
      leftTitle: 'Platform & tooling',
      left: ['Connect only reviewed, scoped enterprise tools', 'Automate repeated checks and publish attestations', 'Quarantine flakes; improve cache and affected analysis', 'Test one multi-step agent workflow with clear limits'],
      rightTitle: 'Adoption & governance',
      right: ['Tune review rules from false-positive evidence', 'Curate instructions and prompt workflows', 'Revisit seats, cost, and org policy deliberately', 'Compare review turnaround with your baseline'],
      evidence: 'Advance when exceptions are visible, routed, and reviewed by named owners.'
    }),
    S('phase-l5', 4, 'Phase 3 expands autonomy only where the evidence supports it', {
      scene: 'phase-checklist',
      phase: 'Phase 3 · L5 Autonomous',
      leftTitle: 'Platform & tooling',
      left: ['Compose intent, agent work, CI, merge, and deploy', 'Gate automation on policy and complete evidence', 'Record build provenance and release attestations', 'Retain rollback, incident, and human override paths'],
      rightTitle: 'Adoption & measurement',
      right: ['Correlate usage with DORA and PR-cycle measures', 'Report estimates as estimates; publish the baseline', 'Name champions and content owners', 'Repeat assessment quarterly and adjust boundaries'],
      evidence: 'L5 is a measured operating mode; it is not a promise of 10–15 features per day.'
    }),
    S('fanhub-walkthrough', 4, 'The FanHub walkthrough turns the model into a repo-level experiment', {
      scene: 'four-phases',
      stageLabel: 'Walkthrough step',
      gateLabel: 'Inspect',
      stages: [
        { label: '1', name: 'Assess', icon: '🔎', description: 'Inspect the fork’s docs, CI, ownership, and current maturity.' },
        { label: '2', name: 'Add fast CI', icon: '⚙️', description: 'Create PR checks and require their status before merge.' },
        { label: '3', name: 'Route owners', icon: '👥', description: 'Add CODEOWNERS; verify sensitive paths reach humans.' },
        { label: '4', name: 'Bundle evidence', icon: '🧾', description: 'Add a PR template and baseline real cycle-time measures.', target: true }
      ],
      footnote: 'The linked walkthrough is an exercise, not a reported run or measured outcome. Start with a fork and adapt owners.',
      sources: ref('actions')
    }),

    S('before-after', 0, 'The system changes when every layer produces evidence', {
      before: [
        'Each repo needs a coordinated PR',
        'Review tries to inspect every implementation line',
        'Slow or flaky CI weakens the meaning of green',
        'Instructions and ownership remain implicit'
      ],
      after: [
        'Related changes share a reviewable boundary',
        'People validate intent, risk, and outcomes',
        'Repeatable checks expose evidence and failures',
        'Instructions and authority are versioned'
      ],
      metrics: [
        { value: 'L3', detail: 'repeatable launchpad' },
        { value: '4', detail: 'proposed human checkpoints' },
        { value: '<10 min', detail: 'proposed PR-check target' }
      ],
      subtitle: 'Target operating model; this slide does not report measured results.'
    }),
    S('today', 0, 'Start with the evidence your repository can produce this week', {
      scene: 'today-plan',
      horizons: [
        { icon: '🔎', label: 'Today', z: 'green', items: ['Rate platform and adoption separately', 'Measure PR check time and flake rate', 'Count recent changes crossing repository boundaries'] },
        { icon: '🧰', label: 'This week', z: 'local', items: ['Version or review repository instructions', 'Require CI and CODEOWNERS for sensitive paths', 'Choose one bounded agent task and define acceptance evidence'] },
        { icon: '📈', label: 'This month', z: 'purple', items: ['Pilot affected analysis and cache invalidation', 'Quarantine one flake and name its owner', 'Revisit the maturity score and choose the next constraint'] }
      ],
      takeaway: 'Apply the decision to one repository and record what the evidence says.'
    }),
    S('references', 0, 'References and working artifacts', {
      groups: [
        { title: 'AgentRC readiness', z: 'local', items: [
          { ...SRC.agentrc, description: 'Repository AI-readiness workflow and maturity context.' },
          { ...SRC.agentrcConcepts, description: 'Maturity levels and readiness pillars.' }
        ] },
        { title: 'Repository + CI', z: 'github', items: [
          { ...SRC.nx, description: 'Build graph, module boundaries, affected analysis, and caching.' },
          { ...SRC.actions, description: 'Workflow automation and CI controls.' },
          { ...SRC.caching, description: 'GitHub Actions cache practices.' }
        ] },
        { title: 'Provenance', z: 'purple', items: [
          { ...SRC.slsa, description: 'Supply-chain provenance and attestation concepts.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Agentic SDLC', {
      subtitle: 'Designing the SDLC Your Agents Deserve',
      prompt: 'Which constraint will you measure first—and who owns the decision when the evidence disagrees?',
      cards: [
        { value: 'L3', detail: 'The repeatable launchpad' },
        { value: 'Intent', detail: 'The human’s task contract' },
        { value: 'Evidence', detail: 'The system’s observable result' }
      ],
      visual: 'sdlc-loop'
    })
  ];

  const NOTES = {
    title: {
      notes: ['"We can give agents more useful work when the delivery system supplies clear context, fast feedback, and accountable decisions.', '"Today is about the infrastructure around the agent: the repository, the pull request, and the pipeline.'],
      know: ['The title and thesis preserve the original talk’s focus on platform readiness, developer adoption, and governance.', 'The original README projects 500–2,000 generated lines per feature, 10–15 features/day, and a 100× annual throughput increase. These are unsupported source projections, not observed results; the deck does not repeat them as outcomes.', 'The 90-minute slot includes four minutes for audience questions; budgets below are estimates until a presenter times a run-through.'],
      seconds: 20
    },
    'core-question': {
      notes: ['"The question is how to expand delivery without losing confidence in what ships.', '"We will assess readiness first, then follow the handoffs where human judgment and machine evidence meet.'],
      know: ['Thesis: L3 is a launchpad where repeatability, adoption, and quality infrastructure begin to compound; L5 is a result of progressing through earlier capability, not a shortcut.', 'Selected judgment lenses: Context (what the agent can safely use), Delegation (what the agent can propose), Verification (what evidence supports acceptance), and Authority (who may approve or stop the change).'],
      seconds: 60
    },
    contents: {
      notes: ['"We will start with the maturity map, then redesign the PR handoff, make CI a trustworthy producer of evidence, and finish with a phased path.', 'Point out the linked slide numbers: each opens a part with its decision and proof.'],
      seconds: 30
    },
    'part-1': {
      notes: ['"First, let’s assess the system we already have.', '"A maturity label is useful only when platform signals and team practice agree.'],
      know: ['The maturity framing follows the AgentRC model; the thresholds used later are talk-specific planning signals.'],
      sources: ref('agentrcConcepts'),
      seconds: 20
    },
    'maturity-map': {
      notes: ['"The five levels describe a progression from a stable functional floor to autonomous delivery.', '"Read platform and adoption side by side; a mismatch predicts the next bottleneck."'],
      know: ['L1 Functional: reliable build scripts; build and tests on each push; stable, pinned dependencies; a predictable build; the source floor is at least 90% CI success excluding code failures. There is no comparable adoption score until environment and licensing exist.', 'L2 Documented: setup/build/test/deploy instructions; explicit lint, naming, and architecture conventions; repository instructions in the primary repo; Copilot configured for developers; Chat and CLI use; deliberate model selection. Source targets: monthly active users at least 30%, two modalities, and instructions reviewed in a PR within 90 days.', 'L3 Standardized: automated build/test/lint/deploy; branch protection and CODEOWNERS; AGENTS.md and deterministic coding-agent setup; security scans on PRs; visible build time, flakes, coverage. Source adoption targets include MAU at least 60%, 30 chat turns per active user/week, 25% completion acceptance, three modalities, three prompt files, deliberate model selection, structured delegated tasks, and periodic memory review.', 'L3 additional proposed outcomes: flake rate below 2%; affected PR checks under 10 minutes; three to five coding-agent issues resolved per sprint; at least 60% coding-agent PR merge rate; automatic review coverage on target PRs; at least five team-specific Code Review guidelines.', 'L4 Optimized: at least two reviewed and scoped enterprise MCP systems; custom agents or skills for multi-step work; organization-level governance; at least 80% seat utilization; review turnaround reduced by 30% against a baseline; false-positive tuning; active exception handling. Local agents run under developer credentials; repository rules remain a control point.', 'L5 Autonomous: intent-based delivery, policy gates, evidence, owner escalation, and ongoing measurement. Source targets include PR checks under 10 minutes, full pipeline under 30 minutes, flake below 2%, cache hit above 80%, 15,000 lines/day/reviewer, production in hours, usage correlated with DORA, two champions/team, quarterly assessment, and a self-sufficiency score of at least 4/5.', 'All listed metrics are the source talk’s proposed criteria/targets, not a universally validated AgentRC scoring rubric. Use the linked AgentRC concepts as the primary model reference.'],
      sources: ref('agentrcConcepts'),
      seconds: 220
    },
    'l3-launchpad': {
      notes: ['"At L3, automation becomes repeatable and Copilot work becomes a team practice rather than a one-off experiment.', '"Treat the numbers as prompts for a baseline, not a pass/fail certificate."'],
      know: ['Source thresholds include CI flake rate below 2%, PR checks under 10 minutes for affected analysis, Copilot MAU at least 60%, three or more prompt files, and recurring coding-agent issues; local conditions may change what is useful.', 'Other proposed adoption indicators include 30 chat turns per active user per week, 25% completion acceptance, three active modalities, three to five coding-agent issues resolved per sprint, and automatic review coverage. None are claimed as observed in a deployed organization.', 'The detailed L3 checklist also proposes branch protection, CODEOWNERS, AGENTS.md, deterministic coding-agent setup, on-PR security checks, visible coverage/build/flake data, team-specific review guidelines, an agent firewall for hosted coding-agent egress, periodic review of Copilot Memory, and at least one scoped MCP integration.', 'A failed signal is actionable: unclear setup calls for documentation; manual CI steps call for automation; delegated issues without acceptance criteria call for better task context; bypassable rules call for explicit authority controls.'],
      sources: ref('agentrcConcepts', 'actions'),
      seconds: 220
    },
    'volume-breakpoint': {
      notes: ['"The memorable shift is that code generation can make trust and review the scarce capacity.', '"The chart compares the source’s 300-line and 15,000-line assumptions; it is a model, not an empirical productivity study."'],
      know: ['The original talk calls this a 50× breakpoint: 15,000 divided by 300. Both figures are inherited illustrative assumptions and vary with task, reviewer, language, risk, and definition of a line.', 'The source narrative also projects 500–2,000 lines, 5–8 files, and an agent PR in about 15 minutes. It offers no benchmark; treat every number as an illustrative workload assumption.', 'The mental-model shift is from lines written to features shipped, from line-by-line scrutiny to outcome validation, from manual gates to automated evidence, and from repository count to coordination cost.', 'Do not promise that a reviewer can safely inspect 15,000 lines per day. The practical point is to automate repeatable checks and focus human review on intent, edge cases, architecture, security, and user impact.', 'The proposed system balances throughput with quality and compliance; it does not remove review responsibility.'],
      sources: ref('agentrcConcepts'),
      seconds: 220
    },
    'instruction-hierarchy': {
      notes: ['"Instructions become useful engineering assets when they are versioned, reviewed, and close to the work they govern.', '"Check the scope: one organization-level setting does not necessarily reach every editor or agent surface."'],
      know: ['The source hierarchy is organization custom instructions → repository .github/copilot-instructions.md → AGENTS.md → prompt files or skills → Code Review coding guidelines.', 'Quality progression: none; basic tech-stack notes; good architecture, library, test conventions and repeatable workflows; excellent context tuned from actual output and review patterns.', 'The long README explicitly cautions that organization-level instructions apply to GitHub.com Chat, Code Review, and coding agent, not IDE Chat/agents. Verify current product scope and settings before depending on that distinction.', 'Treat configuration as code: keep it in repositories where possible, review changes in PRs, and revise it with the architecture.'],
      sources: ref('agentrc', 'agentrcConcepts'),
      seconds: 220
    },
    'repo-decision': {
      notes: ['"A monorepo can remove coordination when related work routinely crosses repository boundaries.', '"Keep separate repositories when access, regulation, or independent lifecycles are real requirements."'],
      know: ['The original proposed rule is to evaluate consolidation if more than 30% of features touch multiple repos. Audit recent PRs or issues to establish your own denominator.', 'Valid multi-repo reasons in the source include hard access boundaries such as regulated payment systems, truly independent release cycles, audit mandates, and transitional acquisition constraints.', 'A monorepo trades coordination work for build-tooling and boundary-management complexity. CODEOWNERS can express team ownership without making each team a repository.', 'The source contains a “6-hour feature” example that says six hours of agent work, three days elapsed across three repos, then 45 minutes after consolidation. It is an illustrative scenario, not a sourced case study; do not present it as observed evidence.', 'A second source scenario describes a fintech migration from 12 repos, with 3–4 repos touched per change, then claims 3–5 days to 4–6 hours and 3 features/week to 12/day. It supplies no customer, method, or measured dataset; retain it only as an unverified illustrative case.', 'Use this pattern when repeated cross-repository changes create material coordination cost. Avoid it when regulation, access controls, or independent release schedules require separation.', 'Repo-count thresholds are decision aids, not requirements. Pilot the workflow and include migration cost, ownership, release independence, and isolation needs.'],
      sources: ref('nx'),
      seconds: 220
    },
    'monorepo-topology': {
      notes: ['"One workspace can keep an atomic change together without collapsing independent deployment units.', '"Keep boundaries enforceable: applications deploy; libraries expose permitted dependencies; CI reports violations."'],
      know: ['Reference structure from the long README: .github/agents, workflows, and policies; apps/ for deployable units; libs/ for shared code; tools/ for generators and scripts; nx.json, package.json, and tsconfig.base.json at the root.', 'Nx named inputs, project tags, path mappings, and lint rules can encode allowed dependencies. A comment such as “do not import this” is weaker than a rule that fails the build.', 'The README proposes a separate enterprise control-plane repository for golden templates, policies, and shared agents when tighter access, independent updates, and auditability are required.', 'Illustrative violation: a data-access module importing a payment-scoped library fails lint and reports the import location. The agent can use that concrete failure to correct its proposal.', 'Enforcement is not self-explanatory: keep rules understandable, test them, and assign an owner for exceptions.'],
      sources: ref('nx', 'actions'),
      seconds: 220
    },
    'part-2': {
      notes: ['"Now that the work has an atomic boundary, the PR can carry intent and evidence together.', '"The developer or service owner owns the request; Copilot proposes; automation checks; an authorized reviewer approves."'],
      know: ['This section preserves the source talk’s shift from repository coordination to review capacity and outcome-focused governance.'],
      sources: ref('actions'),
      seconds: 20
    },
    'review-maturity': {
      notes: ['"Review practice changes as the platform and adoption mature.', '"At every level, a green check is evidence for a decision—not the decision itself."'],
      know: ['The source review model: L1 manual verification; L2 human review with shared context; L3 repeatable gates and delegated, well-scoped work; L4 context-aware automation and exception handling; L5 outcome validation supported by policy and evidence.', 'The original claims that L5 combines four human checkpoints with 90% automated enforcement; these are architecture targets, not measured baseline results.', 'A senior architect can focus on exceptions and material changes when boundaries and ownership rules route routine work reliably.'],
      sources: ref('agentrcConcepts', 'actions'),
      seconds: 220
    },
    'intent-contract': {
      notes: ['"The developer states the user outcome, constraints, and acceptance checks before delegating."', '"Copilot can implement and propose tests; the developer checks whether the proposal satisfies the contract."'],
      know: ['This is an illustrative password-reset intent from the long README, not a demonstrated application or observed agent transcript.', 'Source fields: add reset flow to settings; use the existing email service; preserve authentication middleware; expire a link after one hour; allow at most three attempts per hour; log every request; acceptance includes email within two minutes.', 'The source example also names SendGrid and OWASP guidance. They are illustrative dependencies/constraints, not independently checked product recommendations in this conversion.', 'A complete task may also identify target files, data handling, rollback implications, edge cases, and who resolves ambiguous acceptance criteria.'],
      sources: ref('actions'),
      seconds: 220
    },
    'evidence-bundle': {
      notes: ['"An evidence bundle puts the request, checks, and exceptions where the reviewer can inspect them."', '"A check marked PASS says the runner completed that check; it does not mean the feature is correct or approved."'],
      know: ['The long README’s sample bundle includes intent link, files/lines changed, unit and integration test counts, coverage, security scans, boundary checks, performance budget, staging deploy, smoke tests, and rollback test.', 'Its exact counts (47/47 tests, 87% coverage, 147 ms p95, and other green results) are illustrative placeholders, not actual observed results. Keep that label if reusing the numbers.', 'Separate runner status from domain behavior: for example, “3/3 expected policy decisions verified” is distinct from the actual allow/ask/deny outcomes.', 'The reviewer compares the evidence with the risk and acceptance contract, investigates missing or contradictory signals, and asks the named owner to resolve uncertainty.'],
      sources: ref('actions'),
      seconds: 220
    },
    'governance-gates': {
      notes: ['"Automate the repeatable checks and keep people responsible for decisions about intent, risk, architecture, and the release outcome."', '"A policy failure blocks the path; a human owner decides the recovery or escalation."'],
      know: ['The original 22-to-4 inversion and 90% automated share are proposals to explore, not observed organization-wide results. Original wait estimates of four to seven days becoming two to four hours are likewise not validated.', 'Four proposed checkpoints: intent validation; security risk assessment; architectural fit; outcome validation. Required reviewers and branch protection remain explicit controls.', 'The sample policy includes secret detection, high-severity SAST, dependency audit, module-boundary and circular-dependency checks, at least 80% changed-code coverage, p95 under 200 ms, accessibility, and privacy/payment-data requirements. These are sample thresholds, not a complete or current compliance policy.', 'The original workflow sketch calls out GDPR data handling, PCI isolation, security, architecture, quality, and accessibility. Some findings can warn rather than block; define severity and owner deliberately.', 'People retain authority for high-risk changes, policy exceptions, design changes, and acceptance. Senior specialists review escalations rather than being silently removed from the loop.'],
      sources: ref('actions', 'agentrcConcepts'),
      seconds: 220
    },
    'context-aware-review': {
      notes: ['"A context-aware agent can help distinguish a test fixture from a production data path and explain why it raised a flag."', '"The domain owner still verifies the finding and decides whether it blocks."'],
      know: ['The source’s sample is explicitly illustrative: a regex emits 847 warnings with 803 false positives; an agent emits 44 warnings with 2 false positives. These counts imply about 97% signal quality for that sample only; no evaluation protocol or dataset is supplied.', 'Do not claim that actual violations were “always caught.” The native slide removes that absolute claim and separates triage from approval.', 'A policy prompt can say email in test fixtures and documentation examples is allowed while production handling of real input requires review. Validate the rule against an authorized test set and retain deterministic controls for objective checks.', 'Agent review can be wrong, inconsistent, or manipulated by repository content; constrain tools and permissions, log its evidence, and retain human escalation.'],
      sources: ref('actions'),
      seconds: 220
    },
    'human-ownership': {
      notes: ['"The PR shows who proposes the change, who supplies the evidence, and who has approval authority."', '"CODEOWNERS routes attention; branch protection enforces the required human decision."'],
      know: ['Role split: developer/product owner defines intent and acceptance; Copilot or coding agent proposes code and explanations; CI runners execute configured checks; code owners review protected areas; service owner accepts merge/deployment risk; security/compliance owners handle specialist exceptions.', 'A draft PR is not approval. An agent’s summary is not evidence that checks passed. A passing check is not authorization to bypass a required owner.', 'Recovery: failed check blocks; the responsible owner investigates; the author or Copilot updates the change; high-risk uncertainty escalates to the designated security, architecture, or service owner.'],
      sources: ref('actions'),
      seconds: 220
    },
    'part-3': {
      notes: ['"The pipeline is where a bounded proposal earns repeatable evidence."', '"Speed matters because it changes how quickly the agent can respond to a failure; reliability matters because people act on the result."'],
      know: ['CI thresholds on later slides are planning targets from the source material, not measured outcomes.'],
      sources: ref('actions'),
      seconds: 20
    },
    'trust-pipeline': {
      notes: ['"Use short checks to return actionable feedback, then let deeper checks and release controls protect the path to production."', '"When a check fails, the runner reports; the owner decides the fix or escalation."'],
      know: ['Stage 1 proposed budget under 10 minutes: build, affected tests, lint/format, high-severity security; block the PR and return concise output.', 'Stage 2 proposed budget under 30 minutes: complete tests, deeper security, performance, architecture, dependency, and compliance validation; block merge and route detailed findings.', 'Stage 3 proposed budget under 60 minutes: staging, smoke tests, migration checks, rollback test, and load testing when risk warrants; block production and alert the on-call owner.', 'The source’s manufacturing principles are repeatability, enforced quality gates, automated inspection, evidence trails, continuous improvement, and scale economics. Suggested weekly measures: PR/full-pipeline time, flake rate, cache-hit rate, false-positive rate, and throughput; monthly reviews inspect slow checks, flaky tests, cache misses, and noisy rules.', 'Budgets are not reasons to omit necessary checks. Use parallelism, incremental builds, affected analysis, and caching; keep a risk-based escalation route.'],
      sources: ref('actions'),
      seconds: 220
    },
    'ci-feedback': {
      notes: ['"The source model holds the agent work constant and changes only the wait for four CI iterations."', '"Use your own pipeline timings before turning this into a throughput forecast."'],
      know: ['Arithmetic: four 60-minute waits equal 240 minutes of CI waiting; four 8-minute waits equal 32 minutes. The source calls these four hours and 52 minutes when it combines the faster cycle with other implied work; the wait-only arithmetic is 32 minutes.', 'The source estimates 80% idle at 60-minute CI and 95% productive at 8-minute CI, and projects three versus fifteen features/day. No benchmark or workload model is provided, so these are scenarios, not observed outcomes.', 'Measure queue time, execution time, retries, repair time, and concurrent agent count separately. A slow queue and a slow test suite need different interventions.'],
      sources: ref('actions'),
      seconds: 220
    },
    'affected-analysis': {
      notes: ['"The dependency graph lets CI test the changed module and its dependents instead of rebuilding everything."', '"The command transcript is an example of what you could run; it is not a captured execution."'],
      know: ['Source’s full-run example: 1,247 tests in 45 minutes, lint across 8,932 files in 12 minutes, and 47 packages built in 23 minutes, totaling 80 minutes.', 'Source’s affected example: 89 tests in 4 minutes, 234 files linted in 1 minute, and 3 packages built in 3 minutes, totaling 8 minutes. Both sets are illustrative estimates, not measured repository data.', 'Affected analysis: create a dependency graph; compare base and PR; calculate direct and transitive dependents; run only affected commands; reuse valid unaffected outputs.', 'Validate the graph and cache keys. A missing dependency edge can omit necessary tests and create false confidence. The build remains responsible for ensuring the graph is correct.'],
      sources: ref('nx'),
      seconds: 220
    },
    'flake-policy': {
      notes: ['"A flaky failure needs a named owner and visible quarantine so the rest of the suite keeps its meaning."', '"Track the signal, fix the cause, and do not normalize blind reruns."'],
      know: ['Source target: flake rate below 2%, measured weekly; proposed response: quarantine on first flake and fix or remove within two days. The source elsewhere recommends zero known flakes on the critical path, which is an operating aspiration rather than a guarantee.', 'Diagnosis patterns: race condition → condition-based waits; external service → mock or controlled dependency; time dependence → fake clock; order dependence → isolated data; environment dependence → hermetic inputs.', 'The source calculates one 5%-flaky test across 20 PRs as one expected spurious failure daily, and ten such tests as ten. These are simplified expectations assuming independent trials.', 'A second long-README scenario describes a commerce test suite moving from 18% to 1.2% flakiness, agent idle time from 35% to 8%, and reruns from 45/week to 2/week. No evaluation method or supporting evidence is supplied; label this as an unverified source illustration.', 'The source’s economic rationale for a 2% target is that pursuing the final rare environmental flakes can cost more than occasional intervention; its claimed inflection point is not supported by a cost study. Track flake rate and rerun counts. Do not silently disable a test or quarantine it without owner, reason, expiry, and follow-up.'],
      sources: ref('actions'),
      seconds: 220
    },
    'hermetic-cache': {
      notes: ['"Deterministic inputs make the check repeatable; cache keys make reusing its work safe."', '"A fast stale result is worse than a slower correct result."'],
      know: ['Source contrasts floating base image tags and npm install with a digest-pinned base image, lockfile, and npm ci. Its Docker snippet contains a truncated digest placeholder; supply a valid digest for a real build.', 'Hermeticity principles from the source: declare inputs, pin images and dependencies, avoid undeclared network fetches during build, and aim for reproducible outputs.', 'Cache invalidation examples: dependencies on lockfile change; build artifacts on source/input hash; test results on source or test change. The README’s illustrative GitHub Actions dependency-cache key uses the runner OS, Node, and hashFiles over package-lock.json; artifact and test caches likewise key on the commit or source/test inputs. Recheck cache correctness for each workflow.', 'The source cites first build 23 minutes and cached build 3 minutes (7.6×); illustrative only. Cache correctness and invalidation are more important than a claimed speedup.'],
      sources: ref('actions', 'caching', 'nx'),
      seconds: 220
    },
    attestations: {
      notes: ['"An attestation can connect an artifact to its builder, source, inputs, and invocation."', '"The release owner checks the provenance against policy; a record of a build does not prove the code is safe."'],
      know: ['The README’s example includes builder, invocation config source URI and SHA-256 digest, dependency materials, completeness metadata, and reproducibility metadata.', 'The sample digest and package identifier are illustrative. Generate attestations in the actual CI workflow, bind them to the artifact, and verify who can publish or alter them.', 'SLSA is the first-party reference for supply-chain provenance concepts. Compliance requirements differ; do not imply that one attestation automatically establishes SOC 2, ISO 27001, FedRAMP, or full SLSA conformance.', 'Example GitHub Actions step in the source uses actions/attest-build-provenance@v1; check current action version and permissions when implementing.'],
      sources: ref('slsa', 'actions'),
      seconds: 220
    },
    'part-4': {
      notes: ['"The roadmap moves from repeatable foundations to governed optimization and then to carefully measured autonomy."', '"Advance when the system has evidence—not because the phase name sounds complete."'],
      know: ['The three-phase roadmap carries the source thesis that platform readiness and developer adoption need to advance together.'],
      sources: ref('agentrcConcepts'),
      seconds: 20
    },
    'phase-l3': {
      notes: ['"Phase 1 establishes the floor: clear instructions, repeatable CI, ownership, and bounded agent work."', '"Measure the current pipeline before setting a speed target."'],
      know: ['Platform checklist from the source: audit cross-repo change frequency; evaluate monorepo only if the pattern and constraints support it; choose Nx/Lerna/Bazel where useful; enforce module boundaries; enable affected analysis; reduce flakes and PR-check time.', 'Adoption checklist: version repo instructions, use at least three modalities as a source target, create prompts for repeatable workflows, establish model guidance, and use structured issues.', 'Agentic checklist: test a low-risk coding-agent workflow; deterministic setup; AGENTS.md; acceptance/file/constraint-rich issue templates; configure the hosted agent firewall; connect at least one scoped enterprise system only when justified.', 'Quality checklist: automatic review, team-specific coding guidelines, branch rules requiring checks and owner approvals, and security scanning. The original targets also include five custom review guidelines, three to five coding-agent issues per sprint, and automatic review coverage in target repos. These are source proposals; select controls appropriate to the repository.'],
      sources: ref('agentrcConcepts', 'actions', 'nx'),
      seconds: 220
    },
    'phase-l4': {
      notes: ['"Phase 2 expands only the workflows that showed value at L3."', '"Route exceptions to owners and use review feedback to tune the policy."'],
      know: ['Source checklist: intent templates; automate repeated checks; evidence-bundle requirements; attestations; tune Code Review guidelines and measure false positives; compare review turnaround with the pre-change baseline.', 'Advanced capabilities in the source include at least two enterprise MCP systems (beyond a generic connector), coding-agent merge-rate measures, monthly memory curation, and one complex multi-step workflow.', 'Enterprise checks include deliberate model/content settings, seat use, budget awareness, repository templates, and documented content-exclusion rationale.', 'Quality work includes a quarantine policy, one context-aware compliance check, flake below 2%, and cache hit rate above 80%; treat these as goals to validate, not universal guarantees.'],
      sources: ref('agentrcConcepts', 'actions', 'slsa'),
      seconds: 220
    },
    'phase-l5': {
      notes: ['"Phase 3 joins intent, implementation, trust evidence, merge, and deployment under explicit policy."', '"Keep rollback, override, incident response, and measurement visible as autonomy expands."'],
      know: ['Source checklist: measure feature throughput and bottlenecks; adopt intent-based PRs, evidence bundles, and policy gates; generate provenance; scale runners/caching as observed load requires.', 'Organization practices: assign owners and curation cadence to shared context; report adoption trends, cost, and risk; correlate Copilot usage with PR cycle time and deployment frequency rather than claiming causation from usage alone.', 'The long README proposes quarterly assessment, two champions per team, and a self-sufficiency score of at least 4/5. These are proposed program targets, not measured results.', 'The source target of 10–15 features/day from 2–3/week is not guaranteed by the architecture. The talk avoids presenting it as an outcome.'],
      sources: ref('agentrcConcepts', 'actions', 'slsa'),
      seconds: 220
    },
    'fanhub-walkthrough': {
      notes: ['"The walkthrough gives you a small repo-sized experiment: assess, add CI, route owners, then require evidence in the PR."', '"Fork the sample, replace the example owner with your team, and compare the baseline with the next few weeks."'],
      cue: ['Open tech-talks/agentic-sdlc/examples/walkthrough.md. If a prepared fork is available, show the maturity check, PR workflow, CODEOWNERS, and evidence template; do not imply the sample has been run.', 'Use a real repository baseline for check duration and review time. Replace @your-github-handle and adjust the example paths before applying its CODEOWNERS file.'],
      know: ['Artifact link: tech-talks/agentic-sdlc/examples/walkthrough.md. It uses the FanHub repository and asks the reader to fork it; the README describes Node.js/npm and familiarity with GitHub Actions as prerequisites.', 'The five exercises cover maturity assessment; PR checks with checkout, Node setup, npm ci, lint, typecheck, tests, build, and a 10-minute timeout; CODEOWNERS for default, routes, .github/JSON, and data/migrations; an evidence-oriented PR template; and Insights measurements.', 'The walkthrough is an instructional artifact, not an executed demo or observed result. Its sample workflow assumes the stated FanHub paths and npm scripts exist in the fork; adapt them before running.', 'Baseline Actions duration, failure rates, review times, issue-to-PR time, and iteration counts. Compare after four weeks; target changes are hypotheses until measured.', 'The original README suggests follow-on links to GitHub Agentic Workflows, Local Agentic SDLC, Copilot Hooks, Enterprise Patterns, and the Agentic Operating Model. These remain related talks rather than dependencies for this walkthrough.'],
      sources: ref('actions'),
      seconds: 220
    },
    'before-after': {
      notes: ['"The useful change is a system in which context, checks, and ownership travel with the work."', '"The figures on this slide are framed as targets; the review-time and throughput multipliers from the original draft are not established results."'],
      know: ['Before/after is a design comparison, not a claim that a real organization achieved these improvements.', 'The source’s 96× faster-to-production claim compares an illustrative three-day path with 45 minutes; the 5× features-per-day claim compares an illustrative 60-minute and 8-minute CI scenario. Both have been omitted as outcomes because the underlying data is not provided.', 'Keep the state after implementation observable: repo coordination rate, PR cycle time, CI duration/queue, flake rate, rollback frequency, incident severity, and reviewer workload.'],
      sources: ref('agentrcConcepts', 'actions', 'nx'),
      seconds: 50
    },
    today: {
      notes: ['"Start with one baseline and one bounded task."', '"Choose a repository, name its decision owner, and write down what evidence would change your next investment."'],
      know: ['The long README suggests a 15-minute audit of the last 50 PRs for cross-repo changes, PR check time, flake rate, maturity across both dimensions, and Copilot MAU.', 'Short-term source actions include affected analysis, dependency/build caching, quarantine, an intent template, reviewed repository instructions, AGENTS.md and setup steps in coding-agent repos, and automatic review on a high-activity repository.', 'Longer exploration includes monorepo migration only if indicated, one compliance-validation pilot, evidence-bundle review training, enterprise tool connections, metrics correlation, and named champions.', 'Transfer prompts: What task in your repo is bounded enough to delegate? Which context does it need? Which visible checks define acceptable behavior? Who can approve it? Where does it go when evidence disagrees?'],
      sources: ref('agentrcConcepts', 'actions', 'nx'),
      seconds: 50
    },
    references: {
      notes: ['"These links support the model, repository tooling, CI practices, caching, and provenance concepts."', '"The FanHub walkthrough is linked from the talk landing page and in the repository."'],
      know: ['Landing page retains the links to the walkthrough and related talks; the README frontmatter is the authoritative reference inventory for this deck.'],
      sources: ref('agentrc', 'agentrcConcepts', 'actions', 'caching', 'nx', 'slsa'),
      seconds: 20
    },
    thanks: {
      notes: ['"Take one repository, one evidence gap, and one accountable owner into your next planning conversation."', '"Which constraint will you measure first?"'],
      sources: ref('agentrcConcepts', 'actions'),
      seconds: 10
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));
  window.DECK = {
    meta: {
      slug: 'agentic-sdlc',
      title: 'Agentic SDLC: Infrastructure for AI Velocity',
      short: 'Designing the SDLC Your Agents Deserve',
      category: 'Tech Talk',
      source: 'tech-talks/agentic-sdlc/README.md',
      question: 'How do I get agent-scale delivery without losing confidence in what we ship?',
      thesis: 'L3 is the launchpad: reliable context, repeatable checks, and habitual use create the conditions for outcome-focused governance and measured autonomy.'
    },
    slides
  };
})();
