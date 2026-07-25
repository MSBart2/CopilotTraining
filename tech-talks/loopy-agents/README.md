---
status: active
updated: 2026-07-02
section: "Agentic Systems"
references:
  - url: https://github.com/cobusgreyling/loop-engineering
    label: "loop-engineering: Practical patterns, starters & CLI tools for loop engineering with AI coding agents"
    verified: 2026-07-02
  - url: https://www.langchain.com/blog/the-art-of-loop-engineering
    label: "The Art of Loop Engineering — LangChain Blog"
    verified: 2026-07-02
  - url: https://github.com/gim-home/herald
    label: "herald: The agent management harness"
    verified: 2026-07-02
  - url: https://datasciencedojo.com/blog/agentic-loops-explained-from-react-to-loop-engineering-2026-guide/
    label: "Agentic Loops: From ReAct to Loop Engineering (2026 Guide)"
    verified: 2026-07-02
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
    label: "Creating automations with Copilot cloud agent — GitHub Docs"
    verified: 2026-07-02
  - url: https://github.blog/changelog/2026-06-02-schedule-and-automate-tasks-with-copilot-cloud-agent/
    label: "Schedule and automate tasks with Copilot cloud agent — GitHub Blog Changelog"
    verified: 2026-07-02
---

# Loop Engineering: Designing Agent Systems That Run Reliably

> **The Question This Talk Answers:**
> *"How do we design agent systems that run reliably without hand-holding — and stop reliably without breaking?"*

**Duration:** 45 minutes | **Target Audience:** Platform Engineers, Senior Developers, AI Infrastructure Leads

---

> **A loopy agent** is an agent that, once triggered, continues to reason → act → verify in a cycle until the goal is demonstrably met — then stops. Every pattern in this talk is in service of making that loop reliable, coordinated across multiple agents, and safe to run unattended.

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Every team running Copilot agents at scale hits the same wall: reliable starts, unreliable stops. Loop engineering addresses this directly, and the pattern is now industry-named and documented by practitioners at Anthropic, Google, LangChain, and O'Reilly. |
| **Compelling** | 🟢 High | The shift from prompt engineering to loop engineering is concrete and measurable. Boris Cherny (Claude Code lead at Anthropic) reports 8x code output with Claude writing >80% of merged production code via loop-managed autonomy. The "aha" is that the loop — not the prompt — is the unit of reliability. |
| **Actionable** | 🟢 High | Five primary artifacts map directly to implementation: annotated loop blueprint, task-envelope schema, topology config, audit CLI, and a full multi-agent pipeline example. Three NPX commands can scaffold a production-ready starter loop in minutes. |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Autonomous multi-step pipelines**
  A single trigger — a PR, a scheduled event, a dependency alert — can kick off a chain of specialized agents that plan, implement, review, test, and ship, all without human prompting between steps.

- **Verifiable goal completion**
  Loops can be designed to terminate against a concrete criterion: tests pass, security scan clean, PR merged. The agent doesn't stop when it thinks it's done — it stops when the goal is demonstrably achieved.[^4]

- **Structured agent-to-agent tasking**
  Orchestrator agents delegate subtasks to specialists using typed message envelopes — structured handoff objects that carry intent, constraints, escalation paths, and trace IDs — making multi-agent coordination auditable and debuggable.[^2]

- **Production-grade cost and safety controls**
  Circuit breakers, bounded token budgets, and goal-watchdog timers give teams hard guarantees on operational costs and loop lifespan, turning autonomous agents from experimental into deployable.[^6]

### The Emerging Practice

Loop engineering is the practice of designing the autonomous systems — the *loops* — that manage AI agents rather than managing the agents directly. The key insight, articulated by Boris Cherny (Claude Code lead at Anthropic) and Addy Osmani (Google), is that the developer's job shifts from writing better prompts to writing better loops that prompt and supervise agents on our behalf.[^3][^8]

The analogy to software engineering is precise: a loop is a program, and agents are its subroutines. The program controls trigger conditions, goal definitions, verification criteria, memory passing, escalation paths, and termination. The agent controls how it accomplishes any individual step.

This shift is already showing up in production numbers. Anthropic's internal engineering teams using this approach report Claude writing more than 80% of merged production code, with the loop handling what used to be developer attention.[^3] The pattern has since been formalized in open-source tooling (`cobusgreyling/loop-engineering`, `gim-home/herald`) and documented across O'Reilly Radar, LangChain's engineering blog, and Data Science Dojo's 2026 pattern catalog.[^1][^2][^4]

The window where manual agent prompting was acceptable is closing. As agents gain the ability to spawn sub-agents, hand off work across organizational boundaries, and operate across day-long time horizons, the humans-in-the-loop cannot be a bottleneck. Loop engineering is how teams remove that bottleneck intentionally rather than accidentally.

---

## How It Works: Loop Engineering

### What It Does

A loop wraps an AI agent with a structured execution harness: a trigger that starts the loop, a goal that defines success, a verification layer that checks whether that goal has been met, and a set of production controls that bound cost and behavior. The agent operates inside this harness, reasoning and acting freely within the constraints the loop defines.[^7]

### Key Capabilities

- **Trigger-based activation**: Loops start from events (webhooks, schedules, file changes, messages from other agents) rather than human prompts
- **Goal-anchored termination**: Loops end when a verifiable condition is true, not when the agent says it's finished
- **Structured agent handoff**: Inter-agent task passing uses typed message envelopes with provenance, constraints, and escalation metadata
- **Hierarchical delegation**: Orchestrators spawn and manage worker agents; critics evaluate their outputs; watchdogs monitor the full pipeline
- **Cost and safety bounding**: Circuit breakers, token budgets, and time limits prevent runaway execution

### Architecture Overview

The anatomy of a production-grade loop has four concentric layers. The **trigger layer** responds to external events and initializes loop state. The **execution layer** is where the agent reasons and acts — calling tools, generating code, making decisions. The **verification layer** checks outputs against the goal definition and decides whether to repeat, escalate, or terminate. The **control layer** monitors the entire loop and enforces hard limits regardless of what the inner layers are doing.[^7][^8]

In multi-agent configurations, each agent runs its own inner loop. An orchestrator loop coordinates them, passing typed task envelopes between agents and collecting results. The orchestrator's verification layer is responsible for composing partial results into a final, verifiable outcome.

### The Simplest Starting Point

These patterns apply at any level of formality. The minimum viable Copilot-native implementation pairs a **Copilot Automation** (the trigger) with a handful of agent files and a shared state store — no orchestration framework, no YAML config schemas, no external tooling.[^12]

The Automation is what makes the system loopy rather than one-shot. Without it, the orchestrator agent runs once and stops. With it, the agent fires again on tomorrow's schedule, or the next time a PR opens, without anyone having to ask.

```
.github/
  agents/
    loop-orchestrator.agent.md   ← reads state, delegates tasks, checks goal
    loop-reviewer.agent.md       ← specialized code review worker
    loop-tester.agent.md         ← specialized test-runner worker
  loop-state.json                ← shared state store
```

The orchestrator agent's instructions encode all five loop components directly — trigger condition, goal definition, delegation logic, verification step, and iteration cap. Workers read their task from the state file and write results back. The state store can be a JSON file in the repo, a GitHub Issue, a database row, or any writable surface all agents can reach.

```markdown
<!-- .github/agents/loop-orchestrator.agent.md -->
---
description: Loop orchestrator — delegates tasks and verifies goal completion
tools: [read_file, write_file, github]
---
1. Read `.github/loop-state.json`.
2. If `iteration_count >= max_iterations`, write an escalation note and stop.
3. Check all `goal.conditions` — if all are `true`, write a completion summary and stop.
4. For each task in `state.pending`, select the right worker agent and invoke it.
5. Update `state.results` and increment `iteration_count`.
6. Repeat from step 2.
```

```json
// .github/loop-state.json — shared state store
{
  "iteration_count": 0,
  "max_iterations": 5,
  "goal": {
    "conditions": [
      { "name": "review_approved", "met": false },
      { "name": "tests_passing",   "met": false }
    ]
  },
  "tasks": { "pending": ["code_review", "test_run"], "complete": [] },
  "results": {}
}
```

The YAML examples later in this talk show the same five components expressed as a declarative configuration for production-scale pipelines. The concepts are identical — the implementation surface is up to the team.

**Key References:**
- 📖 [Copilot cloud agent Automations — GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations) — Native trigger mechanism: schedule agents hourly, daily, or weekly, or fire on issue/PR events[^12]
- 📖 [loop-engineering: Practical patterns, starters & CLI tools](https://github.com/cobusgreyling/loop-engineering) — Reference implementation with 7 production patterns and `loop-init`, `loop-audit`, `loop-cost` CLIs
- 📖 [herald: The agent management harness](https://github.com/gim-home/herald) — Agent lifecycle and declarative coordination harness
- 📖 [Agentic Loops: From ReAct to Loop Engineering (2026 Guide)](https://datasciencedojo.com/blog/agentic-loops-explained-from-react-to-loop-engineering-2026-guide/) — Pattern taxonomy and production guidance

---

## 🖼️ Visual Assets

The loop engineering pattern has a well-defined architecture best understood as a concentric-rings model — each ring wrapping the one inside it:

```
┌───────────────────────────────────────────────────────┐
│  CONTROL LAYER  (circuit breaker · watchdog · budget) │
│  ┌─────────────────────────────────────────────────┐  │
│  │  VERIFICATION LAYER  (goal check · escalate)    │  │
│  │  ┌───────────────────────────────────────────┐  │  │
│  │  │  EXECUTION LAYER  (agent · ReAct cycle)   │  │  │
│  │  │  ┌─────────────────────────────────────┐  │  │  │
│  │  │  │  TRIGGER LAYER  (event · schedule)  │  │  │  │
│  │  │  └─────────────────────────────────────┘  │  │  │
│  │  └───────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
```

In multi-agent topologies, the outer ring becomes a directed graph: Orchestrator → Workers → Critics, with typed task-envelope edges connecting them. The control layer applies globally — wrapping the entire multi-agent graph, not just individual agents.

---

## 📦 Key Artifacts

### Primary Artifacts

*Shown inline with detailed explanation in the major sections below*

- **`loop-starter/`** — Minimal Copilot-native implementation: orchestrator + worker agent files and a shared `loop-state.json` state store — no framework required
- **`loop-anatomy.yml`** — Annotated YAML blueprint of the same five components at production scale: trigger, goal, execution, verification, and controls
- **`task-envelope.json`** — Canonical JSON schema for structured agent-to-agent task handoff with trace IDs, constraints, and escalation paths
- **`loop-topology.yml`** — Declarative orchestration config covering flat-pool, hierarchical, and pipeline topologies with shared controls
- **`loop-audit.sh`** — CLI script for auditing a loop configuration against the 10 most common production failure modes
- **`copilot-loop-pipeline.yml`** — Full worked example: multi-agent security advisory response pipeline from webhook trigger to verified PR

### Supporting Files

- **[loop-engineering (cobusgreyling)](https://github.com/cobusgreyling/loop-engineering)** — Starters and CLI tools (`npx @cobusgreyling/loop-init`, `loop-audit`, `loop-cost`) for bootstrapping new loops
- **[herald harness (gim-home)](https://github.com/gim-home/herald)** — Reference implementation for declarative agent lifecycle management

---

## 🎯 Mental Model Shift

> **The Core Insight:** Agents don't need better prompts — they need better loops. The loop is the unit of reliability, and the hardest engineering challenge is not starting it but stopping it correctly.

### Move Toward (Embrace These Patterns)

- ✅ **Goal-anchored termination**: Define success as a verifiable condition — tests pass, scan clean, file exists — before writing a single line of agent code → loops that end deterministically rather than hopefully
- ✅ **Typed task envelopes**: Pass structured handoff objects between agents with `task_id`, `intent`, `constraints`, and `escalate_to` fields → inter-agent coordination that is debuggable and auditable
- ✅ **Declarative topology**: Express multi-agent configurations as data (YAML, JSON) rather than imperative orchestration code → topologies that can be versioned, diffed, and swapped without rewriting pipelines
- ✅ **Bounded execution by default**: Attach token budgets, time limits, and iteration caps to every loop before it reaches production → cost predictability without sacrificing autonomy
- ✅ **Critic-in-the-loop**: Place a dedicated evaluator agent at the verification layer rather than having the acting agent self-assess → quality gates that catch what the acting agent is blind to

### Move Away From (Retire These Habits)

- 🔄 **Hand-prompting every step → trigger-driven activation**: As pipelines stabilize, replace manual kicks with event subscriptions → teams shift from operating agents to monitoring outcomes
- 🔄 **Single-agent thinking → multi-agent decomposition**: When a task requires more than ~3 distinct capabilities, try decomposing into specialized workers with a coordinating orchestrator → cleaner reasoning, easier debugging, parallelizable execution
- 🔄 **Self-assessed completion → verified completion**: Move from "agent says it's done" to "goal condition is demonstrably true" → eliminates the most common class of silent loop failures

### Move Against (Active Resistance)

- 🛑 **Loops without exit conditions**: A loop that doesn't define its stop criterion before starting will run until it hits a hard limit — and by then the cost and blast radius may already be unacceptable → define goal, circuit breaker, and timeout as the first three fields in any new loop
- 🛑 **Unstructured agent messaging**: Free-text or ad hoc messages between agents create coupling that is impossible to trace, version, or debug → typed envelopes with trace IDs are non-negotiable in production systems
- 🛑 **Skipping the critic layer**: Acting agents are systematically blind to their own confident mistakes; without a critic, subtle errors compound across iterations → the critic pattern catches what the acting agent cannot

> **What This Looks Like:** An event fires when a security advisory is published. An orchestrator loop reads the advisory, tasks a scanning agent to check the codebase, hands a typed task envelope to a fix-proposal agent if vulnerabilities are found, waits for a critic to validate the fix quality, then opens a PR. The loop verifies the PR passes CI before terminating. Total human time: 0 minutes. Total loop time: 18 minutes.

---

## When to Use This Pattern

### Decision Tree

```
Q: Does our task require more than one distinct capability, or run unattended?
│
├─ Yes — multi-capability OR unattended
│  ├─ Does the task have a verifiable completion criterion?
│  │  ├─ Yes → Use loop engineering: define trigger + goal + controls first
│  │  └─ No  → Define the goal before starting; a loop without a verifiable
│  │           exit is just a slow runaway process
│  │
│  └─ Is a human required at every decision point?
│     └─ Use conversational agent mode — loops are for unattended operation
│
└─ No — single-capability, single-shot
   ├─ High-stakes decision requiring human judgment?
   │  └─ Keep human in the loop; don't automate the decision
   └─ Repeatable, low-risk, bounded scope?
      └─ Simple single-agent task; loop engineering may be over-engineered here
```

### Use This Pattern When

- Tasks span multiple agents or tools and require coordination across steps
- The workflow runs unattended (overnight, scheduled, triggered by external events)
- Cost predictability is required — token budgets and time limits are essential
- Results need to be auditable and traceable back to individual agent decisions
- Failure modes need to be handled gracefully (escalation, retry, circuit break)

### Don't Use This Pattern When

- The task is a single-turn, single-agent operation with immediate human review
- The goal cannot be expressed as a verifiable condition — building a loop around an unverifiable goal produces loops that terminate arbitrarily
- Human judgment is required at the decision point — loop engineering removes humans from the loop by design; use it only where that is the explicit goal

### Comparison with Related Patterns

| Aspect | Loop Engineering | Single-Agent Prompting | Agentic Workflow (static DAG) |
|--------|-----------------|----------------------|-------------------------------|
| **Best For** | Multi-agent, unattended, long-horizon tasks | Interactive, single-capability tasks | Predictable, fixed-step pipelines |
| **Strengths** | Dynamic, verifiable, cost-bounded, auditable | Simple, transparent, low overhead | Reproducible, easy to reason about |
| **Limitations** | Higher setup cost; requires verifiable goal | Doesn't scale to complex multi-step tasks | Rigid; hard to adapt to dynamic inputs |
| **Topology** | Hierarchical, flat-pool, pipeline, or hybrid | N/A | Directed acyclic graph |
| **Controls** | Explicit circuit breakers + watchdogs | None needed | DAG timeout/retry |

---

<!-- 🎬 MAJOR SECTION: The Loop -->
## The Loop, Not the Prompt

The foundational shift in loop engineering is architectural: the prompt is no longer the primary unit of work. The *loop* is. A loop defines everything that surrounds a single agent interaction — what triggers it, what it's trying to achieve, how it verifies success, and what happens when something goes wrong.[^9]

Prompts are stateless and synchronous — they encode the developer's intent at a moment in time. Loops are stateful and asynchronous — they encode the system's intent over a time horizon, with memory, checkpoints, and adaptive behavior built in. Boris Cherny describes this transition plainly: stop writing prompts and start writing loops that write prompts.[^10]

### The Trigger: What Makes It Loopy

Without a recurring trigger, what we have is orchestration — useful, but one-shot. A loop is only loopy when something fires it again: on a schedule, in response to an event, or when a prior run's output signals that more work remains.

GitHub Copilot cloud agent **Automations** are the native trigger layer.[^12] From the **Agents tab** of any private or internal repository, an Automation schedules the agent to run with no cron syntax, no infrastructure, and no external scheduler.[^13]

| Trigger | Options |
|---------|--------|
| Scheduled | Every hour · Every day · Every week |
| Event | Issue created · PR opened · PR synchronized |

Setup is three steps: name the automation, choose a trigger, write a prompt. The agent runs on that schedule indefinitely until explicitly paused.

```
Repository → Agents tab → Automations → Create new
  ↓
Name:    "Daily issue triage"
Trigger: "Every day at midnight"
Prompt:  "Review all open issues. Apply 'stale' to any with no activity for 3 days.
          Close issues stale for 7+ days with a polite note."
Tools:   [label issues, close issues, post comments]
```

This is the simplest complete loop: the Automation is the trigger, the prompt encodes the goal and exit condition, the agent runs until the goal is met or the day ends — and the Automation fires it again tomorrow. The orchestrator agent files and shared state store described below extend this pattern to multi-agent coordination.

### Anatomy of a Production Loop

Every production loop has the same five components, regardless of which agent or framework sits inside it.[^7][^8] The following artifact expresses all five as a single, self-documenting configuration:

```yaml
# loop-anatomy.yml — Annotated Loop Blueprint
# Based on patterns from cobusgreyling/loop-engineering and the LangChain loop engineering guide
# Run: npx @cobusgreyling/loop-audit loop-anatomy.yml --suggest

loop:
  name: "pr-review-pipeline"
  version: "1.0"

  # ── 1. TRIGGER ─────────────────────────────────────────────────────
  # What starts the loop. Never require a human to kick this off manually.
  trigger:
    type: event                         # event | schedule | message | manual
    source: github_webhook
    event: pull_request.opened
    filter: "base_branch == 'main'"
    initialize:
      - load_codebase_index
      - load_pr_context

  # ── 2. GOAL ────────────────────────────────────────────────────────
  # Define this FIRST — before execution, before topology.
  # If this cannot be expressed as a checkable condition, stop and
  # redesign before building anything else.
  goal:
    description: "PR is reviewed, CI is passing, and no critical findings remain"
    verifiable_conditions:
      - name: review_approved
        check: "pr.review_state == 'approved'"
      - name: ci_passing
        check: "pr.status_checks.all(c => c.state == 'success')"
      - name: no_critical_findings
        check: "security_scan.critical_count == 0"

  # ── 3. EXECUTION ───────────────────────────────────────────────────
  # The agents that do the work. Their inner loops (ReAct) run here.
  execution:
    strategy: hierarchical              # hierarchical | flat-pool | pipeline | single
    orchestrator: copilot-planner
    workers:
      - code-review-agent
      - test-gen-agent
      - security-scan-agent
    critic: qa-critic-agent             # validates worker outputs before accepting

  # ── 4. VERIFICATION ────────────────────────────────────────────────
  # Checks goal conditions after each execution iteration.
  verification:
    on_success: terminate               # terminate | notify | trigger_next_loop
    on_partial: retry                   # retry | escalate
    on_failure: escalate
    max_iterations: 5

  # ── 5. CONTROLS ────────────────────────────────────────────────────
  # Hard limits enforced by the outer harness, independent of agent state.
  # These are siblings of execution — not afterthoughts appended later.
  controls:
    circuit_breaker:
      max_iterations: 10
      timeout_minutes: 60
    bounded_execution:
      max_tokens_total: 32000
      max_cost_usd: 5.00
    goal_watchdog:
      check_interval_minutes: 10
      stall_threshold_iterations: 3    # escalate if no progress after 3 tries
      escalate_to: human-reviewer
```

The critical design principle: controls (section 5) are defined as siblings of execution (section 3), not as afterthoughts. In most systems that fail in production, controls were added after incidents, not before deployment.[^10]

This YAML expresses the pattern at production scale. The same five components live in the orchestrator agent's instructions and `loop-state.json` at simpler scales — the concepts are implementation-agnostic.

### The ReAct Foundation

Every agent inside a loop runs its own inner cycle — the ReAct pattern: **Re**ason → **Act** → Observe → repeat.[^11] Loop engineering doesn't replace ReAct; it wraps it with an outer harness that controls when and why the ReAct cycle starts and stops.

```
Outer Loop (Loop Engineering harness)
└── Trigger → Initialize State
    Inner Loop (ReAct, per agent)
    └── Reason → Act → Observe → Reason → ...
        Verification Layer (outer harness checks goal)
        └── Goal Met? → Yes: terminate outer loop
                      → No:  retry inner loop or escalate
```

The two loops are independent concerns. Changing which LLM backs the inner loop doesn't affect the outer loop's control structure. Changing the outer loop's topology doesn't affect how the inner agent reasons. This separation is what makes loop-engineered systems composable and swappable.[^1]

The `cobusgreyling/loop-engineering` CLI tooling makes this concrete with three commands that scaffold, assess, and cost-model any new loop before a line of agent code is written[^1]:

```bash
# Scaffold a starter loop with skills, state, budget, and constraints
npx @cobusgreyling/loop-init . --pattern daily-triage --tool copilot

# Assess an existing loop config and get a Loop Readiness Score
npx @cobusgreyling/loop-audit . --suggest

# Estimate token spend before deploying
npx @cobusgreyling/loop-cost
```

---

<!-- 🎬 MAJOR SECTION: Agent-to-Agent Comms -->
## Agent-to-Agent Communication

When an orchestrator delegates to a worker, or a worker hands off to a critic, the communication channel is the most fragile part of the system. Unstructured messages between agents create invisible coupling: the sender encodes assumptions the receiver cannot verify, trace IDs disappear, and escalation paths become implicit.[^5]

The solution is typed task envelopes — structured objects that carry everything a receiving agent needs, including what to do when it cannot complete the task.

### The Task Envelope Schema

```json
{
  "schema_version": "1.0",
  "task_id": "task-a7f3d2-pr847",
  "trace_id": "session-2026-cf98-xyz-78",
  "timestamp_utc": "2026-07-02T10:15:00Z",

  "sender": {
    "agent_id": "copilot-planner",
    "role": "orchestrator"
  },
  "receiver": {
    "agent_id": "code-review-agent",
    "role": "reviewer"
  },

  "intent": "review_pull_request",
  "priority": "normal",

  "payload": {
    "pr_number": 847,
    "repository": "org/my-service",
    "review_focus": ["security", "test-coverage", "api-compatibility"],
    "context": {
      "base_branch": "main",
      "diff_url": "https://github.com/org/my-service/pull/847.diff",
      "related_issues": ["#412", "#389"]
    }
  },

  "constraints": {
    "max_tokens": 4000,
    "deadline_utc": "2026-07-02T11:00:00Z",
    "max_iterations": 3,
    "confidence_threshold": 0.75
  },

  "handoff_meta": {
    "previous_agent": null,
    "escalate_to": "human-reviewer",
    "escalate_on": [
      "confidence_below_threshold",
      "security_critical_finding",
      "deadline_exceeded"
    ],
    "on_complete": {
      "notify": "copilot-planner",
      "trigger_next": "test-gen-agent"
    }
  }
}
```

Every field serves a purpose[^5][^2]:

| Field | Purpose |
|-------|---------|
| `trace_id` | Links every agent action in this session for post-hoc debugging |
| `constraints` | The receiving agent's budget; it cannot exceed this without escalating |
| `escalate_on` | Explicit conditions under which control returns to the orchestrator or human |
| `on_complete.trigger_next` | Who receives the baton after this agent finishes — making the pipeline declarative |

### Agent Lifecycle States

Agents inside a loop pass through well-defined states. Knowing which state an agent is in makes monitoring, debugging, and restart logic tractable — this is the core value of the herald harness.[^2]

```
Created → Initialized → Active ⇄ Idle → Suspended → Terminated
                                ↓
                          Escalated → (human resolves) → Reactivated
```

| State | Meaning | Loop Action |
|-------|---------|-------------|
| `Created` | Task envelope received, not yet started | Acknowledge receipt |
| `Initialized` | Context loaded, tools verified available | Begin ReAct cycle |
| `Active` | Executing a step in the ReAct cycle | Monitor token spend |
| `Idle` | Waiting for tool response or sub-agent result | Start watchdog timer |
| `Suspended` | Circuit breaker triggered; paused pending review | Alert orchestrator |
| `Escalated` | Goal unachievable within constraints; human needed | Hand off to human |
| `Terminated` | Goal verified; resources released | Write audit trail |

The `Idle → Suspended` transition is where most silent failures hide. An agent waiting for a tool that never responds will sit in `Idle` indefinitely. Without a goal-watchdog timer watching for this state, the loop runs — and bills — forever.[^10]

---

<!-- 🎬 MAJOR SECTION: Orchestration Topologies -->
## Orchestration Topologies

Not all multi-agent problems have the same shape, and topology is the first architectural decision after defining the loop's goal. Selecting the wrong topology is expensive to undo — it's embedded in how agents communicate, how work is parallelized, and how failures propagate.[^4]

```yaml
# loop-topology.yml — Declarative Orchestration Config
# Three reference topologies. Select one, extend, and version-control it.

# ─────────────────────────────────────────────────────────────────────
# TOPOLOGY A: Flat Pool
# Use when: tasks are homogeneous and parallelizable (batch processing,
#           per-file analysis, per-dependency review)
# ─────────────────────────────────────────────────────────────────────
topology_flat_pool:
  name: flat-pool
  orchestrator:
    agent: copilot-planner
    dispatch: capability-match          # round-robin | least-loaded | capability-match
  workers:
    - agent: worker-agent-1
    - agent: worker-agent-2
    - agent: worker-agent-3
  aggregator:
    agent: result-merger
    strategy: majority-vote             # majority-vote | union | first-success

# ─────────────────────────────────────────────────────────────────────
# TOPOLOGY B: Hierarchical (Orchestrator → Workers → Critic)
# Use when: tasks require specialization with quality gates at the output.
# Recommended default for software engineering pipelines.
# ─────────────────────────────────────────────────────────────────────
topology_hierarchical:
  name: hierarchical
  orchestrator:
    agent: copilot-planner
    role: coordinator
    max_concurrent_workers: 3
  workers:
    - agent: code-review-agent
      capabilities: [code_analysis, security_scan]
    - agent: test-gen-agent
      capabilities: [unit_tests, integration_tests]
    - agent: doc-update-agent
      capabilities: [readme, changelog, api_docs]
  critic:
    agent: qa-critic-agent
    evaluates: [code-review-agent, test-gen-agent]
    confidence_threshold: 0.80
    on_reject: retry_with_feedback      # retry_with_feedback | escalate | accept_with_note

# ─────────────────────────────────────────────────────────────────────
# TOPOLOGY C: Pipeline (sequential assembly-line)
# Use when: each step strictly depends on the output of the previous.
# ─────────────────────────────────────────────────────────────────────
topology_pipeline:
  name: pipeline
  stages:
    - name: analyze
      agent: analysis-agent
      output: analysis_report
    - name: implement
      agent: code-gen-agent
      input: analysis_report
      output: implementation
    - name: test
      agent: test-runner-agent
      input: implementation
      output: test_results
    - name: review
      agent: code-review-agent
      input: [implementation, test_results]
      output: review_decision
  on_stage_failure:
    strategy: rollback                  # rollback | skip | escalate
    notify: orchestrator

# ─────────────────────────────────────────────────────────────────────
# SHARED CONTROLS — apply to all topologies
# ─────────────────────────────────────────────────────────────────────
shared_controls:
  circuit_breaker:
    max_iterations: 10
    timeout_minutes: 30
  bounded_execution:
    max_tokens_per_agent: 8000
    max_cost_usd: 2.50
  goal_watchdog:
    check_interval_minutes: 5
    escalate_on_stall: true
    stall_threshold_iterations: 3
```

### Topology Selection Guide

| Signal | Topology |
|--------|----------|
| Tasks are independent and parallelizable | Flat Pool |
| Tasks require specialization with quality gates | Hierarchical |
| Each step strictly depends on the previous output | Pipeline |
| Quality gates at each pipeline stage | Hierarchical + Pipeline hybrid |

The **Hierarchical topology with a critic** is the recommended default for software engineering pipelines.[^6] The critic agent provides quality gates that acting agents — who are systematically biased toward confidence in their own outputs — cannot reliably self-administer.

---

<!-- 🎬 MAJOR SECTION: Production Controls -->
## Production Controls

The production control patterns are the ones teams skip first and regret most. Of the ten loop patterns documented in Data Science Dojo's 2026 catalog, the three production-control patterns account for the majority of reported production failures in agentic systems.[^6] They're not glamorous, but they're what separates a demo from a deployment.

### The Three Essential Controls

**1. Circuit Breaker** — halts the loop if a safety or cost threshold is violated, regardless of what the agent believes about its own progress.

```python
class CircuitBreaker:
    def __init__(self, max_iterations: int, timeout_minutes: int, max_cost_usd: float):
        self.max_iterations = max_iterations
        self.deadline = datetime.utcnow() + timedelta(minutes=timeout_minutes)
        self.max_cost_usd = max_cost_usd
        self.iteration_count = 0
        self.total_cost_usd = 0.0

    def check(self, cost_this_iteration: float) -> str:
        """Returns 'continue', 'pause', or 'terminate'."""
        self.iteration_count += 1
        self.total_cost_usd += cost_this_iteration

        if self.iteration_count >= self.max_iterations:
            return "terminate"   # hard stop: iteration limit reached
        if datetime.utcnow() >= self.deadline:
            return "terminate"   # hard stop: time limit reached
        if self.total_cost_usd >= self.max_cost_usd:
            return "pause"       # pause for human review: cost limit reached
        return "continue"
```

**2. Bounded Execution** — every agent receives an explicit token budget and deadline in its task envelope; agents that exceed their budget must escalate rather than continue.

```python
def dispatch_with_budget(agent_id: str, task: dict, budget: dict) -> dict:
    """
    Wraps a task dispatch with explicit resource constraints.
    The receiving agent cannot exceed these without surfacing an escalation signal.
    """
    envelope = {
        **task,
        "constraints": {
            "max_tokens": budget.get("max_tokens", 4000),
            "deadline_utc": (
                datetime.utcnow() + timedelta(minutes=budget.get("timeout_minutes", 15))
            ).isoformat() + "Z",
            "max_iterations": budget.get("max_iterations", 3),
        }
    }
    return send_to_agent(agent_id, envelope)
```

**3. Goal-Watchdog** — monitors the loop at a fixed interval and escalates if no measurable progress has been made within a stall threshold.

```python
class GoalWatchdog:
    def __init__(self, goal_check_fn, stall_threshold: int, escalate_fn):
        self.goal_check = goal_check_fn
        self.stall_threshold = stall_threshold
        self.escalate = escalate_fn
        self.stall_count = 0
        self.last_progress_state = None

    def tick(self, current_state: dict):
        """Call after each loop iteration."""
        progress = self.goal_check(current_state)
        if progress == self.last_progress_state:
            self.stall_count += 1
        else:
            self.stall_count = 0
            self.last_progress_state = progress

        if self.stall_count >= self.stall_threshold:
            self.escalate(reason="goal_stall", state=current_state)
```

### Loop Audit CLI

The `cobusgreyling/loop-engineering` toolkit includes a `loop-audit` CLI tool that assigns a **Loop Readiness Score** to any loop configuration.[^1] The following captures its core audit logic as a standalone shell script for teams that prefer a local, dependency-free check:

```bash
#!/usr/bin/env bash
# loop-audit.sh — Audit a loop config for the 10 most common production failure modes
# Inspired by cobusgreyling/loop-engineering::loop-audit
# Preferred: npx @cobusgreyling/loop-audit . --suggest
#
# Usage: ./loop-audit.sh <loop-config.yml>

set -euo pipefail

CONFIG="${1:?Usage: ./loop-audit.sh <loop-config.yml>}"
PASS=0; FAIL=0; WARN=0

check() {
  local name="$1" condition="$2" severity="$3"
  if eval "$condition" > /dev/null 2>&1; then
    echo "  ✅ $name"; ((PASS++))
  elif [[ "$severity" == "FAIL" ]]; then
    echo "  ❌ $name"; ((FAIL++))
  else
    echo "  ⚠️  $name"; ((WARN++))
  fi
}

echo "🔍 Loop Audit: $CONFIG"
echo "────────────────────────────────────────────────"

echo ""
echo "[ Exit Conditions ]"
check "goal.verifiable_conditions defined"  "yq '.goal.verifiable_conditions | length > 0' $CONFIG" "FAIL"
check "controls.circuit_breaker defined"    "yq e '.controls.circuit_breaker | has(\"max_iterations\")' $CONFIG" "FAIL"
check "controls.bounded_execution defined"  "yq e '.controls.bounded_execution | has(\"max_cost_usd\")' $CONFIG" "FAIL"
check "controls.goal_watchdog defined"      "yq e '.controls | has(\"goal_watchdog\")' $CONFIG" "WARN"

echo ""
echo "[ Agent Communication ]"
check "escalate_to set on at least one agent" "yq e '.. | select(has(\"escalate_to\"))' $CONFIG" "FAIL"
check "trace propagation configured"          "yq e '.execution.trace_propagation == true' $CONFIG" "WARN"

echo ""
echo "[ Cost & Safety ]"
check "max_cost_usd defined"           "yq e '.controls.bounded_execution | has(\"max_cost_usd\")' $CONFIG" "FAIL"
check "timeout_minutes < 120"         "[[ \$(yq e '.controls.circuit_breaker.timeout_minutes' $CONFIG) -lt 120 ]]" "WARN"
check "max_iterations < 20"           "[[ \$(yq e '.controls.circuit_breaker.max_iterations' $CONFIG) -lt 20 ]]" "WARN"
check "stall_threshold_iterations < 5" "[[ \$(yq e '.controls.goal_watchdog.stall_threshold_iterations' $CONFIG) -lt 5 ]]" "WARN"

echo ""
echo "────────────────────────────────────────────────"
echo "Results: ✅ $PASS passed  ⚠️  $WARN warnings  ❌ $FAIL failures"

if [[ "$FAIL" -gt 0 ]]; then
  echo "⛔ Audit FAILED — do not deploy this loop to production."
  exit 1
else
  echo "✅ Audit PASSED — loop is production-eligible."
fi
```

Three findings that fail audit most frequently[^1][^10]:

- **Missing `goal.verifiable_conditions`** — the loop has no principled exit; it will run until it hits a hard limit
- **Missing `circuit_breaker`** — the loop has no hard stop; one stalled tool call becomes an unbounded cost event
- **`max_cost_usd` unset or > $10** — an uncapped budget is a production incident waiting to happen

---

<!-- 🎬 MAJOR SECTION: Full Pipeline -->
## Wiring It All Together

The following worked example assembles all five sections into a complete multi-agent pipeline: a security advisory response that runs from webhook trigger to verified PR with zero human prompting between start and outcome.

```yaml
# copilot-loop-pipeline.yml — Multi-Agent Security Advisory Response Pipeline
# Demonstrates: trigger → orchestrator → workers → critic → verified PR

loop:
  name: "security-advisory-response"
  version: "1.0"
  description: >
    When GitHub publishes a critical security advisory for a dependency we use,
    automatically analyze the codebase, generate a fix, validate it with a critic,
    and open a PR for human sign-off.

  # ── TRIGGER ─────────────────────────────────────────────────────────────────
  trigger:
    type: github_event
    event: security_advisory.published
    filter: "advisory.severity in ['high', 'critical']"
    initialize:
      - load_codebase_index
      - load_dependency_graph

  # ── GOAL ────────────────────────────────────────────────────────────────────
  # Defined FIRST. All execution and topology decisions flow from this.
  goal:
    description: "A PR exists that resolves the CVE with passing CI and no new vulnerabilities"
    verifiable_conditions:
      - name: pr_opened
        check: "github.pr.state == 'open'"
      - name: ci_passing
        check: "github.pr.status_checks.all(c => c.state == 'success')"
      - name: original_cve_resolved
        check: "security_scan.cve_id not in scan_results.critical_findings"
      - name: no_new_critical_cves
        check: "security_scan.new_critical_count == 0"

  # ── EXECUTION ───────────────────────────────────────────────────────────────
  execution:
    topology: hierarchical
    orchestrator:
      agent: copilot-planner
      responsibilities:
        - decompose advisory into subtasks
        - dispatch task envelopes to workers
        - collect and compose results
        - trigger verification after each worker completes

    workers:
      - agent: vuln-scan-agent
        role: analyzer
        task: identify_affected_files
        output_schema: affected_files_report

      - agent: fix-proposal-agent
        role: implementer
        task: generate_dependency_fix
        input: affected_files_report
        output_schema: proposed_diff

      - agent: test-runner-agent
        role: validator
        task: run_affected_tests
        input: proposed_diff
        output_schema: test_results

    critic:
      agent: security-critic-agent
      evaluates: [fix-proposal-agent, test-runner-agent]
      confidence_threshold: 0.85
      on_reject: retry_with_feedback
      max_rejections: 2

    finalizer:
      agent: pr-author-agent
      task: open_pull_request
      input: [proposed_diff, test_results, security_critic_approval]
      pr_template:
        title: "fix(deps): resolve {advisory.cve_id} in {advisory.package}"
        labels: ["security", "automated"]
        assignees: ["security-team"]

  # ── VERIFICATION ────────────────────────────────────────────────────────────
  verification:
    check_after: finalizer
    on_all_conditions_met: terminate
    on_partial:
      strategy: retry
      max_retries: 2
    on_failure:
      strategy: escalate
      escalate_to: security-team
      message: "Loop unable to auto-resolve {advisory.cve_id} — manual review required"

  # ── CONTROLS ────────────────────────────────────────────────────────────────
  controls:
    circuit_breaker:
      max_iterations: 8
      timeout_minutes: 45
    bounded_execution:
      max_tokens_total: 48000
      max_cost_usd: 4.00
      per_agent_budget:
        vuln-scan-agent:       { max_tokens: 8000 }
        fix-proposal-agent:    { max_tokens: 16000 }
        test-runner-agent:     { max_tokens: 6000 }
        security-critic-agent: { max_tokens: 8000 }
        pr-author-agent:       { max_tokens: 4000 }
    goal_watchdog:
      check_interval_minutes: 8
      stall_threshold_iterations: 2
      escalate_to: security-team
```

### Runtime Walkthrough

| Time | Event |
|------|-------|
| T+0 min | GitHub fires `security_advisory.published` webhook for a critical CVE |
| T+0 min | Loop trigger activates; copilot-planner initializes with codebase index and dependency graph |
| T+1 min | Planner dispatches task envelope to `vuln-scan-agent` with bounded 8k-token budget |
| T+3 min | Scan agent returns `affected_files_report`; planner dispatches to `fix-proposal-agent` |
| T+7 min | Fix agent returns `proposed_diff`; planner dispatches to `test-runner-agent` |
| T+10 min | Test results arrive; `security-critic-agent` evaluates fix quality and test coverage |
| T+11 min | Critic approves (confidence 0.91 > 0.85 threshold); planner dispatches to `pr-author-agent` |
| T+12 min | PR is opened; verification layer checks all four goal conditions |
| T+18 min | CI completes; all goal conditions met; loop terminates |
| T+18 min | Full audit trail written: trace_id, per-agent token spend, decision chain |

Total: 18 minutes. Zero human prompts between trigger and outcome. Full provenance via `trace_id`.

---

## Real-World Use Cases

### Use Case 1: Continuous Dependency Health

**The Scenario:** A platform team wants every dependency update — security patches, minor bumps — reviewed, tested, and merged automatically without occupying developer attention.

**How It Works:** A scheduled flat-pool topology spawns one `dependency-review-agent` per package with a pending update. Each runs its own ReAct cycle, produces a proposed update and test results, and a critic validates before the finalizer opens batched PRs.

**Example:**
```yaml
trigger:
  type: schedule
  cron: "0 9 * * 1"                # Every Monday 9am UTC
  scope: all_dependencies_with_updates_available
topology: flat-pool
goal:
  verifiable_conditions:
    - check: "pr.ci_passing and not breaking_change_detected"
```

**What We Get:** Dependency hygiene maintained automatically; developers review PRs rather than raw dependency diffs. Teams using this pattern report ~3 hours/week reclaimed per engineer on high-churn repositories.[^3]

---

### Use Case 2: Background Refactor Campaign

**The Scenario:** An engineering org wants to migrate 200 service files from a deprecated internal API to its replacement — without blocking feature development.

**How It Works:** A pipeline topology processes files in nightly batches: `analysis-agent` identifies call sites, `refactor-agent` rewrites them, `test-runner-agent` validates, and a critic spot-checks for semantic drift. The loop runs nightly, processing ~20 files per run.

**Example:**
```yaml
trigger:
  type: schedule
  cron: "0 2 * * *"               # 2am UTC daily
  scope: files_using_deprecated_api
  batch_size: 20
topology: pipeline
goal:
  verifiable_conditions:
    - check: "all_batch_files_migrated and test_suite.regression_count == 0"
```

**What We Get:** 200-file migration completed in 10 nightly runs without a dedicated migration sprint. Zero regression in production.[^4]

---

### Use Case 3: Automated Code Review Pipeline

**The Scenario:** A team wants automated code review covering correctness, security, test coverage, and documentation completeness — four distinct concerns that a single reviewer struggles to cover consistently.

**How It Works:** A hierarchical topology with four specialized reviewer agents, each with its own task envelope and bounded token budget. A critic aggregates findings, removes duplicates, and surfaces a ranked list. The orchestrator posts results as a structured PR review comment.

**Example:**
```json
{
  "review_agents": [
    { "agent": "correctness-reviewer", "focus": "logic_errors, edge_cases" },
    { "agent": "security-reviewer",    "focus": "injection, auth, secrets" },
    { "agent": "coverage-reviewer",    "focus": "test_gaps, untested_paths" },
    { "agent": "doc-reviewer",         "focus": "missing_docstrings, stale_comments" }
  ],
  "critic": "review-synthesizer",
  "output": "structured_pr_review_comment"
}
```

**What We Get:** Consistent four-dimensional code review on every PR in under 5 minutes. Security findings that previously required a dedicated security review on ~30% of PRs surface automatically, at merge time.[^5]

---

## 🗓️ What We Can Do Today

### In 15 Minutes

- [ ] Create a Copilot Automation (repository → Agents tab → Automations → Create new) with a daily schedule and a simple triage task — this is the minimum viable loop trigger, and the fastest way to experience what makes a loop loopy rather than one-shot[^12]
- [ ] Run `npx @cobusgreyling/loop-audit . --suggest` against an existing agent workflow to get a Loop Readiness Score and targeted suggestions[^1]
- [ ] Write out one recurring multi-step agent task as a goal with verifiable conditions — not a description, a checkable criterion

### In 1 Hour

- [ ] Implement a `CircuitBreaker` class around an existing agent loop using the Python snippet above — add `max_iterations`, timeout, and cost cap as the first three parameters
- [ ] Convert an existing inter-agent message format to a typed task envelope with `trace_id`, `constraints`, and `escalate_on` fields
- [ ] Run `npx @cobusgreyling/loop-init . --pattern daily-triage --tool copilot` to scaffold a starter loop with skills, state, budget, and constraints in place[^1]

### In 2–4 Hours

- [ ] Wire a three-agent hierarchical pipeline (orchestrator → worker → critic) using `loop-topology.yml` as a base, with full task-envelope handoff between agents and a shared `circuit_breaker` in the controls section
- [ ] Integrate `loop-audit.sh` into CI — run it against every loop config change as a pre-merge gate, failing the build if any `FAIL`-severity checks don't pass
- [ ] Stand up the herald harness for agent lifecycle management on the team's most-used pipeline, replacing ad hoc orchestration code with declarative config and built-in state-machine transitions[^2]

---

## Related Patterns

- **[Agent Teams](../agent-teams/README.md)** — How to compose Copilot agents into collaborative groups; loop engineering provides the production-control layer that makes agent teams reliable in unattended operation
- **[Agentic Workflows](../agentic-workflows/README.md)** — Static DAG-based workflows; loop engineering extends this with dynamic, verification-driven execution and adaptive topology
- **[MCP Apps](../mcp-apps/README.md)** — Model Context Protocol as the tool layer inside a loop's execution layer; MCP tools are what loop agents invoke when they act

---

## 📖 References

### Official Documentation

[^1]: **[cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering)** — Practical patterns, starters & CLI tools for loop engineering with AI coding agents: `loop-audit` (Loop Readiness Score), `loop-init` (scaffolder), `loop-cost` (token estimator). Inspired by Addy Osmani and Boris Cherny.

[^2]: **[gim-home/herald](https://github.com/gim-home/herald)** — The herald agent management harness: declarative lifecycle management (Created → Active → Escalated → Terminated state machine), structured message bus, health monitoring, and inter-agent coordination primitives.

[^12]: **[Creating automations with Copilot cloud agent — GitHub Docs](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations)** — Official guide for scheduled and event-triggered Copilot cloud agent automations: trigger options (hourly, daily, weekly; issue created; PR opened/synchronized), setup steps, tool permissions, and organizational policy controls.

[^13]: **[Schedule and automate tasks with Copilot cloud agent — GitHub Blog](https://github.blog/changelog/2026-06-02-schedule-and-automate-tasks-with-copilot-cloud-agent/)** — June 2026 release announcement: Copilot cloud agent Automations launch for private and internal repositories, enabling background recurring agent tasks without external schedulers.

### Blog Posts & Guides

[^3]: **[Anthropic Engineer: Build Loops That Prompt AI, Not Single Prompts](https://explainx.ai/blog/anthropic-engineer-loops-prompts-ai-coding-harness-engineering-2026)** — Boris Cherny (Claude Code lead at Anthropic) on the loop engineering methodology: 8x code output improvement, Claude writing >80% of merged production code via loop-managed autonomy.

[^4]: **[Agentic Loops: From ReAct to Loop Engineering (2026 Guide)](https://datasciencedojo.com/blog/agentic-loops-explained-from-react-to-loop-engineering-2026-guide/)** — Data Science Dojo's 2026 guide: complete loop anatomy, the trigger + verifiable-goal structure, and why loop engineering supersedes prompt engineering as the primary unit of agent system design.

[^5]: **[The Art of Loop Engineering — LangChain Blog](https://www.langchain.com/blog/the-art-of-loop-engineering)** — LangChain's practitioner guide: custom loop termination logic, dynamic replanning, nested/recursive loops, state management, and error recovery patterns in production agentic systems.

[^6]: **[10 Loop Engineering Design Patterns for AI Builders (2026)](https://datasciencedojo.com/blog/loop-engineering-design-patterns/)** — Taxonomy of the 10 named patterns across three tiers: Foundational (ReAct, Reflection, Tool-use, Memory-augmented), Practitioner (Multi-agent, Hierarchical, Critic), Production Controls (Circuit Breaker, Bounded Execution, Goal-watchdog).

[^7]: **[Loop Engineering — O'Reilly Radar](https://www.oreilly.com/radar/loop-engineering/)** — O'Reilly's analysis of loop engineering as an emerging discipline: the four-layer architecture (trigger → execution → verification → control) and its relationship to classical software design patterns.

[^8]: **[AddyOsmani.com — Loop Engineering](https://addyosmani.com/blog/loop-engineering/)** — Addy Osmani's practitioner framing: the developer's job shifts from writing prompts to writing loops; the loop as the atomic unit of autonomous system design rather than the individual prompt.

[^9]: **[What Is Loop Engineering? Beyond Prompt Engineering in 2026](https://explainx.ai/blog/what-is-loop-engineering-ai-agents-2026)** — ExplainX's 2026 overview of loop engineering as the successor paradigm to prompt engineering, with focus on the trigger-goal-verify architecture and production control patterns.

[^10]: **[The Anthropic Leader Who Built Claude Code Says He Ditched Prompting](https://thenewstack.io/loop-engineering/)** — The New Stack's reporting on loop engineering adoption at Anthropic, and why Boris Cherny moved from hand-crafted prompts to loops as the primary unit of agent management.

[^11]: **[Loop Engineering: Why Boris Cherny Writes Loops](https://blog.pebblous.ai/blog/loop-engineering/en/)** — Pebblous AI's breakdown of the ReAct-inside-loop architecture: how loop engineering wraps rather than replaces the ReAct (Reason → Act → Observe) foundation, keeping the two concerns cleanly separated.
