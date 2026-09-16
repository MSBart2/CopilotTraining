---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: "PR Trust Stack — CopilotTraining Tech Talk"
drawings: { persist: false }
transition: slide-left
title: PR Trust Stack
mdc: true
section: Verify and Govern
status: active
updated: 2026-09-15
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
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>

# PR Trust Stack
<!-- SLIDE: Title -->
<TitleSlide
	title="PR Trust Stack"
	subtitle="Evidence and Authority Before Merge"
	tagline="Give every pre-merge signal a role, an owner, and a governed path to action"
	meta="CopilotTraining · Verify and Govern"
/>

---

# Core Question
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
	question="Which signals should advise, which should block, and who accepts residual risk?"
	subtext="Classify evidence before automation acquires authority."
	highlight="Every signal needs a role, owner, and escalation path."
	:cards='[
		{ icon: "🧑‍💻", title: "Developer", description: "Disposition findings with code, tests, constraints, or escalation" },
		{ icon: "🧭", title: "Team Lead", description: "Decide which approvals count and which checks can block" },
		{ icon: "🛡️", title: "Platform and Security", description: "Own narrow gates, exceptions, and protected-domain escalation" },
		{ title: "4 committed artifacts", description: "One independently inspectable teaching path" },
		{ title: "Evaluate → active", description: "Observe impact before granting merge authority" },
		{ title: "1 named human owner", description: "Residual-risk acceptance never becomes anonymous" }
	]'
/>

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
	subtitle="Classify Signals → Assemble Evidence → Promote Gates → Govern Risk"
	:sections='[
		{ icon: "🏷️", title: "Classify Signals", subtitle: "Define role before authority", blurb: "Accept, reject, or escalate with explicit ownership", slide: 4 },
		{ icon: "📦", title: "Assemble Evidence", subtitle: "Commit one reviewable record", blurb: "Keep four artifacts inspectable without overstating validation", slide: 8 },
		{ icon: "🚦", title: "Promote Gates", subtitle: "Move evaluate to active", blurb: "Use evidence, ownership, exceptions, and rollback", slide: 12 },
		{ icon: "⚖️", title: "Govern Risk", subtitle: "Keep authority human-owned", blurb: "Separate enablement, billing, bypass, and residual risk", slide: 18 }
	]'
/>

---

# Part 1 — Classify the Signals Before Granting Authority
<!-- SLIDE: Part 1 — Classify the Signals Before Granting Authority -->
<SectionOpenerSlide
	:partNumber="1"
	title="Classify Before Authority"
	subtitle="Define approval semantics, scope, counting, and accountability before a signal can affect merge."
	:cards='[
		{ icon: "💬", title: "Advise", blurb: "Human dispositions decide relevance" },
		{ icon: "✅", title: "Approve", blurb: "Policy decides whether it counts" },
		{ icon: "⛔", title: "Block", blurb: "Active rules enforce narrow proof" }
	]'
	:terminal='{ context: "Signal contract", detail: "Accept · reject · escalate" }'
/>

---

# Give Every Signal One Semantic Role
<!-- SLIDE: Signal Contract -->
<FrameworkMappingRowsSlide
	:partNumber="1"
	pillIcon="🏷️"
	pillLabel="Signal Contract"
	title="Give Every Signal One Semantic Role"
	subtitle="Generation and authority are separate decisions"
	:rows='[
		{ label: "Review note", description: "Contextual hypothesis; developer or reviewer dispositions it", tag: "ADVISORY" },
		{ label: "Approval", description: "Counts only inside an explicitly enabled approval policy", tag: "POLICY" },
		{ label: "Tests", description: "Reproducible status enforced through required checks", tag: "BLOCKING" },
		{ label: "Coverage", description: "Delta or threshold enforced only by an active ruleset", tag: "BLOCKING" },
		{ label: "Quality", description: "Rule semantics determine reproducibility and response", tag: "MIXED" },
		{ label: "Residual risk", description: "Named qualified human authorizes merge or stop", tag: "HUMAN" }
	]'
	footnote="A tool can generate a signal without receiving authority"
	:progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Treat Advisory Findings as a Hypothesis Queue
<!-- SLIDE: Advisory Disposition -->
<ThreeColumnCardSlide
	:partNumber="1"
	pillIcon="💬"
	pillLabel="Advisory Review"
	title="Treat Advisory Findings as a Hypothesis Queue"
	:columns='[
		{ icon: "✅", title: "Accept", description: "Finding fits the repository", items: ["Change code", "Add regression evidence", "Record the disposition"] },
		{ icon: "🧾", title: "Reject", description: "Repository evidence invalidates it", items: ["Cite the test", "Link the constraint or ADR", "Keep disagreement inspectable"] },
		{ icon: "↗️", title: "Escalate", description: "Finding crosses an owned boundary", items: ["Name security or architecture owner", "Stop silent acceptance", "Retain the decision"] }
	]'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Preview Approval Creates Three Human Policy Questions
<!-- SLIDE: Approval Policy -->
<ThreeColumnCardSlide
	:partNumber="1"
	pillIcon="✅"
	pillLabel="Approval Semantics"
	title="Preview Approval Creates Three Human Policy Questions"
	:columns='[
		{ icon: "🎯", title: "Scope", description: "Which repositories inherit or override enablement?" },
		{ icon: "🔢", title: "Counting", description: "Which required-approval rules recognize a Copilot approval?" },
		{ icon: "👤", title: "Accountability", description: "Which human still owns domain and residual-risk acceptance?" }
	]'
	:insight='{ icon: "⚖️", text: "A configured count does not transfer legal, security, product, or operational accountability." }'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Assemble One Reviewable Evidence Record
<!-- SLIDE: Part 2 — Assemble One Reviewable Evidence Record -->
<SectionOpenerSlide
	:partNumber="2"
	title="Assemble One Reviewable Evidence Record"
	subtitle="Join four committed artifacts while distinguishing teaching examples from tenant-validated configuration."
	:cards='[
		{ icon: "📄", title: "Four Artifacts", blurb: "Commit the complete teaching path" },
		{ icon: "🔗", title: "Provenance", blurb: "Retain distinct evidence semantics" },
		{ icon: "🧪", title: "Validation", blurb: "Confirm schemas in the target tenant" }
	]'
	:terminal='{ context: "Committed evidence", detail: "Inspectable does not mean deployable" }'
/>

---

# Four Committed Artifacts, Two Kinds of Confidence
<!-- SLIDE: Four Committed Artifacts -->
<FourCardGridSlide
	:partNumber="2"
	pillIcon="📦"
	pillLabel="Evidence System"
	title="Four Committed Artifacts, Two Kinds of Confidence"
	:cards='[
		{ icon: "🧭", title: "Review Instructions", description: "Teaching artifact: focuses advisory review; never grants enforcement authority" },
		{ icon: "⚙️", title: "Coverage Workflow", description: "Teaching artifact: inspectable least-privilege Cobertura contract; validate runtime" },
		{ icon: "🚦", title: "Evaluate Ruleset", description: "Teaching artifact: models observation; validate current target-tenant schema" },
		{ icon: "🧾", title: "Trust Record", description: "Teaching artifact: captures disposition, gate state, override, and human owner" }
	]'
	:progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The Workflow Teaches a Contract, Not a Deployment Claim
<!-- SLIDE: Coverage Workflow -->
<CodeWithFeaturesSlide
	:partNumber="2"
	pillIcon="⚙️"
	pillLabel="Artifact 2 · Teaching"
	title="The Workflow Teaches a Contract, Not a Deployment Claim"
	codePosition="left"
	:code='{ language: "yaml", filename: "examples/.github/workflows/pr-evidence.yml", content: "permissions:\n  contents: read\n  code-quality: write\n\n- run: pytest --cov=src --cov-report=xml:coverage.xml\n- uses: actions/upload-code-coverage@v1\n  with:\n    file: coverage.xml\n    label: code-coverage/pytest" }'
	:features='[
		{ icon: "📚", title: "Teaching Artifact", description: "Committed, reviewable, and independently inspectable" },
		{ icon: "🔬", title: "Target Validation", description: "Run tests; confirm upload, percentage, delta, and permissions" },
		{ icon: "🧩", title: "Repository Boundary", description: "Validate aggregation before sharing a polyglot threshold" }
	]'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# One Surface Does Not Mean One Evidence Type
<!-- SLIDE: Evidence Provenance -->
<TwoColPairedConceptsSlide
	:partNumber="2"
	pillIcon="🔗"
	pillLabel="Evidence Provenance"
	title="One Surface Does Not Mean One Evidence Type"
	:left='{
		header: "Deterministic Rule",
		icon: "📏",
		items: [
			{ title: "Expected reproducibility", detail: "Same code and rule version" },
			{ title: "Best use", detail: "Enforce a narrow known condition" },
			{ title: "Response", detail: "Fix, tune, or use governed bypass" }
		]
	}'
	:right='{
		header: "AI-Assisted Finding",
		icon: "💡",
		items: [
			{ title: "Context dependent", detail: "Can vary with model and context" },
			{ title: "Best use", detail: "Surface semantic or maintainability risk" },
			{ title: "Response", detail: "Accept, reject, investigate, or escalate" }
		]
	}'
	:insight='{ icon: "🧠", text: "The trust record retains provenance even when the product surface combines findings." }'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Promote Proven Signals from Evaluate to Active
<!-- SLIDE: Part 3 — Promote Proven Signals from Evaluate to Active -->
<SectionOpenerSlide
	:partNumber="3"
	title="Promote Proven Signals"
	subtitle="Make activation an explicit policy event backed by evidence, ownership, exceptions, and rollback."
	:cards='[
		{ icon: "👀", title: "Evaluate", blurb: "Observe impact" },
		{ icon: "📋", title: "Decision", blurb: "Review evidence" },
		{ icon: "🔒", title: "Active", blurb: "Enforce deliberately" }
	]'
	:terminal='{ context: "Peak decision", detail: "Observed threshold → active merge gate" }'
/>

---

# Authority Is Earned in Stages
<!-- SLIDE: Promotion Journey -->
<MaturityJourneyRoadmapSlide
	:partNumber="3"
	pillIcon="🚦"
	pillLabel="Enforcement Journey"
	title="Authority Is Earned in Stages"
	subtitle="The team chooses sample size and tolerance; evidence decides promotion"
	:stages='[
		{ label: "1", name: "Evaluate", description: "Observe would-block outcomes on representative pull requests", icon: "👀" },
		{ label: "2", name: "Classify", description: "Separate valid failures, missing evidence, mismatch, and noise", icon: "🏷️" },
		{ label: "3", name: "Decide", description: "Record threshold rationale, owner, exception, and rollback", icon: "📋" },
		{ label: "4", name: "Active", description: "Block matching merges when the proven condition fails", icon: "🔒", isTarget: true }
	]'
	caption="No representative evidence means no promotion"
	:progressDots='{ current: 1, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Evaluate Ruleset Is Inspectable, Not Tenant-Authoritative
<!-- SLIDE: Evaluate Artifact -->
<CodeWithFeaturesSlide
	:partNumber="3"
	pillIcon="👀"
	pillLabel="Artifact 3 · Teaching"
	title="The Evaluate Ruleset Is Inspectable, Not Tenant-Authoritative"
	codePosition="left"
	:code='{ language: "json", filename: "examples/rulesets/pr-trust-stack.evaluate.json", content: "{\n  ‘name’: ‘PR trust stack’,\n  ‘target’: ‘branch’,\n  ‘enforcement’: ‘evaluate’,\n  ‘conditions’: { ‘ref_name’: {\n    ‘include’: [‘refs/heads/main’]\n  }},\n  ‘rules’: [{ ‘type’: ‘code_quality’,\n    ‘parameters’: { ‘minimum_coverage_percentage’: 80 }\n  }]\n}" }'
	:features='[
		{ icon: "📚", title: "Teaching Artifact", description: "Shows scope, candidate threshold, and observation state" },
		{ icon: "🏢", title: "Target Tenant", description: "Generate or export the current schema through supported UI or API" },
		{ icon: "🧪", title: "Validation Proof", description: "Retain would-block results from representative pull requests" }
	]'
	:progressDots='{ current: 2, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Evaluate → Active
<!-- SLIDE: Promotion Peak -->
<HeroStatSlide
	:partNumber="3"
	pillIcon="🔒"
	pillLabel="The Policy Event"
	title="One Field Grants a Proven Threshold Merge Authority"
	subtitle="The smallest configuration change carries the largest governance consequence"
	:hero='{ value: "EVALUATE → ACTIVE", label: "observed impact becomes an enforced merge gate", source: "GitHub Code Quality ruleset enforcement states" }'
	:supporting='[
		{ icon: "📊", title: "Evidence Window", description: "Representative pull requests classified by outcome" },
		{ icon: "📏", title: "Threshold Rationale", description: "Observed risk and remediation justify the number" },
		{ icon: "👤", title: "Named Owner", description: "Human policy owner authorizes promotion" },
		{ icon: "↩️", title: "Rollback Condition", description: "Agreed unexplained-block tolerance returns the rule to evaluate" }
	]'
	:insight='{ icon: "⚖️", text: "Activation is a human-owned policy event, not a configuration convenience." }'
	:progressDots='{ current: 3, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Same Regression Changes Consequence, Not Evidence
<!-- SLIDE: Same PR Different Authority -->
<WorkflowShowdownStepsSlide
	:partNumber="3"
	pillIcon="🧪"
	pillLabel="Representative PR"
	title="The Same Regression Changes Consequence, Not Evidence"
	subtitle="Observation proves behavior before enforcement changes merge authority"
	leftLabel="Evaluate Mode"
	rightLabel="Active Mode"
	:steps='[
		{ left: { label: "Coverage falls below 80%", note: "Cobertura delta is visible" }, right: { label: "Coverage falls below 80%", note: "The same evidence is visible" } },
		{ left: { label: "Rule reports would block", note: "Merge remains possible" }, right: { label: "Rule blocks merge", note: "Matching condition is enforced" } },
		{ left: { label: "Team classifies cause", note: "Valid, missing, mismatch, or noise" }, right: { label: "Developer remediates", note: "Add test or invoke governed bypass" } },
		{ left: { label: "Pilot record grows", note: "No authority granted yet" }, right: { label: "Decision is retained", note: "Status, rationale, and owner remain visible" } }
	]'
	:outcomeLeft='{ icon: "👀", label: "Observed impact; no merge block" }'
	:outcomeRight='{ icon: "🔒", label: "Proven threshold; active merge gate" }'
	summaryMetric="Same PR evidence · different enforcement authority"
	:progressDots='{ current: 4, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Promotion Requires a Complete Activation Record
<!-- SLIDE: Activation Record -->
<FourCardGridSlide
	:partNumber="3"
	pillIcon="📋"
	pillLabel="Activation Decision"
	title="Promotion Requires a Complete Activation Record"
	:cards='[
		{ icon: "📊", title: "Evidence Window", description: "Sample and outcome classes chosen by the team, then retained" },
		{ icon: "📏", title: "Threshold Rationale", description: "Why this condition represents real, remediable risk" },
		{ icon: "🗝️", title: "Exception Path", description: "Named bypass roles, required rationale, expiry, and escalation" },
		{ icon: "↩️", title: "Rollback Condition", description: "Sustained unexplained blocks above agreed tolerance" }
	]'
	:progressDots='{ current: 5, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Govern Enablement, Billing, and Residual Risk Separately
<!-- SLIDE: Part 4 — Govern Enablement, Billing, and Residual Risk Separately -->
<SectionOpenerSlide
	:partNumber="4"
	title="Keep Authority Human-Owned"
	subtitle="Keep product access, commercial terms, bypass authority, and risk acceptance as distinct decisions."
	:cards='[
		{ icon: "🔧", title: "Enablement", blurb: "Observe controls in the tenant" },
		{ icon: "💳", title: "Billing", blurb: "Use live commercial sources" },
		{ icon: "👤", title: "Risk Owner", blurb: "Name who may merge or stop" }
	]'
	:terminal='{ context: "Authority boundary", detail: "Automation informs · humans own risk" }'
/>

---

# Keep Product Boundaries Separate
<!-- SLIDE: Product Boundaries -->
<FrameworkMappingRowsSlide
	:partNumber="4"
	pillIcon="🧭"
	pillLabel="Boundary Map"
	title="Keep Product Boundaries Separate"
	subtitle="Observed tenant settings and live billing sources outrank copied assumptions"
	:rows='[
		{ label: "Review", description: "Enablement does not turn comments into blocking checks", tag: "COPILOT" },
		{ label: "Approvals", description: "Preview counting needs explicit scope and policy ownership", tag: "PREVIEW" },
		{ label: "Quality", description: "Enablement, findings, coverage, and rulesets are independent", tag: "CODE QUALITY" },
		{ label: "Workflow", description: "Runner consumption remains separate from product entitlement", tag: "ACTIONS" },
		{ label: "Billing", description: "Use live product pages plus organization usage data", tag: "LIVE SOURCE" }
	]'
	footnote="A rollout record captures observed controls from the target tenant"
	:progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Bypass and Residual Risk Need Named Human Authority
<!-- SLIDE: Human Authority -->
<TwoColPairedConceptsSlide
	:partNumber="4"
	pillIcon="👤"
	pillLabel="Human Authority"
	title="Bypass and Residual Risk Need Named Human Authority"
	:left='{
		header: "Governed Bypass",
		icon: "🗝️",
		items: [
			{ title: "Named role", detail: "Permission is narrow and explicit" },
			{ title: "Required rationale", detail: "Failing evidence stays attached to the PR" },
			{ title: "Time bound", detail: "Compensating validation and follow-up have an expiry" },
			{ title: "Review frequency", detail: "Repeated bypasses challenge the rule or delivery system" }
		]
	}'
	:right='{
		header: "Residual-Risk Acceptance",
		icon: "⚖️",
		items: [
			{ title: "Qualified owner", detail: "Code, security, privacy, payments, or platform" },
			{ title: "Human judgment", detail: "Business intent and threat model remain owned" },
			{ title: "Merge or stop", detail: "The decision includes rationale and escalation" },
			{ title: "No anonymous authority", detail: "Automation informs but never accepts remaining risk" }
		]
	}'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Apply the Contract to One Real Pull Request
<!-- SLIDE: Own Work Transfer -->
<ProblemSolutionOutcomeSlide
	:partNumber="4"
	pillIcon="🎯"
	pillLabel="Transfer to Your Repository"
	title="Apply the Contract to One Real Pull Request"
	:problem='{
		header: "Choose the PR",
		items: ["Changes production behavior", "Has meaningful test coverage", "Crosses a named domain boundary"]
	}'
	:solution='{
		header: "Build the Record",
		items: ["Accept one material finding", "Reject one with repository evidence", "Capture one evaluated or active gate result"]
	}'
	:outcome='{
		header: "Validate Authority",
		items: ["Reviewer explains every signal role", "Bypass path names an authorized human", "Residual-risk owner records merge or stop"],
		metrics: [{ value: "1 PR", label: "observable trust contract" }]
	}'
	:insight='{ icon: "✅", text: "Done means the timeline shows evidence, disposition, gate state, and a named human decision." }'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<!-- SLIDE: Before/After -->
<BeforeAfterSlide
	header="From Unranked Signals to Governed Merge Authority"
	:leftItems='["Signals arrive without roles", "Evidence is scattered", "Thresholds activate by intuition", "Residual risk is implicit"]'
	:rightItems='["Every signal has semantics", "Four artifacts form one record", "Evaluate precedes active", "A named human owns residual risk"]'
	:metrics='[
		{ value: "4", detail: "committed teaching artifacts" },
		{ value: "2", detail: "explicit enforcement states" },
		{ value: "1", detail: "named residual-risk owner" }
	]'
/>

---

# What You Can Do Today
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
	:today='["Classify one PR signal", "Name its decision owner", "Record one accepted or rejected finding"]'
	:thisWeek='["Commit the four teaching artifacts", "Validate target-tenant schemas", "Define an evaluate window"]'
	:thisMonth='["Review promotion evidence", "Activate one proven threshold", "Audit bypass frequency and rollback"]'
	footer="Automation contributes evidence; people grant authority and accept residual risk."
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
	:groups='[
		{ title: "Review and Quality", color: "cyan", items: [
			{ href: "https://docs.github.com/en/copilot/concepts/agents/code-review", label: "Copilot code review", description: "Review behavior and approval semantics" },
			{ href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/configure-automatic-review", label: "Automatic code review", description: "Repository and organization configuration" },
			{ href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "GitHub Code Quality", description: "Findings and product boundaries" },
			{ href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage", label: "Code coverage", description: "Cobertura upload contract" }
		] },
		{ title: "Enforcement and Boundaries", color: "purple", items: [
			{ href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds", label: "PR thresholds", description: "Coverage and quality rulesets" },
			{ href: "https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge", label: "Catch issues before merge", description: "Evaluate-to-active workflow" },
			{ href: "https://docs.github.com/en/billing/concepts/product-billing/github-copilot", label: "Copilot billing", description: "Current Copilot commercial concepts" },
			{ href: "https://docs.github.com/en/billing/concepts/product-billing/github-code-quality", label: "Code Quality billing", description: "Current Code Quality commercial concepts" }
		] }
	]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
	title="PR Trust Stack"
	subtitle="Evidence and Authority Before Merge"
	:cards='[
		{ value: "4 artifacts", detail: "One independently inspectable evidence path" },
		{ value: "Evaluate → active", detail: "Promotion is a governed policy event" },
		{ value: "Human-owned", detail: "Residual risk stays with named authority" }
	]'
	prompt="Which signal in your repository is ready to earn authority?"
/>
