---
status: active
updated: 2026-08-10
section: "Developers"
references:
  - url: https://code.visualstudio.com/docs/copilot/copilot-coding-agent
    label: "GitHub Copilot coding agent - VS Code"
    verified: 2026-04-06
  - url: https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent
    label: "About the Copilot coding agent"
    verified: 2026-04-06
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment
    label: "Customizing the development environment for GitHub Copilot cloud agent"
    verified: 2026-04-06
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall
    label: "Customizing or disabling the firewall for GitHub Copilot cloud agent"
    verified: 2026-04-06
  - url: https://github.blog/ai-and-ml/github-copilot/assigning-and-completing-issues-with-coding-agent-in-github-copilot/
    label: "Assigning and completing issues with coding agent in GitHub Copilot"
    verified: 2026-04-06
  - url: https://github.blog/ai-and-ml/github-copilot/onboarding-your-ai-peer-programmer-setting-up-github-copilot-coding-agent-for-success/
    label: "Onboarding your AI peer programmer"
    verified: 2026-04-06
  - url: https://github.blog/changelog/2026-08-03-trigger-copilot-automations-with-comments
    label: "Trigger Copilot automations with comments"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-08-03-customize-the-reasoning-level-for-copilot-cloud-agent
    label: "Customize the reasoning level for Copilot cloud agent"
    verified: 2026-08-10
---

# From Issue to Pull Request: GitHub Copilot's Coding Agent in Practice

> **The Question This Talk Answers:**
> *"What if filing an issue was the same as fixing it?"*

**Duration:** 40 minutes | **Target Audience:** Developers / Tech Leads / Product Managers

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Every team has a backlog of well-understood work that never gets prioritized — the coding agent targets exactly that capacity gap |
| **Compelling** | 🟢 High | Assign an issue from a browser, get back a tested draft PR — with the assigner unable to approve it. That's a genuinely new loop |
| **Actionable** | 🟢 High | One `copilot-setup-steps.yml` and a well-formed issue is all it takes to start — no new tooling, no install |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Issue-to-PR delegation**
  Assign a GitHub issue to Copilot from the browser, VS Code chat, or GitHub Mobile — and receive a tested, linted draft PR in return, authored by the agent in a sandboxed GitHub Actions environment

- **Environment-consistent execution**
  A single `.github/workflows/copilot-setup-steps.yml` file pre-configures the exact runtime the agent uses — same Node version, same dependencies, same build tooling as the team's CI pipeline

- **Network-controlled autonomy**
  The Agent Firewall restricts outbound connections to an approved allowlist, making autonomous code generation secure enough for repositories with sensitive data or regulated access

- **Human-in-the-loop by design**
  The agent opens a draft PR — never merges. The person who assigned the task cannot be the approver, enforcing separation of duties on every agent-generated change

- **Portable customizations**
  `.github/copilot-instructions.md`, agent skills, and custom review agents apply identically to agent-authored code and human-authored code — no separate configuration path

### The Emerging Practice

Teams are discovering a new division of work: developers handle implementation that requires design judgment, deep context, or creative problem-solving; the coding agent handles implementation that is well-understood, bounded, and repeatable. Dependency upgrades, CRUD endpoint scaffolding, documentation sync after a refactor, test coverage gaps flagged by CI — these are tasks everyone knows need doing and no one has time to prioritize.

The agent changes that calculus. The input is an issue. The output is a draft PR with the changes made, tests run, and a summary of what was changed and why. The human's job shifts from writing the code to reviewing it — a task that takes a fraction of the time and can happen from a browser or a phone.

What makes this durable rather than just clever: the agent respects everything the team has already configured. Coding standards in `.github/copilot-instructions.md` apply to agent PRs. Custom review agents built for security or compliance run against agent-authored code exactly as they do for human-authored code. The environment the agent runs in is the same one the team defines in `copilot-setup-steps.yml`. The customization investment compounds.

> 💡 **GitHub Spark**: For product managers and designers who want to validate ideas before any implementation begins, GitHub Spark generates interactive UI prototypes from natural language descriptions — accessible from github.com/copilot. Spark is complementary to the coding agent: Spark validates *what* to build, the coding agent handles *routine implementation* once the design is decided.

---

## How It Works: The Coding Agent

### What It Does

The GitHub Copilot coding agent is an autonomous AI developer that runs inside GitHub Actions.[^1] Started through direct delegation or a repository-configured automation, it analyzes the codebase, makes changes across files, runs the test suite, and opens a draft PR — all in a sandboxed, ephemeral environment with no access to production systems.

### Key Capabilities

- **Browser-triggered execution**: Assign from github.com/copilot, VS Code, GitHub CLI, or GitHub Mobile — the agent works asynchronously regardless of where the task originates[^2]
- **Multi-file changes**: The agent reads the full codebase context, makes coordinated changes across multiple files, and resolves dependencies between changes
- **CI pipeline execution**: Tests, linters, and build steps defined in the repository run inside the agent's environment — PRs arrive with passing or failing status already known
- **Iterative refinement**: Leave comments on the draft PR; the agent reads them, pushes new commits, and re-runs the test suite
- **Evidence bundle**: Every draft PR includes a summary of changes made, the agent's reasoning, and — when the Agent Firewall blocks a connection attempt — a log of the blocked call

### Architecture Overview

The coding agent operates in a three-layer model.[^2]

**Intelligence layer** — The same model access (GPT-4.1, Claude Sonnet 4, Claude Opus 4), repository instructions, and custom skills shared across all Copilot interfaces. When the coding agent reads `.github/copilot-instructions.md`, it's using the same document that shapes responses in VS Code chat.

**Environment layer** — A fresh, ephemeral GitHub Actions runner (Ubuntu by default) provisioned for each agent session. `copilot-setup-steps.yml` runs first to pre-install dependencies and configure tooling. The runner is destroyed when the session ends.

**Governance layer** — The Agent Firewall restricts outbound network access to an approved allowlist, blocks arbitrary external connections, and logs any blocked attempt in the PR evidence bundle. All branch protection rules, required status checks, and code owners are enforced as they would be for any PR.

**Official Documentation:**
- 📖 **[GitHub Copilot coding agent (VS Code docs)](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)** — Core concepts and triggering the agent[^1]
- 📖 **[About the Copilot coding agent (GitHub docs)](https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent)** — Architecture and capabilities[^2]
- 📖 **[Customizing the development environment](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)** — `copilot-setup-steps.yml` reference[^3]

---

## 📦 Key Artifacts

**Four primary artifacts shown inline in the major sections below:**

### Primary Artifacts

- **`copilot-issue-template.md`** — Structured issue template that gives the coding agent the context it needs to produce high-quality PRs
- **`.github/workflows/copilot-setup-steps.yml`** — Pre-configures the agent's runtime environment before execution begins
- **`.github/copilot-instructions.md` excerpt** — Repository-level coding standards that apply to both agent-authored and human-authored code
- **`.github/agents/review-enforcer.md`** — Custom review agent that evaluates agent-generated PRs against team standards

### Supporting Files

- **[Coding Agent Documentation](https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent)** — Complete capability and architecture reference
- **[Agent Firewall Configuration](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall)** — Allowlist management and org-level controls
- **[Onboarding your AI peer programmer](https://github.blog/ai-and-ml/github-copilot/onboarding-your-ai-peer-programmer-setting-up-github-copilot-coding-agent-for-success/)** — GitHub Blog guide for team adoption[^6]

---

## 🎯 Mental Model Shift

> **The Core Insight:** Filing a well-formed issue is now the same skill as delegating implementation — the agent closes the gap between "we know what needs doing" and "it's done."

### Move Toward (Embrace These Patterns)

- ✅ **Issue-as-specification**: Write issues with clear acceptance criteria and scope boundaries → the agent's PR quality directly reflects the issue's clarity
- ✅ **Delegation for the well-understood**: Assign tasks where the *what* is clear even if the *how* takes time → dependency upgrades, scaffold generation, doc sync, lint cleanup
- ✅ **Review-first workflow**: Evaluate agent PRs by outcome quality, not by whether the approach matches what you'd have written → faster review cycles, focus on correctness over style
- ✅ **Environment-as-code**: Commit `copilot-setup-steps.yml` to the default branch → every agent session uses the exact same runtime as the team's CI pipeline

### Move Away From (Evolving Practices)

- 🔄 **Deferring bounded work indefinitely**: Technical debt items with clear scope are now candidates for delegation rather than perpetual backlog residents → try assigning one this sprint
- 🔄 **Reviewing agent code more skeptically than human code**: Agent PRs include test results, linter output, and an evidence bundle → apply the same review criteria used for any contributor
- 🔄 **Separate customization paths**: `.github/copilot-instructions.md` and agent skills written for VS Code apply identically to coding agent sessions → no need to maintain separate configuration

### Move Against (Active Resistance)

- 🛑 **Assigning open-ended design work**: Tasks that require creative judgment, novel architecture, or exploration of unknowns produce poor agent PRs regardless of issue quality → keep those human
- 🛑 **Skipping `copilot-setup-steps.yml`**: Agents operating without pre-configured environments make guesses about build tooling, produce PRs that fail CI, and require rework → configure the environment before delegating real work
- 🛑 **Disabling the firewall on sensitive repos**: The firewall is the primary protection against data exfiltration from agent-generated code → disable only for throwaway repos with no credentials or secrets

> **What This Looks Like:** A developer files an issue: "Upgrade lodash from v4 to v5 across all utility files, update affected tests, and add a migration note to CHANGELOG.md." They assign it to Copilot. Forty minutes later, a draft PR exists with the lodash imports updated across 23 files, tests passing, and CHANGELOG updated. The developer reviews the diff on their phone during lunch, leaves two comments requesting changes, and the agent pushes a follow-up commit. Total human time: 12 minutes.

---

## When to Use This Pattern

### Decision Tree

```
Q: What kind of task is this?
├─ Well-understood, bounded implementation
│  ├─ Routine work (dependency upgrade, test scaffold, doc sync, lint fix)
│  │  → Delegate to Coding Agent
│  │  └─ Best for: saving developer time on known-but-deferred work
│  │
│  └─ Boilerplate with clear spec (CRUD endpoints, migration scripts)
│     → Delegate to Coding Agent
│     └─ Best for: teams with established patterns the agent can follow
│
├─ Requires design judgment or creative problem-solving
│  → Keep human (IDE + Copilot chat as an assistant)
│  └─ Best for: novel features, architecture decisions, complex debugging
│
├─ Spans multiple repositories
│  → Keep human (agent works in one repo at a time)
│  └─ Best for: cross-repo coordination, monorepo-external changes
│
└─ Needs local environment, database, or external service access
   → Keep human (agent's sandbox has no production access)
   └─ Best for: local debugging, environment-specific reproduction
```

### Use the Coding Agent When

- The implementation approach is clear enough to write a spec (even informally) in an issue
- The task would take 30 minutes to 4 hours for a developer familiar with the codebase
- The repository has a working CI pipeline the agent can run against
- The work is in a single repository

### Boundaries Worth Knowing

- **Multi-repo changes**: The agent works within one repository per session — cross-repo coordination requires human orchestration
- **Local environment reproduction**: Issues that manifest only in local environments or require database access can't be reproduced in the agent's sandbox
- **Novel feature design**: Tasks that require exploring the design space produce better results with human judgment; use IDE Copilot chat for these
- **Windows-only tooling**: The agent's runner is Ubuntu-based; Windows-specific build requirements need `copilot-setup-steps.yml` runner configuration

### Comparison: Coding Agent vs. IDE Copilot vs. Copilot Chat (Web)

| Aspect | Coding Agent | IDE Copilot | Web Copilot Chat |
|--------|-------------|-------------|-----------------|
| **Best For** | Delegated autonomous tasks | Interactive implementation | Review, triage, coordination |
| **Trigger** | Direct delegation / repository automation | In-editor interaction | Browser / mobile chat |
| **Output** | Complete draft PR | Inline code suggestions | Text responses, issue/PR creation |
| **Human Involvement** | Review & approve | Real-time collaboration | Conversational |
| **Setup Required** | `copilot-setup-steps.yml` recommended | VS Code extension | Zero (browser only) |
| **Mobile-Ready** | Trigger + review via GitHub Mobile | No | Yes |

---

<!-- 🎬 MAJOR SECTION: Delegation Loop -->
## The Delegation Loop: From Issue Assignment to Draft PR

The coding agent's core workflow is a closed loop that starts with a well-formed issue and ends with a reviewable PR — with no developer involvement in between.[^5]

### Triggering the Agent

Direct delegation remains the clearest path for one bounded issue:

**From github.com/copilot or any GitHub issue page:**
1. Open the issue
2. In the Assignees section, select **Copilot**

**From VS Code:**
1. Open GitHub Copilot Chat (`Ctrl+Shift+I`)
2. Type: `@github Create a PR that fixes #427`
3. The agent starts asynchronously — chat returns immediately

**From GitHub Mobile:**
1. Open the issue in the GitHub app
2. Tap **Assignees → Copilot**

Repository owners can also configure cloud-agent **Automations** under **Agents → Automations**. An automation starts when an issue or pull-request comment contains the trigger text that the owner specified. That makes recurring handoffs possible where work is discovered: request a documentation update, investigate an error reported in a thread, or create a follow-up issue. Trigger text is configured per automation; there is no universal slash command. For Copilot Business and Copilot Enterprise, an administrator must enable the Copilot cloud agent policy before these automations are available.[^11]

These automation trigger comments start a new configured run. They are distinct from comments left on an existing agent-authored draft PR, which refine that in-progress implementation and cause the agent to push follow-up commits.

At cloud-agent task start, choose a reasoning level beside the supported model when the model offers that control. Higher reasoning can improve quality on complex work, but it uses more tokens and therefore more premium-request credits for that run. Reasoning levels are available only for supporting models, and cloud-agent task controls require a paid Copilot plan that includes the cloud agent.[^12]

Each path creates an asynchronous session. The agent works independently; there's no need to stay connected.

### What Happens Inside the Sandbox

Once triggered, the agent follows a consistent sequence:[^2]

```
1. Provision ephemeral runner (Ubuntu, fresh for every session)
2. Run copilot-setup-steps.yml (if present on default branch)
3. Clone the repository at the issue's base branch
4. Read context:
   - Issue body, comments, linked PRs
   - .github/copilot-instructions.md
   - Relevant source files (via code search + RAG)
5. Plan changes (logs visible in session UI)
6. Implement across files (may iterate multiple times)
7. Run build, tests, linters
8. Create branch: copilot/issue-NNN
9. Open draft PR with evidence bundle
10. Destroy runner
```

The session log is visible in the GitHub **Agents tab** — a repository-level view of all agent sessions and their resulting PRs.[^2]

### The Evidence Bundle

Every draft PR includes an evidence bundle in the PR description:[^5]

- **Summary of changes**: What was changed and why, in plain language
- **Files modified**: List of changed files with the agent's rationale for each
- **Test results**: Pass/fail status from the CI run inside the sandbox
- **Firewall alerts**: Any blocked outbound connection attempts, with the triggering command

Reading the evidence bundle takes 2–3 minutes and gives a complete picture of what the agent did before opening the diff.

### The Separation-of-Duties Constraint

**The developer who assigned the issue cannot be the PR approver.**[^2] This is enforced by GitHub, not configurable, and intentional — it ensures a second human reviews every agent-generated change before it reaches the default branch. For teams where the tech lead typically both assigns and reviews, plan for a second reviewer in the loop.

---

<!-- 🎬 MAJOR SECTION: Writing Issues -->
## Writing Issues That Work

The quality of the agent's PR is a direct reflection of the quality of the issue. Issues that produce useful PRs share a common structure: they define the *what* precisely enough that the approach is implied, without over-specifying the *how*.[^6]

### Anatomy of an Effective Agent Issue

An issue that works well for the coding agent has four components:

1. **Acceptance criteria** — What "done" looks like, stated as testable conditions
2. **Scope boundaries** — What is and is not in scope (prevents the agent from "helpfully" expanding the change)
3. **Context links** — Related issues, PRs, or files that provide essential background
4. **Constraints** — Patterns to follow, libraries to avoid, performance requirements

**Example: Weak issue (produces inconsistent results)**

```markdown
## Fix the authentication bug
The auth is broken. Please fix it.
```

**Example: Effective issue (produces consistent, reviewable PRs)**

```markdown
## Upgrade rate-limiting middleware from express-rate-limit v6 to v7

### Acceptance Criteria
- [ ] `express-rate-limit` updated to latest v7.x in package.json
- [ ] Any v6 configuration using `onLimitReached` migrated to `handler` (v7 breaking change)
- [ ] Existing rate-limit tests pass without modification
- [ ] New test added verifying the `handler` callback fires on limit exceeded

### Scope
- In scope: `src/middleware/`, `package.json`, `package-lock.json`, tests in `test/middleware/`
- Out of scope: Rate limit configuration values, route-level middleware application

### Context
- Migration guide: https://github.com/express-rate-limit/express-rate-limit/wiki/Migrating-from-v6-to-v7
- Current middleware config: `src/middleware/rateLimiter.js`

### Constraints
- Follow error handling patterns in `src/middleware/errorHandler.js`
- Do not change the public API of the rate limiter module
```

### Issue Template for Agent Delegation

```markdown
<!-- copilot-issue-template.md -->
## [Task Title — verb + noun, e.g., "Upgrade X from v1 to v2"]

### What needs to happen
[One paragraph describing the task. What changes, and what's the expected end state?]

### Acceptance Criteria
- [ ] [Testable condition 1]
- [ ] [Testable condition 2]
- [ ] [Testable condition 3]

### Scope
**In scope:** [Files, directories, or systems to change]
**Out of scope:** [Explicit boundaries — what the agent must not touch]

### Context
- [Link to migration guide, related issue, or reference implementation]
- [Relevant source files the agent should study first]

### Constraints
- [Coding patterns to follow]
- [Libraries or approaches to avoid]
- [Performance or compatibility requirements]
```

### Image-Based Issue Creation: The Fast Path

For operations teams triaging production alerts or product managers capturing UI bugs, the fastest path to a well-formed issue is visual: drag a screenshot directly into the github.com/copilot chat window.[^9]

The AI reads the image — extracting error messages, stack traces, timestamps, request IDs, and UI state — and generates a structured issue with template applied, labels assigned, and severity assessed from the error context. A 14-minute manual transcription process becomes a 2-minute task with higher detail capture (95% vs. ~60% manually).

This is particularly effective for:
- PagerDuty/monitoring alerts with screenshot attachments
- UI bugs reported via screenshots from QA or users
- Error dialogs captured during testing

Once the issue is created and refined, assign it to Copilot to close the loop.

---

<!-- 🎬 MAJOR SECTION: Trust and Configuration -->
## Trust and Configuration: Environment Setup and the Agent Firewall

Two configuration files determine how trustworthy and consistent the coding agent's work is: `copilot-setup-steps.yml` controls what goes *into* the environment; the Agent Firewall controls what stays *out* of it. Teams that configure both get consistent, auditable PRs. Teams that skip both get unpredictable results.

### Configuring the Agent Environment with `copilot-setup-steps.yml`

Before the agent begins any coding work, it runs the steps defined in `.github/workflows/copilot-setup-steps.yml` — if that file exists on the repository's default branch.[^3]

The file is a standard GitHub Actions workflow with one requirement: a single job named exactly `copilot-setup-steps`. Everything else is normal Actions syntax — any `uses:` action, `run:` command, or environment variable that works in CI works here.

**Minimal example (Node.js project):**

```yaml
# .github/workflows/copilot-setup-steps.yml
name: "Copilot Setup Steps"

on:
  workflow_dispatch:
  push:
    paths:
      - .github/workflows/copilot-setup-steps.yml
  pull_request:
    paths:
      - .github/workflows/copilot-setup-steps.yml

jobs:
  copilot-setup-steps:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
```

**Key behaviors to know:**[^3][^7]
- The `workflow_dispatch` + path triggers let the team test setup steps in CI before the agent runs them — failures are visible in workflow logs, not just agent sessions
- If setup steps fail, the agent continues and reports the failure in the session log (as of mid-2025) — this prevents setup step errors from silently blocking all agent work
- Setup step logs are visible in the Copilot session UI, making environment debugging straightforward
- **Setup steps run before firewall enforcement** — meaning `npm ci`, `pip install`, and tool downloads happen without network restriction; the firewall activates after setup completes

**Advanced configuration options:**[^3]

```yaml
jobs:
  copilot-setup-steps:
    # Use a larger runner for memory-intensive builds
    runs-on: ubuntu-latest-8-core
    steps:
      - uses: actions/checkout@v4
        with:
          lfs: true   # Enable Git LFS if the repo uses it
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Install internal CLI tools
        run: |
          # Tools from private registries — add their domains to firewall allowlist
          pip install --index-url https://artifacts.company.internal/pypi our-internal-tool
```

### The Agent Firewall

The coding agent runs in a sandboxed GitHub Actions environment with network access restricted by default to an approved allowlist.[^4] The firewall's purpose: prevent agent-generated code from making unauthorized outbound connections during execution — whether accidental (a test that calls a live API) or intentional (generated code attempting to exfiltrate repository data).

**Default allowlist includes:**[^4]
- Package registries: npm, PyPI, Maven Central, RubyGems, NuGet
- OS package managers: apt, yum, apk
- Container registries: Docker Hub, ghcr.io, gcr.io
- GitHub services: api.github.com, raw.githubusercontent.com
- SSL certificate authorities and Playwright browser downloads

Most repositories can start using the coding agent immediately — standard dependency installation works without any allowlist configuration.

**When to extend the allowlist:**

If the repository uses internal registries, private package sources, or staging APIs that tests call, add them to the allowlist at the organization or repository level:

- **Organization-level**: *Organization Settings → Copilot → Cloud agent → Custom allowlist*
- **Repository-level**: *Repository Settings → Code, planning, and automation → Copilot → Cloud agent*

**Firewall interaction with setup steps:**

Setup steps run *before* firewall enforcement begins. Private package installations and internal tool downloads in `copilot-setup-steps.yml` succeed without needing allowlist entries — the firewall only applies to code the *agent writes and executes* during development, not to the environment setup phase.

**Blocked connection logging:**

When the agent attempts a connection the firewall blocks, it logs:

```
⚠️ Firewall blocked outbound connection
Target: unauthorized-domain.com:443
Command: curl https://unauthorized-domain.com/upload
Time: 2026-04-06T14:32:17Z
```

This log appears in the PR evidence bundle. A blocked connection is worth investigating — it's either a test that legitimately calls an external API (add to allowlist) or an indication that generated code attempted an unauthorized call (investigate before merging).

**Security model boundaries:**

The firewall provides strong defense-in-depth but is not a complete security boundary. It does not apply to self-hosted runners, Windows-based runners, or MCP servers. For repositories with secrets or credentials, combine firewall with a security-focused custom review agent.

### Repository Customizations Apply to Agent PRs

`.github/copilot-instructions.md` and agent skills defined in `.github/skills/` apply identically to coding agent sessions — no additional configuration needed.[^2] The intelligence layer (instructions, skills, agents) is interface-agnostic. When the team defines error handling patterns in `copilot-instructions.md`, those patterns shape agent PRs exactly as they shape in-editor suggestions.

This means the customization investment compounds. Instructions written for VS Code, skills built for web chat, and review agents designed for the browser all apply automatically when the coding agent runs. Build once, apply everywhere.

---

<!-- 🎬 MAJOR SECTION: Review Workflow -->
## The Review Workflow: From Draft PR to Merge

The coding agent opens a draft PR — never merges. The review workflow is where teams maintain quality and build the trust needed to expand what they delegate.[^5]

### Reading the Evidence Bundle

The evidence bundle is the starting point for every agent PR review. Before opening the diff, read:

1. **Summary**: What the agent changed and its stated rationale — 2–3 minutes
2. **Test results**: Pass/fail status from the agent's CI run — tells whether the change works before looking at code
3. **Firewall alerts**: Any blocked connections — investigate before proceeding if unexpected calls appear

In most cases, a clean evidence bundle (passing tests, no firewall alerts, coherent summary) means the diff review focuses on correctness and edge cases rather than basic functionality.

### Iterating via PR Comments

If the PR needs changes, leave comments directly in the PR — the agent reads them and pushes new commits:[^2]

Unlike an automation trigger comment, this feedback does not start a separate configured automation; it refines the existing draft PR and its active task.

**Comments that work well:**
```
The handler in src/middleware/rateLimiter.js uses `res.status(429).send()` but we
always use our error response wrapper. See src/utils/errorResponse.js for the pattern.
```

**Comments that are too vague:**
```
This looks wrong. Fix it.
```

The agent can iterate 3–5 times on a PR before diminishing returns. For changes requiring significant redesign, it's typically faster to close the PR, refine the issue, and re-assign.

### Reviewing from the Browser and Mobile

The entire review workflow happens in the browser — no IDE required. For team leads and senior developers who review many PRs, mobile review via GitHub Mobile enables the review loop to happen during meetings, commutes, and off-hours without requiring a return to the desk.

**Mobile review workflow (3 minutes):**
1. Open draft PR notification in GitHub Mobile
2. Read evidence bundle summary
3. Invoke `@review-enforcer` custom agent
4. Read agent's analysis: security, logic, test coverage
5. Approve or request specific changes

Teams with distributed members across time zones report 4-hour average PR wait times dropping to under 30 minutes when mobile review becomes standard practice.

### Custom Review Agents for Agent PRs

Custom review agents defined in `.github/agents/` work identically for agent-authored PRs as for human-authored PRs. A mobile-optimized review agent provides structured, scannable output suited for phone screens:

```markdown
<!-- .github/agents/review-enforcer.md -->
# @review-enforcer

You are a PR reviewer optimized for efficiency. Analyze this PR and provide:

## Decision
**[APPROVE / REQUEST_CHANGES / COMMENT]**

## Findings
🔴 **Critical** (blocks merge): [List only blockers]
🟡 **Important** (request changes): [List significant issues]
🟢 **Acceptable**: [Brief note on what looks good]

## Rationale
[2 sentences explaining the decision]

## If requesting changes
[Specific, actionable instructions — reference file and line numbers]

---
Focus on: security vulnerabilities, correctness, breaking changes, missing error handling.
Skip: style preferences, minor naming, formatting (unless it violates repo standards).
Format for mobile readability. Maximum 300 words total.
```

**Security-focused variant for sensitive repositories:**

```markdown
<!-- .github/agents/security-reviewer.md -->
# @security-reviewer

Analyze this PR specifically for data security risks:

1. **External calls**: Check curl, wget, HTTP libraries for hardcoded URLs
2. **Secrets access**: Flag reads of .env, environment variables, credential files
3. **Firewall alerts**: Review evidence bundle for blocked connection attempts
4. **Injection risks**: Identify SQL, shell, or template injection patterns
5. **Allowlist validation**: Verify accessed domains match the repo's requirements

Provide:
- 🔴 **High risk**: Exfiltration attempt or severe vulnerability detected
- 🟡 **Medium risk**: Legitimate but worth verifying
- 🟢 **No risk found**: No external access or security concerns identified

Always reference the specific line and file for any finding.
```

Combine firewall + `@security-reviewer` for agent PRs in repositories with API keys, credentials, or customer data.

---

## Real-World Use Cases

### Use Case 1: Dependency Upgrade Sprint

**The Scenario:** A platform team owns 12 microservices. Each quarter, they spend two weeks on dependency upgrades — a known, mechanical task that consumes senior developer time.

**How It Works:** For each service, an issue is filed per dependency upgrade batch using the team's issue template. The coding agent handles the upgrade, migration of any breaking API changes, and test updates. Developers review diffs and approve.

**Example issue:**
```markdown
## Upgrade axios from v1.6 to v1.8 in payment-service

### Acceptance Criteria
- [ ] axios updated to ^1.8.0 in package.json
- [ ] Any deprecated config options migrated per v1.7 changelog
- [ ] All existing axios tests pass
- [ ] No new test failures introduced

### Scope
- In scope: package.json, src/clients/, test/clients/
- Out of scope: Request retry logic, auth headers (separate issue #441)

### Context
- Changelog: https://github.com/axios/axios/blob/main/CHANGELOG.md
- Current usage patterns: src/clients/paymentClient.js
```

**What the team gets:** 12 services upgraded in parallel over 3 days, with developers spending time on review rather than implementation. Estimated 60% reduction in developer-hours for the quarterly upgrade cycle.

---

### Use Case 2: Test Coverage on Demand

**The Scenario:** A backend team's coverage report shows 23 functions with zero test coverage, flagged in a recent security audit.

**How It Works:** One issue per module, filed with the coverage report as context. The coding agent generates test scaffolding, implements meaningful test cases following the team's patterns from `.github/copilot-instructions.md`, and runs the suite to confirm they pass.

**What the team gets:**
- Coverage gaps addressed without blocking sprint velocity
- Tests written to the team's existing patterns
- Developer review confirms correctness before merge

**Outcome:** 23 functions covered across 4 modules, reviewed and merged in one week. Zero developer-hours spent writing test boilerplate.

---

### Use Case 3: Documentation Sync After a Refactor

**The Scenario:** A developer refactors the authentication module, updating 15 files. The `docs/auth/` folder is now out of date but updating documentation never makes the sprint.

**How It Works:** File an issue with the refactored files listed as context. The coding agent reads the new implementation, compares it against the existing docs, and generates updated documentation.

**Example issue:**
```markdown
## Update auth module documentation after v2 refactor

### Acceptance Criteria
- [ ] docs/auth/README.md reflects new flow introduced in #387
- [ ] API reference updated for the 3 new parameters in AuthConfig
- [ ] Deprecated options removed from docs

### Context
- Refactor PR: #387
- Files changed: src/auth/ (all files)
- Docs to update: docs/auth/README.md, docs/auth/api-reference.md
```

**What the team gets:** Documentation updated in the same sprint as the implementation, not deferred indefinitely.

---

### Use Case 4: Operations Issue Triage via Image

**The Scenario:** SRE team processes 40 production alerts per week. Each alert arrives as a screenshot in a PagerDuty notification. Manual transcription to GitHub issues takes 14 minutes per alert.

**How It Works:**
1. Screenshot → drag into github.com/copilot
2. `"Create a P1 incident issue using our incident template"`
3. AI extracts: error code, affected services, timestamps, request IDs, stack trace
4. Review and submit in 2 minutes
5. Assign to Copilot for initial diagnostic PR if the fix pattern is known

**What the team gets:** 9.3 hours/week of transcription time → 1.3 hours/week. 95% detail capture vs. ~60% manual.[^9] When the fix is routine, the coding agent can close the loop with a PR before the on-call engineer finishes their coffee.

---

## ✅ What Teams Can Do Today

**In 15 minutes:**
- Visit [github.com/copilot](https://github.com/copilot) and ask a question about any repository — no setup required
- Browse to an existing issue, assign it to Copilot, and watch the agent session begin in the GitHub Agents tab
- Open GitHub Mobile and review an existing agent-authored draft PR

**In 1 hour:**
- Add `.github/workflows/copilot-setup-steps.yml` to a repository — use the Node.js example above as a starting point
- File one well-formed issue using the template in this talk and delegate it to the coding agent
- Review the evidence bundle in the resulting draft PR — note what it includes before reading the diff

**In 2–4 hours:**
- Create a `.github/agents/review-enforcer.md` custom review agent optimized for mobile PR review
- Run the agent on 3–5 issues across a sprint and compare review time vs. implementation time
- Configure the Agent Firewall allowlist with any internal registries or staging APIs the team's tests use
- Try image-based issue creation: drag a monitoring screenshot into github.com/copilot and generate a structured incident issue

**Next steps after first delegation sprint:**
1. ✅ Measure review-to-merge time for agent PRs vs. human PRs — most teams see 40–60% faster review cycles
2. 📖 Review complementary talk: [Agentic SDLC](../agentic-sdlc/) for multi-agent orchestration patterns
3. 📊 Build a backlog of "delegation candidates" — issues where the what is clear and the scope is bounded
4. 🚀 Expand to non-engineering roles: product managers filing issues for doc updates, ops teams delegating known remediation patterns

---

## Related Patterns

### Complementary Features

- **[Custom Instructions](../../workshop/01-instructions/)** — Repository-specific standards that shape agent PRs identically to how they shape IDE suggestions
- **[Agent Skills](../../workshop/04-agent-skills/)** — Domain capabilities (effort estimation, security checks) the agent can invoke during execution
- **[Custom Agents](../../workshop/06-custom-agents/)** — Specialized review agents for agent-authored code
- **[Copilot CLI](../copilot-cli/)** — Terminal interface for triggering agent sessions from scripts and CI pipelines
- **[Agentic SDLC](../agentic-sdlc/)** — Multi-agent orchestration patterns for complex, parallel workflows

### Decision Flow

```
Q: What's the nature of the work?
├─ Delegatable implementation (bounded, well-understood)
│  → Use: Coding Agent (this talk)
│
├─ Interactive implementation (needs real-time exploration)
│  → Use: IDE Copilot (VS Code extension)
│
├─ Coordination (reviews, triage, planning)
│  → Use: Web Copilot Chat (github.com/copilot)
│
└─ Multi-agent orchestration (complex, parallel workflows)
   → See: Agentic SDLC talk
```

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for complete navigation help.

---

## 🎭 Behind the Scenes

### Why the Job Name Matters

The `copilot-setup-steps.yml` job name contract (`copilot-setup-steps`) is not arbitrary — GitHub's platform looks specifically for a job with that exact name to run before agent sessions.[^3] Any other job name in the file is ignored by the agent. A common misconfiguration is naming the job `setup` or `prepare` and wondering why the agent's environment isn't configured. The trigger conditions (`workflow_dispatch`, push/pull_request path filters) are flexible — the job name is not.

### How the Agent Reads the Codebase

The coding agent uses a combination of GitHub's code search API and retrieval-augmented generation (RAG) to build context before making changes.[^2] It doesn't read the entire codebase into the context window — for large repositories, this would be impractical. Instead, it reads:

- The issue body, comments, and linked issues/PRs
- Files explicitly referenced in the issue
- Files discovered via code search related to the task
- `.github/copilot-instructions.md`

This is why issue quality matters: the files listed in the "Context" section of a well-formed issue are the files the agent studies most carefully. An issue that says "update the auth module" without linking to specific files may lead the agent to start from broader code search results.

### The Separation-of-Duties Constraint in Practice

The rule that the assigner cannot approve has one practical implication: teams where senior developers both assign agent work and own the merge approval path need a second reviewer in the loop. For most teams, this is already the case — tech leads assign, developers review. For smaller teams or solo projects, consider designating a rotation approver or using the constraint as a trigger for cross-team code review.

---

## 📚 References

### Official Documentation

[^1]: **[GitHub Copilot coding agent — VS Code](https://code.visualstudio.com/docs/copilot/copilot-coding-agent)** — Core concepts, triggering the agent from VS Code, and agent session management

[^2]: **[About the Copilot coding agent — GitHub Docs](https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent)** — Architecture, security model, capabilities, and limitations

[^3]: **[Customizing the development environment — GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-environment)** — `copilot-setup-steps.yml` reference, runner configuration, and customization options

[^4]: **[Customizing or disabling the firewall — GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall)** — Allowlist management, org-level controls, and firewall limitations

### Blog Posts & Announcements

[^5]: **[Assigning and completing issues with coding agent](https://github.blog/ai-and-ml/github-copilot/assigning-and-completing-issues-with-coding-agent-in-github-copilot/)** — GitHub Blog: delegation workflow, evidence bundle, and PR lifecycle

[^6]: **[Onboarding your AI peer programmer](https://github.blog/ai-and-ml/github-copilot/onboarding-your-ai-peer-programmer-setting-up-github-copilot-coding-agent-for-success/)** — GitHub Blog: issue quality, setup strategies, and adoption patterns

[^7]: **[Custom setup steps: more reliable and easier to debug](https://github.blog/changelog/2025-07-30-copilot-coding-agent-custom-setup-steps-are-more-reliable-and-easier-to-debug/)** — Changelog: failure resilience and setup log visibility improvements

### Tutorials & Community

[^8]: **[Supercharge Coding Agent with a customized dev environment](https://joshuaberkowitz.us/blog/news-1/supercharge-github-copilot-coding-agent-with-a-customized-dev-environment-540)** — Advanced `copilot-setup-steps.yml` patterns including Docker and private registries

[^9]: **[Using GitHub Copilot Chat in GitHub.com](https://docs.github.com/en/copilot/github-copilot-chat/copilot-chat-in-github/using-github-copilot-chat-in-githubcom)** — Image-based issue creation and web interface capabilities

[^10]: **[Power user's guide to Copilot on GitHub.com](https://github.blog/ai-and-ml/github-copilot/how-to-use-github-copilot-on-github-com-a-power-users-guide/)** — Advanced web interface patterns including multi-model selection and cross-repo analysis

[^11]: **[Trigger Copilot automations with comments](https://github.blog/changelog/2026-08-03-trigger-copilot-automations-with-comments)** — Changelog: repository-configured issue and pull-request comment triggers, example automations, and policy requirements

[^12]: **[Customize the reasoning level for Copilot cloud agent](https://github.blog/changelog/2026-08-03-customize-the-reasoning-level-for-copilot-cloud-agent)** — Changelog: per-run reasoning controls, supported-model availability, and token and premium-request tradeoffs

---

*GitHub Copilot coding agent — autonomous implementation, human-governed outcomes*
