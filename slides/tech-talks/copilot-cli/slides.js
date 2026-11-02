/*
  GitHub Copilot CLI — teaching data and speaker notes.
  The README is the landing page; this file is the talk and handout.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    about: { label: 'About GitHub Copilot CLI', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli' },
    use: { label: 'Use GitHub Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli' },
    install: { label: 'Install Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli' },
    command: { label: 'GitHub Copilot CLI command reference', href: 'https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference' },
    plan: { label: 'Plan Mode announcement and steering', href: 'https://github.blog/changelog/2026-01-21-github-copilot-cli-plan-before-you-build-steer-as-you-go/' },
    sandbox: { label: 'About cloud and local sandboxes', href: 'https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes' },
    schedule: { label: 'Scheduling prompts in GitHub Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts' },
    fleet: { label: 'Running tasks in parallel with /fleet', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet' },
    fleetHowto: { label: 'Speeding up task completion with /fleet', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/speeding-up-task-completion' },
    remote: { label: 'Steering a session remotely', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely' },
    remotePreview: { label: 'Remote control CLI sessions on web and mobile (public preview)', href: 'https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/' },
    chronicle: { label: 'Using GitHub Copilot CLI session data (/chronicle)', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle' },
    chronicleConcept: { label: 'About GitHub Copilot CLI session data', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/chronicle' },
    best: { label: 'Copilot CLI best practices', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices' },
    instructions: { label: 'Adding custom instructions for Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions' },
    plugin: { label: 'Finding and installing plugins for Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing' },
    pluginAbout: { label: 'About plugins for Copilot CLI', href: 'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins' },
    pluginNews: { label: 'Agent Plugins 1.0 in VS Code, Copilot CLI, and Copilot app', href: 'https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app' },
    releases: { label: 'GitHub Copilot CLI releases', href: 'https://github.com/github/copilot-cli/releases' },
    memory: { label: 'Copilot repository instructions and memory', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-instructions' },
    mcp: { label: 'Add an MCP server to Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server' },
    pluginsTalk: { label: 'Copilot Plugins practitioner talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/copilot-plugins' }
  };
  const refs = (...keys) => keys.map((k) => SRC[k]);

  const slides = [
    S('title', 0, 'GitHub Copilot CLI', {
      chrome: false, visual: 'session-bridge',
      subtitle: 'AI at the Point of Work',
      tagline: 'Close distance across intent, complexity, context, time, and geography.',
      meta: 'CopilotTraining · Practitioner Tech Talk'
    }),
    S('core-question', 0, 'How do I bring AI to where the work actually is — and keep steering it from wherever I am?', {
      pill: 'Core Question',
      subtitle: 'One session can connect the task, its execution place, and the person who reviews the result.',
      highlight: 'Clarify before action; keep authority and evidence visible.',
      routing: ['intent', 'execution', 'session', 'steering'],
      routingLabel: 'Reduce the distance',
      roles: [
        { icon: '⌨️', title: 'Developer', description: 'Diagnose code and runtime behavior from the terminal.' },
        { icon: '⚙️', title: 'Platform engineer', description: 'Choose where operational context and tools remain.' },
        { icon: '🧭', title: 'CLI practitioner', description: 'Match the work to a mode and keep review in reach.' }
      ],
      stats: [
        { title: 'Intent', description: 'Copilot asks; the practitioner approves the plan.' },
        { title: 'Authority', description: 'Tool permissions define what Copilot may execute.' },
        { title: 'Evidence', description: 'A report, diff, test, or runtime signal is reviewed.' }
      ],
      notes: [
        '"The terminal is a strong control surface when runtime context and tools matter. The session keeps that investigation steerable."',
        'Name the actors: the practitioner sets the task and approves consequential work; Copilot proposes or runs only within the configured controls.',
        'The session joins intent, execution, context, and steering. The following sections test that claim with a Docker example, a CI artifact, recovery, and a host-local remote scenario.',
        '→ Start with the map: five kinds of distance, and the specific capability that changes each one.'
      ],
      know: [
        'The original question wording is preserved from the approved talk.',
        'Copilot CLI is one possible control surface. Editor-first code changes, GitHub-hosted collaboration, or another governed tool can be a better fit for other tasks.'
      ],
      sources: refs('about', 'use'),
      seconds: 65
    }),
    S('contents', 0, 'Four moves bring the session closer to the work', {
      sections: [
        { icon: '🧭', title: 'Plan Before You Build', subtitle: 'Clarify intent', blurb: 'Ask, scope, approve, then inspect the Docker result.', slide: 4 },
        { icon: '⚖️', title: 'Choose the Right Mode', subtitle: 'Bound autonomy', blurb: 'Match interactive, CI, fan-out, schedule, or delegation to the task.', slide: 10 },
        { icon: '🔄', title: 'Keep the Session Alive', subtitle: 'Preserve context', blurb: 'Compact deliberately, carry repository knowledge, and recover turns.', slide: 21 },
        { icon: '🌍', title: 'Work from Anywhere', subtitle: 'Separate execution and steering', blurb: 'Keep data on its host while the operator supervises remotely.', slide: 26 }
      ],
      notes: [
        '"We will move from the intent decision to operating boundaries, then use session continuity to earn the remote handoff."',
        'Point to the four opener numbers. The contents links jump to slides 4, 10, 21, and 26.',
        '→ First, make the desired outcome and the approved plan visible before tool execution begins.'
      ],
      know: ['The four section names preserve the approved recipe spine.'],
      sources: refs('about'),
      seconds: 35
    }),
    S('part-1', 1, 'Plan Before You Build', {
      scene: 'opener',
      subtitle: 'Turn an ambiguous runtime request into a plan the operator can approve.',
      cards: [
        { icon: '🧭', title: 'Map the gap', blurb: 'Intent is the first distance' },
        { icon: '❓', title: 'Ask first', blurb: 'Clarify the diagnostic scope' },
        { icon: '✅', title: 'Approve evidence', blurb: 'Inspect before changing files' }
      ],
      terminal: { context: 'Backend container will not start', detail: 'Question → plan → two focused checks' },
      notes: [
        '"Plan Mode changes the order of work: clarify the request, review the plan, then let Copilot act within the approved scope."',
        'This Docker scenario is an illustrative example retained from the source talk; it is not a published benchmark or a live run in this conversion.',
        '→ The distance model gives us a way to see why the next sections belong in the same talk.'
      ],
      know: ['The source talk compares a 45-minute, eight-attempt baseline with an eight-minute, two-check scenario. Keep both values labeled as illustrative estimates wherever shown.'],
      sources: refs('plan', 'about'),
      seconds: 45
    }),
    S('distance-model', 1, 'One session closes five kinds of distance', {
      scene: 'signals',
      rows: [
        { label: 'Intent', description: 'Ask before choosing an interpretation', tag: 'Plan Mode', z: 'purple' },
        { label: 'Complexity', description: 'Split a plan into independent tasks', tag: '/fleet', z: 'local' },
        { label: 'Context', description: 'Carry and recover useful session state', tag: 'compact + memory', z: 'green' },
        { label: 'Time', description: 'Hand off long-running repository work', tag: '& delegation', z: 'github' },
        { label: 'Geography', description: 'Run where the runtime evidence lives', tag: '--remote', z: 'orange' }
      ],
      subtitle: 'Each move has a different decision and a different boundary.',
      footnote: 'A route map, not a feature ranking.',
      notes: [
        '"These five distances are a map of practitioner decisions, not five features to turn on at once."',
        'Trace the row labels from intent through geography. Later, separate /fleet on one execution host from multiple independent --remote sessions.',
        '→ The first decision is whether the task is clear enough to begin execution.'
      ],
      know: [
        'Intent is handled through Plan Mode; complexity through explicit /fleet decomposition; context through compaction and repository memory; time through cloud delegation; geography through host-local remote sessions.',
        'The pattern stops fitting when another surface owns the decisive context, or when the operator cannot safely grant the required tools.'
      ],
      sources: refs('about', 'plan', 'fleet', 'remote'),
      seconds: 65
    }),
    S('plan-mode-loop', 1, 'Plan Mode puts the decision before the edit', {
      scene: 'showdown',
      leftLabel: 'Start coding immediately',
      rightLabel: 'Clarify, then approve',
      subtitle: 'Shift+Tab enters Plan Mode in an interactive session.',
      pairs: [
        { left: { label: 'Request', note: 'One interpretation is assumed' }, right: { label: 'Request', note: 'Operator states the desired result', z: 'purple' } },
        { left: { label: 'Generate', note: 'Changes arrive before ambiguity is surfaced' }, right: { label: 'Questions', note: 'Copilot asks about logs, config, and scope', z: 'purple' } },
        { left: { label: 'Discover mismatch', note: 'Review finds an unsuitable change' }, right: { label: 'Plan review', note: 'Operator approves or redirects the plan', z: 'orange' } },
        { left: { label: 'Repeat', note: 'Source scenario: 8 attempts, 45 minutes' }, right: { label: 'Execute', note: 'Source scenario: 2 checks, 8 minutes', z: 'green' } }
      ],
      outcomeLeft: { icon: '↻', label: '45m / 8 attempts · illustrative' },
      outcomeRight: { icon: '✓', label: '8m / 2 checks · illustrative' },
      footnote: 'The time and attempt counts are source-talk scenario estimates, not measured study results.',
      notes: [
        '"Plan Mode gives the practitioner an explicit point to correct the interpretation before edits begin."',
        'The 45/8 and 8/2 figures come from the source scenario. No test protocol, logs, or comparative study accompany them, so do not call them measured savings.',
        'Shift+Tab is the documented interactive toggle in the talk source. Current shortcuts and options can change; confirm them in the command reference.',
        '→ Let us make the clarification exchange concrete with the backend-container request.'
      ],
      know: [
        'The source scenario contrasts eight attempts over 45 minutes with two targeted checks over eight minutes. Treat each number as illustrative, not a guaranteed result.',
        'Plan Mode and /autopilot or /goal are separate controls. The latter commands focus an objective; they are not synonyms for collaborative planning.',
        'The source uses follow-up prompts such as “Also check if Redis is running” and “Focus on authentication-related errors first” to illustrate steering while a response is in progress.',
        'The source description identifies ask_user as the clarification mechanism. The practitioner still owns whether the plan is acceptable.'
      ],
      sources: refs('plan', 'command', 'releases'),
      seconds: 60
    }),
    S('docker-clarify', 1, 'The operator narrows the Docker question before Copilot checks', {
      scene: 'terminal',
      termTitle: 'Illustrative Plan Mode transcript',
      subtitle: 'The request, questions, and human answer stay visible together.',
      transcript: [
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: 'Debug why the backend container will not start.' },
        { type: 'thinking', label: 'Copilot · Plan Mode asks:' },
        { type: 'response', lines: ['Check logs, compose config, or both?', 'Include environment analysis?', 'Any recent service or network changes?'] },
        { type: 'user', text: 'Start with logs; inspect config if the logs point there.' },
        { type: 'divider' },
        { type: 'outcome', text: 'Scope is now logs first, then config if relevant.' }
      ],
      footnote: 'Illustrative scenario from the talk source; the transcript is not a recorded CLI session.',
      notes: [
        '"Notice who narrows the task: Copilot asks, and the operator chooses logs first with configuration as a conditional next step."',
        'Keep the example scenario label visible. This is a representative script, not a claim that the deck author executed it.',
        '→ A clear answer lets Copilot propose a bounded plan rather than silently broaden the diagnosis.'
      ],
      know: [
        'The source example asks whether to inspect docker-compose configuration, container logs, or both; whether to include environment variables; and whether recent service or network changes matter.',
        'The operator answer is to start with logs and consult configuration if needed. Avoid sharing actual secrets in prompts; inspect secret names or approved redacted signals instead.'
      ],
      sources: refs('plan', 'use', 'best'),
      seconds: 75
    }),
    S('docker-plan', 1, 'The approved plan makes two checks inspectable', {
      scene: 'four-phases',
      subtitle: 'Copilot proposes; the operator accepts the scope; the result remains subject to review.',
      stages: [
        { label: '1', name: 'Ask', icon: '❓', description: 'Confirm logs first and config only if relevant' },
        { label: '2', name: 'Plan', icon: '🧾', description: 'Read backend logs, inspect config if indicated' },
        { label: '3', name: 'Approve', icon: '✋', description: 'Operator reviews the plan before execution' },
        { label: '4', name: 'Verify', icon: '🔎', description: 'Check the port mapping and rerun the container', target: true }
      ],
      stageLabel: 'Step',
      gateLabel: 'human check',
      footnote: 'The source example reports 5001:5000 versus the app’s expected internal port 5000; it is an illustrative output.',
      notes: [
        '"The review gate is part of the mechanism: a proposed plan is not the same thing as permission to execute it."',
        'The source example identifies a port mapping of 5001:5000 while the app expects internal port 5000, then proposes a fix. Label it as sample output and ask the presenter to validate the actual compose file and health check in a real demo.',
        'Do not promise a successful container start from the drawing; the observable confirmation is the operator’s own rerun and health check.',
        '→ The operator can also steer or reject a tool request when it crosses the agreed boundary.'
      ],
      know: [
        'A port mapping uses host and container ports; the example’s reported mapping and expected app port are taken from the source talk.',
        'The source’s example change is service.ports from 5001:5000 to 5000:5000. Treat the mapping as illustrative and verify the actual compose file and expected listener before editing.',
        'The source does not include an attached run log. Do not present the root cause or the eight-minute outcome as independently observed evidence.',
        'A useful acceptance check is the service starting and a health endpoint or equivalent returning the expected result.'
      ],
      sources: refs('plan', 'use'),
      seconds: 75
    }),
    S('steer-boundary', 1, 'A rejected tool request can redirect the work', {
      scene: 'terminal',
      termTitle: 'Illustrative rejection and redirect',
      subtitle: 'Permission decisions and task steering are separate from Copilot’s proposed behavior.',
      transcript: [
        { type: 'prompt', text: 'copilot · checking a temporary workspace' },
        { type: 'user', text: 'Keep generated artifacts in tmp; do not remove them.' },
        { type: 'thinking', label: 'Copilot requests a destructive command:' },
        { type: 'response', lines: ['rm -rf tmp/*'] },
        { type: 'user', text: 'Esc · Do not delete tmp; those artifacts are needed.' },
        { type: 'divider' },
        { type: 'outcome', text: 'Operator rejects the request and explains the constraint.' }
      ],
      footnote: 'The command is a warning example from the source talk, not an instruction to run.',
      notes: [
        '"A rejection can carry useful context. The operator blocks the proposed deletion and explains why the files matter."',
        'Point out the actors: Copilot proposes a tool action; the configured permission control asks; the operator approves, denies, or redirects. A rejected request is not evidence that the underlying task is complete.',
        '→ Part two applies the same authority judgment to different operating modes.'
      ],
      know: [
        'The source describes Escape plus inline feedback as a way to reject a tool permission and redirect Copilot. Verify current key behavior against the installed CLI version.',
        'Never run the destructive command from the example. It exists to make the permission boundary visible.'
      ],
      sources: refs('use', 'command', 'best'),
      seconds: 65
    }),
    S('part-2', 2, 'Choose the Right Mode', {
      scene: 'opener',
      subtitle: 'Match the task’s uncertainty, runtime, duration, and approval path to a mode.',
      cards: [
        { icon: '💬', title: 'Collaborate', blurb: 'Interactive diagnosis' },
        { icon: '📄', title: 'Automate', blurb: 'A bounded CI artifact' },
        { icon: '⚡', title: 'Delegate', blurb: 'Parallel or background work' }
      ],
      terminal: { context: 'Start with the task and its boundary', detail: 'Mode choice → evidence → human review' },
      notes: [
        '"Mode choice is a decision about who acts, where execution happens, and what the operator will inspect."',
        'The following ladder is for task selection, not a ranking of autonomy.',
        '→ Compare the modes by the kind of uncertainty and follow-up they create.'
      ],
      know: ['The approved recipe emphasizes interactive diagnosis, programmatic CI, /fleet, cloud delegation, and session-scoped scheduled prompts.'],
      sources: refs('about', 'use'),
      seconds: 45
    }),
    S('mode-ladder', 2, 'Choose the mode by the task’s next decision', {
      scene: 'scorecard',
      subtitle: 'A useful mode leaves a reviewable output and a clear owner for the next step.',
      cards: [
        { icon: '💬', title: 'Interactive · copilot', description: 'Uncertain diagnosis; ask, steer, inspect, and decide in a durable session.' },
        { icon: '📄', title: 'Programmatic · -p', description: 'One headless prompt; return a bounded report to CI or a script.' },
        { icon: '⚡', title: '/fleet', description: 'Parallelize independent subtasks inside one reviewed plan and execution context.' },
        { icon: '☁️', title: '& task / /every', description: 'Hand off longer work or schedule a session-scoped prompt; keep review explicit.' }
      ],
      footnote: 'Use an editor or GitHub surface when its context or artifact is decisive.',
      notes: [
        '"Start from the output you need, not from a feature list: a diagnosis, a CI report, parallel subtasks, or work that runs later."',
        'Interactive work is a good fit when root cause is uncertain and the operator needs to steer. Programmatic mode is for a single headless prompt. /fleet decomposes a task; it is not a separate host. The ampersand delegates to GitHub’s coding agent. Scheduled prompts are an experimental session feature.',
        '→ The interactive session keeps runtime evidence beside the conversation.'
      ],
      know: [
        'Decision tree: runtime state and iterative diagnosis point toward interactive CLI; reproducible one-shot analysis points toward copilot -p; independent subtasks point toward /fleet; a long repository task that can be reviewed as a PR may fit the ampersand handoff; a recurring check that runs while the interactive session is open may fit /every or /after.',
        'For in-editor completion, cross-repository browsing, or hosted code review, use the relevant VS Code or GitHub surface instead of forcing the task into the terminal.',
        'The source’s reasoning controls include selecting a currently supported model with /model and setting effort from low through higher levels; Ctrl+T is described as toggling reasoning visibility. Model names, effort labels, and shortcuts change, and organization policy can hide catalog entries.',
        'The source distinguishes a session model choice from durable defaults: /model is session-scoped; /config model or /model --global sets a user default; /model --repo pins a repository default. A model multiplier such as 1x or 2x indicates premium-request use per prompt. Check the current catalog and policy before pinning.',
        'The source also mentions custom providers through COPILOT_PROVIDER_* environment variables and `copilot help providers`; the provider must support tool calling and streaming. Treat BYOK availability and exact configuration as version-sensitive.'
      ],
      sources: refs('about', 'use', 'schedule', 'fleet'),
      seconds: 60
    }),
    S('interactive-diagnosis', 2, 'Interactive mode keeps the runtime investigation steerable', {
      scene: 'terminal',
      termTitle: 'Illustrative local or host session',
      subtitle: 'The practitioner requests evidence first; the operator decides whether a fix is in scope.',
      transcript: [
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: 'The service returns 503 in staging but works locally. Diagnose; do not edit yet.' },
        { type: 'thinking', label: 'Copilot proposes checks:' },
        { type: 'response', lines: ['Read recent service logs', 'Compare approved environment-variable names', 'Check the configured dependency endpoint'] },
        { type: 'user', text: 'Start with logs and the staged config; redact secret values.' },
        { type: 'divider' },
        { type: 'outcome', text: 'Evidence is gathered before a change is proposed.' }
      ],
      footnote: 'Representative prompt only. Do not paste credentials or unredacted secrets.',
      notes: [
        '"Interactive mode is useful when the next diagnostic step depends on what the runtime evidence shows."',
        'This is a representative workflow built from the source use case, not an observed diagnosis. Name the task, environment, and change boundary in the prompt. Inspect the exact commands and outputs before approving them.',
        '→ When the same question can be asked once in CI, programmatic mode can return a file for review.'
      ],
      know: [
        'The original README example inspects docker logs, environment variable names, and a dependency endpoint. Keep credential values out of the prompt and choose approved commands for the target environment.',
        'The source scenario reports a missing JWT_SECRET in staging, successful Redis connectivity, and a separate 503-versus-401 behavior to investigate. These are illustrative outputs, not an observed production diagnosis.',
        'Interactive sessions maintain context across turns, but they still need a clear task boundary and a review of proposed edits.'
      ],
      sources: refs('use', 'best'),
      seconds: 60
    }),
    S('programmatic-command', 2, 'Programmatic mode turns one prompt into a CI artifact', {
      scene: 'terminal',
      termTitle: 'Command pattern · inspect before posting',
      subtitle: 'The workflow author scopes tools; Copilot writes analysis, not a production fix.',
      transcript: [
        { type: 'prompt', text: 'copilot -p "Summarize this build failure and suggest likely causes."' },
        { type: 'user', text: "--allow-tool 'shell(gh)'   --allow-tool 'shell(git)'" },
        { type: 'thinking', label: 'Headless invocation:' },
        { type: 'response', lines: ['Redirect the response to failure-analysis.txt', 'Attach it to a run summary or a reviewable PR comment'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Artifact: failure-analysis.txt · reviewer checks it before action.' }
      ],
      footnote: 'Shell quoting, authentication, and available flags vary by runner and CLI version.',
      notes: [
        '"The useful handoff is a report the CI reviewer can inspect, not an automatic change to the failing code."',
        'The source example uses copilot -p with shell(gh) and shell(git), then redirects output to a text artifact. In a real workflow, pin installation, provide a least-privilege token, protect logs and summaries, and verify current flags.',
        '→ The artifact is useful only if we separate the run status from the diagnosis it contains.'
      ],
      know: [
        'A full source example installs @github/copilot in a GitHub Actions job, sets a Copilot token from a secret, runs analysis after a failure, and optionally posts the report with gh. The sample does not supply a tested permission or credential design; tailor authentication and PR-comment authority to the repository.',
        'The historical YAML uses GITHUB_TOKEN from secrets.COPILOT_GITHUB_TOKEN, runs copilot -p after failure, writes failure-analysis.txt, and optionally calls gh pr comment with --body-file. Treat it as a workflow sketch; verify token permissions, fork behavior, quoting, and the runner’s current install path.',
        'The domain result is the failure analysis. GitHub Actions failure status is a separate workflow signal.',
        'The source shows --allow-tool shell(gh) and shell(git); treat tool names as version-sensitive and confirm the current CLI reference.'
      ],
      sources: refs('use', 'command', 'install'),
      seconds: 70
    }),
    S('ci-artifact', 2, 'CI returns a report for review, not an automatic repair', {
      scene: 'showdown',
      leftLabel: 'Manual triage example',
      rightLabel: 'Programmatic report',
      subtitle: 'A failed build triggers bounded analysis; the maintainer still owns acceptance.',
      pairs: [
        { left: { label: 'Failure signal', note: 'Build job exits unsuccessfully' }, right: { label: 'Failure signal', note: 'Actions condition runs the analysis step', z: 'purple' } },
        { left: { label: 'Collect evidence', note: 'Engineer finds logs and recent commits' }, right: { label: 'Scoped tools', note: 'Copilot can call the named CLI tools', z: 'orange' } },
        { left: { label: 'Write diagnosis', note: 'Notes stay in the operator’s context' }, right: { label: 'Save report', note: 'failure-analysis.txt is reviewable', z: 'green' } },
        { left: { label: 'Choose a fix', note: 'Maintainer tests and approves changes' }, right: { label: 'Choose a fix', note: 'Maintainer validates before applying', z: 'orange' } }
      ],
      outcomeLeft: { icon: 'i', label: '25m manual baseline · estimate' },
      outcomeRight: { icon: '✓', label: '5m report · source estimate' },
      footnote: 'The 25-to-5-minute figures are illustrative estimates from the source talk, not measured CI results.',
      notes: [
        '"The practical improvement is a repeatable, reviewable artifact after a failure. The maintainer still decides whether the explanation is right."',
        'The source talk gives a 25-minute manual baseline and a five-minute automated analysis figure. No run history or benchmark accompanies them; present them as illustrative estimates, not observed performance.',
        'Keep the CI status separate from the report’s diagnosis. A completed step does not verify that its explanation is correct.',
        '→ Parallel work uses the same principle: Copilot can decompose, but the operator owns scope and review.'
      ],
      know: [
        'A report may cite recent commits, dependency changes, or error patterns. The human reviewer compares those claims with the actual logs and repository evidence.',
        'Posting a report as a pull-request comment can require additional GitHub permissions beyond reading build artifacts. Do not infer write authority from the example’s shell(gh) allow rule.'
      ],
      sources: refs('use', 'command'),
      seconds: 80
    }),
    S('fleet-work', 2, '/fleet parallelizes independent work inside one plan', {
      scene: 'four-phases',
      subtitle: 'One orchestrator decomposes, schedules, and merges subtasks in the session’s execution context.',
      stages: [
        { label: '1', name: 'Approve', icon: '✋', description: 'Operator agrees on the plan and task boundary' },
        { label: '2', name: 'Decompose', icon: '🧩', description: 'Copilot identifies independent subtasks and dependencies' },
        { label: '3', name: 'Parallelize', icon: '⚡', description: 'Subagents work in separate context windows where possible' },
        { label: '4', name: 'Review', icon: '🔎', description: 'Orchestrator returns results; maintainer checks the diff', target: true }
      ],
      stageLabel: 'Move',
      gateLabel: 'dependency check',
      footnote: 'Parallelism helps independent work; dependent steps still run in order.',
      notes: [
        '"Use /fleet after a plan is clear and the work has independent parts. The orchestrator handles the decomposition; the maintainer reviews the result."',
        'The source example is /fleet implement all phases of this auth plan. It can also fan out independent test tasks. A subagent gets its own context window; results return to the orchestrator.',
        '→ Parallelism changes the number of tool actions, so permissions and cost deserve their own review.'
      ],
      know: [
        'The recipe preserves the boundary that /fleet is subagent orchestration inside one approved plan on one execution host. Multiple remote machines are separate sessions, not one /fleet distributed host fleet.',
        'Dependent tasks will not become faster just because /fleet is used. Each subagent can make independent model calls, so premium request use may increase.',
        'Specialized and custom agents can be selected for matching subtasks where configured. Review each resulting artifact and the combined diff.'
      ],
      sources: refs('fleet', 'fleetHowto', 'command'),
      seconds: 75
    }),
    S('authority-boundary', 2, 'Tool permission is an authority boundary, not a speed setting', {
      scene: 'signals',
      subtitle: 'The actor who approves the request remains visible at each gate.',
      rows: [
        { label: 'Copilot proposes', description: 'A shell, file, or GitHub action is requested', tag: 'Inspect tool', z: 'purple' },
        { label: 'Policy scopes', description: 'Per-tool or session approval limits actions', tag: '--allow-tool', z: 'local' },
        { label: 'Human decides', description: 'Approve, deny, or explain a constraint', tag: 'Operator review', z: 'orange' },
        { label: 'Org controls', description: 'Managed policy can block permission bypass', tag: 'disableBypass…', z: 'github' }
      ],
      footnote: 'Avoid blanket --allow-all-tools or --yolo in environments with consequential credentials.',
      notes: [
        '"Permission changes who can act. Containment changes what those actions can reach. Neither replaces a human acceptance decision."',
        'Name the four actors and layers: Copilot proposes; CLI permission settings gate tools; the operator approves or rejects; organization policy can prevent bypass modes.',
        '→ Sandboxing adds containment, but local and cloud sandboxes have different tradeoffs.'
      ],
      know: [
        'The source names --allow-all-tools and --yolo as broad convenience options, and notes that an authenticated agent may reach resources accessible to those credentials.',
        'The source names the managed setting permissions.disableBypassPermissionsMode as a control that can prevent enabling --yolo or /allow-all in organization-managed environments.',
        'Per-session approvals may auto-approve later pending requests of the same type. Read the actual confirmation prompt and scope before selecting an approval duration.',
        'A rejection can include a reason in the same interaction; do not treat the rejection itself as completion or validation.'
      ],
      sources: refs('command', 'use', 'sandbox', 'best'),
      seconds: 70
    }),
    S('local-containment', 2, 'Local sandboxing contains tool execution on the workstation', {
      scene: 'scorecard',
      subtitle: 'Experimental OS-level isolation is useful only when its limits are understood.',
      cards: [
        { icon: '▶️', title: 'Enable', description: 'Start an experimental session, then use /sandbox enable.' },
        { icon: '🧱', title: 'Contain', description: 'Restrict supported command and tool access to host resources.' },
        { icon: '🔎', title: 'Inspect', description: 'Use /sandbox status and /sandbox policy to examine the active policy.' },
        { icon: '⚠️', title: 'Bound', description: 'Not a VM; in-process file tools enforce policy best-effort.' }
      ],
      footnote: 'Local sandboxing is experimental and may have platform-specific behavior.',
      notes: [
        '"Local sandboxing adds a containment boundary to tools that run on your machine, while the permission prompt still decides whether a requested tool is allowed."',
        'The source walkthrough enables it with copilot --experimental followed by /sandbox enable, /sandbox status, and /sandbox policy.',
        '→ A cloud sandbox moves the whole interactive session to a GitHub-hosted environment instead.'
      ],
      know: [
        'The historical source describes local sandboxing as experimental, off by default unless enterprise policy requires it, and implemented with Microsoft eXecution Container (MXC), not a VM or container.',
        'It restricts filesystem, network, and system access for commands and tools. Built-in in-process file tools honor the policy on a best-effort basis.',
        'The setting can persist for later interactive and programmatic use until /sandbox disable. The source says local sandboxing is included in the Copilot seat at no extra charge; verify current packaging and platform support before presenting that as current policy.'
      ],
      sources: refs('sandbox', 'command'),
      seconds: 75
    }),
    S('cloud-containment', 2, 'Cloud sandboxing and cloud delegation run different work', {
      scene: 'showdown',
      leftLabel: 'Cloud sandbox',
      rightLabel: 'Ampersand delegation',
      subtitle: 'One contains an interactive CLI session; the other hands repository work to a coding agent.',
      pairs: [
        { left: { label: 'Start', note: 'copilot --cloud --experimental' }, right: { label: 'Start', note: '& followed by a repository task', z: 'purple' } },
        { left: { label: 'Execution', note: 'Entire interactive session in GitHub-hosted Linux' }, right: { label: 'Execution', note: 'GitHub Copilot coding agent handles the task', z: 'github' } },
        { left: { label: 'Output', note: 'Resume the session; metered compute and storage' }, right: { label: 'Output', note: 'A pull request for a maintainer to review', z: 'green' } },
        { left: { label: 'Boundary', note: 'Cannot combine with -p or -i' }, right: { label: 'Boundary', note: 'Requires repository/agent access; review before merge', z: 'orange' } }
      ],
      outcomeLeft: { icon: '☁', label: 'Session containment' },
      outcomeRight: { icon: '↗', label: 'Task delegation' },
      footnote: 'Cloud sandbox access can be disabled by default for organizations and enterprises.',
      notes: [
        '"The cloud sandbox is an interactive contained session. The ampersand handoff delegates a repository task to a coding agent."',
        'The cloud sandbox uses copilot --cloud --experimental. The source says it cannot be combined with -p or -i, and compute, memory, and snapshot storage are metered.',
        'Ampersand delegation sends work to GitHub’s coding agent. It may create a branch and pull request. The operator reviews the result; a pull request is not an approval to merge.',
        '→ Scheduled prompts add a third distinct control: a recurring task tied to a running interactive session.'
      ],
      know: [
        'The source states that organization and enterprise cloud sandbox access is disabled by default. Confirm current access policy, billing, and supported regions before a real run.',
        'The README distinguishes this cloud sandbox from the ampersand delegation workflow. Do not describe the latter as the CLI session running in the sandbox.',
        'Never use --yolo on a remote production session. Scope tools and environment access before enabling any broader autonomy.'
      ],
      sources: refs('sandbox', 'about', 'use'),
      seconds: 70
    }),
    S('scheduled-patrol', 2, 'A scheduled prompt runs only while its session is active', {
      scene: 'terminal',
      termTitle: 'Experimental · session-scoped schedule',
      subtitle: 'A patrol can summarize or alert; the operator still decides consequential remediation.',
      transcript: [
        { type: 'prompt', text: 'copilot --experimental' },
        { type: 'user', text: '/every weekday at 9am' },
        { type: 'response', lines: ['Summarize overnight pull requests.', 'Use approved tools and send the report to the remote session.'] },
        { type: 'divider' },
        { type: 'thinking', label: 'Operator checks schedule scope:' },
        { type: 'response', lines: ['Schedules belong to this interactive session.', 'Closing the session stops the schedule.'] },
        { type: 'outcome', text: 'List or delete schedules with bare /every or /after.' }
      ],
      footnote: 'Do not treat a session schedule as a durable system scheduler.',
      notes: [
        '"A recurring prompt can patrol while its interactive session is running. It is not a replacement for a durable scheduler when the session is closed."',
        'The source examples use /every weekday at 9am and /every 30min. It also documents /after. Keep the feature labeled experimental and session-scoped.',
        '→ Long-running work with a PR-shaped outcome may instead fit the ampersand handoff.'
      ],
      know: [
        'The historical schedule reference says scheduled prompts require --experimental or /experimental on, are session-scoped, and resume with the session rather than running independently.',
        'Bare /every or /after lists or deletes schedules. User-invocable skills can be scheduled. Most built-in slash commands cannot; /chronicle standup is a documented exception. Do not generalize from that one exception.',
        'The reference states a minimum interval of 10 seconds and a maximum of one day. Recheck current constraints in the linked documentation.',
        'When no interactive session is running, use an external scheduler such as cron or Task Scheduler with copilot -p, with its own credentials, logging, and review controls.'
      ],
      sources: refs('schedule', 'command'),
      seconds: 75
    }),
    S('delegate-cloud', 2, 'Delegate long repository work when a reviewed PR is the right output', {
      scene: 'relay',
      subtitle: 'The interactive terminal stays available while a separate cloud coding-agent task runs.',
      columns: [
        { icon: '⌨️', title: 'Practitioner', description: 'Names a bounded task and repository outcome.', items: ['Define scope', 'Choose limits', 'Review the PR'], z: ['local', 'orange', 'green'] },
        { icon: '☁️', title: 'Coding agent', description: 'Works asynchronously in the cloud.', items: ['Create branch', 'Analyze or edit', 'Return a PR'], z: ['github', 'github', 'green'] },
        { icon: '🧪', title: 'Maintainer', description: 'Checks evidence before accepting changes.', items: ['Inspect diff', 'Run tests', 'Approve or revise'], z: ['purple', 'local', 'orange'] }
      ],
      footnote: 'Example input: & Audit this repository’s missing API input validation and open a draft PR.',
      notes: [
        '"The ampersand handoff is useful when the work can outlive the current terminal attention and the result can come back as a pull request."',
        'The source walkthrough uses an API input-validation audit as its example. Keep the task bounded, avoid exposing secrets, and review the returned diff and tests.',
        '→ We have chosen where and how work runs. Next, preserve enough context to continue and recover.'
      ],
      know: [
        'The source says the delegated task runs independently of the local IDE and terminal, and can create a branch and PR on completion. Do not promise completion time or notification behavior for every configuration.',
        'The cloud agent’s repository access, billing, branch rules, and network access follow the organization’s configuration. Review the current coding-agent controls.',
        'The source example says the agent may commit unstaged changes and create a new branch during delegation. Inspect or commit local changes before handing off so the worktree state is understood.',
        'This differs from /fleet: /fleet orchestrates subtasks in one plan; the ampersand handoff creates an asynchronous cloud coding-agent task.'
      ],
      sources: refs('about', 'use', 'best'),
      seconds: 50
    }),
    S('part-3', 3, 'Keep the Session Alive', {
      scene: 'opener',
      subtitle: 'A durable session helps only when you can preserve its useful context and recover safely.',
      cards: [
        { icon: '🧠', title: 'Compact', blurb: 'Keep useful constraints' },
        { icon: '📚', title: 'Remember', blurb: 'Reuse repository guidance' },
        { icon: '↩️', title: 'Recover', blurb: 'Undo a wrong turn' }
      ],
      terminal: { context: 'The session outlives one prompt', detail: 'Context → memory → recovery' },
      notes: [
        '"Persistence is more than keeping a transcript. It means preserving the constraints, evidence, and recovery options that make a session useful."',
        '→ First, inspect how context management works and which commands expose it.'
      ],
      know: ['This part preserves the approved two-idea spine: durable context across turns and recovery after a wrong turn.'],
      sources: refs('about', 'command', 'chronicle'),
      seconds: 45
    }),
    S('compaction', 3, 'Auto-compaction protects a session near its context limit', {
      scene: 'scorecard',
      subtitle: 'Compaction summarizes history; the operator can inspect context and request a manual pass.',
      cards: [
        { icon: '📈', title: 'Watch', description: '/context shows the current token-use breakdown.' },
        { icon: '🧹', title: 'Compact', description: 'Auto-compaction is documented near 95% of the context limit.' },
        { icon: '⌨️', title: 'Control', description: '/compact requests a manual compaction; Escape can cancel.' },
        { icon: '📊', title: 'Review', description: '/usage reports session statistics and model use.' }
      ],
      footnote: 'A summary is a lossy representation; re-check critical constraints and evidence.',
      notes: [
        '"The useful idea is continuity with inspection: context can be compacted, and the operator can check what remains."',
        'The source describes automatic compression around 95% of the token limit and names /context, /usage, and /compact. Treat the threshold and behavior as version-sensitive.',
        '→ A compacted session needs a quality check, not an assumption that nothing important was lost.'
      ],
      know: [
        'The source says important facts and decisions are retained while verbose or redundant output is pruned. Do not call this an infinite session or guarantee that every detail survives.',
        '/context shows context usage; /usage shows session statistics such as duration, edits, and model usage as described in the source.',
        'The README also names /mcp for per-server token usage when MCP servers are used. Verify command availability and displayed fields on the installed version.'
      ],
      sources: refs('command', 'use', 'about'),
      seconds: 70
    }),
    S('compact-quality', 3, 'Compact when noise crowds out constraints, then verify the next step', {
      scene: 'showdown',
      leftLabel: 'Compact by session age',
      rightLabel: 'Compact by context need',
      subtitle: 'A quality check protects the evidence that will decide the next action.',
      pairs: [
        { left: { label: 'Trigger', note: 'Session feels long' }, right: { label: 'Trigger', note: 'Verbose history crowds out task context', z: 'purple' } },
        { left: { label: 'Summarize', note: 'Assume the summary is complete' }, right: { label: 'Preserve', note: 'Restate scope and acceptance evidence', z: 'orange' } },
        { left: { label: 'Continue', note: 'Rely on old assumptions' }, right: { label: 'Inspect', note: 'Check the next plan for missing constraints', z: 'green' } },
        { left: { label: 'Measure', note: 'Assume token or cost savings' }, right: { label: 'Re-anchor', note: 'Correct drift before acting', z: 'purple' } }
      ],
      outcomeLeft: { icon: '!', label: 'Possible constraint loss' },
      outcomeRight: { icon: '✓', label: 'Context fit is workload-dependent' },
      notes: [
        '"Compaction is a quality decision. Preserve the constraints and verification evidence that will tell you whether the result is acceptable."',
        'Before compaction, restate the task boundary and the proof needed. After it, inspect the next response or plan for missing constraints, stale assumptions, and lost evidence; re-anchor the session if quality has drifted.',
        '→ Repository knowledge can carry stable conventions across sessions, while /chronicle turns session history into suggestions.'
      ],
      know: [
        'Any token or cost reduction is workload-dependent; this talk makes no universal savings claim.',
        'The source recommends preserving task constraints and evidence before compaction and checking later outputs for drift.'
      ],
      sources: refs('use', 'best'),
      seconds: 55
    }),
    S('memory-chronicle', 3, 'Repository guidance and /chronicle turn experience into reusable context', {
      scene: 'scorecard',
      subtitle: 'The practitioner reviews suggestions before they become team instructions.',
      cards: [
        { icon: '📚', title: 'Repository memory', description: 'Record stable conventions and apply them in future sessions.' },
        { icon: '📋', title: '/chronicle standup', description: 'Generate a standup summary from recent session activity.' },
        { icon: '💡', title: '/chronicle tips', description: 'Review usage patterns and personalized suggestions.' },
        { icon: '✍️', title: '/chronicle improve', description: 'Suggest repository-scoped edits to .github/copilot-instructions.md.' }
      ],
      footnote: 'Suggestions are review inputs; the repository owner decides what becomes policy.',
      notes: [
        '"A useful instruction is a reusable decision the team has already made, not a transcript of every session."',
        'Use /chronicle improve as the producer takeaway. It suggests changes to .github/copilot-instructions.md for the current repository or working directory; the owner reviews and applies them.',
        '→ When Copilot takes a wrong turn, recovery operates at the turn level rather than the repository-policy level.'
      ],
      know: [
        'Historical refresh accuracy: the command is /chronicle improve, not /chronicle instructions. The first-party reference also documents /chronicle standup as a schedulable slash-command exception.',
        'Session history is stored locally under ~/.copilot/session-state/ per the source talk; the source describes it as private to the user account. Treat session history as sensitive and follow the organization’s retention and endpoint policies.',
        'The source describes custom instruction files at user, repository, and organization scope as additive rather than a highest-priority-file fallback. Verify current merge behavior and policy in the linked documentation.',
        'The repository-instructions concept is covered in more depth by Copilot Configuration Primitives. Chronicle suggestions are not an automatic policy change.'
      ],
      sources: refs('chronicle', 'chronicleConcept', 'instructions', 'command'),
      seconds: 75
    }),
    S('rewind-recovery', 3, 'Use /rewind for a wrong turn; use /worktree for isolated exploration', {
      scene: 'showdown',
      leftLabel: '/rewind or /undo',
      rightLabel: 'Experimental /worktree',
      subtitle: 'Recovery in the current tree and exploration in a separate worktree solve different problems.',
      pairs: [
        { left: { label: 'Choose a turn', note: 'Pick the point before the wrong change' }, right: { label: 'Start a branch of the tree', note: 'Open a separate conversation and worktree', z: 'purple' } },
        { left: { label: 'Conversation only', note: 'Rewind dialogue; leave files in place' }, right: { label: 'Isolation', note: 'Keep exploratory changes apart from current workspace', z: 'local' } },
        { left: { label: 'Conversation + files', note: 'Restore Copilot edits; skip your own edits' }, right: { label: 'Prerequisite', note: 'Requires Git; /rewind does not', z: 'orange' } }
      ],
      outcomeLeft: { icon: '↩', label: 'Turn recovery · no Git required' },
      outcomeRight: { icon: '⑂', label: 'Separate worktree · Git required' },
      footnote: 'Inspect the affected files and Git status after recovery; keep Git as an additional safety net.',
      notes: [
        '"The choice depends on what went wrong: /rewind returns the current session to an earlier turn; /worktree isolates a new exploration."',
        'A source example is /rewind, choose the turn before the refactor, then choose Conversation + files. Copilot-changed files are restored; files you edited yourself are skipped.',
        '→ Remote steering is useful when execution belongs on another host, not when recovery is the only need.'
      ],
      know: [
        '/rewind is also aliased as /undo. Conversation only leaves files as they are; Conversation + files also restores Copilot-changed files associated with the selected and later discarded turns.',
        'The source says change tracking covers editing tools, shell commands, and subagents, and that rewind works in a dirty folder or outside a Git repository. This behavior is version-sensitive; inspect the resulting tree.',
        '/worktree is experimental and requires Git. It creates a separate worktree and conversation. Git remains useful for review and recovery even when /rewind does not require it.',
        'Other session commands from the source: copilot --continue, copilot --resume, copilot --resume SESSION-ID, /resume, and /rename NAME. The session sidebar opens with the left-angle key; n creates a session, x closes the current one, and the right-angle key closes the sidebar. Verify the current shortcut mapping.'
      ],
      sources: refs('command', 'use', 'releases'),
      seconds: 75
    }),
    S('part-4', 4, 'Work from Anywhere', {
      scene: 'opener',
      subtitle: 'Keep execution and sensitive data on the host while the operator steers from another device.',
      cards: [
        { icon: '🖥️', title: 'Host', blurb: 'Runtime and files stay local' },
        { icon: '🔗', title: 'Session', blurb: 'Remote steering link' },
        { icon: '📱', title: 'Operator', blurb: 'Review and approve' }
      ],
      terminal: { context: 'The session runs where the problem lives', detail: 'Host execution + human steering' },
      notes: [
        '"The geography payoff is not moving the machine. The CLI session runs on the target host, while the operator can steer through the remote interface."',
        'Keep execution locality distinct from operator locality, and keep approval responsibility with the human.',
        '→ The host-local session is the mechanism; the next picture shows which parts move and which stay.'
      ],
      know: ['The README describes remote control as a public preview in its April 2026 reference and the refresh lists first-party docs verified August 25, 2026. Recheck current availability and policy before presenting it as generally available.'],
      sources: refs('remote', 'remotePreview'),
      seconds: 45
    }),
    S('remote-locality', 4, '--remote moves operator access, not the host’s working data', {
      scene: 'host-locality',
      subtitle: 'The CLI process and tools run on the target machine; browser or mobile supplies another steering surface.',
      footnote: 'Use only with an authorized host, scoped tools, and the organization’s remote-session policy.',
      notes: [
        '"The central distinction is execution locality versus operator locality: tools run where the CLI session is, while the human can inspect and steer from another device."',
        'The source describes a remote URL and QR code and says GitHub.com or GitHub Mobile can monitor the session, send prompts, and approve or deny tool permissions.',
        'Avoid claiming that data can never leave a host. The prompt and resulting session communication still use the service; the claim here is that the log corpus need not be copied to the operator’s phone.',
        '→ Remote access gives a second control surface, not a reason to remove the host’s permission boundary.'
      ],
      know: [
        'The source describes the CLI as the source of truth, with web and mobile as remote views. The session is private to the initiating user unless a link is explicitly shared; organization policy can manage access.',
        'The source suggests tmux or screen to preserve a process across SSH disconnects. That host-side persistence is distinct from the browser/mobile remote-steering feature.',
        'The source command sequence is ssh ops@prod-server-3.us-east-1, then copilot --remote; it also shows /remote to enable access mid-session. The displayed session URL and QR code are illustrative placeholders.',
        'A persistence example is tmux new -s copilot-debug, start copilot --remote, then tmux attach -s copilot-debug after reconnecting. copilot --resume can resume a session from another machine; confirm current session behavior and access policy.',
        'The remote feature was documented as public preview in the cited April 2026 changelog. Confirm current status, feature availability, and policy before relying on it.'
      ],
      sources: refs('remote', 'remotePreview', 'about'),
      seconds: 70
    }),
    S('remote-approval', 4, 'Remote steering keeps consequential actions behind a human decision', {
      scene: 'signals',
      subtitle: 'A phone or browser can receive the approval request; it does not become the approver.',
      rows: [
        { label: 'Host session', description: 'Copilot requests a specific tool or file action', tag: 'Show request', z: 'purple' },
        { label: 'Policy', description: 'Host permissions and containment still apply', tag: 'Scope tools', z: 'local' },
        { label: 'Operator', description: 'Review context; approve, deny, or redirect', tag: 'Human decision', z: 'orange' },
        { label: 'After action', description: 'Inspect output and verify the service signal', tag: 'Evidence check', z: 'green' }
      ],
      footnote: 'For production, pair least-privilege tools with host-side containment and enterprise policy.',
      notes: [
        '"Remote steering changes where the operator sees the request. The authority to approve remains with the operator and the organization’s policy."',
        'Use --allow-tool to scope permitted shell tools where supported. The source recommends timeouts, governance hooks, and avoiding --yolo on remote production sessions.',
        '→ An incident scenario shows why locality matters without pretending that location removes approval.'
      ],
      know: [
        'The source describes approving and denying tool permissions from a remote device and sending steering messages or new prompts.',
        'Use Copilot Hooks and enterprise policy as governance controls where configured; they supplement rather than replace least privilege and human review.',
        'A persistent, broad-permission remote session on a production host increases the consequence of a mistaken action. Use a staged environment for a first pilot.'
      ],
      sources: refs('remote', 'command', 'best'),
      seconds: 65
    }),
    S('walking-incident', 4, 'A remote session can preserve an incident investigation across a device handoff', {
      scene: 'showdown',
      leftLabel: 'Session abandoned',
      rightLabel: 'Session steered remotely',
      subtitle: 'Illustrative staging incident: an operator begins at a laptop and continues from a phone.',
      pairs: [
        { left: { label: 'Alert arrives', note: 'Runtime investigation is on a workstation' }, right: { label: 'Start on staging', note: 'Copilot CLI runs where the service lives', z: 'purple' } },
        { left: { label: 'Context switch', note: 'Copy output or pause the investigation' }, right: { label: 'Scan remote link', note: 'Phone opens the same live session', z: 'local' } },
        { left: { label: 'Action waits', note: 'Operator has no review point in transit' }, right: { label: 'Inspect request', note: 'Operator steers and approves from mobile', z: 'orange' } },
        { left: { label: 'Rebuild context', note: 'Re-enter logs and prior decisions' }, right: { label: 'Verify on host', note: 'Check the proposed result before closure', z: 'green' } }
      ],
      outcomeLeft: { icon: '…', label: 'Context handoff is manual' },
      outcomeRight: { icon: '✓', label: 'One session, operator still reviews' },
      footnote: 'The walking-to-meeting story is an illustrative scenario, not an observed incident report.',
      notes: [
        '"The benefit is continuity: the operator changes devices without copying the entire investigation into a new chat."',
        'The source story includes example times and a missing JWT_SECRET. Treat those details as a hypothetical scenario, not an actual incident, customer, or measured outcome.',
        'If demonstrating, use a staging environment and fake or redacted data. Do not approve a production remediation from a phone without the same required review and escalation process.',
        '→ The same locality principle applies to larger log corpora.'
      ],
      know: [
        'The source scenario has an alert, a remote QR handoff, two affected services, and a proposed fix. None of those events are independently observed evidence.',
        'The remote link does not grant authorization beyond the user’s identity and the configured session controls.'
      ],
      sources: refs('remote', 'remotePreview'),
      seconds: 75
    }),
    S('host-forensics', 4, 'Host-local analysis can avoid copying a large log corpus to a phone', {
      scene: 'terminal',
      termTitle: 'Illustrative, authorized log-analysis request',
      subtitle: 'Ask for an aggregate report from approved logs; leave remediation for a separate review.',
      transcript: [
        { type: 'prompt', text: 'ssh analytics@approved-log-host' },
        { type: 'prompt', text: 'copilot --remote' },
        { type: 'user', text: 'Analyze approved access logs from the last 24 hours.' },
        { type: 'thinking', label: 'Operator-approved scope:' },
        { type: 'response', lines: ['Return aggregate counts and time windows for auth failures.', 'Cite the local evidence used; do not block, delete, or change configuration.'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Example scale: 12 GB remains on the host; findings need human validation.' }
      ],
      footnote: '12 GB is an illustrative source-talk scenario, not a measured transfer or compliance result.',
      notes: [
        '"The operator can ask for a bounded summary while keeping a large log corpus on the machine that already holds it."',
        'The source example asks for top IP addresses associated with 401 responses and patterns consistent with credential stuffing. For this talk, keep the demonstration defensive and aggregate: verify scope, minimize sensitive fields, review evidence, and leave blocking or other response actions to an authorized human.',
        'Do not claim zero data exposure or compliance certification. The point is avoiding a manual copy of the full corpus; prompts and session results still cross the remote-service boundary.',
        '→ For distributed incidents, distinguish one-host fan-out from several separately steered sessions.'
      ],
      know: [
        'The 12 GB size and outcomes in the source are illustrative. No test of a 12 GB corpus, transfer benchmark, or compliance assessment is supplied.',
        'The source command examples use grep and awk to aggregate HTTP 401 results and inspect a sample. Keep any live command restricted to authorized logs and avoid exposing personal or credential data in output.',
        'The source’s example pipeline is `grep 401 /var/log/nginx/access.log | awk ... | sort | uniq -c`; its sample IP uses a documentation-only address. The full command depends on log format and must be checked before use.',
        'A local data path is not a substitute for data classification, retention policy, or review of what the remote service receives.'
      ],
      sources: refs('remote', 'remotePreview', 'best'),
      seconds: 75
    }),
    S('fleet-across-machines', 4, '/fleet coordinates one host; multi-host work uses separate remote sessions', {
      scene: 'showdown',
      leftLabel: '/fleet · one execution context',
      rightLabel: 'Several --remote sessions',
      subtitle: 'The operator can supervise multiple sessions from a browser without implying one distributed orchestrator.',
      pairs: [
        { left: { label: 'Plan', note: 'One approved plan on one host' }, right: { label: 'Start', note: 'One session on each authorized machine', z: 'purple' } },
        { left: { label: 'Fan out', note: 'Subagents take independent subtasks' }, right: { label: 'Steer', note: 'Operator selects among session URLs', z: 'orange' } },
        { left: { label: 'Return', note: 'Orchestrator merges subtask results' }, right: { label: 'Synthesize', note: 'Operator compares reports across hosts', z: 'green' } }
      ],
      outcomeLeft: { icon: '⚡', label: 'One orchestrated plan' },
      outcomeRight: { icon: '↔', label: 'Independent sessions; no shared merge claim' },
      footnote: 'Use explicit host scope and separate least-privilege permissions for each session.',
      notes: [
        '"These are two different shapes: /fleet decomposes work within one plan and host; multiple remote sessions are independent investigations the operator steers."',
        'The source’s multi-machine example describes separate sessions on separate hosts. Do not claim that one /fleet command fans out across remote machines or merges those independent reports automatically.',
        '→ Recurring patrols combine remote access with another boundary: the schedule exists only as long as its session.'
      ],
      know: [
        'One browser may give the operator access to multiple session links. It is not a common orchestrator, authorization layer, or guaranteed merged-report facility.',
        '/fleet can run parallel subtasks where dependencies permit and merges its own results in the orchestrating session.',
        'Record host identity, task scope, permission policy, and a human review owner separately for each remote session.'
      ],
      sources: refs('fleet', 'remote', 'command'),
      seconds: 75
    }),
    S('patrol-scope', 4, 'A remote patrol needs a running session and a bounded response path', {
      scene: 'signals',
      subtitle: 'Schedule observation and reporting; keep remediation under a named human approval.',
      rows: [
        { label: 'Session', description: 'Keep the interactive host session running', tag: 'Session-scoped', z: 'purple' },
        { label: 'Schedule', description: 'Use /every or /after within documented limits', tag: 'Experimental', z: 'orange' },
        { label: 'Tools', description: 'Allow only necessary monitoring commands', tag: 'Least privilege', z: 'local' },
        { label: 'Response', description: 'Report evidence; request approval for changes', tag: 'Human review', z: 'green' }
      ],
      footnote: 'When no interactive session runs, use an external scheduler with an explicit run and review design.',
      notes: [
        '"A patrol can detect and explain an anomaly, but detection does not authorize a rollback."',
        'The source example pairs tmux, --remote, and allow rules for kubectl and docker, then asks for five-minute checks. Treat this as a design illustration; verify the schedule, host lifetime, and exact tool policy before use.',
        '→ Built-in agents can also help with bounded tasks, but the operator still needs visibility into their work.'
      ],
      know: [
        'The schedule feature is experimental and session-scoped. The source specifies a 10-second minimum interval and one-day maximum; these settings are version-sensitive.',
        'Most built-in slash commands cannot be scheduled; the refresh identified /chronicle standup as a documented exception. Skills invocably available to the user can be scheduled.',
        'The source patrol scenario reports CPU at 92% after a memory-limit change from 512Mi to 256Mi and recommends rollback. Treat those details as illustrative, not an observed incident; a human owner validates the evidence and approves any rollback.',
        'A five-minute poll is not a substitute for a production monitoring or alerting system with tested availability and escalation.'
      ],
      sources: refs('schedule', 'remote', 'command', 'best'),
      seconds: 75
    }),
    S('agent-roster', 4, 'Specialized agents are useful when the task benefits from a distinct work pattern', {
      scene: 'scorecard',
      subtitle: 'Copilot routes common work; /tasks gives the operator a place to inspect running subagents.',
      cards: [
        { icon: '🔎', title: 'Explore + Research', description: 'Explain code or investigate broader sources with focused evidence.' },
        { icon: '▶️', title: 'Task', description: 'Run a command and summarize success or surface full failure output.' },
        { icon: '🧩', title: 'General purpose', description: 'Handle multi-step work in a separate context window.' },
        { icon: '🛡️', title: 'Code review + Rubber Duck', description: 'Surface defects or challenge a plan at review checkpoints.' }
      ],
      footnote: 'Agent names and behavior can change by CLI version and configuration.',
      notes: [
        '"Specialization can keep the main conversation focused, while /tasks provides visibility into work that is running."',
        '→ The same selection rule applies to plugins, MCP, and bridges: add them when they solve a real context gap.'
      ],
      know: [
        'The source’s six-name how-to roster is Explore, Task, General purpose, Code review, Research, and Rubber Duck.',
        'Explore is described as focused codebase analysis; Task as command execution with filtered success output; General purpose as a separate-window helper; Code review as defect-focused; Research as broader GitHub and web investigation with citations.',
        'Use /tasks to inspect and manage subagents and shell commands. Ctrl+Q or Ctrl+Enter can queue follow-ups in the documented flow; verify current key behavior.',
        'Rubber Duck is described as a different-model-family reviewer enabled by default in the historical source. It names a Claude-primary/GPT-5.4 reviewer pairing and claims a roughly 75% quality-gap result. Those are version-specific and unsupported here by linked evaluation evidence; verify the default, model pairing, and result before repeating them.',
        'The source names builtInAgents.rubberDuck: false as a settings option to disable the reviewer. Treat setting shape and defaults as version-sensitive.'
      ],
      sources: refs('use', 'command', 'releases'),
      seconds: 60
    }),
    S('extensions-bridges', 4, 'Add an extension only when the task needs context the CLI lacks', {
      scene: 'scorecard',
      subtitle: 'Keep tool, instruction, agent, and interface choices tied to an observable need.',
      cards: [
        { icon: '🧩', title: 'Plugins', description: 'Install a package for skills, MCP configuration, agents, commands, or hooks.' },
        { icon: '🔌', title: 'MCP', description: 'Connect external tools; check organization policy support first.' },
        { icon: '🧭', title: 'Custom agents', description: 'Place role-specific agent definitions at user or repository scope.' },
        { icon: '↔️', title: 'Bridges', description: '/ide, /app, and /voice move the session or input surface.' }
      ],
      footnote: 'Plugins are mentioned as a consumer capability; authoring and marketplace mechanics live in the dedicated talk.',
      notes: [
        '"An extension earns its cost when it supplies decisive context or a repeatable capability. Keep its permissions and owner explicit."',
        'The source says Agent Plugins 1.0 was GA in CLI, VS Code, and the Copilot app when refreshed. It packages portable skills and MCP configuration plus Copilot-specific agents, commands, and hooks. This status is a dated claim; recheck current plugin docs.',
        '→ Close with a staging-host action that a practitioner can try and verify in their own environment.'
      ],
      know: [
        'The README’s plugin example is `copilot plugin marketplace browse awesome-copilot` followed by `copilot plugin install database-data-management@awesome-copilot`; it then asks Copilot to show a database schema. These are version-sensitive examples; see the linked finding/installing guide.',
        'The source says CLI cannot currently honor the organization policies “MCP servers in Copilot” or “MCP Registry URL” as verified on 2026-08-25. This limitation is explicitly a dated snapshot; check current administration docs.',
        'Custom agents may be stored at ~/.copilot/agents/, .github/agents/, or .github-private/agents/ as described in the source. It also names /agent and --agent=refactor-agent as usage forms; verify current syntax.',
        '/ide opens a file in VS Code while the CLI session continues. /app hands the same session and folder to the Copilot desktop app; the source requires app 1.1.3 or later. /voice is described as local speech-to-text through Foundry Local.',
        'Other source examples include listing assigned issues, starting work from an issue URL, opening PR reviews, creating Actions workflows, and asking a configured GitHub MCP server to find beginner issues. The source says the /pr screen can create a Git worktree for a PR; verify current syntax and permission scope.',
        'The README also notes shell UX details: prefix history such as !docker with Up-arrow cycling, shell-history handling, intent-based terminal-tab titles, live tool-call duration, and Windows/PowerShell ergonomics. These are version-sensitive behaviors, not performance guarantees.',
        'For plugin packaging, marketplace authoring, and governance, use the related Copilot Plugins talk rather than expanding this talk into an authoring tutorial.'
      ],
      sources: refs('plugin', 'pluginAbout', 'pluginNews', 'mcp', 'use', 'releases', 'pluginsTalk'),
      seconds: 65
    }),
    S('staging-transfer', 4, 'Try one host-local diagnostic on staging, then inspect the evidence', {
      scene: 'host-locality',
      subtitle: 'The practitioner chooses the host and tools; Copilot reports; the service owner accepts any fix.',
      footnote: 'Start with a low-risk staging task. Never copy secrets or grant blanket permissions.',
      notes: [
        '"The concrete next move is small: choose one staging diagnostic whose decisive evidence already lives on the host."',
        'Before running it, name the host, task, approved read commands, output that would change your decision, and the person who can approve remediation.',
        'After the session returns evidence, inspect the commands and source output, validate the diagnosis independently, and approve a change only through your normal review path.',
        'Ask the room: which recurring terminal investigation in your own work has enough context to try this, and what evidence would make you stop?',
        '→ The closing comparison keeps the example metrics in their proper category.'
      ],
      know: [
        'The README’s next-step checklist includes installation, interactive mode, Plan Mode, /rewind, -p, /fleet, remote steering, sandboxing, schedules, /chronicle, and a staging host. The today slide compresses this into a progression rather than an inventory.',
        'The source install examples include npm install -g @github/copilot and checking copilot --version. Follow the current install guide for platform-specific setup rather than relying on an old walkthrough prerequisite.',
        'A useful pilot has a safe scope, an observable result, and an exit condition. If permissions or data handling are unclear, stop and use the organization’s escalation route.'
      ],
      sources: refs('install', 'use', 'remote', 'best'),
      seconds: 70
    }),
    S('before-after', 0, 'The practical shift is from carrying context to steering a session', {
      before: [
        'Repeat the task context after every restart',
        'Copy runtime output between host and chat',
        'Keep every long task in the active terminal',
        'Find ambiguity only after a change lands'
      ],
      after: [
        'Compact, resume, and recover session context',
        'Keep the runtime investigation on its host',
        'Delegate only when a reviewed PR fits',
        'Clarify and approve before execution'
      ],
      metrics: [
        { value: '45 → 8 min', detail: 'Docker example · illustrative estimate' },
        { value: '25 → 5 min', detail: 'CI triage example · illustrative estimate' },
        { value: '12 GB stays host', detail: 'Log scenario · illustrative scale' }
      ],
      notes: [
        '"The transferable change is where context lives and how the operator stays in the decision loop."',
        'The three figures are source-talk examples, not benchmarks or measured results: Docker 45-to-8 minutes, CI triage 25-to-5 minutes, and a 12 GB host-local log scenario.',
        'Each number has a different status: time comparisons are estimates; log volume is an illustrative scale. There is no supplied run artifact, study, or compliance assessment.',
        '→ The next slide turns the judgment into a low-risk experiment.'
      ],
      know: [
        'The original source also mentions a 90-minute-to-15-minute greenfield research scenario. That comparison lacks a supplied measurement method and does not appear as a headline metric; retain it here as an unverified source estimate rather than a promise.',
        'The source’s before/after language about no data transfer is narrowed to the practical claim that the large corpus need not be copied to the phone. Remote prompts and session results still cross a service boundary.'
      ],
      sources: refs('about', 'use', 'remote'),
      seconds: 45
    }),
    S('today', 0, 'Start with one task and define its proof before choosing autonomy', {
      horizons: [
        { icon: '🧭', label: 'Today', z: 'green', items: [
          'Install the current CLI; check copilot --version. Try Plan Mode on one low-risk task.',
          'Signal: Copilot asks a useful scope question. Validate: review the plan, diff, and test.'
        ] },
        { icon: '📄', label: 'This week', z: 'local', items: [
          'Add one copilot -p failure summary to CI with scoped tools.',
          'Save a reviewable report; compare it with logs and record your own time and corrections.'
        ] },
        { icon: '🌍', label: 'This month', z: 'purple', items: [
          'Pilot --remote on an authorized staging host with redacted or synthetic data.',
          'Validate permissions, reconnect, reviewer ownership, and an exit path before remediation.'
        ] }
      ],
      takeaway: 'One task. One reviewer. One acceptance signal.',
      notes: [
        '"You do not need to adopt every mode. Start with one task and name the evidence that would make it useful."',
        'Today: install from the current official guide, verify the version, and try Plan Mode in a safe repository. Success is a proposed plan that matches the task; inspect before approving edits.',
        'This week: make a CI report, not an automatic repair. Use least privilege, preserve logs safely, and compare the report with the actual failure.',
        'This month: test remote steering in staging. Confirm host scope, remote-session policy, reconnect behavior, reviewer ownership, and an exit path.',
        '→ The references point to current command and policy details; always recheck version-sensitive behavior.'
      ],
      know: [
        'A local measurement plan can compare elapsed time, number of correction turns, accepted output quality, and reviewer effort over a defined set of representative tasks. Treat the baseline and acceptance threshold as proposals until collected.',
        'The original artifact is tech-talks/copilot-cli/examples/walkthrough.md. It demonstrates Plan Mode, copilot -p, /fleet, remote sessions, and cloud delegation against the FanHub Node.js track. Check its prerequisite and command details against the installed CLI before a live run.'
      ],
      sources: refs('install', 'use', 'plan', 'remote', 'best'),
      seconds: 60
    }),
    S('references', 0, 'First-party references for commands, boundaries, and evidence', {
      groups: [
        { icon: '📖', title: 'Core CLI', z: 'local', items: [
          { href: SRC.about.href, label: SRC.about.label, description: 'Session model, operating modes, and concepts' },
          { href: SRC.command.href, label: SRC.command.label, description: 'Version-sensitive flags and slash commands' },
          { href: SRC.install.href, label: SRC.install.label, description: 'Current installation options' }
        ] },
        { icon: '🛡️', title: 'Boundaries and remote work', z: 'orange', items: [
          { href: SRC.sandbox.href, label: SRC.sandbox.label, description: 'Local and cloud containment' },
          { href: SRC.schedule.href, label: SRC.schedule.label, description: 'Experimental session schedules' },
          { href: SRC.remote.href, label: SRC.remote.label, description: 'Remote session setup and steering' }
        ] }
      ],
      notes: [
        '"The links on this slide are first-party references. The full metadata list remains on the talk landing page, and claim-specific citations also appear beside the relevant notes."',
        'Call attention to the command reference for version-sensitive switches and slash commands, and the sandbox/schedule pages for preview and session limits.',
        '→ Close with a question about the audience’s own recurring task.'
      ],
      know: [
        'References are first-party GitHub documentation, GitHub changelog/blog, and the official Copilot CLI release page.',
        'The README metadata includes additional first-party pages for custom instructions, MCP, plugins, remote sessions, Chronicle, and model deprecations. The per-slide notes carry the sources for their claims.',
        'The approved 2026-08-25 content refresh recorded CLI v1.0.80 as the latest stable release and v1.0.81 as prerelease at that time. This conversion does not refresh release news; check the current release page and installed version before presenting any dated command behavior.',
        'The source walkthrough is retained at tech-talks/copilot-cli/examples/walkthrough.md.'
      ],
      sources: refs('about', 'use', 'install', 'command', 'sandbox', 'schedule', 'fleet', 'chronicle', 'chronicleConcept', 'remote', 'remotePreview', 'best', 'instructions', 'plugin', 'pluginAbout', 'pluginNews', 'releases', 'plan'),
      seconds: 35
    }),
    S('thanks', 0, 'GitHub Copilot CLI', {
      chrome: false, visual: 'session-bridge',
      subtitle: 'AI at the Point of Work',
      cards: [
        { value: 'Intent', detail: 'Ask, plan, approve' },
        { value: 'Context', detail: 'Compact, remember, recover' },
        { value: 'Place', detail: 'Run on the host; steer remotely' }
      ],
      prompt: 'Which recurring investigation in your own work is worth trying next?'
    })
  ];

  const NOTES = {
    title: {
      notes: [
        '"This talk follows the work rather than treating the terminal as only a command prompt."',
        'Opening visual: one session connects intent, execution, context, time, and geography. These are different decisions, not a promise that every capability is available in every organization.',
        '→ Begin with the practitioner’s question.'
      ],
      know: ['The subtitle and five-distance tagline preserve the approved title and thesis framing.'],
      sources: refs('about'),
      seconds: 30
    },
    'part-1': {
      sources: refs('plan', 'about')
    },
    'part-2': {
      sources: refs('about', 'use', 'schedule', 'fleet')
    },
    'part-3': {
      sources: refs('command', 'chronicle')
    },
    'part-4': {
      sources: refs('remote', 'remotePreview')
    },
    'staging-transfer': {
      cue: [
        'Optional live run: choose an approved staging host with synthetic or redacted data.',
        'Start a session with only the required tools; show the permission request before approving it.',
        'Ask for an evidence-only diagnosis. Do not apply a remediation in the live demo.',
        'Inspect the host-side output and close the session using the organization’s runbook.'
      ]
    },
    'before-after': {},
    thanks: {
      notes: [
        '"The decision model is yours to carry back: match the mode to the work, keep authority explicit, and decide what evidence earns acceptance."',
        'Invite the audience to name one candidate task and its reviewer.',
        '→ Leave time for questions.'
      ],
      know: ['The three closing cards are a qualitative summary; they are not performance metrics.'],
      sources: refs('about', 'use', 'remote'),
      seconds: 20
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-cli',
      title: 'GitHub Copilot CLI: AI at the Point of Work',
      short: 'Copilot CLI',
      category: 'practitioner tech talk',
      source: 'tech-talks/copilot-cli/README.md',
      question: 'How do I bring AI to where the work actually is — and keep steering it from wherever I am?',
      thesis: 'Copilot CLI closes distance across intent, complexity, context, time, and geography when practitioners clarify first, choose bounded autonomy, verify the artifact, and keep human approval visible.'
    },
    slides
  };
})();
