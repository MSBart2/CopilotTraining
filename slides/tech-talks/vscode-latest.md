---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## VS Code Copilot 1.121–1.132
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: VS Code Copilot 1.121–1.132
mdc: true
section: Developers
status: active
updated: 2026-08-10
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
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="VS Code Copilot 1.121–1.132"
  subtitle="Portable Infrastructure, Open Models, and a Closed Review Loop"
  tagline="Bring any model — including local Ollama — with no GitHub sign-in required"
  meta="CopilotTraining Tech Talk · 45–60 minutes"
/>

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How does VS Code Copilot evolve from a window-bound chat to portable agent infrastructure?"
  subtext="Releases 1.121–1.132 change how agents are deployed, which models they use, and how review happens."
  highlight="Which capability is your team ready to act on tomorrow?"
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "Which new models and local options can I use without changing my GitHub account?" },
    { icon: "🧑‍💼", title: "Tech Lead", description: "How do parallel sessions, worktrees, and remote hosts change how we assign agent work?" },
    { icon: "🏗️", title: "Platform Engineer", description: "What controls exist for model gateways, MCP allowlists, and org-wide policy enforcement?" },
    { title: "BYOK GA in June 2026", description: "No GitHub sign-in needed for chat, tools, and MCP with any compatible provider" },
    { title: "Ollama: first-class provider", description: "Local models auto-discovered; zero network requests for air-gapped teams" },
    { title: "Browser tools on by default", description: "GA in June 2026 — device emulation, screenshots, element comments included" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Run Any Model You Choose", takeaway: "Configure BYOK providers, local Ollama, and a Stable Custom Endpoint without a GitHub sign-in.", whyItMatters: "Model choice, cost, and data residency become configuration decisions your team controls." },
    { title: "Detach Agents From the Window", takeaway: "See how the Copilot SDK and Agent Host Protocol let a session run on a machine you own and survive disconnect.", whyItMatters: "Long-running work stops being tied to one laptop and one open editor." },
    { title: "Close the Loop In-Window", takeaway: "Watch an agent build, emulate a device, screenshot, take element-anchored feedback, and route review back.", whyItMatters: "Validation and review stop costing a context switch on every iteration." }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔌", title: "Agent Infrastructure", subtitle: "AHP + SDK: sessions persist beyond the window", blurb: "Decouple the session from the window; run agents on owned remote hosts", slide: 5 },
    { icon: "🔑", title: "Open Model Workbench", subtitle: "BYOK GA, Ollama, Custom Endpoint, utility models", blurb: "Any compatible model for chat, tools, and MCP — no GitHub sign-in required", slide: 8 },
    { icon: "🪟", title: "Parallel Agent Work", subtitle: "Multiple sessions, /btw, and live activity pills", blurb: "The Agents window evolves from dashboard to multi-session workspace", slide: 13 },
    { icon: "🌐", title: "Closed-Loop Delivery", subtitle: "GA browser tools with device emulation", blurb: "Build, validate, and review without leaving the Agents window session", slide: 16 }
  ]'
/>

---

<!-- SLIDE: Part 1 — Agent Infrastructure -->
# Part 1 — Agent Infrastructure
<SectionOpenerSlide
  :partNumber="1"
  title="Agent Infrastructure"
  subtitle="The Copilot SDK and Agent Host Protocol detach the session from the window so agents run on infrastructure you own"
  :cards='[
    { icon: "🔌", title: "Agent Host Protocol", blurb: "Open spec: host owns state, clients sync and disconnect" },
    { icon: "🖥️", title: "Remote Machine Host", blurb: "SSH or dev tunnel; session persists after VS Code closes" },
    { icon: "🛠️", title: "Copilot SDK Runtime", blurb: "Copilot, Claude, Codex harnesses in one dedicated process" }
  ]'
  :terminal='{ context: "Preview: The session is no longer the window", detail: "session persists on remote infra → reconnect on completion" }'
/>

---

<!-- SLIDE: Session Is No Longer the Window -->
# Session Is No Longer the Window
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔌"
  pillLabel="Agent Infrastructure · The Decoupling"
  title="Session Is No Longer the Window"
  :left='{
    header: "Before AHP",
    icon: "💻",
    items: [
      { title: "Close VS Code → agent stops", detail: "Session lifetime = window lifetime" },
      "Context is lost on disconnect",
      "One active session per open window",
      "Long autonomous tasks compete with active work"
    ]
  }'
  :right='{
    header: "With AHP (Preview)",
    icon: "🔌",
    items: [
      { title: "Host persists after VS Code closes", detail: "Reconnect to a running session any time" },
      "Multi-client: same session, multiple windows",
      "Long tasks run on infrastructure your team owns",
      "Progress, tool outputs, and memory survive disconnect"
    ]
  }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Remote Machine Execution: Three Steps -->
# Remote Machine Execution: Three Steps
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🖥️"
  pillLabel="Agent Infrastructure · Remote Execution"
  title="Connect a Remote Agent Host in Three Steps"
  :columns='[
    { icon: "1️⃣", title: "Open Agents Window", description: "Go to the Remote tab inside the Agents window in VS Code stable preview", items: ["No separate tooling required"] },
    { icon: "2️⃣", title: "Connect via SSH or Tunnel", description: "Use an existing ~/.ssh/config entry, user@host string, or a running dev tunnel", items: ["Any existing SSH config works"] },
    { icon: "3️⃣", title: "Host Starts on Remote", description: "VS Code installs its CLI server and starts the agent host on the target machine", items: ["Host persists after VS Code closes", "v1.132: connect from multiple windows"] }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — Open Model Workbench -->
# Part 2 — Open Model Workbench
<SectionOpenerSlide
  :partNumber="2"
  title="Open Model Workbench"
  subtitle="BYOK is GA and needs no GitHub sign-in — any compatible provider drives chat, tools, and MCP"
  :cards='[
    { icon: "🔑", title: "BYOK Without Sign-In", blurb: "Any provider key — GA, no GitHub account needed" },
    { icon: "🏠", title: "Local via Ollama", blurb: "Pull models locally; zero network requests, air-gap ready" },
    { icon: "🔧", title: "Custom + Utility", blurb: "Stable gateway endpoint + per-task model tuning" }
  ]'
  :terminal='{ context: "PRIMARY DEMO: model picker → Manage Models… → add provider", detail: "models appear instantly — billing and rate limits via provider" }'
/>

---

<!-- SLIDE: BYOK is GA: Three Provider Paths -->
# BYOK is GA: Three Provider Paths
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔑"
  pillLabel="Open Model Workbench · Provider Paths"
  title="BYOK is GA: No GitHub Sign-In Required"
  :columns='[
    { icon: "☁️", title: "Cloud Providers", description: "Anthropic, Azure OpenAI, Gemini, OpenAI, OpenRouter — add key in Manage Models…", items: ["Billing and rate limits via provider", "No Copilot quota consumed"] },
    { icon: "🏠", title: "Local via Ollama", description: "VS Code auto-discovers pulled Ollama models — zero network requests leave the machine", items: ["Air-gap and data-residency safe", "Full chat, tools, and MCP support"] },
    { icon: "⚠️", title: "One Firm Boundary", description: "Inline completions and NES still require GitHub sign-in — BYOK covers chat and agents only", items: ["No BYOK path for ghost-text completions", "Plan inline suggestions separately"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Local Models via Ollama -->
# Local Models via Ollama
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🏠"
  pillLabel="Open Model Workbench · Local Models"
  title="Local Models via Ollama: Zero Network Requests"
  codePosition="left"
  :code='{ language: "bash", filename: "terminal", content: "# 1. Install Ollama (ollama.com)\n# 2. Pull models locally\nollama pull llama3.2\nollama pull codestral\n\n# 3. In VS Code:\n# model picker → Manage Models… → Ollama\n# VS Code discovers pulled models automatically" }'
  :features='[
    { icon: "🔍", title: "Auto-Discovery", description: "VS Code finds all locally pulled Ollama models without manual registration" },
    { icon: "🔒", title: "Air-Gap Ready", description: "Zero network requests — data residency guaranteed for sensitive codebases" },
    { icon: "🛠️", title: "Full Feature Parity", description: "All chat features, tool execution, and MCP work with local Ollama models" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Stable Custom Endpoint and Utility Models -->
# Stable Custom Endpoint and Utility Models
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🔧"
  pillLabel="Open Model Workbench · Custom + Utility"
  title="Stable Custom Endpoint and Utility Model Tuning"
  codePosition="left"
  :code='{ language: "json", filename: "settings.json", content: "{\n  // Route all VS Code Copilot chat through\n  // your own gateway — Chat: Manage Language Models\n  // Add → Custom Endpoint → choose API family\n\n  // Split utility tasks to a cheaper model\n  \"chat.utilityModel\": \"[configured-model-id]\",\n  \"chat.utilitySmallModel\": \"[fast-local-model-id]\"\n}" }'
  :features='[
    { icon: "🌐", title: "Custom Endpoint (Stable)", description: "Any Chat Completions, Responses, or Messages API gateway — stable since v1.122" },
    { icon: "⚡", title: "Utility Model Split", description: "Frontier model for primary work; fast local model for titles, summaries, and commits" },
    { icon: "💰", title: "Cost and Compliance", description: "Route all chat traffic through your internal gateway for logging and cost control" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Model Selection: Four Paths -->
# Model Selection: Four Paths
<FourCardGridSlide
  :partNumber="2"
  pillIcon="🗺️"
  pillLabel="Open Model Workbench · Model Selection"
  title="Model Selection: Four Paths for Four Needs"
  :cards='[
    { icon: "💬", title: "Interactive Chat", description: "Frontier model via Copilot or BYOK provider key" },
    { icon: "📚", title: "Large Codebase Analysis", description: "BYOK provider with 1M-token context + direct API access" },
    { icon: "⚡", title: "Utility Sub-Tasks", description: "Fast local or low-cost model for titles, summaries, commit messages" },
    { icon: "🔒", title: "Sensitive or Air-Gap", description: "Ollama local model — zero data leaves the machine" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Parallel Agent Work -->
# Part 3 — Parallel Agent Work
<SectionOpenerSlide
  :partNumber="3"
  title="Parallel Agent Work"
  subtitle="The Agents window evolves from a monitor to a workspace — multiple sessions, side chats, and live activity at a glance"
  :cards='[
    { icon: "🪟", title: "Multiple Sessions", blurb: "Each session: isolated worktree, tools, and model config" },
    { icon: "💬", title: "/btw Side Chats", blurb: "Ask lateral questions; main agent turn keeps running" },
    { icon: "👁️", title: "Live Activity Pills", blurb: "Surface changes, previews, subagents, browsers at a glance" }
  ]'
  :terminal='{ context: "Preview: Agents window as multi-session workspace", detail: "/btw and activity pills are GA in v1.132" }'
/>

---

<!-- SLIDE: /btw and Live Activity Pills -->
# /btw and Live Activity Pills
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="💬"
  pillLabel="Parallel Agent Work · GA Features"
  title="/btw Side Chats and Live Activity Pills"
  :left='{
    header: "/btw Side Chat (GA v1.132)",
    icon: "💬",
    items: [
      { title: "Opens without pausing the active turn", detail: "Main agent keeps executing while you type" },
      "Shares context and prompt cache with main chat",
      "Captures observations without interrupting the task",
      { title: "/btw should we use the builder pattern here?", detail: "Ask mid-tool-chain; main turn keeps running" }
    ]
  }'
  :right='{
    header: "Live Activity Pills (GA v1.132)",
    icon: "👁️",
    items: [
      { title: "Changes, Previews, Subagents, Browsers", detail: "All visible at a glance in the Agents window" },
      "Navigate directly to an active subagent or browser",
      "Pills clear when a turn completes — no noise accumulation",
      { title: "Replaces manual polling for Autopilot sessions", detail: "No need to check the terminal and come back" }
    ]
  }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Agents Window: Dashboard to Workspace -->
# Agents Window: Dashboard to Workspace
<BeforeAfterPanelsSlide
  :partNumber="3"
  pillIcon="🪟"
  pillLabel="Parallel Agent Work · Window Evolution"
  title="Agents Window: From Dashboard to Workspace"
  :before='{
    header: "Dashboard (before v1.121)",
    items: [
      "One session visible at a time",
      "No lateral questions during an active agent turn",
      "Manual check to see what the agent is doing",
      "Worktree scoped to a single harness type"
    ]
  }'
  :after='{
    header: "Workspace (v1.121–1.132, Preview)",
    items: [
      "Multiple sessions side-by-side with grouping and filter",
      "/btw side chat without interrupting the active turn",
      "Live pills surface changes, subagents, and browsers",
      "Worktrees work across local, remote, and SDK harnesses"
    ]
  }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Closed-Loop Delivery -->
# Part 4 — Closed-Loop Delivery
<SectionOpenerSlide
  :partNumber="4"
  title="Closed-Loop Delivery"
  subtitle="GA browser tools close the build-validate-review cycle without leaving the Agents window session"
  :cards='[
    { icon: "🌐", title: "GA Browser Tools", blurb: "Navigation, screenshot, interaction — GA, no config needed" },
    { icon: "📸", title: "Device Emulation", blurb: "Device presets; screenshots attach to the chat turn" },
    { icon: "💬", title: "Element Comments", blurb: "Select elements in v1.132, anchor a comment per element" }
  ]'
  :terminal='{ context: "CLIMAX DEMO: implement → emulate → screenshot → annotate elements → re-validate", detail: "all inside one session, no context switch" }'
/>

---

<!-- SLIDE: Browser Validation Before vs After -->
# Browser Validation Before vs After
<WorkflowShowdownStepsSlide
  :partNumber="4"
  pillIcon="🌐"
  pillLabel="Closed-Loop Delivery · Before vs After"
  title="Browser Validation: Before vs After GA Tools"
  subtitle="Closing the loop without leaving the session"
  leftLabel="Manual Browser Validation"
  rightLabel="With GA Browser Tools"
  :steps='[
    { left: { label: "Code the UI change", note: "Edit in the editor" }, right: { label: "Code the UI change", note: "Edit in the editor" } },
    { left: { label: "Open browser manually", note: "Switch to a separate browser tab" }, right: { label: "Agent opens localhost page", note: "Browser opens in the integrated panel" } },
    { left: { label: "Resize manually for mobile", note: "Approximate the device viewport" }, right: { label: "Agent emulates device preset", note: "iPhone 15, Galaxy S24, or custom viewport" } },
    { left: { label: "Annotate in external tool", note: "Screenshot, paste, mark up separately" }, right: { label: "Screenshot attaches to chat turn", note: "Validation evidence is part of the conversation" } },
    { left: { label: "Copy feedback back into chat", note: "Describe the issues in words" }, right: { label: "Select elements, anchor a comment each", note: "Precise per-element feedback (v1.132)" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "3–5 context switches per iteration" }'
  :outcomeRight='{ icon: "✅", label: "Full loop inside one session" }'
  summaryMetric="3–5 context switches per iteration → 0"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: The Closing Demo: Emulate, Screenshot, Annotate -->
# The Closing Demo: Emulate, Screenshot, Annotate
<AITerminalTranscriptSlide
  :partNumber="4"
  pillIcon="📸"
  pillLabel="Closed-Loop Delivery · Live Demo"
  title="The Closing Demo: Emulate, Screenshot, Annotate"
  subtitle="Implement → emulate → screenshot → element comment → re-validate, all in one session"
  :transcript='[
    { type: "prompt", text: "agent" },
    { type: "user", text: "Implement the mobile login form and validate it on iPhone 15" },
    { type: "thinking", label: "Copilot agent — browser tools active:" },
    { type: "response", lines: ["Opening http://localhost:3000/login...", "Emulating iPhone 15 (390x844 viewport)..."] },
    { type: "divider" },
    { type: "outcome", text: "Screenshot attached to this turn: login-mobile.png" },
    { type: "user", text: "[element comment on .btn-submit] Tap area is 28px — needs 44x44px min for accessibility" },
    { type: "divider" },
    { type: "outcome", text: "Applied: min-height: 44px; padding: 12px on .btn-submit" },
    { type: "outcome", text: "Screenshot attached: login-mobile-v2.png — tap area confirmed" }
  ]'
  footerMetric="implement → emulate → screenshot → annotate elements → re-validate: all in one session"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Where the Loop Is Heading (Preview) -->
# Where the Loop Is Heading (Preview)
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🔭"
  pillLabel="Closed-Loop Delivery · Preview Direction"
  title="Where the Loop Is Heading (Preview)"
  :columns='[
    { icon: "📋", title: "In-Window Diff Review", description: "Apply, revert, or cherry-pick per file; inline comments the agent acts on in later turns", items: ["Preview in Agents window"] },
    { icon: "🔄", title: "CI Feedback in Session", description: "Failed check details surface in the session — read, fix, and re-run without tab-switching", items: ["Preview: CI response in-window"] },
    { icon: "💬", title: "PR Comment Response", description: "PR review comments surface on the branch; respond, apply, or mark addressed in-window", items: ["Preview: PR feedback in-session"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From Window-Bound Sessions to Portable Agent Infrastructure"
  :leftItems='[
    "Agent stops when the VS Code window closes",
    "One provider; GitHub sign-in required for chat and tools",
    "Manual browser validation with context switches per iteration",
    "CI failures and PR review require separate browser tabs"
  ]'
  :rightItems='[
    "Agent host persists on remote infrastructure after disconnect",
    "Any BYOK provider or local Ollama model — no GitHub sign-in",
    "GA browser: device emulation, element comments inside the session",
    "CI failures and PR comments surfaced inside the Agents window"
  ]'
  :metrics='[
    { value: "6+", detail: "BYOK provider types including local Ollama" },
    { value: "GA", detail: "browser tools with device emulation since June 2026" },
    { value: "0", detail: "GitHub sign-in required for chat, tools, and MCP" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Open model picker → Manage Models… → add a BYOK provider key",
    "Pull an Ollama model locally and connect it in VS Code",
    "Run a UI task and validate it using GA browser tools"
  ]'
  :thisWeek='[
    "Configure utility models to split frontier vs. background tasks",
    "Try /btw for a lateral question during a long agent turn",
    "Set up a remote agent host via SSH for a long-running task"
  ]'
  :thisMonth='[
    "Evaluate Custom Endpoint for team-wide cost and compliance routing",
    "Explore Agents window parallel sessions for independent concurrent tasks",
    "Review session diffs in-window and respond to CI feedback in-session"
  ]'
  footer="The session is no longer the window — portable agents, open models, and closed-loop review are all available today."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/updates/v1_132", label: "VS Code release notes: August 5, 2026 (v1.132)", description: "Full release notes including element comments and multi-window agent sessions" },
      { href: "https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases", label: "GitHub Copilot in VS Code: July 2026 releases", description: "/btw side chats, live activity pills, and Agents window workspace updates" },
      { href: "https://github.blog/changelog/2026-07-08-github-copilot-in-visual-studio-code-june-2026-releases", label: "GitHub Copilot in VS Code: June 2026 releases", description: "GA browser tools, BYOK without sign-in, Stable Custom Endpoint" },
      { href: "https://code.visualstudio.com/updates/v1_122", label: "VS Code release notes: May 28, 2026 (v1.122)", description: "Stable Custom Endpoint and 1M-token context support" },
      { href: "https://code.visualstudio.com/updates/v1_121", label: "VS Code release notes: May 20, 2026 (v1.121)", description: "Agent Host Protocol and Copilot SDK remote agent host introduced" },
      { href: "https://code.visualstudio.com/docs/copilot/overview", label: "GitHub Copilot in VS Code documentation", description: "Complete reference for all Copilot features in VS Code" },
      { href: "https://code.visualstudio.com/docs/copilot/agents/background-agents", label: "Background Agents documentation", description: "Remote agent host setup, connection, and reconnect patterns" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
      { label: "Copilot SDK Talk", description: "Deep dive into the Copilot SDK harness and Agent Host Protocol" },
      { label: "MCP Apps Talk", description: "Connecting MCP servers to VS Code Copilot sessions and workflows" },
      { href: "https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot", label: "Upcoming September 2026 model deprecations in GitHub Copilot", description: "Context for why this talk uses durable frontier-model guidance instead of named catalog entries" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="VS Code Copilot 1.121–1.132"
  subtitle="Portable Agent Infrastructure, Open Models, and a Closed Review Loop"
  :cards="[
    { value: 'BYOK GA', detail: 'Any model, no GitHub sign-in — chat, tools, and MCP' },
    { value: 'Ollama', detail: 'Local models, zero network requests, air-gap ready' },
    { value: 'AHP', detail: 'Session outlives the window — remote hosts, multi-client' },
    { value: 'Browser GA', detail: 'Emulate, screenshot, element comments — no context switch' }
  ]"
  prompt="Which capability changes how your team works first — model choice, remote agents, or the browser validation loop?"
/>
