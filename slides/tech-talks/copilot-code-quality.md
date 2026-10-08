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
section: Verify and Govern
status: active
updated: 2026-10-08
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="GitHub Code Quality"
  subtitle="Turn Quality Standards Into an Automatic Merge Gate"
  tagline="Set the threshold and require the evidence; each eligible PR gets an enforceable merge decision."
  meta="GitHub Code Quality · GA July 20, 2026 · Developers, Repo Admins, Platform Teams"
/>

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How can a team enforce its quality bar on every pull request?"
  subtext="Code Quality reports findings and coverage; a configured ruleset"
  highlight="blocks a merge when the PR misses the team&#39;s threshold."
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "See coverage deltas and Autofix suggestions before your PR merges" },
    { icon: "🧰", title: "Repo Admin", description: "Set quality and coverage thresholds in a ruleset, then test them in evaluate mode" },
    { icon: "🏗️", title: "Platform Team", description: "Enable a pilot and inspect which PRs would be blocked" },
    { title: "PR finding", description: "Rules-based analysis identifies a maintainability or reliability issue" },
    { title: "Coverage signal", description: "CI uploads line coverage for the PR and its default-branch baseline" },
    { title: "Merge decision", description: "An active ruleset blocks PRs that miss the configured threshold" }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔍", title: "Coverage-Aware Quality Gates", subtitle: "From coverage upload to a merge condition", blurb: "See what the configured gate actually checks", slide: 4 },
    { icon: "🤖", title: "Copilot Autofix in the PR Loop", subtitle: "A fix proposal for a finding in the PR", blurb: "Apply and verify a fix without confusing it with the gate", slide: 9 },
    { icon: "🚦", title: "Rolling Out Without Surprises", subtitle: "Enable → Evaluate → Active in repeatable phases", blurb: "Pilot the gate, then decide where to enforce it", slide: 12 },
    { icon: "✅", title: "Prove the Gate in Your Repo", subtitle: "Show a failing PR, then a passing correction", blurb: "Take a tested merge condition back to your team", slide: 16 }
  ]'
/>

---

<!-- SLIDE: Part 1 — Coverage-Aware Quality Gates -->
# Part 1 — Coverage-Aware Quality Gates
<SectionOpenerSlide
  :partNumber="1"
  title="Coverage-Aware Quality Gates"
  subtitle="Upload coverage, set a threshold, and let an active ruleset enforce it on each PR"
  :cards='[
    { icon: "📊", title: "Coverage Delta on Every PR", blurb: "Cobertura XML upload shows the coverage delta on each PR" },
    { icon: "🔒", title: "Ruleset-Enforced Threshold", blurb: "Require the upload check; then a PR below the minimum cannot merge" },
    { icon: "🛡️", title: "Evaluate Before Blocking", blurb: "See what would fail without blocking anyone yet" }
  ]'
  :terminal='{ context: "Example: PR coverage is 76%; required minimum is 80%", detail: "Active quality gate: fail → merge blocked" }'
/>

---

<!-- SLIDE: Coverage Gate Example -->
# A Coverage Threshold Can Block the Merge
<BeforeAfterMetricsSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Coverage Gates: Before & After"
  title="A Coverage Threshold Can Block the Merge"
  :before='{
    header: "Before Code Quality",
    items: [
      "CI produces a coverage report",
      "Reviewers can inspect coverage manually",
      { title: "Target in a team doc", detail: "A reviewer decides when a PR falls short" },
      "The merge button does not enforce that target"
    ]
  }'
  :after='{
    header: "After Code Quality",
    items: [
      "CI uploads Cobertura on the PR and default branch",
      { title: "Example: 76% vs. 80% minimum", detail: "Active coverage gate fails; merge is blocked" },
      "Author adds tests and reruns CI",
      "Coverage meets 80%; the gate passes"
    ]
  }'
  :metrics='[
    { value: "76%", label: "example PR coverage" },
    { value: "80%", label: "configured minimum" },
    { value: "Blocked", label: "until the gate passes" }
  ]'
  :insight='{ icon: "💡", text: "Require the coverage upload check: the ruleset alone does not wait for the report." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Coverage Upload Workflow -->
# The Coverage Upload Workflow
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="⚙️"
  pillLabel="Coverage Gates: Upload Workflow"
  title="Feeding the Gate: Coverage Upload in CI"
  codePosition="left"
  :code='{ language: "yaml", filename: "quality-gate-workflow.yml (illustrative)", content: "name: Coverage\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\npermissions:\n  contents: read\n  code-quality: write\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: pytest --cov=. --cov-report=xml\n      - uses: actions/upload-code-coverage@v1\n        with:\n          file: coverage.xml\n          language: Python" }'
  :features='[
    { icon: "🔑", title: "Required Permission", description: "code-quality: write lets the upload step attach coverage to the PR" },
    { icon: "📄", title: "Baseline and PR", description: "Upload Cobertura on main and the PR; adapt test setup to your repository" },
    { icon: "🔒", title: "Required Upload Check", description: "Require the workflow check: the coverage rule does not wait for the upload" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Evaluate vs Active -->
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
      { title: "Reports without blocking", detail: "See how current PRs would fare — no merges stopped" },
      "Safe default for any new ruleset",
      { title: "Tune before committing", detail: "Adjust threshold until false-positive rate is acceptable" },
      "Switch to active with one field change"
    ]
  }'
  :right='{
    header: "Active Enforcement",
    icon: "🔒",
    items: [
      { title: "Blocks merges on failure", detail: "Coverage upload check required; ruleset enforces the threshold" },
      "Exact violation shown to the PR author",
      { title: "Instant rollback available", detail: "Switch back to evaluate with a single field change" },
      "One threshold, one rule, one check"
    ]
  }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Two Coverage Setup Paths -->
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

<!-- SLIDE: Part 2 — Copilot Autofix -->
# Part 2 — Copilot Autofix in the PR Loop
<SectionOpenerSlide
  :partNumber="2"
  title="Copilot Autofix in the PR Loop"
  subtitle="FanHub #201 shows a human-accepted Code Quality fix; #199 shows the separate coverage gate"
  :cards='[
    { icon: "🔍", title: "Code Quality Finding", blurb: "The PR scan flagged a generic catch in Episodes.razor" },
    { icon: "🔧", title: "Generated Changeset", blurb: "Autofix proposed TryParse; the author inspected and committed it" },
    { icon: "✅", title: "Verify the Result", blurb: "Build passed and the original finding became outdated; keep the PR draft" }
  ]'
  :terminal='{ context: "github.com/MSBart2/FanHub/pull/201", detail: "Finding → suggested changeset → author accepts → checks rerun" }'
/>

---

<!-- SLIDE: Autofix Review Flow -->
# FanHub: The Autofix We Actually Applied
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="🔧"
  pillLabel="FanHub: Observed Autofix"
  title="FanHub #201: A Human Accepts the Generated Fix"
  subtitle="Code Quality proposed a precise correction; the author committed it and checked the new head"
  leftLabel="First head: 294529d"
  rightLabel="Autofix head: 0b33cda"
  :steps='[
    { left: { label: "Episodes parses a selection", note: "int.Parse plus catch (Exception)" }, right: { label: "Code Quality finds the catch", note: "Generic catch clause on the changed lines" } },
    { left: { label: "Invalid input falls back", note: "Unrelated exceptions also get swallowed" }, right: { label: "Autofix proposes TryParse", note: "Invalid or overflowing input still falls back" } },
    { left: { label: "First-head build passes", note: "The compiler cannot flag this behavior" }, right: { label: "Author commits suggestion", note: "GitHub creates the Autofix commit 0b33cda" } },
    { left: { label: "Finding is actionable", note: "Inspect the Code Quality changeset" }, right: { label: "New-head build passes", note: "Original finding is now outdated" } }
  ]'
  :outcomeLeft='{ icon: "🔍", label: "A passing build did not expose the broad catch" }'
  :outcomeRight='{ icon: "✓", label: "Author-accepted fix; PR remains draft" }'
  summaryMetric="No coverage gate on #201; FanHub #199 proves the separate merge gate"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Autofix vs Copilot Review -->
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
      "CodeQL posts rules-based PR findings",
      { title: "AI-powered proposal", detail: "Apply a useful suggestion, then rerun the scan" },
      "Ruleset enforces the configured quality threshold"
    ]
  }'
  :right='{
    header: "Copilot Code Review",
    icon: "🤖",
    items: [
      { title: "Independent enablement", detail: "Request a review or configure automatic review separately" },
      { title: "Different evidence", detail: "Copilot comments on potential issues in the PR" },
      "Code Quality does not automatically add Copilot as reviewer",
      "A quiet review does not replace a quality gate"
    ]
  }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Rolling Out -->
# Part 3 — Rolling Out Without Surprises
<SectionOpenerSlide
  :partNumber="3"
  title="Rolling Out Without Surprises"
  subtitle="Pilot the rule in evaluate mode, then activate it when the evidence supports enforcement"
  :cards='[
    { icon: "👁️", title: "Enable & Observe", blurb: "Enable on pilot repos; watch scores, no enforcement yet" },
    { icon: "🔭", title: "Evaluate Mode", blurb: "Rulesets in evaluate — flag without blocking anything" },
    { icon: "✅", title: "Active Enforcement", blurb: "Activate after inspecting would-block PRs and exceptions" }
  ]'
  :terminal='{ context: "Pilot repository", detail: "Enable → Evaluate → Active; confirm the gate blocks an example PR" }'
/>

---

<!-- SLIDE: Enable Evaluate Active -->
# Enable → Evaluate → Active
<MaturityJourneyRoadmapSlide
  :partNumber="3"
  pillIcon="🚦"
  pillLabel="Rollout: Three Phases"
  title="The Evaluate-First Rollout Pattern"
  subtitle="Observe the gate on real PRs before it starts blocking merges"
  :stages='[
    { label: "Phase 1", name: "Enable & Observe", description: "Enable on pilot repos; upload main and PR coverage; require the upload check", icon: "👁️", isTarget: false },
    { label: "Phase 2", name: "Evaluate Mode", description: "Create rulesets with enforcement: evaluate — see what would have been blocked, tune thresholds", icon: "🔭", isTarget: false },
    { label: "Phase 3", name: "Active Enforcement", description: "Switch on the pilot gate; expand to other repositories after checking results", icon: "✅", isTarget: true }
  ]'
  caption="Inspect would-block PRs, tune the rule, then test one failing and one passing PR"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Governance Layers -->
# Enterprise Policy and Governance
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🏢"
  pillLabel="Rollout: Governance Layers"
  title="Three Governance Layers for Deliberate Enablement"
  :columns='[
    { icon: "🏢", title: "Enterprise Policy", description: "Enterprise owners set whether Code Quality is allowed before any org can enable it", items: ["Allow for all orgs", "Allow for selected orgs", "Block repo-level override"] },
    { icon: "🏗️", title: "Org-Level Enablement", description: "Org admins enable Code Quality per repo, within the enterprise policy", items: ["Choose pilot repos first", "Add coverage workflows", "Set up evaluate rulesets"] },
    { icon: "🔒", title: "Repo-Level Control", description: "Repo admins tune thresholds and enforcement within what the org permits", items: ["Evaluate before blocking", "Inspect failed checks", "Review exception requests"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Pilot Cost -->
# Estimate the Pilot Cost
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="💰"
  pillLabel="Rollout: Pilot Cost"
  title="Estimate the Pilot Cost Before Expanding"
  :columns='[
    { icon: "👥", title: "Active Committers", description: "$10 per active committer per month on enabled repos; each person counts once", items: ["Trailing 90-day window", "Example: 50 people = $500/month base", "Check actual license usage"] },
    { icon: "🧠", title: "AI Credits", description: "Autofix and AI detection consume usage-based credits", items: ["Depends on model usage", "Estimate from pilot activity", "Copilot code review is separate"] },
    { icon: "⚙️", title: "Scan Compute", description: "CodeQL scans consume GitHub Actions minutes or self-hosted capacity", items: ["Check pilot scan frequency", "Use actual runner usage", "Revisit before expanding"] }
  ]'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Prove the Gate -->
# Part 4 — Prove the Gate in Your Repo
<SectionOpenerSlide
  :partNumber="4"
  title="Prove the Gate in Your Repo"
  subtitle="FanHub PR #199: watch an isolated coverage rule block, then pass, on two commits"
  :cards='[
    { icon: "🔴", title: "Fail", blurb: "First head: 26.7% against a 27% minimum; GitHub blocks merge" },
    { icon: "🔧", title: "Correct", blurb: "Add tests for both Home empty-quote states; rerun coverage" },
    { icon: "✅", title: "Pass", blurb: "Corrected head: 30% in GitHub; rule passes; PR remains draft" }
  ]'
  :terminal='{ context: "github.com/MSBart2/FanHub/pull/199", detail: "Open the PR history: blocked → tested → gate passes; leave it unmerged" }'
/>

---

<!-- SLIDE: Automatic Gate Outcome -->
# FanHub: The Same PR Crosses the Gate
<BeforeAfterMetricsSlide
  :partNumber="4"
  pillIcon="✅"
  pillLabel="FanHub: Observed Gate"
  title="FanHub #199: The Same PR Crosses the Gate"
  :before='{
    header: "First head: merge blocked",
    items: [
      "4bd7844: empty-quote state has no focused tests",
      "Six tests pass; coverage uploads successfully",
      { title: "GitHub says 26.7% below 27.0%", detail: "The active ruleset disables merge" }
    ]
  }'
  :after='{
    header: "Corrected head: gate passes",
    items: [
      "ab96e8b: tests cover both empty-data paths",
      "Eight tests pass; GitHub displays 30% coverage",
      { title: "All requirements met", detail: "Keep the PR draft; a human still reviews the change" }
    ]
  }'
  :metrics='[
    { value: "26.7%", label: "blocked first head" },
    { value: "27.0%", label: "branch-scoped minimum" },
    { value: "30%", label: "GitHub result after tests" }
  ]'
  :insight='{ icon: "🔎", text: "github.com/MSBart2/FanHub/pull/199 · Absolute minimum only: this isolated base has no uploaded coverage baseline." }'
  :progressDots='{ current: 1, total: 1, activeColor: "bg-emerald-400 shadow-lg shadow-emerald-500/50" }'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Choose one pilot repository and a coverage threshold", "Check whether CI uploads Cobertura on main and PRs", "Inspect one rules-based PR finding"]'
  :thisWeek='["Require the expected coverage upload check", "Create a ruleset in evaluate mode", "Record which PRs would be blocked and why"]'
  :thisMonth='["Activate the pilot rule after reviewing results", "Test one failing and one passing PR", "Expand to another repo when the gate behaves as intended"]'
  footer="Configure the bar, observe it in evaluate mode, then prove the active gate blocks and unblocks a PR."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "GitHub Code Quality - Concepts", description: "Core concepts for PR and default-branch scanning" },
      { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality", label: "Enabling GitHub Code Quality", description: "Step-by-step repo and org enablement" },
      { href: "https://docs.github.com/en/code-security/tutorials/improve-code-quality/catch-issues-before-merge", label: "Catch Issues Before Merge", description: "Ruleset-based merge gating walkthrough" },
      { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/restrict-code-coverage", label: "Restrict code coverage", description: "Threshold rule and required upload check" },
      { href: "https://docs.github.com/en/billing/concepts/product-billing/github-code-quality", label: "Code Quality Billing", description: "Active-committer pricing, AI credits, and Actions minutes" }
    ] },
    { title: "📣 Changelog Announcements", color: "blue", items: [
      { href: "https://github.blog/changelog/2026-08-07-github-code-quality-no-longer-adds-copilot-as-a-reviewer", label: "Code Quality No Longer Adds Copilot as a Reviewer", description: "Boundary between Code Quality and Copilot review enablement" },
      { href: "https://github.blog/changelog/2026-08-04-code-coverage-automatic-enablement-in-code-quality-settings", label: "Automatic Coverage Enablement", description: "Agent-generated coverage workflow pull request in public preview" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="GitHub Code Quality"
  subtitle="Turn Quality Standards Into an Automatic Merge Gate"
  :cards="[
    { value: 'Automatic Gate', detail: 'Coverage upload or quality finding → ruleset threshold → merge condition' },
    { value: 'Autofix in the PR', detail: 'Inspect a proposed fix, apply it, and rerun the scan' },
    { value: 'Fail → Pass', detail: 'A failing PR blocks; a correction that meets the bar can proceed' },
    { value: 'Enable → Evaluate → Active', detail: 'Pilot the rule before it blocks merges' }
  ]"
  prompt="Which signal would your team enforce first — coverage threshold, maintainability score, or reliability score?"
/>
