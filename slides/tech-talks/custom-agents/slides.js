/*
  Custom Agents — slide data and presenter notes.
  The notes carry the full talk track, boundaries, and evidence for the handout.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    config: { label: 'Custom agents configuration reference', href: 'https://docs.github.com/en/copilot/reference/custom-agents-configuration' },
    custom: { label: 'About custom agents', href: 'https://docs.github.com/en/copilot/concepts/customizations/custom-agents' },
    comparing: { label: 'Comparing Copilot customizations', href: 'https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations' },
    cli: { label: 'Create custom agents for Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli' },
    cloud: { label: 'Create custom agents for Copilot cloud agent', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents' },
    cloudEnv: { label: 'Customize the cloud agent environment', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment' },
    vscode: { label: 'VS Code custom agents', href: 'https://code.visualstudio.com/docs/agent-customization/custom-agents' },
    vscodeFile: { label: 'VS Code custom agent file reference', href: 'https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference' },
    vscodeDebug: { label: 'VS Code Chat Debug view and Agent Debug Log', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view' },
    agentFile: { label: 'FanHub test-writer.agent.md', href: 'https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md' },
    pr216: { label: 'FanHub pull request #216: VS Code', href: 'https://github.com/MSBart2/FanHub/pull/216' },
    pr215: { label: 'FanHub pull request #215: Copilot CLI', href: 'https://github.com/MSBart2/FanHub/pull/215' },
    pr214: { label: 'FanHub pull request #214: cloud agent', href: 'https://github.com/MSBart2/FanHub/pull/214' },
    mainCommit: { label: 'FanHub commit df50ea1: publish test-writer to main', href: 'https://github.com/MSBart2/FanHub/commit/df50ea1' },
    setupCommit: { label: 'FanHub commit e1675df: cloud setup steps', href: 'https://github.com/MSBart2/FanHub/commit/e1675df' },
    fixCommit: { label: 'FanHub commit bf7e2c3: narrow the Joey assertion', href: 'https://github.com/MSBart2/FanHub/commit/bf7e2c3' }
  };

  const slides = [
    S('title', 0, 'Custom Agents', {
      chrome: false, visual: 'runtime-ring', subtitle: 'One File, Every Runtime',
      tagline: 'Design the portable core. Read the resolved run. Place each requirement where it lives.',
      meta: 'Foundations · Practitioner Tech Talk · 45 min',
      runtimes: ['VS Code', 'Copilot CLI', 'Copilot cloud agent']
    }),
    S('core-question', 0, 'How do I make one shared agent behave as intended across the runtimes my team uses?', {
      pill: 'Core Question', highlight: 'Write the portable core. Inspect each resolved run.',
      subtitle: 'One file carries a shared role; each runtime resolves fields, tools, model, and environment in its own context.',
      routingLabel: 'Design for', routing: ['role', 'boundary', 'evidence', 'owner'],
      roles: [
        { icon: '🧑‍💻', title: 'Agent producer', description: 'Writes the role and tool boundary the team shares.' },
        { icon: '⌨️', title: 'Developer', description: 'Starts local runs and owns launch choices.' },
        { icon: '🧭', title: 'Maintainer and reviewer', description: 'Prepare environments and accept evidence.' }
      ],
      stats: [
        { title: '1 shared profile', description: 'The same FanHub test-writer file.' },
        { title: '3 dated runs', description: 'Each runtime leaves different evidence.' },
        { title: 'One repair loop', description: 'Load, compare, place, rerun.' }
      ]
    }),
    S('contents', 0, 'Four Moves From Profile to Proof', {
      sections: [
        { icon: '🧩', title: 'Design the Portable Core', subtitle: 'Choose and encode the role', blurb: 'Place shared behavior, scope, and launch controls.', slide: 5 },
        { icon: '🔬', title: 'Run One File in Three Runtimes', subtitle: 'Read what resolved', blurb: 'Separate documented support from dated observations.', slide: 11 },
        { icon: '📋', title: 'Prove and Place', subtitle: 'Find the owning layer', blurb: 'Gather runtime evidence and assign the repair.', slide: 18 },
        { icon: '🎯', title: 'Take It to Your Agents', subtitle: 'Transfer the proof loop', blurb: 'Predict, inspect, place, and rerun your own agent.', slide: 24 }
      ]
    }),
    S('cold-open', 0, 'One Agent File Entered Three Runtimes and Produced Three Stories', {
      scene: 'outcomes', pill: 'Cold Open · FanHub · 2026-10-21',
      subtitle: 'Same .github/agents/test-writer.agent.md · tests for one small component each',
      cards: [
        { title: 'VS Code · #216', lines: ['Declared Claude Sonnet 5.5', 'Requests ran gpt-6.1-sol', 'Cause unresolved', 'Evidence: request log'], z: 'local' },
        { title: 'Copilot CLI · #215', lines: ['Logged claude-sonnet-5.5', 'Resolved from the profile', '10 tests passed', 'Evidence: debug log'], z: 'remote' },
        { title: 'Cloud agent · #214', lines: ['Invoked test-writer', 'Jest stopped: missing react', 'Setup recovery came later', 'Evidence: PR and session log'], z: 'github' }
      ],
      footnote: 'Which agent did the team ship? The artifacts answer that better than the filename.'
    }),
    S('part-1', 1, 'Design the Portable Core', {
      scene: 'opener', subtitle: 'Choose the role, encode its portable method, then publish it where the team expects it.',
      cards: [
        { icon: '🧭', title: 'Choose', blurb: 'A different who earns a file' },
        { icon: '📝', title: 'Encode', blurb: 'Description selects; body teaches' },
        { icon: '📍', title: 'Publish', blurb: 'Find the winning definition' }
      ],
      terminal: { context: '.github/agents/test-writer.agent.md · committed to main', detail: 'Portable behavior in the body; runtime-specific fields by intent' }
    }),
    S('primitive-choice', 1, 'A Custom Agent Earns Its File When Work Needs a Different Who', {
      scene: 'scorecard', pill: 'Design · Choose the Primitive',
      cards: [
        { icon: '📜', title: 'Instructions', description: 'Shared conventions every agent follows: copilot-instructions.md, *.instructions.md, AGENTS.md.' },
        { icon: '🎯', title: 'Prompt file', description: 'One repeatable task a person starts by name: *.prompt.md.' },
        { icon: '🧠', title: 'Skill', description: 'A method with scripts and resources any agent can load on demand.' },
        { icon: '🤖', title: 'Custom agent', description: 'A persistent role with identity, tool boundary, method, and model preference.' }
      ]
    }),
    S('agent-anatomy', 1, 'Description Selects, Tools Bound, Body Teaches', {
      scene: 'anatomy', pill: 'Design · test-writer.agent.md',
      codeLines: [
        'name: test-writer',
        'description: Writes focused Jest tests for one component.',
        '  Reports production behavior that looks wrong.',
        '  Edits test files only.',
        'tools: [read, search, edit, execute, todo, web]',
        'model: Claude Sonnet 5.5 (copilot)',
        'handoffs: Review these tests → test-reviewer',
        '---',
        '# Method, scope, and final summary live here'
      ],
      features: [
        { title: 'Description', detail: 'Selection rule: task plus boundary. It is the only required field.' },
        { title: 'Tool aliases', detail: 'Each runtime maps aliases to its own tools; counts can differ.' },
        { title: 'Body', detail: 'Every runtime reads the method and output contract, up to 30,000 characters.' }
      ]
    }),
    S('output-contract', 1, 'A Five-Line Body Contract Makes Each Run Inspectable', {
      scene: 'terminal', pill: 'Design · Output Contract', termTitle: 'test-writer final summary · shape',
      transcript: [
        { type: 'response', lines: [
          'Agent: test-writer',
          'Tests added: <test file and behaviors>',
          'Command and result: <command> → <runner counts>',
          'Suspected bugs: <production behavior for a person>',
          'Files changed: <test files only>'
        ] },
        { type: 'divider' },
        { type: 'outcome', text: 'Cloud summary reported: could not run tests because react was missing' }
      ],
      footnote: 'The report states what the agent did; a reviewer checks the command evidence separately.'
    }),
    S('publish-scope', 1, 'Find the Winning File Before Debugging the Prompt', {
      scene: 'table', pill: 'Design · Publishing Scope',
      subtitle: 'The filename is the agent ID; a more-local definition wins when scopes share that ID.',
      columns: [
        { label: 'Scope', width: 220, z: 'accent' },
        { label: 'Location', width: 490, z: 'local' },
        { label: 'Who gets it', width: 630, z: 'green' }
      ],
      rows: [
        { cells: ['Repository', '.github/agents/*.agent.md', 'Everyone working in that repository'] },
        { cells: ['Personal · CLI', '~/.copilot/agents/', 'One developer across repositories'] },
        { cells: ['Personal · VS Code', 'VS Code profile storage', 'One developer in that VS Code profile'] },
        { cells: ['Organization / enterprise', 'agents/ in the org .github or .github-private repository', 'Repositories in that organization or enterprise'] }
      ],
      footnote: 'Precedence: personal → repository → organization → enterprise. Cloud discovery reads the default branch.'
    }),
    S('launch-controls', 1, 'Launch Controls Choose Availability; They Do Not Approve Changes', {
      scene: 'controls', pill: 'Design · Selection Is Not Authority',
      subtitle: 'Treat profile selection and execution authorization as separate decisions.',
      rows: [
        { label: 'target', description: 'Limits the agent to VS Code or GitHub Copilot runtimes.', tag: 'runtime scope', z: 'local' },
        { label: 'user-invocable: false', description: 'Hides the picker entry while keeping it available as a subagent.', tag: 'picker control', z: 'purple' },
        { label: 'disable-model-invocation: true', description: 'Prevents automatic model selection; a person or orchestrator names it.', tag: 'selection control', z: 'orange' }
      ],
      footnote: 'Tools, hooks, permissions, rulesets, and human review establish separate execution and approval boundaries.'
    }),
    S('part-2', 2, 'Run One File in Three Runtimes', {
      scene: 'opener', subtitle: 'Read documented support first, then inspect each runtime’s dated artifacts.',
      cards: [
        { icon: '📄', title: 'Documented', blurb: 'What the reference supports' },
        { icon: '🔬', title: 'Observed', blurb: 'What the run actually resolved' },
        { icon: '🧾', title: 'Evidence', blurb: 'Where the artifact lives' }
      ],
      terminal: { context: 'FanHub runs · 2026-10-21', detail: 'Documented support is not the same claim as observed resolution' }
    }),
    S('documented-support', 2, 'Runtimes Quietly Skip Unsupported Fields by Design', {
      scene: 'table', pill: 'Documented Support · 2026-10-21',
      subtitle: 'The configuration reference describes supported fields; this is not a report of what FanHub observed.',
      columns: [
        { label: 'Field group', width: 330, z: 'accent' },
        { label: 'VS Code', width: 360, z: 'local' },
        { label: 'Copilot CLI', width: 360, z: 'remote' },
        { label: 'Cloud agent', width: 290, z: 'github' }
      ],
      rows: [
        { cells: ['Shared identity and controls', 'name, description, tools, target, user-invocable, disable-model-invocation', 'Same shared fields', 'Same shared fields'] },
        { cells: ['model', 'Supported', 'Supported', 'Documented for IDE use'] },
        { cells: ['handoffs, agents, argument-hint', 'Supported in Local session', 'Not listed', 'Not listed'] },
        { cells: ['Agent-scoped hooks', 'Supported', 'Supported', 'Not listed'] },
        { cells: ['reasoning-effort / include-custom-instructions', 'reasoning-effort', 'include-custom-instructions for subagents', 'Not listed'] },
        { cells: ['mcp-servers, metadata', 'Not listed', 'Not listed', 'Supported'] },
        { cells: ['web and todo aliases', 'Supported', 'Supported', 'Not applicable'] }
      ],
      footnote: 'As documented on 2026-10-21. Unsupported fields and tool names are ignored quietly.'
    }),
    S('observed-resolution', 2, 'FanHub Artifacts Show One Profile Resolving Three Ways', {
      scene: 'table', pill: 'Observed Resolution · FanHub · 2026-10-21',
      subtitle: 'Tool totals describe each runtime’s expansion of the same six aliases; they do not rank capability.',
      columns: [
        { label: 'Observed item', width: 205, z: 'accent' },
        { label: 'VS Code · #216', width: 390, z: 'local' },
        { label: 'Copilot CLI · #215', width: 390, z: 'remote' },
        { label: 'Cloud agent · #214', width: 355, z: 'github' }
      ],
      rows: [
        { cells: ['Agent', 'test-writer selected in a Local session', 'test-writer selected with --agent', 'PR says “Custom agent used: test-writer”'] },
        { cells: ['Model', 'Requests ran gpt-6.1-sol; cause unresolved', 'claude-sonnet-5.5; decision logged', 'Unobserved; session log names no model'] },
        { cells: ['Tools', '6 aliases expanded to 23 VS Code tools', '6 aliases expanded to 14 CLI tools', 'Ran as subagent; count unobserved'] },
        { cells: ['Fields', 'Local hint and handoff worked', 'Handoffs and hint not logged', 'Handoffs and hint not logged'] },
        { cells: ['Checks', '14 passed', '10 passed', 'First run stopped; later cloud rerun 6 passed'] },
        { cells: ['Evidence', 'Chat Debug request log', '--log-level debug log', 'PR description and session log'] }
      ],
      footnote: 'Unobserved means the available artifacts leave the cell open; it does not mean the feature failed.'
    }),
    S('vscode-run', 2, 'VS Code Honored Local-Session Fields; Requests Ran Another Model', {
      scene: 'paired', pill: 'Observed Resolution · VS Code · #216',
      subtitle: 'The FanHub request log exposed a declared-versus-executed model discrepancy; its cause remains unresolved.',
      left: {
        title: 'Observed behavior · Local session', z: 'green',
        items: [
          { title: 'argument-hint', detail: 'Shown after the session type was Local; absent in the first attempt.' },
          { title: 'Handoff', detail: 'Review these tests opened test-reviewer with a prefilled prompt.' },
          { title: 'Tools and checks', detail: 'Writer: 23 tools. Read-only reviewer: 10. Runner: 14 passed; reviewer accepted.' }
        ]
      },
      right: {
        title: 'Model discrepancy · cause unresolved', z: 'orange',
        items: [
          { title: 'Declared', detail: 'Claude Sonnet 5.5 (copilot) in the agent profile.' },
          { title: 'Executed', detail: 'gpt-6.1-sol on every request in the request log.' },
          { title: 'Interpretation', detail: 'The evidence does not explain why. Read the run when model choice matters.' }
        ]
      },
      footnote: 'Observed in the #216 artifacts, 2026-10-21. Do not infer the cause from the model names.'
    }),
    S('cli-run', 2, 'Copilot CLI Logged Its Model Resolution and Ten Passing Tests', {
      scene: 'terminal', pill: 'Observed Resolution · Copilot CLI 1.0.100 · #215', termTitle: 'Copilot CLI debug log',
      transcript: [
        { type: 'prompt', text: 'copilot --agent test-writer --log-level debug' },
        { type: 'response', lines: [
          'Using model "claude-sonnet-5.5"',
          'from custom agent "test-writer"',
          '(resolved from "Claude Sonnet 5.5 (copilot)")'
        ] },
        { type: 'divider' },
        { type: 'outcome', text: '6 aliases → 14 CLI tools · runner: 10 passed · test file only' }
      ],
      footnote: 'The log has no entry for handoffs or argument-hint. 8.65 AI Credits over 2 min 14 sec were reported.'
    }),
    S('cloud-first-run', 2, 'Cloud Agent Invoked test-writer; Jest Stopped at Missing react', {
      scene: 'paired', pill: 'Execution-Environment Dependency · Cloud · #214',
      subtitle: 'The agent ran in a fresh clone without frontend dependencies; the local runner result is a separate claim.',
      left: {
        title: 'Cloud invocation and runner', z: 'github',
        items: [
          { title: 'Agent identity', detail: 'PR: “Custom agent used: test-writer”; log: Begin subagent: test-writer.' },
          { title: 'Observed action', detail: 'The agent wrote six tests and ran its Jest command.' },
          { title: 'Runner status', detail: "Jest stopped at Cannot find module 'react'." }
        ]
      },
      right: {
        title: 'Environment and local check', z: 'orange',
        items: [
          { title: 'Cloud environment', detail: 'Fresh clone; no setup steps installed frontend dependencies.' },
          { title: 'Recovery attempt', detail: 'The agent’s npm ci could not reach its package proxy.' },
          { title: 'Local runner', detail: '5 passed, 1 failed; one broad Joey assertion included the quote context line.' }
        ]
      },
      footnote: 'The agent creating tests and the tests being valid are different claims with different evidence.'
    }),
    S('cloud-recovery', 2, 'Setup Steps Outside the Profile Enabled a Cloud Run With 6 Tests Passing', {
      scene: 'terminal', pill: 'Observed Recovery · FanHub · #214', termTitle: 'Recovery evidence, not a simulated command transcript',
      transcript: [
        { type: 'response', lines: [
          '.github/workflows/copilot-setup-steps.yml installs frontend dependencies · e1675df',
          '@copilot follow-up asks for a narrower Joey test and exact counts',
          'Cloud follow-up starts test-writer; Jest now runs',
          'Runner: 1 suite passed · 6 tests passed',
          'Fix bf7e2c3 asserts on the .attribution element',
          'Local rerun matched 6 of 6; counts live in the reply comment'
        ] },
        { type: 'divider' },
        { type: 'outcome', text: 'An agent profile describes a role; the runtime supplies the environment.' }
      ],
      footnote: 'Observed recovery evidence on FanHub. The PR description kept its original text.'
    }),
    S('part-3', 3, 'Prove the Run and Place Each Requirement', {
      scene: 'opener', subtitle: 'Use each runtime’s own evidence, assign every discrepancy, then repeat the same proof.',
      cards: [
        { icon: '📋', title: 'Report', blurb: 'Five questions per runtime' },
        { icon: '🧭', title: 'Place', blurb: 'Layer and named owner' },
        { icon: '🔁', title: 'Rerun', blurb: 'Keep the proof comparable' }
      ],
      terminal: { context: 'Load → compare → place → rerun', detail: 'The report records what happened, not what the profile intended' }
    }),
    S('vscode-load-report', 3, 'VS Code’s Debug Views Answer Five Load-Report Questions', {
      scene: 'table', pill: 'Load Report · VS Code',
      subtitle: 'Open the per-request view for the model and tool evidence; use the Agent Debug Log for loading chronology.',
      columns: [
        { label: 'Question', width: 360, z: 'accent' },
        { label: 'Evidence to inspect', width: 1080, z: 'local' }
      ],
      rows: [
        { cells: ['Which agent loaded?', 'Agent picker; Agent Debug Log “Load Agents” event.'] },
        { cells: ['Which model ran?', 'Chat Debug view or prompt export, per request.'] },
        { cells: ['Which tools resolved?', 'Tool definitions sent with each request.'] },
        { cells: ['Did checks run?', 'Terminal output in the chat.'] },
        { cells: ['What did it report?', 'The agent’s final summary.'] }
      ],
      footnote: 'Developer: Show Chat Debug View exposes the request context; the Agent Debug Log is a preview.'
    }),
    S('cli-load-report', 3, 'CLI Debug Logs and Transcripts Expose the Run’s Inputs and Results', {
      scene: 'table', pill: 'Load Report · Copilot CLI',
      subtitle: 'Start with debug logging, then keep the transcript when the team needs a reviewable record.',
      columns: [
        { label: 'Question', width: 360, z: 'accent' },
        { label: 'Evidence to inspect', width: 1080, z: 'remote' }
      ],
      rows: [
        { cells: ['Which agent loaded?', '/agent list; agent_name in the debug log.'] },
        { cells: ['Which model ran?', 'Using model … from custom agent log line.'] },
        { cells: ['Which tools resolved?', 'tool_names in the debug log.'] },
        { cells: ['Did checks run?', 'Session output and exit status.'] },
        { cells: ['What did it report?', 'Final summary; --share keeps a transcript.'] }
      ],
      footnote: 'Run with --log-level debug --log-dir <dir>; use --share <path> to keep a transcript.'
    }),
    S('cloud-load-report', 3, 'The Cloud Session Log and Pull Request Answer Different Questions', {
      scene: 'table', pill: 'Load Report · Copilot Cloud Agent',
      subtitle: 'Compare the session’s execution evidence with the PR description and the agent’s own summary.',
      columns: [
        { label: 'Question', width: 360, z: 'accent' },
        { label: 'Evidence to inspect', width: 1080, z: 'github' }
      ],
      rows: [
        { cells: ['Which agent loaded?', '“Custom agent used” in the pull request description.'] },
        { cells: ['Which model ran?', 'Session log, when it names a model; otherwise mark unobserved.'] },
        { cells: ['Which tools resolved?', 'Tool calls in the session log.'] },
        { cells: ['Did checks run?', 'Session commands and exit codes.'] },
        { cells: ['What did it report?', 'Agent summary in the log, compared with the PR description.'] }
      ],
      footnote: 'gh agent-task view <session> --log prints the session log; the PR description names the agent.'
    }),
    S('repair-map', 3, 'Each Gap Has an Owning Layer and a Named Owner', {
      scene: 'table', pill: 'Load · Compare · Place · Rerun',
      subtitle: 'Change one layer with its owner, then repeat the same evidence check.',
      columns: [
        { label: 'Gap in the report', width: 260, z: 'orange' },
        { label: 'Layer · owner', width: 360, z: 'accent' },
        { label: 'Recovery action', width: 820, z: 'green' }
      ],
      rows: [
        { cells: ['Skipped field', 'Agent body · producer', 'Restate the behavior in the portable body, such as recommending test-reviewer.'] },
        { cells: ['Model differs', 'Launch controls · developer', 'Treat profile model as a preference; pin the launch model when it matters.'] },
        { cells: ['Alias unavailable', 'Body or target · producer', 'Use capabilities common to supported runtimes, or scope with target.'] },
        { cells: ['Dependencies missing', 'Runtime environment · maintainer', 'Prepare cloud setup steps; use a dev container or setup script locally.'] },
        { cells: ['Report lacks proof', 'Output contract · reviewer', 'Keep the contract and accept work on command evidence beside generated prose.'] },
        { cells: ['Variance is disputed', 'Team policy · team lead', 'Agree which runtimes are supported and which differences need escalation.'] }
      ],
      footnote: 'The custom profile shapes what the agent attempts; it does not replace launch policy, environment setup, or review.'
    }),
    S('compose-boundaries', 3, 'Handoffs Put a Person Between Steps; Subagents Delegate Work', {
      scene: 'relay', pill: 'Composition · Bounded Producer and Checker',
      columns: [
        {
          icon: '🤝', title: 'Human-selected handoff',
          description: 'In VS Code Local, a button carries a prompt to the next agent only when the person chooses.',
          items: ['test-writer', 'Person chooses', 'test-reviewer'], z: ['local', 'orange', 'green']
        },
        {
          icon: '🧩', title: 'Agent-to-agent call',
          description: 'A coordinator invokes a named agent; each runtime supplies its own delegation behavior.',
          items: ['Coordinator', 'Named agent call', 'Subagent result'], z: ['purple', 'remote', 'github']
        },
        {
          icon: '🔐', title: 'Authority stays outside',
          description: 'The profile requests a role; surrounding controls govern changes and acceptance.',
          items: ['Profile: attempt', 'Policy: constrain', 'Reviewer: accept'], z: ['local', 'orange', 'green']
        }
      ],
      footnote: 'FanHub test-reviewer had read and search aliases; VS Code exposed 10 read-only tools in the observed run.'
    }),
    S('part-4', 4, 'Take It to Your Agents', {
      scene: 'opener', subtitle: 'Pick a shared agent, predict its first runtime difference, and collect proof from your own work.',
      cards: [
        { icon: '🎯', title: 'Pick', blurb: 'One agent your team shares' },
        { icon: '🔎', title: 'Predict', blurb: 'Which report line changes?' },
        { icon: '🧪', title: 'Prove', blurb: 'Run, place, and rerun' }
      ],
      terminal: { context: 'Your repository · your agent', detail: 'Carry one prediction into a real run' }
    }),
    S('own-work-check', 4, 'Start With an Agent Your Team Already Shares', {
      scene: 'scorecard', pill: 'Transfer · Own-Work Check',
      cards: [
        { icon: '📌', title: 'Pick', description: 'Choose one shared agent with a real task and a named producer.' },
        { icon: '🔮', title: 'Predict', description: 'Name the load-report line most likely to differ in another runtime.' },
        { icon: '📂', title: 'Collect', description: 'Open the runtime’s own log, check output, and final report.' },
        { icon: '🧭', title: 'Place', description: 'Assign one observed gap to its owning layer and owner.' }
      ]
    }),
    S('rerun-plan', 4, 'Rerun the Same Proof After One Targeted Change', {
      scene: 'four-phases', pill: 'Transfer · Repeatable Proof Loop',
      subtitle: 'Keep the task and evidence questions stable so the team can see what the change repaired.',
      stageLabel: 'Step', gateLabel: 'same task',
      stages: [
        { label: '1', name: 'Load', icon: '📥', description: 'Record identity, model, tools, checks, and report.' },
        { label: '2', name: 'Compare', icon: '🔎', description: 'Find the difference between profile and run.' },
        { label: '3', name: 'Place', icon: '🧭', description: 'Assign the gap to a layer and owner.' },
        { label: '4', name: 'Rerun', icon: '🔁', description: 'Repeat the task and inspect the same evidence.', target: true }
      ],
      footnote: 'When evidence still differs, keep the exception visible and escalate to the owner of the runtime or team policy.'
    }),
    S('before-after', 0, 'From One File Assumed Everywhere to Every Run Read in Context', {
      scene: 'before-after', pill: 'The Shift',
      before: [
        'Assume one file behaves identically in every runtime',
        'Treat the declared model as the model that ran',
        'Put behavior only in runtime-specific fields',
        'Accept a summary without checking command evidence'
      ],
      after: [
        'Write the portable core; add runtime fields on purpose',
        'Read model and tools from each run',
        'Place each gap with its layer owner',
        'Compare runner and domain results; rerun'
      ],
      metrics: [
        { value: '23 · 14', detail: 'Tools from six aliases · VS Code and CLI' },
        { value: 'Open cause', detail: 'VS Code model discrepancy' },
        { value: '6 passed', detail: 'Cloud Jest after setup steps' }
      ]
    }),
    S('today', 0, 'What You Can Do Today', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Check one shared profile against documented fields', 'Find the winning file for its agent ID', 'Open one runtime debug source'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Run it in each supported runtime', 'Fill the five-question load report', 'Place one gap and rerun the same task'] },
        { icon: '🚀', label: 'With the Team', z: 'purple', items: ['Name the producer, maintainer, and reviewer', 'Agree supported runtimes and escalation signals', 'Pair one producer with a read-only checker'] }
      ],
      takeaway: 'A repeatable run report turns runtime differences into owned decisions.'
    }),
    S('references', 0, 'References', {
      scene: 'references',
      groups: [
        { icon: '📖', title: 'Custom Agent Design', z: 'local', items: [
          { href: SRC.config.href, label: SRC.config.label, description: 'Fields, aliases, and quiet skipping.' },
          { href: SRC.custom.href, label: SRC.custom.label, description: 'Custom agent concepts and scopes.' },
          { href: SRC.comparing.href, label: SRC.comparing.label, description: 'When a role earns a custom agent file.' },
          { href: SRC.cli.href, label: SRC.cli.label, description: 'Copilot CLI custom-agent setup.' },
          { href: SRC.cloud.href, label: SRC.cloud.label, description: 'Cloud custom-agent setup.' },
          { href: SRC.vscode.href, label: SRC.vscode.label, description: 'VS Code custom-agent behavior.' },
          { href: SRC.vscodeFile.href, label: SRC.vscodeFile.label, description: 'VS Code file fields.' }
        ] },
        { icon: '🧪', title: 'Runtime Evidence and Cloud Recovery', z: 'purple', items: [
          { href: SRC.cloudEnv.href, label: SRC.cloudEnv.label, description: 'Cloud setup workflow and environment.' },
          { href: SRC.vscodeDebug.href, label: SRC.vscodeDebug.label, description: 'Chat Debug view and Agent Debug Log.' },
          { href: SRC.agentFile.href, label: SRC.agentFile.label, description: 'The observed FanHub agent profile.' },
          { href: SRC.pr216.href, label: SRC.pr216.label, description: 'Local VS Code evidence.' },
          { href: SRC.pr215.href, label: SRC.pr215.label, description: 'Copilot CLI evidence.' },
          { href: SRC.pr214.href, label: SRC.pr214.label, description: 'Cloud agent evidence and recovery.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Custom Agents', {
      scene: 'thanks', chrome: false, visual: 'runtime-ring',
      subtitle: 'One file, every runtime: design the core, read the run, place each requirement.',
      runtimes: ['VS Code', 'Copilot CLI', 'Copilot cloud agent'],
      cards: [
        { value: '6 aliases → 23 · 14', detail: 'Observed runtime-specific tool expansion' },
        { value: 'Cause unresolved', detail: 'VS Code declared and executed models differed' },
        { value: '6 passed', detail: 'Cloud Jest after the external setup workflow' }
      ],
      prompt: 'Which shared agent would behave differently in another runtime, and which report line would show it first?'
    })
  ];

  const NOTES = {
    title: {
      seconds: 30, sources: [SRC.custom, SRC.agentFile],
      notes: [
        `"A team can share one custom-agent profile and still get three different resolved runs. We will follow a real test-writing agent through VS Code, the Copilot CLI, and the cloud agent."`,
        `Point to the single profile in the center and the three runtime nodes. The evidence comes from FanHub runs dated 2026-10-21.`,
        `→ Start with the practitioner's question.`
      ],
      know: [`The example is the FanHub platform engineer's test-writer role for one Node frontend component at a time.`]
    },
    'core-question': {
      seconds: 90, sources: [SRC.config, SRC.agentFile],
      notes: [
        `"The question is how to make one shared agent behave as intended across the runtimes our team uses."`,
        `Name the real actors: the agent producer writes the profile, the developer starts the local run, and the repository maintainer prepares the cloud environment. The reviewer accepts evidence; the team lead sets supported variance.`,
        `The thesis is practical: write role behavior in the portable body, add runtime-specific fields deliberately, and inspect what each run actually resolved.`
      ],
      know: [
        `The observable evidence is the VS Code request log, CLI debug log, and cloud pull request plus session log.`,
        `The profile does not independently authorize edits or approve a pull request. Launch policy, runtime permissions, and human review remain distinct.`
      ]
    },
    contents: {
      seconds: 30, sources: [SRC.config],
      notes: [
        `"We will choose the role, read three runs, build a repeatable proof method, and apply it to an agent you already share."`,
        `The four stops are linked to their opener slides. The runtime evidence carries the most detail; the last section carries the transfer.`
      ],
      know: [`This frame routes the talk; it makes no additional claim about runtime behavior. The four opener numbers are 5, 11, 18, and 24.`]
    },
    'cold-open': {
      seconds: 90, sources: [SRC.pr216, SRC.pr215, SRC.pr214],
      notes: [
        `"Here are three dated fragments from one file. VS Code requests ran gpt-6.1-sol; the CLI logged claude-sonnet-5.5; the cloud agent invoked test-writer and stopped at a missing React dependency."`,
        `Ask the room which agent the team shipped. Let people answer before revealing the evidence table in Part 2.`,
        `These are observed 2026-10-21 runs for tests on one small component each. The model cause in VS Code remains unresolved; the cloud failure points to its environment.`
      ],
      know: [`All three artifacts show the custom agent was recognized and invoked. Do not infer that the profiles or environments were identical.`]
    },
    'part-1': {
      seconds: 30, sources: [SRC.comparing, SRC.config],
      notes: [
        `"First, we build the file around the role the team actually needs."`,
        `Preview the three decisions: choose the customization, encode the portable behavior, then publish where the intended users can load it.`
      ],
      know: [`The next section uses the real FanHub test-writer profile to ground these design choices.`]
    },
    'primitive-choice': {
      seconds: 90, sources: [SRC.comparing],
      notes: [
        `"A custom agent earns a file when the work needs a different who: a persistent identity, a tool boundary, and a method."`,
        `Use the four cards to route the responsibility. Team conventions belong in instructions; a repeatable task belongs in a prompt; a reusable method can live in a skill; a persistent specialist role belongs in a custom agent.`,
        `FanHub's test-writer edits test files, runs a command family, and reports suspected production defects for a person to handle.`
      ],
      know: [
        `The distinction is about the job each customization owns, not a maturity ladder. A custom agent can still load shared instructions and skills.`,
        `In the FanHub example, “tests sit beside the component” is a convention for instructions; “how FanHub mocks the API layer” is a reusable method for a skill.`
      ]
    },
    'agent-anatomy': {
      seconds: 125, sources: [SRC.config, SRC.agentFile],
      notes: [
        `"The description helps select the role, aliases declare the tool boundary, and the body teaches the method every runtime can read."`,
        `Walk the actual fields. The description states the task and test-only boundary. The six aliases are read, search, edit, execute, todo, and web. The profile also declares Claude Sonnet 5.5 and a review handoff.`,
        `Each runtime maps aliases into its own tools, which is why six aliases later appear as 23 VS Code tools and 14 CLI tools. The numbers describe resolution, not relative capability.`,
        `→ Now put the behavior that must travel into the body.`
      ],
      know: [
        `Description is the only required field. The body supports the role method and output contract; the documented maximum is 30,000 characters.`,
        `Tool aliases include read, edit, search, execute, agent, web, and todo. MCP tools can use server/tool or server/* names.`,
        `Omitting tools grants all available tools; tools: [] grants none. An alias list is configuration, not a grant of human approval or a guarantee of identical permissions.`,
        `The real file also carries an argument-hint and a handoff prompt with send: false; the code excerpt keeps the visible profile compact.`
      ]
    },
    'output-contract': {
      seconds: 105, sources: [SRC.agentFile, SRC.pr214],
      notes: [
        `"A five-line report keeps the run useful to the person who reviews it: agent, tests added, command and result, suspected bugs, and files changed."`,
        `The cloud agent's summary carried the missing-React failure. The pull request description described the behaviors tested. Those artifacts answered different questions.`,
        `Runner status remains separate from the domain result. A test command can stop before assertions run; a completed command can still report a failing assertion.`
      ],
      know: [`The original test-writer contract limits changes to test files and asks the agent to report suspected production issues for a person to fix.`]
    },
    'publish-scope': {
      seconds: 105, sources: [SRC.custom, SRC.config, SRC.cloud, SRC.mainCommit],
      notes: [
        `"When teammates report different behavior for the same agent ID, find the winning file before changing the prompt."`,
        `The filename is the ID. Repository, personal, and organization or enterprise definitions reach different people. When the same ID exists in multiple scopes, the most-local definition wins: personal, repository, organization, then enterprise.`,
        `The cloud agent discovers the custom agent from the default branch. FanHub published test-writer to main before assigning its first issue.`
      ],
      know: [
        `Personal CLI agents live in ~/.copilot/agents/. Personal VS Code agents live in VS Code profile storage.`,
        `Organization or enterprise agents use agents/ at the root of the org's .github or .github-private repository.`
      ]
    },
    'launch-controls': {
      seconds: 75, sources: [SRC.config, SRC.vscodeFile],
      notes: [
        `"These settings answer who can see or select an agent. They do not decide whether a proposed change is authorized or accepted."`,
        `target scopes availability to VS Code or GitHub Copilot. user-invocable false removes the picker entry but keeps subagent availability. disable-model-invocation true prevents automatic selection, so a person or orchestrator names the agent.`,
        `Keep tool permission, hooks, branch rules, runtime environment, and human review as separate controls.`
      ],
      know: [`disable-model-invocation supersedes the retired infer field. Do not describe a selection flag as an authorization control.`]
    },
    'part-2': {
      seconds: 30, sources: [SRC.config, SRC.pr216, SRC.pr215, SRC.pr214],
      notes: [
        `"Now we separate what the documentation says from what a dated run actually did."`,
        `The matrix is the reference claim; the following runtime slides are observations from FanHub artifacts.`
      ],
      know: [`The documentation snapshot and the FanHub observations are dated 2026-10-21; the talk does not present them as a news refresh.`]
    },
    'documented-support': {
      seconds: 120, sources: [SRC.config, SRC.vscodeFile, SRC.cli, SRC.cloud],
      notes: [
        `"Quiet skipping lets a profile serve several runtimes: each runtime ignores unsupported fields and tool names rather than rejecting the entire file."`,
        `Read this as documented support dated 2026-10-21, not as the result of FanHub's three runs. Shared identity and invocation controls appear across the columns. Other fields differ: VS Code Local supports handoffs, agents, and argument-hint; the CLI documents include-custom-instructions for subagents; the cloud configuration includes MCP servers and metadata.`,
        `The cloud model wording is intentionally narrow: documented for IDE use. Do not upgrade that phrase into an observation of the cloud session's model.`
      ],
      know: [
        `The README's 2026-10-21 support table also lists agent-scoped hooks in VS Code and CLI, reasoning-effort in VS Code, and web and todo aliases in VS Code and CLI.`,
        `The reference lists no support for handoffs, agents, or argument-hint in the CLI or cloud-agent columns. A blank or dash means not listed here, not a separately tested failure.`
      ]
    },
    'observed-resolution': {
      seconds: 120, sources: [SRC.pr216, SRC.pr215, SRC.pr214, SRC.agentFile],
      notes: [
        `"This is what the artifacts show the same profile resolving in these three runs."`,
        `Point across the rows, not down as a product ranking. VS Code expanded six aliases to 23 tools; the CLI expanded those aliases to 14. Cloud ran test-writer as a subagent, and its tool count is unobserved.`,
        `The VS Code request log exposes gpt-6.1-sol; the CLI log explicitly resolves claude-sonnet-5.5; the cloud session names no model. Mark unobserved wherever the evidence does not answer the question.`,
        `Runner status is 14 passed in VS Code, 10 passed in CLI, and a stopped first cloud run followed by a separate six-test recovery.`
      ],
      know: [
        `The two observed alias counts come from each runtime's own tool expansion. They say nothing about comparative capability.`,
        `The artifacts date to 2026-10-21. Treat this as a case study, not a claim about every later runtime version.`
      ]
    },
    'vscode-run': {
      seconds: 130, sources: [SRC.vscodeDebug, SRC.vscode, SRC.pr216],
      notes: [
        `"In a VS Code Local session, the argument hint appeared and the Review these tests button opened test-reviewer with a prefilled prompt."`,
        `The first attempt showed no hint; it appeared after the session type was Local. The request log showed 23 tools for test-writer. The reviewer, declared with read and search, ran with 10 read-only tools. The test runner reported 14 passed and the reviewer accepted.`,
        `"The model declared in the profile was Claude Sonnet 5.5; the requests ran gpt-6.1-sol." Say the cause is unresolved. The evidence does not tell us why, and the request log is what revealed the executed model.`
      ],
      know: [
        `Examples among the 23 tools include apply_patch, create_file, run_in_terminal, fetch_webpage, manage_todo_list, runSubagent, and vscode_askQuestions.`,
        `Do not hypothesize about account policy, model availability, or a fallback. None of those causes is established in the evidence.`
      ]
    },
    'cli-run': {
      seconds: 105, sources: [SRC.cli, SRC.pr215],
      notes: [
        `"The Copilot CLI wrote its decision into the debug log: it resolved claude-sonnet-5.5 from the profile's Claude Sonnet 5.5 preference."`,
        `The six aliases became 14 CLI tools, including web_fetch and update_todo. The log has no entry for handoffs or argument-hint; the dated reference matrix says those fields are not listed for the CLI.`,
        `The agent changed the test file only. The runner reported 10 passed. The run record reported 8.65 AI Credits over 2 minutes 14 seconds.`
      ],
      know: [`The quoted resolution came from Copilot CLI 1.0.100 with --log-level debug. The count is specific to this run.`]
    },
    'cloud-first-run': {
      seconds: 120, sources: [SRC.cloud, SRC.pr214],
      notes: [
        `"The pull request says Custom agent used: test-writer, and the session log shows the cloud agent starting it as a subagent."`,
        `The agent wrote six tests and ran Jest. The command stopped at Cannot find module react. This is an execution-environment dependency: the cloud runner began from a fresh clone without FanHub setup steps for the frontend dependencies.`,
        `Keep runner and domain results separate. In a local run, Jest completed with 5 passed and 1 failed. One broad assertion searched the whole card for Joey, while the quote's context line legitimately mentioned Joey.`
      ],
      know: [
        `The agent's npm ci attempt could not reach the package proxy. This was the environment in the observed run, not a general statement that cloud agents cannot install dependencies.`,
        `The first cloud runner stopped before the test assertions produced a result. The local 5-and-1 result is a separate run.`
      ]
    },
    'cloud-recovery': {
      seconds: 160, sources: [SRC.cloudEnv, SRC.setupCommit, SRC.pr214, SRC.fixCommit],
      notes: [
        `"FanHub moved dependency setup outside the profile. The .github/workflows/copilot-setup-steps.yml workflow installed the frontend dependencies, and the follow-up asked Copilot to narrow the Joey assertion and report exact counts."`,
        `The cloud session started test-writer again. This time Jest ran: one suite passed and six tests passed. The fix asserted on the .attribution element; the local rerun matched all six.`,
        `The reply comment carries the counts because the PR description kept its original text. The agent merged main into its branch to avoid a force-push.`,
        `Pause on the transfer: an agent profile describes a role; the runtime supplies the environment.`
      ],
      know: [
        `The setup workflow was committed as e1675df and its validation run passed. The fix was bf7e2c3.`,
        `A built-in code review subagent reran the file with the same result. The local rerun matched 6 of 6. These are observations from the cited FanHub artifacts.`
      ]
    },
    'part-3': {
      seconds: 30, sources: [SRC.vscodeDebug, SRC.cli, SRC.cloud],
      notes: [
        `"A useful comparison starts with five questions: which agent, which model, which tools, did checks run, and what did the agent report?"`,
        `Each runtime has a different evidence path. We will keep the question stable and change only where we look.`
      ],
      know: [`A missing artifact is recorded as unobserved, not silently turned into a pass or failure.`]
    },
    'vscode-load-report': {
      seconds: 100, sources: [SRC.vscodeDebug, SRC.vscodeFile],
      notes: [
        `"In VS Code, the Agent Debug Log shows what loaded; the Chat Debug view or prompt export shows per-request model and tools."`,
        `Then inspect terminal output for the checks and the agent's final summary for its report. The request is the right unit when the model or tool set can change during a session.`,
        `For a local audit, keep the agent profile, request evidence, command result, and summary together so a reviewer can trace each answer.`
      ],
      know: [`Developer: Show Chat Debug View exposes the exact system prompt and tool definitions per request. Agent Debug Log is labeled preview in the cited documentation.`]
    },
    'cli-load-report': {
      seconds: 85, sources: [SRC.cli, SRC.pr215],
      notes: [
        `"In the CLI, debug logging exposes agent_name, the resolved model line, and tool_names; session output shows the checks."`,
        `Use --log-level debug with a log directory, and use --share when a transcript needs to travel with the review. Compare the final summary with the command result rather than treating prose as the test runner.`,
        `The same five questions keep the report comparable with VS Code.`
      ],
      know: [`The observed CLI model line reads Using model claude-sonnet-5.5 from custom agent test-writer and names the source profile string.`]
    },
    'cloud-load-report': {
      seconds: 100, sources: [SRC.cloud, SRC.pr214],
      notes: [
        `"In the cloud run, the pull request description identifies the custom agent; the session log shows model when available, tool calls, commands, and exit codes."`,
        `The agent summary and the PR description may tell different parts of the story. Compare both when a summary leaves out a test result or a PR description says what behaviors were covered.`,
        `When the model is absent from the log, report it as unobserved. The gap itself tells the team which evidence source or instrumentation to improve.`
      ],
      know: [`gh agent-task view with --log prints a cloud session log. The PR text in the FanHub recovery did not change; the reply comment held the new test counts.`]
    },
    'repair-map': {
      seconds: 145, sources: [SRC.config, SRC.cloudEnv, SRC.vscodeFile],
      notes: [
        `"Load, compare, place, rerun: one observed gap goes to the layer that owns it, with a named person responsible for the next move."`,
        `Walk the owner column. The agent producer edits the body or target; the developer pins a launch model when it matters; the repository maintainer prepares dependencies; the reviewer checks command evidence; the team lead defines acceptable runtime variance.`,
        `After one targeted change, rerun the same task and collect the same five answers. If the result still differs, keep the exception visible and escalate to the owner of the runtime or policy.`
      ],
      know: [
        `For skipped handoffs, restating the desired behavior in the body makes the method portable, but it does not recreate a UI button in every runtime.`,
        `For a tool alias missing in a runtime, either base the method on shared capabilities or scope the agent with target. For a cloud dependency, use copilot-setup-steps.yml; locally, use a dev container or setup script.`
      ]
    },
    'compose-boundaries': {
      seconds: 110, sources: [SRC.vscode, SRC.cli, SRC.cloud, SRC.agentFile],
      notes: [
        `"test-writer hands work to a checker that can read and search but cannot edit. The distinction between handoff and subagent determines who chooses the next step."`,
        `In a VS Code Local session, the person clicks a button with a prefilled prompt. A subagent call is an agent-to-agent delegation; VS Code can limit available agents with the agents field and agent tool, the CLI delegates by description, and the cloud run started test-writer as a subagent.`,
        `The profile shapes what the agent attempts. Rulesets and branch protection, hooks and permission flags, the cloud firewall, and a human reviewer hold authority over changes and acceptance.`
      ],
      know: [
        `In Copilot CLI, subagents skip repository instructions unless the profile sets include-custom-instructions: true.`,
        `A reviewer with read and search is a configuration boundary, not a substitute for repository-level enforcement.`
      ]
    },
    'part-4': {
      seconds: 30, sources: [SRC.agentFile, SRC.config],
      notes: [
        `"Bring one agent your team already shares into the same proof loop."`,
        `The next slides turn the framework into a concrete prediction and rerun plan.`
      ],
      know: [`The transfer target is one real agent, one task, and evidence from a runtime the team uses.`]
    },
    'own-work-check': {
      seconds: 110, sources: [SRC.config, SRC.vscodeDebug, SRC.cli, SRC.cloud],
      notes: [
        `"Pick an agent that already has an owner and a real task. Before running it elsewhere, predict which line of the load report will change first."`,
        `Write down the identity, model, tools, checks, and summary you expect. Then open the target runtime's own evidence and compare the result. Select one discrepancy you can assign to a named layer owner.`,
        `The transfer question is: which of your agents would behave differently tomorrow from another runtime, and which load-report line would show it first?`
      ],
      know: [
        `Keep the first audit small: one profile, one task, one target runtime, and evidence that the team can retain.`,
        `Where the pattern stops fitting: a multi-agent local SDLC loop belongs with Local Agentic SDLC; event-triggered judgment belongs with GitHub Agentic Workflows; the pull request decision across cloud agent, code review, and Code Quality belongs with Copilot on GitHub.`
      ]
    },
    'rerun-plan': {
      seconds: 100, sources: [SRC.config, SRC.cloudEnv],
      notes: [
        `"Keep the task stable, change one owning layer, then rerun the same proof."`,
        `Load the actual profile and run. Compare intended fields with observed artifacts. Place the discrepancy with the body, launch controls, environment, review, or policy owner. Rerun and inspect the same five questions.`,
        `If the evidence does not support a conclusion, mark it unobserved and improve the evidence path before declaring success.`
      ],
      know: [`This is a practitioner method, not a promise that every runtime offers the same fields or emits the same logs.`]
    },
    'before-after': {
      seconds: 45, sources: [SRC.pr216, SRC.pr215, SRC.pr214, SRC.setupCommit],
      notes: [
        `"The file stays shared. The team's assumption changes: we read each runtime's resolved behavior, then assign each gap to its owner."`,
        `The figures are dated observations: 23 and 14 expansions from the same six aliases, the unresolved VS Code model discrepancy, and six cloud tests passing after setup steps.`
      ],
      know: [`All three values are from FanHub artifacts dated 2026-10-21; the model cause remains unresolved.`]
    },
    today: {
      seconds: 50, sources: [SRC.config, SRC.cloudEnv],
      notes: [
        `"Today, inspect one shared profile and find which file wins. This week, run it across the team's runtimes and fill in the same five questions."`,
        `Then assign one gap to its owner and rerun the same task. The result is a useful team artifact: a supported-runtime decision backed by observed evidence.`
      ],
      know: [`With the team, name the producer, maintainer, reviewer, and policy owner so the recovery path has a person attached to it.`]
    },
    references: {
      seconds: 15, sources: [SRC.config, SRC.agentFile, SRC.pr216, SRC.pr215, SRC.pr214],
      notes: [
        `"The speaker notes link the first-party configuration and runtime documentation beside the FanHub artifacts for each observed run."`,
        `The case evidence is dated 2026-10-21; use the links to inspect the profile, pull requests, setup change, and test fix.`
      ],
      know: [`The README references were verified on 2026-10-21. The linked FanHub results are observed case evidence, not a guarantee of other runtime versions.`]
    },
    thanks: {
      seconds: 15, sources: [SRC.config, SRC.pr216, SRC.pr215, SRC.pr214],
      notes: [
        `"Take one shared agent back to your team. Predict what another runtime will resolve, open the evidence, and let the owner of each gap place the change."`,
        `Leave the own-work question on screen for discussion.`
      ],
      know: [`The next step belongs to the presenter: run through the deck, confirm timing, and replace any live-demo assumptions with the team's current evidence.`]
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'custom-agents',
      title: 'Custom Agents: One File, Every Runtime',
      short: 'Custom Agents',
      category: 'tech-talk',
      source: 'tech-talks/custom-agents/README.md',
      question: 'How do I make one shared agent behave as intended across the runtimes my team uses?',
      thesis: 'One file carries a shared role, and each runtime resolves it in its own context. Write portable behavior in the body, add runtime-specific fields on purpose, and read the resolved run in every runtime the team uses.'
    },
    slides
  };
})();
