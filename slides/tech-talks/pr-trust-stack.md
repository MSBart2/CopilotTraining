---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: "From Issue to Merge Decision — CopilotTraining Tech Talk"
drawings: { persist: false }
transition: slide-left
title: From Issue to Merge Decision
mdc: true
section: Verify and Govern
status: active
updated: 2026-10-08
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import MorningInboxEvidenceSlide from './components/MorningInboxEvidenceSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
</script>

# From Issue to Merge Decision
<!-- SLIDE: Title -->
<TitleSlide
  title="From Issue to Merge Decision"
  subtitle="Agentic workflows, Copilot review, and Code Quality together"
  tagline="Bound the work · Inspect the draft · Enforce the bar · Keep acceptance human"
  meta="CopilotTraining · Verify and Govern · 50 minutes"
/>

---

# The Request-to-Decision Map
<!-- SLIDE: The Request-to-Decision Map -->
<MorningInboxEvidenceSlide />

---

# Four FanHub Proof Points
<!-- SLIDE: Four FanHub Proof Points -->
<MorningInboxEvidenceSlide focus />

---

# Table of Contents
<!-- SLIDE: Table of Contents -->
<TocSlide
  highContrast
  subtitle="Authorize → Deliver a draft → Review and enforce → Decide"
  :sections='[
    { icon: "🧭", title: "Authorize the Work", subtitle: "Agentic lifecycle", blurb: "Human approves a runnable, bounded plan", slide: 5 },
    { icon: "📦", title: "Inspect the Draft", subtitle: "Agentic lifecycle", blurb: "Read the actual diff, build, and residual risk", slide: 9 },
    { icon: "🔎", title: "Review and Enforce", subtitle: "Code review + Code Quality", blurb: "Advice, a human-accepted fix, and an automatic gate", slide: 13 },
    { icon: "👤", title: "Make the Merge Decision", subtitle: "Join the evidence", blurb: "Know which PR proved what and what still needs a person", slide: 21 }
  ]'
/>

---

# Part 1 — Authorize the Work
<!-- SLIDE: Part 1 — Authorize the Work -->
<SectionOpenerSlide
  :partNumber="1"
  title="Authorize the Work"
  subtitle="The lifecycle starts with a person choosing scope and a reproducible check."
  :cards='[
    { icon: "🔍", title: "Research", blurb: "Issue #110 identifies layout work" },
    { icon: "🧭", title: "Plan", blurb: "Move only two CSS rules" },
    { icon: "✅", title: "Authorize", blurb: "Human approves the corrected build path" }
  ]'
  :terminal='{ context: "FanHub issue #110 → draft PR #193", detail: "Request labels hand off artifacts; status labels cannot approve a plan" }'
/>

---

# What Makes the Request Runnable?
<!-- SLIDE: Corrected Lifecycle Plan -->
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🧭"
  pillLabel="FanHub #110 · Human-checked plan"
  title="A Failed Build Command Changes the Plan"
  codePosition="left"
  :code='{ language: "text", filename: "FanHub #110 · revised plan", content: "Request: move inline layout CSS\nScope: .main-content + .footer only\n\nFirst command: dotnet build dotnet/FanHub.sln\n→ fails on missing project paths\n\nCorrected command:\ndotnet build dotnet/Frontend/Frontend.csproj\n→ 0 errors; 7 existing warnings" }'
  :features='[
    { icon: "👤", title: "Actor", description: "The maintainer tests the proposed command and asks for a corrected plan." },
    { icon: "🧪", title: "Evidence", description: "A project build actually runs; existing warnings are recorded separately." },
    { icon: "📌", title: "Boundary", description: "A plan-ready label records output; the human approval event authorizes implementation." }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Who Authorizes the Agent?
<!-- SLIDE: Human Approval Checkpoint -->
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="🧭"
  pillLabel="FanHub #110 · Explicit approval"
  title="The Human Approves Two Files and One Draft"
  :columns='[
    { icon: "🎯", title: "Scope", items: ["MainLayout.razor + isolated CSS", "Move only .main-content and .footer", "Preserve the visible layout"] },
    { icon: "🧪", title: "Proof", items: ["Build Frontend.csproj", "Compare three routes at two widths", "Record what was not tested"] },
    { icon: "👤", title: "Authority", items: ["Latest plan names @rbmathis", "Maintainer checks the revised plan", "Approval label requests one draft"] }
  ]'
  :insight='{ icon: "📌", text: "The agent can propose and implement; the named human decides when the plan is ready to run." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# What Is Automatic, and What Stays Human?
<!-- SLIDE: Authority Boundary -->
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔐"
  pillLabel="Across all three services"
  title="Which Actions Can GitHub Take Automatically?"
  :left='{
    header: "Automated after setup",
    icon: "🤖",
    items: [
      { title: "Lifecycle", detail: "Offer a draft after verified approval" },
      { title: "Review", detail: "Comment on an eligible PR" },
      { title: "Quality", detail: "Block merge when an active rule fails" }
    ]
  }'
  :right='{
    header: "Human decisions",
    icon: "👤",
    items: [
      { title: "Request", detail: "Approve scope and runnable checks" },
      { title: "Correction", detail: "Inspect an Autofix before committing it" },
      { title: "Acceptance", detail: "Review residual risk and decide on merge" }
    ]
  }'
  :insight='{ icon: "🧠", text: "These are different controls: Copilot advice is not a gate, and an Autofix suggestion is not an automatic commit." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

# Part 2 — Inspect the Draft
<!-- SLIDE: Part 2 — Inspect the Draft -->
<SectionOpenerSlide
  :partNumber="2"
  title="Inspect the Draft"
  subtitle="The approved plan turns into an artifact a teammate can inspect."
  :cards='[
    { icon: "🤖", title: "Implement", blurb: "Move the two approved CSS rules" },
    { icon: "📦", title: "Offer", blurb: "One draft, not a merge" },
    { icon: "🧪", title: "Verify", blurb: "Read build and browser scope separately" }
  ]'
  :terminal='{ context: "FanHub issue #110 → draft PR #193", detail: "Two-file CSS move · Frontend build passed · no automatic acceptance" }'
/>

---

# What May the Workflow Create?
<!-- SLIDE: Draft Output Boundary -->
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📦"
  pillLabel="Implementation · Safe Output"
  title="The Approved Request Becomes a Draft, Not a Merge"
  codePosition="left"
  :code='{ language: "yaml", filename: "gh-aw-implement-approved.md · source excerpt", content: "on:\n  issues:\n    types: [labeled]\n    names: [lifecycle:implement-approved]\nsafe-outputs:\n  create-pull-request:\n    title-prefix: \"[lifecycle] \"\n    labels: [agent-generated, lifecycle:in-review]\n    draft: true\n    max: 1" }'
  :features='[
    { icon: "🔐", title: "Trusted approval", description: "A pre-agent check verifies the label actor and latest approved plan." },
    { icon: "🛠️", title: "Actual change", description: "PR #193 moves two layout rules across MainLayout.razor and MainLayout.razor.css." },
    { icon: "📬", title: "Output", description: "The workflow offers a draft; compare the diff to the plan before any review." }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# What Did the Draft Actually Prove?
<!-- SLIDE: Lifecycle Draft Evidence -->
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🧪"
  pillLabel="FanHub #193 · Scoped delivery"
  title="A Passing Build and a Visible Layout Comparison"
  codePosition="left"
  :code='{ language: "text", filename: "FanHub #193 · draft evidence", content: "Changed: MainLayout.razor\n         MainLayout.razor.css\n\nProject build: 0 errors\nWarnings: 7 existing nullable warnings\n\nBrowser comparison: baseline vs draft\nRoutes: /, /characters, /episodes\nWidths: 1024px and 300px\nMain content + footer matched" }'
  :features='[
    { icon: "📋", title: "Scope", description: "The diff touches exactly the two approved layout files." },
    { icon: "👀", title: "Domain result", description: "Six baseline-to-draft viewport comparisons show the selected layout unchanged." },
    { icon: "🧭", title: "Limit", description: "Blazor error recovery was not exercised; a build cannot settle that risk." }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# What Remains Unproved?
<!-- SLIDE: Honest Stops -->
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="↩️"
  pillLabel="Keep the Evidence Honest"
  title="A Draft Can Be Useful While a Risk Remains Open"
  :columns='[
    { icon: "🧪", title: "Runner", items: ["Bot PR CI initially required approval", "Maintainer approved the read-only build", "Build ran on the actual PR head"] },
    { icon: "📦", title: "Artifact", items: ["Two-file diff matches the plan", "Layout matches at tested widths", "Error recovery is still unexercised"] },
    { icon: "👤", title: "Decision", items: ["Ask for a focused runtime test", "Accept residual risk under policy", "Keep the draft while evidence is missing"] }
  ]'
  :insight='{ icon: "🔎", text: "PR #193 proves bounded delivery, not a merge. PR #198 separately shows why a passing test may miss browser behavior." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

# Part 3 — Review, Remediate, and Enforce
<!-- SLIDE: Part 3 — Review, Remediate, and Enforce -->
<SectionOpenerSlide
  :partNumber="3"
  title="Review, Remediate, and Enforce"
  subtitle="Three distinct FanHub PRs reveal what advice, a fix proposal, and a gate can each do."
  :cards='[
    { icon: "🔎", title: "#198 · Review", blurb: "Find the inert browser Retry" },
    { icon: "📊", title: "#199 · Gate", blurb: "Block until coverage exceeds 27%" },
    { icon: "🔧", title: "#201 · Autofix", blurb: "Inspect and commit a generated fix" }
  ]'
  :terminal='{ context: "Separate draft PRs, not sequential heads of one PR", detail: "Automatic review ≠ automatic remediation ≠ automatic merge gate" }'
/>

---

# When Does Review Arrive?
<!-- SLIDE: Copilot Review Trigger -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🔎"
  pillLabel="Copilot Code Review · PR Trigger"
  title="A Ruleset Requests Copilot Review on Draft #198"
  codePosition="left"
  :code='{ language: "text", filename: "FanHub · active repository ruleset", content: "Target: main\nAutomatic Copilot review: on\nDraft pull requests: included\nNew pushes: included\n\nPR #198: bot-created draft · ba0764f\nAutomatic review: COMMENTED\nTwo open inline findings" }'
  :features='[
    { icon: "⚙️", title: "Setup", description: "A maintainer enables draft and new-push triggers; a manual review request also works." },
    { icon: "📨", title: "Output", description: "Open the PR review and inline threads on the analyzed head, not just its check status." },
    { icon: "👤", title: "Authority", description: "Suggestions invite response and tests. COMMENTED is advisory, never a human approval." }
  ]'
  :progressDots='{ current: 1, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# What Did Copilot Catch on the Agent's PR?
<!-- SLIDE: Automatic Copilot Findings -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🔍"
  pillLabel="PR #198 · Copilot Review on ba0764f"
  title="Copilot Spots the Inert Retry Button"
  codePosition="left"
  :code='{ language: "text", filename: "PR #198 · COMMENTED · 2 findings", content: "Home.razor: button @onclick=LoadHomeDataAsync\nHome: no interactive render mode\nRoutes.razor: <Routes /> (static)\n→ click handler cannot run in browser\n\nRetry also clears loadError first\n→ alert and disabled state disappear\n\nAgent reports 4/4 component tests pass" }'
  :features='[
    { icon: "📨", title: "Actual review", description: "Automatic Copilot review returned COMMENTED with two findings on the bot-created draft." },
    { icon: "🧩", title: "Why it matters", description: "bUnit can invoke a click even when the real route renders only static HTML." },
    { icon: "👤", title: "Next", description: "Enable interactivity, keep the alert through Retry, then prove browser recovery." }
  ]'
  :progressDots='{ current: 2, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# What Does a Finding Change?
<!-- SLIDE: Review Finding Disposition -->
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🔍"
  pillLabel="PR #198 · Human Response"
  title="A Failing Test and Browser Check Close the Gap"
  :cards='[
    { icon: "🧭", title: "Wire interaction", description: "Add InteractiveServer in the approved Home scope; keep alert visible while Retry runs." },
    { icon: "🧪", title: "Test red → green", description: "Render-mode test failed on ba0764f; 6/6 focused tests pass locally on edeadee." },
    { icon: "🌐", title: "Reproduce failure", description: "Mock API returns 503: browser shows alert and server logs the exception." },
    { icon: "🔄", title: "Prove recovery", description: "Mock returns 200; Retry restores count and quote, clears alert, with one navigation total." }
  ]'
  :progressDots='{ current: 3, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# What Did Code Quality Actually Find?
<!-- SLIDE: Code Quality Baseline -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Code Quality · MAIN at 800c8ec"
  title="One Reliability Rule Finds a Silent Home-Page Failure"
  codePosition="left"
  :code='{ language: "text", filename: "Initial Code Quality scan · main · 800c8ec", content: "Rule: Poor error handling: empty catch block\nCategory: Reliability · severity: Note\nFile: dotnet/Frontend/.../Home.razor:332\n\ncatch { }\n→ failed API request goes unexplained\n\n71 maintainability + 9 reliability\nExisting default-branch findings" }'
  :features='[
    { icon: "⚙️", title: "Setup", description: "A maintainer enabled Code Quality; rules-based CodeQL scanned main after activation." },
    { icon: "🔎", title: "Open live", description: "Security and quality → Code quality → Standard findings; inspect the Home.razor rule and location." },
    { icon: "📌", title: "Human response", description: "Select issue #95, specify a friendly error and Retry, then verify the behavior." }
  ]'
  :progressDots='{ current: 4, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# What Is the Quality Signal on This PR?
<!-- SLIDE: Code Quality PR Boundary -->
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="⚙️"
  pillLabel="Code Quality · PR #198 at ba0764f"
  title="The PR Scan Finds New Patterns to Triage"
  codePosition="left"
  :code='{ language: "text", filename: "Rules-based PR scan · initial head", content: "main · 800c8ec (existing)\n  1 empty catch in Home.razor\n\nPR #198 · ba0764f (new)\n  1 generic catch in Home.razor\n  4 test HttpClient disposal findings\n\nedeadee: specific catches + DI clients\nNew-head quality run: completed" }'
  :features='[
    { icon: "📨", title: "Trigger and scope", description: "Code Quality independently scanned the new PR head; the baseline finding stays on main." },
    { icon: "🔄", title: "Observed output", description: "Five inline findings identify a broad catch and four new test-client disposal patterns." },
    { icon: "👤", title: "Rerun", description: "The edeadee scan completed successfully; inspect current findings, not only check status." }
  ]'
  :progressDots='{ current: 5, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Can a Rule Block the PR Automatically?
<!-- SLIDE: FanHub Coverage Gate -->
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="🔒"
  pillLabel="Code Quality · FanHub #199"
  title="The Coverage Rule Blocks, Then Unblocks, the Same PR"
  :columns='[
    { icon: "🔴", title: "First head · blocked", description: "4bd7844", items: ["Six tests pass; Cobertura uploads", "GitHub reports 26.7% below 27%", "Active branch-scoped gate blocks merge"] },
    { icon: "🧪", title: "Human correction", description: "ab96e8b", items: ["Author manually adds two Home tests", "Eight tests pass on corrected head", "These tests were not Autofix"] },
    { icon: "✅", title: "Rule passes", description: "PR stays draft", items: ["GitHub displays 30% coverage", "Configured requirement now passes", "Human acceptance still required"] }
  ]'
  :insight='{ icon: "📌", text: "github.com/MSBart2/FanHub/pull/199 · The 27% rule targets its isolated demo base, not PR #198 or #201." }'
  :progressDots='{ current: 6, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Can Code Quality Also Propose a Fix?
<!-- SLIDE: FanHub Autofix -->
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔧"
  pillLabel="Code Quality · FanHub #201"
  title="An Author Accepts Code Quality Autofix"
  :left='{
    header: "First head · 294529d",
    icon: "🔍",
    items: [
      { title: "Generic catch clause", detail: "Episodes uses int.Parse plus catch (Exception)" },
      { title: "Code Quality finding", detail: "Offers a generated Suggested changeset" },
      { title: "Build passes", detail: "Yet unrelated exceptions can be swallowed" }
    ]
  }'
  :right='{
    header: "Autofix head · 0b33cda",
    icon: "✅",
    items: [
      { title: "Human clicks Commit suggestions", detail: "GitHub commits the generated TryParse fix" },
      { title: "New-head checks", detail: "Build and C# analysis pass; finding is outdated" },
      { title: "Limit", detail: "No frontend tests on main; PR remains draft" }
    ]
  }'
  :insight='{ icon: "📌", text: "github.com/MSBart2/FanHub/pull/201 · Copilot Code Review also commented, but Code Quality produced this Autofix. No gate is configured on #201." }'
  :progressDots='{ current: 7, total: 7, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

# Part 4 — Make the Merge Decision
<!-- SLIDE: Part 4 — Make the Merge Decision -->
<SectionOpenerSlide
  :partNumber="4"
  title="Make the Merge Decision"
  subtitle="The accepting reviewer joins current-head evidence without treating distinct PRs as one run."
  :cards='[
    { icon: "📦", title: "Authority", blurb: "Match plan, diff, and head" },
    { icon: "🔎", title: "Proof", blurb: "Distinguish advice, test, and gate" },
    { icon: "👤", title: "Decision", blurb: "Accept, revise, or hold" }
  ]'
  :terminal='{ context: "Every FanHub example is still draft and unmerged", detail: "Passing a check never supplies the human merge decision" }'
/>

---

# How Does the Reviewer Sort the Evidence?
<!-- SLIDE: Reviewer's Decision Queue -->
<FourCardGridSlide
  :partNumber="4"
  pillIcon="📥"
  pillLabel="Any Repository · One PR at a Time"
  title="Which PR Proves Which Part of the Story?"
  :cards='[
    { icon: "🤖", title: "#193 · Lifecycle", description: "Issue #110 approval authorizes a scoped CSS draft; build and layout compare pass." },
    { icon: "🔎", title: "#198 · Review", description: "Copilot finds inert Retry after four reported tests pass; human tests the correction." },
    { icon: "📊", title: "#199 · Gate", description: "27% coverage rule blocks 26.7%; manually added tests take it to 30%." },
    { icon: "🔧", title: "#201 · Autofix", description: "Code Quality proposes TryParse; the author commits it; scan and build rerun." }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# What Makes a Draft Ready for Acceptance?
<!-- SLIDE: Morning Decision -->
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="👤"
  pillLabel="The Morning Decision"
  title="What Would Earn a Human Merge Decision?"
  subtitle="Apply this checklist to one current PR head, not to evidence borrowed from other demos"
  :rows='[
    { label: "Authority", description: "Approved scope, event actor, and draft files match", tag: "SCOPE" },
    { label: "Behavior", description: "Relevant test or runtime proof exercises the change", tag: "PROOF" },
    { label: "Review", description: "Disposition of Copilot advice; re-review after fixes if needed", tag: "ADVICE" },
    { label: "Quality", description: "Inspect Autofix and gate; run separate security checks", tag: "RULE" },
    { label: "Head", description: "All required checks ran on the current commit", tag: "CI" },
    { label: "Human", description: "Accept residual risk or keep draft; deployment is next", tag: "DECIDES" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# How Do We Test the Bigger Idea?
<!-- SLIDE: Pilot Before Scale -->
<ThreeColumnCardSlide
  :partNumber="4"
  pillIcon="🧪"
  pillLabel="Pilot · Then Expand"
  title="Pilot the Connected Loop Before Expanding It"
  :columns='[
    { icon: "1️⃣", title: "Authorize", items: ["Choose two or three bounded issues", "Approve runnable plans and owners", "Record what the agent may change"] },
    { icon: "2️⃣", title: "Observe", items: ["Inspect each draft and current head", "Triage Copilot advice and quality findings", "Prove one rule blocks and unblocks"] },
    { icon: "3️⃣", title: "Decide", items: ["Measure stops, rework, and reviewer time", "Keep human merge authority", "Hand off deployment to its own controls"] }
  ]'
  :insight='{ icon: "✅", text: "10–15 issues is a proposed intake target, not measured throughput. Deployment and production feedback are outside this demo." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

# What You Can Do Today
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
  :today='["Choose one issue and name the approver", "Correct the plan until its check runs", "Define what a draft may change"]'
  :thisWeek='["Inspect one agent-created draft and head", "Request Copilot review and disposition", "Trial a Code Quality rule in evaluate mode"]'
  :thisMonth='["Activate a tested gate and prove block → pass", "Inspect one Autofix before accepting it", "Define the post-merge deployment handoff"]'
  footer="Automate the offer, advice, and enforceable bar; a human owns merge, then delivery continues."
/>

---

# References
<!-- SLIDE: References -->
<ReferencesSlide
  :groups='[
    { title: "Observed FanHub Artifacts", color: "cyan", items: [
      { href: "https://github.com/MSBart2/FanHub/issues/110", label: "Issue #110 · plan and approval", description: "Corrected build command and two-rule layout scope" },
      { href: "https://github.com/MSBart2/FanHub/pull/193", label: "PR #193 · agentic draft", description: "Two-file layout fix, build, and browser comparison" },
      { href: "https://github.com/MSBart2/FanHub/pull/198#pullrequestreview-5446574440", label: "PR #198 · Copilot review", description: "Four green tests missed the inert browser Retry" },
      { href: "https://github.com/MSBart2/FanHub/pull/199", label: "PR #199 · coverage gate", description: "26.7% blocked, then 30% after manually added tests" },
      { href: "https://github.com/MSBart2/FanHub/pull/201#discussion_r4220907309", label: "PR #201 · Code Quality Autofix", description: "Generic catch finding, generated TryParse, author-accepted commit" }
    ] },
    { title: "Workflow and Signal Boundaries", color: "purple", items: [
      { href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "About Code Quality", description: "Default-branch and PR analysis have distinct scopes" },
      { href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review", label: "Configure Copilot review", description: "Draft and new-push settings" },
      { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality", label: "Enable Code Quality", description: "Initial baseline scan and later activity" },
      { href: "https://docs.github.com/en/code-security/how-tos/maintain-quality-code/restrict-code-coverage", label: "Restrict code coverage", description: "Configured threshold plus required upload check" },
      { href: "https://github.github.com/gh-aw/reference/safe-outputs/", label: "Agentic safe outputs", description: "Bound the draft PR and advisory review" }
    ] }
  ]'
/>

---

# Thank You
<!-- SLIDE: Thank You -->
<ThankYouSlide
  title="From Issue to Merge Decision"
  subtitle="Four separate drafts make the boundaries visible"
  :cards='[
    { value: "#193", detail: "Human approval → agent-created draft" },
    { value: "#198", detail: "Copilot advice → tested human correction" },
    { value: "#199 / #201", detail: "Automatic gate / human-accepted Autofix" }
  ]'
  prompt="Who accepts your next AI-created PR, and what happens after merge?"
/>
