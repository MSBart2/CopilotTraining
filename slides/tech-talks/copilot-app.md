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
title: The GitHub Copilot App — Running a Fleet of Agents
mdc: true
section: Agentic Systems
status: active
updated: 2026-06-16
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
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
</script>

<!-- SLIDE: Title -->

<TitleSlide
  title="The GitHub Copilot App"
  subtitle="Running a Fleet of Agents"
  tagline="From one Copilot collaborator to a fleet of autonomous agents — managed from one place"
  meta="Agentic Systems · 2026-06-16"
/>

---

<!-- SLIDE: Core Question -->

<CoreQuestionSlide
  question="How do we run five agents in parallel without losing control of the codebase?"
  subtext="The GitHub Copilot App ships a new desktop control plane for orchestrating autonomous agents."
  highlight="What changes when you can run five in parallel?"
  :cards='[
    { icon: "👩‍💻", title: "Senior Engineer", description: "How do I delegate routine work without losing visibility into what agents are doing?" },
    { icon: "🧑‍💼", title: "Tech Lead", description: "Can I run five agents in parallel on our backlog without creating chaos?" },
    { icon: "📊", title: "Eng Manager", description: "Is fleet delegation safe, auditable, and enforceable at organizational scale?" },
    { title: "0 branch conflicts", description: "Isolated worktrees make parallel agent work safe by design, not coordination" },
    { title: "20 min CVE → PR", description: "Plan mode maps blast radius; Autopilot executes — with a full audit trail" },
    { title: "5× task throughput", description: "Dispatch five agents to five independent backlog items simultaneously" }
  ]'
/>

---

<!-- SLIDE: TOC -->

<TocSlide
  :sections='[
    { icon: "🚢", title: "The Fleet Model", subtitle: "What is this? The paradigm shift.", blurb: "Dashboard, dispatch table, and when to reach for the fleet", slide: 4 },
    { icon: "🔒", title: "Safe Parallelism", subtitle: "Is it safe? Yes — by construction.", blurb: "Worktrees, sandboxes, and policy: three guarantees", slide: 9 },
    { icon: "🎛️", title: "Control Surfaces", subtitle: "How much control do I keep?", blurb: "Modes, Canvas, issue briefs, and what breaks", slide: 12 },
    { icon: "⚙️", title: "Sessions to Systems", subtitle: "What does done look like at scale?", blurb: "CVE in 20 min, repeatable workflows, Agent Merge", slide: 18 }
  ]'
/>

---

<!-- SLIDE: Part 1 — The Fleet Model -->

<SectionOpenerSlide
  :partNumber="1"
  title="The Fleet Model"
  subtitle="Problem before product: serial bottleneck → fleet reveal → coordinator role shift"
  :cards='[
    { icon: "📊", title: "My Work Dashboard", blurb: "All sessions, PRs, automations in one view" },
    { icon: "🚀", title: "The Dispatch Table", blurb: "Four agents on four issues simultaneously" },
    { icon: "🗺️", title: "When to Use the Fleet", blurb: "One task → VS Code; two+ → Copilot App" }
  ]'
  :terminal='{ context: "Dispatching four agents simultaneously from My Work", detail: "Four PRs by 10am — zero supervision required" }'
/>

---

<!-- SLIDE: VS Code vs Copilot App —— The Fork -->

<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔀"
  pillLabel="The Fleet Model · The Fork"
  title="Already Using Copilot in VS Code? Here&#39;s the Fork"
  :left='{
    header: "VS Code Agent Mode",
    icon: "💻",
    items: [
      { title: "Single focused task", detail: "Deep in-context, flow-state work on one branch" },
      { title: "One session at a time", detail: "Per developer, per working directory" },
      { title: "Extension-based", detail: "Already installed — no separate app needed" },
      "Best when approach is clear and scope is bounded"
    ]
  }'
  :right='{
    header: "GitHub Copilot App",
    icon: "🚢",
    items: [
      { title: "Parallel fleet dispatch", detail: "Multiple independent tasks running simultaneously" },
      { title: "Multiple isolated sessions", detail: "Each agent in its own git worktree" },
      { title: "Standalone desktop install", detail: "My Work dashboard as the coordination surface" },
      "Best when two or more tasks can run independently"
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: My Work Dashboard -->

<FourCardGridSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="The Fleet Model · My Work"
  title="My Work: The Coordinator&#39;s View"
  :cards='[
    { icon: "⚡", title: "Active Sessions", description: "Every live agent with its task description, elapsed time, current mode, and status" },
    { icon: "🔀", title: "Open PRs", description: "All pull requests created by agent sessions, surfaced for review without tab-switching" },
    { icon: "🔄", title: "Automations", description: "Background workflow runs with last-run status and next scheduled execution time" },
    { icon: "🔔", title: "Notifications", description: "Agent needs input, hit a blocker, or completed a PR — everything in one place" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Monday Morning Dispatch -->

<FourCardGridSlide
  :partNumber="1"
  pillIcon="🚀"
  pillLabel="The Fleet Model · Dispatch Table"
  title="Monday Morning — Four Agents, Four Issues, One Dashboard"
  :cards='[
    { icon: "🔵", title: "Agent 1 · Plan", description: "Fix checkout accessibility violations — PR reviewed before any code applies to the branch" },
    { icon: "🟣", title: "Agent 2 · Autopilot", description: "Update all npm dev dependencies — PR with updated package.json and lock file" },
    { icon: "🟣", title: "Agent 3 · Autopilot", description: "Generate unit tests for auth/ module — PR with full coverage for each exported function" },
    { icon: "🟡", title: "Agent 4 · Interactive", description: "Triage last week&#39;s untagged issues — labels and priorities applied, ready to confirm" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: When to Reach for the Fleet -->

<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="The Fleet Model · Decision Tree"
  title="When to Reach for the Fleet Model"
  :columns='[
    { icon: "1️⃣", title: "One Task", description: "Stay in VS Code agent mode. No need to switch apps — flow state matters more than fleet capacity.", items: ["In-context editing", "Single branch focus", "Extension already active"] },
    { icon: "2️⃣", title: "Two or More Tasks", description: "Open the Copilot App and dispatch in parallel. Then choose the right mode for each task.", items: ["Ambiguous → Interactive", "Scoped → Plan", "Routine → Autopilot"] },
    { icon: "🔄", title: "Recurring Pattern", description: "Convert a validated session into a repeatable workflow. The dispatch becomes a scheduled automation.", items: ["Trigger: cron or event", "Versioned in the repo", "Agent Merge optional"] }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — Safe Parallelism -->

<SectionOpenerSlide
  :partNumber="2"
  title="Safe Parallelism"
  subtitle="Trust by Design: three guarantees that make fleet delegation safe by construction"
  :cards='[
    { icon: "🌿", title: "Worktree Isolation", blurb: "One branch per agent — no collision possible" },
    { icon: "📦", title: "Sandbox Containment", blurb: "Agents can&#39;t escape their permitted scope" },
    { icon: "🛡️", title: "Policy Control", blurb: "Org admins set scope, merge, and audit rules" }
  ]'
  :terminal='{ context: "git worktree add — one command per agent session", detail: "Parallel by construction, not coordination" }'
/>

---

<!-- SLIDE: Trust by Design — Three Guarantees -->

<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔒"
  pillLabel="Safe Parallelism · Trust by Design"
  title="Three Guarantees — One Proof That Parallel Is Safe"
  :columns='[
    { icon: "🌿", title: "Worktree Isolation", description: "Each agent gets its own branch and directory. File collisions are impossible by construction.", items: ["git worktree add per session", "Each agent on its own branch", "No file-collision risk"] },
    { icon: "📦", title: "Sandbox Containment", description: "Agents can&#39;t reach beyond their permitted scope — in cloud or local runtimes.", items: ["Cloud: isolated compute", "Local: bounded to workspace", "No lateral movement"] },
    { icon: "🛡️", title: "Policy Control", description: "Org admins set permitted environments, merge eligibility, and audit scope once.", items: ["Permitted environment types", "Merge eligibility per repo", "Full audit log"] }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: worktree-init.sh —— Pre-Initialize Your Fleet -->

<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="💻"
  pillLabel="Safe Parallelism · Take-Home Script"
  title="worktree-init.sh — Pre-Initialize Your Fleet"
  codePosition="left"
  :code='{
    language: "bash",
    filename: "worktree-init.sh",
    content: "#!/usr/bin/env bash\nN=${1:-4}; PREFIX=${2:-copilot}\nTS=$(date +%H%M)\nREPO=$(basename $(git rev-parse --show-toplevel))\n\ngit fetch origin main -q\n\nfor i in $(seq 1 $N); do\n  git worktree add \\\n    -b ${PREFIX}-${TS}-${i} \\\n    ../${REPO}-${PREFIX}-${i} origin/main\n  echo \"  \u2713 Worktree $i ready\"\ndone"
  }'
  :features='[
    { icon: "🔀", title: "Isolated branches", description: "Each worktree gets its own branch, named with session timestamp and index" },
    { icon: "📁", title: "Separate directories", description: "Agent sessions point to different root directories — no file collisions possible" },
    { icon: "🚀", title: "Scales to N agents", description: "Pass the agent count and each gets a ready worktree before any session starts" }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Control Surfaces -->

<SectionOpenerSlide
  :partNumber="3"
  title="Control Surfaces"
  subtitle="Autonomy is a dial, not a switch — modes, Canvas, handbrake, and what breaks"
  :cards='[
    { icon: "🎛️", title: "Three Autonomy Modes", blurb: "Interactive, Plan, Autopilot — dial per task" },
    { icon: "🖼️", title: "Canvas + Handbrake", blurb: "Escalate mid-session without canceling worktree" },
    { icon: "📝", title: "Issue = Agent Brief", blurb: "The brief you write is the spec it executes" }
  ]'
  :terminal='{ context: "Setting the autonomy dial before every session dispatch", detail: "Interactive → Plan → Autopilot — right mode, right task" }'
/>

---

<!-- SLIDE: Three Autonomy Modes -->

<MaturityJourneyRoadmapSlide
  :partNumber="3"
  pillIcon="🎛️"
  pillLabel="Control Surfaces · Autonomy Modes"
  title="Three Modes, One Decision: Set the Dial Per Task"
  subtitle="Interactive → Plan → Autopilot"
  :stages='[
    { label: "Supervised", name: "Interactive", description: "Proposes each step and waits for your approval — ideal for novel, ambiguous, or risky tasks.", icon: "👁️" },
    { label: "Planned", name: "Plan", description: "Drafts a complete approach for review. Executes autonomously once you approve the plan.", icon: "📋" },
    { label: "Autonomous", name: "Autopilot", description: "Executes end-to-end — researches, implements, and opens a PR without checkpoints.", icon: "🚀" }
  ]'
  caption="Autonomy is a dial, not a switch — set it per task, per session"
  :progressDots='{ current: 1, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Mode Selection Table -->

<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="📋"
  pillLabel="Control Surfaces · Mode Selection"
  title="Pick the Mode by Task Characteristics"
  subtitle="Use this as your pre-dispatch checklist"
  :rows='[
    { label: "Unclear", description: "Interactive proposes each step for approval before any code is written", tag: "Interactive" },
    { label: "Ambiguous", description: "Scope unmapped — Plan drafts approach for team review first", tag: "Plan" },
    { label: "High risk", description: "Auth, migrations, deploys — use Interactive or Plan; never Autopilot", tag: "Interactive / Plan" },
    { label: "Routine", description: "Test gen, dep updates, triage — clear criteria make Autopilot safe", tag: "Autopilot" },
    { label: "Security CVE", description: "Plan maps blast radius, then Autopilot patches — sequenced control", tag: "Plan → Autopilot" }
  ]'
  footnote="EM policy note: environment type, Agent Merge eligibility, and audit log scope are org-admin settings — not per-session choices"
  :progressDots='{ current: 2, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Canvas — Live Work Surface -->

<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🖼️"
  pillLabel="Control Surfaces · Canvas"
  title="Canvas: Not a Chat Window — a Live Work Surface"
  :left='{
    header: "What a Canvas Contains",
    icon: "📋",
    items: [
      { title: "Task brief", detail: "Written by you, editable during the session" },
      { title: "PR diff view", detail: "Real-time review of agent edits as they accumulate" },
      { title: "Terminal stream", detail: "Live output from the agent&#39;s running commands" },
      { title: "Deployment status", detail: "CI checks and pipeline state as they change" }
    ]
  }'
  :right='{
    header: "Pull the Handbrake",
    icon: "🛑",
    items: [
      { title: "Mid-session escalation", detail: "Autopilot → Interactive without canceling the worktree" },
      { title: "Add a context note", detail: "Write something the agent reads on its next step" },
      { title: "Cancel cleanly", detail: "Abandon the worktree — zero commits, zero cleanup required" },
      "MCP tools accessible directly from Canvas"
    ]
  }'
  :progressDots='{ current: 3, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Issue Quality = Agent Quality -->

<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="Control Surfaces · Issue Brief"
  title="Issue Quality = Agent Quality"
  codePosition="left"
  :code='{
    language: "markdown",
    filename: "issue-brief-template.md",
    content: "## Objective\nOne paragraph: what we want and why.\n\n## Acceptance Criteria\n- [ ] Criterion 1 — concrete and testable\n- [ ] Criterion 2 — concrete and testable\n\n## Scope\nIn scope: src/auth/, tests/auth/\nOut of scope: do not touch src/legacy/\n\n## Autonomy Mode\n- [ ] Interactive  - [ ] Plan  - [x] Autopilot"
  }'
  :features='[
    { icon: "🎯", title: "Objective drives intent", description: "One paragraph with what and why — agents need context, not just commands" },
    { icon: "✅", title: "Criteria are test cases", description: "Binary, verifiable conditions — the agent measures its output against these" },
    { icon: "🚧", title: "Scope prevents drift", description: "Explicit in-scope and out-of-scope — missing exclusions are the most common source of PR surprises" },
    { icon: "🎛️", title: "Mode as a contract", description: "Declare the autonomy mode in the brief — sets expectations before the session begins" }
  ]'
  :progressDots='{ current: 4, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: What Breaks -->

<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="⚠️"
  pillLabel="Control Surfaces · What Breaks"
  title="What Breaks — Name It Before You Scale"
  :columns='[
    { icon: "🤯", title: "Autopilot on Ambiguous Scope", description: "Scope mismatches become PR surprises, not mid-session conversations. No in-session recovery path.", items: ["No recovery path mid-session", "Wrong assumptions surface in the diff", "Fix: use Plan when approach is unclear"] },
    { icon: "📝", title: "Unstructured Issue Brief", description: "Low-quality brief = low-quality agent output, regardless of mode or capability.", items: ["Agent infers missing intent", "Acceptance criteria missing = drift", "Fix: three minutes on the brief"] },
    { icon: "🚫", title: "Skipping Canvas Escalation", description: "No handbrake = no recovery path when Autopilot veers. The worktree must be abandoned.", items: ["Work lost on wrong-approach branch", "Worktree discarded, restart required", "Fix: watch the terminal stream early"] }
  ]'
  :progressDots='{ current: 5, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Sessions to Systems -->

<SectionOpenerSlide
  :partNumber="4"
  title="Sessions to Systems"
  subtitle="CVE in 20 minutes, then weekly deps on autopilot — delegation becomes infrastructure"
  :cards='[
    { icon: "🔐", title: "CVE in 20 Minutes", blurb: "Plan maps blast radius, Autopilot patches it" },
    { icon: "⚙️", title: "Repeatable Workflows", blurb: "Sessions converted to scheduled automations" },
    { icon: "🔀", title: "Agent Merge", blurb: "CI, reviews, and merge handled autonomously" }
  ]'
  :terminal='{ context: "Converting a validated session into a scheduled workflow", detail: "cron: 0 9 * * MON — the Monday dispatch runs itself" }'
/>

---

<!-- SLIDE: CVE in 20 Minutes -->

<ProblemSolutionOutcomeSlide
  :partNumber="4"
  pillIcon="🔐"
  pillLabel="Sessions to Systems · CVE Response"
  title="Security CVE — 20 Minutes from Alert to PR"
  :problem='{
    header: "The Situation",
    items: [
      "CVE flagged in dependency scanner for a transitive npm package",
      "Impact surface unknown — upgrade could break callsites across multiple modules",
      { title: "Risk of blind patching", detail: "Can&#39;t Autopilot without knowing the blast radius first" }
    ]
  }'
  :solution='{
    header: "The Two-Phase Response",
    items: [
      { title: "Phase 1 — Plan mode", detail: "Maps all usages of the affected package; produces blast-radius analysis for review" },
      "Team reviews analysis, approves approach (2 minutes)",
      { title: "Phase 2 — Autopilot", detail: "Applies the upgrade, runs test suite, generates regression tests for affected paths" }
    ]
  }'
  :outcome='{
    header: "The Outcome",
    items: [
      "PR with upgrade, regression tests, and full audit log of every agent action",
      "Audit trail meets security review requirements — no additional documentation needed",
      "Full remediation before the incident response call ends"
    ],
    metrics: [{ value: "20min", label: "alert to merged PR with patch and tests" }]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Sessions to Workflows to Pipelines -->

<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="⚙️"
  pillLabel="Sessions to Systems · Automation"
  title="Sessions → Workflows → Autonomous Pipelines"
  :left='{
    header: "Repeatable Workflows",
    icon: "🔄",
    items: [
      { title: "Convert any validated session", detail: "Save the pattern as a versioned workflow definition in the repo" },
      { title: "Trigger: schedule or event", detail: "cron: every Monday 09:00 UTC — or on issue labeled agent-task" },
      { title: "mode + auto_merge", detail: "mode: autopilot + auto_merge: true → fully unattended" },
      "Versioned in agent-workflow.yml alongside the code"
    ]
  }'
  :right='{
    header: "Agent Merge",
    icon: "🔀",
    items: [
      { title: "CI fails → agent fixes", detail: "Re-reads failure output, pushes corrected commit, re-triggers CI" },
      { title: "Review comment → agent updates", detail: "Interprets feedback, makes changes, re-requests review" },
      { title: "Conditions met → agent merges", detail: "CI green + required approvals + no unresolved comments" },
      "Enabled per workflow or per session — never on by default"
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Agent Merge — When It Fits -->

<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🤝"
  pillLabel="Sessions to Systems · Agent Merge"
  title="Agent Merge — When It Fits and When It Doesn&#39;t"
  :columns='[
    { icon: "✅", title: "Fully Automatable", description: "Routine tasks with unambiguous criteria — dep updates, doc gen, test backfill, triage.", items: ["CI green = done", "No human review required", "auto_merge: true"] },
    { icon: "🔍", title: "Human Approves, Agent Merges", description: "Engineer reviews and approves the PR; Agent Merge handles the mechanical CI-to-merge step.", items: ["approvals_required: 1", "Agent waits for conditions", "Merges when all gates pass"] },
    { icon: "🚫", title: "Keep a Human in the Loop", description: "Novel features, security changes, or sessions where task scope was uncertain at dispatch.", items: ["Architecture decisions", "Auth or payments code", "Any Interactive session output"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before and After -->

<BeforeAfterSlide
  header="From Sequential Copilot to Agent Fleet"
  :leftItems='[
    "One agent at a time — sequential context switching between tasks and branches",
    "Manual PR and CI monitoring across multiple windows and tabs",
    "Recurring maintenance tasks triggered and supervised by hand",
    "Parallel work risks branch conflicts without careful coordination"
  ]'
  :rightItems='[
    "Multiple parallel agent sessions, each in an isolated git worktree",
    "My Work dashboard surfaces all sessions, PRs, and CI status in one view",
    "Repeatable workflows run on schedule or on GitHub events automatically",
    "Worktree isolation makes parallel work safe by design, not coordination"
  ]'
  :metrics='[
    { value: "0", detail: "branch conflicts across parallel agent sessions" },
    { value: "20min", detail: "CVE alert → PR with patch and regression tests" },
    { value: "5×", detail: "throughput on independent backlog tasks" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->

<WhatYouCanDoTodaySlide
  :today='[
    "Download the Copilot app from github.com/features/ai/github-app and sign in",
    "Open My Work and explore the unified dashboard layout",
    "Start one Plan-mode session on a well-specified issue to see the proposal flow"
  ]'
  :thisWeek='[
    "Pre-initialize two parallel worktrees and dispatch two agents simultaneously",
    "Review both PRs and compare how each session logged its reasoning",
    "Draft your first issue brief using Objective / Acceptance Criteria / Scope / Mode"
  ]'
  :thisMonth='[
    "Audit your backlog for agent-ready tickets — clear criteria, independent of active dev",
    "Configure your first repeatable workflow for a recurring maintenance task",
    "Enable Agent Merge on a low-risk workflow — the Monday dispatch runs itself"
  ]'
  footer="The Monday morning dispatch that ran manually in the dispatch table — now runs itself."
/>

---

<!-- SLIDE: References -->

<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/github-copilot-app", label: "About the GitHub Copilot app — GitHub Docs", description: "Core concepts, availability, autonomy modes, and policy configuration" },
      { href: "https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started", label: "Getting started with the GitHub Copilot app", description: "Prerequisites, installation, and first session walkthrough" },
      { href: "https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/", label: "GitHub Copilot app: The agent-native desktop experience", description: "Launch announcement with capability overview and design rationale" },
      { href: "https://github.com/features/ai/github-app", label: "GitHub Copilot app product page", description: "Download and subscription access" },
      { href: "https://git-scm.com/docs/git-worktree", label: "Git worktrees reference — Git Documentation", description: "Official git worktree command reference" }
    ] },
    { title: "🛠️ Related Tech Talks", color: "purple", items: [
      { label: "Agent Teams", description: "Architectural patterns behind multi-agent systems the Copilot App builds on" },
      { label: "Agentic Workflows", description: "Trigger/automation patterns for GitHub Actions and Copilot" },
      { label: "MCP Apps", description: "Extending agent capabilities via Model Context Protocol tools" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->

<ThankYouSlide
  title="The Fleet Is Ready"
  subtitle="Five agents, five issues, zero conflicts — and it all runs itself by next Monday"
  :cards="[
    { value: '5 agents, 0 conflicts', detail: 'Isolated worktrees make parallel agent work safe by design, not careful coordination' },
    { value: 'Autonomy is a dial', detail: 'Interactive, Plan, and Autopilot — set the right trust level per task, per session' },
    { value: 'Pull the handbrake', detail: 'Canvas escalation from Autopilot mid-session — the safety net that makes Autopilot worth trying' }
  ]"
  prompt="What&#39;s the first ticket you&#39;re dispatching to an agent tomorrow morning?"
/>
