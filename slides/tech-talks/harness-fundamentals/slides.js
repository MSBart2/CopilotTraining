/*
  Harness Fundamentals — native deck data and teaching notes.
  Structure follows the user-waived conversion plan in deck.recipe.yml.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    pi: { label: 'pi source at pinned MIT commit f9daca3', href: 'https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d' },
    sdk: { label: 'GitHub Copilot SDK repository', href: 'https://github.com/github/copilot-sdk' },
    npm: { label: '@github/copilot-sdk 1.0.26 package', href: 'https://www.npmjs.com/package/@github/copilot-sdk' },
    auth: { label: 'Copilot SDK authentication documentation', href: 'https://github.com/github/copilot-sdk/tree/main/docs/auth' },
    authMethods: { label: 'Copilot SDK authentication methods (subscription required by method)', href: 'https://github.com/github/copilot-sdk/blob/main/docs/auth/authenticate.md' },
    s2s: { label: 'Copilot SDK server-to-server authentication', href: 'https://github.com/github/copilot-sdk/blob/main/docs/auth/server-to-server-tokens.md' },
    byok: { label: 'Copilot SDK bring your own key (BYOK)', href: 'https://github.com/github/copilot-sdk/blob/main/docs/auth/byok.md' },
    tenancy: { label: 'Copilot SDK multi-tenancy and server deployments', href: 'https://github.com/github/copilot-sdk/blob/main/docs/setup/multi-tenancy.md' },
    hooks: { label: 'GitHub Copilot hooks reference', href: 'https://docs.github.com/en/copilot/reference/hooks-reference' },
    vscode: { label: 'VS Code agent hooks documentation (Preview)', href: 'https://code.visualstudio.com/docs/agent-customization/hooks' },
    policies: { label: 'Copilot enterprise and organization policies', href: 'https://docs.github.com/en/copilot/concepts/enterprise/policies' },
    models: { label: 'Supported Copilot models', href: 'https://docs.github.com/en/copilot/reference/ai-models/supported-models' },
    examples: { label: 'Talk examples and tests', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples' },
    blind: { label: 'Blind-test app source', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/harness-fundamentals/examples/apps/blind-tests/app.ts' },
    fresh: { label: 'Fresh-eyes app source', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/harness-fundamentals/examples/apps/fresh-eyes/app.ts' },
    visibility: { label: 'Shared visibility policy and tests', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples/host-kit' },
    runLog: { label: 'Run log implementation', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/harness-fundamentals/examples/host-kit/run-log.ts' },
    overlay: { label: 'FanHub repository hook overlay', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples/fanhub-overlay' }
  };

  const slides = [
    S('title', 0, 'Harness Fundamentals', {
      chrome: false, visual: 'harness-loop',
      subtitle: 'Getting Inside the Agent Loop',
      tagline: 'Understand the loop, then bring AI into your existing apps with tools, controls, and telemetry.',
      meta: 'Extend and Embed · Practitioner Tech Talk · 60 minutes · Copilot SDK 1.0.26'
    }),
    S('core-question', 0, 'What is an agent harness, and why do I care?', {
      pill: 'Core Question',
      subtitle: 'A harness is the code that runs the agent loop. The Copilot SDK lets your app host one.',
      highlight: 'Your existing methods become tools, and your app keeps user authority, approval, and evidence.',
      routing: ['Loop', 'Context', 'Tools', 'Control', 'Evidence'], routingLabel: 'Five jobs a harness does',
      roles: [
        { icon: '🧩', title: 'If your app has answers', description: 'People ask questions a service method you own already answers.' },
        { icon: '🔁', title: 'If a check repeats', description: 'You run the same agent review by hand, change after change.' },
        { icon: '🛡️', title: 'If you own the rules', description: 'Your app decides what the agent sees, which calls run, and what gets logged.' }
      ],
      stats: [
        { title: 'One readable loop', description: 'pi exposes the mechanism in source.' },
        { title: 'One app method', description: 'A narrow tool can reuse existing capability.' },
        { title: 'One controls checklist', description: 'Who governs access, models, hooks, and billing.' }
      ]
    }),
    S('contents', 0, 'What a harness is, then why you would host one', {
      pill: 'Route · Four parts',
      sections: [
        { icon: '🔁', title: 'What a Harness Is', subtitle: 'Read pi as source', blurb: 'Name five jobs and see how a small loop handles each.', slide: 4 },
        { icon: '🧰', title: "Drive GitHub's Harness", subtitle: 'Use an app you own', blurb: 'Connect a release question to an existing service method.', slide: 12 },
        { icon: '🔍', title: 'Decide What It Sees', subtitle: 'Test a deliberate view',         blurb: 'Hide the implementation, rerun tests, and inspect evidence.', slide: 22 },
                { icon: '💡', title: 'Controls and Ideas', subtitle: 'Check the controls, pick an app', blurb: 'Who governs the harness, and where to embed it next.', slide: 29 }
      ]
    }),
    S('part-1', 1, 'What a Harness Is', {
      scene: 'opener',
      subtitle: 'Read pi as source, one slide per job: loop, context, tools, control, and evidence.',
      cards: [
        { icon: '🔁', title: 'See the loop', blurb: 'One function runs turns and stops' },
        { icon: '🧰', title: 'Name each job', blurb: 'Every hook lands in a known place' },
        { icon: '📡', title: 'Follow the result', blurb: 'Events let a host observe the work' }
      ],
      terminal: { context: 'Read-only source · pi at f9daca3', detail: 'The five jobs transfer; the implementation is one example' }
    }),
    S('five-jobs', 1, 'A harness has five jobs', {
      scene: 'job-rows', pill: 'What a Harness Is · Map',
      subtitle: 'Each job answers a different question in the agent loop.',
      rows: [
        { label: 'Loop', detail: 'When does the agent take another turn, and when does it stop?', proof: 'runLoop', z: 'local' },
        { label: 'Context', detail: 'What does the model see on this turn?', proof: 'transformContext · prepareRequest', z: 'remote' },
        { label: 'Tools', detail: 'What can the agent request, and what runs it?', proof: 'write · find', z: 'github' },
        { label: 'Control', detail: 'Which requested calls actually run?', proof: 'beforeToolCall', z: 'orange' },
        { label: 'Evidence', detail: 'What happened, in a form a host can inspect?', proof: 'emit · afterToolCall', z: 'green' }
      ],
      footnote: 'pi is one small, readable harness; the five jobs are the reusable decision model.'
    }),
    S('pi-loop', 1, 'pi keeps taking turns while work remains', {
      scene: 'flow', pill: 'What a Harness Is · Loop',
      subtitle: 'A tool result returns to context; an empty turn ends the inner loop.',
      nodes: [
        { title: 'Ask the model', detail: 'streamAssistantResponse reads the current context.', z: 'local' },
        { title: 'Run requested tools', detail: 'Validated calls execute or return an error result.', z: 'remote' },
        { title: 'Feed back results', detail: 'Tool results join context before another turn.', z: 'green' }
      ],
      codeSource: 'pi@f9daca3 · packages/agent/src/agent-loop.ts#L188-L330 (trimmed)',
      code: [
        'while (hasMoreToolCalls || pendingMessages.length > 0) {',
        '  await emit({ type: "turn_end", message, toolResults });'
      ],
      footer: 'No tool call ends the turn loop; queued steering or follow-up messages can start another turn.'
    }),
    S('pi-context', 1, 'pi rebuilds the model view before each request', {
      scene: 'flow', pill: 'What a Harness Is · Context',
      subtitle: 'The harness decides what messages and tool declarations reach the model.',
      nodes: [
        { title: 'Current messages', detail: 'The conversation and queued messages.', z: 'local' },
        { title: 'transformContext', detail: 'Prune, summarize, or inject context.', z: 'purple' },
        { title: 'convertToLlm', detail: 'Convert the prepared messages.', z: 'remote' },
        { title: 'Model request', detail: 'prepareRequest can choose model or thinking level.', z: 'green' }
      ],
      codeSource: 'pi@f9daca3 · packages/agent/src/agent-loop.ts#L398-L404',
      code: [
        'let messages = context.messages;',
        'if (config.transformContext) {',
        '  messages = await config.transformContext(messages, signal);',
        '}',
        'const llmMessages = await config.convertToLlm(messages);'
      ],
      footer: 'declareToolChanges tells the model when the available tool list changes.'
    }),
    S('pi-tools', 1, 'A tool is a contract plus the code that runs it', {
      scene: 'detail-rows', pill: 'What a Harness Is · Tools',
      subtitle: 'pi’s write tool: the model fills a schema, and harness code performs the file mutation.',
      columns: ['Piece', 'Example', 'What it contributes'],
      rows: [
        { label: 'Schema', detail: 'path and content', proof: 'The model fills a validated contract.', z: 'local' },
        { label: 'Context', detail: '“Create or overwrite files”', proof: 'The snippet and guideline teach when to use it.', z: 'remote' },
        { label: 'Execution', detail: 'Queue, abort checks, mkdir, writeFile', proof: 'Swappable ops decide where the mutation lands.', z: 'green' }
      ],
      codeSource: 'pi@f9daca3 · packages/coding-agent/src/core/tools/write.ts#L11-L19 (trimmed)',
      code: [
        'const writeSchema = Type.Object({',
        '  path: Type.String({ description: "Path to the file to write (relative or absolute)" }),',
        '  content: Type.String({ description: "Content to write to the file" }),',
        '});'
      ],
      footnote: 'The model only ever sees the schema and guidance; the harness decides what the code does.'
    }),
    S('pi-tool-sources', 1, 'A harness bakes in some tools, borrows others, and accepts yours', {
      scene: 'detail-rows', pill: 'What a Harness Is · Tools',
      subtitle: 'Every tool looks the same to the model; what changes is whose code runs the call.',
      columns: ['Source', 'pi example', 'Who runs the call'],
      rows: [
        { label: 'Built in', detail: 'write · harness code, no OS command', proof: 'The harness itself performs the work.', z: 'local' },
        { label: 'Found on host', detail: 'find → ensureTool("fd") → spawn', proof: 'The harness sees call and result; the OS runs fd.', z: 'orange' },
        { label: 'Registered by you', detail: 'extension · registerTool(definition)', proof: 'Your code runs it, so it can call your app.', z: 'purple' }
      ],
      codeSource: 'pi@f9daca3 · packages/coding-agent/src/core/tools/find.ts#L171-L216 (trimmed)',
      code: [
        '// Default implementation uses fd.',
        'const fdPath = await ensureTool("fd");',
        'const child = spawn(fdPath, args, { stdio: ["ignore", "pipe", "pipe"] });'
      ],
      footnote: 'The SDK version of “registered by you” is slide 17: a named tool that calls an existing service method.'
    }),
    S('pi-control', 1, 'A block becomes a reason the model can act on', {
      scene: 'flow', pill: 'What a Harness Is · Control',
      subtitle: 'The loop owns the hook point; the product installs its policy there.',
      nodes: [
        { title: 'Validated call', detail: 'beforeToolCall receives the tool and validated arguments.', z: 'local' },
        { title: 'Product policy', detail: 'Return block and a reason, or let the call continue.', z: 'orange' },
        { title: 'Tool result', detail: 'The model reads the reason and can choose another route.', z: 'green' }
      ],
      codeSource: 'pi@f9daca3 · packages/agent/src/agent-loop.ts#L738-L765 (trimmed)',
      code: [
        'if (beforeResult?.block) {',
        '  createErrorToolResult(beforeResult.reason || "Tool execution was blocked");'
      ],
      footer: 'A truncated reply with stopReason "length" fails every tool call in that reply.'
    }),
    S('pi-evidence', 1, 'The host can revise a result and subscribe to events', {
      scene: 'flow', pill: 'What a Harness Is · Evidence',
      subtitle: 'The event stream separates tool execution from the model’s own summary.',
      nodes: [
        { title: 'afterToolCall', detail: 'Inspect the call and result; redact or rewrite before the model reads it.', z: 'purple' },
        { title: 'tool_execution_end', detail: 'Carries tool, call ID, result, error state, and duration when available.', z: 'green' },
        { title: 'subscribe(listener)', detail: 'Any subscriber can feed a UI, log, or budget counter.', z: 'remote' }
      ],
      codeSource: 'pi@f9daca3 · packages/agent/src/agent-loop.ts#L929-L937 (trimmed)',
      code: [
        'await emit({ type: "tool_execution_end",',
        '  toolCallId: finalized.toolCall.id,',
        '  toolName: finalized.toolCall.name,',
        '  result: finalized.result, isError: finalized.isError });'
      ],
      footer: 'The loop emits start and end events for the agent, each turn, each message, and each tool execution.'
    }),
    S('part-2', 2, "Drive GitHub's Harness", {
      scene: 'opener',
      subtitle: 'Put the loop inside an app you already own, with its methods, permissions, and UI.',
      cards: [
        { icon: '🖥️', title: 'Host the SDK', blurb: 'Your app starts and scopes the session' },
        { icon: '🧰', title: 'Expose one method', blurb: 'The handler calls existing app code' },
        { icon: '📡', title: 'Show the evidence', blurb: 'UI and telemetry keep their context' }
      ],
      terminal: { context: 'Release dashboard integration sketch', detail: 'Question → named tool → existing service → answer' }
    }),
    S('sdk-map', 2, 'Same five jobs; the SDK turns each into one option or call', {
      scene: 'sdk-mirror', pill: "Drive GitHub's Harness · Map",
      subtitle: 'In pi you wire hooks into a loop you run. With the SDK, the Copilot runtime runs the loop and your app configures each job.',
      columns: ['pi · you wire it into your loop', 'Copilot SDK · your app passes it in'],
      rows: [
        { label: 'Loop', z: 'local', pi: 'while (hasMoreToolCalls) { … }', piNote: 'Your code decides each next turn.', sdk: 'await session.sendAndWait({ prompt })', sdkNote: 'The runtime runs the turns; you get the answer.' },
        { label: 'Context', z: 'remote', pi: 'config.transformContext(messages)', piNote: 'Your code maintains the message list.', sdk: 'infiniteSessions: { enabled: true } // default', sdkNote: 'The runtime maintains and compacts messages for you.' },
        { label: 'Tools', z: 'github', pi: 'registerTool({ name, parameters, execute })', piNote: 'An extension adds a tool definition.', sdk: 'defineTool("name", { parameters, handler })', sdkNote: 'Pass it in tools: [ … ]; availableTools allowlists.' },
        { label: 'Control', z: 'orange', pi: 'beforeToolCall → { block, reason }', piNote: 'Block a validated call with a reason.', sdk: 'onPermissionRequest: (request) => decision', sdkNote: 'Approve or reject with feedback.' },
        { label: 'Evidence', z: 'green', pi: 'subscribe((event) => …)', piNote: 'Listen to the loop’s event stream.', sdk: 'session.on("tool.execution_start", fn)', sdkNote: 'Typed events for UI, logs, and audit.' }
      ],
      footnote: 'Documented SDK architecture: application → SDK → JSON-RPC → Copilot runtime.'
    }),
    S('sdk-why', 2, 'A useful first embed: a release dashboard that answers “ready?”', {
      scene: 'detail-rows', pill: "Drive GitHub's Harness · Why",
      subtitle: 'Integration sketch · Your systems already know who may ship, whether it is ready, and how to ship.',
      columns: ['Already exists', 'For example', 'What the agent adds'],
      rows: [
        { label: 'Who may act', detail: 'The dashboard’s sign-in, roles, and permissions', proof: 'Answers as the signed-in engineer; only release owners are offered “ship”.', z: 'purple' },
        { label: 'A “ready?” answer', detail: 'A go/no-go signal, such as a Salesforce change record, behind getReadiness()', proof: '“What blocks v2.4?” gets the blockers in plain language, from live data.', z: 'local' },
        { label: 'A way to “do it”', detail: 'A deploy mechanism, such as a GitHub Actions workflow', proof: 'Points to the next step; a release owner still approves the run.', z: 'green' }
      ],
      footnote: 'Swap in your own systems: any app with roles, a readiness answer, and a deploy step fits this pattern.'
    }),
    S('sdk-license', 2, 'Every app user needs Copilot, unless you bring your own key', {
      scene: 'detail-rows', pill: "Drive GitHub's Harness · Licensing",
      subtitle: '“Does every dashboard user need Copilot?”',
      columns: ['The session runs as', 'Each app user needs Copilot?', 'Who is billed'],
      rows: [
        { label: 'Each signed-in user', detail: 'Yes · per-session gitHubToken from GitHub sign-in or OAuth', proof: 'That user’s Copilot plan; usage and org policy follow the person.', z: 'purple' },
        { label: 'Your model key (BYOK)', detail: 'No · OpenAI, Azure, Foundry, Anthropic, and more', proof: 'Your model provider, directly; Copilot auth is bypassed.', z: 'green' }
      ],
      codeSource: 'copilot-sdk docs/setup/multi-tenancy.md · per-user route on a shared server (trimmed)',
      code: [
        'const client = new CopilotClient({ mode: "empty", connection });',
        'const session = await client.createSession({ gitHubToken: user.githubToken, … });'
      ],
      footnote: 'Shared servers pass a token per session, so no one inherits another user’s identity, and run with mode: "empty".'
    }),
    S('sdk-loop', 2, 'The dashboard starts a scoped session and shows its answer', {
      scene: 'flow', pill: "Drive GitHub's Harness · Loop",
      subtitle: 'The app owns the trigger and lifecycle.',
      nodes: [
        { title: 'Dashboard action', detail: 'Engineer asks “What blocks v2.4?”', z: 'local' },
        { title: 'SDK session', detail: 'createSession then sendAndWait with one named tool.', z: 'purple' },
        { title: 'Dashboard UI', detail: 'Show the returned answer and activity.', z: 'green' }
      ],
      codeSource: 'Release-dashboard integration sketch · app-owned client and UI',
      code: [
        'const session = await client.createSession({ model: "auto",',
        '  availableTools: ["release_readiness"], onPermissionRequest });',
        'const reply = await session.sendAndWait({ prompt });'
      ],
      footer: 'Cancel with session.abort(); disconnect the session and stop the client at their owning lifecycle.'
    }),
    S('sdk-context', 2, 'You write the instructions; the runtime manages the history', {
      scene: 'detail-rows', pill: "Drive GitHub's Harness · Context",
      subtitle: 'Three inputs shape what the model sees; only two are yours to write.',
      columns: ['What the model sees', 'SDK surface', 'In the release dashboard'],
      rows: [
        { label: 'Instructions', detail: 'systemMessage · append, customize, or replace', proof: 'Append a release-assistant role: use release_readiness, name blockers, report missing facts.', z: 'purple' },
        { label: 'This request', detail: 'sendAndWait({ prompt, attachments })', proof: 'The engineer’s question and the release it is about.', z: 'local' },
        { label: 'History', detail: 'infiniteSessions · runtime compaction', proof: 'On by default; compaction events show when the runtime summarizes.', z: 'green' }
      ],
      codeSource: 'Release-dashboard integration sketch · SDK session options',
      code: [
        'systemMessage: { mode: "customize",',
        '  sections: { custom_instructions: { action: "append", content:',
        '    "Use release_readiness; name blockers; report missing facts." } } }'
      ],
      footnote: 'customize edits one section and keeps the SDK’s safety sections; replace drops them. Instructions steer; code enforces.'
    }),
    S('sdk-tools', 2, 'A named tool can call an existing service method', {
      scene: 'flow', pill: "Drive GitHub's Harness · Tools",
      subtitle: 'Register one method, not arbitrary dispatch.',
      nodes: [
        { title: 'Tool contract', detail: 'releaseId: string; required; no extra fields.', z: 'local' },
        { title: 'App handler', detail: 'defineTool calls releaseService.getReadiness(user, releaseId).', z: 'purple' },
        { title: 'Session allowlist', detail: 'availableTools: ["release_readiness"].', z: 'green' }
      ],
      codeSource: 'Release-dashboard integration sketch · application handler',
      code: [
        'const readinessTool = defineTool("release_readiness", {',
        '  parameters: z.object({ releaseId: z.string() }).strict(),',
        '  handler: async ({ releaseId }) =>',
        '    releaseService.getReadiness(user, releaseId),',
        '});'
      ],
      footer: 'The authenticated user comes from the app session, never from model-supplied arguments.'
    }),
    S('sdk-control', 2, 'The SDK checks the tool; your service checks the person', {
      scene: 'two-gates', pill: "Drive GitHub's Harness · Control",
      subtitle: 'Two engineers ask “What blocks v2.4?”',
      request: 'Model requests  release_readiness({ releaseId: "v2.4" })',
      columns: [
        { title: 'Who asked', question: 'Signed in to the dashboard' },
        { title: 'Gate 1 · onPermissionRequest', question: 'May this session run this tool?', z: 'purple' },
        { title: 'Gate 2 · releaseService', question: 'May this person see v2.4?', z: 'remote' },
        { title: 'What the engineer sees', question: 'In the release page', z: 'green' }
      ],
      rows: [
        { cells: [
          { label: 'Engineer on the v2.4 team', note: 'Identity comes from the app session.' },
          { mark: '✓', label: 'approve-once', note: 'custom-tool release_readiness is allowed.', z: 'green' },
          { mark: '✓', label: 'Allowed', note: 'This user can view v2.4; readiness returned.', z: 'green' },
          { mark: '✓', label: 'The blockers for v2.4', note: 'The answer, with the readiness facts behind it.', z: 'green' }
        ] },
        { cells: [
          { label: 'Engineer without v2.4 access', note: 'Same question, same tool request.' },
          { mark: '✓', label: 'approve-once', note: 'Same tool name, same decision; gate 1 never sees who asked.', z: 'green' },
          { mark: '✗', label: 'Denied', note: 'The service refuses and the error is returned, not hidden.', z: 'orange' },
          { mark: '✗', label: 'No access to v2.4', note: 'The agent explains and points to the release owner.', z: 'orange' }
        ] }
      ],
      codeSource: 'Release-dashboard integration sketch · gate 1, the session permission handler',
      code: [
        'onPermissionRequest: (req) => req.kind === "custom-tool" && req.toolName === "release_readiness"',
        '  ? { kind: "approve-once" }',
        '  : { kind: "reject", feedback: "Only release_readiness is available here." }'
      ],
      footnote: 'Neither gate approves a deployment; that stays a human step in the release process.'
    }),
    S('sdk-evidence', 2, 'Events show execution; the service records the business result', {
      scene: 'flow', pill: "Drive GitHub's Harness · Evidence",
      subtitle: 'Stream progress and record bounded metadata.',
      nodes: [
        { title: 'session.on', detail: 'assistant.message_delta and tool.execution_complete.', z: 'remote' },
        { title: 'UI + telemetry', detail: 'Render progress; record sessionId, toolCallId, success.', z: 'purple' },
        { title: 'Service audit', detail: 'Record authorization and readiness result.', z: 'green' }
      ],
      codeSource: 'Release-dashboard integration sketch · application event handlers',
      code: [
        'session.on("assistant.message_delta", e => ui.appendText(e.data.deltaContent));',
        'session.on("tool.execution_complete", e => telemetry.record("tool.complete", {',
        '  sessionId: session.sessionId, toolCallId: e.data.toolCallId, success: e.data.success }));'
      ],
      footer: 'Execution success can coexist with ready: false; app correlation is explicit wiring.'
    }),
    S('release-flow', 2, 'What the model adds: an answer, a likely cause, a next step', {
      scene: 'dashboard-mockup', pill: "Drive GitHub's Harness · Example",
      subtitle: 'Illustrative mockup · The same release dashboard, before and after embedding an SDK session.',
      mock: {
        appTitle: 'release-dashboard · Releases › v2.4',
        release: 'Release v2.4',
        badge: 'Not ready',
        status: [
          { label: 'Go/no-go · Salesforce change record', value: '● Approved', z: 'green' },
          { label: 'Integration tests · CI', value: '● 1 failing', z: 'orange' },
          { label: 'Changes since v2.3', value: '14 merged PRs' }
        ],
        deploy: 'Deploy v2.4',
        deployNote: 'GitHub Actions · release owner approves',
        leftCaption: 'ALREADY IN THE APP',
        leftCaption2: 'Status for each system; the engineer connects them.',
        panelTitle: 'Ask Copilot · SDK session in the dashboard',
        ask: 'What blocks v2.4, and what do I do about it?',
        tool: 'tool call  release_readiness({ releaseId: "v2.4" })  ·  returned facts  ✓',
        answer: [
          { n: 1, text: 'One blocker: checkout.spec fails. Go/no-go is already approved.' },
          { n: 2, text: 'Likely cause: PR #482 changed tax rounding; failures start there.' },
          { n: 3, text: 'Next: ask the payments owner to review #482, then rerun CI.' }
        ],
        actions: ['Draft go/no-go note', 'Message payments owner', 'What changed since v2.3?']
      },
      adds: ['Explains raw status in plain words', 'Connects a failure to its likely cause', 'Drafts the next step; a person sends it'],
      footer: 'Illustrative values, not a recorded run. The answer cites the test and PR so the engineer can check it.'
    }),
    S('part-3', 3, 'Decide What It Sees', {
      scene: 'opener',
      subtitle: 'The same host can make a useful check independent by changing its agent’s view.',
      cards: [
        { icon: '🔍', title: 'Set the view', blurb: 'Two checkpoints, two inputs' },
        { icon: '🧪', title: 'Run the test', blurb: 'Host reruns the suite as evidence' },
        { icon: '🧾', title: 'Name the owner', blurb: 'Referee maps it; API owner decides' }
      ],
      terminal: { context: 'examples/apps/blind-tests/app.ts · tests FanHub’s API · observed 2026-10-26', detail: 'Contract visible · implementation hidden' }
    }),
    S('blind-app', 3, 'Meet the blind-tests app: all five jobs in one SDK program', {
      scene: 'code-rows', pill: 'Decide What It Sees · The app',
      subtitle: 'It clones FanHub at 0ea9e78, starts its API, and asks an agent to test that API without seeing the code.',
      columns: ['Job', 'In blind-tests/app.ts', 'What it does here'],
      rows: [
        { label: 'Tools', where: 'app.ts:43', code: 'defineTool("api_contract", { handler: async () => contract })', proof: 'The tester’s only view of the API: endpoints from SETUP.md, bug hints stripped.', z: 'github' },
        { label: 'Context', where: 'app.ts:73', code: 'systemMessage: { mode: "customize", … "black-box API tester" }', proof: 'Sets the role: test from the contract; a failing test is a finding.', z: 'remote' },
        { label: 'Control', where: 'app.ts:51', code: 'createVisibilityPolicy({ hidden, writable, shellCommands, … })', proof: 'Hides source, docs, and BUGS.md; writes only to __tests__/blind.', z: 'orange' },
        { label: 'Loop', where: 'app.ts:104', code: 'session.sendAndWait({ prompt: "Write a black-box test suite…" })', proof: 'One request; the runtime takes turns until the suite is written.', z: 'local' },
        { label: 'Evidence', where: 'app.ts:126 · 144', code: ['execFileSync(node, ["--test", "--test-reporter=tap", …files])', 'referee = createSession({ availableTools: ["view", "grep", "glob"] })'], proof: 'The app reruns the tests itself; a read-only referee may read BUGS.md.', z: 'green' }
      ],
      footnote: 'One file, 180 lines: npx tsx apps/blind-tests/app.ts. The next slides follow one real run of it.'
    }),
    S('blind-result', 3, 'A test writer that cannot see the code found two real problems', {
      scene: 'terminal', pill: 'Decide What It Sees · Observed result', termTitle: 'blind-tests app · FanHub API · observed 2026-10-26',
      subtitle: 'The tester and the referee are the two sessions from the last slide; the app reran the tests in between.',
      transcript: [
        { type: 'prompt', text: 'npx tsx apps/blind-tests/app.ts' },
        { type: 'thinking', label: 'Tester session · sees api_contract and the live API, nothing else' },
        { type: 'response', lines: ['Wrote 5 test files, 12 tests, from the contract alone'] },
        { type: 'divider' },
        { type: 'thinking', label: 'The app reruns the tests itself' },
        { type: 'response', lines: ['TAP: 10 passing, 2 failing'] },
        { type: 'divider' },
        { type: 'thinking', label: 'Referee session · read-only · may read BUGS.md' },
        { type: 'outcome', mark: '!', text: 'POST /api/characters → 500 · matches BUGS.md #19' },
        { type: 'outcome', mark: '!', text: 'seasonId filter ignored · not in BUGS.md: docs and code disagree' }
      ],
      footnote: 'Observed run. The app trusts its own rerun, not the tester’s report, and the API owner decides what changes.'
    }),
    S('visibility-policy', 3, 'How the app keeps the tester blind: one policy, two SDK checkpoints', {
      scene: 'code-rows', pill: 'Decide What It Sees · Policy',
      subtitle: 'onPreToolUse sees raw arguments; onPermissionRequest sees a parsed request. Each row is a rule from the app.',
      columns: ['Request the tester makes', 'The rule that decides it', 'What happens'],
      rows: [
        { label: 'grep across the whole repo', where: 'visibility.ts:179', code: 'sweepsHidden(rel, hiddenRoots) → { permissionDecision: "deny" }', proof: 'onPreToolUse denies it before it runs; the feedback says to narrow the search.', z: 'remote' },
        { label: 'Call an unknown tool', where: 'app.ts:59', code: 'customTools: new Set(["api_contract"])', proof: 'onPermissionRequest approves only the host’s tool; anything else gets “Unknown tool.”', z: 'purple' },
        { label: 'Write peek.test.js (reads src/)', where: 'rules.ts:26', code: ['BLIND_TEXT_DENY = [ /(^|[\\s"\'\\\\/])src[\\\\/]/i,', '  /readfile|readdir|createreadstream|opendir|child_process/i, … ]'], proof: 'The new file’s contents match, so the write is denied and peek.test.js never exists.', z: 'orange' },
        { label: 'cd …; npm start | tee log', where: 'rules.ts:18', code: 'BLIND_SHELL = new Set(["node", "cd", "curl", "ls", …])', proof: 'Split into cd, npm, tee; npm and tee are not listed, so the whole command is denied.', z: 'green' }
      ],
      codeSource: 'examples/apps/blind-tests/app.ts:88-89 · both checkpoints are createSession options',
      code: [
        'onPermissionRequest: policy.onPermissionRequest,   // parsed: read · write · shell · custom-tool',
        'hooks: { onPreToolUse: policy.onPreToolUse },      // raw: toolName + toolArgs'
      ],
      footnote: 'The search, write, and shell rules are tested in examples/test/visibility.test.ts; the same policy file serves the fresh-eyes app.'
    }),
    S('host-boundary', 3, 'What the SDK can stop, and the one thing it cannot', {
      scene: 'code-rows', pill: 'Decide What It Sees · Boundary',
      subtitle: 'Every tool request reaches onPermissionRequest. Code inside an approved process makes none.',
      columns: ['The agent', 'What the SDK hands your app', 'Stopped?'],
      rows: [
        { label: 'Writes a test file that reads src/', where: 'visibility.ts:126', code: '{ kind: "write", fileName, newFileContents }', proof: '✓ Yes. The app reads the file’s text, sees src/, and denies the write.', z: 'green' },
        { label: 'Runs npm start', where: 'visibility.ts:137', code: '{ kind: "shell", fullCommandText: "npm start" }', proof: '✓ Yes. npm is not on the allowlist, so the app denies it.', z: 'green' },
        { label: 'Runs node --test', where: 'visibility.ts:137', code: '{ kind: "shell", fullCommandText: "node --test …" }', proof: 'Approved. node is on the allowlist. This is the last request the SDK sees from this run.', z: 'local' },
        { label: 'Test code reads a hidden file', code: '// nothing: the read happens inside node, not through a tool', proof: '✗ No. The SDK never hears about it; only the OS account or a container can stop it.', z: 'orange' }
      ],
      footnote: 'To stop the last row, run the agent’s processes in a container that holds only the files it may see.'
    }),
    S('run-evidence', 3, 'After the run, one log tells you what was blocked, what ran, and how it went', {
      scene: 'code-rows', pill: 'Decide What It Sees · Evidence',
      subtitle: 'The app writes every record to one file per run. Each record answers one question.',
      columns: ['What you want to know', 'The line that records it', 'What the record says'],
      rows: [
        { label: 'What did my policy block, and why?', where: 'visibility.ts:99', code: 'rules.log?.({ layer, kind, subject, decision: "deny", rule })', proof: 'The request, the rule it hit, and the decision.', z: 'orange' },
        { label: 'What did the agent actually run?', where: 'run-log.ts:19', code: ['session.on("tool.execution_complete", (e) =>', '  emit({ toolCallId: e.data.toolCallId, success: e.data.success }))'], proof: 'Each tool call that ran, and whether it succeeded.', z: 'green' },
        { label: 'Did the repo’s own hooks run?', where: 'run-log.ts:23', code: ['session.on("hook.end", (e) =>', '  emit({ hook: e.data.hookType, success: e.data.success }))'], proof: 'Which hook ran. Its success means the hook ran, not that the tool did.', z: 'remote' },
        { label: 'How did the whole run go?', where: 'app.ts:117', code: 'log.emit({ event: "session-end", toolCalls, ...policy.counts })', proof: 'Tool calls, allows, and denies, as counts.', z: 'purple' }
      ],
      footnote: 'No record holds file contents or command output. Observed: 12 repository hook checks ran in the blind-tests run.'
    }),
    S('run-log-lines', 3, 'What the log looks like: six lines from a blind-tests run', {
      scene: 'jsonl-file', pill: 'Decide What It Sees · Evidence',
      subtitle: 'One file per run. Each line answers one of the questions on the last slide.',
      file: 'examples/.runs/blind-tests-<timestamp>/events.jsonl',
      lines: [
        {
          "tag": "repo hook",
          "z": "remote",
          "line": "{\"layer\":\"repo-hook\",\"event\":\"hook.end\",\"sessionId\":\"7f3a…\",\"hook\":\"preToolUse\",\"success\":true,\"decision\":null}"
        },
        {
          "tag": "runtime",
          "z": "green",
          "line": "{\"layer\":\"runtime\",\"event\":\"tool.start\",\"sessionId\":\"7f3a…\",\"tool\":\"create\",\"toolCallId\":\"call_41\"}"
        },
        {
          "tag": "runtime",
          "z": "green",
          "line": "{\"layer\":\"runtime\",\"event\":\"tool.complete\",\"sessionId\":\"7f3a…\",\"toolCallId\":\"call_41\",\"success\":true}"
        },
        {
          "tag": "host policy",
          "z": "orange",
          "line": "{\"source\":\"host-policy\",\"layer\":\"pre-tool\",\"kind\":\"view\",\"subject\":\"node/backend/__tests__/readme.md\",\"decision\":\"deny\",\"rule\":\"hidden\"}"
        },
        {
          "tag": "host policy",
          "z": "orange",
          "line": "{\"source\":\"host-policy\",\"layer\":\"permission\",\"kind\":\"shell\",\"subject\":\"git status\",\"decision\":\"deny\",\"rule\":\"command-not-allowed:git\"}"
        },
        {
          "tag": "app",
          "z": "purple",
          "line": "{\"layer\":\"host\",\"event\":\"rerun\",\"passing\":10,\"failing\":2}"
        }
      ],
      footnote: 'Illustrative lines with fields exactly as the code writes them; values from the 2026-10-26 run. ts trimmed, IDs shortened.'
    }),
    S('part-4', 4, 'Controls and Ideas', {
      scene: 'opener',
      subtitle: 'Check the controls around your harness, then pick the first app to embed it in.',
      cards: [
        { icon: '🏢', title: 'Surrounding controls', blurb: 'Access, models, billing, hooks' },
        { icon: '✅', title: 'Pre-flight', blurb: 'Pin, bound, test, and verify' },
        { icon: '💡', title: 'App ideas', blurb: 'Where to embed it next' }
      ],
      terminal: { context: 'Controls before you share it · ideas for where to start', detail: 'Which method will you expose first?' }
    }),
    S('surrounding-controls', 4, 'Different owners control different boundaries', {
      scene: 'detail-rows', pill: 'Controls and Ideas · Surrounding Controls',
      subtitle: 'Verify the effective controls for the identity and runtime your app uses.',
      columns: ['Decision', 'Owner / control point', 'What to verify'],
      rows: [
        { label: 'Access', detail: 'Enterprise and organization admins', proof: 'Effective user and surface access.', z: 'remote' },
        { label: 'Models', detail: 'Admins set availability; app requests a model', proof: 'Requested model is not proof of effective selection.', z: 'purple' },
        { label: 'Billing', detail: 'Billing owner and authentication route', proof: 'Signed-in user or token follows Copilot terms; BYOK follows provider terms.', z: 'orange' },
        { label: 'Hooks', detail: 'Platform policy and repository owners', proof: 'Policy hooks precede repository hooks in CLI; enableFileHooks opts into repo hooks.', z: 'local' },
        { label: 'Tools / MCP', detail: 'Admins and application owner', proof: 'managedApprovalRequired needs a human path.', z: 'github' },
        { label: 'Process + result', detail: 'Platform, service, and report owner', proof: 'OS/container sets reach; a named person accepts output.', z: 'green' }
      ],
      footnote: 'Machine policy-hook locations and disableAllHooks behavior described here are Copilot CLI-specific.'
    }),
    S('preflight', 4, 'Before someone else runs it: four checks', {
      scene: 'scorecard', pill: 'Controls and Ideas · Pre-flight',
      subtitle: 'We want the next person to get the same result inside the same limits. These four checks make that true.',
      cards: [
        { icon: '📌', title: 'Make runs repeatable', description: 'Pin the SDK version and start each run from a clean checkout, so results reproduce.' },
        { icon: '⏱️', title: 'Put limits on each run', description: 'Cap tool calls and wait time, and close the session even when the run fails.' },
        { icon: '🧪', title: 'Test the policy itself', description: 'Unit-test your permission rules with real request shapes before any agent meets them.' },
        { icon: '👤', title: 'Check who it runs as', description: 'Confirm sign-in, models, and billing for real users, and name who reads each report.' }
      ]
    }),
    S('apps-to-embed', 4, 'Where the model earns its place: six apps to embed it in', {
      scene: 'app-ideas', pill: 'Controls and Ideas · Ideas',
      subtitle: 'Read-only tools plus a question that takes judgment: the model connects and drafts; a person acts.',
      cards: [
        { icon: '🚨', title: 'On-call / incident app', ask: 'What changed right before checkout errors spiked?', adds: 'Lines up alerts, deploys, and flag flips into one timeline and names the likely cause.', tools: 'getAlerts · recentDeploys · flagHistory', human: 'rollback, status post', z: 'orange' },
        { icon: '📊', title: 'Metrics app', ask: 'Why did signups drop on Tuesday?', adds: 'Picks the slices to compare, runs them, and explains the drop in two sentences.', tools: 'queryMetric(metric, dimension, range)', human: 'what goes to leadership', z: 'local' },
        { icon: '🛡️', title: 'Security portal', ask: 'Does this CVE actually reach our code?', adds: 'Reads the advisory, finds the call sites, and argues reachable or not with file references.', tools: 'getAdvisory · repo search', human: 'dismiss or fix', z: 'remote' },
        { icon: '🔀', title: 'Code review queue', ask: 'Which of these 12 PRs is riskiest to merge today?', adds: 'Ranks them by blast radius from changed paths, owners, and test coverage.', tools: 'listPRs · ownersFor · coverageFor', human: 'who reviews, merge', z: 'github' },
        { icon: '🚀', title: 'Release dashboard', tag: 'Slides 14–21', ask: 'What blocks v2.4, and what is the next step?', adds: 'Connects the failing test to the PR behind it and drafts the go/no-go note.', tools: 'release_readiness', human: 'deploy approval', z: 'purple' },
        { icon: '📘', title: 'Fresh-eyes docs check', tag: 'Runs today', ask: 'Can a new hire set this up from the docs alone?', adds: 'Follows the docs literally in a clean checkout. Observed: three real findings.', tools: 'report_friction · source hidden', human: 'the docs fix', z: 'green' }
      ],
      footer: 'Your turn: which app already has the data, and which question takes a person an hour to answer today?'
    }),
    S('before-after', 0, 'What changes when your app hosts the loop', {
      scene: 'recap', pill: 'The Value Recap',
      beforeLabel: 'Agent in a chat window', afterLabel: 'Agent hosted in your app',
      rows: [
        { job: 'Loop', z: 'local', before: 'A black box behind a prompt', after: 'Five named jobs, each with a hook you can use' },
        { job: 'Tools', z: 'github', before: 'Cannot reach your app’s data', after: 'Your existing methods become narrow, named tools' },
        { job: 'Control', z: 'orange', before: 'Approving a tool feels like authorizing a user', after: 'The SDK checks the tool; your service checks the person' },
        { job: 'Evidence', z: 'green', before: 'You take the agent’s word for what it did', after: 'One log shows what was blocked, what ran, and the result' }
      ],
      stats: [
        { value: '~160', detail: 'lines: the whole pi loop', z: 'purple' },
        { value: '1 option', detail: 'per job in the Copilot SDK', z: 'remote' },
        { value: '2 problems', detail: 'found by a tester that never saw the code', z: 'green' }
      ]
    }),
    S('today', 0, 'Make the next step small and inspectable', {
      pill: 'Transfer · Today, this week, this month',
      horizons: [
        { icon: '🔎', label: 'Today', z: 'green', items: ['Read pi runLoop and label the five jobs.', 'Signal: you can point to the tool result and stop condition.', 'Validate by comparing the labels with the source excerpt.'] },
        { icon: '🧪', label: 'This week', z: 'local', items: ['Run quickstarts 01-loop and 04-control in a disposable environment.', 'Signal: an answer appears; a rejected shell request recovers through approved reads.', 'Validate with npm test and inspect the output.'] },
        { icon: '🧰', label: 'This month', z: 'purple', items: ['Choose one existing read-only method and sketch a named tool.', 'Signal: allowed user sees current facts; unauthorized user gets a visible refusal.', 'Validate the UI, service audit, and telemetry as separate evidence.'] }
      ],
      takeaway: 'Pick the job that changes your workflow; keep the service owner and evidence visible.'
    }),
    S('references', 0, 'First-party references', {
      pill: 'Sources · verified 2026-10-26',
      groups: [
        { title: 'pi and Copilot SDK', z: 'local', items: [
          { href: 'https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d',           label: 'pi coding agent at f9daca3 (MIT license)', description: 'Pinned source for every pi excerpt: loop, tools, control, evidence' },
          { href: 'https://github.com/github/copilot-sdk', label: 'GitHub Copilot SDK', description: 'Architecture, sessions, tools, hooks, and examples' },
          { href: 'https://www.npmjs.com/package/@github/copilot-sdk', label: '@github/copilot-sdk 1.0.26', description: 'Version used by the examples and recorded runs' },
          { href: 'https://github.com/github/copilot-sdk/tree/main/docs/auth', label: 'SDK authentication', description: 'Signed-in user, token, and BYOK routes' }
        ] },
        { title: 'Hooks and governance', z: 'purple', items: [
          { href: 'https://docs.github.com/en/copilot/reference/hooks-reference', label: 'Copilot hooks reference', description: 'Events, decisions, policy hook locations, and behavior' },
          { href: 'https://code.visualstudio.com/docs/agent-customization/hooks', label: 'VS Code agent hooks (Preview)', description: 'Editor hook format and event coverage' },
          { href: 'https://docs.github.com/en/copilot/concepts/enterprise/policies', label: 'Copilot policies', description: 'Enterprise and organization controls' },
          { href: 'https://docs.github.com/en/copilot/reference/ai-models/supported-models', label: 'Supported models', description: 'Model availability by plan and surface' }
        ] }
      ]
    }),
    S('thanks', 0, 'Harness Fundamentals', {
      chrome: false, visual: 'harness-loop',
      subtitle: 'Which method in an app you own could become a useful AI tool?',
      cards: [
        { value: '5 jobs', detail: 'Loop, context, tools, control, evidence' },
        { value: 'Your app', detail: 'A custom tool calls a method you already own' },
        { value: 'Your boundary', detail: 'Keep user authority, approvals, and evidence explicit' }
      ]
    })
  ];

  const NOTES = {
    title: {
      seconds: 20,
      notes: [
        '"A harness makes the agent loop visible and gives an existing app a way to use its methods through a tool."',
        'The inner ring is one turn: context feeds the model, control gates each requested tool, and tool results return for the next turn. The outer ring is the run, from prompt to final answer; the loop job decides whether another turn starts.',
        '→ Start with the question a developer or platform engineer asks when an agent needs to enter their own workflow.'
      ],
      know: ['This is a practitioner talk about the GitHub Copilot SDK at version 1.0.26 and a read-only source reading of pi pinned at f9daca3.'],
      sources: [SRC.pi, SRC.sdk]
    },
    'core-question': {
      seconds: 45,
      notes: [
        '"A harness is the code around the model that runs the loop. You care when your own app could host that loop."',
        'Point to the five job labels, then read the three if-cards: an app with answers, a repeating check, and rules you own. Each one maps to an example later in the talk.',
        'We will read pi first, sketch an existing release dashboard, and then use the same host to run an independent blind test.'
      ],
      know: ['Audience: developers and platform engineers already using Copilot in an editor or CLI who want the agent inside their own tools. The if-cards map to the release dashboard (Part 2), the blind-test and fresh-eyes apps (Part 3), and the visibility policy and run log (Parts 3 and 4).'],
      sources: [SRC.pi, SRC.sdk]
    },
    contents: {
      seconds: 30,
      notes: [
        '"Part 1 answers what a harness is. Parts 2 and 3 answer why you would host one: your app’s methods become tools, and your app decides what the agent sees. Part 4 covers the controls around it and ideas for where to start."',
        'The openers begin on slides 4, 12, 22, and 29. Click a route card or use the keyboard to move between them.'
      ],
      know: ['The four-part order is preserved from the approved recipe: What a Harness Is; Drive GitHub’s Harness; Decide What It Sees; Controls and Ideas.'],
      sources: [SRC.pi, SRC.sdk, SRC.visibility]
    },
    'part-1': {
      seconds: 20,
      notes: [
        '"Reading the loop first gives each later SDK callback a place to land."',
        'The source is pi at a pinned MIT commit; no pi install or run is part of this talk.',
        '→ First, name the five jobs.'
      ],
      know: ['The recipe uses pi as one readable reference implementation. The transferable model is the job boundary, not a claim that every harness uses the same internal code.'],
      sources: [SRC.pi]
    },
    'five-jobs': {
      seconds: 145,
      notes: [
        '"A harness runs the loop, assembles context, offers tools, controls calls, and leaves evidence."',
        'Read each row as a question the host answers. The proof column points to the source location the next slides open.',
        'Keep the distinction between control and evidence: one decides whether an action runs; the other lets someone inspect what happened.',
        '→ Start with the outer loop, where tool results create another turn.'
      ],
      know: ['The pi locations are runLoop in agent-loop.ts; transformContext, convertToLlm, prepareRequest, and declareToolChanges; tool definitions including write and find; beforeToolCall; and emit, afterToolCall, and subscribe.'],
      sources: [SRC.pi]
    },
    'pi-loop': {
      seconds: 145,
      notes: [
        '"The model asks for tools, the harness runs or rejects those calls, and results return to context."',
        'Trace the three cards left to right. A response without tool calls lets the inner turn loop end.',
        'Queued steering messages can join before another turn. Follow-up messages can restart the outer loop; otherwise it breaks.',
        '→ The next question is what context that next request receives.'
      ],
      know: ['pi’s runLoop spans agent-loop.ts L172-L330, about 160 lines. The excerpt is trimmed from L188-L330. Tool-call batches can terminate; tool results are pushed into context. People can steer mid-run through steering and follow-up messages.'],
      sources: [SRC.pi]
    },
    'pi-context': {
      seconds: 145,
      notes: [
        '"Before each model call, pi transforms the messages and converts them into the model format."',
        'Point out that the host decides this view repeatedly, not only when the session begins.',
        'prepareRequest can choose a model or thinking level. declareToolChanges announces tool-list changes.',
        '→ With context set, look at the contract and implementation of one tool.'
      ],
      know: ['The pinned excerpt is packages/agent/src/agent-loop.ts L398-L404. transformContext can prune, summarize, or inject messages. The SDK section later stays at documented host configuration and does not infer Copilot runtime internals from pi.'],
      sources: [SRC.pi]
    },
    'pi-tools': {
      seconds: 110,
      notes: [
        '"A tool is a schema the model fills in plus code the harness runs."',
        'For write, point from path and content to the prompt guidance, mutation queue, abort checks, and swappable operations.',
        '→ write is code pi ships. The next question is where else tools come from.'
      ],
      know: ['pi write.ts is 97 lines and contains no OS command. Its schema has path and content; its prompt contribution says to create or overwrite files and use write for new files or complete rewrites. The executor resolves the path, serializes writes per file, checks cancellation around directory creation, then writes through ops.'],
      sources: [SRC.pi]
    },
    'pi-tool-sources': {
      seconds: 125,
      notes: [
        '"A harness can bake a tool in, borrow a program it finds on the host, or run a tool you register. The model sees the same kind of contract for all three."',
        'Built in: write is harness code from schema to file. Found on host: find calls ensureTool to locate fd, then spawns it; the harness validates the call and reads the result, while fd and the operating system run the search.',
        'Registered by you: a pi extension calls registerTool with a definition, and its execute function is your code. That is the door for tools that call your own app or endpoint.',
        '→ Hold that third row. In Part 2 the SDK version wraps a release service method you already own.'
      ],
      know: ['find.ts can use custom glob ops instead of fd; the default calls ensureTool("fd") (L172) and spawn (L216). A host that needs end-to-end search control can supply custom glob operations. registerTool is declared on the extension API in packages/coding-agent/src/core/extensions/types.ts L1675-L1677. In the Copilot SDK, the equivalent is a custom tool passed to the session; slide 17 shows one that calls releaseService.getReadiness.'],
      sources: [SRC.pi, SRC.sdk]
    },
    'pi-control': {
      seconds: 145,
      notes: [
        '"beforeToolCall sees validated arguments and lets the host return a block reason."',
        'The reason becomes an error tool result the model reads, so it can recover with a different action.',
        'The loop owns the hook point; pi’s coding-agent product installs extension policy into it. If stopReason is length, pi fails the whole tool batch because arguments may be truncated.',
        '→ A decision is useful only when the host can also inspect the outcome.'
      ],
      know: ['Source locations: agent-loop.ts L738-L765 for prepareToolCall; L272-L281 for truncated replies; coding-agent/src/core/agent-session.ts L652-L682 for extension wiring. The hook returns an immediate result when blocked; terminate can additionally stop the loop.'],
      sources: [SRC.pi]
    },
    'pi-evidence': {
      seconds: 145,
      notes: [
        '"Evidence travels through events, and afterToolCall can revise a result before the model reads it."',
        'The tool_execution_end event carries tool name, call ID, result, error status, and duration when available.',
        'subscribe fans events out to listeners. A UI, log, or budget counter can observe without replacing the loop.',
        '→ Now map those five jobs to what the SDK gives an app host.'
      ],
      know: ['The pi event vocabulary includes agent_start, turn_start, message_start, message_update, message_end, tool_execution_start, tool_execution_update, tool_execution_end, turn_end, and agent_end. afterToolCall can replace content, details, usage, termination, and error status.'],
      sources: [SRC.pi]
    },
    'part-2': {
      seconds: 20,
      notes: [
        '"The SDK lets an app host the Copilot runtime and connect it to methods the app already owns."',
        'The continuous example is a release dashboard, and every code excerpt here is an integration sketch.',
        '→ First, line up the SDK surface with the five jobs.'
      ],
      know: ['The release dashboard, releaseService, user, selectedRelease, ui, and telemetry are illustrative application objects. They are not delivered as a runnable release dashboard in the repository.'],
      sources: [SRC.sdk, SRC.npm]
    },
    'sdk-map': {
      seconds: 145,
      notes: [
        '"The five jobs from pi are all still here. The difference is who writes the loop: in pi you do; with the SDK the Copilot runtime does, and your app passes one option or call per job."',
        'Read across each row, left to right. Loop: a while loop you own becomes sendAndWait. Context: pi makes you maintain the message list with transformContext; SDK users write no message code because the runtime maintains and compacts history by default. Instructions still come from systemMessage, covered on the Context slide. Tools: registerTool becomes defineTool. Control: beforeToolCall becomes onPermissionRequest. Evidence: subscribe becomes session.on.',
        'Simpler syntax does not move authority. SDK hooks and opted-in repository hooks add more control points, and service methods still own domain authorization and results.',
        '→ So where would you host this? Start with an app that already has the answer.'
      ],
      know: ['Documented SDK architecture: application → SDK → JSON-RPC → Copilot runtime. CopilotClient starts and stops the runtime by default. Claims about the runtime’s internal loop remain out of scope. SDK calls on this slide match examples/sdk-quickstart/01 through 05 at SDK 1.0.26. pi names match the pinned source: runLoop and transformContext in agent-loop.ts, registerTool in extensions/types.ts L1675, beforeToolCall, and subscribe. The SDK also supports structured sendAndWait results when passed a schema.'],
      sources: [SRC.sdk, SRC.npm, SRC.examples, SRC.pi]
    },
    'sdk-why': {
      seconds: 90,
      notes: [
        '"A simple, useful first place to embed the SDK is a release dashboard. On release day the question is always the same: are we ready, and if so, ship it."',
        'We assume three things already exist. First, an app or API that knows who may act: sign-in, roles, permissions. Second, something that gives a good answer to “ready?”: for example, a Salesforce change record as the go/no-go signal, exposed through a readiness method. Third, a way to “do it”: for example, a GitHub Actions deploy workflow.',
        'Today a release engineer stitches those together by hand: check the go/no-go record, check the pipeline, ask who can approve. Embedded in the dashboard, the agent answers “What blocks v2.4?” as that engineer, from live data, and points to the deploy step. A release owner still approves the run.',
        'This is the first if-card from the core question: if your app has answers. The rest of Part 2 builds the “ready?” tool; the deploy step stays behind its existing approval.',
        '→ Before the how, one question every team asks: who needs a license?'
      ],
      know: ['The release dashboard is an integration sketch, not an observed run. Salesforce and GitHub Actions are illustrative examples of a go/no-go system of record and a deploy mechanism; substitute ServiceNow, Jira, Azure Pipelines, or an internal API. releaseService.getReadiness(user, releaseId) is an application method in the sketch, not an SDK API. GitHub Actions environments can require reviewers before a deployment job runs, which keeps “do it” a human-approved step. Later slides in this part show the session, context, tool, control, and evidence wiring for the “ready?” half.'],
      sources: [SRC.sdk]
    },
    'sdk-license': {
      seconds: 90,
      notes: [
        '"The first question every team asks: does everyone who uses my app now need a Copilot license? Yes, unless you bring your own model key."',
        'Row one: each session runs with the signed-in user’s GitHub token, so that person needs Copilot, and usage counts against their plan and their org’s policy. You get per-person attribution for free.',
        'Row two: bring your own key. The SDK talks to your OpenAI, Azure, Foundry, or Anthropic deployment and bypasses Copilot authentication, so no Copilot license is involved; your model provider bills you.',
        'For the dashboard, the choice is attribution and billing, not capability. Either way, the service still checks the dashboard user, as the control slide shows.',
        '→ Now the how: the dashboard starts a session and sends the question.'
      ],
      know: ['Source: copilot-sdk docs/auth/authenticate.md, the “Copilot Subscription Required” column: GitHub signed-in user, Yes; GitHub OAuth App, Yes; environment variables, Yes; BYOK, No. byok.md: BYOK bypasses GitHub Copilot authentication and bills directly with the model provider. multi-tenancy.md: shared servers use a per-session GitHub token or rotating provider so sessions do not inherit another user’s identity, and mode: "empty" instead of the default CLI mode. If asked about org billing without user seats: server-to-server-tokens.md documents a GitHub App created and installed on the organization with the Copilot Requests permission, whose one-hour installation tokens bill the organization with no user subscription when an org policy allows it (in GitHub Actions, GITHUB_TOKEN with copilot-requests: write). It is left off the slide because few teams have or can create such an App. Copilot plan pricing and premium-request rules change over time; send billing specifics to current GitHub billing docs. Verified 2026-11-04.'],
      sources: [SRC.authMethods, SRC.s2s, SRC.byok, SRC.tenancy]
    },
    'sdk-loop': {
      seconds: 145,
      notes: [
        '"A dashboard action supplies the selected release and question; the app creates a session and returns the answer to its UI."',
        'The runtime handles model turns and tool calls. The backend owns user scope, the session, and the UI bridge.',
        'For cancellation, call session.abort(). sendAndWait’s default 60-second timeout ends the wait, not necessarily the work. Disconnect sessions and stop the client at their lifecycle boundary.',
        '→ Next, give the model a role and a reliable source of facts.'
      ],
      know: ['The quickstart 01-loop.ts uses CopilotClient, createSession, sendAndWait, disconnect, and stop. A correct two-sentence answer about the examples folder was observed. In a long-lived application, reuse the client and scope sessions to users and tasks. Node 20 or later is required by the examples package. With no auth options, the SDK uses the signed-in Copilot CLI user; user and token routes follow Copilot licensing and policy, while BYOK uses provider terms.'],
      sources: [SRC.sdk, SRC.npm, SRC.examples]
    },
    'sdk-context': {
      seconds: 145,
      notes: [
        '"pi let the host rebuild the whole message list. The SDK splits that job: you write the instructions and each request; the runtime manages the history."',
        'Instructions: systemMessage. append adds guidance; customize edits named sections and keeps the rest of the SDK prompt, including safety sections; replace supplies only the host’s text and drops those guardrails. For the dashboard, append a release-assistant role that names release_readiness as the source of facts.',
        'This request: the prompt and any attachments, here the engineer’s question and the release it concerns.',
        'History: there is no per-request transform hook like pi’s transformContext. Infinite sessions are on by default and compact in the background; session.compaction_start and compaction_complete events show when it happens, and infiniteSessions thresholds tune it.',
        '→ Now turn the existing service method into one named tool.'
      ],
      know: ['Documented systemMessage modes: append, customize, and replace. customize sections include identity, tone, environment_context, safety, tool_instructions, custom_instructions, and others. Section actions include replace, remove, append, prepend, preserve, or a function that receives current text. MessageOptions include prompt and attachments. infiniteSessions defaults to enabled; backgroundCompactionThreshold (for example 0.8) starts background compaction and bufferExhaustionThreshold (for example 0.95) blocks until compaction completes; enabled: false turns it off. Observed in two runs of 02-context.ts: the first cited a code file as documentation; the rerun cited package.json for Node 20+ and labeled code/config steps undocumented. A softer attitude-only instruction produced no visible change.'],
      sources: [SRC.sdk, SRC.npm]
    },
    'sdk-tools': {
      seconds: 145,
      notes: [
        '"defineTool connects a model-visible name and schema to a handler in the application."',
        'The handler calls releaseService.getReadiness with the authenticated user supplied by the host and the requested release ID.',
        'tools registers the tool object; availableTools allowlists names across built-in, MCP, and custom tools. With only tools, built-ins remain available; excludedTools subtracts and wins.',
        '→ Registration answers what the session can request; the next slide separates that from who may access the release.'
      ],
      know: ['The illustrative schema requires releaseId and disallows extra fields. A schema checks shape, not authorization. The existing service verifies the authenticated app user and requested release, returns a bounded result, and records the operation. Only release_readiness is exposed; no shell, file access, or publish method. The supporting 03-tools.ts quickstart instead registers lookup_owner against a small ownership table. In that run the agent answered api-team and reported no command-execution tool when asked to run git log.'],
      sources: [SRC.sdk, SRC.npm, SRC.examples]
    },
    'sdk-control': {
      seconds: 145,
      notes: [
        '"Two engineers ask the same question, and the model makes the same tool request. Gate 1 lets both through, because it only sees the tool name. Gate 2 is your service, and it knows who is asking."',
        'Walk the first row left to right: on the team, approve-once, allowed, blockers on the page. Then the second row: same request, same approve-once, and the service says no. The engineer sees a clear refusal and where to go next.',
        'That is why approving a tool is not authorizing a user. The handler in the code panel allows exactly one custom tool and rejects shell, write, and everything else with feedback the model can act on.',
        'The service takes the user from the app session, never from the model’s arguments, and its refusal stays visible so the agent can explain it. A schema checks input shape; it does not authorize a release ID.',
        '→ The app also needs to distinguish execution progress from the business result.'
      ],
      know: ['PermissionRequest kinds include read with path; write with fileName and newFileContents; shell with fullCommandText, commands, possiblePaths, and hasWriteFileRedirection; and custom-tool with toolName. Handlers return approve-once or reject with feedback (examples/sdk-quickstart/04-control.ts). When a request carries managedApprovalRequired, a human approval path is needed; a minimal handler rejects it and directs the user to the release owner. SDK hooks see the calls they receive, not every internal operation inside a custom handler. Do not treat approve-once as business approval. Observed in 04-control.ts: a shell request to count TypeScript lines was rejected; the agent switched to view, made six approved reads, and returned counts. FanHub’s repository deny also held in a precedence probe while the SDK onPreToolUse returned allow; SDK callbacks did not run for that call. The two-engineer rows are an illustrative sketch, not an observed run.'],
      sources: [SRC.sdk, SRC.npm, SRC.hooks]
    },
    'sdk-evidence': {
      seconds: 145,
      notes: [
        '"Subscribe before sending the prompt so early deltas and tool events reach the app."',
        'The UI can stream assistant text and show the requested tool. Telemetry can store sessionId, toolCallId, and execution success.',
        'The service audit records authorization and readiness. Correlating those records with app request IDs is application wiring.',
        'A successful tool execution can return ready: false. Keep execution status, permission outcome, and business result separate.',
        '→ Walk the full request and result with clearly labeled illustrative values.'
      ],
      know: ['The SDK event names used by the quickstart include assistant.message_delta, tool.execution_start, and session.idle. Additional metadata events include tool.execution_complete. The observed quickstart printed powershell, three view calls, streamed text, and idle; Windows built-ins include powershell, view, glob, and grep. Render model text as untrusted content using normal UI escaping. Avoid raw arguments, tokens, and full business records in telemetry by default. Handle session.error and transport failures visibly; idle ends the response, not the application session. Unsubscribe when the owning view is disposed.'],
      sources: [SRC.sdk, SRC.npm, SRC.examples]
    },
    'release-flow': {
      seconds: 145,
      notes: [
        '"Up to now the tool has only looked things up. This is where the model earns its place: it reads what the tool returns and does the part the engineer used to do by hand."',
        'Left: the dashboard as it exists. Each system reports its own status: go/no-go approved, one failing test, fourteen merged PRs, and a deploy button waiting on approval. Connecting them is the engineer’s job.',
        'Right: the same page with an SDK session. One question, one call to release_readiness, which returns the raw facts: the failing test, the merged PRs, and the change-record status. The model does three things the tool cannot.',
        'One: it explains the status in plain words. Two: it connects the failing test to the PR that most likely caused it, by reading the test failure beside the change list. Three: it drafts the next step and offers follow-ups, such as the go/no-go note or what changed since v2.3. A person sends the message and a release owner still approves the deploy.',
        '“Likely cause” is an inference. The answer names the test and the PR so the engineer can verify it in one click, which is the verification habit this talk keeps coming back to.',
        '→ The same host can use a different view for a different question.'
      ],
      know: ['Illustrative mockup, not a recorded run. In the sketch, releaseService.getReadiness(user, releaseId) validates the release ID, authorizes the authenticated app user, and returns permitted facts: change-record status, failing tests with their first failing commit, and PRs merged since the last release. The model’s value is synthesis over that result: plain-language explanation, cause correlation across fields, drafting, and follow-up questions in the same session. A second read-only tool, such as CI log excerpts, is a natural next step once the first is trusted; it widens what the model can correlate without widening what it can do. The action chips are app UI: drafting runs in the session, and sending or deploying stays a person’s click behind the app’s permissions and GitHub Actions environment approval. Start read-only; verify current facts, unauthorized refusal, and distinct query failure versus unfavorable readiness.'],
      sources: [SRC.sdk, SRC.npm]
    },
    'part-3': {
      seconds: 20,
      notes: [
        '"Changing what the agent sees can make its report independent of the people who already know the implementation."',
        'The blind tester sees a contract and live API, not implementation or BUGS.md; a separate referee gets a different view.',
        '→ First, meet the app this whole part is about.'
      ],
      know: ['The second perspective example in the README is fresh-eyes onboarding: docs only, with source hidden. It remains supporting material rather than the primary section payoff.'],
      sources: [SRC.blind, SRC.fresh, SRC.visibility]
    },
    'visibility-policy': {
      seconds: 150,
      notes: [
        '"Each row is a request the tester could make and the line in the app that decides it. A hook sees raw tool arguments; the permission handler sees the runtime’s parsed request."',
        'Row one: grep across the whole repo. onPreToolUse sees the raw path, sweepsHidden notices it would include hidden folders, and the hook denies it with feedback to narrow the search. Row two: the only custom tool the policy approves is api_contract.',
        'One write request deserves a closer look: the agent asks to write peek.test.js into the blind test folder, which is allowed, but that test’s code would read hidden source when it runs. The host reads newFileContents on the write request and denies it, so the file is never created.',
        'The last row is a chained command. The host splits cd node/backend; npm start | tee log at the separators, outside quoted text, into cd, npm, and tee, and checks each against the blind tester’s allowlist. cd passes; npm and tee do not, so the whole request is denied and the feedback lists the allowed commands. An allowed first word cannot carry a disallowed program behind it.',
        'The search, write, and shell rules are covered by visibility.test.ts; the custom-tool allowlist is a one-line set check. The same policy file serves the fresh-eyes app with different rules.',
        '→ A host report is useful only when we name what remains beyond its reach.'
      ],
      know: ['createVisibilityPolicy accepts repoRoot, hidden, readable, writable, shellCommands, shellTextDeny, customTools, and hiddenFeedback. The blind tests expose only api_contract, built from SETUP.md with parenthetical bug hints removed; they hide node/backend/src, frontend, docs, other language tracks, the database, and Markdown including BUGS.md. They permit writes only under node/backend/__tests__/blind and allow shell commands for server/test use. A 5-command-shape test covers quoted separators and command segmentation. Fresh-eyes hides source, allows docs, package.json, .env.example, Dockerfiles, and scripts, writes only .env, excludes web tools, limits the session to report_friction, and uses an 80-call budget plus 20-minute wait.'],
      sources: [SRC.visibility, SRC.blind, SRC.fresh, SRC.examples]
    },
    'blind-app': {
      seconds: 90,
      notes: [
        '"Part 3 is about one program: the blind-tests app. It lives in this talk’s examples folder, clones FanHub, starts its API, and asks an agent to test that API without seeing the code."',
        'Read it as the five jobs again, now in a real SDK app. Tools: one custom tool, api_contract, the tester’s only view of the API. Context: a customized system message that makes it a black-box tester. Control: one visibility policy that hides source, docs, and BUGS.md. Loop: a single sendAndWait. Evidence: the app reruns the tests itself, then a second, read-only referee session reads BUGS.md.',
        'Everything on the next three slides points back to a line in this file.',
        '→ Here is one real run of it.'
      ],
      know: ['examples/apps/blind-tests/app.ts is 180 lines. It imports prepareFanHub (clean clone of FanHub at 0ea9e78), createVisibilityPolicy, and createRunLog from host-kit, and its rules from apps/blind-tests/rules.ts. Line references on these slides are to that file at the current commit. The fresh-eyes app in the same folder reuses the policy with different rules and is supporting material in the README.'],
      sources: [SRC.blind, SRC.visibility, SRC.examples]
    },
    'blind-result': {
      seconds: 105,
      notes: [
        '"One real run of the app. The tester never saw the code, and it still found two real problems."',
        'Session one, the tester, had only api_contract and the live API. It wrote five test files, twelve tests.',
        'Then the app, not the agent, reran the suite: ten passed, two failed. We trust the rerun, not the tester’s own account of it.',
        'Session two is the referee. It is read-only and may read BUGS.md. It mapped POST /api/characters returning 500 to bug number 19, Missing Input Validation. The second failure expected seasonId filtering; SETUP.md documents seasonId while the route reads season_id, and the referee found no matching bug entry.',
        'Test status and the referee’s mapping are separate evidence. The API owner decides which side changes.',
        '→ How does the app keep the tester blind? One policy, two SDK checkpoints.'
      ],
      know: ['Observed live run on 2026-10-26: @github/copilot-sdk 1.0.26, model auto, Node 24.22.1 on Windows, FanHub commit 0ea9e78. The host prepared a clean checkout and server on port 5299; on Node 22+ it installs better-sqlite3@^12 with --no-save because FanHub pins ^9 without a prebuilt binary, leaving package.json untouched. The blind app wrote five test files across characters, episodes, shows, quotes, and authentication; host rerun recorded 10 passing and 2 failing. The two denials were a view of a README in the test folder and git status. The README summary also pairs “18 tool calls” with “19 allowed and 2 denied,” which cannot be the same total; this slide omits that inconsistent counter. A second run varied, with 9 passing and 5 failing mapped to BUGS.md #9, #6, and #17, plus a test query-parameter choice noted by the referee. Agent output varies, so the host reruns and the referee is separate.'],
      sources: [SRC.blind, SRC.examples]
    },
    'host-boundary': {
      seconds: 150,
      notes: [
        '"This slide is the honest limit of everything we just built. The SDK can stop any request the agent makes. It cannot stop code that runs inside a process you already approved."',
        'Rows one and two: the agent asks to write a test that reads src/, or to run npm start. Both arrive at onPermissionRequest as requests, with the file text or the command line, and the app denies them.',
        'Row three: the agent asks to run node --test. node is allowed, so the app approves. That approval is the last thing the SDK sees.',
        'Row four: inside that node process, test code can open any file the OS account can read, for example by building the path at runtime so the text check never matched it. That read is not a tool call, so no request ever reaches the SDK.',
        'So the SDK policy shapes what the agent asks for; the OS account or a container is the only hard limit on what an approved process does. If you need a guarantee, the container holds only the files the agent may see.',
        '→ Keep the decision, execution, and owner visible in the run log.'
      ],
      know: ['In the SDK, a write permission request carries fileName and newFileContents; a shell request carries fullCommandText, commands, and possiblePaths (visibility.ts:126 and :137 handle them). The blind policy’s write-content check uses BLIND_TEXT_DENY regexes (src/, bugs.md, fanhub.db, readFile/readdir/child_process), which catch plain reach-ins; code that assembles names at runtime is outside what a text check can promise. Other processes, users, and network traffic outside the session are also never requests; accounts, containers, and network rules govern them. This is the same boundary as pi’s find → fd from Part 1, now in SDK terms. Which side of a failing test changes is the API owner’s decision, covered on the observed-result slide.'],
      sources: [SRC.blind, SRC.visibility]
    },
    'run-evidence': {
      seconds: 105,
      notes: [
        '"When someone asks what the agent did, you answer from this log, not from the agent’s summary."',
        'Each row is a question you will actually get, and the one line in the app that answers it. What did the policy block and why? The policy’s own record. What actually ran? The SDK’s tool.execution_complete event. Did the repository’s hooks run? hook.end. How did the run go overall? The session-end counts.',
        'Keep them as separate records. A hook’s success: true means the hook ran, not that the tool succeeded, and a tool’s success says nothing about whether your policy approved it. One file per run ties them together; the SDK’s own events also carry the sessionId.',
        'Notice what the log leaves out: file contents and command output. Names, rules, and counts are enough to answer every question here.',
        'In the blind-tests run, the repository’s own preToolUse hook ran 12 times; 19 in fresh-eyes. Neither agent reached for the database, so the hook never had to deny.',
        '→ Here is what those lines look like in the file.'
      ],
      know: ['host-kit/run-log.ts subscribes with session.on to tool.execution_start, tool.execution_complete, hook.start, hook.end, and assistant.message, writes JSONL, and omits raw arguments; tool.execution_complete records toolCallId and success, not paths. The visibility policy writes its own decision records (layer, kind, subject, decision, rule) through its log callback. Repository hooks load only when createSession sets enableFileHooks: true, as the blind and fresh-eyes apps do. The hooks overlay protects node/backend/src/database/** and fanhub.db* when loaded. The repository preToolUse deny held while SDK onPreToolUse returned allow in a separate probe.'],
      sources: [SRC.runLog, SRC.overlay, SRC.examples]
    },
    'run-log-lines': {
      seconds: 75,
      notes: [
        '"This is what you actually open after a run. Six lines, read top to bottom."',
        'Line one: the repository’s own preToolUse hook ran; decision null means it did not object. Lines two and three: the agent created a test file; tool.start and tool.complete share toolCallId call_41, and success true means the write ran.',
        'Lines four and five are the two denials from the real run: a view of a README in the test folder, hidden because every Markdown file is, and git status, because git is not on the allowlist. Each names the rule it hit.',
        'The last line is the app’s own rerun: ten passing, two failing. That is the number we trust, not the agent’s summary.',
        'Notice what is missing everywhere: file contents and command output.',
        '→ Finish by naming the owners and controls around a harness someone else will run.'
      ],
      know: ['Field shapes come from host-kit/run-log.ts (runtime and repo-hook lines, which carry sessionId), the visibility policy log callback wired in apps/blind-tests/app.ts (log.emit({ source: "host-policy", ...decision }), no sessionId), and app.ts rerun and session-end lines. emit prepends ts to every line; it is trimmed here for width. The repository preToolUse hook returns {} when it allows, so decision logs as null. Recorded 2026-10-26: two host denials (a view of a README in the test folder and git status) and a host rerun of 10 passing and 2 failing. The exact README path and the call ID are illustrative. On Windows, policy subjects are lowercased by toRel.'],
      sources: [SRC.runLog, SRC.blind, SRC.visibility]
    },
    'part-4': {
      seconds: 20,
      notes: [
        '"Two practical questions to finish: what already controls a harness before you share it, and where would you embed one first?"',
        'Controls first: some are set by admins and platform teams, not by your code. Then a short pre-flight. Then a set of app ideas to take home.',
        '→ Start with the controls around the app.'
      ],
      know: ['Part 4 covers authority and transfer: the controls other teams already own around Copilot, a pre-flight that makes the harness’s claims checkable, and existing-app ideas. Each report still has a human reader, such as the docs owner for onboarding friction or the API owner for contract failures.'],
      sources: [SRC.hooks, SRC.policies, SRC.auth]
    },
    'surrounding-controls': {
      seconds: 125,
      notes: [
        '"The application runs inside access, model, billing, hook, tool, and operating-system decisions owned by other people."',
        'The model name is a request; verify availability and the effective session behavior. Authentication route affects policy and billing terms.',
        'Policy hooks are administrator controls for Copilot CLI. They load before other hooks and remain active under disableAllHooks; this claim is CLI-specific.',
        'managedApprovalRequired needs a human approval path. Process access still comes from the OS account, container, and network.',
        '→ Use a pre-flight to turn those assumptions into checks.'
      ],
      know: ['Machine-wide policy hook locations in the hooks reference include C:\\ProgramData\\GitHub\\Copilot\\policy.d\\*.json, /etc/github-copilot/policy.d, and the HKLM policy registry key. Policy hooks are not supported in cloud agent. Signed-in-user and token auth follow Copilot licensing and policy; BYOK traffic follows provider terms. Admins control access, model availability, and managed tools/MCP.'],
      sources: [SRC.hooks, SRC.policies, SRC.models, SRC.auth]
    },
    preflight: {
      seconds: 125,
      notes: [
        '"Before you hand this to someone else, four checks. The goal is simple: they get the same result you did, inside the same limits."',
        'Repeatable: the blind-tests app clones FanHub at a pinned commit every time and writes that commit into its report. Add the SDK version too, so a surprising result can be rerun.',
        'Limits: the app caps tool calls with TOOL_BUDGET and the wait with TIMEOUT_MS, aborts when the budget runs out, and disconnects the session whether the run succeeded or not.',
        'Test the policy: visibility.test.ts feeds the policy real request shapes, a grep over the repo, a write that reads src, a chained shell command, and checks each decision without running an agent.',
        'Who it runs as: the license slide again. Confirm the user’s sign-in, which models their org allows, and who is billed. Then name the person who reads each report: the API owner for contract failures, the docs owner for onboarding friction.',
        '→ Now pick where to embed one first.'
      ],
      know: ['The quickstarts use SDK 1.0.26; record SDK and runtime versions in reports. blind-tests/app.ts sets TOOL_BUDGET (default 120) and TIMEOUT_MS (default 20 minutes), calls session.abort() when the budget is reached, and disconnects both sessions and stops the client after the run. Test every visibility rule against real PermissionRequest shapes. If you also add repository hooks: a command preToolUse hook that crashes or exits non-zero denies, and a timeout is fail-open, including policy hooks; stdout carries one JSON object, and permissionDecisionReason is shown to the agent. FanHub’s tested hook completed in about 55 ms against a 5-second budget; one test observation, not a universal target. Choosing a mechanism: a sessionStart hook fits a session-start note; a repository or machine preToolUse hook fits a call that must never run in any harness; an SDK host fits a workflow that needs its own persona, tools, visibility rules, budget, or structured report.'],
      sources: [SRC.sdk, SRC.npm, SRC.hooks, SRC.examples]
    },
    'apps-to-embed': {
      seconds: 125,
      notes: [
        '"The pattern that pays off: narrow, read-only tools over data your app already has, and a question that takes judgment to answer. The model connects and drafts; a person acts."',
        'Incident app: alerts, deploys, and flag flips usually live in three tools. The model lines them up and says “the error spike started two minutes after the flag flipped.” Rollback stays a human click.',
        'Metrics app: the tool takes a metric, a dimension, and a range from fixed lists, never raw SQL. The model chooses which slices to compare and explains the drop. A person decides what goes upstairs.',
        'Security portal: the hard part of a CVE alert is reachability. The model reads the advisory, searches for the call sites, and makes the case with file references. Dismissing or fixing stays with the owner.',
        'Code review queue: twelve open PRs, one reviewer. The model ranks them by blast radius from changed paths, code owners, and coverage. People still choose and merge.',
        'The last two are not hypothetical. The release dashboard is the one we built in Part 2. Fresh-eyes runs today in this talk’s examples and found three real documentation problems in FanHub.',
        '"Your turn: which app already has the data, and which question takes a person an hour to answer today?"'
      ],
      know: ['Cards A through D are illustrative designs; tool names are examples of narrow, read-only app methods. In each, consequential actions (rollback, refund, dismissing an alert, merging, deploying) stay as app UI behind existing permissions. queryMetric takes enumerated metric and dimension values so the model cannot write arbitrary queries. Fresh-eyes is a supporting working app: it starts from a pinned clean FanHub clone; persona follows written docs literally; source is hidden; .env is the only writable path; an allowlist controls setup commands; web tools are excluded; report_friction records step, docSays, reality, doc, and severity. Bounds are 80 tool calls, 20 minutes, and cleanup of a listener on port 5265. Observed: 24 tool calls, 20 allowed, one denied, zero source reads, GET /api/characters returned 200, and three findings. Finding 1: node/SETUP.md says Node 18+; on Node 24 better-sqlite3 had no prebuilt binary and its source build needed Python. Finding 2: node/README.md calls Docker a prerequisite and gives port 3001, while SETUP.md says no Docker and uses 5265. Finding 3: docs give no native-install fallback; the agent recovered with npm exec --package=node@20. The docs owner decides what to fix.'],
      sources: [SRC.fresh, SRC.visibility, SRC.examples]
    },
    'before-after': {
      seconds: 45,
      notes: [
        '"Here is the whole talk in four rows: what changes when the loop runs inside your app instead of behind a chat prompt."',
        'Read each row as a job. Loop: you can name what happens on every turn. Tools: your methods become the agent’s tools. Control: tool permission and user authorization stay separate. Evidence: you read the log, not the agent’s summary.',
        'The three numbers are the proof points: pi’s loop fits in about 160 lines, the SDK gives you one option per job, and the blind tester found two real problems, one known bug and one docs-versus-code mismatch, without ever seeing the code.',
        '→ Here is a small sequence for applying this in your own repository.'
      ],
      know: ['pi runLoop spans L172-L330 at f9daca3, about 160 lines; an approximate source-size observation, not a performance metric. “One option per job” refers to the slide 13 mirror (sendAndWait, infiniteSessions, defineTool, onPermissionRequest, session.on). The two problems are from the observed 2026-10-26 blind-tests run: POST /api/characters returned 500 (BUGS.md #19) and the seasonId filter mismatch (undocumented).'],
      sources: [SRC.pi, SRC.sdk, SRC.blind]
    },
    today: {
      seconds: 115,
      notes: [
        '"Today, read the loop and point to each job, the result, and the stop condition."',
        '"This week, run the loop and control quickstarts in a disposable environment; the useful signal is a rejected shell request followed by recovery through approved reads."',
        '"This month, wrap one read-only method. Check an authorized answer and an unauthorized refusal, then inspect the UI, service audit, and telemetry separately."',
        'The three horizons are actions and checks, not promised productivity gains.',
        '→ Keep the source links with the notes, and bring one method back to your team.'
      ],
      know: ['The examples package has npm test for hook decisions and visibility rules, fresh-eyes, and blind-tests scripts. Running the two apps installs dependencies and starts servers; use a disposable environment. FANHUB_SOURCE can point to a local FanHub clone to avoid a network clone. Example artifacts land under examples/.runs/.'],
      sources: [SRC.examples, SRC.pi]
    },
    references: {
      seconds: 25,
      notes: [
        '"These links let you check the pinned source, SDK contract, hooks, authentication, and governance references."',
        'The notes above identify which evidence supports each specific claim.'
      ],
      know: ['README frontmatter references are the source for this slide. The talk’s pi excerpts are read-only and pinned to f9daca3; SDK examples and observations use version 1.0.26.'],
      sources: [SRC.pi, SRC.sdk, SRC.npm, SRC.auth, SRC.hooks, SRC.vscode, SRC.policies, SRC.models]
    },
    thanks: {
      seconds: 20,
      notes: [
        '"Choose one method in an app you own, then name its user check, its approval boundary, and the evidence its users will see."',
        'Ask the room to name the report owner as well as the tool.',
        '→ Thank the audience and leave the notes open for the source links and handout.'
      ],
      know: ['The talk’s transfer contract is a decision, reproducible evidence, a boundary or recovery path, and an adaptation to the audience’s repository or organization.'],
      sources: [SRC.sdk, SRC.hooks, SRC.examples]
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'harness-fundamentals',
      title: 'Harness Fundamentals',
      short: 'Getting Inside the Agent Loop',
      category: 'practitioner tech talk',
      source: 'tech-talks/harness-fundamentals/README.md',
      question: 'How do I get inside the agent loop and change how it behaves?',
      thesis: 'A harness is a loop with five jobs; the Copilot SDK lets an existing app expose selected methods while the app retains authorization, approval, UI, and telemetry.'
    },
    slides
  };
})();
