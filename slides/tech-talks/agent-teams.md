---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Building Agent Systems
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Building Agent Systems
mdc: true
section: Agentic Engineering
status: active
updated: 2026-04-22
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
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
</script>

# Title
<TitleSlide
  title="Building Agent Systems"
  subtitle="Subagents, Teams, and Autonomous Execution"
  tagline="Compose AI agents into systems that handle complex tasks, run autonomously, and improve over time"
  meta="Tech Talk · 60 minutes"
/>

---

# Core Question
<CoreQuestionSlide
  question="What mechanisms make multi-agent AI work, and how do I compose them into autonomous systems?"
  subtext="Single agents hit a ceiling: context fills, supervision is the bottleneck, quality degrades."
  highlight="The solution is architecture, not a smarter single agent."
  :cards='[
    { icon: "🔧", title: "Developers", description: "Subagent patterns, parallel execution, and autonomous hand-offs — no setup required" },
    { icon: "🏗️", title: "Architects", description: "Design scalable agent systems using coordinator, worktree, and ensemble patterns" },
    { icon: "👔", title: "Engineering Managers", description: "The business case: 9.7 hrs/week reclaimed per developer" },
    { title: "300–500 LOC ceiling", description: "Single agents hit a hard wall before most real features are complete" },
    { title: "50–80% irrelevant context", description: "One agent juggling research + planning + implementation by execution time" },
    { title: "5–10× throughput gain", description: "Background agents with worktrees vs. supervised single-agent execution" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🧱", title: "Subagents", subtitle: "The Building Block", blurb: "Context isolation, parallel execution, and the vocabulary to reason with", slide: 4 },
    { icon: "👥", title: "Agent Teams", subtitle: "Organized Specialists", blurb: "Squad: persistent role specialists that compound knowledge across sessions", slide: 8 },
    { icon: "🚀", title: "Autonomous Execution", subtitle: "Background Agents + Worktrees", blurb: "Hand off to background agents — 85 active minutes become 27", slide: 12 },
    { icon: "🎭", title: "Agent Council", subtitle: "When Models Think Differently", blurb: "Claude + GPT + Gemini in collaborative or adversarial deliberation", slide: 17 },
  ]'
/>

---

# Part 1 — Subagents: The Building Block
<SectionOpenerSlide
  :partNumber="1"
  title="Subagents: The Building Block"
  subtitle="The primitive mechanism that makes all multi-agent patterns possible"
  :cards='[
    { icon: "🧱", title: "Context Isolation", blurb: "Each subagent has its own 200K window" },
    { icon: "⚡", title: "Parallel Execution", blurb: "Independent tasks run simultaneously" },
    { icon: "📦", title: "Summary Returns", blurb: "4–6× token reduction — findings only" },
  ]'
  :terminal='{ context: "Auth feature: research + analyze + implement", detail: "3 parallel subagents → 8 min vs 22 min serial" }'
/>

---

# The Agent Decision Tree
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="Subagents: Navigation"
  title="The Agent Decision Tree"
  subtitle="Self-select your entry point — one branch lights per section of this talk"
  :rows='[
    { label: "Simple task", description: "Single-phase, under 200 LOC — plan mode handles it in-session", tag: "Plan Mode" },
    { label: "Multi-phase", description: "Research → analyze → implement with clean summary handoffs", tag: "Subagents" },
    { label: "Role specialists", description: "Planner + coder + reviewer with VS Code-enforced tool boundaries", tag: "Teams → S2" },
    { label: "No supervision", description: "Autonomous execution in its own branch — review when finished", tag: "Background → S3" },
    { label: "Uncertain decision", description: "Architecture choice with high stakes — stress-test across model families", tag: "Council → S4" }
  ]'
  footnote="Each branch maps to a section of this talk — the decision tree fully lights by the end"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Two Ways to Invoke a Subagent
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="📤"
  pillLabel="Subagents: Invocation"
  title="Two Ways to Invoke a Subagent"
  :left='{
    header: "Implicit (Chat Hints)",
    icon: "💬",
    items: [
      { title: "Natural language delegation", detail: "Copilot infers intent and spawns the subagent automatically" },
      "Zero setup — describe delegation in chat",
      "Best for ad-hoc research and exploratory tasks",
      { title: "Isolation guaranteed", detail: "All exploration stays isolated; only the summary returns" }
    ]
  }'
  :right='{
    header: "Explicit (Prompt Files)",
    icon: "📄",
    items: [
      { title: "Multi-phase .md files with frontmatter", detail: "tools, agents, and phases declared explicitly" },
      "Version-controlled — team-wide consistency",
      "Best for reproducible and repeatable workflows"
    ],
    code: { language: "yaml", content: "---\nname: feature-workflow\ntools: [&#39;agent&#39;, &#39;read&#39;, &#39;edit&#39;]\n---\n## Phase 1: Research\n## Phase 2: Implement" }
  }'
  :insight='{ icon: "⚡", text: "Parallel mode: 3 independent subagents run simultaneously — 22 min serial becomes 8 min parallel." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Four Named Patterns
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📚"
  pillLabel="Subagents: Vocabulary"
  title="Four Named Patterns"
  :cards='[
    { icon: "🧱", title: "Subagents", description: "Context isolation + parallel delegation — the primitive that powers every pattern that follows" },
    { icon: "👥", title: "Agent Teams", description: "Role specialists via coordinator — planner, coder, reviewer each in their own context window" },
    { icon: "🤖", title: "Background Agents", description: "Autonomous execution in isolated git worktrees — supervision-free async work" },
    { icon: "🎭", title: "Agent Council", description: "Model diversity deliberation — Claude, GPT, and Gemini each bring different blind spots" }
  ]'
  :insight='{ icon: "🔑", text: "Vocabulary before the tour — these four names give you the words to think with for the next 45 minutes." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Agent Teams: Organized Specialists
<SectionOpenerSlide
  :partNumber="2"
  title="Agent Teams: Organized Specialists"
  subtitle="Role-based coordination via the coordinator-delegate pattern with Squad"
  :cards='[
    { icon: "🎯", title: "Coordinator Pattern", blurb: "Routes work, never implements directly" },
    { icon: "🔒", title: "Tool Enforcement", blurb: "VS Code validates — impossible, not just discouraged" },
    { icon: "🧠", title: "Persistent Memory", blurb: "Knowledge compounds across sessions" },
  ]'
  :terminal='{ context: "Team, build the authentication system", detail: "4 specialists in parallel — no context switching, no waiting" }'
/>

---

# The Coordinator Pattern
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🎯"
  pillLabel="Agent Teams: Coordinator"
  title="Roles, Tools, and Boundaries"
  :columns='[
    { icon: "🎯", title: "Coordinator / Lead", description: "Routes work to specialists, enforces reviewer protocol, selects models by cost — never implements directly", items: ["Scope + decisions", "Reject → reassign (no self-review)"] },
    { icon: "💻", title: "Dev Specialists", description: "Frontend, backend, domain experts each in their own context with full edit and create access", items: ["Own 200K context", "Parallel execution"] },
    { icon: "🔍", title: "Quality Roles", description: "Tester + Reviewer with read-only and analysis tools — VS Code validates before invocation, impossible not just discouraged", items: ["Cannot modify files", "Test + analyze only"] }
  ]'
  :insight='{ icon: "💡", text: "10-minute setup with Squad — npx github:bradygaster/squad — persistent specialists living in your repo." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Squad Memory Layers
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🧠"
  pillLabel="Agent Teams: Squad Memory"
  title="Knowledge That Compounds with Every Session"
  subtitle="Four memory layers — agents start each session smarter than the last"
  :rows='[
    { label: "charter.md", description: "Identity, expertise, boundaries, and voice — read only by that agent", tag: "Per-agent" },
    { label: "history.md", description: "Project-specific learnings accumulated across real work sessions", tag: "Per-agent" },
    { label: "decisions.md", description: "Team-wide decisions all agents read before starting any task", tag: "All agents" },
    { label: "skills/", description: "Reusable patterns earned from real work — collective institutional IQ", tag: "All agents" }
  ]'
  footnote="Session 1: knows your stack. Session 5: knows your conventions. Session 20: knows your tech debt."
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Squad in Action
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="👥"
  pillLabel="Agent Teams: In Action"
  title="Squad Handles the Auth System"
  subtitle="Fan-out to specialists — decisions captured in shared memory"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "Team, build the authentication system" },
    { type: "thinking" },
    { type: "response", lines: ["🏗️ Ripley: Scoping requirements, defining API contracts...", "⚛️ Dallas: Building login form and session UI...", "🔧 Kane: Setting up JWT endpoints and token refresh...", "🧪 Lambert: Writing test cases from the spec..."] },
    { type: "divider" },
    { type: "response", lines: ["🧪 Lambert: Token refresh has a gap — edge case under concurrent load", "🔧 Kane: Picking it up — adding token nonce table"] },
    { type: "divider" },
    { type: "outcome", text: "decisions.md updated: JWT format, session storage, endpoint contracts" },
    { type: "outcome", text: "4 specialists ran in parallel — no context switching, no waiting" }
  ]'
  footerMetric="10 min setup → persistent team that learns your codebase"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Autonomous Execution: Background Agents + Worktrees
<SectionOpenerSlide
  :partNumber="3"
  title="Autonomous Execution"
  subtitle="Background agents + git worktrees — shift supervision from continuous to review-only"
  :cards='[
    { icon: "⏱️", title: "9.7 hrs/week", blurb: "Active time reclaimed per developer" },
    { icon: "🌿", title: "Git Worktrees", blurb: "Each agent gets isolated branch + filesystem" },
    { icon: "🚀", title: "Zero Supervision", blurb: "Plan → hand-off → review finished work" },
  ]'
  :terminal='{ context: "10 tasks/week with background agents", detail: "270 min active vs 850 min supervised" }'
/>

---

# 9.7 Hours Reclaimed Per Week
<HeroStatSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Autonomous: Business Case"
  title="9.7 Hours Reclaimed Per Week"
  subtitle="10 tasks × 58 minutes saved per task — the EM math that turns a demo into a budget conversation"
  :hero='{ value: "9.7 hrs", label: "reclaimed per developer per week with background agents", source: "10 tasks × 58 min saved: 850 min supervised → 270 min active" }'
  :supporting='[
    { icon: "⏱️", title: "85 → 27 min per task", description: "Plan (15) + hand-off (2) + review (10) replaces plan + supervise + review" },
    { icon: "🔀", title: "3 parallel tasks: 51 min total", description: "vs 255 min serial supervised — 5× faster for independent work" },
    { icon: "🔧", title: "Built into VS Code 1.109+", description: "Session picker + worktree creation built in — zero additional tooling" },
    { icon: "📋", title: "Auth runs unsupervised", description: "Hand off the auth system — review the finished branch when done" }
  ]'
  :insight='{ icon: "💡", text: "Business case first: 68% of your developers&#39; implementation time returned to them — not a demo convenience." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Supervised vs Background Agent
<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Autonomous: Hand-Off Workflow"
  title="Supervised vs Background Agent"
  subtitle="Same output — 68% less of your time"
  leftLabel="Supervised Execution"
  rightLabel="Background Agent"
  :steps='[
    { left: { label: "Plan the task", note: "15 min to define scope and approach" }, right: { label: "Plan the task", note: "15 min — identical, same quality" } },
    { left: { label: "Actively supervise", note: "60 min answering questions, monitoring progress" }, right: { label: "2-min hand-off", note: "Explicit criteria + constraints → agent runs in worktree" } },
    { left: { label: "Answer mid-task questions", note: "Cannot parallelize — supervision is the bottleneck" }, right: { label: "Do other work", note: "Agent executes autonomously — you are unblocked" } },
    { left: { label: "Review output", note: "10 min — often re-explaining intent" }, right: { label: "Review finished branch", note: "10 min — criteria were explicit, output matches intent" } }
  ]'
  :outcomeLeft='{ icon: "⏱️", label: "85 min active — continuous supervision required" }'
  :outcomeRight='{ icon: "✅", label: "27 min active — 68% reduction in developer time" }'
  summaryMetric="10 tasks/week: 850 min supervised → 270 min with background agents"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Git Worktree Isolation
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="🌿"
  pillLabel="Autonomous: Worktree Isolation"
  title="Each Agent Gets Its Own Branch"
  :before='{
    header: "Shared Workspace",
    items: [
      { title: "File conflicts guaranteed", detail: "Multiple agents editing the same files simultaneously" },
      "90 min to revert a failed experiment from shared history",
      "Agent B can see Agent A in-progress — true isolation lost",
      "One agent at a time or accept collision risk"
    ]
  }'
  :after='{
    header: "Git Worktrees",
    items: [
      { title: "Zero conflicts by design", detail: "Agent A and Agent B both edit main.js — different worktrees" },
      "Failed experiment removed in 5 min — just delete the worktree",
      "VS Code 1.109 creates worktrees automatically on agent start",
      "Review branch → merge if successful, remove if not"
    ]
  }'
  :metrics='[
    { value: "0", label: "conflicts across parallel agents" },
    { value: "5 min", label: "to discard a failed experiment" },
    { value: "3×", label: "agents editing same file safely" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Three Parallel Patterns
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔀"
  pillLabel="Autonomous: Parallel Patterns"
  title="Three Parallel Execution Patterns"
  :columns='[
    { icon: "🛤️", title: "Independent Features", description: "Feature A, B, C → worktree-a, -b, -c running simultaneously", items: ["Plan all 3 upfront", "Review 3 finished PRs"] },
    { icon: "🧪", title: "Experimental Variants", description: "Redis vs LRU vs hybrid — 3 real implementations, benchmark decides the winner", items: ["Empirical, not speculative", "Discard losers instantly"] },
    { icon: "⚙️", title: "Parallel Roles", description: "Implement + write migration tests + update docs simultaneously in 3 worktrees", items: ["Merge in dependency order", "No sequential waiting"] }
  ]'
  :insight='{ icon: "💡", text: "CLI fan-out: /fleet implement Feature A in auth/, Feature B in payments/ — orchestrates all patterns from the terminal." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Agent Council: When Different Models Think Differently
<SectionOpenerSlide
  :partNumber="4"
  title="Agent Council"
  subtitle="When Different Models Think Differently"
  :cards='[
    { icon: "🤝", title: "Collaborative Mode", blurb: "Agents enrich each other&#39;s drafts" },
    { icon: "⚔️", title: "Adversarial Mode", blurb: "Models debate to stress-test decisions" },
    { icon: "🎯", title: "Auth Flaw Caught", blurb: "Council surfaces what 3 layers missed" },
  ]'
  :terminal='{ context: "stress-test: Review the auth implementation for production readiness", detail: "Flaw caught. Verdict: OVERTURNED." }'
/>

---

# Collaborative vs Adversarial
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🎭"
  pillLabel="Agent Council: Two Modes"
  title="Two Modes, One Install"
  :left='{
    header: "Collaborative 🤝",
    icon: "🤝",
    items: [
      { title: "Phase 1 (parallel)", detail: "Alpha, Beta, Gamma each draft independently" },
      { title: "Phase 2 (parallel)", detail: "Each reads the other two drafts and improves" },
      { title: "Phase 3", detail: "Orchestrator synthesizes all three enriched perspectives" },
      { title: "7 model calls total", detail: "Wall-clock ≈ 2 sequential subagent calls" }
    ]
  }'
  :right='{
    header: "Adversarial ⚔️",
    icon: "⚔️",
    items: [
      { title: "Phase 1 (parallel)", detail: "Alpha, Beta, Gamma tackle the question independently" },
      { title: "Phase 2", detail: "Orchestrator identifies the strongest position" },
      { title: "Phase 3 (parallel)", detail: "Other two agents attempt to tear it apart" },
      { title: "Phase 4 — Verdict", detail: "SURVIVED / MODIFIED / OVERTURNED + rationale" }
    ]
  }'
  :insight='{ icon: "🔑", text: "Trigger auto-detected: council:/brainstorm: → collaborative; debate:/stress-test:/vs → adversarial." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Council Catches the Auth Flaw
<AITerminalTranscriptSlide
  :partNumber="4"
  pillIcon="🎯"
  pillLabel="Agent Council: Auth Flaw"
  title="The Flaw Surfaces Under Deliberation"
  subtitle="Threaded through S1 → S2 → S3 — council finds what every prior layer missed"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "stress-test: Review the auth implementation for production readiness" },
    { type: "thinking" },
    { type: "response", lines: ["Alpha: JWT refresh has a race condition under concurrent load —", "  simultaneous requests generate multiple valid tokens simultaneously"] },
    { type: "divider" },
    { type: "response", lines: ["Beta: Confirmed race condition. Token nonce is 8 bytes —", "  entropy insufficient, collision guaranteed at 500+ concurrent users"] },
    { type: "divider" },
    { type: "response", lines: ["Gamma: Session invalidation also affected — logout cannot", "  guarantee all tokens revoked across distributed instances"] },
    { type: "divider" },
    { type: "outcome", text: "OVERTURNED: Two critical auth bypass vectors identified under load" },
    { type: "outcome", text: "Action: distributed nonce table + advisory lock on refresh endpoint" }
  ]'
  footerMetric="The human approved the Squad artifact. They didn&#39;t attend the meeting."
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Council → Squad: Full Pipeline
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Agent Council: Full Pipeline"
  title="Deliberation → decisions.md → Execution"
  :columns='[
    { icon: "🎭", title: "AgentCouncil Deliberates", description: "Stress-test architecture decisions before committing — model diversity surfaces blind spots no single model catches", items: ["Adversarial for high-stakes decisions", "Collaborative for design exploration"] },
    { icon: "📋", title: "decisions.md Records", description: "Council verdict written to shared memory — all Squad agents read it before starting the next task", items: ["Architecture governs itself", "Human approved the artifact"] },
    { icon: "👥", title: "Squad Executes", description: "Coordinator routes the validated decision to role specialists — implementation starts with the decision already made", items: ["No redundant deliberation", "Persistent memory compounds"] }
  ]'
  :insight='{ icon: "💡", text: "The feedback arrow: council output feeds autonomous execution. Deliberation → Execution is the complete loop." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Single Agent to Multi-Agent Architecture"
  :leftItems='["Single agent juggling research, planning, and implementation", "50–80% of context is irrelevant by execution time", "Continuous supervision required — cannot look away", "Multiple agents sharing workspace create file conflicts"]'
  :rightItems='["Coordinator delegates to role-specialized subagents in parallel", "Only 100–500 token structured summaries return to main context", "Background agents execute autonomously in isolated worktrees", "AgentCouncil stress-tests decisions before execution commits"]'
  :metrics='[
    { value: "9.7 hrs/wk", detail: "active time reclaimed with background agents" },
    { value: "5–10×", detail: "throughput with parallel specialized execution" },
    { value: "0 conflicts", detail: "with git worktree isolation per agent" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Try implicit subagent: Run a subagent to research X, return a structured summary", "Run 3 parallel subagents on a PR: security, performance, and testing in parallel", "Hand off one task to a background agent via VS Code session picker and review the branch"]'
  :thisWeek='["Install Squad with npx github:bradygaster/squad and form your first team", "Write charter.md files for each role: Lead, Dev, Tester", "Install AgentCouncil and run one adversarial debate on a real architecture decision"]'
  :thisMonth='["Move 10 tasks/week to background agents and measure the active-time reduction", "Establish decisions.md as persistent team memory that compounds across sessions", "Use council deliberation before any architecture decision you will live with for years"]'
  footer="Compose agents the way you compose a team: the right specialist, in the right isolation, at the right time."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 VS Code Documentation", color: "cyan", items: [
        { href: "https://code.visualstudio.com/docs/copilot/agents/subagents", label: "Subagent Invocation and Parallel Execution", description: "Context isolation, parallel subagent patterns" },
        { href: "https://code.visualstudio.com/docs/copilot/customization/custom-agents", label: "Custom Agents in VS Code", description: "YAML frontmatter, tool scoping, model selection" },
        { href: "https://code.visualstudio.com/updates/v1_109#_agent-orchestration", label: "VS Code v1.109 Agent Orchestration", description: "Invocation controls and parallel agent support" },
        { href: "https://code.visualstudio.com/docs/copilot/agents/background-agents", label: "Background Agents Documentation", description: "Hand-off workflow and worktree integration" },
        { href: "https://code.visualstudio.com/updates/v1_109#_agent-session-management", label: "VS Code v1.109 Agent Session Management", description: "Session picker and multi-agent monitoring" },
        { href: "https://git-scm.com/docs/git-worktree", label: "Git Worktrees Reference", description: "Technical reference for worktree lifecycle" }
    ] },
    { title: "🛠️ Production Implementations", color: "purple", items: [
        { href: "https://github.com/bradygaster/squad", label: "Squad — Production Agent Team System", description: "Persistent memory, parallel execution, GitHub Issues integration" },
        { href: "https://github.com/Sentry01/AgentCouncil", label: "AgentCouncil — Multi-Model Deliberation", description: "Claude + GPT + Gemini collaborative and adversarial modes" },
        { label: "Agentic SDLC", description: "Repo, CI/CD, and org-wide patterns for agents at scale" },
        { label: "Copilot Primitives", description: "Instructions, prompts, skills, and agents — the building blocks" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Building Agent Systems"
  subtitle="Subagents, Teams, and Autonomous Execution"
  :cards="[{ icon: '⏱️', value: '9.7 hrs/wk', detail: 'Active Time Reclaimed', subdetail: '10 tasks × 58 min saved with background agents' }, { icon: '🎯', value: 'Auth Flaw Caught', detail: 'Council Surfaces What Layers Miss', subdetail: 'Model diversity as a quality mechanism' }, { icon: '📋', value: 'decisions.md', detail: 'Architecture Governs Itself', subdetail: 'Human approved the artifact — didn\'t attend the meeting' }]"
  prompt="What's your first task to hand off to a background agent this week?"
/>
