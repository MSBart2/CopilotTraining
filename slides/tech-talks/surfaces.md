---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Which Copilot Where?
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Which Copilot Where?
mdc: true
section: Choose and Configure
status: active
updated: 2026-09-14
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
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ControlExecutionMatrixSlide from './components/ControlExecutionMatrixSlide.vue'
import SurfaceDecisionTreeSlide from './components/SurfaceDecisionTreeSlide.vue'
</script>

# Title
<!-- SLIDE: Title -->
<TitleSlide
	title="Which Copilot Where?"
	subtitle="A Practical Surface Router"
	tagline="Route eligible work by decisive context, review ownership, and the capability the team needs next."
	meta="CopilotTraining · Practitioner Tech Talk"
/>

---

# Core Question
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
	question="Which Copilot surface should own this work next?"
	subtext="Start where the decisive context and controls already live."
	highlight="Route by context, artifact, reviewer, and handoff."
	:cards='[
		{ icon: "🧑‍💻", title: "Developer", description: "Choose the surface that keeps implementation context close." },
		{ icon: "🧭", title: "Product + Docs", description: "Explore, shape, and delegate without beginning in an IDE." },
		{ icon: "🧪", title: "Test + Design", description: "Review evidence and move beside the implementation only when needed." },
		{ title: "1 shared map", description: "See local, GitHub, remote, and embedded execution." },
		{ title: "4 outcome branches", description: "Route without memorizing product names." },
		{ title: "A first win", description: "Onboard each role through useful, reviewed work." }
	]'
/>

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
	:sections='[
		{ icon: "🗺️", title: "Map the Surfaces", subtitle: "See what each surface does", blurb: "Compare seven experiences and their best-fit work.", slide: 4 },
		{ icon: "🎯", title: "Start by Role", subtitle: "Choose a useful first task", blurb: "Onboard every discipline through reviewed outcomes.", slide: 13 },
		{ icon: "📈", title: "Build Adoption Maturity", subtitle: "Advance through evidence", blurb: "Turn usage signals into reviewed capability growth.", slide: 17 },
		{ icon: "🔗", title: "Compose the Surfaces", subtitle: "Design visible handoffs", blurb: "Walk a production incident across changing boundaries.", slide: 20 }
	]'
/>

---

# Part 1 — Map the Surfaces
<!-- SLIDE: Part 1 — Map the Surfaces -->
<SectionOpenerSlide
	:partNumber="1"
	title="Map the Surfaces"
	subtitle="Separate where you steer from where work happens, then route with four questions."
	:cards='[
		{ icon: "🕹️", title: "Control", blurb: "Where do you steer?" },
		{ icon: "⚙️", title: "Execution", blurb: "Where do tools run?" },
		{ icon: "📦", title: "Artifact", blurb: "What comes back?" }
	]'
	:terminal='{ context: "Two independent axes", detail: "control location × execution location" }'
/>

---

# The Copilot Surface Matrix
<!-- SLIDE: The Copilot Surface Matrix -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="🧭"
	pillLabel="Surface Map · Control × Execution"
	title="The Copilot Surface Matrix"
	subtitle="Rows show where you steer · Columns show where execution or analysis happens"
	footnote="Off-diagonal cells are the key: your control surface can steer work somewhere else."
	:progressDots='{ current: 1, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# PM Route
<!-- SLIDE: PM Route -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="🧭"
	pillLabel="Scenario · Product Manager"
	title="PM: Understand → Shape → Delegate"
	subtitle="Stay in GitHub: learn the repository, define acceptance, then hand off a bounded issue"
	:scenario='{ role: "Product manager", outcome: "Evidence-backed issue + draft pull request", steps: [
		{ row: "GitHub.com", column: "github", item: "Chat", step: 1 },
		{ row: "GitHub.com", column: "github", item: "Coding agent", step: 2 }
	] }'
	:progressDots='{ current: 2, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Docs Route
<!-- SLIDE: Docs Route -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="📝"
	pillLabel="Scenario · Documentation"
	title="Docs: Discover → Draft → Refine"
	subtitle="Use repository context before editing; keep editorial acceptance with the docs owner"
	:scenario='{ role: "Docs specialist", outcome: "Verified documentation pull request", steps: [
		{ row: "GitHub.com", column: "github", item: "Chat", step: 1 },
		{ row: "GitHub.com", column: "github", item: "Coding agent", step: 2 },
		{ row: "VS Code", column: "local", item: "Agent mode", step: 3 }
	] }'
	:progressDots='{ current: 3, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Designer Route
<!-- SLIDE: Designer Route -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="🎨"
	pillLabel="Scenario · Product Design"
	title="Designer: Explore → Iterate → Review"
	subtitle="Start with implementation facts, then move beside the UI when visual feedback becomes decisive"
	:scenario='{ role: "Product designer", outcome: "Implemented UI change with visual acceptance evidence", steps: [
		{ row: "GitHub.com", column: "github", item: "Chat", step: 1 },
		{ row: "VS Code", column: "local", item: "Agent mode", step: 2 },
		{ row: "GitHub.com", column: "github", item: "Code Review", step: 3 }
	] }'
	:progressDots='{ current: 4, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Platform Operations Route
<!-- SLIDE: Platform Operations Route -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="🏗️"
	pillLabel="Scenario · Platform Operations"
	title="Platform Team: Diagnose → Prove → Encode"
	subtitle="Start in the CLI when runtime state is decisive; move only after the remediation becomes repository work"
	:scenario='{ role: "Platform engineer · SRE · cloud operations", outcome: "Validated diagnosis + reviewable infrastructure change", steps: [
		{ row: "Copilot CLI", column: "remote", item: "Host-local work", step: 1 },
		{ row: "Copilot CLI", column: "local", item: "Interactive", step: 2 },
		{ row: "VS Code", column: "local", item: "Agent mode", step: 3 }
	] }'
	:progressDots='{ current: 5, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Delivery Lead Route
<!-- SLIDE: Delivery Lead Route -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="🎛️"
	pillLabel="Scenario · Delivery Leadership"
	title="Delivery Lead: Dispatch → Monitor → Accept"
	subtitle="Start in the Copilot app when several bounded streams are ready and coordination is the work"
	:scenario='{ role: "Engineering manager · release lead · program lead", outcome: "Coordinated set of reviewed pull requests", steps: [
		{ row: "Copilot app", column: "github", item: "Cloud fleet", step: 1 },
		{ row: "Copilot app", column: "github", item: "PRs + workflows", step: 2 },
		{ row: "GitHub.com", column: "github", item: "Code Review", step: 3 }
	] }'
	:progressDots='{ current: 6, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Embedded Workflow Route
<!-- SLIDE: Embedded Workflow Route -->
<ControlExecutionMatrixSlide
	:partNumber="1"
	pillIcon="🧩"
	pillLabel="Scenario · Embedded Product"
	title="Platform Product Team: Embed the Workflow"
	subtitle="Start with the SDK when Copilot must live behind your trigger, tools, policy, and product experience"
	:scenario='{ role: "Platform engineer · internal tools team · support automation owner", outcome: "Governed agent workflow inside the product", steps: [
		{ row: "Your product", column: "runtime", item: "Copilot SDK", step: 1 }
	] }'
	:progressDots='{ current: 7, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Route by Outcome
<!-- SLIDE: Route by Outcome -->
<SurfaceDecisionTreeSlide
	:partNumber="1"
	pillIcon="🌳"
	pillLabel="Surface Router · Decision Tree"
	title="Route by Outcome, Then by Context"
	subtitle="Your role suggests a first branch; the artifact and decisive context choose the surface"
	root="What must exist when this work is done?"
	:branches='[
		{ icon: "🔎", intent: "Understand or shape", prompt: "Need an explanation, brief, or better issue?", roles: "PM · designer · support", routes: [
			{ condition: "Repository and GitHub context", surface: "GitHub Chat", detail: "Explore without a local checkout" }
		] },
		{ icon: "✅", intent: "Review or accept", prompt: "Need findings or evidence before approval?", roles: "tester · docs · reviewer", routes: [
			{ condition: "PR or changed code", surface: "Code Review", detail: "Find risks; humans accept" }
		] },
		{ icon: "🛠️", intent: "Create or change", prompt: "Where is the context you cannot cheaply recreate?", roles: "developer · platform · docs · design", routes: [
			{ condition: "Files, UI, diagnostics", surface: "VS Code", detail: "Steer interactively" },
			{ condition: "Shell, host, runtime", surface: "Copilot CLI", detail: "Work beside live evidence" },
			{ condition: "Bounded issue", surface: "Coding agent", detail: "Return a draft PR" }
		] },
		{ icon: "📈", intent: "Scale or repeat", prompt: "Are you coordinating work or embedding capability?", roles: "platform · lead · product", routes: [
			{ condition: "Many independent streams", surface: "Copilot app", detail: "Coordinate the fleet" },
			{ condition: "Inside your product", surface: "Copilot SDK", detail: "Own the runtime contract" }
		] }
	]'
	insight="When the artifact or decisive context changes, return to the tree and route the next phase."
	:progressDots='{ current: 8, total: 8, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Start by Role
<!-- SLIDE: Part 2 — Start by Role -->
<SectionOpenerSlide
	:partNumber="2"
	title="Start by Role"
	subtitle="Give every role one useful first task, one reviewable artifact, and one clear handoff."
	:cards='[
		{ icon: "1️⃣", title: "First task", blurb: "Choose low-risk real work" },
		{ icon: "📦", title: "Artifact", blurb: "Produce something reviewable" },
		{ icon: "➡️", title: "Handoff", blurb: "Move when context changes" }
	]'
	:terminal='{ context: "Role-based onboarding", detail: "First win → evidence → next surface" }'
/>

---

# PM and Docs Onboarding
<!-- SLIDE: PM and Docs Onboarding -->
<TwoColPairedConceptsSlide
	:partNumber="2"
	pillIcon="🧭"
	pillLabel="Onboarding · Shape the Work"
	title="First Wins for PM and Documentation"
	:left='{ header: "Product manager · GitHub Chat", icon: "🧭", items: [
		{ title: "First task", detail: "Map an unfamiliar feature from repository evidence" },
		{ title: "Ask", detail: "Explain behavior, dependencies, open issues, and user impact" },
		{ title: "Keep", detail: "A cited brief plus acceptance criteria for one bounded issue" },
		{ title: "Move when", detail: "The issue is ready: coding agent returns a draft PR" }
	] }'
	:right='{ header: "Docs specialist · Chat → agent", icon: "📝", items: [
		{ title: "First task", detail: "Find docs made stale by one merged product change" },
		{ title: "Ask", detail: "Identify affected pages, source evidence, and examples" },
		{ title: "Keep", detail: "A verified docs PR reviewed by the documentation owner" },
		{ title: "Move when", detail: "Tone or structure needs judgment: refine in VS Code" }
	] }'
	:progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Test and Design Onboarding
<!-- SLIDE: Test and Design Onboarding -->
<TwoColPairedConceptsSlide
	:partNumber="2"
	pillIcon="✅"
	pillLabel="Onboarding · Validate the Work"
	title="First Wins for Test and Design"
	:left='{ header: "Tester · Code Review", icon: "🧪", items: [
		{ title: "First task", detail: "Review one bounded PR for missing tests and edge cases" },
		{ title: "Ask", detail: "Focus on changed behavior, failure paths, and test evidence" },
		{ title: "Keep", detail: "Findings plus a human acceptance or rejection decision" },
		{ title: "Move when", detail: "A finding needs reproduction: use VS Code or CLI" }
	] }'
	:right='{ header: "Designer · Chat → VS Code", icon: "🎨", items: [
		{ title: "First task", detail: "Trace one interface from design intent to implementation" },
		{ title: "Ask", detail: "Locate components, tokens, states, and accessibility behavior" },
		{ title: "Keep", detail: "An implemented UI change with visual acceptance evidence" },
		{ title: "Move when", detail: "The PR is ready: Code Review checks implementation risk" }
	] }'
	:progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# App and SDK Onboarding
<!-- SLIDE: App and SDK Onboarding -->
<TwoColPairedConceptsSlide
	:partNumber="2"
	pillIcon="🚀"
	pillLabel="Onboarding · Coordinate and Embed"
	title="First Wins for the Copilot App and SDK"
	:left='{ header: "Copilot app · fleet owners", icon: "🎛️", items: [
		{ title: "Who", detail: "Engineering managers, release leads, and program leads" },
		{ title: "First task", detail: "Coordinate three independent, review-ready backlog items" },
		{ title: "Keep", detail: "Visible status, bounded escalation, and a reviewed PR set" },
		{ title: "Do not start here", detail: "When the work still needs discovery or close code steering" }
	] }'
	:right='{ header: "Copilot SDK · product owners", icon: "🧩", items: [
		{ title: "Who", detail: "Platform engineers, internal tools teams, and automation owners" },
		{ title: "First task", detail: "Embed one proven workflow behind a real product trigger" },
		{ title: "Keep", detail: "Structured output, policy controls, telemetry, and escalation" },
		{ title: "Do not start here", detail: "For a one-off task that an existing surface already handles" }
	] }'
	:progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Build Adoption Maturity
<!-- SLIDE: Part 3 — Build Adoption Maturity -->
<SectionOpenerSlide
	:partNumber="3"
	title="Build Adoption Maturity"
	subtitle="Use telemetry to locate the starting point and reviewed capability evidence to advance."
	:cards='[
		{ icon: "📊", title: "Baseline", blurb: "Locate current behavior" },
		{ icon: "🧪", title: "Evidence", blurb: "Review real artifacts" },
		{ icon: "🎚️", title: "Threshold", blurb: "Define quality locally" }
	]'
	:terminal='{ context: "Configurable adoption cadence", detail: "4 phases → reviewed evidence" }'
/>

---

# Four Phases, One Evidence Gate
<!-- SLIDE: Four Phases, One Evidence Gate -->
<MaturityJourneyRoadmapSlide
	:partNumber="3"
	pillIcon="📈"
	pillLabel="Adoption · Capability Roadmap"
	title="Four Phases, One Evidence Gate"
	subtitle="Telemetry locates the start; reviewed outcomes earn advancement"
	:stages='[
		{ label: "0", name: "Activate", description: "Complete one relevant task with human review", icon: "▶️", isTarget: false },
		{ label: "1", name: "Standardize", description: "Make interactive help repeatable and repo-aware", icon: "📏", isTarget: false },
		{ label: "2", name: "Delegate", description: "Deliver one bounded asynchronous artifact", icon: "📨", isTarget: false },
		{ label: "3", name: "Orchestrate", description: "Coordinate independent work as a governed system", icon: "🎛️", isTarget: true }
	]'
	caption="Maturity belongs to a workflow, not permanently to a person."
	:progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The Capability Scorecard
<!-- SLIDE: The Capability Scorecard -->
<FourCardGridSlide
	:partNumber="3"
	pillIcon="📋"
	pillLabel="Adoption · Evidence"
	title="The Capability Scorecard"
	:cards='[
		{ icon: "📍", title: "Baseline", description: "Record recent behavior and the delivered outcome for this workflow." },
		{ icon: "🧾", title: "Reviewed artifacts", description: "Count normal-work outputs accepted by the named reviewer." },
		{ icon: "🛡️", title: "Quality guardrail", description: "Define the local threshold and escalation limit before advancing." },
		{ icon: "🎯", title: "Next-phase target", description: "Name the next capability the team must demonstrate." }
	]'
	:progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Compose the Surfaces
<!-- SLIDE: Part 4 — Compose the Surfaces -->
<SectionOpenerSlide
	:partNumber="4"
	title="Compose the Surfaces"
	subtitle="Walk one production diagnosis across CLI evidence, a VS Code fix, and delegated follow-up."
	:cards='[
		{ icon: "🖥️", title: "Diagnose", blurb: "Collect runtime evidence" },
		{ icon: "🛠️", title: "Fix", blurb: "Change with repo context" },
		{ icon: "☁️", title: "Delegate", blurb: "Continue with review" }
	]'
	:terminal='{ context: "Prepared incident walkthrough", detail: "Evidence → fix → follow-up" }'
/>

---

# Diagnose Where the Runtime Lives
<!-- SLIDE: Diagnose Where the Runtime Lives -->
<AITerminalTranscriptSlide
	:partNumber="4"
	pillIcon="🖥️"
	pillLabel="Incident Walkthrough · CLI"
	title="Diagnose Where the Runtime Lives"
	subtitle="Keep host-local evidence on the affected machine"
	:transcript='[
		{ type: "prompt", text: "copilot" },
		{ type: "user", text: "Inspect the failing process and host-local logs. Do not change code yet." },
		{ type: "thinking", label: "Copilot CLI:" },
		{ type: "response", lines: ["Read process state and recent logs", "Separate the runtime symptom from the repository defect", "Return evidence and a bounded remediation boundary"] },
		{ type: "divider" },
		{ type: "outcome", text: "Runtime evidence stays on the affected host" },
		{ type: "outcome", text: "A repository configuration defect becomes the next artifact" }
	]'
	footerMetric="Control: immediate human steering at the prompt"
	:progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Restore Now, Prevent the Repeat
<!-- SLIDE: Restore Now, Prevent the Repeat -->
<WorkflowShowdownStepsSlide
	:partNumber="4"
	pillIcon="🔗"
	pillLabel="Incident Walkthrough · Recovery + Prevention"
	title="Restore Now, Prevent the Repeat"
	subtitle="The incident ends after the validated fix; prevention is a separate, optional work item"
	leftLabel="Single-surface attempt"
	rightLabel="Composed route"
	:steps='[
		{ left: { label: "Copy logs into the editor", note: "Runtime context is reconstructed" }, right: { label: "Diagnose in CLI", note: "Incident owner reviews host evidence" } },
		{ left: { label: "Change files from the shell", note: "Visual diff and diagnostics are weak" }, right: { label: "Fix and validate in VS Code", note: "Developer reviews the workspace diff" } },
		{ left: { label: "Keep polishing during recovery", note: "Prevention work delays restoration" }, right: { label: "Close the incident", note: "The urgent route ends when service is restored" } },
		{ left: { label: "Skip prevention work", note: "The same failure can return" }, right: { label: "Optionally delegate prevention", note: "Coding agent adds a regression test and runbook update in a separate draft PR" } }
	]'
	:outcomeLeft='{ icon: "↻", label: "Recovery slows or prevention disappears" }'
	:outcomeRight='{ icon: "✓", label: "Service restored + optional prevention PR" }'
	summaryMetric="Coding agent does not redo the fix; it handles bounded follow-up work asynchronously"
	:progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Three Reusable Handoff Patterns
<!-- SLIDE: Three Reusable Handoff Patterns -->
<ThreeColumnCardSlide
	:partNumber="4"
	pillIcon="🔀"
	pillLabel="Composition · Pattern Library"
	title="Three Reusable Handoff Patterns"
	:columns='[
		{ icon: "🔎", title: "Explore → Delegate → Review", description: "A repository question becomes a bounded issue and reviewed PR.", items: ["Chat", "Coding agent", "VS Code"] },
		{ icon: "🛠️", title: "Diagnose → Encode → Productize", description: "An interactive operational proof becomes reusable capability.", items: ["CLI", "VS Code", "SDK"] },
		{ icon: "🌐", title: "Plan → Fan Out → Integrate", description: "Independent tasks move through coordinated sessions to review.", items: ["VS Code or CLI", "Copilot app", "PR review"] }
	]'
	:progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Boundary Signals Tell You When to Move
<!-- SLIDE: Boundary Signals Tell You When to Move -->
<FrameworkMappingRowsSlide
	:partNumber="4"
	pillIcon="🚦"
	pillLabel="Composition · Boundary Signals"
	title="Boundary Signals Tell You When to Move"
	subtitle="Change surfaces only when the work contract changes"
	:rows='[
		{ label: "Local state", description: "Keep uncommitted files, services, and credentials local", tag: "VS Code/CLI" },
		{ label: "Unbounded", description: "Explore and plan before asynchronous delegation", tag: "interactive" },
		{ label: "Repeatable", description: "Evaluate an embedded service for proven event-driven work", tag: "SDK" },
		{ label: "Many streams", description: "Coordinate independent sessions from one control plane", tag: "Copilot app" },
		{ label: "Understand", description: "Use repository context without introducing mutation", tag: "GitHub Chat" }
	]'
	footnote="At every transition: name the artifact, evidence, reviewer, and escalation trigger."
	:progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<!-- SLIDE: Before/After -->
<BeforeAfterSlide
	header="From Tool Choice to Explicit Work Routing"
	:leftItems='[
		"Choose by habit or product familiarity",
		"Move context manually between tools",
		"Leave acceptance ownership implicit",
		"Treat adoption as usage volume"
	]'
	:rightItems='[
		"Choose by execution and decisive context",
		"Move work when a boundary changes",
		"Name the reviewer at every handoff",
		"Advance through reviewed capability evidence"
	]'
	:metrics='[
		{ value: "7", detail: "surface experiences" },
		{ value: "4", detail: "routing questions" },
		{ value: "3", detail: "lifecycle patterns" }
	]'
/>

---

# What You Can Do Today
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
	:today='[
		"Name the decisive context for one task",
		"Identify its delivery artifact",
		"Name the accepting reviewer"
	]'
	:thisWeek='[
		"Test the four routing questions",
		"Document one visible handoff trigger",
		"Review one capability artifact"
	]'
	:thisMonth='[
		"Baseline your team across four phases",
		"Set local quality thresholds",
		"Practice all three lifecycle patterns"
	]'
	footer="Start the work where its strongest context and controls already live."
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
	:groups='[
		{ title: "📖 Official Documentation", color: "cyan", items: [
			{ href: "https://docs.github.com/en/copilot", label: "GitHub Copilot documentation", description: "Product-wide concepts and workflows." },
			{ href: "https://code.visualstudio.com/docs/copilot/overview", label: "GitHub Copilot in VS Code", description: "Editor integrations, chat, and agent workflows." },
			{ href: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli", label: "About GitHub Copilot CLI", description: "Terminal-native capabilities and operating model." },
			{ href: "https://docs.github.com/en/copilot/concepts/agents/code-review", label: "GitHub Copilot Code Review", description: "AI findings for pull requests and changed code." }
		] },
		{ title: "🛠️ Agents and Embedding", color: "purple", items: [
			{ href: "https://docs.github.com/en/copilot/concepts/agents/github-copilot-app", label: "GitHub Copilot app", description: "Desktop session management and coordination." },
			{ href: "https://github.com/github/copilot-sdk", label: "GitHub Copilot SDK", description: "Agent capabilities for applications and services." }
		] }
	]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
	title="Which Copilot Where?"
	subtitle="Route by context. Hand off by boundary. Review by contract."
	:cards='[
		{ value: "7 experiences", detail: "One visible landscape" },
		{ value: "4 questions", detail: "One practical router" },
		{ value: "3 patterns", detail: "One composable lifecycle" }
	]'
	prompt="Which task should your team route differently next?"
/>
