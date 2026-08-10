---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Code Quality
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Code Quality
mdc: true
section: Developers
status: active
updated: 2026-07-24
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
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

<!-- SLIDE: Title -->
<TitleSlide
  title="GitHub Code Quality"
  subtitle="Turning Maintainability Into a Merge Gate"
  tagline="Coverage, maintainability, and reliability become a status check your merge depends on."
  meta="CopilotTraining · Tech Talk"
/>

---

<!-- SLIDE: Agenda -->
# Agenda
<AgendaSlide
  :items='[
    { title: "Quality as a Gate", takeaway: "Make quality signals enforceable status checks on pull requests.", whyItMatters: "Metrics matter when they protect the merge decision." },
    { title: "Observe Before Enforce", takeaway: "Use evaluation mode to tune rules before blocking work.", whyItMatters: "Teams build trust while reducing rollout surprises." },
    { title: "Predictable Rollout", takeaway: "Plan adoption and cost by repository and committer.", whyItMatters: "Deliberate enablement makes quality infrastructure sustainable." }
  ]'
/>

---

<!-- SLIDE: Core Question -->
<CoreQuestionSlide
  question="How does GitHub Code Quality turn quality signals into an enforceable merge gate?"
  subtext="GitHub Code Quality went GA in July 2026 with coverage gates and Autofix —"
  highlight="and a new per-committer bill to plan for."
  :cards='[
    { icon: "🧑‍💻", title: "Developers", description: "See coverage deltas and Autofix suggestions right inside every PR" },
    { icon: "🛡️", title: "Repo Admins", description: "Turn maintainability and coverage into a merge requirement via rulesets" },
    { icon: "🏢", title: "Platform Teams", description: "Roll out org-wide without surprise per-committer billing" },
    { title: "$10/committer", description: "Base license cost per active committer per month, org-wide" },
    { title: "67.3%", description: "Self-reported share of findings resolved before merge" },
    { title: "GA: Jul 20, 2026", description: "Public preview ended; usage-based billing now active" }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
<TocSlide
  :sections='[
    { icon: "📊", title: "Coverage Gates", subtitle: "Cobertura reports become a merge condition", blurb: "See a ruleset turn a coverage drop into a failing PR check", slide: 4 },
    { icon: "🤖", title: "Autofix in the PR Loop", subtitle: "Findings, fixes, and human approval in one place", blurb: "Walk through the scan-to-merge review flow", slide: 9 },
    { icon: "💳", title: "Reading the Bill", subtitle: "Active committers, AI credits, and Actions minutes", blurb: "Work through a real worked-example cost estimate", slide: 13 },
    { icon: "🚦", title: "Rolling Out Without Surprises", subtitle: "Enable, evaluate, then enforce — safely", blurb: "Get a concrete staged rollout you can run this week", slide: 18 },
  ]'
/>

---

<!-- SLIDE: Part 1 — Coverage-Aware Quality Gates -->
<SectionOpenerSlide
  :partNumber="1"
  title="Coverage-Aware Quality Gates"
  subtitle="Cobertura coverage reports become a real, enforceable PR status check"
  :cards='[
    { icon: "📈", title: "Coverage on Every PR", blurb: "Delta shown inline, no separate dashboard" },
    { icon: "🔐", title: "Ruleset Enforcement", blurb: "Minimum coverage as a real merge gate" },
    { icon: "🧪", title: "Evaluate Mode First", blurb: "See what would fail before anything blocks" },
  ]'
  :terminal='{ context: "A PR drops coverage by 4%...", detail: "...and the merge check fails before anyone reviews it" }'
/>

---

<!-- SLIDE: Four Pieces of the Coverage Gate -->
<FourCardGridSlide
  :partNumber="1"
  pillIcon="📈"
  pillLabel="Coverage Gates: Overview"
  title="Four Pieces of the Coverage Gate"
  :cards='[
    { icon: "🧾", title: "Cobertura Upload", description: "CI emits a Cobertura XML report from any test framework" },
    { icon: "📊", title: "PR Coverage Delta", description: "Code Quality shows the percentage change directly on the PR" },
    { icon: "🧪", title: "Evaluate Mode", description: "Ruleset reports what would fail without blocking anything" },
    { icon: "🔒", title: "Active Mode", description: "Same ruleset now blocks merge below the threshold" }
  ]'
  :insight='{ icon: "🎯", text: "Key Insight: evaluate mode is the safety net between never gating and always gating." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: coverage-ruleset.json -->
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🔐"
  pillLabel="Ruleset: Coverage Threshold"
  title="coverage-ruleset.json — Evaluate First, Active Later"
  codePosition="left"
  :code='{ language: "json", filename: "coverage-ruleset.json", content: "{\n  \"name\": \"Require 80% coverage on main\",\n  \"target\": \"branch\",\n  \"enforcement\": \"evaluate\",\n  \"rules\": [\n    {\n      \"type\": \"code_quality\",\n      \"parameters\": { \"minimum_coverage_percentage\": 80 }\n    }\n  ]\n}" }'
  :features='[
    { icon: "🧪", title: "Evaluate Mode Ships First", description: "Enforcement starts as evaluate — nothing blocks until you flip it" },
    { icon: "📏", title: "Reads the Coverage Delta", description: "minimum_coverage_percentage checks the number Cobertura already computed" },
    { icon: "🔓", title: "One-Line Switch to Active", description: "Flip enforcement to active once evaluate-mode data looks trustworthy" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: quality-gate-workflow.yml -->
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🧾"
  pillLabel="Coverage Upload Workflow"
  title="quality-gate-workflow.yml — Feeding the Gate"
  codePosition="left"
  :code='{ language: "yaml", filename: "quality-gate-workflow.yml", content: "permissions:\n  contents: read\n  code-quality: write\n  pull-requests: read\n\njobs:\n  test:\n    steps:\n      - run: pytest --cov=. --cov-report=xml:cobertura.xml\n      - uses: actions/upload-code-coverage@v1\n        with:\n          file: cobertura.xml\n          language: Python\n          label: code-coverage/pytest" }'
  :features='[
    { icon: "🔑", title: "code-quality: write Required", description: "Without this permission the upload step fails silently" },
    { icon: "🧬", title: "Any Cobertura-Compatible Tool", description: "pytest-cov, JaCoCo, or nyc/Istanbul all work the same way" },
    { icon: "🏷️", title: "Labeled Uploads", description: "The label field keeps multiple coverage reports distinct in a monorepo" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: From Weekly Dashboard to Inline PR Check -->
<BeforeAfterPanelsSlide
  :partNumber="1"
  pillIcon="🔁"
  pillLabel="Coverage: Before vs After"
  title="From Weekly Dashboard to Inline PR Check"
  :before='{
    header: "Before",
    items: [
      "Coverage checked in a separate dashboard",
      "Reviewed weekly, after code already merged",
      "“We should have 80% coverage” as a team norm"
    ]
  }'
  :after='{
    header: "After",
    items: [
      "Coverage delta shown inline on every PR",
      "Reviewed before merge, not after",
      "80% coverage as a ruleset the PR cannot bypass in active mode"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — Copilot Autofix in the PR Loop -->
<SectionOpenerSlide
  :partNumber="2"
  title="Copilot Autofix in the PR Loop"
  subtitle="Findings, one-click fixes, and human approval, all inside the PR"
  :cards='[
    { icon: "🔎", title: "Maintainability + Reliability", blurb: "CodeQL plus AI-assisted detection, one finding stream" },
    { icon: "🩹", title: "One-Click Autofix", blurb: "Suggested fix applied without leaving the PR" },
    { icon: "🗂️", title: "Default-Branch Backlog", blurb: "Legacy debt scored and assignable to Copilot" },
  ]'
  :terminal='{ context: "A reliability finding posts on the PR with a suggested fix", detail: "Developer applies it, reviewer still approves before merge" }'
/>

---

<!-- SLIDE: Maintainability vs Reliability Findings -->
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🔎"
  pillLabel="Two Finding Categories"
  title="Maintainability vs Reliability Findings"
  :left='{
    header: "Maintainability",
    icon: "🧩",
    items: [
      { title: "Complexity & duplication", detail: "Makes future changes harder" },
      "Readability issues flagged with severity"
    ]
  }'
  :right='{
    header: "Reliability",
    icon: "🐛",
    items: [
      { title: "Known bug patterns", detail: "The deterministic CodeQL query set" },
      "AI-assisted detection for patterns outside existing CodeQL queries"
    ]
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: From Open PR to Approved Merge -->
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🔁"
  pillLabel="The Review Flow"
  title="From Open PR to Approved Merge"
  subtitle="Four steps, all inside the same pull request"
  :rows='[
    { label: "1. Scan", description: "PR opens or updates; Code Quality scans the diff", tag: "on: pull_request" },
    { label: "2. Comment", description: "Findings post grouped by maintainability and reliability", tag: "severity" },
    { label: "3. Autofix", description: "Developer applies the suggested fix with one click", tag: "one-click" },
    { label: "4. Approve", description: "A human reviewer still approves before anything merges", tag: "required" }
  ]'
  footnote="Autofix proposes — it never merges on its own"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: The Default Branch Gets Scanned Too -->
<HeroStatSlide
  :partNumber="2"
  pillIcon="🗂️"
  pillLabel="Working Off Quality Debt"
  title="The Default Branch Gets Scanned Too"
  subtitle="Legacy findings become a scored, assignable backlog"
  :hero='{ value: "67.3%", label: "of findings self-reported resolved before merge, internally at GitHub", source: "Source: GitHub Changelog, July 2026 GA announcement" }'
  :supporting='[
    { icon: "📊", title: "Same Scoring Model", description: "Default-branch findings use the same maintainability and reliability scores as PR findings" },
    { icon: "🤖", title: "Assignable to Copilot", description: "High-severity findings can be handed to the Copilot coding agent as a draft PR" },
    { icon: "📈", title: "Org Dashboard Rollup", description: "Findings across every enabled repo roll up into one quality-debt view" }
  ]'
  :insight='{ icon: "🎯", text: "Key Insight: legacy debt becomes a queue you work off, not a wall you stare at." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Reading the Bill -->
<SectionOpenerSlide
  :partNumber="3"
  title="Reading the Bill"
  subtitle="Active committers, AI credits, and CodeQL compute — three independent line items"
  :cards='[
    { icon: "🧑‍🤝‍🧑", title: "Active Committers", blurb: "$10/month per person, counted once org-wide" },
    { icon: "🤖", title: "AI Credits", blurb: "Usage-based charge for AI-assisted detection and Autofix" },
    { icon: "⚙️", title: "CodeQL Compute", blurb: "Scans run as GitHub Actions minutes" },
  ]'
  :terminal='{ context: "A 50-person org enables Code Quality across 12 repos", detail: "The bill is still just 50 committers — not 12× that" }'
/>

---

<!-- SLIDE: What Actually Shows Up on the Invoice -->
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🧾"
  pillLabel="The Three Line Items"
  title="What Actually Shows Up on the Invoice"
  :columns='[
    { icon: "🧑‍🤝‍🧑", title: "Active Committers", description: "$10/month per person who pushed to an enabled repo in the trailing 90 days", items: ["Counted once per org, not per repo", "Bot accounts excluded"] },
    { icon: "🤖", title: "AI Credits", description: "≈$0.01/credit for AI-assisted detection and Autofix generation", items: ["No separate Copilot subscription required"] },
    { icon: "⚙️", title: "CodeQL Compute", description: "Scans run as GitHub Actions minutes, or self-hosted runner cost", items: ["Standalone charge, not bundled with GHAS"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: 50 Active Committers, 12 Repos -->
<HeroStatSlide
  :partNumber="3"
  pillIcon="💵"
  pillLabel="Worked Example"
  title="50 Active Committers, 12 Repos"
  subtitle="The base license cost is the same whether it is one repo or twelve"
  :hero='{ value: "$500+/mo", label: "estimated base license cost before AI credits or Actions overage", source: "Source: cost-estimation-worksheet.md worked example" }'
  :supporting='[
    { icon: "🔢", title: "Org-Wide, Not Per-Repo", description: "The same 50 people enabled on 1 repo or 12 repos cost the same base license" },
    { icon: "📉", title: "Disabling Shrinks the Count", description: "Removing a repo drops its unique committers out of the active count going forward" },
    { icon: "📋", title: "Audit Before Billing Starts", description: "The highest-leverage cost control is knowing which repos are actually enabled" }
  ]'
  :insight='{ icon: "🎯", text: "Key Insight: the bill tracks people, not repos — enablement scope is a real cost decision." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Doing the Math Before You Enable -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🧮"
  pillLabel="cost-estimation-worksheet.md"
  title="Doing the Math Before You Enable"
  codePosition="left"
  :code='{ language: "text", filename: "cost-estimation-worksheet.md", content: "Org: 50 active committers across 12 enabled repos\n\nBase license:      50 committers x $10/month      = $500/month\nAI credits:        ~2,000 credits/month (estimate) = $20/month\nCodeQL compute:    ~1,500 Actions minutes/month     = billed at org rate\n\nEstimated total:   ~$520+/month before Actions overage" }'
  :features='[
    { icon: "🧑‍🤝‍🧑", title: "Count Committers First", description: "The active-committer number drives the largest line item by far" },
    { icon: "🤖", title: "Estimate AI Credit Usage", description: "Scales with how many findings trigger AI-assisted analysis and Autofix" },
    { icon: "⚙️", title: "Check Your Actions Rate", description: "CodeQL compute bills at whatever Actions-minute rate the org already pays" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: What to Audit Before the First Bill -->
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🔍"
  pillLabel="Before You Flip the Switch"
  title="What to Audit Before the First Bill"
  :cards='[
    { icon: "📂", title: "Which Repos Are Enabled", description: "List every repo with Code Quality on before the billing period starts" },
    { icon: "🧑‍💻", title: "Who Counts as a Committer", description: "Anyone who pushed in the trailing 90 days — check for stale bot accounts" },
    { icon: "🔓", title: "Is It Bundled with GHAS", description: "No — Code Quality is a standalone charge, not part of Advanced Security" },
    { icon: "🛑", title: "Can You Disable Low-Value Repos", description: "Disabling a repo removes its committers from the count going forward" }
  ]'
  :insight='{ icon: "💡", text: "A five-minute audit before the billing period starts is the cheapest cost control available." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Rolling Out Without Surprises -->
<SectionOpenerSlide
  :partNumber="4"
  title="Rolling Out Without Surprises"
  subtitle="Enable, evaluate, then enforce — repo group by repo group"
  :cards='[
    { icon: "🏛️", title: "Enterprise Policy First", blurb: "Owners allow it before any org or repo can turn it on" },
    { icon: "🧪", title: "Evaluate Before Active", blurb: "See what would fail before anything actually blocks" },
    { icon: "📈", title: "Staged, Not Org-Wide", blurb: "Roll out repo group by repo group, not all at once" },
  ]'
  :terminal='{ context: "A pilot repo group finishes evaluate mode with an acceptable false-positive rate", detail: "Enforcement flips to active — merges are now actually gated" }'
/>

---

<!-- SLIDE: Who Turns This On, and Where -->
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🏛️"
  pillLabel="Enterprise-Level Enablement"
  title="Who Turns This On, and Where"
  subtitle="Three layers, each one narrowing the scope"
  :rows='[
    { label: "Enterprise", description: "Owners allow Code Quality for all or selected organizations", tag: "Policies" },
    { label: "Organization", description: "Org admins enable it for specific repos within the allowed scope", tag: "Org Settings" },
    { label: "Repository", description: "Repo admins can be delegated the ability to enable or disable it themselves", tag: "Repo Admin" }
  ]'
  footnote="Nothing turns on below the enterprise policy layer — it is the master switch"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Enable & Observe → Evaluate → Active -->
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🚦"
  pillLabel="The Rollout Checklist"
  title="Enable & Observe → Evaluate → Active"
  subtitle="Each stage is a deliberate, reversible decision, not a one-way flip"
  :stages='[
    { label: "Phase 1", name: "Enable & Observe", description: "Pilot repos only; add coverage upload; no enforcing rulesets yet", icon: "👀", isTarget: false },
    { label: "Phase 2", name: "Evaluate Mode", description: "Rulesets report what would fail; tune thresholds on real PR history", icon: "🧪", isTarget: false },
    { label: "Phase 3", name: "Active Enforcement", description: "Switch enforcement to active; expand to the next repo group", icon: "✅", isTarget: true }
  ]'
  caption="Repeat per repo group — do not flip the whole org at once"
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
<BeforeAfterSlide
  header="From Quality as a Report to Quality as a Gate"
  :leftItems='[
    "Coverage checked in a separate dashboard, reviewed weekly",
    "Maintainability issues found long after merge, if at all",
    "Legacy findings sit as an unstructured wall of technical debt",
    "Enabling a new tool org-wide with no cost visibility"
  ]'
  :rightItems='[
    "Coverage delta shown inline on every PR before merge",
    "Autofix suggestions resolve findings inside the same PR",
    "Default-branch backlog is scored, prioritized, and assignable",
    "Active-committer billing audited before the first bill arrives"
  ]'
  :metrics='[
    { value: "80%", detail: "example minimum-coverage threshold enforceable via a ruleset" },
    { value: "67.3%", detail: "self-reported share of findings resolved before merge" },
    { value: "$10", detail: "per active committer per month, counted once org-wide" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
  :today='[
    "Enable Code Quality on one pilot repo",
    "Add the Cobertura coverage upload step to its CI workflow",
    "Create a coverage ruleset in evaluate mode only"
  ]'
  :thisWeek='[
    "Review a full sprint of evaluate-mode findings for false positives",
    "Apply Autofix suggestions on any open PRs with findings",
    "List every active committer the pilot repo would bill for"
  ]'
  :thisMonth='[
    "Switch the pilot ruleset from evaluate to active enforcement",
    "Expand to the next repo group using the same staged rollout",
    "Audit every enabled repo org-wide before the next billing cycle"
  ]'
  footer="Coverage and quality only become a real gate once you flip evaluate to active — do that deliberately, one repo group at a time."
/>

---

<!-- SLIDE: References -->
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
        { href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "GitHub Code Quality - Concepts", description: "Core concepts for PR and default-branch scanning" },
        { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality", label: "Enabling GitHub Code Quality", description: "Repo and org-level enablement steps" },
        { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-up-code-coverage", label: "Setting up code coverage", description: "Cobertura upload configuration and permissions" },
        { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/set-pr-thresholds", label: "Setting code quality thresholds for pull requests", description: "Ruleset parameters for coverage and quality scores" },
        { href: "https://docs.github.com/en/billing/concepts/product-billing/github-code-quality", label: "GitHub Code Quality billing", description: "Active-committer pricing, AI credits, Actions minutes" }
    ] },
    { title: "📰 Announcements", color: "purple", items: [
        { href: "https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/", label: "GitHub Code Quality is now generally available", description: "GA announcement and reported resolution rate" },
        { href: "https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge", label: "Preventing code quality issues from reaching your default branch", description: "Ruleset-based merge gating walkthrough" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->
<ThankYouSlide
  title="GitHub Code Quality"
  subtitle="Turning Maintainability Into a Merge Gate"
  :cards="[
    { value: '80%', detail: 'coverage threshold enforceable via a single ruleset' },
    { value: '67.3%', detail: 'of findings self-reported resolved before merge' },
    { value: '$10/committer', detail: 'the real cost of enabling this org-wide' },
  ]"
  prompt="Which repo would you pilot first — and do you already know who counts as an active committer there?"
/>
