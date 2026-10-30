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
  tagline="See the five jobs every agent harness does, then take them over in GitHub's harness from your own code."
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
    { icon: "🏗️", title: "Architects", description: "Choose when a workflow earns its own agent app and what it may see" },
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
    { icon: "🧭", title: "Drive GitHub&#39;s Harness", subtitle: "The same five jobs, one quickstart file each", blurb: "Take over four jobs from your own code and build a docs-only onboarding check", slide: 11 },
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
  subtitle="Same loop; GitHub runs it, and your code steps in at the same five places."
  :cards='[
    { icon: "🔁", title: "Same loop, your host", blurb: "Host = the app you write with the SDK; it steps in at five places" },
    { icon: "📂", title: "One file per job", blurb: "01-loop.ts through 05-evidence.ts, one slide each" },
    { icon: "👀", title: "Fresh-eyes check", blurb: "A docs-only agent files a friction report" }
  ]'
  :terminal='{ context: "@github/copilot-sdk 1.0.26 · model auto · FanHub 0ea9e78 · observed 2026-10-26", detail: "24 tool calls · 0 source reads · 3 friction findings" }'
/>

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
    { label: "Tools", description: "Built-in tools, availableTools, excludedTools, defineTool", tag: "pi: write · find" },
    { label: "Control", description: "onPermissionRequest, hooks.onPreToolUse, repository hooks", tag: "pi: beforeToolCall" },
    { label: "Evidence", description: "streaming, session.on(...), tool handlers, hook logs", tag: "pi: emit · afterToolCall" }
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
  title="Your code starts GitHub's loop and decides when it stops"
  codePosition="top"
  :code='{ language: "ts", filename: "examples/sdk-quickstart/01-loop.ts", content: "import { CopilotClient, approveAll } from \"@github/copilot-sdk\";\n\nconst client = new CopilotClient();\nconst session = await client.createSession({ model: \"auto\", onPermissionRequest: approveAll });\n\nconst reply = await session.sendAndWait({ prompt: \"How do I run this project? Two sentences.\" });\nconsole.log(reply?.data.content);\n\nawait session.disconnect();\nawait client.stop();" }'
  :features='[
    { icon: "🖥️", title: "new CopilotClient()", description: "Starts the Copilot CLI runtime: GitHub&#39;s loop." },
    { icon: "⏳", title: "sendAndWait", description: "Runs the loop until the agent is done; returns the reply." },
    { icon: "🛑", title: "disconnect + stop", description: "Ends the session and shuts the runtime down." }
  ]'
  :insight='{ icon: "🔁", text: "Same loop as pi. The SDK hands you the five places to step in." }'
  :progressDots='{ current: 2, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
The runtime runs the loop; your code decides when it starts and when it stops. CopilotClient starts the same Copilot runtime that powers Copilot CLI and talks to it over JSON-RPC, so this loop is the CLI's loop. Not shown, worth knowing: pass a schema as the second argument to sendAndWait and the reply comes back as typed data your code can branch on. session.abort() stops the loop mid-run, for when your budget or your user says the run is over; sendAndWait's timeout (60 seconds by default) only ends your wait, so long tasks pass their own. approveAll is a convenience for this first step; the control slide replaces it. Same loop as pi's runLoop: GitHub runs it, and the next four slides are the four other places your code steps in. Setup: Node 20+; the session runs as the signed-in Copilot CLI user, under that user's license and policy.
-->

---

<!-- SLIDE: SDK Context -->
# SDK Context
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🧠"
  pillLabel="Drive GitHub's Harness · Context"
  title="Your code rewrites one section of what the model is told; the rest stays"
  codePosition="top"
  :code='{ language: "ts", filename: "examples/sdk-quickstart/02-context.ts (trimmed)", content: "const session = await client.createSession({\n  model: \"auto\",\n  onPermissionRequest: approveAll,\n  systemMessage: {\n    mode: \"customize\",\n    sections: { custom_instructions: { action: \"append\", content:\n      \"You are a first-day engineer who trusts only written documentation. \" +\n      \"Cite the file behind every step. \" +\n      \"Label any step that comes from code or config instead of docs as (undocumented).\" } },\n  },\n});" }'
  :features='[
    { icon: "📝", title: "systemMessage", description: "GitHub&#39;s built-in instructions to the model, in named sections." },
    { icon: "🎚️", title: "mode: customize", description: "Edit one section; every other section stays as GitHub wrote it." },
    { icon: "➕", title: "custom_instructions", description: "The section for your rules; here, three sentences appended." }
  ]'
  :insight='{ icon: "💡", text: "Instructions steer the model; the next two slides enforce limits in code." }'
  :progressDots='{ current: 3, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
What: three modes. append (default) adds your text after GitHub's full prompt; customize changes named sections (identity, tone, custom_instructions, and others) and keeps safety and tool_instructions in place; replace sends only your text and removes the SDK's guardrails, including security restrictions.

Why customize: your code edits one named section (here custom_instructions, where repo and org instructions already live) and the rest of GitHub's prompt, including safety, stays as written. The first-day-engineer text is just example content.

When: use instructions for what the model aims at, such as role, tone, and output rules. Instructions steer, and the model follows them most of the time. When a rule must hold every time, enforce it in code with the next two jobs: tools decide what exists, control decides what runs.
-->

---

<!-- SLIDE: SDK Tools -->
# SDK Tools
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🧰"
  pillLabel="Drive GitHub's Harness · Tools"
  title="Your host adds one tool and allows four; the rest disappear"
  codePosition="top"
  :code='{ language: "ts", filename: "examples/sdk-quickstart/03-tools.ts (trimmed)", content: "const OWNERS: Record<string, string> = { \"node/backend/src/routes/\": \"api-team\",\n  \"node/backend/src/database/\": \"data-team\", \"node/frontend/\": \"web-team\" };\nconst lookupOwner = defineTool(\"lookup_owner\", {\n  description: \"Return the team that owns a repository path.\",\n  parameters: { type: \"object\", properties: { path: { type: \"string\" } }, required: [\"path\"] },\n  handler: async ({ path }: { path: string }) => { /* … owner of the matching OWNERS prefix */ },\n});\nconst session = await client.createSession({ model: \"auto\", onPermissionRequest: approveAll,\n  availableTools: [\"view\", \"glob\", \"grep\", \"lookup_owner\"], tools: [lookupOwner] });" }'
  :features='[
    { icon: "➕", title: "What: tools", description: "Adds a tool: name, schema, handler in your app." },
    { icon: "✅", title: "What: availableTools", description: "An allowlist of names; the rest are hidden." },
    { icon: "🎯", title: "When to add one", description: "The answer lives in your systems, outside the repo." }
  ]'
  :insight='{ icon: "🧭", text: "Narrowing the tool set changes the plan the agent makes, before any permission check runs." }'
  :progressDots='{ current: 4, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
Two options, two jobs. `tools` hands the runtime the tool object (name, schema, handler) so the tool exists. `availableTools` is an allowlist of names across built-in, MCP, and custom tools; once set, everything off the list is hidden, so here the agent has no shell at all. `excludedTools` subtracts and always wins.

`lookupOwner` is the JavaScript variable; "lookup_owner" is the name the model sees and the allowlist matches. With only `tools`, the agent keeps every built-in plus yours. With only `availableTools`, "lookup_owner" matches nothing.

When to add a tool: the answer lives in your systems (ownership, tickets, deploy state) and the agent cannot read it from the repo. The handler here reads a three-path OWNERS table; a real one calls your own service. When to narrow: a task that only needs to read gets only read tools, so the agent plans around what exists before any permission check runs.
-->

---

<!-- SLIDE: SDK Control -->
# SDK Control
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="🛂"
  pillLabel="Drive GitHub's Harness · Control"
  title="Before the agent reads, writes, or runs a command, your code says yes or no"
  codePosition="top"
  :code='{ language: "ts", filename: "examples/sdk-quickstart/04-control.ts (trimmed)", content: "const onPermissionRequest: PermissionHandler = (request) => {\n  // … subject = fullCommandText (shell), path (read), or fileName (write)\n  if (request.kind === \"read\") {\n    console.log(`[allow] read ${subject}`);\n    return { kind: \"approve-once\" };\n  }\n  console.log(`[reject] ${request.kind} ${subject}`);\n  return { kind: \"reject\", feedback: \"This session is read-only. Use the view tool to inspect files.\" };\n};\nconst session = await client.createSession({ model: \"auto\", onPermissionRequest });" }'
  :features='[
    { icon: "🛂", title: "onPermissionRequest", description: "Called before every file read, file write, and shell command." },
    { icon: "✅", title: "approve-once or reject", description: "Here: reads are allowed; writes and commands are refused." },
    { icon: "↩️", title: "feedback", description: "The reason goes to the agent, so it finds an allowed way." },
    { icon: "🧱", title: "Repo hooks still run", description: "Rules checked into the repo apply too, and a repo no wins." }
  ]'
  :insight='{ icon: "🔗", text: "Your handler holds this app&#39;s rules; repo hooks hold the rules every agent must follow (enableFileHooks: true)." }'
  :progressDots='{ current: 5, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

<!--
What: every mediated read, write, and shell call asks your handler first. Reads inside the working directory raise requests too (kind read, with request.path), so the handler governs what the agent sees as well as what it changes.

Why feedback: a reject carries a reason, and the reason goes back to the model, just as pi's block reason comes back as a tool result. "Read-only; use the view tool" turns a no into a redirect, and the agent finishes the task on an allowed path.

Repo hooks: a preToolUse hook checked into the repository (FanHub's denies node/backend/src/database/** and fanhub.db*). With enableFileHooks: true, every session your app creates loads it, and a repository deny wins even when your app's own hook says allow. If a hook crashes or exits non-zero, the call is blocked; if it times out, the call runs. A hook you rely on has to be fast.

When to use which: the handler for this app's policy (this session is read-only); repo hooks for rules every tool must obey, whether the caller is your app, Copilot CLI, or the cloud agent.
-->

---

<!-- SLIDE: SDK Evidence -->
# SDK Evidence
<CodeWithFeaturesSlide
  :partNumber='2'
  pillIcon="📡"
  pillLabel="Drive GitHub's Harness · Evidence"
  title="Every event in GitHub's loop reaches your code"
  codePosition="top"
  :code='{ language: "ts", filename: "examples/sdk-quickstart/05-evidence.ts (trimmed)", content: "const session = await client.createSession({\n  model: \"auto\", streaming: true, onPermissionRequest: approveAll });\n\nsession.on(\"assistant.message_delta\", (e) => process.stdout.write(e.data.deltaContent));\nsession.on(\"tool.execution_start\", (e) => console.log(`\\n[tool] ${e.data.toolName}`));\nsession.on(\"tool.execution_complete\", (e) => console.log(`[tool done] success=${e.data.success}`));\nsession.on(\"session.idle\", () => console.log(\"\\n[idle]\"));\n\nawait session.sendAndWait({\n  prompt: \"List the files in this folder, then tell me which one is the entry point.\" });" }'
  :features='[
    { icon: "📡", title: "What: session.on", description: "Messages, tool calls, and idle, as they happen." },
    { icon: "📊", title: "Why: render, count, store", description: "Feed a UI, a budget, or an audit log." },
    { icon: "🔁", title: "Like pi&#39;s subscribe", description: "session.on is the host end of the stream." }
  ]'
  :insight='{ icon: "🧾", text: "Repository hooks add a second record from outside the app; section 3 joins the two by sessionId." }'
  :progressDots='{ current: 6, total: 7, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>

---

<!-- SLIDE: Fresh-Eyes Payoff -->
# Fresh-Eyes Payoff
<TwoColPairedConceptsSlide
  :partNumber='2'
  pillIcon="👀"
  pillLabel="Drive GitHub's Harness · Fresh-Eyes"
  title="A docs-only agent found FanHub's Node guides disagree"
  :left='{ header: "Host decisions", icon: "🧭", items: [
  { title: "Clean clone at a pinned commit", detail: "A fresh temp folder for every run" },
  { title: "Sees docs only", detail: "Docs, manifests, Dockerfiles, scripts; src/ hidden" },
  { title: "report_friction tool", detail: "step, docSays, reality, doc, severity: structured findings" },
  { title: "Bounded", detail: "80 tool calls, then session.abort(); 20-minute timeout" }
] }'
  :right='{ header: "Friction report → docs owner", icon: "📋", items: [
  { title: "confusing: port 3001 vs 5265, Docker or none", detail: "README needs Docker on 3001; SETUP runs on 5265" },
  { title: "blocker: Node 24 and better-sqlite3", detail: "No prebuilt binary; docs name no tested Node version" },
  { title: "confusing: no fallback for native installs", detail: "The agent recovered with npm exec --package=node@20" }
] }'
  :insight='{ icon: "✅", text: "The agent reports friction; the docs owner decides the fixes." }'
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
  header="From Using an Agent to Hosting One"
  :leftItems='[
    "The agent is a black box you prompt from outside",
    "One full-access agent for every question",
    "Rules live in prompts and reviewer memory",
    "The agent&#39;s own summary stands in for the result"
  ]'
  :rightItems='[
    "Just a loop: you choose where to step in, five known places",
    "A host per perspective: docs-only, contract-only",
    "Repo hooks plus a unit-tested host policy",
    "Host-rerun tests and JSONL evidence joined by sessionId"
  ]'
  :metrics='[
    { value: "~170", detail: "lines in pi&#39;s whole runLoop" },
    { value: "24 / 0", detail: "fresh-eyes tool calls / source files opened" },
    { value: "10 / 2", detail: "blind tests passing / failing on the host rerun" }
  ]'
/>

---

<!-- SLIDE: Apps Worth Hosting -->
# Apps Worth Hosting
<FrameworkMappingRowsSlide
  :partNumber='4'
  pillIcon="💡"
  pillLabel="Own It · Ideas"
  title="Six apps worth hosting, and the jobs that make each one work"
  subtitle="Each idea takes over some of the five jobs; the runtime handles the rest"
  :rows='[
    { label: "Flaky hunter", description: "Reruns a failing CI test, bisects recent commits, files the culprit", tag: "Loop + Evidence" },
    { label: "Upgrade crew", description: "One session per dependency; each bumps, tests, and keeps only green", tag: "Loop + Control" },
    { label: "Release prep", description: "Drafts notes from merged PRs, bumps the version; a person tags it", tag: "Tools + Control" },
    { label: "Runbook drill", description: "Follows an incident runbook in a sandbox; flags each unclear step", tag: "Context + Evidence" },
    { label: "Exam grader", description: "Runs a student&#39;s tests while the answer key stays hidden", tag: "Control" },
    { label: "Issue→release", description: "Plan, code, review, ship: one session each, a person between stages", tag: "All five" }
  ]'
  footnote="The tag names the job you write code for; start with that one"
  :progressDots='{ current: 3, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>

<!--
Ideas to spark "what would I build?", ordered from a focused build chore to a whole pipeline.

Flaky hunter: the host owns the loop. It reruns the failing test a few times to confirm it is flaky, then walks recent commits with git bisect, one tool call per step. Evidence: the report names the commit and attaches the rerun counts from the log, so the claim is checkable.

Upgrade crew: one CopilotClient, many sessions, one per dependency. Each session may edit only package.json, the lockfile, and the code that breaks; onPermissionRequest enforces that. The host runs the tests itself and keeps a branch only when they pass.

Release prep: a custom tool returns merged PRs since the last tag, so the agent works from facts. The agent drafts notes and bumps the version; onPermissionRequest sends anything that tags, pushes, or publishes to a person for approval.

Runbook drill: the runbook goes in as context, the agent works in a throwaway container, and the run log becomes the list of steps a person found unclear.

Exam grader: the same visibility idea as the blind test writer: the answer key is hidden from every tool, and the host reruns the tests itself before recording a grade.

Issue to release, the stretch: each stage is its own session with its own systemMessage, tools, and rules. The planner reads the issue and writes a plan; the coder may write only in a worktree; the reviewer is read-only; the release stage reuses release prep. A person approves each handoff, and one log joins every stage. It is a lot to build at once, so start with the one stage that hurts most today.

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
    "Pick one build or release chore and name the jobs you would own",
    "Sketch a small host: one session, one custom tool, one rule",
    "Ask who would read its report, and what they would want in it"
  ]'
  footer="A harness is just a loop: pick the place you want to step in, and start there."
/>

<!--
Three steps from noticing the loop to deciding whether to host one.

Today: you need nothing new. The next time an agent works for you, narrate it: that was context, that was a tool call, that was a decision. Once you see the loop, every agent product looks like the same five places to step in. While you watch, note which rules you trust only because they are written in a prompt.

This week: look under the covers. Reading one small loop end to end makes every other harness easier to reason about. Then ask the authority question for the agent you use most: what can it see, write, and run, and who chose that? Move one prompt-only rule into a hook, so it holds no matter how the prompt is worded.

This month: decide where the SDK earns its place. Choose one chore from your build or release flow, maybe one from the ideas slide, and name the jobs you would take over. A first host can be very small: one session, one custom tool, one permission rule. Before building, name who reads its report; that person defines what good evidence looks like.
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
    { value: "3001 vs 5265", detail: "A port conflict found from the docs alone" },
    { value: "season_id", detail: "An undocumented mismatch a blind tester surfaced" }
  ]'
  prompt="Which of the five jobs do you take over for your workflow?"
/>
