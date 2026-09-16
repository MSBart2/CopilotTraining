---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Agentic Operating Model
  CopilotTraining Executive Briefing
drawings:
  persist: false
transition: slide-left
title: "The Agentic Operating Model"
module: tech-talks/exec-strategy
mdc: true
section: Executive Talks
status: active
updated: 2026-09-16
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

<!-- SLIDE: The Agentic Operating Model -->
# The Agentic Operating Model
<TitleSlide
  title="The Agentic Operating Model"
  subtitle="How leaders bound agent authority and prove the return"
  tagline="One controlled pilot. One decision record. Scale once, adjust once, or stop."
  meta="Executive Briefing · 30–45 minutes"
/>

---

<!-- SLIDE: The Authorization Question -->
# The Authorization Question
<CoreQuestionSlide
  question="Will leadership authorize one controlled operating-model pilot with a falsifiable return gate?"
  subtext="The charter commits one team, one workflow, local funding, control capacity, and bounded agent authority."
  highlight="The return decision is recorded in advance: scale once, adjust once, or stop."
  :cards='[
    { icon: "🏛️", title: "Authorizing Body", description: "Approves the completed charter, funding source, and calendar return date." },
    { icon: "⚙️", title: "Operational Owner", description: "The VP of Engineering owns workflow execution and measured results." },
    { icon: "📊", title: "Measurement Custody", description: "Finance, Strategy, or an independent data owner protects baseline integrity." },
    { title: "4 weeks", description: "Internal baseline before assisted execution begins." },
    { title: "90 days", description: "Bounded pilot with predeclared thresholds and guardrail floors." },
    { title: "3 outcomes", description: "Scale once, adjust once, or stop at the dated return gate." }
  ]'
/>

---

<!-- SLIDE: Decision Journey -->
# Decision Journey
<TocSlide
  :sections='[
    { icon: "✅", title: "The Decision", subtitle: "Authorize the test", blurb: "Define the owner, scope, authority boundary, and local commitments.", slide: 3 },
    { icon: "🔬", title: "The Evidence", subtitle: "Earn the evidence", blurb: "Use external variance to design a credible local test.", slide: 6 },
    { icon: "🛡️", title: "Guardrails and Economics", subtitle: "Bound the operating model", blurb: "Assign retained authority, controls, and fully burdened economics.", slide: 10 },
    { icon: "📏", title: "The Gate", subtitle: "Make the decision falsifiable", blurb: "Predeclare thresholds, custody, stop conditions, and the return date.", slide: 13 }
  ]'
/>

---

<!-- SLIDE: Part 1 — The Decision -->
# Part 1 — The Decision
<SectionOpenerSlide
  :partNumber="1"
  title="The Decision"
  subtitle="Leadership pre-authorizes a controlled decision process with named ownership and local commitments."
  :cards='[
    { icon: "🏛️", title: "Authorization", blurb: "One completed charter and accountable signatory." },
    { icon: "🎯", title: "Scope", blurb: "One named team and one repeatable workflow." },
    { icon: "📅", title: "Return", blurb: "A dated gate aligned to a real planning cycle." }
  ]'
  :terminal='{ context: "The authorization commits capacity and bounded permissions", detail: "4-week baseline → 90-day pilot → recorded decision" }'
/>

---

<!-- SLIDE: One Controlled Decision Process -->
# One Controlled Decision Process
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="✅"
  pillLabel="The Decision: Authorization"
  title="One Controlled Decision Process"
  :columns='[
    { icon: "🏛️", title: "Executive Authority", description: "A named body approves the charter, local ceiling, funding source, and tie-break authority." },
    { icon: "⚙️", title: "Operational Ownership", description: "The CTO sponsors. The VP of Engineering owns the selected workflow and its results." },
    { icon: "📊", title: "Independent Custody", description: "Finance, Strategy, or an independent data owner protects baseline and gate integrity." }
  ]'
  :insight='{ icon: "🎯", text: "The authorization buys one bounded test and one recorded return decision." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: The Charter Records the Commitments -->
# The Charter Records the Commitments
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="The Decision: Charter"
  title="The Charter Records the Commitments"
  :rows='[
    { label: "Authorizer", description: "Named committee and accountable signatory", tag: "Decision" },
    { label: "Sponsor", description: "CTO owns cross-functional sponsorship and escalation", tag: "Executive" },
    { label: "Owner", description: "VP Engineering owns workflow execution and results", tag: "Operating" },
    { label: "Scope", description: "One named team and one repeatable workflow", tag: "Bounded" },
    { label: "Budget", description: "Local ceiling, funding source, and labor treatment", tag: "Local" },
    { label: "Return", description: "Exact date aligned to a planning or funding cycle", tag: "Dated" }
  ]'
  footnote="Control capacity, agent permissions, retained authority, and measurement custody are completed before launch."
  :progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — The Evidence -->
# Part 2 — The Evidence
<SectionOpenerSlide
  :partNumber="2"
  title="The Evidence"
  subtitle="External variance creates a positive case for a bounded local test with independent measurement."
  :cards='[
    { icon: "📈", title: "Positive Outcomes", blurb: "Enterprise results show meaningful potential." },
    { icon: "🔬", title: "Observed Variance", blurb: "An expert cohort recorded slower completion." },
    { icon: "📊", title: "Local Proof", blurb: "A comparable baseline determines the decision." }
  ]'
  :terminal='{ context: "Current studies examine assistant-era interventions", detail: "Local agent outcomes require a local test" }'
/>

---

<!-- SLIDE: Current Research Shows Outcome Variance -->
# Current Research Shows Outcome Variance
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🔬"
  pillLabel="The Evidence: External Observations"
  title="Current Research Shows Outcome Variance"
  :left='{
    header: "GitHub and Accenture",
    icon: "📈",
    items: [
      { title: "84% more successful builds", detail: "Reported among Copilot users in an enterprise study" },
      { title: "8.7% more pull requests", detail: "Reported per developer in the participating population" },
      { title: "15% higher merge rate", detail: "Assistant-era result with commercial interest disclosed" }
    ]
  }'
  :right='{
    header: "METR",
    icon: "🔬",
    items: [
      { title: "19% longer completion", detail: "Randomized study of eligible tasks in mature repositories" },
      { title: "16 experienced developers", detail: "Independent, small expert open-source cohort" },
      { title: "Expected faster completion", detail: "Participant expectations differed from measured outcomes" }
    ]
  }'
  :insight='{ icon: "🎯", text: "Both studies examine assistant-era human authorship. Bounded agent execution remains untested; outcomes vary by task, context, and intervention." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Four Evidence Classes Protect the Decision -->
# Four Evidence Classes Protect the Decision
<FourCardGridSlide
  :partNumber="2"
  pillIcon="📊"
  pillLabel="The Evidence: Vocabulary"
  title="Four Evidence Classes Protect the Decision"
  :cards='[
    { icon: "🌐", title: "External Observation", description: "Calibrates plausible outcomes and limits from cited research." },
    { icon: "📏", title: "Internal Baseline", description: "Records local workflow performance before assisted execution." },
    { icon: "🧮", title: "Modeled Scenario", description: "Applies disclosed local assumptions to fully burdened cost and value." },
    { icon: "✅", title: "Proposed Threshold", description: "Defines the approved test for scale, adjust, or stop." }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Three Zones Bound the Candidate Work -->
# Three Zones Bound the Candidate Work
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🗺️"
  pillLabel="The Evidence: Editorial Framework"
  title="Three Zones Bound the Candidate Work"
  :rows='[
    { label: "Control", description: "Checks, evidence collection, and policy-constrained preparation", tag: "Risk" },
    { label: "Coordination", description: "Triage, dependency mapping, status, and release preparation", tag: "Flow" },
    { label: "Context", description: "Repository analysis, documentation, and decision history", tag: "Judgment" }
  ]'
  :insight='{ icon: "📌", text: "Control, Coordination, and Context are an editorial framework for this briefing." }'
  footnote="Enterprise ROI, universal productivity, headcount reduction, and autonomous production authority remain outside the pilot conclusions."
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Guardrails and Economics -->
# Part 3 — Guardrails and Economics
<SectionOpenerSlide
  :partNumber="3"
  title="Guardrails and Economics"
  subtitle="Bounded permissions, retained human authority, and fully burdened local economics define the test."
  :cards='[
    { icon: "🔐", title: "Least Privilege", blurb: "Access is limited to the named workflow." },
    { icon: "👤", title: "Human Authority", blurb: "Accountable leaders retain reserved actions." },
    { icon: "🧮", title: "Local Economics", blurb: "The model includes control, review, and rework." }
  ]'
  :terminal='{ context: "Controls produce evidence throughout execution", detail: "Any authority or control breach → immediate stop" }'
/>

---

<!-- SLIDE: Authority Is Explicit and Enforceable -->
# Authority Is Explicit and Enforceable
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🛡️"
  pillLabel="Guardrails: Authority"
  title="Authority Is Explicit and Enforceable"
  :left='{
    header: "Agent Scope",
    icon: "⚙️",
    items: [
      { title: "Gather context", detail: "Read approved repositories, records, and decision history" },
      { title: "Prepare work", detail: "Propose plans and modify approved development assets" },
      { title: "Produce evidence", detail: "Run approved checks and assemble review records" }
    ]
  }'
  :right='{
    header: "Retained Human Authority",
    icon: "👤",
    items: [
      { title: "Production", detail: "Deployment, data changes, configuration, and integrations" },
      { title: "Access and controls", detail: "Permission changes, exceptions, and new dependencies" },
      { title: "Accountability", detail: "Objectives, risk acceptance, release, and boundary changes" }
    ]
  }'
  :insight='{ icon: "🔒", text: "Tool permissions, delivery gates, logs, and review records make the boundary observable." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: The Economic Case Is Local and Fully Burdened -->
# The Economic Case Is Local and Fully Burdened
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🧮"
  pillLabel="Economics: Scenario Design"
  title="The Economic Case Is Local and Fully Burdened"
  :left='{
    header: "Local Case",
    icon: "📊",
    items: [
      { title: "Measured volume", detail: "Workflow events and validated outcomes from the baseline" },
      { title: "Full cost", detail: "Tools, platform, controls, review, rework, and owner time" },
      { title: "Defensible value", detail: "Redeployed capacity, flow, and quality with named destinations" }
    ]
  }'
  :right='{
    header: "Downside Case",
    icon: "📉",
    items: [
      { title: "Lower output", detail: "Fewer validated outcomes than the local case" },
      { title: "Higher burden", detail: "More review, rework, controls, and operating cost" },
      { title: "Limited redeployment", detail: "Capacity value is reduced or unrealized" }
    ]
  }'
  :insight='{ icon: "📌", text: "Every assumption carries an owner, source, date, and sensitivity range." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — The Gate -->
# Part 4 — The Gate
<SectionOpenerSlide
  :partNumber="4"
  title="The Gate"
  subtitle="A dated threshold memo makes the day-90 decision falsifiable before assisted execution begins."
  :cards='[
    { icon: "📏", title: "Thresholds", blurb: "Outcome, economics, and guardrail floors." },
    { icon: "⚖️", title: "Custody", blurb: "Independent ownership protects the record." },
    { icon: "🗳️", title: "Disposition", blurb: "Scale once, adjust once, or stop." }
  ]'
  :terminal='{ context: "The memo is approved after baseline and before launch", detail: "Every threshold is complete and dated" }'
/>

---

<!-- SLIDE: The Threshold Memo Makes the Test Falsifiable -->
# The Threshold Memo Makes the Test Falsifiable
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="📏"
  pillLabel="The Gate: Threshold Memo"
  title="The Threshold Memo Makes the Test Falsifiable"
  :rows='[
    { label: "Minimum", description: "Completed-outcome count supported by expected event volume", tag: "Volume" },
    { label: "Comparable", description: "Predefined task rule or a concurrent comparison cohort", tag: "Design" },
    { label: "Outcome", description: "One workflow-specific result with a business owner", tag: "Primary" },
    { label: "Economics", description: "Fully burdened threshold using disclosed local inputs", tag: "Value" },
    { label: "Guardrails", description: "Quality, control, authority, and evidence floors", tag: "Control" },
    { label: "Arbiter", description: "Named authority for a tied or disputed disposition", tag: "Decision" }
  ]'
  footnote="The memo also records the directional floor, exact return date, and independent measurement custodian."
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Three Dispositions Close the Decision -->
# Three Dispositions Close the Decision
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🗳️"
  pillLabel="The Gate: Disposition"
  title="Three Dispositions Close the Decision"
  :columns='[
    { icon: "📈", title: "Scale Once", description: "Primary outcome, economics, volume, comparability, and every guardrail floor are satisfied." },
    { icon: "🔧", title: "Adjust Once", description: "The directional floor holds, controls remain intact, and one bounded correction is funded and dated." },
    { icon: "⏹️", title: "Stop", description: "A stop condition occurs, a floor fails, comparison breaks, or the adjustment misses its gate." }
  ]'
  :insight='{ icon: "🛑", text: "Any authority-boundary or control breach stops the pilot immediately." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: The Final Request Is One Recorded Authorization -->
# The Final Request Is One Recorded Authorization
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="✅"
  pillLabel="The Gate: Authorization"
  title="The Final Request Is One Recorded Authorization"
  :columns='[
    { icon: "📋", title: "Complete", description: "Fill every local charter and threshold field after the four-week baseline." },
    { icon: "✍️", title: "Authorize", description: "Approve the named team, workflow, budget, controls, permissions, and 90-day pilot." },
    { icon: "📅", title: "Return", description: "Reconvene on the recorded date for scale once, adjust once, or stop." }
  ]'
  :insight='{ icon: "🎯", text: "The decision record preserves evidence classes, scenario assumptions, control ownership, and disposition." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Leadership Actions -->
# Leadership Actions
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🏛️"
  pillLabel="Leadership Actions"
  title="Three Actions Prepare the Authorization"
  :columns='[
    { icon: "🎯", title: "Name the Test", description: "Select one team, one repeatable workflow, the VP Engineering owner, and the executive sponsor." },
    { icon: "📊", title: "Commission the Baseline", description: "Assign independent measurement custody and collect four weeks of comparable workflow evidence." },
    { icon: "📋", title: "Complete the Memo", description: "Set local budget, capacity, permissions, thresholds, guardrail floors, arbiter, and return date." }
  ]'
  :insight='{ icon: "✅", text: "Launch follows a complete charter and dated threshold memo with every local field approved." }'
  :progressDots='{ current: 1, total: 1, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📊 Outcome Evidence", color: "blue", items: [
      { href: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/", label: "GitHub and Accenture enterprise study, 2024", description: "Commercially interested assistant-era build and pull-request outcomes." },
      { href: "https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/", label: "METR experienced open-source developer study, 2025", description: "Independent randomized study reporting slower completion in a small expert cohort." }
    ] },
    { title: "🧮 Measurement Design", color: "indigo", items: [
      { href: "https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development", label: "DORA ROI of AI-Assisted Software Development, 2025", description: "Commercially interested framework for outcomes and organizational conditions." },
      { href: "https://getdx.com/blog/how-top-companies-measure-ai-impact-in-engineering/", label: "DX engineering AI measurement practices, 2024", description: "Commercially interested review of outcome, quality, and experience measures." }
    ] },
    { title: "🛡️ Governance", color: "purple", items: [
      { href: "https://airc.nist.gov/Home", label: "NIST AI Risk Management Framework, 2023", description: "Governance vocabulary for oversight, monitoring, and accountability." }
    ] }
  ]'
/>

---

<!-- SLIDE: Authorization Recorded -->
# Authorization Recorded
<ThankYouSlide
  title="The Agentic Operating Model"
  subtitle="One controlled pilot. One decision record."
  prompt="Which named workflow has enough volume, control capacity, and measurable value for this authorization?"
  :cards='[{ value: "4 weeks", detail: "Internal baseline with independent measurement custody" }, { value: "90 days", detail: "One bounded operating-model pilot" }, { value: "3 outcomes", detail: "Scale once, adjust once, or stop" }]'
/>
