---
applyTo: "slides/native/**,slides/tech-talks/*/**,slides/workshop/*/**"
description: "Use when editing native HTML decks (slides.js, scenes.js, deck.css) for tech talks, executive talks, or workshop modules, or the shared engine in slides/native/. Covers the source of truth for each deck type, scene and layout authoring rules, and required validation."
---

# Native decks

Native decks cover practitioner tech talks, executive talks (`tech-talks/exec-*`), and workshop modules that have a `slides/workshop/<slug>/` folder. Workshop decks without a native folder stay on Slidev (`slidev-decks.instructions.md` covers those).

Executive decks follow the Executive talk section in `AGENTS.md`: a technical decision maker audience, a persuasive case for GitHub Copilot, third-person voice, and the decision, owner, evidence class, and boundary visible. "Proof" on an executive slide is a sourced fact, an evidence-class label, a first-party capability, or a named control, never an invented result.

## Source of truth

- `slides/tech-talks/<slug>/slides.js` holds the slide data **and** the speaker notes (`notes`, `know`, `cue`, `sources`, `seconds`). The notes are the talk's teaching source; `notes.html` renders them as the reference and handout.
- `tech-talks/<slug>/README.md` is a landing page. Edit talk content in `slides.js`; touch the README only for frontmatter, the question, the thesis, or a part summary.
- The engine lives in `slides/native/`. See `slides/native/README.md` for layers, data fields, motion, and keys.

## Rules

- Scenes are pure functions that return markup from `window.Kit`. Every `svg.scene` has a `label` that states the slide's claim.
- The settled state (final frame) carries every claim; motion only reveals it.
- Reuse a frame (`native/frames.js`) or pattern (`native/patterns.js`) when the shape fits. Improvements every deck benefits from go into `slides/native/`, followed by re-validating `tech-talks/surfaces`.
- A deck scene must not reuse a shared frame or pattern name unless the override is deliberate.
- Notes render as HTML: avoid raw `<` and `&`. Spoken lines start with `"`, transitions with `→`. Never use "should".
- Keep paths relative (`../../native/`) so the folder works from `slides/` and from `dist/`.
- Write files as UTF-8 without a BOM.

## Workshop decks

A workshop deck facilitates a hands-on module; it is not a talk. The rules above for scenes, notes HTML, paths, and UTF-8 apply; these replace the notes-first rules.

`slides/workshop/01-instructions/` is the reference workshop deck. Read its `slides.js`, `deck.plan.yml`, and screenshots before converting another module, and match its running order, layouts, notes style, and level of polish. Improvements made while polishing it that other modules benefit from go into `native/workshop.js` and `native/workshop.css`, not into its `deck.css`.

- **The README stays the learner's source.** `workshop/<module>/README.md` owns scope, order, outcomes, and the module checklist; linked `exercise-*.md` files own the full steps. Slides follow the README order. Never slim a workshop README, and change curriculum in the README or exercise first, with approval.
- **Notes are the facilitator guide:** when to release the room, what to watch for, how to recover, when to move on. Spoken lines and `seconds` work as in talks; `seconds` is presenter time only.
- **Use the workshop layouts** in `native/workshop.js` (`ws-*`); options are documented in `slides/native/README.md`. Load `workshop.js` and `workshop.css`, and set `<body class="deck workshop">` (`notes workshop` on the notes page). Prefer a visual layout over a plain table whenever the content has a shape:

  | Content shape | Layout | Module 1 example |
  |---|---|---|
  | Personas and the mission | `ws-story` | story |
  | Misconceptions before, revised views after | `ws-team` (`mode`) | team-before, team-after |
  | A shift in thinking | `ws-mindful` | surfaces |
  | Parts of the module, numbered | `ws-outcomes` | build |
  | Layers from broad to specific | `ws-stack` | layers, org |
  | Exercise timeline | `ws-roadmap` | roadmap |
  | A file, prompt, or shell session | `ws-code` (editor or `mode: 'terminal'`, pinned notes) | path-file, structure, universe |
  | Two files and what goes in each | `ws-compare` file cards (`include`, `leave`) | foundation |
  | You and Copilot taking turns | `ws-compare` with `flow` and `who` | init |
  | Patterns with examples that match and miss | `ws-globs` | patterns |
  | What loads for one open file | `ws-match` | layering |
  | Parallel variants shown with a code sample each | `ws-variants` | lang, filetype, domain |
  | One file linking to others | `ws-pointers` | agents-md |
  | Where a rule or artifact belongs, by scope | `ws-route` | which |
  | Do / check | `ws-exercise`, `ws-check` (`refs` shows the expected References) | ex-1-x, check-1-x |
  | Debrief, checklist, next, references | `ws-debrief`, `ws-checklist`, `ws-next`, `ws-refs` | closing slides |

  Use `ws-table` only for genuinely tabular reference data. A new shape that other modules will reuse becomes a new `ws-*` layout in `native/workshop.js` and `native/workshop.css`, documented in `slides/native/README.md`; `deck.css` holds only one-slide tweaks.
- **Converting a module:** copy `index.html`, `notes.html`, and an empty `scenes.js` from `slides/workshop/01-instructions/`, then update the module name, description, and README links in both HTML files. Write `slides.js` from the module README and exercises, write `deck.plan.yml`, validate with `--shots`, and inspect every screenshot. Leave the module's Slidev `slides/workshop/<slug>.md` in place until cutover.
- **Mindful moments stand apart.** Every README "Mindful Moment" becomes a `ws-mindful` slide: a calm teal treatment unlike any other slide, the traditional-to-AI-native thinking shift (`from`, `to`), then any reference table that grounds it.
- **Personas keep their color everywhere.** `native/workshop.js` maps each FanHub persona to one color (Jessica amber, David blue, Sarah green, Elena purple, Marcus orange, Rafael cyan) for avatars and card accents. Use their names and leave `tone` unset so every module stays consistent.
- **Code and terminal slides use one window.** Show files, prompts, and shell sessions with `ws-code`: the editor window (line numbers, light tinting) for files, `mode: 'terminal'` for shell sessions (`$` prompt, `#` comment, everything else output). Pin the lines a note explains with `annotations[].lines`; keep files to about 20 lines and trim the rest.
- **Carry the perspective shift.** The workshop changes how learners think about Copilot as much as it teaches the tech. Each module opens with "The team, before" (`ws-team`, `mode: 'before'`, wrong answers only: the doubts and misunderstandings learners often arrive with, voiced by the personas) and closes with "The team, after" (`mode: 'after'`): same six people, same order and tone, each revising their view. The notes ask the room which card they recognize, and tie each misconception to the exercise that tests it.
- **Every exercise is at least three slides: explain, do, check.** The explain slide (concept kind, `ex` set) teaches the one idea the exercise needs. The do slide is a `ws-exercise` workboard whose `exercise` carries `id`, `minutes`, `file`, `lead`, and `support`; hands-on minutes count once, there. The check slide is a `ws-check` with the asks, what to look for, and recovery moves.
- **Give learners copy/paste prompts.** Put the prompt that does the work in the workboard's `prompt` (a string, `{label, text}`, or an array for multi-step work) and the verification questions in the check's `ask`; both render with a Copy button. Keep workboard steps to two or three short lines when a prompt carries the detail.
- **Name files by what they are.** Call the always-on file "instructions" (`AGENTS.md`, `.github/copilot-instructions.md`, or rules, depending on the tool). Never name it "magic file".
- **Record coverage** in `slides/workshop/<slug>/deck.plan.yml`: each README section's slides or disposition, and any source conflicts found. The deck follows the README; conflicts go to the content owner.
- **Labels and evidence.** Every slide shows its kind (Concept, Example, Your turn, Checkpoint, Debrief). Before/after numbers in exercise files are targets unless sourced; keep them off slides.
- Set `DECK.meta.module`, `short`, `sources` (the module README), `repo` (base URL for exercise links), `journey`, `updated`, and `brief`.

## Slide contract: Actor, Question, Proof

This applies to every teaching slide, native or Slidev. Every teaching surface must make three things recoverable without relying on hidden presenter context:

1. **Actor:** Name who or what acts when agency matters. Distinguish the practitioner request, Copilot or agent action, control decision, and human approval. Avoid agentless phrases such as "work proceeds" when the actor is Copilot.
2. **Question and answer:** Every slide answers one audience question. The headline may state the answer rather than use a question mark, but the question and the slide's answer must be unambiguous.
3. **Proof:** When a slide claims behavior, show a representative input, action, or artifact together with its observable result on the same slide whenever practical. Label test-runner status separately from the domain result so terms such as `PASS`, `allow`, and `deny` cannot be mistaken for one another.

Carry enough context onto each slide that a viewer can identify the actor, task, and consequence after entering mid-section. Use the preceding slide for narrative momentum, not for essential disambiguation.

## Slide budget

Practitioner tech talks have room for 30+ slides, with no fixed slide-count ceiling. Count spine/template slides separately from teaching slides. Let the narrative, demonstration, and speaking-time budget determine the total; each teaching slide answers one audience question and advances the argument or proves a claim. Executive decks follow the approved per-slide plan and speaking-time budget in their recipe. Workshop decks cover every README section and exercise; their size follows the module, and facilitation time plus hands-on minutes land within the module budget in `workshop/README.md`.

## Validate after every change

```powershell
cd slides
npm run validate:native -- <tech-talks|workshop>/<slug>                       # full deck
npm run validate:native -- <tech-talks|workshop>/<slug> --only 5 --shots ..\tmp\shots   # one slide, with screenshot
```

A change to `slides/native/` validates every native deck in both folders. For workshop decks the validator also checks that each README exercise has a workboard linking the same file. Run `node slides/scripts/sync-index-dates.mjs` after slide changes.
