---
status: active
updated: 2026-08-10
section: "Developers"
references:
  - url: https://code.visualstudio.com/updates/v1_132
    label: "VS Code release notes: August 5, 2026 (v1.132)"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases
    label: "GitHub Copilot in VS Code: July 2026 releases"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-07-08-github-copilot-in-visual-studio-code-june-2026-releases
    label: "GitHub Copilot in VS Code: June 2026 releases"
    verified: 2026-08-10
  - url: https://code.visualstudio.com/updates/v1_122
    label: "VS Code release notes: May 28, 2026 (v1.122)"
    verified: 2026-08-10
  - url: https://code.visualstudio.com/updates/v1_121
    label: "VS Code release notes: May 20, 2026 (v1.121)"
    verified: 2026-08-10
  - url: https://code.visualstudio.com/docs/copilot/overview
    label: "GitHub Copilot in VS Code documentation"
    verified: 2026-08-10
  - url: https://code.visualstudio.com/docs/copilot/agents/background-agents
    label: "Background Agents documentation"
    verified: 2026-08-10
  - url: https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot
    label: "Upcoming September 2026 model deprecations in GitHub Copilot"
    verified: 2026-08-10
---

# VS Code Copilot 1.121–1.132: Agent Infrastructure, Open Models, and Closed-Loop Delivery

> **The Question This Talk Answers:**
> *"How does VS Code's Copilot platform evolve from a single-window conversation partner into portable agent infrastructure with open model choice and a closed review loop — and which capabilities are ready for our teams today?"*

**Duration:** 45-60 minutes | **Target Audience:** Developers using AI-assisted workflows in VS Code

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Releases 1.121–1.132 change how Copilot agents are deployed, which models they use, and how review happens. Every VS Code Copilot team is affected. |
| **Compelling** | 🟢 High | The open-model story (BYOK with no GitHub sign-in) and the Agents window parallel-work model are architectural shifts, not incremental additions. |
| **Actionable** | 🟢 High | GA browser tools, Stable Custom Endpoint, and BYOK are available today. Parallel sessions and remote hosts are preview but explorable now. |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Portable agent infrastructure** — The Copilot SDK and Agent Host Protocol (AHP) let agent sessions run on owned remote machines and survive the originating VS Code window closing.
- **Open model choice** — Supported BYOK providers, local Ollama models, and compatible custom endpoints work in chat, tools, and MCP without a GitHub sign-in.
- **Parallel agent work** — Multiple sessions, multiple chats per session, peer forks, and live activity visibility make concurrent agent workflows practical in the Agents window.
- **Closed-loop delivery** — GA browser tools, in-window diff review, element-specific comments, and direct CI/PR feedback responses close the build-validate-review cycle without leaving the agent session.

### The Emerging Practice

The central question VS Code 1.121–1.132 answers is not "what new features shipped" — it's how agentic development infrastructure matures. The Agent Host Protocol and Copilot SDK remove the coupling between one VS Code window and one live agent session. A remote session can persist when its client disconnects, and the agent host can synchronize the same session across multiple VS Code windows. This changes what "starting an agent" means: it can be a durable unit of work running on infrastructure our teams own.

Model choice and economics follow from the same logic. When any compatible endpoint works — including local Ollama models and provider API keys without GitHub sign-in — the model picker becomes infrastructure configuration rather than a subscription-tier boundary. The 1M-token context windows available on supported models stop being a "nice to have" and start being a practical architectural decision for large-codebase tasks. The one firm boundary: inline suggestions and next-edit suggestions (NES) still require GitHub sign-in. That's the boundary worth knowing before designing any offline or air-gapped workflow.

Parallel work and closed-loop review make this practical at scale. The Agents window running multiple sessions side-by-side, with `/btw` for contextual side chats and live activity pills for subagent and browser visibility, means a developer can direct several concurrent efforts without losing orientation. When those efforts touch the browser or produce PRs, the review workflow stays in the same window — device-emulated screenshots, element comments, inline diff review, and CI/PR response all resolve without context switching.

---

## How It Works: The Four Pillars

| Pillar | What Changed | Status |
|---|---|---|
| **Agent Infrastructure** | AHP + Copilot SDK: sessions persist beyond the originating window; run on owned remote hosts | Preview |
| **Open Model Workbench** | BYOK without GitHub sign-in; Stable Custom Endpoint; Ollama; 1M-token contexts | GA (with noted limits) |
| **Parallel Agent Work** | Multi-session, multi-chat, peer forks, `/btw` side chats, live activity pills | Preview (Agents window) |
| **Closed-Loop Delivery** | GA browser tools with device emulation, element comments, in-window review, CI/PR feedback | GA + Preview mix |

---

## 📦 Key Artifacts

- **`custom-endpoint-config`** — Sample registration for a custom OpenAI-compatible model endpoint, shown inline in the Open Model Workbench section.
- **`settings-reference`** — Consolidated settings block for browser tools, terminal sandboxing, and MCP controls, shown in the Boundaries section.

---

<!-- 🎬 MAJOR SECTION: Agent Infrastructure -->
## Agent Infrastructure: Remote Hosts and a Portable Harness

The infrastructure story in VS Code 1.121 centers on two components: the **Agent Host Protocol (AHP)** and the **Copilot SDK**. Together they make the agent harness portable — decoupled from a specific VS Code window and capable of running on infrastructure our teams own.[^1]

### The Agent Host Protocol

AHP is an open protocol for coordinating agent sessions across multiple clients. An agent host owns authoritative session state, synchronizes it to connected clients, and sequences mutations. Because the specification is open, other clients and hosts can implement the protocol.

In practice, the Agents window can connect through SSH or a dev tunnel to a remote machine, start a long-lived agent host there, and reconnect after the client disconnects. VS Code 1.132 extends the model by allowing the same agent session to be connected from multiple VS Code windows.[^1][^5]

### Remote Machine Execution

The remote agent host runs as a separate process on an owned machine reachable through SSH or a VS Code dev tunnel:

1. Open the Agents window.
2. Open its remote tab and connect with an existing `~/.ssh/config` entry, a `user@host` value, or a running dev tunnel.
3. VS Code installs or connects to its CLI server and starts the agent host on that machine.

The host persists after the VS Code window closes. Progress, tool outputs, and session memory remain accessible on reconnect.

> **Preview boundary:** Remote agents and parts of the AHP rollout are preview capabilities in v1.121. The protocol design is stable, but host registration and session migration UX continue to evolve.[^1]

### Copilot SDK and Harness Portability

The Copilot SDK is the runtime that agent harnesses are built on. The SDK abstraction means:

- The agent host can run Copilot, Claude, and Codex harnesses in a dedicated process
- The Copilot harness uses the Copilot SDK, aligning behavior with Copilot CLI and the standalone Copilot app
- Clients and hosts can coordinate through the open AHP specification

This separates the session-management protocol from the harness that performs the coding work.[^1][^5]

### Decision: Local vs. Remote Agent Execution

```
Q: Where does the agent work need to run?
├─ Work is interactive and exploratory
│  └─ Local session in the Agents window → full UX, real-time steering
│
├─ Work is long-running and autonomous (> 30 min, multi-file)
│  └─ Remote host with Autopilot → session persists, reconnect on completion
│
├─ Work needs CI environment or production secrets
│  └─ Remote host on owned infrastructure → environment parity, access control
│
└─ Work is blocked on an interactive terminal or browser
   └─ Local session with GA browser tools → closed-loop review stays in-window
```

---

<!-- 🎬 MAJOR SECTION: Open Model Workbench -->
## Open Model Workbench: Bring Any Model, No Sign-In Required

VS Code 1.122 makes the most consequential model-flexibility change yet: using Anthropic, Azure, Gemini, OpenAI, Ollama, OpenRouter, or any compatible custom endpoint no longer requires a GitHub account. Chat, tool execution, and MCP operate against whatever model is configured.[^2]

### BYOK Without GitHub Sign-In (GA)

Any VS Code user can configure a provider key in the model picker — no GitHub sign-in, no Copilot subscription required for the connected model.

**To add a provider:**
1. Open the model picker (chat input area, model name dropdown)
2. Select **Manage Models…**
3. Choose a provider (Anthropic, Azure OpenAI, Google Gemini, OpenAI, Ollama, OpenRouter) or **Custom**
4. Enter the API key and select models to expose in the picker

Billing and rate limits go through the provider — Copilot quotas don't apply to BYOK sessions.[^2]

> **The one firm boundary:** Inline suggestions (ghost-text completions while typing) and next-edit suggestions (NES) still require GitHub sign-in and a Copilot subscription. BYOK applies to chat, agents, tool calls, and MCP — not to the completions engine.[^2]

### Local Models via Ollama

Ollama is a first-class supported provider. After installing Ollama and pulling a model locally, add it via the model picker:

1. Select **Manage Models…** → **Ollama**
2. VS Code discovers locally available Ollama models automatically
3. Select which models to expose in the picker

Local models work with all chat features, tool execution, and MCP — no network request leaves the machine. This matters for teams with air-gap requirements or sensitive codebases where data residency is constrained.

```bash
# Pull models locally before adding them to VS Code
ollama pull llama3.2
ollama pull codestral
```

### Stable Custom Endpoint

The **Custom Endpoint** provider is available in Stable as of v1.122. It connects endpoints that implement the Chat Completions, Responses, or Messages API families.

Configure it through **Chat: Manage Language Models**: add **Custom Endpoint**, choose the endpoint's API family, then provide the endpoint and model details requested by the editor.[^2]

Teams running internal model gateways — for cost control, logging, or compliance — can route all VS Code Copilot chat traffic through them without any client-side code changes.[^2]

### Utility Models

Utility models handle background chat tasks such as titles, summaries, commit messages, rename suggestions, prompt categorization, and intent detection. They are independently configurable, making it practical to reserve a frontier model for primary work while a faster local or lower-cost model handles utility flows.

```json
{
  "chat.utilityModel": "[configured-model-id]",
  "chat.utilitySmallModel": "[configured-fast-model-id]"
}
```

### 1M-Token Contexts

Models with 1M-token context support can be used for large-codebase tasks that previously required careful context management. When a supported model is selected, VS Code exposes the full context window. The context indicator in the chat input area shows token usage breakdown on hover.

Practical note: very long contexts increase latency and provider cost. The `/compact` command and background compaction remain available as cost-quality tradeoffs for models that perform better with focused contexts.[^2]

### Model Selection Decision Guide

```
Q: What will the model do in this session?
├─ Interactive chat and planning
│  └─ Currently supported frontier model via Copilot or BYOK
│
├─ Long-context codebase analysis (> 200k tokens)
│  └─ BYOK provider with 1M-token model + direct API access
│
├─ High-volume agent sub-tasks (search, retrieval, summarization)
│  └─ Utility model (Ollama local, or low-cost API endpoint)
│
├─ Sensitive codebase or air-gap requirement
│  └─ Ollama local model — no data leaves the machine
│
└─ Inline completions (ghost text, NES)
   └─ GitHub sign-in + Copilot subscription required — no BYOK path
```

---

<!-- 🎬 MAJOR SECTION: Parallel Agent Work -->
## Parallel Agent Work: Multiple Sessions, Peer Forks, and Live Activity

The Agents window started as a dashboard for monitoring agent sessions. In releases 1.121–1.132, it becomes the workspace for running multiple concurrent efforts with full visibility into what each session is doing.[^4]

### Multiple Sessions Side-by-Side

The Agents window supports multiple active sessions running simultaneously, each with its own worktree, tool context, and model configuration. Sessions can be grouped, reordered, and filtered. Common patterns:

- Run a **spec-writing session** and a **test-generation session** simultaneously for the same feature
- Keep a **long-running refactoring session** in the background while working interactively on a different module
- Route different harnesses to different sessions: one using a local Ollama model for exploration, another using a frontier model for generation

Worktrees are automatically managed per session. Each session's changes stay isolated until reviewed and merged.[^4]

### Multiple Chats Per Session and Peer Forks

Within a single agent session, the Agents window supports multiple chat threads. This is useful for:

- **Branching exploration** — start from the same point and explore two approaches in parallel without losing either
- **Peer review conversations** — keep a review discussion separate from the implementation conversation, both referencing the same session state

**Peer-chat forks** create a new chat from any point in an existing conversation. The fork shares the session's worktree and tool state, so both chats have access to the same files without duplicating setup.[^4]

### Worktrees Across Harnesses

The worktree isolation model now works across harnesses. Whether a session is running on the local VS Code harness, a remote host, or the Copilot SDK harness, changes go into an isolated Git worktree. This means:

- Background sessions started before a remote-host rollout continue to work the same way
- Teams mixing local and remote execution don't need per-harness worktree configuration
- The review-and-merge workflow — review diffs inline, apply all, cherry-pick, or discard — is consistent regardless of where the session ran[^4]

### /btw: Contextual Side Chat Without Interrupting a Turn

The `/btw` command (v1.132) opens a side chat that runs alongside the active agent turn without pausing or interrupting it.[^5]

```
/btw should we use the builder pattern here instead?
```

Use cases:
- Ask a clarifying question while an agent is executing a long tool chain
- Capture an observation for later action without stopping the current turn
- Route a subagent inquiry to a different thread so the main conversation stays clean

The side chat shares the primary chat's context and prompt cache. Responses appear separately while the main turn continues.[^5]

### Live Activity Pills

Live pills in the Agents window surface what is happening inside a running session at a glance. Pills expose:[^5]

- **Changes** — files modified so far in the current turn
- **Previews** — Markdown previews for files the agent creates or edits
- **Subagents** — active child conversations with direct navigation
- **Browsers** — direct access to the integrated browser activity for the session

For sessions running Autopilot, live pills replace the need to manually poll session state. The pills clear when a turn completes, so the session view doesn't accumulate noise from previous work.

### Preview Status and Practical Limits

> The Agents window remains public preview. Session migration across hosts, peer-fork merge conflict resolution, and group-level settings are still evolving. For production-critical workflows, treat the Agents window as high-capability preview rather than a stable production substrate.

---

<!-- 🎬 MAJOR SECTION: Closed-Loop Delivery -->
## Closed-Loop Delivery: Build, Validate, and Review Without Leaving the Session

VS Code 1.123–1.132 closes the feedback loop: browser validation, code review, CI response, and PR comment handling all happen inside the Agents window session that did the work.[^3][^4][^5]

### GA Agentic Browser Tools

Agentic browser tools are generally available and enabled by default as of the June 2026 release. No configuration flag is required.[^3]

Built-in browser tool capabilities:

- **Navigation**: `openBrowserPage`, `navigatePage`
- **Inspection**: `readPage`, `screenshotPage`
- **Interaction**: click, hover, type, handle dialogs, and drag page elements
- **Automation**: run Playwright sequences for custom validation
- **Device emulation**: specify viewport, user-agent, and device preset in tool calls
- **Remote browsing**: connect to a browser on a remote host running the agent session

Pages opened by agents run in private, in-memory sessions. Tabs must be explicitly shared to give an agent access to an existing browser session.

```json
// Browser tools are GA and on by default.
// Re-enable if policy-disabled:
"workbench.browser.enableChatTools": true
```

### Device Emulation and Screenshots

Device emulation lets agents validate responsive layouts and mobile-specific behavior without leaving VS Code. An agent can:

1. Open a localhost page in the integrated browser
2. Emulate a specific device (iPhone 15, Galaxy S24, iPad) or custom viewport
3. Take a screenshot
4. Comment on the result or adjust CSS and re-validate

Screenshots are attached directly to the chat turn that produced them, making the validation evidence part of the conversation record.[^3]

### Element-Specific Comments (v1.132)

Developers can select one or more elements in the integrated browser, attach a comment to each, and send that precise visual feedback to the agent.[^5]

Practical use: after an agent implements a UI component, the reviewer selects the elements that still need attention and anchors a separate instruction to each before sending the feedback.

### In-Window Code and Diff Review

Files and diffs created by an agent session are reviewable inside the Agents window without switching to the main editor. The review panel shows:[^4]

- All files modified in the current session
- A per-file diff view with options to apply, revert, or cherry-pick changes
- Inline commenting on any line — comments are actionable by the agent in subsequent turns

This replaces the earlier pattern of reviewing changes in the worktree diff and then returning to chat to request adjustments. The review and the conversation are the same surface.

### Markdown Editing with Agent-Actionable Comments

For Markdown files, the session supports hybrid editing: the developer edits Markdown directly alongside the agent's proposed content, and comments left by the developer become instructions the agent acts on in its next turn.[^4]

> **Experimental:** Hybrid Markdown editing is experimental through v1.132. Enable via the Agents window session settings. Behavior may change before GA.

### CI and PR Feedback Response

When a session's changes are pushed to a branch and CI runs, the Agents window surfaces failed check details directly in the session view. The agent can then:[^4]

- Read the failure details (test output, lint errors, type errors)
- Propose and apply fixes
- Re-run relevant checks to confirm resolution

Pull request review comments that arrive on the branch are surfaced in the session. The agent can respond to each comment, apply the requested change, or mark the comment as addressed — all from within the Agents window. This closes the last gap in the build-review-merge cycle.

---

## Boundaries and Control

Enterprise controls in the June 2026 release complement the open model and parallel work capabilities with visibility and governance.[^3]

**Session cost visibility:** The Agents window shows credit usage per session and per subagent turn. Model costs are visible when using BYOK providers. Teams can monitor spend without leaving the development context.

**OpenTelemetry signals:** Richer OTel trace data from agent sessions integrates with existing observability platforms. Tool call latency, turn count, and subagent depth are exported as structured spans.

**Managed settings:** Organizations can enforce baseline VS Code Copilot settings through managed configuration, preventing individuals from overriding security-relevant defaults (sandbox settings, terminal approval behavior, sensitive prompt handling).

**MCP allowlists:** Enterprise MCP allowlists let organizations centrally control which MCP server endpoints agent sessions can connect to. Team-scoped allowlists appear in the Agents window session settings.

**Sensitive terminal prompts:** Password, passphrase, PIN, and verification-code prompts are intercepted. With default approvals, VS Code directs the developer to enter the value in the terminal; in auto-approve flows, it cancels the command and tells the model not to retry or request the secret.[^1]

```json
// Key settings for security-aware deployments
{
  "chat.agent.sandbox.enabled": true,
  "github.copilot.chat.organizationInstructions.enabled": true,
  "workbench.browser.enableChatTools": true
}
```

> Some controls depend on Copilot plan (Business or Enterprise) and organization policy. Individual plans have access to session cost visibility but not managed settings or MCP allowlists.

---

## 🎯 Mental Model Shift

> **The Core Insight:** Copilot in VS Code has moved from **a conversation attached to a window** to **portable agent infrastructure**: sessions run on remote hosts, consume any compatible model, work in parallel across worktrees, and close the review loop without leaving the Agents window.

### Move Toward ✅

- ✅ **Remote agent sessions** for long-running, environment-parity work — start on laptop, continue on owned infrastructure
- ✅ **BYOK with local or provider models** for tasks where model choice, cost control, or data residency matters
- ✅ **Utility model tuning** — assign a fast local model to background chat tasks and a frontier model to primary work
- ✅ **Parallel sessions in the Agents window** for concurrent efforts on independent tasks in the same repo
- ✅ **`/btw` for lateral questions** during long agent turns — redirect mid-flight without stopping the main task
- ✅ **GA browser tools for frontend validation** — close the build-screenshot-fix loop inside the session
- ✅ **In-window diff review** with actionable comments — review and redirect from the same surface that did the work

### Move Away From 🔄

- 🔄 **Manual agent polling** — live pills and session grouping replace "check the terminal and come back"
- 🔄 **Per-session model configuration** — utility model settings and BYOK provider defaults persist once configured
- 🔄 **Switching to the browser to validate changes** — device emulation and element comments keep validation in-window
- 🔄 **Separate PR review contexts** — CI failures and review comments surfaced in the Agents window session remove the need to context-switch to the PR tab

### Move Against 🛑

- 🛑 **Using BYOK for inline completions** — there is no BYOK path for ghost-text completions or NES; plan around GitHub sign-in for those features
- 🛑 **Remote agent sessions without managed settings** — AHP-connected remote hosts need the same terminal sandbox and approval settings as local sessions; leaving these unmanaged increases blast radius
- 🛑 **Treating Agents window parallelism as production-grade concurrency** — the window is preview; for CI-pipeline parallelism, use GitHub Actions with Copilot agent workflows

> **What This Looks Like:** A backend service needs a large API contract migration. The team starts a session in the Agents window, assigns it to a registered remote host, enables Autopilot, and disconnects for the evening. The session commits to an isolated worktree using a BYOK frontier model. The next morning, the developer reconnects, opens the in-window diff review, and works through the changes file by file — commenting, redirecting, and approving — without ever leaving the Agents window.

---

## When to Use This

### Decision Tree

```
Q: What does the workflow need?
├─ Long-running autonomous task on owned infra or with env parity
│  └─ Remote agent host (AHP) — preview; session persists without VS Code
│
├─ Any model, no GitHub sign-in, local execution
│  └─ BYOK or Ollama endpoint — GA; configure in model picker
│
├─ Concurrent work on independent tasks in the same repo
│  └─ Agents window multi-session — preview; separate worktrees per session
│
├─ Lateral question during an active agent turn
│  └─ /btw side chat — GA in v1.132; opens without pausing the main turn
│
├─ Frontend validation with device emulation
│  └─ GA browser tools — on by default; device emulation included
│
└─ Review and respond to CI / PR comments in-context
   └─ Agents window in-window review — preview; CI and PR feedback surfaced in session
```

### Use This When

- The team runs VS Code 1.121+ and has access to the Agents window (Stable preview channel or later)
- Model choice, cost visibility, or data residency requirements make BYOK or local models the right fit
- Tasks are large enough (> 30 min, > 5 files, multiple sub-tasks) to benefit from parallelism or remote execution
- Frontend workflows need browser validation without leaving the development context

### Not the Right Fit When

- The primary need is inline code completions or next-edit suggestions — those require GitHub sign-in regardless of BYOK configuration
- Production-grade automation is required — the Agents window is preview; use GitHub Actions with Copilot-enabled workflows for reliable CI-level parallelism
- The team uses VS Code Remote SSH without the Agents window — the remote agent host is distinct from VS Code Remote and requires the AHP runtime on the target machine

---

## Real-World Use Cases

### Use Case 1: Large Refactoring Run Overnight on Owned Infrastructure

**The Scenario:** A backend module with 40+ files needs migration to a new API contract. Running this as a local session would block the developer's machine for hours.

**How It Works:** Start a new session in the Agents window, assign it to a registered remote host, provide the migration spec, and enable Autopilot. Disconnect. The session continues on the remote host, commits per turn to an isolated worktree, and shows status on reconnect. The developer opens the in-window diff review and cherry-picks or approves file by file.[^1][^4]

**What We Get:** A full-night autonomous migration run without blocking local compute — with a review workflow that shows every file changed, in context, without switching tools.

---

### Use Case 2: Validating a Responsive Redesign Across Device Breakpoints

**The Scenario:** A frontend component needs to work correctly on mobile, tablet, and desktop. The developer wants the agent to implement, screenshot, and confirm each breakpoint without manual browser switching.

**How It Works:** With GA browser tools and device emulation, the agent opens the component in the integrated browser, emulates each device preset (iPhone 15, Galaxy S24, iPad Pro), screenshots the result, and attaches element comments to any layout issue it finds. The developer sees the annotated screenshots in the chat turn.[^3][^5]

**What We Get:** A complete responsive validation pass — three device profiles, annotated screenshots, and per-element comments — in a single agent turn, without opening an external browser.

---

### Use Case 3: Running Two Approaches in Parallel to Pick the Better One

**The Scenario:** A team is unsure whether to implement a feature using a state machine or an event-sourcing pattern. Both are plausible; working prototypes of each are needed to compare.

**How It Works:** Open two sessions in the Agents window — one per approach. Both run in separate worktrees. A `/btw` query mid-run on either session captures observations without interrupting the turn. When both complete, the team reviews diffs side by side in the Agents window and picks the approach with clearer code and passing tests.[^4][^5]

**What We Get:** Two complete working prototypes — with full diffs and test results — produced in the time it previously took to produce one, with a decision framework that's code-grounded rather than opinion-based.

---

## ✅ What You Can Do Today

**15 minutes:**
- [ ] Update VS Code to 1.132 to get `/btw`, live pills, and element comments
- [ ] Open **Manage Models…** in the chat model picker and add an Ollama endpoint or BYOK provider key — no GitHub Copilot subscription required
- [ ] Confirm browser tools are active: open a localhost URL in the integrated browser and ask the agent to screenshot and describe the page
- [ ] Try `"workbench.browser.enableChatTools": true` if browser tools aren't responding (they default to on in 1.132)

**1 hour:**
- [ ] Pull a local model with Ollama and configure `chat.utilityModel` or `chat.utilitySmallModel` to use the model for background chat tasks
- [ ] Start a multi-session Agents window setup: two sessions on separate tasks in the same repo, each in its own worktree
- [ ] Use `/btw` during an active agent turn to ask a lateral question — confirm it runs without pausing the main conversation
- [ ] Run a frontend task with device emulation: implement a component, ask the agent to screenshot it in mobile and desktop modes, and review the element comments

**2–4 hours:**
- [ ] If the team has a registered remote host or dev container, register it as an agent host and start a session through the AHP — test reconnection after disconnecting VS Code
- [ ] Enable managed settings in the GitHub organization Copilot policy and verify that terminal sandbox settings propagate to developer machines
- [ ] Configure enterprise MCP allowlists in organization Copilot policy and confirm which MCP servers appear in the Agents window session settings
- [ ] Set up OTel trace export from agent sessions and confirm spans appear in your observability platform (Datadog, Grafana, or equivalent)
- [ ] Run a full closed-loop delivery test: implement a feature, validate in the browser with device emulation, push to a branch, watch CI failure surface in the session, and let the agent fix it without leaving the Agents window

---

## Related Patterns

- **[Copilot CLI](../copilot-cli/)** — CLI session sidebar, `/worktree`, and `/rewind` commands complement the Agents window for terminal-first workflows
- **[Custom Agents & Skills](../copilot-primitives/)** — `.agent.md` harness configuration, Agent Skills, and hooks that work across local and remote sessions
- **[Terminal Sandboxing](../terminal-sandboxing/)** — Deep dive on sandbox configuration — essential for any remote agent host deployment
- **[MCP Servers](../mcp-servers/)** — MCP configuration patterns that pair with enterprise MCP allowlists

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for full navigation.

---

## 📖 References

[^1]: **[VS Code Release Notes: May 20, 2026 (v1.121)](https://code.visualstudio.com/updates/v1_121)** — Remote agent host, Agent Host Protocol (AHP), Copilot SDK harness portability

[^2]: **[VS Code Release Notes: May 28, 2026 (v1.122)](https://code.visualstudio.com/updates/v1_122)** — BYOK without GitHub sign-in (GA), Stable Custom Endpoint, Ollama integration, independently configurable utility models, 1M-token context support

[^3]: **[GitHub Copilot in VS Code: June 2026 releases](https://github.blog/changelog/2026-07-08-github-copilot-in-visual-studio-code-june-2026-releases)** — GA agentic browser tools with device emulation, session credit visibility, richer OTel signals, managed settings enforcement, enterprise MCP allowlists

[^4]: **[GitHub Copilot in VS Code: July 2026 releases](https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases)** — Parallel sessions, multiple chats per session, peer-chat forks, session grouping and reordering, in-window code/Markdown/diff review, CI/PR feedback surfacing

[^5]: **[VS Code Release Notes: August 5, 2026 (v1.132)](https://code.visualstudio.com/updates/v1_132)** — `/btw` side chat, live activity pills, element-specific browser comments

[^6]: **[GitHub Copilot in VS Code Documentation](https://code.visualstudio.com/docs/copilot/overview)** — Comprehensive reference for Copilot features, agent types, customization, and settings

[^7]: **[Background Agents Documentation](https://code.visualstudio.com/docs/copilot/agents/background-agents)** — Worktree isolation, background session lifecycle, and review workflow

### Official Documentation

- 📖 [GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/overview) — Core Copilot feature reference [^6]
- 📖 [Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents) — Worktree isolation and session lifecycle [^7]
