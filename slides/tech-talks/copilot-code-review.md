---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## GitHub Copilot Code Review
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: GitHub Copilot Code Review
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
import BeforeAfterSlide from './components/structure/BeforeAfterSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="GitHub Copilot Code Review"
  subtitle="From First Feedback to a Human Decision"
  tagline="Get earlier PR feedback, then decide what needs human verification"
  meta="35-40 min | Engineering Managers · DevOps Leads · Development Teams"
/>

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How can Copilot Code Review give a team useful feedback before the human review?"
  subtext="A PR can collect actionable feedback while its author still has the change in mind."
  highlight="Let Copilot propose findings; let people verify behavior, risk, and readiness."
  :cards='[
    { icon: "👩‍💻", title: "Developer", description: "Read early suggestions while the change is fresh" },
    { icon: "🏗️", title: "Engineering Manager", description: "Compare review timing and rework in your own PR data" },
    { icon: "🔒", title: "Security or Platform Team", description: "Guide reviews with repository context; retain dedicated controls" },
    { title: "PR", description: "The review attaches to a specific diff and commit" },
    { title: "Findings", description: "Inspect the code and test a suggested fix" },
    { title: "Decision", description: "A human checks what Copilot missed before merging" }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "⚡", title: "Configuration and Quick Start", subtitle: "Request a review on a real PR", blurb: "Lite and Balanced today; Max is coming soon", slide: 4 },
    { icon: "🎯", title: "Best Practices and Adoption", subtitle: "Human questions, checks, and rollout", blurb: "Equip teams to own the rollout and frame it for stakeholders", slide: 9 },
    { icon: "📊", title: "Measuring Value", subtitle: "Model assumptions, then measure your cohort", blurb: "Separate faster feedback from hours actually saved", slide: 13 },
    { icon: "🔒", title: "Compliance Patterns", subtitle: "Instructions guide; controls prove compliance", blurb: "Try scoped review guidance with your security owner", slide: 18 }
  ]'
/>

---

<!-- SLIDE: Part 1 — Configuration and Quick Start -->
# Part 1 — Configuration and Quick Start
<SectionOpenerSlide
  :partNumber="1"
  title="Configuration and Quick Start"
  subtitle="Request one review, inspect its findings, then tune effort and instructions"
  :cards='[
    { icon: "⚡", title: "First Review", blurb: "Request from Reviewers or enable a ruleset" },
    { icon: "🎚️", title: "Effort Options", blurb: "Choose what is available today" },
    { icon: "📋", title: "Custom Instructions", blurb: "Encode team standards in Markdown" }
  ]'
  :terminal='{ context: "Start with one PR", detail: "Request Copilot under Reviewers, or configure automatic review in a ruleset" }'
/>

---

<!-- SLIDE: Manual Review vs. Copilot Review -->
# Manual Review vs. Copilot Review
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="Quick Start: The Shift"
  title="Manual Review Workflow vs. Copilot-Automated Review"
  subtitle="Early suggestions give the author and human reviewer a useful starting point"
  leftLabel="Manual Review Workflow"
  rightLabel="With Copilot Code Review"
  :steps='[
    { left: { label: "Submit PR", note: "Ask a teammate to review the change" }, right: { label: "Submit PR", note: "Request Copilot or enable automatic review" } },
    { left: { label: "Read diff", note: "Trace behavior and repository context" }, right: { label: "Read findings", note: "Inspect inline suggestions against the code" } },
    { left: { label: "Discuss risks", note: "Test cases and boundary decisions emerge" }, right: { label: "Test a correction", note: "Run a check that reproduces the concern" } },
    { left: { label: "Human decision", note: "Accept or ask for changes" }, right: { label: "Human review", note: "Verify the revised diff and remaining risks" } }
  ]'
  :outcomeLeft='{ icon: "👤", label: "Human context and approval stay in the loop" }'
  :outcomeRight='{ icon: "✅", label: "Copilot gives an earlier, inspectable signal" }'
  summaryMetric="Earlier feedback → tested correction → human decision"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Review Effort Options -->
# Which Review Effort Options Are Available?
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🎚️"
  pillLabel="Quick Start: Effort Levels"
  title="Three Effort Levels: Lite, Balanced, Max"
  :columns='[
    { icon: "⚡", title: "Lite · available", description: "Fast, targeted feedback on common issues.", items: ["Use: routine PRs where speed matters", "AI-credit estimate: $0.05–$1 per review"] },
    { icon: "🔬", title: "Balanced · available", description: "Longer analysis of complex logic and cross-service changes.", items: ["Use: security-sensitive or multi-service PRs", "AI-credit estimate: $0.25–$5 per review"] },
    { icon: "🔭", title: "Max · coming soon", description: "Most thorough level; not selectable yet.", items: ["Potential use: high-stakes PRs once available", "No published credit estimate"] }
  ]'
  :insight='{ icon: "⚙️", text: "GitHub AI-credit estimates vary by PR; Actions minutes are extra. Default (Balanced) is not a fourth level." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Custom Instructions -->
# Custom Instructions: Encode Your Review Standards
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📋"
  pillLabel="Quick Start: Custom Instructions"
  title="Custom Instructions: Encode Your Review Standards"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/copilot-instructions.md", content: "## Security Standards\n- Flag hardcoded secrets and API keys\n- Require parameterized queries (no SQL concatenation)\n- Check input validation on user-facing code\n\n## Code Quality\n- Suggest refactoring for functions exceeding 50 lines\n- Flag unclear variable names\n\n## Testing\n- Note missing unit tests for new functions\n- Flag assertions that do not validate the logic" }'
  :features='[
    { icon: "🎯", title: "Prioritize top rules", description: "Keep instructions concise; verify a review actually follows them" },
    { icon: "📁", title: "Language-specific files", description: ".github/instructions/*.instructions.md with applyTo patterns" },
    { icon: "🏢", title: "Layer guidance", description: "Organization guidance and repository files can express different standards" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Review Setup Options -->
# Four Ways to Deploy Copilot Code Review
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🏗️"
  pillLabel="Quick Start: Deployment Patterns"
  title="Four Choices for Using Copilot Code Review"
  :cards='[
    { icon: "📦", title: "Repository Ruleset", description: "Configure automatic review; choose draft and new-push triggers explicitly" },
    { icon: "🏢", title: "Organization Default", description: "Set review effort centrally; repositories can override the inherited level" },
    { icon: "🔒", title: "Merge Policy", description: "Normally COMMENTED; preview approvals can count if enabled. Keep human approval in this pilot" },
    { icon: "💬", title: "Manual Request", description: "In the PR Reviewers menu, select Copilot → Request; re-request after a fix if needed" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — Best Practices and Team Adoption -->
# Part 2 — Best Practices and Team Adoption
<SectionOpenerSlide
  :partNumber="2"
  title="Best Practices and Team Adoption"
  subtitle="Give the review context, pair it with other checks, and learn from a small pilot"
  :cards='[
    { icon: "🧩", title: "Review Questions", blurb: "Security to architecture consistency" },
    { icon: "🔬", title: "Complementary Checks", blurb: "Tests and scanning reveal different gaps" },
    { icon: "📈", title: "Phased Rollout", blurb: "Pilot, measure, then decide where to expand" }
  ]'
  :terminal='{ context: "Copilot provides review suggestions", detail: "Tests, scanning, and human judgment supply independent evidence" }'
/>

---

<!-- SLIDE: Six Review Questions -->
# Six Questions for the Human Reviewer
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="🧩"
  pillLabel="Adoption: Human Review"
  title="Six Questions for the Human Reviewer"
  subtitle="Copilot may suggest findings; it does not certify that it answered every question"
  :rows='[
    { label: "Security", description: "Did the change introduce an unsafe input or secret?", tag: "ASK" },
    { label: "Code Quality", description: "Is a new pattern hard to maintain?", tag: "ASK" },
    { label: "Tests", description: "Would a focused test catch the suspected behavior?", tag: "PROVE" },
    { label: "Performance", description: "Does the changed path add expensive work?", tag: "MEASURE" },
    { label: "Policy", description: "Does this need a dedicated compliance or security check?", tag: "ESCALATE" },
    { label: "Architecture", description: "Does the change follow the repository contract?", tag: "COMPARE" }
  ]'
  footnote="Copilot excludes many lockfiles, config and generated files. Inspect those separately."
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Three Independent Signals -->
# The Hybrid Analysis Approach
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔬"
  pillLabel="Adoption: How It Works"
  title="Three Signals, Different Evidence"
  :columns='[
    { icon: "⚡", title: "Build and Tests", description: "FanHub #198: four reported tests passed, but Retry was inert", items: ["A new render test failed on the first head", "6/6 focused tests passed after correction", "Frontend CI built; it did not run those tests"] },
    { icon: "🔍", title: "Code Quality", description: "A separate PR scan raised five first-head findings", items: ["One broad catch in Home", "Four test-client disposal patterns", "New-head scan completed; inspect findings"] },
    { icon: "🧠", title: "Copilot Review", description: "Automatic review found the browser click and alert problems", items: ["Static page: Retry could not respond", "Alert vanished when retry began", "Human tested the fix; re-request review"] }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Phased Rollout -->
# Phased Rollout: Pilot to Organization
<MaturityJourneyRoadmapSlide
  :partNumber="2"
  pillIcon="📈"
  pillLabel="Adoption: Phased Rollout"
  title="Phased Rollout: Pilot to Organization"
  subtitle="Four phases from first review to org-wide standard"
  :stages='[
    { label: "First pilot", name: "Try", description: "One or two repos — compare suggestions with actual code and tests", icon: "🔬", isTarget: false },
    { label: "After feedback", name: "Tune", description: "Prioritize instructions; note useful findings and missed bugs", icon: "🎚️", isTarget: false },
    { label: "When useful", name: "Expand", description: "Train reviewers on triggers, costs, and finding disposition", icon: "📈", isTarget: false },
    { label: "With evidence", name: "Standardize", description: "Revisit policy and review timing with repository owners", icon: "🏢", isTarget: true }
  ]'
  caption="Suggested sequence, not a measured rollout schedule; keep merge policy separate from advisory comments"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Measuring Value -->
# Part 3 — Measuring ROI and Business Impact
<SectionOpenerSlide
  :partNumber="3"
  title="Measuring Value in Your Team"
  subtitle="Use the calculator for a scenario; use your own cohort to learn what changed"
  :cards='[
    { icon: "🧮", title: "Scenario Calculator", blurb: "Editable inputs and assumptions" },
    { icon: "⏱️", title: "Cycle Time", blurb: "Compare comparable PR cohorts" },
    { icon: "📊", title: "Quality Signals", blurb: "Incidents, reverts, reviewer effort" }
  ]'
  :terminal='{ context: "19 days vs. 4 days is a model input", detail: "Calculate the difference; do not attribute it to Copilot without a study" }'
/>

---

<!-- SLIDE: Scenario Calculator -->
# Interactive Time-Savings Calculator
<HeroStatSlide
  :partNumber="3"
  pillIcon="🧮"
  pillLabel="ROI: Calculator"
  title="Model the Opportunity; Verify the Inputs"
  subtitle="Example inputs: 19 days vs. 4 days; results depend on the cohort and assumptions"
  :hero='{ value: "78.9%", label: "calculated difference between example cycle-time inputs", source: "Illustrative calculator scenario — not a measured Copilot effect" }'
  :supporting='[
    { icon: "📊", title: "Choose a cohort", description: "Same repo, similar PR size, comparable calendar period" },
    { icon: "⚙️", title: "Show assumptions", description: "Example: 100 PRs, 45 → 25 review minutes, $100/hour" },
    { icon: "📋", title: "Read the output", description: "Separate observed timing from modeled labor savings" },
    { icon: "📤", title: "Validate with owners", description: "Ask which other process changes affected cycle time" }
  ]'
  :insight='{ icon: "💡", text: "Days open and minutes of human effort are different measures. Only the second supports modeled labor savings." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Cycle Time Scenario -->
# PR Cycle Time: Before and After
<BeforeAfterMetricsSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="ROI: Cycle Time"
  title="What Would a Faster Review Cycle Mean?"
  :before='{
    header: "Example cohort A",
    items: [
      { title: "19 days open", detail: "Illustrative baseline, not a published benchmark" },
      "Measure time to first review",
      "Count handoffs and revision rounds",
      "Record minutes of human review effort"
    ]
  }'
  :after='{
    header: "Example cohort B",
    items: [
      { title: "4 days open", detail: "Illustrative comparison, not a Copilot effect" },
      "Check PR size and reviewer availability",
      "Record useful suggestions and rework",
      "Verify security with dedicated checks"
    ]
  }'
  :metrics='[
    { value: "15 days", label: "example difference" },
    { value: "78.9%", label: "calculated change" },
    { value: "?", label: "causal impact to establish" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Quality Signals -->
# Quality Metrics Beyond Cycle Time
<FourCardGridSlide
  :partNumber="3"
  pillIcon="📈"
  pillLabel="ROI: Quality Metrics"
  title="Which Quality Signals Would You Track?"
  :cards='[
    { icon: "🚨", title: "Production Incidents", description: "Tag incidents linked to reviewed changes; compare comparable periods and severity." },
    { icon: "↩️", title: "Revert Rate", description: "Count merged PRs later reverted, alongside review findings and test gaps." },
    { icon: "🔐", title: "Security Findings", description: "Track verified issues from dedicated security tools and human review." },
    { icon: "⏱️", title: "Time to Feedback", description: "Measure first review, revisions, human effort, and time to merge separately." }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Scenario to Measurement -->
# From PR Data to Executive Summary
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="📤"
  pillLabel="ROI: Executive Summary"
  title="From Scenario to a Question Worth Measuring"
  subtitle="Illustrative calculator output — validate every input before reporting savings"
  :transcript='[
    { type: "prompt", text: "copilot-code-review-calculator" },
    { type: "user", text: "Example: 100 PRs/month; 45 → 25 review min; $100/hour" },
    { type: "thinking", label: "🧮 Calculator:" },
    { type: "response", lines: ["100 × (45 - 25) / 60 = 33.3 review hours", "33.3 × $100 ≈ $3,333 modeled labor value", "19 → 4 days open is a separate cycle-time example"] },
    { type: "divider" },
    { type: "outcome", text: "Scenario output: ~33 hours, ~$3,333; neither observed" },
    { type: "outcome", text: "Next: compare matched cohorts and validate effort with reviewers" }
  ]'
  footerMetric="Scenario first → measured evidence before any ROI claim"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Compliance and Regulatory Guidance -->
# Part 4 — Advanced Patterns: Compliance and Regulatory Guidance
<SectionOpenerSlide
  :partNumber="4"
  title="Compliance and Regulatory Guidance"
  subtitle="Use review guidance to ask better questions; let the control owner verify compliance"
  :cards='[
    { icon: "🏥", title: "Health Data", blurb: "Check the approved data boundary" },
    { icon: "💳", title: "Payment Data", blurb: "Inspect handling and test evidence" },
    { icon: "🔒", title: "Audit Controls", blurb: "Escalate exceptions to the owner" }
  ]'
  :terminal='{ context: "Instructions focus an advisory review", detail: "Compliance needs verified controls, evidence, and an authorized decision" }'
/>

---

<!-- SLIDE: Three Review Contexts -->
# Three Regulatory Frameworks, One Pattern
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="⚖️"
  pillLabel="Compliance: Frameworks"
  title="Three Contexts, One Review Habit"
  :columns='[
    { icon: "🏥", title: "Health Data", description: "Ask where sensitive data flows and who approved the handling pattern", items: ["Inspect the documented boundary", "Test denied access and redacted logs", "Ask the privacy owner to validate"] },
    { icon: "💳", title: "Payment Data", description: "Ask whether the change follows the approved gateway integration", items: ["Inspect token and webhook handling", "Run payment-path tests", "Escalate exceptions to the control owner"] },
    { icon: "🔒", title: "Audit Controls", description: "Ask what evidence the organization requires for access changes", items: ["Check logging and retention policy", "Inspect actual audit events", "Record human control approval"] }
  ]'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Scoped Review Instructions -->
# Compliance Instruction File Pattern
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="📝"
  pillLabel="Compliance: Instruction File"
  title="Compliance Instruction File Pattern"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/instructions/health-data.instructions.md", content: "&#45;&#45;&#45;\napplyTo: \"dotnet/Frontend/**/*.razor\"\n&#45;&#45;&#45;\n# Review guidance (illustrative)\n\n- For touched health-data paths, identify the\n  documented access and logging controls.\n- Ask for a test of denied access or redaction.\n- Flag an unexplained departure from the\n  repository pattern for a human reviewer.\n- Escalate policy interpretation to the\n  privacy and security owners." }'
  :features='[
    { icon: "📂", title: "applyTo pattern", description: "Target the changed paths where this guidance is relevant." },
    { icon: "🔍", title: "Inspect output", description: "Copilot may raise a useful question; run the actual controls and tests." },
    { icon: "📋", title: "Human evidence", description: "Record test results and the control owner&#39;s decision under your audit policy." }
  ]'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Decision Evidence -->
# Decision Evidence
<BeforeAfterSlide
  header="From One Review Signal to a Reviewable Decision"
  :leftItems='["A PR needs an available reviewer", "The author knows the changed path", "Checks cover named behaviors", "The team has repository conventions"]'
  :rightItems='["Copilot offers an early, advisory review", "The author tests useful suggestions", "Dedicated scanning checks other risks", "A human validates the change and policy"]'
  :metrics='[
    { value: "1 PR", detail: "pilot the review on a consequential change" },
    { value: "3 signals", detail: "review, tests, and scanning have different scopes" },
    { value: "1 owner", detail: "a human decides whether the evidence is enough" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Request Copilot from the PR Reviewers menu", "Use Default (Balanced), or choose Lite for routine changes", "Inspect one finding against the actual code"]'
  :thisWeek='["Add one concise repository instruction", "Enable draft or new-push review deliberately", "Try Fix with Copilot if enabled; test and re-request review"]'
  :thisMonth='["Compare similar PR cohorts", "Ask reviewers about useful findings and missed bugs", "Expand only when the evidence and owners support it"]'
  footer="Start with one PR. Ask what changed, what was tested, and who accepts the remaining risk."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
      { href: "https://docs.github.com/en/copilot/concepts/agents/code-review", label: "About Copilot code review", description: "Effort use cases, estimated AI-credit ranges, and limitations" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review", label: "Configure reviews and effort", description: "Three levels; Default is a menu choice and Max is coming soon" },
      { href: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-code-review", label: "Request and interpret a review", description: "Reviewer menu, COMMENTED state, and re-review" },
      { href: "https://docs.github.com/en/copilot/tutorials/customize-code-review", label: "Write review instructions", description: "Focused guidance, path-specific files, and limitations" },
      { href: "https://docs.github.com/en/copilot/reference/review-excluded-files", label: "Review file exclusions", description: "Lockfiles, configs, generated output, and other skipped files" }
    ] },
    { title: "📣 Announcements", color: "blue", items: [
      { href: "https://github.blog/changelog/2026-08-07-copilot-code-review-effort-levels-are-generally-available/", label: "Lite and Balanced availability", description: "GA names, inheritance, and per-review choice" },
      { href: "https://github.blog/changelog/2026-10-02-copilot-code-review-api-support-and-new-default-effort-level/", label: "Balanced default and review API", description: "Current default and supported programmatic request" }
    ] },
    { title: "🧮 Interactive Tools", color: "indigo", items: [
      { href: "https://copilot-code-review--clee1211.github.app/", label: "Time-savings scenario calculator", description: "Sign-in may be required; outputs depend on editable assumptions" }
    ] },
    { title: "🛠️ Worked Example", color: "purple", items: [
      { href: "https://github.com/MSBart2/FanHub/pull/198#pullrequestreview-5446574440", label: "FanHub draft #198", description: "Four tests passed; Copilot caught inert browser Retry" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="GitHub Copilot Code Review"
  subtitle="From First Feedback to a Human Decision"
  :cards="[
    { value: '1 PR', detail: 'request and inspect a review' },
    { value: '1 finding', detail: 'reproduce and test a correction' },
    { value: '1 decision', detail: 'a human accepts or asks for more evidence' }
  ]"
  prompt="What would you test before accepting Copilot&#39;s next useful finding?"
/>
