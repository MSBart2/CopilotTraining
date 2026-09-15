# workshop / preferences

Author taste, framing choices, and voice decisions for workshop modules.

---

## M1 s21 — ARCHITECTURE.md prompt framing

**Date:** 2026-04-13

The example prompt for creating `ARCHITECTURE.md` (slide 21, `01-instructions.md`) uses **navigation-aid framing**, not a line-count constraint:

> "This is a navigation aid for Copilot, not a specification. Keep each section focused — omit anything Copilot doesn't need to generate good code."

A "40-line" limit was tried and removed. The file should reflect actual codebase complexity — the pointer pattern is what matters, not file size.

The prompt also includes a "Do not include" clause (file inventories, changelogs, aspirational architecture not yet built) to prevent common over-engineering failure modes.

---

## M2 s15 — Plan prompt: ask clarifying questions first

**Date:** 2026-04-13

The `/plan` prompt example on slide 15 (`02-agent-plan-mode.md`) explicitly asks Copilot to pause for clarifying questions before generating the plan:

> "Before you create the plan, ask me any clarifying questions — for example: should this extend the existing lore card plan or be a separate plan? Should the form be reachable from global nav?"

This was added because without it Copilot silently picks defaults that only surface as conflicts later. The callout on the right explains "Why ask first" rather than focusing only on the continuity check.

---

## Workshop persona recap slides — asymmetrical Before vs After treatment

**Date:** 2026-04-13

For the workshop module recap slides (`The Team, Before ...` / `The Team, After ...`), the visual contrast should be **asymmetrical**:

- **Before slides** get the strong treatment: red-tinted atmosphere, diagonal `Wrong Answers` watermark, and `Wrong Answers Only` badge.
- **After slides** should stay restrained: subtle emerald/cyan header treatment and a small `After The Module` badge.
- **Do not recolor the quote cards on After slides.** Keeping the cards neutral preserves the persona accent colors and avoids making the quotes look visually inconsistent.

The key decision is that the Before treatment is a warning signal, while the After treatment should feel composed and credible rather than celebratory or "gold star" cheesy.

---

## Planned metrics are targets until validated

**Date:** 2026-09-15

Workshop plans pair each target improvement with a baseline and a learner-run validation method. Generated exercises must not present precise planned improvements as observed results; participants produce the evidence by running or inspecting the artifact, then interpret the result and make or explain one adjustment.
