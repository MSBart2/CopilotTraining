/* Deck-only argument diagrams for the FanHub #202 team. Shared frames and patterns own the talk spine. */
(() => {
  const { svg: v, html, esc } = window.Kit;
  const t = (x, y, text, cls = 'body-copy', anchor = 'start') => v.text(x, y, text, { cls, anchor });
  const tone = (inner, z = 'purple') => v.g(inner, { cls: `z-${z}` });
  const line = (d, z = 'purple', at = 300) => tone(v.trace(d, { cls: 'arrow', at, dur: 700 }), z);
  const arrow = (x1, y1, x2, y2, z = 'purple', at = 300) => {
    const horizontal = y1 === y2;
    const back = horizontal && x2 < x1;
    const head = horizontal
      ? (back ? `M${x2 + 9} ${y2 - 6}L${x2} ${y2}L${x2 + 9} ${y2 + 6}` : `M${x2 - 9} ${y2 - 6}L${x2} ${y2}L${x2 - 9} ${y2 + 6}`)
      : `M${x2 - 6} ${y2 - 9}L${x2} ${y2}L${x2 + 6} ${y2 - 9}`;
    return line(`M${x1} ${y1}L${x2} ${y2}`, z, at) + tone(v.pop(v.path(head, { cls: 'arrow' }), at + 600), z);
  };
  const panel = (x, y, w, h, label, z = 'local') => tone(
    v.rect(x, y, w, h, { cls: 'box head', r: 18 }) +
    v.rect(x, y, 5, h, { cls: 'card-edge', r: 2 }) +
    t(x + 26, y + 34, label, 'artifact-label z-text'), z);
  const code = (x, y, lines, cls = 'code', lh = 35) => lines.map((a, i) => t(x, y + i * lh, a, cls)).join('');
  const note = (x, y, heading, body, z = 'purple', max = 37) =>
    tone(t(x, y, heading, 'artifact-title z-text') +
      v.lines(x, y + 38, body, { cls: 'body-copy', max, lh: 30, anchor: 'start' }), z);
  const scene = (s, label, inner, h = 530) => `${html.head(s)}${v.scene(1440, h, label, inner)}${html.footnote(s.footnote)}`;
  const node = (x, y, w, title, sub, z = 'local', h = 86) => tone(
    v.rect(x, y, w, h, { cls: 'zone', r: 16 }) +
    t(x + w / 2, y + 36, title, 'artifact-title z-text', 'middle') +
    t(x + w / 2, y + 65, sub, 'fine', 'middle'), z);
  const mark = (x, y, w, z = 'orange') => tone(v.rect(x, y, w, 30, { cls: 'zone', r: 6 }), z);
  /* Column table: cols [x, heading, cls]; toned rows colour every cell via z-text. */
  const table = (cols, rows, { y0 = 22, first = 62, rh = 54, tones = {}, at = 120, step = 120 } = {}) => {
    let b = cols.map(([x, head]) => t(x, y0, head, 'artifact-label')).join('') + v.path(`M0 ${y0 + 18}H1440`, { cls: 'divider' });
    rows.forEach((r, i) => {
      const y = y0 + first + i * rh;
      const z = tones[i];
      const cells = r.map((c, j) => t(cols[j][0], y, c, `${cols[j][2]}${z ? ' z-text' : ''}`)).join('');
      const band = Math.min(rh - 8, 44);
      if (z) b += v.enter(tone(v.rect(-12, y - band * 0.7, 1464, band, { cls: 'zone', r: 8 }), z), at + i * step);
      b += v.enter(z ? tone(cells, z) : cells, at + i * step);
      if (i < rows.length - 1) b += v.path(`M0 ${y + rh / 2 - 4}H1440`, { cls: 'divider' });
    });
    return b;
  };

  const crewMotif = () => {
    const workers = [['planner', 50, 350], ['implementer', 390, 350], ['test-writer', 50, 500], ['test-reviewer', 390, 500]];
    return v.scene(760, 760, 'One orchestrator connects four workers. Each worker writes one file in .team/, and a person makes the commit decision.',
      v.circle(380, 360, 295, { cls: 'ring' }) +
      node(220, 100, 320, 'person', 'issue + approval', 'orange') +
      arrow(380, 186, 380, 230, 'orange') +
      node(205, 230, 350, 'orchestrator', 'call → read file → next', 'purple') +
      workers.map(([name, x, y], i) => line(`M380 316V${y - 28}H${x + 145}V${y}`, 'purple', 450 + i * 120) +
        v.pop(node(x, y, 290, name, ['plan.md', 'changes.md', 'tests.md', 'review.md'][i], i === 3 ? 'green' : 'local'), 650 + i * 150)).join('') +
      tone(t(380, 675, 'person: diff + check → commit decision', 'body-copy z-text', 'middle'), 'orange'));
  };
  /* Preserve the approved asymmetric question composition. */
  const workflowQuestion = (s) => {
    const rows = [
      ['01', 'FILES', 'Five agent files', '.agent.md → a callable worker', 'local'],
      ['02', 'HAND-OFFS', 'Call out, reply back', 'One worker at a time → orchestrator', 'purple'],
      ['03', 'STATE', 'A shared .team/ folder', 'One writer per file → a traceable record', 'purple'],
      ['04', 'EVIDENCE', 'Tests plus a review', 'Check output + accept → a person decides', 'green']
    ];
    const diagram = v.scene(730, 565, 'Agent files become a team through hand-offs, a shared .team/ folder with one writer per file, and test evidence plus a review for a person to decide on.',
      v.rect(1, 1, 728, 563, { cls: 'box head', r: 24 }) +
      rows.map(([n, tag, title, body, z], i) => {
        const y = 22 + i * 134;
        return v.enter(tone(
          t(30, y + 30, n, 'artifact-label z-text') +
          t(92, y + 28, tag, 'artifact-label z-text') +
          t(92, y + 66, title, 'artifact-title') +
          t(92, y + 98, body, 'body-copy'), z), i * 180 + 200) +
          (i < 3 ? v.path(`M92 ${y + 118}H695`, { cls: 'divider' }) : '');
      }).join(''));
    return `${html.pill(s)}<div class="question-layout"><div><h2 class="question">${esc(s.title)}</h2><p class="subtitle">${esc(s.subtitle)}</p></div>${diagram}</div><div class="question-footer"><b>ONE REAL BUG</b><span>${esc(s.highlight)}</span></div>`;
  };
  const theBug = (s) => scene(s, 'FanHub issue 202: picking Season 2 right after the Episodes page loads still shows the earlier list. In loadEpisodes, one shared cache answers every filter for 30 seconds, so Season 2 right after load shows the All Seasons list instead of only Season 2.',
    panel(0, 0, 600, 330, 'FanHub #202 / the issue', 'orange') +
    v.enter(v.lines(28, 96, '“I picked Season 2 from the season filter, and the list still showed the Season 1 episodes. If I wait a bit and pick Season 2 again, the right episodes show up.”', { cls: 'body-copy', max: 44, lh: 36, anchor: 'start' }), 200) +
    panel(630, 0, 810, 330, 'node/frontend/src/pages/Episodes.js', 'purple') +
    v.pop(mark(648, 170, 774), 1200) +
    code(658, 86, ['// inside loadEpisodes(seasonId = null)', '  const now = Date.now();', '  if (episodeCache && cacheTimestamp &&', '      now - cacheTimestamp < 30000) {', '    setEpisodes(episodeCache);', '    setLoading(false);', '    return;', '  }'], 'code-small', 26) +
    v.enter(tone(t(658, 312, '↑ every filter gets the cached list for 30 seconds', 'fine z-text'), 'orange'), 1400) +
    v.pop(node(0, 370, 420, '0 s · page loads', 'All Seasons → cache filled', 'local', 96), 600) +
    arrow(432, 418, 498, 418, 'purple', 900) +
    v.pop(node(510, 370, 420, '3 s · choose Season 2', 'cache hit → still All Seasons', 'orange', 96), 1000) +
    arrow(942, 418, 1008, 418, 'purple', 1300) +
    v.pop(node(1020, 370, 420, 'expected', 'only Season 2 episodes', 'green', 96), 1400) +
    t(720, 525, 'One cache block, one real bug, live on FanHub main. Five agents fix it, and the record shows how.', 'body-copy', 'middle'), 545);
  /* Preserve all four explicit cyan return paths into the coordinator. */
  const crewMap = (s) => {
    const xs = [0, 360, 720, 1080];
    const names = ['planner', 'implementer', 'test-writer', 'test-reviewer'];
    const inputs = ['reads task.md', 'reads plan.md', 'reads changes.md', 'reads everything'];
    const outputs = ['plan.md', 'src/ + changes.md', '*.test.js + tests.md', 'review.md'];
    let b = node(0, 8, 320, 'person', 'issue + approved task.md', 'orange') +
      arrow(342, 52, 503, 52, 'orange') +
      node(525, 8, 390, 'orchestrator', 'call → read file → choose next', 'purple') +
      arrow(937, 52, 1098, 52, 'orange', 1500) +
      node(1120, 8, 320, 'person', 'diff + check → commit', 'orange');
    b += line('M650 94V150H150V166M650 150H1230V166M510 150V166M870 150V166', 'purple', 300) +
      tone(t(310, 137, 'calls out', 'fine z-text'), 'purple');
    xs.forEach((x, i) => {
      b += t(x + 150, 193, inputs[i], 'route-label', 'middle') +
        arrow(x + 150, 211, x + 150, 249, 'purple', 500 + i * 160) +
        v.pop(node(x, 270, 300, names[i], 'read · search · edit', i === 3 ? 'green' : 'local'), 650 + i * 160) +
        arrow(x + 150, 372, x + 150, 420, 'local', 900 + i * 160) +
        t(x + 150, 452, outputs[i], 'route-label', 'middle') +
        line(`M${x + 150} 466V490`, 'local', 1100 + i * 160);
    });
    b += line('M150 490H1420V114H850V94', 'local', 1600) +
      tone(v.pop(v.path('M842 104L850 94L858 104', { cls: 'arrow' }), 2200), 'local') +
      tone(t(1040, 137, 'replies back', 'fine z-text'), 'local') +
      t(720, 534, 'Workers never call each other. Each writes one file; the orchestrator reads it and chooses the next call.', 'fine', 'middle');
    return scene(s, 'The person hands an issue and an approved task to the orchestrator. Purple call arrows lead to planner, implementer, test-writer, and test-reviewer; each reads .team/ and writes one file. Every reply returns along the cyan path to the orchestrator, which chooses the next call. A person reviews the diff and decides on the commit.', b, 554);
  };
  const anatomy = (s) => scene(s, 'The FanHub planner agent file: YAML settings name the agent and give it read, search, and edit. The Markdown body says to read task.md and the frontend source, edit only .team/plan.md, write a cause, a task per acceptance criterion, and risks, and reply with one line.',
    panel(0, 0, 940, 520, '.github/agents/planner.agent.md', 'purple') +
    code(28, 86, ['---', 'name: planner', 'description: "Read the approved task and the code; …"', 'tools: ["read", "search", "edit"]', 'strict-tools-list: true', 'include-custom-instructions: true', '---'], 'code', 33) +
    v.path('M28 311H910', { cls: 'divider' }) +
    code(28, 356, ['Read `.team/task.md` and node/frontend/src/, …', 'Edit only `.team/plan.md`.', 'Write plan.md with: Cause · Tasks (one per A#) · Risks', 'Reply with one line: plan.md written, and the number of tasks.'], 'code-small', 40) +
    v.enter(note(990, 62, 'YAML = settings', 'name is how the orchestrator calls it. tools is all it gets.', 'purple', 26), 300) +
    v.enter(note(990, 222, 'Markdown = the job', 'What to read, the one file to write, and the reply.', 'local', 26), 600) +
    v.enter(note(990, 382, 'One file out', 'plan.md is what the orchestrator reads next.', 'green', 26), 900), 540);
  const wholeFile = (s) => {
    const zones = [
      [56, '1 · SETTINGS / YAML', ['name: orchestrator', 'tools: ["agent", "read", "search", "execute", "edit"]'], 'purple',
        'What it can use', 'agent calls · execute runs gh, git, checks · edit logs'],
      [158, '2 · WORKERS / MARKDOWN', ['Use only these workers:', '- planner: reads task.md, writes plan.md.', '- implementer: edits node/frontend/src/ (not test files), …', '- test-writer: edits `*.test.js` files …, writes tests.md.', '- test-reviewer: reads everything, writes review.md …'], 'local',
        'Who it calls', 'Four workers. Each line names the one file it writes.'],
      [344, '3 · STEPS 1–7 / MARKDOWN', ['branch issue-N → plan → implement → tests → check → review → stop'], 'purple',
        'In what order', 'Seven steps, starting with a branch per issue.'],
      [424, '4 · RULES / MARKDOWN', ['After every reply, add a row to … `.team/status.md`: round, …', 'On resume in a new session, read status.md, ask the person …', "Never edit source, tests, or a worker's file. Never commit, …"], 'orange',
        'Within what limits', 'Log every reply. Resume from the log. Leave code to the workers.']
    ];
    let b = panel(0, 0, 900, 548, '.github/agents/orchestrator.agent.md', 'purple');
    zones.forEach(([y, label, lines, z, head, body], i) => {
      b += v.enter(tone(t(28, y + 18, label, 'artifact-label z-text'), z) + code(28, y + 48, lines, 'code-small', 25), 150 + i * 260) +
        v.enter(note(955, 40 + i * 135, head, body, z, 40), 260 + i * 260);
      if (i < 3) b += v.path(`M28 ${zones[i + 1][0] - 4}H872`, { cls: 'divider' });
    });
    return scene(s, 'The FanHub orchestrator agent file has four parts: YAML settings with the agent, read, search, execute, and edit tools; a Markdown list of four workers, each naming the file it writes; seven numbered steps from an issue branch to stop; and rules to log every reply in status.md, resume from it, and never edit code or commit.', b, 556);
  };
  const orchestratorSteps = (s) => {
    const rows = [
      ['1 kick-off', 'switch to branch `issue-N` … draft task.md … Stop and ask', 'execute·edit', 'issue-N · task.md'],
      ['2 plan', '… approved, call planner. Wait, then read plan.md.', 'agent', 'plan.md'],
      ['3 implement', 'Call implementer with plan.md. Wait, then read changes.md.', 'agent', 'changes.md'],
      ['4 tests', 'Call test-writer. Wait, then read tests.md.', 'agent', 'tests.md'],
      ['5 check', 'Run every command under Check … Save check-N.txt. Route …', 'execute', 'check-N.txt'],
      ['6 review', 'Call test-reviewer … paste `git --no-pager diff` …', 'agent', 'review.md'],
      ['7 stop', 'Stop after an accept, or after check-4. Report.', 'read', 'report → person'],
      ['every reply', 'add a row to … `.team/status.md`', 'edit', 'status.md']
    ];
    const b = table([[0, 'STEP', 'artifact-title'], [190, 'FROM orchestrator.agent.md', 'code-small'], [940, 'TOOL', 'route-label'], [1110, 'LEAVES', 'code-small']], rows,
      { tones: { 0: 'orange', 4: 'purple', 5: 'green', 6: 'orange', 7: 'purple' } }) +
      t(720, 534, 'Branch, wait, route, and resume are sentences in this file. Four tools do the work.', 'body-copy', 'middle');
    return scene(s, `The orchestrator's seven steps and its logging rule: ${rows.map(r => `${r[0]} uses ${r[2]} and leaves ${r[3]}`).join('; ')}.`, b, 554);
  };
  const teamFolder = (s) => {
    const rows = [
      ['task.md', 'orchestrator → person', 'Issue · Goal · A1–A3 · Check · Status', 'every agent'],
      ['plan.md', 'planner', 'Cause · a task per A# · Risks', 'implementer, writer, reviewer'],
      ['changes.md', 'implementer', 'each A#: the change and why', 'test-writer, reviewer'],
      ['tests.md', 'test-writer', 'each A# → its test names', 'test-reviewer'],
      ['review.md', 'test-reviewer', 'accept / revise + owner', 'orchestrator'],
      ['status.md', 'orchestrator', 'one row per reply', 'person · resume'],
      ['evidence/', 'orchestrator', 'check-N.txt: the Check output', 'reviewer · person']
    ];
    const b = table([[0, '.team/ FILE', 'code'], [260, 'WRITER', 'body-copy'], [610, 'HOLDS', 'body-copy'], [1070, 'READ BY', 'body-copy']], rows,
      { first: 66, rh: 58, tones: { 0: 'orange', 4: 'green', 5: 'purple', 6: 'purple' } }) +
      t(720, 534, 'Any agent reads any file. Each file has one writer. .team/ is gitignored, so it stays put across branches.', 'body-copy', 'middle');
    return scene(s, `The .team folder: ${rows.map(r => `${r[0]} is written by ${r[1]}, holds ${r[2]}, and is read by ${r[3]}`).join('; ')}.`, b, 554);
  };
  const fourWorkers = (s) => {
    const cards = [
      ['planner', 'Map each A# to a file, a change, and a test.', '.team/plan.md', 'plan.md written, and the number of tasks', 'run commands or call workers', 'local'],
      ['implementer', 'Change src/ for the plan or a routed failure.', 'src/ + changes.md', 'one line naming the changed files', 'edit tests, run tests, claim a pass', 'local'],
      ['test-writer', 'One test per A#, named A#: …', '*.test.js + tests.md', 'one line naming the tests added', 'edit source, run tests, call workers', 'local'],
      ['test-reviewer', 'Confirm each A# has a test that would catch it breaking.', '.team/review.md', 'the verdict: accept or revise', 'run commands or call workers', 'green']
    ];
    let b = '';
    cards.forEach(([name, job, edits, reply, never, z], i) => {
      const x = i * 365;
      b += v.enter(tone(v.rect(x, 0, 345, 515, { cls: 'box head', r: 18 }) + v.rect(x, 0, 5, 515, { cls: 'card-edge', r: 2 }) +
        t(x + 26, 48, name, 'artifact-title z-text'), z) +
        t(x + 26, 84, 'read · search · edit', 'code-small') +
        t(x + 26, 132, 'JOB', 'artifact-label') + v.lines(x + 26, 164, job, { cls: 'body-copy', max: 25, lh: 29, anchor: 'start' }) +
        t(x + 26, 262, 'WRITES', 'artifact-label') + t(x + 26, 294, edits, 'code-small') +
        t(x + 26, 338, 'REPLIES', 'artifact-label') + v.lines(x + 26, 370, reply, { cls: 'body-copy', max: 25, lh: 29, anchor: 'start' }) +
        tone(t(x + 26, 446, 'NEVER', 'artifact-label z-text'), 'orange') + v.lines(x + 26, 476, never, { cls: 'fine', max: 30, lh: 24, anchor: 'start' }), 150 + i * 220);
    });
    b += t(720, 555, 'Same three tools for every worker. The file each one may write is the difference.', 'body-copy', 'middle');
    return scene(s, `Four worker files, each with read, search, and edit: ${cards.map(c => `${c[0]} does ${c[1]} writes ${c[2]}, replies with ${c[3]}, and never may ${c[4]}`).join('; ')}.`, b, 572);
  };
  const approveTask = (s) => scene(s, 'The task.md the orchestrator drafted in the rehearsal: issue 202, a goal, three acceptance criteria about Season 2 right after load, stale responses, and returning to All Seasons, and the npm test check. The person decides whether A1 to A3 mean fixed and whether the check is trusted, then changes Status from draft to approved. No worker runs before that.',
    panel(0, 0, 900, 492, '.team/task.md / DRAFTED BY THE ORCHESTRATOR', 'purple') +
    code(28, 84, ['Issue: #202 - Season filter shows the wrong episodes …', 'Goal: … selecting a season immediately after initial load', '      reliably displays that season’s episodes …'], 'code-small', 28) +
    v.enter(code(28, 180, ['## Acceptance', '- A1: … selecting Season 2 within a few seconds displays only', '      Season 2 episodes, without requiring another selection.', '- A2: An older episode request completing after a newer season', '      selection cannot replace the episodes for the current filter.', '- A3: Returning from a season filter to the all-seasons option', '      displays all episodes as before.'], 'code-small', 28), 300) +
    v.enter(code(28, 396, ['## Check  npm --prefix node/frontend test -- --watchAll=false --ci'], 'code-small', 28), 600) +
    tone(t(28, 452, 'Status: draft', 'code z-text'), 'orange') +
    arrow(260, 444, 330, 444, 'green', 1400) +
    v.pop(tone(t(350, 452, 'Status: approved', 'code z-text'), 'green'), 1900) +
    v.enter(note(950, 50, 'The person decides', 'Do A1–A3 describe what fixed means?', 'orange', 26), 800) +
    v.enter(note(950, 200, '…and the proof', 'Is Check the command you trust?', 'purple', 26), 1100) +
    v.enter(note(950, 350, 'Then approves', 'Change one line. No worker runs before it does.', 'green', 26), 1500) +
    t(720, 535, 'A2 goes past the issue: the orchestrator read the code and named the race that would bring the bug back.', 'fine', 'middle'), 550);
  /* One worker call: the message out, the one-line reply back, and the file it wrote below. */
  const handoff = (s, cfg) => scene(s, cfg.label,
    panel(0, 0, 600, 170, cfg.outLabel, 'purple') +
    v.enter(code(28, 82, cfg.out, 'code-small', 30), 150) +
    arrow(615, 70, 745, 70, 'purple', 500) +
    tone(t(680, 54, 'call', 'fine z-text', 'middle'), 'purple') +
    arrow(745, 125, 615, 125, 'local', 1100) +
    tone(t(680, 157, 'reply', 'fine z-text', 'middle'), 'local') +
    panel(760, 0, 680, 170, cfg.replyLabel, 'local') +
    v.enter(code(788, 82, cfg.reply, 'code-small', 30), 1300) +
    v.enter(cfg.bottom, 1600) +
    t(720, 540, cfg.footer, 'body-copy', 'middle'), 560);
  const stepPlan = (s) => handoff(s, {
    label: 'Step 2 in the rehearsal: the orchestrator calls planner, which writes .team/plan.md and replies with one line. The cause is the unkeyed cache at Episodes.js line 85. A1 removes the cache, A2 adds a request counter so only the latest request may update state, and A3 handles All Seasons explicitly, which also fixes a null crash. The risk: more requests.',
    outLabel: 'ORCHESTRATOR → PLANNER', replyLabel: 'PLANNER → ORCHESTRATOR',
    out: ['task.md is approved. Read it and', 'node/frontend/src/. Write plan.md.'], reply: ['plan.md written, 3 tasks.'],
    bottom: panel(0, 196, 1440, 310, 'WROTE / .team/plan.md', 'local') +
      code(28, 276, ['Cause: Episodes.js:85 `setEpisodes(episodeCache)` reuses one unkeyed cache for every filter.', '',
        'A1 · remove the cache; each filter makes its own request       → A1 test: Season 2 right after load',
        'A2 · a useRef request counter; only the latest request commits → A2 tests: older responses lose',
        'A3 · treat All Seasons (null) explicitly; fixes a season.id crash → A3 tests: back to All Seasons'], 'code-tree', 32) +
      tone(t(28, 474, 'Risks: no cache means more requests; keying the cache alone still lets a late response overwrite a newer selection.', 'code-tree z-text'), 'orange'),
    footer: 'The issue named one symptom. The plan found three problems, and named the cost of the fix.'
  });
  const stepImplement = (s) => handoff(s, {
    label: 'Step 3 in the rehearsal: implementer removes the cache, adds a request counter so a stale response returns early, and handles the All Seasons null case, then records round 2 in changes.md, including the risk of more requests.',
    outLabel: 'ORCHESTRATOR → IMPLEMENTER', replyLabel: 'IMPLEMENTER → ORCHESTRATOR',
    out: ['Apply plan.md. Edit only src/,', 'never a *.test.js file.'], reply: ['Changed node/frontend/src/', 'pages/Episodes.js.'],
    bottom: panel(0, 196, 880, 310, 'DIFF / Episodes.js · 17 insertions, 22 deletions', 'purple') +
      code(28, 270, ['- if (episodeCache && cacheTimestamp && …) {', '-   setEpisodes(episodeCache); …', '+ const requestId = ++requestIdRef.current;', '  const response = await episodesApi.getAll(params);', '+ if (requestId !== requestIdRef.current) return;', '- if (selectedSeason === season?.id) {', '+ if (season === null || selectedSeason === season.id) {'], 'code-tree', 32) +
      panel(910, 196, 530, 310, 'WROTE / .team/changes.md', 'local') +
      v.lines(938, 276, '- A1: cache and its 30 s early return removed.', { cls: 'body-copy', max: 36, lh: 29, anchor: 'start' }) +
      v.lines(938, 346, '- A2: only the latest request updates state.', { cls: 'body-copy', max: 36, lh: 29, anchor: 'start' }) +
      v.lines(938, 416, '- A3: null handled before season.id.', { cls: 'body-copy', max: 36, lh: 29, anchor: 'start' }) +
      tone(t(938, 482, 'Risk: more requests.', 'fine z-text'), 'orange'),
    footer: 'The fix removes the cache instead of keying it. changes.md says so, and names the trade.'
  });
  const stepTests = (s) => handoff(s, {
    label: 'Step 4 and the first check in the rehearsal: test-writer adds Episodes.test.js with nine tests, two for A1, four for A2, and three for A3, and maps them in tests.md. The orchestrator runs the npm test check and saves check-1: nine passed out of nine.',
    outLabel: 'ORCHESTRATOR → TEST-WRITER', replyLabel: 'TEST-WRITER → ORCHESTRATOR',
    out: ['One test per A#, named A#: …', 'Each must fail if its A# breaks.'], reply: ['Added Episodes.test.js:', '9 A1–A3 tests.'],
    bottom: panel(0, 196, 860, 310, 'WROTE / .team/tests.md', 'local') +
      code(28, 278, ['A1 · 2 tests  Season 2 right after load (two response shapes)', 'A2 · 4 tests  an older success or rejection never wins', 'A3 · 3 tests  back to All Seasons, toggle off, All twice'], 'code-tree', 44) +
      t(28, 470, 'Fixtures use the real season id, 202, so a season-number bug fails too.', 'fine') +
      panel(890, 196, 550, 310, 'STEP 5 / evidence/check-1.txt', 'green') +
      tone(code(918, 274, ['PASS src/pages/Episodes.test.js', '√ A1 ×2   √ A2 ×4   √ A3 ×3', 'Tests: 9 passed, 9 total'], 'code-small z-text', 44), 'green') +
      t(918, 470, 'plus one act() deprecation warning', 'fine'),
    footer: 'Nine passing tests on the first check. Is that the whole Check?'
  });
  const routeLint = (s) => scene(s, 'In the rehearsal, ESLint on the changed files failed with four globalThis not-defined errors in Episodes.test.js. Step 5 sends a failure to the owner of the wrong file: a lint error in a test file goes to test-writer. Test-writer switched to window and React act in round 3; check-2 passed nine of nine and lint-2 passed.',
    panel(0, 0, 640, 300, 'STEP 5 / evidence/lint-1.txt', 'orange') +
    code(28, 86, ['Episodes.test.js', "  29:28  error  'globalThis' is not defined", "  30:3   error  'globalThis' is not defined", '  50:14 · 52:7  (the same error)', '✖ 4 problems (4 errors, 0 warnings)'], 'code-small', 38) +
    panel(670, 0, 770, 300, 'RULE / orchestrator step 5', 'purple') +
    v.enter(v.lines(698, 90, 'On a failure, send it to the owner of the wrong file: a failing test that matches task.md, or a lint error in source, goes to implementer; any other test or lint failure in a test file goes to test-writer.', { cls: 'body-copy', max: 58, lh: 31, anchor: 'start' }), 400) +
    v.pop(tone(t(698, 270, 'lint error in a test file → test-writer', 'route-label z-text'), 'orange'), 900) +
    v.pop(node(0, 350, 420, 'check-1 · lint-1', '9/9 tests · 4 lint errors', 'orange', 96), 1200) +
    arrow(432, 398, 498, 398, 'purple', 1400) +
    v.pop(node(510, 350, 420, 'test-writer · round 3', 'window + act from react', 'local', 96), 1600) +
    arrow(942, 398, 1008, 398, 'purple', 1800) +
    v.pop(node(1020, 350, 420, 'check-2 · lint-2', '9/9 tests · lint clean', 'green', 96), 2000) +
    t(720, 520, 'Passing tests were half the Check. The failure went to the owner of the file, and the rerun closed it.', 'body-copy', 'middle'), 540);
  const reviewAccept = (s) => scene(s, 'In the rehearsal, test-reviewer accepted in round 3 after reading check-2 and lint-2, and explained why each A# test would fail if the criterion broke. review.md also records that no Git diff was supplied; the orchestrator now pastes git status and git diff into the reviewer call.',
    panel(0, 0, 840, 420, '.team/review.md · round 3', 'green') +
    code(28, 86, ['- Verdict: accept.', '- Check: check-2.txt (9 passed) and lint-2.txt (pass).'], 'code-small', 34) +
    v.enter(code(28, 178, ['- A1: reintroducing the unkeyed cache would fail the', '  request-parameter and title assertions.', '- A2: removing the success, catch, or finally guards', '  would fail these assertions.', '- A3: catches the null dereference and lost buttons.'], 'code-small', 34), 400) +
    v.enter(tone(t(28, 384, '- Findings: none requiring revision.', 'code-small z-text'), 'green'), 900) +
    panel(870, 0, 570, 420, 'WHAT IT COULD NOT SEE', 'orange') +
    v.enter(code(898, 92, ['“A raw Git diff was not', ' supplied or retrieved.”'], 'code-small', 32), 1200) +
    t(898, 172, 'review.md, round 3', 'fine') +
    v.path('M898 212H1410', { cls: 'divider' }) +
    v.enter(tone(t(898, 256, 'FIXED SINCE', 'artifact-label z-text'), 'green') +
      v.lines(898, 296, 'Step 6 now pastes git status and git diff into the reviewer call.', { cls: 'body-copy', max: 40, lh: 31, anchor: 'start' }), 1600) +
    t(720, 485, 'Accept means every criterion has a test that can fail. The person still reads the diff.', 'body-copy', 'middle'), 510);
  const statusTrail = (s) => {
    const rows = [
      ['1', '1', 'orchestrator', 'task.md', 'drafted A1–A3', 'person approves'],
      ['2', '1', 'person', 'task.md', 'Status: approved', 'planner'],
      ['2', '2', 'planner', 'plan.md', 'cache, race, null crash', 'implementer'],
      ['2', '3', 'implementer', 'Episodes.js, changes.md', 'cache removed, guarded', 'test-writer'],
      ['2', '4', 'test-writer', 'Episodes.test.js, tests.md', '9 A1–A3 tests', 'check-1'],
      ['2', '5', 'orchestrator', 'check-1, lint-1', '9/9 · lint: 4 errors', 'test-writer'],
      ['3', '4', 'test-writer', 'Episodes.test.js, tests.md', 'window + React act', 'check-2'],
      ['3', '5', 'orchestrator', 'check-2, lint-2', '9/9 · lint clean', 'test-reviewer'],
      ['3', '6', 'test-reviewer', 'review.md', 'accept', 'report'],
      ['3', '7', 'orchestrator', 'status.md', '+17 −22, 258-line test', 'person reviews diff']
    ];
    const b = table([[0, 'ROUND', 'code-tree'], [95, 'STEP', 'code-tree'], [175, 'WHO', 'code-tree'], [385, 'WROTE', 'code-tree'], [730, 'RESULT', 'code-tree'], [1100, 'NEXT', 'code-tree']], rows,
      { first: 48, rh: 40, at: 100, step: 90, tones: { 1: 'orange', 5: 'orange', 8: 'green', 9: 'orange' } }) +
      t(720, 500, 'One row per reply. Wrote points at the proof; Next says what happens. That is the whole run.', 'body-copy', 'middle');
    return scene(s, `.team/status.md from the rehearsal, ten rows: ${rows.map(r => `round ${r[0]} step ${r[1]}, ${r[2]} wrote ${r[3]}, ${r[4]}, next ${r[5]}`).join('; ')}.`, b, 525);
  };
  const resume = (s) => scene(s, 'If the session stops after check-1, status.md still says Next: test-writer for the lint errors. A new session resumes from status.md; the orchestrator rule says read it, ask the person to rerun the last check, then continue. The rerun shows the same four lint errors, so test-writer is called with lint-1.',
    panel(0, 0, 620, 330, '.team/status.md · last row', 'purple') +
    code(28, 92, ['Round:  2   Step: 5', 'Who:    orchestrator', 'Wrote:  check-1.txt, lint-1.txt', 'Result: 9/9 · lint: 4 errors', 'Next:   test-writer'], 'code-small', 34) +
    v.pop(tone(t(28, 300, '⏸ session ends: credit cap reached', 'body-copy z-text'), 'orange'), 600) +
    panel(650, 0, 790, 150, 'NEW SESSION', 'local') +
    v.enter(t(678, 96, 'copilot --agent orchestrator -i "Resume from .team/status.md."', 'code-tree'), 900) +
    panel(650, 180, 790, 150, 'RULE / orchestrator.agent.md', 'orange') +
    code(678, 252, ['On resume in a new session, read status.md, ask the', 'person to rerun the last check, then continue from Next.'], 'code-small', 32) +
    v.pop(node(0, 380, 330, 'read status.md', 'Next: test-writer', 'purple', 96), 1300) +
    arrow(338, 428, 362, 428, 'purple', 1450) +
    v.pop(node(370, 380, 330, 'person reruns', 'the same 4 lint errors', 'orange', 96), 1600) +
    arrow(708, 428, 732, 428, 'purple', 1750) +
    v.pop(node(740, 380, 330, 'file matches code', 'the record still holds', 'purple', 96), 1900) +
    arrow(1078, 428, 1102, 428, 'purple', 2050) +
    v.pop(node(1110, 380, 330, 'call test-writer', 'with lint-1', 'local', 96), 2200) +
    t(720, 530, 'The file says what was true. The rerun says what is true now. They agree, so the next call is safe.', 'body-copy', 'middle'), 550);
  const annotated = (s) => {
    const step = s.rows.length === 4 ? 104 : 132;
    let b = panel(0, 0, 795, 495, s.leftLabel, 'purple') + panel(825, 0, 615, 495, s.rightLabel, 'local');
    s.rows.forEach(([input, effect], i) => {
      const y = 106 + i * step;
      b += v.enter(code(26, y, [input], 'code-small'), 100 + i * 220) +
        v.enter(v.lines(851, y, effect, { cls: 'body-copy', max: 40, lh: 31, anchor: 'start' }), 250 + i * 220);
      if (i < s.rows.length - 1) b += v.path(`M26 ${y + step - 44}H769M851 ${y + step - 44}H1414`, { cls: 'divider' });
    });
    return scene(s, `${s.title}. ${s.rows.map(r => `${r[0]}: ${r[1]}`).join(' ')}`, b, 515);
  };
  /* The question stands alone; the next slide carries the answer. */
  const costQuestion = (s) => {
    const steps = [['read the issue', 'orchestrator'], ['plan the fix', 'planner'], ['edit the code', 'implementer'], ['write tests', 'test-writer'], ['check + route', 'orchestrator'], ['review', 'test-reviewer']];
    let b = steps.map(([title, who], i) => v.pop(node(i * 244, 0, 220, title, who, i === 5 ? 'green' : (i === 0 || i === 4 ? 'purple' : 'local'), 96), 150 + i * 150)).join('') +
      steps.slice(1).map((_, i) => arrow(i * 244 + 222, 48, i * 244 + 242, 48, 'purple', 300 + i * 150)).join('');
    b += panel(0, 140, 1440, 250, 'ONE APPROVAL, THEN UNATTENDED', 'orange') +
      v.enter(tone(t(720, 290, '$ ?', 'large-number z-text', 'middle'), 'orange'), 1200) +
      t(720, 350, 'five agents · one real bug · about ten minutes', 'body-copy', 'middle');
    [['under $1', 'local'], ['$1 to $10', 'purple'], ['more than $10', 'orange']].forEach(([guess, z], i) =>
      b += v.pop(node(i * 500, 420, 440, guess, 'hands up', z, 86), 1500 + i * 150));
    return scene(s, 'Before the live run: the team will read the issue, plan, change the code, write tests, run and route checks, and review, unattended after one approval. The question is what it costs: under one dollar, one to ten dollars, or more than ten.', b, 520);
  };
  const costReveal = (s) => {
    const cards = [
      ['$0.01', 'one AI credit', 'GitHub Copilot pricing', 'local'],
      ['$0.40', '39.88 credits', 'rehearsal on GPT-6.1 Sol', 'green'],
      ['$0.50', '/limits · 50 credits', 'the budget for this run', 'orange']
    ];
    let b = '';
    cards.forEach(([value, what, src, z], i) => {
      const x = i * 490;
      b += v.pop(tone(v.rect(x, 0, 460, 220, { cls: 'box head', r: 18 }) + v.rect(x, 0, 5, 220, { cls: 'card-edge', r: 2 }) +
        t(x + 230, 92, value, 'large-number z-text', 'middle'), z) +
        t(x + 230, 148, what, 'code-small', 'middle') + t(x + 230, 188, src, 'fine', 'middle'), 200 + i * 400);
    });
    b += panel(0, 260, 1440, 230, 'WHAT $0.40 BOUGHT IN THE REHEARSAL', 'green');
    [['11 min', 'unattended after one approval'], ['3 problems', 'cache, race, null crash'], ['9 tests', '2 checks, lint routed'], ['1 accept', 'and a record to read']].forEach(([head, body], i) =>
      b += v.enter(t(28 + i * 356, 368, head, 'artifact-title') + t(28 + i * 356, 408, body, 'body-copy'), 1500 + i * 150));
    b += t(720, 540, 'The live run will differ. The budget bounds what it can spend.', 'body-copy', 'middle');
    return scene(s, 'One AI credit costs one cent. The rehearsal used 39.88 credits on GPT-6.1 Sol, about forty cents. The live run has a budget of 50 credits, fifty cents. In the rehearsal that bought eleven minutes of unattended work after one approval, three problems found, nine tests, two checks with a routed lint failure, and an accept with a readable record.', b, 560);
  };
  const whileItWorks = (s) => {
    const rows = [
      ['0:07', 'orchestrator', 'task.md (draft)', 'Issue #202, A1–A3, Check'],
      ['~1:10', 'person', 'task.md', 'Status: approved'],
      ['~1:30', 'planner', 'plan.md', 'a Cause that names a line'],
      ['~2:30', 'implementer', 'Episodes.js · changes.md', 'each A# with its why'],
      ['~3:30', 'test-writer', 'Episodes.test.js · tests.md', 'tests named A#: …'],
      ['~6:00', 'orchestrator', 'evidence/check-1.txt', 'pass, or a routed failure'],
      ['~7:30', 'orchestrator', 'evidence/check-2.txt', 'the rerun after a fix'],
      ['~9:15', 'test-reviewer', 'review.md', 'accept, or revise + owner'],
      ['~11:00', 'orchestrator', 'status.md', 'Next: person']
    ];
    const b = table([[0, 'REHEARSAL CLOCK', 'code-small'], [230, 'WHO', 'body-copy'], [480, 'FILE APPEARS', 'code-small'], [1000, 'LOOK FOR', 'body-copy']], rows,
      { first: 56, rh: 47, at: 100, step: 110, tones: { 1: 'orange', 5: 'purple', 7: 'green', 8: 'orange' } }) +
      t(720, 520, 'Keep .team/ open in the editor. Each file appears as its worker replies.', 'body-copy', 'middle');
    return scene(s, `While the live run works, files appear in .team/ in this order, with approximate rehearsal times: ${rows.map(r => `${r[0]}, ${r[1]} writes ${r[2]}; look for ${r[3]}`).join('; ')}.`, b, 540);
  };
  window.SCENES = {
    'crew-motif': crewMotif, 'workflow-question': workflowQuestion, 'the-bug': theBug, 'crew-map': crewMap,
    'agent-file-anatomy': anatomy, 'whole-orchestrator': wholeFile, 'orchestrator-steps': orchestratorSteps,
    'team-folder': teamFolder, 'four-workers': fourWorkers, 'approve-task': approveTask,
    'step-plan': stepPlan, 'step-implement': stepImplement, 'step-tests': stepTests,
    'route-lint': routeLint, 'review-accept': reviewAccept, 'status-trail': statusTrail,
    'resume-from-status': resume, 'annotated-lines': annotated,
    'cost-question': costQuestion, 'cost-reveal': costReveal, 'live-while-it-works': whileItWorks
  };
})();
