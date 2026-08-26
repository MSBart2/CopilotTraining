# Announcement Feed Refresh for Tech Talks

This workflow keeps existing tech talks aligned with the Microsoft Developer Changelog without turning the repo into a release-note dump.

## Why this exists

GitHub Copilot and related product surfaces change quickly. When a release, deprecation, preview state, or setup change matters to an existing talk, we need a repeatable way to:

- find relevant announcements,
- verify the facts against first-party docs,
- update the owning README,
- decide whether the deck recipe or slides need regeneration,
- and close the routing decision in the ledger.

## The source of truth

Use the feed as the discovery channel, not as final evidence.

- Discovery source: Microsoft Developer Changelog RSS feed
- Factual source: linked first-party release notes, docs, or product docs
- Routing/decision store: `.github/content-routing/ledger.json`
- Generated report: `.github/content-routing/latest-report.md`

## Workflow

### 1) Route the feed

Run the router from the repo root:

```bash
npm run content:route -- --since <README-updated-date>
```

This reads the feed, compares it to the coverage registry, and writes the latest routing report. Default lookback is 7 days — always pass `--since` for a named talk whose README is older than that.

### 2) Review the ledger and pick a talk

Open `.github/content-routing/ledger.json` and select proposals for one talk or for all talks. Only work on `proposal-created` items that match the talk's scope.

A named talk with no `proposal-created` rows is **not** current. Continue with `content-refresh` from the README cutoff and first-party product sources. Stop only when the user asked for `all` and the inbox is empty.

### 3) Verify the evidence

For each proposal:

- read the Microsoft feed item,
- follow the first-party link,
- confirm status, behavior, setup, limitations, and timing,
- compare it to the current README and recipe,
- reject weak or irrelevant items.

A proposal is only worth acting on when it changes the talk's thesis, workflow, setup, status, demo, or evidence.

### 4) Create a refresh plan

Use the refresh skill for a specific talk:

```text
content-refresh
```

This produces or updates `tech-talks/<topic>/content.refresh.yml` using the skill template. The plan must include:

- accepted changes,
- ignored or rejected items,
- updated sections in the README,
- recipe impact,
- slide/demo impact,
- unresolved anomalies.

### 5) Apply the approved plan

Once approved, update the README as a reader-first technical article, not as a changelog dump.

Then:

- update the frontmatter `updated` field,
- replace stale or lower-value material,
- re-check the central question the talk answers,
- decide whether the update is `reference`, `content`, or `structural`.

### 6) Refresh the deck recipe when needed

Skip Agent Council when `recipeReview.required` is false and every `recipeImpact` is `none` or `confirm`.

If the content or structure changes materially (`recipeReview.required: true`), run:

```text
deck-recipe-refresh
```

That produces or refreshes `tech-talks/<topic>/deck.recipe.yml` based on the README and accepted evidence. Compact council is the default; full 3-phase council is for structural / restructure / replace-demo only.

### 7) Update slides and validate

If an existing slide already covers the fact, **patch** it. Wipe-and-regenerate only when the recipe skeleton or a centerpiece demo changed. Then validate the single deck build:

```bash
node slides/scripts/sync-index-dates.mjs
```

Then validate the deck using the repo's Slidev instructions and the deck build scripts.

### 8) Close the ledger

After a talk passes validation:

- update selected ledger decisions to `accepted` or `rejected`,
- preserve the parent event as `adjudicated`,
- update the top-level ledger timestamp,
- rerun the routing tests and generate the latest report.

## Files involved

- `.github/content-routing/ledger.json` — queue and adjudication state
- `.github/content-routing/latest-report.md` — human-readable feed routing report
- `.github/content-routing/latest-report.json` — machine-readable routing output
- `.github/skills/content-refresh/SKILL.md` — plan-and-verify workflow
- `.github/skills/ledger-tech-talk-refresh/SKILL.md` — end-to-end queue execution
- `tech-talks/<topic>/content.refresh.yml` — per-talk refresh plan
- `tech-talks/<topic>/README.md` — canonical updated talk content
- `tech-talks/<topic>/deck.recipe.yml` — recipe for slide generation

## Rules to keep

- The feed is a discovery source, not the final authority.
- First-party docs are the factual source of truth.
- Do not append a release-note dump to the README.
- Prefer replacing stale content over adding more length.
- Only update one talk at a time in a full apply flow.
- If verification changes the scope, pause and ask for approval.
- Archived content is never modified.
- Latest report files are transient snapshots; they are regenerated and should not be treated as a permanent backlog.
- Any implemented announcement that came from the ledger must be closed as `accepted`, `rejected`, or `no-impact`. A named-talk refresh that started with an empty inbox must not invent ledger rows.
- Do not start Agent Council or wipe a deck to confirm a recipe you already intend to keep.

## Quick checklist

Before editing a talk, confirm:

- [ ] README exists and is not archived
- [ ] relevant feed item is verified against first-party docs
- [ ] the change materially affects this talk
- [ ] the refresh plan is proposed or approved
- [ ] recipe is refreshed only when `recipeReview.required` is true
- [ ] existing slides are patched unless the recipe skeleton or a demo changed
- [ ] ledger status is updated only for selected inbox items

## Related references

- [tech-talks/README.md](../../tech-talks/README.md)
- [AGENTS.md](../../AGENTS.md)
- [.github/skills/content-refresh/SKILL.md](../../.github/skills/content-refresh/SKILL.md)
- [.github/skills/ledger-tech-talk-refresh/SKILL.md](../../.github/skills/ledger-tech-talk-refresh/SKILL.md)
