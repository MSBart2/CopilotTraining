---
status: archived
updated: 2026-10-22
section: "Agents at Your Keyboard"
audience: [platform-engineer, architect, security]
level: advanced
duration: 45
format: core-talk
decision: "How does an unattended agent loop verify progress and stop safely?"
prerequisites: [agent-teams]
related: [repo-to-feature, agentic-lifecycle, copilot-hooks, agentic-sdlc]
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
  - url: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    label: "GitHub Copilot CLI command reference (/every, --agent, --allow-tool) — GitHub Docs"
    verified: 2026-10-22
  - url: https://docs.github.com/en/copilot/reference/custom-agents-configuration
    label: "Custom agents configuration (tool aliases) — GitHub Docs"
    verified: 2026-10-22
---

# Unattended Agents: Loops That Run Without You and Stop on Their Own Terms

> **The Question This Talk Answers:**
> *"How do we design agent systems that run reliably without hand-holding — and stop reliably without breaking?"*

**Duration:** 45 minutes | **Target Audience:** Platform Engineers, Senior Developers, AI Infrastructure Leads

---

> **An unattended agent** is an agent that, once triggered, continues to reason → act → verify in a cycle until the goal is demonstrably met — then stops. Every pattern in this talk is in service of making that loop reliable, coordinated across multiple agents, and safe to run unattended.

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Every team running Copilot agents at scale hits the same wall: reliable starts, unreliable stops. Loop engineering addresses this directly, and the pattern is now industry-named and documented by practitioners at Anthropic, Google, LangChain, and O'Reilly. |
| **Compelling** | 🟢 High | The shift from prompt engineering to loop engineering is concrete: Boris Cherny (Claude Code lead at Anthropic) describes his own job as writing the loops that prompt Claude, as reported by The New Stack. The "aha" is that the loop — not the prompt — is the unit of reliability. |
| **Actionable** | 🟢 High | A runnable Copilot-native starter (custom agents + a shared state file, kicked off by hand or with Copilot CLI's `/every`) plus design blueprints for the loop anatomy, task envelope, topologies, controls, and a full multi-agent pipeline. Three NPX commands scaffold and assess a starter loop in minutes. |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Autonomous multi-step pipelines**
  A single kickoff — one prompt, or a recurring `/every` schedule in Copilot CLI — can start a chain of specialized agents that plan, implement, review, test, and ship, all without human prompting between steps.

- **Verifiable goal completion**
  Loops can be designed to terminate against a concrete criterion: tests pass, security scan clean, PR merged. The agent doesn't stop when it thinks it's done — it stops when the goal is demonstrably achieved.[^4]

- **Structured agent-to-agent tasking**
  Orchestrator agents delegate subtasks to specialists using typed message envelopes — structured handoff objects that carry intent, constraints, escalation paths, and trace IDs — making multi-agent coordination auditable and debuggable.[^2]

- **Production-grade cost and safety controls**
  Circuit breakers, bounded budgets, and goal-watchdog timers bound loop cost and lifespan. The strongest versions live outside the agent — a CLI credit cap, denied tools, and required human review — so the loop stops even when the agent believes it has more to do.[^6]

### The Emerging Practice

Loop engineering is the practice of designing the autonomous systems — the *loops* — that manage AI agents rather than managing the agents directly. The key insight, articulated by Boris Cherny (Claude Code lead at Anthropic) and Addy Osmani (Google), is that the developer's job shifts from writing better prompts to writing better loops that prompt and supervise agents on our behalf.[^3][^8]

The analogy to software engineering is precise: a loop is a program, and agents are its subroutines. The program controls trigger conditions, goal definitions, verification criteria, memory passing, escalation paths, and termination. The agent controls how it accomplishes any individual step.

The pattern has been formalized in open-source tooling (`cobusgreyling/loop-engineering`, `gim-home/herald`) and documented across O'Reilly Radar, LangChain's engineering blog, and Data Science Dojo's 2026 pattern catalog.[^1][^2][^4]

As agents gain the ability to spawn sub-agents, hand off work, and operate across day-long time horizons, the most valuable place for human attention moves to the edges of the loop: defining the goal, setting the limits, and approving the result. Loop engineering is how teams put that attention where it counts, on purpose.

---

## How It Works: Loop Engineering

### What It Does

A loop wraps an AI agent with a structured execution harness: a trigger that starts the loop, a goal that defines success, a verification layer that checks whether that goal has been met, and a set of production controls that bound cost and behavior. The agent operates inside this harness, reasoning and acting freely within the constraints the loop defines.[^7]

### Key Capabilities

- **One kickoff, many iterations**: A person or a recurring schedule starts the loop once; the orchestrator drives every iteration after that without further prompting
- **Goal-anchored termination**: Loops end when a verifiable condition is true, not when the agent says it's finished
- **Structured agent handoff**: Inter-agent task passing uses typed message envelopes with provenance, constraints, and escalation metadata
- **Hierarchical delegation**: Orchestrators spawn and manage worker agents; critics evaluate their outputs; watchdogs monitor the full pipeline
- **Cost and safety bounding**: Circuit breakers, spend caps, and time limits prevent runaway execution

### Architecture Overview

The anatomy of a production-grade loop has four concentric layers. The **trigger layer** receives the kickoff — a person or a schedule — and initializes loop state. The **execution layer** is where the agent reasons and acts — calling tools, generating code, making decisions. The **verification layer** checks outputs against the goal definition and decides whether to repeat, escalate, or terminate. The **control layer** monitors the entire loop and enforces hard limits regardless of what the inner layers are doing.[^7][^8]

In multi-agent configurations, each agent runs its own inner loop. An orchestrator loop coordinates them, passing typed task envelopes between agents and collecting results. The orchestrator's verification layer is responsible for composing partial results into a final, verifiable outcome.

### The Simplest Starting Point

These patterns apply at any level of formality. The minimum viable Copilot-native implementation is a handful of custom agent files, a shared state store, and a Copilot CLI session — no orchestration framework, no YAML config schemas, no external tooling.

The loop starts one of two ways. A person kicks off a pass with one prompt to the orchestrator, or Copilot CLI's `/every` command repeats that prompt on an interval for as long as the session stays open.[^16] From the kickoff on, the orchestrator drives every iteration: it reads state, invokes workers, checks the goal, and stops on proof or at its limit. The kickoff is the only prompt a person writes.

The whole loop runs in that CLI session on your machine. The orchestrator follows its agent file, and the workers it invokes through the `agent` tool run in the same session against the same working tree. Start the session with the orchestrator selected and the tools scoped:

```bash
copilot --experimental --agent=loop-orchestrator \
  --allow-tool='read, write, shell(npm:*), shell(npx:*), shell(git:*), shell(gh:*), shell(date)' \
  --deny-tool='shell(gh pr merge), shell(gh pr review)'

# inside the session — one pass on demand:
Run one pass of the security-advisory loop from .github/loop-state.json.

# or the same pass every hour while the session stays open:
/every 1h Run one pass of the security-advisory loop from .github/loop-state.json.
```

`/every` is an experimental CLI feature, and its schedule lasts as long as the session. The session acts with your credentials and your machine's network; `--deny-tool` keeps the merge and review decisions with a human, and deny rules win over allow rules.

```
.github/
  agents/
    loop-orchestrator.agent.md   ← reads state, delegates tasks, checks goal
    loop-reviewer.agent.md       ← specialized code review worker
    loop-tester.agent.md         ← specialized test-runner worker
  loop-state.json                ← shared state store
```

The orchestrator agent's instructions encode all five loop components directly — trigger condition, goal definition, delegation logic, verification step, and iteration cap. The orchestrator hands each task to a worker through the `agent` tool alias, which lets one custom agent invoke another; workers read their task from the state file and write results back. The state store can be a JSON file in the repo, a GitHub Issue, a database row, or any writable surface all agents can reach.[^14]

```markdown
<!-- .github/agents/loop-orchestrator.agent.md -->
---
description: Loop orchestrator — delegates tasks and verifies goal completion
tools: [read, edit, search, agent, "github/*"]
---
1. Read `.github/loop-state.json` and confirm it matches the repository's current state.
2. If `iteration_count >= max_iterations`, write an escalation note and stop.
3. Check all `goal.conditions` — if all are `true`, write a completion summary and stop.
4. For each task in `state.pending`, invoke the matching worker custom agent
   (`loop-reviewer` or `loop-tester`) with the task details.
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

Two operating details keep a file-based state store honest. The file lives in the session's working tree, so each pass sees the previous pass's state immediately; give the loop its own git worktree so your own edits and the loop's stay apart. Passes that overlap can overwrite each other's state, so run one loop per worktree and have the orchestrator verify the file against the repository before acting on it.

The YAML examples later in this talk express the same five components as design blueprints — specifications a team adapts into its own orchestrator, agent instructions, and CI. No Copilot surface reads those files directly. The [loop starter](./examples/loop-starter/) turns the security-advisory blueprint into five working agent files you can copy and run. For a repository-native runtime that enforces time, turn, and write limits for you, see [GitHub Agentic Workflows](../agentic-lifecycle/).

**Key References:**
- 📖 [Copilot CLI command reference — GitHub Docs](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) — The loop trigger: `/every` repeats a prompt on an interval inside a CLI session; `--agent` selects the orchestrator[^16]
- 📖 [Custom agents configuration — GitHub Docs](https://docs.github.com/en/copilot/reference/custom-agents-configuration) — Tool aliases (`read`, `edit`, `search`, `execute`, `agent`) and MCP tool namespacing for agent files[^14]
- 📖 [loop-engineering: Practical patterns, starters & CLI tools](https://github.com/cobusgreyling/loop-engineering) — Loop patterns to adapt: daily triage, PR babysitter, CI sweeper, dependency sweeper, and more
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

- **[`examples/loop-starter/`](./examples/loop-starter/)** — Copilot-native implementation of the security-advisory design: five custom agents (`loop-orchestrator`, `vuln-scan-agent`, `fix-proposal-agent`, `security-critic-agent`, `pr-author-agent`), a shared `loop-state.json`, a sample completed run, and a Copilot CLI `/every` schedule guide — no framework required. This is the part that runs as written.
- **`loop-anatomy.yml`** — Design blueprint of the same five components at production scale: trigger, goal, execution, verification, and controls
- **`task-envelope.json`** — Canonical JSON schema for structured agent-to-agent task handoff with trace IDs, constraints, and escalation paths
- **`loop-topology.yml`** — Design blueprint covering flat-pool, hierarchical, and pipeline topologies with shared controls
- **`copilot-loop-pipeline.yml`** — Full worked design: multi-agent security advisory response pipeline from trigger to verified PR

> **Blueprints, not runtime configs:** the YAML and Python artifacts are specifications to adapt into an orchestrator, agent instructions, and CI. No Copilot surface reads them as-is.

### Supporting Files

- **[loop-engineering (cobusgreyling)](https://github.com/cobusgreyling/loop-engineering)** — Loop patterns to adapt: daily triage, PR babysitter, CI sweeper, dependency sweeper, and more, each with a cadence and a report-only first week
- **[herald harness (gim-home)](https://github.com/gim-home/herald)** — Reference implementation for declarative agent lifecycle management

---

## 🎯 Mental Model Shift

> **The Core Insight:** Agents don't need better prompts — they need better loops. The loop is the unit of reliability, and the hardest engineering challenge is not starting it but stopping it correctly.

### Move Toward (Embrace These Patterns)

- ✅ **Goal-anchored termination**: Define success as a verifiable condition — tests pass, scan clean, file exists — before writing a single line of agent code → loops that end deterministically rather than hopefully
- ✅ **Typed task envelopes**: Pass structured handoff objects between agents with `task_id`, `intent`, `constraints`, and `escalate_to` fields → inter-agent coordination that is debuggable and auditable
- ✅ **Declarative topology**: Express multi-agent configurations as data (YAML, JSON) rather than imperative orchestration code → topologies that can be versioned, diffed, and swapped without rewriting pipelines
- ✅ **Bounded execution by default**: Attach a credit cap, time limits, and iteration caps to every loop before it runs unattended → cost predictability without sacrificing autonomy
- ✅ **Critic-in-the-loop**: Place a dedicated evaluator agent at the verification layer rather than having the acting agent self-assess → quality gates that catch what the acting agent is blind to

### Move Away From (Retire These Habits)

- 🔄 **Hand-prompting every step → one kickoff per loop**: Start the loop once, by hand or with `/every`, and let the orchestrator drive each iteration → people shift from operating agents to reviewing outcomes
- 🔄 **Single-agent thinking → multi-agent decomposition**: When a task requires more than ~3 distinct capabilities, try decomposing into specialized workers with a coordinating orchestrator → cleaner reasoning, easier debugging, parallelizable execution
- 🔄 **Self-assessed completion → verified completion**: Move from "agent says it's done" to "goal condition is demonstrably true" → eliminates the most common class of silent loop failures

### Design In From the Start

- 🛡️ **Exit conditions before execution**: A loop that defines its stop criterion up front ends on purpose rather than at a hard limit → define goal, circuit breaker, and timeout as the first three fields in any new loop
- 🛡️ **Structured agent messaging**: Typed envelopes with trace IDs keep agent-to-agent handoffs traceable, versionable, and debuggable → reserve free-text handoffs for prototypes
- 🛡️ **A critic layer**: Acting agents tend to trust their own confident mistakes; a separate critic catches them before they compound across iterations → place the critic at the verification layer

> **What This Looks Like (illustrative design):** An hourly `/every` pass in Copilot CLI checks for new high-severity Dependabot alerts. An orchestrator loop reads the alert, tasks a scanning agent to check the codebase, hands a typed task envelope to a fix-proposal agent if vulnerabilities are found, waits for a critic to validate the fix quality, then opens a draft PR. The loop verifies the PR passes CI before terminating, and a human reviews and merges it. No one prompts the agents between trigger and PR; the security team's attention goes to one review.

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
- Cost predictability is required — spend caps and time limits are essential
- Results need to be auditable and traceable back to individual agent decisions
- Failure modes need to be handled gracefully (escalation, retry, circuit break)

### Don't Use This Pattern When

- The task is a single-turn, single-agent operation with immediate human review
- The goal cannot be expressed as a verifiable condition — building a loop around an unverifiable goal produces loops that terminate arbitrarily
- Human judgment is required at the decision point — loop engineering removes humans from the loop by design; use it only where that is the explicit goal

### Comparison with Related Patterns

| Aspect | Unattended Agent Loop | Single-Agent Prompting | Static DAG pipeline |
|--------|-----------------|----------------------|-------------------------------|
| **Best For** | Multi-agent, unattended, long-horizon tasks | Interactive, single-capability tasks | Predictable, fixed-step pipelines |
| **Strengths** | Dynamic, verifiable, cost-bounded, auditable | Simple, transparent, low overhead | Reproducible, easy to reason about |
| **Limitations** | Higher setup cost; requires verifiable goal | Doesn't scale to complex multi-step tasks | Rigid; hard to adapt to dynamic inputs |
| **Topology** | Hierarchical, flat-pool, pipeline, or hybrid | N/A | Directed acyclic graph |
| **Controls** | Explicit circuit breakers + watchdogs | None needed | DAG timeout/retry |

**GitHub Agentic Workflows** (`gh aw`) is a repository-native runtime for many of these loop components: scheduled and event triggers, Git-backed memory, enforced time and turn limits, and gated write outputs. The [agentic-lifecycle](../agentic-lifecycle/) talk covers it in depth.

---

<!-- 🎬 MAJOR SECTION: The Loop -->
## The Loop, Not the Prompt

The foundational shift in loop engineering is architectural: the prompt is no longer the primary unit of work. The *loop* is. A loop defines everything that surrounds a single agent interaction — what triggers it, what it's trying to achieve, how it verifies success, and what happens when something goes wrong.[^9]

Prompts are stateless and synchronous — they encode the developer's intent at a moment in time. Loops are stateful and asynchronous — they encode the system's intent over a time horizon, with memory, checkpoints, and adaptive behavior built in. Boris Cherny describes this transition plainly, as reported by The New Stack: stop writing prompts and start writing loops that write prompts.[^10]

### The Trigger: What Makes It Repeat

Without a recurring trigger, what we have is orchestration — useful, but one-shot. A loop becomes a loop when something fires it again: a person rerunning it, a schedule, or a prior pass's output signaling that more work remains.

Copilot CLI gives a local loop both kinds of kickoff. One prompt to the orchestrator runs a pass on demand. In experimental mode, `/every` repeats a prompt, skill, or schedulable slash command on an interval for the life of the session, and `/after` schedules a single later run.[^16]

| Kickoff | How |
|---------|-----|
| On demand | `copilot --agent=<orchestrator>`, then one prompt |
| Recurring | `/every 1h <prompt>` inside the session |
| Once, later | `/after 30m <prompt>` inside the session |
| Review or remove | `/every` with no arguments opens the schedule manager; select an entry and press `x` |

```
$ copilot --experimental
> /every 1d Use gh to review all open issues. Apply 'stale' to any with no
  activity for 3 days. Close issues stale for 7+ days with a polite note.
```

This is the simplest complete loop: `/every` is the trigger, the prompt encodes the goal and exit condition, and the session fires the pass again tomorrow. The schedule belongs to the session, so it runs while the CLI stays open on a machine that is awake. A loop that has to run around the clock without a session belongs in a repository-hosted runtime such as [GitHub Agentic Workflows](../agentic-lifecycle/). The orchestrator agent files and shared state store described above extend this pattern to multi-agent coordination.

### Anatomy of a Production Loop

Every production loop has the same five components, regardless of which agent or framework sits inside it.[^7][^8] The following design blueprint expresses all five as a single, self-documenting specification:

```yaml
# loop-anatomy.yml — Annotated Loop Blueprint (design spec; adapt into your orchestrator and CI)
# Based on patterns from cobusgreyling/loop-engineering and the LangChain loop engineering guide

loop:
  name: "pr-review-pipeline"
  version: "1.0"

  # ── 1. TRIGGER ─────────────────────────────────────────────────────
  # What starts the loop. One kickoff; no human prompting between iterations.
  trigger:
    type: schedule                      # manual | schedule
    runner: copilot-cli                 # /every 1h in an open CLI session
    interval: 1h
    check: open_prs_targeting_main_without_review
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
  # Each control names its enforcer: the agent (counted in state), the CLI, or the next pass.
  # These are siblings of execution — not afterthoughts appended later.
  controls:
    circuit_breaker:                    # enforced by the orchestrator's instructions
      max_iterations: 10
      timeout_minutes: 60
    bounded_execution:                  # enforced by Copilot CLI
      max_ai_credits: 5                 # /goal <pass prompt> --max-ai-credits 5
      deny_tools: ["shell(gh pr merge)", "shell(gh pr review)"]
    goal_watchdog:                      # enforced by the next /every pass
      stale_after_minutes: 60           # a run still locked after this escalates
      stall_threshold_iterations: 3     # escalate if no progress after 3 tries
      escalate_to: human-reviewer
```

The critical design principle: controls (section 5) are defined as siblings of execution (section 3), not as afterthoughts. In most systems that fail in production, controls were added after incidents, not before deployment.[^10]

This YAML expresses the pattern at production scale. The same five components live in the orchestrator agent's instructions and `loop-state.json` at simpler scales — the concepts are implementation-agnostic.

Some controls can be enforced outside the agent. In a Copilot CLI session, `--allow-tool` and `--deny-tool` bound what every agent in the loop can run, and deny rules win. On GitHub, branch protection and CODEOWNERS require human review before anything merges. GitHub Agentic Workflows adds enforced `max-turns`, `stop-after`, and per-output write limits for loops that run in the repository. For spend, Copilot CLI's `/goal` command accepts `--max-ai-credits N` and pauses autopilot when the objective reaches the cap.[^16] No Copilot surface caps tokens per agent, and an agent cannot read its own token use, so per-agent token budgets do not appear in these blueprints.

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
| `constraints` | The receiving agent's limits — deadline, iterations, confidence threshold; it escalates rather than exceed them |
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
| `Active` | Executing a step in the ReAct cycle | Record the step in `history` |
| `Idle` | Waiting for tool response or sub-agent result | Hold the `lock`; the next pass checks its age |
| `Suspended` | A limit fired — circuit breaker or credit cap; paused pending review | Alert orchestrator |
| `Escalated` | Goal unachievable within constraints; human needed | Hand off to human |
| `Terminated` | Goal verified; resources released | Write audit trail |

The `Idle → Suspended` transition is where most silent failures hide. An agent waiting for a tool that never responds sits in `Idle` until something outside it notices.[^10] In a local loop, a person sees the stalled call in the transcript and presses Esc, and the next `/every` pass finds the run's lock past its stale threshold and escalates it.

---

<!-- 🎬 MAJOR SECTION: Orchestration Topologies -->
## Orchestration Topologies

Not all multi-agent problems have the same shape, and topology is the first architectural decision after defining the loop's goal. Selecting the wrong topology is expensive to undo — it's embedded in how agents communicate, how work is parallelized, and how failures propagate.[^4]

```yaml
# loop-topology.yml — Orchestration Design Blueprint (design spec; adapt into your orchestrator)
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
    max_ai_credits: 3                 # /goal ... --max-ai-credits 3
  goal_watchdog:
    stale_after_minutes: 30           # checked by the next /every pass
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

A control stops the loop only as reliably as whatever enforces it. Name the enforcer for every limit before you schedule a loop.

| Control | Enforcer | In the [loop starter](./examples/loop-starter/) | What it promises |
|---|---|---|---|
| **Circuit breaker** | The orchestrator, following its instructions | `max_iterations: 8`, `timeout_minutes: 45`, `critic.max_rejections: 2`, checked before every dispatch | Stops the run when the orchestrator counts correctly; `history` shows whether it did |
| **Bounded execution** | Copilot CLI | `/goal … --max-ai-credits 5`; `--deny-tool` for merge and review | Pauses spend at the cap and blocks denied commands, whatever the agent intends |
| **Goal-watchdog** | The next pass | Each pass reads `lock`; a run locked for more than 45 minutes escalates as `stale_run` | Catches a run that stopped part-way |

**1. Circuit breaker — rules the agent follows.** The orchestrator reads its counters from `loop-state.json` before every dispatch and escalates when one crosses its limit. This is instruction-following: if the orchestrator miscounts or skips the check, nothing else stops the run. Keep the counters in state, where you can audit them — `iteration_count` matches the length of `history` in a healthy run — and pair the breaker with the two controls that hold without the agent's cooperation.

**2. Bounded execution — limits the CLI enforces.** Copilot CLI's `/goal` command (also `/autopilot`) runs an objective in autopilot mode and accepts `--max-ai-credits N`. When the objective reaches the cap, autopilot pauses and reports credits used; you resume by setting a fresh cap.[^16]

```text
/goal Run one pass of the security-advisory loop from .github/loop-state.json. --max-ai-credits 5
```

The cap counts AI credits for the objective as a whole. No Copilot surface caps tokens per agent, and an agent cannot read its own token use, so a token budget written into a task envelope is a number the agent cannot measure. Use the credit cap for spend and `--deny-tool` for actions that must never happen, such as merging.

**3. Goal-watchdog — the next pass checks.** Nothing in a CLI session watches the loop on its own clock, but `/every` starts a fresh pass on one. Each pass begins by reading `lock`. A run still marked `running` with a lock older than 45 minutes stopped without finishing — the session exited, the machine slept, or the credit cap paused it — so the pass escalates it as `stale_run` rather than resuming in a half-changed worktree. A tool call that hangs inside a live pass shows in the transcript; Esc stops it, and the next pass escalates the stranded run.

### Read the Evidence Before You Schedule It

The three controls earn trust when a run shows them working. Run the first pass by hand, then read the state file and the draft PR before you add `/every`:

| Look at | Healthy result | Signal to act on |
|---|---|---|
| `history` in `loop-state.json` | One entry per dispatch; `iteration_count` matches its length | A count mismatch: a worker ran without the orchestrator recording it |
| `goal.conditions.*.evidence` | The orchestrator's own command output, timestamped after the last fix | Evidence that repeats a worker's claim, or predates the fix |
| `critic.last_verdict.verified` | The checks the critic reproduced itself | An approval with an empty list: the critic took the fix agent's word |
| The PR diff | Only files in `constraints.touch_only` | Files outside the list: tighten the fix agent's constraints |
| `status` and `escalation` | `awaiting_review`, or `escalated` with a named reason | `escalated` with `stale_run`: a pass stopped part-way; read its last `history` entry |

Each row is a control you can see. When a row looks wrong, change the agent instruction that produced it and run one more pass by hand. The [loop starter](./examples/loop-starter/) includes a [sample run](./examples/loop-starter/loop-state.example-run.json) where the critic rejects the first fix, so you can compare a healthy trail against your own.

---

<!-- 🎬 MAJOR SECTION: Full Pipeline -->
## Wiring It All Together

The following worked design assembles all five sections into a complete multi-agent pipeline: a security advisory response that runs from trigger to verified draft PR without anyone prompting the agents in between. A human reviews and merges the result.

The loop runs from a Copilot CLI session. An `/every 1h` pass (or a pass someone starts by hand) checks Dependabot alerts with `gh api` and starts work when a new high or critical alert appears.[^16]

```yaml
# copilot-loop-pipeline.yml — Multi-Agent Security Advisory Response Pipeline (design spec)
# Demonstrates: trigger → orchestrator → workers → critic → verified PR

loop:
  name: "security-advisory-response"
  version: "1.0"
  description: >
    When a new high or critical Dependabot alert appears for a dependency we use,
    automatically analyze the codebase, generate a fix, validate it with a critic,
    and open a draft PR for human sign-off.

  # ── TRIGGER ─────────────────────────────────────────────────────────────────
  trigger:
    type: schedule                    # manual | schedule
    runner: copilot-cli               # /every 1h in an open CLI session
    interval: 1h
    check: new_dependabot_alerts      # gh api repos/{owner}/{repo}/dependabot/alerts
    filter: "alert.severity in ['high', 'critical']"
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
    bounded_execution:              # enforced by Copilot CLI
      max_ai_credits: 5             # /goal <pass prompt> --max-ai-credits 5
      deny_tools: ["shell(gh pr merge)", "shell(gh pr review)"]
    goal_watchdog:                  # enforced by the next /every pass
      stale_after_minutes: 45
      stall_threshold_iterations: 2
      escalate_to: security-team
```

### Runtime Walkthrough (illustrative)

The timings below show how the design is intended to run. They are illustrative, not measurements from an observed run.

| Time | Event |
|------|-------|
| T+0 min | An `/every 1h` pass finds a new critical Dependabot alert |
| T+0 min | Loop trigger activates; copilot-planner initializes with codebase index and dependency graph |
| T+1 min | Planner dispatches task envelope to `vuln-scan-agent` with its scope, constraints, and `escalate_on` conditions |
| T+3 min | Scan agent returns `affected_files_report`; planner dispatches to `fix-proposal-agent` |
| T+7 min | Fix agent returns `proposed_diff`; planner dispatches to `test-runner-agent` |
| T+10 min | Test results arrive; `security-critic-agent` evaluates fix quality and test coverage |
| T+11 min | Critic approves (confidence 0.91 > 0.85 threshold); planner dispatches to `pr-author-agent` |
| T+12 min | Draft PR is opened; verification layer checks all four goal conditions |
| T+18 min | CI completes; all goal conditions met; loop terminates and requests review from `security-team` |
| T+18 min | Full audit trail written: trace_id, per-dispatch history, decision chain |

Target: about 18 minutes from alert to a reviewable draft PR, with no one prompting the agents along the way. The security team spends its attention on one review and the merge decision. Full provenance via `trace_id`.

---

## Real-World Use Cases

### Use Case 1: Continuous Dependency Health

**The Scenario:** A platform team wants every dependency update — security patches, minor bumps — reviewed, tested, and merged automatically without occupying developer attention.

**How It Works:** A weekly kickoff starts a flat-pool topology that spawns one `dependency-review-agent` per package with a pending update. Each runs its own ReAct cycle, produces a proposed update and test results, and a critic validates before the finalizer opens batched PRs.

**Example:**
```yaml
trigger:
  type: manual                     # Monday morning: copilot --agent=dependency-orchestrator
  scope: all_dependencies_with_updates_available
topology: flat-pool
goal:
  verifiable_conditions:
    - check: "pr.ci_passing and not breaking_change_detected"
```

**What We Get:** Dependency hygiene maintained on a weekly cadence; developers review ready-to-merge PRs rather than raw dependency diffs, which frees attention on high-churn repositories.

---

### Use Case 2: Background Refactor Campaign

**The Scenario:** An engineering org wants to migrate 200 service files from a deprecated internal API to its replacement — without blocking feature development.

**How It Works:** A pipeline topology processes files in batches: `analysis-agent` identifies call sites, `refactor-agent` rewrites them, `test-runner-agent` validates, and a critic spot-checks for semantic drift. Each `/every 2h` pass takes the next ~20 files, and the state file records where the campaign left off.

**Example:**
```yaml
trigger:
  type: schedule
  runner: copilot-cli             # /every 2h during the working day
  interval: 2h
  scope: files_using_deprecated_api
  batch_size: 20
topology: pipeline
goal:
  verifiable_conditions:
    - check: "all_batch_files_migrated and test_suite.regression_count == 0"
```

**What We Get:** A 200-file migration that progresses batch by batch without a dedicated migration sprint, with the test suite and critic gating every batch before review.

---

### Use Case 3: Automated Code Review Pipeline

**The Scenario:** A team wants automated code review covering correctness, security, test coverage, and documentation completeness — four distinct concerns that a single reviewer struggles to cover consistently.

**How It Works:** A hierarchical topology with four specialized reviewer agents, each with its own task envelope and bounded scope. A critic aggregates findings, removes duplicates, and surfaces a ranked list. The orchestrator posts results as a structured PR review comment.

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

**What We Get:** Consistent four-dimensional review on every PR, with security findings surfaced at review time instead of waiting for a dedicated security pass.

---

## 🗓️ What We Can Do Today

### In 15 Minutes

- [ ] Start `copilot --experimental` and use `/every 1d` to repeat a simple triage prompt — this is the minimum viable loop trigger, and the fastest way to experience what makes a loop repeat rather than run once[^16]
- [ ] Read the [sample run](./examples/loop-starter/loop-state.example-run.json) and trace each goal condition to its evidence, using the [evidence checklist](#read-the-evidence-before-you-schedule-it)
- [ ] Write out one recurring multi-step agent task as a goal with verifiable conditions — not a description, a checkable criterion

### In 1 Hour

- [ ] Add the three controls to an existing agent loop: `max_iterations` and `timeout_minutes` in its state file, `/goal … --max-ai-credits` for spend, and a stale-lock check at the start of each pass
- [ ] Convert an existing inter-agent message format to a typed task envelope with `trace_id`, `constraints`, and `escalate_on` fields
- [ ] Copy the [loop starter](./examples/loop-starter/) into a test repository, run one pass by hand, and check every row of the evidence checklist before adding `/every 1h`

### In 2–4 Hours

- [ ] Wire a three-agent hierarchical pipeline (orchestrator → worker → critic) using `loop-topology.yml` as a base, with full task-envelope handoff between agents and a shared `circuit_breaker` in the controls section
- [ ] Make the evidence checklist part of the loop: have the orchestrator write each row's result into the draft PR body, so reviewers see the controls working alongside the fix
- [ ] Move one loop's hard limits out of the agent: start its CLI session with `--deny-tool` rules for merge and review, or rebuild it as a [GitHub Agentic Workflow](../agentic-lifecycle/) with `max-turns` and `stop-after`

---

## Related Patterns

- **[From Repo to Feature](../repo-to-feature/)** — The guided counterpart: you drive each step of one feature in VS Code and leave behind prompts, skills, and plans. Those assets are what an unattended loop runs on a schedule.
- **[Multi-Agent Coordination](../multi-agent-coordination/)** — How to compose isolated workstreams; loop engineering provides the production-control layer for unattended operation
- **[GitHub Agentic Workflows](../agentic-lifecycle/)** — Evidence-gated repository workflows; loop engineering extends this with dynamic, verification-driven execution and adaptive topology
- **[MCP Apps](../mcp-apps/README.md)** — Model Context Protocol as the tool layer inside a loop's execution layer; MCP tools are what loop agents invoke when they act

---

## 📖 References

### Official Documentation

[^1]: **[cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering)** — Pattern library for operating agents around a codebase: daily triage, PR babysitter, CI sweeper, dependency sweeper, and more, each with a cadence and a report-only first week. Inspired by Addy Osmani and Boris Cherny.

[^2]: **[gim-home/herald](https://github.com/gim-home/herald)** — The herald agent management harness: declarative lifecycle management (Created → Active → Escalated → Terminated state machine), structured message bus, health monitoring, and inter-agent coordination primitives.

[^14]: **[Custom agents configuration — GitHub Docs](https://docs.github.com/en/copilot/reference/custom-agents-configuration)** — Tool aliases for custom agent files: `read`, `edit`, `search`, `execute`, `agent` (invokes a different custom agent), and namespaced MCP tools such as `github/*`. Verified 2026-10-22.

[^16]: **[GitHub Copilot CLI command reference — GitHub Docs](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)** — `/every [INTERVAL] PROMPT` schedules a recurring prompt for the current session (experimental mode); `/after` schedules a one-time run; `/goal` (alias `/autopilot`) runs an objective in autopilot mode and `--max-ai-credits N` pauses it when its AI-credit spend reaches the cap; `--agent` selects a custom agent; `--allow-tool` and `--deny-tool` scope permissions for the session. Verified 2026-10-22.

### Blog Posts & Guides

[^3]: **[Anthropic Engineer: Build Loops That Prompt AI, Not Single Prompts](https://explainx.ai/blog/anthropic-engineer-loops-prompts-ai-coding-harness-engineering-2026)** — Secondary write-up of Boris Cherny's loop engineering methodology. Productivity figures it cites are not independently sourced and are not used in this talk.

[^4]: **[Agentic Loops: From ReAct to Loop Engineering (2026 Guide)](https://datasciencedojo.com/blog/agentic-loops-explained-from-react-to-loop-engineering-2026-guide/)** — Data Science Dojo's 2026 guide: complete loop anatomy, the trigger + verifiable-goal structure, and why loop engineering supersedes prompt engineering as the primary unit of agent system design.

[^5]: **[The Art of Loop Engineering — LangChain Blog](https://www.langchain.com/blog/the-art-of-loop-engineering)** — LangChain's practitioner guide: custom loop termination logic, dynamic replanning, nested/recursive loops, state management, and error recovery patterns in production agentic systems.

[^6]: **[10 Loop Engineering Design Patterns for AI Builders (2026)](https://datasciencedojo.com/blog/loop-engineering-design-patterns/)** — Taxonomy of the 10 named patterns across three tiers: Foundational (ReAct, Reflection, Tool-use, Memory-augmented), Practitioner (Multi-agent, Hierarchical, Critic), Production Controls (Circuit Breaker, Bounded Execution, Goal-watchdog).

[^7]: **[Loop Engineering — O'Reilly Radar](https://www.oreilly.com/radar/loop-engineering/)** — O'Reilly's analysis of loop engineering as an emerging discipline: the four-layer architecture (trigger → execution → verification → control) and its relationship to classical software design patterns.

[^8]: **[AddyOsmani.com — Loop Engineering](https://addyosmani.com/blog/loop-engineering/)** — Addy Osmani's practitioner framing: the developer's job shifts from writing prompts to writing loops; the loop as the atomic unit of autonomous system design rather than the individual prompt.

[^9]: **[What Is Loop Engineering? Beyond Prompt Engineering in 2026](https://explainx.ai/blog/what-is-loop-engineering-ai-agents-2026)** — ExplainX's 2026 overview of loop engineering as the successor paradigm to prompt engineering, with focus on the trigger-goal-verify architecture and production control patterns.

[^10]: **[The Anthropic Leader Who Built Claude Code Says He Ditched Prompting](https://thenewstack.io/loop-engineering/)** — The New Stack's reporting on loop engineering adoption at Anthropic, and why Boris Cherny moved from hand-crafted prompts to loops as the primary unit of agent management.

[^11]: **[Loop Engineering: Why Boris Cherny Writes Loops](https://blog.pebblous.ai/blog/loop-engineering/en/)** — Pebblous AI's breakdown of the ReAct-inside-loop architecture: how loop engineering wraps rather than replaces the ReAct (Reason → Act → Observe) foundation, keeping the two concerns cleanly separated.
