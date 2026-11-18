---
status: active
updated: 2026-11-10
---

# Workshop Native Migration Proposal

**State:** Phase 2 foundation and the Phase 3 Module 1 pilot are implemented on branch `workshop-native-module-1`, awaiting facilitator review. Module 1's coverage map and source conflicts are in [deck.plan.yml](../slides/workshop/01-instructions/deck.plan.yml). The remaining modules are not converted.

## Recommendation

Reuse the native presentation runtime, with a workshop-specific visual system and authoring workflow. Keep module READMEs and exercise files as the instructional sources. Native workshop slides become a faithful facilitation layer over those sources, rather than a new home for the curriculum.

Start with Module 1 as a representative pilot. Approve its source map, visual direction, and facilitator experience before converting the remaining decks.

## What Changes From Tech Talks

| Concern | Native tech talks today | Native workshop proposal |
|---|---|---|
| Purpose | Develop an argument and demonstrate a consequential decision | Help participants attempt, inspect, adjust, rerun, and validate their work |
| Teaching source | Slide data and speaker notes; README becomes a landing page | Module README owns scope, order, outcomes, and module checklist; linked exercises own detailed procedures |
| Structure | Approved talk recipe, section spine, proof, transfer | Follow the module's actual README structure and exercise sequence |
| Presenter role | Explain and demonstrate | Frame, demonstrate, release participants to work, diagnose, and debrief |
| Notes | Self-contained talk and reference handout | Facilitation guidance: demo preparation, prompts for discussion, checkpoints, common problems, recovery |
| Pacing | Speaking-time budget | Separate explanation/demo, participant work, and debrief budgets |
| Visual emphasis | Claim, mechanism, evidence, decision | Current task, artifact, example, observable check, and next move |
| Success | Audience can apply the decision model | Participants produce and inspect evidence, recover from problems, and transfer the practice |

Do not inherit the four-part talk spine, 30+ slide guidance, mandatory core-question/thesis opening, third-person executive voice, or README slimming. Do not retain the old workshop 12-20 slide target as a conversion gate. Let readable teaching surfaces and exercise coverage determine slide count.

## Scope And Existing Evidence

There are seven existing workshop decks: Modules 0, 1, 2, combined 3-4, 5, 6, and the standalone FanHub Unplugged session. The combined deck references only Module 3 in its current metadata even though it teaches both modules.

| Current deck | Proposed destination | Conversion consideration |
|---|---|---|
| [Orientation](../slides/workshop/00-orientation.md) | `slides/workshop/00-orientation/` | Preserve setup, FanHub context, established personas, principles, and the initial attempt/inspection |
| [Instructions](../slides/workshop/01-instructions.md) | `slides/workshop/01-instructions/` | Pilot: layered concepts, file examples, seven exercises, and a concrete module checklist |
| [Plan Mode](../slides/workshop/02-agent-plan-mode.md) | `slides/workshop/02-agent-plan-mode/` | Resolve source disagreements before authoring |
| [Prompts and Skills](../slides/workshop/03-04-combined.md) | `slides/workshop/03-04-combined/` initially | Map both module READMEs explicitly; retain the combined delivery unless a split is approved |
| [MCP Servers](../slides/workshop/05-mcp-servers.md) | `slides/workshop/05-mcp-servers/` | Make tool setup, trust, observable results, and environment recovery usable during exercises |
| [Custom Agents](../slides/workshop/06-custom-agents.md) | `slides/workshop/06-custom-agents/` | Preserve cumulative dependencies, orchestration examples, and capstone acceptance checks |
| [FanHub Unplugged](../slides/workshop/fanhub-unplugged.md) | `slides/workshop/fanhub-unplugged/` | Its own 60-minute, choose-a-path facilitation profile; not a numbered-module template |

### A Concrete Source Conflict

The [Module 2 README](../workshop/02-agent-plan-mode/README.md) lists Exercise 2.1 as planning Universe Stat Cards. Its linked [Exercise 2.1](../workshop/02-agent-plan-mode/exercise-2.1.md) is actually Swap the Show. The current deck describes planning a Lore Card and Page.

This is a curriculum decision, not a markup translation problem. Record the competing versions and ask the content owner to approve the intended sequence. Then align the README and exercises before deriving slides. Do not pick the newest-looking document or silently rewrite the curriculum during conversion.

Existing module timing also needs reconciliation: the workshop overview and individual module materials do not always describe the same delivery budget. Treat timing as proposed until agreed and rehearsed; label numeric performance claims as targets or sourced results.

## Source And Coverage Contract

1. Read the module README in full, including its exercise table, checklist, compounding value, and reflection/transfer sections.
2. Read every linked exercise used in the session. Preserve exercise IDs, prerequisites, named artifacts, commands, and acceptance criteria.
3. Use the existing Slidev deck as a presentation reference and a source of reusable visuals, not as the curriculum authority.
4. Create a lightweight, human-reviewed source map before scenes. Each entry names a README heading or exercise, its slide IDs, teaching purpose, expected evidence, and time allocation.
5. Account for each meaningful README section as visible teaching, exercise guidance, facilitator reference, or deliberately omitted with a reason. Reference links do not need individual slides.
6. Preserve README order by default. Local rearrangements that place explanation beside practice are explicit in the map; substantial omissions, merges, splits, or reordering require approval.
7. Keep facilitation notes additive. Any new instructional requirement or changed success criterion goes into the source materials first, with approval.

Use a small `deck.plan.yml` beside each native workshop deck as the proposed map, not the tech-talk recipe workflow. Include all source paths, source revision fingerprints, unresolved conflicts, and coverage decisions. Record fingerprints using the existing toolchain; they flag changed inputs but do not prove semantic coverage. Automated checks catch missing mappings and changed sources; a human reviews instructional fidelity.

The same map can cover both READMEs for Modules 3-4. Shared examples remain possible without hiding the module boundary or renumbering exercises.

## Workshop Visual Direction

**A practical, warm workshop workbench:** recognizably related to today's workshop decks, visibly distinct from the native talks.

- Retain SDP/FanHub identity, module numbering, the established persona story, and the orange/red/purple/blue progression as restrained accents. Confirm reuse of existing logos and orientation imagery during the pilot.
- Use a module journey rail and exercise breadcrumb instead of the talk's terminal-style pill and four-part framing. Distinguish module progress from progress through one exercise.
- Give concept explanation, instructor demonstration, participant work, checkpoint, and debrief distinct layouts and explicit labels. Color reinforces the meaning; it is never the only signal.
- Prioritize readable code, representative file contents, prompts, diffs, and actual application captures. Use diagrams when relationships need them. Avoid turning every exercise into a bespoke animated SVG.
- Keep useful context visible while people work: exercise ID, timebox, goal, artifact, acceptance check, and link to the full exercise. Longer procedures stay in the exercise document.
- Use generous reading space, quieter backgrounds, and a workshop-specific type hierarchy. Keep essential instructions static; small reveals can support an explanation but cannot hide task requirements.
- Keep each module's persona perspective pair: "The team, before" (wrong answers only: the doubts and misunderstandings learners often bring) near the start, and "The team, after" near the end, same people in the same positions. The workshop changes perspectives as much as it teaches the tech; this contrast carries that shift. Shared layout: `ws-team`.

Before scaling, review pilot screenshots side by side with one current workshop deck and one native tech talk. Approve the visual system on actual concept, code, exercise, checkpoint, and debrief slides, not only a title slide.

## Shared Runtime, Separate Profile

Keep one navigation, scaling, overview, notes-following, settled-state, and print implementation. Add workshop assets under the shared native directory, with namespaced layouts and workshop-scoped CSS. Keep deck-specific scenes and media inside each workshop deck folder.

Proposed minimal profile additions:

- Deck metadata identifies `workshop`, its module source or sources, and the delivery profile: numbered module or standalone sprint.
- Workshop layouts cover module opening/outcomes, concept/example, demo, exercise launch/workboard, checkpoint/recovery, debrief, and next-module transfer. Add only patterns proven useful in the pilot.
- Native HTML is appropriate for selectable code, working links, and instruction lists; SVG remains available for diagrams. Extend validation beyond SVG text where these layouts require it.
- Exercise metadata carries its source link, ID, artifact, and work timebox. Presenter `seconds` remains presenter time; exercise work is counted once per exercise, not on every related slide. Report the full session breakdown without double counting.
- Facilitator notes link back to canonical sources and carry setup, discussion prompts, likely failure signals, recovery, and readiness to continue. The notes page remains a facilitator guide, not a replacement learner manual.

Retain relative paths and local-file usability. Links to curriculum files need an explicit local and published target policy: a relative link can work from the source checkout but fail in the deployed artifact. Prefer existing published repository pages unless deployment deliberately includes the required learning materials. Test both launch modes.

Defer countdown timers, persistent learner completion, embedded editors, and an LMS-style learner mode. They are separate product features, not prerequisites for this migration.

## Machinery Changes

The engine can already render arbitrary scene functions, and it protects interactive elements from click-to-advance. The publishing and metadata tooling is where workshop support is currently missing.

| Area | Required change and proof |
|---|---|
| [Native discovery](../slides/scripts/native-decks.mjs) | Discover both categories; use category-qualified identity; test duplicate slugs, incomplete decks, and media-only folders such as orientation's existing images directory |
| [Native publishing](../slides/scripts/build-native-decks.mjs) | Honor category and deck filters, copy the right shared assets, and validate selected workshop decks |
| Build entry points | Update PowerShell and shell selection to give native decks precedence over retained Slidev references, without publishing both to the same URL |
| [Change detection](../slides/scripts/detect-slide-changes.mjs) | Track category-qualified native targets and mapped workshop sources, including exercise-only changes and both sources of the combined deck |
| [Index metadata](../slides/scripts/sync-index-dates.mjs) | Derive workshop dates and native status from the correct sources; avoid slug collisions across categories |
| Companions and preview | Make notes/agenda/PDF behavior explicit for workshops; extend copy/check/export/preview tooling without treating facilitator notes as the learner exercise guide |
| Links and Pages routing | Preserve category/slug URLs, test numeric/hash links and notes links, and document numeric-slide changes when slide order changes |
| CI and Deploy | Exercise mixed Slidev/native builds, validate native workshop assets before upload, and keep final companion/index synchronization in Deploy |
| Authoring guidance | Update AGENTS, native instructions, workshop profile, validation skill, and authoring-agent routing together after approval |

Prefer an explicit workshop-native authoring workflow while keeping the tech-talk author's notes-first contract intact. Reuse shared authoring mechanics without adding workshop exceptions throughout every talk-writing step. The current rules explicitly keep workshops on Slidev; revise those rules as a coordinated change before invoking conversion agents.

Audit existing tests for category and slug assumptions before changing APIs. Preserve existing tech-talk behavior and expand neighboring test files rather than adding a parallel toolchain.

## Delivery Phases

### 1. Approve The Contract And Source Audit

Approve README-first ownership, coverage-map format, visual direction, combined-module handling, companion policy, and pilot scope. Audit all seven decks against their sources; list conflicts, missing metadata, prerequisites, and timing disagreements. Repair only approved curriculum inconsistencies. Refuse archived sources.

**Exit:** Each deck has an agreed source set and unresolved decisions are visible. Module 1 has a reviewed, conflict-free map ready for the pilot.

### 2. Build The Smallest Workshop Foundation

Add category-aware discovery/publishing and the minimal workshop theme/layouts needed by Module 1. Make workshop identity and timing available to notes and validation. Update the authoring rules for the approved scope. Keep existing tech-talk defaults intact.

**Exit:** Focused script tests pass; a workshop fixture builds to the expected URL; tech-talk discovery, navigation, notes, and rendering retain their behavior. Shared-runtime changes receive the required cross-deck regression validation.

### 3. Pilot Module 1

Author the full Instructions module from its source map, with exercise launch and acceptance surfaces for Exercises 1.0-1.6. Use the pilot to settle the visual system and facilitator notes. Review individual changed slides during iteration; do not regenerate global companions or indexes on each edit.

**Exit:** README coverage is approved, every exercise is actionable, native checks pass, and a facilitator can take a participant from prerequisites through the module checklist using the deck plus linked sources. The content owner then polishes Module 1 until it is the exemplar; it becomes the reference deck every later conversion matches. Approve the polished pilot before scaling.

### 4. Convert In Dependency Order

Convert Orientation, then Module 2 after its curriculum conflicts are resolved, then combined Modules 3-4, MCP, and Custom Agents. This restores the full numbered journey using the approved pilot patterns. Convert FanHub Unplugged last with its separate phase/path/timebox structure.

For each deck: map sources, approve material changes, author, validate, and run a facilitation review. Check that the artifacts produced by one module satisfy the next module's prerequisites. Keep accepted decks usable throughout the migration.

**Exit:** All seven current delivery units have native replacements and the end-to-end learner artifact chain is intact.

### 5. Cut Over And Retire Legacy Decks

Use Deploy for final synchronization, companion regeneration where applicable, mixed-build checks, and publication when explicitly requested. Remove retained Slidev workshop sources only after the native destinations and links are verified; preserve rollback through version history. Do not remove Slidev dependencies while other active decks still use them.

**Exit:** Existing workshop entry URLs serve native decks, learner materials and facilitator notes are reachable, and no active authoring or deployment path still routes converted workshops through Slidev.

## Acceptance Gates

- **Fidelity:** Every learning objective, exercise, prerequisite, artifact, module checklist item, and transfer action has an explicit disposition. Source conflicts have approved resolutions.
- **Usability:** An exercise workboard stays readable throughout participant work; links are actionable without advancing the deck; facilitator notes explain how to recover and when to continue.
- **Timing:** Explanation, demo, work, debrief, and any buffer sum to the agreed session budget. Estimates and targets remain labeled until observed.
- **Visual quality:** Changed slides pass focused screenshots and overflow/overlap checks. Check representative desktop projection and narrow browser viewports, notes readability, and reduced-motion/settled states.
- **Runtime:** No errors, pending scenes, missing assets, or unlabeled diagrams. Keyboard, overview, hash/numeric navigation, notes following, and one-page-per-slide print work.
- **Publishing:** Native workshop selection, category isolation, retained-Slidev precedence, companions, source links, and deployed URLs pass focused tests. Shared changes preserve tech-talk behavior.
- **Transfer:** Each module closes by connecting observed participant evidence to a concrete decision in the participant's own repository or workflow.

## Decisions To Confirm

1. Keep Modules 3-4 as one delivery unit for the migration. Split only if separate scheduling and entry URLs are a desired curriculum change.
2. Approve Module 1 as the pilot and a recognizable warm workshop workbench as the visual direction.
3. Resolve Module 2's competing curriculum versions during the source audit; avoid binding conversion to any one version yet.
4. Keep READMEs/exercises as learner materials and notes as facilitator materials; decide which agenda/PDF companions remain useful before cutover.
5. Approve a coordinated workshop authoring/profile change while preserving the tech-talk notes-first workflow.

No implementation estimate is asserted here. The pilot establishes the reusable-layout effort and source-reconciliation cost before estimating the remaining conversion.