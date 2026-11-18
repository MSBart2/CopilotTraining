---
name: validate-native-deck
description: Validate and visually inspect native HTML decks (slides/tech-talks/{slug}/ or slides/workshop/{slug}/ with slides.js). One command checks runtime errors, scene labels, overflow and overlap, navigation, notes coverage and voice, print pages, total talk time, and workshop exercise coverage; --only and --shots inspect single slides with screenshots. Triggers - validate native deck, inspect native slide, check deck, slide overflow, talk time.
infer: true
---

# Validate Native Deck

Fast edit-and-verify loop for native tech-talk, executive, and workshop decks. Slidev decks (unconverted workshop modules and talks) use `build-slidev-decks` and `inspect-slide`.

## Commands

Run from `slides/` (use `workshop/<slug>` for workshop decks):

```powershell
npm run validate:native -- tech-talks/<slug>                                         # full gate
npm run validate:native -- tech-talks/<slug> --only 5,6 --shots ..\tmp\<slug>        # inspect slides 5 and 6
npm run validate:native -- tech-talks/<slug> --only 5 --shots ..\tmp\<slug> --live   # add mid-motion frames
```

- `--only` takes 1-based slide numbers.
- `--shots <dir>` writes `NN-<id>.png` (settled state) per slide plus `deck.pdf`.
- `--live` adds `NN-<id>.live-<ms>.png` frames during the entry motion; use it when timing or choreography matters.

Put screenshots under `tmp/` and delete them when done. View each PNG with the `view` tool.

## What it checks

| Check | Failure means |
|---|---|
| Runtime | A page error or console error while loading or stepping through slides |
| Scenes | A slide renders the pending stub, or an `svg` lacks an aria-label |
| Layout | Text leaving the 1600×900 frame, body content running into the progress bar, overlapping SVG text, text spilling out of its card, or HTML text overflowing its table cell, code block, or workshop card |
| Navigation | ArrowRight/ArrowLeft, Home/End, or an id hash deep link does not land on the expected slide |
| Notes | `notes.html` article count differs from slide count; "should" or raw `<`/`&` in notes |
| Print | PDF page count differs from slide count |
| Workshop | `DECK.meta.sources` missing; a README exercise has no `ws-exercise` workboard, links a different file, or has no hands-on minutes |

Warnings list slides missing `notes` or `seconds`, and deck scenes that override a shared frame, pattern, or workshop layout name. The summary line ends with the total talk time (`talk m:ss`) from the `seconds` budgets, plus `hands-on N min` for workshop decks.

## Reading screenshots

Look for: a headline wrapping to three lines, chips or labels colliding, text running past a card edge, a scene sitting off-center or leaving a large empty band, color used outside its meaning (part accents, zone colors, purple hero, green reviewed outcome, orange human decision).

## After changing `slides/native/`

Shared changes affect every native deck. Validate each folder under `slides/tech-talks/` and `slides/workshop/` that has a `slides.js`, starting with `tech-talks/surfaces` and `workshop/01-instructions`.
