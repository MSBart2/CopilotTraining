---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Copilot on GitHub
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Copilot on GitHub
mdc: true
section: "Agents on GitHub"
status: active
updated: 2026-10-21
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
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="Copilot on GitHub"
  subtitle="Produce, Reason, Measure"
  tagline="Produce, reason, measure. Then a person decides."
  meta="Agents on GitHub · CopilotTraining Tech Talk · 50 min"
/>

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="Which built-in GitHub agent fits each PR moment, and what evidence does it hand the decider?"
  subtext="The cloud agent produces, code review reasons, and Code Quality measures."
  highlight="Then a person decides."
  :cards='[
    { icon: "🙋", title: "Requester and PR owner", description: "Delegate the issue, then answer findings and update the head" },
    { icon: "🔍", title: "Reviewer", description: "Validate behavior and accept the residual risk at merge" },
    { icon: "🛠️", title: "Platform owner", description: "Own invocation, permissions, required evidence, and rollback" },
    { title: "12 seconds", description: "Assignment of #7 to draft #210 opening (observed, one FanHub run)" },
    { title: "8 of 8", description: "Tests passed when the maintainer ran what the review left unexecuted" },
    { title: "26.7% → 30%", description: "A coverage rule on #199 blocked the first head, then passed" }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🤖", title: "Delegate the Change", subtitle: "Issue #7 to a tested draft in under four minutes", blurb: "Hand off a scoped issue and run the PR-owner acceptance check", slide: 5 },
    { icon: "🧠", title: "Reason About Intent", subtitle: "Which head review saw and what stayed unexecuted", blurb: "Read the analyzed commit, run the named tests, weigh preview approvals", slide: 8 },
    { icon: "📏", title: "Measure Against Rules", subtitle: "Findings, ratings, and coverage thresholds", blurb: "Use rules for what rules measure and start every gate in Evaluate", slide: 13 },
    { icon: "⚖️", title: "Decide What Gets Authority", subtitle: "Permit, count, enforce: one promotion at a time", blurb: "Map evidence to roles, promote one setting, and write the decision", slide: 16 }
  ]'
/>

---

<!-- SLIDE: Evidence on #210 Final Head -->
# Evidence on #210 Final Head
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🎬"
  pillLabel="Cold Open: FanHub #210"
  title="Four Kinds of Evidence on #210's Final Head"
  subtitle="Commit 02ddaf3 of FanHub draft #210, at the moment a person decides (observed)"
  :rows='[
    { label: "Patch + tests", description: "Two-file fix to the episode cache with eight new regression tests", tag: "cloud agent → PR owner, reviewer" },
    { label: "Assessment", description: "“🟢 Approval recommended … tests were not executed”", tag: "code review → reviewer" },
    { label: "Measurement", description: "A Code Quality run on 02ddaf3 with no findings", tag: "Code Quality → reviewer, platform" },
    { label: "Executed run", description: "The maintainer ran the tests: 8 of 8 passed", tag: "maintainer → reviewer" }
  ]'
  footnote="Each row answers a different question for requester, PR owner, reviewer, and platform owner"
  :progressDots='{ current: 1, total: 1, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 1 — Delegate the Change -->
# Part 1 — Delegate the Change
<SectionOpenerSlide
  :partNumber="1"
  title="Delegate the Change"
  subtitle="Assign issue #7 and follow the cloud agent from a plan commit to a tested fix on draft #210"
  :cards='[
    { icon: "⏱️", title: "12 s to a draft", blurb: "Observed: assigned 20:31:19, draft opened 20:31:31" },
    { icon: "✅", title: "Acceptance check", blurb: "Five questions before the PR owner reads the diff" },
    { icon: "🔒", title: "Platform-fixed", blurb: "The agent drafts; a person marks ready and merges" }
  ]'
  :terminal='{ context: "maintainer assigns FanHub #7 to Copilot", detail: "draft #210 → fix 02ddaf3 + 8 tests in under 4 min (observed)" }'
/>

---

<!-- SLIDE: One Assignment, One Draft -->
# One Assignment, One Draft
<AITerminalTranscriptSlide
  :partNumber="1"
  pillIcon="⏱️"
  pillLabel="Delegate: Observed Run"
  title="One Assignment, One Draft, Under Four Minutes"
  subtitle="Issue #7: the Node frontend episode cache returns wrong episodes after a season filter"
  :transcript='[
    { type: "prompt", text: "FanHub issue #7 · 20:31:19 · maintainer" },
    { type: "user", text: "Assign to Copilot" },
    { type: "thinking", label: "🤖 Copilot cloud agent (ephemeral Actions environment):" },
    { type: "response", lines: ["20:31:31 · opens draft #210 with an Initial plan commit (919b158)", "20:34:55 · pushes 02ddaf3: Episodes.js caches only unfiltered responses and ignores stale requests", "Adds Episodes.test.js: 8 regression tests for filters, expiry, remounts, and races", "PR body: Fixes #7 · 2 files · +203 / −7"] },
    { type: "divider" },
    { type: "outcome", text: "The agent produced the draft, branch, and tests. The merge stays with a person." }
  ]'
  footerMetric="issue #7 → draft (plan) → fix + 8 tests → review → quality → maintainer decides · one observed run"
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Delegate and Accept -->
# Delegate and Accept
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🧭"
  pillLabel="Delegate: Acceptance Check"
  title="Delegate Scoped Work, Then Check the Head Before the Diff"
  :left='{
    header: "What the requester delegates",
    icon: "🧭",
    items: [
      { title: "Delegate", detail: "Known location and testable symptom; tests, docs, tech debt" },
      { title: "Keep human-led", detail: "Broad refactors, tacit domain logic, security-sensitive work" },
      { title: "Plan first", detail: "Larger work: plan in the Agents tab, then ask for a PR" }
    ]
  }'
  :right='{
    header: "What the PR owner checks first",
    icon: "✅",
    items: [
      "Plan matches the issue&#39;s intent?",
      "Which commit holds the code?",
      "Changes outside expected paths?",
      "Tests added, and has anyone run them?",
      "Runs awaiting approval? Evidence absent?"
    ]
  }'
  :insight='{ icon: "🔒", text: "Platform-fixed: drafts on a copilot/ branch only; a person other than the requester approves and merges." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Part 2 — Reason About Intent -->
# Part 2 — Reason About Intent
<SectionOpenerSlide
  :partNumber="2"
  title="Reason About Intent"
  subtitle="Read which commit each review analyzed, run what it left unexecuted, and choose who approves"
  :cards='[
    { icon: "🔎", title: "Which head?", blurb: "The automatic review saw the plan-only commit" },
    { icon: "🧪", title: "Run the tests", blurb: "Review named them unexecuted; the maintainer ran 8" },
    { icon: "🖱️", title: "#198 Retry", blurb: "Review found an inert button four tests missed" }
  ]'
  :terminal='{ context: "re-requested Copilot review on 02ddaf3", detail: "🟢 approval recommended · tests not executed → maintainer runs them" }'
/>

---

<!-- SLIDE: Which Head the Review Saw -->
# Which Head the Review Saw
<WorkflowShowdownStepsSlide
  :partNumber="2"
  pillIcon="🔎"
  pillLabel="Reason: Which Head?"
  title="The Automatic Review Analyzed the Plan-Only Head"
  subtitle="FanHub ruleset: automatic review on every PR to main, including drafts · review_on_push: false"
  leftLabel="Automatic review (ruleset)"
  rightLabel="Re-requested review (maintainer)"
  :steps='[
    { left: { label: "Fires at 20:31:37", note: "Six seconds after the draft opens" }, right: { label: "Maintainer re-requests Copilot", note: "From the Reviewers sidebar" } },
    { left: { label: "Analyzes 919b158", note: "The Initial plan commit, before any code" }, right: { label: "Analyzes 02ddaf3", note: "The fix plus 8 regression tests" } },
    { left: { label: "“Wasn&#39;t able to review any files”", note: "A plan-only head has no code to read" }, right: { label: "🟢 Approval recommended", note: "Tests named as not executed" } },
    { left: { label: "Fix lands at 20:34:55", note: "review_on_push: false, so no new review" }, right: { label: "Assessment names its commit", note: "The reviewer knows what it covers" } }
  ]'
  :outcomeLeft='{ icon: "📄", label: "A review of the plan" }'
  :outcomeRight='{ icon: "🔎", label: "A review of the implementation" }'
  summaryMetric="Turn on Review new pushes, or read the first automatic review as a review of the plan"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Assessment and Executed Run -->
# Assessment and Executed Run
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🧪"
  pillLabel="Reason: Run What It Named"
  title="Copilot Recommended Approval; the Maintainer Ran the Tests"
  codePosition="left"
  :code='{ language: "text", filename: "maintainer terminal · #210 head 02ddaf3", content: "$ CI=true npx react-scripts test --watchAll=false \\\n    src/pages/Episodes.test.js\nPASS src/pages/Episodes.test.js\n  √ filtered responses do not overwrite the …\n  √ cache hits restore season controls on …\n  √ a late filtered response cannot replace …\n  √ an unmounted request cannot overwrite …\n  ... 4 more\nTests: 8 passed, 8 total" }'
  :features='[
    { icon: "🧠", title: "Copilot code review: assessment", description: "“🟢 Approval recommended … regression tests cover the affected behavior but were not executed.”" },
    { icon: "🧪", title: "Maintainer: executed evidence", description: "Runner status PASS, 8 of 8. Domain result: filters, expiry, remounts, and races behave as #7 expects" },
    { icon: "🧾", title: "Two answers, two questions", description: "Review judged the diff sound and named the step it left for a person" }
  ]'
  :insight='{ icon: "💡", text: "Observed on FanHub #210. A green assessment and an executed run each answer a different question." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: #198 Inert Retry -->
# #198 Inert Retry
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="🖱️"
  pillLabel="Reason: Contrast Case #198"
  title="On #198, Review Caught an Inert Retry That Tests Missed"
  :problem='{
    header: "Green build, inert button",
    items: [
      { title: "4 component tests passed", detail: "Build green on FanHub draft #198" },
      { title: "Static render", detail: "The Home page had no interactive render mode, so Retry never wired up" }
    ]
  }'
  :solution='{
    header: "Copilot review found",
    items: [
      { title: "No interactivity", detail: "The bUnit click test could not see the browser boundary" },
      { title: "Alert cleared too early", detail: "The Retrying... state was unreachable" }
    ],
    code: { language: "razor", content: "@rendermode InteractiveServer" }
  }'
  :outcome='{
    header: "The author verified",
    items: [
      "A new render-mode test failed against the original draft",
      "6 of 6 tests pass after the fix",
      "Browser against an API returning 503: alert shows, Retry restores the page"
    ]
  }'
  :insight='{ icon: "🔎", text: "Observed on FanHub #198. Review reads intent, and intent is where component tests often stop." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Fix With Copilot and Approvals -->
# Fix With Copilot and Approvals
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="⚖️"
  pillLabel="Reason: Who Approves?"
  title="Hand Fixes Back; Decide Whether Copilot's Approval Counts"
  :left='{
    header: "Fix with Copilot · public preview",
    icon: "🔁",
    items: [
      { title: "Comment → cloud agent", detail: "Copilot pushes a commit or opens a new pull request" },
      { title: "Shared setup", detail: "Review reads the same instruction files and MCP configuration as the cloud agent" },
      { title: "PR owner stays in the loop", detail: "Each pushed commit is new evidence to check" }
    ]
  }'
  :right='{
    header: "Copilot approvals · public preview",
    icon: "⚖️",
    items: [
      { title: "Admin opt-in (Sept 2026)", detail: "Every review has an approval assessment; opted-in approvals count" },
      { title: "Dismissed on new pushes", detail: "The same rule as a human approval" },
      { title: "Scope it", detail: "Keep a human approval where behavior, security, or data is at stake" }
    ]
  }'
  :insight='{ icon: "🔑", text: "Counting Copilot&#39;s approval promotes advice to authority. Choose the paths, the owner, and the way back." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Measure Against Rules and Thresholds -->
# Part 3 — Measure Against Rules and Thresholds
<SectionOpenerSlide
  :partNumber="3"
  title="Measure Against Rules and Thresholds"
  subtitle="Use CodeQL findings, ratings, and coverage for what rules measure; tests and reviewers cover behavior"
  :cards='[
    { icon: "📏", title: "Standard findings", blurb: "CodeQL rules, reproducible, can gate (GA)" },
    { icon: "✨", title: "AI findings", blurb: "Model-mediated, default branch, advisory (preview)" },
    { icon: "🚦", title: "#199 coverage gate", blurb: "Blocked at 26.7%, passed at 30% (observed)" }
  ]'
  :terminal='{ context: "Code Quality run on #210 head 02ddaf3", detail: "0 findings · CodeQL reported no new alerts (observed)" }'
/>

---

<!-- SLIDE: Standard and AI Findings -->
# Standard and AI Findings
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="📏"
  pillLabel="Measure: Two Kinds of Finding"
  title="Standard Findings Can Gate a Merge; AI Findings Advise"
  :left='{
    header: "Standard findings · GA",
    icon: "📏",
    items: [
      { title: "Source", detail: "CodeQL quality rules" },
      { title: "Reproducibility", detail: "Stable for the same code, rules, and tool version" },
      { title: "Where", detail: "Pull requests and default branch, with Autofix suggestions" },
      { title: "Gate", detail: "Can block merge by severity threshold" }
    ]
  }'
  :right='{
    header: "AI findings · public preview",
    icon: "✨",
    items: [
      { title: "Source", detail: "Model review of recently changed files" },
      { title: "Reproducibility", detail: "Model-mediated" },
      { title: "Where", detail: "Default branch only" },
      { title: "Gate", detail: "Advisory; cannot block merge" }
    ]
  }'
  :insight='{ icon: "🧪", text: "#210 (observed): the run on 02ddaf3 posted no findings. Rules cover known patterns; the cache behavior still needs executed tests and a reviewer." }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: #199 Coverage Gate -->
# #199 Coverage Gate
<HeroStatSlide
  :partNumber="3"
  pillIcon="🚦"
  pillLabel="Measure: Gate on #199"
  title="On #199, a Coverage Rule Blocked, Then Passed"
  subtitle="Active ruleset: Cobertura upload required, 27% minimum on the target branch (observed)"
  :hero='{ value: "30%", label: "coverage on draft #199 after two tests, up from a blocked 26.7%", source: "Observed: FanHub #199" }'
  :supporting='[
    { icon: "🚫", title: "First head blocked", description: "6 tests passed; 26.7% fell under the 27% rule" },
    { icon: "✍️", title: "Author added two tests", description: "Hand-written Home page tests; 8 of 8 pass" },
    { icon: "✅", title: "Same PR turned green", description: "GitHub displayed 30% and the gate passed" },
    { icon: "🤖", title: "Findings → cloud agent (GA)", description: "Comment @Copilot on a finding or bulk-assign from the dashboard" }
  ]'
  :insight='{ icon: "🚦", text: "Start each new rule in Evaluate mode to see what it would block, then promote it to Active once the team trusts the signal." }'
  :progressDots='{ current: 2, total: 2, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Part 4 — Decide What Gets Authority -->
# Part 4 — Decide What Gets Authority
<SectionOpenerSlide
  :partNumber="4"
  title="Decide What Gets Authority"
  subtitle="Map evidence to the people who rely on it, then permit, count, or enforce one setting at a time"
  :cards='[
    { icon: "🗺️", title: "Five surfaces", blurb: "Context, invocation, review, merge evidence, cost" },
    { icon: "🪜", title: "An uneven ladder", blurb: "Permit the producer, count review, enforce rules" },
    { icon: "📝", title: "#210 decision record", blurb: "Written before acting, with a recovery path" }
  ]'
  :terminal='{ context: "platform owner promotes one setting", detail: "named owner + observation period + rollback condition" }'
/>

---

<!-- SLIDE: Evidence by Role -->
# Evidence by Role
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🧾"
  pillLabel="Authority: Evidence by Role"
  title="Each Agent Hands the Decider One Kind of Evidence"
  subtitle="#210 carried all three on 02ddaf3; the maintainer added an executed run before deciding"
  :rows='[
    { label: "Cloud agent", description: "Draft diff, own tests, linked issue; people judge scope and proof", tag: "produces" },
    { label: "Code review", description: "Comments and an approval assessment; people weigh each and run tests", tag: "reasons" },
    { label: "Code Quality", description: "Findings, ratings, coverage, Autofix; security review stays separate", tag: "measures" },
    { label: "Maintainer", description: "Executed check (8 of 8 on #210), residual risk, and the merge", tag: "decides" }
  ]'
  footnote="Each agent supplies its own kind of evidence, and only that kind"
  :progressDots='{ current: 1, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Five Configuration Surfaces -->
# Five Configuration Surfaces
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🗺️"
  pillLabel="Authority: Configuration Map"
  title="Five Surfaces Shape What the Three Agents Do"
  subtitle="The platform owner works across all five"
  :rows='[
    { label: "Agent context", description: "copilot-instructions.md, *.instructions.md, AGENTS.md, custom agents", tag: "agent + review" },
    { label: "Invocation", description: "copilot-setup-steps.yml, firewall, MCP config, workflow approvals", tag: "cloud agent" },
    { label: "Review policy", description: "Rulesets: automatic review, Review new pushes, Copilot approvals", tag: "code review" },
    { label: "Merge gates", description: "Code Quality settings, CodeQL, coverage upload, quality rulesets", tag: "Code Quality" },
    { label: "Economics", description: "AI Credits, Actions minutes, Code Quality licenses", tag: "every promotion" }
  ]'
  footnote="Shared context: excludeAgent: code-review keeps a test-writing rule with the producer and off the reviewer's checklist"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Promotion Ladder -->
# Promotion Ladder
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🪜"
  pillLabel="Authority: Promotion Ladder"
  title="Promote Advice to Authority One Step at a Time"
  :columns='[
    { icon: "🤖", title: "Cloud agent · permit", items: [{ title: "Observe", detail: "Assign a few scoped issues; read every draft" }, { title: "Evaluate", detail: "Add copilot-setup-steps and custom agents" }, { title: "Enforce", detail: "Platform-fixed: drafts only; a person approves and merges" }] },
    { icon: "🧠", title: "Code review · count", items: [{ title: "Observe", detail: "Request reviews manually" }, { title: "Evaluate", detail: "Ruleset auto-review with Review new pushes" }, { title: "Enforce", detail: "Count Copilot approvals (preview) on chosen paths" }] },
    { icon: "📏", title: "Code Quality · enforce", items: [{ title: "Observe", detail: "Enable on one repository; read the backlog" }, { title: "Evaluate", detail: "Quality and coverage rules in Evaluate mode" }, { title: "Enforce", detail: "Active rules at an accepted threshold; AI findings stay advisory" }] }
  ]'
  :insight='{ icon: "↩️", text: "Each promotion has an owner and a way back: revert to Evaluate, dismiss with a reason, or close and reassign. Budget AI Credits and $10 per committer for Code Quality." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Decision Record on #210 -->
# Decision Record on #210
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="📝"
  pillLabel="Authority: #210 Decision Record"
  title="The Decision on #210, Written Before Acting"
  subtitle="The maintainer's record for head 02ddaf3"
  :rows='[
    { label: "Available", description: "Patch + tests, approval assessment, clean quality run, 8/8 executed", tag: "on the head" },
    { label: "Absent", description: "A browser check of the season filter; a Node frontend coverage gate", tag: "named gap" },
    { label: "Policy met", description: "Default-branch ruleset; CodeQL with no new alerts", tag: "rules" },
    { label: "Judgment", description: "One page and its tests; the tests exercise the reported symptom", tag: "person" },
    { label: "Action", description: "Mark ready and squash-merge; recovery: revert and reopen #7", tag: "action + recovery" }
  ]'
  footnote="Chosen action, owned by a person: revert the squash commit and reopen #7 if the filter regresses"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From One Green Check to Evidence With a Named Producer"
  :leftItems='["Evidence read as one combined signal", "Review results read without their commit", "Tests the review named left for later", "Authority granted to agents as a bundle"]'
  :rightItems='["Each item traced to its producer and its head", "Review new pushes on, or the first review read as a plan review", "A person runs the tests the review names", "One promoted setting with an owner and a rollback condition"]'
  :metrics='[
    { value: "12 s", detail: "Assignment to draft #210 (observed, one run)" },
    { value: "8 of 8", detail: "Tests passed when the maintainer ran them" },
    { value: "26.7% → 30%", detail: "#199 coverage gate blocked, then passed" }
  ]'
/>

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Assign one bug with a known location and testable symptom to Copilot; time the draft", "Check your review ruleset for Review new pushes", "Read which commit each Copilot review analyzed"]'
  :thisWeek='["Run the agent&#39;s tests yourself before trusting a green assessment", "Add one excludeAgent rule to an instruction file and watch one agent change", "Write a decision record for your next agent-authored pull request"]'
  :thisMonth='["Enable Code Quality on one repository with one coverage rule in Evaluate mode", "List the evidence on your last merged PR&#39;s final head and name the missing kind", "Promote one setting with a named owner and a rollback condition"]'
  footer="Produce, reason, measure, then a person decides, with every promotion owned and reversible."
/>

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "☁️ Cloud Agent and Code Review", color: "cyan", items: [
        { href: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent", label: "About Copilot cloud agent", description: "Runtime, firewall, and authority" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review", label: "Configure automatic code review", description: "Rulesets and Review new pushes" },
        { href: "https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/", label: "excludeAgent instructions", description: "Agent-specific context" }
    ] },
    { title: "📏 Approvals and Code Quality", color: "indigo", items: [
        { href: "https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/", label: "Copilot approvals (preview)", description: "Approvals that count" },
        { href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "About GitHub Code Quality", description: "Findings, ratings, rules" },
        { href: "https://docs.github.com/en/billing/concepts/product-billing/github-code-quality", label: "Code Quality billing", description: "Per-committer pricing" }
    ] },
    { title: "🎬 FanHub Evidence", color: "blue", items: [
        { href: "https://github.com/MSBart2/FanHub/pull/210", label: "Draft #210", description: "Cloud agent fix for #7" },
        { href: "https://github.com/MSBart2/FanHub/pull/198", label: "#198", description: "Review finds an inert Retry" },
        { href: "https://github.com/MSBart2/FanHub/pull/199", label: "#199", description: "Coverage gate blocks, then passes" }
    ] },
    { title: "🧭 Where It Stops Fitting", color: "purple", items: [
        { label: "GitHub Agentic Workflows", description: "Recurring judgment on schedules and events" },
        { label: "Agents at Your Keyboard", description: "Local plan, implement, verify loops" },
        { label: "Agentic SDLC", description: "Readiness score and maturity path" }
    ] }
  ]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Copilot on GitHub"
  subtitle="Produce, reason, measure. Then a person decides."
  :cards="[
    { value: 'Which head?', detail: 'The automatic review analyzed the plan; re-request or enable Review new pushes' },
    { value: '8 of 8', detail: 'Copilot named the tests as unexecuted; the maintainer ran them' },
    { value: '26.7% → 30%', detail: 'A coverage rule blocked, then passed, on #199' },
  ]"
  prompt="Take the last PR your team merged: which kinds of evidence sat on its final head, and which single setting would you promote first?"
/>
