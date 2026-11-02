/*
  Copilot Configuration Primitives — native deck.
  Slides and presenter notes are kept together so the printed notes remain the
  complete teaching source. Examples and terminal transcripts are illustrative.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    overview: { label: 'Customize AI in Visual Studio Code', href: 'https://code.visualstudio.com/docs/copilot/copilot-customization' },
    instructions: { label: 'Use custom instructions in VS Code', href: 'https://code.visualstudio.com/docs/agent-customization/custom-instructions' },
    prompt: { label: 'Use prompt files in VS Code', href: 'https://code.visualstudio.com/docs/agent-customization/prompt-files' },
    skills: { label: 'Use Agent Skills in VS Code', href: 'https://code.visualstudio.com/docs/agent-customization/agent-skills' },
    agents: { label: 'Custom agents in VS Code', href: 'https://code.visualstudio.com/docs/agent-customization/custom-agents' },
    agentSchema: { label: 'Custom agent file reference · tools and harness support', href: 'https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference#tools' },
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
    S('title', 0, 'Make your team’s know-how work with Copilot.', {
      scene: 'know-how-hero', chrome: false,
      pill: 'Copilot Configuration Primitives',
      meta: 'CopilotTraining · Practitioner Tech Talk'
    }),
    S('core-question', 0, 'How can I teach Copilot how we work—and put it to work?', {
      scene: 'working-layers', pill: 'Core Question',
      subtitle: 'Three layers you can combine for the same endpoint.',
      endpoint: '/returns',
      layers: [
        { title: 'Convention', question: ['How do we work here?'], primitive: 'Instructions + AGENTS.md',
          action: ['Use our API pattern'], detail: ["router.post('/returns',", '  validate, createReturn);'] },
        { title: 'Implementation', question: ['How do we carry out', 'this task?'], primitive: 'Prompts + Skills',
          action: ['Build an endpoint', 'with tests'], detail: ['routes/returns.ts', 'tests/returns.test.ts'] },
        { title: 'Specialization', question: ['Which role and tools', 'fit this work?'], primitive: 'Custom agents · .agent.md',
          action: ['Review the endpoint', 'with a focused reviewer'], detail: ['Read code · inspect tests', 'Report findings for a person'] }
      ],
      verification: 'Inspect the diff · run tests · a person decides.',
      footnote: 'Use the layers that fit. Handoffs are optional. Examples are illustrative.'
    }),
    S('contents', 0, 'Four primitives for reusable team know-how', {
      scene: 'contents', sections: [
        { icon: '📋', title: 'Instructions', subtitle: 'Reuse team know-how', blurb: 'Useful examples, maintained guidance, and focused delivery.', slide: 4 },
        { icon: '💬', title: 'Custom Prompts', subtitle: 'Capture useful work', blurb: 'A person invokes a shared workflow with a new input.', slide: 15 },
        { icon: '⚡', title: 'Skills', subtitle: 'Discover relevant expertise', blurb: 'Load task knowledge, then use optional resources as needed.', slide: 20 },
        { icon: '🤖', title: 'Agents', subtitle: 'Put expertise to work', blurb: 'A focused recurring role with fitting tools and a reviewable proposal.', slide: 26 }
      ]
    }),
    S('instructions-opener', 1, 'Instructions', {
      scene: 'opener',
      subtitle: 'Teach Copilot once. Carry your team’s know-how into the next task.',
      cards: [
        { icon: '📋', title: 'Share', blurb: 'Make useful knowledge reusable' },
        { icon: '🔄', title: 'Maintain', blurb: 'Turn review into better guidance' },
        { icon: '🎯', title: 'Focus', blurb: 'Bring the right rule to the task' }
      ],
      terminal: { context: 'A reviewed instruction → the next task', detail: 'People check the result' }
    }),
    S('reusable-improvements', 1, 'All teams contribute to shared instructions', {
      scene: 'instruction-reuse', pill: 'Instructions · Shared knowledge',
      subtitle: 'Product, accessibility, engineering, and operations each add a reusable line.',
      contributions: [
        { team: 'PRODUCT', rule: 'Record unresolved decisions under Open Questions.' },
        { team: 'DESIGN + ACCESSIBILITY', rule: 'Keep keyboard access and visible focus in interactive flows.' },
        { team: 'ENGINEERING', rule: 'Validate request bodies with the shared schema helper.' },
        { team: 'OPERATIONS', rule: 'When deploy steps change, record command, result, and rollback.' }
      ],
      footnote: 'Illustrative team contributions converge in one reviewed file. Supported chat may include relevant guidance; inspect the work.'
    }),
    S('knowledge-sources', 1, 'Bring knowledge from across the organization', {
      scene: 'instruction-sources', pill: 'Instructions · Shared knowledge',
      subtitle: 'Organization requirements, repository conventions, and your own working preferences.',
      lanes: [
        { label: 'ORGANIZATION', owner: 'Organization admin', location: 'GitHub.com organization settings',
          rule: ['Use the approved HTTP client.', 'Keep credentials out of examples.'],
          update: ['Admin updates central guidance.', 'Accessible supported sessions discover it.'] },
        { label: 'REPOSITORY', owner: 'Repository maintainer', location: '.github/copilot-instructions.md',
          rule: ['Use the shared schema helper.', 'Follow src/api/orders.ts for endpoints.'],
          update: ['Team reviews and merges the diff.', 'Contributors pull the updated file.'] },
        { label: 'PERSONAL / USER', owner: 'You', location: '~/.copilot/instructions/copilot-instructions.md',
          rule: ['Explain tradeoffs before editing.', 'Summarize checks in a short list.'],
          update: ['You edit your local user guidance.', 'It stays personal unless you share or sync.'] }
      ],
      footnote: 'Check harness support and discovery settings. These sources are not a universal precedence ladder or security enforcement.'
    }),
    S('useful-instructions', 1, 'Turn vague advice into useful instructions', {
      scene: 'instruction-examples', pill: 'Instructions · Write for action',
      subtitle: 'Give Copilot a concrete action and give the reviewer something observable.',
      examples: [
        { phase: 'REQUIREMENTS', weak: 'Write good requirements.',
          rule: ['For each requirement, include observable acceptance criteria.',
            'Record unresolved decisions under Open Questions.'],
          result: ['Acceptance: invalid body → 400.', 'Open Questions: who approves exceptions?'] },
        { phase: 'APPLICATION CODE', weak: 'Follow our coding standards.',
          rule: ['Validate request bodies with the shared schema helper.',
            'Use an existing endpoint as the reference pattern.'],
          result: ['router.post("/returns", validate, createReturn);', 'Review the helper and reference endpoint.'] },
        { phase: 'OPERATIONS', weak: 'Keep documentation current.',
          rule: ['For deployment changes, read ../docs/deployment.md.',
            'In docs/runbooks/deployment.md, record the command,',
            'expected result, and rollback.'],
          result: ['docs/runbooks/deployment.md', 'Command: npm run deploy:preview'] }
      ],
      footnote: 'Illustrative instructions and excerpts. Adapt helper names, commands, and acceptance criteria to your project.'
    }),
    S('maintain-guidance', 1, 'Review significant changes for guidance updates', {
      scene: 'instruction-maintenance', pill: 'Instructions · Maintain',
      subtitle: 'Ask Copilot whether a durable rule changed; review a targeted edit or keep guidance unchanged.',
      change: 'A deployment command changes from npm run deploy:staging to npm run deploy:preview.',
      request: '“Does this change make our shared runbook instruction stale? Propose only a necessary edit.”',
      before: ['Update runbook after deploy', 'steps change.'],
      after: ['Record verified command and', 'expected result + rollback.'],
      next: ['Next deployment change: follow the reviewed rule.',
        'Check the command, expected result, and rollback.'],
      footnote: 'A named maintainer owns shared guidance. Keep one-off fixes in the task; remove stale rules and skip edits when no durable rule changed.'
    }),
    S('instruction-surfaces', 1, 'Put each rule where it belongs', {
      scene: 'instruction-locations', pill: 'Instructions · Choose a home',
      subtitle: 'Choose the audience first, then use a location your selected harness supports.',
      locations: [
        ['Organization', 'GitHub organization settings', 'Centrally maintained requirements'],
        ['Personal / user', '~/.copilot/instructions/*.instructions.md', 'Copilot harness example · local to you'],
        ['Repository-wide', '.github/copilot-instructions.md', 'Shared Copilot conventions'],
        ['Project playbook', 'AGENTS.md', 'Setup, tests, workflow · compatible agents'],
        ['Targeted files', '.github/instructions/*.instructions.md', 'applyTo frontmatter · matching files']
      ],
      footnote: 'AGENTS.md is project guidance. A custom .agent.md defines a role. An uncommitted repository file is not a user instruction scope.'
    }),
    S('repo-instructions', 1, 'Keep the shared baseline short; point to task detail', {
      scene: 'instruction-repo', pill: 'Instructions · Repository-wide',
      subtitle: 'Keep shared guidance actionable; put deep knowledge in documents and name when Copilot reads them.',
      baseline: [
        'For deployment changes, read [deployment guidance](../docs/deployment.md).',
        'For customer-facing changes, read [accessibility guidance](../docs/accessibility.md).'
      ],
      details: [
        { filename: 'docs/deployment.md', detail: 'Command · expected result · rollback', z: 'purple' },
        { filename: 'docs/accessibility.md', detail: 'Focused detail for customer-facing work', z: 'orange' }
      ],
      footnote: 'A Markdown link is a pointer, not a guarantee of loading. The explicit “read” instruction names when Copilot consults the document.'
    }),
    S('path-instructions', 1, 'Focus guidance on the files Copilot changes', {
      scene: 'instruction-selectors', pill: 'Instructions · applyTo',
      subtitle: 'A runbook rule belongs in a path-specific file and joins when the edited path matches.',
      selectors: [
        { name: '.github/instructions/runbooks.instructions.md', glob: 'docs/runbooks/**/*.md',
          rule: 'When updating a runbook, include the command, expected result, and rollback step.',
          match: 'docs/runbooks/deployment.md', miss: 'docs/accessibility.md' }
      ],
      footnote: 'Illustrative VS Code applyTo route. A path match selects guidance; it does not prove that Copilot followed it.'
    }),
    S('instruction-context', 1, 'One turn assembles only relevant guidance', {
      scene: 'instruction-context', pill: 'Instructions · Context flow',
      subtitle: 'The shared baseline arrives automatically; a matching rule and an explicit read add task-specific detail.',
      request: 'Update docs/runbooks/deployment.md for npm run deploy:preview.',
      baselineFile: '.github/copilot-instructions.md',
      baseline: 'For deployment changes, read ../docs/deployment.md.',
      scopedFile: '.github/instructions/runbooks.instructions.md',
      applyTo: 'docs/runbooks/**/*.md',
      scopedRule: 'When updating a runbook, include the command, expected result, and rollback step.',
      linkedDoc: 'docs/deployment.md',
      linkedDetail: 'Verified command · expected result · rollback',
      excludedDoc: 'docs/accessibility.md',
      output: ['Command: npm run deploy:preview', 'Expected result + rollback: inspect guide'],
      footnote: 'Illustrative context trace, not an observed Copilot run. Check the actual references, diff, and operational procedure.'
    }),
    S('init-demo', 1, 'Add or update instructions, then rerun the task', {
      scene: 'instruction-trial', pill: 'Instructions · Worked demo',
      subtitle: 'Ask Copilot to update one runbook rule, review the edit, then retry the same deployment task.',
      trial: {
        setup: 'MAINTAINER REQUEST: the reviewed deploy command changed to npm run deploy:preview.',
        request: '“Update .github/instructions/runbooks.instructions.md for docs/runbooks/deployment.md. Show the diff.”',
        before: ['When editing a runbook,', 'record the deploy command.'],
        correction: ['− Record the deploy command.',
          '+ Include command, expected',
          '+ result, and rollback step.'],
        after: ['Command: npm run deploy:preview',
          'Expected result: health check',
          'Rollback: documented procedure']
      },
      footnote: 'Illustrative walkthrough, not an observed run. Review the guidance diff; inspect the retry and operational checks independently.'
    }),
    S('troubleshoot-instructions', 1, 'Troubleshoot guidance with observable checks', {
      scene: 'instruction-troubleshoot', pill: 'Instructions · Troubleshoot',
      subtitle: 'Check discovery, file scope, rule quality, then repeat one representative task.',
      checks: [
        { title: '1 · DISCOVERY', check: 'Agent Customizations: is the file listed?', signal: 'References shows it was used.', next: 'If missing: check harness, settings, Debug Logs.' },
        { title: '2 · FILE SCOPE', check: 'Does applyTo match the edited path?', signal: 'src/api/returns.ts matches src/api/**/*.ts.', next: 'If not: correct the pattern or task scope.' },
        { title: '3 · RULE QUALITY', check: 'Find stale, duplicate, vague, or conflicting lines.', signal: 'One current action names the real helper.', next: 'Resolve conflict at its source; simplify.' },
        { title: '4 · RETRY', check: 'Use the same bounded endpoint request.', signal: 'Inspect validator use, tests, and diff.', next: 'Run verified checks; maintainer accepts.' }
      ],
      footnote: 'References and debug logs show discovery, not compliance. A path match shows scope, not correct behavior.'
    }),
    S('prompts-opener', 2, 'Custom Prompts', {
      scene: 'opener',
      subtitle: 'How can I reuse a useful documentation review on the next change?',
      cards: [
        { icon: '💬', title: 'Work together', blurb: 'Reach a useful task result' },
        { icon: '📌', title: 'Capture', blurb: 'Save the repeatable approach' },
        { icon: '🔁', title: 'Reuse + share', blurb: 'New input, reviewed output' }
      ],
      terminal: { context: '/refresh-docs + a significant change', detail: 'A person chooses when to run it' }
    }),
    S('create-prompt', 2, 'Capture the approach after the review is useful', {
      scene: 'prompt-capture', pill: 'Custom Prompts · From conversation to command',
      subtitle: 'A maintainer works with Copilot on the deployment change, then asks it to preserve the workflow.',
      footnote: 'Illustrative conversation and artifacts · no deployment or product execution claimed.'
    }),
    S('prompt-anatomy', 2, 'Give /refresh-docs an input, a guide, and an output', {
      scene: 'prompt-contract', pill: 'Custom Prompts · A reusable task',
      subtitle: 'Think of a named function: discoverable, parameterized, human-invoked. Results still need review.',
      code: [
        '---',
        'name: refresh-docs',
        'description: Review docs after a significant change',
        'agent: docs-reviewer',
        '---',
        'Change: ${input:change:Describe the change}',
        'Read [review guide](../../docs/review-guide.md).',
        'Read the changed source and affected docs.',
        'Propose doc edits supported by that evidence.',
        'Return: doc path, before → after, source link.',
        'Flag missing evidence under Open Questions.'
      ],
      footnote: 'Illustrative VS Code prompt · agent is optional; Part 4 defines docs-reviewer · check selected-harness support.'
    }),
    S('prompt-reuse', 2, 'Reuse the workflow; change the evidence and the answer', {
      scene: 'prompt-reuse', pill: 'Custom Prompts · A second invocation',
      subtitle: 'The maintainer invokes the same /refresh-docs recipe for two different significant changes.',
      footnote: 'Representative inputs and expected drafts · checks not executed · reviewer acceptance pending.'
    }),
    S('share-prompt', 2, 'Share the versioned approach, then refine it together', {
      scene: 'prompt-share', pill: 'Custom Prompts · Team reuse',
      subtitle: 'The team reviews the prompt and keeps detailed rules in one maintained guide.',
      footnote: 'A shared prompt is a useful destination. A skill is an independent choice about discovery.'
    }),
    S('skills-opener', 3, 'Skills', {
      scene: 'opener',
      subtitle: 'How can Copilot find our documentation expertise when the work needs it?',
      cards: [
        { icon: '🔎', title: 'Discover', blurb: 'Describe the relevant task' },
        { icon: '📖', title: 'Load', blurb: 'Bring in expertise when useful' },
        { icon: '🧰', title: 'Apply', blurb: 'Use resources as needed' }
      ],
      terminal: { context: 'The docs check works. Make it discoverable.', detail: 'Knowledge alone can be a skill' }
    }),
    S('progressive-skill-loading', 3, 'Copilot loads expertise in response to relevant work', {
      scene: 'skill-discovery', pill: 'Skills · Progressive disclosure',
      subtitle: 'Name and description support discovery; SKILL.md explains how to carry out the review.',
      footnote: 'Documented VS Code loading model · selection can miss · inspect loading or invoke /docs-review explicitly.'
    }),
    S('skill-anatomy', 3, 'Describe the task that fits—and show one that does not', {
      scene: 'skill-contract', pill: 'Skills · Knowledge-only is enough',
      subtitle: 'This complete SKILL.md routes documentation review to the same maintained repository guide.',
      code: [
        '---',
        'name: docs-review',
        'description: >',
        '  Review documentation after deployment-command',
        '  or configuration changes; identify stale examples',
        '  and flag missing evidence for a reviewer.',
        '---',
        'Read [review guide](../../../docs/review-guide.md).',
        'Compare changed source with affected docs.',
        'Apply the guide; cite evidence and open questions.',
        'Return proposed edits for human review.'
      ],
      footnote: 'Illustrative .github/skills/docs-review/SKILL.md · no script or template is required.'
    }),
    S('skill-knowledge', 3, 'Apply the linked knowledge to a reviewable doc edit', {
      scene: 'skill-knowledge', pill: 'Skills · References doing work',
      subtitle: 'Copilot consults the guide and changed configuration source; the maintainer can inspect the resulting proposal.',
      footnote: 'Illustrative resource use and expected output · source checks and acceptance remain pending.'
    }),
    S('skill-resources', 3, 'Add a resource when it helps this documentation review', {
      scene: 'skill-resources', pill: 'Skills · Optional resources doing work',
      subtitle: 'SKILL.md can explain when to use a report template or a repeatable link check.',
      footnote: 'Illustrative extensions · templates organize evidence; scripts check a bounded property, not correctness or approval.'
    }),
    S('skill-invocation', 3, 'Choose deliberate invocation or task-relevance discovery', {
      scene: 'skill-invocation', pill: 'Skills · Try, inspect, recover',
      subtitle: 'The prompt and skill can coexist: different entry points, one maintained documentation-review guide.',
      footnote: 'Illustrative comparison · automatic selection is not guaranteed · the maintainer owns acceptance.'
    }),
    S('agents-opener', 4, 'Agents', {
      scene: 'opener',
      subtitle: 'Put familiar expertise to work in a focused recurring role.',
      cards: [
        { icon: '📚', title: 'Focus', blurb: 'Review documentation impact' },
        { icon: '🧰', title: 'Equip', blurb: 'Read, search, propose doc edits' },
        { icon: '🔎', title: 'Deliver', blurb: 'A patch with evidence and questions' }
      ],
      terminal: { context: 'Documentation Reviewer', detail: 'Same Copilot · focused working mode' }
    }),
    S('docs-reviewer-agent', 4, 'Give Documentation Reviewer a focused remit', {
      scene: 'reviewer-contract', pill: 'Agents · A reusable working mode',
      subtitle: 'Review significant changes for documentation impact and propose evidence-backed updates.',
      code: [
        '---',
        'name: docs-reviewer',
        'description: >',
        '  Review significant changes for documentation',
        '  impact and propose evidence-backed updates.',
        "tools: ['read', 'search', 'edit']",
        '---',
        'Use [docs-review](../skills/docs-review/SKILL.md).',
        'Propose edits to documentation only.',
        'Return a doc patch, source citations, and Open Questions.',
        'If evidence is missing, flag it; leave that claim unchanged.',
        'Stop after the proposal; a human accepts it.',
        'Do not change app code, deploy, commit, or approve.'
      ],
      footnote: 'Illustrative .github/agents/docs-reviewer.agent.md · shared instructions apply normally · inspect actual tool availability.'
    }),
    S('reviewer-trace', 4, 'Documentation Reviewer applies the existing expertise', {
      scene: 'reviewer-trace', pill: 'Agents · One configuration review',
      subtitle: 'Review API_TIMEOUT → REQUEST_TIMEOUT in src/config.ts; keep docs/configuration.md aligned.',
      footnote: 'Illustrative working trace · relevance can miss · this sequence is not universal loading precedence.'
    }),
    S('reviewer-judgment', 4, 'A sourced doc patch leaves uncertainty visible', {
      scene: 'reviewer-judgment', pill: 'Agents · Inspect the proposal',
      subtitle: 'Documentation Reviewer corrects the stale configuration example and leaves the default unanswered.',
      footnote: 'Authored example, not an observed run · source supports the rename only · human acceptance remains pending.'
    }),
    S('choose-primitive', 4, 'Choose the working mode that fits the responsibility', {
      scene: 'reviewer-composition', pill: 'Agents · Composition and choice',
      subtitle: 'Instructions share how we work; prompts capture requests; skills supply expertise; agents put it to work.',
      footnote: 'Use the pieces that help · no all-four requirement · no automatic prompt, skill, or agent inheritance.'
    }),
    S('before-after', 0, 'From repeated context to reviewed shared knowledge', {
      scene: 'before-after',
      before: [
        'Repeat conventions in every chat',
        'Repeat a useful review from memory',
        'Keep task expertise only in a chat',
        'Re-explain a recurring reviewer’s remit'
      ],
      after: [
        'Review and commit a concise baseline',
        'Capture proven work as a prompt',
        'Make relevant expertise discoverable',
        'Select a focused agent; review its proposal'
      ],
      metrics: [
        { value: 'Smallest fit', detail: 'Start with only the needed primitive' },
        { value: 'Focused role', detail: 'Reuse expertise with fitting tools' },
        { value: 'Evidence chain', detail: 'Delivery, checks, acceptance differ' }
      ]
    }),
    S('today', 0, 'Try one rule, inspect delivery, and check its result', {
      scene: 'today',
      horizons: [
        { icon: '⚡', label: 'Today', z: 'green', items: ['Draft one concise repository rule.', 'Ask one bounded task.', 'Inspect References and the diff.'] },
        { icon: '🗓️', label: 'This Week', z: 'local', items: ['Add one path rule with an explicit applyTo.', 'Test one matching and one outside-scope file.', 'Record checks and the reviewer.'] },
        { icon: '🚀', label: 'This Month', z: 'purple', items: ['Capture a useful workflow as a shared prompt.', 'Use a skill for task-relevant expertise.', 'Pause if a selector, execution, or acceptance boundary fails.'] }
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
          { label: 'Custom agents', href: SRC.agents.href, description: 'Focused roles, tool selection, and verification.' }
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
      subtitle: 'Preserve useful know-how. Reuse it in the work that needs it.',
      cards: [
        { value: 'Instructions', detail: 'Share how we work' },
        { value: 'Prompts + skills', detail: 'Reuse requests and expertise' },
        { value: 'Agents', detail: 'Put expertise to work' }
      ],
      prompt: 'What rule or workflow will you test in your repository next?'
    })
  ];

  const NOTES = {
    title: {
      notes: ['"Make your team’s know-how work with Copilot—from planning to operations."', 'Follow one illustrative returns launch: shared policies, decisions and examples feed reusable guidance; the team asks Copilot to help with the launch.', '"That guidance can support acceptance criteria, design decisions, changes with tests, release plans and runbooks."', 'Sweep across the five connected drafts. These are examples of work across one launch, not observed outputs or completed checks. Point to the orange bar.', '"Copilot drafts. People check the work and own approval."', '→ We will zoom into the /returns change to see how convention, implementation and specialization make guidance usable. Carry that same idea back to your own work.'],
      know: ['Audience question: How can these techniques help my work across the software development lifecycle?', 'The returns policy, audit decision, endpoint sketch and artifact excerpts are illustrative teaching examples, not product output, organizational policy or measured results. All five artifacts are drafts. No test pass, release readiness or human acceptance is claimed.', 'Instructions, prompts, skills and agents supply context or shape tasks in supported hosts. Use the smallest fitting primitive; this picture does not require all four, imply automatic orchestration across stages, or guarantee adherence. Coding is one application of the same context-and-task approach.', 'The development draft preserves the simplified /returns validation pattern for the next slide’s code-focused example. Its checks and approval remain pending, like the other drafts. The rest of the talk uses code and tests as worked examples; the opening promises transferable techniques, not a separate demo for every lifecycle stage.', 'People responsible for each artifact compare it with the relevant policy, decision record or operating constraints and run independent checks where applicable. When evidence disagrees or context is missing, revise the guidance and draft before seeking approval. Own-work transfer: pick one repeated planning, design, development, quality, release or operations task; name its guidance, check and accountable reviewer.'],
      cue: ['Opening visual only; no live execution. Follow knowledge → reusable guidance → Copilot drafts, then point to human approval pending. Advance to slide 2 for the /returns example.'],
      sources: sources('overview', 'instructions'),
      seconds: 25
    },
    'core-question': {
      notes: ['"How can I teach Copilot how we work—and put it to work?"', 'Keep the same /returns endpoint from the opening slide in view. The three branches connect to one task; they do not prescribe a sequence.', '"Convention says how we work here: use our API pattern. Instructions, including AGENTS.md, carry that guidance."', '"Implementation captures how to carry out the task: build an endpoint with tests. Prompts and skills make that work repeatable."', '"Specialization gives Copilot a focused role and fitting tools. Here, we can choose a reviewer to inspect the endpoint."', 'Point to AGENTS.md in the first card and .agent.md in the third: repository guidance and custom roles are different artifacts.', '"Combine the layers that help. A custom agent can work on its own; a handoff is optional."', 'Sweep across the verification strip. The filenames and snippets illustrate intended work, not generated files or actual test results. A person reviews the diff and real check results before accepting it.', '→ We will look at each primitive and when it earns a place in your repository.'],
      know: ['Audience question: How can I teach Copilot how we work—and put it to work? This wording is synchronized with the landing page and handout brief.', 'Convention, implementation, and specialization are an organizing model for this endpoint example. They are complementary layers, not a maturity ladder or mandatory implementation-to-review workflow.', 'AGENTS.md supplies repository or directory instructions in supported hosts. A custom .agent.md file defines a selected role with instructions and configured tools. A custom agent can perform focused work without delegation, orchestration, or handoffs.', 'Prompt files are human-invoked task recipes; skills package task guidance and optional linked scripts or templates. Use either when it fits. A skill does not require a prompt file as a prerequisite.', 'The code excerpt follows the simplified validation pattern on slide 1. The endpoint files and reviewer activity are illustrative, not observed output. No test execution or passing status is claimed here.', 'Verification applies to work using any layer: inspect relevant loaded guidance, compare the actual diff with the API pattern, run independent checks, and have the accountable person accept or reject it. If the pattern is missed or checks fail, inspect context and revise. Host support and execution controls still apply; a configured tool list does not grant approval.', 'Own-work transfer: choose a repeated endpoint task, identify its shared convention, and add a reusable task recipe or focused role only where it helps.'],
      sources: sources('overview', 'instructions', 'agentsMd', 'prompt', 'skills', 'agents'),
      seconds: 65
    },
    contents: {
      notes: ['"We will start with shared instructions, capture a useful workflow as a prompt, make relevant expertise discoverable with a skill, and put that expertise to work in a focused agent role."', '"These are separate choices you can combine. A prompt and a knowledge-only skill can each be useful on their own."'],
      know: ['Contents slide numbers refer to the four opener slides: 4, 15, 20, and 26.'],
      sources: sources('overview'),
      seconds: 35
    },
    'instructions-opener': {
      notes: ['"Teach Copilot once. Carry your team’s know-how into a relevant next task."', '"Instructions make reviewed knowledge available without pasting the same guidance into every chat."', 'Point across Share, Maintain, Focus. We start with contributions and context, then choose files and test one task.', '→ How can different teams contribute useful shared guidance?'],
      know: ['Audience question: What do instructions make possible?', 'Custom instructions supply reusable context in supported sessions. They do not guarantee compliance. Support, discovery, and activation vary by harness. VS Code custom instructions do not apply to inline suggestions.', 'This section uses illustrative planning, application, test, release, and operations artifacts. They are teaching examples, not measured product runs.'],
      cue: ['No live action. Introduce the shared-knowledge storyline before showing file mechanics.'],
      sources: sources('instructions', 'support'),
      seconds: 20
    },
    'reusable-improvements': {
      notes: ['"Four disciplines can contribute durable knowledge to one shared instructions file."', 'Read the contributor label and the actual line from each group. Product records open decisions; design and accessibility preserve keyboard access and focus; engineering names the shared validator; operations keeps deploy steps useful.', '"A maintainer reviews the lines together so they stay coherent and relevant."', 'Point to the exact four lines repeated in the shared file. They are reusable guidance, not a promise that every line enters or applies to every request.', '→ Where can those distinct sources enter a supported chat?'],
      know: ['Audience question: How does team knowledge become reusable guidance?', 'The four example lines are illustrative, not claims about a real organization. Different disciplines contribute durable, verifiable constraints; a maintainer checks overlap, scope, and accuracy before merging.', 'This slide describes the contents of one shared repository file, not automatic application of all four lines to every task. Supported harnesses and task relevance determine what guidance enters a chat. Copilot can still miss or misapply a loaded rule.', 'Own-work transfer: ask a product, accessibility, engineering, or operations partner for one recurring decision; phrase it as an action with an inspectable result and name the file owner.'],
      cue: ['No live execution. Trace each contribution into the same illustrative .github/copilot-instructions.md file.'],
      sources: sources('instructions', 'support'),
      seconds: 75
    },
    'knowledge-sources': {
      notes: ['"Bring knowledge from across the team: central requirements, project conventions, and your own working preferences."', 'Read one concrete rule from each source. Follow the equal-weight routes into a supported Copilot request. The routes do not establish priority.', '"An admin updates central guidance. A maintainer shares a reviewed repository diff. You control your local preferences."', '"Check which sources your selected harness discovers, and resolve conflicting guidance at its source."', '→ Whatever the source, useful guidance gives Copilot an action we can inspect.'],
      know: ['Audience question: Whose knowledge can I bring into a task, and how do updates reach people?', 'Checked against the current VS Code instructions page on 2026-11-02: workspace, user, and organization are distinct sources. Organization instructions are additive for supported Copilot sessions that the account can access. Discovery is controlled by github.copilot.chat.organizationInstructions.enabled. Centrally managed requirements in natural language are not security enforcement.', 'Repository updates reach contributors when they obtain the changed files, for example by pulling the reviewed commit. Begin a fresh bounded request and inspect included context; do not promise an in-flight session refresh or instantaneous propagation.', 'User location and sync depend on harness. Files in ~/.copilot/instructions and ~/.claude/rules do not roam through VS Code Settings Sync. Local harness profile instructions can sync when Prompts and Instructions is enabled. Personal instructions are not the same as an uncommitted repository file.', 'No universal precedence hierarchy is taught here. Current VS Code guidance recommends removing duplicates and resolving contradictions at the source, then checking discovery and the generated work. The sample HTTP client, endpoint, and preferences are illustrative; no real organizational policy is asserted.'],
      cue: ['In an optional live comparison, open Agent Customizations for the selected harness and identify the discovered sources without displaying private guidance.'],
      sources: sources('instructions', 'support', 'githubInstructions'),
      seconds: 85
    },
    'useful-instructions': {
      notes: ['"A useful instruction tells Copilot what to do and gives us something concrete to review."', 'Read each row left to right: vague advice, usable instruction, representative artifact. Spend a beat on each lifecycle example.', '"For requirements, ask for observable acceptance criteria and Open Questions. For code, name the helper and point to a reference endpoint."', '"For deployment work, say when to read docs/deployment.md and what to record in docs/runbooks/deployment.md."', 'Point to the illustrative outputs. The runbook fragment is a review target, not a complete or executed deployment procedure.', '→ When review reveals a recurring correction, improve the shared guidance too.'],
      know: ['Audience question: What turns advice into an instruction Copilot can use?', 'All three weak/useful pairs are illustrative. They are not actual Copilot output. Replace generic helper references with the repository’s real symbol and path; confirm the reference endpoint is current.', 'The endpoint sketch shows middleware before createReturn. It is not a complete secure implementation. Verify schema behavior, invalid-input tests, and side effects in the real project.', 'The operations row continues the deployment example used on slides 10–13: docs/deployment.md is the detailed guide and docs/runbooks/deployment.md is the artifact. npm run deploy:preview is an illustrative command, not executed here. Verify the environment, exact expected health result, rollback procedure, and responsible approver before any real run.', 'Keep one idea per rule, add a reason or example when it helps decisions, and leave deterministic formatting to tools. Own-work transfer: rewrite one recurring vague review comment as an action plus an observable artifact.'],
      cue: ['No live run. Ask the audience to identify what a reviewer can now inspect in each row.'],
      sources: sources('instructions'),
      seconds: 100
    },
    'maintain-guidance': {
      notes: ['"After a significant deployment change, ask Copilot whether the relevant instructions need an update."', 'Read the old and new staging command. The person’s request asks Copilot to assess the runbook rule, not to add a rule automatically.', '"Copilot can propose a targeted change—or explain why no durable guidance update is needed."', 'A named maintainer checks the source, reviews the diff, and approves, revises, or rejects it. The next deployment task tests whether the retained rule is useful.', 'Keep one-off corrections in the task. Remove stale or duplicate guidance rather than growing the file.', '→ Next, choose a home and audience for a rule that survives review.'],
      know: ['Audience question: How can a team keep shared instructions current without turning every correction into another rule?', 'This is a practitioner maintenance workflow, not an automatic Copilot behavior. A person asks Copilot to compare a significant change with existing guidance. The proposed change can be targeted, or there can be no durable change to make.', 'The command change from deploy:staging to deploy:preview is illustrative. Before retaining a rule, verify the real command, expected result, rollback procedure, and operating owner. Do not execute it as a demo command.', 'A named maintainer owns the shared file and reviews the versioned diff. Keep routine review nits and one-off fixes in the work item. Delete stale, duplicated, conflicting, or no-longer-applicable guidance; avoid adding a line when the current rule remains accurate.', 'The next relevant task is an evidence check, not a guaranteed better result: inspect the actual runbook/diff and run verified checks.'],
      cue: ['Show the change and explicitly ask Copilot to assess existing runbook guidance. Inspect its proposed diff or explanation. A maintainer decides whether to approve; do not imply that every correction changes instructions.'],
      sources: sources('instructions', 'githubInstructions'),
      seconds: 95
    },
    'instruction-surfaces': {
      notes: ['"Put shared conventions in the project, personal working preferences in your user guidance, and central requirements in the organization source."', 'Read the actual locations. The user path is a Copilot harness example; other harnesses have different supported folders.', '"AGENTS.md carries project setup, tests, and workflow for compatible agents. A custom .agent.md selects a role; it is a different artifact."', '"Use targeted instruction files when only certain files need the rule."', '→ First, here is a compact repository baseline we can review together.'],
      know: ['Audience question: Where do I save each kind of instruction?', 'Current VS Code documentation lists .github/copilot-instructions.md or AGENTS.md as recommended project instructions for Copilot and .github/instructions/**/*.instructions.md as targeted instructions. AGENTS.md is cross-agent, not specific to one provider. Support for nested files and discovery roots varies by harness and settings; do not assume one nearest-file rule across clients.', 'The user-folder example ~/.copilot/instructions is supported for the Copilot harness. The Local harness can use profile instructions and its configured discovery locations. Use Agent Customizations to create a user instruction in the correct location for the selected harness. A file that happens to be uncommitted in a repository retains its repository location and discovery behavior; git status does not turn it into user scope.', 'The organization row is a settings location, not a local repository filename. Check discovery settings and account access. Do not duplicate the same broad rule across AGENTS.md and Copilot-specific files without a reason.', 'Use AGENTS.md for concrete install, build, test, navigation, and review commands. This preserves the existing playbook material without treating it as a custom role or promising universal client loading.'],
      cue: ['Open Agent Customizations if needed to identify the selected harness and create a correctly located user or workspace instruction. Keep private user contents off screen.'],
      sources: sources('instructions', 'githubInstructions', 'support', 'agentsMd'),
      seconds: 100
    },
    'repo-instructions': {
      notes: ['"Keep the shared baseline short: an actionable pointer can carry deep knowledge into the task that needs it."', 'Read the two Markdown lines. Each says when to read its document, and each relative path resolves from .github/copilot-instructions.md.', '"In supported VS Code workspace chat, the repository instructions enter automatically. The deployment guide does not; the explicit read direction tells Copilot when to consult it."', 'Point from the deployment line to docs/deployment.md, then to the separate customer-facing pointer. The second document stays out of a deployment-only task.', '→ Now make the path-specific runbook rule just as focused.'],
      know: ['Audience question: How can a team keep shared instructions concise without losing useful domain detail?', 'The displayed file and documents are illustrative. The two Markdown links and wording follow the approved example; relative paths resolve from .github/copilot-instructions.md according to the current VS Code documentation.', 'VS Code project instructions are automatically included according to the selected harness. A linked document is not guaranteed to be read merely because its link appears. This example explicitly says when Copilot reads it; the presenter still checks the actual References and work.', 'The deployment and accessibility documents are not repository files in this talk. Their names and the example content are not claims about a real codebase. No token count, context reduction, or response-quality metric is measured or implied.', 'Own-work transfer: move durable system detail into a maintained document, then write one concise instruction that names both the task trigger and the read action.'],
      cue: ['Point out that the read instruction—not the link alone—routes the detailed document into relevant work.'],
      sources: sources('instructions'),
      seconds: 100
    },
    'path-instructions': {
      notes: ['"This runbook rule is separate from the shared baseline and applies to a narrower set of files."', 'Read the filename and exact applyTo value. docs/runbooks/deployment.md matches; docs/accessibility.md does not match this pattern.', '"VS Code attaches this instruction when the agent creates or modifies a matching file."', '→ Put the baseline, the matched rule, and the linked document together in one task.'],
      know: ['Audience question: How can a team focus extra guidance on the files that need it?', 'Verified against current VS Code custom-instructions documentation on 2026-11-02: VS Code automatically attaches an .instructions.md file when its applyTo pattern matches a file the agent creates or modifies. Description-based task relevance and manual attachment are other supported routes.', 'The path and one glob are illustrative. The glob tests the file-pattern route only; it does not establish that a nonmatching file could never receive guidance through another route. A path match establishes eligibility, not compliance.', 'This example uses the VS Code custom-instructions format. Check another harness separately rather than assuming it supports the same frontmatter or discovery behavior.'],
      cue: ['Compare the target runbook path with the glob before moving to the context-flow example.'],
      sources: sources('instructions', 'githubInstructions', 'support'),
      seconds: 70
    },
    'instruction-context': {
      notes: ['"Here is one deployment request, with the sources entering at different points."', 'Read the request first. In supported VS Code workspace chat, .github/copilot-instructions.md is automatically included as the shared baseline.', '"That baseline tells Copilot when to read docs/deployment.md. The guide itself is a separate document, not automatically loaded just because the link exists."', 'Point to docs/runbooks/deployment.md. Its path matches the runbook instruction file’s applyTo pattern, so that task-specific rule attaches while Copilot works on the runbook.', '"Copilot reads the deployment guide, combines it with the request and matched rule, and proposes the runbook change."', 'The customer-facing pointer and docs/accessibility.md stay outside this deployment-only example. The diagram is illustrative, not a product recording.', '→ The same task then gives us a practical way to review or update the guidance.'],
      know: ['Audience question: What context reaches Copilot for one deployment task, and what stays out?', 'Current VS Code docs checked 2026-11-02: project instructions are automatically included according to the selected harness; applyTo instructions attach when a matching file is created or modified. Relative Markdown paths resolve from the instruction file.', 'The left-to-right stages distinguish their task triggers; they do not establish a universal source precedence or fixed cross-host loading order. The task, paths, command, guide contents, and proposed result are illustrative, not an observed Copilot run.', 'The talk does not claim that a link guarantees retrieval or follow-through. The explicit read instruction gives Copilot a condition and action; inspect actual references and output to verify behavior.', 'The matched file is .github/instructions/runbooks.instructions.md with applyTo: "docs/runbooks/**/*.md". The task names docs/runbooks/deployment.md, which matches. The accessibility pointer and document are not relevant to this task.', 'The final proposal names an illustrative command and asks the maintainer to inspect the real expected result, rollback procedure, and diff before acceptance. No deployment occurs.'],
      cue: ['Trace left to right: request, automatic baseline, matching path rule, explicit guide read, assembled context, proposed edit. Keep the final settled view visible long enough to compare the included and excluded sources.'],
      sources: sources('instructions', 'support'),
      seconds: 120
    },
    'init-demo': {
      notes: ['"Start with the command change and inspect the first runbook draft against the existing guidance."', 'The maintainer asks Copilot to update .github/instructions/runbooks.instructions.md for docs/runbooks/deployment.md and show the diff.', '"Copilot proposes a focused change from recording only the command to recording the command, expected result, and rollback."', '"The maintainer reviews and approves or revises that instruction diff. Then rerun the same deployment task and inspect the actual runbook and checks."', 'The displayed command and result are illustrative; no product output or test pass is claimed.', '→ Instructions carry how we work. A custom prompt can preserve the steps of a task we already solved.'],
      know: ['Audience question: How do I update one instruction and check whether the next task reflects it?', 'This is an illustrative walkthrough, not a completed run or promised product output. The maintainer explicitly requests a targeted update to .github/instructions/runbooks.instructions.md, reviews the diff, and then retries the same task on docs/runbooks/deployment.md.', 'The first rule says only to record the deploy command. The proposed rule adds expected result and rollback. Confirm the real deployment guide, exact values, matching applyTo, and operational owner before adopting it.', 'The maintainer reviews the guidance diff before a fresh request. Inspect included references, the actual runbook diff, operational checks, and command output separately. No deployment is run and no pass rate is claimed.', 'If the result misses, use the next troubleshooting slide: check discovery, file scope, rule quality, then retry. A References entry proves discovery, not adherence. Own-work transfer: name the guidance owner and decide from next-task evidence whether to keep, revise, or remove the rule.'],
      cue: [
        'Use a safe sample repository with a deployment guide and a runbook. Identify the selected VS Code Copilot harness.',
        'Start with the bounded deployment task; inspect the first runbook draft against the reviewed command change.',
        'Ask Copilot explicitly to update .github/instructions/runbooks.instructions.md for docs/runbooks/deployment.md and show the diff.',
        'The maintainer checks the source, reviews or revises the rule, and approves the instruction diff before retrying.',
        'Run the same task in a fresh request. Inspect References, the runbook diff, and operational checks separately.',
        'Report actual check output. A References entry and a passing check are separate signals; neither substitutes for human acceptance.',
        'If the result misses, use the final troubleshooting slide. Stop without committing or deploying the demo.'
      ],
      sources: sources('instructions', 'debug', 'troubleshooting'),
      seconds: 160
    },
    'troubleshoot-instructions': {
      notes: ['"When guidance misses, check discovery, scope, and wording before writing more."', 'First inspect the selected harness in Agent Customizations. References show which instruction files appeared in the response; Debug Logs expose discovery and loading errors.', '"Next compare applyTo with the exact file the agent creates or changes. A glob mismatch points to the selector; a matching path only proves that route fits."', '"Then look for stale, duplicate, contradictory, or vague rules. Check the original source and simplify one rule around a real helper or expected result."', '"Retry the same representative task. Inspect the actual diff and run verified checks; the accountable maintainer decides whether the result is acceptable."', '→ That closes the instructions loop: share knowledge, check how it enters context, and verify the work.'],
      know: ['Audience question: What practical checks help when Copilot does not use an instruction as expected?', 'Current VS Code custom-instructions documentation recommends selecting the intended harness, confirming discovery in Agent Customizations, checking References in the chat response, and inspecting the instructions sent in the model request for advanced diagnostics. Developer: Open Agent Debug Logs or Show Agent Debug Logs in Chat exposes discovery/loading errors and request details. Debug data may include sensitive prompts and paths; display only a safe sample.', 'For file-pattern activation, compare the exact created/modified path with the applyTo glob. A mismatch means this activation route does not match. Description-based task relevance and manual attachment are additional documented routes; inspect them only where the selected harness supports them.', 'For content quality, identify duplicate or contradictory sources, stale examples/commands, and vague verbs. Current docs recommend resolving duplicates and conflicts at their source. Replace the narrowest inaccurate line; do not grow the file to encode every correction.', 'Use a fresh, small representative request with a checkable criterion. References prove discovery, not compliance. A path match proves scope, not behavior. Review the actual diff and independent test output; name the human acceptance owner.', 'No specific terminal command or universal diagnostic UI is invented here. Menu labels and supported features can change by VS Code version and harness.'],
      cue: ['In a safe sample, check Agent Customizations and the response References. If a file is absent, open Agent Debug Logs and inspect discovery errors. Compare one target path with applyTo, then use the same bounded request after any targeted edit. Do not expose private prompt content.'],
      sources: sources('instructions', 'debug', 'troubleshooting'),
      seconds: 110
    },
    'prompts-opener': {
      notes: ['"How can I reuse a useful documentation review on the next change?"', '"We just maintained guidance after a significant change. Now let’s preserve the review approach as /refresh-docs."', 'Point to work together, capture, reuse. A person chooses when to run the prompt.', '→ Start with the conversation that produced a useful review.'],
      know: ['Audience question: How can I reuse a useful documentation review on the next change?', 'Section goal: capture useful expertise as a named, human-invoked task with inputs, current guidance, and an inspectable output. This is separate from task-relevance discovery in Part 3.', 'VS Code prompt files use .prompt.md and run as slash commands. Workspace prompts normally live in .github/prompts; locations and support depend on the selected harness. The example is illustrative.'],
      sources: sources('prompt'),
      seconds: 20
    },
    'create-prompt': {
      notes: ['"Work with Copilot until the documentation review is useful, then ask it to save the repeatable approach."', 'Follow the conversation on the left. The maintainer supplies the command change, inspects the proposed doc edit, and asks for the missing rollback evidence to stay visible.', '"The useful result is a precise command correction and an open question, not a claim that the deployment ran."', 'Follow the capture arrow: the person asks Copilot to write a reusable prompt with an input, a link to the current guide, and the same evidence-shaped output.', '"Save the workflow, rather than the answer for this one deployment."', '→ Here is the file we review before using it again.'],
      know: ['Audience question: How do I turn a useful conversation into a reusable prompt?', 'Both conversation and artifacts are authored examples, not recorded Copilot execution. The significant change is deploy:staging to deploy:preview, continuing Part 1. package.json is the illustrative command source; docs/runbooks/deployment.md is the touched document.', 'The natural-language creation request is intentional. Current prompt docs describe AI-assisted authoring by agents with file-editing tools; this talk does not depend on a /create-prompt command being available. Chat: New Prompt File is a documented UI alternative.', 'Before capture, the practitioner refines the workflow until the result is satisfactory for the bounded task. Here satisfaction means the proposal identifies the affected line, cites its source, and preserves the unresolved rollback question. It does not mean release readiness or production validation.', 'No tool identifiers are required in this prompt. The selected agent and environment determine available tools and approvals. Save the draft under .github/prompts/refresh-docs.prompt.md, inspect the diff, and confirm discovery in the current harness.'],
      cue: ['Static show-and-tell: trace request → proposed edit → maintainer refinement → capture request → prompt file. No deployment command is executed.'],
      sources: sources('prompt', 'instructions'),
      seconds: 115
    },
    'prompt-anatomy': {
      notes: ['"Think of a prompt like a named function that a person invokes with a new input."', 'Read name and description, then the Change line. These give the workflow a discoverable command and a place for case-specific context.', '"The optional agent line selects docs-reviewer. We define that focused role in Part 4; without this line, the prompt uses the current agent."', '"The link takes us to current review knowledge. The output contract asks for a doc path, a before-and-after line, and its source."', 'Point to the last line: missing evidence becomes an Open Question. The model still needs the actual changed source; a description of a change alone may be insufficient.', '"The function analogy helps us design reuse. It does not give model output deterministic guarantees."', '→ Try it on a second kind of change.'],
      know: ['Audience question: What goes into a reusable documentation-review prompt?', 'The shown file is complete illustrative Markdown with optional YAML name, description, and agent. name determines /refresh-docs; the .prompt.md filename provides the default command name when name is absent.', 'Current VS Code docs describe ${input:variableName:placeholder} as syntax most language models understand and use to prompt for input. Treat it as a model-directed input convention, not a guaranteed typed argument binder. Supply missing context explicitly if the model does not ask. The docs also mention ${selection}; this workflow does not rely on selection or ${file}.', 'Relative Markdown links resolve from the prompt file. ../../docs/review-guide.md reaches the repository docs directory from .github/prompts. A link makes context reachable; inspect the actual read and resulting work rather than treating its existence as proof of use.', 'The maintained guide owns detailed review rules. The prompt owns the task input and requested output. agent: docs-reviewer optionally targets the custom agent illustrated in Part 4; it does not make the agent automatically invoke this prompt or inherit a skill. No tools override is present. First-party prompt docs and the agent file reference checked 2026-11-02 describe prompt files as Local harness functionality; other harnesses do not load them. Check the selected harness and actual tools before adoption. The agent itself can also be selected directly in a compatible harness.', 'These documentation assets are illustrative slide content, not an installed runnable example repository. Transfer: name one repeated task, state its variable input, current guide, and inspectable output before choosing extra configuration.'],
      sources: sources('prompt', 'instructions'),
      seconds: 120
    },
    'prompt-reuse': {
      notes: ['"Reuse means the same approach works on a different case, not that we get the same answer."', 'Read case A’s deployment input and exact command correction. Then read case B’s configuration rename and the different affected document.', '"For the rename, the proposed docs change API_TIMEOUT to REQUEST_TIMEOUT and cite src/config.ts."', 'Point to the unresolved default. A rename does not establish a default value; the review leaves it as an Open Question.', '"Inspect and refine the second result. If it invents a default, tighten the prompt or the maintained guide and rerun that case."', '→ Once the recipe is useful across cases, make it easy for the team to improve.'],
      know: ['Audience question: How can I tell whether the prompt is reusable?', 'Two distinct illustrative changes are shown: a deployment command change backed by package.json, and a configuration variable rename backed by src/config.ts. The resulting edits target docs/runbooks/deployment.md and docs/configuration.md respectively. These are representative expected outputs, not executed product runs or measured reuse.', 'The /refresh-docs text after the slash command supplies the change context in chat. It is not a custom positional-argument parser. If the placeholder remains unresolved, provide the change and attach or identify its source files explicitly.', 'For a real second run, inspect the actual before/after diff, confirm sources are current, and verify any technical claims using safe project checks. The example default and rollback questions remain unresolved. No test pass, deployment, or acceptance is claimed.', 'Review acceptance is separate from command discovery and from a well-shaped response. The maintainer can accept the bounded doc edit while leaving larger operational questions pending, or request revision. Here acceptance stays pending.'],
      cue: ['Read both inputs and outputs on the settled slide. Ask which evidence establishes the default value; the example supplies none. In a real rehearsal, invoke /refresh-docs for the rename, inspect the returned source links and refine any unsupported assertion.'],
      sources: sources('prompt'),
      seconds: 105
    },
    'share-prompt': {
      notes: ['"Version the prompt so the team can use and improve the same approach."', 'Follow the prompt diff into review, then teammate invocation. Keep approval of the prompt distinct from approval of each generated doc edit.', '"Both cases read one maintained review guide. When a rule changes, update that source rather than copying the rule into every command."', 'Point to the three short lifecycle applications. Each has a different input and artifact, with the same capture-and-review move.', '"A shared prompt can remain the right tool. Next we make the documentation expertise discoverable during relevant work."', '→ The check works; now make it discoverable.'],
      know: ['Audience question: How does a useful personal workflow become a maintainable team prompt?', 'Team distribution here means a reviewed, versioned workspace file in .github/prompts. Teammates need the updated repository and a harness that discovers that location. Prompt visibility and user-profile sharing are separate concerns.', 'Keep durable rules in docs/review-guide.md, then link it from entry points. The prompt owns deliberate invocation and case input; the guide owns the evidence and uncertainty policy. Changes to a prompt or guide are proposed and reviewed like other repository changes.', 'Requirements: capture an acceptance-criteria review and output criteria plus Open Questions. Quality: reuse a regression-review approach and output risks plus test evidence. Release: reuse a release-note review and output user impact plus source links. These are illustrative transfer applications, not claims about observed teams.', 'A prompt is a valid destination without a skill, script, template, or agent. The next section answers a different question about discovery, not maturity.'],
      sources: sources('prompt', 'instructions'),
      seconds: 80
    },
    'skills-opener': {
      notes: ['"How can Copilot find our documentation expertise when the work needs it?"', '"A skill makes task knowledge discoverable. It can consist of knowledge alone."', 'Point to discover, load, apply. These are context-loading decisions within relevant work, not an unattended schedule.', '→ Follow one configuration change into the skill.'],
      know: ['Audience question: How can Copilot find our documentation expertise when the work needs it?', 'Section goal: design relevant discovery metadata, load task instructions, consult maintained references, and use optional resources when useful. A prompt file is not a prerequisite.', 'The same documentation-review knowledge connects the examples, while Part 2 teaches deliberate invocation and Part 3 teaches task-relevance discovery and progressive disclosure.'],
      sources: sources('skills'),
      seconds: 20
    },
    'progressive-skill-loading': {
      notes: ['"The name and description help Copilot recognize that this configuration change calls for documentation review."', 'Trace the request through discovery metadata, loaded SKILL.md, and the linked review guide. Each step adds the context needed for this task.', '"SKILL.md tells Copilot how to use the expertise. The detailed guide enters when the review needs it."', 'Point to the unrelated logo request: this example gives no reason to choose docs-review for that task.', '"Selection can miss. Inspect what loaded, then invoke /docs-review explicitly or refine the description."', '→ Write a description precise enough to make that decision meaningful.'],
      know: ['Audience question: How does relevant skill knowledge reach the task?', 'Current VS Code docs describe three progressive-disclosure levels: name and description available for discovery, SKILL.md loaded when the request matches or the skill is invoked, and additional resources accessed as needed. This is documented behavior, not an observed run of this example, a fixed token saving, or a selection guarantee.', 'The representative request renames API_TIMEOUT to REQUEST_TIMEOUT and asks to keep docs aligned. The expected route is docs-review, then the maintained review guide. No timer, scheduler, or autonomous background doc refresh is implied.', 'Skills are supported across several agents, but locations, discovery settings, and UI diagnostics vary by harness. This talk uses the current VS Code docs and .github/skills example; inspect the selected harness rather than assuming identical behavior across hosts.', 'Recovery: confirm the skill location and enablement in Agent Customizations, inspect debug output for discovery/loading, supply the relevant source, and try explicit invocation. A discovered name alone does not establish that the full instructions or guide were used.'],
      cue: ['Static sequence first. In a rehearsal, ask the config-change request without the skill name and inspect actual discovery/loading; record a miss as a miss, then use /docs-review.'],
      sources: sources('skills'),
      seconds: 105
    },
    'skill-anatomy': {
      notes: ['"This is enough for a knowledge-only skill: describe the task, then explain how to apply the maintained knowledge."', 'Read the description as a single folded YAML value. It names deployment commands, configuration changes, stale examples, and missing evidence.', '"The configuration rename fits. Centering a logo does not match the expertise we described."', 'Point to the relative link. The prompt and skill both route to docs/review-guide.md; neither carries a private copy of the handbook.', '"The description supports selection. We still inspect what Copilot actually loaded and proposed."', '→ Now watch the guide change the review output.'],
      know: ['Audience question: What makes a skill discoverable for the right work?', 'The complete illustrative file is .github/skills/docs-review/SKILL.md. The docs require SKILL.md, name, and description; the name matches the directory and uses lowercase hyphenated text. The folded description is valid YAML.', '../../../docs/review-guide.md resolves from .github/skills/docs-review to the repository docs directory. The body gives an explicit read direction rather than relying on a bare link to prove access.', 'A skill can contain only SKILL.md and knowledge instructions, including directions to maintained repository references. Scripts, templates, and examples are optional. No successful prompt or runnable check is required for the format to be useful.', 'The fit/non-fit cases are design probes for this description, not a measured selector evaluation. If unrelated work selects the skill, narrow the description and retry both cases. If relevant work misses it, inspect discovery and try an explicit invocation.'],
      sources: sources('skills'),
      seconds: 115
    },
    'skill-knowledge': {
      notes: ['"The guide tells Copilot what evidence makes a documentation edit reviewable."', 'Read the three guide lines, then the source excerpt. The source establishes the new key; the excerpt provides no default value.', '"That yields a precise proposed edit in docs/configuration.md and an explicit question about the default."', 'Point from each result back to its evidence. This is the expertise doing work, without a script.', '"The maintainer checks the real source and diff before accepting the change."', '→ Add a supporting resource only when it helps this review.'],
      know: ['Audience question: What does knowledge-only skill use produce that I can inspect?', 'The guide excerpt is authored example knowledge: cite the changed source for renamed commands or keys, identify the affected document, and mark unsupported defaults or rollback claims as Open Questions. It is shared by the prompt and skill.', 'The illustrative source excerpt const timeoutKey = "REQUEST_TIMEOUT"; establishes a key name only. The proposed doc line uses REQUEST_TIMEOUT in place of API_TIMEOUT without inventing a numeric value. The prior 30-second claim is left unresolved until additional source evidence establishes it.', 'A source link in generated output is a claim to inspect. Verify the file exists, the cited content supports the edit, and current behavior matches the docs. This slide is a representative reasoning path, not product output or acceptance evidence.', 'Transfer: a knowledge-only requirements skill can route to maintained acceptance guidance; a quality skill can route to a risk rubric; a release skill can route to the current release policy. Their value can come from relevant expertise without executable resources.'],
      cue: ['Trace guide → changed source → proposed doc line → Open Question. Ask what evidence is still needed before the maintainer accepts the default claim.'],
      sources: sources('skills'),
      seconds: 85
    },
    'skill-resources': {
      notes: ['"A template can keep the review evidence in a useful shape. A script can repeat a bounded check."', 'Follow the upper lane: SKILL.md requests the report template when returning findings; the filled report names the doc, evidence, and open question.', 'Follow the lower lane: SKILL.md requests a local link check after edits; the illustrative check reports a missing rollback document.', '"That result says one link is missing. It says nothing about whether the deployment command is correct."', 'Point to the separate status strip: neither check execution nor human acceptance is claimed here.', '→ Try discovery and explicit invocation against the same evidence contract.'],
      know: ['Audience question: When do optional skill resources add value?', 'These are optional illustrative extensions to the knowledge-only skill, not prerequisites or actual repository files. A resource must be reachable and SKILL.md can explain when and how to use it. The upper lane uses assets/review.md for output structure; the lower lane uses scripts/check-doc-links.mjs for a repeatable local-file link check.', 'The sample invocation node .github/skills/docs-review/scripts/check-doc-links.mjs docs/runbooks/deployment.md illustrates an interface, not a shipped or executed script. Its expected missing-target finding is authored for teaching. Inspect or implement the real script, its path resolution, Node support, read/write effects, and exit-code contract before any run.', 'A real local link checker can verify existence of local Markdown targets within its defined scope. It cannot establish command correctness, remote URL validity, rollback safety, or completeness unless separately implemented and tested. A template can organize a report without making its content true.', 'Use safe sample data and permitted tools. Capture actual output and exit status separately from domain findings, then have the maintainer inspect evidence and decide acceptance. No test pass or metric is invented here.'],
      cue: ['Static walkthrough only. Do not try to execute the illustrative script: this talk does not ship it. Compare each resource’s input to its narrow output.'],
      sources: sources('skills'),
      seconds: 80
    },
    'skill-invocation': {
      notes: ['"Use /refresh-docs when you want to deliberately run the review. Use a skill when the expertise is useful to discover during relevant work."', 'Trace both entry points into the same guide and evidence-shaped proposal. There is no prompt-to-skill graduation requirement.', '"I can also explicitly invoke /docs-review. That is a useful recovery path when relevance matching misses."', 'Use the cue below for an optional live inspection in a prepared sample repository. Otherwise walk the static case; it is not an observed run.', '"Keep the actual loading evidence separate from the proposed doc edit, and keep both separate from the maintainer’s acceptance."', 'Pause for the audience to name one useful knowledge task in their own work and the source it can reuse.', '→ Agents answer another question: which selected role and tools fit the work?'],
      know: ['Audience question: When do I choose a prompt, a skill, or explicit skill invocation?', 'Both are valid. A prompt makes a task discoverable to the human command picker and deliberately invoked by a person. A skill supplies task-relevance metadata for agent discovery and can also be explicitly invoked in supported VS Code chat. Neither guarantees output quality.', 'Current VS Code docs describe /skill-name invocation and settings controlling model and user invocation. This example uses default user-invocable behavior without additional flags. If /docs-review is absent, inspect the selected harness, supported location, skill enablement, and diagnostics before asserting that invocation is available.', 'The optional demonstration needs a prepared, non-production sample repository containing the displayed prompt, knowledge-only skill, maintained guide, and two source/doc changes. Those sample files are not shipped by this deck. Without that preparation, use the complete static walkthrough and label it illustrative. No live success is presumed.', 'The guide is the shared source of review knowledge. Entry points can be maintained together or independently; update a changed rule in the guide, then retry representative prompt and skill cases. No script is needed to test this context behavior.', 'Own-work transfer: choose a requirements, quality, release, or operations task; name its guide, relevant trigger, expected artifact, evidence gap, and accepting owner. Use a prompt, a skill, or both according to the entry point you want.'],
      cue: [
        'Optional prepared demo, about two minutes within this budget: open the knowledge-only SKILL.md and confirm its guide link resolves. No deployment or checker script is run.',
        'Ask: Rename API_TIMEOUT to REQUEST_TIMEOUT and keep docs aligned. Inspect whether docs-review and the guide actually loaded using this harness’s debug/loading evidence. State a miss plainly.',
        'Start a fresh comparison request with /docs-review and the same change; supply src/config.ts and docs/configuration.md. Compare actual loading and output rather than claiming the static example happened.',
        'Inspect the proposed key rename, source citation, and unsupported default question. The maintainer accepts, revises, or leaves the result pending.',
        'Static fallback: follow both entry points on screen and discuss recovery when discovery misses. Ask the audience to choose an entry point for one task in their own work.'
      ],
      sources: sources('skills'),
      seconds: 190
    },
    'agents-opener': {
      notes: ['"Select Documentation Reviewer when reviewing documentation impact is a recurring responsibility."', '"It is the same Copilot, with a focused remit, fitting tools, and a clear deliverable."', 'Point to the role name. We keep the documentation expertise from Part 3 and give it a reusable working mode.', '→ Read the complete role definition, then follow it through the same configuration change.'],
      know: ['Audience question: When does a custom agent add value beyond our prompt and skill?', 'A recurring responsibility can benefit from its own configured tools, output expectations, and stopping conditions. This does not require handoffs, subagents, MCP, scripts, or all four primitives. An occasional task can remain a prompt; relevant expertise can remain a skill.', 'The role, artifacts, and outputs in this section are authored illustrations. No actual agent session, adherence rate, or completed checks are claimed. Current VS Code custom agents apply to requests until the user switches agents; storage, tools, and other controls depend on the selected harness.'],
      cue: ['Static section opener: identify the recurring review responsibility. No new sample files or live execution are required.'],
      sources: sources('agents'),
      seconds: 20
    },
    'docs-reviewer-agent': {
      notes: ['"This agent reviews significant changes for documentation impact and proposes evidence-backed updates."', 'Read the name, description, and tools. Read and search support inspection; edit lets Copilot propose a documentation patch.', '"The relative link tells Copilot to use the existing docs-review skill. The method stays in the skill and its maintained guide."', 'Point to the return and stop lines. The deliverable is a doc patch, source citations, and Open Questions; a person decides whether to accept it.', '"The prose remit is documentation only. Tool access itself does not restrict edits to documentation files."', '→ Now follow the selected role through the configuration rename we already used.'],
      know: ['Audience question: What does the agent add, and what belongs in its file?', 'This is a complete illustrative .github/agents/docs-reviewer.agent.md, not an installed sample. name, description, and tools are documented frontmatter. First-party custom-agent file reference checked 2026-11-02 lists read, search, and edit as built-in Copilot harness aliases; Local tool names and support also require inspection in the active host. Inspect actual tool activity, not just editor completions.', 'The role needs to read source and documentation, search for impacted examples, and propose doc edits. No script is needed, so execute is omitted. No subagent, handoff, web, or MCP dependency is introduced. The skill is referenced in the Markdown body rather than a skills frontmatter field. ../skills/docs-review/SKILL.md resolves from .github/agents to the existing illustrative skill in .github/skills/docs-review; that skill links ../../../docs/review-guide.md. The agent references the method instead of copying it.', 'The host supplies supported repository and targeted instructions normally. Do not copy entire shared instruction files into the agent definition or assume all files are inherited. A matching runbook instruction can apply to docs/runbooks/deployment.md; it does not match docs/configuration.md.', 'edit is a capability selection, not file-level enforcement. The prose remit and stop condition guide behavior; they are not a security sandbox. Repository permissions, host approvals, branch protections, and human review remain separate controls. If Copilot proposes application-code changes or unsupported doc claims, reject that proposal, clarify the remit or evidence, and retry a bounded task. Human acceptance is outside the agent’s job.'],
      cue: ['Read the complete illustrated file. Trace the relative skill link on screen; inspect the real active tool list during a prepared run only if a separate verified sample is available.'],
      sources: sources('agents', 'agentSchema', 'skills', 'instructions'),
      seconds: 120
    },
    'reviewer-trace': {
      notes: ['"Select Documentation Reviewer and ask it to review the API_TIMEOUT rename for documentation impact."', 'Follow the host context first. The shared baseline applies normally. The existing runbook-targeted instruction does not match docs/configuration.md.', '"The role explicitly directs Copilot to load docs-review. That skill points to docs/review-guide.md."', 'Follow the flow into source inspection, then the proposal. Copilot compares src/config.ts with docs/configuration.md and proposes the narrow rename with a citation and an open default question.', '"This is the same expertise, now applied through a focused role."', '→ The next slide lets us judge the actual proposed line and the missing evidence.'],
      know: ['Audience question: How do our existing instructions and skill participate in one selected-agent task?', 'The configuration rename, source path, doc path, skill path, and maintained guide are the same illustrative assets from Parts 2–3. The diagram is an authored sequence, not a recording or a universal precedence chart. It represents the intended read actions and output to inspect in a real run.', 'The host supplies supported repository instructions. Part 1’s explicit deployment read pointer is conditional: this configuration-only request does not automatically require docs/deployment.md. Part 1’s applyTo docs/runbooks/**/*.md does not match docs/configuration.md. In the alternate deployment case from Part 2, editing docs/runbooks/deployment.md makes that targeted rule relevant and the deployment pointer directs the guide read.', 'Skills can be selected by task relevance and selection can miss. Here the agent body explicitly directs Copilot to use the existing SKILL.md, providing a deliberate route to the method rather than relying solely on discovery. Inspect real read activity and proposed work. If the read is missing, explicitly request the skill and guide, supply missing source, and retry.', 'Selecting an agent does not automatically run /refresh-docs. The user can select the role directly, or deliberately invoke the supported prompt with agent: docs-reviewer in a prompt-capable host. Neither route guarantees compliance or output correctness.'],
      cue: ['Replay motion once: selected role and task → host guidance → skill and guide → source comparison → proposal. Use the settled state to inspect paths. This static fallback is the demo; do not imply a real agent ran it.'],
      sources: sources('agents', 'instructions', 'skills', 'prompt'),
      seconds: 115
    },
    'reviewer-judgment': {
      notes: ['"The stale example still says API_TIMEOUT. The changed source establishes REQUEST_TIMEOUT."', 'Read the source rename and the proposed docs/configuration.md diff side by side. The citation identifies src/config.ts; it supports the name change.', '"The proposal leaves the default value as an Open Question because this evidence does not establish it."', 'Point separately to checks not executed and human review pending. Neither is encoded in the rename diff.', '"Accepting a useful doc patch means checking the source and the scope, then resolving or preserving the unanswered question."', '→ Which part of this setup fits the next responsibility in your own repository?'],
      know: ['Audience question: What evidence makes this documentation proposal reviewable?', 'The input is the same API_TIMEOUT to REQUEST_TIMEOUT configuration rename from prompt-reuse and skill-knowledge. The source excerpt const timeoutKey = "REQUEST_TIMEOUT"; and citation src/config.ts → timeoutKey are the same authored illustration used in Part 3, not an excerpt from an installed sample repository. The proposed documentation diff preserves the exact earlier lines: minus Set API_TIMEOUT.; plus Set REQUEST_TIMEOUT. No migration behavior, test results, line numbers, or external source URL are invented.', 'The documented 30-second default is the unresolved claim already shown in Part 3. It is a question, not an established default. In a real review, open the exact changed source and use a stable line or commit link where available. The presenter can ask: does this evidence establish a default? It establishes only the key in this example.', 'The agent flags missing default evidence and leaves that claim unchanged. A maintainer can ask the source owner for evidence or keep the question open; do not fill it from memory. Checks are not executed in this authored example, and human acceptance remains pending. Neither a well-shaped diff nor a passing link check approves the change.', 'Transfer: inspect one proposed doc line, its changed source, the unanswered question, and the human decision separately. If the source does not support the edit, revise the proposal before acceptance.'],
      cue: ['Compare the stale doc line with the changed source. Read the two-line patch, then ask what supports the default value. Finish at the separate verification and human-review statuses.'],
      sources: sources('agents', 'skills'),
      seconds: 105
    },
    'choose-primitive': {
      notes: ['"Use a prompt for an occasional deliberate request, a skill for relevant expertise, and an agent for a recurring focused role."', 'Follow the two entry routes. A person can select Documentation Reviewer directly. In a supported prompt host, /refresh-docs can select it through the optional agent field we saw in Part 2.', '"The host supplies instructions, the role references the skill, and the skill reads the maintained guide. Each piece keeps its own job."', '"These choices coexist. Use only the pieces that make your next task useful and reviewable."', '→ Recap the change from repeated context to reviewed shared know-how.'],
      know: ['Audience question: When is specialization useful, and how can the pieces coexist?', 'The composition diagram is specific to this illustration: shared and applicable targeted instructions come from the host, the user chooses the prompt or agent, and the role explicitly references the existing skill. It does not claim automatic prompt invocation, universal lower-layer inheritance, or a mandatory all-four architecture. AGENTS.md remains a supported repository playbook, not a fifth primitive.', 'agent: docs-reviewer is a documented optional prompt frontmatter field and matches the actual illustrated prompt code in Part 2. Current first-party docs checked 2026-11-02 describe prompt files as Local harness functionality; other harnesses do not load them. With no prompt agent field, the current agent is used by default. A prompt tools list can override agent tools in Local; this example deliberately has none. Verify the selected host and active tools.', 'The agent provides remit, tool selection, deliverable, and stopping conditions. The skill and guide own expertise; shared instructions own team conventions. A prompt or skill can be a sufficient destination. No workflow ladder, handoff, subagent, MCP connection, or script is required.', 'Own-work transfer: choose a repeated responsibility, name the source of expertise and expected evidence, decide whether its own tool configuration adds value, and name the human accepting the proposal. Model/provider selection is a separate choice in Manage Language Models; dated release claims are outside this section’s proof.'],
      cue: ['Trace direct selection and optional prompt selection separately, then the role-to-skill link. Ask the audience to name one responsibility where a focused working mode earns its configuration.'],
      sources: sources('agents', 'agentSchema', 'prompt', 'skills', 'instructions'),
      seconds: 80
    },
    'before-after': {
      notes: ['"Reviewed shared knowledge lets the team reuse a useful approach."', '"Instructions share conventions. Prompts capture requests. Skills supply expertise. Agents put that expertise to work in a focused role."', '"Choose only what helps, inspect the evidence, and keep acceptance human-led."'],
      know: ['Audience question: What changes in my next task? Replace repeated conventions with maintained guidance, use a prompt for deliberate reuse, use a skill for relevant expertise, and select an agent when a recurring responsibility benefits from its own tools and output contract. These are choices, not required stages. The recap makes no measured productivity or reliability claim.'],
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
      know: ['The frontmatter marks custom instructions, prompt files, Agent Skills, and custom agents verified 2026-11-02, the customization overview verified 2026-02-08, AGENTS.md verified 2026-03-23, and the June 2026 release notes and language-model guide verified 2026-09-15. These are source-check dates, not a claim that every feature remains available today. The agent file reference is linked beside the agent anatomy and composition claims. Check selected-harness support.'],
      sources: sources('overview', 'instructions', 'prompt', 'skills', 'agents', 'githubInstructions', 'support', 'agentsMd', 'release', 'models', 'debug', 'troubleshooting'),
      seconds: 20
    },
    thanks: {
      notes: ['"Share how we work, reuse useful requests and expertise, and select a focused role when it helps."', '"What convention, workflow, or recurring responsibility will you test in your own repository? Keep the evidence and accepting person visible."'],
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
      question: 'How can I teach Copilot how we work—and put it to work?',
      thesis: 'Make reviewed team know-how reusable, keep it useful, and choose the smallest fitting primitive for the next task. Inspect the work and keep acceptance human-led.'
    },
    slides
  };
})();
