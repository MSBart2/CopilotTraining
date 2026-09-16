---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: Agentic Lifecycle Orchestration — CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Agentic Lifecycle Orchestration
mdc: true
section: Delegate and Coordinate
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
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>

<!-- SLIDE: Title -->
# Agentic Lifecycle Orchestration
<TitleSlide
	title="Agentic Lifecycle Orchestration"
	subtitle="Evidence-Gated Handoffs from Issue to Pull Request"
	tagline="Make every transition inspectable, authorized, recoverable, and owned"
	meta="CopilotTraining Tech Talk"
/>

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
	question="How should independently governed workflows hand work off across an issue-to-PR lifecycle?"
	subtext="Treat every workflow source as an uncompiled candidate until the target repository proves compatibility."
	highlight="Compile first. Then inspect authority, evidence, recovery, and ownership."
	:cards='[
		{ icon: "🔧", title: "Developer", description: "Trace bounded implementation authority from plan to pull request." },
		{ icon: "👥", title: "Team Lead", description: "Keep approval and merge decisions with named humans." },
		{ icon: "🛡️", title: "Platform Engineer", description: "Compile candidates and inspect generated workflow locks." },
		{ title: "4 candidates", description: "Workflow sources remain explicitly uncompiled before adoption." },
		{ title: "1 exact approval", description: "Only the named maintainer approval advances implementation." },
		{ title: "0 hidden transitions", description: "No-op and blocked states remain visible in repository evidence." }
	]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
	:sections='[
		{ icon: "🧭", title: "Lifecycle Contract", subtitle: "Make the state machine visible", blurb: "Label candidates, evidence, stops, owners, and compatibility gates.", slide: 4 },
		{ icon: "📋", title: "Intake", subtitle: "Turn an issue into an approved contract", blurb: "Follow issue #482 from evidence to one exact approval.", slide: 8 },
		{ icon: "🔐", title: "Coding and Review", subtitle: "Preserve authority through merge", blurb: "Expose no-op, blocked recovery, review, and human acceptance.", slide: 12 },
		{ icon: "📏", title: "Measure and Recover", subtitle: "Measure handoffs locally", blurb: "Compile, inspect, and pilot one handoff before expansion.", slide: 17 }
	]'
/>

---

<!-- SLIDE: Part 1 — Make the State Machine Visible -->
# Part 1 — Make the State Machine Visible
<SectionOpenerSlide
	:partNumber="1"
	title="Make the State Machine Visible"
	subtitle="Define the lifecycle contract while all four workflow sources remain uncompiled candidates."
	:cards='[
		{ icon: "🧩", title: "Candidate Sources", blurb: "Four sources, not yet runtime proof" },
		{ icon: "🔎", title: "Visible State", blurb: "Evidence, stop, and owner per handoff" },
		{ icon: "⚙️", title: "Compile Gate", blurb: "Compatibility before adoption" }
	]'
	:terminal='{ context: "Platform owner compiles and reviews generated locks", detail: "candidate source → compatible workflow" }'
/>

---

<!-- SLIDE: Four Independently Governed Phases -->
# Four Independently Governed Phases
<FrameworkMappingRowsSlide
	:partNumber="1"
	pillIcon="🧭"
	pillLabel="Lifecycle Contract"
	title="Each Phase Emits Evidence Before It Hands Off"
	subtitle="A label exposes state; evidence and named authority permit the transition"
	:rows='[
		{ label: "Intake", description: "Issue input → intake marker → triaged or visible stop", tag: "triage owner" },
		{ label: "Planning", description: "Intake evidence → fresh plan → planned or visible stop", tag: "plan approver" },
		{ label: "Coding", description: "Exact approval → draft PR → in-review or visible stop", tag: "impl owner" },
		{ label: "Review", description: "Plan + diff + CI → COMMENT → reviewed or visible stop", tag: "CODEOWNER" }
	]'
	footnote="Success labels accumulate; any stop label takes precedence"
	:progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: State Is Not Authority -->
# State Is Not Authority
<BeforeAfterPanelsSlide
	:partNumber="1"
	pillIcon="🔎"
	pillLabel="Lifecycle Contract"
	title="Labels Record Milestones; They Never Grant Authority Alone"
	:before='{ header: "Implied transition", items: ["A label appears", "The next workflow assumes permission", "Missing evidence moves downstream", "A failed phase retries invisibly"] }'
	:after='{ header: "Evidence-gated handoff", items: ["State label and evidence agree", "Named actor holds the next decision", "Stop reason remains visible", "Recovery requires a new workflow run"] }'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Uncompiled Candidate Sources -->
# Uncompiled Candidate Sources
<CodeWithFeaturesSlide
	:partNumber="1"
	pillIcon="⚙️"
	pillLabel="Compatibility Boundary"
	title="Four Workflow Sources Are Explicitly Uncompiled Candidates"
	codePosition="left"
	:code='{ language: "text", filename: "candidate sources", content: "workflows/1-intake.md\nworkflows/2-planning.md\nworkflows/3-coding.md\nworkflows/4-review.md" }'
	:features='[
		{ icon: "📌", title: "Candidate status", description: "No source is presented as runtime evidence before target-repository compilation." },
		{ icon: "🔒", title: "Generated locks", description: "The platform owner reviews permissions and commits source plus .lock.yml." },
		{ icon: "🧭", title: "Schema ownership", description: "The platform owner tracks gh-aw schema changes and recompiles." }
	]'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — Turn an Issue into an Approved Contract -->
# Part 2 — Turn an Issue into an Approved Contract
<SectionOpenerSlide
	:partNumber="2"
	title="Turn an Issue into an Approved Contract"
	subtitle="Follow issue #482 from intake evidence to a fresh plan and its named approval boundary."
	:cards='[
		{ icon: "📥", title: "Intake Evidence", blurb: "Issue state becomes inspectable" },
		{ icon: "📝", title: "Fresh Plan", blurb: "Artifact defines bounded work" },
		{ icon: "✅", title: "Exact Approval", blurb: "Named maintainer grants authority" }
	]'
	:terminal='{ context: "Issue comment and plan artifact form the handoff", detail: "#482 → approved implementation contract" }'
/>

---

<!-- SLIDE: Intake Evidence for Issue 482 -->
# Intake Evidence for Issue 482
<AITerminalTranscriptSlide
	:partNumber="2"
	pillIcon="📥"
	pillLabel="Issue #482 · Intake"
	title="Intake Decides Whether the Issue Is Ready to Plan"
	subtitle="Specific, non-duplicative, routable input becomes durable evidence"
	:transcript='[
		{ type: "prompt", text: "issue #482 opened with acceptance criteria" },
		{ type: "thinking", label: "Intake candidate inspects issue fields and repository paths" },
		{ type: "response", lines: ["Candidate duplicates: none found", "Type: bug", "Area: payments", "Routing owner: payments team"] },
		{ type: "divider" },
		{ type: "outcome", text: "intake result=pass; next owner=issue triage owner" },
		{ type: "outcome", text: "lifecycle:triaged records the milestone" }
	]'
	footerMetric="Missing reproduction or ownership → visible needs-input / blocked"
	:progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Planning Produces the Contract -->
# Planning Produces the Contract
<CodeWithFeaturesSlide
	:partNumber="2"
	pillIcon="📝"
	pillLabel="Issue #482 · Planning"
	title="Planned Means a Fresh Contract Exists, Not That Coding May Start"
	codePosition="left"
	:code='{ language: "markdown", filename: "plan approval boundary", content: "### Approval\nNamed plan approver: @maintainer\nComment exactly `/approve-plan` to authorize this plan." }'
	:features='[
		{ icon: "📋", title: "Bounded scope", description: "Names files, tests, exclusions, expected signals, risk, and rollback." },
		{ icon: "🕒", title: "Fresh evidence", description: "Coding must use the latest plan rather than a superseded artifact." },
		{ icon: "👤", title: "Named authority", description: "Only @maintainer with repository authority can authorize this plan." }
	]'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Candidate Deployment Shape -->
# Candidate Deployment Shape
<CodeWithFeaturesSlide
	:partNumber="2"
	pillIcon="🗂️"
	pillLabel="Issue #482 · Reference"
	title="Eight Source Files and Seven Labels Make the Contract Inspectable"
	codePosition="left"
	:code='{ language: "text", filename: "uncompiled candidate", content: ".github/workflows/\n├── 1-intake.md\n├── 2-planning.md\n├── 3-coding.md\n└── 4-review.md\n\ninstructions/\n├── intake.md\n├── planning.md\n├── coding.md\n└── review.md" }'
	:features='[
		{ icon: "✅", title: "Milestones", description: "triaged · planned · in-review · reviewed" },
		{ icon: "⛔", title: "Stops", description: "needs-input · changes-requested · blocked" },
		{ icon: "⚙️", title: "Still candidates", description: "Compilation must generate and validate four matching lock files." }
	]'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Preserve Authority Through Merge -->
# Part 3 — Preserve Authority Through Merge
<SectionOpenerSlide
	:partNumber="3"
	title="Preserve Authority Through Merge"
	subtitle="Contrast authorized progress with visible no-op, blocked recovery, agent comment, and human merge acceptance."
	:cards='[
		{ icon: "🔑", title: "Approval Gate", blurb: "Only exact authority advances" },
		{ icon: "⛔", title: "Visible Stops", blurb: "No-op and blocked are evidence" },
		{ icon: "👤", title: "Human Merge", blurb: "CODEOWNER accepts or rejects" }
	]'
	:terminal='{ context: "Automation proposes and checks; named people decide", detail: "COMMENT ≠ approval ≠ merge" }'
/>

---

<!-- SLIDE: Exact Approval or Visible No-op -->
# Exact Approval or Visible No-op
<WorkflowShowdownStepsSlide
	:partNumber="3"
	pillIcon="🔑"
	pillLabel="Issue #482 · Approval Gate"
	title="The Same Command Has Different Results When Authority Differs"
	subtitle="The transition depends on exact text, fresh evidence, and actor authority"
	leftLabel="Unauthorized request"
	rightLabel="@maintainer approval"
	:steps='[
		{ left: { label: "Post /approve-plan", note: "Actor lacks repository authority" }, right: { label: "Post /approve-plan", note: "Exact command from @maintainer" } },
		{ left: { label: "Verify contract", note: "Authority check fails" }, right: { label: "Verify contract", note: "planned label + latest plan are fresh" } },
		{ left: { label: "Emit noop", note: "Reason is observable" }, right: { label: "Start coding", note: "Only approved scope is delegated" } },
		{ left: { label: "Leave state unchanged", note: "No branch, PR, or partial write" }, right: { label: "Record approval URL", note: "Draft PR carries provenance" } }
	]'
	:outcomeLeft='{ icon: "0", label: "repository state changes" }'
	:outcomeRight='{ icon: "1", label: "bounded implementation authorized" }'
	summaryMetric="Exact command + fresh plan + named authority"
	:progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Coding Returns One Draft PR -->
# Coding Returns One Draft PR
<CodeWithFeaturesSlide
	:partNumber="3"
	pillIcon="🛠️"
	pillLabel="Issue #482 · Coding"
	title="Implementation Authority Ends at One Bounded Draft Pull Request"
	codePosition="left"
	:code='{ language: "yaml", filename: "candidate safe output", content: "safe-outputs:\n  create-pull-request:\n    title-prefix: [lifecycle]\n    labels: [agent-generated, lifecycle:in-review]\n    draft: true\n    max: 1" }'
	:features='[
		{ icon: "📎", title: "Approval evidence", description: "The PR records approver, approval URL, linked issue, and latest plan." },
		{ icon: "🧪", title: "Validation evidence", description: "Exact commands and results travel with files changed and deviations." },
		{ icon: "🛑", title: "No forced progress", description: "Failed checks, stale approval, or scope drift stop implementation." }
	]'
	:progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Blocked State Has a Recovery Owner -->
# Blocked State Has a Recovery Owner
<ProblemSolutionOutcomeSlide
	:partNumber="3"
	pillIcon="⛔"
	pillLabel="Issue #482 · Recovery"
	title="A Failed Integration Check Stops Visibly Before Review Reruns"
	:problem='{ header: "Visible stop", items: ["Required integration check fails", "lifecycle:blocked takes precedence", "Stop evidence names the failing signal"] }'
	:solution='{ header: "Owned recovery", items: ["Implementation owner repairs the defect", "Human-authored change supplies new evidence", "Owner removes the stop label and starts a new run"] }'
	:outcome='{ header: "Recoverable handoff", items: ["Review reruns against fresh evidence", "No discussion silently restarts work", "Resume timestamp enters the recovery ledger"] }'
	:progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Agent Advises Human Accepts -->
# Agent Advises Human Accepts
<TwoColPairedConceptsSlide
	:partNumber="3"
	pillIcon="👤"
	pillLabel="Issue #482 · Review"
	title="Agent Review Synthesizes Evidence; a Human Owns Merge Acceptance"
	:left='{ header: "Agent review submits COMMENT", icon: "🤖", items: ["Compare diff with approved plan", "Map acceptance criteria to checks", "Report findings and residual risk", "Set reviewed only when evidence is ready"] }'
	:right='{ header: "CODEOWNER or named reviewer decides", icon: "👤", items: ["Accept or reject residual risk", "Return drift to planning", "Return defects to coding", "Merge only when repository rules agree"] }'
	:progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Measure the Handoffs Locally -->
# Part 4 — Measure the Handoffs Locally
<SectionOpenerSlide
	:partNumber="4"
	title="Measure the Handoffs Locally"
	subtitle="Define local timing and recovery evidence, then compile and pilot one handoff before expanding."
	:cards='[
		{ icon: "⏱️", title: "Local Timing", blurb: "Repository supplies the measures" },
		{ icon: "📒", title: "Recovery Ledger", blurb: "Every stop names an owner" },
		{ icon: "🧪", title: "Pilot Decision", blurb: "Inspect one handoff first" }
	]'
	:terminal='{ context: "First audience action", detail: "compile → inspect → pilot" }'
/>

---

<!-- SLIDE: Measure Timing and Recovery Locally -->
# Measure Timing and Recovery Locally
<TwoColPairedConceptsSlide
	:partNumber="4"
	pillIcon="📏"
	pillLabel="Pilot Evidence"
	title="Use Repository Timestamps, Sample Sizes, and Every Stopped Run"
	:left='{ header: "Timing definitions", icon: "⏱️", items: ["Intake: issue created → intake marker", "Planning: intake pass → plan marker", "Coding: authorized approval → draft PR", "Review: PR sync → review marker"] }'
	:right='{ header: "Recovery ledger", icon: "📒", items: ["Phase, timestamp, and stop reason", "Owner able to recover work", "Evidence required to resume", "Resume timestamp or final disposition"] }'
	:progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Compile Before You Pilot -->
# Compile Before You Pilot
<CodeWithFeaturesSlide
	:partNumber="4"
	pillIcon="⚙️"
	pillLabel="First Audience Action"
	title="Compilation Is the Compatibility Gate"
	codePosition="left"
	:code='{ language: "bash", filename: "target repository", content: "gh aw compile" }'
	:features='[
		{ icon: "1", title: "Compile four sources", description: "Use the target repository installed gh-aw release." },
		{ icon: "2", title: "Inspect four locks", description: "Review read-only jobs, safe outputs, permissions, and schema fit." },
		{ icon: "3", title: "Pilot one handoff", description: "Proceed only when all four candidate sources compile successfully." }
	]'
	:insight='{ icon: "🛑", text: "Stop on schema mismatch, undeclared write path, missing artifact, unowned recovery, or merge bypass." }'
	:progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
	header="From Implied Automation to Evidence-Gated Handoffs"
	:leftItems='[
		"Workflow sources treated as runnable",
		"Approval inferred from conversational intent",
		"Stops disappear into logs or retries",
		"Automation appears to own merge acceptance"
	]'
	:rightItems='[
		"Four sources labeled uncompiled candidates",
		"One exact maintainer approval grants coding authority",
		"No-op and blocked recovery remain visible",
		"Agent comments; CODEOWNER retains merge ownership"
	]'
	:metrics='[
		{ value: "4", detail: "candidate sources compiled together" },
		{ value: "1", detail: "exact approval boundary" },
		{ value: "0", detail: "state changes from unauthorized requests" }
	]'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
	:today='[
		"Compile all four candidate workflow sources",
		"Inspect generated lock files and permissions",
		"Confirm exact approval and merge owners"
	]'
	:thisWeek='[
		"Pilot issue #482 through one handoff",
		"Record visible no-op and blocked-state evidence",
		"Assign recovery to a named implementation owner"
	]'
	:thisMonth='[
		"Measure label-to-run latency locally",
		"Review cost and recovery evidence",
		"Expand only after the compatibility gate holds"
	]'
	footer="Compilation is the compatibility gate and the first action, not a footnote after adoption."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
	:groups='[
		{ title: "Official documentation", color: "cyan", items: [
			{ href: "https://github.github.com/gh-aw/introduction/overview/", label: "GitHub Agentic Workflows overview", description: "Markdown workflow model and core concepts." },
			{ href: "https://github.github.com/gh-aw/introduction/how-they-work/", label: "How Agentic Workflows work", description: "Compilation, lock files, execution, and audit markers." },
			{ href: "https://github.github.com/gh-aw/introduction/architecture/", label: "Security architecture", description: "Read-only agent execution and isolated write handling." },
			{ href: "https://github.github.com/gh-aw/reference/safe-outputs/", label: "Safe outputs", description: "Constrained repository output types and validation." }
		] },
		{ title: "GitHub governance", color: "purple", items: [
			{ href: "https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent", label: "Copilot coding agent", description: "Repository tasks return through pull requests for review." },
			{ href: "https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions", label: "GitHub Actions workflow syntax", description: "Events, permissions, expressions, and execution semantics." },
			{ href: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners", label: "About code owners", description: "File ownership and human review routing." }
		] }
	]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
	title="Agentic Lifecycle Orchestration"
	subtitle="Evidence-Gated Handoffs from Issue to Pull Request"
	:cards='[
		{ value: "Compile", detail: "Prove four candidate sources are compatible before adoption." },
		{ value: "Authorize", detail: "Require one exact maintainer approval for implementation." },
		{ value: "Keep ownership human", detail: "Expose stops and leave merge acceptance with the CODEOWNER." }
	]'
	prompt="Which single handoff will you compile, inspect, and pilot first?"
/>
