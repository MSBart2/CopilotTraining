---
status: active
updated: 2026-06-16
section: "Agentic Systems"
references:
  - url: https://docs.github.com/en/copilot/concepts/agents/github-copilot-app
    label: "About the GitHub Copilot app - GitHub Docs"
    verified: 2026-06-16
  - url: https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started
    label: "Getting started with the GitHub Copilot app - GitHub Docs"
    verified: 2026-06-16
  - url: https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/
    label: "GitHub Copilot app: The agent-native desktop experience - GitHub Blog"
    verified: 2026-06-16
  - url: https://github.com/features/ai/github-app
    label: "GitHub Copilot app product page"
    verified: 2026-06-16
---

# The GitHub Copilot App: Running a Fleet of Agents

> **The Question This Talk Answers:**
> *"How do we run five agents in parallel on our backlog without losing control of the codebase?"*

**Duration:** 45 minutes | **Target Audience:** Senior Engineers / Tech Leads / Engineering Managers

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | The Copilot App launched at MS Build 2026 — teams already using Copilot in VS Code need to know when and how to move up to the fleet model |
| **Compelling** | 🟢 High | Parallel agent execution with isolated worktrees and Canvas coordination is a meaningfully different category of tooling, not a UI refresh |
| **Actionable** | 🟢 High | Available in technical preview now; five concrete actions with a 15-minute entry point |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Five agents, five issues, zero conflicts**
  Each agent session runs in its own isolated git worktree — parallel work is safe by design, not by careful coordination.

- **One dashboard, all active work**
  The "My Work" view surfaces every live session, open PR, CI status, and background automation across all connected repositories.

- **Dial in autonomy per task**
  Interactive, Plan, and Autopilot modes let our teams set the right trust level for each session — from fully supervised to fire-and-review.

- **Sessions that become pipelines**
  Convert one-off agent sessions into repeatable scheduled or event-triggered workflows — dependency updates, triage, release notes, all automated.

### The Emerging Practice

The GitHub Copilot app, launched at Microsoft Build 2026, is purpose-built for one thing: managing multiple autonomous AI agents working in parallel.[^3] It is a standalone desktop application — not an IDE extension — and it treats agent orchestration as a first-class job.

The shift it enables is architectural. In VS Code, Copilot is one collaborator at a time. In the Copilot App, our teams become coordinators of a fleet. A tech lead can dispatch agents to three open bugs and one refactor simultaneously, review their PRs in sequence, and maintain a clear view of what each agent is doing — all from a single application.

This matters because the bottleneck in most engineering teams isn't raw capability, it's throughput on routine and well-scoped work. The Copilot App makes it practical to have five "ready to review" sessions completed in the time it previously took to finish one.

---

## How It Works: The GitHub Copilot App

### What It Does

The GitHub Copilot app is an agent-native desktop control center that runs on macOS, Windows, and Linux.[^1] It connects to GitHub repositories, provisions isolated execution environments for each agent session, and provides unified observability across all active work.

### Key Capabilities

- **Parallel Sessions**: Multiple agents run concurrently, each in a separate git worktree with no branch conflicts
- **My Work Dashboard**: Unified view of sessions, issues, PRs, CI checks, and automations across repositories
- **Three Autonomy Modes**: Interactive, Plan, and Autopilot — selected per session based on task risk and clarity
- **Canvases**: Bidirectional visual surfaces where humans and agents co-edit plans, review PRs, and observe terminal output in real time
- **Agent Merge**: Autonomous PR lifecycle management — the agent monitors CI, handles reviewer feedback, and merges when all conditions are met
- **Repeatable Workflows**: Convert successful sessions into scheduled or event-triggered automations
- **MCP Tool Integration**: Agents access external tools and services via Model Context Protocol

### Architecture Overview

Each session in the Copilot App provisions an isolated git worktree — a lightweight Git mechanism where a single repository can have multiple checked-out branches in separate directories simultaneously.[^5] Five agents can each modify different files on different branches without any risk of collision.

Sessions run in either cloud sandboxes or local environments, depending on configuration. Cloud sandboxes are fully isolated execution environments; local sessions run in bounded contexts on the developer's machine. For Business and Enterprise plans, organization administrators configure which environments agents can use and what policy constraints apply.[^1]

**Official Documentation:**
- 📖 [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) — Core concepts and how the app differs from VS Code Copilot
- 📖 [Getting started with the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started) — Prerequisites, setup, and first session

---

## 📦 Key Artifacts

*Primary artifacts — shown inline in the major sections below*

- **`worktree-init.sh`** — Shell script to initialize parallel git worktrees, one per planned agent session
- **`issue-brief-template.md`** — GitHub issue template structured for reliable agent parsing and autonomous execution
- **`agent-workflow.yml`** — Repeatable Copilot workflow definition for event-triggered automations
- **`autonomy-mode-guide.md`** — Decision reference for selecting Interactive, Plan, or Autopilot per task type

---

## 🎯 Mental Model Shift

> **The Core Insight:** When we can run five agents in parallel, the question shifts from "what should I work on next?" to "what's worth delegating, and at what autonomy level?"

### Move Toward (Embrace These Patterns)

- ✅ **Fleet Thinking**: Treat our backlog as a dispatch queue, not a personal sequence → Agents on routine tasks free capacity for architecture and judgment work
- ✅ **Delegation by Risk**: Match autonomy mode to task clarity — Autopilot for well-scoped chores, Interactive for exploratory spikes → Right tool, right trust level
- ✅ **Canvas for Handoff**: Use Canvas to brief agents on context and review progress without full context-switching → Coordination stays lightweight
- ✅ **Sessions to Workflows**: After a successful one-off session, convert it into a repeatable workflow → Eliminates recurring manual delegation
- ✅ **Issue-Driven Tasking**: Write issues as agent-ready briefs with clear acceptance criteria → Agents act more autonomously with less steering mid-session

### Move Away From (Retire These Habits)

- 🔄 **One agent at a time → Parallel fleet**: When tasks are independent, dispatching multiple agents simultaneously surfaces more completed work per unit of time
- 🔄 **Inline supervision → Async review**: With Plan and Autopilot modes, review happens at PR time, not mid-session — freeing attention for other dispatches
- 🔄 **Manual chore execution → Scheduled workflows**: Once a session pattern is proven, converting it to a workflow removes the need to ever manually trigger it again

### Move Against (Active Resistance)

- 🛑 **Autopilot on ambiguous tasks**: Agents given unclear scope in Autopilot will make decisions we'd want to review — scope mismatches become PR surprises, not conversations → Use Plan mode when the approach is non-obvious
- 🛑 **Skipping issue structure**: Agents parse issues as context. Unstructured issues produce unstructured agents. A two-sentence issue with no acceptance criteria produces a two-sentence PR → Invest three minutes in the brief before dispatching

> **What This Looks Like:** A tech lead opens the Copilot App on Monday morning, reviews the sprint backlog, and dispatches four agents: one to the dependency security alert, one to generate missing unit tests for the auth module, one to fix two accessibility-tagged bugs, and one to draft release notes. By 10am, all four have open PRs. The tech lead reviews and merges. The dependency session is then saved as a repeatable weekly workflow.

---

## When to Use This Pattern

### Decision Tree

```
Q: How many independent tasks are there right now?
├─ One → VS Code agent mode is sufficient; no need to switch apps
│
└─ Two or more → Use the Copilot App for parallel fleet management

Q: For each task — how well-defined is it?
├─ Exploratory (approach still unclear)
│  └─ → Interactive mode: agent proposes each step, we approve before proceeding
│
├─ Well-defined scope, but plan review wanted before execution
│  └─ → Plan mode: agent writes a full plan, we approve, then it executes
│
└─ Routine and well-specified (clear criteria, low blast radius)
   └─ → Autopilot mode: agent runs end-to-end, opens PR for review
```

### Use This Pattern When

- Running two or more independent tasks concurrently (bug fixes, feature tickets, dependency updates)
- Managing work across multiple repositories from a single view
- Converting recurring manual sessions into scheduled, event-triggered automations
- Needing audit trails and policy guardrails for compliance (Business/Enterprise requirements)

### Don't Use This Pattern When

- Working on a single focused task in the flow of active development (VS Code agent mode is faster to context-switch into)
- Task requires tight real-time collaboration on the same file set (VS Code Copilot Edits is better suited)
- The team is on the free Copilot tier — technical preview requires Pro, Pro+, Business, or Enterprise[^1]

### Copilot App vs. VS Code Agent Mode

| Aspect | GitHub Copilot App | VS Code Agent Mode |
|--------|-------------------|--------------------|
| **Best For** | Parallel fleet management, multi-repo | Single focused task in active codebase |
| **Session Count** | Multiple concurrent sessions | One session at a time |
| **Environment** | Isolated worktrees, cloud sandboxes | Developer's working directory |
| **Automation** | Repeatable workflows, Agent Merge | Per-session, manual trigger |
| **Dashboard** | My Work unified view across repos | Chat panel in editor |
| **Setup** | Standalone desktop install required | Already in VS Code via extension |

---

<!-- 🎬 MAJOR SECTION: Fleet Model -->
## The Fleet Model: What Agent-Native Means at Team Scale

The GitHub Copilot app reframes what "working with Copilot" means. Instead of one assistant available on demand, our teams now have a fleet of workers that can be dispatched, monitored, and recalled from a unified control plane.[^3]

### My Work: The Fleet Dashboard

The "My Work" dashboard is the operational center of the app. It surfaces every active agent session alongside human-assigned issues, open pull requests, CI check statuses, and background automations — all in one view, across all connected repositories.

The practical value is the removal of context switching. Previously, managing three concurrent Copilot sessions meant three separate chat windows, manually checking three PR statuses, and switching between three terminal sessions. My Work collapses that surface area.

Key elements visible in the dashboard:
- **Active sessions** with current task description and elapsed time
- **Session mode** (Interactive / Plan / Autopilot) and current agent status
- **Open PRs** generated by sessions and awaiting review
- **Background automations** with last/next run timestamps
- **Notifications** when an agent needs input, hits a blocker, or opens a PR

### Dispatching Work at Scale

The fleet model changes the unit of work from "task I'm doing" to "task I'm delegating." A typical morning dispatch might look like:

| Dispatch | Task | Mode | Expected Output |
|----------|------|------|----------------|
| Agent 1 | Fix accessibility violations in checkout flow | Plan | PR with targeted fixes, reviewed before apply |
| Agent 2 | Update all npm dev dependencies | Autopilot | PR with updated package.json and lock file |
| Agent 3 | Generate missing unit tests for `auth/` module | Autopilot | PR with test coverage for each exported function |
| Agent 4 | Triage last week's untagged issues | Interactive | Labels and priorities applied, ready to confirm |

All four run simultaneously. Each produces a reviewable artifact — a plan, a PR, or an action list — that the tech lead can process in sequence without having participated in the work itself.

### Availability

The GitHub Copilot App launched in technical preview at Microsoft Build 2026.[^3] Access requires:
- A GitHub Copilot subscription: Pro, Pro+, Business, or Enterprise
- Download from [github.com/features/ai/github-app](https://github.com/features/ai/github-app)[^4]
- For Business/Enterprise: an organization administrator must enable the technical preview

---

<!-- 🎬 MAJOR SECTION: Safe Parallelism -->
## Safe Parallelism: Worktrees, Sandboxes, and Branch Isolation

The foundational mechanism that makes parallel agents safe is the git worktree. Without it, multiple agents modifying the same repository would race on the same files. With it, each agent lives in its own checked-out branch directory — isolated by design, without any custom locking or coordination logic.

### How Git Worktrees Work

A git worktree allows a single repository to have multiple working trees checked out simultaneously, each in a different directory, each on a different branch.[^5] The Copilot App provisions one worktree per agent session automatically. Teams can also pre-initialize worktrees manually for finer control.

**`worktree-init.sh`** — Initialize parallel worktrees for a multi-agent session:

```bash
#!/usr/bin/env bash
# worktree-init.sh
# Usage: ./worktree-init.sh <repo-path> <n-agents> [branch-prefix]
# Creates N isolated worktrees for parallel agent sessions.

set -euo pipefail

REPO_PATH="${1:?Usage: worktree-init.sh <repo-path> <n-agents> [branch-prefix]}"
N_AGENTS="${2:?Usage: worktree-init.sh <repo-path> <n-agents> [branch-prefix]}"
PREFIX="${3:-agent}"
TIMESTAMP=$(date +%Y%m%d-%H%M)

cd "$REPO_PATH"

# Ensure we start from a clean main
git fetch origin main --quiet
git checkout main --quiet

echo "Initializing $N_AGENTS worktrees in $REPO_PATH"

for i in $(seq 1 "$N_AGENTS"); do
  BRANCH="${PREFIX}-session-${TIMESTAMP}-${i}"
  WORKTREE_DIR="../$(basename "$REPO_PATH")-${PREFIX}-${i}"

  git worktree add -b "$BRANCH" "$WORKTREE_DIR" origin/main
  echo "  ✓ Worktree $i: $WORKTREE_DIR (branch: $BRANCH)"
done

echo ""
echo "Ready: $N_AGENTS isolated working directories."
echo "Point each Copilot App session to its own directory."
```

**Key points:**
- Each worktree shares the same `.git` history but has a fully independent working directory
- Agents cannot accidentally overwrite each other's files — a write to `worktree-2/src/auth.ts` has no effect on `worktree-3/src/auth.ts`
- Merging is straightforward: each session branch produces a normal PR when the agent finishes

### Cloud and Local Sandboxes

Beyond worktree isolation, the Copilot App supports two execution environment types:[^1]

| Environment | Use Case | Key Property |
|-------------|----------|-------------|
| **Cloud Sandbox** | Tasks needing compute (tests, builds, dependency installs) | Fully isolated; no local system access |
| **Local Sandbox** | Tasks needing local toolchain (IDE integration, custom scripts) | Bounded scope; configurable by admin |

For Business and Enterprise plans, administrators configure which environment types are available to agents and what filesystem/network access they're permitted. This policy layer is what makes Autopilot safe at organizational scale — agents can't reach outside their permitted scope regardless of what the task requests.

---

<!-- 🎬 MAJOR SECTION: Control Surfaces -->
## Control Surfaces: Modes and Canvases

The most consequential configuration decision per session is the autonomy mode. Three modes define how much the agent self-directs versus how frequently it pauses for human input.[^1]

### The Three Modes

**Interactive** — Agent proposes each step and waits for approval before proceeding.
- Best for: Exploratory or ambiguous tasks where the approach isn't clear upfront
- Human role: Active co-pilot, approving decisions in real time
- Output: Transparent step-by-step work log with human-approved actions

**Plan** — Agent analyzes the task and writes a complete execution plan. Human reviews and approves the plan before any code changes happen.
- Best for: Well-scoped tasks where plan visibility before execution is wanted
- Human role: Plan reviewer and approver; hands-off after approval
- Output: PR with implementation matching the reviewed plan

**Autopilot** — Agent executes end-to-end without checkpoints. Opens a PR when complete.
- Best for: Routine, well-specified tasks with low ambiguity and low blast radius
- Human role: PR reviewer
- Output: PR ready for review

### Mode Selection Reference

**`autonomy-mode-guide.md`** — Decision reference for picking the right mode:

```markdown
# Autonomy Mode Selection Guide

## Quick Reference

| Task Characteristic               | Interactive | Plan | Autopilot |
|-----------------------------------|:-----------:|:----:|:---------:|
| Approach is unclear               | ✅          | —    | ❌        |
| Scope is ambiguous                | ✅          | —    | ❌        |
| Scope is clear, plan review wanted | —          | ✅   | —         |
| Routine, well-specified            | —          | —    | ✅        |
| High blast radius (e.g., DB migration) | ✅     | ✅   | ❌        |
| Low blast radius (e.g., test gen) | —           | —    | ✅        |
| New pattern, untested task        | ✅          | ✅   | ❌        |
| Known pattern, proven results     | —           | —    | ✅        |

## Examples by Mode

### Interactive
- Architecture spike: "Explore options for replacing our Redis queue"
- Debugging: "Investigate why auth middleware intermittently returns 401"
- Refactor with uncertain scope: "Improve error handling in the payment module"

### Plan
- Feature implementation: "Add OAuth2 login to the user service"
- Non-trivial refactor: "Extract notification logic into a standalone service"
- Security fix: "Patch the CVE in the session management module"

### Autopilot
- Dependency updates: "Update all dev dependencies to latest minor versions"
- Test generation: "Write unit tests for every exported function in src/utils/"
- Documentation: "Generate JSDoc for all public API methods"
- Triage: "Label and categorize all issues tagged help-wanted from last sprint"
- Release notes: "Draft release notes from merged PRs since v2.3.0"
```

### Policy Guardrails (Business/Enterprise)

For Business and Enterprise plans, organization administrators control autonomy at the org level:[^1]

- **Environment policy**: Which sandbox types agents can use (cloud-only, local, or both)
- **Merge policy**: Whether Agent Merge is enabled and under what conditions
- **Repository scope**: Which repositories agents are permitted to access
- **Audit log**: Every agent action is recorded — file edits, terminal commands, PR opens — in GitHub's audit log with session identifier, dispatching user, and timestamp

The audit trail is comprehensive and retroactively searchable, meaning compliance teams can reconstruct exactly what any agent session did, when, and on whose behalf.

---

### Canvases: Observing and Steering Multiple Agents

Canvases are the coordination surface in the Copilot App — bidirectional work areas where both humans and agents can read and write shared context in real time.[^3]

### What a Canvas Contains

A Canvas is not a chat window. It's a structured, live artifact that can contain:
- **A plan or task brief** — written by a human, editable by the agent during execution
- **A PR diff view** — for real-time review of agent edits as they accumulate
- **A terminal stream** — live output from the agent's running commands
- **A browser session** — for agents that need to test deployed changes
- **A deployment status** — CI checks and pipeline state

Multiple Canvases can be open simultaneously, one per active session. The My Work dashboard shows a live thumbnail of each.

### Writing Agent-Ready Issues

The most effective way to brief an agent at the start of a Canvas session is through a well-structured GitHub issue. Agents parse the issue body as their primary task context before execution begins. The quality of the issue directly determines the quality of the autonomous work.

**`issue-brief-template.md`** — GitHub issue template structured for agent-ready briefs:

```markdown
---
name: Agent Task Brief
about: Issue structured for autonomous Copilot agent execution
title: "[Agent] <task summary in one sentence>"
labels: agent-task
---

## Objective

<!-- One paragraph: what we want achieved and why it matters. Be specific. -->

## Acceptance Criteria

<!-- Bullet list. Each item is a verifiable, binary condition. -->
- [ ] [Criterion 1 — concrete and testable]
- [ ] [Criterion 2 — concrete and testable]
- [ ] [Criterion 3 — concrete and testable]

## Scope

**In scope:**
- [Explicit file paths, modules, or behaviors the agent should touch]

**Out of scope (do not modify):**
- [Explicit exclusions — e.g., "Do not touch src/legacy/", "Do not add new dependencies"]

## Context

<!-- Links to relevant files, related PRs, or background reading the agent needs. -->
- Related: #[issue-number]
- Key files: `src/path/to/file.ts`, `tests/path/to/test.ts`

## Suggested Approach (optional)

<!-- If the implementation approach is already decided, describe it here.
     Leave blank for the agent to determine. -->

## Autonomy Mode

<!-- Choose one and delete the others -->
- [ ] **Interactive** — Pause and ask for approval at each major decision
- [ ] **Plan** — Propose a full plan for review before executing
- [ ] **Autopilot** — Execute fully and open a PR when complete
```

### Steering a Live Session

In Autopilot mode, the Canvas still provides visibility and control. We can:
- **Observe the terminal stream** — see what commands the agent is running in real time
- **Add context notes** — write a note on the Canvas that the agent reads on its next step
- **Escalate modes** — shift from Autopilot to Interactive if the agent encounters something unexpected
- **Cancel the session** — abandon the worktree if the approach is wrong; no commits mean no cleanup

---

<!-- 🎬 MAJOR SECTION: Sessions to Systems -->
## From Sessions to Systems: Repeatable Workflows and Agent Merge

Individual sessions are where teams start. Repeatable workflows and Agent Merge are where teams scale.

### Repeatable Workflows

Any successful session can be converted into a workflow — a saved, reusable definition of a task that can be triggered manually, on a schedule, or by a GitHub event.[^3] Workflow definitions live in the repository, versioned alongside the code.

**`agent-workflow.yml`** — Example workflow definition for automated dependency maintenance:

```yaml
# agent-workflow.yml
# Copilot repeatable workflow: weekly dependency maintenance
name: Weekly Dependency Update
description: |
  Update all npm dev dependencies to latest minor versions,
  run tests to verify compatibility, and open a PR with a
  summary of changes. Assign to the platform team for review.

trigger:
  schedule:
    cron: "0 9 * * MON"   # Every Monday at 09:00 UTC
  manual: true             # Also available as manual dispatch

session:
  mode: autopilot
  environment: cloud-sandbox
  repository: "{{ repository }}"
  branch_prefix: "agent/deps-update"

task: |
  Update all dev dependencies in package.json to their latest
  minor versions using `npm update`. Do not upgrade major versions.
  Run `npm test` and `npm run lint` to verify compatibility.
  If any test fails, revert that specific package and note it in
  the PR description. Open a PR with title:
  "chore: weekly dev dependency update {{ date }}"

pr:
  title: "chore: weekly dev dependency update"
  assignees:
    - "@platform-team"
  labels:
    - "dependencies"
    - "automated"
  auto_merge: true
  merge_conditions:
    - ci_checks_pass: true
    - approvals_required: 0   # Auto-merge without manual review for dev deps
```

Workflow definitions are auditable, rollback-able, and reviewable in PRs like any other configuration change. A workflow that was validated once becomes a permanent part of the team's automation library.

### Agent Merge

Agent Merge extends the autonomous lifecycle past the PR-open event. With Agent Merge enabled, an agent monitors the PR it created and responds to:[^3]

- **CI check failures**: Re-reads the failure output, fixes the issue, pushes a new commit
- **Reviewer comments**: Interprets review feedback, makes changes, re-requests review
- **Merge conditions met**: When all configured conditions are satisfied (CI green, required approvals, no unresolved comments), the agent merges the PR

Agent Merge requires explicit enablement per workflow or per session. For Business and Enterprise plans, administrators configure which repositories and users can enable Agent Merge.[^1]

**When Agent Merge fits well:**
- Automated, routine tasks (dependency updates, doc generation, test backfill)
- PRs where merge criteria are unambiguous and fully automatable
- Workflows where the team has already validated the session pattern

**When to keep a human in the merge step:**
- Novel features or architecture changes
- PRs touching security-sensitive code paths
- Any session where task scope was uncertain (Interactive or Plan mode sessions)

---

## Real-World Use Cases

### Use Case 1: Sprint Backlog Clearance

**The Scenario:** A platform team has 12 tickets tagged `good-first-agent-task` in the sprint — dependency updates, test gaps, minor API documentation, a few accessibility fixes. All are well-specified, low-risk, and independent of each other.

**How It Works:** The tech lead dispatches four Autopilot agents to the four highest-priority tickets, reviews the resulting PRs in sequence, then dispatches four more. The 12 tickets complete asynchronously while the tech lead handles a design review elsewhere.

**What We Get:** 12 tickets resolved with 12 reviewable PRs in half a sprint, no additional planning overhead, and a growing library of reusable workflows for future sprints.

---

### Use Case 2: Security Vulnerability Response

**The Scenario:** A CVE is flagged for a transitive npm package. The fix is known (upgrade to patched version), but the impact surface needs investigation before applying changes to production code.

**How It Works:** One agent in Plan mode analyzes all usages of the affected package across the codebase and drafts a remediation plan. After the team reviews the plan, execution proceeds. A second agent runs the upgrade and test suite in Autopilot.

**What We Get:** Full CVE assessment in ~20 minutes. PR with upgrade and test results ready before the incident response call ends. Full audit log of every agent action available for the security review.

---

### Use Case 3: New Repository Standardization

**The Scenario:** An acquired team has five repositories lacking standard linting configs, CI workflows, README structure, and CODEOWNERS files.

**How It Works:** A repeatable workflow is created once against one repository, validated, then dispatched to all five repos simultaneously — five agents, five worktrees, five PRs in parallel.

**What We Get:** Five repositories standardized in 30 minutes. The workflow is saved and available for all future repository bootstrapping or onboarding scenarios.

---

## What We Can Do Today

### In 15 Minutes
- [ ] Download the GitHub Copilot app from [github.com/features/ai/github-app](https://github.com/features/ai/github-app)[^4]
- [ ] Sign in with a GitHub account (Pro, Pro+, Business, or Enterprise required)
- [ ] Open My Work and explore the dashboard layout
- [ ] Select one `good-first-agent-task` issue and start a Plan-mode session to see the proposal flow

### In 1 Hour
- [ ] Run `worktree-init.sh` to pre-initialize two parallel worktrees for the target repository
- [ ] Dispatch two agents simultaneously to two independent issues — one in Plan, one in Autopilot
- [ ] Review both resulting PRs and observe the difference in how each session logged its reasoning
- [ ] Draft a first `issue-brief-template.md` and measure the difference in agent autonomy quality

### In 2–4 Hours
- [ ] Audit the backlog for agent-ready tickets: clear acceptance criteria, no ambiguous scope, independent of active development
- [ ] Configure a first repeatable workflow (`agent-workflow.yml`) for a recurring maintenance task
- [ ] Test Agent Merge on a low-risk automated workflow
- [ ] Share `autonomy-mode-guide.md` with the team and align on mode-selection norms
- [ ] (Business/Enterprise) Review admin policy settings for sandbox types and Agent Merge permissions

---

## Related Patterns

- **[Agent Teams](../agent-teams/)** — The architectural patterns behind multi-agent systems that the Copilot App makes accessible without custom code
- **[Agentic Workflows](../agentic-workflows/)** — Designing trigger/automation patterns for GitHub Actions and Copilot together
- **[Agentic SDLC](../agentic-sdlc/)** — How agent-native development reshapes the full software delivery lifecycle
- **[MCP Apps](../mcp-apps/)** — Extending agent capabilities via Model Context Protocol tools that integrate with the Copilot App

---

## 📖 References

### Official Documentation

[^1]: **[About the GitHub Copilot app — GitHub Docs](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)** — Core concepts, availability, autonomy modes, and policy configuration
[^2]: **[Getting started with the GitHub Copilot app — GitHub Docs](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started)** — Prerequisites, installation, and first session walkthrough

### Blog Posts & Announcements

[^3]: **[GitHub Copilot app: The agent-native desktop experience — GitHub Blog](https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/)** — Launch announcement with capability overview, Canvas and Agent Merge detail, and design rationale
[^4]: **[GitHub Copilot app product page](https://github.com/features/ai/github-app)** — Download, subscription access, and feature summary

### Reference Documentation

[^5]: **[Git worktrees reference — Git Documentation](https://git-scm.com/docs/git-worktree)** — Official `git worktree` command reference, options, and examples
