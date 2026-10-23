---
status: active
updated: 2026-10-23
---

# Tech Talks Decision Guide

Choose a talk by the decision you need to make. Use a pathway when you need a sequence.

## Start Here: First Useful Workflow

Use this path when you are new to Copilot or introducing it to a team. Each step ends with evidence that makes the next step worthwhile.

1. **Choose the surface** — [Which Copilot Where?](surfaces/) produces a routed task with named context and reviewer.
2. **Configure shared behavior** — [Copilot Configuration Primitives](copilot-primitives/) builds and verifies instructions, prompts, skills, and agents.
3. **Run a contracted local loop** — [Local Agentic SDLC](local-agentic-sdlc/) plans, implements, tests, reviews, and integrates one change on your machine, with a done condition you can check.
4. **Delegate and verify on GitHub** — [Copilot on GitHub](copilot-on-github/) shows the cloud agent drafting a pull request, code review and Code Quality reporting on every push, and you steering the rework and approving the merge.
5. **Automate a recurring chore** — [GitHub Agentic Workflows](agentic-lifecycle/) compiles one repository chore into a workflow with read-only defaults, safe outputs, and a named approver.

Stop at any step when its evidence is missing. Repair that boundary before adding more autonomy.

Sections follow where the agent runs and who starts it. Every talk applies the same four judgment lenses — context, delegation, verification, and authority — inside its own scope.

## Foundations

**Question:** Which surface fits the work, and what shared context does every agent need?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Choose the right Copilot surface | [Which Copilot Where?](surfaces/) | A routed task with named context, artifact, and reviewer |
| Encode and verify shared Copilot behavior | [Copilot Configuration Primitives](copilot-primitives/) | Working instruction, prompt, skill, or agent plus delivery and acceptance evidence |
| Design one agent that behaves as intended in every runtime | [Custom Agents](custom-agents/) | One agent file with explicit tools and limits, plus a check in each runtime that it loaded and behaved as intended |

## Agents at Your Keyboard

**Question:** What can a developer run, steer, and verify locally in VS Code or the CLI?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Work where shell and runtime state are decisive | [Copilot CLI](copilot-cli/) | A terminal-native result with observable command evidence |
| Track VS Code changes that alter a durable workflow decision | [What's New in VS Code](vscode-latest/) | A changed workflow with its first verification step |
| Run plan, implement, test, review, and integrate locally, and know when the run is done | [Local Agentic SDLC](local-agentic-sdlc/) | A plan artifact, isolated specialist work, an integration record, and stop conditions with a credit cap |

Release-specific VS Code changes are routed through [rolling release briefs](../.github/content-routing/release-briefs/) to their durable owners. The current [VS Code Latest](vscode-latest/) talk remains active until its approved retirement checklist is complete.

## Agents on GitHub

**Question:** Which work fits GitHub's agents, and what evidence comes back for a person to decide?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Delegate an issue and verify the pull request before merge | [Copilot on GitHub](copilot-on-github/) | A cloud-agent draft pull request, code review findings and Code Quality results on every push, and a named merge decision |
| Automate a recurring repository chore | [GitHub Agentic Workflows](agentic-lifecycle/) | Compiled workflow candidates with explicit handoffs, safe outputs, and approval gates |

## Trust and Govern

**Question:** How ready is the repository, what may an agent do, and who may approve or stop the work?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Manufacture trustworthy delivery evidence | [Agentic SDLC](agentic-sdlc/) | Repository and CI signals that gate or return agent work |
| Allow or deny agent actions | [Copilot Hooks](copilot-hooks/) | An execution boundary with an auditable allow, deny, or escalation result |
| Keep execution and merge authority explicit | [GitHub Copilot Governance](copilot-governance/) | Visible runtime decisions, reviewable evidence, and an authorized merge |
| Standardize governance across teams | [Enterprise Patterns](enterprise-patterns/) | An operating model with owners, policy, rollout, and success measures |

## Extend and Embed

**Question:** When is it time to give Copilot a new capability, interface, protocol boundary, or domain context?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Package and distribute team capabilities | [Plugins and APM](copilot-plugins/) | A versioned manifest and lockfile change |
| Act on live Azure state | [Azure MCP and Skills](copilot-azure-mcp/) | A least-privilege action with before-and-after evidence |
| Own the agent runtime in an application | [Copilot SDK](copilot-sdk/) | An application-owned trigger, tools, identity, and runtime contract |
| Connect an external client | [ACP](copilot-acp/) | A client session with explicit permission boundaries |
| Return interactive UI through MCP | [MCP Apps](mcp-apps/) | A component response with a validated callback loop |
| Add governed organizational knowledge | [Copilot with Foundry](copilot-with-foundry/) | A sourced organizational answer beyond repository context |

## Learning Paths

### Individual Developer

[Which Copilot Where?](surfaces/) → [Copilot Configuration Primitives](copilot-primitives/) → [Custom Agents](custom-agents/) → choose [Copilot CLI](copilot-cli/) or [What's New in VS Code](vscode-latest/) → [Local Agentic SDLC](local-agentic-sdlc/)

### Team Delegation

[Which Copilot Where?](surfaces/) → [Copilot Configuration Primitives](copilot-primitives/) → [Copilot on GitHub](copilot-on-github/) → [Local Agentic SDLC](local-agentic-sdlc/) → [GitHub Agentic Workflows](agentic-lifecycle/)

### Repository Automation

[Which Copilot Where?](surfaces/) → [GitHub Agentic Workflows](agentic-lifecycle/) → [Copilot on GitHub](copilot-on-github/) → [Copilot Hooks](copilot-hooks/) → [Agentic SDLC](agentic-sdlc/)

### Platform and Governance

[Enterprise Patterns](enterprise-patterns/) → [Plugins and APM](copilot-plugins/) → [GitHub Copilot Governance](copilot-governance/) → [Copilot Hooks](copilot-hooks/) → [Copilot on GitHub](copilot-on-github/) → [Agentic SDLC](agentic-sdlc/)

### Product and Tool Builders

[Which Copilot Where?](surfaces/) → [Copilot SDK](copilot-sdk/) → choose [ACP](copilot-acp/), [MCP Apps](mcp-apps/), or [Azure MCP and Skills](copilot-azure-mcp/) → [Copilot with Foundry](copilot-with-foundry/)

### Leaders

[The Agentic Operating Model](exec-strategy/) → [GitHub Copilot Governance](copilot-governance/) → [Enterprise Patterns](enterprise-patterns/)

## Selection Rule

Choose a separate talk only when it teaches a distinct decision, produces distinct evidence, names a distinct boundary, and supports at least 25 focused minutes. Otherwise use a clinic, case study, release brief, reference, or pathway.
