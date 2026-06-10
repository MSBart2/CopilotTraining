---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot ACP
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot ACP
mdc: true
section: "Agentic Systems"
status: active
updated: 2026-06-10
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
</script>

<!-- SLIDE: Title -->

<TitleSlide
  title="GitHub Copilot ACP"
  subtitle="Your Tool Just Got an AI Agent"
  tagline="One flag. Any editor. Full agent capabilities."
  meta="45 min • Developers • Platform Engineers • Tool Builders"
/>

---

<!-- SLIDE: Your Question -->

<CoreQuestionSlide
  question="I build tools outside VS Code — how do I give them Copilot&#39;s full agent capabilities?"
  subtext="Every role needs something different: real integration speed, enterprise trust, or multi-agent coordination."
  highlight="ACP gives each of you exactly what you need."
  :cards="[
    { icon: '👨‍💻', title: 'Zed Developer', description: 'Connect without months of custom work' },
    { icon: '🔧', title: 'Platform Engineer', description: 'Ship safely with policy-enforced permissions' },
    { icon: '🤖', title: 'Orchestrator', description: 'Coordinate agents across repositories' },
    { icon: '⚡', title: '2 weeks', description: 'vs 3 months to ship before ACP' },
    { icon: '📝', title: '14 lines', description: 'of TypeScript to connect' },
    { icon: '🔒', title: '3 lines', description: 'of policy to secure automation' }
  ]"
/>

---

<!-- SLIDE: The Journey -->

<TocSlide
  :sections='[
    { icon: "👨‍💻", title: "Zed Developer", subtitle: "From locked-in to full agent", blurb: "Connect without months of custom work", slide: 4 },
    { icon: "🔧", title: "Platform Engineer", subtitle: "Three permission strategies", blurb: "Ship safely with policy-enforced permissions", slide: 7 },
    { icon: "🤖", title: "Multi-Agent Orchestrator", subtitle: "One protocol, many agents", blurb: "Coordinate agents across repositories", slide: 10 },
    { icon: "✅", title: "Ship Safely", subtitle: "When and how to use ACP", blurb: "Decision framework for adoption", slide: 17 }
  ]'
/>

---

<!-- SLIDE: Zed Developer -->

<SectionOpenerSlide
  :partNumber="1"
  section="Part 1"
  title="Zed Developer"
  subtitle="From locked out to full agent experience in 14 lines of code"
  :cards="[
    { icon: '🚀', title: 'One Command', blurb: 'copilot --acp --stdio' },
    { icon: '⚡', title: 'Streaming Responses', blurb: 'Real-time agent output' },
    { icon: '📦', title: 'Any Editor', blurb: 'Standard protocol for all' }
  ]"
  :terminal='{ context: "Connect any editor to Copilot", detail: "2 weeks instead of 3 months" }'
/>

<!-- Phase B: high — 1–2 body slides showing code example and result -->

---

<!-- SLIDE: The 14-Line Integration -->

<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🚀"
  pillLabel="Section 1 · Integration"
  title="From Command to Live Agent Workflow"
  codePosition="left"
  :code='{ language: "json", filename: "acp-protocol", content: "→ {method: initialize, params: {...}}\n← {result: initialized}\n\n→ {method: prompt, text: Refactor fetch}\n← {event: thinking, text: Analyzing...}\n← {event: tool, tool: read_files, path: *.ts}\n← {event: thinking, text: Found 3 fetches}\n← {event: text, delta: function getUsers() {\n  return Promise.all([\n    fetch(/api/users),\n    fetch(/api/posts)\n  ])\n}}" }'
  :features="[
    { icon: '💭', title: 'Streaming protocol', description: 'Real JSON-RPC messages: → client, ← server' },
    { icon: '🔧', title: 'Visible agent internals', description: 'See thinking, tool calls, and code as it streams' },
    { icon: '📡', title: 'Language-agnostic', description: 'Any editor can implement this protocol' }
  ]"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Before & After: What Zed Gets -->

<BeforeAfterMetricsSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Section 1 · Impact"
  title="From Locked-In to Free"
  :before='{
    header: "Before ACP",
    items: [
      "Stuck waiting for IDE team",
      { title: "3+ months", detail: "Build custom agent API" },
      "Limited to existing features"
    ]
  }'
  :after='{
    header: "After ACP",
    items: [
      { title: "Connect in 2 weeks", detail: "Standard protocol, any tool" },
      "Full agent reasoning available",
      { title: "Your control", detail: "No waiting for platform updates" }
    ]
  }'
  :metrics="[
    { value: '90%', label: 'less integration code' },
    { value: '2-3 weeks', label: 'time to market' },
    { value: '∞', label: 'use cases' }
  ]"
  :progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Platform Engineer -->

<SectionOpenerSlide
  :partNumber="2"
  section="Part 2"
  title="Platform Engineer"
  subtitle="Three permission strategies prove ACP is production-safe"
  :cards="[
    { icon: '✅', title: 'Interactive Approval', blurb: 'Human reviews each request' },
    { icon: '🤖', title: 'Policy-Based', blurb: 'Auto-approve safe ops' },
    { icon: '🎯', title: 'Tiered by Env', blurb: 'Different rules per context' }
  ]"
  :terminal='{ context: "Permission callback gates every action", detail: "3 lines to auto-approve reads, prompt writes" }'
/>

<!-- Phase B: high — 1–2 body slides showing permission model and table -->

---

<!-- SLIDE: Permission Callback: Three Strategies -->

<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="🔐"
  pillLabel="Section 2 · Policies"
  title="Permissions Done Right"
  :problem='{
    header: "The Challenge",
    items: [
      "Ship agents to production safely",
      { title: "Balance:", detail: "Power vs. policy enforcement" }
    ]
  }'
  :solution='{
    header: "The Approach",
    items: [
      "Permission callback intercepts requests",
      { title: "Three strategies:", detail: "Interactive, Policy-based, Tiered by env" }
    ]
  }'
  :outcome='{
    header: "The Result",
    items: [
      "Auditable per-session permissions",
      { title: "Your rules.", detail: "Enforced at the agent boundary" }
    ]
  }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Context-Aware Policy: Tiered by Environment -->

<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🎯"
  pillLabel="Section 2 · Environment Tiers"
  title="Permission Policies That Scale"
  codePosition="left"
  :code='{ language: "typescript", filename: "policy.ts", content: "const SAFE = [read, search];\nconst BLOCKED = [delete];\n\nasync requestPermission(p) {\n  if (SAFE.includes(p.tool))\n    return approved;\n  if (BLOCKED.includes(p.tool))\n    return cancelled;\n  return await promptUser(p);\n}" }'
  :features="[
    { icon: '💾', title: 'Auto-approve safe ops', description: 'Reads never prompt' },
    { icon: '🛑', title: 'Auto-block dangerous ops', description: 'Deletes always blocked' },
    { icon: '👤', title: 'Human decides the rest', description: 'Writes prompt the user' }
  ]"
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Multi-Agent Orchestrator -->

<SectionOpenerSlide
  :partNumber="3"
  section="Part 3"
  title="Multi-Agent Orchestrator"
  subtitle="One protocol, many agents, coordinated work across repos"
  :cards="[
    { icon: '📡', title: 'Broadcast', blurb: 'Prompt all workers at once' },
    { icon: '🧠', title: 'Synthesize', blurb: 'Orchestrator merges results' },
    { icon: '🔄', title: 'Compose', blurb: 'Standard sessions, no special mode' }
  ]"
  :terminal='{ context: "Spawn one agent per repo", detail: "Coordinate results naturally" }'
/>

<!-- Phase B: high — 1–2 body slides showing orchestrator architecture -->

---

<!-- SLIDE: Architecture: One Orchestrator, Many Workers -->

<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🤖"
  pillLabel="Section 3 · Architecture"
  title="Spawning Multi-Agent Sessions"
  codePosition="left"
  :code='{ language: "typescript", filename: "orchestrator.ts", content: "const workers = repos.map(repo => ({\n  process: spawn(copilot, [--acp, --stdio]),\n  repo\n}));\n\nfor (const worker of workers) {\n  const sess = await connection.newSession({\n    cwd: worker.repo.path,\n    mcpServers: [filesystemServer(repo.path)]\n  });\n}" }'
  :features="[
    { icon: '📦', title: 'One process per repo', description: 'Isolated context and state' },
    { icon: '🔀', title: 'Same protocol everywhere', description: 'No special multi-agent mode' },
    { icon: '🧩', title: 'Compose at will', description: 'Standard ACP sessions compose naturally' }
  ]"
  :progressDots='{ current: 1, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Shopfleet Scenario Arc -->

<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🗺️"
  pillLabel="Section 3 · Scenario Arc"
  title="Five Scenarios, One Operator Playbook"
  codePosition="left"
  :code='{ language: "markdown", filename: "SCENARIO.md", content: "1. service-audit-and-api-alignment\n2. payment-expansion\n3. loyalty-feature-rollout\n4. inventory-sync-coordination\n5. security-audit-shared-upgrade\n\nSuggested: 1 -> 2 -> 3 -> 4 -> 5" }'
  :features="[
    { icon: '🏁', title: 'Start with architecture truth', description: 'Scenario 1 creates a shared baseline across all repos' },
    { icon: '🔁', title: 'Escalate complexity', description: 'Scenarios 2-4 layer feature rollout and dependency routing' },
    { icon: '🚨', title: 'End with critical path ops', description: 'Scenario 5 proves security sequencing under pressure' }
  ]"
  :progressDots='{ current: 2, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Broadcast + Synthesis Operator Loop -->

<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="📡"
  pillLabel="Section 3 · Operator Loop"
  title="Scenario 1: Broadcast First, Synthesize Second"
  subtitle="The fastest way to align eight shopfleet services"
  :transcript='[
    { type: "prompt", text: "Broadcast to all workers" },
    { type: "user", text: "Audit this microservice: purpose, APIs, dependencies, risks" },
    { type: "thinking", label: "🤔 Workers streaming:" },
    { type: "response", lines: ["users: profile + auth ownership", "orders: fulfillment + payment handoff", "storefront: UI + checkout orchestration"] },
    { type: "divider" },
    { type: "prompt", text: "Set Orchestrator Focus" },
    { type: "user", text: "Synthesize dependency map + alignment gaps + next 3 actions" },
    { type: "outcome", text: "One architecture narrative from seven isolated contexts" }
  ]'
  footerMetric="Operator pattern: shared prompt -> worker evidence -> orchestrator synthesis"
  :progressDots='{ current: 3, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Dependency Routing in Action -->

<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Section 3 · Dependency Routing"
  title="Scenario 3: Loyalty Rollout with Cross-Repo Cascades"
  codePosition="left"
  :code='{ language: "json", filename: "acp-manifest.json", content: "{\n  \"name\": \"shopfleet-storefront\",\n  \"dependsOn\": [\"shopfleet-users\", \"shopfleet-products\"]\n}\n\n// Broadcast: implement loyalty points\n// Route plan: storefront <- users, products, payments\n// Cascade: service-specific prompts generated per dependency" }'
  :features="[
    { icon: '🧠', title: 'Graph-aware prompts', description: 'Routes are generated from repo relationships, not guesswork' },
    { icon: '🎯', title: 'Repo-specific execution', description: 'Each worker gets the same intent but tailored implementation context' },
    { icon: '🧪', title: 'Consistency checks', description: 'Orchestrator catches schema drift across LoyaltyAccount and PointsTransaction' }
  ]"
  :progressDots='{ current: 4, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Security Sequence Matters -->

<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="🛡️"
  pillLabel="Section 3 · Security Ops"
  title="Scenario 5: Shared Library Security Upgrade"
  subtitle="Order of operations is the difference between safety and outage"
  leftLabel="Ad-hoc rollout"
  rightLabel="Orchestrated rollout"
  :steps='[
    {
      left: { label: "Patch services in parallel", note: "Inconsistent hash behavior" },
      right: { label: "Patch shopfleet-shared first", note: "Single source of crypto truth" }
    },
    {
      left: { label: "Discover breakages after deploy", note: "Login failures surface late" },
      right: { label: "Broadcast diagnostic audit", note: "Find all hash usage before rollout" }
    },
    {
      left: { label: "No migration plan", note: "Users forced into resets" },
      right: { label: "Dual-verify transition", note: "Old SHA + new bcrypt during migration" }
    },
    {
      left: { label: "Manual coordination", note: "High incident risk" },
      right: { label: "Orchestrator validates all services", note: "Evidence before production" }
    }
  ]'
  :outcomeLeft='{ icon: "⚠️", label: "Uncontrolled security blast radius" }'
  :outcomeRight='{ icon: "✅", label: "Controlled migration with audit trail" }'
  summaryMetric="Critical path: shared library -> dependent services -> validation broadcast"
  :progressDots='{ current: 5, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Screenshot Storyboard -->

<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="📸"
  pillLabel="Section 3 · Demo Visuals"
  title="Live Screenshot Storyboard for Your Polyrepo Demo"
  :columns='[
    {
      icon: "1️⃣",
      title: "Topology",
      items: [
        "Full app layout: orchestrator + 3+ workers",
        "Dependency graph with node and edge counts",
        "Banner showing unloaded dependency neighbors"
      ]
    },
    {
      icon: "2️⃣",
      title: "Coordination",
      items: [
        "Routing plan panel with edited downstream prompts",
        "Broadcast results with coalesced worker outputs",
        "Orchestrator card in Synthesizing state"
      ]
    },
    {
      icon: "3️⃣",
      title: "Agent States",
      items: [
        "Worker card with dependsOn and dependedBy pills",
        "Unloaded dep chip with Load as Worker action",
        "Session panel showing Restore vs Re-spawn"
      ]
    }
  ]'
  :insight='{ icon: "🧭", text: "If you want backup visuals, cli-acp has walkthrough captures under docs/images/walkthrough/01-06 while you replace with live local shots." }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Ship Safely -->

<SectionOpenerSlide
  :partNumber="4"
  section="Part 4"
  title="Ship Safely"
  subtitle="Decision table and alternatives: When to use ACP, when not to"
  :cards="[
    { icon: '✅', title: 'Use ACP', blurb: 'Non-VS Code, multi-agent, CI/CD' },
    { icon: '⚠️', title: 'Maybe Not', blurb: 'Already in VS Code is simpler' },
    { icon: '🔗', title: 'Choose Wisely', blurb: 'Know your alternative' }
  ]"
  :terminal='{ context: "Four personas, one next step each", detail: "Flywheel: more clients → more agents" }'
/>

<!-- Phase B: medium — 1 body slide with decision table -->

---

<!-- SLIDE: When to Use ACP: Decision Framework -->

<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="✅"
  pillLabel="Section 4 · Decision"
  title="Choose Your Path"
  :columns='[
    { icon: "🎯", title: "Use ACP Now", description: "Non-VS Code tool, multi-agent coordination, Claude API, enterprise policy" },
    { icon: "🤔", title: "Consider Alternatives", description: "Already VS Code, IDE-specific needs, single-agent only, built-in copilot works" },
    { icon: "📚", title: "Start Small", description: "Read spec, try SDK for your language, deploy to dev/test, add policies before prod" }
  ]'
  :progressDots='{ current: 1, total: 1, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: What You Can Do Today -->

<WhatYouCanDoTodaySlide
  :today='["Follow agentclientprotocol.com/spec", "Bookmark the official documentation", "Star the SDK repositories"]'
  :thisWeek='["Clone the ACP SDK for your language", "Run the 14-line example and stream responses", "Read the four-layer architecture guide"]'
  :thisMonth='["Integrate ACP into your editor or tool", "Test permission strategies in dev/stage", "Merge to production with policy gates"]'
  footer="One flag. One agent. Ship safely with ACP."
/>

---

<!-- SLIDE: References -->

<ReferencesSlide
  title="Learn More"
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
        { href: "https://agentclientprotocol.com/protocol/overview", label: "ACP Protocol Overview", description: "Complete specification" },
        { href: "https://docs.github.com/en/copilot/reference/acp-server", label: "Copilot CLI ACP Server", description: "Integration reference" },
        { href: "https://agentclientprotocol.com/get-started/architecture", label: "Four-Layer Architecture", description: "Design deep dive" }
    ] },
    { title: "🛠️ Code & Examples", color: "purple", items: [
        { href: "https://github.com/agentclientprotocol/agent-client-protocol", label: "ACP SDKs & Specs", description: "TypeScript, Python, Rust, Kotlin" },
        { href: "https://github.com/github/cli-acp-orchestrator", label: "Orchestrator Reference", description: "Multi-agent patterns" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->

<ThankYouSlide
  title="Your Tool Just Got an AI Agent"
  subtitle="Build with ACP. Ship safely. Scale."
  :cards="[
    { icon: '⚡', text: 'One flag. 14 lines. Streaming full agent API.' },
    { icon: '🔒', text: 'Three permission strategies. Production policies.' },
    { icon: '🤖', text: 'Compose sessions. Coordinate agents. Open standard.' }
  ]"
  prompt="Start here: github.com/agentclientprotocol/spec"
/>
