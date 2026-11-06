/* FanHub #202 team: 39 slides, 2400 seconds. Parts 1-3 teach from the rehearsal record; Part 4 runs live. */
(() => {
  const S = (id, part, title, more = {}) => ({ id, part, title, section: part ? `Part ${part}` : 'Frame', ...more });
  const PIN = '61bf87964b964c2c0c9e098cf6ebb1900501315b';
  const OLD = '54e9c79276cbffde54167078a8b14cbbaf75b686';
  const FH = `https://github.com/MSBart2/FanHub/blob/${PIN}`;
  const FHT = `https://github.com/MSBart2/FanHub/tree/${PIN}`;
  const DOC = 'https://docs.github.com/en/copilot';
  const REPO = 'https://github.com/MSBart2/CopilotTraining';
  const REC = `${REPO}/tree/main/tech-talks/local-agentic-sdlc/evidence/fanhub-202-rehearsal`;
  const RECB = `${REPO}/blob/main/tech-talks/local-agentic-sdlc/evidence/fanhub-202-rehearsal`;
  const SRC = {
    team: { label: 'FanHub agent team · five agent files, pinned', href: `${FHT}/.github/agents` },
    orchestrator: { label: 'FanHub orchestrator.agent.md · pinned', href: `${FH}/.github/agents/orchestrator.agent.md` },
    rules: { label: 'FanHub AGENTS.md · Check, rounds, .team/ ownership', href: `${FH}/AGENTS.md` },
    bug: { label: 'FanHub Episodes.js · the cache bug, pinned', href: `${FH}/node/frontend/src/pages/Episodes.js` },
    record: { label: 'FanHub #202 rehearsal · the .team/ record', href: REC },
    checks: { label: 'Rehearsal evidence · check and lint output', href: `${REC}/team/evidence` },
    fusion: { label: 'FanHub #202 fusion run · Luna, 1.79 credits, the .team/ record', href: `${REPO}/tree/main/tech-talks/local-agentic-sdlc/evidence/fanhub-202-fusion` },
    edges: { label: 'FanHub 74b040b · Found list and edge tests in the agent files', href: 'https://github.com/MSBart2/FanHub/commit/74b040b2c9b075cbe848c377ddf6ee9385a1e998' },
    diff: { label: 'Rehearsal diff · Episodes.js and the new tests', href: `${RECB}/source/Episodes.js.diff` },
    issue202: { label: 'FanHub #202 · season filter shows the wrong episodes', href: 'https://github.com/MSBart2/FanHub/issues/202' },
    agents: { label: 'Custom agents configuration', href: `${DOC}/reference/custom-agents-configuration` },
    cliAgents: { label: 'Create custom agents for Copilot CLI', href: `${DOC}/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli` },
    cli: { label: 'Copilot CLI command reference', href: `${DOC}/reference/copilot-cli-reference/cli-command-reference` },
    pricing: { label: 'Copilot models and pricing · 1 AI credit = $0.01', href: `${DOC}/reference/copilot-billing/models-and-pricing` },
    limits: { label: 'Copilot CLI · set an AI credit session limit', href: `${DOC}/how-tos/copilot-cli/use-copilot-cli/set-session-limit` },
    autopilot: { label: 'Copilot CLI autopilot', href: `${DOC}/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode` },
    sessions: { label: 'Copilot CLI multiple sessions', href: `${DOC}/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions` },
    hooks: { label: 'Hooks reference', href: `${DOC}/reference/hooks-reference` },
    parallel: { label: 'Delegating and parallelizing agent work', href: `${DOC}/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents` },
    hookCode: { label: 'FanHub Stop hook · earlier pinned source', href: `https://github.com/MSBart2/FanHub/blob/${OLD}/scripts/copilot-hooks/verify-before-stop.mjs` },
    pr: { label: 'FanHub #217 · integrated draft and evidence', href: 'https://github.com/MSBart2/FanHub/pull/217' },
    squad: { label: 'bradygaster/squad · AI agent teams for any project', href: 'https://github.com/bradygaster/squad' },
    squadFirst: { label: 'Squad docs · Your First Session', href: 'https://bradygaster.github.io/squad/docs/get-started/first-session/' },
    squadRalph: { label: 'Squad docs · Ralph, the work monitor', href: 'https://bradygaster.github.io/squad/docs/features/ralph/' }
  };
  const opener = (id, part, title, subtitle, cards, context, detail) =>
    S(id, part, title, { scene: 'opener', subtitle, cards: cards.map(([icon, title, blurb]) => ({ icon, title, blurb })), terminal: { context, detail } });
  const explained = (id, part, title, subtitle, leftLabel, rightLabel, rows, footnote) =>
    S(id, part, title, { scene: 'annotated-lines', subtitle, leftLabel, rightLabel, rows, footnote });
  const KICKOFF = 'copilot --agent orchestrator --max-ai-credits 50 -i "Fix FanHub issue #202. Start at step 1."';
  const slides = [
    S('title', 0, 'Local Agentic SDLC', {
      chrome: false, visual: 'crew-motif', subtitle: 'Build the Crew, Run the Loop',
      tagline: 'Five agent files. One real bug. A record you can read, and a live run you can watch.',
      meta: 'Agents at Your Keyboard · 45 minutes'
    }),
    S('core-question', 0, 'How do I build local agents that can work together on a coding task?', {
      scene: 'workflow-question', pill: 'The question',
      subtitle: 'Five agent files, a shared .team/ folder, and one real FanHub bug, from issue to accepted fix.',
      highlight: 'Every reply leaves a file. Every claim points to one.'
    }),
    S('contents', 0, 'Meet the team. Learn the run. Trust it. Watch it live.', { sections: [
      { icon: '⌘', title: 'The Team, Top Down', subtitle: 'Orchestrator → workers → .team/', blurb: 'Read every agent file and the folder they share.', slide: 4 },
      { icon: '▷', title: 'How a Run Works', subtitle: 'Issue → approval → accept', blurb: 'Follow the rehearsal through every call and file.', slide: 12 },
      { icon: '⌕', title: 'Trust the Record', subtitle: 'Trail → proof → resume', blurb: 'Read the record, rerun the check, resume a pause.', slide: 21 },
      { icon: '◉', title: 'Run It Live', subtitle: 'Guess → kick off → verify', blurb: 'Same team, same bug, ten minutes, on stage.', slide: 27 }
    ] }),
    opener('part-1', 1, 'The Team, Top Down', 'One bug, five agent files, and the folder they share.',
      [['!', 'The bug', 'FanHub #202, one cache block'], ['⇄', 'The orchestrator', 'Who it calls, in what order'], ['▤', '.team/', 'One file per worker']],
      'FanHub/.github/agents/', 'orchestrator · planner · implementer · test-writer · test-reviewer'),
    S('the-bug', 1, 'One real bug drives the whole talk', {
      subtitle: 'FanHub #202: choose Season 2 right after the page loads, and the old list stays. The cache answers first.'
    }),
    S('crew-map', 1, 'Every worker returns to the orchestrator', {
      pill: 'Team · top down', subtitle: 'The orchestrator calls one worker, reads the file it wrote, and chooses the next call.'
    }),
    S('agent-file-anatomy', 1, 'An agent file is settings plus a job description', {
      subtitle: 'YAML frontmatter between the --- lines configures it. The Markdown body tells it what to do.'
    }),
    S('whole-orchestrator', 1, 'The orchestrator file: tools, workers, steps, rules', {
      subtitle: 'Settings say what it can use. The body says who to call, in what order, and within what limits.'
    }),
    S('orchestrator-steps', 1, 'Seven steps, each with a tool and a file', {
      subtitle: 'Every action in Parts 2 and 4 traces to one of these lines in orchestrator.agent.md.'
    }),
    S('team-folder', 1, 'The .team/ folder is the shared memory', {
      subtitle: 'Each worker reads what came before and writes one file. The orchestrator writes the log.'
    }),
    S('four-workers', 1, 'Four workers, one job and one file each', {
      subtitle: 'The same three tools for each. The instructions decide where each one may write.'
    }),
    opener('part-2', 2, 'How a Run Works', 'One real rehearsal: every call out, every file written, every check saved.',
      [['▷', 'Kick off', 'A person starts and approves'], ['⇄', 'Calls', 'Each worker writes its file'], ['✓', 'Checks', 'Real output, a routed failure']],
      '.team/status.md', 'Ten rows from issue to accept · 11 minutes · 39.88 credits'),
    S('kick-off', 2, 'A person starts the run with one command', {
      scene: 'terminal', subtitle: 'From the FanHub root. The orchestrator branches, reads the issue, drafts the task, and stops.',
      termTitle: 'PowerShell / FanHub / orchestrator reply, condensed',
      transcript: [
        { type: 'prompt', text: KICKOFF },
        { type: 'divider' },
        { type: 'response', lines: ['Switched to a new branch issue-202.', 'Read issue #202. Drafted .team/task.md: Goal, A1–A3, Check, Status: draft.', 'Edit it, set Status: approved, and reply to continue.'] },
        { type: 'outcome', mark: '→', text: 'No worker runs until a person approves what done means.' }
      ]
    }),
    S('approve-task', 2, 'The person approves what done means', {
      subtitle: 'The orchestrator drafted this from issue #202 and the code. One line from the person starts the workers.'
    }),
    S('step-plan', 2, 'Step 2: planner writes plan.md', {
      subtitle: 'The orchestrator calls planner. The reply is one line; the plan lives in the file.'
    }),
    S('step-implement', 2, 'Step 3: implementer changes src/ and logs it', {
      subtitle: 'The orchestrator passes plan.md. Implementer edits Episodes.js and writes changes.md.'
    }),
    S('step-tests', 2, 'Step 4: nine tests, and the first check is green', {
      subtitle: 'Test-writer names each test after its A#. The orchestrator runs the check and saves check-1.txt.'
    }),
    S('route-lint', 2, 'Lint fails, and step 5 routes it to the owner', {
      subtitle: 'Four errors in the test file. The rule picks test-writer. The rerun is clean.'
    }),
    S('review-accept', 2, 'Step 6: the reviewer accepts, and says what it could not see', {
      subtitle: 'Each A# has a test that would fail. The record also names the gap we fixed since.'
    }),
    S('status-trail', 2, 'status.md tells the whole story in ten rows', {
      subtitle: 'The orchestrator added one row after every reply. The person reads this before the diff.'
    }),
    opener('part-3', 3, 'Trust the Record', 'Read the record, know its limits, and pick up where it stopped.',
      [['⌕', 'Trail', 'Every claim points to a file'], ['⚑', 'Limits', 'Enforced vs. instructed'], ['↻', 'Resume', 'status.md + a fresh rerun']],
      '.team/evidence/', 'Real npm test and ESLint output from every check'),
    explained('read-the-trail', 3, 'Every question has a file that answers it',
      'The person reads the record before trusting any summary.',
      'QUESTION A PERSON ASKS', 'WHERE .team/ ANSWERS', [
        ['Did any check fail?', 'lint-1.txt: four globalThis errors in the test file.'],
        ['What changed in src/, and why?', 'changes.md: each A#, its change, and the risk.'],
        ['Is every criterion really tested?', 'review.md: why each A# test would fail.'],
        ['What happens now?', 'status.md last row: person reviews the diff.']
      ], 'Then rerun the Check yourself. The files say what was true; the rerun says what is true.'),
    S('three-proofs', 3, 'Three kinds of proof, three owners', {
      scene: 'signals', subtitle: 'Each answers a different question. Together they make the change reviewable.',
      rows: [
        { label: 'Checks', description: 'check-N.txt: tests and lint pass right now', tag: 'Behavior', z: 'local' },
        { label: 'Reviewer', description: 'review.md: every A# has a test that can fail', tag: 'Coverage', z: 'green' },
        { label: 'Person', description: 'status.md + diff + rerun → commit or not', tag: 'Authority', z: 'orange' }
      ]
    }),
    S('limits', 3, 'Know which lines are enforced', {
      scene: 'signals', subtitle: 'The CLI enforces some lines. The rest are instructions, and the diff shows whether they held.',
      rows: [
        { label: 'tools: [...]', description: 'strict-tools-list: the agent gets only these tools', tag: 'Enforced', z: 'green' },
        { label: 'Permission prompt', description: 'you approve each edit, git step, and check command', tag: 'You decide', z: 'orange' },
        { label: 'Worker list', description: 'guidance; the CLI ignores an agents: key', tag: 'Instruction', z: 'purple' },
        { label: '“Never a *.test.js file”', description: 'a sentence in the file, not a filesystem sandbox', tag: 'Instruction', z: 'purple' }
      ]
    }),
    explained('cheaper-run', 3, 'A cheaper run passed every check and missed a crash',
      'Same team, same issue, two models. The tests covered exactly what task.md named.',
      'RUN, THEN THE FIX', 'WHAT task.md NAMED, AND WHAT FOLLOWED', [
        ['GPT-6.1 Sol · 39.88 credits', 'A1–A3: it read past the issue, found the All Seasons crash, and fixed it.'],
        ['Fusion → Luna · 1.79 credits', 'A1–A2 from the issue text: 2 tests, an accept, and the crash still live.'],
        ['Now: planner + orchestrator', 'plan.md lists Found defects, and the run stops so a person scopes them.'],
        ['Now: test-writer + reviewer', 'E# tests for each control and risk; a risk with no test means revise.']
      ], 'The agent files now ask for that coverage, so it holds whichever model runs them.'),
    S('resume-from-status', 3, 'A stopped run resumes from status.md', {
      subtitle: 'Credit cap, closed terminal, or a denied prompt: start a new session and point it at the log.'
    }),
    opener('part-4', 4, 'Run It Live', 'Same team, same bug, a fresh branch, ten minutes.',
      [['$', 'Guess', 'What will it cost?'], ['▷', 'Run', 'Kick off and approve'], ['✓', 'Verify', 'status.md, diff, rerun']],
      'FanHub · main', 'copilot · /agent · /model · /limits set max-ai-credits 50'),
    S('cost-question', 4, 'How much do you think this will cost?', {
      subtitle: 'Six jobs, five agents, one real bug. Guess before the next slide.'
    }),
    S('cost-reveal', 4, 'Under fifty cents, with a budget we set', {
      subtitle: 'One AI credit is one cent. The rehearsal used 39.88. Tonight’s budget is 50.'
    }),
    S('live-kickoff', 4, 'Kick off the live run', {
      scene: 'terminal', subtitle: 'FanHub main, no .team/ folder, both servers running. The orchestrator makes the branch.',
      termTitle: 'PowerShell / FanHub / live',
      transcript: [
        { type: 'prompt', text: 'copilot' },
        { type: 'user', text: '/agent   (choose orchestrator)' },
        { type: 'user', text: '/model   (choose GPT-6.1 Sol)' },
        { type: 'user', text: '/limits set max-ai-credits 50' },
        { type: 'user', text: 'Fix FanHub issue #202. Start at step 1.' },
        { type: 'divider' },
        { type: 'response', lines: ['Expect: a switch to branch issue-202, gh issue view 202,', 'then a drafted .team/task.md and a stop for approval.'] },
        { type: 'outcome', mark: '→', text: 'Approve gh, git switch, and the Check commands. Decline installs, commits, and pushes.' }
      ],
      footnote: 'Or in one line: copilot --agent orchestrator --model gpt-6.1-sol --max-ai-credits 50 -i "Fix FanHub issue #202. Start at step 1."'
    }),
    S('live-while-it-works', 4, 'While it works: watch the files appear', {
      subtitle: 'The rehearsal clock is a guide. Each file is a reply we can open as soon as it lands.'
    }),
    explained('live-verify', 4, 'Verify the live result ourselves',
      'The team stops at an accept. Four checks, then the decision is ours.',
      'RUN OR OPEN', 'WHAT IT PROVES', [
        ['.team/status.md', 'Last row: accept, and Next: person reviews the diff.'],
        ['git status --short', 'Episodes.js modified, a new test file, nothing else.'],
        ['npm --prefix node/frontend test -- --watchAll=false --ci', 'Our own rerun: the tests pass now.'],
        ['Browser: Season 2, then All Seasons', 'Only Season 2 on the first click; All Seasons brings every episode back.']
      ], 'Agent accept is evidence. Commit, push, and the pull request stay with the person.'),
    S('scale-up', 0, 'When one run works, scale with care', {
      scene: 'signals', subtitle: 'Branches separate diffs. Worktrees separate records. People own the merge.',
      rows: [
        { label: 'Branch per issue', description: 'issue-N keeps each run’s diff on its own branch', tag: 'In the file', z: 'green' },
        { label: 'Worktree per stream', description: 'parallel issues each get a folder and a .team/', tag: 'Parallel', z: 'local' },
        { label: 'Stop hook', description: 'runs the check before the agent may stop', tag: 'Enforced', z: 'purple' },
        { label: 'Integrated review', description: 'review the combined diff before a person merges', tag: 'Person', z: 'orange' }
      ]
    }),
    S('before-after', 0, 'Agent files become a team you can audit', {
      before: ['One broad prompt', 'Context buried in chat', '“Done” in a summary', 'Lost when the session ends'],
      after: ['Five agent files, one job each', 'task.md a person approved', 'check-N.txt + review.md', 'status.md + a fresh rerun'],
      metrics: [{ value: 'Context', detail: 'task.md + plan.md' }, { value: 'Evidence', detail: 'check-N.txt + review.md' }, { value: 'Authority', detail: 'Approve, review, commit' }]
    }),
    S('squad-one-prompt', 0, 'One sentence, and a whole team builds in parallel', {
      scene: 'terminal', subtitle: 'bradygaster/squad: describe the app, say yes, and one task fans out to five agents at once.',
      termTitle: 'Squad · first session, from its docs, condensed',
      transcript: [
        { type: 'prompt', text: 'copilot --agent squad' },
        { type: 'user', text: 'I’m building a recipe sharing app with React and Node.js.' },
        { type: 'response', lines: ['Your team: Lead · Frontend · Backend · Tester, plus Scribe for memory and Ralph for the backlog.'] },
        { type: 'user', text: 'Yes. Team, build the recipe listing page.' },
        { type: 'response', lines: [
          'Lead: API contract defined; cursor pagination decided',
          'Frontend: RecipeList component built',
          'Backend: GET /api/recipes, plus a detail endpoint it saw coming',
          'Tester: 8 test cases, written while the code was being built',
          'Scribe: 3 decisions logged to decisions.md'
        ] },
        { type: 'outcome', text: 'Five agents, five context windows, one prompt.' }
      ],
      footnote: 'Every member gets a charter and its own memory in .squad/, and it grows with every task.'
    }),
    S('squad-keeps-going', 0, 'Then say “Ralph, go,” and the backlog works itself down', {
      scene: 'terminal', subtitle: 'Issues in, merged pull requests out. The team remembers every decision for the next session.',
      termTitle: 'Squad · Ralph work monitor, from its docs, condensed',
      transcript: [
        { type: 'user', text: 'Ralph, go.' },
        { type: 'response', lines: [
          'Triage: each issue routed to its owner by routing.md',
          'Changes requested on a PR: routed back to its author',
          'CI failing: the agent that wrote it fixes it',
          'Approved and green: merged, issue closed, next issue'
        ] },
        { type: 'outcome', mark: '↻', text: 'Round 3 complete · 2 issues closed, 1 PR merged · continuing' },
        { type: 'divider' },
        { type: 'prompt', text: 'squad watch --execute --max-duration 8h' },
        { type: 'outcome', text: 'Away from the keyboard: polls every 10 minutes and stops after 8 hours.' }
      ],
      footnote: 'Commit .squad/ and anyone who clones the repo gets the team, with every decision it has made.'
    }),
    S('today', 0, 'Run the team on one issue this week', {
      horizons: [
        { icon: '⧉', label: 'Copy', items: ['.github/agents/ + AGENTS.md', 'Set your Check commands'] },
        { icon: '▷', label: 'Run', items: ['One issue, one fast test', 'Approve task.md; answer prompts'] },
        { icon: '⌕', label: 'Read', items: ['status.md, then the diff', 'Rerun the Check yourself'] }
      ], takeaway: 'The first win is a run you can explain from its files.'
    }),
    S('references', 0, 'Sources you can open and reproduce', { groups: [
      { icon: '▷', title: 'Start here', z: 'local', items: [
        { ...SRC.team, description: 'Five agents, ready to copy' },
        { ...SRC.rules, description: 'Check, rounds, ownership' },
        { ...SRC.record, description: 'The run Parts 2 and 3 teach from' },
        { ...SRC.issue202, description: 'The bug this talk fixes' }
      ] },
      { icon: '⌘', title: 'Copilot CLI', z: 'purple', items: [
        { ...SRC.cliAgents, description: 'Agent discovery in Copilot CLI' },
        { ...SRC.agents, description: 'Frontmatter fields and tools' },
        { ...SRC.cli, description: 'Invocation and permission flags' },
        { ...SRC.pricing, description: 'AI credits and their price' }
      ] },
      { icon: '↗', title: 'Go further', z: 'orange', items: [
        { ...SRC.hookCode, description: 'Optional Stop hook implementation' },
        { ...SRC.sessions, description: 'Session and worktree isolation' },
        { ...SRC.squad, description: 'A full agent team, open source' },
        { ...SRC.pr, description: 'Integrated review and open risks' }
      ] }
    ] }),
    S('thanks', 0, 'Build the team.\nRead the record.', {
      chrome: false, visual: 'crew-motif', subtitle: 'Which issue will your team fix first?',
      cards: [{ value: 'Approve', detail: 'What done means' }, { value: 'Trace', detail: 'One file per reply' }, { value: 'Decide', detail: 'Diff + rerun + commit' }]
    })
  ];

  const NOTES = {
    title: { seconds: 30, sources: [SRC.team, SRC.issue202],
      notes: [
        '"Today a team of five local agents fixes one real bug. We learn it from a recorded run, then we run it live."',
        'Point to the orchestrator in the middle and the four workers around it. The person sits outside the team: they approve the task at the start and decide on the commit at the end.',
        '→ Start with the question this answers.'
      ], know: ['The team lives in FanHub at .github/agents/. The bug is FanHub #202, live on main.'] },
    'core-question': { seconds: 60, sources: [SRC.team, SRC.rules],
      notes: [
        '"How do I build local agents that can work together on a coding task?"',
        'Read the four rows. Files make each agent callable. Hand-offs keep one worker at a time, always returning to the orchestrator. A shared .team/ folder with one writer per file makes the run traceable. Tests plus a review give a person something real to decide on.',
        '"We answer it with one bug, start to finish, twice: once from the record, once live."',
        '→ Here is the route through the talk.'
      ], know: ['Files and state are Part 1, hand-offs are Part 2, evidence is Part 3, and Part 4 runs it all live.'] },
    contents: { seconds: 30, sources: [SRC.team],
      notes: ['"Meet the team top down, learn a run from the rehearsal record, learn to trust that record, then watch it live."', 'The first three parts are explainers. Part 4 is ten minutes of the real thing.', '→ Meet the team.'],
      know: ['Agenda destinations are slides 4, 12, 21, and 27, counted from one.'] },
    'part-1': { seconds: 20, sources: [SRC.team],
      notes: [
        '"First the whole team, top down: the bug, the orchestrator, the workers, and the folder they share."',
        '→ Start with the bug.'
      ], know: ['All five agent files ship in FanHub at .github/agents/. Copilot CLI discovers them when the session starts in the FanHub root.'] },
    'the-bug': { seconds: 70, sources: [SRC.issue202, SRC.bug],
      notes: [
        '"A FanHub user picked Season 2 and still saw the old list. Wait a bit, pick again, and it works."',
        'Read the quote, then the highlighted line. loadEpisodes hands back one shared cache for every filter for thirty seconds. Walk the timeline: the page loads All Seasons and fills the cache. Season 2 three seconds later hits the cache and gets All Seasons again.',
        '"It is a real bug in a real app, live on FanHub main right now. There is a quick fix, and there is a correct fix."',
        '→ Who works on it?'
      ], know: [
        'The issue text is copied from FanHub #202. The fix was merged once in PR #210 and reverted so the talk can run it live.',
        'The code is from node/frontend/src/pages/Episodes.js on FanHub main; a source comment line is omitted on the slide.'
      ] },
    'crew-map': { seconds: 70, sources: [SRC.team, SRC.rules],
      notes: [
        '"The orchestrator calls one worker. The worker reads .team/, writes one file, and replies. The orchestrator reads that file and chooses the next call."',
        'Trace the purple call down to planner and its cyan reply back up. Every cyan path ends at the orchestrator.',
        '"Workers never call each other. Only the orchestrator has the agent tool."',
        'Point to the person on both ends: the issue and approval come in on the left; the diff and commit decision go out on the right.',
        '→ What does one of these files look like?'
      ], know: ['Calls are serial: one worker at a time. Only the orchestrator lists the agent and execute tools.'] },
    'agent-file-anatomy': { seconds: 70, sources: [SRC.team, SRC.cliAgents, SRC.agents],
      notes: [
        '"An agent file is settings plus a job description."',
        'Define the two formats. YAML frontmatter is the block between the --- lines: name, description, tools. Markdown is everything below: what to read, what to write, how to reply.',
        'Read the planner body. It reads task.md and the frontend source, edits only plan.md, writes a cause, one task per acceptance criterion, and risks, then replies with one line.',
        '"The one-line reply matters. The real result is the file, where every later worker can read it."',
        '→ Now the agent that calls the others.'
      ], know: [
        'Long lines are shortened with an ellipsis on the slide; the full text is in FanHub planner.agent.md.',
        'strict-tools-list limits the agent to the listed tools. include-custom-instructions loads repository instructions such as AGENTS.md.'
      ] },
    'whole-orchestrator': { seconds: 100, sources: [SRC.orchestrator, SRC.agents],
      notes: [
        '"The orchestrator file has four parts: what it can use, who it calls, in what order, and within what limits."',
        'Settings: five tools. agent calls workers. execute runs gh, git, and the checks. edit writes its own files: the task.md draft, status.md, and evidence.',
        'Workers: a plain list, one line per worker, each naming the file that worker writes. The body opens with "You coordinate. Workers do the work."',
        'Steps: seven numbered steps, and step 1 starts by switching to a branch named for the issue. We read them on the next slide.',
        '"Rules: log every reply in status.md, resume from that log, and never touch source, tests, or a worker file."',
        '→ Read the seven steps.'
      ], know: [
        'The worker list is guidance. Copilot CLI ignores an agents: frontmatter key, and the agent tool can call any visible agent. The list works because the steps name each worker.',
        'One more rule on the file: round N is the work that leads to check-N, and the orchestrator tells each worker the round number.'
      ] },
    'orchestrator-steps': { seconds: 90, sources: [SRC.orchestrator],
      notes: [
        '"Every action in the rest of the talk traces to one of these lines."',
        'Read down the table. Step 1 gets the issue number, switches to branch issue-N, reads the issue with gh, drafts task.md, and stops for the person. Steps 2 to 4 call one worker each and read the file it wrote. Step 5 runs the Check commands and routes a failure. Step 6 calls the reviewer with the diff pasted in. Step 7 stops.',
        '"Branch, wait, route, and resume are sentences the orchestrator follows. Four tools do the work: edit, agent, execute, read."',
        'Point to the last row: after every reply, a row goes into status.md. That rule produces the trail we read at the end of Part 2.',
        '→ Where do those files live?'
      ], know: ['Step 5 routing goes to the owner of the wrong file: a failing test that matches task.md, or a lint error in source, goes to implementer; any other failure in a test file goes to test-writer. Step 7 also stops after check-4 without an accept, which bounds the loop.'] },
    'team-folder': { seconds: 70, sources: [SRC.rules, SRC.record],
      notes: [
        '"The .team/ folder is the team memory. Any agent reads any file. Each file has one writer."',
        'Read each row left to right: file, writer, what it holds, who reads it. task.md is the only file with two hands on it: the orchestrator drafts it and the person approves it.',
        '"Rounds are appended, never rewritten. That is why we can trace the run afterward."',
        '→ Meet the four workers that write these files.'
      ], know: ['The ownership table comes from FanHub AGENTS.md, which every agent loads through include-custom-instructions. .team/ is gitignored, so it stays put when step 1 switches branches.'] },
    'four-workers': { seconds: 60, sources: [SRC.team],
      notes: [
        '"Four workers, one job and one file each."',
        'Read across the cards. Planner maps each acceptance criterion to a change and a test. Implementer changes source, never tests. Test-writer writes tests named A1, A2, so a failure points back to task.md. Test-reviewer checks that every criterion has a test that would catch it breaking.',
        '"None of them runs commands. None of them calls another worker. The orchestrator runs every check."',
        '→ Watch them run.'
      ], know: ['All four workers have read, search, and edit only. Where each may write is an instruction in its file, reviewed in the diff, not a filesystem sandbox.'] },
    'part-2': { seconds: 20, sources: [SRC.record, SRC.checks],
      notes: [
        '"Now a real run of this team on this bug: every call out, every file written, every check saved."',
        'Say it once here: everything in Part 2 is copied from one rehearsal run. The .team/ files and check output are verbatim; the call and reply text in the boxes is condensed.',
        '→ It starts with a person.'
      ], know: ['The rehearsal started from FanHub 2a05c25 with the agent files from aeb78a9. The current files add the issue branch, Check commands that include ESLint, and the diff for the reviewer; Part 2 points out each change where it matters.'] },
    'kick-off': { seconds: 40, sources: [SRC.orchestrator, SRC.cli],
      notes: [
        '"A person starts the run with one command."',
        'Read the flags. --agent orchestrator picks the entry agent. -i gives it the first prompt. --max-ai-credits 50 is the spending budget for the session.',
        '"Step 1 makes a branch for the issue, reads it, drafts a task, and stops."',
        '→ The person reads the draft.'
      ], know: ['In the rehearsal the person had made the branch by hand; the current step 1 creates issue-202 itself, or reuses it if it exists. Keep permissions interactive and approve each command.'] },
    'approve-task': { seconds: 70, sources: [SRC.record, SRC.issue202],
      notes: [
        '"The person approves what done means."',
        'Read the draft: the issue, a goal, three acceptance criteria, the check command, and Status: draft. A1 is the bug. A2 says an older request can never overwrite a newer selection. A3 says All Seasons comes back.',
        '"A2 is not in the issue. The orchestrator read the code and saw that a fix for A1 alone could still lose a race."',
        '"Two questions: do A1 to A3 describe fixed, and is that check the proof you trust? Then change one line."',
        '→ With the task approved, step 2 calls planner.'
      ], know: ['A1 and A2 are shortened with an ellipsis on the slide; the full task.md is in the rehearsal record. The current AGENTS.md also puts ESLint on changed files under Check.'] },
    'step-plan': { seconds: 60, sources: [SRC.record, SRC.team],
      notes: [
        '"The orchestrator calls planner. Planner writes plan.md and replies with one line."',
        'Read the cause: one line number, one unkeyed cache. Then each row: A1 removes the cache, A2 adds a request counter so only the latest request may update the page, A3 handles All Seasons explicitly, which also fixes a crash the issue never mentioned.',
        '"The plan names its own cost: no cache means more requests. Keep that in mind when we read the diff."',
        '→ Step 3 calls implementer with this plan.'
      ], know: ['The plan rows are condensed on the slide; plan.md has the full file, change, and test description for each A#. The All Seasons crash: with a season selected, clicking All Seasons reached season.id on null.'] },
    'step-implement': { seconds: 60, sources: [SRC.record, SRC.diff],
      notes: [
        '"Implementer edits Episodes.js and logs the change in changes.md."',
        'Read the diff top down: the cache block goes, a request id is taken at the start of every load, a stale response returns early, and the All Seasons click handles null before season.id.',
        '"It removed the cache instead of keying it. That is a real design choice, and changes.md says so in plain words."',
        '→ Step 4 writes the tests.'
      ], know: ['The diff is condensed: the real change is 17 insertions and 22 deletions, and the stale check also guards the catch and finally blocks. The full diff is in the rehearsal record.'] },
    'step-tests': { seconds: 50, sources: [SRC.record, SRC.checks],
      notes: [
        '"Test-writer adds nine tests, named after the criteria. The orchestrator runs the check and saves check-1."',
        'Read tests.md: two for A1, four for A2, three for A3. Read check-1: nine passed out of nine.',
        '"Ask the room: is the bug proven fixed?"',
        '→ The orchestrator was not done checking.'
      ], know: ['check-1.txt is real react-scripts test output, including one act() deprecation warning. The A1 tests fix the clock and click Season 2 with no time passing, which is what made the original bug reproducible.'] },
    'route-lint': { seconds: 70, sources: [SRC.checks, SRC.orchestrator],
      notes: [
        '"The tests passed. ESLint on the changed files did not: four errors, all in the test file."',
        'Read lint-1. globalThis is not defined, four times, in Episodes.test.js.',
        '"Who fixes it? Step 5 answers: send it to the owner of the wrong file. A lint error in a test file goes to test-writer."',
        'Follow the row: test-writer switches to window and imports act from react in round 3. Check-2 passes nine of nine, lint-2 is clean, and the act warning is gone too.',
        '→ Now the reviewer.'
      ], know: ['In the rehearsal the orchestrator added the ESLint step on its own initiative. The current AGENTS.md lists ESLint under Check, and step 5 runs only the Check commands, so this routing is now planned rather than improvised.'] },
    'review-accept': { seconds: 50, sources: [SRC.record, SRC.orchestrator],
      notes: [
        '"The reviewer accepts, and explains why each test would catch a regression."',
        'Read the left panel: put the cache back and A1 fails; remove a guard and A2 fails; A3 catches the null crash.',
        '"Then read the right panel. The reviewer wrote down what it could not see: the diff. That one line in the record told us what to fix in the orchestrator."',
        '→ The orchestrator reports. What does the person read?'
      ], know: ['Agent acceptance is evidence for the person, not merge authority. Since the rehearsal, step 6 pastes git status and git diff into the reviewer call, and the reviewer reads the diff for changed behavior no test exercises.'] },
    'status-trail': { seconds: 50, sources: [SRC.record],
      notes: [
        '"status.md tells the whole story in ten rows."',
        'Read the highlighted rows: the person approves, check-1 passes with four lint errors and goes to test-writer, the reviewer accepts, and the last row hands the decision to the person.',
        '"Wrote points at the proof. Next says what happens. Anyone can read this without the chat."',
        '→ How much of that record can we trust?'
      ], know: ['The rehearsal numbered the kick-off as its own round, so the rounds run one ahead of the checks. The current rule says round N is the work that leads to check-N. The slide condenses status.md into one table; the file has three.'] },
    'part-3': { seconds: 20, sources: [SRC.record, SRC.checks],
      notes: ['"A record is useful when it answers real questions, when we know its limits, and when it survives a pause."', '→ Ask it questions.'],
      know: ['Every check and lint file in the rehearsal record is real tool output.'] },
    'read-the-trail': { seconds: 60, sources: [SRC.record],
      notes: [
        '"Every question a person asks has a file that answers it."',
        'Read each row: the failure is in lint-1, the source change and its risk in changes.md, the test reasoning in review.md, and the next step in status.md.',
        '"Then rerun the Check yourself. The files say what was true; the rerun says what is true now."',
        '→ Three kinds of proof, three owners.'
      ], know: ['A summary in the chat is the weakest evidence. Each row points to a file with one writer and appended rounds.'] },
    'three-proofs': { seconds: 50, sources: [SRC.record, SRC.team],
      notes: [
        '"Checks prove behavior. The reviewer proves coverage. The person holds authority."',
        'Read each row and its tag. Check output shows tests and lint pass now. review.md shows each criterion has a test that can fail. The person reads status.md and the diff, reruns the check, and decides whether to commit.',
        '"Each answers a different question, so we keep all three."',
        '→ Which lines does the CLI actually enforce?'
      ], know: ['The agents never commit, push, or merge. AGENTS.md and the orchestrator rules say so, and permission prompts keep the person in the loop for every edit and command.'] },
    limits: { seconds: 60, sources: [SRC.agents, SRC.cli, SRC.cliAgents],
      notes: [
        '"Some lines are enforced. Some are instructions. We review the diff either way."',
        'Read the rows. The tools list with strict-tools-list is enforced. Permission prompts are a person deciding. The worker list and "never a test file" are instructions.',
        '"Instructions guide the team; the diff and the rerun show whether they held."',
        '→ Instructions also decide what gets tested. Two runs show how much.'
      ], know: ['Copilot CLI ignores an agents: frontmatter key, so the agent tool can call any visible agent. execute can modify files; never treat a Markdown rule as a sandbox. Deny rules take precedence over allows.'] },
    'cheaper-run': { seconds: 70, sources: [SRC.fusion, SRC.record, SRC.edges],
      notes: [
        '"Same team, same issue, two models. Both passed every check. Only one fixed All Seasons."',
        'Read the first two rows. Sol drafted A3 after reading the code. Luna drafted A1 and A2 from the issue text. The test-writer wrote one test per criterion, and the reviewer checked each criterion, so both runs earned an accept.',
        '"Every agent followed its file. The model decided what got tested. Luna’s plan.md even named the all-seasons risk, and nothing turned it into a test."',
        'Read the last two rows: four edits now on FanHub main. The person still decides scope; the files make sure the question reaches them.',
        '→ What if the run stops halfway?'
      ], know: [
        'The Luna run cost 1.79 credits, read from the CLI by the person who ran it; its .team/ record is in the fusion evidence folder. The crash: handleSeasonClick(null) compares selectedSeason with undefined, then reads season.id on null, on every All Seasons click.',
        'Part 4 runs these current files. The live run can stop a second time after the plan, when planner lists Found defects.'
      ] },
    'resume-from-status': { seconds: 70, sources: [SRC.orchestrator, SRC.cli],
      notes: [
        '"A stopped run resumes from status.md."',
        'Suppose the session had ended right after check-1. The last row still says Next: test-writer.',
        'Read the resume command and the rule: read status.md, ask the person to rerun the last check, then continue from Next.',
        '"The person reruns and sees the same four lint errors. The file and the code agree, so the next call is safe."',
        'If the rerun disagrees, the person investigates before any call.',
        '→ Enough explaining. Let us run it.'
      ], know: ['The pause on this slide is a what-if; the rehearsal did not stop. Agent files load at session start, so resume in a new session rather than mid-session.'],
      cue: ['<code>copilot --agent orchestrator -i "Resume from .team/status.md."</code>'] },
    'part-4': { seconds: 20, sources: [SRC.team],
      notes: ['"Same team, same bug, a fresh branch, and ten minutes. First, a guess."', '→ What will it cost?'],
      know: ['Before the talk: FanHub on main, pulled, no .team/ folder, no issue-202 branch, both servers running, Copilot CLI signed in.'],
      cue: ['From the FanHub root before the talk: <code>git switch main; git pull; Remove-Item -Recurse -Force .team -ErrorAction SilentlyContinue; git branch -D issue-202</code>, then <code>npm --prefix node/backend start</code> and <code>npm --prefix node/frontend start</code> in two more terminals. Set the model to GPT-6.1 Sol with <code>/model</code>, the model the rehearsal used.'] },
    'cost-question': { seconds: 30, sources: [SRC.pricing],
      notes: [
        '"How much do you think this will cost?"',
        'Point at the six jobs: read the issue, plan, change the code, write tests, check and route, review. All unattended after one approval.',
        '"Hands up: under a dollar? One to ten? More than ten?"',
        '→ Here is the answer.'
      ], know: ['Let the room commit to a guess before advancing. Most rooms guess high.'] },
    'cost-reveal': { seconds: 40, sources: [SRC.pricing, SRC.record],
      notes: [
        '"One AI credit is one cent. The rehearsal used 39.88 credits: about forty cents."',
        'Read the bottom panel: eleven minutes, three problems found, nine tests, two checks with a routed lint failure, and an accept with a record we can read.',
        '"Tonight the budget is fifty credits, fifty cents. Let us see what it buys."',
        '→ Kick it off.'
      ], know: [
        'The rate comes from GitHub Copilot models and pricing: 1 AI credit = $0.01 USD. Plan allowances can cover usage, so the out-of-pocket cost can be lower.',
        '39.88 credits is measured from one rehearsal on GPT-6.1 Sol. Credits per call vary by model, so select GPT-6.1 Sol with /model before the live kick-off to keep the comparison fair. A live run still uses a different number of credits.',
        'The current agent files also write edge tests and can stop once more for Found defects, so the live run can use more credits than the rehearsal; the 50-credit limit holds either way.'
      ] },
    'live-kickoff': { seconds: 60, sources: [SRC.orchestrator, SRC.limits, SRC.cli],
      notes: [
        '"Four settings, all inside the session: the agent, the model, the budget, then the prompt."',
        'Start copilot. Run /agent and choose orchestrator. Run /model and choose GPT-6.1 Sol, the rehearsal model. Run /limits set max-ai-credits 50 so the room sees the budget go in.',
        'Type the prompt. Narrate step 1 as it happens: the branch switch, gh issue view, then the draft task.md.',
        'Approve each permission prompt out loud: gh issue view, git switch, then later the Check commands, git status, and git diff. Decline any install, commit, or push.',
        '→ The draft arrives. Approve it, then watch.'
      ], know: [
        'If issue-202 already exists, step 1 switches to it. If .team/task.md names another issue, step 1 stops and asks to move .team/ aside.',
        'The CLI requires a limit of at least 30 credits. When the limit is reached the run stops cleanly; /limits set with a new value continues from where it stopped.',
        'The footnote is the same run in one line, for scripts and repeat runs. Point at it: every interactive choice has a matching switch. Run /usage at the end to read the credits spent.'
      ],
      cue: ['From the FanHub root: <code>copilot</code>, then <code>/agent</code>, <code>/model</code>, <code>/limits set max-ai-credits 50</code>, and <code>Fix FanHub issue #202. Start at step 1.</code>'] },
    'live-while-it-works': { seconds: 370, sources: [SRC.record, SRC.orchestrator, SRC.rules],
      notes: [
        '"First, the one decision the team cannot make for us: what done means."',
        'Open .team/task.md on screen. Read the issue line, each criterion, and the Check commands. If a criterion is vague, edit it now. Change Status to approved and tell it to continue.',
        '"From here the team works. Each row is a file that will appear in .team/."',
        'Switch between the terminal and the editor. As each file lands, open it and read one line aloud: the Cause in plan.md, one A# in changes.md, one A# and one E# test name in tests.md, the summary line of check-1.',
        'If plan.md lists Found defects, the orchestrator stops again. Read each Found line aloud, then add it to task.md as an A# or under Out of scope, in front of the room.',
        'Answer permission prompts as they come. Say which rule in the orchestrator each prompt comes from.',
        '"If a check fails, watch step 5: which worker gets it, and why?"',
        'Come back to this slide whenever the screen is quiet. It shows what comes next.',
        '→ When the reviewer replies, verify.'
      ], know: [
        'Expect Check to list the npm test command and ESLint on changed files, from AGENTS.md. The criteria wording varies from run to run.',
        'Times are approximate from the rehearsal clock; the live run varies. If about ten minutes pass without an accept, leave the session running, read status.md for the current step, and point to the rehearsal record for the rest. If the budget is reached, a new session resumes from status.md after a rerun.'
      ] },
    'live-verify': { seconds: 80, sources: [SRC.orchestrator, SRC.rules],
      notes: [
        '"The team says accept. Now we check it ourselves."',
        'Open status.md and read the last row. Run git status --short: Episodes.js modified and a new test file. Rerun the npm test command. Then in the browser, load Episodes, pick Season 2 at once, then click All Seasons.',
        '"Four checks, and the commit decision stays with a person."',
        'Run /usage in the CLI and read the credits spent. Compare it with the guesses and with the rehearsal’s 39.88.',
        '→ When one run works, scale it.'
      ], know: ['The frontend runs on port 3000 with npm start. After the talk, reset with git switch main, then delete the issue-202 branch and .team/.'] },
    'scale-up': { seconds: 50, sources: [SRC.hookCode, SRC.hooks, SRC.sessions, SRC.pr],
      notes: [
        '"Branch per issue is already in the file. The rest are next steps."',
        'Read the rows. One branch per issue keeps diffs apart. .team/ is per checkout, so parallel issues each need their own worktree. A Stop hook runs the check before the agent may stop. A combined review catches what separate green runs miss.',
        '"Each step adds isolation or enforcement. A person still owns the merge."',
        '→ Recap.'
      ], know: ['FanHub used a Stop hook in an earlier team: node scripts/copilot-hooks/verify-before-stop.mjs. FanHub #217 combined two isolated green runs, and a merged review still found white headings on white panels.'] },
    'before-after': { seconds: 40, sources: [SRC.team],
      notes: [
        '"Agent files become a team you can audit."',
        'Read each pair. A broad prompt becomes five files with one job each. Context in chat becomes an approved task.md. Done in a summary becomes check output and a review. A lost session becomes status.md and a rerun.',
        '"Context, evidence, and authority each have a home."',
        '→ That is the primer. Here is how far the idea goes.'
      ], know: ['This is a method comparison, not a measured productivity result.'] },
    'squad-one-prompt': { seconds: 60, sources: [SRC.squad, SRC.squadFirst],
      notes: [
        '"We just watched five files fix one bug for about forty cents. Now picture what happens when someone keeps going for months."',
        'Introduce Squad: an open-source project by Brady Gaster. It installs a coordinator agent, and the whole team lives in the repository as files. This transcript is condensed from its First Session guide.',
        'Walk the transcript. One sentence describes the app. Squad proposes a team cast for this project, and every member gets a charter and its own memory. One more sentence, "Team, build the recipe listing page," and five agents start at once, each in its own context window.',
        '"Look at the tester. It wrote eight test cases from the requirements while the code was still being written. Nobody waited for anybody."',
        '"And the backend agent added a detail endpoint before anyone asked. Same planner idea we used, running at team scale."',
        '→ That is one task. Now hand it the backlog.'
      ], know: [
        'Install: npm install -g @bradygaster/squad-cli, WinGet, or Homebrew, then squad init. squad init --preset default sets up a full team without the questions.',
        'Squad names members from a thematic cast, such as Alien characters; the slide shows roles. Saying "team" triggers parallel fan-out; naming one agent sends focused work to it.'
      ] },
    'squad-keeps-going': { seconds: 60, sources: [SRC.squad, SRC.squadRalph],
      notes: [
        '"Ralph is the team member whose only job is making sure the team never sits idle."',
        'Read the loop. Ralph reads GitHub issues, routes each one to its owner using routing.md, spawns the agent, watches the pull request, sends review feedback back to the author, sends CI failures back to whoever wrote the code, and merges approved green work. Then it checks again, every round, without asking.',
        'Point at the second command. squad watch --execute keeps that loop running in a terminal while you are away, with a round or time limit you choose. A GitHub Actions heartbeat can do the triage half even with no terminal open.',
        'Point at the footnote. decisions.md and each agent\u2019s history.md accumulate. Squad\u2019s own docs say that after two or three real tasks, agents are noticeably better than at a cold start. Commit .squad/ and the whole team, memory included, travels with the repo.',
        '"Same building blocks as today: agent files, a coordinator, a shared folder, and a person who approves. Built out, they keep a backlog moving overnight. Choose your own approval gates, because Squad\u2019s quick start uses --yolo to skip prompts."',
        '→ Your first step is smaller. Here it is.'
      ], know: [
        'Ralph needs gh authenticated with repo and project scopes. Watch mode limits: --max-rounds N and --max-duration 8h; the first limit reached ends the run.',
        'The round report is the docs example of Ralph\u2019s check-in format. Squad also projects the team into other hosts with squad init --client, and squad export moves a trained team to another repo.'
      ] },
    today: { seconds: 60, sources: [SRC.team, SRC.rules],
      notes: [
        '"Run the team on one issue this week."',
        'Copy the agents and AGENTS.md, and set your Check commands. Pick one issue with a fast test. Kick off, approve the task, and answer each prompt. Then read status.md before the diff, and rerun the Check yourself.',
        '"The first win is a run you can explain from its files."',
        '→ Sources next.'
      ], know: ['Start with a budget such as --max-ai-credits 50 and adjust from your own runs.'],
      cue: ['<code>copilot --agent orchestrator --max-ai-credits 50 -i "Fix issue #N. Start at step 1."</code>'] },
    references: { seconds: 20, sources: [SRC.team, SRC.rules, SRC.record, SRC.issue202, SRC.cliAgents, SRC.agents, SRC.cli, SRC.pricing, SRC.hookCode, SRC.sessions, SRC.squad, SRC.pr],
      notes: ['"Start with the FanHub team and the rehearsal record. Use the docs for runtime details."', '→ Your first issue.'],
      know: ['FanHub links are pinned to a fixed revision.'] },
    thanks: { seconds: 40, sources: [SRC.team],
      notes: ['"Which issue will your team fix first?"', '"Approve what done means, trace every reply, and decide from the evidence."', 'Invite questions about task approval, routing, permissions, cost, and resume.'],
      know: ['Five minutes of the 45-minute slot remain for discussion. Speaker budgets are estimates until a timed run-through.'] }
  };
  slides.forEach((s) => Object.assign(s, NOTES[s.id]));
  window.DECK = {
    meta: {
      slug: 'local-agentic-sdlc', title: 'Local Agentic SDLC: Build the Crew, Run the Loop',
      short: 'Local Agentic SDLC', category: 'Agents at Your Keyboard',
      source: 'tech-talks/local-agentic-sdlc/README.md',
      question: 'How do I build local agents that can work together on a coding task?',
      thesis: 'Agent files define the team; an orchestrator, a shared .team/ folder with one writer per file, and tests plus a reviewer turn them into a run a person can trace, resume, and decide on.'
    }, slides
  };
})();
