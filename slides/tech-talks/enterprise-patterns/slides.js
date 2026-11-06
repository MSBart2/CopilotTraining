/*
  Enterprise Patterns: One Baseline, Four Layers, Every Team's Choice — deck data and speaker notes.
  Source: tech-talks/enterprise-patterns/deck.recipe.yml (approved, 39 slides) and research.md.
  Deck-only scenes live in scenes.js; shared frames and patterns come from slides/native/.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const slides = [
    /* ---- Frame ---- */
    S('title', 0, 'Enterprise Patterns', {
      chrome: false, visual: 'layer-rings',
      subtitle: 'One Baseline, Four Layers, Every Team\'s Choice',
      tagline: 'Place each choice at the plane and layer its owner controls, then verify what one developer actually gets.',
      meta: 'CopilotTraining · Practitioner Tech Talk'
    }),
    S('core-question', 0, 'How do I give every team the same Copilot setup without taking away their choices?', {
      pill: 'Core question',
      subtitle: 'Place each choice at the plane and layer its owner controls, then verify what one developer actually gets.',
      highlight: 'One baseline, four layers, one effective answer per developer.',
      routing: ['enterprise', 'team', 'repository', 'personal'], routingLabel: 'Four owners, four layers',
      roles: [
        { icon: '🏢', title: 'Platform owner', description: 'Ships one baseline to every team and blocks what nobody may use.' },
        { icon: '👥', title: 'Team lead', description: 'Adds the plugins and values the team\'s own work needs.' },
        { icon: '📁', title: 'Repository maintainer', description: 'Turns on useful defaults that contributors can switch off.' }
      ],
      stats: [
        { title: '1 plugin baseline', description: 'Versioned once, installed wherever it applies.' },
        { title: '2 planes, 4 layers', description: 'Each choice placed with the person who owns it.' },
        { title: '13 checks', description: 'The effective answer for one real developer.' }
      ]
    }),
    S('contents', 0, 'Package, place, reuse, prove', {
      pill: 'Agenda · four parts',
      sections: [
        { icon: '📦', title: 'Package the Baseline', subtitle: 'Ship one plugin', blurb: 'One package, one id, every surface.', slide: 5 },
        { icon: '🧭', title: 'Place Every Choice at Its Owner\'s Layer', subtitle: 'Two planes, four layers', blurb: 'Allow, require, add, default, opt out.', slide: 10 },
        { icon: '🛤️', title: 'Ride the Same Rails for Models, Context, and Telemetry', subtitle: 'Same path, more values', blurb: 'Models, MCP, context, telemetry.', slide: 21 },
        { icon: '✅', title: 'Prove the Result and Know Where It Stops', subtitle: 'Check, read, bound', blurb: 'Metrics, then the limits.', slide: 29 }
      ]
    }),
    S('three-asks', 0, 'One platform team, three asks at once', {
      pill: 'The situation',
      subtitle: 'Every team needs the security baseline, payments needs a review plugin, and one repository wants an optional scanner.'
    }),

    /* ---- Part 1: Package the Baseline ---- */
    S('part-1', 1, 'Package the Baseline', {
      scene: 'opener',
      subtitle: 'A plugin gives the baseline a shape you can version, publish, and install.',
      cards: [
        { icon: '📦', title: 'Bundle', blurb: 'Skills, MCP, agents, hooks' },
        { icon: '🏪', title: 'Publish', blurb: 'One marketplace catalog' },
        { icon: '⬇️', title: 'Install', blurb: 'One PLUGIN@MARKETPLACE id' }
      ],
      terminal: { context: 'release-guard@platform-tools', detail: 'one id, every Copilot surface' }
    }),
    S('plugin-unit', 1, 'Copied setup becomes one versioned package', {
      pill: 'Package · the unit you ship', steps: { current: 1, total: 4 },
      subtitle: 'The skills, MCP config, agents, and hooks copied into every repository collapse into release-guard.'
    }),
    S('plugin-anatomy', 1, 'Portable parts at the root, Copilot parts in their own folder', {
      pill: 'Package · Agent Plugins 1.0', steps: { current: 2, total: 4 },
      subtitle: 'skills/ and mcp.json work across agent clients; com.github.copilot/ holds Copilot-only agents and hooks.'
    }),
    S('marketplace-id', 1, 'A marketplace makes every plugin addressable', {
      pill: 'Package · marketplace.json', steps: { current: 3, total: 4 },
      subtitle: 'The id is PLUGIN@MARKETPLACE, and each plugin moves through available, installed, and enabled.'
    }),
    S('local-trial', 1, 'A local install proves the package loads', {
      scene: 'terminal', termTitle: 'copilot · local trial', pill: 'Package · first proof', steps: { current: 4, total: 4 },
      subtitle: 'Copilot CLI installs release-guard from a folder before any policy touches it.',
      transcript: [
        { type: 'prompt', text: 'copilot plugin install ./release-guard' },
        { type: 'thinking', label: 'Client plugin list:' },
        { type: 'response', lines: ['release-guard 1.4.0 · skill release-checklist · agent release-reviewer · MCP release-notes'] },
        { type: 'divider' },
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: 'Run the release checklist for this branch.' },
        { type: 'thinking', label: 'Copilot CLI:' },
        { type: 'response', lines: ['Loads the release-checklist skill from release-guard', 'Runs scripts/verify-changelog.sh and reports each checklist item'] },
        { type: 'divider' },
        { type: 'outcome', text: 'The package loads and answers before any policy exists' }
      ],
      footnote: 'Output paraphrased from the recorded capture; copilot plugin --help names the list subcommand.'
    }),

    /* ---- Part 2: Place Every Choice at Its Owner's Layer ---- */
    S('part-2', 2, 'Place Every Choice at Its Owner\'s Layer', {
      scene: 'opener',
      subtitle: 'Each choice belongs at the plane and layer of the person who owns it.',
      cards: [
        { icon: '🛡️', title: 'Policies', blurb: 'Allowed at all' },
        { icon: '🗄️', title: 'Governance repo', blurb: 'Settings as code' },
        { icon: '🏛️', title: 'Org', blurb: 'Delegated controls' },
        { icon: '🧭', title: 'Four layers', blurb: 'One answer' }
      ],
      terminal: { context: 'AI controls · managed › team › repository › personal', detail: 'higher wins' }
    }),
    S('two-planes', 2, 'Policies decide what is allowed; settings decide what loads', {
      scene: 'showdown', pill: 'Place · two planes', steps: { current: 1, total: 10 },
      subtitle: 'Enterprise AI controls set the policy plane; the .github-private governance repository drives the settings plane.',
      leftLabel: 'Policy plane · AI controls', rightLabel: 'Settings plane · .github-private',
      pairs: [
        { left: { label: 'Enterprise → AI controls', note: 'Enabled, Disabled, or "Let organizations decide"' }, right: { label: 'managed-settings.json → team files', note: 'Governance repository; team files map to enterprise teams', z: 'github' } },
        { left: { label: 'Organization → Copilot settings', note: 'Orgs choose only where the enterprise delegated' }, right: { label: 'Repository → personal', note: '.github/copilot/settings.json defaults, then the developer\'s own choices', z: 'local' } },
        { left: { label: 'Decides what is allowed', note: 'Features, agents, models, MCP availability, Dreaming' }, right: { label: 'Decides what each client loads', note: 'Plugins, marketplaces, model default, Fusion tier, MCP allowlist, telemetry, refresh', z: 'purple' } }
      ],
      outcomeLeft: { icon: '↔', label: 'Several orgs: usually least restrictive' },
      outcomeRight: { icon: '✓', label: 'Name the plane first, then the layer' },
      footnote: 'A user licensed by several enterprises almost always gets the most restrictive policy.'
    }),
    S('governance-repo', 2, 'One governance repository holds the settings plane', {
      pill: 'Place · .github-private', steps: { current: 2, total: 10 },
      subtitle: 'Managed settings, team files, and enterprise agents live in one repository; rulesets and AI managers decide who changes them.'
    }),
    S('org-owns', 2, 'The org owns delegated policy and org-scoped context', {
      scene: 'signals', pill: 'Place · organization controls', steps: { current: 3, total: 10 },
      subtitle: 'Org owners act on the policy plane for the seats they assign; the org has no slot in the settings-file chain.',
      rows: [
        { label: 'Policies', description: 'Feature, model, and MCP policies where the enterprise delegated', tag: 'Delegated', z: 'github' },
        { label: 'Instructions', description: 'Org custom instructions reach cloud sessions and code review only', tag: 'Cloud, review', z: 'local' },
        { label: 'Agents', description: '/agents in the org\'s .github or .github-private repository', tag: 'Org members', z: 'purple' },
        { label: 'Content exclusion', description: 'Paths ignored for org-assigned seats; repo admins add their own', tag: 'Org seats', z: 'remote' },
        { label: 'Firewall', description: 'Cloud agent firewall: Enabled, Disabled, Let repositories decide', tag: 'Cloud agent', z: 'orange' }
      ],
      footnote: 'Org custom agents are public preview. Settings-page labels are unconfirmed; check your org\'s Copilot settings.'
    }),
    S('four-layers', 2, 'Four layers, four owners, one fixed order', {
      pill: 'Place · the settings plane', steps: { current: 4, total: 10 },
      subtitle: 'On the settings plane, each layer has a file, an owner, powers, and a limit; the higher layer wins when values conflict.'
    }),
    S('force-vs-recommend', 2, 'Managed settings require or block; repositories recommend', {
      scene: 'showdown', pill: 'Place · force versus recommend', steps: { current: 5, total: 10 },
      subtitle: 'The same enabledPlugins true means "required" in policy and "default on" in a repository.',
      leftLabel: 'managed-settings.json · enterprise', rightLabel: '.github/copilot/settings.json · repository',
      pairs: [
        { left: { label: 'true = required', note: 'Installed, enabled, and locked on for everyone' }, right: { label: 'true = default on', note: 'Enabled for contributors in trusted repositories; each can switch it off', z: 'local' } },
        { left: { label: 'false = blocked', note: 'Install refused for everyone' }, right: { label: 'Managed policy still wins', note: 'A repository default leaves required and blocked values untouched', z: 'local' } },
        { left: { label: 'No "recommend" value', note: 'Managed settings can only require or block' }, right: { label: 'Recommendations live here', note: 'Maintainers own the default; developers own the opt-out', z: 'green' } }
      ],
      outcomeLeft: { icon: '⚠', label: 'A recommendation in policy becomes a mandate' },
      outcomeRight: { icon: '✓', label: 'Recover: move it to the repository file' },
      footnote: 'Docs: "Enterprise-managed settings can only require or block plugins."'
    }),
    S('enterprise-file', 2, 'The enterprise file requires, blocks, and approves sources', {
      pill: 'Place · enterprise layer', steps: { current: 6, total: 10 },
      subtitle: 'release-guard is required, legacy-deploy is blocked, and installs come only from listed marketplaces.'
    }),
    S('team-file', 2, 'Teams add on top; only overridable keys move', {
      pill: 'Place · team layer', steps: { current: 7, total: 10 },
      subtitle: 'team-mappings.json sends payments teams to payments.json; a member of two teams gets the least restrictive value.'
    }),
    S('repo-defaults', 2, 'A trusted repository turns on a default', {
      scene: 'terminal', termTitle: 'payments-service · repository layer', pill: 'Place · repository layer', steps: { current: 8, total: 10 },
      subtitle: 'Maintainers write .github/copilot/settings.json; contributors get github-security on and can switch it off.',
      transcript: [
        { type: 'prompt', text: 'cat .github/copilot/settings.json' },
        { type: 'response', lines: ['"enabledPlugins": { "github-security@awesome-copilot": true }', '"extraKnownMarketplaces": { "awesome-copilot": github/awesome-copilot }'] },
        { type: 'divider' },
        { type: 'outcome', text: 'copilot config --repo writes this file; --local writes settings.local.json' },
        { type: 'outcome', text: 'Applies to contributors in trusted repositories' },
        { type: 'outcome', mark: '↺', text: 'Contributors switch it off where the surface supports it; managed policy still wins' }
      ],
      footnote: 'The repository-level marketplace key is illustrative; confirm it against the plugins concepts page.'
    }),
    S('anchor-demo', 2, 'One developer, four layers, one effective answer', {
      pill: 'Place · anchor demo', steps: { current: 9, total: 10 },
      subtitle: 'A payments-core developer opens the product repository in Copilot CLI and reads the effective plugin list.'
    }),
    S('blocked-install', 2, 'Blocked installs fail where the developer can see them', {
      scene: 'terminal', termTitle: 'copilot · payments-core developer', pill: 'Place · visible refusal', steps: { current: 10, total: 10 },
      subtitle: 'Copilot CLI refuses a blocked plugin and any marketplace that strictKnownMarketplaces leaves out.',
      transcript: [
        { type: 'prompt', text: 'copilot plugin install legacy-deploy@platform-tools' },
        { type: 'response', lines: ['Refused: blocked by enterprise managed settings'] },
        { type: 'prompt', text: 'copilot plugin install helper@unlisted-marketplace' },
        { type: 'response', lines: ['Refused: marketplace is outside the approved list'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Both refusals surface at install time, on the developer\'s screen' },
        { type: 'outcome', mark: '⏺', text: 'Refusal lines paraphrased; play the recorded capture for exact wording' }
      ]
    }),

    /* ---- Part 3: Ride the Same Rails ---- */
    S('part-3', 3, 'Ride the Same Rails for Models, Context, and Telemetry', {
      scene: 'opener',
      subtitle: 'The path from Part 2 already carries models, MCP, context, and telemetry.',
      cards: [
        { icon: '🧠', title: 'Models', blurb: 'Allowed, default' },
        { icon: '🔌', title: 'MCP', blurb: 'Allowlist, deny wins' },
        { icon: '📚', title: 'Context', blurb: 'Scope picks home' },
        { icon: '📡', title: 'Telemetry', blurb: 'Identity, no content' }
      ],
      terminal: { context: 'Where each value lives', detail: 'permissions, hooks, sandbox → Harness Fundamentals' }
    }),
    S('same-path', 3, 'The same four layers resolve the rest of the baseline', {
      pill: 'Rails · one path', steps: { current: 1, total: 7 },
      subtitle: 'Model, Fusion effort, MCP allowlist, telemetry capture, and policy freshness join the enterprise and team files.',
      footnote: 'Model availability comes from the model policy API, a separate entry at the same levels.'
    }),
    S('availability-vs-default', 3, 'Availability and default are separate entries', {
      scene: 'showdown', pill: 'Rails · models', steps: { current: 2, total: 7 },
      subtitle: 'The model policy API decides which models a team can use; managed settings decide which one starts.',
      leftLabel: 'Availability · model policy REST API', rightLabel: 'Default · managed-settings.json',
      pairs: [
        { left: { label: '…/teams/platform-sre/copilot/model-policies', note: 'GET reads one enterprise team\'s policy state' }, right: { label: '"model": { "overridable": "fusion" }', note: 'Sets the default model; team files may change it', z: 'github' } },
        { left: { label: 'Four levels', note: 'Enterprise, enterprise team, agent apps, organization' }, right: { label: '"fusionTier": { "overridable": "standard" }', note: 'Sets default Fusion effort; any value except unmanaged locks it', z: 'github' } },
        { left: { label: 'PATCH updates availability', note: 'Request body illustrative; take it from the REST reference' }, right: { label: 'Fusion routes among enabled models', note: 'Admins can disable a model for Fusion alone', z: 'purple' } }
      ],
      outcomeLeft: { icon: '⚠', label: 'A disabled default has nothing to route to' },
      outcomeRight: { icon: '✓', label: 'Check both entries for each team' }
    }),
    S('fusion-tier-team', 3, 'One overridable key lets platform-sre run at High', {
      pill: 'Rails · Fusion effort', steps: { current: 3, total: 7 },
      subtitle: 'Everyone else stays at Standard; the team file changes only the key the enterprise opened.'
    }),
    S('mcp-allowlist', 3, 'The allowlist decides which MCP servers run, and deny wins', {
      pill: 'Rails · MCP servers', steps: { current: 4, total: 7 },
      subtitle: 'allowedMcpServers and deniedMcpServers live in managed settings; agent-profile servers fall to the cloud agent firewall.'
    }),
    S('context-placement', 3, 'Rules, methods, and reference each have a home', {
      scene: 'signals', pill: 'Rails · context', steps: { current: 5, total: 7 },
      subtitle: 'Place context by scope: every task, on demand, or across repositories; Dreaming keeps it current.',
      rows: [
        { label: 'Instructions', description: 'Instructions and AGENTS.md: every task; org ones reach cloud and review', tag: 'Every task', z: 'local' },
        { label: 'Plugin skills', description: 'Methods that load on demand, shipped once for many repositories', tag: 'On demand', z: 'github' },
        { label: 'Copilot Spaces', description: 'Cross-repository reference; Knowledge Bases convert to Spaces', tag: 'Across repos', z: 'remote' },
        { label: 'Dreaming', description: 'Edits memories directly; proposes skill and instruction PRs', tag: 'Maintainer PR', z: 'green' }
      ],
      footnote: 'Dreaming: public preview, opt-in, AI credits; enabled by Copilot policy, which enterprises can delegate to orgs.'
    }),
    S('telemetry-capture', 3, 'Attribute activity without capturing content', {
      pill: 'Rails · telemetry', steps: { current: 6, total: 7 },
      subtitle: 'Identity on, five content classes off; the highest-precedence managed source supplies the whole telemetry object.',
      footnote: 'Class names and defaults are documented; exact JSON nesting and export keys are illustrative.'
    }),
    S('fail-closed', 3, 'Fail closed: start only on current policy', {
      scene: 'relay', pill: 'Rails · freshness', steps: { current: 7, total: 7 },
      subtitle: 'forceRemoteSettingsRefresh makes every startup fetch current policy; without a connection to GitHub, Copilot stays closed.',
      columns: [
        { icon: '✅', title: 'Policy fetch succeeds', description: 'CLI and the Copilot app skip the one-hour cache and load current policy.', items: ['Client starts', 'Fetches policy', 'Runs on current policy'], z: ['local', 'github', 'green'] },
        { icon: '⛔', title: 'Policy fetch fails', description: 'The client fails closed; VS Code blocks Copilot features until the refresh succeeds.', items: ['Client starts', 'Fetch fails', 'Fails closed'], z: ['local', 'orange', 'orange'] },
        { icon: '🧭', title: 'Defaults around it', description: 'A global default covers features left Unconfigured; sandbox sets a minimum client version.', items: ['New GA feature', 'Global default decides', 'sandbox: min version'], z: ['github', 'github', 'runtime'] }
      ]
    }),

    /* ---- Part 4: Prove the Result and Know Where It Stops ---- */
    S('part-4', 4, 'Prove the Result and Know Where It Stops', {
      scene: 'opener',
      subtitle: 'A baseline is ready when you can name the plane and layer behind every value one developer receives.',
      cards: [
        { icon: '✅', title: 'Check', blurb: 'Thirteen-row checklist in the README' },
        { icon: '📈', title: 'Read', blurb: 'Metrics as direction' },
        { icon: '🧱', title: 'Bound', blurb: 'APM and licensing' }
      ],
      terminal: { context: 'effective-settings checklist', detail: 'one developer, every value, its plane and layer' }
    }),
    S('usage-read', 4, 'Usage metrics add direction on top of the checklist', {
      scene: 'terminal', termTitle: 'usage metrics response · fields, simplified', pill: 'Prove · read the metrics', steps: { current: 1, total: 4 },
      subtitle: 'Read totals_by_plugin and agent activity for what they count; the README checklist stays the proof.',
      transcript: [
        { type: 'thinking', label: 'totals_by_plugin' },
        { type: 'response', lines: ['release-guard@platform-tools · skill invocations tied to the plugin', 'pci-review@platform-tools · skill invocations tied to the plugin', 'top five entries per array; customer ids can group under other or custom'] },
        { type: 'thinking', label: 'agent activity' },
        { type: 'response', lines: ['third-party agent apps join on agent_id; per-user entries omit session_count'] },
        { type: 'divider' },
        { type: 'outcome', mark: '!', text: 'An absent plugin entry can still mean real use' },
        { type: 'outcome', mark: '!', text: 'Keep plugin and skill counts separate; never add them' },
        { type: 'outcome', mark: '~', text: 'Impact dashboard ROI and industry comparisons are directional' }
      ]
    }),
    S('native-vs-apm', 4, 'Native layers own the baseline; APM adds reach', {
      pill: 'Bound · native layers and APM', steps: { current: 2, total: 4 },
      subtitle: 'Add APM when one repository feeds several agent tools or needs hash-pinned resolution in CI.'
    }),
    S('licensing-boundary', 4, 'Included access, metered use, gated controls', {
      scene: 'scorecard', pill: 'Bound · licensing', steps: { current: 3, total: 4 },
      subtitle: 'GitHub Enterprise now includes Copilot; the controls in this talk need GHEC with Business or Enterprise licenses.',
      cards: [
        { icon: '🎟️', title: 'Access', description: 'GitHub Enterprise includes Copilot; Standalone is $10/user/month outside GHE.' },
        { icon: '🪙', title: 'Metering', description: 'Use is metered on AI credits; self-serve rolls out in stages.' },
        { icon: '🛡️', title: 'Controls', description: 'Managed plugin controls need GHEC and Copilot Business or Enterprise licenses.' },
        { icon: '⚡', title: 'Credit users', description: 'Fusion, plugin actions such as Explain and Fix, and Dreaming use AI credits.' }
      ]
    }),
    S('placement-scorecard', 4, 'Every choice has a home', {
      scene: 'scorecard', pill: 'Bound · placement', steps: { current: 4, total: 4 },
      subtitle: 'Pick the plane and layer by who must own the choice; send the rest to the tool that owns it.',
      cards: [
        { icon: '🛡️', title: 'Policy', description: 'Allowed at all? Enterprise AI controls, or the org where the enterprise delegated.' },
        { icon: '🏢', title: 'Enterprise file', description: 'Everyone must have it or nobody may: required, blocked, approved sources, locked keys.' },
        { icon: '👥', title: 'Team', description: 'A defined group needs an extra plugin or its own value on an overridable key.' },
        { icon: '📁', title: 'Repository', description: 'Contributors benefit by default and can work without it.' },
        { icon: '🧑‍💻', title: 'Personal', description: 'Preference: an optional plugin from an approved marketplace.' },
        { icon: '🧭', title: 'Elsewhere', description: 'Several agent tools or hash pinning: APM. Session behavior: Harness Fundamentals.' }
      ]
    }),

    /* ---- Close ---- */
    S('before-after', 0, 'From copied setup to one baseline with owned choices', {
      scene: 'before-after', pill: 'The shift',
      before: ['Skills and MCP config copied repo by repo', 'Optional tools forced on through policy', 'Team exceptions negotiated one at a time', 'Effective setup guessed from config files'],
      after: ['One versioned plugin, PLUGIN@MARKETPLACE', 'Recommendations as repository defaults', 'Team files add plugins and open keys', 'Thirteen checks name each value\'s owner'],
      metrics: [{ value: '1', detail: 'plugin baseline' }, { value: '4', detail: 'layers, one effective answer' }, { value: '13', detail: 'checks per developer' }]
    }),
    S('today', 0, 'What you can do today', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Wrap one skill in a plugin.json with $schema', 'Install it with copilot plugin install ./PATH', 'Invoke the skill; reinstall after an edit'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Publish it through a marketplace.json repo', 'Enable it in one trusted repository', 'Run README checklist rows 2, 5, and 6'] },
        { icon: '🚀', label: 'This Month', z: 'purple', items: ['Pilot one team mapping in a test enterprise', 'Add a required plugin and fail-closed refresh', 'Pass all thirteen checks for two developers'] }
      ],
      takeaway: 'Place each choice at the plane and layer its owner controls, then prove what one developer gets.'
    }),
    S('references', 0, 'References', {
      scene: 'references', pill: 'First-party sources',
      groups: [
        { icon: '📦', title: 'Plugins and marketplaces', z: 'local', items: [
          { href: 'https://docs.github.com/copilot/concepts/customizations/plugins', label: 'Plugins for GitHub Copilot', description: 'States, components, and surfaces.' },
          { href: 'https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating', label: 'Creating a plugin', description: 'plugin.json, $schema, local install.' },
          { href: 'https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace', label: 'Creating a marketplace', description: 'marketplace.json shape.' },
          { href: 'https://github.blog/changelog/2026-10-28-repository-plugin-defaults-and-enterprise-plugin-controls-generally-available/', label: 'Plugin defaults and controls GA', description: 'Changelog, 2026-10-28.' }
        ] },
        { icon: '🏢', title: 'Policies and governance', z: 'github', items: [
          { href: 'https://docs.github.com/copilot/concepts/enterprise/policies', label: 'Copilot policies', description: 'Policy plane, multi-org rules.' },
          { href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo', label: 'Create .github-private', description: 'Configuration source.' },
          { href: 'https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings', label: 'Managed settings reference', description: 'Keys, overridable, telemetry.' },
          { href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams', label: 'Override settings for teams', description: 'Team files and merge rules.' }
        ] },
        { icon: '📡', title: 'Models, MCP, evidence', z: 'purple', items: [
          { href: 'https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/', label: 'Model policy API', description: 'Four levels, GET and PATCH.' },
          { href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist', label: 'MCP allowlist', description: 'Allow, deny, boundaries.' },
          { href: 'https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry', label: 'OpenTelemetry for agents', description: 'Identity and capture classes.' },
          { href: 'https://github.com/microsoft/apm', label: 'APM (microsoft/apm)', description: 'One manifest, many harnesses.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Enterprise Patterns', {
      scene: 'thanks', chrome: false,
      subtitle: 'One baseline, four layers, every team\'s choice.',
      cards: [{ value: 'Package', detail: 'One plugin, one id' }, { value: 'Place', detail: 'Each choice with its owner' }, { value: 'Prove', detail: 'Thirteen checks in the README' }],
      prompt: 'Which plugin does your organization copy between repositories by hand today, and which layer owns it?'
    })
  ];

  /* Speaker notes: the talk track for each slide.
     notes: lines starting with " are spoken; lines starting with → bridge to the next slide; others are presenter direction.
     know: facts to have ready for questions. cue: demo steps. sources: first-party evidence. seconds: time budget (estimates until a timed run-through). */
  const SRC = {
    concepts: { label: 'Plugins for GitHub Copilot (concepts)', href: 'https://docs.github.com/copilot/concepts/customizations/plugins' },
    aboutPlugins: { label: 'About plugins for the cloud agent', href: 'https://docs.github.com/copilot/concepts/agents/about-plugins' },
    cliCreate: { label: 'Creating a plugin for Copilot CLI', href: 'https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating' },
    cliMarket: { label: 'Creating a plugin marketplace for Copilot CLI', href: 'https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace' },
    pluginRef: { label: 'Plugin and marketplace reference', href: 'https://docs.github.com/copilot/reference/plugin-and-marketplace-reference' },
    cliPluginRef: { label: 'CLI plugin reference (plugin.json)', href: 'https://docs.github.com/copilot/reference/cli-plugin-reference#pluginjson' },
    vscodeRef: { label: 'VS Code agent plugin authoring reference', href: 'https://code.visualstudio.com/docs/agents/reference/agent-plugin-reference' },
    spec: { label: 'Agent Plugins specification', href: 'https://agent-plugins.org/specification' },
    ap10: { label: 'Changelog 2026-08-12: Agent Plugins 1.0', href: 'https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/' },
    defaultsGA: { label: 'Changelog 2026-10-28: repository plugin defaults and enterprise plugin controls GA', href: 'https://github.blog/changelog/2026-10-28-repository-plugin-defaults-and-enterprise-plugin-controls-generally-available/' },
    secExt: { label: 'Changelog 2026-10-28: security extension for the Copilot app', href: 'https://github.blog/changelog/2026-10-28-security-extension-for-the-github-copilot-app/' },
    policies: { label: 'Copilot policies (concepts)', href: 'https://docs.github.com/copilot/concepts/enterprise/policies' },
    orgPolicies: { label: 'Manage Copilot policies for an organization', href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies' },
    ghPrivate: { label: 'Create a .github-private repository (enterprise)', href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo' },
    entAgents: { label: 'Prepare for custom agents (enterprise)', href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents' },
    aiManagers: { label: 'Establish AI managers', href: 'https://docs.github.com/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers' },
    orgInstr: { label: 'Add organization custom instructions', href: 'https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-organization-instructions' },
    orgAgents: { label: 'Prepare for custom agents (organization)', href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents' },
    exclusion: { label: 'Content exclusion (concepts)', href: 'https://docs.github.com/copilot/concepts/context/content-exclusion' },
    firewall: { label: 'Customize the cloud agent firewall', href: 'https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall' },
    mcpAllow: { label: 'Configure an enterprise MCP allowlist', href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist' },
    managedRef: { label: 'Enterprise managed settings reference', href: 'https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings' },
    managePlugins: { label: 'Manage plugin marketplaces and plugins with managed settings', href: 'https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins' },
    teams: { label: 'Override settings for enterprise teams', href: 'https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams' },
    teamsCl: { label: 'Changelog 2026-08-03: enterprise team specialization', href: 'https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings' },
    cliConfig: { label: 'Copilot CLI configuration directory reference', href: 'https://docs.github.com/copilot/reference/copilot-cli-reference/cli-config-dir-reference' },
    enforce: { label: 'Changelog 2026-10-13: managed settings enforcement updates', href: 'https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates' },
    globalDefault: { label: 'Changelog 2026-10-22: global default for Copilot features', href: 'https://github.blog/changelog/2026-10-22-global-default-for-copilot-features-generally-available' },
    fusion: { label: 'Changelog 2026-10-28: Copilot Fusion', href: 'https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/' },
    modelPolicy: { label: 'Changelog 2026-10-19: model policy API', href: 'https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/' },
    telemetryCl: { label: 'Changelog 2026-10-12: telemetry attribution and capture', href: 'https://github.blog/changelog/2026-10-12-client-telemetry-user-attribution-and-configurable-capture/' },
    otel: { label: 'OpenTelemetry for agent monitoring', href: 'https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry' },
    kbSpaces: { label: 'Changelog 2025-10-17: Knowledge Bases convert to Copilot Spaces', href: 'https://github.blog/changelog/2025-10-17-copilot-knowledge-bases-can-now-be-converted-to-copilot-spaces' },
    intelligence: { label: 'Changelog 2026-10-28: GitHub intelligence (Dreaming)', href: 'https://github.blog/changelog/2026-10-28-github-intelligence-puts-your-code-context-and-history-to-work' },
    agentActivity: { label: 'Changelog 2026-08-07: usage metrics add agent app activity', href: 'https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity' },
    roi: { label: 'Changelog 2026-08-07: impact dashboard ROI section', href: 'https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section' },
    industry: { label: 'Changelog 2026-10-22: industry comparisons', href: 'https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard' },
    ghe: { label: 'Changelog 2026-10-28: GitHub Enterprise includes Copilot', href: 'https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot' },
    apm: { label: 'APM: Agent Package Manager (microsoft/apm)', href: 'https://github.com/microsoft/apm' },
    apmDocs: { label: 'APM documentation', href: 'https://microsoft.github.io/apm/' }
  };

  const NOTES = {
    title: { seconds: 30, sources: [SRC.defaultsGA, SRC.managedRef],
      notes: [
        `"One baseline can now reach every team while each team keeps its own choices. This hour shows how."`,
        `Point at the four rings: enterprise outside, then team, repository, and the developer in the middle. Every choice in this talk lands on one of these rings.`,
        `→ Start with the question you brought.`
      ],
      know: [
        `Audience: platform engineers and enterprise Copilot administrators who run the baseline, plus repository maintainers who own team defaults.`,
        `This talk absorbs the former Copilot plugins talk: packaging plugins is now Part 1 of the enterprise story.`
      ] },
    'core-question': { seconds: 90,
      notes: [
        `"How do I give every team the same Copilot setup without taking away their choices? If you run a platform team, you have probably asked this out loud."`,
        `Walk the four chips: enterprise, team, repository, personal. Four owners, four layers.`,
        `Role cards: the platform owner ships the baseline and blocks what nobody may use; the team lead adds what the team's work needs; the repository maintainer turns on useful defaults contributors can switch off.`,
        `"The answer: place each choice at the plane and layer its owner controls, then verify what one developer actually gets."`,
        `→ Four parts get us there.`
      ],
      know: [
        `Judgment lenses: Authority (which plane and layer owns which choice) and Verification (how to confirm the effective result). Context supports both.`,
        `Two planes: AI controls policies decide what is allowed; the settings plane decides what each client loads. Part 2 opens with both.`,
        `The tempting mistake runs backward: managed settings can force a plugin, and they have no way to recommend one. Recommendations belong in repositories.`
      ] },
    contents: { seconds: 30,
      notes: [
        `"Package, place, reuse, prove. Part 2 carries the two planes and the anchor demo; the other parts set it up and pay it off."`,
        `Keep this brisk.`
      ] },
    'three-asks': { seconds: 90, sources: [SRC.concepts, SRC.defaultsGA],
      notes: [
        `"One platform team supports several product teams across VS Code, Copilot CLI, the Copilot app, and the cloud agent."`,
        `Let the three ask cards land one at a time.`,
        `"Every team needs the same security baseline. The payments teams need one extra review plugin. One repository wants a scanner on by default that contributors can switch off."`,
        `"Three asks, three owners: the enterprise, one team, one repository. The whole talk puts each ask at its owner's layer."`,
        `→ First, the baseline needs a shape we can ship.`
      ],
      know: [
        `Plugins span VS Code, Copilot CLI, the Copilot app, and the cloud agent. Not every component works on every surface; LSP server configuration is CLI only.`,
        `Repository plugin defaults and enterprise require, block, and approved-marketplace controls became generally available on 2026-10-28 in VS Code, the CLI, and the Copilot app.`
      ] },
    'part-1': { seconds: 30,
      notes: [
        `"A plugin gives the baseline a shape you can version and ship: bundle it, publish it, install it by one id."`,
        `Say once, here: release-guard, platform-tools, pci-review, legacy-deploy, acme-corp, and the team slugs payments-core, payments-mobile, and platform-sre are names for a worked example. github-security@awesome-copilot is a real plugin in public preview.`,
        `→ Start with what platform teams copy today.`
      ] },
    'plugin-unit': { seconds: 90, sources: [SRC.concepts, SRC.ap10],
      notes: [
        `Let the motion run: five repositories each hold the same loose files, then the files collapse into one package.`,
        `"Today the release checklist skill, the release-notes MCP config, the reviewer agent, and the hooks live as copies in every repository. Five copies, five places to patch."`,
        `"A plugin bundles agents, skills, hooks, and MCP server configs so they install and update together. One release of release-guard reaches every repository that uses it."`,
        `→ What is inside the package?`
      ],
      know: [
        `Agent Plugins 1.0 is an open standard published 2026-08-06 with AWS, Anysphere, Microsoft, OpenAI, and Vercel; Google is a core maintainer.`,
        `GA in VS Code, Copilot CLI, the Copilot SDK, and the Copilot app on all plans (changelog 2026-08-12).`,
        `Agent Plugins needs no separate policy; existing plugin settings apply. The MCP allowlist stays a separate per-server control (Part 3).`
      ] },
    'plugin-anatomy': { seconds: 105, sources: [SRC.cliCreate, SRC.vscodeRef, SRC.spec, SRC.cliPluginRef],
      notes: [
        `Point at the green zone, then the purple zone, then the $schema line.`,
        `"The green zone is portable. Spec version 1 defines two component types: skills, one folder deep under skills/, and MCP servers in mcp.json. Any Agent Plugins client can load them."`,
        `"The purple zone is Copilot-only. VS Code reads agents, hooks, automations, and slash commands from com.github.copilot/ and ignores other clients' namespaces."`,
        `"Then the line that matters most: $schema. Without it, Copilot CLI reads the manifest as the legacy Copilot format."`,
        `→ One package. Now make it findable.`
      ],
      know: [
        `$schema value: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json. Copilot CLI also recognizes the 1.1.0 schema.`,
        `Fields shown match the documented example: $schema, name, description, version, author, license. Full field list: CLI plugin reference.`,
        `mcp.json: the spec defines the format; the exact top-level key is not confirmed, so treat any shape you show as illustrative.`,
        `Failure signal: a component works in the CLI and is missing elsewhere. Recovery: check that surface's docs before assuming parity.`
      ] },
    'marketplace-id': { seconds: 120, sources: [SRC.cliMarket, SRC.pluginRef, SRC.concepts, SRC.managePlugins],
      notes: [
        `"A marketplace is a repository with a marketplace.json. For Copilot CLI that file is the only required component."`,
        `Point at the name field, then watch the id assemble.`,
        `"The plugin name plus the marketplace name gives release-guard@platform-tools. Every policy file in Part 2 refers to that id. Pick a stable kebab-case marketplace name on day one; renaming it changes every id."`,
        `Point at the state strip as it lights. "Available means listed in a marketplace the developer can see. Installed means the files are on the client. Enabled means the client loads the components."`,
        `"Required is the locked variant: managed settings install it, enable it, and lock it on. Keep these states apart; in Part 2 a developer switches a plugin off and it stays installed."`,
        `→ Time for the first proof.`
      ],
      know: [
        `marketplace.json shape: name, owner, metadata, and plugins[] with name, description, version, and source.`,
        `github/copilot-plugins keeps its catalog at .github/plugin/marketplace.json.`,
        `The worked-example catalog acme-corp/platform-tools lists release-guard 1.4.0, pci-review 0.9.2, and legacy-deploy 3.1.0, so its ids are release-guard@platform-tools, pci-review@platform-tools, and legacy-deploy@platform-tools.`,
        `Who acts on which state: the enterprise controls availability through approved sources; the developer or policy installs; repository defaults or the developer enable.`
      ] },
    'local-trial': { seconds: 75, sources: [SRC.cliCreate],
      cue: [
        `Play the recorded local-install capture.`,
        `Live option: in a scratch folder run copilot plugin install ./release-guard, list plugins (copilot plugin --help shows the list subcommand), then start copilot and ask it to run the release checklist.`,
        `In VS Code the plugin appears under Customize in the Chat side panel.`
      ],
      notes: [
        `"Before any policy touches it, prove the package loads. One command installs release-guard from a folder."`,
        `"The plugin list shows the skill, the agent, and the MCP server. Then a session uses the skill and runs its script. A developer can run this test this afternoon."`,
        `→ The package works. Now decide who gets it.`
      ],
      know: [
        `A local plugin is cached; reinstall after an edit (copilot plugin install ./my-plugin) to pick up changes.`,
        `The exact list subcommand name and the output wording are not confirmed; the slide paraphrases the capture.`
      ] },
    'part-2': { seconds: 30,
      notes: [
        `"Each choice belongs at the plane and layer of the person who owns it. Policies decide what is allowed. The governance repository holds the settings. The org owns what the enterprise delegates. Four layers resolve one answer."`,
        `This part gets the most time and carries the anchor demo.`,
        `→ Start with the two planes.`
      ] },
    'two-planes': { seconds: 120, sources: [SRC.policies, SRC.orgPolicies, SRC.managedRef],
      notes: [
        `"Enterprise control arrives through two planes. Knowing which plane answers which question saves hours of searching the wrong page."`,
        `Walk the left column. "The policy plane lives in enterprise AI controls. Each policy is Enabled, Disabled, or Let organizations decide. Orgs choose only where the enterprise delegated. It decides what a licensed user may use at all: features, agents, models, MCP availability, Dreaming."`,
        `Walk the right column. "The settings plane runs from the governance repository's managed-settings.json, through team files and repository defaults, to the developer. It decides what each client loads: plugins, marketplaces, model default, Fusion tier, the MCP allowlist, telemetry, refresh."`,
        `Point at the outcome row. "A user licensed by several orgs usually gets the least restrictive policy. Across several enterprises, almost always the most restrictive."`,
        `→ The settings plane starts in one repository.`
      ],
      know: [
        `Team files follow the same least-restrictive idea per key on the settings plane.`,
        `Drift control: limit who holds enterprise owner or "Manage enterprise AI controls", and watch the audit log for policy changes.`,
        `MCP needs both planes: the "MCP servers in Copilot" policy allows MCP at all, and the managed-settings allowlist decides which servers run.`
      ] },
    'governance-repo': { seconds: 135, sources: [SRC.ghPrivate, SRC.entAgents, SRC.aiManagers],
      notes: [
        `Point at the left panel first. "Enterprise owners pick one org under AI controls, Agents, Configuration source. That org's .github-private becomes the enterprise's source of governance. The Configuration summary shows what it supplies."`,
        `Let the four rows light. "It holds managed-settings.json, team-mappings.json, the team files, and enterprise agent profiles."`,
        `"Settings reach every user on the plan with a supported client, whether or not they can read the repository. Choose Internal visibility so every member can propose changes by pull request."`,
        `Watch the shield close, then the pull request arrive. "Protect agent files using rulesets creates a ruleset: only enterprise owners and bypass actors edit agent profiles. Members with write access still open pull requests."`,
        `"AI managers merge them: a custom enterprise role with Manage enterprise AI controls and Read enterprise audit logs, on an enterprise team that holds ruleset bypass. Platform experts run governance without enterprise ownership."`,
        `→ Between the enterprise and the repository sits the org.`
      ],
      know: [
        `Private visibility works too; then you grant access by hand.`,
        `The generated ruleset also blocks org owners from org-level agents unless you scope it to the governance org.`,
        `Add CODEOWNERS and rulesets on copilot/ for the settings files the same way.`,
        `Enterprise custom roles are public preview.`,
        `The folder that holds enterprise-level agent profiles is unconfirmed; take the layout from the governance template. The org-level docs name /agents.`
      ] },
    'org-owns': { seconds: 120, sources: [SRC.orgPolicies, SRC.orgInstr, SRC.orgAgents, SRC.exclusion, SRC.firewall],
      notes: [
        `"The org sits on the policy plane. It has no slot in the settings-file chain; team files belong to enterprise teams, mapped from the governance repository."`,
        `Walk the five rows. "Policies: only where the enterprise chose Let organizations decide. Instructions: org custom instructions reach cloud sessions on GitHub and Copilot code review; local client sessions do not load them."`,
        `"Agents: /agents in the org's .github or .github-private repository, available to every member. Content exclusion: paths Copilot ignores for org-assigned seats. Firewall: the cloud agent firewall, Enabled, Disabled, or Let repositories decide."`,
        `"These controls reach the seats the org assigns. Plan them with the org owners when you plan the enterprise file."`,
        `→ Now the settings plane, layer by layer.`
      ],
      know: [
        `Org custom agents are public preview, and an enterprise ruleset can restrict them.`,
        `Content exclusion: repository admins also exclude paths in their own repositories; support varies by tool. The exact settings-page labels are unconfirmed.`,
        `Firewall: the setting covers the firewall and the recommended allowlist; org owners can stop repositories adding rules. It covers processes the Bash tool starts; MCP server processes and setup steps sit outside it.`
      ] },
    'four-layers': { seconds: 150, sources: [SRC.managePlugins, SRC.teams, SRC.concepts, SRC.defaultsGA],
      notes: [
        `Let the bands settle top to bottom, then trace the precedence arrow.`,
        `"Enterprise: .github-private/copilot/managed-settings.json, owned by enterprise owners and the platform team. It requires or blocks plugins, approves marketplaces, and marks keys overridable."`,
        `"Team: files under copilot/teams, mapped in team-mappings.json. The platform team owns them, and teams propose changes by pull request. They add plugins and set overridable keys."`,
        `"Repository: .github/copilot/settings.json, owned by maintainers, turning on defaults in trusted repositories. Personal: the developer's client, switching off defaults where supported."`,
        `"Read the right column as the guardrail. Each layer has something it cannot do, and that keeps the floor solid."`,
        `Point at the footer chips. "Three conditions decide whether a layer applies at all: team files need server-managed delivery, managed controls need GitHub Enterprise Cloud licenses, and repository defaults need a trusted repository."`,
        `→ The rule people get backward.`
      ],
      know: [
        `Precedence, highest first: enterprise, enterprise team, repository, personal.`,
        `MDM and file deployments cannot use team files; they need one file per group.`,
        `Licenses: GitHub Enterprise Cloud plus Copilot Business or Enterprise licenses, issued by the enterprise or one of its organizations.`,
        `Local opt-out of repository defaults works "where supported, subject to managed policy."`,
        `model was first documented as permissions.model; clients still read the nested value when the top-level key is absent. New configs use top-level model.`
      ] },
    'force-vs-recommend': { seconds: 120, sources: [SRC.managePlugins, SRC.defaultsGA],
      notes: [
        `"The same enabledPlugins true means two different things. In managed settings it means required: installed, enabled, locked on. In a repository it means default on."`,
        `"Managed settings have no recommend value. They require or they block."`,
        `Point at the orange outcome: "Put a recommendation in policy and it becomes a mandate. Nobody can remove it."`,
        `"Recovery: move it to .github/copilot/settings.json and delete it from enabledPlugins in policy. Maintainers own the default; developers own the opt-out."`,
        `→ Now each file in turn, starting at the top.`
      ],
      know: [
        `Docs quote: "Enterprise-managed settings can only require or block plugins. For project-specific defaults, use the repository's .github/copilot/settings.json file."`,
        `Managed settings beat repository defaults and member preferences.`
      ] },
    'enterprise-file': { seconds: 120, sources: [SRC.managePlugins, SRC.managedRef],
      notes: [
        `Let the three blocks light in turn.`,
        `"enabledPlugins first: release-guard true is required everywhere; legacy-deploy false is blocked everywhere."`,
        `"extraKnownMarketplaces adds platform-tools and awesome-copilot as known sources. strictKnownMarketplaces then limits installs to the listed sources."`,
        `"The tradeoff: strictKnownMarketplaces also turns off the built-in marketplaces. Any public marketplace you still want, like awesome-copilot, goes on the list explicitly."`,
        `→ The team layer adds on top of this floor.`
      ],
      know: [
        `Each extraKnownMarketplaces entry maps a name to { "source": { "source": "github", "repo": "ORG/REPO" } } and accepts an optional autoUpdate property.`,
        `The marketplace key must match the name in that marketplace's marketplace.json. Members need read access to each marketplace repository.`,
        `The awesome-copilot name is inferred from the documented id github-security@awesome-copilot; confirm it against that repository's marketplace.json before the demo.`,
        `extraKnownMarketplaces and strictKnownMarketplaces are both on the overridable key list, so the enterprise can open them to team files.`
      ] },
    'team-file': { seconds: 120, sources: [SRC.teams, SRC.teamsCl],
      notes: [
        `"team-mappings.json maps a settings file to enterprise team slugs: payments.json goes to payments-core and payments-mobile; fusion-high.json goes to platform-sre."`,
        `Point at the middle column as pci-review stacks on: "enabledPlugins in a team file is additive. It adds pci-review on top of the enterprise list, and it cannot unblock legacy-deploy. Every other key moves only when the enterprise marked it overridable."`,
        `Right column: "A developer in payments-core and platform-sre gets the least restrictive value per key across their team files, beneath enterprise settings. Here that makes fusionTier high."`,
        `→ The repository layer comes next.`
      ],
      know: [
        `Overridable keys: model, autoTier, fusionTier, permissions.disableBypassPermissionsMode, permissions.deny, permissions.ask, permissions.allow, allowedMcpServers, deniedMcpServers, extraKnownMarketplaces, strictKnownMarketplaces, sandbox.`,
        `Team specialization works only for server-managed deployments. MDM and file deployments need separate files per group.`,
        `Keep .github-private internal so teams can open pull requests proposing changes to their own files.`,
        `Permission key behavior inside a session is harness behavior; Harness Fundamentals covers it.`
      ] },
    'repo-defaults': { seconds: 90, sources: [SRC.aboutPlugins, SRC.defaultsGA, SRC.cliConfig, SRC.concepts],
      notes: [
        `"A maintainer turns on github-security for everyone who contributes to this repository. That is a recommendation, so it lives here."`,
        `"copilot config --repo writes .github/copilot/settings.json; --local writes settings.local.json. Only repo-overridable keys can be written there."`,
        `"It applies in trusted repositories, contributors can switch it off where the surface supports it, and managed policy still wins."`,
        `→ Now all four layers meet in one developer.`
      ],
      know: [
        `enabledPlugins in .github/copilot/settings.json is documented: the cloud agent installs plugins declaratively from it. The changelog confirms repositories "define a plugin marketplace and default plugins."`,
        `The repository-level marketplace key (shown as extraKnownMarketplaces) mirrors the managed shape and is not confirmed; verify it on the plugins concepts page before presenting it as fact.`,
        `Repository defaults also work for individual Copilot users without managed settings.`,
        `github-security@awesome-copilot is public preview; its Explain and Fix actions use AI credits, and alert features need GitHub Code Security.`
      ] },
    'anchor-demo': { seconds: 180, sources: [SRC.defaultsGA, SRC.managePlugins, SRC.teams, SRC.secExt],
      cue: [
        `Default: play the recorded captures in order, one per layer.`,
        `Live option: a GHEC test enterprise with forceRemoteSettingsRefresh on (so policy edits apply at the next startup), the acme-corp/platform-tools marketplace repository, and two enterprise teams. Sign in as a payments-core member and open the product repository in Copilot CLI.`,
        `Step 1: list plugins; release-guard is enabled with no action. Try to disable it; the client refuses.`,
        `Step 2: pci-review is enabled. Show a developer outside the payments teams for contrast.`,
        `Step 3: github-security@awesome-copilot is enabled by the repository default.`,
        `Step 4: switch github-security off. It stays installed and disabled.`,
        `Step 5 is the next slide: the blocked install.`
      ],
      notes: [
        `"Here is the anchor. One developer in payments-core opens the product repository in Copilot CLI."`,
        `Narrate each row as it arrives. "release-guard arrives from the enterprise, locked on. pci-review arrives from the team file. github-security arrives from the repository default."`,
        `"Then the developer switches github-security off. It stays installed and disabled. The switch belongs to them."`,
        `"Four owners, one list. Every row carries the layer that put it there."`,
        `→ And the one thing nobody here can install.`
      ],
      know: [
        `Required plugins are installed and enabled automatically, and users cannot disable them.`,
        `A developer outside the payments teams sees release-guard and github-security, without pci-review.`,
        `Live runs depend on server-managed delivery and a fresh startup; recorded captures remove that timing risk.`
      ] },
    'blocked-install': { seconds: 75, sources: [SRC.managePlugins, SRC.defaultsGA],
      notes: [
        `"legacy-deploy is blocked, so the install fails, and the developer sees why at install time."`,
        `"An install from a marketplace that strictKnownMarketplaces leaves off the list fails the same way. A visible refusal is the feature: nobody discovers the block three weeks later."`,
        `→ The same path carries much more than plugins.`
      ],
      know: [
        `The exact CLI refusal wording is not confirmed; the slide paraphrases. Play the dated recorded capture when exact text matters.`,
        `A team file cannot unblock a plugin the enterprise set to false.`
      ] },
    'part-3': { seconds: 40, sources: [SRC.managedRef],
      notes: [
        `"You just learned one path: enterprise, team, repository, personal. That path already carries models, MCP, context, and telemetry."`,
        `"This part covers where those values live and who owns them. How permissions, hooks, and sandboxing behave inside a session is harness behavior; Harness Fundamentals covers it."`,
        `→ Watch the same stack fill up.`
      ],
      know: [`Related talk: Harness Fundamentals (tech-talks/harness-fundamentals) owns permission rules, hooks, sandbox behavior, billing route, and acceptance.`] },
    'same-path': { seconds: 60, sources: [SRC.managedRef, SRC.enforce, SRC.mcpAllow],
      notes: [
        `Let the new chips slide into the enterprise and team bands.`,
        `"The enterprise file gains model, fusionTier, allowedMcpServers, telemetry, and forceRemoteSettingsRefresh. The platform-sre team file raises fusionTier. Same files, same owners, same review by pull request."`,
        `→ Models first, because two entries hide behind one word.`
      ] },
    'availability-vs-default': { seconds: 120, sources: [SRC.modelPolicy, SRC.fusion, SRC.managedRef],
      notes: [
        `"Two entries hide behind 'the model'. Availability: which models a team may use. Default: which one starts."`,
        `"Availability comes from the model policy REST API at four levels: enterprise, enterprise team, agent apps, and organization. One GET reads the platform-sre team's policy."`,
        `"Default comes from managed settings: model set to fusion, and fusionTier for effort, both marked overridable here."`,
        `"Fusion only routes among models the policy enables. A default naming a disabled model has nothing to route to, so check both entries for each team."`,
        `→ Now one team raises its effort.`
      ],
      know: [
        `Paths (confirmed): /enterprises/{enterprise}/copilot/model-policies, /enterprises/{enterprise}/teams/{team}/copilot/model-policies, /enterprises/{enterprise}/copilot/apps/model-policies, /orgs/{org}/copilot/model-policies.`,
        `Example: gh api -H "Accept: application/vnd.github+json" /enterprises/acme-corp/teams/platform-sre/copilot/model-policies.`,
        `The PATCH request body is not confirmed; take the schema from the REST reference.`,
        `Enterprise policy can delegate model control to organizations (organization mode) or to teams and apps (enterprise teams mode).`,
        `Copilot Fusion is GA, replaces the Auto option, and routes or combines models at Standard, High, or Max effort. Admins can disable a model for Fusion alone.`,
        `Fusion's published benchmark comparison is vendor-reported; keep it off slides as a measured result.`
      ] },
    'fusion-tier-team': { seconds: 105, sources: [SRC.managedRef, SRC.teams, SRC.fusion],
      notes: [
        `"The enterprise sets fusionTier to standard and marks it overridable. The fusion-high.json file sets high, and the mapping sends it to platform-sre."`,
        `Watch the two sessions start: "A payments-core developer starts at Standard. A platform-sre developer starts at High."`,
        `"The team file moved one key, the one the enterprise opened. Everything else holds."`,
        `→ The same managed file decides which MCP servers run.`
      ],
      know: [
        `fusionTier values from most to least restrictive: standard, high, max, unmanaged. Any value except unmanaged locks the tier against user and repository overrides.`,
        `fusionTier sets effort and does not choose the model; pair it with model: "fusion".`,
        `autoTier (efficiency, balance, intelligence, unmanaged) remains for model: "auto".`,
        `Local-model routing in Fusion is experimental preview.`
      ] },
    'mcp-allowlist': { seconds: 120, sources: [SRC.mcpAllow, SRC.managedRef, SRC.firewall],
      notes: [
        `Point at the JSON. "allowedMcpServers lists the servers permitted to run; anything unmatched is blocked. deniedMcpServers blocks unconditionally, even when a server matches the allowlist. Entries match by name, server URL, or command."`,
        `Let the three tests run. "The GitHub MCP URL matches the wildcard and runs. A command on neither list is blocked. The filesystem server pointed at the root matches the deny entry and is blocked; deny wins."`,
        `Point at the three side cards. "Three boundaries. The MCP servers in Copilot policy must be enabled first; that is the policy plane. The registry-only restriction is public preview, and the docs recommend this allowlist. MCP servers defined in repository custom agent profiles sit outside the list; the cloud agent firewall governs them."`,
        `→ MCP decides which tools run. Context decides what the agent knows.`
      ],
      know: [
        `The allow entries follow the docs example; the deny entry is a worked example of the documented serverCommand matcher.`,
        `Both keys live in managed-settings.json and are overridable, so a team file can widen or narrow them where the enterprise allows.`,
        `They cover MCP servers from user and repository settings, and Copilot connectors on supporting clients.`,
        `Pick one source of truth: the managed-settings allowlist or the preview registry restriction.`
      ] },
    'context-placement': { seconds: 105, sources: [SRC.orgInstr, SRC.kbSpaces, SRC.intelligence, SRC.concepts],
      notes: [
        `"Context has three scopes, and each has a home."`,
        `"Rules every task needs go in instructions and AGENTS.md; org instructions reach cloud sessions and code review only. Methods several repositories need go in a plugin skill, loaded on demand. Reference that spans repositories goes in Copilot Spaces; Knowledge Bases convert to Spaces."`,
        `"Dreaming keeps them current. It runs three dream types: personal memory curation, repository customization, and code review customization. It edits memories directly, and it proposes skill and instruction changes as pull requests maintainers review."`,
        `→ Telemetry rides the same path too.`
      ],
      know: [
        `Dreaming is public preview, opt-in, and uses AI credits. Admins enable it through Copilot policies on the policy plane; enterprises can delegate the choice to orgs.`,
        `Repository dreams cover repositories allowed by Copilot Memory repository access settings; users also opt in personally.`,
        `Rule of thumb: package a method as a plugin skill when several repositories need it; keep a rule in instructions when every task in one scope needs it.`,
        `Depth on instructions and skills lives in Copilot Primitives (tech-talks/copilot-primitives).`
      ] },
    'telemetry-capture': { seconds: 105, sources: [SRC.telemetryCl, SRC.otel, SRC.managedRef],
      notes: [
        `"Turn on identity and you can attribute activity to a person without capturing what they typed."`,
        `Point at the five off switches: prompts, responses, toolArguments, toolOutput, policyDetail. Each is off by default. Then the span: account, OS user, and machine name attached; no prompt text.`,
        `"Managed values beat local settings, SDK config, and environment variables. When several managed sources define telemetry, the highest one supplies the whole object. Nothing merges."`,
        `→ Last on this path: making sure clients run on current policy.`
      ],
      know: [
        `capture.identity adds the authenticated Copilot account name, local OS account, and machine name to OTel data.`,
        `toolArguments includes plugin, hook, and MCP identifiers; policyDetail includes items such as raw sandbox paths.`,
        `Captured content can include source code and file paths. Turn on only the class an investigation needs.`,
        `Fine-grained classes work in Copilot CLI, the Copilot app, and the VS Code Agent Host. VS Code's local harness honors only identity and legacy captureContent.`,
        `The exact telemetry nesting and the export and endpoint keys are not confirmed; take them from the managed settings reference.`
      ] },
    'fail-closed': { seconds: 90, sources: [SRC.enforce, SRC.globalDefault, SRC.managedRef],
      notes: [
        `"forceRemoteSettingsRefresh true makes clients fetch current policy at startup."`,
        `"When the fetch succeeds, the CLI and the Copilot app skip the one-hour cache. When it fails, the client fails closed; VS Code blocks Copilot features until the refresh succeeds. The tradeoff: a developer on a plane, behind a dropped VPN, or during a GitHub outage cannot start Copilot at all. Without this setting, the client would start on its cached policy, up to an hour old."`,
        `Third column: "The global default decides features left Unconfigured, and the sandbox key enforces a minimum client version."`,
        `→ Time to prove what one developer actually gets.`
      ],
      know: [
        `Delivered server-side, forceRemoteSettingsRefresh takes effect on the startup after the client first receives it. MDM or file delivery covers the first startup.`,
        `Global default for new GA features: Enabled, Disabled, or Let orgs decide. It applies only to features left Unconfigured and is set as an enterprise policy; it is not confirmed as a managed-settings key.`,
        `The sandbox key's value shape and sandbox behavior belong to Harness Fundamentals.`
      ] },
    'part-4': { seconds: 30,
      notes: [
        `"A baseline is ready when you can name the plane and layer behind every value one developer receives.         Check it, read the metrics, then name the limits."`,
                `"The thirteen-row effective-settings checklist lives in the README: one developer in two teams, every value, and the plane or layer that set it, repeated on a second surface. Run it after the talk."`,
                `→ Metrics add direction on top of it.`
              ],
              know: [
                `Effective settings resolve as enterprise values, then team files by least restrictive per key, then repository defaults, then personal choices.`
              ] },
    'usage-read': { seconds: 90, sources: [SRC.managePlugins, SRC.agentActivity, SRC.roi, SRC.industry],
      notes: [
        `"totals_by_plugin counts skill invocations tied to a plugin. Each totals array keeps the five most active entries, so a plugin missing from the list can still be in use. Keep plugin and skill counts separate; never add them together."`,
        `"Third-party agent app activity joins on agent_id. The impact dashboard ROI section and industry comparisons give direction. The checklist stays the proof."`,
        `→ Now the edges of the pattern.`
      ],
      know: [
        `Per-user agent activity entries omit session_count.`,
        `Industry comparisons are opt-in and not in the API.`,
        `This talk sets no saved-hours numbers; any target the audience writes down stays a target until measured locally.`,
        `Access requirements and field definitions live in the usage metrics REST docs linked from the manage-plugins page.`
      ] },
    'native-vs-apm': { seconds: 120, sources: [SRC.apm, SRC.apmDocs, SRC.managePlugins, SRC.spec],
      notes: [
        `Let rows light in the column that serves them.`,
        `"Native layers own the Copilot baseline: require and block, team differences, enforcement on Copilot surfaces, and models and telemetry on the same path."`,
        `"APM earns a place in two cases: one repository feeds several agent tools, or CI needs hash-pinned resolution so a fresh clone gets identical content. Run them side by side; APM writes repository files, and managed settings still win on Copilot surfaces."`,
        `→ One more boundary: licensing.`
      ],
      know: [
        `APM: one apm.yml, a lockfile that pins versions and content hashes, deployment to many harnesses, and apm-policy.yml at install time. Manifest spec v0.3 is a working draft. Lockfile field names are not reproduced here.`,
        `APM is an open-source Microsoft project with no relationship to managed settings.`,
        `Agent Plugins 1.0 is portable for skills and MCP; client-specific parts live in each client's namespace.`
      ] },
    'licensing-boundary': { seconds: 75, sources: [SRC.ghe, SRC.defaultsGA, SRC.secExt, SRC.fusion, SRC.intelligence],
      notes: [
        `"GitHub Enterprise now includes access to Copilot, metered on AI credits. Copilot Standalone is ten dollars per user per month for people outside a GitHub Enterprise."`,
        `"The managed controls in this talk need GitHub Enterprise Cloud with Copilot Business or Enterprise licenses, issued by the enterprise or its organizations. Fusion, plugin actions like Explain and Fix, and Dreaming all use AI credits."`,
        `→ Pull it together into one placement rule.`
      ],
      know: [`Self-serve availability rolls out in stages; Business and Enterprise plans remain.`] },
    'placement-scorecard': { seconds: 75, sources: [SRC.policies, SRC.managePlugins, SRC.teams],
      notes: [
        `"Every choice has a home. Policy when the question is whether something is allowed at all. Enterprise file when everyone must have it or nobody may. Team when a defined group needs more. Repository when contributors benefit by default and can work without it. Personal when it is preference."`,
        `"And elsewhere: APM for several agent tools or hash pinning, Harness Fundamentals for how a permission or hook behaves in a session."`,
        `→ Here is what changes.`
      ],
      know: [
        `Org settings carry delegated policies plus org-scoped controls: org instructions, org agents, content exclusion, and the cloud agent firewall.`,
        `Tradeoffs: locking keys gives consistency and costs team autonomy; strictKnownMarketplaces closes supply paths and removes built-in marketplaces; forceRemoteSettingsRefresh gives current policy at every startup and keeps Copilot closed without a connection to GitHub.`,
        `MDM or file deployments cannot use team overrides; plan per-group files.`
      ] },
    'before-after': { seconds: 45,
      notes: [
        `"Copied files become one plugin. Forced tools become repository defaults. Exceptions become team files. Guesswork becomes thirteen checks."`,
        `Land the numbers: one plugin baseline, four layers with one effective answer, thirteen checks per developer.`
      ] },
    today: { seconds: 50, sources: [SRC.cliCreate, SRC.cliMarket],
      notes: [
        `"Today: wrap one skill in a plugin and install it locally. This week: publish it and make it a repository default. This month: pilot one team mapping and pass the checklist for two developers."`,
        `"Hold strictKnownMarketplaces until every public marketplace you need is listed. Roll back by removing the team mapping or the enabledPlugins entry and restarting clients."`
      ] },
    references: { seconds: 15,
      notes: [`Leave this up as questions start. Every slide's notes carry its own first-party links.`],
      know: [`Related talks: Copilot Primitives, Harness Fundamentals, Copilot CLI, GitHub Agentic Workflows, and Agentic SDLC.`] },
    thanks: { seconds: 15,
      notes: [
        `"Which plugin does your organization copy between repositories by hand today, and which layer owns it?"`,
        `Take two answers from the room and place each one on a layer together.`
      ] }
  };
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'enterprise-patterns', title: 'Enterprise Patterns: One Baseline, Four Layers, Every Team\'s Choice', short: 'Enterprise Patterns', category: 'tech-talks', source: 'tech-talks/enterprise-patterns/README.md',
      question: 'How do I give every team the same Copilot setup without taking away their choices?',
      thesis: 'Policies decide what is allowed and one layered settings path carries plugins, models, MCP, and telemetry; place each choice at the plane and layer its owner controls, then verify the effective result for a real developer.'
    },
    slides
  };
})();
