/*
  Scaling GitHub Copilot Across Organizations — native deck data and teaching notes.
  Recipe-approved conversion plan: tech-talks/enterprise-patterns/deck.recipe.yml.
  Slide data and notes stay together so the printed handout carries the entire talk.
*/
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });

  const slides = [
    S('title', 0, 'Scaling GitHub Copilot Across Organizations', {
      chrome: false, visual: 'org-ring',
      subtitle: 'Enterprise Patterns for AI Adoption at Scale',
      tagline: 'One reviewed baseline can reach every repository; teams specialize inside its boundary.',
      meta: 'CopilotTraining · Practitioner Tech Talk · Trust and Govern'
    }),
    S('core-question', 0, 'How do I scale Copilot across our teams without losing consistency, team choice, or proof?', {
      pill: 'Core Question',
      subtitle: 'The platform owner sets a reusable baseline; each team verifies the result in its own work.',
      highlight: 'Standards, knowledge, and evidence scale when owners and authority stay visible.',
      routing: ['set the scope', 'share expertise', 'govern choices', 'inspect evidence'],
      routingLabel: 'A practical route',
      roles: [
        { icon: '⌘', title: 'Platform owner', description: 'Set the shared floor and maintain the approved source.' },
        { icon: '◇', title: 'Repository team', description: 'Add local context, test the result, and own acceptance.' },
        { icon: '✓', title: 'Service owner', description: 'Decide when evidence meets the organization requirement.' }
      ],
      stats: [
        { title: '4 scopes', description: 'Organization, repository, file pattern, directory' },
        { title: '2 knowledge jobs', description: 'Reusable method and cross-repository context' },
        { title: '1 evidence loop', description: 'Input, result, reviewer, recovery path' }
      ]
    }),
    S('contents', 0, 'Four decisions connect shared guidance to team evidence', {
      sections: [
        { icon: '⌘', title: 'Organization-Wide Standards', subtitle: 'Place every rule at its owner', blurb: 'Scope, topology, example, and verification', slide: 4 },
        { icon: '◇', title: 'Skills and Knowledge', subtitle: 'Match method to context', blurb: 'Reusable expertise, indexed repositories, update ownership', slide: 12 },
        { icon: '⚖', title: 'Governance & Licensing', subtitle: 'Bound choices with evidence', blurb: 'Models, cost, telemetry, tools, compliance', slide: 17 },
        { icon: '✓', title: 'Adoption & Enablement', subtitle: 'Prove the boundary works', blurb: 'Managed settings, measurement, self-service, transfer', slide: 23 }
      ]
    }),
    S('part-1', 1, 'Organization-Wide Standards', {
      scene: 'opener',
      subtitle: 'Place a shared baseline where its owner can update it, then verify it in repository work.',
      cards: [
        { icon: '⌘', title: 'Choose scope', blurb: 'Organization to directory' },
        { icon: '▤', title: 'Publish context', blurb: 'Rules with real examples' },
        { icon: '✓', title: 'Review evidence', blurb: 'Tests and human acceptance' }
      ],
      terminal: { context: 'One baseline can reach many repositories', detail: 'Scope, owner, verification' }
    }),
    S('reinvention-case', 1, '50 teams × 40 hours = 2,000 hours in a scenario', {
      scene: 'scorecard', pill: 'Part 1 · Scenario arithmetic',
      cards: [
        { icon: '∑', title: 'Input assumption', description: '50 teams each repeat 40 hours of comparable setup work.' },
        { icon: '×', title: 'Scenario math', description: '50 × 40 hours = 2,000 hours of potential repetition.' },
        { icon: '⌘', title: 'Pattern opportunity', description: 'A shared baseline can remove duplicated setup for common rules.' },
        { icon: '!', title: 'Evidence status', description: 'Illustrative calculation from the source talk; no measured cohort.' }
      ]
    }),
    S('standard-selection', 1, 'The guidance scope determines where the rule belongs', {
      scene: 'signals', pill: 'Part 1 · Choose the selector',
      subtitle: 'A platform owner routes each rule by the unit that needs it.',
      rows: [
        { label: 'Org scope', description: 'Reusable Copilot baseline for eligible repositories', tag: 'Org instructions', z: 'purple' },
        { label: 'One repository', description: 'Project-wide GitHub Copilot conventions and local context', tag: 'Repo context file', z: 'local' },
        { label: 'File pattern', description: 'Guidance selected by frontmatter applyTo glob', tag: '*.instructions.md', z: 'remote' },
        { label: 'Directory scope', description: 'Nearest agent playbook with commands and guardrails', tag: 'AGENTS.md', z: 'green' }
      ],
      footnote: 'Guidance changes context; enforcement still belongs to tests, policy, and accountable reviewers.'
    }),
    S('repo-topology', 1, 'Polyrepos share a floor; monorepos add path-specific playbooks', {
      scene: 'showdown', pill: 'Part 1 · Choose the topology',
      subtitle: 'The organization owner publishes the common rule; repository owners add local workflow detail.',
      leftLabel: 'Polyrepo placement',
      rightLabel: 'Monorepo placement',
      pairs: [
        { left: { label: 'Independent repo lifecycle', note: 'Each service maintains local context' }, right: { label: 'Organization instructions', note: 'Common baseline reaches eligible repositories', z: 'purple' } },
        { left: { label: 'One repository per service', note: 'Repo owner chooses the local additions' }, right: { label: 'Repository instructions', note: 'Project-wide GitHub Copilot context', z: 'local' } },
        { left: { label: 'Portable playbook as needed', note: 'Root AGENTS.md carries cross-tool workflow detail' }, right: { label: 'Nested AGENTS.md', note: 'Nearest directory scopes local commands', z: 'green' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Common floor plus local ownership' },
      outcomeRight: { icon: '✓', label: 'Common floor plus path-local context' }
    }),
    S('instruction-artifact', 1, 'A rule earns trust when its scope and review signal are concrete', {
      scene: 'terminal', pill: 'Part 1 · Illustrative artifact', termTitle: 'organization instruction example',
      subtitle: 'A service owner reviews the proposed change; this sample is not an organization policy.',
      transcript: [
        { type: 'prompt', text: 'Example baseline: use the approved authentication helper; never log access tokens.' },
        { type: 'user', text: 'Add an API handler that reads the authenticated user.' },
        { type: 'thinking', label: 'Copilot proposes:' },
        { type: 'response', lines: ['Use the repository authentication helper', 'Add a focused test for the authenticated path', 'Show the diff and test result to the reviewer'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Reviewer checks helper use, tests, and policy fit' },
        { type: 'outcome', text: 'Accept only after required checks and owner review' }
      ],
      footnote: 'Illustrative behavior; a prompt is guidance, while tests and review provide the acceptance evidence.'
    }),
    S('authority-scope', 1, 'The organization owner sets the floor; repo owners add local context', {
      scene: 'relay', pill: 'Part 1 · Authority handoff',
      subtitle: 'Each layer has a named maintainer and an observable review handoff.',
      columns: [
        { icon: '⌘', title: 'Organization owner', description: 'Approves cross-repository standards and their source.', items: ['Define shared rule', 'Review policy change', 'Publish baseline'], z: ['purple', 'orange', 'green'] },
        { icon: '▤', title: 'Repository owner', description: 'Adds service context and confirms local compatibility.', items: ['Add local context', 'Run repo checks', 'Review diff'], z: ['local', 'remote', 'green'] },
        { icon: '✓', title: 'Service owner', description: 'Accepts or escalates evidence against local requirements.', items: ['Inspect result', 'Accept or reject', 'Escalate gap'], z: ['github', 'green', 'orange'] }
      ]
    }),
    S('verification-loop', 1, 'The reviewer checks the rule and result in the same change', {
      scene: 'scorecard', pill: 'Part 1 · Verification loop',
      cards: [
        { icon: '▤', title: 'Input', description: 'Approved rule plus a representative task and repository context.' },
        { icon: '↗', title: 'Proposed output', description: 'Copilot change shown as a diff; no policy decision is implied.' },
        { icon: '✓', title: 'Observable checks', description: 'Tests, static checks, and required human review report separately.' },
        { icon: '↻', title: 'Recovery', description: 'If a check fails, revise context or rule and rerun the same task.' }
      ],
      footnote: 'A generated suggestion is not evidence that the policy is satisfied.'
    }),
    S('savings-model', 1, 'The 2,900 saved-hours example is assumption-driven arithmetic', {
      scene: 'terminal', pill: 'Part 1 · Illustrative estimate', termTitle: 'source README scenario',
      transcript: [
        { type: 'prompt', text: 'Platform build estimate: 40 + 60 + 80 = 180 hours invested.' },
        { type: 'user', text: 'Legacy scenario for 200 developers; savings inputs are assumptions.' },
        { type: 'response', lines: ['Instructions: 200 × 2 hours = 400', 'Skills: 200 × 5 hours = 1,000', 'Onboarding: 200 × 7.5 hours = 1,500'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Illustrative total: 400 + 1,000 + 1,500 = 2,900 hours' },
        { type: 'outcome', text: '2,900 ÷ 180 ≈ 16.1 saved-hours per invested hour' }
      ],
      footnote: 'Scenario only: validate each input locally; the ratio is not audited ROI or a measured customer result.'
    }),
    S('part-2', 2, 'Organizational Skills & Knowledge Bases', {
      scene: 'opener',
      subtitle: 'Choose the mechanism by whether the team needs a reusable method or more repository context.',
      cards: [
        { icon: '◇', title: 'Reusable method', blurb: 'Skills encode expertise' },
        { icon: '▦', title: 'Cross-repo context', blurb: 'Knowledge Bases index sources' },
        { icon: '✓', title: 'Owned updates', blurb: 'Review before reuse' }
      ],
      terminal: { context: 'Procedure is different from repository context', detail: 'Choose by the question' }
    }),
    S('skill-vs-context', 2, 'A skill supplies a method; a Knowledge Base supplies context', {
      scene: 'showdown', pill: 'Part 2 · Two knowledge jobs',
      subtitle: 'The team asks the same system question; the answer needs both an appropriate source and a method.',
      leftLabel: 'Agent Skill',
      rightLabel: 'Knowledge Base',
      pairs: [
        { left: { label: 'Encode a repeatable procedure', note: 'Review steps, validation logic, or domain checklist' }, right: { label: 'Index selected repositories', note: 'Retrieve context across approved source repos', z: 'purple' } },
        { left: { label: 'Owner versions the method', note: 'A reviewed update changes reusable guidance' }, right: { label: 'Admin curates the sources', note: 'A query can draw from multiple indexed repos', z: 'local' } },
        { left: { label: 'Inspect the skill result', note: 'Verify the proposed checks against current policy' }, right: { label: 'Inspect retrieved evidence', note: 'Confirm citations and source freshness', z: 'green' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Reusable expertise' },
      outcomeRight: { icon: '✓', label: 'Cross-repository context' },
      footnote: 'The existing talk identifies Agent Skills as GA and Knowledge Bases as Enterprise Cloud; confirm current eligibility.'
    }),
    S('skill-library', 2, 'A small skill catalog can cover repeatable work in three domains', {
      scene: 'scorecard', pill: 'Part 2 · Catalog examples',
      cards: [
        { icon: '⚖', title: 'Security and compliance', description: 'Examples: payment-processing, healthcare-data, security-scanner.' },
        { icon: '◇', title: 'Architecture and quality', description: 'Examples: architecture-review, performance-budgets, accessibility-check.' },
        { icon: '⌁', title: 'Cost and operations', description: 'Examples: cost-estimator, tech-debt-analyzer, dependency-risk.' },
        { icon: '✓', title: 'Catalog contract', description: 'Name owner, source, supported scope, validation, and update process.' }
      ],
      footnote: 'Names are illustrative examples from the source talk, not claims about shipped organization skills.'
    }),
    S('knowledge-query', 2, 'A cross-repository question needs visible sources and answer review', {
      scene: 'terminal', pill: 'Part 2 · Illustrative query', termTitle: 'multi-repository context',
      subtitle: 'An administrator curates the indexed repos; a developer inspects the answer against source files.',
      transcript: [
        { type: 'prompt', text: 'Knowledge Base: Payment Platform (illustrative source set)' },
        { type: 'user', text: '@kb payment-platform: how does fraud detection connect to the payment flow?' },
        { type: 'thinking', label: 'Copilot retrieves context:' },
        { type: 'response', lines: ['payment-api: request contract', 'payment-processor: business flow', 'fraud-detection: decision interface', 'compliance-rules: relevant control text'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Developer checks cited files and current version before relying on the answer' }
      ],
      footnote: 'Illustrative repository labels and query; indexed context is not a substitute for source review.'
    }),
    S('knowledge-maintenance', 2, 'A reviewed source update makes reusable expertise safer to reuse', {
      scene: 'relay', pill: 'Part 2 · Maintenance loop',
      subtitle: 'A domain owner proposes; a reviewer verifies; consumers inspect the published change.',
      columns: [
        { icon: '▤', title: 'Author', description: 'Maintainer ties a change to an approved source.', items: ['Name the source', 'Edit the skill', 'Record version'], z: ['local', 'purple', 'orange'] },
        { icon: '✓', title: 'Reviewer', description: 'Domain authority validates behavior and tests.', items: ['Check scope', 'Run examples', 'Approve update'], z: ['remote', 'green', 'orange'] },
        { icon: '↗', title: 'Consumer', description: 'Team checks the effective version in its work.', items: ['Read change', 'Try task', 'Report gap'], z: ['github', 'green', 'orange'] }
      ]
    }),
    S('part-3', 3, 'Governance & Licensing', {
      scene: 'opener',
      subtitle: 'Every capability depends on approved policy, current commercial terms, and accountable review.',
      cards: [
        { icon: '⚖', title: 'Model access', blurb: 'Approved choices and migration' },
        { icon: '⌁', title: 'Cost and signals', blurb: 'Terms, telemetry, tool policy' },
        { icon: '✓', title: 'Compliance', blurb: 'Automation plus human decision' }
      ],
      terminal: { context: 'Policy defines the boundary', detail: 'Reviewer decides if evidence is enough' }
    }),
    S('model-policy', 3, 'Model readiness is a policy check and a selector check', {
      scene: 'terminal', pill: 'Part 3 · Migration readiness', termTitle: 'generic readiness check',
      subtitle: 'An administrator enables an approved supported replacement; the workflow owner verifies availability.',
      transcript: [
        { type: 'prompt', text: 'Affected workflow uses a model scheduled for retirement.' },
        { type: 'user', text: 'Administrator checks organization model policy for an approved supported replacement.' },
        { type: 'response', lines: ['Enable replacement within approved policy', 'Open every affected workflow selector', 'Confirm replacement is available to its users', 'Run a representative task and review output'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Readiness evidence: policy enabled and selector verified' }
      ],
      footnote: 'The September 2026 notice is historical; this slide teaches a durable readiness check, not a current deadline.'
    }),
    S('licensing-fit', 3, 'License fit follows usage and current contract terms', {
      scene: 'scorecard', pill: 'Part 3 · Cost decision',
      cards: [
        { icon: '⌁', title: 'Frequent use', description: 'Compare seat access with observed eligible activity and current terms.' },
        { icon: '◷', title: 'Occasional use', description: 'Model actual usage and premium-request costs for the stated period.' },
        { icon: '◉', title: 'Review activity', description: 'Check the exact review access, permission, and license requirements.' },
        { icon: '!', title: 'Estimate boundary', description: 'The legacy 30–40% reduction figure lacks a documented cohort and method.' }
      ],
      footnote: 'Rebuild the cost model from your agreement and usage data; the old percentage is not a result.'
    }),
    S('telemetry-tool-governance', 3, 'The organization owner sets telemetry and tool-discovery boundaries', {
      scene: 'signals', pill: 'Part 3 · Organization-owned controls',
      subtitle: 'Security and platform owners define the allowed destination, data, and access.',
      rows: [
        { label: 'Telemetry destination', description: 'Set approved export endpoints and the owning team', tag: 'Destination', z: 'purple' },
        { label: 'Telemetry contract', description: 'Approve fields, retention, access, and interpretation', tag: 'Data boundary', z: 'local' },
        { label: 'Tool discovery', description: 'Curate a registry or disable external tool discovery', tag: 'MCP policy', z: 'remote' },
        { label: 'Repository settings', description: 'Local configuration can narrow the org boundary', tag: 'Cannot widen', z: 'orange' }
      ],
      footnote: 'Treat destination, fields, retention, access, and tool discovery as explicit organizational decisions.'
    }),
    S('compliance-evidence', 3, 'An automated check raises evidence; the accountable owner decides', {
      scene: 'showdown', pill: 'Part 3 · Compliance example',
      subtitle: 'The example is illustrative; the organization defines and approves each requirement.',
      leftLabel: 'Manual checklist',
      rightLabel: 'Automated signal plus review',
      pairs: [
        { left: { label: 'Reviewer searches for risk', note: 'The exact rule may be applied inconsistently' }, right: { label: 'Checker flags a pattern', note: 'Example: token logging or missing required test', z: 'purple' } },
        { left: { label: 'Evidence gathered later', note: 'The source and decision trail may be harder to reconstruct' }, right: { label: 'Run result is recorded', note: 'Link finding to file, rule, and test evidence', z: 'local' } },
        { left: { label: 'Human resolves finding', note: 'Service owner decides remediation and policy fit' }, right: { label: 'Human retains authority', note: 'Reviewer accepts, rejects, or escalates the evidence', z: 'orange' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Accountable human decision' },
      outcomeRight: { icon: '✓', label: 'Accountable human decision' },
      footnote: 'Example rule fragments do not establish legal compliance or replace an approved control.'
    }),
    S('human-review-boundary', 3, 'A generated suggestion is not an approval or a finding', {
      scene: 'scorecard', pill: 'Part 3 · Authority boundary',
      cards: [
        { icon: '↗', title: 'Copilot proposes', description: 'The model returns a candidate change or explanation.' },
        { icon: '⌁', title: 'Automation checks', description: 'Tests and scanners report the checks they actually ran.' },
        { icon: '✓', title: 'Owner decides', description: 'The accountable reviewer accepts, rejects, or requests more evidence.' },
        { icon: '↻', title: 'Team recovers', description: 'A failed check routes to a named owner and a repeatable rerun.' }
      ]
    }),
    S('part-4', 4, 'Adoption & Enablement', {
      scene: 'opener',
      subtitle: 'Teams specialize inside the enterprise floor, then test the effective policy and workflow evidence.',
      cards: [
        { icon: '⚖', title: 'Bound settings', blurb: 'Floor, allowed keys, team mapping' },
        { icon: '▤', title: 'Measure use', blurb: 'Directional evidence with limits' },
        { icon: '↗', title: 'Enable teams', blurb: 'Self-service and review gates' }
      ],
      terminal: { context: 'Central policy plus bounded specialization', detail: 'Verify effective settings' }
    }),
    S('managed-settings', 4, 'Administrators permit selected keys beneath a locked enterprise floor', {
      scene: 'four-phases', pill: 'Part 4 · Managed settings',
      subtitle: 'Enterprise administrators decide which keys can vary; teams own only those permitted choices.',
      stageLabel: 'Control',
      gateLabel: '✓ inspect',
      stages: [
        { label: '1', name: 'Set the floor', icon: '⌘', description: 'Administrator defines enterprise values and locked keys.' },
        { label: '2', name: 'Permit keys', icon: '⚖', description: 'Administrator marks only approved managed keys as overridable.' },
        { label: '3', name: 'Map teams', icon: '▤', description: 'Versioned files under copilot/teams/ map to team slugs.' },
        { label: '4', name: 'Inspect result', icon: '✓', description: 'Owner checks effective settings for each supported user context.', target: true }
      ],
      footnote: 'Mapping uses team-mappings.json; team specialization is license and product-surface bounded.'
    }),
    S('team-merge', 4, 'Team values merge beneath the enterprise floor by documented rules', {
      scene: 'showdown', pill: 'Part 4 · Multi-team behavior',
      subtitle: 'The administrator marks overridable keys; additive fields keep the enterprise baseline.',
      leftLabel: 'Enterprise choice',
      rightLabel: 'Mapped team result',
      pairs: [
        { left: { label: 'Locked key', note: 'Non-overridable enterprise value stays in force' }, right: { label: 'Locked key', note: 'Team file cannot change the enterprise choice', z: 'orange' } },
        { left: { label: 'Overridable key', note: 'Administrator explicitly permits specialization' }, right: { label: 'Multiple team values', note: 'Resolve to least restrictive allowed value', z: 'purple' } },
        { left: { label: 'enabledPlugins and extraKnownMarketplaces', note: 'Enterprise baseline supplies its entries' }, right: { label: 'Team entries', note: 'Lists are additive; teams can extend, not shrink', z: 'green' } }
      ],
      outcomeLeft: { icon: '⌘', label: 'Enterprise boundary remains' },
      outcomeRight: { icon: '✓', label: 'Permitted team choice is effective' },
      footnote: 'Validate behavior for users with multiple team memberships; one team file does not automatically win.'
    }),
    S('effective-config', 4, 'An administrator verifies the effective settings for a multi-team user', {
      scene: 'terminal', pill: 'Part 4 · Configuration proof', termTitle: 'illustrative configuration review',
      subtitle: 'Use a reviewed snapshot or test account; this walkthrough makes no live settings changes.',
      transcript: [
        { type: 'prompt', text: 'enterprise floor + overridable key list' },
        { type: 'user', text: 'team-mappings.json maps team files under copilot/teams/ to team slugs' },
        { type: 'response', lines: ['Resolve membership for the test user', 'Apply only administrator-approved overrides', 'Combine multi-team values by the documented rule', 'Check additive plugin and marketplace entries'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Expected decision: locked keys stay fixed; permitted keys resolve within policy' },
        { type: 'outcome', text: 'Reviewer records effective result, supported surface, and license scope' }
      ],
      footnote: 'Supported scope in the approved refresh: VS Code, Copilot CLI, Copilot App, and Copilot cloud agent with Business or Enterprise.'
    }),
    S('impact-dashboard', 4, 'The impact dashboard offers directional cohort evidence', {
      scene: 'showdown', pill: 'Part 4 · ROI measurement',
      subtitle: 'The viewer checks access and treats modeled figures as directional inputs.',
      leftLabel: 'Dashboard inputs',
      rightLabel: 'Interpretation boundary',
      pairs: [
        { left: { label: 'Early-phase and agent-first cohorts', note: 'Compare product-defined developer groups' }, right: { label: 'Corrected 28-day cohort', note: 'Includes every active user in the window', z: 'purple' } },
        { left: { label: 'Cost, payroll share, PRs per developer', note: 'Salary control models local compensation' }, right: { label: 'AI-credit estimate plus salary input', note: 'Directional model, not audited savings', z: 'orange' } },
        { left: { label: 'Enable usage metrics policy', note: 'Viewer needs View Copilot Metrics permission' }, right: { label: 'Pair with delivery context', note: 'Dashboard cohort correction does not change API or NDJSON exports', z: 'green' } }
      ],
      outcomeLeft: { icon: '✓', label: 'Product-backed comparison' },
      outcomeRight: { icon: '!', label: 'Direction, not attribution' },
      footnote: 'The ROI section requires the usage metrics policy and View Copilot Metrics permission.'
    }),
    S('agent-activity', 4, 'Join recognized agent activity on agent_id and count interactions once', {
      scene: 'terminal', pill: 'Part 4 · Usage report fields', termTitle: 'representative report shape',
      subtitle: 'A metrics owner joins history on the stable identifier, not the mutable display name.',
      transcript: [
        { type: 'prompt', text: 'totals_by_3rd_party_agent[]' },
        { type: 'response', lines: ['agent_id: stable join key', 'display_name: label can change', 'job_starts and session_count: aggregate activity', 'nested user_initiated_interaction_count: do not add to top-level total'] },
        { type: 'divider' },
        { type: 'outcome', text: 'Join recognized activity by agent_id' },
        { type: 'outcome', text: 'Per-user rows omit session_count; unidentified agents may be omitted' },
        { type: 'outcome', text: 'Array may be absent when there is no agent activity' }
      ],
      footnote: 'Use the report schema and period that match your analysis; this is activity evidence, not productivity attribution.'
    }),
    S('measure-movement', 4, 'Adoption, workflow movement, and business outcomes answer different questions', {
      scene: 'four-phases', pill: 'Part 4 · Measurement model',
      subtitle: 'The measurement owner defines local baselines and targets before reading a trend.',
      stageLabel: 'Signal',
      gateLabel: '✓ compare',
      stages: [
        { label: '1', name: 'Adoption', icon: '⌁', description: 'Active users, acceptance, and feature activity show reach.' },
        { label: '2', name: 'Workflow', icon: '↗', description: 'PR flow, review time, and cycle time show process movement.' },
        { label: '3', name: 'Business', icon: '◇', description: 'Delivery, satisfaction, and cost per feature add context.' },
        { label: '4', name: 'Decision', icon: '✓', description: 'Compare with local baseline and guardrail before changing investment.', target: true }
      ],
      footnote: 'Legacy README targets such as 55–65% acceptance and 80% seat use are proposed targets, not universal benchmarks.'
    }),
    S('onboarding-kit', 4, 'A 30-minute quick start is a testable onboarding design', {
      scene: 'relay', pill: 'Part 4 · Self-service kit',
      subtitle: 'The kit makes setup reproducible; the team measures whether the first task succeeds.',
      columns: [
        { icon: '▤', title: 'Read · 10 min', description: 'Team reads scope, access, and standards.', items: ['Quick start', 'Local prerequisites', 'Support route'], z: ['local', 'purple', 'orange'] },
        { icon: '⌘', title: 'Configure · 10 min', description: 'Team applies templates to its repository.', items: ['Repo setup', 'Instructions', 'Skills catalog'], z: ['purple', 'local', 'green'] },
        { icon: '✓', title: 'Exercise · 10 min', description: 'Team validates one real task and records evidence.', items: ['Run task', 'Inspect diff', 'Confirm checks'], z: ['remote', 'green', 'orange'] }
      ]
    }),
    S('rollout-gates', 4, 'A bounded pilot earns expansion through reviewed evidence', {
      scene: 'four-phases', pill: 'Part 4 · Adoption rollout',
      subtitle: 'The platform owner expands only after a real team verifies the pattern and recovery path.',
      stageLabel: 'Gate',
      gateLabel: '✓ evidence',
      stages: [
        { label: '1', name: 'Select', icon: '⌖', description: 'Choose a repeated task with an owner and measurable check.' },
        { label: '2', name: 'Pilot', icon: '⌁', description: 'Apply the shared artifact to a bounded team workflow.' },
        { label: '3', name: 'Inspect', icon: '✓', description: 'Review outcomes, support demand, failures, and recovery.' },
        { label: '4', name: 'Expand', icon: '↗', description: 'Publish the tested version and monitor local fit.', target: true }
      ],
      footnote: 'The source README suggests phases from pilot to wider adoption; its month ranges are planning examples, not guarantees.'
    }),
    S('community-loop', 4, 'A community of practice turns local findings into reviewed patterns', {
      scene: 'relay', pill: 'Part 4 · Federated learning',
      subtitle: 'Teams contribute examples; the maintainer curates the catalog and records its review status.',
      columns: [
        { icon: '◇', title: 'Team finding', description: 'A team shares a reusable result and its context.', items: ['Show artifact', 'Name boundary', 'Share evidence'], z: ['local', 'orange', 'green'] },
        { icon: '✓', title: 'Maintainer review', description: 'An owner checks applicability and source freshness.', items: ['Check source', 'Test example', 'Approve update'], z: ['purple', 'green', 'orange'] },
        { icon: '▤', title: 'Shared catalog', description: 'Peers find the version and contribute corrections.', items: ['Publish pattern', 'Link owner', 'Review quarterly'], z: ['github', 'purple', 'orange'] }
      ]
    }),
    S('investment-math', 4, 'The 16.1 ratio is saved-hours arithmetic, not audited ROI', {
      scene: 'terminal', pill: 'Part 4 · Illustrative investment model', termTitle: 'legacy source scenario',
      transcript: [
        { type: 'prompt', text: 'Estimated platform effort: instructions 40 + skills 60 + onboarding 80 = 180 hours.' },
        { type: 'user', text: 'Illustrative savings assumptions for 200 developers:' },
        { type: 'response', lines: ['Instructions: 200 × 2 = 400 hours', 'Skills: 200 × 5 = 1,000 hours', 'Onboarding: 200 × (8 − 0.5) = 1,500 hours'] },
        { type: 'divider' },
        { type: 'outcome', text: '2,900 estimated saved hours ÷ 180 estimated hours = 16.1 ratio' },
        { type: 'outcome', text: 'Validate time, adoption, quality, and costs in your own workflow' }
      ],
      footnote: 'Illustration from the source README. It is not audited attribution, a verified deployment, or a customer result.'
    }),
    S('when-pattern-fits', 4, 'The pattern fits repeated shared work with an owner and a local boundary', {
      scene: 'signals', pill: 'Part 4 · Fit and boundary',
      subtitle: 'A platform team can start small; each team retains authority where requirements differ.',
      rows: [
        { label: 'Shared work', description: 'Several repositories need the same maintained rule', tag: 'Candidate', z: 'purple' },
        { label: 'Known authority', description: 'A maintainer can approve and update the shared source', tag: 'Owner', z: 'local' },
        { label: 'Observable check', description: 'A test, review, or metric reveals whether it helps', tag: 'Evidence', z: 'green' },
        { label: 'Needs diverge', description: 'Team context changes the correct answer or control', tag: 'Specialize', z: 'orange' },
        { label: 'No owner', description: 'Pause, assign ownership, or narrow scope', tag: 'Escalate', z: 'remote' }
      ],
      footnote: 'The source suggests 10–20 successful teams as a directional readiness heuristic, not a universal threshold.'
    }),
    S('before-after', 0, 'Move from repeated setup to an owned baseline with bounded choice', {
      scene: 'before-after', pill: 'The operating shift',
      before: [
        'Each team repeats common instruction setup',
        'Shared expertise sits in separate examples',
        'Policy boundaries remain implicit',
        'Usage totals stand in for impact'
      ],
      after: [
        'An owner maintains the common baseline',
        'Skills and indexed context have separate jobs',
        'Permitted team choices are explicit and tested',
        'Product signals retain their limits'
      ],
      metrics: [
        { value: '2,000 h', detail: 'scenario: 50 × 40, not measured' },
        { value: '16.1×', detail: 'illustrative saved-hours ratio' },
        { value: 'agent_id', detail: 'stable activity join key' }
      ]
    }),
    S('today', 0, 'Start with one rule, one owner, and one visible check', {
      scene: 'today',
      horizons: [
        { icon: '⌘', label: 'Today', z: 'green', items: ['Choose one repeated repository rule', 'Name its approving owner', 'Write one observable acceptance check'] },
        { icon: '▤', label: 'This Week', z: 'local', items: ['Test the rule on a representative task', 'Inspect the diff and check result', 'Record the recovery path'] },
        { icon: '↗', label: 'This Month', z: 'purple', items: ['Pilot with a bounded team', 'Compare with a local baseline', 'Expand only with reviewed evidence'] }
      ],
      takeaway: 'Transfer question: which rule in your repository deserves a shared owner, and what evidence will tell you it fits?'
    }),
    S('references', 0, 'First-party references and release evidence', {
      groups: [
        { icon: '📖', title: 'Administration and standards', z: 'local', items: [
          { href: 'https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization', label: 'Managing Copilot in your organization', description: 'Administration and organization policies.' },
          { href: 'https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot#adding-organization-wide-custom-instructions', label: 'Organization-wide custom instructions', description: 'Organization-scoped instruction setup.' },
          { href: 'https://agents.md/', label: 'AGENTS.md open format', description: 'Portable agent guidance format.' },
          { href: 'https://code.visualstudio.com/docs/enterprise/ai-settings', label: 'Configure AI settings for an enterprise', description: 'Enterprise AI configuration.' }
        ] },
        { icon: '⚖', title: 'Security, usage, and managed settings', z: 'purple', items: [
          { href: 'https://code.visualstudio.com/docs/copilot/security', label: 'Security considerations for AI in VS Code', description: 'Security considerations and controls.' },
          { href: 'https://docs.github.com/en/rest/copilot/copilot-metrics', label: 'Copilot metrics REST API', description: 'Usage metrics and activity reporting.' },
          { href: 'https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings', label: 'Enterprise team specialization for managed settings', description: 'Team mappings, overrides, and merge behavior.' },
          { href: 'https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity', label: 'Copilot usage metrics API adds agent app activity', description: 'Recognized agent activity fields and caveats.' }
        ] },
        { icon: '◇', title: 'ROI and time-bound notices', z: 'remote', items: [
          { href: 'https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section', label: 'Copilot impact dashboard ROI section', description: 'Directional cohort comparison and modeled inputs.' },
          { href: 'https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot', label: '2026 model deprecation notice', description: 'Historical migration-readiness example; deadline has passed.' },
          { href: 'https://code.visualstudio.com/updates/v1_121', label: 'VS Code release notes: v1.121', description: 'First-party release record.' },
          { href: 'https://code.visualstudio.com/updates/v1_122', label: 'VS Code release notes: v1.122', description: 'First-party release record.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Scaling GitHub Copilot Across Organizations', {
      scene: 'thanks', chrome: false, visual: 'org-ring',
      subtitle: 'Set the shared floor. Bound team choices. Review the evidence.',
      cards: [
        { value: 'Scope', detail: 'Put each rule where its owner can maintain it' },
        { value: 'Authority', detail: 'Name who can approve, specialize, or escalate' },
        { value: 'Evidence', detail: 'Test locally; keep estimates labeled' }
      ],
      prompt: 'Which rule will your team test first?'
    })
  ];

  const SRC = {
    admin: { label: 'Managing Copilot in your organization', href: 'https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization' },
    instructions: { label: 'Organization-wide custom instructions', href: 'https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot#adding-organization-wide-custom-instructions' },
    metrics: { label: 'Copilot metrics REST API', href: 'https://docs.github.com/en/rest/copilot/copilot-metrics' },
    agentsmd: { label: 'AGENTS.md open format', href: 'https://agents.md/' },
    skills: { label: 'GitHub Copilot documentation', href: 'https://docs.github.com/en/copilot' },
    aiSettings: { label: 'Configure AI settings for an enterprise', href: 'https://code.visualstudio.com/docs/enterprise/ai-settings' },
    security: { label: 'Security considerations for AI in VS Code', href: 'https://code.visualstudio.com/docs/copilot/security' },
    roi: { label: 'Copilot impact dashboard ROI section', href: 'https://github.blog/changelog/2026-08-07-copilot-impact-dashboard-adds-a-return-on-investment-section' },
    agentActivity: { label: 'Copilot usage metrics API adds agent app activity', href: 'https://github.blog/changelog/2026-08-07-copilot-usage-metrics-api-adds-agent-app-activity' },
    managed: { label: 'Enterprise team specialization for managed settings', href: 'https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings' },
    migration: { label: '2026 Copilot model deprecation notice', href: 'https://github.blog/changelog/2026-07-31-upcoming-august-2026-model-deprecations-in-github-copilot' },
    v121: { label: 'VS Code release notes v1.121', href: 'https://code.visualstudio.com/updates/v1_121' },
    v122: { label: 'VS Code release notes v1.122', href: 'https://code.visualstudio.com/updates/v1_122' }
  };

  const NOTES = {
    title: { seconds: 45, sources: [SRC.admin, SRC.instructions],
      notes: [
        '"A shared Copilot practice becomes an organizational capability when its source has an owner and teams can verify what changes."',
        'Point to the central organization node, then the repository ring. The ring represents reach, not proof that every repository has adopted or validated a rule.',
        '→ Start with the question a platform team faces when successful local patterns need to scale.'
      ],
      know: [
        'The ring is a teaching visual. It does not represent a measured deployment, a product topology, or automatic enforcement.',
        'The talk keeps the approved thesis: standards, governance, knowledge sharing, and measurement can support adoption across teams.'
      ] },
    'core-question': { seconds: 90, sources: [SRC.admin, SRC.instructions, SRC.metrics],
      notes: [
        '"How do I scale Copilot across our teams without losing consistency, team choice, or proof? That is the decision we will work through."',
        'Point out the three roles. Platform owners maintain the shared source; repository teams add local context; service owners accept or escalate evidence.',
        '"The four stops are scope, shared expertise, governed choices, and evidence. Each gives us a practical question to answer."',
        '→ First, choose where each standard belongs.'
      ],
      know: [
        'The four routing terms are an editorial decision model, not product terminology.',
        'The audience includes platform engineers, security practitioners, architects, and engineering leaders. No individual persona or customer is implied.'
      ] },
    contents: { seconds: 30,
      notes: [
        '"We will place the shared rules, choose how knowledge travels, define the governance boundary, and finish with proof and transfer."',
        'Use the slide links to preview the section starts. The slide numbers in the cards point to slides 4, 12, 17, and 23.',
        '→ Part 1 starts with the scope decision.'
      ] },
    'part-1': { seconds: 25, sources: [SRC.instructions, SRC.agentsmd],
      notes: [
        '"The useful baseline starts with one question: which owner and scope can keep this rule current?"',
        'The three cards order this section: choose scope, publish context, review evidence.',
        '→ The source talk uses 50 teams and 40 hours to frame the repetition opportunity; we will label the arithmetic as a scenario.'
      ] },
    'reinvention-case': { seconds: 103,
      notes: [
        '"Fifty teams times forty hours gives two thousand hours in this scenario. The multiplication is sound; the inputs are assumptions."',
        'Point to the evidence-status card. The source README does not cite a time study or a measured organization, so this is not an observed result.',
        'Ask which repeated setup work exists locally: duplicated instruction drafting, standards research, or review preparation. Replace the assumed inputs with a local baseline.',
        '→ Once a repeated task is real, choose the correct configuration scope.'
      ],
      know: [
        'Scenario calculation: 50 × 40 = 2,000 hours of potential repeated effort.',
        'The 40-hours-per-team figure is a legacy source estimate without a defined sample, period, or measurement method. Do not present it as a benchmark.',
        'The decision to standardize depends on shared requirements, a maintainer, and evidence that the rule helps.'
      ] },
    'standard-selection': { seconds: 93, sources: [SRC.instructions, SRC.agentsmd],
      notes: [
        '"Choose the selector by the audience for the rule: organization, repository, file pattern, or directory."',
        'Follow each row from the scope question to its target. Organization-wide custom instructions carry common Copilot guidance; repository instructions add project context; applyTo files target matching files; nearest AGENTS.md carries directory-local workflow guidance.',
        '"These files guide the model. Tests, policy, and reviewers still determine whether the change is acceptable."',
        '→ Topology changes how teams maintain those layers.'
      ],
      know: [
        'Organization-wide custom instructions are managed in organization settings and are intended to provide a baseline across repositories.',
        'A repository instruction file is `.github/copilot-instructions.md`; file-pattern instruction files use `.github/instructions/*.instructions.md` with `applyTo` metadata.',
        'AGENTS.md is an open format for agent guidance. A nearest directory playbook can provide local commands and guardrails; verify surface-specific support before relying on it.',
        'The source README calls local instruction layers overrides. This deck uses the safer term local context and does not promise that local guidance overrides an organization rule.'
      ] },
    'repo-topology': { seconds: 93, sources: [SRC.instructions, SRC.agentsmd],
      notes: [
        '"In polyrepos, the organization baseline crosses repository lifecycles. Each repository owner adds the service details."',
        '"In a monorepo, a shared root can carry common context while file patterns and nested playbooks keep package-specific commands close to the code."',
        'Point at the two green outcomes: each topology preserves a common floor and local ownership.',
        '→ Let us see what an illustrative rule looks like when Copilot proposes a change.'
      ],
      know: [
        'Polyrepo example from the README: organization instructions and repo `.github/copilot-instructions.md`, plus optional root AGENTS.md.',
        'Monorepo example from the README: repository instruction at root, `.github/instructions/*.instructions.md` for file patterns, and nested `frontend/`, `backend/`, or `infra/` AGENTS.md playbooks.',
        'These examples describe placement patterns, not a required universal repository layout.'
      ] },
    'instruction-artifact': { seconds: 123, sources: [SRC.instructions, SRC.admin],
      notes: [
        '"Here is an illustrative security rule: use the approved authentication helper and never log access tokens."',
        'The task is an API handler. Copilot proposes a change and a focused test; the service owner reviews the diff and the required checks.',
        '"The rule shapes context. The test and review are the evidence; the prompt alone does not enforce the policy."',
        'Cue: present a saved example or static diff. Do not change organization settings or install anything live.',
        '→ The next slide makes those authority handoffs explicit.'
      ],
      know: [
        'The example is a generic configuration fragment, not a production-ready security policy. A security owner must specify approved helper names and requirements.',
        'The previous long README contained detailed sample values for OAuth, encryption, framework choices, testing, accessibility, and performance. Those values are examples only; local domain owners define approved standards.',
        'The legacy sample named OAuth 2.0 with PKCE, AES-256 at rest, Azure Key Vault, parameterized SQL, React 18 with TypeScript, Node.js 20 LTS, Jest, Playwright, 80% coverage, WCAG 2.1 AA, Lighthouse above 90, a two-second 3G page-load target, and a 200 KB gzipped bundle budget. These are illustrative values from the old draft, not current product requirements or approved security guidance.',
        'Organization-wide instruction documentation is the source for configuration behavior. A configuration is not itself a runtime test or enforcement mechanism.'
      ],
      cue: ['Use a saved instruction fragment and a representative diff. Keep the walkthrough read-only; show the reviewer check beside the proposed output.'] },
    'authority-scope': { seconds: 98, sources: [SRC.admin, SRC.instructions],
      notes: [
        '"The platform owner approves a shared rule; the repository owner tests how it fits the service; the service owner accepts or escalates the result."',
        'Move from left to right across the three lanes. The work packet contains the source, local check, and accepting reviewer.',
        'This is a recommended responsibility split, not a GitHub role mapping.',
        '→ A review loop makes the rule observable.'
      ],
      know: [
        'The source README proposed a federated pattern: platform team owns shared infrastructure, teams customize locally, and a community shares findings.',
        'The exact approval workflow is organization-specific. Identify actual owners and escalation routes before adopting the pattern.',
        'The source also proposes a monthly pattern-sharing session and quarterly metrics review; these are operating practices, not product features.'
      ] },
    'verification-loop': { seconds: 103, sources: [SRC.instructions, SRC.security],
      notes: [
        '"A reviewer checks the approved rule and the resulting change together."',
        'Name four separate signals: the input rule, Copilot proposal, automated test results, and human acceptance. A green check from a tool is not the same as a policy decision.',
        '"When evidence fails, revise the context or the rule, then rerun the representative task."',
        '→ The original hours-saved story also needs its inputs visible.'
      ],
      know: [
        'The source long README gives example quality baselines such as accessibility checks, performance budgets, and minimum test coverage. Those are illustrative; each organization owns its standards.',
        'Evidence can include test output, static analysis, a diff review, an audit trail, or a local process metric. Select evidence that answers the claimed behavior.',
        'A skills/checklist example must not be described as automatic compliance unless an approved control actually enforces it.'
      ] },
    'savings-model': { seconds: 113,
      notes: [
        '"The source estimates 180 hours to build instructions, skills, and onboarding. It then assumes three categories of savings for two hundred developers."',
        'Walk the terms: 400 hours for instructions, 1,000 for skills, and 1,500 for onboarding. Their sum is 2,900. Dividing by 180 yields about 16.1 saved-hours per invested hour.',
        '"That ratio is scenario arithmetic, not audited ROI. Recalculate both effort and savings with your own workflow data."',
        '→ Part 2 separates the two mechanisms that carry shared knowledge.'
      ],
      know: [
        'The source README inputs are 40 + 60 + 80 = 180 platform hours; 200 developers × 2 instruction hours = 400; × 5 skill hours = 1,000; and 200 × (8 − 0.5) onboarding hours = 1,500.',
        'The 2,900 total equals 16.11 times 180 as gross saved-hours divided by invested-hours. This is not a conventional net ROI calculation and excludes ongoing maintenance, adoption, quality, and salary costs.',
        'The separate 50 × 40 = 2,000 estimate uses different assumptions; do not add the two totals or imply one was observed.',
        'The long README also contains a conflicting 50x first-year calculation with unsupported inputs. It is not repeated as a result.'
      ] },
    'part-2': { seconds: 25, sources: [SRC.skills],
      notes: [
        '"Shared knowledge has two jobs here: teach a reusable method or retrieve context from selected repositories."',
        'The distinction protects both the source and the expected output.',
        '→ Compare the mechanisms by their job.'
      ] },
    'skill-vs-context': { seconds: 98, sources: [SRC.skills, SRC.admin],
      notes: [
        '"A skill encodes a reusable procedure. A Knowledge Base supplies context from selected repositories."',
        'Read across each pair. A method has an owner and version; indexed context has curated sources. Each still needs inspection before a team relies on the result.',
        '"The source talk marks Agent Skills as generally available and Knowledge Bases as Enterprise Cloud. Confirm current eligibility for your plan."',
        '→ A catalog works best when it stays small and owned.'
      ],
      know: [
        'The source describes organization-level Agent Skills under `.github/skills/`, centrally versioned and reusable. Confirm the current product details in official documentation before rollout.',
        'The source describes Knowledge Bases as named collections of indexed repositories queried through Copilot Chat on GitHub.com. The visible `@kb payment-platform` query is illustrative; confirm the current interface before use.',
        'Knowledge Bases are identified by the approved recipe as Enterprise Cloud only. Product eligibility can change; verify before planning an install or purchase.',
        'Skills and Knowledge Bases are not the managed-settings control plane. Managed settings govern selected enterprise configuration choices.'
      ] },
    'skill-library': { seconds: 108, sources: [SRC.skills, SRC.security],
      notes: [
        '"These catalog names group repeated work into security, architecture, quality, cost, and operations."',
        'Point to the catalog contract. A name without a source owner, supported scope, validation, and update path can become stale guidance.',
        'The skill names shown are illustrative; no real organization library is claimed.',
        '→ A Knowledge Base handles a different question: where is the relevant system context?'
      ],
      know: [
        'Examples carried from the source README: payment-processing, healthcare-data, security-scanner, architecture-review, performance-budgets, accessibility-check, cost-estimator, tech-debt-analyzer, and dependency-risk.',
        'The longer README gives use cases for security validation, compliance checks, architecture review, performance budgets, accessibility validation, and cloud-cost estimation.',
        'Examples mentioning PCI or HIPAA require review by the organization security or compliance authority. A skill name does not establish regulatory compliance.'
      ] },
    'knowledge-query': { seconds: 103, sources: [SRC.admin, SRC.skills],
      notes: [
        '"The administrator curates the source repositories. The developer asks a question across that selected context."',
        'Read the repository labels as an illustrative microservice set. Copilot returns material; the developer checks cited files and versions before using the answer.',
        '"Indexed context saves manual reconstruction only when the sources are current and the answer remains verifiable."',
        '→ Reusable expertise also needs a source and update path.'
      ],
      know: [
        'The source README describes cross-repository context across API contracts, business logic, schemas, infrastructure, compliance rules, and platform docs.',
        'Its example lists payment-api, payment-processor, fraud-detection, compliance-rules, and platform-docs. These names represent a hypothetical architecture, not a customer deployment.',
        'The legacy README mentions 5–50 indexed repositories as a use-case range. Treat that as illustrative, not a product limit or promise.',
        'A knowledge answer can omit relevant sources or reflect stale content. Inspect source links, repository freshness, and the actual contract before relying on it.'
      ] },
    'knowledge-maintenance': { seconds: 88, sources: [SRC.skills],
      notes: [
        '"A domain owner proposes a change; a reviewer tests it; consumers see which version changed."',
        'Follow the handoff: source, scope, example, approval, then consumer feedback.',
        'This loop is a recommended maintenance practice, not a built-in automatic propagation guarantee.',
        '→ Part 3 moves from reusable knowledge to governed choices.'
      ],
      know: [
        'The source README claims centrally updated expertise can reach every team using it. In practice, propagation depends on the product surface, repository setup, versioning, and adoption path.',
        'A review record can identify the requirement, change, test evidence, owner, and affected consumers.',
        'When a skill changes regulated or security behavior, the designated domain authority decides whether the new version is acceptable.'
      ] },
    'part-3': { seconds: 25, sources: [SRC.admin, SRC.aiSettings],
      notes: [
        '"Governance makes the approved boundary visible before teams depend on a capability."',
        'Point across model access, cost and signals, and compliance review.',
        '→ Start with the readiness check that remains useful after a model name changes.'
      ] },
    'model-policy': { seconds: 108, sources: [SRC.admin, SRC.migration],
      notes: [
        '"An administrator enables an approved supported replacement in policy. The workflow owner confirms it appears in the selector."',
        'Walk each step: policy, selector, representative task, output review. Each is a separate observable check.',
        'The announcement in the reference set was for September 2026, which has passed. This slide keeps the migration method and avoids a stale deadline.',
        '→ A valid capability also has to fit the license and current contract.'
      ],
      know: [
        'The original approved content described a model retirement notice and advised enabling an approved replacement before affected workflows depend on it. It required no cleanup after retired models were removed.',
        'The notice URL and date are historical. Verify current supported models, policy controls, and migration requirements from current documentation.',
        'The original talk also covers model allow/restrict policy, auto-selection within policy, and model usage review. Current availability and routing behavior depend on product settings and supported models.',
        'A replacement appearing in one selector does not prove availability in all affected workflows, accounts, or surfaces.'
      ] },
    'licensing-fit': { seconds: 93, sources: [SRC.admin],
      notes: [
        '"Start from observed use and the contract you have today. Separate frequent, occasional, and review activity."',
        'The source README proposed a mix of full seats, usage-based access, and review-only access. Confirm the current commercial terms and feature access for every category.',
        '"The old 30 to 40 percent reduction has no stated cohort or calculation here, so treat it as an unverified legacy estimate."',
        '→ Cost visibility also depends on data destinations and tool policy.'
      ],
      know: [
        'The Slidev source headline claimed 30–40% cost reduction but provided no calculation. It is preserved as an explicitly unverified legacy estimate, not as evidence.',
        'The README lists frequent developers, occasional contractors or reviewers, and review-only users as possible categories. These are usage categories, not named personas or current licensing advice.',
        'The legacy example allocates 80 full seats, 40 usage-based accounts, and 80 review-only users in a 200-person organization. This is a hypothetical allocation, not a verified product entitlement or price comparison.',
        'Check current commercial terms, feature eligibility, premium request billing, and review access with the authoritative plan documentation and contract.'
      ] },
    'telemetry-tool-governance': { seconds: 108, sources: [SRC.aiSettings, SRC.security],
      notes: [
        '"The organization owner defines where telemetry goes, which fields leave, how long they remain, and who can access them."',
        '"The same owner sets tool discovery: a curated registry when approved tools need to be discoverable, or disabled discovery when external tool execution is outside policy."',
        'Point to the boundary: repository configuration can narrow the allowed organization behavior; it cannot widen the approved boundary.',
        '→ Automation can report a signal, while a human owner decides what it means.'
      ],
      know: [
        'The source README frames OpenTelemetry export as an organization-owned contract over destinations, fields, retention, and access.',
        'It also describes enterprise policy for MCP discovery: use a curated registry or disable MCP when external tool execution is disallowed. Verify exact controls in current enterprise settings.',
        'Telemetry collection and tool discovery are distinct controls. Do not imply that one setting configures the other.',
        'Avoid exporting secrets or sensitive data; security and privacy owners define approved data handling.'
      ] },
    'compliance-evidence': { seconds: 118, sources: [SRC.security, SRC.admin],
      notes: [
        '"An automated check can flag a possible issue and attach the rule, file, and test evidence."',
        'The accountable reviewer still determines policy fit and remediation. A skill or agent name does not certify compliance.',
        '"Keep the example illustrative: actual legal, security, and data-handling requirements come from your approved control owners."',
        'The old README contained claims about faster reviews, fewer violations, and audit savings without a cited study. Those outcomes are not repeated as facts.',
        '→ The next slide separates proposal, test status, and approval.'
      ],
      know: [
        'The source contains illustrative PCI and HIPAA examples: card masking, encryption, tokenization, audit logging, PHI access checks, and retention. Domain owners must define exact requirements and evidence.',
        'The source also contains invented-sounding financial and healthcare case-study outcomes, including violation reductions, review-time improvements, and dollar savings. No first-party evidence or attributable measurement was supplied; they are excluded as factual claims.',
        'A code review or agent skill may assist with evidence collection. It does not replace the required accountable reviewer or independently establish legal compliance.'
      ] },
    'human-review-boundary': { seconds: 93, sources: [SRC.security],
      notes: [
        '"Copilot proposes. Automation reports the checks it actually ran. The accountable owner makes the acceptance decision."',
        'Point to the four stages and name recovery: when a check fails, the team gathers the missing evidence, fixes the artifact, and reruns the check.',
        'Keep tool status separate from domain result. A test can pass while a reviewer rejects the change.',
        '→ Part 4 makes the enterprise floor and team specialization concrete.'
      ],
      know: [
        'The source README lists feature and repository access, model access by team or role, audit logging, content filtering, approved-library controls, training settings, data residency, and interaction-log retention as governance topics. Each capability and policy depends on the actual product configuration and organization agreement.',
        'Do not claim content filtering blocks every risky suggestion, an agent catches every vulnerability, or a checklist automatically satisfies regulation.',
        'Escalation owner and recovery procedure are organization-specific; name them before adoption.'
      ] },
    'part-4': { seconds: 25, sources: [SRC.managed, SRC.roi],
      notes: [
        '"Managed settings provide a specific control plane: an enterprise floor, explicitly permitted team choices, and a way to inspect the effective result."',
        'The section then connects that boundary to directional evidence and a self-service path.',
        '→ Begin with what the administrator can lock and permit.'
      ] },
    'managed-settings': { seconds: 123, sources: [SRC.managed],
      notes: [
        '"The enterprise administrator defines the policy floor and marks only selected keys overridable."',
        'Follow the four stages: set the floor, permit keys, map team files under copilot/teams/ to team slugs, then inspect the effective configuration.',
        '"A mapped team can specialize a permitted value. Non-overridable enterprise choices remain locked."',
        'Cue: use a saved configuration or read-only screenshot. Do not write to enterprise settings or create team mappings live.',
        '→ The merge result depends on the documented key type and team membership.'
      ],
      know: [
        'The approved update identifies team settings under `copilot/teams/` mapped to team slugs through `team-mappings.json`.',
        'Enterprise administrators explicitly mark keys overridable. Non-overridable enterprise settings remain locked.',
        'The approved release notes identify enforcement across VS Code, Copilot CLI, the Copilot App, and Copilot cloud agent with Business or Enterprise licenses.',
        'This is a product-specific managed-settings control plane. It is separate from skills and knowledge bases.'
      ],
      cue: ['Walk through a saved example only. Keep the view read-only and show the enterprise floor, approved override list, team mapping, and effective result.'] },
    'team-merge': { seconds: 103, sources: [SRC.managed],
      notes: [
        '"A locked enterprise key stays fixed. An administrator-permitted key can specialize beneath that boundary."',
        '"For multiple mapped teams, supported values combine by the least restrictive allowed value. enabledPlugins and extraKnownMarketplaces are additive."',
        'Point to the enterprise baseline on the left and the effective result on the right. Verify the actual key behavior before relying on it.',
        '→ A multi-team test account makes the merge observable.'
      ],
      know: [
        'The approved changelog says multiple team settings combine using the least restrictive value beneath enterprise policy.',
        '`enabledPlugins` and `extraKnownMarketplaces` are additive: teams can grow, but cannot shrink, the enterprise baseline.',
        '“Least restrictive” does not mean “ignore enterprise policy.” It applies only to keys that the administrator marks overridable.',
        'Users with multiple memberships need an effective-settings check; never infer precedence from one team file alone.'
      ] },
    'effective-config': { seconds: 108, sources: [SRC.managed],
      notes: [
        '"The administrator resolves a test user’s team memberships, applies only permitted overrides, and records the effective result."',
        'Point at the expected decision: locked values stay fixed; permitted values follow the documented merge rule; additive lists preserve the enterprise entries.',
        '"The check also records surface and license, because the feature boundary matters."',
        'This is a static walkthrough. It makes no cloud or policy changes.',
        '→ With authority explicit, the impact dashboard can contribute a separate evidence stream.'
      ],
      know: [
        'The example is a review procedure, not a deployable managed-settings payload. Exact schema and file values must come from current documentation.',
        'Approved support boundary from the 2026-08-03 changelog: VS Code, Copilot CLI, Copilot App, and Copilot cloud agent for Business or Enterprise licenses.',
        'A useful record includes user/team context, key classification, source files, effective value, client surface, license, and reviewer.'
      ] },
    'impact-dashboard': { seconds: 108, sources: [SRC.roi],
      notes: [
        '"The impact dashboard compares early-phase and agent-first cohorts with cost, payroll, and pull-request inputs."',
        'The viewer first needs the Copilot usage metrics policy enabled and View Copilot Metrics permission.',
        '"Treat the output as directional: AI-credit cost is estimated and salary is a modeling input. Pair it with delivery context; do not call it audited savings."',
        'The 28-day cohort correction includes every active user in the window and does not alter API or NDJSON exports.',
        '→ Agent app activity is a separate usage-report field family.'
      ],
      know: [
        'The 2026-08-07 first-party announcement describes ROI cohort comparison for enterprise and organization dashboards using cost per developer per month, payroll share, and pull requests per developer, with a salary modeling control.',
        'Prerequisites: Copilot usage metrics policy enabled and the viewer has View Copilot Metrics permission.',
        'GitHub describes AI-credit costs and salary as directional model inputs, not audited attribution.',
        'The corrected 28-day dashboard cohort includes every active user in that window. The announcement says the correction does not change API or NDJSON exports.'
      ] },
    'agent-activity': { seconds: 123, sources: [SRC.metrics, SRC.agentActivity],
      notes: [
        '"Join recognized agent-app history on agent_id, because display names can change."',
        'Point at the exact array and fields: totals_by_3rd_party_agent, agent_id, display_name, job_starts, and aggregate session_count.',
        '"Do not add nested user_initiated_interaction_count to the top-level field with the same name."',
        'Per-user entries omit session_count; unidentified agents may be omitted; no activity can mean the array is absent.',
        '→ Put product use, workflow movement, and business outcomes into separate measurement layers.'
      ],
      know: [
        'The 2026-08-07 usage-metrics changelog describes optional `totals_by_3rd_party_agent` in enterprise and organization usage reports.',
        'Use stable `agent_id` for historical joins; `display_name` is a mutable label. Fields include job starts and aggregate session counts.',
        'Do not add nested `user_initiated_interaction_count` to the top-level field of the same name.',
        'Per-user entries omit `session_count`; unidentified agents are omitted; the array is absent when there is no agent activity.',
        'The source does not establish that activity counts measure productivity, quality, or business impact.'
      ] },
    'measure-movement': { seconds: 103, sources: [SRC.metrics, SRC.roi],
      notes: [
        '"Leading signals tell us who uses the capability. Workflow signals tell us whether the process moves. Business measures add delivery context."',
        'The source README proposed example targets: 55–65 percent acceptance and 80 percent seat utilization. Those are proposed local targets, not universal benchmarks.',
        '"A measurement owner defines the baseline, period, guardrail, and action before interpreting a change."',
        '→ A self-service kit turns the tested pattern into a repeatable first task.'
      ],
      know: [
        'The long README lists acceptance, active seats, chat/agent usage, PR velocity, review time, bug-fix cycle, time to market, satisfaction, and cost per feature.',
        'It also includes AI-generated code share and documentation coverage. Pair those with adoption, delivery, quality, and cost measures rather than using one usage total as a productivity result.',
        'Legacy values such as acceptance 55–65%, utilization 80%+, PR velocity +30–50%, cost per feature −25–35%, and example dashboard values are not sourced benchmarks. Use them only as historical draft targets or placeholders, never as achieved results.',
        'The old sample dashboard values (for example 47% to 62% and 89 to 127 PRs per week) are illustrative placeholders, not observed measurements.',
        'The old assertion that acceptance above 75% signals over-reliance has no supporting evidence here; do not use it as an evaluation rule.',
        'A useful dashboard pairs each metric with owner, definition, baseline, time window, target status, data source, and an action when the signal crosses a boundary.'
      ] },
    'onboarding-kit': { seconds: 103,
      notes: [
        '"The 30-minute kit is a design: ten minutes to read, ten to configure, and ten to test one real task."',
        'Read the three lanes. Include repository setup, organization standards, skills catalog, review checklist, examples, and a support route.',
        '"Measure time to first accepted task, support questions, and team feedback locally. The source’s ticket count is a target until measured."',
        '→ Expansion follows evidence from a bounded pilot.'
      ],
      know: [
        'The source kit includes README quick start, repository setup, custom instructions, skills catalog, review checklist, good prompt examples, a custom-agent template, and a sample repository.',
        'Suggested measures include time from access to first productive use, support tickets per team, satisfaction, and repeated configuration questions.',
        'The legacy target of fewer than two support tickets per team and 90% satisfaction was not measured; treat as a proposed target only.',
        'The 30-minute flow is a planned duration, not a guaranteed time-to-productivity result.'
      ] },
    'rollout-gates': { seconds: 103,
      notes: [
        '"A pilot creates evidence before the platform owner expands a pattern."',
        'Select one repeated task, run it with a bounded team, inspect both success and failure, and publish the version only after the owner accepts the evidence.',
        '"When the pattern does not fit, narrow it, route a local exception, or pause and assign an owner."',
        'The month ranges in the original migration strategy are planning examples, not a promise.',
        '→ Teams can bring local findings into a shared review loop.'
      ],
      know: [
        'The old long README proposes pilot, incremental expansion, and organization-wide adoption phases. It suggests multi-month ranges but does not cite outcome data.',
        'Fit heuristics from the source: repeated standards, inconsistent setup, leadership evidence needs, and governance requirements. Treat these as prompts for a decision, not pass/fail thresholds.',
        'The source suggests that 10–20 successfully adopting teams can indicate readiness for a wider pattern. This is an internal heuristic without supporting evidence.',
        'Pause or narrow scope when owners are unavailable, evidence is weak, costs rise, quality declines, or team requirements diverge.'
      ] },
    'community-loop': { seconds: 63,
      notes: [
        '"A community of practice lets teams share a result; a maintainer checks whether it belongs in the shared catalog."',
        'The source proposes monthly pattern sessions, an internal skills catalog, an async discussion channel, and quarterly metrics review.',
        'Treat recognition and incentives as organization choices, not product capabilities.',
        '→ Now we can state the investment example without confusing arithmetic with attribution.'
      ],
      know: [
        'The community model is a source README recommendation: monthly pattern-sharing, searchable examples, async questions, and quarterly review.',
        'A contribution becomes reusable after the source owner checks scope, evidence, and maintenance cost.',
        'The long README contrasts federated and centralized coordination using unsourced staffing, approval, and adoption figures. Those numbers are excluded from factual claims.'
      ] },
    'investment-math': { seconds: 122,
      notes: [
        '"The original example estimates 180 platform hours and 2,900 saved hours. We can show the arithmetic while keeping its evidence status honest."',
        'Point to each assumption. Instructions assume two hours saved per developer; skills assume five; onboarding assumes a reduction from eight hours to half an hour across 200 developers.',
        '"The quotient is about 16.1 saved-hours per invested hour. It is not audited ROI, and it excludes ongoing maintenance and quality effects."',
        '→ The pattern fits when repeated work, ownership, and an observable check all exist.'
      ],
      know: [
        'This example was retained from the long README and the approved recipe. It is a scenario, not an observed deployment or customer story.',
        'Arithmetic: 200 × 2 = 400; 200 × 5 = 1,000; 200 × (8 − 0.5) = 1,500; total 2,900. Build effort: 40 + 60 + 80 = 180. Ratio: 2,900 / 180 = 16.11.',
        'Calling this “16x ROI” is imprecise. The deck calls it a saved-hours ratio and does not imply audited attribution.',
        'The old README’s 50x claim and some outcome comparisons conflict with this example and lack sourced measurement; they are not treated as results.'
      ] },
    'when-pattern-fits': { seconds: 93, sources: [SRC.admin, SRC.instructions],
      notes: [
        '"Look for repeated shared work, an owner, and an observable check. Those conditions make a useful pilot."',
        '"When requirements diverge, let the team specialize within its authority. When ownership or evidence is missing, narrow the scope or escalate."',
        'The source’s 10–20 team threshold is a heuristic only, not a universal readiness gate.',
        '→ Before we close, compare the operating model we can now inspect.'
      ],
      know: [
        'The source recommends enterprise patterns after pilot teams have demonstrated value, with examples around 10–20 teams and 50–200 developers. It gives no empirical validation for these exact thresholds.',
        'Other fit conditions from the README: common standards, repeated configuration, a leadership measurement need, and a governance requirement.',
        'The pattern may not fit while a team is still validating local value, when independent teams have no shared rule, or when no maintainer can support the shared layer.'
      ] },
    'before-after': { seconds: 75,
      notes: [
        '"The shift is an owned baseline with bounded team choice and evidence tied to the claim."',
        'The first two numbers are explicitly scenario values. The stable `agent_id` is a report field used for joins, not an outcome metric.',
        '→ The final action is to test one rule in your own repository.'
      ],
      know: [
        'The original slide used a 16x label and a 30–40% licensing claim. The first is now labeled as an illustrative saved-hours ratio; the second remains only as an unverified estimate in notes.',
        'The source’s 500+ developer reach is an example scale, not a reported organization outcome.'
      ] },
    today: { seconds: 105,
      notes: [
        '"Today, choose one repeated rule and name its owner and acceptance check."',
        '"This week, test it on a representative task, inspect the diff and check output, and record how the team recovers when the check fails."',
        '"This month, run a bounded pilot, compare with your local baseline, and expand only after a reviewer accepts the evidence."',
        'Invite each person to name a repository rule they can test. The next step is a locally owned experiment, not a broad rollout.',
        '→ The references and notes page carry the source trail and full talk track.'
      ],
      know: [
        'The source README suggests immediate organization-instruction review, a skill for repeated work, a metrics baseline, a 30-minute onboarding kit, and a review of managed settings.',
        'The user’s own work is the transfer target: identify the candidate repository, decisive context, delegated action, human authority, evidence, and recovery trigger.',
        'A pilot result remains local until the relevant owner validates and publishes it.'
      ] },
    references: { seconds: 30,
      notes: [
        '"These first-party docs and release notes are the evidence trail for product behavior in this talk."',
        'The September 2026 model notice is historical. Check current product documentation before making a time-sensitive policy decision.',
        '→ Thank the audience and ask which rule they will test first.'
      ],
      know: [
        'Each teaching slide carries its own first-party source links. The references frame includes the README frontmatter sources as well as current product notes already approved in the conversion recipe.',
        'Release announcements document behavior as of their publication; feature availability and policy controls can change.'
      ],
      sources: [SRC.admin, SRC.instructions, SRC.metrics, SRC.agentsmd, SRC.roi, SRC.agentActivity, SRC.managed, SRC.migration, SRC.aiSettings, SRC.security, SRC.v121, SRC.v122] },
    thanks: { seconds: 30,
      notes: [
        '"Set the shared floor, bound team choices, and review evidence."',
        '"Which rule will your team test first, and who will decide whether the evidence is enough?"',
        'Leave the notes page open for the source links, caveats, and transfer checklist.'
      ],
      know: [
        'The requested presenter run-through remains a real follow-up. Seconds are authored estimates; the aggregate duration does not substitute for timing a live delivery.'
      ],
      sources: [SRC.admin, SRC.instructions] }
  };

  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'enterprise-patterns',
      title: 'Scaling GitHub Copilot Across Organizations',
      short: 'Enterprise Patterns for AI Adoption at Scale',
      category: 'tech-talks',
      source: 'tech-talks/enterprise-patterns/README.md',
      question: 'How do I scale Copilot across our teams without losing consistency, team choice, or proof?',
      thesis: 'Standards, knowledge, and evidence scale when owners and authority stay visible.'
    },
    slides
  };
})();
