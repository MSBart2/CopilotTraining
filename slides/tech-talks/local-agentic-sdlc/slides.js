/*
  Local Agentic SDLC — native teaching source.
  The slide order and speaker notes preserve the approved FanHub run narrative.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const slides = [
    S('title', 0, 'Local Agentic SDLC', {
      chrome: false, visual: 'local-loop',
      subtitle: 'A Loop with a Contract',
      tagline: 'Roles own the work. Tests decide done. Budgets decide when to stop. A person decides what merges.',
      meta: 'Agents at Your Keyboard · CopilotTraining Tech Talk · 45 min'
    }),
    S('core-question', 0, 'How do I hand an issue to local agents and know when the work is ready for my review?', {
      pill: 'Core Question',
      subtitle: 'A developer sets the contract; Copilot and role agents do bounded work; a reviewer decides what merges.',
      highlight: 'Write down roles, evidence, budget, and human authority before the first run.',
      routing: ['roles', 'evidence', 'budget', 'authority'], routingLabel: 'The loop contract',
      roles: [
        { icon: '⌨️', title: 'Developer', description: 'Chooses the issue, writes the contract, and starts the local sessions.' },
        { icon: '🧭', title: 'Orchestrator', description: 'Sequences work and routes evidence to the role that owns it.' },
        { icon: '🧑‍⚖️', title: 'Reviewer', description: 'Judges intent and owns the merge decision.' }
      ],
      stats: [
        { title: '2 issues → 1 draft PR', description: 'FanHub #4 and #5 integrated in observed run' },
        { title: '96 / 96 tests', description: 'Integrated suite after a reviewer-driven fix' },
        { title: '≈380 AI credits', description: 'One observed run; no manual baseline measured' }
      ]
    }),
    S('contents', 0, 'The path from a contract to a human handoff', {
      sections: [
        { icon: '📜', title: 'Write the Loop Contract First', subtitle: 'Roles · done · budget · merge', blurb: 'Plan risks early and name the seams before splitting.', slide: 5 },
        { icon: '🧰', title: 'Build the Crew', subtitle: 'Bounded agents · worktrees', blurb: 'Use mechanisms that enforce the contract.', slide: 9 },
        { icon: '🧪', title: 'Evidence Decides', subtitle: 'Tests · hook · budget', blurb: 'Follow a predicted risk through a routed fix.', slide: 14 },
        { icon: '🤝', title: 'Integrate and Hand Off', subtitle: 'Merged review · draft PR', blurb: 'Make evidence and open risks visible.', slide: 21 }
      ]
    }),
    S('run-ledger', 0, 'Four CLI sessions took two issues to one integrated draft', {
      scene: 'run-ledger',
      pill: 'Cold open · REAL run',
      subtitle: 'FanHub · 2026-10-22 · Copilot CLI 1.0.100 · AI credits per session',
      footnote: 'One observed run: about 380 credits. Developer time and a manual baseline were unmeasured.'
    }),
    S('part-1', 1, 'Write the Loop Contract First', {
      scene: 'opener',
      subtitle: 'Four answers before the first run, a plan with risks before code, and a split test with named seams.',
      cards: [
        { icon: '📜', title: 'Four fields', blurb: 'Roles · done · budget · merge owner' },
        { icon: '⚠️', title: 'Risks first', blurb: 'The plan names what could break' },
        { icon: '✂️', title: 'Split test', blurb: 'Independent files; seams have an owner' }
      ],
      terminal: { context: 'copilot --agent sdlc-orchestrator --mode autopilot -p "plan #4 #5"', detail: 'two plans posted as issue comments · two workstreams' }
    }),
    S('four-field-contract', 1, 'Four answers turn a hand-off into checks', {
      scene: 'four-field-contract',
      pill: 'Contract · four fields',
      subtitle: 'The orchestrator states the answers in its first message and final summary.'
    }),
    S('plan-with-risks', 1, 'The planner names risks before anyone writes code', {
      scene: 'plan-with-risks',
      pill: 'Contract · plan artifact',
      subtitle: 'A read-only planner returns a fixed shape and the orchestrator posts it on the issue.'
    }),
    S('split-test', 1, 'Split when files are independent apart from named seams', {
      scene: 'split-test',
      pill: 'Contract · split test',
      subtitle: 'FanHub #4 and #5 could proceed independently because integration owned three shared seams.'
    }),
    S('part-2', 2, 'Build the Orchestrator and Its Crew', {
      scene: 'opener',
      subtitle: 'Keep the mechanisms that enforce the contract: an orchestrator, narrow roles, and isolated worktrees.',
      cards: [
        { icon: '🎼', title: 'Orchestrator', blurb: 'Owns sequence; no edit tool' },
        { icon: '🧑‍🔧', title: 'Role agents', blurb: 'One boundary for each kind of work' },
        { icon: '🌳', title: 'Worktrees', blurb: 'One per stream, each with a budget' }
      ],
      terminal: { context: '.github/agents/sdlc-orchestrator.agent.md · FanHub', detail: 'planner · implementer · test-writer · test-reviewer' }
    }),
    S('orchestrator-file', 2, 'The orchestrator owns sequence and delegates every edit', {
      scene: 'orchestrator-file',
      pill: 'Crew · orchestrator boundary',
      subtitle: 'The agent allow-list, tool list, and scoped Stop hook express the operating contract.'
    }),
    S('role-boundaries', 2, 'Each role agent gets one boundary, and each one held', {
      scene: 'role-boundaries',
      pill: 'Crew · role boundaries',
      subtitle: 'In #5, the implementer reported eight failures and left the test repair to test-writer.'
    }),
    S('worktree-command', 2, 'One worktree per workstream, a budget on every session', {
      scene: 'terminal',
      pill: 'Crew · command shape',
      termTitle: 'FanHub · implement #4 · parallel with #5',
      footnote: 'The same command shape ran independently for #5 with worktree episode-detail and its own session logs.',
      transcript: [
        { type: 'prompt', text: 'copilot --worktree char-detail --agent sdlc-orchestrator --mode autopilot' },
        { type: 'response', lines: ['--max-autopilot-continues 15 --max-ai-credits 150', '--allow-all-tools --deny-tool "shell(git push)"'] },
        { type: 'response', lines: ['--share .\\evidence\\impl4.md --log-dir .\\evidence\\impl4-logs', '-p "implement #4"'] },
        { type: 'outcome', text: 'New worktree and branch · commit bee5680 · 56/56 tests · 104.12 credits' }
      ]
    }),
    S('setup-gotchas', 2, 'Three setup details made the first runs diagnosable', {
      scene: 'setup-gotchas',
      pill: 'Crew · observed setup lessons',
      subtitle: 'Permission boundaries, fresh worktree dependencies, and hook input all surfaced in the run.'
    }),
    S('part-3', 3, 'Let Evidence Decide When to Stop', {
      scene: 'opener',
      subtitle: 'Tests steer the run, a Stop hook backs them up, and budgets hand control to a person.',
      cards: [
        { icon: '🔮', title: 'Predicted risk', blurb: 'The plan forecast eight test failures' },
        { icon: '🛑', title: 'Backstop', blurb: '11 real allows; staged run proves block' },
        { icon: '💳', title: 'Budget stop', blurb: '113.4 of 120 credits; person resumes' }
      ],
      terminal: { context: '.copilot-loop/hook-log.jsonl', detail: 'decision · blocksSoFar · Tests line · seconds' }
    }),
    S('predicted-failure', 3, 'A predicted risk became eight failures, a routed fix, and 47 passing tests', {
      scene: 'predicted-failure',
      pill: 'Evidence · REAL · issue #5',
      subtitle: 'The existing Episodes test rendered without router context, exactly as the planner predicted.'
    }),
    S('stop-hook', 3, 'The Stop hook turns done into a test result', {
      scene: 'stop-hook',
      pill: 'Evidence · Stop hook',
      subtitle: 'On a failed suite, Copilot receives the failing output as the next prompt; on a pass, the hook allows the stop.'
    }),
    S('real-gate-record', 3, 'The real runs logged 11 allow and 0 block', {
      scene: 'real-gate-record',
      pill: 'Evidence · REAL · hook log',
      subtitle: 'The orchestrator ran the suite and routed failures before attempting to stop.'
    }),
    S('staged-backstop', 3, 'A staged run blocked on seven failures and allowed after eight passed', {
      scene: 'staged-backstop',
      pill: 'Evidence · STAGED · hook demo',
      subtitle: 'The prompt asked the orchestrator to skip tests and finish; the gate returned the failing assertions.'
    }),
    S('agreement-and-intent', 3, 'Tests prove agreement; a person judges intent', {
      scene: 'showdown',
      pill: 'Evidence · the verification boundary',
      leftLabel: 'AUTOMATED GATE',
      rightLabel: 'HUMAN REVIEW',
      pairs: [
        { left: { label: 'Suite result', note: '8 of 8 after Series rename' }, right: { label: 'Code and tests agree', note: 'Repeatable result, about five seconds', z: 'green' } },
        { left: { label: 'Change intent', note: 'Agent treated rename as intended' }, right: { label: 'Reviewer judges intent', note: 'Was Series the requested behavior?', z: 'orange' } },
        { left: { label: 'Stop decision', note: 'Hook logged decision and strike' }, right: { label: 'Person owns merge', note: 'Approve, request changes, or reject', z: 'orange' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Test agreement is observable' },
      outcomeRight: { icon: '🧑‍⚖️', label: 'Intent stays with a person' },
      footnote: 'The staged test runner status is separate from the application behavior it checked.'
    }),
    S('budgets', 3, 'Budgets stopped runs cleanly and handed control to a person', {
      scene: 'budgets',
      pill: 'Evidence · REAL · control limits',
      subtitle: 'Each stop left a clean state, a transcript, and a stated reason.'
    }),
    S('part-4', 4, 'Integrate, Then Hand It to a Person', {
      scene: 'opener',
      subtitle: 'Resolve named seams, review the merged whole, and open a draft with its evidence.',
      cards: [
        { icon: '🔍', title: 'Merged review', blurb: 'Defect found after green branches met' },
        { icon: '🧾', title: 'Integration record', blurb: 'Seams, counts, corrections, and risks' },
        { icon: '🤝', title: 'Draft handoff', blurb: 'The reviewer owns intent and merge' }
      ],
      terminal: { context: 'integrate char-detail episode-detail into feat/node-detail-pages', detail: 'draft #217 · Fixes #4 · Fixes #5' }
    }),
    S('reviewer-catch', 4, 'The merged reviewer found a defect neither branch had', {
      scene: 'reviewer-catch',
      pill: 'Handoff · REAL · merged review',
      subtitle: 'Global white heading rules met new white panels only after the two workstreams joined.'
    }),
    S('integration-record', 4, 'The integration record carries the evidence and remaining risks', {
      scene: 'integration-record',
      pill: 'Handoff · integration record',
      subtitle: 'The record became the body of draft PR #217, with Fixes #4 and Fixes #5.'
    }),
    S('reviewer-handoff', 4, 'The reviewer receives the evidence and keeps merge authority', {
      scene: 'relay',
      pill: 'Handoff · draft PR #217',
      columns: [
        { icon: '📋', title: 'Plan artifacts', description: 'Issue comments make scope and risks reviewable.', items: ['#4 plan', '#5 plan', 'Named seams'], z: ['github', 'github', 'github'] },
        { icon: '🧪', title: 'Run evidence', description: 'Counts, corrections, and open risks travel with the change.', items: ['56 + 47', '95 → 96', 'Risk list'], z: ['green', 'green', 'orange'] },
        { icon: '🧑‍⚖️', title: 'Human authority', description: 'The draft waits for review under the repository rules.', items: ['Judge intent', 'Request changes', 'Merge decision'], z: ['orange', 'orange', 'orange'] }
      ]
    }),
    S('scheduled-loop', 4, 'A repeating local pass needs state, stale-run escalation, and a watched first run', {
      scene: 'scheduled-loop',
      pill: 'Handoff · recurring work',
      subtitle: 'Copilot CLI /every is experimental and session-scoped; each pass starts with fresh context.'
    }),
    S('fit-boundary', 4, 'Local orchestration fits developer-led work with a fast verification command', {
      scene: 'signals',
      pill: 'Handoff · choose the right boundary',
      subtitle: 'Change the execution model when the trigger, human presence, task size, or verification time changes.',
      rows: [
        { label: 'Developer-led issue', description: 'Local context, worktrees, and a person at the draft', tag: 'Local CLI', z: 'green' },
        { label: 'Event starts the work', description: 'A label, schedule, or failed check runs without a developer', tag: 'Agentic Workflows', z: 'github' },
        { label: 'Assign and walk away', description: 'Hosted work returns as a pull request for review', tag: 'Copilot on GitHub', z: 'remote' },
        { label: 'Small / slow gate', description: 'Plan overhead or long checks change economics', tag: 'Re-scope first', z: 'orange' }
      ],
      footnote: 'FanHub plan session: 47 credits. Its test suite ran in about five seconds.'
    }),
    S('own-work-contract', 4, 'Write a loop contract for one issue in your repository', {
      scene: 'own-work-contract',
      pill: 'Handoff · apply it to your work',
      subtitle: 'Fill these four fields before you launch the session.'
    }),
    S('before-after', 0, 'From agents handling it to a loop with a contract', {
      scene: 'before-after',
      before: [
        'One agent asked to do everything in one session',
        'Done means the agent said it was done',
        'Spend noticed after the run',
        'A diff arrives with a summary to trust'
      ],
      after: [
        'An orchestrator sequences four narrow roles',
        'Done means suite passes and reviewer accepts',
        'Every session carries a credit and turn cap',
        'A draft arrives with evidence and open risks'
      ],
      metrics: [
        { value: '8 → 47/47', detail: 'Predicted risk routed to test-writer · REAL' },
        { value: '11 / 0', detail: 'Hook allows / blocks in real runs · REAL' },
        { value: '95 → 96', detail: 'Post-merge contrast regression · REAL' }
      ]
    }),
    S('today', 0, 'What you can do today', {
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Write four contract answers for one issue', 'Choose the meaningful done command', 'Name the reviewer and issue budget'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Create the orchestrator allow-list', 'Give the planner a risks-before-code shape', 'Log each Stop decision and escalation'] },
        { icon: '🚀', label: 'This Month', z: 'purple', items: ['Run parallel worktrees with budgets', 'Put integration evidence in the draft body', 'Agree team budget and escalation policy'] }
      ],
      takeaway: 'The reviewer decides what merges; the developer and team lead decide what the next run is allowed to do.'
    }),
    S('references', 0, 'References and run evidence', {
      groups: [
        { icon: '📖', title: 'Agents and parallel work', z: 'local', items: [
          { href: 'https://code.visualstudio.com/docs/agents/run/subagents', label: 'VS Code: subagents and orchestration patterns', description: 'Subagent orchestration patterns.' },
          { href: 'https://docs.github.com/en/copilot/reference/custom-agents-configuration', label: 'Custom agents configuration reference', description: 'Agent tool and delegation configuration.' },
          { href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli', label: 'Create custom agents for Copilot CLI', description: 'Create repository agents for CLI.' },
          { href: 'https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents', label: 'Delegating and parallelizing work with agents', description: 'Choosing bounded parallel work.' }
        ] },
        { icon: '⌨️', title: 'CLI controls and hooks', z: 'github', items: [
          { href: 'https://docs.github.com/en/copilot/reference/hooks-reference', label: 'Hooks reference', description: 'Hook events, decisions, and scope.' },
          { href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode', label: 'Copilot CLI: autopilot mode', description: 'Autopilot and credit controls.' },
          { href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions', label: 'Copilot CLI: multiple sessions', description: 'Multiple sessions and worktrees.' },
          { href: 'https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference', label: 'Copilot CLI command reference', description: 'CLI flags and commands.' }
        ] },
        { icon: '🎬', title: 'FanHub first-party artifacts', z: 'purple', items: [
          { href: 'https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md', label: 'sdlc-orchestrator.agent.md', description: 'Role boundaries and run sequence.' },
          { href: 'https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs', label: 'verify-before-stop.mjs', description: 'Stop-hook implementation.' },
          { href: 'https://github.com/MSBart2/FanHub/issues/4', label: 'FanHub issue #4', description: 'Character detail issue and plan.' },
          { href: 'https://github.com/MSBart2/FanHub/issues/5', label: 'FanHub issue #5', description: 'Episode detail issue and plan.' }
        ] },
        { icon: '🤝', title: 'Integration evidence', z: 'orange', items: [
          { href: 'https://github.com/MSBart2/FanHub/pull/217', label: 'FanHub #217', description: 'Integrated draft, evidence, and open risks.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Local Agentic SDLC', {
      scene: 'thanks', chrome: false, visual: 'local-loop',
      subtitle: 'A loop with a contract: roles, evidence, budgets, and a person at the merge',
      cards: [
        { value: '8 → 47/47', detail: 'A predicted risk became a routed repair' },
        { value: '95 → 96', detail: 'Merged review produced a regression check' },
        { value: 'One draft', detail: 'Evidence arrived; a person retained authority' }
      ],
      prompt: 'Which issue will you write a contract for next?'
    })
  ];

  const SRC = {
    subagents: { label: 'VS Code subagents and orchestration patterns', href: 'https://code.visualstudio.com/docs/agents/run/subagents' },
    agents: { label: 'Custom agents configuration reference', href: 'https://docs.github.com/en/copilot/reference/custom-agents-configuration' },
    cliAgents: { label: 'Create custom agents for Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli' },
    hooks: { label: 'Hooks reference', href: 'https://docs.github.com/en/copilot/reference/hooks-reference' },
    autopilot: { label: 'Copilot CLI autopilot mode', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode' },
    sessions: { label: 'Copilot CLI multiple sessions', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions' },
    cli: { label: 'Copilot CLI command reference', href: 'https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference' },
    parallel: { label: 'Delegating and parallelizing work with agents', href: 'https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents' },
    orchestrator: { label: 'FanHub sdlc-orchestrator.agent.md', href: 'https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md' },
    hookCode: { label: 'FanHub verify-before-stop.mjs', href: 'https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs' },
    issue4: { label: 'FanHub issue #4 and plan', href: 'https://github.com/MSBart2/FanHub/issues/4' },
    issue5: { label: 'FanHub issue #5 and plan', href: 'https://github.com/MSBart2/FanHub/issues/5' },
    pr: { label: 'FanHub #217 integrated draft pull request', href: 'https://github.com/MSBart2/FanHub/pull/217' },
    starter: { label: 'Local Agentic SDLC loop-starter example', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/local-agentic-sdlc/examples/loop-starter' }
  };

  const NOTES = {
    title: { seconds: 30, sources: [SRC.orchestrator, SRC.pr],
      notes: [
        `"A developer can hand an issue to a local crew and still keep the important decisions visible."`,
        `Point to the ring: the orchestrator, role agents, test evidence, and reviewer form one loop.`,
        `→ Start with the question the developer is trying to answer.`
      ],
      know: [`FanHub issues #4 and #5 were character and episode detail pages. The observed run used Copilot CLI 1.0.100 on 2026-10-22.`] },
    'core-question': { seconds: 80, sources: [SRC.issue4, SRC.issue5, SRC.pr],
      notes: [
        `"How do I hand an issue to local agents and know when the work is ready for my review?"`,
        `Name the actors: the developer defines the task and contract; Copilot's orchestrator sequences; role agents plan, edit, test, or review; the pull-request reviewer decides intent and merge.`,
        `The displayed outcomes are from one FanHub run: two issues reached an integrated draft, the final suite had 96 passing tests, and the four sessions used about 380 AI credits.`,
        `"The credit count is a real observation, not an efficiency comparison. Nobody measured developer time or a manual baseline."`,
        `→ The contract makes each part of the run inspectable.`
      ],
      know: [`The reviewer owns the merge decision. The team lead owns the budget and escalation policy inherited by future runs.`] },
    contents: { seconds: 25, sources: [SRC.pr],
      notes: [`"We will write the contract, build the crew, let evidence steer the stop, and finish with the human handoff."`, `Part 3 is the evidence climax; part 4 shows the review boundary and how to transfer the method.`],
      know: [`The four opener slide numbers are 5, 9, 14, and 21, counted from one.`] },
    'run-ledger': { seconds: 140, sources: [SRC.issue4, SRC.issue5, SRC.pr, SRC.orchestrator],
      notes: [
        `"Four CLI sessions took two FanHub issues from plans on the issues to an integrated draft pull request."`,
        `Walk down the ledger. The plan session posted two plans and identified three shared seams. #4 used worktree char-detail and produced commit bee5680 with 56 of 56 tests. #5 used episode-detail; its first suite run had eight failures and its final run had 47 of 47.`,
        `Integration resolved the seams, found a contrast defect in the merged whole, and opened draft #217 after 96 of 96 tests passed.`,
        `"This was about 380 AI credits in one observed run. Developer time and a manual baseline were not measured."`,
        `The orchestrator did not edit code. Issue comments, local commits, hook logs, transcripts, and the pull request body made each stage inspectable.`,
        `→ What did the developer write down before running these sessions?`
      ],
      know: [`Per-session observed credits: plan 47.15; implement #4 104.12; implement #5 102.55; integrate 126.13. Their sum is 379.95, presented as about 380.`, `The #4 reviewer accepted after one round of requested changes; the #5 reviewer accepted after revisions.`, `The ledger records Copilot CLI 1.0.100 on 2026-10-22.`, `This is a single case study. No comparative productivity or labor-saving claim is made.`] },
    'part-1': { seconds: 20, sources: [SRC.issue4, SRC.issue5],
      notes: [`"The developer starts by writing four answers that turn a broad hand-off into checks."`, `Point to the contract, the risk-first plan, and the seam test.`, `→ First, make the contract explicit.`],
      know: [`The four teaching slides in this part move from contract fields, to risk-first plans, to the parallel-work split test.`] },
    'four-field-contract': { seconds: 90, sources: [SRC.orchestrator, SRC.hookCode, SRC.pr],
      notes: [
        `"Four answers make the run inspectable: who acts, what counts as done, when the run stops, and who may merge."`,
        `Read across each row. Planner is read-only; implementer edits source; test-writer edits tests; test-reviewer returns a verdict. The frontend Jest suite and reviewer acceptance define done. CLI limits and the hook counter bound the run. A person reviewing the draft owns merge authority.`,
        `Point to the enforcement column: agent tool lists and instructions, Stop hook and reviewer, CLI flags, and a deny-push rule with draft PR handoff.`,
        `→ The plan gives those roles a shared starting artifact.`
      ],
      know: [`The orchestrator's prompt repeats the contract in its first message and final summary.`, `The implementer's denied push applies during implementation; the integration phase opens the draft pull request. The person retains merge, ready-for-review, and issue-closure authority.`] },
    'plan-with-risks': { seconds: 100, sources: [SRC.issue4, SRC.issue5],
      notes: [
        `"A read-only planner names the goal, files, tests, risks, and done-when before an implementer edits."`,
        `Point to the #5 risk: Episodes.test.js rendered without a router, so adding navigation could break it. The #4 plan noted Characters.jsx is a class component, so navigation needed Link wrappers rather than hooks.`,
        `The orchestrator posted both plans as issue comments. The risk later gives us an observable prediction to check against the suite.`,
        `→ The plans also help the orchestrator decide whether the issues can run in parallel.`
      ],
      know: [`The fixed plan shape includes goal, files to change, files to create, risks before code, tests to add, and a done-when condition.`, `The planner reads the issue and the touched code and writes no files. The issues are the review location for the plans.`] },
    'split-test': { seconds: 90, sources: [SRC.issue4, SRC.issue5, SRC.parallel],
      notes: [
        `"Split two issues when their file sets are independent apart from seams with named owners."`,
        `FanHub's plans had separate page work and could each pass the suite alone. Both touched App.js routes, App.test.js route tests, and node/README.md documentation; integration owned those seams.`,
        `The planner kept the pages self-contained: related entities remained noninteractive. That removed a dependency between the two workstreams.`,
        `"When both plans edit the same component, or one needs the other's output, keep them together."`,
        `→ Each stream now needs a bounded agent crew.`
      ],
      know: [`The split is worthwhile only when independent validation and integration cost support the parallel work.`, `App.js merged automatically; App.test.js had the expected add/add conflict; the README kept both feature sections.`] },
    'part-2': { seconds: 20, sources: [SRC.orchestrator],
      notes: [`"The orchestrator holds sequence while role agents own edits, tests, and review."`, `This section stays compact: each mechanism enforces a contract field.`, `→ Start at the orchestrator's own agent file.`],
      know: [`The crew has one orchestrator plus four role agents: planner, implementer, test-writer, and test-reviewer.`] },
    'orchestrator-file': { seconds: 100, sources: [SRC.orchestrator, SRC.agents, SRC.hooks],
      notes: [
        `"The orchestrator can coordinate every step without holding an edit tool."`,
        `Read the configuration: agents is an allow-list of planner, implementer, test-writer, and test-reviewer. The tools list has agent, read, search, execute, and todo, but no edit. An agent-scoped Stop hook invokes verify-before-stop.mjs.`,
        `Its body defines plan, implement, and integrate modes with numbered steps and at most two rounds before it reports.`,
        `The orchestrator still issues commands and delegates; it does not write source itself.`,
        `→ Each worker receives only the authority needed for its role.`
      ],
      know: [`Planner and implementer set user-invocable false, so they serve the orchestrator rather than appearing in the agent picker.`, `Subagents start without conversation history; the orchestrator must pass the plan, failure output, or review findings in each prompt.`] },
    'role-boundaries': { seconds: 90, sources: [SRC.orchestrator, SRC.issue5],
      notes: [
        `"Four narrow roles made the #5 failure routable instead of ambiguous."`,
        `The planner reads and searches. The implementer changes source, but not tests. The test-writer edits test files. The test-reviewer reads the whole result and returns request-changes or accept with findings.`,
        `In #5, the implementer reported eight failures and left the test repair to test-writer. The orchestrator passed the failure to the agent that owned test changes.`,
        `"A subagent starts fresh, so the orchestrator hands it exactly the context it needs."`,
        `→ Separate worktrees isolate the two implementation streams.`
      ],
      know: [`The test-writer agent was reused from the Custom Agents talk. The reviewer was read-only.`, `Role boundaries are enforced by the tools list and agent instructions; a reviewer still judges product intent, not just test status.`] },
    'worktree-command': { seconds: 100, sources: [SRC.sessions, SRC.autopilot, SRC.cli],
      notes: [
        `"A worktree gives each issue its own checkout and branch, so parallel sessions do not edit each other's files."`,
        `Read the #4 command flags: autopilot continuation cap 15, AI-credit cap 150, allow tools for the compound shell workflow, and explicitly deny git push while implementing.`,
        `The session shares a transcript and writes logs to a dedicated directory. The #5 session used a separate episode-detail worktree in parallel.`,
        `Deny rules take precedence over allow rules. The feature commits stayed local until integration.`,
        `→ The first setup attempt exposed three practical gotchas.`
      ],
      know: [`Copilot CLI --worktree creates a sibling worktree on a new branch. A fresh worktree has no node_modules; FanHub's sessionStart hook links dependencies from the main checkout.`, `Observed #4 result: commit bee5680, 56/56 tests, reviewer accepted after one revision round, 104.12 credits.`, `Observed #5 result: commit 24b6a6c, final 47/47 tests, reviewer accepted after revisions, 102.55 credits.`] },
    'setup-gotchas': { seconds: 90, sources: [SRC.cli, SRC.hooks, SRC.orchestrator],
      notes: [
        `"Three small setup details became quick fixes once the run logged what happened."`,
        `First, shell(gh:*) did not cover a compound PowerShell command that created a folder, wrote a file, and posted an issue comment. Autopilot made no progress and stopped at 38.67 of 40 credits; the working setup allowed tools and explicitly denied git push.`,
        `Second, fresh worktrees started without node_modules. The sessionStart hook linked the main checkout's frontend dependencies, and both worktrees ran Jest on arrival.`,
        `Third, the agent-scoped Stop hook supplied snake_case keys such as session_id and stop_reason. The first script expected sessionId; logging raw keys exposed the mismatch.`,
        `→ Now follow the predicted risk through the evidence.`
      ],
      know: [`The complete logged hook keys included hook_event_name, session_id, timestamp, cwd, transcript_path, stop_reason, and stop_hook_active.`, `The plan session spent 47.15 credits, while the separate failed permission attempt stopped at 38.67 of its 40-credit limit. These are distinct runs.`] },
    'part-3': { seconds: 20, sources: [SRC.hookCode, SRC.issue5],
      notes: [`"The plan's predicted risk becomes the test failure that steers the run."`, `Distinguish the real FanHub run from the deliberately staged backstop example.`, `→ The predicted router issue is the proof point.`],
      know: [`The real 11-allow/0-block record and the staged block-then-allow demonstration are separate evidence sets.`] },
    'predicted-failure': { seconds: 120, sources: [SRC.issue5],
      notes: [
        `"The planner predicted missing router context; the #5 test run exposed exactly that failure."`,
        `The implementer added navigation with useNavigate(). The existing Episodes test rendered the page outside a Router, and the suite returned eight failures out of eight with the context error.`,
        `The implementer reported the failure rather than editing tests. The orchestrator routed the output to test-writer, who added router context to the render helper and added EpisodeDetail and App route coverage.`,
        `The test reviewer requested revisions and then accepted. The episode-detail commit finished at 47 of 47 tests.`,
        `"The useful signal is the chain: predicted risk, observed failure, correct role, rerun, reviewer verdict."`,
        `→ A Stop hook can back up this behavior when the orchestrator tries to finish too early.`
      ],
      know: [`The eight failing tests were the existing Episodes tests. After the test-writer changes and added coverage, the worktree had 47 passing tests.`, `The test runner's failure is separate from hook decision status: these were application test failures, not hook blocks.`] },
    'stop-hook': { seconds: 120, sources: [SRC.hookCode, SRC.hooks],
      notes: [
        `"When the orchestrator tries to stop, the hook runs the frontend Jest suite."`,
        `Point through the flow: spawn the test command with CI true; status zero returns allow. A failing suite increments a per-session counter and returns block with failure lines and a routing instruction. The CLI supplies that reason to Copilot as its next prompt.`,
        `After three blocked stops, this script writes an escalation note and allows the stop so a person can take over. Its JSONL decision record is gitignored local evidence.`,
        `Agent-scoped Stop hooks also stop forcing after eight consecutive blocks; the FanHub script's own three-block limit is earlier.`,
        `→ In the real run, the hook mostly confirmed work the orchestrator already did.`
      ],
      know: [`FanHub ran CI=true npx react-scripts test --watchAll=false in the frontend directory. The shell invocation collected failure output for the reason field.`, `The three-strike escalation is the local script's policy. Eight consecutive blocks is the documented agent-scoped Stop-hook behavior described in the talk's source notes; these are not the same counter.`] },
    'real-gate-record': { seconds: 80, sources: [SRC.hookCode, SRC.issue4, SRC.issue5, SRC.pr],
      notes: [
        `"The real hook record has eleven allows and no blocks."`,
        `Keep the hook result distinct from what the tests found. The hook allowed after the suite passed; the orchestrator's own steps had already run the suite, routed the #5 failure, and asked for the merged contrast correction.`,
        `The hook is a backstop for a session that skips the suite, not a replacement for the orchestrator's verification steps.`,
        `→ A staged run lets us see that backstop block.`
      ],
      know: [`Across plan, implementation #4, implementation #5, and integration, the hook logged 11 allow and 0 block decisions. The table separately records #5's eight failures and the integration reviewer finding.`, `The hook itself did not catch those failures because the orchestrator addressed them before the attempted stops.`] },
    'staged-backstop': { seconds: 100, sources: [SRC.hookCode],
      notes: [
        `"This next record is staged on purpose; it demonstrates the path absent from the real run log."`,
        `A planted commit changed the episode filter label from Season to Series. The prompt told the orchestrator to skip tests and finish. The hook recorded block with seven failed, one passed, eight total, and returned the assertions.`,
        `The orchestrator routed the assertions to test-writer. The test-writer updated the expectations, and the next hook record allowed after eight of eight passed.`,
        `The staged session committed locally as 33163d2 and used 26.89 credits.`,
        `→ A green gate still cannot decide whether Series was the intended change.`
      ],
      know: [`The first subagent call in this staged session failed with a tool schema error and the session ended. A resumed session with "continue" picked up the repair.`, `The staged JSONL fields included branch, decision, blocksSoFar, tests, and seconds.`, `The two records are staged evidence, not part of the real 11-allow/0-block run.`] },
    'agreement-and-intent': { seconds: 90, sources: [SRC.hookCode, SRC.hooks],
      notes: [
        `"The test proves that code and tests agree; it cannot tell us whether the behavior matches product intent."`,
        `In the staged run, the agent treated the Series rename as wanted and changed expectations. Eight passing tests verified agreement with that change.`,
        `The reviewer decides whether the rename was requested and whether the change is acceptable. The reviewer owns the merge decision.`,
        `Keep the observables separate: the test-runner result says eight of eight; the hook decision says allow; a person judges the meaning.`,
        `→ Budgets decide when the session hands control to that person.`
      ],
      know: [`The gate ran in about five seconds in this case. A test suite can confirm its encoded assertions without proving the assertions represent the requested behavior.`, `The hook log recorded decision, strike count, and a Tests line per session.`] },
    budgets: { seconds: 110, sources: [SRC.autopilot, SRC.cli, SRC.issue4, SRC.pr],
      notes: [
        `"A session budget gives the person a defined moment to review the reason and decide whether to resume."`,
        `The integration run stopped at 113.4 of its 120-credit cap while trying to commit a gitignored integration record. The person read the summary, clarified that the integration record belongs in the pull-request body, and resumed with a 140-credit cap.`,
        `The implementation sessions set a 15-turn autopilot cap; neither used it. The plan session stopped for no progress when its publishing command exceeded the shell permission. The hook counter separately escalates after three blocked stops.`,
        `The team lead owns the budget and escalation policy; Copilot does not enlarge the cap by itself.`,
        `→ Integration then tests the whole produced by both streams.`
      ],
      know: [`--max-ai-credits applies to a whole session and its subagents; the CLI warns at 50, 75, and 90 percent. The documented minimum is 30.`, `Autopilot's no-progress stop followed repeated turns without successful tool calls.`, `After a human clarified the pull-request body as the integration record, the run resumed with --resume and a 140-credit limit.`] },
    'part-4': { seconds: 20, sources: [SRC.pr],
      notes: [`"Two green branches can still produce a defect when their shared styles and routes meet."`, `Integration reviews the whole, records the evidence, and hands the draft to a person.`, `→ The merged reviewer found the key post-merge issue.`],
      know: [`Integration reviews a combined diff after each workstream has passed independently; its evidence and open risks go to the human reviewer.`] },
    'reviewer-catch': { seconds: 120, sources: [SRC.pr],
      notes: [
        `"The reviewer found unreadable headings only after the two green workstreams merged."`,
        `Each branch passed alone: 56 of 56 and 47 of 47. On the integrated diff against main, global white heading rules met the new white detail panels.`,
        `The orchestrator routed the source correction to implementer, which added local heading colors in CharacterDetail.jsx. It routed a regression check to test-writer.`,
        `The regression used the real stylesheet and checked a 4.5-to-1 contrast threshold for all five headings. The shared suite moved from 95 to 96 tests, all passing.`,
        `"A merged-whole review found evidence neither isolated workstream could produce."`,
        `→ The integration record makes that correction and the remaining risks visible.`
      ],
      know: [`The defect was white headings on new white panels due to global styles. The contrast regression raised the suite from 95 to 96.`, `Integration commit 036a070 was pushed on the feature branch before draft PR #217 opened.`] },
    'integration-record': { seconds: 100, sources: [SRC.pr, SRC.issue4, SRC.issue5],
      notes: [
        `"The integration record tells the reviewer what merged, what passed, what changed during review, and what remains uncertain."`,
        `Name the seams: App.js took both routes; App.test.js resolved the expected add/add conflict and retained six character and five episode route tests; the README kept both feature sections.`,
        `The record counts 56 and 47 before integration, 95 after merging, and 96 after the contrast regression. Shared tests count once.`,
        `It records no conflicts outside the named seams, the contrast correction, pre-existing strict-CI lint warnings, and unverified live-backend and deep-link refresh behavior.`,
        `→ The record became the body of the draft the reviewer received.`
      ],
      know: [`The integration process used --no-ff merges, resolved conflicts only in named seams, ran the full suite, and asked the reviewer to inspect the whole diff against main.`, `The PR body contained Fixes #4 and Fixes #5. The open risks remained explicitly unverified rather than claimed as solved.`] },
    'reviewer-handoff': { seconds: 100, sources: [SRC.pr, SRC.orchestrator],
      notes: [
        `"The reviewer gets plans, test counts, corrections, and open risks in one draft pull request."`,
        `The orchestrator pushed one feature branch and opened draft #217. It stopped before marking the PR ready, merging, or closing issues.`,
        `The reviewer owns the intent behind each change and the merge decision. The team lead owns the budget and escalation policy for the next run.`,
        `Repository protections apply to this draft like any other pull request.`,
        `→ The same loop can support recurring local passes, with a different state boundary.`
      ],
      know: [`Evidence sources include issue plan comments, local commits, the hook log, session transcripts, suite counts, and the integration record in the PR body.`, `Human approval is not delegated by the orchestrator; the local loop prepares a reviewable draft.`] },
    'scheduled-loop': { seconds: 95, sources: [SRC.cli, SRC.starter],
      notes: [
        `"A local recurring pass can handle work such as a nightly dependency check while the CLI session stays open."`,
        `Copilot CLI /every 1h schedules repeated passes, /after schedules one run, and bare /every opens the schedule manager. The command is experimental and session-scoped.`,
        `Each pass starts with fresh context, so store status, attempt count, and history in a state file the next pass reads first. If the state says a prior pass is still running beyond its limit, escalate to a person and leave that worktree alone.`,
        `The credit cap applies per pass. Whether /every accepts /goal with --max-ai-credits is untested; watch one capped pass by hand before leaving a schedule active.`,
        `The loop-starter example provides agent files, state, and a stale-run rule. It is an example, not a measured FanHub production run.`,
        `→ Trigger and human presence help decide whether local scheduling fits.`
      ],
      know: [`The loop-starter example is for a security-advisory response and uses placeholder package names, advisory IDs, PR numbers, and timings.`, `A recurring session does not persist after the CLI session closes. State belongs in the worktree, not only in chat history.`, `The compatibility of /every with a capped /goal remains untested and is shown as a boundary.`] },
    'fit-boundary': { seconds: 90, sources: [SRC.cli, SRC.issue4],
      notes: [
        `"Keep local orchestration for developer-led work where local context and a fast meaningful check matter."`,
        `When a label, schedule, or failed check starts work without a developer present, GitHub Agentic Workflows is the relevant pattern. When a developer wants to assign work and walk away, Copilot on GitHub runs in a hosted Actions environment and opens a pull request.`,
        `Small single-file changes may cost more in planning and review than they save; FanHub's plan session alone used 47 credits. Slow verification also changes the economics of each blocked stop; this suite ran in about five seconds.`,
        `→ Transfer the contract to a real issue and decide whether the local boundary still fits.`
      ],
      know: [`These are fit boundaries, not claims that one surface is universally better.`, `The event-driven work and cloud-agent destinations are described in the related talks: GitHub Agentic Workflows and Copilot on GitHub.`] },
    'own-work-contract': { seconds: 95, sources: [SRC.orchestrator, SRC.hookCode],
      notes: [
        `"Pick one issue you would hand to an agent and write four answers before you start."`,
        `Name who plans, edits source, edits tests, and judges. Choose the fastest meaningful command that defines done. Set the credit or turn budget and the escalation point. Name the person who reads the draft and decides what merges.`,
        `Then inspect one run's artifacts: plan, diff, test output, hook record, and reviewer findings. If the evidence fails, route the failure to its owner or pause for a person.`,
        `"Which command would your Stop hook run, how many credits is this issue worth, and who reads the draft before merge?"`,
        `→ The before-and-after makes the practical shift visible.`
      ],
      know: [`The contract adapts to a repository: commands, role names, budget, reviewer, and escalation must match its actual workflow.`, `Related talks go deeper on Custom Agents, Copilot CLI, Copilot Hooks, GitHub Agentic Workflows, and Copilot on GitHub.`] },
    'before-after': { seconds: 60, sources: [SRC.issue5, SRC.hookCode, SRC.pr],
      notes: [
        `"The shift is what the developer writes before the run and what the reviewer receives after it."`,
        `Read each pair: sequence and role boundaries replace one broad assignment; a test command and reviewer define done; explicit caps bound spend; the draft arrives with evidence and risks.`,
        `The three metrics are FanHub evidence: eight failures routed to 47 passing tests, 11 real allows and zero blocks, and 95 to 96 tests after a merged-review regression. The staged block demonstration is separate.`,
        `→ The audience can start with one issue today.`
      ],
      know: [`The center metric is hook status for real runs only; the staged run is described separately and must not be added to the 11/0 count.`] },
    today: { seconds: 70, sources: [SRC.orchestrator, SRC.hookCode, SRC.pr],
      notes: [
        `"Today, write the four contract answers for one real issue and choose its done command, budget, and reviewer."`,
        `This week, define an orchestrator allow-list, a read-only risk-first planner, and a Stop hook that logs decisions and escalates after a bounded number of blocks.`,
        `This month, run separate worktrees with session budgets, inspect the transcripts and hook log, then put the integration record in the review draft. Agree the next-run budget and escalation policy with the team lead.`,
        `The reviewer still decides intent and merge.`,
        `→ The links on the next slide open the source documentation and FanHub artifacts.`
      ],
      know: [`These steps are transfer actions, not outcomes reported as already achieved by every audience member.`] },
    references: { seconds: 25, sources: [SRC.orchestrator, SRC.hookCode, SRC.pr],
      notes: [`"These first-party references let you inspect the configuration, hook behavior, and integrated run."`, `Point to the agent and hook implementation, then to the issue plans and draft pull request.`],
      know: [`The README frontmatter references are all represented here, along with FanHub issue #5 for the router risk.`] },
    thanks: { seconds: 20, sources: [SRC.pr],
      notes: [`"A useful local loop gives agents bounded work and gives people evidence and authority."`, `Leave the final question visible: which issue will you write a contract for next?`, `→ Thank the audience and take questions.`],
      know: [`The memorable proof is the predicted risk becoming eight failures, a routed test-writer repair, and 47 passing tests, followed by human review of the integrated draft.`] }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'local-agentic-sdlc',
      title: 'Local Agentic SDLC: A Loop with a Contract',
      short: 'Local agent orchestration from issue to reviewable pull request',
      category: 'tech-talks',
      source: 'tech-talks/local-agentic-sdlc/README.md',
      question: 'How do I hand an issue to local agents and know when the work is ready for my review?',
      thesis: 'Write down roles, evidence, budget, and human authority before the first run; the contract makes the run inspectable.'
    },
    slides,
    data: {}
  };
})();
