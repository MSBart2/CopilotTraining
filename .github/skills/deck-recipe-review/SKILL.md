---
name: deck-recipe-review
description: >
  Review a tech-talk's README and produce a deck.recipe.yml. Requires an independent
  cross-model critique of section weighting, narrative arc, and coverage gaps.
  Always overwrites any existing recipe. Triggers: "review the talk", "create the recipe",
  "is this the best use of our time", "section weighting", "coverage gap", "recipe".
infer: true
---

# Deck Recipe Review Skill

Read the tech-talk README, analyze its structure with a primary reviewer plus an independent cross-model critique, and write `deck.recipe.yml`. This skill **always produces a fresh recipe** — it does not preserve or patch an existing one. The recipe is the authoritative input for the Tech Talk Slide Generator.

**Key Constraints:**
- **Judgment and Transfer Contract** — Apply the universal contract in `AGENTS.md`. Protect the practitioner decision, observable proof, boundary, and own-work transfer when consolidating the README. A section that only inventories features has not earned slide time.
- **Max 4 sections** — Review should consolidate, not expand. Budget emphasis within a 20-25 slide target for the complete deck and never exceed 30 slides.
- **Slide generator ensures consistency** — Once you commit a recipe, the [Tech Talk Slide Generator agent](../../agents/tech-talk-slide-generator.agent.md) generates all slides using the Vue component system with uniform structure (title, toc, section openers, closers, references). Focus the review on *narrative logic and audience fit*, not slide-level details.
- **Recipe schema** — Read `.github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml` to understand all valid fields before writing the output file.
- **Tech-talk voice applies to recipe guidance** — Write every field and comment in direct-positive, possibility-led language because the slide generator may carry recipe wording into audience-facing content. Replace contrastive-negation constructions such as "not X, but Y," "rather than," "instead of," "unlike," and "no longer" with a direct statement of the desired behavior.

---

## When to Invoke This Skill

- After a new tech-talk README is complete (called by the Tech Talk Generator agent as its final step)
- User wants to revise section structure or narrative arc of an existing talk
- User questions whether a section is worth its airtime ("we're spending a whole section on X")
- User notices a topic is missing ("we never show how to build/configure/deploy Y")
- User asks to "review the talk" or check if the structure matches the audience

**Not for:** Minor wording tweaks, slide-level fixes, or adding a single slide.

---

## Pre-Flight: Gather Source Material

Before starting the review, read all three sources. The independent-review brief must include the full context — the reviewer must not be expected to read files itself.

```
1. tech-talks/<topic>/README.md                                     — full section content + key artifacts
2. .github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml      — recipe schema (all valid fields)
3. tech-talks/TEMPLATE.md                                           — "Voice & Framing Guidelines"
```

Do **not** read the existing `slides/tech-talks/<topic>.md`. The recipe is the authoritative spec for the slide generator — existing slides will be overwritten and should not constrain the review.

From these, extract:
- The `<!-- 🎬 MAJOR SECTION: -->` markers from the README — these are the candidate sections
- Target audience + talk duration (from README frontmatter or intro)
- The core question the talk answers
- Key artifacts, metrics, and highlight moments
- The specific concern the user raised (if invoked manually)
- The direct-positive voice rules that every reviewer and the final recipe must follow

---

## Primary Analysis

Perform one primary structural analysis using the complete context block below. The independent review gate that follows provides the separate adversarial perspective.

### Context Block Template

```
TASK: [One-sentence description of the structural question]

TALK: [title], [duration], audience: [audience list]
CORE QUESTION: "[the talk's stated core question]"

CANDIDATE SECTIONS (from README 🎬 markers):
1. "[Section Name]" — [2-line description of what it covers]
2. ...

CONSTRAINTS:
- Max 4 sections (no exceptions — consolidate, don't expand)
- Slide generator will apply the component system for structural consistency
- Apply the tech-talk voice to every proposed recipe field and comment
- State desired behavior directly; avoid contrastive-negation phrasing ("not X, but Y,"
  "rather than," "instead of," "unlike," "no longer")

USER CONCERN: [Exact concern — what's taking too much space / what's missing]

KNOWN MATERIAL:
- [Any relevant artifacts, demos, or examples that already exist in the repo]
- [Any CLI commands or toolchain status that affects feasibility]
```

### Primary Review Prompt

```
[CONTEXT BLOCK]

Analyze: Is the current section weighting the best use of the talk's time?
What should change and why?

1. Identify the strongest narrative arc and the single highest-value structural improvement.
2. Protect practical artifacts, audience outcomes, and technical accuracy.
3. Identify which judgment lens or lenses the arc develops and where the audience proves or transfers that judgment.
4. Identify content to consolidate, demote, or remove rather than only adding material.
5. Produce a concrete `sectionOrder`, emphasis levels, agenda, and highlight changes with rationale.
6. Flag open questions and at least one credible alternate structure for the independent reviewer to challenge.
7. Rewrite every recommendation in direct-positive, possibility-led language suitable for reuse by the slide generator.
```

---

## Mandatory Independent Review Gate

Before writing the recipe, complete all of these steps without asking the user to remember or invoke them:

1. Select the review mechanism from the current host. Never launch one Copilot host from another:
  - **VS Code:** launch one review subagent with `runSubagent`, explicitly selecting an available model from a different model family than the primary model. Give it the complete context block and adversarial review prompt. Do not invoke the `copilot` CLI from VS Code.
  - **Copilot CLI:** ask the main CLI agent to delegate the complete brief to its built-in **Rubber Duck** tool. Rubber Duck is not a selectable custom agent; never invoke it with `--agent "Rubber Duck"`.
2. In Copilot CLI, use:
  ```powershell
  $prompt = @'
  You are the main GitHub Copilot CLI agent. Do not perform this review yourself.
  Delegate the complete review brief below to your built-in Rubber Duck tool, wait for
  its response, and return the critique with explicit evidence that delegation occurred.

  [COMPLETE CONTEXT BLOCK AND ADVERSARIAL REVIEW PROMPT]
  '@
  copilot --prompt $prompt --no-ask-user
  ```
3. Accept a review only when it comes from the selected independent mechanism and includes the requested critique. For CLI, require explicit Rubber Duck delegation evidence. For VS Code, record the subagent model in the reconciliation.
4. Require the independent reviewer to attack the proposed thesis, section order, weighting, agenda, highlights, missing producer/consumer perspectives, content that has not earned slide time, and any recommendation that violates the tech-talk voice.
5. Do not role-play the independent reviewer in the primary model. Wait for the separate review and preserve substantive disagreements for reconciliation.
6. If the host-native independent reviewer is unavailable, choose another available model family in the same host. If no cross-model reviewer is available, record the unavailable gate, perform the primary review, and mark the recipe `# REVIEW PENDING: independent cross-model critique unavailable`. This degraded path preserves progress while preventing the recipe from being treated as fully reviewed.

---

## Reconciliation and Final Recipe Direction

Reconcile the primary analysis with the independent critique. The reviewer is advisory, but every material objection must be accepted or rejected with a content-based reason before producing. Rewrite inherited reviewer language into the direct-positive tech-talk voice; never copy contrastive phrasing into the recipe unchanged.

1. **Verdict** (2-3 sentences) — the core structural problem and fix
2. **`arcToc`** — one line ≤ 80 chars, section names joined by ` → `
3. **`arcNarrative`** — a prose paragraph: what each section sets up for the next, where peak engagement lands, and why the ordering beats alternatives
4. **Concrete `sectionOrder`** with `sectionModes` (emphasis + one-line note per section)
5. **Updated `highlightMoments`** list — what to drop, what to add
6. **`agenda`** — exactly 3 concise entries with `title`, `takeaway`, and `whyItMatters`, derived from the core question, artifacts, and highlight moments rather than restating the section navigation
7. **One open decision** — the single thing the user must resolve before slides can be generated

---

## Mapping Output to recipe.yml

Write the **complete** `deck.recipe.yml` file — all fields. Source them as follows:

| Field | Source |
|---|---|
| `version` | Always `1` |
| `deck.title` | README H1 title |
| `deck.subtitle` | README subtitle line or guiding question, condensed |
| `deck.tagline` | README one-line promise / focus (from intro block) |
| `deck.agenda` | Reconciled review output; exactly 3 attendee-facing outcomes |
| `deck.arcToc` | Reconciled review output |
| `deck.arcNarrative` | Reconciled review output |
| `deck.sectionOrder` | Reconciled review output |
| `deck.sectionModes` | Reconciled review output |
| `deck.highlightMoments` | Reconciled review output |

Use `DECK-RECIPE-TEMPLATE.yml` (read during pre-flight) as the schema for field names, YAML structure, and inline comments. Apply the same voice rules to internal guidance and YAML comments because they are generator inputs. If there is an open decision from the review, append it as a YAML comment at the end of the file: `# OPEN DECISION: [question] — [paths and consequences]`.

**Post-Recipe Workflow:**
1. Commit updated `deck.recipe.yml`
2. Invoke [Tech Talk Slide Generator agent](../../agents/tech-talk-slide-generator.agent.md) with the talk path
3. Slide Generator uses the Vue component system to create consistent slides for all sections
4. No manual slide editing needed — the template ensures title slides, TOCs, section openers, closers, and references are auto-generated

---

## Quality Checks Before Committing

- [ ] **Max 4 sections** — Reconciled output has exactly 4 or fewer sections. If more, consolidate.
- [ ] Every section in the new `sectionOrder` exists as a major section (`##`) in the README
- [ ] No section has been promoted to `high` that the independent reviewer flagged as risky without noting the risk
- [ ] `arcToc` is a single line ≤ 80 chars using ` → ` separators between section names
- [ ] `arcNarrative` is a prose paragraph explaining the reconciled sequencing logic
- [ ] `agenda` contains exactly 3 entries, each with `title`, `takeaway`, and `whyItMatters`; entries promise outcomes rather than repeat the TOC
- [ ] The open decision is documented in the file — don't silently absorb it
- [ ] `highlightMoments` list is 3-5 items (not more — dilutes focus)
- [ ] Every recipe field and comment uses direct-positive, possibility-led language
- [ ] A final phrase scan finds no contrastive-negation constructions such as "not X, but Y," "rather than," "instead of," "unlike," or "no longer"; rewrite each match before writing the file
- [ ] **After approval**: Tech Talk Slide Generator agent will regenerate all slides using the Vue component system — you don't need to update individual slides

---

## Common Structural Anti-Patterns

| Anti-Pattern | Signal | Fix |
|---|---|---|
| Mechanism as section | Section covers a tool/output (lockfiles, CI flags) rather than a capability or decision | Absorb as callout inside the parent capability section |
| Identity crisis | Talk's core question promises X but all slides deliver Y | Rename sections with verb-led titles that match what the audience *does* |
| Consumption-only for a producer audience | Platform/ops teams are in the audience but all sections are consumer-perspective | Add at least one producer-perspective section |
| Passive closing section | Last section = "Resources" or "References" — audience leaves with no next action | Reframe as "Contribution Targets" or "What to Try This Week" |
| All sections equal weight | All `high` or all `medium` | Force a ranking — the climax section should be the highest-emphasis section |

---

## Example Invocations

- "we're spending a whole section just on X — review the talk and see if that's the best use of our time"
- "we never show how to do Y — is it worth adding a section?"
- "does the copilot-plugins talk structure match what platform teams actually need?"
- "review the tech-talk recipe before we regenerate slides"
