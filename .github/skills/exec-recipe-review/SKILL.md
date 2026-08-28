---
name: exec-recipe-review
description: >
  Review an exec-talk's README and produce an exec.recipe.yml. Requires an independent
  cross-model Rubber Duck critique of section weighting, executive audience fit, narrative
  arc, and action clarity. Always overwrites any existing recipe. Triggers: "review the talk",
  "create the recipe", "is this landing for execs", "section weighting", "coverage gap",
  "recipe", "executive framing".
infer: true
---

# Exec Recipe Review Skill

Read the exec-talk README, analyze its structure with a primary reviewer plus an independent cross-model Rubber Duck critique, and write `exec.recipe.yml`. This skill **always produces a fresh recipe** — it does not preserve or patch an existing one. The recipe is the authoritative input for the Slide Generator when building exec-talk decks.

**Key Constraints:**
- **Max 4 sections** — Review should consolidate, not expand. Exec talks are tighter than tech talks. Each section earns ~8–12 slides in a 30–45 min briefing.
- **Executive audience is the filter** — Every section must be evaluated through the lens of a CXO, VP, or transformation lead. If a section teaches implementation, it needs to be reframed as business implications or cut.
- **Slide generator ensures consistency** — Once you commit a recipe, the [Slide Generator agent](../../agents/slide-generator.agent.md) generates all slides using the cockpit HTML template system with uniform structure. Focus the review on *decision clarity and business credibility*, not slide-level details.
- **Recipe schema** — Read `.github/skills/exec-recipe-review/EXEC-RECIPE-TEMPLATE.yml` to understand all valid fields before writing the output file.

---

## When to Invoke This Skill

- After a new exec-talk README is complete
- User wants to revise section structure, business framing, or action clarity
- User questions whether a section earns its airtime ("are we spending too long on X")
- User notices a business angle is missing ("we never explain the cost of not acting")
- User asks to "review the talk" or check if the structure matches the executive audience

**Not for:** Minor wording tweaks, slide-level fixes, or tech-talk decks (use `deck-recipe-review` for those).

---

## Pre-Flight: Gather Source Material

Before starting the review, read BOTH of these. The Rubber Duck brief must include the full context — the independent reviewer must not be expected to read files itself.

```
1. exec-talks/<topic>/README.md                                           — full section content + key metrics
2. .github/skills/exec-recipe-review/EXEC-RECIPE-TEMPLATE.yml            — recipe schema (all valid fields)
```

Do **not** read the existing `slides/exec-talks/<topic>.md`. The recipe is the authoritative spec for the slide generator — existing slides will be overwritten and should not constrain the review.

From these, extract:
- The `## ` H2 headings from the README — these are the candidate sections
- Target audience + talk duration (from README frontmatter or intro)
- The core business question or decision the talk is designed to drive
- Key metrics, risk frames, and business moments
- The specific concern the user raised (if invoked manually)

---

## Primary Analysis

Dispatch all three agents simultaneously. Each gets the SAME full context block (see template below) with a different cognitive role.

### Context Block Template

```
TASK: [One-sentence description of the structural question]

TALK: [title], [duration], audience: [audience list]
CORE QUESTION: "[the business question or decision the talk drives]"

CANDIDATE SECTIONS (from README ## headings):
1. "[Section Name]" — [2-line description of what it covers]
2. ...

CONSTRAINTS:
- Max 4 sections (no exceptions — consolidate, don't expand)
- Audience is executives: every section must land as business implication, not implementation detail
- Slide generator will apply cockpit HTML templates for structural consistency

USER CONCERN: [Exact concern — what's taking too much space / what's missing / what's not landing]

KNOWN MATERIAL:
- [Any key metrics, business models, or frameworks already in the README]
- [Any competitive data, cost figures, or risk framing that exists]
```

### Primary Review Prompt

```
[CONTEXT BLOCK]

Analyze: Is the current section structure the best use of this talk's time with a C-suite audience?
What should change and why?

1. Identify the strongest executive decision journey and the single highest-value structural improvement.
2. Protect sourced claims, business credibility, quantified outcomes, and decision clarity.
3. Reframe or remove implementation detail and content that has not earned executive airtime.
4. Produce a concrete `sectionOrder`, emphasis levels, and highlight changes with rationale.
5. Flag open questions and at least one credible alternate structure for the independent reviewer to challenge.
```

---

## Mandatory Rubber Duck Gate

Before writing the recipe, complete all of these steps without asking the user to remember or invoke them:

1. In Copilot CLI, explicitly delegate the primary recommendation and the complete context block to the built-in **Rubber Duck** agent.
2. Require Rubber Duck to independently attack the proposed business question, decision journey, section order, weighting, credibility, urgency, action clarity, and content that has not earned executive airtime.
3. Do not role-play Rubber Duck in the primary model. Wait for the separate review and preserve substantive disagreements for reconciliation.
4. Outside Copilot CLI, launch one review subagent using a different model family from the primary model and give it the same adversarial brief.
5. If no independent cross-model reviewer is available or delegation does not occur, stop and report that the recipe review gate is blocked. Do not silently write an unreviewed recipe.

---

## Reconciliation and Final Recipe Direction

Reconcile the primary analysis with the independent critique. Rubber Duck is advisory, but every material objection must be accepted or rejected with a content-based reason before producing:

1. **Verdict** (2-3 sentences) — the core structural problem and fix for this executive audience
2. **`arcToc`** — one line ≤ 80 chars, section names joined by ` → ` (use "The X" naming pattern if appropriate)
3. **`arcNarrative`** — a prose paragraph: what each section establishes for the executive, where credibility and urgency peak, and why the ordering drives a decision
4. **Concrete `sectionOrder`** with `sectionModes` (emphasis + one-line note per section)
5. **Updated `highlightMoments`** list — what to drop, what to add (quantified business metrics preferred)
6. **One open decision** — the single thing the user must resolve before slides can be generated

---

## Mapping Output to exec.recipe.yml

Write the **complete** `exec.recipe.yml` file — all fields. Source them as follows:

| Field | Source |
|---|---|
| `version` | Always `1` |
| `deck.title` | README H1 title |
| `deck.subtitle` | README subtitle line or guiding question, condensed |
| `deck.tagline` | README one-line promise / focus (from intro block) |
| `deck.arcToc` | Reconciled review output |
| `deck.arcNarrative` | Reconciled review output |
| `deck.sectionOrder` | Reconciled review output |
| `deck.sectionModes` | Reconciled review output |
| `deck.highlightMoments` | Reconciled review output |
| `deck.preamble` | **Always** `[{ src: "./exec-spine.md" }]` for exec talks — every exec deck imports the shared series context slide. Do NOT set to `[]`. |
| `deck.appendix` | `[]` unless the talk has explicit appendix content |

Use `EXEC-RECIPE-TEMPLATE.yml` (read during pre-flight) as the schema for field names, YAML structure, and inline comments. If there is an open decision from the review, append it as a YAML comment at the end of the file: `# OPEN DECISION: [question] — [paths and consequences]`.

**Post-Recipe Workflow:**
1. Commit updated `exec.recipe.yml`
2. Invoke [Slide Generator agent](../../agents/slide-generator.agent.md) with the exec-talk path
3. Slide Generator uses the cockpit HTML template system to create consistent slides for all sections
4. No manual slide editing needed — the template ensures title slides, overview, section openers, closers, and references are auto-generated

---

## Quality Checks Before Committing

- [ ] **Max 4 sections** — Reconciled output has exactly 4 or fewer sections. If more, consolidate.
- [ ] Every section in the new `sectionOrder` exists as a `## ` heading in the README
- [ ] No section has been marked `high` that contains primarily implementation detail — reframe or cut
- [ ] `arcToc` is a single line ≤ 80 chars using ` → ` separators between section names
- [ ] `arcNarrative` is a prose paragraph explaining the sequencing logic for an executive audience
- [ ] The open decision is documented in the file — don't silently absorb it
- [ ] `highlightMoments` list is 3-5 items with quantified metrics where possible
- [ ] No `highlightMoments` entry describes a tool command, code pattern, or implementation step
- [ ] **After approval**: Slide Generator agent will regenerate all slides using the cockpit HTML system — you don't need to update individual slides
- [ ] `deck.preamble` is `[{ src: "./exec-spine.md" }]` — never `[]` for exec talks

---

## Common Executive Talk Anti-Patterns

| Anti-Pattern | Signal | Exec Fix |
|---|---|---|
| Implementation section | Section covers a tool, CLI, or configuration step rather than a business outcome | Reframe as "What this means for your platform team" or absorb into the stakes section |
| Missing urgency | No section answers "why now" or "cost of not acting" | Add a stakes/imperative section before the action close |
| Passive closing section | Last section = "Resources" or "References" — leaders leave with no decision | Reframe as "What Leadership Must Authorize" or "Three Decisions This Quarter" |
| Metric-free talk | Key points are directional but not quantified | Audit README for any numbers; if none exist, flag as an open decision |
| All sections equal weight | All `high` or all `medium` | Force a ranking — the credibility peak and the urgency section should be highest emphasis |
| Too many sections | 5+ sections in a 30-min exec briefing | Consolidate: the opening frame and the system/model can often be one section |
| Audience confusion | Section mixes exec-level framing with developer-level detail | Cut the detail; add a speaker note that "detail available on request" |

---

## Example Invocations

- "we're spending two sections on the operating model — review the exec talk and see if that's the best use of time"
- "we never explain the cost of not acting — is it worth adding a section?"
- "does the agentic-delivery talk structure land for a CXO audience?"
- "review the exec recipe before we regenerate slides"
- "is this the best use of our time with VPs who only have 30 minutes?"
