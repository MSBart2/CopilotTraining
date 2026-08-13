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
title: "GitHub Copilot CLI: AI at the Point of Work"
mdc: true
section: Developers
status: active
updated: 2026-08-10
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
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot CLI: AI at the Point of Work"
  subtitle="Close Every Gap Between You and the Work"
  tagline="Think anywhere. Steer anywhere. Learn always. Act autonomously."
  meta="CopilotTraining Tech Talk · 2026"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do you bring AI to where the work actually is?"
  subtext="Developers spend ~70% of their day outside VS Code — in terminals, on servers, and in CI pipelines."
  highlight="AI that follows the work closes gaps the editor never could."
  :cards='[
    { icon: "👨‍💻", title: "Software Developers", description: "Debug and build where the code runs, not just where it lives" },
    { icon: "⚙️", title: "DevOps Engineers", description: "Triage CI failures and audit containers from any device" },
    { icon: "🖥️", title: "CLI Power Users", description: "Steer AI sessions across machines without leaving the terminal" },
    { title: "~70% Outside the IDE", description: "Deployments, debugging, log analysis — all outside VS Code (Atlassian DevEx 2025)" },
    { title: "8 → 2 Attempts", description: "Plan Mode cuts Docker debugging cycles from 8 trial-and-error attempts to 2" },
    { title: "Any Device, Any Machine", description: "A QR code puts AI on your production server — steer it from your phone in 60 seconds" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🎯", title: "Think Before You Build", subtitle: "Plan Mode, Rubber Duck, and four operating modes", blurb: "Understand intent before any code runs — stop guessing, start asking", slide: 4 },
    { icon: "📱", title: "Work From Anywhere", subtitle: "Phone steering, --remote, and CI/CD automation", blurb: "AI follows the problem wherever it lives — steer from any device", slide: 9 },
    { icon: "🧠", title: "Sessions That Learn", subtitle: "Auto-compaction, /rewind, /chronicle, live bridge", blurb: "Sessions carry work forward, recover backward, and evolve your instructions", slide: 13 },
    { icon: "🚀", title: "Scale Beyond Yourself", subtitle: "/fleet, cloud delegation, scheduled execution", blurb: "From one terminal to parallel agents acting on a schedule you defined", slide: 18 }
  ]'
/>

---

# Part 1 — Think Before You Build
<SectionOpenerSlide
  :partNumber="1"
  title="Think Before You Build"
  subtitle="Gap closed: Intent. Plan Mode clarifies before code runs — Rubber Duck reviews before it ships."
  :cards='[
    { icon: "🎯", title: "Plan Mode", blurb: "Ask first — catch wrong assumptions before any code runs" },
    { icon: "🦆", title: "Rubber Duck", blurb: "Cross-model review catches what one reasoning path misses" },
    { icon: "🔀", title: "Four Modes", blurb: "Interactive, Plan, Programmatic, Remote — each closes a gap" }
  ]'
  :terminal='{ context: "Docker debug: 45 min, 8 attempts (manual)", detail: "8 min, 2 attempts — Plan Mode asked first" }'
/>

---

# The IDE Only Sees Code
<HeroStatSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="The Problem: Where Is the Work?"
  title="The IDE Only Sees Code"
  subtitle="The terminal sees everything else"
  :hero='{ value: "~70%", label: "of developer time is spent outside the IDE", source: "Atlassian State of Developer Experience 2025" }'
  :supporting='[
    { icon: "🐛", title: "Container logs & process state", description: "Runtime crashes live in what&#39;s running — not in the source files" },
    { icon: "🌐", title: "Network & environment variables", description: "Connectivity, secrets validation, and env drift are diagnosed at the shell" },
    { icon: "📋", title: "CI/CD pipelines & build failures", description: "Test results, deployment artifacts, and ephemeral runner state live here" },
    { icon: "🔍", title: "Log analysis & incident response", description: "Server logs stay on the server — the terminal is where forensics happen" }
  ]'
  :insight='{ icon: "💡", text: "An AI in the terminal has context the editor never sees — logs, environment, and running services." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Traditional Debugging vs Plan Mode
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="Think Before You Build · Plan Mode"
  title="Traditional Debugging vs Plan Mode"
  subtitle="From trial-and-error to collaborative strategy"
  leftLabel="Traditional Workflow"
  rightLabel="With Plan Mode"
  :steps='[
    { left: { label: "Make request", note: "Describe what you need" }, right: { label: "Make request", note: "Describe what you need" } },
    { left: { label: "AI generates solution", note: "Assumes intent, one interpretation" }, right: { label: "AI asks questions", note: "Clarifies intent before acting" } },
    { left: { label: "You review and fix", note: "Wrong assumptions surface late" }, right: { label: "Collaborate on plan", note: "Review the strategy before any code" } },
    { left: { label: "Repeat until it works", note: "Average: 8 attempts" }, right: { label: "Execute with confidence", note: "Ambiguity resolved upfront" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "8 attempts — average debug cycles before success" }'
  :outcomeRight='{ icon: "✓", label: "2 targeted attempts — Plan Mode closed the gap" }'
  summaryMetric="8 debugging attempts → 2 with Plan Mode"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Plan Mode + Rubber Duck in Action
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="Think Before You Build · Demo"
  title="Plan Mode + Rubber Duck in Action"
  subtitle="Root cause in 8 minutes — then Rubber Duck reviews the fix"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "Debug why the backend container won&#39;t start" },
    { type: "thinking", label: "🤔 Copilot (Plan Mode):" },
    { type: "response", lines: ["Before I start, a few questions:", "1. Check docker-compose config, container logs, or both?", "2. Include environment variable analysis?"] },
    { type: "user", text: "Start with logs, then check config if needed" },
    { type: "divider" },
    { type: "outcome", text: "Found: Port 5000 mapped to 5001 in docker-compose.yml" },
    { type: "thinking", label: "🦆 Rubber Duck (review pass):" },
    { type: "response", lines: ["Fix is correct. One additional risk:", "Check BACKEND_PORT env var — if it overrides the binding,", "the port change alone won&#39;t hold after a restart."] },
    { type: "outcome", text: "Root cause in 8 min — cross-model review caught the env var risk" }
  ]'
  footerMetric="8 attempts, 45 min → 2 attempts, 8 min"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Four Operating Modes
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🔀"
  pillLabel="Think Before You Build · Mode Orientation"
  title="Four Operating Modes"
  :cards='[
    { icon: "💬", title: "Interactive", description: "Collaborative sessions with persistent context — for debugging, exploration, and design" },
    { icon: "📐", title: "Plan Mode", description: "Shift+Tab: AI asks clarifying questions before writing code — human-driven and deliberate" },
    { icon: "⚙️", title: "Programmatic", description: "copilot -p for headless CI/CD — single commands, structured output, no conversation state" },
    { icon: "📡", title: "Remote", description: "copilot --remote: AI lives on the server; steer from any device via URL or QR code" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Work From Anywhere
<SectionOpenerSlide
  :partNumber="2"
  title="Work From Anywhere"
  subtitle="Gap closed: Geography. A phone controls a live production server — steer any session from any device."
  :cards='[
    { icon: "📱", title: "Phone Steering", blurb: "QR code puts you in control from any device in 60 seconds" },
    { icon: "📡", title: "--remote Flag", blurb: "AI session lives on the server; steer from wherever you are" },
    { icon: "⚙️", title: "CI/CD Mode", blurb: "copilot -p runs headless in pipelines — no human required" }
  ]'
  :terminal='{ context: "Production server. SSH required. You&#39;re at a desk (before)", detail: "QR scan → live steering from any device" }'
/>

---

# Phone Steering: The Reveal
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="📱"
  pillLabel="Work From Anywhere · Cold Open"
  title="Phone Steering: 60 Seconds on a Production Server"
  subtitle="No context. No preamble. A phone controls an AI session running on a live server."
  :transcript='[
    { type: "prompt", text: "ssh ops@prod-server-3.us-east-1 && copilot --remote" },
    { type: "thinking", label: "🔗 Remote session started:" },
    { type: "response", lines: ["Monitor and steer from:", "  https://github.com/copilot/sessions/abc123", "  [QR CODE — scan with GitHub Mobile]", "Session persists via tmux. Public preview: 2026-04-13"] },
    { type: "divider" },
    { type: "user", text: "focus on auth log errors from the last 10 minutes" },
    { type: "thinking", label: "📱 Steered from phone →" },
    { type: "response", lines: ["JWT validation failing on token expiry", "Affected: 3 of 12 auth service replicas", "Root cause: clock drift > 5s on nodes us-east-1b/1c"] },
    { type: "outcome", text: "Diagnosed: NTP desync — auth degradation, 10-second fix from a phone" }
  ]'
  footerMetric="AI on the server. You on the phone. No SSH needed."
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# How --remote Works
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🏛️"
  pillLabel="Work From Anywhere · Architecture"
  title="How --remote Works"
  :left='{
    header: "The Session",
    icon: "🏛️",
    items: [
      "Durable entity — not tied to any terminal",
      "Persists across disconnects and device switches",
      "/resume from any machine, any device",
      { title: "Context travels", detail: "conventions, history, and reasoning stay alive" }
    ]
  }'
  :right='{
    header: "--remote Flag",
    icon: "📡",
    items: [
      "Start any session with copilot --remote",
      "Generates URL + QR code instantly",
      "GitHub.com or GitHub Mobile: approve tools, steer, inject prompts",
      { title: "/remote mid-session", detail: "enable remote access without restarting" }
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Programmatic Mode and Permission Safety
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Work From Anywhere · CI/CD"
  title="Programmatic Mode and Permission Safety"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/build.yml", content: "- name: Analyze failure\n  if: failure()\n  run: |\n    copilot -p \"Analyze the build failure\"\n      --allow-tool shell(gh)\n      --allow-tool shell(git)\n      > analysis.txt\n# Enterprise enforcement:\n# permissions.disableBypassPermissionsMode: true" }'
  :features='[
    { icon: "⚙️", title: "Programmatic mode", description: "copilot -p: headless single-command execution, structured output for CI/CD pipelines" },
    { icon: "🔑", title: "Per-tool approvals", description: "--allow-tool grants specific permissions; never use --yolo on shared or production environments" },
    { icon: "🏢", title: "Enterprise enforcement", description: "disableBypassPermissionsMode: true prevents --yolo across all org-managed environments" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Sessions That Learn
<SectionOpenerSlide
  :partNumber="3"
  title="Sessions That Learn"
  subtitle="Gap closed: Memory. Sessions carry work forward, recover backward, and learn how you work."
  :cards='[
    { icon: "🔄", title: "Learn & Recover", blurb: "Auto-compaction forward, /rewind backward — work never lost" },
    { icon: "📋", title: "/chronicle", blurb: "Session history → standup, tips, smarter instructions" },
    { icon: "⚡", title: "Live Bridge", blurb: "Scheduled execution fires while you present — the proof" }
  ]'
  :terminal='{ context: "Kick off before the talk: /every 1m tell me I&#39;m awesome", detail: "fires live on the bridge slide — you taught it, now it executes" }'
/>

---

# Learn and Recover: The Trust Foundation
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Sessions That Learn · Trust Prologue"
  title="Learn and Recover: The Trust Foundation"
  :cards='[
    { icon: "♾️", title: "Auto-compaction", description: "At 95% token limit, history compresses — important context persists, noise pruned" },
    { icon: "⏪", title: "/rewind", description: "Restore conversation and Copilot-modified files without Git — later edits preserved" },
    { icon: "◀", title: "Sessions Sidebar", description: "Press < to open. n creates a session, x closes — switch concurrent work in the CLI" },
    { icon: "⏱️", title: "Live Tool Durations", description: "/usage and per-MCP token visibility; timeline shows elapsed time for active tool calls" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /chronicle Standup
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="📋"
  pillLabel="Sessions That Learn · /chronicle"
  title="/chronicle Standup: Yesterday&#39;s Work in 30 Seconds"
  subtitle="Session history becomes a standup report — zero effort, always accurate"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "/chronicle standup" },
    { type: "thinking", label: "📋 Chronicle reviewing session history:" },
    { type: "response", lines: ["Yesterday:", "• Debugged auth service JWT expiry (prod-server-3)", "• Refactored session store — 3 files changed, tests passing", "• Opened issue #4821: clock drift in us-east-1b"] },
    { type: "response", lines: ["Today:", "• Continue: /fleet test coverage for auth service", "• Follow up: NTP config for us-east-1b/1c"] },
    { type: "outcome", text: "30-second standup, zero prep — drawn from what actually happened" }
  ]'
  footerMetric="Built from real session history, not memory"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Session History Becomes Intelligence
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="💡"
  pillLabel="Sessions That Learn · /chronicle"
  title="Session History Becomes Intelligence"
  :columns='[
    { icon: "📋", title: "/chronicle standup", description: "Generate yesterday&#39;s standup from session history — everyday value in 30 seconds" },
    { icon: "💡", title: "/chronicle tips", description: "AI surfaces your own usage patterns and suggests smarter workflows for how you work" },
    { icon: "✏️", title: "/chronicle instructions", description: "Propose improvements to .github/copilot-instructions.md — the session learned from you" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# You Taught It How You Work
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Sessions That Learn · Live Bridge"
  title="You Taught It How You Work"
  subtitle="Start `/every 1m tell me I&#39;m awesome` before the talk — watch it arrive live on this slide"
  :transcript='[
    { type: "prompt", text: "copilot --experimental" },
    { type: "user", text: "/every 1m tell me I&#39;m awesome" },
    { type: "thinking", label: "⏰ Scheduled:" },
    { type: "response", lines: ["Every 1 minute, indefinitely.", "First run: 60 seconds from now.", "Schedule visible in footer hint bar."] },
    { type: "divider" },
    { type: "thinking", label: "🔔 [Live, ~30 minutes later, during this slide]:" },
    { type: "outcome", text: "You&#39;re awesome! Keep up the great work." },
    { type: "outcome", text: "you taught it how you work; now it executes" }
  ]'
  footerMetric="Pattern learned in S3 → executes in S4 without asking"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Scale Beyond Yourself
<SectionOpenerSlide
  :partNumber="4"
  title="Scale Beyond Yourself"
  subtitle="Gap closed: Reach. Everything learned in S3 becomes the context that shapes every task here."
  :cards='[
    { icon: "🚀", title: "/fleet Fan-Out", blurb: "Parallel subtasks, isolated contexts, merged results" },
    { icon: "☁️", title: "Cloud Delegation", blurb: "& prefix: delegate to the cloud — both tools stay free" },
    { icon: "⏰", title: "Scheduled Prompts", blurb: "/every and /after — recurring agent execution" }
  ]'
  :terminal='{ context: "Pattern learned in S3 — sessions, /chronicle, /every", detail: "now executes autonomously in S4" }'
/>

---

# The Scale Ladder
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🪜"
  pillLabel="Scale Beyond Yourself · Progression"
  title="The Scale Ladder"
  subtitle="Each step expands reach without surrendering control"
  :stages='[
    { label: "Sidebar", name: "Sessions Sidebar", description: "Concurrent conversations — switch with < sidebar; n and x to manage", icon: "◀", isTarget: false },
    { label: "/worktree", name: "Isolated Worktrees", description: "Experimental: separate conversation in a new worktree — exploratory changes stay isolated", icon: "🌿", isTarget: false },
    { label: "/fleet", name: "Parallel Fan-Out", description: "Decompose a plan into parallel subtasks — each subagent in its own context window", icon: "🚀", isTarget: false },
    { label: "& delegate", name: "Cloud Execution", description: "Delegate to GitHub&#39;s coding agent — terminal and IDE stay completely free", icon: "☁️", isTarget: true }
  ]'
  caption="/worktree ≠ /pr worktree — local isolation vs reviewing an existing pull request"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# /fleet: Parallel Task Execution
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Scale Beyond Yourself · /fleet"
  title="/fleet: Parallel Task Execution"
  codePosition="left"
  :code='{ language: "bash", filename: "copilot session", content: "# After approving a plan in Plan Mode:\n/fleet implement all phases of this auth refactor\n\n# Or directly:\n/fleet create tests:\n  unit (auth service)\n  integration (API layer)\n  e2e (login flow)" }'
  :features='[
    { icon: "⚡", title: "Parallel subtasks", description: "Orchestrator decomposes the plan — subagents run in separate context windows simultaneously" },
    { icon: "🔒", title: "Context isolation", description: "Each subagent has its own window — no context pollution between parallel workstreams" },
    { icon: "🔄", title: "Results merged", description: "Orchestrator collects all subagent outputs and merges them back automatically when complete" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Scale as an Ecosystem
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🌐"
  pillLabel="Scale Beyond Yourself · Ecosystem"
  title="Scale as an Ecosystem"
  :columns='[
    { icon: "⏰", title: "Scheduled Prompts", description: "/every and /after turn the CLI into a recurring agent runner — requires /experimental on" },
    { icon: "🤖", title: "Custom Agents", description: "Create specialized agents in ~/.copilot/agents/ (user), .github/agents/ (repo), or org-level" },
    { icon: "🔌", title: "Plugins", description: "Install community and team plugins from the marketplace — specialized domain capabilities" }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Guessing to Steering"
  :leftItems='["8 trial-and-error attempts to fix one container failure", "Re-explain codebase conventions at every session start", "Physically at the terminal to diagnose server issues", "Long-running tasks block IDE and terminal until done"]'
  :rightItems='["2 targeted attempts — Plan Mode + Rubber Duck ask first", "Repository memory carries conventions across all sessions", "Steer any session from your phone via --remote", "Cloud delegation frees both tools — get a PR when done"]'
  :metrics='[
    { value: "8 → 2", detail: "debugging attempts with Plan Mode" },
    { value: "37 min", detail: "saved per complex debug session" },
    { value: "any device", detail: "steer sessions via --remote" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Install Copilot CLI and try an interactive session", "Press Shift+Tab to enable Plan Mode before debugging", "Run /chronicle standup after your next work session"]'
  :thisWeek='["Add --remote to your staging server and steer via mobile", "Run /fleet on a large multi-step refactor or test task", "Use /rewind to recover from a wrong turn without Git"]'
  :thisMonth='["Enable /every for a scheduled PR summary or pod health check", "Run /chronicle instructions to improve your team&#39;s AGENTS.md", "Delegate a 30+ minute task with & and get a PR while you work"]'
  footer="Think anywhere. Steer anywhere. Learn always. Act autonomously."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli", label: "About GitHub Copilot CLI", description: "Core concepts, architecture, and session model" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli", label: "Use Copilot CLI", description: "Command syntax, Plan Mode, modes, and slash commands" },
      { href: "https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli", label: "Install Copilot CLI", description: "Setup instructions for all platforms" },
      { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet", label: "Running tasks in parallel with /fleet", description: "Fan-out orchestration and subagent management" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely", label: "Steering a session remotely", description: "--remote flag, QR code, and multi-device patterns" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle", label: "Using /chronicle session data", description: "Standup reports, usage tips, and instruction improvements" }
    ] },
    { title: "📰 Recent Updates", color: "blue", items: [
      { href: "https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/", label: "Remote control CLI sessions on web and mobile", description: "Public preview announcement — 2026-04-13" },
      { href: "https://github.blog/changelog/2026-08-07-github-copilot-weekly-releases-august-3", label: "GitHub Copilot weekly releases: August 3", description: "CLI updates including /rewind, Sessions sidebar, and live tool durations" }
    ] },
    { title: "🔗 Related Content", color: "purple", items: [
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#use-custom-instructions", label: "Custom instructions for Copilot CLI", description: "User, repo, and org-level instructions that combine additively" },
      { label: "Copilot Memory", description: "Cross-session memory, repository conventions, and persistent context" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="AI at the Point of Work"
  subtitle="GitHub Copilot CLI: Close Every Gap Between You and the Work"
  :cards='[
    { value: "8 → 2", detail: "debugging attempts with Plan Mode" },
    { value: "60 sec", detail: "phone steering a live production server" },
    { value: "/chronicle", detail: "session history → standup, tips, smarter instructions" }
  ]'
  prompt="Where in your workflow would AI at the terminal free the most time?"
/>

---
src: ./copilot-cli-reference.md
---