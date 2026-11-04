/*
  VS Code Agents: Pick, Place, Steer, Keep. Teaching source and printable handout.
  Restructure approved 2026-11-03 (tech-talks/vscode-latest/deck.recipe.yml).
  Every feature keeps the dated release, status, and limitation from the
  2026-11-01 evidence review; Compare Models re-verified against its docs 2026-11-03.
  2026-11-03 revision: each slide carries its own short example; slide 2 is an unsorted feature wall
  built from the same FEATURES list as the release map.
*/
(() => {
  const VERB = { 1: 'Pick', 2: 'Place', 3: 'Steer', 4: 'Keep' };
  const S = (id, part, title, more = {}) => ({
    id, part, title, section: part ? `Part ${part} · ${VERB[part]}` : 'Frame', ...more
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
    overview: { label: 'GitHub Copilot in VS Code overview', href: 'https://code.visualstudio.com/docs/copilot/overview' },
    compare: { label: 'Compare model results (Preview)', href: 'https://code.visualstudio.com/docs/agents/run/compare-models' }
  };
  Object.entries(SRC).forEach(([key, source]) => {
    source.verified = key === 'compare' ? '2026-11-03'
      : ['v140', 'v141', 'v142', 'v143', 'v144', 'universe', 'fusion'].includes(key) ? '2026-10-31' : '2026-08-12';
  });
  const refs = (...keys) => keys.map((k) => SRC[k]);

  // Every agent feature on the map: [verb, name, version, status, hero slide?].
  // The feature wall (slide 2) and the release map both read this list, so they cannot drift.
  const FEATURES = [
    ['PICK', 'Comparisons', '1.143', 'Preview', 1], ['PICK', 'Folderless compare', '1.144', 'Preview', 1], ['PICK', 'Copilot Fusion', '1.144', 'GA', 1],
    ['PICK', 'On-device models', '1.143', 'Exp.', 1], ['PICK', 'Stateless BYOK', '1.142', 'Stable', 1], ['PICK', 'Model picker', '1.142', 'Stable', 0],
    ['PICK', 'Copilot Vision', '2026', 'GA', 0], ['PICK', 'Context, /compact', 'base', 'Base', 0], ['PICK', 'Provider route', 'base', 'Base', 0],
    ['PLACE', 'Move chat', '1.142', 'Stable', 1], ['PLACE', 'Multi-folder sessions', '1.140', 'Exp.', 1], ['PLACE', 'Cloud sessions', '1.144', 'Exp.', 1],
    ['PLACE', 'Agent Host', 'base', 'Base', 1], ['PLACE', 'Remote Envs dialog', '1.144', 'Exp.', 1], ['PLACE', 'Remote delegation', '1.140', 'Exp.', 1],
    ['PLACE', 'External sessions', '1.141', 'Stable', 0], ['PLACE', 'Container cleanup', '1.140', 'Stable', 0], ['PLACE', 'Large-chat restore', '1.143', 'Stable', 0],
    ['PLACE', 'Worktree cleanup', '1.143', 'Exp.', 0],
    ['STEER', 'Background Shells', '1.141', 'Stable', 1], ['STEER', 'Stop Shell', '1.142', 'Stable', 1], ['STEER', 'Queue and steer', 'base', 'Base', 1],
    ['STEER', 'Assisted permissions', '1.144', 'GA', 1], ['STEER', 'Sandboxing', '1.141', 'Stable', 1], ['STEER', 'Computer use', '1.144', 'Exp.', 1],
    ['STEER', 'Shared canvases', '1.142', 'Preview', 0], ['STEER', '/btw side chats', 'base', 'Base', 0],
    ['KEEP', 'Working set', '1.143', 'Exp.', 1], ['KEEP', 'Discard by changeset', '1.143', 'Stable', 1], ['KEEP', 'Browser scope', 'base', 'GA', 1],
    ['KEEP', 'Viewport screenshot', 'base', 'Flow', 1], ['KEEP', 'Element feedback', 'base', 'Flow', 1], ['KEEP', 'Tests, measurements', 'base', 'Flow', 1],
    ['KEEP', 'Diff and PR review', 'base', 'Flow', 1]
  ];
  const VERBS = ['PICK', 'PLACE', 'STEER', 'KEEP'];
  const byVerb = (verb) => FEATURES.filter((f) => f[0] === verb).map(([, ...rest]) => rest);
  const FEATURE_SPLIT = VERBS.map((verb) => `${verb[0]}${verb.slice(1).toLowerCase()} ${byVerb(verb).length}`).join(', ');
  // Deterministic shuffle (seeded), so the wall reads as noise but renders the same every time.
  const shuffled = (list, seed) => {
    const out = list.slice();
    let t = seed >>> 0;
    const rand = () => {
      t = (t + 0x6D2B79F5) >>> 0;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = out.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const DATE143 = '1.143 publication date: the first-party release page omits it. 2026-10-20 is secondary corroboration only; say "1.143" without a date or name the caveat.';

  // Badge: version, status, feature. Status drives the colour (GA/Stable green, Preview blue, Experimental orange, Baseline indigo).
  const B = (version, status, name) => ({ text: version === status ? `${status} · ${name}` : `${version} · ${status} · ${name}`, status });

  const slides = [
    // ── Frame ────────────────────────────────────────────────────────────
    S('title', 0, 'VS Code Agents: Pick, Place, Steer, Keep', {
      visual: 'four-verbs',
      subtitle: 'Four decisions for every agent run, and the controls VS Code 1.140–1.144 added for each',
      tagline: 'Each release lets the agent go further on its own, and each adds the control that keeps the result yours.',
      meta: '32 slides · 45m talk · 5 min for questions',
      cardLabel: 'EVERY AGENT RUN',
      cardBody: 'Four decisions, and a control you can inspect for each.',
      verbs: [
        { verb: 'PICK', z: 'pick', chips: ['Compare'] },
        { verb: 'PLACE', z: 'place', chips: ['Cloud session'] },
        { verb: 'STEER', z: 'steer', chips: ['Stop Shell'] },
        { verb: 'KEEP', z: 'keep', chips: ['Keep', 'Undo'] }
      ]
    }),
    S('core-question', 0, 'VS Code ships Copilot changes every week. Which ones change how I work?', {
      scene: 'feature-wall', pill: 'Core question',
      wall: shuffled(FEATURES, 1140144).map(([, name, version, status]) => ({ name, version, status })),
      answer: 'Each one changes one of four decisions you already make.'
    }),
    S('four-decisions', 0, 'Each verb is a question you already ask, and each release added a control for it', {
      scene: 'verb-grid', pill: 'Four decisions',
      subtitle: 'The agent gains autonomy; you gain a control you can inspect. They rise together.',
      columns: [
        { verb: 'PICK', z: 'pick', question: 'Which intelligence answers, and how do I know?',
          autonomy: { name: 'Fusion routes models for you', rel: '1.144 · GA', status: 'GA' },
          control: { name: 'Side-by-side comparisons to inspect', rel: '1.143 · Preview', status: 'Preview' } },
        { verb: 'PLACE', z: 'place', question: 'Where does it run, and what travels with it?',
          autonomy: { name: 'Cloud sessions keep running after you leave', rel: '1.144 · Experimental', status: 'Experimental' },
          control: { name: 'Remote Environments lists each target', rel: '1.144 · Experimental', status: 'Experimental' } },
        { verb: 'STEER', z: 'steer', question: 'What can I change while it runs, and what acts unasked?',
          autonomy: { name: 'Assisted permissions approve lower-risk calls', rel: '1.144 · GA', status: 'GA' },
          control: { name: 'Stop Shell ends one hung command', rel: '1.142 · Stable', status: 'Stable' } },
        { verb: 'KEEP', z: 'keep', question: 'Which changes stay, and on what evidence?',
          autonomy: { name: 'The agent captures its own page screenshots', rel: 'Browser tools · Baseline', status: 'Baseline' },
          control: { name: 'Working set: Keep or Undo per file', rel: '1.144 · Experimental', status: 'Experimental' } }
      ]
    }),
    S('contents', 0, 'Four verbs, in the order a run happens', {
      pill: 'Contents',
      sections: [
        { icon: '⚖️', title: 'Pick', subtitle: 'Which intelligence answers?', blurb: 'Compare attempts, let Fusion route, check where inference runs.',         slide: 5, z: 'pick' },
                { icon: '📍', title: 'Place', subtitle: 'Where does the work run?', blurb: 'Worktree, cloud session, and host, plus what travels.', slide: 11, z: 'place' },
                { icon: '🎛️', title: 'Steer', subtitle: 'What may act unasked?', blurb: 'Watch and stop shells, edit the queue, set permissions.', slide: 17, z: 'steer' },
                { icon: '✅', title: 'Keep', subtitle: 'Which changes stay?', blurb: 'Keep or Undo per file, discard a turn, check the page.', slide: 24, z: 'keep' }
      ]
    }),

    // ── Part 1 · Pick ────────────────────────────────────────────────────
    S('part-1', 1, 'Pick', {
      scene: 'opener', subtitle: 'Which intelligence answers this task, and how do I know?',
      cards: [
        { icon: '⚖️', title: 'Compare', blurb: 'Two attempts, one human pick.' },
        { icon: '🔀', title: 'Route', blurb: 'Fusion picks; usage shows it.' },
        { icon: '📍', title: 'Inspect', blurb: 'Where inference really runs.' }
      ],
      terminal: { context: 'pick → compare · route · inspect', detail: 'No route is called better without a measured result.' }
    }),
    S('pick-compare', 1, 'Compare Models: run one prompt as several attempts, then pick with evidence', {
      scene: 'compare', pill: 'Pick · compare',
      badges: [B('1.143', 'Preview', 'Compare Models'), B('1.144', 'Preview', 'On by default · folderless chats')],
      steps: [
        { label: 'OPEN', action: 'Compare Models', body: 'Agents window → New → choose the repo. In the model picker, select the scale icon, or press Ctrl+Alt+M.' },
        { label: 'CHOOSE', action: 'Add 2–10 attempts', body: 'Mix Copilot, Claude, and Codex harnesses, or one model at two efforts. Configure Judge and Synthesis now, then Done.' },
        { label: 'RUN', action: 'Run 2 Attempts', body: 'One prompt carries the done-criteria. Each attempt gets its own session and worktree from the last commit.' },
        { label: 'READ', action: 'Judge scorecard', body: 'Recommendation, time, tokens, and validation evidence. Open Attempt N to read each diff.' },
        { label: 'CONTINUE', action: 'Open the winner', body: 'Run the tests in its worktree, then review and integrate. Or Synthesize a new attempt. Nothing merges on its own.' }
      ],
      storyLabel: 'READING THE RESULTS',
      story: [
        { who: 'Attempt A', what: 'Changes 14 files; tests pass', result: '' },
        { who: 'Attempt B', what: 'Changes 2 files and adds a test; tests pass', result: 'Smaller diff, same evidence · developer picks B' }
      ],
      boundary: 'Commit first: attempts start from the committed state · attempts run with Allow all, which skips tool approvals · a judge verdict is not proof; run the tests · every attempt, judge, and synthesis is separate model usage · Agents window only; not in Dev Containers.'
    }),
    S('pick-fusion', 1, 'Fusion routes the request, and usage detail shows what it chose and what it costs', {
      scene: 'fusion', pill: 'Pick · let Copilot pick',
      badges: [B('1.144', 'GA', 'Copilot Fusion')],
      efforts: ['Standard', 'High', 'Max'],
      route: ['Chooses the models', 'Chooses reasoning effort', 'Chooses the execution pattern'],
      usage: ['Shows the routed models', 'Reports usage per model used', 'Each model used is billed'],
      boundary: 'Each model used is billed · High and Max have plan limits · a model policy is not a data-boundary guarantee.'
    }),
    S('pick-route-setup', 1, 'Point Copilot at your own model: four steps and one line that matters', {
      scene: 'route-setup', pill: 'Pick · inference route · setup',
      badges: [B('1.142', 'Stable', 'Custom Endpoint · statefulResponses'), B('1.143', 'Experimental', 'On-device models')],
      steps: [
        { k: 'Chat: Manage Language Models', v: 'Command Palette, or the gear in the model picker' },
        { k: 'Add Models → Custom Endpoint', v: 'Group name, display name, API key (Ollama ignores it)' },
        { k: 'API type: Responses', v: 'Then edit the chatLanguageModels.json that opens' },
        { k: 'Pick it in the model picker', v: 'It appears with your BYOK models' }
      ],
      file: 'chatLanguageModels.json',
      json: [
        '{',
        '  "name": "Ollama (local)",',
        '  "vendor": "customendpoint",',
        '  "apiKey": "ollama",',
        '  "apiType": "responses",',
        '  "models": [{',
        '    "id": "qwen38-5090-opt:latest",',
        '    "url": "http://localhost:11434/v1/responses",',
        '    "toolCalling": true,',
        '    "statefulResponses": false',
        '  }]',
        '}'
      ],
      highlight: '"statefulResponses": false',
      why: '← stateless server: resend the whole conversation',
      onDevice: {
        label: 'ON-DEVICE INSTEAD · 1.143 · EXPERIMENTAL',
        needs: ['NVIDIA GPU with 96 GB+ VRAM', '~55 GB free disk', 'llama.cpp b11658+', 'GitHub sign-in'],
        how: 'Set chat.copilot.localModel.llamaServerPath, enable chat.copilot.localModel.enabled, then On This Device → Download.'
      }
    }),
    S('pick-route-proof', 1, 'Same follow-up, two answers: a stateless server forgets unless VS Code resends the history', {
      scene: 'route-proof', pill: 'Pick · inference route · proof',
      badges: [B('1.142', 'Stable', 'statefulResponses: false')],
      turn1: 'My favorite color is teal.',
      turn2: 'What is my favorite color?',
      runs: [
        { label: 'DEFAULT · statefulResponses: true', sends: 'Sends only the new turn + previous_response_id', answer: 'Unknown.', note: 'No error. The server dropped turn 1.', z: 'orange' },
        { label: 'statefulResponses: false', sends: 'Sends the full conversation every time', answer: 'Teal', note: 'The model sees turn 1.', z: 'keep' }
      ],
      observed: 'Observed 2026-11-03 · local Ollama 0.40.6 · qwen38-5090-opt · /v1/responses',
      lanes: [
        { label: 'INFERENCE', body: 'localhost:11434 · checked with the run above', ok: true },
        { label: 'TOOLS · MCP · EXTENSIONS', body: 'Web fetch, MCP servers, and extensions still use their own network routes', ok: false }
      ],
      boundary: 'A local model keeps inference local, not tool, MCP, or extension traffic · statefulResponses describes the server; it does not change its data retention · credentials and provider policy stay separate decisions.'
    }),
    S('pick-roundup', 1, 'Also shipped for Pick: a clearer picker, visual input, and tighter context', {
      scene: 'roundup', pill: 'Pick · also shipped', verb: 'Pick', z: 'pick',
      items: [
        { version: '1.142', status: 'Stable', name: 'Redesigned model picker', use: 'Choose model, thinking level, and context for a bounded task.', limit: 'Shows the choices; does not prove one model is best.' },
        { version: 'Announced 2026-07-01', status: 'GA', name: 'Copilot Vision', use: 'Attach the screenshot or mockup the question is about.', limit: 'Context, not acceptance evidence; policy covers sensitive images.' },
        { version: 'Through 1.139', status: 'Baseline', name: 'Context sizing and /compact', use: 'Narrow an overlong request before rerunning it.', limit: 'No speed or quality gain claimed without a measured run.' },
        { version: 'Through 1.139', status: 'Baseline', name: 'Explicit provider route', use: 'Review a gateway or local provider before a task runs.', limit: 'Billing, policy, and tool routes stay separate checks.' }
      ]
    }),

    // ── Part 2 · Place ───────────────────────────────────────────────────
    S('part-2', 2, 'Place', {
      scene: 'opener', subtitle: 'Where does the work run, and what travels with it?',
      cards: [
        { icon: '🌿', title: 'Isolate', blurb: 'Shared checkout or worktree.' },
        { icon: '☁️', title: 'Relay', blurb: 'One cloud session, any client.' },
        { icon: '🖥️', title: 'Verify host', blurb: 'A visible remote is a target.' }
      ],
      terminal: { context: 'place → worktree · cloud · host', detail: 'Local uncommitted changes stay local.' }
    }),
    S('place-worktree', 2, 'A shared checkout or a fresh worktree decides whether agent edits can collide with yours', {
      scene: 'showdown', pill: 'Place · isolate',
      leftLabel: 'Shared checkout', rightLabel: 'Fresh worktree',
      pairs: [
        { left: { label: 'Same files', note: 'Agent edits land beside your own' },
          right: { label: 'Own branch', note: 'Agent edits stay in a separate worktree', z: 'place' } },
        { left: { label: 'Mixed changes', note: 'Your uncommitted work and the agent’s blur' },
          right: { label: 'Own changes and PR', note: 'Review the agent’s work as its own change', z: 'place' } },
        { left: { label: 'Chat tied to this folder', note: 'History stays where it started' },
          right: { label: 'Move chat · 1.142 · Stable', note: 'Ask: “Continue this task in a new Git worktree.” History follows', z: 'place' } },
        { left: { label: 'Peers share state', note: 'Related chats on one checkout share files' },
          right: { label: 'Multi-folder sessions · 1.140 · Experimental', note: 'Each peer chat gets its own folder or worktree; off by default', z: 'orange', optional: true } }
      ],
      outcomeLeft: { icon: '⚠', label: 'Shared files: edits can collide' },
      outcomeRight: { icon: '✓', label: 'Fresh worktree: edits stay separable' }
    }),
    S('place-cloud-start', 2, 'Leaving for the day? Start long-running work as a cloud session; it keeps going after the laptop closes', {
      scene: 'cloud-relay', step: 1, pill: 'Place · cloud session',
      badges: [B('1.144', 'Experimental', 'Cloud sessions')],
      boundary: 'Commit and push first: the cloud workspace starts from the GitHub repository; local uncommitted changes do not copy · Copilot harness only · paid plan and organization policy apply.'
    }),
    S('place-cloud-return', 2, 'Back at the desk: the conversation reopens in VS Code; the code comes home through Git', {
      scene: 'cloud-relay', step: 2, pill: 'Place · cloud session',
      badges: [B('1.144', 'Experimental', 'Cloud sessions')],
      travels: ['The conversation', 'The task and its progress'],
      stays: ['The edited files', 'Its test results'],
      home: ['Ask: push to a branch or open a PR', 'Locally: git fetch, check out, run tests'],
      boundary: 'No automatic sync to your local folder · the environment is not permanent storage, so push before you mark done or delete · paid plan and organization policy apply.'
    }),
    S('place-hosts', 2, 'Need more than your laptop? Send the session to a host that’s running, has the repo, and has the tools', {
      scene: 'host-check', pill: 'Place · hosts',
      badges: [B('Baseline', 'Baseline', 'Agent Host'), B('1.144', 'Experimental', 'Remote Environments'), B('1.140', 'Experimental', 'Remote delegation')],
      environments: ['GitHub Environments', 'Dev Tunnels', 'WSL', 'SSH'],
      tools: ['list_agent_hosts', 'create_remote_session', 'send_remote_message'],
      checklist: ['Host running', 'Repository present', 'Toolchain ready']
    }),
    S('place-roundup', 2, 'Also shipped for Place: sessions arrive from other apps, and idle resources get reclaimed', {
      scene: 'roundup', pill: 'Place · also shipped', verb: 'Place', z: 'place',
      items: [
        { version: '1.141', status: 'Stable', name: 'External sessions', use: 'Continue a Copilot CLI or Copilot app chat in VS Code.', limit: 'Same machine only; shows up after its first request. Turn on the Created Externally filter.' },
        { version: '1.140', status: 'Stable', name: 'Dev Container cleanup', use: 'Idle five minutes, the container stops; it restarts when you continue.', limit: 'Agents window only; done or deleted last session removes the container.' },
        { version: '1.143', status: 'Stable', name: 'Faster large-chat open', use: 'Long Agent Host chats restore in slices; the window stays responsive.', limit: 'Release-measured on macOS: cold open 35.6 s to 9.0 s; yours will vary.' },
        { version: '1.143', status: 'Experimental', name: 'Worktree cleanup', use: 'Chat: Open Worktree Cleanup shows size and inactivity; pick what to reclaim.', limit: 'Deletes worktrees and marks sessions done; restore recreates; active and pinned are safe.' }
      ]
    }),

    // ── Part 3 · Steer ───────────────────────────────────────────────────
    S('part-3', 3, 'Steer', {
      scene: 'opener', subtitle: 'What can I see and change while it runs, and what may act unasked?',
      cards: [
        { icon: '👀', title: 'Watch', blurb: 'Background Shells shows the run.' },
        { icon: '✋', title: 'Correct', blurb: 'Stop a shell; queue or steer.' },
        { icon: '🔐', title: 'Permit', blurb: 'Decide what acts unasked.' }
      ],
      terminal: { context: 'steer → watch · stop · correct · permit', detail: 'Running unasked is not the same as accepted.' }
    }),
    S('steer-shells', 3, 'A test run hangs; stop that one shell and the session keeps going', {
      scene: 'shells', pill: 'Steer · watch and stop',
      badges: [B('1.141', 'Stable', 'Background Shells'), B('1.142', 'Stable', 'Stop Shell')],
      shells: [
        { cmd: 'npm test', meta: 'attached · no new output', action: 'Stop Shell', result: 'Stopped', z: 'steer' },
        { cmd: 'npm run dev', meta: 'attached · output streaming', action: '', result: 'Keeps running', z: 'keep' },
        { cmd: 'detached shell', meta: 'runs independently', action: '', result: 'Not stoppable here', z: 'orange', dashed: true }
      ],
      boundary: 'Copilot harness sessions · Stop Shell works on attached shells only; detached shells run independently and cannot be stopped here.'
    }),
    S('steer-queue', 3, 'Plans change mid-run: queue the next step, or steer the one that’s running', {
      scene: 'terminal', pill: 'Steer · Send dropdown · queue or steer',
      subtitle: 'Type while the agent works: Enter steers, Alt+Enter queues, and the Send button’s dropdown adds Stop and Send.',
      termTitle: 'Agent session · chat queue',
      transcript: [
        { type: 'thinking', label: 'Running · the agent starts reformatting unrelated files' },
        { type: 'user', text: 'Enter (Steer with Message) → "Leave formatting alone; fix the failing date parser first."' },
        { type: 'response', lines: ['The agent yields after its current tool call', 'The correction is handled next'] },
        { type: 'divider' },
        { type: 'user', text: 'Alt+Enter (Add to Queue) → "Then run the full test suite."' },
        { type: 'response', lines: ['Waits until the current response finishes', 'Queued message shows Edit · Send Immediately · Remove'] },
        { type: 'outcome', text: 'Steer redirects now · Queue waits its turn · Stop and Send cancels' }
      ]
    }),
    S('steer-permissions', 3, 'Assisted permissions let low-risk calls run without asking; read the diff before you commit', {
      scene: 'permission-flow', pill: 'Steer · permit',
      badges: [B('1.144', 'GA', 'Assisted permissions')],
      prereq: 'Permissions picker → Assisted permissions · Folder isolation',
      boundary: 'Copilot sessions with Folder isolation · organization policy can restrict it · it decides which calls ask first; it adds no review step afterward.'
    }),
    S('steer-sandbox', 3, 'Sandboxing narrows what an approved operation can reach', {
      scene: 'sandbox', pill: 'Steer · contain',
      badges: [B('1.141', 'Stable', 'Agent-host sandboxing')],
      setting: 'chat.agent.sandbox.enabled',
      allowed: 'Edit a source file inside the workspace',
      blocked: 'Reach outside the allowed area, such as a write outside the workspace',
      boundary: 'An extra layer on top of endpoint security, not a replacement for it · Windows needs required OS updates.'
    }),
    S('steer-computer-use', 3, 'Same decision, different case: computer use lets the agent work in desktop apps you approve', {
      scene: 'desktop-approve', pill: 'Steer · same decision, different case',
      badges: [B('1.144', 'Experimental', 'Computer use')],
      actions: [
        { title: 'Enable', body: 'Turn on the computerUse setting, then restart VS Code' },
        { title: 'Turn on', body: 'Select Turn On when the agent asks, or run /computer on' },
        { title: 'Approve apps', body: 'Approve each app when asked; on macOS, grant Accessibility and Screen Recording' },
        { title: 'Turn off', body: 'Run /computer off when you are done' }
      ],
      humanStep: 2,
      note: 'Approval is per app, not per click: once allowed, the agent sees, clicks, and types in it',
      boundary: 'Local Copilot harness on Windows and macOS only · stays on for Copilot on this computer, including Copilot CLI, until /computer off · use browser tools for web apps.'
    }),
    S('steer-roundup', 3, 'Also for Steer: a shared artifact beside the chat, and side questions that don’t interrupt', {
      scene: 'roundup', pill: 'Steer · also shipped', verb: 'Steer', z: 'steer',
      items: [
        { version: '1.142', status: 'Preview', name: 'Shared canvases', use: 'Turn on chat.canvases.enabled, then /create-canvas a Kanban board, or open one from Add Context (+) → Canvas.', limit: 'Local Copilot harness, desktop only; not Claude, Codex, or remote sessions.' },
        { version: 'Through 1.139', status: 'Baseline', name: '/btw side questions', use: 'Type /btw and a question; a side chat answers while the run keeps going.', limit: 'The answer stays out of the main conversation; it is not evidence.' }
      ]
    }),

    // ── Part 4 · Keep ────────────────────────────────────────────────────
    S('part-4', 4, 'Keep', {
      scene: 'opener', subtitle: 'Which changes stay, and on what evidence?',
      cards: [
        { icon: '📂', title: 'Review', blurb: 'Keep or Undo, file by file.' },
        { icon: '📱', title: 'Observe', blurb: 'Fresh browser evidence.' },
        { icon: '⚖️', title: 'Decide', blurb: 'Separate columns; recover.' }
      ],
      terminal: { context: 'keep → review · observe · decide · recover', detail: 'Criteria stay criteria until a fresh capture.' }
    }),
    S('keep-working-set', 4, 'Keep or Undo each agent edit, file by file, before you commit', {
      scene: 'working-set', pill: 'Keep · working set',
      badges: [B('1.143', 'Experimental', 'Keep'), B('1.144', 'Experimental', 'Undo · on by default')],
      files: [
        { path: 'src/settings/form.tsx', what: 'the fix', keep: true },
        { path: 'src/settings/form.test.tsx', what: 'its tests', keep: true },
        { path: 'package.json', what: 'test script', keep: true },
        { path: 'src/styles/theme.css', what: 'unasked restyle', keep: false }
      ],
      keepMeans: 'Marked reviewed; the edit stays on disk',
      undoMeans: 'The file goes back to how it was',
      boundary: 'Copilot harness, editor window · edits made by terminal commands don’t appear here · Agents window: discard from the Changes view.'
    }),
    S('keep-discard', 4, 'Discard just the agent’s last turn, or its whole session; your own edits stay', {
      scene: 'discard-scope', pill: 'Keep · discard by changeset',
      badges: [B('1.143', 'Stable', 'Discard by changeset · Agents window')],
      pickLabel: 'CHANGES VIEW · PICK A CHANGESET, THEN DISCARD',
      scopes: ['Last turn', 'Session', 'Branch'],
      explain: ['reverts only the newest turn', 'reverts the session; keeps your edits', 'back to the base; added files deleted'],
      selected: 0,
      layers: ['Last turn: an unasked restyle', 'Earlier turn: the fix', 'Earlier turn: its tests', 'Your own edits'],
      boundary: 'Agents window, one file at a time, from the Changes view or diff editor · Branch is the widest: it deletes files the branch added · read the diff before you discard.'
    }),
    S('keep-browser', 4, 'Screenshot, element comment, and fresh recapture turn a UI change into behavioral evidence', {
      scene: 'browser-loop', pill: 'Keep · observe',
      badges: [B('Baseline', 'GA', 'Integrated browser tools'), B('Baseline', 'Workflow', 'Screenshot and element feedback')],
      stages: [
        { label: 'AGENT-OPENED PAGE', body: 'Screenshot at the viewport you care about' },
        { label: 'ELEMENT FEEDBACK', body: 'Comment on the element that’s wrong' },
        { label: 'PROPOSED CSS', body: 'Not yet measured' },
        { label: 'FRESH RECAPTURE', body: 'Fresh recapture: did it change?' }
      ],
      css: ['.card-header {', '  display: flex;', '  gap: 12px;', '}'],
      privacy: 'Existing browser tabs stay private until the developer shares them.'
    }),
    S('keep-evidence', 4, 'Runner status, page behavior, and the diff answer different questions, so each gets a column', {
      scene: 'evidence-columns', pill: 'Keep · decide',
      columns: [
        { label: 'TEST RUNNER STATUS', question: 'Did the specified tests run and pass?', fields: ['PASS', 'FAIL'], note: 'Status only: a pass can miss visual behavior.', z: 'place' },
        { label: 'PAGE MEASUREMENT', question: 'Does the page do what you asked?', fields: ['Expected: __', 'Measured in a fresh capture: __'], note: 'Filled from a fresh capture, never from the prompt.', z: 'pick' },
        { label: 'DIFF AND PR REVIEW', question: 'Is this the change we want?', fields: ['ACCEPT', 'HOLD', 'REVISE'], note: 'The named reviewer decides.', z: 'keep' }
      ],
      ifDisagree: 'Runner says PASS, screenshot says no? Comment on the element and retry, or Undo or discard the change.',
      boundary: 'The named reviewer decides the merge · policy and the installed build affect actions.'
    }),

    // ── Close ────────────────────────────────────────────────────────────
    S('release-map', 0, 'Every 1.140–1.144 agent feature has a home under one verb, and next week’s will too', {
      scene: 'release-map', pill: 'Release map',
      columns: VERBS.map((verb) => ({ verb, z: verb.toLowerCase(), items: byVerb(verb) })),
      notesOnly: 'Notes only: Cloud Automations · Customization Marketplace and connectors · Agent Host Protocol v1.0 · image generation'
    }),
    S('today', 0, 'Take one real task and fill in four lines before the agent starts', {
      pill: 'Your next task',
      subtitle: 'The four-line card, plus the person who owns recovery.',
      horizons: [
        { label: 'Before it starts', icon: '🧭', z: 'pick', items: ['Pick: name the intelligence and how you will compare it.', 'Place: name where it runs and what travels.'] },
        { label: 'While it runs', icon: '🎛️', z: 'steer', items: ['Steer: name what may act unasked.', 'Name the shell or turn you will stop.'] },
        { label: 'Before Keep', icon: '✅', z: 'keep', items: ['Keep: name the evidence that earns Keep.', 'Name the recovery owner.'] }
      ],
      takeaway: 'Four lines on one real task: intelligence, place, what acts unasked, evidence for Keep.'
    }),
    S('references', 0, 'First-party release notes back every claim; each line names its verbs', {
      pill: 'References',
      groups: [
        { icon: '⌨️', title: 'VS Code release notes', z: 'pick', items: [
          { label: SRC.v140.label, href: SRC.v140.href, description: 'Place: multi-folder sessions, remote delegation, container cleanup.' },
          { label: SRC.v141.label, href: SRC.v141.href, description: 'Place: external sessions · Steer: Background Shells, queue, sandboxing.' },
          { label: SRC.v142.label, href: SRC.v142.href, description: 'Pick: picker, BYOK · Place: move chat · Steer: Stop Shell, canvases.' },
          { label: SRC.v143.label, href: SRC.v143.href, description: 'Pick: compare, local models · Place: restore, cleanup · Keep: working set, discard.' },
          { label: SRC.v144.label, href: SRC.v144.href, description: 'Pick: Fusion · Place: cloud, Remote Environments · Steer: permissions.' }
        ] },
        { icon: '🔗', title: 'Announcements and docs', z: 'keep', items: [
          { label: SRC.universe.label, href: SRC.universe.href, description: 'Steer: computer use · Place: cross-client sessions.' },
          { label: SRC.fusion.label, href: SRC.fusion.href, description: 'Pick: Fusion routing, effort levels, billing.' },
          { label: SRC.vision.label, href: SRC.vision.href, description: 'Pick: Copilot Vision GA.' },
          { label: SRC.host.label, href: SRC.host.href, description: 'Place: Agent Host session lifetime.' },
          { label: SRC.browser.label, href: SRC.browser.href, description: 'Keep: browser tools, screenshots, element feedback.' }
        ] }
      ]
    }),
    S('thanks', 0, 'Pick, place, steer, keep.', {
      visual: 'closing-verbs',
      subtitle: 'Four decisions on every agent run, and a home for next week’s release.',
      verbs: [
        { verb: 'PICK', z: 'pick', q: 'Which intelligence answers?' },
        { verb: 'PLACE', z: 'place', q: 'Where does it run?' },
        { verb: 'STEER', z: 'steer', q: 'What may act unasked?' },
        { verb: 'KEEP', z: 'keep', q: 'Which changes stay?' }
      ],
      prompt: 'Which real task gets your four-line card first?'
    })
  ];

  // ── Speaker notes: the talk track, Q&A facts, demo cues, and sources ──
  const NOTES = {
    title: {
      seconds: 45,
      notes: [
        '"Every agent run in VS Code comes down to four decisions: pick the intelligence, place the work, steer the run, and keep the changes worth keeping."',
        'Point at the card in the middle: every agent run. Let the four verbs lock on in run order, clockwise.',
        '"Five releases, 1.140 through 1.144, added a control for each of those decisions. By the end, every one of them has a home under a verb."',
        '→ First, the question you brought into the room.'
      ],
      know: [
        'Scope: VS Code 1.140 (published 2026-09-30) through 1.144 (published 2026-10-28), plus labelled baseline workflows through 1.139 (cutoff 2026-09-25).',
        'Budget: 32 slides, 2700 seconds (45m), leaving 5 minutes for questions in the 50-minute slot. Budgets are estimates until a timed run-through.',
        'The four chips: Compare (1.143, Preview), Cloud session (1.144, Experimental), Stop Shell (1.142, Stable), Keep and Undo in the working set (Keep 1.143, Undo 1.144; Experimental).'
      ],
      cue: ['Open on the settled title. Press R to replay the verbs locking on once the room settles.'],
      sources: refs('v140', 'v144')
    },
    'core-question': {
      seconds: 90,
      notes: [
        '"VS Code ships Copilot changes every week. Which ones change how I work?"',
        'Let the wall fill in. Do not read it out; let it land as noise.',
        `"Five releases, 1.140 through 1.144, one a week from September 30 to October 28. This wall is only the agent features: ${FEATURES.length} of them, in no particular order."`,
        '"Nobody remembers that list by reading release notes top to bottom. So here is the short answer."',
        'Point at the line under the wall.',
        '"Each one changes one of four decisions you already make."',
        '→ Here are the four decisions, as the questions they answer.'
      ],
      know: [
        `The wall shows every feature on the release map (slide 29), ${FEATURES.length} in total, in a fixed shuffled order: name and version only, with status as a small dot in the release-map legend colours (GA or Stable, Preview, Experimental, baseline or workflow).`,
        'Notes-only items from the 2026-11-01 review are not on the wall: 1.144 Cloud Automations, Customization Marketplace and connectors, Agent Host Protocol v1.0, and image generation.',
        'Agenda 1, four verbs that hold the release train: every 1.140–1.144 agent feature lands on pick, place, steer, or keep, so a weekly release has somewhere to go.',
        'Agenda 2, each control with its boundary: every hero feature appears on its own short example, with version, status, and limit in view.',
        'Agenda 3, a four-line card for your next task: name the intelligence, the place, what may act unasked, and the evidence that earns Keep. It works on a real repository task the day after the talk.',
        'Roles in the room: the developer runs the task and decides which changes stay; the team lead sets isolation and names the reviewer; the platform engineer owns hosts, providers, and policy.',
        'Audience: developers, team leads, and platform engineers. Level: applied.'
      ],
      sources: refs('overview', 'v140', 'v144')
    },
    'four-decisions': {
      seconds: 90,
      notes: [
        '"Each verb is a question you already ask. Pick: which intelligence answers? Place: where does it run, and what travels? Steer: what can I change while it runs, and what acts unasked? Keep: which changes stay?"',
        'Read one column at a time: the top box is autonomy a release added; the bottom box is the control that came with it.',
        '"Fusion picks models for you, and comparisons let you inspect two attempts. Cloud sessions run without you, and Remote Environments shows you the target. Assisted permissions approve lower-risk calls, and Stop Shell ends one command."',
        '"Autonomy and control rise together. That is the optimistic read of this release train."',
        '→ Here is the route through the talk, one verb at a time.'
      ],
      know: [
        'Fusion: 1.144, GA. Comparisons: 1.143, Preview. Cloud sessions and Remote Environments: 1.144, Experimental. Assisted permissions: 1.144, GA. Stop Shell: 1.142, Stable, published 2026-10-14. Working set: Keep in 1.143, Undo in 1.144, Experimental.',
        'Agent-captured screenshots are a baseline browser-tools workflow, not a 1.140–1.144 release item.',
        DATE143
      ],
      sources: refs('v142', 'v143', 'v144', 'fusion', 'browser')
    },
    contents: {
      seconds: 30,
      notes: [
        '"Four verbs, in the order a run happens."',
        '"Pick and Place happen before the run. Steer happens during it. Keep happens after it, and decides what survives."',
        'Each card links to its opener if you need to jump.',
        '→ We start with Pick.'
      ],
      know: [
        'Openers: Pick at slide 5, Place at slide 11, Steer at slide 17, Keep at slide 24.',
        'Pick, Place, and Steer each end with an "also shipped" roundup. Keep has none: every Keep feature earns its own slide.'
      ]
    },
    'part-1': {
      seconds: 35,
      notes: [
        '"Pick: which intelligence answers this task, and how do I know?"',
        '"Three moves: compare two attempts, let Fusion route when you would rather not choose, then check where inference actually runs."',
        '"One rule holds the section together: no route is called better without a measured result."',
        '→ Compare first.'
      ],
      know: ['Pick files nine features: comparisons (1.143 Preview), folderless comparisons (1.144 Preview), Fusion (1.144 GA), on-device models (1.143 Experimental), stateless BYOK (1.142 Stable), and four roundup items.'],
      sources: refs('v143', 'v144')
    },
    'pick-compare': {
      seconds: 170,
      notes: [
        '"Here is how you actually run a comparison. It lives in the Agents window, not the editor chat."',
        '"Start a new session, choose the repository, open the model picker, and select Compare Models, the scale icon. Control-Alt-M gets you there from the keyboard."',
        '"Add two to ten attempts. Mix harnesses, Copilot, Claude, and Codex, or add the same model twice at different thinking efforts. Auto is not offered here; the point is to see each model work."',
        '"If you want a Judge or a Synthesis step, configure them now, before you run. Then Done."',
        '"Put the done-criteria in the prompt: what has to change, what has to stay the same, and which tests prove it. Run 2 Attempts."',
        '"Each attempt gets its own session and its own worktree, starting from the last commit. Commit first, or your uncommitted work is not in the race."',
        'Point at step 4. "The Judge scorecard recommends one, with time, tokens, and validation evidence. Open each attempt and read its diff."',
        'Point at the strip. "Here is what reading the results looks like. Attempt A changes 14 files, and the tests pass. Attempt B changes 2 files, adds a test, and the tests pass. Same evidence, smaller diff to review: the developer picks B."',
        '"Then you continue in that attempt: run the tests in its worktree and review it like any agent change. Or select Synthesize, which builds a new attempt in yet another worktree. Nothing merges, pushes, or opens a pull request on its own."',
        '"No repository yet? A folderless quick chat compares ideas and plans, without a judge or synthesis."',
        '→ Comparing means you pick. Fusion is what happens when you let Copilot pick.'
      ],
      know: [
        'Compare Models arrived in VS Code 1.143 (Preview) behind sessions.chat.compareAgents.enabled. VS Code 1.144 (published 2026-10-28) turned it on by default for eligible new Agents-window sessions. It is still Preview.',
        'Agents window only; not available in the editor Chat view. Not supported in Dev Containers.',
        '2 to 10 attempts. Mix Copilot, Anthropic Claude, and OpenAI Codex harnesses where available, or add one model several times at different thinking efforts. Auto and other routing choices are not available for comparisons.',
        'Judge and synthesizer are configured before the run. Without a judge, compare manually. Synthesis needs both a judge and a synthesizer. Neither is available for folderless comparisons.',
        'Repository attempts run in their own Git worktrees from the committed state; uncommitted changes, Git-ignored files, and dependencies may be absent. Since 1.144 a Git remote or initial commit is not required: a repository without commits gives each attempt a snapshot of non-ignored working files.',
        'Repository comparisons use worktree sessions with Allow all, which skips tool approval prompts. Worktrees separate edits, not the agent’s access to the machine or network.',
        'Scorecard: a recommendation, time and token usage per attempt, and expandable rationale with validation evidence. Token values can be lower bounds; the scorecard does not measure credit or currency cost. A judge assessment is not proof of correctness.',
        'Synthesize creates a new grouped session in another isolated worktree from the judge verdict and the attempts’ strengths. It does not modify the recommended attempt or the original working tree.',
        'A comparison never merges, pushes, or opens a pull request. Continue in the chosen session, then follow the normal agent-change review and worktree integration workflow.',
        'Each attempt, judge evaluation, and synthesis is separate model usage.',
        DATE143,
        'Attempts A and B are an illustrative example, not a recorded comparison.'
      ],
      cue: [
        'Live option: on an eligible build, in a disposable repository with everything committed, open Compare Models with two attempts and a Judge, then open both attempts. Verify plan, settings, and policy first; attempts run with Allow all.',
        'First-party picker, grid, and scorecard images are in the 1.143 release notes and the Compare model results docs.'
      ],
      sources: refs('compare', 'v143', 'v144')
    },
    'pick-fusion': {
      seconds: 110,
      notes: [
        '"Sometimes you do not want to pick a model at all. Fusion picks for you."',
        '"You choose an effort level: Standard, High, or Max. Fusion chooses the models, the reasoning effort, and the execution pattern."',
        'Point at the usage card.',
        '"The usage detail shows what it chose and what it cost. Every model it used is billed."',
        'Point at the orange boundary.',
        '"High and Max have plan limits. And a model policy is not a data boundary."',
        '→ That raises the next Pick question: where does inference run at all?'
      ],
      know: [
        'Copilot Fusion: VS Code 1.144, GA, published 2026-10-28.',
        'Fusion chooses models, reasoning effort, and execution pattern; Standard, High, and Max expose a quality and cost choice.',
        'Each model used is billed; High and Max have plan limits; model policy is not a data-boundary guarantee.',
        'Evidence: approved refresh; live run not recorded. An eligible paid-plan picker and usage-detail capture is still needed.',
        'Fusion and Compare are the same Pick decision from opposite ends: Compare keeps the choice with you; Fusion delegates it.',
        'No measured result shows Fusion choosing better than a manual pick; present it as delegation of the choice, not an upgrade.'
      ],
      cue: ['Live option: on an eligible paid plan, select Fusion, run a small request, and open the usage detail. Leave billing and policy unchanged.'],
      sources: refs('v144', 'fusion')
    },
    'pick-route-setup': {
      seconds: 100,
      notes: [
        '"Where inference runs is its own decision. Here is how to point Copilot at a model you run, in this case Ollama on this laptop."',
        '"Chat: Manage Language Models, Add Models, Custom Endpoint. Give it a group name, a display name, and a key. Ollama ignores the key, so any value works. Choose the Responses API type."',
        '"VS Code opens chatLanguageModels.json. Point the model at the server, and add the one line that matters for a stateless server: statefulResponses false."',
        'Point at the highlighted line. "Many self-hosted Responses servers do not remember earlier turns. This line tells VS Code to send the whole conversation each time."',
        'Point at the on-device card. "If you have the hardware, 1.143 can also run a Copilot-provided model on the device. The bar is high: an NVIDIA GPU with 96 gigabytes of memory."',
        '→ So what happens when you leave that line out?'
      ],
      know: [
        'Stateful responses for BYOK custom endpoints: VS Code 1.142, Stable, published 2026-10-14. The setting lives on the model entry in chatLanguageModels.json and applies only to the Responses API type.',
        'Custom Endpoint supports three API types: Chat Completions, Responses, and the Anthropic Messages API. It replaces the deprecated OpenAI Compatible provider.',
        'In real configurations, store keys with an input variable such as "apiKey": "${input:myApiKey}" rather than a raw key. Ollama ignores the key, so the slide uses a placeholder.',
        'The built-in Ollama provider is deprecated; the official Ollama extension is the supported route for Ollama-native models. The Custom Endpoint route on this slide talks to Ollama’s OpenAI-compatible /v1/responses endpoint.',
        'On-device models: VS Code 1.143, Experimental. MAI Code 1.1 Flash via llama.cpp in Copilot harness sessions. Requires GitHub sign-in (Business/Enterprise admins enable Editor Preview Features), an NVIDIA GPU with 96 GB or more VRAM (unified memory counts), about 55 GB free disk, and llama.cpp b11658 or later. Responses show On-device and 0 credits.',
        DATE143,
        'If a new model does not appear in the picker, restart VS Code.'
      ],
      cue: ['Live option: open chatLanguageModels.json on the presenter machine and show the Ollama entry. Never show a real provider key.'],
      sources: refs('providers', 'v142', 'v143')
    },
    'pick-route-proof': {
      seconds: 90,
      notes: [
        '"Same two-turn conversation, sent to the same local server twice."',
        '"Turn one: my favorite color is teal. Turn two: what is my favorite color?"',
        'Point at the orange column. "By default VS Code sends only the new turn and an ID for the previous response. This server accepts the ID, throws away the history, and answers Unknown. No error."',
        'Point at the green column. "With statefulResponses false, VS Code sends the full conversation. Teal."',
        '"That silent failure is the reason the setting exists. With tool calls, the docs say you get missing-tool-call errors instead."',
        'Point at the lanes. "And keep the scope honest: this run checks where inference happens. Web fetch, MCP servers, and extensions still go wherever they go. Check each route."',
        '→ A few more Pick controls shipped in the same window.'
      ],
      know: [
        'Observed 2026-11-03 on the presenter machine: raw /v1/responses calls to local Ollama 0.40.6 with qwen38-5090-opt. Follow-up with previous_response_id returned "Unknown."; follow-up with full history returned "Teal". These were direct HTTP calls that reproduce what each VS Code setting sends, not a capture of the VS Code UI.',
        'Ollama documents its Responses support as stateless; its cloud API states it does not support stateful Responses.',
        'Docs: Responses API models default to statefulResponses true, sending only new history with previous_response_id. false omits that ID and sends full history, including tool calls and results.',
        'statefulResponses describes the server’s capability and does not change its data retention policy. When zeroDataRetentionEnabled is true, statefulResponses is ignored and full history is sent.',
        'Sending full history makes each request larger as the conversation grows.',
        'Local inference does not prove that tool, MCP, extension, or service traffic stays local.'
      ],
      cue: ['Live option: with the Ollama entry selected, ask turn one and turn two in a new chat. Then remove statefulResponses, restart VS Code if the change is not picked up, and repeat in a new chat. Rehearse first; local model output varies.'],
      sources: refs('providers', 'v142')
    },
    'pick-roundup': {
      seconds: 55,
      notes: [
        '"Also shipped for Pick, four quick ones."',
        '"The 1.142 model picker separates Copilot and BYOK choices and shows thinking and context controls. Copilot Vision is GA: attach the screenshot instead of describing it."',
        '"Context sizing and /compact narrow an overlong request. An explicit provider route lets a platform engineer review the route before a task runs."',
        '"None of these makes a route better on its own. They make the choice visible."',
        '→ That is Pick. Now: where does the work run?'
      ],
      know: [
        'Model picker: VS Code 1.142, Stable, published 2026-10-14. It exposes choices; it does not establish that one model gives the best result.',
        'Copilot Vision: GA, announced 2026-07-01. Sensitive visual data stays subject to policy; an attachment is context, not acceptance evidence.',
        'Context sizing and /compact: baseline through 1.139 (cutoff 2026-09-25). No speed or quality gain is claimed without a measured run.',
        'Explicit provider or local route: baseline through 1.139. Provider billing, policy, and tool network routes remain separate checks.'
      ],
      sources: refs('v142', 'vision', 'context', 'providers')
    },
    'part-2': {
      seconds: 35,
      notes: [
        '"Place: where does this work run, and what travels with it?"',
        '"Three places to decide: a shared checkout or a fresh worktree, a cloud session, and a host."',
        '"One rule for the section: local uncommitted changes stay local unless you move them."',
        '→ Start with the closest choice: checkout or worktree.'
      ],
      know: ['Place files ten features: move chat (1.142), multi-folder sessions (1.140 Experimental), cloud sessions (1.144 Experimental), Agent Host (baseline), Remote Environments (1.144 Experimental), remote delegation (1.140 Experimental), and four roundup items.'],
      sources: refs('v140', 'v144')
    },
    'place-worktree': {
      seconds: 110,
      notes: [
        '"The first Place decision is the closest one: does the agent edit the same files you are editing?"',
        'Left column: shared checkout. Right column: fresh worktree.',
        '"In a shared checkout the agent’s edits land next to yours. In a fresh worktree it gets its own branch, its own changes, and its own PR."',
        '"1.142 lets you move a chat into a worktree, and the history follows. There is no button: you ask the agent. Continue this task in a new Git worktree before implementing it. It finishes its turn, moves, and carries on in the new location. 1.140 adds multi-folder sessions, still Experimental: ask the main chat to create peer chats, each in its own fresh worktree, to compare approaches."',
        '"When you have uncommitted work of your own, give the agent a worktree."',
        '→ Now the bigger move: take the work off the laptop.'
      ],
      know: [
        'Move chat between folders or worktrees: VS Code 1.142, Stable, published 2026-10-14. Agents window; a single-chat Agent Host session with one local folder, using the Copilot harness or Codex (Experimental) in Interactive mode. At 1.142 release it was Codex-only; the docs updated 2026-10-28 add the Copilot harness.',
        'How: ask in natural language, for example “Continue this task in a new Git worktree of the current repository before implementing it.” The agent finishes its turn, moves the chat, shows a workspace-change notice, and continues automatically. Wait for the notice before sending more prompts.',
        'A new worktree starts from committed Git state and needs at least one commit. Uncommitted changes stay in the original folder, except files copied by worktree include rules. A folder move uses the destination’s files and must be on the same host. The original checkout stays unchanged.',
        'Multi-folder sessions: VS Code 1.140, Experimental, published 2026-09-30. Each chat in a session can use its own folder or worktree. Disabled by default and hidden from the Settings editor: set chat.agentHost.copilotAgent.multiRootEnabled (or the Claude/Codex equivalent) in user settings.json. No UI adds a folder; ask the main chat to create the peer chat.'
      ],
      cue: ['Live option: in a disposable repository with at least one commit, start a Copilot-harness session in the Agents window, then ask it to continue in a new Git worktree. Show the notice and the original checkout unchanged.'],
      sources: [...refs('v142', 'v140'), SRC.sessions]
    },
    'place-cloud-start': {
      seconds: 100,
      notes: [
        '"It is the end of the day, and a long task is still ahead: run the full test suite, fix what fails, and run it again. You want it to keep going after you leave."',
        '"So commit and push, and start it as a cloud session. In the Agents window: New, set the environment to Cloud, Choose Repository, then send the task with its done-criteria."',
        '"You do not move the running local chat. You start a new session that runs on GitHub infrastructure, from what is in the repository."',
        'Point at the laptop as it closes. "The laptop closes. The cloud session keeps going."',
        '"Cloud sessions are new in 1.144 and still Experimental. Copilot harness only, a paid plan, and organization policy apply."',
        '→ So how does the developer check on it?'
      ],
      know: [
        'Cloud sessions: VS Code 1.144, published 2026-10-28. The release notes give no GA label; the cloud sessions docs mark the feature Experimental. Earlier deck versions said GA in error.',
        'Start: Agents window → New → Environment: Cloud → Choose Repository (a GitHub.com repository) → pick a model → send the task. Chat view: new chat → Session Target → Cloud. Needs chat.agentHost.cloudSandbox.enabled.',
        'A cloud session is a new session in a separate workspace. Local uncommitted changes are not copied, so commit and push what it needs. Copilot harness only; you can choose a model but not switch to Claude or Codex.',
        'Requires a paid Copilot plan; availability depends on account and organization policy.',
        'Notes only: 1.144 Cloud Automations (scheduled and repository-event workflows) are a separate autonomous-workflow decision, outside this talk.'
      ],
      cue: ['A live run needs an eligible paid account, chat.agentHost.cloudSandbox.enabled, and a policy that allows cloud sessions; confirm beforehand and use a disposable GitHub repository with the branch pushed.'],
      sources: [...refs('v144', 'universe'), { label: 'Run agent sessions in the cloud (Experimental)', href: 'https://code.visualstudio.com/docs/agents/run/cloud-sandbox-sessions', verified: '2026-11-03' }]
    },
    'place-cloud-return': {
      seconds: 110,
      notes: [
        '"From the phone, the developer opens GitHub Mobile and checks progress. Same session, same conversation."',
        '"Back at the desk, they reopen the session from the list in VS Code. That reconnects the conversation, and wakes the cloud environment if it is asleep."',
        'Point at the middle column. "Here is the part people miss: the edited files are still in the cloud workspace. Nothing syncs into your local folder."',
        'Point at the right column. "The code comes home through Git. Ask the agent to commit and push to a branch, or open a pull request. Then fetch, check out the branch, and run the tests locally, or review the PR."',
        '"And push before you mark the session done or delete it. The cloud environment is not permanent storage."',
        '→ The cloud is one host. Next: any host.'
      ],
      know: [
        'Cloud sessions: 1.144 (Experimental), published 2026-10-28. Release notes: check progress on GitHub.com or in the GitHub Mobile app, then return to VS Code.',
        'Continue: sign in with the owning account, find the session in the sessions list, open it, and check the connection state before sending. In the Agents window, opening a cloud chat connects to or wakes its environment (chat.agentHost.cloudSandbox.autoConnectOnOpen). A transcript can open even when the environment is offline; reading history is not resuming live work.',
        'Bringing changes back: the docs give no automatic sync to the local folder. Review changes and test results in the connected session, then use the repository branch and pull-request workflow. The agent pushes or opens a PR when asked; the developer fetches and checks out, or reviews the PR.',
        'Stop, close, and mark done do not shut down compute or save work; delete removes the task. Preserve work in the repository before deleting or relying on later environment access.',
        'Local uncommitted changes do not copy to the cloud either. Paid plan and organization policy apply.',
        'The mobile check is a representative example; no live capture of it exists for this deck.'
      ],
      cue: ['Live option: in the reopened cloud session, ask "Commit this to a branch named agent/test-fixes and push it", then run git fetch and git switch agent/test-fixes locally.'],
      sources: [...refs('v144', 'universe', 'sessions'), { label: 'Run agent sessions in the cloud (Experimental)', href: 'https://code.visualstudio.com/docs/agents/run/cloud-sandbox-sessions', verified: '2026-11-03' }]
    },
    'place-hosts': {
      seconds: 115,
      notes: [
        '"Hosts are the third Place decision. The Agent Host keeps a session alive beyond a client window."',
        '"1.144 adds a Remote Environments dialog: GitHub Environments, Dev Tunnels, WSL, and SSH in one list, with status, connect, and disconnect."',
        '"Same decision, different case: 1.140 remote delegation tools let a coordinating agent match a task to a host by OS, memory, CPU, and model capacity."',
        'Point at the checklist.',
        '"A remote in the list is a target. Before the agent works there, check that the host runs, the repository is there, and the toolchain is ready."',
        '→ A few more Place features shipped alongside.'
      ],
      know: [
        'Agent Host session boundary: baseline (Preview baseline, cutoff 2026-09-25). The remote machine and Agent Host must keep running; not a claim about every harness.',
        'Remote Environments dialog: VS Code 1.144, published 2026-10-28. No GA label in the release notes; the Agents window docs call remote environment management Experimental. A visible remote does not prove machine, Agent Host, repository, or toolchain readiness.',
        'Remote agent-host delegation tools: VS Code 1.140, Experimental, published 2026-09-30. list_agent_hosts, create_remote_session, send_remote_message. Off by default; the coordinating Agents window must stay connected; normal approvals apply.',
        'Notes only: Agent Host Protocol v1.0 and custom clients (1.144) are infrastructure material, covered in harness talks rather than here.'
      ],
      cue: ['Live option: open the Remote Environments dialog and point at status only. Do not connect to a production host for the talk.'],
      sources: refs('host', 'v144', 'v140')
    },
    'place-roundup': {
      seconds: 80,
      notes: [
        '"Also shipped for Place, four quick ones."',
        '"External sessions from Copilot CLI or the Copilot app now show up in VS Code. Idle Dev Container sessions are reclaimed and restart on resume."',
        '"Long chats restore in slices, so the window stays responsive. Worktree cleanup shows size and inactivity before you reclaim disk."',
        '→ That is Place. Now the run is going: how do you steer it?'
      ],
      know: [
        'External Copilot sessions: VS Code 1.141, Stable, published 2026-10-07. New Copilot CLI and Copilot app conversations on the same machine appear in the Agents window after their first request, without reloading. Use the Created In and Created Externally filters to choose which appear.',
        'Not on the slide: 1.141 also added Codex chat handoff from the ChatGPT app or Codex CLI. Only one application can send to that chat at a time; quit the other app, then select Retry. That limit belongs to Codex handoff, not to Copilot external sessions.',
        'Automatic Dev Container cleanup: VS Code 1.140 (no Experimental label), published 2026-09-30. When all sessions using a Dev Container are inactive for five minutes, VS Code stops it; it restarts when you continue. Marking done or deleting the last session removes the container. Settings: chat.agentHost.devContainer.enabled, chat.agentHost.devContainer.idleTimeout. Agents window only.',
        'Improved performance when opening large chats: VS Code 1.143 (no Experimental label). Agent Host chats in the Agents window restore history in slices. Release table, median of three macOS runs on real chats: Chat A (~1,150 requests) cold open 35.6 s to 9.0 s, window unresponsive 28.3 s to 0.6 s.',
        'Reclaim storage from inactive worktrees: VS Code 1.143, Experimental. Command: Chat: Open Worktree Cleanup. Cleanup marks the selected sessions done and deletes their worktrees; restoring a session recreates its worktree. Active, running, needs-input, and pinned sessions are protected. Optional suggestion: chat.agentSessions.sessionStorageCleanupSuggestion.enabled.',
        'Multi-folder sessions (1.140, Experimental) were removed from this roundup because slide 12 already covers them.',
        DATE143
      ],
      sources: refs('v141', 'v140', 'v143')
    },
    'part-3': {
      seconds: 35,
      notes: [
        '"Steer: what can I see and change while it runs, and what may act without asking?"',
        '"Watch the shells, stop the one that hangs, correct the queue, and decide what runs unasked."',
        '"The rule for this section: running unasked is not the same as accepted."',
        '→ First, the test run hangs.'
      ],
      know: ['Steer files eight features: Background Shells (1.141), Stop Shell (1.142), queued-message control (1.141), assisted permissions (1.144 GA), sandboxing (1.141), computer use (1.144 Experimental), and two roundup items.'],
      sources: refs('v141', 'v142', 'v144')
    },
    'steer-shells': {
      seconds: 100,
      notes: [
        '"A test run hangs. The Background Shells pill above the chat input lists what the agent is still running in the background."',
        '"Select the pill, select the hung test shell to see its command, runtime, and output, then select Stop Shell. Only that command ends."',
        'Point at the dev server row and the session panel.',
        '"The dev server keeps running, and the session and its conversation keep going."',
        '"Stop Shell works on attached shells, the ones the agent runs as part of its current request. Detached shells run on their own and cannot be stopped here."',
        '→ Stopping is one correction. Changing the plan is another.'
      ],
      know: [
        'Background Shells pill: VS Code 1.141, published 2026-10-07. Copilot harness sessions, in the Agents window and the editor window. Shows each running shell’s command and runtime; select one to stream its output. A shell leaves the list when its command finishes.',
        'Stop Shell: VS Code 1.142, published 2026-10-14. Pill → shell details → Stop Shell. Only that command ends. Keyboard-reachable; screen readers announce the stop. Attached shells only.',
        'Shell names on the slide are illustrative.'
      ],
      cue: [
        'Live option: in a disposable repository, ask the agent to run a long command in the background, open the Background Shells pill, and stop it.'
      ],
      sources: refs('v141', 'v142')
    },
    'steer-queue': {
      seconds: 85,
      notes: [
        '"You do not have to wait for the agent to finish. Start typing while it works, and the Send button changes."',
        '"It becomes a split button. Press Enter and you steer: the agent yields after its current tool call and takes your correction next. Press Alt+Enter and you queue: the message waits until the current response finishes."',
        'Point at the first exchange. "The agent starts reformatting files nobody asked about. Enter: leave formatting alone, fix the failing date parser first."',
        'Point at the second exchange. "Alt+Enter queues the full test suite. A queued message sits in the transcript with Edit, Send Immediately, and Remove, so you can still change it before it goes."',
        '"The dropdown arrow on the Send button lists all three, plus Stop and Send, which cancels the current request. Stopping does not undo edits or commands that already finished."',
        '→ Now: what is the agent allowed to do without asking?'
      ],
      know: [
        'Visible only while a request is in progress and the input has text: the Send button becomes a split button. The primary action is icon-only (Steer by default); the dropdown lists Add to Queue, Steer with Message (checked when it is the default), Stop and Send, and Ask in Side Chat when the conversation supports side chats.',
        'Keys (VS Code 1.144.1): Enter runs the default action; Alt+Enter runs the other one. Holding Alt also flips the primary button. chat.requestQueuing.defaultAction sets the default to steer (default) or queue.',
        'Steer with Message: sent at the next opportunity; the current request yields after its current tool execution. Add to Queue: sent after the current request completes. Stop and Send: cancels the current request and sends immediately; completed edits and commands are not undone.',
        'Queued and steering messages show in the transcript as pending, with Edit, Send Immediately, and Remove from Queue actions, plus Remove All Queued. Pending messages of the same type can be dragged to reorder.',
        'Related, agent-to-agent: VS Code 1.141 extended the send_message tool so a coordinating agent can steer, queue, replace, or cancel messages to sessions it delegated on the same agent host.',
        'Behavior verified against the chat docs and the VS Code 1.144.1 build (command IDs workbench.action.chat.steerWithMessage and workbench.action.chat.queueMessage). The messages on the slide are illustrative.'
      ],
      cue: ['Live option: start a long request, type a correction, and point at the Send button changing. Press Alt+Enter to queue one message, then show its Edit action in the transcript.'],
      sources: [{ label: 'Use chat: send and steer requests', href: 'https://code.visualstudio.com/docs/chat/chat-overview', verified: '2026-11-03' }, SRC.v141]
    },
    'steer-permissions': {
      seconds: 110,
      notes: [
        '"Assisted permissions are generally available in 1.144. Turn them on in the permissions picker: Assisted permissions."',
        'Trace both branches. "For every tool call, an LLM assesses the risk. Low-risk calls run without asking. Higher-risk calls, or ones it cannot judge, still come to the developer."',
        '"It needs Folder isolation, it applies to Copilot sessions, and your organization can restrict it."',
        'Point at the green card. "Assisted permissions only decide which calls ask you first. They add no review step afterward. With Folder isolation, edits go straight into your folder and show up in Source Control as uncommitted changes, like anything else. Read that diff before you commit. Deciding what stays is the last verb, Keep."',
        '→ Permission decides whether something runs. A sandbox decides how far it reaches.'
      ],
      know: [
        'Assisted permissions: VS Code 1.144, published 2026-10-28, generally available for Copilot sessions (release notes and GitHub changelog 2026-10-26).',
        'How: permissions picker → Assisted permissions. Requires Folder isolation; may be restricted by organization policy.',
        'An LLM-based risk assessment runs for each tool call; low-risk calls are approved automatically; higher-risk or undetermined calls require explicit approval.',
        'The slide does not claim how any specific call is classified.'
      ],
      cue: [
        'Live option: in a Folder-isolated Copilot session where policy allows it, select Assisted permissions and run a read-only task.'
      ],
      sources: [...refs('v144'), { label: 'Assisted permissions GA (GitHub changelog)', href: 'https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available/', verified: '2026-11-03' }]
    },
    'steer-sandbox': {
      seconds: 85,
      notes: [
        '"Sandboxing narrows what an approved operation can reach."',
        '"Turn on chat.agent.sandbox.enabled. Agent operations then get file and network restrictions, using OS protections or checks in the agent host, on Windows, macOS, and Linux."',
        'Point at the allowed edit inside the box and the blocked reach outside it.',
        '"It cuts the blast radius of a model mistake, a prompt injection, or an untrusted dependency. It is an extra layer, on top of your endpoint security."',
        '→ The same decision shows up somewhere new: the desktop.'
      ],
      know: [
        'Sandboxing in the Copilot agent host: VS Code 1.141, published 2026-10-07. Setting chat.agent.sandbox.enabled.',
        'Limits how supported agent operations access files and network resources; reduces the impact of model mistakes, prompt injection, untrusted dependencies, and locally launched tool servers.',
        'Uses operating-system protections or checks in the agent host process, depending on operation and platform. Windows, macOS, and Linux; Windows needs required OS updates.',
        'Release notes: it adds a layer of protection but does not replace endpoint security or provide a standalone security boundary.',
        'The blocked operation on the slide is an example.'
      ],
      sources: refs('v141')
    },
    'steer-computer-use': {
      seconds: 95,
      notes: [
        '"Same decision, different case. Some work happens in desktop apps, not the editor. Computer use lets the agent see app windows, click, type, and scroll."',
        '"Turn on the setting and restart. When a task needs it, the agent asks Turn on Computer Use, or you run /computer on."',
        'Point at step 3. "Then you approve each app the first time it is needed. On macOS you also grant Accessibility and Screen Recording. Approval is per app: once allowed, the agent works in it."',
        '"It stays on for Copilot on this computer, including Copilot CLI, until you run /computer off. Experimental, local Copilot harness, Windows and macOS. For web apps, use the browser tools instead."',
        '→ Two more Steer items shipped alongside.'
      ],
      know: [
        'Computer use: VS Code 1.144, published 2026-10-28, Experimental and off by default. Setting chat.agentHost.computerUse.enabled; restart after changing.',
        'Available for local Copilot harness sessions on macOS and Windows. Not for the Local, Claude, or Codex harnesses, Linux, or remote or cloud hosts. A plugin downloads on first use.',
        'Turn on: select Turn On when the agent asks, or run /computer on. The prompt is not shown in Autopilot or auto-reply chats. Not Now means it will not ask again in that chat.',
        'Approve access to each application when requested. macOS needs Accessibility and Screen Recording for the Copilot Computer Use helper.',
        'Turning it on is not limited to the chat: it stays on for Copilot on the computer, including Copilot CLI, until /computer off. Earlier versions of this slide said every action needs approval; the docs describe per-app approval.',
        'Docs caution: it can read and change content outside the workspace; approve only the apps the task needs.',
        'It is here because it is the same Steer decision in a different place: desktop apps instead of the editor.'
      ],
      cue: [
        'Live option: on a local Windows or macOS machine, enable the setting, restart, and ask the agent to open Calculator and compute 12 times 7. Run /computer off afterward.'
      ],
      sources: [...refs('v144'), { label: 'Control desktop applications (Experimental)', href: 'https://code.visualstudio.com/docs/agents/run/tools', verified: '2026-11-03' }]
    },
    'steer-roundup': {
      seconds: 60,
      notes: [
        '"Also for Steer: canvases, in Preview since 1.142. A canvas is a shared surface beside the chat, like a Kanban board, that you and the agent both edit."',
        '"To try one: turn on chat.canvases.enabled, start a new Copilot session, and send a first message. Then type /create-canvas and describe what you want, for example a Kanban board for this sprint’s bugs. Or open an installed one from Add Context, Canvas."',
        '"Move a card yourself, or ask the agent to break the work into cards. Both of you see the same board."',
        '"And /btw: type /btw and a question to open a side chat with the conversation as context. The main run keeps going, and the side answer stays out of it."',
        '→ Which brings us to the last verb: Keep.'
      ],
      know: [
        'Canvases: VS Code 1.142, Preview, published 2026-10-14; 1.144 added the Canvases section in Agent Customizations and Add Context (+) → Canvas.',
        'Prerequisites: VS Code desktop; local Copilot harness session in the Chat view or Agents window; chat.canvases.enabled on (applies to new sessions); send a first message before opening canvas menus. Not supported in Claude, Codex, extension-host Local sessions, remote Agent Host sessions, browser clients, or auxiliary windows.',
        'Get one: Chat: Open Customizations → Browse → Canvases → Install; or /create-canvas with a description, which creates a workspace canvas extension and opens it. Samples: awesome-copilot.github.com/extensions.',
        'Open: ask the agent; Add Context (+) → Canvas…; Chat view New Chat (+) → Canvas; Agents window Add Tab (+) → Canvas; or Agent Customizations → Canvases → a canvas marked Ready to Open. Canvases marked Requires Input open only through the agent.',
        'A canvas opens in an editor tab tied to the chat that opened it. Turn extensions on or off in Agent Customizations → Canvases (workspace extensions cannot be toggled there).',
        '/btw: in a conversation that supports side chats, /btw followed by a question opens a side chat with the prior conversation as context, even while a response is in progress (VS Code 1.144.1 UI strings).',
        'Notes only: 1.144 image generation sits beside canvases and is not taught here.'
      ],
      cue: ['Live option: with chat.canvases.enabled on, start a new local Copilot session, send "hi", then run /create-canvas Create a Kanban board for this repository’s open bugs with Backlog, In progress, and Done. Move one card yourself and ask the agent to add a card for a new bug.'],
      sources: [...refs('v142', 'v144'), { label: 'Use canvases with agents (Preview)', href: 'https://code.visualstudio.com/docs/agents/run/canvases', verified: '2026-11-03' }]
    },
    'part-4': {
      seconds: 35,
      notes: [
        '"Keep: which changes stay, and on what evidence?"',
        '"Review the files, observe the page, decide with evidence in separate columns, and know how to recover."',
        '"The done-criteria are still criteria. Only a fresh capture turns them into evidence."',
        '→ Start with the button that gives the verb its name.'
      ],
      know: ['Keep files seven features: working set (Keep 1.143, Undo 1.144; Experimental), discard by changeset (1.143), and five baseline browser and review workflows. No roundup; each earns a slide.'],
      sources: refs('v143', 'browser')
    },
    'keep-working-set': {
      seconds: 130,
      notes: [
        '"Here the verb is literally a button. The working set, above the chat input, lists every file the agent edited."',
        'Walk the rows. "The fix: Keep. Its tests: Keep. The test script: Keep. A restyle nobody asked for: Undo."',
        '"Keep marks a file reviewed; the edit stays on disk. Undo puts the file back. Three kept, one undone, and what is left is what you commit."',
        '"You can also Keep or Undo individual changes inline in the editor."',
        '"One gap: edits made by terminal commands do not show up here, so check Source Control too."',
        '→ Sometimes one file is the wrong unit. Sometimes it is a whole turn.'
      ],
      know: [
        'Working set: file-level Keep arrived in VS Code 1.143 (Experimental). Keep marks changes reviewed and removes them from the working set; the edits stay on disk, and files return if the agent changes them again.',
        'VS Code 1.144 (published 2026-10-28) added Undo and inline Keep and Undo for individual changes in the editor. Keep and Undo are on by default in the editor window and remain Experimental.',
        'Setting chat.editor.workingSet.enabled; false shows the Changes pill instead. Copilot harness sessions in the editor window.',
        'Edits made through terminal commands do not appear in the working set. In the Agents window, discard files from the Changes view.',
        DATE143,
        'File names and the three-kept, one-undone split are an example.'
      ],
      cue: ['Live option: in a disposable repository, let a Copilot session edit two files, then Keep one and Undo the other from the working set above the chat input.'],
      sources: refs('v143', 'v144')
    },
    'keep-discard': {
      seconds: 90,
      notes: [
        '"Sometimes a file is the wrong unit; what went wrong is a whole turn. That is where discard comes in, in the Agents window."',
        '"Open the Changes view and pick a changeset: Last turn, Session, or Branch. Then select Discard Changes on a file."',
        'Point at the highlighted tab and the top layer. "The last turn brought in a restyle nobody asked for. Discard from Last turn, and only that turn goes. The fix, its tests, and your own edits stay."',
        '"Session reverts everything the agent did in this session but keeps your edits. Branch is the big one: the file goes back to where the branch started, and files the branch added are deleted."',
        '"So read the diff before you press it."',
        '→ Files decided. Now: does the page actually work?'
      ],
      know: [
        'Discard changes from more changesets: VS Code 1.143, Agents window. Before 1.143, discard was only available in the Uncommitted Changes changeset; 1.143 added Branch Changes, Session Changes, and Last Turn Changes.',
        'How: select Discard Changes on a file in the Changes view or in the multi-file diff editor. It works per file.',
        'Branch Changes restores the file to its version where the branch diverged from its base and deletes files the branch added. Session Changes reverts the session’s edits and keeps changes made outside the session, such as your own. Last Turn Changes reverts only the latest turn’s edits and keeps all other changes.',
        'Related: in the editor window, the working set’s Undo (1.144) is the per-file equivalent for Copilot harness sessions.',
        DATE143
      ],
      cue: ['Live option: in the Agents window, open a session’s Changes view, switch to Last Turn Changes, and discard one file. Show that earlier edits to the file remain.'],
      sources: refs('v143')
    },
    'keep-browser': {
      seconds: 140,
      notes: [
        '"Now the behavioral evidence. The agent opens the page in the integrated browser at the viewport you care about and takes a screenshot."',
        '"You comment directly on the element that is wrong. The element context goes with the comment."',
        '"The agent proposes a CSS change. That is a proposal, not a result."',
        '"Then a fresh recapture. Did it change? That fresh capture is the evidence."',
        'Point at the privacy note.',
        '"Your existing browser tabs stay private until you share one."',
        '→ Evidence comes from several places. Keep them apart.'
      ],
      know: [
        'Integrated browser scope: approved baseline (cutoff 2026-09-25), GA. Page, screenshot, element, and console evidence stay tied to a session. Existing tabs require explicit sharing; organizational policy can disable tools.',
        'Viewport screenshot and emulation: baseline workflow. The viewport is the test condition; what you expect to see is a criterion, not an observed outcome.',
        'Element feedback: baseline workflow. A proposed CSS target is not a measured result until a fresh artifact confirms it.',
        'Evidence: illustrative; a local safe page and browser-tool capture are still needed.'
      ],
      cue: ['Live option: open a disposable local page at a narrow viewport, comment on one element, accept a proposal, and recapture. Fill the measurement only from the fresh capture.'],
      sources: refs('browser')
    },
    'keep-evidence': {
      seconds: 140,
      notes: [
        '"Three kinds of evidence answer three different questions."',
        '"The test runner says whether the specified tests ran and passed. That is a status, not a verdict on the page."',
        '"The page measurement says whether the page does what you asked, measured in a fresh capture. The diff and PR review says whether this is the change we want."',
        '"The fields stay empty until real evidence fills them. Merge authority stays with the named reviewer."',
        'Point at the green strip. "And when they disagree, say the runner says PASS but the fresh screenshot still shows the bug, the tests checked something else. Comment on the element and let the agent try again. Or take the change back: Undo it in the working set, or discard the turn."',
        '"If nobody can say what done looks like, stop and ask before anything is kept."',
        '→ Now every feature from these five releases, filed.'
      ],
      know: [
        'Tests, measurements, and browser artifacts: baseline workflow. A passing test can miss visual or environment-specific behavior; domain evidence stays separate from runner status.',
        'Diff and PR review: baseline workflow. Agent feedback visibility does not grant merge authority; policy and the installed build affect available actions.',
        'Empty fields are deliberate: the deck reports no observed result.'
      ],
      sources: refs('browser', 'overview')
    },
    'release-map': {
      seconds: 90,
      notes: [
        '"Same features as the wall on slide 2, now each has a home."',
        '"Every agent feature from 1.140 through 1.144, plus the baseline we leaned on, sits under one verb."',
        'Filled dots earned a hero slide; hollow dots were roundup items.',
        '"Next week’s release notes work the same way. Read a feature, ask which decision it changes, and file it."',
        '→ Here is how you use that tomorrow.'
      ],
      know: [
        `${FEATURES.length} features in total: ${FEATURE_SPLIT}. Status letters: GA, Stable, Preview, Exp. for Experimental, Base for baseline, Flow for a baseline workflow.`,
        'Notes-only items from the 2026-11-01 review: 1.144 Cloud Automations, Customization Marketplace and connectors, Agent Host Protocol v1.0, and image generation.',
        DATE143
      ],
      sources: refs('v140', 'v141', 'v142', 'v143', 'v144')
    },
    today: {
      seconds: 105,
      notes: [
        '"Take one real task and fill in four lines before the agent starts."',
        '"Pick: which intelligence, and how you will compare it. Place: where it runs and what travels. Steer: what may act unasked, and what you will stop. Keep: the evidence that earns Keep."',
        '"Add one more name: the person who owns recovery when the evidence disagrees."',
        'Invite people to write their card now, on a task from their own backlog.',
        '→ The sources are next if you want to check any claim.'
      ],
      know: [
        'The card works on any repository task; it does not require any Preview or Experimental feature.',
        'Preview and Experimental features need the matching build, settings, plan, and policy; check them before relying on one.'
      ],
      cue: ['Give the room 60 seconds to write one card. Ask one volunteer to read theirs aloud.']
    },
    references: {
      seconds: 20,
      notes: [
        '"Every claim in the deck traces to a first-party page here, and each line names the verbs it supports."',
        'The 1.143 page omits its publication date; mention it if anyone asks.',
        '→ Thank you.'
      ],
      know: [
        'Release notes verified 2026-10-31; workflow docs verified 2026-08-12.',
        DATE143,
        'First-party pages establish the sourced behavior; installed build, account eligibility, and organization policy still need checking before a live demo.'
      ],
      sources: Object.values(SRC)
    },
    thanks: {
      seconds: 15,
      notes: [
        '"Pick, place, steer, keep. Four decisions on every agent run."',
        '"Which real task gets your four-line card first?"'
      ],
      know: ['Questions budget: about 4 minutes 45 seconds remain in a 50-minute slot.']
    }
  };
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));

  window.DECK = {
    meta: {
      slug: 'vscode-latest',
      title: 'VS Code Agents: Pick, Place, Steer, Keep',
      short: 'VS Code Agents · Pick, Place, Steer, Keep',
      category: 'tech-talks',
      source: 'tech-talks/vscode-latest/README.md',
      question: 'VS Code ships Copilot changes every week. Which ones change how I work?',
      thesis: 'Every agent run in VS Code comes down to four decisions: pick the intelligence, place the work, steer the run, and keep the changes worth keeping.'
    },
    slides
  };
})();
