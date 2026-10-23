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
updated: 2026-10-23
---

<script setup>
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'
import PrFlowLaneSlide from './components/PrFlowLaneSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="Copilot on GitHub"
  subtitle="Produce, Reason, Measure"
  tagline="Three agents, one pull request. A person ends the loop."
  meta="Agents on GitHub · CopilotTraining Tech Talk · 60 min"
/>

<!--
Three Copilot agents are built into the pull request. One produces the change, one reasons about its intent, one measures it against rules.
By the end, the audience can read any pull request as a sequence of events: who started each step, which agent woke, which commit it saw, and who ended the loop.
-->

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="Copilot can write, review, and check my code. What's automatic, and where does my judgment come in?"
  subtext="You assign an issue and the cloud agent writes the change. Every push then wakes code review and Code Quality on their own."
  highlight="You steer the rework, and you decide when it ships."
  :cards='[
    { icon: "🛠️", title: "Developers", description: "Delegate a bounded issue and read the draft PR it returns" },
    { icon: "👥", title: "Team leads", description: "Decide which evidence is enough to merge agent-produced work" },
    { icon: "⚙️", title: "Platform engineers", description: "Configure triggers, rulesets, and cost one setting at a time" },
    { title: "~5 s", description: "Code Quality start after each push on FanHub #221 (one observed run)" },
    { title: "~2 min", description: "Code review followed each push on the same run" },
    { title: "8 of 8 pushes", description: "Reviewed with Review new pushes on, including empty plan commits" }
  ]'
/>

<!--
Top row: three roles that meet on every pull request. The same person may hold more than one.
Bottom row: three timings from one observed run on FanHub #221, 2026-10-23. They show the rhythm, measurement first and reasoning about two minutes later, rather than a benchmark.
-->

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🛠️", title: "1. Produce: Copilot Cloud Agent", subtitle: "Draft PRs from issues", blurb: "Turns a well-written issue into a draft PR with tests", slide: 5 },
    { icon: "🔎", title: "2. Reason: Copilot Code Review", subtitle: "Intent on every push", blurb: "Reads the change for intent and catches what passing tests miss", slide: 12 },
    { icon: "📏", title: "3. Measure: GitHub Code Quality", subtitle: "Fixed rules on every commit", blurb: "Scores every new commit against fixed rules and thresholds and can block a merge", slide: 19 },
    { icon: "🔗", title: "4. Wire It Together", subtitle: "One issue, start to finish", blurb: "One issue start to finish: who fires on which event, how rework loops, who ends it", slide: 25 }
  ]'
/>

<!--
Arc: Produce → Reason → Measure → Wire It Together.
Parts 1 to 3 light one row of the swimlane at a time and teach each agent alone: job and wake event, setup and context, use, troubleshooting, authority. Part 4 is the payoff: one issue on the same swimlane, step by step.
-->

---

<!-- SLIDE: Cold Open The Whole Flow -->
# Cold Open The Whole Flow
<PrFlowLaneSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="The whole flow"
  title="Every push reopens the question; a person ends the loop."
  subtitle="A person assigns the issue, the cloud agent pushes, code review and Code Quality wake on each push, and the flow pauses until a person decides."
  variant="full"
  footnote="Ask of any pull request: which event woke which agent, and which commit did it see?"
  :progressDots='{ current: 1, total: 1, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
This is the whole talk on one page. Rows are who acts: a person, the cloud agent, code review, Code Quality. Columns are generic pull request events.
👤 means a person invoked it, ⚡ means an event fired it, ⏸ means the flow waits for a person. 🛑 can gate a merge, 🚫 cannot.
The three agents respond to events. Push, and both review and measurement wake again. That loop runs until a person decides.
-->

---

<!-- SLIDE: Part 1 Produce -->
# Part 1 Produce
<SectionOpenerSlide
  :partNumber="1"
  title="Produce: Copilot Cloud Agent"
  subtitle="How a person wakes the cloud agent, what it needs, how to read its draft, and where its authority ends"
  :cards='[
    { icon: "✅", title: "Good fits", blurb: "Bugs with a known location, tests, docs, a11y, tech debt" },
    { icon: "👤", title: "Keep human-led", blurb: "Cross-repo refactors, deep domain logic, security-critical" },
    { icon: "📦", title: "Returns", blurb: "Commits on a copilot/ branch, PR description, session log" }
  ]'
  :terminal='{ context: "Value: turns a well-written issue into a draft PR with tests", detail: "while you work on something else" }'
/>

<!--
Copilot cloud agent was formerly called Copilot coding agent.
Good fits share a known location, a testable symptom, and a clear acceptance check. Broad refactors, production-critical and security-sensitive changes, and ambiguous requests stay human-led.
-->

---

<!-- SLIDE: Produce Row -->
# Produce Row
<PrFlowLaneSlide
  :partNumber="1"
  pillIcon="🛠️"
  pillLabel="Produce · The cloud agent row"
  title="The cloud agent produces: a bounded issue in, a draft pull request out"
  subtitle="It runs in an ephemeral environment powered by GitHub Actions, runs your build and tests there, and hands back commits you can inspect."
  variant="full"
  :focusRows='["agent"]'
  footnote="A person wakes it; it pushes to its own branch; it cannot approve or merge."
  :progressDots='{ current: 1, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Light the Produce row only. Every cell here is automatic once a person starts it: a session, a draft with a plan commit, the change, then rework.
The Decide column is the boundary: the agent cannot approve or merge its own work.
-->

---

<!-- SLIDE: Produce Triggers -->
# Produce Triggers
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="⚡"
  pillLabel="Produce · Triggers"
  title="A person wakes the cloud agent three ways; each one ends in a push"
  subtitle="👤 a person invokes it, then ⚡ the agent acts on its own branch"
  :rows='[
    { label: "Assign issue", description: "Draft PR in seconds with an empty plan commit; the change follows", tag: "👤 → ⚡" },
    { label: "Agents tab", description: "Agent proposes a plan; a person corrects it, then asks for a PR", tag: "👤 → ⚡" },
    { label: "Handoff", description: "@copilot · Fix with Copilot (public preview) · @Copilot on a finding", tag: "👤 → ⚡" },
    { label: "Who invokes", description: "Write access only; comments from others never reach the agent", tag: "write access" }
  ]'
  footnote="In practice · FanHub #221 · one observed run, 2026-10-23: #159 assigned 15:30:24 → draft #221 with plan commit e046f52 at 15:30:31 → fix 6159164 at 15:37:13"
  :progressDots='{ current: 2, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Every trigger starts with a person. The agent then pushes a plan commit and the work to the same branch.
Fix with Copilot is public preview. The @Copilot handoff from a Code Quality finding is GA.
The #221 timings are one observed run on 2026-10-23, not a service level.
-->

---

<!-- SLIDE: Produce Setup and Context -->
# Produce Setup and Context
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📝"
  pillLabel="Produce · Setup and context"
  title="The issue is the prompt; setup sets what the agent can reach"
  codePosition="left"
  :code='{ language: "markdown", filename: "delegated issue template", content: "## Problem\nWhat is wrong, with file and line pointers.\n\n## Acceptance criteria\n- [ ] Observable behavior that proves the fix\n- [ ] Tests to add, and the command that must pass\n\n## Scope\nIn scope: the files and the size of change you expect.\nOut of scope: neighboring problems with their own issues." }'
  :features='[
    { icon: "🧪", title: "In practice · FanHub #159", description: "One sentence became five leaking handlers, the response shape to keep, tests, and scope limits" },
    { icon: "⚙️", title: "copilot-setup-steps.yml", description: "Installs dependencies first; job copilot-setup-steps, on the default branch" },
    { icon: "🔥", title: "Firewall + MCP", description: "Firewall on with a registry allowlist; GitHub and Playwright MCP on by default" },
    { icon: "🧭", title: "Instructions + custom agents", description: "copilot-instructions.md, *.instructions.md with applyTo, AGENTS.md, .github/agents/*.agent.md" }
  ]'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
GitHub's best-results guide treats the issue as the prompt. We want an issue the agent can finish and a reviewer can check, so every delegated issue carries problem, acceptance criteria, and scope.
The FanHub #159 rewrite is the proof: the original was one sentence. The rewrite named the five leaking handlers, the response shape to preserve, the tests to add, and what stayed out of scope.
Setup is the environment: setup steps, firewall, MCP. Code review shares the MCP configuration.
-->

---

<!-- SLIDE: Produce Use -->
# Produce Use
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🔍"
  pillLabel="Produce · Use it"
  title="Before reading the diff, the PR owner runs a six-question acceptance check"
  :rows='[
    { label: "Plan", description: "Does the plan match the issue&#39;s intent?", tag: "PR description" },
    { label: "Commit", description: "Which commit holds the implementation? The first is the empty plan", tag: "commit list" },
    { label: "Scope", description: "Did anything change outside the expected paths?", tag: "files changed" },
    { label: "Tests", description: "Which tests were added, and has anyone but the agent run them?", tag: "session log" },
    { label: "Workflows", description: "Which workflow runs still wait for Approve and run?", tag: "checks" },
    { label: "Gaps", description: "What evidence is still absent?", tag: "decision record" }
  ]'
  footnote="Steer with @copilot comments: each becomes a plan commit plus a rework push. FanHub #210, one observed run: draft 12 s after assignment; two-file fix with eight tests 3.5 min later."
  :progressDots='{ current: 4, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
The PR owner answers these six before reading code. The answers tell you which commit to read and what evidence is still missing.
Steer by comment rather than by rewriting the branch. Every @copilot request becomes another push, and every push wakes review and measurement.
-->

---

<!-- SLIDE: Produce Troubleshoot -->
# Produce Troubleshoot
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🧰"
  pillLabel="Produce · Troubleshoot"
  title="Read the signal, name the cause, make the move"
  :cards='[
    { icon: "📭", title: "Empty first commit", description: "Normal: the plan commit lands first. Wait for the implementation push; read the PR description" },
    { icon: "📂", title: "Unexpected files", description: "A setup step or tool side effect. Comment, or let the next push correct it; check the final diff" },
    { icon: "📦", title: "Out-of-scope change", description: "Tool defaults like go mod tidy or gofmt. Ask the agent to justify or revert it in the PR" },
    { icon: "🧱", title: "Cannot build or reach a registry", description: "Missing setup step or allowlist entry. Fix copilot-setup-steps.yml; read the session log" }
  ]'
  :insight='{ icon: "", text: "🧪 FanHub #221, one observed run: review flagged lockfile-only 7686606 and the next push reverted it. Asked about x/crypto, the agent kept it: Gin 1.10.0 requires it." }'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Each row: signal, likely cause, the move.
The #221 footnote shows two of them on one run: a lockfile-only commit the agent corrected on its own after code review flagged it, and a dependency bump the agent justified in the PR description when a person asked.
-->

---

<!-- SLIDE: Produce Authority -->
# Produce Authority
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔐"
  pillLabel="Produce · Authority"
  title="The platform fixes the cloud agent's authority: it drafts; a person decides"
  :left='{ header: "The cloud agent can", icon: "🛠️", items: ["Push only to its own copilot/ branch, subject to branch protection", "Run your build and tests in its Actions-powered environment", "Act on @copilot requests from users with write access", "Record its reasoning in the PR description"] }'
  :right='{ header: "A person keeps", icon: "👤", items: ["Marking the pull request ready for review", "Approval; the person who requested the work cannot approve it either", "Merge", "Approve and run on workflow runs, by default"] }'
  :insight='{ icon: "🧭", text: "The team decides what to permit the agent to produce; a person approves and merges every result." }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
This boundary is platform-fixed. No setting lets the cloud agent mark its PR ready, approve it, or merge it.
The requester cannot approve the agent's PR either, which keeps a second person in the loop. Workflow runs on its PRs wait for Approve and run by default.
-->

---

<!-- SLIDE: Part 2 Reason -->
# Part 2 Reason
<SectionOpenerSlide
  :partNumber="2"
  title="Reason: Copilot Code Review"
  subtitle="When code review wakes, what it reads, how to use its assessment, and when its approval counts"
  :cards='[
    { icon: "🧠", title: "Reads for intent", blurb: "Unreachable states, missing wiring, scope drift" },
    { icon: "🟢", title: "Returns an assessment", blurb: "🟢 or 🟡, inline comments, an open-issues list" },
    { icon: "⚖️", title: "Advisory by default", blurb: "Approvals count only when a team opts in (preview)" }
  ]'
  :terminal='{ context: "Value: reads the change for intent", detail: "catches what passing tests miss" }'
/>

<!--
Code review reads the diff with repository context and reasons about intent: changes that do not match the issue, unreachable states, missing wiring.
The assessment is 🟢 approval recommended or 🟡 changes recommended, plus inline comments and a running list of open issues.
-->

---

<!-- SLIDE: Reason Row -->
# Reason Row
<PrFlowLaneSlide
  :partNumber="2"
  pillIcon="🔎"
  pillLabel="Reason · The code review row"
  title="Code review reasons: it reads each change for intent and returns an assessment"
  subtitle="It wakes on the opened PR when a ruleset enables it, and on every new push only when Review new pushes is on."
  variant="full"
  :focusRows='["review"]'
  footnote="Advisory until a team opts in to Copilot approvals (public preview); those approvals are dismissed on each new push."
  :progressDots='{ current: 1, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Light the Reason row. Two of its three cells carry a condition: the opened PR needs a ruleset or user setting, and each push needs Review new pushes.
That condition is the single most important setting for delegated work.
-->

---

<!-- SLIDE: Reason Triggers -->
# Reason Triggers
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="⚡"
  pillLabel="Reason · Triggers"
  title="Without Review new pushes, the first automatic review is the only one"
  subtitle="When several sources apply, Copilot still posts one review; user settings cannot disable push or draft reviews a ruleset enabled"
  :rows='[
    { label: "Request", description: "A person picks Copilot in Reviewers; it reviews the current head", tag: "👤 any time" },
    { label: "PR opened", description: "A repo or org ruleset, or the author user setting, turns it on", tag: "⚡ ruleset" },
    { label: "New push", description: "Only when Review new pushes is on; Copilot approvals are dismissed", tag: "⚡ if enabled" },
    { label: "Draft PR", description: "Reviews drafts only when Review draft pull requests is on", tag: "⚡ if enabled" }
  ]'
  footnote="In practice · FanHub #221 · one observed run, 2026-10-23: with Review new pushes on, code review ran on all eight pushes, about two minutes after each, including empty plan commits"
  :progressDots='{ current: 2, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
The headline is the setting to remember. The cloud agent opens a PR with an empty plan commit, so an automatic review on open often sees no code. Review new pushes is what brings the reviewer back for the real change.
-->

---

<!-- SLIDE: Reason Setup and Context -->
# Reason Setup and Context
<FourCardGridSlide
  :partNumber="2"
  pillIcon="⚙️"
  pillLabel="Reason · Setup and context"
  title="A ruleset decides when review runs; instruction files decide what it checks"
  :cards='[
    { icon: "📜", title: "Automatic review ruleset", description: "Repository or org ruleset; choose Review new pushes and Review draft pull requests explicitly" },
    { icon: "💳", title: "Review effort", description: "Lite ≈ $0.05–$1 of AI credits per review; Balanced ≈ $0.25–$5. Private repos add Actions minutes" },
    { icon: "🔐", title: "Who can request", description: "“Only allow … authorized users” limits who starts a review the organization pays for" },
    { icon: "🧭", title: "Shared instructions", description: "Reads the agent instruction files from the head branch; excludeAgent keeps a rule from one agent" }
  ]'
  :insight='{ icon: "", text: "🎯 Path-scoped *.instructions.md with applyTo adds review rules for one area, such as authentication handlers." }'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
excludeAgent: "code-review" or "coding-agent" in an instruction file's frontmatter lets a test-writing convention guide the producer without joining the reviewer's checklist.
Reviews run on standard GitHub-hosted runners by default; larger or self-hosted runners are options.
-->

---

<!-- SLIDE: Reason Use and FanHub 198 -->
# Reason Use and FanHub 198
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🔍"
  pillLabel="Reason · Use it"
  title="Read which commit the review saw, then run what it left unexecuted"
  :left='{ header: "Five moves for the PR owner", icon: "🔎", items: [{ title: "Check the commit", detail: "Every review names the commit it analyzed" }, { title: "Read assessment + open issues", detail: "The list carries unresolved threads from earlier pushes" }, { title: "Send fixes back", detail: "Fix with Copilot (public preview) or a plain @copilot comment" }, { title: "Close threads deliberately", detail: "Resolve, or mark Won&#39;t fix or Incorrect with a reason" }, { title: "Run the tests", detail: "Every assessment states whether tests ran" }] }'
  :right='{ header: "In practice · FanHub #198", icon: "🧪", items: [{ title: "Test runner: 4 of 4 passed, build green", detail: "The status before review" }, { title: "Review: Retry had no interactive render mode", detail: "Its click handler never wired up" }, { title: "Review: the error cleared too early", detail: "The retrying state was unreachable" }, { title: "Author added a render-mode test", detail: "It failed against the original draft, then 6 of 6 passed" }] }'
  :progressDots='{ current: 4, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
This is Part 2's proof. Four passing tests and a green build, and the Retry button still did nothing in the browser. Code review reasoned about intent and found the missing wiring.
Note the separation: the test-runner status is one fact, the behavior the review found is another. The author turned the review into a failing test, then made it pass.
-->

---

<!-- SLIDE: Reason Troubleshoot -->
# Reason Troubleshoot
<FourCardGridSlide
  :partNumber="2"
  pillIcon="🧰"
  pillLabel="Reason · Troubleshoot"
  title="Each strange review signal points to one setting or one thread"
  :cards='[
    { icon: "📭", title: "“Wasn&#39;t able to review any files”", description: "The review saw a plan-only commit. Turn on Review new pushes, or re-request after the real push" },
    { icon: "🟢", title: "🟢 with “1 open issue”", description: "An outdated thread from an earlier commit is unresolved. Resolve it if the newer commit fixed it" },
    { icon: "🔕", title: "No review after a fix", description: "Review new pushes is off. Re-request Copilot from the Reviewers sidebar" },
    { icon: "🗂️", title: "Comments the team skips", description: "Instructions missing or too broad. Add path-scoped rules; split agents with excludeAgent" }
  ]'
  :insight='{ icon: "", text: "🧪 #210: Review new pushes off, so the only automatic review saw the plan commit. #221: a 🟢 with one open issue cleared once a person resolved the lockfile thread." }'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
The first three signals all trace back to event order: which commit the review saw, and whether a later push brought it back.
The fourth is context: the reviewer reads the same instruction files as the cloud agent, so scope them.
-->

---

<!-- SLIDE: Reason Authority -->
# Reason Authority
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🔐"
  pillLabel="Reason · Authority"
  title="Code review advises until a team opts in to Copilot approvals (public preview)"
  :left='{ header: "Default: advisory", icon: "💬", items: ["An assessment, inline comments, and an open-issues list", "No Copilot approval counts toward required reviews", "The PR owner decides what to act on", "The reviewer decides what evidence is enough"] }'
  :right='{ header: "Opt-in: Copilot approvals (public preview)", icon: "✅", items: ["Admins can opt in since September 2026", "Approvals count toward required reviews", "Dismissed on new pushes, like a human&#39;s", "Turn on only for paths where a reasoning review is the bar the team holds"] }'
  :insight='{ icon: "👤", text: "Keep at least one human approval wherever behavior, security, or data is at stake." }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Copilot approvals are public preview. They are the only way code review's result counts as authority, and the team turns them on path by path.
-->

---

<!-- SLIDE: Part 3 Measure -->
# Part 3 Measure
<SectionOpenerSlide
  :partNumber="3"
  title="Measure: GitHub Code Quality"
  subtitle="Standard and AI findings, Evaluate before Active, and the one agent whose result can block a merge"
  :cards='[
    { icon: "📏", title: "Fixed rules", blurb: "CodeQL quality rules plus team thresholds" },
    { icon: "📊", title: "Two ratings", blurb: "Reliability and Maintainability, Excellent to Poor" },
    { icon: "🛑", title: "Can gate a merge", blurb: "Standard findings, at the threshold the team sets" }
  ]'
  :terminal='{ context: "Value: scores every new commit against fixed rules and thresholds", detail: "GA 2026-07-20 for GitHub Enterprise Cloud and Team" }'
/>

<!--
Code Quality became generally available on 2026-07-20. It measures each commit against CodeQL quality rules and team thresholds.
-->

---

<!-- SLIDE: Measure Row -->
# Measure Row
<PrFlowLaneSlide
  :partNumber="3"
  pillIcon="📏"
  pillLabel="Measure · The Code Quality row"
  title="Code Quality measures every push within seconds, before anyone clicks Approve and run"
  subtitle="⚡ Every push to a PR runs the CodeQL - Code Quality check; findings arrive inline from github-code-quality[bot]. Default-branch pushes feed the dashboard."
  variant="full"
  :focusRows='["quality"]'
  footnote="FanHub #221 · one observed run, 2026-10-23: started about 5 s after every push, including empty plan commits; the one finding appeared about 100 s after its push."
  :progressDots='{ current: 1, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Light the Measure row. Every cell is automatic, and none waits for Approve and run. That makes Code Quality the first signal on every push.
-->

---

<!-- SLIDE: Measure Standard vs AI Findings -->
# Measure Standard vs AI Findings
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="⚖️"
  pillLabel="Measure · Two kinds of findings"
  title="Standard findings can block a merge; AI findings (public preview) stay advisory"
  :left='{ header: "Standard findings · GA", icon: "📏", items: [{ title: "Source", detail: "CodeQL quality rules" }, { title: "Reproducibility", detail: "Stable for the same code, rules, and tool version" }, { title: "Where", detail: "Pull requests and the default branch" }, { title: "Gate", detail: "Can block a merge by severity threshold" }] }'
  :right='{ header: "AI findings · public preview", icon: "🤖", items: [{ title: "Source", detail: "Model review of recently changed files" }, { title: "Reproducibility", detail: "Model-mediated" }, { title: "Where", detail: "Default branch only" }, { title: "Gate", detail: "Advisory; cannot block a merge" }] }'
  :insight='{ icon: "🛑", text: "Authority: the only agent whose result can block a merge on its own. Security review and secret scanning stay separate." }'
  :progressDots='{ current: 2, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Reproducibility is what earns the gate: the same code, rules, and tool version give the same standard findings. AI findings are model-mediated, default branch only, and public preview.
-->

---

<!-- SLIDE: Measure Setup -->
# Measure Setup
<MaturityJourneyRoadmapSlide
  :partNumber="3"
  pillIcon="⚙️"
  pillLabel="Measure · Setup"
  title="Start every rule in Evaluate; promote to Active once the team trusts the signal"
  subtitle="The platform owner sets the threshold; the ruleset mode decides whether a finding blocks"
  :stages='[
    { label: "1", name: "Enable", description: "Turn on Code Quality; each language uses its own CodeQL query list", icon: "🔌" },
    { label: "2", name: "Ruleset", description: "Set a severity threshold and an optional coverage minimum fed by an upload such as Cobertura", icon: "📐" },
    { label: "3", name: "Evaluate", description: "Reports what would have blocked while merges go through", icon: "🔍" },
    { label: "4", name: "Active", description: "Blocks merges at the severity and coverage the team accepts", icon: "🛑", isTarget: true }
  ]'
  caption="Rollback: move the rule back to Evaluate."
  :progressDots='{ current: 3, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Each rule in the query list has a category and severity. Evaluate mode is the observation period: the team sees what would have blocked before anything does.
-->

---

<!-- SLIDE: Measure Use and FanHub Proof -->
# Measure Use and FanHub Proof
<HeroStatSlide
  :partNumber="3"
  pillIcon="🔧"
  pillLabel="Measure · Use it"
  title="Read the finding, then commit the fix, hand it off, or dismiss it with a reason"
  subtitle="Two FanHub drill-downs: a gate that blocked and an Autofix a person committed"
  :hero='{ value: "30%", label: "FanHub #199: a 27% coverage minimum blocked the 26.7% head; two more tests reached 30% and the gate turned green", source: "FanHub #199 coverage gate demonstration" }'
  :supporting='[
    { icon: "👤", title: "Commit suggestions", description: "#201: a catch around int.Parse became int.TryParse; the author committed 0b33cda; checks passed" },
    { icon: "⚡", title: "@Copilot handoff (GA)", description: "Reply on a finding, or bulk-assign from the dashboard; the cloud agent pushes the fix" },
    { icon: "🔍", title: "Read the inline finding", description: "Each names the rule, the category, and the line" },
    { icon: "🚫", title: "Dismiss with a reason", description: "When the rule does not apply to intentional code" }
  ]'
  :insight='{ icon: "🔁", text: "Every fix is a new push, so Code Quality and code review both run again on it." }'
  :progressDots='{ current: 4, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Part 3's proof is the enforceable gate. #199 shows the ruleset doing what review cannot: blocking at 26.7%, passing at 30%.
#201 shows the person path: the author read the Autofix changeset and clicked Commit suggestions, creating 0b33cda.
-->

---

<!-- SLIDE: Measure Troubleshoot -->
# Measure Troubleshoot
<FourCardGridSlide
  :partNumber="3"
  pillIcon="🧰"
  pillLabel="Measure · Troubleshoot"
  title="A clean run says the rules found nothing; behavior still needs tests and review"
  :cards='[
    { icon: "✅", title: "No findings", description: "Nothing the rules recognize. One kind of evidence; still run the tests and read the review" },
    { icon: "🔀", title: "Two CodeQL checks", description: "CodeQL (security) and CodeQL - Code Quality are separate analyses; read each for its purpose" },
    { icon: "🛑", title: "Unexpected block", description: "A rule moved to Active, or coverage was not uploaded. Check ruleset mode and the upload step" },
    { icon: "🚫", title: "Finding does not apply", description: "The rule matched intentional code. Dismiss it with a reason" }
  ]'
  :insight='{ icon: "", text: "⚖️ Standard findings gate at the threshold the team set; AI findings stay advisory." }'
  :progressDots='{ current: 5, total: 5, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Rules cover specified patterns. A clean run is real evidence about those patterns; executed tests and a reviewer's judgment cover behavior.
-->

---

<!-- SLIDE: Part 4 Wire It Together -->
# Part 4 Wire It Together
<SectionOpenerSlide
  :partNumber="4"
  title="Wire It Together"
  subtitle="One issue through all three agents: who fires on which event, how rework loops, and who ends it"
  :cards='[
    { icon: "🔁", title: "Every push reopens it", blurb: "Agent pushes and person pushes wake both agents" },
    { icon: "🧵", title: "Threads carry state", blurb: "An unresolved thread rides along until resolved" },
    { icon: "👤", title: "A person ends the loop", blurb: "The cloud agent cannot approve or merge" }
  ]'
  :terminal='{ context: "FanHub #159 → draft #221 · Review new pushes on · eight pushes", detail: "One observed run, 2026-10-23 · one step STAGED by a person" }'
/>

<!--
This is the payoff. Each step slide puts the general rule in the headline and the #221 event in the In practice panel, with time and SHA.
One step was staged: a person deliberately introduced a quality issue to guarantee a Code Quality finding. It is labeled as staged on its slide.
-->

---

<!-- SLIDE: Step 1 Assign and Plan Commit -->
# Step 1 Assign and Plan Commit
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 1"
  title="A person assigns a delegable issue; the agent opens a draft with a plan commit"
  variant="strip"
  :focusColumns='["assign", "open"]'
  :focusRows='["person", "agent"]'
  rule="A person writes a delegable issue and assigns it; the agent opens a draft with an empty plan commit"
  ruleDetail="The plan commit marks the start of the session. The change arrives as later pushes."
  invoked="human"
  actor="Requester"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:30:24", what: "#159 rewritten with scope and acceptance criteria, then assigned" }, { when: "15:30:31", what: "Draft #221 opens with plan commit e046f52" }] }'
  :progressDots='{ current: 1, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
The requester owns intent. Seven seconds after assignment, the cloud agent had a draft open. Its first commit holds no code.
-->

---

<!-- SLIDE: Step 2 Measure and Review the Plan Commit -->
# Step 2 Measure and Review the Plan Commit
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 2"
  title="Measurement starts in seconds; review runs on the opened PR, even with only a plan"
  variant="strip"
  :focusColumns='["open"]'
  :focusRows='["review", "quality"]'
  rule="Measurement is immediate; reasoning follows"
  ruleDetail="Code Quality scans every push within seconds. Automatic review fires on the opened PR, so a plan-only commit gets a review with nothing to read."
  invoked="auto"
  actor="Code Quality + Code review"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:30:36", what: "Code Quality scans e046f52" }, { when: "15:30:42", what: "Review: “Copilot wasn&#39;t able to review any files”" }] }'
  :progressDots='{ current: 2, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Fact one from the run: measurement is immediate, reasoning follows. This is why Review new pushes matters. Without it, this empty review would be the only automatic one, as it was on #210.
-->

---

<!-- SLIDE: Step 3 Lockfile Push -->
# Step 3 Lockfile Push
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 3"
  title="The agent pushes; review and measurement run again on that commit"
  variant="strip"
  :focusColumns='["push"]'
  rule="Every agent push wakes both agents on that exact commit"
  ruleDetail="Read which commit each review analyzed. Here the review recommended changes on a commit that touched only a frontend lockfile."
  invoked="auto"
  actor="Code review"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:32:08", what: "7686606 changes only a frontend lockfile" }, { when: "15:34:31", what: "🟡 Changes recommended" }] }'
  :progressDots='{ current: 3, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Code review followed the push by about two minutes. The 🟡 named the lockfile commit as out of scope.
-->

---

<!-- SLIDE: Step 4 Self-Correction and Stale Thread -->
# Step 4 Self-Correction and Stale Thread
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 4"
  title="The agent's next push corrects course; a 🟢 can still carry an open issue"
  variant="strip"
  :focusColumns='["push"]'
  rule="Threads carry state across pushes"
  ruleDetail="An outdated, unresolved thread stays on the open-issues list until a person resolves it, even after the commit that fixed it."
  invoked="auto"
  actor="Cloud agent"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:37:13", what: "6159164: fix + tests; lockfile reverted with no person involved" }, { when: "same push", what: "Code Quality: no findings" }, { when: "15:39:35", what: "🟢 with “1 open issue”: the outdated lockfile thread" }] }'
  :progressDots='{ current: 4, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Fact four from the run: threads carry state. The cloud agent read the review and fixed the lockfile on its own. The 🟢 still listed one open issue because the old thread was unresolved.
-->

---

<!-- SLIDE: Step 5 Person Resolves and Asks -->
# Step 5 Person Resolves and Asks
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 5"
  title="A person resolves the stale thread and asks the agent for rework"
  variant="strip"
  :focusColumns='["respond"]'
  :focusRows='["person"]'
  rule="A person resolves stale threads and steers with a comment"
  ruleDetail="Resolve a thread when a newer commit fixed it. Ask for rework with @copilot rather than by rewriting the branch."
  invoked="human"
  actor="PR owner"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:46:05", what: "PR owner resolves the lockfile thread" }, { when: "15:46:06", what: "@copilot: add a shared helper and justify the x/crypto bump" }] }'
  :progressDots='{ current: 5, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
The PR owner holds the respond column. Two actions, one second apart: close what is fixed, ask for what is missing.
-->

---

<!-- SLIDE: Step 6 Rework Push -->
# Step 6 Rework Push
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 6"
  title="The agent pushes rework; review and measurement run again"
  variant="strip"
  :focusColumns='["rework"]'
  rule="Every push reopens the question"
  ruleDetail="The rework push wakes both agents again. The agent kept the x/crypto bump because Gin 1.10.0 requires it, and recorded why in the PR description."
  invoked="auto"
  actor="Cloud agent"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:49:46", what: "5444980 adds the shared helper" }, { when: "15:52:18", what: "🟢 “No open issues”, “1 resolved since last review”" }] }'
  :progressDots='{ current: 6, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Fact two from the run: every push reopens the question. Rework is just another push, so both agents run again. The open-issues list now credits the resolved thread.
-->

---

<!-- SLIDE: Step 7 Staged Quality Issue -->
# Step 7 Staged Quality Issue
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 7"
  title="A person's push wakes both agents too, and they see the same line differently"
  variant="strip"
  :focusColumns='["respond", "rework"]'
  :focusRows='["person", "review", "quality"]'
  rule="The two agents see the same line differently"
  ruleDetail="Code Quality names the rule and offers a changeset; code review explains the cost. This commit was a STAGED quality issue, introduced deliberately by a person."
  invoked="human"
  actor="PR owner"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:54:34", what: "8a752d2 STAGED: a nil guard whose result is immediately overwritten" }, { when: "15:56:18", what: "Code Quality: “Useless assignment to local variable” + Autofix (~100 s)" }, { when: "15:57:20", what: "Review: “Optional cleanup … Error() called twice”" }] }'
  :progressDots='{ current: 7, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Fact three from the run. The staged commit guaranteed a Code Quality finding; it is a quality issue a person introduced on purpose.
Code Quality named a rule and offered an Autofix about 100 seconds after the push. Code review, a minute later, explained the cost in its own words.
-->

---

<!-- SLIDE: Step 8 Handoff and Final Green -->
# Step 8 Handoff and Final Green
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🔗"
  pillLabel="Wire It Together · Step 8"
  title="A person hands the finding to the agent; one fix clears both agents' threads"
  variant="strip"
  :focusColumns='["respond", "rework"]'
  rule="A person hands a finding to the agent; both agents run again on the fix"
  ruleDetail="An @Copilot reply on a Code Quality finding (GA) becomes a new push. The agent ran go test in its own session; every review stated tests were not executed."
  invoked="human"
  actor="PR owner"
  :practice='{ label: "In practice · FanHub #221 · one observed run, 2026-10-23", lines: [{ when: "15:58:28", what: "@Copilot reply on the Code Quality finding" }, { when: "16:00:53", what: "69aa00f removes the redundant assignment" }, { when: "16:01:56", what: "6a512c1 simplifies internal error logging" }, { when: "16:06:08", what: "🟢 “No open issues”; all three threads resolved" }] }'
  :progressDots='{ current: 8, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
One reply cleared both the Code Quality thread and the review thread. Every thread on the PR is now resolved, and the flow waits for a person.
-->

---

<!-- SLIDE: What Ends the Loop -->
# What Ends the Loop
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🧾"
  pillLabel="Wire It Together · What ends the loop"
  title="A person ends the loop and writes the decision down"
  subtitle="The cloud agent cannot approve or merge. #221 remained a draft with no merge decision; #210 supplies the merged decision record below."
  :rows='[
    { label: "Available", description: "#210: patch + agent test runs, 🟢 assessment, clean Code Quality run", tag: "per agent" },
    { label: "Absent", description: "Every Copilot review stated tests were not executed; no browser check", tag: "named gaps" },
    { label: "Policy", description: "Rulesets, required checks, and quality gates on the final head", tag: "platform owner" },
    { label: "Judgment", description: "Maintainer ran 8 of 8 tests on 02ddaf3; recorded the absent check", tag: "reviewer" },
    { label: "Act + recover", description: "Squash-merged as 803254f; recovery: revert the squash commit", tag: "803254f" }
  ]'
  footnote="Every rework pass spends AI credits and Actions minutes; the person decides when another round stops paying for itself."
  :progressDots='{ current: 9, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Three things bound the loop: the agent cannot approve or merge, a person decides when rework stops paying, and every pass costs credits and minutes.
Be precise: #221 is the event walk-through and stayed a draft. #210 is where a maintainer made and recorded a merge decision.
Each agent's evidence answers a different question. The executed test run and the residual-risk judgment come from a person.
-->

---

<!-- SLIDE: Configure Promote and Cost -->
# Configure Promote and Cost
<MaturityJourneyRoadmapSlide
  :partNumber="4"
  pillIcon="🪜"
  pillLabel="Wire It Together · Configure and promote"
  title="Promote advice to authority one setting at a time: permit, count, enforce"
  subtitle="Five surfaces: agent context, invocation and permissions, review policy, merge evidence, economics. Each promotion gets an owner, an observation period, and a rollback."
  :stages='[
    { label: "Observe", name: "Read what returns", description: "Assign a few scoped issues · request reviews manually · enable Code Quality on one repo", icon: "👀" },
    { label: "Evaluate", name: "Automate, still advisory", description: "copilot-setup-steps + custom agents · auto-review with Review new pushes · rules in Evaluate", icon: "🔍" },
    { label: "Enforce", name: "Permit · count · enforce", description: "Agent: drafts only, platform-fixed · Copilot approvals (preview) count · Active quality rules", icon: "🛑" }
  ]'
  caption="Cost: AI Credits at $0.01 · review Lite ~$0.05–$1, Balanced ~$0.25–$5, per push · Actions minutes on private repos · Code Quality $10/active committer/month"
  :progressDots='{ current: 10, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
The ladder is uneven on purpose. The team can permit the cloud agent to produce, count a review's assessment, and enforce a quality threshold.
Recovery stays cheap at every step: revert a ruleset to Evaluate, dismiss a finding with a reason, resolve a thread as Won't fix or Incorrect, or close the draft and reassign the issue.
Cost: Copilot usage bills in AI Credits since June 2026. Review new pushes multiplies review cost by the number of pushes. Cloud agent sessions also run on Actions. Code Quality adds AI credits for AI findings and Actions minutes for CodeQL scans. Watch usage during Evaluate.
-->

---

<!-- SLIDE: Event Map Recap -->
# Event Map Recap
<PrFlowLaneSlide
  :partNumber="4"
  pillIcon="🗺️"
  pillLabel="Wire It Together · The event map"
  title="Every push reopens the question; a person ends the loop."
  subtitle="Measurement is immediate and reasoning follows · every push reopens the question · the two agents see the same line differently · threads carry state across pushes"
  variant="full"
  footnote="Four facts from one observed run on FanHub #221, 2026-10-23."
  :progressDots='{ current: 11, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Back to the cold-open map, now with every cell earned. Walk the four facts across it: the Code Quality row fires first, every push column wakes both agent rows, the respond column carries the threads, and the decide column belongs to a person.
-->

---

<!-- SLIDE: Replay Your Last Merged PR -->
# Replay Your Last Merged PR
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🎯"
  pillLabel="Wire It Together · Apply it"
  title="Replay your last merged PR against the event map"
  :left='{ header: "Replay it", icon: "🔁", items: ["For each push, list which agents ran", "Mark which steps were 👤 human-invoked", "Note which commit each review analyzed", { title: "Find the missing ⚡ step", detail: "A fix commit with no review marks the first setting to change" }] }'
  :right='{ header: "Try today", icon: "🚀", items: ["Rewrite one bug with problem, acceptance criteria, scope; assign it", "Turn on Review new pushes; read which commit each review saw", "Enable Code Quality on one repo; one rule in Evaluate", "Reply @Copilot on one finding; watch both agents run again", "Run the agent&#39;s tests yourself before trusting a 🟢"] }'
  :insight='{ icon: "🧭", text: "Where it stops fitting: scheduled judgment → GitHub Agentic Workflows; multi-step local loops → Local Agentic SDLC." }'
  :progressDots='{ current: 12, total: 12, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
The transfer exercise. Take the last PR your team merged and replay it against the map. The missing ⚡ step is the first setting to change.
When the team wants a readiness score and a maturity path for the whole delivery lifecycle, point them to the Agentic SDLC talk.
-->

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "🛠️ Cloud agent + code review", color: "cyan", items: [
        { href: "https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent", label: "About Copilot cloud agent", description: "Environment, triggers, limits" },
        { href: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results", label: "Get the best results", description: "The issue is the prompt" },
        { href: "https://docs.github.com/en/copilot/concepts/agents/code-review", label: "About Copilot code review", description: "Assessments and open issues" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review", label: "Configure automatic review", description: "Review new pushes, drafts, effort" },
        { href: "https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/", label: "Copilot approvals (preview)", description: "Changelog, 2026-09-01" }
    ] },
    { title: "📏 GitHub Code Quality", color: "indigo", items: [
        { href: "https://docs.github.com/en/code-security/concepts/code-quality/code-quality", label: "About GitHub Code Quality", description: "Standard and AI findings" },
        { href: "https://docs.github.com/en/code-security/reference/code-quality/codeql-detection", label: "CodeQL-powered analysis", description: "Query lists per language" },
        { href: "https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/", label: "Code Quality GA", description: "Changelog, 2026-07-20" },
        { href: "https://docs.github.com/en/billing/concepts/product-billing/github-code-quality", label: "Code Quality billing", description: "Per active committer" }
    ] },
    { title: "🧪 FanHub evidence", color: "purple", items: [
        { href: "https://github.com/MSBart2/FanHub/pull/221", label: "#221", description: "One issue through all three agents" },
        { href: "https://github.com/MSBart2/FanHub/pull/210", label: "#210", description: "Merged decision record" },
        { href: "https://github.com/MSBart2/FanHub/pull/198", label: "#198", description: "Review finds a browser gap" },
        { href: "https://github.com/MSBart2/FanHub/pull/199", label: "#199", description: "Coverage gate blocks, then passes" },
        { href: "https://github.com/MSBart2/FanHub/pull/201", label: "#201", description: "Autofix committed by a person" }
    ] },
    { title: "🔗 Related talks", color: "teal", items: [
        { label: "GitHub Agentic Workflows", description: "Scheduled and event-driven judgment" },
        { label: "Copilot Governance", description: "Who may promote agent authority" },
        { label: "Copilot Hooks", description: "Deterministic checks around sessions" }
    ] }
  ]'
/>

<!--
The excludeAgent changelog (2025-11-12) and the Go CodeQL query list are in the README references.
-->

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Copilot on GitHub"
  subtitle="Produce, Reason, Measure: three agents, one pull request"
  :cards='[
    { value: "~5 s → ~2 min", detail: "Code Quality, then code review, after each push (#221, one run)" },
    { value: "8 of 8", detail: "Pushes reviewed with Review new pushes on" },
    { value: "1 reply", detail: "@Copilot on one finding cleared both agents" }
  ]'
  prompt="Which step in your last merged PR had no ⚡, and who decides to turn it on?"
/>

<!--
Close on the anchor: every push reopens the question; a person ends the loop.
-->
