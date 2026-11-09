/*
  Copilot Chat Internals — deck data and speaker notes.
  Structure follows the approved recipe tech-talks/copilot-chat-internals/deck.recipe.yml
  (2026-11-06 restructure). Facts: VS Code release notes v1.110–v1.145 and docs under
  /docs/agents and /docs/agent-customization, gathered 2026-11-06. Items whose version or
  exact wording is unconfirmed carry [verify] in the notes.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const slides = [
    S('title', 0, 'Copilot Chat Internals', {
      chrome: false,
      subtitle: 'Read the Evidence Every Agent Run Leaves',
      tagline: 'What loaded, what was sent, what it did, and the trail you keep.',
      meta: 'CopilotTraining · Practitioner Tech Talk · VS Code 1.110–1.145'
    }),
    S('core-question', 0, 'Why didn\'t the agent do what I expected, and how do I find out?', {
      pill: 'core question',
      subtitle: 'Every agent run leaves evidence. Read it in order and the surprise has an address.',
      highlight: 'Ask four questions in order: did it load, what was sent, what it did, and can I keep the trail.',
      routing: ['loaded?', 'sent?', 'done?', 'kept?'], routingLabel: 'Ask in order',
      roles: [
        { icon: '🧑‍💻', title: 'Developer', description: 'Find why the agent skipped a rule or a tool, in minutes.' },
        { icon: '🧭', title: 'Team lead', description: 'Check that shared instructions reach every teammate\'s runs.' },
        { icon: '🏗️', title: 'Platform engineer', description: 'Send agent traces to the dashboards the team already reads.' }
      ],
      stats: [
        { title: '4 questions', description: 'One order that rules out whole classes of cause.' },
        { title: '1 view per question', description: 'Know where each answer lives in VS Code.' },
        { title: 'A trail to share', description: 'Logs and traces a teammate can open later.' }
      ]
    }),
    S('contents', 0, 'Four Questions, Four Places to Look', {
      pill: 'agenda · four parts',
      sections: [
        { icon: '📥', title: 'Did My Setup Load?', subtitle: 'Customizations and Discovery', blurb: 'See every instruction, agent, skill, and hook, and whether it loaded.', slide: 6 },
        { icon: '🔍', title: 'What Did the Model Receive?', subtitle: 'Chat Debug view and context', blurb: 'Read the exact prompt, the context window, and cache reuse.', slide: 11 },
        { icon: '🧭', title: 'What Did the Agent Do?', subtitle: 'Agent Debug Logs and /troubleshoot', blurb: 'Follow tools, hooks, and subagents, then let the agent explain the run.', slide: 18 },
        { icon: '🧾', title: 'Keep the Trail', subtitle: 'File logs and OpenTelemetry', blurb: 'Persist, share, and observe agent runs as a team.', slide: 29 }
      ]
    }),
    S('what-changed', 0, 'What Changed Since v1.110', {
      scene: 'rows', pill: 'before we start · what changed',
      subtitle: 'If you learned this in early 2026, update these names and habits.',
      labelW: 320,
      rows: [
        { label: 'Diagnostics action', detail: 'Replaced by the Agent Debug panel (v1.110)', tag: 'removed', z: 'orange' },
        { label: 'Edit Mode', detail: 'Removed in v1.126; use Agent mode or a custom agent', tag: 'removed', z: 'orange' },
        { label: 'Agent Debug panel', detail: 'Now Developer: Open Agent Debug Logs (v1.116)', tag: 'renamed', z: 'local' },
        { label: 'Debug log settings', detail: 'Two settings merged into fileLogging.enabled (v1.116)', tag: 'merged', z: 'local' },
        { label: 'Thinking settings', detail: 'Effort settings replaced by the model picker (v1.113)', tag: 'replaced', z: 'local' },
        { label: 'Customizations', detail: 'Now the Agent Customizations editor; same command', tag: 'renamed', z: 'local' },
        { label: '/docs/copilot/*', detail: 'Docs moved to /docs/agents and /docs/agent-customization', tag: 'moved', z: 'purple' }
      ]
    }),

    /* Close */
    S('one-surprise', 0, 'One Ignored Rule, Four Questions', {
      scene: 'signals', pill: 'the surprise',
      subtitle: 'The agent added an orders endpoint and skipped the team rule: log every request with its correlation ID.',
      rows: [
        { label: 'Did it load?', description: 'Did VS Code find the instruction file and apply it to this file?', tag: 'Discovery', z: 'local' },
        { label: 'What was sent?', description: 'Is the rule text inside the prompt the model received?', tag: 'Chat Debug view', z: 'remote' },
        { label: 'What did it do?', description: 'Which tools, hooks, and subagents ran, and what failed?', tag: 'Agent Debug Logs', z: 'github' },
        { label: 'Can I keep it?', description: 'Can a teammate open the same evidence tomorrow?', tag: 'File log + OTel', z: 'runtime' }
      ],
      footnote: 'Each answer rules out a whole class of cause before you touch the prompt.'
    }),

    /* Part 1 — Did my setup load? */
    S('part-1', 1, 'Did My Setup Load?', {
      scene: 'opener',
      subtitle: 'Most surprises start before the model sees anything: a file VS Code skipped, rejected, or never found.',
      cards: [
        { icon: '🗂️', title: 'Inventory', blurb: 'What VS Code found' },
        { icon: '📥', title: 'Discovery', blurb: 'Loaded, skipped, rejected' },
        { icon: '🧹', title: 'Lint', blurb: 'Catch conflicts early' }
      ],
      terminal: { context: 'Chat: Open Customizations', detail: 'source and errors for every file' }
    }),
    S('customizations-editor', 1, 'Every Customization, With Its Source and Errors', {
      scene: 'rows', pill: 'did it load? · agent customizations editor',
      subtitle: 'Chat: Open Customizations lists what VS Code found for this workspace, file by file.',
      labelW: 300,
      rows: [
        { label: 'Instructions', detail: 'copilot-instructions.md, AGENTS.md, and each .instructions.md with its folder' },
        { label: 'Prompts', detail: 'Reusable .prompt.md files you start with a slash command' },
        { label: 'Custom agents', detail: 'release.agent.md shows a frontmatter error on its row', tag: 'error', z: 'orange', hl: true },
        { label: 'Skills', detail: 'SKILL.md folders the agent can load on demand' },
        { label: 'Hooks', detail: 'Commands that run at agent lifecycle events' },
        { label: 'MCP servers', detail: 'Configured and discovered servers, including those from plugins' },
        { label: 'Plugins, canvases', detail: 'Installed bundles; Canvases joined the editor in v1.144' }
      ]
    }),
    S('discovery-events', 1, 'Discovery Says Loaded, Skipped, or Rejected', {
      scene: 'rows', pill: 'did it load? · discovery events',
      subtitle: 'Turn on capture, reproduce, then filter Agent Debug Logs to Discovery: one event per customization, with the reason.',
      labelW: 330, colLabels: ['How to see it', 'Do this', ''],
      rows: [
        { label: '1 · Before you reproduce', detail: 'Enable chat.agentHost.agentDebugLog.enabled (Local harness: github.copilot.chat.agentDebugLog.fileLogging.enabled). Capture is not retroactive.', tag: 'setting', z: 'accent' },
        { label: '2 · Open the panel', detail: 'Chat view ... menu > Show Agent Debug Logs, or Developer: Open Agent Debug Logs', tag: 'command', z: 'accent' },
        { label: '3 · Filter the Logs view', detail: 'Pick the affected session, then filter events to Discovery', tag: 'filter', z: 'accent' },
        { label: 'copilot-instructions.md', detail: 'Repository-wide instructions applied to the request', tag: 'loaded', z: 'green', indent: 1 },
        { label: 'api-logging.instructions.md', detail: 'applyTo pattern did not match the edited file', tag: 'skipped', z: 'orange', hl: true, indent: 1 },
        { label: 'release.agent.md', detail: 'Frontmatter could not be parsed', tag: 'rejected', z: 'orange', indent: 1 }
      ],
      footnote: 'A silent miss becomes a visible line with a reason.'
    }),
    S('applyto-miss', 1, 'A Glob That Misses Skips the Rule Silently', {
      scene: 'rows', pill: 'did it load? · worked example',
      subtitle: 'Put the rule\'s pattern beside the file the agent touched. Patterns match from the workspace root.',
      labelW: 330, colLabels: ['Step', 'Where to look · what you see', ''],
      rows: [
        { label: '1 · Read the pattern', detail: 'Chat: Open Customizations > Instructions > open the file. Frontmatter: applyTo: src/api/**/*.ts' },
        { label: '2 · Find the touched file', detail: 'Agent Debug Logs > Logs view > expand the edit tool call: services/orders/handler.ts', z: 'orange', hl: true },
        { label: '3 · Compare, read the reason', detail: 'No match from the root. Expand the Discovery event for api-logging.instructions.md', tag: 'skipped', z: 'orange' },
        { label: '4 · Fix, then rerun', detail: 'applyTo: src/api/**/*.ts, services/**/*.ts. Repeat the task in a new chat; the same event shows', tag: 'loaded', z: 'green' }
      ],
      footnote: 'Verify the fix the same way: the next run shows the file as loaded.'
    }),
    S('evaluations-lint', 1, 'Lint the Rules Before a Run', {
      scene: 'rows', pill: 'did it load? · instruction linting',
      subtitle: 'The Chat Customizations Evaluations extension reads a customization file and puts each finding in the Problems panel.',
      labelW: 330, colLabels: ['How to run it', 'Do this · what you see', ''],
      rows: [
        { label: '1 · Install once', detail: 'Extensions view: Chat Customizations Evaluations (Microsoft). Uses your Copilot sign-in; no API key.', tag: 'extension', z: 'accent' },
        { label: '2 · Analyze the file', detail: 'Open the .instructions.md, select the beaker icon in the editor title bar, or type /analyze-prompt in chat', tag: 'command', z: 'accent' },
        { label: '3 · Open Problems', detail: 'Ctrl+Shift+M (Cmd+Shift+M). Each finding links to its line.', tag: 'panel', z: 'accent' },
        { label: 'Line 9 vs line 4', detail: '"Never log request bodies" contradicts "Log the full request body"', tag: 'contradiction', z: 'orange', hl: true, indent: 1 },
        { label: 'Line 12', detail: '"Keep log output reasonable." Reasonable is undefined', tag: 'ambiguous', z: 'orange', indent: 1 }
      ],
      footnote: 'Fix the line, analyze again, and the finding clears before any agent run.'
    }),

    /* Part 2 — What did the model receive? */
    S('part-2', 2, 'What Did the Model Receive?', {
      scene: 'opener',
      subtitle: 'A loaded file still has to reach the prompt, fit the window, and survive compaction.',
      cards: [
        { icon: '📨', title: 'Request', blurb: 'The exact prompt sent' },
        { icon: '📏', title: 'Window', blurb: 'Tokens, compaction, credits' },
        { icon: '♻️', title: 'Cache', blurb: 'Where requests diverge' }
      ],
      terminal: { context: 'Developer: Show Chat Debug View', detail: 'per model request' }
    }),
    S('chat-debug-anatomy', 2, 'Five Sections per Model Request', {
      scene: 'rows', pill: 'what was sent? · chat debug view',
      subtitle: 'Developer: Show Chat Debug View opens each request the agent made to the model.',
      labelW: 280,
      rows: [
        { label: 'System prompt', detail: 'Base instructions plus the customizations that loaded for this request', z: 'purple', hl: true },
        { label: 'User prompt', detail: 'Your message as the model received it' },
        { label: 'Context', detail: 'Files, selections, and references attached to the request' },
        { label: 'Response', detail: 'The model\'s reply, including any tool calls it requested' },
        { label: 'Tool responses', detail: 'What each tool returned to the model' }
      ]
    }),
    S('prove-in-prompt', 2, 'Find the Rule Text in the System Prompt', {
      scene: 'signals', pill: 'what was sent? · the proof move',
      subtitle: 'Search the system prompt for a phrase only your rule uses, such as "correlation ID".',
      rows: [
        { label: 'Text is there', description: 'The model received the rule; inspect what it did next', tag: 'Part 3', z: 'green' },
        { label: 'Text is absent', description: 'The model never saw it; go back to Discovery', tag: 'Part 1', z: 'orange' },
        { label: 'Text is partial', description: 'A summary may have replaced older turns', tag: 'Compaction', z: 'purple' }
      ],
      footnote: 'Absent text settles the question: the model cannot follow a rule it never received.'
    }),
    S('context-window', 2, 'The Context Indicator Shows Room and Cost', {
      scene: 'scorecard', pill: 'what was sent? · context window',
      subtitle: 'Select the context window control in the Chat view, or open the session info popover.',
      cards: [
        { icon: '🔢', title: 'Tokens used', description: 'How much of the window this session fills, accurate for BYOK models since v1.120.' },
        { icon: '📊', title: 'Percent full', description: 'A rising gauge predicts compaction before it happens.' },
        { icon: '💳', title: 'Session cost', description: 'AI credits for the session beside token use (v1.126).' },
        { icon: '📐', title: 'Context size', description: 'Choose the window per model in the picker, up to 1M tokens on some models.' }
      ]
    }),
    S('compaction', 2, 'Compaction Summarizes; You Can Steer It', {
      scene: 'scorecard', pill: 'what was sent? · compaction',
      subtitle: 'Near the limit, VS Code summarizes older turns; details from early messages can be summarized or omitted.',
      cards: [
        { icon: '🗜️', title: 'Automatic', description: 'Older turns become a summary in the background, reusing the prompt cache (v1.121).' },
        { icon: '🎯', title: '/compact focus on X', description: 'Compact now and tell the summary what to keep.' },
        { icon: '🆕', title: 'New chat in session', description: 'Keeps files and changes, drops the conversation history.' },
        { icon: '🧪', title: 'Subagent', description: 'Isolates a side task in its own context; nothing is summarized.' }
      ]
    }),
    S('smaller-context', 2, 'Less Noise Reaches the Window', {
      scene: 'showdown', pill: 'what was sent? · smaller context',
      subtitle: 'Two mechanisms explain why the model saw less than the terminal printed.',
      leftLabel: 'Without', rightLabel: 'With compression and deferred tools',
      pairs: [
        { left: { label: 'Raw terminal output', note: 'npm install noise, long ls -l listings' }, right: { label: 'Compressed output (Preview)', note: 'chat.tools.compressOutput.enabled trims noise before the model reads it (v1.120)', z: 'local' } },
        { left: { label: 'Every diff hunk verbatim', note: 'Lockfile and snapshot diffs included' }, right: { label: 'Large hunks collapsed', note: 'Lockfile and snapshot diffs stripped', z: 'local' } },
        { left: { label: 'Every tool schema up front', note: 'Large fixed cost on each request' }, right: { label: 'Core tools plus tool search', note: 'About 30 core tools load; the rest load on demand (v1.121)', z: 'purple' } }
      ],
      outcomeLeft: { icon: '!', label: 'The window fills with output nobody reads' },
      outcomeRight: { icon: '✓', label: 'Room for code, rules, and history' }
    }),
    S('cache-explorer', 2, 'Cache Explorer Finds the First Divergence', {
      scene: 'rows', pill: 'what was sent? · cache explorer',
      subtitle: 'When the Summary shows low cache reuse, compare a turn with the request before it and find where they stop matching.',
      labelW: 330, colLabels: ['Step', 'Where to look · what you see', ''],
      rows: [
        { label: '1 · Confirm the symptom', detail: 'Agent Debug Logs > select the session description in the breadcrumb > Summary: low cache reuse with high duration or input tokens', tag: 'summary', z: 'accent' },
        { label: '2 · Open, pick a turn', detail: 'Select Cache Explorer, then a low-reuse turn in the side panel; it compares with the previous request', tag: 'side panel', z: 'accent' },
        { label: '3 · Find the divergence', detail: 'Prompt signature: system instructions match; tool definitions diverge (an MCP server was enabled between turns)', tag: 'first divergence', z: 'orange', hl: true },
        { label: '4 · Read what changed', detail: 'Expand Tool definitions under Components to see the text diff', tag: 'components', z: 'accent' },
        { label: '5 · One change, rerun', detail: 'Server not needed? Choose tools before a new session, repeat both requests, compare reuse, duration, and quality', tag: 'compare', z: 'green' }
      ],
      footnote: 'The diff explains the cache metric; it does not prove how the provider processed or billed the request.'
    }),

    /* Part 3 — What did the agent do? */
    S('part-3', 3, 'What Did the Agent Do?', {
      scene: 'opener',
      subtitle: 'Follow every tool call, hook, and subagent, then let the agent explain its own run.',
      cards: [
        { icon: '📜', title: 'Events', blurb: 'Logs, Summary, flow chart' },
        { icon: '🧩', title: 'Subagents', blurb: 'Separate transcripts' },
        { icon: '💬', title: 'Explanation', blurb: '/troubleshoot, then proof' }
      ],
      terminal: { context: 'Developer: Open Agent Debug Logs', detail: 'Preview' }
    }),
    S('debug-logs-views', 3, 'Agent Debug Logs Has Four Views', {
      scene: 'scorecard', pill: 'what did it do? · agent debug logs',
      subtitle: 'Developer: Open Agent Debug Logs (Preview), or gear menu → View Agent Logs.',
      cards: [
        { icon: '📜', title: 'Logs', description: 'Every event, flat or as a tree, with filters.' },
        { icon: '🧮', title: 'Summary', description: 'Totals for tool calls, tokens, errors, and duration.' },
        { icon: '🔀', title: 'Agent flow chart', description: 'Handoffs between the agent, subagents, and tools.' },
        { icon: '♻️', title: 'Cache Explorer', description: 'Prompt-cache reuse between consecutive requests.' }
      ]
    }),
    S('logs-tree', 3, 'The Logs Tree Puts Every Step in Order', {
      scene: 'logs-tree', pill: 'what did it do? · logs view',
      subtitle: 'Tree mode nests each step under the request that caused it; filter to errors to jump to the failure.',
      filters: [
        { label: 'Model requests', z: 'purple' },
        { label: 'Tool calls', z: 'accent' },
        { label: 'Discovery', z: 'local' },
        { label: 'Errors', z: 'orange', on: true }
      ],
      tree: [
        { type: 'Discovery', z: 'local', text: 'Instructions, skills, and agents: loaded, skipped, rejected', status: 'done' },
        { type: 'Model request', z: 'purple', text: 'Request 1: plan the change', status: 'done' },
        { type: 'Tool call', z: 'accent', text: 'read_file  services/orders/handler.ts', mono: true, indent: 1, status: 'ok' },
        { type: 'Subagent', z: 'runtime', text: 'Explore: find the existing logging helper', indent: 1, status: 'done' },
        { type: 'Tool call', z: 'accent', text: 'search  "correlation id"', mono: true, indent: 2, status: 'ok' },
        { type: 'MCP tool', z: 'orange', text: 'tracker · lookup_issue', mono: true, indent: 2, status: 'error', sz: 'orange', hl: true,
          expand: ['error: the MCP server returned an error result', 'expand the event for the full message and its inputs'] },
        { type: 'Hook', z: 'remote', text: 'PostToolUse: format the changed files', indent: 1, status: 'ok' },
        { type: 'Model request', z: 'purple', text: 'Request 2: write the fix', status: 'done' }
      ]
    }),
    S('summary-view', 3, 'Summary Totals the Session', {
      scene: 'scorecard', pill: 'what did it do? · summary view',
      subtitle: 'Click the session description in the breadcrumb to open it.',
      cards: [
        { icon: '🛠️', title: 'Tool calls', description: 'A spike points to a loop or a retry storm.' },
        { icon: '🔢', title: 'Tokens', description: 'Where the window went, before you blame the model.' },
        { icon: '⚠️', title: 'Errors', description: 'Any count above zero has an event worth opening.' },
        { icon: '⏱️', title: 'Duration', description: 'Slow runs lead to the step that took the time.' }
      ]
    }),
    S('flow-chart', 3, 'The Flow Chart Shows Who Handed Work to Whom', {
      scene: 'flow-chart', pill: 'what did it do? · agent flow chart',
      subtitle: 'Each node is the agent, a subagent, a tool, or a hook; each line is a handoff.',
      nodes: [
        { id: 'ask', kind: 'prompt', title: 'Your request', detail: 'Add correlation IDs', z: 'accent', x: 0, y: 230, w: 190 },
        { id: 'main', kind: 'agent', title: 'Main agent', detail: 'Plans and edits files', z: 'purple', x: 250, y: 230, w: 230 },
        { id: 'explore', kind: 'subagent', title: 'Explore', detail: 'Read-only research', z: 'runtime', x: 550, y: 70, w: 230, sel: true },
        { id: 'term', kind: 'tool', title: 'Terminal', detail: 'Runs the tests', z: 'accent', x: 550, y: 230, w: 230 },
        { id: 'hook', kind: 'hook', title: 'Format hook', detail: 'After each edit', z: 'remote', x: 550, y: 390, w: 230 },
        { id: 'search', kind: 'tool', title: 'search', detail: 'Codebase search', z: 'accent', x: 850, y: 20, w: 200 },
        { id: 'read', kind: 'tool', title: 'read_file', detail: 'Logging helpers', z: 'accent', x: 850, y: 150, w: 200 }
      ],
      edges: [['ask', 'main'], ['main', 'explore'], ['main', 'term'], ['main', 'hook'], ['explore', 'search'], ['explore', 'read']],
      inspect: {
        head: 'Selected: Explore',
        lines: ['Handed off by the main agent', 'Runs in its own context window', 'Called search and read_file', 'Returned a summary to its parent']
      },
      hints: ['Summary → Agent Flow Chart', 'Pan and zoom', 'Select a node to inspect it']
    }),
    S('subagents', 3, 'Subagents Start Fresh and Stay Visible', {
      scene: 'scorecard', pill: 'what did it do? · subagents',
      subtitle: 'A subagent sees only what the parent passes it, so its evidence lives in its own transcript.',
      cards: [
        { icon: '🫙', title: 'Stateless start', description: 'No parent history unless the parent passes it in the request.' },
        { icon: '👥', title: 'Peer transcript', description: 'Opens as a read-only peer chat in the Agents window (v1.128).' },
        { icon: '📡', title: 'Live status', description: 'Model, elapsed time, and active tool shown inline (v1.131).' },
        { icon: '💳', title: 'Cost on hover', description: 'Hover a subagent section to see its AI credits (v1.127).' }
      ]
    }),
    S('reasoning-verbosity', 3, 'Choose the Effort and How Much You See', {
      scene: 'signals', pill: 'what did it do? · reasoning',
      subtitle: 'Hover a model in the picker to set effort and window; View Mode sets how the transcript shows the work.',
      rows: [
        { label: 'Thinking effort', description: 'Low, Medium, or High per model, set in the picker (v1.142)', tag: 'model picker', z: 'purple' },
        { label: 'Conversation', description: 'Reasoning and tool calls in collapsed sections', tag: 'View Mode', z: 'local' },
        { label: 'Compact', description: 'Default: tool calls preview live, then collapse to rows', tag: 'View Mode', z: 'local' },
        { label: 'Verbose', description: 'Every reasoning step and tool call stays expanded', tag: 'View Mode', z: 'local' }
      ],
      footnote: 'View Mode is Experimental in v1.145: chat.persistentProgressVerbosity.'
    }),
    S('troubleshoot', 3, '/troubleshoot Reads the Run and Names the Cause', {
      scene: 'terminal', termTitle: 'Chat · /troubleshoot (Preview)', pill: 'what did it do? · /troubleshoot',
      subtitle: 'Copilot reads this session\'s debug events and answers one question.',
      transcript: [
        { type: 'user', text: '/troubleshoot Which customizations were loaded, and did any fail?' },
        { type: 'thinking', label: 'Copilot:' },
        { type: 'response', lines: [
          'Loaded: copilot-instructions.md, AGENTS.md',
          'Skipped: api-logging.instructions.md, applyTo src/api/**/*.ts did not match services/orders/handler.ts',
          'Rejected: release.agent.md, frontmatter could not be parsed'
        ] },
        { type: 'divider' },
        { type: 'outcome', mark: '?', text: 'Hypothesis: the logging rule never reached the model' },
        { type: 'outcome', mark: '→', text: 'Next: confirm the skipped event in the Logs view' }
      ]
    }),
    S('troubleshoot-explained', 3, '/troubleshoot Turns the Debug Log into Answers', {
      scene: 'columns', pill: 'what did it do? · /troubleshoot',
      subtitle: 'A Preview chat skill: it reads a session\'s captured debug events and answers the question you type after it.',
      columns: [
        { head: 'What it does', z: 'purple', items: [
          { t: 'Reads the captured events', d: 'The same model requests, tool calls, discovery, and errors the Agent Debug Logs panel shows' },
          { t: 'Answers one focused question', d: 'Type /troubleshoot, then the question or the symptom you saw', },
          { t: 'Points at the evidence', d: 'Names the file, tool, or step involved so you can confirm it in the logs' }
        ] },
        { head: 'Where it works', z: 'local', items: [
          { t: 'Agent Host sessions', d: 'Chat view and Agents window. Enable before you reproduce:' },
          { t: '', d: 'chat.agentHost.agentDebugLog.enabled', mono: true },
          { t: 'Local harness sessions', d: 'Enable file logging, then reload the window:' },
          { t: '', d: 'github.copilot.chat.agentDebugLog .fileLogging.enabled', mono: true },
          { t: 'Any captured session', d: '/troubleshoot #session, then pick the run' }
        ] },
        { head: 'What it finds', z: 'orange', items: [
          { t: 'Customizations that did not load', d: 'Which customizations were loaded, and did any fail?', mono: true },
          { t: 'Tools or subagents used or skipped', d: 'Which tool failed and what error did it return?', mono: true },
          { t: 'Slow or token-heavy responses', d: 'What made this response slow?', mono: true },
          { t: 'Network connectivity problems', d: 'Did any request fail to reach the service?', mono: true }
        ] }
      ],
      band: 'Capture starts when logging is on: enable it, reproduce the problem, then ask.'
    }),
    S('troubleshoot-verify', 3, 'Confirm the Answer in the Logs View', {
      scene: 'verify', pill: 'what did it do? · verify',
      subtitle: 'The explanation is a hypothesis; the matching events are the proof.',
      claim: {
        who: '/troubleshoot said',
        text: 'api-logging.instructions.md was skipped: applyTo src/api/**/*.ts did not match services/orders/handler.ts'
      },
      evidence: [
        { view: 'Logs view · Discovery', line: 'api-logging.instructions.md  →  skipped', note: 'Same file, same reason: the pattern did not match', status: 'matches' },
        { view: 'Chat Debug view · System prompt', line: 'no "correlation ID" text in the prompt', note: 'The rule never reached the model', status: 'matches' },
        { view: 'After the fix · next run', line: 'api-logging.instructions.md  →  loaded', note: 'applyTo now covers the file; the rule text is in the prompt', status: 'verified' }
      ],
      verdict: 'Two views agree with the claim, and the rerun proves the fix.'
    }),
    S('mcp-hooks', 3, 'Some Failures Live Outside the Model', {
      scene: 'runbook', pill: 'what did it do? · mcp and hooks',
      subtitle: 'MCP servers and hooks run as separate processes; their own output tells you why they failed.',
      panels: [
        { head: 'MCP server', tag: 'tool missing or failing', z: 'remote', steps: [
          { t: 'Check the server status', d: 'MCP: List Servers, then select the server', mono: true },
          { t: 'Read its output', d: 'Show Output: the error from the failed request' },
          { t: 'Fix, then restart', d: 'Correct the config or connection; Restart Server; retry' },
          { t: 'Running but never called?', d: 'Chat Debug view: is the tool in the tool definitions? Then Agent Debug Logs for its calls and errors' }
        ], watch: 'A tool absent from the definitions never reaches the model.' },
        { head: 'Hook', tag: 'did not fire or blocked work', z: 'github', steps: [
          { t: 'Confirm target and source', d: 'Session Target, runtime version, and any duplicate source of the same command' },
          { t: 'Run the script by hand', d: 'Use a safe event fixture; check the exit status and exact JSON output' },
          { t: 'Prove it fired', d: 'Disposable session; find the hook event in Agent Debug Logs or the execute_hook span' },
          { t: 'Test timeouts separately', d: 'A preToolUse error denies the call; a timeout falls through to normal permissions' }
        ], watch: 'Copilot, Claude, Codex, and Local hooks use different formats.' }
      ]
    }),

    /* Part 4 — Keep the trail */
    S('part-4', 4, 'Keep the Trail', {
      scene: 'opener',
      subtitle: 'Evidence that outlives the window lets a teammate, or a dashboard, read the same run.',
      cards: [
        { icon: '💾', title: 'Persist', blurb: 'JSONL across sessions' },
        { icon: '📤', title: 'Share', blurb: 'Export and import' },
        { icon: '📈', title: 'Observe', blurb: 'OpenTelemetry spans' }
      ],
      terminal: { context: 'From one window to the team', detail: 'JSONL → OTLP → dashboard' }
    }),
    S('file-logging', 4, 'File Logging Keeps Every Run', {
      scene: 'rows', pill: 'keep the trail · file logging',
      subtitle: 'Turn it on once; past sessions stay readable by you and by /troubleshoot.',
      labelW: 230, monoDetail: true, tagW: 250,
      rows: [
        { label: 'Local harness', detail: 'github.copilot.chat.agentDebugLog.fileLogging.enabled', tag: 'JSONL on disk', z: 'local' },
        { label: 'Agent Host', detail: 'chat.agentHost.agentDebugLog.enabled', tag: 'Chat + Agents', z: 'local' },
        { label: 'Past run', detail: '/troubleshoot #session', tag: 'reopen a run', z: 'purple' },
        { label: 'Into chat', detail: '#debugEventsSnapshot', tag: 'attach events', z: 'purple' }
      ]
    }),
    S('export-share', 4, 'Export a Run for a Teammate', {
      scene: 'rows', pill: 'keep the trail · export and import',
      subtitle: 'The same evidence, opened on another machine.',
      labelW: 220,
      rows: [
        { label: 'Export', detail: 'Agent Debug Logs exports the session as OpenTelemetry JSON (OTLP)', tag: 'you', z: 'local' },
        { label: 'Review', detail: 'Logs carry prompts, file content, and tool output; read before sharing', tag: 'you decide', z: 'orange', hl: true },
        { label: 'Share', detail: 'Attach the file to the issue or send it to the teammate', tag: 'you', z: 'local' },
        { label: 'Import', detail: 'The teammate imports it and reads the same events', tag: 'teammate', z: 'green' }
      ],
      footnote: 'Export and import are Preview.'
    }),
    S('otel', 4, 'OpenTelemetry Puts Every Run on a Timeline', {
      scene: 'rows', pill: 'keep the trail · opentelemetry',
      subtitle: 'Set github.copilot.chat.otel.enabled and an otlpEndpoint; spans flow to any collector (v1.119).',
      mono: true, labelW: 260,
      rows: [
        { label: 'invoke_agent', detail: 'Root span: one agent run, local, Copilot CLI, or Claude', tag: 'root', z: 'purple', hl: true },
        { label: 'chat', detail: 'One model request with its token counts', indent: 1, tag: 'span', z: 'local' },
        { label: 'execute_tool', detail: 'One tool call with structured parameters', indent: 1, tag: 'span', z: 'local' },
        { label: 'execute_hook', detail: 'One hook run and its outcome', indent: 1, tag: 'span', z: 'local' }
      ],
      footnote: 'Attributes: gen_ai.* plus github.copilot.* (preferred since v1.122); copilot_chat.* is legacy.'
    }),
    S('team-dashboard', 4, 'The Org Decides Where Traces Go', {
      scene: 'rows', pill: 'keep the trail · team dashboard',
      subtitle: 'Admins can set the collector endpoint in Copilot managed settings (v1.128).',
      labelW: 320,
      rows: [
        { label: 'Managed settings', detail: 'A telemetry block names the collector endpoint for everyone', tag: 'admin decides', z: 'orange', hl: true },
        { label: 'OTel Collector', detail: 'Receives spans from each developer\'s VS Code', tag: 'transport', z: 'local' },
        { label: 'Application Insights', detail: 'Stores traces, metrics, and events', tag: 'store', z: 'local' },
        { label: 'Azure Managed Grafana', detail: 'Prebuilt dashboard for agent signals (v1.121)', tag: 'read', z: 'green' }
      ]
    }),
    S('decision-map', 4, 'Match the Symptom to the View', {
      scene: 'signals', pill: 'keep the trail · decision map',
      subtitle: 'Start with the symptom you see; open the view that answers it.',
      rows: [
        { label: 'Rule ignored', description: 'Check Discovery: loaded, skipped, or rejected', tag: 'Discovery', z: 'local' },
        { label: 'Loaded, not used', description: 'Search the system prompt for the rule text', tag: 'Chat Debug view', z: 'remote' },
        { label: 'Forgets context', description: 'Check window use and whether compaction ran', tag: 'Context gauge', z: 'remote' },
        { label: 'Slow or costly', description: 'Read the totals, then cache reuse between requests', tag: 'Summary, Cache', z: 'github' },
        { label: 'Tool failed', description: 'Find the error event; for MCP, read the server output', tag: 'Logs view', z: 'github' },
        { label: 'Not sure why', description: 'Ask /troubleshoot, then confirm in the Logs view', tag: '/troubleshoot', z: 'purple' },
        { label: 'After the fact', description: 'Reopen with #session, or read the team traces', tag: 'File log, OTel', z: 'runtime' }
      ]
    }),
    S('before-after', 0, 'From Guessing to Reading the Event', {
      scene: 'recap', pill: 'the value recap',
      subtitle: 'Each habit on the left became one piece of evidence you can open.',
      lanes: [
        { q: 'Did it load?', z: 'local', before: 'Guess whether the rule loaded', after: 'Read the Discovery event', where: 'Agent Debug Logs' },
        { q: 'What was sent?', z: 'remote', before: 'Re-prompt and hope the model sees it', after: 'Find the rule in the system prompt', where: 'Chat Debug view' },
        { q: 'What did it do?', z: 'github', before: 'Reload the window and try again', after: 'Ask /troubleshoot, confirm in the Logs view', where: '/troubleshoot + Logs' },
        { q: 'Can I keep it?', z: 'runtime', before: 'Lose the evidence when the window closes', after: 'Keep file logs and OTel traces', where: 'File log + OTel' }
      ],
      band: 'Every surprise now ends with a named event.'
    }),
    S('today', 0, 'What You Can Do Today', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Open Agent Debug Logs on your next surprise', 'Ask /troubleshoot one question', 'Confirm its answer in the Logs view'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Turn on file logging', 'Check every instruction\'s Discovery status', 'Find one team rule in the system prompt'] },
        { icon: '🚀', label: 'This Month', z: 'purple', items: ['Agree with your admin where traces go', 'Send OTel spans to a team collector', 'Share the symptom-to-view map'] }
      ],
      takeaway: 'Read the evidence in order: loaded, sent, done, kept.'
    }),
    S('references', 0, 'References', {
      scene: 'references',
      groups: [
        { icon: '🔍', title: 'Debug and Troubleshoot', z: 'local', items: [
          { href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view', label: 'Debug chat interactions', description: 'Chat Debug view and Agent Debug Logs.' },
          { href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting', label: 'Troubleshoot agents', description: '/troubleshoot and customization diagnostics.' },
          { href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/cache-explorer', label: 'Cache Explorer', description: 'Find where consecutive requests diverge.' }
        ] },
        { icon: '🧩', title: 'Context and Customization', z: 'purple', items: [
          { href: 'https://code.visualstudio.com/docs/agent-customization/overview', label: 'Agent customization overview', description: 'Agent Customizations editor.' },
          { href: 'https://code.visualstudio.com/docs/agents/concepts/context', label: 'Context and compaction', description: 'What the window holds and what gets summarized.' },
          { href: 'https://code.visualstudio.com/docs/agents/run/subagents', label: 'Subagents', description: 'Context isolation and transcripts.' }
        ] },
        { icon: '📈', title: 'Observability', z: 'green', items: [
          { href: 'https://code.visualstudio.com/docs/agents/guides/monitoring-agents', label: 'Monitor agents with OpenTelemetry', description: 'Spans, attributes, and collectors.' },
          { href: 'https://code.visualstudio.com/updates/v1_145', label: 'VS Code release notes: v1.145', description: 'Agent verbosity and the latest changes.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Copilot Chat Internals', {
      scene: 'thanks', chrome: false,
      subtitle: 'What loaded, what was sent, what it did, and the trail you keep.',
      cards: [{ value: '4 questions', detail: 'One order to localize a surprise' }, { value: '1 command', detail: '/troubleshoot, confirmed in Logs' }, { value: '1 trail', detail: 'File logs and OTel for the team' }],
      prompt: 'Which surprise will you read the evidence for first?'
    })
  ];

  /* Speaker notes: the talk track for each slide.
     notes: lines starting with " are spoken; lines starting with → bridge to the next slide; others are presenter direction.
     know: facts to have ready for questions. sources: first-party evidence. seconds: time budget (estimates until a timed run-through). */
  const U = (v) => ({ label: `VS Code release notes: v${v.replace('_', '.')}`, href: `https://code.visualstudio.com/updates/v${v}` });
  const SRC = {
    chatDebug: { label: 'Debug chat interactions (Chat Debug view, Agent Debug Logs)', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view' },
    troubleshooting: { label: 'Troubleshoot agents', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting' },
    diagnostics: { label: 'Check customization diagnostics', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting#_check-customization-diagnostics' },
    instrRef: { label: 'Custom instructions reference: discovery and activation', href: 'https://code.visualstudio.com/docs/agents/reference/custom-instructions-reference#_discovery-and-activation' },
    inspect: { label: 'Inspect chat interactions with /troubleshoot', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting#_inspect-chat-interactions' },
    cache: { label: 'Cache Explorer', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/cache-explorer' },
    custom: { label: 'Agent customization overview (Agent Customizations editor)', href: 'https://code.visualstudio.com/docs/agent-customization/overview#_agent-customizations-editor' },
    context: { label: 'Context in agent sessions', href: 'https://code.visualstudio.com/docs/agents/concepts/context' },
    subagents: { label: 'Subagents', href: 'https://code.visualstudio.com/docs/agents/run/subagents' },
    agentsWindow: { label: 'Use the Agents window', href: 'https://code.visualstudio.com/docs/agents/run/agents-window' },
    hooks: { label: 'Hooks', href: 'https://code.visualstudio.com/docs/agent-customization/hooks' },
    mcp: { label: 'Troubleshoot MCP servers', href: 'https://code.visualstudio.com/docs/agents/run/manage-mcp-servers#_troubleshoot-mcp-servers' },
    monitoring: { label: 'Monitor agents with OpenTelemetry', href: 'https://code.visualstudio.com/docs/agents/guides/monitoring-agents' },
    cliOtel: { label: 'Copilot CLI reference: OpenTelemetry monitoring', href: 'https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference#opentelemetry-monitoring' },
    evals: { label: 'Chat Customizations Evaluations (Marketplace)', href: 'https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-chat-customizations-evaluations' },
    v110panel: { label: 'v1.110: Agent Debug panel (Preview)', href: 'https://code.visualstudio.com/updates/v1_110#_agent-debug-panel-preview' },
    v110compact: { label: 'v1.110: Context compaction', href: 'https://code.visualstudio.com/updates/v1_110#_context-compaction' },
    v119: { label: 'v1.119: OpenTelemetry tracing for agent sessions', href: 'https://code.visualstudio.com/updates/v1_119#_opentelemetry-tracing-for-agent-sessions' },
    v120compress: { label: 'v1.120: Terminal tool output compression (Preview)', href: 'https://code.visualstudio.com/updates/v1_120#_terminal-tool-output-compression-preview' },
    v121grafana: { label: 'v1.121: Agents observability with OpenTelemetry and Grafana', href: 'https://code.visualstudio.com/updates/v1_121#_agents-observability-with-opentelemetry-and-grafana' },
    v122otel: { label: 'v1.122: Richer OpenTelemetry signals for agents', href: 'https://code.visualstudio.com/updates/v1_122#_richer-opentelemetry-signals-for-agents' },
    v122ctx: { label: 'v1.122: 1M context window for Anthropic and OpenAI models', href: 'https://code.visualstudio.com/updates/v1_122#_1m-context-window-for-anthropic-and-openai-models' },
    v128otel: { label: 'v1.128: Manage Copilot telemetry export with OpenTelemetry', href: 'https://code.visualstudio.com/updates/v1_128#_manage-copilot-telemetry-export-with-opentelemetry' },
    v145: { label: 'v1.145: Choose agent verbosity', href: 'https://code.visualstudio.com/updates/v1_145#_choose-agent-verbosity' },
    v111: U('1_111'), v112: U('1_112'), v113: U('1_113'), v114: U('1_114'), v116: U('1_116'), v120: U('1_120'),
    v121: U('1_121'), v126: U('1_126'), v127: U('1_127'), v128: U('1_128'), v131: U('1_131'), v142: U('1_142'), v144: U('1_144')
  };

  const NOTES = {
    title: { seconds: 30, sources: [SRC.chatDebug],
      notes: [
        `"Every agent run in VS Code leaves evidence: what loaded, what the model received, what the agent did. Today we read it."`,
        `Set the frame: this is a clinic. Everything shown is in VS Code today; versions are on the slides so the audience can check their own build.`,
        `→ Start with the question everyone in the room has asked.`
      ],
      know: [
        `Version range covered: VS Code 1.110 (February 2026) through 1.145 (November 2026).`,
        `Several views are still Preview or Experimental; each slide says which.`
      ] },
    'core-question': { seconds: 90,
      notes: [
        `"Why didn't the agent do what I expected, and how do I find out? Every agent run leaves evidence. Read it in order and the surprise has an address."`,
        `Walk the four chips left to right: loaded, sent, done, kept. They are the four parts of the talk.`,
        `Role cards: developers localize a surprise; team leads check shared instructions reach everyone; platform engineers put traces on the dashboards the team already reads.`,
        `"The order matters. If the rule never loaded, nothing about the model or the prompt wording can fix it."`,
        `→ Four parts, one per question.`
      ] },
    contents: { seconds: 30,
      notes: [
        `"Did my setup load, what did the model receive, what did the agent do, and how do we keep the trail."`,
        `Part 3 is the centerpiece: the agent explains its own run, and we check the explanation.`,
        `→ "First, what moved since early 2026."`
      ] },
    'one-surprise': { seconds: 120, sources: [SRC.troubleshooting],
      notes: [
        `"Here is the surprise we follow all talk. We asked the agent to add an orders endpoint. The team has a rule: log every request with its correlation ID. The new handler has no logging."`,
        `This is a worked example with fictional file names; it stands in for any ignored instruction. Say so once here.`,
        `Walk the rows. Each question has one place that answers it: Discovery events, the Chat Debug view, Agent Debug Logs, and file logging plus OpenTelemetry.`,
        `"Each answer rules out a whole class of cause. That is how a vague surprise becomes a located fault."`,
        `→ First question: did the rule even load?`
      ],
      know: [
        `Common first reaction: rephrase the prompt or reload the window. Both change the run before you have read the evidence of the one that surprised you.`
      ] },

    'part-1': { seconds: 20, sources: [SRC.diagnostics],
      notes: [
        `"Most surprises start before the model sees anything. A file VS Code skipped, rejected, or never found."`,
        `The worked example from here on: api-logging.instructions.md, release.agent.md, and services/orders/handler.ts are fictional names.`,
        `→ Start with the inventory.`
      ] },
    'customizations-editor': { seconds: 90, sources: [SRC.custom, SRC.diagnostics, SRC.v113, SRC.v144],
      notes: [
        `"Chat: Open Customizations shows every instruction, prompt, agent, skill, hook, MCP server, and plugin VS Code found, with where each came from."`,
        `Point at the orange row: a custom agent with a frontmatter error. The editor flags it on the file's own row.`,
        `"If your file is not in this list, VS Code never found it. Check the folder and the file name first."`
      ],
      cue: [
        `Run <b>Chat: Open Customizations</b> from the Command Palette.`,
        `Open the <b>Instructions</b> tab and point at the source location for each file.`,
        `Open a file with an error and show the message.`
      ],
      know: [
        `The editor shipped as the Chat Customizations editor (Preview, v1.113); current docs call it the Agent Customizations editor. The command is still Chat: Open Customizations.`,
        `Canvases joined the editor's sections in v1.144. A welcome page with AI-assisted "Customize Your Agent" generation arrived in v1.116.`,
        `Monorepos: chat.useCustomizationsInParentRepositories (v1.112) discovers customization files from parent folders.`,
        `The custom-agent property <code>infer</code> is replaced by <code>user-invocable</code> and <code>disable-model-invocation</code> [verify the version that changed].`
      ] },
    'discovery-events': { seconds: 120, sources: [SRC.diagnostics, SRC.chatDebug],
      notes: [
        `"The inventory says what VS Code found. Discovery events say what happened to each file on this run: loaded, skipped, or rejected, and why."`,
        `Walk the three steps top to bottom. "Step one is the one people miss: capture has to be on before you reproduce. Turn it on, then rerun the request that surprised you."`,
        `"Open the panel from the Chat view's ... menu, pick the session, and filter to Discovery."`,
        `Point at the skipped row: the logging rule. Point at the rejected row: the agent with broken frontmatter.`,
        `"A silent miss becomes a visible line with a reason."`,
        `→ Why would a rule that exists be skipped?`
      ],
      cue: [
        `Before the talk: enable <code>chat.agentHost.agentDebugLog.enabled</code> (Local harness: <code>github.copilot.chat.agentDebugLog.fileLogging.enabled</code>, then reload the window) and run one request that triggers the skipped rule.`,
        `In the Chat view, select the <b>...</b> menu, then <b>Show Agent Debug Logs</b> (or run <b>Developer: Open Agent Debug Logs</b>).`,
        `Select the session, open the <b>Logs</b> view, and set the event filter to <b>Discovery</b>.`,
        `Expand the skipped event and read its reason aloud.`
      ],
      know: [
        `Both capture settings are experimental, and the Agent Debug Logs panel is in Preview. chat.agentHost.agentDebugLog.enabled covers Agent Host sessions in the Chat view and the Agents window; the Local harness uses github.copilot.chat.agentDebugLog.fileLogging.enabled and needs a window reload before /troubleshoot can read the logs.`,
        `Capture is not retroactive: a run made before the setting was on has no events. Reproduce after enabling.`,
        `The Logs view shows a flat list or a tree grouped by subagent. Its filters cover model requests, tool calls, discovery, and errors. The panel keeps current and past sessions; persisted logs stay on the local machine.`,
        `Debug logs can contain prompts, source code, file paths, and tool inputs and outputs. Review them before sharing.`,
        `The rows on the slide paraphrase the events. Capture a real Discovery event from your build before presenting and match its wording [verify].`
      ] },
    'applyto-miss': { seconds: 120, sources: [SRC.instrRef, SRC.chatDebug, SRC.diagnostics],
      notes: [
        `"The rule's applyTo targets src/api. The agent put the new handler in services/orders. The pattern does not match, so the rule never applies to that file."`,
        `Walk the four steps. "Read the pattern in the file itself, find the file the agent actually touched in the Logs view, and put them side by side."`,
        `"Nothing errors. The file is valid; it just does not apply. That is why it feels like the agent ignored you."`,
        `"Fix the pattern, repeat the task in a new chat, and check the same event: it now says loaded."`
      ],
      cue: [
        `Run <b>Chat: Open Customizations</b>, open the <b>Instructions</b> tab, and open api-logging.instructions.md. Point at the <code>applyTo</code> line in the frontmatter.`,
        `In <b>Agent Debug Logs</b>, select the session, filter the <b>Logs</b> view to tool calls, and expand the edit call to show the file path.`,
        `Switch the filter to <b>Discovery</b> and expand the event for the same instruction file.`,
        `Add the second pattern, start a new chat, repeat the request, and show the event now reads loaded.`
      ],
      know: [
        `applyTo takes one or more comma-separated glob patterns. There is no default; <code>**</code> matches all files.`,
        `Patterns are relative to the workspace or project root, not the folder that holds the instruction file. Use / separators on every operating system.`,
        `In Copilot sessions, applyTo targets the files the agent works with. In Local sessions, matching file context attaches the instructions automatically when chat.includeApplyingInstructions is on, and the description can offer the file for on-demand loading.`,
        `Because matching depends on the files in play, the same rule can load on one run and skip on the next.`,
        `Discovery means the file was found; inclusion means its text reached the request. Neither guarantees the model follows it. Confirm inclusion in the Chat Debug view (next part).`,
        `Claude rules in .claude/rules use a <code>paths</code> array instead of applyTo.`,
        `Before widening a pattern, decide with the rule's owner whether the rule really belongs to the new folder.`
      ] },
    'evaluations-lint': { seconds: 120, sources: [SRC.evals],
      notes: [
        `"A rule can load and still confuse the model. Two lines that contradict each other give it a coin toss."`,
        `Walk the three steps: install once, analyze the open file, read the Problems panel.`,
        `Point at line 9 against line 4, then the vague line 12. "Each finding has a line number, so you go straight to the sentence."`,
        `"Treat each finding as a review comment: it is a model's reading of your rules, and you decide what changes."`,
        `→ The rule is loaded and clear. Did the model actually receive it?`
      ],
      cue: [
        `Before the talk: install <b>Chat Customizations Evaluations</b> from the Extensions view and sign in to GitHub Copilot.`,
        `Open api-logging.instructions.md and select the beaker icon in the editor title bar (or run <b>Chat Customizations Evaluations: Analyze Prompt</b>).`,
        `Press <b>Ctrl+Shift+M</b> to open the Problems panel and select the contradiction finding to jump to line 9.`,
        `Alternative in chat: with the file active, type <code>/analyze-prompt</code>; the chat summarizes the same diagnostics.`,
        `Delete or reconcile one line, analyze again, and show the finding clear.`
      ],
      know: [
        `Extension: Chat Customizations Evaluations, ms-vscode.vscode-chat-customizations-evaluations, published by Microsoft, MIT license. It checks SKILL.md, *.agent.md, *.instructions.md, and *.prompt.md files.`,
        `Analysis runs through GitHub Copilot, so it needs a Copilot sign-in and no API key. Findings are LLM-generated, so the same file can produce slightly different findings on another run.`,
        `Checks: contradictions, semantic ambiguity with rewrite suggestions, persona consistency, cognitive load, semantic coverage, and conflicts with files the prompt links to.`,
        `Team-specific checks: chatCustomizationsEvaluations.customDiagnostics takes an array of { name, description } objects.`,
        `For skills, the extension also scaffolds and runs Waza evaluations (Create Waza Eval Scaffold, Run Waza Evaluation).`,
        `No VS Code release note names this extension; its ship version and date are [verify]. The how-to steps come from its Marketplace page.`
      ] },

    'part-2': { seconds: 20, sources: [SRC.chatDebug],
      notes: [
        `"A loaded file still has to reach the prompt, fit in the window, and survive compaction."`,
        `→ Open the request itself.`
      ] },
    'chat-debug-anatomy': { seconds: 120, sources: [SRC.chatDebug],
      notes: [
        `"Developer: Show Chat Debug View opens every request the agent sent to the model. Each one has five sections."`,
        `Walk them top to bottom: system prompt, user prompt, context, response, tool responses.`,
        `"The system prompt is the one we care about for our surprise: it carries the customizations that loaded."`,
        `"The response section shows tool calls the model asked for; tool responses show what came back. Together they explain most odd actions."`
      ],
      cue: [
        `Run <b>Developer: Show Chat Debug View</b>.`,
        `Pick the request for the orders endpoint and expand <b>System prompt</b>.`
      ],
      know: [
        `The Chat Debug view is separate from the Agent Debug Logs panel: Chat Debug shows the content of each model request; Agent Debug Logs shows the sequence of events.`,
        `For customizations, the troubleshooting doc points at the System prompt and References sections [verify where instruction text appears in your build].`
      ] },
    'prove-in-prompt': { seconds: 90, sources: [SRC.chatDebug, SRC.diagnostics],
      notes: [
        `"Search the system prompt for a phrase only your rule uses. For us: correlation ID."`,
        `"If it is there, the model received the rule; the question moves to what it did. If it is absent, the model never saw it, and we go back to Discovery."`,
        `"If you only find a summary of an older turn, compaction ran. That is the next slide."`,
        `→ How full was the window?`
      ] },
    'context-window': { seconds: 90, sources: [SRC.context, SRC.v120, SRC.v126, SRC.v122ctx, SRC.v142],
      notes: [
        `"The context indicator tells you how much room is left and what the session has cost."`,
        `Walk the four cards: tokens used, percent full, session cost in AI credits, and the window size you picked.`,
        `"A gauge close to full predicts compaction. When the agent forgets something from an hour ago, look here first."`
      ],
      know: [
        `Token usage became accurate for BYOK models in v1.120. Session cost in AI credits joined the session info popover in v1.126.`,
        `1M-token windows for compatible Anthropic and OpenAI models arrived in v1.122, with higher AI credit use.`,
        `Context size and thinking effort share one picker (v1.126); since v1.142 you set both by hovering a model in the picker.`,
        `The March version of this talk described a per-category token breakdown on hover; confirm it in your build before showing it [verify].`
      ] },
    'compaction': { seconds: 120, sources: [SRC.context, SRC.v110compact, SRC.v121, SRC.subagents],
      notes: [
        `"Near the limit, VS Code summarizes older turns. The docs say it plainly: details from earlier messages can be summarized or omitted."`,
        `Walk the cards. Automatic compaction runs in the background. /compact lets you compact now and name what to keep: for example, /compact focus on the logging rule and the test results.`,
        `"A new chat inside the session keeps your files and changes and drops the conversation. A subagent isolates a side task so it never fills the main window. Isolation is different from summarization."`,
        `→ Two more things shrink what the model sees, on purpose.`
      ],
      know: [
        `/compact and automatic compaction shipped in v1.110, including for background and Claude agent sessions.`,
        `v1.121: background compaction reuses the main agent's prompt cache.`,
        `A sudden loss of a constraint or repeated questions after a long session are compaction symptoms; re-anchor by restating the constraint or starting a new chat in the session.`
      ] },
    'smaller-context': { seconds: 60, sources: [SRC.v120compress, SRC.v121],
      notes: [
        `"Terminal output compression trims npm install noise, long listings, and lockfile diffs before the model reads them. Deferred tools load about 30 core tools and find the rest with tool search."`,
        `"Both leave room for what matters. They also explain a debugging surprise: if the agent missed a line in a long build log, check whether compression trimmed it."`
      ],
      know: [
        `Setting: chat.tools.compressOutput.enabled (Preview, v1.120).`,
        `Deferred tools and tool_search: v1.121 release notes, alongside cache breakpoint placement at the end of the system prompt, the end of tools, the last turn, and turn boundaries. VS Code reported more than 93% cache reuse with that placement.`
      ] },
    'cache-explorer': { seconds: 120, sources: [SRC.cache, SRC.chatDebug],
      notes: [
        `"When a session gets slow or input tokens climb, the Summary view tells you whether cache reuse dropped. Cache Explorer tells you why."`,
        `Walk the steps. "Pick the slow turn. Cache Explorer lines it up against the request just before it and marks the first place they stop matching."`,
        `Point at the orange row: "Someone enabled an MCP server between turns. The tool definitions changed, so the provider can reuse less of the earlier prefix."`,
        `"Then decide. If the task needs that server, keep it and accept the lower reuse. If it doesn't, pick your tools before you start the session."`,
        `"Quality beats the cache metric. Never strip instructions or tools the task needs just to raise reuse."`,
        `→ We know what the model received. Now, what did the agent do with it?`
      ],
      cue: [
        `Before the talk: run a session with two requests and enable an MCP server between them.`,
        `In the Chat view, select <b>...</b> > <b>Show Agent Debug Logs</b>, select the session, then select the session description in the breadcrumb to open <b>Summary</b>.`,
        `Select <b>Cache Explorer</b>, then the second turn in the side panel.`,
        `Point at <b>Cache performance</b>, then the first divergence in <b>Prompt signature</b>, then expand the tool definitions under <b>Components</b>.`
      ],
      know: [
        `Prompt caching depends on the provider and model. When it is supported, the provider can reuse an unchanged prefix of an earlier request, so a change early in the request reduces the reusable prefix.`,
        `The main area has three parts: Cache performance (reported cache percentage and reused input tokens), Prompt signature (request components with the first divergence marked), and Components (expandable text diffs).`,
        `The side panel lists model turns grouped by user request, with cache hit percentage, duration, model, and timestamp. A turn with no earlier model request has nothing to compare.`,
        `If the Summary view shows no cache information, the model or provider might not report it; use the Logs view for duration, errors, and tool calls instead.`,
        `Keep requests stable: choose model, reasoning effort, context size, and tools before the first request; avoid editing instruction or agent files mid-comparison; attach only the context the task needs; use a subagent for separate research; reset with a new session or /compact when history stops helping.`,
        `Some components are assembled by VS Code, extensions, or the provider. If the divergence is outside your configuration, treat it as evidence, not something to prompt around.`,
        `A change in the diff is evidence about request structure, not proof that caching caused all of the latency.`
      ] },

    'part-3': { seconds: 20, sources: [SRC.chatDebug, SRC.v110panel],
      notes: [
        `"Every tool call, hook, and subagent is an event. Then the agent explains its own run, and we check it."`,
        `The /troubleshoot answer on the coming slides is an example built on the same fictional files.`
      ] },
    'debug-logs-views': { seconds: 90, sources: [SRC.chatDebug, SRC.v110panel, SRC.v116],
      notes: [
        `"Developer: Open Agent Debug Logs. Four views: Logs, Summary, the agent flow chart, and Cache Explorer."`,
        `"Logs is the raw record. Summary is the totals. The flow chart is the shape of the run. Cache Explorer is cost."`
      ],
      cue: [`Run <b>Developer: Open Agent Debug Logs</b>, or open the Chat view's <b>...</b> menu and choose <b>Show Agent Debug Logs</b>.`],
      know: [
        `Shipped as the Agent Debug panel (Preview) in v1.110, replacing the Diagnostics chat action; renamed Agent Debug Logs in v1.116. Still Preview as of November 2026.`,
        `Debug logs cover Copilot CLI and Claude CLI sessions since v1.113.`
      ] },
    'logs-tree': { seconds: 90, sources: [SRC.chatDebug],
      notes: [
        `"This is the Logs view in tree mode. Each step sits under the request that caused it, so you read the run top to bottom."`,
        `Walk the levels: Discovery and the first model request at the top, the tool calls, subagent, and hook it triggered one level in, and the subagent's own tools one level further.`,
        `Point at the orange row, two levels deep: an MCP tool call inside the Explore subagent returned an error. Expand it to read the message and the inputs that produced it.`,
        `"On a long run, select the Errors filter and the tree collapses to exactly this row. The tree answers who did it: the main agent, a subagent, a tool, or a hook."`
      ],
      cue: [
        `In the Agent Debug Logs panel, open <b>Logs</b>, switch the view from list to tree, then select the errors filter.`,
        `Expand the failing event to show its message.`
      ],
      know: [
        `The toolbar filters cover model requests, tool calls, discovery, and errors; tree mode groups events by subagent.`,
        `Event and tool names on the slide are examples built on the deck's fictional repository; labels in your build may differ [verify against your build].`
      ] },
    'summary-view': { seconds: 75, sources: [SRC.chatDebug],
      notes: [
        `"Summary gives you four totals for the session: tool calls, tokens, errors, and duration."`,
        `"Read the totals first. A count of errors above zero has an event worth opening. A spike in tool calls points to a loop."`
      ] },
    'flow-chart': { seconds: 90, sources: [SRC.chatDebug, SRC.subagents],
      notes: [
        `"The flow chart shows who handed work to whom. Your request goes to the main agent, and every line out of it is a handoff."`,
        `Trace the branches: the Explore subagent with its own search and read tools, the terminal running the tests, and the format hook after each edit.`,
        `Point at the selected Explore node and its card: who handed it the work, that it ran in its own context, what it called, and what it returned.`,
        `"When a result looks wrong, the chart tells you which branch produced it. Select that node and you are looking at its event."`
      ],
      cue: [
        `In the Agent Debug Logs panel, select the session in the breadcrumb to open <b>Summary</b>, then choose <b>Agent Flow Chart</b>.`,
        `Pan and zoom to the subagent branch, then select its node to inspect the event.`
      ],
      know: [
        `Plan mode uses the Explore subagent for read-only codebase research since v1.110.`,
        `Node names on the slide are examples from the deck's fictional run.`
      ] },
    'subagents': { seconds: 90, sources: [SRC.subagents, SRC.agentsWindow, SRC.v127, SRC.v128, SRC.v131],
      notes: [
        `"A subagent starts fresh. It sees only what the parent passes it, so a rule in the parent's conversation may never reach it."`,
        `"Its work is visible: a read-only peer chat in the Agents window, live status inline, and its own cost on hover."`
      ],
      know: [
        `Local harness: the runSubagent tool starts a subagent; it does not inherit main conversation history unless passed explicitly.`,
        `Nested subagents: chat.subagents.allowInvocationsFromSubagents (v1.113).`,
        `A SKILL.md <code>context</code> attribute can run a skill in a dedicated subagent context [verify version].`
      ] },
    'reasoning-verbosity': { seconds: 75, sources: [SRC.v113, SRC.v142, SRC.v145],
      notes: [
        `"Two separate controls. Thinking effort sets how hard the model reasons. View Mode sets how much of that work the transcript shows you."`,
        `Walk the three modes: Conversation, Compact (the default), and Verbose.`,
        `"When you are debugging, switch to Verbose for that session and read the steps as they happen."`
      ],
      know: [
        `Thinking effort arrived in the model picker in v1.113, replacing github.copilot.chat.anthropic.thinking.effort and github.copilot.chat.responsesApiReasoningEffort. It reached Copilot CLI in v1.116 and BYOK reasoning models in v1.120.`,
        `v1.142 redesigned the picker: hover a model to set effort and context size.`,
        `View Mode: Chat view, More Actions menu; setting chat.persistentProgressVerbosity (Experimental, v1.145).`
      ] },
    'troubleshoot-explained': { seconds: 120, sources: [SRC.inspect, SRC.v112, SRC.v114, SRC.v127],
      notes: [
        `"So what just happened? /troubleshoot did in one answer what we did by hand: read the events, follow the tree, pick the branch."`,
        `Left column: /troubleshoot is a chat skill, in Preview. It reads the session's captured debug events, the same records the panel shows, and answers the one question you type after it.`,
        `Middle column: it works on any session whose events were captured. Agent Host sessions in the Chat view or the Agents window need chat.agentHost.agentDebugLog.enabled. Local harness sessions need file logging turned on and a window reload. Add #session to point it at an earlier run.`,
        `Point at the bar under the columns. "The catch: capture is not retroactive. Turn logging on, reproduce the problem, then ask."`,
        `Right column: the four problem families from the release notes, each with a question that fits it. Customizations that did not load, tools or subagents used or skipped, slow responses, and network failures.`,
        `"Ask one narrow question per request. A narrow question gets an answer you can check against a single event."`,
        `→ "Back to the answer we got. It is a hypothesis, so let's prove it."`
      ],
      cue: [
        `Show the setting in Settings: search <code>agentDebugLog</code> to show both capture settings.`,
        `In the Agents window, type <code>/troubleshoot #session</code> and show the session picker.`
      ],
      know: [
        `/troubleshoot (Preview) arrived in v1.112. Its release note lists four uses: why tools or subagents were used or skipped, why instructions or skills did not load, what made responses slow, and whether network connectivity problems occurred.`,
        `v1.112 read JSONL debug files from github.copilot.chat.agentDebugLog.fileLogging.enabled; current docs use chat.agentHost.agentDebugLog.enabled for Agent Host sessions and keep file logging for Local harness sessions.`,
        `#session for past sessions arrived in v1.114; /troubleshoot #session for Agents window sessions in v1.127.`,
        `Alternative without a slash command: the sparkle icon in the Agent Debug Logs panel attaches a snapshot of the session's events to chat.`,
        `The questions in the right column are examples; the first two come from the docs.`
      ] },
    'troubleshoot': { seconds: 90, sources: [SRC.inspect],
      notes: [
        `"Now the agent explains its own run. Type /troubleshoot and ask one question."`,
        `Let the transcript play. Read the skipped line aloud: the file, the pattern, and the file it missed.`,
        `"That is the whole Part 1 investigation in one answer. It read the same Discovery events we read by hand."`,
        `"Notice the last two lines. This is a hypothesis, and we will confirm it."`,
        `→ "First, what exactly did it read, and where does it work?"`
      ],
      cue: [
        `In the session that ignored the rule, type <code>/troubleshoot Which customizations were loaded, and did any fail?</code>`,
        `For an earlier run, add <code>#session</code> and pick it from the list.`
      ],
      know: [
        `The answer on the slide is an example; real wording varies by run.`
      ] },
    'troubleshoot-verify': { seconds: 90, sources: [SRC.chatDebug, SRC.diagnostics],
      notes: [
        `"The explanation is fast. The event makes it trustworthy."`,
        `Start on the left: the claim, word for word from the /troubleshoot answer.`,
        `Follow each line to its evidence. The Logs view Discovery event names the same file as skipped. The Chat Debug view system prompt has no correlation ID text, so the rule never reached the model.`,
        `"Then fix the pattern and run it again. Discovery shows loaded, and the rule text is in the prompt."`,
        `"Two independent views agree with the claim, and the fixed run proves it. Now we know."`
      ],
      cue: [
        `In Agent Debug Logs, filter <b>Logs</b> to Discovery and find the instructions file.`,
        `In the Chat Debug view, open the request's <b>System prompt</b> and search it with Ctrl+F for the rule text.`
      ],
      know: [`When /troubleshoot and the events disagree, trust the events and ask a narrower question.`] },
    'mcp-hooks': { seconds: 105, sources: [SRC.troubleshooting, SRC.mcp, SRC.hooks, SRC.monitoring],
      notes: [
        `"Some failures live outside the model. MCP servers and hooks run as their own processes, and their own output says why they failed."`,
        `Left panel, MCP. Walk the four steps: MCP: List Servers and the server's status, Show Output for the error, fix and Restart Server, then retry.`,
        `"The sneaky case is a server that runs fine and a tool the model never calls. Open the Chat Debug view and look for the tool in the tool definitions. If it is not there, the model never had the option."`,
        `Right panel, hooks. Confirm which harness the session uses and where the hook comes from, then run the script by hand with a safe sample event and read its exit status and JSON.`,
        `"A hook file in the editor does not prove it ran. Start a throwaway session and find the hook event in Agent Debug Logs."`,
        `"Test timeouts on their own: a preToolUse error denies the tool call, but a timeout falls through to normal permissions."`,
        `→ Everything so far lives in one window. Part 4 keeps it.`
      ],
      cue: [
        `Run <b>MCP: List Servers</b>, select a server, and choose <b>Show Output</b>.`,
        `In Agent Debug Logs, filter to tool calls and point at a hook event.`
      ],
      know: [
        `MCP steps follow the docs' Troubleshoot MCP servers procedure; the tool-not-invoked steps follow Debug chat interactions.`,
        `Hook formats: the Copilot harness (shared by VS Code, the GitHub Copilot app, and Copilot CLI), Claude, and Codex each have their own reference; the older Local harness has a separate reference for migration. A shared file location does not make a hook compatible.`,
        `Old Local setups: Chat: Configure Hooks lists the files, and the GitHub Copilot Chat Hooks output channel shows command errors.`,
        `Agent-scoped hooks in .agent.md frontmatter: chat.useCustomAgentHooks (v1.111).`,
        `Hook logging: keep full prompts, arguments, and environment variables out of hook logs.`,
        `Servers discovered from plugins and extensions show in the Customizations editor (around v1.141) [verify version].`,
        `The legacy .vscode/mcp.json is labeled deprecated in the guided Add Server flow since around v1.140 [verify version].`
      ] },

    'part-4': { seconds: 20, sources: [SRC.chatDebug, SRC.monitoring],
      notes: [
        `"Evidence that outlives the window lets a teammate, or a dashboard, read the same run."`,
        `→ Start with the file on disk.`
      ] },
    'file-logging': { seconds: 90, sources: [SRC.chatDebug, SRC.v112, SRC.v116, SRC.v111, SRC.v114],
      notes: [
        `"Turn on file logging once. Every session writes JSONL to disk and stays readable after you close the window."`,
        `Point at the two settings: one for the Local harness, one for Agent Host sessions in the Chat view and the Agents window.`,
        `"/troubleshoot #session reopens a past run. #debugEventsSnapshot attaches the events to a chat."`
      ],
      know: [
        `v1.112 introduced JSONL files with two settings; v1.116 persisted logs across sessions and merged them into github.copilot.chat.agentDebugLog.fileLogging.enabled.`,
        `#debugEventsSnapshot: v1.111.`
      ] },
    'export-share': { seconds: 75, sources: [SRC.chatDebug, SRC.v112],
      notes: [
        `"Export the session, and a teammate imports it and reads the same events on their machine."`,
        `Point at the orange row. "Logs carry your prompts, file content, and tool output. You decide what leaves your machine; read before you share."`
      ],
      know: [
        `Export and import (Preview) arrived in v1.112. Current docs say export produces an OpenTelemetry JSON file in OTLP format.`
      ] },
    'otel': { seconds: 120, sources: [SRC.monitoring, SRC.v119, SRC.v122otel, SRC.cliOtel],
      notes: [
        `"OpenTelemetry turns every run into a trace your existing tools already read."`,
        `Walk the tree: invoke_agent is the root; chat, execute_tool, and execute_hook nest under it.`,
        `"It works for local sessions, Copilot CLI background sessions, and Claude agents."`
      ],
      cue: [`Show the two settings: <code>github.copilot.chat.otel.enabled</code> and <code>github.copilot.chat.otel.otlpEndpoint</code>.`],
      know: [
        `Shipped in v1.119 using GenAI semantic conventions: traces, metrics, and events.`,
        `v1.122 added the github.copilot.* namespace matching Copilot CLI: repository context, agent type, structured tool parameters, and hook outcomes. copilot_chat.* is legacy.`,
        `Copilot CLI documents the same conventions in its command reference.`
      ] },
    'team-dashboard': { seconds: 90, sources: [SRC.v128otel, SRC.v121grafana, SRC.monitoring],
      notes: [
        `"The org decides where traces go. Admins can set the collector endpoint in Copilot managed settings."`,
        `Walk the path: managed settings, the OTel Collector, Application Insights, and the prebuilt Azure Managed Grafana dashboard.`,
        `"Agree on the destination and on who can read it before you turn it on; traces describe your code and your prompts."`
      ],
      know: [
        `Managed telemetry export: v1.128. Prebuilt Grafana dashboard: v1.121.`,
        `Any OTLP-compatible collector works; the Azure path is the one VS Code documented with a ready dashboard.`
      ] },
    'decision-map': { seconds: 120, sources: [SRC.troubleshooting, SRC.chatDebug, SRC.cache, SRC.monitoring],
      notes: [
        `"This is the slide to photograph. Start from the symptom you see, and open the view that answers it."`,
        `Walk all seven rows quickly; each maps back to a part of the talk.`,
        `"When nothing fits, ask /troubleshoot, then confirm in the Logs view."`
      ] },
    'what-changed': { seconds: 60, sources: [SRC.v110panel, SRC.v116, SRC.v113, SRC.v126, SRC.custom],
      notes: [
        `"Before the story starts: if you learned this in early 2026, a few names moved. Here is the map, so nothing later surprises you."`,
        `Walk the list. The Diagnostics action and Edit Mode are gone; the panel and settings were renamed; the docs moved.`,
        `"Old links to /docs/copilot return a 404; every link in this talk uses the new paths."`,
        `→ "Now the surprise we follow all talk."`
      ],
      know: [
        `Edit Mode: deprecated v1.110, removed with its setting in v1.126.`,
        `No release note dates the docs move from /docs/copilot to /docs/agents [verify date if asked].`,
        `Also gone: the built-in Ollama provider (v1.127, use the Ollama extension) and the OpenAI Compatible provider (marked for deprecation in v1.121, replaced by Custom Endpoint).`
      ] },

    'before-after': { seconds: 60,
      notes: [
        `"Each column is one question from the start of the talk, and one habit swapped for one piece of evidence."`,
        `Walk left to right: guessing became the Discovery event, re-prompting became the system prompt, reloading became /troubleshoot plus the Logs view, and lost evidence became file logs and traces.`,
        `"Every surprise now ends with a named event."`
      ] },
    today: { seconds: 90, sources: [SRC.chatDebug, SRC.inspect],
      notes: [
        `"Today, on your next surprise: open Agent Debug Logs, ask /troubleshoot one question, and confirm the answer in the Logs view."`,
        `This week, turn on file logging, check every team instruction's Discovery status, and find one rule in the system prompt. This month, agree with your admin where traces go and send spans to a team collector.`,
        `"Read the evidence in order: loaded, sent, done, kept."`
      ],
      know: [
        `Signal that it worked: the next surprise ends with a named event, rather than a reworded prompt.`,
        `Boundary: several views are Preview or Experimental; names and layouts can change between releases.`
      ] },
    references: { seconds: 30,
      notes: [`Leave this up while questions start. Every link is first-party and current as of November 2026.`] },
    thanks: { seconds: 15,
      notes: [`"Which surprise will you read the evidence for first?" Take one from the room and walk it through the decision map.`] }
  };
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-chat-internals', title: 'Copilot Chat Internals', short: 'Chat Internals', category: 'tech-talks', source: 'tech-talks/copilot-chat-internals/README.md',
      question: 'Why didn\'t the agent do what I expected, and how do I find out?',
      thesis: 'Every agent run leaves evidence: what loaded, what the model received, what the agent did, and a trail you can keep. Read it in that order and a surprise becomes a located fault.'
    },
    slides
  };
})();
