# tech-talks / events

Milestones for individual tech-talk content: creation, rewrites, conformance, and pipeline changes.

---

## copilot-code-quality tech-talk created (2026-07-24)

`schema_version: 1` | `date: 2026-07-24`

New tech-talk added: **GitHub Code Quality: Turning Maintainability Into a Merge Gate**, covering the GA launch (2026-07-20) of coverage-aware quality gates, Copilot Autofix, enterprise rollout, and per-committer billing.

**Files created:**
- `tech-talks/copilot-code-quality/research.md` — 9 primary sources (GitHub changelog + docs pages)
- `tech-talks/copilot-code-quality/README.md` — Structure A: capability-then-cost-then-action arc, 4 major sections
- `tech-talks/copilot-code-quality/deck.recipe.yml` — via deck-recipe-review skill
- `slides/tech-talks/copilot-code-quality.md` — 24-slide deck, builds clean

**Section placement:** Developers (`slides/index-custom.html`, Developers sub-group)

**Structural decision (resolved, not left open):** `sectionOrder` places **Reading the Bill** (cost) before **Rolling Out Without Surprises** (action) — capability → cost → action. User explicitly confirmed target audience is developers, so this ordering was locked in rather than moved earlier for an admin-heavy read.

**Pipeline note:** This session had no terminal/execute tool available — all build validation (`.\build.ps1 -Deck copilot-code-quality`) and `node scripts/sync-index-dates.mjs` runs had to be delegated to the user via their own terminal, with output pasted back. Full pipeline still completed successfully with this workaround.

---

## copilot-cli: council-revised deck refresh (2026-08-10)

`schema_version: 1` | `date: 2026-08-10`

Complete regeneration of `slides/tech-talks/copilot-cli.md` (27 slides, appendix via src:) from the council-revised `deck.recipe.yml` (REVISE decision). Same 4-section Intent → Geography → Memory → Scale spine, updated for concurrent session controls, Git-free /rewind, /worktree experimental, live tool durations, and the scale ladder.

**Key decisions made this session:**
- Trust beat is ONE compact FourCardGridSlide (auto-compaction, /rewind, Sessions sidebar, live tool durations) — not a feature tour. Single slide, 4 cards, no insight prop.
- Scale ladder uses MaturityJourneyRoadmapSlide (4 stages: Sidebar → /worktree experimental → /fleet → & delegate); caption distinguishes /worktree from /pr worktree.
- /worktree marked explicitly experimental in both the stage description and the slide label.
- Phone-steering choreography preserved: cold open first (AITerminalTranscriptSlide), architecture backfill second (TwoColPairedConceptsSlide).
- Live S3→S4 bridge is AITerminalTranscriptSlide with the "/every 1m tell me I'm awesome" live-firing demo.
- No model names printed anywhere — /model taught as the durable workflow.
- TocSlide slide numbers: S1=5, S2=10, S3=14, S4=19 (27 total slides including appendix)

**Component map:**
- S1 body (4 slides): HeroStatSlide, WorkflowShowdownStepsSlide, AITerminalTranscriptSlide, FourCardGridSlide
- S2 body (3 slides): AITerminalTranscriptSlide, TwoColPairedConceptsSlide, CodeWithFeaturesSlide
- S3 body (4 slides): FourCardGridSlide (trust prologue), AITerminalTranscriptSlide (/chronicle standup), ThreeColumnCardSlide (/chronicle features), AITerminalTranscriptSlide (bridge)
- S4 body (3 slides): MaturityJourneyRoadmapSlide (scale ladder), CodeWithFeaturesSlide (/fleet), ThreeColumnCardSlide (ecosystem)

---

## copilot-cli: full deck regeneration with dual-arc narrative (2026-06-04)

`schema_version: 1` | `date: 2026-06-04`

Complete regeneration of `slides/tech-talks/copilot-cli.md` (26 slides) triggered by a README update that added Rubber Duck, Scheduled Prompts, /goal alias, /voice, disableBypassPermissionsMode, worktree-from-PR (v1.0.60), and per-MCP token visibility.

**Key decisions made this session:**
- 4-section spine held (Intent → Geography → Memory → Scale)
- Added a second narrative dimension: automation depth progression (human-explicit → automated-explicit → automated-implicit)
- Rubber Duck placed in S1 as the first step in the automation arc (not an add-on)
- S3→S4 bridge slide is LIVE execution: speaker kicks off `/every 1m tell me I'm awesome` before the talk; audience watches it fire during the bridge slide
- `deck.recipe.yml` fully updated with 5 highlightMoments, 4 rewritten sectionModes, new tagline "Act autonomously."
- Final slide count: 26 (including appendix src: ./copilot-cli-reference.md)
- TocSlide slide numbers: S1=4, S2=9, S3=14, S4=19

**Component map:**
- S1 body: HeroStatSlide, WorkflowShowdownStepsSlide, TwoColPairedConceptsSlide, FourCardGridSlide
- S2 body: AITerminalTranscriptSlide, TwoColPairedConceptsSlide, CodeWithFeaturesSlide, ThreeColumnCardSlide
- S3 body: TwoColPairedConceptsSlide, AITerminalTranscriptSlide, ProblemSolutionOutcomeSlide, AITerminalTranscriptSlide (bridge)
- S4 body: CodeWithFeaturesSlide, TwoColPairedConceptsSlide, ThreeColumnCardSlide



## Tech-talk pipeline restructured: 3-agent workflow with deck-recipe-review skill (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

The tech-talk authoring pipeline was redesigned into a strict 3-stage sequence:

1. **Tech Talk Generator** — writes `README.md`. No longer creates `deck.recipe.yml` itself. Final step invokes the deck-recipe-review skill.
2. **Deck Recipe Review skill** — owns recipe creation entirely. Reads README + `DECK-RECIPE-TEMPLATE.yml` schema. Runs a 3-agent Agent Council (Phase 1 → Phase 2 improve → Phase 3 orchestrate). Produces a **complete, fresh** `deck.recipe.yml`. Always overwrites — never patches.
3. **Tech Talk Slide Generator** — reads `deck.recipe.yml` as the sole Phase A input. If recipe is missing, **hard stops**: "Run the deck-recipe-review skill first."

**Other changes:**
- `DECK-RECIPE-TEMPLATE.yml` moved from `tech-talks/` to `.github/skills/deck-recipe-review/`
- File-clear gate promoted to pre-flight in slide generator
- References to `@Slide Manager`, `@Slide Generator`, `@tech-talk-author` removed from `tech-talks/README.md` (obsolete agent names)

---

## Full conformance sweep complete: all 18 tech-talk decks use Tier-1 components (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

All 18 tech-talk decks conformed to Tier-1 components. Raw HTML forbidden for body slides across all decks.

**Decks conformed this session:**
- `copilot-cli.md` — 13 slides converted, 8 kept raw HTML
- `copilot-azure-mcp.md` — 7 slides converted, 4 kept raw HTML
- `copilot-web.md` — 11 slides converted, 2 kept raw HTML
- `copilot-sdk.md` — 6 slides converted, 3 kept raw HTML
- `copilot-chat-internals.md` — 7 slides converted, 2 kept raw HTML
- `copilot-acp.md` — 2 slides converted (slides 18, 19), existing slide 17 already done
- `agentic-workflows.md` — 7 slides converted, 2 kept raw HTML
- `copilot-plugins.md` — 6 slides converted, 3 kept raw HTML
- `copilot-primitives.md` — 2 slides converted, 3 kept raw HTML
- `agentic-journey.md` — 6 slides converted, 5 kept raw HTML
- `copilot-code-review.md` — 7 slides converted, 8 kept raw HTML

**Key orphan HTML patterns discovered:** `multi_replace_string_in_file` with mismatched closing `</div>` absorbs neighboring slide content. Always convert one slide per call or use full-region replacement. See `slides/discoveries.md`.

---

## Phase 1 catalog complete: all 18 tech-talk decks cataloged (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

All 18 raw HTML slides cataloged across all tech-talk decks. Working files created in `plan-decks/<deck>.md` for every deck.

**Totals:** ~185 raw HTML slides across 18 decks
- Direct maps (existing components): ~110 slides
- Conditional: ~40 slides
- Keep raw HTML (genuinely bespoke): ~35 slides

---

## copilot-plugins tech-talk created (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

New tech-talk added: **Copilot Plugins & APM: Composable AI Extensions**

**Files created:**
- `tech-talks/copilot-plugins/README.md` — CLI-first framing, distinguishes `copilot plugin` vs `apm` workflows
- `tech-talks/copilot-plugins/deck.recipe.yml`
- `slides/tech-talks/copilot-plugins.md` — 21-slide deck, builds clean

**Section placement:** Customization & Context

**Framing decision:** CLI-first throughout. Core insight: `copilot plugin` = personal exploration, `apm` = team infrastructure as code.

---

## fanhub-plugin APM demo package created (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

Created `demos/fanhub-plugin/` — a complete, installable APM plugin package sourced from the workshop module folders.

**Contents:** 28 files — `.github/copilot-instructions.md`, `docs/architecture.md`, `docs/breaking-bad-universe.md`, 6 prompts, 3 skills, `mcp-servers/fanhub-api-server.js`, `.vscode/mcp.json`, 2 agents, `apm.yml`, `WALKTHROUGH.md`, `README.md`.

**Use:** Module 00 closing reveal.

**Key insight confirmed:** `docs/architecture.md` ships as part of the payload and is read automatically by Copilot as codebase context — the single highest-value file in the package.

---

## demos/ folder created: 7 tech-talk companion walkthroughs (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

Created `demos/` at repo root containing grounded hands-on walkthroughs for 7 STRONG YES tech-talks.

| File | Source talk |
|------|-------------|
| `copilot-cli-walkthrough.md` | tech-talks/copilot-cli |
| `copilot-acp-walkthrough.md` | tech-talks/copilot-acp |
| `copilot-azure-mcp-walkthrough.md` | tech-talks/copilot-azure-mcp |
| `copilot-code-review-walkthrough.md` | tech-talks/copilot-code-review |
| `copilot-coding-agent-walkthrough.md` | tech-talks/copilot-web |
| `agentic-sdlc-walkthrough.md` | tech-talks/agentic-sdlc |
| `agent-teams-walkthrough.md` | tech-talks/agent-teams |

---

## copilot-cli reframed around --remote: "AI at the Point of Work" (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

The `copilot-cli` tech-talk was comprehensively reframed from "Terminal-Native AI for Developers and DevOps" to **"AI at the Point of Work"** using a 3-phase collaborative council.

**Structural spine: "Removing Distance."** Each section removes a different constraint:
- Intent → Plan Mode
- Complexity → /fleet fan-out
- Context → Auto-compaction + Memory
- Time → Cloud delegation (&)
- Geography → `--remote` (the culmination)

**Tagline:** "Start Anywhere. Steer Anywhere. Resume Anywhere."

**README changes:** New major section "Remote Sessions: The Last Distance Falls". Distance Model table added. Use cases expanded from 3 → 6.

**Slide deck changes:** 32 content slides + 10 preserved appendix reference slides = 42 total. Build verified clean ✅.

---

## vscode-latest tech-talk updated to v1.115 (2026-04-13)

`schema_version: 1` | `date: 2026-04-13`

The `vscode-latest` tech-talk README and slides were expanded to cover VS Code releases **v1.108 – v1.115** (8 releases total, up from 3).

**Key new features added:** Autopilot mode (v1.111), VS Code Agents companion app (v1.115), Chat Customizations editor (v1.113), nested subagents (v1.113), MCP server sandboxing (v1.112).

Duration changed from 30-45 minutes to 45-60 minutes. Slides regenerated: 24 slides.

---

## copilot-code-review tech-talk: Complete rewrite to remove hallucinations (2026-04-10)

`schema_version: 1` | `date: 2026-04-10`

The `copilot-code-review` tech-talk README and slides were completely rewritten to remove pervasive hallucinated content.

**Hallucinations removed:**
- Fictional `copilot-review.yml` YAML config files with invented `triggers`, `severity_threshold`, `focus`, `pattern`, `require_context` schema
- Non-existent `examples/` directory references
- References to non-existent tech-talks: `../copilot-chat/` and `../copilot-workspace/`

**Rewritten to reflect actual product:**
- Configuration via **GitHub Rulesets UI**
- Custom behavior via **`.github/copilot-instructions.md`** (Markdown)
- Language-specific rules via **`.github/instructions/<topic>.instructions.md`**

**Always regenerate from `tech-talks/copilot-code-review/research.md`** for this talk to avoid hallucination recurrence.

---

## copilot-acp.md: Part 4 use-case slides restructured (2026-04-09)

`schema_version: 1` | `date: 2026-04-09`

Slide 17 (Zed Editor Integration) was split into three standalone slides. Deck grew from **22 → 24 slides**. The slide count entry in any all-decks table is stale — copilot-acp.md is at 24 slides, not 22.
