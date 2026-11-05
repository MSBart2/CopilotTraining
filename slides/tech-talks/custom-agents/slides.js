/*
  Custom Agents — slide data and presenter notes.
  The notes carry the full talk track, boundaries, and evidence for the handout.
  Field support verified 2026-11-04 against the GitHub and VS Code references.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    config: { label: 'Custom agents configuration reference', href: 'https://docs.github.com/en/copilot/reference/custom-agents-configuration' },
    custom: { label: 'About custom agents', href: 'https://docs.github.com/en/copilot/concepts/customizations/custom-agents' },
    comparing: { label: 'Comparing GitHub Copilot customizations', href: 'https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations' },
    cli: { label: 'Create custom agents for Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli' },
    cloud: { label: 'Create custom agents for Copilot cloud agent', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents' },
    cloudEnv: { label: 'Customize the cloud agent environment', href: 'https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment' },
    app: { label: 'Customizing the GitHub Copilot app', href: 'https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app' },
    hooks: { label: 'About hooks for GitHub Copilot', href: 'https://docs.github.com/en/copilot/concepts/agents/hooks' },
    vscodeHooks: { label: 'VS Code: configure agent hooks', href: 'https://code.visualstudio.com/docs/agent-customization/hooks' },
    vscode: { label: 'VS Code: custom agents', href: 'https://code.visualstudio.com/docs/agent-customization/custom-agents' },
    vscodeFile: { label: 'VS Code: custom agent file reference', href: 'https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference' },
    vscodeDebug: { label: 'VS Code: Chat Debug view and Agent Debug Log', href: 'https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view' },
    agentFile: { label: 'FanHub test-writer.agent.md (example file)', href: 'https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md' }
  };

  /* The five surfaces, in the same order and colour everywhere. */
  const SURFACES = [
    { label: 'VS Code · Local harness', short: 'VS Code Local', z: 'local' },
    { label: 'VS Code · Copilot harness', short: 'VS Code Copilot', z: 'runtime' },
    { label: 'Copilot CLI', short: 'Copilot CLI', z: 'remote' },
    { label: 'Copilot cloud agent', short: 'Cloud agent', z: 'github' },
    { label: 'GitHub Copilot app', short: 'Copilot app', z: 'accent' }
  ];

  /* Table cell marks: green is documented for that surface, orange is skipped, purple is check in the app. */
  const ok = (t = 'Honored') => ({ t, z: 'green' });
  const off = (t) => ({ t, z: 'orange' });
  const CHECK = { t: 'Check in the app', z: 'purple' };
  const APP = { t: 'Check', z: 'purple' };

  const slides = [
    S('title', 0, 'Custom Agents', {
      chrome: false, visual: 'runtime-ring', subtitle: 'One File, Every Surface',
      tagline: 'Write the role once. Add surface fields on purpose.',
      meta: 'Foundations · Practitioner Tech Talk · 45 min',
      surfaces: SURFACES
    }),
    S('core-question', 0, 'How do I write one agent file that works in every Copilot surface my team uses?', {
      pill: 'Core Question', highlight: 'Write the role once. Add surface fields on purpose.',
      subtitle: 'Every surface reads the description and the body; each surface honors its own set of frontmatter fields.',
      routingLabel: 'Write for', routing: ['role', 'core', 'fields', 'confirm'],
      roles: [
        { icon: '🖥️', title: 'Fine in my editor', description: 'Then a teammate runs it from the CLI.' },
        { icon: '☁️', title: 'Assigned to cloud', description: 'An issue goes to cloud agent with it.' },
        { icon: '🔇', title: 'A field went quiet', description: 'A handoff or model setting did nothing.' }
      ],
      stats: [
        { title: '1 portable core', description: 'Description and body every surface reads.' },
        { title: '1 field table', description: 'What each field does on five surfaces.' },
        { title: '1 audit', description: 'Four checks for an agent your team shares.' }
      ]
    }),
    S('contents', 0, 'Four Moves to One Portable Agent', {
      sections: [
        { icon: '🧭', title: 'Choose the Custom Agent', subtitle: 'Role and anatomy', blurb: 'Confirm the work needs a role and name the three jobs in the file.', slide: 5 },
        { icon: '🧩', title: 'Write the Portable Core', subtitle: 'What every surface reads', blurb: 'Folder, ID, description, tools, body, and model.', slide: 8 },
        { icon: '📋', title: 'Add Surface Fields', subtitle: 'What works where', blurb: 'Read the five-surface table and place each field on purpose.', slide: 15 },
        { icon: '✅', title: 'Confirm and Apply', subtitle: 'See what loaded', blurb: 'Check each surface, start from a skeleton, audit one agent.', slide: 23 }
      ]
    }),
    S('lit-lines', 0, 'Every Surface Reads the Description and Body', {
      scene: 'lit-lines', pill: 'One File · Five Surfaces',
      fileLabel: '.github/agents/test-writer.agent.md',
      surfaces: SURFACES.map((x) => ({ label: x.short, z: x.z })),
      fileLines: [
        { code: 'description: Writes focused tests…', note: 'core', marks: [1, 1, 1, 1, 1] },
        { code: 'tools: [read, edit, search, execute]', marks: [1, 1, 1, 1, '?'] },
        { code: 'model: …', marks: [1, 1, 1, 0, '?'] },
        { code: 'handoffs: …', marks: [1, 0, 0, 0, '?'] },
        { code: 'strict-tools-list: true', marks: [0, 0, 1, 0, '?'] },
        { code: 'mcp-servers: …', marks: [0, 0, 1, 1, '?'] },
        { code: '# Role, boundary, method, contract', note: 'core', marks: [1, 1, 1, 1, 1] }
      ],
      footnote: 'Each frontmatter field lights only where its reference documents it. Checked 2026-11-04.'
    }),

    S('part-1', 1, 'Choose the Custom Agent', {
      scene: 'opener', subtitle: 'A custom agent earns its file when the work needs a persistent role.',
      cards: [
        { icon: '🧭', title: 'Choose', blurb: 'A role earns a file' },
        { icon: '🔎', title: 'Select', blurb: 'The description picks it' },
        { icon: '📝', title: 'Teach', blurb: 'Tools bound, body teaches' }
      ],
      terminal: { context: '.github/agents/test-writer.agent.md', detail: 'One role, one file, every surface' }
    }),
    S('primitive-choice', 1, 'A Custom Agent Owns a Role', {
      scene: 'primitives', pill: 'Choose · The Primitive',
      cards: [
        { icon: '📜', title: 'Instructions', owns: 'conventions', description: 'Rules every agent follows: copilot-instructions.md, *.instructions.md, AGENTS.md.' },
        { icon: '🎯', title: 'Prompt file', owns: 'a task', description: 'One repeatable task a person starts by name: *.prompt.md.' },
        { icon: '🧠', title: 'Skill', owns: 'a method', description: 'A method with scripts and resources any agent loads on demand.' },
        { icon: '🤖', title: 'Custom agent', owns: 'a role', hero: true, description: 'A persistent role: identity, tool boundary, method, and model preference.' }
      ],
      footnote: 'A test writer is a role: it edits test files only, runs its tests, and reports suspected bugs to a person.'
    }),
    S('agent-anatomy', 1, 'Description Selects, Tools Bound, Body Teaches', {
      scene: 'anatomy', pill: 'Choose · Anatomy of the File',
      codeLines: [
        '---',
        'name: test-writer',
        { t: 'description: Writes focused tests for one component or page, runs them, and reports suspected bugs. Edits test files only.', z: 'purple' },
        { t: 'tools: [read, edit, search, execute]', z: 'orange' },
        '---',
        { t: '# Test writer', z: 'green' },
        { t: 'Method, boundary, next step, output contract…', z: 'green' }
      ],
      features: [
        { title: 'Description selects', detail: 'The one required field. Surfaces match requests against it to pick the agent.', z: 'purple' },
        { title: 'Tools bound', detail: 'Portable aliases. Omit tools for all tools; tools: [] for none.', z: 'orange' },
        { title: 'Body teaches', detail: 'Every surface reads the method and contract, up to 30,000 characters.', z: 'green' }
      ],
      footnote: 'A complete example file you can read: FanHub test-writer.agent.md (github.com/MSBart2/FanHub).'
    }),

    S('part-2', 2, 'Write the Portable Core', {
      scene: 'opener', subtitle: 'The portable core is the part of the file every surface honors.',
      cards: [
        { icon: '📍', title: 'Place', blurb: 'Folder and ID' },
        { icon: '🔎', title: 'Describe', blurb: 'Description and tools' },
        { icon: '📝', title: 'Teach', blurb: 'Body and model' }
      ],
      terminal: { context: 'description · tools · body', detail: 'Read on every surface' }
    }),
    S('portable-locations', 2, 'Put Agents in the Folders Every Surface Reads', {
      scene: 'table', pill: 'Core · Location',
      columns: [
        { label: 'Scope', width: 300, z: 'accent' },
        { label: 'Folder', width: 520, z: 'local' },
        { label: 'Who reads it', width: 620, z: 'green' }
      ],
      rows: [
        { cells: ['Repository', '.github/agents/ (.agent.md or .md)', ok('Every surface; cloud agent reads the default branch')] },
        { cells: ['Personal', '~/.copilot/agents/', ok('VS Code, Copilot CLI, and the Copilot app')] },
        { cells: ['Organization · enterprise', 'agents/ in the org .github or .github-private repo', ok('Repositories in that organization or enterprise')] },
        { cells: ['VS Code Local user agents', 'VS Code profile storage', off('VS Code only')] },
        { cells: ['Custom locations', 'chat.agentFilesLocations folders', off('VS Code only; the CLI and app skip editor settings')] }
      ],
      footnote: 'Copilot CLI and the GitHub Copilot app do not inherit editor location settings.'
    }),
    S('id-precedence', 2, 'The Filename Is the ID; the Nearest Scope Wins', {
      scene: 'id-ladder', pill: 'Core · Agent ID',
      file: 'test-writer.agent.md',
      rungs: [
        { scope: 'Personal', folder: '~/.copilot/agents/', z: 'purple' },
        { scope: 'Repository', folder: '.github/agents/', z: 'local' },
        { scope: 'Organization', folder: 'org .github or .github-private repo', z: 'remote' },
        { scope: 'Enterprise', folder: '.github-private of a designated org', z: 'github' }
      ],
      collide: [
        { rung: 0, tag: 'wins', wins: true },
        { rung: 1, tag: 'skipped' }
      ],
      rules: [
        { code: ['test-writer.agent.md', '→ test-writer'], note: 'Filename without .agent.md or .md' },
        { code: ['security/security-auditor.agent.md', '→ security--security-auditor'], note: 'Subfolders join the ID with --' },
        { code: ['name: Test Writer'], note: 'name does not change the ID' }
      ],
      footnote: 'Two files with one ID: personal beats repository beats organization beats enterprise.'
    }),
    S('description-selects', 2, 'The Description Is What a Request Gets Matched Against', {
      scene: 'anatomy', pill: 'Core · Description',
      fileLabel: '.github/agents/test-writer.agent.md · frontmatter',
      codeLines: [
        '# Hard to match',
        'description: Helps with tests',
        '',
        '# Easy to match',
        'description: >',
        { t: '  Writes and runs focused tests for one component or page.', z: 'purple' },
        { t: '  Edits test files only; reports suspected bugs to a person.', z: 'orange' },
        { t: '  Use for new tests, coverage gaps, or regression tests.', z: 'green' }
      ],
      features: [
        { title: 'Task', detail: 'What the agent does, in the words a request would use.', z: 'purple' },
        { title: 'Boundary', detail: 'What it may change, stated before anyone runs it.', z: 'orange' },
        { title: 'When to use', detail: 'The kinds of request that fit this agent.', z: 'green' }
      ],
      footnote: 'Required on every surface. Copilot CLI infers the agent from it; cloud agent selects from task context.'
    }),
    S('portable-tools', 2, 'Use the Short Tool Names Every Surface Understands', {
      scene: 'table', pill: 'Core · Tools',
      columns: [
        { label: 'Write in tools:', width: 290, z: 'accent' },
        { label: 'Lets the agent', width: 380, z: 'accent' },
        { label: 'VS Code', width: 220, z: 'local' },
        { label: 'Copilot CLI', width: 220, z: 'remote' },
        { label: 'Cloud agent', width: 330, z: 'github' }
      ],
      rows: [
        { cells: ['execute', 'Run shell commands', ok('Works'), ok('Works'), ok('Works')] },
        { cells: ['read · edit', 'Read and edit files', ok('Works'), ok('Works'), ok('Works')] },
        { cells: ['search', 'Find files and text', ok('Works'), ok('Works'), ok('Works')] },
        { cells: ['agent', 'Call another custom agent', ok('Works'), ok('Works'), ok('Works')] },
        { cells: ['web · todo', 'Fetch pages; keep a task list', ok('Works'), ok('Works'), off('Skipped')] },
        { cells: ['my-server/*', 'Use an MCP server’s tools', ok('Works'), ok('Works'), ok('Works; github built in')] },
        { cells: ['agent/runSubagent', 'Call a subagent', ok('Local only'), off('Skipped'), off('Skipped')] }
      ],
      footnote: 'Names are case-insensitive. A surface skips any tool name it does not recognize, without a warning.'
    }),
    S('body-carries-behavior', 2, 'The Body Carries the Behavior That Travels', {
      scene: 'anatomy', pill: 'Core · Body',
      fileLabel: '.github/agents/test-writer.agent.md · body',
      codeLines: [
        '# Test writer',
        'Write focused tests for one component or page, then run them.',
        '## Boundary',
        { t: 'Edit test files only. Report suspected production bugs to a person.', z: 'orange' },
        '## Next step',
        { t: 'When the tests pass, recommend test-reviewer and stop.', z: 'purple' },
        '## Output contract',
        { t: 'Agent · Tests added · Command and result · Suspected bugs · Files changed', z: 'green' }
      ],
      features: [
        { title: 'Boundary', detail: 'What the agent may change and what it hands to a person.', z: 'orange' },
        { title: 'Next step', detail: 'The intent of a Local handoff, written as a sentence any surface follows.', z: 'purple' },
        { title: 'Output contract', detail: 'Five lines the reviewer reads, whichever surface ran the agent.', z: 'green' }
      ],
      footnote: 'In VS Code Chat the body follows custom instructions and wins on conflict. Maximum: 30,000 characters.'
    }),
    S('model-preference', 2, 'Each Surface Writes the Model Line Its Own Way', {
      scene: 'table', pill: 'Core · Model',
      columns: [
        { label: 'Surface', width: 250, z: 'accent' },
        { label: 'Example model line', width: 560, z: 'purple' },
        { label: 'What happens', width: 630, z: 'green' }
      ],
      rows: [
        { cells: ['VS Code Local', 'model: Claude Sonnet 5.5 (copilot)', 'Display name plus vendor, as the model picker shows it'] },
        { cells: ['VS Code Copilot', 'model: [claude-sonnet-5.5, gpt-6.1-sol]', 'Runtime IDs in order; the first available model runs'] },
        { cells: ['Copilot CLI', 'model: claude-sonnet-5.5', 'A preference; add model-policy: required to insist'] },
        { cells: ['Copilot CLI · local', 'model: local/qwen3:8b', 'Provider and ID from providers.json'] },
        { cells: ['Cloud agent', off('model: …'), off('Documented for IDE use; confirm in the session log')] },
        { cells: ['Copilot app', CHECK, CHECK] }
      ],
      footnote: 'Leave model out and every surface uses the session’s model. Add it when the model matters, in the format of the surface you rely on.'
    }),

    S('part-3', 3, 'Add Surface Fields on Purpose', {
      scene: 'opener', subtitle: 'Each frontmatter field is a choice to enhance specific surfaces.',
      cards: [
        { icon: '📋', title: 'Read the table', blurb: 'Five surfaces, one view' },
        { icon: '🔀', title: 'Check the meaning', blurb: 'Same field, new effect' },
        { icon: '📍', title: 'Place the field', blurb: 'Name the surface it serves' }
      ],
      terminal: { context: 'frontmatter fields', detail: 'Each one works on some surfaces' }
    }),
    S('what-works-where', 3, 'What Works Where: Five Surfaces, One Table', {
      scene: 'table', pill: 'Fields · Checked 2026-11-04',
      columns: [
        { label: 'Field', width: 300, z: 'accent' },
        { label: 'VS Code Local', width: 228, z: 'local' },
        { label: 'VS Code Copilot', width: 228, z: 'runtime' },
        { label: 'Copilot CLI', width: 228, z: 'remote' },
        { label: 'Cloud agent', width: 228, z: 'github' },
        { label: 'Copilot app', width: 228, z: 'accent' }
      ],
      rows: [
        { cells: ['description + body', ok('Read'), ok('Read'), ok('Read'), ok('Read'), ok('Read')] },
        { cells: ['tools (aliases)', ok('Mapped'), ok('Mapped'), ok('Mapped'), ok('Mapped; no web, todo'), CHECK] },
        { cells: ['model', ok('Display name'), ok('IDs, fallback list'), ok('PROVIDER/MODEL'), 'Described for IDE use', CHECK] },
        { cells: ['target, user-invocable, disable-model-invocation', ok(), ok(), ok(), ok(), CHECK] },
        { cells: ['handoffs, agents, argument-hint', ok(), off('Not accepted'), 'Not documented', off('Ignored'), CHECK] },
        { cells: ['model-policy, strict-tools-list, include-custom-instructions', off('Not in Local schema'), off('Dropped in conversion'), ok(), 'Not documented', CHECK] },
        { cells: ['skills, reasoning-effort', off('Not in Local schema'), ok(), 'Not documented', 'Not documented', CHECK] },
        { cells: ['mcp-servers, metadata', off('Not used'), off('Not used'), ok(), ok(), CHECK] }
      ],
      footnote: 'Green: documented. Orange: skipped. Purple: the app guide lists no field table yet.'
    }),
    S('same-field-different-meaning', 3, 'Two Fields Decide Who Can Start the Agent', {
      scene: 'controls', pill: 'Fields · Who Starts It',
      rows: [
        { label: 'disable-model-invocation: true', description: 'Only a person can choose it. Copilot stops picking it on its own for a task.', tag: 'Cloud agent', z: 'github' },
        { label: 'disable-model-invocation: true', description: 'Other agents stop calling it, unless a coordinator lists it by name in its agents list.', tag: 'VS Code', z: 'local' },
        { label: 'user-invocable: false', description: 'It leaves the agent picker. Only another agent can start it.', tag: 'CLI, cloud, VS Code', z: 'purple' }
      ],
      footnote: 'Same line, two meanings: set it when it matters who starts the agent, then confirm on each surface you rely on.'
    }),
    S('target-field', 3, 'Leave target Out for a File That Runs Everywhere', {
      scene: 'controls', pill: 'Fields · target',
      rows: [
        { label: '(no target)', description: 'The default. Every surface can use the agent.', tag: 'Portable', z: 'green' },
        { label: 'target: vscode', description: 'Marks the agent for VS Code. VS Code checks the file against Local’s fields.', tag: 'VS Code', z: 'local' },
        { label: 'target: github-copilot', description: 'Marks the agent for GitHub Copilot. VS Code checks the file against Copilot’s fields.', tag: 'GitHub Copilot', z: 'github' }
      ],
      footnote: 'In VS Code, target changes how the editor checks the file; the session you picked still runs it.'
    }),
    S('local-only-fields', 3, 'Three Fields Work Only in VS Code Local', {
      scene: 'table', pill: 'Fields · VS Code Local',
      columns: [
        { label: 'Field', width: 230, z: 'accent' },
        { label: 'What it adds', width: 390, z: 'accent' },
        { label: 'VS Code Local', width: 170, z: 'local' },
        { label: 'VS Code Copilot', width: 170, z: 'runtime' },
        { label: 'Copilot CLI', width: 150, z: 'remote' },
        { label: 'Cloud agent', width: 150, z: 'github' },
        { label: 'Copilot app', width: 150, z: 'purple' }
      ],
      rows: [
        { cells: ['handoffs', 'A hand-off button to another agent', ok('Works'), off('Skipped'), 'Not listed', off('Skipped'), APP] },
        { cells: ['agents', 'The subagents this agent may call', ok('Works'), off('Skipped'), 'Not listed', 'Not listed', APP] },
        { cells: ['argument-hint', 'Hint text in the chat input', ok('Works'), off('Skipped'), 'Not listed', off('Skipped'), APP] },
        { cells: ['A body sentence', 'The same next step, written as text', ok('Works'), ok('Works'), ok('Works'), ok('Works'), ok('Works')] }
      ],
      footnote: 'Keep the Local field for its button or hint, and write the same intent in the body so every surface gets it.'
    }),
    S('copilot-runtime-fields', 3, 'Copilot Runtime Fields and Where They Reach', {
      scene: 'table', pill: 'Fields · Copilot Runtime',
      columns: [
        { label: 'Field', width: 400, z: 'accent' },
        { label: 'What it does', width: 640, z: 'remote' },
        { label: 'VS Code conversion', width: 400, z: 'runtime' }
      ],
      rows: [
        { cells: ['model-policy: required', 'Copilot CLI requires the configured model; without it the model is a preference', off('Dropped')] },
        { cells: ['strict-tools-list: true', 'Copilot CLI gives the agent only the tool groups it lists', off('Dropped')] },
        { cells: ['include-custom-instructions: true', 'Repository instructions apply when the agent runs as a subagent', off('Dropped')] },
        { cells: ['skills', 'Copilot schema field; VS Code Local does not accept it', ok('Not on the dropped list')] },
        { cells: ['reasoning-effort', 'Copilot schema field for the model\u2019s reasoning effort', ok('Not on the dropped list')] }
      ],
      footnote: 'VS Code also drops mcp-servers, github, and deferred-tool-loading when it converts an agent to SDK config.'
    }),
    S('cloud-fields', 3, 'mcp-servers Wires Tools Into Cloud Agent', {
      scene: 'terminal', pill: 'Fields · Cloud Agent', termTitle: '.github/agents/triage.agent.md · frontmatter excerpt (illustrative)',
      transcript: [
        { type: 'response', lines: [
          'tools: [read, search, example-server/*]',
          'mcp-servers:',
          '\u00a0\u00a0example-server:',
          '\u00a0\u00a0\u00a0\u00a0type: local',
          '\u00a0\u00a0\u00a0\u00a0command: example-mcp-server',
          '\u00a0\u00a0\u00a0\u00a0tools: ["*"]',
          '\u00a0\u00a0\u00a0\u00a0env:',
          '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0API_TOKEN: ${{ secrets.COPILOT_MCP_API_TOKEN }}'
        ] },
        { type: 'divider' },
        { type: 'outcome', text: 'Cloud agent finds it after the file merges to the default branch' }
      ],
      footnote: 'Secrets and variables come from Agents settings at org or repo level. VS Code uses neither mcp-servers nor metadata.'
    }),
    S('authority-boundary', 3, 'The Body Asks; Tools, Hooks, and Review Enforce', {
      scene: 'table', pill: 'Fields · Enforce the Boundary',
      columns: [
        { label: 'Where you write it', width: 300, z: 'accent' },
        { label: 'What it does', width: 320, z: 'accent' },
        { label: 'VS Code Local', width: 170, z: 'local' },
        { label: 'VS Code Copilot', width: 170, z: 'runtime' },
        { label: 'Copilot CLI', width: 160, z: 'remote' },
        { label: 'Cloud agent', width: 160, z: 'github' },
        { label: 'Copilot app', width: 160, z: 'purple' }
      ],
      rows: [
        { cells: ['“Edit test files only.”', 'Asks the model to comply', 'Asks', 'Asks', 'Asks', 'Asks', 'Asks'] },
        { cells: ['tools: [read, search]', 'Withholds every other tool', ok('Works'), ok('Works'), ok('Works'), ok('Works'), APP] },
        { cells: ['hooks: in the agent', 'Checks one agent’s calls', ok('Works'), ok('Works'), ok('Works'), 'Not listed', ok('Works')] },
        { cells: ['.github/hooks/*.json', 'Checks every agent’s calls', off('Own format'), ok('Works'), ok('Works'), ok('Works'), ok('Works')] },
        { cells: ['Branch rules + review', 'Decides what merges', 'At merge', 'At merge', 'At merge', 'At merge', 'At merge'] }
      ],
      footnote: 'Write the boundary in the body for every surface, then enforce it with tools and hooks where they run, and with review at merge.'
    }),

    S('part-4', 4, 'Confirm the Load and Apply It', {
      scene: 'opener', subtitle: 'A one-minute check per surface confirms the agent your team runs.',
      cards: [
        { icon: '🔍', title: 'Confirm', blurb: 'Agent, model, tools' },
        { icon: '🧱', title: 'Start', blurb: 'A portable skeleton' },
        { icon: '✅', title: 'Audit', blurb: 'One agent you share' }
      ],
      terminal: { context: 'your repository · your agent', detail: 'One check per surface' }
    }),
    S('confirm-load', 4, 'Each Surface Shows What Loaded in One Place', {
      scene: 'table', pill: 'Confirm · Where to Look',
      columns: [
        { label: 'Surface', width: 300, z: 'accent' },
        { label: 'Which agent', width: 480, z: 'purple' },
        { label: 'Which model and tools', width: 660, z: 'green' }
      ],
      rows: [
        { z: 'local', cells: ['VS Code (both harnesses)', 'Agent picker; Chat Debug view', 'Developer: Show Chat Debug View; Agent Debug Log (preview), per request'] },
        { z: 'remote', cells: ['Copilot CLI', '/agent list', '--log-level debug --log-dir <dir>: model from the custom agent, tool names'] },
        { z: 'github', cells: ['Copilot cloud agent', 'PR description: “Custom agent used: <name>”', 'Session log: gh agent-task view <session> --log'] },
        { z: 'accent', cells: ['GitHub Copilot app', 'Agent picker or /agent', CHECK] }
      ],
      footnote: 'Restart Copilot CLI to load a new agent. Cloud agent reads the default branch.'
    }),
    S('portable-skeleton', 4, 'Start Every Agent From a Portable Skeleton', {
      scene: 'terminal', pill: 'Apply · Skeleton', termTitle: '.github/agents/<agent-id>.agent.md · starting point',
      transcript: [
        { type: 'response', lines: [
          '---',
          'description: <task>. <boundary>. Use for <trigger words>.',
          'tools: [read, edit, search, execute]',
          '# Surface fields: add each on purpose and name the surface it serves',
          '# handoffs: … · for VS Code Local',
          '# model-policy: … · for Copilot CLI',
          '# mcp-servers: … · for Copilot cloud agent',
          '---',
          '# Role · Boundary · Method · Next step · Output contract'
        ] },
        { type: 'divider' },
        { type: 'outcome', text: 'Core works on every surface; surface fields stay marked' }
      ]
    }),
    S('audit-your-agent', 4, 'Four Checks Make a Shared Agent Portable', {
      scene: 'scorecard', pill: 'Apply · Own-Work Audit',
      cards: [
        { icon: '📍', title: 'Place', description: 'It lives in .github/agents or ~/.copilot/agents.' },
        { icon: '🧩', title: 'Core', description: 'Description and body carry task, boundary, next step, and contract.' },
        { icon: '📋', title: 'Fields', description: 'Each frontmatter field names the surface it serves.' },
        { icon: '🔍', title: 'Confirm', description: 'You saw agent, model, and tools load on each surface you support.' }
      ]
    }),

    S('before-after', 0, 'From Assumed Everywhere to Portable on Purpose', {
      scene: 'before-after', pill: 'The Shift',
      before: [
        'One file assumed to behave the same everywhere',
        'Behavior parked in surface-only fields',
        'Model written in one format for all surfaces',
        'Agent load taken on trust'
      ],
      after: [
        'One portable core every surface reads',
        'Fields added for the surface they serve',
        'Model written in each surface\u2019s format',
        'Agent, model, and tools confirmed per surface'
      ],
      metrics: [
        { value: '1 core', detail: 'Read on all five surfaces' },
        { value: '5 surfaces', detail: 'One what-works-where table' },
        { value: '30,000', detail: 'Body characters, maximum' }
      ]
    }),
    S('today', 0, 'What You Can Do Today', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Move one shared agent into .github/agents', 'Check each field against the table', 'Open the Chat Debug view on one request'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Restate Local-only intent in the body', 'Confirm agent, model, and tools per surface', 'Start new agents from the skeleton'] },
        { icon: '🚀', label: 'With the Team', z: 'purple', items: ['Agree which surfaces the team supports', 'Name owners for shared agent files', 'Pick the first shared agent to audit'] }
      ],
      takeaway: 'Write the role once. Add surface fields on purpose.'
    }),
    S('references', 0, 'References', {
      scene: 'references',
      groups: [
        { icon: '📖', title: 'GitHub Copilot', z: 'local', items: [
          { href: SRC.config.href, label: SRC.config.label, description: 'Fields, tool aliases, and naming rules.' },
          { href: SRC.custom.href, label: SRC.custom.label, description: 'Where custom agents run.' },
          { href: SRC.comparing.href, label: SRC.comparing.label, description: 'When a role earns a custom agent.' },
          { href: SRC.cli.href, label: SRC.cli.label, description: 'CLI folders, IDs, and fields.' },
          { href: SRC.cloud.href, label: SRC.cloud.label, description: 'Cloud agent setup and discovery.' },
          { href: SRC.cloudEnv.href, label: SRC.cloudEnv.label, description: 'Cloud setup outside the agent file.' },
          { href: SRC.app.href, label: SRC.app.label, description: 'Agent picker, /agent, shared skills and MCP.' }
        ] },
        { icon: '🧪', title: 'VS Code and Example', z: 'purple', items: [
          { href: SRC.vscode.href, label: SRC.vscode.label, description: 'Custom agents in VS Code.' },
          { href: SRC.vscodeFile.href, label: SRC.vscodeFile.label, description: 'Harnesses, schemas, and fields.' },
          { href: SRC.vscodeDebug.href, label: SRC.vscodeDebug.label, description: 'Confirm agent, model, and tools.' },
          { href: SRC.agentFile.href, label: SRC.agentFile.label, description: 'A complete example file you can read.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Custom Agents', {
      scene: 'thanks', chrome: false, visual: 'runtime-ring', surfaces: SURFACES,
      subtitle: 'Which field in your shared agent works on one surface only?',
      cards: [
        { value: '1 core', detail: 'Description and body' },
        { value: '5 surfaces', detail: 'One field table' },
        { value: '4 checks', detail: 'Place, core, fields, confirm' }
      ],
      prompt: 'Which field in your shared agent works on one surface only?'
    })
  ];

  const NOTES = {
    title: {
      seconds: 30, sources: [SRC.custom, SRC.app],
      notes: [
        `"One agent file can serve every Copilot surface your team uses. Today we write that file once and add the surface extras on purpose."`,
        `Point to the ring: one file in the center, five surfaces around it. VS Code with the Local harness, VS Code with the Copilot harness, Copilot CLI, Copilot cloud agent, and the GitHub Copilot app.`,
        `→ Start with the question the room brings.`
      ],
      know: [
        `GitHub's concept page lists custom agents in the GitHub Copilot app, Copilot CLI, cloud agent, and IDEs: VS Code, Visual Studio, JetBrains, Eclipse, and Xcode. JetBrains and Xcode support is in public preview.`,
        `This talk covers the five surfaces on the ring; keep the wider IDE list ready for questions.`
      ]
    },
    'core-question': {
      seconds: 90, sources: [SRC.custom, SRC.config],
      notes: [
        `"How do I write one agent file that works in every Copilot surface my team uses? That is our question for the next forty minutes."`,
        `Walk the three moments. "Your agent works in your editor, and a teammate runs it from the CLI. Someone assigns an issue to cloud agent with the same file. A handoff or a model setting does nothing, and nothing warns you. Each one is this question."`,
        `"Here is the short answer. Every surface reads the description and the body. Each frontmatter field works on some surfaces. Write the role once, then add surface fields on purpose."`,
        `Point at what the room leaves with: a portable core, a field table, and a four-check audit.`
      ],
      know: [
        `GitHub's concept page: "A profile's properties can behave differently or be ignored between environments."`,
        `The description is the one required field in the GitHub configuration reference.`
      ]
    },
    contents: {
      seconds: 30, sources: [SRC.config],
      notes: [
        `"Four stops: choose the agent, write the core, add surface fields, then confirm the load."`,
        `Part 3 holds the what-works-where table and gets the most time. Each card links to its opener.`
      ],
      know: [`Openers are slides 5, 9, 16, and 24.`]
    },
    'lit-lines': {
      seconds: 120, sources: [SRC.config, SRC.vscodeFile, SRC.cli, SRC.cloud, SRC.app],
      notes: [
        `Let the motion run. Each surface column lights the lines that surface reads, one surface at a time.`,
        `"Watch the description and the body. They light on every surface."`,
        `"Now watch the fields. handoffs lights for VS Code Local. strict-tools-list lights for Copilot CLI. mcp-servers lights for the CLI and cloud agent. The model line stays dark for cloud agent, whose how-to describes model for IDE use."`,
        `"The app column carries question marks. Its guide confirms the agent picker and /agent, and lists no field table yet."`,
        `"That is the talk in one picture: the core travels, and every field is a choice about which surfaces to enhance."`,
        `→ First, confirm the work needs a custom agent at all.`
      ],
      know: [
        `A surface skips a field it does not support without a warning. The GitHub reference also says all unrecognized tool names are ignored.`,
        `VS Code Copilot harness: when VS Code converts an agent to SDK custom-agent config, it leaves out model-policy, mcp-servers, github, deferred-tool-loading, strict-tools-list, and include-custom-instructions. That is why those lines stay dark in the second column.`,
        `The GitHub reference marks mcp-servers and metadata "Not used in VS Code and other IDE custom agents"; the CLI dot follows that reference. Confirm it with the CLI debug log before you rely on it.`
      ]
    },
    'part-1': {
      seconds: 30, sources: [SRC.comparing],
      notes: [
        `"A custom agent earns its file when the work needs a persistent role. Inside the file, the description selects the agent, the tools bound it, and the body teaches it."`
      ],
      know: [`Part 1 uses a generic test-writer file. The FanHub test-writer is a complete example file to read afterward.`]
    },
    'primitive-choice': {
      seconds: 90, sources: [SRC.comparing, SRC.vscodeFile, SRC.app],
      notes: [
        `"Instructions own conventions, prompt files own a task, skills own a method, and a custom agent owns a role."`,
        `Point at the purple card. A role carries an identity, a tool boundary, a method, and a model preference that persist across tasks.`,
        `"A test writer is a role: it edits test files only, runs its tests, and reports suspected bugs to a person."`
      ],
      know: [
        `A custom agent still loads team instructions. In VS Code Chat the agent body is added after custom instructions and takes precedence on conflict.`,
        `Skills and MCP servers configured for repositories or Copilot CLI are automatically available in the GitHub Copilot app.`
      ]
    },
    'agent-anatomy': {
      seconds: 120, sources: [SRC.config, SRC.agentFile],
      notes: [
        `"Three parts, three jobs. The description selects the agent. The tools set its boundary. The body teaches the method."`,
        `Walk the header: the purple description is the only required field; the orange tools line uses portable aliases; the green body holds the method and contract.`,
        `"The body is the part every surface obeys, so the behavior you care about lives there."`,
        `Point at the footnote: the FanHub test-writer is a complete example file to read after the talk.`,
        `→ The body ends with a contract.`
      ],
      know: [
        `Body maximum: 30,000 characters.`,
        `tools accepts a list or a comma-separated string. Omit it to grant all tools; tools: [] grants none.`,
        `name is optional. The filename sets the agent ID.`
      ]
    },
    'part-2': {
      seconds: 30, sources: [SRC.config, SRC.vscodeFile],
      notes: [
        `"The portable core is the part of the file every surface honors: where it lives, what it is called, how it is described, which tools it names, what its body says, and the model it prefers."`
      ],
      know: [`Part 2 follows the order a practitioner writes the file.`]
    },
    'portable-locations': {
      seconds: 110, sources: [SRC.cli, SRC.vscodeFile, SRC.config, SRC.cloud],
      notes: [
        `"Put shared agents in .github/agents and personal agents in ~/.copilot/agents. Those are the folders every surface looks in."`,
        `Point at the orange rows. VS Code Local stores user agents in VS Code profile storage, and chat.agentFilesLocations adds custom folders. Both stay inside the editor.`,
        `"Copilot CLI and the GitHub Copilot app do not inherit editor location settings, so an agent in a custom folder stays invisible to them."`
      ],
      know: [
        `VS Code reads workspace .github/agents (.agent.md or .md), .claude/agents in Claude format, and user agents in ~/.copilot/agents. It auto-detects organization agents.`,
        `Organization agents live in the org .github or .github-private repository; enterprise agents live in .github-private of a designated organization.`,
        `Cloud agent reads agents from the default branch: commit and merge the file to make it appear.`
      ]
    },
    'id-precedence': {
      seconds: 90, sources: [SRC.cli, SRC.config],
      notes: [
        `"The filename is the ID. test-writer.agent.md is test-writer, wherever it sits."`,
        `Let the two files collide: the personal copy stays lit, the repository copy dims.`,
        `"When two files share an ID, the nearest scope wins: personal, then repository, then organization, then enterprise. The name field leaves the ID alone."`
      ],
      know: [
        `Subfolders join the ID: security/security-auditor.agent.md becomes security--security-auditor.`,
        `The CLI how-to documents personal over repository. The GitHub reference documents repository over organization over enterprise.`,
        `Versions follow the commit SHA on the branch. Restart Copilot CLI to load a new agent.`
      ]
    },
    'description-selects': {
      seconds: 90, sources: [SRC.config, SRC.cli, SRC.cloud],
      notes: [
        `"The description is the one required field, and it is the text a request gets matched against when a surface picks an agent on its own."`,
        `Point at the top line. "Helps with tests names a topic. Almost any request about tests matches it, and nothing says what the agent may touch."`,
        `Walk the three colored lines. "Purple says what it does, in the words a request would use. Orange says what it may change. Green says when to use it."`,
        `"Copilot CLI infers the agent from this text, and cloud agent selects from task context. Three short sentences give both something precise to match."`
      ],
      know: [
        `CLI selection paths: /agent, an explicit instruction, inference from the description, or <code>copilot --agent ID --prompt "..."</code>.`,
        `disable-model-invocation: true turns automatic selection off; the agent then runs when someone picks it.`
      ]
    },
    'portable-tools': {
      seconds: 120, sources: [SRC.config, SRC.vscodeFile],
      notes: [
        `"These are the short tool names. Write them in tools: and each surface turns them into its own tools: execute, read, edit, search, and agent work everywhere."`,
        `"web and todo work in VS Code and the CLI. Cloud agent skips them today, per the GitHub reference."`,
        `Point at the last row. agent/runSubagent is VS Code Local's own name for calling a subagent; the Copilot runtime uses its own task tool. User-defined tool sets are Local-only too.`,
        `"Any tool name a surface does not recognize is skipped, with no warning. Stick to the short names and the file stays portable."`
      ],
      know: [
        `The reference calls these short names aliases. execute also answers to shell, Bash, and powershell; search to Grep and Glob; agent to custom-agent and Task.`,
        `MCP tools use server/tool or server/*. Cloud agent ships two built-in MCP servers: github (read-only) and playwright (localhost).`,
        `Omit tools for all tools; tools: [] for none.`
      ]
    },
    'body-carries-behavior': {
      seconds: 100, sources: [SRC.config, SRC.vscodeFile, SRC.agentFile],
      notes: [
        `"Write the boundary, the next step, and the output contract as sentences in the body. Every surface reads them."`,
        `Point at the orange, purple, and green lines in turn.`,
        `"The next-step line carries the intent of a Local handoff to every surface that skips handoffs."`
      ],
      know: [
        `In VS Code Chat the body is added after custom instructions and takes precedence on conflict.`,
        `Maximum body length: 30,000 characters.`,
        `A sentence carries intent. The handoff button stays a VS Code Local feature.`
      ]
    },
    'model-preference': {
      seconds: 110, sources: [SRC.vscodeFile, SRC.cli, SRC.cloud],
      notes: [
        `"Same idea, different spelling. Read down the example column."`,
        `"VS Code Local wants the name the model picker shows, with the vendor in parentheses: Claude Sonnet 5.5 (copilot)."`,
        `"The VS Code Copilot harness wants runtime IDs, and it takes a list. The first model available to you runs, so the second entry is your fallback."`,
        `"Copilot CLI takes a runtime ID too. On its own it is a preference; add model-policy: required when the agent needs that exact model. For a local model, write the provider and ID from providers.json, like local/qwen3:8b."`,
        `"Cloud agent's how-to describes model for IDE use, so confirm the model in the session log. The Copilot app guide does not list model support yet."`,
        `Land the footnote: "Leave model out and every surface uses the session's model. Add it when the model matters, written for the surface you rely on."`
      ],
      know: [
        `The model IDs are examples; use the IDs your completions or model list show. local/qwen3:8b is the example from the Copilot CLI how-to.`,
        `GitHub's reference: if model is unset, the agent inherits the default model.`,
        `model-policy: required makes the CLI require the configured model; without it, the model is a preference.`,
        `VS Code leaves model-policy out when it converts an agent to SDK config.`,
        `Part 4 shows where to confirm the model that ran on each surface.`
      ]
    },
    'part-3': {
      seconds: 30, sources: [SRC.config, SRC.vscodeFile, SRC.app],
      notes: [
        `"Every frontmatter field is a choice to enhance specific surfaces. First the table, then the fields whose meaning changes, then where each family belongs."`
      ],
      know: [`Field support was checked on 2026-11-04.`]
    },
    'what-works-where': {
      seconds: 160, sources: [SRC.config, SRC.vscodeFile, SRC.cli, SRC.cloud, SRC.app],
      notes: [
        `Let the rows settle top to bottom, then read across one row at a time.`,
        `"Green means the reference documents the field for that surface. Orange means the surface skips it. Purple means check in the app."`,
        `"Row one is the core: description and body, read everywhere."`,
        `"Read the model row across: a display name in Local, IDs with a fallback list in the Copilot harness, PROVIDER/MODEL in the CLI, and IDE use only for cloud agent."`,
        `"Now the handoffs row: Local honors it, the Copilot harness rejects it, and cloud agent ignores it. That is the row people trip on."`,
        `Point at the app column. The app guide confirms the agent picker, /agent, and that skills and MCP servers configured for repositories or the CLI carry over. It lists no field table, so those cells stay open until the docs or a dated run fill them.`
      ],
      know: [
        `Sources: the GitHub configuration reference, the CLI and cloud agent how-tos, the GitHub Copilot app guide, and the VS Code custom agent file reference, all checked 2026-11-04.`,
        `The Copilot harness does not accept handoffs, agents, argument-hint, or advancedOptions. Local does not accept skills or mcp-servers.`,
        `Cloud agent ignores argument-hint and handoffs.`,
        `VS Code conversion to SDK config leaves out model-policy, mcp-servers, github, deferred-tool-loading, strict-tools-list, and include-custom-instructions.`,
        `The GitHub reference marks mcp-servers and metadata as not used in VS Code and other IDE agents. The CLI cell follows that reference.`,
        `Agent-scoped hooks work in VS Code Local and the Copilot harness; Local needs chat.useHooks and a trusted workspace.`
      ]
    },
    'same-field-different-meaning': {
      seconds: 110, sources: [SRC.config, SRC.vscodeFile],
      notes: [
        `"Two fields decide who can start this agent: a person, Copilot on its own, or another agent."`,
        `"Look at the first two rows. Same line, two meanings. On cloud agent, disable-model-invocation: true means only a person can choose the agent; Copilot stops picking it on its own."`,
        `"In VS Code, the same line means other agents stop calling it as a subagent. A Local coordinator that lists it by name in agents: can still call it."`,
        `"user-invocable: false means the same thing on the CLI, cloud agent, and VS Code: the agent leaves the picker, and only another agent can start it. That is how you build a helper the team never picks by hand."`
      ],
      know: [
        `disable-model-invocation: true is equivalent to the retired infer: false.`,
        `In VS Code, user-invocable controls whether the agent appears in the dropdown for both Local and Copilot.`,
        `Selection fields decide who picks the agent. Authority over changes comes from hooks, permissions, and review.`
      ]
    },
    'target-field': {
      seconds: 90, sources: [SRC.config, SRC.vscodeFile],
      notes: [
        `"For a file that runs everywhere, leave target out. That is the default, and GitHub's reference says it covers both VS Code and GitHub Copilot."`,
        `"Set it when an agent is deliberately for one side. target: vscode marks it for VS Code; target: github-copilot marks it for GitHub Copilot."`,
        `"In VS Code, target also changes which fields the editor checks the file against: Local's fields or Copilot's. The session you picked still runs the agent."`
      ],
      know: [
        `GitHub reference: target accepts vscode or github-copilot; if unset, it defaults to both environments.`,
        `VS Code reference: target overrides how the editor interprets the file, and it does not switch the session's harness.`
      ]
    },
    'local-only-fields': {
      seconds: 100, sources: [SRC.vscodeFile, SRC.config, SRC.cloud],
      notes: [
        `"Three fields work only in VS Code Local: handoffs puts a button under the response, agents lists the subagents this agent may call, and argument-hint shows hint text in the chat input."`,
        `Read across the first three rows. "The VS Code Copilot harness does not accept them. Cloud agent ignores handoffs and argument-hint, and its reference does not list agents. The CLI docs do not list any of the three. The app guide lists no fields yet."`,
        `Point at the last row. "Write the same next step as a sentence in the body, such as: when the tests pass, recommend test-reviewer. Local keeps its button, and every surface gets the sentence."`
      ],
      know: [
        `Handoff fields: label, agent, prompt (required), send, and model.`,
        `A body sentence carries intent to a person or agent; it creates no button.`,
        `In Local, an explicit agents list permits a subagent call even when that agent sets disable-model-invocation.`
      ]
    },
    'copilot-runtime-fields': {
      seconds: 110, sources: [SRC.cli, SRC.vscodeFile],
      notes: [
        `"Five fields shape the Copilot runtime: model-policy, strict-tools-list, include-custom-instructions, skills, and reasoning-effort."`,
        `Walk the first three rows from the CLI how-to. model-policy: required makes the model a requirement. strict-tools-list: true limits the agent to the tool groups it lists. include-custom-instructions: true applies repository instructions when the agent runs as a subagent.`,
        `"Read the last column before you rely on one in VS Code. Conversion to SDK config drops model-policy, strict-tools-list, and include-custom-instructions."`
      ],
      know: [
        `A selected agent already follows repository instructions; include-custom-instructions matters for subagent runs.`,
        `skills and reasoning-effort are Copilot schema fields; Local does not accept skills. The VS Code reference does not list them among the dropped fields.`,
        `deferred-tool-loading and github are also Copilot schema fields that the conversion drops.`
      ]
    },
    'cloud-fields': {
      seconds: 100, sources: [SRC.config, SRC.cloud],
      notes: [
        `"mcp-servers gives cloud agent its own MCP tools. Secrets come from Agents secrets and variables, at the organization or repository level."`,
        `Point at the env line: the value reads <code>secrets.COPILOT_MCP_</code> plus a name. Variables use <code>vars.COPILOT_MCP_</code>.`,
        `"Commit the file and merge it to the default branch. That is when cloud agent finds it."`
      ],
      know: [
        `stdio servers map to the local type.`,
        `Name MCP tools in tools as server/tool or server/*.`,
        `metadata and mcp-servers are not used in VS Code and other IDE agents.`,
        `The snippet is illustrative: the agent name, server name, command, and secret name are placeholders.`
      ]
    },
    'authority-boundary': {
      seconds: 90, sources: [SRC.config, SRC.vscodeFile, SRC.hooks, SRC.vscodeHooks],
      notes: [
        `"A boundary written in the body is a request. Every surface reads it, and the model can still drift. That is the first row."`,
        `"The tools list withholds tools outright. An agent with read and search has no edit tool to misuse, on every surface the field reaches."`,
        `"Hooks run your own check on tool calls, without the model asking. Hooks inside the agent file work in VS Code and the Copilot runtime; cloud agent's reference does not list them. Repository hooks in .github/hooks reach cloud agent, the CLI, the Copilot app, and VS Code's Copilot sessions."`,
        `"And branch rules plus a reviewer decide what merges, whichever surface wrote the change."`,
        `Land the footnote: write the boundary in the body for every surface, then enforce it where each layer runs.`
      ],
      know: [
        `VS Code: "VS Code, the GitHub Copilot app, and GitHub Copilot CLI share this harness and its hook format."`,
        `GitHub: repository hooks in .github/hooks/*.json apply to cloud agent and Copilot CLI; the CLI also reads personal hooks in ~/.copilot/hooks.`,
        `VS Code Local has its own hook format and reference; agent-scoped hooks in Local need chat.useHooks and a trusted workspace.`,
        `VS Code cloud sessions do not copy local hook files; check the hooks available in the cloud workspace.`,
        `The Copilot Hooks talk covers enforcement in depth.`
      ]
    },
    'part-4': {
      seconds: 30, sources: [SRC.vscodeDebug, SRC.cli],
      notes: [
        `"A one-minute check per surface confirms the agent your team actually runs. Then we start new agents from a skeleton and audit one you already share."`
      ],
      know: [`Part 4 turns the table into practice.`]
    },
    'confirm-load': {
      seconds: 120, sources: [SRC.vscodeDebug, SRC.cli, SRC.cloud, SRC.app],
      notes: [
        `"Every surface shows which agent, model, and tools loaded. You need to know where to look."`,
        `VS Code: Developer: Show Chat Debug View, and the Agent Debug Log in preview, show agent, model, and tools per request.`,
        `Copilot CLI: /agent lists the agents. <code>--log-level debug --log-dir DIR</code> writes the model chosen from the custom agent and the tool names.`,
        `Cloud agent: the pull request description reads "Custom agent used" with the name, and <code>gh agent-task view SESSION --log</code> prints the session log.`,
        `GitHub Copilot app: the agent picker or /agent shows the agent.`,
        `"Pick the surface your team uses most and run this check once this week."`
      ],
      cue: [
        `In VS Code, select the agent, send one request, run Developer: Show Chat Debug View, and point at agent, model, and tools.`,
        `Optional: run <code>copilot --agent test-writer --log-level debug --log-dir ./logs --prompt "list your tools"</code> and open the log.`
      ],
      know: [
        `Restart Copilot CLI after adding an agent.`,
        `The app guide documents agent selection. Check the app for model and tool details.`
      ]
    },
    'portable-skeleton': {
      seconds: 90, sources: [SRC.config, SRC.vscodeFile, SRC.cli],
      notes: [
        `"Start every new agent from this skeleton: a description, portable tools, and a body with role, boundary, method, next step, and contract."`,
        `"The commented block is where surface fields go. Each one names the surface it serves, so the next reader knows why it is there."`
      ],
      know: [
        `The skeleton carries no model line. Add one in each surface's format when the model matters.`,
        `Uncomment a field after checking its row in the what-works-where table.`
      ]
    },
    'audit-your-agent': {
      seconds: 100, sources: [SRC.config, SRC.vscodeFile, SRC.cli],
      notes: [
        `"Take one agent your team already shares and run four checks."`,
        `Place: it lives in .github/agents or ~/.copilot/agents. Core: the description and body carry task, boundary, next step, and contract. Fields: each frontmatter field names the surface it serves. Confirm: you saw agent, model, and tools load on each surface you support.`,
        `"Which field in your shared agent works on one surface only? That field is your first fix."`
      ],
      know: [`Where this stops fitting: multi-agent local loops belong to Local Agentic SDLC, enforcement belongs to Copilot Hooks, and the pull request flow across cloud agent and review belongs to Copilot on GitHub.`]
    },
    'before-after': {
      seconds: 45, sources: [SRC.config, SRC.vscodeFile],
      notes: [
        `"Before: one file assumed to behave the same everywhere. After: one portable core, surface fields chosen on purpose, and the load confirmed on each surface."`
      ],
      know: [`The three figures restate facts from the talk: one core read on all five surfaces, a five-column table, and the 30,000-character body limit.`]
    },
    today: {
      seconds: 50, sources: [SRC.config, SRC.vscodeDebug],
      notes: [
        `"Today, move one shared agent into .github/agents and check its fields against the table."`,
        `"This week, restate any Local-only intent in the body and confirm the load. With the team, agree which surfaces you support and who owns the files."`
      ],
      know: [`Each move has an owner: the agent author moves and checks the file, the developer confirms the load, and the team lead sets the supported surfaces.`]
    },
    references: {
      seconds: 15, sources: [SRC.config, SRC.vscodeFile, SRC.app, SRC.agentFile],
      notes: [
        `"Every claim in the deck links to a first-party page. The FanHub file is a complete example you can read."`
      ],
      know: [`Field support was verified on 2026-11-04.`]
    },
    thanks: {
      seconds: 15, sources: [SRC.config],
      notes: [
        `"Which field in your shared agent works on one surface only?"`,
        `Leave the question up and take answers.`
      ],
      know: [`Bring answers back to the what-works-where table: the field's row names the surfaces it serves.`]
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'custom-agents',
      title: 'Custom Agents: One File, Every Surface',
      short: 'Custom Agents',
      category: 'tech-talk',
      source: 'tech-talks/custom-agents/README.md',
      question: 'How do I write one agent file that works in every Copilot surface my team uses?',
      thesis: 'Every Copilot surface reads an agent\u2019s description and body, and each surface honors its own set of frontmatter fields. Write the role, boundary, and output contract in the body with portable tool aliases, then add surface fields on purpose where you know they apply.'
    },
    slides
  };
})();
