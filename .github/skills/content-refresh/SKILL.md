---
name: content-refresh
description: "Use when refreshing existing tech talks from the Microsoft Developer Changelog feed. Produces an evidence-backed content.refresh.yml that maps relevant announcements to README changes and recipe-review impact. Triggers: refresh content, changelog update, feed update, latest news, content refresh plan."
infer: true
---

# Content Refresh

Turn Microsoft Developer Changelog entries into a small, reviewable update plan for an existing tech talk. This workflow updates existing content; it does not use the greenfield Tech Talk Generator research brief.

## Inputs

- Talk path: `tech-talks/<topic>/`
- Feed: `https://developer.microsoft.com/api/changelog/rss`
- Optional cutoff date. If omitted, use the README `updated` date.
- Optional user emphasis, such as "call out BYOK and open source models."

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
- `content`: README content changes fit the existing narrative. Council confirms or adjusts the recipe before slide regeneration.
- `structural`: The thesis, section order, weighting, highlights, or demo changes. Council explicitly re-evaluates the recipe before slide regeneration.

Escalate to `structural` when any `headline` item changes the operating model, replaces a centerpiece demo, or invalidates a recipe highlight.

## Output

Create or overwrite `tech-talks/<topic>/content.refresh.yml` using `CONTENT-REFRESH-TEMPLATE.yml` from this skill folder.

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

1. Patch the README as a reader-first technical article. Do not append a changelog dump.
2. Update frontmatter `updated` and verified references.
3. Preserve unrelated material and working artifacts unless the plan replaces them.
4. If update level is `reference`, stop after validating links and content structure.
5. If update level is `content` or `structural`, invoke the `deck-recipe-refresh` skill.
6. After the refreshed recipe is approved, invoke the Tech Talk Slide Generator and validate the generated deck.

## Quality Gate

- Every accepted claim has a first-party source.
- Preview, GA, experimental, deprecated, and retired states remain explicit.
- The README still answers one clear question.
- New material displaces stale or lower-value content rather than only increasing length.
- Cross-talk candidates are routed in `ignored` or `relatedTalks`; they are not silently lost.
