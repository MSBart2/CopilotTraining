---
name: deck-recipe-refresh
description: "Use after an approved content refresh when recipeReview.required is true, or when the user asks to refresh an existing recipe. Preserves the current recipe as a baseline; the user's approval finalizes structural changes. Triggers: refresh recipe, changelog recipe review, approve recipe, update existing deck recipe."
infer: true
---

# Deck Recipe Refresh

Review an existing tech-talk recipe after feed-driven content changes. Unlike `deck-recipe-review`, this workflow uses the current recipe as an intentional baseline and changes it only when new evidence improves the talk.

The output is always a complete `deck.recipe.yml`, suitable for deterministic slide regeneration. This skill also prepares a Slidev tech talk for conversion to the native engine.

## Skip this skill

Do not run this skill when `content.refresh.yml` has `recipeReview.required: false` and every accepted `recipeImpact` is `none` or `confirm`. Stamp `refresh.validation.recipeApproved: true`, leave the recipe, and continue.

## Pre-Flight

Read all four inputs:

1. The talk's canonical content: `slides/tech-talks/<topic>/slides.js` (slides and speaker notes) for a native talk; `tech-talks/<topic>/README.md` for a Slidev talk
2. `tech-talks/<topic>/content.refresh.yml` - approved evidence and impact plan (absent for a conversion)
3. `tech-talks/<topic>/deck.recipe.yml` - current editorial decisions
4. `.github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml` - output schema

Stop when:

- The README or deck is archived.
- The refresh plan exists and is not `status: approved`.
- Accepted claims are not represented in the updated notes (native) or README (Slidev).
- Any required input is missing.

For a refresh, do not read the Slidev deck markdown; the canonical content, refresh plan, and recipe are the authoritative inputs.

### Conversion to the native engine

When the user asks to convert a Slidev tech talk, also read `slides/tech-talks/<topic>.md` for the current running order and proof slides. The review question becomes: which slides consolidate, which become shared patterns, which earn a deck scene, and how the time budget lands. Add the `slides:` per-slide plan from the template. The user's approval of that plan precedes Native Deck Author `convert`.

## Review depth

- Compact (default when this skill runs): one analysis, then user approval.
- Full: the analysis includes at least one credible alternate structure and the reason the chosen structure wins. Use only for `updateLevel: structural`, `recipeImpact: restructure`, or `slideImpact: replace-demo`.

## Review Question

Answer this question from the extracted context:

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

## Recipe Analysis

Produce one recommendation that identifies how the product model or technical thesis changed, protects practical demos and factual release status, and minimizes unnecessary churn. The user's approval is the review gate. The analysis returns:

1. `decision`: `preserve`, `revise`, or `restructure`
2. A short rationale tied to accepted refresh items
3. A field-by-field change list from the previous recipe
4. A complete recipe using the standard template schema
5. Any rejected candidate content and why it did not earn slide time

## Decision Rules

- `preserve`: Content changed, but the existing recipe remains the strongest adaptation. Update only dates or source-dependent wording outside the recipe.
- `revise`: Keep the section order and thesis; adjust emphasis, notes, agenda, or highlights.
- `restructure`: Change the thesis or section order because a headline update changes the operating model or centerpiece workflow.

A `structural` refresh does not force `restructure`; it forces an explicit alternate-structure check.

## Write and Report

1. Overwrite `tech-talks/<topic>/deck.recipe.yml` with the complete synthesized recipe.
2. Add a concise header comment containing the refresh date, review decision, and rationale.
3. Validate YAML and the standard recipe quality checks.
4. Set `refresh.validation.recipeApproved: true` in `content.refresh.yml`.
5. Report the decision and material recipe changes, and wait for user approval before slide generation.

## Post-Recipe Workflow

Native talks (`slides/tech-talks/<topic>/slides.js` exists):

- `preserve`: edit only the slide data and notes whose claims are now false.
- `revise` with `slideImpact: patch`: Native Deck Author `patch` mode; keep ids, order, and scenes.
- `restructure` or `slideImpact: regenerate|replace-demo`: Native Deck Author with the talk path; it rebuilds the affected parts and reuses scenes that still prove their claims.
- Conversion: Native Deck Author `convert`.

Slidev talks not yet converted:

- `preserve`: do not regenerate slides. Patch existing slides only if a visible claim is now false.
- `revise` with `slideImpact: patch`: edit the existing deck; do not wipe it.
- `restructure` or `slideImpact: regenerate|replace-demo`: convert the talk to native with Native Deck Author `convert` (preferred), or invoke the legacy Tech Talk Slide Generator with the talk path.

After any slide change:

1. Native: `cd slides; npm run validate:native -- tech-talks/<topic>`. Slidev: run the single-deck build.
2. Run `node slides/scripts/sync-index-dates.mjs` from the repository root.
3. Update `content.refresh.yml` validation fields.
