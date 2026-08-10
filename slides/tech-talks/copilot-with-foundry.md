---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot with Microsoft Foundry
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot with Microsoft Foundry
mdc: true
section: Agentic Systems
status: active
updated: 2026-07-24
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
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot with Microsoft Foundry"
  subtitle="Organizational Memory for Coding Agents"
  tagline="Extend GitHub Copilot agents with organizational memory: the 5–10% of engineering work where intent matters most."
  meta="Agentic Systems · CopilotTraining"
/>

---

# Core Question
<CoreQuestionSlide
  question="When does a GitHub Copilot agent need Microsoft Foundry?"
  subtext="GitHub gives agents implementation memory. Foundry gives agents"
  highlight="organizational memory."
  :cards='[
    { icon: "👩‍💻", title: "Principal Engineer", description: "When should my Copilot agent reach for Foundry instead of staying in GitHub?" },
    { icon: "🏗️", title: "Platform Architect", description: "How do I wire organizational knowledge into an agent without rebuilding everything?" },
    { icon: "🧑‍💼", title: "GitHub SE", description: "How do I demo something GitHub Copilot alone genuinely cannot do?" },
    { title: "5–10%", description: "of coding agent work benefits from organizational memory — the rest stays in GitHub" },
    { title: "40%+", description: "relevance improvement with Foundry IQ agentic retrieval vs. traditional RAG" },
    { title: "3 layers", description: "of agent context: implementation, operational, and organizational memory" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Code and Intent", takeaway: "Pair implementation history with the organizational reasons behind it.", whyItMatters: "Agents avoid optimizing away decisions that exist for a reason." },
    { title: "Organizational Memory", takeaway: "Query indexed docs, decisions, and architecture with Foundry IQ.", whyItMatters: "Agents can act with context beyond a single repository." },
    { title: "Durable Decisions", takeaway: "Make reasoning accessible beyond the people who made it.", whyItMatters: "Onboarding and continuity improve as teams change." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🧠", title: "The Two Memories",               subtitle: "implementation vs. organizational",    blurb: "The gap bypassFraudChecks() exposes",         slide: 4  },
    { icon: "🔌", title: "Connecting Foundry IQ",           subtitle: "index, expose via MCP, managed auth",  blurb: "Building the organizational memory layer",    slide: 9  },
    { icon: "🎭", title: "The Organizational Memory Pattern", subtitle: "GitHub MCP + Foundry IQ = one agent",  blurb: "The bypassFraudChecks() question answered",   slide: 13 },
    { icon: "🎯", title: "Recognizing Intent Problems",     subtitle: "the 5–10% sweet spot",                 blurb: "When to add Foundry, when to stay in GitHub", slide: 18 }
  ]'
/>

---

# Part 1 — The Two Memories
<SectionOpenerSlide
  :partNumber="1"
  title="The Two Memories"
  subtitle="What GitHub knows about your code — and the gap only organizational memory fills"
  :cards='[
    { icon: "💻", title: "Implementation Memory", blurb: "Code, PRs, issues — what Copilot is built for" },
    { icon: "🧠", title: "Organizational Memory", blurb: "Architecture decisions, design rationale, intent" },
    { icon: "❓", title: "The Gap",               blurb: "bypassFraudChecks() — traceable, inexplicable" }
  ]'
  :terminal='{ context: "GitHub Copilot answers What? — Foundry IQ answers:", detail: "Why?" }'
/>

---

# The Code GitHub Can&#39;t Explain
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🔍"
  pillLabel="The Two Memories · The Code"
  title="The Code GitHub Can Trace — But Not Explain"
  codePosition="left"
  :code='{ language: "csharp", filename: "CheckoutService.cs", content: "if (customer.IsPremium)\n{\n    bypassFraudChecks();\n}" }'
  :features='[
    { icon: "✅", title: "GitHub: PR #413",       description: "Author Alice Mendez, merged 8 months ago, linked to issue #9021" },
    { icon: "✅", title: "GitHub: commit history", description: "Modified 3 times, last touched by the payments team" },
    { icon: "❓", title: "GitHub: cannot answer", description: "Is this bypass intentional? Is the original reason still valid today?" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Three Layers of Agent Context
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="The Two Memories · 3 Layers"
  title="Three Layers of Agent Context"
  :columns='[
    { icon: "💻", title: "Implementation Context", description: "Code, PRs, issues, tests, CI/CD. GitHub Copilot is optimized for this layer.", items: ["What exists?", "What changed?", "How does it work?"] },
    { icon: "⚙️", title: "Operational Context",    description: "Jira, ServiceNow, monitoring APIs. What is happening right now in the system.", items: ["What&#39;s the status?", "Can I take action?"] },
    { icon: "🧠", title: "Intent Context",          description: "Architecture reviews, ADRs, decision records. Why the organization built what it built.", items: ["Why was it built?", "What was rejected?", "Is the reason still valid?"] }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# GitHub Answers What, Foundry Answers Why
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="↔️"
  pillLabel="The Two Memories · The Split"
  title="GitHub Answers What? — Foundry IQ Answers Why?"
  :left='{
    header: "GitHub answers: What?",
    icon: "💻",
    items: [
      { title: "What does this code do?",  detail: "Code analysis and component understanding" },
      { title: "What changed, and when?",  detail: "Git history, PR timeline, blame" },
      { title: "What issue tracks this?",  detail: "Linked issues and backlogs" },
      "What tests cover it?"
    ]
  }'
  :right='{
    header: "Foundry IQ answers: Why?",
    icon: "🧠",
    items: [
      { title: "Why was this designed this way?",    detail: "Architecture decisions and rationale" },
      { title: "What alternatives were considered?", detail: "Rejected approaches and tradeoffs" },
      { title: "Who approved this exception?",       detail: "Legal, compliance, or business sign-off" },
      "Is the original justification still valid?"
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Context Layer Quick Reference
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="The Two Memories · Quick Reference"
  title="Which Context Layer Do We Need?"
  :cards='[
    { icon: "🔍", title: "What exists?",      description: "Code analysis, component inventory, dependency graphs → GitHub MCP" },
    { icon: "📅", title: "What changed?",     description: "Git history, PR diffs, deployment records → GitHub MCP" },
    { icon: "⚙️", title: "What is happening?", description: "Incidents, open tickets, deployment status → Operational MCPs" },
    { icon: "🧠", title: "Why was it built?", description: "Architecture decisions, rejected alternatives, constraints → Foundry IQ" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Connecting Foundry IQ
<SectionOpenerSlide
  :partNumber="2"
  title="Connecting Foundry IQ"
  subtitle="Provisioning organizational memory as an MCP knowledge tool"
  :cards='[
    { icon: "📚", title: "Index the Knowledge", blurb: "ADRs, incident reviews, architecture decisions" },
    { icon: "🔌", title: "Expose via MCP",      blurb: "Foundry IQ toolbox — same protocol as GitHub MCP" },
    { icon: "🛡️", title: "Managed Identity",   blurb: "No API keys — Entra ID governs access" }
  ]'
  :terminal='{ context: "setup-foundry-iq.py → azd deploy → TOOLBOX_ENDPOINT:", detail: "organizational memory wired" }'
/>

---

# The Setup — azure.yaml and azd
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🚀"
  pillLabel="Connecting Foundry IQ · Setup"
  title="Two Commands to a Running Hosted Agent"
  codePosition="left"
  :code='{ language: "yaml", filename: "azure.yaml", content: "services:\n  agent:\n    host: azure.ai.agent\n    source: ./src\n    env:\n      - key: GITHUB_MCP_ENDPOINT\n        value: ${GITHUB_MCP_ENDPOINT}\n      - key: TOOLBOX_ENDPOINT\n        value: ${TOOLBOX_ENDPOINT}" }'
  :features='[
    { icon: "🔧", title: "azd up",                  description: "Provisions Azure resources, builds the container, wires RBAC — one command" },
    { icon: "🔌", title: "GITHUB_MCP_ENDPOINT",      description: "GitHub MCP server URL injected at deploy time — implementation memory" },
    { icon: "🧠", title: "TOOLBOX_ENDPOINT",          description: "Foundry IQ MCP URL output from setup-foundry-iq.py — organizational memory" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# What to Index
<FourCardGridSlide
  :partNumber="2"
  pillIcon="📚"
  pillLabel="Connecting Foundry IQ · What to Index"
  title="High-Signal Sources for Organizational Memory"
  :cards='[
    { icon: "📋", title: "Architecture Decision Records", description: "Why X was chosen over Y — high signal, low volume. adrs/ folder in the repo." },
    { icon: "🔥", title: "Incident Postmortems",          description: "What failures shaped the current design and the constraints they imposed." },
    { icon: "📝", title: "RFC Documents",                 description: "What alternatives were evaluated and why each was accepted or rejected." },
    { icon: "🏛️", title: "Architecture Review Notes",     description: "Design decisions, approvals, compliance constraints at build time." }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Managed Identity as Trust Boundary
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🛡️"
  pillLabel="Connecting Foundry IQ · Identity"
  title="Managed Identity: Not Auth Plumbing — Governance"
  :left='{
    header: "API Key Authentication",
    icon: "🔑",
    items: [
      { title: "Keys stored in config or env",  detail: "Rotation burden and accidental leak risk" },
      "One leaked key exposes the entire index",
      { title: "No identity per agent",         detail: "All agents share the same credential" },
      "Which agents can query what? Unclear."
    ]
  }'
  :right='{
    header: "Managed Identity (Foundry)",
    icon: "🛡️",
    items: [
      { title: "Agent&#39;s Entra ID governs access", detail: "Provisioned automatically at deploy time" },
      "No credentials in code or config",
      { title: "Per-agent identity",                  detail: "Each agent has its own access boundary" },
      "Which agents earn access? The organization decides."
    ]
  }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — The Organizational Memory Pattern
<SectionOpenerSlide
  :partNumber="3"
  title="The Organizational Memory Pattern"
  subtitle="The bypassFraudChecks() question — answered with organizational memory"
  :cards='[
    { icon: "💻", title: "The Code",   blurb: "GitHub traces the PR, author, linked issue" },
    { icon: "📄", title: "The Why",    blurb: "March 2023 architecture review recovered" },
    { icon: "✅", title: "The Answer", blurb: "Implementation facts plus organizational intent" }
  ]'
  :terminal='{ context: "bypassFraudChecks() → March 2023 Architecture Review →", detail: "intent recovered" }'
/>

---

# The Document That Explains the Code
<HeroStatSlide
  :partNumber="3"
  pillIcon="📄"
  pillLabel="Org Memory Pattern · The Document"
  title="The Architecture Review That Explains bypassFraudChecks()"
  subtitle="This is the document Foundry IQ retrieves — the organizational memory GitHub cannot provide"
  :hero='{ value: "March 2023", label: "Architecture review: the decision document that explains why the code exists", source: "Fraud service was producing 30-second checkout delays for premium customers" }'
  :supporting='[
    { icon: "⚠️", title: "The business problem",  description: "Fraud service latency was causing premium customers to abandon checkout at high rates" },
    { icon: "⚖️", title: "Legal&#39;s decision",   description: "Temporary bypass approved pending completion of the fraud platform migration" },
    { icon: "📅", title: "The constraint",          description: "Decision was scheduled for review after migration completion — Q4 2023 target" },
    { icon: "❓", title: "The open question",        description: "The migration completed Q4 2023. Is this exception still required?" }
  ]'
  :insight='{ icon: "💡", text: "GitHub knew the code. The organization knew the reason. Foundry IQ makes both available to the agent." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Combined Agent
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🎭"
  pillLabel="Org Memory Pattern · The Agent"
  title="Two Memory Sources, One Agent"
  codePosition="left"
  :code='{ language: "python", filename: "combined-context-agent.py", content: "agent = client.agents.create(\n  instructions=INSTRUCTIONS,\n  tools=[\n    McpTool(\n      name=GITHUB,\n      server_url=GITHUB_MCP_ENDPOINT\n    ),\n    McpTool(\n      name=ORG_MEMORY,\n      server_url=TOOLBOX_ENDPOINT\n    )\n  ]\n)" }'
  :features='[
    { icon: "💻", title: "github tool",      description: "Implementation memory — call first for code-level questions about what and how" },
    { icon: "🧠", title: "org_memory tool",  description: "Organizational memory — call when WHY questions surface that GitHub context cannot answer" },
    { icon: "📋", title: "INSTRUCTIONS",     description: "Use github first. Reach for org_memory when intent questions arise. Surface stale justifications." }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Reasoning Loop
<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Org Memory Pattern · Reasoning Loop"
  title="The Same Query — Two Different Memory Layers"
  subtitle="Why does bypassFraudChecks() exist? Is it still valid?"
  leftLabel="GitHub Copilot Only"
  rightLabel="GitHub Copilot + Foundry IQ"
  :steps='[
    { left: { label: "Query received",       note: "Why does bypassFraudChecks() exist?" },        right: { label: "Query received",       note: "Why does bypassFraudChecks() exist?" } },
    { left: { label: "GitHub MCP called",    note: "PR #413, Alice Mendez, issue #9021" },         right: { label: "GitHub MCP called",    note: "PR #413, Alice Mendez, issue #9021" } },
    { left: { label: "Context complete",     note: "Only implementation facts available" },        right: { label: "Context incomplete",   note: "WHY question recognized — calls Foundry IQ" } },
    { left: { label: "Response returned",    note: "PR trace only — cannot explain the bypass" }, right: { label: "Review retrieved",      note: "Fraud latency, legal approval, migration status" } }
  ]'
  :outcomeLeft='{ icon: "❌", label: "PR #413. Alice Mendez. Cannot explain why the bypass exists." }'
  :outcomeRight='{ icon: "✅", label: "Approved March 2023. Migration completed Q4 2023. Review required." }'
  summaryMetric="Same code. Same query. Fundamentally different answer."
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Problem, Solution, Outcome
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="🎯"
  pillLabel="Org Memory Pattern · Impact"
  title="From Architecture Archaeology to Answered Questions"
  :problem='{
    header: "The Problem",
    items: [
      "bypassFraudChecks() exists in production",
      { title: "No one knows why",            detail: "The engineer who wrote it has left the team" },
      "Any refactor could cause a compliance or business incident"
    ]
  }'
  :solution='{
    header: "The Solution",
    items: [
      "Combined agent: GitHub MCP + Foundry IQ MCP",
      { title: "March 2023 architecture review retrieved", detail: "Fraud latency, legal approval, migration target" }
    ]
  }'
  :outcome='{
    header: "The Outcome",
    items: [
      "Intent recovered in seconds — not days",
      { title: "Validation issue created automatically", detail: "Agent proposes: migration completed, is exception still required?" }
    ],
    metrics: [{ value: "seconds", label: "vs. days of manual archaeology" }]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Recognizing Intent Problems
<SectionOpenerSlide
  :partNumber="4"
  title="Recognizing Intent Problems"
  subtitle="The 5–10% of agent work where GitHub alone is not enough"
  :cards='[
    { icon: "🔍", title: "Signal Words",    blurb: "Nobody remembers, afraid to touch this" },
    { icon: "📊", title: "The 5–10% Rule", blurb: "Most agent work stays in GitHub" },
    { icon: "🔬", title: "The Filter",      blurb: "If org memory isn&#39;t indexed, it won&#39;t help" }
  ]'
  :terminal='{ context: "Signal: nobody remembers →", detail: "organizational memory 5–10% threshold" }'
/>

---

# How to Recognize an Intent Problem
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔍"
  pillLabel="Intent Problems · Signals"
  title="How to Recognize an Intent Problem"
  :cards='[
    { icon: "👻", title: "Nobody Remembers",           description: "Lost implementation rationale — nobody on the current team knows why it was built this way" },
    { icon: "🏚️", title: "The Architect Retired",      description: "Key institutional context left with a specific person and was never documented" },
    { icon: "😰", title: "Afraid to Touch This",       description: "Unknown constraints producing unknown risk — dangerous legacy code with no paper trail" },
    { icon: "🔍", title: "Migration Keeps Surprising", description: "Historical constraints blocking migration progress that only surface when changes are attempted" }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# When to Add Foundry vs. Stay in GitHub
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="⚖️"
  pillLabel="Intent Problems · The Decision"
  title="The 5–10% Rule: When to Add Foundry IQ"
  :left='{
    header: "Add Foundry IQ when:",
    icon: "✅",
    items: [
      { title: "Intent questions appear",          detail: "Why was this designed this way?" },
      { title: "Engineering archaeology risk",     detail: "Changing code without understanding why" },
      { title: "High-value org memory exists",     detail: "ADRs, RFCs, compliance decisions documented" },
      "Team onboarding at scale on complex systems"
    ]
  }'
  :right='{
    header: "Stay in GitHub when:",
    icon: "🎯",
    items: [
      { title: "Code generation and review", detail: "90–95% of coding agent work" },
      { title: "Refactoring and testing",    detail: "Implementation-level decisions only" },
      { title: "No org memory exists",       detail: "Indexing noise adds cost without value" },
      "Early-stage teams with no decision history"
    ]
  }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before / After
<BeforeAfterSlide
  header="GitHub Copilot Alone vs. GitHub Copilot + Foundry IQ"
  :leftItems='[
    "Traces bypassFraudChecks() to PR #413",
    "Identifies author Alice Mendez and commit date",
    "Links to issue #9021 in the checkout backlog",
    "Cannot explain why the bypass exists"
  ]'
  :rightItems='[
    "All GitHub implementation context, plus",
    "March 2023 architecture review retrieved from Foundry IQ",
    "Fraud service latency: legal-approved temporary bypass pending migration",
    "Agent evaluates currency and proposes a validation issue"
  ]'
  :metrics='[
    { value: "40%+",    detail: "relevance improvement with Foundry IQ agentic retrieval vs. traditional RAG" },
    { value: "5–10%",   detail: "of coding agent work where organizational memory changes the answer" },
    { value: "seconds", detail: "to recover context that would otherwise require days of architecture archaeology" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Read both quickstarts: Deploy your first hosted agent + Add Foundry IQ to a hosted agent",
    "Map your current agent stack against the 3-layer model: implementation, operational, intent",
    "Identify one signal phrase from the talk that matches a real situation in your codebase"
  ]'
  :thisWeek='[
    "Install azd and the Foundry extension: azd ext install microsoft.foundry",
    "Run azd ai agent init against the basic hosted-agent sample and deploy a working agent",
    "Identify one knowledge source — ADRs or architecture notes — for a Foundry IQ index"
  ]'
  :thisMonth='[
    "Run setup-foundry-iq.py against a real document collection — even 10-20 ADRs",
    "Wire combined-context-agent.py with GitHub MCP and the Foundry IQ toolbox endpoint",
    "Test with a real intent question from your codebase — did the agent recover the why?"
  ]'
  footer="Start with the recipe: 90-95% of agent work stays in GitHub. Add Foundry when why? questions appear."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent",         label: "Quickstart: Deploy your first hosted agent — Microsoft Foundry", description: "azd-based deployment with Entra ID and RBAC" },
      { href: "https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent", label: "Quickstart: Add a Foundry IQ knowledge base to a hosted agent",  description: "Knowledge base provisioning and MCP toolbox wiring" },
      { href: "https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/foundry-iq-connect",                  label: "Connect agents to Foundry IQ knowledge bases",                   description: "Connecting knowledge bases as agent tools with managed identity" }
    ]},
    { title: "🛠️ Further Reading", color: "purple", items: [
      { href: "https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents", label: "Microsoft Foundry Agent Samples",            description: "Reference implementations including the Foundry IQ toolbox example (sample 17)" },
      { href: "https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/",             label: "Work IQ overview — Microsoft Copilot Studio", description: "Organizational memory as a service: the M365 intelligence layer" },
      { label: "Agentic SDLC — CopilotTraining Tech Talk", description: "Broader context: the full software delivery lifecycle through an agentic lens" }
    ]}
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Copilot with Microsoft Foundry"
  subtitle="Organizational Memory for Coding Agents"
  :cards="[
    { value: 'GitHub answers: What?',  detail: 'bypassFraudChecks() — PR #413, Alice Mendez, issue #9021' },
    { value: 'Foundry IQ answers: Why?', detail: 'March 2023 review: fraud latency, legal approval, migration status' },
    { value: '5–10% of agent work',   detail: 'Recognize the signals: nobody remembers, afraid to touch this, surprises keep appearing' }
  ]"
  prompt="Ask your Copilot agent: why does this code exist?"
/>


