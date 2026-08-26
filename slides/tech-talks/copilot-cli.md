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
updated: 2026-08-25
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
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title

<TitleSlide
  title="GitHub Copilot CLI: AI at the Point of Work"
  subtitle="Close Every Gap Between You and the Work"
  tagline="Think anywhere. Steer anywhere. Learn always. Act autonomously."
  meta="GitHub Copilot CLI · Developers · 2026-08-25"
/>

---

# Core Question

<CoreQuestionSlide
  question="How do I bring AI to where the work actually is?"
  subtext="The IDE sees code. The terminal sees deployments, logs, CI, and production."
  highlight="What unlocks when AI follows you there, and you can steer it from anywhere?"
  :cards='[
    { icon: "🖥️", title: "Developer", description: "Debug Docker, CI, and production with full context — no context switching required" },
    { icon: "⚙️", title: "DevOps Engineer", description: "Steer AI on remote servers from any device, even your phone" },
    { icon: "🚀", title: "CLI Power User", description: "Automate recurring workflows with session-scoped scheduled prompts" },
    { title: "70% outside the IDE", description: "Atlassian DevEx 2025: deployments, debugging, CI triage — all in the terminal" },
    { title: "8 attempts → 2", description: "Plan Mode reduces debug cycles by asking clarifying questions before code" },
    { title: "Git-free /rewind", description: "Two-mode picker: conversation only, or restore Copilot-changed files — no Git" }
  ]'
/>

---

# Table of Contents

<TocSlide
  :sections='[
    { icon: "🤔", title: "Think Before You Build", subtitle: "Plan Mode, Rubber Duck, and model selection", blurb: "Ask the right questions before writing a single line of code", slide: 4 },
    { icon: "📱", title: "Work From Anywhere", subtitle: "Remote sessions, four modes, and CI/CD integration", blurb: "AI meets the problem where it lives — steer from any device", slide: 9 },
    { icon: "📔", title: "Sessions That Learn", subtitle: "Auto-compaction, /rewind, and /chronicle", blurb: "Durable history that recovers, adapts, and teaches the session", slide: 14 },
    { icon: "🚀", title: "Scale Beyond Yourself", subtitle: "Scheduled Prompts, /fleet, and cloud delegation", blurb: "Patterns that learned your workflow now execute autonomously", slide: 19 }
  ]'
/>

---

# Part 1 — Think Before You Build

<SectionOpenerSlide
  :partNumber="1"
  title="Think Before You Build"
  subtitle="Gap closed: Intent. Plan Mode asks the right questions before code runs; Rubber Duck reviews what one model can miss."
  :cards='[
    { icon: "🤔", title: "Plan Mode", blurb: "Clarifying Q&A first — 8 attempts → 2" },
    { icon: "🦆", title: "Rubber Duck", blurb: "Cross-family model catches what the first misses" },
    { icon: "🎯", title: "/model", blurb: "Session-scoped selection with premium multiplier" }
  ]'
  :terminal='{ context: "Docker debug: trial-and-error vs Plan Mode", detail: "45 min, 8 attempts → 8 min, 2 attempts" }'
/>

---

# The Terminal Sees Everything

<HeroStatSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Why the Terminal?"
  title="The IDE Only Sees Code"
  subtitle="The terminal sees everything else — and that&#39;s where the work actually is"
  :hero='{ value: "70%", label: "of developer time spent outside the IDE", source: "Atlassian State of Developer Experience 2025" }'
  :supporting='[
    { icon: "🐳", title: "Container logs and process state", description: "Runtime diagnostics live in the terminal — not your source files" },
    { icon: "🌐", title: "Network traffic and environment", description: "Connectivity, env vars, and service health checked at the shell" },
    { icon: "📁", title: "File system and deployment artifacts", description: "Storage, permissions, and build outputs live here" },
    { icon: "⚙️", title: "CI/CD pipelines and failures", description: "Build failures, test results, and deployment validation" }
  ]'
  :insight='{ icon: "💡", text: "What unlocks when AI follows you into the 70% — and you can steer it from anywhere?" }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Plan Mode vs Traditional Workflow

<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="🤔"
  pillLabel="Think Before You Build · Plan Mode"
  title="Traditional Workflow vs. Plan Mode"
  subtitle="From trial-and-error to collaborative strategy"
  leftLabel="Traditional Workflow"
  rightLabel="With Plan Mode"
  :steps='[
    { left: { label: "Make request", note: "Describe what you need" }, right: { label: "Make request", note: "Describe what you need" } },
    { left: { label: "AI generates solution", note: "Assumes intent — one interpretation" }, right: { label: "AI asks clarifying questions", note: "Check config, logs, or both?" } },
    { left: { label: "Review and find wrong assumptions", note: "Mismatch surfaces in code review" }, right: { label: "Collaborate on a plan", note: "Approve strategy before any code is written" } },
    { left: { label: "Repeat until it works", note: "Average: 8 attempts" }, right: { label: "Execute with confidence", note: "Ambiguity resolved upfront" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "8 attempts — one model, one interpretation, repeated guessing" }'
  :outcomeRight='{ icon: "✓", label: "2 attempts — clarifying questions first, plan approved, then code" }'
  summaryMetric="Shift+Tab to toggle Plan Mode · /goal keeps autopilot anchored to one objective"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Docker Debug: Plan Mode in Action

<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="🐳"
  pillLabel="Think Before You Build · Demo"
  title="Plan Mode in Action: Docker Debugging"
  subtitle="Root cause in 8 minutes instead of 45"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "Debug why the backend container won&#39;t start" },
    { type: "thinking", label: "🤔 Copilot (Plan Mode):" },
    { type: "response", lines: ["Before I start, a few questions:", "1. Check docker-compose config, logs, or both?", "2. Include environment variable analysis?", "3. Any recent changes to services or networking?"] },
    { type: "user", text: "Start with logs, then check config if needed" },
    { type: "divider" },
    { type: "thinking", label: "🤔 Executing plan..." },
    { type: "response", lines: ["Checked backend container logs — found connection error on port 5000", "Inspected docker-compose.yml — port mapping mismatch confirmed"] },
    { type: "outcome", text: "Found: Port 5000 mapped to 5001 — app expects 5000 internally" },
    { type: "outcome", text: "Fix: Change service.ports from 5001:5000 to 5000:5000" }
  ]'
  footerMetric="45 min, 8 attempts → 8 min, 2 targeted checks"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Rubber Duck and Model Selection

<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🦆"
  pillLabel="Think Before You Build · Review Layer"
  title="Rubber Duck Reviewer + Model Selection"
  :left='{
    header: "Rubber Duck Reviewer",
    icon: "🦆",
    items: [
      { title: "Cross-family model review", detail: "Claude orchestrator? Rubber Duck uses GPT-5.4 to catch blind spots" },
      { title: "Enabled by default (v1.0.58+)", detail: "Auto-reviews after planning and significant implementations" },
      { title: "~75% quality gap closed", detail: "Near-top-tier quality at mid-tier pricing on complex tasks" },
      "Disable: builtInAgents.rubberDuck: false if latency matters more"
    ]
  }'
  :right='{
    header: "Model Selection",
    icon: "🎯",
    items: [
      { title: "/model — session-scoped picker", detail: "Check the multiplier (1x, 2x) before choosing" },
      { title: "/config model or /model --global", detail: "Durable default for future sessions" },
      "Never treat a catalog name as permanent — GitHub retires models",
      "Enterprise policy may restrict replacements — verify with your admin"
    ],
    code: { language: "bash", content: "/model              # session-scoped picker\n/config model       # durable default\n/model --global     # same as /config model" }
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Work From Anywhere

<SectionOpenerSlide
  :partNumber="2"
  title="Work From Anywhere"
  subtitle="Gap closed: Geography. A phone controls a production server in 60 seconds — then modes, permissions, and CI/CD follow."
  :cards='[
    { icon: "📱", title: "--remote", blurb: "Phone steers a prod server in 60 seconds" },
    { icon: "⚡", title: "Four Modes", blurb: "Interactive, Plan, Programmatic, Remote" },
    { icon: "🔒", title: "Sandboxes", blurb: "Local MXC containment or billed cloud session" }
  ]'
  :terminal='{ context: "Phone → production server session", detail: "Remote control via GitHub Mobile (Public Preview: 2026-04-13)" }'
/>

---

# Four Operating Modes

<FourCardGridSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Work From Anywhere · Modes"
  title="Four Modes Cover Every Workflow"
  :cards='[
    { icon: "💬", title: "Interactive", description: "Conversational sessions with persistent context — Shift+Tab for Plan Mode, < for Sessions sidebar" },
    { icon: "🤔", title: "Plan Mode", description: "AI asks clarifying questions, you approve the strategy — then code runs. Human-driven by design" },
    { icon: "⚙️", title: "Programmatic", description: "copilot -p for headless CI/CD execution — stateless, structured output, no conversation history" },
    { icon: "📱", title: "Remote", description: "copilot --remote generates a URL and QR code — steer any session from GitHub.com or GitHub Mobile" }
  ]'
  :insight='{ icon: "💡", text: "The session is the durable entity — terminals are viewports that connect and disconnect from it." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Steer From Anywhere With --remote

<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📱"
  pillLabel="Work From Anywhere · Remote Sessions"
  title="--remote: AI Meets the Problem Where It Lives"
  codePosition="left"
  :code='{ language: "bash", filename: "prod-server-3.us-east-1", content: "ssh ops@prod-server-3.us-east-1\n$ copilot --remote\n\n Remote session started.\n Steer this session from:\n   https://github.com/copilot/sessions/abc123\n   [QR CODE]\n\n# From your phone, tablet, or any browser:\n# See what Copilot is doing in real time\n# Approve or deny tool permissions\n# Send steering messages\n# /resume from a different machine entirely\n\n# Enable mid-session without restarting:\n> /remote" }'
  :features='[
    { icon: "🔒", title: "Logs stay on the server", description: "No scp or rsync — analysis runs where the data lives, no compliance risk" },
    { icon: "📱", title: "Any device is a viewport", description: "Devices are interchangeable windows into a durable AI session" },
    { icon: "⏸️", title: "tmux for survival", description: "Combine --remote with tmux — sessions survive SSH disconnects" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# --yolo, Local Sandboxing, and Cloud Sandboxing

<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🔒"
  pillLabel="Work From Anywhere · Safety"
  title="Sandboxes Are Containment — Not a Permission Shortcut"
  :left='{
    header: "Local Sandbox (experimental, free)",
    icon: "🖥️",
    items: [
      { title: "/sandbox enable in-session", detail: "Persists until /sandbox disable — included in your Copilot seat" },
      { title: "MXC OS containment", detail: "Lighter-weight than a VM — restricts filesystem, network, and system access" },
      "Built-in file tools honor the policy on a best-effort basis",
      "Requires copilot --experimental to unlock"
    ],
    code: { language: "bash", content: "copilot --experimental\n> /sandbox enable\n> /sandbox status" }
  }'
  :right='{
    header: "Cloud Sandbox (experimental, billed)",
    icon: "☁️",
    items: [
      { title: "copilot --cloud --experimental", detail: "Entire session in a GitHub-hosted Linux environment" },
      { title: "Cannot combine with -p or -i", detail: "Interactive-only — no programmatic mode" },
      "Org/enterprise: disabled by default — admin must enable",
      { title: "Enforce no-bypass in managed config", detail: "permissions.disableBypassPermissionsMode: true" }
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# CI/CD Integration With Programmatic Mode

<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Work From Anywhere · CI/CD"
  title="Programmatic Mode: Machine-Side Automation"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/build.yml", content: "- name: Analyze build failure\n  if: failure()\n  env:\n    GITHUB_TOKEN: $COPILOT_GITHUB_TOKEN\n  run: |\n    copilot -p \"Analyze the build failure.\n      Check recent commits and error patterns.\n      Suggest specific fixes.\"\n      --allow-tool shell(gh)\n      --allow-tool shell(git)\n      > failure-analysis.txt\n\n- name: Post analysis as PR comment\n  if: failure()\n  run: gh pr comment --body-file failure-analysis.txt" }'
  :features='[
    { icon: "⚡", title: "25 min → 5 min investigation", description: "Pattern recognition across historical failures — zero human intervention for known failure types" },
    { icon: "🔒", title: "Scoped permissions only", description: "--allow-tool grants specific tools needed — never --allow-all in CI pipelines" },
    { icon: "📄", title: "Structured output for scripts", description: "Pipe copilot -p output to files, PR comments, or Slack notifications" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Sessions That Learn

<SectionOpenerSlide
  :partNumber="3"
  title="Sessions That Learn"
  subtitle="Gap closed: Memory. S1 taught better questions, S2 taught steering anywhere — now the session learns as it works."
  :cards='[
    { icon: "🔄", title: "Auto-compaction", blurb: "95% token limit → history flows forward" },
    { icon: "⏪", title: "/rewind", blurb: "Git-free picker: conversation or + files" },
    { icon: "📔", title: "/chronicle", blurb: "History → standup, tips, better instructions" }
  ]'
  :terminal='{ context: "/chronicle standup", detail: "Yesterday&#39;s work → 30-second standup report" }'
/>

---

# Session Continuity: Forward and Backward

<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Sessions That Learn · Continuity"
  title="Forward: Auto-compaction · Backward: /rewind"
  :left='{
    header: "Forward: Auto-compaction",
    icon: "➡️",
    items: [
      { title: "At 95% token limit", detail: "Copilot compresses history transparently in the background" },
      { title: "Decisions and patterns persist", detail: "Verbose outputs pruned; important context kept" },
      "/compact anytime for manual control — Escape to cancel",
      "Enables virtually infinite sessions worth reconnecting to"
    ]
  }'
  :right='{
    header: "Backward: /rewind (alias /undo)",
    icon: "⏪",
    items: [
      { title: "Git-free turn picker", detail: "Not git checkout or git revert — no clean tree required" },
      { title: "Conversation only", detail: "Rewind the chat, leave files exactly as they are" },
      { title: "Conversation + files", detail: "Restore Copilot-changed files from that turn forward — your own edits are skipped" },
      "File changes tracked per turn across editing tools, shell commands, and sub-agents"
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /chronicle: Three Commands That Change How You Work

<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="📔"
  pillLabel="Sessions That Learn · /chronicle"
  title="/chronicle Turns History Into Intelligence"
  :columns='[
    { icon: "🗓️", title: "/chronicle standup", description: "Generate yesterday&#39;s standup from session history in 30 seconds — not 10 minutes", items: ["Prompts you used", "Files you modified", "Decisions you made"] },
    { icon: "💡", title: "/chronicle tips", description: "AI reviews your actual usage patterns and surfaces personalized improvement suggestions", items: ["Commands you overuse", "Patterns you repeat", "Shortcuts you miss"] },
    { icon: "📝", title: "/chronicle improve", description: "Analyzes this repo&#39;s sessions and proposes specific additions to .github/copilot-instructions.md", items: ["Team conventions surfaced", "Anti-patterns flagged", "Preferences extracted"] }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# /chronicle: The Climax

<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="🎯"
  pillLabel="Sessions That Learn · Climax"
  title="/chronicle improve: AI Shaped by How You Work"
  subtitle="The session&#39;s emotional peak — AI that gets better the way you do"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "/chronicle improve" },
    { type: "thinking", label: "📔 Reviewing 47 sessions..." },
    { type: "response", lines: ["Proposed additions to .github/copilot-instructions.md:", "", "1. Always check docker-compose networking before container logs", "2. Prefer async/await over promise chains in this codebase", "3. Run integration tests before unit tests — they catch more here"] },
    { type: "divider" },
    { type: "user", text: "Apply suggestions 1 and 3" },
    { type: "outcome", text: ".github/copilot-instructions.md updated — 2 instructions added" },
    { type: "outcome", text: "Future sessions inherit your team&#39;s proven patterns automatically" }
  ]'
  footerMetric="AI that gets better the way you do — by working"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Bridge: From Learning to Executing

<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Sessions That Learn · Bridge → S4"
  title="You Taught It How You Work. Now It Executes."
  subtitle="Started before the talk. Still firing. Watch it arrive."
  :transcript='[
    { type: "prompt", text: "copilot --experimental" },
    { type: "user", text: "/every 1m tell me I&#39;m awesome" },
    { type: "thinking", label: "⏱️  Scheduled: fires every 60 seconds" },
    { type: "divider" },
    { type: "response", lines: ["[09:14:23] You&#39;re awesome!", "[09:15:23] You&#39;re awesome!", "[09:16:23] You&#39;re awesome! — live on screen, right now"] },
    { type: "divider" },
    { type: "outcome", text: "Manage with bare /every or /after (no arguments = list) — not /session" },
    { type: "outcome", text: "S4: what happens when the prompt is actually useful" }
  ]'
  footerMetric="Session-scoped, experimental — restarts on --continue or --resume"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Scale Beyond Yourself

<SectionOpenerSlide
  :partNumber="4"
  title="Scale Beyond Yourself"
  subtitle="Gap closed: Reach. S3&#39;s learned patterns become the substrate for S4&#39;s autonomous execution."
  :cards='[
    { icon: "📅", title: "Scheduled Prompts", blurb: "/every and /after — recurring agent runs" },
    { icon: "🚢", title: "/fleet fan-out", blurb: "Parallel subagents, each in their own context" },
    { icon: "☁️", title: "Cloud delegation", blurb: "& prefix frees both terminal and IDE" }
  ]'
  :terminal='{ context: "Human-explicit → Automated-implicit", detail: "Patterns execute autonomously — no trigger required" }'
/>

---

# The Scale Ladder

<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🪜"
  pillLabel="Scale Beyond Yourself · Progression"
  title="From Concurrent Sessions to Autonomous Execution"
  subtitle="Each rung extends your reach without losing control"
  :stages='[
    { label: "1", name: "Sessions", description: "< for sidebar — n/x to create and close — concurrent histories visible and manageable", icon: "💬", isTarget: false },
    { label: "2", name: "/worktree", description: "Experimental isolation: separate conversation in a new local worktree, no disruption to current workspace", icon: "🌿", isTarget: false },
    { label: "3", name: "/fleet", description: "Explicit fan-out: orchestrator decomposes the plan into parallel subagents, each in their own context window", icon: "🚢", isTarget: false },
    { label: "4", name: "& delegation", description: "& prefix sends work to GitHub&#39;s coding agent in the cloud — terminal and IDE stay completely free", icon: "☁️", isTarget: true }
  ]'
  caption="Scheduled Prompts (/every, /after) make any rung autonomous — session-scoped, experimental"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Scheduled Prompts, /tasks, Plugins 1.0, and /app

<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔌"
  pillLabel="Scale Beyond Yourself · Capabilities"
  title="Four Capabilities That Complete the Ladder"
  :cards='[
    { icon: "📅", title: "Scheduled Prompts", description: "Bare /every or /after — not /session. Experimental. No session? cron + copilot -p." },
    { icon: "🔍", title: "/tasks + autopilot", description: "/tasks lists running subagents. -p --plan --mode autopilot plans then implements." },
    { icon: "🔌", title: "Agent Plugins 1.0 (GA)", description: "One package: portable skills + MCP config. Install with copilot plugin install." },
    { icon: "🖥️", title: "/app + /ide", description: "/ide opens a file in VS Code. /app hands session + folder to Copilot app (1.1.3+)." }
  ]'
  :insight='{ icon: "🎯", text: "You started asking better questions. You ended with an AI system shaped by how your team works — and it executes without asking." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After

<BeforeAfterSlide
  header="From Terminal Isolation to AI Everywhere"
  :leftItems='[
    "Manual SSH → copy-paste output → lose context switching tools",
    "8 trial-and-error debugging attempts before finding root cause",
    "Session ends when you close the terminal",
    "AI stays at your desk — even when the problem is on the server"
  ]'
  :rightItems='[
    "Steer a production server session from your phone in 60 seconds",
    "2 targeted attempts with Plan Mode&#39;s clarifying questions first",
    "Sessions survive compaction, device switches, and disconnects",
    "/chronicle converts history into standup reports and team instructions"
  ]'
  :metrics='[
    { value: "8 → 2", detail: "debugging attempts with Plan Mode" },
    { value: "45 → 8 min", detail: "Docker root cause with collaborative planning" },
    { value: "60 sec", detail: "to steer a remote production server from your phone" }
  ]'
/>

---

# What You Can Do Today

<WhatYouCanDoTodaySlide
  :today='[
    "Install GitHub Copilot CLI and run copilot in your terminal",
    "Use Shift+Tab to toggle Plan Mode on your next debugging session",
    "Run /chronicle standup after today&#39;s work session"
  ]'
  :thisWeek='[
    "Start a --remote session on a staging server and steer it from your phone",
    "Use /rewind to recover from a wrong-turn refactor — no Git required",
    "Schedule /every weekday at 9am to summarize overnight PRs"
  ]'
  :thisMonth='[
    "Wire copilot -p into GitHub Actions for automated build failure analysis",
    "Run /chronicle improve and apply suggestions to .github/copilot-instructions.md",
    "Delegate a long-running task with & and let the PR arrive while your IDE stays free"
  ]'
  footer="The session is the unit of work — think anywhere, steer anywhere, learn always, act autonomously."
/>

---

# References

<ReferencesSlide
  :groups='[
    { title: "📖 Core Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli", label: "About GitHub Copilot CLI", description: "Core concepts, architecture, and capabilities overview" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli", label: "Use Copilot CLI", description: "Command syntax, options, and workflow patterns" },
      { href: "https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli", label: "Install Copilot CLI", description: "Setup instructions for all platforms" },
      { href: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference", label: "CLI Command Reference", description: "All commands including /rewind, /every, /after, and /fleet" }
    ]},
    { title: "🔧 Features and How-Tos", color: "blue", items: [
      { href: "https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes", label: "Cloud and Local Sandboxes", description: "Experimental /sandbox enable and copilot --cloud --experimental" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/steer-remotely", label: "Steering a Session Remotely", description: "Phone and browser control for --remote sessions" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle", label: "Using /chronicle", description: "Standup reports, personalized tips, and instruction improvements" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts", label: "Scheduling Prompts", description: "/every and /after — experimental session-scoped automation" },
      { href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet", label: "Running Tasks With /fleet", description: "Explicit fan-out across parallel subagents with context isolation" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-finding-installing", label: "Finding and Installing Plugins", description: "Agent Plugins 1.0 (GA) — consumer install guide" }
    ]},
    { title: "📣 Recent Updates", color: "indigo", items: [
      { href: "https://github.blog/changelog/2026-04-13-remote-control-cli-sessions-on-web-and-mobile-in-public-preview/", label: "Remote Control CLI Sessions (Public Preview)", description: "2026-04-13: GitHub.com and GitHub Mobile steering launched" },
      { href: "https://github.blog/changelog/2026-08-12-agent-plugins-1-0-in-vs-code-copilot-cli-and-the-copilot-app", label: "Agent Plugins 1.0 GA", description: "Portable skills and MCP config in one package across surfaces" },
      { href: "https://github.com/github/copilot-cli/releases", label: "GitHub Copilot CLI Release Notes", description: "Full changelog and version history" }
    ]}
  ]'
/>

---

# Thank You

<ThankYouSlide
  title="GitHub Copilot CLI"
  subtitle="AI at the Point of Work"
  :cards="[
    { value: '8 → 2', detail: 'debugging attempts with Plan Mode' },
    { value: '60 sec', detail: 'to steer a production server from your phone' },
    { value: '4 gaps', detail: 'closed: Intent, Geography, Memory, Scale' }
  ]"
  prompt="Which gap does your team hit most — intent, geography, memory, or scale?"
/>

---
src: ./copilot-cli-reference.md
---

