/*
  Copilot Plugins & APM — native teaching source.
  CLI transcripts and package/lock examples are illustrative, not observed output.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const slides = [
    S('title', 0, 'Copilot Plugins & APM', {
      chrome: false, visual: 'config-ring',
      subtitle: 'Composable AI Extensions',
      tagline: 'Explore a capability, then package the configuration your team can review.',
      meta: 'CopilotTraining · Practitioner Tech Talk'
    }),
    S('core-question', 0, 'How do I extend Copilot with custom capabilities and share them across teams and repositories?', {
      pill: 'Core Question',
      subtitle: 'A practitioner team needs project context without losing review or control.',
      highlight: 'Try locally; commit the team contract when the capability earns a place.',
      routing: ['context', 'scope', 'evidence', 'owner'], routingLabel: 'Decide by',
      roles: [
        { icon: '⌘', title: 'Developer', description: 'Explore one extension against a real task.' },
        { icon: '▦', title: 'Platform team', description: 'Package a repeatable repository setup.' },
        { icon: '✓', title: 'Service owner', description: 'Review changes and approve adoption.' }
      ],
      stats: [
        { title: 'One manifest', description: 'Project configuration lives beside code.' },
        { title: 'One lockfile', description: 'Resolved versions become reviewable.' },
        { title: 'Human approval', description: 'Maintainers decide what enters the repo.' }
      ]
    }),
    S('contents', 0, 'Four moves: frame, explore, package, transfer', {
      sections: [
        { icon: '◇', title: 'The Opportunity', subtitle: 'Why package it?', blurb: 'Separate personal trials from team infrastructure.', slide: 4 },
        { icon: '⌕', title: 'CLI-First Plugin Management', subtitle: 'What earns a trial?', blurb: 'Find, inspect, and evaluate a candidate extension.', slide: 9 },
        { icon: '▤', title: 'Building an APM Manifest', subtitle: 'What travels?', blurb: 'Connect manifest intent, lockfile, and governance.', slide: 15 },
        { icon: '→', title: 'What You Can Do Today', subtitle: 'What is your next move?', blurb: 'Choose a bounded test and the evidence to keep it.', slide: 26 }
      ]
    }),
    S('part-1', 1, 'The Opportunity', {
      scene: 'opener',
      subtitle: 'A useful extension moves from a personal trial to a reviewed project contract only when the task benefits.',
      cards: [
        { icon: '⌕', title: 'Explore', blurb: 'Find a capability for one task' },
        { icon: '✓', title: 'Evaluate', blurb: 'Inspect the result and permissions' },
        { icon: '▤', title: 'Package', blurb: 'Record team intent and resolution' }
      ],
      terminal: { context: 'The decision is about scope:', detail: 'personal trial → reviewed project setup' }
    }),
    S('repo-config', 1, 'A repository manifest turns a one-off setup into a shared starting point', {
      scene: 'showdown', leftLabel: 'Per-developer setup', rightLabel: 'Repository configuration',
      pairs: [
        { left: { label: 'Setup notes', note: 'Instructions live outside the repo' }, right: { label: 'apm.yml', note: 'Intent is versioned beside code', z: 'purple' } },
        { left: { label: 'Repeat by hand', note: 'Each contributor configures again' }, right: { label: 'apm install', note: 'Contributor applies the repo setup', z: 'green' } },
        { left: { label: 'Versions drift', note: 'Local state is hard to compare' }, right: { label: 'apm-lock.yml', note: 'Resolved state can be reviewed', z: 'green' } }
      ],
      outcomeLeft: { icon: '↻', label: 'Setup varies by machine' },
      outcomeRight: { icon: '✓', label: 'Shared, reviewable configuration' },
      footnote: 'Reproducible configuration does not guarantee identical agent responses or remove local prerequisites.'
    }),
    S('scopes', 1, 'Use the plugin CLI to explore; use APM to describe project setup', {
      scene: 'showdown', leftLabel: 'copilot plugin', rightLabel: 'APM',
      pairs: [
        { left: { label: 'One extension', note: 'Install, inspect, update, remove' }, right: { label: 'A project set', note: 'Plugins and supported config inputs', z: 'purple' } },
        { left: { label: 'Personal trial', note: 'No shared repo change by itself' }, right: { label: 'Repository contract', note: 'Manifest and lockfile reviewed in Git', z: 'green' } },
        { left: { label: 'Decision: useful?', note: 'Does this help the task?' }, right: { label: 'Decision: adopt?', note: 'Does the team accept the dependency?', z: 'orange' } }
      ],
      outcomeLeft: { icon: '⌕', label: 'Learn with bounded scope' },
      outcomeRight: { icon: '✓', label: 'Share after review' }
    }),
    S('architecture', 1, 'APM connects repository intent to resolved configuration', {
      scene: 'stack',
      subtitle: 'The maintainer commits the manifest and lockfile; the contributor runs the install.',
      nodes: [
        { title: 'apm.yml', detail: 'Requested plugins and paths', z: 'purple' },
        { title: 'APM resolves', detail: 'Reads supported sources and versions', z: 'local' },
        { title: 'apm-lock.yml', detail: 'Records resolved dependency details', z: 'green' },
        { title: 'Contributor', detail: 'Runs apm install in the repository', z: 'orange' }
      ],
      footnote: 'Illustrative flow from the source talk; check current APM docs for exact schema and behavior.'
    }),
    S('evaluate', 1, 'A listing is a candidate, not an adoption decision', {
      scene: 'scorecard',
      cards: [
        { icon: '⌕', title: 'Purpose', description: 'Does the extension address a real repository task?' },
        { icon: '◉', title: 'Source', description: 'Who publishes it, and where does its code live?' },
        { icon: '⚙', title: 'Scope', description: 'What files, tools, services, or data can it reach?' },
        { icon: '✓', title: 'Evidence', description: 'Can the maintainer check behavior in a safe test?' }
      ],
      footnote: 'A marketplace or community listing is discovery evidence, not a security certification.'
    }),
    S('part-2', 2, 'CLI-First Plugin Management', {
      scene: 'opener',
      subtitle: 'Search, inspect, try only within an approved boundary, and keep the result observable.',
      cards: [
        { icon: '⌕', title: 'Discover', blurb: 'Use catalogs as leads' },
        { icon: '◉', title: 'Inspect', blurb: 'Check source and scope' },
        { icon: '✓', title: 'Evaluate', blurb: 'Verify the task outcome' }
      ],
      terminal: { context: 'A command is an input, not evidence:', detail: 'candidate → inspect → decide' }
    }),
    S('marketplace', 2, 'The marketplace command narrows discovery to a task', {
      scene: 'terminal',
      termTitle: 'ILLUSTRATIVE COMMAND SHAPE · NOT EXECUTED',
      transcript: [
        { type: 'prompt', text: 'apm marketplace browse --search testing' },
        { type: 'response', lines: ['Current catalog results depend on the source and date.', 'Inspect candidate name, maintainer, compatibility, and source.'] },
        { type: 'divider' },
        { type: 'prompt', text: 'copilot plugin list' },
        { type: 'response', lines: ['Use the current CLI output to check installed plugins and scope.', 'No marketplace query or plugin install was run for this deck.'] }
      ],
      footnote: 'CLI names and flags come from the source README; recheck current documentation before use.'
    }),
    S('discovery', 2, 'Use three discovery paths for different evidence', {
      scene: 'scorecard',
      cards: [
        { icon: '⌕', title: 'APM marketplace', description: 'Browse candidate extensions and categories from the CLI.' },
        { icon: '☆', title: 'Awesome Copilot', description: 'Community-curated plugins, skills, MCP servers, and workflows.' },
        { icon: '⌂', title: 'github/copilot-plugins', description: 'First-party source, plugin schema material, and contribution context.' },
        { icon: '↗', title: 'Then inspect', description: 'Follow the candidate to its code, docs, compatibility, and permissions.' }
      ],
      sources: []
    }),
    S('install-preview', 2, 'A safe trial ends with an inspected result, not an assumed success', {
      scene: 'terminal',
      termTitle: 'ILLUSTRATIVE WALKTHROUGH · NO INSTALL OR TRUST CHANGE',
      transcript: [
        { type: 'prompt', text: 'copilot plugin install PLUGIN_FROM_APPROVED_SOURCE' },
        { type: 'response', lines: ['Example command only — no package was selected or installed.', 'Use an isolated, approved environment for a real trial.'] },
        { type: 'divider' },
        { type: 'prompt', text: 'copilot plugin list' },
        { type: 'response', lines: ['Inspect the actual local result and its scope.', 'Then test one task and compare its output with acceptance evidence.'] }
      ],
      footnote: 'The slide demonstrates a decision sequence; it is not a recorded successful install.'
    }),
    S('plugin-lifecycle', 2, 'The plugin lifecycle has distinct commands and decisions', {
      scene: 'signals',
      rows: [
        { label: 'Marketplace browse', description: 'Find candidates; inspect their source', tag: 'Discover', z: 'local' },
        { label: 'Plugin install', description: 'Try one approved plugin in bounded scope', tag: 'Trial', z: 'purple' },
        { label: 'Plugin list', description: 'Check installed state and scope', tag: 'Verify', z: 'green' },
        { label: 'update / uninstall', description: 'Review a version change or remove the trial', tag: 'Decide', z: 'orange' }
      ],
      footnote: 'Command availability and exact options may vary; check current CLI documentation.'
    }),
    S('acceptance', 2, 'Accept a trial only when task evidence and ownership are clear', {
      scene: 'scorecard',
      cards: [
        { icon: '◎', title: 'Input', description: 'Name the task, repository context, and constraints.' },
        { icon: '▣', title: 'Output', description: 'Inspect the artifact or decision the extension produced.' },
        { icon: '⌕', title: 'Check', description: 'Run the relevant tests or compare against a known contract.' },
        { icon: '♙', title: 'Authority', description: 'A service owner accepts, rejects, or escalates the result.' }
      ],
      footnote: 'A successful command or test status is separate from the domain result the owner reviews.'
    }),
    S('part-3', 3, 'Building an APM Manifest', {
      scene: 'opener',
      subtitle: 'The manifest records intent; the lockfile records resolution; review preserves human authority.',
      cards: [
        { icon: '▤', title: 'Manifest', blurb: 'Declare the project inputs' },
        { icon: '▣', title: 'Lockfile', blurb: 'Inspect exact resolution details' },
        { icon: '♙', title: 'Review', blurb: 'Approve changes and boundaries' }
      ],
      terminal: { context: 'The artifact pair is:', detail: 'apm.yml + apm-lock.yml' }
    }),
    S('minimal-manifest', 3, 'A minimal manifest expresses package intent', {
      scene: 'artifact',
      subtitle: 'Start with the candidate set the team has already chosen.',
      panels: [
        { title: 'apm.yml · illustrative', z: 'purple', lines: ['version: 1', '', 'plugins:', '  - name: code-review-assistant', '    version: ^1.0.0', '  - name: test-generator', '    version: ^2.1.0'] },
        { title: 'What this says', z: 'local', lines: ['Two named plugin dependencies', 'Version ranges express intent', 'APM resolves supported inputs', 'The lockfile records resolution'] }
      ],
      footnote: 'Names and ranges are examples from the source material, not a recommendation or verified catalog listing.'
    }),
    S('full-manifest', 3, 'The source example combines plugins, instructions, skills, and MCP', {
      scene: 'artifact',
      subtitle: 'Each path and dependency becomes part of the project configuration review.',
      panels: [
        { title: 'apm.yml · illustrative', z: 'purple', lines: ['version: 1', 'plugins:', '  - name: code-review-assistant', '    version: ^1.0.0', 'instructions:', '  - path: .github/copilot-instructions.md', 'skills:', '  - path: .github/skills/testing/SKILL.md'] },
        { title: 'Integration input', z: 'local', lines: ['mcpServers:', '  - name: github-mcp', '    source: npm:@modelcontextprotocol/', '      server-github', '    version: ^1.2.0', 'Review network access and credentials.'] }
      ],
      footnote: 'Schema and source syntax are examples transcribed from the source talk; verify against current APM docs.'
    }),
    S('repo-hydration', 3, 'A contributor applies the committed configuration from the repository root', {
      scene: 'flow',
      nodes: [
        { title: 'Maintainer', detail: 'Reviews apm.yml and apm-lock.yml', z: 'orange' },
        { title: 'Repository', detail: 'Carries the approved configuration', z: 'purple' },
        { title: 'Contributor', detail: 'Clones, then runs apm install', z: 'local' },
        { title: 'Check', detail: 'Inspects installed state and task evidence', z: 'green' }
      ],
      footnote: 'Authentication, client support, network access, and local prerequisites remain separate conditions.'
    }),
    S('lockfile-resolution', 3, 'A version range expresses intent; the lockfile records the resolved version', {
      scene: 'showdown', leftLabel: 'Manifest request', rightLabel: 'Resolved record',
      pairs: [
        { left: { label: '^1.0.0', note: 'A compatible-version range' }, right: { label: '1.2.3', note: 'Exact version in example lockfile', z: 'green' } },
        { left: { label: 'apm.yml', note: 'What the project requests' }, right: { label: 'apm-lock.yml', note: 'What the example resolved', z: 'purple' } },
        { left: { label: 'Review before adoption', note: 'Is this dependency appropriate?' }, right: { label: 'Review before update', note: 'What changed in resolution?', z: 'orange' } }
      ],
      outcomeLeft: { icon: '≋', label: 'Intent' },
      outcomeRight: { icon: '▣', label: 'Resolution' },
      footnote: 'Example versions are illustrative, not observed registry results or a claim about today’s latest version.'
    }),
    S('lockfile-fields', 3, 'A lockfile example exposes version, resolution, and integrity fields', {
      scene: 'artifact',
      subtitle: 'Those fields create reviewable evidence about the package selected.',
      panels: [
        { title: 'apm-lock.yml · illustrative', z: 'green', lines: ['version: 1', 'lockfileVersion: 1', 'plugins:', '  code-review-assistant:', '    version: 1.2.3', '    resolved: <registry URL>', '    integrity: sha512-…'] },
        { title: 'Review these fields', z: 'orange', lines: ['Exact version', 'Resolved source', 'Integrity value', 'Manifest / lockfile alignment', 'Do not treat placeholders as evidence.'] }
      ],
      footnote: 'The URL and integrity values shown are placeholders; the source README uses an abbreviated example hash.'
    }),
    S('lockfile-review', 3, 'An update becomes a deliberate dependency review', {
      scene: 'flow',
      nodes: [
        { title: 'Change', detail: 'Maintainer runs the documented update flow', z: 'local' },
        { title: 'Diff', detail: 'Review manifest and lockfile together', z: 'purple' },
        { title: 'Validate', detail: 'Run project checks and inspect source', z: 'green' },
        { title: 'Approve', detail: 'Repository owner decides whether to merge', z: 'orange' }
      ],
      footnote: 'The source material names apm update; verify the current command and its resulting diff.'
    }),
    S('drift-recovery', 3, 'A frozen-lockfile check can signal manifest and lock disagreement', {
      scene: 'signals',
      rows: [
        { label: 'Check fails', description: 'Stop the configuration change from advancing', tag: 'Pause', z: 'orange' },
        { label: 'Compare files', description: 'Inspect manifest, lockfile, and source diff', tag: 'Locate', z: 'local' },
        { label: 'Resolve intent', description: 'Update the right file with owner approval', tag: 'Correct', z: 'purple' },
        { label: 'Rerun validation', description: 'Confirm the declared pair is consistent', tag: 'Verify', z: 'green' }
      ],
      footnote: 'Failure text and exact validation semantics are tool-version dependent; consult current APM documentation.'
    }),
    S('ci-gate', 3, 'CI can check lockfile consistency before a pull request advances', {
      scene: 'artifact',
      subtitle: 'The team owner defines the runner, package source, credentials, and approval policy.',
      panels: [
        { title: 'Workflow shape · illustrative', z: 'purple', lines: ['on: [pull_request]', 'jobs:', '  validate:', '    steps:', '      - checkout source', '      - install approved APM CLI', '      - run frozen-lockfile check'] },
        { title: 'Owner checks', z: 'orange', lines: ['Pin or govern action/tool versions', 'Limit credentials and network scope', 'Fail closed on unexpected drift', 'Review dependency changes in the PR', 'CI result is not plugin behavior proof.'] }
      ],
      footnote: 'Illustrative workflow only; no global installation or CI workflow was executed or added.'
    }),
    S('managed-settings', 3, 'Managed settings govern an enterprise baseline; APM packages project config', {
      scene: 'showdown', leftLabel: 'APM · repository', rightLabel: 'Managed settings · enterprise',
      pairs: [
        { left: { label: 'apm.yml', note: 'Project-scoped configuration', }, right: { label: 'enabledPlugins', note: 'Enterprise plugin baseline key', z: 'purple' } },
        { left: { label: 'apm-lock.yml', note: 'Project dependency resolution' }, right: { label: 'extraKnownMarketplaces', note: 'Enterprise marketplace key', z: 'green' } },
        { left: { label: 'Project maintainers', note: 'Review repository changes' }, right: { label: 'Enterprise owner', note: 'Sets managed policy boundary', z: 'orange' } }
      ],
      outcomeLeft: { icon: '▤', label: 'Package project config' },
      outcomeRight: { icon: '⌂', label: 'Govern organization settings' },
      footnote: 'These are distinct mechanisms; managed settings are not APM merge or inheritance.'
    }),
    S('managed-boundary', 3, 'Team additions remain inside enterprise decisions and documented client scope', {
      scene: 'signals',
      rows: [
        { label: 'Enterprise baseline', description: 'Managed policy establishes non-overridable decisions', tag: 'Floor', z: 'purple' },
        { label: 'Team files', description: 'copilot/teams/ entries map through team-mappings.json', tag: 'Additions', z: 'local' },
        { label: 'Multiple teams', description: 'Team values combine by least-restrictive behavior', tag: 'Merge', z: 'green' },
        { label: 'Eligibility', description: 'Source lists VS Code, CLI, App, cloud agent; Business / Enterprise', tag: 'Check scope', z: 'orange' }
      ],
      footnote: 'Managed-settings scope was verified against the linked 2026-08-03 changelog on 2026-08-10; recheck before applying.'
    }),
    S('part-4', 4, 'What You Can Do Today', {
      scene: 'opener',
      subtitle: 'Choose the smallest step that tells your repository owner whether the pattern fits.',
      cards: [
        { icon: '⌕', title: 'Try', blurb: 'One candidate, one task' },
        { icon: '▤', title: 'Record', blurb: 'A manifest and lockfile diff' },
        { icon: '✓', title: 'Decide', blurb: 'A named owner accepts or stops' }
      ],
      terminal: { context: 'Transfer starts with:', detail: 'your repository + its review boundary' }
    }),
    S('choice-ladder', 4, 'Move from discovery to shared configuration only when evidence earns it', {
      scene: 'four-phases', stageLabel: 'Step', gateLabel: '✓ evidence',
      stages: [
        { label: '1', name: 'Discover', icon: '⌕', description: 'Find a candidate for a real task.' },
        { label: '2', name: 'Trial', icon: '⚙', description: 'Test in an approved, bounded environment.' },
        { label: '3', name: 'Package', icon: '▤', description: 'Commit manifest and reviewed lockfile.' },
        { label: '4', name: 'Maintain', icon: '✓', description: 'Validate updates and preserve ownership.', target: true }
      ],
      footnote: 'This is a decision sequence, not a maturity score or a required rollout plan.'
    }),
    S('exploratory-check', 4, 'A small first trial produces a decision, not a deployment claim', {
      scene: 'scorecard',
      cards: [
        { icon: '⌕', title: 'Pick', description: 'Select one candidate and one representative task.' },
        { icon: '◉', title: 'Bound', description: 'Use an approved test environment and access scope.' },
        { icon: '▣', title: 'Inspect', description: 'Check output, files changed, and external calls.' },
        { icon: '♙', title: 'Decide', description: 'Owner keeps, rejects, or asks for another trial.' }
      ],
      footnote: 'The README’s 15-minute label is a planning estimate, not a tested completion time.'
    }),
    S('first-repo', 4, 'A first repository pilot records a contract the next contributor can inspect', {
      scene: 'flow',
      nodes: [
        { title: 'Choose repo', detail: 'Name a maintainer and one task', z: 'orange' },
        { title: 'Declare', detail: 'Add candidate inputs to apm.yml', z: 'purple' },
        { title: 'Resolve', detail: 'Run approved APM workflow; inspect lockfile', z: 'local' },
        { title: 'Share', detail: 'Review the diff and validate a fresh clone', z: 'green' }
      ],
      footnote: 'Source README frames this as a one-hour exercise; actual time depends on team setup and tool availability.'
    }),
    S('review-contract', 4, 'A maintainer can review the dependency as a repository change', {
      scene: 'scorecard',
      cards: [
        { icon: '▤', title: 'Intent', description: 'Why does this task need this plugin or input?' },
        { icon: '⌕', title: 'Provenance', description: 'Which source, publisher, and version are selected?' },
        { icon: '⚙', title: 'Reach', description: 'What tools, files, network, and credentials are available?' },
        { icon: '✓', title: 'Evidence', description: 'What check and acceptance owner decide the outcome?' }
      ],
      footnote: 'Treat configuration and plugin behavior as separate review questions.'
    }),
    S('where-pattern-stops', 4, 'Pause when the configuration cannot meet local policy or verification needs', {
      scene: 'signals',
      rows: [
        { label: 'Source unclear', description: 'Publisher, code, or permissions remain unclear', tag: 'Do not adopt', z: 'orange' },
        { label: 'Missing prerequisites', description: 'Client, network, credentials, or policy blocks use', tag: 'Resolve first', z: 'local' },
        { label: 'Unclear result', description: 'The task has no observable acceptance check', tag: 'Improve test', z: 'purple' },
        { label: 'No owner', description: 'No one can approve or roll back the dependency', tag: 'Escalate', z: 'orange' }
      ],
      footnote: 'A committed lockfile improves traceability; it does not certify trust, safety, or task quality.'
    }),
    S('three-situations', 4, 'Three situations use the same reviewable configuration pattern', {
      scene: 'scorecard',
      cards: [
        { icon: '▤', title: 'Shared review setup', description: 'Template a repo manifest; let each repository owner review the lockfile.' },
        { icon: '⇄', title: 'Multiple projects', description: 'Keep separate manifests for distinct project needs and constraints.' },
        { icon: '✓', title: 'CI consistency', description: 'Check the declared manifest-lock pair on pull requests.' },
        { icon: '♙', title: 'Decision stays human', description: 'Project and enterprise owners keep their separate approval roles.' }
      ],
      footnote: 'These are patterns and examples from the source material, not reported customer deployments.'
    }),
    S('before-after', 0, 'The team moves from individual setup to reviewed repository intent', {
      before: [
        'Personal setup lives outside the repository',
        'Contributors repeat configuration steps',
        'Resolved versions are hard to compare',
        'Plugin changes lack a shared review point'
      ],
      after: [
        'apm.yml records project intent',
        'Contributors apply the repository setup',
        'apm-lock.yml records resolution details',
        'Maintainers review changes before adoption'
      ],
      metrics: [
        { value: '1', detail: 'manifest for project intent' },
        { value: '1', detail: 'lockfile to review with it' },
        { value: 'Named', detail: 'owner for acceptance and updates' }
      ]
    }),
    S('today', 0, 'Start with one task, one artifact, and one owner', {
      horizons: [
        { icon: '⌕', label: 'Today', z: 'green', items: ['Select one real task', 'Inspect one candidate source', 'Write an acceptance check'] },
        { icon: '▤', label: 'This Week', z: 'local', items: ['Run an approved bounded trial', 'Record output and permissions', 'Ask the repo owner to review'] },
        { icon: '✓', label: 'This Month', z: 'purple', items: ['Pilot one repository manifest', 'Review manifest and lockfile diffs', 'Set a rollback and update owner'] }
      ],
      takeaway: 'Apply the decision to one repository you maintain: name its context, evidence, boundary, and approver.'
    }),
    S('references', 0, 'References and source availability', {
      groups: [
        { icon: '↗', title: 'First-party product sources', z: 'local', items: [
          { href: 'https://code.visualstudio.com/docs/copilot/customization/agent-plugins', label: 'Agent plugins for Copilot customization', description: 'Plugin concepts and installation.' },
          { href: 'https://microsoft.github.io/apm/introduction/what-is-apm/', label: 'APM · Agent Package Manager', description: 'Manifest, lockfile, and CLI documentation.' },
          { href: 'https://github.com/github/copilot-plugins', label: 'GitHub Copilot plugins repository', description: 'First-party source and contribution context.' }
        ] },
        { icon: '◉', title: 'Catalog and governance', z: 'purple', items: [
          { href: 'https://github.com/github/awesome-copilot', label: 'Awesome GitHub Copilot', description: 'Community-curated ecosystem catalog.' },
          { href: 'https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings', label: 'Enterprise team specialization for managed settings', description: 'Managed-settings update; verified 2026-08-10.' }
        ] }
      ],
      footnote: 'README reference verification dates: 2026-04-17 for plugin/APM sources; 2026-08-10 for the managed-settings changelog. Recheck availability and behavior before use.'
    }),
    S('thanks', 0, 'Copilot Plugins & APM', {
      chrome: false, visual: 'config-ring',
      subtitle: 'Composable AI Extensions',
      cards: [
        { value: 'Try', detail: 'Evaluate a capability against a real task.' },
        { value: 'Record', detail: 'Commit intent and resolved configuration.' },
        { value: 'Review', detail: 'Keep approval with the responsible owner.' }
      ],
      prompt: 'Which repository task will you evaluate first?'
    })
  ];

  const SRC = {
    plugins: { label: 'Agent plugins for Copilot customization', href: 'https://code.visualstudio.com/docs/copilot/customization/agent-plugins' },
    apm: { label: 'APM · Agent Package Manager documentation', href: 'https://microsoft.github.io/apm/introduction/what-is-apm/' },
    repo: { label: 'GitHub Copilot plugins repository', href: 'https://github.com/github/copilot-plugins' },
    awesome: { label: 'Awesome GitHub Copilot', href: 'https://github.com/github/awesome-copilot' },
    managed: { label: 'Enterprise team specialization for managed settings', href: 'https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings' }
  };

  const NOTES = {
    title: { seconds: 20, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"A plugin can start as a useful trial and become a reviewable part of a repository."`,
        `Point to the ring: the package travels with the repository; the person still evaluates and approves it.`,
        `→ Start from the question a developer or platform maintainer actually faces.`
      ],
      know: [`This conversion keeps the existing talk's scope and source baseline; it is not a current release-by-release product review.`] },
    'core-question': { seconds: 35, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"How do I extend Copilot with custom capabilities and share them across teams and repositories? The useful answer separates a personal trial from a team decision."`,
        `The developer tries a task; the platform team packages a repeatable setup; the service owner accepts the dependency and its boundary.`,
        `"A manifest can carry intent. A lockfile can make a resolution inspectable. Neither transfers approval away from the maintainers."`,
        `→ First, decide when repository packaging earns its cost.`
      ],
      know: [`Question uses the learner's own voice and preserves the original core question's intent.`] },
    contents: { seconds: 20, sources: [SRC.apm],
      notes: [`"Four moves take us from scope, through exploration and packaging, to a decision in one of our own repositories."`, `Use the slide links to jump to each section opener.`] },
    'part-1': { seconds: 15, sources: [SRC.apm],
      notes: [`"The decision comes before the command: what begins as exploration, and what becomes shared infrastructure?"`, `→ Compare the two configuration scopes.`] },
    'repo-config': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"A repository manifest gives contributors a shared starting point they can inspect with the code."`,
        `Walk across each row. Local setup repeats by person; the repository path makes project intent and resolution visible to maintainers.`,
        `This is a configuration comparison, not a measured reduction in onboarding time. A new clone still needs a compatible client, access, and any local prerequisites.`,
        `→ That points to two tools with different ownership boundaries.`
      ],
      know: [`APM is described in the existing source as coordinating project configuration using apm.yml and apm-lock.yml. The source also describes plugins as npm packages with a manifest schema that register capabilities with supported Copilot clients. Exact schema, install effects, supported clients, and lockfile behavior must be checked against current documentation. Identical configuration does not guarantee identical model responses, runtime state, or task outcomes.`] },
    scopes: { seconds: 38, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"Use the plugin command to learn whether one extension helps. Use APM when a repository owner wants to share the project setup."`,
        `The developer runs a bounded evaluation; the maintainer decides whether a dependency belongs in the repository.`,
        `Do not describe a personal installation as team adoption or imply APM replaces local authorization.`,
        `→ APM's manifest and lockfile form a useful intent-to-resolution path.`
      ],
      know: [`The source README assigns individual plugin lifecycle to copilot plugin commands, and project configuration packaging to APM. Its comparison also treats custom instructions as a lighter option for text-only customization and notes that APM brings manifest discipline; a project with no shared customization may need neither. Exact command support can change; links are in the references.`] },
    architecture: { seconds: 38, sources: [SRC.apm],
      notes: [
        `"The manifest says what the project requests; APM resolves it; the lockfile records details for review."`,
        `Trace from left to right, then name the contributor action. The service owner remains responsible for accepting a result or dependency change.`,
        `The boxes are a conceptual flow, not a claim about internal runtime architecture.`,
        `→ A discovered package still needs an evidence-based acceptance decision.`
      ],
      know: [`The source describes APM inputs including plugins, instructions, skills, and MCP servers. Exact schema, install effects, and lockfile behavior must be checked against current documentation.`] },
    evaluate: { seconds: 38, sources: [SRC.repo, SRC.awesome, SRC.plugins],
      notes: [
        `"A catalog helps find a candidate. The owner still checks source, permissions, and task evidence."`,
        `Point to purpose, source, scope, and evidence. A community listing is a lead, not a security review.`,
        `"Keep the trial narrow enough that you can see what changed and decide what to do next."`,
        `→ Part two makes the exploration path concrete.`
      ],
      know: [`The talk names first-party and community discovery paths, but marketplace presence does not establish safety, quality, compatibility, or fitness for a particular repository.`] },
    'part-2': { seconds: 15, sources: [SRC.plugins, SRC.apm],
      notes: [`"A command gives us a repeatable way to look. It does not tell us whether the extension is appropriate."`, `→ Start with a task-specific search.`] },
    marketplace: { seconds: 38, sources: [SRC.apm],
      notes: [
        `"Search the catalog for a capability connected to a task you can verify."`,
        `This is an illustrative command shape, not live output. The slide does not show real catalog results.`,
        `Do not infer that a displayed name is vetted or available today. Check current APM documentation and inspect the candidate's source.`,
        `→ Discovery has more than one useful source.`
      ],
      know: [`No marketplace browse or plugin install was executed during conversion. The source talk says browse supports category and keyword filters and describes listings with names, descriptions, client compatibility, and install commands. Treat that as source-dated behavior, not a current guarantee.`] },
    discovery: { seconds: 38, sources: [SRC.apm, SRC.awesome, SRC.repo],
      notes: [
        `"Use each discovery source for what it can tell you: catalog leads, community examples, or first-party code and schema context."`,
        `The repository owner follows a candidate to source and compatibility details before deciding whether it fits.`,
        `→ Next, a trial needs a boundary and a check.`
      ],
      know: [`Awesome GitHub Copilot is community-curated. The official plugin repository is first-party, but that status alone does not establish that each extension is suitable for a given team.`] },
    'install-preview': { seconds: 38, sources: [SRC.plugins],
      notes: [
        `"The command is only an example. No plugin was installed for this deck."`,
        `For a real evaluation, use an environment and scope approved by the repository or service owner. Inspect what the tool reports and what files or external systems it can access.`,
        `Then test one representative task and compare the artifact with a known acceptance check.`,
        `→ A useful trial has a lifecycle, not just an install command.`
      ],
      cue: [`Do not run the illustrative install command during this talk or in the conversion workspace. If a separate authorized demo is planned, use the team's approved disposable environment and show actual output only after confirming the current command and source.`],
      know: [`The visible transcript is explicitly illustrative. No third-party install, plugin trust change, or live command was performed.`] },
    'plugin-lifecycle': { seconds: 38, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"Browse, install, list, and update or remove are different steps with different evidence."`,
        `Name the actor: the developer explores; Copilot reads the local plugin state; the repository owner decides whether a tested extension becomes shared configuration.`,
        `Check current CLI help before presenting exact flags or behavior.`,
        `→ A visible list alone still does not establish task quality.`
      ],
      know: [`The source names copilot plugin update NAME and copilot plugin uninstall NAME, says installs persist across terminal sessions and can be global or local, and describes the VS Code path as Copilot: Focus on Copilot View, then Plugins. It claims changes are immediate without restart, that UI and CLI share a registry, and that plugins span VS Code, CLI, and ACP clients; verify current behavior, compatibility, and scope before stating those details as current. Command links were last verified 2026-04-17.`] },
    acceptance: { seconds: 38, sources: [SRC.plugins],
      notes: [
        `"A useful acceptance check connects the task input to an output a person can inspect."`,
        `Keep execution status separate from the domain result. A test can pass while the proposed behavior is wrong; a command can succeed while the extension lacks the needed context.`,
        `The service owner accepts, rejects, or escalates the result.`,
        `→ Once the team wants the capability, record what it requests.`
      ],
      know: [`The source exercise illustrates a prompt such as @code-review-assistant review this PR for security issues. Treat the plugin name as an example, not a verified package or endorsed security tool. The four cards operationalize context, verification, delegation, and authority; they are a decision rubric, not a product guarantee.`] },
    'part-3': { seconds: 15, sources: [SRC.apm],
      notes: [`"Packaging means the team can review what it requests and what the tool resolved."`, `→ Begin with a minimal manifest.`] },
    'minimal-manifest': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"This example requests two plugin names with version ranges."`,
        `Read the version ranges as intent, not exact versions. The lockfile provides the resolution details that the maintainer can inspect.`,
        `The names and ranges are examples carried over from the source; they are not a recommendation or proof of marketplace availability.`,
        `→ The same manifest can include additional configuration inputs.`
      ],
      know: [`Examples use version: 1, a code-review-assistant range ^1.0.0, and test-generator range ^2.1.0. Confirm current schema before copying.`] },
    'full-manifest': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"The source example adds an instructions path, a skill path, and an MCP server entry."`,
        `Point at the path and source fields. An MCP server can introduce credentials, network access, and an external service boundary; the maintainer evaluates those separately.`,
        `This code is illustrative and has not been installed or validated against a live package.`,
        `→ A contributor applies the repository configuration from a clone.`
      ],
      know: [`The existing README lists plugins, instructions, skills, and mcpServers. It states APM resolves npm, GitHub, or local sources. Treat the exact schema and source syntax as version-sensitive; consult current APM docs.`] },
    'repo-hydration': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"The maintainer commits reviewed configuration; the contributor runs the documented install from the repository."`,
        `Follow the four actors. The contributor inspects local state and task evidence; the service owner remains the acceptance authority.`,
        `One command does not erase authentication, network, client compatibility, or prerequisite setup.`,
        `→ Now compare the requested range with a resolved record.`
      ],
      know: [`The source README's onboarding model is git clone, cd into the project directory, run apm install, then commit both apm.yml and apm-lock.yml. A teammate can validate a fresh clone. Its output examples are illustrative, not measured here.`] },
    'lockfile-resolution': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"The manifest range expresses intent. The example lockfile records an exact selected version."`,
        `The pair helps reviewers see what was requested and what resolution was recorded.`,
        `The 1.2.3 value is an example, not today's latest version or observed registry output.`,
        `→ The record has fields that make its source inspectable.`
      ],
      know: [`The README contrasts a range such as ^1.0.0 with a resolved version such as 1.2.3. Its workflow says contributors run apm install, maintainers use apm update, and pull requests review the lockfile diff. Reproducible dependency resolution is narrower than reproducible agent behavior.`] },
    'lockfile-fields': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"Version, resolved source, and integrity are fields the reviewer can compare."`,
        `The source example abbreviated the integrity value. The URL and hash on this slide are placeholders, not real package evidence.`,
        `Use the actual generated file and current documentation when reviewing a real change.`,
        `→ That turns an update into a pull-request decision.`
      ],
      know: [`The source talk says the lockfile captures exact versions, download URLs, and integrity hashes, and describes the integrity value as a tamper check. This slide avoids inventing a registry URL or digest; check current APM docs for the precise semantics.`] },
    'lockfile-review': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"A package update becomes a reviewable change when the maintainer compares intent and resolution."`,
        `The contributor prepares the diff and validation; the repository owner decides whether to merge it.`,
        `The source names apm update. Verify current command semantics before using them.`,
        `→ A frozen check can add a drift signal in CI.`
      ],
      know: [`The existing material recommends reviewing lockfile diffs like dependency changes. It does not establish that every project has identical CI needs or policy.`] },
    'drift-recovery': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"When a frozen check fails, pause and inspect the manifest-lock pair before changing either file."`,
        `The output is a control signal. Compare what the project requests with what the lockfile records, then let the owner decide the intended update.`,
        `Rerun the same validation after resolving the mismatch; do not infer an exact error message from this diagram.`,
        `→ A team can put that check at a pull-request gate.`
      ],
      know: [`The original README describes --frozen-lockfile as failing when the lockfile does not match the manifest. Exact semantics and message are version-sensitive and need a current-doc check.`] },
    'ci-gate': { seconds: 38, sources: [SRC.apm],
      notes: [
        `"CI can check the declared manifest-lock pair before maintainers accept a pull request."`,
        `This is a workflow shape, not a ready-to-copy pipeline. The platform owner chooses tool versioning, network and credential scope, and the failure policy.`,
        `A green CI check verifies the check ran; it does not prove plugin behavior or safety.`,
        `→ Enterprise governance is a separate layer from project packaging.`
      ],
      know: [`The legacy article's workflow used actions/checkout@v3, npm install -g @microsoft/apm, and apm install --frozen-lockfile. It was not executed or copied verbatim; current CI installation, credential, and pinning guidance must be checked.`] },
    'managed-settings': { seconds: 38, sources: [SRC.apm, SRC.managed],
      notes: [
        `"APM packages project configuration. Managed settings establish an enterprise policy baseline."`,
        `The distinction matters: the managed-settings changelog is not a rule for merging apm.yml.`,
        `The project maintainer reviews repository changes; the enterprise owner sets organization-managed policy.`,
        `→ Team-level additions operate within that boundary.`
      ],
      know: [`The source README distinguishes APM packaging from managed settings. The managed-settings source was verified 2026-08-10, not rechecked as part of this mechanics conversion.`] },
    'managed-boundary': { seconds: 38, sources: [SRC.managed],
      notes: [
        `"The changelog describes additive managed plugin and marketplace settings, with enterprise decisions remaining in force."`,
        `It places team files under copilot/teams/ and maps team slugs with team-mappings.json. For multiple teams, the source describes least-restrictive team values beneath non-overridable enterprise decisions.`,
        `Name the documented boundary: VS Code, Copilot CLI, Copilot App, and Copilot cloud agent for Business or Enterprise licenses, as recorded in the source checked August 10, 2026.`,
        `→ Carry that distinction into the action ladder.`
      ],
      know: [`These details are time-sensitive and preserved from the approved refresh. Revisit the linked changelog and current product documentation before acting.`] },
    'part-4': { seconds: 15, sources: [SRC.plugins, SRC.apm],
      notes: [`"The transfer is small: use one task to decide whether this pattern fits your repository."`, `→ Walk the evidence gates.`] },
    'choice-ladder': { seconds: 40, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"Move from discovery to packaging only when the trial gives the owner enough evidence to decide."`,
        `The stages are a choice sequence, not a score. A project can stop after any gate if source, scope, evidence, or ownership is unclear.`,
        `The maintain step keeps updates reviewable after the first adoption.`,
        `→ The first experiment can be deliberately small.`
      ],
      know: [`The roadmap adapts the README's marketplace-to-trial-to-manifest-to-lockfile path. It is not a measured maturity model.`] },
    'exploratory-check': { seconds: 40, sources: [SRC.plugins],
      notes: [
        `"A useful first trial asks one question about one task and makes the result inspectable."`,
        `Bound the environment, inspect actual changes and access, then let the owner decide whether to keep, reject, or repeat the trial.`,
        `The source's 15-minute label is an estimate, not a measured result or a promise.`,
        `→ If the capability earns a team trial, make its owner and files explicit.`
      ],
      know: [`The source article offers a 15-minute exploration exercise. This conversion keeps it as an estimated planning horizon and removes the implication of automatic success.`] },
    'first-repo': { seconds: 40, sources: [SRC.apm],
      notes: [
        `"A first repository pilot makes ownership, intent, resolution, and validation visible together."`,
        `The maintainer selects the task and candidate; the contributor runs the approved workflow; the owner reviews the diff and fresh-clone evidence.`,
        `The original one-hour duration is a planning estimate. Local prerequisites can make the pilot longer.`,
        `→ Review the change through a simple contract.`
      ],
      know: [`The source includes a one-hour exercise to add apm.yml, run apm install, commit the pair, and ask a teammate to validate a fresh clone. No commands were run during this conversion.`] },
    'review-contract': { seconds: 40, sources: [SRC.apm, SRC.plugins],
      notes: [
        `"A reviewer can ask four concrete questions: why this dependency, where it comes from, what it can reach, and how its result is accepted."`,
        `The repository owner approves the project change. The enterprise owner remains responsible for managed policy.`,
        `Keep plugin behavior review separate from manifest and lockfile consistency.`,
        `→ Name the conditions that tell you to pause.`
      ],
      know: [`This contract operationalizes context, verification, and authority without treating a lockfile as a trust certificate.`] },
    'where-pattern-stops': { seconds: 40, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"Pause when you cannot identify the source, permissions, acceptance check, or accountable owner."`,
        `Resolve prerequisites or improve the test; if policy or authority remains unclear, escalate to the responsible owner.`,
        `"The lockfile helps people inspect resolution. It does not prove the extension is safe or the task is correct."`,
        `→ These same boundaries apply across common team situations.`
      ],
      know: [`MCP or plugin integrations may involve external services, credentials, and network access. Local model execution or repository packaging alone does not establish an offline workflow.`] },
    'three-situations': { seconds: 40, sources: [SRC.apm],
      notes: [
        `"The pattern fits a shared review setup, separate project profiles, or a pull-request consistency check."`,
        `Treat these as patterns from the source material, not customer stories or observed adoption results.`,
        `Each project owner still reviews the local need and decides what to accept.`,
        `→ Now summarize the decision in one contrast.`
      ],
      know: [`The source examples include a shared code-review assistant with a .github/team-instructions.md path and illustrative install output, separate Python data-pipeline / React web-app / Go microservice manifests, and frozen-lockfile PR validation. Their package names and output are illustrative scenarios, not named customers or verified catalog listings. No adoption metrics were carried into this deck.`] },
    'before-after': { seconds: 35, sources: [SRC.apm],
      notes: [
        `"The outcome is not zero effort; it is configuration the team can inspect and review."`,
        `Walk from personal setup to repository intent, and from invisible resolution to a lockfile diff with a named approver.`,
        `→ Here is a practical transfer sequence.`
      ],
      know: [`No savings, consistency percentages, or deployment outcomes are claimed; the source's unsupported numeric comparison claims were not carried forward.`] },
    today: { seconds: 45, sources: [SRC.plugins, SRC.apm],
      notes: [
        `"Today, pick one task and write down what evidence would make a trial useful."`,
        `This week, use an approved boundary and ask the repository owner to inspect source, permissions, and output. This month, pilot one manifest and review the lockfile with an update and rollback owner.`,
        `"Which repository do you maintain, and who can approve this change there?"`,
        `→ Keep the first-party sources available for the detailed mechanics.`
      ],
      know: [`The original longer multi-plugin exercise estimates two to four hours. Its value has been condensed to a transfer action; do not represent the estimates as measured time.`] },
    references: { seconds: 25, sources: [SRC.plugins, SRC.apm, SRC.repo, SRC.awesome, SRC.managed],
      notes: [
        `"These links are the evidence map for the claims in the deck."`,
        `Plugin/APM links were marked verified in the README on April 17, 2026. The managed-settings changelog was marked verified August 10, 2026.`,
        `This conversion preserves those dates; it does not certify that current behavior remains unchanged. Recheck before installation or policy changes.`
      ],
      know: [`References are first-party sources except Awesome GitHub Copilot, which is a community-curated repository hosted by GitHub. Source status and availability can change.`] },
    thanks: { seconds: 15, sources: [SRC.apm],
      notes: [
        `"Try one capability, record what the repository requests, and let the right owner review it."`,
        `"Which task will you evaluate first?"`
      ],
      know: [`Presenter run-through and content review remain follow-up gates; all speaking times are estimates.`] }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-plugins',
      title: 'Copilot Plugins & APM: Composable AI Extensions',
      short: 'Copilot Plugins & APM',
      category: 'tech-talks',
      source: 'tech-talks/copilot-plugins/README.md',
      question: 'How do I extend Copilot with custom capabilities and share them across teams and repositories?',
      thesis: 'Try an extension against a real task, then package only the reviewed project configuration whose source, scope, resolution, and owner are clear.'
    },
    slides
  };
})();
