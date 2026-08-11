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
updated: 2026-08-10
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
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
</script>

# Title
<TitleSlide
  title="GitHub Code Quality"
  subtitle="Turning Maintainability Into a Merge Gate"
  tagline="Coverage, maintainability, and reliability become a status check your merge depends on — and a predictable line item."
  meta="GitHub Code Quality · GA July 20, 2026 · Developers, Repo Admins, Platform Teams"
/>

---

# Core Question
<CoreQuestionSlide
  question="How does GitHub Code Quality turn code metrics into an enforceable merge gate?"
  subtext="Quality dashboards tell you what happened. Rulesets"
  highlight="determine what gets to merge."
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "See coverage deltas and Autofix suggestions before your PR merges" },
    { icon: "🧰", title: "Repo Admin", description: "Wire coverage and quality thresholds into rulesets — no custom pipeline" },
    { icon: "🏗️", title: "Platform Team", description: "Govern enablement, predict per-committer cost, and roll out safely" },
    { title: "GA: July 20, 2026", description: "Every team from the preview now has a real billing decision to make" },
    { title: "~⅔ resolved before merge", description: "GitHub-reported finding resolution rate for Code Quality findings" },
    { title: "$10/committer/month", description: "Org-wide active-committer billing — the number driving every rollout decision" }
  ]'
/>

---

# Agenda
<AgendaSlide
  :items='[
    { title: "Quality as a Gate", takeaway: "Make quality signals enforceable status checks on pull requests.", whyItMatters: "Metrics matter when they protect the merge decision." },
    { title: "Observe Before Enforce", takeaway: "Use evaluation mode to tune rules before blocking work.", whyItMatters: "Teams build trust while reducing rollout surprises." },
    { title: "Predictable Rollout", takeaway: "Plan adoption and cost by repository and committer.", whyItMatters: "Deliberate enablement makes quality infrastructure sustainable." }
  ]'
/>

---

# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔍", title: "Coverage-Aware Quality Gates", subtitle: "From Cobertura upload to a failing status check", blurb: "Build the quality gate the merge button actually checks", slide: 5 },
    { icon: "🤖", title: "Copilot Autofix in the PR Loop", subtitle: "Suggestions in the PR, not a follow-up ticket", blurb: "Understand Autofix and the Copilot review boundary", slide: 10 },
    { icon: "💰", title: "Reading the Bill", subtitle: "$10/committer/month and what the rest adds up to", blurb: "Model the cost before you flip the org-wide switch", slide: 13 },
    { icon: "🚦", title: "Rolling Out Without Surprises", subtitle: "Enable → Evaluate → Active in repeatable phases", blurb: "Leave with a concrete rollout checklist for this week", slide: 18 }
  ]'
/>

---

# Part 1 — Coverage-Aware Quality Gates
<SectionOpenerSlide
  :partNumber="1"
  title="Coverage-Aware Quality Gates"
  subtitle="Cobertura upload + evaluate/active ruleset = coverage as a real merge condition"
  :cards='[
    { icon: "📊", title: "Coverage Delta on Every PR", blurb: "Cobertura XML upload shows the coverage delta on each PR" },
    { icon: "🔒", title: "Ruleset-Enforced Threshold", blurb: "80% minimum becomes a status check the PR can&#39;t bypass" },
    { icon: "🛡️", title: "Evaluate Before Blocking", blurb: "See what would fail without blocking anyone yet" }
  ]'
  :terminal='{ context: "PR drops 4% below threshold in active mode", detail: "code-quality/coverage → fail" }'
/>

---

# Coverage Stops Being a Dashboard Number
<BeforeAfterMetricsSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Coverage Gates: Before & After"
  title="Coverage Stops Being a Dashboard Number"
  :before='{
    header: "Before Code Quality",
    items: [
      "Coverage dashboard checked weekly at best",
      "Regressions found in incident postmortems",
      { title: "No PR-level signal", detail: "Coverage is a repo-level badge, not a PR delta" },
      "Coverage target is a team norm, not a gate"
    ]
  }'
  :after='{
    header: "After Code Quality",
    items: [
      "Coverage delta shown inline on every PR",
      { title: "Regression caught before merge", detail: "4% drop fails the status check" },
      "Threshold enforced by a ruleset — not honor system",
      "Copilot Autofix suggests a fix inside the PR"
    ]
  }'
  :metrics='[
    { value: "Per PR", label: "coverage delta reported" },
    { value: "Pre-merge", label: "regression caught" },
    { value: "0 sprints", label: "to discover in postmortem" }
  ]'
  :insight='{ icon: "💡", text: "The same 80% target that lived in a team doc becomes a status check the merge button reads." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# The Coverage Upload Workflow
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="⚙️"
  pillLabel="Coverage Gates: Upload Workflow"
  title="Feeding the Gate: Coverage Upload in CI"
  codePosition="left"
  :code='{ language: "yaml", filename: "quality-gate-workflow.yml", content: "name: CI\non:\n  pull_request:\npermissions:\n  contents: read\n  code-quality: write\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pytest --cov=. --cov-report=xml\n      - uses: actions/upload-code-coverage@v1\n        with:\n          file: cobertura.xml\n          language: Python" }'
  :features='[
    { icon: "🔑", title: "Required Permission", description: "code-quality: write lets the upload step attach coverage to the PR" },
    { icon: "📄", title: "Any Cobertura Framework", description: "pytest-cov, JaCoCo, nyc/Istanbul — any tool that emits Cobertura XML" },
    { icon: "🏷️", title: "Per-Service Labels", description: "label field lets monorepos upload separate coverage reports per service" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Evaluate vs Active Enforcement
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🛡️"
  pillLabel="Coverage Gates: Enforcement Modes"
  title="Two Enforcement Modes — One Field to Flip"
  :left='{
    header: "Evaluate Mode",
    icon: "🔭",
    items: [
      { title: "Reports without blocking", detail: "Historical PRs flagged — no merges stopped" },
      "Safe default for any new ruleset",
      { title: "Tune before committing", detail: "Adjust threshold until false-positive rate is acceptable" },
      "Switch to active with one field change"
    ]
  }'
  :right='{
    header: "Active Enforcement",
    icon: "🔒",
    items: [
      { title: "Blocks merges on failure", detail: "Status check required by branch protection ruleset" },
      "Exact violation shown to the PR author",
      { title: "Instant rollback available", detail: "Switch back to evaluate with a single field change" },
      "One threshold, one rule, one check"
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Agent-Generated PR vs Manual Workflow
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🤖"
  pillLabel="Coverage Gates: Setup Paths"
  title="Two Paths to the First Coverage Upload"
  :left='{
    header: "Agent-Generated PR",
    icon: "🤖",
    items: [
      { title: "Optional onboarding path", detail: "Agent opens a reviewable PR with a least-privilege workflow" },
      "Standard upload steps, minimal permissions",
      "Review and merge like any other PR",
      "Available on github.com in public preview"
    ]
  }'
  :right='{
    header: "Manual Workflow",
    icon: "🛠️",
    items: [
      "Full control over build steps and test setup",
      { title: "Custom test matrices", detail: "Multi-language, monorepo, or non-standard coverage tooling" },
      { title: "Always available", detail: "Manual authoring is never blocked by the agent path" },
      "Bring your existing CI coverage pipeline"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Copilot Autofix in the PR Loop
<SectionOpenerSlide
  :partNumber="2"
  title="Copilot Autofix in the PR Loop"
  subtitle="Autofix proposes the fix; humans approve it — Code Quality does not auto-enable Copilot review"
  :cards='[
    { icon: "🔍", title: "What Gets Found", blurb: "CodeQL plus AI-assisted detection on every PR diff" },
    { icon: "✅", title: "One-Click Fix Suggestion", blurb: "Developer applies, human approves — nothing auto-merges" },
    { icon: "🔗", title: "Default-Branch Backlog", blurb: "Scored backlog from default-branch scans, assignable to the agent" }
  ]'
  :terminal='{ context: "Code Quality finding in a PR", detail: "Autofix proposed → developer applies → human approves" }'
/>

---

# The Autofix Review Flow
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="🔧"
  pillLabel="Autofix: Review Flow"
  title="Finding Disposition: Without vs With Autofix"
  subtitle="Autofix closes the loop inside the PR instead of opening a ticket"
  leftLabel="Without Code Quality"
  rightLabel="With Code Quality Autofix"
  :steps='[
    { left: { label: "PR opens with issues", note: "Reviewer manually spots maintainability problem" }, right: { label: "PR opens", note: "Code Quality scan posts finding with Autofix suggestion" } },
    { left: { label: "Review comment added", note: "Author adds it to the follow-up ticket backlog" }, right: { label: "Developer reviews suggestion", note: "One click to apply the proposed fix" } },
    { left: { label: "PR merges anyway", note: "Issue tracked in a ticket, not fixed" }, right: { label: "Human reviewer approves", note: "Fix reviewed and approved within the PR" } },
    { left: { label: "Tech-debt ticket lingers", note: "Often never addressed" }, right: { label: "Finding resolved before merge", note: "~⅔ of findings resolved pre-merge" } }
  ]'
  :outcomeLeft='{ icon: "📋", label: "Finding becomes a ticket — often never resolved" }'
  :outcomeRight='{ icon: "✓", label: "Finding resolved inside the PR" }'
  summaryMetric="~⅔ of findings resolved before merge with Code Quality"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Autofix vs Copilot Code Review
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="⚖️"
  pillLabel="Autofix: Feature Boundary"
  title="Two Independent Features, One PR Surface"
  :left='{
    header: "Code Quality Autofix",
    icon: "🔧",
    items: [
      { title: "Bundled with Code Quality", detail: "Included with enablement — no separate setup" },
      "Billed under Code Quality per-committer charge",
      { title: "AI credits consumed", detail: "AI-assisted detection and Autofix generation only" },
      "Proposals only — human approval required"
    ]
  }'
  :right='{
    header: "Copilot Code Review",
    icon: "🤖",
    items: [
      { title: "Independent enablement", detail: "Requires its own repository or organization ruleset" },
      { title: "Not included in Code Quality", detail: "GitHub disabled auto-review in generated rulesets" },
      "Billed to the Copilot plan, not Code Quality",
      "Enable separately if and when your team is ready"
    ]
  }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Reading the Bill
<SectionOpenerSlide
  :partNumber="3"
  title="Reading the Bill"
  subtitle="Three line items, one active-committer count, and the worked example that makes the number real"
  :cards='[
    { icon: "💳", title: "Active Committer Fee", blurb: "$10/month per active committer across the org" },
    { icon: "⚡", title: "AI Credits", blurb: "Usage-based charge for AI detection and Autofix" },
    { icon: "⏱️", title: "CodeQL Compute", blurb: "Actions minutes for scan workflows" }
  ]'
  :terminal='{ context: "50 committers across 12 repos", detail: "~$500+/month base before AI credits" }'
/>

---

# Three Billing Components
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="💰"
  pillLabel="Reading the Bill: Components"
  title="Three Independent Line Items"
  :columns='[
    { icon: "👥", title: "Active Committers", description: "$10/month per person who pushed to any enabled repo in the org in the trailing 90 days", items: ["Counted once org-wide", "Not per-repo", "90-day rolling window"] },
    { icon: "🧠", title: "AI Credits", description: "~$0.01/credit for AI-assisted detection and Copilot Autofix generation runs", items: ["Scales with findings volume", "Not with repo count", "Separate from committer fee"] },
    { icon: "⚙️", title: "CodeQL Compute", description: "GitHub Actions minutes consumed by scan workflows, or self-hosted runner cost", items: ["Uses existing Actions budget", "Runs on PR and push", "Default-branch scans too"] }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# The $500+/Month Number
<HeroStatSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Reading the Bill: Worked Example"
  title="The Number This Audience Will Repeat"
  subtitle="50 committers, 12 repos, one org"
  :hero='{ value: "$500+", label: "per month base license cost for 50 active committers", source: "50 committers × $10/month — before AI credits or Actions minutes" }'
  :supporting='[
    { icon: "🔢", title: "Org-wide, not per-repo", description: "Same 50 people across 12 repos = same bill as enabling on 1 repo" },
    { icon: "⚡", title: "AI credits on top", description: "Scales with how many findings trigger AI analysis and Autofix — not with repo count" },
    { icon: "🎛️", title: "Audit before enabling", description: "Disabling a repo removes its committers from the active count going forward" },
    { icon: "🤖", title: "Copilot review billed separately", description: "Code review is a Copilot plan charge — it does not appear on the Code Quality bill" }
  ]'
  :insight='{ icon: "💡", text: "Auditing which repos are enabled before the billing period starts is the single highest-leverage cost control." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Active-Committer Counting Rules
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🔢"
  pillLabel="Reading the Bill: Counting Rules"
  title="How Active Committers Are Counted"
  :cards='[
    { icon: "📅", title: "90-Day Rolling Window", description: "Anyone who pushed a commit in the trailing 90 days counts, regardless of whether they push today" },
    { icon: "🏢", title: "Org-Wide, Not Per-Repo", description: "The same developer across 10 repos counts once — enabling more repos does not multiply the charge" },
    { icon: "🔌", title: "Disable to Remove Committers", description: "Disabling Code Quality on a repo removes those committers from the active count next billing cycle" },
    { icon: "🚫", title: "Copilot Review Not Included", description: "Code review needs its own Copilot plan license — independent of Code Quality committer billing" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Two Separate Bills
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="⚖️"
  pillLabel="Reading the Bill: Billing Boundary"
  title="Code Quality and Copilot Review Are Billed Separately"
  :left='{
    header: "Code Quality Bill",
    icon: "📋",
    items: [
      { title: "$10/active committer/month", detail: "Org-wide, 90-day trailing window" },
      { title: "AI credits (~$0.01/credit)", detail: "AI-assisted detection and Autofix generation" },
      { title: "CodeQL compute", detail: "Actions minutes for scan runs" },
      "No Copilot review charge here"
    ]
  }'
  :right='{
    header: "Copilot Plan Bill",
    icon: "🤖",
    items: [
      { title: "Copilot code review", detail: "Billed to the Copilot subscription, not Code Quality" },
      { title: "Enabled independently", detail: "Repository or organization ruleset required" },
      "Not auto-enabled when Code Quality turns on",
      "A separate decision your team makes when ready"
    ]
  }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Rolling Out Without Surprises
<SectionOpenerSlide
  :partNumber="4"
  title="Rolling Out Without Surprises"
  subtitle="Three phases from enablement to active enforcement — leave with a concrete rollout plan for this week"
  :cards='[
    { icon: "👁️", title: "Enable & Observe", blurb: "Enable on pilot repos; watch scores, no enforcement yet" },
    { icon: "🔭", title: "Evaluate Mode", blurb: "Rulesets in evaluate — flag without blocking anything" },
    { icon: "✅", title: "Active Enforcement", blurb: "Flip to active once the false-positive rate is acceptable" }
  ]'
  :terminal='{ context: "Rollout pattern across the preview cohort", detail: "Enable → Evaluate → Active, repo group by repo group" }'
/>

---

# Enable → Evaluate → Active
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🚦"
  pillLabel="Rollout: Three Phases"
  title="The Evaluate-First Rollout Pattern"
  subtitle="Each phase builds confidence before the next one applies pressure"
  :stages='[
    { label: "Phase 1", name: "Enable & Observe", description: "Enable on pilot repos, add coverage workflow, watch quality scores — no enforcing rulesets", icon: "👁️", isTarget: false },
    { label: "Phase 2", name: "Evaluate Mode", description: "Create rulesets with enforcement: evaluate — see what would have been blocked, tune thresholds", icon: "🔭", isTarget: false },
    { label: "Phase 3", name: "Active Enforcement", description: "Switch to active for pilot repos, expand to remaining repo groups — never org-wide on day one", icon: "✅", isTarget: true }
  ]'
  caption="Never skip evaluate mode — running it for at least one sprint prevents surprise merge blocks"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Enterprise Policy and Governance
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🏢"
  pillLabel="Rollout: Governance Layers"
  title="Three Governance Layers for Deliberate Enablement"
  :columns='[
    { icon: "🏢", title: "Enterprise Policy", description: "Enterprise owners set whether Code Quality is allowed before any org can enable it", items: ["Allow for all orgs", "Allow for selected orgs", "Block repo-level override"] },
    { icon: "🏗️", title: "Org-Level Enablement", description: "Org admins enable Code Quality per repo, within the enterprise policy", items: ["Choose pilot repos first", "Add coverage workflows", "Set up evaluate rulesets"] },
    { icon: "🔒", title: "Repo-Level Control", description: "Repo admins enable or disable within what the org allows — the billing knob for each repo", items: ["Enable: starts committer counting", "Disable: removes from active count", "Controlled independently"] }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# Before/After
<BeforeAfterSlide
  header="From Periodic Audit to Merge-Time Gate"
  :leftItems='["Coverage checked in a weekly dashboard", "Quality regressions found in postmortems", "No PR-level enforcement — team norms only", "Org-wide rollout risks unknown blocking rate"]'
  :rightItems='["Coverage delta visible on every pull request", "Regressions caught before they merge", "Rulesets enforce thresholds at merge time", "Evaluate mode shows blast radius before going active"]'
  :metrics='[
    { value: "Per PR", detail: "coverage delta reported" },
    { value: "Pre-merge", detail: "regression caught, not post-incident" },
    { value: "Evaluate first", detail: "safe rollout path, every time" }
  ]'
/>

---

# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Enable Code Quality on one low-risk pilot repo", "Check if your CI produces Cobertura XML today", "Review which repos should count toward billing"]'
  :thisWeek='["Add coverage upload workflow (or accept agent PR)", "Create a ruleset in evaluate mode at 80% coverage", "Run one full sprint in evaluate, log blocked PRs"]'
  :thisMonth='["Flip pilot ruleset to active enforcement", "Expand to remaining org repos in groups", "Set up org dashboard review as a recurring cadence"]'
  footer="Quality gates that used to require custom pipeline work are now one ruleset away."
/>

---

# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "GitHub Code Quality - Concepts", description: "Core concepts for PR and default-branch scanning" },
      { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality", label: "Enabling GitHub Code Quality", description: "Step-by-step repo and org enablement" },
      { href: "https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge", label: "Catch Issues Before Merge", description: "Ruleset-based merge gating walkthrough" },
      { href: "https://docs.github.com/en/billing/concepts/product-billing/github-code-quality", label: "Code Quality Billing", description: "Active-committer pricing, AI credits, and Actions minutes" }
    ] },
    { title: "📣 Changelog Announcements", color: "blue", items: [
      { href: "https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer", label: "Code Quality No Longer Adds Copilot as a Reviewer", description: "Boundary between Code Quality and Copilot review enablement" },
      { href: "https://github.blog/changelog/2026-08-04-code-coverage-automatic-enablement-in-code-quality-settings", label: "Automatic Coverage Enablement", description: "Agent-generated coverage workflow pull request in public preview" }
    ] }
  ]'
/>

---

# Thank You
<ThankYouSlide
  title="GitHub Code Quality"
  subtitle="Turning Maintainability Into a Merge Gate"
  :cards="[
    { value: 'Coverage Gates', detail: 'Cobertura upload → per-PR delta → ruleset threshold → merge condition' },
    { value: 'Autofix in the PR', detail: 'Proposals inside the PR; Code Quality and Copilot review are independent' },
    { value: '$10/committer/month', detail: 'Org-wide active-committer billing plus AI credits and Actions minutes' },
    { value: 'Enable → Evaluate → Active', detail: 'Three phases; evaluate mode first, every time, every repo group' }
  ]"
  prompt="Which signal would your team enforce first — coverage threshold, maintainability score, or reliability score?"
/>
