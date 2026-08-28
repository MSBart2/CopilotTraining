---
name: ledger-tech-talk-refresh
description: "Refresh existing tech talks from proposal-created decisions in .github/content-routing/ledger.json, or from a named talk even when the ledger is empty. Use for implementing the routing inbox, applying ledger proposals, refreshing impacted talks, processing the content refresh queue, or closing feed-driven talk updates. Orchestrates content.refresh.yml and README updates; cross-model recipe review and full slide regen only when the plan requires them."
argument-hint: "[talk slug|all] [plan-only|apply]"
---

# Ledger Tech-Talk Refresh

Turn adjudicated routing decisions into complete, validated tech-talk updates. The ledger selects work; linked first-party sources establish facts; the existing refresh skills control content and deck quality.

## Inputs

- Required ledger: `.github/content-routing/ledger.json`
- Target: one talk slug, a user-provided set of slugs, or `all`
- Mode:
  - `plan-only`: create proposed refresh plans and stop for approval
  - `apply`: create and apply plans through README, recipe, slides, validation, and ledger closure
- Optional user emphasis or priority

When the user names a talk without a mode, default to `plan-only`. A direct request to implement, apply, complete, or refresh the queue counts as approval for `apply` mode.

An explicit `all apply` invocation approves every generated talk plan in that serial queue. Do not pause between talks unless verification materially changes scope, evidence is unresolved, or a required validation fails.

## Composition

Invoke existing repository workflows rather than reproducing them:

1. `content-refresh` for evidence verification and `content.refresh.yml`
2. `deck-recipe-refresh` only when `recipeReview.required` is true
3. Existing-deck patch for `slideImpact: patch`; Tech Talk Slide Generator only for `regenerate` or `replace-demo`
4. `build-slidev-decks` for single-deck validation when slides changed
5. `workbench` for relevant cross-talk context and end-of-session learning

## Queue Selection

Read the ledger and select only decisions where:

- `decision.status` is `proposal-created`
- `decision.materiality` is `reference`, `content`, or `structural`
- `decision.talk` matches the requested target

Group selected decisions by talk. Every talk gets one refresh plan containing all of its selected events; never create one plan per event.

For `all`, process talks serially. Prioritize:

1. Deprecations, retirements, deadlines, broken setup, or incorrect claims
2. Product behavior, controls, security boundaries, and setup changes
3. Supporting evidence, metrics, examples, and references

Within the same priority, prefer the talk that explains the feature before talks that apply, govern, depend on, or reference it. Do not edit the same ledger or generated index concurrently.

If no matching proposals remain:

- Named talk: do **not** stop. Hand off to `content-refresh` with cutoff = README `updated`, run `npm run content:route -- --since <cutoff>`, and check first-party product sources. An empty ledger means "no adjudicated inbox item," not "the talk is current."
- `all` with no named talk: report that the inbox is empty and stop.

## Pre-Flight Per Talk

Before generating a plan:

1. Confirm `tech-talks/<talk>/README.md` exists.
2. Read frontmatter and stop if `status: archived`.
3. Read major README sections and `deck.recipe.yml` when present.
4. Read every selected ledger event, materiality, reason, and source from the latest routing report.
5. Read relevant Workbench topic maps for cross-cutting subjects.
6. Check for an existing `content.refresh.yml`:
   - Merge still-relevant uncompleted evidence.
   - Preserve validated work already represented in the README.
   - Overwrite stale or superseded planning data using the current template.

The local hypothesis must be explicit: identify which current claim, workflow, setup step, decision rule, status, demo, or boundary is changed by the ledger evidence. The cheapest check is comparison against the owning README section and the first-party source.

## Verify Evidence

The Microsoft Developer Changelog and routing report are discovery inputs, not factual authority.

For each selected event:

1. Open the linked first-party announcement and documentation.
2. Verify exact behavior, status, availability, dates, settings, commands, limitations, billing, and migration requirements relevant to the talk.
3. Compare those facts with the current README and recipe.
4. Downgrade or reject the proposal if it does not change the talk's thesis, workflow, decision guidance, demo, setup, status, evidence, or product boundary.
5. Record rejected candidates under `ignored` with a reason; do not silently delete the ledger decision.

Treat future-dated, duplicate, malformed, inaccessible, or contradictory entries as anomalies. Do not promote them into content without confirmation.

## Create The Refresh Plan

Invoke `content-refresh` and create or overwrite `tech-talks/<talk>/content.refresh.yml` from its template.

The plan must:

- List every selected ledger event as accepted, ignored, removed, or anomalous.
- Include the ledger event ID in each accepted or ignored item when the schema permits an additional field.
- Map accepted evidence to a current or proposed README section.
- Prefer replacing stale or lower-value material over appending a changelog section.
- State recipe and slide impact.
- Use the highest required update level across accepted items.
- End with `refresh.status: proposed` in `plan-only` mode.

Present one concise summary per talk: accepted changes, rejected changes, update level, affected sections, and expected deck impact.

## Approval Gate

In `plan-only` mode, stop after all requested plans are written and summarized.

In `apply` mode:

1. Treat the user's direct implementation request as plan approval.
2. For `all apply`, carry that approval across the complete serial queue.
3. Set `refresh.status: approved` and record the approval date before editing each README.
4. If verification materially changes the requested scope, pause for approval instead of applying a surprising plan.

## Apply One Talk

Complete one talk end to end before starting the next:

1. Patch the README as a coherent technical article.
2. Update frontmatter `updated` and verified first-party references.
3. Preserve unrelated content and working artifacts.
4. Remove or replace stale claims called out by the plan.
5. Validate that the README still answers one clear central question.
6. Set `refresh.validation.readmePatched: true` only after focused content validation.

Branch by the cheap-path table in `content-refresh`:

- `reference` or `slideImpact: none`: validate README links; leave recipe and deck unless a visible slide claim is now false.
- `content` with `recipeImpact: none|confirm` and `slideImpact: none|patch`: no cross-model review. Patch the existing deck if needed. Single-deck build only.
- `content` with `recipeImpact: revise` or `slideImpact: regenerate`: compact recipe refresh, then targeted slide work. Do not wipe the deck unless the recipe skeleton changed.
- `structural`, `headline`, `recipeImpact: restructure`, or `slideImpact: replace-demo`: full `deck-recipe-refresh` with the Rubber Duck gate, then Tech Talk Slide Generator, then single-deck build.

Never invoke cross-model recipe review to confirm a recipe you already intend to keep.

When slides change:

1. Follow repository Slidev instructions.
2. Invoke `build-slidev-decks` for the single deck.
3. Run `node slides/scripts/sync-index-dates.mjs` from the repository root.
4. Update all applicable `content.refresh.yml` validation flags. Set `slidesRegenerated: true` only after a full regen; for a patch, leave it false and rely on `deckBuildPassed`.

Do not mark ledger work complete when any required validation is false or unavailable.

## Close Ledger Decisions

After a talk passes every required gate, update only its selected decisions in `.github/content-routing/ledger.json`:

- Implemented change: `status: accepted`
- Verified no content obligation: `status: rejected`
- Keep `materiality` as adjudicated unless verification proves it wrong.
- Replace `reason` with a concise outcome that names the updated section or explains rejection.
- Never leave an implemented item in `proposal-created` or otherwise active status when the content has already been merged.

Leave the parent event `status: adjudicated`. Do not modify unrelated decisions.

This is the cleanup step that prevents the feed report from turning into stale backlog. The report is regenerated; the ledger is the durable state that ensures old work is closed instead of lingering as repeat work.

Then:

1. Update the ledger's top-level `updated` date.
2. Run `npm run test:content-routing`.
3. Run `npm run content:route` to regenerate `latest-report.json` and `latest-report.md`.
4. Confirm completed decisions no longer appear as `proposal-created`.
5. Run diagnostics and `git diff --check`.

If a validation fails, leave the affected decision as `proposal-created`, report the blocker, and continue only when later talks do not depend on the failed work.

## Quality Gate

A talk is complete only when:

- Every selected ledger proposal has an explicit accepted or rejected outcome.
- Every accepted factual claim has a first-party source.
- Preview, experimental, GA, deprecated, and retired states are explicit.
- The README remains reader-first rather than becoming a release-note dump.
- `content.refresh.yml` accurately records approval and validation.
- Required cross-model recipe review is complete.
- Required slides are regenerated and the single-deck build passes.
- Index dates are synchronized after slide changes.
- Ledger and generated reports agree.
- Unrelated dirty-worktree changes remain untouched.

## Final Report

Report:

1. Talks completed, rejected, skipped, or blocked
2. Material README and recipe changes
3. Deck build results
4. Ledger decisions closed and proposals remaining
5. Any anomalies, unresolved facts, or follow-up work