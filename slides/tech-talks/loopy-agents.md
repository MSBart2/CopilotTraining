---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Loop Engineering
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Loop Engineering
mdc: true
section: Agentic Systems
status: active
updated: 2026-07-02
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import AgendaSlide from './components/structure/AgendaSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import BeforeAfterSlide from './components/structure/BeforeAfterSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
</script>

# Title
<TitleSlide
  title="Loop Engineering"
  subtitle="Designing Agent Systems That Run Reliably"
  tagline="Autonomous by design. Verifiable by default."
  meta="Agentic Systems · 2026"
/>

---

# Core Question
<CoreQuestionSlide
  question="What makes an agent loopy — and how do we engineer it to run reliably?"
  subtext="Single-shot agents wait for the next prompt."
  highlight="Loopy agents verify their own progress and keep going until the goal is met."
  :cards='[
    { "icon": "🧰", "title": "Platform Engineer", "description": "Designing shared agent pipelines that run unattended across teams" },
    { "icon": "👩‍💻", "title": "Senior Developer", "description": "Moving beyond one-shot Copilot into verified autonomous workflows" },
    { "icon": "📊", "title": "Team Lead", "description": "Governing agent cost, safety, and reliability at scale" },
    { "title": "8× code output", "description": "Anthropic teams with loop-managed autonomy — Claude writes >80% of merged production code" },
    { "title": "18 min advisory to PR", "description": "Security fix fully automated: scan → fix → critic → verified PR, zero human prompts" },
    { "title": "Most agentic failures", "description": "Trace to missing circuit breakers and watchdogs — the controls teams skip first" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Reliable Loops", takeaway: "Design agents to reason, act, and verify until outcomes are proven.", whyItMatters: "Reliability comes from the loop, not a hopeful prompt." },
    { title: "Topology Choices", takeaway: "Match multi-agent patterns to the shape of the problem.", whyItMatters: "The right composition determines whether scaling helps." },
    { title: "Production Controls", takeaway: "Add audit, metrics, and rollback to autonomous systems.", whyItMatters: "Operators need the same control standards used for infrastructure." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { "icon": "🔄", "title": "The Loop", "subtitle": "Definition + Trigger", "blurb": "What is a loopy agent and what fires it more than once", "slide": 4 },
    { "icon": "📨", "title": "Multi-Agent Design", "subtitle": "Handoff + Topology", "blurb": "How agents coordinate state, escalate, and organize", "slide": 10 },
    { "icon": "🔌", "title": "Production Controls", "subtitle": "Don&#39;t skip these", "blurb": "Circuit breaker, bounded execution, and goal-watchdog", "slide": 15 },
    { "icon": "⏱️", "title": "Wiring It Together", "subtitle": "18 min, zero prompts", "blurb": "Full multi-agent pipeline from webhook to verified PR", "slide": 18 }
  ]'
/>

---

# Part 1 — The Loop
<SectionOpenerSlide
  :partNumber="1"
  title="The Loop"
  subtitle="What IS a loopy agent — and what triggers it to run more than once?"
  :cards='[
    { "icon": "🔄", "title": "Definition", "blurb": "Act → verify → repeat until goal met — then stop" },
    { "icon": "⚡", "title": "Trigger", "blurb": "Copilot Automations — native, no infrastructure" },
    { "icon": "📁", "title": "Simple Path", "blurb": "Three agent files + shared state, no framework" }
  ]'
  :terminal='{ "context": "loop-engineering", "detail": "act → verify → repeat until goal met" }'
/>

---

# The Definition
<HeroStatSlide
  :partNumber="1"
  pillIcon="🔄"
  pillLabel="The Loop: What It Is"
  title="What Is a Loopy Agent?"
  subtitle="One sentence. Everything else in this talk follows from it."
  :hero='{ "value": "Loop", "label": "An agent that continues to act and verify in a cycle until the goal is demonstrably met — then stops.", "source": "" }'
  :supporting='[
    { "icon": "⚡", "title": "Triggered once", "description": "A Copilot Automation, webhook, or schedule fires the loop — no human kick required" },
    { "icon": "🔄", "title": "Runs until verified", "description": "The agent reasons, acts, and checks its own goal condition — not just assumes it&#39;s done" },
    { "icon": "🛑", "title": "Stops on proof", "description": "The loop terminates when the goal is demonstrably true, or when controls say stop" },
    { "icon": "🆚", "title": "Not orchestration", "description": "Orchestration runs once. A loopy agent runs until the work is verifiably complete." }
  ]'
  :insight='{ "icon": "💡", "text": "The hardest engineering challenge is not starting the loop — it is stopping it correctly." }'
  :progressDots='{ "current": 1, "total": 5, "activeColor": "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Trigger — Copilot Automations
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="The Loop: Trigger"
  title="Copilot Automations — The Native Loop Trigger"
  codePosition="left"
  :code='{ "language": "yaml", "filename": "Repository → Agents tab → Automations → Create new", "content": "name: Daily Issue Triage\ntrigger:\n  type: schedule\n  interval: daily\n  time: \"00:00 UTC\"\n\nprompt: |\n  Review all open issues.\n  Apply &#39;stale&#39; to any with no activity\n  for 3 days. Close issues stale 7+ days\n  with a polite note.\n\ntools:\n  - label_issues\n  - close_issues\n  - post_comments" }'
  :features='[
    { "icon": "⏰", "title": "Schedule triggers", "description": "Every hour · Every day · Every week — no cron syntax, no external scheduler" },
    { "icon": "🔔", "title": "Event triggers", "description": "Issue created · PR opened · PR synchronized — fires on real repository activity" },
    { "icon": "🔁", "title": "What makes it loopy", "description": "Without this trigger, the agent runs once and stops. This is what re-fires the loop." }
  ]'
  :progressDots='{ "current": 2, "total": 5, "activeColor": "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Orchestrator Agent
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📁"
  pillLabel="The Loop: Simple Path"
  title="The Orchestrator — Loop Logic in Plain Instructions"
  codePosition="left"
  :code='{ "language": "markdown", "filename": ".github/agents/loop-orchestrator.agent.md", "content": "---\ndescription: Loop orchestrator\ntools: [read_file, write_file, github]\n---\n1. Read `.github/loop-state.json`.\n2. If iteration_count >= max_iterations,\n   write an escalation note and stop.\n3. Check all goal.conditions — if all\n   are true, write a summary and stop.\n4. For each task in state.pending,\n   invoke the right worker agent.\n5. Update state.results and increment\n   iteration_count.\n6. Repeat from step 2." }'
  :features='[
    { "icon": "🔄", "title": "Trigger (step 1)", "description": "Reads shared state — the Automation already fired this agent on schedule" },
    { "icon": "🎯", "title": "Goal + Verify (steps 2–3)", "description": "Checks verifiable conditions before delegating — stops on proof, not assumption" },
    { "icon": "⚙️", "title": "Execute + Control (steps 4–6)", "description": "Delegates to workers, updates state, and caps itself at max_iterations" }
  ]'
  :progressDots='{ "current": 3, "total": 5, "activeColor": "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Worker Agent
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📁"
  pillLabel="The Loop: Simple Path"
  title="The Worker — Accepts a Task, Returns a Result"
  codePosition="left"
  :code='{ "language": "markdown", "filename": ".github/agents/loop-reviewer.agent.md", "content": "---\ndescription: Code review worker\ntools: [read_file, write_file,\n        search_code, github]\n---\n1. Read your task from\n   .github/loop-state.json\n   (tasks.pending[0]).\n2. Perform the code review\n   for the assigned PR.\n3. Write findings back to\n   state.results.review.\n4. Set tasks.complete[] and\n   remove from tasks.pending.\n5. Update goal.conditions\n   [review_approved] to true\n   if review passes." }'
  :features='[
    { "icon": "📥", "title": "Reads task from shared state", "description": "The state file is the handoff — no direct agent-to-agent call needed" },
    { "icon": "📤", "title": "Writes result back to state", "description": "Orchestrator reads results on next iteration and decides what to do next" },
    { "icon": "✅", "title": "Updates goal conditions", "description": "Workers own their piece of the goal — the orchestrator just checks the total" }
  ]'
  :progressDots='{ "current": 4, "total": 5, "activeColor": "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Shared State Store
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📁"
  pillLabel="The Loop: Simple Path"
  title="loop-state.json — The Shared Brain"
  codePosition="left"
  :code='{ "language": "json", "filename": ".github/loop-state.json", "content": "{\n  \"iteration_count\": 2,\n  \"max_iterations\": 5,\n  \"goal\": {\n    \"conditions\": [\n      { \"name\": \"review_approved\",\n        \"met\": true },\n      { \"name\": \"tests_passing\",\n        \"met\": false }\n    ]\n  },\n  \"tasks\": {\n    \"pending\": [\"test_run\"],\n    \"complete\": [\"code_review\"]\n  },\n  \"results\": {\n    \"review\": \"No critical issues\"\n  }\n}" }'
  :features='[
    { "icon": "📖", "title": "All agents read from here", "description": "The orchestrator, reviewer, and tester all read the same file — no direct coupling" },
    { "icon": "✏️", "title": "All agents write back", "description": "Any writable surface works: JSON file, GitHub Issue, database row, or API" },
    { "icon": "🔍", "title": "State is the audit trail", "description": "iteration_count, results, and goal.conditions give full provenance without extra tooling" }
  ]'
  :progressDots='{ "current": 5, "total": 5, "activeColor": "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Multi-Agent Design
<SectionOpenerSlide
  :partNumber="2"
  title="Multi-Agent Design"
  subtitle="How agents hand off work, track state, and know when to escalate"
  :cards='[
    { "icon": "📨", "title": "Structured Handoff", "blurb": "State entries with intent, constraints, escalate_on" },
    { "icon": "🔁", "title": "Lifecycle States", "blurb": "Idle → Suspended: where loops silently fail" },
    { "icon": "🗺️", "title": "Topology", "blurb": "Flat-pool, hierarchical, or pipeline — your choice" }
  ]'
  :terminal='{ "context": "multi-agent-design", "detail": "handoff → escalate → verify → next agent" }'
/>

---

# Structured Handoff — Simple vs Structured
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="📨"
  pillLabel="Multi-Agent Design: Handoff"
  title="Two Ways to Pass Work Between Agents"
  :left='{
    "header": "Simple Path",
    "icon": "📁",
    "items": [
      { "title": "Write to loop-state.json", "detail": "tasks.pending, goal.conditions, results" },
      { "title": "Worker reads its task", "detail": "No direct call — state is the handoff" },
      { "title": "Key fields to include", "detail": "intent · constraints · escalate_on" }
    ]
  }'
  :right='{
    "header": "Structured Path",
    "icon": "📨",
    "items": [
      { "title": "Typed task envelope (JSON)", "detail": "task_id · trace_id · sender · receiver" },
      { "title": "escalate_on conditions", "detail": "explicit triggers that return control upward" },
      { "title": "on_complete routing", "detail": "declarative: who gets the baton next" }
    ],
    "code": { "language": "json", "content": "{ \"intent\": \"review_pr\",\n  \"escalate_on\": [\"deadline_exceeded\"],\n  \"on_complete\": { \"trigger\": \"tester\" } }" }
  }'
  :progressDots='{ "current": 1, "total": 4, "activeColor": "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Agent Lifecycle States
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="🔁"
  pillLabel="Multi-Agent Design: Lifecycle"
  title="Agent Lifecycle — The State Machine Every Loop Needs"
  subtitle="Most silent failures live in the Idle → Suspended gap"
  leftLabel="Healthy Execution"
  rightLabel="Failure Path"
  :steps='[
    { "left": { "label": "Created", "note": "Task received from orchestrator" }, "right": { "label": "Created", "note": "Task received from orchestrator" } },
    { "left": { "label": "Initialized", "note": "Context loaded, tools verified available" }, "right": { "label": "Active", "note": "Agent begins ReAct cycle" } },
    { "left": { "label": "Active → Terminated", "note": "Goal verified; audit trail written" }, "right": { "label": "Idle", "note": "Waiting for tool response — watchdog timer starts here" } },
    { "left": { "label": "Result in state store", "note": "Orchestrator proceeds to next task" }, "right": { "label": "Suspended", "note": "Circuit breaker fires — without this, Idle runs until manual stop" } }
  ]'
  :outcomeLeft='{ "icon": "✅", "label": "Loop continues or terminates cleanly" }'
  :outcomeRight='{ "icon": "🔌", "label": "Circuit breaker required — covered in Section 3" }'
  summaryMetric="Idle → Suspended: where most production loop failures begin"
  :progressDots='{ "current": 2, "total": 4, "activeColor": "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Topology Catalog
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🗺️"
  pillLabel="Multi-Agent Design: Topology"
  title="Three Topologies — Pick One Before Writing Any Agent"
  :columns='[
    { "icon": "🏊", "title": "Flat Pool", "description": "One orchestrator dispatches to N identical workers; results aggregated. Use for parallelizable homogeneous tasks.", "items": [".github/agents/ = orchestrator + N workers", "Aggregate with majority-vote or first-success"] },
    { "icon": "🌲", "title": "Hierarchical", "description": "Orchestrator → specialized workers → critic. Use when tasks need specialization and a quality gate.", "items": ["Workers have distinct capabilities", "Critic validates before accepting output", "Recommended default for engineering pipelines"] },
    { "icon": "🚆", "title": "Pipeline", "description": "Each stage strictly depends on previous output. Use when the workflow is sequential by nature.", "items": ["analyze → implement → test → review", "Stage failure triggers rollback or escalate"] }
  ]'
  :progressDots='{ "current": 3, "total": 4, "activeColor": "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Task Envelope Key Fields
<FourCardGridSlide
  :partNumber="2"
  pillIcon="📨"
  pillLabel="Multi-Agent Design: Envelope"
  title="Four Fields That Make Handoff Traceable"
  :cards='[
    { "icon": "🔎", "title": "trace_id", "description": "Links every agent action in this session — makes post-hoc debugging possible without extra tooling" },
    { "icon": "🎯", "title": "intent", "description": "What the receiving agent is being asked to do — not how, just what. Keeps agents swappable." },
    { "icon": "⚠️", "title": "escalate_on", "description": "Explicit conditions that return control to orchestrator or human — never implicit, never ad hoc" },
    { "icon": "➡️", "title": "on_complete", "description": "Who receives the baton when this agent finishes — makes the pipeline declarative rather than imperative" }
  ]'
  :insight='{ "icon": "💡", "text": "These four fields work whether the handoff is a JSON file, a state store entry, or a structured task envelope." }'
  :progressDots='{ "current": 4, "total": 4, "activeColor": "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Production Controls
<SectionOpenerSlide
  :partNumber="3"
  title="Production Controls"
  subtitle="The three controls most teams skip and most failures trace back to"
  :cards='[
    { "icon": "🔌", "title": "Circuit Breaker", "blurb": "Hard stop on iterations, time, and token cost" },
    { "icon": "💰", "title": "Bounded Execution", "blurb": "Budget caps per agent in every task delegation" },
    { "icon": "👁️", "title": "Goal-Watchdog", "blurb": "Stall detection when Idle → Suspended silently fails" }
  ]'
  :terminal='{ "context": "production-controls", "detail": "most failures trace here — catch them before deploy" }'
/>

---

# Three Production Controls
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔌"
  pillLabel="Production Controls: The Three"
  title="The Three Controls That Separate Demos from Deployments"
  :columns='[
    { "icon": "🔌", "title": "Circuit Breaker", "description": "Hard-stops the loop when safety or cost thresholds are hit — regardless of what the agent believes about its own progress.", "items": ["max_iterations: stop after N attempts", "timeout_minutes: hard wall-clock limit", "max_cost_usd: pause for human review"] },
    { "icon": "💰", "title": "Bounded Execution", "description": "Every agent receives an explicit token budget and deadline in its task. Agents that exceed their budget must escalate, not continue.", "items": ["Per-agent token cap in state entry", "Deadline_utc in task envelope", "Escalate on budget exceeded"] },
    { "icon": "👁️", "title": "Goal-Watchdog", "description": "Monitors the loop at a fixed interval. If no measurable progress has been made after N iterations, escalates rather than running forever.", "items": ["Checks goal.conditions each iteration", "Detects stall in Idle → Suspended gap", "Escalates to human on stall threshold"] }
  ]'
  :progressDots='{ "current": 1, "total": 2, "activeColor": "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Loop Audit Checklist
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="✅"
  pillLabel="Production Controls: Audit"
  title="Loop Readiness Score — Run Before Deploying Any Loop"
  codePosition="left"
  :code='{ "language": "bash", "filename": "npx @cobusgreyling/loop-audit . --suggest", "content": "🔍 Loop Audit Results\n──────────────────────────────\n[ Exit Conditions ]\n  ✅ goal.verifiable_conditions defined\n  ❌ controls.circuit_breaker missing\n  ❌ controls.bounded_execution missing\n  ⚠️  controls.goal_watchdog missing\n\n[ Agent Communication ]\n  ✅ escalate_to defined on agents\n  ⚠️  trace propagation not configured\n\n[ Cost & Safety ]\n  ❌ max_cost_usd not set\n  ✅ timeout_minutes < 120\n──────────────────────────────\n❌ 3 failures — do not deploy" }'
  :features='[
    { "icon": "❌", "title": "FAIL: missing circuit_breaker", "description": "No hard stop — one stalled tool call becomes an unbounded cost event" },
    { "icon": "❌", "title": "FAIL: max_cost_usd not set", "description": "Uncapped budget is a production incident waiting to happen" },
    { "icon": "⚠️", "title": "WARN: watchdog not configured", "description": "Stall detection missing — Idle → Suspended failures will run silently until the circuit breaker fires" }
  ]'
  :progressDots='{ "current": 2, "total": 2, "activeColor": "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Wiring It Together
<SectionOpenerSlide
  :partNumber="4"
  title="Wiring It Together"
  subtitle="18 minutes. Zero human prompts. From webhook trigger to verified PR."
  :cards='[
    { "icon": "⏱️", "title": "The Outcome", "blurb": "Runtime table: T+0 to T+18, row by row" },
    { "icon": "🗂️", "title": "Agent Files", "blurb": "Who participates and how they share state" },
    { "icon": "🔍", "title": "Audit Trail", "blurb": "Full provenance via trace_id, trigger to termination" }
  ]'
  :terminal='{ "context": "wiring-it-together", "detail": "18 minutes · zero prompts · verified" }'
/>

---

# Runtime Walkthrough
<AITerminalTranscriptSlide
  :partNumber="4"
  pillIcon="⏱️"
  pillLabel="Wiring It Together: The Proof"
  title="18 Minutes. Zero Human Prompts. Verified."
  subtitle="Security advisory published → CVE resolved → PR passing CI"
  :transcript='[
    { "type": "prompt", "text": "GitHub: security_advisory.published [CRITICAL] — CVE in dependency" },
    { "type": "thinking", "label": "🔄 Copilot Automation fires loop-orchestrator" },
    { "type": "outcome", "text": "T+1 min: Orchestrator dispatches to vuln-scan-agent (8k token budget)" },
    { "type": "outcome", "text": "T+3 min: Scan agent returns affected_files_report" },
    { "type": "outcome", "text": "T+7 min: Fix-proposal agent returns proposed_diff" },
    { "type": "divider" },
    { "type": "outcome", "text": "T+10 min: Test-runner validates fix against affected test suite" },
    { "type": "outcome", "text": "T+11 min: Security-critic approves (confidence 0.91 > 0.85 threshold)" },
    { "type": "outcome", "text": "T+12 min: PR-author opens PR with label [security, automated]" },
    { "type": "divider" },
    { "type": "outcome", "text": "T+18 min: CI passes. All 4 goal conditions verified true. Loop terminates." },
    { "type": "response", "lines": ["Audit trail written: trace_id · per-agent token spend · decision chain"] }
  ]'
  footerMetric="0 human prompts · $3.80 total cost · full provenance via trace_id"
  :progressDots='{ "current": 1, "total": 2, "activeColor": "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Agent File Diagram
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🗂️"
  pillLabel="Wiring It Together: The Structure"
  title="Five Agent Files. One Shared State. No Framework."
  :left='{
    "header": ".github/agents/",
    "icon": "📁",
    "items": [
      { "title": "loop-orchestrator.agent.md", "detail": "Reads state, dispatches to workers, checks all goal conditions" },
      { "title": "vuln-scan-agent.agent.md", "detail": "Identifies affected files — writes affected_files_report to state" },
      { "title": "fix-proposal-agent.agent.md", "detail": "Generates dependency fix — writes proposed_diff to state" },
      { "title": "security-critic-agent.agent.md", "detail": "Validates fix quality and test coverage — approves or rejects" },
      { "title": "pr-author-agent.agent.md", "detail": "Opens the PR once critic approval is in state" }
    ]
  }'
  :right='{
    "header": "What Makes It Work",
    "icon": "⚙️",
    "items": [
      { "title": "Copilot Automation", "detail": "Fires loop-orchestrator on security_advisory.published event" },
      { "title": "loop-state.json", "detail": "All five agents read and write to the same file — no direct coupling" },
      { "title": "Goal conditions", "detail": "pr_opened · ci_passing · original_cve_resolved · no_new_cves" },
      { "title": "Circuit breaker", "detail": "max_iterations: 8 · timeout: 45 min · max_cost_usd: $4.00" }
    ],
    "code": { "language": "bash", "content": "# Scale up: same pattern,\n# declarative YAML config\n# — see README for full spec" }
  }'
  :progressDots='{ "current": 2, "total": 2, "activeColor": "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="From One-Shot Prompts to Loopy Agents"
  :leftItems='[
    "Hand-prompt every step; agent stops when it thinks it&#39;s done",
    "No recurring trigger — workflows run once and wait for a human to restart",
    "Ad hoc messages between agents — no trace ID, no escalation path",
    "No iteration cap — a stalled tool call runs until manual cancellation"
  ]'
  :rightItems='[
    "Trigger once; agent loops until goal condition is verifiably true",
    "Copilot Automation fires on schedule or on repository events — no human restart",
    "Typed state entries with trace ID, constraints, and escalate_on fields",
    "Circuit breaker, bounded execution, and goal-watchdog enforce hard limits"
  ]'
  :metrics='[
    { "value": "8×", "detail": "code output — Anthropic teams with loop-managed autonomy" },
    { "value": "18 min", "detail": "advisory to verified PR — zero human prompts" },
    { "value": "0", "detail": "human prompts from trigger to verified completion" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Create a Copilot Automation (Agents tab → Create new → daily schedule + triage task) — minimum viable loop trigger, no code required",
    "Write one recurring task as a verifiable goal condition — not a description, a checkable criterion"
  ]'
  :thisWeek='[
    "Wire a three-agent pipeline (orchestrator + worker + critic) with a shared loop-state.json",
    "Run npx @cobusgreyling/loop-audit . --suggest for a Loop Readiness Score on an existing workflow"
  ]'
  :thisMonth='[
    "Add circuit breaker, bounded execution, and goal-watchdog to every unattended agent loop",
    "Integrate loop-audit into CI as a pre-merge gate — fail the build on any FAIL-severity check"
  ]'
  footer="Every loopy agent starts with a Copilot Automation, a verifiable goal, and a stop condition."
/>

---

# References
<ReferencesSlide
  :groups='[
    { "title": "📖 Official Documentation", "color": "cyan", "items": [
      { "href": "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations", "label": "Creating automations with Copilot cloud agent", "description": "Scheduled and event-triggered automations: hourly, daily, weekly, issue/PR events" },
      { "href": "https://github.blog/changelog/2026-06-02-schedule-and-automate-tasks-with-copilot-cloud-agent/", "label": "Schedule and automate tasks with Copilot cloud agent", "description": "June 2026 launch of Copilot Automations for private and internal repositories" }
    ] },
    { "title": "🛠️ Open Source & Guides", "color": "purple", "items": [
      { "href": "https://github.com/cobusgreyling/loop-engineering", "label": "cobusgreyling/loop-engineering", "description": "Practical patterns, starters & CLI tools: loop-audit, loop-init, loop-cost" },
      { "href": "https://github.com/gim-home/herald", "label": "gim-home/herald", "description": "Agent management harness: lifecycle state machine, coordination primitives" },
      { "href": "https://www.langchain.com/blog/the-art-of-loop-engineering", "label": "The Art of Loop Engineering — LangChain Blog", "description": "Custom termination logic, dynamic replanning, nested loops, and state management" },
      { "href": "https://datasciencedojo.com/blog/agentic-loops-explained-from-react-to-loop-engineering-2026-guide/", "label": "Agentic Loops: From ReAct to Loop Engineering (2026 Guide)", "description": "Loop anatomy, pattern taxonomy, and why loop engineering supersedes prompt engineering" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Loop Engineering"
  subtitle="Autonomous by design. Verifiable by default."
  :cards="[
    { value: 'The Definition', detail: 'A loopy agent continues to act and verify until the goal is demonstrably met — then stops.' },
    { value: 'The Trigger', detail: 'Copilot Automations: Agents tab → Create new → pick a schedule. No infrastructure required.' },
    { value: 'The Proof', detail: '18 minutes, zero human prompts: from security advisory to verified PR, fully automated.' }
  ]"
  prompt="What recurring task on your team could run as a loopy agent starting tomorrow?"
/>
