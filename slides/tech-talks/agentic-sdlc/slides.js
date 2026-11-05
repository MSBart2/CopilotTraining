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
    slsa: { label: 'SLSA supply-chain security framework', href: 'https://slsa.dev/' },
    cloudAgent: { label: 'Copilot cloud agent: risks and mitigations', href: 'https://docs.github.com/copilot/concepts/agents/cloud-agent/risks-and-mitigations' },
    spaces: { label: 'Creating GitHub Copilot Spaces', href: 'https://docs.github.com/copilot/how-tos/context/copilot-spaces/creating-and-using-copilot-spaces' },
    multiRoot: { label: 'VS Code multi-root workspaces', href: 'https://code.visualstudio.com/docs/editing/workspaces/multi-root-workspaces' },
    subIssues: { label: 'Adding sub-issues', href: 'https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues' },
    dependabot: { label: 'Dependabot version updates', href: 'https://docs.github.com/en/code-security/dependabot/dependabot-version-updates' },
    reusableWorkflows: { label: 'Reusing GitHub Actions workflows', href: 'https://docs.github.com/en/actions/sharing-automations/reusing-workflows' },
    rulesets: { label: 'Available rules for rulesets', href: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets' },
    issueTemplates: { label: 'Configuring issue templates', href: 'https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository' },
    cloudAgentIssue: { label: 'Asking Copilot to create a pull request', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-a-pr' },
    cloudAgentReview: { label: 'Reviewing output from Copilot cloud agent', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output' },
    codeReview: { label: 'Using GitHub Copilot code review', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/copilot-code-review' },
    customInstructions: { label: 'Adding repository custom instructions', href: 'https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions' },
    codeowners: { label: 'About code owners', href: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners' },
    nxAffected: { label: 'Nx: run only tasks affected by a PR', href: 'https://nx.dev/docs/features/ci-features/affected' },
    npmCi: { label: 'npm ci command', href: 'https://docs.npmjs.com/cli/commands/npm-ci' },
    attestations: { label: 'Artifact attestations', href: 'https://docs.github.com/en/actions/concepts/security/artifact-attestations' },
    attestHowTo: { label: 'Using artifact attestations', href: 'https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations' },
    slsaLevels: { label: 'SLSA v1.0 security levels', href: 'https://slsa.dev/spec/v1.0/levels' }
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
    S('core-question', 0, 'How do I ship more with agents and still trust every change?', {
      scene: 'delivery-confidence',
      pill: 'core question',
      subtitle: 'Give agents bounded work. Make the evidence clear enough for a reviewer to decide.',
      highlight: 'Expand delegation as platform readiness and team practice grow together.',
      routingLabel: 'Build confidence in sequence',
      routing: ['assess', 'govern', 'verify', 'scale'],
      task: 'Add retry handling; preserve the API.',
      handoffs: [
        { title: 'Agent proposes', artifact: 'PR diff + tests', detail: 'Bounded by the request and repository context.', z: 'purple' },
        { title: 'CI verifies', artifact: 'Check results', detail: 'Build, tests, and policy evidence travel with the PR.', z: 'github' },
        { title: 'Reviewer decides', artifact: 'Accept or return', detail: 'A human weighs intent, risk, and the evidence.', z: 'orange' }
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
    S('maturity-map', 1, 'Rate platform readiness and team adoption side by side', {
      scene: 'maturity-map',
      pill: 'Maturity Model · Five levels',
      subtitle: 'Where the two scores diverge, you have found the next investment.',
      launchpad: 'L3',
      levels: [
        { level: 'L1', name: 'Functional', platform: 'Build + basic CI stable', adoption: 'Environment is being established', unlock: 'Repeatable baseline' },
        { level: 'L2', name: 'Documented', platform: 'Setup + conventions explicit', adoption: 'Copilot use starts to recur', unlock: 'Shared context' },
        { level: 'L3', name: 'Standardized', platform: 'CI, ownership, security gates', adoption: 'Daily use; bounded delegation', unlock: 'Quality infrastructure' },
        { level: 'L4', name: 'Optimized', platform: 'Enterprise tools + orchestration', adoption: 'Governance and use iterated', unlock: 'Context-aware workflows' },
        { level: 'L5', name: 'Autonomous', platform: 'Intent, policy, provenance', adoption: 'Outcome validation + measurement', unlock: 'Measured autonomy' }
      ],
      sources: ref('agentrcConcepts')
    }),
    S('l3-launchpad', 1, 'What L3 requires: a repeatable platform and a habitual team', {
      scene: 'l3-requirements',
      pill: 'Maturity Model · L3 requirements',
      subtitle: 'When both columns hold, agent work meets the same bar as every other change.',
      platform: {
        kicker: 'PLATFORM READINESS',
        title: 'The repository provides',
        items: [
          'Build, test, lint, and deploy run in CI',
          'Branch protection and CODEOWNERS on main',
          'AGENTS.md and deterministic agent setup',
          'Security scans run on every PR',
          'Build time, flakes, and coverage are visible'
        ]
      },
      adoption: {
        kicker: 'TEAM ADOPTION',
        title: 'The team practices',
        items: [
          'Copilot is part of daily work across the team',
          'Delegated issues carry acceptance criteria',
          'Shared prompt files live in the repository',
          'Automatic code review runs on target PRs',
          'Team-specific review guidelines are written down'
        ]
      },
      targetsLabel: 'PLANNING TARGETS',
      targetsNote: 'baseline your own',
      targets: ['Flake rate < 2%', 'PR checks < 10 min', 'MAU ≥ 60%', 'Agent PR merge ≥ 60%', '3–5 agent issues / sprint'],
      sources: ref('agentrcConcepts', 'actions')
    }),
    S('volume-breakpoint', 1, 'When agents write the code, review becomes the bottleneck', {
      scene: 'volume-breakpoint',
      pill: 'Maturity Model · Why change',
      subtitle: 'Illustrative planning math from the source talk: the same reviewer facing 50× the volume.',
      left: { value: '300', label: 'lines / reviewer / day', caption: 'A REVIEWER READING LINE BY LINE' },
      right: { value: '15,000', label: 'lines / reviewer / day', caption: 'AGENT-SCALE OUTPUT · ILLUSTRATIVE' },
      ratio: '×50',
      marker: 'Line-by-line reading covers 2% of this volume',
      from: { title: 'Reading every line', detail: 'Reviewer time grows with every generated line' },
      to: { title: 'Validating intent, risk, and evidence', detail: 'Automation runs repeatable checks; people own the decision' },
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
    S('repo-decision', 1, 'Let change patterns draw your repository boundaries', {
      scene: 'repo-decision',
      subtitle: 'Measure how often one feature crosses repositories, then honor the constraints that require separation.',
      gaugeLabel: 'SHARE OF RECENT FEATURES THAT TOUCH 2+ REPOSITORIES',
      gaugeNote: 'Count it from your own PR and issue history',
      below: 'Coordination stays manageable',
      above: 'Coordination dominates: pilot consolidation',
      threshold: { value: 0.3, label: '30% · proposed threshold' },
      keep: {
        label: 'SEPARATION EARNS ITS COST',
        items: [
          ['Hard access boundary', 'Regulation or security requires separation'],
          ['Independent lifecycle', 'Release cadences genuinely diverge'],
          ['Transitional state', 'An acquisition with a planned revisit date']
        ],
        outcome: 'Keep the boundary and rebuild the shared pieces'
      },
      consolidate: {
        label: 'CONSOLIDATION EARNS ITS COST',
        items: [
          ['Frequent shared change', 'One feature spans several components'],
          ['Recurring coordination', 'Multiple PRs and handoffs per feature'],
          ['Atomic change matters', 'Code, tests, and contract move together']
        ],
        outcome: 'Pilot one workspace and measure coordination saved'
      },
      sources: ref('nx')
    }),
    S('monorepo-topology', 1, 'One workspace keeps an atomic change inspectable', {
      scene: 'topology',
      subtitle: 'Deployable units stay distinct while sharing one dependency graph, one CI view, and enforced boundaries.',
      tree: [
        ['repo/', ''],
        ['├─ .github/workflows/', 'required checks'],
        ['├─ .github/CODEOWNERS', 'owner routing'],
        ['├─ AGENTS.md', 'agent context'],
        ['├─ apps/web/', 'deploys'],
        ['├─ apps/api/', 'deploys'],
        ['├─ libs/auth/', 'tag: shared'],
        ['├─ libs/data/', 'tag: shared', true],
        ['├─ libs/payments/', 'tag: scope:payments', true],
        ['└─ nx.json', 'graph + boundaries']
      ],
      lint: [
        '✕ @nx/enforce-module-boundaries',
        'libs/data/src/repo.ts:4',
        'imports libs/payments (scope:payments)',
        '→ the agent reads the rule and fixes it'
      ],
      plane: [
        ['Golden templates', 'shared workflows + scaffolds'],
        ['Policy + standards', 'access, audit, independent updates'],
        ['Shared agents', 'reviewed once, reused everywhere']
      ],
      planeNote: 'Workspaces consume these by reference',
      sources: ref('nx', 'actions')
    }),
    S('polyrepo-strategies', 1, 'Monorepo is the easier path; polyrepo can still get there', {
      scene: 'polyrepo-strategies',
      subtitle: 'When repositories must stay apart, rebuild what one workspace gives you for free.',
      leftLabel: 'A MONOREPO GIVES YOU',
      rightLabel: 'POLYREPO STRATEGY',
      toolLabel: 'GITHUB MECHANISM',
      rows: [
        { gives: 'SHARED CONTEXT', givesDetail: 'One checkout holds every caller', strategy: 'Bring the neighbors into context', detail: 'Attach sibling repositories and API docs so the agent sees callers and contracts', tools: ['Copilot Spaces', 'Multi-root workspace'] },
        { gives: 'ATOMIC CHANGE', givesDetail: 'One PR carries the whole feature', strategy: 'Plan linked PRs from one parent issue', detail: 'One sub-issue per repository; the contract merges first, consumers follow', tools: ['Sub-issues'] },
        { gives: 'ONE DEPENDENCY GRAPH', givesDetail: 'Every import is visible', strategy: 'Version the contracts', detail: 'Publish shared libraries and API schemas; bots open upgrade PRs in consumers', tools: ['GitHub Packages', 'Dependabot'] },
        { gives: 'ONE CI VIEW', givesDetail: 'Same checks on every change', strategy: 'Centralize the pipeline', detail: 'Every repository calls the same workflows; rulesets require them before merge', tools: ['Reusable workflows', 'Rulesets'] }
      ],
      cost: { label: 'THE COST', text: 'Each workaround is coordination you now own. When linked PR sets become the usual shape of a feature, rerun the 30% check.' },
      sources: ref('cloudAgent', 'spaces', 'multiRoot', 'subIssues', 'dependabot', 'reusableWorkflows', 'rulesets')
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
    S('intent-contract', 2, 'The issue is the contract Copilot builds against', {
      scene: 'issue-contract',
      subtitle: 'An illustrative agent-ready issue: each section does a job for the agent and for the reviewer.',
      issue: { state: 'Open', title: 'Add password reset to user settings', meta: 'Assignee: Copilot · Template: .github/ISSUE_TEMPLATE/agent-task.yml' },
      sections: [
        { heading: 'Goal', z: 'purple', lines: ['Users can reset a forgotten password from Settings.'], role: 'Scopes the work', why: 'Copilot plans against one user outcome' },
        { heading: 'Constraints', z: 'orange', lines: ['- Use the existing email service.', '- Leave the auth middleware unchanged.'], role: 'Fences the change', why: 'The reviewer checks the diff stays inside the fence' },
        { heading: 'Rules', z: 'local', lines: ['- Reset link expires after 1 hour.', '- At most 3 reset requests per hour per account.'], role: 'Becomes tests', why: 'Each rule is an assertion Copilot writes and CI runs' },
        { heading: 'Acceptance criteria', z: 'green', lines: ['- [ ] Reset email arrives within 2 minutes', '- [ ] Every request writes an audit log entry', '- [ ] Tests cover expiry and the rate limit'], role: 'Becomes the evidence', why: 'Each box maps to a check the reviewer reads next' }
      ],
      sources: ref('issueTemplates', 'cloudAgentIssue')
    }),
    S('evidence-bundle', 2, 'Read the evidence where it lives: the pull request', {
      scene: 'pr-evidence',
      subtitle: 'No separate tool: Copilot’s PR links the issue, its session log, and the required checks.',
      pr: {
        title: 'Add password reset to user settings',
        branch: 'copilot/password-reset → main',
        closes: 'Closes the linked issue',
        summary: 'Copilot’s summary: what changed, why, and how it was tested',
        session: 'View session',
        review: 'Copilot code review left 2 comments  ·  a Comment review, outside the approval count',
        checks: [
          ['Tests: unit + integration', true],
          ['CodeQL', true],
          ['Dependency review', true],
          ['Nx module boundaries', true],
          ['Performance budget (p95)', true],
          ['Code owner review: @org/security', false]
        ]
      },
      steps: [
        { title: 'Compare to the contract', where: 'Linked issue', detail: ['Each acceptance box needs a matching check', 'or a line in Copilot’s summary.'] },
        { title: 'See how it got there', where: 'Session log', detail: ['The plan, the commands, and the CodeQL,', 'dependency, and secret scans the agent ran.'] },
        { title: 'Map checks to acceptance', where: 'Merge box', detail: ['A rule without a check is a question', 'for the author, or for @copilot.'] },
        { title: 'Read the diff where risk lives', where: 'Files changed', detail: ['Focus on constraint and owner-routed paths,', 'then approve, request changes, or escalate.'] }
      ],
      sources: ref('cloudAgentReview', 'cloudAgent', 'codeReview')
    }),
    S('governance-gates', 2, 'Sort 22 manual gates: automate, route, or decide', {
      scene: 'gate-sort',
      subtitle: 'An illustrative gate list from a typical PR process. Run the same sort on your own list.',
      lanes: [
        { label: 'AUTOMATE', z: 'local', w: 640, question: 'Is the pass condition objective?', mechanism: 'Required status checks',
          gates: ['Code style review', 'Lint sign-off', 'Unit test sign-off', 'Integration test sign-off', 'Coverage threshold check', 'Build verification', 'Secret scan review', 'SAST review',
            'Dependency vulnerability audit', 'License compliance audit', 'Performance sign-off', 'Accessibility check', 'Module boundary review', 'Staging deploy sign-off', 'Smoke test sign-off', 'Rollback test sign-off'],
          result: '→ Required checks; nobody waits' },
        { label: 'ROUTE', z: 'orange', w: 376, question: 'Needs an expert for some paths?', mechanism: 'CODEOWNERS + rulesets',
          groups: [
            { cp: '2 · Security risk', gates: ['Auth change review', 'Payments and PII review'] },
            { cp: '3 · Architectural fit', gates: ['Architecture board review', 'Data schema review'] }
          ],
          result: '→ Checkpoints 2 + 3, when touched' },
        { label: 'DECIDE', z: 'purple', w: 376, question: 'Needs judgment on every change?', mechanism: 'Named human approver',
          groups: [
            { cp: '1 · Intent', gates: ['Product scope sign-off'] },
            { cp: '4 · Outcome', gates: ['Release go/no-go'] }
          ],
          result: '→ Checkpoints 1 + 4, every PR' }
      ],
      checkpoints: [
        { name: 'Intent', who: 'Product owner · every PR', z: 'purple' },
        { name: 'Security risk', who: 'Security owner · when touched', z: 'orange' },
        { name: 'Architectural fit', who: 'Code owner · when touched', z: 'orange' },
        { name: 'Outcome', who: 'Service owner · every PR', z: 'purple' }
      ],
      sources: ref('rulesets', 'codeowners', 'actions')
    }),
    S('context-aware-review', 2, 'Same diff, two reviewers: a pattern rule and Copilot', {
      scene: 'context-review',
      subtitle: 'Illustrative: a regex check in CI flags every “email”; Copilot code review flags only the real leak.',
      diff: {
        label: 'THE PR DIFF · TWO NEW LINES MENTION EMAIL',
        lines: [
          { at: 'tests/fixtures/users.ts:3', code: "+ const user = { email: 'ada@example.com' };" },
          { at: 'src/routes/reset.ts:12', code: "+ log.info('reset requested', req.body.email);" }
        ]
      },
      rule: {
        label: 'PATTERN RULE', where: 'CI job · runs on every push',
        file: '.github/workflows/pii-scan.yml', cmd: 'run: grep -rnw email src/ tests/',
        hits: [
          { at: 'tests/fixtures/users.ts:3', verdict: 'false positive', z: 'orange' },
          { at: 'src/routes/reset.ts:12', verdict: 'real leak', z: 'purple' }
        ],
        result: '2 findings, no reasons: a person triages both'
      },
      copilot: {
        label: 'COPILOT CODE REVIEW', where: 'Requested as a PR reviewer',
        file: '.github/instructions/review.instructions.md', cmd: 'Email in tests/ and fixtures/ is sample data.',
        comment: { at: 'src/routes/reset.ts:12', text: ['Logs a user-supplied email address.', 'Redact it, or log the user ID instead.'] },
        quiet: '✓ tests/fixtures/users.ts:3 · no comment: sample data',
        result: '1 finding, with a reason'
      },
      owner: { choices: ['Fix', 'Accept with a reason', 'Escalate'], note: 'Copilot leaves a Comment review by default; it does not count as an approval.' },
      sources: ref('codeReview', 'customInstructions')
    }),
    S('human-ownership', 2, 'CODEOWNERS routes every agent PR to the right reviewers', {
      scene: 'code-owners',
      subtitle: 'The moment Copilot opens a PR, the right owners are requested, and only for the files they own.',
      rules: [
        ['*', '@org/app-team', true],
        ['/libs/auth/', '@org/security', true],
        ['/libs/payments/', '@org/payments'],
        ['/db/migrations/', '@org/data'],
        ['/.github/workflows/', '@org/platform', true],
        ['/.github/CODEOWNERS', '@org/platform']
      ],
      prLabel: 'COPILOT PR · 3 FILES CHANGED',
      files: [
        ['libs/ui/button.tsx', '@org/app-team'],
        ['libs/auth/session.ts', '@org/security'],
        ['.github/workflows/ci.yml', '@org/platform']
      ],
      rulesetLabel: 'BRANCH RULESET · main',
      ruleset: ['Require review from Code Owners', 'Dismiss stale approvals on new pushes', 'Whoever asked Copilot cannot approve its PR (built in)'],
      why: [
        ['No triage queue', 'Reviewers are requested automatically'],
        ['Experts see their slice', 'Security reads session.ts, not the whole diff'],
        ['Owners review in parallel', 'Three slices, three owners, same hour']
      ],
      sources: ref('codeowners', 'rulesets', 'cloudAgent')
    }),

    S('part-3', 3, 'Trust Manufacturing', {
      scene: 'opener',
      subtitle: 'CI turns an agent’s proposal into evidence that people can trust and act on, quickly.',
      cards: [
        { icon: '⏱️', title: 'Fast feedback', blurb: 'CI sets the pace of every round' },
        { icon: '🧪', title: 'Reliable signal', blurb: 'Red means a real break' },
        { icon: '📜', title: 'Provenance', blurb: 'Prove what was built, and from where' }
      ],
      terminal: { context: 'Agents move at the speed of CI.', detail: 'Make it fast, make it reliable, and make it provable.' }
    }),
    S('trust-pipeline', 3, 'Stage CI by who is waiting for the answer', {
      scene: 'ci-stages',
      subtitle: 'Fast checks answer the agent on every push; deeper checks protect the merge and the release.',
      stages: [
        { when: 'EVERY PUSH', budget: '10 min', waiter: 'The agent, mid-iteration', z: 'purple',
          checks: ['Build', 'Affected tests', 'Lint and format', 'High-severity security scan'],
          fail: 'Agent reads the log and pushes a fix' },
        { when: 'BEFORE MERGE', budget: '30 min', waiter: 'The reviewer', z: 'github',
          checks: ['Full test suite', 'Deep security analysis', 'Performance budgets', 'Architecture and dependency rules'],
          fail: 'Merge blocked; findings go to the owner' },
        { when: 'BEFORE RELEASE', budget: '60 min', waiter: 'The release owner', z: 'orange',
          checks: ['Deploy to staging', 'Smoke tests', 'Migration and rollback test', 'Load test when risk warrants'],
          fail: 'Release blocked; on-call owner alerted' }
      ],
      note: 'Keep every necessary check; place each one in the stage where the person waiting can act on it.',
      sources: ref('actions')
    }),
    S('ci-feedback', 3, 'Nothing moves faster than CI allows', {
      scene: 'ci-clock',
      subtitle: 'Illustrative: four fix-and-push rounds with 5 minutes of agent work each. Only the CI time changes.',
      max: 280,
      rounds: 4,
      agent: 5,
      legend: { agent: 'Agent works on a fix (5 min)', ci: 'Waiting on CI' },
      lanes: [{ label: '60-MINUTE CI', ci: 60 }, { label: '8-MINUTE CI', ci: 8 }],
      waiters: [
        { who: 'The agent', detail: 'Starts the next fix only after CI answers' },
        { who: 'The reviewer', detail: 'Reviews once the PR is green' },
        { who: 'The merge', detail: 'Lands only when required checks pass' }
      ],
      point: 'Every round waits for CI, so CI time sets the pace for the agent, the reviewer, and the merge.',
      sources: ref('actions')
    }),
    S('affected-analysis', 3, 'Build and test only what the change touches', {
      scene: 'affected-graph',
      subtitle: 'CI reads the dependency graph, runs every project that depends on the change, and skips the rest.',
      graphLabel: 'PROJECT GRAPH · libs/auth CHANGED IN THIS PR',
      nodes: [
        { id: 'apps/web', x: 170, y: 90 }, { id: 'apps/api', x: 430, y: 90 }, { id: 'apps/admin', x: 690, y: 90 },
        { id: 'libs/auth', x: 170, y: 210 }, { id: 'libs/ui', x: 430, y: 210 }, { id: 'libs/payments', x: 690, y: 210 },
        { id: 'libs/utils', x: 170, y: 330 }, { id: 'libs/config', x: 430, y: 330 }, { id: 'libs/data', x: 690, y: 330 }
      ],
      edges: [
        ['apps/web', 'libs/auth'], ['apps/web', 'libs/ui'], ['apps/api', 'libs/auth'], ['apps/api', 'libs/data'],
        ['apps/admin', 'libs/ui'], ['apps/admin', 'libs/payments'], ['libs/payments', 'libs/data'],
        ['libs/auth', 'libs/utils'], ['libs/ui', 'libs/utils'], ['libs/ui', 'libs/config']
      ],
      changed: 'libs/auth',
      affected: ['apps/web', 'apps/api'],
      stepLabel: 'CI STEP · .github/workflows/ci.yml',
      cmd: ['- run: npx nx affected -t lint test build', '    --base=origin/main --head=HEAD'],
      runs: [['libs/auth', 'changed'], ['apps/web', 'depends on auth'], ['apps/api', 'depends on auth']],
      skips: ['ui', 'payments', 'data', 'utils', 'config', 'admin'],
      result: '3 of 9 projects lint, test, and build',
      boundary: 'The graph is the safety case: a missing dependency edge skips a test that needed to run.',
      sources: ref('nxAffected', 'caching')
    }),
    S('flake-policy', 3, 'A flake is a test that passes and fails on the same code', {
      scene: 'flake-anatomy',
      subtitle: 'Same commit, same test, different result: the cause lives in the test or its environment.',
      commit: 'SAME COMMIT · a41c9e2 · NOTHING CHANGED BETWEEN RUNS',
      test: 'checkout.spec.ts › applies a discount code',
      runs: [
        { pass: true, note: 'finished in 1.8 s' },
        { pass: false, note: 'timed out waiting for #total' },
        { pass: true, note: 'finished in 2.1 s' }
      ],
      causes: [
        ['Timing and races', 'wait on a condition'],
        ['Shared state, test order', 'isolate test data'],
        ['Live network calls', 'mock or stub the service'],
        ['Clock and time zones', 'use a fake clock'],
        ['Unseeded randomness', 'fix the seed']
      ],
      hurtLabel: 'WHY FLAKES COST MORE WITH AGENTS',
      hurts: [
        'An agent reads red as a bug and edits working code to chase it.',
        'People learn to re-run red builds, so a real failure gets re-run too.'
      ],
      policy: [
        { step: 'Triage', lines: ['Capture the run, seed,', 'and environment'], z: 'purple' },
        { step: 'Contain', lines: ['Quarantine visibly, with', 'an owner and an expiry'], z: 'orange' },
        { step: 'Repair', lines: ['Fix or delete it within', 'two days (proposed)'], z: 'local' },
        { step: 'Measure', lines: ['Weekly flake rate;', 'target under 2% (proposed)'], z: 'green' }
      ],
      sources: ref('actions')
    }),
    S('hermetic-cache', 3, 'Opinionated CI runs faster than resolve-at-runtime CI', {
      scene: 'opinionated-ci',
      subtitle: 'Every input decided in advance is a step the run skips and a cache key the next run reuses.',
      bars: [
        { label: 'RESOLVE AT RUNTIME', sub: 'decides on every run',
          segs: [['Install toolchain', 290, 'local'], ['Resolve dependencies', 320, 'local'], ['Build and test', 440, 'github']] },
        { label: 'OPINIONATED', sub: 'decided in the repo',
          segs: [['Pull image', 110, 'local'], ['npm ci', 110, 'local'], ['Build and test', 440, 'github']],
          note: 'Same build and test, less setup first' }
      ],
      head: ['DECISION', 'RESOLVE AT RUNTIME', 'OPINIONATED', 'WHY IT IS FASTER'],
      rows: [
        ['Toolchain', 'setup steps and apt-get on every run', 'image pinned by @sha256', 'One image pull replaces setup'],
        ['Dependencies', 'npm install re-resolves versions', 'npm ci from the lockfile', 'Skips resolution; same tree every run'],
        ['Cache', 'no key, or a key that rarely matches', "key: hashFiles('package-lock.json')", 'Same inputs, same key: a cache hit']
      ],
      point: 'Pinned inputs give stable cache keys, and stable keys give cache hits: the opinions make CI fast.',
      sources: ref('caching', 'npmCi', 'actions')
    }),
    S('attestations', 3, 'Provenance proves where an artifact came from', {
      scene: 'slsa-provenance',
      subtitle: 'The build signs a provenance record; the deploy step verifies it before it trusts the artifact.',
      flow: [
        { step: 'SOURCE', what: 'Repo at a commit', mono: 'octo/shop@9f2c1e7', sub: 'the code that was built', z: 'local' },
        { step: 'BUILD', what: 'Actions workflow', mono: 'release.yml', sub: 'which workflow and trigger', z: 'github' },
        { step: 'ARTIFACT', what: 'Exact bytes', mono: 'sha256:4e1b…', sub: 'the digest names the file', z: 'github' },
        { step: 'ATTESTATION', what: 'Signed provenance', mono: 'actions/attest', sub: 'Sigstore-signed, on GitHub', z: 'purple' },
        { step: 'VERIFY', what: 'Deploy gate', mono: 'gh attestation', sub: 'a mismatch stops the deploy', z: 'green' }
      ],
      sign: { label: 'SIGN IN CI · release.yml', lines: ['- uses: actions/attest@v4', '  with: { subject-path: dist/app.tgz }'] },
      verify: { label: 'VERIFY BEFORE DEPLOY', lines: ['gh attestation verify dist/app.tgz -R octo/shop', '# non-zero exit stops the deploy'] },
      proves: { label: 'WHAT IT PROVES', z: 'green', mark: '✓', items: ['These bytes came from this repo and commit', 'Built by this workflow, on this trigger', 'Unchanged since the build signed them'] },
      scope: { label: 'OUTSIDE ITS SCOPE', z: 'orange', mark: '·', items: ['Whether the code is secure or bug-free', 'Whether its dependencies are trustworthy', 'Whether to ship: your policy decides'] },
      levels: { label: 'SLSA v1.0 BUILD LEVELS', z: 'purple', items: [['L1', 'Provenance exists', ''], ['L2', 'Signed, hosted build', 'attestations'], ['L3', 'Hardened build', '+ reusable workflow']] },
      sources: ref('attestations', 'attestHowTo', 'slsaLevels')
    }),
    S('part-4', 4, 'Roadmap to L5', {
      scene: 'opener',
      subtitle: 'One bottleneck at a time; each phase ends with evidence you can show.',
      cards: [
        { icon: '⚙️', title: 'Phase 1 · L3', blurb: 'Make the everyday path repeatable' },
        { icon: '🧭', title: 'Phase 2 · L4', blurb: 'Automate the routine, route the rest' },
        { icon: '📈', title: 'Phase 3 · L5', blurb: 'Widen autonomy as evidence holds' }
      ],
      terminal: { context: 'Platform and adoption advance together.', detail: 'Each phase reuses what you built in Parts 1–3.' }
    }),
    S('phase-l3', 4, 'Phase 1 makes the everyday path repeatable', {
      scene: 'phase-roadmap',
      subtitle: 'Give every agent PR the same context, the same checks, and the same owners.',
      phase: 1,
      rail: [{ level: 'L3', name: 'Standardized' }, { level: 'L4', name: 'Optimized' }, { level: 'L5', name: 'Autonomous' }],
      columns: [
        { title: 'Platform & tooling', z: 'local', items: [
          ['Audit cross-repo changes; pilot one monorepo', 'Part 1 · Repos'],
          ['Build, test, and lint every PR in CI', 'Part 3 · Staged CI'],
          ['Add CODEOWNERS and a branch ruleset', 'Part 2 · CODEOWNERS'],
          ['Bring PR checks under 10 minutes (proposed)', 'Part 3 · CI pace']
        ] },
        { title: 'Adoption & governance', z: 'purple', items: [
          ['Version repo instructions and AGENTS.md', 'Part 1 · Instructions'],
          ['Write agent tasks as issue contracts', 'Part 2 · Issue contract'],
          ['Turn on Copilot code review for PRs', 'Part 2 · Code review'],
          ['Rate both dimensions; record a baseline', 'Part 1 · Maturity map']
        ] }
      ],
      exit: { label: 'ADVANCE WHEN', items: ['Every agent PR runs the same checks', 'Sensitive paths have named owners', 'A baseline exists to compare'] },
      sources: ref('agentrcConcepts', 'actions', 'codeowners')
    }),
    S('phase-l4', 4, 'Phase 2 automates the routine and routes the exceptions', {
      scene: 'phase-roadmap',
      subtitle: 'Expand what worked at L3; let evidence from real exceptions tune the rules.',
      phase: 2,
      rail: [{ level: 'L3', name: 'Standardized' }, { level: 'L4', name: 'Optimized' }, { level: 'L5', name: 'Autonomous' }],
      columns: [
        { title: 'Platform & tooling', z: 'local', items: [
          ['Run only affected projects in CI', 'Part 3 · Changeset'],
          ['Pin images, npm ci, lockfile cache keys', 'Part 3 · Opinionated CI'],
          ['Quarantine flakes with owner and expiry', 'Part 3 · Flakes'],
          ['Connect only reviewed, scoped tools', null]
        ] },
        { title: 'Adoption & governance', z: 'purple', items: [
          ['Sort manual gates: automate, route, decide', 'Part 2 · Gate sort'],
          ['Tune review instructions from false positives', 'Part 2 · Review'],
          ['Curate shared instructions and prompts', 'Part 1 · Instructions'],
          ['Compare review turnaround to baseline', null]
        ] }
      ],
      exit: { label: 'ADVANCE WHEN', items: ['Routine gates run as automation', 'Exceptions reach named owners', 'Flake rate stays under target'] },
      sources: ref('agentrcConcepts', 'nxAffected', 'codeReview')
    }),
    S('phase-l5', 4, 'Phase 3 widens autonomy where the evidence holds', {
      scene: 'phase-roadmap',
      subtitle: 'Connect issue, agent, CI, merge, and deploy under policy, and keep a human hand on the brake.',
      phase: 3,
      rail: [{ level: 'L3', name: 'Standardized' }, { level: 'L4', name: 'Optimized' }, { level: 'L5', name: 'Autonomous' }],
      columns: [
        { title: 'Platform & tooling', z: 'local', items: [
          ['Gate deploys on attestation verification', 'Part 3 · Provenance'],
          ['Build releases in a shared reusable workflow', 'Part 3 · SLSA L3'],
          ['Require the PR evidence bundle to merge', 'Part 2 · Evidence'],
          ['Keep rollback and human override paths', null]
        ] },
        { title: 'Adoption & measurement', z: 'purple', items: [
          ['Correlate usage with DORA and PR cycle time', null],
          ['Publish the baseline; label estimates', null],
          ['Name champions and content owners', null],
          ['Reassess maturity every quarter', 'Part 1 · Maturity map']
        ] }
      ],
      exit: { label: 'KEEP AUTONOMY WHILE', items: ['DORA measures hold or improve', 'Every deploy has verified provenance', 'People can override and roll back'] },
      sources: ref('agentrcConcepts', 'attestations', 'slsaLevels')
    }),
    S('before-after', 0, 'The system changes when every layer produces evidence', {
      scene: 'value-recap',
      subtitle: 'Each part of the talk turns one implicit habit into evidence you can open and check.',
      rows: [
        { part: 'PART 1', topic: 'Repository boundary', before: 'Each repo needs its own coordinated PR', after: 'Related changes share one reviewable PR', evidence: '1 PR · api + web + shared' },
        { part: 'PART 2', topic: 'Review', before: 'Review inspects every implementation line', after: 'People validate intent, risk, outcome', evidence: 'issue intent + PR evidence' },
        { part: 'PART 3', topic: 'CI', before: 'Slow or flaky CI blurs what green means', after: 'Fast, repeatable checks define green', evidence: 'affected CI · quarantine' },
        { part: 'PARTS 1–2', topic: 'Authority', before: 'Instructions and ownership stay implicit', after: 'Instructions and authority live in git', evidence: 'AGENTS.md · CODEOWNERS' }
      ],
      targets: {
        label: 'TARGETS TO MEASURE AGAINST',
        items: [
          { value: 'L3', detail: 'Platform and adoption', from: 'PART 1 · MATURITY MAP' },
          { value: '4', detail: 'Human checkpoints', from: 'PART 2 · GATE SORT' },
          { value: '<10m', detail: 'PR checks, end to end', from: 'PART 3 · CI CLOCK' }
        ]
      }
    }),    S('today', 0, 'Start with the evidence your repository can produce this week', {
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
      notes: ['"How do I ship more with agents and still trust every change?', '"Take a bounded request: add retry handling while preserving the API. The agent proposes a diff and tests, CI produces check results, and a reviewer decides whether the evidence supports acceptance.', '"This is an example handoff, not a reported run. A failing check or an unexplained diff sends the change back for another attempt.', '"We will assess readiness first, then follow the handoffs where human judgment and machine evidence meet. Expand delegation as the platform and team practice become repeatable.'],
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
      notes: ['"Here is the L3 bar in one view: what the repository provides and what the team practices.', '"Read it as a checklist. Each unchecked item names the next piece of work: unclear setup calls for documentation, manual CI steps call for automation, issues without acceptance criteria call for better task context.', '"The numbers along the bottom are the source talk’s planning targets. Baseline your own before you adopt them."'],
      know: ['Source thresholds include CI flake rate below 2%, PR checks under 10 minutes for affected analysis, Copilot MAU at least 60%, three or more prompt files, and recurring coding-agent issues; local conditions may change what is useful.', 'Other proposed adoption indicators include 30 chat turns per active user per week, 25% completion acceptance, three active modalities, three to five coding-agent issues resolved per sprint, and automatic review coverage. None are claimed as observed in a deployed organization.', 'The detailed L3 checklist also proposes branch protection, CODEOWNERS, AGENTS.md, deterministic coding-agent setup, on-PR security checks, visible coverage/build/flake data, team-specific review guidelines, an agent firewall for hosted coding-agent egress, periodic review of Copilot Memory, and at least one scoped MCP integration.', 'A failed signal is actionable: unclear setup calls for documentation; manual CI steps call for automation; delegated issues without acceptance criteria call for better task context; bypassable rules call for explicit authority controls.'],
      sources: ref('agentrcConcepts', 'actions'),
      seconds: 220
    },
    'volume-breakpoint': {
      notes: ['"This is why the delivery system has to change. When agents write the code, review becomes the bottleneck.', '"Look at the bars: the orange sliver is what one reviewer can read line by line; the full bar is the source talk’s agent-scale assumption. Both numbers are illustrative, and the gap is the point.', '"The answer is to change what review does: automation carries the repeatable checks, and people validate intent, risk, and evidence."', '→ That shift starts with the context we give agents.'],
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
      notes: ['"Start with one number: how often does a single feature touch more than one repository? Count it from your own recent PRs and issues.', '"The source talk proposes 30% as the point where coordination dominates. Treat it as a threshold to test against your history.', '"On the left, the constraints that earn separation: access, lifecycle, transition. On the right, the patterns that earn consolidation.', '"Separation is a legitimate answer. Two slides from now, we rebuild the shared pieces for teams that keep it."'],
      know: ['The original proposed rule is to evaluate consolidation if more than 30% of features touch multiple repos. Audit recent PRs or issues to establish your own denominator.', 'Valid multi-repo reasons in the source include hard access boundaries such as regulated payment systems, truly independent release cycles, audit mandates, and transitional acquisition constraints.', 'A monorepo trades coordination work for build-tooling and boundary-management complexity. CODEOWNERS can express team ownership without making each team a repository.', 'The source contains a “6-hour feature” example that says six hours of agent work, three days elapsed across three repos, then 45 minutes after consolidation. It is an illustrative scenario, not a sourced case study; do not present it as observed evidence.', 'A second source scenario describes a fintech migration from 12 repos, with 3–4 repos touched per change, then claims 3–5 days to 4–6 hours and 3 features/week to 12/day. It supplies no customer, method, or measured dataset; retain it only as an unverified illustrative case.', 'Use this pattern when repeated cross-repository changes create material coordination cost. Avoid it when regulation, access controls, or independent release schedules require separation.', 'Repo-count thresholds are decision aids, not requirements. Pilot the workflow and include migration cost, ownership, release independence, and isolation needs.'],
      sources: ref('nx'),
      seconds: 220
    },
    'monorepo-topology': {
      notes: ['"Here is what one workspace looks like. Applications deploy on their own; libraries carry tags; nx.json holds the graph.', '"The middle panel is the payoff. apps/web may import libs/auth. libs/data importing libs/payments fails lint, with the file, the line, and the rule.', '"That error message is agent-readable evidence: the agent sees the rule and corrects its own proposal before a reviewer ever looks.', '"When access or audit needs real isolation, a separate control plane holds templates, policy, and shared agents."'],
      know: ['Reference structure from the long README: .github/agents, workflows, and policies; apps/ for deployable units; libs/ for shared code; tools/ for generators and scripts; nx.json, package.json, and tsconfig.base.json at the root.', 'Nx named inputs, project tags, path mappings, and lint rules can encode allowed dependencies. A comment such as “do not import this” is weaker than a rule that fails the build.', 'The README proposes a separate enterprise control-plane repository for golden templates, policies, and shared agents when tighter access, independent updates, and auditability are required.', 'Illustrative violation: a data-access module importing a payment-scoped library fails lint and reports the import location. The agent can use that concrete failure to correct its proposal.', 'Enforcement is not self-explanatory: keep rules understandable, test them, and assign an owner for exceptions.'],
      sources: ref('nx', 'actions'),
      seconds: 220
    },
    'polyrepo-strategies': {
      notes: ['"A monorepo is the easier path, and many teams keep separate repositories for good reasons. Here is how a polyrepo team gets most of the same benefit.', '"Context first: a Copilot Space or a multi-root workspace puts the sibling repositories and API docs in front of the agent.', '"Atomic change becomes a parent issue with one sub-issue per repository. The contract merges first; consumers follow.', '"Version the contracts and let Dependabot open the upgrade PRs. Centralize CI with reusable workflows, and require them with rulesets.', '"Be honest about the cost: every row is coordination you now own. When linked PR sets become the usual shape of a feature, rerun the 30% check."', '→ Next: what the PR itself has to carry.'],
      know: ['Copilot cloud agent works in one repository per session: it pushes to a single copilot/ branch in the working repository and is subject to that repository’s branch protections and required checks. Cross-repository features become one agent session per repository.', 'Copilot Spaces accept files, folders, and whole repositories as sources. An attached repository is searched for relevant content rather than loaded whole; attach specific files when you want them in context on every question. Spaces read the main branch.', 'Locally, a VS Code multi-root workspace (File → Add Folder to Workspace) lets agent mode read and edit several repositories in one session; each repository still gets its own branch and PR.', 'Sub-issues give one parent issue per feature with a child issue per repository, so the plan, merge order, and progress live in one place.', 'Publishing shared libraries and API schemas as versioned packages (for example to GitHub Packages) turns an invisible coupling into an explicit dependency; Dependabot version updates then open consumer PRs automatically.', 'Reusable workflows (on: workflow_call) let every repository run the same pipeline from one source. Organization rulesets can require specific workflows to pass before merging across many repositories.', 'Community workaround (unofficial): cloning sibling repositories in copilot-setup-steps.yml gives the cloud agent read access, but branch and PR management across those clones stays manual.', 'The tradeoff: each strategy adds coordination you maintain. Revisit consolidation when most features need a linked PR set.'],
      sources: ref('cloudAgent', 'spaces', 'multiRoot', 'subIssues', 'dependabot', 'reusableWorkflows', 'rulesets'),
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
      notes: ['"Delegation starts with an issue. When you assign an issue to Copilot, the issue body is the brief, so we write it like a contract.', '"Four sections, four jobs. The goal scopes the work. Constraints fence it. Rules become tests. Acceptance criteria become the evidence the reviewer reads on the next slide.', '"Put this shape in an issue template, so every agent task starts complete."', '→ Now: where does the reviewer see whether the contract was met?'],
      know: ['This is an illustrative password-reset issue adapted from the long-form version of this talk, not an observed agent transcript.', 'Copilot cloud agent takes the issue title, body, and comments as its task. A template such as .github/ISSUE_TEMPLATE/agent-task.yml (an issue form) can require Goal, Constraints, Rules, and Acceptance criteria fields.', 'Constraints are what the reviewer checks the diff against: a change to auth middleware in this PR is an immediate question.', 'Rules map one-to-one to tests. If a rule has no test in the PR, the reviewer asks for one or asks @copilot on the PR to add it.', 'A complete task may also name target files, data handling, rollback implications, and who resolves ambiguous acceptance criteria.', 'Repository instructions (copilot-instructions.md, AGENTS.md) hold the standing context; the issue holds only what is specific to this change.'],
      sources: ref('issueTemplates', 'cloudAgentIssue'),
      seconds: 220
    },
    'evidence-bundle': {
      notes: ['"Where does the reviewer inspect all this? On the pull request page itself. No separate tool is needed.', '"Read it in this order. One: open the linked issue and line up the acceptance boxes. Two: open the session log and see the plan, the commands, and the security scans the agent ran.', '"Three: the merge box. Every rule and criterion maps to a required check. Four: read the diff only where risk lives, the constrained and owner-routed paths.', '"A green check tells you a check ran and passed. The decision is still the reviewer’s."'],
      know: ['The PR Copilot cloud agent opens links to its issue, includes a summary of the change, and offers a View session link to the full session log.', 'Per GitHub docs, the agent runs CodeQL, checks new dependencies against the GitHub Advisory Database, and runs secret scanning before finishing; details appear in the session log.', 'By default, workflows on an agent PR wait until a user with write access clicks Approve and run workflows. Teams can allow them to run automatically.', 'To ask for more evidence, mention @copilot in a PR comment (for example, “add a test for the rate limit”); the agent pushes to the same branch.', 'Copilot Chat on github.com can summarize a PR or map checks to acceptance criteria on request. It assists the reviewer; it does not approve.', 'The check names on the slide are an illustrative set; each team chooses its own required checks.'],
      sources: ref('cloudAgentReview', 'cloudAgent', 'codeReview'),
      seconds: 220
    },
    'governance-gates': {
      notes: ['"The long-form version of this talk claimed 22 manual gates became 4 checkpoints, and never showed the list. So here is one: 22 sign-offs a typical PR process collects. Illustrative, but each one will look familiar.', '"Ask three questions of every gate. Is the pass condition objective? Then it is a required check. Sixteen of the 22 land here: tests, scans, audits, deploy and rollback sign-offs.', '"Does it need an expert only when certain paths change? Route it with CODEOWNERS. Four gates collapse into two checkpoints: security risk and architectural fit, requested only when touched.', '"What is left needs judgment on every change: did we build what was asked, and is it ready to ship. Two gates, two checkpoints.', '"Twenty-two gates, four human checkpoints. Now count your own gates, sort them, and count the human decisions left. That before-and-after is your number."'],
      know: ['“The source” in earlier drafts meant the original long-form README this talk was converted from. It asserted 22 manual gates per feature becoming 4 human checkpoints with 90% automated enforcement and 4–7 days to 2–4 hours, but never itemized the gates or supplied measurements.', 'The 22 gates on this slide are an illustrative inventory written for this deck, chosen to match the controls the source described (tests, coverage, security scans, dependency and license audits, performance, accessibility, module boundaries, staging, smoke, and rollback). Present them as a worked example, not as any team’s measured process.', 'In this example 16 of 22 gates (about 73%) become required checks. The source’s 90% figure is unverified; the share depends entirely on your own list.', 'The four checkpoints from that material: intent validation, security risk assessment, architectural fit, and outcome validation. 2 and 3 are routed by path; 1 and 4 apply to every change.', 'Automate lane controls: lint and test workflows, CodeQL and secret scanning, dependency review, a performance budget job, an accessibility scan, Nx module-boundary lint, and deployment jobs with environment checks. Make each one a required status check in a ruleset.', 'Route lane: CODEOWNERS plus the ruleset option “Require review from Code Owners” requests the owning team automatically when its paths change.', 'Some gates resist sorting, such as a change advisory board. Ask what evidence it reviews; often a check can produce that evidence, leaving a smaller human decision.', 'Automation moves the decision earlier; it does not remove accountability. Every automated check still has a named owner for exceptions.'],
      sources: ref('rulesets', 'codeowners', 'actions'),
      seconds: 220
    },
    'context-aware-review': {
      notes: ['"Same pull request, two reviewers. The diff adds two lines that mention an email: one in a test fixture, one in a log call.', '"On the left is the pattern rule. Many teams have one: a CI job that greps for words like email and fails the build. It finds both lines. It cannot tell sample data from a leak, so a person has to triage every hit.', '"On the right is Copilot code review, requested as a reviewer on the same PR. It reads the diff, the surrounding code, and an instructions file that says fixtures hold sample data. It comments once, on the log line, and says why.', '"Two findings with no reasons become one finding with a reason. At this volume, that is review time back.', '"And the owner still decides. Copilot leaves a comment, not an approval: fix, accept with a reason, or escalate."'],
      know: ['The diff, the pii-scan.yml job, and the outputs are illustrative. The grep stands in for the homegrown keyword or regex PII checks many teams run in CI; grep -w email matches both email: and req.body.email.', 'The long-form material cited 847 regex warnings versus 44 agent warnings; it supplied no dataset or method, so the slide does not use those numbers.', 'Copilot code review is requested like a human reviewer: from the Reviewers menu on a PR, or automatically through a ruleset or repository setting. Per GitHub docs it leaves a Comment review by default, which does not count toward required approvals and does not block merging.', 'Copilot code review reads repository custom instructions, including path-specific .github/instructions/*.instructions.md files, so team review rules travel with the code.', 'Copilot code review is not deterministic. Keep deterministic controls (secret scanning, CodeQL) for objective checks, and use contextual review for judgment calls such as PII handling, where pattern rules are noisy. A team can keep the grep as a warning and let Copilot explain it.', 'Agent review can miss issues or be influenced by repository content. Validate the instructions against known examples, and keep human escalation for sensitive findings.'],
      sources: ref('codeReview', 'customInstructions'),
      seconds: 220
    },
    'human-ownership': {
      notes: ['"Agents raise the PR volume. CODEOWNERS is what keeps review from becoming a queue.', '"The file maps paths to teams. When Copilot opens a PR touching three areas, three owners are requested automatically, each for their own files.', '"The ruleset makes it binding: code-owner review is required, stale approvals reset on new pushes, and the person who asked Copilot cannot approve its PR.', '"That is the speed: no triage, experts read only their slice, and owners review in parallel."'],
      know: ['CODEOWNERS lives in .github/, the repository root, or docs/. The last matching pattern wins, so put broad rules first and specific paths later.', 'Ruleset or branch protection option “Require review from Code Owners” makes owner approval mandatory for changed paths. Owners need write access for their review to count.', 'Per GitHub docs, the user who asked Copilot cloud agent to create a PR cannot approve it, and a PR not attributed to a person needs one extra approval when approvals are required.', 'Protect the CODEOWNERS file itself with an owner, so routing changes get reviewed.', 'Recovery: a failed check blocks the merge; the owner investigates, asks @copilot or the author to update the change, or escalates high-risk uncertainty to security, architecture, or the service owner.', 'Team handles keep routing durable as people change roles; pair them with team review-assignment settings to spread load.'],
      sources: ref('codeowners', 'rulesets', 'cloudAgent'),
      seconds: 220
    },
    'part-3': {
      notes: ['"Every proposal an agent makes becomes evidence only when CI runs it. So CI sets both the pace and the trust level of the whole loop."', '"This section covers three properties of that evidence: it arrives fast, it means what it says, and you can prove where it came from."'],
      know: ['Budgets and timings in this section are illustrative or proposed targets. Measure your own pipeline before you plan around them.'],
      sources: ref('actions'),
      seconds: 20
    },
    'trust-pipeline': {
      notes: ['"Sort checks by who is waiting for the answer."', '"The agent waits on every push, so stage one stays small: build, affected tests, lint, and the high-severity scan. A failure goes straight back to the agent as a log it can act on."', '"The reviewer waits before merge, so stage two carries the full suite and deeper analysis. The release owner waits before production, so stage three runs against a real environment."', '"A budget moves a check to a different stage. Every necessary check still runs."'],
      know: ['Stage 1 proposed budget: 10 minutes. Build, affected tests, lint and format, high-severity security; block the PR and return concise output the agent can act on.', 'Stage 2 proposed budget: 30 minutes. Complete tests, deeper security, performance, architecture, dependency, and compliance validation; block merge and route detailed findings to the owner.', 'Stage 3 proposed budget: 60 minutes. Staging, smoke tests, migration checks, rollback test, and load testing when risk warrants; block production and alert the on-call owner.', 'Meet a budget with parallelism, incremental builds, affected analysis, and caching, and keep a risk-based escalation route for high-risk failures.', 'Suggested weekly measures from the source: PR and full-pipeline time, flake rate, cache-hit rate, false-positive rate, and throughput.'],
      sources: ref('actions'),
      seconds: 220
    },
    'ci-feedback': {
      notes: ['"Here is the same work at two CI speeds: four fix-and-push rounds, five minutes of agent work each. These numbers are illustrative; plug in your own."', '"With 60-minute CI the work takes 260 minutes. With 8-minute CI it takes 52. The agent did not get one second faster."', '"And everyone downstream waits on the same clock. The agent cannot start round two, the reviewer waits for green, and the merge waits for required checks. CI is the real work-stopper."'],
      know: ['Arithmetic: 4 × (5 + 60) = 260 minutes; 4 × (5 + 8) = 52 minutes. The 5-minute agent round is an illustrative assumption.', 'The source README estimates 80% idle time at 60-minute CI and 95% productive time at 8-minute CI, and projects 3 versus 15 features a day. It supplies no benchmark, so the deck shows the timeline instead of those estimates.', 'Measure queue time, execution time, retries, and repair time separately. A slow queue and a slow suite need different fixes.'],
      sources: ref('actions'),
      seconds: 220
    },
    'affected-analysis': {
      notes: ['"The fastest way to shorten CI is to stop building what the change cannot affect."', '"libs/auth changed. The graph says web and api depend on auth, so those three projects lint, test, and build. The other six skip."', '"Look at utils: auth depends on utils, yet a change to auth cannot break utils, so utils skips too. Affected flows up to dependents."', '"The graph is the safety case. A missing edge silently skips a test, so treat the project graph like code and review changes to it."'],
      know: ['nx affected uses Git to find changed files between base and head, maps them to projects and task inputs, and runs tasks for those projects and everything that depends on them. Recent Nx versions select at the task level, so a spec-only change can skip the build.', 'On GitHub Actions, check out with fetch-depth: 0 (or use nrwl/nx-set-shas) so the base commit exists for comparison.', 'Turborepo, Bazel, and Pants offer the same idea. Pair affected runs with a remote or Actions cache to reuse unaffected outputs, and schedule a periodic full run to catch graph drift.', 'The source README compares an 80-minute full run with an 8-minute affected run; those timings are illustrative.'],
      sources: ref('nxAffected', 'caching'),
      seconds: 220
    },
    'flake-policy': {
      notes: ['"A flake is a test that passes and fails on the same code. Run it three times without changing a line and you get different answers."', '"The cause lives in the test or its environment: timing, shared state, the network, the clock, or randomness. Each one has a standard fix."', '"Flakes cost more with agents. An agent reads red as a bug and edits working code to chase it. People learn to re-run red builds, and one day the re-run hides a real failure."', '"So every flake gets the same four steps: triage, contain, repair, measure."'],
      know: ['Diagnosis patterns: race condition → condition-based waits; external service → mock or controlled dependency; time dependence → fake clock; order dependence → isolated data; environment dependence → hermetic inputs.', 'Source target: flake rate below 2%, measured weekly; proposed response: quarantine on first flake and fix or remove within two days. Zero known flakes on the critical path is an operating aspiration.', 'The source calculates one 5%-flaky test across 20 PRs as one expected spurious failure a day, and ten such tests as ten. These are simplified expectations assuming independent trials.', 'Quarantine with an owner, a reason, an expiry, and a follow-up issue. A silently disabled test removes coverage without anyone deciding to.', 'A long-README scenario describes a suite moving from 18% to 1.2% flakiness; no evaluation method is supplied, so treat it as an unverified illustration.'],
      sources: ref('actions'),
      seconds: 220
    },
    'hermetic-cache': {
      notes: ['"Resolve-at-runtime CI decides everything on every run: install the toolchain, resolve dependency versions, then build. Opinionated CI makes those decisions once, in the repository."', '"Each opinion removes a step. A pinned image replaces setup, npm ci replaces resolution, and a lockfile-keyed cache turns repeat downloads into a cache hit."', '"The opinions are what make the cache work: pinned inputs keep the key stable, and stable keys hit."', '"Bonus: the same inputs give the same result, so red points at the change, and an agent can act on it."'],
      know: ['Bar lengths on this slide are conceptual; they show which steps disappear, not measured minutes.', 'npm ci installs exactly what package-lock.json specifies and fails when package.json and the lockfile disagree; npm install can rewrite the lockfile.', 'actions/setup-node can cache npm downloads keyed on the lockfile; actions/cache keys such as hashFiles over package-lock.json invalidate when the lockfile changes.', 'Pin container images by digest (image@sha256:...) so a tag update cannot change the toolchain under a commit. Update pins on purpose, for example with Dependabot.', 'The source cites a 23-minute first build and a 3-minute cached build; illustrative only.'],
      sources: ref('caching', 'npmCi', 'actions'),
      seconds: 220
    },
    attestations: {
      notes: ['"Provenance answers one question: where did this artifact come from?"', '"Walk the chain. A commit in the repo, built by a named workflow, produces bytes with a digest. actions/attest signs a provenance record for that digest with Sigstore, and GitHub stores it."', '"The deploy step runs gh attestation verify. If the digest, repository, or workflow does not match, verification fails and the deploy stops."', '"Know the boundary. Provenance proves origin and integrity. Whether the code is secure, and whether to ship it, stays with your policy and your reviewers."', '"In SLSA terms, attestations alone reach Build Level 2. Build in a shared reusable workflow to reach Level 3."'],
      know: ['GitHub artifact attestations are signed claims of build provenance: a link to the workflow, the repository, organization, environment, commit SHA, triggering event, and OIDC token details. An optional SBOM attestation can be added.', 'The workflow needs id-token: write, contents: read, and attestations: write (plus packages: write for container images). Use actions/attest with subject-path for files, or subject-name and subject-digest with push-to-registry for images.', 'Public repositories sign with the Sigstore Public Good Instance and record entries in its public transparency log; private repositories use GitHub’s Sigstore instance without a transparency log.', 'GitHub states that artifact attestations alone provide SLSA v1.0 Build Level 2; building in a reusable workflow shared across the organization adds the isolation needed for Build Level 3.', 'Attestations add value only when something verifies them. Attest releases and deployable binaries; skip frequent test builds.', 'Example names (octo/shop, release.yml, the digest) are illustrative. Compliance frameworks have their own requirements; one attestation does not establish SOC 2, ISO 27001, or FedRAMP conformance.'],
      sources: ref('attestations', 'attestHowTo', 'slsaLevels'),
      seconds: 220
    },    'part-4': {
      notes: ['"The roadmap is three phases, and each one reuses what we built in the first three parts."', '"Move one bottleneck at a time, and advance when the evidence says the current phase is holding."'],
      know: ['The three-phase roadmap carries the source thesis that platform readiness and developer adoption need to advance together.'],
      sources: ref('agentrcConcepts'),
      seconds: 20
    },
    'phase-l3': {
      notes: ['"Phase 1 is the floor: every agent PR gets the same context, the same checks, and the same owners."', '"Each item has a tag that points back to where we covered it. Nothing here is new; this is the order to do it in."', '"Advance when every agent PR runs the same checks, sensitive paths have named owners, and you have a baseline to compare against."'],
      know: ['Platform checklist from the source: audit cross-repo change frequency; evaluate monorepo only when the pattern and constraints support it; enforce module boundaries; enable affected analysis; reduce flakes and PR-check time.', 'Adoption checklist: version repository instructions, create prompts for repeatable workflows, establish model guidance, and use structured issues.', 'Agentic checklist: test a low-risk cloud-agent workflow; deterministic setup; AGENTS.md; acceptance/file/constraint-rich issue templates; configure the hosted agent firewall.', 'Quality checklist: automatic review, team-specific coding guidelines, branch rules requiring checks and owner approvals, and security scanning. The source also proposes five custom review guidelines and three to five cloud-agent issues per sprint; select controls appropriate to the repository.', 'The 10-minute PR-check budget is a proposed target. Measure the current pipeline first.'],
      sources: ref('agentrcConcepts', 'actions', 'codeowners'),
      seconds: 220
    },
    'phase-l4': {
      notes: ['"Phase 2 expands the workflows that showed value at L3."', '"On the platform side, CI gets fast and quiet: affected builds, opinionated inputs, and quarantined flakes. On the governance side, we sort the manual gates and tune review from real false positives."', '"Advance when the routine gates run as automation and every exception reaches a named owner."'],
      know: ['Source checklist: intent templates; automate repeated checks; evidence-bundle requirements; tune code review guidelines and measure false positives; compare review turnaround with the pre-change baseline.', 'Advanced capabilities in the source include scoped enterprise MCP connections, cloud-agent merge-rate measures, regular instruction curation, and one complex multi-step workflow.', 'Enterprise checks include deliberate model and content settings, seat use, budget awareness, repository templates, and documented content-exclusion rationale.', 'Quality goals in the source: flake rate below 2% and cache hit rate above 80%. Treat them as targets to validate in your repository.'],
      sources: ref('agentrcConcepts', 'nxAffected', 'codeReview'),
      seconds: 220
    },
    'phase-l5': {
      notes: ['"Phase 3 connects issue, agent, CI, merge, and deploy under explicit policy."', '"Provenance gates the deploy, the evidence bundle gates the merge, and people keep rollback and override."', '"Autonomy here is conditional. Keep it while DORA measures hold, every deploy has verified provenance, and people can still step in."'],
      know: ['Source checklist: measure feature throughput and bottlenecks; adopt intent-based PRs, evidence bundles, and policy gates; generate provenance; scale runners and caching as observed load requires.', 'Organization practices: assign owners and a curation cadence to shared context; report adoption trends, cost, and risk; correlate Copilot usage with PR cycle time and deployment frequency, and avoid claiming causation from usage alone.', 'The long README proposes quarterly assessment, two champions per team, and a self-sufficiency score of at least 4/5. These are proposed program targets.', 'The source projects 10–15 features a day from 2–3 a week. The architecture does not guarantee that figure, so the talk leaves it out as an outcome.'],
      sources: ref('agentrcConcepts', 'attestations', 'slsaLevels'),
      seconds: 220
    },    'before-after': {
      notes: ['"Here is the whole talk on one slide. Each row is a habit that used to live in people’s heads and now produces evidence."', '"Read each row left to right: the part that taught it, the old habit, the new behavior, and the artifact you can open to check it."', '"The three numbers along the bottom are targets to measure against. Your first-week baseline tells you how far away each one is."'],
      know: ['This is a design comparison of the target operating model. The three figures are proposed targets from the source; the slide reports no measured results from a real organization.', 'The source’s 96× faster-to-production claim compares an illustrative three-day path with 45 minutes; the 5× features-per-day claim compares an illustrative 60-minute and 8-minute CI scenario. Both are omitted as outcomes because the underlying data is not provided.', 'Keep the state after implementation observable: repo coordination rate, PR cycle time, CI duration/queue, flake rate, rollback frequency, incident severity, and reviewer workload.'],
      sources: ref('agentrcConcepts', 'actions', 'nx'),
      seconds: 50
    },    today: {
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

  const PILLS = {
    contents: 'Route · Four parts',
    'instruction-hierarchy': 'Maturity Model · Instructions',
    'repo-decision': 'Maturity Model · Repository boundaries',
    'monorepo-topology': 'Maturity Model · Topology',
    'polyrepo-strategies': 'Maturity Model · Polyrepo strategies',
    'review-maturity': 'PR Workflows · Review modes',
    'intent-contract': 'PR Workflows · Intent',
    'evidence-bundle': 'PR Workflows · Evidence',
    'governance-gates': 'PR Workflows · Human checkpoints',
    'context-aware-review': 'PR Workflows · Contextual review',
    'human-ownership': 'PR Workflows · Authority',
    'trust-pipeline': 'Trust Manufacturing · Staged CI',
    'ci-feedback': 'Trust Manufacturing · CI sets the pace',
    'affected-analysis': 'Trust Manufacturing · Build the changeset',
    'flake-policy': 'Trust Manufacturing · Flakes',
    'hermetic-cache': 'Trust Manufacturing · Opinionated CI',
    attestations: 'Trust Manufacturing · Provenance',
    'phase-l3': 'Roadmap · Phase 1',
    'phase-l4': 'Roadmap · Phase 2',
    'phase-l5': 'Roadmap · Phase 3',
    'before-after': 'The Value Recap',
    today: 'Transfer · Today, this week, this month',
    references: 'Sources'
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id], PILLS[s.id] && !s.pill ? { pill: PILLS[s.id] } : {}));
  window.DECK = {
    meta: {
      slug: 'agentic-sdlc',
      title: 'Agentic SDLC: Infrastructure for AI Velocity',
      short: 'Designing the SDLC Your Agents Deserve',
      category: 'Tech Talk',
      source: 'tech-talks/agentic-sdlc/README.md',
      question: 'How do I ship more with agents and still trust every change?',
      thesis: 'L3 is the launchpad: reliable context, repeatable checks, and habitual use create the conditions for outcome-focused governance and measured autonomy.'
    },
    slides
  };
})();
