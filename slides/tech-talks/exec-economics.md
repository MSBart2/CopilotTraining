---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Agentic Economics
  CopilotTraining Executive Talk
drawings:
  persist: false
transition: slide-left
title: The Agentic Economics
mdc: true
section: Executive Talks
status: active
updated: 2026-08-11
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
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="Agentic Economics: The Business Case"
  subtitle="The ROI Framework for Agentic AI Adoption"
  tagline="What it takes to turn the $2/hour opportunity into P&L reality"
  meta="CopilotTraining · Executive Talk"
/>

---
src: ./exec-spine.md
---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="When agent compute costs $2–5/hour, why hasn't it shown up in the P&L yet?"
  subtext="The arbitrage is real. The capture is hard."
  highlight="The gap is infrastructure, not intention."
  :cards='[
    { icon: "💼", title: "CTO / VP Engineering", description: "Evaluating whether agentic economics justify the infrastructure investment" },
    { icon: "📊", title: "CFO / Finance Leader", description: "Modeling the realistic ROI timeline and payback structure" },
    { icon: "🗂️", title: "Engineering Director", description: "Translating the labor arbitrage into a concrete operating plan" },
    { title: "20–65× cost differential", description: "Agent compute ($2–5/hr) vs senior engineer ($100–130/hr, fully loaded)" },
    { title: "5% reach material ROI", description: "McKinsey 2024: only 5% of AI pilots deliver material P&L improvement" },
    { title: "3.6-day payback", description: "Issue lifecycle automation — the first measurable wedge into agentic economics" }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "💰", title: "The Arbitrage", subtitle: "Cost arbitrage and the work spectrum", blurb: "Cost gap and the three categories of work it reframes", slide: 5 },
    { icon: "🔍", title: "The Capture Problem", subtitle: "Infrastructure gaps block P&L capture", blurb: "Five barriers, one root cause", slide: 8 },
    { icon: "⚡", title: "Quick Wins", subtitle: "Issue lifecycle as the proof point", blurb: "One workflow, 3.6-day payback, self-funding", slide: 13 },
    { icon: "🧮", title: "The Calculation", subtitle: "Investment scenario and governance asks", blurb: "J-curve, dashboard checkpoint, three leadership asks", slide: 17 }
  ]'
/>

---

<!-- SLIDE: Part 1 — The Labor Arbitrage Opportunity -->
# Part 1 — The Labor Arbitrage Opportunity
<SectionOpenerSlide
  :partNumber="1"
  title="The Labor Arbitrage Opportunity"
  subtitle="Agent compute at $2–5/hour vs $130/hour for senior engineers creates a structural cost differential."
  :cards='[
    { icon: "💰", title: "The Cost Gap", blurb: "$5/hr vs $130/hr — a 20–65x fully-loaded differential" },
    { icon: "🗂️", title: "Three Work Buckets", blurb: "High-value, automatable, toil — each priced differently" },
    { icon: "📊", title: "The DORA Signal", blurb: "90% AI adoption, 24% output trust — the gap follows" }
  ]'
  :terminal='{ context: "Agent compute cost vs senior engineer (fully loaded)", detail: "$2–5/hr vs $100–130/hr" }'
/>

---

<!-- SLIDE: The $2-$5 Agent -->
# The $2-$5 Agent
<HeroStatSlide
  :partNumber="1"
  pillIcon="💰"
  pillLabel="Arbitrage: The Core Number"
  title="The Cost Differential That Reframes Engineering Economics"
  subtitle="Fully-loaded agent compute vs senior engineer labor, 2026"
  :hero='{ value: "20–65×", label: "fully-loaded labor cost differential — agent compute vs senior engineer", source: "Agent: $2–5/hr (API + orchestration + monitoring) | Senior engineer: $100–130/hr (salary, benefits, overhead) — BLS 2024" }'
  :supporting='[
    { icon: "🤖", title: "Agent Compute", description: "$2–5/hr for production-grade agentic workflows including API calls, orchestration, and monitoring" },
    { icon: "💼", title: "Mid-Level Developer", description: "$85–110/hr fully loaded — 17–55x more expensive than agent compute for the same task time" },
    { icon: "🌐", title: "Offshore Developer", description: "$25–85/hr — still 5–42x more expensive than agent compute even at the lowest offshore rates" },
    { icon: "🎯", title: "The Strategic Question", description: "Which engineering hours can move to the $2–5/hr tier — and what infrastructure is required?" }
  ]'
  :insight='{ icon: "💡", text: "The question is not whether agents are cheaper. The question is what work can move to $2–5/hour, and what infrastructure is required to capture it." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Three Work Categories -->
# Three Work Categories
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🗂️"
  pillLabel="Arbitrage: Work Spectrum"
  title="Three Categories of Engineering Work — Three Price Points"
  :columns='[
    { icon: "🧠", title: "High-Value Work", description: "Architecture, strategy, and complex debugging — judgment-intensive work at $100–150/hr.", items: ["Customer conversations", "Trade-off evaluation", "System design decisions"] },
    { icon: "⚙️", title: "Routine Work", description: "Code review, test writing, documentation — pattern-based work already accessible at $2–5/hr", items: ["Bug investigation", "Dependency updates", "Compliance checking"] },
    { icon: "🔁", title: "Pure Toil", description: "Issue triage, audit prep, status reports — rule-following work best suited for $2–5/hr agents", items: ["Duplicate detection", "Format enforcement", "Data aggregation"] }
  ]'
  :insight='{ icon: "📊", text: "DORA 2025: 90% of organizations have adopted AI tools — only 24% trust AI outputs enough to deploy without extensive review. The capture problem is structural." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — The Capture Problem -->
# Part 2 — The Capture Problem
<SectionOpenerSlide
  :partNumber="2"
  title="The Capture Problem"
  subtitle="AI pilots are approved and the P&L is unchanged. Five barriers — one root cause: no observability infrastructure."
  :cards='[
    { icon: "📉", title: "McKinsey Validation", blurb: "5% of pilots reach material P&L improvement" },
    { icon: "🪄", title: "The Perception Gap", blurb: "Teams believe 20% faster; measured 19% slower" },
    { icon: "🏗️", title: "Five Barriers, One Root", blurb: "No instrumentation means no capture" }
  ]'
  :terminal='{ context: "McKinsey QuantumBlack 2024 — AI pilot success rate", detail: "5% deliver material P&L improvement" }'
/>

---

<!-- SLIDE: McKinsey Validation -->
# McKinsey Validation
<HeroStatSlide
  :partNumber="2"
  pillIcon="📉"
  pillLabel="Capture Problem: The Benchmark"
  title="Most Organizations Have Been Cautious — Correctly"
  subtitle="McKinsey QuantumBlack 2024: P&L impact rate for AI pilots across organizations"
  :hero='{ value: "5%", label: "of AI pilots deliver material improvement to organizational P&L", source: "McKinsey QuantumBlack: The State of AI in 2024 — a half decade in review" }'
  :supporting='[
    { icon: "✓", title: "The Correct Instinct", description: "Caution about AI ROI has been proportionate — most pilots have not delivered what they projected" },
    { icon: "🔬", title: "A Diagnostic, Not a Verdict", description: "The 95% shortfall identifies where the model breaks down — a blueprint for what to fix" },
    { icon: "🏗️", title: "Infrastructure Is the Variable", description: "Pilots reaching the 5% share one common factor: automated verification before agents touch code." }
  ]'
  :insight='{ icon: "💡", text: "The gap between pilots and P&L impact is not model quality. It is measurement infrastructure — teams are flying without instruments." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: The Perception Gap -->
# The Perception Gap
<HeroStatSlide
  :partNumber="2"
  pillIcon="🪄"
  pillLabel="Capture Problem: Perception vs Measurement"
  title="Flying Blind AND Confident"
  subtitle="METR RCT 2025: experienced developers on complex real-world open-source tasks"
  :hero='{ value: "20% → −19%", label: "self-reported productivity gain vs independently measured slowdown on complex tasks", source: "METR RCT 2025 — experienced open-source developers; fewer than 44% of AI suggestions accepted on complex repos" }'
  :supporting='[
    { icon: "🎭", title: "The Perception Gap", description: "Developers self-reported 20% faster. Measured: 19% slower on complex, unfamiliar codebases." },
    { icon: "🔍", title: "Where the Slowdown Occurs", description: "Iteration overhead explains the gap. Fewer than 44% of suggestions accepted on complex repos." },
    { icon: "✅", title: "Where Gains Are Reliable", description: "Well-scoped routine tasks with clear requirements and automated verification show consistent gains." }
  ]'
  :insight='{ icon: "💡", text: "Organizations without measurement infrastructure cannot distinguish confidence from performance — and cannot course-correct when pilots underdeliver." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Five Barriers, One Root Cause -->
# Five Barriers, One Root Cause
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🚧"
  pillLabel="Capture Problem: Five Barriers"
  title="Five Barriers With One Root Cause"
  subtitle="The most common reasons AI investment does not reach the P&L — all trace to missing infrastructure"
  :rows='[
    { label: "Verification", description: "No automated tests means every agent output needs full human review.", tag: "Verification Gap" },
    { label: "Tacit Context", description: "Undocumented context is invisible to agents — wrong assumptions follow", tag: "Context Gap" },
    { label: "Review Gates", description: "An agent done in 30 minutes still waits 2 days in the review queue.", tag: "Flow Gap" },
    { label: "No Guardrails", description: "Every task requires negotiating scope before the agent can start.", tag: "Governance Gap" },
    { label: "Fragmentation", description: "Context scattered across tools means agents get partial inputs.", tag: "Integration Gap" }
  ]'
  footnote="All five barriers trace to one diagnosis: no observability infrastructure. That is a solvable problem."
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Governance Pays for Itself -->
# Governance Pays for Itself
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="🛡️"
  pillLabel="Capture Problem: Governance ROI"
  title="Governance Infrastructure Pays for Itself"
  :problem='{
    header: "Shadow AI Risk",
    items: [
      "20% of 2025 data breaches originated from shadow AI usage",
      "Unauthorized models bypass security controls and audit trails",
      { title: "$670K additional cost", detail: "Per incident involving shadow AI vs standard breach (IBM 2025)" }
    ]
  }'
  :solution='{
    header: "AI Security Controls",
    items: [
      "Sanctioned model registry with access policy enforcement",
      "Automated scanning integrated in CI/CD pipelines",
      "Usage monitoring with anomaly detection and audit trails"
    ]
  }'
  :outcome='{
    header: "Measurable Protection",
    items: ["Security investment reduces both breach probability and magnitude", "Governance becomes self-funding at the first prevented incident"],
    metrics: [
      { value: "$2.2M", label: "avg savings with AI security controls" },
      { value: "$4.44M", label: "global avg breach cost (IBM 2025)" }
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Quick Wins Economics -->
# Part 3 — Quick Wins Economics
<SectionOpenerSlide
  :partNumber="3"
  title="Quick Wins: The Issue Lifecycle Pattern"
  subtitle="One workflow, one payback number: issue lifecycle automation proves ROI before the full platform investment."
  :cards='[
    { icon: "⚡", title: "3.6-Day Payback", blurb: "$1M savings, 3.6-day payback — single workflow" },
    { icon: "🔑", title: "The Wedge Principle", blurb: "Start where work is frequent and approval-light" },
    { icon: "🔄", title: "Self-Funding ROI", blurb: "Quick wins generate budget for full transformation" }
  ]'
  :terminal='{ context: "Issue lifecycle automation — 50-person team scenario", detail: "$1,001,000/year savings · 3.6-day payback" }'
/>

---

<!-- SLIDE: 3.6-Day Payback -->
# 3.6-Day Payback
<HeroStatSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="Issue Lifecycle: The Payback"
  title="A Single Automatable Workflow Pays Back in 3.6 Days"
  subtitle="Issue lifecycle: research → planning → execution → review (50-person team scenario)"
  :hero='{ value: "3.6 days", label: "payback period for full issue lifecycle automation — 50-person team scenario", source: "Internal scenario: 20 issues/week, $100/hr avg loaded rate, agent cost $3/hr. See README for full assumptions." }'
  :supporting='[
    { icon: "📥", title: "Current State (manual)", description: "$1,040,000/year — 20 issues/week × 10 hrs each × $100/hr loaded labor rate" },
    { icon: "🤖", title: "With Lifecycle Agents", description: "$39,000/year total — $7,800 agent API costs plus $31,200 human validation time" },
    { icon: "💰", title: "Annual Savings", description: "$1,001,000/year — 96% reduction in total workflow cost for the same output volume" },
    { icon: "🏗️", title: "Infrastructure Required", description: "4–6 hours of one-time setup. No repository restructuring or CI/CD rewrite required." }
  ]'
  :insight='{ icon: "💡", text: "The $10,200 first-year investment generates $1,001,000 in savings — the highest-ROI entry point into agentic economics for most engineering organizations." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Issue Lifecycle Workflow -->
# Issue Lifecycle Workflow
<WorkflowShowdownStepsSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Issue Lifecycle: The Workflow"
  title="From Manual Lifecycle to Agent-Assisted Execution"
  subtitle="Four stages, dramatically compressed"
  leftLabel="Manual Workflow"
  rightLabel="With Lifecycle Agents"
  :steps='[
    { left: { label: "Issue triage", note: "30 min @ $100/hr = $50/issue" }, right: { label: "Automated triage", note: "5 min agent @ $3/hr = $0.25/issue" } },
    { left: { label: "Planning", note: "4 hrs research + spec = $400/issue" }, right: { label: "Agent-drafted plan", note: "30 min + 5 min approval = $3.50/issue" } },
    { left: { label: "Implementation", note: "6 hrs coding @ $100/hr = $600" }, right: { label: "Agent implementation", note: "90 min @ $3/hr + 15 min review = $29.50" } },
    { left: { label: "Code review", note: "60 min @ $100/hr = $100" }, right: { label: "Automated review", note: "5 min human validation = $8.33" } }
  ]'
  :outcomeLeft='{ icon: "⏳", label: "$1,150/issue fully loaded — 11.5 hours per issue lifecycle" }'
  :outcomeRight='{ icon: "✓", label: "$41.58/issue — 96% cost reduction per issue" }'
  summaryMetric="$1,040,000/year → $39,000/year for 20 issues/week"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Three Principles -->
# Three Principles
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔑"
  pillLabel="Issue Lifecycle: The Principle"
  title="Three Principles That Make the Wedge Work"
  :columns='[
    { icon: "🎯", title: "The Wedge", description: "Start where work is frequent, measurable, and approval-light. Issue triage meets all three criteria.", items: ["High volume drives fast proof", "Measurable before/after baseline", "Approval-light reduces bottlenecks"] },
    { icon: "💰", title: "Self-Funding ROI", description: "Quick wins generate the budget for larger infrastructure. $1M in savings funds the $1M buildout.", items: ["Phase 1 funds Phase 2", "Executive buy-in from real data", "Team competency as a byproduct"] },
    { icon: "🛡️", title: "Governance as Gate", description: "IBM data: organizations with governance before scaling see $2.2M in breach-cost savings.", items: ["Audit trails from day one", "Access policy before expansion", "Shadow AI risk eliminated early"] }
  ]'
  :insight='{ icon: "📖", text: "See The Journey to Agentic SDLC for step-by-step setup instructions with working code examples for each stage of the issue lifecycle." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — The Leadership Calculation -->
# Part 4 — The Leadership Calculation
<SectionOpenerSlide
  :partNumber="4"
  title="The Leadership Calculation"
  subtitle="Year 1 is negative, Year 2 is modeled positive. Infrastructure investment precedes agent deployment for reliable ROI."
  :cards='[
    { icon: "📉", title: "The Modeled J-Curve", blurb: "Year 1 ~-$425K, modeled 240% 3-year ROI" },
    { icon: "📊", title: "Dashboard Checkpoint", blurb: "Directional cohort signal — not realized savings" },
    { icon: "🎯", title: "Three Leadership Asks", blurb: "Instrumentation, governance, workflow redesign" }
  ]'
  :terminal='{ context: "Modeled 3-year ROI — 50 engineers, $1M infrastructure investment", detail: "Year 1: ~-$425K → Year 2: modeled positive → Year 3: modeled 240% ROI" }'
/>

---

<!-- SLIDE: The Modeled Investment J-Curve -->
# The Modeled Investment J-Curve
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="📉"
  pillLabel="Leadership Calculation: J-Curve"
  title="The J-Curve: Year 1 Is Negative"
  subtitle="Modeled — 50-person team, $100/hr average"
  :stages='[
    { label: "Year 1", name: "Investment Phase", description: "~$1M investment. $635K savings. Net: ~-$425K.", icon: "🔧", isTarget: false },
    { label: "Year 2", name: "Returns Phase", description: "$1.486M run rate. No additional investment. Net: modeled positive.", icon: "📈", isTarget: false },
    { label: "Year 3", name: "Compounding", description: "Net: ~+$2.5M modeled. 3-year ROI: modeled 240%.", icon: "🚀", isTarget: true }
  ]'
  caption="Internal scenario — 13–15% of AI projects achieve these modeled returns."
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Impact Dashboard Checkpoint -->
# Impact Dashboard Checkpoint
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="Leadership Calculation: Directional Checkpoint"
  title="Impact Dashboard: A Directional Cohort Checkpoint"
  :columns='[
    { icon: "💳", title: "Monthly Copilot Cost", description: "Per developer, calculated from AI-credit consumption. Tracks spend as agent-first cohort expands." },
    { icon: "💰", title: "Modeled Payroll Share", description: "From a selectable salary input — a model input, not payroll data. Results are directional." },
    { icon: "🔀", title: "Pull Requests / Developer", description: "Average PRs per developer per month. Throughput signal for early-phase vs agent-first cohorts." }
  ]'
  :insight='{ icon: "⚠️", text: "Dashboard results are potential and directional — not realized savings or causal proof. Access requires the Copilot usage metrics policy and View Copilot Metrics permission. Corrected 28-day cohort counts apply to the dashboard only, not the usage API or NDJSON exports." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Three Leadership Asks -->
# Three Leadership Asks
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🎯"
  pillLabel="Leadership Calculation: The Asks"
  title="Three Leadership Asks for Monday"
  :columns='[
    { icon: "🏗️", title: "Fund Instrumentation", description: "Tests, security scanning, and quality gates must come before agents are deployed.", items: ["80%+ coverage on critical paths", "CI/CD quality gates", "Security scanning automated"] },
    { icon: "🛡️", title: "Mandate Governance", description: "IBM data confirms $2.2M in breach-cost savings for organizations that mandate governance first.", items: ["Sanctioned model policy", "Access and audit controls", "Shadow AI detection in CI"] },
    { icon: "🔄", title: "Commit to Workflow Redesign", description: "Agents in manual workflows deliver a fraction of the modeled return. Redesign is the multiplier.", items: ["Redesign around agent capabilities", "Remove approval bottlenecks", "Measure iteration counts, not only speed"] }
  ]'
  :insight='{ icon: "🎯", text: "The question is whether to mandate measurement infrastructure — not whether to approve an AI pilot. The two decisions have different ROI profiles and different failure modes." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: The Mandate Reframe -->
# The Mandate Reframe
<HeroStatSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Leadership Calculation: The Advantage"
  title="The Compounding Advantage Accrues to Organizations That Start Now"
  subtitle="Platform maturity, team competency, and measurement infrastructure all compound over time"
  :hero='{ value: "18–24 mo", label: "head start in platform maturity and team competency for organizations that have already started", source: "Internal scenario modeling — reflects infrastructure investment timeline and organizational learning curve" }'
  :supporting='[
    { icon: "🏗️", title: "Platform Maturity Compounds", description: "Infrastructure scales with headcount. Marginal cost per additional engineer approaches zero." },
    { icon: "🧠", title: "Team Competency Compounds", description: "Agents improve with richer context. Documentation and test coverage increase agent output quality." },
    { icon: "📊", title: "Measurement Infrastructure Scales", description: "The verification pipeline built for 50 engineers works for 500. The investment amortizes at scale." }
  ]'
  :insight='{ icon: "💡", text: "The mandate is measurement infrastructure. The ROI timeline begins when instrumentation begins — not when the first agent is deployed." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From Labor Arbitrage Theory to P&L Reality"
  :leftItems='["Agent cost advantage identified but no mechanism to capture it", "AI pilots approved but P&L impact unmeasured", "Developers subjectively faster with no objective baseline", "Infrastructure investment deferred as optional cost"]'
  :rightItems='["Verification pipeline creates automated trust for agent output", "Issue lifecycle automation delivers $1M annual savings (scenario)", "Measurement surfaces where gains are real and repeatable", "Instrumentation investment pays back in 12–18 months (modeled)"]'
  :metrics='[
    { value: "20–65×", detail: "labor cost differential — agent compute vs senior engineer" },
    { value: "$1M/yr", detail: "savings from issue lifecycle (50-person team, modeled scenario)" },
    { value: "240%", detail: "modeled 3-year ROI with proper infrastructure investment" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Read the Copilot impact dashboard docs on cohort access and permission requirements", "Calculate current issue lifecycle cost: issues/week × hours/issue × loaded hourly rate", "Identify one high-volume, approval-light workflow as the pilot candidate"]'
  :thisWeek='["Map the five infrastructure barriers against the current engineering environment", "Request the Copilot usage metrics policy and View Copilot Metrics access", "Scope a 4–6 hour setup for issue triage automation in one repository"]'
  :thisMonth='["Run the issue lifecycle pilot and measure time-to-triage before and after", "Build the business case using the internal modeled J-curve (Year 1 ~-$425K)", "Present three leadership asks: fund instrumentation, mandate governance, commit to workflow redesign"]'
  footer="Measurement infrastructure is the prerequisite — instrumentation investment precedes agent deployment for reliable ROI."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📊 Research & Benchmarks", color: "cyan", items: [
      { href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024-and-a-half-decade-in-review", label: "McKinsey QuantumBlack: State of AI 2024 — 5% material improvement rate", description: "Foundational benchmark for AI pilot P&L success rates" },
      { href: "https://arxiv.org/abs/2507.09089", label: "METR RCT 2025 — developers 19% slower on complex tasks with AI", description: "Perception vs measurement gap on complex real-world codebases" },
      { href: "https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development", label: "DORA: ROI of AI-Assisted Development, 2025", description: "Organizational adoption vs output trust gap data" },
      { href: "https://arxiv.org/abs/2304.10778", label: "Yetistiren et al.: AI code correctness — Copilot 46%, arXiv 2023", description: "Benchmark correctness rates for AI code generation tools" },
      { href: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/", label: "GitHub + Accenture: 84% more successful builds, 2024", description: "Enterprise RCT on structured agentic development workflows" }
    ]},
    { title: "💰 Cost & Economics Data", color: "blue", items: [
      { href: "https://www.ibm.com/reports/data-breach", label: "IBM Cost of a Data Breach, 2025 — $4.44M avg, $2.2M AI security savings", description: "Governance ROI data; 20% of 2025 breaches from shadow AI" },
      { href: "https://openai.com/api/pricing/", label: "OpenAI API Pricing, 2025 — basis for $2–5/hr agent cost range", description: "Agent compute cost foundation for the labor arbitrage model" },
      { href: "https://www.bls.gov/oes/current/oes151252.htm", label: "BLS Occupational Employment: Software Developers, 2024", description: "Baseline for fully-loaded engineer labor cost ranges" },
      { href: "https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section", label: "GitHub Changelog: Copilot impact dashboard ROI section, 2026", description: "Directional dashboard for cohort cost and PR volume comparison" }
    ]},
    { title: "🔗 Related Talks", color: "purple", items: [
      { label: "The Agentic Labor Multiplier", description: "What work agents can actually do — 67% of delivery labor outside the code editor" },
      { label: "Agentic Delivery: The Operating Model", description: "Instrument infrastructure, pilot oversight, and governance at scale" },
      { label: "The Journey to Agentic SDLC", description: "Step-by-step setup for issue lifecycle automation and beyond" }
    ]}
  ]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Agentic Economics"
  subtitle="The Agentic Economics: Making the Business Case"
  :cards="[
    { value: '20–65×', detail: 'labor cost differential — agent compute vs senior engineer (BLS 2024)' },
    { value: '5%', detail: 'of AI pilots deliver material P&L improvement — the capture problem is infrastructure' },
    { value: '3.6 days', detail: 'payback on issue lifecycle automation — the highest-ROI entry point (modeled)' },
    { value: '240%', detail: 'modeled 3-year ROI — contingent on instrumentation investment coming first' }
  ]"
  prompt="What is the biggest infrastructure gap preventing the organization from capturing the $2–5/hour opportunity today?"
/>
