---
applyTo: "slides/native/**,slides/tech-talks/*/**"
description: "Use when editing native HTML tech-talk decks (slides.js, scenes.js, deck.css) or the shared engine in slides/native/. Covers the notes-first source of truth, scene authoring rules, and required validation."
---

# Native tech-talk decks

Native decks are practitioner tech talks only. Workshop and exec decks stay on Slidev (`slidev-decks.instructions.md` covers those).

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

## Validate after every change

```powershell
cd slides
npm run validate:native -- tech-talks/<slug>                       # full deck
npm run validate:native -- tech-talks/<slug> --only 5 --shots ..\tmp\shots   # one slide, with screenshot
```

A change to `slides/native/` validates every native deck. Run `node slides/scripts/sync-index-dates.mjs` after slide changes.
