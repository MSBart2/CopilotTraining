/*
  Copilot CLI: teaching source and printable handout.
  Evidence reviewed 2026-11-02. Representative traces are scripts, never run logs.
  Distance-first narrative approved 2026-11-03; product verification date unchanged.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });
  const SRC = {
    about: { label: 'About Copilot CLI', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli' },
    use: { label: 'Use Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli' },
    install: { label: 'Install Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli' },
    command: { label: 'CLI command reference', href: 'https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference' },
    plan: { label: 'Plan before you build; steer as you go', href: 'https://github.blog/changelog/2026-01-21-github-copilot-cli-plan-before-you-build-steer-as-you-go/' },
    sandbox: { label: 'Cloud and local sandbox boundaries', href: 'https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes' },
    sandboxGA: { label: 'Local sandboxing GA · October 7', href: 'https://github.blog/changelog/2026-10-07-local-sandboxing-for-github-copilot-now-generally-available' },
    cloud: { label: 'Connected cloud experience GA · October 28', href: 'https://github.blog/changelog/2026-10-28-work-from-anywhere-with-a-new-connected-copilot-cloud-experience' },
    cloudDocs: { label: 'About cloud sandboxes', href: 'https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes' },
    connected: { label: 'Copilot on GitHub', href: 'https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github' },
    models: { label: 'Add models and discover Ollama', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-llm-models' },
    modelNews: { label: 'Discover local models · October 7', href: 'https://github.blog/changelog/2026-10-07-discover-local-models-in-github-copilot-cli' },
    permissions: { label: 'Allowing safe commands', href: 'https://docs.github.com/en/copilot/concepts/customizations/allowing-safe-commands' },
    assisted: { label: 'Assisted permissions GA · October 26', href: 'https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available' },
    managed: { label: 'Managed settings enforcement · October 13', href: 'https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates' },
    workflow: { label: 'Dynamic workflows', href: 'https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows' },
    workflowUse: { label: 'Use dynamic workflows', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-dynamic-workflows' },
    workflowNews: { label: 'Dynamic workflows public preview · October 1', href: 'https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/' },
    schedule: { label: 'Schedule prompts', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts' },
    fleet: { label: 'Parallel tasks with /fleet', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet' },
    remote: { label: 'Steer a session remotely', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely' },
    chronicle: { label: 'Use session data with /chronicle', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle' },
    instructions: { label: 'Add repository instructions', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions' },
    best: { label: 'CLI best practices', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices' },
    releases: { label: 'Official CLI releases', href: 'https://github.com/github/copilot-cli/releases' },
    stable: { label: 'Stable v1.0.105', href: 'https://github.com/github/copilot-cli/releases/tag/v1.0.105' },
    rubberDuck: { label: 'Second opinion with the rubber duck agent', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck' }
  };
  const refs = (...keys) => keys.map(k => SRC[k]);
  const trace = (command, request, lines, result) => [
    { type: 'prompt', text: command }, { type: 'user', text: request },
    { type: 'thinking', label: 'Representative trace · proposed live check' },
    { type: 'response', lines }, { type: 'divider' }, { type: 'outcome', text: result }
  ];
  const pair = (a, an, b, bn, z = 'purple') => ({ left: { label: a, note: an }, right: { label: b, note: bn, z } });

  const slides = [
    S('title', 0, 'GitHub Copilot CLI: Intelligence Within Reach', {
      chrome: false, scene: 'within-reach', subtitle: 'Bring intelligence to the work, and keep the worker within reach.',
      tagline: 'Bring intelligence to the work, and keep the worker within reach.',
      meta: 'CopilotTraining · Practitioner Tech Talk · November 2026'
    }),
    S('core-question', 0, 'How do I get AI help right where I’m working?', {
      pill: 'Core question', subtitle: 'Bring intelligence to the work, and keep the worker within reach.',
      highlight: 'Close a useful distance; verify the result and retain authority.',
      routing: ['worker + work', 'intelligence + data', 'workflow + system', 'now + later'],
      routingLabel: 'Four distances to close',
      roles: [
        { icon: '⌨️', title: 'Developer', description: 'Diagnose a container using the actual listener and logs.' },
        { icon: '⚙️', title: 'Platform engineer', description: 'Inspect a running service within approved host access.' },
        { icon: '🧭', title: 'Practitioner', description: 'Continue useful work across devices and interruptions.' }
      ],
      stats: [
        { title: 'Choose placement', description: 'Model, tools, and steering can live apart.' },
        { title: 'Inspect proof', description: 'Keep the input beside a test or finding.' },
        { title: 'Name authority', description: 'Permission decisions and acceptance differ.' }
      ]
    }),
    S('contents', 0, 'Follow the investigation across four distances', {
      sections: [
        { icon: '⌨️', title: 'Worker ↔ Work', subtitle: 'Ask, inspect, decide here', blurb: 'Use Docker output to choose the next check in the same loop.', slide: 5 },
        { icon: '🔎', title: 'Intelligence ↔ Data', subtitle: 'Reach decisive evidence', blurb: 'Inspect staging logs and select the provider deliberately.', slide: 10 },
        { icon: '⚙️', title: 'Workflow ↔ Running System', subtitle: 'Reason inside the process', blurb: 'Return a CI explanation and save the staging procedure.', slide: 15 },
        { icon: '⏱️', title: 'Now ↔ Later', subtitle: 'Keep useful work in reach', blurb: 'Verify the task, context, or session that carries forward.', slide: 24 }
      ]
    }),
    S('part-1', 1, 'Worker ↔ Work', {
      scene: 'opener', subtitle: 'Keep the developer’s request, Docker evidence, and next decision in one inspectable loop.',
      cards: [
        { icon: '❓', title: 'Developer asks', blurb: 'Investigate the backend' },
        { icon: '🧾', title: 'Copilot inspects', blurb: 'Logs and published port' },
        { icon: '🔎', title: 'Developer decides', blurb: 'Review the next HTTP probe' }
      ],
      terminal: { context: 'Backend container will not start', detail: 'Clarify → inspect → decide' }
    }),
    S('distance-model', 0, 'Choose the gap; inspect what comes closer', {
      scene: 'signals', subtitle: 'What is separated? What brings it closer? What observable result improves?',
      rows: [
        { label: 'Worker ↔ Work', description: 'Ask beside Docker → inspect logs and mapping → choose a probe', tag: 'Next check', z: 'orange' },
        { label: 'Intelligence ↔ Data', description: 'Start on staging → read approved logs → check an aggregate', tag: 'Source + finding', z: 'purple' },
        { label: 'Workflow ↔ System', description: 'CI runs copilot -p → return why.md beside the failed test', tag: 'Proposed why', z: 'local' },
        { label: 'Now ↔ Later', description: 'Continue the same session → verify host, scope, and next step', tag: 'Checked state', z: 'green' }
      ],
      footnote: 'Model location, tool location, continuity, and permission policy remain separate decisions.'
    }),
    S('plan-mode-loop', 1, 'Shape Copilot’s next action beside the task', {
      scene: 'four-phases', subtitle: 'Shift+Tab enters Plan Mode: clarify the backend request before tools act in the same session.',
      stages: [
        { label: '1', name: 'Request', icon: '⌨️', description: 'Developer names the failing backend' },
        { label: '2', name: 'Clarify', icon: '❓', description: 'Copilot asks about evidence and scope' },
        { label: '3', name: 'Review', icon: '✋', description: 'Developer approves or redirects the plan' },
        { label: '4', name: 'Inspect', icon: '🔎', description: 'Tool policy gates actions; developer checks results', target: true }
      ],
      stageLabel: 'Move', gateLabel: 'scope check'
    }),
    S('docker-clarify', 1, 'Copilot asks; the developer chooses logs first', {
      scene: 'terminal', termTitle: 'Docker diagnosis · representative exchange',
      subtitle: 'The developer answers beside the backend task; Copilot returns a smaller, reviewable diagnostic scope.',
      transcript: trace('copilot · Plan Mode', 'Debug why the backend container will not start.', [
        'Copilot: Logs, compose configuration, or both?',
        'Developer: Logs first; inspect configuration if the evidence points there.',
        'Copilot proposes: read backend logs, then compare listener and port mapping.'
      ], 'Review point: approve the diagnostic scope before edits.'),
      footnote: 'Representative script, not a recorded diagnosis.'
    }),
    S('docker-plan', 1, 'Two host outputs bring the next decision into reach', {
      scene: 'docker-investigation',
      subtitle: 'After plan approval, Copilot requests shell tools on the Docker host. No edits are needed yet.',
      checks: [
        { title: '1 · Copilot reads startup logs', command: 'docker compose logs --tail 20 backend',
          output: 'backend | Listening on 0.0.0.0:5000',
          inference: 'Copilot: the log reports a listener, so test reachability next.' },
        { title: '2 · Copilot checks the published port', command: 'docker compose port backend 5000',
          output: '0.0.0.0:5001',
          inference: 'Copilot: the host exposes port 5001; your request used 5000.' }
      ],
      nextCommand: 'curl -i http://localhost:5001/',
      nextDecision: 'Copilot proposes a request on 5001. Inspect the response before calling this fixed.',
      footnote: 'Representative tool trace, not a recorded run. Tool policy still applies; a listener log alone does not prove current health.'
    }),
    S('steer-boundary', 1, 'Redirect Copilot without losing the evidence', {
      scene: 'terminal', termTitle: 'Representative permission request · manual mode',
      subtitle: 'Task intent, tool permission, and result acceptance are three different decisions.',
      transcript: trace('copilot · manual permissions', 'Inspect the generated artifacts; preserve tmp.', [
        'Copilot requests: remove generated files in tmp.',
        'Developer denies the request: those artifacts are evidence.',
        'Developer redirects: list the files and summarize their contents.'
      ], 'Decision: deny deletion; continue the evidence-only task.'),
      footnote: 'Later: assisted mode can resolve eligible requests without asking the human.'
    }),
    S('part-2', 2, 'Intelligence ↔ Data', {
      scene: 'opener', subtitle: 'Bring help to staging evidence; inspect the provider separately from the tools that read it.',
      cards: [
        { icon: '⌨️', title: 'Start on staging', blurb: 'Tools reach approved logs' },
        { icon: '🔎', title: 'Inspect the provider', blurb: 'Know who receives context' },
        { icon: '🧾', title: 'Check the finding', blurb: 'Compare counts with source' }
      ],
      terminal: { context: 'The decisive log lives on the staging host', detail: 'Reach the source → bound the finding → verify' }
    }),
    S('local-model', 2, 'Choose inference placement; verify the endpoint', {
      scene: 'terminal', termTitle: 'Local Ollama · proposed live check',
      subtitle: 'The practitioner inspects the provider and endpoint before selecting a model.',
      transcript: trace('copilot', '/model', [
        'Inspect discovery for an already-running local Ollama service.',
        'Check the endpoint; add a prepared model with tool calling and streaming.',
        'Switch this session; ask it to summarize synthetic repository evidence.'
      ], 'Inspect: selected provider, endpoint, and the answer against the fixture.'),
      footnote: 'Discovery installs neither runtime nor model. Local model ≠ offline mode or telemetry disabled.'
    }),
    S('interactive-diagnosis', 2, 'Run Copilot where the failure happens', {
      scene: 'terminal', termTitle: 'Laptop → SSH → authorized Linux staging host · representative trace',
      subtitle: 'Start the CLI on staging: its shell tools run beside that host’s service and logs.',
      transcript: [
        { type: 'prompt', text: 'ssh ops@staging-host' },
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: 'Staging returns 503. Inspect approved logs; redact secrets; do not edit.' },
        { type: 'thinking', label: 'On staging · Copilot requests an approved shell tool' },
        { type: 'response', lines: [
          'Tool: journalctl -u backend --since "10 minutes ago" --no-pager -n 20',
          'Representative output: backend: connection refused to 127.0.0.1:6379',
          'Copilot: check the configured dependency endpoint next; no fix established.'
        ] }
      ],
      footnote: 'CLI and tools run on staging; inference uses the selected provider. Part 4 adds steering from another device.'
    }),
    S('programmatic-command', 3, 'CI returns a proposed why beside its failed test', {
      scene: 'ci-explanation',
      subtitle: 'GitHub Actions runs copilot -p over the failed test log—before the maintainer opens the job.',
      workflow: [
        '- name: Run tests',
        '  id: tests',
        '  shell: bash',
        '  run: |',
        '    set -o pipefail',
        '    npm test 2>&1 | tee failure.log',
        '- name: Explain test failure',
        "  if: ${{ failure() && steps.tests.outcome == 'failure' }}",
        '  shell: bash',
        '  run: |',
        '    copilot -p "$(printf \'%s\\n\' \\',
        "      'Explain why tests failed. Cite log lines.'; \\",
        '      cat failure.log)" --silent > why.md',
        '    cat why.md >> "$GITHUB_STEP_SUMMARY"'
      ],
      failureEvidence: ['failure.log · representative input', '1  FAIL session-store integration test', '2  ECONNREFUSED 127.0.0.1:6379'],
      explanation: [
        'why.md → Actions job summary',
        'Likely cause: the test cannot reach',
        'its configured dependency (line 2).',
        'Check the CI service and endpoint.',
        'The log does not establish why',
        'that dependency is unavailable.'
      ],
      footnote: 'Workflow excerpt: runner already has dependencies and an authenticated CLI. Synthetic log and explanation; the test job stays failed.'
    }),
    S('authority-boundary', 3, 'Three ways to approve Copilot’s tool requests', {
      scene: 'signals', subtitle: 'Pick a permission mode for the task; check the current one with /permissions show.',
      rows: [
        { label: 'Manual', description: 'The human resolves requests left open by policy', tag: 'Human decides', z: 'orange' },
        { label: 'Assisted · GA', description: 'A review model can approve eligible unresolved requests', tag: 'Model decides', z: 'purple' },
        { label: 'Allow-all', description: 'Broad preauthorization resolves requests within enforced limits', tag: 'Preauthorized', z: 'local' },
        { label: 'Enforced controls', description: 'Deny rules and enterprise restrictions remain effective', tag: 'Policy constrains', z: 'github' }
      ],
      footnote: 'Human acceptance of a consequential result remains separate from tool-request approval.'
    }),
    S('local-containment', 3, 'You approved npm test. The sandbox limits what it spawns.', {
      scene: 'sandbox-tree',
      subtitle: 'With /sandbox enabled, every process the command starts runs inside the same policy.',
      root: { cmd: 'npm test', tag: 'Approved by you' },
      children: [
        { actor: 'jest · test runner', cmd: 'write ./coverage/lcov.info', outcome: 'Allowed', reason: 'Inside the repo', z: 'green' },
        { actor: 'test helper', cmd: 'read ~/.ssh/id_ed25519', outcome: 'Denied', reason: 'Path outside the policy', z: 'local' },
        { actor: 'dependency script', cmd: 'curl https://metrics.example.net', outcome: 'Blocked', reason: 'Destination not allowed', z: 'local' },
        { actor: 'release script', cmd: 'gh auth token', outcome: 'Unavailable', reason: 'Credential withheld', z: 'local' }
      ],
      result: 'Tests run. Nothing reaches beyond the repo.',
      footnote: 'Representative outcomes under an example policy, not a recorded run. OS-level isolation, not a VM; platform limits apply.'
    }),
    S('cloud-containment', 2, 'Bring repository work to cloud; keep host evidence distinct', {
      scene: 'showdown', leftLabel: 'Ordinary CLI session', rightLabel: 'Connected cloud session · GA',
      subtitle: 'copilot --cloud starts interactive cloud work; ordinary CLI execution remains local by default.',
      pairs: [
        pair('Start', 'copilot', 'Start', 'copilot --cloud'),
        pair('Execution', 'Tools use the local or original host environment', 'Execution', 'Tools run in a GitHub cloud sandbox', 'github'),
        pair('Evidence', 'Host files, installed tools, running service state', 'Continuity', 'Snapshots preserve files and in-progress work', 'green'),
        pair('Choose deliberately', 'Keep host-only diagnostics near that host', 'Cloud or Actions', 'Select at start; a change requires a new session', 'orange')
      ],
      outcomeLeft: { icon: '⌨', label: 'Local remains the CLI default' },
      outcomeRight: { icon: '☁', label: 'Cloud has its own access and billing' },
      footnote: 'Cloud is interactive: cannot combine --cloud with -p or -i. Actions-only setup still needs Actions.'
    }),
    S('delegate-cloud', 4, 'Hand off now. Review the PR later.', {
      scene: 'pr-handoff',
      subtitle: 'Delegate a bounded repository task; keep your terminal available while the cloud agent works.',
      request: '& Add input validation to POST /orders. Add tests; open a draft PR. Do not merge.',
      prTitle: 'Validate order quantities before saving',
      diff: ['+ if (!Number.isInteger(quantity) || quantity < 1)', '+   return res.status(400).json({ error: "Invalid quantity" });'],
      evidence: 'Test evidence to inspect: zero and fractional quantities → HTTP 400; valid order → existing behavior.',
      footnote: 'Illustrative handoff and PR, not a recorded run. Inspect local changes, repository access, policy, and billing before delegation.'
    }),
    S('part-3', 3, 'Workflow ↔ Running System', {
      scene: 'opener', subtitle: 'Put reasoning into the process that already has the evidence: failed CI and staging investigation.',
      cards: [
        { icon: '⚙️', title: 'CI asks', blurb: 'Failure log → proposed why' },
        { icon: '📋', title: 'Workflow collects', blurb: 'Fresh staging evidence' },
        { icon: '🔎', title: 'Operator reviews', blurb: 'Source-backed next check' }
      ],
      terminal: { context: 'The running process can ask at the moment it has evidence', detail: 'Collect → reason → return evidence' }
    }),
    S('workflow-reuse', 3, 'Save the investigation, not just the prompt', {
      scene: 'workflow-lesson',
      subtitle: 'A dynamic workflow brings agent reasoning to collected service evidence—and saves the procedure for next time.',
      label: 'USE CASE · THE NEXT STAGING INCIDENT',
      lead: '“The service is failing again. Run our investigation.”',
      detail: 'Keep the collection steps and report format consistent. Let agents interpret the new evidence.',
      steps: [
        { title: '1 · Collect with code', text: 'Read service state and the last 30 log entries on this host.' },
        { title: '2 · Reason with agents', text: 'Investigate process health and an upstream dependency in parallel.' },
        { title: '3 · Return a report', text: 'Bring findings, source evidence, and uncertainty back to the operator.' }
      ],
      takeaway: 'A prompt asks for an outcome. A workflow also defines the steps that produce it.',
      footnote: 'Copilot dynamic workflows · public preview · code lives in an extension. Different from GitHub Actions YAML and gh aw.'
    }),
    S('workflow-definition', 3, 'Describe the process once; Copilot creates the workflow', {
      scene: 'workflow-lesson',
      subtitle: 'Setup on an authorized host: start copilot --experimental, then enter this authoring request.',
      label: 'YOU TYPE IN COPILOT · NATURAL LANGUAGE, NOT YAML',
      command: [
        'Create a project dynamic workflow named staging-investigation.',
        'Collect orders.service state and its last 30 journal entries.',
        'Ask two agents to examine process health and dependency failures.',
        'Return a report with findings, source evidence, and uncertainty.',
        'Use read-only collection; no restarts or edits.',
        'Start with synthetic evidence and a bounded AI credit limit.'
      ],
      steps: [
        { title: 'Copilot creates code', text: 'An extension defines the steps, agent calls, and returned report.' },
        { title: 'You review and keep it', text: 'Inspect commands, data access, and limits. Save as a project extension.' },
        { title: 'Confirm registration', text: 'In a fresh session ask: “What dynamic workflows are available?”' }
      ],
      takeaway: 'Creating a workflow does not run it. Confirm the registered name before use.',
      footnote: 'Documented authoring flow; generated implementation needs review. This talk has not created or run a complete Copilot extension.'
    }),
    S('workflow-code', 3, 'What Copilot writes: one extension.mjs', {
      scene: 'workflow-code',
      subtitle: 'Illustrative output for the request on the previous slide. Review it like any code that runs on your host.',
      path: '.github/extensions/staging-investigation/extension.mjs',
      code: [
        [0, 'import { execFile } from "node:child_process";'],
        [0, 'import { promisify } from "node:util";'],
        [4, 'import { defineWorkflow, joinSession } from "@github/copilot-sdk/extension";'],
        [0, 'const sh = async (...args) => (await promisify(execFile)(...args)).stdout;'],
        [0, ''],
        [4, 'const investigate = defineWorkflow({'],
        [4, '  meta: {'],
        [4, '    name: "staging-investigation",'],
        [4, '    phases: [{ title: "Collect" }, { title: "Analyze" }],'],
        [4, '    limits: { maxAiCredits: 5 }, // the ceiling you confirmed'],
        [4, '  },'],
        [0, '  run: async (ctx) => {'],
        [1, '    const evidence = await ctx.step("collect-v1", async () => ({'],
        [1, '      state: await sh("systemctl", ["show", "orders.service", "-p", "ActiveState"]),'],
        [1, '      logs: await sh("journalctl", ["-u", "orders.service", "-n", "30", "--no-pager"]),'],
        [1, '    }));'],
        [2, '    const findings = await ctx.parallel(["process health", "dependency failures"].map('],
        [2, '      (focus) => () => ctx.agent('],
        [2, '        `Examine ${focus}. Cite log lines; state uncertainty.\\n${JSON.stringify(evidence)}`,'],
        [2, '        { label: focus })));'],
        [3, '    return { evidence, findings, decision: "human review required" };'],
        [0, '  },'],
        [0, '});'],
        [4, 'await joinSession({ workflows: [investigate] });']
      ],
      callouts: [
        [1, 'Collect with code', 'ctx.step runs read-only systemctl and journalctl on this host and journals the result.'],
        [2, 'Reason with agents', 'ctx.parallel starts two ctx.agent calls, one question each, over the same evidence.'],
        [3, 'Return a report', 'The returned JSON is what --result-file saves. A human decides what happens next.'],
        [4, 'What you review', 'Name, limits, imports, and registration. This code runs outside agent tool permissions.']
      ],
      footnote: 'Illustrative, not from a recorded run. API from the workflow guidance bundled with CLI v1.0.105; experimental.'
    }),
    S('rubber-duck', 3, 'Before it touches staging, get a second opinion', {
      scene: 'rubber-duck',
      subtitle: '/rubber-duck sends the work to a critic on a different model family. It reads; it does not edit.',
      askLabel: 'YOU ASK · BEFORE REGISTERING THE WORKFLOW',
      ask: '/rubber-duck Review extension.mjs. Anything unsafe to run on staging?',
      facts: [
        'Critic model contrasts with your session model',
        'Read-only exploration tools; no edits, no commands that change anything',
        'Reports only issues that matter, by severity'
      ],
      critique: [
        { sev: 'blocking', label: 'Blocking', text: 'Raw journal lines go to both agents unredacted. Tokens or customer data in logs would reach the model.', fix: 'Redact before ctx.agent.' },
        { sev: 'major', label: 'Non-blocking', text: 'execFile has no timeout; a hung journalctl stalls the run.', fix: 'Pass a timeout to each command.' },
        { sev: 'major', label: 'Non-blocking', text: 'A failed agent resolves to null and lands in the report silently.', fix: 'Guard findings; report the failure.' },
        { sev: 'minor', label: 'Suggestion', text: 'Findings are free text.', fix: 'Add a ctx.agent schema so the report is checkable.' }
      ],
      summary: 'Copilot: The critique found unredacted logs and missing timeouts, so I added redaction and a 10-second timeout before registering.',
      footnote: 'Representative critique of the extension.mjs example, not a recorded run. Each review is an extra pass on another model.'
    }),
    S('workflow-report', 3, 'Next time, run it and inspect the explanation', {
      scene: 'workflow-lesson',
      subtitle: 'After creation and registration, run the saved workflow on the host that owns the evidence.',
      label: 'YOU RUN · BASH ON STAGING',
      command: [
        'copilot --experimental workflow run staging-investigation \\',
        '  --result-file staging-report.json'
      ],
      report: [
        'EXAMPLE REPORT · SYNTHETIC EVIDENCE',
        'Observed: orders.service is active.',
        'Log: upstream inventory timeout.',
        'Lead: investigate the inventory dependency.',
        'Unknown: why that dependency timed out.',
        'Next check: verify upstream health.'
      ],
      steps: [
        { title: 'Same process, new evidence', text: 'Code repeats the collection; agent findings can change with each run.' },
        { title: 'You choose the next action', text: 'Check the cited logs before accepting the explanation. No automatic repair.' }
      ],
      takeaway: 'Useful for recurring, multi-step investigations. For one log summary, copilot -p is simpler.',
      footnote: 'Invocation assumes a reviewed workflow with defaults for this host. Pregrant required agent permissions; workflow run does not prompt for approval.'
    }),
    S('scheduled-patrol', 4, 'Ship the fix, keep working. Copilot checks back.', {
      scene: 'schedule-timeline',
      subtitle: '/every watches while you move on. /after verifies the fix later, in the same staging session.',
      typedLabel: 'YOU TYPE ONCE · IN THE STAGING SESSION · RIGHT AFTER THE FIX DEPLOYS',
      commands: [
        '/every 5min Check backend: restarts and 503s in the last 5 minutes. Only tell me if it gets worse.',
        '/after 45min Did the 503 come back since 10:00? Count it in the logs and show the command.'
      ],
      start: '10:00 · fix deployed',
      end: '10:45 · /after fires',
      band: 'You work on something else. Eight quiet checks; nothing worth interrupting you.',
      reportLabel: '10:45 · COPILOT REPORTS BACK',
      report: [
        '503s since 10:00: 0   (41 in the 10 minutes before the fix)',
        'backend restarts since 10:00: 0',
        "Evidence: journalctl -u backend --since 10:00 | grep -c ' 503 '  →  0",
        'Holding so far. 45 quiet minutes is evidence, not a guarantee. Your call on closing the incident.'
      ],
      footnote: 'Representative timeline and report, not a recorded run. Experimental; schedules run only while this session stays open.'
    }),
    S('compact-quality', 4, 'After /compact, ask Copilot to restate the task', {
      scene: 'terminal', termTitle: 'Representative post-compaction quality check',
      subtitle: '/context inspects use; /compact carries a lossy summary forward. Check the next plan before acting.',
      transcript: trace('/context → /compact', 'Restate our staging scope and next acceptance check before acting.', [
        'Expected constraints: approved logs only; redact secrets; no remediation.',
        'Expected evidence: cited source output and a service health check.',
        'If a constraint is missing, re-anchor it and inspect the revised plan.'
      ], 'Decision: continue only when the task and proof are recoverable.')
    }),
    S('memory-chronicle', 4, 'Turn session lessons into repo instructions', {
      scene: 'chronicle-improve',
      subtitle: '/chronicle improve finds where Copilot struggled in this repo’s sessions and proposes the instruction that fixes it.',
      pickerLabel: '/chronicle improve · WHAT COPILOT FOUND → WHAT IT SUGGESTS',
      recs: [
        { on: true, found: 'You corrected me 3 times: staging logs are in the journal, not /var/log.', fix: 'Read backend logs with journalctl -u backend.' },
        { on: true, found: 'Tests failed twice because I ran jest; this repo uses vitest.', fix: 'Run tests with npx vitest run.' },
        { on: true, found: 'You stopped me when I proposed restarting staging.', fix: 'Never restart staging; propose the command and stop.' },
        { on: false, found: 'The Nov 3 503 came from an inventory timeout.', fix: 'Treat 503s as inventory timeouts.' }
      ],
      keys: 'space toggles · enter applies · one incident is not a rule',
      file: '.github/copilot-instructions.md',
      diff: [
        '  ## Staging',
        '+ - Backend logs: `journalctl -u backend`.',
        '+ - Never restart staging; propose and stop.',
        '  ## Tests',
        '+ - Run tests: `npx vitest run` (not jest).'
      ],
      after: 'The next session starts already knowing this. Review and commit it like any other change.',
      footnote: 'Representative recommendations, not a recorded run. Scope is limited to this repository’s session history.'
    }),
    S('rewind-recovery', 4, 'Copilot went too far? Rewind to the last good turn.', {
      scene: 'rewind-timeline',
      subtitle: '/rewind undoes the conversation and Copilot’s file changes from later turns, and keeps your own edits.',
      sessionLabel: 'THIS SESSION · FIXING THE 503',
      turns: [
        { state: 'good', ask: 'Fix the timeout handling in the config loader.', did: 'Copilot edited src/config.ts' },
        { state: 'target', ask: 'Add a test for the timeout.', did: 'Copilot edited src/config.test.ts · tests pass' },
        { state: 'undone', ask: 'Also tidy up error handling.', did: 'Copilot rewrote 6 files in src/http/' },
        { state: 'undone', ask: 'Update the callers to match.', did: 'Copilot edited 4 more files · 9 tests fail' }
      ],
      pin: '← rewind here',
      command: ['/rewind', '→ turn 2 · Conversation + files'],
      result: [
        ['CONVERSATION', 'Back to turn 2; turns 3–4 dropped.'],
        ['FILES', 'Copilot’s 10 edits from turns 3–4 undone. Your own edit to README.md kept.'],
        ['VERIFY', 'git status and the test run match turn 2.']
      ],
      aside: 'Still want that refactor? /worktree (experimental) tries it in a separate Git worktree and conversation.',
      footnote: 'Representative session, not a recorded run. Inspect the restored files; Git remains a useful safety net.'
    }),
    S('part-4', 4, 'Now ↔ Later', {
      scene: 'opener', subtitle: 'Keep useful work within reach when time, attention, or device changes. Verify what survives.',
      cards: [
        { icon: '📋', title: 'Procedure or task', blurb: 'Rerun code; review a PR' },
        { icon: '🧾', title: 'Checked context', blurb: 'Retain scope; recover edits' },
        { icon: '🖥️', title: 'Continuing session', blurb: 'Verify host, files, and policy' }
      ],
      terminal: { context: 'Saved procedure ≠ scheduled intent ≠ running session', detail: 'Name what remains → inspect its evidence' }
    }),
    S('remote-locality', 4, 'Walk away from the terminal. Keep steering the session.', {
      scene: 'remote-phone',
      subtitle: '/remote on puts the running session on GitHub.com and GitHub Mobile. Commands still run on the host.',
      termLabel: 'STAGING-HOST · THE SESSION KEEPS RUNNING HERE',
      terminal: [
        ['p', 'ops@staging-host:~$ copilot'],
        ['p', '> /remote on'],
        ['o', 'Remote control on · GitHub.com link shown · Ctrl+O shows a QR code'],
        ['p', '> /keep-alive busy'],
        ['m', 'Copilot: checking the dependency behind the 503…']
      ],
      hostNote: 'Tools, files, and logs stay on staging-host.',
      gap: 'Same session, same GitHub account',
      phoneLabel: 'GitHub Mobile · staging-host',
      phone: [
        { kind: 'copilot', text: 'Backend logs show connection refused to 127.0.0.1:6379. Checking redis next.' },
        { kind: 'ask', title: 'Copilot wants to run', cmd: 'systemctl status redis' },
        { kind: 'you', text: 'Allowed. Read only, no restarts. Then summarize.' }
      ],
      phoneNote: 'You approve and steer from here.',
      footnote: 'Representative session, not a recorded run. Host and session must stay running; synced sessions are view-only until /remote on.'
    }),
    S('walking-incident', 4, 'Back at your desk, the session already has it all', {
      scene: 'remote-return',
      subtitle: 'Everything you did from the phone happened in the host session. Pick up where you left off.',
      termLabel: 'STAGING-HOST · SAME SESSION, 20 MINUTES LATER',
      who: { phone: 'from phone', host: 'on host', copilot: 'copilot', desk: 'at desk' },
      lines: [
        ['phone', 'Allowed: systemctl status redis'],
        ['host', 'redis.service · inactive (dead) since 10:31'],
        ['phone', 'Read only, no restarts. Then summarize.'],
        ['copilot', 'Backend 503s line up with redis down since 10:31. Lead: redis stopped. Unknown: why it exited. Next: check its last log lines.'],
        ['desk', 'Check redis’s last 20 log lines.'],
        ['desk', '/remote off']
      ],
      keptLabel: 'WHAT CARRIED OVER',
      kept: [
        'One session on one host: no context to rebuild',
        'Your phone approvals and instructions, in order',
        'The same permission mode and sandbox throughout',
        '/remote off ends it; /remote shows the status'
      ],
      footnote: 'Representative session, not a recorded run. Exact terminal labels for remote input may differ.'
    }),
    S('host-forensics', 2, 'A day of logs stays put; a finding comes back', {
      scene: 'log-proof',
      subtitle: 'Copilot runs on the log host, questions the data with host tools, and returns what matters.',
      corpus: { size: '~1.8M lines', what: '/var/log/auth.log · last 24 h' },
      steps: [
        { cmd: "grep auth=fail auth.log | grep -o 'user=\\S*' | sort | uniq -c | sort -rn | head -2",
          out: ['412 user=svc-deploy', '  9 user=ci-runner'],
          think: 'One account dominates. Where do its failures come from?' },
        { cmd: "grep 'fail user=svc-deploy' auth.log | grep -oE 'src=([0-9]+\\.){2}[0-9]+' | sort | uniq -c",
          out: ['412 src=203.0.113'],
          think: 'All from one /24. Has that range appeared before?' },
        { cmd: "grep -c 'src=203\\.0\\.113\\.' auth.log.1",
          out: ['0'],
          think: 'New since yesterday’s log.' }
      ],
      finding: [
        ['FINDING', '412 of 430 failures target svc-deploy from 203.0.113.0/24, a range absent from yesterday’s log.'],
        ['UNKNOWN', 'Credential guessing or a misconfigured new client.'],
        ['NEXT CHECK', 'Ask the svc-deploy owner whether a new deployer runs from that range.']
      ],
      footnote: 'Illustrative corpus and outputs, not a recorded run. Only command outputs enter model context, and they reach the selected provider.'
    }),
    S('cloud-continuity', 4, 'Close the laptop. The cloud session keeps going.', {
      scene: 'cloud-relay',
      subtitle: 'copilot --cloud runs the whole session in a GitHub-hosted sandbox. Pick it up from any client.',
      stops: [
        { time: '09:10', device: 'LAPTOP · COPILOT CLI', lines: [
          ['cmd', '$ copilot --cloud'],
          ['you', 'Add retries with backoff to the inventory client. Run the tests.'],
          ['state', 'Running in a cloud sandbox · lid closed']
        ] },
        { time: '12:30', device: 'PHONE · GITHUB MOBILE', lines: [
          ['copilot', 'Retries added. Tests: 42 passed. Diff ready.'],
          ['you', 'Cap retries at 3.'],
          ['state', 'Same session, still running']
        ] },
        { time: '15:00', device: 'ANOTHER MACHINE · GITHUB.COM', lines: [
          ['copilot', 'Capped at 3; tests rerun and pass.'],
          ['you', 'Open a draft PR.'],
          ['done', 'Files and progress intact · PR ready to review']
        ] }
      ],
      compare: [
        ['/remote', 'Your machine runs the work. It must stay on.', 'orange'],
        ['--cloud', 'GitHub’s sandbox runs it. Close the laptop.', 'purple'],
        ['Boundary', 'A cloud sandbox cannot see staging-host or your local files.', 'local']
      ],
      footnote: 'Representative session, not a recorded run. Billed per use (compute, memory, snapshot storage); org policy “Copilot in the cloud” applies.'
    }),
    S('before-after', 0, 'Four distances, four inspectable improvements', {
      before: [
        'Worker ↔ Work: request apart from next check',
        'Intelligence ↔ Data: logs too big to move',
        'Workflow ↔ System: explanation outside CI',
        'Now ↔ Later: remember to check back yourself'
      ],
      after: [
        'Docker outputs → Copilot picks the next probe',
        'A day of logs stays put → cited finding returns',
        'CI runs copilot -p → why.md beside the red test',
        'Ship the fix → /after checks back with evidence'
      ],
      metrics: [
        { value: 'Bring closer', detail: 'Task, source, process, continuation' },
        { value: 'Inspect proof', detail: 'Commands and artifacts, not promised gains' },
        { value: 'Keep authority', detail: 'Permission policy and human acceptance' }
      ]
    }),
    S('today', 0, 'Choose one distance to close in your own work', {
      scene: 'distance-actions',
      horizons: [
        { icon: '⌨️', label: 'Worker ↔ Work', z: 'green', items: [
          'Ask Copilot for two read-only checks beside a runtime task.',
          'Inspect the outputs and choose the next probe.'
        ] },
        { icon: '🔎', label: 'Intelligence ↔ Data', z: 'local', items: [
          'Run Copilot on the host that owns a large log.',
          'Rerun the counts it cites before accepting the finding.'
        ] },
        { icon: '⚙️', label: 'Workflow ↔ System', z: 'purple', items: [
          'Return one bounded CI failure explanation.',
          'Compare why.md with the log; keep the failed test status.'
        ] },
        { icon: '⏱️', label: 'Now ↔ Later', z: 'orange', items: [
          'After your next fix, set one /after check.',
          'Compare its report with the logs it cites.'
        ] }
      ],
      takeaway: 'What evidence would make you keep, adjust, or stop? When the evidence disagrees, stop and re-scope.'
    }),
    S('references', 0, 'References', {
      groups: [
        { icon: '📖', title: 'Core and execution', z: 'local', items: [
          { ...SRC.command, description: 'Commands and switches' },
          { ...SRC.models, description: 'Provider placement and discovery' },
          { ...SRC.workflowUse, description: 'Create, run, and share workflows' },
          { ...SRC.rubberDuck, description: 'Critique from a different model' }
        ] },
        { icon: '🛡️', title: 'Authority and continuity', z: 'orange', items: [
          { ...SRC.permissions, description: 'Permission modes' },
          { ...SRC.sandbox, description: 'Containment and platform limits' },
          { ...SRC.remote, description: 'Steer from GitHub.com or Mobile' },
          { ...SRC.cloudDocs, description: 'Cloud environment and continuity' }
        ] }
      ]
    }),
    S('thanks', 0, 'GitHub Copilot CLI: Intelligence Within Reach', {
      chrome: false, scene: 'within-reach', subtitle: 'Bring intelligence to the work, and keep the worker within reach.',
      prompt: 'Which distance will you close—and what evidence will you inspect?'
    })
  ];

  const NOTES = {
    title: {
      question: 'Why bring AI into the terminal?',
      notes: [
        'Let the animation run without talking over it: four pairs start at opposite edges of the frame and close onto one blinking prompt.',
        '"Why does a CLI for Copilot exist? To shrink four distances: between the worker and the work, the intelligence and the data, the workflow and the running system, and now and later."',
        '"Everything in this talk is one of those gaps getting smaller, and the evidence we inspect to know it did."',
        'This is our practitioner answer to why the CLI is useful, not a historical origin claim or a ranking of other surfaces. Closing a gap never grants authority by itself; that stays explicit throughout.',
        '→ Ask the question from the practitioner’s seat.'
      ],
      know: [
        'This is a 45-minute slot with an estimated 40:00 talk and 5:00 for questions: 36 slides, 25 teaching and 11 spine. Budgets remain estimates until a presenter times a run-through.',
        'Evidence reviewed November 2, 2026. Latest stable baseline: v1.0.105. Prerelease v1.0.106 entries do not establish stable behavior.',
        'The October 31 conversion was mechanical and excluded product news; August 25 was the previous verification baseline.'
      ],
      sources: refs('about', 'stable', 'use', 'remote'), seconds: 45
    },
    'core-question': {
      question: 'How do I get AI help right where I’m working?',
      notes: [
        '"Where I’m working can mean a repository, a running host, or a cloud task I return to later."',
        '"Start with the distance that matters to your task. Bring help closer, then inspect what improves."',
        'Three attendee outcomes: turn an ambiguous runtime request into scoped checks; separate placement from authority; verify continuity across interruptions and devices.',
        'The practitioner sets scope. Copilot proposes or acts through configured controls. A human accepts consequential outcomes.',
        '→ Make the four distances concrete before we navigate.'
      ],
      know: [
        'The CLI is a useful control surface when terminal tools and runtime context are decisive. Editor-first changes or GitHub-hosted collaboration can fit another surface better.',
        'Context, delegation, verification, and authority are the judgment lenses. The four distances explain relationships, rather than mapping one feature to each distance.'
      ],
      sources: refs('about', 'use'), seconds: 55
    },
    contents: {
      question: 'How will we prove the thesis?',
      notes: [
        '"First, worker and work. Then intelligence and data. Next, workflow and running system. Finally, now and later."',
        'Point to opener links 5, 10, 15, and 22. Docker keeps the next decision beside the task; host logs bring reasoning to evidence; CI asks inside the process; continuation preserves checked state.',
        '→ Start with the developer and a backend that will not start.'
      ],
      know: ['Distances are the narrative spine, not an exclusive feature taxonomy. Remote steering also closes worker-to-work; workflow reuse also closes now-to-later.'],
      sources: refs('about'), seconds: 30
    },
    'part-1': {
      question: 'Can I ask, inspect, and decide where I am already working?',
      notes: [
        '"Keep the request, host evidence, and next decision in one loop. The developer can inspect what Copilot used before choosing the next action."',
        'Introduce the Docker sequence as a representative script. It does not report a live successful repair.',
        '→ Shape the next action beside the backend task.'
      ],
      know: ['Planning is a scope and evidence decision; approving a plan does not grant every tool action or accept a future result.'],
      sources: refs('plan', 'about'), seconds: 35
    },
    'distance-model': {
      question: 'What does minimizing distance mean in practice?',
      notes: [
        '"Ask what is separated, what brings it closer, and what observable result improves."',
        'Point to each concrete pair: Docker output and next probe; on-host logs and checked aggregate; failure-gated copilot -p and why.md; continued session and verified identity. These are observable improvements in access to evidence or action, not measured speed gains.',
        '"One capability can close more than one distance. The task decides which relationship matters."',
        '→ These four distances are also our navigation.'
      ],
      know: [
        'CLI execution stays local by default. Moving a model, moving tools, exposing remote control, and changing tool permissions are independent decisions.',
        'The pattern stops fitting when decisive evidence belongs to another surface or the operator lacks safe authority to inspect it.'
      ],
      sources: refs('about', 'models', 'cloudDocs', 'remote', 'command'), seconds: 70
    },
    'plan-mode-loop': {
      question: 'What does Plan Mode change before execution?',
      notes: [
        '"Copilot can surface an ambiguity while it is still inexpensive for the developer to resolve."',
        'The separation is between the developer’s intent and Copilot’s next action. Plan Mode brings a proposed scope into the working session; the reviewable plan is the artifact. Inspect its commands and stop if it assumes unapproved access.',
        'Point from request to clarification to plan review. Confirm the installed interactive shortcut before presenting; the script uses Shift+Tab.',
        '"The developer approves the diagnostic scope. Tool policy still decides which actions may run."',
        '→ Watch the scope get smaller in the exchange.'
      ],
      know: [
        'Plan Mode is collaborative planning. Autopilot or goal controls are separate mechanisms.',
        'No time-saving ratio is taught here. The old 45-to-8-minute Docker comparison had no supplied run artifact and has been displaced by inspectable evidence.'
      ],
      sources: refs('plan', 'command'), seconds: 55
    },
    'docker-clarify': {
      question: 'How can I make an ambiguous Docker request inspectable?',
      notes: [
        '"Copilot asks where to begin. The developer chooses logs first, with configuration only when the evidence points there."',
        'Read the representative exchange; point to the named actor on each line. Keep secret values out of the prompt and approve only the needed read operations.',
        '"That answer gives us a plan we can review instead of an unspoken interpretation."',
        'The concrete improvement is a recoverable scope in this working loop: logs first, configuration only when evidence warrants it. The developer can correct it before execution.',
        '→ Now inspect what those two checks actually establish.'
      ],
      know: [
        'Logs may show a process startup fault, binding error, or dependency issue. A port mapping alone cannot establish which occurred.',
        'A proposed live check can use a disposable container fixture; preserve the actual log and compose file as evidence.'
      ],
      cue: [
        'Optional: open a disposable Docker project and enter Plan Mode.',
        'Ask for logs first and no edits. Review the proposed commands before executing.',
        'If the output differs from the script, teach from the actual output rather than forcing the planned diagnosis.'
      ],
      sources: refs('plan', 'use', 'best'), seconds: 70
    },
    'docker-plan': {
      question: 'What does Copilot actually do with the approved diagnostic plan?',
      notes: [
        '"Once the developer approves the plan and leaves planning for execution, Copilot requests these shell tools on the host that owns the Docker environment."',
        'Read each command and representative tool output together. The shell tool runs docker compose logs; Copilot reads the returned listener line. It then requests docker compose port to resolve the actual published host port rather than guessing from the symptom.',
        '"Copilot changes its explanation: this trace points toward a request sent to the wrong host port. It proposes a request on 5001 before editing anything."',
        'Point to the proposed curl command. It probes the root URL, not an assumed health endpoint. Inspect the actual HTTP response and then run the repository’s documented health check. A response alone does not establish application correctness.',
        'The important proximity is visible: Copilot uses the host’s existing Docker tools, receives their evidence, and chooses the next check in the same session. The developer reviews the conclusion.',
        '→ The developer can also redirect a proposed action that threatens the evidence.'
      ],
      know: [
        'The commands and returned lines are a constructed, representative trace; no recorded diagnosis, successful request, or repair is claimed.',
        'Use a disposable Compose fixture with a backend service, container listener 5000, and published host port 5001. Confirm the installed Docker Compose syntax and host access before presenting.',
        'Plan approval does not grant blanket tool permission. Leave Plan Mode through the installed client’s execution flow; CLI permission rules gate the requested shell actions separately.',
        'A historical listener log is a clue, not proof that the process is still alive. If the request fails, inspect current container state and recent startup errors before selecting another hypothesis.',
        'Changing 5001:5000 to 5000:5000 can align a host-side caller when host port 5000 is available; it does not by itself fix an application that fails to start.',
        'A real health endpoint and expected response depend on the application. Use the repository’s documented check rather than inventing a successful response.',
        'Recovery: retain logs, inspect the actual listener and startup error, revise the plan, and rerun the relevant check.'
      ],
      cue: [
        'Prepare the disposable fixture and a failing request to host port 5000. Ask Copilot to diagnose without edits.',
        'Approve the scoped plan and enter execution. Inspect the requested commands, policy decisions, and actual tool outputs.',
        'Ask Copilot what changed in its explanation and which next request could disprove it. Inspect the response and application health check.',
        'When actual output differs, follow that evidence. Present the scripted trace as representative if no fixture is available.'
      ],
      sources: refs('plan', 'use', 'best'), seconds: 130
    },
    'steer-boundary': {
      question: 'Can I block an action and keep the investigation moving?',
      notes: [
        '"In manual mode, the developer can deny an unresolved request and explain the constraint in the same interaction."',
        'Keep deletion as a request in the script; do not run it. Point to the useful redirect: summarize the evidence while preserving it.',
        '"The denial is an authority decision. It does not prove the diagnostic task is complete."',
        'The worker stays beside the task even when denying a request. Preserved evidence and an evidence-only continuation are the useful result; no task completion is implied.',
        '→ Now follow the evidence to the host that owns it.'
      ],
      know: [
        'Existing policy may resolve a tool request before a human prompt. Manual does not mean every action always asks.',
        'Current rejection-key behavior can vary; inspect the installed prompt. Assisted mode can approve eligible unresolved requests automatically, so a universal human-per-tool claim is inaccurate.'
      ],
      sources: refs('permissions', 'use', 'command'), seconds: 55
    },
    'part-2': {
      question: 'Can help reach the evidence that decides this task?',
      notes: [
        '"The staging log can decide the investigation. Start Copilot where approved tools can read it, then check who receives that context."',
        'Point to source, provider, and finding. Tools run on their host; inference placement is a separate choice. Local by default describes ordinary CLI execution, not a promise that data stays local.',
        '→ Connect to staging and inspect a representative service log.'
      ],
      know: ['Local sandboxing constrains OS tool access. It does not select or relocate the language model.'],
      sources: refs('about', 'cloudDocs', 'sandbox'), seconds: 35
    },
    'local-model': {
      question: 'How can I check local model placement without broadening the task?',
      notes: [
        '"Prepare the runtime and model first. Discovery can make an already-running local Ollama service available in /model."',
        'Inspect discovery status, provider, and endpoint before adding the prepared model and switching the current session. Use synthetic evidence and compare the answer with the fixture.',
        '"The proof is the selected endpoint and a checkable answer. It is not a claim of offline operation."',
        'The separation here is between reasoning and approved evidence. A prepared local endpoint is one deliberate inference choice; the selected endpoint and checked synthetic answer establish what was actually used.',
        '→ Repository work may fit cloud; host-only evidence still needs its host.'
      ],
      know: [
        'The runtime and model must already be installed; discovery installs neither. The model needs tool calling and streaming.',
        'Automatic discovery is local-machine only. Remote Ollama requires provider configuration; verify the endpoint before sending context.',
        'Local selection neither enables offline mode nor disables telemetry. COPILOT_OFFLINE=true does not prevent a configured remote provider from receiving context.',
        'Intelligent local routing is future availability in the announcement; do not present it as shipped. Discovery was announced starting with v1.0.94-0; this talk uses stable v1.0.105 as the dated baseline.'
      ],
      cue: [
        'Preflight a supported installed model with tool calling and streaming; keep its name out of the permanent script.',
        'Open /model, inspect the discovered local endpoint, add the model, and optionally switch without restarting.',
        'Ask for a summary of a synthetic file and compare it with the file. If discovery is absent, inspect provider configuration; do not claim a successful local run.'
      ],
      sources: refs('models', 'modelNews', 'stable'), seconds: 85
    },
    'interactive-diagnosis': {
      question: 'How do I bring Copilot to evidence that exists only on the staging host?',
      notes: [
        '"Connect to the authorized staging host, then start Copilot there. The CLI process and its shell tools now operate beside the service that is failing."',
        'Point to SSH first, then copilot: the second command runs in the remote shell, not on the laptop. Copilot requests journalctl on that host and uses the returned evidence to choose its next diagnostic step.',
        '"The useful distance closes between reasoning and the staging evidence. Copilot reads the tool result where the log lives and proposes a check we can inspect."',
        'The displayed connection-refused line is representative, not an observed diagnosis. It motivates checking the configured dependency endpoint; it does not prove which dependency is at fault or authorize a change.',
        'CLI execution location and model inference location differ. The selected provider can receive prompt and tool context. Approved scope, redaction, tool permissions, and containment still apply.',
        'This slide establishes execution placement. Part 4 keeps the same original-host session running while the practitioner steers it from another device; SSH alone is not the remote-control feature.',
        '"The service owner accepts any fix after checking the evidence."',
        '→ Now scale it up: a whole day of logs that is too large to move.'
      ],
      know: [
        'This is a representative Linux/systemd fixture with a backend unit. Install and authenticate the CLI on the authorized host beforehand; SSH does not install it or grant log access.',
        'journalctl requires the relevant service name, log-read permissions, and a systemd journal. Adapt to the actual approved host tooling rather than assuming this command works everywhere.',
        'A refused connection at 127.0.0.1:6379 does not establish a confirmed root cause. Check configuration and actual dependency state before proposing remediation.',
        'If runtime credentials or data handling are unclear, stop and use the organization’s approved diagnostic path.'
      ],
      cue: [
        'Connect to a disposable authorized staging host and verify host identity before starting the installed CLI.',
        'Request a read-only diagnosis. Inspect the shell request, permitted log output, and Copilot’s next proposed check.',
        'Use synthetic or approved redacted logs; present the visible trace as representative when a suitable host is unavailable.'
      ],
      sources: refs('use', 'best'), seconds: 55
    },
    'programmatic-command': {
      question: 'Can the failed CI run explain why it failed before I open its logs?',
      notes: [
        '"GitHub Actions already has the failure evidence. Put Copilot in that workflow and the run can return a reason alongside the red test result."',
        'Trace the actual workflow excerpt: Bash captures the test output with tee, pipefail retains the failing test status, and the next step runs only when that test step failed. No continue-on-error is needed.',
        'The workflow passes the captured log into copilot -p as prompt context, writes its response to why.md, and appends it to the Actions job summary. The model reasons over the log at the point where CI produced it; the maintainer does not need to start a separate conversation and paste the failure.',
        'Read the representative log and explanation together. Connection refused supports an unreachable dependency hypothesis. It does not prove whether startup, configuration, or another cause made the dependency unavailable.',
        '"Keep the original test status. A successful analysis command never turns a failed test green."',
        'Compare the explanation with the source log and a reproduction before accepting it. Analysis completion does not verify the proposed cause.',
        'The separation is between the failed process and the maintainer’s explanation. Running the bounded prompt inside CI returns a proposed why beside the red test, while preserving the original evidence and status.',
        '→ Save a recurring multi-step investigation as a procedure.'
      ],
      know: [
        'This is a GitHub Actions steps excerpt, not a complete executed workflow. Earlier trusted steps must check out the repository, install project dependencies and the standalone CLI, and authenticate it with a supported Copilot credential. The default Actions GITHUB_TOKEN does not itself supply a Copilot entitlement.',
        'The shown shell is Bash on the Actions runner. Command substitution supplies bounded log text directly as prompt context; no log-reading shell tool is required for this explanation. --silent keeps progress chatter out of why.md.',
        'Use trusted runs and redacted bounded logs. Large logs can exceed shell argument or model context limits; select the relevant evidence first. Treat log contents as untrusted data and preconfigure minimum permissions, with no edit or repair authority.',
        'GitHub job summaries expose the generated text to people who can view the run. Review data-handling policy before publishing logs or analysis; never place credentials in the prompt or summary.',
        'The command exits explicitly if analysis fails through the runner’s normal Bash error handling; no success-shaped fallback is supplied. The original failed test remains failed whether analysis succeeds or fails.',
        'Non-interactive and autopilot requests still requiring human approval are denied. Pre-grant only the tools needed for the bounded report.',
        'Posting a PR comment is a separate write authority. Prefer an artifact until the repository owner approves publication of the report.'
      ],
      sources: refs('command', 'install', 'permissions', 'use'), seconds: 90
    },
    'authority-boundary': {
      question: 'What are my options for controlling what Copilot may run?',
      notes: [
        '"Inspect /permissions show. Manual leaves unresolved requests with a human. Assisted lets a review model resolve eligible requests. Allow-all broadly preauthorizes within enforced limits."',
        'Distinguish the requested action, decision maker, actual decision, and later human acceptance. In a live check, show an eligible approval and a denied or escalated request; do not invent their results.',
        '"Assisted approval is useful automation, with a model’s fallibility. Containment remains a separate boundary."',
        'Use the running-system example: a workflow requests service reads; a proposed restart has different consequences. Proximity does not grant authority. The observable proof is the actual request and allow, deny, or escalation, with demonstration verification recorded separately.',
        '→ Inspect what approved tools can actually reach.'
      ],
      know: [
        'Assisted permissions are GA. A review model can approve dangerous or unintended actions; no safety guarantee follows from its approval.',
        'Existing deny rules and enterprise restrictions remain effective. Eligible enterprise ask rules can be satisfied by model approval.',
        'Requests to bypass local sandboxing are not reviewed by assisted permissions. Autopilot and non-interactive requests still needing a human are denied.',
        'Administrators can disable assisted and allow-all independently. Avoid broad permission bypass in environments holding consequential credentials.',
        'Managed forceRemoteSettingsRefresh can require current server policy at startup and fail closed if it cannot be confirmed. Restore policy access or update the client rather than bypassing governance.',
        'A server-managed freshness requirement begins after the client receives it; MDM or file delivery can apply before first sign-in. Managed sandbox keys may require a newer client.'
      ],
      cue: [
        'On a disposable task, inspect /permissions show and select /permissions assisted only when policy permits.',
        'Observe an eligible unresolved request and an explicitly denied or escalated request.',
        'Record the requested operation and actual decision separately from the status of the demonstration.'
      ],
      sources: refs('permissions', 'assisted', 'managed', 'command'), seconds: 95
    },
    'local-containment': {
      question: 'What happens to everything an approved command starts?',
      notes: [
        '"On the last slide you approved npm test. But npm test is not one action. It starts a test runner, helper scripts, and code from dependencies you have never read."',
        'Let the tree build. The root is your decision, in orange. Each branch is something a child process tries to do: the test runner writes coverage inside the repo, a helper reaches for an SSH key, a dependency phones home, a script asks for a GitHub token.',
        '"Permissions decided that npm test may run. The sandbox decides what everything it spawns can reach."',
        'One write is allowed; three reaches beyond the task are refused. The tests still run. That is the payoff for the distance argument: with the reach bounded, you can let Copilot work closer to your code with more autonomy.',
        'Mechanism: CLI declares the effective policy and Microsoft eXecution Container turns it into operating-system restrictions. Shell commands and local MCP and language servers run inside it when local sandboxing is enabled. Configure with /sandbox and inspect /sandbox policy and /sandbox status; enabling alone does not prove these specific restrictions are present.',
        'These four outcomes are representative under an example policy, not output from a recorded run and not the default policy.',
        'When a legitimate test is blocked, inspect the denied resource and narrowly revise policy if authorized. Avoid turning containment off merely to make a run pass.',
        '→ Carry this bounded, reusable process into the next useful moment.'
      ],
      know: [
        'No experimental-startup prerequisite is required for GA local sandboxing. It is off by default unless managed policy requires it.',
        'MXC provides OS-level restrictions, not a separate VM or container. It does not select a model endpoint.',
        'Built-in in-process file tools check policy themselves on a best-effort basis; OS enforcement applies to spawned processes such as shell commands.',
        'Credential controls can limit Git and GitHub CLI authentication and mask selected environment variables. This does not imply that every credential on the host is automatically removed.',
        'Repository scripts can spawn other commands; containment is useful even when the approved top-level command looks routine. It is not a guarantee against malicious code or a substitute for reviewing untrusted scripts.',
        'Platform prerequisites and enforcement differ. Current Windows support requires a suitable Windows 11 build; confirm the documented supported build before the demo.',
        'Windows proxy and host rules do not provide the same direct-connection protection as macOS and Linux. Do not claim identical network enforcement across platforms.',
        'Fresh managed policy may fail startup closed, and a managed sandbox requirement may require a newer client. Restore policy connectivity or update the client.'
      ],
      cue: [
        'Check OS prerequisites and managed policy on a disposable environment.',
        'Run /sandbox enable, /sandbox status, and /sandbox policy.',
        'Configure and inspect the example policy: required repository/runtime reads, repo and test scratch writes, and only needed network and credential access.',
        'Use a synthetic file in an explicitly denied test directory, never a real secret. Compare an allowed repo test operation with a shell read of that fixture.',
        'Keep the actual output; if enforcement differs, stop and inspect policy rather than claiming containment.'
      ],
      sources: refs('sandbox', 'sandboxGA', 'managed', 'command'), seconds: 85
    },
    'cloud-containment': {
      question: 'When does the work belong in a cloud session?',
      notes: [
        '"Ordinary CLI sessions still execute locally by default. copilot --cloud deliberately starts interactive work in a cloud sandbox."',
        'Point to environment choice at start. Select Cloud for its supported connected execution path; use Actions when Actions-only setup steps or runner requirements are decisive.',
        '"A cloud snapshot preserves files and in-progress work. It does not provide access to your staging host’s live state."',
        'The separation to close is repository work and its execution environment. Cloud can make that repository task reachable; it does not make the original host’s logs available. Inspect access and the actual evidence before choosing.',
        '→ Next put reasoning into the process that already has the evidence.'
      ],
      know: [
        'Connected cloud sessions and cloud sandboxes are GA for paid Copilot plans in the October 28 announcement; confirm organization access and installed-client availability.',
        'copilot --cloud is interactive and cannot be combined with -p or -i. Cloud and Actions are chosen at session start; changing environment requires a new session.',
        'Actions-only setup steps and runner requirements still require Actions.',
        'The announcement says cloud-sandbox billing begins in November 2026 using a shared Actions compute entitlement. This is November: confirm current rates and entitlement before the demo. No rate or free-compute promise is made.',
        'Broad cloud-default language in the announcement does not change ordinary local-by-default CLI execution.'
      ],
      sources: refs('cloud', 'cloudDocs', 'connected'), seconds: 80
    },
    'delegate-cloud': {
      question: 'When is a PR a better handoff than a live session?',
      notes: [
        '"Hand off now, then come back to a pull request you can inspect. Your terminal remains available while a separate cloud coding-agent task works."',
        'Read the ampersand request on the left: one endpoint, input validation, tests, draft PR, and no merge. Inspect local worktree state before handing off. This is separate task delegation, not continuation of the current interactive cloud session.',
        'Follow the time gap to the larger PR preview. The diff is a representative JavaScript fragment, not a complete implementation or observed change. It assumes the endpoint has already parsed the body; real validation also needs the application’s full request contract.',
        'The test evidence line names what the maintainer must inspect; it does not claim tests ran or passed. Compare actual tests and results with both rejected inputs and the valid-order behavior.',
        '"The agent returns proposed work. The maintainer reviews, requests changes, or merges under repository policy."',
        '→ Later work also needs a mechanism for pausing deliberately.'
      ],
      know: [
        'The original walkthrough used an API input-validation audit. Returned PR shape, task access, and completion behavior depend on current coding-agent controls.',
        'A task can outlive terminal attention without giving it unlimited repository or network authority. Avoid promising a completion time or notification route.',
        'Inspect local changes before delegation; do not assume a dirty worktree is excluded from a handoff.'
      ],
      sources: refs('about', 'use', 'best'), seconds: 45
    },
    'part-3': {
      question: 'Can the process ask for an explanation when it has the evidence?',
      notes: [
        '"CI already holds the failure log. Let that process ask for an explanation at the moment it can supply the evidence."',
        'Then use the staging example to show a reusable collection-and-reasoning procedure. The output is evidence for an operator, with explicit permission and containment boundaries.',
        '→ Watch Actions literally run copilot -p when tests fail.'
      ],
      know: ['CI explanation and dynamic workflows connect reasoning with a running process. Workflow-definition reuse also bridges time; findings still depend on fresh evidence.'],
      sources: refs('workflow', 'permissions', 'command'), seconds: 35
    },
    'workflow-reuse': {
      question: 'How do I keep this useful terminal investigation for the next incident?',
      notes: [
        '"We already connected to staging, started Copilot there, and inspected the service logs. Keep that useful process for the next investigation."',
        'Start with the familiar situation: another staging incident. Walk through collection, agent analysis, and returned report. Code makes the procedure repeatable; the agents interpret new evidence rather than making every step deterministic.',
        'A dynamic workflow is a program inside a Copilot extension. It can combine fixed commands, agent calls, ordering, parallelism, and structured outputs. It is not YAML and does not arise merely from saving a prompt.',
        '"Code repeats the collection and report assembly. Agents analyze process health and an upstream lead. The practitioner gets evidence to review."',
        'This closes workflow to running system because commands inspect this host, and now to later because the procedure is reusable. Parallel analysis fits independent hypotheses; keep dependent steps ordered.',
        '→ First create the workflow by describing the process to Copilot.'
      ],
      know: [
        'The concept documentation explicitly uses incident investigation, telemetry collection, independent agents, and a combined root-cause report as an example. This staging fixture is our teaching implementation, not a GitHub-provided sample.',
        'Dynamic workflows are Copilot extension programs in public preview, distinct from GitHub Agentic Workflows and Actions YAML.',
        '/fleet lets Copilot decompose a task. A dynamic workflow defines the process in code. copilot -p submits one prompt; a script can also orchestrate such prompts, but that alone does not register a dynamic workflow.',
        'The CLI command runs in its existing environment. Start it on the authorized staging host; it neither connects to that host nor deploys across hosts automatically.'
      ],
      sources: refs('workflow', 'workflowUse', 'workflowNews', 'fleet'), seconds: 75
    },
    'workflow-definition': {
      question: 'How do I create and configure a dynamic workflow?',
      notes: [
        '"Start an experimental Copilot session and describe the process. This text is a request to Copilot, not a YAML file or JavaScript API."',
        'The author names the workflow, collection scope, agent questions, output, authority boundary, and a bounded budget. Copilot generates extension code and may ask for authoring approvals. Ask it to clarify a numeric credit limit before running; the prompt does not prescribe one.',
        'Review the generated commands, handling of sensitive logs, tool access, and configured limits. Ask for a project extension so the workflow can be reused outside the authoring session. Confirm registration by asking what dynamic workflows are available in a fresh session.',
        '"Creating and registering the workflow does not start the investigation. That is a separate action."',
        'This is the documented authoring experience, not a claim that the talk already generated the extension. The downloadable JavaScript core and synthetic fixture are optional implementation study material, not a complete Copilot extension.',
        '→ Here is the kind of code Copilot writes from that request.'
      ],
      know: [
        'Verified November 2 against current docs and installed CLI v1.0.105 workflow run help: --args accepts inline JSON or @file; --result-file saves only the returned value. --experimental enables preview features.',
        'Personal extensions live under ~/.copilot/extensions/; project extensions under .github/extensions/. A session-only definition needs copying to one of these locations before a separate command can find it. Copying definitions does not copy run history.',
        'Ask Copilot: Show me the guidance for writing dynamic workflows. Audit the generated extension and registration against that guidance; confirm the name in a new session before using workflow run.',
        'copilot workflow run never displays permission approval prompts. Pregrant only the tools and URLs the reviewed extension requires; unresolved requests are denied.',
        'Trusted extension JavaScript can run host code. Agent tool grants are not a sandbox for arbitrary extension code. Review the collector and allowed data before live collection.',
        'For a trusted project extension in an untrusted script working directory, documentation offers GITHUB_COPILOT_PROMPT_MODE_EXTENSIONS=true. That authorizes loading repository code; it is not an automatic setup step here.'
      ],
      cue: [
        'For preview rehearsal follow examples/walkthrough.md section 6: start copilot --experimental, enter the authoring request, review the generated extension, make it a project extension, then confirm registration in a fresh experimental session.',
        'If registration or preview access is unavailable, show this slide and the next as the documented flow. Never claim the talk generated or ran the extension.'
      ],
      sources: refs('workflow', 'workflowUse', 'workflowNews', 'command'), seconds: 85
    },
    'workflow-code': {
      question: 'What does the code Copilot creates actually look like?',
      notes: [
        '"This is the artifact the previous request produces: one JavaScript file in a project extension folder. Not YAML, not a saved prompt."',
        'Follow the colors. Green: ctx.step runs systemctl and journalctl on this host, read-only, and journals the result so a resumed run reuses it. Purple: ctx.parallel starts two ctx.agent calls, each with its own question over the same evidence; the labels make them independent subagents. Orange: the returned JSON is the report that --result-file saves.',
        '"Code owns the parts that must be the same every time. Agents own the parts that need judgment."',
        'Blue is what the reviewer checks before registration: the name, the AI-credit ceiling, the imports, and joinSession, which registers the workflow. The two shell commands run as extension code, outside agent tool permissions, so read them as carefully as any script you would run on staging.',
        'This is illustrative code written against the API in the guidance bundled with installed CLI v1.0.105, not output captured from a Copilot run. A fuller version (with description and progress phases) is in examples/extension.mjs; it passes a syntax check and a stub-SDK run that exercises collect, two agent calls, and the returned report.',
        '→ Before registering it, get a second opinion.'
      ],
      know: [
        'API surface (experimental): defineWorkflow({ meta, run }) and joinSession({ workflows }) from @github/copilot-sdk/extension; ctx.step, ctx.parallel, ctx.agent, ctx.phase, ctx.pause, ctx.pipeline, and meta.limits (maxAiCredits, maxTotalSubagents, maxConcurrentSubagents, timeoutSeconds). Read it with: Show me the guidance for writing dynamic workflows.',
        'Identical ctx.agent calls are memoized into one subagent; distinct labels or prompts create independent ones. A failed agent resolves to null rather than throwing, so a production version guards each finding.',
        'ctx.agent accepts a schema option for structured JSON findings. The slide omits it to stay readable.',
        'The guidance advises setting maxAiCredits only from known cost or a ceiling the user names. A reached limit stops the run with workflow_limit_reached; resume with a raised limit if approved.',
        'Version the step key (collect-v1) whenever collection changes; a resume replays a cached value for a matching key even if the producer changed.',
        'The repository also keeps staging-investigation.mjs, a dependency-free core with fixture checks, as optional study material.'
      ],
      sources: refs('workflow', 'workflowUse', 'stable'), seconds: 80
    },
    'rubber-duck': {
      question: 'How do I catch what Copilot missed before the code runs?',
      notes: [
        '"Copilot just wrote code that will run on staging. Before we register it, we want a reviewer that does not share its blind spots."',
        'Run /rubber-duck with a pointed question. Rubber duck is a built-in agent that deliberately runs on a different model family from your session; if your session uses a Claude model, the critic may be a GPT model. It reads the work in context with read-only tools and cannot edit files.',
        'Read the critique by severity. Blocking: the raw journal lines go to the agents unredacted, so a token in a log line would reach the model. Non-blocking: no command timeout, and a failed agent quietly becomes null in the report. Suggestion: give findings a schema. Look back at slide 19: every one of these is true of that code.',
        '"Two models, two sets of blind spots. The duck found what the author model did not."',
        'The main agent decides what to do with the critique and summarizes what it changed. You still review the diff before registering.',
        'This closes workflow to running system safely: code headed for a real host gets an independent review before it gets anywhere near it.',
        '→ Reviewed and registered, run it.'
      ],
      know: [
        'Invoke manually with /rubber-duck plus a question, or in plain language: "Rubber duck your plan" or "Get a critique of the changes so far." It is not invoked automatically by default.',
        'Proactive mode: /subagents, select the rubber duck agent, toggle Proactive invocation. This persists in ~/.copilot/settings.json under subagents.agents.rubber-duck.autoInvoke. Copilot then consults it after planning non-trivial changes, mid-implementation, after writing tests, and after repeated failures; it typically skips small changes.',
        'Severity buckets: blocking, non-blocking, suggestions. It is configured not to comment on style, naming, or formatting, and says so explicitly when it finds no issues.',
        'Each review is an additional reasoning pass on a separate model: some latency and extra usage, usually repaid by catching problems before implementation. It runs only if a suitable contrasting model is available.',
        'The critique shown is representative, written against examples/extension.mjs; it was not captured from a live run.'
      ],
      cue: [
        'With examples/extension.mjs open in a session, run: /rubber-duck Review extension.mjs. Anything unsafe to run on staging?',
        'Show the severity-grouped response, then ask Copilot to apply only the blocking fix and show the diff.'
      ],
      sources: refs('rubberDuck', 'workflow'), seconds: 75
    },
    'workflow-report': {
      question: 'What can I inspect, and what do I do when a run fails?',
      notes: [
        '"Next time, run the saved workflow. The command invokes the program; it does not ask Copilot to invent the process again."',
        'The displayed Bash command assumes registration and defaults selecting the intended service, host, and collection mode. If the authored workflow requires inputs, pass those with --args using its actual input contract. A natural-language request in the interactive session is another documented way to run it.',
        'The report is a human-readable teaching summary of synthetic evidence, not literal JSON output or an observed agent diagnosis. A real report includes the source evidence needed to check the lead.',
        '"The program can verify a source ID exists. The practitioner still verifies whether the finding follows from it."',
        'If the actual run pauses or fails, inspect its status and run ID. A prior result file remains unchanged, so use a fresh filename and inspect run status before reading a report. A saved report does not authorize restart or deployment.',
        '→ The procedure brings reasoning close to the system. Name who decides its requested actions.'
      ],
      know: [
        'The local fixture checks cover assembly, rejection of unknown evidence IDs, and propagation of an agent failure. No live Copilot workflow, systemctl, journalctl, or agent diagnosis was executed for these checks.',
        'The CLI writes --result-file only on successful completion with a returned result; a paused, failed, or interrupted run leaves an existing file unchanged. Progress and run metadata are not part of that result file.',
        'For machine-readable run metadata the docs provide --silent --output-format json, containing workflow name, run ID, status, and any result. Capture that separately from a returned report.',
        'Inspect /workflows for resumable paused or limit-stopped runs; completed saved steps can be reused, unsaved work can rerun, and canceled runs cannot resume. Limits remain cumulative when raised.',
        'Checkpoints are an optional review mechanism, not the value proposition of this core and not an unattended durable scheduler. Ask an audited adapter to checkpoint only when useful.',
        'If evidence collection fails, fix authorized host access or the command scope. If findings are malformed or unsupported, inspect evidence and revise the adapter or reasoning request before rerunning. Never widen permissions just to obtain a green status.'
      ],
      cue: [
        'Inspect the fixture JSON evidence and findings. Compare logs:3 with the cited upstream lead and uncertainty.',
        'Show stderr fixture-check status separately from report decision human-review-required.',
        'In a prepared live run, retain status and run ID, inspect the newly written report, and independently check each material claim. Record live outcomes only after observing them.'
      ],
      sources: refs('workflow', 'workflowUse'), seconds: 90
    },
    'scheduled-patrol': {
      question: 'How do I keep an eye on a fix without babysitting it?',
      notes: [
        '"The fix for the 503 just deployed to staging. We think it worked. We want to move on, and we want to know if we were wrong."',
        'Read the two commands. /every sets a quiet watch: every five minutes Copilot checks restarts and 503s in the same staging session, and only interrupts if things get worse. /after sets one later check: at 45 minutes, count the 503s since the fix and show the command used.',
        'Follow the timeline. You work on something else; eight checks pass with nothing worth saying. At 10:45 the /after report arrives with a count, a comparison to before the fix, and the exact command you can rerun.',
        '"We closed the distance between now and later: the follow-up you would have forgotten happens on time, with the same context, and it brings evidence."',
        'The report says holding so far, not fixed. Closing the incident remains your decision.',
        'Boundary: these schedules live in this session. Close it and they stop; resume it and they come back, and an overdue /after can fire immediately. That fits a working session. For unattended watching, use your monitoring system or an external scheduler with copilot -p.',
        'The timeline, counts, and report are representative, not a recorded run.',
        '→ Long sessions also need their context checked.'
      ],
      know: [
        '/every and /after remain experimental and session-only. /loop is documented as an alias for /every. Start with copilot --experimental or /experimental on.',
        'A self-paced /every lets the model choose cadence; the fixed-interval bounds are 10 seconds minimum and one day maximum. Check current documentation for accepted interval syntax before presenting.',
        'Bare /every or /after lists and deletes schedules. Inspect what was created rather than assuming the request produced the intended cadence, and delete the watch when you are done.',
        'Each scheduled run uses the session permission mode and sandbox. Keep the watch read-only; a schedule does not authorize rollback or remediation.',
        'Use cron, Task Scheduler, or an approved durable scheduler with copilot -p when execution must occur without the interactive session. That design needs its own credentials, logging, and review.'
      ],
      cue: [
        'On a disposable staging host with a synthetic backend, start copilot --experimental and enter both commands with short intervals (for example /every 1min and /after 5min).',
        'Run bare /every to show the created schedule, keep presenting, and show the /after report when it arrives. Compare its count with the command it cites.',
        'Delete the schedule afterwards. If a schedule does not fire, show the listing and say so; do not claim a report.'
      ],
      sources: refs('schedule', 'command', 'permissions'), seconds: 90
    },
    'compact-quality': {
      question: 'How do I know a compacted session still remembers the task?',
      notes: [
        '"Use /context to inspect context use, then /compact when a summary helps. Ask Copilot to restate the scope and acceptance check before it acts."',
        'Compare its next plan with approved logs only, redaction, no remediation, and a source-backed health check. These expected constraints belong to our representative staging scenario.',
        '"If one is missing, re-anchor it and inspect again."',
        '→ Stable decisions can move into repository guidance.'
      ],
      know: [
        'The displayed constraints are expected checks, not observed model output.',
        'Compaction by session age alone gives no quality assurance. Choose it when context need warrants it, then verify the next step.',
        'Automatic compaction also manages history. The old near-95-percent threshold is version-sensitive, not a universal guarantee. /usage exposes session statistics; no token or cost reduction is promised.',
        'If a summary loses decisive evidence, reread approved source artifacts and restate constraints before acting.'
      ],
      sources: refs('best', 'use', 'command'), seconds: 65
    },
    'memory-chronicle': {
      question: 'How do I make Copilot remember what this session taught us?',
      notes: [
        '"Every correction you made today is a lesson Copilot will forget tomorrow, unless it becomes an instruction."',
        'Run /chronicle improve. It searches this repository’s session history for friction: places you corrected or redirected Copilot, repeated test failures, builds that took several tries. It returns three to five recommendations, each naming the problem it found and the instruction that would prevent it.',
        'Read the picker. Three come straight from this talk: the journal location, vitest instead of jest, and never restarting staging. The fourth is the cause of one incident; turn it off with the space bar, because one incident is not a rule.',
        'Press enter and Copilot writes .github/copilot-instructions.md. That file is in the repo: review and commit it like any other change, so the whole team gets it.',
        '"Today’s corrections become tomorrow’s defaults. That is the now-to-later distance for knowledge."',
        'The recommendations shown are representative of the documented behavior, not output from a recorded run.',
        '→ Sometimes the lesson is mid-session: Copilot went too far, and we want to go back.'
      ],
      know: [
        '/chronicle improve is scoped to session data for the current repository or working directory, unlike other /chronicle subcommands. Its docs example is Copilot repeatedly trying jest in a vitest project.',
        'All recommendations are selected by default; arrow keys move, space toggles, enter applies. Copilot then creates or updates .github/copilot-instructions.md.',
        'Other subcommands: /chronicle standup, tips, and cost-tips. Session data is stored locally and by default syncs to your GitHub account; treat history as sensitive and follow retention policies.',
        'Review applied instructions for secrets and incident-specific claims before committing.'
      ],
      cue: [
        'In a repository with a few prior sessions that include corrections, run /chronicle improve. Show the recommendations, toggle one off, and apply.',
        'Show the resulting git diff of .github/copilot-instructions.md. If there is too little history for recommendations, say so and show this slide as the expected shape.'
      ],
      sources: refs('chronicle', 'instructions', 'command'), seconds: 55
    },
    'rewind-recovery': {
      question: 'What do I do when Copilot goes too far?',
      notes: [
        '"Two good turns, then we asked for a little tidy-up, and Copilot rewrote ten files. Nine tests fail. We do not want to untangle that by hand."',
        'Read the session top to bottom: turn 2 is the last good state. Run /rewind (or /undo), pick turn 2, and choose Conversation + files.',
        'Point right. The conversation goes back to turn 2, so Copilot forgets the bad direction. Copilot’s file changes from turns 3 and 4 are restored. Your own hand edit to README.md is kept, because rewind only undoes what Copilot changed.',
        '"Then verify: git status and the tests match turn 2 again."',
        'Conversation only is the other choice: forget the turns but leave files as they are, useful when the edits were fine and only the direction was wrong.',
        'If the refactor was a good idea at the wrong time, /worktree (experimental) explores it in a separate Git worktree and conversation without touching this one.',
        'The session and counts are representative, not a recorded run.',
        '→ Next: keep the worker in reach when the device changes.'
      ],
      know: [
        '/rewind is aliased as /undo. Conversation only leaves files as they are; Conversation + files restores Copilot-made changes for the discarded turns and skips developer-authored edits.',
        'Change tracking covers editing tools, shell commands, and subagents, including dirty folders and work outside Git. Still inspect the restored files rather than promising universal recovery.',
        '/worktree is experimental and requires Git; /rewind does not. Review worktree changes before merging them.',
        '/resume and CLI continue/resume controls recover session context. Resuming a local session does not migrate a running host process or its environment.'
      ],
      cue: [
        'In a disposable repo, make two small good changes with Copilot, then ask for a broad refactor. Make one hand edit yourself.',
        'Run /rewind, choose the second turn and Conversation + files, then show git status: Copilot’s refactor gone, your edit present.'
      ],
      sources: refs('command', 'use', 'releases'), seconds: 65
    },
    'part-4': {
      question: 'What can I carry forward without starting over?',
      notes: [
        '"Keep useful work within reach when time, attention, or device changes. First name what you are preserving."',
        'Recap the saved workflow procedure from Part 3. Then distinguish a delegated task and PR, scheduled intent, checked conversation context, reviewed guidance, recoverable edits, a running original-host session, and cloud files or work in progress.',
        '→ Hand off one bounded task now and inspect its returned PR later.'
      ],
      know: ['Reuse preserves a definition, not an incident outcome. Schedules need an active session. Original-host steering needs a live host and process. Cloud continuation preserves different state.'],
      sources: refs('workflow', 'schedule', 'remote', 'cloud', 'cloudDocs'), seconds: 35
    },
    'remote-locality': {
      question: 'Can I keep steering Copilot after I leave my desk?',
      notes: [
        '"The staging investigation is mid-flight and you have to walk into a meeting. You do not want to stop it, and you do not want it to run unsupervised."',
        'Point left: on staging-host, /remote on. The CLI shows a GitHub.com link, and Ctrl+O toggles a QR code that opens the session in GitHub Mobile. /keep-alive busy keeps the machine awake while Copilot works.',
        'Point right: on the phone you see the same session. Copilot found connection refused on the redis port and asks to run systemctl status redis. You tap Allow and add an instruction: read only, no restarts, then summarize.',
        '"The command runs on staging-host. Only the conversation moved to your pocket."',
        'This closes worker to work: the work stays where its evidence is, and the worker stays in reach of it. Permission requests arrive on the phone under the same permission mode; remote control does not loosen policy or sandboxing.',
        'Session sync alone is view-only; steering requires /remote on, the same GitHub account, and the host and session still running. The session and messages shown are representative.',
        '→ Twenty minutes later, you are back at the terminal.'
      ],
      know: [
        'Docs: remote control lets you view output, respond to permission requests, and continue working from GitHub.com or GitHub Mobile. Bare /remote shows status or redisplays access details; /remote off ends it. settings.json remoteSessions: true enables it for every interactive session.',
        'Ctrl+O toggles the QR code only when the input field is empty; it also expands or collapses all details in the conversation.',
        '/keep-alive takes an option such as busy (stay awake only while Copilot is working or waiting on you); without an option it shows status. tmux or screen preserve a process across SSH disconnects; that is separate from remote control.',
        'Remote control does not require a GitHub-hosted repository. If the CLI cannot resolve a configured but inaccessible remote, it shows Remote session disabled.',
        'Prompts, selected context, and session results cross service boundaries; host-local execution is not zero data exposure. Follow organization remote-access policy.',
        'Assisted permissions can approve unintended actions and exclude sandbox-bypass requests. Remote access changes neither that limitation nor enterprise restrictions.',
        'Several hosts remain separate sessions you steer one by one; /fleet coordinates subtasks inside one session, not across machines.'
      ],
      cue: [
        'On an approved staging host, start copilot, run /remote on, and press Ctrl+O with an empty prompt to show the QR code. Scan it with GitHub Mobile signed in to the same account.',
        'Ask for a read-only check that needs approval, approve it from the phone, then show the result on the host terminal.',
        'Finish with /remote off and bare /remote to show it is off.'
      ],
      sources: refs('remote', 'about', 'command', 'permissions', 'assisted', 'sandbox', 'fleet'), seconds: 100
    },
    'walking-incident': {
      question: 'What is waiting for me when I get back to the terminal?',
      notes: [
        '"Back at the desk. Nothing to catch up on, because nothing happened anywhere else."',
        'Read the terminal top to bottom. Your approval from the phone, the command it ran on this host, your instruction, and Copilot’s summary are all in this one session, in order. Redis has been down since 10:31; that lines up with the 503s. Cause unknown; next check is its last log lines.',
        'Continue typing at the desk as if you never left, then /remote off when you no longer need the phone.',
        '"The worker moved twice. The work never moved at all."',
        'Point to what carried over: one session on one host, the approvals in order, the same permission mode and sandbox, and an explicit way to end remote access.',
        'The session shown is representative, not a recorded run; the exact terminal label for remotely sent messages may differ.',
        '→ Cloud sessions carry a different kind of state across clients.'
      ],
      know: [
        'A local session resumed on another machine does not move its tools or live environment; remote control works because the original session never stopped.',
        'If remote control is unavailable, keep the investigation on the host terminal and present these two slides as the documented flow.'
      ],
      sources: refs('remote', 'best', 'permissions'), seconds: 65
    },
    'host-forensics': {
      question: 'Why bring intelligence to a log host?',
      notes: [
        '"A day of auth logs is too large to paste and too sensitive to copy around. So we bring Copilot to it."',
        'Point left: about 1.8 million lines stay on the host. Host tools read them there. Copilot never sees the raw corpus; it sees only the short outputs of the commands it requests.',
        'Walk the middle column top to bottom. Each output decides the next question: one account dominates, so check its sources; one /24, so check whether that range is new; zero hits yesterday, so it is new. A fixed script would not know to ask question two or three; Copilot chooses them from the evidence.',
        '"Ten lines of tool output crossed the distance. A day of logs did not."',
        'Point right: the finding cites counts the operator can rerun, names what is still unknown, and hands the next decision to the account owner. No blocking, rotation, or remediation is proposed by the tooling.',
        'This is an illustrative run with invented, documentation-range data (203.0.113.0/24 is reserved for examples). No live Copilot analysis was recorded. Command outputs and prompts reach the selected provider; this is less data movement, not zero exposure.',
        '→ The tools went to the data. Inference placement is a separate choice.'
      ],
      know: [
        'The original 12 GB corpus was illustrative. There is no attached transfer measurement, completed analysis, or compliance assessment.',
        'The original grep and awk pipeline depended on log format. Use a checked parser for the actual format and avoid exposing personal or credential data in output.',
        'A local model on a log host needs that host’s runtime and endpoint configuration; a local workstation model is not automatically local to the remote host.',
        'Prompt and result communication still cross service boundaries. Data classification, retention, and provider selection remain required.',
        'If findings suggest an incident, hand the report to the authorized response owner; do not automate blocking or destructive response from this script.'
      ],
      cue: [
        'On an authorized disposable host, generate a synthetic auth.log with a planted pattern (one account, one documentation-range /24) plus background noise, and an auth.log.1 without that range. The walkthrough has a generator.',
        'Ask Copilot, read-only: "Investigate failed authentications in auth.log. Cite counts I can rerun." Inspect each requested command before permitting it.',
        'Compare the finding with the planted pattern. If Copilot takes a different path, follow its actual commands; record a live result only after checking it.'
      ],
      sources: refs('use', 'best', 'models'), seconds: 100
    },
    'cloud-continuity': {
      question: 'What if the work needs to keep going after I close the laptop?',
      notes: [
        '"Remote control needs your machine on. Sometimes you want the opposite: hand the session to something that does not sleep, and pick it up wherever you are."',
        'Read the timeline left to right. At 09:10 on the laptop, copilot --cloud starts an interactive session in a GitHub-hosted Linux sandbox; Copilot clones the repo there and runs commands and tests there. Ask for the change and close the lid.',
        'At 12:30 on the phone, the same session is still working: retries added, tests passing, diff ready. Steer it: cap retries at 3.',
        'At 15:00 on another machine, open the same session from GitHub.com. Files and in-progress work are intact because a stopped session keeps a snapshot. Ask for a draft PR and review it like any other.',
        '"Now and later, without your machine in the loop."',
        'Point to the bottom row. /remote: your machine runs the work, so it stays on. --cloud: GitHub runs it, so the laptop can close. The boundary: a cloud sandbox cannot read your local files or reach staging-host, so host-only investigations stay on the host.',
        'The session shown is representative, not a recorded run.',
        '→ Bring the four distances back together.'
      ],
      know: [
        'copilot --cloud is interactive only; it cannot be combined with -p or -i, and it applies only to the session it starts. CLI sessions run locally by default.',
        'Environment is chosen at session start (Cloud by default where a choice exists; Actions for setup-steps, larger or self-hosted runners, or Windows). Changing it means a new session.',
        'Network access follows the Copilot cloud agent firewall and allowlist. Allowlist changes apply to new sessions, not running ones.',
        'Personal instructions, skills, and custom agents can come along via a dotfiles repository with a root .copilot directory (not for Actions-based sessions).',
        'Billing is usage-based across compute (vCPU seconds), memory (GiB seconds), and snapshot storage (GiB months); check current rates before presenting. The organization policy Copilot in the cloud controls access and is on by default.',
        'Cloud sessions can be continued from the GitHub website, GitHub Mobile, the Copilot app, VS Code, and other supported clients. Confirm the current UI for reopening a session before presenting.'
      ],
      cue: [
        'In a low-risk repository, run copilot --cloud and ask for a small change with tests. Close the terminal.',
        'Open the same session in GitHub Mobile or on GitHub.com, steer it once, and show that files and progress are intact. If access or client support is missing, show this slide as the documented flow.'
      ],
      sources: refs('cloud', 'cloudDocs', 'connected'), seconds: 110
    },
    'before-after': {
      question: 'What changes in the way I work?',
      notes: [
        '"Each distance has a concrete artifact we can inspect."',
        'Read the four pairs: Docker outputs choosing the next probe; a day of logs that never moved, with a cited finding; CI explaining its own red test; and an /after check that came back with evidence. These are inspectable artifacts, not measured performance improvements.',
        '→ Choose one relationship to test this week.'
      ],
      know: [
        'The old headline elapsed-time estimates have been removed because they did not carry observed run evidence.',
        'Cloud continuity, reusable workflow definitions, and host steering preserve different things; each needs its own evidence and acceptance decision.'
      ],
      sources: refs('about', 'permissions', 'workflow', 'cloudDocs', 'remote'), seconds: 45
    },
    today: {
      question: 'What can I try and verify next?',
      notes: [
        '"Choose one distance, not four pilots. Ask beside a task, run Copilot where the logs live, explain a failed CI run, or set an /after check on your next fix."',
        '"Inspect the artifact that makes your next decision easier. Name who accepts it, and stop and re-scope when the evidence disagrees."',
        'Ask for an own-work example: what is separated, what brings it closer, and what observable result improves?',
        '→ Use the sources to check version-sensitive details.'
      ],
      know: [
        'The related walkthrough is a proposed rehearsal path, not a record of successful runs.',
        'Record your own elapsed time, corrections, reviewer effort, and acceptance quality before claiming a benefit. The first useful signal is a credible artifact and a sound decision.'
      ],
      sources: refs('install', 'plan', 'command', 'remote', 'cloudDocs'), seconds: 65
    },
    references: {
      question: 'Where can I verify these claims and limits?',
      notes: [
        '"These are first-party sources. Claim-specific links sit with every slide’s notes, and the landing page carries the reference inventory."',
        'Recheck installed commands, platform support, preview access, and current cloud billing before delivery. November 2 verification is a dated snapshot.',
        '→ Close with the audience’s next decision.'
      ],
      know: [
        'Latest stable baseline is v1.0.105. Do not promote prerelease release-note behavior into stable claims.',
        'All feature demonstrations in this refresh remain proposed live checks or representative traces. Automated deck validation verifies presentation behavior, not product behavior.'
      ],
      sources: Object.values(SRC), seconds: 30
    },
    thanks: {
      question: 'Which judgment do I carry into my own work?',
      notes: [
        '"Bring intelligence to the work, and keep the worker within reach."',
        '"Which distance will you close, and what evidence will you inspect?"',
        'Invite one candidate task and its acceptance evidence. Leave the remaining slot for questions.'
      ],
      know: ['The closing settles the opening scene: the same four pairs held against the prompt, with the own-work question beneath.'],
      sources: refs('about', 'best'), seconds: 20
    }
  };
  // Approved distance-first running order; definitions above retain artifact groupings.
  const order = [
    'title', 'core-question', 'distance-model', 'contents',
    'part-1', 'plan-mode-loop', 'docker-clarify', 'docker-plan', 'steer-boundary',
    'part-2', 'interactive-diagnosis', 'host-forensics', 'local-model', 'cloud-containment',
    'part-3', 'programmatic-command', 'workflow-reuse', 'workflow-definition', 'workflow-code', 'rubber-duck', 'workflow-report',
    'authority-boundary', 'local-containment',
    'part-4', 'delegate-cloud', 'scheduled-patrol', 'compact-quality', 'memory-chronicle',
    'rewind-recovery', 'remote-locality', 'walking-incident', 'cloud-continuity',
    'before-after', 'today', 'references', 'thanks'
  ];
  slides.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  slides.forEach(s => Object.assign(s, NOTES[s.id]));
  window.DECK = {
    meta: {
      slug: 'copilot-cli', title: 'GitHub Copilot CLI: Intelligence Within Reach', short: 'Copilot CLI',
      category: 'practitioner tech talk', source: 'tech-talks/copilot-cli/README.md',
      question: 'How do I get AI help right where I’m working?',
      thesis: 'Bring intelligence to the work, and keep the worker within reach.'
    },
    slides
  };
})();
