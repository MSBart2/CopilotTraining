# CopilotTraining Agent Instructions

> **Quick reference:** `AGENTS.aaak` — condensed orientation for agents (sections, slide rules, personas, gotchas). Load it at session start for fast context without reading all the full docs.

---

## Repository Structure

Three content types, each with dedicated agents:

- **`workshop/`** — Hands-on training modules with personas, exercises, and metrics → use `module-planner` or `module-creator` agents
- **`tech-talks/`** — Technical deep-dives for practitioners → use `Tech Talk Generator` agent
- **`exec-talks/`** — Executive thought leadership for strategic decision-making → use `Exec Talk Generator` agent

---

## Content Rules (apply everywhere)

**Archived content is frozen.** Any file with `status: archived` in frontmatter must never be modified by any agent. Stop and inform the user.

**All content files require frontmatter:**

```yaml
status: active # or "archived"
updated: YYYY-MM-DD
```

Tech talks and exec talks also require `section:` matching a valid value from `slides/SECTIONS.md`.

---

## Tone and Voice

Respectful · Practical · Honest · Outcome-based. Full voice rules, persona quick reference, and before-submit checklist: `AGENTS.aaak`.

---

## Workbench — Project Memory

Institutional knowledge lives in `memories/` as Markdown files organized by **bench** (domain folder) and **drawer** (typed file). **Cardinal rule: the Workbench suggests; repo files confirm.**

Agents query the relevant drawer after pre-flight gates complete, before content generation. Writes happen at session END only, after one-shot user approval. Full usage patterns: `@workbench` skill.

**When anything doesn't go as expected — a command fails, a convention is unclear, behavior is surprising, or you're about to iterate through guesses — query the Workbench before proceeding.** It contains verified solutions, known gotchas, and prior decisions. Use `@workbench` as your first response to uncertainty, not a last resort.

---

## Agent Invocation Guidelines

Keep subagent prompts minimal — agents already have this file and their own `.agent.md` instructions. Full guidance: `AGENTS.aaak`.

---

## Announcement-Driven Tech Talk Refresh

Use the announcement feed to keep existing tech talks current without rewriting them as release notes.

### Source hierarchy

1. Microsoft Developer Changelog RSS feed — discovery and routing source
2. Linked first-party docs or release notes — factual source of truth
3. Existing talk README and recipe — compare against current claims
4. `.github/content-routing/ledger.json` — approved work queue and decision log

### Standard flow

1. Run `npm run content:route -- --since <README updated>` from the repo root. Default 7-day lookback is not enough for an older talk.
2. Read the generated report and `.github/content-routing/ledger.json`. An empty ledger is not a stop for a named talk.
3. Verify candidates against first-party docs **and** the product's own release notes / command reference. The Microsoft feed is discovery only.
4. Create or update `tech-talks/<topic>/content.refresh.yml` using the `content-refresh` skill.
5. After approval, patch the talk README as a reader-first article, not a changelog dump.
6. Follow the cheap-path table in `content-refresh`. Cross-model recipe review + full deck regen only for structural / restructure / replace-demo. Confirm/patch work stays in the existing deck.
7. Normalize any selected ledger status to `accepted` or `rejected` after validation. Do not invent ledger rows for a named-talk refresh that started with an empty inbox.

### When to use it

Use this workflow for:

- new product announcements that materially affect a live talk,
- status changes such as GA, preview, deprecation, or retirement,
- demo or setup changes that invalidate existing instructions,
- removing stale references that no longer match current behavior.

### Guardrails

- Do not treat feed entries as fact without a first-party source.
- Do not append an announcement dump to a README.
- Do not update archived talks.
- Do not regenerate slides before the README and recipe are approved.
- Do not leave an implemented feed decision in `proposal-created` state. Closing it in the ledger is required before the report is considered clean.
- Treat `.github/content-routing/latest-report.*` as a transient snapshot, not the durable backlog. The ledger is the source of truth.

See [docs/announcement-feed/README.md](docs/announcement-feed/README.md) for the full operating guide.

---

## Slide Generation

Two agents — pick by category:

| Category | Agent |
|---|---|
| `tech-talks/` | **Tech Talk Slide Generator** — Vue components, no raw HTML |
| `workshop/` or `exec-talks/` | **Slide Generator** — cockpit HTML templates |

Key invariants (all categories):

- `---` separator always on its own line — never `---<!-- SLIDE:` on same line
- No per-slide frontmatter (`layout:`, `class:`, `transition:`) — use CSS
- Every slide including slide 1 needs `<!-- SLIDE: Name -->` comment
- Run `node slides/scripts/sync-index-dates.mjs` after any slide change

---

## Shipping slides (Deploy agent)

Homepage **Agenda** / **PDF** chips resolve to files under
`slides/companions/<category>/<slug>/`. GitHub Pages **only copies** those
files into `dist/` — it never runs `generate-agendas` or `export-pdf`.

Before committing slide or companion changes, use the **Deploy** agent
(`.github/agents/deploy.agent.md`):

1. `cd slides && npm run check-companions -- --strict` (hard gate)
2. Regen stale agendas + compact PDFs for the dirty scope
3. `npm run sync-index` if decks changed
4. Re-check, then **snarky commit** including `slides/companions/**`
5. **Refuse** commit when companions are missing/older than their decks
6. Push only when explicitly asked

Do not commit deck-only changes that leave companions untracked or stale.
