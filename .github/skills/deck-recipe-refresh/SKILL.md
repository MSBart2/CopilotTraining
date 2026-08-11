---
name: deck-recipe-refresh
description: "Use after an approved content refresh changes an existing tech talk. Runs a collaborative Agent Council to preserve or revise the current deck recipe from the updated README and content.refresh.yml. Triggers: refresh recipe, changelog recipe review, council approve recipe, update existing deck recipe."
infer: true
---

# Deck Recipe Refresh

Review an existing tech-talk recipe after feed-driven content changes. Unlike `deck-recipe-review`, this workflow uses the current recipe as an intentional baseline and changes it only when new evidence improves the talk.

The output is always a complete `deck.recipe.yml`, suitable for deterministic slide regeneration.

## Pre-Flight

Read all four inputs:

1. `tech-talks/<topic>/README.md` - updated canonical content
2. `tech-talks/<topic>/content.refresh.yml` - approved evidence and impact plan
3. `tech-talks/<topic>/deck.recipe.yml` - current editorial decisions
4. `.github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml` - output schema

Stop when:

- The README or deck is archived.
- The refresh plan is not `status: approved`.
- Accepted claims are not represented in the updated README.
- Any required input is missing.

Do not read the existing slide deck. The README, refresh plan, and recipe are the authoritative inputs.

## Council Question

Run the Agent Council in collaborative mode. Give every council member the same extracted context and ask:

> Does the approved evidence require changing the talk's thesis, section order,
> weighting, highlights, agenda, or demos? Preserve intentional decisions unless
> the new material makes a change more accurate, useful, or compelling.

The context must include:

- Talk title, audience, duration, and core question
- Current README major sections and concise summaries
- Every accepted refresh item, importance, target section, and limitations
- Explicit removals and anomalies
- Current recipe fields: title, subtitle, tagline, agenda, arc, sections, emphasis, notes, and highlights
- User emphasis from the refresh plan
- Constraints from the standard recipe review skill

## Council Roles

Use the standard three-agent collaborative council, with these review lenses:

- Alpha: identify how the product model and technical thesis changed.
- Beta: protect practical demos, audience usefulness, and factual release status.
- Gamma: minimize churn; identify the smallest recipe change that fully reflects the evidence.

The synthesis must return:

1. `decision`: `preserve`, `revise`, or `restructure`
2. A short rationale tied to accepted refresh items
3. A field-by-field change list from the previous recipe
4. A complete recipe using the standard template schema
5. Any rejected candidate content and why it did not earn slide time

## Decision Rules

- `preserve`: Content changed, but the existing recipe remains the strongest adaptation. Update only dates or source-dependent wording outside the recipe.
- `revise`: Keep the section order and thesis; adjust emphasis, notes, agenda, or highlights.
- `restructure`: Change the thesis or section order because a headline update changes the operating model or centerpiece workflow.

A `structural` refresh does not force `restructure`; it forces explicit council consideration.

## Write and Report

1. Overwrite `tech-talks/<topic>/deck.recipe.yml` with the complete synthesized recipe.
2. Add a concise header comment containing the refresh date, council decision, and rationale.
3. Validate YAML and the standard recipe quality checks.
4. Set `refresh.validation.recipeApproved: true` in `content.refresh.yml`.
5. Report the decision and material recipe changes before slide generation.

## Post-Recipe Workflow

Invoke the Tech Talk Slide Generator with the talk path. After generation:

1. Run the single-deck build.
2. Run `node slides/scripts/sync-index-dates.mjs` from the repository root.
3. Update `content.refresh.yml` validation fields.
4. Apply the Workbench end-of-session update protocol when a non-obvious editorial decision should persist.
