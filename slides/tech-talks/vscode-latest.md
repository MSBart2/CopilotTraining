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
updated: 2026-08-12
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
    { title: "Open the Agents window", description: "Dedicated agent-first surface — still missed by teams stuck in side chat" },
    { title: "BYOK GA + Ollama", description: "No GitHub sign-in needed for chat, tools, and MCP; local models auto-discovered" },
    { title: "Vision paste + browser loop", description: "Attach Excel/screenshots as images; GA browser tools with element comments" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Run Any Model You Choose", takeaway: "Configure BYOK providers, local Ollama, and a Stable Custom Endpoint without a GitHub sign-in.", whyItMatters: "Model choice, cost, and data residency become configuration decisions your team controls." },
    { title: "Open the Agents Window", takeaway: "Leave side-chat-only habits: open the dedicated Agents window and run multi-session work with live activity.", whyItMatters: "Most of the parallel and review story is invisible until this surface is open." },
    { title: "Close the Loop In-Window", takeaway: "Paste vision evidence, emulate a device, screenshot, take element-anchored feedback, and route review back.", whyItMatters: "Validation and context handoff stop costing a context switch on every iteration." }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔌", title: "Agent Infrastructure", subtitle: "AHP + SDK: sessions persist beyond the window", blurb: "Decouple the session from the window; run agents on owned remote hosts", slide: 5 },
    { icon: "🔑", title: "Open Model Workbench", subtitle: "BYOK GA, Ollama, Custom Endpoint, utility models", blurb: "Any compatible model for chat, tools, and MCP — no GitHub sign-in required", slide: 8 },
    { icon: "🪟", title: "Parallel Agent Work", subtitle: "Open the Agents window; multi-session + /btw", blurb: "Awareness first — then multi-session workspace, side chats, live pills", slide: 13 },
    { icon: "🌐", title: "Closed-Loop Delivery", subtitle: "Vision paste + GA browser validation loop", blurb: "Attach evidence, emulate, screenshot, annotate — without leaving the session", slide: 17 }
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
  subtitle="First open the Agents window — then multi-session work, side chats, and live activity become obvious"
  :cards='[
    { icon: "🚪", title: "Open It", blurb: "Title bar, Command Palette, or code --agents" },
    { icon: "🪟", title: "Multi-Session Workspace", blurb: "Isolated worktrees, tools, and model config per session" },
    { icon: "💬", title: "/btw + Live Pills", blurb: "Lateral questions and at-a-glance activity without polling" }
  ]'
  :terminal='{ context: "Most teams still only use side chat", detail: "Open the Agents window before teaching parallel features" }'
/>

---

<!-- SLIDE: Open the Agents Window -->
# Open the Agents Window
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🚪"
  pillLabel="Parallel Agent Work · Awareness"
  title="Open the Agents Window First"
  :cards='[
    { icon: "📍", title: "Title Bar", description: "Select Open in Agents in the VS Code title bar — always one click away" },
    { icon: "⌨️", title: "Command Palette", description: "Chat: Open Agents Window via Ctrl+Shift+P / ⇧⌘P" },
    { icon: "💻", title: "CLI", description: "code --agents from the terminal — scriptable entry point" },
    { icon: "🌐", title: "Browser / Welcome", description: "Welcome-page link or insiders.vscode.dev/agents" }
  ]'
  :insight='{ text: "Dedicated VS Code window beside the editor — same sessions as side Chat, agent-first layout" }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Agents Window: Dashboard to Workspace -->
# Agents Window: Dashboard to Workspace
<BeforeAfterPanelsSlide
  :partNumber="3"
  pillIcon="🪟"
  pillLabel="Parallel Agent Work · Window Evolution"
  title="Agents Window: From Side Chat to Workspace"
  :before='{
    header: "Side Chat Only (common habit)",
    items: [
      "One conversation buried in the editor sidebar",
      "No multi-workspace sessions list",
      "Hard to track concurrent agent work",
      "Changes and files live in other panels"
    ]
  }'
  :after='{
    header: "Agents Window (Preview workspace)",
    items: [
      "Dedicated window: sessions across workspaces",
      "Chat + Changes + Files for the active session",
      "Multiple sessions side-by-side with isolated worktrees",
      "/btw side chats and live activity pills"
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
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
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Closed-Loop Delivery -->
# Part 4 — Closed-Loop Delivery
<SectionOpenerSlide
  :partNumber="4"
  title="Closed-Loop Delivery"
  subtitle="Vision paste for everyday evidence — then GA browser tools close the build-validate-review loop"
  :cards='[
    { icon: "🖼️", title: "Copilot Vision (GA)", blurb: "Paste Excel, mockups, PDFs — attach evidence, not walls of text" },
    { icon: "🌐", title: "GA Browser Tools", blurb: "Navigation, screenshot, interaction — on by default" },
    { icon: "💬", title: "Element Comments", blurb: "Select elements in v1.132, anchor a comment per element" }
  ]'
  :terminal='{ context: "CLIMAX DEMO: implement → emulate → screenshot → annotate elements → re-validate", detail: "Vision paste for human evidence; browser tools for agent validation" }'
/>

---

<!-- SLIDE: Copilot Vision: Paste Evidence -->
# Copilot Vision: Paste Evidence
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🖼️"
  pillLabel="Closed-Loop Delivery · Vision GA"
  title="Paste Evidence Instead of Walls of Text"
  :left='{
    header: "Copilot Vision (GA v1.128)",
    icon: "🖼️",
    items: [
      { title: "Paste, drag-drop, or attach images and PDFs", detail: "Ask, plan, and agent modes" },
      "Available on Free, Pro, Pro+, Business, and Enterprise",
      { title: "Excel range → image attachment", detail: "Clipboard image data attaches as vision context" },
      "Same path for mockups, error dialogs, whiteboards"
    ]
  }'
  :right='{
    header: "Browser Add-to-Chat",
    icon: "🌐",
    items: [
      { title: "Add Screenshot to Chat", detail: "Capture the current viewport as an image" },
      { title: "Add Element to Chat", detail: "Selected elements with styles and screenshots" },
      { title: "Add Console Logs to Chat", detail: "Runtime output without copy-paste sprawl" },
      "You already have the page — attach it and ask"
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
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
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
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
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
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
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From Window-Bound Sessions to Portable Agent Infrastructure"
  :leftItems='[
    "Agents only used from the side Chat view",
    "One provider; GitHub sign-in required for chat and tools",
    "Paste walls of Excel/text instead of visual evidence",
    "Manual browser validation with context switches per iteration"
  ]'
  :rightItems='[
    "Agents window open as the multi-session agent surface",
    "Any BYOK provider or local Ollama model — no GitHub sign-in",
    "Vision paste for Excel/mockups; browser Add Screenshot to Chat",
    "GA browser loop with device emulation and element comments"
  ]'
  :metrics='[
    { value: "Open", detail: "Agents window — title bar, palette, or code --agents" },
    { value: "GA", detail: "Vision paste + browser tools with device emulation" },
    { value: "0", detail: "GitHub sign-in required for chat, tools, and MCP" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Open the Agents window (title bar, Command Palette, or code --agents)",
    "Paste an Excel range or screenshot into Chat — Vision attaches it as an image",
    "Open model picker → Manage Models… → add a BYOK or Ollama provider"
  ]'
  :thisWeek='[
    "Try /btw during a long agent turn; watch live activity pills",
    "Use browser Add Screenshot / Element to Chat on a localhost page",
    "Run a UI task and validate it with GA browser device emulation"
  ]'
  :thisMonth='[
    "Evaluate Custom Endpoint for team-wide cost and compliance routing",
    "Run parallel Agents window sessions for independent concurrent tasks",
    "Review session diffs in-window and respond to CI feedback in-session"
  ]'
  footer="Open the Agents window, bring any model, and close the loop with vision + browser evidence."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://code.visualstudio.com/updates/v1_132", label: "VS Code release notes: August 5, 2026 (v1.132)", description: "Element comments, /btw, live pills, multi-window agent sessions" },
      { href: "https://code.visualstudio.com/docs/agents/agents-window", label: "Use the Agents window (Preview)", description: "How to open it, multi-workspace sessions, Changes/Files panels" },
      { href: "https://code.visualstudio.com/updates/v1_128", label: "VS Code release notes: July 8, 2026 (v1.128)", description: "Copilot Vision GA — paste images and PDFs into Chat" },
      { href: "https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/", label: "Copilot vision is generally available", description: "Supported formats and plan availability for image/PDF attachments" },
      { href: "https://code.visualstudio.com/docs/chat/copilot-chat-context", label: "Add context to chat", description: "Vision attachments and browser Add Screenshot / Element to Chat" },
      { href: "https://github.blog/changelog/2026-07-30-github-copilot-in-visual-studio-code-july-2026-releases", label: "GitHub Copilot in VS Code: July 2026 releases", description: "/btw side chats, live activity pills, and Agents window workspace updates" },
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
    { value: 'Agents Window', detail: 'Open it — multi-session agent surface most teams still skip' },
    { value: 'BYOK GA', detail: 'Any model, no GitHub sign-in — chat, tools, and MCP' },
    { value: 'Vision GA', detail: 'Paste Excel/screenshots/PDFs instead of walls of text' },
    { value: 'Browser GA', detail: 'Emulate, screenshot, element comments — no context switch' }
  ]"
  prompt="Which changes your team first — opening the Agents window, model choice, or vision + browser evidence?"
/>
