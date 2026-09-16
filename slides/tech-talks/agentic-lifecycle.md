---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: Agentic Lifecycle Orchestration - CopilotTraining Tech Talk
drawings: { persist: false }
transition: slide-left
title: Agentic Lifecycle Orchestration
mdc: true
section: Delegate and Coordinate
status: active
updated: 2026-09-16
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
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
</script>

# Agentic Lifecycle Orchestration
<!-- SLIDE: Title -->
<TitleSlide
	title="Agentic Lifecycle Orchestration"
	subtitle="Evidence-Gated Handoffs from Issue to Pull Request"
	tagline="Make every transition inspectable, authorized, recoverable, and owned"
	meta="CopilotTraining · Practitioner Tech Talk"
/>

---

# Core Question
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
	question="Which recurring repository judgments belong in workflows?"
	subtext="Qualify each handoff by evidence, mutation boundaries, and authority."
	highlight="A candidate lifecycle earns trust only after target-repository validation."
	:cards='[
		{ icon: "🔧", title: "Developer", description: "See where implementation authority begins and stops" },
		{ icon: "👥", title: "Team Lead", description: "Assign owners to evidence-gated handoffs" },
		{ icon: "🛡️", title: "Platform Engineer", description: "Inspect compilation, permissions, and safe outputs" },
		{ title: "4 workflow sources", description: "Candidate phases from intake through review" },
		{ title: "1 exact approval", description: "A fresh plan advances only at an authorized gate" },
		{ title: "0 runtime claims", description: "Transitions remain expected until repository validation" }
	]'
/>

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
	:sections='[
		{ icon: "🧭", title: "Select Judgments", subtitle: "Choose bounded workflow work", blurb: "Separate recurring judgment from deterministic automation", slide: 4 },
		{ icon: "🔎", title: "Visible State", subtitle: "Expose evidence and ownership", blurb: "Narrate issue #482 through inspectable candidate states", slide: 8 },
		{ icon: "🔐", title: "Preserve Authority", subtitle: "Gate mutation and acceptance", blurb: "Compare authorized progress with an expected no-op", slide: 12 },
		{ icon: "📏", title: "Measure and Recover", subtitle: "Keep stops in the system", blurb: "Define local timing, recovery, and pilot evidence", slide: 16 }
	]'
/>

---

# Part 1: Select Workflow-Owned Judgments
<!-- SLIDE: Part 1 — Select Workflow-Owned Judgments -->
<SectionOpenerSlide
	:partNumber="1"
	title="Select Workflow-Owned Judgments"
	subtitle="Qualify each candidate by trigger, permissions, mutation boundaries, compilation, and safe outputs."
	:cards='[
		{ icon: "🎯", title: "Trigger", blurb: "Name the bounded event" },
		{ icon: "🔒", title: "Authority", blurb: "Constrain reads and writes" },
		{ icon: "⚙️", title: "Compile", blurb: "Inspect generated permissions" }
	]'
	:terminal='{ context: "Candidate lifecycle", detail: "4 sources · 0 compiled claims" }'
/>

---

# Four Bounded Judgments
<!-- SLIDE: Four Bounded Judgments -->
<FourCardGridSlide
	:partNumber="1"
	pillIcon="🧭"
	pillLabel="Selection · Candidate phases"
	title="One Decision per Workflow"
	:cards='[{ icon: "📥", title: "Intake", description: "Is one issue specific, non-duplicative, and routable enough to plan?" }, { icon: "📝", title: "Planning", description: "Is the proposed scope executable, testable, reversible, and owned?" }, { icon: "💻", title: "Coding", description: "Was only the latest authorized plan implemented in one repository?" }, { icon: "🔎", title: "Review", description: "Is the evidence ready for deterministic checks and human acceptance?" }]'
	:progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Bound Every Phase
<!-- SLIDE: Bound Every Phase -->
<FrameworkMappingRowsSlide
	:partNumber="1"
	pillIcon="🔒"
	pillLabel="Selection · Five questions"
	title="A Workflow Must Explain Its Authority"
	subtitle="Recurrence alone is not enough"
	:rows='[{ label: "Input", description: "Name the event and repository evidence trusted by this phase", tag: "bounded" }, { label: "Decision", description: "Assign one recurring judgment that cannot be a deterministic step", tag: "owned" }, { label: "Evidence", description: "Emit a durable comment, label, pull request, or review result", tag: "visible" }, { label: "Stop", description: "Stop on missing context, failed checks, drift, or absent authority", tag: "explicit" }, { label: "Recovery", description: "Name the person or team able to supply the next evidence", tag: "routable" }]'
	footnote="Deterministic builds stay in Actions; unbounded judgment stays human-led"
	:progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Compile Before Trust
<!-- SLIDE: Compile Before Trust -->
<CodeWithFeaturesSlide
	:partNumber="1"
	pillIcon="⚙️"
	pillLabel="Selection · Compatibility gate"
	title="Source Intent Is Not Executable Proof"
	codePosition="left"
	:code='{ language: "text", filename: "target repository", content: "1. Copy four .md sources to .github/workflows/\n2. Run: gh aw compile\n3. Inspect four generated .lock.yml files\n4. Commit source and lock files together" }'
	:features='[{ icon: "📄", title: "Candidate source", description: "Markdown records triggers, read access, instructions, and declared safe outputs" }, { icon: "🔐", title: "Generated permissions", description: "Lock files expose the actual jobs and write-capable handlers for review" }, { icon: "🧪", title: "Runtime gate", description: "Only a bounded target-repository run can validate transition behavior" }]'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2: Make the State Machine Visible
<!-- SLIDE: Part 2 — Make the State Machine Visible -->
<SectionOpenerSlide
	:partNumber="2"
	title="Make the State Machine Visible"
	subtitle="Follow issue #482 from intake evidence to a bounded plan and stop at the approval gate."
	:cards='[
		{ icon: "📥", title: "Intake", blurb: "Evidence qualifies entry" },
		{ icon: "📝", title: "Plan", blurb: "Scope and rollback stay visible" },
		{ icon: "⛔", title: "Stop", blurb: "Approval blocks mutation" }
	]'
	:terminal='{ context: "Narrated candidate walkthrough", detail: "Issue #482 · evidence before transition" }'
/>

---

# The Visible Contract
<!-- SLIDE: The Visible Contract -->
<FrameworkMappingRowsSlide
	:partNumber="2"
	pillIcon="🔎"
	pillLabel="State · Handoff contract"
	title="A Label Shows State; Evidence Permits Motion"
	subtitle="Stop labels take precedence over accumulated success milestones"
	:rows='[{ label: "Intake", description: "Issue input produces intake evidence or a visible stop", tag: "triaged" }, { label: "Planning", description: "Intake evidence produces a bounded plan or a visible stop", tag: "planned" }, { label: "Coding", description: "Fresh plan plus authorized approval produces one draft PR", tag: "in-review" }, { label: "Review", description: "Plan, approval, diff, and checks produce advisory evidence", tag: "reviewed" }]'
	footnote="State + required evidence + next-owner authority must agree"
	:progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Issue 482 Enters the Candidate Lifecycle
<!-- SLIDE: Issue 482 Enters the Candidate Lifecycle -->
<AITerminalTranscriptSlide
	:partNumber="2"
	pillIcon="🎙️"
	pillLabel="State · Narrated candidate"
	title="Issue #482: Intake Produces Planning Evidence"
	subtitle="A walkthrough of intended artifacts, not an executed workflow"
	:transcript='[{ type: "prompt", text: "candidate walkthrough: issue #482" }, { type: "user", text: "Issue arrives with acceptance criteria" }, { type: "thinking", label: "Narrator:" }, { type: "response", lines: ["Intake checks specificity, duplicates, and routing", "Evidence names inspected issue fields and repository paths", "A stop records needs-input or blocked with a recovery owner"] }, { type: "divider" }, { type: "response", lines: ["Expected pass artifact: structured intake comment", "Expected milestone: lifecycle:triaged", "Next owner: issue triage owner"] }]'
	footerMetric="Candidate narration · no gh-aw workflow executed"
	:progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Issue 482 Becomes a Reviewable Plan
<!-- SLIDE: Issue 482 Becomes a Reviewable Plan -->
<CodeWithFeaturesSlide
	:partNumber="2"
	pillIcon="📝"
	pillLabel="State · Planning evidence"
	title="The Plan Ends at the Approval Block"
	codePosition="left"
	:code='{ language: "markdown", filename: "issue #482 · candidate plan", content: "## Scope\n- Named files and bounded change\n## Exclusions\n- Work outside the issue contract\n## Validation\n- Exact repository commands and signals\n## Rollback\n- Revert the bounded pull request\n## Approval\nNamed plan approver: @maintainer\nComment exactly /approve-plan" }'
	:features='[{ icon: "📐", title: "Bounded scope", description: "Files, exclusions, validation, risk, and rollback remain inspectable" }, { icon: "👤", title: "Named authority", description: "The planned label records a milestone; it does not approve work" }, { icon: "⛔", title: "Consequential stop", description: "Coding authority begins only after a fresh plan and exact authorized command" }]'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3: Preserve Authority from Approval to Merge
<!-- SLIDE: Part 3 — Preserve Authority from Approval to Merge -->
<SectionOpenerSlide
	:partNumber="3"
	title="Preserve Authority Through Merge"
	subtitle="Compare the authorized path with an expected no-op, then retain human merge acceptance."
	:cards='[
		{ icon: "✅", title: "Approve", blurb: "One exact command advances" },
		{ icon: "🚫", title: "No-op", blurb: "Unauthorized state stays put" },
		{ icon: "👤", title: "Accept", blurb: "CODEOWNER retains merge" }
	]'
	:terminal='{ context: "Expected behavior until validation", detail: "Authority changes state · requests do not" }'
/>

---

# Approval Carries Authority
<!-- SLIDE: Approval Carries Authority -->
<WorkflowShowdownStepsSlide
	:partNumber="3"
	pillIcon="🔐"
	pillLabel="Authority · Expected transition"
	title="The Same Command, Different Authority"
	subtitle="Both paths remain expected until exercised in a target repository"
	leftLabel="Unauthorized requester"
	rightLabel="Named maintainer"
	:steps='[{ left: { label: "Posts /approve-plan", note: "Actor lacks repository approval authority" }, right: { label: "Posts /approve-plan", note: "Actor is the named authorized maintainer" } }, { left: { label: "Gate checks evidence", note: "Plan exists but actor authority fails" }, right: { label: "Gate checks evidence", note: "Latest plan, command, freshness, and authority agree" } }, { left: { label: "Repository stays put", note: "No partial implementation or state transition" }, right: { label: "Coding may begin", note: "Only the approved plan receives implementation authority" } }]'
	:outcomeLeft='{ icon: "0", label: "Expected no-op; repository state unchanged" }'
	:outcomeRight='{ icon: "1", label: "Expected transition into bounded coding" }'
	summaryMetric="Candidate behavior · target-repository validation required"
	:progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# One Draft Pull Request
<!-- SLIDE: One Draft Pull Request -->
<CodeWithFeaturesSlide
	:partNumber="3"
	pillIcon="📦"
	pillLabel="Authority · Safe output"
	title="Coding Returns Evidence, Not Merge Authority"
	codePosition="left"
	:code='{ language: "yaml", filename: "candidate source declaration", content: "safe-outputs:\n  create-pull-request:\n    title-prefix: [lifecycle]\n    labels:\n      - agent-generated\n      - lifecycle:in-review\n    draft: true\n    max: 1" }'
	:features='[{ icon: "1", title: "One bounded PR", description: "The declared output caps creation at one draft pull request" }, { icon: "🧾", title: "Evidence payload", description: "Issue, approval URL, changed files, commands, results, and owner travel together" }, { icon: "⛔", title: "Stop on drift", description: "Failed checks, stale approval, unavailable environment, or scope expansion block coding" }]'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Review Advises; Humans Accept
<!-- SLIDE: Review Advises; Humans Accept -->
<TwoColPairedConceptsSlide
	:partNumber="3"
	pillIcon="👤"
	pillLabel="Authority · Acceptance boundary"
	title="Reviewed Does Not Mean Merge Permitted"
	:left='{ header: "Workflow evidence", icon: "🔎", items: [{ title: "COMMENT", detail: "Reports findings without submitting APPROVE" }, "Maps acceptance criteria to the diff", "Inspects deterministic check results", "Routes drift, defects, and missing evidence"] }'
	:right='{ header: "Repository authority", icon: "🛡️", items: [{ title: "Deterministic gates", detail: "Tests, rulesets, and security controls remain enforced" }, "CODEOWNER or named reviewer accepts residual risk", "Human can return work to coding or planning", "Configured merge policy makes the final gate"] }'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4: Measure the Handoffs Locally
<!-- SLIDE: Part 4 — Measure the Handoffs Locally -->
<SectionOpenerSlide
	:partNumber="4"
	title="Measure the Handoffs Locally"
	subtitle="Keep stopped runs in the denominator, assign recovery owners, and pilot one handoff."
	:cards='[
		{ icon: "⏱️", title: "Timing", blurb: "Define clocks locally" },
		{ icon: "🧾", title: "Ledger", blurb: "Record stop and owner" },
		{ icon: "🧪", title: "Pilot", blurb: "Validate before expansion" }
	]'
	:terminal='{ context: "First adoption actions", detail: "Compile · inspect permissions · pilot" }'
/>

---

# Define the Local Clocks
<!-- SLIDE: Define the Local Clocks -->
<FrameworkMappingRowsSlide
	:partNumber="4"
	pillIcon="⏱️"
	pillLabel="Measurement · Timing definitions"
	title="Measure Handoffs with Repository Timestamps"
	subtitle="Report medians, sample sizes, and quality companions"
	:rows='[{ label: "Intake", description: "Issue creation to intake marker; track routing corrections", tag: "created→intake" }, { label: "Planning", description: "Intake pass to plan marker; track revision and scope drift", tag: "intake→plan" }, { label: "Coding", description: "Authorized approval to draft PR; track checks and deviations", tag: "approve→PR" }, { label: "Review", description: "PR sync to review marker; track changes and escaped defects", tag: "sync→review" }]'
	footnote="Stopped runs stay in the denominator"
	:progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Recover, Compile, Pilot
<!-- SLIDE: Recover, Compile, Pilot -->
<ThreeColumnCardSlide
	:partNumber="4"
	pillIcon="🧪"
	pillLabel="Measurement · Adoption sequence"
	title="Evidence Before Expansion"
	:columns='[{ icon: "🧾", title: "Record recovery", description: "For every stop, capture phase, reason, owner, resume evidence, and disposition" }, { icon: "⚙️", title: "Compile and inspect", description: "Compile all four sources; reject schema mismatch or undeclared generated write access" }, { icon: "🔬", title: "Pilot one handoff", description: "Exercise authorized and unauthorized paths in a low-risk target repository" }]'
	:progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<!-- SLIDE: Before/After -->
<BeforeAfterSlide
	header="From Implicit Handoffs to an Inspectable Candidate Lifecycle"
	:leftItems='["Repository judgment mixed with deterministic automation", "Transitions inferred from comments and labels", "Mutation authority unclear at each phase", "Failures disappear outside the workflow story"]'
	:rightItems='["Four bounded sources expose phase ownership", "Required evidence agrees before state advances", "Approval and merge acceptance stay human-owned", "Blocked state names evidence and recovery owner"]'
	:metrics='[{ value: "4", detail: "candidate workflow sources" }, { value: "1", detail: "exact authorized approval command" }, { value: "0", detail: "runtime claims before validation" }]'
/>

---

# What You Can Do Today
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
	:today='["Inventory recurring repository judgments", "Name evidence and authority for each transition", "Keep issue #482 framed as a candidate walkthrough"]'
	:thisWeek='["Compile all four workflow sources", "Inspect generated permissions and safe outputs", "Review instructions with the platform owner"]'
	:thisMonth='["Pilot one handoff in a target repository", "Exercise authorized and unauthorized transitions", "Expand only from observed evidence"]'
	footer="Compilation and generated-permission inspection come before any runtime claim."
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
	:groups='[{ title: "GitHub Agentic Workflows", color: "cyan", items: [{ href: "https://github.github.com/gh-aw/introduction/overview/", label: "Overview", description: "Markdown workflow model and core concepts" }, { href: "https://github.github.com/gh-aw/introduction/how-they-work/", label: "How workflows work", description: "Compilation, lock files, execution, and audit markers" }, { href: "https://github.github.com/gh-aw/introduction/architecture/", label: "Security architecture", description: "Read-only reasoning and isolated write handling" }, { href: "https://github.github.com/gh-aw/reference/safe-outputs/", label: "Safe outputs", description: "Constrained repository output types and validation" }] }, { title: "Repository governance", color: "purple", items: [{ href: "https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent", label: "Copilot coding agent", description: "Repository tasks delivered through pull requests" }, { href: "https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions", label: "Actions workflow syntax", description: "Events, permissions, expressions, and execution" }, { href: "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners", label: "CODEOWNERS", description: "File ownership and review routing" }] }]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
	title="Agentic Lifecycle Orchestration"
	subtitle="Evidence-Gated Handoffs from Issue to Pull Request"
	:cards='[{ value: "Inspect", detail: "State, evidence, and authority must agree" }, { value: "Authorize", detail: "One exact approval advances a fresh plan" }, { value: "Recover", detail: "Blocked work retains evidence and an owner" }]'
	prompt="Which single handoff should your repository compile and validate first?"
/>