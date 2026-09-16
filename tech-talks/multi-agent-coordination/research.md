---
status: active
updated: 2026-09-15
---

# Research: Multi-Agent Coordination

> Evidence baseline for a replacement talk derived from `agent-teams`, `copilot-app`, and the approved WP11 coverage decision.

## Research Question

When does a software task benefit from multiple isolated agent workstreams, and what coordination contract lets a human steer and integrate those workstreams safely?

## Source Baseline

First-party product documentation is the factual authority for product behavior. The two source talks provide framing and examples; the approved coverage file decides what survives into this replacement.

| Source | Role | Reviewed |
|---|---|---|
| [Subagents in VS Code](https://code.visualstudio.com/docs/copilot/agents/subagents) | Isolated context, delegation, parallel execution, and result return | 2026-09-15 |
| [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents) | Agent roles, tool boundaries, invocation controls, and handoffs | 2026-09-15 |
| [Background agents in VS Code](https://code.visualstudio.com/docs/copilot/agents/background-agents) | Asynchronous execution and isolated work | 2026-09-15 |
| [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) | Multi-session operating surface, session controls, and work visibility | 2026-09-15 |
| [Getting started with the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started) | Current setup and session workflow | 2026-09-15 |
| [VS Code v1.109 agent orchestration](https://code.visualstudio.com/updates/v1_109#_agent-orchestration) | Agent orchestration and session-management release baseline | 2026-09-15 |
| [Git worktree reference](https://git-scm.com/docs/git-worktree) | Independent working trees that share repository history | 2026-09-15 |
| [`wp11-multi-agent-coordination.yml`](../../.github/content-routing/coverage/wp11-multi-agent-coordination.yml) | Approved preservation, reframing, and target-location decisions | 2026-09-15 |

## Evidence Map

| Claim or mechanism | First-party evidence | Confidence | Boundary |
|---|---|---|---|
| A subagent runs with its own context and returns a result to the calling agent. | VS Code subagents documentation | Verified | Isolation protects conversational context; it does not by itself prevent file collisions. |
| Independent subagent tasks can run in parallel. | VS Code subagents documentation and v1.109 release notes | Verified | Parallelism only helps when inputs and writable outputs do not require unresolved ordering. |
| Custom agents can define role-specific instructions and tool access. | VS Code custom agents documentation | Verified | A role name is descriptive; tool access and review gates provide enforceable boundaries. |
| Background implementation can use isolated workspaces or worktrees. | VS Code background agents documentation and Git worktree reference | Verified | Separate worktrees prevent shared working-directory writes; later merges can still conflict semantically or textually. |
| The GitHub Copilot app provides an operating surface for several agent sessions and their resulting work. | GitHub Copilot app concepts and getting-started documentation | Verified | The app is one concrete surface. The coordination model also applies to VS Code and other agent hosts. |
| Interactive, Plan, and Autopilot modes express different operator checkpoints. | GitHub Copilot app concepts documentation | Verified | Mode choice bounds execution flow; repository policy and human approval still determine authority. |
| Coupling and integration risk determine whether work fits sequential, parallel, specialist, or deliberative coordination. | Derived from the approved WP11 composition decision and verified mechanisms above | Decision model | This is practitioner guidance, not a product guarantee. Validate it against the repository's dependency graph and acceptance tests. |
| One named integrator compares evidence, resolves conflicts, and accepts the combined result. | Approved WP11 integration boundary | Decision model | The integrator can be assisted by an agent, while acceptance authority remains explicitly assigned to a human or governed workflow. |

## Approved Coverage Trace

| Coverage ID | Disposition | README destination | Implementation |
|---|---|---|---|
| `teams-composition-decision` | Preserved | Choose a coordination shape | Coupling x integration-risk matrix selects the topology. |
| `teams-subagent-boundary` | Preserved | Match isolation to risk | Context, filesystem, branch, and tool isolation are treated separately. |
| `teams-squad-artifact` | Reframed | Define roles and handoffs | A vendor-neutral `coordination-contract.yml` replaces the team-product artifact. |
| `teams-deliberation` | Preserved | Choose a coordination shape | Deliberation is reserved for consequential decisions where independent disagreement adds evidence. |
| `teams-pattern-catalog` | Reframed | Choose a coordination shape | Four topologies form one compact decision matrix. |
| `app-fleet-dashboard` | Preserved | Operate isolated workstreams | My Work and session views expose state, ownership, outputs, and intervention points. |
| `app-worktree-isolation` | Preserved | Match isolation to risk | Concurrent writers receive separate worktrees or sandboxes. |
| `app-autonomy-modes` | Preserved | Define roles and handoffs | Interactive, Plan, and Autopilot map to explicit checkpoints and approval authority. |
| `app-agent-ready-issue` | Preserved | Define roles and handoffs | Each workstream brief contains objective, scope, context, evidence, and authority. |
| `app-integration` | Preserved | Integrate results deliberately | A named integrator records evidence, conflicts, merge order, and acceptance. |

## Claims Deliberately Excluded

- Numeric productivity, quality, token-use, and time-savings claims from `agent-teams`; the source talk does not provide first-party evidence for them.
- Fixed size thresholds such as line counts, task duration, or number of files as universal split criteria.
- The proposed `agent-workflow.yml` schema from `copilot-app`; it is not used as a documented product contract.
- Claims that worktrees eliminate merge conflicts. They isolate concurrent working directories while integration conflicts remain possible.
- The broad Squad and AgentCouncil product tour. The replacement preserves composition and deliberation judgment without making third-party frameworks the thesis.
- Claims that every task benefits from parallelism. Coordination overhead and shared dependencies can make a single stream or sequential pipeline the stronger choice.

## Artifact Plan

1. `coordination-shape.md` - a coupling and integration-risk matrix that chooses one coordination topology.
2. `coordination-contract.yml` - a portable contract for workstream inputs, outputs, boundaries, authority, and integration order.
3. `integration-record.md` - a final evidence and conflict-resolution record owned by the named integrator.

The README embeds all three artifacts so the talk remains usable without a separate demo repository.
