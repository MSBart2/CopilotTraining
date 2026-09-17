---
status: active
updated: 2026-09-16
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

## Choose and Configure

**Question:** What context does Copilot need, where should the work run, and how should the experience be configured?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Choose the right Copilot surface | [Which Copilot Where?](surfaces/) | A routed task with named context, artifact, and reviewer |
| Encode and verify shared Copilot behavior | [Copilot Configuration Primitives](copilot-primitives/) | Working instruction, prompt, skill, or agent plus delivery and acceptance evidence |
| Work where shell and runtime state are decisive | [Copilot CLI](copilot-cli/) | A terminal-native result with observable command evidence |

Release-specific VS Code changes are routed through [rolling release briefs](../.github/content-routing/release-briefs/) to their durable owners. The current [VS Code Latest](vscode-latest/) talk remains active until its approved retirement checklist is complete.

## Delegate and Coordinate

**Question:** What work can be delegated, how should it be decomposed, and how much autonomy fits?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Turn solved work into reusable capability | [Agent Dev Loop](agent-dev-loop/) | Repository configuration and a validated plan |
| Delegate one bounded repository task | [From Issue to Pull Request](copilot-web/) | A draft pull request with an evidence bundle |
| Split, steer, and integrate multi-agent work | [Multi-Agent Coordination](multi-agent-coordination/) | A coordination contract, isolated evidence, and a named integration owner |
| Build loops that stop safely | [Loop Engineering](loopy-agents/) | Progress state, verification signal, limit, and escalation path |
| Automate recurring judgments across a lifecycle | [Agentic Lifecycle Orchestration](agentic-lifecycle/) | Compiled workflow candidates with explicit handoffs, safe outputs, and approval gates |

## Verify and Govern

**Question:** What evidence permits work to proceed, who may approve it, and where must execution stop?

| Decision | Talk | Evidence you inspect or produce |
|---|---|---|
| Govern AI findings and deterministic merge evidence | [PR Trust Stack](pr-trust-stack/) | Dispositioned findings, evaluated checks, and a named merge authority |
| Allow or deny agent actions | [Copilot Hooks](copilot-hooks/) | An execution boundary with an auditable allow, deny, or escalation result |
| Manufacture trustworthy delivery evidence | [Agentic SDLC](agentic-sdlc/) | Repository and CI signals that gate or return agent work |
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
