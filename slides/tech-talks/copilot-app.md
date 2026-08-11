---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The GitHub Copilot App: Running a Fleet of Agents
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: The GitHub Copilot App
mdc: true
section: "Agentic Systems"
status: active
updated: 2026-08-11
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
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
</script>

# The GitHub Copilot App
<TitleSlide
  title="The GitHub Copilot App"
  subtitle="Running a Fleet of Agents"
  tagline="From one Copilot collaborator to a fleet of autonomous agents — managed from one place"
  meta="Agentic Systems · Senior Engineers / Tech Leads / Engineering Managers · 45 min"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do we run five agents in parallel without losing control of the codebase?"
  subtext="Most teams treat Copilot as one assistant at a time — but the backlog doesn&#39;t move one task at a time."
  highlight="The fleet model changes the unit of work from task-I&#39;m-doing to task-I&#39;m-delegating."
  :cards='[
    { icon: "🧑‍💻", title: "Senior Engineers", description: "Dispatch routine work while staying in flow on architecture decisions" },
    { icon: "👩‍✈️", title: "Tech Leads", description: "Coordinate a fleet of agents across the sprint backlog from one view" },
    { icon: "🏗️", title: "Engineering Managers", description: "Set autonomy policy and audit every agent action across the org" },
    { title: "Serial bottleneck", description: "Teams with one agent finish one task at a time — throughput is capped at one" },
    { title: "5 issues, 1 morning", description: "Five agents can process five independent tickets before the first standup" },
    { title: "PR ready in 20 min", description: "CVE patch and regression tests — Plan mode, two agents, full audit trail" }
  ]'
/>

---

# Agenda
<AgendaSlide
  :items='[
    { title: "Parallel Worktrees", takeaway: "Run independent agents in isolated worktrees without branch collisions.", whyItMatters: "Teams gain parallelism without merge-conflict choreography or custom locking." },
    { title: "Autonomy by Confidence", takeaway: "Select Interactive, Plan, or Autopilot based on task risk and clarity.", whyItMatters: "Oversight can grow with trust instead of being all-or-nothing from day one." },
    { title: "Repeatable Pipelines", takeaway: "Turn successful sessions into scheduled or event-driven workflows.", whyItMatters: "A proven workflow becomes compounding automation — dispatched without manual triggers." }
  ]'
/>

---

# Table of Contents
<TocSlide
  arcToc="Fleet Model → Trust by Design → Control Surfaces → Sessions to Systems"
  :sections='[
    { icon: "🚀", title: "The Fleet Model", subtitle: "What agent-native means at team scale", blurb: "Dashboard, dispatch table, and the decision tree for when to reach for the fleet", slide: 5 },
    { icon: "🛡️", title: "Safe Parallelism", subtitle: "Worktrees, sandboxes, and branch isolation", blurb: "How five agents work concurrently without touching each other&#39;s files", slide: 10 },
    { icon: "🎛️", title: "Control Surfaces", subtitle: "Modes, Canvas, and the issue brief", blurb: "The dial, the handbrake, and the quality lever — all five control slides", slide: 13 },
    { icon: "⚙️", title: "Sessions to Systems", subtitle: "Repeatable workflows and Agent Merge", blurb: "CVE response, workflow anatomy, and the Monday dispatch that runs itself", slide: 19 }
  ]'
/>

---

# Part 1 — The Fleet Model
<SectionOpenerSlide
  :partNumber="1"
  title="The Fleet Model"
  subtitle="The coordinator shift: from one agent at a time to a backlog dispatch queue"
  :cards='[
    { icon: "🖥️", title: "My Work Dashboard", blurb: "All sessions, PRs, CI, and automations in one coordinator view" },
    { icon: "📋", title: "Dispatch Table", blurb: "Four agents, four issues, all running simultaneously this morning" },
    { icon: "🌿", title: "Decision Tree", blurb: "When one task → VS Code; two or more → the fleet model" }
  ]'
  :terminal='{ context: "Five agents, five issues:", detail: "zero conflicts — parallel is safe by design" }'
/>

---

# VS Code or Copilot App? Start With the Bottleneck
<BeforeAfterMetricsSlide
  :partNumber="1"
  pillIcon="🔀"
  pillLabel="Fleet Model: The Fork"
  title="Already Using Copilot in VS Code? Here&#39;s the Fork"
  :before='{
    header: "VS Code Agent Mode",
    items: [
      { title: "Best For", detail: "Single focused task in active codebase" },
      { title: "Session Count", detail: "One session at a time" },
      { title: "Environment", detail: "Developer&#39;s working directory" },
      { title: "Automation", detail: "Per-session, manual trigger" },
      { title: "Dashboard", detail: "Chat panel inside the editor" },
      "Already in VS Code via extension"
    ]
  }'
  :after='{
    header: "GitHub Copilot App",
    items: [
      { title: "Best For", detail: "Parallel fleet management, multi-repo" },
      { title: "Session Count", detail: "Multiple concurrent sessions" },
      { title: "Environment", detail: "Isolated worktrees, cloud sandboxes" },
      { title: "Automation", detail: "Repeatable workflows, Agent Merge" },
      { title: "Dashboard", detail: "My Work unified view across repos" },
      "Standalone desktop install required"
    ]
  }'
  :metrics='[
    { value: "1→5", label: "concurrent agents" },
    { value: "5×", label: "throughput on routine tasks" },
    { value: "20 min", label: "CVE patch + tests, Plan mode" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# My Work: The Fleet Dashboard
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🖥️"
  pillLabel="Fleet Model: Dashboard"
  title="My Work — The Coordinator View"
  :cards='[
    { icon: "🤖", title: "Active Sessions", description: "Task, elapsed time, mode, and current agent status — across all repos" },
    { icon: "🔀", title: "Open PRs", description: "Every session-generated PR in one view; no tab-switching to check status" },
    { icon: "⏱️", title: "Background Automations", description: "Last and next run timestamps for scheduled workflows" },
    { icon: "🔔", title: "Notifications", description: "Alerts when an agent needs input, hits a blocker, or opens a PR" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Monday Morning Dispatch
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Fleet Model: Dispatch"
  title="Four Agents, Four Issues, One Morning"
  subtitle="The dispatch table — four independent tasks running simultaneously"
  :rows='[
    { label: "Agent 1", description: "Fix accessibility violations in checkout — fixes reviewed before apply", tag: "Plan" },
    { label: "Agent 2", description: "Update npm dev deps — PR with package.json and lock file", tag: "Autopilot" },
    { label: "Agent 3", description: "Generate unit tests for auth/ — PR per exported function", tag: "Autopilot" },
    { label: "Agent 4", description: "Triage untagged issues — labels and priorities ready to confirm", tag: "Interactive" }
  ]'
  footnote="All four run simultaneously. Each produces a reviewable artifact — plan, PR, or action list."
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# When to Reach for the Fleet Model
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🌿"
  pillLabel="Fleet Model: Decision Tree"
  title="When to Reach for the Fleet Model"
  :left='{
    header: "Stay in VS Code",
    icon: "🖊️",
    items: [
      { title: "One active task", detail: "Single focused work in your codebase — no need to switch apps" },
      { title: "Tight real-time collab", detail: "Same file set, interactive edits with teammates" },
      { title: "Free tier", detail: "Technical preview requires Pro, Pro+, Business, or Enterprise" }
    ]
  }'
  :right='{
    header: "Open the Copilot App",
    icon: "🚀",
    items: [
      { title: "Two or more independent tasks", detail: "Parallel dispatch is the native unit of the fleet model" },
      { title: "Multi-repo coordination", detail: "Single view across all connected repositories" },
      { title: "Recurring automation", detail: "Convert sessions into scheduled or event-triggered workflows" }
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Safe Parallelism
<SectionOpenerSlide
  :partNumber="2"
  title="Safe Parallelism"
  subtitle="Five agents, five worktrees — isolation by construction, not coordination"
  :cards='[
    { icon: "🌿", title: "Worktree Isolation", blurb: "One branch, one directory per agent — no collision possible" },
    { icon: "📦", title: "Sandbox Containment", blurb: "Cloud or local runtimes, bounded scope, no lateral movement" },
    { icon: "🔐", title: "Policy Control", blurb: "Org admins configure sandbox types and Agent Merge eligibility" }
  ]'
  :terminal='{ context: "git worktree add -b agent-session-2 ../repo-agent-2 origin/main", detail: "five isolated directories, one shared history" }'
/>

---

# Trust by Design: Three Safety Layers
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🛡️"
  pillLabel="Safe Parallelism: Architecture"
  title="Trust by Design — Three Safety Layers"
  :columns='[
    { icon: "🌿", title: "Worktree Isolation", description: "One branch, one dir per agent — safe by construction, no collision possible between sessions.", items: ["Shared .git history", "Independent working dirs", "Normal PR on finish"] },
    { icon: "📦", title: "Sandbox Containment", description: "Cloud: fully isolated compute. Local: bounded scope, admin-configurable. No lateral movement.", items: ["Cloud: isolated compute", "Local: bounded scope", "Admin-configured access"] },
    { icon: "🔐", title: "Policy Control", description: "Org admins configure sandbox types, Agent Merge eligibility, and audit scope per repo.", items: ["Sandbox type policy", "Merge eligibility rules", "Full audit log"] }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Initializing Parallel Worktrees
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📜"
  pillLabel="Safe Parallelism: worktree-init.sh"
  title="worktree-init.sh — Pre-Initialize for Fleet Sessions"
  codePosition="left"
  :code='{ language: "bash", filename: "worktree-init.sh", content: "#!/usr/bin/env bash\n# Usage: ./worktree-init.sh <repo> <n> [prefix]\nset -euo pipefail\nREPO_PATH=\"${1:?}\"\nN_AGENTS=\"${2:?}\"\nPREFIX=\"${3:-agent}\"\nTIMESTAMP=$(date +%Y%m%d-%H%M)\ncd \"$REPO_PATH\"\ngit fetch origin main --quiet\nfor i in $(seq 1 \"$N_AGENTS\"); do\n  BRANCH=\"${PREFIX}-${TIMESTAMP}-${i}\"\n  DIR=\"../$(basename \"$REPO_PATH\")-${PREFIX}-${i}\"\n  git worktree add -b \"$BRANCH\" \"$DIR\" origin/main\n  echo \"  ✓ Worktree $i: $DIR\"\ndone" }'
  :features='[
    { icon: "🌿", title: "One branch per agent", description: "Each worktree gets its own branch from origin/main" },
    { icon: "📂", title: "Independent directories", description: "Agents cannot overwrite each other&#39;s working files" },
    { icon: "🔀", title: "Normal PRs on finish", description: "Each session branch closes as a standard pull request" }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Control Surfaces
<SectionOpenerSlide
  :partNumber="3"
  title="Control Surfaces"
  subtitle="Autonomy is a dial, not a switch — five slides to calibrate and control the fleet"
  :cards='[
    { icon: "🎛️", title: "Three Modes", blurb: "Interactive → Plan → Autopilot, matched to task risk" },
    { icon: "🖼️", title: "Canvas + Handbrake", blurb: "Shift to Interactive mid-session without losing the worktree" },
    { icon: "📝", title: "Issue Brief", blurb: "Issue quality = agent quality — the upstream lever" }
  ]'
  :terminal='{ context: "Autonomy is a dial, not a switch —", detail: "Interactive, Plan, and Autopilot give the right trust level per task" }'
/>

---

# The Autonomy Dial
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🎛️"
  pillLabel="Control Surfaces: Modes"
  title="Autonomy Is a Dial, Not a Switch"
  :columns='[
    { icon: "👁️", title: "Interactive", description: "Agent proposes each step and waits for approval. Best for exploratory or ambiguous tasks.", items: ["Step-by-step approval", "Transparent work log", "Best: unclear approach"] },
    { icon: "📋", title: "Plan", description: "Agent writes a complete plan; human reviews and approves before any code changes begin.", items: ["Full plan before code", "Approve before execute", "Best: scope clear, plan wanted"] },
    { icon: "🤖", title: "Autopilot", description: "Agent executes end-to-end, opens a PR when done. Best for routine well-specified tasks.", items: ["Fire and review PR", "Low blast radius tasks", "EM policy controls scope"] }
  ]'
  :insight='{ icon: "🏛️", text: "EM Policy: sandbox types · Agent Merge eligibility per repo · audit log with session ID, user, timestamp" }'
  :progressDots='{ current: 1, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Mode Selection Quick Reference
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Control Surfaces: Mode Guide"
  title="autonomy-mode-guide.md — Take-Home Artifact #1"
  subtitle="Match task characteristics to mode — the CVE row connects directly to S4"
  :rows='[
    { label: "Exploratory", description: "Approach unclear → agent proposes, human approves each step", tag: "Interactive" },
    { label: "Well-Scoped", description: "Scope clear, plan review wanted — e.g., OAuth2 feature add", tag: "Plan" },
    { label: "CVE/Security", description: "High blast radius: Plan mode analyzes usages, drafts plan first", tag: "Plan" },
    { label: "Routine", description: "Known pattern, low blast radius — dep updates, tests, triage", tag: "Autopilot" },
    { label: "New Pattern", description: "Untested task type — run Interactive or Plan first", tag: "Interactive" }
  ]'
  footnote="If the approach is non-obvious, default to Plan mode — scope mismatches become PR surprises in Autopilot"
  :progressDots='{ current: 2, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Canvas: The Coordination Surface
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🖼️"
  pillLabel="Control Surfaces: Canvas"
  title="Canvas — Coordinate, Steer, and Inspect the Fleet"
  :columns='[
    { icon: "📄", title: "What a Canvas Contains", description: "A live bidirectional workspace — plan, PR diff, terminal stream, CI state.", items: ["Plan or task brief", "PR diff view (real-time)", "Terminal stream", "CI + deployment state"] },
    { icon: "🛑", title: "The Handbrake", description: "Pull the handbrake: shift Autopilot to Interactive mid-session without canceling the worktree.", items: ["Shift to Interactive mid-session", "Add context notes to steer", "MCP: external tool access", "Cancel cleanly — no commits"] },
    { icon: "🔭", title: "Operator Controls", description: "Visibility and navigation across the fleet — no new autonomy modes.", items: ["Auto model attribution per request", "Credit/cache details when available", "Direct entry into shared sessions", "/side explores without disrupting main"] }
  ]'
  :progressDots='{ current: 3, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Issue Brief: Upstream Quality Lever
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="Control Surfaces: Issue Brief"
  title="Issue Quality = Agent Quality"
  codePosition="left"
  :code='{ language: "markdown", filename: "issue-brief-template.md", content: "## Objective\nOne paragraph: what we want achieved and why.\nBe specific — agents parse this as primary context.\n\n## Acceptance Criteria\n- [ ] Criterion 1 — concrete and testable\n- [ ] Criterion 2 — concrete and testable\n\n## Scope\n**In scope:** explicit file paths or modules\n**Out of scope:** explicit exclusions\n\n## Autonomy Mode\n- [ ] Interactive\n- [ ] Plan\n- [x] Autopilot" }'
  :features='[
    { icon: "🎯", title: "Objective section", description: "Agents parse this as primary context before execution begins" },
    { icon: "✅", title: "Acceptance criteria", description: "Binary, verifiable conditions — agents know when they&#39;re done" },
    { icon: "🚧", title: "Scope exclusions", description: "Explicit out-of-scope prevents surprise file edits" },
    { icon: "⏱️", title: "3-minute investment", description: "Three minutes in the brief is the upstream determinant of output quality" }
  ]'
  :progressDots='{ current: 4, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# What Breaks
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="⚠️"
  pillLabel="Control Surfaces: Failure Modes"
  title="What Breaks — Three Causal Failure Modes"
  :columns='[
    { icon: "🤖", title: "Autopilot on Ambiguous Tasks", description: "Unclear scope → decisions you&#39;d want to intercept. Scope mismatches become PR surprises.", items: ["Use Plan when approach unclear", "Ambiguity → surprise PRs"] },
    { icon: "📄", title: "Unstructured Issue Brief", description: "No acceptance criteria → two-sentence PR regardless of mode. Issue quality = agent quality.", items: ["Invest 3 min in the brief", "Issue quality = agent quality"] },
    { icon: "🖼️", title: "Skipping Canvas Escalation", description: "No recovery path when the agent veers — Canvas handbrake is the only mid-course correction.", items: ["Open Canvas for Autopilot", "Pull the handbrake early"] }
  ]'
  :progressDots='{ current: 5, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Sessions to Systems
<SectionOpenerSlide
  :partNumber="4"
  title="Sessions to Systems"
  subtitle="The CVE payoff, workflow anatomy, and the Monday dispatch that runs itself"
  :cards='[
    { icon: "🔒", title: "CVE Response", blurb: "Plan mode, two agents, patch and tests in 20 minutes" },
    { icon: "⚙️", title: "Workflow Anatomy", blurb: "agent-workflow.yml structure and Agent Merge lifecycle" },
    { icon: "📅", title: "Monday Dispatch", blurb: "The proven session pattern that now runs automatically" }
  ]'
  :terminal='{ context: "CVE in session management:", detail: "Plan mode · two agents · PR ready in 20 min · full audit trail" }'
/>

---

# CVE Response: High-Stakes in Plan Mode
<WorkflowShowdownStepsSlide
  :partNumber="4"
  pillIcon="🔒"
  pillLabel="Sessions to Systems: CVE Use Case"
  title="CVE Response — Plan Mode, Two-Agent Sequence"
  subtitle="High-stakes autonomous work with a full audit trail"
  leftLabel="Without the Fleet Model"
  rightLabel="With Plan Mode + Two Agents"
  :steps='[
    { left: { label: "CVE flagged", note: "Engineer pulls from main and starts investigation" }, right: { label: "CVE flagged", note: "Agent 1 dispatched in Plan mode immediately" } },
    { left: { label: "Manual impact analysis", note: "Dev reads every usage of affected package — 30–90 min" }, right: { label: "Agent 1: impact analysis", note: "Analyzes all usages, drafts remediation plan for review" } },
    { left: { label: "Patch and test manually", note: "Careful edits to avoid regressions — context-heavy work" }, right: { label: "Agent 2: patch + tests", note: "After plan approved — upgrade and regression tests in Autopilot" } },
    { left: { label: "PR ready", note: "2–3 hours after CVE flagged" }, right: { label: "PR + audit trail ready", note: "~20 min — patch, tests, full agent action log" } }
  ]'
  :outcomeLeft='{ icon: "⏳", label: "2–3 hours — manual context switching" }'
  :outcomeRight='{ icon: "✅", label: "~20 min — before incident response call ends" }'
  summaryMetric="2–3 hours → 20 min · full audit trail for security review"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Workflow Anatomy and Agent Merge
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="⚙️"
  pillLabel="Sessions to Systems: Workflow"
  title="agent-workflow.yml + Agent Merge Lifecycle"
  codePosition="left"
  :code='{ language: "yaml", filename: "agent-workflow.yml", content: "name: Weekly Dependency Update\ntrigger:\n  schedule:\n    cron: \"0 9 * * MON\"\n  manual: true\n\nsession:\n  mode: autopilot\n  environment: cloud-sandbox\n  branch_prefix: \"agent/deps-update\"\n\ntask: |\n  Update all dev dependencies to latest minor\n  versions. Run npm test and npm run lint.\n  If any test fails, revert that package.\n\npr:\n  title: \"chore: weekly dev dependency update\"\n  labels: [dependencies, automated]\n  auto_merge: true\n  merge_conditions:\n    ci_checks_pass: true\n    approvals_required: 0" }'
  :features='[
    { icon: "📅", title: "Schedule + manual trigger", description: "Runs every Monday 09:00 UTC automatically; also dispatchable manually" },
    { icon: "🔀", title: "Agent Merge lifecycle", description: "Agent monitors CI, handles reviewer feedback, merges when conditions are met" },
    { icon: "🗂️", title: "Versioned in repo", description: "Workflow definitions are auditable and rollback-able like any config change" },
    { icon: "👤", title: "Human in the loop", description: "Keep human merge step for novel features, security paths, or uncertain-scope sessions" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The Monday Dispatch Runs Itself
<BeforeAfterMetricsSlide
  :partNumber="4"
  pillIcon="📅"
  pillLabel="Sessions to Systems: Payoff"
  title="The Monday Dispatch Now Runs Itself"
  :before='{
    header: "Before",
    items: [
      { title: "Manual dispatch every Monday", detail: "Tech lead triggers each task individually" },
      { title: "One agent at a time", detail: "Sequential work — throughput capped at one" },
      { title: "CVE response: 2–3 hours", detail: "Manual impact analysis before any patching" },
      { title: "Recurring patterns repeated manually", detail: "No way to save and rerun a session" }
    ]
  }'
  :after='{
    header: "After",
    items: [
      { title: "Workflows trigger automatically", detail: "Dep updates run every Monday at 09:00 UTC" },
      { title: "Five agents, five issues", detail: "Fleet dispatch surfaces completed work in parallel" },
      { title: "CVE response: ~20 minutes", detail: "Plan mode + two agents + audit trail, ready to review" },
      { title: "Sessions saved as workflows", detail: "Proven patterns become permanent automation library" }
    ]
  }'
  :metrics='[
    { value: "5×", label: "throughput on routine tasks" },
    { value: "~20 min", label: "CVE patch + regression tests" },
    { value: "0 manual", label: "triggers for recurring workflows" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before / After
<BeforeAfterSlide
  header="From Serial Bottleneck to Fleet Coordination"
  :leftItems='[
    "One Copilot session at a time — throughput capped at one",
    "Manual context switching between three open terminal sessions",
    "CVE response: 2–3 hours of manual impact analysis before patching",
    "Recurring tasks manually triggered every time they come up"
  ]'
  :rightItems='[
    "Five agents, five issues, zero conflicts — fleet dispatched in parallel",
    "My Work dashboard surfaces all sessions, PRs, and CI in one view",
    "CVE response: ~20 min — Plan mode, two agents, full audit trail",
    "Proven session patterns converted to scheduled, event-driven workflows"
  ]'
  :metrics='[
    { value: "5×", detail: "throughput on routine and well-scoped backlog work" },
    { value: "20 min", detail: "CVE patch and regression tests — before the incident call ends" },
    { value: "0 collisions", detail: "five parallel agents, isolated worktrees, safe by design" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Download the Copilot App from github.com/features/ai/github-app",
    "Sign in (Pro, Pro+, Business, or Enterprise required)",
    "Explore My Work — sessions, PRs, automations in one view",
    "Start one Plan-mode session on a good-first-agent-task issue"
  ]'
  :thisWeek='[
    "Run worktree-init.sh to pre-initialize two parallel worktrees",
    "Dispatch two agents — one Plan, one Autopilot — to independent issues",
    "Review both PRs and compare how each session logged its reasoning",
    "Draft your first issue-brief-template.md and measure autonomy quality"
  ]'
  :thisMonth='[
    "Audit the backlog for agent-ready tickets with clear acceptance criteria",
    "Configure a first repeatable workflow for a recurring maintenance task",
    "Test Agent Merge on a low-risk automated workflow",
    "Share autonomy-mode-guide.md with the team and align on mode norms"
  ]'
  footer="The Monday dispatch that took 2 hours manually now runs itself — start with one issue today."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/github-copilot-app", label: "About the GitHub Copilot app — GitHub Docs", description: "Core concepts, autonomy modes, policy configuration, and how the app differs from VS Code" },
      { href: "https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started", label: "Getting started with the GitHub Copilot app — GitHub Docs", description: "Prerequisites, installation steps, and first session walkthrough" }
    ]},
    { title: "📣 Blog Posts & Announcements", color: "blue", items: [
      { href: "https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/", label: "GitHub Copilot app: The agent-native desktop experience — GitHub Blog", description: "Launch announcement with Canvas and Agent Merge detail, and design rationale" },
      { href: "https://github.blog/changelog/2026-08-07-github-copilot-weekly-releases-august-3", label: "GitHub Copilot weekly releases - August 3: Copilot App controls", description: "Auto model attribution, credit/cache details, /side exploration, and session navigation" },
      { href: "https://github.com/features/ai/github-app", label: "GitHub Copilot app product page", description: "Download, subscription access, and feature summary" }
    ]},
    { title: "🛠️ Related Tech Talks", color: "indigo", items: [
      { label: "Agent Teams", description: "Architectural patterns behind multi-agent systems the Copilot App makes accessible without custom code" },
      { label: "Agentic Workflows", description: "Designing trigger and automation patterns for GitHub Actions and Copilot together" },
      { label: "MCP Apps", description: "Extending agent capabilities via Model Context Protocol tools that integrate with the Copilot App" }
    ]}
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="The GitHub Copilot App"
  subtitle="Running a Fleet of Agents — From one collaborator to a coordinated fleet"
  :cards="[
    { value: 'Five agents, zero conflicts', detail: 'Isolated worktrees make parallel work safe by design, not coordination' },
    { value: 'Autonomy is a dial', detail: 'Interactive → Plan → Autopilot — the right trust level per task' },
    { value: 'Pull the handbrake', detail: 'Canvas shifts Autopilot to Interactive mid-session without losing the worktree' },
    { value: 'Issue quality = agent quality', detail: 'Three minutes in the brief is the upstream lever for autonomous output' }
  ]"
  prompt="Which task on your backlog is most ready for the fleet model right now?"
/>
