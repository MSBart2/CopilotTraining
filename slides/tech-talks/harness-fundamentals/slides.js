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
    S('core-question', 0, 'How do I get inside the agent loop and change how it behaves?', {
      pill: 'Core Question',
      subtitle: 'A harness runs the model, tools, results, and next turn; the host chooses which jobs to own.',
      highlight: 'Expose an existing method through a narrow tool, and keep user authority and review in the app.',
      routing: ['Loop', 'Context', 'Tools', 'Control', 'Evidence'], routingLabel: 'Five jobs to choose from',
      roles: [
        { icon: '⌨️', title: 'Developer', description: 'Bring the agent into a tool or workflow you already use.' },
        { icon: '🧰', title: 'Platform engineer', description: 'Decide which checks apply across hosts and sessions.' },
        { icon: '🏗️', title: 'Architect', description: 'Keep app identity, service authority, and approval explicit.' }
      ],
      stats: [
        { title: 'One readable loop', description: 'pi exposes the mechanism in source.' },
        { title: 'One app method', description: 'A narrow tool can reuse existing capability.' },
        { title: 'One named owner', description: 'Someone reads the evidence and decides.' }
      ]
    }),
    S('contents', 0, 'Four parts, one decision', {
      pill: 'Route · Four parts',
      sections: [
        { icon: '🔁', title: 'What a Harness Is', subtitle: 'Read pi as source', blurb: 'Name five jobs and see how a small loop handles each.', slide: 4 },
        { icon: '🧰', title: "Drive GitHub's Harness", subtitle: 'Use an app you own', blurb: 'Connect a release question to an existing service method.', slide: 11 },
        { icon: '🔍', title: 'Decide What It Sees', subtitle: 'Test a deliberate view', blurb: 'Hide the implementation, rerun tests, and inspect evidence.', slide: 19 },
        { icon: '🤝', title: 'Own It', subtitle: 'Share it with a named owner', blurb: 'Check the surrounding controls and transfer the pattern.', slide: 24 }
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
      terminal: { context: 'Read-only source · pi at f9daca3 · MIT', detail: 'The five jobs transfer; the implementation is one example' }
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
      codeSource: 'pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L188-L337 (trimmed)',
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
      codeSource: 'pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L398-L404',
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
      subtitle: 'pi’s write tool owns file mutation; find can hand search to an external process.',
      columns: ['Piece', 'write tool', 'What it contributes'],
      rows: [
        { label: 'Schema', detail: 'path and content', proof: 'The model fills a validated contract.', z: 'local' },
        { label: 'Context', detail: '“Create or overwrite files”', proof: 'The snippet and guideline teach when to use it.', z: 'remote' },
        { label: 'Execution', detail: 'Queue, abort checks, mkdir, writeFile', proof: 'Swappable ops decide where the mutation lands.', z: 'green' },
        { label: 'Boundary', detail: 'find → ensureTool("fd") → spawn', proof: 'The harness sees the call and result; the OS runs fd.', z: 'orange' }
      ],
      codeSource: 'pi · MIT · earendil-works/pi@f9daca3 · packages/coding-agent/src/core/tools/write.ts#L11-L19 (trimmed)',
      code: [
        'const writeSchema = Type.Object({',
        '  path: Type.String({ description: "Path to the file to write (relative or absolute)" }),',
        '  content: Type.String({ description: "Content to write to the file" }),',
        '});'
      ],
      footnote: 'A custom glob operation keeps the search inside harness code; the default delegates to fd.'
    }),
    S('pi-control', 1, 'A block becomes a reason the model can act on', {
      scene: 'flow', pill: 'What a Harness Is · Control',
      subtitle: 'The loop owns the hook point; the product installs its policy there.',
      nodes: [
        { title: 'Validated call', detail: 'beforeToolCall receives the tool and validated arguments.', z: 'local' },
        { title: 'Product policy', detail: 'Return block and a reason, or let the call continue.', z: 'orange' },
        { title: 'Tool result', detail: 'The model reads the reason and can choose another route.', z: 'green' }
      ],
      codeSource: 'pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L738-L765 (trimmed)',
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
      codeSource: 'pi · MIT · earendil-works/pi@f9daca3 · packages/agent/src/agent-loop.ts#L929-L937 (trimmed)',
      code: [
        'await emit({ type: "tool_execution_end",',
        '  toolCallId: finalized.toolCall.id,',
        '  toolName: finalized.toolCall.name,',
        '  result: finalized.result, isError: finalized.isError });'
      ],
      footer: 'The loop emits agent, turn, message, tool, and end events.'
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
    S('sdk-map', 2, 'The SDK gives the host a place in all five jobs', {
      scene: 'job-rows', pill: "Drive GitHub's Harness · Map",
      subtitle: 'The SDK surface is what the host configures and observes; runtime internals stay out of scope.',
      rows: [
        { label: 'Loop', detail: 'Copilot runtime; app calls createSession, sendAndWait, abort.', proof: 'Run and dispose a scoped session.', z: 'local' },
        { label: 'Context', detail: 'systemMessage modes, prompt, and requested model.', proof: 'Describe a role and source of facts.', z: 'remote' },
        { label: 'Tools', detail: 'defineTool registers a handler; availableTools selects names.', proof: 'Expose a narrow app operation.', z: 'github' },
        { label: 'Control', detail: 'onPermissionRequest, SDK hooks, and opted-in repository hooks.', proof: 'Bound requests; keep service authorization.', z: 'orange' },
        { label: 'Evidence', detail: 'session.on events, handler records, and service audit.', proof: 'Join progress to business outcomes.', z: 'green' }
      ],
      footnote: 'Documented SDK architecture: application → SDK → JSON-RPC → Copilot runtime.'
    }),
    S('sdk-loop', 2, 'The dashboard starts a scoped session and shows its answer', {
      scene: 'flow', pill: "Drive GitHub's Harness · Loop",
      subtitle: 'Release-dashboard integration sketch · The app owns the trigger and lifecycle.',
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
    S('sdk-context', 2, 'Customize the role without replacing every prompt section', {
      scene: 'detail-rows', pill: "Drive GitHub's Harness · Context",
      subtitle: 'Release-dashboard integration sketch · Name the source of facts and recovery path.',
      columns: ['Mode', 'Model gets', 'Boundary'],
      rows: [
        { label: 'append', detail: 'GitHub prompt plus host guidance', proof: 'Add a role or task instruction.', z: 'local' },
        { label: 'customize', detail: 'GitHub prompt with named sections edited', proof: 'Append custom_instructions while retaining safety sections.', z: 'purple' },
        { label: 'replace', detail: 'Only the host’s text', proof: 'The SDK prompt guardrails are removed; use only with that understood.', z: 'orange' }
      ],
      codeSource: 'Release-dashboard integration sketch · SDK session options',
      code: [
        'systemMessage: { mode: "customize",',
        '  sections: { custom_instructions: { action: "append", content:',
        '    "Use release_readiness; name blockers; report missing facts." } } }'
      ],
      footnote: 'A prompt steers behavior; code-level permissions and service checks enforce the boundary.'
    }),
    S('sdk-tools', 2, 'A named tool can call an existing service method', {
      scene: 'flow', pill: "Drive GitHub's Harness · Tools",
      subtitle: 'Release-dashboard integration sketch · Register one method, not arbitrary dispatch.',
      nodes: [
        { title: 'Tool contract', detail: 'releaseId: string; required; no extra fields.', z: 'local' },
        { title: 'App handler', detail: 'defineTool calls releaseService.getReadiness(user, releaseId).', z: 'purple' },
        { title: 'Session allowlist', detail: 'availableTools: ["release_readiness"].', z: 'green' }
      ],
      codeSource: 'Release-dashboard integration sketch · application handler',
      code: [
        'const readinessTool = defineTool("release_readiness", {',
        '  handler: async ({ releaseId }) =>',
        '    releaseService.getReadiness(user, releaseId),',
        '});'
      ],
      footer: 'The authenticated user comes from the app session, never from model-supplied arguments.'
    }),
    S('sdk-control', 2, 'Tool permission is separate from user authorization', {
      scene: 'showdown', pill: "Drive GitHub's Harness · Control",
      subtitle: 'Release-dashboard integration sketch · Session permission and service authority stay separate.',
      leftLabel: 'SDK permission decision',
      rightLabel: 'App service decision',
      pairs: [
        { left: { label: 'Request: release_readiness', note: 'One named custom tool' }, right: { label: 'Authorize user + releaseId', note: 'Service checks the authenticated app user', z: 'green' } },
        { left: { label: 'managedApprovalRequired?', note: 'Reject unless a human path exists' }, right: { label: 'Deployment approval', note: 'A separate person approves the exact release and target', z: 'orange' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Session permission is not business approval' },
      outcomeRight: { icon: '✓', label: 'Service authority remains in force' },
      footnote: 'A schema checks input shape; it does not authorize an identifier. Service failures stay visible.'
    }),
    S('sdk-evidence', 2, 'Events show execution; the service records the business result', {
      scene: 'flow', pill: "Drive GitHub's Harness · Evidence",
      subtitle: 'Release-dashboard integration sketch · Stream progress and record bounded metadata.',
      nodes: [
        { title: 'session.on', detail: 'assistant.message_delta and tool.execution_start.', z: 'remote' },
        { title: 'UI + telemetry', detail: 'Render progress; record sessionId, toolCallId, success.', z: 'purple' },
        { title: 'Service audit', detail: 'Record authorization and readiness result.', z: 'green' }
      ],
      codeSource: 'Release-dashboard integration sketch · application event handlers',
      code: [
        'session.on("assistant.message_delta", e => ui.appendText(e.data.deltaContent));',
        'session.on("tool.execution_complete", e => telemetry.record(',
        '  "tool.complete", { sessionId, toolCallId, success: e.data.success }));'
      ],
      footer: 'Execution success can coexist with ready: false; app correlation is explicit wiring.'
    }),
    S('release-flow', 2, 'A completed query can report a release that is not ready', {
      scene: 'release-flow', pill: "Drive GitHub's Harness · Example",
      subtitle: 'Illustrative values show where the method, UI, and business approval sit.',
      nodes: [
        { title: 'Engineer', detail: '“What blocks v2.4?”', z: 'local' },
        { title: 'Copilot request', detail: 'release_readiness({ releaseId: "v2.4" })', z: 'purple' },
        { title: 'Existing service', detail: '{ ready: false, blockers: ["Integration tests failed"] }', z: 'remote' },
        { title: 'Dashboard + owner', detail: 'Explain blocker; human decides next action.', z: 'orange' }
      ],
      footer: 'Illustrative request and result, not a recorded release-dashboard run. Tool success ≠ release readiness.'
    }),
    S('part-3', 3, 'Decide What It Sees', {
      scene: 'opener',
      subtitle: 'The same host can make a useful check independent by changing its agent’s view.',
      cards: [
        { icon: '🔍', title: 'Set the view', blurb: 'Use two checkpoints for different inputs' },
        { icon: '🧪', title: 'Run the test', blurb: 'Host reruns the suite as evidence' },
        { icon: '🧾', title: 'Name the owner', blurb: 'Referee maps it; API owner decides' }
      ],
      terminal: { context: 'Blind test writer · FanHub · observed 2026-10-26', detail: 'Contract visible · implementation hidden' }
    }),
    S('visibility-policy', 3, 'One policy checks both raw calls and parsed requests', {
      scene: 'detail-rows', pill: 'Decide What It Sees · Policy',
      subtitle: 'onPreToolUse sees raw arguments; onPermissionRequest sees a parsed permission request.',
      columns: ['Checkpoint', 'Input it sees', 'Example host check'],
      rows: [
        { label: 'onPreToolUse', detail: 'Raw tool name and arguments', proof: 'Reject a grep scope that sweeps a hidden folder.', z: 'remote' },
        { label: 'onPermissionRequest', detail: 'Parsed read, write, shell, or custom-tool request', proof: 'Check hidden paths, write contents, and command segments.', z: 'purple' },
        { label: 'Write-content test', detail: 'A test file tries readFileSync("../../src/…")', proof: 'Host denies code that would read hidden files when run.', z: 'orange' },
        { label: 'Compound shell test', detail: 'cd node/backend; npm start | tee log', proof: 'Split outside quoted text; test each executable.', z: 'green' }
      ],
      footnote: 'Both additional checks are tested; the same 190-line policy is configured differently for each app.'
    }),
    S('blind-result', 3, 'The host reran 12 tests; a referee classified two failures', {
      scene: 'terminal', pill: 'Decide What It Sees · Observed result', termTitle: 'FanHub · 2026-10-26',
      subtitle: 'TAP status is separate from the referee’s domain finding.',
      transcript: [
        { type: 'prompt', text: 'Host reruns blind suite' },
        { type: 'response', lines: ['TAP: 10 passing', 'TAP: 2 failing'] },
        { type: 'divider' },
        { type: 'outcome', text: 'POST /api/characters → 500 · referee maps BUGS.md #19' },
        { type: 'outcome', text: 'seasonId filter ignored · referee labels mismatch undocumented' }
      ],
      footnote: 'Observed run. Agent wrote tests from the contract; the host reran them; a separate read-only referee read source and BUGS.md.'
    }),
    S('host-boundary', 3, 'A host controls tool calls, not everything a process can do', {
      scene: 'detail-rows', pill: 'Decide What It Sees · Boundary',
      subtitle: 'The API owner, not the harness, decides whether the contract or implementation changes.',
      rows: [
        { label: 'Started process', detail: 'A test process has the OS account’s access; a container sets a harder boundary.', proof: 'Owner: OS / platform', z: 'orange' },
        { label: 'Outside tool calls', detail: 'Other processes, users, and network access sit beyond tool mediation.', proof: 'Owner: platform', z: 'remote' },
        { label: 'Result correctness', detail: 'A failing test shows disagreement; tests and review inform the decision.', proof: 'Owner: API team', z: 'green' }
      ],
      footnote: 'Same boundary as pi find → fd: the harness sees the request and result; the operating system runs the process.'
    }),
    S('run-evidence', 3, 'Join decisions and execution records without confusing them', {
      scene: 'evidence-rows', pill: 'Decide What It Sees · Evidence',
      subtitle: 'The example log uses one sessionId across repository hooks, host policy, runtime, and app.',
      rows: [
        { label: 'Repository hook', detail: 'hook.end · preToolUse · success: true', proof: 'A hook ran; this is not the tool’s result.', z: 'remote' },
        { label: 'Host policy', detail: 'kind: view · path: secrets/.env · decision: deny', proof: 'A decision record explains why a request was refused.', z: 'orange' },
        { label: 'Runtime', detail: 'tool.complete · tool: view · success: true', proof: 'A tool execution result is distinct from a policy decision.', z: 'green' },
        { label: 'App summary', detail: 'session-end · toolCalls · allow · deny', proof: 'Counts summarize the session; omit contents and raw output.', z: 'purple' }
      ],
      footnote: 'Illustrative, redacted event shapes. Observed repository hooks ran 19 preToolUse times in fresh-eyes and 12 in blind tests; neither run reached for the database.'
    }),
    S('part-4', 4, 'Own It', {
      scene: 'opener',
      subtitle: 'Account for controls other people own, then give each report a reader and decision owner.',
      cards: [
        { icon: '🏢', title: 'Surrounding controls', blurb: 'Identity, model, hooks, billing, process' },
        { icon: '✅', title: 'Pre-flight', blurb: 'Pin, bound, test, and verify' },
        { icon: '👤', title: 'Named owner', blurb: 'Someone accepts or routes every report' }
      ],
      terminal: { context: 'A shared harness has an owner', detail: 'Which job do you take over?' }
    }),
    S('surrounding-controls', 4, 'Different owners control different boundaries', {
      scene: 'detail-rows', pill: 'Own It · Surrounding Controls',
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
    S('preflight', 4, 'Before sharing, pin it, bound it, test it, and name an owner', {
      scene: 'scorecard', pill: 'Own It · Pre-flight',
      subtitle: 'A useful pre-flight turns the host’s claims into checks another person can repeat.',
      cards: [
        { icon: '📌', title: 'Pin and identify', description: 'Record the SDK and runtime versions; start from a clean, pinned checkout.' },
        { icon: '⏱️', title: 'Bound the session', description: 'Set a tool budget and wait timeout; dispose sessions and processes in finally.' },
        { icon: '🧪', title: 'Test the rules', description: 'Unit-test visibility rules with real request shapes; enable repository hooks.' },
        { icon: '👤', title: 'Name the owner', description: 'Confirm authentication, models, and billing; route each report to a decision owner.' }
      ]
    }),
    S('apps-to-embed', 4, 'Start with one method in a tool your team already owns', {
      scene: 'app-ideas', pill: 'Own It · Transfer',
      subtitle: 'Each idea retains its app’s permissions, checks, and review decision.',
      cards: [
        { title: 'CI console', detail: 'rerunTest and compareRuns; repeated evidence informs the diagnosis.', z: 'local' },
        { title: 'Dependency portal', detail: 'Isolated upgrade work; the app reruns checks and a person reviews.', z: 'remote' },
        { title: 'Release dashboard', detail: 'Read readiness; service retains deployment approval.', z: 'purple' },
        { title: 'Runbook tool', detail: 'Rehearse in a disposable environment; report unclear steps.', z: 'orange' },
        { title: 'Learning app', detail: 'Isolate submitted code; the app keeps answer keys and records grades.', z: 'github' },
        { title: 'Developer portal', detail: 'Begin with one stage; app-owned gates connect later handoffs.', z: 'green' }
      ],
      footer: 'Transfer prompt: which existing method, useful question, authority check, and evidence owner fit your workflow?'
    }),
    S('before-after', 0, 'From watching a loop to hosting one in your app', {
      pill: 'The Value Recap',
      before: [
        'The agent’s loop is hidden behind a prompt',
        'A useful app method is disconnected from the agent',
        'Permission and service authorization blur together',
        'The agent’s summary stands in for evidence'
      ],
      after: [
        'Name five jobs and choose where to step in',
        'Expose one selected method through a named tool',
        'Keep session permission and user authorization distinct',
        'Use events, service records, and human review'
      ],
      metrics: [
        { value: '~170', detail: 'lines in pi runLoop, approximately' },
        { value: '5 jobs', detail: 'places to reason about the harness' },
        { value: '1 method', detail: 'a narrow starting scope for an app' }
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
          { href: 'https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d', label: 'pi coding agent at f9daca3', description: 'Pinned MIT source excerpts: loop, tools, control, evidence' },
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
      subtitle: 'Getting Inside the Agent Loop',
      cards: [
        { value: '5 jobs', detail: 'Loop, context, tools, control, evidence' },
        { value: 'Your app', detail: 'A custom tool calls a method you already own' },
        { value: 'Your boundary', detail: 'Keep user authority, approvals, and evidence explicit' }
      ],
      prompt: 'Which method in an app you own could become a useful AI tool?'
    })
  ];

  const NOTES = {
    title: {
      seconds: 20,
      notes: [
        '"A harness makes the agent loop visible and gives an existing app a way to use its methods through a tool."',
        'The ring shows the repeated move: model request, tool action, result, next turn.',
        '→ Start with the question a developer or platform engineer asks when an agent needs to enter their own workflow.'
      ],
      know: ['This is a practitioner talk about the GitHub Copilot SDK at version 1.0.26 and a read-only source reading of pi pinned at f9daca3.'],
      sources: [SRC.pi, SRC.sdk]
    },
    'core-question': {
      seconds: 45,
      notes: [
        '"The question is how to change the loop without giving away the controls the application already owns."',
        'Point to the five route labels, then the app-method and named-owner outcomes.',
        'We will read pi first, sketch an existing release dashboard, and then use the same host to run an independent blind test.'
      ],
      know: ['Audience: developers and platform engineers already using Copilot in an editor or CLI, plus architects choosing what an embedded agent may request. The decision is which harness job to own and what the host lets the agent see, use, and do.'],
      sources: [SRC.pi, SRC.sdk]
    },
    contents: {
      seconds: 30,
      notes: [
        '"We will name the loop’s jobs, take those jobs into an app, test a deliberately restricted view, and finish with ownership."',
        'The openers begin on slides 4, 11, 19, and 24. Click a route card or use the keyboard to move between them.'
      ],
      know: ['The four-part order is preserved from the approved recipe: What a Harness Is; Drive GitHub’s Harness; Decide What It Sees; Own It.'],
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
      know: ['pi’s runLoop is approximately 170 lines. The excerpt in the source README was trimmed from agent-loop.ts around L188-L337. Tool-call batches can terminate; tool results are pushed into context. People can steer mid-run through steering and follow-up messages.'],
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
      seconds: 145,
      notes: [
        '"A tool is a schema the model fills in plus code the harness runs."',
        'For write, point from path and content to the prompt guidance, mutation queue, abort checks, and swappable operations.',
        'find illustrates a different boundary: ensureTool locates fd and spawn starts it. The harness validates the call and sees the result; fd and the operating system govern execution.',
        '→ That boundary makes the next question practical: who can block the call?'
      ],
      know: ['pi write.ts is 97 lines and contains no OS command. Its schema has path and content; its prompt contribution says to create or overwrite files and use write for new files or complete rewrites. The executor resolves the path, serializes writes per file, checks cancellation around directory creation, then writes through ops. find.ts can use custom glob ops or call ensureTool("fd") and spawn. A host that needs end-to-end search control can supply custom glob operations.'],
      sources: [SRC.pi]
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
        '"The five jobs are still there; the SDK gives the host configuration and event surfaces for each."',
        'Move down the rows. The SDK starts sessions, the app configures context and tools, callbacks govern requests, and events feed the UI.',
        'Repository hooks add a floor only when the app opts in. Service methods still own domain authorization and results.',
        '→ The first integration job is to start and stop the session cleanly.'
      ],
      know: ['Documented SDK architecture: application → SDK → JSON-RPC → Copilot runtime. CopilotClient starts and stops the runtime by default. Claims about the runtime’s internal loop remain out of scope. The SDK also supports structured sendAndWait results when passed a schema.'],
      sources: [SRC.sdk, SRC.npm]
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
        '"The release assistant’s instructions name its role, the source of readiness facts, and what to do when those facts are missing."',
        'append adds guidance. customize edits named sections while keeping the rest of the SDK prompt. replace supplies only the host’s text.',
        'replace removes the SDK prompt guardrails, including security restrictions. Instructions steer; permission and service code enforce.',
        '→ Now turn the existing service method into one named tool.'
      ],
      know: ['Documented systemMessage modes: append, customize, and replace. customize sections include identity, tone, environment_context, safety, tool_instructions, custom_instructions, and others. Section actions include replace, remove, append, prepend, preserve, or a function that receives current text. custom_instructions can add application guidance beside repository rules. Observed in two runs of 02-context.ts: the first cited a code file as documentation; the rerun cited package.json for Node 20+ and labeled code/config steps undocumented. A softer attitude-only instruction produced no visible change.'],
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
        '"Approving a custom-tool request lets this session request that operation; it does not authorize the app user."',
        'The service checks identity and release access with the request arguments together. Any deployment service retains approval for the exact release and target.',
        'managedApprovalRequired needs a human path. This minimal handler rejects it and directs the user to the release owner.',
        'A refusal needs useful feedback; a service failure stays visible so the user and agent can recover.',
        '→ The app also needs to distinguish execution progress from the business result.'
      ],
      know: ['PermissionRequest kinds include read with path; write with fileName and newFileContents; shell with fullCommandText, commands, possiblePaths, and hasWriteFileRedirection; and custom-tool with toolName. SDK hooks see the calls they receive, not every internal operation inside a custom handler. Do not treat approve-once as business approval. Observed in 04-control.ts: a shell request to count TypeScript lines was rejected; the agent switched to view, made six approved reads, and returned counts. FanHub’s repository deny also held in a precedence probe while the SDK onPreToolUse returned allow; SDK callbacks did not run for that call.'],
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
        '"Here the engineer asks what blocks v2.4, and the model requests the one named readiness tool."',
        'Read the returned value: ready is false and the example blocker is an integration-test failure. The tool can still execute successfully.',
        'The dashboard explains the result; the release owner decides what happens next. These field values are illustrative, not a recorded integration run.',
        '→ The same host can use a different view for a different question.'
      ],
      know: ['The integration sketch’s releaseService.getReadiness(user, releaseId) validates the release ID, authorizes the authenticated app user, reads CI and approval state, returns permitted fields, and records the operation. A web backend hosts the SDK and forwards progress; credentials and authorization stay on the backend. Start read-only; verify current facts, unauthorized refusal, and distinct query failure versus unfavorable readiness. Route missing facts to the release owner.'],
      sources: [SRC.sdk, SRC.npm]
    },
    'part-3': {
      seconds: 20,
      notes: [
        '"Changing what the agent sees can make its report independent of the people who already know the implementation."',
        'The blind tester sees a contract and live API, not implementation or BUGS.md; a separate referee gets a different view.',
        '→ One shared policy applies at two SDK checkpoints.'
      ],
      know: ['The second perspective example in the README is fresh-eyes onboarding: docs only, with source hidden. It remains supporting material rather than the primary section payoff.'],
      sources: [SRC.blind, SRC.fresh, SRC.visibility]
    },
    'visibility-policy': {
      seconds: 165,
      notes: [
        '"A hook sees raw tool arguments; the permission handler sees the runtime’s parsed request."',
        'The hook can catch a search whose scope sweeps a hidden folder. The host can inspect read paths, write destinations and contents, and each command segment.',
        'The host denies a test file that would read hidden source when executed. It also splits compound shell input outside quoted text and checks each executable.',
        'Both behaviors are tested. The same 190-line policy serves fresh-eyes and blind tests with different predicates.',
        '→ Now look at the host-rerun test result and the independent referee’s classification.'
      ],
      know: ['createVisibilityPolicy accepts repoRoot, hidden, readable, writable, shellCommands, shellTextDeny, customTools, and hiddenFeedback. The blind tests expose only api_contract, built from SETUP.md with parenthetical bug hints removed; they hide node/backend/src, frontend, docs, other language tracks, the database, and Markdown including BUGS.md. They permit writes only under node/backend/__tests__/blind and allow shell commands for server/test use. A 5-command-shape test covers quoted separators and command segmentation. Fresh-eyes hides source, allows docs, package.json, .env.example, Dockerfiles, and scripts, writes only .env, excludes web tools, limits the session to report_friction, and uses an 80-call budget plus 20-minute wait.'],
      sources: [SRC.visibility, SRC.blind, SRC.fresh, SRC.examples]
    },
    'blind-result': {
      seconds: 165,
      notes: [
        '"The host, not the agent, reran the suite: ten tests passed and two failed."',
        'The first domain result is POST /api/characters returning 500; a separate read-only referee maps it to BUGS.md number 19, Missing Input Validation.',
        'The second test expected seasonId filtering, but episodes from every season returned. SETUP.md documents seasonId while the route reads season_id; the referee finds no matching bug entry and labels it undocumented.',
        'The runner’s TAP status is evidence about tests. The referee’s mapping is a separate interpretation, and the API owner decides which side changes.',
        '→ A host report is useful only when we name what remains beyond its reach.'
      ],
      know: ['Observed live run on 2026-10-26: @github/copilot-sdk 1.0.26, model auto, Node 24.22.1 on Windows, FanHub commit 0ea9e78. The host prepared a clean checkout and server on port 5299; on Node 22+ it installs better-sqlite3@^12 with --no-save because FanHub pins ^9 without a prebuilt binary, leaving package.json untouched. The blind app wrote five test files across characters, episodes, shows, quotes, and authentication; host rerun recorded 10 passing and 2 failing. The two denials were a view of a README in the test folder and git status. The README summary also pairs “18 tool calls” with “19 allowed and 2 denied,” which cannot be the same total; this slide omits that inconsistent counter. A second run varied, with 9 passing and 5 failing mapped to BUGS.md #9, #6, and #17, plus a test query-parameter choice noted by the referee. Agent output varies, so the host reruns and the referee is separate.'],
      sources: [SRC.blind, SRC.examples]
    },
    'host-boundary': {
      seconds: 165,
      notes: [
        '"The host governs mediated tool requests; once a process starts, the operating system governs its reach."',
        'A node --test process can read what its OS account can access. Content inspection catches obvious readFileSync reach-ins, but a container is the hard boundary.',
        'Other processes, users, and network access sit outside tool mediation. OS accounts, containers, and network rules govern them.',
        'A failing test is a disagreement, not a verdict. The API owner decides whether the contract or code changes.',
        '→ Keep the decision, execution, and owner visible in the run log.'
      ],
      know: ['The blind host reruns tests itself and separates the read-only referee session from the black-box tester. The referee can inspect BUGS.md and source; that later reveal does not change what the tester saw. pi’s find-to-fd boundary gives the same pattern: the harness sees the request and result, while the OS runs the external process.'],
      sources: [SRC.blind, SRC.pi]
    },
    'run-evidence': {
      seconds: 165,
      notes: [
        '"One sessionId lets us line up a repository hook, a host decision, runtime activity, and the app’s summary."',
        'Read the second and third rows separately: a deny is a decision; tool.complete is an execution outcome.',
        'The example event shapes are illustrative and redacted. Keep names, rules, and counts; leave file contents and command output out.',
        'The repository floor ran in both supporting apps: 19 preToolUse events in fresh-eyes and 12 in blind tests. Neither agent reached for the database, so the hook did not need to deny one.',
        '→ Finish by naming the owners and controls around a harness someone else will run.'
      ],
      know: ['host-kit/run-log.ts writes JSONL, attaches to tool.execution_start, tool.execution_complete, hook.start, hook.end, and assistant.message, and omits raw arguments. The app writes host policy decisions separately; the full run log can join them with runtime tool.complete and session-end summary by sessionId. The hooks overlay protects node/backend/src/database/** and fanhub.db* when loaded. The repository preToolUse deny held while SDK onPreToolUse returned allow in a separate probe.'],
      sources: [SRC.runLog, SRC.overlay, SRC.examples]
    },
    'part-4': {
      seconds: 20,
      notes: [
        '"A shared harness enters controls that its author does not own, so the pre-flight names what to check and who accepts the result."',
        'The report reader is explicit: docs owner for onboarding friction, API owner for contract failures.',
        '→ Start with the controls around the app.'
      ],
      know: ['This closes on authority, verification, and transfer: use the user’s actual identity; test the policy; retain a human owner for every report.'],
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
        '"Before another person runs the app, pin versions, bound the session, test the rules, and name who reads the report."',
        'If a session-start note is enough, use a sessionStart hook. If one call must never run in every harness, use a repository or machine policy preToolUse hook and keep it fast.',
        'Choose an SDK host when the workflow needs its own persona, tools, visibility rules, budget, or structured report; enable repository hooks when the repo floor applies.',
        '→ Choose one existing app method and make its authority and evidence explicit.'
      ],
      know: ['The quickstarts use SDK 1.0.26; record SDK and runtime versions in reports. Start each run from a clean pinned checkout, bound calls and waits, and clean up in finally. Test every visibility rule against real PermissionRequest shapes. Confirm auth, model availability, and billing for actual users. A command preToolUse hook that crashes or exits non-zero denies; a timeout is fail-open, including policy hooks. Stdout carries one JSON object. The permissionDecisionReason is shown to the agent. FanHub’s tested hook completed in about 55 ms against a 5-second budget; this is one test observation, not a universal target.'],
      sources: [SRC.sdk, SRC.npm, SRC.hooks, SRC.examples]
    },
    'apps-to-embed': {
      seconds: 125,
      notes: [
        '"The first place to look is an app your team already owns: its methods, identity checks, and interface are useful foundations."',
        'A CI console can compare repeated reruns; one passing rerun does not identify a flaky-test cause. A dependency portal can isolate one upgrade and require a human branch review.',
        'A release assistant can read readiness and draft a rollout, while the deployment service retains approval. A runbook drill belongs in a disposable environment.',
        'A learning app isolates submitted code and keeps answer keys out of context and tools. A developer portal can coordinate stages, but each handoff needs an app-owned gate and durable record.',
        '"Pick one existing method, one useful question, and the evidence a user needs to trust the result."'
      ],
      know: ['Fresh-eyes is a supporting working app: it starts from a pinned clean FanHub clone; persona follows written docs literally; source is hidden; .env is the only writable path; an allowlist controls setup commands; web tools are excluded; report_friction records step, docSays, reality, doc, and severity. Bounds are 80 tool calls, 20 minutes, and cleanup of a listener on port 5265. Observed: 24 tool calls, 20 allowed, one denied, zero source reads, GET /api/characters returned 200, and three findings. Finding 1: node/SETUP.md says Node 18+; on Node 24 better-sqlite3 had no prebuilt binary and its source build needed Python. Finding 2: node/README.md calls Docker a prerequisite and gives port 3001, while SETUP.md says no Docker and uses 5265. Finding 3: docs give no native-install fallback; the agent recovered with npm exec --package=node@20. The denial was an ad-hoc Node archive download outside the command allowlist; the agent reported it and moved to an allowed route. The docs owner decides what to fix.'],
      sources: [SRC.fresh, SRC.visibility, SRC.examples]
    },
    'before-after': {
      seconds: 45,
      notes: [
        '"The shift is from a black-box request to a named job, a narrow method, and an outcome someone can inspect."',
        'The approximate 170-line count belongs to pi’s source loop. Five jobs are the analysis model, and one existing method is a bounded starting scope.',
        '→ Here is a small sequence for applying the choice in your own repository.'
      ],
      know: ['The source README describes pi runLoop as about 170 lines. It is an approximate source-size observation, not a performance metric.'],
      sources: [SRC.pi, SRC.sdk]
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
