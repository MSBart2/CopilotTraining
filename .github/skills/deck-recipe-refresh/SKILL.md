---
name: deck-recipe-refresh
description: "Use after an approved content refresh when recipeReview.required is true, or when the user asks to refresh an existing recipe. Preserves the current recipe as a baseline and requires an independent cross-model Rubber Duck critique before structural changes are finalized. Triggers: refresh recipe, changelog recipe review, approve recipe, update existing deck recipe."
infer: true
---

# Deck Recipe Refresh

Review an existing tech-talk recipe after feed-driven content changes. Unlike `deck-recipe-review`, this workflow uses the current recipe as an intentional baseline and changes it only when new evidence improves the talk.

The output is always a complete `deck.recipe.yml`, suitable for deterministic slide regeneration.

## Skip this skill

Do not run this skill when `content.refresh.yml` has `recipeReview.required: false` and every accepted `recipeImpact` is `none` or `confirm`. Stamp `refresh.validation.recipeApproved: true`, leave the recipe, and continue.

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

## Review depth

- Compact (default when this skill runs): primary analysis, independent Rubber Duck critique, then reconciliation.
- Full: primary analysis must include at least one credible alternate structure before the Rubber Duck critique. Use only for `updateLevel: structural`, `recipeImpact: restructure`, or `slideImpact: replace-demo`.

## Review Question

Give the primary reviewer and Rubber Duck the same extracted context and ask:

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

## Mandatory Rubber Duck Gate

Before writing the recipe, complete all of these steps without asking the user to remember or invoke them:

1. Produce a primary recommendation that identifies how the product model or technical thesis changed, protects practical demos and factual release status, and minimizes unnecessary churn.
2. In Copilot CLI, explicitly delegate the recommendation and the complete extracted context to the built-in **Rubber Duck** agent. Require an independent adversarial critique of the thesis, section order, weighting, highlights, agenda, and demos.
3. Do not role-play Rubber Duck in the primary model. Wait for the separate review and reconcile its objections explicitly before finalizing.
4. Outside Copilot CLI, launch one review subagent using a different model family from the primary model and give it the same adversarial brief.
5. If no independent cross-model reviewer is available or the delegation does not occur, stop and report that the recipe review gate is blocked. Do not silently write an unreviewed recipe.

The reconciled result must return:

1. `decision`: `preserve`, `revise`, or `restructure`
2. A short rationale tied to accepted refresh items
3. A field-by-field change list from the previous recipe
4. A complete recipe using the standard template schema
5. Any rejected candidate content and why it did not earn slide time

## Decision Rules

- `preserve`: Content changed, but the existing recipe remains the strongest adaptation. Update only dates or source-dependent wording outside the recipe.
- `revise`: Keep the section order and thesis; adjust emphasis, notes, agenda, or highlights.
- `restructure`: Change the thesis or section order because a headline update changes the operating model or centerpiece workflow.

A `structural` refresh does not force `restructure`; it forces explicit cross-model consideration.

## Write and Report

1. Overwrite `tech-talks/<topic>/deck.recipe.yml` with the complete synthesized recipe.
2. Add a concise header comment containing the refresh date, review decision, and rationale.
3. Validate YAML and the standard recipe quality checks.
4. Set `refresh.validation.recipeApproved: true` in `content.refresh.yml`.
5. Report the decision and material recipe changes before slide generation.

## Post-Recipe Workflow

- `preserve`: do not regenerate slides. Patch existing slides only if a visible claim is now false.
- `revise` with `slideImpact: patch`: edit the existing deck; do not wipe it.
- `restructure` or `slideImpact: regenerate|replace-demo`: invoke Tech Talk Slide Generator with the talk path.

After any slide change:

1. Run the single-deck build.
2. Run `node slides/scripts/sync-index-dates.mjs` from the repository root.
3. Update `content.refresh.yml` validation fields.
4. Apply the Workbench end-of-session update protocol when a non-obvious editorial decision should persist.
