---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: "Copilot Context Engineering — CopilotTraining Tech Talk"
drawings: { persist: false }
transition: slide-left
title: Copilot Context Engineering
mdc: true
section: Choose and Configure
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
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>

# Copilot Context Engineering
<!-- SLIDE: Title -->
<TitleSlide
	title="Copilot Context Engineering"
	subtitle="Place Context, Inspect Delivery, Prove Compliance"
	tagline="Give every context rule an owner, an evidence path, and an approval boundary"
	meta="CopilotTraining · Practitioner Tech Talk"
/>

---

# Core Question
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
	question="Where should Copilot context live, and how do we prove it shaped the work?"
	subtext="Placement assigns authority. Diagnostics reveal delivery."
	highlight="Executable checks and owner approval prove compliance."
	:cards='[
		{ icon: "🧑‍💻", title: "Developer", description: "Place one rule where Copilot can use it" },
		{ icon: "👥", title: "Team lead", description: "Assign review and promotion authority" },
		{ icon: "🏗️", title: "Platform engineer", description: "Own shared context as a maintained product" },
		{ title: "Owner", description: "Every shared rule names a producer and reviewer" },
		{ title: "Delivery", description: "Loaded context shows eligibility, not obedience" },
		{ title: "Compliance", description: "Tests, diff review, and approval close the claim" }
	]'
/>

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
	:sections='[
		{ icon: "🧭", title: "Place Context", subtitle: "Owner and lifecycle", blurb: "Classify the rule before choosing a file", slide: 4 },
		{ icon: "📝", title: "Encode the Rule", subtitle: "Smallest fitting primitive", blurb: "Make context bounded and reviewable", slide: 7 },
		{ icon: "🔎", title: "Inspect Delivery", subtitle: "Loaded context and request path", blurb: "Find the first broken stage", slide: 10 },
		{ icon: "✅", title: "Verify and Promote", subtitle: "Repair, test, and approve", blurb: "Climb from eligibility to compliance", slide: 16 }
	]'
/>

---

# Place Context by Owner and Lifecycle
<!-- SLIDE: Part 1 — Place Context by Owner and Lifecycle -->
<SectionOpenerSlide
	:partNumber="1"
	title="Place Context by Owner and Lifecycle"
	subtitle="Classify owner, lifetime, selector, and reviewer before choosing the storage surface."
	:cards='[
		{ icon: "👤", title: "Owner", blurb: "Who may change the rule?" },
		{ icon: "⏳", title: "Lifetime", blurb: "How long should it survive?" },
		{ icon: "🛡️", title: "Reviewer", blurb: "Who approves promotion?" }
	]'
	:terminal='{ context: "Classification precedes configuration", detail: "Owner + lifetime + selector + reviewer" }'
/>

---

# Four Decisions Before a File
<!-- SLIDE: Four Decisions Before a File -->
<FourCardGridSlide
	:partNumber="1"
	pillIcon="🧭"
	pillLabel="Placement · Classification"
	title="Every Context Item Carries Four Design Decisions"
	:cards='[
		{ icon: "👤", title: "Owner", description: "Personal preference, repository policy, or organization control?" },
		{ icon: "⏳", title: "Lifetime", description: "One request, several sessions, or the life of the codebase?" },
		{ icon: "🎯", title: "Selector", description: "Everywhere, one path, an invoked task, or one agent role?" },
		{ icon: "🔎", title: "Evidence", description: "Which signal proves loading, execution, and acceptance?" }
	]'
	:progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Shared Context Is a Product
<!-- SLIDE: Shared Context Is a Product -->
<ThreeColumnCardSlide
	:partNumber="1"
	pillIcon="🏗️"
	pillLabel="Placement · Platform Ownership"
	title="Shared Context Needs a Producer, Reviewer, and Consumer"
	:columns='[
		{ icon: "🏗️", title: "Platform producer", description: "A named maintainer owns conflicts, review cadence, version history, and retirement." },
		{ icon: "🛡️", title: "Code owner", description: "Approves policy and public-contract changes through repository controls." },
		{ icon: "🧑‍💻", title: "Contributor", description: "May propose context and implementation changes, but cannot silently create team policy." }
	]'
	:progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Encode the Smallest Primitive
<!-- SLIDE: Part 2 — Encode the Smallest Primitive -->
<SectionOpenerSlide
	:partNumber="2"
	title="Encode the Smallest Primitive"
	subtitle="Commit the narrowest artifact that carries the rule, selector, evidence, and authority boundary."
	:cards='[
		{ icon: "📄", title: "Artifact", blurb: "Prefer a reviewable file" },
		{ icon: "🎯", title: "Selector", blurb: "Bound when the rule applies" },
		{ icon: "🔐", title: "Authority", blurb: "Separate tools from approval" }
	]'
	:terminal='{ context: "Small surface, explicit contract", detail: "Rule + scope + evidence + owner" }'
/>

---

# The Promoted Orders Rule
<!-- SLIDE: The Promoted Orders Rule -->
<CodeWithFeaturesSlide
	:partNumber="2"
	pillIcon="📝"
	pillLabel="Encoding · Repository Instruction"
	title="Commit the Rule with Its Required Evidence"
	codePosition="left"
	:code='{ language: "markdown", filename: ".github/copilot-instructions.md", content: "# Orders API Context\n\nOwner: Orders API maintainers\nReviewer: Orders API code owner\n\n## Response Contract\n- Return Result<T, OrderError>.\n- Map errors to HTTP only in the route adapter.\n\n## Required Evidence\n- npm test -- orders\n- npm run typecheck" }'
	:features='[
		{ icon: "🎯", title: "Bounded scope", description: "Applies to Orders source and test work, not every repository task." },
		{ icon: "🔐", title: "Separate authority", description: "Tool access permits action; repository controls still decide merge approval." },
		{ icon: "🚫", title: "Sensitive-data boundary", description: "Credentials, customer records, payloads, and incident details stay out." }
	]'
	:progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Choose the First Primitive That Fits
<!-- SLIDE: Choose the First Primitive That Fits -->
<FrameworkMappingRowsSlide
	:partNumber="2"
	pillIcon="📐"
	pillLabel="Encoding · Selection Rule"
	title="Promote Only When the Work Earns a Stronger Primitive"
	subtitle="Owner, lifetime, and repetition determine the artifact"
	:rows='[
		{ label: "One task", description: "Put explicit files and acceptance evidence in the request", tag: "Request" },
		{ label: "Personal", description: "Keep a durable preference user-controlled and reviewable", tag: "Memory" },
		{ label: "Shared rule", description: "Version a stable baseline with a named repository owner", tag: "Instruction" },
		{ label: "File pattern", description: "Use path scope only when the pattern is stable and supported", tag: "applyTo" },
		{ label: "Repeat task", description: "Package a proven human-invoked sequence", tag: "Prompt/Skill" },
		{ label: "Bounded role", description: "Assign a specialist tool boundary and explicit handoff", tag: "Agent" }
	]'
	footnote="Use one source of truth; duplication creates conflict without authority"
	:progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Inspect Context and Request Path
<!-- SLIDE: Part 3 — Inspect Context and Request Path -->
<SectionOpenerSlide
	:partNumber="3"
	title="Inspect Context and Request Path"
	subtitle="Trace eligibility, transport, and answer behavior without treating delivery as compliance."
	:cards='[
		{ icon: "📥", title: "Loaded", blurb: "Was the file eligible?" },
		{ icon: "🛤️", title: "Request Path", blurb: "Did context travel?" },
		{ icon: "🧪", title: "Answer", blurb: "Did output obey the rule?" }
	]'
	:terminal='{ context: "Start at the first broken stage", detail: "Delivery evidence ≠ compliance evidence" }'
/>

---

# Make the Request Observable
<!-- SLIDE: Make the Request Observable -->
<CodeWithFeaturesSlide
	:partNumber="3"
	pillIcon="📨"
	pillLabel="Inspection · Visible Input"
	title="Name the Target, Boundary, and Acceptance Evidence"
	codePosition="top"
	:code='{ language: "text", filename: "task request", content: "Update src/orders/update-order.ts so a missing order returns the existing OrderError.notFound outcome. Preserve the HTTP response schema. Run the Orders tests and TypeScript check, then report the evidence." }'
	:features='[
		{ icon: "📁", title: "Target", description: "The decisive Orders file is explicit." },
		{ icon: "🧱", title: "Boundary", description: "The public response schema must remain stable." },
		{ icon: "🧪", title: "Checks", description: "Tests and type checking are acceptance evidence." }
	]'
	:progressDots='{ current: 1, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# A Valid Rule Can Be Ineligible
<!-- SLIDE: A Valid Rule Can Be Ineligible -->
<CodeWithFeaturesSlide
	:partNumber="3"
	pillIcon="⚠️"
	pillLabel="Inspection · Broken Fixture"
	title="The Committed Selector Excludes the Orders Task"
	codePosition="left"
	:code='{ language: "yaml", filename: "orders-context.broken.instructions.md", content: "---\napplyTo: src/payments/**/*.ts\n---\n\n# Orders API Context\nReturn domain outcomes as Result<T, OrderError>.\nMap HTTP responses only in the route adapter." }'
	:features='[
		{ icon: "✅", title: "Rule is valid", description: "The domain and adapter guidance remains correct." },
		{ icon: "❌", title: "Selector is wrong", description: "The task targets src/orders, so this artifact is not eligible." },
		{ icon: "📌", title: "Fixture is committed", description: "The failure stays reproducible instead of becoming a story." }
	]'
	:progressDots='{ current: 2, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Illustrative Broken Request Trace
<!-- SLIDE: Illustrative Broken Request Trace -->
<AITerminalTranscriptSlide
	:partNumber="3"
	pillIcon="🔎"
	pillLabel="Inspection · Illustrative Diagnostic Trace"
	title="Illustrative Trace: Stop at the First Broken Stage"
	subtitle="Illustrative diagnostic trace — exact labels vary by VS Code build"
	:transcript='[
		{ type: "prompt", text: "inspect loaded customizations" },
		{ type: "user", text: "Target: src/orders/update-order.ts" },
		{ type: "thinking", label: "Illustrative diagnostic observation:" },
		{ type: "response", lines: ["Expected Orders instruction: absent", "Loaded selector: src/payments/**/*.ts", "Request path: Orders file read and edited"] },
		{ type: "divider" },
		{ type: "outcome", text: "Diagnosis: valid rule, ineligible selector" },
		{ type: "response", lines: ["Generated output used an HTTP-shaped error in the domain layer"] }
	]'
	footerMetric="Illustrative trace · loading failed before compliance was tested"
	:progressDots='{ current: 3, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Delivery Is Not Compliance
<!-- SLIDE: Delivery Is Not Compliance -->
<HeroStatSlide
	:partNumber="3"
	pillIcon="🎯"
	pillLabel="Inspection · North Star"
	title="Loaded Context Proves Delivery, Not Obedience"
	subtitle="Treat configuration delivery and output compliance as different claims"
	:hero='{ value: "≠", label: "delivery evidence is not compliance evidence", source: "Context Engineering evidence model" }'
	:supporting='[
		{ icon: "📥", title: "Loaded artifact", description: "The client found and selected the instruction." },
		{ icon: "🛤️", title: "Request trace", description: "The client assembled relevant context and tool activity." },
		{ icon: "🧪", title: "Executable checks", description: "Defined behavioral and type constraints hold." },
		{ icon: "🛡️", title: "Owner approval", description: "The authorized reviewer accepts intent and compatibility." }
	]'
	:insight='{ icon: "🔎", text: "Inspect delivery to diagnose the path; inspect output and checks to judge compliance." }'
	:progressDots='{ current: 4, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Two Diagnostic Boundaries
<!-- SLIDE: Two Diagnostic Boundaries -->
<TwoColPairedConceptsSlide
	:partNumber="3"
	pillIcon="🧱"
	pillLabel="Inspection · Boundary Callouts"
	title="Transport Success and Session Continuity Need Separate Checks"
	:left='{
		header: "MCP tool path",
		icon: "🔌",
		items: ["Server health proves only that a path exists", "Tool success does not prove authoritative data", "Inspect the invocation, result, and source authority"]
	}'
	:right='{
		header: "Context pressure",
		icon: "🧠",
		items: ["Capacity varies by model and session", "After compaction, restate decisive constraints", "Rerun acceptance checks instead of assuming continuity"]
	}'
	:progressDots='{ current: 5, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Repair Then Verify Compliance
<!-- SLIDE: Part 4 — Repair Then Verify Compliance -->
<SectionOpenerSlide
	:partNumber="4"
	title="Repair Then Verify Compliance"
	subtitle="Fix the selector, preserve the evidence, and promote only after executable checks and owner review."
	:cards='[
		{ icon: "🔧", title: "Repair", blurb: "Change the broken selector" },
		{ icon: "🪜", title: "Evidence", blurb: "Climb all five rungs" },
		{ icon: "✅", title: "Promote", blurb: "Require owner approval" }
	]'
	:terminal='{ context: "Observable proof before promotion", detail: "Eligible → delivered → checked → approved" }'
/>

---

# Compare the Committed Selectors
<!-- SLIDE: Compare the Committed Selectors -->
<TwoColPairedConceptsSlide
	:partNumber="4"
	pillIcon="🔧"
	pillLabel="Repair · Committed Evidence"
	title="One Selector Change Restores Eligibility"
	:left='{
		header: "Broken fixture",
		icon: "❌",
		items: ["Valid Orders rule", "Payments path excludes the target", "Expected instruction absent from loaded context"],
		code: { language: "yaml", content: "applyTo: src/payments/**/*.ts" }
	}'
	:right='{
		header: "Fixed fixture",
		icon: "✅",
		items: ["Same Orders rule", "Orders path includes the target", "Instruction becomes eligible for the request"],
		code: { language: "yaml", content: "applyTo: src/orders/**/*.ts" }
	}'
	:progressDots='{ current: 1, total: 5, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Illustrative Repaired Request Trace
<!-- SLIDE: Illustrative Repaired Request Trace -->
<AITerminalTranscriptSlide
	:partNumber="4"
	pillIcon="🔎"
	pillLabel="Repair · Illustrative Diagnostic Trace"
	title="Illustrative Trace: Delivery Works After the Repair"
	subtitle="Illustrative diagnostic trace — exact labels vary by VS Code build"
	:transcript='[
		{ type: "prompt", text: "inspect loaded customizations" },
		{ type: "user", text: "Target: src/orders/update-order.ts" },
		{ type: "thinking", label: "Illustrative diagnostic observation:" },
		{ type: "response", lines: ["orders-context.fixed.instructions.md: loaded", "Target file: read and edited", "Orders tests: exit 0", "TypeScript check: exit 0"] },
		{ type: "divider" },
		{ type: "outcome", text: "Delivery observed; continue to output and diff review" }
	]'
	footerMetric="Illustrative trace · transport success still does not prove compliance"
	:progressDots='{ current: 2, total: 5, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# The Five-Rung Evidence Ladder
<!-- SLIDE: The Five-Rung Evidence Ladder -->
<MaturityJourneyRoadmapSlide
	:partNumber="4"
	pillIcon="🪜"
	pillLabel="Verification · Evidence Ladder"
	title="State Exactly What Each Signal Proves"
	subtitle="No rung can make the claim assigned to the next"
	:stages='[
		{ label: "1", name: "Loaded", description: "The client selected the instruction artifact", icon: "📥", isTarget: false },
		{ label: "2", name: "Requested", description: "The client assembled decisive request context", icon: "🛤️", isTarget: false },
		{ label: "3", name: "Executed", description: "Tools completed and returned observable results", icon: "⚙️", isTarget: false },
		{ label: "4", name: "Checked", description: "Tests, types, and diff satisfy defined constraints", icon: "🧪", isTarget: false },
		{ label: "5", name: "Approved", description: "The authorized owner accepts intent and compatibility", icon: "🛡️", isTarget: true }
	]'
	caption="The north star is accepted delivery, not merely successful context transport"
	:progressDots='{ current: 3, total: 5, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Run Independent Checks
<!-- SLIDE: Run Independent Checks -->
<CodeWithFeaturesSlide
	:partNumber="4"
	pillIcon="🧪"
	pillLabel="Verification · Compliance Evidence"
	title="Executable Checks Test the Output, Not the Configuration"
	codePosition="left"
	:code='{ language: "bash", filename: "acceptance checks", content: "npm test -- orders\nnpm run typecheck\ngit diff -- src/orders tests/orders" }'
	:features='[
		{ icon: "✅", title: "Orders tests", description: "Defined domain behavior remains correct." },
		{ icon: "🔷", title: "Type check", description: "Changed TypeScript contracts remain coherent." },
		{ icon: "🔎", title: "Diff review", description: "HTTP mapping stays in the adapter and schema remains stable." }
	]'
	:progressDots='{ current: 4, total: 5, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Promotion Is a Repository Decision
<!-- SLIDE: Promotion Is a Repository Decision -->
<ThreeColumnCardSlide
	:partNumber="4"
	pillIcon="✅"
	pillLabel="Promotion · Authority Boundary"
	title="Promote Only Stable, Observable, Owned Context"
	:columns='[
		{ icon: "🔁", title: "Repeated value", description: "Several bounded tasks show the rule is stable and useful." },
		{ icon: "🏗️", title: "Maintained product", description: "A platform producer owns scope, conflicts, cadence, and retirement." },
		{ icon: "🛡️", title: "Authorized approval", description: "The Orders API code owner approves policy and contract changes." }
	]'
	:progressDots='{ current: 5, total: 5, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<!-- SLIDE: Before and After -->
<BeforeAfterSlide
	header="From Ambient Advice to Governed Context"
	:leftItems='[
		"Rules live wherever someone remembers them",
		"Selectors fail without a preserved fixture",
		"Loaded context is mistaken for compliance",
		"Shared guidance has no accountable producer"
	]'
	:rightItems='[
		"Every rule has an owner and lifecycle",
		"Broken and fixed selectors stay committed",
		"Delivery and compliance use distinct evidence",
		"Platform producers maintain and retire shared rules"
	]'
	:metrics='[
		{ value: "5 rungs", detail: "from eligible loading to owner approval" },
		{ value: "3 fixtures", detail: "promoted, broken, and repaired evidence" },
		{ value: "1 owner", detail: "named for every shared context product" }
	]'
/>

---

# What You Can Do Today
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
	:today='[
		"Classify one rule by owner and lifetime",
		"Name its delivery and compliance evidence",
		"Reject sensitive data from context artifacts"
	]'
	:thisWeek='[
		"Commit a scoped instruction and selector fixture",
		"Inspect loaded customization and request traces",
		"Add an executable check for the rule"
	]'
	:thisMonth='[
		"Assign platform producer ownership",
		"Define review cadence and retirement criteria",
		"Require code-owner approval for promotion"
	]'
	footer="Treat context as a governed input whose delivery and compliance must be proven separately."
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
	:groups='[
		{ title: "Official Documentation", color: "cyan", items: [
			{ href: "https://code.visualstudio.com/docs/copilot/customization/custom-instructions", label: "Custom instructions in VS Code", description: "Repository and path-scoped instruction behavior" },
			{ href: "https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot", label: "Repository custom instructions", description: "GitHub guidance for shared repository context" },
			{ href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory", label: "Copilot Memory", description: "Current availability, scope, and management controls" },
			{ href: "https://code.visualstudio.com/docs/copilot/chat/chat-debug-view", label: "Chat Debug View", description: "Inspect request and diagnostic information" }
		] },
		{ title: "Diagnostics and Boundaries", color: "purple", items: [
			{ href: "https://code.visualstudio.com/docs/copilot/troubleshooting", label: "Troubleshoot AI in VS Code", description: "Current diagnostic surfaces and recovery guidance" },
			{ href: "https://code.visualstudio.com/docs/copilot/customization/mcp-servers", label: "Use MCP servers in VS Code", description: "Server, discovery, invocation, and result boundaries" },
			{ href: "https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction", label: "Manage context for AI", description: "Context usage and compaction guidance" }
		] }
	]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
	title="Place. Inspect. Prove."
	subtitle="Copilot Context Engineering"
	:cards='[
		{ value: "5 rungs", detail: "State exactly what each evidence signal proves" },
		{ value: "1 selector", detail: "Move a valid rule from ineligible to observable" },
		{ value: "3 fixtures", detail: "Preserve promoted, broken, and repaired states" }
	]'
	prompt="Which rule in your repository needs an owner, selector, and compliance check?"
/>
