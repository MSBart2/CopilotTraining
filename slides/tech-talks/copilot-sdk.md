---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot SDK
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot SDK
mdc: true
section: "Customization & Context"
status: active
updated: 2026-04-22
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
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot SDK"
  subtitle="Build AI-Powered Tools for Your Workflows"
  tagline="Stop building AI infrastructure. Start building the thing that matters."
  meta="CopilotTraining · Customization & Context"
/>

---

# Core Question
<CoreQuestionSlide
  question="What if shipping an AI automation took 10 lines of code — not a month of infrastructure work?"
  subtext="The Copilot SDK puts the full production agent runtime in your hands."
  highlight="Same engine. Your workflows. Instant value."
  :cards='[
    { icon: "🔧", title: "Platform Engineers", description: "Wire Copilot into CI, cron jobs, and internal tools without building an AI stack" },
    { icon: "🚀", title: "Developers", description: "Ship AI-powered automations this sprint — release notes, code review, test analysis" },
    { icon: "🏢", title: "Architects", description: "Evaluate SDK trust posture: BYOK, tool permissions, model routing, MCP integration" },
    { title: "2 hours → ~15 minutes", description: "Release notes automation — first pattern most teams ship" },
    { title: "45 min per failed CI run", description: "Manual test-failure analysis eliminated by the scheduler pattern" },
    { title: "30 min/PR → zero", description: "Code standards enforcement automated end-to-end" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Use the Runtime", takeaway: "Build on the production-tested Copilot runtime instead of rebuilding it.", whyItMatters: "Teams can focus on their automation problem, not agent plumbing." },
    { title: "Embed Anywhere", takeaway: "Integrate agents into applications, pipelines, and internal tools.", whyItMatters: "AI capability reaches the workflows where teams already operate." },
    { title: "Stack the Leverage", takeaway: "Combine SDK agents with existing automation systems.", whyItMatters: "Connected automation compounds more than isolated one-off tools." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🏗️", title: "Architecture & Capabilities", subtitle: "The production runtime you already trust", blurb: "JSON-RPC façade, language support, full capability map", slide: 4 },
    { icon: "⚡", title: "Getting Started", subtitle: "10 lines to a working agent", blurb: "Install, CopilotClient, run_agent — first automation live", slide: 8 },
    { icon: "🔌", title: "Integration Patterns", subtitle: "CLI → Web API → Scheduled Automation", blurb: "Production-grade deployment patterns with enterprise controls", slide: 11 },
    { icon: "🎯", title: "Advanced Features", subtitle: "Real-world use cases with full ROI", blurb: "BYOK, streaming, model routing, and the numbers that justify adoption", slide: 16 }
  ]'
/>

---

# Part 1 — Architecture & Capabilities
<SectionOpenerSlide
  :partNumber="1"
  title="Architecture & Capabilities"
  subtitle="Not a wrapper — the same production agent runtime that powers Copilot CLI, exposed as an SDK."
  :cards='[
    { icon: "🏗️", title: "JSON-RPC over stdio", blurb: "Thin protocol façade over the battle-tested CLI agent" },
    { icon: "🌐", title: "Four Languages", blurb: "Python, TypeScript/Node.js, Go, .NET — same API surface" },
    { icon: "⚙️", title: "Full Runtime Included", blurb: "Planning loops, tool orchestration, MCP, BYOK — all ship with the import" }
  ]'
  :terminal='{ context: "import CopilotClient", detail: "Months of production runtime ship with that one line" }'
/>

---

# The Architecture Reveal
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🏗️"
  pillLabel="Architecture: How It Works"
  title="SDK = Production CLI Runtime + Protocol"
  :cards='[
    { icon: "📡", title: "JSON-RPC over stdio", description: "SDK spawns Copilot CLI in server mode and manages the protocol — no custom AI runtime needed" },
    { icon: "🔄", title: "Planning Loops", description: "Multi-turn agentic execution with full tool orchestration — identical to what Copilot Chat uses" },
    { icon: "🛠️", title: "Tool Orchestration", description: "File system, terminal, web, MCP servers — all available inside your SDK agent calls" },
    { icon: "🔒", title: "Context Management", description: "Conversation state, working directory scoping, and permission controls built in from day one" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Language Support & Runtime Proof
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🌐"
  pillLabel="Architecture: Language Support"
  title="Four Languages, One Production Runtime"
  :columns='[
    { icon: "🐍", title: "Python & Node.js", description: "Tier-1 support — most SDK examples, fastest iteration, largest ecosystem overlap with AI tooling", items: ["pip install copilot-sdk", "npm install @github/copilot-sdk"] },
    { icon: "🔵", title: "Go & .NET", description: "First-class support for enterprise platform teams already in the Go or C# stack", items: ["go get github.com/github/copilot-sdk", "dotnet add package GitHub.CopilotSdk"] },
    { icon: "🚀", title: "Same Runtime Everywhere", description: "All four languages wrap the identical CLI agent binary — no behavioral differences across stacks" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Full Capability Map
<FourCardGridSlide
  :partNumber="1"
  pillIcon="⚙️"
  pillLabel="Architecture: Capabilities"
  title="Everything That Ships With the Import"
  :cards='[
    { icon: "🤖", title: "MCP Integration", description: "Connect any MCP server — tools surface automatically inside the agent&#39;s execution loop" },
    { icon: "💰", title: "BYOK Support", description: "Bring your own API key for cost governance and enterprise compliance out of the box" },
    { icon: "🎯", title: "Model Routing", description: "Route requests to the right model per task — balance cost, latency, and capability" },
    { icon: "📡", title: "Streaming", description: "Real-time token streaming for long-running agents — no timeout cliff, responsive UX" }
  ]'
  :insight='{ icon: "💡", text: "These are not add-ons — they are part of the CLI runtime you import." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Getting Started
<SectionOpenerSlide
  :partNumber="2"
  title="Getting Started"
  subtitle="Install once, call run_agent — the full agentic execution loop in under 10 lines of code."
  :cards='[
    { icon: "📦", title: "One Install Command", blurb: "pip install or npm install — no infra setup" },
    { icon: "💻", title: "CopilotClient + run_agent", blurb: "10 lines from install to working agent call" },
    { icon: "⏱️", title: "Release Notes in 15 min", blurb: "First automation most teams ship — same day" }
  ]'
  :terminal='{ context: "pip install copilot-sdk && python hello_agent.py", detail: "2-hour release notes job → ~15 minutes automated" }'
/>

---

# 10-Line Hello World
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Getting Started: Hello World"
  title="The Full Agentic Loop in 10 Lines"
  codePosition="left"
  :code='{ language: "python", content: "from copilot_sdk import CopilotClient\n\nclient = CopilotClient()\n\nresult = client.run_agent(\n    prompt=\"Summarize changes in CHANGELOG.md\",\n    working_dir=\"/repo\",\n    allowed_tools=[\"read_file\", \"list_files\"]\n)\n\nprint(result.output)" }'
  :features='[
    { icon: "🔄", title: "Full planning loop", description: "Multi-turn tool use — not a single LLM call" },
    { icon: "🔒", title: "Tool allowlist", description: "allowed_tools scopes what the agent can touch" },
    { icon: "📂", title: "Working dir scope", description: "Agent&#39;s file access stays inside /repo" }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# ROI Hook — Release Notes
<HeroStatSlide
  :partNumber="2"
  pillIcon="⏱️"
  pillLabel="Getting Started: First Win"
  title="Release Notes: The Team's First Automation"
  subtitle="One SDK call replaced two hours of manual engineering work"
  :hero='{ value: ">85%", label: "time reduction", source: "2 hours → ~15 minutes per release" }'
  :supporting='[
    { icon: "📝", title: "Before", description: "Engineer reads commits, drafts notes, reviews, publishes — 2 hours per release" },
    { icon: "⚡", title: "After", description: "SDK agent reads changelog, formats release doc — 15 minutes automated" },
    { icon: "🚀", title: "Ship It Today", description: "Runs from the 10-line pattern you just saw — no extra infrastructure" }
  ]'
  :insight='{ icon: "💡", text: "The SDK agent does the same planning loop a human would — read, reason, write — just consistently and instantly." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Integration Patterns
<SectionOpenerSlide
  :partNumber="3"
  title="Integration Patterns"
  subtitle="From one-shot CLI tool to persistent HTTP service to autonomous cron job — three production-grade patterns."
  :cards='[
    { icon: "🖥️", title: "CLI Tool", blurb: "Wrap run_agent in a script — simplest entry point" },
    { icon: "🌐", title: "Web API", blurb: "Flask/Express endpoint — agent on demand, HTTP-native" },
    { icon: "⏰", title: "Scheduled Automation", blurb: "Cron + SDK — fully autonomous, zero human intervention" }
  ]'
  :terminal='{ context: "cron: 0 * * * * python ci_analyzer.py", detail: "45-min manual CI failure analysis → automated on every run" }'
/>

---

# Pattern 1+2 — CLI to Web API
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔌"
  pillLabel="Integration: CLI & Web API"
  title="From Script to Persistent Service"
  :left='{
    header: "CLI Tool Pattern",
    icon: "🖥️",
    items: [
      { title: "One command, one agent call", detail: "python analyze_pr.py --pr 1234" },
      { title: "Pipe output to CI", detail: "Exit code drives pass/fail gates" },
      "Perfect for GitHub Actions steps"
    ]
  }'
  :right='{
    header: "Web API Pattern",
    icon: "🌐",
    items: [
      { title: "Flask or Express endpoint", detail: "POST /analyze → streaming response" },
      { title: "Webhook-driven", detail: "PR opened → agent fires automatically" },
      "Multi-user, persistent, HTTP-native"
    ],
    code: { language: "python", content: "@app.route(\"/analyze\", methods=[\"POST\"])\ndef analyze():\n    return client.run_agent(prompt=...)" }
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Pattern 3 — Scheduled Automation
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="⏰"
  pillLabel="Integration: Scheduler Pattern"
  title="Fully Autonomous AI on a Cron Schedule"
  :problem='{
    header: "The Problem",
    items: [
      { title: "45 min per failed CI run", detail: "Engineer reads logs, cross-references tests, files issue" },
      "Happens at 2am — no one available",
      "Pattern repeats every broken build"
    ]
  }'
  :solution='{
    header: "The Solution",
    items: ["Cron triggers SDK agent on CI failure", "Agent reads logs, identifies pattern, files issue"],
    code: { language: "python", content: "client.run_agent(\n  prompt=\"Analyze CI failure logs\",\n  allowed_tools=[\"read_file\",\"create_issue\"]\n)" }
  }'
  :outcome='{
    header: "The Outcome",
    items: ["Failure triaged before morning standup", "Zero human intervention required"],
    metrics: [{ value: "45 min", label: "→ automated" }]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Tool Permission Control
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔒"
  pillLabel="Integration: Enterprise Controls"
  title="Production Safety: Permission-First Design"
  :columns='[
    { icon: "🛠️", title: "allowed_tools", description: "Explicit allowlist of tools the agent can invoke — least privilege enforced at the SDK level", items: ["[\"read_file\", \"list_files\"]", "No shell exec unless declared", "Auditable at call site"] },
    { icon: "📂", title: "working_dir Scope", description: "Agent file access restricted to the declared working directory — no escape, no surprise writes" },
    { icon: "🏢", title: "Enterprise Ready", description: "BYOK + permissions + model routing — the security posture InfoSec needs to approve production use" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Integration Patterns Summary
<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="🗺️"
  pillLabel="Integration: Pattern Map"
  title="Three Patterns, One Progression"
  leftLabel="Without SDK"
  rightLabel="With SDK"
  :steps='[
    { left: { label: "Build custom LLM wrapper" },        right: { label: "pip install copilot-sdk" } },
    { left: { label: "Hand-roll tool orchestration" },    right: { label: "CopilotClient() + run_agent()" } },
    { left: { label: "Manage conversation state" },       right: { label: "Choose pattern: CLI / Web / Cron" } },
    { left: { label: "Handle streaming + retries" },      right: { label: "Ship to production this sprint" } }
  ]'
  :outcomeLeft='{ icon: "😓", label: "Weeks of glue code before first value" }'
  :outcomeRight='{ icon: "🚀", label: "Production automation in one sprint" }'
  summaryMetric="Same four automations. One SDK call each."
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Advanced Features
<SectionOpenerSlide
  :partNumber="4"
  title="Advanced Features"
  subtitle="BYOK, streaming, model routing, and MCP — proved through use cases, not listed as feature bullets."
  :cards='[
    { icon: "💰", title: "BYOK + Cost Control", blurb: "Your API key, your model budget, enterprise compliance" },
    { icon: "📡", title: "Streaming + Routing", blurb: "Real-time UX + right model for each task" },
    { icon: "🎯", title: "ROI Sweep", blurb: ">85% release notes, CI analysis automated, zero PR review time" }
  ]'
  :terminal='{ context: "Full ROI metrics across four real automations", detail: "2h→15min · 45min→auto · 30min/PR→zero · 30min logs→auto" }'
/>

---

# BYOK + Model Routing
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="💰"
  pillLabel="Advanced: BYOK & Model Routing"
  title="Cost Governance and the Right Model Per Task"
  :left='{
    header: "BYOK: Bring Your Own Key",
    icon: "🔑",
    items: [
      { title: "Your API key, your invoice", detail: "Cost attribution stays inside your org" },
      { title: "Enterprise compliance", detail: "Data stays on your approved provider" },
      "InfoSec approves, finance tracks, team ships"
    ]
  }'
  :right='{
    header: "Model Routing",
    icon: "🎯",
    items: [
      { title: "Fast model for simple tasks", detail: "File listing, formatting, categorization" },
      { title: "Powerful model for complex tasks", detail: "Architecture review, cross-repo analysis" },
      "Route per call — optimize cost + quality"
    ]
  }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Streaming for Long-Running Agents
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="📡"
  pillLabel="Advanced: Streaming"
  title="Real-Time Output for Long-Running Agents"
  codePosition="left"
  :code='{ language: "python", content: "for chunk in client.run_agent_stream(\n    prompt=\"Analyze all PRs from last sprint\",\n    working_dir=\"/repo\",\n    allowed_tools=[\"read_file\", \"list_prs\"]\n):\n    print(chunk.text, end=\"\", flush=True)" }'
  :features='[
    { icon: "⚡", title: "No timeout cliff", description: "Stream tokens as they arrive — works across analysis jobs that take minutes" },
    { icon: "🖥️", title: "Responsive UX", description: "Users see progress in real time — no frozen UI waiting for a batch result" },
    { icon: "🔄", title: "Same permission model", description: "allowed_tools and working_dir apply identically to streaming calls" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# MCP Integration
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🔌"
  pillLabel="Advanced: MCP Integration"
  title="Connect Any MCP Server to Your Agent"
  :columns='[
    { icon: "🔌", title: "MCP Servers as Tools", description: "Register any MCP server — tools surface inside the SDK execution loop, zero glue code needed" },
    { icon: "🗄️", title: "Example: Database MCP", description: "Agent reads query results, correlates with code, files tickets — all in one run_agent call", items: ["Read DB schema", "Cross-reference commits", "Auto-file issue"] },
    { icon: "🌐", title: "Example: API MCP", description: "Agent calls your REST API via MCP to pull context that would otherwise require custom tool code" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# ROI Sweep — The Full Picture
<BeforeAfterMetricsSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="Advanced: Real-World ROI"
  title="Four Automations, Proven Numbers"
  :before='{
    header: "Manual Status Quo",
    items: [
      { title: "Release engineering", detail: "2 hours per release — read commits, draft, review, publish" },
      { title: "CI test analysis", detail: "45 min per failed run — log reading, pattern matching, ticket filing" },
      { title: "Code review standards", detail: "30 min per PR — enforce style, security, coverage manually" },
      { title: "Incident response", detail: "30+ min log correlation — pull logs, cross-reference, root-cause" }
    ]
  }'
  :after='{
    header: "SDK Automated",
    items: [
      { title: "Release engineering", detail: "~15 minutes — agent reads, drafts, formats, publishes" },
      { title: "CI test analysis", detail: "Automated on every run — pattern detected, issue filed, zero wait" },
      { title: "Code review bot", detail: "Zero manual time — webhook fires agent on PR open" },
      { title: "Incident response", detail: "Automated log correlation — root cause in seconds, not 30 minutes" }
    ]
  }'
  :metrics='[
    { value: ">85%", label: "release time reduction" },
    { value: "45 min", label: "CI analysis → automated" },
    { value: "0 min", label: "PR standards review time" }
  ]'
  :insight='{ icon: "🎯", text: "These numbers come from the same 10-line pattern you saw in Getting Started — just pointed at different workflows." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From AI Infrastructure Work to Shipping Automations"
  :leftItems='["Months building custom LLM orchestration layers", "Hand-rolling tool call loops and retry logic", "Managing conversation state and context windows", "No enterprise controls — approval blocked by InfoSec"]'
  :rightItems='["Production agent runtime imported in one command", "Planning loops, tools, and streaming included", "BYOK + tool permissions + model routing built in", "First automation shipping this sprint"]'
  :metrics='[
    { value: ">85%", detail: "release engineering time reduction" },
    { value: "45 min", detail: "CI failure analysis → fully automated" },
    { value: "Jan 2026", detail: "Technical Preview — install in 15 minutes today" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Install the SDK: pip install copilot-sdk or npm install @github/copilot-sdk", "Run the 10-line hello world against a real repo directory", "Read one CHANGELOG.md with run_agent — see the runtime in action"]'
  :thisWeek='["Pick one repetitive workflow: release notes, CI triage, or PR standards", "Implement the matching pattern: CLI tool, Web API, or cron script", "Demo the automation to your team — 15 minutes prep, instant buy-in"]'
  :thisMonth='["Deploy one automation to production with allowed_tools and working_dir scoped", "Instrument BYOK for cost tracking and get InfoSec sign-off", "Identify two more workflows to automate — the ROI compounds with each one"]'
  footer="The SDK is in Technical Preview since January 2026 — the runtime is production-tested, the API is stable enough to ship against today."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Resources", color: "cyan", items: [
      { href: "https://github.com/github/copilot-sdk", label: "GitHub Copilot SDK Repository", description: "Source code, examples, and issue tracker for the SDK" },
      { href: "https://github.blog/news-insights/company-news/build-an-agent-into-any-app-with-the-github-copilot-sdk/", label: "Build an agent into any app with the Copilot SDK", description: "Official announcement and architectural overview from GitHub Engineering" }
    ] },
    { title: "🛠️ Related Tech Talks", color: "purple", items: [
      { label: "Copilot Primitives", description: "Instructions, prompts, agents, and skills — the customization layer the SDK extends" },
      { label: "MCP Apps", description: "MCP server patterns that pair with SDK&#39;s native MCP integration" },
      { label: "Copilot Memory", description: "Context and memory patterns relevant to long-running SDK automations" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Copilot SDK"
  subtitle="Build AI-Powered Tools for Your Workflows"
  :cards="[
    { value: '>85%', detail: 'release engineering time reduction — 2 hours to ~15 minutes' },
    { value: '10 lines', detail: 'CopilotClient + run_agent — full agentic loop, production runtime' },
    { value: 'Jan 2026', detail: 'Technical Preview — install today, first automation this sprint' }
  ]"
  prompt="Which workflow would your team automate first — release notes, CI triage, or PR standards review?"
/>
