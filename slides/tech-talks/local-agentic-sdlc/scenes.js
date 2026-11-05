/*
  Local Agentic SDLC — deck-only visuals.
  Shared frames and patterns remain in slides/native; these scenes show this talk's proof.
*/
(() => {
  const { svg, html, measure } = window.Kit;

  const card = (x, y, w, h, title, body, { tone = 'accent', titleSize = 24, bodySize = 20, max = 38, gap = 28, tag = '' } = {}) => {
    const bodyLines = Array.isArray(body) ? body : [body];
    let markup = svg.rect(x, y, w, h, { cls: 'box card', r: 18 }) +
      svg.rect(x, y, 7, h, { cls: 'card-edge', r: 3 }) +
      svg.text(x + 28, y + 42, title, { cls: 't-lg deck-card-title', anchor: 'start' });
    if (tag) markup += svg.g(svg.text(x + w - 24, y + 32, tag.toUpperCase(), { cls: 't-xs t-mono z-text', anchor: 'end' }), { cls: `z-${tone}` });
    let yy = y + 42 + gap;
    bodyLines.forEach((line) => {
      const wrapped = window.Kit.wrap(line, max);
      markup += svg.lines(x + 28, yy, line, { cls: bodySize <= 18 ? 't-xs t-muted deck-card-body' : 't-muted deck-card-body', anchor: 'start', max, lh: bodySize + 8 });
      yy += wrapped.length * (bodySize + 8) + 10;
    });
    return svg.g(markup, { cls: `z-${tone}` });
  };

  const scene = (s, w, h, label, content, cls = '') =>
    `${html.head(s)}${svg.scene(w, h, label, content, cls)}${html.footnote(s.footnote)}`;

  const localLoop = (s) => {
    const W = 760;
    const C = 380;
    const R = 240;
    const nodes = [
      { title: 'ORCHESTRATOR', body: 'sequences work', z: 'purple' },
      { title: 'ROLE AGENTS', body: 'own bounded tasks', z: 'local' },
      { title: 'TEST EVIDENCE', body: 'steers the loop', z: 'green' },
      { title: 'PERSON', body: 'decides what merges', z: 'orange' }
    ].map((n, i) => {
      const a = -Math.PI / 2 + i * Math.PI / 2;
      return { ...n, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
    });
    const wires = nodes.map((n, i) => {
      const next = nodes[(i + 1) % nodes.length];
      return svg.trace(`M${n.x} ${n.y}L${next.x} ${next.y}`, { cls: 'wire link', at: 350 + 220 * i, dur: 460 });
    }).join('');
    const rings = svg.circle(C, C, R, { cls: 'ring' }) + svg.circle(C, C, 132, { cls: 'ring' });
    const center = svg.g(
      svg.rect(C - 112, C - 74, 224, 148, { cls: 'box task', r: 22 }) +
      svg.text(C, C - 10, 'LOOP', { cls: 't-xs t-mono' }) +
      svg.text(C, C + 26, 'contract', { cls: 't-lg' }),
      { cls: 'z-purple' });
    const labels = nodes.map((n, i) => {
      const bx = n.x - 110;
      const by = n.y - 54;
      return svg.pop(svg.g(
        svg.rect(bx, by, 220, 108, { cls: 'box card', r: 18 }) +
        svg.text(n.x, by + 42, n.title, { cls: 't-xs t-mono z-text' }) +
        svg.text(n.x, by + 75, n.body, { cls: 't-sm' }),
        { cls: `z-${n.z}` }), 650 + i * 160);
    }).join('');
    return svg.scene(W, W, 'A local agentic loop connects an orchestrator, bounded role agents, test evidence, and a person who decides what merges.', rings + wires + center + labels, 'local-loop');
  };

  const runLedger = (s) => {
    const W = 1440;
    const rows = [
      ['PLAN', 'Two issue plans posted · two workstreams · three named seams', '47.15'],
      ['IMPLEMENT #4', 'char-detail · bee5680 · reviewer accepted · 56 / 56', '104.12'],
      ['IMPLEMENT #5', 'episode-detail · first 8 failed · final 47 / 47', '102.55'],
      ['INTEGRATE', 'Seams resolved · merged-review fix · 96 / 96 · draft #217', '126.13']
    ];
    let body = svg.text(24, 20, 'STAGE', { cls: 't-xs t-mono col-label', anchor: 'start' }) +
      svg.text(310, 20, 'OBSERVED RESULT', { cls: 't-xs t-mono col-label', anchor: 'start' }) +
      svg.text(1390, 20, 'AI CREDITS', { cls: 't-xs t-mono col-label', anchor: 'end' });
    rows.forEach(([stage, result, credits], i) => {
      const y = 40 + i * 88;
      body += svg.enter(svg.rect(0, y, W, 72, { cls: 'box', r: 14 }) +
        svg.g(svg.text(24, y + 44, stage, { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: `z-${i === 3 ? 'purple' : 'local'}` }) +
        svg.text(310, y + 43, result, { cls: 't-sm', anchor: 'start' }) +
        svg.g(svg.text(1390, y + 44, credits, { cls: 't-lg z-text', anchor: 'end' }), { cls: 'z-green' }), 350 + 250 * i);
    });
    body += svg.g(svg.rect(0, 400, W, 52, { cls: 'zone', r: 14 }) +
      svg.text(24, 433, 'ONE OBSERVED RUN', { cls: 't-xs t-mono z-text', anchor: 'start' }) +
      svg.text(310, 433, 'Two features → integrated draft pull request', { cls: 't-sm', anchor: 'start' }) +
      svg.text(1390, 433, '≈380', { cls: 't-lg z-text', anchor: 'end' }), { cls: 'z-purple' });
    return scene(s, W, 460, 'Four real Copilot CLI sessions: plan, implement issue 4, implement issue 5, and integrate; their observed credits total about 380 and produced draft pull request 217.', body);
  };

  const fourFieldContract = (s) => {
    const items = [
      ['WHO DOES WHAT?', 'Planner plans; implementer edits source; test-writer edits tests; reviewer gives a verdict.', 'Agent tools and instructions', 'local'],
      ['WHEN IS IT DONE?', 'The frontend Jest suite passes and the reviewer accepts.', 'Stop hook and reviewer', 'green'],
      ['WHEN DOES IT STOP?', 'Continuation cap, credit cap, and bounded blocked stops.', 'CLI flags and hook counter', 'purple'],
      ['WHO MAY MERGE?', 'A person reviewing the integrated draft decides.', 'Deny push; draft PR handoff', 'orange']
    ];
    let content = '';
    items.forEach(([title, body, enforcement, tone], i) => {
      const x = (i % 2) * 730;
      const y = Math.floor(i / 2) * 190;
      content += svg.enter(card(x, y, 700, 170, title, [body, `ENFORCED BY · ${enforcement}`], { tone, max: 48, bodySize: 18, gap: 35, tag: tone }), 350 + i * 220);
    });
    return scene(s, 1440, 380, 'Four loop contract fields and their enforcement points: role ownership, completion evidence, stop budget, and human merge authority.', content);
  };

  const planRisks = (s) => {
    const left = card(0, 12, 690, 384, 'PLAN COMMENT SHAPE', [
      'Goal · files to change · files to create',
      'Risks before code · tests to add',
      'Done-when check with an observable result'
    ], { tone: 'local', max: 42, bodySize: 21, gap: 50, tag: 'Read only' });
    const right = card(730, 12, 710, 384, 'TWO RISKS NAMED EARLY', [
      '#5 · Episodes.test.js renders without a Router',
      '#4 · Characters.jsx is a class component; use Link wrappers'
    ], { tone: 'orange', max: 48, bodySize: 22, gap: 58, tag: 'Before edits' });
    const connector = svg.trace('M690 205L730 205', { cls: 'wire link', at: 900, dur: 320 });
    return scene(s, 1440, 410, 'A read-only planner returns goal, file lists, risks, tests, and done conditions; it predicted the missing Router context for issue 5 and class-component navigation for issue 4.', left + connector + right);
  };

  const splitTest = (s) => {
    const cards = [
      ['SPLIT', ['File sets are independent', 'Each workstream can pass alone', 'FanHub #4 and #5'], 'green'],
      ['KEEP TOGETHER', ['Both edit the same component', 'One depends on the other output', 'Integration cost beats parallel gain'], 'orange'],
      ['NAME THE SEAMS', ['App.js · both add a route', 'App.test.js · route tests', 'node/README.md · both document'], 'purple']
    ];
    let content = '';
    cards.forEach(([title, body, tone], i) => {
      const x = i * 486;
      content += svg.enter(card(x, 20, 458, 370, title, body, { tone, max: 34, bodySize: 21, gap: 60, tag: i === 2 ? 'Integration owns' : '' }), 350 + i * 240);
    });
    content += svg.g(svg.text(720, 425, 'Self-contained pages: related entities remain noninteractive', { cls: 't-sm z-text' }), { cls: 'z-green' });
    return scene(s, 1440, 450, 'Split independent file sets, keep dependent changes together, and assign every shared file seam to integration; FanHub named three seams.', content);
  };

  const orchestratorFile = (s) => {
    const code = [
      'name: sdlc-orchestrator',
      'tools: [agent, read, search, execute, todo]',
      'agents: [planner, implementer, test-writer, test-reviewer]',
      'hooks: Stop → verify-before-stop.mjs'
    ];
    let left = svg.rect(0, 8, 820, 390, { cls: 'box', r: 18 }) +
      svg.g(svg.text(28, 48, '.github/agents/sdlc-orchestrator.agent.md', { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: 'z-purple' });
    code.forEach((line, i) => { left += svg.text(30, 104 + i * 68, line, { cls: 't-sm t-mono', anchor: 'start' }); });
    const rightCards = [
      card(860, 8, 580, 112, 'ALLOW-LIST', 'Only four named role agents', { tone: 'purple', max: 50, bodySize: 18, gap: 31 }),
      card(860, 145, 580, 112, 'NO EDIT TOOL', 'Every file change goes through a role agent', { tone: 'orange', max: 50, bodySize: 18, gap: 31 }),
      card(860, 282, 580, 112, 'SCOPED STOP HOOK', 'Gate runs when this orchestrator tries to finish', { tone: 'green', max: 50, bodySize: 18, gap: 31 })
    ].join('');
    return scene(s, 1440, 410, 'The orchestrator frontmatter limits its subagents, omits edit from its tools, and scopes a Stop hook to its finish decision.', left + rightCards);
  };

  const roleBoundaries = (s) => {
    const items = [
      ['PLANNER', 'read · search', 'Reads issue and touched code; writes no files.', 'local'],
      ['IMPLEMENTER', 'source only', 'In #5 reports eight failures; leaves test fix to test-writer.', 'orange'],
      ['TEST-WRITER', '*.test.js', 'Owns test edits, including router context and new coverage.', 'green'],
      ['TEST-REVIEWER', 'read only', 'Returns request-changes or accept with findings.', 'purple']
    ];
    let content = '';
    items.forEach(([title, role, body, tone], i) => {
      const x = (i % 2) * 730;
      const y = Math.floor(i / 2) * 190;
      content += svg.enter(card(x, y, 700, 170, `${title} · ${role}`, body, { tone, max: 49, bodySize: 20, gap: 44 }), 350 + i * 180);
    });
    return scene(s, 1440, 380, 'Planner is read-only, implementer edits source, test-writer owns tests, and test-reviewer is read-only; the implementer reported eight failures rather than editing tests.', content);
  };

  const setupGotchas = (s) => {
    const items = [
      ['PERMISSIONS', ['shell(gh:*) missed a compound PowerShell command', 'No progress stopped at 38.67 of 40 credits', 'Working setup: allow tools; deny git push'], 'orange'],
      ['FRESH WORKTREES', ['No node_modules in new checkout', 'sessionStart links main dependencies', 'Both worktrees ran Jest on arrival'], 'local'],
      ['HOOK INPUT', ['Agent-scoped keys use snake_case', 'First script expected sessionId', 'Logging raw keys exposed the mismatch'], 'purple']
    ];
    let content = '';
    items.forEach(([title, body, tone], i) => {
      content += svg.enter(card(i * 486, 12, 458, 390, title, body, { tone, max: 34, bodySize: 19, gap: 52 }), 350 + i * 220);
    });
    return scene(s, 1440, 420, 'Three setup gotchas and their observed fixes: compound shell permissions, missing dependencies in fresh worktrees, and snake_case hook input.', content);
  };

  const predictedFailure = (s) => {
    const steps = [
      ['PLAN PREDICTS', 'Episodes.test.js renders outside a Router', 'orange'],
      ['SUITE OBSERVES', 'useNavigate() needs Router context · 8 failed / 8 total', 'orange'],
      ['ORCHESTRATOR ROUTES', 'Implementer reports; test-writer adds Router context', 'purple'],
      ['VERIFY AND REVIEW', '47 / 47 tests · reviewer accepts after revisions', 'green']
    ];
    let content = '';
    steps.forEach(([title, body, tone], i) => {
      const x = i * 366;
      content += svg.enter(card(x, 70, 332, 264, title, body, { tone, max: 28, bodySize: 20, gap: 48 }), 350 + i * 250);
      if (i < steps.length - 1) content += svg.trace(`M${x + 334} 202L${x + 364} 202`, { cls: 'wire link', at: 800 + i * 250, dur: 240 });
    });
    content += svg.g(svg.text(720, 392, 'REAL · issue #5 · episode-detail worktree', { cls: 't-xs t-mono z-text' }), { cls: 'z-green' });
    return scene(s, 1440, 420, 'The issue 5 plan predicted missing Router context; the suite observed eight failures, the orchestrator routed to test-writer, and the final suite had 47 passing tests.', content);
  };

  const stopHook = (s) => {
    const nodes = [
      { x: 0, y: 30, w: 440, h: 150, title: 'ORCHESTRATOR TRIES TO STOP', text: 'Stop hook runs the frontend Jest suite.', tone: 'local' },
      { x: 500, y: 30, w: 420, h: 150, title: 'PASS · status 0', text: 'Return allow; append the decision to JSONL.', tone: 'green' },
      { x: 500, y: 230, w: 420, h: 165, title: 'FAIL · nonzero status', text: 'Increment per-session count; return block with failure lines.', tone: 'orange' },
      { x: 1000, y: 230, w: 440, h: 165, title: 'COPILOT GETS THE REASON', text: 'Route to implementer or test-writer, rerun, then finish.', tone: 'purple' }
    ];
    let content = '';
    nodes.forEach((n, i) => { content += svg.enter(card(n.x, n.y, n.w, n.h, n.title, n.text, { tone: n.tone, max: 42, bodySize: 20, gap: 42 }), 350 + i * 180); });
    content += svg.trace('M440 100L500 100', { cls: 'wire link', at: 800, dur: 300 }) +
      svg.trace('M440 110C470 110 470 310 500 310', { cls: 'wire link', at: 1050, dur: 400 }) +
      svg.trace('M920 310L1000 310', { cls: 'wire link', at: 1300, dur: 300 });
    content +=     svg.g(svg.text(720, 440, 'After 3 blocked stops: write an escalation note, then stop', { cls: 't-xs z-text' }), { cls: 'z-orange' });
    return scene(s, 1440, 465, 'A Stop hook runs tests when the orchestrator tries to finish: a passing suite allows the stop; a failing suite blocks with output; three blocks trigger escalation.', content);
  };

  const realGateRecord = (s) => {
    let content = '';
    content += svg.g(svg.rect(0, 20, 520, 360, { cls: 'zone', r: 20 }) +
      svg.text(260, 38, 'REAL · HOOK DECISIONS', { cls: 't-xs t-mono z-text' }) +
      svg.text(260, 190, '11', { cls: 't-xl z-text' }) +
      svg.text(260, 270, 'ALLOW', { cls: 't-lg z-text' }) +
      svg.text(260, 322, '0 BLOCK', { cls: 't-lg z-text' }), { cls: 'z-green' });
    content += card(570, 20, 870, 164, 'WHAT THE SUITE FOUND', [
      '#5: 8 failed → test-writer → 47 / 47',
      'Failure was routed before the orchestrator tried to stop'
    ], { tone: 'orange', max: 62, bodySize: 21, gap: 48, tag: 'Application result' });
    content += card(570, 216, 870, 164, 'WHAT INTEGRATION REVIEW FOUND', [
      'Contrast defect → source fix + regression test → 96 / 96',
      'Hook allowed because the orchestrator verified before stop'
    ], { tone: 'purple', max: 62, bodySize: 21, gap: 48, tag: 'Review and suite result' });
    return scene(s, 1440, 410, 'The real Stop hook log records eleven allows and zero blocks; separately, tests found and verified the issue 5 and integration corrections before the stop attempts.', content);
  };

  const stagedBackstop = (s) => {
    const content =
      card(0, 20, 1440, 182, 'STAGED JSONL · FIRST STOP', [
        '{"branch":"hook-demo","decision":"block","blocksSoFar":0}',
        '{"tests":"7 failed, 1 passed, 8 total","seconds":5}'
      ], { tone: 'orange', max: 78, bodySize: 21, gap: 46, tag: 'STAGED' }) +
      svg.trace('M720 202L720 236', { cls: 'wire link', at: 1100, dur: 250 }) +
      card(0, 250, 1440, 182, 'STAGED JSONL · AFTER TEST-WRITER', [
        '{"branch":"hook-demo","decision":"allow","blocksSoFar":1}',
        '{"tests":"8 passed, 8 total","seconds":4}'
      ], { tone: 'green', max: 78, bodySize: 21, gap: 46, tag: 'STAGED' }) +
      svg.g(svg.text(720, 465, 'Intent question remains for the reviewer: was the Series rename wanted?', { cls: 't-xs z-text' }), { cls: 'z-orange' });
    return scene(s, 1440, 485, 'Staged demonstration only: the hook blocked a run with seven failed tests, then allowed after test-writer changed expectations and all eight passed.', content);
  };

  const budgets = (s) => {
    const rows = [
      ['AI-CREDIT CAP', 'Whole session, including subagents; warnings at 50 / 75 / 90 percent.', 'REAL · integration paused at 113.4 / 120', 'purple'],
      ['AUTOPILOT TURNS', 'Continuation limit set to 15 for implementation sessions.', 'Cap unused in both implementation runs', 'local'],
      ['NO-PROGRESS STOP', 'Repeated turns without successful tool calls.', 'Plan attempt paused at 38.67 / 40', 'orange'],
      ['HOOK STRIKES', 'Three blocked stops, then escalation note and human handoff.', 'Per session; no real run blocked', 'green']
    ];
    let content = '';
    rows.forEach(([name, desc, result, tone], i) => {
      const y = 14 + i * 98;
      content += svg.enter(svg.rect(0, y, 1440, 82, { cls: 'box', r: 14 }) +
        svg.g(svg.text(24, y + 32, name, { cls: 't-xs t-mono z-text', anchor: 'start' }), { cls: `z-${tone}` }) +
        svg.lines(340, y + 30, desc, { cls: 't-xs t-muted', anchor: 'start', max: 58, lh: 23 }) +
        svg.lines(970, y + 30, result, { cls: 't-xs', anchor: 'start', max: 38, lh: 23 }), 350 + i * 180);
    });
    content += svg.g(svg.text(720, 430, 'Person clarified the PR body as the integration record, then resumed at a 140-credit cap', { cls: 't-xs z-text' }), { cls: 'z-orange' });
    return scene(s, 1440, 455, 'Credit, continuation, no-progress, and hook limits stop runs at distinct scopes; a person reviewed the integration stop and resumed with a higher explicit cap.', content);
  };

  const reviewerCatch = (s) => {
    const content =
      card(0, 8, 660, 120, 'CHARACTER WORKSTREAM', '56 / 56 tests passed before integration', { tone: 'green', max: 56, bodySize: 19, gap: 42 }) +
      card(780, 8, 660, 120, 'EPISODE WORKSTREAM', '47 / 47 tests passed before integration', { tone: 'green', max: 56, bodySize: 19, gap: 42 }) +
      svg.trace('M660 68C710 68 710 158 720 158M780 68C730 68 730 158 720 158', { cls: 'wire link', at: 800, dur: 400 }) +
      card(260, 165, 920, 120, 'MERGED REVIEW · DEFECT VISIBLE', 'Global white headings met new white panels; reviewer flagged unreadable text.', { tone: 'orange', max: 70, bodySize: 19, gap: 42 }) +
      svg.trace('M720 285L720 320', { cls: 'wire link', at: 1200, dur: 250 }) +
      card(0, 330, 700, 120, 'IMPLEMENTER · SOURCE FIX', 'CharacterDetail.jsx adds local heading colors.', { tone: 'purple', max: 52, bodySize: 19, gap: 42 }) +
      card(740, 330, 700, 120, 'TEST-WRITER · REGRESSION', 'Real stylesheet checks 4.5:1 for all five headings.', { tone: 'green', max: 52, bodySize: 19, gap: 42 }) +
      svg.g(svg.text(720, 490, 'INTEGRATED SUITE · 95 → 96 · ALL PASSING', { cls: 't-xs t-mono z-text' }), { cls: 'z-green' });
    return scene(s, 1440, 510, 'Two passing workstreams converged; the merged reviewer found unreadable headings, the implementer fixed source styling, and test-writer added a 4.5 to 1 contrast regression, taking tests from 95 to 96.', content);
  };

  const integrationRecord = (s) => {
    const items = [
      ['SEAMS', 'App.js merged both routes; App.test.js kept six character and five episode route tests.', 'local'],
      ['COUNTS', '56 + 47 before merge · 95 after · 96 with the regression test.', 'green'],
      ['CORRECTION', 'Merged-review contrast finding and its regression test are recorded.', 'purple'],
      ['OPEN RISKS', 'Pre-existing strict-CI lint warnings; live backend and deep-link refresh unverified.', 'orange']
    ];
    let content = '';
    items.forEach(([title, body, tone], i) => {
      content += svg.enter(card((i % 2) * 730, Math.floor(i / 2) * 190, 700, 170, title, body, { tone, max: 49, bodySize: 20, gap: 42 }), 350 + i * 200);
    });
    return scene(s, 1440, 380, 'The integration record names seam resolution, distinct test counts, the reviewer correction, and open risks for the pull request.', content);
  };

  const scheduledLoop = (s) => {
    const steps = [
      ['SCHEDULE', '/every 1h · /after · session-scoped', 'purple'],
      ['READ STATE', 'Fresh context reads worktree state file', 'local'],
      ['RUN + VERIFY', 'Apply per-pass budget; record evidence', 'green'],
      ['CHECK LOCK', 'Stale running state → escalate to person', 'orange']
    ];
    let content = '';
    steps.forEach(([title, body, tone], i) => {
      const x = i * 366;
      content += svg.enter(card(x, 46, 332, 230, title, body, { tone, max: 29, bodySize: 19, gap: 54 }), 350 + i * 240);
      if (i < steps.length - 1) content += svg.trace(`M${x + 334} 158L${x + 364} 158`, { cls: 'wire link', at: 850 + i * 220, dur: 240 });
    });
    content += svg.g(svg.rect(80, 326, 1280, 84, { cls: 'zone dashed', r: 16 }) +
      svg.text(720, 360, 'BOUNDARY · /every with /goal --max-ai-credits is untested', { cls: 't-xs t-mono z-text' }) +
      svg.text(720, 390, 'Watch one capped pass by hand before leaving a schedule active', { cls: 't-sm' }), { cls: 'z-orange' });
    return scene(s, 1440, 440, 'A recurring CLI pass uses a schedule, file-based state, a bounded run, and a person for stale state; capped scheduling compatibility remains untested.', content);
  };

  const ownWorkContract = (s) => {
    const items = [
      ['1 · ROLE OWNERSHIP', 'Who plans, edits source, edits tests, and reviews?', 'local'],
      ['2 · DONE EVIDENCE', 'Which meaningful command proves the requested behavior?', 'green'],
      ['3 · STOP BUDGET', 'How many credits or turns, and when does a person take over?', 'purple'],
      ['4 · MERGE AUTHORITY', 'Who judges intent and reads the draft before merge?', 'orange']
    ];
    let content = '';
    items.forEach(([title, body, tone], i) => {
      content += svg.enter(card((i % 2) * 730, Math.floor(i / 2) * 190, 700, 170, title, body, { tone, max: 48, bodySize: 21, gap: 48 }), 350 + i * 200);
    });
    content += svg.g(svg.text(720, 425, 'Apply to one real issue · inspect plan, diff, test output, hook record, and review findings', { cls: 't-xs z-text' }), { cls: 'z-purple' });
    return scene(s, 1440, 450, 'A practitioner writes role ownership, done evidence, stop budget, and merge authority for one real issue, then inspects the run artifacts.', content);
  };

  window.SCENES = {
    'local-loop': localLoop,
    'run-ledger': runLedger,
    'four-field-contract': fourFieldContract,
    'plan-with-risks': planRisks,
    'split-test': splitTest,
    'orchestrator-file': orchestratorFile,
    'role-boundaries': roleBoundaries,
    'setup-gotchas': setupGotchas,
    'predicted-failure': predictedFailure,
    'stop-hook': stopHook,
    'real-gate-record': realGateRecord,
    'staged-backstop': stagedBackstop,
    budgets,
    'reviewer-catch': reviewerCatch,
    'integration-record': integrationRecord,
    'scheduled-loop': scheduledLoop,
    'own-work-contract': ownWorkContract
  };
})();
