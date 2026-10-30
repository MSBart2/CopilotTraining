---
status: active
updated: 2026-10-26
section: "Extend and Embed"
audience: [developer, platform-engineer, architect]
level: applied
duration: 60
format: core-talk
decision: "Which of the five harness jobs do I take over for this workflow, and what does my host let the agent see, use, and do?"
prerequisites: [copilot-cli]
related: [copilot-primitives, custom-agents, copilot-on-github, enterprise-patterns]
references:
  - url: https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d
    label: "pi coding agent (MIT), pinned at f9daca3"
    verified: 2026-10-26
  - url: https://github.com/github/copilot-sdk
    label: "GitHub Copilot SDK repository"
    verified: 2026-10-26
  - url: https://www.npmjs.com/package/@github/copilot-sdk
    label: "@github/copilot-sdk on npm (1.0.26 used in this talk)"
    verified: 2026-10-26
  - url: https://github.com/github/copilot-sdk/tree/main/docs/auth
    label: "Copilot SDK authentication documentation"
    verified: 2026-10-26
  - url: https://docs.github.com/en/copilot/reference/hooks-reference
    label: "GitHub Copilot hooks reference"
    verified: 2026-10-26
  - url: https://code.visualstudio.com/docs/agent-customization/hooks
    label: "VS Code agent hooks (Preview)"
    verified: 2026-10-26
  - url: https://docs.github.com/en/copilot/concepts/enterprise/policies
    label: "GitHub Copilot policies for enterprises and organizations"
    verified: 2026-10-26
  - url: https://docs.github.com/en/copilot/reference/ai-models/supported-models
    label: "Supported AI models in GitHub Copilot"
    verified: 2026-10-26
---

# Harness Fundamentals: Getting Inside the Agent Loop

> **The Question This Talk Answers:**
> *"How do I get inside the agent loop and change how it behaves?"*

**Duration:** 60 minutes | **Target Audience:** Developers and platform engineers who already use Copilot in the editor or CLI and want the agent inside their own tools

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Every team has workflows that call for a specific perspective: a new hire walking the setup docs, a tester who knows only the API contract. The decision is which workflow earns its own agent host, and what that host lets the agent see, use, and do. |
| **Compelling** | 🟢 High | A whole agent loop fits on one screen, and every hook or SDK callback fills one of five jobs inside it. Once the loop is visible, controlling what an agent *sees* becomes a design move: an agent restricted to the docs found that FanHub's two Node.js guides disagree on the backend port and on whether Docker is required, without opening a source file. |
| **Actionable** | 🟢 High | A five-jobs checklist, five TypeScript quickstart steps from `npm install` to a permission handler, a shared visibility policy, 19 tests across the hook and the policy, and two apps the audience can point at its own repository today. |

**Overall Status:** 🟢 Ready to use

---

## The Promise

Every coding agent is a model inside a **harness**, and a harness is just a loop: ask the model, run what it asks for, feed back the result, repeat. The loop has five jobs, and every hook or SDK callback in this talk steps in at one of them: running the loop, deciding what the model sees each turn, offering and executing tools, deciding which calls run, and recording what happened.

This talk reads one small open-source harness, [pi](https://github.com/earendil-works/pi), to see all five jobs in plain code.[^8] Then it takes over those jobs in GitHub's harness through the [Copilot SDK](https://github.com/github/copilot-sdk), which gives your application the same agent loop that runs Copilot CLI.[^1] Two apps against [FanHub](https://github.com/MSBart2/FanHub), a TV-show fan site with deliberately imperfect docs and about 46 catalogued bugs, show what the jobs unlock:

| App | What the agent may see | What it produces |
|---|---|---|
| **Fresh-eyes onboarding check** | The documentation and nothing else | A friction report: every place the setup docs and reality disagree |
| **Blind test writer** | An API contract and a running server | A test suite written without the implementation, plus a referee's map of failures to known bugs |

Both run in TypeScript on `@github/copilot-sdk` 1.0.26. Every behavior claim below is labeled **observed** (a live run on 2026-10-26) or **tested** (a deterministic unit test in [`examples/`](./examples/)). pi appears as read-only excerpts pinned to commit `f9daca3`; claims about Copilot stay at the surface the SDK exposes.

---

<!-- 🎬 MAJOR SECTION: What a Harness Is -->
## What a Harness Is

A harness is just a loop: ask the model, run what it asks for, feed back the result, repeat. Everything else in this talk is a place to step into that loop.

### Five jobs: five places to step in

| Job | The question it answers | Where pi does it |
|---|---|---|
| **Loop** | When does the agent take another turn, and when does it stop? | `runLoop` in `agent-loop.ts` |
| **Context** | What does the model see on this turn? | `transformContext`, `convertToLlm`, `prepareRequest` |
| **Tools** | What can the agent do, and how does each action run? | Tool definitions such as `write` and `find` |
| **Control** | Which calls actually run? | `beforeToolCall` |
| **Evidence** | What happened, in a form someone can inspect? | `emit(...)` events and `afterToolCall` |

pi is a good reference because it is small, readable, and MIT-licensed. It is one harness among many; the five jobs are the part that transfers.

### Loop: the whole harness fits on one screen

That's the whole harness. pi's entire agent loop is `runLoop`, a single function of about 170 lines.[^8] Trimmed to its skeleton:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L188-L337 (trimmed)
while (true) {                                                       // LOOP: outer, for follow-ups
  let hasMoreToolCalls = true;
  while (hasMoreToolCalls || pendingMessages.length > 0) {           // LOOP: one turn per pass
    for (const message of declareToolChanges(currentContext, [...preparedMessages, ...pendingMessages])) {
      currentContext.messages.push(message);                         // CONTEXT: queued messages join
    }
    const requestUpdate = await config.prepareRequest?.({ context: currentContext, ... }, signal);
    const message = await streamAssistantResponse(currentContext, config, signal, emit, streamFunction);
    const toolCalls = message.content.filter((c) => c.type === "toolCall");
    hasMoreToolCalls = false;
    if (toolCalls.length > 0) {
      const executedToolBatch =
        message.stopReason === "length"
          ? await failToolCallsFromTruncatedMessage(toolCalls, emit)
          : await executeToolCalls(currentContext, message, config, signal, emit); // TOOLS + CONTROL
      hasMoreToolCalls = !executedToolBatch.terminate;
      // … tool results are pushed into currentContext.messages
    }
    await emit({ type: "turn_end", message, toolResults });          // EVIDENCE
    pendingMessages = (await config.getSteeringMessages?.()) || [];
  }
  const followUpMessages = (await config.getFollowUpMessages?.()) || [];
  if (followUpMessages.length > 0) { pendingMessages = followUpMessages; continue; }
  break;
}
```

Read it once and the agent stops being mysterious:

- **The agent keeps going while the model asks for tools.** A reply with no tool calls ends the inner loop. Tool results go back into the context, and the model takes another turn.
- **People can steer mid-run.** Steering messages join before the next turn; follow-up messages restart the loop after the agent would have stopped.
- **Every turn is an event.** `emit` reports turn, message, and tool events, which is where a UI, a log, or a budget attaches.

### Context: rebuilt every turn

Before every model call, pi assembles what the model sees:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L398-L404
let messages = context.messages;
if (config.transformContext) {
  messages = await config.transformContext(messages, signal);
}
const llmMessages = await config.convertToLlm(messages);
```

`transformContext` can prune, summarize, or inject. `prepareRequest`, called just before, can swap the model or thinking level for the next turn. `declareToolChanges` tells the model when the tool list changed. Context is a decision the harness makes on every turn, which is why a host that controls it can shape the agent's whole view.

### Tools: build your own or borrow one

A tool is just a schema the model fills in plus code the harness runs, so a harness can bring its own tools. That code can be pure harness code or a hand-off to an external program; pi's two file tools show both.

#### `write`: built by the harness


pi's `write` tool is 97 lines of pi's own code, with no OS command anywhere:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/coding-agent/src/core/tools/write.ts (trimmed)
const writeSchema = Type.Object({
  path: Type.String({ description: "Path to the file to write (relative or absolute)" }),
  content: Type.String({ description: "Content to write to the file" }),
});
export const writeToolSystemPromptContribution = {
  snippet: "Create or overwrite files",
  guidelines: ["Use write only for new files or complete rewrites."],
} as const;
// …
async execute(_toolCallId, { path, content }, signal?, _onUpdate?, ctx?) {
  const absolutePath = resolveToCwd(path, ctx?.cwd || cwd);
  return withFileMutationQueue(absolutePath, async () => {
    throwIfAborted();
    await ops.mkdir(dirname(absolutePath));
    throwIfAborted();
    await ops.writeFile(absolutePath, content);
    return { content: [{ type: "text", text: `Successfully wrote to ${path}` }], details: undefined };
  });
},
```

- **The schema is the contract** the model fills in, validated before `beforeToolCall` sees it.
- **The prompt snippet and guideline are context.** A tool teaches the model when to use it.
- **The mutation queue and abort checks** keep parallel calls and cancellation safe.
- **`ops` is swappable.** The default writes to local disk; the code comment suggests SSH. The harness decides where an action lands.

#### `find`: borrows `fd`


`find` takes a different shape. By default it delegates to an external program:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/coding-agent/src/core/tools/find.ts#L116, L172, L216 (trimmed)
if (customOps?.glob) {
  const results = await ops.glob(pattern, searchPath, { ignore: ["**/node_modules/**", "**/.git/**"], limit });
  // … format and return
}
const fdPath = await ensureTool("fd");                 // downloads fd if it is missing
const child = spawn(fdPath, args, { stdio: ["ignore", "pipe", "pipe"] });
```

This is the first boundary of the talk. The harness mediates the call: it validates the pattern, can block it, and sees the result. What `fd` does while it runs belongs to `fd` and the operating system. Supply custom `glob` operations and the harness owns the search end to end. Section 3 meets the same boundary in GitHub's harness.

### Control: one hook that can say no

Every tool call passes through `prepareToolCall`, which validates arguments and then asks the host:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L738-L765 (trimmed)
if (config.beforeToolCall) {
  const beforeResult = await config.beforeToolCall(
    { assistantMessage, toolCall, args: validatedArgs, context: currentContext },
    signal,
  );
  if (beforeResult?.block) {
    const result = createErrorToolResult(beforeResult.reason || "Tool execution was blocked");
    if (beforeResult.terminate === true) result.terminate = true;
    return { kind: "immediate", result, isError: true };
  }
}
```

Two details carry straight into GitHub's harness:

- **A block becomes a tool result the model reads.** The `reason` is how the agent learns what to do next, so a good reason names the rule and the alternative.
- **The host sees validated arguments and the whole context.** That is more than a single-event script receives, and it is the difference section 3 builds on.

The loop owns the hook point; the product supplies the policy. pi's own coding agent installs its extension system into that one hook:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/coding-agent/src/core/agent-session.ts#L652-L682 (trimmed)
private _installAgentToolHooks(): void {
  this.agent.beforeToolCall = (context) => this._beforeToolCall(context);
  this.agent.afterToolCall = (context) => this._afterToolCall(context);
}

private async _beforeToolCall({ toolCall, args }, parentToolCallId?) {
  const runner = this._extensionRunner;
  if (!runner.hasHandlers("tool_call")) return undefined;
  return await runner.emitToolCall({
    type: "tool_call",
    toolName: toolCall.name,
    toolCallId: toolCall.id,
    input: args,
  });
  // … a handler that throws blocks the call
}
```

Every `tool_call` extension a user loads gets a vote on every call, and the loop itself never changes. Section 2 shows the same split in GitHub's harness: the SDK owns the loop, and your hooks and handlers supply the policy.

The harness also protects itself: when a reply is cut off by the token limit (`stopReason === "length"`), the loop fails every tool call in that reply, because their arguments may be truncated.

### Evidence: every step is an event

The loop reports everything it does through one function, `emit`. A run produces a small, fixed vocabulary: `agent_start`, `turn_start`, `message_start`, `message_update`, `message_end`, `tool_execution_start`, `tool_execution_update`, `tool_execution_end`, `turn_end`, and `agent_end`. When a tool finishes, the host gets one last look before the result is reported:

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L880-L937 (trimmed)
if (config.afterToolCall) {
  const afterResult = await config.afterToolCall(
    { assistantMessage, toolCall: prepared.toolCall, args: prepared.args, result, isError, context: currentContext },
    signal,
  );
  if (afterResult) {
    result = { ...result, content: afterResult.content ?? result.content, details: afterResult.details ?? result.details };
    // … usage, terminate, and isError can be replaced the same way
  }
}
// …
await emit({
  type: "tool_execution_end",
  toolCallId: finalized.toolCall.id,
  toolName: finalized.toolCall.name,
  result: finalized.result,
  isError: finalized.isError,
  ...(finalized.durationMs === undefined ? {} : { durationMs: finalized.durationMs }),
});
```

```ts
// pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent.ts#L275-L278
subscribe(listener: (event: AgentEvent, signal: AbortSignal) => Promise<void> | void): () => void {
  this.listeners.add(listener);
  return () => this.listeners.delete(listener);
}
```

- **`afterToolCall` sees the arguments and the result together.** It can rewrite the result before the model reads it: redact a secret, trim a huge output, or mark a failure.
- **Each event carries what an audit needs:** which tool, which call, the result, whether it failed, and how long it took.
- **Anything can listen.** The `Agent` class fans every event out to its subscribers, which is where a UI, a log file, or a budget counter attaches. Step 5 of section 2 receives the same kind of stream from GitHub's harness.

---

<!-- 🎬 MAJOR SECTION: Drive GitHub's Harness -->
## Drive GitHub's Harness

### Same loop, GitHub runs it

GitHub's harness is the same loop. GitHub runs it, and your code steps in at the same five places.

The SDK talks to the Copilot runtime over JSON-RPC and, by default, starts and stops that runtime for you.[^1] The runtime runs the loop. Your application takes over the other jobs through the SDK:

| Job | In pi | In GitHub's harness | What it unlocks |
|---|---|---|---|
| **Loop** | `runLoop` | The runtime; your app drives it with `createSession`, `sendAndWait`, `abort` | Run a task to completion, with a timeout you choose, from any Node process |
| **Context** | `transformContext`, `prepareRequest` | `systemMessage` (`append`, `customize`, `replace`), the prompt, `model` | Decide who the agent is, what "done" means, and which model to request |
| **Tools** | `write`, `find` | Built-in tools, `availableTools`, `excludedTools`, `defineTool` | Remove whole capabilities; answer from your own systems |
| **Control** | `beforeToolCall` | `onPermissionRequest`, `hooks.onPreToolUse`, repository hooks | Allow or reject each read, write, shell command, and custom-tool call, with feedback the agent reads |
| **Evidence** | `emit`, `afterToolCall` | `streaming: true`, `session.on(...)`, tool handlers, hook logs | Render progress, count tool calls, enforce a budget, keep an audit trail |

```text
Your app (the host)                          Copilot runtime (the loop)
  context   ── systemMessage ──────────────▶  plan
  tools     ── availableTools / defineTool ▶  pick a tool, call it
  control   ◀── onPermissionRequest ───────  every mediated read, write, shell call
  evidence  ◀── session.on(...) ───────────  deltas, tool calls, results, hook runs
                                               ▲
Repository hooks (.github/hooks/*.json) ───────┘  control + evidence inside your session when you opt in
Organization: who may use Copilot, which models, what it costs
```

The SDK also offers structured output (`sendAndWait(options, schema)`) and three authentication routes: signed-in user, token, or BYOK provider.[^3]

### Before you start

- **Node 20+** and `npm install` in [`examples/`](./examples/). The SDK package bundles the Copilot runtime.
- **Authentication.** With no options, the SDK uses the signed-in Copilot CLI user, so sessions follow that user's Copilot license, policies, and billing. A token or a BYOK provider configuration selects a different route, and BYOK traffic follows the provider's terms.[^3]
- **Run anything that installs packages or starts servers in a disposable environment**, such as a container, Codespace, or temp clone. The apps below clone FanHub into a temp folder for every run.

Each job gets one short, runnable file in [`examples/sdk-quickstart/`](./examples/sdk-quickstart/). The files are numbered in job order (01 loop, 02 context, 03 tools, 04 control, 05 evidence). Run any of them with `npx tsx sdk-quickstart/<file>`.

### Loop: your code starts it and decides when to stop

[`01-loop.ts`](./examples/sdk-quickstart/01-loop.ts) is the whole host:

```ts
import { CopilotClient, approveAll } from "@github/copilot-sdk";

const client = new CopilotClient();
const session = await client.createSession({ model: "auto", onPermissionRequest: approveAll });

const reply = await session.sendAndWait({ prompt: "How do I run this project? Two sentences." });
console.log(reply?.data.content);

await session.disconnect();
await client.stop();
```

The runtime runs the loop; your code decides when it starts and when it stops. **Documented:**[^1][^2]

- **It is Copilot CLI's loop.** `CopilotClient` starts the same Copilot runtime that powers Copilot CLI and talks to it over JSON-RPC.
- **Results can be typed.** Pass a schema as the second argument, `sendAndWait(options, schema)`, and the reply comes back as structured data your code can branch on.
- **`session.abort()` stops the loop.** The `sendAndWait` timeout (60 seconds by default) only ends your wait, so long tasks pass their own.

**Observed:** a correct two-sentence answer about the examples folder. `approveAll` is a convenience for this first step; step 4 replaces it.

### Context: decide what the model is told

[`02-context.ts`](./examples/sdk-quickstart/02-context.ts) adds instructions by editing one named section of GitHub's system prompt. The instructions give the agent a role, a first-day engineer who trusts only written docs, with two behaviors you can check in the output:

```ts
const session = await client.createSession({
  model: "auto",
  onPermissionRequest: approveAll,
  systemMessage: {
    mode: "customize",
    sections: {
      custom_instructions: {
        action: "append",
        content: "You are a first-day engineer who trusts only written documentation. " +
                 "Cite the file behind every step. Label any step that comes from code or config instead of docs as (undocumented).",
      },
    },
  },
});
```

**Documented:** `systemMessage` has three modes.[^2]

| Mode | What the model gets | Use it when |
|---|---|---|
| `append` (default) | GitHub's full prompt, plus your text at the end | You only need to add guidance |
| `customize` | GitHub's prompt, with named sections changed | You want a precise edit that keeps `safety` and `tool_instructions` in place |
| `replace` | Only your text | You accept that the SDK's guardrails, including security restrictions, are removed |

In `customize` mode, each named section (`identity`, `tone`, `environment_context`, `safety`, `tool_instructions`, `custom_instructions`, `last_instructions`, and others) takes one action: `replace`, `remove`, `append`, `prepend`, `preserve`, or a function that receives the section's current text and returns new text. `custom_instructions` is where repository and organization instructions already live, so these instructions sit beside the team's own rules.

**Observed, two runs of the same file.** The instructions ask for two behaviors you can check: a cited file on every step, and "(undocumented)" on anything that comes from code or config. The first run cited the README for setup and `examples/package.json` for the Node 20+ requirement, then cited the step 1 quickstart file as documentation even though it is code. A rerun cited `package.json` on every step and labeled each one "undocumented", exactly as asked. Same code, same instructions, different compliance. An earlier, softer line that described an attitude without a checkable behavior produced no visible change. Instructions steer the model; the next two steps enforce limits in code.

### Tools: add one, allow four

[`03-tools.ts`](./examples/sdk-quickstart/03-tools.ts) gives the agent a tool only your app can answer, then narrows everything else:

```ts
const lookupOwner = defineTool("lookup_owner", {
  description: "Return the team that owns a repository path.",
  parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
  handler: async ({ path }: { path: string }) => { /* … match path in a local OWNERS table */ },
});

const session = await client.createSession({
  model: "auto",
  onPermissionRequest: approveAll,
  tools: [lookupOwner],
  availableTools: ["view", "glob", "grep", "lookup_owner"],
});
```

Two options, two jobs:[^2]

| Option | Takes | What it does |
|---|---|---|
| `tools` | Tool objects | Adds a tool: its name, schema, and a handler that runs in your process |
| `availableTools` | Tool names | An allowlist across built-in, MCP, and custom tools. Anything off the list is hidden. `excludedTools` subtracts and always wins |

`lookupOwner` is the JavaScript variable; `"lookup_owner"` is the name the model sees and the allowlist matches. With only `tools`, the agent keeps every built-in plus yours. With only `availableTools`, `"lookup_owner"` matches nothing. The handler in the example answers from a hard-coded table of three paths; a real one calls your own systems.

**Observed:** asked who reviews `node/backend/src/routes/characters.js` and then to run `git log`, the agent called `lookup_owner`, answered "api-team," and reported that it "couldn't run git log because this session doesn't provide a command-execution tool." Narrowing the tool set changes the plan the agent makes, before any permission check runs.

### Control: decide what it can do

[`04-control.ts`](./examples/sdk-quickstart/04-control.ts) replaces `approveAll` with a handler that judges every mediated call:

```ts
const onPermissionRequest: PermissionHandler = (request) => {
  if (request.kind === "read") return { kind: "approve-once" };
  return { kind: "reject", feedback: "This session is read-only. Use the view tool to inspect files." };
};

const session = await client.createSession({ model: "auto", onPermissionRequest });
```

**Observed:** asked to count lines in each `.ts` file "using a shell command if that is fastest," the agent's `Get-ChildItem … | Measure-Object` was rejected. It switched to `view`, made six approved reads, and returned correct counts. Two details matter for everything that follows:

- **Reads inside the working directory raise permission requests too** (`kind: "read"`, with `request.path`), so a handler can govern what the agent sees, along with what it changes.
- **The `feedback` string shapes the recovery.** The agent read "use the view tool" and did exactly that, just as pi's block `reason` comes back as a tool result.

The request carries rich detail per kind: `read` has `path`; `write` has `fileName` and `newFileContents`; `shell` has `fullCommandText`, `commands[]`, `possiblePaths`, and `hasWriteFileRedirection`; `custom-tool` has `toolName`.[^2]

#### Hooks and the host: two ways to say no

Your handler governs the sessions your app creates. Repository hooks reach the same decision point from outside: they take over **control** and **evidence** (plus a little **context** at `sessionStart`) in every harness that loads them. The two compose.

| | **Hooks** | **SDK host** |
|---|---|---|
| **Where they live** | JSON in `.github/hooks/`, scripts beside it, or machine-wide policy files[^4] | Your application's code |
| **Which sessions they reach** | Every harness that loads them: Copilot CLI, VS Code, cloud agent (event coverage varies)[^4][^5] | The sessions your app creates |
| **What they see** | One event payload on stdin, in a fresh process | The whole session: history, state, your app's identity and data |
| **What they can change** | Inject context at `sessionStart`; `allow`, `deny`, or `ask` at `preToolUse`; log at `postToolUse` | Persona, model, tool set, domain tools, per-call decisions, budgets, follow-up sessions |
| **What you own** | A fast script | Authentication, version pins, process lifecycle, timeouts, cleanup |

**The hook contract.** A `preToolUse` command hook reads the tool call as JSON and prints one decision object. Four rules from the hooks reference shape every hook script:[^4]

| Behavior | Design consequence |
|---|---|
| A command `preToolUse` hook that crashes or exits non-zero **denies** the call | Return an explicit deny with a reason for input you cannot parse |
| A command hook that **times out is fail-open**, including policy hooks | Keep it local and fast. **Tested:** FanHub's hook completes in about 55 ms against a 5-second budget |
| Stdout carries exactly one JSON object | Every code path prints one decision |
| `permissionDecisionReason` is shown to the agent | Name the rule and point to the alternative |

**The repository floor.** FanHub's database belongs to the data team, so [`pre-tool-use.mjs`](./examples/fanhub-overlay/scripts/harness-fundamentals/pre-tool-use.mjs) denies any mediated access to `node/backend/src/database/**` and `fanhub.db*` files, in every harness that loads it:

```js
const hits = findProtectedHits(call.paths, input.cwd);
if (hits.length > 0) {
  return { permissionDecision: "deny", permissionDecisionReason: `Protected path (${hits[0].ruleId}): ${hits[0].path}. ...` };
}
return {};   // no opinion: the normal permission flow decides
```

An SDK app opts into that floor with `enableFileHooks: true`. **Observed:** in a dedicated precedence probe, a repository `preToolUse` deny held while the SDK's own `onPreToolUse` returned `allow`; the SDK callbacks were never invoked for that call. A team can rely on its repository rules surviving any host that loads them, and each app adds the rules its own purpose needs.

### Evidence: every event reaches your code

[`05-evidence.ts`](./examples/sdk-quickstart/05-evidence.ts) turns on streaming and subscribes to the session, the same move as pi's `subscribe`:

```ts
const session = await client.createSession({ model: "auto", streaming: true, onPermissionRequest: approveAll });

session.on("assistant.message_delta", (e) => process.stdout.write(e.data.deltaContent));
session.on("tool.execution_start", (e) => console.log(`\n[tool] ${e.data.toolName}`));
session.on("session.idle", () => console.log("\n[idle]"));
```

**Observed:** `[tool] powershell`, three `[tool] view` calls, the streamed answer, then `[idle]`. Every one of those events is something your app can render, count, or store. On Windows the built-in tools include `powershell`, `view`, `glob`, and `grep`. Repository hooks add a second record from outside the app: section 3 joins the two by `sessionId`.

### What is worth building

The pattern that pays off most is **an agent with a deliberate perspective**. A full-access agent answers "make this work." A constrained one can answer questions a full-access agent cannot:

- *Can a newcomer get this running from the docs alone?* Hide the source. (Fresh-eyes, section 2.)
- *Does the API do what its contract says?* Hide the implementation. (Blind tests, section 3.)
- *Is this PR understandable from its description?* Show only the diff and the description.
- *Would this migration guide work on a clean machine?* Allow only the commands the guide names.

Each one is the same host with different answers to three questions: what may the agent see, what may it use, and who reads its report.

### Payoff: the fresh-eyes onboarding check

Five steps are enough to build a real tool. [`apps/fresh-eyes/app.ts`](./examples/apps/fresh-eyes/app.ts) asks a single question: *can a capable newcomer get FanHub's Node.js track running from the documentation alone?*

| Host decision | How |
|---|---|
| **Clean start** | Clone FanHub at a pinned commit into a temp folder for every run |
| **Who the agent is** | `customize` persona: first-day engineer, follows the docs literally, reports friction *before* working around it |
| **What it can see** | Docs, `package.json`, `.env.example`, Dockerfiles, and scripts. Any `src/` folder is hidden |
| **What it can do** | Write only `.env`; run an allowlist of setup commands; no web tools |
| **What it reports** | A `report_friction` tool with `step`, `docSays`, `reality`, `doc`, and `severity` |
| **Bounds** | 80 tool calls (then `session.abort()`), 20-minute timeout, stop anything left on port 5265 |

The friction tool is a few lines, and it turns the agent's experience into structured data:

```ts
const reportFriction = defineTool("report_friction", {
  description: "Record one place where the documentation and what you observed disagree, or where the docs left you guessing.",
  parameters: { /* step, docSays, reality, doc, severity: blocker | confusing | minor */ },
  handler: async (f: Finding) => {
    findings.push(f);
    return `Recorded (${findings.length} so far). Continue.`;
  },
});
```

**Observed** (24 tool calls, 20 allowed and 1 denied by the host, zero source files opened). The agent reached `GET /api/characters → 200 OK` and filed three findings:

| Severity | Docs say | Reality |
|---|---|---|
| **blocker** | `node/SETUP.md`: "Requires: Node.js 18+", then `npm install` | On Node 24, `better-sqlite3` has no prebuilt binary and the source-build fallback needs Python. The docs name no tested Node version or native-build prerequisites |
| **confusing** | `node/README.md`: Docker Desktop is a prerequisite; backend on **port 3001** | `node/SETUP.md`: "Local Runtime (No Docker required)" on **port 5265**. The two guides disagree |
| **confusing** | Only "Node.js 18+" | No fallback for native-install failures. The agent recovered with `npm exec --package=node@20` |

The one host denial was an ad-hoc script to download a Node.js archive, outside the command allowlist. The agent recorded that as friction and moved to an allowed route.

A human who already knows the project skips over every one of these findings. The report goes to the docs owner, who decides which ones to fix. Each run starts from a clean clone, so the same check works in CI after every docs change.

---

<!-- 🎬 MAJOR SECTION: Decide What It Sees -->
## Decide What It Sees

### One policy, two checkpoints

Both apps share [`host-kit/visibility.ts`](./examples/host-kit/visibility.ts). An app supplies plain predicates over repo-relative paths, so every rule unit-tests:

```ts
const policy = createVisibilityPolicy({
  repoRoot: checkout.dir,
  hidden: isHiddenFromBlindTester,       // never visible, any access kind
  readable: isBlindReadable,             // optional allowlist for reads
  writable: isBlindWritable,             // where the agent may create files
  shellCommands: BLIND_SHELL,            // executables it may run
  shellTextDeny: BLIND_TEXT_DENY,        // text that reaches hidden material indirectly
  customTools: new Set(["api_contract"]),
  hiddenFeedback: "You are testing a black box. ... Use api_contract and live HTTP calls.",
});

createSession({ ..., onPermissionRequest: policy.onPermissionRequest, hooks: { onPreToolUse: policy.onPreToolUse } });
```

The policy uses both SDK checkpoints, because each sees something the other does not:

| Checkpoint | Sees | Catches |
|---|---|---|
| `hooks.onPreToolUse` | Raw tool arguments for every tool | A `grep` whose scope would sweep a hidden folder; a `view` of a hidden path |
| `onPermissionRequest` | The runtime's parsed request | Reads of hidden paths; writes outside the output folder; write *contents* that would read hidden files at runtime; shell commands by executable, parsed path, and text |

That second column is where a host goes past a repository hook, the same way pi's `beforeToolCall` sees the whole context. A hook script receives the call's arguments; the host receives the runtime's analysis of the call, holds the session's state, and serves its own tools. Three checks in this policy depend on that:

- **Write-content inspection.** A test file that calls `readFileSync('../../src/…')` would read hidden code *when it runs*. The host rejects the write: "That file would read hidden material when it runs." **Tested.**
- **Executable allowlists per segment.** The host splits `cd node/backend; npm start | tee log` into `cd`, `npm`, and `tee`, ignores separators inside quoted arguments, and checks each. **Tested** with 5 command shapes.
- **Per-app rules from one engine.** Fresh-eyes hides `src/` and allows docs. Blind tests hides docs and allows the test folder. The same 190-line policy serves both with different predicates.

### The climax: the blind test writer

[`apps/blind-tests/app.ts`](./examples/apps/blind-tests/app.ts) asks the opposite question from fresh-eyes: *does the API behave the way its contract says, judged by someone who has never seen the code?*

| Host decision | How |
|---|---|
| **Environment** | Clean clone, `npm install`, server started by the host on port 5299 |
| **The only view of the API** | An `api_contract` tool, built by the host from `SETUP.md`'s endpoint list with every bug hint ("has cache bug!") stripped |
| **Hidden** | `node/backend/src`, the frontend, other language tracks, `docs/`, the database, and every Markdown file, including `BUGS.md` |
| **Writable** | `node/backend/__tests__/blind/` only |
| **Persona** | Black-box tester: assert what a careful client expects from the contract and REST conventions; never weaken a failing test |
| **Proof** | The host reruns the suite itself and records TAP output; the agent's own account is a summary |
| **Reveal** | A second, read-only **referee session** gets `view`, `grep`, and `glob`, reads `BUGS.md` and the source, and maps each failing test to a documented bug, or labels it undocumented |

**Observed** (18 tool calls, 19 allowed and 2 denied by the host). The agent called `api_contract`, wrote five test files (characters, episodes, shows, quotes, authentication), and ran them. The host's rerun reported **10 passing, 2 failing**:

| Failing test | Test result | Referee's verdict |
|---|---|---|
| `POST /api/characters` returns 201 for valid input | `FAIL`: received 500 | BUGS.md **#19**, Missing Input Validation |
| `GET /api/episodes?seasonId=1` returns only season 1 | `FAIL`: episodes from every season | **Not documented.** `SETUP.md` documents `seasonId`; the route reads `season_id`, so the filter is silently ignored |

The second row is the point. The blind tester surfaced a contract mismatch, and the referee session, with read access to `BUGS.md` and the route source, found no matching entry and labeled it undocumented, leaving the nearby cache entry (#2) unassigned. The two denials were a `view` of a README in the test folder (Markdown is hidden) and a `git status`.

A second run of the same app wrote a different suite (9 passing, 5 failing, mapped to BUGS.md #9, #6, and #17). Agent output varies run to run, which is why the host reruns the tests and a separate session does the mapping.

### The repository floor, inside both apps

Both apps set `enableFileHooks: true`. **Observed:** FanHub's repository hooks ran inside both sessions: 19 `preToolUse` and 22 `postToolUse` invocations in fresh-eyes, 12 and 16 in blind tests, plus `sessionStart`, `sessionEnd`, and FanHub's own prompt hooks. Neither agent reached for the database, so the floor never had to deny. It was in place for every call, and it is the layer that holds even if an app's own policy has a gap.

### What the host cannot see

- **Code your tests execute.** `node --test` runs files with full process access. Write-content inspection catches the obvious reach-ins; a determined test could still read the disk. Run in a container when that matters.
- **Anything outside mediated tools.** The policy decides tool calls. Other processes, other users, and the network are governed by the OS account, container, and network controls.
- **Whether the contract or the code is right.** A failing blind test is a disagreement. The API owner decides which side changes.

This is pi's `find` → `fd` boundary again: the harness decides the call and sees its result, and the operating system governs what happens inside the process the call starts.

### Evidence you keep

[`host-kit/run-log.ts`](./examples/host-kit/run-log.ts) attaches to the session and writes one JSON line per event, from three layers, joined by `sessionId`:

```json
{"layer":"repo-hook","event":"hook.end","sessionId":"909bf25c-…","hook":"preToolUse","success":true,"decision":null}
{"source":"host-policy","layer":"pre-tool","kind":"view","subject":"node/backend/__tests__/readme.md","decision":"deny","rule":"hidden"}
{"source":"host-policy","layer":"permission","kind":"shell","subject":"git status --short","rule":"command-not-allowed:git","decision":"deny"}
{"layer":"runtime","event":"tool.complete","sessionId":"909bf25c-…","toolCallId":"call_LjFW…","success":true}
{"layer":"host","event":"session-end","sessionId":"909bf25c-…","outcome":"completed","toolCalls":18,"allow":19,"deny":2}
```

Every run also produces a human-readable report (`friction-report.md` or `blind-report.md`) with the outcome, tool-call count, policy totals, findings, and the list of host denials. Three practices make the evidence trustworthy:

- **Record decisions apart from executions.** An allowed call can still fail.
- **Log names, rules, and counts.** Leave file contents and command output out of the log by construction.
- **Make the host the source of truth.** The blind-test host reruns the suite itself; the friction report comes from tool calls, independent of the agent's closing summary.

---

<!-- 🎬 MAJOR SECTION: Own It -->
## Own It

A harness you share becomes a harness someone owns. Two things travel with it: the controls other people already set around Copilot, and a pre-flight that tells the next person what they are running.

### The controls around your app

Your app runs inside decisions other people own. Knowing them tells you what the app can assume and who to involve before you share it.

**Policy hooks are the administrator's way in.** Copilot CLI loads machine-wide hooks first, from `C:\ProgramData\GitHub\Copilot\policy.d\*.json`, `/etc/github-copilot/policy.d`, or the `HKLM\Software\Policies\GitHub\Copilot` registry key, and `disableAllHooks` leaves them running.[^4] A platform team can put the database rule there for every developer machine.

| Decision | Owner and enforcement point | What to verify for your app |
|---|---|---|
| Who can use Copilot, on which surfaces? | Enterprise and organization admins, through Copilot policies[^6] | The effective access of the identity your app runs as |
| Which models are available? | Admins set availability; your app requests a model[^6][^7] | `model: "auto"` or a named model is a request. Check what the session used |
| Who pays, and under which terms? | Billing admins; the authentication route[^3] | Signed-in user and token routes follow Copilot licensing and policy. BYOK follows the provider's terms and needs its own review |
| Which hooks always run? | Platform team (policy hooks); repository owners (`.github/hooks/`)[^4] | Policy hooks load first. Your app loads repository hooks with `enableFileHooks: true` |
| Which tools and MCP servers can run? | Admins through managed settings; your app through `availableTools` and its handler | Requests flagged `managedApprovalRequired` need a human approval path |
| What can the process reach? | Platform and service owners: OS account, container, network | The real boundary. Run installs and servers in a disposable environment |
| Who accepts the output? | The repository or docs owner | The friction report goes to the docs owner; failing blind tests go to the API owner. See [Copilot on GitHub](../copilot-on-github/README.md) for pull-request acceptance |

### Pre-flight before someone else runs your app

- [ ] Pin `@github/copilot-sdk` and record the runtime version in every report.
- [ ] Start every run from a clean, pinned checkout.
- [ ] Bound every session: tool-call budget, `sendAndWait` timeout, cleanup in `finally`.
- [ ] Unit-test each visibility rule against real request shapes.
- [ ] Set `enableFileHooks: true` so the repository floor applies.
- [ ] Decide the authentication route, and confirm model availability and billing for the people who will run it.
- [ ] Name the owner who reads each report and decides what changes.

### How deep to go

```text
Does a note at session start steer the agent well enough?
  └─ yes → sessionStart hook. Done.
Must a specific call never run, in every harness?
  └─ yes → preToolUse hook in the repo, or a policy hook on the machine. Keep it fast.
Does the workflow need its own persona, tool set, domain tools,
visibility rules, budget, or a structured report?
  └─ yes → an SDK host, with enableFileHooks so the repository floor still applies.
```

---

## What You Can Do Today

### 15 minutes: read the loop, then run your first session

Open pi's [`agent-loop.ts`](https://github.com/earendil-works/pi/blob/f9daca3480732d0042b1df3a6e27221f597a620d/packages/agent/src/agent-loop.ts) at the pinned commit and find the five jobs in `runLoop`. Then run GitHub's harness from your own code:
```powershell
cd tech-talks/harness-fundamentals/examples
npm install
npx tsx sdk-quickstart/01-loop.ts
npx tsx sdk-quickstart/04-control.ts
```

Success looks like an answer from step 1 and, from step 4, a `[reject] shell …` line followed by the agent recovering through approved reads.

### 1 hour: run both apps

```powershell
npm test                    # 19 tests: hook decisions and visibility rules
npm run fresh-eyes          # writes .runs/fresh-eyes-<ts>/friction-report.md
npm run blind-tests         # writes .runs/blind-tests-<ts>/blind-report.md and tests.tap
```

Set `FANHUB_SOURCE` to a local FanHub clone to skip the network clone. Open the report and `events.jsonl`; find the host denials and the repository `preToolUse` runs for the same `sessionId`.

### 2–4 hours: point one at your repository

1. Copy `host-kit/` and one app.
2. Rewrite the rules file: what the agent sees, what it writes, which commands it runs.
3. Add tests for each rule with your real paths, then run the app on a clean clone.
4. Hand the first report to its owner and ask what they would change.

### Apply it to your work

Pick one workflow where a fresh, constrained perspective would help: setup docs, API contracts, a PR description, a runbook. Which of the five jobs do you take over? What does your agent need to see, what stays hidden, which tools does it get, and who reads its report?

---

## References

[^1]: [GitHub Copilot SDK repository](https://github.com/github/copilot-sdk): architecture (application → SDK → JSON-RPC → Copilot runtime), sessions, tools, hooks, examples.
[^2]: [@github/copilot-sdk 1.0.26](https://www.npmjs.com/package/@github/copilot-sdk): `PermissionRequest` kinds and fields, `systemMessage` modes and sections, `SessionHooks`, `enableFileHooks`, `defineTool`, from the published type definitions.
[^3]: [Copilot SDK authentication](https://github.com/github/copilot-sdk/tree/main/docs/auth): signed-in user, token, and BYOK routes.
[^4]: [GitHub Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference): events, payloads, `preToolUse` decisions, fail-closed and fail-open behavior, policy hook locations.
[^5]: [VS Code agent hooks (Preview)](https://code.visualstudio.com/docs/agent-customization/hooks): the editor's hook format and event coverage.
[^6]: [Copilot policies for enterprises and organizations](https://docs.github.com/en/copilot/concepts/enterprise/policies): AI controls for features, agents, and models.
[^7]: [Supported AI models in GitHub Copilot](https://docs.github.com/en/copilot/reference/ai-models/supported-models): availability by plan and surface.
[^8]: [pi coding agent, earendil-works/pi@f9daca3](https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d) (MIT): `packages/agent/src/agent-loop.ts` (`runLoop`, `streamAssistantResponse`, `prepareToolCall`), `packages/coding-agent/src/core/tools/write.ts`, and `find.ts`.

---

## 🎭 Behind the Scenes

### How the evidence was produced

All live runs used `@github/copilot-sdk` 1.0.26 with `model: "auto"`, Node 24.22.1 on Windows, and FanHub at commit `0ea9e78`, cloned fresh into a temp folder per app run, on 2026-10-26.

| Run | What was observed |
|---|---|
| Quickstart 01–05 | Answer in ~50 s cold; instructions followed unevenly (run 1 cited a code file as documentation; a rerun on 2026-10-26 labeled every step correctly); `lookup_owner` used and shell absent; shell rejected and recovered through reads; streamed tool events. Recorded under the earlier file names `01-hello`, `03-persona`, `04-tools`, `05-permissions`, and `02-stream`; the code is unchanged |
| Fresh-eyes | 24 tool calls, 20 allowed, 1 denied; 3 friction items; `/api/characters` reached 200 through Node 20; no source reads |
| Blind tests, run A | Agent reported 9 passing, 5 failing; referee mapped to BUGS.md #9, #6, #17 and flagged one test's own query-parameter choice |
| Blind tests, run B | Host rerun 10 passing, 2 failing; BUGS.md #19 and the undocumented `seasonId` / `season_id` mismatch |
| Precedence probe | Repository `preToolUse` deny held while the SDK `onPreToolUse` returned `allow` |

The deterministic tests are the contract; the live runs show the contract operating in real sessions, and their wording varies from run to run.

### The pi excerpts

pi was read as source at commit `f9daca3480732d0042b1df3a6e27221f597a620d` under its MIT license; it was not installed or run for this talk. Excerpts are trimmed with `// …` and keep the original identifiers.

| Excerpt | File and lines |
|---|---|
| The loop | `packages/agent/src/agent-loop.ts`, `runLoop` L172-L341 (excerpt L188-L337) |
| Context | `agent-loop.ts` L398-L404, `streamAssistantResponse` |
| Control | `agent-loop.ts` L738-L765, `prepareToolCall`; truncated-reply rule L272-L281 |
| Control, wired by the product | `packages/coding-agent/src/core/agent-session.ts` L652-L682, `_installAgentToolHooks` and `_beforeToolCall` |
| `write` | `packages/coding-agent/src/core/tools/write.ts`, 97 lines |
| `find` | `packages/coding-agent/src/core/tools/find.ts`: custom `glob` L116, `ensureTool("fd")` L172, `spawn` L216 |
| Evidence | `agent-loop.ts` L880-L912, `afterToolCall`; L929-L937, `emitToolExecutionEnd`; `packages/agent/src/agent.ts` L275-L278, `subscribe` |

Claims about GitHub's harness stay at the SDK surface: what the SDK lets a host configure and observe. The runtime's internal loop is out of scope.

### A setup note for Node 22 and later

FanHub pins `better-sqlite3` ^9, which ships no prebuilt binary for Node 22+. The fresh-eyes agent reports that as a blocker, which is the finding we want. The blind-test host needs a running server, so on Node 22+ it installs `better-sqlite3@^12` with `--no-save` and leaves FanHub's `package.json` untouched.
