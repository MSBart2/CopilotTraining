---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## No Instruments, No Delivery
  The Enterprise Agentic Imperative
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: No Instruments, No Delivery
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

# Title
<TitleSlide
  title="No Instruments, No Delivery"
  subtitle="The Enterprise Agentic Imperative"
  tagline="Agentic AI multiplies developer throughput — but only if you build the cockpit first."
  meta="Executive Talk · 45 minutes"
/>

---
src: ./exec-spine.md
---

# Core Question
<CoreQuestionSlide
  question="What does it take to operate agentic AI safely at enterprise scale?"
  subtext="The tools are available. The question is whether the organization has the infrastructure to use them safely — and the governance to know when not to."
  highlight="Instruments make speed safe. Without them, faster means failing faster at enterprise scale."
  :cards='[
    { icon: "👔", title: "Executive Decision-Makers", description: "What infrastructure must be funded before AI investment can return value?" },
    { icon: "🗼", title: "CTOs / VP Engineering", description: "How are agentic sessions coordinated fleet-wide without mission conflicts?" },
    { icon: "🔒", title: "CISOs / Compliance Leaders", description: "How is AI-generated code made auditable, insurable, and defensible?" },
    { title: "Only 5% of AI pilots", description: "Deliver material bottom-line improvement — McKinsey QuantumBlack, 2024" },
    { title: "55% faster task completion", description: "GitHub / Microsoft Research, 2022 — with AI coding assistance" },
    { title: "$4.88M average breach cost", description: "IBM 2024 — before SEC disclosure obligations and regulatory fines" }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "✈️", title: "The Shift", subtitle: "From Coders to Captains", blurb: "Business stakes and the reframe that changes the calculus for enterprise AI investment", slide: 5 },
    { icon: "🎛️", title: "The Flight Model", subtitle: "Roles, Instruments, Multiplier", blurb: "The operating model in three slides — and the math that makes it worth building", slide: 9 },
    { icon: "⚖️", title: "The Risk", subtitle: "Liability Charter", blurb: "Six governance categories, the ROI chain, and why mature DevSecOps is already the cockpit", slide: 13 },
    { icon: "🎯", title: "The Decision", subtitle: "Three Named Asks", blurb: "Named owners, timelines, and exactly what leadership is authorizing today", slide: 16 },
  ]'
/>

---

# Part 1 — The Shift
<SectionOpenerSlide
  :partNumber="1"
  title="The Shift"
  subtitle="The productivity opportunity is documented — the question is what it takes to capture it safely at enterprise scale"
  :cards='[
    { icon: "📊", title: "The Signal", blurb: "Only 5% of AI pilots deliver material bottom-line improvement" },
    { icon: "⚖️", title: "The Stakes", blurb: "$4.88M breach + SEC 4-day disclosure — liability startups avoid" },
    { icon: "✈️", title: "The Reframe", blurb: "Developers become captains — throughput follows the instruments" },
  ]'
  :terminal='{ context: "executive briefing", detail: "AI is already changing software delivery at measurable scale. The question is whether an organization captures it safely." }'
/>


---

# The 5% Signal
<HeroStatSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="The Shift"
  title="The 5% Signal"
  subtitle="Only 5% of enterprise AI pilots deliver material bottom-line improvement. Governance infrastructure is the differentiator."
  :hero='{ value: "5%", label: "of enterprise AI pilots deliver material bottom-line improvement", source: "McKinsey QuantumBlack, State of AI 2024" }'
  :supporting='[
    { icon: "✅", title: "The RCT Evidence", description: "GitHub 2022: 55% faster with AI. Accenture 2024: 84% more successful builds at enterprise scale." },
    { icon: "🏗️", title: "What Separates the 5%", description: "Automated verification infrastructure — the instrument panel that makes AI trustworthy at speed." },
    { icon: "💡", title: "The Implication", description: "Governance infrastructure is the variable. Organizations that invest in it capture the full gain." }
  ]'
  :insight='{ icon: "🎯", text: "Organizations capturing AI value built the infrastructure to verify what the tools produce." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Enterprise Stakes
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="⚖️"
  pillLabel="The Shift"
  title="The Enterprise Stakes"
  :columns='[
    { icon: "📊", title: "DORA 208× Gap", description: "Elite teams deploy 208× more frequently with 3× lower failure rate — DORA 2023." },
    { icon: "🛡️", title: "$4.88M Breach Cost", description: "IBM 2024: average enterprise data breach cost. AI-assisted detection saves $2.2M per incident." },
    { icon: "📋", title: "Regulatory Floor", description: "SEC 4-day disclosure in force. EU AI Act 2025–2026. NIST AI RMF is the governance standard." }
  ]'
  :insight='{ icon: "⚖️", text: "Agentic AI without automated governance creates a new delivery liability category. The instrument panel is both the multiplier enabler and the liability defense." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# From Coders to Captains
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="✈️"
  pillLabel="The Shift"
  title="From Coders to Captains"
  :left='{
    header: "Developer as Coder",
    icon: "💻",
    items: [
      { text: "Productivity measure", detail: "Lines of code written" },
      { text: "Primary bottleneck", detail: "Typing speed" },
      { text: "Core value", detail: "Syntax knowledge" },
      { text: "AI role", detail: "Faster autocomplete" }
    ]
  }'
  :right='{
    header: "Developer as Captain",
    icon: "✈️",
    items: [
      { text: "Productivity measure", detail: "Missions completed" },
      { text: "Primary bottleneck", detail: "Instrument monitoring capacity" },
      { text: "Core value", detail: "Judgment and decision-making" },
      { text: "AI role", detail: "Autopilot — developer remains accountable" }
    ]
  }'
  :insight='{ icon: "⚡", text: "One developer supervising 3–4 concurrent agentic sessions converts a $10M organization into $20M of delivery capacity. The Flight Model shows the math." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — The Flight Model
<SectionOpenerSlide
  :partNumber="2"
  title="The Flight Model"
  subtitle="Five roles, six instruments, and the authorization model that makes the multiplier achievable"
  :cards='[
    { icon: "🗼", title: "Five Roles", blurb: "FAA to Autopilot — every enterprise role has a mapped position" },
    { icon: "🎛️", title: "Six Instruments", blurb: "Automated governance gates — each maps to an enterprise liability" },
    { icon: "⚡", title: "The Math", blurb: "One developer, 3–4 sessions — $20M capacity in a $10M org" },
  ]'
  :terminal='{ context: "flight model", detail: "Instrument monitoring capacity is the ceiling. The instrument panel determines how many flights are safe." }'
/>


---

# The Enterprise Flight System
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🗼"
  pillLabel="The Flight Model"
  title="The Enterprise Flight System"
  subtitle="Five roles — every organization already has most of them"
  :rows='[
    { label: "FAA", description: "Sets all rules — safety standards, enforcement, compliance", tag: "CISO · Legal · Compliance" },
    { label: "Control Tower", description: "Coordinates active flights — sequencing, routing, go/no-go decisions", tag: "CTO · VP Engineering" },
    { label: "Ground Crew", description: "Prepares instruments and infrastructure for every flight", tag: "Platform Engineering · DevOps" },
    { label: "Captains", description: "Plans the mission, makes judgment calls, lands safely, deploys code", tag: "Developers" },
    { label: "Autopilot", description: "Executes the mechanical work — code generation, test iteration, docs", tag: "Agentic AI" }
  ]'
  footnote="Most organizations have Captains and Autopilot. Ground Crew and the instrument panel are the missing components."
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Instrument Panel
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🎛️"
  pillLabel="The Flight Model"
  title="The Instrument Panel"
  subtitle="Six governance gates — each provides a single traffic-light reading at deployment"
  :rows='[
    { label: "Test Health", description: "Automated test results gate every deployment — red grounds the flight", tag: "Quality gate" },
    { label: "Security Scan", description: "Vulnerability detection on every commit — $4.88M breach defense", tag: "SAST / DAST" },
    { label: "Performance", description: "Regression detection vs. production baseline — silent slowdowns caught", tag: "Baseline guard" },
    { label: "Compliance", description: "SOC 2, HIPAA, FedRAMP violations blocked at merge — not in audit", tag: "Policy gate" },
    { label: "Deploy Window", description: "Change management enforced automatically — no override, no exceptions", tag: "Risk guard" },
    { label: "Dependencies", description: "Supply chain CVE scan on every import — SolarWinds-class risk detected", tag: "CVE gate" }
  ]'
  footnote="Instrument coverage is the prerequisite for safe AI output verification at speed. The multiplier follows from the instrument panel."
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Authorization and the Multiplier
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="The Flight Model"
  title="Authorization and the Multiplier"
  :left='{
    header: "The Authorization Model",
    icon: "✈️",
    items: [
      { text: "Pre-flight", detail: "Human defines scope, acceptance criteria, limits — go/no-go decision" },
      { text: "Takeoff", detail: "Human initializes agent with bounded parameters and explicit constraints" },
      { text: "Cruise", detail: "AI executes autonomously — developer monitors instrument panel" },
      { text: "Landing", detail: "Human reviews all output — all six instruments green before deploying" }
    ]
  }'
  :right='{
    header: "The Multiplier",
    icon: "⚡",
    items: [
      { text: "3–4 concurrent sessions", detail: "One developer monitors aggregated status across all active flights" },
      { text: "$10M org → $20M capacity", detail: "Throughput equivalent to tripling headcount without tripling payroll" },
      { text: "Limit: monitoring capacity", detail: "Not typing speed — the instrument panel determines how many flights are safe" }
    ]
  }'
  :insight='{ icon: "💡", text: "AI operates in one bounded phase. Humans control entry and exit. That authorization model is what makes 3–4 concurrent sessions governable at enterprise scale." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — The Risk
<SectionOpenerSlide
  :partNumber="3"
  title="The Risk"
  subtitle="Six liability categories, the ROI chain, and why existing DevSecOps infrastructure is already the cockpit"
  :cards='[
    { icon: "⚖️", title: "Governance Charter", blurb: "Six AI actions requiring authorization — each with a dollar figure" },
    { icon: "💰", title: "The CFO and CISO Case", blurb: "$2.2M savings + $1→$6 ROI + EU AI Act and SEC timelines" },
    { icon: "🏗️", title: "The Instrument Advantage", blurb: "Mature DevSecOps orgs are completing a cockpit, not building one" },
  ]'
  :terminal='{ context: "governance", detail: "The instrument panel is flight clearance." }'
/>


---

# The Governance Charter
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="⚖️"
  pillLabel="The Risk"
  title="The Governance Charter"
  subtitle="Six categories of AI action requiring explicit human authorization — each with a liability citation"
  :rows='[
    { label: "DB Schema", description: "Schema changes are irreversible at scale — creates breach exposure", tag: "$4.88M risk" },
    { label: "Security Ctrl", description: "Bypassing a compliance check can trigger SEC 4-day disclosure", tag: "SEC regulatory" },
    { label: "Dependencies", description: "Supply chain trust — SolarWinds and Log4j establish the precedent", tag: "Supply chain" },
    { label: "Prod Config", description: "Runtime config shifts behavior as dramatically as code changes", tag: "Deploy risk" },
    { label: "Access Ctrl", description: "Privilege escalation breaks the trust model for automation", tag: "Audit flag" },
    { label: "Integrations", description: "New external connections need legal, security, and compliance sign-off", tag: "Architecture" }
  ]'
  footnote="These limits earn the agent broad autonomous authority within them. Governance boundaries are what make autonomy safe."
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The CFO and CISO Case
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="💰"
  pillLabel="The Risk"
  title="The CFO and CISO Case"
  :left='{
    header: "The CFO Frame",
    icon: "💰",
    items: [
      { text: "$4.88M average breach cost", detail: "IBM 2024 — before SEC disclosure obligations and regulatory fines" },
      { text: "$2.2M savings per incident", detail: "IBM 2025 — with AI-assisted security detection in the instrument panel" },
      { text: "$1 → $6 automation ROI", detail: "Every dollar in delivery automation returns $6 in reduced incident costs" },
      { text: "The instrument panel is insurance", detail: "Protecting the ROI on AI spend already authorized" }
    ]
  }'
  :right='{
    header: "The CISO Frame",
    icon: "🛡️",
    items: [
      { text: "EU AI Act: 2025–2026 enforcement", detail: "High-risk AI classification and conformity requirements — build now or build under regulatory audit" },
      { text: "SEC 4-day disclosure: in force", detail: "Material cybersecurity incidents require disclosure within 4 business days" },
      { text: "NIST AI RMF", detail: "Govern, Map, Measure, Manage — the enterprise AI governance vocabulary regulators use" },
      { text: "Mature DevSecOps is the cockpit", detail: "Organizations with existing automation are completing an instrument panel — a structural advantage." }
    ]
  }'
  :insight='{ icon: "🎯", text: "Building governance infrastructure on the organization&#39;s own terms and timeline is the lower-cost path. Regulatory pressure makes it more expensive." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — The Decision
<SectionOpenerSlide
  :partNumber="4"
  title="The Decision"
  subtitle="Three named asks, three owners, three timelines — what is being authorized today"
  :cards='[
    { icon: "🔍", title: "Authorize the Audit", blurb: "VP Engineering. Four weeks. Every gap is risk with open eyes." },
    { icon: "🏗️", title: "Fund the Cockpit", blurb: "3–5 platform engineers — enabling infrastructure, not overhead." },
    { icon: "✈️", title: "Designate Pilots", blurb: "One team. 90 days. Baseline DORA metrics defined before launch." },
  ]'
  :terminal='{ context: "authorization", detail: "Authorization here is an operating model decision, with named owners and a 90-day proof structure." }'
/>


---

# Action 1 — Platform Infrastructure Audit
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🔍"
  pillLabel="The Decision"
  title="Action 1: Authorize a Platform Audit"
  :columns='[
    { icon: "🔍", title: "What", description: "Assess which of the six instruments the pipeline has. Each gap is a named ceiling on AI ROI." },
    { icon: "👤", title: "Owner: VP Engineering", description: "Leads the assessment with the delivery team. Results reported to leadership in four weeks." },
    { icon: "⏰", title: "Timeline: 4 Weeks", description: "Every gap is risk accepted with open eyes — a ceiling on the AI investment already authorized." }
  ]'
  :insight='{ icon: "🎯", text: "This is the only ask with a hard deadline. Actions 2 and 3 depend on what this one finds." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Action 2 — Fund the Instrument Panel
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🏗️"
  pillLabel="The Decision"
  title="Action 2: Fund the Instrument Panel"
  :columns='[
    { icon: "🏗️", title: "What", description: "A dedicated platform team wiring existing tooling and filling gaps identified in the audit." },
    { icon: "💰", title: "Investment: 3–5 Engineers", description: "For a 50-developer organization. Scales to 500. Payback measured in weeks, not quarters." },
    { icon: "📈", title: "Return: $1 → $6", description: "$1 in delivery automation returns $6 in reduced incident costs — IBM/Ponemon." }
  ]'
  :insight='{ icon: "💡", text: "The platform team is the capital decision that makes existing AI spend return value." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Action 3 — Designate a Pilot Team
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="✈️"
  pillLabel="The Decision"
  title="Action 3: Designate a Pilot Team"
  :columns='[
    { icon: "✈️", title: "What", description: "Select one team to operate with a complete instrument panel and structured agentic workflow." },
    { icon: "📊", title: "Scope: 90-Day Pilot", description: "Measure deployment frequency, failure rate, and cycle time — baseline before launch, data after." },
    { icon: "🎯", title: "Output: The Business Case", description: "90-day DORA-anchored data is the board-ready case for scaling agentic delivery organization-wide." }
  ]'
  :insight='{ icon: "✈️", text: "Authorization here is an operating model decision. Start with one team. Measure everything. Scale what works." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="The Instrument Panel Changes Everything"
  :leftItems='["One developer, one agentic session — manual verification at every step", "AI-generated code ships without automated security or compliance checks", "Flying blind across more missions amplifies failures, not productivity", "Risk is invisible until incident — SEC 4-day clock starts after the breach"]'
  :rightItems='["One developer, 3–4 concurrent sessions with aggregated instrument status", "Automated gates on every commit — security, compliance, quality enforced", "Fleet-wide visibility — CTO/VP Engineering coordinates from the control tower", "Speed compounds advantage safely — 208× deployments, 3× lower failure rate"]'
  :metrics='[
    { value: "3–4×", detail: "developer throughput with a full instrument panel" },
    { value: "$20M", detail: "delivery capacity unlocked in a $10M engineering org" },
    { value: "6×", detail: "ROI on every dollar invested in delivery automation" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Schedule the platform infrastructure audit with VP Engineering — four-week deadline, instrument gap map as the deliverable", "Identify which of the six instruments the delivery pipeline already has"]'
  :thisWeek='["Designate a pilot team candidate and define baseline DORA metrics before agentic workflow begins", "Draft the platform team investment proposal — 3–5 engineers, specific gaps identified, payback timeline"]'
  :thisMonth='["Fund and staff the platform team; begin closing the highest-risk instrument gaps first", "Pilot team completes first full agentic sprint with complete instrument monitoring active"]'
  footer="The organizations that lead are those whose developers can safely fly the most planes."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📊 AI Productivity Research", color: "cyan", items: [
      { href: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/", label: "GitHub / Microsoft Research, 2022", description: "Controlled study: developers complete tasks 55% faster with AI coding assistance" },
      { href: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/", label: "GitHub + Accenture RCT, 2024", description: "Enterprise scale: 84% more successful builds; 70% less mental effort on repetitive tasks" },
      { href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024-and-a-half-decade-in-review", label: "McKinsey QuantumBlack: State of AI, 2024", description: "Only 5% of AI pilots deliver material bottom-line improvement; organizational complexity is the primary barrier" },
      { href: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/", label: "METR RCT, 2025", description: "Experienced developers took 19% longer on complex tasks with AI assistance — expected 20–39% speedup" }
    ] },
    { title: "⚡ DevOps and Measurement", color: "indigo", items: [
      { href: "https://dora.dev/research/2023/dora-report/", label: "DORA State of DevOps, 2023", description: "Elite teams deploy 208× more frequently with a 3× lower change failure rate" },
      { href: "https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development", label: "DORA: ROI of AI-Assisted Development, 2025", description: "Framework linking AI engineering velocity to measurable financial outcomes" }
    ] },
    { title: "🛡️ Risk, Governance and Regulation", color: "purple", items: [
      { href: "https://www.ibm.com/reports/data-breach", label: "IBM Cost of a Data Breach, 2025", description: "$4.88M average breach cost; AI-assisted detection saves $2.2M per incident" },
      { href: "https://www.sec.gov/news/press-release/2023-139", label: "SEC Cybersecurity Disclosure Rules, 2023", description: "Material cyber incidents require disclosure within 4 business days — now in force" },
      { href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", label: "EU AI Act, 2024–2026", description: "High-risk AI classification, conformity assessment requirements, staged enforcement timeline" },
      { href: "https://airc.nist.gov/Home", label: "NIST AI Risk Management Framework, 2023", description: "Govern, Map, Measure, Manage — the enterprise AI governance vocabulary" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="No Instruments, No Delivery"
  subtitle="The Enterprise Agentic Imperative"
  :cards="[{ icon: '📊', value: '5%', detail: 'Deliver Material ROI', subdetail: 'McKinsey 2024: the differentiator is governance infrastructure, not the tools' }, { icon: '⚡', value: '$20M', detail: 'Capacity in a $10M Org', subdetail: 'One developer, 3–4 concurrent sessions — limit is monitoring, not headcount' }, { icon: '🛡️', value: '$2.2M', detail: 'Per-Incident Savings', subdetail: 'IBM 2025: AI-assisted security detection reduces breach cost by $2.2M per event' }]"
  prompt="Which of the six instruments is the most critical gap in the delivery pipeline right now?"
/>
