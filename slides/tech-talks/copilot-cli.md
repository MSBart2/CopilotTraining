---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot CLI: AI at the Point of Work
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot CLI — AI at the Point of Work
mdc: true
section: "Developers"
status: active
updated: 2026-08-28
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot CLI"
  subtitle="AI at the Point of Work"
  tagline="Close distance across intent, complexity, context, time, and geography."
  meta="GitHub Copilot CLI · Tech Talk · github.com/copilot"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do I bring AI to where the work actually is — and keep steering it from wherever I am?"
  subtext="Your day is 70% outside the editor. AI that stays in the IDE misses most of what&#39;s actually wrong."
  highlight="The terminal sees everything. Now AI can too — and follow you home."
  :cards='[
    { icon: "🛠️", title: "Software Developer", description: "Debug, scaffold, and iterate without leaving the terminal or restarting context" },
    { icon: "⚙️", title: "DevOps Engineer", description: "Triage CI failures, patrol infrastructure, and fix remote servers from any device" },
    { icon: "🚀", title: "CLI Power User", description: "Replace manual trial-and-error with Plan Mode and parallel agent execution" },
    { title: "45 min → 8 min", description: "Docker debugging with Plan Mode: 8 attempts down to 2 targeted checks" },
    { title: "25 min → 5 min", description: "CI build failure analysis automated via copilot -p in a GitHub Actions step" },
    { title: "12 GB on the host", description: "Log forensics performed where data lives — no scp, no compliance exposure" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🧠", title: "Plan Mode", subtitle: "Clarify Intent Before Building", blurb: "Turn ambiguous requests into approved plans before a single line of code is written", slide: 0 },
    { icon: "⚡", title: "Operating Modes", subtitle: "Choose Autonomy with Confidence", blurb: "Interactive, programmatic, fan-out, delegated, and scheduled — with clear permission limits", slide: 0 },
    { icon: "🔄", title: "Context Management", subtitle: "Keep the Session Alive", blurb: "Auto-compaction, repository memory, /rewind recovery, and /chronicle insights", slide: 0 },
    { icon: "🌍", title: "Remote Sessions", subtitle: "The Last Distance Falls", blurb: "Start on any machine, steer from a phone — logs stay where they live", slide: 0 }
  ]'
/>

---

# Part 1 — Plan Mode
<SectionOpenerSlide
  :partNumber="1"
  title="Plan Before You Build"
  subtitle="Open with the Distance Model, then close the intent gap through a quantified Docker story."
  :cards='[
    { icon: "📐", title: "The Distance Model", blurb: "Five gaps; Plan Mode closes intent first" },
    { icon: "🐳", title: "Docker in 8 Minutes", blurb: "Questions → plan → 2 checks vs 8 attempts" },
    { icon: "🦆", title: "Rubber Duck Reviewer", blurb: "Second model reviews plans — enabled by default" }
  ]'
  :terminal='{ context: "Traditional: 8 attempts, 45 minutes, wrong assumptions multiplied", detail: "Plan Mode: 2 targeted checks, 8 minutes, root cause found" }'
/>

---

# The Distance Model
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📐"
  pillLabel="Plan Mode · The Distance Model"
  title="Five Distances Copilot CLI Removes"
  subtitle="Each section of this talk closes a different gap between you and the work"
  :rows='[
    { label: "Intent", description: "AI stops guessing, starts asking — Plan Mode clarifies before acting", tag: "Plan Mode" },
    { label: "Complexity", description: "One task decomposes into parallel subtasks across independent agents", tag: "/fleet" },
    { label: "Context", description: "Session survives compaction and remembers decisions across sessions", tag: "Auto-compact" },
    { label: "Time", description: "Work outlives your attention — background delegation frees the terminal", tag: "& delegate" },
    { label: "Geography", description: "AI meets the problem where it lives — steer from phone or browser", tag: "--remote" }
  ]'
  footnote="The session is the unit of work, not the shell"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Plan Mode: How It Works
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="Plan Mode · How It Works"
  title="Trial-and-Error vs. Collaborative Planning"
  subtitle="Shift+Tab activates Plan Mode — AI asks before acting"
  leftLabel="Traditional Workflow"
  rightLabel="With Plan Mode"
  :steps='[
    { left: { label: "Make request", note: "Describe what you need" }, right: { label: "Make request", note: "Describe what you need" } },
    { left: { label: "AI assumes intent", note: "Picks one interpretation confidently" }, right: { label: "AI asks clarifying questions", note: "Surfaces ambiguities before acting" } },
    { left: { label: "Review output and fix", note: "Wrong assumption discovered too late" }, right: { label: "Approve the plan", note: "Strategy confirmed before code is written" } },
    { left: { label: "Repeat until correct", note: "8 attempts on average" }, right: { label: "Execute with confidence", note: "2 targeted checks — root cause found" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "45 min, 8 failed attempts" }'
  :outcomeRight='{ icon: "✅", label: "8 min, done" }'
  summaryMetric="8 debugging attempts → 2 with Plan Mode"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Docker Debugging in Action
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="🐳"
  pillLabel="Plan Mode · Docker Demo"
  title="Plan Mode in Action: Docker Debugging"
  subtitle="Root cause in 8 minutes — not 45"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "Debug why the backend container won&#39;t start" },
    { type: "thinking", label: "🤔 Copilot (Plan Mode):" },
    { type: "response", lines: ["Before I start, a few questions:", "1. Check docker-compose config, logs, or both?", "2. Include environment variable analysis?", "3. Any recent changes to services or networking?"] },
    { type: "user", text: "Start with logs, then config if needed" },
    { type: "divider" },
    { type: "thinking", label: "🤔 Copilot: Running 2 targeted checks..." },
    { type: "outcome", text: "Port 5000 mapped to 5001 in docker-compose.yml — app expects 5000 internally" },
    { type: "outcome", text: "Fix applied. Container starts successfully." }
  ]'
  footerMetric="45 min, 8 attempts → 8 min, 2 checks"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Operating Modes
<SectionOpenerSlide
  :partNumber="2"
  title="Choose the Right Mode"
  subtitle="Build a decision ladder: interactive diagnosis, headless CI, parallel fan-out, and background delegation."
  :cards='[
    { icon: "💬", title: "Interactive vs Headless", blurb: "copilot for conversation; copilot -p for CI pipelines" },
    { icon: "🚀", title: "/fleet Fan-Out", blurb: "Decompose a plan into parallel subtasks in one approval" },
    { icon: "⏰", title: "Scheduled Patrols", blurb: "/every weekday — recurring agent without external cron" }
  ]'
  :terminal='{ context: "Manual CI triage: 25 minutes, context-switching, no pattern history", detail: "copilot -p in Actions: 5-minute analysis artifact, zero human intervention" }'
/>

---

# The Operating Mode Ladder
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Operating Modes · Decision Ladder"
  title="Match the Mode to the Task"
  :columns='[
    { icon: "💬", title: "Interactive", description: "Unknown root cause, iterative diagnosis, collaborative debugging with context", items: ["copilot", "Plan Mode available", "Real-time steering"] },
    { icon: "📋", title: "Programmatic", description: "Headless CI/CD execution, structured output, zero human interaction required", items: ["copilot -p", "Actions integration", "--allow-tool scoped"] },
    { icon: "☁️", title: "Cloud Delegation", description: "20+ min tasks — security audits, refactors. IDE and terminal stay completely free", items: ["& prefix", "PR on completion", "GitHub-hosted agent"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# CI Automation with copilot -p
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🔧"
  pillLabel="Operating Modes · Programmatic CI"
  title="Build Failure Analysis — Zero Human Intervention"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/build.yml", content: "- name: Analyze failure with Copilot CLI\n  if: failure()\n  env:\n    GITHUB_TOKEN: $COPILOT_GITHUB_TOKEN\n  run: |\n    copilot -p \u2018Analyze the build failure.\u2019\n      --allow-tool shell(gh)\n      --allow-tool shell(git)\n      > failure-analysis.txt\n\n- name: Post analysis as PR comment\n  if: failure()\n  run: gh pr comment --body-file failure-analysis.txt" }'
  :features='[
    { icon: "⏱️", title: "5-Minute Analysis", description: "25-minute manual triage becomes an automated 5-min artifact" },
    { icon: "🔒", title: "Scoped Permissions", description: "--allow-tool limits the agent to gh and git only" },
    { icon: "📄", title: "PR Comment Output", description: "Structured analysis posted directly to the pull request" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# /fleet and Sandboxing
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🚀"
  pillLabel="Operating Modes · Fleet + Containment"
  title="/fleet Executes the Plan — Sandboxes Contain the Risk"
  :left='{
    header: "/fleet Fan-Out",
    icon: "⚡",
    items: [
      { title: "Explicit decomposition", detail: "Orchestrator assigns subtasks to subagents in parallel" },
      { title: "Context isolation", detail: "Each subagent has its own window — no pollution between tasks" },
      "Use after Plan Mode approves the strategy",
      { title: "Cost note", detail: "Each subagent makes independent LLM calls — check multiplier" }
    ],
    code: { language: "bash", content: "/fleet implement all phases of this auth plan" }
  }'
  :right='{
    header: "Containment Options",
    icon: "🔒",
    items: [
      { title: "Local sandbox (/sandbox enable)", detail: "OS containment — no VM, included in Copilot seat" },
      { title: "Cloud sandbox (--cloud)", detail: "Isolated GitHub-hosted environment — metered" },
      { title: "disableBypassPermissionsMode", detail: "Enterprise policy — prevents --yolo in org environments" },
      "Never use --yolo on a remote production session"
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Scheduled Patrols
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="⏰"
  pillLabel="Operating Modes · Scheduled Prompts"
  title="The CLI as a Recurring Agent Runner"
  subtitle="Schedule patrol prompts in plain language — no external cron required (experimental)"
  :transcript='[
    { type: "prompt", text: "copilot --experimental" },
    { type: "user", text: "/every weekday at 9am" },
    { type: "response", lines: ["Summarize overnight PRs and post to Slack #dev-standup"] },
    { type: "divider" },
    { type: "user", text: "/every 30min" },
    { type: "response", lines: ["Check pod health in staging.", "Alert via remote session if anything is unhealthy."] },
    { type: "divider" },
    { type: "outcome", text: "Session-scoped — restarts with --resume; fires while session is running" },
    { type: "outcome", text: "Pairs with --remote: patrol runs on the server, you steer from anywhere" }
  ]'
  footerMetric="Requires /experimental on · minimum 10s · maximum 1 day"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Context Management
<SectionOpenerSlide
  :partNumber="3"
  title="Context That Carries"
  subtitle="Two ideas: the durable session and turn-level recovery — the foundation that makes --remote worth using."
  :cards='[
    { icon: "♾️", title: "Infinite Sessions", blurb: "Auto-compaction at 95% — sessions worth reconnecting to" },
    { icon: "↩️", title: "/rewind Recovery", blurb: "Roll back a bad turn — Copilot edits undone, your edits kept" },
    { icon: "📖", title: "/chronicle Insights", blurb: "Sessions → standup, tips, better copilot-instructions.md" }
  ]'
  :terminal='{ context: "Context lost every 12–20 turns; restart and re-explain every session", detail: "/resume from any machine — session, memory, and repo context travel with you" }'
/>

---

# Durable Sessions and /rewind
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Context Management · Session Durability"
  title="The Session Is the Unit of Work — Not the Shell"
  :left='{
    header: "Auto-Compaction",
    icon: "♾️",
    items: [
      { title: "Fires at 95% token limit", detail: "Compresses history in background — no interruptions" },
      "Important decisions and facts persist; verbose output pruned",
      { title: "/resume from any machine", detail: "Session + repo memory + context travel together" }
    ],
    code: { language: "bash", content: "/context    # token usage breakdown\n/usage      # session stats: duration, edits, cost\n/compact    # compress manually anytime" }
  }'
  :right='{
    header: "/rewind Recovery",
    icon: "↩️",
    items: [
      { title: "Roll back to an earlier turn", detail: "No Git required — works on any folder" },
      { title: "Conversation only", detail: "Rewind the chat, leave files as they are" },
      { title: "Conversation + files", detail: "Restore Copilot-changed files; skip files you edited" },
      "Tracked across editing tools, shell commands, and sub-agents"
    ],
    code: { language: "bash", content: "> /rewind\n# Pick turn before the bad refactor\n# Choose: Conversation + files" }
  }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /chronicle: Sessions Become Intelligence
<FourCardGridSlide
  :partNumber="3"
  pillIcon="📖"
  pillLabel="Context Management · /chronicle"
  title="/chronicle Turns Session History into Actionable Intelligence"
  :cards='[
    { icon: "📋", title: "/chronicle standup", description: "Generates a standup report from recent sessions — what you built, what you fixed" },
    { icon: "💡", title: "/chronicle tips", description: "Reviews your usage patterns and surfaces personalized improvement suggestions" },
    { icon: "✍️", title: "/chronicle improve", description: "Analyzes repo sessions and suggests additions to .github/copilot-instructions.md" },
    { icon: "💬", title: "Open-ended queries", description: "Ask what you worked on, what you repeated, what you could automate" }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Remote Sessions
<SectionOpenerSlide
  :partNumber="4"
  title="Work from Anywhere"
  subtitle="Geography was the last constraint. --remote removes it — AI goes to the machine, you steer from anywhere."
  :cards='[
    { icon: "📱", title: "Steer from a Phone", blurb: "Start on the server, approve from GitHub Mobile mid-walk" },
    { icon: "🗂️", title: "Data Stays Local", blurb: "12 GB logs analyzed on the host — no scp, no compliance risk" },
    { icon: "🔗", title: "Composable", blurb: "Plan Mode + /fleet + Memory all work inside --remote" }
  ]'
  :terminal='{ context: "SSH in, copy logs, paste into chat, lose context switching tools", detail: "copilot --remote on the server — steer the live session from your phone" }'
/>

---

# How --remote Works
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🌍"
  pillLabel="Remote Sessions · How It Works"
  title="Start on the Server — Steer from Anywhere"
  codePosition="left"
  :code='{ language: "bash", filename: "prod-server-3 (us-east-1)", content: "# SSH into the server\nssh ops@prod-server-3.us-east-1\n\n# Start a remote session\n$ copilot --remote\n\n🔗 Remote session started.\nMonitor and steer from:\n  https://github.com/copilot/sessions/abc123\n\n# Or enable mid-session:\n> /remote" }'
  :features='[
    { icon: "👁️", title: "See in Real-Time", description: "Watch Copilot work from any browser or GitHub Mobile" },
    { icon: "✋", title: "Approve from Anywhere", description: "Grant or deny tool permissions from your phone mid-walk" },
    { icon: "🔀", title: "Steer and Resume", description: "Inject prompts or /resume the session from a new machine" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Production Incident Response
<WorkflowShowdownStepsSlide
  :partNumber="4"
  pillIcon="🚨"
  pillLabel="Remote Sessions · Incident Response"
  title="Production Incident — Walking to a Meeting"
  subtitle="The session lives on the server. You steer from your phone."
  leftLabel="Without --remote"
  rightLabel="With --remote"
  :steps='[
    { left: { label: "Alert fires at 2 PM", note: "You&#39;re walking to a 2:05 meeting" }, right: { label: "Alert fires at 2 PM", note: "You&#39;re walking to a 2:05 meeting" } },
    { left: { label: "Wait until after meeting", note: "30+ min of unresolved degradation" }, right: { label: "Open GitHub Mobile", note: "Live session URL — copilot is already on the server" } },
    { left: { label: "SSH in from laptop", note: "Re-establish context from scratch" }, right: { label: "Approve tool calls from phone", note: "Copilot runs /fleet log analysis" } },
    { left: { label: "Manually scp 12 GB logs", note: "Compliance and bandwidth risk" }, right: { label: "12 GB stays on the host", note: "Analysis runs where the data lives" } }
  ]'
  :outcomeLeft='{ icon: "⏳", label: "30+ min delay, compliance exposure" }'
  :outcomeRight='{ icon: "✅", label: "Diagnosed in-meeting, data never moved" }'
  summaryMetric="--remote: execution locality + operator locality, no data transfer"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Remote Composition Patterns
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Remote Sessions · Composition"
  title="--remote Composes with Every Capability"
  :cards='[
    { icon: "🧠", title: "Plan Mode + --remote", description: "AI asks clarifying questions before touching a production server — safer phone approvals" },
    { icon: "⚡", title: "/fleet + --remote", description: "Parallel subtasks across multiple environments from one approved plan on one host" },
    { icon: "⏰", title: "Scheduled + --remote", description: "Infrastructure patrol on the server — fires on schedule, you review from any device" },
    { icon: "🔄", title: "Memory + --remote", description: "/resume from a new device — repository memory and session context travel with you" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before / After
<BeforeAfterSlide
  header="From Trial-and-Error Commands to AI Sessions That Follow the Work"
  :leftItems='[
    "Re-explain codebase conventions every session restart",
    "SSH in, manually copy logs, paste into chat, lose context switching tools",
    "One task at a time — terminal blocked during long-running agent work",
    "Skip planning under deadline pressure and spiral into 8 failed attempts"
  ]'
  :rightItems='[
    "Repository memory carries conventions into every future session automatically",
    "--remote puts AI on the server — steer log forensics from any device",
    "& delegates 20+ min tasks to GitHub&#39;s agent — IDE and terminal stay completely free",
    "Plan Mode turns 45 min of trial-and-error into an 8-min approved strategy"
  ]'
  :metrics='[
    { value: "8 min", detail: "Docker debugging with Plan Mode (was 45 min, 8 attempts)" },
    { value: "5 min", detail: "CI build failure analysis via copilot -p (was 25 min manual)" },
    { value: "0 scp", detail: "12 GB log forensics performed on the host — data never moves" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Install Copilot CLI: npm install -g @github/copilot",
    "Press Shift+Tab before your next debugging session — activate Plan Mode",
    "Run /rewind after any wrong-turn refactor — no Git required"
  ]'
  :thisWeek='[
    "Add a copilot -p step to CI for automated build failure analysis",
    "Start a --remote session on a staging server and steer from GitHub Mobile",
    "Run /chronicle improve to improve your .github/copilot-instructions.md"
  ]'
  :thisMonth='[
    "Replace log-copy incident workflows with --remote sessions on production hosts",
    "Use /fleet after Plan Mode to parallelize your largest recurring refactors",
    "Enable /experimental and set up a /every weekday patrol for overnight PRs"
  ]'
  footer="The session is the unit of work — start on any machine, finish from wherever you are."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Core Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli", label: "About GitHub Copilot CLI", description: "Core concepts, session model, and operating modes" },
      { href: "https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli", label: "Install Copilot CLI", description: "Setup instructions for all platforms" },
      { href: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference", label: "CLI Command Reference", description: "Full command syntax including /rewind, /fleet, /chronicle" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely", label: "Steering a session remotely", description: "Remote session setup and mobile steering" }
    ] },
    { title: "🛠️ How-To Guides", color: "blue", items: [
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts", label: "Scheduling prompts", description: "/every and /after — recurring agent workflows" },
      { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet", label: "Running tasks in parallel with /fleet", description: "Fan-out orchestration and subagent management" },
      { href: "https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes", label: "Cloud and local sandboxes", description: "/sandbox enable and --cloud for containment" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle", label: "Using /chronicle", description: "Standup, tips, and improve copilot-instructions.md" }
    ] },
    { title: "🔗 Related Talks", color: "indigo", items: [
      { label: "Copilot Memory", description: "Repository memory and cross-session context in depth" },
      { label: "Agent Plugins 1.0", description: "Portable skills, MCP config, and custom agents for the CLI" },
      { label: "CLI + Azure MCP", description: "Agentic workflows combining Copilot CLI and Azure MCP servers" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Copilot CLI"
  subtitle="AI at the Point of Work — Close distance across intent, complexity, context, time, and geography"
  :cards="[
    { value: '8 min', detail: 'Docker root cause — Plan Mode, 2 checks vs 8 attempts' },
    { value: '5 min', detail: 'CI analysis — copilot -p automates a 25-min triage step' },
    { value: '12 GB', detail: 'Log forensics on the host — data stays, --remote travels' }
  ]"
  prompt="What&#39;s your longest recurring debugging or triage loop — and which mode would you reach for first?"
/>

---
src: ./copilot-cli-reference.md
---