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

This repository serves real people doing real work in real environments. Every artifact must stay grounded in a recognizable person, a consequential task, the constraints surrounding that task, and an outcome that matters in practice.

- **Show capability in motion** — use working artifacts, commands, configurations, workflows, and observable results. Let the audience see what becomes possible and how it behaves.
- **Teach through proof** — connect explanation to a demonstration, inspection, or validation that the audience can reproduce. Documentation summaries provide supporting context; they are never the main event.
- **Build practical judgment** — help the audience decide what to try, what context it needs, what evidence makes it acceptable, and what to do when the result differs from expectations.
- **Stay optimistic** — lead with useful possibility, earned progress, and credible next moves. Present boundaries and failures as information that helps people operate the capability well.

Academic framing, abstract taxonomies, and product-documentation tours do not earn space on their own. Include theory or feature detail only when it clarifies a real decision, explains observed behavior, or enables successful practice.

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

### Tech Talk Narrative Contract

A practitioner tech talk is a coherent argument for one consequential decision. The template supplies coverage prompts; it does not supply the narrative or require its headings to become the running order.

- **Begin with a person in motion** — name the practitioner, the real workflow, the decision in front of them, and the consequence of that decision.
- **Build around one useful tension** — choose an honest tradeoff, boundary, or surprising mechanism that changes how the audience approaches the decision. Every section must advance that thesis.
- **Give the section spine momentum** — use escalating audience questions or practitioner moves rather than a taxonomy of product parts, control types, or settings pages.
- **Follow an earned arc** — move from situation and question → insight or decision model → technical mechanism → working artifact or demonstration → observable evidence and boundaries → transfer to the audience's work. A strong demonstration may serve as the cold open when seeing the result first makes the later architecture matter.
- **Make the artifact carry the argument** — use a real configuration, command, workflow, or code path to expose the mechanism. Show the result, failure signal, and recovery path.
- **Choose one memorable anchor** — identify the demonstration, result, number, or technical reveal the audience should repeat after the talk, then build the surrounding explanation to earn it.
- **Spend time according to value** — give the strongest insight and demonstration the most room. Consolidate supporting mechanics and remove sections that do not change a decision or strengthen proof.
- **Use optimistic curiosity in an expert-to-expert register** — lead with what becomes possible, what the pattern unlocks, and how it works. Keep tradeoffs concrete and avoid alarmism, pain-led framing, and comparative negativity.

For a new talk, approve a research brief and structural proposal before drafting. The proposal must identify the audience, question, thesis, tension, artifact, evidence, boundary, and intended transfer. Skip this gate only when the user explicitly requests it.

Avoid feature inventories that do not improve judgment, frictionless success stories, conversion narratives, and claims whose confidence is unclear.

### Content Fitness Gate

Every published talk or module must be all three:

- **Relevant** — begins with a named person or audience in a recognizable situation, facing a consequential decision in a realistic workflow. Establish who needs the judgment, when they need it, and what outcome the decision affects. Product breadth, novelty, and release timing alone do not establish relevance.
- **Compelling** — earns attention by changing how the audience understands or approaches that decision. Use a useful insight, honest tension, consequential tradeoff, or working demonstration that offers more than a feature inventory or documentation tour.
- **Actionable** — enables the audience to transfer the judgment into its own environment. Provide a decision method, usable artifact or concrete next step, observable evidence, and a boundary, recovery path, or escalation route when the result is wrong.

Evaluate the gate with three questions:

1. **Relevant:** Can the artifact name the person, workflow, decision, and consequence?
2. **Compelling:** Can it state the insight that earns attention without listing product features?
3. **Actionable:** Can the audience produce or inspect evidence in its own environment and know what to do when that evidence fails?

Revise or reconsider content that misses any dimension. Feature coverage, novelty, and presentation polish cannot compensate for a weak decision or missing transfer.

### Universal Voice and Prose Contract

`AGENTS.md` is the canonical source for editorial policy across workshops, practitioner tech talks, executive talks, and slides. Format-specific agents and templates may add audience or artifact constraints, but must not weaken or contradict this contract.

- **Respectful** — preserve dignity, use no gatekeeping, and write for capable peers calibrating a practice. Treat successful existing approaches as valid context rather than something the audience must renounce.
- **Optimistic curiosity** — lead with what becomes possible. Use opportunity and discovery framing, invite useful experimentation, and show progress without hype or manufactured urgency.
- **Practical** — focus on what works. Prefer concrete decisions, artifacts, examples, and observable checks over abstractions or feature inventories.
- **Honest** — acknowledge limitations and tradeoffs. Name failure signals, recovery paths, authority boundaries, and escalation routes as useful operating constraints.
- **Encouraging** — celebrate demonstrated progress and normalize learning, iteration, and recovery. Give the audience a credible next move when an attempt fails.
- **Direct-positive prose** — state the desired behavior or useful claim directly. Avoid rhetorical flips such as "not X, but Y," comparative negativity, and deficit framing.
- **Evidence discipline** — distinguish sourced facts, observed results, estimates, and proposed targets. Never invent metrics or present a target as an achieved result.
- **Clear language** — front-load the point, use active voice, keep sentences purposeful, and remove prose that exists only to sound impressive.

Apply these format-specific modes:

| Format | Framing | Voice | Lead with |
|---|---|---|---|
| **Workshop** | A realistic attempt, inspection, adjustment, and validation | Respectful across experience levels; persona-authentic | What participants build, test, and validate |
| **Practitioner tech talk** | Opportunity and discovery | Optimistic curiosity; expert-to-expert | What this unlocks, what is now possible, and how it works |
| **Executive talk** | Business context, industry analogy, and organizational implication | Authoritative, accessible, strategic, and third-person | The decision, owner, tradeoff, evidence, and revisit signal |

Practitioner talks tell a good-news story centered on useful capability and earned confidence. They avoid pain-led framing, alarmism, and comparisons that diminish existing practice. Avoid shame, threat framing, unsupported superlatives, frictionless success stories, and claims whose confidence is unclear in every format.

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
