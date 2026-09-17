# CopilotTraining Agent Instructions

---

## Repository Structure

Three content types, each with dedicated agents:

- **`workshop/`** — Hands-on training modules with personas, exercises, and metrics → use `module-planner` or `module-creator` agents
- **`tech-talks/`** — Technical deep-dives for practitioners → use `Tech Talk Generator` agent
- **`tech-talks/exec-*`** — Executive thought leadership for strategic decision-making → use `Exec Talk Generator` agent

---

## Content Rules (apply everywhere)

### Education North Star

> Great Copilot education helps capable people form better judgment about context, delegation, verification, and authority, then lets them prove that judgment in their own work.

Treat the audience as capable peers calibrating a new way of working, not converts waiting to be convinced. Product knowledge earns space when it improves a decision or enables useful practice.

### Judgment and Transfer Contract

Each artifact must develop at least one relevant judgment lens. Select the lenses the topic genuinely needs; do not force all four into every section.

| Lens | Question the audience becomes better able to answer |
|---|---|
| **Context** | What information, environment, and constraints make this task ready for Copilot? |
| **Delegation** | What can be handed off, what stays human-led, and how is the handoff bounded? |
| **Verification** | What observable evidence makes the result acceptable, and how do we recover when it is wrong? |
| **Authority** | Who may propose, execute, approve, reject, or escalate this work? |

Content proves transfer when the audience can:

1. make a decision rather than repeat a feature description,
2. produce or inspect observable evidence,
3. recognize a boundary, failure signal, or escalation path, and
4. adapt the decision to a real repository, workflow, or organization.

Apply the contract by format:

- **Workshop:** use an attempt → inspect → adjust → rerun → validate loop. Planned metrics are targets until participants produce evidence. End with an explicit transfer question about their own work.
- **Tech talk:** teach a decision model, demonstrate it through a working artifact, validate the outcome, and name when the pattern stops fitting. Leave practitioners with a concrete application to their own repository or workflow.
- **Executive talk:** clarify the decision, owner, authority boundary, tradeoff, and success signal. Distinguish sourced facts, observed results, estimates, and proposed targets.

Avoid feature inventories that do not improve judgment, frictionless success stories, conversion narratives, and claims whose confidence is unclear.

### Content Fitness Gate

Every published talk or module must be all three:

- **Relevant** — serves a named audience, a realistic workflow, and a decision that matters now.
- **Compelling** — earns attention through a useful insight, honest tradeoff, or demonstration beyond product description.
- **Actionable** — leaves the audience with a concrete artifact or next step, observable evidence, and a way to apply the practice in their own work.

Revise or reconsider content that misses any dimension. Feature coverage, novelty, and presentation polish cannot compensate for a weak decision or missing transfer.

### Universal Voice and Prose Contract

`AGENTS.md` is the canonical source for editorial policy across workshops, practitioner tech talks, executive talks, and slides. Format-specific agents and templates may add audience or artifact constraints, but must not weaken or contradict this contract.

- **Capable peers** — write for professionals calibrating a practice. Respect successful existing approaches and avoid conversion narratives.
- **Optimistic curiosity** — lead with what becomes possible. Use opportunity and discovery framing without manufacturing urgency.
- **Direct-positive prose** — state the desired behavior or useful claim directly. Avoid rhetorical flips such as "not X, but Y," comparative negativity, and deficit framing.
- **Practical specificity** — prefer concrete decisions, artifacts, examples, and observable checks over abstractions or feature inventories.
- **Honest boundaries** — name limitations, tradeoffs, failure signals, and escalation paths as useful operating constraints.
- **Evidence discipline** — distinguish sourced facts, observed results, estimates, and proposed targets. Never invent metrics or present a target as an achieved result.
- **Clear language** — front-load the point, use active voice, keep sentences purposeful, and remove prose that exists only to sound impressive.

Avoid alarmism, shame, threat framing, unsupported superlatives, frictionless success stories, and claims whose confidence is unclear. Audience-specific refinements remain local: practitioner content stays expert-to-expert, executive content stays third-person and decision-oriented, and workshops preserve authentic persona voice through the repository persona source.

**Archived content is frozen.** Any file with `status: archived` in frontmatter must never be modified by any agent. Stop and inform the user.

**All content files require frontmatter:**

```yaml
status: active # or "archived"
updated: YYYY-MM-DD
```

Tech talks and exec talks also require `section:` matching a valid value from `slides/SECTIONS.md`.

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
| `workshop/` or `tech-talks/exec-*` | **Slide Generator** — cockpit HTML templates |

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

Before committing slide or companion changes, invoke the **Deploy** agent as a subagent
(`.github/agents/deploy.agent.md`):

1. `cd slides && npm run check-companions -- --strict` (hard gate)
2. Regen stale agendas + compact PDFs for the dirty scope
3. `npm run sync-index` if decks changed
4. Re-check, then **snarky commit** including `slides/companions/**`
5. **Refuse** commit when companions are missing/older than their decks
6. Push the current branch after a successful commit; never force-push

Do not commit deck-only changes that leave companions untracked or stale.
