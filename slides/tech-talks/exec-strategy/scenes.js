/*
  Choosing the AI Platform for Your SDLC — deck-only scenes and the title visual.
  Standard slides come from native/frames.js and reusable layouts from native/patterns.js.
  Motion plays once on entry; the settled state is the final frame.
*/
(() => {
  const { svg, html, esc, measure, wrap } = window.Kit;
  const W = 1440;

  /* Full-width bar that closes a scene with its claim. */
  const bar = (y, text, { z = "purple", icon = "", at = 0, h = 68 } = {}) =>
    svg.g(
      svg.pop(
        svg.g(
          svg.rect(0, y, W, h, { cls: "zone", r: 16 }) +
            svg.text(
              W / 2,
              y + h / 2 + 8,
              `${icon ? `${icon}  ` : ""}${text}`,
              { cls: "bar-text" },
            ),
          {},
        ),
        at,
      ),
      { cls: `z-${z}` },
    );

  /* Title visual: one pull request gathers evidence from three agents, then a named human decides. */
  const prEvidence = () => {
    const S = 760;
    const C = S / 2;
    const steps = [
      { y: 196, label: "Cloud agent drafts the PR", z: "purple" },
      { y: 292, label: "Code review comments", z: "github" },
      { y: 388, label: "Code Quality checks rules", z: "green" },
    ];
    const gy = 548;
    const gr = 62;
    const outs = [
      { x: 130, label: "Merge", z: "green" },
      { x: C, label: "Rework", z: "accent" },
      { x: 630, label: "Close", z: "orange" },
    ];
    const spine = `M${C} 150L${C} ${gy - gr}`;
    let body = svg.trace(spine, { cls: "wire", at: 300, dur: 1200 });
    body += svg.pop(
      svg.g(
        svg.rect(C - 190, 40, 380, 110, { cls: "box task", r: 20 }) +
          svg.text(C, 80, "ONE PULL REQUEST", { cls: "t-xs t-mono" }) +
          svg.text(C, 122, "issue to reviewed merge", { cls: "t-lg" }),
        { cls: "z-purple" },
      ),
      100,
    );
    steps.forEach((st, i) => {
      body += svg.g(
        svg.enter(
          svg.rect(C - 220, st.y, 440, 64, { cls: "box", r: 14 }) +
            svg.text(C, st.y + 40, st.label, { cls: "z-text" }),
          500 + 320 * i,
        ),
        { cls: `z-${st.z}` },
      );
    });
    body += svg.pop(
      svg.g(
        svg.path(
          `M${C} ${gy - gr}L${C + gr} ${gy}L${C} ${gy + gr}L${C - gr} ${gy}Z`,
          { cls: "zone" },
        ) +
          svg.text(C, gy - 4, "Named", { cls: "z-text t-sm" }) +
          svg.text(C, gy + 20, "human", { cls: "z-text t-sm" }),
        { cls: "z-orange" },
      ),
      1500,
    );
    outs.forEach((o, i) => {
      const d = `M${C} ${gy + gr}C${C} ${gy + gr + 40} ${o.x} ${gy + gr + 20} ${o.x} 676`;
      const w = Math.round(measure(o.label, 20) + 40);
      body += svg.g(
        svg.trace(d, { cls: "wire z-stroke", at: 1800 + 150 * i, dur: 400 }),
        { cls: `z-${o.z}` },
      );
      body += svg.pop(
        svg.chip(o.x - w / 2, 676, o.label, {
          z: o.z,
          size: 20,
          h: 48,
          pad: 20,
        }).markup,
        2100 + 150 * i,
      );
    });
    body += svg.ride(spine, { z: "purple", at: 2600, dur: 2600, r: 7 });
    return svg.scene(
      S,
      S,
      "One pull request gathers evidence as the cloud agent drafts it, Copilot code review comments on it, and Code Quality checks its rules; then a named human decides to merge, ask for rework, or close it.",
      body,
      "title-map",
    );
  };

  /* Core question: the question and thesis on the left; the system around the model on the right.
     Data: subtitle, highlight, audience, lenses[4] (top, right, bottom, left), record[4] (diagonals). */
  const questionSystem = (s) => {
    const S = 640;
    const C = S / 2;
    const lensR = 196;
    const recR = 236;
    const ring = `M${C} ${C - lensR}A${lensR} ${lensR} 0 1 1 ${C - 0.1} ${C - lensR}`;
    let body = svg.enter(
      svg.g(svg.circle(C, C, 306, { cls: "zone" }), { cls: "z-github" }),
      100,
    );
    body += svg.enter(
      svg.text(C, 52, "YOUR SYSTEM OF RECORD", {
        cls: "t-xs t-mono q-rec-label",
      }),
      250,
    );
    s.record.forEach((r, i) => {
      const a = ((-135 + 90 * i) * Math.PI) / 180;
      const x = C + recR * Math.cos(a);
      const y = C + recR * Math.sin(a);
      const w = Math.round(measure(r, 17) + 28);
      body += svg.pop(
        svg.chip(x - w / 2, y - 16, r, {
          z: "github",
          size: 17,
          h: 32,
          pad: 14,
        }).markup,
        400 + 120 * i,
      );
    });
    body += svg.trace(ring, { cls: "ring", at: 700, dur: 1200 });
    body += svg.pop(
      svg.g(
        svg.circle(C, C, 92, { cls: "box q-core" }) +
          svg.text(C, C + 4, "Model", { cls: "t-lg" }) +
          svg.text(C, C + 34, "changes monthly", { cls: "t-xs" }),
        {},
      ),
      500,
    );
    const spots = [
      [C, C - lensR],
      [C + lensR, C],
      [C, C + lensR],
      [C - lensR, C],
    ];
    s.lenses.forEach((l, i) => {
      const [x, y] = spots[i];
      const w = Math.round(measure(l, 22) + 44);
      body += svg.pop(
        svg.chip(x - w / 2, y - 23, l, {
          z: "purple",
          size: 22,
          h: 46,
          pad: 22,
          r: 12,
        }).markup,
        1300 + 200 * i,
      );
    });
    body += svg.ride(ring, { z: "purple", at: 2300, dur: 3600, r: 6 });
    const label = `${s.title} ${s.subtitle} ${s.highlight} The model at the center changes monthly; four questions surround it: ${s.lenses.join(", ")}; and the organization's system of record surrounds everything: ${s.record.join(", ")}.`;
    return `${html.pill(s)}
      <div class="q-split">
        <div class="q-copy">
          <h2 class="question m-in">“${esc(s.title)}”</h2>
          <p class="subtitle m-in" style="--at:200ms">${esc(s.subtitle)}</p>
          <p class="q-highlight m-in" style="--at:2400ms">${esc(s.highlight)}</p>
          <p class="q-for m-in" style="--at:2700ms">${esc(s.audience)}</p>
        </div>
        ${svg.scene(S, S, label, body, "q-system")}
      </div>`;
  };

  /* Four questions over a trust floor: a 2x2 question grid, then the contractual commitments under all four.
     Data: cards[{icon,title,description}], trustLabel, trust[{icon,text}]. */
  const questionsTrust = (s) => {
    const gap = 24;
    const cw = (W - gap) / 2;
    const ch = 164;
    let body = s.cards.map((c, i) => {
      const x = (i % 2) * (cw + gap);
      const y = Math.floor(i / 2) * (ch + gap);
      const at = 300 + 220 * i;
      const ccx = x + cw - 50;
      const ccy = y + 48;
      return svg.enter(
        svg.rect(x, y, cw, ch, { cls: "box", r: 20 }) +
          svg.text(x + 30, y + 62, c.icon, { cls: "t-emoji score-icon", anchor: "start" }) +
          svg.text(x + 98, y + 58, c.title, { cls: "t-lg", anchor: "start" }) +
          svg.lines(x + 30, y + 108, c.description, { cls: "t-muted score-desc", anchor: "start", max: 50, lh: 32 }),
        at,
      ) +
        svg.g(
          svg.pop(svg.circle(ccx, ccy, 20, { cls: "stop" }), at + 300) +
            svg.trace(`M${ccx - 9} ${ccy}L${ccx - 3} ${ccy + 7}L${ccx + 10} ${ccy - 7}`, { cls: "check", at: at + 500, dur: 300 }),
          { cls: "z-green" },
        );
    }).join("");
    const by = 2 * ch + gap + 28;
    const bh = 118;
    const pad = 24;
    const n = s.trust.length;
    const tw = (W - 2 * pad - (n - 1) * 16) / n;
    body += svg.g(svg.enter(
      svg.rect(0, by, W, bh, { cls: "zone", r: 18 }) +
        svg.text(pad, by + 32, s.trustLabel.toUpperCase(), { cls: "t-xs t-mono trust-label", anchor: "start" }) +
        s.trust.map((t, i) => {
          const x = pad + i * (tw + 16);
          return svg.rect(x, by + 48, tw, 52, { cls: "box", r: 12 }) +
            svg.text(x + 18, by + 84, t.icon, { cls: "trust-icon", anchor: "start" }) +
            svg.text(x + 58, by + 82, t.text, { cls: "trust-text", anchor: "start" });
        }).join(""),
      1400,
    ), { cls: "z-orange" });
    const label = `${s.title}: ${s.cards.map((c) => `${c.title}. ${c.description}`).join(" ")} ${s.trustLabel}: ${s.trust.map((t) => t.text).join("; ")}.`;
    return `${html.head(s)}${svg.scene(W, by + bh, label, body, "questions-trust")}`;
  };

  /* Ladder: five maturity levels as a staircase with one hero level, then the hero level's pillars.
     Data: levels[{n,name,note,hero?}], heroTag, pillarsLabel, cols[{icon,title,z,text}]. */
  const ladder = (s) => {
    const gap = 14;
    const n = s.levels.length;
    const sw = (W - gap * (n - 1)) / n;
    const base = 196;
    const rise = 22;
    let body = "";
    let heroX = 0;
    s.levels.forEach((l, i) => {
      const x = i * (sw + gap);
      const h = 96 + rise * i;
      const y = base - h;
      const at = 300 + 180 * i;
      if (l.hero) heroX = x + sw / 2;
      body += svg.g(svg.enter(
        svg.rect(x, y, sw, h, { cls: l.hero ? "zone" : "box", r: 14 }) +
          svg.text(x + 22, y + 34, `${l.n} · ${l.name.toUpperCase()}`, { cls: "t-xs t-mono lvl-k", anchor: "start" }) +
          svg.text(x + 22, y + 68, l.note, { cls: "lvl-note", anchor: "start" }),
        at,
      ), { cls: l.hero ? "z-purple" : i < s.levels.findIndex((v) => v.hero) ? "z-green" : "z-accent lvl-later" });
    });
    const hi = s.levels.findIndex((v) => v.hero);
    const hy = base - (96 + rise * hi);
    const tw = Math.round(measure(s.heroTag, 18) + 40);
    body += svg.pop(svg.chip(heroX - tw / 2, hy - 22, s.heroTag, { z: "purple", size: 18, h: 36, pad: 20 }).markup, 1400);
    const py = base + 54;
    const cg = 24;
    const cw = (W - cg * 2) / 3;
    const ch = 168;
    body += svg.trace(`M${heroX} ${base + 4}L${heroX} ${py - 30}`, { cls: "wire link", at: 1500, dur: 300 });
    body += svg.enter(svg.text(heroX, py - 12, s.pillarsLabel.toUpperCase(), { cls: "t-xs t-mono" }), 1600);
    s.cols.forEach((c, i) => {
      const x = i * (cw + cg);
      const y = py + 8;
      const lines = wrap(c.text, 40);
      body += svg.g(svg.enter(
        svg.rect(x, y, cw, ch, { cls: "box", r: 18 }) +
          svg.rect(x, y, cw, 6, { cls: "card-top", r: 3 }) +
          svg.text(x + 26, y + 52, c.icon, { cls: "t-emoji", anchor: "start" }) +
          svg.text(x + 78, y + 50, c.title, { cls: "t-lg z-text", anchor: "start" }) +
          lines.map((ln, k) => svg.text(x + 26, y + 94 + k * 29, ln, { cls: "col-v", anchor: "start" })).join(""),
        1700 + 200 * i,
      ), { cls: `z-${c.z}` });
    });
    const H = py + 8 + ch;
    const label = `${s.title}. ${s.levels.map((l) => `${l.n} ${l.name}: ${l.note}`).join("; ")}. ${s.heroTag}: ${s.cols.map((c) => `${c.title}, ${c.text}`).join("; ")}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, "ladder")}`;
  };

  /* Quad: four boundary cards in a 2x2 grid, each with an edge colour and a tag.
     Data: cards[{icon,title,tag,z,text}]. */
  const quad = (s) => {
    const gap = 26;
    const cw = (W - gap) / 2;
    const ch = 196;
    const body = s.cards.map((c, i) => {
      const x = (i % 2) * (cw + gap);
      const y = Math.floor(i / 2) * (ch + gap);
      const lines = wrap(c.text, 48);
      const tw = Math.round(measure(c.tag, 16) + 32);
      return svg.g(svg.enter(
        svg.rect(x, y, cw, ch, { cls: "box", r: 20 }) +
          svg.rect(x, y, 8, ch, { cls: "card-edge", r: 4 }) +
          svg.text(x + 36, y + 62, c.icon, { cls: "t-emoji", anchor: "start" }) +
          svg.text(x + 90, y + 58, c.title, { cls: "t-lg z-text", anchor: "start" }) +
          svg.chip(x + cw - 28 - tw, y + 30, c.tag, { z: c.z, size: 16, h: 32, pad: 16 }).markup +
          lines.map((ln, k) => svg.text(x + 36, y + 112 + k * 32, ln, { cls: "quad-text", anchor: "start" })).join(""),
        300 + 240 * i,
      ), { cls: `z-${c.z}` });
    }).join("");
    const label = `${s.title}: ${s.cards.map((c) => `${c.title} (${c.tag}): ${c.text}`).join(" ")}`;
    return `${html.head(s)}${svg.scene(W, 2 * ch + gap, label, body, "quad")}`;
  };

  /* Columns: three or four cards, each with labelled rows, closed by a claim bar.
     Data: cols[{icon,title,who?,z,rows[{k,v}]}], bar?{icon,text,z}. */
  const columns = (s) => {
    const n = s.cols.length;
    const gap = 28;
    const cw = (W - gap * (n - 1)) / n;
    const tMax = Math.floor((cw - 56) / 16);
    const vMax = Math.floor((cw - 56) / 11.6);
    const lay = s.cols.map((c) => {
      const title = wrap(c.title, tMax);
      let y = 112 + (title.length - 1) * 34;
      const parts = [];
      if (c.who) {
        y += 38;
        const who = wrap(c.who, Math.floor((cw - 56) / 10.4));
        parts.push({ type: "who", y, lines: who });
        y += (who.length - 1) * 25;
      }
      c.rows.forEach((r) => {
        y += 48;
        parts.push({ type: "k", y, text: r.k });
        y += 32;
        const v = wrap(r.v, vMax);
        parts.push({ type: "v", y, lines: v });
        y += (v.length - 1) * 29;
      });
      return { title, parts, end: y + 34 };
    });
    const H = Math.max(...lay.map((l) => l.end));
    let body = "";
    s.cols.forEach((c, i) => {
      const x = i * (cw + gap);
      const at = 300 + 260 * i;
      const L = lay[i];
      const inner =
        svg.rect(x, 0, cw, H, { cls: "box", r: 20 }) +
        svg.rect(x, 0, cw, 6, { cls: "card-top", r: 3 }) +
        svg.text(x + 28, 58, c.icon, { cls: "t-emoji", anchor: "start" }) +
        L.title
          .map((l, k) =>
            svg.text(x + 28, 112 + k * 34, l, {
              cls: "t-lg z-text",
              anchor: "start",
            }),
          )
          .join("") +
        L.parts
          .map((p) => {
            if (p.type === "who")
              return p.lines
                .map((l, k) =>
                  svg.text(x + 28, p.y + k * 25, l, {
                    cls: "col-who",
                    anchor: "start",
                  }),
                )
                .join("");
            if (p.type === "k")
              return svg.text(x + 28, p.y, p.text.toUpperCase(), {
                cls: "t-xs t-mono col-k",
                anchor: "start",
              });
            return p.lines
              .map((l, k) =>
                svg.text(x + 28, p.y + k * 29, l, {
                  cls: "col-v",
                  anchor: "start",
                }),
              )
              .join("");
          })
          .join("");
      body += svg.g(svg.enter(inner, at), { cls: `z-${c.z}` });
    });
    let total = H;
    if (s.bar) {
      const by = H + 44;
      s.cols.forEach((c, i) => {
        const mx = i * (cw + gap) + cw / 2;
        body += svg.trace(`M${mx} ${H + 4}L${mx} ${by - 4}`, {
          cls: "wire link",
          at: 300 + 260 * n + 100 * i,
          dur: 260,
        });
      });
      body += bar(by, s.bar.text, {
        z: s.bar.z,
        icon: s.bar.icon,
        at: 400 + 260 * n + 100 * n,
      });
      total = by + 68;
    }
    const label = `${s.title}. ${s.cols.map((c) => `${c.title}${c.who ? ` (${c.who})` : ""}: ${c.rows.map((r) => `${r.k}: ${r.v}`).join("; ")}`).join(". ")}.${s.bar ? ` ${s.bar.text}` : ""}`;
    return `${html.head(s)}${svg.scene(W, total, label, body, "columns")}${html.footnote(s.footnote)}`;
  };

  /* Outcomes vary: two external studies side by side, each labelled by evidence class and interest. */
  const outcomesVary = (s) => {
    const gap = 80;
    const cw = (W - gap) / 2;
    const rh = 92;
    const s0 = 152;
    const ch = s0 + 3 * rh + 4;
    let body = "";
    s.studies.forEach((st, i) => {
      const x = i * (cw + gap);
      const at = 300 + 500 * i;
      let tx = x + 32;
      const tags = st.tags
        .map((t) => {
          const c = svg.chip(tx, 108, t.label, {
            z: t.z,
            size: 16,
            h: 32,
            pad: 14,
          });
          tx += c.w + 10;
          return c.markup;
        })
        .join("");
      const stats = st.stats
        .map((r, j) => {
          const y = s0 + j * rh;
          const lines = wrap(r.text, 34);
          const y0 = y + rh / 2 + 8 - (lines.length - 1) * 14;
          return svg.enter(
            svg.text(x + 32, y + rh / 2 + 18, r.value, {
              cls: "ev-num z-text",
              anchor: "start",
            }) +
              lines
                .map((l, k) =>
                  svg.text(x + 214, y0 + k * 28, l, {
                    cls: "ev-text",
                    anchor: "start",
                  }),
                )
                .join(""),
            at + 300 + 200 * j,
          );
        })
        .join("");
      body += svg.g(
        svg.enter(
          svg.rect(x, 0, cw, ch, { cls: "box", r: 20 }) +
            svg.rect(x, 0, cw, 6, { cls: "card-top", r: 3 }) +
            svg.text(x + 32, 52, st.name, { cls: "t-lg", anchor: "start" }) +
            svg.text(x + 32, 88, st.context, {
              cls: "t-muted t-sm",
              anchor: "start",
            }) +
            tags,
          at,
        ) + stats,
        { cls: `z-${st.z}` },
      );
    });
    const by = ch + 36;
    body += bar(by, s.inference, { z: "purple", at: 2000 });
    const label = `${s.title}. ${s.studies.map((st) => `${st.name}, ${st.tags.map((t) => t.label).join(", ")}: ${st.stats.map((r) => `${r.value} ${r.text}`).join("; ")}`).join(". ")}. ${s.inference}`;
    return `${html.head(s)}${svg.scene(W, by + 68, label, body, "evidence")}`;
  };

  /* Moving target: a first-party benchmark that will date quickly, beside the controls that stay put around the model. */
  const movingTarget = (s) => {
    const lw = 640;
    const rx = 700;
    const rw = W - rx;
    const b = s.bench;
    const rh = 78;
    const s0 = 150;
    const ch = s0 + b.stats.length * rh + 10;
    let left =
      svg.rect(0, 0, lw, ch, { cls: "box", r: 20 }) +
      svg.rect(0, 0, lw, 6, { cls: "card-top", r: 3 }) +
      svg.text(32, 52, b.name, { cls: "t-lg", anchor: "start" }) +
      svg.chip(32, 76, b.tag, { z: "orange", size: 16, h: 32, pad: 14 }).markup;
    b.stats.forEach((r, j) => {
      const y = s0 + j * rh;
      const lines = wrap(r.text, 32);
      const y0 = y + rh / 2 + 8 - (lines.length - 1) * 14;
      left += svg.enter(
        svg.text(32, y + rh / 2 + 18, r.value, {
          cls: "ev-num z-text",
          anchor: "start",
        }) +
          lines
            .map((l, k) =>
              svg.text(200, y0 + k * 28, l, {
                cls: "ev-text",
                anchor: "start",
              }),
            )
            .join(""),
        500 + 200 * j,
      );
    });
    let body = svg.g(svg.enter(left, 200), { cls: "z-remote" });
    const bh = (ch - 40 - 2 * 14) / 3;
    body += svg.text(rx, 22, s.holdLabel.toUpperCase(), {
      cls: "t-xs t-mono col-label",
      anchor: "start",
    });
    s.holds.forEach((h, i) => {
      const y = 40 + i * (bh + 14);
      const at = 1400 + 300 * i;
      const lines = wrap(h.text, 56);
      body += svg.g(
        svg.enter(
          svg.rect(rx, y, rw, bh, { cls: "zone", r: 16 }) +
            svg.text(rx + 28, y + 44, `${h.icon}  ${h.title}`, {
              cls: "t-lg z-text",
              anchor: "start",
            }) +
            lines
              .map((l, k) =>
                svg.text(rx + 28, y + 82 + k * 28, l, {
                  cls: "col-v",
                  anchor: "start",
                }),
              )
              .join(""),
          at,
        ),
        { cls: `z-${h.z}` },
      );
    });
    const by = ch + 36;
    body += bar(by, s.claim, { z: "purple", at: 2500 });
    const label = `${s.title}. ${b.name} (${b.tag}): ${b.stats.map((r) => `${r.value} ${r.text}`).join("; ")}. ${s.holdLabel}: ${s.holds.map((h) => `${h.title}, ${h.text}`).join(" ")} ${s.claim}`;
    return `${html.head(s)}${svg.scene(W, by + 68, label, body, "moving")}`;
  };

  /* Answers: the question every vendor gets on the left; Copilot's first-party answer, row by row, on the right.
     Data: ask, proof, rows[{label,note,tag,z}]. */
  const answers = (s) => {
    const lw = 420;
    const rx = 470;
    const rw = W - rx;
    const rh = 84;
    const rg = 12;
    const H = s.rows.length * (rh + rg) - rg;
    const q = wrap(s.ask, 22);
    const p = wrap(s.proof, 30);
    const py = 92 + (q.length - 1) * 36 + 60;
    const left =
      svg.rect(0, 0, lw, H, { cls: "zone", r: 20 }) +
      svg.text(28, 44, "ASK EVERY VENDOR", {
        cls: "t-xs t-mono col-label z-text",
        anchor: "start",
      }) +
      q
        .map((l, k) =>
          svg.text(28, 92 + k * 36, l, { cls: "t-lg", anchor: "start" }),
        )
        .join("") +
      svg.text(28, py, "PROOF TO REQUEST", {
        cls: "t-xs t-mono col-label z-text",
        anchor: "start",
      }) +
      p
        .map((l, k) =>
          svg.text(28, py + 38 + k * 29, l, { cls: "col-v", anchor: "start" }),
        )
        .join("");
    let body = svg.g(svg.enter(left, 200), { cls: "z-purple" });
    s.rows.forEach((r, i) => {
      const y = i * (rh + rg);
      const mid = y + rh / 2;
      const at = 700 + 240 * i;
      const tw = Math.round(measure(r.tag, 16) + 28);
      body += svg.trace(`M${lw + 6} ${mid}L${rx - 6} ${mid}`, {
        cls: "wire link",
        at: at - 120,
        dur: 200,
      });
      body += svg.g(
        svg.enter(
          svg.rect(rx, y, rw, rh, { cls: "box", r: 14 }) +
            svg.rect(rx, y, 6, rh, { cls: "card-edge", r: 3 }) +
            svg.text(rx + 28, y + 35, r.label, {
              cls: "ans-label z-text",
              anchor: "start",
            }) +
            svg.text(rx + 28, y + 65, r.note, {
              cls: "ans-note",
              anchor: "start",
            }) +
            svg.chip(W - 24 - tw, mid - 16, r.tag, {
              z: r.z,
              size: 16,
              h: 32,
              pad: 14,
            }).markup,
          at,
        ),
        { cls: `z-${r.z}` },
      );
    });
    const label = `${s.title}. Ask every vendor: ${s.ask} Proof to request: ${s.proof} Copilot's answer: ${s.rows.map((r) => `${r.label}, ${r.note} (${r.tag})`).join("; ")}.`;
    return `${html.head(s)}${svg.scene(W, H, label, body, "answers")}${html.footnote(s.footnote)}`;
  };

  /* One pull request: a person assigns, three agents add evidence on each push, a named human steers rework and merges. */
  const onePr = (s) => {
    const n = s.stations.length;
    const gap = 28;
    const sw = (W - gap * (n - 1)) / n;
    const top = 70;
    const sh = 206;
    const xs = s.stations.map((_, i) => i * (sw + gap));
    const fx = xs[1] - 14;
    const fw = xs[3] + sw + 14 - fx;
    let body = svg.g(
      svg.enter(
        svg.rect(fx, 18, fw, sh + 72, { cls: "zone dashed", r: 22 }) +
          svg.text(fx + 24, 50, s.frameLabel.toUpperCase(), {
            cls: "t-xs t-mono col-label z-text",
            anchor: "start",
          }),
        200,
      ),
      { cls: "z-purple" },
    );
    s.stations.forEach((st, i) => {
      const x = xs[i];
      const at = 400 + 320 * i;
      const lines = wrap(st.text, 18);
      body += svg.g(
        svg.enter(
          svg.rect(x, top, sw, sh, { cls: "box", r: 16 }) +
            svg.rect(x, top, sw, 6, { cls: "card-top", r: 3 }) +
            svg.text(x + 24, top + 38, st.actor.toUpperCase(), {
              cls: "t-xs t-mono col-k",
              anchor: "start",
            }) +
            svg.text(x + 24, top + 80, st.title, {
              cls: "t-lg z-text",
              anchor: "start",
            }) +
            lines
              .map((l, k) =>
                svg.text(x + 24, top + 120 + k * 28, l, {
                  cls: "col-v",
                  anchor: "start",
                }),
              )
              .join(""),
          at,
        ),
        { cls: `z-${st.z}` },
      );
      if (i < n - 1)
        body += svg.trace(
          `M${x + sw + 3} ${top + sh / 2}L${xs[i + 1] - 3} ${top + sh / 2}`,
          { cls: "wire link", at: at + 260, dur: 160 },
        );
    });
    const x1 = xs[1] + sw / 2;
    const x4 = xs[n - 1] + sw / 2;
    const y0 = top + sh + 2;
    const loop = `M${x4} ${y0}C${x4} ${y0 + 92} ${x1} ${y0 + 92} ${x1} ${y0}`;
    body += svg.g(
      svg.trace(loop, { cls: "wire dashed z-stroke", at: 2200, dur: 700 }),
      { cls: "z-accent" },
    );
    body += svg.g(
      svg.enter(
        svg.text((x1 + x4) / 2, y0 + 104, s.loop, { cls: "t-sm z-text" }),
        2500,
      ),
      { cls: "z-accent" },
    );
    body += svg.ride(loop, { z: "accent", at: 2900, dur: 2400, r: 6 });
    const ey = y0 + 136;
    const ew = (W - 28) / 2;
    const eh = 110;
    s.evidence.forEach((e, i) => {
      const x = i * (ew + 28);
      const lines = wrap(e.text, 56);
      const card = svg.g(
        svg.enter(
          svg.rect(x, ey, ew, eh, { cls: "box", r: 16 }) +
            svg.rect(x, ey, 6, eh, { cls: "card-edge", r: 3 }) +
            svg.text(x + 28, ey + 34, e.label.toUpperCase(), {
              cls: "t-xs t-mono col-k",
              anchor: "start",
            }) +
            lines
              .map((l, k) =>
                svg.text(x + 28, ey + 68 + k * 28, l, {
                  cls: "col-v",
                  anchor: "start",
                }),
              )
              .join(""),
          3000 + 300 * i,
        ),
        { cls: `z-${e.z}` },
      );
      body += e.href ? `<a href="${e.href}" target="_blank" rel="noopener">${card}</a>` : card;
    });
    const label = `${s.title}. ${s.stations.map((st) => `${st.actor}: ${st.title}, ${st.text}`).join("; then ")}. ${s.frameLabel}. Rework loop: ${s.loop}. ${s.evidence.map((e) => `${e.label}: ${e.text}`).join(" ")}`;
    return `${html.head(s)}${svg.scene(W, ey + eh, label, body, "one-pr")}`;
  };

  /* Pilot plan: a proportional timeline with dated decision points, then the charter grouped by scope, owners, and timing.
     Data: timeline[{label,detail,weeks?,z?,milestone?}], docLabel, owners, groups[{title,icon,z,fields[{k,v}]}]. */
  const pilotPlan = (s) => {
    const spans = s.timeline.filter((t) => t.weeks);
    const totalWeeks = spans.reduce((a, t) => a + t.weeks, 0);
    const mGap = 70;
    const usable = W - mGap * s.timeline.filter((t) => t.milestone).length;
    const by = 40;
    const bh = 34;
    let x = 0;
    let body = "";
    s.timeline.forEach((t, i) => {
      const at = 300 + 260 * i;
      if (t.milestone) {
        const cx = x + mGap / 2;
        const cy = by + bh / 2;
        const r = 20;
        body += svg.g(svg.pop(
          svg.path(`M${cx} ${cy - r}L${cx + r} ${cy}L${cx} ${cy + r}L${cx - r} ${cy}Z`, { cls: "milestone" }), at) +
          svg.enter(
            svg.text(cx, by + bh + 46, t.label, { cls: "tl-label z-text" }) +
            svg.text(cx, by + bh + 72, t.detail, { cls: "t-xs" }), at + 100), { cls: "z-orange" });
        x += mGap;
      } else {
        const w = usable * (t.weeks / totalWeeks);
        body += svg.g(svg.enter(
          svg.rect(x + 4, by, w - 8, bh, { cls: "zone", r: 10 }) +
          svg.text(x + 4 + (w - 8) / 2, by + bh / 2 + 7, `${t.label} · ${t.detail}`, { cls: "t-sm z-text" }), at), { cls: `z-${t.z}` });
        x += w;
      }
    });
    const dy = by + bh + 108;
    const gap = 24;
    const side = 380;
    const mid = W - 2 * side - 2 * gap;
    const widths = [side, mid, side];
    const fh = 92;
    const fg = 12;
    const ph = 58 + 2 * (fh + fg) - fg + 18;
    let gx = 0;
    s.groups.forEach((g, gi) => {
      const w = widths[gi];
      const cols = g.fields.length > 2 ? 2 : 1;
      const fw = (w - 36 - (cols - 1) * 12) / cols;
      const max = Math.floor((fw - 36) / 10.4);
      let panel =
        svg.rect(gx, dy, w, ph, { cls: "zone", r: 18 }) +
        svg.text(gx + 20, dy + 38, g.icon, { cls: "trust-icon", anchor: "start" }) +
        svg.text(gx + 56, dy + 37, g.title.toUpperCase(), { cls: "t-xs t-mono lvl-k", anchor: "start" });
      g.fields.forEach((f, i) => {
        const fx = gx + 18 + (i % cols) * (fw + 12);
        const fy = dy + 58 + Math.floor(i / cols) * (fh + fg);
        const lines = wrap(f.v, max);
        panel += svg.rect(fx, fy, fw, fh, { cls: "box", r: 12 }) +
          svg.text(fx + 18, fy + 28, f.k.toUpperCase(), { cls: "t-xs t-mono col-k", anchor: "start" }) +
          lines.map((l, k) => svg.text(fx + 18, fy + 56 + k * 25, l, { cls: "field-v", anchor: "start" })).join("");
      });
      body += svg.g(svg.enter(panel, 1300 + 250 * gi), { cls: `z-${g.z}` });
      gx += w + gap;
    });
    const H = dy + ph;
    const fields = s.groups.flatMap((g) => g.fields.map((f) => `${f.k}: ${f.v}`));
    const label = `${s.title}. Timeline: ${s.timeline.map((t) => `${t.label}, ${t.detail}`).join("; then ")}. ${s.docLabel}, ${s.owners}: ${fields.join("; ")}.${s.footnote ? ` ${s.footnote}` : ""}`;
    return `${html.head(s)}${svg.scene(W, H, label, body, "memo")}${html.footnote(s.footnote)}`;
  };

  /* Recap: one row per part, the old habit dimmed beside the new practice, then the talk's numbers.
     Data: rows[{part,z,icon,before,after}], metrics[3]{value,detail}. */
  const recap = (s) => {
    const rh = 70;
    const rg = 14;
    const nb = 52;
    const bw = 600;
    const ax = nb + 16 + bw;
    const aw = W - ax - 64;
    const afx = ax + 64;
    let body =
      svg.g(svg.text(nb + 16, 18, "BEFORE", { cls: "t-xs t-mono col-label z-text", anchor: "start" }), { cls: "z-orange" }) +
      svg.g(svg.text(afx, 18, "AFTER", { cls: "t-xs t-mono col-label z-text", anchor: "start" }), { cls: "z-green" });
    s.rows.forEach((r, i) => {
      const top = 36 + i * (rh + rg);
      const mid = top + rh / 2;
      const at = 300 + 320 * i;
      body += svg.g(
        svg.pop(svg.circle(nb / 2, mid, 22, { cls: "stop" }) + svg.text(nb / 2, mid + 7, r.part, { cls: "t-sm z-text" }), at) +
        svg.enter(
          svg.rect(nb + 16, top, bw, rh, { cls: "box soft", r: 14 }) +
          svg.text(nb + 40, mid + 8, r.before, { cls: "ba-item recap-before", anchor: "start" }), at + 80) +
        svg.trace(`M${ax + 10} ${mid}L${afx - 14} ${mid}`, { cls: "wire link z-stroke", at: at + 200, dur: 240 }) +
        svg.pop(svg.path(`M${afx - 24} ${mid - 8}L${afx - 12} ${mid}L${afx - 24} ${mid + 8}`, { cls: "wire link z-stroke" }), at + 420) +
        svg.enter(
          svg.rect(afx, top, aw + 64 - (afx - ax), rh, { cls: "zone", r: 14 }) +
          svg.rect(afx, top, 6, rh, { cls: "card-edge", r: 3 }) +
          svg.text(afx + 28, mid + 10, r.icon, { cls: "trust-icon", anchor: "start" }) +
          svg.text(afx + 70, mid + 8, r.after, { cls: "ba-item", anchor: "start" }), at + 460),
        { cls: `z-${r.z}` },
      );
    });
    const my = 36 + s.rows.length * (rh + rg) + 26;
    const mh = 118;
    const mw = (W - 2 * 24) / 3;
    const mAt = 300 + 320 * s.rows.length + 300;
    s.metrics.forEach((m, i) => {
      const x = i * (mw + 24);
      body += svg.g(svg.pop(svg.g(
        svg.rect(x, my, mw, mh, { cls: "zone", r: 18 }) +
        svg.text(x + mw / 2, my + 58, m.value, { cls: "z-text recap-num" }) +
        svg.text(x + mw / 2, my + 94, m.detail, { cls: "t-muted recap-detail" }), {}), mAt + 160 * i), { cls: "z-purple" });
    });
    const label = `${s.title}. ${s.rows.map((r) => `Part ${r.part}. Before: ${r.before}; after: ${r.after}`).join(". ")}. ${s.metrics.map((m) => `${m.value}: ${m.detail}`).join(", ")}.`;
    return `${html.head(s)}${svg.scene(W, my + mh, label, body, "recap")}`;
  };

  /* Dispositions: the day-90 gate forks into scale, adjust once (returns once), or stop. */
  const dispositions = (s) => {
    const gx = 170;
    const gy = 258;
    const gr = 64;
    const bx = 420;
    const bw = W - bx;
    const bh = 156;
    const bg = 24;
    let body = svg.pop(
      svg.g(
        svg.path(
          `M${gx} ${gy - gr}L${gx + gr} ${gy}L${gx} ${gy + gr}L${gx - gr} ${gy}Z`,
          { cls: "zone" },
        ) +
          svg.text(gx, gy - 2, "Day-90", { cls: "z-text t-sm" }) +
          svg.text(gx, gy + 24, "gate", { cls: "z-text t-sm" }),
        { cls: "z-purple" },
      ),
      200,
    );
    const gl = wrap(s.gate, 22);
    body += gl
      .map((l, k) =>
        svg.text(gx, gy - gr - 24 - (gl.length - 1 - k) * 22, l, {
          cls: "t-xs",
        }),
      )
      .join("");
    s.branches.forEach((b, i) => {
      const y = i * (bh + bg);
      const mid = y + bh / 2;
      const at = 600 + 400 * i;
      const lines = wrap(b.text, 78);
      body += svg.g(
        svg.trace(
          `M${gx + gr} ${gy}C${gx + gr + 90} ${gy} ${bx - 90} ${mid} ${bx - 6} ${mid}`,
          { cls: "wire z-stroke", at: at - 200, dur: 350 },
        ),
        { cls: `z-${b.z}` },
      );
      body += svg.g(
        svg.enter(
          svg.rect(bx, y, bw, bh, { cls: "zone", r: 18 }) +
            svg.text(bx + 28, y + 52, b.icon, {
              cls: "t-emoji",
              anchor: "start",
            }) +
            svg.text(bx + 82, y + 48, b.title, {
              cls: "t-lg z-text",
              anchor: "start",
            }) +
            (b.note
              ? svg.text(bx + bw - 28, y + 46, b.note, {
                  cls: "t-sm z-text",
                  anchor: "end",
                })
              : "") +
            lines
              .map((l, k) =>
                svg.text(bx + 28, y + 94 + k * 29, l, {
                  cls: "col-v",
                  anchor: "start",
                }),
              )
              .join(""),
          at,
        ),
        { cls: `z-${b.z}` },
      );
    });
    const sy = gy + gr + 80;
    body += svg.g(
      svg.pop(
        svg.g(
          svg.rect(0, sy, 320, 86, { cls: "zone", r: 16 }) +
            svg.text(24, sy + 34, s.stop.label.toUpperCase(), {
              cls: "t-xs t-mono col-label z-text",
              anchor: "start",
            }) +
            svg.text(24, sy + 66, s.stop.text, {
              cls: "col-v",
              anchor: "start",
            }),
          {},
        ),
        2300,
      ),
      { cls: "z-orange" },
    );
    const H = 3 * bh + 2 * bg;
    const label = `${s.title}. At the day-90 gate (${s.gate}): ${s.branches.map((b) => `${b.title}${b.note ? ` (${b.note})` : ""} when ${b.text}`).join(" ")} ${s.stop.label}: ${s.stop.text}.`;
    return `${html.head(s)}${svg.scene(W, Math.max(H, sy + 86), label, body, "gate")}`;
  };

  window.SCENES = {
    "pr-evidence": prEvidence,
    "question-system": questionSystem,
    "questions-trust": questionsTrust,
    ladder,
    quad,
    recap,
    columns,
    "outcomes-vary": outcomesVary,
    "moving-target": movingTarget,
    answers,
    "one-pr": onePr,
    "pilot-plan": pilotPlan,
    dispositions,
  };
})();
