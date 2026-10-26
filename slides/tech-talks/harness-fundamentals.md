---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Harness Fundamentals
  CopilotTraining Tech Talk
drawings:
  persist: false
transition: slide-left
title: Harness Fundamentals
mdc: true
section: "Extend and Embed"
status: active
updated: 2026-10-26
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
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="Harness Fundamentals"
  subtitle="Getting Inside the Agent Loop"
  tagline="Host Copilot&#39;s agent loop in your own code, decide what it sees, and keep the repository floor underneath."
  meta="Extend and Embed · CopilotTraining Tech Talk · 60 min · @github/copilot-sdk 1.0.26"
/>

<!--
The Copilot SDK hosts the same agent loop that runs Copilot CLI. Our code supplies everything around it: the task, the persona, the tools, the per-call decisions, and the evidence we keep.
Two apps carry the hour, both built against FanHub, a TV-show fan site with deliberately imperfect docs: a fresh-eyes onboarding check and a blind test writer.
Evidence labels: Observed means a live run on 2026-10-26 (SDK 1.0.26, model auto, FanHub 0ea9e78). Tested means a deterministic unit test in examples/. Documented means first-party docs.
-->

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How do I get inside the agent loop and change how it behaves?"
  subtext="Host the same loop as Copilot CLI and decide what the agent sees, uses, and reports."
  highlight="24 tool calls · zero source reads · three onboarding findings"
  :cards='[
    { icon: "🛠️", title: "Developers", description: "Run the agent loop from your own TypeScript and steer each tool call" },
    { icon: "🧱", title: "Platform engineers", description: "Keep repository and policy hooks in force under every host your teams build" },
    { icon: "🏛️", title: "Architects", description: "Decide which workflow earns its own host and who reads its report" },
    { title: "5 runnable steps", description: "From npm install to a permission handler, each with observed output" },
    { title: "2 working apps", description: "Fresh-eyes onboarding check and blind test writer, run against FanHub" },
    { title: "19 tests", description: "Tested hook decisions and visibility rules in examples/" }
  ]'
/>

<!--
The question is the one we hear from people who already use Copilot in the editor or the CLI: how do I get inside the loop and change how it behaves?
The teaser line is where we are headed. An agent restricted to FanHub's docs made 24 tool calls, opened zero source files, and filed three onboarding findings. We build up to that in Part 2.
Top row: who gets what from this hour. Bottom row: the runnable assets in tech-talks/harness-fundamentals/examples.
-->

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🧭", title: "Why Host the Agent", subtitle: "Copilot CLI&#39;s loop, your decisions around it", blurb: "The mental model, four workflows worth building, and the hook-or-host choice", slide: 4 },
    { icon: "🧪", title: "Build It From Zero", subtitle: "Five runnable steps, then a real onboarding tool", blurb: "Session, events, persona, tools, permissions, then the fresh-eyes friction report", slide: 8 },
    { icon: "🔭", title: "Decide What It Sees", subtitle: "One visibility policy at two SDK checkpoints", blurb: "Write-content checks, command allowlists, and a blind test writer with a referee", slide: 14 },
    { icon: "📜", title: "Prove and Own It", subtitle: "Evidence, owners, and the controls around you", blurb: "A joined event log, organization policy, and a pre-flight checklist", slide: 19 }
  ]'
/>

<!--
Arc: Why Host the Agent → Build It From Zero → Decide What It Sees → Prove and Own It.
Three outcomes for the hour:
1. Start the agent loop from your code: five short TypeScript steps from npm install to a permission handler, each with the output we observed.
2. Shape what the agent can reach: one visibility policy, applied at two SDK checkpoints, turns the same agent into an onboarding reviewer or a black-box tester.
3. Operate it with evidence and owners: repository hooks, a joined event log, organization policy, and a named report owner surround every run.
-->

---

<!-- SLIDE: Part 1 — Why Host the Agent -->
# Part 1 — Why Host the Agent
<SectionOpenerSlide
  :partNumber="1"
  title="Why Host the Agent"
  subtitle="The SDK hosts the same loop as Copilot CLI; your code sets task, persona, tools, and per-call decisions."
  :cards='[
    { icon: "🗺️", title: "The mental model", blurb: "Your app on one side, the Copilot runtime on the other" },
    { icon: "🎯", title: "What is worth building", blurb: "An agent with a deliberate perspective" },
    { icon: "🔀", title: "Hook or host", blurb: "Two ways into the loop, and how they compose" }
  ]'
  :terminal='{ context: "Observed precedence probe: repository preToolUse hook vs SDK onPreToolUse", detail: "repo deny held while the SDK hook returned allow" }'
/>

<!--
Part 1 gives the promise a shape: what the SDK hands us, which workflows earn a host, and how hooks and hosts fit together.
The terminal line previews the result that anchors this part: the repository floor held under an SDK host that said allow.
-->

---

<!-- SLIDE: What the SDK Gives You -->
# What the SDK Gives You
<CodeWithFeaturesSlide
  :partNumber="1"
  pillIcon="🗺️"
  pillLabel="Why Host · Mental model"
  title="Your app hosts the loop; the Copilot runtime plans and calls tools"
  codePosition="top"
  :code='{ language: "text", filename: "host ↔ runtime (Documented: github/copilot-sdk)", content: `Your app (the host)                         Copilot runtime (same loop as the CLI)\n  task + persona  ── systemMessage ───────▶  plan\n  tool set        ── availableTools ──────▶  pick a tool\n  domain tools    ── defineTool ──────────▶  call it; your handler answers\n  decisions       ◀── onPermissionRequest ──  every mediated read, write, shell call\n  raw arguments   ◀── onPreToolUse ─────────  inspect before the permission layer\n  evidence        ◀── session.on(...) ──────  deltas, tool calls, results, hook runs\nRepository hooks (.github/hooks/*.json) ── enableFileHooks: true ──▶ run inside your session` }'
  :features='[
    { icon: "🔁", title: "Same agent loop", description: "SDK → JSON-RPC → Copilot runtime, started and stopped for you" },
    { icon: "🎛️", title: "Your decisions", description: "Persona, tool set, domain tools, and an answer for every mediated call" },
    { icon: "📈", title: "Your evidence", description: "Stream events to render, count, budget, and store" },
    { icon: "🧱", title: "Repository floor", description: "Opt in and the team&#39;s .github/hooks rules run in your session" }
  ]'
  :insight='{ icon: "📖", text: "Documented: the SDK talks to the Copilot runtime over JSON-RPC; organization policy still sets access, models, and billing." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Audience question: what does the SDK give me?
Read the diagram left to right. Our app, the host, sends the task and persona through systemMessage, the tool set through availableTools, and our own tools through defineTool. The Copilot runtime plans and picks tools.
Arrows coming back are the decision points: onPermissionRequest for every mediated read, write, and shell call, onPreToolUse for raw arguments, and session events for evidence.
The bottom line matters for platform teams: with enableFileHooks set, repository hooks run inside our session too.
The full capability table, including structured output and authentication routes, sits in the README and references.
-->

---

<!-- SLIDE: What Is Worth Building -->
# What Is Worth Building
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="Why Host · Deliberate perspective"
  title="The payoff is a Copilot agent with a deliberate perspective"
  :cards='[
    { icon: "🙈", title: "Hide the source → onboarding check", description: "Can a newcomer run it from the docs alone? Built: 3 findings, 0 source reads (Observed 2026-10-26)" },
    { icon: "🧪", title: "Hide the implementation → blind tests", description: "Does the API match its contract? Built: host rerun 10 passing, 2 failing (Observed 2026-10-26)" },
    { icon: "🔍", title: "Show only the diff → PR reviewer", description: "Is this PR understandable from its description and diff alone? Pattern to build next" },
    { icon: "🧭", title: "Guide commands only → migration check", description: "Would this migration guide work on a clean machine? Pattern to build next" }
  ]'
  :insight='{ icon: "🔑", text: "Same host, three answers per workflow: what the agent may see, what it may use, and who reads its report." }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Audience question: what is worth building?
A full-access agent answers "make this work." A constrained one answers questions a full-access agent cannot, because what it may see defines the question.
The top two cards are the apps we build today, with their observed results. The bottom two are the same host with different rules, ready for your repository.
Ask the room: which workflow on your team would benefit from a fresh, constrained perspective?
-->

---

<!-- SLIDE: Hook or Host -->
# Hook or Host
<TwoColPairedConceptsSlide
  :partNumber="1"
  pillIcon="🔀"
  pillLabel="Why Host · Two ways in"
  title="Hooks reach every harness; a host owns its sessions"
  :left='{
    header: "Repository hook (preToolUse)",
    icon: "🪝",
    items: [
      { title: "Lives in .github/hooks/ or machine policy", detail: "Every harness that loads it: CLI, VS Code, cloud agent" },
      { title: "Crash or non-zero exit → deny; timeout → allow", detail: "One JSON object on stdout; the reason is shown to the agent" }
    ],
    code: { language: "json", content: `{ "permissionDecision": "deny",\n  "permissionDecisionReason":\n    "Protected path (database): …" }` }
  }'
  :right='{
    header: "SDK host (your app)",
    icon: "🏠",
    items: [
      { title: "Lives in your code; sees the whole session", detail: "History, state, your app&#39;s identity and data" },
      { title: "Sets persona, tools, decisions, budgets", detail: "You own auth, version pins, lifecycle, cleanup" }
    ],
    code: { language: "text", content: `Observed 2026-10-26 · precedence probe\nrepo preToolUse hook → deny\nSDK onPreToolUse     → allow\nresult → call denied; SDK callbacks\n         never invoked` }
  }'
  :insight='{ icon: "🧱", text: "Set enableFileHooks: true and the data team&#39;s database deny holds under any host that loads it." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
Audience question: hook or host?
Left, the repository hook. FanHub's pre-tool-use.mjs denies any mediated access to node/backend/src/database and fanhub.db files, because the data team owns them. The contract from the hooks reference: a crash or non-zero exit denies, a timeout allows, stdout carries exactly one JSON object, and the reason is shown to the agent so it can pick another route.
Tested: FanHub's hook completes in about 55 ms against a 5-second budget. Keep hooks local and fast, since a timeout is fail-open.
Right, the SDK host. It sees the whole session and decides persona, tools, and per-call answers.
The observed probe is the reason they compose: the repository deny held while our SDK onPreToolUse returned allow, and the SDK callbacks were never invoked for that call. Teams keep their floor, and each app adds the rules its purpose needs.
-->

---

<!-- SLIDE: Part 2 — Build It From Zero -->
# Part 2 — Build It From Zero
<SectionOpenerSlide
  :partNumber="2"
  title="Build It From Zero"
  subtitle="Five runnable TypeScript steps from npm install to a permission handler, then a real onboarding tool."
  :cards='[
    { icon: "▶️", title: "Session and events", blurb: "One answer, then watch every tool call stream" },
    { icon: "🎭", title: "Persona and tools", blurb: "Decide who the agent is and what it can use" },
    { icon: "🛂", title: "Permissions and payoff", blurb: "Per-call decisions, then the fresh-eyes check" }
  ]'
  :terminal='{ context: "npx tsx sdk-quickstart/05-permissions.ts", detail: "shell rejected → 6 approved reads → correct counts" }'
/>

<!--
Part 2 is the code we came for. Every step is a short file in examples/sdk-quickstart, runnable with npx tsx.
Step 05 runs live on stage. The other evidence slides show recorded runs from 2026-10-26.
-->

---

<!-- SLIDE: Steps 01–02 — Session and Events -->
# Steps 01–02 — Session and Events
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="▶️"
  pillLabel="Build · Steps 01–02"
  title="Five lines start a session; listeners stream every agent move"
  codePosition="left"
  :code='{ language: "ts", filename: "sdk-quickstart/01 + 02 (trimmed)", content: `const client = new CopilotClient();\nconst session = await client.createSession({\n  model: "auto", streaming: true,\n  onPermissionRequest: approveAll });\n\nsession.on("assistant.message_delta",\n  (e) => process.stdout.write(e.data.deltaContent));\nsession.on("tool.execution_start",\n  (e) => console.log("[tool]", e.data.toolName));\nsession.on("session.idle", () => console.log("[idle]"));\n\nawait session.sendAndWait({\n  prompt: "How do I run this project? Two sentences." });` }'
  :features='[
    { icon: "👀", title: "Observed 2026-10-26 · trace", description: "[tool] powershell → [tool] view ×3 → streamed answer → [idle]" },
    { icon: "✅", title: "Observed 2026-10-26 · answer", description: "Copilot agent returned a correct two-sentence answer about examples/" },
    { icon: "📊", title: "Your app owns the trace", description: "Render it, count tool calls, enforce a budget, store it" }
  ]'
  :insight='{ icon: "🧰", text: "Before you start: Node 20+ · npm install in examples/ · default auth = signed-in Copilot CLI user" }'
  :progressDots='{ current: 1, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Audience question: how little code starts the loop?
Step 01 is createSession plus sendAndWait. Step 02 adds streaming and three listeners. The runtime is bundled with the SDK package and started for us.
Observed trace: one powershell call, three view calls, the streamed answer, then idle. On Windows the built-in tools include powershell, view, glob, and grep.
Footer: with no options, the SDK uses the signed-in Copilot CLI user, so sessions follow that user's license, policies, and billing. A token or BYOK provider selects a different route, covered in Part 4.
Run anything that installs packages or starts servers in a disposable environment; the apps later clone FanHub into a temp folder per run.
-->

---

<!-- SLIDE: Step 03 — Decide Who the Agent Is -->
# Step 03 — Decide Who the Agent Is
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🎭"
  pillLabel="Build · Step 03 Persona"
  title="A persona works when it states a behavior you can check"
  codePosition="left"
  :code='{ language: "ts", filename: "sdk-quickstart/03 (trimmed)", content: `systemMessage: {\n  mode: "customize",\n  sections: {\n    custom_instructions: {\n      action: "append",\n      content:\n        "You are a first-day engineer who trusts " +\n        "only written documentation. " +\n        "Cite the file behind every step. …",\n    },\n  },\n},` }'
  :features='[
    { icon: "📎", title: "Observed 2026-10-26 · checkable line", description: "Same question; the Copilot agent cited a file on every step" },
    { icon: "🌫️", title: "Observed · attitude-only line", description: "An earlier persona describing a mood produced no visible change" },
    { icon: "🛡️", title: "customize keeps the guardrails", description: "Edits one named section; replace swaps the whole prompt (Documented)" }
  ]'
  :insight='{ icon: "✍️", text: "Write the persona as a behavior a reviewer can verify: cite, label, report, stop." }'
  :progressDots='{ current: 2, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Audience question: how do I decide who the agent is?
customize mode edits one named section of the system prompt and keeps the runtime's safety and tool sections in place. replace mode swaps the entire prompt, and the SDK's guardrails go with it.
The observed contrast is the lesson. A line that asked for a citation on every step showed up in the output immediately. An earlier, softer line that described an attitude produced no visible change.
The full persona also asks the agent to label steps that come from code or config as undocumented. That label becomes useful in the fresh-eyes app.
-->

---

<!-- SLIDE: Step 04 — Decide What It Can Use -->
# Step 04 — Decide What It Can Use
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🧰"
  pillLabel="Build · Step 04 Tools"
  title="Narrow the tool set, add your own; the agent plans with both"
  codePosition="left"
  :code='{ language: "ts", filename: "sdk-quickstart/04 (trimmed)", content: `const lookupOwner = defineTool("lookup_owner", {\n  description:\n    "Return the team that owns a repository path.",\n  parameters: { type: "object",\n    properties: { path: { type: "string" } } },\n  handler: async ({ path }) =>\n    /* answer from your own systems */,\n});\nconst session = await client.createSession({\n  model: "auto", onPermissionRequest: approveAll,\n  availableTools: ["view", "glob", "grep", "lookup_owner"],\n  tools: [lookupOwner],\n});` }'
  :features='[
    { icon: "🙋", title: "Practitioner asks", description: "Who reviews node/backend/src/routes/characters.js? Then run git log." },
    { icon: "🤖", title: "Observed 2026-10-26 · Copilot agent", description: "Called lookup_owner and answered “api-team”" },
    { icon: "🚫", title: "Observed · no shell offered", description: "“couldn&#39;t run git log because this session doesn&#39;t provide a command-execution tool”" }
  ]'
  :insight='{ icon: "🧭", text: "A tool that is never offered is never requested: the tool set shapes the plan before any permission check runs." }'
  :progressDots='{ current: 3, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Audience question: how do I decide what the agent can use?
defineTool gives the agent a domain tool whose handler answers from our own systems: owners, contracts, tickets, findings. availableTools lists exactly what the session offers.
Observed: the practitioner asked who reviews the characters route and then asked for git log. The Copilot agent called lookup_owner, answered api-team, and explained that the session had no command-execution tool.
This is the cheapest control we have. Removing a capability changes the plan the agent makes, and it happens before the permission layer sees anything.
-->

---

<!-- SLIDE: Step 05 — Decide What It Can Do -->
# Step 05 — Decide What It Can Do
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="🛂"
  pillLabel="Build · Step 05 Permissions · Live demo"
  title="The host rejects the shell; the agent recovers through reads"
  codePosition="left"
  :code='{ language: "ts", filename: "sdk-quickstart/05-permissions.ts (trimmed)", content: `const onPermissionRequest: PermissionHandler =\n  (request) => {\n    if (request.kind === "read")\n      return { kind: "approve-once" };\n    return {\n      kind: "reject",\n      feedback: "This session is read-only. " +\n        "Use the view tool to inspect files.",\n    };\n  };` }'
  :features='[
    { icon: "⛔", title: "Practitioner asks · host rejects", description: "“Count lines in each .ts file”: shell call rejected with feedback" },
    { icon: "🔁", title: "Observed 2026-10-26 · recovery", description: "Copilot agent switched to view: 6 approved reads, correct counts" },
    { icon: "📂", title: "Reads ask too", description: "In-repo reads raise kind: read with request.path, so the host governs what it sees" }
  ]'
  :insight='{ icon: "💬", text: "The feedback string shapes the recovery: the agent read “use the view tool” and did exactly that." }'
  :progressDots='{ current: 4, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
LIVE DEMO CUE: from tech-talks/harness-fundamentals/examples run
  npx tsx sdk-quickstart/05-permissions.ts
Look for a [reject] shell line, then the agent recovering through approved view reads. If the network or runtime is slow, the recorded 2026-10-26 run on this slide is the fallback: shell rejected, 6 approved reads, correct line counts.
Audience question: how do I decide what the agent can do, call by call?
The practitioner prompt adds "using a shell command if that is fastest"; the recorded run shows the agent proposing Get-ChildItem … | Measure-Object, which the host handler rejected with the feedback string.
Two details carry into Part 3. First, reads inside the working directory raise permission requests too, so a handler governs what the agent sees as well as what it changes. Second, the feedback string is a steering tool: name the rule and point to the allowed route.
Each request kind carries detail: read has path; write has fileName and newFileContents; shell has fullCommandText, commands, possiblePaths, and hasWriteFileRedirection; custom-tool has toolName. Documented in the SDK 1.0.26 type definitions.
-->

---

<!-- SLIDE: Payoff — Fresh-Eyes Onboarding Check -->
# Payoff — Fresh-Eyes Onboarding Check
<FrameworkMappingRowsSlide
  :partNumber="2"
  pillIcon="👀"
  pillLabel="Build · Payoff · Fresh-eyes onboarding check"
  title="A docs-only agent found that FanHub&#39;s two Node.js guides disagree"
  subtitle="Host decisions: clean clone per run · docs-only reads, src/ hidden · report_friction tool · 80-call budget"
  :rows='[
    { label: "confusing", description: "README.md: Docker Desktop, port 3001 · SETUP.md: no Docker, port 5265", tag: "README vs SETUP" },
    { label: "blocker", description: "“Node.js 18+” only; on Node 24, better-sqlite3 needs Python to build", tag: "node/SETUP.md" },
    { label: "confusing", description: "No native-install fallback; agent used npm exec --package=node@20", tag: "node/SETUP.md" },
    { label: "host deny", description: "Node.js archive download outside the allowlist; filed as friction", tag: "host policy · 1 of 21" }
  ]'
  footnote="Observed 2026-10-26: 24 tool calls · zero source reads · GET /api/characters → 200 · report goes to the docs owner"
  :progressDots='{ current: 5, total: 5, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Audience question: what does five steps of SDK buy me?
apps/fresh-eyes/app.ts asks one question: can a capable newcomer get FanHub's Node.js track running from the documentation alone?
The host decides everything around the loop. It clones FanHub at a pinned commit into a temp folder, gives the Copilot agent a first-day-engineer persona that reports friction before working around it, hides every src folder, allows writes to .env only and an allowlist of setup commands, and stops at 80 tool calls with session.abort().
report_friction is a few lines of defineTool with step, docSays, reality, doc, and severity. It turns the agent's experience into structured data.
Observed: 24 tool calls, 20 allowed and 1 denied by the host, zero source files opened, and the agent reached GET /api/characters with a 200. The one denial was an ad-hoc script to download a Node.js archive, outside the allowlist; the agent recorded that as friction and moved to an allowed route.
A person who already knows the project reads past every one of these. The docs owner reads this report and decides which findings to fix. Each run starts from a clean clone, so the same check runs in CI after every docs change.
-->

---

<!-- SLIDE: Part 3 — Decide What It Sees -->
# Part 3 — Decide What It Sees
<SectionOpenerSlide
  :partNumber="3"
  title="Decide What It Sees"
  subtitle="One visibility policy at two SDK checkpoints; the blind test writer is the deeper verification case."
  :cards='[
    { icon: "🔭", title: "Two checkpoints", blurb: "Raw arguments first, parsed requests second" },
    { icon: "🔬", title: "What a host can check", blurb: "Write contents and per-segment commands" },
    { icon: "⚖️", title: "Blind tests + referee", blurb: "Host reruns the suite; a referee maps failures" }
  ]'
  :terminal='{ context: "Host rerun of the blind-test suite (Observed 2026-10-26)", detail: "10 passing · 2 failing · 1 undocumented contract mismatch" }'
/>

<!--
Part 3 generalizes the fresh-eyes control model into a reusable policy, then takes it further with a black-box tester whose results the host verifies itself.
-->

---

<!-- SLIDE: One Policy, Two Checkpoints -->
# One Policy, Two Checkpoints
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="🔭"
  pillLabel="Sees · Visibility policy"
  title="One visibility policy, applied at both SDK checkpoints"
  codePosition="left"
  :code='{ language: "ts", filename: "host-kit/visibility.ts (usage, trimmed)", content: `const policy = createVisibilityPolicy({\n  repoRoot: checkout.dir,\n  hidden: isHiddenFromBlindTester, // never visible\n  readable: isBlindReadable,       // read allowlist\n  writable: isBlindWritable,       // where it may write\n  shellCommands: BLIND_SHELL,      // executables\n  customTools: new Set(["api_contract"]),\n});\n\ncreateSession({ ...,\n  onPermissionRequest: policy.onPermissionRequest,\n  hooks: { onPreToolUse: policy.onPreToolUse } });` }'
  :features='[
    { icon: "1️⃣", title: "hooks.onPreToolUse · raw arguments", description: "Catches a grep whose scope sweeps a hidden folder, or a view of a hidden path" },
    { icon: "2️⃣", title: "onPermissionRequest · parsed request", description: "Checks reads, writes, write contents, and shell executables" },
    { icon: "🧪", title: "Plain predicates over repo paths", description: "Tested: every rule unit-tests with real request shapes" }
  ]'
  :insight='{ icon: "👁️", text: "Observed 2026-10-26 · host policy, pre-tool: view node/backend/__tests__/readme.md → deny (rule: hidden)" }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Audience question: how do I express what the agent sees?
Both apps share host-kit/visibility.ts. An app supplies plain predicates over repo-relative paths: hidden, readable, writable, plus shell commands and the custom tools it serves. Every rule unit-tests.
The policy uses both SDK checkpoints because each sees something the other does not. onPreToolUse sees raw arguments for every tool, so it catches searches that would sweep a hidden folder. onPermissionRequest sees the runtime's parsed request, so it checks reads, writes, write contents, and executables.
The insight line is a real decision from the blind run: Markdown is hidden from the blind tester, so a view of a README in the test folder was denied at the pre-tool checkpoint.
Fresh-eyes and blind tests use the same engine with opposite predicates: fresh-eyes hides src and allows docs; blind tests hides docs and allows the test folder.
-->

---

<!-- SLIDE: What a Host Can Check -->
# What a Host Can Check
<TwoColPairedConceptsSlide
  :partNumber="3"
  pillIcon="🔬"
  pillLabel="Sees · Host-only checks"
  title="A host checks what a call would do, using the runtime&#39;s analysis"
  :left='{
    header: "Write-content inspection",
    icon: "📝",
    items: [
      { title: "Copilot agent proposes a test file", detail: "Its contents would read hidden source when the test runs" },
      { title: "Host policy rejects the write", detail: "Tested" }
    ],
    code: { language: "text", content: `write  node/backend/__tests__/blind/x.test.js\n  contains readFileSync(&#39;../../src/…&#39;)\nhost → reject: “That file would read hidden\n        material when it runs.”` }
  }'
  :right='{
    header: "Per-segment command allowlist",
    icon: "🧩",
    items: [
      { title: "Host splits every shell command", detail: "Separators inside quoted arguments stay intact" },
      { title: "Each executable checked", detail: "Tested with 5 command shapes" }
    ],
    code: { language: "text", content: `cd node/backend; npm start | tee log\n  → segments: cd · npm · tee   each checked\nObserved 2026-10-26: git status --short\n  → deny: command-not-allowed:git` }
  }'
  :insight='{ icon: "🏠", text: "A hook script receives the call&#39;s arguments; the host also holds the runtime&#39;s analysis, the session&#39;s state, and its own tools." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Audience question: what can a host check that a hook script finds hard?
Left: write-content inspection. The write request carries newFileContents, so the host sees that a proposed test would call readFileSync on hidden source when it runs, and rejects the write with a reason the Copilot agent can act on. Covered by a deterministic test.
Right: per-segment allowlists. The host splits a compound command into its executables and checks each one, while separators inside quoted arguments stay part of the argument. Tested with five command shapes.
The observed git status denial comes from the blind run's event log: git sits outside the blind tester's allowlist.
-->

---

<!-- SLIDE: Blind Test Writer — Setup -->
# Blind Test Writer — Setup
<FrameworkMappingRowsSlide
  :partNumber="3"
  pillIcon="⚖️"
  pillLabel="Sees · Blind test writer"
  title="The blind tester sees a contract and a running server, and nothing else"
  subtitle="Does the API behave the way its contract says, judged by an agent that has never seen the code?"
  :rows='[
    { label: "Environment", description: "Clean clone, npm install; the host starts the server on port 5299", tag: "host" },
    { label: "API view", description: "api_contract tool built from SETUP.md, every bug hint stripped", tag: "defineTool" },
    { label: "Hidden", description: "Backend src, frontend, docs/, the database, all Markdown incl. BUGS.md", tag: "visibility policy" },
    { label: "Writable", description: "node/backend/__tests__/blind/ only; failing tests never weakened", tag: "visibility policy" },
    { label: "Proof", description: "The host reruns the suite itself and records TAP output", tag: "host rerun" },
    { label: "Referee", description: "Read-only session reads BUGS.md + source, classifies each failure", tag: "referee session" }
  ]'
  footnote="Observed 2026-10-26: 18 tool calls · 19 allowed and 2 denied by host policy · 5 test files written"
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Audience question: how do I set up an agent to test an API it has never seen?
apps/blind-tests/app.ts asks the opposite question from fresh-eyes. The Copilot agent gets an api_contract tool and a live server, and the visibility policy hides everything else, including BUGS.md.
Two roles keep the result honest. The host reruns the tests and records TAP output, so the agent's own account is a summary. A separate read-only referee session, with view, grep, and glob, reads BUGS.md and the source and classifies each failure.
Observed run: the agent called api_contract, wrote five test files covering characters, episodes, shows, quotes, and authentication, and ran them.
-->

---

<!-- SLIDE: Blind Test Writer — Result and Boundaries -->
# Blind Test Writer — Result and Boundaries
<CodeWithFeaturesSlide
  :partNumber="3"
  pillIcon="📋"
  pillLabel="Sees · Result and boundaries"
  title="Host rerun: 10 pass, 2 fail; one gap is undocumented"
  codePosition="top"
  :code='{ language: "text", filename: "Observed 2026-10-26 · host rerun (TAP) + referee session", content: `POST /api/characters returns 201 for valid input\n  test: FAIL — received 500\n  referee: BUGS.md #19, Missing Input Validation\nGET /api/episodes?seasonId=1 returns only season 1\n  test: FAIL — episodes from every season\n  referee: undocumented · SETUP.md documents seasonId; the route reads season_id` }'
  :features='[
    { icon: "🧱", title: "Repository floor active", description: "Observed: 19 preToolUse runs in fresh-eyes, 12 in blind tests" },
    { icon: "🎲", title: "Runs vary", description: "Run A: 9 passing, 5 failing → #9, #6, #17. The host rerun and referee keep it honest" },
    { icon: "📦", title: "Executed tests run free", description: "node --test has full process access; a container sets the outer limit" },
    { icon: "👤", title: "API owner decides", description: "A failing blind test is a disagreement; the API owner picks which side changes" }
  ]'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Audience question: what did the blind tester find, and where does the host's view end?
Read the test lines and the referee lines separately. Test status is the runner's verdict: FAIL, received 500. The referee's line is the domain finding: BUGS.md #19, missing input validation.
The second row is the point. SETUP.md documents seasonId, the route reads season_id, so the filter is silently ignored. The referee, with read access to BUGS.md and the route source, found no matching entry and labeled it undocumented, leaving the nearby cache entry, #2, unassigned.
Repository floor: FanHub's hooks ran inside both apps, 19 preToolUse and 22 postToolUse in fresh-eyes, 12 and 16 in blind tests. Neither agent reached for the database, so the floor never had to deny, and it was in place for every call.
Boundaries: the policy decides tool calls. Code our tests execute runs with full process access, so a container sets the outer limit. And the API owner decides whether the contract or the code changes.
-->

---

<!-- SLIDE: Part 4 — Prove and Own It -->
# Part 4 — Prove and Own It
<SectionOpenerSlide
  :partNumber="4"
  title="Prove and Own It"
  subtitle="A joined evidence log, named owners, the organization controls around your app, and a pre-flight checklist."
  :cards='[
    { icon: "🧾", title: "Evidence and owners", blurb: "Every decision logged and joined by sessionId" },
    { icon: "🏢", title: "Controls around you", blurb: "Policy hooks, access, models, billing, reach" },
    { icon: "✅", title: "Pre-flight", blurb: "What to settle before someone else runs it" }
  ]'
  :terminal='{ context: "events.jsonl from the blind run (Observed 2026-10-26)", detail: "repo-hook + host-policy + runtime + host, joined by sessionId" }'
/>

<!--
Part 4 turns a working tool into one other people can run: evidence they can inspect, owners who act on it, and the controls that surround the app.
-->

---

<!-- SLIDE: Evidence and Owners -->
# Evidence and Owners
<CodeWithFeaturesSlide
  :partNumber="4"
  pillIcon="🧾"
  pillLabel="Own It · Evidence log"
  title="Every run leaves a joined event log and a named findings owner"
  codePosition="top"
  :code='{ language: "json", filename: "Observed 2026-10-26 · .runs/blind-tests/events.jsonl (4 lines, trimmed)", content: `{"layer":"repo-hook","event":"hook.end","sessionId":"909bf25c-…","hook":"preToolUse","success":true}\n{"source":"host-policy","layer":"pre-tool","kind":"view","decision":"deny","rule":"hidden"}\n{"layer":"runtime","event":"tool.complete","sessionId":"909bf25c-…","success":true}\n{"layer":"host","event":"session-end","sessionId":"909bf25c-…","toolCalls":18,"allow":19,"deny":2}` }'
  :features='[
    { icon: "⚖️", title: "Decisions apart from executions", description: "An allowed call can still fail" },
    { icon: "🔒", title: "Names, rules, counts", description: "File contents and command output stay out by construction" },
    { icon: "🏁", title: "Host is the source of truth", description: "It reruns the suite; the friction report comes from tool calls" }
  ]'
  :insight='{ icon: "👥", text: "Platform team publishes policy → practitioner defines the workflow → Copilot agent works → host records and verifies → docs or API owner accepts or routes" }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Audience question: what evidence does a run leave, and who acts on it?
host-kit/run-log.ts writes one JSON line per event from every layer: the repository hook, the host policy, the runtime, and the host itself. These four lines come from the blind run.
Every run also writes a human-readable report, friction-report.md or blind-report.md, with the outcome, tool-call count, policy totals, findings, and the list of host denials.
The owner lifecycle on the bottom bar is the operating model. The platform team publishes the policy and boundary. The practitioner defines the workflow and rules. The Copilot agent performs mediated work. The host records and verifies. The docs owner or API owner accepts or routes the findings.
-->

---

<!-- SLIDE: The Controls Around Your App -->
# The Controls Around Your App
<FrameworkMappingRowsSlide
  :partNumber="4"
  pillIcon="🏢"
  pillLabel="Own It · Surrounding controls"
  title="Your app runs inside decisions other people own"
  subtitle="Documented: GitHub Copilot hooks reference, Copilot policies, supported models, SDK authentication"
  :rows='[
    { label: "Policy hooks", description: "Load machine-wide before repo hooks; run even under disableAllHooks", tag: "platform team" },
    { label: "Access", description: "Who may use Copilot where; verify the identity your app runs as", tag: "org admins" },
    { label: "Models", description: "Admins set availability; model: auto is a request; log what ran", tag: "admins · your app" },
    { label: "Billing", description: "User or token route: Copilot policy and billing. BYOK: provider terms", tag: "auth route" },
    { label: "Tools and MCP", description: "availableTools plus managed settings; managedApprovalRequired → human", tag: "admins · handler" },
    { label: "Process reach", description: "OS account, container, network: the outer boundary for installs", tag: "platform · service owners" }
  ]'
  footnote="Policy hooks follow the same contract: a timeout is fail-open, so keep them local and fast"
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Audience question: which controls surround my app?
Policy hooks are the administrator's way in. Copilot CLI loads machine-wide hooks first, from C:\ProgramData\GitHub\Copilot\policy.d, /etc/github-copilot/policy.d, or the HKLM Software Policies GitHub Copilot registry key, and disableAllHooks leaves them running. A platform team can put the database rule there for every developer machine.
Model choice is a request inside what the organization allows; record what the session used. Billing follows the authentication route: signed-in user and token routes follow Copilot licensing and policy, and BYOK follows the provider's terms and needs its own review.
Requests flagged managedApprovalRequired need a human approval path in the handler.
For pull-request acceptance, see the Copilot on GitHub talk.
-->

---

<!-- SLIDE: Pre-flight and How Deep to Go -->
# Pre-flight and How Deep to Go
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="✅"
  pillLabel="Own It · Pre-flight"
  title="Settle five things before someone else runs your app"
  :left='{
    header: "Pre-flight checklist",
    icon: "📋",
    items: [
      "Pin the SDK; log the runtime version",
      "Clean, pinned checkout for every run",
      "Budget, timeout, and cleanup in finally",
      "Test each rule; enableFileHooks: true",
      "Name auth route, model, report owner"
    ]
  }'
  :right='{
    header: "How deep to go",
    icon: "🪜",
    items: [
      { title: "Start at the shallowest layer that works", detail: "Each step down adds code you own" }
    ],
    code: { language: "text", content: `Steering note at session start enough?\n  → sessionStart hook. Done.\nA call must never run, in any harness?\n  → preToolUse or policy hook, fast\nNeeds persona, tools, visibility,\nbudget, or a report?\n  → SDK host + enableFileHooks: true` }
  }'
  :insight='{ icon: "🧪", text: "Tested: npm test runs 19 tests across the repository hook decisions and the visibility rules." }'
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Audience question: what do I settle before sharing the app, and how deep do I go?
Left: the pre-flight checklist from the README, condensed to five lines. The last line is the one teams skip most often: name the person who reads each report and decides what changes.
Right: the decision tree. A sessionStart hook covers steering notes. A preToolUse or policy hook covers calls that must never run anywhere. An SDK host earns its keep when the workflow needs its own persona, tool set, visibility, budget, or structured report, and enableFileHooks keeps the repository floor underneath.
-->

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From a general agent to a host with a deliberate view"
  :leftItems='[
    "The agent sees the whole repository and answers “make this work”",
    "Tool set and permissions follow the harness defaults",
    "Findings live in the agent&#39;s closing summary",
    "Repository rules apply inside the editor and CLI"
  ]'
  :rightItems='[
    "A docs-only agent: 24 tool calls, zero source reads, three findings",
    "The host rejects a shell call with feedback; the agent recovers via 6 reads",
    "The host reruns 12 blind tests; a referee maps #19 and one undocumented gap",
    "The repository deny holds under an SDK allow, inside every host"
  ]'
  :metrics='[
    { value: "0", detail: "source files opened by the fresh-eyes agent (Observed)" },
    { value: "10 / 2", detail: "passing / failing on the blind-test host rerun (Observed)" },
    { value: "19", detail: "hook and visibility-rule tests in examples/ (Tested)" }
  ]'
/>

<!--
Left: a capable general agent, which is the right default for most work. Right: what the same loop does when our code decides what it sees, uses, and reports.
Every right-hand item and metric is observed on 2026-10-26 or covered by a deterministic test.
-->

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "cd tech-talks/harness-fundamentals/examples and run npm install",
    "Run npx tsx sdk-quickstart/01-hello.ts for your first session",
    "Run 05-permissions.ts and look for a [reject] shell line, then approved reads"
  ]'
  :thisWeek='[
    "Run npm test and confirm all 19 hook and visibility tests pass",
    "Run npm run fresh-eyes and open friction-report.md",
    "Run npm run blind-tests; find host denials and repo preToolUse runs for one sessionId"
  ]'
  :thisMonth='[
    "Copy host-kit/ and one app into a workflow of your own",
    "Rewrite the rules for what the agent sees, writes, and runs; test each with real paths",
    "Run it on a clean clone and hand the first report to its owner"
  ]'
  footer="Pick one workflow that needs a fresh, constrained perspective, and decide what your agent sees, uses, and who reads its report."
/>

<!--
Today is fifteen minutes. This week is about an hour: set FANHUB_SOURCE to a local FanHub clone to skip the network clone. This month is two to four hours to point one app at your own repository.
Transfer question for the room: pick one workflow where a fresh, constrained perspective would help, such as setup docs, an API contract, a PR description, or a runbook. What does your agent see, what stays hidden, which tools does it get, and who reads its report?
-->

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "📖 Copilot SDK", color: "cyan", items: [
        { href: "https://github.com/github/copilot-sdk", label: "GitHub Copilot SDK repository", description: "Architecture, sessions, tools, hooks, examples" },
        { href: "https://www.npmjs.com/package/@github/copilot-sdk", label: "@github/copilot-sdk on npm", description: "1.0.26 used in this talk: permission kinds, systemMessage modes, enableFileHooks" },
        { href: "https://github.com/github/copilot-sdk/tree/main/docs/auth", label: "Copilot SDK authentication", description: "Signed-in user, token, and BYOK routes" }
    ] },
    { title: "🪝 Hooks and Policy", color: "indigo", items: [
        { href: "https://docs.github.com/en/copilot/reference/hooks-reference", label: "GitHub Copilot hooks reference", description: "preToolUse decisions, fail-closed and fail-open rules, policy hook locations" },
        { href: "https://code.visualstudio.com/docs/agent-customization/hooks", label: "VS Code agent hooks (Preview)", description: "The editor&#39;s hook format and event coverage" },
        { href: "https://docs.github.com/en/copilot/concepts/enterprise/policies", label: "Copilot policies for enterprises and organizations", description: "AI controls for features, agents, and models" },
        { href: "https://docs.github.com/en/copilot/reference/ai-models/supported-models", label: "Supported AI models in GitHub Copilot", description: "Availability by plan and surface" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
        { label: "tech-talks/harness-fundamentals/examples", description: "Quickstart steps 01–05, host-kit, fresh-eyes and blind-test apps, 19 tests" },
        { label: "Copilot Primitives · Custom Agents", description: "The building blocks a host configures" },
        { label: "Copilot on GitHub · Enterprise Patterns", description: "Pull-request acceptance and organization rollout" }
    ] }
  ]'
/>

<!--
All links verified 2026-10-26. The examples folder is the hands-on companion for everything shown today.
-->

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Harness Fundamentals"
  subtitle="Getting Inside the Agent Loop"
  :cards='[
    { value: "24 · 0 · 3", detail: "Tool calls, source reads, and onboarding findings from a docs-only agent" },
    { value: "10 ✓ · 2 ✗", detail: "Blind-test host rerun; the referee mapped #19 and labeled one gap undocumented" },
    { value: "deny holds", detail: "A repository preToolUse deny held while the SDK hook returned allow" }
  ]'
  prompt="Which workflow on your team would benefit from an agent that sees less?"
/>

<!--
Close on the transfer question. Invite people to run step 05 today and to name one workflow and one report owner before they leave.
-->
