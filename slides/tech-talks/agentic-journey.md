---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## The Agentic Journey
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: The Agentic Journey
mdc: true
section: Agentic Engineering
status: active
updated: 2026-04-22
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
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

# Title
<TitleSlide
  title="The Agentic Journey"
  subtitle="Incremental Path from Issue to PR Automation"
  tagline="Start in 2-3 hours. Compound value at every phase. No SDLC rewire required."
  meta="CopilotTraining Tech Talk"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do you move from experimenting with AI to trusting it in your SDLC?"
  subtext="Most teams are stuck between all-in paralysis and experiment-forever drift."
  highlight="The answer is a state machine: one label transition at a time."
  :cards='[
    { icon: "🔧", title: "Developer", description: "Eliminate hours of issue triage, planning, and implementation boilerplate" },
    { icon: "🏗️", title: "Tech Lead", description: "Get structured, codebase-aware plans before any code is written" },
    { icon: "🛡️", title: "Engineering Manager", description: "See exactly where human control gates are and why they matter" },
    { title: "30 min → 3 min", description: "Triage time per issue with AI duplicate detection and auto-labeling" },
    { title: "60% better estimates", description: "When agents mine historical PRs before generating execution plans" },
    { title: "2-3 hour setup", description: "Copy 4 YAML files, configure secrets, create an issue — you are live" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Incremental Adoption", takeaway: "Prove value with one bounded workflow before adding automation.", whyItMatters: "Teams build confidence without an all-at-once transformation." },
    { title: "Visible State", takeaway: "Use labels to make the automated delivery pipeline observable.", whyItMatters: "Everyone can see progress and bottlenecks without status meetings." },
    { title: "Graduation Signals", takeaway: "Advance each phase only when its measures prove readiness.", whyItMatters: "Clear checkpoints keep automation supervised and adaptable." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "📥", title: "Agentic Intake",    subtitle: "Triage automation without touching code", blurb: "Duplicate detection, auto-labeling, and the state machine spine", slide: 4  },
    { icon: "📋", title: "Agentic Planning",  subtitle: "Human-gated, codebase-aware execution plans", blurb: "The /approve-plan gate is the trust inflection point", slide: 8  },
    { icon: "⚙️", title: "Agentic Coding",   subtitle: "Autonomous implementation from an approved plan", blurb: "PR with tests appears with zero implementation keystrokes", slide: 13 },
    { icon: "🔍", title: "Code Review",       subtitle: "Automated analysis that amplifies human judgment", blurb: "Security, logic, coverage — and the graduation exit ramp", slide: 17 }
  ]'
/>

---

# Part 1 — Agentic Intake
<SectionOpenerSlide
  :partNumber="1"
  title="Agentic Intake"
  subtitle="Before touching a line of code, earn credibility by eliminating triage noise in 3 minutes."
  :cards='[
    { icon: "🗺️", title: "State Machine Spine", blurb: "new-issue → intake-complete: the full diagram lives here" },
    { icon: "🔍", title: "Duplicate Detection",  blurb: "88% match found in 3 min, auto-labeled, fix version posted" },
    { icon: "⏱️", title: "20-30 min → 3 min",   blurb: "Triage time per issue, compounded across 14 dupes/month" }
  ]'
  :terminal='{ context: "Time to set up agentic intake from scratch", detail: "2-3 hours — copy 4 YAML files, configure secrets, open an issue" }'
/>

---

# The Label State Machine
<MaturityJourneyRoadmapSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="Agentic Intake · The Spine"
  title="One Label Machine, Four Automation Phases"
  subtitle="Every section of this talk advances exactly one state transition"
  :stages='[
    { label: "S1", name: "new-issue",               description: "Issue opened — agentic intake fires",              icon: "📥", isTarget: false },
    { label: "S2", name: "intake-complete",          description: "Triaged, classified, duplicate-checked",           icon: "✅", isTarget: false },
    { label: "S3", name: "plan-approved",            description: "Human typed /approve-plan in a comment",          icon: "📋", isTarget: false },
    { label: "S4", name: "impl-complete",            description: "PR opened with tests and description",             icon: "⚙️", isTarget: false },
    { label: "S5", name: "review-complete",          description: "Security, logic, and coverage verified",           icon: "🔍", isTarget: true  }
  ]'
  caption="Each phase&#39;s savings depend on the previous phase having run first — this ordering is not arbitrary"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Triage: Before and After
<BeforeAfterMetricsSlide
  :partNumber="1"
  pillIcon="⏱️"
  pillLabel="Agentic Intake · Triage"
  title="Issue Triage: From Investigation to Instant Classification"
  :before='{
    header: "Manual Triage",
    items: [
      { title: "20-30 min per issue", detail: "Developer reads, researches, decides priority" },
      "40 min per duplicate — full re-investigation",
      "Inconsistent classification across team members",
      "No link to historical context or fix versions"
    ]
  }'
  :after='{
    header: "Agentic Intake",
    items: [
      { title: "3 min per issue", detail: "AI classifies, routes, and checks duplicates" },
      "88% duplicate match detected and auto-labeled",
      "Consistent classification driven by prompt template",
      "Fix version posted automatically on duplicates"
    ]
  }'
  :metrics='[
    { value: "90%", label: "faster triage" },
    { value: "14×", label: "duplicate ROI per month" },
    { value: "3 hrs", label: "total setup time" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Duplicate Detection in Action
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="🔍"
  pillLabel="Agentic Intake · Whoa Moment"
  title="Duplicate Detection: 88% Match in 3 Minutes"
  subtitle="14 duplicates/month × 40 minutes each — evaporating"
  :transcript='[
    { type: "prompt",   text: "github-actions[bot]" },
    { type: "user",     text: "Triage new issue #4821: Login fails on mobile Safari" },
    { type: "thinking", label: "🤔 Copilot (Intake Agent):" },
    { type: "response", lines: ["Analyzing issue type, priority, and codebase context...", "Searching for similar resolved issues in last 90 days..."] },
    { type: "divider" },
    { type: "response", lines: ["Found: Issue #4203 — 88% similarity score", "Status: Resolved in v2.1.3 (2 weeks ago)", "Fix: Corrected SameSite cookie attribute for Safari compatibility"] },
    { type: "divider" },
    { type: "outcome",  text: "Label applied: duplicate" },
    { type: "outcome",  text: "Comment posted: Fix available in v2.1.3 — close if confirmed resolved" }
  ]'
  footerMetric="40 min saved · 14 duplicates/month · 560 min/month recovered"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Agentic Planning
<SectionOpenerSlide
  :partNumber="2"
  title="Agentic Planning"
  subtitle="The /approve-plan gate is the single boundary between intake and autonomous coding."
  :cards='[
    { icon: "🔎", title: "Historical Research", blurb: "Agent mines similar past PRs for codebase-aware planning" },
    { icon: "📑", title: "Execution Plan",      blurb: "Structured, reviewable plan generated before any code" },
    { icon: "✅", title: "/approve-plan Gate",  blurb: "Human types one comment; only then does code get written" }
  ]'
  :terminal='{ context: "Time to produce a codebase-aware execution plan", detail: "2-4 hrs → 15 min" }'
/>

---

# Planning Workflow Comparison
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="📋"
  pillLabel="Agentic Planning · Workflow"
  title="Ad-Hoc Planning vs. Codebase-Aware Execution Plans"
  subtitle="From intuition-based estimates to structured, historically-informed plans"
  leftLabel="Traditional Planning"
  rightLabel="Agentic Planning"
  :steps='[
    { left: { label: "Read the issue", note: "Understand requirements manually" }, right: { label: "Read the issue", note: "Understand requirements manually" } },
    { left: { label: "Browse codebase", note: "2-3 hours reading code and docs" }, right: { label: "Agent mines past PRs", note: "6 months of similar issues researched in minutes" } },
    { left: { label: "Estimate from intuition", note: "Hope you haven&#39;t missed edge cases" }, right: { label: "Structured plan generated", note: "Files, approach, tests — all specified up front" } },
    { left: { label: "Start coding immediately", note: "Discover wrong assumptions mid-sprint" }, right: { label: "Human types /approve-plan", note: "One comment — then autonomous coding begins" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "40% of implementations hit mid-sprint scope changes" }'
  :outcomeRight='{ icon: "✓", label: "60% better estimate accuracy — approved plan is the contract" }'
  summaryMetric="2-4 hrs of planning → 15 min with full historical context"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Historical Context Impact
<HeroStatSlide
  :partNumber="2"
  pillIcon="📊"
  pillLabel="Agentic Planning · Impact"
  title="Historical Context Changes the Math"
  subtitle="Agents research what humans skip"
  :hero='{ value: "60%", label: "better estimate accuracy when agents mine past PRs before planning", source: "" }'
  :supporting='[
    { icon: "🔎", title: "6 months of similar issues", description: "Agent queries resolved PRs matching the current issue type and scope" },
    { icon: "📉", title: "40% fewer mid-sprint surprises", description: "Codebase-aware plans surface edge cases before coding starts" },
    { icon: "📁", title: "File-level specificity", description: "Plan names exact files and functions to modify — no guessing during implementation" },
    { icon: "🧪", title: "Test strategy included", description: "Agent specifies test files and coverage targets in the plan before code is written" }
  ]'
  :insight='{ icon: "💡", text: "The plan is the artifact — not the code. Managers approve what gets built before anyone builds it." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Three Planning Beats
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="📑"
  pillLabel="Agentic Planning · Three Beats"
  title="From Context to Approved Plan: Three Distinct Steps"
  :columns='[
    { icon: "🔎", title: "Historical Research", description: "Agent mines similar past issues and resolved PRs for codebase-aware context", items: ["6 months of PR history", "File-level change patterns", "Past estimation accuracy"] },
    { icon: "📋", title: "Execution Plan", description: "Structured, reviewable plan posted as an issue comment before any code is written", items: ["Files to change — named", "Test strategy specified", "Risk areas flagged"] },
    { icon: "✅", title: "/approve-plan Gate", description: "Human reviews the plan and types /approve-plan — only then does any code get written", items: ["Explicit human opt-in", "Full visibility before code", "Rejection resets planning"] }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# The /approve-plan Gate
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="✅"
  pillLabel="Agentic Planning · The Gate"
  title="The /approve-plan Gate: One Comment, Complete Control"
  :problem='{
    header: "The Concern",
    items: [
      "Autonomous agents writing code sounds risky",
      { title: "What stops it from doing the wrong thing?", detail: "Managers need a clear control boundary" },
      "How do I reject a bad plan without breaking the workflow?"
    ]
  }'
  :solution='{
    header: "The Gate",
    items: [
      "Agent posts execution plan as a readable issue comment",
      "Human reads, questions, and optionally edits the plan",
      "/approve-plan triggers coding — anything else does not"
    ]
  }'
  :outcome='{
    header: "The Outcome",
    items: [
      "State machine advances to plan-approved on human command only",
      "Code is written exactly once — from an approved, reviewed plan",
      "One comment = complete, auditable, reversible human control"
    ],
    metrics: [{ value: "100%", label: "human-gated before code" }]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Agentic Coding
<SectionOpenerSlide
  :partNumber="3"
  title="Agentic Coding"
  subtitle="An approved plan unlocks autonomous implementation — tests, PR, and description included."
  :cards='[
    { icon: "🤖", title: "Agent Assignment",  blurb: "Copilot coding agent picked up directly from the approved plan" },
    { icon: "🧪", title: "Test Generation",   blurb: "Tests are a first-class output, not an afterthought" },
    { icon: "📬", title: "PR Creation",       blurb: "implementation-complete: PR opens, state machine advances" }
  ]'
  :terminal='{ context: "Time to implement from approved plan to open PR", detail: "8-12 hrs → 1-2 hrs" }'
/>

---

# What the Coding Agent Delivers
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="⚙️"
  pillLabel="Agentic Coding · Outputs"
  title="Three First-Class Outputs From One Approved Plan"
  :columns='[
    { icon: "🤖", title: "Agent Assignment", description: "Copilot coding agent is assigned directly from the approved plan — no manual kickoff required", items: ["Triggered by plan-approved label", "Plan document is the instruction set", "Runs in CI — no local env needed"] },
    { icon: "🧪", title: "Tests Included", description: "Test generation is a first-class output — the plan specifies test strategy before coding begins", items: ["Unit and integration tests", "Coverage targets from the plan", "CI fails if tests are missing"] },
    { icon: "📬", title: "PR Created", description: "implementation-complete label fires as the PR opens — the state machine advances without human intervention", items: ["PR description auto-generated", "Linked to source issue", "Ready for automated review"] }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Externalized Prompt Architecture
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="📝"
  pillLabel="Agentic Coding · Configuration"
  title="Update Agent Behavior by Editing Markdown, Not Debugging YAML"
  :left='{
    header: "Embedded YAML",
    icon: "⚠️",
    items: [
      { title: "Instructions buried in workflow files", detail: "Hard to find, harder to review" },
      "Non-technical stakeholders locked out of prompt review",
      { title: "Prompt changes require YAML debugging", detail: "Risk of breaking CI triggers" },
      "No clear version history for agent behavior changes"
    ]
  }'
  :right='{
    header: ".github/prompts/",
    icon: "✅",
    items: [
      { title: "One markdown file per phase", detail: "triage-, planning-, implementation-, review-instructions.md" },
      "Product managers can read and improve prompts directly",
      { title: "Edit markdown — workflow YAML unchanged", detail: "Zero CI risk from prompt iteration" },
      "Prompts serve as living documentation of agent behavior"
    ]
  }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Implementation Time Savings
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="🚀"
  pillLabel="Agentic Coding · Impact"
  title="From 12-Hour Implementations to 2-Hour PRs"
  :before='{
    header: "Manual Implementation",
    items: [
      { title: "8-12 hours per task", detail: "Research, code, debug, write tests, write PR description" },
      "Tests written last — or skipped under deadline pressure",
      "PR description written from memory of what changed",
      { title: "Context switching cost", detail: "Interruptions break implementation flow" }
    ]
  }'
  :after='{
    header: "Agentic Coding",
    items: [
      { title: "1-2 hours per task", detail: "Coding agent implements from the approved plan" },
      "Tests generated as first-class output from the plan",
      "PR description auto-generated with full context",
      { title: "Developer reviews, not builds", detail: "Human time spent on judgment, not keystrokes" }
    ]
  }'
  :metrics='[
    { value: "85%", label: "less implementation time" },
    { value: "100%", label: "of PRs include tests" },
    { value: "0", label: "implementation keystrokes" }
  ]'
  :insight='{ icon: "🎯", text: "The approved plan is the implementation contract — the agent executes it, the developer governs it." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Code Review
<SectionOpenerSlide
  :partNumber="4"
  title="Code Review"
  subtitle="Automated review amplifies human judgment — and surfaces the graduation signals you&#39;ve earned."
  :cards='[
    { icon: "🛡️", title: "Trust Amplification", blurb: "Security, logic, coverage — the answer to is the code any good?" },
    { icon: "🔚", title: "review-complete",       blurb: "Final state machine transition: the loop closes here" },
    { icon: "🎓", title: "Graduation Signals",    blurb: "Threshold indicators that the next SDLC phase is within reach" }
  ]'
  :terminal='{ context: "Time to review an agent-generated PR end-to-end", detail: "2-4 hrs → 20 min" }'
/>

---

# Four Automated Review Dimensions
<FourCardGridSlide
  :partNumber="4"
  pillIcon="🔍"
  pillLabel="Code Review · Coverage"
  title="Four Dimensions of Automated Review"
  :cards='[
    { icon: "🛡️", title: "Security Analysis",   description: "OWASP pattern detection, dependency vulnerability scanning, auth logic review" },
    { icon: "🧠", title: "Logic Review",         description: "Business rule verification, edge case detection, race condition identification" },
    { icon: "⚡", title: "Performance Checks",   description: "N+1 query detection, unnecessary re-renders, algorithmic complexity flags" },
    { icon: "🧪", title: "Coverage Gates",       description: "Test coverage thresholds enforced — PRs fail CI if below plan targets" }
  ]'
  :insight='{ icon: "💡", text: "Automated review answers the first question — humans answer the architectural question." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Code Review Time Savings
<BeforeAfterMetricsSlide
  :partNumber="4"
  pillIcon="⏱️"
  pillLabel="Code Review · Impact"
  title="From 4-Hour Reviews to 20-Minute Sign-Offs"
  :before='{
    header: "Manual Review",
    items: [
      { title: "2-4 hours per agent PR", detail: "Reviewers read 500-2000 lines of generated code" },
      "Security gaps caught post-merge — costly remediation",
      "Inconsistent review depth across different reviewers",
      { title: "10-15× volume increase", detail: "Agent PRs arrive faster than humans can review" }
    ]
  }'
  :after='{
    header: "Automated Review",
    items: [
      { title: "20 min human review", detail: "Automated pass surfaces all first-order issues before human reads a line" },
      "Security, logic, and coverage checked pre-merge",
      "Consistent rubric — same depth on every PR",
      { title: "Reviewers shift roles", detail: "From line-by-line gatekeepers to architectural judges" }
    ]
  }'
  :metrics='[
    { value: "83%", label: "faster human review" },
    { value: "0", label: "post-merge security bugs" },
    { value: "3.1×", label: "PR throughput increase" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Graduation Signals
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🎓"
  pillLabel="Code Review · Graduation"
  title="Graduation Signals: You&#39;ve Already Won — Now Scale"
  :columns='[
    { icon: "🔗", title: "Cross-Repo Coordination", description: "Agent changes spanning 2+ repos per feature exceed what this pipeline handles cleanly", items: ["Agents need shared context across boundaries", "Monorepo or ACP manifest needed", "See: Agentic SDLC talk"] },
    { icon: "👥", title: "5+ Teams Participating", description: "Coordination overhead starts exceeding automation gains at multi-team scale", items: ["Conflicting intake routing rules appear", "Shared planning context required", "Enterprise Patterns talk applies"] },
    { icon: "📈", title: "Proven ROI on Record", description: "You have 3+ months of time savings data — now is the moment to request the full transformation", items: ["Estimate accuracy tracked", "Review throughput measured", "Executive support earned"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Manual SDLC to Compounding Automation"
  :leftItems='["30 min triage per issue, 40 min per duplicate", "2-4 hour ad-hoc planning with missed context", "8-12 hour implementations with scope drift", "2-4 hour code review with inconsistent coverage"]'
  :rightItems='["3 min AI triage with duplicate detection and auto-labeling", "15 min codebase-aware plan, human-gated via /approve-plan", "1-2 hour agent-coded PR with tests and description", "20 min automated security, logic, and coverage review"]'
  :metrics='[
    { value: "90%", detail: "less triage time per issue" },
    { value: "94%", detail: "faster structured planning" },
    { value: "4×", detail: "implementation throughput" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Copy 4 YAML workflow files into your repo", "Configure secrets for GitHub Copilot agent access", "Create your first intake issue to test the pipeline"]'
  :thisWeek='["Review and approve your first agent-generated execution plan", "Validate a Copilot-coded PR against your quality bar", "Measure triage time before and after for one sprint"]'
  :thisMonth='["Track estimate accuracy improvements across 10+ planned issues", "Expand the workflow to a second repository", "Assess whether graduation signals are appearing in your team"]'
  footer="Each phase saves time independently — but the ROI multiplies when all four run in sequence."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot", label: "GitHub Copilot documentation", description: "Full reference for GitHub Copilot features and configuration" },
      { href: "https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent", label: "Copilot coding agent for pull requests", description: "How the coding agent handles autonomous implementation" }
    ] },
    { title: "🛠️ Related Talks", color: "purple", items: [
      { label: "Agent Teams", description: "Multi-agent orchestration patterns for complex engineering workflows" },
      { label: "Agentic SDLC", description: "Full software delivery lifecycle transformation with agentic workflows" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="The Agentic Journey"
  subtitle="Incremental Path from Issue to PR Automation"
  :cards="[
    { value: '3 min', detail: 'AI triage replaces 30-minute manual intake — duplicate detection included' },
    { value: '/approve-plan', detail: 'One human comment is the complete answer to what if it goes wrong?' },
    { value: '1-2 hrs', detail: 'Agent-coded PR with tests appears — zero implementation keystrokes' },
  ]"
  prompt="Which phase of the state machine would save your team the most time this sprint?"
/>
