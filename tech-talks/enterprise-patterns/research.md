# Enterprise Patterns: research

Authoring input for Native Deck Author. Not published. Rebuilt 2026-11-05; absorbs the former `copilot-plugins` talk.

## Approved brief

**Approved 2026-11-05:** Structure A. Toggles: **scenario-first cold open** (the demo lands in Part 2), and **licensing as one boundary slide** (Part 4). The brief's Parts 4 and 5 merge into one closing section so the deck stays within four sections.

**Question this talk answers:**
> "How do I give every team the same Copilot setup without taking away their choices?"

**Thesis:** One layered settings path now carries plugins, models, and policy; place each choice at the layer its owner controls, then verify the effective result for a real developer.

**Audience:** Platform engineers and enterprise Copilot administrators, plus repository maintainers who own team defaults.

**Judgment lenses:** Authority (which layer owns which choice) and Verification (how to confirm the effective result one developer gets). Context is a supporting lens (what the baseline carries).

**Tension:** Platform teams want one baseline everyone gets; teams want to choose their own tools. The layered model resolves this only when each choice sits at the layer of the person who owns it. The tempting mistake runs backward: managed settings can *force* a plugin but cannot *recommend* one, so recommendations belong in repositories.

**Memorable anchor:** One plugin, four layers, one effective answer. Required by the enterprise, added by a team, defaulted by a repository, turned off by a developer where allowed, and a blocked install that fails visibly.

**Cold open (scenario-first):** A platform team supports several product teams across VS Code, Copilot CLI, the Copilot app, and the cloud agent. Every team needs the same security baseline; the payments team needs one extra review plugin; one repository wants a scanner its contributors can switch off. The question on the opening slide is the learner's question. The demo waits for Part 2.

**Worked example note (say once, in the Part 1 opener's notes):** `platform-tools`, `release-guard`, `pci-review`, `legacy-deploy`, `acme-corp`, and the team slugs are fictional names for a worked example. `github-security@awesome-copilot` is a real, public-preview plugin.

### Sections and time

| # | Part | Minutes | Primary artifact |
|---|---|---|---|
| 1 | Package the Baseline | ~10 | `plugin.json` (Agent Plugins 1.0) + `marketplace.json` |
| 2 | Place Every Choice at Its Owner's Layer (anchor demo) | ~21 | policy plane vs. settings plane; `.github-private` governance repo (rulesets, AI managers); org-owned controls; `managed-settings.json`, `copilot/teams/payments.json` + `team-mappings.json`, `.github/copilot/settings.json` |
| 3 | Ride the Same Rails for Models, Context, and Telemetry | ~13 | model-policy REST call, MCP allowlist, managed-settings excerpt |
| 4 | Prove the Result and Know Where It Stops | ~13 | effective-settings checklist + usage metrics read; native layers vs. APM decision table; one licensing boundary slide |

The deck has four parts; the README carries one `##` per part. Part 4 below keeps the proof material and the boundary material as two subsections.

### Evidence map

| Claim or mechanism | First-party source | Confidence | Boundary or unknown |
|---|---|---|---|
| Repo plugin defaults + enterprise require/block/approved marketplaces are GA in VS Code, CLI, Copilot app | [Changelog 2026-10-28: repository plugin defaults and enterprise plugin controls](https://github.blog/changelog/2026-10-28-repository-plugin-defaults-and-enterprise-plugin-controls-generally-available/) | Verified | Managed controls need GitHub Enterprise Cloud + Copilot Business/Enterprise licenses issued by the enterprise or one of its orgs. Repo defaults apply only in trusted repositories |
| Managed settings beat repository defaults and member preferences; managed settings only require or block; optional plugins go in `.github/copilot/settings.json` | [Manage plugin marketplaces and plugins with managed settings](https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) | Verified | Local opt-out of repo defaults works "where supported, subject to managed policy" |
| `enabledPlugins` keys are `PLUGIN@MARKETPLACE`; `true` requires, `false` blocks; marketplace name comes from `marketplace.json` `name` | Same page | Verified | Use a stable kebab-case marketplace name; identifiers depend on it |
| `extraKnownMarketplaces` entries: name → `{ "source": { "source": "github", "repo": "ORG/REPO" } }`; optional `autoUpdate`; `strictKnownMarketplaces` restricts installs to listed sources and disables built-in marketplaces | Same page; [Enterprise managed settings reference](https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings) | Verified | Members need read access to each marketplace repository |
| Plugins have available / installed / enabled states and span VS Code, CLI, Copilot app, cloud agent | [Plugins for GitHub Copilot (concepts)](https://docs.github.com/copilot/concepts/customizations/plugins) | Verified | Not every component works on every surface (LSP config is CLI-only) |
| Agent Plugins 1.0: `plugin.json` at root with `$schema`; portable `skills/` and `mcp.json`; Copilot-only components under `com.github.copilot/` | [Creating a plugin for Copilot CLI](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating); [VS Code agent plugin authoring reference](https://code.visualstudio.com/docs/agents/reference/agent-plugin-reference); [Agent Plugins spec](https://agent-plugins.org/specification); [Changelog 2026-08-12](https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/) | Verified | Spec v1 defines exactly two component types (skills, MCP servers); clients ignore what they do not support. CLI also recognizes the 1.1.0 schema |
| `marketplace.json` shape: `name`, `owner`, `metadata`, `plugins[]` with `name`, `description`, `version`, `source` | [Creating a plugin marketplace](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace); [Plugin and marketplace reference](https://docs.github.com/copilot/reference/plugin-and-marketplace-reference) | Verified | For Copilot CLI, `marketplace.json` is the only required marketplace component |
| Team specialization: `copilot/teams/*.json` + `copilot/team-mappings.json` in `.github-private`; `{ "overridable": VALUE }` marks eligible keys; `enabledPlugins` is additive; multi-team users get the least restrictive value per key, applied beneath enterprise settings | [Override settings for enterprise teams](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams); [Changelog 2026-08-03](https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings) | Verified | Server-managed deployments only; MDM/file deployments need separate files per group. The brief listed `extraKnownMarketplaces` as additive; the docs list it among *overridable* keys. The docs win |
| `forceRemoteSettingsRefresh: true` fails closed; `sandbox` key enforces a minimum client version | [Changelog 2026-10-13](https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates); managed settings reference | Verified | A server-managed value takes effect on the startup *after* the client first receives it; MDM/file delivery covers first startup |
| `fusionTier`: `standard` / `high` / `max` / `unmanaged`; does not select the model; any value other than `unmanaged` locks the tier; `{ "overridable": "standard" }` lets teams change it | Managed settings reference; [Changelog 2026-10-28: Copilot Fusion](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/) | Verified | Fusion only routes among models enabled by enterprise/org model policy. Local-model routing is experimental preview |
| Model policy REST API (GET/PATCH) at four levels: enterprise, enterprise team, agent apps, org | [Changelog 2026-10-19](https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/) | Verified (paths) | PATCH request body not confirmed; shown as illustrative |
| Global default for new GA features: Enabled / Disabled / Let orgs decide | [Changelog 2026-10-22](https://github.blog/changelog/2026-10-22-global-default-for-copilot-features-generally-available) | Verified | Applies only to features left Unconfigured. Set as an enterprise policy; not confirmed as a `managed-settings.json` key |
| Telemetry: `capture.identity` + five capture classes (`prompts`, `responses`, `toolArguments`, `toolOutput`, `policyDetail`), all off by default; managed values beat local, SDK, env; highest-precedence managed source supplies the whole `telemetry` object (no merge) | [Changelog 2026-10-12](https://github.blog/changelog/2026-10-12-client-telemetry-user-attribution-and-configurable-capture/); managed settings reference; [OpenTelemetry for agent monitoring](https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry) | Verified (names, defaults) | Exact nesting and the export/endpoint keys not confirmed; JSON shown as illustrative. Fine-grained classes work in CLI, Copilot app, VS Code Agent Host; VS Code's local harness honors only `identity` and legacy `captureContent` |
| Usage metrics `totals_by_plugin` counts skill invocations tied to a plugin; top five entries only; do not add plugin and skill counts | Manage plugin marketplaces page (Monitor plugin usage) | Verified | Not an adoption count; absence ≠ zero |
| Usage metrics join third-party agent activity on `agent_id` | [Changelog 2026-08-07: agent app activity](https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity) | Verified | Per-user entries omit `session_count` |
| Impact dashboard ROI section and industry comparisons | [Changelog 2026-08-07: ROI section](https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section); [Changelog 2026-10-22: industry comparisons](https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard) | Verified | Directional evidence only; industry comparisons are opt-in and not in the API |
| GitHub Enterprise includes Copilot, metered on AI credits; Standalone $10/user/month for non-GHE members | [Changelog 2026-10-28: GHE includes Copilot](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot) | Verified | Self-serve rolling out in stages; Business/Enterprise plans remain |
| Knowledge Bases retired, replaced by Copilot Spaces | [Changelog 2025-10-17](https://github.blog/changelog/2025-10-17-copilot-knowledge-bases-can-now-be-converted-to-copilot-spaces) | Verified | — |
| Dreaming has three dream types (personal memory curation, repository customization, code review customization); it edits memories directly and proposes changes to checked-in skills and instructions as pull requests; admins enable it through Copilot policies and enterprises can delegate the choice to orgs | [Changelog 2026-10-28: GitHub intelligence](https://github.blog/changelog/2026-10-28-github-intelligence-puts-your-code-context-and-history-to-work) | Verified | Public preview, opt-in, uses AI credits; repository dreams cover repositories allowed by Copilot Memory's repository access settings; users also opt in personally |
| Two planes: AI controls policies (enterprise sets Enabled / Disabled / Let organizations decide; orgs decide only where delegated) decide what is allowed; users licensed by several orgs get the least restrictive policy, users licensed by several enterprises get the most restrictive | [Copilot policies for enterprises and organizations](https://docs.github.com/copilot/concepts/enterprise/policies); [Manage org policies](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) | Verified | Some policies cover everyone (for example blocking Copilot in the cloud in enterprise repos); not every policy applies to every surface; a separate setting covers enterprise-assigned users |
| `.github-private` is the enterprise governance repository: selected as "Configuration source" under AI controls → Agents; holds agent profiles, client permissions, and plugin settings; settings apply whether or not members can read the repo | [Create a `.github-private` repository](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo); [Prepare for custom agents (enterprise)](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents) | Verified | A generated ruleset lets only enterprise owners (and bypass actors) edit agent profiles; members with write access can still open PRs. The ruleset also blocks org owners from org-level agents unless scoped to the governance org |
| AI managers: an enterprise custom role ("Manage enterprise AI controls" plus "Read enterprise audit logs") assigned to an enterprise team, with bypass on the agent-profile ruleset | [Establish AI managers](https://docs.github.com/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) | Verified | Enterprise custom roles are public preview |
| Org custom agents live in `/agents` of the org's `.github` or `.github-private` repo and are available to all org members | [Prepare for custom agents (organization)](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents) | Verified | Custom agents are public preview; an enterprise ruleset can restrict org-level agents |
| Org custom instructions are set in org settings → Copilot → Custom instructions | [Add organization instructions](https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-organization-instructions) | Verified | Applies on the GitHub website (cloud sandboxes, Actions) and Copilot code review; local client sessions do not load them |
| Content exclusion: repository admins exclude for their repos; org owners exclude for seats their org assigns | [Content exclusion](https://docs.github.com/copilot/concepts/context/content-exclusion) | Verified | Support varies by tool and by inline vs. chat/agent; check the availability table |
| `allowedMcpServers` / `deniedMcpServers` in `managed-settings.json` are the GA MCP allowlist; deny wins over allow; they also govern Copilot connectors on supporting clients | [Configure an MCP allowlist](https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist); managed settings reference | Verified | Do not cover MCP servers defined in repository custom agent profiles (use the cloud agent firewall); the "MCP servers in Copilot" policy must be enabled; the registry-URL restriction is public preview and not the recommended method |
| Cloud agent and code review firewall: org owners set Enabled / Disabled / Let repositories decide for the firewall and the recommended allowlist, and can stop repositories adding their own rules | [Customize the agent firewall](https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall) | Verified | Covers processes started by the agent's Bash tool inside its environment; MCP server processes and setup steps are outside it; the docs call it protection for common scenarios |
| Real plugin for the demo: `copilot plugin install github-security@awesome-copilot` | [Changelog 2026-10-28: security extension](https://github.blog/changelog/2026-10-28-security-extension-for-the-github-copilot-app/) | Verified | Public preview; Explain/Fix actions consume AI credits; alert features need GitHub Code Security |
| APM: one `apm.yml`, lockfile pins versions + content hashes, deploys to many harnesses, `apm-policy.yml` at install time; manifest spec v0.3 working draft | [microsoft/apm](https://github.com/microsoft/apm); [APM docs](https://microsoft.github.io/apm/) | Verified | Not a GitHub product; no relationship to managed settings |

**Dropped from the previous deck:** saved-hours and 16.1-ratio arithmetic; Knowledge Base sections; seat-licensing framing; the September 2026 deprecation notice; compliance and human-review/merge-authority content (out of scope for this talk).

### Scope hand-off to harness-fundamentals

`tech-talks/harness-fundamentals` owns the organization controls *around the harness*: access, model availability as a harness concern, permission and hook mechanics (`permissions.*`, hooks, sandbox behavior), billing route, and acceptance. This talk teaches model policy, Fusion tier, and telemetry capture **only as entries on the same layered managed-settings path** (enterprise → team → repository → personal): where each value lives, who owns it, and how to verify what a developer receives. When a question turns to *how* a permission rule, hook, or sandbox behaves inside a session, the notes hand off explicitly: "That is harness behavior; Harness Fundamentals covers it." Name the hand-off on the Part 3 opener slide and again on the related-talks slide.

---

## Part 1: Package the Baseline (~10 min)

**Claim:** A plugin is now the unit a platform team distributes. One Agent Plugins 1.0 package carries portable skills and MCP servers, plus Copilot-only agents and hooks in a namespaced folder, and a marketplace makes it addressable as `PLUGIN@MARKETPLACE`.

**Mechanism:**
- Plugins bundle agents, skills, hooks, and MCP server configs so they install and update together ([concepts](https://docs.github.com/copilot/concepts/customizations/plugins)).
- Agent Plugins 1.0 is an open standard (published Aug 6, 2026, with AWS, Anysphere, Microsoft, OpenAI, Vercel; Google as core maintainer). GA in VS Code, Copilot CLI, the Copilot SDK, and the Copilot app on all plans ([changelog](https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/)).
- The manifest sits at the plugin root and declares `$schema: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`. Without that `$schema`, Copilot CLI treats the manifest as the legacy Copilot format ([CLI create a plugin](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating)).
- Spec v1 defines exactly two component types: skills (`skills/NAME/SKILL.md`, one level deep) and MCP servers (`mcp.json`). Clients ignore types they do not support ([spec](https://agent-plugins.org/specification)).
- VS Code reads Copilot-specific components (agents, hooks, automations, slash commands) from `com.github.copilot/` and ignores other clients' namespaces ([VS Code reference](https://code.visualstudio.com/docs/agents/reference/agent-plugin-reference)).
- A marketplace is a repository with a `marketplace.json`; the CLI needs nothing else ([marketplace how-to](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace)).

**Three states to separate (the vocabulary Part 2 depends on):**
- **Available:** the plugin is listed in a marketplace the user can see.
- **Installed:** the files are on the client.
- **Enabled:** the client loads its components.

Required plugins are automatically installed and enabled, and users cannot disable them ([changelog 2026-10-28](https://github.blog/changelog/2026-10-28-repository-plugin-defaults-and-enterprise-plugin-controls-generally-available/)).

**Artifact 1: plugin layout and `plugin.json` (Agent Plugins 1.0)**

```text
release-guard/
├── plugin.json
├── skills/
│   └── release-checklist/
│       ├── SKILL.md
│       └── scripts/verify-changelog.sh
├── mcp.json
└── com.github.copilot/
    ├── agents/
    │   └── release-reviewer.agent.md
    └── hooks/
        └── hooks.json
```

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "release-guard",
  "description": "Release checklist skill, release-notes MCP server, and a read-only release reviewer agent",
  "version": "1.4.0",
  "author": { "name": "Platform Engineering", "email": "platform@example.com" },
  "license": "MIT"
}
```

Fields shown match the documented example (`$schema`, `name`, `description`, `version`, `author`, `license`). The layout matches the VS Code reference. For the full field list, see the [CLI plugin reference](https://docs.github.com/copilot/reference/cli-plugin-reference#pluginjson).

`mcp.json` (shape **illustrative**; the spec defines the format, but the exact top-level key was not confirmed for this brief):

```json
{
  "mcpServers": {
    "release-notes": {
      "type": "http",
      "url": "https://mcp.example.com/release-notes"
    }
  }
}
```

**Artifact 2: `marketplace.json`** (in the `acme-corp/platform-tools` repository; the file location in the repo follows the CLI docs, and `github/copilot-plugins` keeps it at `.github/plugin/marketplace.json`)

```json
{
  "name": "platform-tools",
  "owner": { "name": "Platform Engineering", "email": "platform@example.com" },
  "metadata": {
    "description": "Approved Copilot plugins for Acme engineering",
    "version": "2026.11.0"
  },
  "plugins": [
    { "name": "release-guard", "description": "Release checklist, release-notes MCP, reviewer agent", "version": "1.4.0", "source": "./plugins/release-guard" },
    { "name": "pci-review", "description": "Payments review skill and agent", "version": "0.9.2", "source": "./plugins/pci-review" },
    { "name": "legacy-deploy", "description": "Superseded deploy helper", "version": "3.1.0", "source": "./plugins/legacy-deploy" }
  ]
}
```

The `name` (`platform-tools`) becomes the suffix of every plugin ID: `release-guard@platform-tools`.

**Evidence the deck shows:** `copilot plugin install ./release-guard` from a local path, then the plugin in the client's plugin list with its skill and agent visible. In VS Code, the plugin shows under Customize in the Chat side panel.

**Boundary:**
- Components vary by surface. LSP server configuration is Copilot CLI only; agents and hooks under `com.github.copilot/` are Copilot-specific and other agent clients ignore them. Failure signal: a component that works in the CLI and is missing in another surface. Recovery: check that surface's docs before assuming parity.
- Renaming a marketplace changes every plugin ID that policy references. Pick a stable kebab-case name on day one.

**Facts to know:**
- Copilot CLI recognizes Agent Plugins schemas 1.0.0 and 1.1.0 ([plugin and marketplace reference](https://docs.github.com/copilot/reference/plugin-and-marketplace-reference)).
- The legacy Copilot format remains for configurable component paths in the CLI ([CLI create a plugin](https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating)).
- A local plugin is cached; to pick up edits, reinstall it (`copilot plugin install ./my-plugin`) (same page).
- Agent Plugins needs no separate policy; the existing plugin settings apply ([changelog 2026-08-12](https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/)). MCP allowlists (`allowedMcpServers` / `deniedMcpServers`) remain a separate per-server control.

---

## Part 2: Place Every Choice at Its Owner's Layer (~21 min, anchor demo)

**Claim:** Each choice has an owner, and each owner has a layer. The enterprise requires, blocks, and approves sources. Teams add what their work needs. Repositories recommend. Developers decide what is left. Managed settings can force a plugin but cannot recommend one.

### Two planes: what is allowed, and what each client loads

Enterprise control arrives through two planes. Teach them together so the audience knows which page or file answers which question.

| Plane | Where it lives | Resolves | Decides |
|---|---|---|---|
| **Policy plane** | Enterprise → AI controls; Organization → Settings → Copilot | Enterprise first. Each policy is Enabled, Disabled, or "Let organizations decide"; orgs choose only where delegated | Which features, agents, and models a licensed user may use, plus MCP availability, Dreaming, and other feature policies |
| **Settings plane** | `.github-private` governance repository → repository → client | `managed-settings.json` → team files → `.github/copilot/settings.json` → personal | What each Copilot client loads and enforces: plugins, marketplaces, model default, Fusion tier, MCP allowlist, telemetry, refresh |

- **Multi-org users:** a user licensed by several orgs in one enterprise usually gets the **least restrictive** policy. A user licensed by several enterprises almost always gets the **most restrictive** ([policies concepts](https://docs.github.com/copilot/concepts/enterprise/policies)). Team files follow the same least-restrictive idea per key.
- **Drift control:** limit who holds enterprise owner or "Manage enterprise AI controls", and watch the audit log for policy changes.

### The governance repository

`.github-private` in one organization of the enterprise is the enterprise's **source of governance**. Enterprise owners select that org under AI controls → Agents → Configuration source; the "Configuration summary" shows what the repo supplies ([create the repo](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo)).

- **Contents:** `copilot/managed-settings.json`, `copilot/team-mappings.json`, `copilot/teams/*.json`, and enterprise-level custom agent profiles.
- **Reach:** settings apply to every user on the enterprise's Copilot plan using a supported client, whether or not they can read the repository. Choose **Internal** visibility so every member can propose changes by PR; choose **Private** to grant access by hand.
- **Protection:** AI controls → Agents → "Protect agent files using rulesets" creates a ruleset so only enterprise owners and bypass actors edit agent profiles. Members with write access still open PRs. The same ruleset blocks org owners from org-level agents unless you scope it to the governance org ([prepare for custom agents](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents)). Add CODEOWNERS and rulesets on `copilot/` for the settings files the same way.
- **AI managers:** a custom enterprise role with "Manage enterprise AI controls" and "Read enterprise audit logs", assigned to an enterprise team that holds ruleset bypass. Platform SMEs then run AI controls and merge governance PRs without enterprise ownership (custom roles are public preview) ([establish AI managers](https://docs.github.com/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers)).

### What the organization owns

Org owners hold their own controls for the seats their org assigns, inside whatever the enterprise delegated:

| Control | Where | Reach and boundary |
|---|---|---|
| Feature, model, and MCP policies | Org Settings → Copilot → Policies / Models | Only where the enterprise chose "Let organizations decide" ([manage org policies](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies)) |
| Org custom instructions | Org Settings → Copilot → Custom instructions | Cloud sessions on GitHub and Copilot code review; local client sessions do not load them ([org instructions](https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-organization-instructions)) |
| Org custom agents | `/agents` in the org's `.github` or `.github-private` repo | Available to every org member; an enterprise ruleset can restrict them; public preview ([org custom agents](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents)) |
| Content exclusion | Org Settings → Copilot → Content exclusion | Applies to users with an org-assigned seat; repository admins also exclude paths in their own repositories; support varies by tool ([content exclusion](https://docs.github.com/copilot/concepts/context/content-exclusion)) |
| Cloud agent and code review firewall | Org Settings → Copilot → Internet access | Enabled / Disabled / Let repositories decide for the firewall and the recommended allowlist; org owners can stop repositories adding rules ([firewall](https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall)) |

Teaching point: the org sits on the policy plane. It has no slot in the settings-file chain between team and repository; team files are enterprise teams, mapped from the governance repository.

### The settings plane, layer by layer

**Mechanism (precedence, highest first):**

| Layer | File | Owner | Can do | Cannot do |
|---|---|---|---|---|
| Enterprise | `.github-private/copilot/managed-settings.json` | Enterprise owners / platform team | Require (`true`) or block (`false`) plugins; add or restrict marketplaces; lock or mark keys `overridable` | Make a plugin optional-on-by-default |
| Enterprise team | `.github-private/copilot/teams/*.json`, mapped in `copilot/team-mappings.json` | Platform team, with PRs from the team | Add `enabledPlugins` on top of the baseline; set values for keys marked `overridable` | Change keys the enterprise did not mark `overridable` |
| Repository | `.github/copilot/settings.json` | Repository maintainers | Declare a marketplace and enable default plugins for contributors in trusted repositories | Override managed settings |
| Personal | client settings | Developer | Turn off repository defaults where supported; install from allowed marketplaces | Disable a required plugin; install from an unapproved marketplace under `strictKnownMarketplaces` |

Sources: [manage plugin marketplaces](https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins), [override settings for teams](https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams), [concepts](https://docs.github.com/copilot/concepts/customizations/plugins).

**The "force vs. recommend" rule:** "Enterprise-managed settings can only require or block plugins. For project-specific defaults, use the repository's `.github/copilot/settings.json` file." That moves recommendations out of policy and into the repositories that own them.

**Artifact 3: enterprise `managed-settings.json`** (plugin keys; the full baseline appears again in Part 3)

```json
{
  "extraKnownMarketplaces": {
    "platform-tools": {
      "source": { "source": "github", "repo": "acme-corp/platform-tools" }
    },
    "awesome-copilot": {
      "source": { "source": "github", "repo": "github/awesome-copilot" }
    }
  },
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "acme-corp/platform-tools" },
    { "source": "github", "repo": "github/awesome-copilot" }
  ],
  "enabledPlugins": {
    "release-guard@platform-tools": true,
    "legacy-deploy@platform-tools": false
  }
}
```

- `true` = required: installed and enabled automatically, cannot be disabled.
- `false` = blocked.
- `strictKnownMarketplaces` limits installs to the listed sources **and disables the built-in marketplaces**. Any public marketplace the organization wants (here `github/awesome-copilot`) must be listed explicitly.
- The marketplace key name must match the `name` in that marketplace's `marketplace.json`. Members need read access to each marketplace repo.
- `extraKnownMarketplaces` entries accept an optional `autoUpdate` property (shape not shown; see the [managed settings reference](https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings)).
- The `awesome-copilot` marketplace name is inferred from the documented ID `github-security@awesome-copilot`. Confirm it against that repo's `marketplace.json` before the demo.

**Artifact 4: team specialization**

`.github-private/copilot/team-mappings.json` (shape: settings file → array of enterprise team slugs, per the docs example `{ "no-auto.json": ["special-team"] }`):

```json
{
  "payments.json": ["payments-core", "payments-mobile"],
  "fusion-high.json": ["platform-sre"]
}
```

`.github-private/copilot/teams/payments.json`:

```json
{
  "enabledPlugins": {
    "pci-review@platform-tools": true
  }
}
```

- `enabledPlugins` is **additive**: the team file adds plugins on top of the enterprise baseline. It cannot unblock `legacy-deploy`.
- Other team values apply only to keys the enterprise marked `{ "overridable": VALUE }`. Overridable keys: `model`, `autoTier`, `fusionTier`, `permissions.disableBypassPermissionsMode`, `permissions.deny`, `permissions.ask`, `permissions.allow`, `allowedMcpServers`, `deniedMcpServers`, `extraKnownMarketplaces`, `strictKnownMarketplaces`, `sandbox`.
- A user in several teams gets the **least restrictive value per key** across their team files, applied beneath the enterprise settings. Platform decisions always win.
- Team specialization works only for server-managed deployments. The changelog suggests keeping `.github-private` internal so teams can open PRs proposing changes to their files.

**Artifact 5: repository `.github/copilot/settings.json`** (in a product repository)

```json
{
  "extraKnownMarketplaces": {
    "awesome-copilot": {
      "source": { "source": "github", "repo": "github/awesome-copilot" }
    }
  },
  "enabledPlugins": {
    "github-security@awesome-copilot": true
  }
}
```

- `enabledPlugins` in `.github/copilot/settings.json` is documented: the cloud agent installs plugins declaratively from this field ([about plugins](https://docs.github.com/copilot/concepts/agents/about-plugins)). The changelog confirms repositories "define a plugin marketplace and default plugins."
- The repository-level marketplace key is **illustrative**: `extraKnownMarketplaces` mirrors the managed-settings shape, but this brief could not confirm the exact repo-level key name. Verify against the [concepts page](https://docs.github.com/copilot/concepts/customizations/plugins) before showing it as a fact.
- At this layer, `true` means *default on*. Contributors can turn it off where the surface supports it, and managed policy still wins.
- Write it from the CLI: `copilot config --repo …` targets `.github/copilot/settings.json`, and `--local` targets `.github/copilot/settings.local.json`. Only repo-overridable keys can be written there ([CLI config dir reference](https://docs.github.com/copilot/reference/copilot-cli-reference/cli-config-dir-reference)).

**Anchor demo (the evidence):** one developer, a member of `payments-core`, opens the product repository in Copilot CLI.

1. **Enterprise:** `release-guard@platform-tools` is installed and enabled with no action from the developer. Trying to disable it fails.
2. **Team:** `pci-review@platform-tools` is also enabled; a developer outside the payments teams does not have it.
3. **Repository:** `github-security@awesome-copilot` is enabled by the repository default.
4. **Personal:** the developer turns the repository default off. The plugin stays installed but disabled.
5. **Blocked:** `copilot plugin install legacy-deploy@platform-tools` fails visibly. Installing from a marketplace that `strictKnownMarketplaces` does not list also fails.

Demo cue: rehearse on a test enterprise with `forceRemoteSettingsRefresh` on so policy edits apply at the next startup. Capture screenshots or a recorded fallback, because the exact CLI wording of the refusal messages was not confirmed for this brief.

**Boundary:**
- Managed controls require GitHub Enterprise Cloud and Copilot Business/Enterprise licenses issued by the enterprise or one of its organizations. Repository defaults also work for individual Copilot users.
- Repository defaults apply only in **trusted** repositories.
- Local opt-out depends on the surface.
- Team overrides need server-managed delivery; MDM/file deployments need separate files per group.
- Failure signal: a plugin the team "recommended" in managed settings is now unremovable for everyone. Recovery: move it to `.github/copilot/settings.json` and delete it from `enabledPlugins` in policy.

**Facts to know:**
- `model` was originally documented as `permissions.model`. Clients still read the nested value when the top-level key is absent; new configs use top-level `model`.
- Docs example structure: `.github-private/copilot/managed-settings.json`, `copilot/team-mappings.json`, `copilot/teams/*.json`.
- Plugin IDs use the marketplace `name`, never the repository name.

---

## Part 3: Ride the Same Rails for Models, Context, and Telemetry (~13 min)

**Claim:** The same layered path that resolves plugins also resolves the default model and Fusion effort, model availability per team, and telemetry capture. Platform teams can manage the rest of the baseline as code and review it the same way.

**Scope note (say on the opener):** This part covers *where* these values live and *who* owns them. How permissions, hooks, and sandboxing behave inside a session is harness behavior; that lives in [Harness Fundamentals](../harness-fundamentals/README.md).

**Mechanism:**

*Models and Fusion*
- Copilot Fusion is GA and replaces the Auto model option; it routes or combines models at Standard, High, or Max effort ([changelog](https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/)).
- Fusion only uses models enabled in enterprise and org model policy. Admins can disable a model for Fusion without disabling it for everyone.
- `model: "fusion"` sets the default; `fusionTier` sets the effort default. Values from most to least restrictive: `"standard"`, `"high"`, `"max"`, `"unmanaged"`. Any value other than `"unmanaged"` locks the tier against user and repository overrides. `{ "overridable": "standard" }` lets team files choose ([reference](https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings)).
- `autoTier` (`efficiency` / `balance` / `intelligence` / `unmanaged`) still exists for `model: "auto"`.
- The model policy REST API (GET/PATCH, GA Oct 19, 2026) works at four levels: enterprise, enterprise team, agent apps, and org. Enterprise policy can delegate model control to orgs (organization mode) or to teams and apps (enterprise teams mode) ([changelog](https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/)).

*Context*
- Org and repository instructions plus `AGENTS.md` carry rules that apply to every task. Skills shipped inside plugins carry methods that load on demand.
- Package a method as a skill in a plugin when several repositories need it. Keep a rule in instructions when every task in one scope needs it.
- Copilot Spaces carry cross-repository reference context; Knowledge Bases were retired and convert to Spaces ([changelog](https://github.blog/changelog/2025-10-17-copilot-knowledge-bases-can-now-be-converted-to-copilot-spaces)).
- Dreaming (public preview, opt-in, uses AI credits) runs three dream types: personal memory curation, repository customization, and code review customization. It adds, updates, and removes personal and repository memories directly. Changes to checked-in skills and instructions arrive as pull requests that maintainers review. Admins enable it through Copilot policies (the policy plane), and enterprises can delegate the choice to orgs ([changelog](https://github.blog/changelog/2026-10-28-github-intelligence-puts-your-code-context-and-history-to-work)).
- Depth on instructions vs. skills lives in [Copilot Primitives](../copilot-primitives/README.md).

*MCP servers*
- `allowedMcpServers` defines the servers permitted to run; anything unmatched is blocked. `deniedMcpServers` blocks servers unconditionally, even when they match the allowlist. Entries match by name, server URL, or command ([MCP allowlist](https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist)).
- Both keys live in `managed-settings.json` in the governance repository and are `overridable`, so a team file can widen or narrow them where the enterprise allows.
- They cover MCP servers from user and repository settings, and Copilot connectors on supporting clients. They do **not** cover MCP servers defined in repository custom agent profiles; control those through the cloud agent firewall (org or repository Internet access settings).
- Policy-plane prerequisite: the "MCP servers in Copilot" policy must be enabled for the enterprise or the orgs that need MCP.
- The registry-URL restriction ("Registry only") is public preview and the docs point to the managed-settings allowlist as the recommended method. Pick one source of truth.

```json
{
  "allowedMcpServers": [
    { "serverUrl": "https://api.githubcopilot.com/*" },
    { "serverCommand": ["npx", "@playwright/mcp@latest"] }
  ],
  "deniedMcpServers": [
    { "serverCommand": ["npx", "@modelcontextprotocol/server-filesystem", "/"] }
  ]
}
```

The allowlist entries follow the docs example; the denylist entry is a worked example of the documented `serverCommand` matcher.

*Telemetry*
- `telemetry.capture.identity` adds the authenticated Copilot account name, local OS account, and machine name to OTel data. Activity can be attributed without capturing content.
- Five content classes are each off by default:
  - `prompts`
  - `responses`
  - `toolArguments` (includes plugin, hook, and MCP identifiers)
  - `toolOutput`
  - `policyDetail` (for example, raw sandbox paths)
- Managed values beat local settings, SDK config, and environment variables. If several managed sources define `telemetry`, the highest-precedence source supplies the **whole** object; nothing merges ([OTel concepts](https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry); reference).

*Enforcement and defaults*
- `forceRemoteSettingsRefresh: true` makes clients fetch current policy at startup and **fail closed** if they cannot. In CLI and the Copilot app this skips the one-hour cache; VS Code blocks Copilot features until the refresh succeeds ([changelog](https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates)).
- The `sandbox` key enforces a minimum client version. Its sandbox semantics belong to harness-fundamentals.
- The global default for new GA features (Enabled / Disabled / Let orgs decide) applies only to features left Unconfigured ([changelog](https://github.blog/changelog/2026-10-22-global-default-for-copilot-features-generally-available)).

**Artifact 6: managed-settings baseline excerpt**

```json
{
  "model": { "overridable": "fusion" },
  "fusionTier": { "overridable": "standard" },
  "forceRemoteSettingsRefresh": true,
  "telemetry": {
    "capture": {
      "identity": true,
      "prompts": false,
      "responses": false,
      "toolArguments": false,
      "toolOutput": false,
      "policyDetail": false
    }
  }
}
```

`.github-private/copilot/teams/fusion-high.json`:

```json
{ "fusionTier": "high" }
```

- `model`, `fusionTier` (with the `overridable` syntax), and `forceRemoteSettingsRefresh` are confirmed shapes.
- The `telemetry` block is **illustrative**. The class names and `capture.identity` path are documented; the exact nesting and the keys that enable and route the OTel export (endpoint, protocol `http/json` or similar) were not confirmed. Take them from the managed settings reference.

**Artifact 7: model policy REST call**

```bash
# Read the effective model policy for one enterprise team (path confirmed)
gh api \
  -H "Accept: application/vnd.github+json" \
  /enterprises/acme-corp/teams/platform-sre/copilot/model-policies

# Other levels (paths confirmed):
#   /enterprises/{enterprise}/copilot/model-policies
#   /enterprises/{enterprise}/copilot/apps/model-policies
#   /orgs/{org}/copilot/model-policies

# Update (PATCH). Body is ILLUSTRATIVE; take the schema from the REST reference.
gh api -X PATCH \
  /enterprises/acme-corp/teams/platform-sre/copilot/model-policies \
  --input model-policy.json
```

Teaching point: model *availability* (policy API) and model *default* (`model` / `fusionTier` in managed settings) are two different entries. Both resolve per team, and a default naming a model the policy disables does nothing useful.

**Evidence the deck shows:**
- A GET that returns the team's policy state.
- A Fusion session at High for a `platform-sre` member and at Standard for everyone else.
- An OTel trace with identity attributes and no prompt content.

**Boundary:**
- Fine-grained capture works in Copilot CLI, the Copilot app, and VS Code Agent Host. VS Code's local harness applies `capture.identity` and legacy `captureContent` only.
- Captured content can include source code and file paths. Turn on only the class an investigation needs.
- `forceRemoteSettingsRefresh` delivered server-side applies from the startup *after* the client first receives it; use MDM or file delivery for first-startup enforcement. Clients need network at startup.
- Local-model routing in Fusion is experimental preview.

**Facts to know:**
- `fusionTier` does not select the model; pair it with `model: "fusion"`.
- `autoTier` remains for `model: "auto"`.
- Fusion is discounted 30% for the first 30 days (JetBrains changelog, 2026-10-28). Mention it only if asked.
- Fusion's published benchmark comparison is vendor-reported and does not belong on a slide as a measured local result.

---

## Part 4: Prove the Result and Know Where It Stops (~13 min)

### Prove the effective result

**Claim:** A layered baseline is acceptable when someone can state, for one named developer on one surface, which plugins, model default, and telemetry classes apply, and which layer set each one. Aggregate metrics are directional evidence on top of that check; they do not replace it.

**Mechanism:**
- Effective settings come from enterprise values, then team files combined by least-restrictive-per-key, then repository defaults, then personal choices.
- Usage metrics report plugin and skill activity. `totals_by_plugin` counts skill invocations associated with a plugin. Each `totals_by_*` array keeps the five most active entries. Customer identifiers can group under `other` / `custom`. Plugin and skill counts must not be added together ([manage plugin marketplaces: monitor usage](https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins)).
- Third-party agent app activity joins on `agent_id`. Per-user entries omit `session_count` ([changelog](https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity)).
- The impact dashboard ROI section and opt-in industry comparisons are directional; industry comparisons are not in the API ([ROI](https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section), [industry](https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard)).

**Artifact 8: effective-settings checklist for a multi-team user**

Pick one developer in two enterprise teams (for example `payments-core` and `platform-sre`), one repository, and one surface.

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
| 11 | Policy plane | Features and models the developer sees match the enterprise policy, or the org's choice where delegated; across two licensing orgs, the least restrictive applies | Enterprise AI controls and org Copilot policies; the user's Copilot features page |
| 12 | Org-owned context and limits | Org instructions appear in a cloud agent session and code review, not in a local CLI session; an excluded path is ignored; an MCP server outside the allowlist is refused | Start a cloud agent task; open an excluded file; start an unlisted MCP server |
| 13 | Repeat on a second surface | Same answers in VS Code and the Copilot app, minus documented surface differences | Repeat checks 2–9 and 12 |

**Evidence the deck shows:**
- The checklist filled in for the demo user, with one row deliberately differing on a second surface: a CLI-only component such as LSP config.
- A usage-metrics response with `totals_by_plugin` and a note on what the number does and does not mean.

**Boundary:**
- Usage counts are event counts, not adoption; an absent entry does not mean zero.
- Dashboard ROI is directional. This talk sets no saved-hours numbers; any target the audience writes down stays a target until measured locally.
- Failure signal: the checklist answer differs from what the platform team expected. Recovery: find the layer that set the value. Common causes are a key not marked `overridable`, least-restrictive merge across teams, or an untrusted repository.

**Facts to know:**
- Usage metrics access requirements and field definitions are in the usage metrics REST docs linked from the manage-plugins page.
- Per-user entries omit `session_count`.

---

### Where the pattern stops

**Claim:** Native layers cover one enterprise's Copilot baseline across Copilot surfaces. Two needs sit outside them: generating the same setup for several different agent tools, and byte-for-byte reproducible resolution. APM serves both, as a complementary tool with no relationship to managed settings.

**Artifact 9: native layers vs. APM decision table**

| Need | Native layers (managed settings, team files, repo settings) | APM (`apm.yml` + lockfile) |
|---|---|---|
| Require or block a plugin for everyone in the enterprise | ✅ `enabledPlugins` true/false | — (install-time `apm-policy.yml` only governs APM installs) |
| Different requirements per team | ✅ team files, additive plugins, overridable keys | — |
| Recommend a plugin for one repository | ✅ `.github/copilot/settings.json` | ✅ `apm.yml` in the repo |
| One manifest feeding Copilot plus other agents (Claude Code, Cursor, Codex, Gemini, and others) | Partial: Agent Plugins 1.0 is portable for skills + MCP; client-specific parts live in each client's namespace | ✅ deploys each primitive to every supported harness |
| Pin exact versions and content hashes so a fresh clone resolves identical content | Marketplace versions + optional `autoUpdate` | ✅ lockfile pins versions and content hashes |
| Enforcement users cannot bypass on Copilot surfaces | ✅ managed settings; fail-closed refresh | — |
| Models, Fusion tier, telemetry capture | ✅ same managed-settings path | — |

Choose native layers when the question is "what does every Copilot user in our enterprise get." Add APM when a repository serves several agent tools or needs reproducible resolution in CI. Run them side by side: APM writes repository files; managed settings still win on Copilot surfaces.

**Supporting artifact (APM, boundary only):** the manifest shape from the [APM docs](https://microsoft.github.io/apm/). Lockfile field names are not reproduced here; see the v0.3 working-draft manifest schema in `microsoft/apm`.

```yaml
name: payments-service
version: 1.0.0
dependencies:
  apm:
    - acme-corp/platform-tools/plugins/release-guard
```

Then `apm install` deploys to each selected harness. The lockfile records the resolved version, commit, and content hash so a fresh clone resolves the same content.

**Licensing boundary (one slide):**
- GitHub Enterprise now includes access to Copilot, metered on AI credits. Copilot Standalone is $10/user/month for people outside a GHE enterprise. Self-serve availability is rolling out in stages, and Business/Enterprise plans remain ([changelog](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot)).
- The managed plugin controls in this talk require GitHub Enterprise Cloud and Copilot Business or Enterprise licenses issued by the enterprise or its orgs.
- Fusion, plugin actions such as the security extension's Explain/Fix, and Dreaming consume AI credits.

**Other boundaries worth knowing:**
- **Surfaces:** enforcement covers VS Code, Copilot CLI, the Copilot app, and the cloud agent; JetBrains support varies per key in the reference table.
- **Out of scope here:** permission rules, hooks, and sandbox behavior inside a session ([Harness Fundamentals](../harness-fundamentals/README.md)); review and merge authority over agent output; compliance programs.

**Transfer:** close on the Apply It to Your Work prompt.

---

## Decision criteria

**Put it in an AI controls policy when:**
- The question is whether a feature, agent, or model is allowed at all. Set it at the enterprise, or choose "Let organizations decide" when orgs have different needs.

**Put it in org settings when:**
- The enterprise delegated the policy, or the control is org-scoped: org custom instructions for cloud and review work, org custom agents, content exclusion, and the cloud agent firewall.

**Put it in enterprise managed settings when:**
- Every user must have it, or nobody may: required or blocked plugins.
- It defines where plugins may come from: `strictKnownMarketplaces`.
- It must not drift: fail-closed refresh, locked `fusionTier`, telemetry capture.

**Put it in a team file when:**
- A defined group needs an extra required plugin.
- A team needs a different value for a key the enterprise deliberately marked `overridable`.

**Put it in the repository when:**
- Contributors to this codebase benefit from it by default and can work without it.

**Leave it personal when:**
- It is preference: an optional plugin from an approved marketplace.

**Choose something else when:**
- The organization runs several agent tools from one repository or needs hash-pinned reproducibility → add APM.
- The deployment is MDM or file-based → team overrides are unavailable; plan per-group files.
- The question is how a permission or hook behaves in a session → Harness Fundamentals.

**Tradeoffs:**
- Locking keys gives consistency and costs team autonomy.
- `strictKnownMarketplaces` closes supply paths and also removes built-in marketplaces.
- `forceRemoteSettingsRefresh` gives current policy at every startup and keeps Copilot closed without a connection to GitHub.

## Use cases

All outcomes below are targets for a pilot, not measured results.

1. **Platform baseline as code.**
   - Before: every repository copies the same skills and MCP config by hand.
   - After: one `release-guard` plugin, required in managed settings, versioned in a marketplace.
   - Signal: one PR updates the baseline everywhere on next refresh.
2. **Team-specific requirement.**
   - Before: the payments team asks the platform team for a policy exception.
   - After: a `payments.json` team file adds `pci-review`; the team proposes changes by PR to `.github-private`.
3. **Repository recommendation.**
   - Before: an optional scanner is forced on everyone through policy.
   - After: `github-security@awesome-copilot` is a repository default contributors can turn off.
4. **Investigation-ready telemetry.**
   - Before: pseudonymous traces.
   - After: identity capture on, content classes off, and a per-incident decision to enable one class.

## Actions

### Today
- **Try:** Write an Agent Plugins 1.0 `plugin.json` with `$schema` around one existing skill and install it locally with `copilot plugin install ./PATH`.
- **Expected signal:** The skill appears under the plugin in the client plugin list.
- **Validate:** Invoke the skill in a session; reinstall after an edit and confirm the change loads.
- **Boundary:** Keep it local; publish nothing yet.

### This Week
- **Build:** Create a marketplace repo with `marketplace.json`, plus one product repo with `.github/copilot/settings.json` enabling the plugin as a default.
- **Expected signal:** Contributors who open the trusted repo get the plugin enabled, can turn it off, and see the ID `PLUGIN@MARKETPLACE`.
- **Validate:** Run checklist rows 2, 5, and 6 for one contributor.
- **Boundary:** Repository defaults only; no managed settings yet.

### This Month
- **Pilot:** In a test enterprise or with a small pilot team mapping, add `extraKnownMarketplaces`, one required plugin, one team file, and `forceRemoteSettingsRefresh`.
- **Success measure:** The full effective-settings checklist passes for two users in different team combinations on two surfaces. Usage metrics show `totals_by_plugin` activity, read as directional.
- **Boundary:** Pause before enabling `strictKnownMarketplaces` enterprise-wide until every needed public marketplace is listed. Roll back by removing the team mapping or `enabledPlugins` entry and restarting clients.

### Apply it to your work
- **Candidate task:** One plugin or rule the organization currently copies between repositories by hand.
- **Decisive context:** Which teams need it, which surfaces they use, whether delivery is server-managed or MDM, and whether any repo serves non-Copilot agents.
- **Delegation and authority:** Enterprise owners decide required, blocked, and approved sources. Teams propose their file by PR. Maintainers own repository defaults. Developers own the rest.
- **Evidence:** The effective-settings checklist for one real multi-team developer on two surfaces.

## Facts not confirmed for this brief (keep labeled as illustrative)

- Exact nesting of the `telemetry` object and its export/endpoint keys.
- The repository-level key for declaring a marketplace in `.github/copilot/settings.json` (shown as `extraKnownMarketplaces`).
- Top-level shape of an Agent Plugins `mcp.json`.
- Model policy PATCH request body.
- Exact `copilot plugin` list subcommand name and the CLI's refusal-message wording for blocked or required plugins.
- Whether the global-default-for-new-features policy is settable in `managed-settings.json` (treated as an enterprise policy setting).
- The `sandbox` key's value shape (not shown; harness-fundamentals territory).
- APM lockfile field names (not reproduced).
- The folder inside the enterprise `.github-private` repository that holds enterprise-level agent profiles (the org-level docs name `/agents`; take the enterprise layout from the governance template).
- Exact settings-page labels for org content exclusion (the concepts page confirms who configures it).

## Sources

**Plugins and marketplaces**
- https://docs.github.com/copilot/concepts/customizations/plugins
- https://docs.github.com/copilot/concepts/agents/about-plugins
- https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating
- https://docs.github.com/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace
- https://docs.github.com/copilot/reference/plugin-and-marketplace-reference
- https://docs.github.com/copilot/reference/cli-plugin-reference
- https://code.visualstudio.com/docs/agents/reference/agent-plugin-reference
- https://agent-plugins.org/specification
- https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app/
- https://github.blog/changelog/2026-10-28-repository-plugin-defaults-and-enterprise-plugin-controls-generally-available/
- https://github.blog/changelog/2026-10-28-security-extension-for-the-github-copilot-app/

**Managed settings and teams**
- https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
- https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents
- https://docs.github.com/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
- https://docs.github.com/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
- https://docs.github.com/copilot/reference/enterprise-administrators/enterprise-managed-settings
- https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins
- https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
- https://docs.github.com/copilot/reference/copilot-cli-reference/cli-config-dir-reference
- https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings
- https://github.blog/changelog/2026-10-13-enterprise-managed-settings-enforcement-updates
- https://github.blog/changelog/2026-10-22-global-default-for-copilot-features-generally-available

**Policy plane and organization controls**
- https://docs.github.com/copilot/concepts/enterprise/policies
- https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
- https://docs.github.com/copilot/how-tos/configure-custom-instructions/add-organization-instructions
- https://docs.github.com/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents
- https://docs.github.com/copilot/concepts/context/content-exclusion
- https://docs.github.com/copilot/how-tos/use-copilot-agents/cloud-agent/customize-the-agent-firewall

**Models, context, telemetry**
- https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/
- https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams/
- https://github.blog/changelog/2026-10-12-client-telemetry-user-attribution-and-configurable-capture/
- https://docs.github.com/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry
- https://github.blog/changelog/2025-10-17-copilot-knowledge-bases-can-now-be-converted-to-copilot-spaces
- https://github.blog/changelog/2026-10-28-github-intelligence-puts-your-code-context-and-history-to-work

**Evidence and licensing**
- https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity
- https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section
- https://github.blog/changelog/2026-10-22-industry-comparisons-in-the-copilot-impact-dashboard
- https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot

**APM (boundary only)**
- https://github.com/microsoft/apm
- https://microsoft.github.io/apm/
