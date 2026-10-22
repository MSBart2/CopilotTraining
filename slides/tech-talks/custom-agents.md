---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Custom Agents
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Custom Agents
mdc: true
section: "Foundations"
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
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="Custom Agents"
  subtitle="One File, Every Runtime"
  tagline="Design the portable core. Read the resolved run. Place each requirement where it lives."
  meta="Foundations · CopilotTraining Tech Talk · 45 min"
/>

<!--
A FanHub platform engineer wants a specialist: an agent that writes Jest tests for the Node frontend, edits only test files, runs what it writes, and escalates suspected production defects to a person.
Developers will call it from VS Code and the Copilot CLI; maintainers will assign issues to it on GitHub. The engineer writes one file and commits it.
Today we follow that one file into three runtimes and learn to read what each runtime actually did with it.
-->

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How should a team design one custom agent that behaves as intended in every runtime it reaches?"
  subtext="Each runtime resolves the same file in its own context: fields, tools, model, and environment."
  highlight="Write the portable core, then read the resolved run."
  :cards='[
    { icon: "🛠️", title: "Agent producer", description: "Platform engineer who writes the agent file the whole team shares" },
    { icon: "💻", title: "Developer starting runs", description: "Calls the agent from VS Code or the CLI and owns the launch controls" },
    { icon: "🧭", title: "Maintainer and team lead", description: "Prepare the cloud environment, accept PRs, and set runtime policy" },
    { title: "1 file · 3 runtimes", description: "test-writer.agent.md invoked in VS Code, Copilot CLI, and cloud agent (observed)" },
    { title: "6 aliases → 23 · 14 tools", description: "Each runtime&#39;s own expansion: VS Code 23, Copilot CLI 14 (observed)" },
    { title: "Stopped → 6 passed", description: "Cloud Jest after copilot-setup-steps.yml: 1 suite, 6 tests passed (observed)" }
  ]'
/>

<!--
Three roles share this agent. The producer writes the file. The developer starts runs and controls launch options. The maintainer and team lead own the environment, acceptance, and runtime policy.
Bottom row: every number here comes from FanHub runs on 2026-10-21, and each comes from an artifact you can open.
The tool counts compare how each runtime resolves the same six aliases. They describe resolution, and they leave capability unranked.
-->

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🧱", title: "Design the Portable Core", subtitle: "Description selects, tools bound, body teaches", blurb: "Role, tool boundary, method, and output contract in the shared core", slide: 5 },
    { icon: "🔬", title: "Run in Three Runtimes", subtitle: "Documented support, then observed resolution", blurb: "Read agent, model, tools, and checks from each runtime&#39;s artifacts", slide: 10 },
    { icon: "📋", title: "Prove and Place", subtitle: "Load, compare, place, rerun", blurb: "Map each gap to its owning layer and owner, then rerun the proof", slide: 17 },
    { icon: "🎯", title: "Take It to Your Agents", subtitle: "Own-work check and next moves", blurb: "Run the load report on an agent your team already shares", slide: 21 }
  ]'
/>

<!--
The arc: design the portable core, run it in three runtimes, then prove and place.
Design comes before evidence on purpose. Once you know how the file divides the work, you can predict the results, and the surprises land as lessons.
-->

---

<!-- SLIDE: Cold Open — Three Outcomes -->
# Cold Open — Three Outcomes
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🎬"
  pillLabel="Cold Open: test-writer"
  title="One Agent File Entered Three Runtimes and Produced Three Stories"
  subtitle="FanHub, 2026-10-21: the same .github/agents/test-writer.agent.md, tests for one small component each"
  :rows='[
    { label: "VS Code", description: "Agent declared Claude Sonnet 5.5; its requests ran gpt-6.1-sol", tag: "#216 · request log" },
    { label: "Copilot CLI", description: "Logged: Using model claude-sonnet-5.5 from custom agent test-writer", tag: "#215 · debug log" },
    { label: "Cloud agent", description: "Ran test-writer; Jest stopped at Cannot find module &#39;react&#39;", tag: "#214 · session log" }
  ]'
  footnote="All three runtimes recognized and invoked the agent. Which agent did the team ship?"
  :progressDots='{ current: 1, total: 1, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Three fragments, one file. VS Code: the agent declared Claude Sonnet 5.5, and the request log shows gpt-6.1-sol. The CLI wrote its model decision into its debug log. The cloud agent invoked test-writer by name and stopped at a missing React dependency.
Ask the room: which agent did the team actually ship? Take a few answers. Hold them; we come back to every row with the full evidence in Part 2.
-->

---

<!-- SLIDE: Part 1 — Design the Portable Core -->
# Part 1 — Design the Portable Core
<SectionOpenerSlide
  :partNumber="1"
  title="Design the Portable Core"
  subtitle="Decide when a role earns a file, split description, tools, and body, then publish where it should load"
  :cards='[
    { icon: "🧭", title: "A different who", blurb: "An agent file carries a role: identity, tool boundary, method, model" },
    { icon: "📝", title: "The body travels", blurb: "Every runtime reads the body, so the output contract lives there" },
    { icon: "📍", title: "Most local wins", blurb: "Identify the winning file before debugging the prompt" }
  ]'
  :terminal='{ context: ".github/agents/test-writer.agent.md · committed to main (df50ea1)", detail: "description selects · tools bound · body teaches" }'
/>

<!--
Part 1 builds the mental model that answers the cold-open question. Four slides: when a role earns a file, how the frontmatter divides the work, why the output contract belongs in the body, and where to publish so the right file loads.
-->

---

<!-- SLIDE: When a Role Earns an Agent File -->
# When a Role Earns an Agent File
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🧭"
  pillLabel="Design: Choose the Primitive"
  title="A Custom Agent Earns Its File When the Work Needs a Different Who"
  :cards='[
    { icon: "📜", title: "Instructions", description: "Conventions every agent follows: copilot-instructions.md, *.instructions.md, AGENTS.md" },
    { icon: "🎯", title: "Prompt file", description: "One repeatable task a person starts by name (*.prompt.md)" },
    { icon: "🧠", title: "Skill", description: "A method plus scripts and resources any agent loads on demand (SKILL.md)" },
    { icon: "🤖", title: "Custom agent", description: "A persistent role: identity, tool boundary, method, and model preference (*.agent.md)" }
  ]'
  :insight='{ icon: "", text: "🧪 test-writer edits test files only, runs one command family, and reports production bugs for a person to fix." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
GitHub describes customizations as a set with distinct jobs. The question to ask: does this work need a different who? Different tools, a narrower write boundary, a hand-off point.
test-writer earns a file because its boundary differs from the default agent. A convention like "tests sit beside the component" belongs in instructions. A reusable method like "how FanHub mocks the API layer" belongs in a skill the agent can load.
-->

---

<!-- SLIDE: Anatomy of test-writer -->
# Anatomy of test-writer
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🧬"
  pillLabel="Design: Anatomy"
  title="Description Selects, Tools Bound, Body Teaches"
  codePosition="left"
  :code='{ language: "markdown", filename: ".github/agents/test-writer.agent.md (excerpt)", content: "&#45;&#45;&#45;\nname: test-writer\ndescription: Writes focused Jest tests for one FanHub Node\n  frontend component or page, runs them, and reports any\n  production behavior that looks wrong.\n  Edits test files only.\ntools: [\u0022read\u0022, \u0022search\u0022, \u0022edit\u0022, \u0022execute\u0022, \u0022todo\u0022, \u0022web\u0022]\nmodel: \u0022Claude Sonnet 5.5 (copilot)\u0022\nhandoffs:\n  - label: Review these tests\n    agent: test-reviewer\n    send: false\n&#45;&#45;&#45;\n# Test writer for the FanHub Node frontend\nYou write tests. You do not change production code.\n## Scope … ## Method … ## Final summary …" }'
  :features='[
    { icon: "🎯", title: "description selects", description: "The only required field. Pickers show it; the CLI and VS Code use it to choose an agent" },
    { icon: "🧰", title: "tools bound", description: "Aliases each runtime maps to its own tools. tools: [] grants none; omitting it grants all" },
    { icon: "📘", title: "body teaches", description: "Method and output contract, up to 30,000 characters. Every runtime reads it" }
  ]'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Excerpt of the real file; argument-hint and the handoff prompt are trimmed for space.
Write the description as a selection rule: what the agent does and the boundary it keeps, because the CLI and VS Code use it to pick an agent automatically.
Tool aliases: read, edit, search, execute, agent, web, todo, plus MCP tools as server/tool or server/*. Each runtime maps them to its own tools, which is why the counts later differ.
The body is the most portable place for behavior, because every runtime reads it.
-->

---

<!-- SLIDE: Output Contract in the Body -->
# Output Contract in the Body
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="📝"
  pillLabel="Design: Output Contract"
  title="Write the Output Contract Into the Body"
  codePosition="left"
  :code='{ language: "text", filename: "test-writer final summary · five lines, every run", content: "Agent:              test-writer\nTests added:        &lt;test file and behaviors&gt;\nCommand and result: &lt;command&gt; → &lt;runner counts&gt;\nSuspected bugs:     &lt;production behavior for a person&gt;\nFiles changed:      &lt;test files only&gt;" }'
  :features='[
    { icon: "☁️", title: "Cloud: the summary carried the failure", description: "“could not run tests because react was missing”" },
    { icon: "📄", title: "The PR description told another part", description: "It covered the behaviors tested; the agent summary held the execution result" },
    { icon: "🌐", title: "Portable by construction", description: "Every runtime reads the body, so every teammate gets the same five lines" }
  ]'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
The five fields come from the test-writer body: agent, tests added, command and result, suspected bugs, files changed. The angle-bracket placeholders show the shape; each run fills them in.
This contract is what made the cloud run inspectable. The agent's own summary carried the execution failure, and the pull request description covered the behaviors tested. Two artifacts, two different answers.
-->

---

<!-- SLIDE: Publish Where It Should Load -->
# Publish Where It Should Load
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="📍"
  pillLabel="Design: Publish and Invoke"
  title="Identify the Winning File Before Debugging the Prompt"
  subtitle="The filename is the agent ID; when two scopes define one ID, the most local definition wins"
  :rows='[
    { label: "Repository", description: ".github/agents/*.agent.md: everyone in the repo, every runtime", tag: "team default" },
    { label: "Personal", description: "~/.copilot/agents/ for the CLI; VS Code profile storage for VS Code", tag: "one developer" },
    { label: "Organization", description: "agents/ in the org .github or .github-private repo; cloud and VS Code", tag: "every org repo" },
    { label: "Precedence", description: "Personal, then repository, then organization, then enterprise", tag: "most local wins" },
    { label: "Invocation", description: "target, user-invocable: false, disable-model-invocation: true", tag: "who can start it" }
  ]'
  footnote="The cloud agent reads agents from the default branch: FanHub committed test-writer to main (df50ea1) first"
  :progressDots='{ current: 4, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Organization and enterprise scope live in agents/ at the root of the org's .github or .github-private repo; the cloud agent and VS Code discover them.
A developer's personal test-writer.agent.md replaces the team's version for that developer only. That makes experiments easy. When teammates see different behavior from the same agent, find the winning file first.
Invocation controls: target vscode or github-copilot limits where the agent appears; omit it to offer the agent everywhere. user-invocable false hides it from pickers and keeps it available as a subagent, a good fit for a reviewer only an orchestrator calls. disable-model-invocation true stops automatic selection, and it supersedes the retired infer field.
-->

---

<!-- SLIDE: Part 2 — Run One File in Three Runtimes -->
# Part 2 — Run One File in Three Runtimes
<SectionOpenerSlide
  :partNumber="2"
  title="Run One File in Three Runtimes"
  subtitle="Separate documented support from observed resolution, then read what each runtime did with test-writer"
  :cards='[
    { icon: "📄", title: "Documented support", blurb: "Runtimes skip unsupported fields quietly, by design" },
    { icon: "🔬", title: "Observed resolution", blurb: "FanHub #216, #215, and #214 on 2026-10-21" },
    { icon: "🧰", title: "Environment dependency", blurb: "Setup steps outside the profile let cloud Jest run" }
  ]'
  :terminal='{ context: "gh agent-task create --custom-agent test-writer → #214", detail: "Cannot find module &#39;react&#39; → setup steps → 6 passed" }'
/>

<!--
This is the heart of the talk. Every slide in this part carries its evidence label: documented support, observed resolution, unresolved discrepancy, or execution-environment dependency.
-->

---

<!-- SLIDE: Documented Field Support -->
# Documented Field Support
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="📄"
  pillLabel="Evidence: Documented Support"
  title="Runtimes Skip Unsupported Fields Quietly, by Design"
  subtitle="Documented support on 2026-10-21, from the custom agents configuration reference"
  :rows='[
    { label: "All three", description: "name, description, tools, target, and both invocation controls", tag: "VS Code · CLI · cloud" },
    { label: "model", description: "VS Code and the CLI read it; cloud docs list it for IDE use", tag: "VS Code · CLI" },
    { label: "VS Code", description: "handoffs, agents, argument-hint (Local); reasoning-effort", tag: "VS Code only" },
    { label: "Agent-scoped hooks", description: "hooks in the agent file run in VS Code and the CLI", tag: "VS Code · CLI" },
    { label: "Copilot CLI", description: "include-custom-instructions for subagent runs", tag: "CLI only" },
    { label: "Cloud agent", description: "mcp-servers, metadata", tag: "cloud only" },
    { label: "Tool aliases", description: "web and todo resolve in VS Code and the CLI; cloud: not applicable", tag: "VS Code · CLI" }
  ]'
  footnote="Quiet skipping lets one profile serve several products without errors"
  :progressDots='{ current: 1, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Evidence label: documented support. This is what the docs say each runtime reads.
The configuration reference states it directly: runtimes ignore tool names and fields they do not support, so one profile can serve several products without errors. That quiet skipping is the portability design.
The invocation controls in row one are user-invocable and disable-model-invocation.
Next slide: what the runtimes actually did.
-->

---

<!-- SLIDE: Observed Resolution -->
# Observed Resolution
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🔬"
  pillLabel="Evidence: Observed Resolution"
  title="Observed Resolution: One File, Resolved Three Ways"
  :columns='[
    { title: "🖥️ VS Code · #216", items: ["model: requests ran gpt-6.1-sol; cause unresolved", "tools: 6 aliases → 23 VS Code tools", "handoffs + argument-hint: both worked in a Local session", "Agent test run · runner: 14 passed"] },
    { title: "⌨️ CLI 1.0.100 · #215", items: ["model: resolved to claude-sonnet-5.5, logged", "tools: 6 aliases → 14 CLI tools", "handoffs + argument-hint: skipped; nothing logged", "Agent test run · runner: 10 passed"] },
    { title: "☁️ Cloud agent · #214", items: ["model: unobserved; the session log names no model", "tools: ran as a subagent; count unobserved", "handoffs + argument-hint: skipped; nothing logged", "Agent test run · stopped at missing react; after setup steps, 6 passed"] }
  ]'
  :insight='{ icon: "🧾", text: "Tool counts are each runtime&#39;s own expansion of the same six aliases. Unobserved marks what the artifacts leave open." }'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Evidence label: observed resolution. This is the full table behind the cold open.
Sources: VS Code Chat Debug export, the CLI --log-level debug log, and the cloud PR description plus session log. Every observed cell comes from an artifact the team can open; unobserved marks what the available artifacts leave open.
All three runtimes recognized and invoked the agent. The tool counts compare resolution: 23 and 14 are each runtime's expansion of six aliases, and they leave capability unranked.
Three cells hold a surprise: the VS Code model, the cloud test run, and the CLI being the only runtime that wrote its model decision into a log.
-->

---

<!-- SLIDE: VS Code Run -->
# VS Code Run
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="🖥️"
  pillLabel="Runtime: VS Code · #216"
  title="VS Code Honored Most Fields; Requests Ran Another Model"
  :left='{
    header: "Observed resolution · Local session",
    icon: "✅",
    items: [
      { title: "argument-hint + handoff", detail: "Hint shown in a Local session; Review these tests opened test-reviewer" },
      { title: "23 tools · 10 tools", detail: "test-writer from six aliases; test-reviewer from read and search, read-only" },
      { title: "Agent results", detail: "Runner: 14 passed · reviewer verdict: accept" }
    ]
  }'
  :right='{
    header: "Unresolved discrepancy · model",
    icon: "❓",
    items: [
      { title: "Declared", detail: "model: Claude Sonnet 5.5 (copilot)" },
      { title: "Executed", detail: "gpt-6.1-sol on every request, per the request log" },
      { title: "Cause unresolved", detail: "The evidence does not identify why; only the request log revealed it" }
    ]
  }'
  :insight='{ icon: "🔎", text: "Read the model from the run whenever the model matters." }'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Left, observed resolution. In a Local session VS Code honored the most fields. In the first attempt the chat box showed no hint; the hint appeared once the session type was Local. The handoff button appeared after test-writer finished.
The 23 tools include apply_patch, create_file, run_in_terminal, fetch_webpage, manage_todo_list, plus VS Code's own runSubagent and vscode_askQuestions. test-reviewer, declared with read and search, ran with 10 read-only tools: the tool boundary followed the agent.
Right, unresolved discrepancy. The declared model and the executed model differed, and the cause is unresolved. Present it exactly that way. The lesson stands either way: the run's artifacts tell you which model ran.
-->

---

<!-- SLIDE: Copilot CLI Run -->
# Copilot CLI Run
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="⌨️"
  pillLabel="Runtime: Copilot CLI · #215"
  title="The Copilot CLI Resolved the Model and Logged Its Decision"
  codePosition="left"
  :code='{ language: "text", filename: "copilot --agent test-writer --log-level debug", content: "Using model \u0022claude-sonnet-5.5\u0022\n  from custom agent \u0022test-writer\u0022\n  (resolved from \u0022Claude Sonnet 5.5 (copilot)\u0022)" }'
  :features='[
    { icon: "🧠", title: "Model: resolved and logged", description: "Declared Claude Sonnet 5.5 (copilot) became claude-sonnet-5.5, in writing" },
    { icon: "🧰", title: "6 aliases → 14 CLI tools", description: "The CLI&#39;s own expansion, including web_fetch and update_todo" },
    { icon: "⏭️", title: "handoffs, argument-hint skipped", description: "The log has no entry for either field" },
    { icon: "🧪", title: "Agent test run", description: "Runner: 10 passed · test file only · 8.65 AI Credits in 2 min 14 s" }
  ]'
  :progressDots='{ current: 4, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Observed resolution, Copilot CLI 1.0.100. Run with --log-level debug and --log-dir and the CLI names its model decision, including the string it resolved from.
The six aliases became 14 tools. handoffs and argument-hint produced no log entry: quiet skipping, exactly as documented.
Runner status: 10 passed. Scope held: the agent touched the test file only. Cost: 8.65 AI Credits in 2 minutes 14 seconds.
-->

---

<!-- SLIDE: Cloud Agent First Run -->
# Cloud Agent First Run
<TwoColPairedConceptsSlide
  :partNumber="2"
  pillIcon="☁️"
  pillLabel="Runtime: Cloud Agent · #214"
  title="Cloud Agent Ran test-writer; Jest Stopped at Missing react"
  :left='{
    header: "Cloud run · execution-environment dependency",
    icon: "☁️",
    items: [
      { title: "Agent", detail: "PR: Custom agent used: test-writer · log: Begin subagent: test-writer" },
      { title: "Runner", detail: "Six tests written; Jest stopped at Cannot find module &#39;react&#39;" },
      { title: "Cause", detail: "Fresh clone, no setup steps; the agent&#39;s npm ci could not reach its package proxy" }
    ]
  }'
  :right='{
    header: "Same tests, run locally",
    icon: "💻",
    items: [
      { title: "Runner", detail: "5 passed, 1 failed" },
      { title: "Domain result", detail: "One card-wide no-Joey assertion failed; the quote&#39;s context line names Joey" },
      { title: "Reports", detail: "Agent summary carried the failure; PR description covered behaviors tested" }
    ]
  }'
  :insight='{ icon: "🧾", text: "The agent created tests and the tests are valid are two claims, each with its own proof." }'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Evidence label: execution-environment dependency. The cloud agent recognized the agent, started it as a subagent, and the agent did its job: wrote six tests and ran its command. The environment lacked the frontend dependencies.
This dependency belongs to the cloud agent itself: any cloud task that runs Jest needs it, custom agent or not.
Run locally, the runner reported 5 passed, 1 failed. Keep runner status separate from the domain result: one assertion covered the whole card, and the quote's context line legitimately mentions Joey.
-->

---

<!-- SLIDE: Cloud Recovery -->
# Cloud Recovery
<ProblemSolutionOutcomeSlide
  :partNumber="2"
  pillIcon="🔁"
  pillLabel="Runtime: Cloud Recovery · #214"
  title="Setup Steps Outside the Profile Let Cloud Jest Pass 6 of 6"
  :problem='{
    header: "First cloud run stopped",
    items: [
      "The cloud runner starts from a fresh clone",
      { title: "No frontend dependencies", detail: "FanHub had no setup steps for the Node frontend" },
      { title: "One broad assertion", detail: "The Joey test failed locally" }
    ]
  }'
  :solution='{
    header: "FanHub prepared the runtime",
    items: [
      { title: "copilot-setup-steps.yml", detail: "Installs frontend dependencies · e1675df · validation run passed" },
      { title: "@copilot comment on #214", detail: "Fix the Joey test and report exact counts" }
    ]
  }'
  :outcome='{
    header: "Cloud rerun, observed",
    items: [
      "test-writer started again; Jest ran in the cloud",
      "Code review subagent reran the file: same result",
      "Fix bf7e2c3 asserts on .attribution; local rerun 6 of 6",
      "Counts live in the reply comment; PR description kept its first text"
    ],
    metrics: [{ value: "1 suite · 6 tests", label: "passed in the cloud rerun" }]
  }'
  :insight='{ icon: "💡", text: "An agent profile describes a role; the runtime supplies the environment." }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
The memorable moment. All three runtimes recognized and invoked the same custom agent, and the cloud run still needed something the file cannot carry.
FanHub added copilot-setup-steps.yml, its validation run passed, and a comment asked @copilot to fix the Joey test and report exact counts. The follow-up session started test-writer again. Runner status: 1 suite passed, 6 tests passed in the cloud. Copilot's code review subagent reran the file with the same result, and the local rerun matched 6 of 6.
Domain result: the fix asserts on the .attribution element. The agent merged main into its branch to avoid a force-push. The PR description kept its original text, so the comment thread is where the evidence lives.
Say it once, slowly: an agent profile describes a role; the runtime supplies the environment.
-->

---

<!-- SLIDE: Part 3 — Prove the Run and Place Each Requirement -->
# Part 3 — Prove the Run and Place Each Requirement
<SectionOpenerSlide
  :partNumber="3"
  title="Prove the Run and Place Each Requirement"
  subtitle="Fill a load report per runtime, place each gap in its owning layer, and rerun the same proof"
  :cards='[
    { icon: "📋", title: "Load report", blurb: "Five questions by three runtimes, each with its debug source" },
    { icon: "🔁", title: "Load, compare, place, rerun", blurb: "Each gap gets an owning layer and a named owner" },
    { icon: "🤝", title: "Producer + checker", blurb: "test-writer hands off to read-only test-reviewer" }
  ]'
  :terminal='{ context: "gh agent-task view &lt;session&gt; --log", detail: "which agent · which model · which tools · which checks · what it reported" }'
/>

<!--
Part 3 turns every discrepancy into practice. The table at the top of this talk is the practice itself: a load report for every runtime the team uses.
-->

---

<!-- SLIDE: Load Report -->
# Load Report
<ThreeColumnCardSlide
  :partNumber="3"
  pillIcon="📋"
  pillLabel="Prove: Load Report"
  title="Fill a Load Report From Every Runtime's Own Artifacts"
  :columns='[
    { title: "🖥️ VS Code", description: "Chat Debug view · Agent Debug Log (preview)", items: ["Agent: picker; Load Agents event in the Agent Debug Log", "Model: Chat Debug view or prompt export, per request", "Tools: tool list sent with each request", "Checks: terminal output in chat", "Report: final summary"] },
    { title: "⌨️ Copilot CLI", description: "--log-level debug --log-dir &lt;dir&gt; · --share", items: ["Agent: /agent list; agent_name in the debug log", "Model: Using model … from custom agent line", "Tools: tool_names in the debug log", "Checks: session output", "Report: final summary"] },
    { title: "☁️ Cloud agent", description: "gh agent-task view &lt;session&gt; --log", items: ["Agent: Custom agent used, in the PR description", "Model: session log, when shown", "Tools: session log tool calls", "Checks: session log commands and exit codes", "Report: agent summary vs the PR description"] }
  ]'
  :insight='{ icon: "🧾", text: "Five questions per runtime: which agent, model, and tools ran; did its checks run; what did it report." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
For each runtime the team uses, record what the agent actually received. Five questions, three columns, and the source to open for each.
VS Code: the Chat Debug view shows the exact system prompt and tool definitions per request; the Agent Debug Log, in preview, adds a chronological view including which agents and instructions loaded.
CLI: debug logging plus --share keeps a transcript. Cloud: gh agent-task view with --log prints the session log, and the PR description names the agent.
-->

---

<!-- SLIDE: Load, Compare, Place, Rerun -->
# Load, Compare, Place, Rerun
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="🔁"
  pillLabel="Prove: Place Each Requirement"
  title="Load, Compare, Place, Rerun: Each Gap Has a Layer and an Owner"
  subtitle="Read the resolved run, compare it with the profile, place the gap, and rerun the same proof"
  :rows='[
    { label: "Skipped field", description: "Restate handoffs behavior in the body so every runtime carries it", tag: "agent body · producer" },
    { label: "Model differs", description: "Treat model as a preference; pin it at launch (picker, --model)", tag: "launch · developer" },
    { label: "Alias mapped", description: "Build on tools every runtime provides, or scope with target", tag: "body or target · producer" },
    { label: "Missing deps", description: "Prepare outside the profile: setup steps, dev container, script", tag: "environment · maintainer" },
    { label: "Missing proof", description: "Keep the output contract; accept work on command evidence", tag: "contract + review · reviewer" },
    { label: "Variance", description: "Agree on supported runtimes and which differences escalate", tag: "team policy · team lead" }
  ]'
  footnote="Load → compare → place → rerun: one targeted change in the owning layer, then the same proof again"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Walk the rows with the owner column in view.
Skipped field: restate the behavior in the body, for example "when finished, recommend running test-reviewer", owned by the agent producer.
Model differs: model is a preference; the developer starting the run pins it in the VS Code picker or with --model when it matters.
Alias mapped: web in the cloud is the example; build the method on capabilities every supported runtime provides, or scope the agent with target.
Missing dependencies: the repository maintainer prepares the environment outside the profile: copilot-setup-steps.yml for the cloud agent, a dev container or setup script locally.
Missing proof: the reviewer accepting the PR relies on command evidence alongside generated prose.
Variance: the team lead sets which runtimes the agent supports and which differences need escalation.
-->

---

<!-- SLIDE: Compose With Boundaries -->
# Compose With Boundaries
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🤝"
  pillLabel="Prove: Compose Agents"
  title="Pair a Narrow Producer With a Read-Only Checker"
  :left='{
    header: "Handoffs · VS Code Local",
    icon: "🤝",
    items: [
      { title: "A person between steps", detail: "A button with a prefilled prompt, sent when the person chooses" },
      { title: "test-writer → test-reviewer", detail: "The producer edits test files; the checker reads and searches only" }
    ]
  }'
  :right='{
    header: "Subagents · an agent calls an agent",
    icon: "🧩",
    items: [
      { title: "VS Code", detail: "The agents field plus the agent tool limits which agents a coordinator calls" },
      { title: "Copilot CLI", detail: "Delegates by description; subagents get repo instructions with include-custom-instructions: true" },
      { title: "Cloud agent", detail: "Ran test-writer itself as a subagent" }
    ]
  }'
  :insight='{ icon: "🔐", text: "The agent file shapes what the agent attempts. Rulesets, branch protection, hooks, permission flags, and the firewall hold authority over changes." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
The smallest useful composition: a producer with a narrow write boundary and a checker with none.
Handoffs put a person between steps. Subagents let a coordinator call a named agent. In the CLI, subagents skip repository instructions unless the profile sets include-custom-instructions: true.
Authority stays with the systems around the agent: rulesets and branch protection on GitHub, hooks and permission flags locally, and the firewall in the cloud.
-->

---

<!-- SLIDE: Apply It to Your Work -->
# Apply It to Your Work
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🎯"
  pillLabel="Prove: Transfer"
  title="Run the Load Report on an Agent Your Team Already Shares"
  :left='{
    header: "Your own-work check",
    icon: "🎯",
    items: [
      { title: "Pick", detail: "One agent your team already shares" },
      { title: "Predict", detail: "Which load-report line differs first in another runtime" },
      { title: "Run", detail: "Each runtime the team uses, with the debug sources on" },
      { title: "Place", detail: "The gap in its owning layer, then rerun the same proof" }
    ]
  }'
  :right='{
    header: "Where it stops fitting",
    icon: "🧭",
    items: [
      { title: "Local Agentic SDLC", detail: "An orchestrator calling several agents in worktrees" },
      { title: "GitHub Agentic Workflows", detail: "Event-triggered judgment with safe outputs" },
      { title: "Copilot on GitHub", detail: "The PR decision across cloud agent, code review, and Code Quality" }
    ]
  }'
  :insight='{ icon: "❓", text: "Which of your agents would behave differently tomorrow from another runtime, and which load-report line would show it first?" }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
This is the transfer exercise. Ask people to pick the agent now, before they leave the room, and write down their prediction.
Route out once: a full local SDLC loop with an orchestrator is the Local Agentic SDLC talk; event-triggered agents belong to GitHub Agentic Workflows; the pull request decision lives in Copilot on GitHub.
-->

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From One File Assumed Everywhere to a Resolved Run Read Everywhere"
  :leftItems='["One agent file assumed to behave the same in every runtime", "Declared model read as the model that ran", "Key behavior placed in runtime-specific fields", "Agent summary or PR text accepted as the result"]'
  :rightItems='["A portable core in the body; runtime fields added on purpose", "The model read from each runtime&#39;s run artifacts", "Each gap placed in its owning layer with a named owner", "Command evidence alongside generated prose, then a rerun"]'
  :metrics='[
    { value: "23 · 14", detail: "Tools from the same six aliases: VS Code and CLI expansions" },
    { value: "Cause unresolved", detail: "VS Code ran gpt-6.1-sol; agent declared Claude Sonnet 5.5" },
    { value: "6 passed", detail: "Cloud Jest rerun after copilot-setup-steps.yml" }
  ]'
/>

<!--
The shift is in what the team reads. The file is still one file. What changes is that every runtime's resolved run gets read, and every gap gets a layer and an owner.
All three metrics are observed on FanHub, 2026-10-21. The middle one is labeled cause unresolved on purpose.
-->

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='["Check one shared agent&#39;s frontmatter against the documented support matrix", "Find the winning file for that agent ID across personal, repository, and org scopes", "Open one debug source: Chat Debug view, --log-level debug, or gh agent-task view --log"]'
  :thisWeek='["Run the agent in each runtime the team uses and fill in the load report", "Move one runtime-only behavior into the body, then rerun the same proof", "Add or check copilot-setup-steps.yml so cloud runs can execute the agent&#39;s checks"]'
  :thisMonth='["Name an owner for each layer: body, launch, environment, review, policy", "Agree which runtimes each shared agent supports and which variance escalates", "Pair one producer agent with a read-only checker"]'
  footer="Design the portable core, read the resolved run, and place each requirement in the layer that owns it."
/>

<!--
Today is about reading: frontmatter, winning file, one debug source. This week is about running and placing. This month is about ownership and composition.
-->

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Custom Agent Reference", color: "cyan", items: [
        { href: "https://docs.github.com/en/copilot/reference/custom-agents-configuration", label: "Custom agents configuration reference", description: "Fields, aliases, quiet skipping" },
        { href: "https://docs.github.com/en/copilot/concepts/customizations/custom-agents", label: "About custom agents", description: "Concepts and scopes" },
        { href: "https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations", label: "Comparing customizations", description: "When a role earns a file" },
        { href: "https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference", label: "VS Code: custom agent file reference", description: "VS Code fields" }
    ] },
    { title: "🛠️ Runtimes and Run Evidence", color: "blue", items: [
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli", label: "Create custom agents for Copilot CLI", description: "CLI setup" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents", label: "Create custom agents for cloud agent", description: "Cloud setup" },
        { href: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment", label: "Customize the cloud agent environment", description: "copilot-setup-steps.yml" },
        { href: "https://code.visualstudio.com/docs/agent-customization/custom-agents", label: "VS Code: custom agents", description: "Handoffs and subagents" },
        { href: "https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view", label: "VS Code: Chat Debug view", description: "Agent Debug Log" }
    ] },
    { title: "🎬 FanHub Evidence", color: "indigo", items: [
        { href: "https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md", label: "test-writer.agent.md", description: "The agent file" },
        { href: "https://github.com/MSBart2/FanHub/pull/216", label: "#216", description: "test-writer in VS Code" },
        { href: "https://github.com/MSBart2/FanHub/pull/215", label: "#215", description: "test-writer in Copilot CLI" },
        { href: "https://github.com/MSBart2/FanHub/pull/214", label: "#214", description: "test-writer in cloud agent" }
    ] },
    { title: "🧭 Related Talks", color: "purple", items: [
        { label: "Copilot Primitives", description: "Agents among instructions, prompts, skills, hooks" },
        { label: "Copilot on GitHub", description: "Cloud agent, code review, Code Quality on one PR" },
        { label: "GitHub Agentic Workflows", description: "Event-triggered agents with safe outputs" },
        { label: "Copilot Hooks", description: "Enforcing boundaries a profile can only request" }
    ] }
  ]'
/>

<!--
Every link here was verified on 2026-10-21. The FanHub pull requests hold the raw evidence for each runtime.
-->

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Custom Agents"
  subtitle="One file, every runtime: design the core, read the run, place each requirement"
  :cards="[
    { value: '6 aliases → 23 · 14', detail: 'Each runtime expanded the same tools field its own way' },
    { value: 'claude-sonnet-5.5', detail: 'The Copilot CLI logged its model decision from test-writer' },
    { value: '6 passed', detail: 'Cloud Jest rerun after a setup workflow outside the profile' },
  ]"
  prompt="Which of your shared agents would behave differently tomorrow from another runtime, and which load-report line would show it first?"
/>

<!--
Close on the own-work question and leave it on screen during discussion.
-->
