/*
  Copilot on GitHub — the talk, its notes, and its evidence.
  The approved 39-slide structure stays intact; the notes carry the README's
  teaching depth so this file is the presenter and handout source of truth.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    cloud: { label: 'About Copilot cloud agent', href: 'https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent' },
    best: { label: 'Get the best results from Copilot cloud agent', href: 'https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results' },
    plan: { label: 'Research, plan, and code with Copilot cloud agent', href: 'https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/' },
    review: { label: 'About Copilot code review', href: 'https://docs.github.com/en/copilot/concepts/agents/code-review' },
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
    workflows: { label: 'GitHub Agentic Workflows talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/agentic-lifecycle' },
    localSdlc: { label: 'Local Agentic SDLC talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/local-agentic-sdlc' },
    sdlc: { label: 'Agentic SDLC talk', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/agentic-sdlc' }
  };

  const slides = [
    S('title', 0, 'Copilot on GitHub', {
      subtitle: 'Produce, Reason, Measure',
      tagline: 'Three agents, one pull request. A person ends the loop.',
      meta: 'Agents on GitHub · Practitioner Tech Talk · 60 minutes'
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
        { icon: '🔎', title: '2. Reason', subtitle: 'Copilot code review', blurb: 'Read intent, assessments, and open issues.', slide: 12 },
        { icon: '📏', title: '3. Measure', subtitle: 'GitHub Code Quality', blurb: 'Observe rules and promote trusted thresholds.', slide: 19 },
        { icon: '🔗', title: '4. Wire it together', subtitle: 'One issue, start to finish', blurb: 'Trace events, evidence, rework, and authority.', slide: 25 }
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
        ]
      }
    }),
    S('produce-use', 1, 'The PR owner checks six things before reading the diff.', {
      scene: 'signals',
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
    S('produce-troubleshoot', 1, 'Each producer signal points to a cause and a recoverable move.', {
      scene: 'signals',
      pill: 'Produce · troubleshooting',
      rows: [
        { label: 'Empty first commit', description: 'Expected plan commit; wait for implementation and read the plan.', tag: 'inspect next push', z: 'github' },
        { label: 'Unexpected files', description: 'A setup step or tool side effect may have changed the diff.', tag: 'check final diff', z: 'orange' },
        { label: 'Dependency churn', description: 'Defaults such as go mod tidy or gofmt may expand scope.', tag: 'ask or revert', z: 'orange' },
        { label: 'Build or registry fails', description: 'Setup steps or the network allowlist may be incomplete.', tag: 'fix setup; read log', z: 'purple' }
      ],
      footnote: 'FanHub #221: review flagged lockfile-only commit 7686606; the next agent push reverted it. The agent justified the x/crypto bump because Gin 1.10.0 required it.'
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
      scene: 'signals',
      pill: 'Reason · invocation',
      rows: [
        { label: 'Request review', description: 'A person selects Copilot in the Reviewers sidebar.', tag: 'human-invoked', z: 'orange' },
        { label: 'Pull request opened', description: 'A repo or org ruleset, or author setting, enables review.', tag: 'configured', z: 'github' },
        { label: 'New push', description: 'Review new pushes enables another review; approval is dismissed.', tag: 'if enabled', z: 'purple' },
        { label: 'Draft pull request', description: 'Review draft pull requests controls draft reviews.', tag: 'if enabled', z: 'green' }
      ],
      footnote: 'If multiple sources apply, Copilot posts one review. User settings cannot disable push or draft reviews enabled by a ruleset.'
    }),
    S('reason-setup-context', 2, 'Review policy controls invocation; scoped instructions shape the reviewer’s context.', {
      scene: 'evidence',
      pill: 'Reason · setup and context',
      subtitle: 'Set who can request paid reviews, when automatic review runs, and which repository conventions apply.',
      diagram: {
        type: 'split',
        leftTitle: 'Review policy',
        left: [
          'Repository or organization ruleset',
          'Review new pushes and review drafts',
          'Lite or Balanced effort; cost varies',
          'Authorized-users setting and runner choice'
        ],
        rightTitle: 'Instructions at the PR head',
        right: [
          'copilot-instructions.md and AGENTS.md',
          '*.instructions.md scoped with applyTo',
          'excludeAgent: code-review or coding-agent',
          'Keep producer-only rules out of review'
        ]
      }
    }),
    S('reason-use-198', 2, 'Four passing component tests and a green build missed an inert Retry button.', {
      scene: 'evidence',
      pill: 'Reason · FanHub #198',
      subtitle: 'Copilot review surfaced a browser interaction gap; the author added a render-mode test that failed on the draft.',
      diagram: {
        type: 'split',
        leftTitle: 'What existing checks showed',
        left: [
          'Four component tests passed.',
          'The build was green.',
          'Those checks did not exercise the browser interaction.'
        ],
        rightTitle: 'What review exposed',
        right: [
          'Retry had no interactive render mode.',
          'Its click handler never wired up.',
          'Early error clearing made retry unreachable.',
          'A render-mode test failed on draft, then passed 6 of 6.'
        ]
      }
    }),
    S('reason-troubleshoot', 2, 'The analyzed commit and open-issues list explain common review surprises.', {
      scene: 'signals',
      pill: 'Reason · troubleshooting',
      rows: [
        { label: 'No files reviewed', description: 'The review analyzed a plan-only commit.', tag: 'review new pushes', z: 'orange' },
        { label: 'Green with open issue', description: 'An earlier unresolved thread carried forward.', tag: 'resolve if fixed', z: 'purple' },
        { label: 'No review after fix', description: 'Review new pushes may be disabled.', tag: 'request review', z: 'github' },
        { label: 'Low-value comments', description: 'Instructions may be missing or too broad.', tag: 'scope the rules', z: 'green' }
      ],
      footnote: 'Every review identifies its commit and whether tests ran during the review. Read assessment and open issues together.'
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
    S('measure-standard-ai', 3, 'Standard findings can gate by threshold; AI findings are preview and advisory.', {
      scene: 'showdown',
      pill: 'Measure · two finding types',
      leftLabel: 'Standard findings · GA',
      rightLabel: 'AI findings · public preview',
      pairs: [
        { left: { label: 'CodeQL quality rules', note: 'Fixed query and severity' }, right: { label: 'Model review', note: 'Recently changed files', z: 'orange' } },
        { left: { label: 'Reproducible', note: 'Same code, rules, tool version' }, right: { label: 'Model-mediated', note: 'Results can vary', z: 'orange' } },
        { left: { label: 'Pull requests and default branch', note: 'Quality check and dashboard' }, right: { label: 'Default branch only', note: 'As documented 2026-10-21', z: 'orange' } },
        { left: { label: 'Can gate a merge', note: 'Severity threshold' }, right: { label: 'Cannot gate a merge', note: 'Advisory', z: 'orange' } }
      ],
      outcomeLeft: { icon: '📏', label: 'Threshold can block' },
      outcomeRight: { icon: '🤖', label: 'AI finding advises' },
      footnote: 'Status and default-branch scope: docs verified 2026-10-21. Security CodeQL and secret scanning are separate.'
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
    S('measure-troubleshoot', 3, 'A clean Code Quality run covers configured rules, not behavior or security review.', {
      scene: 'signals',
      pill: 'Measure · troubleshooting',
      rows: [
        { label: 'No findings', description: 'The change introduced no pattern recognized by these rules.', tag: 'run tests; review', z: 'github' },
        { label: 'Two CodeQL checks', description: 'Security CodeQL and Code Quality are separate analyses.', tag: 'read each purpose', z: 'purple' },
        { label: 'Unexpected block', description: 'A rule may be Active or coverage may be missing.', tag: 'ruleset + coverage', z: 'orange' },
        { label: 'Finding is intentional', description: 'The rule pattern may not fit this code path.', tag: 'dismiss with reason', z: 'green' }
      ],
      footnote: 'Standard findings can gate at the team threshold. AI findings remain advisory; security review and secret scanning stay separate.'
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
    S('step-1-assign', 4, 'A requester delegates a bounded issue; the agent opens a plan commit.', {
      scene: 'event-step',
      pill: 'Wire it together · step 1',
      subtitle: 'A human action begins the work; the agent creates the draft.',
      event: {
        label: 'Observed on FanHub #221 · one run · 2026-10-23',
        items: [
          { when: '15:30:24 UTC', actor: 'Requester', z: 'orange', what: 'Issue #159 rewritten with scope and acceptance criteria, then assigned.' },
          { when: '15:30:31 UTC', actor: 'Cloud agent', z: 'purple', what: 'Draft #221 opens with plan commit e046f52.' }
        ]
      }
    }),
    S('step-2-plan-checks', 4, 'Code Quality scans the plan commit; review reports no files to review.', {
      scene: 'event-step',
      pill: 'Wire it together · step 2',
      subtitle: 'Separate the scan result from the review result; each agent has a different job.',
      event: {
        label: 'Observed on FanHub #221 · same plan commit e046f52',
        items: [
          { when: '15:30:36 UTC', actor: 'Code Quality', z: 'green', what: 'Scan starts about five seconds after the push.' },
          { when: '15:30:42 UTC', actor: 'Code review', z: 'github', what: 'Automatic review says it could not review any files.' }
        ]
      }
    }),
    S('step-3-lockfile', 4, 'A lockfile-only push receives a changes-requested review.', {
      scene: 'event-step',
      pill: 'Wire it together · step 3',
      subtitle: 'An agent push is still a new pull request head, so configured review and measurement wake again.',
      event: {
        label: 'Observed on FanHub #221 · one run',
        items: [
          { when: '15:32:08 UTC', actor: 'Cloud agent', z: 'purple', what: 'Commit 7686606 changes only a frontend lockfile.' },
          { when: '15:34:31 UTC', actor: 'Code review', z: 'github', what: 'Returns 🟡 Changes recommended on that head.' }
        ]
      }
    }),
    S('step-4-correction', 4, 'The next agent push fixes the change while review carries one stale open issue.', {
      scene: 'event-step',
      pill: 'Wire it together · step 4',
      subtitle: 'A green recommendation and the open-issues list answer different questions.',
      event: {
        label: 'Observed on FanHub #221 · one run',
        items: [
          { when: '15:37:13 UTC', actor: 'Cloud agent', z: 'purple', what: 'Commit 6159164 adds the fix and tests; Code Quality reports no findings.' },
          { when: '15:39:35 UTC', actor: 'Code review', z: 'github', what: 'Returns 🟢 with “1 open issue”: the outdated lockfile thread.' }
        ]
      }
    }),
    S('step-5-human-steers', 4, 'The PR owner resolves the stale thread and asks the agent for rework.', {
      scene: 'event-step',
      pill: 'Wire it together · step 5',
      subtitle: 'The PR owner closes resolved discussion and names the remaining change in a comment.',
      event: {
        label: 'Observed on FanHub #221 · human-invoked actions',
        items: [
          { when: '15:46:05 UTC', actor: 'PR owner', z: 'orange', what: 'Resolves the outdated lockfile thread.' },
          { when: '15:46:06 UTC', actor: 'PR owner', z: 'orange', what: '@copilot: add a shared helper and justify the x/crypto bump.' }
        ]
      }
    }),
    S('step-6-rework', 4, 'The rework push wakes both agents and review records the resolved thread.', {
      scene: 'event-step',
      pill: 'Wire it together · step 6',
      subtitle: 'The agent explains the dependency decision in the PR description.',
      event: {
        label: 'Observed on FanHub #221 · one run',
        items: [
          { when: '15:49:46 UTC', actor: 'Cloud agent', z: 'purple', what: 'Commit 5444980 adds the shared helper.' },
          { when: '15:52:18 UTC', actor: 'Code review', z: 'github', what: '🟢 No open issues; one issue resolved since last review.' }
        ]
      }
    }),
    S('step-7-staged', 4, 'A deliberately staged human change lets two agents frame the same issue differently.', {
      scene: 'event-step',
      pill: 'Wire it together · step 7 · STAGED quality issue',
      subtitle: 'The nil guard result was immediately overwritten; this commit was deliberately introduced for the demonstration.',
      event: {
        label: 'Observed on FanHub #221 · one staged run',
        items: [
          { when: '15:54:34 UTC', actor: 'PR owner', z: 'orange', what: 'Pushes 8a752d2, a nil guard whose result is overwritten.' },
          { when: '15:56:18 UTC', actor: 'Code Quality', z: 'green', what: '“Useless assignment to local variable” with Autofix, about 100 seconds later.' },
          { when: '15:57:20 UTC', actor: 'Code review', z: 'github', what: '“Optional cleanup … Error() called twice.”' }
        ]
      }
    }),
    S('step-8-handoff', 4, 'A person hands the finding to the agent; one fix clears both agents’ threads.', {
      scene: 'event-step',
      pill: 'Wire it together · step 8',
      subtitle: 'The agent ran go test in its session; Copilot review stated tests were not executed.',
      event: {
        label: 'Observed on FanHub #221 · one run',
        items: [
          { when: '15:58:28 UTC', actor: 'PR owner', z: 'orange', what: 'Replies @Copilot on the Code Quality finding.' },
          { when: '16:00:53 and 16:01:56 UTC', actor: 'Cloud agent', z: 'purple', what: 'Commits 69aa00f and 6a512c1 remove the redundant assignment and simplify internal error logging.' },
          { when: '16:06:08 UTC', actor: 'Code review', z: 'github', what: '🟢 No open issues; all three threads are resolved.' }
        ]
      }
    }),
    S('what-ends-loop', 4, 'A person ends the loop and writes down what the final head proves.', {
      scene: 'scorecard',
      pill: 'Wire it together · decision record',
      subtitle: '#221 stayed a draft with no merge decision. FanHub #210 supplies the merged decision example.',
      cards: [
        { icon: '📦', title: 'Available', description: '#210 patch, agent test runs, green review, clean Code Quality on the head.' },
        { icon: '🔎', title: 'Absent', description: 'Every #221 Copilot review said tests were not executed; #210 noted no browser check.' },
        { icon: '📜', title: 'Policy', description: 'Inspect rulesets, required checks, and quality gates on the final head.' },
        { icon: '👤', title: 'Judgment and recovery', description: 'Maintainer ran 8 of 8 tests on 02ddaf3; squash 803254f; revert it if needed.' }
      ],
      footnote: 'A merge record names the evidence by commit, evidence absent, policy, residual-risk judgment, action, and recovery.'
    }),
    S('configure-promote-cost', 4, 'Permit production, count review advice, and enforce quality as separate promotions.', {
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
      footnote: 'As described in 2026-10 sources: Lite review ~$0.05–$1; Balanced ~$0.25–$5 per review. Code Quality: $10 per active committer/month.'
    }),
    S('event-map-recap', 4, 'An event map explains the loop more accurately than a linear pipeline.', {
      scene: 'before-after',
      pill: 'Synthesis · the operating model',
      subtitle: 'Follow actor, trigger, commit, evidence, and decision instead of assuming one fixed sequence.',
      before: [
        'Treat the work as a fixed pipeline.',
        'Treat one green result as the whole answer.',
        'Assume the agent’s work ends at its push.'
      ],
      after: [
        'Configured events can wake agents on every push.',
        'Tests, review, and quality rules prove different things.',
        'A person steers, accepts risk, and decides merge.'
      ],
      metrics: [
        { value: 'WHO', detail: 'invoked or acted?' },
        { value: 'WHICH SHA', detail: 'did the agent inspect?' },
        { value: 'WHAT NEXT', detail: 'evidence or decision is missing?' }
      ]
    }),
    S('replay-last-pr', 4, 'Replay a merged pull request to find the next useful setting change.', {
      scene: 'today',
      pill: 'Transfer · apply it to your repository',
      subtitle: 'Use a real merged PR, its push history, and its evidence. Record what you can verify.',
      horizons: [
        { icon: '🔎', label: 'Today', z: 'green', items: ['Pick one merged PR.', 'For each push, list which agents ran.', 'Record the SHA each review saw.'] },
        { icon: '🧭', label: 'This week', z: 'local', items: ['Mark human and automatic actions.', 'Find a missing review or evidence step.', 'Change one setting and observe.'] },
        { icon: '📋', label: 'Next pilot', z: 'purple', items: ['Name the owner and acceptance signal.', 'Keep merge authority with the right person.', 'Set a rollback condition.'] }
      ],
      takeaway: 'The first change is the missing event or evidence step you can verify in your own repository.'
    }),
    S('references', 0, 'First-party evidence and observed examples', {
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
          { label: 'Issue #159 rewrite', href: SRC.issue159.href, description: 'Bounded task context' },
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
      prompt: 'Which event or evidence step will you inspect in your next pull request?'
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
      cue: ['Open FanHub issue #159 and show the original concise issue beside its rewritten acceptance criteria and scope.'],
      seconds: 110
    },
    'produce-use': {
      notes: [
        '"Before reading the diff, ask six questions: does the plan match the issue; which commit contains the implementation; did the agent change unexpected paths; what tests were added and who ran them; which workflow runs still wait for approval; and what evidence is missing?',
        '"Steer with a comment rather than silently rewriting the agent branch. Every @copilot request can create another plan commit and rework push, which wakes review and measurement again.',
        'Point to the session log for commands the agent ran. The log does not establish that an independent person ran those tests.',
        '→ If a result is surprising, use its signal to choose a recovery move.'
      ],
      know: ['FanHub #210 provides a separate observed example: draft opened 12 seconds after assignment, then a two-file fix with eight regression tests arrived about three and a half minutes later. These are one-run timings, not a service-level guarantee.'],
      sources: [SRC.cloud, SRC.pr210, SRC.pr221],
      seconds: 110
    },
    'produce-troubleshoot': {
      notes: [
        '"An empty first commit is normal when the agent opens a draft with its plan before the implementation push.',
        '"Unexpected files can come from setup or tool side effects. Dependency and formatting changes can expand scope; ask the agent to justify them or revert them.',
        '"If the agent cannot build or reach a registry, check setup steps, the allowlist, and the session log.',
        'On #221, review flagged a lockfile-only commit and the agent later reverted it. The x/crypto bump stayed because the agent recorded that Gin 1.10.0 required it.',
        '→ These recovery moves help, while the platform boundary remains fixed.'
      ],
      know: ['Commit 7686606 changed only a frontend lockfile. The following agent push reverted that change. The dependency justification is the PR description evidence from the observed run.'],
      sources: [SRC.cloud, SRC.pr221],
      seconds: 80
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
        '→ Policy controls when review runs; repository instructions shape the context it reads.'
      ],
      know: ['Repository rules can enable review at organization or repository level. If multiple triggers apply, Copilot posts one review. A user setting cannot disable push or draft reviews that a ruleset enabled.'],
      sources: [SRC.reviewSetup],
      seconds: 85
    },
    'reason-setup-context': {
      notes: [
        '"A platform owner chooses automatic review rules, whether drafts are reviewed, whether new pushes are reviewed, and who can trigger reviews that consume organizational resources.',
        '"Lite and Balanced are effort choices with different credit ranges. Private repository reviews also use Actions minutes for context gathering. Review runners default to standard GitHub-hosted runners; larger or self-hosted runners are options.',
        '"Code review reads instruction files from the PR head. Use applyTo to scope rules to paths, and excludeAgent to keep producer-only instructions away from review or vice versa.',
        '→ A real example shows why review evidence can add value beyond a green test run.'
      ],
      know: ['The source described Lite at about $0.05–$1 and Balanced at about $0.25–$5 of AI credits per review. Automatic-review credits are attributed to the PR author; for cloud-agent PRs, to the human co-author first. Rates may change.'],
      sources: [SRC.review, SRC.reviewSetup, SRC.instructions],
      seconds: 110
    },
    'reason-use-198': {
      notes: [
        '"FanHub #198 is the useful gap: four component tests passed and the build was green, yet the Retry button had no interactive render mode and its click handler never wired up.',
        '"Review also found that clearing the error too early made the retrying state unreachable. The author added a render-mode test that failed against the original draft and then passed six of six.',
        'Point left to what the existing checks established; point right to the browser behavior that remained unseen. Passing checks and review are complementary evidence.',
        '→ Read the commit and open-issues list together when a review result looks odd.'
      ],
      know: ['This is an observed FanHub pull request example, not a general test-coverage statistic. The additional render-mode test demonstrated the behavior against the original draft.'],
      sources: [SRC.pr198],
      cue: ['If internet access and the repository are available, open the #198 diff and review thread; otherwise walk the two proof columns.'],
      seconds: 120
    },
    'reason-troubleshoot': {
      notes: [
        '"When Copilot says it could not review files, check whether it analyzed the plan-only commit. Turn on Review new pushes or request review after implementation.',
        '"A green recommendation with one open issue means an earlier thread remains unresolved. Resolve it when the newer commit fixed it.',
        '"If the agent fixes a finding but no review appears, check Review new pushes and request review if needed.',
        'Instructions that are missing or broad can add low-value comments; scope them to paths and separate producer and reviewer rules.',
        '→ Review recommends; the approval boundary is a separate choice.'
      ],
      know: ['FanHub #210 had Review new pushes off and the only automatic review saw the plan commit. A maintainer requested review after the fix. In #221, a person resolved the stale lockfile thread.'],
      sources: [SRC.review, SRC.reviewSetup, SRC.pr210, SRC.pr221],
      seconds: 85
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
      know: ['These timings belong to FanHub #221 on 2026-10-23 and are one observed run, not a benchmark. AI findings were default-branch-only and public preview in the verified docs set.'],
      sources: [SRC.quality, SRC.detection, SRC.pr221],
      seconds: 80
    },
    'measure-standard-ai': {
      notes: [
        '"Standard findings come from CodeQL quality rules. With the same code, rules, and tool version, they are reproducible and can gate by the configured severity threshold.',
        '"AI findings are model-mediated, were public preview in the cited source set, and could not block a merge. The documentation described them on the default branch only.',
        '"Security CodeQL is a separate analysis, and secret scanning is separate again. Do not treat a clean quality run as security review.',
        '→ A platform owner can observe the rules before activating their gate.'
      ],
      know: ['Product status statements are dated to sources verified 2026-10-21 and 2026-10-23. Language-specific CodeQL query lists assign category and severity.'],
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
        '→ A clean run still has a precise boundary.'
      ],
      know: ['The @Copilot handoff on a Code Quality finding was described as GA in the README source set verified 2026-10-23. Autofix is a suggested changeset; the person commits it.'],
      sources: [SRC.quality, SRC.pr201, SRC.pr199],
      cue: ['Open #201 to inspect the proposed int.TryParse change and commit 0b33cda; open #199 to compare 26.7 percent, the 27 percent minimum, and the later 30 percent result.'],
      seconds: 115
    },
    'measure-troubleshoot': {
      notes: [
        '"No findings means these rules recognized no issue in the changed code. Tests and review still answer different questions about behavior.',
        '"Two CodeQL checks are expected when both security CodeQL and Code Quality run. Read each for its own purpose.',
        '"An unexpected block can mean a rule is Active or the coverage upload did not arrive. An intentional pattern can be dismissed with a reason.',
        '→ Now we’ll trace the events and evidence on one pull request.'
      ],
      know: ['Standard findings may gate at the team-configured threshold. AI findings remain advisory in the cited documentation.'],
      sources: [SRC.quality, SRC.detection],
      seconds: 80
    },
    wire: {
      notes: [
        '"This is the payoff: one bounded issue moves through all three agents, and the event history explains what happened.',
        '"The next eight steps use FanHub draft #221, observed on 2026-10-23 with Review new pushes enabled. Every timestamp is UTC and belongs to one run.',
        'The staged quality issue was a deliberate human push, not an agent-discovered production defect.',
        '→ The requester assigns the issue and the cloud agent opens its draft.'
      ],
      know: ['FanHub #221 remained a draft with no merge decision. The merged example later in the talk is #210.'],
      sources: [SRC.pr221, SRC.issue159],
      seconds: 70
    },
    'step-1-assign': {
      notes: [
        '"The requester rewrites issue #159 with acceptance criteria and scope, then assigns it.',
        '"Seven seconds later, the cloud agent opens draft #221 with plan commit e046f52. That empty planning commit is part of the observed flow.',
        'Point to the distinct actor labels: requester invokes; cloud agent opens the draft.',
        '→ The two checks react to that plan commit in different ways.'
      ],
      know: ['Observed on FanHub #221, one run on 2026-10-23. Assignment occurred at 15:30:24 UTC and the draft opened at 15:30:31 UTC.'],
      sources: [SRC.issue159, SRC.pr221],
      seconds: 95
    },
    'step-2-plan-checks': {
      notes: [
        '"Code Quality starts its scan about five seconds after the plan commit. It measures the commit even when it contains no implementation.',
        '"Code review follows and reports that it could not review any files. That is a review result, not a failed Code Quality check.',
        'Keep the two outputs distinct: scan started, review found no files.',
        '→ The implementation push gives both agents code to inspect.'
      ],
      know: ['Observed timestamps: Code Quality began at 15:30:36 UTC; the review was posted at 15:30:42 UTC.'],
      sources: [SRC.pr221, SRC.quality, SRC.review],
      seconds: 95
    },
    'step-3-lockfile': {
      notes: [
        '"The agent’s next commit, 7686606, changed only a frontend lockfile.',
        '"With Review new pushes enabled, code review ran on that head and returned a yellow changes-recommended assessment.',
        '"This is why the commit identity matters: the assessment says what it analyzed.',
        '→ The next agent push corrects course, and the open-issues list carries state forward.'
      ],
      know: ['The push occurred at 15:32:08 UTC; the review arrived at 15:34:31 UTC. These are one observed run.'],
      sources: [SRC.pr221, SRC.reviewSetup],
      seconds: 95
    },
    'step-4-correction': {
      notes: [
        '"At 15:37:13, the agent pushed commit 6159164 with the fix and tests. Code Quality reported no findings.',
        '"At 15:39:35, code review recommended approval but still listed one open issue: the outdated lockfile thread.',
        '"A green recommendation does not silently resolve a thread. The PR owner can read both the assessment and the list.',
        '→ The PR owner resolves the stale thread and asks for the remaining rework.'
      ],
      know: ['The stale lockfile issue remained in the open-issues list until a person resolved it.'],
      sources: [SRC.pr221],
      seconds: 95
    },
    'step-5-human-steers': {
      notes: [
        '"At 15:46:05, the PR owner resolves the lockfile thread because the newer commit corrected it.',
        '"One second later, the PR owner asks @copilot for a shared helper and a justification for the x/crypto bump.',
        '"Resolving the old issue and requesting new work are two deliberate human actions.',
        '→ The agent’s response is another push, so both checks wake again.'
      ],
      know: ['The person who owns the PR steers the branch. This is separate from the requester role, even when one person holds both roles.'],
      sources: [SRC.pr221],
      seconds: 95
    },
    'step-6-rework': {
      notes: [
        '"The agent added the shared helper in commit 5444980 at 15:49:46.',
        '"Review ran again at 15:52:18 and returned no open issues, with one issue resolved since the last review.',
        '"The agent kept the x/crypto bump because Gin 1.10.0 required it and recorded the reason in the PR description.',
        '→ Next, a human push shows both agents can inspect the same line differently.'
      ],
      know: ['The exact dependency justification is from the observed PR description. Timings are one run and not a service guarantee.'],
      sources: [SRC.pr221],
      seconds: 95
    },
    'step-7-staged': {
      notes: [
        '"At 15:54:34, the PR owner deliberately staged a nil guard whose result was immediately overwritten. This is labelled staged because the person introduced it to demonstrate a quality signal.',
        '"Code Quality named “Useless assignment to local variable” and offered Autofix at 15:56:18, about 100 seconds later.',
        '"Code review followed at 15:57:20 with a different framing: optional cleanup because Error() was called twice.',
        '"One line produced two useful but distinct explanations.',
        '→ A person hands the finding to the agent for a fix.'
      ],
      know: ['The commit was 8a752d2. Do not describe the staged change as a naturally discovered production defect or as a test-runner PASS/FAIL.'],
      sources: [SRC.pr221],
      seconds: 95
    },
    'step-8-handoff': {
      notes: [
        '"At 15:58:28, the PR owner replies @Copilot on the Code Quality finding.',
        '"The agent pushes commits 69aa00f and 6a512c1 to remove the redundant assignment and simplify internal error logging.',
        '"At 16:06:08, code review says there are no open issues and all three threads are resolved.',
        '"The agent ran go test in its own session. The review still stated that tests were not executed during review. A person decides whether more evidence is needed.',
        '→ The event walk ends at a decision point, not at an automatic merge.'
      ],
      know: ['This observed run ended with #221 still a draft; it had no merge decision. Keep this separate from FanHub #210.'],
      sources: [SRC.pr221],
      seconds: 95
    },
    'what-ends-loop': {
      notes: [
        '"The cloud agent cannot approve or merge. A person decides when another rework round stops paying for itself, and each pass consumes credits and Actions minutes.',
        '"FanHub #221 remained a draft. For an actual merge decision, use #210: the maintainer had the patch, a green assessment, a clean Code Quality run, and the agent’s test runs.',
        '"The full evidence set keeps the cloud-agent patch and session tests, the commit-specific review and open threads, Code Quality and the separate CodeQL security result, and a person-run test with residual-risk judgment in distinct rows.',
        '"The maintainer independently ran eight of eight tests on commit 02ddaf3, recorded the absent browser check, squash-merged as 803254f, and named reverting that squash commit as recovery.',
        '"Write down the evidence by commit, what is absent, whether policy is satisfied, why residual risk is acceptable, and how to recover.',
        '→ Configuration is how a team changes invocation, evidence, and authority.'
      ],
      know: ['Every Copilot review on #221 stated tests were not executed. The agent’s own go test run is not an independent maintainer run. #210 is the decision record used here.'],
      sources: [SRC.pr221, SRC.pr210, SRC.cloud, SRC.review, SRC.quality],
      seconds: 125
    },
    'configure-promote-cost': {
      notes: [
        '"The configuration surfaces divide into agent context, invocation and permissions, review policy, merge evidence, and economics.',
        '"Promote in stages: observe scoped tasks and manual reviews; automate review on new pushes while rules remain in Evaluate; then count approval or activate trusted standard rules.',
        '"Each promotion gets an owner, observation period, and rollback. Move a quality rule back to Evaluate, dismiss an inapplicable finding with a reason, resolve a thread, or close and reassign a draft.',
        '"The cited review ranges were about five cents to one dollar at Lite and about twenty-five cents to five dollars at Balanced, per review. Private repositories also use Actions minutes for context gathering.',
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
    'replay-last-pr': {
      notes: [
        '"Choose the last pull request your team merged. For each push, write which agents ran and which commit each one saw.',
        '"Mark human-invoked actions separately from automatic events. Look for a missing step, such as a fix commit with no review or a green rule check with no behavior test.',
        '"Change one setting or evidence step at a time. Name the owner, the signal that would show it works, and the rollback condition.',
        '"The first setting to change is the missing event or evidence step you can verify in your own repository."',
        'Point to Today, This week, and Next pilot. Each is a transfer horizon, not a claim that a target result has already happened.',
        '→ Use the linked evidence to inspect details after the talk.'
      ],
      know: [
        'The suggested exercise comes from the README’s transfer section. There is no promised performance improvement or target metric; participants inspect their own PR history.',
        'Concrete next actions: rewrite one open bug with problem, acceptance criteria, and scope; assign it and inspect the plan commit; enable Review new pushes and check the analyzed SHA; enable Code Quality on one repository with a rule in Evaluate; reply @Copilot on one finding and observe the new push; run the agent’s tests yourself before relying on a green assessment.'
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
        '"Which event or evidence step will you inspect in your next pull request?"'
      ],
      know: ['The talk budget is 55:50, leaving 4:10 of the 60-minute duration for questions. Budgets are estimates until a presenter times a run-through.'],
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
