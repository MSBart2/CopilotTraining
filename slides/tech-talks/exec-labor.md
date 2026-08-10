---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Labor Multiplier: What Agents Actually Do
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: "The Labor Multiplier: What Agents Actually Do"
mdc: true
section: Executive Talks
status: active
updated: 2026-04-24
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
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

# Title
<TitleSlide
  title="The Labor Multiplier"
  subtitle="Where the other 67% of delivery labor lives"
  tagline="AI addressed the 33%. Here is where the other 67% lives — and what it costs to leave it untouched."
  meta="Executive Briefing · 30 minutes"
/>

---
src: ./exec-spine.md
---

# Core Question
<CoreQuestionSlide
  question="Where does the P&L gain actually live — and what must leadership authorize to capture it?"
  subtext="AI is already in engineering organizations. The productivity data is real. The P&L impact is not showing up — and this briefing explains exactly why."
  highlight="Developers spend 30–33% of their time writing code. AI has addressed that slice. The other 67% of engineering labor is untouched — that is where the compounding return lives."
  :cards='[
    { icon: "🏢", title: "CXOs / Board", description: "Why is AI investment not showing in the P&L — and what must leadership authorize?" },
    { icon: "⚙️", title: "VPs Engineering", description: "Which workflows are addressable — and which operating model captures the gain?" },
    { icon: "📦", title: "VPs Product", description: "What does agent-assisted delivery mean for cycle time, quality, and capacity?" },
    { title: "67%", description: "Engineering labor outside the code editor — untouched by today&#39;s AI investment" },
    { title: "$4.44M", description: "$4.44M average breach cost before regulatory fines — what governance agents address" },
    { title: "12x", description: "SQL injection remediation speed improvement via Copilot Autofix (Octoverse 2024)" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "The Unreached Work", takeaway: "Map the coordination and knowledge work beyond code generation.", whyItMatters: "Strategy expands when leaders see where agent value is emerging." },
    { title: "Three Leverage Zones", takeaway: "Assess depth, breadth, and supervision reduction separately.", whyItMatters: "Different zones need different readiness and investment choices." },
    { title: "AI as Multiplier", takeaway: "Use DORA findings to examine organizational foundations first.", whyItMatters: "Agents amplify strengths and dysfunction in equal measure." }
  ]'
/>

---

# Overview
<TocSlide
  :sections='[
    { icon: "📊", title: "The Hidden Labor Bill", blurb: "Where AI is working — and why the gains are not reaching the P&L", slide: 5 },
    { icon: "🗺️", title: "The SDLC Labor Map", blurb: "Control, Coordination, Context — three buckets with a dollar figure each", slide: 10 },
    { icon: "🔄", title: "The Handoff Pattern", blurb: "The mechanism that captures the gain — and why human review is non-negotiable", slide: 15 },
    { icon: "✅", title: "The Decision", blurb: "One authorization that unlocks the full operating model", slide: 19 }
  ]'
/>

---

# Part 1 — The Hidden Labor Bill
<SectionOpenerSlide
  :partNumber="1"
  title="The Hidden Labor Bill"
  subtitle="AI addressed what developers type. The P&L gap lives in everything else."
  :cards='[
    { icon: "📈", title: "The Win", blurb: "84% more builds. 15% higher merge rate. The investment is real." },
    { icon: "📉", title: "The Gap", blurb: "Code writing is only 30–33% of engineering labor. The rest is untouched." },
    { icon: "🔎", title: "The Cause", blurb: "AI amplifies what is already in place. The constraint has moved downstream." }
  ]'
  :terminal='{ context: "Where AI investment has delivered — and where it stops", detail: "Code writing: 30–33% of delivery labor" }'
/>

---

# Part 1 Slide 1 — The Accenture Proof
<BeforeAfterMetricsSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="The Labor Bill: Evidence"
  title="The Accenture Proof: What AI Investment Delivers"
  :before='{ header: "Without Copilot", items: ["Baseline build success rate", "Standard PR throughput per week", "Manual code review and iteration cycles", "Average PR merge rate"] }'
  :after='{ header: "With Copilot", items: ["84% more successful builds", "8.7% more pull requests per week", "Faster iteration with inline suggestions", "15% higher PR merge rate"] }'
  :metrics='[
    { value: "84%", label: "more successful builds (GitHub + Accenture 2024)" },
    { value: "15%", label: "higher PR merge rate across 12,000+ developers" },
    { value: "8.7%", label: "more pull requests per week per developer" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 1 Slide 2 — The 67% Problem
<HeroStatSlide
  :partNumber="1"
  pillIcon="⏱️"
  pillLabel="The Labor Bill: The Gap"
  title="The Constraint Has Moved"
  subtitle="Code generation is only the beginning"
  :hero='{ value: "67%", label: "of engineering labor is outside the code editor", source: "McKinsey Global Institute, 2023" }'
  :supporting='[
    { icon: "🔍", title: "Discovery and Triage", description: "Issue investigation, duplicate detection, impact analysis" },
    { icon: "🔒", title: "Governance and Compliance", description: "Security review, policy enforcement, audit generation" },
    { icon: "📚", title: "Knowledge Transfer", description: "Documentation, onboarding, runbook maintenance" },
    { icon: "🗺️", title: "Planning and Coordination", description: "Execution planning, dependency mapping, estimation" }
  ]'
  :insight='{ icon: "💡", text: "AI addressed the 33%. The other 67% is where the P&L opportunity lives." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 1 Slide 3 — Mirror and Multiplier
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔬"
  pillLabel="The Labor Bill: DORA 2025"
  title="AI Is a Mirror and a Multiplier"
  :left='{
    header: "Where AI Multiplies Performance",
    icon: "📈",
    items: [
      { title: "High-tempo delivery", detail: "Faster cycles get measurably faster with agents" },
      { title: "Clean CI/CD pipelines", detail: "Stability compounds — agents amplify throughput" },
      { title: "Accurate documentation", detail: "Agents surface and update what is already there" }
    ]
  }'
  :right='{
    header: "Where AI Reveals Gaps",
    icon: "🔍",
    items: [
      { title: "Fragile build processes", detail: "Agents produce artifacts into the broken pipeline" },
      { title: "Manual review bottlenecks", detail: "More code, same compliance review bandwidth" },
      { title: "Documentation drift", detail: "Agents cannot synthesize what does not exist" }
    ]
  }'
  :insight='{ icon: "🎯", text: "DORA 2025: the ROI from AI is determined more by organizational foundations than by tool selection." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 1 Slide 4 — What AI Reaches
<BeforeAfterPanelsSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="The Labor Bill: The Opportunity"
  title="What AI Investment Reaches — and What It Does Not"
  :before='{ header: "The AI Investment Today", items: ["Code generation and review assistance", "Testing and bug-fix support in the IDE", "Developer velocity in the code editor", "30–33% of delivery labor addressed"] }'
  :after='{ header: "The Full P&L Opportunity", items: ["Discovery, triage, and impact analysis", "Compliance governance and audit generation", "Knowledge transfer and documentation drift", "The other 67% of delivery labor"] }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — The SDLC Labor Map
<SectionOpenerSlide
  :partNumber="2"
  title="The SDLC Labor Map"
  subtitle="Three executive buckets — each with an addressable dollar figure."
  :cards='[
    { icon: "🛡️", title: "Control", blurb: "$4.44M breach risk. Autofix: 3.7 hrs to 18 min remediation." },
    { icon: "🔄", title: "Coordination", blurb: "18,000+ engineer-hours per year on triage. Compressed to minutes." },
    { icon: "📚", title: "Context", blurb: "50–200% salary to replace one engineer. 7–8 cycles per year." }
  ]'
  :terminal='{ context: "Three executive buckets — each addressable today", detail: "Control · Coordination · Context" }'
/>

---

# Part 2 Slide 1 — Three Zones Framework
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🗺️"
  pillLabel="Labor Map: Three Zones"
  title="Where Agent Labor Changes the Economics"
  :rows='[
    { label: "CONTROL", description: "Governance + Validation: compliance, security, and audit generation", tag: "$4.44M avg breach" },
    { label: "COORDINATION", description: "Discovery + Planning: triage, impact analysis, and execution planning", tag: "18,000+ hrs/yr" },
    { label: "CONTEXT", description: "Knowledge + Maintenance: documentation, onboarding, team continuity", tag: "50–200% salary/hire" }
  ]'
  :insight='{ icon: "🎯", text: "These three zones represent the 67% of delivery labor that AI investment has not yet addressed." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 2 Slide 2 — Control Zone
<BeforeAfterMetricsSlide
  :partNumber="2"
  pillIcon="🛡️"
  pillLabel="Labor Map: Control Zone"
  title="Control: From Manual Review to Continuous Governance"
  :before='{ header: "Manual Governance", items: ["4-hour compliance review per pull request", "Vulnerabilities found at annual audit", "Manual audit evidence assembled under deadline", "Review coverage limited by developer bandwidth"] }'
  :after='{ header: "Agent Governance", items: ["10-minute automated compliance check per PR", "Vulnerabilities caught at the point of introduction", "Audit evidence generated as a byproduct of delivery", "Every PR reviewed — coverage not limited by bandwidth"] }'
  :metrics='[
    { value: "12x", label: "faster SQL injection remediation (3.7 hrs to 18 min)" },
    { value: "7x", label: "faster XSS remediation (Copilot Autofix, Octoverse 2024)" },
    { value: "$4.44M", label: "average breach cost before regulatory fines (IBM 2025)" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 2 Slide 3 — Coordination Zone
<HeroStatSlide
  :partNumber="2"
  pillIcon="🔄"
  pillLabel="Labor Map: Coordination Zone"
  title="Coordination: 18,000+ Engineer-Hours Per Year"
  subtitle="On triage, investigation, and handoff work"
  :hero='{ value: "18K+", label: "engineer-hours per year on triage and coordination — 50-person team", source: "Atlassian State of Teams" }'
  :supporting='[
    { icon: "🔍", title: "Issue investigation", description: "30 minutes per issue for a developer — under 5 seconds for an agent" },
    { icon: "🗺️", title: "Change impact analysis", description: "Half a day for a senior engineer — minutes for an agent with full history" },
    { icon: "📋", title: "Execution planning", description: "2–4 hours of pre-work per issue — compressed before standup" },
    { icon: "🔄", title: "Duplicate detection", description: "15% of issues are duplicates — agents scan the full backlog systematically" }
  ]'
  :insight='{ icon: "💡", text: "The human still makes the call — but reviews a comprehensive briefing instead of doing the research." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 2 Slide 4 — Context Zone
<BeforeAfterPanelsSlide
  :partNumber="2"
  pillIcon="📚"
  pillLabel="Labor Map: Context Zone"
  title="Context: The Compounding Cost of Forgotten Knowledge"
  :before='{ header: "Without Knowledge Agents", items: ["3–6 weeks to onboard a new engineer", "30–60 minutes of search to understand any system", "Documentation drifts from code within months", "Institutional knowledge walks out with attrition"] }'
  :after='{ header: "With Knowledge Agents", items: ["1–2 weeks onboarding with accurate documentation", "Answers in seconds from full codebase context", "Drift detected and patch proposals generated automatically", "Tribal knowledge encoded and available to the entire team"] }'
  :insight='{ icon: "💡", text: "At 15% attrition on a 50-person team: 7–8 onboarding cycles per year — at 50–200% salary cost each (SHRM)." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — The Handoff Pattern
<SectionOpenerSlide
  :partNumber="3"
  title="The Handoff Pattern"
  subtitle="Preparation → Decision → Execution. 8–12 hours of labor. ~20 minutes of human time."
  :cards='[
    { icon: "⚙️", title: "Preparation", blurb: "Agent assembles context and recommendation in minutes." },
    { icon: "👤", title: "Decision", blurb: "Human reviews, decides, and approves. Still fully accountable." },
    { icon: "🚀", title: "Execution", blurb: "Agent executes with monitoring. Human oversight is intact." }
  ]'
  :terminal='{ context: "8–12 hours of human labor compressed", detail: "→ ~20 minutes of human decision time" }'
/>

---

# Part 3 Slide 1 — Handoff Compression
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="🔄"
  pillLabel="Handoff Pattern: The Compression"
  title="8–12 Hours to 20 Minutes: The Handoff Pattern in Practice"
  :before='{ header: "Without Agents", items: ["2–4 hours investigating the issue", "30–60 minutes of stakeholder communication", "4–8 hours of implementation work", "Human time = preparation + decision + execution"] }'
  :after='{ header: "With the Handoff Pattern", items: ["Agent prepares full analysis in minutes", "Human reviews and decides in 2–3 minutes", "Agent executes the approved plan", "Human time = decision only (~20 minutes total)"] }'
  :metrics='[
    { value: "~20 min", label: "total human time per task with the Handoff Pattern" },
    { value: "8–12 hrs", label: "compressed from this human-only baseline" },
    { value: "100%", label: "human accountability maintained at the decision point" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 3 Slide 2 — Trust as Architecture
<HeroStatSlide
  :partNumber="3"
  pillIcon="🤝"
  pillLabel="Handoff Pattern: The Design Rationale"
  title="Why Human Review Is Architecturally Mandatory"
  subtitle="The trust data is the design justification"
  :hero='{ value: "43%", label: "of developers trust the accuracy of AI-generated output", source: "Stack Overflow Developer Survey 2024" }'
  :supporting='[
    { icon: "📊", title: "30% trust little or none", description: "DORA 2025: 30% of developers report little or no trust in AI outputs" },
    { icon: "🏗️", title: "The design response", description: "Human review at the decision point is the mechanism that gives AI output integrity" },
    { icon: "⚠️", title: "Skipping review costs more", description: "DORA: productivity gains are lost to downstream rework when review is skipped" },
    { icon: "✅", title: "The Handoff Pattern is the solution", description: "Structured human review is not a bottleneck — it is what makes output trustworthy to ship" }
  ]'
  :insight='{ icon: "🎯", text: "The trust gap is not a risk caveat — it is the architectural reason the human review step is non-negotiable." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 3 Slide 3 — DORA 7 Foundations
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="📋"
  pillLabel="Handoff Pattern: Org Readiness"
  title="DORA&#39;s 7 Foundations: The Leadership Checklist"
  :rows='[
    { label: "AI Policy", description: "Teams know what agents can do — decisions happen at the right level", tag: "Strategy" },
    { label: "Platforms", description: "Stable platforms — broken CI/CD means broken artifacts at agent speed", tag: "Foundation" },
    { label: "Data Quality", description: "Agent quality is bounded by data quality — at agent speed", tag: "Foundation" },
    { label: "User Focus", description: "Outcome-focused teams direct agents toward value", tag: "Culture" },
    { label: "Team Culture", description: "Psychological safety to flag agent errors — dysfunction gets amplified", tag: "Culture" },
    { label: "Small Batches", description: "Agents iterate fast; batch sizes that hide mistakes hide them longer", tag: "Delivery" }
  ]'
  :insight='{ icon: "🎯", text: "The ROI from AI is determined by how much organizational infrastructure exists to direct and review what agents produce." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — The Decision
<SectionOpenerSlide
  :partNumber="4"
  title="The Decision"
  subtitle="One authorization — not three asks. A governed AI policy in a bounded workflow."
  :cards='[
    { icon: "📋", title: "The State Right Now", blurb: "99% of enterprise developers already use AI tools." },
    { icon: "🔬", title: "The Authorization", blurb: "Govern AI in one bounded high-friction workflow." },
    { icon: "🏆", title: "The Advantage", blurb: "Governed deployments hold an 18–24 month head start." }
  ]'
  :terminal='{ context: "Whether AI is governed is the remaining question", detail: "99% adoption is already the baseline" }'
/>

---

# Part 4 Slide 1 — Governance Baseline
<HeroStatSlide
  :partNumber="4"
  pillIcon="📊"
  pillLabel="The Decision: Baseline Reality"
  title="The Governance Baseline: AI Is Already in the Organization"
  subtitle="The question is whether it is governed or unmonitored"
  :hero='{ value: "99%", label: "of enterprise developers have tried AI tools at work", source: "GitHub Developer Survey 2024" }'
  :supporting='[
    { icon: "📋", title: "The question is governance", description: "Not whether AI is present — whether it is audited, governed, and accountable" },
    { icon: "📊", title: "76% using or planning AI tools", description: "Stack Overflow 2024: adoption is already underway across the industry" },
    { icon: "🔒", title: "The policy gap", description: "Unmonitored adoption operates without audit trail or accountability" },
    { icon: "📈", title: "18–24 month advantage", description: "Governed deployments hold a compounding head start over unstructured adoption" }
  ]'
  :insight='{ icon: "🎯", text: "The absence of a governance policy is not neutrality — it is unmonitored adoption at scale, without audit trail." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Part 4 Slide 2 — One Authorization
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="✅"
  pillLabel="The Decision: Authorization"
  title="One Authorization, Three Deliverables"
  :columns='[
    { icon: "📋", title: "Labor Audit", description: "A 4-week assessment of where engineering time actually goes — the baseline for every improvement." },
    { icon: "🔬", title: "90-Day Pilot", description: "One team, three agent capabilities: triage, planning, compliance. Metrics defined before launch." },
    { icon: "🔒", title: "Governance Policy", description: "Define agent autonomy boundaries, approval steps, and who is accountable in production." }
  ]'
  :insight='{ icon: "🎯", text: "The audit and pilot are implementation mechanics of one governance decision — not three separate asks." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="What Changes When Agents Enter the SDLC"
  :leftItems='[
    "Manual compliance review blocks or delays deployments",
    "Triage consumes 7–8 hours of engineering time per week",
    "Documentation drifts from code within months of writing",
    "Developer expertise spread across investigation and execution"
  ]'
  :rightItems='[
    "Continuous governance: every PR reviewed in under 10 minutes",
    "Triage in seconds — humans review decisions, not raw data",
    "Documentation synced automatically — onboarding in 1–2 weeks",
    "Developer expertise concentrated on high-judgment decisions"
  ]'
  :metrics='[
    { value: "12×", detail: "faster vulnerability remediation via Copilot Autofix" },
    { value: "~20 min", detail: "human time per 8–12 hour task with the Handoff Pattern" },
    { value: "$4.44M", detail: "average breach cost addressed by continuous governance" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Identify one high-friction engineering workflow as the governance pilot target"
  ]'
  :thisWeek='[
    "Commission a 4-week labor allocation assessment with VP Engineering",
    "Draft the governance policy scope: agent autonomy boundaries and accountability"
  ]'
  :thisMonth='[
    "Launch the 90-day pilot with baseline metrics defined before day one",
    "Align legal and security on the AI governance policy",
    "Schedule a 30-day leadership review with pilot data"
  ]'
  footer="Agent-assisted delivery is a current capability — authorization is the only remaining decision."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📊 Research and Industry Data", color: "cyan", items: [
      { href: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier", label: "McKinsey Global Institute — Developer time allocation, 2023", description: "Developers spend 30–33% of time on new code" },
      { href: "https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development", label: "DORA — ROI of AI-Assisted Software Development, 2025", description: "AI as mirror and multiplier; 7 foundational capabilities" },
      { href: "https://dora.dev/research/2023/dora-report/", label: "DORA State of DevOps Report, 2023", description: "Elite teams deploy 208x more frequently; 2,600x faster recovery" },
      { href: "https://www.ibm.com/reports/data-breach", label: "IBM Cost of a Data Breach Report, 2025", description: "$4.44M average global breach cost before regulatory fines" }
    ]},
    { title: "🔬 GitHub and Developer Evidence", color: "blue", items: [
      { href: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/", label: "GitHub + Accenture Enterprise RCT, 2024", description: "84% more successful builds; 15% higher merge rate; 12,000+ developers" },
      { href: "https://github.blog/news-insights/octoverse/octoverse-2024/", label: "GitHub Octoverse 2024", description: "SQL injection 12x faster; XSS 7x faster; 39M secrets detected" },
      { href: "https://github.blog/news-insights/research/survey-ai-wave-grows/", label: "GitHub Developer Survey 2024", description: "99% of US enterprise developers have tried AI tools at work" },
      { href: "https://survey.stackoverflow.co/2024/professional-developers#productivity-impacts", label: "Stack Overflow Developer Survey 2024", description: "43% trust AI output accuracy; 76% using or planning AI tools" }
    ]},
    { title: "⚖️ Compliance and Workforce Data", color: "purple", items: [
      { href: "https://gdpr-info.eu/art-83-gdpr/", label: "GDPR Article 83 — Penalty Structure", description: "Up to 4% of global annual revenue for serious violations" },
      { label: "SHRM — Employee Replacement Cost Benchmarks", description: "50–200% of annual salary per departing engineer" },
      { label: "Atlassian State of Teams Report", description: "7–8 hours per week on issue management and triage" }
    ]}
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="The Labor Multiplier"
  subtitle="AI addressed the 33%. The other 67% is the addressable opportunity."
  prompt="What is one high-friction workflow where the Handoff Pattern could operate in the next 90 days?"
  :cards='[
    { value: "84%", detail: "more successful builds — the AI investment is working (GitHub + Accenture 2024)" },
    { value: "67%", detail: "of engineering labor untouched — the full P&L opportunity" },
    { value: "~20 min", detail: "of human time per task with the Handoff Pattern in place" }
  ]'
/>
