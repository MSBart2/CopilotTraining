# Demo: Copilot Plugins & APM — Extending Copilot with CLI-First Configuration

**Source talk:** [Copilot Plugins & APM: Composable AI Extensions](../README.md)
**Core question:** How do I extend Copilot with custom capabilities — and how do I share that configuration across teams and repositories?
**Target repo:** Any repository you maintain (FanHub works well for testing)

---

## Prerequisites

- Copilot CLI installed and authenticated (`copilot --version` confirms it works)
- APM CLI installed: `npm install -g @microsoft/apm` (verify with `apm --version`)
- Git and a repository you can commit to
- For Exercise 4: Access to a team repository or a second local clone

---

## Exercise 1: Discover Plugins from the CLI

The fastest way to explore what's available is through the marketplace browser. No web UI, no extension search — just direct CLI queries.

```bash
apm marketplace browse
```

**What you'll see:** A list of available plugins with names, descriptions, and installation commands. Each entry shows:
- Plugin name (e.g., `code-review-assistant`, `test-generator`)
- One-line description
- Category tags
- Installation command

Filter by category to narrow the list:

```bash
apm marketplace browse --category code-review
apm marketplace browse --category testing
```

Search by keyword:

```bash
apm marketplace browse --search security
apm marketplace browse --search api
```

**What to notice:** The CLI gives you direct access to the plugin registry. You're not navigating a web UI or opening VS Code — discovery happens in the terminal where you're already working.

**Alternative discovery path:** Browse the community-curated list at [github.com/github/awesome-copilot](https://github.com/github/awesome-copilot). This includes third-party plugins, skills files, MCP servers, and workflow examples not in the official marketplace.

---

## Exercise 2: Install a Single Plugin (The `copilot plugin` Path)

Pick a plugin from the marketplace output (or use `code-review-assistant` as a test) and install it for personal use:

```bash
copilot plugin install code-review-assistant
```

**What happens:**
- The plugin downloads and registers with Copilot
- It becomes immediately available in Copilot Chat, CLI, and any ACP-compatible client
- No restart required — the plugin is live

Verify the installation:

```bash
copilot plugin list
```

**Output example:**
```
Installed plugins:
  - code-review-assistant@1.2.3 (global)
```

Test the plugin in Copilot Chat (VS Code or CLI):

```bash
copilot
```

At the prompt, ask the plugin to do something:

```
@code-review-assistant review the last commit for security issues
```

The plugin responds with a code review focused on security patterns.

**Update the plugin** to the latest version:

```bash
copilot plugin update code-review-assistant
```

**Remove the plugin** when you're done testing:

```bash
copilot plugin uninstall code-review-assistant
```

**What to notice:** The `copilot plugin` commands manage individual plugins. This is perfect for exploration and personal customization. Changes are immediate — install, test, remove, repeat. But there's no team coordination, no versioning, no lockfile. If you want to share this setup with your team, you need APM.

---

## Exercise 3: Create an apm.yml Manifest (The Team Configuration Path)

Navigate to a repository you maintain (FanHub's Node.js track works well):

```bash
cd ~/projects/fanhub/node
```

Create an `apm.yml` file in the repository root:

```yaml
# apm.yml - Team-wide Copilot configuration
version: 1

plugins:
  - name: code-review-assistant
    version: ^1.0.0
  - name: test-generator
    version: ^2.1.0
```

This manifest declares: "This repository needs two plugins — code-review-assistant and test-generator. Install the latest compatible versions matching ^1.0.0 and ^2.1.0."

Run `apm install`:

```bash
apm install
```

**What happens:**
- APM reads `apm.yml`
- Downloads both plugins
- Generates `apm-lock.yml` with exact versions
- Registers the plugins with Copilot

Check the lockfile:

```bash
cat apm-lock.yml
```

**Output example:**
```yaml
version: 1
lockfileVersion: 1

plugins:
  code-review-assistant:
    version: 1.2.3
    resolved: https://registry.apm.dev/code-review-assistant/-/code-review-assistant-1.2.3.tgz
    integrity: sha512-abc123...
  test-generator:
    version: 2.1.4
    resolved: https://registry.apm.dev/test-generator/-/test-generator-2.1.4.tgz
    integrity: sha512-def456...
```

**What to notice:** The manifest says `^1.0.0`, but the lockfile records `1.2.3` — the exact version that was installed. This is the key difference: `apm.yml` is the intent ("I want a code review plugin"), `apm-lock.yml` is the reality ("you got version 1.2.3 on April 17, 2026").

Commit both files:

```bash
git add apm.yml apm-lock.yml
git commit -m "Add APM manifest for team Copilot plugins"
```

**What you've achieved:** Your repository now has reproducible Copilot configuration. Anyone who clones this repo and runs `apm install` will get the exact same plugins at the exact same versions.

---

## Exercise 4: Hydrate a Fresh Clone (The Onboarding Story)

Simulate a new developer joining your team. Clone the repository to a new directory (or have a teammate clone it):

```bash
cd ~/Downloads
git clone https://github.com/yourname/fanhub fanhub-fresh
cd fanhub-fresh/node
```

The repository has an `apm.yml` and `apm-lock.yml` file. Run:

```bash
apm install
```

**What happens:**
- APM reads `apm-lock.yml`
- Installs `code-review-assistant@1.2.3` (exact version from lockfile)
- Installs `test-generator@2.1.4` (exact version from lockfile)
- The developer now has the same Copilot setup as the team

Verify:

```bash
copilot plugin list
```

**Output:**
```
Installed plugins:
  - code-review-assistant@1.2.3 (local to ~/Downloads/fanhub-fresh/node)
  - test-generator@2.1.4 (local to ~/Downloads/fanhub-fresh/node)
```

**What to notice:** The developer didn't read a wiki page. They didn't ask on Slack. They didn't manually install anything. They ran one command — `apm install` — and inherited the team's full Copilot configuration. This is the "install once, configure everywhere" promise.

**Contrast with the personal plugin workflow:**

If you had used `copilot plugin install code-review-assistant` globally, every developer would need to run that command manually. There's no manifest, no lockfile, no version guarantee. Developer A gets `1.2.3` on Monday. Developer B gets `1.3.0` on Friday (a new release dropped). Their Copilot agents behave differently.

With APM, the lockfile freezes `1.2.3`. Both developers get the same version. Updates are explicit: someone runs `apm update`, reviews the lockfile diff in a PR, then merges.

---

## Exercise 5: Expand the Manifest (Instructions + MCP Servers)

APM orchestrates more than plugins. Expand your `apm.yml` to include instructions files and MCP servers:

```yaml
# apm.yml - Full team configuration
version: 1

plugins:
  - name: code-review-assistant
    version: ^1.0.0

instructions:
  - path: .github/copilot-instructions.md

mcpServers:
  - name: github-mcp
    source: npm:@modelcontextprotocol/server-github
    version: ^1.2.0
```

Create a sample instructions file:

```bash
mkdir -p .github
cat > .github/copilot-instructions.md << 'EOF'
# FanHub Team Copilot Instructions

When reviewing code:
- Check for duplicate data in seed files
- Validate all API inputs
- Ensure error responses include correlation IDs

When generating tests:
- Use the FanHub testing conventions in TESTING.md
- Mock external services, never call real APIs
EOF
```

Run `apm install` again:

```bash
apm install
```

**What happens:**
- APM installs the plugin (if not already installed)
- Loads `.github/copilot-instructions.md` into Copilot's context
- Installs the GitHub MCP server, enabling Copilot to query GitHub APIs directly

Test the instructions:

```bash
copilot
```

Ask:
```
Review the characters API route for the bugs mentioned in our team instructions.
```

Copilot's response will reference the FanHub-specific guidance from your instructions file (duplicate data, input validation, correlation IDs).

**What to notice:** The manifest is now orchestrating three layers:
1. **Plugins** — extend Copilot with custom capabilities
2. **Instructions** — guide Copilot with team-specific context
3. **MCP servers** — integrate live external data sources

All three are versioned, locked, and installed together with one command.

---

## Exercise 6: Update and Review Lockfile Changes

A few weeks pass. A new version of `code-review-assistant` is released. Update your dependencies:

```bash
apm update
```

**What happens:**
- APM checks for newer versions compatible with your `^1.0.0` constraint
- Finds `code-review-assistant@1.3.0`
- Updates `apm-lock.yml` to record the new version
- Does NOT auto-commit — you review the change first

Check the diff:

```bash
git diff apm-lock.yml
```

**Output example:**
```diff
 plugins:
   code-review-assistant:
-    version: 1.2.3
+    version: 1.3.0
     resolved: https://registry.apm.dev/code-review-assistant/-/code-review-assistant-1.3.0.tgz
-    integrity: sha512-abc123...
+    integrity: sha512-xyz789...
```

This is a dependency update, just like updating npm packages. Review the plugin's changelog, test locally, then commit:

```bash
git add apm-lock.yml
git commit -m "Update code-review-assistant to 1.3.0"
```

**What to notice:** Lockfile changes are visible in pull requests. Your team reviews them like any other dependency update. CI can validate that the lockfile matches the manifest (see the CI workflow in the tech talk's Use Case 3).

---

## The "Aha" Moment: Which Command When?

By now you've used both paths. Here's when to use each:

| Use `copilot plugin install` when... | Use `apm install` when... |
|---------------------------------------|---------------------------|
| Exploring new plugins personally | Setting up a fresh clone of a team repo |
| Testing a plugin before committing to it | Ensuring everyone has the same Copilot config |
| One-off customization for your machine | Versioning agent configuration as code |
| No team coordination needed | Onboarding new developers automatically |

**The mental model shift:**

- `copilot plugin` = personal toolbox (your machine, your choice)
- `apm` = team infrastructure (version-controlled, reproducible, enforced in CI)

Both use the same plugin registry. Both install the same code. The difference is coordination: personal vs. team, ad-hoc vs. reproducible, manual vs. automated.

**What you've achieved:**

✅ Discovered plugins via the CLI marketplace
✅ Installed and tested a plugin with `copilot plugin install`
✅ Created an `apm.yml` manifest for team configuration
✅ Generated a lockfile to freeze exact versions
✅ Hydrated a fresh repository clone with `apm install`
✅ Expanded the manifest to include instructions and MCP servers
✅ Updated dependencies and reviewed lockfile diffs

You now have the full mental model: individual plugin management for exploration, APM orchestration for team infrastructure.
