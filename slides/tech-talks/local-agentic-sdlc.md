---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Local Agentic SDLC
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Local Agentic SDLC
mdc: true
section: "Agents at Your Keyboard"
status: active
updated: 2026-10-22
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
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="Local Agentic SDLC"
  subtitle="A Loop with a Contract"
  tagline="Roles own the work. Tests decide done. Budgets decide when to stop. A person decides what merges."
  meta="Agents at Your Keyboard · CopilotTraining Tech Talk · 45 min"
/>

<!--
A FanHub developer has two open issues: #4 adds a character detail page, #5 adds an episode detail page. Both touch the router in App.js.
The developer wants agents to take each issue from plan to a reviewable pull request on their own machine, in parallel, without supervising every turn.
Today we follow the real run and pull out the contract that made it trustworthy.
-->

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How can a developer run plan, implement, test, review, and integrate locally with custom agents, and know when the run is done?"
  subtext="An orchestrator owns the sequence; each subagent owns one role."
  highlight="Write the loop contract first, then let evidence steer the run."
  :cards='[
    { icon: "💻", title: "Developer starting the loop", description: "Writes the contract, launches sessions, and reads the evidence" },
    { icon: "🔍", title: "Reviewer of the draft", description: "Receives an integrated pull request and owns the merge decision" },
    { icon: "🧭", title: "Team lead", description: "Owns the budget and escalation policy every run inherits" },
    { title: "2 issues → 1 draft PR", description: "FanHub #4 and #5 integrated into draft #217 (observed)" },
    { title: "96 / 96 tests", description: "Integrated suite after a reviewer-driven fix (observed)" },
    { title: "≈380 AI credits", description: "One observed run across four sessions; no manual baseline" }
  ]'
/>

<!--
Three roles care about this loop. The developer sets it up and runs it. The reviewer receives the result. The team lead decides how much a run may spend and when it escalates.
Bottom row: every number is from the FanHub run on 2026-10-22 with Copilot CLI 1.0.100. The credits figure is one observed run; developer time and a manual baseline were not measured, so treat it as a data point.
-->

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "📜", title: "Write the Contract", subtitle: "Roles, done, budget, merge owner", blurb: "A plan with risks before code and a split test with named seams", slide: 5 },
    { icon: "🧩", title: "Build the Crew", subtitle: "Orchestrator plus four role agents", blurb: "Boundaries that held, one worktree per workstream", slide: 9 },
    { icon: "🧪", title: "Evidence Decides", subtitle: "Tests steer; the Stop hook backs them up", blurb: "Predicted risk, routed failure, staged backstop, budget stop", slide: 14 },
    { icon: "🤝", title: "Hand It Off", subtitle: "Integration record and draft PR", blurb: "A reviewer catch after merge, and what the reviewer receives", slide: 21 }
  ]'
/>

<!--
The arc: write the contract, build the crew that enforces it, watch evidence steer the run, then hand an integrated draft to a person.
Part 3 is the heart of the talk.
-->

---

<!-- SLIDE: Cold Open — The Run Ledger -->
# Cold Open — The Run Ledger
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🎬"
  pillLabel="Cold Open: Real Run"
  title="Four CLI Sessions Took Two Issues to One Integrated Draft"
  subtitle="FanHub, 2026-10-22, Copilot CLI 1.0.100 · REAL run · AI credits per session"
  :rows='[
    { label: "Plan", description: "Plans for #4 and #5 posted on the issues; two workstreams; three named seams", tag: "47.15" },
    { label: "Implement #4", description: "Worktree char-detail · bee5680 · 56/56 · reviewer accept after one round", tag: "104.12" },
    { label: "Implement #5", description: "Parallel worktree episode-detail · 24b6a6c · 8 failed → 47/47", tag: "102.55" },
    { label: "Integrate", description: "Seams resolved · reviewer catch after merge · 96/96 · draft #217", tag: "126.13" }
  ]'
  footnote="One observed run: about 380 credits; developer time and a manual baseline were unmeasured. What made it trustworthy?"
  :progressDots='{ current: 1, total: 1, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
This is the real ledger. Four sessions, each with a command you could rerun and an artifact you could open.
The orchestrator never edited code itself. Every stage left evidence: issue comments, local commits, a hook decision log, a transcript, and a pull request whose body is the integration record.
Ask the room: what would you need to see before trusting a run like this? Hold the answers. The contract in Part 1 is the answer FanHub wrote down.
-->

---

<!-- SLIDE: Part 1 — Write the Loop Contract First -->
# Part 1 — Write the Loop Contract First
<SectionOpenerSlide
  :partNumber="1"
  title="Write the Loop Contract First"
  subtitle="Four answers before the first run, a plan with risks before code, and a split test with named seams"
  :cards='[
    { icon: "📜", title: "Four fields", blurb: "Role ownership, completion evidence, budget, merge authority" },
    { icon: "⚠️", title: "Risks before code", blurb: "The plan names what could break and how to avoid it" },
    { icon: "✂️", title: "Split test", blurb: "Disjoint files apart from named seams, each owned" }
  ]'
  :terminal='{ context: "copilot --agent sdlc-orchestrator --mode autopilot -p \u0022plan #4 #5\u0022", detail: "two plans posted as issue comments · split into two workstreams" }'
/>

<!--
Part 1 turns "let the agents handle it" into four checks a person can verify afterwards.
-->

---

<!-- SLIDE: The Four-Field Contract -->
# The Four-Field Contract
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📜"
  pillLabel="Contract: Four Fields"
  title="Four Answers Turn a Hand-Off Into Checks"
  subtitle="The orchestrator states the contract in its first message and its final summary"
  :rows='[
    { label: "Who does what?", description: "planner plans, implementer edits source, test-writer edits tests, test-reviewer judges", tag: "agent tools + body" },
    { label: "When is it done?", description: "Frontend Jest suite passes and the reviewer accepts", tag: "Stop hook + reviewer" },
    { label: "When does it give up?", description: "Autopilot continues, AI-credit cap, three blocked stops", tag: "CLI flags + hook" },
    { label: "Who decides what merges?", description: "A person reviewing a draft pull request", tag: "deny git push · draft PR" }
  ]'
  footnote="Each field names where it is enforced, so each one can be checked from the run&#39;s own artifacts"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Role ownership, completion evidence, budget and escalation, merge authority. Each row also says where it is enforced: the agent's tools list, a Stop hook, CLI flags, a deny rule and a draft pull request.
These four fields come back at the end in the pull request the reviewer receives.
-->

---

<!-- SLIDE: A Plan With Risks Before Code -->
# A Plan With Risks Before Code
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="⚠️"
  pillLabel="Contract: Plan Artifact"
  title="The Planner Names the Risk Before Anyone Writes Code"
  codePosition="left"
  :code='{ language: "markdown", filename: "planner output shape · posted as an issue comment", content: "## Plan for #5: Episode detail page\n**Goal:** one sentence a reviewer can check\n**Files to change:** path, what changes; (seam) marked\n**Files to create:** path, purpose\n**Risks before code:** Episodes.test.js renders the\n  page without a router; navigation will break it\n**Tests to add:** file, behaviors to prove\n**Done when:** observable checks + suite command" }'
  :features='[
    { icon: "🔮", title: "#5 risk: missing router context", description: "Named in the plan; it surfaced as 8 failing tests in Part 3" },
    { icon: "🏛️", title: "#4 risk: class component", description: "Characters.jsx needs Link wrappers in place of hooks" },
    { icon: "💬", title: "Plan lives on the issue", description: "gh issue comment puts it where the team already reviews work" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
The planner is read-only. It reads the issue and the code it touches, then returns a fixed shape. The most valuable line is risks before code.
For #5 it predicted that the existing Episodes test renders without a router, so adding navigation would break it. Remember that line: it comes back in Part 3.
For #4 it noted Characters.jsx is a class component, so navigation had to use Link wrappers.
-->

---

<!-- SLIDE: The Split Test -->
# The Split Test
<ThreeColumnCardSlide
  :partNumber="1"
  pillIcon="✂️"
  pillLabel="Contract: Split Test"
  title="Split When Files Are Disjoint Apart From Named Seams"
  :columns='[
    { title: "✂️ Split", description: "Two workstreams", items: ["File sets disjoint apart from named seams", "Each workstream passes the suite alone", "FanHub: #4 and #5 split"] },
    { title: "🔗 Keep together", description: "One workstream", items: ["Both plans edit the same component", "One plan depends on the other&#39;s output", "Integration cost exceeds parallel gain"] },
    { title: "🧷 Name every seam", description: "Owned by integration", items: ["App.js: both add a route", "App.test.js: both add route tests", "node/README.md: both document"] }
  ]'
  :insight='{ icon: "💡", text: "Related entities remain noninteractive: that one plan line let each page ship without the other." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
The orchestrator runs the split test across both plans. FanHub split, and named three seams owned by the integration step.
The planner also kept each page self-contained: the character page lists episodes without linking to an episode page that might not exist yet. That is what made parallel work safe.
-->

---

<!-- SLIDE: Part 2 — Build the Orchestrator and Its Crew -->
# Part 2 — Build the Orchestrator and Its Crew
<SectionOpenerSlide
  :partNumber="2"
  title="Build the Orchestrator and Its Crew"
  subtitle="Keep only the mechanisms that enforce the contract"
  :cards='[
    { icon: "🎼", title: "Orchestrator", blurb: "Owns sequence; agents allow-list; no edit tool" },
    { icon: "🧑‍🔧", title: "Four roles", blurb: "One boundary each, and each one held in the run" },
    { icon: "🌳", title: "Worktrees", blurb: "One per workstream, with budgets on every session" }
  ]'
  :terminal='{ context: ".github/agents/sdlc-orchestrator.agent.md · FanHub 69458ee", detail: "planner · implementer · test-writer · test-reviewer" }'
/>

<!--
Part 2 is compact. Four slides: the orchestrator file, the role boundaries, worktrees with budgets, and the gotchas the run surfaced.
-->

---

<!-- SLIDE: The Orchestrator File -->
# The Orchestrator File
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🎼"
  pillLabel="Crew: Orchestrator"
  title="The Orchestrator Owns Sequence and Delegates Every Edit"
  codePosition="left"
  :code='{ language: "yaml", filename: ".github/agents/sdlc-orchestrator.agent.md", content: "&#45;&#45;&#45;\nname: sdlc-orchestrator\ndescription: Runs one FanHub Node frontend issue\n  through plan, implement, test, review, and\n  integrate using narrow subagents.\ntools: [\u0022agent\u0022, \u0022read\u0022, \u0022search\u0022, \u0022execute\u0022, \u0022todo\u0022]\nagents: [\u0022planner\u0022, \u0022implementer\u0022,\n         \u0022test-writer\u0022, \u0022test-reviewer\u0022]\nhooks:\n  Stop:\n  - type: command\n    timeoutSec: 300\n    command: >-\n      node scripts/copilot-hooks/verify-before-stop.mjs\n&#45;&#45;&#45;" }'
  :features='[
    { icon: "📋", title: "agents is an allow-list", description: "The orchestrator may call these four and no others" },
    { icon: "✋", title: "tools omits edit", description: "Every change goes through a role agent" },
    { icon: "🛑", title: "Agent-scoped Stop hook", description: "The gate runs whenever the orchestrator tries to finish" },
    { icon: "🔢", title: "Three modes in the body", description: "plan, implement, integrate, with &#39;two rounds at most, then report&#39;" }
  ]'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
This is the real file. The agents field limits which subagents the orchestrator can call. Leaving edit out of tools means the orchestrator can read and run commands, and every change goes through a role agent.
The hooks block scopes the Stop hook to this agent. The body has three modes with numbered steps.
-->

---

<!-- SLIDE: Role Boundaries That Held -->
# Role Boundaries That Held
<FourCardGridSlide
  :partNumber="2"
  pillIcon="🧑‍🔧"
  pillLabel="Crew: Role Boundaries"
  title="Each Role Agent Gets One Boundary, and Each One Held"
  :cards='[
    { icon: "🗺️", title: "planner · read, search", description: "Wrote no files; returned plans to the orchestrator" },
    { icon: "🛠️", title: "implementer · source only", description: "In #5 it reported 8 failed and left the test fix to test-writer" },
    { icon: "🧪", title: "test-writer · tests only", description: "Reused from Custom Agents; edited only *.test.js files" },
    { icon: "🔍", title: "test-reviewer · read-only", description: "Returned request-changes, then accept, with findings" }
  ]'
  :insight='{ icon: "🧠", text: "Subagents start with no conversation history: the orchestrator hands each one the plan, the failure, or the findings." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
planner and implementer set user-invocable false, so they serve the orchestrator and stay out of the agent picker.
The boundary that mattered most: the implementer cannot edit tests. When its change broke the existing Episodes tests, it reported the failure and the orchestrator routed the fix to test-writer.
-->

---

<!-- SLIDE: One Worktree Per Workstream -->
# One Worktree Per Workstream
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🌳"
  pillLabel="Crew: Worktrees and Budgets"
  title="One Worktree per Workstream, a Budget on Every Session"
  codePosition="left"
  :code='{ language: "powershell", filename: "implement #4 · run in parallel with #5", content: "copilot --worktree char-detail `\n  --agent sdlc-orchestrator --mode autopilot `\n  --max-autopilot-continues 15 `\n  --max-ai-credits 150 `\n  --allow-all-tools `\n  --deny-tool &#39;shell(git push)&#39; `\n  --share .\\evidence\\impl4.md `\n  --log-dir .\\evidence\\impl4-logs `\n  -p \u0022implement #4\u0022" }'
  :features='[
    { icon: "🌳", title: "--worktree char-detail", description: "Creates FanHub.worktrees\\char-detail on a new branch" },
    { icon: "💳", title: "Budgets on the command line", description: "Continuation cap and AI-credit cap per session" },
    { icon: "⛔", title: "Deny wins", description: "Deny rules take precedence over every allow rule" },
    { icon: "🧾", title: "--share and --log-dir", description: "A transcript and logs for every session" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Two of these ran at the same time, one per issue, each in its own worktree on its own branch. The sessions never touched each other's files.
Budgets live on the command line. Push is denied while implementing, so commits stay local until integration.
-->

---

<!-- SLIDE: Gotchas the Run Surfaced -->
# Gotchas the Run Surfaced
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🧰"
  pillLabel="Crew: Gotchas"
  title="Three Setup Details the First Runs Taught"
  :columns='[
    { title: "🔐 Permissions", description: "Plan session, first attempt", items: ["shell(gh:*) missed a compound PowerShell command", "Autopilot stopped: no progress at 38.67 of 40", "Fix: --allow-all-tools with deny git push"] },
    { title: "📦 Fresh worktrees", description: "No node_modules", items: ["sessionStart hook in .github/hooks/", "Links main checkout node_modules", "Both worktrees ran Jest on arrival"] },
    { title: "🐍 Hook input casing", description: "Agent-scoped Stop hook", items: ["Keys arrive as session_id, cwd, stop_reason", "First version read sessionId", "Logging input keys found it in one run"] }
  ]'
  :insight='{ icon: "🔎", text: "Log the raw hook input and the permission denials; both made each fix a one-run change." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Permissions need the same care as roles. The agent wrote one PowerShell command that created a folder, wrote a file and posted a comment; the gh allow rule covered only part of it.
Fresh worktrees have no node_modules, so a repository sessionStart hook links them from the main checkout.
Agent-scoped Stop hooks receive snake_case input. The logged keys were hook_event_name, session_id, timestamp, cwd, transcript_path, stop_reason, stop_hook_active.
-->

---

<!-- SLIDE: Part 3 — Let Evidence Decide When to Stop -->
# Part 3 — Let Evidence Decide When to Stop
<SectionOpenerSlide
  :partNumber="3"
  title="Let Evidence Decide When to Stop"
  subtitle="Tests steer the run, a Stop hook backs them up, and budgets hand control to a person"
  :cards='[
    { icon: "🔮", title: "Predicted, then routed", blurb: "The plan&#39;s risk became 8 failures and a routed fix" },
    { icon: "🛑", title: "Backstop", blurb: "11 allow and 0 block in real runs; a staged block shows the path" },
    { icon: "💳", title: "Budget stop", blurb: "113.4 of 120 credits, then a person resumed" }
  ]'
  :terminal='{ context: ".copilot-loop/hook-log.jsonl", detail: "decision · blocksSoFar · Tests: line · seconds" }'
/>

<!--
This is the heart of the talk. Every slide carries a label: REAL for the FanHub runs, STAGED for the one demonstration we set up on purpose.
-->

---

<!-- SLIDE: Predicted, Failed, Routed -->
# Predicted, Failed, Routed
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="🔮"
  pillLabel="Evidence: REAL · #5"
  title="Predicted in the Plan, Caught by Tests, Routed to test-writer"
  :problem='{
    header: "Implementer run · suite red",
    items: [
      { title: "Navigation added", detail: "Episodes.js now calls useNavigate()" },
      { title: "8 failed, 8 total", detail: "useNavigate() may be used only in the context of a &lt;Router&gt;" },
      { title: "Boundary held", detail: "Implementer reported it; tests are outside its role" }
    ]
  }'
  :solution='{
    header: "Orchestrator routed the failure",
    items: [
      { title: "To test-writer", detail: "Add router context to the existing render helper" },
      { title: "Plus new coverage", detail: "EpisodeDetail and App route tests" }
    ]
  }'
  :outcome='{
    header: "Suite green, reviewer engaged",
    items: [
      "Reviewer requested revisions, then accepted",
      "Commit 24b6a6c on branch episode-detail",
      "The risk named in Part 1 became a routed fix"
    ],
    metrics: [{ value: "47 / 47", label: "tests passing in the #5 worktree" }]
  }'
  :insight='{ icon: "💡", text: "Evidence steered the run: a named risk, a red suite, a routed fix, a green suite." }'
  :progressDots='{ current: 1, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
REAL. This is the moment the contract earns its keep. The plan said the Episodes test renders without a router. The implementer added navigation, ran the suite, and all 8 existing tests failed with exactly that error.
The implementer is not allowed to edit tests, so it reported the failure. The orchestrator routed it to test-writer, which added router context and new coverage. The reviewer asked for revisions, then accepted. 47 of 47.
-->

---

<!-- SLIDE: The Stop Hook -->
# The Stop Hook
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🛑"
  pillLabel="Evidence: Stop Hook"
  title="The Stop Hook Turns Done Into a Test Result"
  codePosition="left"
  :code='{ language: "javascript", filename: "scripts/copilot-hooks/verify-before-stop.mjs (core)", content: "// CI=true npx react-scripts test --watchAll=false\nconst run = spawnSync(testCmd, { cwd: frontend,\n  shell: true, env: { ...env, CI: \u0022true\u0022 } });\nif (run.status === 0) return allow();\nif (blocks >= 3) return escalate(); // note, allow\nsaveBlocks(blocks + 1);\nprint({ decision: \u0022block\u0022,\n  reason: `Stop hook (block ${blocks + 1} of 3):\n  suite failing.\\n${failures}\\nRoute to\n  implementer or test-writer, rerun, finish.` });" }'
  :features='[
    { icon: "⛔", title: "block + reason", description: "The CLI feeds the failing output back as the next prompt" },
    { icon: "✅", title: "allow", description: "The suite passed, so the orchestrator may finish" },
    { icon: "3️⃣", title: "Three strikes, then escalate", description: "Agent-scoped Stop hooks also stop forcing after 8 consecutive blocks" },
    { icon: "🧾", title: "Every decision logged", description: "JSONL in gitignored .copilot-loop/, per session" }
  ]'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
When the orchestrator tries to finish, the hook runs Jest. On failure it returns decision block with the failing lines as reason, and the CLI sends that reason back as the agent's next prompt. On success it returns allow.
The counter is per session, so the two parallel worktrees each had their own three strikes. The documented cap for agent-scoped Stop hooks is 8 consecutive blocks; our script gives up sooner and writes an escalation note.
-->

---

<!-- SLIDE: The Gate Record -->
# The Gate Record
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="📊"
  pillLabel="Evidence: REAL · Gate Record"
  title="Across Real Runs the Gate Allowed 11 Times and Blocked None"
  :left='{
    header: "Stop hook decisions · REAL",
    icon: "🛑",
    items: [
      { title: "Plan session", detail: "Allow · 8/8 on main" },
      { title: "Implement #4 · #5", detail: "Allow · 56/56 and 47/47" },
      { title: "Integrate", detail: "Allow · 96/96" },
      { title: "Total", detail: "11 allow · 0 block" }
    ]
  }'
  :right='{
    header: "What caught failures · REAL",
    icon: "🔁",
    items: [
      { title: "The orchestrator&#39;s own step", detail: "Run the suite, route failures, rerun, then stop" },
      { title: "#5 in-loop", detail: "8 failed → test-writer → 47/47" },
      { title: "Integrate in-loop", detail: "Reviewer finding → fix + regression test → 96/96" }
    ]
  }'
  :insight='{ icon: "🛡️", text: "The orchestrator tests before stopping; the gate covers the run that skips it." }'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
REAL. Be straightforward about this: across every real session, the Stop hook allowed and never blocked. The reason is good news. The orchestrator ran the suite and routed failures before it ever tried to finish, so by the time it stopped, the suite was green.
The hook is the backstop for the run that skips that step. The next slide shows that path.
-->

---

<!-- SLIDE: The Backstop, Staged -->
# The Backstop, Staged
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🎭"
  pillLabel="Evidence: STAGED · Backstop"
  title="Told to Skip Tests, the Orchestrator Met the Gate"
  codePosition="left"
  :code='{ language: "json", filename: "hook-demo/.copilot-loop/hook-log.jsonl · STAGED", content: "{\u0022branch\u0022:\u0022hook-demo\u0022,\u0022decision\u0022:\u0022block\u0022,\n \u0022blocksSoFar\u0022:0,\n \u0022tests\u0022:\u0022Tests: 7 failed, 1 passed, 8 total\u0022,\n \u0022seconds\u0022:5}\n{\u0022branch\u0022:\u0022hook-demo\u0022,\u0022decision\u0022:\u0022allow\u0022,\n \u0022blocksSoFar\u0022:1,\n \u0022tests\u0022:\u0022Tests: 8 passed, 8 total\u0022,\n \u0022seconds\u0022:4}" }'
  :features='[
    { icon: "🧪", title: "Setup", description: "A planted commit renamed Season to Series in the episode filter" },
    { icon: "📣", title: "Prompt", description: "Skip tests and subagents; summarize and finish" },
    { icon: "⛔", title: "Block", description: "7 failed: the reason arrived with the failing assertions" },
    { icon: "✅", title: "Allow", description: "test-writer updated expectations · 8/8 · commit 33163d2 · 26.89 credits" }
  ]'
  :progressDots='{ current: 4, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
STAGED. We set this one up on purpose to show the backstop path. A commit renamed the season label, and the prompt told the orchestrator to skip tests and finish.
The hook blocked with 7 failures. The orchestrator routed the failing assertions to test-writer. One honest detail: its first subagent call failed with a tool schema error and the session ended; a resume with "continue" picked it up. The next stop passed, 8 of 8.
-->

---

<!-- SLIDE: Agreement and Intent -->
# Agreement and Intent
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="⚖️"
  pillLabel="Evidence: Boundary"
  title="Tests Prove Agreement; a Person Judges Intent"
  :left='{
    header: "What the gate proved",
    icon: "✅",
    items: [
      { title: "Code and tests agree", detail: "8 of 8 after the Series rename" },
      { title: "Fast and repeatable", detail: "About five seconds per decision" },
      { title: "Logged per session", detail: "Decision, strike count, Tests: line" }
    ]
  }'
  :right='{
    header: "What stays with a person",
    icon: "🧑‍⚖️",
    items: [
      { title: "Was the rename wanted?", detail: "The agent treated it as intended and changed tests to match" },
      { title: "Is the behavior right?", detail: "Product intent lives in review" },
      { title: "Should it merge?", detail: "The reviewer owns that call" }
    ]
  }'
  :insight='{ icon: "💡", text: "A green gate says the code and its tests agree. Whether the change was wanted is a person&#39;s call." }'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
This is the boundary of the gate. When the suite failed, the agent had two options: revert the rename or update the tests. It chose to update the tests, which is reasonable if the rename was intended.
The hook cannot tell the difference. That decision belongs at review, which is exactly where Part 4 takes us.
-->

---

<!-- SLIDE: Budgets Decide When to Give Up -->
# Budgets Decide When to Give Up
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="💳"
  pillLabel="Evidence: REAL · Budgets"
  title="Budgets Stopped Two Runs Cleanly and Handed Control to a Person"
  subtitle="Each stop left a clean state, a transcript, and a stated reason"
  :rows='[
    { label: "--max-ai-credits", description: "Whole session, subagents included; warnings at 50, 75, 90 percent", tag: "integrate: 113.4 of 120" },
    { label: "--max-autopilot-continues", description: "Autopilot continuation turns; set to 15 for implementation", tag: "cap unused" },
    { label: "No-progress stop", description: "Repeated turns without a successful tool call", tag: "plan: permissions" },
    { label: "Hook strike counter", description: "Three blocked stops, then an escalation note", tag: "unused in real runs" }
  ]'
  footnote="A person read the summary, clarified the integration record is the PR body, and resumed at 140 credits"
  :progressDots='{ current: 6, total: 6, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
REAL. Integration stopped at 113.4 of 120 credits while trying to commit a gitignored integration record. That was an instruction ambiguity.
A person read the summary, clarified that the record is the pull request body, and resumed the session with --resume and a 140-credit cap. The orchestrator's instructions now say that explicitly. The team lead owns these numbers.
-->

---

<!-- SLIDE: Part 4 — Integrate, Then Hand It to a Person -->
# Part 4 — Integrate, Then Hand It to a Person
<SectionOpenerSlide
  :partNumber="4"
  title="Integrate, Then Hand It to a Person"
  subtitle="Resolve named seams, review the merged whole, and open a draft with its evidence"
  :cards='[
    { icon: "🔍", title: "Merged-whole review", blurb: "A defect that existed only after two green branches met" },
    { icon: "🧾", title: "Integration record", blurb: "Seams, counts, corrections, open risks" },
    { icon: "🤝", title: "Draft handoff", blurb: "The reviewer owns merge and intent" }
  ]'
  :terminal='{ context: "-p \u0022integrate char-detail episode-detail into feat/node-detail-pages for #4 #5\u0022", detail: "draft #217 · Fixes #4 · Fixes #5" }'
/>

<!--
Part 4 is the payoff. Integration found something neither workstream could see alone.
-->

---

<!-- SLIDE: The Reviewer Catch After Merge -->
# The Reviewer Catch After Merge
<ProblemSolutionOutcomeSlide
  :partNumber="4"
  pillIcon="🔍"
  pillLabel="Handoff: REAL · Merged Review"
  title="After Merge, the Reviewer Found a Defect Neither Branch Had"
  :problem='{
    header: "Merged whole · reviewer finding",
    items: [
      { title: "Both branches green", detail: "56/56 and 47/47 before merging" },
      { title: "Unreadable headings", detail: "Global white heading rules on new white panels" },
      { title: "Visible after merge", detail: "Found in review of the integrated diff against main" }
    ]
  }'
  :solution='{
    header: "Routed through the roles",
    items: [
      { title: "implementer", detail: "Local heading colors in CharacterDetail.jsx" },
      { title: "test-writer", detail: "Real-stylesheet contrast regression, 4.5:1 for all five headings" }
    ]
  }'
  :outcome='{
    header: "Integrated and recorded",
    items: [
      "Listed as a reviewer correction in the record",
      "Merge commit 036a070 · branch pushed",
      "Draft #217 opened with Fixes #4 and Fixes #5"
    ],
    metrics: [{ value: "95 → 96", label: "tests after the contrast regression, all passing" }]
  }'
  :insight='{ icon: "💡", text: "Review the merged whole: integration is where workstreams meet for the first time." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
REAL. Both workstreams were green on their own. After the merge, the reviewer looked at the whole diff against main and found that global heading styles made the new character panels unreadable.
The orchestrator routed the fix to the implementer and a regression test to test-writer: a real-stylesheet contrast check at 4.5 to 1. Suite went from 95 to 96. The record lists it as a reviewer correction.
-->

---

<!-- SLIDE: What the Reviewer Receives -->
# What the Reviewer Receives
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🧾"
  pillLabel="Handoff: Draft #217"
  title="The Reviewer Receives the Evidence and the Open Risks"
  :left='{
    header: "Integration record = PR body",
    icon: "🧾",
    items: [
      { title: "Seams", detail: "App.js auto-merged; App.test.js kept all 11 route tests" },
      { title: "Counts", detail: "56 and 47 before · 95 after · 96 with the regression" },
      { title: "Corrections", detail: "Contrast fix with its regression test" },
      { title: "Open risks", detail: "Strict CI lint warnings pre-existing; live backend unverified" }
    ]
  }'
  :right='{
    header: "Who owns what next",
    icon: "🧭",
    items: [
      { title: "Reviewer", detail: "Merge decision and the intent behind every change" },
      { title: "Team lead", detail: "Budget and escalation policy for the next run" },
      { title: "Orchestrator", detail: "Pushed one branch, opened a draft, and stopped" }
    ]
  }'
  :insight='{ icon: "🤝", text: "The loop ends where human authority begins: plan on the issues, evidence in the PR, merge with a person." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
The four contract fields come back here. Roles: visible in the record. Done: suite counts. Budget: the history is in the transcript. Merge authority: the reviewer.
The orchestrator pushed one feature branch and opened a draft. It left merging, marking ready and closing issues to a person. Whatever rules protect main apply to it like any other pull request.
-->

---

<!-- SLIDE: Where It Fits, Applied to Your Work -->
# Where It Fits, Applied to Your Work
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🎯"
  pillLabel="Handoff: Transfer"
  title="Write a Loop Contract for Your Next Issue"
  :left='{
    header: "Your loop contract",
    icon: "🎯",
    items: [
      { title: "Roles", detail: "Who plans, edits source, edits tests, judges" },
      { title: "Done", detail: "The fastest meaningful test command your Stop hook runs" },
      { title: "Budget", detail: "How many credits the issue is worth" },
      { title: "Merge", detail: "Who reads the draft before it merges" }
    ]
  }'
  :right='{
    header: "Where it stops fitting",
    icon: "🧭",
    items: [
      { title: "Event-started work", detail: "Labels, schedules, failed checks: Agentic Workflows" },
      { title: "Assign and walk away", detail: "Cloud agent → Copilot on GitHub" },
      { title: "Small changes", detail: "The plan stage alone used 47 credits here" },
      { title: "Slow verification", detail: "A gate that takes minutes changes every blocked stop" }
    ]
  }'
  :insight='{ icon: "❓", text: "Your next issue: which command does the Stop hook run, what is it worth, who reads the draft?" }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
This is the transfer exercise. Ask people to write the four lines for a real issue before they leave.
Route out once: event-driven work belongs to GitHub Agentic Workflows; assign-and-walk-away work belongs to the cloud agent in Copilot on GitHub. Small changes and slow test suites change the economics.
-->

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From Agents Handling It to a Loop With a Contract"
  :leftItems='["One agent asked to do everything in one session", "Done means the agent said it was done", "Runs end when someone notices the spend", "A diff arrives with a summary to trust"]'
  :rightItems='["An orchestrator with four narrow roles and named seams", "Done means the suite passed and the reviewer accepted", "Credit and continuation caps on every session", "A draft arrives with plan, counts, corrections, and risks"]'
  :metrics='[
    { value: "8 failed → 47/47", detail: "Predicted risk caught in-loop and routed (REAL)" },
    { value: "11 allow · 0 block", detail: "Real gate record; staged block → allow shows the backstop" },
    { value: "95 → 96", detail: "Reviewer catch after merge, locked by a regression test (REAL)" }
  ]'
/>

<!--
The shift is in what the developer writes down before the run and what the reviewer receives after it.
All three metrics come from FanHub on 2026-10-22. The middle one pairs the real record with the staged demonstration, and both are labeled.
-->

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Write the four-field loop contract for one issue in your repository", "Pick the fastest meaningful test command a Stop hook could run", "Decide the AI-credit cap the issue is worth"]'
  :thisWeek='["Create an orchestrator with an agents allow-list and no edit tool", "Add a read-only planner that writes risks before code", "Add a Stop hook that logs every decision and stops forcing after three blocks"]'
  :thisMonth='["Run two workstreams in parallel worktrees with --share and --log-dir", "Integrate with a written record as the draft PR body", "Agree team budgets and escalation policy with your lead"]'
  footer="Roles own the work, tests decide done, budgets decide when to stop, and a person decides what merges."
/>

<!--
Today is writing: the contract, the command, the budget. This week is building the crew. This month is running in parallel and setting team policy.
-->

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Agents and Hooks", color: "cyan", items: [
        { href: "https://code.visualstudio.com/docs/agents/run/subagents", label: "VS Code: subagents", description: "Orchestration patterns" },
        { href: "https://docs.github.com/en/copilot/reference/custom-agents-configuration", label: "Custom agents configuration", description: "agents, tools, hooks" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli", label: "Custom agents for Copilot CLI", description: "CLI setup" },
        { href: "https://docs.github.com/en/copilot/reference/hooks-reference", label: "Hooks reference", description: "Stop, decisions, agent scope" }
    ] },
    { title: "⌨️ Copilot CLI", color: "blue", items: [
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode", label: "Autopilot mode", description: "Continues and credit caps" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions", label: "Multiple sessions", description: "Worktrees and parallel work" },
        { href: "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference", label: "CLI command reference", description: "Flags and permissions" },
        { href: "https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents", label: "Delegating and parallelizing", description: "Choosing agent work" }
    ] },
    { title: "🎬 FanHub Evidence", color: "indigo", items: [
        { href: "https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md", label: "sdlc-orchestrator.agent.md", description: "The orchestrator" },
        { href: "https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs", label: "verify-before-stop.mjs", description: "The Stop hook" },
        { href: "https://github.com/MSBart2/FanHub/issues/4#issuecomment-6331066431", label: "#4 plan", description: "Posted by the orchestrator" },
        { href: "https://github.com/MSBart2/FanHub/pull/217", label: "#217", description: "Integrated draft PR" }
    ] },
    { title: "🧭 Related Talks", color: "purple", items: [
        { label: "Custom Agents", description: "One agent file, every runtime" },
        { label: "Copilot CLI", description: "The terminal surface this loop runs in" },
        { label: "Copilot Hooks", description: "Hook events and policy in depth" },
        { label: "GitHub Agentic Workflows", description: "Event-triggered agents with safe outputs" }
    ] }
  ]'
/>

<!--
The FanHub links hold the raw evidence: the agent files, the hook script, the plan comments, and the draft pull request with its integration record.
-->

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Local Agentic SDLC"
  subtitle="A loop with a contract: roles, evidence, budgets, and a person at the merge"
  :cards="[
    { value: '8 failed → 47/47', detail: 'The plan predicted it; the orchestrator routed it' },
    { value: '95 → 96', detail: 'A reviewer catch that existed only after merge' },
    { value: '≈380 credits', detail: 'Two issues to one integrated draft, one observed run' },
  ]"
  prompt="Which command would your Stop hook run on your next issue, and who reads the draft before it merges?"
/>

<!--
Close on the own-work question and leave it on screen during discussion.
-->
