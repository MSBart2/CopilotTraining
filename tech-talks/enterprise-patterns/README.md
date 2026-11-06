---
status: active
updated: 2026-11-05
section: "Trust and Govern"
audience: [platform-engineer, architect, team-lead]
level: advanced
duration: 60
format: core-talk
decision: "Which plane (AI controls policy or managed settings) and which layer (enterprise, org, team, repository, or personal) owns each plugin, model, MCP, and telemetry choice, and how do we confirm what one developer actually gets?"
prerequisites: [copilot-primitives]
related: [copilot-primitives, harness-fundamentals, copilot-cli, agentic-workflows, agentic-sdlc]
references:
  - url: https://docs.github.com/copilot/concepts/customizations/plugins
    label: "Plugins for GitHub Copilot"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings
    label: "Enterprise managed settings reference"
    verified: 2026-11-05
  - url: https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins
    label: "Managing plugin marketplaces and plugins with enterprise-managed settings"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
    label: "Overriding enterprise-managed settings for enterprise teams"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating
    label: "Creating a plugin for GitHub Copilot CLI"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace
    label: "Creating a plugin marketplace for GitHub Copilot CLI"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/reference/copilot-cli-reference/cli-config-dir-reference
    label: "GitHub Copilot CLI configuration directory"
    verified: 2026-11-05
  - url: https://code.visualstudio.com/docs/agents/reference/agent-plugin-reference
    label: "Agent plugin authoring reference (VS Code)"
    verified: 2026-11-05
  - url: https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry
    label: "OpenTelemetry for agent monitoring"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-28-repository-plugin-defaults-and-enterprise-plugin-controls-generally-available/
    label: "Repository plugin defaults and enterprise plugin controls generally available"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/
    label: "Agent Plugins 1.0 in VS Code, Copilot CLI, and the Copilot app"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings
    label: "Enterprise team specialization for managed settings"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates
    label: "Enterprise managed settings enforcement updates"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-22-global-default-for-copilot-features-generally-available
    label: "Global default for Copilot features generally available"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/
    label: "Route and orchestrate models with GitHub Copilot Fusion"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/
    label: "Copilot model policy API for enterprise, orgs, and teams"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-12-client-telemetry-user-attribution-and-configurable-capture/
    label: "Client telemetry user attribution and configurable capture"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity
    label: "Copilot usage metrics API adds agent app activity"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section
    label: "Copilot impact dashboard adds a return on investment section"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard
    label: "Industry comparisons in the Copilot impact dashboard"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot
    label: "GitHub Enterprise now includes access to GitHub Copilot"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2025-10-17-copilot-knowledge-bases-can-now-be-converted-to-copilot-spaces
    label: "Copilot knowledge bases can now be converted to Copilot Spaces"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-28-github-intelligence-puts-your-code-context-and-history-to-work
    label: "GitHub intelligence puts your code, context, and history to work"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-28-security-extension-for-the-github-copilot-app/
    label: "Security extension for the GitHub Copilot app"
    verified: 2026-11-05
  - url: https://github.com/microsoft/apm
    label: "APM - Agent Package Manager (microsoft/apm)"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/concepts/enterprise/policies
    label: "GitHub Copilot policies for enterprises and organizations"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
    label: "Creating a .github-private repository"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
    label: "Establishing AI managers in your enterprise"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-organization-instructions
    label: "Adding organization custom instructions"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents
    label: "Preparing to use custom agents in your organization"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/concepts/context/content-exclusion
    label: "Content exclusion for GitHub Copilot"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
    label: "Configuring an MCP server allowlist for your enterprise"
    verified: 2026-11-05
  - url: https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall
    label: "Customizing or disabling the firewall for GitHub Copilot"
    verified: 2026-11-05
  - url: https://github.blog/changelog/2026-10-28-github-intelligence-puts-your-code-context-and-history-to-work
    label: "GitHub intelligence: Memory, Dreaming, and code search"
    verified: 2026-11-05
---

# Enterprise Patterns: One Baseline, Four Layers, Every Team's Choice

> **The Question This Talk Answers:**
> *"How do I give every team the same Copilot setup without taking away their choices?"*

**Duration:** 60 minutes | **Audience:** Platform engineers and enterprise Copilot administrators who run the baseline, and repository maintainers who own team defaults

**Thesis:** One layered settings path now carries plugins, models, and policy; place each choice at the layer its owner controls, then verify the effective result for a real developer.

## Present and Study

- **[Open the deck](../../slides/tech-talks/enterprise-patterns/index.html)**: animated slides (37 slides). Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/enterprise-patterns/notes.html)**: the talk track, facts for questions, first-party sources, and a time budget for every slide. The notes are the reference for this talk; they print as a handout.

The deck and notes live in [`slides/tech-talks/enterprise-patterns/slides.js`](../../slides/tech-talks/enterprise-patterns/slides.js). Edit talk content there; this page stays a short landing page.

## 1. Package the Baseline

A plugin is now the unit a platform team ships. An Agent Plugins 1.0 `plugin.json` carries portable skills and MCP servers, `com.github.copilot/` holds Copilot-only agents and hooks, and a `marketplace.json` makes each plugin addressable as `PLUGIN@MARKETPLACE`.

## 2. Place Every Choice at Its Owner's Layer

Enterprise control arrives on two planes. AI controls policies, set by the enterprise and delegated to orgs where it chooses, decide what is allowed. The `.github-private` governance repository, protected by rulesets and run by AI managers, decides what each client loads. Orgs own their policies where delegated, plus org instructions, org custom agents, content exclusion, and the cloud agent firewall. The anchor demo then shows the four settings layers. The enterprise requires, blocks, and approves marketplaces. A team file adds a plugin. The repository's `.github/copilot/settings.json` turns on a default the developer can switch off. A blocked install fails visibly. Managed settings can force a plugin; recommendations belong in repositories.

## 3. Ride the Same Rails for Models, Context, and Telemetry

Model availability (the model policy REST API), the Copilot Fusion default and `fusionTier`, the MCP server allowlist, telemetry capture classes, and fail-closed policy refresh resolve through the same enterprise-to-personal path. Permission and hook mechanics inside a session belong to [Harness Fundamentals](../harness-fundamentals/README.md).

## 4. Prove the Result and Know Where It Stops

An effective-settings checklist confirms, for one developer in several teams on two surfaces, what applies and which layer set it. Usage metrics and the impact dashboard add directional evidence on top of that check. Native layers govern one enterprise's Copilot surfaces; APM adds one manifest for several agent tools and content-hash pinning. One slide covers licensing: GitHub Enterprise now includes Copilot, metered on AI credits.

## What You Can Do Today

### Today

- **Try:** Wrap one existing skill in an Agent Plugins 1.0 `plugin.json` (with `$schema`) and install it locally with `copilot plugin install ./PATH`.
- **Expected signal:** The plugin and its skill appear in the client's plugin list.
- **Validate:** Invoke the skill in a session; edit it, reinstall, and confirm the change loads.

### This Week

- **Build:** Publish the plugin through a `marketplace.json` repository and enable it as a default in one trusted product repository's `.github/copilot/settings.json`.
- **Expected signal:** Contributors get the plugin enabled as `PLUGIN@MARKETPLACE` and can turn it off.
- **Validate:** Run the marketplace, required-plugin, and repository-default rows of the effective-settings checklist for one contributor.

### This Month

- **Pilot:** In a test enterprise or a small team mapping, add an approved marketplace, one required plugin, one team file, and `forceRemoteSettingsRefresh`.
- **Success measure:** The full effective-settings checklist passes for two developers in different team combinations on two surfaces. Usage metrics read as directional only.
- **Boundary:** Hold `strictKnownMarketplaces` until every needed public marketplace is listed; roll back by removing the team mapping or `enabledPlugins` entry and restarting clients.

### Apply It to Your Work

- **Candidate task:** One plugin, skill, or MCP config the organization copies between repositories by hand today.
- **Decisive context:** Which teams need it, which Copilot surfaces they use, whether managed settings are server-delivered or MDM-delivered, and whether any repository also serves other agent tools.
- **Delegation and authority:** Enterprise owners (or AI managers) decide AI controls policies and which ones orgs decide. Org owners set org instructions, agents, content exclusion, and the firewall. Enterprise owners decide required, blocked, and approved sources in the governance repository. Teams propose their own file by pull request. Maintainers own repository defaults. Developers own what remains.
- **Evidence:** The effective-settings checklist for one real multi-team developer on two surfaces matches the intended layer for every row.

## Key Artifacts

Worked examples in the deck, notes, and [`research.md`](research.md). Plugin, marketplace, and team names are fictional; `github-security@awesome-copilot` is a real public-preview plugin.

- **`plugin.json` + `marketplace.json`**: an Agent Plugins 1.0 package with shared `skills/` and `mcp.json`, Copilot-only parts in `com.github.copilot/`, and its marketplace catalog.
- **Policy plane vs. settings plane map**: AI controls and org settings beside the `.github-private` governance repository, with rulesets and the AI managers role.
- **`managed-settings.json`**: required and blocked plugins, approved marketplaces (`extraKnownMarketplaces`, `strictKnownMarketplaces`), the MCP allowlist (`allowedMcpServers`, `deniedMcpServers`), `fusionTier`, telemetry capture, and `forceRemoteSettingsRefresh`.
- **`copilot/teams/payments.json` + `team-mappings.json`**: additive team plugins and overridable keys.
- **`.github/copilot/settings.json`**: a repository marketplace and default plugin contributors can turn off.
- **Model policy REST call**: read and update model availability per enterprise team.
- **Effective-settings checklist**: what one multi-team developer gets, and which layer set it ([full checklist below](#effective-settings-checklist)).
- **Native layers vs. APM decision table**: when to add APM.

### Effective-settings checklist

Pick one developer in two enterprise teams, one repository, and one surface. For each row, confirm the result and name the plane or layer that set it.

| # | Check | Expected result in the worked example | How to confirm |
|---|---|---|---|
| 1 | Which team files apply? | `payments.json` and `fusion-high.json`, from `team-mappings.json` | Read the mapping; confirm membership on the enterprise teams page |
| 2 | Required plugins present and locked | `release-guard` enabled; disable attempt refused | Client plugin list (`copilot plugin --help` for the list subcommand) |
| 3 | Team-added plugins (additive) | `pci-review` enabled | Same list; compare with a non-payments user |
| 4 | Blocked plugins | `legacy-deploy` install fails | Attempt install; record the message |
| 5 | Marketplaces | Only `platform-tools` and `awesome-copilot` visible; built-ins absent | Marketplace browse in the client |
| 6 | Repository defaults | `github-security` enabled, can be turned off | Open the repo; toggle it; confirm the managed list did not change |
| 7 | Overridable keys across teams | `fusionTier` = `high` (least restrictive across the user's teams) | Start a new conversation; check the Fusion effort shown |
| 8 | Model availability | Models used by Fusion are enabled for this team | `gh api …/teams/{team}/copilot/model-policies` |
| 9 | Telemetry | Identity attributes present; no prompt or tool content | Inspect one exported OTel span |
| 10 | Freshness | Client starts only after a successful policy fetch | Start offline once in a test environment; expect fail-closed |
| 11 | Policy plane | Features and models match the enterprise policy, or the org's choice where delegated; across two licensing orgs, the least restrictive applies | Enterprise AI controls and org Copilot policies; the user's Copilot features page |
| 12 | Org-owned context and limits | Org instructions appear in a cloud agent session and code review and stay out of a local CLI session; an excluded path is ignored; an MCP server outside the allowlist is refused | Start a cloud agent task; open an excluded file; start an unlisted MCP server |
| 13 | Repeat on a second surface | Same answers in VS Code and the Copilot app, apart from documented surface differences such as CLI-only LSP config | Repeat checks 2–9 and 12 |

When an answer surprises you, find the layer: a key the enterprise never marked overridable, least-restrictive merge across teams, or an untrusted repository.

## Related Patterns

- **[Copilot Primitives](../copilot-primitives/README.md)**: the instructions, skills, agents, and MCP servers a plugin packages.
- **[Harness Fundamentals](../harness-fundamentals/README.md)**: permission, hook, and sandbox behavior inside a session; this talk covers where those settings live and who owns them.
- **[Copilot CLI](../copilot-cli/README.md)**: the `copilot plugin` and `copilot config` workflows used in the demo.
- **[GitHub Agentic Workflows](../agentic-workflows/README.md)**: repository automation that runs on the same plugin and settings baseline.
- **[Agentic SDLC](../agentic-sdlc/README.md)**: broader delivery-system change built on a shared baseline.
- **[Decision guide](../DECISION-GUIDE.md)**: compare related practitioner talks.

## References

First-party sources for every claim are listed per slide in the [speaker notes](../../slides/tech-talks/enterprise-patterns/notes.html) and in the `references` frontmatter above.
