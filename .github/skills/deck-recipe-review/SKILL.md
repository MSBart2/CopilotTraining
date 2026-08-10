---
name: deck-recipe-review
description: >
  Review a tech-talk's README and produce a deck.recipe.yml. Uses a 3-agent collaborative
  council to analyze section weighting, narrative arc, and coverage gaps. Always overwrites
  any existing recipe. Triggers: "review the talk", "create the recipe", "is this the best
  use of our time", "section weighting", "coverage gap", "recipe".
infer: true
---

# Deck Recipe Review Skill

Read the tech-talk README, analyze its structure with an Agent Council, and write `deck.recipe.yml`. This skill **always produces a fresh recipe** — it does not preserve or patch an existing one. The recipe is the authoritative input for the Tech Talk Slide Generator.

**Key Constraints:**
- **Max 4 sections** — Council should consolidate, not expand. Each section gets ~12-15 slides in 60-min talks.
- **Slide generator ensures consistency** — Once you commit a recipe, the [Tech Talk Slide Generator agent](../../agents/tech-talk-slide-generator.agent.md) generates all slides using the Vue component system with uniform structure (title, toc, section openers, closers, references). Focus the council on *narrative logic and audience fit*, not slide-level details.
- **Recipe schema** — Read `.github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml` to understand all valid fields before writing the output file.

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

Before dispatching the council, read BOTH of these. The council prompt must include the full context — agents cannot read files themselves.

```
1. tech-talks/<topic>/README.md                                     — full section content + key artifacts
2. .github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml      — recipe schema (all valid fields)
```

Do **not** read the existing `slides/tech-talks/<topic>.md`. The recipe is the authoritative spec for the slide generator — existing slides will be overwritten and should not constrain the council's reasoning.

From these, extract:
- The `<!-- 🎬 MAJOR SECTION: -->` markers from the README — these are the candidate sections
- Target audience + talk duration (from README frontmatter or intro)
- The core question the talk answers
- Key artifacts, metrics, and highlight moments
- The specific concern the user raised (if invoked manually)

---

## Council Dispatch: Phase 1 (All 3 Parallel)

Dispatch all three agents simultaneously. Each gets the SAME full context block (see template below) with a different cognitive role.

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

USER CONCERN: [Exact concern — what's taking too much space / what's missing]

KNOWN MATERIAL:
- [Any relevant artifacts, demos, or examples that already exist in the repo]
- [Any CLI commands or toolchain status that affects feasibility]
```

### Alpha Prompt (Deep Explorer)

```
You are Alpha on an Agent Council (Collaborative mode).
Your role: Generate a comprehensive, creative response.

[CONTEXT BLOCK]

Analyze: Is the current section weighting the best use of the talk's time?
What should change and why?

1. Write a thorough response exploring the problem space deeply
2. Add '## Open Questions': what needs to be answered before slides can be written?
3. Add '## Wild Ideas': at least one unconventional structural approach
Be expansive — breadth over polish.
```

### Beta Prompt (Practical Builder)

```
You are Beta on an Agent Council (Collaborative mode).
Your role: Ground the problem in reality while finding opportunities.

[CONTEXT BLOCK]

Analyze: Is the current section weighting the best use of the talk's time?

1. Write your response focused on practical, validated approaches
2. Add '## Building Blocks': what content already exists that could fill gaps?
3. Add '## Combinations': what topics could be merged or split for better flow?
Output a concrete recommended sectionOrder with emphasis levels and rationale.
Be constructive. Find opportunities, not just constraints.
```

### Gamma Prompt (Elegant Minimalist)

```
You are Gamma on an Agent Council (Collaborative mode).
Your role: Find the most elegant, minimal solution and open new angles.

[CONTEXT BLOCK]

Analyze: What is the single structural change that would most improve this talk?

1. Write the simplest viable restructuring
2. Add '## Alternative Angles': reframe the problem from 2 different perspectives
3. Add '## What If': propose one boundary-pushing variation
Be concrete about the new sectionOrder and what changes in highlightMoments.
```

---

## Council Dispatch: Phase 2 (All 3 Parallel Improve)

After all three Phase 1 responses return, dispatch all three again simultaneously. Each agent gets the other two drafts and writes an IMPROVED version.

Key instruct for each: *"Steal the best ideas from the other two shamelessly. Look for novel syntheses. Keep your natural strength but enrich it."*

---

## Council Dispatch: Phase 3 (Orchestrator Synthesis)

Single orchestrator prompt with all three Phase 2 improved versions. Ask for:

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
| `deck.agenda` | Council Phase 3 output; exactly 3 attendee-facing outcomes |
| `deck.arcToc` | Council Phase 3 output |
| `deck.arcNarrative` | Council Phase 3 output |
| `deck.sectionOrder` | Council Phase 3 output |
| `deck.sectionModes` | Council Phase 3 output |
| `deck.highlightMoments` | Council Phase 3 output |

Use `DECK-RECIPE-TEMPLATE.yml` (read during pre-flight) as the schema for field names, YAML structure, and inline comments. If there is an open decision from the council, append it as a YAML comment at the end of the file: `# OPEN DECISION: [question] — [paths and consequences]`.

**Post-Recipe Workflow:**
1. Commit updated `deck.recipe.yml`
2. Invoke [Tech Talk Slide Generator agent](../../agents/tech-talk-slide-generator.agent.md) with the talk path
3. Slide Generator uses the Vue component system to create consistent slides for all sections
4. No manual slide editing needed — the template ensures title slides, TOCs, section openers, closers, and references are auto-generated

---

## Quality Checks Before Committing

- [ ] **Max 4 sections** — Council output has exactly 4 or fewer sections. If more, consolidate.
- [ ] Every section in the new `sectionOrder` exists as a major section (`##`) in the README
- [ ] No section has been promoted to `high` that the council flagged as risky without noting the risk
- [ ] `arcToc` is a single line ≤ 80 chars using ` → ` separators between section names
- [ ] `arcNarrative` is a prose paragraph explaining the sequencing logic (from the council synthesis)
- [ ] `agenda` contains exactly 3 entries, each with `title`, `takeaway`, and `whyItMatters`; entries promise outcomes rather than repeat the TOC
- [ ] The open decision is documented in the file — don't silently absorb it
- [ ] `highlightMoments` list is 3-5 items (not more — dilutes focus)
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
- "council: does the copilot-plugins talk structure match what platform teams actually need?"
- "review the tech-talk recipe before we regenerate slides"
