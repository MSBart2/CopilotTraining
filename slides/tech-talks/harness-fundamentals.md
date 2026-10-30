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
updated: 2026-10-30
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
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
</script>

<!-- SLIDE: Title -->
# Title
<TitleSlide
  title="Harness Fundamentals"
  subtitle="Getting Inside the Agent Loop"
  tagline="Understand the loop, then bring AI into your existing apps with tools, controls, and telemetry."
  meta="Extend and Embed · CopilotTraining Tech Talk · 60 min · @github/copilot-sdk 1.0.26"
/>

---

<!-- SLIDE: Core Question -->
# Core Question
<CoreQuestionSlide
  question="How do I get inside the agent loop and change how it behaves?"
  subtext="A harness is just a loop: ask the model, run what it asks for, feed back the result, repeat."
  highlight="Take over the right job, and the agent sees, uses, and does what your workflow needs."
  :cards='[
    { icon: "🧑‍💻", title: "Developers", description: "Already use Copilot in the editor or CLI and want the agent inside their own tools" },
    { icon: "🛠️", title: "Platform engineers", description: "Decide which rules run in every harness and which belong in one app" },
    { icon: "🏗️", title: "Architects", description: "Choose which existing app methods an agent may request and what access it needs" },
    { title: "~170 lines", description: "pi&#39;s entire agent loop, one function you can read on one screen" },
    { title: "5 places to step in", description: "Loop, context, tools, control, evidence: every hook or callback fills one" },
    { title: "Same loop in Copilot", description: "The SDK starts the Copilot CLI runtime; your code steps in at the same five places" }
  ]'
/>

---

<!-- SLIDE: Table of Contents -->
# Table of Contents
<TocSlide
  :sections='[
    { icon: "🔁", title: "What a Harness Is", subtitle: "Five jobs, read in pi&#39;s source", blurb: "Loop, context, tools, control, and evidence, each on one slide of real code", slide: 4 },
    { icon: "🧭", title: "Drive GitHub&#39;s Harness", subtitle: "Bring AI into the apps you already own", blurb: "Call existing methods through tools, enforce app permissions, and stream progress", slide: 11 },
    { icon: "🔍", title: "Decide What It Sees", subtitle: "One policy, a blind tester, and its evidence", blurb: "Hide the implementation and let a referee name what the tests found", slide: 19 },
    { icon: "🤝", title: "Own It", subtitle: "Surrounding controls, pre-flight, named owner", blurb: "Share a harness others can run, and know who reads each report", slide: 24 }
  ]'
/>

---

<!-- SLIDE: Part 1 — What a Harness Is -->
# Part 1 — What a Harness Is
<SectionOpenerSlide
  :partNumber='1'
  title="What a Harness Is"
  subtitle="Read pi as source, one slide per job: loop, context, tools, control, and evidence."
  :cards='[
    { icon: "🔁", title: "The loop", blurb: "One function of about 170 lines runs every turn" },
    { icon: "🧰", title: "Tools + control", blurb: "find hands off to fd; beforeToolCall says no" },
    { icon: "📡", title: "Evidence", blurb: "Every step is an event any subscriber can read" }
  ]'
  :terminal='{ context: "Code excerpts: pi · earendil-works/pi@f9daca3 · MIT License · trimmed, read as source", detail: "5 jobs: loop · context · tools · control · evidence" }'
/>

---

<!-- SLIDE: Five Jobs -->
# Five Jobs
<FrameworkMappingRowsSlide
  :partNumber='1'
  pillIcon="🧩"
  pillLabel="What a Harness Is · Five Jobs"
  title="A harness is a loop with five places to step in"
  subtitle="Each job is a point in the loop: the question it answers, and where pi does it"
  :rows='[
    { label: "Loop", description: "When does the agent take another turn, and when does it stop?", tag: "runLoop" },
    { label: "Context", description: "What does the model see on this turn?", tag: "transformContext" },
    { label: "Tools", description: "What can the agent do, and how does each action run?", tag: "write · find" },
    { label: "Control", description: "Which calls actually run?", tag: "beforeToolCall" },
    { label: "Evidence", description: "What happened, in a form someone can inspect?", tag: "emit · afterToolCall" }
  ]'
  footnote="pi is one small open-source harness among many; the five jobs are the part that transfers"
  :progressDots='{ current: 1, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: The Loop on One Screen -->
# The Loop on One Screen
<CodeWithFeaturesSlide
  :partNumber='1'
  pillIcon="🔁"
  pillLabel="What a Harness Is · Loop"
  title="That&#39;s the whole harness: pi&#39;s loop is one function of ~170 lines"
  codePosition="top"
  :code='{ language: "ts", filename: "pi · packages/agent/src/agent-loop.ts#L188-L337 (trimmed)", content: "while (true) {                                                  // LOOP: outer, for follow-ups\n  while (hasMoreToolCalls || pendingMessages.length > 0) {      // LOOP: one turn per pass\n    // … queued steering messages join currentContext.messages  // CONTEXT\n    const message = await streamAssistantResponse(currentContext, config, signal, emit, streamFunction);\n    const toolCalls = message.content.filter((c) => c.type === \"toolCall\");\n    if (toolCalls.length > 0) {                                 // TOOLS + CONTROL\n      const executedToolBatch =\n        message.stopReason === \"length\"\n          ? await failToolCallsFromTruncatedMessage(toolCalls, emit)\n          : await executeToolCalls(currentContext, message, config, signal, emit);\n    }\n    await emit({ type: \"turn_end\", message, toolResults });     // EVIDENCE\n    pendingMessages = (await config.getSteeringMessages?.()) || [];\n  }   // … then follow-up messages restart the outer loop, or it breaks\n}" }'
  :features='[
    { icon: "🔧", title: "Tool calls keep it running", description: "No tool calls ends the turn loop; results go back into context." },
    { icon: "🧭", title: "People steer mid-run", description: "Steering joins before the next turn; follow-ups restart it." },
    { icon: "📡", title: "Every turn emits an event", description: "Where a UI, log, or budget attaches." }
  ]'
  :progressDots='{ current: 2, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Context Every Turn -->
# Context Every Turn
<CodeWithFeaturesSlide
  :partNumber='1'
  pillIcon="🧠"
  pillLabel="What a Harness Is · Context"
  title="pi rebuilds what the model sees before every model call"
  codePosition="top"
  :code='{ language: "ts", filename: "pi · packages/agent/src/agent-loop.ts#L398-L404", content: "let messages = context.messages;\nif (config.transformContext) {\n  messages = await config.transformContext(messages, signal);\n}\nconst llmMessages = await config.convertToLlm(messages);" }'
  :features='[
    { icon: "✂️", title: "transformContext", description: "Prunes, summarizes, or injects messages before each model call." },
    { icon: "🎚️", title: "prepareRequest", description: "Runs just before the call and can swap the model or thinking level for the next turn." },
    { icon: "📣", title: "declareToolChanges", description: "Tells the model when its tool list changed." }
  ]'
  :insight='{ icon: "💡", text: "The harness decides the model&#39;s view on every turn, so code that controls context shapes the agent&#39;s whole view." }'
  :progressDots='{ current: 3, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

---

<!-- SLIDE: Inside One Tool -->
# Inside One Tool
<CodeWithFeaturesSlide
  :partNumber='1'
  pillIcon="🧰"
  pillLabel="What a Harness Is · Tools"
  title="A harness can bring its own tools: pi&#39;s &#39;write&#39;"
  codePosition="top"
  :code='{ language: "ts", filename: "pi · packages/coding-agent/src/core/tools/write.ts (trimmed)", content: "const writeSchema = Type.Object({\n  path: Type.String({ description: \"Path to the file to write (relative or absolute)\" }),\n  content: Type.String({ description: \"Content to write to the file\" }),\n});\nexport const writeToolSystemPromptContribution = {\n  snippet: \"Create or overwrite files\",\n  guidelines: [\"Use write only for new files or complete rewrites.\"],\n} as const;\nreturn withFileMutationQueue(absolutePath, async () => {   // … inside execute(), later in the file\n  throwIfAborted();\n  await ops.writeFile(absolutePath, content);              // … after ops.mkdir; then returns success" }'
  :features='[
    { icon: "🧩", title: "A tool is schema + code", description: "The model fills the schema; the harness runs the code." },
    { icon: "🏗️", title: "Built in, no shell", description: "write calls no OS command; pi wrote every line." },
    { icon: "🔀", title: "Your rules inside", description: "Queue, abort, and ops: disk, SSH, or anywhere." }
  ]'
  :insight='{ icon: "🚪", text: "Build it or borrow it: pi&#39;s &#39;find&#39; borrows the fd binary by default; the harness still sees call and result." }'
  :progressDots='{ current: 4, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
The point: a harness can bring its own tools. A tool is just a schema the model fills in plus code the harness runs, and that code can be anything: write is pi's own TypeScript and never shells out to an OS command. Schema is the contract the model fills in, validated before beforeToolCall sees it. The prompt snippet and guideline are context: a tool teaches the model when to use it. The mutation queue and abort checks keep parallel calls and cancellation safe. ops is swappable: local disk by default; the code comment suggests SSH.

Build or borrow: find (find.ts#L116-L216) shows the borrow option. With custom ops.glob the harness owns the search end to end; by default ensureTool("fd") downloads fd if missing and spawn runs it. The harness validates the pattern, can block the call, and reads the result. What fd does while it runs belongs to fd and the operating system. Section 3 meets this boundary again.
-->

---

<!-- SLIDE: Control Says No -->
# Control Says No
<CodeWithFeaturesSlide
  :partNumber='1'
  pillIcon="🎛️"
  pillLabel="What a Harness Is · Control"
  title="Before any tool runs, the loop asks your code: run it or block it?"
  codePosition="top"
  :code='{ language: "ts", filename: "pi · packages/agent/src/agent-loop.ts#L738-L765 (trimmed)", content: "if (config.beforeToolCall) {\n  const beforeResult = await config.beforeToolCall(\n    { assistantMessage, toolCall, args: validatedArgs, context: currentContext }, signal);\n  if (beforeResult?.block) {\n    const result = createErrorToolResult(beforeResult.reason || \"Tool execution was blocked\");\n    return { kind: \"immediate\", result, isError: true };\n  }\n}\n// pi · coding-agent/src/core/agent-session.ts#L652-L682: the product installs its policy\nthis.agent.beforeToolCall = (context) => this._beforeToolCall(context);\nthis.agent.afterToolCall = (context) => this._afterToolCall(context);" }'
  :features='[
    { icon: "↩️", title: "Blocked? The agent hears why", description: "Your reason goes back to the model; it tries another way." },
    { icon: "🔭", title: "Your code sees everything", description: "The tool, its arguments, and the conversation so far." },
    { icon: "✂️", title: "Half-written calls never run", description: "If a reply hits the length limit, its tool calls fail." }
  ]'
  :insight='{ icon: "🧩", text: "pi&#39;s own coding agent plugs its add-ons in right here; the loop itself never changes." }'
  :progressDots='{ current: 5, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
A block becomes a tool result the model reads, so a good reason names the rule and the alternative. Your code sees validated arguments and the whole context: more than a single-event script receives, and the difference section 3 builds on. When a reply is cut off by the token limit (stopReason "length"), the loop fails every tool call in that reply, because their arguments may be truncated. agent-session.ts wires pi's extension runner into beforeToolCall and afterToolCall: every tool_call extension gets a vote on every call.
-->

---

<!-- SLIDE: Every Step Is an Event -->
# Every Step Is an Event
<CodeWithFeaturesSlide
  :partNumber='1'
  pillIcon="📡"
  pillLabel="What a Harness Is · Evidence"
  title="pi reports every step as an event any subscriber can read"
  codePosition="top"
  :code='{ language: "ts", filename: "pi · packages/agent/src/agent-loop.ts#L880-L937 (trimmed)", content: "if (config.afterToolCall) {\n  const afterResult = await config.afterToolCall(\n    { toolCall: prepared.toolCall, args: prepared.args, result, isError, /* … */ }, signal);\n  if (afterResult) { result = { ...result, content: afterResult.content ?? result.content /* … */ }; }\n}\nawait emit({ type: \"tool_execution_end\", toolCallId: finalized.toolCall.id,\n  toolName: finalized.toolCall.name, result: finalized.result, isError: finalized.isError /* … */ });\n// agent.ts#L275-L278\nsubscribe(listener: (event: AgentEvent, signal: AbortSignal) => Promise<void> | void): () => void {\n  this.listeners.add(listener);\n  return () => this.listeners.delete(listener);\n}" }'
  :features='[
    { icon: "✏️", title: "afterToolCall can rewrite", description: "Redact or trim before the model reads it." },
    { icon: "🧾", title: "Audit-ready events", description: "Tool, call, result, error, and duration." },
    { icon: "👂", title: "Anything can listen", description: "subscribe feeds a UI, a log, or a budget." }
  ]'
  :insight='{ icon: "📡", text: "agent_start · turn_start · message_start/update/end · tool_execution_start/update/end · turn_end · agent_end" }'
  :progressDots='{ current: 6, total: 6, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>

<!--
afterToolCall sees the arguments and the result together, so it can redact a secret, trim a huge output, or mark a failure before the model reads it. Each tool_execution_end event names the tool, the call, the result, whether it failed, and how long it took. The Agent class fans every event out to its subscribers: that is where a UI, a log file, or a budget counter attaches. Section 2's evidence slide receives the same kind of stream from GitHub's harness.
-->

---

<!-- SLIDE: Part 2 — Drive GitHub's Harness -->
# Part 2 — Drive GitHub's Harness
<SectionOpenerSlide
  :partNumber='2'
  title="Drive GitHub's Harness"
  subtitle="Put the loop inside an app you already own, with its methods, permissions, and UI."
  :cards='[
    { icon: "🔁", title: "Your app is the host", blurb: "Host = the app running the SDK; it can be one you already use" },
    { icon: "🧰", title: "Your methods become tools", blurb: "The model requests a named tool; your handler calls app code" },
    { icon: "📡", title: "Your rules, your telemetry", blurb: "App permissions stay in force; events feed your UI and logs" }
  ]'
  :terminal='{ context: "Integration sketch · existing release dashboard + @github/copilot-sdk", detail: "What blocks this release? → app method → readiness result → dashboard" }'
/>

<!--
The SDK's primary value here is embedding an agent in software the team already owns. The app can be a desktop tool, a web backend, or an internal release dashboard. A web frontend talks to its backend; the backend hosts the SDK and keeps credentials and authorization there.

The following sketches use a release dashboard as one continuous example. releaseService, user, selectedRelease, ui, and telemetry are application-owned objects, not SDK APIs. These are illustrative integration excerpts, not a recorded release-dashboard run. The runnable quickstarts remain supporting material.

The model requests a named tool. Its handler calls the app's existing method. Tool availability and permission callbacks bound the request; the service still validates the arguments and authorizes the authenticated user. SDK events feed progress and diagnostics, while the service records the business result. Embedding the SDK creates these control points; it does not secure an application automatically.
-->

---

<!-- SLIDE: Five Jobs in GitHub's Harness -->
# Five Jobs in GitHub's Harness
<FrameworkMappingRowsSlide
  :partNumber='2'
  pillIcon="🗺️"
  pillLabel="Drive GitHub's Harness · Five Jobs"
  title="Same five jobs, different code: the SDK has its own names for each"
  subtitle="Copilot SDK names in the middle; the pi code you just saw, for comparison, on the right"
  :rows='[
    { label: "Loop", description: "The runtime; your app drives createSession, sendAndWait, abort", tag: "pi: runLoop" },
    { label: "Context", description: "systemMessage (append, customize, replace), the prompt, model", tag: "pi: transformContext" },
    { label: "Tools", description: "defineTool wraps app methods; availableTools names what exists", tag: "pi: write · find" },
    { label: "Control", description: "onPermissionRequest, hooks.onPreToolUse, repository hooks", tag: "pi: beforeToolCall" },
    { label: "Evidence", description: "session.on feeds your UI and telemetry; services record results", tag: "pi: emit · afterToolCall" }
  ]'
  footnote="Documented: the SDK talks to the Copilot runtime over JSON-RPC and starts and stops it for you"
  :progressDots='{ current: 1, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: SDK Loop -->
# SDK Loop
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🔁"
  pillLabel="Drive GitHub's Harness · Loop"
  title="A dashboard action starts the loop and displays its answer"
  codePosition="top"
  :code='{ language: "ts", filename: "release-assistant.ts (integration sketch)", content: "const client = new CopilotClient();\nconst session = await client.createSession({\n  model: \"auto\", tools: [readinessTool],\n  availableTools: [\"release_readiness\"],\n  onPermissionRequest: releasePermissions,\n});\nconst reply = await session.sendAndWait({\n  prompt: `What blocks release ${selectedRelease.id}?`,\n});\nui.showAnswer(reply?.data.content);" }'
  :features='[
    { icon: "🖥️", title: "Your app starts it", description: "A UI action supplies the selected release and the question." },
    { icon: "⏳", title: "sendAndWait", description: "The runtime handles model turns and tool calls; your app gets the reply." },
    { icon: "🖼️", title: "Your app shows the answer", description: "ui.showAnswer delivers the reply inside the dashboard people already use." }
  ]'
  :insight='{ icon: "🔁", text: "Same loop as pi. The SDK hands you the five places to step in." }'
  :progressDots='{ current: 2, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
The practitioner clicks "Explain readiness" in an existing release dashboard. Its backend creates a session with one tool and the permission handler shown on the next slides. selectedRelease and ui belong to the app; ui.showAnswer represents delivering the answer back to its frontend. The service supplies the data; the model explains it.

CopilotClient starts the Copilot runtime and talks over JSON-RPC. In a long-lived app, reuse the client and scope sessions to users and tasks. A Cancel action calls session.abort(); sendAndWait's default 60-second timeout ends only the wait. In finally, disconnect the session; stop the client when its owning app shuts down. Those lifecycle paths are omitted from this integration excerpt.

The runtime runs the same kind of loop as pi; the next four slides show what your app supplies. Node 20+; choose an authentication route for your deployment. Copilot identity and app-user authorization are separate decisions.
-->

---

<!-- SLIDE: SDK Context -->
# SDK Context
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🧠"
  pillLabel="Drive GitHub's Harness · Context"
  title="Give the model a clear job inside your app"
  codePosition="top"
  :code='{ language: "ts", filename: "release-assistant.ts · session options (integration sketch)", content: "systemMessage: {\n  mode: \"customize\",\n  sections: { custom_instructions: { action: \"append\", content:\n    \"You assist a release engineer inside the release dashboard. \" +\n    \"Use release_readiness for current status; name each blocker. \" +\n    \"If the tool cannot answer, report the gap. \" +\n    \"Explain the next step for a person to approve.\" } },\n}" }'
  :features='[
    { icon: "📝", title: "systemMessage", description: "GitHub&#39;s built-in instructions to the model, in named sections." },
    { icon: "🎚️", title: "mode: customize", description: "Edit one section; every other section stays as GitHub wrote it." },
    { icon: "➕", title: "custom_instructions", description: "Names the app task, the source of facts, and what to do when facts are missing." }
  ]'
  :insight='{ icon: "💡", text: "Instructions steer the model; the next two slides enforce limits in code." }'
  :progressDots='{ current: 3, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
What: three modes. append (default) adds your text after GitHub's full prompt; customize changes named sections (identity, tone, custom_instructions, and others) and keeps safety and tool_instructions in place; replace sends only your text and removes the SDK's guardrails, including security restrictions.

Why customize: your code edits one named section (here custom_instructions, where repo and org instructions already live) and the rest of GitHub's prompt, including safety, stays as written. Here the role is a release assistant inside an existing dashboard. The instruction names its tool and asks it to report missing facts instead of guessing.

When: use instructions for what the model aims at, such as role, tone, and output rules. Instructions steer, and the model follows them most of the time. When a rule must hold every time, enforce it in code with the next two jobs: tools decide what exists, control decides what runs.
-->

---

<!-- SLIDE: SDK Tools -->
# SDK Tools
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🧰"
  pillLabel="Drive GitHub's Harness · Tools"
  title="A custom tool can call a method your app already has"
  codePosition="top"
  :code='{ language: "ts", filename: "release-tools.ts (integration sketch; releaseService is app code)", content: "const readinessTool = defineTool(\"release_readiness\", {\n  description: \"Read the current blockers for a release.\",\n  parameters: { type: \"object\", properties: {\n    releaseId: { type: \"string\" } }, required: [\"releaseId\"], additionalProperties: false },\n  handler: async ({ releaseId }: { releaseId: string }) =>\n    releaseService.getReadiness(user, releaseId),\n});\n// Session options:\ntools: [readinessTool],\navailableTools: [\"release_readiness\"]" }'
  :features='[
    { icon: "🔗", title: "handler → app method", description: "The SDK calls your handler; it calls releaseService.getReadiness." },
    { icon: "🛂", title: "Keep app authorization", description: "The service checks the authenticated user and the requested release." },
    { icon: "✅", title: "Expose just this tool", description: "tools adds it; availableTools hides shell, files, and other tools." }
  ]'
  :insight='{ icon: "💡", text: "The model chooses when to request a tool; your app chooses which method it calls and what data comes back." }'
  :progressDots='{ current: 4, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
This is the central SDK use case: expose a narrow wrapper around a method already in the app. No shell command, external MCP server, or duplicate release service is needed. The SDK routes the named tool call back into the hosting process.

releaseService and user are app-owned. user comes from the authenticated app session, never from model-supplied arguments. The service validates releaseId, checks that user can access that release, returns only permitted readiness fields, and records the business operation in its existing audit log. A JSON schema describes the input shape; it does not authorize a release ID.

tools registers the tool object; availableTools is an allowlist of names across built-in, MCP, and custom tools. With only tools, built-ins remain available. excludedTools subtracts and wins. This sketch exposes one read-only business operation; the model cannot choose arbitrary app method names.

Illustrative request: release_readiness({ releaseId: "v2.4" }). Illustrative service result: { ready: false, blockers: ["Integration tests failed"] }. The release dashboard already has the facts and authorization; the agent gains a new way to use them. These are example values, not observed results.
-->

---

<!-- SLIDE: SDK Control -->
# SDK Control
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🛂"
  pillLabel="Drive GitHub's Harness · Control"
  title="Your app controls tool requests and checks user access"
  codePosition="top"
  :code='{ language: "ts", filename: "release-permissions.ts (integration sketch)", content: "const releasePermissions: PermissionHandler = (request) =>\n  request.kind === \"custom-tool\" && !request.managedApprovalRequired &&\n  request.toolName === \"release_readiness\"\n    ? { kind: \"approve-once\" }\n    : { kind: \"reject\", feedback: \"Readiness only. Ask a release owner.\" };\n// Session options:\nonPermissionRequest: releasePermissions,\nenableFileHooks: true" }'
  :features='[
    { icon: "🛂", title: "Allow one operation", description: "The permission handler approves only release_readiness." },
    { icon: "🔐", title: "Authorize inside the service", description: "Tool approval never grants access to every user or release." },
    { icon: "↩️", title: "Reject with a next step", description: "Other requests get a reason and a route to the release owner." },
    { icon: "🧱", title: "Load repository hooks", description: "enableFileHooks loads repo rules; a repo deny still wins." }
  ]'
  :insight='{ icon: "🔗", text: "SDK approvals gate tool requests; your service checks user access and any required human approval." }'
  :progressDots='{ current: 5, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
There are two distinct decisions. The SDK permission handler decides whether this session may request the named operation. releaseService then uses the app's authenticated user to authorize access to that specific release. A custom-tool permission request includes toolName; keep argument-level validation and authorization in the service, where the arguments and identity are available together.

This session exposes only the read-only readiness method. A publish method is absent. If the team later adds deployment tools, its existing service must require a separately recorded human approval for the exact release and target. A model instruction or approve-once decision is not that business approval.

managedApprovalRequired means a managed policy requires human approval. This minimal handler refuses those requests and directs the user to the owner; an app that supports them needs an explicit human approval flow.

Feedback gives the agent a useful next step after a refusal. It can explain that a release owner must act. Never turn service failures into a success response; preserve a visible error and record the failure.

Repo hooks: a preToolUse hook checked into the repository (FanHub's denies node/backend/src/database/** and fanhub.db*). With enableFileHooks: true, every session your app creates loads it, and a repository deny wins even when your app's own hook says allow. If a hook crashes or exits non-zero, the call is blocked; if it times out, the call runs. A hook you rely on has to be fast.

Hooks govern the tool calls they receive; they cannot see every operation inside a custom handler. A service method still needs its own authorization and audit trail. When running against a repository, enableFileHooks opts into its hook rules. Operating-system isolation and organization controls remain separate boundaries.
-->

---

<!-- SLIDE: SDK Evidence -->
# SDK Evidence
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="📡"
  pillLabel="Drive GitHub's Harness · Evidence"
  title="Feed progress into your app UI and tool events into its telemetry"
  codePosition="top"
  :code='{ language: "ts", filename: "release-events.ts (integration sketch; ui and telemetry are app code)", content: "// Set streaming: true when creating the session; subscribe before sending.\nsession.on(\"assistant.message_delta\", (e) => ui.appendText(e.data.deltaContent));\nsession.on(\"tool.execution_start\", (e) =>\n  ui.showTool(e.data.toolName));\nsession.on(\"tool.execution_complete\", (e) =>\n  telemetry.record(\"tool.complete\", {\n    sessionId: session.sessionId, toolCallId: e.data.toolCallId,\n    success: e.data.success,\n  }));\nsession.on(\"session.idle\", () => ui.finishResponse());" }'
  :features='[
    { icon: "📡", title: "Progress in your UI", description: "Stream the answer and show which tool the agent requested." },
    { icon: "📊", title: "Events in your telemetry", description: "Record the session, tool call, and whether execution succeeded." },
    { icon: "🔐", title: "Business audit stays in the app", description: "The service records access decisions and the actual release result." }
  ]'
  :insight='{ icon: "🧾", text: "Tool execution success means the call completed; ready: false can still be its business result." }'
  :progressDots='{ current: 6, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
ui and telemetry represent the app's existing UI bridge and telemetry client. Subscribe before sending the prompt, so early events are captured. A web backend forwards progress to the frontend over its chosen transport. Render model text as untrusted content with the UI's usual escaping.

sessionId groups the conversation; toolCallId identifies a particular call. Add the app's request identifier to its own service audit and handler telemetry to correlate them; that join is application wiring, not an automatic SDK feature. Record bounded metadata, permission outcomes, and failures. Avoid logging tokens, raw arguments, or full business records by default.

tool.execution_complete.success reports execution status. A successful readiness query may return ready: false, and a permission refusal is a different event again. Keep those meanings separate. Handle session.error and application transport failures visibly; idle ends this response, not the app session. Unsubscribe handlers when the owning view/session is disposed.
-->

---

<!-- SLIDE: AI Inside Your App -->
# AI Inside Your App
<TwoColPairedConceptsSlide
  :partNumber='2'
  pillIcon="🧩"
  pillLabel="Drive GitHub's Harness · Inside Your App"
  title="AI brings your app's existing methods into a new workflow"
  :left='{ header: "One question becomes an app workflow", icon: "🧭", items: [
  { title: "Engineer asks: What blocks v2.4?", detail: "The dashboard supplies the selected release" },
  { title: "Agent requests release_readiness", detail: "Your handler calls releaseService.getReadiness" },
  { title: "Service returns ready: false", detail: "Example blocker: integration tests failed" },
  { title: "Dashboard shows answer and progress", detail: "The engineer sees the blocker and chooses the next action" }
] }'
  :right='{ header: "Your app keeps the controls", icon: "🛂", items: [
  { title: "One named read-only operation", detail: "No shell, file access, or publish tool exposed" },
  { title: "Service checks the app user", detail: "A supplied release ID never grants access" },
  { title: "SDK events plus the service audit", detail: "Trace the request and verify the actual result" },
  { title: "Missing facts or failed access?", detail: "Show the error; a release owner resolves it" }
] }'
  :insight='{ icon: "💡", text: "Integration sketch: AI uses your app&#39;s existing capabilities through methods you deliberately expose." }'
  :progressDots='{ current: 7, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Part 3 — Decide What It Sees -->
# Part 3 — Decide What It Sees
<SectionOpenerSlide
  :partNumber='3'
  title="Decide What It Sees"
  subtitle="Same host, different view: one visibility policy produces a blind test suite and a referee's verdict."
  :cards='[
    { icon: "🔍", title: "Two checkpoints", blurb: "onPreToolUse and onPermissionRequest share a policy" },
    { icon: "🧪", title: "Blind test writer", blurb: "Contract only, implementation hidden, host reruns" },
    { icon: "🧾", title: "Evidence", blurb: "JSONL from three layers, joined by sessionId" }
  ]'
  :terminal='{ context: "host rerun · TAP output · read-only referee session with BUGS.md", detail: "10 passing · 2 failing · 1 undocumented mismatch" }'
/>

---

<!-- SLIDE: One Policy, Two Checkpoints -->
# One Policy, Two Checkpoints
<CodeWithFeaturesSlide
  :partNumber='3'
  pillIcon="🔍"
  pillLabel="Decide What It Sees · Policy"
  title="One visibility policy feeds both SDK checkpoints"
  codePosition="top"
  :code='{ language: "ts", filename: "examples/host-kit/visibility.ts · blind-tests app", content: "const policy = createVisibilityPolicy({\n  repoRoot: checkout.dir,\n  hidden: isHiddenFromBlindTester,       // never visible, any access kind\n  readable: isBlindReadable,             // optional allowlist for reads\n  writable: isBlindWritable,             // where the agent may create files\n  shellCommands: BLIND_SHELL,            // executables it may run\n  shellTextDeny: BLIND_TEXT_DENY,        // text that reaches hidden material indirectly\n  customTools: new Set([\"api_contract\"]),\n  hiddenFeedback: \"You are testing a black box. ... Use api_contract and live HTTP calls.\",\n});\ncreateSession({ ..., onPermissionRequest: policy.onPermissionRequest,\n  hooks: { onPreToolUse: policy.onPreToolUse } });" }'
  :features='[
    { icon: "🪝", title: "onPreToolUse", description: "Raw arguments: catches a grep sweeping a hidden folder." },
    { icon: "🛂", title: "onPermissionRequest", description: "Parsed request: hidden reads, stray writes, shell commands." },
    { icon: "🧪", title: "Beyond a hook (Tested)", description: "Write-content checks; per-segment command allowlist." }
  ]'
  :insight='{ icon: "🔭", text: "Like pi&#39;s beforeToolCall, the host holds session state across events." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Blind Test Writer -->
# Blind Test Writer
<HeroStatSlide
  :partNumber='3'
  pillIcon="🧪"
  pillLabel="Decide What It Sees · Blind Tests"
  title="A blind tester surfaced an API contract mismatch nobody had documented"
  subtitle="Does the API behave the way its contract says, judged by someone who never saw the code?"
  :hero='{ value: "10 / 2", label: "test status: passing / failing on the host&#39;s own rerun", source: "Observed 2026-10-26 · TAP output · 18 tool calls, 19 allowed, 2 denied" }'
  :supporting='[
    { icon: "📄", title: "Sees only api_contract", description: "SETUP.md endpoints, bug hints stripped; live HTTP calls." },
    { icon: "🙈", title: "Hidden: source, docs, BUGS.md", description: "Writes only __tests__/blind/; host serves on 5299." },
    { icon: "🐞", title: "Finding: POST /api/characters → 500", description: "Referee: BUGS.md #19, Missing Input Validation." },
    { icon: "❓", title: "Finding: seasonId filter ignored", description: "Referee: undocumented. Docs say seasonId; route reads season_id." }
  ]'
  :insight='{ icon: "⚖️", text: "A read-only referee labels each failure; the API owner decides which side changes." }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

---

<!-- SLIDE: Outside the Host's View -->
# Outside the Host's View
<ThreeColumnCardSlide
  :partNumber='3'
  pillIcon="🚧"
  pillLabel="Decide What It Sees · Boundary"
  title="Three things no harness can see"
  :columns='[
    { title: "Inside a process a tool starts", description: "The harness approves running npm test; what that code does next belongs to the OS.", items: [
  "Scripts it runs have full process access",
  "For a hard wall, run the agent in a container"
] },
    { title: "Anything that isn&#39;t a tool call", description: "The harness only decides what the agent asks its tools to do.", items: [
  "Other processes, users, and the network",
  "OS accounts and network rules cover those"
] },
    { title: "Whether the result is right", description: "The harness records what happened; judging it is a separate job.", items: [
  "Tests, reviews, and evidence answer that",
  "A named person decides what ships"
] }
  ]'
  :insight='{ icon: "🚪", text: "Same as pi&#39;s find → fd: the harness sees the call and its result; the OS runs the rest." }'
  :progressDots='{ current: 3, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Every harness, pi's, GitHub's, or one you build, decides tool calls. That is a lot of control, and it has three edges.

Inside a process a tool starts: approving "npm test" or "node script.js" is a decision about the call. Once the process starts, its code has whatever access the OS account has. A host can inspect a file before letting the agent write it, which catches the obvious cases; a container or sandbox is the hard wall.

Anything that isn't a tool call: other processes, other users, and the network are outside the loop entirely. OS accounts, containers, and network rules govern those.

Whether the result is right: the harness can record every step, but a passing run and a correct result are different questions. Tests, reviews, and the evidence log answer it, and a named person decides what ships. Example from the blind tester: a failing test exposed that the docs say seasonId while the code reads season_id; someone still has to choose which side changes.
-->

---

<!-- SLIDE: Evidence You Keep -->
# Evidence You Keep
<CodeWithFeaturesSlide
  :partNumber='3'
  pillIcon="🧾"
  pillLabel="Decide What It Sees · Evidence"
  title="Every run leaves one log, with every layer joined by sessionId"
  codePosition="top"
  :code='{ language: "json", filename: ".runs/my-app/events.jsonl (example)", content: "{\"layer\":\"repo-hook\",\"event\":\"hook.end\",\"sessionId\":\"909bf25c-…\",\"hook\":\"preToolUse\",\"success\":true}\n{\"layer\":\"permission-handler\",\"sessionId\":\"909bf25c-…\",\"path\":\"secrets/.env\",\"decision\":\"deny\"}\n{\"layer\":\"runtime\",\"event\":\"tool.complete\",\"sessionId\":\"909bf25c-…\",\"tool\":\"view\",\"success\":true}\n{\"layer\":\"app\",\"event\":\"session-end\",\"sessionId\":\"909bf25c-…\",\"toolCalls\":18,\"allow\":16,\"deny\":2}" }'
  :features='[
    { icon: "🔗", title: "One sessionId joins every layer", description: "Repo hooks, your permission handler, and the runtime, lined up for one session." },
    { icon: "⚖️", title: "Decisions apart from actions", description: "What was allowed or denied, and separately, what actually ran." },
    { icon: "🏷️", title: "Names, rules, and counts", description: "Tool, path, and rule; file contents and command output stay out." }
  ]'
  :insight='{ icon: "📌", text: "Build reports from the log of what the tools did; the agent&#39;s own summary is a claim to check." }'
  :progressDots='{ current: 4, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>

<!--
Any host can write this. host-kit/run-log.ts subscribes to the session and writes one JSON line per event from three places: the repository's own hooks, the yes/no decisions from your onPermissionRequest handler (slide 16), and the runtime's tool events. One sessionId joins them, so you can line up "the repo hook ran", "your handler denied a read", and "the tool completed" for the same call.

Log decisions separately from executions: a deny is evidence too. Keep the log to names, rules, and counts; file contents and command output stay out, so the log is safe to keep and share.

The agent's summary of its own run is useful, but it is a claim. Reports come from the log and, where it matters, from the host rerunning the work itself.
-->

---

<!-- SLIDE: Part 4 — Own It -->
# Part 4 — Own It
<SectionOpenerSlide
  :partNumber='4'
  title="Own It"
  subtitle="Know the controls other people already own, then share your harness with a pre-flight and a named owner."
  :cards='[
    { icon: "🏢", title: "Surrounding controls", blurb: "Policy hooks, models, billing, tools, process" },
    { icon: "✅", title: "Pre-flight", blurb: "Pins, clean checkouts, bounds, tested rules" },
    { icon: "👤", title: "Named owner", blurb: "Every report goes to someone who decides" }
  ]'
  :terminal='{ context: "A harness you share becomes a harness someone owns", detail: "Which of the five jobs do you take over?" }'
/>

---

<!-- SLIDE: Controls Around Your Harness -->
# Controls Around Your Harness
<FrameworkMappingRowsSlide
  :partNumber='4'
  pillIcon="🏢"
  pillLabel="Own It · Surrounding Controls"
  title="Your harness runs inside controls other people already own"
  subtitle="What each owner decides, and what your app verifies before you share it"
  :rows='[
    { label: "Policy hooks", description: "Load machine-wide before repo hooks; run under disableAllHooks", tag: "Platform team" },
    { label: "Access", description: "Who uses Copilot, on which surfaces; check your app identity", tag: "Org admins" },
    { label: "Models", description: "Admins set availability; model auto or a named model is a request", tag: "Admins + app" },
    { label: "Billing", description: "User or token route follows Copilot policy; BYOK follows provider", tag: "Billing admins" },
    { label: "Tools + MCP", description: "managedApprovalRequired requests need a human approval path", tag: "Admins + app" },
    { label: "Process", description: "OS account, container, network: the real boundary for installs", tag: "Platform owners" }
  ]'
  footnote="Documented in the hooks reference and Copilot policies; verify each against the identity your app runs as"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Pre-flight and How Deep -->
# Pre-flight and How Deep
<TwoColPairedConceptsSlide
  :partNumber='4'
  pillIcon="✅"
  pillLabel="Own It · Pre-flight"
  title="Before sharing, run a pre-flight and name an owner"
  :left='{ header: "Pre-flight before someone else runs it", icon: "✅", items: [
  { title: "Pin the SDK; record the runtime version", detail: "Every report names the SDK and runtime versions" },
  { title: "Start from a clean, pinned checkout", detail: "Tool budget, timeout, cleanup in finally" },
  { title: "Unit-test every visibility rule", detail: "Against real request shapes; set enableFileHooks: true" },
  { title: "Confirm auth route, models, billing", detail: "For the people who will run it" }
] }'
  :right='{ header: "How deep to go", icon: "🧭", items: [
  { title: "A note at session start steers it", detail: "→ sessionStart hook" },
  { title: "A call must never run, in any harness", detail: "→ preToolUse repo or machine policy hook, kept fast" },
  { title: "Needs persona, tools, visibility, budget, report", detail: "→ SDK host with enableFileHooks: true" },
  { title: "Name the owner of every report", detail: "Docs owner: friction; API owner: blind failures" }
] }'
  :insight='{ icon: "🎯", text: "Your move: which of the five jobs do you take over for your workflow, and who reads the report?" }'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

---

<!-- SLIDE: Before/After -->
# Before/After
<BeforeAfterSlide
  header="From Watching the Loop to Hosting It in Your App"
  :leftItems='[
    "The agent is a black box you prompt from outside",
    "Your app already has useful methods behind its buttons",
    "Rules live in prompts and reviewer memory",
    "The agent&#39;s own summary stands in for the result"
  ]'
  :rightItems='[
    "Just a loop: you choose where to step in, five known places",
    "Expose selected app methods as named tools",
    "App authorization, permission handlers, and repo hooks",
    "Stream progress to your UI; verify results in service logs"
  ]'
  :metrics='[
    { value: "~170", detail: "lines in pi&#39;s whole runLoop" },
    { value: "5 jobs", detail: "places your app can step into the loop" },
    { value: "1 method", detail: "a starting scope for an embedded assistant" }
  ]'
/>

---

<!-- SLIDE: Apps Worth Hosting -->
# Apps Worth Hosting
<FrameworkMappingRowsSlide
  :partNumber='4'
  pillIcon="💡"
  pillLabel="Own It · Ideas"
  title="What could AI unlock inside the tools your team already uses?"
  subtitle="Wrap selected app methods as tools; keep permissions and telemetry in the app"
  :rows='[
    { label: "CI console", description: "Calls rerunTest and compareRuns to investigate a flaky build", tag: "Tools + Evidence" },
    { label: "Upgrade crew", description: "Your dependency portal tests upgrade branches in isolated workers", tag: "Loop + Control" },
    { label: "Release UI", description: "Calls getReadiness and draftRollout; your app gates deployment", tag: "Tools + Control" },
    { label: "Runbook drill", description: "Follows an incident runbook in a sandbox; flags each unclear step", tag: "Context + Evidence" },
    { label: "Exam grader", description: "Your learning app grades submitted tests; the answer key stays hidden", tag: "Control" },
    { label: "Issue→release", description: "Your dev portal coordinates stages; app approval gates each handoff", tag: "All five" }
  ]'
  footnote="The tag names the job you write code for; start with that one"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Ideas to spark "where would I embed this?", from existing build/release tools to a whole pipeline. Method names are illustrative app methods, not SDK APIs.

CI console: wrap the test service's rerunTest and compareRuns methods. A developer selects a failing build, the agent gathers repeated results, and the console shows the evidence. Treat flakiness as uncertainty; a single passing rerun does not identify a culprit.

Upgrade crew: embed sessions in the dependency portal's existing branch-and-test workflow, one isolated worktree or worker per dependency. The app creates candidate upgrades and reruns the checks; the agent helps repair incompatibilities within the permitted scope. A person reviews the branch before merging.

Release UI: getReadiness reads blockers, draftRollout builds a proposed plan using the app's existing logic. The deployment service enforces human approval for the exact release and target, regardless of how the request originated. The assistant never treats its own suggestion as approval.

Runbook drill: the runbook goes in as context, the agent works in a throwaway container, and the run log becomes the list of steps a person found unclear.

Exam grader: embed the agent in a learning app. A grading method runs submitted code in an isolated worker and returns permitted results; the agent explains feedback. The app keeps the answer key out of model context and exposed tools, and records the grade itself.

Issue to release, the stretch: add the SDK to a developer portal that already tracks issues, worktrees, CI, and releases. Each stage gets its own session, tools, and rules. App-owned approval gates and a durable workflow record connect the stages. Begin with one existing method and expand only after its permissions and evidence are useful.

Ask the room: which of these is closest to a chore you already have, and which job would you write first?
-->

---

<!-- SLIDE: What You Can Do Today -->
# What You Can Do Today
<WhatYouCanDoTodaySlide
  :today='[
    "Watch your agent work and name the job behind each step",
    "Spot the loop: ask the model, run the tool, feed back the result",
    "List the rules you rely on that live only in a prompt"
  ]'
  :thisWeek='[
    "Read one open-source loop, like pi&#39;s runLoop, end to end",
    "Ask what your agent can see, write, and run, and who decided",
    "Move one prompt-only rule into a hook and watch it hold"
  ]'
  :thisMonth='[
    "Pick an app you own and a method an AI assistant could use",
    "Sketch one tool wrapper; keep user checks and approvals in the app",
    "Decide what its UI shows and what its telemetry records"
  ]'
  footer="A harness is just a loop: pick the place you want to step in, and start there."
/>

<!--
Three steps from noticing the loop to deciding whether to host one.

Today: you need nothing new. The next time an agent works for you, narrate it: that was context, that was a tool call, that was a decision. Once you see the loop, every agent product looks like the same five places to step in. While you watch, note which rules you trust only because they are written in a prompt.

This week: look under the covers. Reading one small loop end to end makes every other harness easier to reason about. Then ask the authority question for the agent you use most: what can it see, write, and run, and who chose that? Move one prompt-only rule into a hook, so it holds no matter how the prompt is worded.

This month: decide where the SDK earns its place inside an app you already own. Choose one existing method and wrap it as a named tool. Keep the authenticated user, argument validation, service authorization, and approval gates in application code. Sketch what the person sees in the existing UI, what the SDK events record, and how the service's result can be checked. Start with one read-only operation and test an unauthorized request as well as a useful answer.
-->

---

<!-- SLIDE: References -->
# References
<ReferencesSlide
  :groups='[
    { title: "🔁 pi and the Copilot SDK", color: "cyan", items: [
  { href: "https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d", label: "pi coding agent (MIT) at f9daca3", description: "agent-loop.ts, agent.ts, agent-session.ts, write.ts, find.ts" },
  { href: "https://github.com/github/copilot-sdk", label: "GitHub Copilot SDK", description: "Architecture, sessions, tools, hooks, examples" },
  { href: "https://www.npmjs.com/package/@github/copilot-sdk", label: "@github/copilot-sdk on npm", description: "1.0.26 used in this talk" },
  { href: "https://github.com/github/copilot-sdk/tree/main/docs/auth", label: "SDK authentication", description: "Signed-in user, token, and BYOK routes" }
] },
    { title: "🛡️ Hooks and Policy", color: "purple", items: [
  { href: "https://docs.github.com/en/copilot/reference/hooks-reference", label: "Copilot hooks reference", description: "Events, preToolUse decisions, policy hook locations" },
  { href: "https://code.visualstudio.com/docs/agent-customization/hooks", label: "VS Code agent hooks (Preview)", description: "Editor hook format and event coverage" },
  { href: "https://docs.github.com/en/copilot/concepts/enterprise/policies", label: "Copilot policies", description: "Enterprise and organization AI controls" },
  { href: "https://docs.github.com/en/copilot/reference/ai-models/supported-models", label: "Supported AI models", description: "Availability by plan and surface" }
] },
    { title: "🛠️ Related Content", color: "blue", items: [
  { label: "Copilot on GitHub", description: "Pull-request acceptance for agent output" },
  { label: "Copilot Primitives", description: "Instructions, prompts, agents, and hooks" },
  { label: "Enterprise Patterns", description: "Rolling out controls across an organization" }
] }
  ]'
/>

---

<!-- SLIDE: Thank You -->
# Thank You
<ThankYouSlide
  title="Harness Fundamentals"
  subtitle="Getting Inside the Agent Loop"
  :cards='[
    { value: "5 jobs", detail: "Loop, context, tools, control, evidence: every hook takes over one" },
    { value: "Your app", detail: "Custom tools call methods you already own" },
    { value: "Your controls", detail: "Keep permissions, approval gates, UI, and telemetry" }
  ]'
  prompt="Which method in an app you own could become a useful AI tool?"
/>
