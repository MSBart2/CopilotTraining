---
status: active
updated: 2026-08-10
section: "Platform Teams"
references:
  - url: https://code.visualstudio.com/docs/copilot/customization/agent-plugins
    label: "Agent plugins for Copilot customization"
    verified: 2026-04-17
  - url: https://github.com/github/copilot-plugins
    label: "Official Copilot Plugins Repository"
    verified: 2026-04-17
  - url: https://microsoft.github.io/apm/introduction/what-is-apm/
    label: "APM - Agent Package Manager Documentation"
    verified: 2026-04-17
  - url: https://github.com/github/awesome-copilot
    label: "Awesome GitHub Copilot - Community Curated List"
    verified: 2026-04-17
  - url: https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings
    label: "Enterprise team specialization for managed settings"
    verified: 2026-08-10
---

# Copilot Plugins & APM: Composable AI Extensions

> **The Question This Talk Answers:**
> *"How do I extend Copilot with custom capabilities — and how do I share that configuration across teams and repositories?"*

**Duration:** 25 minutes | **Target Audience:** Developers, DevOps Engineers, Platform Teams

---

## 📊 Content Fitness

Use this rubric during content creation. If any category is 🔴 or 🟡, revise before publishing.

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Plugin ecosystem is expanding rapidly; teams need reusable customization patterns |
| **Compelling** | 🟢 High | "Install once, configure everywhere" unlocks team-wide Copilot capabilities |
| **Actionable** | 🟢 High | CLI commands work today; apm.yml pattern is immediately adoptable |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Install third-party agent extensions directly from the CLI**
  Bring new Copilot capabilities into any editor or workflow with a single command

- **Discover vetted plugins through the marketplace**
  Browse, search, and install community-curated extensions via `apm marketplace browse`

- **Version your entire agent configuration as code**
  Package instructions, skills, plugins, and MCP servers into one `apm.yml` manifest

- **Hydrate repos with team-wide AI context automatically**
  Run `apm install` and every contributor gets the same Copilot setup — no manual setup docs

### The Emerging Practice

Plugin-based Copilot customization is shifting from "configure once per developer" to "configure once per repository." Teams are capturing their best instructions, skills, and integrations in an `apm.yml` file — then committing it to the repo. New contributors clone the code, run `apm install`, and inherit the team's accumulated AI context automatically.[^1]

The distinction matters: `copilot plugin install` manages individual plugins (install, update, remove). APM (Agent Package Manager) orchestrates your full agent configuration stack — plugins, instructions, skills, MCP servers — as a versioned, lockfile-validated unit. You use `copilot plugin` commands for ad-hoc exploration. You use APM when configuration becomes infrastructure.[^2]

Early adopters are combining marketplace discovery with repository-scoped manifests. Browse the marketplace to find a code review plugin or a testing framework assistant. Try it locally with `copilot plugin install`. Once it proves valuable, lock it into your project's `apm.yml` so the entire team gets it on their next `apm install`.[^3]

---

## How It Works: Copilot Plugins & APM

### What It Does

Copilot plugins extend the base Copilot agent with custom skills, integrations, or domain-specific reasoning capabilities. APM packages those plugins — along with instructions, skills files, and MCP servers — into a reproducible configuration manifest that travels with your codebase.

### Key Capabilities

- **Plugin discovery via CLI**: `apm marketplace browse` and `copilot plugin list` surface available extensions without leaving the terminal
- **One-command installation**: `copilot plugin install <name>` or `apm install` hydrates your environment
- **Lockfile verification**: APM generates a lockfile to ensure consistent versions across team members
- **Cross-editor portability**: Plugins work in VS Code, CLI, and any ACP-compatible client

### Architecture Overview

Plugins are npm packages that declare agent extensions (new commands, tools, or reasoning modules) via a manifest schema. When installed, they register with the Copilot runtime and become available in chat, CLI, or the Extension API.

APM sits one layer above. It reads an `apm.yml` file in your repository root, resolves dependencies (plugins, instructions, MCP servers), and installs everything in a single pass. The lockfile (`apm-lock.yml`) captures the exact versions installed, preventing drift across developer machines or CI environments.

The workflow splits into two modes:

1. **Individual plugin management**: Use `copilot plugin install <name>` to add/remove/update single plugins. Perfect for exploration and personal customization.
2. **Team configuration management**: Use `apm install` with an `apm.yml` manifest. Perfect for standardizing team setups and ensuring every clone gets the same agent capabilities.

**Official Documentation:**
- 📖 [Agent Plugins for Copilot Customization](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)[^1] — Plugin concepts and installation
- 📖 [APM - Agent Package Manager](https://microsoft.github.io/apm/introduction/what-is-apm/)[^2] — Manifest schema and lockfile mechanics
- 📖 [Official Copilot Plugins Repository](https://github.com/github/copilot-plugins)[^4] — First-party plugins and contribution guidelines

---

## 📦 Key Artifacts

**Every tech talk must include working artifacts.** These are the actual files, configurations, or code samples that demonstrate the feature in action.

### Primary Artifacts

*These are shown inline with detailed explanation in the major sections below*

- **`apm.yml`** — Team-wide agent configuration manifest with plugins, instructions, and MCP servers
- **`apm-lock.yml`** — Lockfile ensuring version consistency across installations
- **`copilot plugin install` commands** — CLI reference for individual plugin management

### Supporting Files

*Available in repository for download/reference*

- **[Awesome GitHub Copilot](https://github.com/github/awesome-copilot)** — Community-curated list of plugins, tools, and integrations

---

## 🎯 Mental Model Shift

> **The Core Insight:** Agent configuration is infrastructure — it belongs in version control with your code, not scattered across developer machines.

### Move Toward (Embrace These Patterns)

- ✅ **Configuration as Code**: Capture agent setup in `apm.yml` and commit it alongside your codebase → New contributors inherit team AI context automatically
- ✅ **Marketplace Discovery First**: Browse `apm marketplace` and `awesome-copilot` before building custom integrations → Leverage community expertise instead of reinventing
- ✅ **Lockfile Discipline**: Commit `apm-lock.yml` to ensure every `apm install` produces identical results → Eliminate "works on my machine" for AI configuration

### Move Away From (Retire These Habits)

- 🔄 **Manual Setup Docs → Executable Manifests**: Instead of maintaining "how to configure Copilot" wiki pages, encode setup as `apm.yml` → Onboarding becomes `git clone && apm install`
- 🔄 **Per-Developer Configuration → Per-Repository Configuration**: Experiment with repo-scoped `apm.yml` files rather than global settings → Different projects get different agent capabilities
- 🔄 **Install-and-Forget → Lockfile Review**: Treat `apm-lock.yml` changes like dependency updates — review diffs in PRs → Catch unintended plugin upgrades early

### Move Against (Active Resistance)

- 🛑 **Skipping Lockfile Commits**: If you commit `apm.yml` but ignore `apm-lock.yml`, installations will drift → Every developer gets different plugin versions, debugging becomes impossible
- 🛑 **Mixing Global and Local Installs Blindly**: Installing plugins globally (`copilot plugin install --global`) bypasses repo-scoped manifests → Team members won't get the plugins you depend on

> **What This Looks Like:** A developer clones a new project repository, runs `apm install`, and immediately has access to the team's custom code review agent, testing assistant, and architecture documentation MCP server — no manual setup, no wiki page, no Slack message asking "what plugins do I need?"

---

## When to Use This Pattern

### Decision Tree

```
Q: Do you need to extend Copilot with custom capabilities?
├─ One-off exploration → Use: copilot plugin install <name>
│  └─ Best for: Trying new plugins, personal customization
│
├─ Team-wide standardization → Use: apm.yml + apm install
│  └─ Best for: Repository-scoped configuration, onboarding automation
│
└─ Cross-project discovery → Use: apm marketplace browse
   └─ Best for: Finding vetted plugins before building custom solutions
```

### Use This Pattern When

- Your team has custom instructions, skills, or MCP servers that every contributor needs
- Onboarding new developers requires manual Copilot configuration steps
- You want to version-control your AI agent setup alongside your codebase
- Different repositories need different Copilot capabilities (monorepo with multiple agent profiles)

### Don't Use This Pattern When

- You're experimenting personally — stick with `copilot plugin install` for exploration
- Your project has no shared agent customization needs — default Copilot is sufficient
- You haven't validated the plugins you plan to lock into the manifest — prototype first, then codify

### Comparison with Related Features

| Aspect | copilot plugin | APM | Custom Instructions |
|--------|----------------|-----|---------------------|
| **Best For** | Ad-hoc plugin management | Team-wide config orchestration | Lightweight prompt customization |
| **Strengths** | Fast exploration | Reproducible setup | No manifest required |
| **Limitations** | Manual per-developer | Requires apm.yml discipline | Limited to text instructions |
| **Setup Time** | 30 seconds | 5 minutes (first manifest) | 1 minute |

---

<!-- 🎬 MAJOR SECTION: CLI-First Plugin Management -->
## CLI-First Plugin Management

The fastest way to explore the plugin ecosystem is through the command line. No UI navigation, no extension marketplace search — just direct commands.

### Discovering Plugins

List all available plugins from the official marketplace:

```bash
apm marketplace browse
```

Output shows plugin names, descriptions, and installation commands. Filter by category or search by keyword:

```bash
apm marketplace browse --category code-review
apm marketplace browse --search testing
```

See what you've already installed:

```bash
copilot plugin list
```

This shows active plugins, their versions, and whether they were installed globally or locally.

### Installing a Single Plugin

Install a plugin for personal use:

```bash
copilot plugin install code-review-assistant
```

The plugin is immediately available in Copilot Chat, CLI, and any ACP-compatible client. Verify with:

```bash
copilot plugin list
```

### Updating and Removing Plugins

Update a plugin to the latest version:

```bash
copilot plugin update code-review-assistant
```

Remove a plugin you no longer need:

```bash
copilot plugin uninstall code-review-assistant
```

**Key Points:**

- `copilot plugin` commands manage individual plugins — perfect for trying new capabilities
- Plugins persist across terminal sessions but are scoped to your user account
- Changes are immediate — no restart required
- This workflow is ideal for exploration; use APM when configuration becomes team infrastructure

### VS Code UI Equivalent

While the CLI is fastest, you can also manage plugins through VS Code:

1. Open the Copilot sidebar (`Ctrl+Shift+P` → "Copilot: Focus on Copilot View")
2. Navigate to the **Plugins** section
3. Browse, install, or remove plugins via the UI

The CLI and UI share the same plugin registry — installing via `copilot plugin install` makes the plugin appear in the VS Code UI immediately.

---

<!-- 🎬 MAJOR SECTION: Building an APM Manifest -->
## Building an APM Manifest

When your Copilot setup becomes critical team infrastructure, capture it as an `apm.yml` manifest. This file lives in your repository root and declares everything needed to hydrate a fresh clone with full agent capabilities.

### Minimal apm.yml Example

Start with the simplest possible manifest:

```yaml
# apm.yml - Minimal team agent configuration
version: 1

plugins:
  - name: code-review-assistant
    version: ^1.0.0
  - name: test-generator
    version: ^2.1.0
```

Run `apm install` and both plugins are installed at the specified version ranges. The lockfile (`apm-lock.yml`) captures the exact resolved versions.

### Adding Instructions and Skills

APM orchestrates more than plugins — it handles instructions files and skills:

```yaml
# apm.yml - Full agent configuration
version: 1

plugins:
  - name: code-review-assistant
    version: ^1.0.0

instructions:
  - path: .github/copilot-instructions.md

skills:
  - path: .github/skills/testing/SKILL.md
  - path: .github/skills/api-design/SKILL.md
```

When a developer runs `apm install`, Copilot loads:
- The two plugins
- The custom instructions file
- Both skills as available capabilities

### Including MCP Servers

MCP (Model Context Protocol) servers extend Copilot with live integrations. Add them to your manifest:

```yaml
# apm.yml - With MCP servers
version: 1

plugins:
  - name: code-review-assistant
    version: ^1.0.0

mcpServers:
  - name: github-mcp
    source: npm:@modelcontextprotocol/server-github
    version: ^1.2.0
  - name: aws-docs-mcp
    source: github:awslabs/mcp-aws-docs
    version: main
```

APM resolves MCP servers from npm, GitHub, or local paths. After `apm install`, Copilot can query GitHub APIs or AWS documentation directly through the MCP servers.

**Key Points:**

- `apm.yml` is the canonical source of truth for agent configuration
- Commit both `apm.yml` and `apm-lock.yml` to version control
- Lockfile ensures every team member gets identical plugin versions
- Instructions, skills, plugins, and MCP servers are installed in a single `apm install` pass

---

<!-- 🎬 MAJOR SECTION: The Lockfile Pattern -->
## The Lockfile Pattern

APM generates `apm-lock.yml` to freeze the exact versions of every plugin, instruction, skill, and MCP server. This file should be committed to version control alongside `apm.yml`.

### What the Lockfile Captures

After running `apm install` with this manifest:

```yaml
# apm.yml
version: 1
plugins:
  - name: code-review-assistant
    version: ^1.0.0
```

APM generates:

```yaml
# apm-lock.yml
version: 1
lockfileVersion: 1

plugins:
  code-review-assistant:
    version: 1.2.3
    resolved: https://registry.apm.dev/code-review-assistant/-/code-review-assistant-1.2.3.tgz
    integrity: sha512-abc123...
```

The lockfile records:
- Exact version installed (1.2.3, not ^1.0.0)
- Download URL for reproducibility
- Integrity hash to detect tampering

### Why Lockfiles Matter

Without a lockfile, `apm install` resolves `^1.0.0` to the latest compatible version. Developer A installs on Monday and gets `1.2.3`. Developer B installs on Friday and gets `1.3.0` (a new release). Their Copilot agents behave differently.

With a lockfile, both developers get `1.2.3` — the exact version locked when the file was committed. Updates are explicit: run `apm update`, review the lockfile diff in a PR, then merge.

### Lockfile Workflow

1. **Initial setup**: Author `apm.yml`, run `apm install`, commit both files
2. **Daily use**: Developers run `apm install` to sync with the lockfile
3. **Updates**: Run `apm update` to fetch new versions, review lockfile changes, commit
4. **Pull requests**: Treat `apm-lock.yml` diffs like dependency updates — CI should validate they match `apm.yml`

**Key Points:**

- Always commit `apm-lock.yml` alongside `apm.yml`
- Lockfiles prevent "works on my machine" for AI configuration
- Review lockfile diffs in PRs — they show what changed in your agent stack
- If lockfile and manifest drift, `apm install` will fail with a checksum error

---

<!-- 🎬 MAJOR SECTION: Discovery and Community Resources -->
## Discovery and Community Resources

The plugin ecosystem is growing through official first-party plugins and community contributions. Knowing where to find vetted extensions saves time and reduces risk.

### Official Marketplace

The canonical source for first-party plugins:

```bash
apm marketplace browse
```

This shows plugins maintained by GitHub and Microsoft. Each listing includes:
- Plugin name and description
- Supported Copilot clients (VS Code, CLI, etc.)
- Installation command
- Link to documentation

Filter by category to narrow results:

```bash
apm marketplace browse --category testing
apm marketplace browse --category code-review
apm marketplace browse --category integrations
```

### Awesome GitHub Copilot

The community-curated list at [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot)[^3] catalogs:

- Third-party plugins not in the official marketplace
- Skills files and instruction templates
- MCP server integrations
- Tools and workflows using Copilot programmatically

Browse the README for categories like:
- **Plugins**: Extensions for domain-specific tasks (API design, testing, security)
- **Skills**: Reusable skill files for specific workflows
- **MCP Servers**: Context servers for live integrations (GitHub, Slack, Jira)
- **Workflows**: GitHub Actions that orchestrate Copilot agents

### Official Copilot Plugins Repository

[github.com/github/copilot-plugins](https://github.com/github/copilot-plugins)[^4] is the first-party plugin source:

- Official plugin source code
- Plugin manifest schema documentation
- Contribution guidelines for submitting your own plugins
- Issue tracker for bugs and feature requests

If you're building a custom plugin, start here for the manifest schema and examples.

**Key Points:**

- Start with `apm marketplace browse` for vetted, first-party plugins
- Check `awesome-copilot` for community experiments and niche integrations
- Consult `copilot-plugins` repo when building your own plugin
- Most plugins work across Copilot CLI, VS Code, and ACP clients — check compatibility notes

---

## Sharing Plugins Across Teams

APM remains the repository-level packaging layer: an `apm.yml` manifest and its lockfile make a project's plugins and agent configuration reproducible. Enterprise managed settings provide a separate distribution companion for organizations that need a governed baseline plus role-specific additions.[^5]

In managed settings, `enabledPlugins` and `extraKnownMarketplaces` are additive enterprise keys. The enterprise baseline applies everywhere, while teams can layer on the additional plugins and marketplaces their roles require; teams cannot weaken or subtract from that baseline. Team settings files live under `copilot/teams/` and are assigned to one or more team slugs through `team-mappings.json`.

For users who belong to multiple teams, team-level settings combine using the least-restrictive value for each key, then apply beneath non-overridable enterprise decisions. GitHub currently enforces these managed settings in VS Code, Copilot CLI, the Copilot App, and Copilot cloud agent for users with Copilot Business or Copilot Enterprise licenses.

> **Important:** This is enterprise managed-settings behavior, not `apm.yml` merge or inheritance. APM packages a reproducible project configuration; managed settings govern the enterprise baseline and permitted team additions.

---

## Real-World Use Cases

### Use Case 1: Standardized Code Review Agent Across Teams

**The Scenario:** A platform team wants every repository to use the same code review plugin with team-specific prompts and architecture guidelines.

**How It Works:** The team creates a shared `apm.yml` template:

```yaml
version: 1
plugins:
  - name: code-review-assistant
    version: ^1.0.0
instructions:
  - path: .github/team-instructions.md
```

Each repository copies this file, runs `apm install`, and commits the lockfile. New developers clone any repo and run `apm install` — they immediately get the team's code review agent with consistent behavior.

**Example:**

```bash
git clone https://github.com/your-org/new-service
cd new-service
apm install
```

Output:
```
✓ Installed code-review-assistant@1.2.3
✓ Loaded .github/team-instructions.md
✓ Generated apm-lock.yml
```

**What You Get:** Every contributor has the same code review experience. No wiki page, no Slack message, no "how do I configure this?" questions.

---

### Use Case 2: Multi-Project Developer with Context-Scoped Agents

**The Scenario:** A developer works on three projects: a Python data pipeline, a React web app, and a Go microservice. Each needs different Copilot capabilities (data tooling, UI patterns, performance tuning).

**How It Works:** Each repository has its own `apm.yml`:

```yaml
# data-pipeline/apm.yml
version: 1
plugins:
  - name: pandas-assistant
  - name: sql-query-optimizer
```

```yaml
# web-app/apm.yml
version: 1
plugins:
  - name: react-component-generator
  - name: accessibility-checker
```

```yaml
# microservice/apm.yml
version: 1
plugins:
  - name: go-concurrency-analyzer
  - name: performance-profiler
```

The developer switches projects with `cd` and runs `apm install` once per repo. Copilot adapts to the project context automatically.

**What You Get:** No global plugin sprawl. Each project gets the tools it needs. Switching contexts is clean — plugins are scoped to the repository.

---

### Use Case 3: CI/CD Integration with Lockfile Validation

**The Scenario:** A team wants CI to enforce that `apm.yml` and `apm-lock.yml` are always in sync.

**How It Works:** Add a GitHub Actions step that validates the lockfile:

```yaml
# .github/workflows/validate-apm.yml
name: Validate APM Lockfile
on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g @microsoft/apm
      - run: apm install --frozen-lockfile
```

The `--frozen-lockfile` flag fails if the lockfile doesn't match `apm.yml`. Pull requests that update plugins must include a valid lockfile diff.

**What You Get:** Automatic enforcement of lockfile discipline. No developer can merge a plugin change without updating the lockfile. Configuration drift is caught in CI, not production.

---

## What You Can Do Today

### 15 Minutes: Explore the Marketplace and Install Your First Plugin

1. List available plugins from the CLI:
   ```bash
   apm marketplace browse
   ```

2. Pick one that looks useful (e.g., `code-review-assistant`) and install it:
   ```bash
   copilot plugin install code-review-assistant
   ```

3. Open Copilot Chat (VS Code or CLI) and try the new capability:
   ```
   @code-review-assistant review this PR for security issues
   ```

4. Check what's installed:
   ```bash
   copilot plugin list
   ```

**Outcome:** You've discovered and installed a Copilot plugin from the command line in under 15 minutes.

---

### 1 Hour: Create Your First apm.yml Manifest

1. Navigate to a repository you maintain:
   ```bash
   cd ~/projects/your-repo
   ```

2. Create an `apm.yml` file with a minimal configuration:
   ```yaml
   version: 1
   plugins:
     - name: code-review-assistant
       version: ^1.0.0
   ```

3. Run `apm install` to generate the lockfile:
   ```bash
   apm install
   ```

4. Commit both files:
   ```bash
   git add apm.yml apm-lock.yml
   git commit -m "Add APM manifest for code review plugin"
   ```

5. Have a teammate clone the repo and run `apm install` — confirm they get the same plugin version.

**Outcome:** Your repository now has reproducible Copilot configuration. New contributors get the team's agent setup automatically.

---

### 2-4 Hours: Build a Multi-Plugin Team Configuration

1. Audit your team's current Copilot usage — what plugins, instructions, and skills are people using?

2. Draft a comprehensive `apm.yml`:
   ```yaml
   version: 1
   plugins:
     - name: code-review-assistant
       version: ^1.0.0
     - name: test-generator
       version: ^2.1.0
   instructions:
     - path: .github/copilot-instructions.md
   skills:
     - path: .github/skills/testing/SKILL.md
   mcpServers:
     - name: github-mcp
       source: npm:@modelcontextprotocol/server-github
       version: ^1.2.0
   ```

3. Test the manifest in a sandbox repository:
   ```bash
   apm install
   ```

4. Document the workflow in your team's onboarding guide:
   ```markdown
   ## Copilot Setup
   After cloning this repo, run:
   ```bash
   apm install
   ```
   This installs all required Copilot plugins and configuration.
   ```

5. Add CI validation (see Use Case 3 above).

**Outcome:** Your team has a versioned, reproducible Copilot configuration. Onboarding is automated. Configuration drift is impossible.

---

## Related Patterns

- **[Copilot Primitives](../copilot-primitives/)** — Understanding instructions, skills, and MCP servers that APM orchestrates
- **[Copilot Memory](../copilot-memory/)** — How agent context persists across sessions and repositories
- **[Copilot CLI](../copilot-cli/)** — Using Copilot from the command line, where plugin management happens

---

## 📚 References

[^1]: **[Agent plugins for Copilot customization](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)** — VS Code documentation on plugin concepts and installation
[^2]: **[APM - Agent Package Manager](https://microsoft.github.io/apm/introduction/what-is-apm/)** — Official APM documentation covering manifest schema and lockfile mechanics
[^3]: **[Awesome GitHub Copilot](https://github.com/github/awesome-copilot)** — Community-curated list of plugins, skills, and integrations
[^4]: **[Official Copilot Plugins Repository](https://github.com/github/copilot-plugins)** — First-party plugin source code and contribution guidelines
[^5]: **[Enterprise team specialization for managed settings](https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings)** — GitHub changelog release covering additive team plugin settings, enterprise precedence, and supported clients
