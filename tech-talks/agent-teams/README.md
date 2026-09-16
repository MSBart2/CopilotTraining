---
status: active
updated: 2026-03-17
section: "Delegate and Coordinate"
audience: [developer, team-lead, architect]
level: advanced
duration: 60
format: core-talk
decision: "When should work be split among specialized agents?"
prerequisites: [agent-dev-loop]
related: [loopy-agents, copilot-app, agentic-sdlc]
references:
  - url: https://code.visualstudio.com/docs/copilot/customization/custom-agents
    label: "Custom agents in VS Code"
    verified: 2026-02-12
  - url: https://code.visualstudio.com/docs/copilot/agents/subagents
    label: "Subagent invocation and parallel execution"
    verified: 2026-03-17
  - url: https://code.visualstudio.com/updates/v1_109#_agent-orchestration
    label: "VS Code v1.109 agent orchestration features"
    verified: 2026-02-12
  - url: https://code.visualstudio.com/docs/copilot/agents/background-agents
    label: "Background agents documentation"
    verified: 2026-03-17
  - url: https://git-scm.com/docs/git-worktree
    label: "Git worktrees reference"
    verified: 2026-03-17
  - url: https://code.visualstudio.com/updates/v1_109#_agent-session-management
    label: "VS Code v1.109 agent session management"
    verified: 2026-03-17
  - url: https://github.com/bradygaster/squad
    label: "Squad — production-ready agent team system"
    verified: 2026-02-12
  - url: https://github.com/Sentry01/AgentCouncil
    label: "AgentCouncil — multi-model collaborative/adversarial deliberation"
    verified: 2026-03-17
---

# Building Agent Systems: Subagents, Teams, and Autonomous Execution

> **The Question This Talk Answers:**
> *"What are the mechanisms that make multi-agent AI work—and how do I compose them into systems that handle complex tasks, run autonomously, and improve over time?"*

**Duration:** 60 minutes | **Target Audience:** Developers / Architects / Engineering Managers

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Multi-agent patterns solve the single-agent ceiling — understanding the mechanisms is essential for applying any pattern correctly |
| **Compelling** | 🟢 High | Walks from zero to full autonomous teams: subagents (today, no setup) → Squad (10 min) → background agents (85 min → 27 min) → AgentCouncil deliberation |
| **Actionable** | 🟢 High | Every layer has immediate actions: subagent hints in chat, Squad via `npx`, background agents built into VS Code 1.109, AgentCouncil via `git clone` |

**Overall Status:** 🟢 Ready to use

---


## The Problem

### Key Points

- **Single agents hit a hard ceiling around 300-500 LOC or 3-4 hours of work**
  Context accumulates: planning notes pollute implementation, dead-end research stays forever, and quality degrades measurably as the window fills.

- **Supervision is the bottleneck, not intelligence**
  Traditional AI workflows demand continuous human guidance. Answering questions, approving approaches, monitoring progress — can't parallelize when you can't look away.

- **Context pollution degrades quality measurably**
  One agent juggling research + planning + implementation accumulates 50-80% irrelevant context before reaching execution. Output quality drops 30-40%.

- **Workspace conflicts prevent multi-agent work**
  Multiple agents sharing one workspace create merge conflicts and file collisions. Without isolation, parallelism is dangerous.

### Narrative

You ask one agent to research authentication patterns, analyze existing code structure, and implement a login feature. By the time it reaches implementation, the context window contains 18K tokens of research notes (only 800 relevant), four rejected explorations, and twelve dead-end file investigations. Quality suffers. Token costs explode.

You try to run two agents simultaneously—but they collide on the same files. You try to supervise both—context switching destroys your own productivity.

These aren't model problems. They're architecture problems. The solution isn't a smarter single agent. It's composing agents the way you'd compose a team: isolated working environments, specialized roles, clear handoffs, and knowledge that compounds over time.

This talk covers the full stack — from the primitive mechanism (subagents) through production patterns (teams, autonomous execution, multi-model deliberation).

---

## The Solution: Multi-Agent Composition

### What It Does

Multi-agent systems decompose complex development work across specialized agents, each running in its own isolated context. A coordination layer manages delegation, sequencing, and result synthesis — individual agents only need to know their domain.

Three mechanisms make this work:
1. **Subagents** — isolated context windows for delegation and parallelism
2. **Background agents + Git worktrees** — autonomous execution without supervision
3. **Role-specialized agents / multi-model ensembles** — expertise over generalism

### Key Capabilities

- **Context Isolation**: Each subagent runs in its own window — research, dead-ends, and exploration never pollute the coordinating session
- **Parallel Execution**: Independent subtasks run simultaneously — 3 research subagents = 3x throughput with 0 extra supervision
- **Autonomous Background Execution**: Hand off to a background agent in its own worktree, resume with finished work — 85 active minutes → 27
- **Role Specialization**: Custom agents with focused tools and instructions outperform generalists by 20-30% in their domain
- **Persistent Teams**: Squad gives you specialists that live in your repo, compound knowledge across sessions, and grow with your codebase

---

## 📦 Key Artifacts

### Mechanism-Level (No Setup Required)

- **Implicit subagent invocation** — Chat prompts that trigger isolated context delegation: `"Run a subagent to research..."`
- **Explicit prompt files** — `.md` files with frontmatter declaring `tools: ['agent', 'read', 'edit']` and multi-phase workflows
- **Control frontmatter** — `user-invokable: false`, `agents: ['Red', 'Green', 'Refactor']`, `disable-model-invocation` for orchestration structure
- **Background agent hand-off** — VS Code 1.109 session picker + worktree creation built-in, no additional tooling required

### Team-Level (10-Minute Setup via Squad)

- **[Squad Repository](https://github.com/bradygaster/squad)** — Complete agent team system: persistent memory, parallel execution, GitHub Issues integration
- **`.ai-team/team.md`** — Roster: who's on the team and their roles
- **`.ai-team/agents/{name}/charter.md`** — Identity, expertise, boundaries, voice, model preferences per agent
- **`.ai-team/agents/{name}/history.md`** — Personal knowledge accumulated across sessions
- **`.ai-team/routing.md`** — Work routing table: who handles what
- **`.ai-team/decisions.md`** — Shared decision log all agents read before working

### Deliberation-Level (No Build Required)

- **[AgentCouncil Repository](https://github.com/Sentry01/AgentCouncil)** — Copilot CLI skill: Claude + GPT + Gemini in parallel, collaborative or adversarial modes
- **`skills/agent-council/skill.md`** — Drop-in skill for any Copilot CLI session (`council: your question`)
- **`agents/AgentCouncil.agent.md`** — Standalone agent (`copilot --agent AgentCouncil "..."`)

> **Pattern distinction:** Subagents are the *mechanism*. Teams are *organized patterns built on that mechanism*. Background agents are *supervision-free subagents in isolated branches*. AgentCouncil is *model-diversity deliberation* — complementary to role specialization. All four compose naturally.

---

## 🎯 Mental Model Shift

> **The Core Insight:** From "one smart agent handles everything" to "the right agent for the right task, with the right isolation, at the right time"

### Move Toward (Embrace These Patterns)

- ✅ **Delegation with Isolation**: Break complex tasks into focused phases and delegate to subagents — keeps coordinator context clean, enables parallelism, isolates failures
- ✅ **Summary-Only Returns**: Subagents return structured findings, not full exploration logs — 4-6x token reduction, cleaner decision rationale
- ✅ **Tool Constraints = Role Enforcement**: Planners have read-only tools; implementers have edit tools; reviewers have analysis tools — system-enforced boundaries, not just prompting
- ✅ **Hand-Off Over Supervision**: Plan once (15 min) → hand off to background agent → review finished work (10 min) — 65-82% reduction in active time
- ✅ **Knowledge Compounding**: Agents that write what they learned (`history.md`) start every session smarter than the last

### Move Away From (Retire These Habits)

- ⚠️ **Everything in Main Context**: Research + planning + implementation in one agent session → context bloat degrades quality, prevents parallelization
- ⚠️ **Supervised Execution**: Monitoring agent progress continuously, answering mid-task questions → can't parallelize, supervision is the bottleneck
- ⚠️ **General Tools for All Roles**: Planner with edit access, reviewer who can commit → accidental implementation during planning, biased review

### Move Against (Active Resistance Required)

- 🛑 **Vague Subagent Tasks**: Delegating without scope or output format → unusable summaries, wasted delegation overhead
- 🛑 **Sequencing What Can Parallelize**: 3 independent research tasks run back-to-back → 3x longer with no benefit from isolation
- 🛑 **Raw Returns from Subagents**: Full file contents / raw search results instead of structured findings → explodes coordinator context, defeats isolation

> **Example Transformation:** Before: Single agent with 15 tools spends 80% context on research/planning notes, outputs mediocre implementation after 4 hours of supervision. After: Coordinator delegates research to 3 parallel subagents (structured summaries, 2K tokens total back), hands implementation off to background agent in its own worktree, reviews finished PR. Total active time: 40 minutes. Each agent at 90%+ effectiveness.

---

## When to Use This Pattern

### The Unified Decision Tree

```
Q: What's the nature of your task?
│
├─ Simple, single-phase (< 200 LOC, 1-2 files)
│  → Use Plan Mode (built-in, no setup)
│
├─ Multi-phase, one role (research → analyze → implement)
│  → Use a single subagent per phase — Section 1 of this talk
│  └─ "Run a subagent to research X, then implement based on the summary"
│
├─ Needs specialized roles (planner + coder + reviewer)
│  → 👉 Agent Teams pattern — Section 2 of this talk
│  └─ Setup: 10 minutes with Squad
│
├─ Needs autonomous execution, no supervision
│  → 👉 Background Agents + Worktrees — Section 3 of this talk
│  └─ Built into VS Code 1.109 — no additional setup
│
├─ Architecture decision under uncertainty
│  → 👉 AgentCouncil adversarial mode — Section 4 of this talk
│  └─ Setup: git clone + one skill file
│
└─ At scale: agent teams + CI/CD + org-wide patterns
   → See: Agentic SDLC
```

### Comparison Matrix

| Aspect | Plan Mode | Subagents | Agent Teams | Background Agents | AgentCouncil |
|--------|-----------|-----------|-------------|-------------------|--------------|
| **Best For** | Simple features | Multi-phase isolation | Role specialization | Autonomous execution | Decision deliberation |
| **Setup Time** | 0 | 0 | 10 min (Squad) | 0 (built-in) | 5 min |
| **Supervision** | Interactive | Summary review | Checkpoint gates | Final review only | None |
| **Throughput** | 1x | 2-3x | 3-5x (specialists) | 5-10x (async) | N/A |
| **Context Isolation** | None | High (subagent windows) | High (per-agent) | High (worktrees) | High (per model) |
| **Key Mechanism** | None | `runSubagent` | Coordinator + charters | Background + git worktree | Claude + GPT + Gemini |

---

<!-- 🎬 MAJOR SECTION: Subagents: The Building Block -->
## Subagents: The Building Block

*The primitive mechanism that makes all multi-agent patterns possible*

### Core Mechanism

Subagents run in **isolated context windows** separate from the main chat session. The main agent delegates a task — "research authentication patterns" — and VS Code spawns a subagent with its own context. The subagent works autonomously: reading files, searching code, exploring options. When complete, only the final summary returns. All intermediate exploration stays isolated.

```
MAIN AGENT (coordinates)
│
├── SubAgent A: research auth patterns    ← own 200K context
│   reads 30 files, explores 5 approaches     ← never pollutes main
│   returns: 500-token structured summary  ──→ main receives this only
│
├── SubAgent B: analyze test coverage     ← own 200K context
│   runs coverage tools, finds gaps            ← independent execution
│   returns: 300-token findings          ──→ main receives this only
│
└── SubAgent C: security audit           ← own 200K context (parallel)
    checks OWASP patterns                      ← no shared state
    returns: 400-token risk report       ──→ main receives this only
```

**Key characteristics:**
- Each subagent runs in its own context window — research, dead-ends, and exploration never accumulate in the main session
- Multiple subagents run simultaneously when tasks are independent
- Only the final result passes back — typically 100-500 tokens vs. 5K-20K if done in main context
- Subagents inherit the main session's agent and model by default (override with custom agents)

### Two Invocation Patterns

#### Pattern 1: Implicit (Chat Hints)

Just describe the delegation in natural language:

```
Run a subagent to research OAuth2 implementation patterns in Node.js,
focusing on token storage best practices and refresh rotation strategies.
Return a structured summary with: recommended libraries, tradeoffs, and risks.
```

The main agent interprets intent and spawns a subagent. When it finishes, only the summary comes back. The main context never sees the 15 files read or 4 rejected approaches explored.

**Best for:** Exploratory research, ad-hoc delegation, quick investigative subtasks.

#### Pattern 2: Explicit (Prompt Files)

Define multi-phase workflows in `.md` files with frontmatter:

```markdown
---
name: feature-research-workflow
tools: ['agent', 'read', 'search', 'edit']
---
## Phase 1: Codebase Research (Subagent)
Research existing patterns in the codebase for this feature type.
Return: Patterns, Reusable Components, Constraints sections.

## Phase 2: Industry Best Practices (Subagent)
Research security considerations and recommended libraries.
Return: Libraries, Security, Performance sections.

## Phase 3: Implementation
Using Phase 1-2 findings, implement following established patterns.
```

**Best for:** Reproducible workflows, version-controlled procedures, team-wide consistency.

### Parallel Subagents

Independent tasks run simultaneously:

```
Analyze this authentication module using three parallel subagents:
1. Security: Check vulnerabilities, auth bypass risks, token handling
2. Performance: N+1 queries, token validation overhead, memory leaks
3. Testing: Coverage gaps, missing edge cases, test utility reuse

Synthesize findings into prioritized action items with severity levels.
```

**What happens:** 3 subagents spawn simultaneously. Each works in its own context. Main agent receives 3 structured summaries and synthesizes. Serial time: ~22 minutes. Parallel time: ~8 minutes. **2.75x faster, with independent analysis from each.**

### Custom Agents as Subagents

By default, subagents use the main session's agent. To apply specialized behavior — security-focused analysis, strict TDD enforcement — run a custom agent as a subagent:

```markdown
---
name: Security-Review
description: OWASP-lens code analysis
tools: ['read', 'search', 'grep']
user-invokable: false        ← hidden from dropdown, available as subagent
---
You are a security expert specializing in OWASP Top 10.
Return findings as: Critical / High / Medium / Low.
```

**Invocation:**
```
Use the Security-Review agent as a subagent to audit src/auth/.
Return critical and high findings only.
```

### Control Frontmatter Properties

| Property | Default | Purpose |
|----------|---------|---------|
| `user-invokable: false` | — | Hide from agent dropdown; internal helper only |
| `disable-model-invocation: true` | — | Prevent AI from spawning this as subagent (root orchestrators) |
| `agents: ['Red', 'Green', 'Refactor']` | all | Restrict which subagents this agent can spawn |

### Anti-Patterns

| ❌ Anti-Pattern | Problem | ✅ Fix |
|-----------------|---------|--------|
| **Over-delegation**: "run a subagent to read config.json" | Subagent overhead (2-3s) > task itself (<1s) | Delegate tasks involving 5+ files or complex analysis |
| **Vague tasks**: "research authentication" | Returns generic prose, not actionable findings | Specify scope, output format, and success criteria |
| **Ignoring results**: 3 subagents report, main agent posts summaries raw | User must synthesize manually | Instruct main agent to synthesize into prioritized actions |

---

<!-- 🎬 MAJOR SECTION: Agent Teams: Organized Specialists -->
## Agent Teams: Organized Specialists

*Role-based coordination via the coordinator-delegate pattern — with Squad as the production implementation*

### The Coordinator Pattern

The coordinator separates "what to do" (orchestration) from "how to do it" (specialized execution). The coordinator never implements directly — it routes work, spawns specialists, enforces review protocols, and aggregates results.

```
┌─────────────────────────────────────────────────┐
│              COORDINATOR                         │
│  Routes work → specialist subagents             │
│  Enforces reviewer protocol                     │
│  Selects models per task (cost-first)           │
│  NEVER implements directly                      │
└─────────────────────────────────────────────────┘
         │           │           │
    ┌─────────┐ ┌─────────┐ ┌─────────┐
    │  LEAD   │ │ DEV(S)  │ │ TESTER  │
    │ Scope   │ │ Build   │ │ Test    │
    │ Review  │ │ Code    │ │ QA      │
    │ Decide  │ │ Debug   │ │ Edge    │
    └─────────┘ └─────────┘ └─────────┘
      Own ctx     Own ctx     Own ctx
         │           │           │
         └─────────────────────────→ 🧠 SHARED MEMORY
                                     decisions.md + history.md
```

**Tool assignment enforces role boundaries:**

| Role | Tools | Why Restricted |
|------|-------|----------------|
| Research | `search`, `fetch` | Read-only — can't accidentally modify |
| Planning | `search`, `create` (docs only) | Documents plans, can't implement |
| Implementation | `edit`, `create`, `delete` | Full power, scoped to execution |
| Review | `search`, `analysis`, `linter` | Read + analyze, can't modify |
| Testing | `search`, `create`, `runTests` | Create tests + verify |

VS Code validates tool access before invocation — impossible, not just discouraged.

### Squad: The Production Implementation

**Repository:** [github.com/bradygaster/squad](https://github.com/bradygaster/squad)

Squad gives you a persistent AI development team through GitHub Copilot. Specialists live in your repo as files, learn your codebase, share decisions, and compound knowledge across sessions. Install in one command:

```bash
npx github:bradygaster/squad
```

**Form your team by describing your project:**
```
You: "Set up the team. I'm building a recipe sharing app with React and Node."

Squad proposes:
  🏗️ Ripley   — Lead          Scope, decisions, code review
  ⚛️ Dallas   — Frontend Dev  React, UI, components
  🔧 Kane     — Backend Dev   APIs, database, services
  🧪 Lambert  — Tester        Tests, quality, edge cases
  📋 Scribe   — (silent)      Memory, decisions, session logs
```

**Routing in action — address agents directly or fan out:**
```
> Ripley, fix the error handling in the API
> Team, build the login page   ← fans out to all agents in parallel
```

**Memory layers — knowledge compounds with use:**

| Layer | What | Who Reads |
|-------|------|-----------|
| `charter.md` | Identity, expertise, boundaries, voice | The agent itself |
| `history.md` | Project-specific learnings (per-agent) | That agent only |
| `decisions.md` | Team-wide decisions | All agents |
| `skills/` | Reusable patterns earned from real work | All agents |

| Stage | What Agents Know |
|-------|-----------------|
| 🌱 First session | Project description, tech stack |
| 🌿 After a few sessions | Conventions, component patterns, API design |
| 🌳 Mature project | Full architecture, tech debt map, performance conventions |

**Key Squad mechanisms:**
- **Reviewer Protocol**: On rejection, original agent is locked out — a different agent must revise. No self-review loops.
- **Ralph (Work Monitor)**: Continuously checks for pending work (open issues, draft PRs, CI failures) and keeps the team moving. Self-chains: work done → check backlog → triage → assign → spawn.
- **Ceremonies**: Design Review triggers before multi-agent tasks. Retrospective triggers after build failures.
- **Cost-first model routing**: docs/planning → Haiku; code → Sonnet; visual work → Opus.

---

<!-- 🎬 MAJOR SECTION: Autonomous Execution: Background Agents + Worktrees -->
## Autonomous Execution: Background Agents + Worktrees

*Shift supervision from continuous to review-only — and run multiple agents safely in parallel*

### The Problem with Supervised Execution

Traditional AI workflows require constant presence: answering questions, approving approaches, monitoring progress. Two supervised agents require twice the attention. Three require splitting focus so thin that quality suffers. And multiple agents editing the same files creates merge conflicts.

Human attention is the bottleneck. The fix is architectural.

### Git Worktree Isolation

Git worktrees create independent working directories that share the same repository (`.git/`). Each background agent gets its own worktree — its own branch, its own filesystem space.

```
repo/                         shared repository (single .git/)
├── main/src/main.js          ← your active work (untouched)
├── worktree-agent-1/src/main.js   ← Agent A workspace
└── worktree-agent-2/src/main.js   ← Agent B workspace
```

When VS Code starts a background agent (v1.109+):
1. `git worktree add worktree-agent-1 -b feature-branch`
2. Agent executes in `worktree-agent-1`, commits there
3. Your `main/` workspace is never touched

Agent A and Agent B can both edit `main.js` — different worktrees, zero conflicts.

**Lifecycle:** When the agent finishes, you review the branch, `git merge` if successful, or `git worktree remove` if not. Failed experiments disappear in 5 minutes (vs. 90 minutes reverting commits in a shared workspace).

### The Hand-Off Workflow

Three phases replace continuous supervision:

```
BEFORE: Supervised execution (1 task)
────────────────────────────────────────────────────
Plan (15 min) → Implement (60 min, supervised) → Review (10 min)
Active time: 85 minutes

AFTER: Background agent (1 task)
────────────────────────────────────────────────────
Plan (15 min) → Hand-off (2 min) ─────────────────┐ Review (10 min)
Active time: 27 minutes                            │     ↑
                                  Background:      └─────┘
                                  agent executes   (you did other work)
                                  in worktree

3 PARALLEL tasks (AFTER)
────────────────────────────────────────────────────
Plan all 3 (15 min total) → Hand-off (6 min total) → Review all 3 (30 min)
Active time: 51 minutes (vs. 255 min serial supervised)
```

**The math:** 10 tasks/week supervised = 850 min active. 10 tasks/week with background agents = 270 min active. **9.7 hours reclaimed per week.**

### Autonomous Success Requires Clear Hand-Offs

Agents succeed autonomously when the hand-off includes:
- **Explicit acceptance criteria**: "Generate tests achieving 80%+ coverage for auth module"
- **Constraints and non-goals**: "Do not modify database schema or change API contracts"
- **Links to related context**: Existing patterns, documentation, historical decisions

Vague hand-offs produce mid-task clarification requests, which defeat the purpose entirely.

### Three Parallel Patterns

**Independent Feature Development:**
```
Plan branches for Feature A, B, C →
Agent 1: implements Feature A (worktree-a)
Agent 2: implements Feature B (worktree-b)   ← all 3 in parallel
Agent 3: implements Feature C (worktree-c)
→ Review 3 finished PRs
```

**Experimental Variants (Empirical Evaluation):**
```
"Implement caching with: (1) Redis, (2) in-memory LRU, (3) hybrid disk/memory"
→ 3 agents implement 3 approaches in parallel (isolated worktrees)
→ Review actual implementations, run benchmarks, choose winner
→ Discard losing worktrees instantly
```

**Specialized Parallel Roles:**
```
"Refactor the auth module" →
Agent A (worktree-a): Implements refactoring
Agent B (worktree-b): Writes migration tests   ← simultaneously
Agent C (worktree-c): Updates API documentation
→ All finish, merge in dependency order
```

### CLI Fan-Out: `/fleet`

All three patterns above can be driven from the terminal using Copilot CLI's `/fleet` command — the explicit fan-out mechanism designed for exactly this kind of multi-part parallel execution.

```bash
# Explicit fan-out: Copilot decomposes and runs in parallel
/fleet implement Feature A in auth/, Feature B in payments/, Feature C in notifications/

# Works well with plan mode + autopilot:
# Shift+Tab → plan → "Accept plan and build on autopilot + /fleet"
```

`/fleet` works like the VS Code background agent patterns above, but from the terminal:
- Main agent acts as **orchestrator** — decomposes the prompt, assigns subtasks, manages dependencies
- Subtasks that can run in parallel do run in parallel; sequential dependencies are respected
- Each subagent has its **own context window** — no pollution between tasks
- **Custom agents** (`@test-writer`, `@security-reviewer`) are automatically matched to appropriate subtasks

**Best suited for:** test suite creation, multi-module refactoring, documentation across modules, updating dependencies across packages. Not useful for inherently sequential tasks where each step requires the previous step's output.

See: [Copilot CLI /fleet documentation](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet) · Full details in the [Copilot CLI tech talk](../copilot-cli/README.md)

---

<!-- 🎬 MAJOR SECTION: Multi-Model Deliberation: AgentCouncil -->
## Agent Council: When Different Models Think Differently

*A Copilot CLI skill that runs Claude, GPT, and Gemini in parallel — then has them build on each other's ideas or debate to stress-test the answer*

**Repository:** [github.com/Sentry01/AgentCouncil](https://github.com/Sentry01/AgentCouncil)

AgentCouncil takes a fundamentally different approach to agent teams: instead of **role specialization** (planner/implementer/reviewer), it uses **model diversity**. Three model families tackle the same problem independently, then interact — either by stealing each other's best ideas, or by attacking each other's positions.

The insight driving it: different models have different blind spots. Claude is good at nuance but may overcomplicate. GPT might miss edge cases Claude catches. Gemini has strong factual grounding but different reasoning patterns. Running them in parallel — then having them interact — surfaces what no single model can produce alone.

### The Ensemble

| # | Agent | Collaborative Role | Adversarial Role | Default Model |
|---|-------|--------------------|-----------------|---------------|
| 1 | **Alpha** | Deep Explorer | Drafter & Red Teamer | claude-opus-4.6 |
| 2 | **Beta** | Practical Builder | Fact-Checker & Validator | gpt-5.4 |
| 3 | **Gamma** | Elegant Minimalist | Optimizer & Devil's Advocate | gemini-3.1-pro |
| 4 | **Orchestrator** | Author (writes synthesis) | Judge (delivers verdict) | claude-opus-4.6 |

All models are configurable — swap any to match your access.

### Two Modes

#### Collaborative 🤝 (Default)
Agents explore the problem independently, then read each other's drafts and improve. The orchestrator authors the final synthesis from all three enriched perspectives.

```
Phase 1 (parallel): Alpha, Beta, Gamma each draft independently
Phase 2 (parallel): Each reads the other two drafts → writes improved version
Phase 3:            Orchestrator synthesizes all three enriched perspectives
```

**7 total model calls. Wall-clock ≈ 2 sequential subagent calls.**

Best for: brainstorming, design space exploration, research synthesis, any problem where diverse perspectives help.

#### Adversarial 🗡️
Agents draft independently, the orchestrator identifies the dominant position. The others attack it. A verdict is delivered.

```
Phase 1 (parallel): Alpha, Beta, Gamma each tackle the problem independently
Phase 2:            Orchestrator identifies strongest position (skips to verdict if consensus)
Phase 3 (parallel): Other two agents attempt to tear apart the leading position
Phase 4:            Orchestrator delivers verdict: SURVIVED / MODIFIED / OVERTURNED
```

**6 total model calls. Wall-clock ≈ 2 sequential subagent calls.**

Best for: architecture decisions you'll live with for years, security reviews, head-to-head technology comparisons.

### Mode Detection (Automatic)

| Trigger | Mode | Example |
|---------|------|---------|
| `council:`, `brainstorm:` | 🤝 Collaborative | `council: How should we structure the API?` |
| `debate:`, `stress-test:`, `vs` | 🗡️ Adversarial | `debate: Monorepo vs polyrepo` |
| `verbose council:` | 🤝 + narration | Shows each agent's draft + improvements |
| `verbose stress-test:` | 🗡️ + narration | Shows positions + attacks + verdict |

### Installing AgentCouncil

```bash
git clone https://github.com/Sentry01/AgentCouncil.git
# As a Copilot CLI skill
cp skills/agent-council/skill.md ~/.copilot/skills/agent-council/skill.md
# As a standalone agent
cp agents/AgentCouncil.agent.md ~/.copilot/agents/AgentCouncil.agent.md
```

No dependencies. No build. Just markdown files that Copilot CLI reads.

### When to Use AgentCouncil vs. Squad

| Situation | Use | Why |
|-----------|-----|-----|
| "What's the right architecture?" | AgentCouncil 🗡️ | Stress-test across model families before committing |
| "Brainstorm caching strategies" | AgentCouncil 🤝 | Diverse perspectives, novel synthesis |
| "Build the authentication system" | Squad | Role specialists execute with persistent memory |
| "Review this PR for security issues" | AgentCouncil 🗡️ | Multiple models attack the implementation independently |
| "We agreed — now implement it" | Squad | Coordinator delegates to implementers, tester runs in parallel |

**Combining both:** Use AgentCouncil to deliberate on the right approach, then hand the validated decision to Squad for implementation. Deliberation → Execution.

---

<!-- 🎬 MAJOR SECTION: Orchestration Patterns -->
## Four Proven Orchestration Patterns

*Common coordination strategies across all agent system types*

### Pattern 1: Linear Pipeline

```
Research → Planning → Implementation → Review → Testing
```
**Use when:** Well-defined features, each phase depends strictly on the previous.
**Example:** Adding a single REST endpoint to an existing API.
**Trade-off:** Simple and predictable, but sequential — no parallelization.

---

### Pattern 2: Iterative Refinement Loop

```
Implementation → Review → [Pass?] ──No──→ Implementation (different agent)
                            │
                            Yes → Testing
```
**Use when:** Quality-critical code (security, performance) with high failure risk.
**Example:** OAuth integration with token refresh edge cases.
**Trade-off:** High quality, but unpredictable duration. Add exit condition (max 3 iterations).

---

### Pattern 3: Parallel Specialists

```
              ┌→ Security Reviewer   ─┐
Research ──→  ├→ Performance Reviewer ┼→ Integration
              └→ Documentation        ─┘
```
**Use when:** Multiple independent cross-cutting concerns on one implementation.
**Example:** Full-stack feature touching auth, DB, API, and UI.
**Trade-off:** 3-5x faster validation; coordination complexity if results conflict.

---

### Pattern 4: Hierarchical Orchestration

```
Master Conductor
  ├→ Frontend Conductor
  │     ├→ UI Specialist
  │     └→ State Specialist
  └→ Backend Conductor
        ├→ API Specialist
        └→ DB Specialist
```
**Use when:** Full-stack features spanning 5+ subsystems with clear domain boundaries.
**Example:** Complete e-commerce checkout flow.
**Trade-off:** Scales to large projects; complex to debug when sub-conductors conflict.

---

## Real-World Use Cases

### Use Case 1: Multi-Concern PR Analysis with Parallel Subagents

**Setup:** Zero — just chat prompts.

**The Pattern:**
```
Review this authentication PR using three parallel subagents:

1. Security: vulnerabilities, secrets exposure, auth bypass risks
2. Performance: N+1 queries, token validation overhead, memory leaks
3. Testing: coverage gaps, missing edge cases, test utility reuse

When all complete, synthesize into:
- Blockers (critical security + major perf issues)
- Recommended (high priority)
- Optional (nice-to-have)
```

**What happens:** 3 specialized reviews run in 12 minutes (parallel) vs. 45 minutes (sequential). Each subagent forms conclusions independently. Main agent synthesizes into one coherent review.

**Key mechanism used:** Parallel subagents with structured summary returns. No custom setup — just prompt syntax.

---

### Use Case 2: Full-Stack Feature with Squad

**The Problem:** Building a user authentication system requires coordinated work across frontend, backend, testing, and architecture. A single agent juggling all four domains loses focus and produces mediocre results.

**The Pattern:**
```
You: "Team, build the authentication system"

  🏗️ Lead — scoping requirements, defining contracts...
  ⚛️ Frontend — building login form, session UI...
  🔧 Backend — setting up auth endpoints, JWT handling...
  🧪 Tester — writing test cases from spec...

  ↓ (agents finish, coordinator chains follow-up)

  🧪 Tester — edge cases from backend reveal token refresh gap
  🔧 Backend — picks it up automatically, no waiting for you to ask
  🏗️ Lead — reviews contracts between frontend/backend
```

**Outcomes:**
- 4 specialists working simultaneously — no context switching
- After a few sessions, agents know your auth patterns and conventions
- Lead can reject work → different agent must revise (no self-review loops)
- `decisions.md` captures JWT format, session storage strategy, endpoint contracts for future agents

---

### Use Case 3: Architecture Decision → Autonomous Execution

**The Problem:** Team must choose a messaging architecture (WebSockets vs SSE) for a real-time feature at 10K concurrent users. Hard to reverse. No one has deep expertise across all tradeoffs.

**Phase 1 — Deliberate with AgentCouncil:**
```
debate: WebSockets + Redis pub/sub vs SSE + message queue for 10K concurrent users.
        Cost, complexity, scaling, failure modes.

→ Gamma reframes: "10K concurrent is the wrong constraint to optimize for"
→ Alpha + Beta attack Gamma's position
→ Gamma survives: team was solving the wrong problem
→ Verdict: SSE wins for current scale, designed for migration at 100K+
```
**Result:** 12-minute council session replaces a 2-hour architecture meeting. Decision documented.

**Phase 2 — Execute with Background Agents:**
```
Plan against the validated decision →
Agent A (worktree-a): Backend Dev implements SSE + message queue
Agent B (worktree-b): Tester writes load tests from requirements  ← parallel
→ Review 2 finished branches, merge in order
```
**Result:** Implementation runs while you continue other work. Decision from AgentCouncil flows directly into Squad's `decisions.md` — future agents can't accidentally reverse it.

---

## ✅ What You Can Do Today

**Immediate (10 minutes) — no setup required:**
- [ ] Try implicit subagent invocation: `"Run a subagent to research how authentication works in this codebase and return a structured summary"`
- [ ] Run a parallel subagent review: `"Analyze this PR using three parallel subagents: Security, Performance, Testing"`
- [ ] Hand off a task to a background agent: open VS Code 1.109 session picker, start a background session for a well-defined task

**Short-Term (1-2 hours):**
- [ ] Install Squad: `npx github:bradygaster/squad` — form your first team by describing your project
- [ ] Run 3-5 tasks with `"Team, ..."` fan-out — watch parallel execution in action
- [ ] Check `.ai-team/decisions.md` after sessions — knowledge compounds automatically
- [ ] Install AgentCouncil and try an adversarial council on a real pending decision: `debate: [Option A] vs [Option B]`

**Advanced Adoption (1-2 weeks):**
- [ ] Enable GitHub Issues integration with `squad` label-based triage
- [ ] Activate Ralph (work monitor) for continuous backlog processing
- [ ] Combine deliberation + execution: AgentCouncil for architecture decisions → Squad for implementation
- [ ] Measure improvements: implementation time, rework iterations, test coverage, context switching overhead

---

## Related Patterns

- **[Agentic SDLC](../agentic-sdlc/)** — When agent volume exceeds repo/CI capacity: monorepo topology, outcome-based PRs, trust factory CI, org-wide adoption
- **[Agentic Workflows](../agentic-workflows/)** — GitHub-native agentic automation: Markdown-to-CI-workflow compilation, safe-output validation
- **[Custom Agents (Workshop)](../../workshop/06-custom-agents/)** — Hands-on exercises for creating, testing, and deploying custom agent definitions
- **[Copilot Primitives](../copilot-primitives/)** — The 4 customization building blocks: instructions, prompts, skills, and agents

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for complete navigation help.

---

## 📚 Official Documentation

**Core Mechanism:**
- 📖 **[VS Code Subagents](https://code.visualstudio.com/docs/copilot/agents/subagents)** — Subagent invocation, parallel execution, context isolation
- 📖 **[Custom Agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents)** — Agent structure, YAML frontmatter, tools, models, handoffs
- 📖 **[VS Code 1.109 Agent Orchestration](https://code.visualstudio.com/updates/v1_109#_agent-orchestration)** — Orchestration features, invocation controls, parallel execution support

**Autonomous Execution:**
- 📖 **[Background Agents](https://code.visualstudio.com/docs/copilot/agents/background-agents)** — Autonomous execution, hand-off workflow, worktree integration
- 📖 **[Git Worktrees](https://git-scm.com/docs/git-worktree)** — Technical reference for worktree capabilities and lifecycle
- 📖 **[VS Code 1.109 Session Management](https://code.visualstudio.com/updates/v1_109#_agent-session-management)** — Session picker, status indicators, multi-agent monitoring

**Production Implementations:**
- 🐙 **[Squad Repository](https://github.com/bradygaster/squad)** — Production-ready agent team system with persistent memory, parallel execution, GitHub Issues integration
- 📖 [Squad Product Guide](https://github.com/bradygaster/squad/blob/main/docs/guide.md) — Comprehensive usage guide covering all features
- 📖 [Ralph Work Monitor](https://github.com/bradygaster/squad/blob/main/docs/features/ralph.md) — Autonomous backlog processing
- 🐙 **[AgentCouncil Repository](https://github.com/Sentry01/AgentCouncil)** — Multi-model collaborative/adversarial deliberation for Copilot CLI

---

## 🎭 Behind the Scenes

### Context Window Mathematics

**Single Agent (Traditional):**
```
Total context: 200K tokens
Research: 80K (40%) — reading files, exploring architecture
Planning: 40K (20%) — creating implementation strategy
Available for implementation: 80K (40%)
Output quality: ~70% (context polluted by phases 1-2)
```

**Subagents (delegation + isolation):**
```
Main agent receives 3 structured summaries from subagents: ~2K tokens total
Main agent has 198K tokens available for synthesis and implementation
Subagent A used its own 200K for research (only summary returned)
Subagent B used its own 200K for security (only summary returned)
Subagent C used its own 200K for performance (only summary returned)
Token cost: 3x parallel vs. 1x sequential BUT context quality massively higher
```

**Agent Teams (coordinator + specialists via Squad):**
```
Coordinator overhead: ~13,200 tokens (6.6% of 200K)
Available for coordination: 187,000 (93%+)

Per spawned agent at Week 1:  ~1,250 tokens (charter + seed history)
Per spawned agent at Week 4:  ~3,300 tokens (+ 15 learnings, 8 decisions)
Per spawned agent at Week 12: ~9,000 tokens (+ 50 learnings, 47 decisions)
Work context per agent: 191,000-199,000 tokens (95%+) — for actual work

Fan out to 5 agents: ~1M tokens total reasoning capacity
Effective utilization: 93%+ per agent vs. 40% for single agent
```

### Worktree vs. Supervised Isolation

| Scenario | Supervised (Shared Workspace) | Background Agent (Worktree) |
|----------|------------------------------|----------------------------|
| **Failed experiment** | 90 min reverting commits | 5 min removing worktree |
| **Breaking changes** | Affects active work immediately | Isolated, main unaffected |
| **Merge conflicts** | High risk with parallel work | Zero — independent branches |
| **Rollback** | Complex — history entangled | Instant — just remove worktree |

### Handoff Mechanics (VS Code 1.109+)

```yaml
handoffs:
  - label: "Start Implementation"
    agent: "implementer"
    prompt: "Execute the plan above"
    send: false   # Requires user click — review plan first
    model: "Claude Sonnet 4"
```

`send: false` = user reviews and clicks. `send: true` = auto-executes immediately.
Use `false` for plan → implement transitions. Use `true` for trusted checkpoints.

### Tool Restriction Benefits

Without restrictions, agents "helpfully" cross role boundaries — planners fix typos (now implementing), reviewers "just fix this one thing" (now biasing review). With tool restrictions, VS Code enforces: planner CAN'T edit even if it wants to. Request fails immediately. No "accidentally implementing during planning" possible.

**Result:** 40-60% reduction in context mixing, cleaner phase outputs, predictable behavior.
