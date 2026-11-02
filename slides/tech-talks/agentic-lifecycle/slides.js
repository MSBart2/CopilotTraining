/*
  GitHub Agentic Workflows — slide data and the complete presenter handout.
  Keep the approved 36-slide order. Content, notes, evidence, and time live together.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    home: { label: 'GitHub Agentic Workflows documentation', href: 'https://github.github.com/gh-aw/' },
    overview: { label: 'Overview', href: 'https://github.github.com/gh-aw/introduction/overview/' },
    architecture: { label: 'Security architecture', href: 'https://github.github.com/gh-aw/introduction/architecture/' },
    frontmatter: { label: 'Frontmatter reference', href: 'https://github.github.com/gh-aw/reference/frontmatter/' },
    triggers: { label: 'Triggers and repository access roles', href: 'https://github.github.com/gh-aw/reference/triggers/' },
    commands: { label: 'Command triggers', href: 'https://github.github.com/gh-aw/reference/command-triggers/' },
    engines: { label: 'AI engines', href: 'https://github.github.com/gh-aw/reference/engines/' },
    tools: { label: 'Tools', href: 'https://github.github.com/gh-aw/reference/tools/' },
    network: { label: 'Network permissions', href: 'https://github.github.com/gh-aw/reference/network/' },
    outputs: { label: 'Safe outputs', href: 'https://github.github.com/gh-aw/reference/safe-outputs/' },
    staged: { label: 'Staged mode', href: 'https://github.github.com/gh-aw/reference/staged-mode/' },
    cloud: { label: 'Safe outputs for the Copilot cloud agent', href: 'https://github.github.com/gh-aw/reference/copilot-cloud-agent/' },
    integrity: { label: 'Integrity filtering', href: 'https://github.github.com/gh-aw/reference/integrity/' },
    costs: { label: 'Cost management', href: 'https://github.github.com/gh-aw/reference/cost-management/' },
    outcomes: { label: 'Outcomes', href: 'https://github.github.com/gh-aw/reference/outcomes/' },
    graders: { label: 'Experimental trace graders', href: 'https://github.github.com/gh-aw/experimental/trace-graders/' },
    experiments: { label: 'Experimental evals and experiments', href: 'https://github.github.com/gh-aw/experimental/experiments/' },
    cli: { label: 'gh aw CLI commands', href: 'https://github.github.com/gh-aw/setup/cli/' },
    faq: { label: 'Frequently asked questions', href: 'https://github.github.com/gh-aw/reference/faq/' },
    issueOps: { label: 'IssueOps pattern', href: 'https://github.github.com/gh-aw/patterns/issue-ops/' },
    chatOps: { label: 'ChatOps pattern', href: 'https://github.github.com/gh-aw/patterns/chat-ops/' },
    labelOps: { label: 'LabelOps pattern', href: 'https://github.github.com/gh-aw/patterns/label-ops/' },
    researchPlan: { label: 'ResearchPlanAssignOps pattern', href: 'https://github.github.com/gh-aw/patterns/research-plan-assign-ops/' },
    queues: { label: 'WorkQueueOps and BatchOps patterns', href: 'https://github.github.com/gh-aw/patterns/workqueue-ops/' },
    factory: { label: "Welcome to Peli's Agent Factory", href: 'https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/' },
    meet: { label: 'Meet the Workflows', href: 'https://github.github.com/gh-aw/blog/2026-01-13-meet-the-workflows/' },
    wizard: { label: 'GitHub Agentic Workflow Generator', href: 'https://githubnext.github.io/gh-aw-wizard/' },
    release: { label: 'gh-aw releases', href: 'https://github.com/github/gh-aw/releases' },
    fanhubIssue: { label: 'FanHub issue #202', href: 'https://github.com/MSBart2/FanHub/issues/202' },
    fanhubRun: { label: 'FanHub Actions run 39669929991', href: 'https://github.com/MSBart2/FanHub/actions/runs/39669929991' },
    fanhubDuplicate: { label: 'FanHub issue #7', href: 'https://github.com/MSBart2/FanHub/issues/7' },
    fanhubWorkflow: { label: 'FanHub issue-triage workflow source', href: 'https://github.com/MSBart2/FanHub/blob/ca344f9/.github/workflows/triage.md' },
    fanhubLifecycle: { label: 'FanHub lifecycle pilot workflows', href: 'https://github.com/MSBart2/FanHub/tree/800c8ec/.github/workflows' },
    fanhubPR: { label: 'FanHub draft pull request #193', href: 'https://github.com/MSBart2/FanHub/pull/193' },
    exampleSource: { label: 'Talk example: triage-wizard.md', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/agentic-lifecycle/examples/triage-wizard.md' },
    exampleLock: { label: 'Talk example: compiled triage-wizard lock', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/agentic-lifecycle/examples/triage-wizard.lock.yml' },
    examplePrompt: { label: 'Talk example: wizard prompt', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/agentic-lifecycle/examples/example-flow-prompt.md' }
  };

  const slides = [
    S('title', 0, 'GitHub Agentic Workflows', {
      chrome: false, visual: 'authority-ring',
      subtitle: 'Automate the Repository Chores That Take Judgment',
      tagline: 'What they are, when to use one, and how to run them safely',
      meta: 'Agents on GitHub · Practitioner Tech Talk · 55 min'
    }),
    S('core-question', 0, 'Which repository chores fit an agent, and how do you keep it in bounds?', {
      pill: 'Core Question',
      subtitle: 'The agent proposes; a separate job applies declared writes; a maintainer decides what happens next.',
      highlight: 'Pick the chore first. Then grant only the writes it needs.',
      routing: ['recurs', 'needs judgment', 'bounded write'], routingLabel: 'The decision test',
      roles: [
        { icon: '🧑‍🔧', title: 'Maintainer', description: 'Owns the workflow contract and its review.' },
        { icon: '🤖', title: 'Agent', description: 'Reads repository context and proposes an output.' },
        { icon: '🧑‍⚖️', title: 'Reviewer', description: 'Checks evidence and decides the next step.' }
      ],
      stats: [
        { title: 'IssueOps', description: 'Classify a new report with cited evidence.' },
        { title: 'Repository digest', description: 'Summarize recurring issues and runs.' },
        { title: 'Planned work', description: 'Turn research into scoped issues for a person.' }
      ]
    }),
    S('contents', 0, 'Four decisions, one inspectable workflow', {
      pill: 'Contents · Four parts',
      sections: [
        { icon: '🎯', title: 'Why and When', subtitle: 'Pick the chore first', blurb: 'A practical test, use cases, and the maintainer handoff.', slide: 4 },
        { icon: '📜', title: 'Read the Contract', subtitle: 'See authority in the file', blurb: 'Read the source, lock, safe outputs, and boundary controls.', slide: 12 },
        { icon: '🪄', title: 'Build One Live', subtitle: 'Narrow the generated draft', blurb: 'Use the wizard, review four controls, and run staged.', slide: 20 },
        { icon: '📊', title: 'Run and Troubleshoot', subtitle: 'Judge with evidence', blurb: 'Read the run, compare value and cost, recover, transfer.', slide: 25 }
      ]
    }),
    S('part-1', 1, 'Why and When', {
      scene: 'opener',
      subtitle: 'Choose recurring repository work that needs reading and judgment.',
      cards: [
        { icon: '🧠', title: 'Needs judgment', blurb: 'Read reports, code, and history' },
        { icon: '🔐', title: 'Has bounded authority', blurb: 'Agent stays read-only' },
        { icon: '🔁', title: 'Returns repeatedly', blurb: 'Choose event or schedule' }
      ],
      terminal: { context: 'Pick the chore before opening the YAML', detail: 'Three-part test: recurs · judgment · bounded write' }
    }),
    S('otherwise', 1, 'A workflow fills a gap between scripts and direct model writes', {
      scene: 'showdown', pill: 'Why and When',
      leftLabel: 'Recurring repository work', rightLabel: 'Agentic workflow',
      pairs: [
        { left: { label: 'Issue text varies', note: 'Regex matches words, not meaning' }, right: { label: 'Agent reads context', note: 'Report + code + related issues', z: 'purple' } },
        { left: { label: 'Model holds write token', note: 'Untrusted text can steer its action' }, right: { label: 'Separate write job', note: 'Applies only declared outputs', z: 'green' } },
        { left: { label: 'People repeat the reading', note: 'Triage, digest, failure report' }, right: { label: 'Run on a trigger', note: 'Human still chooses what happens', z: 'orange' } }
      ],
      outcomeLeft: { icon: '↻', label: 'Manual or brittle automation' },
      outcomeRight: { icon: '✓', label: 'Judgment, bounded and reviewable' },
      footnote: 'Cost is qualitative here; use run audit and Outcomes from your own workflow.'
    }),
    S('three-part-test', 1, 'All three conditions make the workflow a candidate', {
      scene: 'signals', pill: 'Decision test',
      rows: [
        { label: 'The task recurs', description: 'An event, command, or owner-approved schedule starts it', tag: 'recurs', z: 'local' },
        { label: 'Needs judgment', description: 'A script cannot interpret the report, code, or failure', tag: 'judgment', z: 'purple' },
        { label: 'Small bounded write', description: 'A few labels, one report, or bounded review comments', tag: 'bounded write', z: 'green' }
      ],
      footnote: 'Deterministic build/test work stays in Actions; one steered implementation task fits a coding agent.'
    }),
    S('use-cases-react', 1, 'People and events can start a small, defined workflow', {
      scene: 'relay', pill: 'Use cases · event-driven',
      columns: [
        { icon: '📥', title: 'IssueOps', description: 'Every new report gets a contextual first read.', items: ['issues: opened', 'up to 3 allowlisted labels', 'one comment'], z: ['local', 'purple', 'green'] },
        { icon: '💬', title: 'ChatOps', description: 'A person requests analysis when it is useful.', items: ['/review on a PR', 'up to 5 review comments', 'one summary comment'], z: ['local', 'purple', 'green'] },
        { icon: '🏷️', title: 'LabelOps', description: 'A person applies a label as a stage checkpoint.', items: ['named label starts work', 'scoped stage action', 'human owns next step'], z: ['local', 'purple', 'green'] }
      ]
    }),
    S('use-cases-scheduled', 1, 'Schedules and queues automate repeated interpretation', {
      scene: 'relay', pill: 'Use cases · recurring',
      columns: [
        { icon: '📰', title: 'Daily report', description: 'Summarize issues, pull requests, or failed runs.', items: ['owner chooses schedule', 'one [digest] issue', 'close older digest'], z: ['local', 'purple', 'green'] },
        { icon: '🧹', title: 'Work queue', description: 'Apply a small judgment call to each item.', items: ['lint / migration / docs', 'claim one queue item', 'or batch and aggregate'], z: ['local', 'purple', 'green'] },
        { icon: '🧭', title: 'Research → plan', description: 'Find work, scope it, then let a person assign it.', items: ['review a gap', 'create scoped issues', 'developer assigns Copilot'], z: ['local', 'purple', 'green'] }
      ]
    }),
    S('agent-factory', 1, 'GitHub reports more than 100 workflows in its Agent Factory', {
      scene: 'scorecard', pill: "Peli's Agent Factory",
      cards: [
        { icon: '🏭', title: '100+ workflows', description: 'Built and operated on the gh-aw team repositories; GitHub-published.' },
        { icon: '🧰', title: 'Many kinds of work', description: 'Triage, CI diagnosis, documentation, coverage, security, and efficiency.' },
        { icon: '🎚️', title: 'Different authority', description: 'Read-only analysis, pull-request proposals, and meta-workflows.' },
        { icon: '📣', title: 'Repo Assist figures', description: 'GitHub reports 13 repos, 578 issues, and median 8× faster closure.' }
      ]
    }),
    S('issueops-flow', 1, 'IssueOps turns a report into a human-owned implementation decision', {
      scene: 'relay', pill: 'IssueOps · bounded handoffs',
      columns: [
        { icon: '🏷️', title: 'Triage', description: 'Requester opens an issue; agent reads report and code.', items: ['up to 3 allowlisted labels', 'one evidence-backed comment', 'maintainer compares judgment'], z: ['local', 'purple', 'orange'] },
        { icon: '🗂️', title: 'Plan', description: 'A person requests scoped work with /plan.', items: ['up to 5 [plan] issues', 'objective + files + steps', 'acceptance criteria'], z: ['local', 'purple', 'green'] },
        { icon: '🧑‍⚖️', title: 'Decide', description: 'Maintainer chooses an implementation route.', items: ['assign Copilot cloud agent', 'or use a workflow per stage', 'review and merge stay human'], z: ['local', 'purple', 'orange'] }
      ]
    }),
    S('cloud-agent-handoff', 1, 'A person owns the transition from judgment to implementation', {
      scene: 'showdown', pill: 'IssueOps · implementation handoff',
      leftLabel: 'Workflow per stage', rightLabel: 'Workflow + cloud agent',
      pairs: [
        { left: { label: 'Person applies stage labels', note: 'plan → implement → review' }, right: { label: 'Person assigns planned issue', note: 'or assign-to-agent / assignees: copilot', z: 'purple' } },
        { left: { label: 'One narrow contract each', note: 'Useful for audit-heavy controls' }, right: { label: 'Judgment stays bounded', note: 'Cloud agent owns implementation session', z: 'green' } },
        { left: { label: 'Build runs in workflow', note: 'Network policy must permit packages' }, right: { label: 'Agent tests; CI remains gate', note: 'Person reviews and merges the PR', z: 'orange' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Recorded authority at each stage' },
      outcomeRight: { icon: '✓', label: 'Fewer workflow files; fits most teams' },
      footnote: 'The docs call the second shape ResearchPlanAssignOps; choose the first when each stage needs its own auditable authority.'
    }),
    S('part-2', 2, 'Read the Contract', {
      scene: 'opener',
      subtitle: 'The Markdown declares authority; compile and run evidence show how it behaves.',
      cards: [
        { icon: '📄', title: 'One source file', blurb: 'Frontmatter + Markdown judgment' },
        { icon: '🔒', title: 'A compiled lock', blurb: 'Generated jobs and permissions' },
        { icon: '🧾', title: 'A run audit', blurb: 'Evidence of what happened' }
      ],
      terminal: { context: 'Read a real FanHub triage workflow', detail: 'Source declares · lock implements · audit shows' }
    }),
    S('who-acts', 2, 'Five actors have distinct authority in one workflow', {
      scene: 'relay', pill: 'Contract actors',
      columns: [
        { icon: '📜', title: 'Contract owner', description: 'Maintainer or platform engineer reviews the contract.', items: ['declares trigger', 'bounds reads and writes', 'owns cost and recovery'], z: ['local', 'purple', 'orange'] },
        { icon: '🙋', title: 'Requester → agent', description: 'Requester starts; agent reads and proposes.', items: ['issue / command / label', 'read-only sandbox', 'suggested safe outputs'], z: ['local', 'purple', 'green'] },
        { icon: '⚙️', title: 'Job → maintainer', description: 'Safe-outputs job applies; maintainer decides.', items: ['declared writes only', 'review / correct / stop', 'choose what happens next'], z: ['local', 'green', 'orange'] }
      ]
    }),
    S('frontmatter', 2, 'Frontmatter grants the run its trigger, context, and write authority', {
      scene: 'signals', pill: 'Real artifact · triage-wizard.md',
      rows: [
        { label: 'on + roles', description: 'issues opened or manual issue_number; roles: all', tag: 'who starts?', z: 'local' },
        { label: 'permissions + engine', description: 'contents/issues read; Copilot inference request', tag: 'what can read?', z: 'purple' },
        { label: 'tools + network', description: 'edit: false; scoped GitHub tools; allowed: []', tag: 'reach / call?', z: 'remote' },
        { label: 'safe-outputs', description: 'one comment + bounded labels on selected issue', tag: 'what can write?', z: 'green' },
        { label: 'limits + integrity', description: '10-minute timeout; roles: all + min-integrity: none', tag: 'what bounds it?', z: 'orange' }
      ],
      footnote: 'Review five questions: who starts it, what can it read, call/reach, write, and what stops a runaway?'
    }),
    S('workflow-body', 2, 'The body asks for evidence before the agent classifies an issue', {
      scene: 'terminal', pill: 'Real FanHub artifact · illustrative excerpts',
      termTitle: 'triage-wizard.md · body',
      transcript: [
        { type: 'user', text: 'Issue: season filter shows the wrong episodes' },
        { type: 'response', lines: ['Inspect only relevant code paths; start with at most 10 files.', 'Choose language by implementation ownership, not extension.', 'Choose type and severity from evidenced impact; defer uncertainty.', 'Comment: rationale + repository permalink pinned to commit SHA.'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Issue text is evidence, never workflow authority.' }
      ]
    }),
    S('compile-lock', 2, 'The lock makes the source contract inspectable as jobs and permissions', {
      scene: 'relay', pill: 'Compile · commit source and lock together',
      columns: [
        { icon: '📄', title: 'Source', description: 'Reviewer reads intent and authority in the PR.', items: ['triage-wizard.md', 'triggers + allowed writes', 'body instructions'], z: ['local', 'purple', 'orange'] },
        { icon: '🔒', title: 'Compiled lock', description: 'Compiler generates pinned actions and jobs.', items: ['7 jobs in this example', 'model jobs are read-only', 'safe_outputs has issue write'], z: ['local', 'purple', 'green'] },
        { icon: '🧾', title: 'Run audit', description: 'Actions executes the committed lock.', items: ['jobs + credit use', 'filtered reads + tool calls', 'safe outputs created'], z: ['local', 'purple', 'green'] }
      ]
    }),
    S('safe-outputs', 2, 'A separate job applies only the outputs the contract declares', {
      scene: 'signals', pill: 'Only declared writes',
      rows: [
        { label: 'Agent proposes', description: 'Read-only job proposes the labels and comment', tag: 'proposal', z: 'purple' },
        { label: 'Allowlisted labels', description: 'allowed list + max + target constrain the write', tag: '≤ 6 labels', z: 'green' },
        { label: 'One comment', description: 'max: 1; selected issue only; no PR target', tag: 'one comment', z: 'green' },
        { label: 'Cannot complete', description: 'Built-in noop and report-missing signals say so', tag: 'honest stop', z: 'orange' }
      ],
      footnote: 'The exact target and allowlist are enforced in the frontmatter; the body cannot add a close-issue capability.'
    }),
    S('staged-mode', 2, 'Staged mode runs the workflow but previews built-in writes', {
      scene: 'terminal', pill: 'Before a real write',
      termTitle: 'Actions run → Summary → staged preview',
      transcript: [
        { type: 'prompt', text: 'safe-outputs: staged: true' },
        { type: 'response', lines: ['Agent completes its normal reasoning.', 'Add Labels Preview: proposed allowlisted labels.', 'Add Comment Preview: proposed comment for selected issue.'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Preview Summary: operations previewed. No GitHub resources were created.' }
      ],
      footnote: 'Remove staged, recompile, and push only after preview matches maintainer judgment.'
    }),
    S('hostile-issue', 2, 'Independent controls limit what an untrusted issue can reach or change', {
      scene: 'signals', pill: 'Threat boundary',
      rows: [
        { label: '“Ignore” request', description: 'Integrity filtering controls which content the agent reads', tag: 'trust filter', z: 'orange' },
        { label: 'Token request', description: 'Credential proxy keeps tokens outside the agent', tag: 'tokens isolated', z: 'purple' },
        { label: 'Outbound request', description: 'Network firewall applies the declared egress policy', tag: 'network', z: 'remote' },
        { label: 'Close all issues', description: 'Only declared safe outputs and limits can write', tag: 'safe outputs', z: 'green' },
        { label: 'Malicious output', description: 'Separate threat-detection job reviews outputs', tag: 'detection', z: 'orange' }
      ],
      footnote: 'Public repositories filter untrusted reads by default; private repositories need an explicit integrity setting.'
    }),
    S('part-3', 3, 'Build One Live', {
      scene: 'opener',
      subtitle: 'The wizard produces a prompt. A reviewer turns its repository-aware draft into a deliberate contract.',
      cards: [
        { icon: '🪄', title: 'State intent', blurb: 'Choose trigger, result, and engine' },
        { icon: '✂️', title: 'Narrow authority', blurb: 'Review allowlist, limits, target, stage' },
        { icon: '🧾', title: 'Read the preview', blurb: 'Compare output before promoting' }
      ],
      terminal: { context: 'FanHub issue triage · recorded artifacts ready', detail: 'Wizard prompt → coding agent draft → reviewer decision' }
    }),
    S('wizard', 3, 'The wizard hands a coding agent a prompt, not a workflow', {
      scene: 'four-phases', pill: 'Seven wizard steps',
      stageLabel: 'Step',
      gateLabel: 'review intent',
      stages: [
        { label: '1–2', name: 'Why + How', icon: '🎯', description: 'Intent and scenario' },
        { label: '3–4', name: 'When + Where', icon: '⏱️', description: 'Trigger and safe outputs' },
        { label: '5–6', name: 'Extras + Agent', icon: '🧰', description: 'Optional tools and engine' },
        { label: '7', name: 'Finish', icon: '📋', description: 'Copy the prompt for your coding agent', target: true }
      ]
    }),
    S('wizard-intent', 3, 'A concrete prompt lets the coding agent use repository context', {
      scene: 'terminal', pill: 'Recorded source artifacts · not a live run',
      termTitle: 'FanHub wizard prompt → proposed workflow',
      transcript: [
        { type: 'user', text: 'Triage new issues: label language, type, and severity, and comment with cited evidence from the code.' },
        { type: 'response', lines: ['Wizard prompt asks the coding agent to inspect repository conventions first.', 'Presenter added a filename and workflow_dispatch issue_number input.', 'Coding agent draft: .github/workflows/triage-wizard.md', 'Draft includes repository labels, code context, boundaries, and five eval questions.'] },
        { type: 'divider' },
        { type: 'outcome', text: 'The reviewer decides authority; generation does not approve it.' }
      ],
      footnote: 'Recorded artifacts are the fallback. No new wizard or repository run is claimed in this deck.'
    }),
    S('narrow-draft', 3, 'The reviewer narrows the generated draft at four authority decisions', {
      scene: 'signals', pill: 'Generated artifact vs reviewer choice',
      rows: [
        { label: 'allowed', description: 'Use FanHub’s existing 12-label taxonomy; do not create labels', tag: 'allowlist', z: 'purple' },
        { label: 'max + target', description: 'One label batch, at most 6 labels; one comment on selected issue', tag: 'scope', z: 'green' },
        { label: 'staged', description: 'Generated lock has staged mode off; add staged: true for first runs', tag: 'preview', z: 'orange' },
        { label: 'Trust + eval', description: 'Own roles: all, min-integrity: none, and contents: write for eval state', tag: 'review authority', z: 'orange' }
      ],
      footnote: 'Generated file contains the first choices; staging and approval are reviewer actions, not observed wizard behavior.'
    }),
    S('refine-first-loop', 3, 'Compile, run staged, and promote only after representative previews match', {
      scene: 'terminal', pill: 'First loop · bounded promotion',
      termTitle: 'review → compile → inspect',
      transcript: [
        { type: 'prompt', text: '/agentic-workflow optimize it' },
        { type: 'response', lines: ['Reviewer rereads the diff; keep a refinement that leaves authority the same or smaller.', 'gh aw compile triage-wizard', 'Commit the .md source and .lock.yml together; push.', 'gh workflow run triage-wizard.lock.yml -f issue_number=202'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Run Summary preview → compare with maintainer judgment → repeat on several issues.' }
      ]
    }),
    S('part-4', 4, 'Run and Troubleshoot', {
      scene: 'opener',
      subtitle: 'Read the work, measure usefulness, and repair the owning contract block.',
      cards: [
        { icon: '👀', title: 'Inspect the output', blurb: 'Run status is not domain success' },
        { icon: '📊', title: 'Compare evidence', blurb: 'Evals, Outcomes, cost, and logs' },
        { icon: '🧭', title: 'Recover deliberately', blurb: 'Trace symptom to contract block' }
      ],
      terminal: { context: 'Observed FanHub evidence · gh-aw v0.92.6', detail: 'Run status · actual output · maintainer acceptance' }
    }),
    S('where-to-look', 4, 'Summary, audit, and logs answer different run questions', {
      scene: 'relay', pill: 'Run evidence',
      columns: [
        { icon: '🧾', title: 'Run Summary', description: 'Did the work happen?', items: ['preview or actual output', 'read labels, comment, issue, PR', 'honest stop says what is missing'], z: ['local', 'green', 'orange'] },
        { icon: '🔬', title: 'gh aw audit', description: 'Why did this run do that?', items: ['jobs, model, tokens, credits', 'tool calls and filtered reads', 'safe outputs; compare runs'], z: ['local', 'purple', 'green'] },
        { icon: '📊', title: 'gh aw logs', description: 'Which workflows cost most over time?', items: ['tokens, credits, turns', 'add --json for filtering', 'review a 30-day window'], z: ['local', 'purple', 'orange'] }
      ]
    }),
    S('cost-and-value', 4, 'Caps bound spend; Outcomes and evals measure different value signals', {
      scene: 'signals', pill: 'Cost + usefulness',
      rows: [
        { label: 'Per run', description: '1,000 AIC default; 500 turns; job timeouts', tag: 'cost guide', z: 'local' },
        { label: 'Per workflow/day', description: '5,000 AIC default; a cap can skip the agent job', tag: 'lock confirms', z: 'purple' },
        { label: 'Evals', description: 'Second-model instruction checks; 400 AIC default cap', tag: 'experimental', z: 'orange' },
        { label: 'Outcomes', description: 'Repository state tells whether people kept outputs', tag: 'accepted result', z: 'green' }
      ],
      footnote: '1 AIC = $0.01. Actions minutes also cost; compare within one workflow, not across different credit calculations.'
    }),
    S('evals', 4, 'Evals check whether the output followed declared instructions', {
      scene: 'terminal', pill: 'BinEval answers · illustrative, not observed',
      termTitle: 'triage-wizard · example run summary',
      transcript: [
        { type: 'response', lines: ['operational_value       YES', 'language_classification YES', 'type_classification     YES', 'severity_classification UNKNOWN', 'code_citations          NO'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Illustrative tally only: YES 3 · NO 1 · UNKNOWN 1' }
      ],
      footnote: 'A NO points to an instruction to verify in the output; UNKNOWN is not a NO. Evals and graders are experimental.'
    }),
    S('outcomes', 4, 'FanHub Outcomes accepted both safe outputs in the recorded run', {
      scene: 'terminal', pill: 'Observed evidence · run 39669929991',
      termTitle: 'gh aw outcomes 39669929991 --repo MSBart2/FanHub',
      transcript: [
        { type: 'response', lines: ['add_labels  #202  accepted (label addition retained)', 'add_comment       accepted (0 reactions, 1 replies)', 'Acceptance: 2/2 (100%)', 'Zero-touch: 0/2 (0%)'] },
        { type: 'divider' },
        { type: 'outcome', text: 'AIC per accepted outcome: 0.810' }
      ],
      footnote: 'Observed output from gh-aw v0.92.6; this is Outcomes’ credit measure, not the audit’s 1.22 AIC.'
    }),
    S('troubleshoot', 4, 'Trace each symptom to the contract block that owns its fix', {
      scene: 'signals', pill: 'Recovery map',
      rows: [
        { label: 'Unsupported model', description: 'Pin a model available to the organization', tag: 'engine', z: 'purple' },
        { label: 'Filtered reads', description: 'Inspect integrity level; record any exception owner and review date', tag: 'tools.github', z: 'orange' },
        { label: 'Package restore fails', description: 'Allow the required package ecosystem in network policy', tag: 'network', z: 'remote' },
        { label: 'Strict compile', description: 'Read diagnostic and add the named explicit control', tag: 'source', z: 'local' },
        { label: 'CI detects lock drift', description: 'Recompile and commit source and lock together', tag: 'lock', z: 'green' },
        { label: 'Trigger denied', description: 'Check exact-match actor role against roles', tag: 'on.roles', z: 'orange' }
      ],
      footnote: 'gh-aw is pre-release in the source talk: pin the tested version, read release notes, and recompile after upgrades.'
    }),
    S('boundary', 4, 'Keep the work in another tool when its decision or authority does not fit', {
      scene: 'showdown', pill: 'Boundary',
      leftLabel: 'Use agentic workflow when', rightLabel: 'Choose another path when',
      pairs: [
        { left: { label: 'Recurring judgment', note: 'Event, command, or owner-approved schedule' }, right: { label: 'Deterministic specification', note: 'Keep build, test, lint, deploy in Actions', z: 'local' } },
        { left: { label: 'Small bounded write', note: 'Labels, comment, scoped report' }, right: { label: 'Broadest write is merge', note: 'Branch protection + person keeps authority', z: 'orange' } },
        { left: { label: 'Named reviewer', note: 'Owner can correct or accept the output' }, right: { label: 'No output reviewer', note: 'Name ownership before shipping', z: 'purple' } },
        { left: { label: 'Recurring repository job', note: 'The contract is stable enough to operate' }, right: { label: 'One implementation task', note: 'Delegate to a coding agent instead', z: 'green', optional: true } }
      ],
      outcomeLeft: { icon: '✓', label: 'Bounded judgment fits' },
      outcomeRight: { icon: '↪', label: 'Route to the fitting tool' },
      footnote: 'A team unable to absorb pre-release change can begin with a staged, read-mostly report.'
    }),
    S('adoption-ladder', 4, 'Start with a prompt, then test and narrow against real issues', {
      scene: 'four-phases', pill: 'Transfer ladder',
      stageLabel: 'Time box',
      gateLabel: 'inspect evidence',
      stages: [
        { label: '15 min', name: 'Choose', icon: '🪄', description: 'Run the wizard for one backlog task; apply the five-question checklist.' },
        { label: '1 hour', name: 'Preview', icon: '🎭', description: 'In a test repo, compile with staged mode; read preview and audit.' },
        { label: '2–4 hr', name: 'Pilot', icon: '🧪', description: 'Try staged triage on 10 issues; compare to maintainer decisions.', target: true }
      ]
    }),
    S('fanhub-202', 4, 'FanHub #202 moved from an issue report to evidence-backed triage', {
      scene: 'before-after', pill: 'Observed · /triage on gh-aw v0.92.6',
      before: [
        'Issue #202: episodes wrong after page load',
        'Which language, type, and severity?',
        'Does issue #7 describe the same defect?'
      ],
      after: [
        'lang:node · bug · severity:medium · duplicate',
        'Code cite: frontend cache overwrite',
        'Maintainer closed #202; assigned #7'
      ],
      metrics: [
        { value: '6 / 6', detail: 'jobs passed · run status' },
        { value: '1.22 AIC', detail: 'gh aw audit · run cost' },
        { value: '2 / 2', detail: 'outputs accepted · Outcomes' }
      ],
      footnote: 'Audit and Outcomes calculate credits differently. The observed /triage run is a sibling of the triage-wizard teaching artifact.'
    }),
    S('today', 0, 'Apply the decision to one real repository chore', {
      pill: 'Take it back to your repo',
      subtitle: 'Start narrow. Keep a person responsible for reviewing the output.',
      horizons: [
        { icon: '📝', label: 'Today', z: 'green', items: ['Pick one recurring issue or report.', 'Write the judgment, initiator, and smallest write.', 'Review the wizard prompt before copying it.'] },
        { icon: '🎭', label: 'This week', z: 'local', items: ['Build in a test repository.', 'Compile and enable staged mode.', 'Compare preview with maintainer judgment.'] },
        { icon: '📊', label: 'This month', z: 'purple', items: ['Pilot on representative issues.', 'Collect audit, outcomes, and corrections.', 'Pause if writes exceed the accepted boundary.'] }
      ],
      takeaway: 'Keep, narrow, or stop based on observable output and a named reviewer.'
    }),
    S('references', 0, 'Primary references and recorded artifacts', {
      pill: 'Evidence map',
      groups: [
        { icon: '📘', title: 'Start and choose', z: 'local', items: [
          { label: 'gh-aw overview', description: 'Concepts and lifecycle', href: SRC.overview.href },
          { label: 'IssueOps pattern', description: 'Issue triage example', href: SRC.issueOps.href },
        ] },
        { icon: '🛡️', title: 'Read and constrain', z: 'purple', items: [
          { label: 'Architecture', description: 'Security layers', href: SRC.architecture.href },
          { label: 'Frontmatter', description: 'Triggers, tools, outputs', href: SRC.frontmatter.href },
        ] },
        { icon: '📊', title: 'Measure and recover', z: 'green', items: [
          { label: 'Cost management', description: 'Credits and limits', href: SRC.costs.href },
          { label: 'Outcomes', description: 'Accepted output evidence', href: SRC.outcomes.href },
        ] },
        { icon: '🧪', title: 'FanHub evidence', z: 'orange', items: [
          { label: 'Issue #202', description: 'Observed report and outcome', href: SRC.fanhubIssue.href },
          { label: 'Run 39669929991', description: 'Audit and Actions run', href: SRC.fanhubRun.href },
        ] }
      ]
    }),
    S('thanks', 0, 'GitHub Agentic Workflows', {
      scene: 'thanks', chrome: false, visual: 'closing-contract',
      subtitle: 'Pick the chore. Narrow the authority. Judge the evidence.',
      cards: [
        { value: 'Recurring', detail: 'Is there a real repeated task?' },
        { value: 'Bounded', detail: 'What is the smallest useful write?' },
        { value: 'Reviewable', detail: 'Who checks the result?' }
      ],
      prompt: 'Which chore in your repository passes all three tests?'
    })
  ];

  const NOTES = {
    title: {
      seconds: 25, sources: [SRC.home, SRC.overview],
      notes: [
        `"A maintainer's repository already has dependable CI for builds, tests, and deployments. The remaining opportunity is recurring work that needs someone to read and judge."`,
        `Point at the source → lock → audit chain. The picture previews the central claim: make the authority readable and inspect it at each stage.`,
        `"We'll choose a chore first, then read the contract and the evidence it produces."`
      ],
      know: [
        `GitHub Agentic Workflows, or gh-aw, runs agent workflows inside GitHub Actions. The source talk describes the product as pre-release and says its shown FanHub runs used gh-aw v0.92.6; the README recorded v0.93.0 on its update date. Recheck release status before a future delivery.`
      ]
    },
    'core-question': {
      seconds: 65, sources: [SRC.overview, SRC.issueOps, SRC.costs],
      notes: [
        `"Which repository chores fit an agent, and how do you keep it in bounds? That is the maintainer's decision."`,
        `Point across the three decision chips: recurrence creates a reason to automate; judgment explains why a model adds value; the bounded write keeps authority reviewable.`,
        `"Choose one recurring chore, then grant only the writes it needs."`,
        `Use the cards as concrete examples: classify a new issue, summarize a repository, or scope research into issues. They need different initiators and outputs.`
      ],
      know: [
        `The README question is preserved verbatim from the approved long-form talk. The thesis is that the workflow is a readable contract: frontmatter grants authority, safe outputs are the only write path, and the source, lock, and audit expose the chain.`,
        `The three roles shown here simplify the full actor model. The next actor slide distinguishes contract owner, requester, agent, safe-outputs job, and maintainer.`
      ]
    },
    contents: {
      seconds: 25,
      notes: [
        `"We will make the decision in four steps: choose the chore, read the contract, build and narrow one, then judge the evidence."`,
        `The opener links go to slides 4, 12, 20, and 25.`
      ]
    },
    'part-1': {
      seconds: 20, sources: [SRC.faq, SRC.costs],
      notes: [
        `"Start with the task, not the product. We want recurring work that needs judgment and ends in a small write."`,
        `→ First, compare that work with scripts and direct model writes.`
      ]
    },
    otherwise: {
      seconds: 100, sources: [SRC.overview, SRC.architecture, SRC.costs],
      notes: [
        `"A free-text issue can name a symptom without naming a file or a label. A keyword rule cannot reliably decide whether it is a bug, duplicate, or question."`,
        `Walk the left and right columns together. An agent can read the report, relevant code, and open issues; its proposal goes to a separate safe-outputs job with scoped permissions.`,
        `"Keep the cost comparison qualitative here. A workflow runs on an event or schedule under credit caps, and a maintainer still chooses what happens next."`
      ],
      know: [
        `The source talk intentionally avoids a general dollar comparison: maintainer attention varies by repository. Gather local run audit and Outcomes evidence instead.`,
        `The security tension is that a model step holding a write token can be steered by untrusted text. gh-aw separates agent reasoning from writes, isolates credentials, and limits the network. The architecture slide and section 2 explain the controls.`
      ]
    },
    'three-part-test': {
      seconds: 90, sources: [SRC.faq, SRC.costs, SRC.overview],
      notes: [
        `"Use three checks: does the job recur, does it need judgment a script cannot supply, and does a small bounded write deliver the value?"`,
        `Ask the room to sort three tasks. Run tests on every push in GitHub Actions. Delegate one implementation task to a coding agent. Use an agentic workflow to classify every new issue with a small label-and-comment output.`,
        `"If one condition is missing, keep the job in Actions or choose a coding agent."`
      ],
      know: [
        `The test is the talk's decision model, not an official product checklist. It synthesizes the README's toolbox distinction and IssueOps use case.`,
        `Example quick sort: test suite → Actions; implement a planned issue → Copilot cloud agent; triage every new issue → agentic workflow.`
      ]
    },
    'use-cases-react': {
      seconds: 105, sources: [SRC.issueOps, SRC.chatOps, SRC.labelOps, SRC.triggers, SRC.commands],
      notes: [
        `"When a person or event starts the work, pair that trigger with the smallest write that delivers value."`,
        `IssueOps: a new issue starts a contextual read; the illustrative example allows up to three labels from bug, enhancement, question, plus one comment.`,
        `ChatOps: the person types a role-gated command such as /review; the example allows up to five review comments and one summary comment. LabelOps uses a person-applied label as a checkpoint for a stage.`,
        `"The initiator matters: the requester, command author, or label applier chooses when the agent acts."`
      ],
      know: [
        `DispatchOps is another manual-start option for on-demand research, regenerating reports, or testing before a real trigger. The README contains the broader pattern catalog.`,
        `roles is an exact-match repository-role allowlist and defaults to admin, maintainer, and write according to the linked trigger docs.`
      ]
    },
    'use-cases-scheduled': {
      seconds: 105, sources: [SRC.queues, SRC.researchPlan, SRC.home, SRC.triggers],
      notes: [
        `"Schedules and queues fit when repeated reading creates a useful, bounded result."`,
        `A digest can summarize many issues or runs into one prefixed issue and close an older digest. WorkQueueOps handles one claimed item at a time; BatchOps handles parallel or chunked volume with aggregation.`,
        `ResearchPlanAssignOps keeps the handoff visible: a workflow researches and scopes tasks, then a developer assigns work to Copilot and reviews the result.`,
        `"For your own task, name the judgment, the initiator, and the smallest write. Those answers become wizard inputs."`
      ],
      know: [
        `Natural-language schedules such as daily around 9:00 are fuzzy. The compiler assigns each workflow a deterministic time to spread runs; do not promise an exact minute from the natural-language phrase.`,
        `The README catalog includes MonitorOps, OrchestratorOps, MultiRepoOps, CentralRepoOps, MemoryOps, ProjectOps, FeatureOps, SpecOps, and DeterministicOps. They are references, not extra decisions to memorize here.`
      ]
    },
    'agent-factory': {
      seconds: 75, sources: [SRC.factory, SRC.meet, SRC.home],
      notes: [
        `"GitHub describes its Agent Factory as more than one hundred workflows built and operated on the gh-aw team's own repositories."`,
        `Attribute the Repo Assist figures as GitHub-published: 13 open-source repositories, 578 issues closed, and a median eight-times-faster closure claim.`,
        `"Treat that as evidence of what the team reports running, not a forecast for your repository. Measure your own accepted outcomes."`
      ],
      know: [
        `The published Repo Assist figures are on the gh-aw docs home and its blog. The talk does not treat them as independently observed local results.`,
        `The factory spans triage, CI failure diagnosis, documentation upkeep, test coverage, security compliance, workflow efficiency, multi-day projects, and team-morale writing. Some workflows are read-only, others propose pull requests, and some monitor other workflows.`
      ]
    },
    'issueops-flow': {
      seconds: 135, sources: [SRC.issueOps, SRC.researchPlan, SRC.cloud, SRC.fanhubLifecycle],
      notes: [
        `"IssueOps gives a maintainer a small first decision: the agent reads a new issue, proposes up to three allowlisted labels and one evidence-backed comment, and a person decides what follows."`,
        `A maintainer can compare the agent's labels with their own judgment over the next week. This is a practical first pilot because issues already arrive and labels are reversible.`,
        `A /plan command can create at most five plan issues with a parent tracker. Each issue states an objective, files to touch, steps, and acceptance criteria.`,
        `"A person then chooses implementation: a cloud coding agent for most teams, or a workflow for every stage when each transition needs its own authority record."`
      ],
      know: [
        `The plan example sets title-prefix [plan], labels [plan, ai-generated], max: 5, and group: true. Each stage still requires its own review model.`,
        `ResearchPlanAssignOps is the documented workflow → research → plan → assign pattern. Implementation is an iterative cloud-agent session that can respond to review; tests run in its session and CI remains the deterministic gate.`,
        `FanHub's lifecycle pilot is a distinct example: issue #110 moved through four label-triggered workflows to draft PR #193. It recorded an incorrect build command, a network adjustment for package restore, and a repository setting change. The PR remained a draft awaiting a maintainer.`
      ]
    },
    'cloud-agent-handoff': {
      seconds: 110, sources: [SRC.researchPlan, SRC.cloud, SRC.fanhubLifecycle],
      notes: [
        `"A person owns the transition from planning to implementation. The workflow never makes the merge decision."`,
        `Compare the two shapes. One workflow per stage records narrow authority for audit-heavy environments. The other keeps research and planning in workflows, then assigns implementation to the Copilot cloud agent; the docs present that as the fit for most teams.`,
        `"In both cases, a person reviews and merges. CI remains the deterministic check."`
      ],
      know: [
        `The cloud agent handoff can use assignees: copilot on create-issue or assign-to-agent for existing issues. The source README says these require a fine-grained PAT.`,
        `Shape A uses a label at each handoff, for example plan-requested, implement-approved, and review-requested. Shape B has fewer files and an iterative implementation session.`
      ]
    },
    'part-2': {
      seconds: 20, sources: [SRC.frontmatter, SRC.architecture],
      notes: [
        `"Now read one real workflow as a contract: the source declares the authority, the lock implements it, and the run audit shows what happened."`,
        `→ Start by naming the actors who own each handoff.`
      ]
    },
    'who-acts': {
      seconds: 75, sources: [SRC.overview, SRC.outputs],
      notes: [
        `"The contract owner writes and reviews the rules. A requester starts a run. The agent reads and proposes; the safe-outputs job applies only the declared write; a maintainer decides what happens next."`,
        `Point along the columns. Keep the agent and the job distinct: the agent does not directly apply repository writes.`,
        `"That separation is what the frontmatter and lock make inspectable."`
      ],
      know: [
        `The contract owner is commonly a maintainer or platform engineer accountable for triggers, writes, spend, and recovery. The requester can be a person opening an issue, posting a command, or applying a label.`
      ]
    },
    frontmatter: {
      seconds: 135, sources: [SRC.frontmatter, SRC.triggers, SRC.commands, SRC.engines, SRC.tools, SRC.network, SRC.integrity, SRC.costs, SRC.exampleSource],
      notes: [
        `"Read this frontmatter as five questions: who starts it; what can it read; what can it call or reach; what can it write; and what stops a runaway?"`,
        `The real FanHub example triggers on issues opened or a manual issue_number input. roles: all accepts any reporter. It reads repository content and issues, uses the Copilot engine, turns file editing off, scopes GitHub tools to issues and repos, and declares no outbound domains.`,
        `"Two values deserve a deliberate review: roles: all and min-integrity: none. They let any reporter start the workflow and allow reads regardless of author trust. The remaining controls contain that choice."`,
        `Point to the timeout and safe outputs. The example's 10-minute timeout is explicit; credit and turn defaults appear in the compiled lock.`
      ],
      know: [
        `The full example includes workflow_dispatch with issue_number. The target expression is the triggering issue number or the supplied input. The workflow validates it and calls noop for invalid, inaccessible, closed, or pull-request targets.`,
        `roles defaults to [admin, maintainer, write] and is an exact-match list. Triaging public issues requires a deliberate exception if reporters without write access must be included.`,
        `The generated triage-wizard source has contents: read, issues: read, and copilot-requests: write. That last permission bills inference to the organization's Copilot plan; the agent job remains read-only for repository writes.`,
        `Copilot is the default engine. Other documented engines include Claude Code, OpenAI Codex, Pi, and experimental Google Antigravity; Gemini CLI is deprecated in favor of Antigravity. Pin a model if availability and priceability matter.`,
        `GitHub tools expose read-only toolsets; bash is an authored allowlist; edit can modify the workspace and must pair with a pull-request path. Web tools, Playwright, memory, and MCP expand context or reach and need a task-based reason.`,
        `Omitting network means defaults, not no egress. The example's allowed: [] is deliberately tighter. Provider-hosted web tools use a separate policy.`
      ]
    },
    'workflow-body': {
      seconds: 100, sources: [SRC.exampleSource, SRC.frontmatter, SRC.outputs],
      notes: [
        `"The body describes the judgment: inspect relevant code, classify from evidence, and defer what the evidence cannot establish."`,
        `Read the representative input and output side by side. The body limits initial inspection to ten relevant files, classifies language by implementation ownership, and asks for a commit-pinned code permalink.`,
        `"If the body asked the agent to close the issue, this contract still has no close-issue safe output. The frontmatter, not the prose, grants the write."`
      ],
      know: [
        `The actual workflow body also tells the agent to check repository labels, preserve existing labels, avoid conflicting classifications, avoid scanning the backlog on a manual run, and not treat known workshop-bug catalog entries as proof of a current defect.`,
        `Severity is based on demonstrated impact; critical is not inferred from alarming wording. If the evidence is insufficient, the workflow defers classification and asks for missing reproduction details.`,
        `A code permalink needs a commit SHA and line anchor. The allowlist is repeated in the body to guide selection, but safe-outputs enforcement does not depend on the prose.`
      ]
    },
    'compile-lock': {
      seconds: 130, sources: [SRC.cli, SRC.architecture, SRC.exampleLock, SRC.frontmatter],
      notes: [
        `"The source declares the contract, the lock implements it, and the audit shows what the run did. Review all three."`,
        `The real FanHub lock for this example was compiled by gh-aw v0.92.6 in strict mode. It expanded roughly 200 source lines to about 2,400 lock lines and seven jobs.`,
        `Point to the permission boundary: agent, detection, and evals jobs run models but have read-only repository access. safe_outputs applies issue writes without a model. activation and conclusion handle workflow status; push_evals_state stores eval state and has contents: write.`,
        `"Commit source and lock together. CI can recompile and reject drift; reviewers inspect the lock when permissions change or the extension upgrades."`
      ],
      know: [
        `The lock shows GH_AW_INFO_STAGED false and an empty allowed-domain list. Its daily AIC setting defaults to 5,000, unless a repository or organization variable overrides it.`,
        `The seven jobs are activation, agent, detection, evals, safe_outputs, conclusion, and push_evals_state. Agent, detection, and evals request model inference; the other jobs do not.`,
        `CI recompilation is part of the review path. The source and lock must land in one commit so the generated implementation matches the reviewed intent.`
      ]
    },
    'safe-outputs': {
      seconds: 100, sources: [SRC.outputs, SRC.exampleSource],
      notes: [
        `"The agent proposes. A separate job applies only the output types, targets, allowlists, and limits in safe-outputs."`,
        `Read the example values: one label operation with at most six labels from a fixed twelve-label taxonomy, and one comment on the selected issue. Neither can target a pull request.`,
        `"When the agent cannot finish, noop, report-missing-tool, and report-missing-data are useful results rather than hidden failures."`
      ],
      know: [
        `The safe-output catalog includes issue and discussion writes, pull requests, labels and reviews, projects and releases, agent handoff, and workflow chaining. Each output type has its own supported controls such as max, allowed, target, title-prefix, labels, draft, or expires.`,
        `The example's safe-outputs are not staged in the committed source. Staging appears as an explicit reviewer change in Part 3; do not mistake the illustrative staged snippet for the real source artifact.`
      ]
    },
    'staged-mode': {
      seconds: 100, sources: [SRC.staged, SRC.outputs],
      notes: [
        `"Staged mode runs the workflow, then replaces built-in safe-output writes with previews in the Actions Summary."`,
        `Show the evidence: one preview per output type and a final line stating that no GitHub resources were created. The preview format pictured is from the docs; it is not a recorded FanHub triage preview.`,
        `"To promote, remove staged: true, recompile, and push after the previews match maintainer judgment."`
      ],
      know: [
        `Staging can be enabled in the safe-outputs block or with gh aw compile --staged. The normal event still starts the workflow; there is no separate human approval button or pause built into staged mode.`,
        `Staged mode covers built-in safe outputs. Custom jobs, scripts, external MCP servers, and memory persistence need separate controls.`
      ]
    },
    'hostile-issue': {
      seconds: 100, sources: [SRC.architecture, SRC.integrity, SRC.network, SRC.outputs],
      notes: [
        `"Treat issue text as untrusted evidence. If it asks the agent to post secrets, send code away, or close every issue, the contract has several independent barriers."`,
        `Point to each row: integrity filtering limits which content reaches the agent; credential isolation keeps tokens outside; the firewall controls egress; safe outputs limit writes; threat detection scans proposed outputs.`,
        `"The agent is also sandboxed and read-only. The trust setting and declared writes are human choices; the other layers are part of the system architecture."`
      ],
      know: [
        `The README maps these five controls to documented gh-aw layers. Compile-time validation and sandboxing are additional protections; the network firewall is a separate outbound control.`,
        `The talk's example explicitly sets min-integrity: none, so the public-repository default filter is not doing the work for this workflow. That exception must be accepted and owned deliberately.`,
        `In the source talk, public repositories default to approved integrity, while private/internal repositories need an explicit filter. Check live documentation before future delivery because gh-aw is pre-release.`
      ]
    },
    'part-3': {
      seconds: 20, sources: [SRC.wizard, SRC.examplePrompt],
      notes: [
        `"Now build the running example. The wizard gives us a prompt; a coding agent uses repository context to draft the workflow; a reviewer decides its authority."`,
        `→ First see what the wizard collects.`
      ]
    },
    wizard: {
      seconds: 80, sources: [SRC.wizard, SRC.cli, SRC.experiments],
      notes: [
        `"The wizard asks why and how, when to run, where it may write, which optional capabilities to add, which agent to use, and then gives you a prompt."`,
        `The wizard does not hand you an approved workflow. The prompt goes to a coding agent from the target repository, where that agent can read its labels, code layout, and conventions.`,
        `"Your Part 1 answers map directly: judgment to Why and How, initiator to When, and smallest write to Where."`
      ],
      know: [
        `The seven steps in the source README: Why; How; When; Where; Extras; Agent; Finish. Extras include memory, browser, or workflow introspection.`,
        `Alternative starts include a coding-agent prompt based on gh-aw instructions or the CLI: install the extension, run gh aw init or gh aw new, then compile. gh aw doctor checks auth and repository state; gh aw add-wizard installs a community workflow.`,
        `The wizard asks the coding agent to write an evals block: one operational-value check and two to four checks of observable output properties. Evals and graders are documented as experimental.`
      ]
    },
    'wizard-intent': {
      seconds: 180, sources: [SRC.wizard, SRC.examplePrompt, SRC.exampleSource, SRC.exampleLock],
      notes: [
        `"The intent is concrete: triage new issues by language, type, and severity, and comment with code-cited evidence."`,
        `For the presentation, use the actual saved prompt, generated triage-wizard.md, and compiled lock as a recorded fallback. This slide is not evidence that a fresh live wizard or coding-agent run occurred.`,
        `If you choose to run the wizard live, show the prompt before copying it. The presenter added two instructions: use the filename triage-wizard.md and add workflow_dispatch with an issue_number input.`,
        `"The coding agent can fill in repository-specific context. It still cannot approve its own trigger, trust policy, write limits, or staging choice."`
      ],
      know: [
        `The saved prompt asks the coding agent to read the README, contributing guidance, labels, build/test commands, and CI before writing a workflow. It also asks for explicit boundaries and eval questions.`,
        `The prompt includes a wizard claim that explicit DO NOT constraints make a workflow 61% more likely to be healthy. That is a claim embedded in the prompt, not a measured result in this talk; do not repeat it as independently validated.`,
        `The generated draft's intent has five evals: operational_value, language_classification, type_classification, severity_classification, and code_citations. The example source is a teaching artifact and has not run in FanHub.`
      ],
      cue: [
        `Optional live route: open the wizard and enter the exact intent shown. If it stalls or network access is unavailable, use examples/example-flow-prompt.md as the recorded prompt, then point to examples/triage-wizard.md and its lock.`,
        `Do not claim a new PR or workflow run. The saved files are the demonstration artifact; no live generation was performed for this conversion.`
      ]
    },
    'narrow-draft': {
      seconds: 135, sources: [SRC.exampleSource, SRC.exampleLock, SRC.frontmatter, SRC.staged],
      notes: [
        `"The coding agent filled in repository detail. The reviewer still decides who may trigger it, which content it may trust, and whether writes happen immediately."`,
        `First narrow the output: use existing labels only; cap the label batch at six; target the selected issue; allow one comment; do not enable pull-request writes.`,
        `Then make staging explicit for early runs. The saved lock records staged mode off, so the generated artifact would write immediately if run as-is.`,
        `"Finally, own roles: all with min-integrity: none and the contents: write permission used to persist eval state. These are authority decisions, not formatting."`
      ],
      know: [
        `In the example, add-labels max: 1 means one label operation, while max-labels: 6 limits how many labels that operation may apply. The 12-label allowlist covers four language tracks, four issue types, and four severity levels.`,
        `The target is the triggering issue number or workflow_dispatch input. pull-requests: false and create-if-missing: false prevent a PR target and accidental label creation.`,
        `Evals add push_evals_state, which stores evals.jsonl to an evals/triagewizard branch. That job uses contents: write but does not run a model.`,
        `The source example sets roles: all and min-integrity: none. Review it as a deliberately broad trust choice contained by no outbound network, edit: false, and bounded safe outputs.`
      ]
    },
    'refine-first-loop': {
      seconds: 105, sources: [SRC.cli, SRC.exampleSource, SRC.staged],
      notes: [
        `"Refine with the gh-aw skill, then reread the diff. Keep a pass only when it preserves or reduces the contract's authority."`,
        `Compile with gh aw compile triage-wizard. Commit the Markdown and lock together, then run issue 202 through workflow_dispatch.`,
        `"Read the staged preview and compare it with a maintainer's judgment across several real issues. Remove staging only when that evidence supports promotion."`
      ],
      know: [
        `Example sequence from the source README: /agentic-workflow optimize it; gh aw compile triage-wizard; git add both files; commit; push; gh workflow run triage-wizard.lock.yml -f issue_number=202.`,
        `The command sequence is a documented procedure, not a command executed during this deck conversion. Promotion means removing staged: true, recompiling, and committing the source and lock.`
      ]
    },
    'part-4': {
      seconds: 20, sources: [SRC.outcomes, SRC.costs],
      notes: [
        `"A green workflow run confirms execution; separate evidence tells us whether the output helped. Read the output, inspect one-run evidence, and then measure what people kept."`,
        `→ Three run views answer three different questions.`
      ]
    },
    'where-to-look': {
      seconds: 90, sources: [SRC.cli, SRC.outputs],
      notes: [
        `"The Summary answers whether the output happened. The audit explains one run. Logs show patterns across runs."`,
        `Keep status and outcome separate: a green Actions run means jobs completed; the labels, comment, issue, or pull request show the domain result.`,
        `"An honest stop such as noop or report-missing-data tells you what the agent could not establish."`
      ],
      know: [
        `gh aw audit downloads run artifacts and summarizes jobs, model and token use, AI credits, tool calls, integrity-filtered reads, and safe outputs. Use it on first runs, when a result surprises you, and to compare runs.`,
        `gh aw logs aggregates token, AI-credit, and turn use across runs. Add --json and filter to find expensive workflows, for example across the last 30 days.`
      ]
    },
    'cost-and-value': {
      seconds: 100, sources: [SRC.costs, SRC.outcomes, SRC.exampleLock, SRC.experiments],
      notes: [
        `"Caps bound exposure. Outcomes tell us what repository users kept; evals check whether the run followed instructions."`,
        `The cost guide lists 1,000 AIC per run and 5,000 AIC per workflow per day by default, plus a 500-turn default and job timeouts. The FanHub lock confirms the daily cap and includes a 400-AIC eval cap.`,
        `"Keep these as separate signals. Pair cost with accepted outputs, corrections, honest stops, and the work the workflow actually completed."`
      ],
      know: [
        `One AIC equals $0.01 in the source talk. Actions minutes add a separate cost. Daily defaults can be overridden by repository or organization variables; exceeding the daily cap skips the agent job and reports why.`,
        `Outcomes classifies each safe output using repository state: labels retained, comments reacted to or replied to, issues completed, PRs merged, and agent assignments whose resulting PR merged.`,
        `Outcome efficiency is AIC per accepted outcome. Compare within one workflow across revisions. The audit's AIC total and Outcomes' credit total are calculated differently and are not directly comparable.`,
        `Evals use a separate model and are experimental. A second job grades outputs; a durable eval-state job may have contents: write.`
      ]
    },
    evals: {
      seconds: 140, sources: [SRC.experiments, SRC.graders, SRC.exampleSource, SRC.exampleLock],
      notes: [
        `"Evals ask whether the output met a declared criterion; maintainer feedback shows whether people found it useful."`,
        `The five rows show the saved triage-wizard questions. The answers are illustrative only because this workflow has not run in FanHub. Keep the tally separate from actual run results.`,
        `"Read a NO as a prompt to inspect the output and the corresponding instruction. UNKNOWN leaves the result undecided; the grader may lack enough evidence."`
      ],
      know: [
        `The evals job sends the questions and agent output to a second model, returning YES, NO, or UNKNOWN. Its contents access is read-only and the example lock sets a default cap of 400 AIC per run.`,
        `A BinEval Results table appears in the run Summary, with an eval artifact and an evals.jsonl commit to the evals/triagewizard branch. This is why push_evals_state holds contents: write.`,
        `The rendered table format comes from gh-aw's eval summary renderer. The example answers are fabricated only as an explicitly labelled illustration; triage-wizard has not run in FanHub.`,
        `For the illustrative NO on code_citations, inspect whether the comment contains a repository permalink with commit SHA and line anchor. Confirm the grader read correctly, revise the Comment Contract, and rerun.`,
        `gh aw logs triage-wizard --evals filters to runs with eval results; gh aw audit run-id --evals shows one run. Experiments can compare eval metrics by variant, excluding UNKNOWN. Evals, graders, and experiments remain experimental.`
      ]
    },
    outcomes: {
      seconds: 140, sources: [SRC.outcomes, SRC.fanhubRun, SRC.fanhubIssue],
      notes: [
        `"This is real Outcomes output from FanHub run 39669929991. Both safe outputs were accepted: the labels remained, and a maintainer replied to the comment."`,
        `Point at the evidence and then the numbers: 2/2 accepted, zero-touch 0/2, and 0.810 AIC per accepted outcome.`,
        `"The acceptance comes from repository state, not the agent's self-report. This command is a snapshot; rerun it while items remain pending."`
      ],
      know: [
        `This run used gh-aw v0.92.6. Outcomes checked the run the day after it completed. Labels were still on issue #202; one reply existed on the comment.`,
        `Zero-touch is defined for accepted pull requests without visible human follow-up, so 0% is expected for label and comment outputs.`,
        `The Outcomes command divides its own credit total; do not compare its 0.810 AIC per accepted output directly with the audit's 1.22 AIC. The run did 6/6 jobs successfully and used about six Actions minutes according to the source talk.`,
        `Items may be accepted, rejected, pending, ignored, or unknown. A pending item does not transition automatically in this report; rerun after the review window.`
      ]
    },
    troubleshoot: {
      seconds: 100, sources: [SRC.engines, SRC.integrity, SRC.network, SRC.cli, SRC.release, SRC.exampleLock],
      notes: [
        `"When a run surprises you, trace the symptom to the contract block that owns the decision."`,
        `A model error points to engine.model. Filtered reads point to integrity policy. Package restore points to network permissions. Strict compile errors point to the named missing control; lock drift means compile again and commit both files.`,
        `"Some users unable to trigger the workflow points to the exact role allowlist. Check that before broadening it."`
      ],
      know: [
        `The original README states gh-aw is pre-release. Pin the extension version tested in production, read release notes, recompile every workflow after upgrades, and retest recorded exceptions.`,
        `The source also lists repository settings as the fix when Actions cannot create pull requests. The current example does not declare PR creation, so that symptom belongs to other workflows.`,
        `When the API proxy rejects the model, pin engine.model to a model available to the organization. If package restore fails, add the ecosystem such as dotnet, node, or python to network.allowed.`
      ]
    },
    boundary: {
      seconds: 70, sources: [SRC.faq, SRC.cloud, SRC.release],
      notes: [
        `"Agentic workflows fit recurring judgment with a small result. They stop fitting when the specification is deterministic, the smallest useful write is broad, or nobody owns review."`,
        `A single implementation task belongs with a coding agent. A broad action such as merge stays with a person and branch protection.`,
        `"If the team cannot absorb pre-release changes, start with a staged, read-mostly report—or wait until the operational boundary fits."`
      ],
      know: [
        `The boundary is not a failure. It is a routing decision: choose Actions for deterministic work, a coding agent for one implementation task, or human control for broad authority.`,
        `Name the reviewer before shipping any workflow.`
      ]
    },
    'adoption-ladder': {
      seconds: 60, sources: [SRC.wizard, SRC.staged, SRC.cli],
      notes: [
        `"Start with fifteen minutes: choose a backlog task, generate its prompt, and apply the five-question review."`,
        `This week, compile in a test repository and enable staged mode. This month, compare previews against ten representative issues and narrow the instructions or allowlist where they differ.`,
        `"Remove staging only when the evidence and reviewer agree. A target remains a target until your team collects results."`
      ],
      know: [
        `These 15-minute, one-hour, and 2–4-hour time boxes come from the long README, not measured promises. Actual setup time depends on repository access and review.`,
        `The ten-issue comparison is a proposed pilot scope, not an observed result. The success signal is agreement with maintainer decisions and a bounded correction path.`
      ]
    },
    'fanhub-202': {
      seconds: 120, sources: [SRC.fanhubIssue, SRC.fanhubRun, SRC.fanhubDuplicate, SRC.fanhubWorkflow, SRC.outcomes],
      notes: [
        `"Here is the observed input: issue #202 said the season filter showed the wrong episodes right after the page loaded."`,
        `The /triage workflow applied lang:node, bug, severity:medium, and duplicate, each with a reason; its comment cited the frontend code and identified issue #7 as the same behavior.`,
        `"Read the three evidence boxes independently: all six jobs passed; audit recorded 1.22 AIC; Outcomes later accepted both safe outputs."`,
        `The maintainer closed #202 as a duplicate and assigned #7 to the Copilot cloud agent. The run demonstrates the handoff; it does not prove that the wizard-generated triage-wizard artifact produced these results.`
      ],
      know: [
        `The observed run is on gh-aw v0.92.6 and completed about six minutes after the comment according to the source README. It used about six Actions minutes.`,
        `The running artifact in Part 2 is the wizard-generated triage-wizard.md. This real run used the hand-tuned command-triggered sibling .github/workflows/triage.md. Keep that distinction explicit.`,
        `Audit reports 1.22 AIC, while Outcomes reports 0.810 AIC per accepted outcome. These are different credit calculations, not contradictory prices.`,
        `FanHub also piloted a four-stage lifecycle from issue #110 to draft PR #193. It recorded workflow fixes and environment constraints, and the PR remained a draft awaiting a maintainer.`
      ]
    },
    today: {
      seconds: 90, sources: [SRC.wizard, SRC.staged, SRC.outcomes, SRC.costs],
      notes: [
        `"Take one recurring task from your repository. Write down what judgment it needs, who starts it, and the smallest useful write."`,
        `Today, review the wizard prompt like a ticket. This week, build in a test repository and inspect staged output. This month, collect audit, Outcomes, and maintainer corrections across representative cases.`,
        `"Keep, narrow, or stop based on the output and a named reviewer. Which task in your repository passes all three tests?"`
      ],
      know: [
        `Apply the five-question checklist in the workflow pull request: who starts it; what it reads; what it can call or reach; what it can write and how much; what stops a runaway.`,
        `Expected evidence is a staged preview that matches a maintainer's judgment, a compiled lock consistent with source, and later accepted Outcomes. These are evaluation signals, not promised metrics.`,
        `Pause or redirect if the output exceeds its declared boundary, evidence is weak, no reviewer owns the result, or the task is deterministic.`
      ]
    },
    references: {
      seconds: 30, sources: [SRC.home, SRC.architecture, SRC.frontmatter, SRC.outcomes],
      notes: [
        `"These primary references support the product behavior and the FanHub case. Each teaching slide also links to the evidence behind its specific claim."`,
        `The saved prompt, workflow source, and lock are included with the talk as teaching artifacts.`
      ],
      know: [
        `README frontmatter retains the complete approved reference inventory, including triggers, command triggers, engines, tools, network, cloud-agent outputs, integrity, CLI, FAQ, and FanHub lifecycle artifacts.`
      ]
    },
    thanks: {
      seconds: 15, sources: [SRC.home],
      notes: [
        `"Choose the chore, narrow its authority, and judge the evidence. Which recurring task in your repository passes all three tests?"`,
        `Leave the final question open for discussion.`
      ]
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'agentic-lifecycle',
      title: 'GitHub Agentic Workflows',
      short: 'Automate the Repository Chores That Take Judgment',
      category: 'tech-talks',
      source: 'tech-talks/agentic-lifecycle/README.md',
      question: 'Which repository chores fit an agent, and how do you keep it in bounds?',
      thesis: 'An agentic workflow is a readable contract: frontmatter grants authority, safe outputs are its only write path, and the source, compiled lock, and run audit expose the authority chain.'
    },
    slides
  };
})();
