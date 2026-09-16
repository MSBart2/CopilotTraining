---
status: active
portfolioState: deployed
updated: 2026-09-16
section: "Delegate and Coordinate"
audience: [developer, team-lead, architect, platform-engineer]
level: advanced
duration: 55
format: core-talk
decision: "When should work be split across agents, and how should isolated workstreams be steered and integrated?"
prerequisites: [agent-dev-loop]
related: [agent-dev-loop, agentic-lifecycle, agentic-sdlc, context-engineering]
references:
  - url: https://code.visualstudio.com/docs/copilot/agents/subagents
    label: "Subagents in VS Code"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/docs/copilot/customization/custom-agents
    label: "Custom agents in VS Code"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/docs/copilot/agents/background-agents
    label: "Background agents in VS Code"
    verified: 2026-09-15
  - url: https://docs.github.com/en/copilot/concepts/agents/github-copilot-app
    label: "About the GitHub Copilot app"
    verified: 2026-09-15
  - url: https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started
    label: "Getting started with the GitHub Copilot app"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/updates/v1_109#_agent-orchestration
    label: "VS Code v1.109 agent orchestration"
    verified: 2026-09-15
  - url: https://git-scm.com/docs/git-worktree
    label: "Git worktree reference"
    verified: 2026-09-15
---

# Multi-Agent Coordination: Split, Steer, Integrate

> **The Question This Talk Answers:**
> *"When should work be split across agents, and how should isolated workstreams be steered and integrated?"*

**Duration:** 55 minutes | **Target Audience:** Developers / Team Leads / Architects / Platform Engineers

---

## Content Fitness

| Criterion | Assessment | Notes |
|---|---|---|
| **Relevant** | Green - High | Parallel agent surfaces make concurrent work accessible; teams need a decision model that protects repository coherence. |
| **Compelling** | Green - High | The useful unit is a coordinated workstream with an integration owner, not an agent count. |
| **Actionable** | Green - High | Three portable artifacts turn a candidate task into bounded workstreams and a reviewable integrated result. |

**Overall Status:** Green - Ready to use

---

## The Opportunity

### What's Now Possible

- **Give focused investigations their own context**
  Subagents can explore independent questions and return concise findings without filling the coordinating session with every intermediate step.[^1]

- **Run independent implementation streams in isolated workspaces**
  Background agents, worktrees, and sandboxes allow concurrent work without sharing one mutable working directory.[^3][^7]

- **Match specialist roles to bounded authority**
  Custom agents can carry focused instructions and tool access, making role boundaries concrete.[^2]

- **Steer several sessions from one operating surface**
  The GitHub Copilot app makes session state and resulting work visible while different tasks proceed in parallel.[^4][^5]

### The Emerging Practice

Multi-agent work becomes useful when decomposition creates cleaner decisions or genuine concurrency. A repository migration may separate into inventory, implementation, tests, and documentation. A security-sensitive change may keep implementation sequential while inviting independent threat and test reviews. A tightly coupled refactor may gain nothing from parallel writers.

The coordination challenge begins after decomposition. Every workstream needs decisive context, a writable scope, an expected artifact, evidence, and an authority boundary. The combined result also needs one owner. Without that contract, isolated agents can each produce locally plausible work that does not form a coherent change.

The GitHub Copilot app is a concrete place to operate this model: sessions can be dispatched, observed, steered, and reviewed from one surface.[^4] The thesis is broader than the app. The same split-steer-integrate loop applies to VS Code subagents, background sessions, custom agents, and other hosts that preserve isolation and return reviewable evidence.[^1][^2][^3]

---

## How It Works: The Split-Steer-Integrate Loop

### What It Does

The loop converts one candidate task into a small coordination graph. Task coupling and integration risk select the shape; a coordination contract bounds each workstream; isolation protects context and files; a named integrator accepts the combined result.

### Key Capabilities

- **Shape selection**: Choose a single stream, sequential pipeline, parallel workstreams, or independent deliberation from coupling and integration risk.
- **Bounded delegation**: Name each workstream's inputs, outputs, allowed scope, evidence, and approval point.
- **Layered isolation**: Separate conversational context, tools, files, branches, or runtime environments according to risk.
- **Observable steering**: Track state, blockers, changed assumptions, and intervention points without directing every step.
- **Deliberate integration**: Compare evidence, resolve conflicts, merge in dependency order, and assign final acceptance authority.

### Architecture Overview

```text
Candidate task
    |
    v
Coupling + integration-risk assessment
    |
    +--> single stream / sequential pipeline
    |
    +--> parallel specialists / independent deliberation
                  |
                  v
       Coordination contract
       - objective and non-goals
       - inputs and writable scope
       - expected artifact and evidence
       - autonomy and escalation boundary
                  |
                  v
       Isolated agent workstreams
                  |
                  v
       Named integrator
       - compare evidence
       - resolve conflicts
       - validate combined behavior
       - accept, redirect, or reject
```

Subagents provide context isolation and can execute independent work in parallel.[^1] Custom-agent instructions and tools can reinforce specialist boundaries.[^2] Worktrees add filesystem and branch isolation for concurrent implementation.[^3][^7] These mechanisms reduce interference; they do not make integration automatic.

**Official Documentation:**
- [Subagents in VS Code](https://code.visualstudio.com/docs/copilot/agents/subagents) - isolated delegation and parallel execution
- [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents) - roles, tools, invocation, and handoffs
- [About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app) - multi-session operating surface and controls

---

## Key Artifacts

- **`coordination-shape.md`** - selects a topology from task coupling and integration risk.
- **`coordination-contract.yml`** - defines workstream scope, evidence, authority, and integration ownership.
- **`integration-record.md`** - records returned evidence, conflicts, merge order, and final acceptance.

---

## Mental Model Shift

> **The Core Insight:** Parallel agents create value only when the work can separate and the result can reunify under explicit ownership.

### Move Toward

- **Split by dependency**: Decompose around stable interfaces and independently testable outputs, then preserve sequencing where one result controls another.
- **Contract before dispatch**: Give every workstream an objective, decisive context, writable scope, evidence requirement, and escalation rule.
- **Observe at boundaries**: Review plans, state transitions, blockers, and artifacts where human judgment changes the path.
- **Name the integrator**: Assign one owner to resolve overlap and accept the behavior of the combined change.

### Move Away From

- **Agent count as a goal**: Measure independent progress and accepted outcomes; add workstreams only when decomposition earns them.
- **Shared mutable scope**: Give concurrent writers separate workspaces and explicit ownership of files or contracts.
- **Raw result collection**: Require concise evidence tied to acceptance criteria so integration remains a decision, not a transcript review.

### Move Against

- **Parallelizing unresolved dependencies**: Workstreams built on unstable upstream decisions create rework and conflicting assumptions.
- **Delegating acceptance authority implicitly**: An agent can propose and validate; a named owner or governed workflow accepts consequential changes.
- **Treating isolation as integration**: Separate contexts and worktrees prevent some collisions, while API, behavior, and merge conflicts still need resolution.

> **What This Looks Like:** A lead splits an authentication change into a sequential contract decision followed by parallel implementation, threat review, and migration-test workstreams. Each stream returns evidence against the same contract. The lead integrates in dependency order and accepts the result only after the combined test suite and security checks pass.

---

## When to Use This Pattern

### Decision Tree

```text
Q: Can the task produce independently reviewable outputs?
|-- No -> Keep one agent stream with explicit checkpoints.
|
`-- Yes -> Do workstreams depend on unresolved decisions from one another?
    |-- Yes -> Use a sequential pipeline; pass validated artifacts forward.
    |
    `-- No -> Can each stream own separate context and writable scope?
        |-- No -> Use parallel read-only specialists, then one implementation stream.
        |
        `-- Yes -> Use parallel isolated workstreams.
            |
            `-- Is disagreement itself useful evidence?
                |-- Yes -> Add independent deliberation before commitment.
                `-- No  -> Integrate once all required evidence arrives.
```

### Use This Pattern When

- The task has at least two outputs that can be reviewed independently.
- Stable interfaces or explicit contracts separate writable scopes.
- Parallel discovery can inform one later decision without duplicating implementation.
- The expected elapsed-time benefit exceeds dispatch, review, and merge overhead.
- One person or governed workflow can own integration and acceptance.

### Don't Use This Pattern When

- One small change has one obvious validation path; keep a single stream.
- Every workstream depends on the same unresolved architecture choice; resolve that choice first.
- Concurrent writers need the same files or mutable runtime state; use a sequential pipeline or redefine boundaries.
- No owner has time or authority to integrate the outputs; reduce work in progress.
- Acceptance evidence is subjective or unavailable; define the test before dispatch.

### Coordination Shapes

| Shape | Coupling | Integration risk | Best fit | Human checkpoint |
|---|---:|---:|---|---|
| **Single stream** | High | Low to medium | Small, coherent changes | Review final artifact |
| **Sequential pipeline** | High | Medium to high | Research -> decision -> implementation | Accept each handoff |
| **Parallel specialists** | Low | Medium | Independent reviews or disjoint deliverables | Reconcile returned evidence |
| **Independent deliberation** | Shared question | High consequence | Architecture, security, or irreversible choices | Choose and record the decision |

---

<!-- 🎬 MAJOR SECTION: Choose a Coordination Shape -->
## Choose a Coordination Shape

The first decision is whether splitting creates a useful boundary. Two variables carry most of the judgment:

1. **Task coupling** - how much one workstream needs another workstream's changing output.
2. **Integration risk** - how difficult it will be to prove that the combined result is coherent.

### `coordination-shape.md`

```markdown
# Coordination Shape

## Candidate task
Replace the service's session-token format and migrate existing clients.

## Coupling check
- Token contract controls server, client, tests, and migration behavior.
- Contract decision must complete before concurrent implementation begins.
- Server, client, threat review, and migration tests then have separate outputs.

## Integration-risk check
- Security-sensitive behavior: high consequence.
- Shared API contract: medium merge risk after the contract is fixed.
- Rollback path exists through dual-read compatibility.

## Selected shape
1. Sequential: decide and test the token contract.
2. Parallel: server implementation, client implementation,
   threat review, and migration tests.
3. Sequential: integrate server -> client -> migration evidence.

## Split test
Each parallel stream has a stable input, separate writable scope,
reviewable output, and named acceptance evidence.
```

The artifact makes a hybrid shape normal. Multi-agent coordination rarely requires every phase to run in parallel. A short sequential decision can create the stable contract that makes later concurrency productive.

### When Deliberation Earns a Workstream

Independent perspectives add value when a decision is consequential, evidence is incomplete, and different assumptions can expose failure modes. Architecture selection and threat modeling often fit. Routine implementation against an accepted contract usually benefits more from specialist execution than repeated debate.

The deliverable from deliberation is a decision record with evidence and rejected alternatives. Agreement alone is not evidence.

---

<!-- 🎬 MAJOR SECTION: Define Roles and Handoffs -->
## Define Roles, Handoffs, and Authority

Each workstream receives a compact contract. Role labels describe expertise; the contract defines what the agent can change, what it must return, when it must stop, and who can accept the result.

### `coordination-contract.yml`

```yaml
version: 1
objective: Migrate session tokens while preserving active client sessions
nonGoals:
  - Replace the identity provider
  - Change authorization policy

sharedContext:
  contract: docs/decisions/session-token-v2.md
  baselineCommand: npm test
  integrationOwner: platform-lead

workstreams:
  - id: server
    role: implementer
    dependsOn: [contract-approved]
    writableScope: [src/auth/**, tests/auth/**]
    output: Server support for v1 read and v2 read/write
    evidence: npm test -- auth
    autonomy: plan
    escalateWhen: Public API or schema must change

  - id: client
    role: implementer
    dependsOn: [contract-approved]
    writableScope: [src/client/**, tests/client/**]
    output: Client adoption of token v2
    evidence: npm test -- client
    autonomy: plan
    escalateWhen: Backward compatibility cannot be preserved

  - id: threat-review
    role: reviewer
    dependsOn: [contract-approved]
    writableScope: []
    output: Ranked findings mapped to the contract
    evidence: Evidence or reproduction step for every blocker
    autonomy: interactive
    escalateWhen: A finding invalidates the accepted contract

integration:
  order: [server, client, threat-review]
  acceptance:
    - All workstream evidence passes
    - Combined test suite passes
    - Integration owner resolves every blocker
  authority:
    agentsMay: [propose, implement-in-scope, test, report]
    integrationOwnerMay: [redirect, reject, accept, merge]
```

The same contract can brief VS Code subagents, background agents, or sessions in the GitHub Copilot app. Custom agents can reinforce the roles with focused instructions and tools.[^2] The contract remains the source of truth when the operating surface changes.

### Map Autonomy to Authority

The GitHub Copilot app exposes Interactive, Plan, and Autopilot modes as concrete session controls.[^4] They map naturally to the contract:

| Mode | Useful when | Required human checkpoint |
|---|---|---|
| **Interactive** | Scope or approach can change during exploration | Approve consequential decisions as they appear |
| **Plan** | Scope is stable and implementation deserves a design check | Approve the plan before execution |
| **Autopilot** | Task is routine, bounded, and validated mechanically | Review the completed artifact and evidence |

Mode does not grant organizational authority. Repository policy, branch protection, and named reviewers still control what can be accepted or merged.

---

<!-- 🎬 MAJOR SECTION: Isolate and Steer Workstreams -->
## Isolate and Steer Workstreams

Isolation has several layers. Applying the smallest sufficient layer keeps coordination understandable.

| Layer | Protects | Mechanism | Remaining risk |
|---|---|---|---|
| **Context** | Focus and independent reasoning | Subagent context | Shared files can still collide |
| **Tools** | Role and action boundary | Custom-agent tool access | Allowed tools can still affect shared state |
| **Files** | Concurrent writes | Separate writable scopes | Shared contracts can drift |
| **Branch/worktree** | Working directory and commit history | Git worktree or sandbox | Merge and behavior conflicts remain |
| **Runtime** | Processes, credentials, and dependencies | Isolated sandbox | Integration environment can differ |

VS Code subagents provide isolated context and return results to the caller.[^1] Background agents and Git worktrees add execution isolation for implementation work.[^3][^7] A worktree gives each stream an independent working tree and branch while sharing repository history; it does not remove the need to merge and validate the result.

### Operate the Fleet

The GitHub Copilot app turns this model into a visible operating loop. My Work and session views can keep multiple tasks, outputs, and intervention points in view.[^4][^5] The useful dashboard questions are product-independent:

- Which workstream owns this output?
- What state is it in: planned, running, blocked, ready, or rejected?
- Which assumption changed?
- What evidence has arrived?
- Which stream needs human input now?
- What is the next integration dependency?

Steering occurs when the contract changes or an escalation condition fires. Status checking without a decision is observation; rewriting every agent step is direct execution. The coordination layer preserves attention for boundary decisions.

---

<!-- 🎬 MAJOR SECTION: Integrate Results Deliberately -->
## Integrate Results Deliberately

Integration is a first-class workstream. The integrator compares every return against the shared contract, checks incompatible assumptions, chooses merge order, and validates combined behavior. This role owns coherence even when an agent helps summarize diffs or run tests.

### `integration-record.md`

```markdown
# Integration Record: Session Token v2

## Accepted contract
- Decision: docs/decisions/session-token-v2.md
- Integrator: platform-lead
- Required evidence: auth tests, client tests, combined suite, threat review

## Workstream returns
| Stream | Artifact | Evidence | Status |
|---|---|---|---|
| server | PR #412 | `npm test -- auth` passes | ready |
| client | PR #415 | `npm test -- client` passes | ready |
| threat-review | findings.md | 0 blockers, 2 accepted notes | ready |

## Conflict resolution
- Client assumed a seven-day compatibility window; contract says fourteen.
- Resolution: update client constant and rerun client tests before merge.

## Integration order
1. Merge server dual-read support.
2. Merge corrected client writer.
3. Run the combined suite and migration smoke test.

## Acceptance
- Combined suite: pass
- Migration smoke test: pass
- Rollback path: v1 read remains enabled
- Decision: accepted by platform-lead
```

### Integration Gates

1. **Completeness** - every required artifact and evidence item arrived.
2. **Consistency** - workstreams used the same accepted contracts and assumptions.
3. **Compatibility** - interfaces, migrations, and behavior compose in the planned order.
4. **Combined verification** - tests run against the integrated state, not only isolated branches.
5. **Authority** - the named owner records acceptance, redirection, or rejection.

Failed integration is useful evidence about the split. Repeated overlap points to an unstable boundary; unresolved assumptions point to missing context; excessive merge work points to high coupling. The next coordination contract can then reduce parallelism or move the shared decision earlier.

---

## Real-World Use Cases

### Cross-Cutting Feature Delivery

**Scenario:** An accepted API contract enables separate backend, frontend, test, and documentation changes.

**Coordination:** Approve the contract sequentially, dispatch disjoint workstreams, then integrate backend before consumers. Each stream returns a PR plus its scoped test evidence.

**Outcome:** Four independently reviewable artifacts and one combined acceptance decision. Progress is measured by passing evidence and integration readiness, not agent activity.

### Independent Pull-Request Analysis

**Scenario:** A security-sensitive pull request needs security, performance, and test perspectives.

**Coordination:** Run three read-only subagents against the same commit and require findings with evidence, severity, and affected location. One reviewer deduplicates findings and decides which block merge.

**Outcome:** Independent analysis remains separate until synthesis, making agreement and disagreement visible without creating concurrent code changes.

### Repository Standardization

**Scenario:** Several repositories need the same validated policy and CI update.

**Coordination:** Prove the change in one representative repository, freeze the contract, then dispatch one isolated session per repository through the GitHub Copilot app. A platform owner reviews drift and accepts each result.[^4]

**Outcome:** Every repository produces the same evidence bundle, while repository-specific exceptions stay explicit.

---

## What You Can Do Today

### 15 Minutes - Prove the Split Decision

- **Try:** Apply `coordination-shape.md` to one backlog item and identify coupling, integration risk, stable inputs, and independently reviewable outputs.
- **Expected signal:** The task resolves to one named topology with a reason each proposed workstream can proceed independently.
- **Validate:** Ask a reviewer to identify any output that depends on an unresolved decision or overlaps another writable scope.

### 1 Hour - Integrate It into Real Work

- **Build:** Fill in `coordination-contract.yml` for two read-only specialist workstreams and run them as VS Code subagents.[^1]
- **Expected signal:** Each subagent returns the requested artifact and evidence without requiring hidden context from the other stream.
- **Validate:** Reconcile both returns into one decision and confirm every accepted claim maps to evidence.

### 2-4 Hours - Run a Bounded Pilot

- **Pilot:** Dispatch two low-risk implementation tasks into separate worktrees or Copilot app sessions, then complete one `integration-record.md`.[^3][^4][^7]
- **Success measure:** Both streams stay within scope, produce passing local evidence, and integrate within the planned review window.
- **Boundary:** Pause parallel dispatch when shared-file edits, changed contracts, or integration effort exceed the expected concurrency benefit; return to a sequential stream and revise the contract.

### Apply It to Your Work

- **Candidate task:** Select a real change with at least two potentially independent outputs.
- **Decisive context:** Name the accepted contracts, repository paths, runtime state, and policy constraints each stream needs.
- **Delegation and authority:** Record what agents may propose or edit, when they must escalate, and who can accept and merge the integrated result.
- **Evidence:** Require scoped tests or findings from every stream plus a combined validation run owned by the integrator.

---

## Related Patterns

- **[Agent Development Loop](../agent-dev-loop/)** - keeps one delegated change observable from context through validation.
- **[Agentic Lifecycle Orchestration](../agentic-lifecycle/)** - coordinates recurring repository judgments through evidence-gated handoffs.
- **[The Agent Dev Loop](../agent-dev-loop/)** - turns one solved task into reusable repository capability before work is split.
- **[Agentic SDLC](../agentic-sdlc/)** - extends coordination into repository policy, CI, review, and delivery systems.
- **[Copilot Context Engineering](../context-engineering/)** - places and verifies the context each workstream needs.

---

## References

### Official Documentation

[^1]: **[Subagents in VS Code](https://code.visualstudio.com/docs/copilot/agents/subagents)** - isolated context, delegation, parallel execution, and result return.
[^2]: **[Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)** - role instructions, tools, invocation controls, and handoffs.
[^3]: **[Background agents in VS Code](https://code.visualstudio.com/docs/copilot/agents/background-agents)** - asynchronous agent execution and isolated workspaces.
[^4]: **[About the GitHub Copilot app](https://docs.github.com/en/copilot/concepts/agents/github-copilot-app)** - multi-session work, operating controls, and review surfaces.
[^5]: **[Getting started with the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started)** - current setup and first-session workflow.
[^6]: **[VS Code v1.109 agent orchestration](https://code.visualstudio.com/updates/v1_109#_agent-orchestration)** - orchestration and session-management release baseline.
[^7]: **[Git worktree reference](https://git-scm.com/docs/git-worktree)** - independent working trees that share one repository.

### Repository Evidence

[^8]: **[WP11 multi-agent coordination coverage](../../.github/content-routing/coverage/wp11-multi-agent-coordination.yml)** - approved preservation, reframing, and integration decisions for this replacement talk.
