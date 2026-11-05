/*
  Copilot on GitHub — the talk, its notes, and its evidence.
  The approved structure (32 slides: review effort and cost added, troubleshooting removed, section 4 condensed to a linked #221 timeline and two zooms) stays intact; the notes carry the README's
  teaching depth so this file is the presenter and handout source of truth.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    cloud: { label: 'About Copilot cloud agent', href: 'https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent' },
    best: { label: 'Get the best results from Copilot cloud agent', href: 'https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results' },
    plan: { label: 'Research, plan, and code with Copilot cloud agent', href: 'https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/' },
    review: { label: 'About Copilot code review', href: 'https://docs.github.com/en/copilot/concepts/agents/code-review' },
    effort: { label: 'Copilot code review effort levels and estimated consumption', href: 'https://docs.github.com/en/copilot/concepts/agents/code-review#review-effort-level' },
    reviewSetup: { label: 'Configure automatic Copilot code review', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review' },
    approvals: { label: 'Copilot code review can approve pull requests (preview)', href: 'https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/' },
    instructions: { label: 'Agent-specific instructions with excludeAgent', href: 'https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/' },
    quality: { label: 'About GitHub Code Quality', href: 'https://docs.github.com/en/code-security/concepts/code-quality/code-quality' },
    detection: { label: 'CodeQL-powered analysis for Code Quality', href: 'https://docs.github.com/en/code-security/reference/code-quality/codeql-detection' },
    goQueries: { label: 'Go CodeQL queries for Code Quality', href: 'https://docs.github.com/en/code-security/reference/code-quality/codeql-queries/go-queries' },
    qualityGA: { label: 'GitHub Code Quality is generally available', href: 'https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/' },
    billing: { label: 'GitHub Code Quality billing', href: 'https://docs.github.com/en/billing/concepts/product-billing/github-code-quality' },
    issue159: { label: 'FanHub issue #159: delegated issue', href: 'https://github.com/MSBart2/FanHub/issues/159' },
    pr221: { label: 'FanHub draft #221: one issue through all three agents', href: 'https://github.com/MSBart2/FanHub/pull/221' },
    pr210: { label: 'FanHub #210: cloud-agent PR and maintainer decision', href: 'https://github.com/MSBart2/FanHub/pull/210' },
    pr198: { label: 'FanHub #198: Copilot review found a browser gap', href: 'https://github.com/MSBart2/FanHub/pull/198' },
    pr199: { label: 'FanHub #199: coverage gate demonstration', href: 'https://github.com/MSBart2/FanHub/pull/199' },
    pr201: { label: 'FanHub #201: Code Quality Autofix demonstration', href: 'https://github.com/MSBart2/FanHub/pull/201' },
    workflows: { label: 'GitHub Agentic Workflows talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/agentic-workflows' },
    localSdlc: { label: 'Local Agentic SDLC talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/local-agentic-sdlc' },
    sdlc: { label: 'Agentic SDLC talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/agentic-sdlc' }
  };

  const FH = 'https://github.com/MSBart2/FanHub';
  const L = {
    commit: (sha) => `${FH}/commit/${sha}`,
    review: (id) => `${FH}/pull/221#pullrequestreview-${id}`,
    thread: (id) => `${FH}/pull/221#discussion_r${id}`,
    comment: (id) => `${FH}/pull/221#issuecomment-${id}`
  };

  const slides = [
    S('title', 0, 'Copilot on GitHub', {
      subtitle: 'Produce, Reason, Measure',
      tagline: 'Three agents, one pull request. A person ends the loop.',
      meta: 'Agents on GitHub · Practitioner Tech Talk · 60 minutes',
      visual: 'pr-stack'
    }),
    S('core-question', 0, 'Copilot can write, review, and check my code. What’s automatic, and where does my judgment come in?', {
      scene: 'core-question',
      pill: 'Core question',
      subtitle: 'You delegate a bounded issue, inspect what each agent returns, steer rework, and decide when it ships.',
      highlight: 'Events start agent work; people own the merge decision.',
      routing: ['Person', 'Event', 'Evidence', 'Decision'],
      routingLabel: 'Read the pull request by',
      roles: [
        { icon: '🧑‍💻', title: 'Developer', description: 'Delegate a bounded issue and inspect the draft PR.' },
        { icon: '👥', title: 'Team lead', description: 'Decide what evidence counts before merge.' },
        { icon: '⚙️', title: 'Platform owner', description: 'Configure triggers, permissions, policy, and cost.' }
      ],
      stats: [
        { title: 'about 5 seconds', description: 'Quality scan start after each push in one #221 run.' },
        { title: 'about 2 minutes', description: 'Review followed each push in that same run.' },
        { title: '8 of 8 pushes', description: 'Reviewed with Review new pushes enabled.' }
      ]
    }),
    S('contents', 0, 'Four questions, one pull request loop', {
      scene: 'contents',
      pill: 'The route',
      sections: [
        { icon: '🛠️', title: '1. Produce', subtitle: 'Copilot cloud agent', blurb: 'Shape an issue and inspect the draft it returns.', slide: 5 },
        { icon: '🔎', title: '2. Reason', subtitle: 'Copilot code review', blurb: 'Read intent, assessments, and open issues.', slide: 11 },
        { icon: '📏', title: '3. Measure', subtitle: 'GitHub Code Quality', blurb: 'Observe rules and promote trusted thresholds.', slide: 18 },
        { icon: '🔗', title: '4. Wire it together', subtitle: 'One issue, start to finish', blurb: 'Trace events, evidence, rework, and authority.', slide: 23 }
      ]
    }),
    S('whole-flow', 0, 'Every push can reopen the question; a person ends the loop.', {
      scene: 'event-map',
      pill: 'The whole flow',
      subtitle: 'A human starts or steers work; configured events wake code review and Code Quality on the current pull request head.',
      footnote: 'Ask of any pull request: who acted, what event fired, which commit did each agent see, and who decides?',
      map: {
        columns: ['Delegate', 'Push', 'Inspect', 'Steer', 'Decide'],
        rows: [
          { label: 'Person', z: 'orange', cells: ['Assign issue', 'Review head', 'Read evidence', 'Resolve or comment', 'Approve and merge'] },
          { label: 'Cloud agent', z: 'purple', cells: ['Receives task', 'Pushes own branch', 'Session log', 'Makes requested rework', 'Cannot approve or merge'] },
          { label: 'Code review', z: 'github', cells: ['Ruleset or setting', 'Review new pushes', 'Assessment and threads', 'Runs again on push', 'Approval preview only'] },
          { label: 'Code Quality', z: 'green', cells: ['PR event', 'Scans each push', 'Rules and findings', 'Scans again on push', 'Active rules can gate'] }
        ]
      }
    }),
    S('produce', 1, 'Produce: Copilot cloud agent', {
      scene: 'opener',
      subtitle: 'Delegate a bounded issue, then inspect the draft and decide what to steer.',
      cards: [
        { icon: '🎯', title: 'Good fit', blurb: 'Known spot, testable outcome' },
        { icon: '🧑‍💻', title: 'Stay human-led', blurb: 'Ambiguous or security-sensitive' },
        { icon: '📦', title: 'Inspect', blurb: 'Branch, draft, commits, session log' }
      ],
      terminal: { context: 'A bounded issue in', detail: 'an inspectable draft pull request out' }
    }),
    S('produce-row', 1, 'The cloud agent turns a delegated issue into an inspectable draft.', {
      scene: 'four-phases',
      pill: 'Produce · the agent’s job',
      subtitle: 'It works in an ephemeral environment powered by GitHub Actions and returns commits on its own branch.',
      stageLabel: 'Step',
      gateLabel: 'inspect',
      stages: [
        { label: '1', name: 'Issue', icon: '📝', description: 'A person supplies intent and acceptance criteria.' },
        { label: '2', name: 'Session', icon: '☁️', description: 'The cloud agent plans, edits, builds, and tests.' },
        { label: '3', name: 'Draft PR', icon: '🔀', description: 'The agent pushes commits and a description.' },
        { label: '4', name: 'Review', icon: '👤', description: 'A person inspects the final diff and evidence.', target: true }
      ],
      footnote: 'The cloud agent cannot mark its pull request ready, approve it, or merge it.'
    }),
    S('produce-triggers', 1, 'A person invokes the cloud agent; the agent then pushes on its own branch.', {
      scene: 'signals',
      pill: 'Produce · invocation',
      subtitle: 'Write access controls who can start a cloud-agent task.',
      rows: [
        { label: 'Assign an issue', description: 'Draft opens with a plan commit; implementation arrives in a later push.', tag: 'person → agent', z: 'orange' },
        { label: 'Agents tab', description: 'The agent proposes a plan; a person edits it and requests a pull request.', tag: 'person → agent', z: 'purple' },
        { label: 'PR handoff', description: '@copilot, Fix with Copilot, or @Copilot on a finding starts rework.', tag: 'person → agent', z: 'github' }
      ],
      footnote: 'Fix with Copilot was public preview in the cited 2026-10-23 source set; @Copilot on a Code Quality finding was GA.'
    }),
    S('produce-setup-context', 1, 'A scoped issue gives the producer an actionable contract.', {
      scene: 'issue-proof',
      pill: 'Produce · setup and context',
      subtitle: 'Repository instructions add shared conventions; the issue names this task’s proof and boundary.',
      issue: {
        blocks: [
          { label: 'Problem', text: 'What fails? Name the file, line, and observable symptom.' },
          { label: 'Acceptance criteria', text: 'What behavior proves the fix? Which tests and command?' },
          { label: 'Scope', text: 'What belongs here, and which neighboring work stays separate?' }
        ],
        example: [
          'Original #159: one-sentence bug report.',
          'Rewrite: five leaking handlers named.',
          'Response shape and regression tests specified.',
          'Neighboring BUG comments explicitly out of scope.'
        ],
        href: `${FH}/issues/159`
      }
    }),
    S('produce-use', 1, 'The PR owner checks six things before reading the diff.', {
      scene: 'pr-anatomy',
      pill: 'Produce · acceptance check',
      subtitle: 'Use the plan and the returned evidence to choose what to inspect next.',
      rows: [
        { label: 'Plan', description: 'Does the agent’s plan match the issue intent?', tag: 'PR description', z: 'purple' },
        { label: 'Commit', description: 'Which commit contains the implementation?', tag: 'commit list', z: 'github' },
        { label: 'Scope', description: 'Did any file change outside the expected paths?', tag: 'changed files', z: 'orange' },
        { label: 'Tests', description: 'What tests were added, and who executed them?', tag: 'session log', z: 'green' },
        { label: 'Workflows', description: 'Which workflow runs still wait for approval?', tag: 'checks', z: 'orange' },
        { label: 'Gaps', description: 'What evidence is still absent?', tag: 'decision record', z: 'purple' }
      ]
    }),
    S('produce-authority', 1, 'The cloud agent drafts and pushes; people retain ready, approval, and merge decisions.', {
      scene: 'showdown',
      pill: 'Produce · authority boundary',
      leftLabel: 'Cloud agent',
      rightLabel: 'Person or platform',
      pairs: [
        { left: { label: 'Pushes a draft', note: 'Own copilot/ branch' }, right: { label: 'Controls branch policy', note: 'Branch protection applies', z: 'orange' } },
        { left: { label: 'Runs build and tests', note: 'Actions-powered session' }, right: { label: 'Reviews the evidence', note: 'Checks what actually ran', z: 'orange' } },
        { left: { label: 'Responds to requests', note: 'Write access invokes it' }, right: { label: 'Marks ready', note: 'Human action', z: 'orange' } },
        { left: { label: 'Cannot approve or merge', note: 'Authority ends here' }, right: { label: 'Approves and merges', note: 'Requester cannot approve own agent PR', z: 'orange' } }
      ],
      outcomeLeft: { icon: '📦', label: 'Inspectable draft' },
      outcomeRight: { icon: '👤', label: 'Human decision' },
      footnote: 'Workflow runs on cloud-agent pull requests wait for Approve and run by default.'
    }),
    S('reason', 2, 'Reason: Copilot code review', {
      scene: 'opener',
      subtitle: 'Read the diff with repository context and compare its assessment with the open-issues list.',
      cards: [
        { icon: '🧠', title: 'Reasons about intent', blurb: 'Intent, scope drift, missing wiring' },
        { icon: '🗒️', title: 'Returns evidence', blurb: 'Assessment, comments, open issues' },
        { icon: '⚖️', title: 'Advisory by default', blurb: 'Count only with preview opt-in' }
      ],
      terminal: { context: 'Reason about the change', detail: 'then verify behavior the review did not execute' }
    }),
    S('reason-row', 2, 'Automatic review on new commits depends on Review new pushes.', {
      scene: 'four-phases',
      pill: 'Reason · the reviewer’s job',
      subtitle: 'A PR-open review depends on an enabled setting or ruleset; push reviews have their own switch.',
      stageLabel: 'Event',
      gateLabel: 'setting',
      stages: [
        { label: '1', name: 'Open PR', icon: '🔀', description: 'Ruleset or author setting may request review.' },
        { label: '2', name: 'First review', icon: '🔎', description: 'Copilot analyzes the current head commit.' },
        { label: '3', name: 'New push', icon: '📤', description: 'Review new pushes decides if it runs again.' },
        { label: '4', name: 'Assessment', icon: '🗒️', description: 'Comments and open issues help the reviewer.', target: true }
      ],
      footnote: 'Without Review new pushes, the first automatic review can be the only one.'
    }),
    S('reason-triggers', 2, 'A request or policy can start review; push and draft settings remain explicit.', {
      scene: 'review-loop',
      pill: 'Reason · invocation',
      subtitle: 'When review finds problems, a repair push can restart review, but only if Review new pushes is enabled.',
      loop: {
        entries: [
          { label: 'Request review', tag: 'human-invoked', z: 'orange' },
          { label: 'Pull request opened', tag: 'ruleset or setting', z: 'github' },
          { label: 'Draft pull request', tag: 'if drafts enabled', z: 'green' }
        ],
        nodes: [
          { title: 'Copilot reviews', detail: 'analyzes the current head commit', z: 'github' },
          { title: 'Assessment', detail: 'comments and open issues', z: 'github' },
          { title: 'Repair', detail: 'author or cloud agent pushes a fix', z: 'purple' },
          { title: 'New push', detail: 'any Copilot approval is dismissed', z: 'purple' }
        ],
        needsWork: 'changes needed',
        gate: 'if Review new pushes is on',
        exit: { title: 'Person decides', detail: 'approve and merge' },
        exitLabel: 'no open issues'
      },
      footnote: 'If multiple sources apply, Copilot posts one review. User settings cannot disable push or draft reviews enabled by a ruleset.'
    }),
    S('reason-setup-context', 2, 'Review policy controls invocation; scoped instructions shape the reviewer’s context.', {
      scene: 'review-setup',
      pill: 'Reason · setup and context',
      subtitle: 'Set who can request paid reviews, when automatic review runs, and which repository conventions apply.',
      setup: {
        policyTitle: 'Review policy',
        policy: [
          { label: 'Automatic review', control: 'chip', value: 'repo or org ruleset' },
          { label: 'Review new pushes', control: 'toggle' },
          { label: 'Review draft pull requests', control: 'toggle' },
          { label: 'Effort', control: 'segments', options: ['Lite', 'Balanced', 'Max'], selected: 1 },
          { label: 'Only authorized users trigger', control: 'toggle' },
          { label: 'Runner', control: 'chip', value: 'GitHub-hosted or self-hosted' }
        ],
        core: { title: 'Copilot code review', detail: 'reads policy and the PR head' },
        policyEdge: 'when and how hard',
        contextEdge: 'which conventions',
        contextTitle: 'Instructions at the PR head',
        files: [
          { name: '.github/', depth: 0, folder: true },
          { name: 'copilot-instructions.md', depth: 1, scope: 'every agent' },
          { name: 'instructions/', depth: 1, folder: true },
          { name: 'api.instructions.md', depth: 2, scope: 'applyTo: src/api/**' },
          { name: 'ci.instructions.md', depth: 2, scope: 'excludeAgent: code-review', z: 'orange' },
          { name: 'AGENTS.md', depth: 0, scope: 'every agent' }
        ]
      },
      footnote: 'Use excludeAgent to keep producer-only rules out of review, or review-only rules away from the cloud agent.'
    }),
    S('reason-effort-cost', 2, 'Match review effort to the risk of the change.', {
      scene: 'effort-tiers',
      pill: 'Reason · effort and cost',
      subtitle: 'Each level trades AI credits for depth; Review new pushes multiplies the per-review cost by every push.',
      pushes: 8,
      tiers: [
        { name: 'Lite', model: 'Standard review', use: 'Routine changes where fast feedback matters most', min: 0.05, max: 1, avg: 0.25, z: 'green' },
        { name: 'Balanced', badge: 'default', model: 'Higher-reasoning model', use: 'Security-sensitive, multi-service, or strict-quality code', min: 0.25, max: 5, avg: 1.5, z: 'github' },
        { name: 'Max', badge: 'public preview', model: 'Multiple high-reasoning models', use: 'High-risk or release-critical pull requests', min: 1.5, max: 25, avg: 10, z: 'purple' }
      ],
      footnote: 'GitHub estimates of AI credits per review; they exclude Actions minutes, grow with PR size and custom instructions, and may change.'
    }),
    S('reason-use-198', 2, 'Four passing component tests and a green build missed an inert Retry button.', {
      scene: 'gap-proof',
      pill: 'Reason · FanHub #198',
      subtitle: 'Copilot review surfaced a browser interaction gap; the author added a render-mode test that failed on the draft.',
      gap: {
        checksTitle: 'What existing checks showed',
        tests: ['Component test', 'Component test', 'Component test', 'Component test'],
        build: 'Build',
        blind: 'Not exercised: the click',
        checksHref: `${FH}/commit/ba0764f74cc61284a869378392652cb945e698da`,
        reviewTitle: 'What review exposed',
        findings: [
          'Retry had no interactive render mode.',
          'Its click handler never wired up.',
          'Early error clearing made retry unreachable.'
        ],
        findingLinks: [`${FH}/pull/198#discussion_r4210466991`, `${FH}/pull/198#discussion_r4210466991`, `${FH}/pull/198#discussion_r4210467074`],
        proofTitle: 'Proof the gap was real',
        testName: 'New render-mode test',
        before: { label: 'On the original draft', result: 'fails' },
        after: { label: 'After the fix', result: '6 of 6 pass' },
        proofHref: `${FH}/pull/198#issuecomment-6044316557`
      }
    }),
    S('reason-authority', 2, 'Code review stays advisory unless admins enable Copilot approvals, a public preview.', {
      scene: 'showdown',
      pill: 'Reason · authority boundary',
      leftLabel: 'Default review',
      rightLabel: 'Opt-in preview',
      pairs: [
        { left: { label: 'Assessment recommends', note: '🟢 or 🟡 with comments' }, right: { label: 'Approval can count', note: 'Required-review policy', z: 'orange' } },
        { left: { label: 'Human reads evidence', note: 'Tests may not have run' }, right: { label: 'Push dismisses approval', note: 'Fresh head needs review', z: 'orange' } },
        { left: { label: 'Reviewer owns risk', note: 'Behavior and context matter' }, right: { label: 'Keep human review', note: 'Where stakes require it', z: 'orange' } }
      ],
      outcomeLeft: { icon: '🗒️', label: 'Advice only' },
      outcomeRight: { icon: '⚖️', label: 'Count by policy' },
      footnote: 'Copilot approvals were a public preview in the source dated 2026-10-21; verify current availability before enabling.'
    }),
    S('measure', 3, 'Measure: GitHub Code Quality', {
      scene: 'opener',
      subtitle: 'Evaluate commits against CodeQL quality rules and team thresholds, then inspect what those rules can establish.',
      cards: [
        { icon: '📏', title: 'Fixed rules', blurb: 'CodeQL quality rules' },
        { icon: '📊', title: 'Quality ratings', blurb: 'Reliability and Maintainability' },
        { icon: '🛑', title: 'Can gate', blurb: 'Standard rules can gate' }
      ],
      terminal: { context: 'Measure specified code patterns', detail: 'then keep behavior review separate' }
    }),
    S('measure-row', 3, 'Code Quality scans each pull-request push without waiting for workflow approval.', {
      scene: 'four-phases',
      pill: 'Measure · the rules engine’s job',
      subtitle: 'The CodeQL - Code Quality check runs on PR pushes; findings arrive inline from github-code-quality[bot].',
      stageLabel: 'Event',
      gateLabel: 'scan',
      stages: [
        { label: '1', name: 'PR push', icon: '📤', description: 'Every new head commit starts analysis.' },
        { label: '2', name: 'CodeQL rules', icon: '📐', description: 'Language-specific queries inspect code.' },
        { label: '3', name: 'Finding', icon: '🗒️', description: 'Bot posts rule, category, and line.' },
        { label: '4', name: 'Quality gate', icon: '🛑', description: 'Active standard rules can block merge.', target: true }
      ],
      footnote: 'FanHub #221, one observed run on 2026-10-23: scans started about five seconds after each push; a finding appeared about 100 seconds after its push.'
    }),
    S('measure-standard-ai', 3, 'Standard findings can gate a merge; AI findings widen what the default branch reveals.', {
      scene: 'showdown',
      pill: 'Measure · two finding types',
      leftLabel: 'Standard findings · rules-based',
      rightLabel: 'AI findings · model-based',
      pairs: [
        { left: { label: 'CodeQL quality rules', note: 'Fixed query and severity' }, right: { label: 'Model analysis', note: 'Reads recently changed files', z: 'orange' } },
        { left: { label: 'Reproducible', note: 'Same code, rules, tool version' }, right: { label: 'Finds what rules miss', note: 'Results can vary by run', z: 'orange' } },
        { left: { label: 'Pull requests and default branch', note: 'Quality check and dashboard' }, right: { label: 'Default branch', note: 'Includes non-CodeQL languages', z: 'orange' } },
        { left: { label: 'Can gate a merge', note: 'Severity threshold' }, right: { label: 'Feeds the backlog', note: 'Triage, fix, or assign to Copilot', z: 'orange' } }
      ],
      outcomeLeft: { icon: '📏', label: 'Threshold can block' },
      outcomeRight: { icon: '🤖', label: 'AI finding widens coverage' },
      footnote: 'Pull requests show rules-based findings only; AI review of a PR comes from Copilot code review. Security CodeQL and secret scanning are separate.'
    }),
    S('measure-setup', 3, 'Evaluate mode reveals a rule’s effect before the platform owner makes it Active.', {
      scene: 'four-phases',
      pill: 'Measure · configure and promote',
      subtitle: 'The platform owner enables Code Quality, selects a severity threshold, and may add a coverage minimum.',
      stageLabel: 'Step',
      gateLabel: 'observe',
      stages: [
        { label: '1', name: 'Enable', icon: '🔌', description: 'Choose the repository and language queries.' },
        { label: '2', name: 'Set threshold', icon: '📐', description: 'Severity plus optional uploaded coverage.' },
        { label: '3', name: 'Evaluate', icon: '🔍', description: 'See what would block; merges still pass.' },
        { label: '4', name: 'Active', icon: '🛑', description: 'Accepted findings can block at threshold.', target: true }
      ],
      footnote: 'Rollback: return the rule to Evaluate. Coverage can use an uploaded report such as Cobertura.'
    }),
    S('measure-use', 3, 'A person commits Autofix, hands a finding to the agent, or dismisses it with a reason.', {
      scene: 'scorecard',
      pill: 'Measure · use the finding',
      subtitle: 'The finding is evidence to inspect; the person chooses who acts next.',
      cards: [
        { icon: '🔎', title: 'Read the finding', description: 'Rule, category, and source line appear inline.' },
        { icon: '👤', title: 'Commit suggestions', description: '#201: int.Parse catch became int.TryParse; author committed 0b33cda.' },
        { icon: '⚡', title: '@Copilot handoff', description: 'The cloud agent pushes a fix; review and measurement run again.' },
        { icon: '🧪', title: 'Coverage gate', description: '#199: 26.7% missed a 27% minimum; two tests reached 30%.' }
      ],
      footnote: '#201 checks passed after the person committed the suggestion. #199 is an observed coverage-gate demonstration.'
    }),
    S('wire', 4, 'Wire it together: one issue, start to finish', {
      scene: 'opener',
      subtitle: 'Trace which event woke which agent, what each one returned, and where a person steered the next step.',
      cards: [
        { icon: '🔁', title: 'Every push', blurb: 'Each push can wake both agents' },
        { icon: '🧵', title: 'Threads persist', blurb: 'Open threads persist' },
        { icon: '👤', title: 'Person decides', blurb: 'Cloud agent cannot approve or merge' }
      ],
      terminal: { context: 'FanHub #159 → draft #221', detail: 'Review new pushes on · one observed run' }
    }),
    S('pr-timeline', 4, 'One issue, eight pushes: every push woke review and Code Quality.', {
      scene: 'pr-timeline',
      pill: 'Wire it together · FanHub #221',
      subtitle: 'Observed 2026-10-23 with Review new pushes on. Every marker links to the exact commit, review, or comment.',
      timeline: {
        start: '15:30:00',
        end: '16:08:00',
        lanes: [
          { id: 'person', label: 'Person', z: 'orange' },
          { id: 'agent', label: 'Cloud agent', z: 'purple' },
          { id: 'review', label: 'Code review', z: 'github' },
          { id: 'quality', label: 'Code Quality', z: 'green' }
        ],
        moments: [
          { key: 'A', label: 'Wrong push caught', from: '15:31:40', to: '15:41:00', slide: 25 },
          { key: 'B', label: 'Person steers rework', from: '15:45:20', to: '15:53:20', slide: 25 },
          { key: 'C', label: 'Two agents, one line', from: '15:54:00', to: '16:07:40', slide: 26 }
        ],
        events: [
          { t: '15:30:24', lane: 'person', label: 'assign #159', title: 'Requester assigns rewritten issue #159', href: `${FH}/issues/159` },
          { t: '15:46:05', lane: 'person', label: 'resolve + steer', title: 'PR owner resolves the stale lockfile thread and asks @copilot for a shared helper and an x/crypto justification', href: L.comment(6368808889) },
          { t: '15:54:34', lane: 'person', label: 'staged push', title: 'PR owner pushes staged commit 8a752d2', href: L.commit('8a752d2a2bb9b4acc87e0717d32da77c5c7ffbc2'), push: true },
          { t: '15:58:28', lane: 'person', label: '@Copilot', title: 'PR owner asks @Copilot to fix the Code Quality finding', href: L.thread(4361521547) },
          { t: '15:30:31', lane: 'agent', label: 'e046f52', title: 'Initial plan', href: L.commit('e046f52b7c27dd81e1285659faf97553c5720273'), push: true },
          { t: '15:32:08', lane: 'agent', label: '7686606', title: 'Lockfile-only commit', href: L.commit('7686606b0f7c2459dc8256d2fb6897a387bacd2c'), push: true },
          { t: '15:37:13', lane: 'agent', label: '6159164', title: 'Redact internal errors in Go handlers', href: L.commit('6159164e9c49291c14730a4b8d194f404a36b647'), push: true },
          { t: '15:47:44', lane: 'agent', label: '43a258f', title: 'Plan shared handler error response', href: L.commit('43a258f90a1a0d7ff5829b713ccdc8bc234d43d9'), push: true },
          { t: '15:49:46', lane: 'agent', label: '5444980', title: 'Extract shared internal error responder', href: L.commit('544498006e26eabca6b5b1820e5f35f6513770f6'), push: true },
          { t: '16:00:53', lane: 'agent', label: '69aa00f', title: 'Remove redundant error detail assignment', href: L.commit('69aa00ffdb38d4e9a9b5389929ab2c160756ae7c'), push: true },
          { t: '16:01:56', lane: 'agent', label: '6a512c1', title: 'Simplify internal error logging', href: L.commit('6a512c173eb5038954d1ba770bdf8e53002703b6'), push: true },
          { t: '15:30:42', lane: 'review', label: 'no files', tone: 'github', title: 'Review on e046f52: no files to review', href: L.review(5630574476) },
          { t: '15:34:31', lane: 'review', label: '🟡 changes', tone: 'orange', title: 'Review on 7686606: Changes recommended', href: L.review(5630624423) },
          { t: '15:39:35', lane: 'review', label: '🟢 1 open', tone: 'green', title: 'Review on 6159164: Approval recommended, 1 open issue (stale lockfile thread)', href: L.review(5630685049) },
          { t: '15:50:07', lane: 'review', label: '1 resolved', tone: 'green', title: 'Review on 43a258f: No open issues, 1 resolved since last review', href: L.review(5630829918) },
          { t: '15:52:18', lane: 'review', tone: 'green', title: 'Review on 5444980: No open issues', href: L.review(5630860166) },
          { t: '15:57:20', lane: 'review', label: 'optional', tone: 'green', title: 'Review on 8a752d2: optional cleanup, 1 open issue', href: L.review(5630928057) },
          { t: '16:03:48', lane: 'review', tone: 'green', title: 'Review on 69aa00f: No open issues, 1 resolved since last review', href: L.review(5631006596) },
          { t: '16:06:08', lane: 'review', label: 'all clear', tone: 'green', title: 'Review on 6a512c1: No open issues', href: L.review(5631034303) },
          { t: '15:56:18', lane: 'quality', label: 'finding', big: true, title: 'Code Quality on 8a752d2: Useless assignment to local variable, with Autofix', href: L.thread(4361497692) }
        ]
      },
      footnote: 'Code Quality also ran on every push (small ticks), starting about five seconds after each one. One observed run, not a benchmark.'
    }),
    S('steer-rework', 4, 'Review caught a wrong push; a person steered the rework.', {
      scene: 'artifact-chain',
      pill: 'Wire it together · moments A and B',
      subtitle: 'Each card is a real artifact on #221. Click one to read it in full.',
      groups: [{ key: 'A', label: 'Wrong push caught', span: [0, 1] }, { key: 'B', label: 'Person steers rework', span: [2, 3] }],
      chain: [
        { when: '15:34:31', actor: 'Code review', z: 'github', status: '🟡 Changes recommended', quote: 'This PR only adds a frontend lockfile entry; it does not change any of the five Go handlers or add the tests required by #159.', ref: 'on 7686606', href: L.thread(4361287746) },
        { when: '15:37 → 15:39', actor: 'Code review', z: 'github', status: '🟢 1 open issue', quote: 'Static review found no blocking issues in the targeted error sanitization … 1 open issue: Implement the security fix across all five Go handlers.', ref: 'review on 6159164', href: L.review(5630685049) },
        { when: '15:46:06', actor: 'PR owner', z: 'orange', status: 'Resolves thread, asks for rework', quote: '@copilot … extract a small shared helper … If the x/crypto bump is required, say so in the PR description; otherwise revert it.', ref: 'PR comment', href: L.comment(6368808889) },
        { when: '15:50 → 15:52', actor: 'Cloud agent', z: 'purple', status: '🟢 No open issues', quote: 'Implemented the shared respondInternalError helper … Kept golang.org/x/crypto v0.23.0 because Gin 1.10.0 requires it.', ref: 'reply + 5444980', href: L.comment(6368896156) }
      ]
    }),
    S('same-line', 4, 'Two agents flagged the same lines; one handoff cleared both threads.', {
      scene: 'same-line',
      pill: 'Wire it together · moment C · staged',
      subtitle: 'The PR owner deliberately pushed a leftover assignment in 8a752d2 to show how each agent frames it.',
      code: {
        file: 'go/backend/handlers/error_response.go',
        ref: '8a752d2',
        href: L.commit('8a752d2a2bb9b4acc87e0717d32da77c5c7ffbc2'),
        first: 11,
        lines: [
          'func respondInternalError(…) {',
          '  detail := "<nil>"',
          '  if err != nil {',
          '    detail = err.Error()',
          '  }',
          '  detail = fmt.Sprint(err)',
          '  log.Printf("%s: %s", handler, detail)',
          '  c.JSON(500, gin.H{"error": "internal server error"})',
          '}'
        ],
        mark: [12, 16]
      },
      comments: [
        { actor: 'Code Quality', when: '15:56:18', z: 'green', title: 'Useless assignment to local variable', body: 'This definition of detail is never used. Autofix suggested.', href: L.thread(4361497692) },
        { actor: 'Code review', when: '15:57:20', z: 'github', title: 'Optional cleanup', body: 'fmt.Sprint(err) overwrites the nil guard, so non-nil errors call Error() twice.', href: L.thread(4361509094) }
      ],
      resolution: [
        { when: '15:58', actor: 'PR owner', z: 'orange', text: '@Copilot please fix this Code Quality finding', href: L.thread(4361521547) },
        { when: '16:00–16:01', actor: 'Cloud agent', z: 'purple', text: 'Pushes 69aa00f and 6a512c1', href: L.commit('6a512c173eb5038954d1ba770bdf8e53002703b6') },
        { when: '16:06', actor: 'Code review', z: 'green', text: '🟢 No open issues; all threads resolved', href: L.review(5631034303) }
      ]
    }),
    S('what-ends-loop', 4, 'A person ends the loop and writes down what the final head proves.', {
      scene: 'scorecard',
      pill: 'Wire it together · decision record',
      subtitle: '#221 stayed a draft with no merge decision. FanHub #210 supplies the merged decision example.',
      cards: [
        { icon: '📦', title: 'Available', description: '#210 patch, agent test runs, green review, clean Code Quality on the head.' },
        { icon: '🔎', title: 'Absent', description: 'Copilot reviews said tests were not executed; no browser check of the UI.' },
        { icon: '📜', title: 'Policy', description: 'Inspect rulesets, required checks, and quality gates on the final head.' },
        { icon: '👤', title: 'Judgment and recovery', description: 'Maintainer approved 02ddaf3, merged as 803254f; revert that merge to recover.' }
      ],
      footnote: 'A merge record names the evidence by commit, evidence absent, policy, residual-risk judgment, action, and recovery.'
    }),
    S('configure-promote-cost', 4, 'Roll out each agent in three steps: observe, evaluate, then enforce.', {
      scene: 'four-phases',
      pill: 'Wire it together · configuration and economics',
      subtitle: 'Name an owner, observation period, and rollback condition for each setting.',
      stageLabel: 'Promotion',
      gateLabel: 'evidence',
      stages: [
        { label: '1', name: 'Observe', icon: '👀', description: 'Scoped issues, manual reviews, one Code Quality repo.' },
        { label: '2', name: 'Evaluate', icon: '🔍', description: 'Setup steps, new-push review, rules in Evaluate.' },
        { label: '3', name: 'Enforce', icon: '🛑', description: 'Count preview approvals; activate trusted standard rules.', target: true }
      ],
      footnote: 'GitHub estimates per review: Lite ~$0.25, Balanced ~$1.50, Max ~$10 on average (2026-11). Code Quality: $10 per active committer/month (2026-10).'
    }),
    S('event-map-recap', 4, 'An event map explains the loop more accurately than a linear pipeline.', {
      scene: 'pipeline-vs-map',
      pill: 'Synthesis · the operating model',
      subtitle: 'Follow actor, trigger, commit, evidence, and decision instead of assuming one fixed sequence.',
      pipeline: ['Issue', 'Code', 'Review', 'Merge'],
      before: [
        'Treat the work as a fixed pipeline.',
        'Treat one green result as the whole answer.',
        'Assume the agent’s work ends at its push.'
      ],
      map: {
        hub: { title: 'New head', detail: 'every push' },
        agent: { title: 'Cloud agent', detail: 'pushes commits', z: 'purple' },
        person: { title: 'Person', detail: 'steers and decides', z: 'orange' },
        review: { title: 'Code review', detail: 'reasons about intent', z: 'github' },
        quality: { title: 'Code Quality', detail: 'measures rules', z: 'green' },
        wake: 'configured events wake both',
        back: 'evidence returns to the person',
        exit: 'Merge'
      },
      metrics: [
        { value: 'WHO', detail: 'invoked or acted?' },
        { value: 'WHICH SHA', detail: 'did the agent inspect?' },
        { value: 'WHAT NEXT', detail: 'evidence or decision is missing?' }
      ]
    }),
    S('next-moves', 4, 'Run one issue through all three agents this week.', {
      scene: 'role-moves',
      pill: 'Transfer · your next pull request',
      subtitle: 'Each role owns one move. Together they produce one pull request you can read with the event map.',
      roles: [
        { icon: '🧑‍💻', role: 'Developer', z: 'purple', goal: 'An inspectable draft', steps: ['Rewrite one bug with scope and acceptance criteria.', 'Assign it to the cloud agent.', 'Run the six checks on the draft it returns.'], refs: ['produce-setup-context', 'produce-use'] },
        { icon: '⚙️', role: 'Platform owner', z: 'github', goal: 'Agents wake on every push', steps: ['Turn on Review new pushes at Balanced effort.', 'Enable Code Quality with rules in Evaluate.', 'Watch a week of cost before promoting.'], refs: ['reason-effort-cost', 'configure-promote-cost'] },
        { icon: '👥', role: 'Team lead', z: 'orange', goal: 'A merge you can defend', steps: ['Decide what evidence counts before merge.', 'Read the PR: who acted, which SHA, what next.', 'Write the decision record and the revert path.'], refs: ['event-map-recap', 'what-ends-loop'] }
      ],
      takeaway: 'Success looks like one merged pull request whose record names the evidence by commit and the person who decided.'
    }),
    S('references', 0, 'References', {
      scene: 'references',
      pill: 'Sources',
      groups: [
        { icon: '☁️', title: 'Cloud agent', z: 'purple', items: [
          { label: 'About Copilot cloud agent', href: SRC.cloud.href, description: 'Product behavior' },
          { label: 'Get the best results', href: SRC.best.href, description: 'Issue context' }
        ] },
        { icon: '🔎', title: 'Code review', z: 'github', items: [
          { label: 'About Copilot code review', href: SRC.review.href, description: 'Assessment and cost' },
          { label: 'Configure automatic review', href: SRC.reviewSetup.href, description: 'Triggers and settings' }
        ] },
        { icon: '📏', title: 'Code Quality', z: 'green', items: [
          { label: 'About GitHub Code Quality', href: SRC.quality.href, description: 'Product and findings' },
          { label: 'CodeQL-powered analysis', href: SRC.detection.href, description: 'Language queries' }
        ] },
        { icon: '🧪', title: 'FanHub observations', z: 'orange', items: [
          { label: 'Issue #159 → draft #221', href: SRC.pr221.href, description: 'One issue through all three agents' },
          { label: 'PR #198', href: SRC.pr198.href, description: 'Review found the inert Retry button' },
          { label: 'PR #210', href: SRC.pr210.href, description: 'Maintainer decision record' }
        ] }
      ]
    }),
    S('thanks', 0, 'Thanks', {
      subtitle: 'Three agents return different evidence. A person owns the decision.',
      cards: [
        { value: 'Produce', detail: 'Inspect the draft, commits, tests, and session log.' },
        { value: 'Reason', detail: 'Read the commit-specific assessment and open issues.' },
        { value: 'Measure', detail: 'Know which rules can gate and what remains untested.' }
      ],
      prompt: 'Which event or evidence step will you inspect in your next pull request?',
      visual: 'pr-closed'
    })
  ];

  const NOTES = {
    title: {
      notes: [
        '"A pull request can host three distinct kinds of help: one agent produces a change, one reasons about its intent, and one measures it against configured rules.',
        '"The useful question is not whether an agent did work. It is which event started it, what evidence came back, and who owns the next decision.',
        '→ Start with the question a repository owner asks before delegating.'
      ],
      know: ['The title phrase Produce, Reason, Measure is a teaching model, not an official product taxonomy.'],
      seconds: 35
    },
    'core-question': {
      notes: [
        '"If you own a pull request flow, you already have the question: what can run on its own, and where do I need to step in?',
        '"We will follow the actor, event, commit, and returned evidence. The decision stays with a person.',
        'Point to the bottom row: these timings and push counts describe one FanHub #221 run on 2026-10-23, not a performance benchmark.',
        '→ The four sections separate each agent before tracing them together.'
      ],
      know: ['The talk addresses developers, team leads, and platform engineers who own repository PR flows. Observed timings are rounded and single-run examples.'],
      sources: [SRC.pr221, SRC.cloud, SRC.review, SRC.quality],
      seconds: 75
    },
    contents: {
      notes: [
        '"First we distinguish the three jobs and the evidence each returns.',
        '"Then we follow one real event history and finish by replaying a pull request from your own repository.',
        'The openers are slides 5, 12, 19, and 25. The contents links jump to each section.',
        '→ Before we split the agents apart, let’s see their shared loop.'
      ],
      know: ['The original 39-slide order is preserved. Four section openers begin on slides 5, 12, 19, and 25.'],
      seconds: 45
    },
    'whole-flow': {
      notes: [
        '"A person assigns a bounded issue. The cloud agent opens a draft and pushes commits on its own branch.',
        '"A pull request event wakes Code Quality; code review runs when the applicable setting or ruleset enables it. Review new pushes controls review after a new commit.',
        '"A person reads the results, resolves or comments, and may cause another push. The cloud agent cannot approve or merge.',
        '"Four roles meet here: the requester owns issue intent and delegation; the PR owner responds to findings and updates the head; the reviewer validates behavior and residual risk; the platform owner configures invocation, permissions, required evidence, and rollback. One person can hold more than one role.',
        'Point across each row: the roles and events are distinct. A human action starts or steers work; the configured event starts a check.',
        '→ We’ll now examine what the producer needs and what its draft gives back.'
      ],
      know: ['Code Quality scans a PR push. Automatic review can be configured at repository, organization, or user level. The exact available settings can change; sources were verified 2026-10-21 to 2026-10-23.'],
      sources: [SRC.cloud, SRC.reviewSetup, SRC.quality, SRC.pr221],
      seconds: 90
    },
    produce: {
      notes: [
        '"The cloud agent is useful when an issue has a known location, a testable symptom, and a clear acceptance check.',
        '"Bug fixes, tests, documentation, accessibility changes, and bounded tech debt can fit that shape. Broad refactors, security-sensitive work, deep domain logic, and ambiguous requests stay human-led.',
        '"It returns commits on its own copilot branch, a pull request description, and a session log you can inspect.',
        '→ First, trace how an issue becomes a draft.'
      ],
      know: ['Copilot cloud agent was formerly called Copilot coding agent. It runs in an ephemeral environment powered by GitHub Actions.'],
      sources: [SRC.cloud, SRC.best],
      seconds: 65
    },
    'produce-row': {
      notes: [
        '"A person supplies the task; the cloud agent handles a bounded implementation session and returns a draft pull request.',
        '"The environment is ephemeral and powered by GitHub Actions. The agent can run the build and tests there, then return the commits and its session record.',
        '"The final step is still a human inspection. The cloud agent cannot mark its PR ready, approve it, or merge it.',
        '→ The next question is how a person wakes the agent.'
      ],
      know: ['Workflow runs on cloud-agent PRs wait for Approve and run by default. The requester cannot approve the agent-produced PR either.'],
      sources: [SRC.cloud],
      seconds: 80
    },
    'produce-triggers': {
      notes: [
        '"There are three practical invocation paths: assign an issue, use the Agents tab to plan before requesting a PR, or hand a finding back from a pull request.',
        '"The human invocation is the trigger. After that, the agent acts on its branch and its pushes become new pull request events.',
        'The @copilot and @Copilot spellings reflect the documented workflows; permission and preview status differ by entry point.',
        '→ A useful invocation begins with context the agent can act on.'
      ],
      know: ['Only users with write access can invoke the cloud agent; comments by people without access do not reach it. Fix with Copilot was public preview as of the source set verified 2026-10-23. The Code Quality @Copilot handoff was described as GA.'],
      sources: [SRC.cloud, SRC.plan, SRC.pr221, SRC.quality],
      seconds: 85
    },
    'produce-setup-context': {
      notes: [
        '"GitHub’s best-results guidance treats the issue as the prompt. Give the agent a problem, acceptance criteria, and scope.',
        '"The FanHub #159 rewrite moved from one sentence to a concrete list: five leaking handlers, the response shape to preserve, tests that prove internal error text stays private, and neighboring BUG comments left out of scope.',
        '"Repository instructions such as copilot-instructions.md, path-scoped instructions, and AGENTS.md add conventions shared across tasks.',
        'Point left to the reusable issue shape, then right to the observed rewrite. The example is an artifact, not a claim that every issue needs the same format.',
        '→ Once the draft arrives, the PR owner checks the plan and evidence.'
      ],
      know: ['Setup files include .github/workflows/copilot-setup-steps.yml, with a job named copilot-setup-steps on the default branch. The firewall is on by default and restricts outbound traffic. GitHub and Playwright MCP servers are available by default; Code review shares the MCP configuration. Custom agents live in .github/agents/*.agent.md.'],
      sources: [SRC.best, SRC.cloud, SRC.issue159, SRC.pr221],
      cue: ['Click the “In practice” panel to open FanHub issue #159 and walk its Problem table, acceptance criteria, and Scope section.'],
      seconds: 110
    },
    'produce-use': {
      notes: [
        '"Before reading the diff, ask six questions: does the plan match the issue; which commit contains the implementation; did the agent change unexpected paths; what tests were added and who ran them; which workflow runs still wait for approval; and what evidence is missing?',
        '"Steer with a comment rather than silently rewriting the agent branch. Every @copilot request can create another plan commit and rework push, which wakes review and measurement again.',
        'Point to the session log for commands the agent ran. The log does not establish that an independent person ran those tests.',
        '→ The draft is the agent’s output; the platform boundary on what it can do stays fixed.'
      ],
      know: ['FanHub #210 provides a separate observed example: draft opened 12 seconds after assignment, then a two-file fix with eight regression tests arrived about three and a half minutes later. These are one-run timings, not a service-level guarantee.'],
      sources: [SRC.cloud, SRC.pr210, { label: '#210 plan commit 919b158', href: `${FH}/commit/919b158d4db8dc87b1e7d44b0ef4341aab27702f` }, { label: '#210 fix commit 02ddaf3 (two files)', href: `${FH}/commit/02ddaf3df8cf75f6ee98b2637e804bec2b5c1c1e` }, SRC.pr221],
      seconds: 110
    },
    'produce-authority': {
      notes: [
        '"The cloud agent’s authority ends at an inspectable draft and its own branch. It can run the configured build and tests and respond to a person’s request.',
        '"A person or platform policy controls branch protection and workflow approval. A human marks ready, approves, accepts residual risk, and merges.',
        '"The requester cannot approve the agent’s pull request, keeping another person in the review path.',
        '→ Code review adds reasoning evidence, but it has a different trigger.'
      ],
      know: ['By default, workflow runs on a cloud-agent PR wait for a person to select Approve and run. The cloud agent cannot approve or merge its PR.'],
      sources: [SRC.cloud],
      seconds: 80
    },
    reason: {
      notes: [
        '"Code review reads the diff with repository context and reasons about intent: scope drift, missing wiring, unreachable states, or a change that does not match the issue.',
        '"It returns an assessment, inline comments, and a running list of open issues. The assessment can recommend approval or changes; it is not proof that all behavior ran.',
        '→ The setting that determines whether review follows a new commit is the important one to recognize.'
      ],
      know: ['An assessment can be green while the open-issues list still contains an unresolved thread. Every review identifies the commit it analyzed and whether tests ran during the review.'],
      sources: [SRC.review],
      seconds: 65
    },
    'reason-row': {
      notes: [
        '"An opened pull request can trigger review through a repository or organization ruleset, or an author setting.',
        '"A plan-only commit may give the reviewer no files to analyze. Review new pushes brings code review back for later commits.',
        '"Draft review has a separate setting. Treat each setting as a trigger, not as evidence that the finding is correct.',
        '→ Here are the invocation paths and the conditions they depend on.'
      ],
      know: ['When several sources apply, Copilot posts one review. User settings cannot disable push or draft reviews enabled by a ruleset. On FanHub #221, Review new pushes was enabled and reviews ran on all eight pushes.'],
      sources: [SRC.reviewSetup, SRC.pr221],
      seconds: 80
    },
    'reason-triggers': {
      notes: [
        '"A person can request Copilot from the Reviewers sidebar. An automatic review can start when a ruleset or user setting requests it.',
        '"Review new pushes and Review draft pull requests are explicit controls. With new-push review disabled, the initial automatic review may be the only one.',
        '"A new push dismisses a Copilot approval, just as a new head needs fresh human review.',
        '"When the assessment lists open issues, the author or the cloud agent pushes a repair. That push starts another review only when Review new pushes is on; the loop repeats until a person decides.',
        '→ Policy controls when review runs; repository instructions shape the context it reads.'
      ],
      know: ['Repository rules can enable review at organization or repository level. If multiple triggers apply, Copilot posts one review. A user setting cannot disable push or draft reviews that a ruleset enabled.'],
      sources: [SRC.reviewSetup],
      seconds: 85
    },
    'reason-setup-context': {
      notes: [
        '"A platform owner chooses automatic review rules, whether drafts are reviewed, whether new pushes are reviewed, and who can trigger reviews that consume organizational resources.',
        '"Lite, Balanced, and Max are effort choices with different credit ranges; Balanced is the default and Max is in public preview. Private repository reviews also use Actions minutes for context gathering. Review runners default to standard GitHub-hosted runners; larger or self-hosted runners are options.',
        '"Code review reads instruction files from the PR head. Use applyTo to scope rules to paths, and excludeAgent to keep producer-only instructions away from review or vice versa.',
        '→ The effort level is the main lever on what each review costs.'
      ],
      know: ['Automatic-review credits are attributed to the PR author; for cloud-agent PRs, to the human co-author first. Organization owners set a default effort for automatic reviews; repository administrators can override it. Rates may change.'],
      sources: [SRC.review, SRC.reviewSetup, SRC.instructions],
      seconds: 110
    },
    'reason-effort-cost': {
      notes: [
        '"Copilot code review has three effort levels. Lite is the standard review: fast, targeted feedback on bugs, security issues, and style. Balanced, the default, routes to a higher-reasoning model for complex logic and cross-service changes. Max, in public preview, uses multiple high-reasoning models for the most scrutiny.',
        '"GitHub estimates an average of about twenty-five cents per Lite review, a dollar fifty for Balanced, and ten dollars for Max. Max averages about forty times Lite.',
        '"Ranges are wide: five cents to a dollar for Lite, twenty-five cents to five dollars for Balanced, a dollar fifty to twenty-five dollars for Max. Bigger pull requests and longer custom instructions push toward the top.',
        '"Review new pushes multiplies that cost. FanHub #221 had eight reviewed pushes; at the averages that is about two dollars at Lite, twelve at Balanced, and eighty at Max for one pull request.',
        'Point at the use-for line on each card: the choice follows the risk of the change, not the importance of the author.',
        '→ A real example shows why review evidence can add value beyond a green test run.'
      ],
      know: [
        'Estimated AI credits per review (GitHub docs, 2026-11): Lite $0.05–$1, average ~$0.25; Balanced $0.25–$5, average ~$1.50; Max $1.50–$25, average ~$10. Estimates exclude Actions minutes.',
        'Effort resolution order: effort chosen on request, then effort previously used on the PR, the requestor’s setting, the repository setting, the organization setting, then GitHub’s default (Balanced). The PR overview comment shows the effort used for each run.',
        'The eight-push figures are arithmetic on GitHub’s averages for illustration, not observed charges for #221.'
      ],
      sources: [SRC.effort, SRC.reviewSetup, SRC.pr221],
      seconds: 90
    },
    'reason-use-198': {
      notes: [
        '"FanHub #198 is the useful gap: four component tests passed and the build was green, yet the Retry button had no interactive render mode and its click handler never wired up.',
        '"Review also found that clearing the error too early made the retrying state unreachable. The author added a render-mode test that failed against the original draft and then passed six of six.',
        'Point left to what the existing checks established, center to what review found, and right to the test that proved the gap. Passing checks and review are complementary evidence.',
        '→ Review recommends; the approval boundary is a separate choice.'
      ],
      know: ['This is an observed FanHub pull request example, not a general test-coverage statistic. The additional render-mode test demonstrated the behavior against the original draft.'],
      sources: [SRC.pr198, { label: '#198 review: no interactive render mode, Retry never wired', href: `${FH}/pull/198#discussion_r4210466991` }, { label: '#198 review: early error clearing hides the retrying state', href: `${FH}/pull/198#discussion_r4210467074` }, { label: '#198 maintainer follow-up: render-mode test 1 failed, then 6/6', href: `${FH}/pull/198#issuecomment-6044316557` }, { label: '#198 fix commit edeadee', href: `${FH}/commit/edeadee65c291cdb7d0feb2ac49d394289112c96` }],
      cue: ['Click any panel to open its artifact: the draft commit, the Copilot review threads, or the maintainer’s follow-up comment with the failing-then-passing render-mode test. Otherwise walk the three panels.'],
      seconds: 120
    },
    'reason-authority': {
      notes: [
        '"By default, code review is advisory. Since September 2026, admins can opt into Copilot approvals, which were a public preview in the cited changelog.',
        '"When enabled, those approvals can count toward required reviews and are dismissed on a new push.',
        '"Choose the paths where a reasoning review is the policy bar. Keep human approval wherever behavior, security, or data risk requires it.',
        '→ Code Quality measures another kind of evidence: configured rules and thresholds.'
      ],
      know: ['Preview status is dated: the changelog verified 2026-10-21 calls Copilot approvals a public preview. Verify current availability and policy before deployment.'],
      sources: [SRC.approvals, SRC.review],
      seconds: 75
    },
    measure: {
      notes: [
        '"GitHub Code Quality measures commits against CodeQL quality rules and thresholds. It is the only one of these three agents whose standard result can block a merge on its own.',
        '"The findings roll up into Reliability and Maintainability ratings: Excellent, Good, Fair, or Poor.',
        '→ The next visual follows the check from push to rule finding and possible gate.'
      ],
      know: ['GitHub Code Quality was generally available on 2026-07-20 for GitHub Enterprise Cloud and Team, according to the cited changelog.'],
      sources: [SRC.quality, SRC.qualityGA],
      seconds: 65
    },
    'measure-row': {
      notes: [
        '"Every push to a pull request runs the CodeQL - Code Quality check. Inline findings arrive from github-code-quality[bot].',
        '"This scan does not wait for Approve and run. A push to the default branch feeds the standard findings dashboard.',
        'In the single observed #221 run, scans started about five seconds after every push, including plan commits. The one staged finding appeared about 100 seconds after its push.',
        '→ Standard and AI findings have different status and authority.'
      ],
      know: ['These timings belong to FanHub #221 on 2026-10-23 and are one observed run, not a benchmark. AI findings run on recently changed default-branch code (docs verified 2026-11-04).'],
      sources: [SRC.quality, SRC.detection, SRC.pr221],
      seconds: 80
    },
    'measure-standard-ai': {
      notes: [
        '"Standard findings come from CodeQL quality rules. With the same code, rules, and tool version, they are reproducible and can gate by the configured severity threshold.',
        '"AI findings come from a model reading recently changed files on the default branch. They catch issues no rule was written for, including in languages CodeQL does not cover, and they land in the backlog, where a person triages them, applies a fix, or assigns them to the cloud agent.',
        '"On a pull request, Code Quality posts the rules-based findings; AI review of the pull request itself comes from Copilot code review.',
        '"Security CodeQL is a separate analysis, and secret scanning is separate again. Treat a clean quality run as evidence about quality rules; security review is its own check.',
        '→ A platform owner can observe the rules before activating their gate.'
      ],
      know: ['Docs verified 2026-11-04: on pull requests, Code Quality posts rules-based CodeQL findings only; AI-powered analysis runs on recently changed default-branch code and consumes GitHub AI Credits. Language-specific CodeQL query lists assign category and severity.'],
      sources: [SRC.quality, SRC.detection, SRC.goQueries],
      seconds: 90
    },
    'measure-setup': {
      notes: [
        '"Enable Code Quality for the repository and inspect the language query lists, which define categories and severities.',
        '"Add a quality ruleset with a severity threshold. A team can also set a coverage minimum when a coverage upload is present.',
        '"Start in Evaluate. It reports what would have blocked while merges still pass. Move to Active only after the team trusts the signal; the recovery is to move it back to Evaluate.',
        '→ Once a finding appears, a person chooses whether to commit, delegate, or dismiss it.'
      ],
      know: ['Coverage can come from an uploaded report such as Cobertura. The product documentation distinguishes ruleset evaluation from active enforcement.'],
      sources: [SRC.quality, SRC.detection, SRC.billing],
      seconds: 100
    },
    'measure-use': {
      notes: [
        '"Read the finding first: it names the rule, category, and line. Then decide who acts.',
        '"In #201, the author reviewed a changeset that changed a generic catch around int.Parse to int.TryParse, then committed suggestion 0b33cda. The new head’s build and analyses passed.',
        '"In #199, a 27 percent coverage minimum blocked a head at 26.7 percent. Two more tests raised the result to 30 percent and the gate turned green.',
        '"A person can also reply @Copilot for a cloud-agent handoff or dismiss an inapplicable finding with a reason. Every resulting push wakes configured checks again.',
        '→ Now we’ll trace the events and evidence on one pull request.'
      ],
      know: ['The @Copilot handoff on a Code Quality finding was described as GA in the README source set verified 2026-10-23. Autofix is a suggested changeset; the person commits it.', 'A clean run covers the configured rules only; tests, code review, security CodeQL, and secret scanning answer separate questions.'],
      sources: [SRC.quality, SRC.pr201, SRC.pr199],
      cue: ['Open #201 to inspect the proposed int.TryParse change and commit 0b33cda; open #199 to compare 26.7 percent, the 27 percent minimum, and the later 30 percent result.'],
      seconds: 115
    },
    wire: {
      notes: [
        '"This is the payoff: one bounded issue moves through all three agents, and the event history explains what happened.',
        '"The next three slides use FanHub draft #221, observed on 2026-10-23 with Review new pushes enabled: first the whole run, then two zooms. Every timestamp is UTC and belongs to one run.',
        'The staged quality issue was a deliberate human push, not an agent-discovered production defect.',
        '→ Here is the whole run on one screen.'
      ],
      know: ['FanHub #221 remained a draft with no merge decision. The merged example later in the talk is #210.'],
      sources: [SRC.pr221, SRC.issue159],
      seconds: 70
    },
    'pr-timeline': {
      notes: [
        '"Here is the whole run on one screen. Four lanes: the person, the cloud agent, Copilot code review, and Code Quality. Every dot is clickable and opens the exact commit, review, or comment.',
        '"Eight pushes, eight reviews. Seven pushes came from the agent and one from a person. Code Quality ran on each one too: the small green ticks.',
        '"Three moments are worth zooming into. A: the agent pushed the wrong thing and review caught it. B: a person cleaned up and steered the rework. C: a staged human push where both agents flagged the same lines.',
        'Point at the person lane: four actions across forty minutes. That is the human cost of this loop.',
        '→ Zoom into moments A and B.'
      ],
      know: ['All times UTC on 2026-10-23, one observed run with Review new pushes on and Balanced effort. #221 stayed a draft with no merge decision. Commit 8a752d2 was staged deliberately for the demonstration.'],
      cue: ['Open the PR on GitHub: https://github.com/MSBart2/FanHub/pull/221. Click any marker on the slide to jump to that artifact.'],
      sources: [SRC.pr221, SRC.issue159],
      seconds: 150
    },
    'steer-rework': {
      notes: [
        '"Moment A. The agent’s second push changed only a frontend lockfile. Review said so plainly: no handlers changed, no tests, and the Fixes #159 claim is not met.',
        '"The agent’s next push did the real work. Review turned green but listed one open issue: the old lockfile thread. A green recommendation and the open-issues list answer different questions.',
        '"Moment B. The PR owner resolved that stale thread, then asked for two things in one comment: a shared helper for the repeated error block, and either a justification or a revert for the x/crypto bump.',
        '"The agent did both and explained the dependency: Gin 1.10.0 requires x/crypto 0.23.0. The next reviews came back clean.',
        '→ Moment C shows two agents reading the same code.'
      ],
      know: ['The 15:50:07 review on 43a258f reported “1 resolved since last review”; the 15:52:18 review on 5444980 reported no open issues.'],
      cue: ['Click each card to open the review thread, the review, the owner comment, and the agent reply on #221.'],
      sources: [SRC.pr221],
      seconds: 120
    },
    'same-line': {
      notes: [
        '"This push was staged on purpose: a nil guard whose result is immediately overwritten.',
        '"Code Quality named it by rule, useless assignment to a local variable, and offered an Autofix about a hundred seconds after the push. Code review called it optional cleanup and explained the cost: Error() runs twice.',
        '"Same lines, two framings: one is a rule with a fix, the other is reasoning about behavior. Both are useful; neither ran the tests.',
        '"The PR owner replied @Copilot on the Code Quality finding. The agent pushed two small commits, and the final review reported no open issues with every thread resolved.',
        '→ The loop ends when a person decides, and a green check is one input to that decision.'
      ],
      know: ['Code Quality finding at 15:56:18 and review comment at 15:57:20, both on 8a752d2. Fix commits 69aa00f (16:00:53) and 6a512c1 (16:01:56). The agent ran go test in its session; Copilot review stated tests were not executed.'],
      cue: ['Click the code card to open commit 8a752d2, and each comment card to open its thread.'],
      sources: [SRC.pr221],
      seconds: 120
    },
    'what-ends-loop': {
      notes: [
        '"The cloud agent cannot approve or merge. A person decides when another rework round stops paying for itself, and each pass consumes credits and Actions minutes.',
        '"FanHub #221 remained a draft. For an actual merge decision, use #210: the maintainer had the patch, a green assessment, a clean Code Quality run, and the agent’s test runs.',
        '"The full evidence set keeps the cloud-agent patch and session tests, the commit-specific review and open threads, Code Quality and the separate CodeQL security result, and a person-run test with residual-risk judgment in distinct rows.',
        '"The maintainer approved head 02ddaf3 and merged it as merge commit 803254f. The recovery path is reverting that merge commit.',
        '"Write down the evidence by commit, what is absent, whether policy is satisfied, why residual risk is acceptable, and how to recover.',
        '→ Configuration is how a team changes invocation, evidence, and authority.'
      ],
      know: ['On #210, the Copilot review of 02ddaf3 recommended approval and noted the regression tests were not executed. The agent’s own test run is not an independent maintainer run.'],
      sources: [SRC.pr210, { label: '#210 Copilot review of 02ddaf3', href: 'https://github.com/MSBart2/FanHub/pull/210#pullrequestreview-5605940436' }, { label: '#210 maintainer approval', href: 'https://github.com/MSBart2/FanHub/pull/210#pullrequestreview-5606463856' }, { label: '#210 merge commit 803254f', href: 'https://github.com/MSBart2/FanHub/commit/803254f74e8fa4ffbd141b25fbe5605d3c4f5ccf' }, SRC.review, SRC.quality],
      seconds: 125
    },
    'configure-promote-cost': {
      notes: [
        '"The configuration surfaces divide into agent context, invocation and permissions, review policy, merge evidence, and economics.',
        '"Promote in stages: observe scoped tasks and manual reviews; automate review on new pushes while rules remain in Evaluate; then count approval or activate trusted standard rules.',
        '"Each promotion gets an owner, observation period, and rollback. Move a quality rule back to Evaluate, dismiss an inapplicable finding with a reason, resolve a thread, or close and reassign a draft.',
        '"GitHub’s current estimates average about twenty-five cents per Lite review, a dollar fifty for Balanced, and ten dollars for Max. Private repositories also use Actions minutes for context gathering.',
        '"The README’s 2026-10 billing note listed Code Quality at ten dollars per active committer monthly, plus AI credits for AI findings and Actions minutes for CodeQL scans. Verify current rates before budgeting.',
        '→ The synthesis is an event map, not a fixed pipeline.'
      ],
      know: ['The June 2026 billing model used AI Credits at one cent per credit. Review new pushes multiplies per-review usage by the number of pushes. Cloud-agent sessions also use Actions. Automatic-review credits are attributed to the PR author, or for cloud-agent PRs, to the human co-author first. Rates and product terms change; verify before making a current budget decision.'],
      sources: [SRC.review, SRC.billing, SRC.quality, SRC.reviewSetup],
      seconds: 120
    },
    'event-map-recap': {
      notes: [
        '"A linear pipeline hides the event triggers. In this loop, a human action starts or steers work, and configured events wake agents on new commits.',
        '"A clean test result, a code-review assessment, and a Code Quality run answer different questions. Their commit identity matters.',
        '"The person reads the evidence, accepts or rejects residual risk, and decides whether to merge.',
        '"This pattern stops fitting when the team wants recurring scheduled or repository-event judgment with its own authority contract: explore GitHub Agentic Workflows. Multi-step plan, implement, and verify work on a developer machine fits Local Agentic SDLC. A lifecycle-wide readiness score fits Agentic SDLC.',
        '→ Take the event map to a pull request from your own repository.'
      ],
      know: ['The three prompt questions are transfer aids: who invoked or acted, which SHA each agent inspected, and what evidence or decision is still missing.'],
      sources: [SRC.cloud, SRC.review, SRC.quality, SRC.workflows, SRC.localSdlc, SRC.sdlc],
      seconds: 90
    },
    'next-moves': {
      notes: [
        '"Here is the move for this week: run one real issue through all three agents, and give each role one job.',
        '"Developer: rewrite one bug with scope and acceptance criteria, assign it to the cloud agent, and run the six checks on the draft before reading the diff.',
        '"Platform owner: on one repository, turn on Review new pushes at Balanced effort and enable Code Quality with its rules in Evaluate. Watch a week of cost before promoting anything.',
        '"Team lead: decide up front what evidence counts, read the pull request with who, which SHA, and what next, and write the decision record with its revert path.',
        '"Success looks like one merged pull request whose record names the evidence by commit and the person who decided.',
        'Each card links to the slide that teaches its move; click a chip to jump back if someone asks how.',
        '→ Use the linked evidence to inspect details after the talk.'
      ],
      know: [
        'Teams already running these agents can also replay their last merged PR: for each push, list which agents ran and which commit each one saw, then fix the first missing event or evidence step.',
        'Run the agent’s tests yourself before relying on a green assessment; Copilot review states when tests were not executed. No performance result is promised; the evidence comes from the audience’s own PR.'
      ],
      sources: [SRC.cloud, SRC.reviewSetup, SRC.quality],
      cue: ['Ask attendees to choose a recent merged pull request and sketch its push and review events. Do not ask them to expose confidential code or repository details.'],
      seconds: 115
    },
    references: {
      notes: [
        '"These links are the first-party product sources and the FanHub records behind the examples.',
        '"The notes page also lists the specific source beside each claim, so you can follow a question to its evidence.',
        'Product status is time-sensitive: check the linked documentation before using preview, pricing, or availability claims operationally.',
        '→ Leave the room with one pull request event map to inspect.'
      ],
      know: ['The README frontmatter references and the additional FanHub issue #159 are preserved here and in the landing page. Per-slide notes link directly to the evidence used.'],
      sources: [SRC.cloud, SRC.best, SRC.plan, SRC.review, SRC.reviewSetup, SRC.approvals, SRC.instructions, SRC.quality, SRC.detection, SRC.goQueries, SRC.qualityGA, SRC.billing, SRC.issue159, SRC.pr221, SRC.pr210, SRC.pr198, SRC.pr199, SRC.pr201],
      seconds: 35
    },
    thanks: {
      notes: [
        '"The cloud agent produces a draft. Code review reasons about intent. Code Quality measures configured rules.',
        '"A person chooses the context, checks the evidence, steers rework, and decides whether the change ships.',
        '"Which event or evidence step will you inspect in your next pull request?"',
        'Point at the closing picture: the same pull request from the title slide, now merged, every agent checked off, and a person’s decision on record.'
      ],
      know: ['The talk budget is about 47:05, leaving roughly 13 minutes of the 60-minute slot for live demos and questions. Budgets are estimates until a presenter times a run-through.'],
      seconds: 30
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-on-github',
      title: 'Copilot on GitHub: Produce, Reason, Measure',
      short: 'Three agents, one pull request. A person ends the loop.',
      category: 'tech-talks',
      source: 'tech-talks/copilot-on-github/README.md',
      question: 'Copilot can write, review, and check my code. What’s automatic, and where does my judgment come in?',
      thesis: 'The three agents respond to events rather than running as a pipeline: a person starts the work, pushes wake review and measurement, rework creates another push, and a person ends the loop.'
    },
    slides
  };
})();
