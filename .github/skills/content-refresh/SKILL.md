---
name: content-refresh
description: "Use when refreshing existing tech talks from the Microsoft Developer Changelog feed. Produces an evidence-backed content.refresh.yml that maps relevant announcements to README changes and recipe-review impact. Triggers: refresh content, changelog update, feed update, latest news, content refresh plan. Named-talk refresh continues even when the ledger has no proposal-created items."
infer: true
---

# Content Refresh

Turn Microsoft Developer Changelog entries into a small, reviewable update plan for an existing tech talk. This workflow updates existing content; it does not use the greenfield Tech Talk Generator research brief.

## Cheap path (default)

Most refreshes are README wording. Do not start a cross-model recipe review or wipe the deck unless the evidence forces it.

| Highest accepted impact | Recipe | Slides | Cross-model review |
|---|---|---|---|
| `reference` + `slideImpact: none` | leave recipe | leave deck | no |
| `content` + `recipeImpact: none\|confirm` + `slideImpact: none\|patch` | date/wording only, no review | patch existing slides or skip | no |
| `content` + `recipeImpact: revise` or `slideImpact: regenerate` | compact recipe refresh | targeted regen or patch | Rubber Duck gate only if recipe fields change |
| `structural`, any `headline`, `recipeImpact: restructure`, or `slideImpact: replace-demo` | full recipe refresh | full deck regen | Rubber Duck gate required |

Never treat an empty 7-day feed report or an empty ledger as "this talk is current."

## Inputs

- Talk path: `tech-talks/<topic>/`
- Feed: `https://developer.microsoft.com/api/changelog/rss`
- Optional cutoff date. If omitted, use the README `updated` date.
- Optional user emphasis, such as "call out BYOK and open source models."
- Ledger is optional. A named-talk request proceeds from the README cutoff even when `.github/content-routing/ledger.json` has no `proposal-created` items.

## Discovery

1. Run `npm run content:route -- --since <cutoff>` from the repo root. Default `LOOKBACK_DAYS=7` is too short for a talk last updated more than a week ago.
2. Read `latest-report.md` as a hint, not a gate.
3. Also check the talk's first-party product sources newer than the cutoff. For Copilot CLI that is the [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference), [github/copilot-cli releases](https://github.com/github/copilot-cli/releases), and the weekly GitHub changelog posts. Do not stop at the Microsoft Developer Changelog.
4. Fetch each first-party URL once; retry once on network failure; then proceed with whatever sources succeeded. Do not loop on `fetch_webpage`.

## Source Policy

The feed is the discovery and routing source. The linked first-party release notes or documentation are the factual source of truth.

For every candidate announcement:

1. Read the feed metadata and linked source.
2. Confirm exact behavior, release status, availability, settings, commands, limitations, and dates from first-party material.
3. Exclude adjacent product news unless it materially changes this talk's subject.
4. Treat future-dated, duplicate, malformed, or contradictory feed entries as anomalies. Record them; do not promote them into content without confirmation.

## Pre-Flight

1. Confirm `tech-talks/<topic>/README.md` exists and is not archived.
2. Read the README frontmatter and major section markers.
3. Read `deck.recipe.yml` when present to understand current editorial intent.
4. Read relevant Workbench topic coverage maps when the update touches a cross-cutting topic.

## Triage

Assign each verified candidate:

- `headline`: Changes the talk's thesis, a major workflow, or the primary demo.
- `supporting`: Strengthens or updates an existing section without changing the thesis.
- `reference`: Updates status, availability, wording, or evidence only.
- `ignore`: Relevant to GitHub Copilot broadly but not to this talk.

Assign one update level for the talk:

- `reference`: References or status only. No recipe review or slide regeneration.
- `content`: README content changes fit the existing narrative. Patch the deck or leave it unless a slide claim is now false.
- `structural`: The thesis, section order, weighting, highlights, or demo changes. Full recipe review and deck regen.

Escalate to `structural` when any `headline` item changes the operating model, replaces a centerpiece demo, or invalidates a recipe highlight.

Set `recipeReview.required: true` only for `structural`, `recipeImpact: restructure`, or `slideImpact: replace-demo`. Otherwise `false`.

Prefer `slideImpact: patch` when an existing slide already names the feature and only copy/status must change. Use `regenerate` only when the recipe or section skeleton must change. Use `none` when the deck already states the fact.

## Output

Create or overwrite `tech-talks/<topic>/content.refresh.yml` using `CONTENT-REFRESH-TEMPLATE.yml` from this skill folder. If the file already exists, edit it in place — `create_file` fails on an existing path.

The plan must:

- Cover entries newer than the cutoff through the feed's `lastBuildDate`.
- Separate additions, replacements, removals, and ignored items.
- Map every accepted change to a current or proposed README section.
- State recipe impact and slide/demo impact explicitly.
- Preserve source URLs and verified dates.
- Include anomalies and unresolved facts.
- End in `status: proposed` until the user approves it.

Present a concise summary and wait for approval before editing the README. A direct user instruction to apply a plan counts as approval; set `status: approved` and record the approval date before content edits.

## Apply an Approved Plan

1. Set `refresh.status: approved` and `refresh.approved: YYYY-MM-DD` before editing the README.
2. Patch the README as a reader-first technical article. Do not append a changelog dump.
3. Update frontmatter `updated` and verified references.
4. Preserve unrelated material and working artifacts unless the plan replaces them.
5. Follow the cheap-path table. Do not invoke cross-model recipe review or wipe `slides/tech-talks/<slug>.md` for confirm/patch work.
6. If `recipeReview.required` is true, invoke `deck-recipe-refresh`.
7. If `slideImpact` is `patch`, edit the existing deck in place and run a single-deck build. If `regenerate` or `replace-demo`, invoke the Tech Talk Slide Generator only after the recipe is settled.
8. One network or subagent failure: retry once, then continue with local files. Do not regenerate the same deck twice because a fetch failed.

## Quality Gate

- Every accepted claim has a first-party source.
- Preview, GA, experimental, deprecated, and retired states remain explicit.
- The README still answers one clear question.
- New material displaces stale or lower-value content rather than only increasing length.
- Cross-talk candidates are routed in `ignored` or `relatedTalks`; they are not silently lost.
