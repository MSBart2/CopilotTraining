/*
  Copilot Configuration Primitives — native deck.
  Slides and presenter notes are kept together so the printed notes remain the
  complete teaching source. Examples and terminal transcripts are illustrative.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    overview: { label: 'Customize AI in Visual Studio Code', href: 'https://code.visualstudio.com/docs/copilot/copilot-customization' },
    instructions: { label: 'Use custom instructions in VS Code', href: 'https://code.visualstudio.com/docs/copilot/customization/custom-instructions' },
    prompt: { label: 'Use prompt files in VS Code', href: 'https://code.visualstudio.com/docs/copilot/customization/prompt-files' },
    skills: { label: 'Use Agent Skills in VS Code', href: 'https://code.visualstudio.com/docs/copilot/customization/agent-skills' },
    agents: { label: 'Custom agents in VS Code', href: 'https://code.visualstudio.com/docs/copilot/customization/custom-agents' },
    githubInstructions: { label: 'Adding repository custom instructions for GitHub Copilot', href: 'https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot' },
    support: { label: 'Custom instructions support reference', href: 'https://docs.github.com/en/copilot/reference/custom-instructions-support' },
    agentsMd: { label: 'AGENTS.md open format', href: 'https://agents.md/' },
    release: { label: 'VS Code release notes: June 2026 (v1.122)', href: 'https://code.visualstudio.com/updates/v1_122' },
    models: { label: 'Configure language models in VS Code', href: 'https://code.visualstudio.com/docs/copilot/customization/language-models' },
    debug: { label: 'Chat Debug View', href: 'https://code.visualstudio.com/docs/copilot/chat/chat-debug-view' },
    troubleshooting: { label: 'Troubleshoot AI in VS Code', href: 'https://code.visualstudio.com/docs/copilot/troubleshooting' }
  };
  const sources = (...items) => items.map((item) => SRC[item]);

  const slides = [
    S('title', 0, 'Copilot Configuration Primitives', {
      scene: 'title', chrome: false, visual: 'primitive-map',
      subtitle: 'Instructions · Custom Prompts · Skills · Agents',
      tagline: 'Encode the convention once. Graduate the workflow when it is proven.',
      meta: 'CopilotTraining · Practitioner Tech Talk'
    }),
    S('core-question', 0, 'How can I make GitHub Copilot understand my codebase better?', {
      scene: 'core-question', pill: 'Core Question',
      subtitle: 'Generic output misses conventions the repository has not made explicit.',
      highlight: 'Choose the smallest primitive, inspect delivery, and prove acceptance separately.',
      routing: ['context', 'scope', 'evidence'], routingLabel: 'Decide by',
      roles: [
        { icon: '🧑‍💻', title: 'Developer', description: 'Repeat a useful workflow without rebuilding its context.' },
        { icon: '🏗️', title: 'Team lead', description: 'Review shared behavior as versioned team knowledge.' },
        { icon: '🧭', title: 'Platform engineer', description: 'Bound selectors, tools, execution, and approval.' }
      ],
      stats: [
        { title: 'Encode', description: 'Put stable rules where their selector fits.' },
        { title: 'Graduate', description: 'Turn proven work into a reusable capability.' },
        { title: 'Prove', description: 'Keep delivery separate from correct, accepted work.' }
      ]
    }),
    S('contents', 0, 'Four primitives, one practical progression', {
      scene: 'contents', sections: [
        { icon: '📋', title: 'Instructions', subtitle: 'Place and prove context', blurb: 'Repository, path, and directory guidance with delivery evidence.', slide: 4 },
        { icon: '💬', title: 'Custom Prompts', subtitle: 'Freeze solved work', blurb: 'A human-triggered recipe with useful inputs and shared context.', slide: 14 },
        { icon: '⚡', title: 'Skills', subtitle: 'Graduate the recipe', blurb: 'Progressive guidance plus linked scripts and templates.', slide: 19 },
        { icon: '🤖', title: 'Agents', subtitle: 'Constrain a role', blurb: 'A selected persona with visible tool and handoff boundaries.', slide: 25 }
      ]
    }),
    S('instructions-opener', 1, 'Instructions', {
      scene: 'opener',
      subtitle: 'Place the context, prove delivery, then encode the shared baseline.',
      cards: [
        { icon: '🧭', title: 'Place', blurb: 'Owner · lifetime · selector' },
        { icon: '🔎', title: 'Prove', blurb: 'Delivery is not acceptance' },
        { icon: '🏗️', title: 'Encode', blurb: 'Repository · path · directory' }
      ],
      terminal: { context: 'One rule, one intended audience', detail: 'Start with the selector' }
    }),
    S('place-context', 1, 'Four decisions place shared context', {
      scene: 'scorecard', pill: 'Instructions · Placement',
      subtitle: 'Who owns it, how long it lasts, what selects it, and what proves value?',
      cards: [
        { icon: '👤', title: 'Owner', description: 'Name who maintains, reviews, and may approve shared guidance.' },
        { icon: '🕒', title: 'Lifetime', description: 'Separate one request, a repeated task, repository life, and policy cycles.' },
        { icon: '🎯', title: 'Selector', description: 'Choose repository, matching paths, explicit command, relevant task, or agent.' },
        { icon: '🧪', title: 'Evidence', description: 'Define delivery signal, executable check, artifact review, and approver.' }
      ]
    }),
    S('delivery-chain', 1, 'Five signals prove five different boundaries', {
      scene: 'signals', pill: 'Instructions · Evidence',
      subtitle: 'References or diagnostics show delivery; independent checks and a named reviewer establish acceptance.',
      rows: [
        { label: 'Eligible', description: 'Does the selector match this request and file?', tag: 'selector', z: 'local' },
        { label: 'Loaded', description: 'Does the client report the customization?', tag: 'References / trace', z: 'remote' },
        { label: 'Executed', description: 'Did Copilot use the expected files and tools?', tag: 'tool activity', z: 'purple' },
        { label: 'Validated', description: 'Did independent tests or checks pass?', tag: 'test result', z: 'green' },
        { label: 'Accepted', description: 'Did the accountable owner approve the diff?', tag: 'human decision', z: 'orange' }
      ],
      footnote: 'A loaded file is delivery evidence, not proof that its guidance was followed.'
    }),
    S('repair-selector', 1, 'A valid rule can still miss the request', {
      scene: 'showdown', pill: 'Instructions · Repair',
      subtitle: 'The developer edits src/orders/create-order.ts; the original selector targets payments.',
      leftLabel: 'Miss: rule is ineligible', rightLabel: 'Repair: target now matches',
      pairs: [
        { left: { label: 'Request target', note: 'src/orders/create-order.ts' }, right: { label: 'Same request', note: 'src/orders/create-order.ts', z: 'local' } },
        { left: { label: 'applyTo', note: 'src/payments/**/*.ts' }, right: { label: 'applyTo', note: 'src/orders/**/*.ts', z: 'green' } },
        { left: { label: 'Outcome', note: 'Valid file, wrong selector' }, right: { label: 'Verify again', note: 'References, checks, diff, owner', z: 'orange' } }
      ],
      outcomeLeft: { icon: '×', label: 'Rule does not match the edited file' },
      outcomeRight: { icon: '✓', label: 'Eligibility repaired; acceptance still pending' },
      footnote: 'Illustrative selector example. A corrected glob proves eligibility only.'
    }),
    S('instruction-surfaces', 1, 'Three instruction surfaces target three scopes', {
      scene: 'signals', pill: 'Instructions · Choose a selector',
      subtitle: 'Match the rule lifetime and location to its intended readers.',
      rows: [
        { label: 'Repository baseline', description: '.github/copilot-instructions.md; Markdown, broad scope', tag: 'repo context', z: 'local' },
        { label: 'Matching files', description: '.instructions.md with applyTo frontmatter', tag: 'path selector', z: 'purple' },
        { label: 'Agent playbook', description: 'AGENTS.md for setup, tests, and local workflow', tag: 'directory guidance', z: 'remote' }
      ],
      footnote: 'Support and precedence differ by host; check the target runtime documentation.'
    }),
    S('repo-instructions', 1, 'A concise repository file carries reviewed conventions', {
      scene: 'artifact', pill: 'Instructions · Repository-wide',
      subtitle: 'Use the broad selector for stable rules that belong in eligible repository requests.',
      artifact: {
        badge: 'ILLUSTRATIVE FILE · NOT PRODUCT OUTPUT',
        filename: '.github/copilot-instructions.md',
        lines: [
          '# Repository Instructions',
          'TypeScript with strict type checking.',
          'Build: npm run build',
          'Tests: npm test with Vitest',
          'Use named exports and explicit return types.',
          'Use custom errors and structured logging.',
          'Keep rules concise; show preferred patterns.'
        ],
        proofTitle: 'What to inspect',
        proof: [
          { title: 'Scope', text: 'Is this a stable repository convention?' },
          { title: 'Delivery', text: 'Does the eligible chat list this file in References?' },
          { title: 'Quality', text: 'Do tests and diff review confirm the result?' }
        ]
      }
    }),
    S('path-instructions', 1, 'applyTo makes path-specific instructions conditional', {
      scene: 'artifact', pill: 'Instructions · File-level scope',
      subtitle: 'A matching request may receive this rule alongside supported repository guidance.',
      artifact: {
        badge: 'ILLUSTRATIVE FILE · VERIFY HOST SUPPORT',
        filename: '.github/instructions/models.instructions.md',
        lines: [
          '---',
          'applyTo: "src/models/**/*.ts"',
          '---',
          '# Database Model Instructions',
          'Use prisma/schema.prisma.',
          'Define relations with @relation.',
          'Index foreign keys.',
          'Use snake_case in DB; camelCase in TypeScript.',
          'Include createdAt and updatedAt.'
        ],
        proofTitle: 'Selector test',
        proof: [
          { title: 'Matches', text: 'src/models/user.ts is in scope.' },
          { title: 'Does not match', text: 'src/api/users.ts is outside this glob.' },
          { title: 'No applyTo', text: 'No automatic path match; attach manually if supported.' }
        ]
      }
    }),
    S('economical-instructions', 1, 'Useful instructions are short, motivated, and concrete', {
      scene: 'scorecard', pill: 'Instructions · Authoring',
      subtitle: 'Preserve context for the task, relevant code, and tool results.',
      cards: [
        { icon: '1', title: 'One idea per rule', description: 'Split a compound instruction into small statements that are easy to inspect.' },
        { icon: '💡', title: 'Explain the reason', description: 'A rule with a decision rationale transfers better to unfamiliar files.' },
        { icon: '✅', title: 'Show examples', description: 'Preferred and avoided snippets beat vague style adjectives.' },
        { icon: '🧹', title: 'Let tools lint', description: 'Leave tabs, quotes, and import order to deterministic tooling where possible.' }
      ]
    }),
    S('agents-playbook', 1, 'AGENTS.md carries local operating knowledge', {
      scene: 'showdown', pill: 'Instructions · Portable playbook',
      subtitle: 'Keep commands and local workflow separate from Copilot-specific file selectors.',
      leftLabel: 'AGENTS.md playbook', rightLabel: 'Copilot instructions',
      pairs: [
        { left: { label: 'Setup', note: 'Install and start commands' }, right: { label: 'Shared conventions', note: 'Repository guidance for Copilot', z: 'local' } },
        { left: { label: 'Verification', note: 'Tests, lint, and PR expectations' }, right: { label: 'File scope', note: 'applyTo selects matching files', z: 'purple' } },
        { left: { label: 'Locality', note: 'Root or subproject guidance' }, right: { label: 'Portability', note: 'AGENTS.md is an open format', z: 'remote' } }
      ],
      outcomeLeft: { icon: '📁', label: 'Commands travel with the repository' },
      outcomeRight: { icon: '🎯', label: 'Selector behavior depends on the client' },
      footnote: 'Nearest-file loading and nested-file support vary across agent implementations.'
    }),
    S('init-demo', 1, 'Demo: /init drafts a baseline to review', {
      scene: 'terminal', pill: 'Instructions · Live demo',
      subtitle: 'The developer checks generated rules against the real workspace before committing.',
      termTitle: 'Illustrative walkthrough · actual output varies',
      transcript: [
        { type: 'user', text: '/init' },
        { type: 'thinking', label: 'Copilot:' },
        { type: 'response', lines: ['Inspect workspace conventions', 'Draft .github/copilot-instructions.md'] },
        { type: 'outcome', text: 'Developer reviews, trims, and commits the proposed baseline' },
        { type: 'divider' },
        { type: 'user', text: 'Ask for one bounded repository task' },
        { type: 'response', lines: ['Inspect References or diagnostics for delivery', 'Run the project checks; review the changed files'] },
        { type: 'outcome', text: 'A reviewer decides whether the result is acceptable' }
      ],
      footnote: 'Live demo cue: use a safe sample repository. This transcript is illustrative, not measured output.'
    }),
    S('prompts-opener', 2, 'Custom Prompts', {
      scene: 'opener',
      subtitle: 'Solve the task in chat. Freeze the working recipe as a team /command.',
      cards: [
        { icon: '🧪', title: 'Solve first', blurb: 'Keep the working steps' },
        { icon: '👥', title: 'Share', blurb: 'One recipe, reusable inputs' },
        { icon: '🎓', title: 'Graduate later', blurb: 'Add execution when earned' }
      ],
      terminal: { context: '/create-prompt after a solved task', detail: 'Not a blank-buffer guess' }
    }),
    S('prompt-anatomy', 2, 'A prompt file captures task, inputs, and context', {
      scene: 'artifact', pill: 'Custom Prompts · Anatomy',
      subtitle: 'The human invokes a slash command; the file can parameterize a recipe and link shared instructions.',
      artifact: {
        badge: 'ILLUSTRATIVE FILE · FRONTMATTER SUPPORT VARIES BY HOST',
        filename: '.github/prompts/component.prompt.md',
        lines: [
          '---',
          'name: component',
          'description: Generate a typed component and tests',
          'tools: ["editFiles", "createFile"]',
          'agent: agent',
          '---',
          '# Component Generator',
          'Create ${input:componentName:Component name}.',
          'Use ${selection} and ${file} when relevant.',
          'Link ../copilot-instructions.md.',
          'Create component, type, test, and index files.'
        ],
        proofTitle: 'What these fields do',
        proof: [
          { title: 'Trigger', text: 'A person chooses /component and supplies an input.' },
          { title: 'Context', text: 'Selection and file variables refer to editor context.' },
          { title: 'Authority', text: 'Prompt configuration is not human approval or a security control.' }
        ]
      }
    }),
    S('create-prompt', 2, 'Worked example: preserve a component task that worked', {
      scene: 'terminal', pill: 'Custom Prompts · Worked transcript',
      subtitle: 'The team captures the tested recipe instead of copying a one-off answer.',
      termTitle: 'Illustrative transcript · not product output',
      transcript: [
        { type: 'user', text: 'Scaffold a React component with types and Vitest tests.' },
        { type: 'response', lines: ['Example result: component, types, test, index', 'Developer checks the files against repository rules'] },
        { type: 'user', text: '/create-prompt Save this as /component' },
        { type: 'thinking', label: 'Copilot:' },
        { type: 'response', lines: ['Draft .github/prompts/component.prompt.md', 'Add a componentName input; link shared instructions'] },
        { type: 'outcome', text: 'Team can invoke the reviewed recipe as /component' }
      ],
      footnote: 'Static worked transcript; filenames and output depend on the repository and host.'
    }),
    S('prompt-to-skill', 2, 'Keep a prompt until runnable capability earns a skill', {
      scene: 'showdown', pill: 'Custom Prompts · Decision',
      subtitle: 'Select by who triggers work and whether the recipe needs linked resources.',
      leftLabel: 'Prompt fits', rightLabel: 'Skill fits',
      pairs: [
        { left: { label: 'Trigger', note: 'Person invokes /command' }, right: { label: 'Trigger', note: 'Task match or explicit /skill', z: 'purple' } },
        { left: { label: 'Contents', note: 'Text steps and input fields' }, right: { label: 'Contents', note: 'SKILL.md plus linked resources', z: 'local' } },
        { left: { label: 'Maturity', note: 'Recipe still being refined' }, right: { label: 'Maturity', note: 'Proven task needs a script/template', z: 'green' } }
      ],
      outcomeLeft: { icon: '💬', label: 'Human-triggered shared recipe' },
      outcomeRight: { icon: '⚡', label: 'Packaged capability with runnable parts' },
      footnote: 'A prompt can specify tools in supported hosts; it does not grant human approval.'
    }),
    S('keep-prompts-thin', 2, 'Keep prompts thin: link rules and parameterize the task', {
      scene: 'signals', pill: 'Custom Prompts · Maintenance',
      subtitle: 'One source of truth makes changes reviewable and avoids convention drift.',
      rows: [
        { label: 'Shared rules', description: 'Link to instructions rather than copying the constitution', tag: 'single source', z: 'local' },
        { label: 'Variable task', description: 'Use input, selection, and file context intentionally', tag: 'reusable command', z: 'purple' },
        { label: 'Stable sequence', description: 'Prove the recipe before packaging resources', tag: 'then graduate', z: 'green' }
      ],
      footnote: 'Prompt frontmatter, variable syntax, and available tool names are host/version-specific; verify before relying on them.'
    }),
    S('skills-opener', 3, 'Skills', {
      scene: 'opener',
      subtitle: 'Graduate the proven prompt. Add scripts and templates the agent can actually use.',
      cards: [
        { icon: '📦', title: 'A pack', blurb: 'Instructions plus resources' },
        { icon: '🎛️', title: 'A selector', blurb: 'Task match or /skill' },
        { icon: '🧪', title: 'A live demo', blurb: 'Package a proven workflow' }
      ],
      terminal: { context: '/create-skill from proven test work', detail: 'Prompt solved it; skill packages it' }
    }),
    S('progressive-skill-loading', 3, 'A skill separates discovery, instructions, and resources', {
      scene: 'four-phases', pill: 'Skills · Loading model',
      subtitle: 'This is the documented progressive-loading model; host behavior and availability require a current check.',
      stageLabel: 'Level',
      gateLabel: 'task match',
      stages: [
        { label: '1', name: 'Discovery', icon: '🔎', description: 'Name and description make the skill discoverable.' },
        { label: '2', name: 'Instructions', icon: '📖', description: 'Load SKILL.md when the task is relevant or invoked.' },
        { label: '3', name: 'Resources', icon: '🛠️', description: 'Use linked scripts, examples, or templates during work.', target: true }
      ],
      footnote: 'Avoid claiming a fixed context cost; actual discovery and resource loading are host-specific.'
    }),
    S('skill-anatomy', 3, 'A skill folder makes each supporting file reachable', {
      scene: 'artifact', pill: 'Skills · Pack anatomy',
      subtitle: 'The description supports relevance; SKILL.md links the resources used by the workflow.',
      artifact: {
        badge: 'ILLUSTRATIVE FILE · TEST HOST SUPPORT',
        filename: '.github/skills/test-runner/SKILL.md',
        lines: [
          '---',
          'name: test-runner',
          'description: Run tests and analyze failures',
          '---',
          '# Test Runner Skill',
          '1. Detect the runner from package.json.',
          '2. Run [scripts/run-tests.sh](scripts/run-tests.sh).',
          '3. Start from [assets/test-template.ts](assets/test-template.ts).',
          '4. Inspect the output and suggest targeted fixes.'
        ],
        proofTitle: 'Folder contents',
        proof: [
          { title: 'Instructions', text: 'SKILL.md defines when and how to use it.' },
          { title: 'Executable', text: 'scripts/run-tests.sh is an action; inspect it first.' },
          { title: 'Template', text: 'assets/test-template.ts provides a concrete start.' }
        ]
      }
    }),
    S('skill-runner-script', 3, 'The referenced script performs an executable action', {
      scene: 'artifact', pill: 'Skills · Script',
      subtitle: 'A script can run commands with real effects; inspect its code and environment before invocation.',
      artifact: {
        badge: 'ILLUSTRATIVE BASH · PORT OR VERIFY FOR YOUR HOST',
        filename: 'scripts/run-tests.sh',
        lines: [
          '#!/usr/bin/env bash',
          'set -euo pipefail',
          'TARGET="${1:-}"',
          'if [[ -n "$TARGET" ]]; then',
          '  npm test -- "$TARGET"',
          'else',
          '  npm test',
          'fi',
          'if [[ "${2:-}" == "--coverage" ]]; then',
          '  npm run test:coverage',
          'fi'
        ],
        proofTitle: 'Execution boundary',
        proof: [
          { title: 'Input', text: 'Optional target path and coverage flag.' },
          { title: 'Action', text: 'Runs npm test; coverage invokes another script.' },
          { title: 'Check', text: 'Inspect package scripts and capture exit status.' }
        ]
      }
    }),
    S('test-template', 3, 'A linked test template exposes the expected starting pattern', {
      scene: 'artifact', pill: 'Skills · Template',
      subtitle: 'The agent can adapt the house pattern, then a developer verifies the test and its assertions.',
      artifact: {
        badge: 'ILLUSTRATIVE TEMPLATE · ADAPT IMPORTS TO THE PROJECT',
        filename: 'assets/test-template.ts',
        lines: [
          'import { render, screen } from "@testing-library/react";',
          'import { ComponentUnderTest } from "./ComponentUnderTest";',
          '',
          'describe("ComponentUnderTest", () => {',
          '  it("renders the main region", () => {',
          '    render(<ComponentUnderTest />);',
          '    expect(screen.getByRole("main")).toBeInTheDocument();',
          '  });',
          '});'
        ],
        proofTitle: 'Review the result',
        proof: [
          { title: 'Reachability', text: 'SKILL.md links to the template path.' },
          { title: 'Adaptation', text: 'Imports and expected roles must match the app.' },
          { title: 'Acceptance', text: 'Run the test and inspect what it actually asserts.' }
        ]
      }
    }),
    S('create-skill-demo', 3, 'Demo: package proven test work as a skill', {
      scene: 'terminal', pill: 'Skills · Live demo',
      subtitle: 'The presenter creates the pack, checks its files, and runs a bounded test.',
      termTitle: 'Illustrative walkthrough · actual output varies',
      transcript: [
        { type: 'user', text: '/create-skill from how we just ran and fixed the API tests' },
        { type: 'response', lines: ['Draft .github/skills/test-runner/', 'Add SKILL.md, script, and test template'] },
        { type: 'user', text: 'Keep the test workflow discoverable and invocable' },
        { type: 'response', lines: ['Check this host’s skill invocation settings', 'Verify SKILL.md links resolve to the right files'] },
        { type: 'divider' },
        { type: 'user', text: 'Run one bounded test target' },
        { type: 'response', lines: ['Inspect the command and its output', 'Run independent checks; review the diff'] },
        { type: 'outcome', text: 'The developer accepts or rejects the resulting work' }
      ],
      footnote: 'Live demo cue: use a non-production repository. Do not equate script execution or test pass with approval.'
    }),
    S('agents-opener', 4, 'Agents', {
      scene: 'opener',
      subtitle: 'Compose the stack into a role. Make available tools and handoffs visible.',
      cards: [
        { icon: '🔒', title: 'Constrain', blurb: 'Name the available tools' },
        { icon: '🔄', title: 'Hand off', blurb: 'Transfer a bounded plan' },
        { icon: '👤', title: 'Approve', blurb: 'Keep acceptance human-led' }
      ],
      terminal: { context: 'Read-only Planner → Implementer', detail: 'A handoff is not approval' }
    }),
    S('planner-agent', 4, 'A read-only Planner separates research from implementation', {
      scene: 'artifact', pill: 'Agents · Role boundary',
      subtitle: 'A handoff can transfer the plan; a human or governed workflow still decides whether implementation is accepted.',
      artifact: {
        badge: 'ILLUSTRATIVE VS CODE AGENT · CHECK CURRENT SCHEMA',
        filename: '.github/agents/planner.agent.md',
        lines: [
          '---',
          'name: planner',
          'description: Research the codebase and return a plan.',
          'tools: ["search", "readFile", "listFiles", "fetch"]',
          'handoffs:',
          '  - label: Start Implementation',
          '    agent: agent',
          '    send: false',
          '---',
          'Research affected files; cite evidence.',
          'Return steps, checks, and risks. Do not edit.'
        ],
        proofTitle: 'Authority check',
        proof: [
          { title: 'Declared tools', text: 'The example omits edit tools; inspect the active host UI.' },
          { title: 'Handoff', text: 'Transfers context to an implementation role.' },
          { title: 'Approval', text: 'A handoff does not approve files, tests, or a release.' }
        ]
      }
    }),
    S('create-agent', 4, 'A handoff moves a plan, not approval authority', {
      scene: 'terminal', pill: 'Agents · Worked transcript',
      subtitle: 'The Planner returns evidence and offers a next role; the implementer and reviewer remain distinct.',
      termTitle: 'Illustrative transcript · not product output',
      transcript: [
        { type: 'user', text: '/create-agent a read-only planner with an implementer handoff' },
        { type: 'response', lines: ['Draft a Planner definition and inspect its tools', 'Keep file-editing tools outside the Planner example'] },
        { type: 'user', text: 'Plan rate limiting for the users API' },
        { type: 'response', lines: ['Example: cite the route and tests to inspect', 'Return an implementation plan; make no edit'] },
        { type: 'outcome', text: 'A person chooses whether to hand off and reviews resulting changes' }
      ],
      footnote: 'Static example. Available tools, model options, and handoff schema vary by VS Code version.'
    }),
    S('configuration-stack', 4, 'The primitives compose without becoming interchangeable', {
      scene: 'four-phases', pill: 'Agents · Composition',
      subtitle: 'Use each layer for its intended trigger and scope; shared instructions are not a workflow engine.',
      stageLabel: 'Layer',
      gateLabel: 'prove fit',
      stages: [
        { label: '1', name: 'Instructions', icon: '📋', description: 'Stable conventions selected by repository or file scope.' },
        { label: '2', name: 'Prompts', icon: '💬', description: 'A person invokes the proven task recipe.' },
        { label: '3', name: 'Skills', icon: '⚡', description: 'Relevant guidance can use linked scripts and templates.' },
        { label: '4', name: 'Agents', icon: '🤖', description: 'A selected role has configured tools and handoffs.', target: true }
      ],
      footnote: 'AGENTS.md complements instructions as an open playbook; it is not a fifth Copilot primitive.'
    }),
    S('choose-primitive', 4, 'Choose by scope, trigger, resources, and role', {
      scene: 'signals', pill: 'Agents · Decision model',
      subtitle: 'Start with the repeated decision, then add only the structure it requires.',
      rows: [
        { label: 'Always in repository', description: 'Stable conventions and broad setup guidance', tag: 'instructions', z: 'local' },
        { label: 'Only matching files', description: 'A path rule with a tested applyTo glob', tag: 'instructions', z: 'purple' },
        { label: 'Repeatable task', description: 'A person selects a shared task recipe', tag: 'prompt', z: 'remote' },
        { label: 'Needs resources', description: 'A proven workflow uses scripts or templates', tag: 'skill', z: 'green' },
        { label: 'Role boundary', description: 'A selected persona has scoped tools/handoff', tag: 'agent', z: 'orange' }
      ],
      footnote: 'Model/provider choice is separate: use Manage Language Models. Re-check dated release notes and host support.'
    }),
    S('before-after', 0, 'From repeated context to reviewed shared knowledge', {
      scene: 'before-after',
      before: [
        'Repeat conventions in every chat',
        'Copy a solved scaffolding recipe',
        'Build a skill before its task works',
        'Mistake tool access for approval'
      ],
      after: [
        'Review and commit a concise baseline',
        'Capture proven work as a prompt',
        'Add a script or template when useful',
        'Name a reviewer for the result'
      ],
      metrics: [
        { value: 'Smallest fit', detail: 'Start with only the needed primitive' },
        { value: 'Prompt → skill', detail: 'Graduate after proving the recipe' },
        { value: 'Evidence chain', detail: 'Delivery, checks, acceptance differ' }
      ]
    }),
    S('today', 0, 'Try one rule, inspect delivery, and check its result', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Draft one concise repository rule.', 'Ask one bounded task.', 'Inspect References and the diff.'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Add one path rule with an explicit applyTo.', 'Test one matching and one outside-scope file.', 'Record checks and the reviewer.'] },
        { icon: '🚀', label: 'This Month', z: 'purple', items: ['Freeze a task that already worked as a prompt.', 'Graduate only when scripts/templates add value.', 'Pause if a selector, execution, or acceptance boundary fails.'] }
      ],
      takeaway: 'Apply the decision to your repository: name the owner, selector, evidence, and person who accepts the result.'
    }),
    S('references', 0, 'References', {
      scene: 'references', subtitle: 'Check current host support; source-check dates are in the notes.', groups: [
        { icon: '📖', title: 'VS Code documentation', z: 'local', items: [
          { label: 'Customization overview', href: SRC.overview.href, description: 'Scope and supported customization options.' },
          { label: 'Custom instructions', href: SRC.instructions.href, description: 'Instruction file syntax and selectors.' },
          { label: 'Prompt files', href: SRC.prompt.href, description: 'Prompt structure, variables, and invocation.' },
          { label: 'Agent Skills', href: SRC.skills.href, description: 'Skill files, resources, and loading.' },
          { label: 'Custom agents', href: SRC.agents.href, description: 'Agent configuration, tools, and handoffs.' }
        ] },
        { icon: '🛠️', title: 'GitHub and diagnostics', z: 'purple', items: [
          { label: 'Repository instructions', href: SRC.githubInstructions.href, description: 'GitHub-side instruction support.' },
          { label: 'Instructions support reference', href: SRC.support.href, description: 'Feature support by GitHub surface.' },
          { label: 'AGENTS.md', href: SRC.agentsMd.href, description: 'Open agent-facing playbook format.' },
          { label: 'VS Code v1.122 release notes', href: SRC.release.href, description: 'June 2026 provider and authentication notes.' },
          { label: 'Configure language models', href: SRC.models.href, description: 'Manage Language Models and BYOK setup.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Copilot Configuration Primitives', {
      scene: 'thanks', chrome: false, visual: 'primitive-map',
      subtitle: 'Encode the convention once. Graduate the workflow when it is proven.',
      cards: [
        { value: 'Instructions', detail: 'Choose the right selector' },
        { value: 'Prompts', detail: 'Freeze solved work' },
        { value: 'Skills', detail: 'Add runnable resources' }
      ],
      prompt: 'What rule or workflow will you test in your repository next?'
    })
  ];

  const NOTES = {
    title: {
      notes: ['"We all know the feeling: Copilot writes something plausible, but it does not quite fit how this repository works."', '"This talk is about encoding the repeatable parts once, then proving that the right context reached the work."'],
      know: ['The four-part progression and examples come from the approved recipe and the existing talk. They are teaching examples, not product output.'],
      sources: sources('overview'),
      seconds: 10
    },
    'core-question': {
      notes: ['"The question is simple: how do I make Copilot understand my codebase better?"', '"The answer is not to create every file type. Choose the smallest primitive that fits, then check delivery and acceptance separately."'],
      know: ['The question is the README question, kept in the learner’s voice. The thesis belongs in the subtitle and highlight.'],
      sources: sources('overview', 'instructions'),
      seconds: 35
    },
    contents: {
      notes: ['"We will start with instructions, capture a solved workflow as a prompt, graduate the recipe into a skill, and then constrain a role with an agent."', '"The order matters: a working recipe comes before extra automation."'],
      know: ['Contents slide numbers refer to the four opener slides: 4, 14, 19, and 25.'],
      sources: sources('overview'),
      seconds: 35
    },
    'instructions-opener': {
      notes: ['"Before picking a file, decide who owns the context and which work needs it."', '"Then we will verify delivery without confusing it with a good result or an approval."'],
      know: ['One-request facts remain in the request; personal preferences remain user-controlled. Keep credentials, customer records, and production payloads out of examples and shared prompts.'],
      sources: sources('instructions', 'agentsMd', 'debug'),
      seconds: 20
    },
    'place-context': {
      notes: ['"Treat these four choices as a placement check: owner, lifetime, selector, and evidence."', '"A stable team rule can be shared. A one-time detail does not need to become permanent policy."'],
      know: ['An owner can be a code owner or team maintainer. A personal preference stays under the individual’s control. Evidence can include the loaded customization, tool activity, test result, diff, and required reviewer decision. Sensitive data, credentials, customer records, and production payloads stay out of shared prompts and repository examples. All primitives share a model context window; “two pages max” is the old README’s rule of thumb, not a measured cap.'],
      sources: sources('overview', 'instructions', 'agentsMd'),
      seconds: 90
    },
    'delivery-chain': {
      notes: ['"This sequence prevents a common leap: seeing a file listed and assuming the result is correct."', '"Eligibility is about the selector. Loading is about delivery. Execution, validation, and acceptance each need their own evidence."'],
      know: ['The References section in VS Code or Chat Debug View can help identify context included in a request. Neither proves all instructions were followed. Tests, type checks, review, and approval answer different questions.'],
      sources: sources('debug', 'troubleshooting', 'instructions'),
      seconds: 100
    },
    'repair-selector': {
      notes: ['"The request edits an orders file, but the example rule selects payments."', '"Fix the first broken boundary: change the glob, then inspect the loaded context and rerun checks. Eligibility alone is not acceptance."'],
      know: ['The file paths and selector are illustrative. A glob’s exact matching behavior belongs to the supported client and version. Confirm the request target, selector, References or diagnostics, used tools, independent checks, diff, and owner decision in that order.'],
      sources: sources('instructions', 'debug', 'troubleshooting'),
      seconds: 95
    },
    'instruction-surfaces': {
      notes: ['"The repository file is broad; applyTo scopes a file-specific rule; AGENTS.md is a portable playbook for agent-facing setup and workflow."', '"They solve related but different placement problems, and host support is not identical."'],
      know: ['The long README describes repository-wide Copilot instructions, path-specific .instructions.md files, and AGENTS.md. Do not assume every coding agent reads AGENTS.md or that nested-file precedence is universal. Check current host documentation.'],
      sources: sources('instructions', 'githubInstructions', 'support', 'agentsMd'),
      seconds: 100
    },
    'repo-instructions': {
      notes: ['"This example is intentionally compact: a small number of project-specific rules, build and test commands, and an error-handling pattern."', '"After saving it, ask a bounded task and inspect References. Then check the code and tests yourself."'],
      know: ['The file is an illustrative TypeScript and Vitest example, not a measured improvement or a universal template. Repository instructions may be supported differently across Copilot surfaces; the GitHub support reference lists feature coverage. A rule’s presence does not force the model to comply.'],
      sources: sources('instructions', 'githubInstructions', 'support'),
      seconds: 115
    },
    'path-instructions': {
      notes: ['"The frontmatter field is the selector: src/models TypeScript files match; an API route does not."', '"When a rule is unexpectedly absent, check the exact path and glob before rewriting the guidance."'],
      know: ['The example keeps the original Prisma, relation, index, database naming, and audit-field conventions. When a matching request is handled by a supported client, repo-wide and path-specific guidance may combine. A missing applyTo means the file is not selected automatically by that glob mechanism; manual context options vary. In a monorepo, use separate globs for web, API, and mobile conventions, then test one file in each area.'],
      sources: sources('instructions', 'githubInstructions', 'support'),
      seconds: 110
    },
    'economical-instructions': {
      notes: ['"Every line competes with the task, relevant source, and tool output for context."', '"A reason and a concrete example help a developer decide whether the rule still fits. Let linters own deterministic formatting."'],
      know: ['The README recommends concise instructions and gives a two-page rule of thumb. That is guidance, not a measured context threshold. Keep rules stable, relevant, and reviewed; split task recipes into prompts instead of loading them everywhere.'],
      sources: sources('instructions', 'overview'),
      seconds: 85
    },
    'agents-playbook': {
      notes: ['"Put setup, test, navigation, and pull-request expectations in a playbook that agents which read AGENTS.md can use."', '"Use Copilot instruction files for Copilot-specific selectors. Verify nested-file behavior in the agent you actually run."'],
      know: ['AGENTS.md is an open Markdown convention, not a guarantee that every agent consumes it. The original README describes nested files as experimental; availability and precedence are runtime-specific. For onboarding, ask a new contributor to locate, change, test, and explain one bounded feature from committed guidance, then record remaining corrections.'],
      sources: sources('agentsMd', 'instructions'),
      seconds: 90
    },
    'init-demo': {
      notes: ['"I am going to let /init draft, not approve, the first version."', '"Now I will compare it with the repository, remove guesses, and commit only rules the team accepts."', '"On a bounded follow-up task, References can show delivery. Tests and review decide whether the result is good."'],
      know: ['The transcript is illustrative. Actual command availability and generated content depend on the VS Code version, extension, repository, and environment. References demonstrates delivery of context, not instruction compliance or acceptance.'],
      cue: [
        'Open a safe, representative repository with known conventions.',
        'Run /init and wait for the proposed instruction file.',
        'Compare every proposed command and rule with repository reality; delete guesses and overly broad advice.',
        'Save the reviewed file, then ask for one bounded change.',
        'Inspect References or diagnostics for delivery, run independent checks, inspect the diff, and name the human reviewer.'
      ],
      sources: sources('instructions', 'debug', 'troubleshooting'),
      seconds: 180
    },
    'prompts-opener': {
      notes: ['"A prompt file is most useful after someone has solved the task in chat."', '"We will capture the recipe and inputs without copying the repository constitution into every task."'],
      know: ['Prompt files are invoked by the user as a task recipe. Supported frontmatter and invocation details depend on the current VS Code host and version. The original README notes workspace files under .github/prompts and user-profile prompts as options; confirm the current location and sharing semantics in the target host.'],
      sources: sources('prompt'),
      seconds: 20
    },
    'prompt-anatomy': {
      notes: ['"Here are the parts: the name and description, a human-supplied component name, optional editor context, and a link to shared instructions."', '"The tools and agent fields are configuration, not a human approval."'],
      know: ['The example preserves ${input:componentName:Component name}, ${selection}, and ${file}. The prompt-file documentation defines supported variables and frontmatter. Tool identifiers and interactions with the selected agent are host- and version-specific; inspect actual active settings. The original long README claims that prompt-specified tools take priority over a referenced agent’s tool restrictions. Treat that claim as version-specific, verify current documentation and the effective tool list, and never rely on prompt metadata as a privilege boundary.'],
      sources: sources('prompt', 'agents'),
      seconds: 120
    },
    'create-prompt': {
      notes: ['"The task is already solved: component, types, and tests are reviewed against local conventions."', '"Now /create-prompt captures the steps and makes the component name an input. The output here is an illustrative transcript, not a guaranteed command result."'],
      know: ['The original talk uses /create-prompt and the example path .github/prompts/component.prompt.md. Validate generated paths, test framework, links, prompt variables, and any tool configuration before sharing.'],
      sources: sources('prompt', 'instructions'),
      seconds: 115
    },
    'prompt-to-skill': {
      notes: ['"If a person wants to trigger a text recipe, keep it as a prompt."', '"When the task has a proven runner, template, or discovery behavior, a skill can package those resources."', '"The decision is maturity and need, not fashion."'],
      know: ['Prompts and skills are distinct formats. Skills can support explicit invocation and relevance matching in supported hosts. Availability, invocation settings, and resource loading vary. A runnable script may execute state-changing commands; inspect it and its environment.'],
      sources: sources('prompt', 'skills'),
      seconds: 105
    },
    'keep-prompts-thin': {
      notes: ['"Link the shared instructions so one reviewed convention has one source."', '"Parameterize the task so a teammate can reuse it, and wait to add scripts until the workflow is stable."'],
      know: ['Prompt variables include input, selection, and file in the documented VS Code experience. Do not repeat high-level rules across prompts; duplicated copies can drift. Slash command support and prompt tools vary by host.'],
      sources: sources('prompt', 'instructions'),
      seconds: 80
    },
    'skills-opener': {
      notes: ['"A skill is a folder when the workflow benefits from more than prose."', '"Next we will separate discovery, task instructions, and linked resources, then build from a test workflow we already exercised."'],
      know: ['The recipe deliberately places the skill demonstration at the talk’s engagement peak. Do not create a skill for an unproven workflow.'],
      sources: sources('skills'),
      seconds: 20
    },
    'progressive-skill-loading': {
      notes: ['"The documented model separates lightweight discovery information from the full skill instructions and their resources."', '"That is a useful design model, not a promise of zero cost or identical runtime behavior everywhere."'],
      know: ['The existing README describes three levels: name/description discovery, SKILL.md instructions on relevance or invocation, and linked resources when used. It also says skills work across VS Code, Copilot CLI, and GitHub Copilot coding agent. Confirm current compatibility and semantics at agentskills.io and the specific host before relying on portability. No fixed context savings are claimed here.'],
      sources: sources('skills'),
      seconds: 105
    },
    'skill-anatomy': {
      notes: ['"The description tells the host when this pack is relevant. The body links to the runner and template."', '"A file sitting unreferenced in the folder is not automatically part of the demonstrated workflow."'],
      know: ['The example directory is .github/skills/test-runner with SKILL.md, scripts/run-tests.sh, and assets/test-template.ts. The README also lists .github/skills for repository skills and ~/.copilot/skills for personal skills; exact locations depend on the supported runtime and current specification. Link every resource the workflow expects the agent to use.'],
      sources: sources('skills'),
      seconds: 115
    },
    'skill-runner-script': {
      notes: ['"This file is executable behavior, not documentation: it selects a test command and can request coverage."', '"Read the script and package scripts before invoking it; a skill does not make execution harmless."'],
      know: ['The displayed script uses Bash, npm test, and npm run test:coverage. Windows shells and project package scripts may differ. The script uses set -euo pipefail, accepts an optional target, and invokes coverage when the second argument is --coverage. Check its exit status and side effects.'],
      sources: sources('skills'),
      seconds: 85
    },
    'test-template': {
      notes: ['"The template makes the expected test stack visible, but it is a starting point, not proof of coverage."', '"Adapt imports and assertions to the component, run the test, and inspect what the assertion actually verifies."'],
      know: ['The example uses React Testing Library and Vitest-style describe/it/expect syntax. The sample assertion checks for a main landmark only; it does not prove component behavior, accessibility, or edge cases. Keep that limitation visible.'],
      sources: sources('skills'),
      seconds: 80
    },
    'create-skill-demo': {
      notes: ['"We have already run and fixed the test workflow. Now we can ask /create-skill to package it."', '"I will inspect every generated link and the script, check this host’s invocation options, and run one bounded test target."', '"A passing test is evidence for that check. The reviewer still decides whether the change is acceptable."'],
      know: ['The original example says default invocation can be both automatic and /skill, with user-invocable: false to hide the slash command or disable-model-invocation: true for slash-only. Those fields and semantics are availability-sensitive: the source reference was verified 2026-02-08. Check the current VS Code documentation and installed version before using them. For test-driven teams, compare generated tests with the house template, run the suite, and inspect how failures are explained. Awesome Copilot is a community-contributed example collection; treat its files as inspiration to review, not as first-party behavior guarantees.'],
      cue: [
        'Start with the tested prompt or chat history; do not invent the workflow.',
        'Run /create-skill in a safe sample repository and inspect SKILL.md, script, and template.',
        'Confirm the skill invocation settings and resource-link paths against the installed host documentation.',
        'Inspect the script and environment, then run one bounded non-production test target.',
        'Review test output and diff separately; the developer or owner decides acceptance.'
      ],
      sources: sources('skills'),
      seconds: 190
    },
    'agents-opener': {
      notes: ['"An agent definition describes a role, and its configured tools make part of that role visible."', '"A handoff moves context to another role. Approval remains a separate decision."'],
      know: ['Custom agents are described in the existing README as VS Code-specific. Check current cross-runtime support before assuming the same agent definition works elsewhere.'],
      sources: sources('agents'),
      seconds: 20
    },
    'planner-agent': {
      notes: ['"This example gives the Planner search and read tools, with no edit tool in the declared list."', '"The handoff offers an implementer role. That changes who can act next; it does not authorize or approve the result."'],
      know: ['The example names search, readFile, listFiles, and fetch, and omits editFiles. Tool identifiers, model selectors, handoff schema, and enforcement depend on the host and version. The configured list is not a replacement for operating-system permissions, repository rules, branch protections, or human review. Check the actual active agent configuration. The README’s database-schema use case requires migration checks, rollback instructions, query-plan evidence, and database-owner approval. The example database role is not proof that those controls are enforced.'],
      sources: sources('agents'),
      seconds: 120
    },
    'create-agent': {
      notes: ['"In this worked example, the Planner returns a plan and evidence without editing files."', '"A person chooses whether to hand off. The implementation and review stages have their own tools, checks, and acceptance owner."'],
      know: ['The static transcript keeps the original rate-limiting example but does not claim that a real agent ran it. Handoff configuration can include a prompt and may require a separate user action; inspect current behavior. A handoff is not approval, deployment, or a security boundary by itself. Custom-agent files may live in a repository or a user profile; an organization can also distribute private configuration. Verify current VS Code storage and organization options.'],
      sources: sources('agents'),
      seconds: 115
    },
    'configuration-stack': {
      notes: ['"Instructions carry stable context, prompts capture a human-triggered recipe, skills package guidance and resources, and agents define a selected role."', '"The layers are not a mandatory maturity ladder. Choose only the ones that solve a real repeated problem."'],
      know: ['AGENTS.md is an open agent-facing playbook and complements Copilot-specific instructions; it is not a fifth primitive in the talk’s four-part spine. Prompts, skills, and agents have distinct triggers and capabilities. The original README describes instructions as foundational; avoid implying that every subsequent primitive inherits or loads every lower layer in every runtime.'],
      sources: sources('overview', 'instructions', 'prompt', 'skills', 'agents', 'agentsMd'),
      seconds: 85
    },
    'choose-primitive': {
      notes: ['"Ask what is repeated and how it needs to activate: broad rule, matching files, explicit command, runnable resource, or selected role."', '"If your decision is model or provider rather than context placement, use Manage Language Models."', '"For every path, keep the executor and the accepting person visible."'],
      know: ['The README states that Manage Language Models in VS Code handles provider/model choices for chat, tools, and MCP. It states BYOK can support those experiences without GitHub sign-in while inline and next-edit suggestions still require GitHub sign-in. It also names Stable Custom Endpoint as the durable custom-provider contract and utility model settings for smaller supporting models. These claims are tied to the June 2026 VS Code v1.122 release notes and the language-model docs, whose README verification date is 2026-09-15. Re-check current versions, sign-in requirements, and endpoint availability before relying on them.'],
      sources: sources('models', 'release', 'overview'),
      seconds: 100
    },
    'before-after': {
      notes: ['"The change is not more configuration for its own sake. It is less repeated context and more deliberate reuse."', '"A prompt comes after a recipe works; a skill comes after a resource adds value; a reviewer still accepts the outcome."'],
      know: ['The original Slidev comparison described /init as five minutes. Treat that as an illustrative setup estimate, not a measured guarantee: repository size, host availability, and review time vary. This recap avoids turning that estimate into a benchmark.'],
      sources: sources('overview', 'instructions', 'prompt', 'skills', 'agents'),
      seconds: 45
    },
    today: {
      notes: ['"Today, draft one rule, ask one bounded task, and inspect the references and diff."', '"This week, test one matching path and one outside-scope file."', '"This month, freeze a recipe only after it works, and pause when evidence or authority is unclear."'],
      know: ['Transfer sequence: candidate task; decisive repository context; owner and selector; allowed execution; deterministic checks; reviewer; recovery path. Keep success measures as targets until measured in the team’s own work.'],
      sources: sources('instructions', 'prompt', 'skills', 'agents'),
      seconds: 90
    },
    references: {
      notes: ['"Use these first-party pages to check syntax and support in the runtime you actually use."', '"Availability changes; the original reference list carries verification dates in the landing-page frontmatter."'],
      know: ['The frontmatter marks the customization pages verified 2026-02-08, AGENTS.md verified 2026-03-23, and the June 2026 release notes and language-model guide verified 2026-09-15. These are source-check dates, not a claim that every feature remains available today.'],
      sources: sources('overview', 'instructions', 'prompt', 'skills', 'agents', 'githubInstructions', 'support', 'agentsMd', 'release', 'models', 'debug', 'troubleshooting'),
      seconds: 20
    },
    thanks: {
      notes: ['"Start with the smallest primitive that fits. Check that the right context arrived, then prove the result and name the person who accepts it."', '"What convention or solved workflow will you test in your own repository?"'],
      know: ['The deck and notes are the handout. The presenter can use the keyboard shortcuts in the native deck: N opens notes, O opens overview, R replays motion, and F toggles full screen.'],
      sources: sources('overview', 'instructions', 'prompt', 'skills', 'agents'),
      seconds: 10
    }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-primitives',
      title: 'Copilot Configuration Primitives: Making AI Understand Your Codebase',
      short: 'Instructions · Prompts · Skills · Agents',
      category: 'Practitioner Tech Talk',
      source: 'tech-talks/copilot-primitives/README.md',
      question: 'How can I make GitHub Copilot understand my codebase better?',
      thesis: 'Encode stable context with the smallest fitting primitive, then prove delivery, execution, validation, and human acceptance separately.'
    },
    slides
  };
})();
