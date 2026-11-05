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
    deploySkill: { label: 'azure-deploy skill definition', href: 'https://github.com/microsoft/azure-skills/blob/main/skills/azure-deploy/SKILL.md' },
    whatIf: { label: 'Azure Resource Manager deployment what-if', href: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if' },
    deployExamples: { label: 'GitHub Copilot for Azure deployment examples', href: 'https://learn.microsoft.com/en-us/azure/developer/github-copilot-azure/deploy-examples' },
    mcpCli: { label: 'Add an MCP server to Copilot CLI', href: 'https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server' },
    sourceTalk: { label: 'Copilot + Azure Skills source talk landing page', href: 'https://github.com/MSBart2/CopilotTraining/blob/main/tech-talks/copilot-azure-mcp/README.md' }
  };

  const slides = [
    S('title', 0, 'GitHub Copilot + Azure Skills Plugin', {
      chrome: false, visual: 'azure-ring', subtitle: 'Conversational Azure Prototyping and Deployment',
      tagline: 'Live Azure context shapes the proposal. You keep the decision.',
      meta: 'Extend and Embed · Practitioner Tech Talk · 45 min'
    }),
    S('core-question', 0, 'How do I use Azure context without handing over the decision?', {
      scene: 'core-lanes', pill: 'Core Question', subtitle: 'Query, inspect, and plan while keeping the configured authority visible.',
      highlight: 'Context informs the proposal; evidence and approval govern the action.',
      routing: ['Context', 'Evidence', 'Authority'],
      roles: [
        { icon: '⌨️', title: 'Azure developer', description: 'Inspect resource state before shaping a change.' },
        { icon: '🧭', title: 'Platform engineer', description: 'Check a proposal against environment and policy.' },
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
        { icon: '🧭', title: 'Plan Before Any Change', subtitle: 'Clarify, check, decide', blurb: 'Follow one ticket to an approved plan.', slide: 9 },
        { icon: '🧩', title: 'Compose Skills, MCP, and Azure', subtitle: 'Deploy from the chat', blurb: 'Follow the approved plan to deployed.', slide: 15 },
        { icon: '🔐', title: 'Keep Authority Explicit', subtitle: 'Green lights', blurb: 'Name every green light and its owner.', slide: 21 }
      ]
    }),
    S('part-1', 1, 'Query Azure with Live Context', {
      scene: 'opener', subtitle: 'Follow one question from ask to decision: what does production payments storage look like today?',
      cards: [
        { icon: '🎯', title: 'Ask narrowly', blurb: 'Name subscription, resource, and fields.' },
        { icon: '🧾', title: 'Read the receipt', blurb: 'Check scope, identity, and time.' },
        { icon: '📝', title: 'Decide each setting', blurb: 'Choose what staging keeps or changes.' }
      ],
      terminal: { context: 'Staging needs storage like production paystore', detail: 'Ask Copilot what production has today' }
    }),
    S('query-shape', 1, 'A scoped question gets an answer you can use', {
      scene: 'scoped-ask', pill: 'Step 1 · Ask', steps: { current: 1, total: 4 },
      subtitle: 'Staging needs storage that behaves like production payments. Start with the question.',
    }),
    S('query-transcript', 1, 'The answer carries its receipt', {
      scene: 'answer-receipt', pill: 'Step 2 · Read', steps: { current: 2, total: 4 },
      subtitle: 'Four questions a reviewer asks of the paystore-prod result before using it.',
    }),
    S('follow-up-context', 1, 'Follow-ups inherit the scope, and the snapshot ages', {
      scene: 'context-drift', pill: 'Step 3 · Re-check', steps: { current: 3, total: 4 },
      subtitle: 'The chat remembers 10:02. Azure kept moving.',
    }),
    S('template-from-state', 1, 'Copilot shows what production has. You decide what staging gets.', {
      scene: 'staging-draft', pill: 'Step 4 · Decide', steps: { current: 4, total: 4 },
      subtitle: 'Copying production as-is brings its network, its rules, and its cost into staging.'
    }),
    S('part-2', 2, 'Plan Before Any Change', {
      scene: 'opener', subtitle: 'Follow one ticket from request to approval: stand up paystore-staging.',
      cards: [
        { icon: '❓', title: 'Clarify', blurb: 'Turn every gap into a question.' },
        { icon: '🔎', title: 'Check', blurb: 'Confirm each answer against Azure.' },
        { icon: '🧑‍⚖️', title: 'Decide', blurb: 'A named owner approves the plan.' }
      ],
      terminal: { context: 'Ticket: stand up paystore-staging', detail: 'Settings decided in Part 1 · plan before any change' }
    }),
    S('the-ticket', 2, 'Copilot shortens the path to a reviewable plan, not the review', {
      scene: 'ticket-time', pill: 'The ticket',
      subtitle: 'A routine infra request, worked by hand and with Copilot.'
    }),
    S('clarify', 2, 'Every gap becomes a question with an owner', {
      scene: 'clarify-questions', pill: 'Step 1 · Clarify', steps: { current: 1, total: 3 },
      subtitle: 'Before any Bicep, Copilot asks what the ticket leaves open.'
    }),
    S('live-checks', 2, 'Azure confirms four answers and overturns one', {
      scene: 'live-checks', pill: 'Step 2 · Check', steps: { current: 2, total: 3 },
      subtitle: 'Each answer is an assumption until a live query backs it.'
    }),
    S('plan-receipt', 2, 'The approver reads the plan and its evidence together', {
      scene: 'plan-receipt', pill: 'Step 3 · Decide', steps: { current: 3, total: 3 },
      subtitle: 'What changes, what backs it, what the checks changed, and what is still open.'
    }),
    S('approval-path', 2, 'Approval is the gate, wherever the deploy runs', {
      scene: 'approval-path', pill: 'Step 3 · Decide', steps: { current: 3, total: 3 },
      subtitle: 'The approved plan can deploy from this chat or from a pipeline. Approval comes first either way.'
    }),
    S('part-3', 3, 'Compose Skills, MCP, and Azure', {
      scene: 'opener', subtitle: 'Follow the approved plan to deployed, in the same chat.',
      cards: [
        { icon: '📘', title: 'Skills', blurb: 'Sequence the work and its gates.' },
        { icon: '🔌', title: 'MCP', blurb: 'Carry each call to Azure.' },
        { icon: '☁️', title: 'Azure', blurb: 'Decides what your identity may do.' }
      ],
      terminal: { context: 'Lead approved the paystore-staging plan', detail: 'Next prompt: deploy it' }
    }),
    S('deploy-stack', 3, 'One deploy prompt crosses four layers, and each can say no', {
      scene: 'deploy-stack', pill: 'The stack',
      subtitle: 'Skill, host, tools, and Azure each get a chance to stop the change.'
    }),
    S('skill-gates', 3, 'The deploy skill will not skip its gates', {
      scene: 'skill-gates', pill: 'The skill chain',
      subtitle: 'Three Azure Skills, one plan file, and a status only validation can set.'
    }),
    S('deploy-trace', 3, 'One deploy, from prompt to receipt, in one chat', {
      scene: 'deploy-trace', pill: 'The deploy',
      subtitle: 'Every step has a time, an actor, and something you can check.'
    }),
    S('setup-choices', 3, 'Setup is four choices, each with a check', {
      scene: 'setup-choices', pill: 'Setup',
      subtitle: 'Exact install steps vary by host and version. The choices do not.'
    }),
    S('tools-vs-rights', 3, 'Reach and rights are separate dials', {
      scene: 'tools-vs-rights', pill: 'Scope',
      subtitle: 'What Copilot can reach is set in the host. What Azure allows is set by roles.'
    }),
    S('part-4', 4, 'Keep Authority Explicit', {
      scene: 'opener', subtitle: 'paystore-staging is deployed. Who gave the green light, at each step?',
      cards: [
        { icon: '🪪', title: 'Authenticate', blurb: 'Who is connected?' },
        { icon: '🛂', title: 'Authorize', blurb: 'What may it do, and where?' },
        { icon: '🧑‍⚖️', title: 'Approve', blurb: 'Who accepts the change?' }
      ],
      terminal: { context: 'paystore-staging deployed at 11:24', detail: 'Four green lights made it happen' }
    }),
    S('four-green-lights', 4, 'Four different green lights deployed paystore-staging', {
      scene: 'four-green-lights', pill: 'Green lights',
      subtitle: 'Each came from a different place. None can stand in for another.'
    }),
    S('role-scope', 4, 'A role only means something at a scope', {
      scene: 'role-scope', pill: 'Roles',
      subtitle: 'The engineer reads production and writes staging. Nothing more.'
    }),
    S('separate-environments', 4, 'One connection reads production. Another writes staging.', {
      scene: 'connections', pill: 'Connections',
      subtitle: 'Production changes take the governed path, with their own identity.'
    }),
    S('owner-decides', 4, 'When the decision is not yours, Copilot drafts the ask', {
      scene: 'owner-decides', pill: 'Ownership',
      subtitle: 'The partner rule from Part 2 needs two owners. Copilot brings them the facts.'
    }),
    S('other-tasks', 4, 'The same questions carry to your next Azure task', {
      scene: 'other-tasks', pill: 'Transfer'
    }),
    S('story-recap', 0, 'One ticket, four habits for your next Azure change', {
      scene: 'story-recap', pill: 'Recap',
      subtitle: 'Each part of the paystore-staging story left one habit worth keeping.'
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
    'core-question': { seconds: 45, notes: [`"The decision is how to use live Azure context without giving away the decision itself."`, `"Each lane is one thing we keep visible. Context for the developer who inspects state. Evidence for the platform engineer who checks a proposal. Authority for the architect who separates permission from approval."`, `Point down each lane: lens, then the role that needs it, then what that role leaves with.`, `→ First, make a query inspectable.`] },
    contents: { seconds: 35, notes: [`"We start with a scoped query, use it to shape a plan, trace the underlying layers, and finish at the authority boundary."`, `The agenda openers are slides 4, 9, 16, and 22.`] },
    'part-1': { seconds: 40, sources: [SRC.mcpDocs], notes: [`"For this part we follow one real-shaped task. The payments team needs staging storage that behaves like production, so a platform engineer asks Copilot what production looks like today."`, `"Three moves: ask narrowly, read the receipt, then decide what staging gets."`, `Say once, here: the resource names and values in this part are a worked example.`, `→ It starts with how the question is asked.`] },
    'query-shape': { seconds: 75, sources: [SRC.mcpStart, SRC.mcpDocs], notes: [`"Same engineer, same goal, two ways to ask."`, `"The broad ask returns a pile. Every account is real, and none of them answers the staging question."`, `"The scoped ask names the subscription, the resource group, the resource, and the fields. Copilot comes back with one resource and exactly what the staging decision needs."`, `Point at the four scope chips. They are the difference between an inventory and an answer.`, `→ Now read that answer the way a reviewer would.`], know: [`Azure Resource Manager and data-plane calls can have distinct authorization surfaces. The authenticated principal's effective access depends on role assignments, scope, conditions, deny assignments, and service-specific permissions. The source's decision tree routes Azure discovery and troubleshooting toward an MCP-assisted query, a bounded resource change toward a plan and review, and work outside Azure toward its owning tool or team. A task with no agreed outcome needs scoping before tool selection.`] },
    'query-transcript': { seconds: 90, sources: [SRC.mcpDocs, SRC.mcpRepo], notes: [`"Here is the paystore-prod answer. Before I use it, I ask four questions of it."`, `"Scope: is this the right resource? Identity: who could see this view, and with which role? Fields: does it answer the staging task? Freshness: when was it true?"`, `"Together those four make a receipt. A value with no receipt is a prompt to verify, not something to build on."`, `Walk the callouts in reveal order: scope, identity, fields, freshness. In a real run, record the actual principal and query time.`, `→ The receipt has a timestamp for a reason.`], know: [`The source README includes fabricated-looking resource names and returned counts. Native slides use generic demo names. The MCP server's current tool names and result schemas vary by version; consult the linked docs and repository. The principal and queriedAt rows show what to capture from a real run; the server output format can differ.`] },
    'follow-up-context': { seconds: 80, sources: [SRC.mcpDocs], notes: [`"Follow-ups are where this gets convenient, and where it quietly goes stale."`, `"At 10:02 Copilot returned two IP rules. At 10:15 a teammate added a partner rule in Azure. At 10:40 I ask which rules staging keeps, and the answer comes from the 10:02 snapshot, so it misses one."`, `"The fix is cheap: re-query. The rule of thumb is to re-query when the property can change and the decision depends on it."`, `Point at the two lanes. The chat lane holds a snapshot; the Azure lane keeps moving.`, `→ With a fresh receipt, we can decide what staging gets.`], know: [`The source talk lists storage, Cosmos DB, App Configuration, Log Analytics, Resource Groups, DevOps artifacts, Azure CLI delegation, and Foundry MCP scenarios. Actual service/tool coverage is version-specific; the deck does not assert that every listed operation is available in every host. The source also claims specific context-compaction thresholds, pruning behavior, and session durations, without a first-party citation; do not repeat those implementation numbers as established facts. Context summaries can omit detail, so re-query material facts.`] },
    'template-from-state': { seconds: 90, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Here is the point of the whole part. Copilot can tell me what production has. It cannot tell me what staging needs."`, `"Copy production as-is and staging inherits geo-redundant storage it does not need, a seat on the production network, and the production pipeline's access."`, `"So I make a call on every setting, and write down why: change the SKU and network, keep the office rule and the security baseline, drop the CI/CD rule."`, `"And the partner rule from 10:15? That is not mine to grant, so it goes to its owner."`, `"What leaves Part 1 is a short list where every difference from production is on purpose. Part 2 turns that list into a plan."`, `→ Planning is next.`], know: [`The source includes a storage-account variation example: use Standard_LRS for a staging-style variant, move from prod-vnet to staging-vnet, retain an office IP rule, omit a CI/CD IP rule, retain TLS 1.2, and disable blob public access. The partner IP rule is an addition that ties back to the drift slide. Check the target service documentation and local policy before reusing these values.`] },
    'part-2': { seconds: 35, sources: [SRC.cliUse], notes: [`"Part 1 ended with a short list of settings, each one on purpose. Now somebody has to build it."`, `"This is the most ordinary ticket an infra team gets: stand up a storage account in staging. We follow it through three moves: clarify, check, decide."`, `→ First, where the time goes.`] },
    'the-ticket': { seconds: 90, sources: [SRC.sourceTalk, SRC.cliUse], notes: [`"By hand, getting this ticket to a reviewable plan means looking up both environments, reading the docs and policies, and writing the Bicep. Call it about forty-five minutes."`, `"With Copilot doing the lookups and the first draft, that drops to something like eight."`, `"Look at what did not shrink: review and approval. That block is the same length on both rows, and it is the part worth protecting."`, `These are representative estimates from the source talk, not a measurement. If your team wants a real number, time a few comparable tickets end to end, including checks, rework, and approval.`, `→ Step one: clarify.`], know: [`The source talk quotes 45 minutes by hand and 8 minutes with Skills plus MCP, and about 15 for MCP alone. It supplies no task sample, participant count, baseline, or variance. The per-step split on this slide is a representative breakdown for teaching, not data.`] },
    'clarify': { seconds: 90, sources: [SRC.cliUse], notes: [`"The engineer asks Copilot to plan the ticket. Before it writes anything, it asks what the ticket leaves open."`, `"Region, subnet, name, how the office reaches it, and the partner rule from Part 1."`, `"Notice the right-hand column. Four answers come from the engineer. One does not: the partner rule belongs to the payments owner, so it stays open."`, `"Five answers, and every one of them is still an assumption."`, `→ So we check them.`], know: [`Copilot CLI plan mode asks clarifying questions before proposing an implementation. Whether Azure Skills activate during plan mode is unverified for this deck, so the talk track says Copilot asks, without naming which skill or tool shaped the questions.`] },
    'live-checks': { seconds: 105, sources: [SRC.mcpDocs, SRC.cliUse], notes: [`"Each answer meets a live query. Region supports the SKU. The subnet exists and has room. The name is free."`, `"Then the fourth one. The staging resource group carries an Azure Policy that denies public network access on storage. An office IP rule needs public access. So the answer we gave in step one cannot work."`, `"That is the moment this whole part is about. The check changed the plan: a private endpoint replaces the office IP rule."`, `"Each result carries a time and an identity, the same receipt habit as Part 1."`, `→ Now the plan goes to the person who approves it.`], know: [`Azure Policy includes a built-in definition that audits or denies storage accounts with public network access enabled. Storage account names are globally unique, so name availability is a real pre-check. Exact tool names for each query vary by Azure MCP Server version; the slide shows the question asked, not a specific tool.`] },
    'plan-receipt': { seconds: 95, sources: [SRC.whatIf, SRC.mcpDocs, SRC.cli], notes: [`"Here is what lands in front of the approver. Four blocks."`, `"What changes comes from what-if, an Azure Resource Manager preview. Hand it the Bicep, and Azure reports what it would create, modify, or delete, without changing anything."`, `"Here: three resources to create, nothing modified, nothing deleted. That preview is what the lead approves, and it is what the real deploy gets held to later."`, `"What backs it: the checks, with time and identity. What the checks changed: the private endpoint. What is still open: the partner rule, with its owner."`, `"An approver can say yes to this in a few minutes, because nothing in it asks them to trust the chat."`, `→ And saying yes is its own step.`], know: [`Run a what-if or equivalent validation, in the chat or your pipeline, to produce the change summary. The values on this slide are the worked example; check the target service documentation and local policy before reusing them.`] },
    'approval-path': { seconds: 90, sources: [SRC.cli, SRC.deploySkill], notes: [`"Four handoffs, four owners. Copilot proposes. The engineer validates. The platform lead approves. Then the deploy runs."`, `"Where it runs is a team choice: this same chat, or your pipeline. Either way, it runs only what was approved."`, `"The last box loops back to Part 1: query the new account and read its receipt. That is how you know the change landed the way the plan said."`, `→ Part 3 takes the same-chat route and shows how it works.`], know: [`Teams often keep production deploys in a pipeline with its own identity and use the same-chat route for dev and staging. Part 4 returns to separating production-read and development-write connections.`] },
    'part-3': { seconds: 35, sources: [SRC.skillsNews, SRC.mcpDocs], notes: [`"The lead approved the plan. Now the engineer types one more prompt in the same chat: deploy it."`, `"Three pieces make that work: Skills sequence the steps, MCP carries the calls, Azure decides what the engineer may do."`, `→ Start with what that one prompt passes through.`] },
    'deploy-stack': { seconds: 100, sources: [SRC.deploySkill, SRC.cliUse, SRC.mcpDocs], notes: [`"One prompt, four layers, and each one can say no."`, `"The azure-deploy skill refuses unless the plan is Validated. The host shows the command and waits for a yes. The tools carry the call as the engineer's own sign-in. Azure checks the engineer's role on staging-rg before it writes anything."`, `"Read the right-hand column as your safety net. None of it depends on the model getting it right."`, `→ The first layer is the skill chain. Here is what it enforces.`], know: [`The azure-deploy skill runs azd up, azd deploy, terraform apply, and az deployment commands, and requires azure-prepare and azure-validate to have run first. Copilot hosts ask before running shell commands or tools unless the user has pre-approved them; check your host's approval settings. The Azure MCP Server provides live reads and tool calls; whether a given step runs through an MCP tool or the az CLI depends on the skill and host.`] },
    'skill-gates': { seconds: 95, sources: [SRC.deploySkill, SRC.skillsRepo], notes: [`"Three skills, one plan file."`, `"azure-prepare writes the plan and the Bicep, and asks you to approve the plan. azure-validate runs the checks, and it is the only skill allowed to mark the plan Validated. azure-deploy will not run without that status, and it asks again before anything destructive."`, `"These are automatic gates on the plan. The lead's approval from Part 2 is the human gate in front of them."`, `→ Now watch one deploy go through.`], know: [`From the azure-deploy SKILL.md: azure-prepare must produce .azure/deployment-plan.md; azure-validate must pass and set status Validated; azure-deploy must not set that status itself; destructive actions require an explicit user prompt. Skill content changes over time; check the current repository before quoting rules.`] },
    'deploy-trace': { seconds: 100, sources: [SRC.deploySkill, SRC.deployExamples], notes: [`"11:20, the engineer asks to deploy. Copilot shows the exact command and asks."`, `"11:21, the engineer says yes, because the command matches the approved plan. Azure checks the role: Contributor on staging-rg, so the write is allowed."`, `"11:24, three resources created, nothing modified, nothing deleted. Same as the what-if the lead approved."`, `"11:25, the engineer re-queries, the Part 1 habit, and the receipt matches the plan. Ticket closed, and nobody left the chat."`, `→ Getting to this point takes a one-time setup.`], know: [`The times and results are the worked example. In a real run, compare the deployment result with the approved what-if and re-query the resource before closing the ticket.`] },
    'setup-choices': { seconds: 80, sources: [SRC.skillsNews, SRC.mcpStart, SRC.mcpCli], notes: [`"Setup comes down to four choices, and each has a check."`, `"Install the plugin and confirm the skills show up. Add Azure MCP and confirm the tools are listed. Sign in to the right subscription and confirm it with az account show. Decide the identity and its scope, here a role on staging-rg only."`, `"Then start the way Part 1 did: one read-only query, and read its receipt."`, `→ That fourth choice deserves its own slide.`], know: [`Install commands differ across Copilot CLI, VS Code, and other hosts, and change between versions; follow the current Azure Skills and Azure MCP getting-started docs. Never commit a client secret or credential to a repository; use the organization's approved identity mechanism.`] },
    'tools-vs-rights': { seconds: 95, sources: [SRC.mcpDocs, SRC.mcpCli], notes: [`"Two dials. What Copilot can reach is set in the host and server configuration. What Azure allows is set by role assignments."`, `"Reading staging config works. Deploying to staging works, after your yes. Deploying to production is reachable, but Azure denies it, because the role is not there. Key Vault secrets are never offered, because the tool is not exposed."`, `"Turning one dial down does not turn the other down. Narrow both to the task."`, `→ Which brings us to authority.`], know: [`Azure MCP Server supports limiting which services or tools are exposed; check the current documentation for the exact setting. Tool exposure never narrows Azure RBAC, and RBAC never hides a tool.`] },
    'part-4': { seconds: 35, sources: [SRC.mcpDocs, SRC.cli], notes: [`"paystore-staging is deployed. Before we close the ticket, one question: who gave the green light, at each step?"`, `"There were more green lights than it felt like, and each one came from a different place."`, `→ Count them.`] },
    'four-green-lights': { seconds: 110, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Four green lights. Entra ID said who is connected. Azure RBAC said what that identity may do on staging-rg. Back in Part 2, the platform lead accepted the change on the what-if plan. Then, at 11:21, the host asked to run the command, and the engineer said y because it matched that approved plan."`, `"Order matters: approval comes first, confirmation comes last. Each one lives in a different system, with a different owner."`, `"And none of them stands in for another. Clicking yes in the host grants no role. Holding Contributor approves nothing."`, `→ The second green light, the role, deserves a closer look.`], know: [`The Azure MCP Server uses the signed-in credentials and does not elevate them. Azure RBAC governs control-plane operations; some data-plane access (Key Vault secrets, storage data, database contents) needs service-specific roles or policies. Host confirmation behavior depends on the host and its approval settings.`] },
    'role-scope': { seconds: 95, sources: [SRC.mcpDocs], notes: [`"Reader, Contributor, Owner. On their own they say nothing. A role is always granted at a scope."`, `"In this story the engineer holds Reader on prod-rg, which is what Part 1 used, and Contributor on staging-rg, which is what Part 3 used."`, `"Owner can grant access to others. Nobody in this chat holds it, and that is on purpose."`, `→ Two roles, two scopes. The cleanest way to keep them apart is two connections.`], know: [`Effective rights also depend on custom roles, conditions, deny assignments, Azure Policy, and data-plane roles. The role-to-scope pairing here is the worked example; your organization's assignments decide the real one.`] },
    'separate-environments': { seconds: 100, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Production reads go through one connection, with Reader on prod-rg. Staging writes go through another, with Contributor on staging-rg."`, `"Production changes take a third path: the pipeline, with its own identity and its own approval. Not this chat."`, `"The payoff: every receipt names its connection, so you always know which environment you touched."`, `→ Back to the one item still open on the ticket.`], know: [`The source recommends separately named production and development server entries, each with its own subscription and identity. Its example puts a client secret in configuration; this deck deliberately shows none. Use your organization's approved identity mechanism.`] },
    'owner-decides': { seconds: 105, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Remember the partner rule from Part 2? Still open."`, `"Copilot already has two facts: production has had the rule since 10:15, and staging policy denies public network access."`, `"That makes it two decisions, with two owners. The payments owner decides whether the partner needs staging. The policy owner decides whether an exception is allowed."`, `"The engineer has access to stpaystorestg. That does not make this the engineer's decision, so the change waits. Copilot's job is to draft one clear message with both facts, so the owners can decide quickly."`, `→ This pattern is not specific to storage.`] },
    'other-tasks': { seconds: 95, sources: [SRC.mcpDocs, SRC.cli], notes: [`"Here is the same pattern on four other Azure tasks."`, `"For each one, ask what Copilot read, as whom, what proves the answer, and who decides what happens next."`, `"Investigating an incident? Check the query, the time window, and the sample before trusting the conclusion. Reviewing IaC? The what-if output is the evidence. A background audit? It needs a named owner and a report someone will actually read."`, `→ Let us pull the whole story together.`], know: [`The source talk also sketches an environment clone with SKU and cost changes, a KQL log investigation, and an IaC validation story. Their figures are source claims and were not re-run for this deck.`] },
    'story-recap': { seconds: 60, notes: [`"One ticket, start to finish. Each part left a habit."`, `"Part 1: at 10:41 the re-query caught a rule the old answer missed. Every answer carries a receipt."`, `"Part 2: at 11:05 a live policy check turned the IP rule into a private endpoint. Check live before you plan."`, `"Part 3: at 11:24 the deploy matched the approved what-if, and a re-query confirmed it. Hold the deploy to the preview."`, `"Part 4: four green lights, each from its own owner, and one decision still waiting for its owners. Know who gave each green light."`, `"Scope, evidence, and an owner. That is what travels to your next Azure change."`, `→ So where do you start tomorrow?`] },
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
