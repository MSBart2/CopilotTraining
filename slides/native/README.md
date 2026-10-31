# Native deck engine

A zero-build HTML, CSS, JavaScript, and SVG presentation engine for CopilotTraining
tech talks. Each deck is a folder of plain files; the browser is the runtime.

## Deck layout

```text
slides/
  native/                 shared engine (this folder)
    theme.css             brand tokens, part accents, SVG classes, shared card details, motion, settled state, print
    frames.css            layout for the standard slides in frames.js
    patterns.css          layout for the reusable patterns in patterns.js
    kit.js                window.Kit: the scene vocabulary
    frames.js             window.FRAMES: standard slides every deck shares
    patterns.js           window.PATTERNS: reusable layouts a deck can pick by name
    engine.js             render, navigation, live/settled lifecycle, overview, notes page
  tech-talks/<slug>/
    index.html            the deck
    notes.html            speaker notes with slide previews
    slides.js             window.DECK = { meta, slides }: content and notes
    scenes.js             window.SCENES: deck-only scenes and title/closing visuals
    deck.css              optional deck-specific layout
```

Both HTML pages load CSS in this order: `theme.css`, `frames.css`, `patterns.css`,
`deck.css`; and scripts in this order: `kit.js`, `frames.js`, `patterns.js`,
`slides.js`, `scenes.js`, `engine.js`. Paths are relative (`../../native/`), so the
same folder works from `slides/` locally and from `dist/` when deployed.

## Three layers

The engine merges `{ ...FRAMES, ...PATTERNS, ...SCENES }` and renders
`scenes[slide.scene || slide.id]`. Every stage carries `s-<slide id>` and
`sc-<scene name>`, so shared CSS targets the scene and deck CSS can still target
one slide.

| Layer | Scenes | Data each slide supplies |
|---|---|---|
| **Frames** | `title`, `core-question`, `contents`, `opener`, `before-after`, `today`, `references`, `thanks` | Title/thanks: `subtitle`, `tagline`, `meta`, `cards`, `prompt`, optional `visual` and `logo` (`false` hides it). Core question: `routing`, optional `routingLabel`, `roles`, `stats`. Contents: `sections`. Opener: `part`, `terminal`, `cards`. |
| **Patterns** | `terminal`, `showdown`, `scorecard`, `relay` (alias `patterns`), `signals`, `four-phases` | Terminal: `transcript`, optional `termTitle`. Showdown: `pairs` (any count; `right.optional` draws dashed), `outcomeLeft`, `outcomeRight`. Four phases: `stages` (one `target`), optional `stageLabel`, `gateLabel`. |
| **Deck** | Anything the talk alone needs, plus visuals | `visual: 'name'` on title or thanks renders `SCENES[name]`, which returns one 760×760 `svg.scene`. |

Use a frame or pattern whenever its shape fits, and change it in `native/` when a
deck needs an improvement every deck can share. A deck scene that reuses a shared
name overrides it; the validator warns so the override stays deliberate.

## Content and scenes

Each entry in `DECK.slides` carries `id`, `title`, `part` (1–4 sets the accent;
0 is the frame), and optional `pill`, `subtitle`, `footnote`,
`notes`, `know`, `cue`, `sources`, and `seconds`. Set `scene: 'name'` to share
one scene across several slides, and `chrome: false` to hide the progress bar.
The `pill` renders as a lowercase terminal-style prompt label (`› core question`).
Any `pillIcon` carried over from the Slidev source is not drawn.

A scene is a pure function that returns markup. Compose it from `Kit.html.head(s)`
for the section label, headline, and subtitle, plus one `Kit.svg.scene(w, h, label, inner)`
whose `label` states the slide's claim for screen readers. A slide without a
scene renders as a visible pending stub, and a scene that throws renders its
error on the slide.

## Notes are the teaching source

A native talk is the deck plus its speaker notes. The tech-talk README is a
short landing page; everything a presenter says, needs to know, or cites lives
in `slides.js`, and `notes.html` renders it as the reference and a printable
handout.

| Field | Renders as |
|---|---|
| `notes` | Talk track. `"…` lines are spoken (green); `→ …` lines bridge to the next slide (italic); other lines are presenter direction. |
| `know` | "Know" list: facts, numbers, boundaries for questions |
| `cue` | "Live demo" box |
| `sources` | `[{ label, href }]` links under the slide |
| `seconds` | Time budget; the notes page shows each slide's budget and the talk total |

`DECK.meta.question` and `DECK.meta.thesis` appear as the brief at the top of
the notes page. Keep notes in a `NOTES` object keyed by slide id and merge it
with `slides.forEach((s) => Object.assign(s, NOTES[s.id]))`; see
`tech-talks/surfaces/slides.js`. Notes render as HTML, so avoid raw `<` and `&`
(simple tags such as `<b>` and `<code>` are fine), and never use "should".

## Motion

Scenes declare motion; the engine decides when it plays. Wrap elements in
`enter`, `pop`, `glide`, or `trace`, and add `stream`, `ride`, or `halo` for
continuous signals. Each wrapper takes an `at` delay in milliseconds.

- Motion plays once each time a slide becomes current. `R` replays it.
- The final frame is the **settled state**. Reduced motion, print, the overview,
  the notes page, and `?settled` show it, so every claim is readable without
  animation.
- `.dim m-dim` fades an element to the dimmed state on entry.

## Presenting

| Key | Action |
|---|---|
| Right, Down, Page Down, Space, Enter, click | Next slide |
| Left, Up, Page Up, Shift+Space, Backspace | Previous slide |
| Home, End | First or last slide |
| `O` | Overview grid; click a slide to open it |
| `N` | Open speaker notes, which follow the deck when "Follow the deck" is on |
| `F` | Full screen |
| `R` | Replay the current slide's motion |

Links: `#matrix` opens a slide by id, and `#5` or `?slide=5` by its number.
Printing produces one settled 16×9 page per slide.

## Validate

```powershell
cd slides
npm run validate:native -- tech-talks/surfaces --shots ..\tmp\shots --live
```

The validator serves `slides/` locally and checks every slide for runtime errors,
labelled scenes, text that leaves the 1600×900 frame or runs into the progress
bar, overlapping scene text, text that spills out of the card drawn in its own
group, keyboard and hash navigation, a notes article per
slide, and one PDF page per slide. It fails on "should" or raw HTML in notes,
warns about slides with no notes or no `seconds`, and reports the total talk
time. It also warns when a deck scene overrides a shared
frame or pattern. `--shots` saves settled screenshots and the
PDF; `--live` adds mid-motion frames; `--only 1,5,6` narrows the run.

## Acknowledgement

The approach (a fixed 1600×900 stage scaled to the window, scenes authored as
SVG, motion that collapses to a settled state, and a notes page rendered from the
same data) was inspired by Harald Kirschner's deck
[The Agent Has Left the Chat](https://digitarald.github.io/slides/agent-has-left-the-chat/).
This engine is an independent implementation; it contains none of that deck's code.
