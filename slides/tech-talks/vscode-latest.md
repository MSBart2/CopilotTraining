---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## What's New in Copilot for VS Code
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: What's New in Copilot for VS Code
mdc: true
section: Developers
status: active
updated: 2026-05-13
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
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
</script>

# Title
<TitleSlide
  title="What's New in Copilot for VS Code"
  subtitle="v1.110 – v1.120: The Agent Platform Goes Mainstream"
  tagline="From one AI you chat with to a fleet of autonomous agents you orchestrate"
  meta="10 releases · May 2026"
/>

---

# Core Question
<CoreQuestionSlide
  question="What just changed in Copilot — and do I need to think differently?"
  subtext="Ten releases. One underlying shift."
  highlight="From AI you chat with to a fleet of agents you orchestrate."
  :cards='[
    { icon: "👩‍💻", title: "Individual Contributors", description: "Developers using Copilot daily who want to unlock the new autonomous capabilities" },
    { icon: "🏗️", title: "Engineering Leads",         description: "Team leads evaluating how to safely deploy background agents across the org" },
    { icon: "🧪", title: "Early Adopters",             description: "Developers already running background sessions who want the full platform picture" },
    { title: "10 releases covered", description: "v1.110 (Feb 2026) through v1.120 (May 13, 2026) — weekly cadence since v1.111" },
    { title: "93% cache hit rate",  description: "Token cost controls shipped before usage-based billing launched in June 2026" },
    { title: "4 agent session types", description: "Local, Background, Cloud, Claude — each with a distinct execution context and trust model" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Manage the Fleet", takeaway: "See active sessions, background tasks, and agent state together.", whyItMatters: "Parallel agents need a native operational view." },
    { title: "Observe Production Agents", takeaway: "Track telemetry, token use, and MCP consumption.", whyItMatters: "Visibility prevents cost and performance surprises." },
    { title: "Grow Trust Gradually", takeaway: "Move from chat to planning, background work, and automation.", whyItMatters: "Teams can increase autonomy without changing their platform." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🤖", title: "The Agent Platform",      subtitle: "Sessions, Autopilot, Agents Window",  blurb: "How the fleet works and why the Agents Window changes everything", slide: 4  },
    { icon: "🔑", title: "Your Models, Your Rules", subtitle: "BYOK, thinking effort, customization", blurb: "One picker for all your models; one editor for all your rules",        slide: 10 },
    { icon: "🔒", title: "Responsible Scale",       subtitle: "Trust, OTel, cost controls",           blurb: "Safety rails, observability, and 93% cache hit before billing",       slide: 13 },
    { icon: "🌐", title: "In Your Workflow",        subtitle: "Browser tabs, Memory, quick wins",     blurb: "The most cinematic new capability and the warmest closing beat",       slide: 16 }
  ]'
/>

---

# Part 1 — The Agent Platform
<SectionOpenerSlide
  :partNumber="1"
  title="The Agent Platform"
  subtitle="Four session types, Autopilot mode, and an Agents Window now in Stable preview"
  :cards='[
    { icon: "🗂️", title: "Four Session Types", blurb: "Local, Background, Cloud, Claude — each with its own execution context" },
    { icon: "🤖", title: "Autopilot Mode",      blurb: "Auto-approve, auto-retry, task_complete — leave the room" },
    { icon: "🪟", title: "Agents Window",        blurb: "Stable preview in v1.120 — dispatch and monitor sessions" }
  ]'
  :terminal='{ context: "v1.120: Agents Window moves to Stable preview", detail: "From Insiders-only → production-ready in one release cycle" }'
/>

---

# Four Agent Session Types
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🗂️"
  pillLabel="The Agent Platform: Session Types"
  title="Four Ways to Run an Agent"
  :cards='[
    { icon: "💬", title: "Local",      description: "Interactive in Chat view — real-time planning, exploration, and file edits in your current workspace" },
    { icon: "⚙️", title: "Background", description: "Autonomous multi-file tasks in an isolated Git worktree — your workspace stays completely untouched" },
    { icon: "☁️", title: "Cloud",      description: "GitHub-hosted infrastructure for cross-repo operations at scale — runs independently of your machine" },
    { icon: "🧠", title: "Claude",     description: "Anthropic&#39;s SDK with thinking tokens — deep reasoning for architecture and complex refactors" }
  ]'
  :progressDots='{ current: 1, total: 5, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Autopilot Permission Levels
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🤖"
  pillLabel="The Agent Platform: Autopilot"
  title="Three Levels of Agent Autonomy"
  :columns='[
    { icon: "🟡", title: "Default Approvals", description: "Agents use configured approval settings — dialogs appear before destructive tool calls", items: ["Visible at every step", "Safe for exploration"] },
    { icon: "🟠", title: "Bypass Approvals",  description: "Auto-approves all tool calls, auto-retries errors — no dialogs, but you are still in the room", items: ["Good for trusted tasks", "Faster iteration"] },
    { icon: "🟢", title: "Full Autopilot",    description: "Auto-approves, auto-retries, auto-responds, continues until task_complete — leave the room", items: ["Enable with sandboxing", "v1.112: works in CLI too"] }
  ]'
  :progressDots='{ current: 2, total: 5, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Background Agents + Git Worktree
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="⚙️"
  pillLabel="The Agent Platform: Background Agents"
  title="Your Workspace Is Untouched"
  :left='{
    header: "Your Active Workspace",
    icon: "🖥️",
    items: [
      { title: "You keep coding",       detail: "No files change, no distractions" },
      "All current edits are safe",
      { title: "You control the merge", detail: "Review the diff when the agent is done" }
    ]
  }'
  :right='{
    header: "The Agent Worktree",
    icon: "⚙️",
    items: [
      { title: "Isolated Git worktree",  detail: "Created automatically per session" },
      "Changes committed per turn to the worktree",
      { title: "Parallel sessions OK",   detail: "Each gets its own isolated branch" }
    ]
  }'
  :progressDots='{ current: 3, total: 5, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Subagents and Parallelism
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔀"
  pillLabel="The Agent Platform: Subagents"
  title="Delegation and Parallelism"
  :left='{
    header: "Explore Subagent",
    icon: "🔍",
    items: [
      { title: "Read-only research specialist", detail: "All codebase exploration for the Plan agent" },
      "Runs on fast models — Claude Haiku 4.5, Gemini 3 Flash",
      { title: "Clean main context",            detail: "Search tool calls stay out of your conversation" }
    ]
  }'
  :right='{
    header: "Nested Subagents (v1.113)",
    icon: "🌳",
    items: [
      { title: "Orchestrators spawn specialists", detail: "Each in their own context window" },
      "Independent subtasks run in parallel",
      { title: "Recursive delegation",            detail: "Subagents can invoke other subagents" }
    ]
  }'
  :progressDots='{ current: 4, total: 5, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Agents Window Capstone
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🪟"
  pillLabel="The Agent Platform: Agents Window"
  title="Agents Window — Stable Preview (v1.120)"
  :cards='[
    { icon: "🚀", title: "Dispatch",           description: "Send tasks to any agent harness — Local, Background, Cloud, or Claude — from one dedicated panel" },
    { icon: "👁️", title: "Monitor",            description: "Track all parallel session status, diffs, and completions in real time without switching tabs" },
    { icon: "🔄", title: "Sync Before Work",   description: "New upstream sync button pulls latest changes into the worktree before agent work begins" },
    { icon: "📋", title: "Review and Discard", description: "Completed sessions show all edits by default; discard selectively from the Changes panel" }
  ]'
  :progressDots='{ current: 5, total: 5, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Your Models, Your Rules
<SectionOpenerSlide
  :partNumber="2"
  title="Your Models, Your Rules"
  subtitle="BYOK, thinking effort, and unified customization — ownership at every layer"
  :cards='[
    { icon: "🔑", title: "Bring Your Own Key", blurb: "Add Anthropic or Azure OpenAI keys — models appear instantly in the picker" },
    { icon: "🎛️", title: "Thinking Effort",    blurb: "Low / Medium / High — now for all BYOK models in v1.120, not just Claude" },
    { icon: "📋", title: "Chat Customizations", blurb: "One editor: instructions, agents, skills, and plugins in one place" }
  ]'
  :terminal='{ context: "v1.120: thinking effort extended to all BYOK models", detail: "One reasoning dial controls all your models" }'
/>

---

# BYOK + Thinking Effort
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔑"
  pillLabel="Your Models, Your Rules: BYOK"
  title="Bring Your Own Key — 90-Second Setup"
  :columns='[
    { icon: "📌", title: "Open the Picker",    description: "Model picker → Manage Models… → pick a provider: OpenAI, Anthropic, Azure OpenAI, Google, or Ollama", items: ["Admin enables BYOK policy first", "No VS Code settings needed"] },
    { icon: "🔑", title: "Add Your Key",        description: "Paste the API key — all models for that key appear instantly as selectable options in the picker", items: ["Billing goes to your provider", "Rate limits from your plan"] },
    { icon: "🎛️", title: "Set Thinking Effort", description: "Select Low / Medium / High in the same picker — extended to all BYOK models in v1.120", items: ["Low: fast answers", "High: complex reasoning"] }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Chat Customizations + Org Governance
<FourCardGridSlide
  :partNumber="2"
  pillIcon="📋"
  pillLabel="Your Models, Your Rules: Customization"
  title="One Surface. All Your Rules."
  :cards='[
    { icon: "📄", title: "Instructions",   description: "/init bootstraps instructions from your codebase. /create-* builds skills and agents from chat" },
    { icon: "🤝", title: "Agent Skills",   description: "GA by default — one SKILL.md per domain, isolated context (v1.118), auto-applied automatically" },
    { icon: "🔌", title: "Plugins",        description: "Bundles of skills, commands, MCP servers, and hooks from Extensions view — search with @agentPlugins" },
    { icon: "🏢", title: "Org Governance", description: "Org-level instructions and org restrictions (v1.118) enforce standards across all developers" }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Responsible Scale
<SectionOpenerSlide
  :partNumber="3"
  title="Responsible Scale"
  subtitle="Trust architecture, OTel observability, and cost controls built before the billing meter started"
  :cards='[
    { icon: "🔒", title: "Trust Architecture",    blurb: "MCP and terminal sandboxing plus command risk assessment as safety rails" },
    { icon: "📡", title: "OpenTelemetry Tracing", blurb: "End-to-end spans per session — audit trails for your platform" },
    { icon: "💰", title: "93% Cache Hit Rate",    blurb: "Shipped in the same release cycle as June 2026 usage-based billing" }
  ]'
  :terminal='{ context: "Individual-contributors path — compressed to 8 minutes", detail: "Safety rails named · OTel in one slide · billing as the climax" }'
/>

---

# Trust Architecture
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔒"
  pillLabel="Responsible Scale: Trust Architecture"
  title="Three Safety Rails Before Execution"
  :columns='[
    { icon: "🗂️", title: "MCP Server Sandboxing",  description: "MCP servers run in OS-level sandbox on macOS and Linux — filesystem and network access blocked", items: ["Enable per-server in mcp.json", "VS Code prompts for extra access"] },
    { icon: "💻", title: "Terminal Sandboxing",     description: "Terminal: workspace-only files; network blocked by default; allowlist for trusted domains", items: ["macOS: sandbox-exec", "Linux: Landlock/seccomp"] },
    { icon: "⚠️", title: "Command Risk Assessment", description: "v1.120: commands assessed before execution — warnings for destructive operations", items: ["No config needed", "Works in Autopilot mode too"] }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# OTel + Billing Climax
<HeroStatSlide
  :partNumber="3"
  pillIcon="📡"
  pillLabel="Responsible Scale: Cost Controls"
  title="They Built the Cost Controls Before the Meter"
  subtitle="93% prompt cache hit rate — shipped in the same release cycle as June 2026 usage-based billing"
  :hero='{ value: "93%", label: "prompt cache hit rate across all agent sessions", source: "VS Code v1.118 telemetry — shipped before usage-based billing launched" }'
  :supporting='[
    { icon: "📡", title: "OpenTelemetry Tracing (v1.119)", description: "End-to-end spans, tool call latency, audit trails — plug into Datadog, Grafana, or any platform" },
    { icon: "💾", title: "Prompt Caching + Compaction",    description: "Cache-stable prompts and background compaction reduce token spend automatically — no config needed" },
    { icon: "💰", title: "June 2026: Usage-Based Billing", description: "~40% cost reduction from caching before billing launched. OTel shows what the agent consumed." }
  ]'
  :insight='{ icon: "🔑", text: "OTel is enterprise trust infrastructure, not session debugging — this is what lets teams deploy agents without hand-holding." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — In Your Workflow
<SectionOpenerSlide
  :partNumber="4"
  title="In Your Workflow"
  subtitle="From a 7-day community reversal to a browser that thinks alongside you"
  :cards='[
    { icon: "↩️", title: "They Listened",       blurb: "Added v1.118, reverted in 7 days after community feedback" },
    { icon: "🌐", title: "Browser Tab Sharing", blurb: "Agent reads your live DOM, applies fixes, confirms — no alt-tab required" },
    { icon: "🧠", title: "Copilot Memory",      blurb: "Surfaces prior context automatically — zero setup required" }
  ]'
  :terminal='{ context: "Expanded path: time from compressed S3 goes here", detail: "Commit attribution story · browser demo · Memory two-beat close" }'
/>

---

# Commit Attribution Revert
<BeforeAfterPanelsSlide
  :partNumber="4"
  pillIcon="↩️"
  pillLabel="In Your Workflow: Community Trust"
  title="They Added It. The Community Said No. They Reverted in 7 Days."
  :before='{
    header: "v1.118 — Shipped",
    items: [
      { title: "Co-authored-by: Copilot", detail: "Added to every AI-assisted commit by default" },
      "Enabled via git.addAICoAuthor = true",
      "On by default — no opt-in required",
      "Community reaction: immediate and loud"
    ]
  }'
  :after='{
    header: "v1.119 — Reverted",
    items: [
      { title: "Reverted to opt-in",   detail: "Seven days after v1.118 shipped" },
      "git.addAICoAuthor now defaults to false",
      "The setting still exists for those who want it",
      { title: "The relationship",     detail: "They ship fast and listen faster" }
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Browser Tab Sharing
<AITerminalTranscriptSlide
  :partNumber="4"
  pillIcon="🌐"
  pillLabel="In Your Workflow: Browser Tab Sharing"
  title="The Agent Reads Your Live DOM"
  subtitle="No alt-tab, no copy-paste, no screenshot — the agent sees what you see"
  :transcript='[
    { type: "prompt",   text: "copilot" },
    { type: "user",     text: "The button color looks wrong on the live page. Fix it." },
    { type: "thinking", label: "🤔 Agent: checking available browser tabs..." },
    { type: "response", lines: ["I can see 1 browser tab open (localhost:3000).", "Can I access it to inspect the DOM directly?"] },
    { type: "user",     text: "Yes, share it." },
    { type: "divider" },
    { type: "thinking", label: "🔍 Reading DOM via readPage..." },
    { type: "response", lines: ["Found: .btn-primary { color: #1a7fba }", "Expected: #0969da (GitHub blue)", "Applying fix to Button.css..."] },
    { type: "outcome",  text: "CSS patched. Tab reloaded. Button color confirmed correct." }
  ]'
  footerMetric="Zero alt-tabs. Zero copy-paste. Confirmed in the chat thread."
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Chat UX Quick Wins
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="⚡"
  pillLabel="In Your Workflow: Chat UX"
  title="Quick Wins You Will Use Every Day"
  :columns='[
    { icon: "↔️", title: "Inline Diffs (v1.119)",  description: "Code changes visible as diffs in the chat thread — no tab-switching to review", items: ["No separate diff view needed", "Markdown diff preview in v1.120"] },
    { icon: "🔍", title: "#codebase Search",        description: "Purely semantic — no fuzzy fallback. Unified index, consistent results, managed by VS Code", items: ["Simplified in v1.114", "Reindex if you had local indexes"] },
    { icon: "📋", title: "Copy Final Response",     description: "Right-click → Copy Final Response for clean Markdown only. /troubleshoot #session for past sessions", items: ["Right-click in chat", "Works across session history"] }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Copilot Memory
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🧠"
  pillLabel="In Your Workflow: Copilot Memory"
  title="It Gets Smarter the Longer You Use It"
  :left='{
    header: "Returning to a Project",
    icon: "🔄",
    items: [
      { title: "Open the project cold",         detail: "No prompt, no context dump needed" },
      "Memory surfaces prior context automatically",
      { title: "Plans persist across sessions", detail: "Even after context compaction" },
      "Preferences, conventions, decisions — all remembered"
    ]
  }'
  :right='{
    header: "Zero Setup Required",
    icon: "✨",
    items: [
      { title: "Enable once",         detail: "github.copilot.chat.copilotMemory.enabled: true" },
      "Infers from prior sessions — no explicit save needed",
      { title: "Cold-open inference", detail: "New project benefits from patterns across others" },
      "Gets smarter the longer you use it"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="The Shift: Assistant to Agent Platform"
  :leftItems='[
    "One conversation, one task at a time",
    "You write the plan, Copilot executes steps on request",
    "Context resets between sessions",
    "Monitor every file change manually"
  ]'
  :rightItems='[
    "Parallel sessions dispatched from the Agents Window",
    "Full Autopilot: auto-approve, auto-retry, until task_complete",
    "Copilot Memory surfaces prior context automatically",
    "OTel traces audit every tool call end-to-end"
  ]'
  :metrics='[
    { value: "93%",    detail: "prompt cache hit rate — cost controls before billing launched" },
    { value: "4",      detail: "agent session types: Local, Background, Cloud, Claude" },
    { value: "v1.120", detail: "Agents Window stable — from Insiders-only to production-ready" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Open the Agents Window (View → Agents) and dispatch your first background task",
    "Enable Full Autopilot on a low-risk refactor — see how far it goes unsupervised"
  ]'
  :thisWeek='[
    "Add a BYOK model key and compare thinking effort levels on a complex architectural decision",
    "Add a .github/copilot-instructions.md to your repo — org-level context, zero runtime cost"
  ]'
  :thisMonth='[
    "Enable OpenTelemetry tracing and review agent cost before your first usage-based billing cycle",
    "Build a team SKILL.md for your most-repeated coding pattern — deploy to everyone at once"
  ]'
  footer="v1.120 is generally available now — start with the Agents Window and work backward."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Release Notes", color: "cyan", items: [
      { href: "https://code.visualstudio.com/updates/v1_120", label: "VS Code v1.120 — May 13, 2026",   description: "Agents Window stable, command risk assessment, terminal compression, BYOK thinking effort" },
      { href: "https://code.visualstudio.com/updates/v1_119", label: "VS Code v1.119 — May 6, 2026",    description: "Browser tab sharing, OpenTelemetry tracing, inline diffs, commit attribution revert" },
      { href: "https://code.visualstudio.com/updates/v1_118", label: "VS Code v1.118 — April 29, 2026", description: "Remote Copilot CLI, 93% prompt cache hit rate, enterprise org restrictions" },
      { href: "https://code.visualstudio.com/updates/v1_117", label: "VS Code v1.117 — April 22, 2026", description: "BYOK for Enterprise, incremental chat rendering, agent session sorting" },
      { href: "https://code.visualstudio.com/updates/v1_110", label: "VS Code v1.110 – v1.115",          description: "Agent Plugins, Autopilot mode, Agents companion app, MCP sandboxing, background agents" }
    ] },
    { title: "📚 Documentation", color: "purple", items: [
      { href: "https://code.visualstudio.com/docs/copilot/overview",                   label: "GitHub Copilot in VS Code", description: "Official documentation and setup guide" },
      { href: "https://code.visualstudio.com/docs/copilot/agents/background-agents",   label: "Background Agents",         description: "Git worktree isolation, session management, review workflow" },
      { href: "https://code.visualstudio.com/docs/copilot/customization/agent-skills", label: "Agent Skills",              description: "Creating and deploying SKILL.md files for your team" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="The Agent Platform Is Here"
  subtitle="Ten releases. One shift: from AI you chat with to a fleet you orchestrate."
  :cards="[
    { value: 'Agents Window', detail: 'Stable preview in v1.120 — dispatch, monitor, and parallelize autonomous sessions from one dedicated panel' },
    { value: '93% cache hit', detail: 'Cost controls shipped before the billing meter — OTel traces show exactly what the agent consumed' },
    { value: 'Browser tabs',  detail: 'Agent reads your live DOM and fixes what it sees — no alt-tab, no copy-paste, confirmed in the chat thread' }
  ]"
  prompt="What would you hand to an agent this week?"
/>
