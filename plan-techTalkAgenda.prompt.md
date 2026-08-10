## Plan: Tech-Talk Agenda Contract

Add a reusable, three-point AgendaSlide between CoreQuestionSlide and TocSlide. The agenda is authored in deck.recipe.yml as concise topic, takeaway, and why-it-matters entries; this keeps presentation metadata out of the reader-first README while making generation deterministic. Retrofit all 26 currently generated active tech-talk decks and migrate all 27 existing recipes so future generation is consistent.

**Steps**
1. Create `c:\Users\rmathis\source\CopilotTraining\slides\tech-talks\components\structure\AgendaSlide.vue` as an opening structural component. Give it a single required `items` prop containing exactly three objects with `title`, `takeaway`, and `whyItMatters`. Match CoreQuestionSlide/TocSlide's Vue dark/light theme pattern, input validation, content-length warnings, full-height layout, and cockpit chrome; present three equally weighted, non-navigating agenda cards whose copy explicitly separates what attendees will see/learn from why it matters.
2. Extend `c:\Users\rmathis\source\CopilotTraining\slides\scripts\build-all.ps1` prop-lint extraction grammar for AgendaSlide-specific limits, and define the limits in the component. The static check must warn for more or fewer than three entries, missing required fields, and copy that exceeds the component's display-safe limits.
3. Update the deck contract in `c:\Users\rmathis\source\CopilotTraining\slides\tech-talks\template.md`: add AgendaSlide to the structural import block, document its exact prop schema and length limits, and redefine the fixed opening sequence as Title (1), Core Question (2), Agenda (3), and Table of Contents (4). Preserve TocSlide as the detailed four-part navigation rather than duplicating it.
4. Extend the recipe schema at `c:\Users\rmathis\source\CopilotTraining\.github\skills\deck-recipe-review\DECK-RECIPE-TEMPLATE.yml` with a required `deck.agenda` list of exactly three `{ title, takeaway, whyItMatters }` entries and editorial constraints. Update `c:\Users\rmathis\source\CopilotTraining\.github\skills\deck-recipe-review\SKILL.md` so the council synthesis produces the entries, the mapping writes them, and quality checks require exactly three audience-relevant points. Keep them derived from the README's core question, major sections, artifacts, and highlight moments, not copied mechanically from the four-section TOC.
5. Update `c:\Users\rmathis\source\CopilotTraining\.github\agents\tech-talk-generator.agent.md` to require agenda-ready recipe output through deck-recipe-review without adding slide choreography to README content. Update `c:\Users\rmathis\source\CopilotTraining\.github\agents\tech-talk-slide-generator.agent.md` to import AgendaSlide, scaffold it immediately after CoreQuestionSlide, populate it from `deck.agenda`, and revise fixed positions, content budget, and completion checks. New decks retain the existing 20-25-slide target where feasible; AgendaSlide counts toward that target and no existing body content is removed solely for this rollout.
6. Migrate all 27 existing `c:\Users\rmathis\source\CopilotTraining\tech-talks\*\deck.recipe.yml` files with curated, topic-specific agenda data. Preserve each recipe's existing section order, narrative, weights, and highlight moments; do not rerun council-driven structural rewrites for this schema migration.
7. Retrofit each of the 26 active paired decks by adding the AgendaSlide import and a named slide between CoreQuestionSlide and TocSlide, populated from its paired recipe. Preserve every deck frontmatter `updated` date: this is presentation infrastructure, not a content refresh. The included files are `agent-dev-loop.md`, `agent-teams.md`, `agentic-journey.md`, `agentic-sdlc.md`, `agentic-workflows.md`, `copilot-acp.md`, `copilot-app.md`, `copilot-azure-mcp.md`, `copilot-chat-internals.md`, `copilot-cli.md`, `copilot-code-quality.md`, `copilot-code-review.md`, `copilot-hooks.md`, `copilot-memory.md`, `copilot-plugins.md`, `copilot-primitives.md`, `copilot-sdk.md`, `copilot-web.md`, `copilot-with-foundry.md`, `enterprise-patterns.md`, `exec-delivery.md`, `exec-economics.md`, `exec-labor.md`, `loopy-agents.md`, `mcp-apps.md`, and `vscode-latest.md` under `c:\Users\rmathis\source\CopilotTraining\slides\tech-talks\`.

**Relevant files**
- `c:\Users\rmathis\source\CopilotTraining\slides\tech-talks\components\structure\AgendaSlide.vue` — new reusable component; follow CoreQuestionSlide.vue and TocSlide.vue.
- `c:\Users\rmathis\source\CopilotTraining\slides\tech-talks\template.md` — canonical tech-talk deck contract and AgendaSlide usage example.
- `c:\Users\rmathis\source\CopilotTraining\slides\scripts\build-all.ps1` — dynamic component prop lint.
- `c:\Users\rmathis\source\CopilotTraining\.github\agents\tech-talk-generator.agent.md` — creator-to-recipe handoff rule.
- `c:\Users\rmathis\source\CopilotTraining\.github\agents\tech-talk-slide-generator.agent.md` — scaffold and final-generation invariant.
- `c:\Users\rmathis\source\CopilotTraining\.github\skills\deck-recipe-review\SKILL.md` and `DECK-RECIPE-TEMPLATE.yml` — agenda metadata authoring contract.
- `c:\Users\rmathis\source\CopilotTraining\tech-talks\*\deck.recipe.yml` — migrate 27 existing recipe artifacts.
- `c:\Users\rmathis\source\CopilotTraining\slides\tech-talks\*.md` — retrofit the 26 active production deck/readme pairs listed in step 7.

**Verification**
1. Build AgendaSlide's component test surface or a representative migrated deck with `powershell -ExecutionPolicy Bypass -File slides/build.ps1 -Deck copilot-cli`; confirm the new Vue component and prop syntax compile.
2. Run `powershell -ExecutionPolicy Bypass -File slides/build.ps1 -Folder tech-talks` to build every active tech-talk deck and execute static prop-linting.
3. Run `node slides/scripts/inspect-slide.js copilot-cli 3` from `slides/` and inspect the saved capture/report across the tool's desktop, laptop, and tablet viewports; verify no overflow and that the agenda is visually distinct from the TOC.
4. Programmatically inventory the eligible active deck/readme pairs and assert one AgendaSlide import and one named agenda slide per deck, exactly three rendered entries, and one matching three-item `deck.agenda` list per migrated recipe.

**Decisions**
- Agenda placement: after Core Question and before TOC.
- Agenda content: three short, topic-specific entries containing the point, takeaway, and why it matters.
- Scope: active existing production deck/readme pairs plus every future deck. Archived content remains untouched.
- Preserve existing deck `updated` dates and do not run the date-index sync; the agenda is infrastructure rather than a content update.
- Excluded from retrofit: `slides/tech-talks/component-test.md`, `slides/tech-talks/template.md`, and `slides/tech-talks/copilot-cli-reference.md`; they are fixtures/templates or lack a paired active talk. Do not create missing decks for `tech-talks/exec-strategy` or `tech-talks/exec-spine` as part of this change.
- No changes to reader-first README prose, broad recipe restructuring, or body-slide editorial content.
