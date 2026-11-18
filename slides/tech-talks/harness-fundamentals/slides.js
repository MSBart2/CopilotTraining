/*
  Harness Fundamentals — native deck data and teaching notes.
  Structure follows the approved example consolidation in deck.recipe.yml.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    pi: { label: 'pi source at pinned MIT commit f9daca3', href: 'https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d' },
    piSdk: { label: 'pi TypeScript SDK documentation at pinned commit f9daca3', href: 'https://github.com/earendil-works/pi/blob/f9daca3480732d0042b1df3a6e27221f597a620d/packages/coding-agent/docs/sdk.md' },
    sdk: { label: 'Microsoft Copilot SDK repository and 2.0 documentation', href: 'https://github.com/microsoft/copilot-sdk' },
    npm: { label: '@microsoft/copilot-sdk 2.0.0 package', href: 'https://www.npmjs.com/package/@microsoft/copilot-sdk' },
    auth: { label: 'Microsoft Copilot SDK authentication documentation', href: 'https://github.com/microsoft/copilot-sdk/tree/main/docs/auth' },
    authMethods: { label: 'Microsoft Copilot SDK authentication methods', href: 'https://github.com/microsoft/copilot-sdk/blob/main/docs/auth/authenticate.md' },
    s2s: { label: 'Microsoft Copilot SDK server-to-server authentication', href: 'https://github.com/microsoft/copilot-sdk/blob/main/docs/auth/server-to-server-tokens.md' },
    byok: { label: 'Microsoft Copilot SDK bring your own key (BYOK)', href: 'https://github.com/microsoft/copilot-sdk/blob/main/docs/auth/byok.md' },
    tenancy: { label: 'Microsoft Copilot SDK multi-tenancy and server deployments', href: 'https://github.com/microsoft/copilot-sdk/blob/main/docs/setup/multi-tenancy.md' },
    runtime: { label: 'Microsoft Copilot SDK in-process runtime', href: 'https://raw.githubusercontent.com/microsoft/copilot-sdk/main/docs/setup/in-process-runtime.md' },
    sandbox: { label: 'Microsoft Copilot SDK session sandbox type definitions', href: 'https://www.npmjs.com/package/@microsoft/copilot-sdk' },
    mxc: { label: 'Microsoft Execution Container (MXC) local isolation backends', href: 'https://github.com/microsoft/mxc/blob/main/README.md' },
    sdk2Article: { label: 'Microsoft Copilot SDK 2.0 release and migration notes', href: 'https://commandline.microsoft.com/microsoft-copilot-sdk-2-0-github/' },
    hooks: { label: 'GitHub Copilot hooks reference', href: 'https://docs.github.com/en/copilot/reference/hooks-reference' },
    vscode: { label: 'VS Code agent hooks documentation (Preview)', href: 'https://code.visualstudio.com/docs/agent-customization/hooks' },
    policies: { label: 'Copilot enterprise and organization policies', href: 'https://docs.github.com/en/copilot/concepts/enterprise/policies' },
    models: { label: 'Supported Copilot models', href: 'https://docs.github.com/en/copilot/reference/ai-models/supported-models' },
    examples: { label: 'Talk examples and tests', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples' },
    blind: { label: 'Blind-test app source', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/harness-fundamentals/examples/apps/blind-tests/app.ts' },
    fresh: { label: 'Fresh-eyes app source', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/harness-fundamentals/examples/apps/fresh-eyes/app.ts' },
    visibility: { label: 'Shared visibility policy and tests', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples/host-kit' },
    runLog: { label: 'Run log implementation', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/harness-fundamentals/examples/host-kit/run-log.ts' },
    overlay: { label: 'FanHub repository hook overlay', href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples/fanhub-overlay' },
    msHarness: { label: 'Official Microsoft Blog: Introducing the Microsoft Copilot harness (2026-10-28)', href: 'https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/' },
    harnessEval: { label: 'GitHub Blog: Evaluating the Copilot agentic harness across models and tasks', href: 'https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/' },
    foundryHarness: { label: 'Foundry blog: Microsoft Copilot harness in Agent Service (public preview)', href: 'https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry' },
    studioHarness: { label: 'Copilot Studio harness choices', href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview' },
    bench: { label: 'GitHub Copilot Benchmarks (DeepSWE 1.1, Terminal-Bench 4.0)', href: 'https://benchmarks.github.com/' }
  };

  const slides = [
    S('title', 0, 'Harness Fundamentals', {
      chrome: false, visual: 'harness-loop',
      subtitle: 'Add an Agent Without Owning Another Harness',
      tagline: 'Read the five jobs, embed Microsoft Copilot SDK in an app, and test where a team-owned harness fits better.',
      meta: 'Extend and Embed · Practitioner Tech Talk · 45 minutes · Microsoft Copilot SDK 2.0.0'
    }),
    S('core-question', 0, 'How do I add an agent to my app without owning another harness?', {
      pill: 'Core Question',
      subtitle: 'Microsoft Copilot SDK runs the harness loop; your app keeps identity, service authorization, business approval, UI, and audit.',
      highlight: 'Choose the SDK when its maintained harness fits; keep a team-owned harness when its boundary or control model matters more.',
      routing: ['Loop', 'Context', 'Tools', 'Control', 'Evidence'], routingLabel: 'Five jobs a harness does',
      roles: [
        { icon: '🧩', title: 'An app has answers', description: 'A service method already returns facts people need to interpret.' },
        { icon: '🔁', title: 'A check repeats', description: 'A host can run the same bounded review and preserve its evidence.' },
        { icon: '🛡️', title: 'The boundary matters', description: 'Compare SDK ownership with the cost of running your own harness.' }
      ],
      stats: [
        { title: 'Five jobs', description: 'A reusable map for any harness choice.' },
        { title: 'One-method spike', description: 'Test the SDK with a real app boundary.' },
        { title: 'A fit decision', description: 'Name what the team retains or gives up.' }
      ]
    }),
    S('contents', 0, 'From five jobs to one harness choice', {
      pill: 'Route · Four parts',
      sections: [
        { icon: '🔁', title: 'What a Harness Is', subtitle: 'Read pi as source', blurb: 'Name five jobs and see how a small loop handles each.', slide: 4 },
        { icon: '🧰', title: 'Drive the Microsoft Copilot SDK', subtitle: 'Use an app you own', blurb: 'Connect a release question to an existing service method.', slide: 12 },
        { icon: '🔍', title: 'Decide What It Sees', subtitle: 'Test a deliberate view', blurb: 'Inspect contract-only tests and a docs-only setup check.', slide: 16 },
        { icon: '💡', title: 'Controls and the Choice', subtitle: 'Compare harness fit', blurb: 'Use sourced evidence, then score and spike one method.', slide: 20 }
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
      footnote: 'The SDK release-dashboard example wraps an existing service method in one named tool.'
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
    S('part-2', 2, 'Drive the Microsoft Copilot SDK', {
      scene: 'opener',
      subtitle: 'Put the loop inside an app you already own, with its methods, permissions, and UI.',
      cards: [
        { icon: '🖥️', title: 'Host the SDK', blurb: 'Your app starts and scopes the session' },
        { icon: '🧰', title: 'Expose one method', blurb: 'The handler calls existing app code' },
        { icon: '📡', title: 'Show the evidence', blurb: 'UI and telemetry keep their context' }
      ],
      terminal: { context: 'SDK map → authentication → one-page example', detail: 'Full code walkthroughs are linked for follow-up learning' }
    }),
    S('sdk-map', 2, 'Same five jobs; the SDK turns each into one option or call', {
      scene: 'sdk-mirror', pill: 'Drive the Microsoft Copilot SDK · Map',
      subtitle: 'pi leaves the loop in your code; Microsoft Copilot SDK 2.0 runs it and exposes configuration for each job.',
      columns: ['pi · you wire it into your loop', 'Microsoft Copilot SDK 2.0'],
      rows: [
        { label: 'Loop', z: 'local', pi: 'while (hasMoreToolCalls) { … }', piNote: 'Your code decides each next turn.', sdk: 'new CopilotClient({ mode: "coding-agent" })', sdkNote: 'Client mode selects the runtime experience.' },
        { label: 'Context', z: 'remote', pi: 'config.transformContext(messages)', piNote: 'Your code maintains the message list.', sdk: 'systemMessage · sendAndWait({ prompt })', sdkNote: 'You write instructions and requests; runtime manages history.' },
        { label: 'Tools', z: 'github', pi: 'registerTool({ name, parameters, execute })', piNote: 'An extension adds a tool definition.', sdk: 'tools: { definitions, availableTools }', sdkNote: 'Grouped definitions add tools; allowlists select names.' },
        { label: 'Control', z: 'orange', pi: 'beforeToolCall → { block, reason }', piNote: 'Block a validated call with a reason.', sdk: 'permissions: { onRequest }', sdkNote: 'Approve or reject requests with feedback.' },
        { label: 'Evidence', z: 'green', pi: 'subscribe((event) => …)', piNote: 'Listen to the loop’s event stream.', sdk: 'events: { streaming: true } · session.on(...)', sdkNote: 'Enable streaming; subscribe to typed events.' }
      ],
      footnote: 'The app configures the SDK client and session; implementation transport details are not part of this comparison.'
    }),
    S('sdk-license', 2, 'Does every app user need Copilot? It depends on authentication', {
      scene: 'detail-rows', pill: 'Drive the Microsoft Copilot SDK · Licensing',
      subtitle: 'Compare the per-user token and BYOK routes.',
      columns: ['The session runs as', 'Each app user needs Copilot?', 'Who is billed'],
      rows: [
        { label: 'Each signed-in user', detail: 'Yes · signed-in user or OAuth token per session', proof: 'That user’s Copilot plan; usage and org policy follow the person.', z: 'purple' },
        { label: 'Your model key (BYOK)', detail: 'No · OpenAI, Azure, Foundry, Anthropic, and more', proof: 'Your model provider, directly; Copilot auth is bypassed.', z: 'green' }
      ],
      codeSource: 'Microsoft Copilot SDK 2.0.0 · shared-server mode',
      code: [
        'const client = new CopilotClient({ mode: "empty" });',
        'const session = await client.createSession({ model: "auto",',
        '  github: { token: user.githubToken },',
        '  permissions: { onRequest: appPermissionHandler } });'
      ],
      footnote: 'Shared servers use session.github.token for per-user identity and mode: "empty" to avoid ambient coding-agent tools.'
    }),
    S('release-flow', 2, 'Release dashboard: one tool turns status into a next step', {
      scene: 'app-example', pill: 'Drive the Microsoft Copilot SDK · Example',
      subtitle: 'A release engineer asks “What blocks v2.4?” The SDK calls an existing, authorized service method.',
      codeSource: 'SDK 2.0.0 · integration sketch · lifecycle omitted',
      code: [
        'const client = new CopilotClient({ mode: "empty" });',
        'const readiness = defineTool<{ releaseId: string }>("release_readiness", {',
        '  parameters: { type: "object",',
        '    properties: { releaseId: { type: "string" } },',
        '    required: ["releaseId"], additionalProperties: false },',
        '  handler: async ({ releaseId }) =>',
        '    releaseService.getReadiness(user, releaseId),',
        '});',
        'const session = await client.createSession({',
        '  github: { token: user.githubToken },',
        '  tools: { definitions: [readiness],',
        '    availableTools: ["release_readiness"] },',
        '  permissions: { onRequest: allowReadinessOnly },',
        '});',
        'const reply = await session.sendAndWait({',
        '  prompt: "What blocks v2.4?",',
        '});'
      ],
      cards: [
        { title: 'Configuration that matters', detail: 'One tool name, a required release ID, and an app-supplied user. allowReadinessOnly rejects other tools and request kinds.', z: 'purple' },
        { title: 'Illustrative answer', detail: '“checkout.spec fails; inspect the tax-rounding change, then rerun CI.” The engineer checks the test and change links.', z: 'local' },
        { title: 'The app keeps authority', detail: 'The service checks this user’s release access. Tool permission grants no deploy approval; the release owner still decides.', z: 'orange' }
      ],
      followUp: { href: `${SRC.examples.href}/sdk-quickstart`, label: 'Study the five SDK quickstarts', detail: 'Full integration walkthrough in the speaker notes' }
    }),
    S('part-3', 3, 'Decide What It Sees', {
      scene: 'opener',
      subtitle: 'The same host can make a useful check independent by changing its agent’s view.',
      cards: [
        { icon: '🧪', title: 'Contract-only tests', blurb: 'The host verifies the API behavior' },
        { icon: '📘', title: 'Docs-only setup', blurb: 'A clean checkout exposes friction' },
        { icon: '🛡️', title: 'Execution boundary', blurb: 'Permission and isolation differ' }
      ],
      terminal: { context: 'Two runnable SDK 2.0 samples', detail: 'Inspect the configuration and result here; run the samples afterward' }
    }),
    S('blind-result', 3, 'Blind tests: let the API contract expose implementation gaps', {
      scene: 'app-example', pill: 'Decide What It Sees · Example',
      subtitle: 'The tester sees the contract and live API; the host hides implementation and bug hints, then reruns the tests.',
      codeSource: 'blind-tests/app.ts · selected policy + session options',
      code: [
        '// createVisibilityPolicy: selected options',
        'hidden: isHiddenFromBlindTester,',
        'readable: isBlindReadable,',
        'writable: isBlindWritable,',
        'shellCommands: BLIND_SHELL,',
        'shellTextDeny: BLIND_TEXT_DENY,',
        'urls: isLoopbackUrl,',
        '',
        '// client.createSession: selected options',
        'tools: { definitions: [apiContract],',
        '  excludedTools: ["web_fetch", "web_search"] },',
        'permissions: { onRequest: policy.onPermissionRequest },',
        'hooks: {',
        '  enableRepositoryHooks: true,',
        '  handlers: { onPreToolUse: policy.onPreToolUse }',
        '},'
      ],
      cards: [
        { title: 'Configuration that matters', detail: 'Host rules hide source and BUGS.md; writes go only to the blind-test folder. Hook arguments and parsed permissions are separate checks.', z: 'purple' },
        { title: 'Observed · 2026-11-18 · SDK 2.0.0', detail: 'Host rerun: 12 pass, 2 fail. A valid character POST returned 500; the seasonId filter was ignored.', z: 'green' },
        { title: 'Evidence and owner', detail: 'The rerun verifies behavior; the read-only referee’s bug mapping is a lead. The API owner decides. Policy callbacks provide no OS isolation.', z: 'orange' }
      ],
      followUp: { href: SRC.blind.href, label: 'Open blind-tests/app.ts', detail: 'From examples/: npm run blind-tests · inspect tests.tap and blind-report.md' }
    }),
    S('fresh-eyes', 3, 'Fresh-eyes: turn setup friction into a docs-owner report', {
      scene: 'app-example', pill: 'Decide What It Sees · Example',
      subtitle: 'A docs-only agent tries a clean FanHub checkout and records each mismatch before working around it.',
      codeSource: 'fresh-eyes/app.ts · selected policy + session options',
      code: [
        '// createVisibilityPolicy: selected options',
        'hidden: isSourceCode,',
        'readable: isDocLike,',
        'writable: (rel) => /(^|\\/)\\.env$/.test(rel),',
        'customTools: new Set(["report_friction"]),',
        'urls: isLoopbackUrl,',
        '',
        '// client.createSession: selected options',
        'tools: { definitions: [reportFriction],',
        '  excludedTools: ["web_fetch", "web_search"] },',
        'permissions: { onRequest: policy.onPermissionRequest },',
        'hooks: {',
        '  enableRepositoryHooks: true,',
        '  handlers: { onPreToolUse: policy.onPreToolUse }',
        '},'
      ],
      cards: [
        { title: 'Configuration that matters', detail: 'Source hidden, docs readable, only .env writable. report_friction records step, docs claim, observed reality, location, and severity.', z: 'purple' },
        { title: 'Observed · 2026-11-18 · SDK 2.0.0', detail: '“Node 18+” met a native-build failure on Node 26. With cached Node 20, GET /api/characters returned 200. The report held 6 friction rows.', z: 'green' },
        { title: 'Evidence and owner', detail: 'The docs owner separates setup gaps from policy denials before editing. A blocked download is evidence of a boundary, not automatically a docs bug.', z: 'orange' }
      ],
      followUp: { href: SRC.fresh.href, label: 'Open fresh-eyes/app.ts', detail: 'From examples/: npm run fresh-eyes · inspect friction-report.md' }
    }),
    S('host-boundary', 3, 'Permission gates requests; isolation limits running code', {
      scene: 'code-rows', pill: 'Decide What It Sees · Boundary',
      subtitle: 'A request callback governs mediated calls; in-process hosting does not isolate code the host executes.',
      columns: ['Boundary', 'Mechanism', 'What it establishes'],
      rows: [
        { label: 'Agent requests a tool', code: 'permissions.onRequest → approve-once | reject', proof: 'The app can refuse the request before it runs.', z: 'purple' },
        { label: 'Approved code executes', code: 'Process → filesystem / network / child process', proof: 'Internal operations may cause no further SDK request.', z: 'orange' },
        { label: 'Platform limits execution', code: 'OS sandbox → filesystem + network restrictions', proof: 'Enforcement belongs below the model and permission callback.', z: 'green' }
      ],
      footnote: 'SDK 2.0.0 permissions.sandbox is experimental and untested here; the two sample apps use policy callbacks.'
    }),
    S('part-4', 4, 'Controls and the Choice', {
      scene: 'opener',
      subtitle: 'Start with the sourced case for a shared harness, then decide what your team wants to own.',
      cards: [
        { icon: '📣', title: 'Evidence', blurb: 'What Microsoft says it standardizes' },
        { icon: '🧭', title: 'Fit', blurb: 'Which boundaries your team owns' },
        { icon: '🧪', title: 'Spike', blurb: 'Test one method in your app' }
      ],
      terminal: { context: 'Controls and the Choice', detail: 'Compare the maintained harness with the boundary you need' }
    }),
    S('one-harness', 4, 'The harness is “adopted company-wide,” Microsoft says', {
      scene: 'harness-hub', pill: 'Microsoft says · vendor evidence',
      subtitle: 'Microsoft says it is “standardizing all of our Copilot experiences” on the harness.',
      surfaces: [
        { label: 'Copilot Code' },
        { label: 'Copilot Studio · one of 3 harness choices' },
        { label: 'GitHub Copilot app' },
        { label: 'Copilot CLI' },
        { label: 'VS Code' },
        { label: 'Your app · SDK', mark: 'self-hosted', z: 'green' },
        { label: 'Foundry Agent Service', mark: 'public preview', z: 'purple' }
      ],
      hub: {
        title: 'Microsoft Copilot harness',
        detail: 'The same five jobs, with two hosting boundaries',
        note: 'SDK: loop in your app process. Foundry: Microsoft-managed agent loop and sandbox.'
      },
      jobs: ['Loop', 'Context', 'Tools', 'Control', 'Evidence'],
      models: [
        { label: '20+ frontier models', detail: 'Model reach cited by Microsoft', z: 'remote' },
        { label: 'Model choice', detail: 'Select or let the harness route', z: 'purple' },
        { label: 'Multi-model work', detail: 'Combine models for a task', z: 'local' },
        { label: 'Bring your own key', detail: 'Use another provider’s key', z: 'green' }
      ],
      footnote: 'The Official Microsoft Blog names only these Copilot examples; Foundry Agent Service is a separate managed public preview.'
    }),
    S('surrounding-controls', 4, 'Different owners control different boundaries', {
      scene: 'detail-rows', pill: 'Controls and the Choice · Owners',
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
      scene: 'scorecard', pill: 'Controls and the Choice · Pre-flight',
      subtitle: 'We want the next person to get the same result inside the same limits. These four checks make that true.',
      cards: [
        { icon: '📌', title: 'Make runs repeatable', description: 'Pin the SDK version and start each run from a clean checkout, so results reproduce.' },
        { icon: '⏱️', title: 'Put limits on each run', description: 'Cap tool calls and wait time, and close the session even when the run fails.' },
        { icon: '🧪', title: 'Test the policy itself', description: 'Unit-test your permission rules with real request shapes before any agent meets them.' },
        { icon: '👤', title: 'Check who it runs as', description: 'Confirm sign-in, models, and billing for real users, and name who reads each report.' }
      ]
    }),
    S('harness-testing', 4, 'To test a harness, hold the model fixed and change only the harness', {
      scene: 'detail-rows', pill: 'Controls and the Choice · GitHub study',
      subtitle: 'GitHub ran Copilot CLI against each model vendor’s own harness, with the same model on the same tasks.',
      columns: ['Step', 'What GitHub did', 'Why it matters'],
      rows: [
        { label: 'Same model, two harnesses', detail: 'Copilot CLI vs Claude Code (Sonnet 4.6, Opus 4.7) and vs Codex CLI (GPT-5.4, GPT-5.5)', proof: 'Any difference comes from the harness, since the model is the same.', z: 'purple' },
        { label: 'Same settings', detail: 'Same context window and prompt limit, medium reasoning, built-in tools only, no MCP or web, 2-hour timeout', proof: 'Public leaderboards use tuned settings, so their numbers differ from these.', z: 'local' },
        { label: 'Five kinds of task', detail: 'SWE-bench Verified and Pro, SkillsBench, TerminalBench 2, and Win-Hill (internal, Windows containers)', proof: 'Bug fixes, multi-step changes, skill triggering, terminal work, and a second OS.', z: 'remote' },
        { label: 'Repeat, show the spread', detail: 'Five or more runs per pairing; ±1σ spread plotted on TerminalBench 2’s 89 tasks', proof: 'Model errors stay in the score; only infrastructure failures are rerun.', z: 'orange' },
        { label: 'GitHub-reported result', detail: 'Resolution was on par within run-to-run variance; token use was lower in most pairings.', proof: 'Exception: GPT-5.4 and GPT-5.5 on SWE-bench Verified used 7% and 4% more tokens.', z: 'green' }
      ],
      footnote: 'GitHub-authored comparison; it is one study, not a universal harness ranking. See the cited methodology and exceptions.'
    }),
    S('choose-harness', 4, 'Score the fit, then spike one method', {
      scene: 'scorecard', pill: 'Decision aid · no measured scores',
      subtitle: 'Choose Microsoft Copilot SDK when the maintained loop fits; keep a team-owned harness when its boundary or control needs justify the work.',
      cards: [
        { icon: '🔧', title: 'Maintenance + fit limits', description: 'Who owns upgrades, uptime, custom behavior, and the work of maintaining another loop?' },
        { icon: '👥', title: 'User + execution boundary', description: 'How does a second user stay isolated, and where does each tool process execute?' },
        { icon: '🧠', title: 'Model reach', description: 'Do documented model and BYOK options fit the task and policy?' },
        { icon: '🧾', title: 'Inspectable evidence', description: 'Can you distinguish permissions, runtime events, service audit, and final result?' }
      ],
      footnote: 'Spike: wrap one existing read-only method; name the user check and execution boundary; test allowed and refused requests; inspect UI, service audit, and telemetry.'
    }),
    S('before-after', 0, 'Pi or Microsoft Copilot SDK? Choose what to own.', {
      scene: 'detail-rows', emphasize: 'right', pill: 'Harness choice · Different strengths',
      subtitle: 'Both embed in an app. Choose by how much of the harness you want to shape and the integration you want to maintain.',
      columns: ['Decision', 'Pi TypeScript SDK', 'Microsoft Copilot SDK 2.0'],
      rows: [
        { label: 'Harness', detail: 'Minimal, MIT-licensed, and extensible; customize tools, resources, sessions, and extensions.', proof: 'Microsoft-maintained Copilot runtime and loop; configure tools, permissions, hooks, and events.', z: 'purple' },
        { label: 'In-process use', detail: 'Embed the TypeScript SDK in a Node.js or Bun process.', proof: 'Load the native runtime in the app process by default; no separate runtime process is required.', z: 'local' },
        { label: 'Multi-user app', detail: 'The host chooses identity, session storage, resources, and tenant boundaries.', proof: 'Per-session identity, state, and tools; the app still owns routing, authorization, and isolation choices.', z: 'remote' },
        { label: 'Good fit when', detail: 'Deep harness customization and an open extension model justify your integration work.', proof: 'A maintained Copilot harness fits your needs, so the team can focus on app integration.', z: 'green' }
      ],
      codeSource: 'Illustrative TypeScript entry points · in-process by default for both',
      code: [
        'pi:  createAgentSession({ tools, resourceLoader })',
        'SDK: new CopilotClient({ mode: "empty" }) // native runtime in app process'
      ]
    }),
    S('today', 0, 'Make the next step small and inspectable', {
      pill: 'Transfer · Today, this week, this month',
      horizons: [
        { icon: '🧭', label: 'Today', z: 'green', items: ['Score SDK vs team-owned harness.', 'Name the fit and accepted cost.', 'Use the six scorecard questions.'] },
        { icon: '🧪', label: 'This week', z: 'local', items: ['Spike one read-only method.', 'Check an allowed call and a refusal.', 'Inspect UI, audit, and telemetry.'] },
        { icon: '🧰', label: 'This month', z: 'purple', items: ['Review evidence with service and platform owners.', 'Name user check, boundary, report owner.', 'Extend or stop based on the evidence.'] }
      ],
      takeaway: 'Microsoft Copilot SDK is the actionable starting choice; keep a team-owned harness when evidence shows a better fit.'
    }),
    S('references', 0, 'First-party references', {
      pill: 'First-party references · verified 2026-11-18',
      groups: [
        { title: 'pi and Microsoft Copilot SDK', z: 'local', items: [
          { href: 'https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d',           label: 'pi coding agent at f9daca3 (MIT license)', description: 'Pinned source for every pi excerpt: loop, tools, control, evidence' },
          { href: 'https://github.com/microsoft/copilot-sdk', label: 'Microsoft Copilot SDK', description: '2.0 API, client mode, grouped tools, permissions, hooks, events' },
          { href: 'https://www.npmjs.com/package/@microsoft/copilot-sdk', label: '@microsoft/copilot-sdk 2.0.0', description: 'Package every example runs on; quickstarts and both apps run 2026-11-18' },
          { href: 'https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/harness-fundamentals/examples', label: 'Talk examples and tests', description: 'Five quickstarts, blind-tests, fresh-eyes, and the shared visibility policy' },
        ] },
        { title: 'Harness evidence and hosting', z: 'green', items: [
          { href: 'https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/', label: 'Official Microsoft Blog · Copilot harness', description: 'Attributed company-wide claim and named Copilot examples' },
          { href: 'https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry', label: 'Foundry Agent Service · public preview', description: 'Managed loop and sandbox boundary' },
          { href: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview', label: 'Copilot Studio harness choices', description: 'Three harnesses, including Microsoft Copilot' },
          { href: 'https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/', label: 'GitHub same-model harness study', description: 'Methodology, result, and token-use exceptions' },
        ] }
      ]
    }),
    S('thanks', 0, 'Harness Fundamentals', {
      chrome: false, visual: 'harness-loop',
      subtitle: 'Which existing method will you test with Microsoft Copilot SDK, and what boundary would make your own harness a better fit?',
      cards: [
        { value: '5 jobs', detail: 'Loop, context, tools, control, evidence' },
        { value: 'One spike', detail: 'A named method, a user check, a process boundary' },
        { value: 'A fit decision', detail: 'Inspect the UI, service audit, and telemetry' }
      ]
    })
  ];

  const NOTES = {
    title: {
      seconds: 20,
      notes: [
        '"You can add an agent to an app without taking on another harness to maintain."',
        'The inner ring is one turn: context feeds the model, control gates each requested tool, and tool results return for the next turn. The outer ring is the run, from prompt to final answer; the loop job decides whether another turn starts.',
        '→ Start with the decision a developer or platform engineer faces when an agent needs to enter an existing app.'
      ],
      know: ['All five quickstarts and both FanHub apps ran live on Microsoft Copilot SDK 2.0.0 (@microsoft/copilot-sdk) on 2026-11-18. The release dashboard is an integration sketch. No live demo is planned: inspect each example’s configuration and result, then use the notes and linked samples for follow-up learning. pi source is pinned at f9daca3. Planned speaking time is 40:25 in a 45-minute slot; confirm with a timed rehearsal.'],
      sources: [SRC.pi, SRC.sdk]
    },
    'core-question': {
      seconds: 45,
      notes: [
        '"The question is how to add an agent to an app without owning another harness."',
        'The actionable starting choice is Microsoft Copilot SDK: it supplies the harness loop while the app exposes selected methods and retains user identity, service authorization, business approval, UI, and evidence.',
        'A team-owned harness remains a valid choice when a required execution boundary, custom control, or deployment model outweighs maintaining the loop. We will compare that tradeoff at the end.'
      ],
      know: ['Audience: developers and platform engineers already using Copilot in an editor or CLI who want an agent inside an app they own. The talk presents a decision, not a requirement to adopt the SDK.'],
      sources: [SRC.pi, SRC.sdk]
    },
    contents: {
      seconds: 30,
      notes: [
        '"We read pi first, mirror its five jobs in Microsoft Copilot SDK, inspect a deliberately blind test, then compare the evidence and choose a harness."',
        'The openers begin on slides 4, 12, 16, and 20. Click a route card or use the keyboard to move between them.'
      ],
      know: ['Four parts: What a Harness Is; Drive the Microsoft Copilot SDK; Decide What It Sees; Controls and the Choice.'],
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
      seconds: 110,
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
      seconds: 130,
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
      seconds: 110,
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
      seconds: 90,
      notes: [
        '"A tool is a schema the model fills in plus code the harness runs."',
        'For write, point from path and content to the prompt guidance, mutation queue, abort checks, and swappable operations.',
        '→ write is code pi ships. The next question is where else tools come from.'
      ],
      know: ['pi write.ts is 97 lines and contains no OS command. Its schema has path and content; its prompt contribution says to create or overwrite files and use write for new files or complete rewrites. The executor resolves the path, serializes writes per file, checks cancellation around directory creation, then writes through ops.'],
      sources: [SRC.pi]
    },
    'pi-tool-sources': {
      seconds: 90,
      notes: [
        '"A harness can bake a tool in, borrow a program it finds on the host, or run a tool you register. The model sees the same kind of contract for all three."',
        'Built in: write is harness code from schema to file. Found on host: find calls ensureTool to locate fd, then spawns it; the harness validates the call and reads the result, while fd and the operating system run the search.',
        'Registered by you: a pi extension calls registerTool with a definition, and its execute function is your code. That is the door for tools that call your own app or endpoint.',
        '→ Hold that third row. In Part 2 the SDK version wraps a release service method you already own.'
      ],
      know: ['find.ts can use custom glob ops instead of fd; the default calls ensureTool("fd") (L172) and spawn (L216). A host that needs end-to-end search control can supply custom glob operations. registerTool is declared on the extension API in packages/coding-agent/src/core/extensions/types.ts L1675-L1677. In the Copilot SDK, the equivalent is a custom tool passed to the session; the release-dashboard example calls releaseService.getReadiness.'],
      sources: [SRC.pi, SRC.sdk]
    },
    'pi-control': {
      seconds: 120,
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
      seconds: 130,
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
        '"Microsoft Copilot SDK gives an app a maintained harness loop and a way to connect methods the app already owns."',
        'Use the five-job map, choose an authentication route, then inspect one release-dashboard configuration and its answer. Runnable quickstarts are follow-up material, not live demos.',
        '→ First, line up the SDK surface with the five jobs.'
      ],
      know: ['The release dashboard, releaseService, user, selectedRelease, ui, and telemetry are illustrative objects, not a runnable app. Their sample values are illustrative as well. Example API snippets in this section follow SDK 2.0.0.'],
      sources: [SRC.sdk, SRC.npm]
    },
    'sdk-map': {
      seconds: 120,
      notes: [
        '"The SDK covers the same five jobs, while your app configures the loop instead of implementing it."',
        'The current mirror uses 2.0 names: client mode selects the experience; `systemMessage` and requests shape context; grouped `tools` register and select tools; `permissions.onRequest` decides mediated calls; `events.streaming` plus `session.on` exposes progress.',
        'The practical contract is the documented client and session API; service authorization and business outcomes remain in the application.',
        '→ Before connecting an app method, choose the authentication and billing route.'
      ],
      know: ['These API shapes match the current examples: `new CopilotClient({ mode: "coding-agent" })`; permissions under `permissions.onRequest`; tools grouped under `tools.definitions`, `availableTools`, or `excludedTools`; hook callbacks under `hooks.handlers` with `enableRepositoryHooks`; and streaming under `events`. `session.on` subscribes to the typed event names. Pi references come from the pinned source.'],
      sources: [SRC.sdk, SRC.npm, SRC.examples, SRC.pi]
    },
    'sdk-license': {
      seconds: 75,
      notes: [
        '"Authentication route changes the licensing and billing consequences for an embedded SDK session."',
        'Row one: each session runs with the signed-in user’s GitHub token, so that person needs Copilot, and usage counts against their plan and their org’s policy. You get per-person attribution for free.',
        'Row two: bring your own key. The SDK talks to your OpenAI, Azure, Foundry, or Anthropic deployment and bypasses Copilot authentication, so no Copilot license is involved; your model provider bills you.',
        'Either route still requires the service to check the authenticated app user. Copilot identity and app-service authorization remain separate.',
        '→ One configuration now connects a release question to that service method.'
      ],
      know: ['Authentication documentation distinguishes user-token sessions, OAuth, BYOK, and GitHub App server-to-server tokens. A shared server uses `mode: "empty"` and the session-level `github.token` for per-user identity; client-level `github.token` authenticates the runtime process instead. BYOK bypasses Copilot authentication and bills through the model provider. GitHub App tokens can bill an organization without a user subscription when its policy allows; this less common route stays in the notes. Plan-specific requirements and terms change; verify them against current docs before launch.'],
      sources: [SRC.authMethods, SRC.s2s, SRC.byok, SRC.tenancy]
    },
    'release-flow': {
      seconds: 140,
      notes: [
        '"One named tool lets the release engineer ask about readiness while the application keeps its authorization and approval rules."',
        'Point to three lines: defineTool supplies the contract, the handler passes the app-owned user to the service, and availableTools exposes only release_readiness. The empty client mode avoids ambient coding tools.',
        'allowReadinessOnly is an app callback: allow this custom tool, reject other request kinds, and route managed approval requests to a human. It does not authorize a user to a release.',
        'The answer card shows what the model adds: explain the failing status and propose a next step. The engineer checks the test and change links; a release owner still approves any deployment.',
        'The five runnable quickstarts let learners inspect lifecycle, context, tools, permission, and events afterward. No live execution is needed to explain this configuration.',
        '→ Now change the view to ask a different kind of question.'
      ],
      know: [
        'Integration sketch, not a runnable release-dashboard app or an observed answer. The service, authenticated user, UI, and telemetry are application-owned. Existing readiness sources can be Salesforce, ServiceNow, Jira, CI, or an internal API; deployment remains behind its existing approval. The runnable follow-ups are the five sdk-quickstart files, not this business integration.',
        'Follow-up — loop (01-loop.ts): CopilotClient requires mode. A shared-server embed uses mode: "empty" and session.github.token for per-user identity. createSession scopes the conversation; sendAndWait sends the request. Its default 60-second timeout ends the wait, not necessarily the work. Call session.abort() to cancel; disconnect the session and stop the client at their owning lifecycle boundary.',
        'Follow-up — context (02-context.ts): systemMessage supports append, customize, and replace. customize can append to custom_instructions while preserving the SDK’s safety sections; replace discards those defaults. In the dashboard, instruct the model to use release_readiness, name blockers, and report missing facts. The host supplies prompt and attachments; runtime history and compaction are separate from those instructions.',
        'There is no per-request transform hook like pi’s transformContext. infiniteSessions is on by default. backgroundCompactionThreshold starts background compaction; bufferExhaustionThreshold waits for compaction; enabled: false disables it. Observe session.compaction_start and session.compaction_complete. Context guidance steers behavior; it grants no tool authority.',
        'Follow-up — tools (03-tools.ts): defineTool joins schema and handler. tools.definitions registers objects; availableTools selects names; excludedTools removes names. The displayed schema requires a string releaseId and rejects extra properties. releaseService.getReadiness(user, releaseId) authorizes the app-supplied user and returns bounded facts, including test and change links. Never accept user identity from model arguments.',
        'Follow-up — control (04-control.ts): implement allowReadinessOnly by rejecting managedApprovalRequired, approving only a custom-tool request named release_readiness, and rejecting all other requests with feedback. Handlers return { kind: "approve-once" } or { kind: "reject", feedback: "..." }. Both an authorized and unauthorized engineer can pass that tool-name check; the service independently grants or refuses access to the requested release. Keep refusal visible. Neither check approves deployment.',
        'PermissionRequest kinds include read, write, shell, custom-tool, url, mcp, memory, and hook. onPreToolUse is under hooks.handlers; hooks.enableRepositoryHooks enables repository hooks. Reject unknown kinds instead of granting new capabilities by default. FanHub’s repository deny held in a precedence probe even when the SDK hook returned allow; this is distinct from OS isolation.',
        'Follow-up — evidence (05-evidence.ts): enable events: { streaming: true } and subscribe before sending. session.on("assistant.message_delta", ...) updates the UI; tool.execution_start and tool.execution_complete expose execution. Record bounded sessionId, toolCallId, and success metadata. The service audit records user authorization and readiness. Correlation with an app request ID is explicit application wiring.',
        'Tool execution success can coexist with ready: false. Treat model text as untrusted UI content; omit tokens, raw arguments, and business records from telemetry; unsubscribe when the view is disposed. Verify an allowed request, unauthorized refusal, query failure, and unfavorable readiness independently before exposing an action.',
        'Observed quickstarts on SDK 2.0.0, 2026-11-18: 01 returned an answer; 02 cited package.json for Node 20+ and labeled code/config steps undocumented; 03 returned api-team and reported no command-execution tool for git log; 04 recovered from a shell rejection using 16 approved reads across 13 files; 05 streamed deltas and three tool start/done pairs. These observations validate the small samples, not the release-dashboard sketch. Typecheck and 20 unit tests passed.'
      ],
      sources: [SRC.sdk, SRC.npm, SRC.examples, SRC.tenancy, SRC.auth, SRC.hooks]
    },
    'part-3': {
      seconds: 20,
      notes: [
        '"Changing what the agent sees can make its report independent of the people who already know the implementation."',
        'One sample checks API behavior from its contract. The other follows setup docs with source hidden. Each slide shows the configuration and recorded result; both apps are available for follow-up.',
        '→ Start with contract-only testing.'
      ],
      know: ['Both examples use the same visibility-policy helper with different readable, hidden, writable, and tool rules. The policy is an application control, not a sandbox.'],
      sources: [SRC.blind, SRC.fresh, SRC.visibility]
    },
    'blind-result': {
      seconds: 140,
      notes: [
        '"The host gives this tester the API contract, hides the implementation, and verifies the generated tests itself."',
        'The upper code excerpt selects the host policy: hide source and bug hints, restrict test writes, and allow only the selected shell and URL requests. The lower excerpt installs that policy at the SDK’s two checkpoints.',
        'onPreToolUse inspects raw tool arguments; permissions.onRequest sees parsed requests. A prompt alone would not provide these controls.',
        'The host rerun produced twelve passing and two failing tests: a valid character POST returned 500, and seasonId filtering was ignored.',
        'A separate read-only referee maps failures to the bug list, but its mapping is a lead. The API owner checks the evidence and decides the change. These policy callbacks provide no OS isolation.',
        '→ The same helper can give a setup checker a docs-only view.'
      ],
      know: [
        'Follow-up: from examples/, run npm run blind-tests in a disposable environment. The host prepares a clean FanHub checkout and server. api_contract returns the sanitized SETUP.md contract; implementation, docs, database, and BUGS.md remain hidden from the tester. Tests are written only into node/backend/__tests__/blind. Inspect tests.tap, blind-report.md, and events.jsonl under the gitignored .runs/ directory.',
        'The displayed blocks are selected options from two separate objects, not a complete runnable program. The upper block belongs to createVisibilityPolicy; the lower block belongs to client.createSession. Full source includes repoRoot, hiddenRoots, customTools, feedback, logging, systemMessage, workingDirectory, and lifecycle. The runtime mode is coding-agent. Citations in app.ts: policy L51-64; session tools L71; instructions L72-86; permissions and hooks L87-88; request L103; host rerun L122-129; referee L139-144.',
        'Follow-up — search and writes: onPreToolUse uses sweepsHidden to reject broad search scopes that include hidden folders. A permitted output path alone is insufficient: newFileContents is checked against BLIND_TEXT_DENY for code that would read hidden files or invoke forbidden APIs. This text filter is an educational policy, not proof against adversarial code.',
        'Follow-up — shell and URL: commandHeads splits chained commands outside quoted text, normalizes .cmd and .exe names, and checks each program against BLIND_SHELL. A chained npm or tee command is denied even after an allowed cd. urls: isLoopbackUrl approves mediated URL requests only for loopback hosts; an approved process’s own network reach is outside this check.',
        'Observed run: 2026-11-18, @microsoft/copilot-sdk 2.0.0, model auto, Node 26.13.0 on Windows, FanHub 0ea9e78. The tester generated 5 files and 14 tests; the host rerun recorded 12 pass / 2 fail. The tester used 10 tool calls, with 11 policy approvals and 2 denials. Denials were a hidden readme view and a chained git status command.',
        'The referee mapped the POST 500 to BUGS.md #6, Mixed HTTP Status Codes for Create Operations. That entry describes 200 instead of 201, not a 500; an earlier SDK run cited #19, which also does not document this 500. The rerun is the evidence and the mapping is a lead. For the other failure, SETUP.md documents seasonId while the route reads season_id; the referee found no matching API bug entry.',
        'Follow-up — four log layers: host-policy records decisions and rules; runtime tool.complete records execution; repo-hook hook.end records hook outcome; the host rerun independently records passing and failing test counts. A successful hook is not a successful tool, and tool success is not a correct business result.',
        'In the observed events.jsonl, the host rerun record carried layer: "host", event: "rerun", passing: 12, failing: 2. The deny rule was command-not-allowed:git,git. run-log.ts L15-21 attaches tool events; L22-27 attaches hook events. The writer omits raw arguments, command output, and file contents. Session-level workingDirectory preserved repository-hook discovery in this run.',
        'The 20 unit tests cover repository hooks and visibility policy, including searches, writes, chained shell commands, Windows shims, and URL requests. They validate their documented checks, not an OS sandbox or universal independence guarantee.'
      ],
      sources: [SRC.blind, SRC.visibility, SRC.npm, SRC.examples, SRC.runLog, SRC.overlay]
    },
    'fresh-eyes': {
      seconds: 90,
      notes: [
        '"Fresh-eyes gives a setup checker the documentation and asks it to record every mismatch before finding a workaround."',
        'The configuration swaps in isSourceCode and isDocLike, permits only .env writes, and registers report_friction. The SDK callbacks use the same policy helper as blind-tests.',
        'In the recorded run, the docs said Node 18+, but Node 26 hit a native-build failure. The agent recovered with a cached Node 20 and reached GET /api/characters with a 200 response.',
        'The report has six friction rows. The docs owner separates genuine setup gaps from host-policy denials before changing the docs.',
        '→ Both examples make one boundary worth naming explicitly: requesting a tool and containing its execution are different jobs.'
      ],
      know: [
        'Follow-up: from examples/, run npm run fresh-eyes in a disposable environment and inspect friction-report.md and events.jsonl under .runs/. The upper code block shows selected createVisibilityPolicy options; the lower block shows selected createSession options. Full source includes hiddenRoots, shell rules, feedback, workingDirectory, instructions, and lifecycle.',
        'app.ts L40-59 defines report_friction. Its schema requires step, docSays, reality, doc, and severity; the handler stores the finding and emits a redacted friction event. The system instruction requires reporting before working around a mismatch. Source stays hidden, docs and configuration are readable according to isDocLike, and file writes are limited to .env. Allowed shell processes retain their OS reach.',
        'Observed 2026-11-18 on @microsoft/copilot-sdk 2.0.0, Node 26.13.0, Windows, FanHub 0ea9e78: 29 tool calls, 24 policy approvals, 2 denials, and 6 friction rows (2 blocker, 2 confusing, 2 minor). better-sqlite3 had no prebuilt binary for this Node version, and no C++ toolchain was found. The agent recovered with cached Node 20 through npm exec --offline --package=node@20 and reached the API.',
        'Docs findings included the Node 18+ statement without native-build prerequisites and disagreement between node/README.md and node/SETUP.md about prerequisites and backend port. Host-boundary rows included a nodejs.org URL denial and a Get-Command shell denial. The six rows are report entries, not six verified documentation bugs.',
        'The two apps share createVisibilityPolicy, loopback URL checks, bounded execution, and redacted event logging. A new environment may produce different friction; inspect its evidence rather than expecting this run’s count.'
      ],
      sources: [SRC.fresh, SRC.visibility, SRC.examples, SRC.npm]
    },
    'host-boundary': {
      seconds: 120,
      notes: [
        '"In-process hosting is not isolation: the SDK permission callback cannot stop code inside an approved process."',
        'Read the three rows as different layers. The app can reject a mediated tool request. Once approved, running code can perform internal reads, network calls, or child-process work without another permission callback.',
        'An OS-enforced sandbox restricts that process below the model. A permission allowlist and in-process runtime placement do not supply that enforcement.',
        'SDK 2.0 types mark permissions.sandbox experimental, and this talk did not test it. The sample apps use ordinary Node processes and policy callbacks.',
        'For managed Foundry Agent Service, Microsoft runs the agent loop and sandbox; a self-hosted SDK app runs the loop in its own process. Those are different hosting boundaries.',
        '→ Now compare the maintained harness with the boundaries your team needs.'
      ],
      know: ['The SDK 2.0 npm type definitions mark `permissions.sandbox` experimental. Sandbox behavior was not exercised; runtime-version support is required. The blind tester is policy-based and runs ordinary Node processes. Local OS enforcement in MXC uses ProcessContainer on Windows, bubblewrap on Linux, and Seatbelt on macOS; this backend detail is notes-only and is not evidence that the SDK sandbox worked here. SDK process placement comes from the in-process runtime docs.'],
      sources: [SRC.blind, SRC.visibility, SRC.runtime, SRC.sandbox, SRC.mxc]
    },
    'part-4': {
      seconds: 20,
      notes: [
        '"Part 4 weighs the evidence for using the shared harness against the controls your team still owns."',
        'We begin with Microsoft’s attributed product claim, map owners, make runs reproducible, and finish with GitHub’s study and a practical fit scorecard.',
        '→ First, separate the named product evidence from the hosting choices.'
      ],
      know: ['The scorecard is a decision aid, not measured evidence. Microsoft and GitHub sources are vendor-authored and are attributed on their respective slides.'],
      sources: [SRC.msHarness, SRC.hooks, SRC.policies]
    },
    'surrounding-controls': {
      seconds: 90,
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
      seconds: 90,
      notes: [
        '"Before you share a run, make its inputs, limits, policy, and identity reproducible."',
        'The examples pin a FanHub commit, set a tool budget and timeout, abort and disconnect at the boundary, and unit-test visibility policy against actual request shapes.',
        'For your own spike, record the SDK version and runtime, authentication route, permitted model, and named report owner, the same facts each run report here opens with.',
        '→ A harness comparison also needs a controlled test; look at GitHub’s same-model study.'
      ],
      know: ['Examples use @microsoft/copilot-sdk 2.0.0. The blind app sets TOOL_BUDGET (default 120) and TIMEOUT_MS (default 20 minutes), aborts when the budget is reached, and disconnects sessions. Each report header records the FanHub commit, timestamp, outcome, tool calls, and policy counts. Unit tests check policy decisions; the live runs check the app.'],
      sources: [SRC.sdk, SRC.npm, SRC.hooks, SRC.examples]
    },
    'one-harness': {
      seconds: 120,
      notes: [
        '"Microsoft says it has “adopted company-wide” the harness and is “standardizing all of our Copilot experiences” on it."',
        'The Official Microsoft Blog names Copilot Code, Copilot Studio, the GitHub Copilot app, the CLI, and VS Code. This is vendor evidence, not proof that every Microsoft experience uses the harness.',
        'The hosting distinction matters: a self-hosted SDK runs the loop in the app process. Foundry Agent Service is a separate managed offering; Microsoft says it runs the agent loop and sandbox there, and the feature is public preview.',
        'Copilot Studio lists three harness choices; Microsoft Copilot is one of them. The docs keep the standard harness supported, so the slide does not call it a forced default.',
        '→ The shared harness still operates inside boundaries owned by different people.'
      ],
      know: ['The Official Microsoft Blog (2026-10-28) is vendor-authored and says the harness is one “we’ve adopted company-wide” and Microsoft is “standardizing all of our Copilot experiences” on it. It names only Copilot Code, Copilot Studio, the GitHub Copilot app, the CLI, VS Code, and “more”; the slide lists only the five explicitly named experiences. Foundry’s separate blog supports managed loop and sandbox only for Foundry Agent Service; it was public preview at verification. Copilot Studio’s documentation describes three harnesses, with Microsoft Copilot as one option and the standard harness continuing to be supported. Copilot Managed Runtime and @microsoft/cmr-apps are a different product/SDK and do not support this claim.'],
      sources: [SRC.msHarness, SRC.foundryHarness, SRC.studioHarness, SRC.runtime, SRC.sdk]
    },
    'harness-testing': {
      seconds: 100,
      notes: [
        '"GitHub compared its harness with vendors’ harnesses while holding the model and task constant."',
        'Its report says resolution was on par within run-to-run variance and token use was lower in most pairings.',
        'The exception belongs beside the result: GPT-5.4 and GPT-5.5 on SWE-bench Verified used 7% and 4% more tokens, respectively. GitHub authored this comparison; it is one study, not a universal ranking.',
        '→ Use the scorecard to test whether those maintained capabilities fit your actual boundary.'
      ],
      know: ['GitHub’s published methodology compares Copilot CLI with Claude Code on Sonnet 4.6 and Opus 4.7, and with Codex CLI on GPT-5.4 and GPT-5.5, using the same model per pairing and fixed settings. The report characterizes resolution differences as within run-to-run variance and token use as lower in most pairings. Exceptions on SWE-bench Verified: GPT-5.4 used 7% more tokens and GPT-5.5 used 4% more.'],
      sources: [SRC.harnessEval]
    },
    'choose-harness': {
      seconds: 180,
      notes: [
        '"The decision is whether the SDK’s maintained loop fits better than the work of owning your own."',
        'Score six questions with your team: loop maintenance, second-user isolation, execution boundary, model reach, inspectable evidence, and what control you would give up.',
        'This scorecard reports no measured repository outcomes. It is a structured way to expose assumptions and name an owner for each unanswered item.',
        'Then run the spike: wrap one existing read-only method, name its user check and execution boundary, test an allowed and a refused request, and inspect the UI, service audit, and telemetry.',
        'Choose Microsoft Copilot SDK when the spike confirms the needed boundary and evidence. Keep or build a team-owned harness when isolation, execution placement, or control requirements outweigh the cost of maintaining it.',
        '→ Choose pi for the customization, the SDK for the maintained Copilot harness, or test another fit against your requirements.'
      ],
      know: ['The six rows are qualitative decision prompts, not scored results from this repository. Evidence sources: Microsoft’s blog supports maintained harness and model-reach claims; SDK setup docs describe multi-user hosting and in-process execution; the SDK type definitions mark session sandbox experimental. A proposed spike must report its own result, and a negative result can favor a team-owned harness.'],
      sources: [SRC.msHarness, SRC.sdk, SRC.tenancy, SRC.runtime, SRC.sandbox]
    },
    'before-after': {
      seconds: 45,
      notes: [
        '"Pi and Microsoft Copilot SDK can both live inside your application. The choice is which harness you want to shape and maintain."',
        'Pi’s TypeScript SDK embeds in Node.js or Bun. It is minimal, MIT-licensed, and deliberately extensible through custom tools, resources, session managers, and extensions. Choose it when that customization is a product requirement and the team wants that control.',
        'Microsoft Copilot SDK 2.0 loads its native runtime in the application process by default. A separate CLI/runtime process is not required for the SDK connection; explicit subprocess transports remain available when process separation matters. That removes a runtime process boundary, not the need to check deployment support or handle crashes.',
        'For a multi-user app, the SDK documents session-scoped identity, state, and tools. The application still routes requests, authorizes users, and chooses isolation. SDK primitives help implement that design; they do not automatically make an app enterprise-ready.',
        'In-process is not isolation. The SDK explicitly warns that its native runtime is not sandboxed and has no crash isolation. A team needing those boundaries configures them at the process or platform layer; pi’s embedding is also not a sandbox.',
        'The fit question is specific: does the team want a ready-made Copilot harness with app-owned integration, or a more customizable open harness with more of its behavior under team control? Either can fit an enterprise; test identity, execution, audit, and operating requirements rather than sorting by company size.',
        '→ Take one existing method and test the fit against the scorecard.'
      ],
      know: [
        'This is a qualitative harness comparison, not a benchmark, maturity ranking, or claim that pi cannot serve enterprise applications. Both products offer in-process TypeScript integration, but their surrounding ownership and product surfaces differ.',
        'Pi docs at pinned commit f9daca3 describe its TypeScript SDK as embedding Pi in a Node.js or Bun process. Its SDK factory can use explicit modelRuntime, model, thinkingLevel, scopedModels, settingsManager, sessionManager, resourceLoader, tools, noTools, excludeTools, and customTools. Its README calls Pi minimal and extensible, notes that sub-agents and plan mode are intentionally omitted by default, and describes extensions, skills, prompt templates, themes, and packages. MIT license is cited from the pinned repository.',
        'The Microsoft Copilot SDK v2 in-process runtime docs say the native runtime is loaded into the host process by default; the SDK connection needs no child runtime process, TCP port, or connection token. Tool implementations can still launch subprocesses. Explicit stdio and TCP subprocess transports remain available. A compatible native runtime bundle is required for each target OS, architecture, and Linux C library; unsupported targets fail rather than falling back automatically.',
        'The same runtime docs warn that in-process hosting is not a sandbox and offers no crash isolation from the runtime. They recommend testing startup, model turns, and shutdown on every deployment platform. If a separate process is needed for crash isolation or per-client process configuration, select a spawned connection explicitly.',
        'Microsoft multi-tenancy docs describe per-session state, authentication, and explicit tool registration while assigning request routing and authorization to the app. mode: "empty" is the safe baseline for shared servers because the app must explicitly choose available tools and paths; do not use coding-agent mode for a shared server. Session-scoped primitives are not a substitute for application authorization or a deliberate isolation design.',
        'The snippets are orientation only: Pi’s createAgentSession and SDK CopilotClient mode: "empty". Pi’s factory can be configured with a custom session manager/resource loader/tool set; the SDK call selects a client mode and loads its default in-process runtime. The multi-user session and per-user token are omitted from this two-line contrast and covered by the SDK session/API slides.',
        'No blanket enterprise split: a team can choose pi for control and customization or the SDK for a maintained Copilot harness, then evaluate identity, deployment, execution boundaries, audit, support, and policy against its own requirements.'
      ],
      sources: [SRC.pi, SRC.piSdk, SRC.sdk, SRC.runtime, SRC.tenancy]
    },
    today: {
      seconds: 115,
      notes: [
        '"Today, score the SDK against a team-owned harness using the six fit questions."',
        '"This week, spike one existing read-only method and inspect one allowed request and one refusal."',
        '"This month, review the evidence with the service and platform owners, then decide whether to extend or stop."',
        'Those are proposed next steps, not measured outcomes. Record the user check, execution boundary, and evidence owner before the spike.',
        '→ Keep the source links with the notes, and bring one method back to your team.'
      ],
      know: ['The one-method spike is a proposal, not a measured result. The examples show the shape of the evidence: all five quickstarts and both apps ran live on SDK 2.0.0 on 2026-11-18. App-level success criteria are visible allowed/refused outcomes, service authorization, process boundary, and inspectable telemetry.'],
      sources: [SRC.examples, SRC.sdk, SRC.runtime]
    },
    references: {
      seconds: 25,
      notes: [
        '"These links let you check the pinned pi source, current SDK, hosting boundaries, product claims, and the published harness study."',
        'The notes above identify which evidence supports each specific claim.'
      ],
      know: ['Every example uses @microsoft/copilot-sdk 2.0.0. The package was previously published as @github/copilot-sdk; the 2.0 release notes cover the rename and migration.'],
      sources: [SRC.pi, SRC.piSdk, SRC.sdk, SRC.npm, SRC.examples, SRC.sdk2Article, SRC.auth, SRC.msHarness, SRC.foundryHarness, SRC.studioHarness, SRC.harnessEval, SRC.runtime, SRC.sandbox, SRC.hooks]
    },
    thanks: {
      seconds: 20,
      notes: [
        '"Choose Microsoft Copilot SDK when it fits your app boundary; otherwise name what makes a team-owned harness worth maintaining."',
        'Ask for one method, one user check, one execution boundary, and the owner of the evidence.',
        '→ Thank the audience and leave the notes open for the source links and handout.'
      ],
      know: ['The transfer artifact is a harness choice and a proposed one-method spike with observable acceptance evidence.'],
      sources: [SRC.sdk, SRC.runtime, SRC.examples]
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'harness-fundamentals',
      title: 'Harness Fundamentals',
      short: 'Add an Agent Without Owning Another Harness',
      category: 'practitioner tech talk',
      source: 'tech-talks/harness-fundamentals/README.md',
      question: 'How do I add an agent to my app without owning another harness?',
      thesis: 'Use Microsoft Copilot SDK to add an agent without maintaining another harness when its loop and execution boundary fit; the app retains identity, authorization, business approval, UI, and evidence, while a team-owned harness remains a valid choice when its control boundary matters more.'
    },
    slides
  };
})();
