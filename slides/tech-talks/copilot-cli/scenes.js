/*
  GitHub Copilot CLI — deck-only title/closing and locality visuals.
  Shared frames and patterns provide the teaching layouts.
*/
(() => {
  const { svg } = window.Kit;

  // Distance as typography: four pairs start at the frame edges and close
  // onto one prompt. The shortened gap is the whole argument.
  const withinReach = (s) => {
    const C = 720;
    const gap = 46;
    const pairs = [
      ['WORKER', 'WORK'],
      ['INTELLIGENCE', 'DATA'],
      ['WORKFLOW', 'RUNNING SYSTEM'],
      ['NOW', 'LATER']
    ];
    const rows = pairs.map(([a, b], i) => {
      const y = 92 + i * 100;
      const at = 300 + i * 260;
      return svg.g(svg.path(`M60 ${y - 17}H1380`, { cls: 'reach-span' }), { cls: 'reach-fade', at: at + 200 }) +
        svg.glide(svg.text(C - gap, y, a, { cls: 'reach-word', anchor: 'end' }), [-520, 0], at) +
        svg.glide(svg.text(C + gap, y, b, { cls: 'reach-word reach-near', anchor: 'start' }), [520, 0], at);
    }).join('');
    const caret = svg.g(svg.rect(C - 7, 38, 14, 372, { cls: 'reach-caret', r: 3 }), { cls: 'reach-blink' });
    const [name, promise] = String(s.title).split(':').map(v => v.trim());
    const tail = s.prompt
      ? svg.text(C, 520, s.prompt, { cls: 'reach-question' })
      : svg.enter(svg.text(C, 520, s.subtitle, { cls: 'reach-thesis' }), 1700);
    return `<div class="reach-heading"><h1>${window.Kit.esc(name)}</h1>
      <p>${window.Kit.esc(promise || s.subtitle)}</p></div>` +
      svg.scene(1440, 560,
        'Worker and work, intelligence and data, workflow and running system, now and later: each pair closes onto one Copilot prompt.',
        rows + caret +
        svg.enter(svg.text(C, 462, '❯ copilot', { cls: 'reach-prompt' }), 1500) +
        tail, 'within-reach');
  };

  // Scale contrast: the corpus stays left, each tool answer chooses the next
  // question, and only a short cited finding reaches the operator.
  const logProof = (s) => {
    const { html, esc } = window.Kit;
    const steps = s.steps.map((st, i) => `<div class="lp-step m-in" style="--at:${400 + i * 650}ms">
        <pre class="lp-cmd">$ ${esc(st.cmd)}</pre>
        <pre class="lp-out">${esc(st.out.join('\n'))}</pre>
        <p class="lp-think">Copilot › ${esc(st.think)}</p></div>`).join('');
    const texture = Array.from({ length: 14 }, (_, i) =>
      `2026-11-02T${String(9 + (i % 3)).padStart(2, '0')}:${String(11 + i * 3).padStart(2, '0')}:0${i % 10}Z sshd auth=${i % 4 ? 'fail' : 'ok'}`).join('\n');
    return `${html.head(s)}<div class="log-proof">
      <section class="lp-corpus"><h3>STAYS ON THE HOST</h3>
        <strong>${esc(s.corpus.size)}</strong><span>${esc(s.corpus.what)}</span>
        <pre aria-hidden="true">${texture}</pre>
        <p>Tools read it here. The raw corpus never enters model context.</p></section>
      <section class="lp-steps"><h3>COPILOT ASKS THE DATA · EACH ANSWER PICKS THE NEXT QUESTION</h3>${steps}</section>
      <section class="lp-finding m-in" style="--at:2500ms"><h3>REACHES YOU</h3>
        ${s.finding.map(([k, v]) => `<p><b>${esc(k)}</b> ${esc(v)}</p>`).join('')}</section>
      </div>${html.footnote(s.footnote)}`;
  };

  // One approval, four consequences: the sandbox decides what spawned
  // processes reach. Settled frame shows every outcome.
  const sandboxTree = (s) => {
    const H = 500;
    const rowY = [62, 178, 294, 410];
    const root = svg.g(svg.enter(
      svg.rect(0, 186, 300, 128, { cls: 'zone', r: 18 }) +
      svg.text(150, 240, s.root.cmd, { cls: 't-lg t-mono z-text' }) +
      svg.text(150, 280, s.root.tag, { cls: 't-sm' }), 100), { cls: 'z-orange' });
    const rows = s.children.map((c, i) => {
      const y = rowY[i];
      const at = 700 + i * 420;
      const wire = `M300 250C350 250 350 ${y} 400 ${y}`;
      return svg.g(svg.trace(wire, { cls: 'wire link', at: at - 300, dur: 400 }), { cls: 'z-orange' }) +
        svg.enter(
          svg.rect(400, y - 44, 610, 88, { cls: 'box', r: 14 }) +
          svg.text(424, y - 10, c.actor, { cls: 't-xs', anchor: 'start' }) +
          svg.text(424, y + 24, c.cmd, { cls: 't-md t-mono', anchor: 'start' }), at) +
        svg.g(svg.pop(
          svg.path(`M1010 ${y}H1050`, { cls: 'wire' }) +
          svg.rect(1050, y - 44, 390, 88, { cls: 'zone', r: 14 }) +
          svg.text(1074, y - 6, c.outcome, { cls: 't-lg z-text', anchor: 'start' }) +
          svg.text(1074, y + 26, c.reason, { cls: 't-xs', anchor: 'start' }), at + 220), { cls: `z-${c.z}` });
    }).join('');
    return `${window.Kit.html.head(s)}${svg.scene(1440, H,
      'Approving npm test lets its child processes run; the sandbox allows the repo write and denies the SSH key read, the unknown network destination, and the GitHub credential.',
      root + rows + svg.enter(svg.text(720, 492, s.result, { cls: 't-md sandbox-result' }), 2600),
      'sandbox-tree')}${window.Kit.html.footnote(s.footnote)}`;
  };

  // Typed once, then time passes: quiet /every checks, then the /after report.
  const scheduleTimeline = (s) => {
    const { html, esc } = window.Kit;
    const x0 = 60, x1 = 1380, X = (m) => x0 + (x1 - x0) * m / 45;
    const ticks = [5, 10, 15, 20, 25, 30, 35, 40].map((m, i) => svg.pop(
      svg.circle(X(m), 92, 9, { cls: 'sched-tick' }) +
      svg.text(X(m), 136, `+${m}m`, { cls: 't-xs' }), 700 + i * 160)).join('');
    const line = svg.g(svg.trace(`M${x0} 92H${x1}`, { cls: 'wire link', at: 400, dur: 1600 }), { cls: 'z-purple' });
    const start = svg.g(svg.enter(svg.circle(x0, 92, 14, { cls: 'sched-mark' }) +
      svg.text(x0, 42, s.start, { cls: 't-sm z-text', anchor: 'start' }), 200), { cls: 'z-orange' });
    const end = svg.g(svg.pop(svg.circle(x1, 92, 16, { cls: 'sched-mark' }) +
      svg.text(x1, 42, s.end, { cls: 't-sm z-text', anchor: 'end' }), 2100), { cls: 'z-green' });
    const band = svg.enter(svg.text(720, 42, s.band, { cls: 't-sm sched-band' }), 900);
    const timeline = svg.scene(1440, 150,
      'Timeline: the fix ships at 10:00; /every checks quietly every 5 minutes while the developer works elsewhere; /after fires at 10:45 and reports.',
      line + ticks + start + end + band, 'sched-line');
    return `${html.head(s)}<div class="sched">
      <section class="sched-cmds"><h3>${esc(s.typedLabel)}</h3><pre>${s.commands.map(esc).join('\n')}</pre></section>
      ${timeline}
      <section class="sched-report m-in" style="--at:2300ms"><h3>${esc(s.reportLabel)}</h3>
        <pre>${s.report.map(esc).join('\n')}</pre></section>
    </div>${html.footnote(s.footnote)}`;
  };

  const chronicleImprove = (s) => {
    const { html, esc } = window.Kit;
    const recs = s.recs.map((r, i) => `<div class="ci-rec ${r.on ? 'on' : 'off'} m-in" style="--at:${300 + i * 300}ms">
        <span class="ci-box">${r.on ? '✓' : ''}</span>
        <div><p class="ci-found">${esc(r.found)}</p><p class="ci-fix">→ ${esc(r.fix)}</p></div></div>`).join('');
    return `${html.head(s)}<div class="chronicle-improve">
      <section class="ci-picker"><h3>${esc(s.pickerLabel)}</h3>${recs}<p class="ci-keys">${esc(s.keys)}</p></section>
      <section class="ci-diff m-in" style="--at:1700ms"><h3>${esc(s.file)}</h3>
        <pre>${s.diff.map(l => `<span class="${l.startsWith('+') ? 'add' : ''}">${esc(l)}</span>`).join('\n')}</pre>
        <p>${esc(s.after)}</p></section>
    </div>${html.footnote(s.footnote)}`;
  };

  const rewindTimeline = (s) => {
    const { html, esc } = window.Kit;
    const turns = s.turns.map((t, i) => `<div class="rw-turn ${t.state} m-in" style="--at:${200 + i * 260}ms">
        <span class="rw-n">${i + 1}</span>
        <div><p class="rw-ask">${esc(t.ask)}</p><p class="rw-did">${esc(t.did)}</p></div>
        ${t.state === 'target' ? `<span class="rw-pin">${esc(s.pin)}</span>` : ''}</div>`).join('');
    return `${html.head(s)}<div class="rewind">
      <section class="rw-session"><h3>${esc(s.sessionLabel)}</h3>${turns}</section>
      <section class="rw-result m-in" style="--at:1500ms">
        <pre class="rw-cmd">${s.command.map(esc).join('\n')}</pre>
        ${s.result.map(([k, v]) => `<p><b>${esc(k)}</b>${esc(v)}</p>`).join('')}
        <p class="rw-aside">${esc(s.aside)}</p></section>
    </div>${html.footnote(s.footnote)}`;
  };

  const remotePhone = (s) => {
    const { html, esc } = window.Kit;
    const term = s.terminal.map(([cls, text]) => `<span class="${cls}">${esc(text)}</span>`).join('\n');
    const chat = s.phone.map((m, i) => m.kind === 'ask'
      ? `<div class="rp-ask m-in" style="--at:${900 + i * 350}ms"><b>${esc(m.title)}</b><code>${esc(m.cmd)}</code>
          <div class="rp-btns"><span>Deny</span><span class="on">Allow</span></div></div>`
      : `<p class="rp-msg ${m.kind} m-in" style="--at:${900 + i * 350}ms">${esc(m.text)}</p>`).join('');
    return `${html.head(s)}<div class="remote-phone">
      <section class="rp-term"><h3>${esc(s.termLabel)}</h3><pre>${term}</pre>
        <p class="rp-where">${esc(s.hostNote)}</p></section>
      <div class="rp-gap m-in" style="--at:600ms"><span>⇄</span><p>${esc(s.gap)}</p></div>
      <section class="rp-phone"><div class="rp-bar">${esc(s.phoneLabel)}</div>${chat}
        <p class="rp-where">${esc(s.phoneNote)}</p></section>
    </div>${html.footnote(s.footnote)}`;
  };

  const remoteReturn = (s) => {
    const { html, esc } = window.Kit;
    const lines = s.lines.map(([src, text], i) => `<div class="rr-line ${src} m-in" style="--at:${200 + i * 220}ms">
        <span class="rr-src">${esc(s.who[src])}</span><code>${esc(text)}</code></div>`).join('');
    return `${html.head(s)}<div class="remote-return">
      <section class="rr-term"><h3>${esc(s.termLabel)}</h3>${lines}</section>
      <section class="rr-kept m-in" style="--at:1700ms"><h3>${esc(s.keptLabel)}</h3>
        ${s.kept.map(k => `<p>✓ ${esc(k)}</p>`).join('')}</section>
    </div>${html.footnote(s.footnote)}`;
  };

  const rubberDuck = (s) => {
    const { html, esc } = window.Kit;
    const items = s.critique.map((c, i) => `<div class="rd-item ${c.sev} m-in" style="--at:${700 + i * 300}ms">
        <span class="rd-sev">${esc(c.label)}</span><p>${esc(c.text)}</p><p class="rd-fix">→ ${esc(c.fix)}</p></div>`).join('');
    return `${html.head(s)}<div class="rubber-duck">
      <section class="rd-ask"><h3>${esc(s.askLabel)}</h3><pre>${esc(s.ask)}</pre>
        <ul>${s.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul></section>
      <section class="rd-critique"><h3>🦆 RUBBER DUCK · CRITIQUE</h3>${items}</section>
    </div><p class="rd-summary m-in" style="--at:2000ms">${esc(s.summary)}</p>${html.footnote(s.footnote)}`;
  };

  const cloudRelay = (s) => {
    const { html, esc } = window.Kit;
    const cards = s.stops.map((st, i) => `<section class="cr-stop m-in" style="--at:${200 + i * 600}ms">
        <h3><span>${esc(st.time)}</span>${esc(st.device)}</h3>
        ${st.lines.map(([k, v]) => `<p class="cr-${k}">${esc(v)}</p>`).join('')}</section>`).join('<div class="cr-arrow">→</div>');
    const vs = s.compare.map(([h, t, z]) => `<div class="cr-cmp z-${z}"><b>${esc(h)}</b><span>${esc(t)}</span></div>`).join('');
    return `${html.head(s)}<div class="cloud-relay"><div class="cr-row">${cards}</div>
      <div class="cr-compare m-in" style="--at:1900ms">${vs}</div></div>${html.footnote(s.footnote)}`;
  };

  const workflowCode = (s) => {
    const { html, esc } = window.Kit;
    const code = s.code.map(([g, line]) => `<span class="wc-line wc-g${g}">${esc(line) || ' '}</span>`).join('');
    const notes = s.callouts.map(([g, title, text], i) =>
      `<section class="wc-g${g} m-in" style="--at:${300 + i * 350}ms"><h4>${esc(title)}</h4><p>${esc(text)}</p></section>`).join('');
    return `${html.head(s)}<div class="workflow-code">
      <div class="wc-file"><h3>${esc(s.path)}</h3><pre>${code}</pre></div>
      <div class="wc-notes">${notes}</div></div>${html.footnote(s.footnote)}`;
  };

  const workflowLesson = (s) => {
    const esc = window.Kit.esc;
    return `${window.Kit.html.head(s)}
      <div class="workflow-lesson ${s.id}">
        <div class="workflow-main">
          <h3>${esc(s.label)}</h3>
          ${s.lead ? `<h4>${esc(s.lead)}</h4><p>${esc(s.detail)}</p>` : ''}
          ${s.command ? `<pre>${esc(s.command.join('\n'))}</pre>` : ''}
          ${s.report ? `<pre class="workflow-result">${esc(s.report.join('\n'))}</pre>` : ''}
        </div>
        <div class="workflow-steps">${s.steps.map((step, i) =>
          `<section class="m-in" style="--at:${250 + i * 300}ms"><h4>${esc(step.title)}</h4><p>${esc(step.text)}</p></section>`
        ).join('')}</div>
      </div>
      <p class="workflow-takeaway">${esc(s.takeaway)}</p>
      ${window.Kit.html.footnote(s.footnote)}`;
  };

  const distanceActions = (s) => {
    const { html, esc } = window.Kit;
    return `${html.head(s)}<div class="distance-actions">${s.horizons.map((h, i) =>
      `<section class="m-in" style="--at:${250 + 180 * i}ms"><h3>${esc(h.label)}</h3>
        <p>${esc(h.items[0])}</p><p><b>Check:</b> ${esc(h.items[1])}</p></section>`).join('')}</div>
      <p class="workflow-takeaway">${esc(s.takeaway)}</p>`;
  };

  const dockerInvestigation = (s) => {
    const body = s.checks.map((check, i) => {
      const y = i * 165;
      return svg.g(svg.enter(
        svg.rect(0, y, 1440, 149, { cls: 'zone', r: 16 }) +
        svg.text(24, y + 34, check.title, { cls: 't-sm z-text', anchor: 'start' }) +
        svg.text(24, y + 73, check.command, { cls: 't-lg t-mono', anchor: 'start' }) +
        svg.text(24, y + 117, check.output, { cls: 't-sm t-mono', anchor: 'start' }) +
        svg.lines(810, y + 73, check.inference, { cls: 't-sm', anchor: 'start', max: 42, lh: 30 }),
        300 + i * 1000), { cls: 'z-local' });
    }).join('');
    const next = svg.g(svg.enter(
      svg.rect(0, 340, 1440, 114, { cls: 'zone', r: 16 }) +
      svg.text(24, 377, 'NEXT TOOL REQUEST · PROPOSED', { cls: 't-xs z-text', anchor: 'start' }) +
      svg.text(24, 423, s.nextCommand, { cls: 't-lg t-mono', anchor: 'start' }) +
      svg.lines(810, 386, s.nextDecision, { cls: 't-sm', anchor: 'start', max: 42, lh: 30 }),
      2400), { cls: 'z-orange' });
    return `${window.Kit.html.head(s)}${svg.scene(1440, 470,
      'Representative Copilot tool trace: read Docker logs, resolve the published port, then propose an HTTP probe on port 5001. No successful repair is claimed.',
      body + next, 'docker-investigation')}${window.Kit.html.footnote(s.footnote)}`;
  };

  const ciExplanation = (s) => {
    const esc = window.Kit.esc;
    return `${window.Kit.html.head(s)}
      <div class="ci-explanation">
        <div class="ci-code"><h3>GitHub Actions · workflow steps</h3><pre>${esc(s.workflow.join('\n'))}</pre></div>
        <div class="ci-evidence">
          <div class="ci-log"><h3>TEST RESULT · FAILED</h3><pre>${esc(s.failureEvidence.join('\n'))}</pre></div>
          <div class="ci-why"><h3>COPILOT · PROPOSED WHY</h3><pre>${esc(s.explanation.join('\n'))}</pre></div>
        </div>
      </div>${window.Kit.html.footnote(s.footnote)}`;
  };

  const prHandoff = (s) => {
    const esc = window.Kit.esc;
    return `${window.Kit.html.head(s)}
      <div class="pr-handoff">
        <div class="handoff-request m-in" style="--at:200ms">
          <h3>NOW · YOUR TERMINAL</h3>
          <pre>❯ ${esc(s.request)}</pre>
          <p>One endpoint. Tests. Draft PR.<br>No merge authority.</p>
        </div>
        <div class="handoff-gap m-in" style="--at:900ms">
          <span aria-hidden="true">→</span>
          <h3>MEANWHILE</h3>
          <p>Cloud agent works independently.</p>
          <p>Your terminal<br>stays available.</p>
        </div>
        <div class="handoff-pr m-in" style="--at:1800ms">
          <h3>LATER · REPRESENTATIVE RETURNED ARTIFACT</h3>
          <div class="handoff-pr-title"><span>Draft</span><h4>${esc(s.prTitle)}</h4></div>
          <p class="handoff-files">Changed files · orders.js · orders.test.js</p>
          <pre class="handoff-diff">${esc(s.diff.join('\n'))}</pre>
          <p class="handoff-evidence">${esc(s.evidence)}</p>
          <div class="handoff-review">MAINTAINER DECIDES<br><strong>Review · Request changes · Merge</strong></div>
        </div>
      </div>${window.Kit.html.footnote(s.footnote)}`;
  };

  window.SCENES = {
    'pr-handoff': prHandoff,
    'ci-explanation': ciExplanation,
    'docker-investigation': dockerInvestigation,
    'within-reach': withinReach,
    'log-proof': logProof,
    'distance-actions': distanceActions,
    'workflow-lesson': workflowLesson,
    'workflow-code': workflowCode,
    'sandbox-tree': sandboxTree,
    'schedule-timeline': scheduleTimeline,
    'chronicle-improve': chronicleImprove,
    'rewind-timeline': rewindTimeline,
    'remote-phone': remotePhone,
    'remote-return': remoteReturn,
    'rubber-duck': rubberDuck,
    'cloud-relay': cloudRelay
  };
})();
