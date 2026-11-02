/*
  VS Code Copilot through 1.144 — recipe-approved regeneration, 2026-11-01.
  The feature cards follow deck.recipe.yml in exact ID/order/part/timing order.
  Diagrams are labeled schematics; no product screenshots or live runs are implied.
*/
(() => {
  const S = (id, part, title, more = {}) => ({
    id, part, title, section: part ? `Part ${part}` : 'Frame', ...more
  });

  const SRC = {
    v140: { label: 'VS Code 1.140 release notes', href: 'https://code.visualstudio.com/updates/v1_140' },
    v141: { label: 'VS Code 1.141 release notes', href: 'https://code.visualstudio.com/updates/v1_141' },
    v142: { label: 'VS Code 1.142 release notes', href: 'https://code.visualstudio.com/updates/v1_142' },
    v143: { label: 'VS Code 1.143 release notes · publication date unresolved', href: 'https://code.visualstudio.com/updates/v1_143' },
    v144: { label: 'VS Code 1.144 release notes', href: 'https://code.visualstudio.com/updates/v1_144' },
    universe: { label: 'GitHub Copilot in VS Code · Universe releases', href: 'https://github.blog/changelog/2026-10-28-github-copilot-in-vs-code-universe-releases/' },
    fusion: { label: 'Copilot Fusion announcement', href: 'https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/' },
    vision: { label: 'Copilot Vision GA announcement', href: 'https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/' },
    context: { label: 'Add context to chat', href: 'https://code.visualstudio.com/docs/chat/copilot-chat-context' },
    providers: { label: 'Language models and providers', href: 'https://code.visualstudio.com/docs/agent-customization/language-models' },
    host: { label: 'Agent Host concepts', href: 'https://code.visualstudio.com/docs/agents/concepts/agent-host' },
    sessions: { label: 'Manage agent sessions', href: 'https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions' },
    browser: { label: 'Chat agent mode and browser tools', href: 'https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode' },
    overview: { label: 'GitHub Copilot in VS Code overview', href: 'https://code.visualstudio.com/docs/copilot/overview' }
  };
  Object.entries(SRC).forEach(([key, source]) => {
    source.verified = ['v140', 'v141', 'v142', 'v143'].includes(key) ? '2026-10-31'
      : ['v144', 'universe', 'fusion'].includes(key) ? '2026-10-31' : '2026-08-12';
  });

  // [id, part, seconds, feature, version, published, status, use case, unlock,
  //  proof, boundary, source key, evidence status, capture status, title]
  const F = [
    ['v142-model-picker',1,70,'Redesigned model picker','1.142','2026-10-14','Stable','A developer chooses a model and thinking level for a bounded coding task.','Copilot and BYOK choices are separated; the selected model exposes thinking and context controls.','First-party model-picker list and reasoning-effort images.','The picker exposes choices; it does not establish that one model produces the best result.','v142','Source-verified; live capture needed','Source media link; installed picker capture needed','Model picker: inspect model, effort, and context choices'],
    ['v143-local-models',1,65,'On-device Copilot models','1.143','Unknown in first-party release page','Experimental','A developer tests a local model for a task with a local-data constraint.','Some model inference can run on the device.','Model-picker entry and a redacted network/tool-route check.','Local inference does not prove every extension, MCP server, or service call stays local; eligible hardware is required.','v143','Source-verified; live run not recorded','Eligible local device and network-route capture needed','Local models: separate inference from tool traffic'],
    ['v142-byok-stateful',1,60,'Stateful BYOK responses','1.142','2026-10-14','Stable','A platform engineer configures a compatible gateway that does not retain response state.','With `statefulResponses: false`, the client can send full history to a stateless endpoint.','Redacted `chatLanguageModels.json` configuration and request-trace placeholder.','Credentials, retention, provider policy, and payload size remain separate decisions.','v142','Source-verified; capture needed','Redacted configuration and request trace needed','BYOK: send conversation history to a stateless endpoint'],
    ['v143-compare-preview',1,80,'Model and harness comparisons','1.143','Unknown in first-party release page','Preview','A developer compares approaches before accepting a code change.','Multiple models and harnesses can attempt one prompt independently, with optional Judge and Synthesize steps.','First-party picker, comparison grid, and results images; a scorecard is a recommendation, not a verdict.','Attempts are separate sessions/worktrees; availability and settings apply.','v143','Source-verified; first-party media available','Eligible installed session capture needed','Comparisons: inspect parallel attempts before accepting'],
    ['v144-fusion-ga',1,85,'Copilot Fusion','1.144','2026-10-28','GA','A developer wants routing and orchestration without selecting an underlying model for every request.','Fusion chooses models, reasoning effort, and execution pattern; Standard, High, and Max expose a quality/cost choice.','Effort selector, routed-model path, and reported usage/billing details.','Each model used is billed; High and Max have plan limits; model policy is not a data-boundary guarantee.','v144','Approved refresh; live run not recorded','Eligible paid-plan picker and usage detail needed','Fusion: route a request and inspect usage'],
    ['v144-comparisons-expanded',1,75,'Folderless model comparisons','1.144','2026-10-28','Preview','A developer explores an idea before a repository exists or before adding a remote.','The same prompt can be compared without a project, Git remote, or initial commit.','First-party Compare Models picker image and isolated-snapshot boundary.','Model comparisons are not supported in Dev Containers; output remains evidence to inspect.','v144','Approved refresh; source media available','Folderless eligible session capture needed','Comparisons: start before a repository exists'],
    ['visual-input-baseline',1,65,'Copilot Vision','2026 announcement','2026-07-01','GA','A developer asks about a screenshot, mockup, spreadsheet range, or error dialog.','Visual context can accompany the question instead of being paraphrased.','Illustrative attachment preview beside a redacted prompt.','Sensitive visual data remains subject to policy; an attachment is context, not acceptance evidence.','vision','Approved baseline; source-verified','Local attachment preview capture needed','Vision: attach the artifact the question is about'],
    ['context-budget-baseline',1,55,'Context sizing and /compact','through 1.139','2026-09-25 cutoff','Baseline','A developer narrows an overlong request before rerunning it.','The practitioner can trade context breadth for a more bounded request.','Context indicator and `/compact` command beside an acceptance criterion.','No speed or quality improvement is claimed without a measured run.','context','Approved baseline; illustrative','Installed context indicator capture needed','Context: narrow the request, then check its answer'],
    ['provider-route-baseline',1,60,'Explicit provider or local route','through 1.139','2026-09-25 cutoff','Baseline','A platform engineer configures a gateway or local provider without exposing credentials.','The model route is visible enough to review before a task runs.','Redacted provider settings and picker entry; no credential mutation.','Provider billing, policy, and tool network routes remain separate checks.','providers','Approved baseline; capture needed','Redacted settings and picker capture needed','Provider route: inspect access before a task runs'],

    ['v140-multiroot-peer',2,70,'Multi-root peer sessions','1.140','2026-09-30','Experimental','A developer asks related agents to work across repositories or compare approaches in fresh worktrees.','A session can coordinate multiple folders or worktrees without rebuilding context.','Release-note settings and peer/worktree relationship diagram.','Settings are hidden and disabled by default; no UI adds a folder; workspace sharing changes isolation.','v140','Proposed candidate approved; source-verified','Enabled settings and peer-session capture needed','Multi-root sessions: connect related repositories deliberately'],
    ['v140-remote-delegation',2,75,'Remote agent-host delegation tools','1.140','2026-09-30','Experimental','A coordinator sends a repository task to a host with matching OS, memory, CPU, and model capacity.','The agent can discover capacity, place a session, and report back without a picker for every task.','Redacted `list_agent_hosts`, `create_remote_session`, and `send_remote_message` request/response.','Tools are off by default; the coordinating Agents window must remain connected; normal approvals apply.','v140','Proposed candidate approved; source-verified','Connected host list and safe remote task capture needed','Remote delegation: match task needs to host capacity'],
    ['v140-devcontainer-cleanup',2,60,'Inactive Dev Container cleanup','1.140','2026-09-30','Stable','A developer pauses container work and later resumes without leaving every container running.','Inactive container sessions can be reclaimed and restarted automatically.','`chat.agentHost.devContainer.enabled` and `idleTimeout` beside a lifecycle diagram.','Agents-window scoped; startup still depends on Docker and the container configuration.','v140','Proposed candidate approved; source-verified','Settings and stopped/restarted container capture needed','Dev Container cleanup: pause, reclaim, and resume'],
    ['v141-external-sessions',2,65,'External Copilot sessions in Agents window','1.141','2026-10-07','Stable','A developer starts in Copilot CLI or the Copilot app and continues in VS Code.','External sessions appear without reloading after the first request.','Created In and Created Externally filters beside a session transcript schematic.','Session depends on local host/application availability; only one application sends at a time for Codex handoff.','v141','Proposed candidate approved; source-verified','External-session filter capture needed','External sessions: continue a conversation in VS Code'],
    ['v141-sandboxing',2,65,'Agent-host sandboxing','1.141','2026-10-07','Stable','A platform engineer limits the blast radius of model mistakes, prompt injection, or untrusted dependencies.','Agent operations can receive OS or host-process restrictions on Windows, macOS, and Linux.','`chat.agent.sandbox.enabled` beside a redacted allowed/blocked operation.','Sandboxing is an additional layer, not a standalone security boundary or replacement for endpoint security.','v141','Proposed candidate approved; source-verified','Policy setting and safe blocked-operation capture needed','Sandboxing: inspect an allowed and blocked operation'],
    ['v142-canvases',2,65,'Shared canvases','1.142','2026-10-14','Preview','A developer and agent inspect or update the same structured artifact.','A canvas extension can open beside the Agents window and keep the artifact in the session.','Chat-to-canvas tab path and shared-artifact schematic.','A chat plugin with a canvas extension is required; extensions and organization policy affect availability.','v142','Proposed candidate approved; source-verified','Installed canvas extension capture needed','Canvases: keep the shared artifact beside the chat'],
    ['v142-move-chat',2,65,'Move chat between folders or worktrees','1.142','2026-10-14','Stable','A developer moves investigation into an isolated worktree before implementation.','The chat history follows a workspace or worktree change.','Before/after workspace labels with the preserved transcript.','Only Codex sessions with one chat and one local folder qualify; the original checkout remains unchanged.','v142','Proposed candidate approved; source-verified','Codex session and worktree notice capture needed','Move chat: carry conversation history to a worktree'],
    ['v143-large-chat',2,75,'Sliced large-chat restoration','1.143','Unknown in first-party release page','Stable','A developer reopens a long-running session and keeps the window interactive.','History restoration is sliced instead of one blocking task.','Release-observed Chat A table: cold open 35.6s→9.0s; unresponsive 28.3s→0.6s.','Measurements are specific macOS runs, not a promise for every chat or machine.','v143','Proposed candidate approved; measured release evidence','First-party table linked; local timing capture needed for any local claim','Large chats: restore history in slices'],
    ['v143-worktree-cleanup',2,65,'Inactive agent-worktree cleanup','1.143','Unknown in first-party release page','Experimental','A team reclaims disk space from inactive worktrees without deleting active sessions.','The cleanup editor reports size, filters inactivity, and protects active/pinned sessions.','Cleanup editor and suggestion images; show review, cleanup, and restore path.','Cleanup marks sessions done and deletes worktrees; restore recreates them; active sessions are protected.','v143','Proposed candidate approved; source media available','Safe inactive-worktree capture needed','Worktree cleanup: review inactivity before reclaiming space'],
    ['v144-cloud-sessions',2,80,'Cloud sessions across clients','1.144','2026-10-28','GA','A developer starts a repository task away from the desk and returns to the same cloud conversation.','The task and conversation remain available across Copilot clients while GitHub infrastructure runs them.','VS Code start → cloud workspace → GitHub.com/mobile reopen → VS Code return.','Separate workspace; local uncommitted changes do not copy automatically; paid plan and organization policy apply.','v144','Approved refresh; account capture unavailable','Eligible cloud session capture needed; no sign-in during this review','Cloud sessions: reopen the conversation, then check its workspace'],
    ['v144-remote-environments',2,65,'Remote Environments dialog','1.144','2026-10-28','GA','A developer checks remote availability before connecting an agent to a project host.','Remote status, visibility, connect, and disconnect actions are gathered in one dialog.','First-party Remote Environments image with grouped GitHub Environments, Dev Tunnels, WSL, and SSH.','A visible remote does not prove machine, Agent Host, repository, or toolchain readiness.','v144','Approved refresh; source media available','Local remote-status capture needed','Remote Environments: check the target before connecting'],
    ['baseline-host-state',2,60,'Agent Host session boundary','through 1.139','2026-09-25 cutoff','Preview baseline','A developer reconnects to a remote session and verifies the intended repository and host.','Session lifetime can outlast a client window.','Host/client diagram and reconnect checklist.','The remote machine and Agent Host must remain running; this is not a claim about every harness.','host','Approved baseline; illustrative','Safe remote-host capture needed','Agent Host: verify the host and repository after reconnecting'],

    ['v140-peer-worktrees',3,70,'Peer chats and worktrees','1.140','2026-09-30','Experimental','A maintainer compares independent implementations without letting changes collide.','Related work can share files, while independent work can receive a separate branch, changes, and PR.','Shared-checkout versus fresh-worktree relationship diagram.','Shared checkout means shared files; multi-root settings are disabled by default.','v140','Proposed candidate approved; source-verified','Safe disposable repository capture needed','Peer chats: choose shared files or a fresh worktree'],
    ['v141-background-shells',3,65,'Background Shells pill','1.141','2026-10-07','Stable','A developer watches a long command without losing the main agent conversation.','The user can inspect command, runtime, and available output while the shell runs.','First-party background-shell-streaming image; command/runtime/output/stop schematic.','The list covers running and attached shells; detached shells cannot be stopped here.','v141','Proposed candidate approved; source media available','Safe long-running command capture needed','Background Shells: inspect the running command and output'],
    ['v141-send-message',3,70,'Cross-session message control','1.141','2026-10-07','Stable','A coordinator corrects a delegated task as requirements change.','Queued work can be edited or cancelled; an active conversation can receive a correction.','Redacted queue transcript: replace a queued message; mark a started turn immutable.','A message cannot be replaced or cancelled after processing begins.','v141','Proposed candidate approved; source-verified','Disposable multi-session setup capture needed','Queued messages: edit the next task before processing starts'],
    ['v142-stop-shell',3,60,'Stop Shell for attached commands','1.142','2026-10-14','Stable','A developer stops a stale test run before restarting it.','One attached shell can stop without ending the session or other commands.','Selected shell → Stop Shell → stopped status; unrelated shell remains running.','Detached shells run independently and cannot be stopped from this interface.','v142','Proposed candidate approved; source-verified','Safe attached-shell capture needed','Stop Shell: end one attached command, not the whole session'],
    ['v143-working-set',3,65,'Working set','1.143','Unknown in first-party release page','Experimental','A developer reviews agent edits before allowing them to remain in the working tree.','File edits can be reviewed and selectively kept or undone in the editor.','Changed-file list → working set → Keep/Undo choice → disk state.','File-level Undo was described as planned later; this is not merge or approval authority.','v143','Proposed candidate approved; source-verified; capture gap','Eligible editor capture needed; source-media unavailable in retrieved text','Working set: decide which agent edits remain'],
    ['v143-discard-changes',3,70,'Scoped discard changes','1.143','Unknown in first-party release page','Stable','A maintainer removes a bad agent change while preserving personal edits or earlier turns.','Discard scope follows branch, session, or last-turn boundaries.','Changeset scope matrix and selected-file discard schematic.','Discard is destructive to the selected scope; review the target changeset before acting.','v143','Proposed candidate approved; source media available','Disposable branch capture needed','Discard changes: inspect the scope before removing edits'],
    ['v144-assisted-permissions',3,75,'Assisted permissions','1.144','2026-10-28','GA','A developer reduces repetitive approvals inside a Folder-isolated session.','The permission picker can use an LLM risk assessment for lower-risk calls.','Tool request → risk assessment → automatic approval or human confirmation.','Folder isolation is required; policy can restrict it; automatic approval is not human review of the result.','v144','Approved refresh; live run not recorded','Eligible isolated session and policy-safe read-call capture needed','Assisted permissions: separate execution approval from review'],
    ['v144-computer-use',3,75,'Computer use','1.144','2026-10-28','Experimental','A developer permits a bounded desktop action when work lives outside the editor or terminal.','The agent can see and control eligible desktop apps after explicit enablement and per-action approval.','Enablement and `/computer on` → app action request → approve/reject → stop and inspect.','Local Windows/macOS Copilot-harness only; platform permission and policy apply; every action needs approval.','universe','Approved refresh; desktop capture unavailable','Desktop-only capture unavailable here; safe-app demo still needed','Computer use: approve each eligible desktop action'],
    ['baseline-isolation',3,65,'Isolation and steering baseline','through 1.139','2026-09-25 cutoff','Baseline','A team lead chooses whether an independent task can share files or needs isolation.','The delegation boundary becomes an explicit choice before execution.','Shared checkout, worktree, `/btw`, activity, and reviewer-owner matrix.','An activity pill or side question is not durable evidence that the final change is acceptable.','sessions','Approved baseline; illustrative','Safe local-session capture needed','Isolation: choose the workspace boundary before delegating'],

    ['browser-scope-baseline',4,65,'Integrated browser scope','approved baseline','2026-09-25 cutoff','GA','A developer validates a safe local page without handing over unrelated browser state.','Page, screenshot, element, and console evidence can stay tied to a session.','Agent-opened page beside an existing tab, which stays private until explicitly shared.','Organizational policy can disable tools; existing tabs require explicit sharing.','browser','Approved baseline; capture needed','Browser-tool surface capture needed; account/policy constraints apply','Browser scope: share only the tab needed for the task'],
    ['screenshot-emulation',4,75,'Viewport screenshot and emulation','approved baseline','2026-09-25 cutoff','Workflow','A developer checks a responsive local page at a named viewport.','The request carries the viewport and artifact criteria instead of vague visual approval.','Illustrative `/login` page at 390×844; screenshot placeholder and separate runner status.','390×844 and 44×44 CSS px are criteria, not accessibility conformance or observed outcomes.','browser','Approved baseline; illustrative; capture needed','Local safe page and browser-tool capture needed','Screenshot: request a viewport and inspect the fresh artifact'],
    ['element-feedback',4,70,'Browser element feedback','approved baseline','2026-09-25 cutoff','Workflow','A reviewer points to a control whose target needs a bounded adjustment.','Feedback includes the element context needed to propose a focused change.','Element comment → CSS proposal → fresh screenshot and size measurement.','A proposed CSS target is not a measured result until a fresh artifact confirms it.','browser','Approved baseline; illustrative; capture needed','Element feedback and fresh screenshot needed','Element feedback: anchor a correction, then recapture'],
    ['tests-and-measurements',4,65,'Tests, measurements, and browser artifacts','approved baseline','2026-09-25 cutoff','Workflow','A developer decides whether a UI change meets the requested behavior.','Domain evidence stays separate from runner PASS/FAIL status.','Three columns: runner status, page measurement, screenshot observation.','A passing test can miss visual or environment-specific behavior.','browser','Approved baseline; illustrative','Safe test and measurement run needed','Evidence: keep runner status separate from page behavior'],
    ['diff-pr-evidence',4,70,'Diff and PR review','approved baseline','2026-09-25 cutoff','Workflow','A maintainer decides whether a proposed change is ready for handoff.','File changes, checks, comments, and PR state can be reviewed before merge authority is exercised.','Redacted diff/PR evidence card with explicit reviewer accept/hold/revise.','Agent feedback visibility does not grant merge authority; policy and installed build affect actions.','browser','Approved baseline; illustrative','Disposable repository and PR capture needed','PR review: inspect the change before exercising merge authority'],
    ['check-recover',4,65,'Evidence recovery','approved baseline','2026-09-25 cutoff','Workflow','A reviewer finds that the artifact, test, and diff disagree.','The workflow names a recovery move instead of treating uncertainty as acceptance.','Discrepancy card names owner, hold, adjust/rerun, revert, or escalate.','Recovery depends on repository policy, environment access, and authority.','overview','Approved baseline; illustrative','Safe discrepancy example capture needed','Recovery: hold, adjust, rerun, revert, or escalate'],
  ];

  const dateLabel = (date) => date.toLowerCase().includes('cutoff')
    ? `baseline cutoff ${date.replace(/\s+cutoff$/i,'')}`
    : `published ${date}`;

  const feature = (r) => {
    const [id,part,seconds,name,version,published,status,useCase,unlock,proof,limitation,source,evidence,capture,title] = r;
    return S(id, part, title, {
      scene: 'feature-card', featureName: name, version, published, status,
      useCase, unlock, proof, limitation, evidenceStatus: evidence, capture,
      sourceKey: source, seconds, pill: `Part ${part} · ${name}`,
      subtitle: `${version === 'approved baseline' || version === 'through 1.139' || version === '2026 announcement'
        ? name : `VS Code ${version} · ${name}`} · ${dateLabel(published)} · ${status}`,
      footnote: 'Illustrative schematic · no live product capture or run is implied.'
    });
  };

  const frames = {
    title: S('title',0,'VS Code Copilot through 1.144',{
      scene:'title', visual:'title-map',
      subtitle:'Find a Better Answer · Keep Work Moving · Delegate with Fewer Interruptions · Check More Than the Code',
      tagline:'A dated capability map with a proof path and boundary for every feature.',
      meta:'Practitioner tech talk · 47 slides · 46m 30s estimated talk · 3m 30s for questions',
      seconds:25
    }),
    'core-question': S('core-question',0,'How do I get a useful answer from Copilot and know what it changed?',{
      scene:'core-question',pill:'Core question',
      subtitle:'Evaluate answers against the task, preserve work across interruptions, bound execution, and accept results from fresh evidence.',
      highlight:'Name the route, workspace, execution boundary, and evidence that earns acceptance.',
      routing:['task','route','boundary','evidence'],routingLabel:'Make the decision visible',
      roles:[
        {icon:'⌨️',title:'Developer',description:'Choose criteria and inspect the returned artifact.'},
        {icon:'🧭',title:'Team lead',description:'Match delegation to isolation and review ownership.'},
        {icon:'🛠️',title:'Platform engineer',description:'Check access, network, host, and policy prerequisites.'}
      ],
      stats:[
        {title:'36 feature cards',description:'Release, use case, proof, and limit.'},
        {title:'Four outcomes',description:'Independent examples, not one story.'},
        {title:'Evidence stays distinct',description:'Runner status never accepts a result.'}
      ],
      seconds:40
    }),
    contents: S('contents',0,'Four practitioner questions organize the release map',{
      scene:'contents-vl',sections:[
        {icon:'🔎',title:'Find a Better Answer',subtitle:'Which route fits this task?',blurb:'Inspect models, context, provider, and visual input.',slide:4,z:'purple'},
        {icon:'☁️',title:'Keep Work Moving',subtitle:'What state travels?',blurb:'Check sessions, workspaces, hosts, and reconnects.',slide:14,z:'remote'},
        {icon:'🧭',title:'Delegate with Fewer Interruptions',subtitle:'What can act, and where?',blurb:'Separate isolation, steering, permission, and acceptance.',slide:27,z:'orange'},
        {icon:'🌐',title:'Check More Than the Code',subtitle:'What evidence accepts it?',blurb:'Inspect browser behavior, tests, diffs, and recovery.',slide:37,z:'green'}
      ],seconds:30
    }),
    'part-1':S('part-1',1,'Find a Better Answer',{scene:'opener',subtitle:'Choose by task criteria, then inspect the route, context, access, cost, and returned artifact.',cards:[
      {icon:'01',title:'State the task',blurb:'Name what a useful answer contains.'},
      {icon:'02',title:'Choose a route',blurb:'Inspect model, provider, and policy.'},
      {icon:'03',title:'Check the answer',blurb:'Compare output with the criteria.'}
    ],terminal:{context:'task → route → context',detail:'No route is called better without evidence.'},seconds:25}),
    'part-2':S('part-2',2,'Keep Work Moving',{scene:'opener',subtitle:'Follow task identity, conversation, workspace, host, and reconnect prerequisites separately.',cards:[
      {icon:'01',title:'Find the session',blurb:'Check its client and conversation.'},
      {icon:'02',title:'Follow the workspace',blurb:'Local, remote, container, or cloud.'},
      {icon:'03',title:'Verify on return',blurb:'Reopen, then inspect files and host.'}
    ],terminal:{context:'session → workspace → host',detail:'Continuity does not copy every local change.'},seconds:25}),
    'part-3':S('part-3',3,'Delegate with Fewer Interruptions',{scene:'opener',subtitle:'Choose isolation, steer a bounded task, inspect permission, and keep acceptance human-owned.',cards:[
      {icon:'01',title:'Choose isolation',blurb:'Shared checkout or worktree.'},
      {icon:'02',title:'Steer execution',blurb:'Inspect queues and running tools.'},
      {icon:'03',title:'Review the result',blurb:'Permission is not acceptance.'}
    ],terminal:{context:'isolate → steer → inspect',detail:'Tool approval and human acceptance answer different questions.'},seconds:25}),
    'part-4':S('part-4',4,'Check More Than the Code',{scene:'opener',subtitle:'Pair a local browser example with fresh behavior evidence, test scope, diff, and reviewer authority.',cards:[
      {icon:'01',title:'Observe behavior',blurb:'Capture the named viewport.'},
      {icon:'02',title:'Check evidence',blurb:'Separate result from runner status.'},
      {icon:'03',title:'Decide and recover',blurb:'Accept, adjust, hold, or escalate.'}
    ],terminal:{context:'behavior → evidence → decision',detail:'The login page is one local example in this section.'},seconds:25}),
    'before-after':S('before-after',0,'A dated card makes the decision and proof inspectable',{
      scene:'before-after',before:['Release features folded into abstractions','One recurring example carries unrelated claims','Capture status lives outside the visual','Timing and evidence boundaries are implicit'],
      after:['36 named features with release and status','Independent use cases across four outcomes','Schematic, source-media, or capture-needed label','2790 seconds and explicit limitations'],
      takeaway:'Every feature now names the release, use case, unlock, proof path, and boundary.',
      metrics:[
        {value:'47',detail:'slides · 36 feature cards'},
        {value:'2790s',detail:'estimated talk budget'},
        {value:'0',detail:'copyrighted images downloaded'}
      ],
      seconds:45
    }),
    today:S('today',0,'Take one feature decision into your repository',{
      scene:'today',subtitle:'Start from a real task and leave an inspectable trail.',
      horizons:[
        {label:'Today',icon:'📍',z:'green',items:['Name the task and acceptance criteria.','Check one eligible route and its boundary.']},
        {label:'This week',icon:'🧭',z:'local',items:['Reopen one session after an interruption.','Inspect its workspace, host, and changed files.']},
        {label:'Apply it',icon:'🧪',z:'purple',items:['Choose one bounded task.','Capture behavior, tests, diff, and reviewer decision.']}
      ],
      takeaway:'Ask: what evidence will make me accept, adjust, or stop?',
      seconds:70
    }),
    references:S('references',0,'First-party release notes anchor the capability map',{
      scene:'references',subtitle:'Use the first-party page for the claim; check installed availability and policy before a live demo.',
      groups:[
        {icon:'⌨️',title:'VS Code release notes',z:'purple',items:[
          {label:SRC.v140.label,href:SRC.v140.href,description:'Experimental multi-root and remote delegation; container cleanup.'},
          {label:SRC.v141.label,href:SRC.v141.href,description:'External sessions, sandboxing, background shells, message control.'},
          {label:SRC.v142.label,href:SRC.v142.href,description:'Picker, BYOK state, canvases, moving chats, Stop Shell.'},
          {label:SRC.v143.label,href:SRC.v143.href,description:'Local models, comparisons, large chats, worktrees, working set.'},
          {label:SRC.v144.label,href:SRC.v144.href,description:'Fusion, cloud sessions, remote environments, permissions.'}
        ]},
        {icon:'🔗',title:'Announcements and workflow docs',z:'remote',items:[
          {label:SRC.universe.label,href:SRC.universe.href,description:'Computer use and cross-client announcement context.'},
          {label:SRC.fusion.label,href:SRC.fusion.href,description:'Copilot Fusion announcement and routing context.'},
          {label:SRC.overview.label,href:SRC.overview.href,description:'Baseline Copilot workflow and result checks.'},
          {label:SRC.browser.label,href:SRC.browser.href,description:'Browser agent access and evidence workflow.'},
          {label:SRC.vision.label,href:SRC.vision.href,description:'Copilot Vision GA announcement.'}
        ]}
      ],seconds:20
    }),
    thanks:S('thanks',0,'Your next bounded task',{
      scene:'thanks',visual:'closing-map',
      subtitle:'Name the boundary. Inspect the result.',
      tagline:'Which repository task is ready for one bounded experiment?',
      seconds:10
    })
  };

  const entries = [
    frames.title,frames['core-question'],frames.contents,frames['part-1'],
    ...F.slice(0,9).map(feature),frames['part-2'],...F.slice(9,21).map(feature),
    frames['part-3'],...F.slice(21,30).map(feature),frames['part-4'],...F.slice(30).map(feature),
    frames['before-after'],frames.today,frames.references,frames.thanks
  ];

  const sourceFor = (slide) => slide.sourceKey ? SRC[slide.sourceKey] : null;
  const NOTES = {};
  for (const slide of entries) {
    const src = sourceFor(slide);
    if (slide.featureName) {
      NOTES[slide.id] = {
        notes:[
          `"${slide.featureName}: ${slide.version}, ${dateLabel(slide.published)}, status ${slide.status}."`,
          `"Use case: ${slide.useCase}"`,
          `"Newly possible: ${slide.unlock}"`,
          `Point to the labeled schematic and the proof artifact: ${slide.proof}`,
          `"Keep this boundary in view: ${slide.limitation}"`,
          `→ Next, consider a separate feature and its own decision.`
        ],
        know:[
          `Release identity: ${slide.version}; ${slide.published.toLowerCase().includes('cutoff')
            ? `baseline cutoff: ${slide.published.replace(/\s+cutoff$/i,'')}`
            : `publication date: ${slide.published}`}; status: ${slide.status}.`,
          `Use case: ${slide.useCase}`,
          `Newly possible action: ${slide.unlock}`,
          `Evidence status: ${slide.evidenceStatus}. Capture state: ${slide.capture}.`,
          `Limitation: ${slide.limitation}`,
          ...(slide.proof.includes('35.6s') ? ['First-party release table: Chat A cold open 35.6s to 9.0s; unresponsive time 28.3s to 0.6s. These are release-observed macOS measurements, not universal performance promises.'] : []),
          ...(slide.published.startsWith('Unknown') ? ['Publication date remains unknown in the retrieved first-party release page. 2026-10-20 is secondary corroboration only; do not present it as verified first-party date.'] : [])
        ],
        cue:[
          `Prepared visual: ${slide.proof}`,
          `Capture state: ${slide.capture}`,
          `For a live demonstration, use a disposable task and verify the installed feature, plan, account, organization policy, and host prerequisites first. Do not change credentials, cloud state, permissions, or user configuration for this talk.`,
          `If the capture remains unavailable, keep the labeled schematic and cite the first-party source; do not describe an expected result as observed.`
        ],
        sources:[src],
        seconds:slide.seconds
      };
    } else {
      NOTES[slide.id] = {
        notes:[
          `"${slide.title}. ${slide.subtitle || slide.takeaway || ''}"`,
          ...(slide.id==='today' ? ['Ask each practitioner to name one task, one boundary, and the evidence their reviewer will inspect.'] : []),
          ...(slide.id==='references' ? ['Point to the release note linked from each feature card; the 1.143 first-party publication date remains unresolved.'] : []),
          `→ Continue with the next decision in the approved running order.`
        ],
        know:[
          'Budget is an estimate; time the complete talk before presenting.',
          ...(slide.id==='core-question' ? ['The deck uses four independent practitioner outcomes, not a single login-task narrative.'] : []),
          ...(slide.id==='today' ? ['The local responsive-login example is one Part 4 example. 390×844 and 44×44 CSS-pixel values are proposed criteria, not achieved measurements or conformance claims.'] : []),
          ...(slide.id==='references' ? ['First-party pages establish the sourced behavior; the installed build, account eligibility, and organization policy still need presenter verification.'] : [])
        ],
        cue:slide.id==='today'
          ? ['Invite the audience to identify a real task in their own repository.','Write the acceptance evidence and recovery owner before delegation.','Keep the discussion within repository policy and the audience’s authority.']
          : undefined,
        sources:slide.id==='references'?Object.values(SRC):undefined,
        seconds:slide.seconds
      };
    }
  }
  entries.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta:{
      slug:'vscode-latest',
      title:'VS Code Copilot through 1.144',
      short:'VS Code Copilot: four practitioner outcomes',
      category:'tech-talks',
      source:'tech-talks/vscode-latest/README.md',
      question:'How do I get a useful answer from Copilot and know what it changed?',
      thesis:'Evaluate answers against the task, preserve work across interruptions, bound execution, and accept results from fresh evidence.'
    },
    slides:entries
  };
})();
