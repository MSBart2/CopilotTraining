/*
  Which Copilot Where? — deck data.
  Order and titles match slides/tech-talks/surfaces.md, so numeric links (#12) land on
  the same slide in both decks. Slides without a native scene render as pending stubs.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const matrix = {
    axis: ['You steer here ↓', 'Work happens →'],
    columns: [
      { key: 'local', label: 'Local workspace', detail: 'Files, tools, processes' },
      { key: 'remote', label: 'Remote host', detail: 'SSH or connected environment' },
      { key: 'github', label: 'GitHub', detail: 'Service or hosted sandbox' },
      { key: 'runtime', label: 'App runtime', detail: 'Your product environment' }
    ],
    rows: [
      { icon: '🧑‍💻', label: 'VS Code', detail: 'Editor + Agents window', cells: { local: ['Agent mode', 'Local sessions'], remote: ['Remote agents'], github: ['Cloud sessions'] } },
      { icon: '⌨️', label: 'Copilot CLI', detail: 'Terminal', cells: { local: ['Interactive', 'Programmatic'], remote: ['Host-local work'], github: ['Delegate'] } },
      { icon: '🌐', label: 'GitHub.com', detail: 'Browser, issue, or PR', cells: { github: ['Chat', 'Coding agent', 'Code Review'] } },
      { icon: '🎛️', label: 'Copilot app', detail: 'Local desktop', cells: { local: ['Local sessions'], github: ['Cloud fleet', 'PRs + workflows'] } },
      { icon: '🧩', label: 'Your product', detail: 'UI or API', cells: { runtime: ['Copilot SDK'] } }
    ]
  };

  const route = (id, pillIcon, pill, title, subtitle, role, outcome, steps) =>
    S(id, 1, title, { scene: 'route', pillIcon, pill, subtitle, role, outcome, steps: steps.map(([row, column, item]) => ({ row, column, item })) });

  const slides = [
    S('title', 0, 'Which Copilot Where?', {
      chrome: false, visual: 'surface-ring',
      subtitle: 'A Practical Surface Router',
      tagline: 'Route eligible work by decisive context, review ownership, and the capability the team needs next.',
      meta: 'CopilotTraining · Practitioner Tech Talk',
      surfaces: ['VS Code', 'Copilot CLI', 'GitHub.com Chat', 'Coding agent', 'Code Review', 'Copilot app', 'Copilot SDK']
    }),
    S('core-question', 0, 'Which Copilot surface owns this work next?', {
      pillIcon: '🎯', pill: 'Core Question',
      subtitle: 'Start where the decisive context and controls already live.',
      highlight: 'Route by context, artifact, reviewer, and handoff.',
      routing: ['context', 'artifact', 'reviewer', 'handoff'], routingLabel: 'Route by',
      roles: [
        { icon: '🧑‍💻', title: 'Developer', description: 'Choose the surface that keeps implementation context close.' },
        { icon: '🧭', title: 'Product + Docs', description: 'Explore, shape, and delegate without beginning in an IDE.' },
        { icon: '🧪', title: 'Test + Design', description: 'Review evidence and move beside the implementation only when needed.' }
      ],
      stats: [
        { title: '1 shared map', description: 'See local, GitHub, remote, and embedded execution.' },
        { title: '4 outcome branches', description: 'Route without memorizing product names.' },
        { title: 'A first win', description: 'Onboard each role through useful, reviewed work.' }
      ]
    }),
    S('contents', 0, 'Table of Contents', {
      pillIcon: '🗺️', pill: 'Agenda · Four parts',
      sections: [
        { icon: '🗺️', title: 'Map the Surfaces', subtitle: 'See what each surface does', blurb: 'Compare seven experiences and their best-fit work.', slide: 4 },
        { icon: '🎯', title: 'Start by Role', subtitle: 'Choose a useful first task', blurb: 'Onboard every discipline through reviewed outcomes.', slide: 13 },
        { icon: '📈', title: 'Build Adoption Maturity', subtitle: 'Advance through evidence', blurb: 'Turn usage signals into reviewed capability growth.', slide: 17 },
        { icon: '🔗', title: 'Compose the Surfaces', subtitle: 'Design visible handoffs', blurb: 'Walk a production incident across changing boundaries.', slide: 20 }
      ]
    }),
    S('part-1', 1, 'Map the Surfaces', {
      scene: 'opener',
      subtitle: 'Separate where you steer from where work happens, then route with four questions.',
      cards: [
        { icon: '🕹️', title: 'Control', blurb: 'Where do you steer?' },
        { icon: '⚙️', title: 'Execution', blurb: 'Where do tools run?' },
        { icon: '📦', title: 'Artifact', blurb: 'What comes back?' }
      ],
      terminal: { context: 'Two independent axes', detail: 'control location × execution location' }
    }),
    S('matrix', 1, 'The Copilot Surface Matrix', {
      pillIcon: '🧭', pill: 'Surface Map · Control × Execution',
      subtitle: 'Rows show where you steer · Columns show where execution or analysis happens',
      footnote: 'Off-diagonal cells are the key: your control surface can steer work somewhere else.'
    }),
    route('route-pm', '🧭', 'Scenario · Product Manager', 'PM: Understand → Shape → Delegate',
      'Stay in GitHub: learn the repository, define acceptance, then hand off a bounded issue',
      'Product manager', 'Evidence-backed issue + draft pull request',
      [['GitHub.com', 'github', 'Chat'], ['GitHub.com', 'github', 'Coding agent']]),
    route('route-docs', '📝', 'Scenario · Documentation', 'Docs: Discover → Draft → Refine',
      'Use repository context before editing; keep editorial acceptance with the docs owner',
      'Docs specialist', 'Verified documentation pull request',
      [['GitHub.com', 'github', 'Chat'], ['GitHub.com', 'github', 'Coding agent'], ['VS Code', 'local', 'Agent mode']]),
    route('route-designer', '🎨', 'Scenario · Product Design', 'Designer: Explore → Iterate → Review',
      'Start with implementation facts, then move beside the UI when visual feedback becomes decisive',
      'Product designer', 'Implemented UI change with visual acceptance evidence',
      [['GitHub.com', 'github', 'Chat'], ['VS Code', 'local', 'Agent mode'], ['GitHub.com', 'github', 'Code Review']]),
    route('route-platform', '🏗️', 'Scenario · Platform Operations', 'Platform Team: Diagnose → Prove → Encode',
      'Start in the CLI when runtime state is decisive; move only after the remediation becomes repository work',
      'Platform engineer · SRE · cloud operations', 'Validated diagnosis + reviewable infrastructure change',
      [['Copilot CLI', 'remote', 'Host-local work'], ['Copilot CLI', 'local', 'Interactive'], ['VS Code', 'local', 'Agent mode']]),
    route('route-delivery', '🎛️', 'Scenario · Delivery Leadership', 'Delivery Lead: Dispatch → Monitor → Accept',
      'Start in the Copilot app when several bounded streams are ready and coordination is the work',
      'Engineering manager · release lead · program lead', 'Coordinated set of reviewed pull requests',
      [['Copilot app', 'github', 'Cloud fleet'], ['Copilot app', 'github', 'PRs + workflows'], ['GitHub.com', 'github', 'Code Review']]),
    route('route-embedded', '🧩', 'Scenario · Embedded Product', 'Platform Product Team: Embed the Workflow',
      'Start with the SDK when Copilot must live behind your trigger, tools, policy, and product experience',
      'Platform engineer · internal tools team · support automation owner', 'Governed agent workflow inside the product',
      [['Your product', 'runtime', 'Copilot SDK']]),
    S('route-by-outcome', 1, 'Route by Outcome, Then by Context', {
      pillIcon: '🌳', pill: 'Surface Router · Decision Tree',
      subtitle: 'Your role suggests a first branch; the artifact and decisive context choose the surface',
      root: 'What must exist when this work is done?',
      branches: [
        { icon: '🔎', intent: 'Understand or shape', prompt: 'Need an explanation, brief, or better issue?', roles: 'PM · designer · support', routes: [
          { condition: 'Repository and GitHub context', surface: 'GitHub Chat', detail: 'Explore without a local checkout', z: 'github' }
        ] },
        { icon: '✅', intent: 'Review or accept', prompt: 'Need findings or evidence before approval?', roles: 'tester · docs · reviewer', routes: [
          { condition: 'PR or changed code', surface: 'Code Review', detail: 'Find risks; humans accept', z: 'github' }
        ] },
        { icon: '🛠️', intent: 'Create or change', prompt: 'Where is the context you cannot cheaply recreate?', roles: 'developer · platform · docs · design', routes: [
          { condition: 'Files, UI, diagnostics', surface: 'VS Code', detail: 'Steer interactively', z: 'local' },
          { condition: 'Shell, host, runtime', surface: 'Copilot CLI', detail: 'Work beside live evidence', z: 'remote' },
          { condition: 'Bounded issue', surface: 'Coding agent', detail: 'Return a draft PR', z: 'github' }
        ] },
        { icon: '📈', intent: 'Scale or repeat', prompt: 'Are you coordinating work or embedding capability?', roles: 'platform · lead · product', routes: [
          { condition: 'Many independent streams', surface: 'Copilot app', detail: 'Coordinate the fleet', z: 'purple' },
          { condition: 'Inside your product', surface: 'Copilot SDK', detail: 'Own the runtime contract', z: 'runtime' }
        ] }
      ],
      footnote: 'When the artifact or decisive context changes, return to the tree and route the next phase.'
    }),
    S('part-2', 2, 'Start by Role', {
      scene: 'opener',
      subtitle: 'Give every role one useful first task, one reviewable artifact, and one clear handoff.',
      cards: [
        { icon: '1️⃣', title: 'First task', blurb: 'Choose low-risk real work' },
        { icon: '📦', title: 'Artifact', blurb: 'Produce something reviewable' },
        { icon: '➡️', title: 'Handoff', blurb: 'Move when context changes' }
      ],
      terminal: { context: 'Role-based onboarding', detail: 'First win → evidence → next surface' }
    }),
    S('onboard-pm-docs', 2, 'First Wins for PM and Documentation', {
      scene: 'onboard', pillIcon: '🧭', pill: 'Onboarding · Shape the Work', steps: { current: 1, total: 3 },
      lanes: [
        { icon: '🧭', role: 'Product manager', surface: 'GitHub Chat', z: 'github', items: [
          { title: 'First task', detail: 'Map an unfamiliar feature from repository evidence' },
          { title: 'Ask', detail: 'Explain behavior, dependencies, open issues, and user impact' },
          { title: 'Keep', kind: 'keep', detail: 'A cited brief plus acceptance criteria for one bounded issue' },
          { title: 'Move when', kind: 'move', detail: 'The issue is ready: coding agent returns a draft PR' }
        ] },
        { icon: '📝', role: 'Docs specialist', surface: 'Chat → agent', z: 'github', items: [
          { title: 'First task', detail: 'Find docs made stale by one merged product change' },
          { title: 'Ask', detail: 'Identify affected pages, source evidence, and examples' },
          { title: 'Keep', kind: 'keep', detail: 'A verified docs PR reviewed by the documentation owner' },
          { title: 'Move when', kind: 'move', detail: 'Tone or structure needs judgment: refine in VS Code' }
        ] }
      ]
    }),
    S('onboard-test-design', 2, 'First Wins for Test and Design', {
      scene: 'onboard', pillIcon: '✅', pill: 'Onboarding · Validate the Work', steps: { current: 2, total: 3 },
      lanes: [
        { icon: '🧪', role: 'Tester', surface: 'Code Review', z: 'github', items: [
          { title: 'First task', detail: 'Review one bounded PR for missing tests and edge cases' },
          { title: 'Ask', detail: 'Focus on changed behavior, failure paths, and test evidence' },
          { title: 'Keep', kind: 'keep', detail: 'Findings plus a human acceptance or rejection decision' },
          { title: 'Move when', kind: 'move', detail: 'A finding needs reproduction: use VS Code or CLI' }
        ] },
        { icon: '🎨', role: 'Designer', surface: 'Chat → VS Code', z: 'local', items: [
          { title: 'First task', detail: 'Trace one interface from design intent to implementation' },
          { title: 'Ask', detail: 'Locate components, tokens, states, and accessibility behavior' },
          { title: 'Keep', kind: 'keep', detail: 'An implemented UI change with visual acceptance evidence' },
          { title: 'Move when', kind: 'move', detail: 'The PR is ready: Code Review checks implementation risk' }
        ] }
      ]
    }),
    S('onboard-app-sdk', 2, 'First Wins for the Copilot App and SDK', {
      scene: 'onboard', pillIcon: '🚀', pill: 'Onboarding · Coordinate and Embed', steps: { current: 3, total: 3 },
      lanes: [
        { icon: '🎛️', role: 'Copilot app', surface: 'fleet owners', z: 'purple', items: [
          { title: 'Who', detail: 'Engineering managers, release leads, and program leads' },
          { title: 'First task', detail: 'Coordinate three independent, review-ready backlog items' },
          { title: 'Keep', kind: 'keep', detail: 'Visible status, bounded escalation, and a reviewed PR set' },
          { title: 'Do not start here', kind: 'stop', detail: 'When the work still needs discovery or close code steering' }
        ] },
        { icon: '🧩', role: 'Copilot SDK', surface: 'product owners', z: 'runtime', items: [
          { title: 'Who', detail: 'Platform engineers, internal tools teams, and automation owners' },
          { title: 'First task', detail: 'Embed one proven workflow behind a real product trigger' },
          { title: 'Keep', kind: 'keep', detail: 'Structured output, policy controls, telemetry, and escalation' },
          { title: 'Do not start here', kind: 'stop', detail: 'For a one-off task that an existing surface already handles' }
        ] }
      ]
    }),
    S('part-3', 3, 'Build Adoption Maturity', {
      scene: 'opener',
      subtitle: 'Use telemetry to locate the starting point and reviewed capability evidence to advance.',
      cards: [
        { icon: '📊', title: 'Baseline', blurb: 'Locate current behavior' },
        { icon: '🧪', title: 'Evidence', blurb: 'Review real artifacts' },
        { icon: '🎚️', title: 'Threshold', blurb: 'Define quality locally' }
      ],
      terminal: { context: 'Configurable adoption cadence', detail: '4 phases → reviewed evidence' }
    }),
    S('four-phases', 3, 'Four Phases, One Evidence Gate', {
      pillIcon: '📈', pill: 'Adoption · Capability Roadmap', steps: { current: 1, total: 2 },
      subtitle: 'Telemetry locates the start; reviewed outcomes earn advancement',
      stages: [
        { label: '0', name: 'Activate', description: 'Complete one relevant task with human review', icon: '▶️' },
        { label: '1', name: 'Standardize', description: 'Make interactive help repeatable and repo-aware', icon: '📏' },
        { label: '2', name: 'Delegate', description: 'Deliver one bounded asynchronous artifact', icon: '📨' },
        { label: '3', name: 'Orchestrate', description: 'Coordinate independent work as a governed system', icon: '🎛️', target: true }
      ],
      footnote: 'Maturity belongs to a workflow, not permanently to a person.'
    }),
    S('scorecard', 3, 'The Capability Scorecard', {
      pillIcon: '📋', pill: 'Adoption · Evidence', steps: { current: 2, total: 2 },
      cards: [
        { icon: '📍', title: 'Baseline', description: 'Record recent behavior and the delivered outcome for this workflow.' },
        { icon: '🧾', title: 'Reviewed artifacts', description: 'Count normal-work outputs accepted by the named reviewer.' },
        { icon: '🛡️', title: 'Quality guardrail', description: 'Define the local threshold and escalation limit before advancing.' },
        { icon: '🎯', title: 'Next-phase target', description: 'Name the next capability the team must demonstrate.' }
      ]
    }),
    S('part-4', 4, 'Compose the Surfaces', {
      scene: 'opener',
      subtitle: 'Walk one production diagnosis across CLI evidence, a VS Code fix, and delegated follow-up.',
      cards: [
        { icon: '🖥️', title: 'Diagnose', blurb: 'Collect runtime evidence' },
        { icon: '🛠️', title: 'Fix', blurb: 'Change with repo context' },
        { icon: '☁️', title: 'Delegate', blurb: 'Continue with review' }
      ],
      terminal: { context: 'Prepared incident walkthrough', detail: 'Evidence → fix → follow-up' }
    }),
    S('incident-diagnose', 4, 'Diagnose Where the Runtime Lives', {
      scene: 'terminal', termTitle: 'copilot', pillIcon: '🖥️', pill: 'Incident Walkthrough · CLI', steps: { current: 1, total: 4 },
      subtitle: 'Keep host-local evidence on the affected machine',
      transcript: [
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: 'Inspect the failing process and host-local logs. Do not change code yet.' },
        { type: 'thinking', label: 'Copilot CLI:' },
        { type: 'response', lines: ['Read process state and recent logs', 'Separate the runtime symptom from the repository defect', 'Return evidence and a bounded remediation boundary'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Runtime evidence stays on the affected host' },
        { type: 'outcome', text: 'A repository configuration defect becomes the next artifact' }
      ],
      footnote: 'Control: immediate human steering at the prompt'
    }),
    S('incident-restore', 4, 'Restore Now, Prevent the Repeat', {
      scene: 'showdown', pillIcon: '🔗', pill: 'Incident Walkthrough · Recovery + Prevention', steps: { current: 2, total: 4 },
      subtitle: 'The incident ends after the validated fix; prevention is a separate, optional work item',
      leftLabel: 'Single-surface attempt', rightLabel: 'Composed route',
      pairs: [
        { left: { label: 'Copy logs into the editor', note: 'Runtime context is reconstructed' }, right: { label: 'Diagnose in CLI', note: 'Incident owner reviews host evidence', z: 'remote' } },
        { left: { label: 'Change files from the shell', note: 'Visual diff and diagnostics are weak' }, right: { label: 'Fix and validate in VS Code', note: 'Developer reviews the workspace diff', z: 'local' } },
        { left: { label: 'Keep polishing during recovery', note: 'Prevention work delays restoration' }, right: { label: 'Close the incident', note: 'The urgent route ends when service is restored', z: 'green' } },
        { left: { label: 'Skip prevention work', note: 'The same failure can return' }, right: { label: 'Optionally delegate prevention', note: 'Coding agent adds a regression test and runbook update in a separate draft PR', z: 'github', optional: true } }
      ],
      outcomeLeft: { icon: '↻', label: 'Recovery slows or prevention disappears' },
      outcomeRight: { icon: '✓', label: 'Service restored + optional prevention PR' },
      footnote: 'Coding agent does not redo the fix; it handles bounded follow-up work asynchronously'
    }),
    S('handoff-patterns', 4, 'Three Reusable Handoff Patterns', {
      scene: 'patterns', pillIcon: '🔀', pill: 'Composition · Pattern Library', steps: { current: 3, total: 4 },
      columns: [
        { icon: '🔎', title: 'Explore → Delegate → Review', description: 'A repository question becomes a bounded issue and reviewed PR.', items: ['Chat', 'Coding agent', 'VS Code'], z: ['github', 'github', 'local'] },
        { icon: '🛠️', title: 'Diagnose → Encode → Productize', description: 'An interactive operational proof becomes reusable capability.', items: ['CLI', 'VS Code', 'SDK'], z: ['remote', 'local', 'runtime'] },
        { icon: '🌐', title: 'Plan → Fan Out → Integrate', description: 'Independent tasks move through coordinated sessions to review.', items: ['VS Code or CLI', 'Copilot app', 'PR review'], z: ['local', 'purple', 'github'] }
      ]
    }),
    S('boundary-signals', 4, 'Boundary Signals Tell You When to Move', {
      scene: 'signals', pillIcon: '🚦', pill: 'Composition · Boundary Signals', steps: { current: 4, total: 4 },
      subtitle: 'Change surfaces only when the work contract changes',
      rows: [
        { label: 'Local state', description: 'Keep uncommitted files, services, and credentials local', tag: 'VS Code/CLI', z: 'local' },
        { label: 'Unbounded', description: 'Explore and plan before asynchronous delegation', tag: 'interactive', z: 'remote' },
        { label: 'Repeatable', description: 'Evaluate an embedded service for proven event-driven work', tag: 'SDK', z: 'runtime' },
        { label: 'Many streams', description: 'Coordinate independent sessions from one control plane', tag: 'Copilot app', z: 'purple' },
        { label: 'Understand', description: 'Use repository context without introducing mutation', tag: 'GitHub Chat', z: 'github' }
      ],
      footnote: 'At every transition: name the artifact, evidence, reviewer, and escalation trigger.'
    }),
    S('before-after', 0, 'From Tool Choice to Explicit Work Routing', {
      scene: 'before-after', pillIcon: '📊', pill: 'The Value Recap',
      before: ['Choose by habit or product familiarity', 'Move context manually between tools', 'Leave acceptance ownership implicit', 'Treat adoption as usage volume'],
      after: ['Choose by execution and decisive context', 'Move work when a boundary changes', 'Name the reviewer at every handoff', 'Advance through reviewed capability evidence'],
      metrics: [{ value: '7', detail: 'surface experiences' }, { value: '4', detail: 'routing questions' }, { value: '3', detail: 'lifecycle patterns' }]
    }),
    S('today', 0, 'What You Can Do Today', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Name the decisive context for one task', 'Identify its delivery artifact', 'Name the accepting reviewer'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Test the four routing questions', 'Document one visible handoff trigger', 'Review one capability artifact'] },
        { icon: '🚀', label: 'This Month', z: 'purple', items: ['Baseline your team across four phases', 'Set local quality thresholds', 'Practice all three lifecycle patterns'] }
      ],
      takeaway: 'Start the work where its strongest context and controls already live.'
    }),
    S('references', 0, 'References', {
      scene: 'references',
      groups: [
        { icon: '📖', title: 'Official Documentation', z: 'local', items: [
          { href: 'https://docs.github.com/en/copilot', label: 'GitHub Copilot documentation', description: 'Product-wide concepts and workflows.' },
          { href: 'https://code.visualstudio.com/docs/copilot/overview', label: 'GitHub Copilot in VS Code', description: 'Editor integrations, chat, and agent workflows.' },
          { href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli', label: 'About GitHub Copilot CLI', description: 'Terminal-native capabilities and operating model.' },
          { href: 'https://docs.github.com/en/copilot/concepts/agents/code-review', label: 'GitHub Copilot Code Review', description: 'AI findings for pull requests and changed code.' }
        ] },
        { icon: '🛠️', title: 'Agents and Embedding', z: 'purple', items: [
          { href: 'https://docs.github.com/en/copilot/concepts/agents/github-copilot-app', label: 'GitHub Copilot app', description: 'Desktop session management and coordination.' },
          { href: 'https://github.com/github/copilot-sdk', label: 'GitHub Copilot SDK', description: 'Agent capabilities for applications and services.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Which Copilot Where?', {
      scene: 'thanks', chrome: false, visual: 'closing-ring',
      subtitle: 'Route by context. Hand off by boundary. Review by contract.',
      cards: [{ value: '7 experiences', detail: 'One visible landscape' }, { value: '4 questions', detail: 'One practical router' }, { value: '3 patterns', detail: 'One composable lifecycle' }],
      prompt: 'Which task will your team route differently next?'
    })
  ];

  /* Speaker notes: the talk track for each slide.
     notes: lines starting with " are spoken; lines starting with → bridge to the next slide; others are presenter direction.
     know: facts to have ready for questions. sources: first-party evidence. seconds: time budget (estimates). */
  const SRC = {
    docs: { label: 'GitHub Copilot documentation', href: 'https://docs.github.com/en/copilot' },
    vscode: { label: 'GitHub Copilot in VS Code', href: 'https://code.visualstudio.com/docs/copilot/overview' },
    agents: { label: 'Build with agents in VS Code', href: 'https://code.visualstudio.com/docs/agents/overview' },
    cli: { label: 'About GitHub Copilot CLI', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli' },
    agent: { label: 'About GitHub Copilot coding agent', href: 'https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent' },
    app: { label: 'About the GitHub Copilot app', href: 'https://docs.github.com/en/copilot/concepts/agents/github-copilot-app' },
    sdk: { label: 'GitHub Copilot SDK', href: 'https://github.com/github/copilot-sdk' },
    chat: { label: 'Asking GitHub Copilot questions in GitHub', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github' },
    review: { label: 'About GitHub Copilot code review', href: 'https://docs.github.com/en/copilot/concepts/agents/code-review' },
    sandboxes: { label: 'Cloud and local sandboxes', href: 'https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes' },
    v1109: { label: 'VS Code release notes: v1.109', href: 'https://code.visualstudio.com/updates/v1_109' }
  };

  const NOTES = {
    title: { seconds: 45, sources: [SRC.docs],
      notes: [
        `"Copilot now spans the editor, the terminal, the browser, a desktop app, and your own product. Today we build one practical way to choose where a piece of work runs."`,
        `Point at the ring: seven surfaces around one task card. The question in the centre is the whole talk.`,
        `→ Name the question we answer together.`
      ],
      know: [`The seven experiences: VS Code, Copilot CLI, GitHub.com Chat, the coding agent, Code Review, the Copilot app, and the Copilot SDK.`] },
    'core-question': { seconds: 120,
      notes: [
        `"Which Copilot surface owns this work next? We answer it by starting where the decisive context and controls already live."`,
        `Walk the four route-by chips: context, artifact, reviewer, handoff. They carry the rest of the talk.`,
        `Role cards: developers keep implementation context close; product and docs explore and delegate without an IDE; test and design review evidence and move beside the code only when needed.`,
        `"The same prompt can be very different work. 'Fix this deployment failure' can be a terminal investigation, an editor change, a delegated repository task, or an event-driven remediation service. Each version has a different best surface."`,
        `→ Four parts get us there.`
      ],
      know: [`The useful question has shifted from "Does Copilot support this task?" to "Where can this task run with the right context, control, and delivery path?"`] },
    contents: { seconds: 45,
      notes: [
        `"Four parts: map the surfaces, start by role, build adoption maturity, then compose the surfaces across a real incident."`,
        `Keep this brisk. Part 1 builds the mental model; part 4 proves it.`
      ] },
    'part-1': { seconds: 30,
      notes: [
        `"Two independent axes: where you steer, and where the work happens. Add the artifact that comes back, and most routing decisions follow."`,
        `→ The matrix puts both axes on one screen.`
      ] },
    matrix: { seconds: 180, sources: [SRC.vscode, SRC.agents, SRC.cli, SRC.app, SRC.sandboxes],
      notes: [
        `"Rows are where you steer. Columns are where execution or analysis happens."`,
        `Walk the rows: VS Code and the CLI reach local, remote, and GitHub execution. GitHub.com hosts Chat, the coding agent, and Code Review. The Copilot app steers local sessions and a cloud fleet. Your product hosts the SDK in its own runtime.`,
        `"The off-diagonal cells are the key: your control surface can steer work somewhere else."`,
        `Two surfaces handle many streams. Choose the VS Code Agents window when sessions need close contact with workspaces, diffs, and diagnostics; choose the Copilot app when the unit of work is a fleet of sessions, issues, or pull requests.`,
        `→ Six scenarios trace a route through this same grid.`
      ],
      know: [
        `Seven contract dimensions sit behind the grid: control location, execution location, context ownership, interaction, autonomy, delivery, and review owner.`,
        `The VS Code Agents window runs concurrent sessions across workspaces with isolated worktrees, inline changes, and active human steering.`,
        `Full contracts for all seven experiences: tech-talks/surfaces/surface-contracts.yml.`
      ] },
    'route-pm': { seconds: 75, sources: [SRC.chat, SRC.agent],
      notes: [
        `"A product manager stays in GitHub: learn the repository with Chat, define acceptance in the issue, then hand that bounded issue to the coding agent."`,
        `Artifact: an evidence-backed issue plus a draft pull request, with no local checkout required.`,
        `Handoff trigger: the issue is ready to implement.`
      ] },
    'route-docs': { seconds: 75, sources: [SRC.chat, SRC.agent, SRC.vscode],
      notes: [
        `"Docs start from repository context. Chat finds the pages a product change made stale, the coding agent drafts the update, and the docs owner refines tone and structure in VS Code."`,
        `Editorial acceptance stays with the documentation owner.`
      ] },
    'route-designer': { seconds: 75, sources: [SRC.chat, SRC.vscode, SRC.review],
      notes: [
        `"A designer starts with implementation facts in Chat, moves beside the UI in VS Code once visual feedback becomes decisive, then hands the pull request to Code Review for implementation risk."`,
        `Artifact: an implemented UI change with visual acceptance evidence.`
      ] },
    'route-platform': { seconds: 75, sources: [SRC.cli, SRC.vscode],
      notes: [
        `"Runtime state is decisive, so the platform team starts in the CLI on the affected host, proves the diagnosis interactively, and moves to VS Code once the remediation becomes repository work."`,
        `Artifact: a validated diagnosis plus a reviewable infrastructure change.`
      ],
      know: [`A security analyst opens the same way: prove the investigation in the CLI, then move to the SDK when the workflow needs to run on every alert.`] },
    'route-delivery': { seconds: 75, sources: [SRC.app, SRC.review],
      notes: [
        `"When several bounded streams are ready, coordination is the work. The delivery lead dispatches from the Copilot app, monitors the fleet, and accepts each pull request through review."`,
        `Artifact: a coordinated set of reviewed pull requests.`
      ],
      know: [`Start here when items are independent and review-ready. Discovery work and close code steering belong in an interactive surface first.`] },
    'route-embedded': { seconds: 75, sources: [SRC.sdk],
      notes: [
        `"When Copilot must live behind your trigger, tools, policy, and product experience, start with the SDK."`,
        `The SDK gets its own first branch because embedding creates software ownership: authentication, tools, policy, observability, deployment, and support join the product contract.`
      ],
      know: [`For a one-off task, an existing interactive surface fits better; product integration adds lifecycle and governance work.`] },
    'route-by-outcome': { seconds: 180, sources: [SRC.chat, SRC.review, SRC.vscode, SRC.cli, SRC.agent, SRC.app, SRC.sdk],
      notes: [
        `"Your role suggests a first branch; the artifact and the decisive context choose the surface."`,
        `Root question: what must exist when this work is done? Walk the four branches left to right.`,
        `Understand or shape → GitHub Chat. Review or accept → Code Review. Create or change → ask where the context you cannot cheaply recreate lives: files and diagnostics go to VS Code, shell and runtime go to the CLI, a bounded issue goes to the coding agent. Scale or repeat → the Copilot app for many streams, the SDK inside your product.`,
        `Tie-breaker when two surfaces remain: who steers, and who reviews? Immediate steering favors VS Code or the CLI. Asynchronous pull-request review favors the coding agent. One owner coordinating many streams favors the app. Application-defined approval favors the SDK.`,
        `"When the artifact or decisive context changes, return to the tree and route the next phase."`
      ],
      know: [
        `The canonical tree lives in tech-talks/surfaces/surface-decision-tree.mmd.`,
        `Set the router aside when policy or licensing leaves one eligible surface, when a specialized domain tool already owns the workflow, or when the task has no defined outcome yet.`
      ] },
    'part-2': { seconds: 30,
      notes: [
        `"A role finds the question; context finds the surface. Every role gets one useful first task, one reviewable artifact, and one clear handoff."`,
        `→ Three slides, two roles each.`
      ] },
    'onboard-pm-docs': { seconds: 120, sources: [SRC.chat, SRC.agent, SRC.vscode],
      notes: [
        `"Product managers start in GitHub Chat: map an unfamiliar feature from repository evidence and keep a cited brief plus acceptance criteria for one bounded issue."`,
        `"Docs specialists find the pages one merged change made stale and deliver a verified docs pull request that the documentation owner reviews."`,
        `Each lane ends with its move: the PM hands the ready issue to the coding agent; the docs specialist refines in VS Code when tone or structure needs judgment.`
      ],
      know: [`Ask each role two questions: when are you reaching for help, and what must exist when the work is done? The answers describe the work more reliably than a job title.`] },
    'onboard-test-design': { seconds: 120, sources: [SRC.review, SRC.chat, SRC.vscode],
      notes: [
        `"Testers start with Code Review on one bounded pull request: missing tests, edge cases, and failure paths. They keep the findings and own the acceptance decision."`,
        `"Designers trace one interface from design intent to implementation, iterate beside the UI in VS Code, and keep visual acceptance evidence."`,
        `Move signals: a finding that needs reproduction goes to VS Code or the CLI; a ready UI pull request goes to Code Review.`
      ] },
    'onboard-app-sdk': { seconds: 120, sources: [SRC.app, SRC.sdk],
      notes: [
        `"The Copilot app belongs to fleet owners: engineering managers, release leads, and program leads. First task: coordinate three independent, review-ready backlog items."`,
        `"The SDK belongs to product owners: embed one proven workflow behind a real product trigger, with structured output, policy controls, telemetry, and escalation."`,
        `Point at the orange rows. The app waits until discovery and close code steering are done; the SDK waits until a workflow is proven and recurring.`
      ] },
    'part-3': { seconds: 30,
      notes: [
        `"Telemetry tells you where a team starts. Reviewed evidence decides when it advances."`,
        `→ Four phases, one gate.`
      ] },
    'four-phases': { seconds: 150,
      notes: [
        `"Activate, standardize, delegate, orchestrate. Each riser is an evidence gate, crossed with reviewed outcomes produced in normal work."`,
        `Exit evidence: phase 0, one real task completed, reviewed, and the surface choice explained. Phase 1, shared instructions plus a plan-led change that passes tests and review. Phase 2, one bounded task returns a reviewable artifact asynchronously, with handoff and escalation rules written down. Phase 3, independent workstreams integrate cleanly, with quality, policy, cost, and throughput measured.`,
        `"Maturity belongs to a workflow. One person can be phase 2 in repository delegation and phase 0 in incident response."`
      ],
      know: [
        `Engagement signals mirror a rolling 28-day report: phase 0 is licensed but not engaged; phase 1 is completion or IDE agent use on at least two days; phase 2 is use of one GitHub-based agent surface; phase 3 is two or more agent surfaces, or the Copilot app.`,
        `Governance starts in phase 0 and deepens with autonomy.`,
        `Core learning paths per phase live in tech-talks/surfaces/adoption-roadmap.yml.`
      ] },
    scorecard: { seconds: 90,
      notes: [
        `"For each workflow, record four fields: baseline, reviewed artifacts, quality guardrail, and next-phase target."`,
        `This keeps the roadmap measurable without universal percentages for teams with different work, risk, and delivery cadence.`,
        `Before advancing, set the local thresholds: minimum sample size, acceptance signal, quality guardrail, and escalation limit.`
      ] },
    'part-4': { seconds: 30,
      notes: [
        `"One production diagnosis, three surfaces: evidence in the CLI, a fix in VS Code, and delegated follow-up."`,
        `→ It starts on the affected host.`
      ],
      know: [`The walkthrough is prepared, which protects timing and repeatability. Routing a live task from the room raises participation and needs flexible facilitation.`] },
    'incident-diagnose': { seconds: 120, sources: [SRC.cli],
      notes: [
        `"The failure lives on a host, so the investigation starts there. We ask Copilot CLI to inspect the failing process and host-local logs, and to leave the code alone for now."`,
        `Read the outcome lines: runtime evidence stays on the affected host, and a repository configuration defect becomes the next artifact.`,
        `"Control is immediate: a person steers at the prompt and reviews the evidence."`
      ] },
    'incident-restore': { seconds: 150, sources: [SRC.cli, SRC.vscode, SRC.agent],
      notes: [
        `Left column: one surface does every step, so context gets copied by hand and prevention competes with recovery.`,
        `"On the right, each phase runs where its context lives: diagnose in the CLI, fix and validate in VS Code, and close the incident once service is restored."`,
        `"Prevention is a separate, optional work item. The coding agent adds a regression test and runbook update in its own draft pull request, after the incident is closed."`
      ] },
    'handoff-patterns': { seconds: 120, sources: [SRC.chat, SRC.agent, SRC.cli, SRC.sdk, SRC.app],
      notes: [
        `"Surface selection is a routing decision for the current phase. A task changes surfaces when its execution boundary changes."`,
        `Explore → Delegate → Review: a repository question becomes a bounded issue and returns as a pull request that needs detailed review.`,
        `Diagnose → Encode → Productize: operational work discovered interactively becomes a repeatable internal capability.`,
        `Plan → Fan Out → Integrate: several independent tasks with clear repository boundaries and one shared reviewer.`
      ] },
    'boundary-signals': { seconds: 120, sources: [SRC.v1109],
      notes: [
        `"Change surfaces when the work contract changes. Five signals tell you when."`,
        `Walk each row with its tag: hidden local state stays in VS Code or the CLI; an unbounded problem gets explored and planned interactively first; a proven, repeating workflow is a candidate for the SDK; many independent streams go to the Copilot app; pure understanding goes to GitHub Chat.`,
        `"At every transition, name the artifact, the evidence, the reviewer, and the escalation trigger."`
      ],
      know: [`Ask Questions in VS Code is a steering contract: the agent uses it when information or authority is missing. Fixed options suit bounded choices; freeform input lets the person add context or set a different boundary.`] },
    'before-after': { seconds: 90,
      notes: [
        `"Each row is one shift: choose by context, move work at a boundary, name the reviewer, and advance on reviewed evidence."`,
        `Land the numbers: seven experiences, four routing questions, three lifecycle patterns.`
      ] },
    today: { seconds: 90,
      notes: [
        `"Today takes three minutes per task: name its decisive context, its artifact, and its reviewer."`,
        `This week, test the four questions on real work and write down one handoff trigger. This month, baseline the team across the four phases and set local thresholds.`,
        `"Start the work where its strongest context and controls already live."`
      ],
      know: [`A one-hour exercise: classify three recent tasks with the decision tree, add team constraints to surface-contracts.yml, and compare the router's picks with what the team chose.`] },
    references: { seconds: 30,
      notes: [`Leave this up while questions start. Every link is first-party documentation.`] },
    thanks: { seconds: 60,
      notes: [
        `"Route by context. Hand off by boundary. Review by contract."`,
        `"Which task will your team route differently next?" Take answers from the room and route one live.`
      ] }
  };
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'surfaces', title: 'Which Copilot Where?', short: 'Which Copilot Where?', category: 'tech-talks', source: 'tech-talks/surfaces/README.md',
      question: 'Which Copilot surface fits this work, its constraints, and its desired outcome, and what capability does the team build next?',
      thesis: 'Start with eligible surfaces, preserve the work\'s decisive context, then match control, review ownership, and delivery model.'
    },
    matrix,
    slides
  };
})();
