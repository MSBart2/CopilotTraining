/*
  Deck-only visuals: opening workflow, artifact inspection, and closing primitive map.
  Shared frames and patterns carry the rest of the talk.
*/
(() => {
  const { svg, html } = window.Kit;

  const knowHowHero = (s) => {
    const text = (x, y, value, cls = '') => svg.text(x, y, value, { cls, anchor: 'start' });
    // One launch, many artifacts: guidance fans out into work, not a role inventory.
    const knowledge = svg.enter(
      svg.rect(14, 38, 356, 216, { cls: 'box soft', r: 18 }) +
      svg.rect(7, 45, 356, 216, { cls: 'box soft', r: 18 }) +
      svg.rect(0, 52, 356, 216, { cls: 'box', r: 18 }) +
      text(24, 90, 'Shared team know-how', 't-lg') +
      text(24, 122, 'Policies · decisions · working examples', 't-sm t-muted') +
      text(24, 164, '30-day return policy') +
      text(24, 200, 'Audit each state change') +
      text(24, 236, 'Validate every endpoint'), 100);
    const guidance = svg.g(svg.enter(
      svg.rect(450, 52, 450, 216, { cls: 'zone hero-guidance', r: 24 }) +
      text(478, 96, 'Reusable Copilot guidance', 't-lg z-text') +
      text(478, 140, 'Keep the rules. Reuse the recipe.') +
      text(478, 182, 'Team encodes context and task steps.', 't-sm') +
      text(478, 230, 'Select what fits the work at hand.', 't-sm t-muted'), 650), { cls: 'z-purple' });
    const request = svg.enter(
      svg.rect(994, 52, 446, 216, { cls: 'box', r: 18 }) +
      text(1020, 92, 'Team asks Copilot', 't-lg') +
      text(1020, 138, '“Help us launch returns.”') +
      text(1020, 184, 'Copilot uses relevant guidance', 't-sm') +
      text(1020, 230, 'and drafts work across the lifecycle.', 't-sm'), 1250);
    const artifacts = [
      { phase: 'PLANNING', title: 'Acceptance criteria', lines: ['Returns within 30 days'] },
      { phase: 'DESIGN', title: 'Design decision', lines: ['Keep a return audit trail'] },
      { phase: 'DEVELOPMENT', title: 'Change + tests', lines: ['POST /returns', 'validate → createReturn'] },
      { phase: 'QUALITY / RELEASE', title: 'Test + release plan', lines: ['30-day edge · rollback'] },
      { phase: 'OPERATIONS', title: 'Return runbook', lines: ['Restore, then verify'] }
    ];
    const drafts = artifacts.map((a, i) => {
      const x = i * 292;
      return svg.enter(
        svg.rect(x, 316, 272, 120, { cls: 'box hero-draft', r: 14 }) +
        text(x + 18, 342, a.phase, 't-xs t-mono') +
        text(x + 18, 374, a.title, 'hero-artifact') +
        a.lines.map((line, j) => text(x + 18, 401 + j * 23, line, 't-sm t-muted')).join(''),
        2000 + i * 100);
    }).join('');
    const links = svg.g(
      svg.trace('M370 160L450 160', { cls: 'wire link', at: 450, dur: 300 }) +
      svg.trace('M900 160L994 160', { cls: 'wire link', at: 1050, dur: 300 }) +
      svg.trace('M1217 268L1217 290L136 290L136 316', { cls: 'wire link', at: 1600, dur: 400 }) +
      [428, 720, 1012, 1304].map((x) =>
        svg.trace(`M1217 290L${x} 290L${x} 316`, { cls: 'wire link', at: 1800, dur: 350 })
      ).join(''), { cls: 'z-purple' });
    const review = svg.g(svg.enter(
      svg.rect(0, 456, 1440, 60, { cls: 'zone', r: 14 }) +
      text(22, 493, 'People review and approve', 'z-text') +
      text(386, 493, 'Check criteria, decisions, tests and readiness.', 't-sm') +
      text(1120, 493, 'Approval: PENDING', 't-mono t-sm z-text'), 2700), { cls: 'z-orange' });

    return `${html.pill(s)}<h1>${html.esc(s.title).replace('know-how', '<span class="hero-phrase">know-how</span>')}</h1>
      ${svg.scene(1440, 516,
        'Illustrative returns launch: the team encodes shared policies, decisions and examples as reusable Copilot guidance. At the team’s request, Copilot drafts acceptance criteria, a design decision, a change with tests, a test and release plan, and an operations runbook. People check the work and own approval, which is pending. No executed checks or accepted outcomes are claimed.',
        text(0, 16, 'ILLUSTRATIVE WORKFLOW · ONE RETURNS LAUNCH, FROM PLANNING TO OPERATIONS', 't-xs t-mono') +
        links + knowledge + guidance + request + drafts + review,
        'know-how-workflow')}
      <p class="hero-meta">${html.esc(s.meta)}</p>`;
  };

  const workingLayers = (s) => {
    const text = (x, y, value, cls = '') => svg.text(x, y, value, { cls, anchor: 'start' });
    const cards = s.layers.map((layer, i) => {
      const x = i * 492;
      const at = 350 + i * 450;
      return svg.enter(
        svg.rect(x, 80, 456, 334, { cls: 'box', r: 20 }) +
        svg.rect(x + 24, 80, 408, 3, { cls: 'card-top', r: 1 }) +
        text(x + 24, 118, layer.title.toUpperCase(), 'layer-label') +
        svg.lines(x + 24, 156, layer.question.join(' '), { cls: 'layer-question', max: 20, lh: 28, anchor: 'start' }) +
        text(x + 24, 218, layer.primitive, 't-mono t-sm t-muted') +
        svg.rect(x + 16, 238, 424, 160, { cls: 'zone', r: 12 }) +
        layer.action.map((line, j) => text(x + 32, 270 + j * 28, line, 'z-text')).join('') +
        layer.detail.map((line, j) => text(x + 32, 348 + j * 26, line, i === 2 ? 't-sm t-muted' : 't-mono t-sm')).join(''),
        at);
    }).join('');
    // Branches share a task; no arrows imply a required handoff or a maturity ladder.
    const branches = [228, 720, 1212].map((x) =>
      svg.trace(`M720 44L720 60L${x} 60L${x} 80`, { cls: 'wire link', at: 150, dur: 500 })
    ).join('');
    return `${html.head(s)}
      ${svg.scene(1440, 502,
        'Convention, implementation, and specialization can work together on the same returns endpoint: instructions and AGENTS.md carry the API convention; prompts and skills carry the endpoint task; a custom .agent.md defines a focused reviewer role and tools. Each layer needs diff review, real tests, and a human acceptance decision. Handoffs are optional. Examples are illustrative.',
        svg.g(
          branches +
          svg.pop(svg.rect(540, 0, 360, 44, { cls: 'zone', r: 22 }) +
            svg.text(720, 29, `Same endpoint: ${s.endpoint}`, { cls: 't-mono t-sm z-text' }), 0) +
          cards, { cls: 'z-purple' }) +
        svg.enter(
          svg.rect(0, 438, 1440, 64, { cls: 'box', r: 14 }) +
          text(24, 478, 'Across every layer', 't-sm t-muted') +
          text(260, 478, s.verification) +
          svg.g(text(1200, 478, 'Human acceptance', 't-sm z-text'), { cls: 'z-orange' }), 1900),
        'working-layers')}
      ${html.footnote(s.footnote)}`;
  };

  const primitiveMap = () => {
    const W = 760;
    const rows = [
      { title: 'Instructions', detail: 'Stable context · repository or path', z: 'local', icon: '📋' },
      { title: 'Custom Prompts', detail: 'Human-triggered · task recipe', z: 'remote', icon: '💬' },
      { title: 'Skills', detail: 'Relevant expertise · optional resources', z: 'purple', icon: '⚡' },
      { title: 'Agents', detail: 'Selected role · configured tools', z: 'orange', icon: '🤖' }
    ];
    const x = 68;
    const w = 624;
    const h = 112;
    const gap = 34;
    const y0 = 34;
    const cards = rows.map((r, i) => {
      const y = y0 + i * (h + gap);
      return svg.g(
        svg.enter(
          svg.rect(x, y, w, h, { cls: 'box card', r: 20 }) +
          svg.rect(x, y, 7, h, { cls: 'card-edge', r: 3 }) +
          svg.text(x + 42, y + 48, r.icon, { cls: 't-emoji', anchor: 'start' }) +
          svg.text(x + 100, y + 48, r.title, { cls: 't-lg primitive-label', anchor: 'start' }) +
          svg.text(x + 100, y + 82, r.detail, { cls: 't-muted t-sm', anchor: 'start' }),
          300 + 260 * i
        ),
        { cls: `z-${r.z}` }
      );
    }).join('');
    return svg.scene(W, 650,
      'Four independent choices: instructions establish shared context, prompts capture human-triggered recipes, skills carry relevant expertise with optional resources, and agents define a selected role. There is no required progression.',
      cards,
      'primitive-map');
  };

  const artifact = (s) => {
    const a = s.artifact;
    const W = 1440;
    const H = 500;
    const leftW = 820;
    const gap = 28;
    const rightX = leftW + gap;
    const rightW = W - rightX;
    const panel = (x, w, z) => svg.g(svg.rect(x, 0, w, H, { cls: 'box', r: 18 }), { cls: `z-${z}` });
    const code = [
      svg.text(30, 42, a.filename, { cls: 't-sm t-mono artifact-filename', anchor: 'start' }),
      svg.text(30, 72, a.badge, { cls: 't-xs t-mono artifact-badge', anchor: 'start' }),
      ...a.lines.map((line, i) => svg.lines(34, 112 + i * 30, line || ' ', {
        cls: 't-mono t-sm artifact-code',
        anchor: 'start',
        max: 68,
        lh: 23
      }))
    ].join('');
    const proof = [
      svg.text(rightX + 28, 44, a.proofTitle, { cls: 't-lg', anchor: 'start' }),
      ...a.proof.map((item, i) => {
        const y = 104 + i * 122;
        const z = i === a.proof.length - 1 ? 'orange' : i === 1 ? 'green' : 'purple';
        return svg.g(
          svg.enter(
            svg.rect(rightX + 22, y, rightW - 44, 104, { cls: 'zone', r: 14 }) +
            svg.text(rightX + 42, y + 34, item.title, { cls: 't-sm z-text artifact-proof-title', anchor: 'start' }) +
            svg.lines(rightX + 42, y + 66, item.text, {
              cls: 't-muted t-xs artifact-proof-text',
              anchor: 'start',
              max: 42,
              lh: 22
            }),
            350 + 220 * i
          ),
          { cls: `z-${z}` }
        );
      })
    ].join('');

    return `${html.head(s)}
      ${svg.scene(W, H,
        `${s.title}. Illustrative artifact ${a.filename}. ${a.proof.map((p) => `${p.title}: ${p.text}`).join('. ')}`,
        panel(0, leftW, 'local') + panel(rightX, rightW, 'purple') + code + proof,
        'artifact')}`;
  };

  const instructionRepo = (s) => {
    const baseline = svg.enter(
      svg.rect(0, 0, 918, 430, { cls: 'box', r: 18 }) +
      svg.text(26, 40, '.github/copilot-instructions.md', { cls: 't-sm t-mono', anchor: 'start' }) +
      svg.text(26, 72, 'LEAN SHARED BASELINE · TWO TASK ROUTES', { cls: 't-xs t-mono t-muted', anchor: 'start' }) +
      svg.lines(28, 144, s.baseline[0], { cls: 'instruction-pointer-code', anchor: 'start', max: 100, lh: 25 }) +
      svg.lines(28, 250, s.baseline[1], { cls: 'instruction-pointer-code', anchor: 'start', max: 100, lh: 25 }) +
      svg.path('M26 184H892M26 290H892', { cls: 'wire' }) +
      svg.text(28, 386, 'Rules stay brief; the documents hold task-specific detail.', {
        cls: 't-sm t-muted', anchor: 'start'
      }), 0);
    const docs = s.details.map((item, i) => {
      const y = i * 214;
      const z = item.z;
      return svg.g(svg.enter(
        svg.rect(946, y, 494, 190, { cls: 'zone', r: 16 }) +
        svg.text(970, y + 38, i === 0 ? 'DEPLOYMENT TASK' : 'CUSTOMER-FACING TASK', {
          cls: 't-xs t-mono z-text', anchor: 'start'
        }) +
        svg.text(970, y + 82, item.filename, {
          cls: 'instruction-pointer-path', anchor: 'start'
        }) +
        svg.lines(970, y + 126, item.detail, {
          cls: 'instruction-pointer-detail', anchor: 'start', max: 38, lh: 25
        }),
        500 + i * 450), { cls: `z-${z}` });
    }).join('');
    const pointer = svg.enter(
      svg.path('M858 152H914V96H946', { cls: 'wire link' }) +
      svg.path('M858 258H914V310H946', { cls: 'wire link' }), 1100);
    return instructionScene(s,
      'A concise repository baseline uses explicit task-specific read directions to point to separate deployment and accessibility documents. The links do not guarantee that either document is loaded.',
      baseline + pointer + docs);
  };

  // Section 1: the pictures follow knowledge into work, rather than inventorying settings.
  const itext = (x, y, value, cls = '') => svg.text(x, y, value, { cls, anchor: 'start' });
  const ilines = (x, y, values, cls = '', gap = 30) =>
    values.map((value, i) => itext(x, y + i * gap, value, cls)).join('');
  const izone = (inner, z = 'purple') => svg.g(inner, { cls: `z-${z}` });
  const instructionScene = (s, label, inner) =>
    `${html.head(s)}${svg.scene(1440, 500, label, inner, 'instruction-picture')}${html.footnote(s.footnote)}`;

  const instructionReuse = (s) => {
    const contributions = s.contributions.map((c, i) => {
      const y = 16 + i * 108;
      return svg.enter(
        svg.rect(0, y, 790, 88, { cls: 'box', r: 12 }) +
        itext(18, y + 29, c.team, 't-xs t-mono t-muted') +
        svg.lines(18, y + 62, c.rule, {
          cls: 'instruction-contribution',
          anchor: 'start',
          max: 64,
          lh: 25
        }), 250 + i * 260);
    }).join('');
    const fileLines = s.contributions.map((c, i) =>
      svg.lines(900, 118 + i * 78, `- ${c.rule}`, {
        cls: 'instruction-file-line',
        anchor: 'start',
        max: 48,
        lh: 26
      })
    ).join('');
    const routes = s.contributions.map((_, i) => {
      const y = 60 + i * 108;
      return svg.trace(`M790 ${y}H838L866 244`, {
        cls: 'wire link',
        at: 450 + i * 260,
        dur: 300
      });
    }).join('');
    return instructionScene(s,
      'Product, design and accessibility, engineering, and operations each contribute an actionable instruction. The reviewed lines converge in one repository instruction file.',
      izone(routes) +
      contributions +
      svg.enter(izone(
        svg.rect(866, 16, 574, 440, { cls: 'zone', r: 16 }) +
        itext(892, 52, '.github/copilot-instructions.md', 't-sm t-mono z-text') +
        itext(892, 80, 'ONE REVIEWED SHARED FILE', 't-xs t-mono t-muted') +
        fileLines, 'purple'), 1500));
  };

  const instructionSources = (s) => {
    const lanes = s.lanes.map((l, i) => {
      const x = i * 492;
      return svg.enter(
        svg.rect(x, 0, 456, 334, { cls: 'box', r: 16 }) +
        itext(x + 20, 32, l.label, 't-xs t-mono t-muted') +
        itext(x + 20, 76, l.owner, 't-lg') +
        itext(x + 20, 109, l.location, 't-xs t-mono') +
        izone(svg.rect(x + 14, 132, 428, 88, { cls: 'zone', r: 9 }) +
          ilines(x + 28, 166, l.rule, 't-sm', 30)) +
        ilines(x + 20, 270, l.update, 't-sm t-muted', 28), i * 250);
    }).join('');
    const routes = [228, 720, 1212].map((x) =>
      svg.trace(`M${x} 334L${x} 378L720 378L720 418`, { cls: 'wire link', at: 850, dur: 500 })).join('');
    return instructionScene(s,
      'Organization, repository, and personal instructions feed a supported Copilot request as distinct sources with distinct maintainers and update paths. Equal routes do not imply precedence.',
      izone(routes) + lanes +
      svg.enter(izone(svg.rect(250, 418, 940, 74, { cls: 'zone', r: 15 }) +
        itext(275, 448, 'COPILOT REQUEST · CHECK THE SELECTED HARNESS', 't-xs t-mono z-text') +
        itext(275, 478, 'Inspect included guidance; resolve conflicts at the source.', 't-sm')), 1400));
  };

  const instructionContext = (s) => {
    const xs = [10, 296, 582, 868, 1154];
    const cardW = 268;
    const cardY = 84;
    const cardH = 396;
    const baselineSlash = s.baselineFile.lastIndexOf('/');
    const baselineDir = s.baselineFile.slice(0, baselineSlash + 1);
    const baselineName = s.baselineFile.slice(baselineSlash + 1);
    const scopedSlash = s.scopedFile.lastIndexOf('/');
    const scopedDir = s.scopedFile.slice(0, scopedSlash + 1);
    const scopedName = s.scopedFile.slice(scopedSlash + 1);
    const cards = [
      svg.g(svg.enter(
        svg.rect(xs[0], cardY, cardW, cardH, { cls: 'zone', r: 14 }) +
        itext(xs[0] + 16, 116, '1 · BASELINE AUTO', 'instruction-flow-label z-text') +
        itext(xs[0] + 16, 154, baselineDir, 'instruction-flow-path') +
        itext(xs[0] + 16, 184, baselineName, 'instruction-flow-path') +
        svg.lines(xs[0] + 16, 228, 'Included automatically in supported VS Code workspace chat.', {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 22
        }) +
        svg.path(`M${xs[0] + 14} 294H${xs[0] + cardW - 14}`, { cls: 'wire' }) +
        svg.lines(xs[0] + 16, 326, s.baseline, {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 24
        }), 200), { cls: 'z-purple' }),
      svg.g(svg.enter(
        svg.rect(xs[1], cardY, cardW, cardH, { cls: 'zone', r: 14 }) +
        svg.lines(xs[1] + 16, 110, '2 · FILE-MATCHED RULE', {
          cls: 'instruction-flow-label z-text', anchor: 'start', max: 16, lh: 20
        }) +
        itext(xs[1] + 16, 154, scopedDir, 'instruction-flow-path') +
        itext(xs[1] + 16, 184, scopedName, 'instruction-flow-path') +
        itext(xs[1] + 16, 226, 'applyTo:', 'instruction-flow-label t-muted') +
        svg.lines(xs[1] + 16, 258, s.applyTo, {
          cls: 'instruction-flow-path', anchor: 'start', max: 29, lh: 20
        }) +
        svg.path(`M${xs[1] + 14} 294H${xs[1] + cardW - 14}`, { cls: 'wire' }) +
        svg.lines(xs[1] + 16, 326, s.scopedRule, {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 22
        }), 550), { cls: 'z-purple' }),
      svg.g(svg.enter(
        svg.rect(xs[2], cardY, cardW, cardH, { cls: 'zone', r: 14 }) +
        itext(xs[2] + 16, 116, '3 · COPILOT READS', 'instruction-flow-label z-text') +
        itext(xs[2] + 16, 154, s.linkedDoc, 'instruction-flow-path') +
        svg.lines(xs[2] + 16, 210, 'Because the baseline says when.', {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 22
        }) +
        itext(xs[2] + 16, 266, 'Guide detail:', 'instruction-flow-label t-muted') +
        svg.lines(xs[2] + 16, 300, s.linkedDetail, {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 22
        }) +
        svg.path(`M${xs[2] + 14} 366H${xs[2] + cardW - 14}`, { cls: 'wire' }) +
        svg.lines(xs[2] + 16, 400, `Not read: ${s.excludedDoc}`, {
          cls: 'instruction-flow-excluded', anchor: 'start', max: 22, lh: 19
        }), 900), { cls: 'z-purple' }),
      svg.enter(
        svg.rect(xs[3], cardY, cardW, cardH, { cls: 'box', r: 14 }) +
        svg.lines(xs[3] + 16, 110, '4 · WORKING CONTEXT', {
          cls: 'instruction-flow-label t-muted', anchor: 'start', max: 16, lh: 20
        }) +
        itext(xs[3] + 16, 166, 'Request', 'instruction-flow-body') +
        itext(xs[3] + 16, 202, 'Automatic baseline', 'instruction-flow-body') +
        itext(xs[3] + 16, 238, 'Matched runbook rule', 'instruction-flow-body') +
        itext(xs[3] + 16, 274, 'Deployment guide read', 'instruction-flow-body') +
        svg.path(`M${xs[3] + 14} 296H${xs[3] + cardW - 14}`, { cls: 'wire' }) +
        svg.lines(xs[3] + 16, 334, 'Relevant detail is together;', {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 22
        }) +
        svg.lines(xs[3] + 16, 390, 'Unrelated docs stay outside.', {
          cls: 'instruction-flow-body t-muted', anchor: 'start', max: 22, lh: 22
        }), 1250),
      svg.g(svg.enter(
        svg.rect(xs[4], cardY, cardW, cardH, { cls: 'zone', r: 14 }) +
        svg.lines(xs[4] + 16, 110, '5 · PROPOSED CHANGE', {
          cls: 'instruction-flow-label z-text', anchor: 'start', max: 16, lh: 20
        }) +
        svg.lines(xs[4] + 16, 164, s.output[0], {
          cls: 'instruction-flow-path', anchor: 'start', max: 25, lh: 21
        }) +
        svg.lines(xs[4] + 16, 218, s.output[1], {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 23
        }) +
        svg.path(`M${xs[4] + 14} 290H${xs[4] + cardW - 14}`, { cls: 'wire' }) +
        svg.lines(xs[4] + 16, 338, 'Maintainer inspects exact values and the runbook diff.', {
          cls: 'instruction-flow-body', anchor: 'start', max: 22, lh: 22
        }) +
        itext(xs[4] + 16, 430, 'No deployment is run.', 'instruction-flow-excluded'), 1600), { cls: 'z-purple' })
    ].join('');
    const routes = izone([0, 1, 2, 3].map((i) => {
      const start = xs[i] + cardW;
      const end = xs[i + 1];
      return svg.trace(`M${start} 278H${end}`, { cls: 'wire link', at: 420 + i * 360, dur: 240 }) +
        svg.pop(svg.path(`M${end - 9} 271L${end} 278L${end - 9} 285`, { cls: 'wire link' }), 620 + i * 360);
    }).join(''));
    const request = svg.enter(
      izone(svg.rect(0, 0, 1440, 58, { cls: 'box', r: 12 }) +
        svg.text(20, 37, 'ONE REQUEST', { cls: 'instruction-flow-label t-muted', anchor: 'start' }) +
        svg.text(218, 37, s.request, { cls: 'instruction-flow-request', anchor: 'start' }), 'purple'), 0);
    return instructionScene(s,
      'One illustrative deployment request receives an automatic repository baseline, a runbook instruction matched to the target path, and an explicitly read deployment guide. Copilot proposes a runbook change; unrelated accessibility guidance stays outside the task and a maintainer reviews the result.',
      request + routes + cards);
  };

  const instructionExamples = (s) => {
    const headers = itext(0, 24, 'VAGUE ADVICE', 't-xs t-mono t-muted') +
      itext(270, 24, 'USEFUL INSTRUCTION · ACTION + CONTEXT', 't-xs t-mono t-muted') +
      itext(950, 24, 'REPRESENTATIVE ARTIFACT / REVIEW TARGET', 't-xs t-mono t-muted');
    const rows = s.examples.map((e, i) => {
      const y = 52 + i * 148;
      return svg.enter(
        svg.path(`M0 ${y}H1440`, { cls: 'wire' }) +
        itext(0, y + 29, e.phase, 't-xs t-mono t-muted') +
        svg.lines(0, y + 69, e.weak, { cls: 't-sm', anchor: 'start', max: 25, lh: 28 }) +
        izone(itext(242, y + 83, '→', 't-lg z-text') +
          ilines(270, y + 63, e.rule, 'instruction-example', 30)) +
        izone(svg.rect(934, y + 18, 506, 112, { cls: 'zone', r: 10 }) +
          ilines(950, y + 59, e.result, 'instruction-output', 31), 'green'), i * 450);
    }).join('');
    return instructionScene(s,
      'Three illustrative transformations connect vague requirements, code, and operations advice to concrete instructions and representative artifacts a reviewer can inspect.',
      headers + rows);
  };

  const instructionMaintenance = (s) => {
    const cards = [
      svg.enter(svg.rect(0, 0, 340, 310, { cls: 'box', r: 14 }) +
        itext(18, 32, '1 · SIGNIFICANT CHANGE', 't-xs t-mono t-muted') +
        itext(18, 78, 'Deployment command', 't-sm') +
        svg.lines(18, 118, 'npm run deploy:staging', { cls: 'instruction-trial-code', anchor: 'start', max: 27, lh: 28 }) +
        itext(18, 164, 'becomes', 't-sm t-muted') +
        svg.lines(18, 204, 'npm run deploy:preview', { cls: 'instruction-trial-code', anchor: 'start', max: 27, lh: 28 }) +
        itext(18, 260, 'Does durable guidance change?', 't-sm'), 0),
      svg.enter(svg.rect(366, 0, 340, 310, { cls: 'box', r: 14 }) +
        itext(384, 32, '2 · PERSON ASKS COPILOT', 't-xs t-mono t-muted') +
        svg.lines(384, 86, s.request, {
          cls: 'instruction-maintenance-request', anchor: 'start', max: 26, lh: 30
        }) +
        itext(384, 268, 'No request to add a rule by default.', 't-xs t-muted'), 350),
      svg.enter(izone(svg.rect(732, 0, 340, 310, { cls: 'zone', r: 14 }) +
        itext(750, 32, '3 · COPILOT PROPOSES', 't-xs t-mono z-text') +
        itext(750, 76, 'Targeted edit, if needed:', 't-sm') +
        itext(750, 112, 'Current rule:', 't-xs t-mono t-muted') +
        ilines(750, 142, s.before, 'instruction-maintenance-request', 24) +
        itext(750, 194, 'Proposed:', 't-xs t-mono t-muted') +
        ilines(750, 224, s.after, 'instruction-maintenance-request', 24) +
        itext(750, 284, 'Or explain: no durable update.', 't-xs t-muted'), 'purple'), 700),
      svg.enter(izone(svg.rect(1098, 0, 342, 310, { cls: 'zone', r: 14 }) +
        itext(1116, 32, '4 · OWNER REVIEWS', 't-xs t-mono z-text') +
        itext(1116, 80, 'Check command + source.', 't-sm') +
        itext(1116, 112, 'Approve, revise, or reject.', 't-sm') +
        itext(1116, 164, 'Remove stale or duplicate', 't-sm') +
        itext(1116, 194, 'guidance; name an owner.', 't-sm') +
        itext(1116, 250, 'One-off fix stays in task.', 't-sm t-muted'), 'orange'), 1050)
    ].join('');
    const arrows = izone(
      svg.trace('M340 154H366', { cls: 'wire link', at: 250, dur: 220 }) +
      svg.trace('M706 154H732', { cls: 'wire link', at: 600, dur: 220 }) +
      svg.trace('M1072 154H1098', { cls: 'wire link', at: 950, dur: 220 }));
    const next = svg.enter(
      svg.rect(0, 354, 1440, 128, { cls: 'box', r: 14 }) +
      itext(20, 390, 'NEXT RELEVANT DEPLOY TASK', 't-xs t-mono t-muted') +
      ilines(20, 428, s.next, 'instruction-rule', 30) +
      itext(900, 448, 'Inspect actual work; rerun verified checks.', 't-sm t-muted'), 1400);
    return instructionScene(s,
      'After a significant deployment command change, a person asks Copilot to assess the relevant instruction. Copilot proposes a targeted edit or explains that no durable update is needed. A named owner reviews it, then the team inspects guidance on the next relevant task.',
      arrows + cards + next);
  };

  const instructionLocations = (s) => {
    const rows = s.locations.map(([scope, location, purpose], i) => {
      const y = 8 + i * 98;
      return svg.enter(
        izone(svg.path(`M218 ${y + 22}H258`, { cls: 'wire link' })) +
        itext(0, y + 28, scope, 'instruction-rule') +
        svg.rect(258, y, 1182, 80, { cls: 'box', r: 10 }) +
        itext(280, y + 31, location, 't-mono instruction-location') +
        itext(280, y + 60, purpose, 't-sm t-muted'), 150 + i * 180);
    }).join('');
    return instructionScene(s,
      'Actual instruction homes: GitHub organization settings, a harness-supported user folder, repository-wide .github/copilot-instructions.md, cross-agent AGENTS.md, and targeted .github/instructions files. AGENTS.md is guidance, not a custom agent role.',
      rows);
  };

  const instructionSelectors = (s) => {
    const r = s.selectors[0];
    const rule = svg.enter(
      svg.rect(0, 0, 704, 430, { cls: 'box', r: 16 }) +
      itext(22, 38, r.name, 't-sm t-mono t-muted') +
      ilines(24, 96, ['---', `applyTo: "${r.glob}"`, '---'], 't-mono instruction-selector', 32) +
      svg.path('M22 220H682', { cls: 'wire' }) +
      itext(24, 268, 'When editing a runbook, include:', 't-sm') +
      itext(44, 312, 'command · expected result · rollback', 'instruction-output') +
      itext(24, 386, 'This file-pattern route is conditional.', 't-sm t-muted'), 0);
    const match = svg.enter(izone(
      svg.rect(746, 0, 694, 190, { cls: 'zone', r: 16 }) +
      itext(772, 42, 'MATCHES THIS applyTo', 't-xs t-mono z-text') +
      itext(772, 98, r.match, 'instruction-match z-text') +
      itext(772, 146, 'Agent creates or modifies this file.', 't-sm'),
    'green'), 450);
    const miss = svg.enter(
      svg.rect(746, 214, 694, 190, { cls: 'box', r: 16 }) +
      itext(772, 256, 'OUTSIDE THIS FILE PATTERN', 't-xs t-mono t-muted') +
      itext(772, 312, r.miss, 'instruction-match t-muted') +
      itext(772, 360, 'No runbook rule through this glob.', 't-sm t-muted'), 850);
    const route = izone(svg.trace('M704 150H726V94H746', {
      cls: 'wire link', at: 250, dur: 350
    }));
    return instructionScene(s,
      `The illustrative runbook instruction ${r.name} uses applyTo ${r.glob}. VS Code attaches it when the agent creates or modifies ${r.match}; ${r.miss} is outside this file-pattern route.`,
      route + rule + match + miss);
  };

  const instructionTrial = (s) => {
    const t = s.trial;
    const setup = svg.enter(
      itext(0, 25, t.setup, 't-sm t-muted') +
      izone(svg.rect(0, 48, 1440, 68, { cls: 'zone', r: 12 }) +
        svg.lines(22, 77, t.request, { cls: 'instruction-trial-request', anchor: 'start', max: 100, lh: 27 })), 0);
    const before = svg.enter(
      svg.rect(0, 154, 430, 248, { cls: 'box', r: 13 }) +
      itext(20, 186, '1 · INSPECT THE FIRST DRAFT', 't-xs t-mono t-muted') +
      itext(20, 220, 'docs/runbooks/deployment.md · example', 't-xs t-mono') +
      ilines(20, 264, t.before, 'instruction-trial-code', 30) +
      izone(itext(20, 364, 'Maintainer: rule omits result + rollback.', 't-xs z-text'), 'orange'), 450);
    const correction = svg.enter(
      svg.rect(490, 154, 460, 248, { cls: 'box', r: 13 }) +
      itext(510, 186, '2 · COPILOT PROPOSES AN INSTRUCTION EDIT', 't-xs t-mono t-muted') +
      itext(510, 220, 'Maintainer checks References + guide.', 't-sm') +
      itext(510, 248, '.github/instructions/runbooks.instructions.md', 't-xs t-mono') +
      izone(ilines(510, 282, t.correction, 'instruction-trial-code z-text', 30), 'green') +
      itext(510, 382, 'Maintainer reviews and approves the diff.', 't-sm t-muted'), 950);
    const after = svg.enter(
      svg.rect(1010, 154, 430, 248, { cls: 'box', r: 13 }) +
      itext(1030, 186, '3 · RERUN THE SAME TASK', 't-xs t-mono t-muted') +
      itext(1030, 220, 'Expected example · inspect actual diff', 't-sm') +
      ilines(1030, 264, t.after, 'instruction-trial-code', 30) +
      izone(itext(1030, 372, 'Check status: not executed here', 't-sm z-text'), 'orange'), 1450);
    const route = izone(
      svg.trace('M430 278H490', { cls: 'wire link', at: 750, dur: 200 }) +
      svg.trace('M478 270L490 278L478 286', { cls: 'wire link', at: 900, dur: 100 }) +
      svg.trace('M950 278H1010', { cls: 'wire link', at: 1250, dur: 200 }) +
      svg.trace('M998 270L1010 278L998 286', { cls: 'wire link', at: 1400, dur: 100 }));
    return instructionScene(s,
      'Illustrative loop: a deployment command changes and the first runbook draft lacks the expected result and rollback. A maintainer asks Copilot to update the matching runbook instruction, reviews the diff, and retries the same task. No product result, deployment, or passing check is claimed.',
      setup + route + before + correction + after +
      svg.enter(izone(svg.rect(0, 434, 1440, 62, { cls: 'zone', r: 12 }) +
        itext(22, 473, 'Inspect actual assertions + diff · run verified checks · the maintainer accepts or revises · reuse only the reviewed rule', 't-sm z-text'), 'orange'), 2000));
  };

  const instructionTroubleshoot = (s) => {
    const cards = s.checks.map((c, i) => {
      const x = i * 366;
      return svg.enter(
        svg.rect(x, 0, 342, 456, { cls: 'box', r: 14 }) +
        itext(x + 18, 38, c.title, 't-xs t-mono t-muted') +
        svg.lines(x + 18, 84, c.check, { cls: 'instruction-troubleshoot-text', anchor: 'start', max: 27, lh: 29 }) +
        izone(svg.rect(x + 12, 176, 318, 100, { cls: 'zone', r: 10 }) +
          svg.lines(x + 28, 214, c.signal, { cls: 'instruction-troubleshoot-signal', anchor: 'start', max: 25, lh: 27 }), i === 3 ? 'green' : 'purple') +
        itext(x + 18, 318, 'NEXT MOVE', 't-xs t-mono t-muted') +
        svg.lines(x + 18, 356, c.next, { cls: 'instruction-troubleshoot-text', anchor: 'start', max: 27, lh: 29 }),
        250 + i * 400
      );
    }).join('');
    const arrows = izone([0, 1, 2].map((i) => {
      const x = (i + 1) * 366 - 24;
      return svg.trace(`M${x} 228H${x + 24}`, { cls: 'wire link', at: 700 + i * 350, dur: 220 });
    }).join(''));
    return instructionScene(s,
      'Four actionable VS Code Copilot troubleshooting checks connect instruction discovery, applyTo scope, stale or unclear rules, and a repeatable task. Each check has an observable signal and a next move; References indicate discovery, not compliance.',
      arrows + cards);
  };

  // Parts 2–3: conversation capture, parameterized reuse, and expertise in motion.
  // Local helpers deliberately avoid changing the approved opening or shared engine.
  const et = (x, y, value, cls = '') => svg.text(x, y, value, { cls: `expertise-text ${cls}`, anchor: 'start' });
  const el = (x, y, values, cls = '', lh = 32) => values.map((v, i) => et(x, y + i * lh, v, cls)).join('');
  const ez = (inner, z = 'purple') => svg.g(inner, { cls: `z-${z}` });
  const ep = (s, label, inner) => `${html.head(s)}${svg.scene(1440, 500, label, inner, 'expertise-picture')}${html.footnote(s.footnote)}`;
  const ea = (d, at = 300) => ez(svg.trace(d, { cls: 'wire link', at, dur: 450 }));
  const eb = (x, y, w, h, title, inner, z = '', at = 0) => svg.enter(
    (z ? ez(svg.rect(x, y, w, h, { cls: 'zone', r: 14 }) + et(x + 22, y + 34, title, 'expertise-label z-text') + inner, z) :
      svg.rect(x, y, w, h, { cls: 'box', r: 14 }) + et(x + 22, y + 34, title, 'expertise-label t-muted') + inner), at);
  const codeSheet = (s, filename, right, label) => ep(s, label,
    eb(0, 0, 928, 478, filename,
      el(22, 88, s.code, 'expertise-code', 32)) + right);

  const promptCapture = (s) => ep(s,
    'Illustrative conversation: a maintainer refines a deployment documentation review, then asks Copilot to capture its approach in refresh-docs.prompt.md. The draft keeps a change input, a current guide link, and evidence-shaped output.',
    eb(0, 0, 650, 310, '1 · MAINTAINER + COPILOT · REFINE THE REVIEW',
      el(22, 84, ['“Review docs for the deployment command change.”',
        'package.json: deploy:staging → deploy:preview'], 'expertise-body') +
      ez(el(22, 166, ['Copilot proposes docs/runbooks/deployment.md:',
        'npm run deploy:staging → npm run deploy:preview'], 'expertise-mono'), 'green') +
      el(22, 252, ['Maintainer: “Keep missing rollback evidence',
        'as an Open Question. That review is useful.”'], 'expertise-body')) +
    eb(0, 340, 650, 138, '2 · MAINTAINER ASKS COPILOT TO CAPTURE',
      el(22, 408, ['“Save this approach as /refresh-docs.',
        'Take a change, read our guide, cite each edit.”'], 'expertise-body'), 'purple', 700) +
    ea('M650 410H700V180H762', 1100) +
    eb(762, 0, 678, 350, '3 · COPILOT DRAFTS A REUSABLE PROMPT',
      et(784, 82, '.github/prompts/refresh-docs.prompt.md', 'expertise-mono') +
      el(784, 144, ['INPUT       the significant change',
        'REFERENCE   docs/review-guide.md',
        'APPROACH    compare source and docs',
        'OUTPUT      doc edit + source + questions'], 'expertise-mono', 44) +
      et(784, 322, 'Capture the workflow, not this case’s answer.', 'expertise-body'), 'purple', 1500) +
    svg.enter(ez(el(784, 406, ['Review state: useful example proposal',
      'Deployment: not run · approval: pending'], 'expertise-body'), 'orange'), 2000));

  const promptContract = (s) => codeSheet(s, '.github/prompts/refresh-docs.prompt.md',
    eb(964, 0, 476, 126, 'NAME → HUMAN COMMAND',
      el(986, 78, ['/refresh-docs', 'A person chooses this workflow.'], 'expertise-body', 30), 'purple', 300) +
    eb(964, 146, 476, 126, 'CHANGE → CASE-SPECIFIC INPUT',
      el(986, 224, ['Supply source files for this change.',
        'Optional agent: docs-reviewer (Part 4)'], 'expertise-body', 30), '', 700) +
    eb(964, 292, 476, 186, 'GUIDE + OUTPUT → REVIEWABLE WORK',
      el(986, 370, ['One maintained review guide.',
        'A proposed edit with its source.',
        'Missing evidence stays visible.'], 'expertise-body', 34), 'green', 1100),
    'The refresh-docs prompt names a human command, takes a change input, reads a relative link to the current review guide, and asks for a documentation edit with evidence and open questions. Input placeholders are model-directed, not deterministic.');

  const promptReuse = (s) => {
    const lane = (y, label, input, doc, result, source, question, at) =>
      eb(0, y, 520, 208, label, el(22, y + 86, input, 'expertise-mono', 34), '', at) +
      ea(`M520 ${y + 104}H584`, at + 300) +
      svg.enter(ez(svg.rect(584, y + 54, 250, 100, { cls: 'zone', r: 50 }) +
        et(608, y + 96, '/refresh-docs', 'expertise-mono z-text') +
        et(608, y + 128, 'same workflow', 'expertise-body')), at + 500) +
      ea(`M834 ${y + 104}H894`, at + 650) +
      eb(894, y, 546, 208, doc, el(916, y + 80, result, 'expertise-mono', 30) +
        et(916, y + 146, source, 'expertise-body') +
        ez(et(916, y + 182, question, 'expertise-body z-text'), 'orange'), '', at + 800);
    return ep(s, 'Two illustrative refresh-docs invocations reuse one review workflow. A deployment command change proposes a runbook edit citing package.json; a configuration rename proposes a configuration-doc edit citing src/config.ts. Rollback and default-value evidence remain open, checks unexecuted and acceptance pending.',
      lane(0, 'CASE A · DEPLOYMENT COMMAND CHANGE',
        ['Input after /refresh-docs:', 'deploy:staging → deploy:preview'],
        'docs/runbooks/deployment.md',
        ['− npm run deploy:staging', '+ npm run deploy:preview'],
        'Source: package.json', 'Open Question: rollback command?', 0) +
      lane(246, 'CASE B · CONFIGURATION RENAME',
        ['Input after /refresh-docs:', 'API_TIMEOUT → REQUEST_TIMEOUT'],
        'docs/configuration.md',
        ['− Set API_TIMEOUT.', '+ Set REQUEST_TIMEOUT.'],
        'Source: src/config.ts', 'Open Question: default value?', 1300) +
      svg.enter(et(0, 492, 'Maintainer inspects the second diff → refines unsupported claims → retries the case.', 'expertise-body'), 2400));
  };

  const promptShare = (s) => ep(s,
    'The team reviews and versions refresh-docs.prompt.md, then a teammate invokes it for another change. The prompt reads one maintained guide. The same capture-and-review technique applies to requirements, quality and release work. A prompt remains a valid destination.',
    eb(0, 0, 430, 156, 'PROPOSE THE PROMPT',
      el(22, 86, ['refresh-docs.prompt.md', 'Change input + guide link + output'], 'expertise-body')) +
    ea('M430 78H506', 250) +
    eb(506, 0, 428, 156, 'TEAM REVIEWS + VERSIONS',
      el(528, 86, ['Inspect the diff and two cases.', 'Merge the reusable approach.'], 'expertise-body'), 'orange', 500) +
    ea('M934 78H1010', 800) +
    eb(1010, 0, 430, 156, 'TEAMMATE INVOKES',
      el(1032, 86, ['/refresh-docs + next change', 'Inspect and refine the new result.'], 'expertise-body'), 'purple', 1000) +
    ea('M215 156V214H325V242', 1200) +
    eb(0, 242, 650, 230, 'ONE MAINTAINED KNOWLEDGE SOURCE',
      et(22, 326, 'docs/review-guide.md', 'expertise-mono') +
      el(22, 374, ['Update the rule here, then retry both cases.',
        'Keep detailed rules out of parallel copies.',
        'Prompt approval ≠ generated-edit approval.'], 'expertise-body'), 'purple', 1500) +
    svg.enter(el(740, 288, ['THE SAME MOVE ACROSS THE LIFECYCLE'], 'expertise-label t-muted') +
      el(740, 344, ['Requirements → criteria + open questions',
        'Quality → regression risks + test evidence',
        'Release → user impact + source links'], 'expertise-body', 48), 1800));

  const skillDiscovery = (s) => ep(s,
    'Illustrative relevant-work route: a configuration-rename request leads Copilot to docs-review name and description, loads SKILL.md, and consults the maintained guide as needed. A logo-layout request is outside this expertise. Selection can miss and explicit invocation is available.',
    svg.enter(ez(svg.rect(0, 0, 1440, 68, { cls: 'zone', r: 12 }) +
      et(22, 43, 'MAINTAINER: “Rename API_TIMEOUT to REQUEST_TIMEOUT and keep docs aligned.”', 'expertise-body z-text')), 0) +
    eb(0, 114, 420, 270, '1 · DISCOVER · NAME + DESCRIPTION',
      el(22, 204, ['docs-review', 'Review docs after deployment', 'or configuration changes.'], 'expertise-body', 40) +
      et(22, 354, 'Does this task fit the expertise?', 'expertise-body'), '', 450) +
    ea('M420 248H510', 700) +
    eb(510, 114, 420, 270, '2 · LOAD · SKILL.md',
      el(532, 204, ['Copilot reads how to review:', 'compare source with docs,', 'cite evidence, flag questions.'], 'expertise-body', 40) +
      et(532, 354, 'Relevant task or explicit invocation.', 'expertise-body'), 'purple', 1000) +
    ea('M930 248H1020', 1300) +
    eb(1020, 114, 420, 270, '3 · CONSULT · AS NEEDED',
      el(1042, 204, ['docs/review-guide.md', 'Detailed review knowledge.', 'Optional resources if useful.'], 'expertise-body', 40) +
      et(1042, 354, 'Then propose a sourced doc edit.', 'expertise-body'), 'purple', 1600) +
    svg.enter(et(0, 458, 'UNRELATED: “Center the logo.” → docs-review has no relevant expertise for this request.', 'expertise-body t-muted') +
      ez(et(0, 494, 'If selection misses: inspect discovery/loading → invoke /docs-review → refine the description.', 'expertise-body z-text'), 'orange'), 2200));

  const skillContract = (s) => codeSheet(s, '.github/skills/docs-review/SKILL.md',
    eb(964, 0, 476, 142, 'TASK FIT · DESIGN PROBE',
      el(986, 78, ['“Rename the config key; align docs.”',
        'Expected fit: docs-review expertise.'], 'expertise-body', 34), 'purple', 500) +
    eb(964, 164, 476, 142, 'UNRELATED · DESIGN PROBE',
      el(986, 242, ['“Center the logo on this page.”',
        'No docs-review expertise needed.'], 'expertise-body', 34), '', 900) +
    eb(964, 328, 476, 150, 'KNOWLEDGE-ONLY SKILL',
      el(986, 406, ['SKILL.md explains when and how.',
        'The guide holds maintained detail.'], 'expertise-body', 34), 'green', 1300),
    'A complete knowledge-only docs-review SKILL.md has a task-specific name and description, explicitly reads the maintained repository guide, compares source with docs, and returns proposed edits. Configuration renames fit; logo alignment is unrelated. No script or template is required.');

  const skillKnowledge = (s) => ep(s,
    'Illustrative knowledge use: the review guide requires source evidence and open questions; src/config.ts establishes REQUEST_TIMEOUT. Copilot proposes replacing API_TIMEOUT in docs/configuration.md, cites the source, and flags the unsupported 30-second default. Maintainer acceptance is pending.',
    eb(0, 0, 650, 244, 'COPILOT READS · docs/review-guide.md',
      el(22, 86, ['For a renamed command or key:',
        '1. Cite the changed source.',
        '2. Identify the affected doc and exact edit.',
        '3. Flag unsupported defaults or rollback.'], 'expertise-body', 38), 'purple') +
    eb(0, 278, 650, 188, 'COPILOT COMPARES · src/config.ts',
      et(22, 364, 'const timeoutKey = "REQUEST_TIMEOUT";', 'expertise-mono') +
      et(22, 424, 'This excerpt establishes the key, not its default.', 'expertise-body'), '', 700) +
    ea('M650 122H710V232H780', 1000) + ea('M650 372H710V232', 1000) +
    eb(780, 0, 660, 306, 'COPILOT PROPOSES · docs/configuration.md',
      el(802, 90, ['− Set API_TIMEOUT.', '+ Set REQUEST_TIMEOUT.'], 'expertise-mono', 40) +
      et(802, 192, 'Source: src/config.ts → timeoutKey', 'expertise-mono') +
      ez(el(802, 250, ['Open Question: is the documented 30-second',
        'default still correct? No evidence supplied.'], 'expertise-body', 30), 'orange'), '', 1400) +
    eb(780, 340, 660, 126, 'MAINTAINER DECIDES',
      el(802, 408, ['Inspect the source, doc diff, and unresolved claim.',
        'Acceptance: pending · checks: not executed'], 'expertise-body', 32), 'orange', 1900));

  const skillResources = (s) => ep(s,
    'Two optional docs-review resources help different parts of the work. A report template organizes the doc path, source and question. A local-link check can report a missing rollback document. These are illustrative resource interfaces and outputs; no check was executed and no acceptance is claimed.',
    eb(0, 0, 510, 198, 'SKILL.md · WHEN RETURNING FINDINGS',
      el(22, 82, ['Use [report](assets/review.md).', '', 'Doc | Evidence | Open Questions'], 'expertise-mono', 34), '', 0) +
    ea('M510 98H630', 300) +
    eb(630, 0, 810, 198, 'TEMPLATE → A FILLED, REVIEWABLE REPORT',
      el(652, 82, ['Doc: docs/configuration.md',
        'Evidence: src/config.ts names REQUEST_TIMEOUT',
        'Open Questions: confirm the default value'], 'expertise-mono', 36), 'purple', 650) +
    eb(0, 242, 510, 198, 'SKILL.md · AFTER EDITING DOCS',
      el(22, 324, ['Use the local-link checker:',
        'scripts/check-doc-links.mjs',
        'Input: docs/runbooks/deployment.md'], 'expertise-mono', 34), '', 1100) +
    ea('M510 340H630', 1450) +
    eb(630, 242, 810, 198, 'SCRIPT → A BOUNDED FINDING',
      el(652, 324, ['Example interface: node check-doc-links.mjs <doc>',
        'Illustrative finding: missing docs/rollback.md',
        'Checks local targets; cannot prove command safety.'], 'expertise-mono', 36), 'purple', 1750) +
    svg.enter(ez(et(0, 492, 'Verification status: not executed here.    Human acceptance: pending.    Resources are optional.', 'expertise-body z-text'), 'orange'), 2300));

  const skillInvocation = (s) => ep(s,
    'A maintainer can deliberately invoke refresh-docs, ask a relevant task that discovers docs-review, or explicitly invoke docs-review if selection misses. Both entry points read one maintained guide and produce a sourced proposal. Discovery, output evidence and human acceptance are separate.',
    eb(0, 0, 518, 174, 'PROMPT · PERSON CHOOSES THE COMMAND',
      el(22, 84, ['/refresh-docs', 'Rename API_TIMEOUT to REQUEST_TIMEOUT.'], 'expertise-mono', 36), '', 0) +
    eb(0, 226, 518, 216, 'SKILL · RELEVANT TASK OR EXPLICIT INVOCATION',
      el(22, 310, ['“Rename the config key; keep docs aligned.”',
        'Copilot may discover docs-review.',
        'Alternative: /docs-review + the same task'], 'expertise-body', 40), 'purple', 450) +
    ea('M518 86H584V226H650', 800) + ea('M518 334H584V226', 800) +
    eb(650, 126, 330, 200, 'ONE GUIDE',
      el(672, 210, ['docs/review-guide.md',
        'Maintained review',
        'knowledge.'], 'expertise-body', 36), 'purple', 1150) +
    ea('M980 226H1040', 1500) +
    eb(1040, 126, 400, 200, 'ONE EVIDENCE CONTRACT',
      el(1062, 210, ['Doc path + exact edit',
        'Source + open questions',
        'Maintainer reviews'], 'expertise-body', 36), '', 1800) +
    svg.enter(ez(el(650, 390, ['Missed selection? Inspect loading → invoke explicitly.',
      'Actual doc diff and acceptance stay separate.',
      'Try this with one knowledge task in your own work.'], 'expertise-body', 38), 'orange'), 2200));

  // Part 4: a role applies the existing method; diagrams describe this example only.
  const rp = (s, label, inner) => `${html.head(s)}${svg.scene(1440, 500, label, inner, 'reviewer-picture')}${html.footnote(s.footnote)}`;
  const reviewerContract = (s) => rp(s,
    'Illustrative docs-reviewer.agent.md defines Documentation Reviewer with read, search and edit tools. It explicitly references the existing docs-review skill, requests a documentation patch with citations and open questions, and stops before human acceptance. Tool access is not file-level enforcement.',
    eb(0, 0, 928, 478, '.github/agents/docs-reviewer.agent.md',
      el(22, 82, s.code, 'reviewer-code', 28)) +
    eb(964, 0, 476, 136, 'REMIT → DOCUMENTATION IMPACT',
      el(986, 78, ['A recurring review responsibility.',
        'Shared instructions still apply.'], 'expertise-body', 32), 'purple', 350) +
    eb(964, 156, 476, 136, 'TOOLS → INSPECT AND PROPOSE',
      el(986, 234, ['read + search + edit',
        'No script needs execute here.'], 'expertise-body', 32), '', 800) +
    eb(964, 312, 476, 166, 'DELIVER → STOP FOR HUMAN REVIEW',
      el(986, 390, ['Doc patch + citations + questions',
        'Human acceptance stays pending.'], 'expertise-body', 34), 'orange', 1250));

  const reviewerTrace = (s) => rp(s,
    'Illustrative trace: a person selects Documentation Reviewer for API_TIMEOUT to REQUEST_TIMEOUT. The host supplies shared instructions; the existing runbook pattern does not match docs/configuration.md. The role directs Copilot to read docs-review SKILL.md and its guide, inspect src/config.ts and the affected doc, then propose a cited rename with the default question open.',
    eb(0, 0, 1440, 68, 'PERSON SELECTS DOCUMENTATION REVIEWER',
      et(570, 40, 'Task: API_TIMEOUT → REQUEST_TIMEOUT · documentation impact', 'expertise-body'), 'purple') +
    ea('M230 68V102', 250) +
    eb(0, 102, 470, 218, 'HOST → APPLICABLE INSTRUCTIONS',
      el(22, 174, ['.github/copilot-instructions.md',
        'Shared conventions + deep-doc pointers.'], 'reviewer-path', 32) +
      el(22, 258, ['Runbook applyTo: docs/runbooks/**/*.md',
        'Does not match docs/configuration.md.'], 'reviewer-path', 30), '', 450) +
    ea('M470 210H530', 800) +
    eb(530, 102, 420, 218, 'ROLE → EXPLICIT SKILL READ',
      el(552, 174, ['.github/skills/docs-review/SKILL.md',
        '↓ linked maintained knowledge',
        'docs/review-guide.md',
        'Cite evidence; flag gaps.'], 'reviewer-path', 36), 'purple', 1000) +
    ea('M950 210H1010', 1450) +
    eb(1010, 102, 430, 218, 'COPILOT → INSPECT THE EVIDENCE',
      el(1032, 174, ['src/config.ts',
        'API_TIMEOUT → REQUEST_TIMEOUT',
        'docs/configuration.md',
        'Still says: Set API_TIMEOUT.'], 'reviewer-path', 36), '', 1650) +
    ea('M1225 320V354', 2050) +
    eb(530, 354, 910, 140, 'COPILOT → PROPOSE DOCUMENTATION UPDATE',
      el(552, 428, ['Set REQUEST_TIMEOUT.   ·   Citation: src/config.ts',
        'Open Question: default value?   ·   Human review pending.'], 'expertise-body', 34), 'purple', 2250) +
    svg.enter(el(22, 406, ['Read actions and proposal are illustrative.',
      'Inspect actual loading and the diff.',
      'Explicit skill read → existing method.'], 'reviewer-path', 34), 2600));

  const reviewerJudgment = (s) => rp(s,
    'Authored review evidence from the same Part 3 example: src/config.ts defines timeoutKey as REQUEST_TIMEOUT, while docs/configuration.md still says Set API_TIMEOUT. Documentation Reviewer proposes only Set REQUEST_TIMEOUT and cites src/config.ts, timeoutKey. Whether the documented 30-second default is still correct remains open. Checks are not executed and human review is pending.',
    eb(0, 0, 566, 208, 'CHANGED SOURCE · src/config.ts',
      et(22, 78, 'Same source excerpt as Part 3', 'expertise-body t-muted') +
      el(22, 128, ['const timeoutKey = "REQUEST_TIMEOUT";',
        'Establishes the key; default remains open.'], 'reviewer-path', 40), '', 0) +
    ea('M566 104H630', 400) +
    eb(630, 0, 810, 312, 'COPILOT PROPOSES · docs/configuration.md',
      et(652, 84, 'Stale example: Set API_TIMEOUT.', 'expertise-body') +
      el(652, 148, ['− Set API_TIMEOUT.',
        '+ Set REQUEST_TIMEOUT.'], 'reviewer-diff', 42) +
      et(652, 264, 'Source citation: src/config.ts → timeoutKey', 'reviewer-path'), 'purple', 750) +
    eb(0, 246, 566, 172, 'OPEN QUESTION → KEEP THE GAP VISIBLE',
      el(22, 326, ['Is the documented 30-second default',
        'still correct? No evidence supplied.'], 'expertise-body', 36), 'orange', 1300) +
    svg.enter(el(652, 364, ['Maintainer checks the source and patch scope.',
      'Resolve the default with evidence, or keep it open.'], 'expertise-body', 38), 1700) +
    eb(0, 450, 690, 50, 'VERIFICATION STATUS: CHECKS NOT EXECUTED', '', '', 2100) +
    eb(720, 450, 720, 50, 'HUMAN REVIEW: PENDING', '', 'orange', 2350));

  const reviewerComposition = (s) => rp(s,
    'A person can select Documentation Reviewer directly or deliberately invoke refresh-docs with optional agent: docs-reviewer in a supported prompt host. The selected role configures tools and output, references docs-review SKILL.md, and uses the maintained guide. The host supplies shared and applicable targeted instructions. These choices coexist without requiring all four primitives.',
    eb(0, 0, 446, 156, 'RECURRING ROLE → SELECT THE AGENT',
      el(22, 82, ['Documentation Reviewer',
        'Use its remit, tools, and deliverable.'], 'expertise-body', 34), '', 0) +
    eb(0, 218, 446, 176, 'DELIBERATE REQUEST → /refresh-docs',
      el(22, 286, ['agent: docs-reviewer',
        'Optional prompt frontmatter',
        'A person invokes it',
        'in a supported host.'], 'reviewer-path', 26), '', 350) +
    ea('M446 78H484V210H530', 650) +
    ea('M446 306H484V210', 850) +
    eb(530, 90, 396, 278, 'AGENT → FOCUSED WORKING MODE',
      el(552, 172, ['Documentation Reviewer',
        'Read · search · propose doc edits',
        'Patch + citations + open questions',
        'Stop for human acceptance'], 'reviewer-path', 48), 'purple', 1100) +
    ea('M926 210H990', 1450) +
    eb(990, 90, 450, 278, 'SKILL → EXISTING EXPERTISE',
      el(1012, 172, ['Explicit role reference:',
        'docs-review/SKILL.md',
        '↓ maintained method and resources',
        'docs/review-guide.md'], 'reviewer-path', 48), 'purple', 1700) +
    ea('M728 398V368', 2100) +
    eb(0, 398, 1440, 96, 'HOST → SHARED AND APPLICABLE TARGETED INSTRUCTIONS',
      et(22, 476, 'Team conventions and deep-doc pointers apply normally. Choose only the pieces this task needs.', 'expertise-body'), '', 2350));

  window.SCENES = {
    'reviewer-contract': reviewerContract,
    'reviewer-trace': reviewerTrace,
    'reviewer-judgment': reviewerJudgment,
    'reviewer-composition': reviewerComposition,
    'prompt-capture': promptCapture,
    'prompt-contract': promptContract,
    'prompt-reuse': promptReuse,
    'prompt-share': promptShare,
    'skill-discovery': skillDiscovery,
    'skill-contract': skillContract,
    'skill-knowledge': skillKnowledge,
    'skill-resources': skillResources,
    'skill-invocation': skillInvocation,
    'know-how-hero': knowHowHero,
    'working-layers': workingLayers,
    'primitive-map': primitiveMap,
    artifact,
    'instruction-repo': instructionRepo,
    'instruction-reuse': instructionReuse,
    'instruction-sources': instructionSources,
    'instruction-context': instructionContext,
    'instruction-examples': instructionExamples,
    'instruction-maintenance': instructionMaintenance,
    'instruction-locations': instructionLocations,
    'instruction-selectors': instructionSelectors,
    'instruction-trial': instructionTrial,
    'instruction-troubleshoot': instructionTroubleshoot
  };
})();
