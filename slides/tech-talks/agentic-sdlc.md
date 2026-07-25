---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Agentic SDLC
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Agentic SDLC
mdc: true
section: Agentic Engineering
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
</script>

# Title
<TitleSlide
  title="Agentic SDLC"
  subtitle="Designing the SDLC Your Agents Deserve"
  tagline="Five maturity levels — platform readiness, developer adoption, and governance that compound"
  meta="CopilotTraining Tech Talk"
/>

---

# Core Question
<CoreQuestionSlide
  question="How do you know if your SDLC is ready for agents — and what do you build first?"
  subtext="Most teams add agents to an SDLC designed for humans and wonder why throughput doesn&#39;t scale. The answer is not the agent — it is the pipeline around it."
  highlight="Platform without adoption stalls at L3. Adoption without platform never reaches L5. Both must advance together — and L3 is where they first compound."
  :cards='[
    { icon: "🧑‍💻", title: "Developers", description: "What does an agent-ready SDLC look like — and how do I know if mine qualifies?" },
    { icon: "🏗️", title: "Platform Engineers", description: "Which CI, repo, and governance changes give agents the most productivity?" },
    { icon: "🏢", title: "Engineering Leaders", description: "How do I assess where we are today and build a credible roadmap to L5?" },
    { title: "50× code volume", description: "Habits for 300 lines/day collapse at 15,000 — the L5 breakpoint every team hits" },
    { title: "96× faster", description: "Same agent work: 3 days in a polyrepo vs. 45 min in a monorepo" },
    { title: "5× throughput", description: "8-min CI delivers 15 features/day vs. 3/day at 60 min — same agents" }
  ]'
/>

---

# Overview
<TocSlide
  :sections='[
    { icon: "📐", title: "Maturity Model", blurb: "L1 Functional → L5 Autonomous — know exactly where your org sits today", slide: 4 },
    { icon: "🔀", title: "PR Workflows", blurb: "22 manual gates → 4 checkpoints — review capacity scales with agent output", slide: 8 },
    { icon: "🏭", title: "Trust Manufacturing", blurb: "CI as trust factory — 10-min threshold, zero-flake, attestations", slide: 13 },
    { icon: "🗺️", title: "Implementation Roadmap", blurb: "Phase-by-phase path: L3 is the launchpad, L5 is the destination", slide: 16 }
  ]'
/>

---

# Part 1 — Maturity Model
<SectionOpenerSlide
  :partNumber="1"
  title="Maturity Model"
  subtitle="Rate where your org sits today — then choose investments that close the gap."
  :cards='[
    { icon: "📊", title: "Five Levels", blurb: "L1 Functional → L5 Autonomous — clear signals per level" },
    { icon: "🏗️", title: "Platform Signals", blurb: "Tooling, MCP, CI speed, governance gates — what you build" },
    { icon: "🧑‍💻", title: "Adoption Signals", blurb: "Usage, habits, instruction quality, delegation — how teams use it" }
  ]'
  :terminal='{ context: "Assess → Govern → Trust → Scale", detail: "Each section solves the bottleneck the previous one exposed" }'
/>

---

# L1–L5 Maturity Assessment
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📐"
  pillLabel="Maturity Model · Assessment"
  title="Five Levels of Agentic Readiness"
  :rows='[
    { label: "L1 Functional",  description: "Build scripts run reliably, basic CI exists, no flaky failures",             tag: "Baseline" },
    { label: "L2 Documented",  description: "copilot-instructions.md versioned, Chat habitual, conventions explicit",     tag: "Onboarding" },
    { label: "L3 Standard",    description: "MCP ≥1, CCR default, GHAS enabled, CCA delegated, MAU ≥60%",                tag: "Standardized" },
    { label: "L4 Optimized",   description: "MCP ≥2 enterprise, coding agents in PR flow, seat utilization ≥80%",        tag: "Optimized" },
    { label: "L5 Autonomous",  description: "Agents own features end-to-end, Metrics API + DORA correlated",             tag: "Autonomous" }
  ]'
  :insight='{ icon: "🎯", text: "Platform without adoption stalls at L3. Adoption without platform never reaches L5. Both must advance." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The L5 Breakpoint
<HeroStatSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="Maturity Model · Breakpoint"
  title="The Volume Flip: Where Review Habits Collapse"
  subtitle="Scarcity shifts from writing code to trusting it at velocity"
  :hero='{ value: "50×", label: "more code to review — habits designed for 300 lines/day collapse at 15,000", source: "" }'
  :supporting='[
    { icon: "✍️", title: "L3 assumption", description: "Humans produce 300 lines/day — line-by-line review is feasible" },
    { icon: "🤖", title: "L5 reality", description: "Agents produce 15,000 lines/day — detail review is impossible" },
    { icon: "🔀", title: "What must change", description: "PR governance and CI speed both need L5-native redesign" },
    { icon: "💡", title: "The insight", description: "The bottleneck is not writing code — it is manufacturing trust at velocity" }
  ]'
  :insight='{ icon: "🎯", text: "At L5, scarcity moves from code production to trust production. Every section that follows addresses one layer of that shift." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Instruction Hierarchy
<MaturityJourneyRoadmapSlide
  :partNumber="1"
  pillIcon="📜"
  pillLabel="Maturity Model · Instructions"
  title="Instruction Hierarchy: Highest-Leverage Cross-Cutting Investment"
  subtitle="One investment that compounds at every maturity level — treat config as first-class code"
  :stages='[
    { label: "Org",   name: "Organization Instructions", description: "GitHub Settings → Copilot → Custom Instructions — Chat, CCR, CCA", icon: "🏢", isTarget: false },
    { label: "Repo",  name: "copilot-instructions.md",   description: ".github/copilot-instructions.md — coding standards, architecture", icon: "📁", isTarget: false },
    { label: "Agent", name: "AGENTS.md",                  description: "Build commands, test patterns, PR conventions — CCA as team member", icon: "🤖", isTarget: false },
    { label: "Task",  name: "Skills &amp; Prompts",       description: ".github/skills/*.md (workflows) + .github/prompts/*.prompt.md",   icon: "📄", isTarget: false },
    { label: "Code",  name: "Coding Guidelines",          description: "GitHub → Repository Settings → Copilot → Code Review (CCR)",     icon: "✅", isTarget: true }
  ]'
  caption="Version in GitHub repos, review in PRs, evolve alongside the codebase — this is what separates good from excellent"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — PR Workflows
<SectionOpenerSlide
  :partNumber="2"
  title="PR Workflows"
  subtitle="Coordination is solved — now review capacity is the bottleneck."
  :cards='[
    { icon: "🔺", title: "Governance Pyramid", blurb: "22 manual gates → 4 checkpoints + 90% automated" },
    { icon: "🤖", title: "Agent Validation", blurb: "Context-aware: 44 real warnings vs 847 false positives" },
    { icon: "👁️", title: "Human Judgment", blurb: "Architects review architecture and intent — not every line" }
  ]'
  :terminal='{ context: "Review capacity per engineer after governance automation", detail: "300 lines/day → 15,000 lines/day" }'
/>

---

# How Review Mode Shifts by Level
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🔀"
  pillLabel="PR Workflows · Maturity Context"
  title="How Review Mode Shifts at Each Level"
  :rows='[
    { label: "L1 Functional",  description: "Manual verification — basic tooling, no Copilot habits",                         tag: "Manual" },
    { label: "L2 Documented",  description: "Human review with Copilot Chat context — completions habitual",                  tag: "Assisted" },
    { label: "L3 Standard",    description: "Repeatable gates: CCR on all PRs, branch rulesets, CCA delegated",               tag: "Gated" },
    { label: "L4 Optimized",   description: "Context-aware automation + human exception handling — MCP ≥2",                   tag: "Automated" },
    { label: "L5 Autonomous",  description: "Outcome validation: 4 checkpoints, 90% automated — Metrics + DORA",             tag: "Outcome" }
  ]'
  :insight='{ icon: "⚠️", text: "Most PR systems feel fine through L1–L4 then break when teams try L5 volume with L3 review habits." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# L3 vs L5 Review Habits
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="🔀"
  pillLabel="PR Workflows · The Mismatch"
  title="L3 Review Habits vs. L5 Agent Volume"
  subtitle="Same governance model, 50× the volume — the math doesn&#39;t work"
  leftLabel="L3 PR Review"
  rightLabel="L5 PR Review"
  :steps='[
    { left: { label: "Read every line", note: "50–200 line change, 30-min review" }, right: { label: "Validate intent", note: "500–2000 lines — read requirements, not implementation" } },
    { left: { label: "Discussion threads", note: "Why did you use a Map here?" }, right: { label: "Evidence bundle check", note: "Tests passed, security clean, coverage met" } },
    { left: { label: "Manual compliance", note: "Security team reviews every auth change" }, right: { label: "Automated gates", note: "90% of checks automated — humans review exceptions" } },
    { left: { label: "LGTM after 3 hrs", note: "300 lines/day/reviewer capacity" }, right: { label: "Approved after 20 min", note: "15,000 lines/day/reviewer capacity" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "4–7 days PR to merge at L5 volume" }'
  :outcomeRight='{ icon: "✓", label: "2–4 hours PR to merge" }'
  summaryMetric="50× review capacity increase — same engineers, governance automation does the heavy lifting"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Governance Pyramid Inversion
<BeforeAfterMetricsSlide
  :partNumber="2"
  pillIcon="🔺"
  pillLabel="PR Workflows · Governance"
  title="Governance Pyramid Inversion: 22 Gates → 4 Human Checkpoints"
  :before='{
    header: "Traditional Governance",
    items: [
      { title: "22 manual approval gates", detail: "Security, compliance, architect, QA, lead — each per PR" },
      "Senior architect reviews every architecture decision",
      "Security team manually reviews every auth change",
      { title: "Result", detail: "4–7 days from PR to merge" }
    ]
  }'
  :after='{
    header: "L5 Governance",
    items: [
      { title: "4 human checkpoints", detail: "Intent, security risk, architectural fit, outcome validation" },
      "90% of checks automated — security, compliance, quality",
      "Architects review violations and exceptions only",
      { title: "Result", detail: "2–4 hours from PR to merge" }
    ]
  }'
  :metrics='[
    { value: "90%", label: "automated enforcement" },
    { value: "50×", label: "review capacity per engineer" },
    { value: "4 hrs", label: "avg time to merge" }
  ]'
  :insight='{ icon: "💡", text: "CODEOWNERS + required reviewers + automated status checks — humans judge architecture, intent, and strategic risk." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Context-Aware Agent Validation
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🤖"
  pillLabel="PR Workflows · Agent Review"
  title="Context-Aware Validation: Judgment, Not Pattern Matching"
  :left='{
    header: "Rules-Based Scan",
    icon: "⚠️",
    items: [
      { title: "847 warnings generated", detail: "Regex pattern fires on every match" },
      "803 false positives — test fixtures, docs, examples",
      { title: "Developers ignore all warnings", detail: "Signal lost in the noise" },
      "Actual PII violation ships to production"
    ]
  }'
  :right='{
    header: "Agent Validation",
    icon: "✅",
    items: [
      { title: "44 real warnings generated", detail: "Agent reads context: fixture vs. production handler" },
      "2 false positives — 97% signal quality",
      { title: "Developers trust the signal", detail: "Every flag comes with reasoning" },
      "Actual violations caught before merge — always"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Trust Manufacturing
<SectionOpenerSlide
  :partNumber="3"
  title="Trust Manufacturing"
  subtitle="Review scales — now you need CI to manufacture trust at velocity."
  :cards='[
    { icon: "⏱️", title: "10-Minute Threshold", blurb: "Agents idle 80% at 60-min CI, productive 95% at 8-min CI" },
    { icon: "🚫", title: "Zero-Flake Tolerance", blurb: "Quarantine on first flake, fix in 2 days — green means trustworthy" },
    { icon: "📜", title: "Attestations", blurb: "SLSA evidence trails for regulated environments and audit" }
  ]'
  :terminal='{ context: "Features per day: 60-min CI vs 8-min CI, same agents running continuously", detail: "3 features/day → 15 features/day" }'
/>

---

# CI Manufacturing Principles
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="🏭"
  pillLabel="Trust Manufacturing · Principles"
  title="Manufacturing Principles Applied to CI"
  :rows='[
    { label: "Repeatable",   description: "Same checks, same order, every time — reliable trust signals",           tag: "Deterministic" },
    { label: "Automated",    description: "327 tests in 8 min, 10,000 security patterns in 45 sec",                tag: "At Scale" },
    { label: "Evidence",     description: "Every check produces auditable, tamper-evident attestations",            tag: "SLSA" },
    { label: "Fast",         description: "Agents idle 80% at 60-min CI, productive 95% at 8-min",                 tag: "< 10 min" },
    { label: "Zero Flake",   description: "Quarantine on first flake, fix in 2 days — green = trustworthy",        tag: "100% Signal" }
  ]'
  :insight='{ icon: "🏭", text: "The goal: trust that scales linearly with agent output — not quadratically with human review time." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The 10-Minute Threshold
<HeroStatSlide
  :partNumber="3"
  pillIcon="⏱️"
  pillLabel="Trust Manufacturing · Threshold"
  title="The 10-Minute Threshold: CI Speed Is Agent Productivity"
  subtitle="Agents sit idle waiting for CI — faster feedback means higher throughput"
  :hero='{ value: "5×", label: "more features per day: 3/day at 60-min CI vs. 15/day at 8-min CI — same agents", source: "" }'
  :supporting='[
    { icon: "💤", title: "60-minute CI", description: "Agents idle 80% — 4 iteration cycles = 4 hours of wall time" },
    { icon: "⚡", title: "8-minute CI", description: "Agents productive 95% — 4 iteration cycles = 52 minutes" },
    { icon: "🔧", title: "How to get there", description: "Affected analysis + parallelization + caching: test only what changed" },
    { icon: "📈", title: "Cache economics", description: "15th feature costs 2-min CI (cache hit) — marginal trust cost near zero" }
  ]'
  :insight='{ icon: "🎯", text: "Target: <10 min for PR checks. Every minute over 10 is agent idle time, compounded across 15 PRs/day." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Implementation Roadmap
<SectionOpenerSlide
  :partNumber="4"
  title="Implementation Roadmap"
  subtitle="Trust is automated — now a phased plan from where you are to L5."
  :cards='[
    { icon: "⚙️", title: "Phase 1: Standardized", blurb: "L3 — where platform, adoption, and quality first compound" },
    { icon: "🤖", title: "Phase 2: Optimized", blurb: "L4 — enterprise governance, advanced agents, deliberate adoption" },
    { icon: "🚀", title: "Phase 3: Autonomous", blurb: "L5 — agents own features end-to-end; ROI measured and reported" }
  ]'
  :terminal='{ context: "Platform and adoption must advance together", detail: "L3 is the launchpad — skip it and L5 collapses under its own weight" }'
/>

---

# Phase 1 — Standardized Foundation (L3)
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="⚙️"
  pillLabel="Roadmap · Phase 1: L3"
  title="Phase 1: Standardized Foundation (L3)"
  :left='{
    header: "Infrastructure",
    icon: "🏗️",
    items: [
      { title: "MCP ≥1 enterprise system", detail: "Internal docs, DB schema, or CI feedback connected" },
      { title: "CCR as default reviewer", detail: "Automatic on all PRs in target repositories" },
      { title: "GHAS enabled", detail: "CodeQL, secret scanning, Dependabot on every PR" },
      { title: "Repo topology", detail: "Consolidate to monorepo if >30% of features cross repo boundaries" }
    ]
  }'
  :right='{
    header: "Adoption & Governance",
    icon: "🧑‍💻",
    items: [
      { title: "copilot-instructions.md versioned", detail: "Reviewed in PRs like any other code change" },
      { title: "Copilot MAU ≥60%", detail: "Chat + completions + CLI habitual, not experimental" },
      { title: "CCA delegated ≥3–5 issues/sprint", detail: "Issue templates structured for agent success" },
      "≥5 custom coding guidelines co-authored with tech lead"
    ]
  }'
  :insight='{ icon: "📜", text: "Instruction Hierarchy: establish org instructions + copilot-instructions.md + AGENTS.md — the foundation everything builds on." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Phase 2 — Optimized Governance (L4)
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🤖"
  pillLabel="Roadmap · Phase 2: L4"
  title="Phase 2: Optimized Governance (L4)"
  :left='{
    header: "Infrastructure",
    icon: "🏗️",
    items: [
      { title: "MCP ≥2 enterprise systems", detail: "Multi-step orchestration: CCA + MCP + custom instructions" },
      { title: "Coding agents in PR flow", detail: "CCA PR merge rate ≥60%, time to merge trending down" },
      { title: "Org-level governance", detail: "Enterprise Copilot settings deliberate, not defaults" },
      "Policy-gated PR automation deployed"
    ]
  }'
  :right='{
    header: "Adoption & Governance",
    icon: "🧑‍💻",
    items: [
      { title: "CCR tuned, false positives <20%", detail: "Custom coding guidelines ≥10, iterated from feedback" },
      { title: "Seat utilization ≥80%", detail: "Inactive seats reallocated; PRU governance in place" },
      { title: "Copilot Memory enabled", detail: "Monthly curation cadence established" },
      "PR review turnaround reduced ≥30% vs. pre-CCR baseline"
    ]
  }'
  :insight='{ icon: "📜", text: "Instruction Hierarchy matures: AGENTS.md + prompt files + skills covering top workflows, guidelines tuned from CCR patterns." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Phase 3 — Autonomous Scale (L5)
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🚀"
  pillLabel="Roadmap · Phase 3: L5"
  title="Phase 3: Autonomous Scale (L5)"
  :left='{
    header: "Infrastructure",
    icon: "🏗️",
    items: [
      { title: "End-to-end feature delivery", detail: "Intent spec → agent implementation → CI trust → merge → deploy" },
      { title: "CI trust factory operational", detail: "<10-min PR checks; zero-flake enforced; SLSA attestations" },
      { title: "Governance pyramid inverted", detail: "4 checkpoints, 90% automated — 15,000 lines/day/reviewer" },
      "Policy-gated auto-merge live in production"
    ]
  }'
  :right='{
    header: "Adoption & Measurement",
    icon: "📊",
    items: [
      { title: "Metrics API + DORA correlated", detail: "Copilot usage tied to deployment frequency and PR cycle time" },
      { title: "ROI narrative produced", detail: "Leadership has quantified evidence: X% cycle time reduction" },
      { title: "Champions program active", detail: "≥2 champions per team coaching peers and iterating instructions" },
      "Self-sufficiency score ≥4/5 — team sustains and extends independently"
    ]
  }'
  :insight='{ icon: "🚀", text: "L5 is not a destination — it is the compounding result of L1–L4 doing their job. Miss any layer and the system bottlenecks." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before and After
<BeforeAfterSlide
  header="What Changes When the SDLC Is Agent-Ready"
  :leftItems='[
    "Line-by-line PR review — 300 lines/day per engineer",
    "Flaky CI makes green builds untrustworthy signals",
    "Coordination overhead across repos delays features",
    "22 manual approval gates slow governance to days"
  ]'
  :rightItems='[
    "Outcome-based review — 15,000 lines/day per engineer",
    "Zero-flake tolerance — green always means trustworthy",
    "Atomic monorepo changes eliminate coordination tax",
    "4 human checkpoints replace 22 gates — hours not days"
  ]'
  :metrics='[
    { value: "50×", detail: "review capacity per engineer" },
    { value: "96×", detail: "faster to production (45 min vs 3 days)" },
    { value: "5×", detail: "features per day at L5 vs L3 CI speed" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Run the L1–L5 maturity assessment for your team — platform and adoption both"
  ]'
  :thisWeek='[
    "Add or update .github/copilot-instructions.md and version it in a PR",
    "Enable Copilot Code Review as automatic reviewer on your primary repo",
    "Measure your CI p95 time — if it exceeds 10 min, you have a target"
  ]'
  :thisMonth='[
    "Version AGENTS.md in every CCA-enabled repository",
    "Create prompt files for your top 3 repeatable workflows",
    "Evaluate monorepo migration if >30% of features cross repo boundaries",
    "Set a zero-flake policy — quarantine on first flake, fix in 2 days"
  ]'
  footer="L3 is the launchpad — every investment made there compounds at L4 and L5."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 AgentRC Framework", color: "cyan", items: [
      { href: "https://github.com/microsoft/agentrc", label: "Microsoft AgentRC Repository", description: "Measure, generate, and maintain loop for repository AI readiness" },
      { href: "https://github.com/microsoft/agentrc/blob/main/docs/concepts.md", label: "AgentRC Concepts and Maturity Model", description: "Maturity levels, readiness pillars, and how autonomy is staged" }
    ]},
    { title: "⚙️ Infrastructure Tools", color: "blue", items: [
      { href: "https://nx.dev/", label: "Nx Monorepo Tools", description: "Build orchestration, module boundaries, and affected analysis" },
      { href: "https://docs.github.com/en/actions", label: "GitHub Actions Documentation", description: "CI/CD workflow automation for agent-native pipelines" },
      { href: "https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows", label: "GitHub Actions Caching Guide", description: "Dependency caching for faster CI feedback loops" }
    ]},
    { title: "🔒 Security and Compliance", color: "purple", items: [
      { href: "https://slsa.dev/", label: "SLSA Supply Chain Security Framework", description: "Attestation standards for regulated environments and audit trails" }
    ]}
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="Agentic SDLC"
  subtitle="Designing the SDLC Your Agents Deserve"
  prompt="Which maturity level are you at today — and what is the one infrastructure investment that would move you to the next?"
  :cards='[
    { value: "50×", detail: "more review capacity — governance pyramid inverted, 22 gates → 4 checkpoints" },
    { value: "96×", detail: "faster to production — monorepo eliminates the coordination tax" },
    { value: "5×", detail: "more features per day — 8-min CI keeps agents productive 95% of the time" }
  ]'
/>
