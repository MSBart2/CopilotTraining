---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Unattended Agents
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Unattended Agents
mdc: true
section: Agents at Your Keyboard
status: archived
updated: 2026-10-22
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
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
  title="Unattended Agents"
  subtitle="Loops That Run Without You and Stop on Their Own Terms"
  tagline="Runs on its own. Stops on evidence. Ends with your review."
  meta="Agentic Systems · 2026"
/>

---

# Core Question
<CoreQuestionSlide
  question="What lets an agent run without you — and stop when it has to?"
  subtext="Single-shot agents wait for the next prompt."
  highlight="Unattended agents verify their own progress, stop at their limits, and hand you the result."
  :cards='[
    { "icon": "🧰", "title": "Platform Engineer", "description": "Designing shared agent pipelines that run unattended across teams" },
    { "icon": "👩‍💻", "title": "Senior Developer", "description": "Moving beyond one-shot Copilot into verified autonomous workflows" },
    { "icon": "📊", "title": "Team Lead", "description": "Governing agent cost, safety, and reliability at scale" },
    { "title": "Loops, not prompts", "description": "Claude Code lead Boris Cherny now writes the loops that prompt Claude, as reported by The New Stack" },
    { "title": "18 min alert to draft PR", "description": "Illustrative design: scan → fix → critic → draft PR, with one human review at the end" },
    { "title": "Most agentic failures", "description": "Trace to missing circuit breakers and watchdogs — the controls teams skip first" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { "icon": "🔄", "title": "The Loop", "subtitle": "Definition + Trigger", "blurb": "What an unattended agent is and what fires it more than once", "slide": 4 },
    { "icon": "📨", "title": "Multi-Agent Design", "subtitle": "Handoff + Topology", "blurb": "How agents coordinate state, escalate, and organize", "slide": 10 },
    { "icon": "🔌", "title": "Production Controls", "subtitle": "Don&#39;t skip these", "blurb": "Circuit breaker, bounded execution, and goal-watchdog", "slide": 15 },
    { "icon": "⏱️", "title": "Wiring It Together", "subtitle": "Alert to draft PR", "blurb": "Full multi-agent pipeline from scheduled alert check to reviewed PR", "slide": 18 }
  ]'
/>

---

# Part 1 — The Loop
<SectionOpenerSlide
  :partNumber="1"
  title="The Loop"
  subtitle="What IS an unattended agent — and what triggers it to run more than once?"
  :cards='[
    { "icon": "🔄", "title": "Definition", "blurb": "Act → verify → repeat until goal met — then stop" },
    { "icon": "⚡", "title": "Trigger", "blurb": "Kick off by hand or with /every in Copilot CLI" },
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
  title="What Is an Unattended Agent?"
  subtitle="One sentence. Everything else in this talk follows from it."
  :hero='{ "value": "Loop", "label": "An agent that continues to act and verify in a cycle until the goal is demonstrably met — then stops.", "source": "" }'
  :supporting='[
    { "icon": "⚡", "title": "Triggered once", "description": "One prompt or a /every schedule starts the loop — no prompting between iterations" },
    { "icon": "🔄", "title": "Runs until verified", "description": "The agent reasons, acts, and checks its own goal condition — not just assumes it&#39;s done" },
    { "icon": "🛑", "title": "Stops on proof", "description": "The loop terminates when the goal is demonstrably true, or when controls say stop" },
    { "icon": "🆚", "title": "Not orchestration", "description": "Orchestration runs once. An unattended agent runs until the work is verifiably complete." }
  ]'
  :insight='{ "icon": "💡", "text": "The hardest engineering challenge is not starting the loop — it is stopping it correctly." }'
  :progressDots='{ "current": 1, "total": 5, "activeColor": "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Trigger — Copilot CLI /every
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="The Loop: Trigger"
  title="One Kickoff, Then /every Keeps It Looping"
  codePosition="left"
  :code='{ "language": "bash", "filename": "Copilot CLI session", "content": "$ copilot --experimental\n\n# one pass, on demand:\n> Use gh to review all open issues.\n  Apply &#39;stale&#39; to any with no activity\n  for 3 days. Close issues stale 7+ days\n  with a polite note.\n\n# the same pass, every day:\n> /every 1d Use gh to review all open\n  issues ... (same prompt)\n\n# review or remove schedules:\n> /every" }'
  :features='[
    { "icon": "▶️", "title": "Kick off by hand", "description": "One prompt to the orchestrator runs a pass — the fastest way to watch the loop work" },
    { "icon": "⏰", "title": "Repeat with /every", "description": "/every 1h repeats the prompt on an interval; /after 30m schedules one later run (experimental)" },
    { "icon": "💻", "title": "Where the loop runs", "description": "In your CLI session, with your credentials and working tree — the schedule lasts as long as the session" }
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
  :code='{ "language": "markdown", "filename": ".github/agents/loop-orchestrator.agent.md", "content": "---\ndescription: Loop orchestrator\ntools: [read, edit, search,\n        agent, github/*]\n---\n1. Read `.github/loop-state.json`.\n2. If iteration_count >= max_iterations,\n   write an escalation note and stop.\n3. Check all goal.conditions — if all\n   are true, write a summary and stop.\n4. For each task in state.pending,\n   invoke the matching worker\n   custom agent (agent tool).\n5. Update state.results and increment\n   iteration_count.\n6. Repeat from step 2." }'
  :features='[
    { "icon": "🔄", "title": "Trigger (step 1)", "description": "A kickoff prompt or /every 1h in Copilot CLI runs this file as the session&#39;s agent" },
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
  :code='{ "language": "markdown", "filename": ".github/agents/loop-reviewer.agent.md", "content": "---\ndescription: Code review worker\ntools: [read, edit, search,\n        github/*]\n---\n1. Read your task from\n   .github/loop-state.json\n   (tasks.pending[0]).\n2. Perform the code review\n   for the assigned PR.\n3. Write findings back to\n   state.results.review.\n4. Set tasks.complete[] and\n   remove from tasks.pending.\n5. Update goal.conditions\n   [review_approved] to true\n   if review passes." }'
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
    { "icon": "✏️", "title": "All agents write back", "description": "Any writable surface works. A repo file changes on the PR branch, so run one loop at a time" },
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
    { "left": { "label": "Active → Terminated", "note": "Goal verified; audit trail written" }, "right": { "label": "Idle", "note": "Waiting for a tool — the lock stays held while it waits" } },
    { "left": { "label": "Result in state store", "note": "Orchestrator proceeds to next task" }, "right": { "label": "Suspended", "note": "A limit fires — iteration cap, credit cap, or the next pass&#39;s stale-lock check" } }
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
    { "icon": "🔌", "title": "Circuit Breaker", "blurb": "Iteration, time, and rejection limits the orchestrator counts" },
    { "icon": "💰", "title": "Bounded Execution", "blurb": "A credit cap and denied tools the CLI enforces" },
    { "icon": "👁️", "title": "Goal-Watchdog", "blurb": "The next pass escalates a run that stopped part-way" }
  ]'
  :terminal='{ "context": "production-controls", "detail": "most failures trace here — catch them before deploy" }'
/>

---

# Three Production Controls
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔌"
  pillLabel="Production Controls: The Three"
  title="Three Controls, Three Enforcers"
  :columns='[
    { "icon": "🔌", "title": "Circuit Breaker", "description": "Enforced by the orchestrator. It counts in loop-state.json and escalates at each limit — reliable when it counts correctly, and history shows whether it did.", "items": ["max_iterations: 8", "timeout_minutes: 45", "critic.max_rejections: 2"] },
    { "icon": "💰", "title": "Bounded Execution", "description": "Enforced by Copilot CLI. These hold whatever the agent intends. The cap counts AI credits for the objective — no surface caps tokens per agent.", "items": ["/goal … --max-ai-credits 5 pauses spend", "--deny-tool blocks merge and review", "Esc stops a pass on the spot"] },
    { "icon": "👁️", "title": "Goal-Watchdog", "description": "Enforced by the next pass. Each /every pass reads the lock first; a run that stopped part-way escalates instead of resuming.", "items": ["Lock older than 45 min → stale_run", "Escalates to the security team", "Never resumes a half-changed worktree"] }
  ]'
  :progressDots='{ "current": 1, "total": 1, "activeColor": "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Wiring It Together
<SectionOpenerSlide
  :partNumber="4"
  title="Wiring It Together"
  subtitle="An illustrative design: from a scheduled alert check to a reviewed draft PR."
  :cards='[
    { "icon": "⏱️", "title": "The Outcome", "blurb": "Runtime table: T+0 to T+18, row by row" },
    { "icon": "🗂️", "title": "Agent Files", "blurb": "Who participates and how they share state" },
    { "icon": "🔍", "title": "Audit Trail", "blurb": "Full provenance via trace_id, trigger to termination" }
  ]'
  :terminal='{ "context": "wiring-it-together", "detail": "illustrative · ~18 minutes · human merges" }'
/>

---

# Runtime Walkthrough
<AITerminalTranscriptSlide
  :partNumber="4"
  pillIcon="⏱️"
  pillLabel="Wiring It Together: The Design"
  title="18 Minutes to a Reviewable PR. One Human Decision."
  subtitle="Illustrative timeline: critical alert → CVE fix → draft PR passing CI"
  :transcript='[
    { "type": "prompt", "text": "/every 1h pass: new Dependabot alert [CRITICAL] — CVE in dependency" },
    { "type": "thinking", "label": "🔄 Copilot CLI runs the pass as loop-orchestrator" },
    { "type": "outcome", "text": "T+1 min: Orchestrator dispatches a task envelope to vuln-scan-agent" },
    { "type": "outcome", "text": "T+3 min: Scan agent returns affected_files_report" },
    { "type": "outcome", "text": "T+7 min: Fix-proposal agent returns proposed_diff" },
    { "type": "divider" },
    { "type": "outcome", "text": "T+10 min: Test-runner validates fix against affected test suite" },
    { "type": "outcome", "text": "T+11 min: Security-critic approves (confidence 0.91 > 0.85 threshold)" },
    { "type": "outcome", "text": "T+12 min: PR-author opens draft PR with label [security, automated]" },
    { "type": "divider" },
    { "type": "outcome", "text": "T+18 min: CI passes. All 4 goal conditions true. Loop stops; review requested." },
    { "type": "response", "lines": ["Audit trail written: trace_id · per-dispatch history · decision chain"] }
  ]'
  footerMetric="Illustrative timings · 0 prompts from trigger to draft PR · security-team merges"
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
      { "title": "loop-orchestrator.agent.md", "detail": "Reads state, dispatches workers, checks goals" },
      { "title": "vuln-scan-agent.agent.md", "detail": "Finds affected files → affected_files_report" },
      { "title": "fix-proposal-agent.agent.md", "detail": "Generates the fix → proposed_diff" },
      { "title": "security-critic-agent.agent.md", "detail": "Checks fix and tests → approve or reject" },
      { "title": "pr-author-agent.agent.md", "detail": "Opens the draft PR after critic approval" }
    ]
  }'
  :right='{
    "header": "What Makes It Work",
    "icon": "⚙️",
    "items": [
      { "title": "Scheduled trigger", "detail": "One kickoff by hand, or /every 1h in Copilot CLI" },
      { "title": "loop-state.json", "detail": "Shared by all five agents — no direct coupling" },
      { "title": "Goal conditions", "detail": "pr_opened · ci_passing · cve_resolved · no_new_cves" },
      { "title": "Circuit breaker", "detail": "max_iterations: 8 · timeout: 45 min · one run at a time" }
    ],
    "code": { "language": "bash", "content": "# Copy-ready starter:\n# tech-talks/unattended-agents/\n#   examples/loop-starter/" }
  }'
  :progressDots='{ "current": 2, "total": 2, "activeColor": "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="From One-Shot Prompts to Unattended Agents"
  :leftItems='[
    "Hand-prompt every step; agent stops when it thinks it&#39;s done",
    "No recurring trigger — workflows run once and wait for a human to restart",
    "Ad hoc messages between agents — no trace ID, no escalation path",
    "No iteration cap — a stalled tool call runs until manual cancellation"
  ]'
  :rightItems='[
    "Trigger once; agent loops until goal condition is verifiably true",
    "/every in Copilot CLI repeats the pass on an interval — no hand-prompting between runs",
    "Typed state entries with trace ID, constraints, and escalate_on fields",
    "Agent-counted limits, a CLI credit cap, and a next-pass stall check each stop the loop"
  ]'
  :metrics='[
    { "value": "4", "detail": "verifiable goal conditions checked before the loop stops" },
    { "value": "18 min", "detail": "alert to reviewable draft PR in the illustrative design" },
    { "value": "1", "detail": "human decision: the merge stays with the security team" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Start copilot --experimental and run /every 1d with a simple triage prompt — minimum viable loop trigger, no code required",
    "Write one recurring task as a verifiable goal condition — not a description, a checkable criterion"
  ]'
  :thisWeek='[
    "Wire a three-agent pipeline (orchestrator + worker + critic) with a shared loop-state.json",
    "Run one pass of the loop starter by hand and read loop-state.json evidence before adding /every"
  ]'
  :thisMonth='[
    "Give every scheduled loop all three enforcers: counted limits, a --max-ai-credits cap, and a stale-lock check",
    "Have the orchestrator write the evidence checklist into every draft PR body"
  ]'
  footer="Every unattended agent starts with a scheduled trigger, a verifiable goal, and a stop condition."
/>

---

# References
<ReferencesSlide
  :groups='[
    { "title": "📖 Official Documentation", "color": "cyan", "items": [
      { "href": "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference", "label": "Copilot CLI command reference", "description": "/every and /after scheduling, --agent, --allow-tool and --deny-tool" },
      { "href": "https://docs.github.com/en/copilot/reference/custom-agents-configuration", "label": "Custom agents configuration", "description": "Tool aliases (read, edit, search, agent) for orchestrator and worker agent files" }
    ] },
    { "title": "🛠️ Open Source & Guides", "color": "purple", "items": [
      { "href": "https://github.com/cobusgreyling/loop-engineering", "label": "cobusgreyling/loop-engineering", "description": "Loop patterns: daily triage, PR babysitter, CI sweeper, dependency sweeper" },
      { "href": "https://github.com/gim-home/herald", "label": "gim-home/herald", "description": "Agent management harness: lifecycle state machine, coordination primitives" },
      { "href": "https://www.langchain.com/blog/the-art-of-loop-engineering", "label": "The Art of Loop Engineering — LangChain Blog", "description": "Custom termination logic, dynamic replanning, nested loops, and state management" },
      { "href": "https://datasciencedojo.com/blog/agentic-loops-explained-from-react-to-loop-engineering-2026-guide/", "label": "Agentic Loops: From ReAct to Loop Engineering (2026 Guide)", "description": "Loop anatomy, pattern taxonomy, and why loop engineering supersedes prompt engineering" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Unattended Agents"
  subtitle="Autonomous by design. Verifiable by default."
  :cards="[
    { value: 'The Definition', detail: 'An unattended agent continues to act and verify until the goal is demonstrably met — then stops.' },
    { value: 'The Trigger', detail: 'One kickoff by hand, or /every 1h in Copilot CLI. No infrastructure required.' },
    { value: 'The Design', detail: 'Critical alert to a reviewable draft PR in about 18 minutes (illustrative), with one human merge.' }
  ]"
  prompt="What recurring task on your team could run as an unattended agent starting tomorrow?"
/>
