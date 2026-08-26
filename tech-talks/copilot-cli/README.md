---
status: active
updated: 2026-08-25
section: "Developers"
references:
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
    label: "About GitHub Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes
    label: "About cloud and local sandboxes for GitHub Copilot"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    label: "GitHub Copilot CLI command reference"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts
    label: "Scheduling prompts in GitHub Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet
    label: "Running tasks in parallel with /fleet"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli
    label: "Use Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli
    label: "Install Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-instructions
    label: "Copilot CLI custom instructions"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server
    label: "Add an MCP server to Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing
    label: "Finding and installing plugins for Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins
    label: "About plugins for Copilot CLI"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely
    label: "Steering a GitHub Copilot CLI session from another device"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/
    label: "Remote control CLI sessions on web and mobile (public preview)"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
    label: "Using GitHub Copilot CLI session data (/chronicle)"
    verified: 2026-08-25
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/chronicle
    label: "About GitHub Copilot CLI session data"
    verified: 2026-08-25
  - url: https://github.com/github/copilot-cli/releases
    label: "GitHub Copilot CLI release notes"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-08-07-github-copilot-weekly-releases-august-3
    label: "GitHub Copilot weekly releases: August 3 CLI updates"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-08-13-github-copilot-weekly-releases-august-10
    label: "GitHub Copilot weekly releases: August 10 CLI workflow controls"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app
    label: "Agent Plugins 1.0 in VS Code, Copilot CLI, and the Copilot app"
    verified: 2026-08-25
  - url: https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot
    label: "Upcoming September 2026 model deprecations in GitHub Copilot"
    verified: 2026-08-25

---

# GitHub Copilot CLI: AI at the Point of Work

> **The Question This Talk Answers:**
> *"How do I bring AI to where the work actually is — and keep steering it from wherever I am?"*

**Duration:** 45 minutes | **Target Audience:** Software Developers / DevOps Engineers / CLI Power Users

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Developers and DevOps engineers work across local machines, staging servers, and production environments — AI that follows the work to where it lives addresses the full operational surface, not just the code editor |
| **Compelling** | 🟢 High | Plan Mode transforms debugging from 8 attempts to 2; `--remote` enables live server troubleshooting from your phone; log forensics without data transfer addresses compliance and speed |
| **Actionable** | 🟢 High | Install in 2 minutes, immediately usable for problem-solving. `--remote` on a staging server takes one flag and a QR code scan |

**Overall Status:** 🟢 Ready to use

---


## The Problem: Distance Between You and the Work

### Key Points

- **The IDE only sees code; the terminal sees everything**
  When you're debugging a failure, the information that matters — container logs, environment variables, process state, network traffic, file system layout — isn't in your source files. It's in what's running. An AI that lives in the terminal has access to all of it. One that lives in the editor is context-blind to most of what's actually wrong

- **Most of your day happens outside the editor**
  Atlassian's State of Developer Experience 2025 found developers spend ~30% of their time writing code. The other ~70% — deployments, debugging failures, requirements clarification, log analysis, CI triage — happens in the terminal and across operational tooling. What unlocks when AI can follow you there?

- **AI guesses when requirements are ambiguous. You pay for that later**
  A human developer hits an edge case in a spec and asks a question. AI hits the same ambiguity and picks one interpretation — confidently. You don't find out the guess was wrong until code review, or production. The right moment to catch this is before the first line of code is written, in a conversation that asks the questions a senior engineer would ask

- **Even terminal AI assumes you're sitting at the terminal**
  Your production server is in us-east-1. Your staging cluster is behind a VPN. The CI runner that just failed is ephemeral. The machine where the problem lives is rarely the machine in front of you. Until now, that meant: SSH in, run commands manually, copy-paste output into a chat window, lose context switching between tools. What if AI could go to the machine — and you could steer it from wherever you are?

---

## The Solution: GitHub Copilot CLI

### What It Does

GitHub Copilot CLI brings conversational AI directly into terminal workflows — wherever the terminal runs. Interactive sessions for collaborative problem-solving, programmatic execution for CI/CD automation, and remote sessions you can steer from any device. The session is the unit of work, not the shell: context persists across compactions, across devices, and across disconnects. Plan Mode enables collaborative planning before code generation, reducing debugging cycles from 8 attempts to 2.

### Key Capabilities

- **Plan Mode**: Collaborative planning with clarifying questions before implementation — catch misunderstandings early, reduce iteration cycles
- **Configurable Reasoning Models**: Choose a currently supported reasoning model and tune effort (low → extra high), with Ctrl+T to reveal reasoning steps
- **Interactive Mode**: Terminal-native conversations with context maintained across commands — perfect for "figure this out" scenarios
- **Programmatic Mode**: Single-command execution for scripts and pipelines — designed for headless CI/CD automation
- **Cloud Delegation**: Background execution frees terminal for other work — delegate large tasks with `&` prefix
- **Remote Sessions (`--remote`)**: Start a session on any machine (including over SSH), steer it from GitHub.com or GitHub Mobile via URL/QR code — the session lives where the problem is, you steer from wherever you are
- **Concurrent Session Controls**: Open the Sessions sidebar with `<`, create and close sessions with `n` and `x`, and move among active conversations without leaving the CLI
- **Isolated Worktree Exploration (Experimental)**: `/worktree` starts a separate conversation in a new worktree so exploratory changes do not disrupt the current workspace
- **Recover Without Git**: `/rewind` (alias `/undo`) opens a picker to an earlier user turn — conversation only, or conversation plus Copilot-changed files, skipping files you edited yourself. Git is not required
- **Built-in Agents**: Specialized agents (Explore, Task, General purpose, Code review, Research, Rubber Duck) handle common patterns; `/tasks` manages running subagents
- **`/fleet` Fan-Out**: Explicitly decompose a plan into parallel subtasks — orchestrator assigns work to subagents, each in their own context window; results are merged back automatically
- **IDE and App Bridges**: `/ide` opens a file in VS Code mid-session; `/app` hands the live session and folder to the GitHub Copilot desktop app (1.1.3+)
- **Automatic Context Management**: Auto-compaction at 95% token limit enables virtually infinite sessions — the foundation that makes sessions worth reconnecting to
- **Repository Memory**: AI remembers team conventions, patterns, and preferences across sessions
- **Performance & UX Upgrades**: Faster, more concise responses with improved diff/timeline views and better Windows/PowerShell support
- **MCP Servers**: Discover and connect external tools via MCP. CLI cannot currently honor organization policies for "MCP servers in Copilot" or "MCP Registry URL"
- **Plugin Ecosystem**: Agent Plugins 1.0 is GA — one package can ship portable skills and MCP config, plus Copilot-specific agents, commands, and hooks
- **`/chronicle` Session Insights**: Review your session history to generate standup reports, surface personalized usage tips, and run `/chronicle improve` for suggested updates to `.github/copilot-instructions.md` — Copilot learns from how you actually work
- **Rubber Duck (Adversarial Reviewer)**: A second built-in subagent — powered by a *different* model family than your primary agent — that automatically reviews plans and implementations at key checkpoints. When you're using Claude as orchestrator, Rubber Duck uses GPT-5.4 to catch what one model misses. Now **enabled by default**. Closes ~75% of the quality gap between mid-tier and top-tier models on complex multi-file tasks. Disable with `builtInAgents.rubberDuck: false` in config if latency matters more than review quality
- **Scheduled Prompts (`/every`, `/after`)**: Recurring autonomous workflows via experimental scheduled prompts — `"/every weekday at 9am summarize overnight PRs"` turns the CLI into a recurring agent runner. Requires `/experimental on`
- **`/voice`**: Dictate prompts using local speech-to-text via Foundry Local — hands-free operation for long coding sessions or accessibility workflows

### Architecture Overview

The session is the durable entity — terminals are viewports that connect and disconnect from it. Four modes cover distinct workflows: **Interactive** for collaborative problem-solving with persistent context; **Plan Mode** (Shift+Tab) for clarifying requirements before any code is written; **Programmatic** (`copilot -p`) for headless CI/CD execution; **Remote** (`copilot --remote`) for steering sessions from any device via web or mobile. Specialized built-in agents (Explore, Task, General purpose, Code review, Research, and Rubber Duck) are routed automatically. Cloud delegation (`&` prefix) offloads long-running work to GitHub's coding agent, freeing both your terminal and IDE. Auto-compaction and repository memory make sessions virtually infinite and cross-session aware. Scheduled Prompts (`/every`, `/after`) enable fully autonomous recurring workflows without any human trigger.

**Official Documentation:**
- 📖 [About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) — Core concepts and capabilities
- 📖 [Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli) — Command syntax, options, and workflows
- 📖 [Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) — Setup instructions for all platforms

---

## �️ Slide Structure Notes

**Appendix:** `slides/tech-talks/copilot-cli-reference.md` — imported after the ThankYouSlide as a reference card appendix. Always include in `deck.recipe.yml` as `appendix: [{src: ./copilot-cli-reference.md}]`.

---

## �📽️ Visual Assets

*This talk does not include extracted diagrams from source documentation. Visual content will be generated during slide creation using styled HTML components for architecture diagrams and workflow illustrations.*

**Potential visual assets to generate:**
- Interactive vs Programmatic mode comparison diagram
- Plan Mode workflow sequence
- Context management lifecycle (auto-compaction visualization)
- Built-in agent specialization matrix

---

## 📦 Key Artifacts

**Primary Artifacts** — *Shown inline in major sections with detailed explanation*

- **Interactive debugging session** — Terminal conversation demonstrating Plan Mode for Docker debugging
- **Programmatic CI/CD automation** — GitHub Actions workflow using `copilot -p` for build failure analysis
- **Context management commands** — `/compact`, `/context`, `/usage` for monitoring token usage
- **Cloud delegation example** — Using `&` prefix for background codebase analysis
- **Reasoning configuration** — Selecting a currently supported reasoning model and tuning effort for depth vs speed

### Supporting Files

*Available in documentation references*

- **[Custom instructions guide](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-instructions)** — Repository-specific behavior configuration. Note: all custom instruction files now **combine** (additive merge) instead of falling back to the highest-priority file — user-level + repo-level + org-level instructions are all applied together
- **[MCP server setup](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server)** — Extending functionality with external tools
- **[Configure an MCP registry](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry)** — Organization-wide discovery and governance for MCP tools. Copilot CLI cannot currently honor the "MCP servers in Copilot" or "MCP Registry URL" organization policies
- **[Built-in agents reference](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-agents)** — Explore, Task, General purpose, Code review, Research, and Rubber Duck

---

## 🎯 Mental Model Shift

> **The Core Insight:** From "execute commands manually and search docs when stuck" to "steer AI sessions that follow the work — across complexity, across time, and across machines"

### The Distance Model

Each capability in this talk removes a different kind of distance between you and the work:

| Distance Removed | What Changes | Feature |
|---|---|---|
| **Intent** | AI stops guessing, starts asking | Plan Mode |
| **Complexity** | One task becomes many, run in parallel | `/fleet` fan-out |
| **Context** | Session survives compaction, remembers across sessions | Auto-compaction + Memory |
| **Time** | Work outlives your attention | Cloud delegation (`&`) |
| **Geography** | AI meets the problem where it lives | `--remote` |

### Move Toward (Embrace These Patterns)

- ✅ **AI as Thought Partner for Greenfield Work**: Use Copilot CLI to explore library choices, scaffold projects, and talk through architecture decisions *before* writing code → 90 min of library research → 15 min with documented rationale and a working scaffold
- ✅ **Plan Before You Build**: Use Plan Mode (Shift+Tab) to clarify intent and approve a strategy before implementation begins → 8 debugging attempts → 2; most rework in development comes from ambiguous starts, not bad code
- ✅ **Delegate, Don't Block**: Long-running tasks (security audits, large refactors, doc generation) don't need to occupy your IDE or terminal — delegate with `& <task>` and get a PR when the agent finishes; both tools stay completely free
- ✅ **Let /fleet Execute the Plan**: Once Plan Mode produces a strategy, hand it off — `/fleet implement all phases of this plan` decomposes the work into parallel subtasks, assigns each to a subagent, and merges results; you review the outcome, not the steps
- ✅ **Sessions as Durable Work**: Think of a Copilot CLI session the way you think of a tmux session or a Jupyter notebook: persistent state you connect to, not ephemeral chat you restart. `--remote` makes this literal — start on your workstation, continue from your phone, review results from your laptop at home

### Move Away From (Retire These Habits)

- ⚠️ **Starting new projects from the IDE**: Opening VS Code, creating a folder, and guessing at a tech stack before writing anything is the old way. The terminal is where you have the most context — what exists on disk, what's running, what the environment looks like. Use Copilot CLI as a design partner *before* you open the IDE: talk through the architecture, pick the libraries, generate the scaffold. Then open the IDE already oriented
- ⚠️ **Re-explaining your codebase every session**: Spending the first 10 minutes of each Copilot session giving context — "we use docker-compose networking, not host networking; we deploy to Kubernetes; our convention is X" — is a sign repository memory isn't working for you yet. Invest once in teaching Copilot your conventions; subsequent sessions inherit that knowledge automatically
- ⚠️ **Treating every long-running task as IDE-bound**: Kicking off a security audit, large refactor, or test suite generation from VS Code means your editor is occupied until the agent finishes. These tasks are better delegated from the CLI with `& <task>` — the agent runs in the cloud, both your IDE and terminal stay completely free, and a PR arrives when it's done
- ⚠️ **Waiting until you're "at your desk" to respond to incidents**: The instinct to wait until you're at your workstation to address an operational issue is left over from when your tools required your workstation. When the AI session lives on the server and you can steer from any device, "at my desk" is no longer a prerequisite

### Move Against (Active Resistance Required)

- 🛑 **Pasting secrets into prompts**: Credentials, tokens, and API keys typed into CLI sessions travel to GitHub's API as prompt content — the same way any other context does. It feels natural to give Copilot what it needs to help, but this is a data exposure risk. Use environment variables or secret managers; reference the name, not the value
- 🛑 **`--yolo` without a documented sandbox**: Permission prompts feel like friction when you're in flow. `--allow-all-tools` or `--yolo` removes that friction instantly — and grants the agent permission to run any shell command, edit any file, make any API call with your current credentials. If you're authenticated to production, the agent has production access. Approve per-tool or per-session, never blanket. Prefer first-party local sandboxing (`/sandbox enable`, experimental) when you need broader autonomy on your machine, or `copilot --cloud --experimental` when the whole session should run in a billed GitHub-hosted environment. Enterprise teams can **enforce this policy** with `permissions.disableBypassPermissionsMode` in managed settings — this prevents users from enabling `--yolo` or `/allow-all` in org-managed environments
- 🛑 **Skipping Plan Mode because you're in a hurry**: When the deadline is close and you think you know what you need, Plan Mode feels like overhead. It isn't — it's most valuable precisely when you're rushing. The sessions that spiral into 8 failed attempts almost always started with "I'll just jump in." One minute of clarifying questions saves thirty minutes of rework
- 🛑 **Leaving remote sessions unattended without guardrails**: A persistent `--remote` session with broad permissions on a production machine is powerful and dangerous. Always scope permissions with `--allow-tool`, set session timeouts, and use [Copilot Hooks](../copilot-hooks/) for governance. Never use `--yolo` on a remote production session

> **Developer:** 90 min of library research + second-guessing → 15 min with Plan Mode proposing options, tradeoffs, and scaffolding the chosen stack. ~75 minutes saved.

> **DevOps:** 45 min + 8 trial-and-error attempts debugging a Docker container → 8 min with Plan Mode asking the right questions first. 37 minutes saved, 6 fewer failed attempts.

---

## When to Use This Pattern

### Decision Tree

```
Q: What's your primary workflow environment?
├─ "Terminal/CLI — for development, infrastructure, or both"
│  → Use: Copilot CLI (this talk)
│  └─ Best for: Greenfield development, debugging, exploring libraries, Docker, CI/CD, log analysis
│
├─ "I need to debug or analyze a remote server, staging box, or production machine"
│  → Use: Copilot CLI with `--remote` (this talk)
│  └─ Best for: Live system troubleshooting, log forensics, infrastructure patrol
│  └─ AI runs where the problem is; steer from phone, browser, or any device
│
├─ "I want to fire off a long-running agentic task without it consuming my IDE"
│  → Use: Copilot CLI (this talk) — cloud delegation via `&` prefix
│  └─ Best for: Security audits, large refactors, test scaffolding, doc generation (20+ min tasks)
│  └─ IDE stays completely free; get notified when the PR is ready
│
├─ "IDE for active code editing, rarely use terminal"
│  → Use: VS Code Copilot or IDE extensions
│  └─ Best for: Inline code completion, editor-integrated assistance, rapid editing
│
├─ "Web for cross-repository analysis & PR review"
│  → Use: github.com/copilot
│  └─ Best for: Multi-repo context, architectural planning, stakeholder collaboration
│
└─ "Need AI across all interfaces"
   → Combine: All three interfaces
   └─ Repository instructions, agents, and memory work identically everywhere
```

### Use This Pattern When

- Building something new (greenfield) and want a thought partner for library choices, architecture, and scaffolding
- Debugging your own failing code, tests, or build environment from the terminal
- DevOps and infrastructure work happens primarily in terminals
- Debugging complex issues where root cause is unknown (Docker, networking, deployments)
- Automating CI/CD build failure analysis and triage
- Need intelligent command execution without leaving terminal flow
- Want to run long-running agentic tasks (security audits, large refactors, test scaffolding) independently of your IDE — delegate from the terminal, IDE stays completely free, PR arrives when done
- Troubleshooting remote servers, staging environments, or production machines — `--remote` puts AI where the problem is, and you steer from any device
- Analyzing large log files directly on the server where they live — no downloading, no data transfer, no compliance concerns
- Want AI to remember team conventions and patterns over time
- Building automation that adapts to context (not fixed scripts)

### Don't Use This Pattern When

- Never leave the terminal at all for anything — CLI integrates alongside IDE and web, not instead of them
- Need graphical debugging with breakpoints → Use IDE tools
- Need rich cross-repository architectural analysis across many repos → Use Copilot Web
- Workflow is entirely GUI-based with no terminal use → No benefit to CLI-specific features

> 💡 **CLI and IDE work simultaneously, not in competition.** Use the `/ide` slash command from within a Copilot CLI session to open any file directly in VS Code — without losing your terminal context or conversation state. Identify the problem in the terminal, open the file in the IDE for editing, and return to the same CLI session. Both tools stay active and aware.
>
> ```bash
> $ copilot
> > "Debug why fetchUser() returns None intermittently"
> # Copilot identifies the file at fault
> /ide src/users/api.py
> # VS Code opens src/users/api.py — CLI session continues running
> ```

---

<!-- 🎬 MAJOR SECTION: Plan Mode & Steering -->
## Plan Mode: Collaborative Planning Before Implementation

*Transform debugging from trial-and-error to collaborative strategy*

### The Fundamental Shift

**Traditional workflow:**
Request → AI generates solution → You review and fix → Repeat (8 attempts average)

**Plan Mode workflow:**
Request → AI asks clarifying questions → Collaborate on plan → Review plan → Generate implementation (2 attempts average)

### How It Works

Press **Shift+Tab** to toggle Plan Mode on/off. Use **`/autopilot`** (or its alias **`/goal`**) to keep autopilot focused on a specific objective — `/goal` framing is particularly useful when you want Copilot to stay anchored to one outcome across a multi-step session. Copilot uses the `ask_user` tool to ask clarifying questions before any code is written:

- **"Should I check docker-compose config, logs, or both?"**
- **"Do you want environment variable analysis included?"**
- **"Start with network configuration or service dependencies?"**

### Real-Time Steering

While Copilot is thinking, you can steer the conversation:

**Enqueue additional messages:**
Send follow-up instructions to adjust direction mid-response:
```bash
# While Copilot analyzes Docker logs:
> "Also check if Redis is running"
> "Focus on authentication-related errors first"
```

**Inline feedback on rejection:**
Reject tool permissions and explain why in one step:
```bash
# Copilot wants to run `rm -rf tmp/*`
> [Press Esc] "Don't delete tmp/ — it has cached artifacts we need"
```
Copilot adapts approach without stopping entirely.

### Example: Docker Debugging with Plan Mode

```bash
$ copilot
> "Debug why the backend container won't start"

🤔 Copilot (Plan Mode):
I can help with that. Before I start, a few questions:

1. Should I check docker-compose configuration, container logs, or both?
2. Do you want environment variable analysis?
3. Any recent changes to services or network configuration?

> "Start with logs, then check config if needed"

🤔 Copilot:
Understood. Here's my plan:
1. Retrieve container logs for backend service
2. Analyze error patterns and stack traces
3. If logs suggest config issue, inspect docker-compose.yml
4. Check environment variables if authentication/connection errors found

Proceed with this plan? (y/n)

> y

✅ Copilot:
[Executes plan, finds misconfigured port binding in docker-compose.yml]
Found: Port 5000 mapped to 5001, but app expects 5000 internally.
Fix: Change service.ports from "5001:5000" to "5000:5000"

Apply this fix? (y/n)
```

**Outcome:** Root cause identified in 8 minutes with 2 targeted checks (vs 45 minutes with 8 trial-and-error attempts manually).

### Advanced Reasoning Models

Currently supported reasoning models expose configurable effort. Do not treat a catalog name as a permanent default — GitHub retires models, and enterprise policy may hide replacements until an administrator enables them.

- **Low**: Fast responses for straightforward queries
- **Medium**: Balanced speed and depth (default)
- **High**: Extended reasoning for complex problems
- **Extra High / Max**: Maximum depth for critical architectural decisions (highest documented Anthropic tier is `max`)

**Toggle reasoning visibility:**
Press **Ctrl+T** to show/hide the model's thought process. Setting persists across sessions — useful for understanding how Copilot approaches complex problems and learning optimal prompting patterns.

**When to use High/Extra High reasoning:**
- Architectural refactoring decisions
- Multi-service debugging with unknown root cause
- Critical security or performance investigations

---

<!-- 🎬 MAJOR SECTION: Operating Modes -->
## Interactive Mode vs Programmatic Mode vs Cloud Delegation

*Choose the right mode for the task — collaborative debugging, headless automation, or background execution*

### Two Core Operating Modes

#### Interactive Mode (`copilot`)

**Purpose:** Conversational sessions for iterative problem-solving

```bash
$ copilot
> "Analyze the last 100 lines of application logs"
> "What's causing the memory spike?"
> "List all environment variables related to database connections"
```

**Characteristics:**
- Maintains context across commands and file operations
- Ideal for debugging with unknown root causes
- Perfect for "figure this out collaboratively" scenarios
- Supports Plan Mode, real-time steering, and clarifying questions
- Use `/ide` to open any identified workspace in VS Code mid-session — CLI context is preserved

**Best for:**
- Complex Docker networking issues
- Multi-service failures requiring investigation
- Configuration problems across multiple files
- Learning unfamiliar codebases or architectures

#### Programmatic Mode (`copilot -p`)

**Purpose:** Single-command execution for scripts and CI/CD pipelines

```bash
# In GitHub Actions workflow
- name: Analyze build failure
  if: failure()
  run: |
    copilot -p "Analyze build failure and suggest fixes" \
      --allow-tool 'shell(gh)' \
      --allow-tool 'shell(git)' \
      > analysis.txt
```

**Characteristics:**
- Designed for headless, non-interactive operation
- Produces structured output for script parsing
- Combined with approval options (`--allow-tool`, `--allow-all-tools`)
- No conversation history — stateless execution

**Best for:**
- CI/CD build failure analysis
- Automated test result interpretation
- Deployment validation checks in pipelines
- Scripted operations without human interaction

### Cloud Delegation with `&` Prefix

**Purpose:** Background execution frees terminal for other work

```bash
$ copilot
> "&Analyze entire codebase for security vulnerabilities"

✅ Copilot:
Task delegated to GitHub Copilot coding agent in the cloud.
I'll commit any unstaged changes and create a new branch.

Agent session: https://github.com/owner/repo/agent/session/abc123
Pull request will be created when analysis completes.

[Your terminal is now free for other work]
```

**Characteristics:**
- Runs completely independent of your IDE and local terminal — both stay fully free
- A PR is created automatically when the agent finishes; you get notified
- Best for 20+ minute tasks: security audits, large refactors, doc generation, test scaffolding

### Permission Management

**Session-level approvals:**
"Approve for session" auto-approves pending parallel requests of same type:
```bash
# First file edit request:
> [Approve for session]
# All subsequent file edits in this session: auto-approved
```

**Convenience flags** (use carefully in trusted environments):
```bash
copilot --allow-all-tools  # All permissions enabled
copilot --yolo              # Maximum autonomy (alias for --allow-all)
```

**Inline feedback on rejection:**
```bash
# AI wants to delete a file:
[Esc] "No, don't edit that file — it's auto-generated from schema"
# AI adapts without stopping
```

### Local and Cloud Sandboxes (Public Preview)

`--yolo` is a permission choice. Sandboxing is a containment choice. First-party docs now document both, and they are not interchangeable.

**Local sandboxing** (experimental, off by default unless enterprise policy requires it) restricts the filesystem, network, and system access of commands and tools the agent runs on your machine. Enable it in a session with `/sandbox enable`. The setting persists for later interactive and programmatic use until you run `/sandbox disable`. Isolation is lighter-weight OS containment via Microsoft eXecution Container (MXC) — not a VM or container. Built-in file tools honor the policy on a best-effort basis because they run in-process. Local sandboxing is included in the Copilot seat at no extra charge.

```bash
$ copilot --experimental
> /sandbox enable
> /sandbox status
> /sandbox policy
```

**Cloud sandboxing** (experimental) runs the *entire* interactive session in an isolated, billed GitHub-hosted Linux environment. Start it with `copilot --cloud --experimental`. You cannot combine `--cloud` with `-p` or `-i`. Organization and enterprise Cloud Sandbox access is disabled by default. Resume a stopped session from another device; compute, memory, and snapshot storage are metered.

```bash
copilot --cloud --experimental   # Isolated interactive session in GitHub-hosted infra
```

See [About cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes).

### Example: CI/CD Build Failure Automation

```yaml
# .github/workflows/build.yml
name: Build and Analyze

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build application
        run: npm run build

      - name: Analyze failure with Copilot CLI
        if: failure()
        env:
          GITHUB_TOKEN: ${{ secrets.COPILOT_GITHUB_TOKEN }}
        run: |
          npm install -g @github/copilot
          copilot -p "Analyze the build failure. \
            Check recent commits, dependencies, and error patterns. \
            Suggest specific fixes." \
            --allow-tool 'shell(gh)' \
            --allow-tool 'shell(git)' \
            > failure-analysis.txt

      - name: Post analysis as comment
        if: failure()
        run: |
          gh pr comment ${{ github.event.pull_request.number }} \
            --body-file failure-analysis.txt
```

**Impact:** Investigation time drops from 25 minutes (manual) to 5 minutes (automated). Pattern recognition across historical failures. Zero human intervention for known failure types.

---

<!-- 🎬 MAJOR SECTION: Remote Sessions -->
## Remote Sessions: The Last Distance Falls

*AI goes to the machine. You steer from wherever you are.*

Every section of this talk has been quietly removing a different kind of distance between you and the work. Plan Mode closed the intent gap. Agents and `/fleet` closed the complexity gap. Cloud delegation closed the time gap. One distance remained: **geography** — the assumption that you need to be at the terminal to use the terminal.

`--remote` removes that final constraint.

### How It Works

Start any Copilot CLI session with the `--remote` flag. The CLI generates a unique URL and QR code. Open that URL on GitHub.com or GitHub Mobile — you now have a live connection to the session from any device.

```bash
# SSH into a production server
ssh ops@prod-server-3.us-east-1
$ copilot --remote

🔗 Remote session started.
Monitor and steer this session from:
   https://github.com/copilot/sessions/abc123
   [QR CODE]

Session will persist via tmux. Disconnect safely with Ctrl+D.
```

From your phone, tablet, or any browser:
- See what Copilot is doing in real-time
- Approve or deny tool permissions
- Send steering messages ("focus on the auth logs, not network")
- Inject new prompts
- `/resume` the session from a different machine entirely

You can also enable remote access mid-session with the `/remote` slash command.

### Why This Matters

The compelling part is **not** "do the same thing but from your phone." It's:

- **Work stays where it lives.** Logs never leave the production boundary. No `scp`, no `rsync`, no uploading to third-party analysis tools.
- **You don't lose momentum when context changes.** Walking to a meeting, switching devices, or getting paged at 2 AM — the session is continuous.
- **The session becomes portable, not the machine.** Devices are interchangeable viewports into a durable AI work session.

SSH moves your keystrokes. `--remote` moves a reasoning session.

### Session Persistence and Resume

Combine `--remote` with `tmux` or `screen` for sessions that survive SSH disconnects:

```bash
# On the server
tmux new -s copilot-debug
copilot --remote

# SSH drops? No problem. Reconnect later:
tmux attach -s copilot-debug

# Or resume from a completely different machine:
copilot --resume
```

Sessions are private — only visible to the initiating user unless the link is explicitly shared. For business/enterprise accounts, remote session policies are managed by org admins.

### Combination Patterns

`--remote` composes with every other capability in this talk:

| Combination | What It Unlocks |
|-------------|----------------|
| **Plan Mode + `--remote`** | Safer live-system operations — AI asks clarifying questions *before* touching a production server. Critical when you're approving from a phone |
| **`/fleet` + `--remote`** | Coordinate work across multiple environments simultaneously. One prompt, five servers, parallel execution, results merged |
| **Cloud delegation + `--remote`** | Persistent infrastructure patrol — an agent that watches, investigates anomalies, and reports findings. You review from any device |
| **Agents + `--remote`** | Remotely supervised parallel work — multiple specialized agents investigating on a server while you steer from elsewhere |
| **Memory + `--remote`** | When you `/resume` a session from a new device, repository memory and context travel with it — no re-explaining your codebase |

See also: [Steering a session remotely](https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely)

---

<!-- 🎬 MAJOR SECTION: Context Management -->
## Automatic Context Management and Repository Memory

*Session continuity: the foundation that makes sessions worth reconnecting to*

### Infinite Sessions via Auto-Compaction

**The problem:** Traditional AI conversations hit token limits and lose context after 12-20 exchanges.

**The solution:** When conversation approaches 95% of token limit, Copilot CLI automatically compresses history in the background:

- **Important context persists:** Decisions made, approaches tried, facts learned
- **Redundant details pruned:** Verbose command outputs, repetitive exchanges
- **No interruptions:** Happens transparently during normal operation
- **Manual control available:** `/compact` command to compress anytime, `Escape` to cancel

**Monitoring tools:**
```bash
/context   # Visual token usage breakdown
/usage     # Session statistics: duration, lines edited, token usage per model
```

### Repository Memory: Cross-Session Learning

Copilot CLI stores learned facts about your codebase — conventions, patterns, preferred approaches — and applies them automatically in future sessions. This is covered in depth in the [Copilot Memory](../copilot-memory/) talk.

### Session History and `/chronicle`

Every interactive session is saved locally — prompts, responses, tools used, and file modifications — giving Copilot a persistent record of what you've worked on and how you've used it. That history is queryable and actionable.

**`/chronicle`** turns session history into intelligence:

| Command | What It Does |
|---------|-------------|
| `/chronicle standup` | Generates a standup report from recent session activity |
| `/chronicle tips` | Reviews usage patterns and surfaces personalized improvement suggestions |
| `/chronicle improve` | Analyzes this repo's sessions and suggests additions to `.github/copilot-instructions.md` |

Open-ended questions work too:

```bash
$ copilot
> "What did I work on yesterday?"
> "What issues did I run into this week?"
> "What patterns do I keep repeating that I could automate?"
```

**Session management commands:**

```bash
copilot --continue          # Resume the most recent session
copilot --resume            # Pick from recent sessions interactively
copilot --resume SESSION-ID # Resume a specific session by ID

# From within an active session:
/resume                     # Resume a previous session into current context
/rename NEW_NAME            # Give the current session a meaningful name
```

For concurrent work, press `<` to open the Sessions sidebar. Use `n` to start a
session, `x` to close the current session, and the sidebar navigation to switch
among active conversations. Press `>` to close the sidebar.

Two recovery and isolation controls extend the session model. They solve different problems.

**`/rewind` (alias `/undo`) is session-turn recovery.** It does not require Git. Open the picker and roll back to an earlier user turn:

- **Conversation only** — rewind the chat, leave files as they are.
- **Conversation + files** — also restore files Copilot changed in that turn *and* later discarded turns to their pre-change contents. Files you have edited yourself are skipped.

File changes are tracked per turn across editing tools, shell commands, and sub-agents. That is why a dirty tree, or a folder that is not a Git repository, can still recover: rewind is not `git checkout` or `git revert`.

```bash
# Wrong-turn recovery without Git
> /rewind
# Pick the turn before the bad refactor
# Choose Conversation + files — Copilot's edits roll back;
# the README paragraph you typed after that turn stays
```

**`/worktree` (experimental) is isolation, and it requires Git.** It creates a new worktree and a separate conversation so exploratory changes do not disrupt the current workspace. Use `/worktree` when you want a clean branch of the tree. Use `/rewind` when you want to undo a Copilot turn in the tree you already have.

How-to pages do not yet dedicate a `/rewind` section. The first-party source is the [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference).

**Session storage:** Data lives in `~/.copilot/session-state/` — private to your machine and user account. Delete that directory to clear history.

See also: [Using GitHub Copilot CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)

### Model Selection and Premium Request Cost

Use `/model` to choose a currently supported model for the task. Do not treat a
specific catalog entry as a permanent default: GitHub retires models across
Copilot experiences, and enterprise administrators may need to enable replacement
models through Copilot model policy before they appear in the selector.

```bash
/model              # Session-scoped picker (default; --session / -s)
/config model       # Durable default for future sessions
/model --global     # Same durable default as /config model
/model --repo       # Pin the default in repository settings
```

The multiplier next to each model (`1x`, `2x`, etc.) shows how many premium requests one prompt consumes. Higher-capability models can have higher multipliers. `/model` changes the current session only unless you persist a default. Verify that organization policy permits the replacement model your workflow expects.

Optional BYOK: custom providers via `COPILOT_PROVIDER_*` environment variables (`copilot help providers`). The model must support tool calling and streaming.

### Shell & Output Improvements

- **History filtering:** `!docker [↑]` cycles only through previous docker commands — prefix-aware
- **Clean history:** Shell commands are excluded from Bash/PowerShell history files
- **Tab title:** Current AI intent shows in terminal tab — useful for monitoring multiple sessions
- **Faster output:** Median completion time down ~45%; richer diffs and edit timelines
- **Live tool-call durations:** The timeline shows elapsed time for active tool calls, making slow commands visible while a turn runs
- **Platform polish:** Improved Windows/PowerShell ergonomics and accessibility shortcuts

---

<!-- 🎬 MAJOR SECTION: Built-in Agents -->
## Built-in Specialized Agents

*Copilot automatically delegates to expert agents based on your request*

### Built-in Agent Roster

Copilot CLI includes built-in agents that handle common patterns automatically — you don't explicitly call them, Copilot routes tasks based on intent. Official how-to docs currently list Explore, Task, General purpose, Code review, Research, and Rubber Duck.

#### Explore Agent

**Purpose:** Fast codebase analysis without cluttering main context — returns focused answers under 300 words, safe to run in parallel.

```bash
> "How does authentication work in this service?"
```

#### Task Agent

**Purpose:** Execute commands with smart output filtering — brief summary on success, full output only on failure.

```bash
> "Run the test suite and tell me if anything failed"
```

#### General Purpose Agent

**Purpose:** Full-capability helper for complex multi-step work that does not match a specialist. Runs in a separate context window.

```bash
> "Work through this multi-file refactor and keep the main session clean"
```

#### Code-Review Agent

**Purpose:** High signal-to-noise review — only surfaces bugs, security issues, and logic errors. Never style or formatting.

```bash
/review
```

#### Research Agent

**Purpose:** Broader investigation across GitHub search and web sources, with citations. Use when the answer is not already in the working tree.

```bash
/research how other services in this org handle token refresh
```

Use `/tasks` to inspect and manage running subagents and shell commands while a turn is in progress. Queue follow-up prompts or supported slash commands with Ctrl+Q / Ctrl+Enter so they run after the current task finishes.

For headless plan-then-implement, start with `copilot -p --plan --mode autopilot "..."` (or `COPILOT_PLAN_THEN_AUTOPILOT`). The session plans first, then continues into autopilot without waiting for a human to approve the transition. Do not mix `/autopilot` / `/goal` with Plan Mode as if they were the same control.

#### IDE Bridge (`/ide`) and App Bridge (`/app`)

**Purpose:** Keep the CLI conversation alive while you open the work in another surface. `/ide` opens a file in VS Code. `/app` opens the current session and folder in the GitHub Copilot desktop app (requires app 1.1.3 or later).

```bash
/ide src/users/api.py
# VS Code opens the file — CLI session continues uninterrupted

/app
# Same session and folder open in the Copilot desktop app
```

#### Rubber Duck (Adversarial Reviewer)

**Purpose:** A second subagent — powered by a *different* model family — that automatically reviews plans and implementations at key checkpoints. When your primary agent is Claude, Rubber Duck uses GPT-5.4. Cross-family review catches blind spots that any single model has.

**Enabled by default since v1.0.58.** You don't invoke it explicitly — it runs automatically after planning and after significant implementations.

**Why it matters:** Testing shows Rubber Duck closes ~75% of the quality gap between mid-tier (e.g., Claude Sonnet) and top-tier (Opus) models on complex multi-file tasks. Effectively, you get near-Opus quality at Sonnet pricing.

**Configuration:**
```json
// ~/.copilot/settings.json
{ "builtInAgents": { "rubberDuck": false } }   // disable if latency matters more than review quality
```

**When Rubber Duck speaks:** After you approve a plan, Rubber Duck may surface: "This plan doesn't account for concurrent writes to the session store" — a class of issue that the primary model missed because it was focused on implementing the plan, not stress-testing it.

### Parallel Agent Execution

Multiple agents can work simultaneously:

```bash
> "Explore how auth works, run the test suite, and plan how to add OAuth"

✅ Explore agent: Analyzes auth implementation
✅ Task agent: Runs tests in parallel
✅ Plan agent: Creates OAuth integration strategy
```

**Result:** Three operations complete in the time of one — agents don't block each other.

### Scheduled Prompts: `/every` and `/after`

**Experimental feature** — Enable with `/experimental on` or `--experimental`.

Schedule recurring agent actions without any external cron job or task scheduler:

```bash
$ copilot --experimental
> /every weekday at 9am
  "Check for overnight PRs, summarize what changed, and post to Slack #dev-standup"

> /after the build completes
  "Run the security scanner and open an issue for any new HIGH findings"

> /every 30min
  "Check pod health in staging. Alert me via remote session if anything is unhealthy."
```

**What this enables:** The CLI becomes a **recurring agent runner** — not just a tool you invoke, but an ambient presence that monitors, reports, and acts on a schedule you define in plain language.

**Combines powerfully with:**
- **`--remote`** — Schedule a patrol on a server, steer it from any device when it fires
- **`/fleet`** — Fan out the scheduled work across multiple subtasks in parallel
- **Cloud delegation** — Delegate the scheduled work to GitHub's coding agent so your terminal stays free

**Current scope:** Requires `--experimental` / `/experimental on`. Schedules are session-scoped and fire only while that interactive session is running. Reopening with `--continue` or `--resume` restarts them, measuring the next interval from the moment you reopen. List and delete with `/every` or `/after` and no arguments — not `/session`. User-invocable skills can be scheduled. Most built-in slash commands cannot (`/clear` is the documented example); `/chronicle standup` is a documented exception. Minimum interval is 10 seconds; maximum is 1 day.

When no interactive session is open, use an external scheduler (cron or Task Scheduler) plus `copilot -p "YOUR PROMPT"`.

### /fleet: Explicit Fan-Out Mode

While Copilot routes multiple agent types automatically from a single prompt, `/fleet` is the **explicit** fan-out command — designed for large, multi-part plans you want Copilot to decompose and execute in parallel with full orchestration.

```bash
# After working through a plan in plan mode:
/fleet implement all phases of this auth refactor plan

# Or directly:
/fleet create a test suite: unit tests for auth, integration tests for API, e2e tests for login flow
```

**How it works:**
1. The main agent analyzes the prompt and identifies subtasks
2. It assesses dependencies — what can run in parallel, what must be sequential
3. It acts as **orchestrator**: assigns subtasks to subagents, manages the workflow
4. Subagents run in parallel where possible, each in their own context window
5. Results are merged back by the orchestrator

**Benefits:**

| Benefit | Detail |
|---------|--------|
| **Speed** | Parallel subtasks complete in the time of the longest, not the sum |
| **Context isolation** | Each subagent has its own window — no context pollution between tasks |
| **Specialization** | Custom agents (`@test-writer`, `@security-reviewer`) are automatically used for matching subtasks |
| **Model selection** | Subagents default to low-cost models; request a currently supported higher-reasoning model only when a subtask warrants it |

**When to use `/fleet`:**
- Large tasks with multiple independent steps (refactor N files, update N dependencies)
- Tasks well-suited to parallelization: test suite creation, multi-module analysis, documentation
- Autopilot mode — pair with `Shift+Tab` to switch to plan mode, then accept the plan with *Accept plan and build on autopilot + /fleet*

**When NOT to use it:** If tasks are inherently sequential (step B requires step A's output), `/fleet` won't provide speedup — the orchestrator will simply run them in order.

**Cost note:** Each subagent makes independent LLM calls, so `/fleet` may consume more premium requests than a single-agent approach. Use `/model` to check your current model multiplier.

**Workflow with autopilot:**
```
Shift+Tab → plan mode
  └─ Work with Copilot to create an implementation plan
     └─ Plan complete → "Accept plan and build on autopilot + /fleet"
        └─ Copilot runs subtasks in parallel autonomously
           └─ You review finished results
```

See also: [Speeding up task completion with /fleet](https://docs.github.com/en/copilot/how-tos/copilot-cli/speeding-up-task-completion)

### Custom Agents

Beyond built-in agents, create specialized versions for your workflows:

**Locations:**
- **User-level:** `~/.copilot/agents/` (all projects)
- **Repository-level:** `.github/agents/` (current project)
- **Organization-level:** `.github-private/agents/` (all org projects)

**Usage:**
```bash
/agent               # Select from available agents
> "Use refactoring agent to improve this code block"
copilot --agent=refactor-agent  # Command-line option
```

For more information, see [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents).

---

<!-- 🎬 MAJOR SECTION: Plugins -->
## Plugins: Extending Copilot CLI

*Install community and team-created plugins to add specialized capabilities*

### What Plugins Are

Plugins are packages that extend Copilot CLI beyond its built-in capabilities. **Agent Plugins 1.0 is GA** in Copilot CLI, VS Code, and the Copilot app: one package can ship portable skills and MCP config, with Copilot-specific agents, commands, and hooks under `com.github.copilot/`. Existing non-1.0 plugins remain supported.

```bash
# Browse and install from a marketplace
copilot plugin marketplace browse awesome-copilot
copilot plugin install database-data-management@awesome-copilot

$ copilot
> "Show me the schema for the users table"
# Plugin provides database introspection capabilities
```

**Outcome:** Extend Copilot CLI with specialized domain capabilities without writing custom agents — leverage the community ecosystem.

This talk stays consumer-facing. For packaging, marketplaces, and authoring, see [Copilot Plugins](../copilot-plugins/) and [Finding and Installing Plugins](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing).

---

## Real-World Use Cases

### Use Case 1: The Walking-to-Meeting Debug (Remote + Interactive)

**The Problem:** An alert fires 3 minutes before standup. You start debugging at your desk, but you have to leave. Without `--remote`, you either skip the meeting or abandon the debug.

**The Solution:** Start locally, continue from your phone

```bash
# 9:02 AM — Alert fires. SSH into staging from your laptop.
ssh ops@staging-auth-01
$ copilot --remote

> "The auth service is returning 503. Debug it."

🤔 Copilot: Let me check the running environment.
[runs: docker logs auth-service --tail 50]
[runs: docker exec auth-service env | grep -E 'DB|REDIS|JWT']

# 9:05 AM — Scan QR code with your phone. Grab your bag.

# 9:07 AM — Walking to standup. Phone shows:
# "Found: JWT_SECRET missing from staging container env."

# From phone:
> "Check if any other services depend on that secret"

# 9:10 AM — Copilot reports: 2 more services affected. Proposes fix.
# From phone: approve the remediation plan.

# 9:12 AM — Walk into standup: "Staging auth is fixed, 3 services were affected."
```

**Why this matters:** You never would have solved this before the meeting at all. Without `--remote`, the options are: skip the meeting, abandon the debug, or frantically copy-paste on the walk. `--remote` creates a third option that didn't exist.

**Outcome:**
- **Incident resolved without sacrificing either the meeting or the debug**
- **Session continuity** — context, history, and running commands stayed intact across devices
- **No restart** — the phone connected to the same session, not a new one

---

### Use Case 2: Log Forensics Without Data Transfer (Remote)

**The Problem:** A production server has 12GB of application logs. Today, you'd `scp` a subset, grep locally, lose context, repeat. Sensitive data leaves the production boundary every time.

**The Solution:** Bring reasoning to the data instead of moving the data to the reasoning

```bash
# On the server where the logs actually live
ssh analytics@log-server
$ copilot --remote

> "Analyze access logs from the last 24 hours. Find the top 10 IP addresses
   making requests to /api/auth that resulted in 401 responses, and check
   if any show patterns consistent with credential stuffing."

🤔 Copilot:
[runs: grep '401' /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10]
[runs: grep '203.0.113.42' /var/log/nginx/access.log | head -20]

Found: 3 IPs making >10,000 auth attempts in 24 hours with sequential
username patterns. This is consistent with credential stuffing.

Recommendation: Block these IPs at the WAF and enable rate limiting on /api/auth.
```

**Why this matters:**
- **The logs never leave the machine** — no `scp`, no uploading to third-party analysis tools
- **Compliance-friendly** — PII stays within the production boundary
- **Speed** — analyzing locally is orders of magnitude faster than transferring 12GB
- **Scale** — you can analyze logs that are too big to download at all

---

### Use Case 3: Debugging a Running System (Interactive)

**The Problem:** Service fails in staging, works fine locally. The relevant information — container logs, environment variables, network connectivity, process state — is in the runtime environment, not the source files. VS Code can read your code; it can't interrogate what's actually running.

**The Solution:** Copilot CLI runs commands against the live environment to gather its own context

```bash
$ copilot
> "My auth service is returning 503 in staging but works locally. Debug it."

🤔 Copilot: Let me check the running environment directly.

[runs: docker logs auth-service --tail 50]
[runs: docker exec auth-service env | grep -E 'DB|REDIS|JWT']
[runs: curl -sv http://redis-staging:6379/ping]

Found: JWT_SECRET is set locally but missing from the staging container.
Redis connectivity is fine. The service is failing silently on token validation
and returning 503 instead of 401.

Fix: Add JWT_SECRET to your staging environment secrets and restart the container.
The 503 vs 401 mismatch is a separate issue — I'll flag a bug for that too.
```

**What makes this different from VS Code:** Copilot ran `docker logs`, `env`, and `curl` itself — it gathered the evidence rather than asking you to paste it in. An IDE-based assistant can read your source files; it can't reach into what's running. The terminal is where the runtime lives.

**Outcome:**
- **Evidence gathered automatically** — no copy-pasting logs into chat
- **Cross-system diagnosis** — checks container, env, and network in one session
- **Root cause + side-effect** — finds the missing secret *and* flags the misleading status code

---

### Use Case 4: Persistent Infrastructure Patrol (Remote + Cloud Delegation)

**The Problem:** Traditional monitoring tools tell you *what* happened (CPU at 92%, pod restarting). They don't tell you *why* or *what to do about it*. You still have to SSH in and investigate manually.

**The Solution:** A Copilot session that monitors, reasons about anomalies, and reports meaningful findings

```bash
# On a monitoring server, inside tmux
tmux new -s copilot-patrol
$ copilot --remote --allow-tool 'shell(kubectl)' --allow-tool 'shell(docker)'

> "Monitor the Kubernetes cluster. Every 5 minutes, check pod health,
   resource usage, and recent events. Alert me via the remote session
   if anything looks abnormal."

# You close your laptop. Go home. Check your phone Saturday morning.

# Remote session shows:
# "CPU at 92% on auth-7b — caused by crash loop that started after
#  the 14:32 deploy, which changed memory limit from 512Mi to 256Mi.
#  This is below steady-state requirements. Recommend rollback."

# From phone: approve the rollback with one tap.
```

**Why this matters:** A monitoring tool says "CPU is at 92%." An AI patrol says *why*, traces it to the root cause, and proposes a fix. You approve from dinner.

---

### Use Case 5: Multi-Machine Orchestration (Remote + /fleet)

**The Problem:** Debugging a distributed system failure. The problem spans three servers. Investigating them one at a time means losing context between SSH sessions.

**The Solution:** `/fleet` + `--remote` across multiple environments

```bash
# Three remote sessions, one from each environment:
# Terminal 1: copilot --remote on prod-db-1
# Terminal 2: copilot --remote on prod-api-3
# Terminal 3: copilot --remote on prod-worker-7

# From your browser — three session URLs, one dashboard:
# Steer all three investigations simultaneously.

> "Check disk usage, validate SSL certs, and compare deployed versions
   across all staging nodes."

# Five parallel sessions. Five machines. One prompt.
# Results merged into a single report.
```

**Why this matters:** Each session has full local context — file system, processes, logs — of its own machine. Your browser becomes a *console*, not for typing code, but for supervising distributed AI operations.

---

### Use Case 6: GitHub.com Integration — Issues, PRs, and Actions

**The Problem:** Context-switching between terminal and browser to manage GitHub tasks (triage issues, review PRs, create workflows) breaks flow and requires re-explaining what you were doing.

**The Solution:** Copilot CLI connects directly to GitHub.com — no browser required

```bash
$ copilot
# Working with issues
> "List all open issues assigned to me in my-org/my-repo"
> "I've been assigned this issue: https://github.com/my-org/my-repo/issues/42. Start working on it in a feature branch."
> "Raise an improvement issue in my-org/my-repo. In src/auth.py the file handle is never closed."

# Working with pull requests
> "List my open PRs"
> "Check the changes made in PR https://github.com/my-org/my-repo/pull/123. Report any serious errors."
> "Merge all the open PRs I've created in my-org/my-repo"
> "Create a worktree for PR #42 so I can test it locally"

# Creating GitHub Actions workflows
> "Create a GitHub Actions workflow that runs eslint on PRs and fails if errors are found. Push and open a PR."

# Using the GitHub MCP server
> "Use the GitHub MCP server to find good first issues for a new team member in my-org/my-repo"
```

**Key insight:** Copilot CLI can create pull requests on your behalf — you're marked as the author. This means you can describe a change in plain English from your terminal and end up with a PR on GitHub.com, without ever leaving the CLI session. Starting in v1.0.60, you can also create a **Git worktree** for any PR directly from the `/pr` screen — one keystroke to spin up an isolated workspace for review or testing without affecting your current branch.

**Outcome:**
- **Browser context switches eliminated** — GitHub.com tasks stay in terminal flow
- **Issue → branch → PR** completed without switching tools
- **Workflow creation** from natural language description, not YAML from scratch

---

## ✅ What You Can Do Today

**Immediate Actions (15 minutes):**
- [ ] Install Copilot CLI: `gh copilot` (auto-installs on first run) or `npm install -g @github/copilot`
- [ ] Try interactive mode: `copilot` and ask about your current project — "Explain how this module works" or "What library should I use for X?"
- [ ] Test Plan Mode: Press Shift+Tab, then describe a new feature you're about to build
- [ ] Try `/ide <filename>` from within a session — opens the file in VS Code while your CLI conversation stays alive. If you have Copilot app 1.1.3+, try `/app` to hand the same session to the desktop app
- [ ] After a wrong-turn edit, run `/rewind` and choose Conversation + files — confirm Copilot's files restore and any later edit you typed stays

**Developer Short-Term (1 hour):**
- [ ] Use Copilot CLI to scaffold your next new project or module interactively
- [ ] Next time a test fails and you don't immediately know why, reach for `copilot` before print statements
- [ ] Delegate a long-running task with `& <task>` — verify your IDE stays completely free while the agent works in the cloud
- [ ] Create `.github/copilot-instructions.md` with your project conventions so Copilot learns your style
- [ ] Run `/context` and `/usage` to understand session management and auto-compaction — also run `/mcp` if you use MCP servers to see per-server token usage
- [ ] Try `/voice` if you have Foundry Local installed — dictate a prompt hands-free
- [ ] Run `/chronicle standup` after a productive session — verify it reflects what you actually did; use `/chronicle improve` to get Copilot's read on what's worth adding to your `.github/copilot-instructions.md`

**DevOps Short-Term (1 hour):**
- [ ] Add Copilot CLI to one CI/CD pipeline for build failure analysis — use `copilot -p "Analyze build failure" --allow-tool 'shell(gh)'`
- [ ] Try a scheduled prompt: `copilot --experimental` then `/every 30m "Check pod health in staging and alert me if anything is unhealthy"` — list or delete it with bare `/every`. Closing the laptop stops session-scoped schedules; use cron/`copilot -p` when no session is open
- [ ] Enable local sandboxing in a trusted repo: `copilot --experimental` then `/sandbox enable` — or try `copilot --cloud --experimental` if org Cloud Sandbox access is on
- [ ] Try `--remote` on a staging server: SSH in, run `copilot --remote`, scan the QR code on your phone, and steer from there
- [ ] Analyze logs on a remote machine without downloading them — `copilot --remote` + "Analyze the last 24 hours of error logs"
- [ ] Run a long-running agentic task with `& <task>` (security audit, doc generation) — confirm your IDE and terminal stay free while the agent runs in the cloud
- [ ] Try GitHub.com integration: manage issues and open PRs directly from your terminal (see Use Case 6)

**Next:** Review [Copilot CLI Best Practices](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices) · Share time-savings wins · Explore [Copilot Hooks](../copilot-hooks/) for governance

---

## Related Patterns

### Complementary Features

- **[Copilot Hooks](../copilot-hooks/)** — Add validation, logging, and security scanning at key execution points in CLI workflows
- **[MCP Apps](../mcp-apps/)** — Extend Copilot CLI with external tools and data sources via Model Context Protocol
- **[Cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes)** — First-party local (`/sandbox enable`) and cloud (`copilot --cloud`) isolation for Copilot CLI (public preview)
- **[Copilot Plugins](../copilot-plugins/)** — Authoring and marketplace depth for Agent Plugins 1.0

### Decision Flow

**If this talk doesn't fit your needs:**

```
Q: What's your actual goal?
├─ In-editor code assistance → See: VS Code Copilot documentation
├─ Cross-repository architectural analysis → See: Copilot Web (github.com/copilot)
├─ Organization-wide governance → See: Copilot Hooks
└─ Extending with external tools → See: MCP Apps
```

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for complete navigation help.

---

## 📚 Official Documentation

**Primary Documentation:**
- 📖 **[About GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)** — Core concepts, capabilities, modes of use
- 📖 **[Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)** — Command syntax, options, workflows, and slash commands
- 📖 **[Installing GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli)** — Setup instructions for npm, Homebrew, WinGet, and install scripts
- 📖 **[Steering a session remotely](https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely)** — Using `--remote` to monitor and steer sessions from web and mobile
- 📖 **[Using GitHub Copilot CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle)** — `/chronicle` for standup reports, personalized tips, and `/chronicle improve` suggestions
- 📖 **[About GitHub Copilot CLI session data](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/chronicle)** — How session history is stored and used
- 📖 **[About cloud and local sandboxes](https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes)** — Local `/sandbox` and `copilot --cloud` (public preview)
- 📖 **[Scheduling prompts](https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts)** — Session-scoped `/every` and `/after` (experimental)

**Additional Resources:**
- 🎓 [Copilot CLI Best Practices](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices) — Optimization patterns and anti-patterns
- 🎓 [Adding Custom Instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions) — Repository-specific behavior configuration
- 🔧 [GitHub Copilot CLI Command Reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) — Complete slash command and option reference, including `/rewind`
- 🔧 [Copilot CLI ACP Server](https://docs.github.com/en/copilot/reference/acp-server) — Using Copilot CLI via Agent Client Protocol
- 🔌 [Finding and Installing Plugins](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing) — Plugin discovery, installation, and marketplace management
- 🔌 [About Plugins for Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-cli-plugins) — Plugin concepts and capabilities
- 🔌 [Creating a Plugin](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating) — Build your own plugins
- 🔌 [Creating a Plugin Marketplace](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace) — Host your team's or organization's plugins

**GitHub Resources:**
- 📋 [GitHub Blog: Remote control CLI sessions (public preview)](https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/) — Remote session steering from web and mobile
- 📋 [GitHub Blog: Plan Mode Announcement](https://github.blog/changelog/2026-01-21-github-copilot-cli-plan-before-you-build-steer-as-you-go/) — Plan Mode, reasoning models, and latest features
- 📋 [GitHub Blog: Faster, more concise, and prettier](https://github.blog/changelog/2025-10-10-github-copilot-cli-faster-more-concise-and-prettier/) — Performance improvements and output polish
- 🐙 [Copilot CLI Public Repository](https://github.com/github/copilot-cli) — Issue tracking and community discussions
- 📹 [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) — Enhancing Copilot with specialized tasks

---

## 🎭 Behind the Scenes

### Plan Mode Technical Mechanics

Plan Mode uses the `ask_user` tool to pause generation and prompt for clarification — this is a first-class model capability, not a prompt trick. The model predicts ambiguity, asks targeted questions, waits for answers, then commits to an approach. This eliminates the "assume and implement wrong" failure mode that causes 6-8 iteration cycles.

### Remote Session Architecture

`--remote` works by establishing a secure tunnel between the CLI process (running on the target machine) and GitHub's session relay infrastructure. The browser/mobile client connects to the same relay via authenticated WebSocket. All communication is authenticated with your GitHub identity — sessions are private to the initiating user. The CLI process is the source of truth; web and mobile are viewports. Combined with tmux or screen, sessions survive SSH disconnects entirely — the AI keeps working, and you reconnect when ready.

---

**AI at the point of work — start anywhere, steer anywhere, resume anywhere**
