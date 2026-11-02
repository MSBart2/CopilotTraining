/*
  GitHub Copilot with Microsoft Foundry — teaching source.
  Example details and walkthrough outputs are illustrative, not observed deployments.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });
  const SRC = {
    host: { label: 'Quickstart: Deploy your first hosted agent — Microsoft Foundry', href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent' },
    iq: { label: 'Quickstart: Add a Foundry IQ knowledge base to a hosted agent with a toolbox', href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent' },
    connect: { label: 'Connect agents to Foundry IQ knowledge bases', href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/foundry-iq-connect' },
    deploy: { label: 'Deploy a hosted agent — Microsoft Foundry', href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent' },
    mcp: { label: 'MCP servers in VS Code — GitHub Copilot', href: 'https://code.visualstudio.com/docs/copilot/chat/mcp-servers' },
    samples: { label: 'Microsoft Foundry Agent Samples', href: 'https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents' },
    workiq: { label: 'Work IQ overview — Microsoft Copilot Studio', href: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/' }
  };
  /* Full long-README artifacts stay in the handout. These are historical examples,
     not verified current SDK code or deployable configuration. */
  const ARTIFACT = {
    manifest: `<code>name: org-memory-agent<br>metadata:<br>  description: "GitHub Copilot agent with Foundry IQ organizational memory"<br><br>services:<br>  agent:<br>    host: azure.ai.agent<br>    project: my-foundry-project<br>    source: ./src<br>    environment: python<br>    model:<br>      name: gpt-4.1<br>      deployment: gpt-4.1-deployment<br>    endpoint: /api/agent<br>    env:<br>      - key: GITHUB_MCP_ENDPOINT<br>        value: \${GITHUB_MCP_ENDPOINT}<br>      - key: TOOLBOX_ENDPOINT<br>        value: \${TOOLBOX_ENDPOINT}<br><br>dependencies:<br>  - name: model<br>    host: azure.ai.model<br>    deployment: gpt-4.1-deployment<br>    location: eastus</code>`,
    setup: `<code>import os<br>from pathlib import Path<br>from azure.identity import DefaultAzureCredential<br>from azure.ai.projects import AIProjectClient<br><br>def provision_knowledge_base(project_endpoint, index_name, data_directory, kb_name="org-decisions-kb"):<br>    credential = DefaultAzureCredential()<br>    client = AIProjectClient(endpoint=project_endpoint, credential=credential)<br>    kb = client.knowledge_bases.create(<br>        name=kb_name,<br>        description="Architecture reviews, ADRs, and decision records",<br>        index_name=index_name,<br>        auto_refresh=True<br>    )<br>    for doc_path in Path(data_directory).glob("**/*"):<br>        if doc_path.suffix in {".md", ".pdf", ".docx", ".txt"}:<br>            with open(doc_path, "rb") as f:<br>                client.knowledge_bases.upload_document(kb.id, f, doc_path.name)<br>            print(f"Indexed: {doc_path.name}")<br>    toolbox = client.toolboxes.create(<br>        name=f"{kb_name}-toolbox",<br>        knowledge_base_id=kb.id,<br>        auth_type="managed_identity"<br>    )<br>    print(f"Knowledge base ready. MCP endpoint: {toolbox.url}")<br>    return toolbox.url</code>`,
    agent: `<code>import os<br>from azure.identity import DefaultAzureCredential<br>from azure.ai.projects import AIProjectClient<br>from azure.ai.projects.models import AgentRuntime, ToolDefinition, McpTool<br><br>def create_org_memory_agent(project_endpoint: str) -&gt; AgentRuntime:<br>    credential = DefaultAzureCredential()<br>    client = AIProjectClient(endpoint=project_endpoint, credential=credential)<br>    github_tool = McpTool(<br>        name="github",<br>        server_url=os.environ["GITHUB_MCP_ENDPOINT"],<br>        description="Query GitHub for code, PRs, issues, and commit history"<br>    )<br>    foundry_iq_tool = McpTool(<br>        name="org_memory",<br>        server_url=os.environ["TOOLBOX_ENDPOINT"],<br>        description="Query organizational records for architecture decisions, design rationale, and historical context"<br>    )<br>    agent = client.agents.create(<br>        name="org-memory-agent",<br>        model="gpt-4.1-deployment",<br>        instructions="""<br>Use github first for code, changes, and history.<br>Use org_memory when implementation context cannot answer why, constraints, or architecture choices.<br>Surface a potentially stale rationale and offer a tracking issue.<br>""",<br>        tools=[ToolDefinition(tool=github_tool), ToolDefinition(tool=foundry_iq_tool)]<br>    )<br>    return agent<br><br>def query_agent(agent_id: str, question: str, project_endpoint: str) -&gt; str:<br>    credential = DefaultAzureCredential()<br>    client = AIProjectClient(endpoint=project_endpoint, credential=credential)<br>    thread = client.agents.threads.create()<br>    client.agents.messages.create(thread_id=thread.id, role="user", content=question)<br>    run = client.agents.runs.create_and_process(thread_id=thread.id, agent_id=agent_id)<br>    messages = client.agents.messages.list(thread_id=thread.id)<br>    return messages[-1].content[0].text.value</code>`,
    router: `<code>What does this code do? → GitHub MCP<br>When did it change and who changed it? → GitHub MCP<br>Which PR introduced the behavior? → GitHub MCP<br>Which tests cover it? → GitHub MCP<br>Is there an open incident? → Operational MCP<br>Can I create a ticket? → Operational MCP, subject to permission<br>Why was this architecture chosen? → Foundry IQ MCP<br>Which alternatives were considered? → Foundry IQ MCP<br>Who approved this exception and why? → Foundry IQ MCP<br>Is this technical debt intentional? → Foundry IQ MCP</code>`
  };
  const slides = [
    S('title', 0, 'GitHub Copilot with Microsoft Foundry', {
      chrome: false, visual: 'memory-map',
      subtitle: 'Organizational Memory for Coding Agents',
      tagline: 'Add a governed organizational-memory tool when repository context cannot explain intent.',
      meta: 'CopilotTraining · Practitioner Tech Talk'
    }),
    S('core-question', 0, 'When does my Copilot agent need organizational memory?', {
      pill: 'Core question',
      subtitle: 'Add a provider when a consequential why-question needs evidence beyond the repository.',
      highlight: 'Trace the source, verify the current condition, keep the approval human.',
      routing: ['context', 'evidence', 'permission', 'approval'],
      routingLabel: 'Decide in order',
      roles: [
        { icon: '🔧', title: 'Platform engineer', description: 'Wire a provider without widening access by default.' },
        { icon: '🏗️', title: 'Architect', description: 'Recover rationale and check whether it still applies.' },
        { icon: '🧭', title: 'Service owner', description: 'Review evidence and approve any consequential change.' }
      ],
      stats: [
        { title: '3 context layers', description: 'Implementation, operational, organizational' },
        { title: '2 separate tools', description: 'GitHub evidence and Foundry IQ records' },
        { title: '1 human gate', description: 'A proposal is not an approval' }
      ]
    }),
    S('contents', 0, 'The path from code question to governed action', {
      sections: [
        { icon: '🧠', title: 'The Two Memories', subtitle: 'Find the gap', blurb: 'What repository context establishes and where intent lives.', slide: 4 },
        { icon: '🔌', title: 'Connecting Foundry IQ', subtitle: 'Wire the provider', blurb: 'Index, expose, identify, and authorize the tool.', slide: 9 },
        { icon: '🔎', title: 'Org Memory Pattern', subtitle: 'Recover intent', blurb: 'Compare evidence and keep current approval explicit.', slide: 16 },
        { icon: '🎯', title: 'Recognizing Intent Problems', subtitle: 'Choose the boundary', blurb: 'Test fit, exclude noise, and transfer the decision.', slide: 25 }
      ]
    }),
    S('part-1', 1, 'The Two Memories', {
      scene: 'opener',
      subtitle: 'See what repository history can prove and what a separate decision record can add.',
      cards: [
        { icon: '💻', title: 'Implementation', blurb: 'What exists and changed' },
        { icon: '🧠', title: 'Organizational', blurb: 'Why a decision was made' },
        { icon: '❓', title: 'The gap', blurb: 'Is the reason still valid?' }
      ],
      terminal: { context: 'bypassFraudChecks() → code history →', detail: 'intent remains open' }
    }),
    S('code-gap', 1, 'Code history can trace the change, not establish why it exists', {
      scene: 'code-gap',
      pill: 'Illustrative case · repository evidence',
      subtitle: 'The sample branch has a traceable PR and issue; its current justification is a separate question.'
    }),
    S('memory-layers', 1, 'Three context layers answer different questions', {
      scene: 'scorecard',
      pill: 'Context model',
      subtitle: 'Choose the provider by the evidence the task needs.',
      cards: [
        { icon: '💻', title: 'Implementation · GitHub', description: 'What exists? What changed? Which PR, issue, tests, and commits describe the code?' },
        { icon: '⚙️', title: 'Operational · service tools', description: 'What is happening now? Which incident, deployment, ticket, or system state matters?' },
        { icon: '🧠', title: 'Organizational · Foundry IQ', description: 'Why was a choice made? Which alternatives or constraints did the decision record capture?' }
      ]
    }),
    S('context-router', 1, 'Route the question to the authority that can answer it', {
      scene: 'signals',
      pill: 'Question-to-provider router',
      subtitle: 'The tool provides evidence in its domain; the model does not make that source authoritative.',
      rows: [
        { label: 'What does it do?', description: 'Inspect code, tests, and PRs', tag: 'GitHub MCP', z: 'local' },
        { label: 'What is live?', description: 'Check incidents and system state', tag: 'Operational MCP', z: 'remote' },
        { label: 'Why was this chosen?', description: 'Retrieve ADR, review, or decision record', tag: 'Foundry IQ', z: 'purple' },
        { label: 'May I change it?', description: 'Ask the authorized service owner', tag: 'Human approval', z: 'orange' }
      ]
    }),
    S('intent-boundary', 1, 'A historical rationale creates a check, not a current authorization', {
      scene: 'showdown',
      pill: 'Evidence boundary',
      subtitle: 'A dated decision can explain a choice; current system state and the accountable owner decide what follows.',
      leftLabel: 'Historical record says',
      rightLabel: 'Current review must establish',
      pairs: [
        { left: { label: 'Past constraint', note: 'Why the exception was accepted' }, right: { label: 'Present condition', note: 'Whether the constraint has changed', z: 'orange' } },
        { left: { label: 'Past approval', note: 'Who approved the original scope' }, right: { label: 'Current authority', note: 'Who owns the decision now', z: 'orange' } }
      ],
      outcomeLeft: { icon: 'i', label: 'Historical evidence' },
      outcomeRight: { icon: '✓', label: 'Human decides next action' }
    }),
    S('part-2', 2, 'Connecting Foundry IQ', {
      scene: 'opener',
      subtitle: 'Connect a curated knowledge source to a toolbox and govern its identity separately.',
      cards: [
        { icon: '📚', title: 'Select', blurb: 'Authoritative decisions' },
        { icon: '🔌', title: 'Expose', blurb: 'Knowledge tool endpoint' },
        { icon: '🛡️', title: 'Govern', blurb: 'Identity and permission' }
      ],
      terminal: { context: 'source → index → MCP toolbox →', detail: 'authorized request' }
    }),
    S('integration-map', 2, 'Each actor owns a different part of the context path', {
      scene: 'integration-map',
      pill: 'System boundary',
      subtitle: 'An MCP client requests tools; the supplied Foundry-hosted sample is a separate client implementation.'
    }),
    S('hosted-setup', 2, 'The hosted-agent quickstart scaffolds deployment, not task approval', {
      scene: 'terminal',
      pill: 'Setup orientation · documentation, not a live run',
      subtitle: 'Use first-party quickstarts to confirm current commands, prerequisites, and support.',
      termTitle: 'illustrative workflow',
      transcript: [
        { type: 'prompt', text: 'azd ai agent init -m <hosted-agent-sample> --deploy-mode code' },
        { type: 'response', lines: ['Select project, tenant, subscription, region, and model deployment.', 'Review the generated project and azure.yaml manifest.'] },
        { type: 'divider' },
        { type: 'prompt', text: 'azd up' },
        { type: 'response', lines: ['Provision and deploy only in an authorized environment.', 'Deployment identity and resource grants need owner review.'] },
        { type: 'outcome', text: 'No cloud provisioning is performed in this talk.' }
      ],
      footnote: 'Illustrative command path from the existing README; verify it against the linked docs.'
    }),
    S('deployment-manifest', 2, 'The manifest connects a host, project, model, and runtime endpoint', {
      scene: 'deployment-manifest',
      pill: 'Artifact · azure.yaml',
      subtitle: 'The example is a configuration sketch, not a validated deployment manifest.'
    }),
    S('provision-kb', 2, 'Knowledge-base setup selects, indexes, exposes, and checks source material', {
      scene: 'four-phases',
      pill: 'Artifact · setup-foundry-iq.py',
      subtitle: 'The README example describes a flow; verify SDK methods and permission grants with the current quickstart.',
      stageLabel: 'Step',
      gateLabel: '✓ inspect',
      stages: [
        { label: '1', name: 'Select', icon: '📄', description: 'Choose approved decision records and a data owner.' },
        { label: '2', name: 'Index', icon: '🗂️', description: 'Create a knowledge base and ingest scoped documents.' },
        { label: '3', name: 'Expose', icon: '🔌', description: 'Register a toolbox and capture its endpoint.' },
        { label: '4', name: 'Verify', icon: '🔎', description: 'Test retrieval, citations, access, and freshness.', target: true }
      ]
    }),
    S('source-quality', 2, 'Index decision evidence with an owner, scope, and maintenance path', {
      scene: 'scorecard',
      pill: 'Source curation',
      subtitle: 'Coverage is useful only when the material is authoritative and safe for the intended caller.',
      cards: [
        { icon: '📋', title: 'ADRs and RFCs', description: 'Why an option won, which alternatives were rejected, and who owns review.' },
        { icon: '🔥', title: 'Postmortems', description: 'The system conditions and response decisions behind a lasting constraint.' },
        { icon: '🏛️', title: 'Architecture reviews', description: 'Decision scope, approval, assumptions, and revisit date.' },
        { icon: '🎓', title: 'Onboarding guides', description: 'Stable context people need repeatedly; link back to its maintained owner.' }
      ]
    }),
    S('identity-boundary', 2, 'Identity, permission, and approval are separate controls', {
      scene: 'identity-boundary',
      pill: 'Authority boundary',
      subtitle: 'Managed identity identifies a workload; an owner grants access; a human approves consequential changes.'
    }),
    S('part-3', 3, 'The Organizational Memory Pattern', {
      scene: 'opener',
      subtitle: 'Combine repository trace and dated decision evidence, then check whether the reason still holds.',
      cards: [
        { icon: '💻', title: 'Trace', blurb: 'Locate the code change' },
        { icon: '📄', title: 'Retrieve', blurb: 'Find the decision record' },
        { icon: '🧭', title: 'Validate', blurb: 'Ask the current owner' }
      ],
      terminal: { context: 'same question + two sources →', detail: 'reviewable proposal' }
    }),
    S('illustrative-review', 3, 'The sample review explains the exception and records its review condition', {
      scene: 'illustrative-review',
      pill: 'Illustrative source excerpt · not observed retrieval',
      subtitle: 'The dates and business facts belong to the supplied teaching scenario; verify them in a real system.'
    }),
    S('answer-without', 3, 'Repository-only evidence traces the sample change but leaves its rationale unknown', {
      scene: 'terminal',
      pill: 'Same query · repository only',
      subtitle: 'This is a composed teaching example, not a measured model response.',
      termTitle: 'illustrative response',
      transcript: [
        { type: 'user', text: 'Why does this code bypass fraud checks? Is the exception still valid?' },
        { type: 'thinking', label: 'Copilot requests GitHub MCP' },
        { type: 'response', lines: ['Sample trace: PR #413 and issue #9021.', 'The code history explains when it changed, not the original rationale.'] },
        { type: 'outcome', text: 'Need an authoritative decision source before judging intent.' }
      ]
    }),
    S('answer-with-foundry', 3, 'A permitted Foundry IQ request can add a cited historical reason to the answer', {
      scene: 'terminal',
      pill: 'Same query · two providers',
      subtitle: 'Retrieval adds historical evidence; a current check still decides whether the rationale applies.',
      termTitle: 'illustrative response',
      transcript: [
        { type: 'user', text: 'Why does this code bypass fraud checks? Is the exception still valid?' },
        { type: 'thinking', label: 'Copilot requests GitHub MCP, then Foundry IQ' },
        { type: 'response', lines: ['Scenario record: March 2023 review cites checkout latency.', 'It describes a temporary exception pending a migration review.', 'The supplied scenario states Q4 2023 migration completion; verify current state and source citation.'] },
        { type: 'outcome', text: 'Propose an owner-reviewed validation issue; do not change the code.' }
      ]
    }),
    S('agent-tools', 3, 'Named tools keep implementation and organizational sources distinct', {
      scene: 'agent-tools',
      pill: 'Artifact · combined-context-agent.py',
      subtitle: 'The README code creates a Foundry-hosted agent; it does not demonstrate a GitHub Copilot extension binding.'
    }),
    S('instruction-policy', 3, 'Model instructions route a request; service policy and human approval still govern action', {
      scene: 'showdown',
      pill: 'Three controls · three owners',
      subtitle: 'Text in a prompt cannot grant service access or approve a production change.',
      leftLabel: 'Different control',
      rightLabel: 'What it establishes',
      pairs: [
        { left: { label: 'Model instruction', note: 'When to request a tool' }, right: { label: 'Tool request', note: 'A proposed invocation by the model', z: 'purple' } },
        { left: { label: 'Service permission', note: 'Identity and granted scope' }, right: { label: 'Access decision', note: 'Whether the server permits the call', z: 'remote' } },
        { left: { label: 'Human approval', note: 'Authority over code or business action' }, right: { label: 'Reviewed change', note: 'Owner accepts, rejects, or escalates', z: 'orange' } }
      ],
      outcomeLeft: { icon: '≠', label: 'Tool availability' },
      outcomeRight: { icon: '✓', label: 'Approval remains explicit' }
    }),
    S('reasoning-loop', 3, 'The agent checks evidence and currency before it proposes a human decision', {
      scene: 'reasoning-loop',
      pill: 'Six-step reasoning loop',
      subtitle: 'Each step has an actor and an observable result; the final step stops at a proposal.'
    }),
    S('freshness-evidence', 3, 'A citation and a current-state check are both needed to evaluate old rationale', {
      scene: 'freshness-evidence',
      pill: 'Verification boundary',
      subtitle: 'A retrieval score or a plausible answer is not proof that the underlying decision remains in force.'
    }),
    S('permission-vs-approval', 3, 'Permission to call a tool does not authorize a code or policy change', {
      scene: 'showdown',
      pill: 'Action boundary',
      subtitle: 'The service owner retains the change decision even when the model and service can execute a tool call.',
      leftLabel: 'Tool access permits',
      rightLabel: 'A human owner decides',
      pairs: [
        { left: { label: 'Read approved records', note: 'Within the granted knowledge scope' }, right: { label: 'Whether evidence is sufficient', note: 'Check source, date, and scope', z: 'orange' } },
        { left: { label: 'Draft a validation issue', note: 'If issue creation is permitted' }, right: { label: 'Whether to file or assign it', note: 'Follow local workflow authority', z: 'orange' } },
        { left: { label: 'Propose a code change', note: 'A suggestion or draft artifact' }, right: { label: 'Whether the change ships', note: 'Owner review, tests, and policy', z: 'orange' } }
      ],
      outcomeLeft: { icon: '→', label: 'Agent may propose' },
      outcomeRight: { icon: '✓', label: 'Owner approves or declines' }
    }),
    S('part-4', 4, 'Recognizing Intent Problems', {
      scene: 'opener',
      subtitle: 'Pair intent signals with exclusions before adding another provider.',
      cards: [
        { icon: '🔍', title: 'Signals', blurb: 'A real why-question' },
        { icon: '🧹', title: 'Exclusions', blurb: 'No source, no index' },
        { icon: '📏', title: 'Local test', blurb: 'Measure before scaling' }
      ],
      terminal: { context: 'intent signal → source check →', detail: 'local decision' }
    }),
    S('signal-phrases', 4, 'Repeated why-questions and unexplained constraints point to an intent gap', {
      scene: 'signals',
      pill: 'Diagnostic signals',
      subtitle: 'A phrase is a prompt to inspect the workflow, not evidence that Foundry will solve it.',
      rows: [
        { label: '“Why does this exist?”', description: 'Current team cannot locate the rationale', tag: 'Find ADR / review', z: 'purple' },
        { label: '“Afraid to touch it”', description: 'Unknown constraints shape change risk', tag: 'Trace + validate', z: 'orange' },
        { label: '“Migration surprises”', description: 'Past tradeoffs may be missing', tag: 'Check postmortems', z: 'remote' },
        { label: '“What was rejected?”', description: 'A choice needs alternatives and context', tag: 'Find RFC', z: 'local' }
      ]
    }),
    S('what-not-to-index', 4, 'Do not add an organizational tool when the source or question is missing', {
      scene: 'scorecard',
      pill: 'Counter-diagnostic',
      subtitle: 'Keep ordinary implementation questions in repository context and source gaps visible.',
      cards: [
        { icon: '💻', title: 'Code-only task', description: 'Generation, test, review, and refactoring questions can stay with repository context.' },
        { icon: '🚫', title: 'No authoritative record', description: 'Capture decisions going forward; an index cannot retrieve information nobody recorded.' },
        { icon: '🧹', title: 'Uncurated corpus', description: 'Broad, stale, sensitive, or ownerless records need curation before access.' },
        { icon: '🌱', title: 'Low decision stakes', description: 'A small prototype may validate the retrieval question before a hosted service is warranted.' }
      ]
    }),
    S('decision-tree', 4, 'Add Foundry only when a consequential why-question has an approved source', {
      scene: 'decision-tree',
      pill: 'Fit decision',
      subtitle: 'A “no” at any gate returns the task to its existing context path or to source capture.'
    }),
    S('estimate-filter', 4, 'Treat the 5–10% figure as a planning heuristic until a local sample says otherwise', {
      scene: 'estimate-filter',
      pill: 'Estimate · not measured',
      subtitle: 'The original README supplies this rule of thumb; this conversion has no usage telemetry to validate it.'
    }),
    S('use-cases', 4, 'Four candidate workflows need source owners and human review before a pilot', {
      scene: 'scorecard',
      pill: 'Illustrative candidate workflows',
      subtitle: 'These are examples from the source README, not observed deployments or verified outcomes.',
      cards: [
        { icon: '🧭', title: 'Legacy migration', description: 'Map special cases to ADRs and postmortems; owners validate each historical constraint.' },
        { icon: '🎓', title: 'Engineering onboarding', description: 'Retrieve maintained architecture rationale; new engineers confirm citations with service owners.' },
        { icon: '🧰', title: 'Debt evaluation', description: 'Surface relevant compliance or vendor records; never label a change safe from retrieval alone.' },
        { icon: '🔎', title: 'Code review', description: 'Flag a possible historical constraint for reviewer attention; the reviewer checks current policy.' }
      ]
    }),
    S('implementation-artifacts', 4, 'A bounded pilot can test the pattern without granting autonomous change authority', {
      scene: 'implementation-artifacts',
      pill: 'Transfer bundle',
      subtitle: 'Use the supplied artifacts as starting points and verify evolving SDK details against first-party docs.'
    }),
    S('before-after', 0, 'Foundry adds a rationale source; current verification and change approval remain human work', {
      header: 'Repository evidence alone vs. combined evidence plus review',
      before: [
        'Trace sample code to PR #413 and issue #9021',
        'Report what changed and when',
        'State that the original intent is not established',
        'Ask for an authoritative decision source'
      ],
      after: [
        'Keep the repository trace and its limits',
        'Retrieve a cited organizational decision record',
        'Check the record date against current service state',
        'Offer a validation issue for owner review'
      ],
      metrics: [
        { value: '2 sources', detail: 'code + decision records' },
        { value: '6 checks', detail: 'trace to proposal' },
        { value: '1 owner', detail: 'approves a change' }
      ]
    }),
    S('today', 0, 'Start with one real question and measure whether retrieved intent changes the decision', {
      horizons: [
        { icon: '🧭', label: 'Today', z: 'green', items: ['Pick a why-question from real work.', 'Locate the source and owner.', 'Write down what counts as useful evidence.'] },
        { icon: '🧪', label: 'This week', z: 'local', items: ['Compare repository-only and combined answers.', 'Check citations, dates, and access scope.', 'Record misses and false matches.'] },
        { icon: '📏', label: 'This month', z: 'purple', items: ['Review a bounded pilot with the service owner.', 'Measure local task frequency and review effort.', 'Expand only when evidence and governance fit.'] }
      ],
      takeaway: 'The first win is a better evidence-backed decision, not a larger tool catalog.'
    }),
    S('references', 0, 'First-party references for setup, retrieval, and protocol details', {
      scene: 'references',
      groups: [
        { icon: '📖', title: 'Microsoft Foundry', z: 'local', items: [
          { href: SRC.host.href, label: SRC.host.label, description: 'Hosted-agent setup and deployment workflow.' },
          { href: SRC.iq.href, label: SRC.iq.label, description: 'Knowledge base and toolbox quickstart.' },
          { href: SRC.connect.href, label: SRC.connect.label, description: 'Connect a knowledge base as an agent tool.' },
          { href: SRC.deploy.href, label: SRC.deploy.label, description: 'Hosted-agent deployment details.' }
        ] },
        { icon: '🔧', title: 'Protocol and samples', z: 'purple', items: [
          { href: SRC.mcp.href, label: SRC.mcp.label, description: 'Copilot MCP tool configuration and use.' },
          { href: SRC.samples.href, label: SRC.samples.label, description: 'Official hosted-agent sample baseline.' },
          { href: SRC.workiq.href, label: SRC.workiq.label, description: 'Related first-party Work IQ overview; not evidence for the sample metrics.' }
        ] }
      ]
    }),
    S('thanks', 0, 'GitHub Copilot with Microsoft Foundry', {
      subtitle: 'Organizational Memory for Coding Agents',
      cards: [
        { value: 'Trace', detail: 'What changed in the repository?' },
        { value: 'Retrieve', detail: 'What documented rationale exists?' },
        { value: 'Verify', detail: 'Who decides whether it still applies?' }
      ],
      prompt: 'Which real why-question will you test in your own workflow?'
    })
  ];

  const NOTES = {
    title: { seconds: 20, notes: ['"We can give an agent access to the code and to the documented reasons behind it."', 'Point out the separate provider paths; they keep source ownership visible.'], know: ['This is a practitioner talk about one context decision, not a current-news briefing or a live cloud deployment.'] },
    'core-question': { seconds: 40, notes: ['"The question is when organizational context changes a decision enough to justify another provider."', '"We will keep source evidence, permission, and human approval separate."'], know: ['The audience in the source README is principal engineers, platform architects, and GitHub solution engineers. No named attendee persona is required.'], sources: [SRC.host, SRC.iq] },
    contents: { seconds: 30, notes: ['"We will find the gap, wire the provider, inspect the combined answer, and decide where the pattern fits."', 'The four cards link to the part openers.'] },
    'part-1': { seconds: 25, notes: ['"Start with a code path that is easy to trace and harder to explain."', '→ The sample makes that difference visible.'], sources: [SRC.mcp, SRC.iq] },
    'code-gap': { seconds: 100, notes: ['"The repository can show the change, its pull request, and the linked issue."', '"Those facts do not prove why the exception was accepted or whether the reason still applies."'], know: ['The snippet `if (customer.IsPremium) { bypassFraudChecks(); }`, PR #413, and issue #9021 are the supplied README’s illustrative teaching case, not verified production data.', 'The original README includes a named author. It is omitted here because the case is illustrative; do not replace it with an invented real-world identity.'], sources: [SRC.mcp], cue: ['Point first to the code, then to the PR and issue trace, then to the unanswered intent question. State explicitly that no live repository or agent run produced this output.'] },
    'memory-layers': { seconds: 100, notes: ['"Implementation context explains what changed; operational context explains what is happening now."', '"Organizational context can explain why a decision was made, when a source exists."', '"The provider supplies evidence in its domain. The person still judges its relevance."'], know: ['The three-layer model and examples come from the long README: GitHub MCP for repository history, operational MCPs such as Jira or ServiceNow, and Foundry IQ for decision records. Provider availability and feature specifics vary by deployment.'], sources: [SRC.mcp, SRC.iq] },
    'context-router': { seconds: 70, notes: ['"Ask which source owns the question before adding a tool."', 'The final row is different: permission to retrieve evidence does not tell us who may approve a code change.'], know: ['The table adapts the README context-layer reference. “Operational MCP” is a category, not a claim that a particular connector is configured.', 'Full quick reference from the original artifact: ' + ARTIFACT.router], sources: [SRC.mcp, SRC.connect] },
    'intent-boundary': { seconds: 70, notes: ['"A decision record can explain the original choice."', '"Its date and review condition tell us what to verify next; they do not grant present authority."'], know: ['A historical decision is evidence about its period and scope. Check current system state, policy, source ownership, and the current decision-maker.'], sources: [SRC.iq, SRC.connect] },
    'part-2': { seconds: 25, notes: ['"The connection has three parts: choose the records, expose them as a tool, and govern who can query them."', '→ Keep those responsibilities separate as the request crosses services.'], sources: [SRC.host, SRC.iq] },
    'integration-map': { seconds: 95, notes: ['"Copilot requests a tool; the GitHub service and Foundry runtime each answer from their own sources."', '"The runtime and identity provider enforce configured access. The human owner defines what access is appropriate."'], know: ['Model/client: forms a tool request. MCP server or toolbox: exposes tools and enforces its configured access. Foundry service: performs the supported retrieval flow. Identity system: authenticates the workload. Resource owner: grants scope. Human reviewer: approves a consequential change.', 'The original README describes managed identity and Entra ID; verify exact identity mechanics and supported endpoints in the current Foundry quickstart.'], sources: [SRC.iq, SRC.connect, SRC.mcp] },
    'hosted-setup': { seconds: 75, notes: ['"The quickstart is the correct place to confirm the current scaffold and deployment commands."', '"A deployment command provisions resources; it does not decide which coding task deserves organizational access."'], know: ['The commands and the hosted-agent sample URL are paraphrased from the README and source quickstart. The placeholder in the terminal is not a literal command argument.', 'The source README includes `winget`, extension install, Python packages, `az login`, and `azd auth login`; the full prerequisites change over time, so use the linked quickstart rather than relying on this snapshot. No command was run and no resources were provisioned.'], sources: [SRC.host, SRC.samples], cue: ['Do not launch a terminal or cloud environment. Walk the prepared command sequence and point to the official quickstart for current prerequisites.'] },
    'deployment-manifest': { seconds: 90, notes: ['"The manifest records the host, project, source, environment, model deployment, endpoint, and tool endpoint variables."', '"Treat this as a map of responsibilities, then validate the exact schema in the current sample."'], know: ['The source README’s example includes `name: org-memory-agent`, service host `azure.ai.agent`, project, `source: ./src`, Python environment, `gpt-4.1` model and deployment, endpoint `/api/agent`, `GITHUB_MCP_ENDPOINT`, `TOOLBOX_ENDPOINT`, and an `azure.ai.model` dependency in `eastus`.', 'These are sample values, not a recommended or verified deployment. Model names, deployment identifiers, schema, regions, and env handling need confirmation against the current Foundry docs and tenant policy.', 'Full azure.yaml example from the original artifact; illustrative and unvalidated: ' + ARTIFACT.manifest], sources: [SRC.host, SRC.deploy, SRC.samples], cue: ['Read each group as an example: service host and project, model deployment, runtime endpoint, then environment inputs. Do not copy the sample as a deployment recipe without validation.'] },
    'provision-kb': { seconds: 90, notes: ['"The sample provisioning flow creates a knowledge base, uploads selected files, registers a toolbox, and returns its endpoint."', '"The visible sequence is a conceptual summary of the README script, not a claim that this exact API ran."'], know: ['The README’s `setup-foundry-iq.py` imports `DefaultAzureCredential`, `AIProjectClient`, and `Path`; accepts project endpoint, index name, directory, and optional knowledge-base name; calls `knowledge_bases.create` with description, index and `auto_refresh=True`; uploads `.md`, `.pdf`, `.docx`, and `.txt`; creates a toolbox with `auth_type="managed_identity"`; and prints the endpoint for `TOOLBOX_ENDPOINT`.', 'The method names, API versions, auto-refresh semantics, accepted file types, required roles, and managed-identity behavior are not independently validated here. The quickstart is authoritative.', 'Full logic sketch from the original setup-foundry-iq.py artifact; verify API calls before use: ' + ARTIFACT.setup], sources: [SRC.iq, SRC.connect], cue: ['Trace select → index → expose → verify. Pause at verify: inspect citations, source freshness, authorization, and error behavior before allowing a real caller.'] },
    'source-quality': { seconds: 75, notes: ['"Start with records that explain a decision and have an owner."', '"A recording or document is not automatically suitable just because it is searchable."'], know: ['The README names ADRs, architecture reviews, RFCs, postmortems, and onboarding guides. Its sample paths such as `ADR-042` and `RFC-2023-fraud-platform` are illustrative, not repository artifacts in this talk.', 'Preserve the canonical record with its accountable owner. Treat an index as a retrieval surface, retain a path back to the source, and define ownership for updates and deletions rather than allowing a stale duplicate to become the authority.', 'For a real index, decide source ownership, access control, retention, update and deletion behavior, sensitive-data handling, citation requirements, and a review cadence.'], sources: [SRC.iq, SRC.connect] },
    'identity-boundary': { seconds: 90, notes: ['"An identity says which workload is calling; a permission grant says what it may access."', '"The agent may request a tool, but an owner grants the access and a person approves the change."'], know: ['The previous README compresses these as “managed identity” and RBAC. Exact principal creation, role assignment, token flow, scope, and service-side enforcement depend on the Foundry deployment and tenant configuration. Verify with current deployment and connection documentation.', 'Authorization is not automatic merely because a workload has an identity. Tool-level permission also does not grant human decision authority.'], sources: [SRC.deploy, SRC.connect, SRC.iq] },
    'part-3': { seconds: 25, notes: ['"Now we run the same question through the two evidence paths."', '→ The source excerpt is deliberately labeled as a teaching scenario.'], sources: [SRC.mcp, SRC.iq] },
    'illustrative-review': { seconds: 100, notes: ['"This sample review says the fraud service caused checkout delay, a temporary bypass was approved, and the decision was due for review after migration."', '"It gives us a reason to investigate; it does not tell us what a real service is doing today."'], know: ['The March 2023 date, 30-second latency, premium-customer impact, legal approval, and Q4 2023 migration statement are supplied as a hypothetical case in the source README. They have not been independently observed or verified.', 'A retrieved record must preserve its source title, date, owner, scope, and citations. Do not treat the sample excerpt as a live system record.'], sources: [SRC.iq], cue: ['Read the date and the review condition aloud. Point out “illustrative” before discussing the hypothetical migration outcome.'] },
    'answer-without': { seconds: 70, notes: ['"With repository context alone, the agent can report the sample PR and issue."', '"It can also say what it cannot establish: why the exception was made."'], know: ['PR #413 and issue #9021 are fictionalized/example identifiers carried from the supplied README. This transcript is authored for the talk; it was not generated by Copilot and is not observed output.'], sources: [SRC.mcp], cue: ['Ask the audience what evidence the code history supports. Keep the answer to traceability; do not infer author intent.'] },
    'answer-with-foundry': { seconds: 70, notes: ['"The second provider can retrieve the sample decision excerpt and its stated condition."', '"The agent can propose a validation issue. It cannot infer that the old constraint is gone without current evidence."'], know: ['The sample Q4 2023 migration completion claim is part of the illustrative case only. A real workflow must verify current service state and the source’s authority, and ask the current owner whether the exception remains approved.', 'The sample response is composed for this presentation, not an observed Foundry IQ or model response.'], sources: [SRC.iq, SRC.connect], cue: ['Compare only the added evidence. Mark the migration statement as a scenario assumption and the current check as not yet performed.'] },
    'agent-tools': { seconds: 100, notes: ['"The sample client registers two tool definitions with different jobs."', '"GitHub supplies implementation evidence; the organizational tool supplies decision records."', '"Instructions guide routing, while endpoint access still depends on service configuration."'], know: ['The README’s combined-context-agent.py imports `DefaultAzureCredential`, `AIProjectClient`, `AgentRuntime`, `ToolDefinition`, and `McpTool`; reads `GITHUB_MCP_ENDPOINT` and `TOOLBOX_ENDPOINT`; names tools `github` and `org_memory`; and gives instructions to call GitHub for code-level questions and Foundry IQ when intent is missing.', 'The source instruction text: call `github` first for what exists and changed; call `org_memory` when implementation context cannot answer design intent, historical constraints, or architecture choices; surface a potentially stale rationale and offer a tracking issue. Issue creation is a proposal unless the caller has explicit write permission and the organization’s workflow authorizes it.', 'It then creates an agent with model `gpt-4.1-deployment`; a query example creates a thread, posts a question, calls `create_and_process`, lists messages, and returns the last text. All API signatures and model identifiers are unverified snapshots; use the official sample for current code.', 'Full two-tool source sketch from the original combined-context-agent.py artifact; verify SDK methods and identifiers before use: ' + ARTIFACT.agent], sources: [SRC.iq, SRC.mcp, SRC.samples], cue: ['Read the two tool names and endpoints; describe each provider’s evidence domain. Avoid presenting a runnable SDK recipe.'] },
    'instruction-policy': { seconds: 90, notes: ['"The model instruction can say when to request a tool."', '"The service decides whether the authenticated identity has access."', '"A service owner decides whether evidence supports a change."'], know: ['Tool schemas and model instructions influence invocation but do not grant server-side authorization. Service permission is configured independently. Human approval may be encoded in branch rules, issue workflow, operational policy, or review practice; the exact mechanism belongs to the organization.'], sources: [SRC.connect, SRC.deploy, SRC.mcp] },
    'reasoning-loop': { seconds: 90, notes: ['"The loop begins by tracing the code, then recognizing the missing why."', '"It retrieves and synthesizes a record, checks whether its condition still holds, and ends with a proposal."', '"The proposal is where a human owner takes over."'], know: ['The source README’s six steps: call GitHub; recognize incomplete context; call `org_memory`; synthesize; evaluate the migration claim’s currency; propose a validation issue. The conversion adds explicit evidence and approval gates. The six steps are a conceptual workflow, not measured system behavior.'], sources: [SRC.mcp, SRC.iq, SRC.connect] },
    'freshness-evidence': { seconds: 90, notes: ['"A citation lets us inspect what the model relied on."', '"A current-state check tells us whether the old rationale still fits."', '"If either is missing, the safe result is a question for the owner, not a code edit."'], know: ['Useful evidence fields include canonical source, revision or last-updated date, decision owner, affected system and scope, assumptions, review trigger, retrieval citation, current-state evidence, and reviewer identity.', 'A retrieved passage can be stale, incomplete, out of scope, or contradicted by later decisions. A retrieval relevance score does not establish truth or freshness.'], sources: [SRC.iq, SRC.connect] },
    'permission-vs-approval': { seconds: 90, notes: ['"A read permission can authorize retrieval within a defined scope."', '"An issue-creation permission may authorize a draft or ticket, depending on local policy."', '"Neither permission decides whether a code change ships."'], know: ['The tool request, server permission, and human approval are separate controls. For production workflows, define allowed tools and scopes, distinguish read and write operations, log decisions, and retain required review gates. Escalate legal, security, compliance, or business decisions to their designated owners.'], sources: [SRC.connect, SRC.deploy] },
    'part-4': { seconds: 25, notes: ['"Now we decide where this pattern fits and where it does not."', '→ Start with the signal, then look for an authoritative source.'], sources: [SRC.iq] },
    'signal-phrases': { seconds: 100, notes: ['"Repeated why-questions are useful signals when they point to missing decision records."', '"They are not proof that adding a retrieval service will help."', 'Ask who owns the record and how the team will verify its answer.'], know: ['Signal phrases are adapted from the README: “nobody remembers,” “afraid to touch this,” “migration keeps hitting surprises,” and questions about alternatives. The team must validate that the source exists, is accessible, and changes an actual decision.'], sources: [SRC.iq] },
    'what-not-to-index': { seconds: 90, notes: ['"A code-only task can remain with repository context."', '"When no authoritative rationale exists, capture a decision going forward."', '"Curate before indexing: broad access to stale or sensitive records is not a quality strategy."'], know: ['The source README excludes pure code generation/review/refactoring, absent organizational memory, and early-stage teams without a decision history. Also assess record sensitivity, licensing, retention, relevance, update ownership, and retrieval false positives.'], sources: [SRC.iq, SRC.mcp] },
    'decision-tree': { seconds: 100, notes: ['"First ask whether the task has a consequential why-question."', '"Then ask whether a trustworthy record exists and whether the intended identity may read it."', '"If any answer is no, stay with current context or capture the missing decision; do not add a provider by default."'], know: ['The decision gates distill the README decision tree and add explicit evidence and authority boundaries. Foundry Agent Service hosting is a separate decision from using a local or other approved prototype; verify product support before selecting a deployment path.'], sources: [SRC.host, SRC.iq, SRC.connect] },
    'estimate-filter': { seconds: 90, notes: ['"The original talk uses five to ten percent as a filter, not as measured telemetry."', '"Count your own task sample before using that ratio to size an index or justify a platform."'], know: ['The original README states that 5–10% of coding-agent work benefits from organizational context and that 90–95% can stay with GitHub/operational context. No source, sample, method, or observed repository data is supplied to validate those figures. They remain unmeasured planning heuristics, not universal rates.', 'The README’s qualitative value factors are system age and team turnover, architecture complexity, availability of decision records, team continuity, and the stakes of misunderstanding. Use them as interview prompts, not as a validated scoring model.', 'The README suggests 40%+ relevance improvement for agentic retrieval, citing a secondary article. This conversion omits it because no first-party evaluation details or comparable benchmark were supplied; it is not an observed result for this talk.', 'A local baseline can label tasks by question type, provider used, whether retrieved evidence changed the next decision, false positives, reviewer effort, and unresolved cases. Define a sample window and owner before comparison.'], sources: [] },
    'use-cases': { seconds: 90, notes: ['"The README offers four candidate workflows: migration, onboarding, debt review, and compliance-aware review."', '"Treat each as a hypothesis. Require an authoritative source and an accountable reviewer before a pilot."'], know: ['All four are hypothetical use cases from the source README; their stated outcomes are not measured. In particular, do not claim that retrieval makes a refactor safe, establishes compliance, or improves onboarding time without separate validation.', 'The migration example inventories exception branches and compares them with architecture reviews, postmortems, and ADRs. The onboarding example asks about a service-boundary or synchronous-call rationale and retrieves an RFC. The debt example cross-references compliance decisions or vendor terms. The review example surfaces an old regulatory constraint for a current reviewer. These are scenario sketches, not customer stories.', 'The original README used time-to-productivity, days-versus-hours, and a vendor term through 2027 as illustrative outcomes; none is measured or verified. Do not repeat them as results or current facts.'], sources: [SRC.iq, SRC.mcp] },
    'implementation-artifacts': { seconds: 75, notes: ['"The reusable artifacts are a deployment manifest, a knowledge-base setup sketch, a two-tool agent configuration, and a context-layer reference."', '"Make the first pilot read-only or proposal-only until access, evidence, and approval are validated."'], know: ['The original README names `azure.yaml`, `setup-foundry-iq.py`, `combined-context-agent.py`, and `context-layer-reference.md`. The latter was shown as a markdown excerpt, not delivered as a separate file. This native conversion keeps the content in the notes rather than inventing downloadable artifacts.', 'The setup and SDK samples are preserved as descriptions and fields rather than certified runnable code. Exact SDK calls may have changed since README updated 2026-07-24.'], sources: [SRC.host, SRC.iq, SRC.samples] },
    'before-after': { seconds: 60, notes: ['"The gain is a second evidence source and a clearer next check."', '"The human still verifies the current condition and approves any consequential change."'], know: ['The three metric cards count elements of the teaching pattern—two sources, six conceptual checks, and one accountable human decision. They are structural counts, not performance or adoption metrics.'], sources: [SRC.iq, SRC.mcp] },
    today: { seconds: 90, notes: ['"Today, find one real why-question and its authoritative source."', '"This week, compare the evidence and record both misses and false matches."', '"This month, review a bounded pilot with its owner and use local task data to decide whether it earns expansion."'], know: ['The durations and work horizons are planning prompts, not guarantees. Success criteria depend on the team’s workflow and risk. Useful measures include source coverage, citation correctness, freshness, false matches, decision changes, reviewer effort, and access exceptions.', 'The long README proposed a 15-minute step to read both quickstarts, map the three context layers, and identify one signal; a one-hour step to initialize a sample and identify a source; and a two-to-four-hour step to provision a small collection, wire both tools, and test a real why-question. Those are suggested planning blocks, not tested completion times or evidence that a deployment exists.'], sources: [SRC.host, SRC.iq] },
    references: { seconds: 30, notes: ['"These first-party links are where to verify evolving setup and protocol details."', 'The examples and sample percentages in this deck are not substantiated by these links.'], know: ['The README’s reference dates remain 2026-07-24; links and API details were not reverified on the conversion date. No product-news refresh was performed.', 'The original README also included a Work IQ, Fabric IQ, Web IQ source-diversity claim. This conversion does not repeat it because no first-party evidence for that particular architecture claim was supplied.', 'Observed evidence for this conversion is limited to the local native validator, which reported 35 rendered slides, no pending scenes, and a 35-page PDF. That validates the deck artifact, not any Azure deployment, SDK call, Foundry retrieval, model answer, or measured product outcome.'], sources: [SRC.host, SRC.iq, SRC.connect, SRC.deploy, SRC.mcp, SRC.samples, SRC.workiq] },
    thanks: { seconds: 30, notes: ['"Trace what changed, retrieve what was decided, and verify who owns the next decision."', '"Which real why-question will you test in your own workflow?" Take one answer from the room.'], sources: [SRC.mcp, SRC.iq] }
  };
  NOTES['integration-map'].notes = [
    '"An MCP-capable client can request tools; GitHub and Foundry providers return evidence from their own sources."',
    '"Keep the model, client, tool servers, data providers, workload identity, and human reviewer distinct."'
  ];
  NOTES['integration-map'].know.push('The supplied combined-context-agent.py uses `AIProjectClient` to create a Foundry-hosted agent. It is not a demonstrated GitHub Copilot extension binding or a verified direct integration between the GitHub Copilot product and that hosted agent. A separate MCP-capable client configuration or explicit adapter is required for the chosen Copilot surface.');
  NOTES['integration-map'].know.push('Model: produces a proposed tool call. Client or host: mediates the protocol request. MCP server/toolbox: exposes a tool and applies configured access. GitHub MCP and Foundry IQ: distinct data/tool providers. Foundry Agent Service sample: a separate hosted agent runtime. Identity system: authenticates the workload. Resource owner: grants access. Human reviewer: approves consequential change.');
  NOTES['agent-tools'].notes = [
    '"The supplied Foundry-hosted agent registers two tool definitions with different jobs."',
    '"A GitHub Copilot client needs its own MCP configuration or adapter; this code alone does not establish that binding."',
    '"Instructions guide routing, while endpoint access still depends on service configuration."'
  ];
  NOTES['agent-tools'].know.push('This example creates a Foundry-hosted agent with model `gpt-4.1-deployment`; it is not a GitHub Copilot extension example. The exact client/adapter relationship must be built and verified for the selected Copilot surface.');
  NOTES['deployment-manifest'].know.push('The model name and deployment identify the model side; GitHub MCP and Foundry IQ are tool/data providers. These providers are not interchangeable with the client or the model endpoint.');
  NOTES['answer-with-foundry'].know.push('The pictured client path is an illustrative MCP-capable client scenario. The supplied Foundry `AIProjectClient` sample is a separate hosted-agent implementation and does not by itself prove a direct GitHub Copilot product integration.');
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'copilot-with-foundry',
      title: 'GitHub Copilot with Microsoft Foundry: Organizational Memory for Coding Agents',
      short: 'Copilot with Foundry',
      category: 'tech-talks',
      source: 'tech-talks/copilot-with-foundry/README.md',
      question: 'When does my Copilot agent need organizational memory?',
      thesis: 'Add an organizational-memory provider only when a consequential why-question needs evidence beyond the repository; keep permission, verification, and human approval distinct.'
    },
    slides
  };
})();
