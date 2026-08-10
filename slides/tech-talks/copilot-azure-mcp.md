---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot + Azure Skills Plugin
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot + Azure Skills Plugin
mdc: true
section: Agentic Systems
status: active
updated: 2026-04-27
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
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Copilot + Azure Skills Plugin"
  subtitle="Conversational Azure Prototyping and Deployment"
  tagline="From 45 minutes of portal clicks to 8 minutes of live-context conversation"
  meta="Tech Talk · 45 min · Azure Developers · DevOps Engineers · Cloud Architects"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do I prototype and deploy Azure solutions conversationally?"
  subtext="Azure developers spend 45+ minutes per cycle switching between portal, docs, and CLI"
  highlight="What if the AI already knew your subscription?"
  :cards='[
    { icon: "🧑‍💻", title: "Azure Developer", description: "Tab-switching between terminal, portal, and docs to understand current Azure state" },
    { icon: "⚙️", title: "DevOps Engineer", description: "Scaffolding staging configs from production resources without copy-paste guesswork" },
    { icon: "🏗️", title: "Cloud Architect", description: "Evaluating whether AI infrastructure tooling is a durable pattern — not a demo trick" },
    { title: "45 min → 8 min", description: "Prototype-to-deploy cycle with live Azure context vs. portal tab-switching" },
    { title: "200+ live Azure tools", description: "Direct SDK calls across 40+ services — resource queries, config reads, deployments" },
    { title: "21 workflow skills", description: "Curated deployment logic — azure-prepare, azure-validate, azure-deploy, and more" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Live Azure Context", takeaway: "Query and reason over current Azure resources conversationally.", whyItMatters: "Live state replaces portal hopping and stale assumptions." },
    { title: "Faster Prototype Loops", takeaway: "Plan, validate, and deploy infrastructure in one conversation.", whyItMatters: "Shorter iteration makes infrastructure experiments practical." },
    { title: "Guardrailed Deployment", takeaway: "Combine skills, MCP tools, and validation for safe execution.", whyItMatters: "Conversational infrastructure remains grounded in proven workflows." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "💬", title: "Live Azure Context", subtitle: "Terminal as Azure interface", blurb: "Query live subscription state from any conversation", slide: 4 },
    { icon: "🔄", title: "The Prototype Loop", subtitle: "Plan → Generate → Deploy", blurb: "45-minute portal workflow compressed to 8 minutes", slide: 8 },
    { icon: "🧠", title: "Azure Skills Plugin", subtitle: "Three-layer stack explained", blurb: "Why the loop works — Skills, MCP, and Foundry", slide: 13 },
    { icon: "🔒", title: "Guardrails", subtitle: "Trust boundaries for teams", blurb: "Read-only by default, opt-in for writes", slide: 18 }
  ]'
/>

---

# Part 1 — Live Azure Context
<SectionOpenerSlide
  :partNumber="1"
  title="Live Azure Context in the Terminal"
  subtitle="Terminal replaces the portal — live subscription state in every conversation"
  :cards='[
    { icon: "💬", title: "Ask, Don&#39;t Click", description: "Query storage accounts, Cosmos DB, App Services directly — no portal tab-switching" },
    { icon: "📋", title: "Structured Live Output", description: "AI returns real resource configs sourced from live Azure APIs, not docs examples" },
    { icon: "🔗", title: "Session Context Persists", description: "Discovered resources and config patterns stay in memory for follow-up questions" }
  ]'
  :terminal='{ context: "copilot > List all storage accounts in my subscription", detail: "4 results — live, structured, in 3 seconds" }'
/>

---

# Portal vs Terminal
<BeforeAfterPanelsSlide
  :partNumber="1"
  pillIcon="🔄"
  pillLabel="Live Context: The Shift"
  title="From Tab-Switching to Terminal Conversation"
  :before='{ header: "Portal-First Discovery", items: [
    "Open Azure Portal, navigate to the resource group",
    "Click through resources to find what you need",
    { title: "Copy values manually", detail: "SKUs, endpoints, networking rules to a text editor" },
    "Switch back to terminal — context lost between tools"
  ] }'
  :after='{ header: "Terminal-First Conversation", items: [
    "Ask: &#39;List storage accounts with SKUs and networking rules&#39;",
    "AI returns live structured output in seconds",
    { title: "Follow-up without re-querying", detail: "Context stays in session for subsequent questions" },
    "Scaffold new configs from live templates — same conversation"
  ] }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Live Discovery Demo
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="💬"
  pillLabel="Live Context: Discovery Demo"
  title="Live Resource Discovery in Action"
  subtitle="Three queries, live Azure state, zero portal visits"
  :transcript='[
    { type: "prompt", text: "copilot" },
    { type: "user", text: "List all storage accounts in my subscription with their locations and SKUs" },
    { type: "thinking", label: "🤔 Copilot (Azure MCP):" },
    { type: "response", lines: [
      "Found 4 storage accounts:",
      "  proddata001 (East US) — Standard_GRS · public access disabled",
      "  stagingdata001 (West US 2) — Standard_LRS · public blob enabled",
      "  devlogs (East US 2) — Standard_LRS · public access disabled"
    ] },
    { type: "user", text: "Create a staging config like proddata001 but with LRS and staging-vnet" },
    { type: "thinking" },
    { type: "response", lines: [
      "Based on proddata001 network config:",
      "  SKU: Standard_LRS  (downgraded — staging doesn&#39;t need geo-redundancy)",
      "  VNet: staging-vnet/app-subnet  (mapped from prod-vnet/app-subnet)",
      "  TLS: 1.2 min · public access: disabled · firewall rules: retained"
    ] },
    { type: "outcome", text: "Live template extracted — Bicep ready with one more prompt" }
  ]'
  footerMetric="0 portal visits · live config in under 60 seconds"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Workflow Vocabulary
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="Live Context: Workflow Map"
  title="Three Skills Power Every Deployment"
  :columns='[
    { icon: "⚙️", title: "azure-prepare", description: "Project analysis, infra code gen, Dockerfile scaffolding — gets your project Azure-ready", items: ["Analyzes project structure", "Generates azd-compatible infra", "Creates Dockerfiles if needed"] },
    { icon: "✅", title: "azure-validate", description: "Pre-deployment checks before touching anything — quotas, VNets, naming conflicts", items: ["Subscription quota checks", "VNet availability", "Naming conflict detection"] },
    { icon: "🚀", title: "azure-deploy", description: "Ordered deployment pipeline with rollback handling and context-aware error remediation", items: ["Correct execution order", "Rollback on failure", "Error context surfaced"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — The Prototype Loop
<SectionOpenerSlide
  :partNumber="2"
  title="The Prototype Loop"
  subtitle="45-minute portal workflow → 8-minute conversational deployment with live context"
  :cards='[
    { icon: "⚖️", title: "Three Environments", description: "See exactly what the Skills layer adds over raw MCP — correct sequence, not just calls" },
    { icon: "🗣️", title: "Plan Mode Validation", description: "Shift+Tab — AI asks clarifying questions against live resources before generating code" },
    { icon: "📄", title: "Bicep From Live Templates", description: "Infrastructure code from actual running resources — production-validated, not generic" }
  ]'
  :terminal='{ context: "copilot [plan] > Deploy a payments API like orders API with its own database", detail: "45 min → 8 min · zero portal visits" }'
/>

---

# Three Environments Comparison
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="⚖️"
  pillLabel="Prototype Loop: Why Skills?"
  title="Same Intent. Three Environments."
  :columns='[
    { icon: "🔧", title: "No Skills (raw az)", description: "Generic cloud advice, no Azure context, manual CLI commands — you fill all the gaps", items: ["You write every az command", "No subscription awareness", "No workflow sequencing", "45 min average cycle"] },
    { icon: "🔌", title: "Azure MCP Only", description: "Live Azure data, correct tool calls — but no sequencing, no validation gates, no RBAC scope", items: ["Queries live state ✓", "Ad hoc tool calls", "Wrong sequence risk", "~15 min cycle"] },
    { icon: "🚀", title: "Skills + MCP", description: "Correct calls in the correct sequence, validated pre-deployment, RBAC-aware from the start", items: ["prepare → validate → deploy ✓", "Live state + workflow logic ✓", "RBAC validated upfront ✓", "8 min cycle ✓"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Traditional vs Plan Mode
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="🔄"
  pillLabel="Prototype Loop: Plan Mode"
  title="Traditional Workflow vs. Plan Mode"
  subtitle="From trial-and-error to collaborative strategy before a line of code"
  leftLabel="Traditional Workflow"
  rightLabel="With Plan Mode + Azure MCP"
  :steps='[
    { left: { label: "Describe what you want", note: "Portal tab to check current state" }, right: { label: "Describe what you want", note: "Shift+Tab to enter Plan Mode" } },
    { left: { label: "AI generates infrastructure", note: "Assumes intent, one interpretation" }, right: { label: "AI asks clarifying questions", note: "Region? Shared plan? Database type? VNet?" } },
    { left: { label: "Deploy and discover mismatches", note: "Wrong SKU, missing firewall rule, quota hit" }, right: { label: "AI validates against live resources", note: "✅ VNet exists · ✅ quota available · ⚠️ firewall gap found" } },
    { left: { label: "Fix and redeploy", note: "Average 3-4 iterations before success" }, right: { label: "Approve plan → generate Bicep", note: "1-2 iterations · mismatches caught pre-deployment" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "3-4 deploy attempts — 45 min average cycle" }'
  :outcomeRight='{ icon: "✓", label: "1-2 attempts — 8 min with live validation" }'
  summaryMetric="45 min → 8 min · misconfigurations caught in conversation, not post-deployment"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Plan Mode in Action
<AITerminalTranscriptSlide
  :partNumber="2"
  pillIcon="🗣️"
  pillLabel="Prototype Loop: Plan Mode Demo"
  title="Plan Mode in Action: Payments API Deployment"
  subtitle="AI validates against live subscription state before a single line of infrastructure code"
  :transcript='[
    { type: "prompt", text: "copilot [plan mode]" },
    { type: "user", text: "Deploy a new App Service for payments API — like orders API, own database" },
    { type: "thinking", label: "🤔 Copilot (azure-prepare):" },
    { type: "response", lines: [
      "A few questions to validate the approach:",
      "  1. Region — orders API is East US. Co-locate or separate region?",
      "  2. App Service Plan — share prod-asp-001 or dedicated for isolation?",
      "  3. Database — new Azure SQL, Cosmos DB, or existing connection?"
    ] },
    { type: "user", text: "East US, dedicated plan, new Azure SQL with VNet firewall rules" },
    { type: "divider" },
    { type: "thinking", label: "🔍 Copilot (azure-validate — live subscription check):" },
    { type: "response", lines: [
      "✅ East US S2 capacity available",
      "✅ prod-vnet/payments-subnet exists (10.0.3.0/24, currently empty)",
      "✅ Azure SQL quota: 8 of 20 databases used",
      "⚠️ payments-subnet not in SQL firewall — will add automatically"
    ] },
    { type: "outcome", text: "Plan approved → Bicep generated — payments-infrastructure.bicep" }
  ]'
  footerMetric="Subnet firewall gap caught pre-deployment · estimated cost ~$150/month surfaced"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The 8-Minute Number
<HeroStatSlide
  :partNumber="2"
  pillIcon="⏱️"
  pillLabel="Prototype Loop: Impact"
  title="The Number That Travels to Management"
  subtitle="Infrastructure-as-conversation — validated before deployment"
  :hero='{ value: "8 min", label: "prototype-to-deploy cycle with live Azure context", source: "vs. 45-minute average with portal discovery + 3-4 failed deploys" }'
  :supporting='[
    { icon: "✅", title: "1-2 iterations instead of 3-4", description: "Misconfigurations caught in conversation before touching Azure" },
    { icon: "📋", title: "Bicep from live templates", description: "Production-validated configs — not documentation examples with wrong SKUs" },
    { icon: "💰", title: "Cost estimate in the plan", description: "AI surfaces ~$150/month before you approve — no billing surprises" },
    { icon: "🔒", title: "RBAC gap caught pre-deploy", description: "azure-validate found the missing firewall rule before the deploy failed" }
  ]'
  :insight='{ icon: "💡", text: "The loop works because the AI knows what&#39;s running — not what the docs say should be running." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Azure Skills Plugin
<SectionOpenerSlide
  :partNumber="3"
  title="Azure Skills Plugin: The Brain Layer"
  subtitle="21 curated skills + 200+ live tools: the three-layer stack that made the loop work"
  :cards='[
    { icon: "🧠", title: "Skills as Workflow Brain", description: "21 Markdown skills encode Azure decision logic — the sequencing the MCP layer can&#39;t do alone" },
    { icon: "🤲", title: "MCP as Execution Hands", description: "200+ live Azure SDK calls across 40+ services — queries, config reads, deployments" },
    { icon: "🤖", title: "Foundry as AI Specialist", description: "Azure AI Foundry model deployment, endpoint management, agent orchestration" }
  ]'
  :terminal='{ context: "Plugin installed in .github/plugins/azure-skills/", detail: "21 skills · 200+ tools · 3 layers · 1 install" }'
/>

---

# Three-Layer Architecture
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="🏗️"
  pillLabel="Skills Plugin: Architecture"
  title="Why the Prototype Loop Worked"
  subtitle="Three layers — Skills knew the sequence, MCP had the reach, Foundry handles AI"
  :rows='[
    { label: "Brain", description: "Azure Skills (21 curated) — workflow logic, decision trees, guardrails", tag: "azure-prepare · azure-validate · azure-deploy" },
    { label: "Hands", description: "Azure MCP Server (200+ tools, 40+ services) — live SDK calls to Azure", tag: "Resource queries · Config reads · Deployments" },
    { label: "AI Specialist", description: "Foundry MCP Server — AI model deployment and agent orchestration", tag: "AI models · Endpoints · Agent workflows" }
  ]'
  footnote="Skills encode the &#39;when&#39; and &#39;why&#39; — MCP provides the &#39;how&#39; — Foundry handles the &#39;AI&#39;"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# 21 Skills by Lifecycle Phase
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🗂️"
  pillLabel="Skills Plugin: Skill Catalog"
  title="21 Skills Covering the Full Azure Lifecycle"
  :columns='[
    { icon: "🚀", title: "Build + Deploy", description: "Core deployment pipeline skills that activate in sequence for any Azure workload", items: ["azure-prepare — project analysis + infra gen", "azure-validate — pre-deploy checks", "azure-deploy — ordered pipeline + rollback"] },
    { icon: "🔍", title: "Operate + Troubleshoot", description: "Live telemetry and operational skills for diagnosing running workloads", items: ["azure-diagnostics — AppInsights + logs", "azure-observability — alerting + dashboards", "azure-kusto — KQL query construction"] },
    { icon: "⚡", title: "Optimize + Govern", description: "Cost, security, identity, and AI governance skills for production readiness", items: ["azure-cost-optimization — right-sizing", "azure-rbac — RBAC + service principals", "azure-ai · azure-aigateway · microsoft-foundry"] }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Plugin Installation
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📦"
  pillLabel="Skills Plugin: Setup"
  title="Install Once, Available Everywhere — ~10 Minutes"
  codePosition="left"
  :code='{ language: "bash", filename: "Install the Azure Skills Plugin", content: "# Copilot CLI\n/plugin marketplace add microsoft/azure-skills\n/plugin install azure@azure-skills\n\n# VS Code\n# Install \"Azure MCP\" extension from Marketplace\n# Skills Plugin is bundled and auto-configured\n\n# Claude Code\n/plugin marketplace add microsoft/azure-skills\n/plugin install azure@azure-skills" }'
  :features='[
    { icon: "🌐", title: "Host-agnostic", description: "Same skills work in Copilot CLI, VS Code, and Claude Code — install once, deploy everywhere" },
    { icon: "📁", title: "Installs to .github/", description: "Skills land in .github/plugins/azure-skills/ — version-controlled, team-shareable" },
    { icon: "🔌", title: "Bundles all three layers", description: "One install brings Azure Skills, Azure MCP Server, and Foundry MCP — no separate wiring" },
    { icon: "🔧", title: "Extensible", description: "Add org-specific skills alongside the 21 curated ones for internal conventions and governance" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The azure-rbac Bridge
<BeforeAfterPanelsSlide
  :partNumber="3"
  pillIcon="🔑"
  pillLabel="Skills Plugin: Governance Bridge"
  title="The Skills Layer Is Also Your First Line of Access Governance"
  :before='{ header: "MCP Only — No Governance Layer", items: [
    "AI executes tool calls with your full authenticated permissions",
    "No workflow awareness — tool calls can happen in any order",
    { title: "No RBAC pre-validation", detail: "Permission errors surface post-execution, not pre-deployment" },
    "Trust depends entirely on the human reviewing outputs"
  ] }'
  :after='{ header: "Skills + MCP — azure-rbac Activated", items: [
    "azure-rbac skill validates role assignments before deployment steps",
    "Principle of least privilege enforced as part of the workflow sequence",
    { title: "Service principal guidance built in", detail: "Skill recommends scoped SP over personal account for team workflows" },
    "Trust is architecturally enforced — not a human memory exercise"
  ] }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Guardrails
<SectionOpenerSlide
  :partNumber="4"
  title="Guardrails and Trust Boundaries"
  subtitle="Read-only by default, opt-in for writes — enterprise-safe from day one"
  :cards='[
    { icon: "🔐", title: "RBAC Inheritance", description: "MCP executes with your auth — no elevation, subscription boundaries automatically respected" },
    { icon: "👁️", title: "Read-Only First", description: "Scoped service principal with Reader role — explore safely before granting write access" },
    { icon: "📝", title: "Production Discipline", description: "AI-validated configs still require review — treat Copilot as a skilled junior engineer" }
  ]'
  :terminal='{ context: "az ad sp create-for-rbac --role Reader --scopes /subscriptions/...", detail: "Read-only by default · opt-in write access per service" }'
/>

---

# Reader vs Contributor — When to Use Each
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="⚖️"
  pillLabel="Guardrails: Permission Model"
  title="The Safe On-Ramp: Start Read-Only"
  :left='{ header: "Reader Role — Start Here", icon: "👁️", items: [
    { title: "Safe for production subscriptions", detail: "Query any resource, read any config — zero modification risk" },
    { title: "Ideal for team onboarding", detail: "Entire team explores safely before governance decisions" },
    { title: "Enable for: discovery, templating, config extraction", detail: "All the wow-moments work with Reader" },
    "Fails loudly on write attempts — accidental modification impossible"
  ] }'
  :right='{ header: "Contributor Role — Earn It", icon: "✏️", items: [
    { title: "Use only in dedicated dev/staging subscriptions", detail: "Isolated from production — failures are contained" },
    { title: "Require PR review before execution", detail: "AI-generated Bicep goes through standard approval" },
    { title: "Establish conventions first", detail: "Custom instructions guide AI toward compliant resource patterns" },
    "Never use personal Owner account — create a scoped service principal"
  ] }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The Trust Escalation Path
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🛤️"
  pillLabel="Guardrails: Trust Escalation"
  title="Explore → Prototype → Ship"
  :columns='[
    { icon: "🔍", title: "Explore", description: "Reader SP on any subscription — discover resources, extract configs, scaffold templates safely", items: ["List resources + configs", "Extract live templates", "Generate Bicep for review", "No modification possible"] },
    { icon: "🔧", title: "Prototype", description: "Contributor SP on isolated dev subscription — build, deploy, iterate with AI in a safe sandbox", items: ["Dedicated dev subscription", "AI-generated configs reviewed", "Peer review before execution", "Production isolated"] },
    { icon: "🚀", title: "Ship", description: "Approved patterns promoted to production — AI assists, humans approve, audit trail maintained", items: ["Conventions established", "RBAC scoped per service", "PR-gated deployments", "Read-only by default"] }
  ]'
  :insight='{ icon: "💡", text: "CTO talking point: Read-only service principal by default — write access is opt-in per service." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  title="The Infrastructure Workflow Transformation"
  :leftItems='[
    "Open Azure Portal, navigate resource groups, find the resource",
    "Manually copy configuration values into a text editor or clipboard",
    "Search documentation for valid parameter ranges and SKU options",
    "Deploy, discover configuration mismatches, troubleshoot, redeploy"
  ]'
  :rightItems='[
    "Ask Copilot: &#39;What App Services are running and what are their configs?&#39;",
    "AI returns live structured output with networking, settings, and SKUs",
    "Scaffold similar resource — AI uses live template, not generic docs example",
    "Plan Mode validates against subscription limits before deployment"
  ]'
  :metrics='[
    { value: "45 min → 8 min", detail: "Prototype-to-deploy cycle" },
    { value: "200+", detail: "Live Azure tools" },
    { value: "21", detail: "Workflow skills" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Install Azure MCP Server (npm, pip, or Docker — ~10 minutes)",
    "Run your first live query: &#39;List all storage accounts in my subscription&#39;",
    "Try Plan Mode on a real deployment task with Shift+Tab"
  ]'
  :thisWeek='[
    "Configure a read-only service principal for team-safe exploration",
    "Scaffold a staging environment config from a production resource",
    "Install the Azure Skills Plugin and run the prototype loop demo"
  ]'
  :thisMonth='[
    "Evaluate org-wide rollout with RBAC-scoped service principals per team",
    "Build custom org-specific skills for your team&#39;s Azure workflow patterns",
    "Compare old portal workflow vs Skills+MCP on a real infrastructure task"
  ]'
  footer="Start with Reader role — the wow-moments all work before you grant write access."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started", label: "Get started with the Azure MCP Server", description: "Installation, authentication, and first queries" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices", label: "Best practices for GitHub Copilot CLI", description: "Permissions, custom instructions, MCP integration" }
    ] },
    { title: "🔌 Azure Skills Plugin", color: "indigo", items: [
      { href: "https://devblogs.microsoft.com/all-things-azure/announcing-the-azure-skills-plugin/", label: "Announcing the Azure Skills Plugin", description: "21 curated skills, three-layer stack announcement" },
      { href: "https://github.com/microsoft/azure-skills", label: "Azure Skills GitHub Repository", description: "Source, examples, and community contributions" }
    ] },
    { title: "🛠️ Tools and Source", color: "blue", items: [
      { href: "https://github.com/Azure/azure-mcp", label: "Azure MCP Server GitHub Repository", description: "200+ tools across 40+ Azure services" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Infrastructure Becomes Conversational"
  subtitle="GitHub Copilot + Azure Skills Plugin"
  :cards='[
    { value: "45 min → 8 min", detail: "Prototype-to-deploy cycle with live Azure context replacing portal tab-switching" },
    { value: "21 Skills", detail: "Azure workflow logic encoded as Markdown — not generic prompts, governed deployment sequences" },
    { value: "Read-Only First", detail: "Opt-in write access per service — enterprise-safe on-ramp before granting production access" }
  ]'
  prompt="How much of your Azure workflow still lives in the portal?"
/>
