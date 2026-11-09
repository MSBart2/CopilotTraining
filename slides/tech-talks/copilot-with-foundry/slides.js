/*
  GitHub Copilot with Microsoft Foundry — teaching source.
  Example details and walkthrough outputs are illustrative, not observed deployments.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });
  const SRC = {
    iq: { label: 'Quickstart: Add a Foundry IQ knowledge base to a hosted agent with a toolbox', href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent' },
    azd: { label: 'Microsoft Foundry extension for Azure Developer CLI is generally available (2026-11-05)', href: 'https://devblogs.microsoft.com/foundry/microsoft-foundry-azure-developer-cli-ga/' },
    yaml: { label: 'azure.yaml reference — Microsoft Foundry', href: 'https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/azure-yaml-reference' },
    mcp: { label: 'MCP servers in VS Code — GitHub Copilot', href: 'https://code.visualstudio.com/docs/copilot/chat/mcp-servers' },
    workiq: { label: 'Work IQ overview — Microsoft Copilot Studio', href: 'https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/' },
    ks: { label: 'What is a knowledge source? Indexed and remote kinds — Azure AI Search', href: 'https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-overview' },
    kbMcp: { label: 'Query a knowledge base via API or MCP — Azure AI Search', href: 'https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-retrieve' },
    agents: { label: 'Custom agents configuration — GitHub Copilot', href: 'https://docs.github.com/en/copilot/reference/custom-agents-configuration' },
    ksWorkiq: { label: 'Create a Work IQ knowledge source (preview) — Azure AI Search', href: 'https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-how-to-work-iq' }
  };
  /* Full long-README artifacts stay in the handout. These are historical examples,
     not verified current SDK code or deployable configuration. */
  const ARTIFACT = {
    manifest: `<code>name: org-memory<br><br>hooks:<br>  postprovision:<br>    shell: sh<br>    run: python scripts/provision_kb.py  # index, knowledge sources, knowledge base<br><br>services:<br>  ai-project:<br>    host: azure.ai.project<br>    deployments:<br>      - name: gpt-5.4-mini<br>        model:<br>          format: OpenAI<br>          name: gpt-5.4-mini<br>          version: "2026-03-17"<br>        sku:<br>          name: GlobalStandard<br>          capacity: 10<br><br># before provisioning: azd env set AZURE_SEARCH_ENDPOINT https://&lt;search&gt;.search.windows.net<br># the hook writes KB_MCP_ENDPOINT back to the azd environment</code>`,
    agent: `<code># .github/agents/org-memory.agent.md<br>---<br>name: org-memory<br>description: Answers why-questions about code from PR history and decision records<br>tools: ['github/*', 'foundry-iq/*']<br>---<br>Use github first for code, changes, and history.<br>Call foundry-iq when the code can't answer why: risk owner, alternatives, constraints.<br>Cite the decision record, and flag any rationale whose review date has passed.<br>Propose a tracking issue for the owning team; leave code changes to them.<br><br># .vscode/mcp.json (excerpt)<br>"foundry-iq": {<br>  "type": "http",<br>  "url": "https://&lt;search&gt;.search.windows.net/knowledgebases/org-decisions/mcp?api-version=2026-04-01",<br>  "headers": { "Authorization": "Bearer \${input:search-token}" }<br>}</code>`,
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
      scene: 'memory-question',
      pill: 'Core question',
      subtitle: 'Add a provider when a consequential why-question needs evidence beyond the repository.',
      routingLabel: 'Decide in order',
      lanes: [
        { z: 'local', stage: ['context', 'evidence'], icon: '🏗️', title: 'Architect', description: 'Recover the rationale and check whether it still applies.', num: '3', stat: 'context layers', detail: 'Implementation, operational, organizational' },
        { z: 'purple', stage: ['permission'], icon: '🔧', title: 'Platform engineer', description: 'Wire a provider without widening access by default.', num: '2', stat: 'separate tools', detail: 'GitHub evidence and Foundry IQ records' },
        { z: 'green', stage: ['approval'], icon: '🧭', title: 'Service owner', description: 'Review the evidence and approve any consequential change.', num: '1', stat: 'human gate', detail: 'A proposal is not an approval' }
      ]
    }),
    S('contents', 0, 'The path from code question to governed action', {
      sections: [
        { icon: '🧠', title: 'The Two Memories', subtitle: 'Find the gap', blurb: 'What repository context establishes and where intent lives.', slide: 4 },
        { icon: '🔌', title: 'Connecting Foundry IQ', subtitle: 'Wire the provider', blurb: 'Index, expose, identify, and authorize the tool.', slide: 9 },
        { icon: '🔎', title: 'Org Memory Pattern', subtitle: 'Recover intent', blurb: 'Compare evidence and keep current approval explicit.', slide: 15 },
        { icon: '🎯', title: 'Recognizing Intent Problems', subtitle: 'Choose the boundary', blurb: 'Test fit, exclude noise, and transfer the decision.', slide: 20 }
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
      subtitle: 'Someone had a reason. The PR kept the symptom and the fix, not the decision.'
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
      pill: 'Evidence boundary · the premium bypass',
      subtitle: 'The record answers the PR’s three questions. Each answer becomes something to check against today.',
      leftLabel: 'Decision record says · Mar 2023',
      rightLabel: 'Current review must establish',
      pairs: [
        { left: { label: 'Legal accepted the fraud risk', note: 'Scoped to premium checkout, as a temporary exception' }, right: { label: 'Who owns checkout risk today?', note: 'Service catalog: today’s owner and risk approver', z: 'orange' } },
        { left: { label: 'Fraud check added ~30s at payment', note: 'Bypass chosen until the fraud service was migrated' }, right: { label: 'Is the fraud check still slow?', note: 'Latency dashboard: payment step vs. fraud-service SLO', z: 'orange' } },
        { left: { label: 'Review after the Q4 2023 migration', note: 'The record names its own expiry condition' }, right: { label: 'Did the migration ship?', note: 'Migration tracker: is the new fraud service deployed?', z: 'orange' } }
      ],
      outcomeLeft: { icon: 'i', label: 'Why the bypass made sense in 2023' },
      outcomeRight: { icon: '✓', label: 'Service owner decides: keep, fix, or remove' }
    }),
    S('part-2', 2, 'Connecting Foundry IQ', {
      scene: 'opener',
      subtitle: 'Provision with azd, crawl the records, and give Copilot one MCP endpoint.',
      cards: [
        { icon: '🏗️', title: 'Provision', blurb: 'azd provision + hook' },
        { icon: '📚', title: 'Ingest', blurb: 'Crawl and connect sources' },
        { icon: '🔌', title: 'Connect', blurb: 'MCP endpoint in mcp.json' }
      ],
      terminal: { context: 'azd provision → crawl → knowledge base', detail: 'MCP endpoint → Copilot' }
    }),
    S('integration-map', 2, 'Each actor owns a different part of the context path', {
      scene: 'integration-map',
      pill: 'System boundary',
      subtitle: 'Copilot is the only agent. Each MCP server checks the caller and answers from its own sources.'
    }),
    S('azd-provision', 2, 'azd provision builds the knowledge base and prints its MCP endpoint', {
      scene: 'terminal',
      pill: 'Setup · azd Foundry extension 1.0, GA',
      subtitle: 'The platform engineer runs this once per environment. No agent is deployed; Copilot only needs the endpoint.',
      termTitle: 'platform engineer · org-memory environment',
      transcript: [
        { type: 'prompt', text: 'azd env set AZURE_SEARCH_ENDPOINT https://<search>.search.windows.net' },
        { type: 'prompt', text: 'azd provision' },
        { type: 'response', lines: ['Creates or reuses the Foundry project and its model deployment.', 'postprovision hook: creates the index, knowledge sources, and org-decisions knowledge base.', 'The indexer crawls the ADR library, then reruns on its schedule.'] },
        { type: 'divider' },
        { type: 'prompt', text: 'azd env get-value KB_MCP_ENDPOINT' },
        { type: 'response', lines: ['https://<search>.search.windows.net/knowledgebases/org-decisions/mcp?api-version=2026-04-01'] },
        { type: 'outcome', text: 'One endpoint, pasted into .vscode/mcp.json' }
      ],
      footnote: 'Provision-and-hook flow from the Foundry IQ quickstart, without its hosted-agent and toolbox steps.'
    }),
    S('deployment-manifest', 2, 'One azure.yaml provisions the project; a hook builds the knowledge base', {
      scene: 'deployment-manifest',
      pill: 'Artifact · azure.yaml',
      subtitle: 'Everything here is infrastructure. The only output Copilot needs is the knowledge base’s MCP endpoint.'
    }),
    S('source-quality', 2, 'Foundry IQ knows only the sources you connect', {
      scene: 'source-quality',
      pill: 'Source intake · indexed or remote',
      subtitle: 'Crawl decision documents into an index, or query Microsoft 365 email and Teams live through Work IQ.',
      lanes: [
        {
          z: 'local', kind: 'Indexed · crawled into Azure AI Search', title: 'Decision documents',
          chips: ['SharePoint', 'Blob storage', 'OneLake'],
          examples: ['ADRs and RFCs', 'Postmortems and architecture reviews', 'Risk acceptance records'],
          facts: ['🔄  Indexer reruns on a schedule; freshness = cadence', '🔗  Answers cite the indexed document']
        },
        {
          z: 'purple', kind: 'Remote · asked live, never copied', title: 'Work IQ · Microsoft 365 (preview)',
          chips: ['Email', 'Meetings', 'Teams chats'],
          examples: ['Legal’s approval email for the bypass', 'The Teams thread where it was debated', 'Notes from the risk review meeting'],
          facts: ['👤  Returns only what the signed-in user can see', '⚠️  Admin consent · no citation URLs · preview']
        }
      ],
      rule: 'Connect each source with an owner, a scope, and a path back to the original.'
    }),
    S('identity-boundary', 2, 'Identity, permission, and approval are separate controls', {
      scene: 'identity-boundary',
      pill: 'Authority boundary · three owners',
      subtitle: 'Copilot calls as the developer. Each control answers a different question, and a different person sets it.',
      controls: [
        { z: 'purple', title: 'Identity', question: 'Who is calling?', answer: 'The developer’s Entra ID token, sent by Copilot', ownerLabel: 'Set by', owner: 'Developer · Entra sign-in + mcp.json header', missing: '401, the call never authenticates' },
        { z: 'remote', title: 'Permission', question: 'What may they read?', answer: 'Search Index Data Reader on the decision-records search service', ownerLabel: 'Granted by', owner: 'Resource owner · Azure role assignment', missing: '403, the read is denied' },
        { z: 'orange', title: 'Human approval', question: 'Who may change checkout?', answer: 'The checkout service owner reviews the proposal', ownerLabel: 'Decided by', owner: 'Service owner · pull request review', missing: 'the proposal waits, nothing merges' }
      ],
      rule: 'Identity ≠ permission ≠ approval'
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
    S('illustrative-review', 3, 'The March 2023 review records the reason and its own expiry', {
      scene: 'illustrative-review',
      pill: 'Retrieved decision record',
      subtitle: 'Foundry IQ returns the record the PR never linked, with the answers the PR left open.',
      recordPath: 'sharepoint · /architecture/decisions/ADR-042.md',
      recordTitle: 'ADR-042 · Premium checkout fraud-check bypass',
      recordMeta: 'Mar 2023 · accepted, temporary',
      fields: [
        { label: 'Context', text: 'Fraud check added ~30s at payment; premium checkouts timed out' },
        { label: 'Decision', text: 'Skip the fraud check for premium customers only' },
        { label: 'Risk owner', text: 'Legal accepted the premium-only fraud exposure', answers: 'Who accepted the risk?' },
        { label: 'Alternatives', text: 'Async fraud scoring, blocked on the new fraud service', answers: 'Why a bypass, not a fix?' },
        { label: 'Expires', text: 'Remove after the Q4 2023 fraud-service migration', answers: 'When does it come out?' }
      ]
    }),
    S('answer-compare', 3, 'Same question, two providers: only the second answer can say why', {
      scene: 'answer-compare',
      pill: 'Same query · one provider vs. two',
      subtitle: 'GitHub traces the change. Foundry IQ adds the decision, so Copilot proposes a check instead of a guess.',
      question: 'Why does this code bypass fraud checks? Is the exception still valid?',
      panes: [
        {
          z: 'local', label: 'Repository only', calls: 'GITHUB MCP',
          rows: [
            ['PR #413', '“Skip fraud check for premium checkout”'],
            ['#9021', 'Premium checkout times out at payment'],
            ['Review', '“LGTM” · one approval'],
            ['Missing', 'Risk owner, alternatives, removal date', 'orange']
          ],
          outcomeZ: 'orange', outcome: '■  Stops: needs a decision source'
        },
        {
          z: 'purple', label: 'Repository + org memory', calls: 'GITHUB MCP + FOUNDRY IQ',
          rows: [
            ['Trace', 'PR #413 and #9021, same as left'],
            ['ADR-042', 'Legal accepted premium-only fraud risk'],
            ['Why', 'Fraud check added ~30s at payment'],
            ['Expires', 'After the Q4 2023 fraud-service migration']
          ],
          outcomeZ: 'green', outcome: '✓  Proposes: confirm the migration with the owner'
        }
      ]
    }),
    S('agent-tools', 3, 'One agent file routes the question across two MCP servers', {
      scene: 'agent-tools',
      pill: 'Artifact · org-memory.agent.md',
      subtitle: 'Copilot is already the agent: it calls the knowledge base’s own MCP endpoint, guided by four lines of instructions.',
      file: '.github/agents/org-memory.agent.md',
      tools: [
        { name: 'github/*', z: 'local', endpoint: 'GitHub MCP server' },
        { name: 'foundry-iq/*', z: 'purple', endpoint: 'knowledgebases/org-decisions/mcp' }
      ],
      instructions: [
        { k: 'A', text: 'Use github first for code, changes, and history.' },
        { k: 'B', text: 'Call foundry-iq when the code can’t answer why.' },
        { k: 'C', text: 'Cite the record; flag a passed review date.' },
        { k: 'D', text: 'Propose an issue; leave changes to the owner.' }
      ],
      stepsLabel: 'THE BYPASS QUESTION, STEP BY STEP',
      steps: [
        { name: 'Trace', z: 'local', rule: 'A', detail: 'github → PR #413, issue #9021, “LGTM”' },
        { name: 'Find gap', z: 'orange', rule: 'B', detail: 'No risk owner, alternative, or end date' },
        { name: 'Retrieve', z: 'purple', rule: 'B', detail: 'foundry-iq → ADR-042, Mar 2023' },
        { name: 'Synthesize', z: 'purple', detail: 'Legal accepted the risk until Q4 2023' },
        { name: 'Check age', z: 'orange', rule: 'C', detail: 'Expiry passed: did the migration ship?' },
        { name: 'Propose', z: 'green', rule: 'D', stop: true, detail: 'Issue for the checkout owner · stops' }
      ],
      rule: 'Instructions route the request · permission grants access · the owner approves'
    }),
    S('surfaced-debt', 3, 'Connecting the records also surfaces unfinished work', {
      scene: 'surfaced-debt',
      pill: 'What else Foundry IQ finds',
      subtitle: 'Each find becomes an issue for its owner; when records disagree, Copilot cites both and stops.',
      finds: [
        { kind: 'Expired time-box', z: 'orange', found: 'ADR-042: “Remove after the Q4 2023 fraud-service migration.”', signal: 'The expiry has passed and the bypass is still in the code', move: 'Issue for the checkout owner: remove the bypass or renew the ADR with a new date' },
        { kind: 'Unfinished follow-up', z: 'purple', found: 'ADR-042: “Async fraud scoring, blocked on the new fraud service.”', signal: 'No issue, PR, or later record picks up async scoring', move: 'Tracking issue linked to ADR-042 for the architect who owns it' },
        { kind: 'Conflicting guidance', z: 'remote', found: '2025 payments standard: “Every payment passes a fraud check.”', signal: 'Two current records disagree about the same code path', move: 'Copilot cites both and stops; checkout and security owners decide' }
      ],
      rule: 'Retrieval finds the debt · owners decide what to pay down'
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
    S('signal-phrases', 4, 'Four phrases that reveal an intent gap', {
      scene: 'signal-scenarios',
      pill: 'Diagnostic signals',
      subtitle: 'Each one names who is asking, who still knows, and where the answer was written down.',
      scenarios: [
        { quote: '“Why does this exist?”', heard: 'PR review', z: 'purple', missing: 'Who accepted the tradeoff, and until when', look: ['ADRs', 'PR threads', 'Design reviews'], asks: 'Developer or reviewer changing the code', knows: 'Original author · tech lead · ADR owner' },
        { quote: '“Afraid to touch it”', heard: 'Sprint planning', z: 'orange', missing: 'Limits set by compliance, partners, or SLAs', look: ['Postmortems', 'Compliance sign-offs', 'Runbooks'], asks: 'Engineer estimating the change', knows: 'Service owner · SRE · compliance lead' },
        { quote: '“Migration surprises”', heard: 'Migration standup', z: 'remote', missing: 'Tradeoffs the previous team made on the way', look: ['Migration RFCs', 'Postmortems', 'Teams threads'], asks: 'Platform engineer running the migration', knows: 'Previous service owner · engineering manager' },
        { quote: '“What was rejected?”', heard: 'Design review', z: 'local', missing: 'Alternatives considered and why each one lost', look: ['RFCs', 'Review minutes', 'Email threads'], asks: 'Architect or engineer proposing the change', knows: 'Architecture review board · product manager' }
      ]
    }),
    S('what-not-to-index', 4, 'Route each question to the place that can answer it', {
      scene: 'signals',
      pill: 'Question routing',
      subtitle: 'Foundry IQ is one of four routes; most questions already have a faster home.',
      rows: [
        { label: '“How does it work?”', description: 'The code is the source; Copilot already reads it', tag: 'Copilot + repo', z: 'local' },
        { label: '“Is this flag live?”', description: 'The owner can answer in one message', tag: 'Ask the owner', z: 'green' },
        { label: '“Why this design?”', description: 'Nobody wrote the answer down; an index finds nothing', tag: 'Write the ADR', z: 'orange' },
        { label: '“Why the bypass?”', description: 'Written down, scattered across ADRs, SharePoint, and Teams', tag: 'Foundry IQ', z: 'purple' }
      ]
    }),
    S('readiness-checks', 4, 'Four checks show whether your team is ready for Foundry IQ', {
      scene: 'readiness-checks',
      pill: 'Readiness · no Foundry required',
      subtitle: 'Run all four this week with tools you already have; a yes on each earns a pilot.',
      checks: [
        { q: 'We keep hearing why-questions', how: 'Count slide 21’s phrases in last month’s PRs, standups, and design reviews', no: 'Repository context is enough' },
        { q: 'Decisions get written down', how: 'Ask three tech leads where they would look; search SharePoint and the wiki for “ADR” or “RFC”', no: 'Start an ADR template now' },
        { q: 'Sources have owners and access rules', how: 'Name an owner and a permission group for each candidate source', no: 'Curate before indexing' },
        { q: 'Finding answers is slow today', how: 'Time a manual hunt for one answer you already know', no: 'A README link may be enough' }
      ],
      pass: 'Yes on all four → index one source, add it to one agent file, compare answers for two weeks'
    }),
    S('before-after', 0, 'What changes for the team when intent is one question away', {
      scene: 'team-shift',
      pill: 'Before · after',
      subtitle: 'The fraud-check bypass from part 3, role by role.',
      rows: [
        { role: 'Developer', z: 'local', before: '“Anyone know why?” in Teams, then waits', after: 'Copilot cites ADR-042 in the same session' },
        { role: 'Reviewer', z: 'purple', before: 'Approves the bypass on “LGTM”', after: 'Checks the cited record and its expiry' },
        { role: 'Service owner', z: 'orange', before: 'Interrupted to recall a 2023 decision', after: 'Reviews one proposed issue with sources' },
        { role: 'Team', z: 'green', before: 'Expired exception stays in production', after: 'Expired exceptions surface as issues' }
      ],
      rule: 'Copilot does the digging · the owner keeps the decision'
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
          { href: SRC.iq.href, label: SRC.iq.label, description: 'azd provision plus the postprovision hook that builds a knowledge base.' },
          { href: SRC.kbMcp.href, label: SRC.kbMcp.label, description: 'The knowledge base MCP endpoint, bearer-token auth, and reader role.' },
          { href: SRC.ks.href, label: SRC.ks.label, description: 'Indexed (crawled) and remote (live) knowledge sources.' },
          { href: SRC.azd.href, label: SRC.azd.label, description: 'azd Foundry extension 1.0 GA and prerequisites.' }
        ] },
        { icon: '🔧', title: 'Protocol and samples', z: 'purple', items: [
          { href: SRC.mcp.href, label: SRC.mcp.label, description: 'Copilot MCP tool configuration and use.' },
          { href: SRC.agents.href, label: SRC.agents.label, description: 'Agent files that scope which MCP tools Copilot uses.' },
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
    'core-question': { seconds: 40, notes: ['"The question is when organizational context changes a decision enough to justify another provider."', '"Read the lanes left to right: three layers of context, two separate tools, one human gate."', '"We will keep source evidence, permission, and human approval separate."'], know: ['The audience in the source README is principal engineers, platform architects, and GitHub solution engineers. No named attendee persona is required.'], sources: [SRC.kbMcp, SRC.iq] },
    contents: { seconds: 30, notes: ['"We will find the gap, wire the provider, inspect the combined answer, and decide where the pattern fits."', 'The four cards link to the part openers.'] },
    'part-1': { seconds: 25, notes: ['"Start with a code path that is easy to trace and harder to explain."', '→ The sample makes that difference visible.'], sources: [SRC.mcp, SRC.iq] },
    'code-gap': { seconds: 100, notes: ['"Someone wrote this branch for a reason. Here is everything the repository kept about that reason."', '"The PR names the symptom, premium checkouts timing out, and the fix, skip the fraud check. The review says LGTM. The issue is closed."', '"What it never says: who accepted the fraud risk, why a bypass beat a real fix, or when it comes out. That is the gap organizational memory fills."'], know: ['The snippet `if (customer.IsPremium) { bypassFraudChecks(); }`, PR #413, and issue #9021 are the supplied README’s illustrative teaching case, not verified production data. The PR title, description, “LGTM” review, inline comment, and diff size are a composed example of a typical terse PR, consistent with the March 2023 scenario on the later review slide.', 'The original README includes a named author. It is omitted here because the case is illustrative; do not replace it with an invented real-world identity.'], sources: [SRC.mcp], cue: ['Read the PR card top to bottom like a reviewer would, then land on the three orange questions. State once that this is a composed example, not a live repository.'] },
    'memory-layers': { seconds: 100, notes: ['"Implementation context explains what changed; operational context explains what is happening now."', '"Organizational context can explain why a decision was made, when a source exists."', '"The provider supplies evidence in its domain. The person still judges its relevance."'], know: ['The three-layer model and examples come from the long README: GitHub MCP for repository history, operational MCPs such as Jira or ServiceNow, and Foundry IQ for decision records. Provider availability and feature specifics vary by deployment.'], sources: [SRC.mcp, SRC.iq] },
    'context-router': { seconds: 70, notes: ['"Ask which source owns the question before adding a tool."', 'The final row is different: permission to retrieve evidence does not tell us who may approve a code change.'], know: ['The table adapts the README context-layer reference. “Operational MCP” is a category, not a claim that a particular connector is configured.', 'Full quick reference from the original artifact: ' + ARTIFACT.router], sources: [SRC.mcp, SRC.kbMcp] },
    'intent-boundary': { seconds: 85, notes: ['"Here are the three questions the PR left open, answered by a decision record from March 2023."', '"Legal accepted the risk, the fraud check was adding about thirty seconds at payment, and the bypass was due for review after the Q4 2023 migration."', '"Every one of those answers is true about 2023. Each one turns into a check against today: who owns the risk now, whether the fraud check is still slow, and whether the migration shipped."', '"The record tells us where to look. The service owner, with current evidence, decides whether the bypass stays, gets fixed, or comes out."', '→ Next we connect that record to Copilot as a separate, governed tool.'], know: ['A historical decision is evidence about its period and scope. Check current system state, policy, source ownership, and the current decision-maker.', 'The record details are the same hypothetical case shown on the illustrative-review slide; the service catalog, latency dashboard, and migration tracker are examples of where a team would look, not named products.'], sources: [SRC.iq, SRC.kbMcp], cue: ['Point at each row left to right: record answer, then today’s check. Land on the green outcome.'] },
    'part-2': { seconds: 25, notes: ['"Connecting Foundry is infrastructure, not another agent. Three steps: provision the knowledge base, ingest the sources, and give Copilot the endpoint."', '→ Start with where each call goes.'], sources: [SRC.iq, SRC.kbMcp] },
    'integration-map': { seconds: 95, notes: ['"Copilot is the only agent here. For the bypass question it makes two MCP calls: one for PR history, one for decision records."', '"GitHub checks the token’s repository scopes and returns PR #413, issue #9021, and the diff."', '"The Foundry IQ knowledge base checks that the developer’s identity holds the Search Index Data Reader role, then returns ADR-042 with its citation."', '"Neither service vouches for the other. The resource owner decides who may read, and the service owner still approves any change."', '→ Next: the one-time setup that makes the right lane exist.'], know: ['Each Foundry IQ knowledge base is a standalone MCP server that exposes the knowledge_base_retrieve tool. First-party docs name GitHub Copilot among the MCP clients that can call it, with headers set in the MCP server JSON.', 'A Foundry-hosted agent with a toolbox is a different design: the agent runs in Foundry under its own managed identity. It fits when the agent must run outside the editor. This talk keeps Copilot as the client, so no hosted agent is deployed.', 'Tool-call labels on the slide are descriptions; the knowledge base tool is knowledge_base_retrieve.'], sources: [SRC.kbMcp, SRC.mcp, SRC.iq], cue: ['Trace the left lane top to bottom, then the right. Finish on the orange band.'] },
    'azd-provision': { seconds: 75, notes: ['"The azd Foundry extension reached 1.0 and general availability on November 5. For organizational memory you need only its provisioning half."', '"Point azd at the search service, then run azd provision. It creates or reuses the Foundry project and model, and a postprovision hook builds the index, the knowledge sources, and the knowledge base."', '"The hook writes the knowledge base’s MCP endpoint back to the azd environment. That one URL is what Copilot needs."', '"No agent gets deployed. The platform engineer runs this once per environment; the resource owner still decides who may read."'], know: ['This follows steps 1–3 of the Foundry IQ quickstart (azd env set AZURE_SEARCH_ENDPOINT, then azd provision with a postprovision hook running provision_kb.py, which stores KB_MCP_ENDPOINT). The quickstart then creates a toolbox connection and deploys a hosted agent; this talk stops before those steps because Copilot is the client.', 'Prerequisites per the GA announcement: Azure Developer CLI 1.37.0 or later, azd auth login, azd ext install microsoft.foundry, Foundry permissions, and model quota in the selected region. The person running the hook needs Search Service Contributor and Search Index Data Contributor on the search service; the search service’s managed identity needs Cognitive Services User on the Foundry account when the knowledge base calls the model.', 'The org-decisions name and the ADR library source are this talk’s example; the sample hook seeds its own documents. Replace that seed step with a knowledge source for your decision records (slide 13). No command was run for this talk.'], sources: [SRC.iq, SRC.azd, SRC.kbMcp], cue: ['Walk the three commands top to bottom. Land on the endpoint and the outcome line.'] },
    'deployment-manifest': { seconds: 90, notes: ['"Here is the whole footprint. azure.yaml declares the Foundry project and its model deployment, and points at the search service."', '"A postprovision hook does the Foundry IQ work: create the index, register the knowledge sources, and create the knowledge base."', '"The hook’s output is a single value, the MCP endpoint. Everything on this slide is infrastructure a platform team already knows how to review."'], know: ['The azure.yaml shape (azure.ai.project host with model deployments, plus a top-level postprovision hook) follows the azure.yaml reference and the Foundry IQ quickstart. Knowledge sources and knowledge bases are Azure AI Search objects the hook creates through the Search APIs, so they live in the hook script rather than as azure.yaml services.', 'With the 2026-04-01 MCP api-version, retrieval is minimal and extractive and returns grounding data only; Copilot’s own model writes the answer. Keep a model deployment when your knowledge sources need one, for example for vectorization or answer synthesis in other clients.', 'azure.yaml sketch: ' + ARTIFACT.manifest], sources: [SRC.yaml, SRC.iq, SRC.azd, SRC.kbMcp], cue: ['Read the four cards left to right, top to bottom. Land on the endpoint card.'] },
    'source-quality': { seconds: 90, notes: ['"Foundry IQ answers only from the sources someone connects to the knowledge base. There are two ways in."', '"Indexed sources are crawled: an indexer copies SharePoint, Blob, or OneLake documents into Azure AI Search on a schedule. That is where ADRs, postmortems, and risk records live, and answers cite the document."', '"Remote sources are asked live and never copied. Work IQ brings in Microsoft 365: email, meetings, and Teams chats. For the bypass, that is legal’s approval email and the thread where the team argued about it."', '"Remote answers carry the signed-in user’s permissions and no citation URL, so the reviewer goes back to the original message."', '→ Next: who may call the endpoint, and who approves what comes back.'], know: ['Knowledge source kinds (Azure AI Search overview): indexed = search index, Azure blob, Azure SQL (preview), file upload (preview), OneLake, indexed SharePoint (preview); remote = remote SharePoint (preview), Fabric data agent and ontology (preview), MCP server (preview), Work IQ (preview), web (Bing). Indexed sources return citation URLs; remote sources do not.', 'Work IQ knowledge source (preview): surfaces documents, emails, meetings, and activity across Microsoft 365; the Work IQ overview adds chats. It applies Microsoft 365 permissions on every request and calls Work IQ on behalf of the signed-in user. Setup needs a customer-owned Entra app registration and tenant admin consent for the WorkIQAgent.Ask delegated permission. Microsoft warns that in preview it might use Work IQ capabilities that perform actions, so limit it to trusted apps and users.', 'Delegated identity matters here: a remote Work IQ call answers as the signed-in user. A background agent running only on a managed identity has no user to act for; confirm the flow before promising email or chat recall.', 'The bypass examples (approval email, Teams thread, meeting notes) are the same hypothetical case as the illustrative review. Sample paths such as ADR-042 and RFC-2023-fraud-platform are illustrative.', 'For a real knowledge base, decide source ownership, access control, retention, update and deletion behavior, sensitive-data handling, citation requirements, and a review cadence. Keep the canonical record with its owner; the index is a retrieval surface.', 'The postprovision hook from slide 11 registers these sources: an indexed SharePoint or Blob knowledge source for the ADR library, and, when approved, a Work IQ remote source. The quickstart’s provision_kb.py seeds sample documents; replace that step with your own knowledge source.'], sources: [SRC.ks, SRC.ksWorkiq, SRC.workiq, SRC.iq], cue: ['Left lane first (crawled, cited), then right (live, permission-scoped). Land on the rule at the bottom.'] },
    'identity-boundary': { seconds: 90, notes: ['"Copilot calls as the developer, so three questions with three owners."', '"Identity: who is calling. The developer signs in to Entra ID, and Copilot sends their bearer token in the MCP header. Without it, the call fails with a 401."', '"Permission: what they may read. The resource owner grants Search Index Data Reader on the decision-records search service. Without it, a 403."', '"Approval: who may change checkout. The service owner reviews whatever Copilot proposes. Without it, the proposal just waits."', '"Having an identity grants nothing, and read access approves nothing."', '→ Next: what Copilot gets back when all three are in place.'], know: ['Per the knowledge base MCP docs, a bearer token is the recommended authentication; the identity behind it needs Search Index Data Reader on the search service. An admin key in the api-key header also works but stores a powerful secret in configuration, so keep it out of mcp.json.', 'Search Index Data Reader is granted at the search-service scope, so keep decision records in a search service whose contents every reader may see, or grant at a narrower scope where supported.', 'Bearer tokens expire (typically about an hour); use an mcp.json input or a token helper so developers refresh it rather than pasting long-lived secrets. Remote sources such as Work IQ also act as the signed-in user (slide 13).'], sources: [SRC.kbMcp, SRC.mcp, SRC.iq], cue: ['Walk each card top to bottom: question, answer, owner, failure signal. Land on the band.'] },
    'part-3': { seconds: 25, notes: ['"Now we run the same question through the two evidence paths."', '→ The source excerpt is deliberately labeled as a teaching scenario.'], sources: [SRC.mcp, SRC.iq] },
    'illustrative-review': { seconds: 90, notes: ['"This is the record the PR never linked: ADR-042, from the March 2023 architecture review."', '"Context and decision match what the code shows. The last three fields are new, and each one answers a question the PR left open."', '"Legal owned the risk. The real fix, async fraud scoring, needed a fraud service that did not exist yet. And the record names its own expiry: the Q4 2023 migration."'], know: ['The PR, issue, ADR-042 path, dates, 30-second latency, legal approval, alternative, and Q4 2023 migration are one composed example carried through the talk, introduced on the code-gap slide.', 'A retrieved record keeps its source title, date, owner, scope, and citation; the reviewer opens the original before acting on it.'], sources: [SRC.iq], cue: ['Read the three green-tagged rows aloud, then point back to slide 5’s questions.'] },
    'answer-compare': { seconds: 100, notes: ['"Same question, asked twice."', '"With GitHub alone, Copilot traces everything: the PR, the issue, the one-word review. Then it stops, because the code history has no risk owner, no alternatives, no removal date."', '"Add Foundry IQ and the same trace comes back, plus ADR-042: legal accepted the risk, the fraud check was slow, and the bypass expires after the Q4 2023 migration."', '"Now the useful move is a check rather than a guess: confirm whether the migration shipped and ask the checkout owner. Copilot proposes that; it does not change the code."', '→ Next: the tools that keep those two sources distinct.'], know: ['Both responses are composed for this talk from the running example; neither is a recorded Copilot or Foundry IQ output.', 'The expiry date is history. Whether the migration actually shipped is the current check, owned by the service owner, as on the evidence-boundary slide.'], sources: [SRC.mcp, SRC.iq, SRC.kbMcp], cue: ['Read the left pane, pause on the orange stop, then the right pane. Land on the green proposal.'] },
    'agent-tools': { seconds: 130, notes: ['"Copilot is already the agent, so there is nothing to build or host. This is one Markdown file in the repository."', '"The frontmatter gives it two MCP servers: GitHub, and the knowledge base itself. Every Foundry IQ knowledge base is its own MCP server, so Copilot calls it directly."', '"Follow the bypass question down the right. Line A sends it to GitHub first: PR 413, the issue, the one-word review."', '"Line B fires when the code runs out: no risk owner, no alternative, no end date. That is when it calls foundry-iq and gets ADR-042."', '"Line C makes it cite the record and check the date. The expiry has passed, so the record is history until someone confirms the migration shipped."', '"Line D ends the run: a tracking issue for the checkout owner. The agent stops there."', '"The file only routes the request. Permission still grants access, and the owner still approves the change: the three controls from slide 14."', '→ Next: how to tell when a question needs this at all.'], know: ['Every Azure AI Search (Foundry IQ) knowledge base exposes an MCP endpoint at https://&lt;search&gt;.search.windows.net/knowledgebases/&lt;kb&gt;/mcp?api-version=… with one tool, knowledge_base_retrieve. Learn names GitHub Copilot as a supported client; Copilot passes auth headers through its MCP server JSON. API version 2026-04-01 returns extractive grounding data; 2026-08-01-preview can return synthesized answers.', 'Authenticate with a bearer token for https://search.azure.com/.default (recommended over an admin key). The identity behind the token needs Search Index Data Reader on the search service. In this setup the identity is the developer’s own sign-in, so the knowledge base returns only what that person may read.', 'Custom agent profiles live in .github/agents/*.agent.md. The tools list scopes MCP tools by server prefix (github/*, foundry-iq/*); the Markdown body holds the instructions (up to 30,000 characters). VS Code reads MCP servers from mcp.json; Copilot cloud agent and CLI can also declare mcp-servers in the profile.', 'A hosted Foundry agent (slides 11–12) is the right move when the agent must run without Copilot: a Teams bot, a scheduled job, or a service other apps call. For a developer asking why-questions in the editor, the agent file is the whole integration.', 'Tool lists and instructions influence invocation but do not grant server-side authorization. Issue creation stays a proposal unless the caller has write permission and the workflow authorizes it. The six-step run applies the file to the talk’s bypass example; it is a walk-through, not a recorded trace.', 'Full artifact: ' + ARTIFACT.agent], sources: [SRC.agents, SRC.kbMcp, SRC.mcp], cue: ['Open on the file path: one Markdown file. Point to each letter as its step appears on the right. Land on the band.'] },
    'part-4': { seconds: 25, notes: ['"Now we decide where this pattern fits and where it does not."', '→ Start with the signal, then look for an authoritative source.'], sources: [SRC.iq] },
    'surfaced-debt': { seconds: 100, notes: ['"Once Copilot can read the decision records, it finds more than the answer you asked for."', '"Our bypass is the first card. ADR-042 said remove it after the Q4 2023 migration. The date passed, and the code still has the bypass. That is an expired time-box, and it becomes an issue for the checkout owner."', '"The same record names async fraud scoring as the real fix. Nothing in the issues, PRs, or later records picks it up. That is an unfinished follow-up, and it becomes a tracking issue for the architect."', '"The third card is the uncomfortable one. A 2025 payments standard says every payment passes a fraud check. ADR-042 says premium skips it. Copilot does not pick a winner; it cites both and stops."', '"Retrieval finds the debt. The owners decide what to pay down."', '→ Next: how to tell which of your questions are worth this, and whether your team is ready.'], know: ['Add one line to the agent file from slide 18 to make the third card reliable: “When two records disagree, or a record disagrees with the code, cite both and stop.” Instruction C already covers passed review dates.', 'Expired time-boxes surface only when records carry explicit dates or conditions. A team that wants sweeps adds an Expires or Review-by field to its ADR template.', 'A periodic sweep is a prompt, not a feature: ask the agent to list retrieved decisions whose review date has passed and check each against the code. Treat the output as a triage list for owners, not a backlog to auto-file.', 'Expect the first connection to surface a burst of findings. Route them to owners in one batch with citations instead of filing dozens of issues at once.'], sources: [SRC.kbMcp, SRC.agents] },
    'signal-phrases': { seconds: 120, notes: ['"Listen for these four phrases. Each one shows up in a meeting you already run."', '"Why does this exist? comes up in PR review. That is our bypass question from part one."', '"Afraid to touch it comes up in sprint planning, when the estimate quietly doubles."', '"Migration surprises come up in standups. Rejected alternatives come up in design review."', '"Look at the bottom of each card. The person asking is rarely the person who knows. The knower has moved teams, is busy, or is on the review board."', '"That gap between ASKS and KNOWS is what Foundry IQ closes, as long as the answer was written down in one of the LOOK IN sources."', '→ Next: when the answer was never written down, an index cannot help.'], know: ['The phrases are adapted from the README: “nobody remembers,” “afraid to touch this,” “migration keeps hitting surprises,” and questions about alternatives.', 'The roles are typical, not fixed. In a small team the asker and the knower can be the same person a year apart; that still counts as an intent gap.', 'Before indexing, confirm three things for each phrase the team hears: the LOOK IN source exists, the asker’s identity can read it, and the answer changes a real decision.', 'Email and Teams threads reach Copilot through Work IQ as remote sources (slide 13); ADRs, RFCs, postmortems, and runbooks are usually indexed sources.'], sources: [SRC.iq] },
    'what-not-to-index': { seconds: 90, notes: ['"Before anyone builds anything, ask where the answer to this question lives."', '"How does it work? The code answers that, and Copilot already reads the code."', '"Is this flag still live? One message to the owner beats any index."', '"Why did we pick this design, when nobody wrote it down? An index cannot retrieve what was never recorded. The move is to write the ADR now, so next year’s question has an answer."', '"Foundry IQ earns its slot on the last row: the answer exists, it is written down, and it is scattered across places nobody searches together."', '→ Next: how to tell whether your team has enough of that last row to pilot.'], know: ['The source README excludes pure code generation, review, and refactoring tasks; teams with no recorded decisions; and early-stage teams without a decision history.', 'Index only curated sources. Assess each candidate for sensitivity, retention, licensing, update ownership, and the risk of stale or false matches before granting retrieval access.'], sources: [SRC.iq, SRC.mcp] },
    'readiness-checks': { seconds: 110, notes: ['"Every one of these checks runs without Foundry. You do not need the tool to decide whether you need the tool."', '"One: are people asking why-questions? Count the phrases from slide 21 in last month’s PRs, standups, and design reviews."', '"Two: does anyone write decisions down? Ask three tech leads where they would look, and search SharePoint and the wiki for ADR or RFC. If nothing turns up, the next step is an ADR template."', '"Three: does each source have an owner and a permission group? If not, curate before you index."', '"Four: is finding the answer slow today? Pick an answer you already know and time how long it takes to find it by hand. Two minutes means a README link may be enough."', '"Yes on all four earns a small pilot: one source, one agent file, two weeks of side-by-side answers."'], know: ['These checks replace the original README’s per-question decision tree, which assumed the asker already knew whether a record existed; finding that out is the retrieval step itself.', 'The original README estimated that 5–10% of coding-agent work benefits from organizational context. No sample or method backs that figure, so the deck asks teams to count their own why-questions instead (check 1).', 'For the pilot, record per question: which route answered it, whether the retrieved record changed the decision, false matches, and reviewer effort. Name an owner and an end date for the comparison.'], sources: [SRC.iq, SRC.kbMcp] },
    'before-after': { seconds: 75, notes: ['"Here is what changes, role by role, using the bypass we followed all talk."', '"The developer stops posting ‘anyone know why?’ and waiting. Copilot cites ADR-042 in the same session."', '"The reviewer stops approving on LGTM and checks a cited record and its expiry date."', '"The service owner stops getting interrupted to recall 2023 and instead reviews one issue with its sources attached."', '"And the team stops carrying expired exceptions, because an expired record turns into an issue."', '"Copilot does the digging. The owner keeps the decision."'], know: ['Each row maps to an earlier slide: the developer’s run is slide 18, the reviewer’s cited record is slide 16, and the owner’s proposed issue is step 6 on slide 18.', 'The after column describes the pattern’s intended behavior for the running example; a team confirms it through the two-week pilot on the readiness slide.'], sources: [SRC.iq, SRC.mcp] },
    today: { seconds: 90, notes: ['"Today, find one real why-question and its authoritative source."', '"This week, compare the evidence and record both misses and false matches."', '"This month, review a bounded pilot with its owner and use local task data to decide whether it earns expansion."'], know: ['The durations and work horizons are planning prompts, not guarantees. Success criteria depend on the team’s workflow and risk. Useful measures include source coverage, citation correctness, freshness, false matches, decision changes, reviewer effort, and access exceptions.', 'The long README proposed a 15-minute step to read both quickstarts, map the three context layers, and identify one signal; a one-hour step to initialize a sample and identify a source; and a two-to-four-hour step to provision a small collection, wire both tools, and test a real why-question. Those are suggested planning blocks, not tested completion times or evidence that a deployment exists.'], sources: [SRC.kbMcp, SRC.iq] },
    references: { seconds: 30, notes: ['"These first-party links are where to verify evolving setup and protocol details."', 'The examples and sample percentages in this deck are not substantiated by these links.'], know: ['The README’s reference dates remain 2026-07-24; links and API details were not reverified on the conversion date. No product-news refresh was performed.', 'The original README also included a Work IQ, Fabric IQ, Web IQ source-diversity claim. This conversion does not repeat it because no first-party evidence for that particular architecture claim was supplied.', 'Observed evidence for this conversion is limited to the local native validator, which reported 35 rendered slides, no pending scenes, and a 35-page PDF. That validates the deck artifact, not any Azure deployment, SDK call, Foundry retrieval, model answer, or measured product outcome.'], sources: [SRC.iq, SRC.kbMcp, SRC.ks, SRC.azd, SRC.mcp, SRC.agents, SRC.workiq] },
    thanks: { seconds: 30, notes: ['"Trace what changed, retrieve what was decided, and verify who owns the next decision."', '"Which real why-question will you test in your own workflow?" Take one answer from the room.'], sources: [SRC.mcp, SRC.iq] }
  };
  NOTES['deployment-manifest'].know.push('The model name and deployment identify the model side; GitHub MCP and Foundry IQ are tool/data providers. These providers are not interchangeable with the client or the model endpoint.');
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
