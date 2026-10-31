---
name: deck-recipe-review
description: >
  Review a tech-talk's source material (research.md and landing README for a new talk; the
  existing deck and long README for a conversion) and produce a deck.recipe.yml covering
  section weighting, narrative arc, coverage gaps, and the per-slide plan with scene intent
  and time budget. The user's approval is the review gate.
  Always overwrites any existing recipe. Triggers: "review the talk", "create the recipe",
  "is this the best use of our time", "section weighting", "coverage gap", "recipe".
infer: true
---

# Deck Recipe Review Skill

Read the talk's source material, analyze its structure, and write `deck.recipe.yml`. This skill **always produces a fresh recipe** — it does not preserve or patch an existing one. The recipe is the authoritative input for the [Native Deck Author agent](../../agents/native-deck-author.agent.md), which writes the slides and their speaker notes.

**Key Constraints:**
- **Judgment and Transfer Contract** — Apply the universal contract in `AGENTS.md`. Protect the practitioner decision, observable proof, boundary, and own-work transfer when consolidating the source material. A section that only inventories features has not earned slide time.
- **Max 4 sections** — Consolidate during review rather than expanding. Budget emphasis within a 20-25 slide target for the complete deck and never exceed 30 slides.
- **Shared frames ensure consistency** — The native engine renders the standard slides (title, core question, contents, part openers, before/after, today, references, thanks) from shared frames. Focus the review on *narrative logic and audience fit*, and on what each body slide must prove.
- **Per-slide plan** — The recipe ends with a `slides:` list: one entry per body slide with its claim, scene intent, and `seconds`. This is where the talk's time goes, so the user approves it with the rest of the recipe.
- **Recipe schema** — Read `.github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml` to understand all valid fields before writing the output file.
- **Tech-talk voice applies to recipe guidance** — Write every field and comment in direct-positive, possibility-led language because the deck author may carry recipe wording into audience-facing content. Replace contrastive-negation constructions such as "not X, but Y," "rather than," "instead of," "unlike," and "no longer" with a direct statement of the desired behavior.

---

## When to Invoke This Skill

- After a new talk's research brief, `research.md`, and landing README are approved (called by the Tech Talk Generator agent as its final step)
- Before converting a Slidev tech talk to the native engine (via `deck-recipe-refresh`, which preserves the existing recipe as a baseline)
- User wants to revise section structure or narrative arc of an existing talk
- User questions whether a section is worth its airtime ("we're spending a whole section on X")
- User notices a topic is missing ("we never show how to build/configure/deploy Y")
- User asks to "review the talk" or check if the structure matches the audience

**Not for:** Minor wording tweaks, slide-level fixes, or adding a single slide.

---

## Pre-Flight: Gather Source Material

Read the sources for the talk's situation:

```
New talk:
  tech-talks/<topic>/research.md       — approved brief, evidence map, per-part claims, artifacts, boundaries
  tech-talks/<topic>/README.md         — landing page: frontmatter, question, thesis, part headings
Existing native talk:
  slides/tech-talks/<topic>/slides.js  — current slides and notes (the teaching source)
  tech-talks/<topic>/README.md
Slidev talk being converted:
  slides/tech-talks/<topic>.md         — current running order and proof slides
  tech-talks/<topic>/README.md         — long-form article; the source for notes
Always:
  .github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml  — recipe schema (all valid fields)
  AGENTS.md                                                   — Universal Voice and Prose Contract
```

From these, extract:
- The candidate sections: `research.md` parts, README `##` part headings, or `<!-- 🎬 MAJOR SECTION: -->` markers in a long README
- Target audience + talk duration (from README frontmatter)
- The core question the talk answers
- Key artifacts, metrics, and highlight moments
- The specific concern the user raised (if invoked manually)
- The direct-positive voice rules that the final recipe must follow

---

## Structural Analysis

Perform one structural analysis using the complete context block below. Challenge your own first answer: name the strongest alternate structure and the reason the chosen one wins.

### Context Block Template

```
TASK: [One-sentence description of the structural question]

TALK: [title], [duration], audience: [audience list]
CORE QUESTION: "[the talk's stated core question]"

CANDIDATE SECTIONS (from research.md parts, README part headings, or 🎬 markers):
1. "[Section Name]" — [2-line description of what it covers]
2. ...

CONSTRAINTS:
- Max 4 sections (no exceptions — consolidate, don't expand)
- Shared frames render the standard slides; body slides carry the argument
- Body slides: 20-25 total in the deck, each proving one claim with a visible scene
- Apply the tech-talk voice to every proposed recipe field and comment
- State desired behavior directly; avoid contrastive-negation phrasing ("not X, but Y,"
  "rather than," "instead of," "unlike," "no longer")

USER CONCERN: [Exact concern — what's taking too much space / what's missing]

KNOWN MATERIAL:
- [Any relevant artifacts, demos, or examples that already exist in the repo]
- [Any CLI commands or toolchain status that affects feasibility]
```

### Review Prompt

```
[CONTEXT BLOCK]

Analyze: Is the current section weighting the best use of the talk's time?
What change would most improve it, and why?

1. Identify the strongest narrative arc and the single highest-value structural improvement.
2. Protect practical artifacts, audience outcomes, and technical accuracy.
3. Identify which judgment lens or lenses the arc develops and where the audience proves or transfers that judgment.
4. Identify content to consolidate, demote, or remove rather than only adding material.
5. Produce a concrete `sectionOrder`, emphasis levels, agenda, and highlight changes with rationale.
6. Flag open questions and at least one credible alternate structure, with the reason the chosen structure wins.
7. Rewrite every recommendation in direct-positive, possibility-led language suitable for reuse by the deck author.
8. Plan the body slides: for each, the claim it proves, the scene (a shared pattern or a deck scene: what the audience sees settle, and the motion beat that reveals it), and a seconds budget.
```

---

## Final Recipe Direction

Turn the analysis into these outputs, written in the direct-positive tech-talk voice:

1. **Verdict** (2-3 sentences) — the core structural problem and fix
2. **`arcToc`** — one line ≤ 80 chars, section names joined by ` → `
3. **`arcNarrative`** — a prose paragraph: what each section sets up for the next, where peak engagement lands, and why the ordering beats alternatives
4. **Concrete `sectionOrder`** with `sectionModes` (emphasis + one-line note per section)
5. **Updated `highlightMoments`** list — what to drop, what to add
6. **`agenda`** — exactly 3 concise entries with `title`, `takeaway`, and `whyItMatters`, derived from the core question, artifacts, and highlight moments rather than restating the section navigation
7. **`slides`** — the per-slide plan for body slides (see the template): `id`, `part`, `claim`, `scene`, `seconds`. The seconds for the whole deck, including standard slides, land 3–5 minutes under the README `duration`.
8. **One open decision** — the single thing the user must resolve before slides can be generated

---

## Mapping Output to recipe.yml

Write the **complete** `deck.recipe.yml` file — all fields. Source them as follows:

| Field | Source |
|---|---|
| `version` | Always `1` |
| `deck.title` | README H1 title |
| `deck.subtitle` | README subtitle line or guiding question, condensed |
| `deck.tagline` | README one-line promise / focus (from intro block) |
| `deck.agenda` | Review output; exactly 3 attendee-facing outcomes |
| `deck.arcToc` | Review output |
| `deck.arcNarrative` | Review output |
| `deck.sectionOrder` | Review output |
| `deck.sectionModes` | Review output |
| `deck.highlightMoments` | Review output |
| `deck.slides` | Review output; per-slide plan |

Use `DECK-RECIPE-TEMPLATE.yml` (read during pre-flight) as the schema for field names, YAML structure, and inline comments. Apply the same voice rules to internal guidance and YAML comments because they are generator inputs. If there is an open decision from the review, append it as a YAML comment at the end of the file: `# OPEN DECISION: [question] — [paths and consequences]`.

**Post-Recipe Workflow:**
1. The user's approval finalizes the recipe; commit it with the deck through the Deploy agent
2. Invoke the [Native Deck Author agent](../../agents/native-deck-author.agent.md) with the talk path: `new` for a new talk, `convert` for a Slidev talk
3. Native Deck Author writes `slides.js` (slides and notes together), reuses shared frames and patterns, authors deck scenes one at a time, and validates each
4. A Slidev talk that is not converting yet uses the legacy [Tech Talk Slide Generator agent](../../agents/tech-talk-slide-generator.agent.md) for patches only

---

## Quality Checks Before Committing

- [ ] **Max 4 sections** — The recipe has exactly 4 or fewer sections. If more, consolidate.
- [ ] Every section in the new `sectionOrder` matches a part heading (`##`) in the README
- [ ] Every `high` section carries the talk's strongest proof or demonstration
- [ ] `arcToc` is a single line ≤ 80 chars using ` → ` separators between section names
- [ ] `arcNarrative` is a prose paragraph explaining the sequencing logic
- [ ] `agenda` contains exactly 3 entries, each with `title`, `takeaway`, and `whyItMatters`; entries promise outcomes rather than repeat the TOC
- [ ] The open decision is documented in the file — don't silently absorb it
- [ ] `highlightMoments` list is 3-5 items (not more — dilutes focus)
- [ ] `slides` gives every body slide a claim, a scene with a settled state, and `seconds`; the deck total lands 3–5 minutes under `duration`
- [ ] Every recipe field and comment uses direct-positive, possibility-led language
- [ ] A final phrase scan finds no contrastive-negation constructions such as "not X, but Y," "rather than," "instead of," "unlike," or "no longer"; rewrite each match before writing the file
- [ ] **After approval**: Native Deck Author builds the deck from the recipe

---

## Common Structural Anti-Patterns

| Anti-Pattern | Signal | Fix |
|---|---|---|
| Mechanism as section | Section covers a tool/output (lockfiles, CI flags) rather than a capability or decision | Absorb as callout inside the parent capability section |
| Identity crisis | Talk's core question promises X but all slides deliver Y | Rename sections with verb-led titles that match what the audience *does* |
| Consumption-only for a producer audience | Platform/ops teams are in the audience but all sections are consumer-perspective | Add at least one producer-perspective section |
| Passive closing section | Last section = "Resources" or "References" — audience leaves with no next action | Reframe as "Contribution Targets" or "What to Try This Week" |
| All sections equal weight | All `high` or all `medium` | Force a ranking — make the climax section the highest-emphasis section |

---

## Example Invocations

- "we're spending a whole section just on X — review the talk and see if that's the best use of our time"
- "we never show how to do Y — is it worth adding a section?"
- "does the copilot-plugins talk structure match what platform teams actually need?"
- "review the tech-talk recipe before we regenerate slides"
