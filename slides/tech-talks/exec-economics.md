---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Agentic Economics: Making the Business Case
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: The Agentic Economics
mdc: true
section: Executive Talks
status: active
updated: 2026-04-24
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
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
</script>

# Title
<TitleSlide
  title="The Agentic Economics"
  subtitle="Making the Business Case"
  tagline="What it takes to turn the $2/hour opportunity into P&L reality"
  meta="Executive Talk · 45 minutes"
/>

---
src: ./exec-spine.md
---

# Core Question
<CoreQuestionSlide
  question="What does it actually take to capture the agentic labor cost advantage?"
  subtext="The arbitrage is documented and real. Organizations that have approved AI pilots and seen nothing in their P&L are not outliers — they are the majority."
  highlight="Only 5% of AI pilots deliver material bottom-line improvement. The differentiator is not the model — it is the infrastructure."
  :cards='[
    { icon: "💼", title: "CXOs / Board", description: "What infrastructure must be funded before AI investment returns P&L value?" },
    { icon: "📊", title: "CFOs / Finance Leaders", description: "What does the honest J-curve look like — and what is the payback period?" },
    { icon: "🗼", title: "CTOs / VP Engineering", description: "Which workflow is the right first wedge — and how do we measure it?" },
    { title: "$5/hr vs $130/hr", description: "Agent vs senior engineer — a 20-65x fully-loaded labor cost differential" },
    { title: "5% material ROI rate", description: "McKinsey QuantumBlack 2024: only 5% of AI pilots deliver bottom-line improvement" },
    { title: "3.6-day payback", description: "Issue lifecycle automation — $1M annual savings for a 50-person team" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "💰", title: "The Labor Arbitrage Opportunity", subtitle: "The $5/hr Reframe", blurb: "The cost differential that changes the investment calculus for every CXO", slide: 6 },
    { icon: "🚧", title: "The Capture Problem", subtitle: "Why Pilots Don&#39;t Show Up in the P&L", blurb: "Why most organizations approved pilots and saw nothing — and what the data says", slide: 9 },
    { icon: "🎯", title: "The Profitable Wedge", subtitle: "Issue Lifecycle Pattern", blurb: "One workflow, one payback number, the path from arbitrage to actual P&L impact", slide: 14 },
    { icon: "📋", title: "The Leadership Calculation", subtitle: "What to Approve Monday", blurb: "The honest J-curve and three named asks with owners and timelines", slide: 18 },
  ]'
/>

---

# Part 1 — The Labor Arbitrage Opportunity
<SectionOpenerSlide
  :partNumber="1"
  title="The Labor Arbitrage Opportunity"
  subtitle="Agent labor costs $5/hr. Senior engineering costs $130/hr. What infrastructure is required to capture that differential?"
  :cards='[
    { icon: "💰", title: "The Cost Differential", blurb: "20-65x fully-loaded labor cost advantage — documented and measurable" },
    { icon: "🪣", title: "The Work Spectrum", blurb: "Three buckets: high-value human, automatable, hybrid — the decision lens" },
    { icon: "⚠️", title: "The Adoption Paradox", blurb: "90% of orgs adopt AI; only 24% trust outputs — DORA 2025" },
  ]'
  :terminal='{ context: "executive briefing", detail: "The arbitrage is real. The infrastructure to capture it is not yet standard." }'
/>

---

# Two Labor Cost Regimes
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="💰"
  pillLabel="The Labor Arbitrage"
  title="Two Labor Cost Regimes"
  :left='{
    header: "Human Engineering Labor (2026)",
    icon: "👨‍💻",
    items: [
      { text: "Junior Developer", detail: "$70–90/hour fully loaded" },
      { text: "Mid-Level Developer", detail: "$85–110/hour fully loaded" },
      { text: "Senior Developer", detail: "$100–130/hour fully loaded" },
      { text: "Staff Engineer", detail: "$120–150/hour fully loaded" }
    ]
  }'
  :right='{
    header: "Agentic Labor (2026)",
    icon: "🤖",
    items: [
      { text: "Base API cost", detail: "$0.60–$1.20/hour (GPT-4o, Claude 3.5)" },
      { text: "Infrastructure overhead", detail: "Orchestration, monitoring, retries" },
      { text: "Total production cost", detail: "$2–5/hour for capable agents" },
      { text: "vs. Senior Developer", detail: "20–65× less expensive per hour" }
    ]
  }'
  :insight='{ icon: "⚡", text: "The question is not whether agents are cheaper. The question is what infrastructure is required to move work to $2–5/hour." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Three-Bucket Decision Framework
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🪣"
  pillLabel="The Work Spectrum"
  title="The Three-Bucket Decision Framework"
  :columns='[
    { icon: "💼", title: "High-Value Human", description: "Architecture, strategic planning, customer conversations. Stays human at $150–250/hr. Judgment-intensive work that compounds over time.", items: ["Complex trade-off evaluation", "System design decisions", "Stakeholder negotiation"] },
    { icon: "⚙️", title: "Hybrid / Routine", description: "Code review, test writing, bug investigation, PR descriptions. Could move to $2–5/hr with proper context and verification infrastructure in place.", items: ["Feature implementation", "Test generation", "Refactoring"] },
    { icon: "🔁", title: "Automatable Toil", description: "Issue triage, compliance checking, dependency updates, documentation sync. Best at $2–5/hr. Pattern-following, rule-based, measurable outcomes.", items: ["Status reports", "Audit preparation", "Duplicate detection"] }
  ]'
  :insight='{ icon: "⚠️", text: "DORA 2025: 90% of orgs have adopted AI tools — only 24% trust the outputs. Adoption without trust produces caution-heavy workflows that erode the economics." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — The Capture Problem
<SectionOpenerSlide
  :partNumber="2"
  title="The Capture Problem"
  subtitle="Most orgs approved AI pilots and saw nothing in the P&L. The data explains why — one root cause accounts for all of it."
  :cards='[
    { icon: "📉", title: "The 5% Signal", blurb: "McKinsey 2024: only 5% of AI pilots deliver material P&L improvement" },
    { icon: "🔬", title: "Flying Blind & Confident", blurb: "Devs reported 20% faster; independently measured 19% slower — METR RCT 2025" },
    { icon: "🏗️", title: "One Root Cause", blurb: "Five barriers, one diagnosis: no observability infrastructure" },
  ]'
  :terminal='{ context: "skeptic validation", detail: "You were right to be cautious. Here is exactly why your pilots didn&#39;t show up in the P&L." }'
/>

---

# The 5% Reality
<HeroStatSlide
  :partNumber="2"
  pillIcon="📉"
  pillLabel="The Capture Problem"
  title="The 5% Reality"
  subtitle="The data validates skepticism — and explains it precisely"
  :hero='{ value: "5%", label: "of AI pilots deliver material bottom-line improvement", source: "McKinsey QuantumBlack, State of AI 2024" }'
  :supporting='[
    { icon: "🏢", title: "65% Cite Organizational Complexity", description: "The top barrier to AI ROI is not the technology — it is the organizational infrastructure required to capture value from it." },
    { icon: "🔍", title: "The Common Pattern", description: "Pilot approved. Developers report productivity gains. Six months later — nothing visible in the P&L. The pattern is not unique to any one organization." },
    { icon: "✅", title: "What the 5% Did Differently", description: "Invested in automated verification infrastructure before scaling. Measured iteration count and verification overhead — not just agent API cost." }
  ]'
  :insight='{ icon: "🎯", text: "Skepticism was the right response. The caution was earned. The diagnosis — not the models, but the infrastructure — is what changes the outcome." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Flying Blind and Confident
<BeforeAfterPanelsSlide
  :partNumber="2"
  pillIcon="🔬"
  pillLabel="The Capture Problem"
  title="Flying Blind and Confident"
  :before='{
    header: "What Developers Self-Reported",
    items: [
      { title: "Perceived productivity gain", detail: "+20% faster with AI assistance" },
      "Strong confidence in AI tool effectiveness",
      "High satisfaction scores across the cohort",
      "Widespread willingness to continue using AI"
    ]
  }'
  :after='{
    header: "Independently Measured — METR RCT 2025",
    items: [
      { title: "Actual measured throughput", detail: "19% slower on complex real-world tasks" },
      "Fewer than 44% of AI suggestions accepted",
      "Context switching and iteration overhead consumed the gains",
      "69% of developers still wanted AI — perception gap persisted"
    ]
  }'
  :insight='{ icon: "🔬", text: "The perception-reality gap is the diagnostic. Every org that approved pilots and saw nothing in the P&L was measuring the wrong thing." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Five Barriers, One Diagnosis
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🏗️"
  pillLabel="The Capture Problem"
  title="Five Barriers, One Diagnosis"
  subtitle="Each barrier is a different symptom of the same root cause: no observability infrastructure"
  :rows='[
    { label: "No Instrumentation", description: "Agents need feedback loops. Without automated tests and quality gates, every output requires human review — paying twice for the same work.", tag: "Root cause" },
    { label: "Tribal Knowledge", description: "Critical context lives in people&#39;s heads. Agents cannot access what is not written down — wrong assumptions, constant rework.", tag: "Context gap" },
    { label: "Approval Bottlenecks", description: "An agent finishes in 30 minutes; it waits 2 days in the review queue. Total elapsed time is unchanged. Speed without flow is not speed.", tag: "Process gap" },
    { label: "Undefined Boundaries", description: "Nobody has defined what agents can and cannot do. Every task requires negotiating permissions and guardrails. The result is paralysis.", tag: "Governance gap" },
    { label: "Fragmented Tooling", description: "Context is scattered across Jira, Slack, GitHub, and email. Agents given partial context produce incomplete output that humans must finish.", tag: "Data gap" }
  ]'
  footnote="The gap is not the models. It is the infrastructure required to capture value — and that is a solvable problem."
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Shadow AI: The Governance Risk
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🛡️"
  pillLabel="The Capture Problem"
  title="Shadow AI: The Unmonitored Infrastructure Risk"
  subtitle="IBM Cost of a Data Breach Report 2025"
  :rows='[
    { label: "Origin",      description: "20% of 2025 data breaches originated from shadow AI use",        tag: "IBM 2025" },
    { label: "Cost Premium", description: "$670K premium per incident above the standard breach average",   tag: "+$670K" },
    { label: "Policy Gap",  description: "63% have no governance policy — 97% lack AI access controls",    tag: "63% / 97%" },
    { label: "Controls ROI", description: "Organizations with AI security controls saved $2.2M per breach", tag: "$2.2M saved" }
  ]'
  footnote="Governance investment is quantifiably self-funding — the $2.2M average payout exceeds the cost of controls."
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Quick Wins Economics: The Issue Lifecycle Pattern
<SectionOpenerSlide
  :partNumber="3"
  title="Quick Wins Economics"
  subtitle="One workflow. One payback number. The proof point that shows the path from the arbitrage to actual P&L impact."
  :cards='[
    { icon: "⚡", title: "The Proof Point", blurb: "Issue lifecycle automation: $1M savings, 3.6-day payback (50-person team)" },
    { icon: "🔐", title: "The Wedge Principle", blurb: "Start where work is frequent, measurable, and approval-light" },
    { icon: "🛡️", title: "Governance as ROI Gate", blurb: "IBM 2025: $2.2M savings with AI security — governance protects the ROI" },
  ]'
  :terminal='{ context: "issue lifecycle automation", detail: "$10,200 investment → $1,001,000 annual savings → 3.6-day payback" }'
/>

---

# The Issue Lifecycle Proof Point
<HeroStatSlide
  :partNumber="3"
  pillIcon="⚡"
  pillLabel="The Profitable Wedge"
  title="The Issue Lifecycle Proof Point"
  subtitle="One workflow. One number. The entry point to agentic economics."
  :hero='{ value: "3.6", label: "days payback period — $10,200 investment returning $1,001,000 in annual savings", source: "Issue lifecycle automation baseline — 50-person engineering team at $100/hr loaded rate" }'
  :supporting='[
    { icon: "📊", title: "Current State (Manual)", description: "20 issues/week × 10 hours each = 10,400 hours/year = $1,040,000/year. Agent + human spot-check brings total to $39,000/year." },
    { icon: "🔧", title: "Minimal Infrastructure Required", description: "No CI/CD rewrite. No repository restructuring. No organizational change management. Works with existing GitHub workflows from day one." },
    { icon: "🎯", title: "Why This Workflow First", description: "Frequent (20 issues/week), measurable (time-to-triage, implementation accuracy), and approval-light. Agents handle mechanical work; humans make judgment calls." }
  ]'
  :insight='{ icon: "💡", text: "Quick wins generate the budget and organizational credibility for the larger transformation. The issue lifecycle is the proof point that funds Phase 2." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Wedge Principle
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="🔐"
  pillLabel="The Profitable Wedge"
  title="The Wedge Principle"
  :problem='{
    header: "The Common Mistake",
    items: [
      "Broad AI transformation approved before infrastructure is ready",
      { title: "Verification gap goes unaddressed", detail: "Every agent output requires full human review — costs double" },
      "Savings do not materialize in the P&L within 6 months",
      "Program loses executive sponsorship before Phase 2"
    ]
  }'
  :solution='{
    header: "The Wedge Approach",
    items: [
      "Identify one workflow that is frequent, measurable, and approval-light",
      { title: "Issue lifecycle is the default wedge", detail: "Minimal infrastructure, maximum immediate value" },
      "Prove the economics at small scale before investing in the full platform"
    ]
  }'
  :outcome='{
    header: "The Self-Funding Path",
    items: [
      "Quick win savings fund Phase 2 infrastructure investment",
      "Executive confidence built on demonstrated, attributable value"
    ],
    metrics: [
      { value: "9,714%", label: "first-year ROI — issue lifecycle" },
      { value: "3.6 days", label: "payback funds Phase 2" }
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Governance Is the ROI Gate
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🛡️"
  pillLabel="The Profitable Wedge"
  title="Governance Is the ROI Gate"
  :columns='[
    { icon: "📋", title: "Define Before Scaling", description: "Establish what agents can and cannot do before expanding beyond the pilot workflow. Undefined boundaries are the fourth structural barrier to ROI capture.", items: ["Document agent scope", "Set approval thresholds", "Define escalation paths"] },
    { icon: "🔍", title: "Measure the Right Things", description: "Iteration count and verification overhead are the leading indicators of ROI. Agent API cost alone is the wrong metric — it captures spending, not savings.", items: ["Track iteration cycles", "Measure verification time", "Monitor shadow AI usage"] },
    { icon: "✅", title: "Governance Pays for Itself", description: "IBM 2025: organizations with AI security controls save $2.2M per breach incident on average. Governance is an insurance policy with documented returns.", items: ["$2.2M avg savings/incident", "$670K shadow AI premium avoided", "97% of orgs lack access controls"] }
  ]'
  :insight='{ icon: "🛡️", text: "Governance is not a compliance tax on the ROI. It is the infrastructure that makes the ROI defensible — and the next phase of investment fundable." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — The Leadership Calculation
<SectionOpenerSlide
  :partNumber="4"
  title="The Leadership Calculation"
  subtitle="Year 1 is negative. Year 2 turns positive. 240% verified 3-year ROI — if instrumentation is funded first."
  :cards='[
    { icon: "📈", title: "The Honest J-Curve", blurb: "Year 1 ~-$425K → Year 2 positive → 240% verified 3-year ROI" },
    { icon: "📋", title: "Three Named Asks", blurb: "Instrumentation first, governance mandate, workflow redesign commitment" },
    { icon: "🎯", title: "The Mandate Reframe", blurb: "Fund measurement first — not just approve another pilot" },
  ]'
  :terminal='{ context: "leadership decision", detail: "CFOs who see the honest J-curve trust the math. Hide Year 1 and you lose the room." }'
/>

<!-- Phase B: high — 3 body slides -->

---

# Before/After
<BeforeAfterSlide
  header="From Pilot Approval to P&L Impact"
  :leftItems='["Pilot approved — no P&L impact after 6 months", "Developers self-reporting productivity gains not visible in output", "Shadow AI in use with no governance or measurement", "Five structural barriers undiagnosed — blamed on the models"]'
  :rightItems='["3.6-day payback on first automatable workflow", "$1M annual savings measured and attributable", "Governance infrastructure protecting ROI and reducing breach risk by $2.2M", "Instrumentation identifies barriers; 240% 3-year ROI verified"]'
  :metrics='[
    { value: "20-65×", detail: "fully-loaded labor cost differential — agent vs senior engineer" },
    { value: "3.6 days", detail: "payback period on issue lifecycle automation (50-person team)" },
    { value: "240%", detail: "verified 3-year ROI with proper instrumentation and governance" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Identify one automatable workflow in your engineering org", "Calculate its current cost per issue (time × loaded rate)", "Confirm it is measurable and approval-light"]'
  :thisWeek='["Map the five structural barriers in your current AI environment", "Run a verification-cost audit — what does human review of AI output cost today?", "Quantify shadow AI exposure using IBM&#39;s 20% breach attribution benchmark"]'
  :thisMonth='["Scope an instrumentation investment — iteration count, verification overhead", "Launch the issue lifecycle pilot with a defined payback measurement plan", "Set a governance baseline before scaling any agentic workflow"]'
  footer="The arbitrage is real — but only organizations that fund measurement infrastructure first will see it in the P&L."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📊 Research & Data", color: "cyan", items: [
      { href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024-and-a-half-decade-in-review", label: "McKinsey QuantumBlack: State of AI 2024", description: "5% of AI pilots deliver material bottom-line improvement; 65% cite org complexity as top barrier" },
      { href: "https://arxiv.org/abs/2507.09089", label: "METR: Measuring the Impact of AI Coding Assistance (2025)", description: "RCT: developers self-reported 20% faster; independently measured 19% slower on complex tasks" },
      { href: "https://www.ibm.com/reports/cost-of-a-data-breach", label: "IBM Cost of a Data Breach Report 2025", description: "$4.44M global avg breach cost; 20% of breaches from shadow AI; $2.2M savings with AI security" },
      { href: "https://dora.dev/research/2025/dora-report/", label: "DORA 2025 State of DevOps Report", description: "90% AI adoption, 24% output trust — the adoption paradox and 7 team archetypes" }
    ] },
    { title: "📖 Related Talks", color: "purple", items: [
      { label: "No Instruments, No Delivery", description: "Enterprise agentic governance — the cockpit model for safe agent operations at scale" },
      { label: "The Agentic Labor Model", description: "The workforce composition shift and the three-bucket work spectrum in depth" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="The Agentic Economics"
  subtitle="Making the Business Case for Agentic AI Adoption"
  :cards="[
    { value: '20-65×', detail: 'Agent vs senior engineer labor cost differential — the arbitrage that changes the investment frame' },
    { value: '5%', detail: 'of AI pilots deliver material P&L improvement — McKinsey 2024. Infrastructure is the differentiator.' },
    { value: '3.6 days', detail: 'Payback period on issue lifecycle automation — $1M annual savings for a 50-person team' },
    { value: '240%', detail: 'Verified 3-year ROI with instrumentation and governance funded before agents are scaled' },
  ]"
  prompt="What is the first workflow in your organization where the payback period is measurable in days — not quarters?"
/>
