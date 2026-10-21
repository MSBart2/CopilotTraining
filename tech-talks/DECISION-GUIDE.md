---
status: active
updated: 2026-10-21
---

# Tech Talks Decision Guide

Choose a talk by the decision you need to make. Use a pathway when you need a sequence.

## Start Here: First Useful Workflow

Use this path when you are new to Copilot or introducing it to a team. Each step ends with evidence that makes the next step worthwhile.

1. **Choose the surface** — [Which Copilot Where?](surfaces/) produces a routed task with named context and reviewer.
2. **Configure shared behavior** — [Copilot Configuration Primitives](copilot-primitives/) builds and verifies instructions, prompts, skills, and agents.
3. **Make success reusable** — [Agent Dev Loop](agent-dev-loop/) turns one solved task into a validated team capability.
4. **Delegate bounded work** — [From Issue to Pull Request](copilot-web/) produces a draft pull request with acceptance evidence.
5. **Verify before merge** — [PR Trust Stack](pr-trust-stack/) records accepted and rejected findings, deterministic checks, and the final human decision.

Stop at any step when its evidence is missing. Repair that boundary before adding more autonomy.

Sections follow where the agent runs and who starts it. Every talk applies the same four judgment lenses — context, delegation, verification, and authority — inside its own scope.

## Foundations

**Question:** Which surface fits the work, and what shared context should every agent receive?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Choose the right Copilot surface | [Which Copilot Where?](surfaces/) | A routed task with named context, artifact, and reviewer |
| Encode and verify shared Copilot behavior | [Copilot Configuration Primitives](copilot-primitives/) | Working instruction, prompt, skill, or agent plus delivery and acceptance evidence |

## Agents at Your Keyboard

**Question:** What can a developer run, steer, and verify locally in VS Code or the CLI?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Work where shell and runtime state are decisive | [Copilot CLI](copilot-cli/) | A terminal-native result with observable command evidence |
| Track VS Code changes that alter a durable workflow decision | [What's New in VS Code](vscode-latest/) | A changed workflow with its first verification step |
| Turn solved work into reusable capability | [Agent Dev Loop](agent-dev-loop/) | Repository configuration and a validated plan |
| Split, steer, and integrate multi-agent work | [Multi-Agent Coordination](multi-agent-coordination/) | A coordination contract, isolated evidence, and a named integration owner |
| Build loops that stop safely | [Loop Engineering](loopy-agents/) | Progress state, verification signal, limit, and escalation path |

Release-specific VS Code changes are routed through [rolling release briefs](../.github/content-routing/release-briefs/) to their durable owners. The current [VS Code Latest](vscode-latest/) talk remains active until its approved retirement checklist is complete.

## Agents on GitHub

**Question:** What work should GitHub's agents take on, and what evidence comes back for a person to decide?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Delegate one bounded repository task | [From Issue to Pull Request](copilot-web/) | A draft pull request with an evidence bundle |
| Automate recurring judgments across a lifecycle | [Agentic Lifecycle Orchestration](agentic-lifecycle/) | Compiled workflow candidates with explicit handoffs, safe outputs, and approval gates |
| Govern AI findings and deterministic merge evidence | [PR Trust Stack](pr-trust-stack/) | Dispositioned findings, evaluated checks, and a named merge authority |

## Trust and Govern

**Question:** How ready is the repository, what may an agent do, and who may approve or stop the work?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Manufacture trustworthy delivery evidence | [Agentic SDLC](agentic-sdlc/) | Repository and CI signals that gate or return agent work |
| Allow or deny agent actions | [Copilot Hooks](copilot-hooks/) | An execution boundary with an auditable allow, deny, or escalation result |
| Keep execution and merge authority explicit | [GitHub Copilot Governance](copilot-governance/) | Visible runtime decisions, reviewable evidence, and an authorized merge |
| Standardize governance across teams | [Enterprise Patterns](enterprise-patterns/) | An operating model with owners, policy, rollout, and success measures |

## Extend and Embed

**Question:** When should Copilot gain a new capability, interface, protocol boundary, or domain context?

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

[Which Copilot Where?](surfaces/) → [Copilot Configuration Primitives](copilot-primitives/) → [Agent Dev Loop](agent-dev-loop/) → choose [Copilot CLI](copilot-cli/) or [From Issue to Pull Request](copilot-web/) → verify the resulting evidence

### Team Delegation

[Which Copilot Where?](surfaces/) → [Agent Dev Loop](agent-dev-loop/) → [From Issue to Pull Request](copilot-web/) → [Multi-Agent Coordination](multi-agent-coordination/) → [Loop Engineering](loopy-agents/)

### Repository Automation

[Which Copilot Where?](surfaces/) → [Agentic Lifecycle Orchestration](agentic-lifecycle/) → [PR Trust Stack](pr-trust-stack/) → [Copilot Hooks](copilot-hooks/) → [Agentic SDLC](agentic-sdlc/)

### Platform and Governance

[Enterprise Patterns](enterprise-patterns/) → [Plugins and APM](copilot-plugins/) → [Copilot Hooks](copilot-hooks/) → [PR Trust Stack](pr-trust-stack/) → [Agentic SDLC](agentic-sdlc/)

### Product and Tool Builders

[Which Copilot Where?](surfaces/) → [Copilot SDK](copilot-sdk/) → choose [ACP](copilot-acp/), [MCP Apps](mcp-apps/), or [Azure MCP and Skills](copilot-azure-mcp/) → [Copilot with Foundry](copilot-with-foundry/)

## Selection Rule

Choose a separate talk only when it teaches a distinct decision, produces distinct evidence, names a distinct boundary, and supports at least 25 focused minutes. Otherwise use a clinic, case study, release brief, reference, or pathway.
