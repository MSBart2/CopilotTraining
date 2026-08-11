---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Agentic Workflows
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Agentic Workflows
mdc: true
section: Agentic Systems
status: active
updated: 2026-08-11
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
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Agentic Workflows"
  subtitle="Repository Automation with AI Agents"
  tagline="Write repository automation in natural language, execute with security-first AI agents"
  meta="45-60 min · Developers · DevOps · Platform Engineers · Engineering Managers"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do I automate repository tasks that require judgment — without writing complex YAML workflows?"
  subtext="Manual triage, repetitive reviews, and hand-assembled reports cost every team hours per week."
  highlight="Describe the outcome in Markdown. Compile it. Let AI navigate the path."
  :cards='[
    { icon: "👩‍💻", title: "Developers", description: "Automate triage, reviews, and CI diagnosis expressed in plain English" },
    { icon: "🧰", title: "DevOps & Platform", description: "Replace brittle YAML pipelines with adaptive, security-first agent workflows" },
    { icon: "📊", title: "Engineering Managers", description: "Get weekly health reports and release notes without anyone assembling them" },
    { title: "30×", description: "reduction in workflow definition length — 8-line Markdown vs. 240-line YAML" },
    { title: "100+", description: "workflows running continuously in Peli&#39;s Agent Factory on github/gh-aw" },
    { title: "0", description: "direct writes — AI reads everything, validation pipeline executes mutations" }
  ]'
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Intent-Driven Workflows", takeaway: "Describe outcomes and let agents adapt to repository context.", whyItMatters: "Automation stays useful when the surrounding state changes." },
    { title: "Security by Design", takeaway: "Explore safe outputs and sandboxed, read-only defaults.", whyItMatters: "Teams can automate without treating governance as an afterthought." },
    { title: "A Practical Starting Point", takeaway: "Locate the workflow and maturity path that fits the team.", whyItMatters: "Every attendee leaves with a credible next action." }
  ]'
/>

---

# Table of Contents
<TocSlide
  subtitle="Why It Matters → Architecture & Safety → Patterns by Path → Your Path Forward"
  :sections='[
    { icon: "💡", title: "Why It Matters", subtitle: "Three paths, three flagship use cases", blurb: "Find your path in the first 12 slides", slide: 5 },
    { icon: "🔐", title: "Architecture & Safety", subtitle: "Compiler-enforced security model", blurb: "Three-phase pipeline, safe outputs, pattern vocabulary", slide: 10 },
    { icon: "🗺️", title: "Patterns by Path", subtitle: "10 use cases across a 3x3 matrix", blurb: "Find your cell — see which peers shipped it", slide: 17 },
    { icon: "🚀", title: "Your Path Forward", subtitle: "Week-by-week progression by path", blurb: "Monday-morning action plan", slide: 21 }
  ]'
/>

---

# Part 1 — Why Agentic Workflows Matter
<SectionOpenerSlide
  :partNumber="1"
  title="Why Agentic Workflows Matter"
  subtitle="Choose your path — A, B, or C — and see yourself in the first 12 slides"
  :cards='[
    { icon: "🏷️", title: "Path A: Triage at Scale", blurb: "High-volume, low-judgment work — issues, labels, PR first-pass" },
    { icon: "📊", title: "Path B: Visibility & Synthesis", blurb: "Async reporting, health dashboards, release notes, research" },
    { icon: "🤖", title: "Path C: Orchestration", blurb: "Multi-agent workflows, worker dispatch, ChatOps commands" }
  ]'
  :terminal='{ context: "Traditional CI/CD: write YAML, debug YAML, maintain YAML forever", detail: "Agentic: write intent → compile → AI adapts to context" }'
/>

---

# YAML Maintenance vs. Markdown Intent
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="✍️"
  pillLabel="Why It Matters: Authoring"
  title="YAML Maintenance vs. Markdown Intent"
  subtitle="Same outcome — one requires a workflow engineer, one does not"
  leftLabel="Traditional GitHub Actions"
  rightLabel="GitHub Agentic Workflows"
  :steps='[
    { left: { label: "Write explicit YAML steps", note: "Every branch, conditional, and API call by hand" }, right: { label: "Write intent in Markdown", note: "Analyze new issues and apply labels — done" } },
    { left: { label: "Debug step failures", note: "Log dive required for every edge case" }, right: { label: "gh aw compile", note: "Compiler generates the secure YAML lock file" } },
    { left: { label: "New edge case appears", note: "Add another conditional branch and redeploy" }, right: { label: "AI adapts to context", note: "Agent reads repository state and decides" } },
    { left: { label: "Requirement changes", note: "Rewrite the step sequence from scratch" }, right: { label: "Edit the Markdown body", note: "Only frontmatter changes need recompile" } }
  ]'
  :outcomeLeft='{ icon: "⏳", label: "Months of YAML maintenance ahead" }'
  :outcomeRight='{ icon: "✓", label: "Minutes to intent, seconds to compile" }'
  summaryMetric="240-line YAML → 8-line Markdown intent"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Which Problem Is Yours?
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🛤️"
  pillLabel="Why It Matters: Three Paths"
  title="Which Problem Is Yours?"
  :columns='[
    { icon: "🏷️", title: "Path A: Triage at Scale", description: "Issue Triage — on issues.opened, applies 1-3 labels with a comment explaining the decision.", items: ["Pattern: Reactive → Labels", "Safe outputs: add-labels, add-comment", "15 minutes to ship"] },
    { icon: "📊", title: "Path B: Visibility & Synthesis", description: "Weekly Health Report — scheduled, synthesizes all repository activity into an actionable issue.", items: ["Pattern: Synthesis → Issue", "Safe outputs: create-issue (close-older)", "15 minutes to ship"] },
    { icon: "🤖", title: "Path C: Orchestration", description: "Multi-Agent Orchestration — dispatches parallel workers and synthesizes a coordinated summary.", items: ["Pattern: Orchestrated → Aggregated", "Safe outputs: dispatch-workflow", "1 day to ship"] }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Zero to Deployed Workflow
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="Why It Matters: First Workflow"
  title="Zero to Deployed: Under Five Minutes"
  subtitle="Write intent, compile to secure YAML, push — done"
  :transcript='[
    { type: "prompt", text: "gh aw new issue-triage" },
    { type: "response", lines: ["Created .github/workflows/issue-triage.md", "Edit the Markdown body with your automation intent"] },
    { type: "divider" },
    { type: "user", text: "# edited: added intent and safe-outputs in frontmatter" },
    { type: "prompt", text: "gh aw compile issue-triage" },
    { type: "thinking", label: "🔐 Generating secure lock file..." },
    { type: "response", lines: ["Generated .github/workflows/issue-triage.lock.yml", "  Agent job: read-only sandbox (ubuntu-slim)", "  Safe-output handlers: add-labels (max 3), add-comment (max 1)"] },
    { type: "divider" },
    { type: "outcome", text: "git add .github/workflows/ && git push" },
    { type: "outcome", text: "Runs on every new issue — zero YAML written by hand" }
  ]'
  footerMetric="gh aw new → compile → push — first workflow in minutes"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Four Mental Model Shifts
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="Why It Matters: Mental Model"
  title="Four Shifts That Change Everything"
  :cards='[
    { icon: "🎯", title: "Intent over Steps", description: "Describe what should happen — AI figures out the path. No conditionals, no edge-case branching." },
    { icon: "🔄", title: "Adaptive over Deterministic", description: "Agent reads repository context and decides. Same intent, smarter execution every run." },
    { icon: "🔒", title: "Read-only by Default", description: "Agent has zero write access. Trust is built through restriction — safe outputs are the write path." },
    { icon: "🎪", title: "Specialized over Monolithic", description: "Many focused workflows outperform one do-everything agent. Build a factory, not a monolith." }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Architecture & Safe Execution
<SectionOpenerSlide
  :partNumber="2"
  title="Architecture & Safe Execution"
  subtitle="The compiler enforces security — not author discipline"
  :cards='[
    { icon: "📝", title: "Author in Markdown", blurb: "Intent body + frontmatter triggers and permissions" },
    { icon: "🔐", title: "Compile to Lock File", blurb: "gh aw compile generates tamper-proof secure YAML" },
    { icon: "🏃", title: "Execute in Sandbox", blurb: "Read-only agent + validated safe-output handlers" }
  ]'
  :terminal='{ context: "Security enforced at compile time — not at runtime", detail: "Compiler = policy. Lock file = proof." }'
/>

---

# Three-Phase Workflow Lifecycle
<MaturityJourneyRoadmapSlide
  :partNumber="2"
  pillIcon="🔄"
  pillLabel="Architecture: Lifecycle"
  title="Author → Compile → Execute"
  subtitle="Every agentic workflow passes through three distinct phases"
  :stages='[
    { label: "Phase 1", name: "Author", description: "Write Markdown: intent body + YAML frontmatter (triggers, permissions, tools, safe-outputs)", icon: "📝", isTarget: false },
    { label: "Phase 2", name: "Compile", description: "gh aw compile: Markdown → .lock.yml with agent job (read-only) + safe-output handler jobs", icon: "🔐", isTarget: false },
    { label: "Phase 3", name: "Execute", description: "Actions runs the lock file: sandboxed container → JSON output → validation pipeline → writes", icon: "🏃", isTarget: true }
  ]'
  caption="The lock file is a generated artifact — never edit it directly. Edit the .md source and recompile."
  :progressDots='{ current: 1, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# A Workflow in Its Natural State
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📄"
  pillLabel="Architecture: Source Format"
  title="A Workflow in Its Natural State"
  subtitle="Frontmatter = security contract. Markdown body = agent instructions."
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/workflows/issue-triage.md", content: "---\non:\n  issues:\n    types: [opened]\npermissions:\n  contents: read\n  issues: read\ntools:\n  github:\n    toolsets: [issues, labels]\nsafe-outputs:\n  add-labels:\n    allowed: [bug, feature, docs]\n    max: 3\n  add-comment:\n    max: 1\n---\n\n## Issue Triage\n\nAnalyze new issues and apply\nappropriate labels based on content.\nIf the issue is unclear, ask." }'
  :features='[
    { icon: "🔐", title: "Frontmatter = security contract", description: "Permissions and safe-outputs declared before any instruction — security is structural" },
    { icon: "🛠️", title: "Tools declaration", description: "Only the GitHub APIs the agent needs — principle of least privilege" },
    { icon: "🗣️", title: "Markdown body = agent instructions", description: "Natural language — no step sequences, no conditionals, no error handling" }
  ]'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Why AI Cannot Write Directly
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="🛡️"
  pillLabel="Architecture: Security Model"
  title="Why AI Cannot Write Directly — And That&#39;s the Point"
  :problem='{
    header: "The Threat",
    items: [
      { title: "Prompt injection risk", detail: "Malicious issue content could instruct AI to push code or delete branches" },
      { title: "Unchecked write access", detail: "Direct API calls bypass audit trails and permission scoping" },
      "One compromised run = unauthorized repository modifications"
    ]
  }'
  :solution='{
    header: "Safe Outputs",
    items: [
      "AI produces structured JSON output — never executes writes directly",
      { title: "Validation pipeline", detail: "Schema check → sanitize → rate limit → permission check → audit" },
      "Scoped handler jobs execute only the approved, validated operations"
    ]
  }'
  :outcome='{
    header: "The Guarantee",
    items: [
      "Zero direct writes from the AI agent in any workflow run",
      "Every action auditable via hidden workflow-id markers in created items",
      { title: "Security by compiler", detail: "Author discipline not required — the lock file is the policy" }
    ],
    metrics: [{ value: "0", label: "unchecked writes in any run" }]
  }'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Safe Output Validation Pipeline
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="✅"
  pillLabel="Architecture: Validation Pipeline"
  title="Five Mandatory Gates — Every Safe Output Passes All"
  subtitle="No agent request reaches GitHub without clearing this pipeline"
  :rows='[
    { label: "Schema", description: "Is the JSON output correctly structured for the safe-output type?", tag: "Format gate" },
    { label: "Permission", description: "Is this safe-output type declared in the workflow frontmatter?", tag: "Auth gate" },
    { label: "Sanitize", description: "Escape XML, validate URLs, strip injection attempts", tag: "Safety gate" },
    { label: "Rate Limit", description: "Is the op count within the declared max for this run?", tag: "Control gate" },
    { label: "Audit", description: "Embed hidden gh-aw-workflow-id markers — every item searchable", tag: "Trace gate" }
  ]'
  footnote="Noop is the sixth implicit gate: every workflow must call noop when no action is needed — or the run fails silently."
  :progressDots='{ current: 4, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Five Pattern Families
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🗂️"
  pillLabel="Architecture: Pattern Vocabulary"
  title="Five Pattern Families — Your Bridge to Section 3"
  subtitle="Every use case in this talk maps to one of these patterns"
  :rows='[
    { label: "Continuous", description: "Scheduled improvements — simplification, docs, dependency upgrades", tag: "schedule:" },
    { label: "Reactive", description: "Event-triggered analysis — CI failure, PR opened, new issue", tag: "on: event" },
    { label: "Synthesis", description: "Aggregate and report repository state — health, release notes, digest", tag: "schedule:" },
    { label: "Interactive", description: "Comment command triggers — slash commands invoke in-thread responses", tag: "issue_comment" },
    { label: "Orchestrated", description: "Multi-agent dispatch and synthesis — parallel workers, summary report", tag: "dispatch-workflow" }
  ]'
  footnote="Pattern = trigger type + safe-output type. Once you know the pattern, the workflow almost writes itself."
  :progressDots='{ current: 5, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Two Comment Trigger Mechanisms
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🔀"
  pillLabel="Architecture: Two Trigger Mechanisms"
  title="Two Comment Trigger Mechanisms"
  subtitle="Compiled repository workflow vs. configured cloud-agent task — different ownership, different trust model"
  :left='{
    header: "Comment Workflows (gh-aw)",
    icon: "📝",
    items: [
      { title: "Repo-owned Markdown", detail: "Version-controlled, compiled to Actions via gh aw compile" },
      { title: "Safe-output governed", detail: "AI reads comment → validation pipeline → scoped handler" },
      { title: "Slash commands by convention", detail: "Your workflow Markdown defines what triggers what" },
      "Audit trail: hidden gh-aw-workflow-id markers in every created item"
    ]
  }'
  :right='{
    header: "Cloud-Agent Automations",
    icon: "⚙️",
    items: [
      { title: "Configured in Agents > Automations", detail: "Repository settings — not version-controlled Markdown" },
      { title: "Trigger text delegates agent tasks", detail: "Configured text in issue or PR comment initiates work" },
      { title: "Requires eligible Copilot plan", detail: "Business/Enterprise admin must enable the policy" },
      "Initiates documentation, investigation, or follow-up — not gh-aw slash commands"
    ]
  }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Patterns by Path & Maturity
<SectionOpenerSlide
  :partNumber="3"
  title="Patterns by Path & Maturity"
  subtitle="Find your cell — see which peers have already shipped it"
  :cards='[
    { icon: "🏷️", title: "Path A: Triage at Scale", blurb: "L1: Issue Triage → L2: PR Review → L3: Dependency Audit" },
    { icon: "📊", title: "Path B: Visibility & Synthesis", blurb: "L1: Health Report → L2: Release Notes → L3: Research Digest" },
    { icon: "🤖", title: "Path C: Orchestration", blurb: "L1: CI Failure → L2: Comment Workflows → L3: Multi-Agent" }
  ]'
  :terminal='{ context: "100+ workflows in Peli&#39;s Agent Factory — validated in continuous production", detail: "Specialize, don&#39;t monolith. Build many focused workflows." }'
/>

---

# Path A — Triage at Scale
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🏷️"
  pillLabel="Patterns: Path A — Triage at Scale"
  title="Path A: From Labels to Judgment"
  :columns='[
    { icon: "🌱", title: "L1 — Issue Triage", description: "on: issues.opened → read → apply 1-3 labels from allowed list → comment with reasoning.", items: ["Safe outputs: add-labels, add-comment", "15 minutes to ship", "Failure mode: hitting max (raise max: 3+)"] },
    { icon: "🌿", title: "L2 — Automated PR Review", description: "on: pull_request.opened → analyze diff → post inline review comments → submit COMMENT review.", items: ["Safe outputs: review-comment, submit-review", "1 hour to ship", "Failure mode: noop if diff is empty"] },
    { icon: "🌳", title: "L3 — Dependency Audit", description: "schedule: weekly → audit packages → group by risk → one contextual PR per upgrade decision.", items: ["Safe outputs: create-pull-request (draft, max: 3)", "1 day to ship", "Failure mode: noop if no upgrades found"] }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Path B — Visibility & Synthesis
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Patterns: Path B — Visibility & Synthesis"
  title="Path B: From Reports to Intelligence"
  :columns='[
    { icon: "🌱", title: "L1 — Weekly Health Report", description: "schedule: weekly → synthesize issues, PRs, activity → create summary issue (close-older: true).", items: ["Safe outputs: create-issue (close-older)", "15 minutes to ship", "Failure mode: low-signal noop spam"] },
    { icon: "🌿", title: "L2 — Release Notes", description: "on: release.created → read merged PRs → categorize changes → draft contextual notes for team review.", items: ["Safe outputs: create-issue for team review", "1 hour to ship", "Failure mode: noop if no merged PRs"] },
    { icon: "🌳", title: "L3 — Research Digest", description: "schedule: weekly → fetch HN, arXiv, GitHub Trending → filter for relevance → post curated digest.", items: ["Safe outputs: create-issue (expires: 8)", "1 day to ship", "Failure mode: noop if fewer than 3 relevant items"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Path C — Orchestration
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🤖"
  pillLabel="Patterns: Path C — Orchestration"
  title="Path C: From Reaction to Coordination"
  :columns='[
    { icon: "🌱", title: "L1 — CI Failure Diagnosis", description: "on: workflow_run (failure) → analyze logs → create structured issue with root cause and next steps.", items: ["Safe outputs: create-issue (close-older)", "15 minutes to ship", "Failure mode: noop if not a known failure type"] },
    { icon: "🌿", title: "L2 — Comment Workflows (gh-aw)", description: "Compiled to Actions → on issue_comment.created, AI reads, safe-output handler responds in-thread.", items: ["Safe outputs: add-comment, add-labels", "1 hour to ship", "Failure mode: noop if no command recognized"] },
    { icon: "🌳", title: "L3 — Multi-Agent Orchestration", description: "schedule: daily → dispatch worker workflows → collect results → synthesize coordinated report.", items: ["Safe outputs: dispatch-workflow, create-issue", "1 day to ship", "Failure mode: worker synchronization races"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Your Path Forward
<SectionOpenerSlide
  :partNumber="4"
  title="Your Path Forward"
  subtitle="Pick your path, commit your level, ship Monday morning"
  :cards='[
    { icon: "🗓️", title: "Week 1: Level 1", blurb: "Deploy one read-only workflow — low risk, instant value" },
    { icon: "📅", title: "Week 2-3: Safe Writes", blurb: "Add labels, comments, draft PRs with expiration guards" },
    { icon: "📆", title: "Month 2+: Level 3", blurb: "Orchestration, meta-workflows, multi-agent patterns" }
  ]'
  :terminal='{ context: "Every factory began with one workflow and one gh aw new", detail: "Start small. Specialize. Compound." }'
/>

---

# Your Maturity Progression Contract
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="📈"
  pillLabel="Your Path Forward: Progression"
  title="Level Up on Your Schedule"
  subtitle="A progression contract — not a deadline"
  :stages='[
    { label: "Week 1", name: "Level 1", description: "Deploy one read-only workflow on your chosen path — no safe writes, zero risk, instant value", icon: "🌱", isTarget: false },
    { label: "Week 2-3", name: "Safe Writes", description: "Add safe-output writes: labels, comments, draft PRs — with max and expires guardrails in frontmatter", icon: "📝", isTarget: false },
    { label: "Week 4+", name: "Level 2", description: "Build a path-specific workflow: PR review, release notes, or ChatOps commands depending on your path", icon: "🌿", isTarget: false },
    { label: "Month 2+", name: "Level 3", description: "Orchestration, meta-workflows, research digests — advanced patterns from Peli&#39;s factory", icon: "🌳", isTarget: true }
  ]'
  caption="Human-in-the-loop at every level: use draft: true for PRs and expires: 7 for issues until you trust the pattern."
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Monday Morning Action Plan
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Your Path Forward: First Steps"
  title="Monday Morning — Path by Path"
  subtitle="Install once, then go directly to your path"
  :rows='[
    { label: "Everyone", description: "gh extension install github/gh-aw → gh aw init → gh aw version", tag: "15 min" },
    { label: "Path A", description: "gh aw new issue-triage → edit body → compile → push", tag: "30 min" },
    { label: "Path B", description: "gh aw new weekly-health → set schedule: weekly → compile → push", tag: "30 min" },
    { label: "Path C", description: "gh aw new ci-diagnosis → set on: workflow_run → compile → push", tag: "30 min" }
  ]'
  footnote="Browse githubnext/agentics for ready-made templates — add any workflow with gh aw add."
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before & After
<BeforeAfterSlide
  header="From Scripted Steps to Adaptive Intent"
  :leftItems='[
    "240-line YAML workflow with explicit steps and conditionals",
    "Debugging requires log-diving for every edge case encountered",
    "Requirements change: rewrite the step sequence from scratch",
    "AI has direct write access or no automation at all"
  ]'
  :rightItems='[
    "8-line Markdown intent statement — describe the outcome, not the path",
    "gh aw compile catches errors before they reach production",
    "Requirements change: edit the Markdown body, no recompile needed",
    "AI reads everything, validation pipeline executes only validated writes"
  ]'
  :metrics='[
    { value: "30×", detail: "reduction in workflow definition length" },
    { value: "100+", detail: "workflows validated in continuous production" },
    { value: "0", detail: "direct writes — every mutation through the validation pipeline" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Install: gh extension install github/gh-aw and run gh aw version",
    "Pick your path: A (triage), B (reporting), or C (orchestration)",
    "Run gh aw new and write your first Markdown workflow in minutes"
  ]'
  :thisWeek='[
    "Compile and deploy a Level 1 workflow on your chosen path",
    "Study gh aw logs — understand how the validation pipeline works",
    "Browse githubnext/agentics for templates matching your path"
  ]'
  :thisMonth='[
    "Add safe writes (labels, comments, draft PRs) with expiration guardrails",
    "Implement an Orchestrator-Worker pattern across 2-3 specialized workflows",
    "Build a meta-workflow that monitors and optimizes your other workflows"
  ]'
  footer="Start with one workflow. Every compound improvement begins with a single gh aw new."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/", label: "GitHub Blog: Automate repository tasks with GitHub Agentic Workflows" },
      { href: "https://github.github.com/gh-aw/setup/quick-start/", label: "GitHub Agentic Workflows: Quick Start Guide" },
      { href: "https://github.github.com/gh-aw/setup/creating-workflows/", label: "GitHub Agentic Workflows: Creating Workflows" },
      { href: "https://github.github.io/gh-aw/reference/safe-outputs/", label: "GitHub Agentic Workflows: Safe Outputs Reference" }
    ] },
    { title: "🛠️ Community & Examples", color: "purple", items: [
      { href: "https://github.com/githubnext/agentics", label: "githubnext/agentics — Sample Pack of Agentic Workflows" },
      { href: "https://josh-ops.com/posts/github-agentic-workflows/", label: "Josh-Ops: Getting Started with GitHub Agentic Workflows" },
      { href: "https://shinglyu.com/blog/2026/04/15/automating-weekly-research-with-github-agentic-workflows.html", label: "Automating Weekly Research with GitHub Agentic Workflows" },
      { href: "https://www.eriklieben.com/posts/agentic-dev-workflow-dependency-management/", label: "Erik Lieben: Dependency Updates That Understand Your Code" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Agentic Workflows"
  subtitle="Repository automation that judges, adapts, and compounds — while you sleep."
  :cards="[
    { icon: '✍️', value: '8-line Markdown', detail: 'Replaces 240-line YAML', subdetail: 'Compiler generates the secure lock file — author discipline not required' },
    { icon: '🔐', value: 'Zero direct writes', detail: 'Compiler-enforced security', subdetail: 'Read-only AI + validation pipeline + scoped handler jobs at every run' },
    { icon: '🚀', value: '15 minutes', detail: 'To your first deployed workflow', subdetail: 'gh aw new → compile → push — pick your path and start today' }
  ]"
  prompt="Which path is yours — and what&#39;s your Level 1 workflow?"
/>
