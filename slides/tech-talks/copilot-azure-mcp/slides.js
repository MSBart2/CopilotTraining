/* Teaching source: claims, slide data, talk track, boundaries, and evidence. */
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const SRC = {
    cli: { label: 'GitHub Copilot CLI best practices', href: 'https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices' },
    cliUse: { label: 'Using GitHub Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli' },
    mcpStart: { label: 'Get started with Azure MCP Server', href: 'https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started' },
    mcpDocs: { label: 'Azure MCP Server documentation', href: 'https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/' },
    mcpRepo: { label: 'Azure MCP Server source repository', href: 'https://github.com/Azure/azure-mcp' },
    skillsNews: { label: 'Azure Skills Plugin announcement (2026-04-27)', href: 'https://devblogs.microsoft.com/all-things-azure/announcing-the-azure-skills-plugin/' },
    skillsRepo: { label: 'Azure Skills source repository', href: 'https://github.com/microsoft/azure-skills' },
    mcpCli: { label: 'Add an MCP server to Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server' },
    sourceTalk: { label: 'Copilot + Azure Skills source talk landing page', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/copilot-azure-mcp/README.md' }
  };

  const slides = [
    S('title', 0, 'GitHub Copilot + Azure Skills Plugin', {
      chrome: false, visual: 'azure-ring', subtitle: 'Conversational Azure Prototyping and Deployment',
      tagline: 'Use live context to shape infrastructure proposals; keep authority explicit.',
      meta: 'Practitioner Tech Talk · 45 minutes · Azure developers, platform engineers, architects'
    }),
    S('core-question', 0, 'How do I use Azure context without handing over the decision?', {
      pill: 'Core Question', subtitle: 'Query, inspect, and plan while keeping the configured authority visible.',
      highlight: 'Context informs the proposal; evidence and approval govern the action.',
      routing: ['Context', 'Evidence', 'Authority'], routingLabel: 'Keep visible',
      roles: [
        { icon: '⌨️', title: 'Azure developer', description: 'Inspect resource state before shaping a change.' },
        { icon: '🧭', title: 'Platform engineer', description: 'Bound tools by environment, identity, and task.' },
        { icon: '🔐', title: 'Cloud architect', description: 'Separate permission from approval and ownership.' }
      ],
      stats: [
        { title: 'One scoped query', description: 'Name subscription, resource, fields, and time.' },
        { title: 'One reviewable proposal', description: 'Keep plan, evidence, and code distinct.' },
        { title: 'One explicit owner', description: 'A human authorizes the next consequential action.' }
      ]
    }),
    S('contents', 0, 'Table of Contents', {
      pill: 'Four parts',
      sections: [
        { icon: '🔎', title: 'Query Azure with Live Context', subtitle: 'Ask and inspect', blurb: 'Make scope and freshness part of the answer.', slide: 4 },
        { icon: '🧭', title: 'Plan Before Any Change', subtitle: 'Clarify and verify', blurb: 'Keep assumptions and proposals visible.', slide: 9 },
        { icon: '🧩', title: 'Compose Skills, MCP, and Azure', subtitle: 'Trace the mechanism', blurb: 'Separate guidance, tools, identity, and APIs.', slide: 16 },
        { icon: '🔐', title: 'Keep Authority Explicit', subtitle: 'Bound and transfer', blurb: 'Review evidence and name the action owner.', slide: 22 }
      ]
    }),
    S('part-1', 1, 'Query Azure with Live Context', {
      scene: 'opener', subtitle: 'A useful answer carries its scope, identity, fields, and freshness.',
      cards: [
        { icon: '🎯', title: 'Scope', blurb: 'Which subscription and resource?' },
        { icon: '🔎', title: 'Inspect', blurb: 'Which fields answer the task?' },
        { icon: '🧾', title: 'Carry proof', blurb: 'What time and source support it?' }
      ],
      terminal: { context: 'Ask for the resource and the fields you need', detail: 'Keep identity and scope attached' }
    }),
    S('query-shape', 1, 'A resource answer needs four pieces of context', {
      scene: 'scorecard', pill: 'Query · Evidence',
      cards: [
        { icon: '🗂️', title: 'Scope', description: 'Subscription, tenant, resource group, and resource name.' },
        { icon: '👤', title: 'Identity', description: 'The principal and role that returned this view.' },
        { icon: '📋', title: 'Fields', description: 'The properties the question actually requires.' },
        { icon: '🕒', title: 'Freshness', description: 'When the query ran and which system supplied it.' }
      ]
    }),
    S('query-transcript', 1, 'A structured query result is inspectable evidence', {
      scene: 'terminal', pill: 'Illustrative transcript',
      subtitle: 'Example only · fictional resource names · no Azure call was made',
      footnote: 'Illustrative values are not a live subscription result.',
      transcript: [
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: 'List storage accounts in example-rg with location and SKU.' },
        { type: 'thinking', label: 'Copilot requests an Azure resource tool' },
        { type: 'response', lines: [
          'Illustrative response · resource group: example-rg',
          'demo-store-a · eastus · Standard_LRS',
          'demo-store-b · westus2 · Standard_GRS',
          'Query time and principal: attach from the actual run'
        ] },
        { type: 'outcome', text: 'Inspect scope, principal, timestamp, and returned fields' }
      ]
    }),
    S('follow-up-context', 1, 'Follow-ups can use prior context; scope can drift', {
      scene: 'terminal', pill: 'Illustrative follow-up',
      subtitle: 'Carry the original scope into the next question',
      footnote: 'Fictional example. Re-query when state can change or the evidence is stale.',
      transcript: [
        { type: 'prompt', text: 'same example session' },
        { type: 'user', text: 'For demo-cosmos-a, show database throughput settings.' },
        { type: 'thinking', label: 'Copilot selects a data query' },
        { type: 'response', lines: [
          'Illustrative result · source resource: demo-cosmos-a',
          'catalog-db · autoscale maximum: 4,000 RU/s',
          'Result is a sample, not a live Azure observation',
          'Confirm account, database, mode, and time in your environment'
        ] },
        { type: 'outcome', text: 'Use session context as a pointer, not a freshness guarantee' }
      ]
    }),
    S('template-from-state', 1, 'A live configuration informs a draft; it does not certify it', {
      scene: 'showdown', pill: 'Inspect · Adapt',
      leftLabel: 'Copy the existing configuration',
      rightLabel: 'Use it as a reviewed reference',
      pairs: [
        { left: { label: 'Copy every setting', note: 'Includes environment-specific values' }, right: { label: 'Select relevant properties', note: 'Name what transfers and what changes', z: 'purple' } },
        { left: { label: 'Assume the result is current', note: 'Session context may age' }, right: { label: 'Record scope and query time', note: 'Re-check volatile properties', z: 'green' } },
        { left: { label: 'Treat output as a template', note: 'A resource has hidden dependencies' }, right: { label: 'Review the proposed differences', note: 'Validate network, identity, and cost', z: 'orange' } }
      ],
      outcomeLeft: { icon: '!', label: 'Assumptions carried forward' },
      outcomeRight: { icon: '✓', label: 'Draft with explicit checks' },
      footnote: 'Illustrative comparison; review the target service documentation and local policy.'
    }),
    S('part-2', 2, 'Plan Before Any Change', {
      scene: 'opener', subtitle: 'A plan surfaces assumptions; it does not prove a live check happened.',
      cards: [
        { icon: '❓', title: 'Clarify', blurb: 'Ask about region and dependencies.' },
        { icon: '🧪', title: 'Check', blurb: 'Label evidence and uncertainty.' },
        { icon: '🧑‍⚖️', title: 'Decide', blurb: 'Review code before deployment.' }
      ],
      terminal: { context: 'Plan a payments API environment', detail: 'Proposal first · deployment stays separate' }
    }),
    S('three-paths', 2, 'Tools, workflow guidance, and human work are distinct', {
      scene: 'three-paths', pill: 'Same intent · different responsibilities',
      subtitle: 'An illustrative comparison, not a measured or guaranteed outcome'
    }),
    S('plan-mode-boundary', 2, 'Skills activation during Plan Mode remains unverified', {
      scene: 'signals', pill: 'Recipe open decision · status 2026-10-31',
      subtitle: 'The source recipe records an assumption, not an observed result.',
      footnote: 'Resolve only with a separately authorized test; this conversion performed none.',
      rows: [
        { label: 'Claim in source recipe', description: 'Plan Mode invokes Azure Skills before code generation', tag: 'UNVERIFIED', z: 'orange' },
        { label: 'Evidence supplied', description: 'No activity log or reproducible run was included', tag: 'NONE', z: 'orange' },
        { label: 'Safe talk track', description: 'Describe a proposed flow and label it illustrative', tag: 'NO BEHAVIOR CLAIM', z: 'green' }
      ]
    }),
    S('clarifying-questions', 2, 'Clarifying questions expose deployment assumptions', {
      scene: 'terminal', pill: 'Illustrative Plan Mode scenario',
      subtitle: 'Payments API example from the source talk · no live access',
      footnote: 'This transcript is constructed from the source README; it does not report a run.',
      transcript: [
        { type: 'user', text: 'Plan a payments API beside an existing orders API.' },
        { type: 'thinking', label: 'Questions before proposing code' },
        { type: 'response', lines: [
          'Which region and app plan fit the workload?',
          'New database or existing connection?',
          'Which subnet and network boundary?',
          'What scale and isolation does the owner need?'
        ] },
        { type: 'user', text: 'Capture the answers as assumptions; request evidence.' },
        { type: 'outcome', text: 'Clarification improves the proposal; it does not authorize deployment' }
      ]
    }),
    S('plan-evidence', 2, 'Every proposed check needs provenance', {
      scene: 'plan-evidence', pill: 'Illustrative result labels',
      subtitle: 'Separate what the plan says from what a live query establishes'
    }),
    S('review-before-deploy', 2, 'Review, validate, approve, and deploy are different states', {
      scene: 'relay', pill: 'Proposed infrastructure handoff',
      columns: [
        { icon: '📄', title: 'Developer inspects', description: 'Generated Bicep is a proposal, not deployment evidence.', items: ['Review parameters', 'Check resource API', 'Compare conventions'], z: ['purple', 'purple', 'orange'] },
        { icon: '🧪', title: 'Team validates', description: 'Run checks with the right environment and policy.', items: ['Lint and validate', 'Review plan output', 'Check blast radius'], z: ['green', 'green', 'orange'] },
        { icon: '🧑‍⚖️', title: 'Owner authorizes', description: 'Use the approved deployment workflow.', items: ['Approve change', 'Run controlled deploy', 'Inspect resulting state'], z: ['orange', 'orange', 'green'] }
      ]
    }),
    S('estimate-not-result', 2, 'The source’s 45-to-8-minute comparison is unmeasured', {
      scene: 'scorecard', pill: 'Evidence status',
      cards: [
        { icon: '⏱️', title: '45 and 8 minutes', description: 'Figures repeated in the source talk; no study or timing record supplied.' },
        { icon: '❔', title: 'Missing method', description: 'No task sample, participant count, baseline, or variance is documented.' },
        { icon: '🧭', title: 'Presenter wording', description: 'Call these source estimates, never an observed result or promise.' },
        { icon: '📏', title: 'Measure locally', description: 'Time comparable tasks and record checks, rework, and approvals.' }
      ]
    }),
    S('part-3', 3, 'Compose Skills, MCP, and Azure', {
      scene: 'opener', subtitle: 'Separate guidance, tool transport, credentials, and cloud enforcement.',
      cards: [
        { icon: '📘', title: 'Skills', blurb: 'Describe workflow guidance.' },
        { icon: '🔌', title: 'MCP', blurb: 'Expose structured tools.' },
        { icon: '☁️', title: 'Azure', blurb: 'Enforce the principal’s rights.' }
      ],
      terminal: { context: 'Trace request → tool → result', detail: 'No layer grants another layer’s authority' }
    }),
    S('stack-architecture', 3, 'Skills guide workflow; Azure enforces the principal’s permissions', {
      scene: 'stack-architecture', pill: 'Control path and trust boundaries',
      subtitle: 'Tool reach is not a permission grant, and a skill is not an approval gate'
    }),
    S('skills-as-guidance', 3, 'Named Skills describe workflow guidance, not proof of execution', {
      scene: 'scorecard', pill: 'Examples named in source README',
      cards: [
        { icon: '🧰', title: 'azure-prepare', description: 'Source describes project analysis and infrastructure preparation.' },
        { icon: '✅', title: 'azure-validate', description: 'Source describes pre-deployment checks and configuration review.' },
        { icon: '🚀', title: 'azure-deploy', description: 'Source describes deployment workflow guidance.' },
        { icon: '🔎', title: 'azure-diagnostics', description: 'Source describes operational troubleshooting guidance.' }
      ],
      footnote: 'Plugin details and skill inventory are dated to the source talk; check the current repository.'
    }),
    S('mcp-request-path', 3, 'MCP carries structured requests; the host and server mediate the call', {
      scene: 'relay', pill: 'Simplified request path',
      columns: [
        { icon: '🧭', title: 'Discover', description: 'Host sees tools exposed by a configured server.', items: ['List available tools', 'Inspect descriptions', 'Choose a candidate'], z: ['purple', 'purple', 'local'] },
        { icon: '📨', title: 'Request', description: 'Host sends a structured tool call and arguments.', items: ['Name the tool', 'Send arguments', 'Apply host controls'], z: ['local', 'local', 'orange'] },
        { icon: '☁️', title: 'Return', description: 'Server calls a service and returns data or an error.', items: ['Authenticate', 'Azure authorizes', 'Inspect result'], z: ['remote', 'orange', 'green'] }
      ]
    }),
    S('setup-shape', 3, 'Setup connects a host, server, and identity', {
      scene: 'terminal', pill: 'Configuration outline · verify current docs',
      subtitle: 'Source examples are historical; exact settings vary by host and version.',
      footnote: 'No credential values shown. No login, installation, or server startup performed.',
      transcript: [
        { type: 'response', lines: [
          '1 · Install or select an Azure MCP distribution',
          '2 · Configure the host-specific server entry',
          '3 · Select the intended tenant and subscription',
          '4 · Authenticate using an approved identity',
          '5 · Inspect exposed tools and run a read-only check'
        ] },
        { type: 'divider' },
        { type: 'user', text: 'copilot /tools' },
        { type: 'outcome', text: 'Example verification command from source; confirm current CLI syntax' }
      ]
    }),
    S('scope-services', 3, 'Narrow tool exposure; scope Azure permissions separately', {
      scene: 'showdown', pill: 'Two different controls',
      leftLabel: 'Expose every configured service',
      rightLabel: 'Select the task’s service set',
      pairs: [
        { left: { label: 'More available tools', note: 'A broader selection surface' }, right: { label: 'Fewer irrelevant choices', note: 'Expose only task-relevant tools', z: 'purple' } },
        { left: { label: 'Identity unchanged', note: 'Tool list does not change RBAC' }, right: { label: 'Authorization still applies', note: 'Azure checks principal and scope', z: 'orange' } },
        { left: { label: 'Review host config', note: 'Confirm server and tenant' }, right: { label: 'Review identity config', note: 'Confirm role and resource scope', z: 'green' } }
      ],
      outcomeLeft: { icon: '→', label: 'Tool discovery surface' },
      outcomeRight: { icon: '→', label: 'Cloud authorization boundary' },
      footnote: 'Service filter variable and JSON shapes in the source are examples; verify current documentation.'
    }),
    S('part-4', 4, 'Keep Authority Explicit', {
      scene: 'opener', subtitle: 'Authentication, authorization, confirmation, and approval answer different questions.',
      cards: [
        { icon: '🪪', title: 'Authenticate', blurb: 'Which principal is connected?' },
        { icon: '🛂', title: 'Authorize', blurb: 'Which actions can it take?' },
        { icon: '🧑‍⚖️', title: 'Approve', blurb: 'Who accepts this change?' }
      ],
      terminal: { context: 'Tool available ≠ operation authorized', detail: 'A human owns consequential deployment' }
    }),
    S('authz-not-approval', 4, 'Authentication identifies; authorization and approval decide separately', {
      scene: 'authority-map', pill: 'Do not collapse these controls',
      subtitle: 'A host prompt is not a substitute for Azure RBAC or service-owner review'
    }),
    S('role-scope', 4, 'Azure roles change what the connected principal can do', {
      scene: 'scorecard', pill: 'Role names are not an approval workflow',
      cards: [
        { icon: '👁️', title: 'Reader', description: 'Read operations allowed at assigned scope; writes generally denied.' },
        { icon: '✏️', title: 'Contributor', description: 'Broad resource management within scope; cannot assign roles by itself.' },
        { icon: '🔑', title: 'Owner', description: 'Resource management plus access assignment at assigned scope.' },
        { icon: '🧑‍⚖️', title: 'Human approver', description: 'A separate workflow owner reviews the proposed change and evidence.' }
      ],
      footnote: 'Effective rights depend on role assignments, scope, deny assignments, conditions, and data-plane permissions.'
    }),
    S('separate-environments', 4, 'Separate production-read and development-write connections', {
      scene: 'relay', pill: 'Environment boundary',
      columns: [
        { icon: '🏭', title: 'Production', description: 'Use a separately scoped read identity for discovery.', items: ['Select prod endpoint', 'Query approved scope', 'Record returned state'], z: ['orange', 'remote', 'green'] },
        { icon: '🧪', title: 'Development', description: 'Generate and validate a proposal in an isolated environment.', items: ['Select dev endpoint', 'Review generated code', 'Check plan and cost'], z: ['purple', 'green', 'orange'] },
        { icon: '✅', title: 'Deployment', description: 'The service owner uses the governed change path.', items: ['Approve pull request', 'Authorize deployment', 'Inspect resulting state'], z: ['orange', 'orange', 'green'] }
      ]
    }),
    S('verify-proposal', 4, 'Compare declared infrastructure with observable environment facts', {
      scene: 'verify-proposal', pill: 'Illustrative validation',
      subtitle: 'A mismatch is a useful stop signal, not a deploy instruction'
    }),
    S('use-cases-and-limits', 4, 'Each Azure task needs its own evidence and owner', {
      scene: 'signals', pill: 'Transfer the decision, not a transcript',
      rows: [
        { label: 'Environment clone', description: 'Compare selected source settings to target policy and quotas', tag: 'REVIEW DIFF', z: 'purple' },
        { label: 'Log analysis', description: 'Check query range, workspace, sample, and time window', tag: 'VERIFY DATA', z: 'green' },
        { label: 'IaC validation', description: 'Check API versions, dependency graph, network, and identity', tag: 'VALIDATE PLAN', z: 'orange' },
        { label: 'Background audit', description: 'Name task owner, returned artifact, and escalation signal', tag: 'REVIEW HANDOFF', z: 'local' }
      ],
      footnote: 'Source scenarios are illustrative; no live clone, log query, or audit was run.'
    }),
    S('recovery-and-delegation', 4, 'Missing evidence is a stop-and-recover signal', {
      scene: 'four-phases', pill: 'Inspect → Bound → Review → Escalate',
      stageLabel: 'Step', gateLabel: '✓ evidence',
      stages: [
        { label: '1', name: 'Inspect', icon: '🔎', description: 'Confirm principal, scope, tool, and result.' },
        { label: '2', name: 'Bound', icon: '🧰', description: 'Reduce scope or choose a read-only path.' },
        { label: '3', name: 'Review', icon: '🧑‍⚖️', description: 'Compare the proposal to policy and test evidence.' },
        { label: '4', name: 'Escalate', icon: '🛑', description: 'Pause when rights or outcome remain unclear.', target: true }
      ],
      footnote: 'Cloud delegation and background work need an explicit owner, artifact, and review path.'
    }),
    S('before-after', 0, 'Move from copied assumptions to reviewed evidence', {
      scene: 'before-after', subtitle: 'The value is a better decision, not a headline speed claim.',
      before: [
        'Copy settings without recording scope',
        'Treat generated output as a live fact',
        'Combine tool permission with human approval',
        'Call an estimate an observed result'
      ],
      after: [
        'Record principal, resource, fields, and time',
        'Label samples and verify volatile state',
        'Separate permission, confirmation, and approval',
        'Measure comparable tasks before making a speed claim'
      ],
      metrics: [
        { value: 'Scope', detail: 'identity · subscription · resource' },
        { value: 'Evidence', detail: 'input · output · provenance' },
        { value: 'Owner', detail: 'review · approval · escalation' }
      ]
    }),
    S('today', 0, 'Start with one read-only query and a recorded expected result', {
      scene: 'today', subtitle: 'Use a scope your organization has already approved.',
      horizons: [
        { icon: '🔎', label: 'Today', z: 'green', items: ['Confirm tenant and subscription', 'Ask one bounded read query', 'Record expected fields and time'] },
        { icon: '🧪', label: 'This week', z: 'local', items: ['Compare answer with an approved source', 'Check a small configuration diff', 'Document stale or missing evidence'] },
        { icon: '🧭', label: 'This month', z: 'purple', items: ['Pilot in an isolated scope', 'Assign review and escalation owners', 'Measure results before claiming speed'] }
      ],
      takeaway: 'A useful pilot can stop safely when identity, scope, or evidence is unclear.'
    }),
    S('references', 0, 'References', {
      scene: 'references', subtitle: 'First-party documentation · reviewed links carried from the source talk',
      groups: [
        { icon: '☁️', title: 'Azure MCP Server', z: 'remote', items: [
          { href: SRC.mcpStart.href, label: SRC.mcpStart.label, description: 'Installation and first connection' },
          { href: SRC.mcpDocs.href, label: SRC.mcpDocs.label, description: 'Server reference and configuration' },
          { href: SRC.mcpRepo.href, label: SRC.mcpRepo.label, description: 'Source code and current implementation' }
        ] },
        { icon: '⌨️', title: 'Copilot CLI + Azure Skills', z: 'local', items: [
          { href: SRC.cli.href, label: SRC.cli.label, description: 'Tool controls and CLI practice' },
          { href: SRC.skillsNews.href, label: SRC.skillsNews.label, description: 'Announcement dated 2026-04-27' },
          { href: SRC.skillsRepo.href, label: SRC.skillsRepo.label, description: 'Repository and current skill inventory' }
        ] }
      ]
    }),
    S('thanks', 0, 'Query with context. Review the evidence. Keep authority explicit.', {
      scene: 'thanks', visual: 'azure-ring', subtitle: 'GitHub Copilot + Azure Skills Plugin',
      logo: false,
      cards: [
        { value: 'Context', detail: 'Identity · scope · time' },
        { value: 'Evidence', detail: 'Input · result · provenance' },
        { value: 'Authority', detail: 'Permission · approval · owner' }
      ],
      prompt: 'Which low-risk Azure task can you test in your own approved scope?'
    })
  ];

  const NOTES = {
    title: { seconds: 30, notes: [`"Copilot can help turn Azure questions into a structured investigation and a reviewable proposal."`, `The picture is a workflow map, not an execution trace. No Azure service or subscription is connected for this talk.`] },
    'core-question': { seconds: 40, notes: [`"The decision is how to use live context without giving away the decision itself."`, `"We will keep three things attached: evidence, the identity that can act, and the person who owns approval."`, `→ First, make a query inspectable.`] },
    contents: { seconds: 35, notes: [`"We start with a scoped query, use it to shape a plan, trace the underlying layers, and finish at the authority boundary."`, `The agenda openers are slides 4, 9, 16, and 22.`] },
    'part-1': { seconds: 35, sources: [SRC.mcpDocs], notes: [`"A conversational answer becomes useful when we can tell what it looked at and when."`, `→ Ask for fields that support one decision.`] },
    'query-shape': { seconds: 80, sources: [SRC.mcpStart, SRC.mcpDocs], notes: [`"I want the scope, principal, fields, and time alongside the answer."`, `"Those details let a reviewer decide whether the result fits the question."`, `Point to each card. A displayed value without origin and freshness is a prompt for verification, not a trust signal.`], know: [`Azure Resource Manager and data-plane calls can have distinct authorization surfaces. The authenticated principal's effective access depends on role assignments, scope, conditions, deny assignments, and service-specific permissions. The source's decision tree routes Azure discovery and troubleshooting toward an MCP-assisted query, a bounded resource change toward a plan and review, and work outside Azure toward its owning tool or team. A task with no agreed outcome needs scoping before tool selection.`] },
    'query-transcript': { seconds: 90, sources: [SRC.mcpDocs, SRC.mcpRepo], notes: [`"This terminal output is illustrative. The example names and values are fictional; no live tool call produced them."`, `"In a real run, I would record which identity, subscription, resource group, and query time produced the answer."`, `Point to the final line. It asks for actual run metadata rather than manufacturing it for the example.`], know: [`The source README includes fabricated-looking resource names and returned counts. Native slides use generic demo names and mark all outputs as illustrative. The MCP server's current tool names and result schemas vary by version; consult the linked docs and repository.`] },
    'follow-up-context': { seconds: 80, sources: [SRC.mcpDocs], notes: [`"Session context can make a follow-up convenient, but it does not freeze Azure state."`, `"When the decision depends on a volatile property, re-query and preserve the time and scope."`, `The demo Cosmos account and RU/s number are invented sample values, not an observed account.`], know: [`The source talk lists storage, Cosmos DB, App Configuration, Log Analytics, Resource Groups, DevOps artifacts, Azure CLI delegation, and Foundry MCP scenarios. Actual service/tool coverage is version-specific; the deck does not assert that every listed operation is available in every host. The source also claims specific context-compaction thresholds, pruning behavior, and session durations, without a first-party citation; do not repeat those implementation numbers as established facts. Context summaries can omit detail, so re-query material facts.`] },
    'template-from-state': { seconds: 90, sources: [SRC.mcpDocs, SRC.cli], notes: [`"A production configuration can be a useful reference, but copying it verbatim carries environment-specific assumptions."`, `"The reviewer chooses which settings transfer, then checks the target network, identity, policy, and cost."`, `Walk the right-hand column as the practice: choose, record, compare.`], know: [`The source includes a storage-account variation example: use Standard_LRS for a staging-style variant, move from prod-vnet to staging-vnet, retain an office IP rule, omit a CI/CD IP rule, retain TLS 1.2, and disable blob public access. These are illustrative changes, not validation of the sample JSON, its values, or deployment compatibility.`] },
    'part-2': { seconds: 35, sources: [SRC.cliUse], notes: [`"Planning earns its place when it makes assumptions visible before a proposed change."`, `→ We need to distinguish three contributors to that plan.`] },
    'three-paths': { seconds: 100, sources: [SRC.cli, SRC.mcpDocs, SRC.skillsRepo], notes: [`"A tool call provides a capability; workflow instructions can guide the order; people supply context, review, and authority."`, `"These are responsibilities, not a benchmark of guaranteed quality or speed."`, `Point to the human decisions that remain on every path: defining requirements, checking evidence, and authorizing the change.`], know: [`The original recipe compares no Skills, MCP only, and Skills plus MCP. Its time values (45, about 15, and 8 minutes) are unmeasured. This scene does not encode those as results. The actual division of work depends on client, server configuration, instructions, and controls. The source's contrast is useful as a decision model, not proof that Skills prevent errors or supply RBAC.`] },
    'plan-mode-boundary': { seconds: 90, sources: [SRC.cliUse, SRC.skillsRepo], notes: [`"The source recipe explicitly leaves one question open: does Plan Mode activate these Azure Skills?"`, `"It records a working assumption, but it also says the behavior was never verified."`, `"For this talk, we will describe the intended scenario and call it illustrative."`, `→ Now inspect what the example asks before any code exists.`], know: [`Status is dated 2026-10-31 for the conversion. No refresh or live test was performed. The source recipe describes Path A as assumed and Path B as an alternative if the assumption is false. Both remain possible for this deck; the presenter must not assert either as observed.`] },
    'clarifying-questions': { seconds: 90, sources: [SRC.cliUse], notes: [`"For the payment API example, the useful questions are about region, plan, database, network, and scale."`, `"Those answers constrain a proposal; they do not prove the subscription was queried."`, `The original README's sample architecture uses values such as East US, a dedicated plan, and a payment subnet. Every example here is illustrative.`], know: [`The source README contains a long Plan Mode transcript, proposed App Service Plan and SQL design, and estimated monthly cost. Its checks and cost are not documented observations or an Azure pricing quote. The sample contains deployable-looking Bicep and a deployment command; this deck deliberately does not execute or reproduce a provisioning step. The hands-on walkthrough also asks about adding a third-party API key, choosing App Service settings versus Key Vault references, selecting production or staging slots, and checking for name conflicts. It proposes a tailored app-settings command after inspection. That is a sensitive configuration decision: prefer an approved secret reference and verify slot behavior; do not put a secret value in chat, notes, or a committed file.`] },
    'plan-evidence': { seconds: 105, sources: [SRC.mcpDocs, SRC.cliUse], notes: [`"A plan can say a subnet exists or a quota is available. The presenter still needs to know which tool produced that finding and when."`, `"Keep the domain result separate from the test status. A check marked pass is not the same thing as Azure authorizing a write."`, `Point from the prompt to the three illustrative checks. The values and results on this slide are examples, not live verification.`], know: [`The source's sample plan claimed available regional capacity, an existing empty subnet, remaining SQL quota, and a missing firewall rule. It then proposed adding the rule. None of those claims were observed in a real subscription. The presenter must not describe them as live results.`] },
    'review-before-deploy': { seconds: 95, sources: [SRC.cli, SRC.mcpDocs], notes: [`"Generated Bicep is a draft artifact. A human reviews it, the team validates it, and an authorized owner decides whether a deployment runs."`, `"A plan-mode conversation is not a deployment approval."`, `Trace the three lanes. This deck stops before any Azure change.`], know: [`The source scenario's proposed Bicep includes an App Service Plan at S2, autoscale from 2 to 5, a VNet-integrated App Service, TLS 1.2, FTPS disabled, a Standard S1 SQL database, a firewall rule, and an output connection string using Microsoft Entra authentication. These are source example values, not independently validated infrastructure; network constructs, resource API versions, SKU choices, and secret handling need current review. The source also shows an az deployment group create command. It is intentionally not a live demo and was not executed.`] },
    'estimate-not-result': { seconds: 80, sources: [SRC.sourceTalk], notes: [`"The old source repeats a 45-minute baseline and an 8-minute prototype cycle."`, `"It provides no timing study, sample, or measurement method, so I will call those source estimates, not results."`, `A team that wants a speed claim can time comparable tasks and include validation, review, and rework.`], know: [`The source README was updated 2026-09-16 and gives about 15 minutes for MCP-only, 1-2 versus 3-4 attempts, and an 8-minute troubleshooting result. These are not verified measurements. The original text supplies no data collection details. Do not repeat them as measured outcomes.`] },
    'part-3': { seconds: 35, sources: [SRC.skillsNews, SRC.mcpDocs], notes: [`"Now we can trace how guidance, tools, credentials, and Azure enforcement fit together."`, `→ Follow one request through those boundaries.`] },
    'stack-architecture': { seconds: 100, sources: [SRC.skillsNews, SRC.skillsRepo, SRC.mcpDocs], notes: [`"Skills are guidance. The host chooses how to use that guidance and which available tool to call."`, `"The MCP server receives a structured request and reaches Azure with a configured identity; Azure authorizes each operation."`, `Point out that no arrow grants permission. The service owner and deployment workflow remain separate from this path.`], know: [`The source describes a three-layer stack of Azure Skills, Azure MCP Server, and Foundry MCP Server. This diagram focuses on one Azure request path; Foundry is an optional adjacent integration, not required for every Azure query. The 21 Skills and 200-plus tools across 40-plus services are claims dated to the source talk, not newly checked counts. The source's broader capability list includes resource discovery and configuration reads, KQL/Monitor analysis, Azure CLI and azd delegation, DevOps artifacts, and Foundry model/endpoint work. Each capability depends on the configured server, host, service, and permissions. The source says direct resource queries can go to MCP without Skills; this is a useful architectural possibility, not a guarantee of how every host routes prompts. Verify the actual host's activity trace.`] },
    'skills-as-guidance': { seconds: 90, sources: [SRC.skillsNews, SRC.skillsRepo], notes: [`"The source names prepare, validate, deploy, and diagnostics as workflow guidance."`, `"A Skill's presence does not tell us whether it activated, what it instructed, or whether a tool call succeeded."`, `Read the footer: verify the current inventory in the repository before describing a count or capability.`], know: [`The source README says the plugin announcement lists 21 skills, installs to a GitHub plugin folder, and is available across Copilot CLI, VS Code, and Claude Code. This deck treats those claims as time-bound to the source, not a refreshed compatibility statement. The existing README enumerates only a subset of the claimed 21.`] },
    'mcp-request-path': { seconds: 100, sources: [SRC.mcpDocs, SRC.mcpRepo], notes: [`"The host discovers tools, selects a candidate, and sends a structured request."`, `"The server handles the request with its configured credentials; Azure evaluates access and returns data or an error."`, `Point to Azure's authorization step. A tool being listed says nothing about whether this principal may perform a requested action.`], know: [`The original README describes MCP tools/list, tools/call, SDK calls, and natural-language response formatting. Exact protocol details and implementation vary by client/server version. Azure authorization occurs at the service layer; tool confirmation and host policies may also apply.`] },
    'setup-shape': { seconds: 100, sources: [SRC.mcpStart, SRC.mcpCli, SRC.cli], notes: [`"Setup has four decisions: which distribution, which host configuration, which subscription, and which identity."`, `"Then inspect the exposed tools and begin with a read-only check in an approved scope."`, `The historical source shows extension, package-manager, Docker, and CLI approaches. Verify every command against current documentation before presenting it as current.`], know: [`The source README includes npm, Python, .NET, Docker, VS Code, az login, subscription selection, and the copilot /tools check. One historical host example uses mcpServers with name, command npx, args @azure/mcp, and AZURE_SUBSCRIPTION_ID; the hands-on walkthrough instead uses servers with an azure entry and npx -y @azure/mcp@latest server start. These differing schemas and startup forms are source examples, not current canonical configuration. The README's service filter example is AZURE_MCP_ENABLED_SERVICES=storage,cosmosdb,monitor,appconfig and says to reset the CLI after config changes. Confirm support and current syntax in docs. The source also suggests Azure Skills marketplace/install commands for Copilot CLI and Claude Code, and the Azure MCP extension for VS Code; verify host combinations. The source labels four artifacts (interactive query session, Plan Mode deployment workflow, MCP config, and RBAC-scoped setup), but they were inline README examples rather than separate files; their teaching content is retained in these notes. Never commit a client secret or credential to a repository. Use the organization's approved secret and identity mechanism, and confirm the current server's credential support in its documentation.`] },
    'scope-services': { seconds: 100, sources: [SRC.mcpDocs, SRC.mcpCli], notes: [`"Selecting fewer services can make the tool surface easier to reason about."`, `"That selection does not narrow the Azure role assignment. Check the identity's actual scope separately."`, `The README shows an enabled-services environment setting as an example; confirm whether it remains supported for your server version.`], know: [`The source lists storage, Cosmos DB, Monitor, App Configuration, resources, DevOps, SQL, Key Vault, AKS, Functions, and App Service. Treat that list and the example filter as dated examples, not a current capability matrix.`] },
    'part-4': { seconds: 35, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Here is the distinction that keeps the rest of the design honest: identity, permission, and approval are separate."`, `→ Put each one on its own line.`] },
    'authz-not-approval': { seconds: 110, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Authentication tells us which principal is connected. Authorization determines what that principal may do at a particular scope."`, `"A host confirmation prompt is another control, and the service owner may require an approval workflow beyond it."`, `Point at each box separately. Neither an allowlisted tool nor a clicked prompt grants Azure permissions or replaces change approval.`], know: [`The Azure MCP Server source says it uses authenticated credentials and does not elevate them. Azure RBAC is enforced for control-plane operations; some data-plane capabilities use service-specific roles or policies. Access to Key Vault secrets, database contents, storage data, and DevOps artifacts depends on the configured tools and granted permissions; do not assume the server is metadata-only. MCP availability, host confirmation, and organizational change control are distinct.`] },
    'role-scope': { seconds: 105, sources: [SRC.mcpDocs], notes: [`"Reader, Contributor, and Owner are different authority levels, assigned at a scope."`, `"Contributor can manage resources within scope; Owner also includes access-management authority."`, `The service owner still decides whether a proposed change follows the organization's approval path.`], know: [`The source README's Reader/Contributor/Owner summary is a useful simplification, not a complete authorization analysis. Effective rights also depend on scope, custom roles, conditions, deny assignments, policy, and data-plane roles. Do not claim every Reader role prevents all conceivable side effects across every connected service.`] },
    'separate-environments': { seconds: 105, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Separate connections make it easier to see which environment and principal the session targets."`, `"Keep production discovery and development changes in deliberately different scopes."`, `"The person responsible for deployment uses the governed path and checks resulting state."`], know: [`The source recommends separately named production and dev server entries, each with its own subscription ID and identity; production uses a Reader-like scope, development uses a more permissive role only in an isolated subscription. Its example places a client secret in environment configuration; this deck deliberately provides no secret-bearing snippet. The pattern is an organizational design choice, not a safe default conferred by MCP.`] },
    'verify-proposal': { seconds: 105, sources: [SRC.mcpDocs], notes: [`"A reviewer compares what the file declares with what the environment and service rules establish."`, `"A network mismatch, a plan mismatch, or an identity gap means pause and revise the proposal."`, `All resource names and mismatch signals are illustrative; no Bicep file was queried and no live check was run.`], know: [`The source includes an Azure Function/Event Hub validation story: subnet capacity, partition count, and a plan tier were reported as findings. Those values and conclusions are not validated here. Use current product documentation and actual plan output before acting.`] },
    'use-cases-and-limits': { seconds: 95, sources: [SRC.mcpDocs, SRC.cli], notes: [`"The source gives three broader cases: clone an environment, inspect logs, and validate infrastructure as code."`, `"Each case has a different evidence source and review owner."`, `Log query timestamps, environment diffs, and IaC plans are examples of evidence to gather; none was collected for this deck.`], know: [`The source's cloning example proposes production-to-staging changes to Storage, App Service, and Cosmos DB, with example SKUs, throughput, a claimed two-hour baseline, a 15-minute result, and a cost comparison. The log example sketches KQL requests and exception queries, a SQL timeout, and a connection-pool suggestion; it cites 450 requests/minute, 200 ms, and an 8-minute diagnosis without a run record. The IaC example lists a VNet subnet, Event Hub partitions, a Function plan constraint, and managed identity. These values and service conclusions are illustrative source claims, not verified evidence. Cloud-delegated audits additionally need task ownership, result retention, tool scope, and escalation handling.`] },
    'recovery-and-delegation': { seconds: 95, sources: [SRC.cli, SRC.mcpDocs], notes: [`"When identity, scope, or evidence is missing, pause and reduce the task until the result is inspectable."`, `"When the task moves to background delegation, name who owns it and where its result will be reviewed."`, `The source describes the Copilot CLI ampersand delegation prefix. Confirm current host behavior, and use only with approved scopes and a clear return artifact.`], know: [`Recovery includes checking subscription and principal, rerunning a bounded read query, examining server or tool errors, validating the generated file locally, and escalating unresolved authorization or policy questions to the relevant owner. Do not retry an uncertain write blindly. The source's claim that delegation makes the terminal immediately free is not independently verified here. Related extensions named by the source include organization MCP registry governance, custom skills and MCP tools, multi-cloud connections, and programmatic CLI use in CI. These are possible follow-on designs, not validated recommendations or part of this talk's demonstration.`] },
    'before-after': { seconds: 45, notes: [`"The useful change is a more inspectable decision: scope, evidence, and owner travel together."`, `These are practice changes, not claims about elapsed time or guaranteed outcomes.`] },
    today: { seconds: 60, notes: [`"Pick one low-risk read query in a scope your organization already approves."`, `"Write down what you expect to see, compare the response with an approved source, and keep the query time."`, `"If identity or evidence is unclear, stop and ask the owner before expanding access."`], know: [`Transfer prompt: which real Azure task in your workflow has a small, read-only first step, a checkable result, and a named person who decides the next action? The source README lays out three learning horizons: a quick connection and first query; a deeper split between production-read and isolated-development access; and later integration of team conventions, custom instructions, governance, and a measured deployment pilot. Its 10-minute setup estimate and 15-minute/1-hour/2-4-hour learning durations are source estimates, not measured commitments. The source's custom-instruction examples cover naming, required tags, network patterns, public access, and minimum database SKU; adapt policy to your own service owner.`], cue: [`No live demo. Ask the room to name the expected fields, source of truth, and stop condition for a task in their own environment.`] },
    references: { seconds: 30, sources: [SRC.cli, SRC.cliUse, SRC.mcpStart, SRC.mcpDocs, SRC.mcpRepo, SRC.skillsNews, SRC.skillsRepo, SRC.mcpCli], notes: [`"These are first-party starting points for the current host, server, and Skills repository."`, `The Azure Skills announcement is dated 2026-04-27 in the source README. No product-content refresh was performed for this conversion.`] },
    thanks: { seconds: 30, notes: [`"Take one bounded task back to your environment. Keep the query context, evidence, and owner visible."`, `"The useful transfer is a better decision in your workflow, not a promise that every task becomes faster."`] }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-azure-mcp',
      title: 'GitHub Copilot + Azure Skills Plugin: Conversational Azure Prototyping and Deployment',
      short: 'Azure context, MCP tools, workflow guidance, and explicit authority',
      category: 'practitioner-tech-talk',
      source: 'tech-talks/copilot-azure-mcp/README.md',
      question: 'How do I use Azure context without handing over the decision?',
      thesis: 'Azure context can inform a reviewable infrastructure proposal when scope, evidence, identity, and human authority remain explicit.'
    },
    matrix: {},
    slides
  };
})();
