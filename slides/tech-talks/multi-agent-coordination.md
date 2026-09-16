---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Multi-Agent Coordination
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Multi-Agent Coordination
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
</script>

# Multi-Agent Coordination
<!-- SLIDE: Title -->
<TitleSlide
	title="Multi-Agent Coordination"
	subtitle="Split, Steer, and Integrate Isolated Workstreams"
	tagline="Create parallel value through explicit contracts and named integration ownership"
	meta="CopilotTraining Tech Talk · 55 minutes · Advanced"
/>

---

# Core Question
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
	question="When should work be split across agents, and how should isolated workstreams be integrated?"
	subtext="Concurrency earns its overhead only when boundaries are stable and combined behavior is observable."
	highlight="Choose the shape, contract the work, then reunify it under one owner."
	:cards='[
		{ icon: "🧑‍💻", title: "Developer", description: "Choose a split that keeps implementation reviewable." },
		{ icon: "👥", title: "Team Lead", description: "Assign ownership, evidence, and escalation before dispatch." },
		{ icon: "🏗️", title: "Architect", description: "Preserve system contracts across concurrent workstreams." },
		{ title: "2 Variables", description: "Coupling plus integration risk determines the coordination shape." },
		{ title: "3 Hosts", description: "One contract briefs subagents, background agents, and Copilot App sessions." },
		{ title: "7 ≠ 14", description: "Integration exposes a client assumption against the accepted contract." }
	]'
/>

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
	subtitle="Choose the Shape → Contract the Work → Isolate and Steer → Integrate"
	:sections='[
		{ icon: "🧭", title: "Choose a Coordination Shape", subtitle: "Decide whether concurrency earns its cost", blurb: "Use coupling and integration risk to record the split decision.", slide: 4 },
		{ icon: "📋", title: "Define Roles and Authority", subtitle: "Turn the split into a portable contract", blurb: "Bound scope, evidence, autonomy, and escalation before dispatch.", slide: 9 },
		{ icon: "🎛️", title: "Isolate and Steer Workstreams", subtitle: "Operate a visible fleet without host lock-in", blurb: "Use the Copilot App while preserving portable workstream contracts.", slide: 14 },
		{ icon: "🔗", title: "Integrate Results Deliberately", subtitle: "Validate combined behavior under one owner", blurb: "Catch divergent assumptions and record the acceptance decision.", slide: 17 }
	]'
/>

---

# Part 1 — Choose a Coordination Shape
<!-- SLIDE: Part 1 — Choose a Coordination Shape -->
<SectionOpenerSlide
	:partNumber="1"
	title="Choose a Coordination Shape"
	subtitle="Use coupling and integration risk to select and record a defensible split."
	:cards='[
		{ icon: "🧩", title: "Coupling", blurb: "Test whether inputs can stabilize first" },
		{ icon: "⚠️", title: "Integration Risk", blurb: "Price the cost of recombining outputs" },
		{ icon: "📝", title: "Recorded Decision", blurb: "Make the topology reviewable" }
	]'
	:terminal='{ context: "Coordination decision", detail: "1 contract decision → 4 concurrent workstreams" }'
/>

---

# Four Coordination Shapes
<!-- SLIDE: Four Coordination Shapes -->
<FrameworkMappingRowsSlide
	:partNumber="1"
	pillIcon="🧭"
	pillLabel="Shape · Decision Model"
	title="Four Shapes, Chosen by Coupling and Integration Risk"
	subtitle="Select the least complex topology that preserves reviewable evidence"
	:rows='[
		{ label: "Single stream", description: "One coherent change with one obvious validation path", tag: "high coupling" },
		{ label: "Sequential", description: "Validated artifacts pass forward when dependencies are unresolved", tag: "handoff gates" },
		{ label: "Parallel", description: "Stable inputs and disjoint scopes enable concurrent execution", tag: "low coupling" },
		{ label: "Deliberation", description: "Independent perspectives expose risk before commitment", tag: "high consequence" }
	]'
	footnote="Every workstream must earn its dispatch, review, and merge overhead"
	:progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Two-Variable Test
<!-- SLIDE: The Two-Variable Test -->
<TwoColPairedConceptsSlide
	:partNumber="1"
	pillIcon="⚖️"
	pillLabel="Shape · Split Test"
	title="Can the Work Separate and Reunify Cleanly?"
	:left='{
		header: "Task Coupling",
		icon: "🧩",
		items: [
			{ title: "Stable input", detail: "A stream can proceed without changing upstream output" },
			{ title: "Separate scope", detail: "Concurrent writers do not share mutable files or state" },
			{ title: "Reviewable output", detail: "The artifact can be judged independently" }
		]
	}'
	:right='{
		header: "Integration Risk",
		icon: "⚠️",
		items: [
			{ title: "Contract sensitivity", detail: "Shared interfaces can drift across streams" },
			{ title: "Combined proof", detail: "Integrated behavior needs an observable check" },
			{ title: "Acceptance owner", detail: "One authority can resolve and accept the result" }
		]
	}'
	:progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Record the Shape
<!-- SLIDE: Record the Shape -->
<CodeWithFeaturesSlide
	:partNumber="1"
	pillIcon="📝"
	pillLabel="Shape · Artifact"
	title="coordination-shape.md Makes the Split Reviewable"
	codePosition="left"
	:code='{ language: "markdown", filename: "coordination-shape.md", content: "# Coordination Shape\n\n## Candidate task\nReplace the session-token format.\n\n## Coupling check\nContract decision precedes all writers.\n\n## Selected shape\n1. Sequential: approve token contract\n2. Parallel: server, client, threat review, migration tests\n3. Sequential: integrate and validate\n\n## Split test\nStable input, separate scope, reviewable output, named evidence" }'
	:features='[
		{ icon: "🔒", title: "Freeze the Contract", description: "Resolve the token decision before concurrent implementation." },
		{ icon: "✂️", title: "Split by Dependency", description: "Give each stream a stable input and disjoint writable scope." },
		{ icon: "✅", title: "Name the Proof", description: "Record evidence and the acceptance owner before dispatch." }
	]'
	:progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Hybrid Shape
<!-- SLIDE: The Hybrid Shape -->
<MaturityJourneyRoadmapSlide
	:partNumber="1"
	pillIcon="🔀"
	pillLabel="Shape · Hybrid Flow"
	title="One Sequential Decision Unlocks Four Concurrent Streams"
	subtitle="Parallelism begins only after the shared token contract stabilizes"
	:stages='[
		{ label: "1", name: "Approve Contract", description: "Decide token behavior and compatibility window", icon: "📜", isTarget: false },
		{ label: "2", name: "Run Four Streams", description: "Server, client, threat review, and migration tests", icon: "⚡", isTarget: true },
		{ label: "3", name: "Integrate", description: "Merge in dependency order and verify combined behavior", icon: "🔗", isTarget: false }
	]'
	caption="A multi-agent plan can preserve sequencing where dependency demands it"
	:progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Define Roles, Handoffs, and Authority
<!-- SLIDE: Part 2 — Define Roles, Handoffs, and Authority -->
<SectionOpenerSlide
	:partNumber="2"
	title="Define Roles, Handoffs, and Authority"
	subtitle="Carry scope, evidence, autonomy, and escalation in one portable contract."
	:cards='[
		{ icon: "🎯", title: "Bounded Objective", blurb: "Name the output and writable scope" },
		{ icon: "🧪", title: "Evidence", blurb: "Define acceptance before execution" },
		{ icon: "🛡️", title: "Authority", blurb: "Separate execution from approval" }
	]'
	:terminal='{ context: "coordination-contract.yml", detail: "One brief · three hosts · named acceptance owner" }'
/>

---

# The Portable Workstream Block
<!-- SLIDE: The Portable Workstream Block -->
<CodeWithFeaturesSlide
	:partNumber="2"
	pillIcon="📋"
	pillLabel="Contract · Workstream"
	title="One Workstream Block Carries the Decisive Context"
	codePosition="left"
	:code='{ language: "yaml", filename: "coordination-contract.yml", content: "- id: client\n  role: implementer\n  dependsOn: [contract-approved]\n  writableScope:\n    - src/client/**\n    - tests/client/**\n  output: Client adoption of token v2\n  evidence: npm test -- client\n  autonomy: plan\n  escalateWhen: >\n    Backward compatibility cannot be preserved" }'
	:features='[
		{ icon: "🎯", title: "Objective and Input", description: "The accepted contract removes hidden context." },
		{ icon: "📁", title: "Writable Scope", description: "Paths make ownership and collision risk explicit." },
		{ icon: "🧪", title: "Evidence and Stop", description: "A command proves the return; escalation bounds autonomy." }
	]'
	:progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Contract Fields That Matter
<!-- SLIDE: Contract Fields That Matter -->
<FourCardGridSlide
	:partNumber="2"
	pillIcon="📦"
	pillLabel="Contract · Minimum Brief"
	title="A Role Label Is Not a Coordination Contract"
	:cards='[
		{ icon: "🎯", title: "Objective", description: "Name the output, decisive inputs, and explicit non-goals." },
		{ icon: "📁", title: "Scope", description: "Bound writable paths, tools, runtime, and shared state." },
		{ icon: "🧪", title: "Evidence", description: "Require a test, artifact, or finding tied to acceptance." },
		{ icon: "🚨", title: "Escalation", description: "Stop when assumptions, public contracts, or compatibility change." }
	]'
	:progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Session Modes Shape Execution
<!-- SLIDE: Session Modes Shape Execution -->
<ThreeColumnCardSlide
	:partNumber="2"
	pillIcon="🎚️"
	pillLabel="Authority · Session Mode"
	title="Match Session Autonomy to Workstream Stability"
	:columns='[
		{ icon: "💬", title: "Interactive", description: "Explore when scope or approach can change.", items: ["Approve consequential decisions as they appear"] },
		{ icon: "🗺️", title: "Plan", description: "Review design before stable implementation begins.", items: ["Approve the plan before execution"] },
		{ icon: "⚙️", title: "Autopilot", description: "Run routine work with mechanical validation.", items: ["Review the returned artifact and evidence"] }
	]'
	:progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Execution Is Not Acceptance
<!-- SLIDE: Execution Is Not Acceptance -->
<TwoColPairedConceptsSlide
	:partNumber="2"
	pillIcon="🛡️"
	pillLabel="Authority · Ownership"
	title="Session Mode Does Not Grant Merge Authority"
	:left='{
		header: "Agent Execution Authority",
		icon: "🤖",
		items: [
			"Propose a plan within the objective",
			"Implement inside the writable scope",
			"Run named validation commands",
			"Report evidence and changed assumptions"
		]
	}'
	:right='{
		header: "Human Acceptance Authority",
		icon: "👤",
		items: [
			"Redirect or reject a workstream",
			"Resolve cross-stream conflicts",
			"Accept combined behavior",
			"Merge through repository policy"
		]
	}'
	:insight='{ icon: "🔐", text: "Branch protection and named reviewers retain organizational authority." }'
	:progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Isolate and Steer Workstreams
<!-- SLIDE: Part 3 — Isolate and Steer Workstreams -->
<SectionOpenerSlide
	:partNumber="3"
	title="Isolate and Steer Workstreams"
	subtitle="Use sufficient isolation and fleet state to make timely operator decisions."
	:cards='[
		{ icon: "🌿", title: "Isolation", blurb: "Match the boundary to collision risk" },
		{ icon: "📡", title: "Fleet State", blurb: "Observe work before intervening" },
		{ icon: "🚦", title: "Steering", blurb: "Act on explicit decision triggers" }
	]'
	:terminal='{ context: "GitHub Copilot App fleet", detail: "Visible operation · portable coordination contract" }'
/>

---

# Use the Smallest Sufficient Isolation
<!-- SLIDE: Use the Smallest Sufficient Isolation -->
<FrameworkMappingRowsSlide
	:partNumber="3"
	pillIcon="🌿"
	pillLabel="Isolation · Layers"
	title="Isolation Reduces Interference, Not Integration Work"
	subtitle="Add layers according to the collision and consequence risk"
	:rows='[
		{ label: "Context", description: "Subagents protect focus; shared files can still collide", tag: "subagent" },
		{ label: "Tools", description: "Custom roles bound actions; allowed tools still affect state", tag: "custom agent" },
		{ label: "Files", description: "Writable scopes separate edits; shared contracts can drift", tag: "path scope" },
		{ label: "Worktree", description: "Branches isolate directories; merge conflicts remain", tag: "background" },
		{ label: "Runtime", description: "Sandboxes isolate processes; environments can diverge", tag: "sandbox" }
	]'
	footnote="Choose the lowest layer that controls the actual risk"
	:progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Operate the Fleet
<!-- SLIDE: Operate the Fleet -->
<FrameworkMappingRowsSlide
	:partNumber="3"
	pillIcon="🎛️"
	pillLabel="Copilot App · Fleet State"
	title="Six Questions Turn Fleet State into Operator Decisions"
	subtitle="The GitHub Copilot App is the visible surface; the questions remain portable"
	:rows='[
		{ label: "Ownership", description: "Which workstream owns this output?", tag: "assign" },
		{ label: "State", description: "Is it planned, running, blocked, ready, or rejected?", tag: "observe" },
		{ label: "Assumption", description: "Which accepted premise changed?", tag: "compare" },
		{ label: "Evidence", description: "What artifact or validation has arrived?", tag: "inspect" },
		{ label: "Intervention", description: "Which stream needs human input now?", tag: "steer" },
		{ label: "Dependency", description: "What must arrive before integration advances?", tag: "sequence" }
	]'
	footnote="The same contract steers subagents, background agents, and worktrees"
	:progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Integrate Results Deliberately
<!-- SLIDE: Part 4 — Integrate Results Deliberately -->
<SectionOpenerSlide
	:partNumber="4"
	title="Integrate Results Deliberately"
	subtitle="Reunify returned evidence, resolve divergence, and record acceptance under one owner."
	:cards='[
		{ icon: "📦", title: "Returned Evidence", blurb: "Inspect outputs before combining" },
		{ icon: "🔍", title: "Contract Check", blurb: "Expose assumptions at the boundary" },
		{ icon: "✅", title: "Acceptance", blurb: "Record proof and the owner&#39;s decision" }
	]'
	:terminal='{ context: "integration-record.md", detail: "7-day assumption ≠ 14-day accepted contract" }'
/>

---

# Returned Evidence Looks Ready
<!-- SLIDE: Returned Evidence Looks Ready -->
<ThreeColumnCardSlide
	:partNumber="4"
	pillIcon="📦"
	pillLabel="Integration · Returns"
	title="Three Green Workstreams Still Need One Consistency Check"
	:columns='[
		{ icon: "🖥️", title: "Server · PR #412", description: "Dual-read support for token v1 and v2.", items: ["npm test -- auth passes", "Status: ready"] },
		{ icon: "📱", title: "Client · PR #415", description: "Client writer adopts token v2.", items: ["npm test -- client passes", "Status: ready"] },
		{ icon: "🔐", title: "Threat Review", description: "Findings mapped to the accepted contract.", items: ["0 blockers, 2 accepted notes", "Status: ready"] }
	]'
	:progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The Observable Mismatch
<!-- SLIDE: The Observable Mismatch -->
<HeroStatSlide
	:partNumber="4"
	pillIcon="🔍"
	pillLabel="Integration · Consistency Gate"
	title="Locally Green, Contractually Inconsistent"
	subtitle="The integration record compares assumptions before merge"
	:hero='{ value: "7 ≠ 14", label: "days in the client assumption versus the accepted contract", source: "Source: integration-record.md" }'
	:supporting='[
		{ icon: "📜", title: "Accepted Contract", description: "Compatibility window: fourteen days." },
		{ icon: "📱", title: "Client Return", description: "A constant encoded a seven-day window." },
		{ icon: "🧪", title: "Why Tests Passed", description: "Scoped client tests validated local behavior, not shared intent." }
	]'
	:insight='{ icon: "⚠️", text: "Integration caught a semantic conflict that isolated evidence could not reveal." }'
	:progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Resolve and Rerun
<!-- SLIDE: Resolve and Rerun -->
<CodeWithFeaturesSlide
	:partNumber="4"
	pillIcon="🛠️"
	pillLabel="Integration · Resolution"
	title="integration-record.md Turns Divergence into a Decision"
	codePosition="left"
	:code='{ language: "markdown", filename: "integration-record.md", content: "## Conflict resolution\n- Client assumed a seven-day compatibility window.\n- Accepted contract requires fourteen days.\n- Resolution: update the client constant.\n- Rerun client tests before merge.\n\n## Integration order\n1. Merge server dual-read support.\n2. Merge corrected client writer.\n3. Run combined suite and migration smoke test.\n\n## Decision\nAccepted by platform-lead." }'
	:features='[
		{ icon: "🔎", title: "Compare", description: "Check every return against the same accepted contract." },
		{ icon: "🔧", title: "Correct", description: "Update the client constant from seven to fourteen days." },
		{ icon: "🔁", title: "Rerun", description: "Repeat scoped and combined checks on the corrected state." }
	]'
	:progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Five Integration Gates
<!-- SLIDE: Five Integration Gates -->
<FrameworkMappingRowsSlide
	:partNumber="4"
	pillIcon="✅"
	pillLabel="Integration · Acceptance"
	title="One Named Integrator Owns Coherence"
	subtitle="Acceptance depends on the integrated state and a recorded authority decision"
	:rows='[
		{ label: "Complete", description: "Every required artifact and evidence item arrived", tag: "all returns" },
		{ label: "Consistent", description: "All streams used the same contracts and assumptions", tag: "7 → 14 days" },
		{ label: "Compatible", description: "Interfaces and migrations compose in dependency order", tag: "ordered merge" },
		{ label: "Combined", description: "Suite and migration smoke test pass after integration", tag: "integrated proof" },
		{ label: "Authority", description: "The platform lead records accept, redirect, or reject", tag: "human decision" }
	]'
	footnote="Failed integration improves the next split decision: reduce overlap or move shared decisions earlier"
	:progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<!-- SLIDE: Before/After -->
<BeforeAfterSlide
	header="From Parallel Activity to Coordinated Delivery"
	:leftItems='[
		"Split work because parallelism looks faster",
		"Let each session infer its own boundaries",
		"Track activity without decision triggers",
		"Discover contract drift during merge"
	]'
	:rightItems='[
		"Use coupling and integration risk to choose the shape",
		"Dispatch one portable coordination contract",
		"Steer visible fleet state through named authority",
		"Validate combined behavior in an integration record"
	]'
	:metrics='[
		{ value: "1 → 4", detail: "Contract decision unlocks concurrent workstreams" },
		{ value: "3 hosts", detail: "One portable workstream contract" },
		{ value: "7 ≠ 14", detail: "Divergent assumptions caught before merge" }
	]'
/>

---

# What You Can Do Today
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
	:today='[
		"Try: score one backlog item for coupling and integration risk",
		"Signal: record one topology and why each stream can proceed",
		"Validate: ask a reviewer to find unresolved dependencies"
	]'
	:thisWeek='[
		"Build: contract two read-only specialist workstreams",
		"Signal: each returns its artifact without hidden cross-context",
		"Validate: map every accepted claim to returned evidence"
	]'
	:thisMonth='[
		"Pilot: dispatch two low-risk isolated implementation streams",
		"Measure: scope adherence, local proof, and integration effort",
		"Pause: return to sequential work when shared assumptions drift"
	]'
	footer="Parallel work creates value only when its contracts and combined behavior remain observable."
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
	:groups='[
		{ title: "🤖 Agent Operating Surfaces", color: "cyan", items: [
			{ href: "https://code.visualstudio.com/docs/copilot/agents/subagents", label: "Subagents in VS Code", description: "Isolated context, parallel delegation, and result return." },
			{ href: "https://code.visualstudio.com/docs/copilot/customization/custom-agents", label: "Custom agents in VS Code", description: "Focused roles, tools, invocation, and handoffs." },
			{ href: "https://code.visualstudio.com/docs/copilot/agents/background-agents", label: "Background agents in VS Code", description: "Asynchronous execution in isolated workspaces." },
			{ href: "https://git-scm.com/docs/git-worktree", label: "Git worktree reference", description: "Independent working trees sharing one repository." }
		] },
		{ title: "🎛️ Fleet Operation", color: "purple", items: [
			{ href: "https://docs.github.com/en/copilot/concepts/agents/github-copilot-app", label: "About the GitHub Copilot app", description: "Multi-session work, operating controls, and review surfaces." },
			{ href: "https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started", label: "Getting started with the Copilot app", description: "Current setup and first-session workflow." },
			{ href: "https://code.visualstudio.com/updates/v1_109#_agent-orchestration", label: "VS Code agent orchestration", description: "Orchestration and session-management release baseline." }
		] }
	]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
	title="Multi-Agent Coordination"
	subtitle="Split, steer, and integrate isolated workstreams"
	:cards='[
		{ value: "Choose", detail: "Use coupling and integration risk before dispatch." },
		{ value: "Contract", detail: "Carry scope, evidence, autonomy, and escalation across hosts." },
		{ value: "Integrate", detail: "Let one owner validate combined behavior and accept the result." }
	]'
	prompt="Where would a concurrent split improve your work, and what evidence would make it safe to reunify?"
/>
