---
status: active
updated: 2026-10-30
---

# Slide Machinery Conversion Plan

Convert live tech-talk decks from Slidev to a native HTML, CSS, JavaScript, and
SVG presentation engine inspired by Harald Kirschner's *The Agent Has Left the
Chat*. We work deck by deck, simplifying and beautifying each one as it moves.
`surfaces` is the pilot.

This document records findings, proposed decisions, and phases. Items marked
**Proposed** need approval before implementation.

## Resume point

Paused at the user's request on 2026-10-30, before converting `vscode-latest`.

- `surfaces` and the Phase 0/2 machinery are committed and deployed. The CI
  correction in `6d6a17c` installs Chromium and gates artifact upload on native
  validation/publishing; the public native deck and notes were verified.
- Practitioner talks now have room for 30+ slides with no fixed slide-count
  ceiling. Count spine/template slides separately from teaching slides and
  preserve the speaking-time budget. Workshop and exec budgets are unchanged.
- `vscode-latest` is the next selected candidate. Its README, existing 24-slide
  deck, recipe, approved September content refresh, and older research were read.
  No recipe or deck changes have been made, and no new recipe is approved.
- Next: use `deck-recipe-refresh` in conversion mode, preserving the existing
  recipe as a baseline. Propose roughly 32–36 focused visual slides within an
  estimated 46-minute speaking budget (README duration: 50 minutes), then obtain
  approval before Native Deck Author `convert`.
- Keep the current "through 1.139" scope unless a content refresh is requested.
  Reconcile the older research with the current README. Qualify local-inference
  claims: local model execution alone does not establish an offline workflow
  when tools or MCP can use the network. Label illustrative demo transcripts
  and targets separately from observed results.
- Archive policy remains open. Existing portfolio redirect errors concerning
  `agentic-sdlc` and `agent-readiness`, and the two previously reported script-test
  failures, remain separate from this conversion.

---

## 1. What the reference implementation does

Source: `digitarald/slides` (`gh-pages`), folder `agent-has-left-the-chat/`.
Six files, roughly 125 KB, and no build step, framework, or dependencies.

| File | Role |
|---|---|
| `index.html` | Empty `<main id="slides">` plus three scripts |
| `notes.html` | Speaker-notes page that renders the same frames beside the notes |
| `slides.js` | **Content model.** `window.SLIDES = [S(id, section, seconds, layout, data, notes, sources, cue)]`. Each slide carries display copy, a speaking-time estimate, spoken notes, a `know` list, a demo cue, and sources. |
| `deck.js` | **Scenes and runtime.** An SVG micro-vocabulary, one hand-authored `scenes[id](slide)` render function per slide, and the navigation and motion lifecycle |
| `styles.css` | Semantic theme tokens, layouts, the SVG class vocabulary, and keyframes |
| `hero3d.js` | Optional Canvas 2D title animation with a small 3D projection and a settled still frame |

### Mechanisms worth adopting

1. **Fixed 1600×900 frame, scaled by CSS `zoom`.** A `ResizeObserver` sets `--s`
   to `width / 1600`. Authors place everything in one coordinate space, and it
   renders identically in the deck, the notes page, and print.
2. **Every slide is an authored diagram.** Scenes compose small helpers: `box`,
   `win` (window chrome), `session`, `lock`, `flow` (dashed stream), `pk`
   (a packet riding `offset-path`), `draw` (stroke draw via `pathLength="1"`),
   `A` (staggered arrival), and `M` (move from a prior position). Copy lives in
   `slides.js`, and geometry lives in the scene.
3. **CSS-only motion keyed to visibility.** An `IntersectionObserver` toggles
   `.visible`. Every animation uses `animation-delay: var(--d)`, so motion
   replays on revisit and stops when the slide is offscreen.
4. **Settled final state everywhere.** `prefers-reduced-motion`, print, and the
   notes page collapse every animation to its explanatory end state. Print uses
   `@page 16in 9in`, so a PDF needs no special tooling.
5. **Scroll-snap navigation with stable hash URLs.** Each slide is a full-viewport
   section with `scroll-snap-stop: always`. Arrow, Page, Space, Home, and End keys
   move between slides; clicks advance; the URL becomes `#<slide-id>`.
6. **Semantic color.** Blue marks the host or protocol, mint marks ongoing work,
   amber marks a limit or decision, and red marks a rejection. Each color
   carries meaning.
7. **Accessibility built in.** Every SVG has `role="img"` and a sentence-length
   `aria-label` that states the diagram's claim.
8. **Notes as a first-class page.** The page shows the slide preview, section,
   time, `"spoken lines"`, `→ transitions`, a demo cue, Know facts, and sources.
   It includes a phone-friendly toggle to hide previews.

### Reuse rights

The repository has **no license**. All rights are reserved by default, so we
cannot copy his code into this repository. We can independently implement the
same techniques: visibility-triggered CSS animation, `offset-path` packets,
`pathLength` stroke drawing, zoomed fixed frames, and scroll-snap paging. These
are general web-platform patterns. Requesting permission from Harald remains an
option if we later want direct reuse. **Proposed:** independent implementation,
with an acknowledgement in the engine README.

---

## 2. Where we start

- **Active tech talks:** 15. Nine have Slidev decks under `slides/tech-talks/`:
  `agentic-lifecycle` (36), `copilot-on-github` (39), `copilot-primitives` (33),
  `custom-agents` (25), `exec-strategy` (20), `harness-fundamentals` (31),
  `local-agentic-sdlc` (28), `surfaces` (28), and `vscode-latest` (24). The other
  six have no deck under a matching name; the inventory phase confirms them.
- **Deploy:** `.github/workflows/deploy-slides.yml` runs `slidev build` for every
  `*.md` in `workshop/`, `tech-talks/`, and `exec-talks/` with an incremental
  manifest. It then copies `index-custom.html`, `404.html`, and companions.
- **Index:** `slides/index-custom.html` hard-codes cards, `updated` dates (via
  `sync-index-dates.mjs`), and Agenda/PDF chips.
- **Deep links:** Slidev URLs are `/<category>/<slug>/<n>`. `404.html` handles
  the SPA fallback.
- **Generation machinery:** `tech-talk-slide-generator.agent.md`, 40+ Vue
  components, `deck-recipe-review` and `deck-recipe-refresh`, `build-slidev-decks`,
  `inspect-slide`, `deploy.agent.md`, `slidev-decks.instructions.md`, and the
  companion scripts.

---

## 3. Proposed architecture

### Source layout: one engine per deck, chosen by file shape

```text
slides/
  native/                       # shared engine; copied to dist/native/
    engine.js                   # runtime: render, navigation, live/settled, overview, print, notes page
    kit.js                      # scene vocabulary: scene, rect, chip, text, enter, pop, trace, ride, halo
    theme.css                   # tokens, part accents, SVG classes, keyframes, reduced motion, print
    README.md                   # authoring guide and acknowledgement
  tech-talks/
    surfaces/                   # native deck: the presence of this folder selects the engine
      index.html                # about 20 lines: loads the engine and deck files
      notes.html
      slides.js                 # content, notes, timing, and sources (the source of truth)
      scenes.js                 # per-slide authored scenes
      deck.css                  # optional deck-specific layout
    harness-fundamentals.md     # still Slidev until converted
```

- **Rule:** `slides/tech-talks/<slug>/index.html` means native, and
  `slides/tech-talks/<slug>.md` means Slidev. Converting a deck deletes the `.md`
  in the same commit. CI fails when both exist.
- **Shared engine, per-deck scenes.** Harald's single deck inlines everything.
  With nine or more decks, we share the runtime, vocabulary, and theme and keep
  only the content and scenes per deck. A deck may extend `theme.css` with a
  small `deck.css`.
- **Zero build.** CI copies native folders to `dist/tech-talks/<slug>/` and
  copies the engine once. The URL path stays the same.

### Content model (proposed `slides.js` shape)

```js
S('matrix', 'Map the Surfaces', 60, {
  title: 'Rows are where you steer; columns are where work runs',
  // display data consumed by scenes.matrix
}, notes: ['"Spoken line"', 'Stage direction', '→ transition'],
   know: ['Fact if asked'], sources: [SRC.docs], cue: [])
```

**Decided (notes-first):** for native talks, the per-slide speaker notes in
`slides.js` (`notes`, `know`, `sources`, `seconds`) are the teaching source,
and `notes.html` is the readable and printable reference. The README shrinks to
a landing page: frontmatter (inventory and router inputs), H1, the question
block, a thesis, links to the deck and notes, one `##` per part with a
one-line summary, artifacts, and related talks. The recipe gains an optional
`scene:` intent per slide covering the claim, the motion beat, and the settled
state. `slides.js` becomes the deck source of truth, replacing the
`<!-- SLIDE: -->` Markdown.

### Visual language

**Decided:** keep the current CopilotTraining brand (`slides/copilot-brand.md`)
and Harald's semantic-color discipline. Each part carries the Slidev section
accent (part 1 cyan, part 2 blue, part 3 indigo, part 4 violet). Execution
zones keep their deck colors: cyan local, blue remote, indigo GitHub, and violet
product runtime. Purple marks the hero idea or active route, green a reviewed
outcome, and orange a human decision or limit.

**Motion:** each slide animates once on entry and replays on every visit (`R`
replays in place). The final frame is the settled state, which reduced motion,
print, overview, the notes page, and `?settled` all show.

### Compatibility

- `/<category>/<slug>/<n>` on a native deck uses `404.html` to resolve slide *n*
  to `#<id>` through a numeric fallback in `engine.js`.
- `?print` and `/presenter/` Slidev routes redirect to `index.html` and
  `notes.html`.
- Index cards point at the same folder URL, so no index change is needed for
  the link itself.

### Companions

Print CSS makes `deck.pdf` a single Playwright `page.pdf()` call, and an
agenda can come straight from `slides.js`. **Proposed:** during the pilot,
native decks are exempt from `check-companions --strict`, and their existing
companions remain until the native generator lands in Phase 5.

### Validation (replaces `build-slidev-decks` and `inspect-slide`)

A Playwright script serves the deck statically and, for every slide:

- checks for no console errors, verifies that a scene exists, and confirms that
  the SVG has an `aria-label`,
- captures **settled** screenshots with reduced motion enabled,
- detects overflow: no text box extends outside the 1600×900 frame or overlaps
  a sibling label,
- runs a keyboard navigation round trip and resolves the hash deep link,
- prints a PDF and checks that the page count equals the slide count.

---

## 4. Phases

### Phase 0: Foundations (no deck changes ship)

- [x] Build `slides/native/` (engine, vocabulary, theme, README) as an
  independent implementation.
- [x] Add `scripts/validate-native-deck.mjs` with the checks above
  (`npm run validate:native -- tech-talks/surfaces --shots <dir> [--live]`).
- [x] Teach `deploy-slides.yml`, `build-all.sh`, and `build-all.ps1` to select
  the engine by file shape, validate and copy native folders and the engine,
  preserve a same-slug Slidev source as a conversion reference, and reject
  incomplete native decks or duplicate deployment targets.
- [x] Verify numeric 404 routes for native decks through the existing
  `?slide=<number>` route; the engine already resolves that query.
- [x] Teach `sync-index-dates.mjs` and `check-companions.mjs` to read native
  decks. Native homepage cards use the notes page instead of legacy agenda/PDF
  files; those companions remain a Phase 5 item.
- [x] Teach the portfolio inventory (`scripts/portfolio-inventory-lib.mjs`) to
  accept `slides/tech-talks/<slug>/slides.js` as the deck, reading status and
  section from the README. The inventory validates required native files and
  the notes page without requiring Slidev frontmatter or native agenda/PDF
  companions.
- [ ] Decide on archived Slidev decks: CI builds them today, while local
  `build-all` skips them. **Proposed:** freeze each archived deck's compiled
  `dist` output as a committed snapshot, which removes archived decks from the
  Slidev build path.

### Phase 1: Pilot, `surfaces` (iterate until it is the reference)

See §5. Exit when the deck passes validation, a presenter has run it end to
end, and the scenes vocabulary has stabilized.

### Phase 2: Rebuild the authoring machinery from the pilot

- [x] Add a **Native Deck Author** agent (`new`, `convert`, `patch`) that turns
  the research and recipe into `slides.js` (slide data plus notes), then authors
  `scenes.js` one scene at a time and validates each. The Slidev
  `tech-talk-slide-generator.agent.md` stays, marked legacy, for patches to
  unconverted talks; it retires in Phase 4.
- [x] Retarget the `Tech Talk Generator` agent to research brief → `research.md`
  (approved evidence and per-part teaching material, never published) → landing
  README → recipe → handoff. `tech-talks/TEMPLATE.md` is now the landing
  template. The `tech-talk-personas` skill is retired: practitioner talks
  frame the audience by role, without named personas.
- [x] Point `content-refresh` and `ledger-tech-talk-refresh` at `slides.js`
  notes for native talks.
- [x] Extend `deck-recipe-review` (and its template) with a per-slide `slides:`
  plan (claim, scene intent, seconds); `deck-recipe-refresh` prepares
  conversions and routes native post-recipe work to Native Deck Author.
- [x] Add one `validate-native-deck` skill covering both the full gate and
  single-slide inspection (`--only`, `--shots`, `--live`). `build-slidev-decks`
  and `inspect-slide` stay for Slidev decks and point to it.
- [x] Add `native-decks.instructions.md` for `slides/native/**` and
  `slides/tech-talks/*/**`.
- [x] Update `deploy.agent.md` (native validation gate), the AGENTS.md "Slide
  Generation" section and refresh step 5, and the `content-refresh` cheap path
  so text patches edit `slides.js`. Validator fails on "should" or raw HTML in
  notes, warns on missing notes or `seconds`, and reports talk time.
- [x] Extend `scripts/content-generation.test.mjs` to hold Native Deck Author
  to the clarity gate and the judgment contract, and to check the notes-first
  outputs.

### Phase 3: Convert the remaining active decks one at a time

Each conversion passes through the recipe refresh, which approves the
slide-count consolidation. It then follows this sequence: `slides.js`, scenes,
validation, presenter run-through, deletion of the `.md`, and an update to
companions.

### Phase 4: Retire Slidev for tech talks

Remove unused Vue components and Slidev-only scripts after the last consumer
moves. Workshop and exec Slidev decks remain until their own decision.

### Phase 5: Native companions

Add native agenda and PDF generation, then remove the pilot exemption.

---

## 5. Pilot: `surfaces` scene map

**Decided:** the pilot keeps all 28 slides with identical content and the
Slidev numbering, so `#12` reaches the same slide in both decks. Each slide gets
a native scene in turn; slides without one render as a visible "pending" stub.
Consolidation waits until the new layouts exist, then goes through the recipe
refresh.

**Built (iteration 1):** the engine, `title` (seven surfaces around a task card,
spokes tracing in and packets flowing out), `matrix` (a 5×4 control×execution
grid that builds row by row), and one shared `route` scene for the six role
slides (the same fixed matrix frame; off-route cells dim, a purple route traces
through numbered steps, and a packet rides it; the single-step route gets a
halo).

The table below records the consolidation candidate from planning. It is an
input to that later recipe refresh, not the current slide list.

| # | Slide id | Claim (headline answers the question) | Scene and motion beat | Settled state |
|---|---|---|---|---|
| 1 | `title` | Which Copilot Where? | A task card hovers; seven surfaces arrange around it; the card routes to one surface | The card is docked at one surface, with the others dim |
| 2 | `question` | "Which Copilot surface owns this work next?" | The question resolves into four routing words: context, artifact, reviewer, handoff | Four labeled chips |
| 3 | `matrix` | Rows are where you steer; columns are where work runs | A control×execution grid builds; seven experiences land in cells; off-diagonal arrows stream to show control steering remote work | A full grid with highlighted off-diagonal cells |
| 4 | `routes` | Each role takes a different path through the same map | **Reuses the matrix geometry.** A role picker cycles PM, Docs, Design, Platform, Delivery, and Embedded; for each role, a path draws through numbered cells and a packet rides it | All six routes are overlaid in role colors, with a legend |
| 5 | `router` | Route by outcome, then by context | A task packet falls through four questions; each gate opens left or right; the packet lands on a surface | The tree shows the four branches and their surfaces |
| 6 | `s2-intro` | Start every role with one reviewed first win | First task → artifact → acceptance owner → move signal, drawn as one lane | A single lane |
| 7 | `onboard-shape` | PM and Docs: shape the work in GitHub | Two lanes run in parallel; the artifact card fills; a reviewer stamp lands; an amber "move when" gate opens | Both lanes complete |
| 8 | `onboard-validate` | Test and Design: validate beside the change | Same lane grammar | Same |
| 9 | `onboard-coordinate` | App and SDK: coordinate fleets or embed | Same lane grammar with fan-out (app) and product trigger (SDK) | Same |
| 10 | `maturity` | Four phases, one evidence gate | A four-step road; telemetry places a marker; the gate stays closed until a reviewed-artifact card arrives, then opens | The marker sits at phase 2, with gate 3 closed and annotated |
| 11 | `scorecard` | One scorecard proves the next capability | Baseline, reviewed artifacts, guardrail, and target appear with count-up numbers; a threshold line draws | The full scorecard |
| 12 | `incident` | Diagnose where the runtime lives | A terminal window types the CLI prompt; evidence chips leave the host; a boundary line marks "repository work starts here" | Transcript plus evidence chips |
| 13 | `restore-prevent` | Restore now, prevent the repeat | The fix moves into the VS Code window; incident closure gets an amber human stamp; a dashed optional branch sends the prevention issue to the coding agent | Both paths are visible, with the optional one dashed |
| 14 | `patterns` | Three reusable handoff patterns | Three mini pipelines: Explore → Delegate → Review, Diagnose → Encode → Productize, and Plan → Fan Out → Integrate | Three pipelines |
| 15 | `signals` | Boundary signals tell you when to move | Each signal (context moves, reviewer changes, streams multiply) lights up and the work card hops surfaces | Signal-to-move table |
| 16 | `close` | What you can do today | 15-minute, 1-hour, and 2–4-hour tiers arrive as commands and artifacts | Three tiers |
| A | `references` | Appendix | Sources list | — |

Notes for every slide are written into `slides.js` from the former README
sections, as `"spoken"`, direction, and `→ transition` lines under the
Universal Voice contract. **Built:** all 28 slides carry notes, facts, sources,
and a time budget totaling 42:00 (estimates), and the README is a landing page.

---

## 6. Decisions and open questions

| Area | Question | Status |
|---|---|---|
| Reuse rights | Independent implementation or permission request? | **Decided:** independent implementation |
| Source model | Use `slides.js` (JS, comments, helpers) or `deck.json` (validatable)? | **Decided:** `slides.js` |
| Engine location | Use `slides/native/` shared, or a fully self-contained folder per deck? | **Decided:** shared |
| Visual language | Use Harald's dark semantic palette or the current brand? | **Decided:** current brand plus part accents |
| Navigation | Keep scroll-snap paging, or add a presenter mode with a timer or next-slide view? | **Built:** one slide at a time, keys, click, swipe, overview (`O`), notes sync (`N`); presenter timer open |
| Per-slide builds | Animate once on entry (Harald), or add click-stepped builds? | **Decided:** animate once on entry |
| Exec talks | Include `exec-strategy` (an exec talk) in this conversion? | **Decided:** excluded; exec decks stay on Slidev |
| Archives | Commit snapshots or keep Slidev builds in CI? | **Proposed:** snapshots |
| Companions during pilot | Exempt native decks from agenda/PDF companion checks? | **Built:** native notes are required; native agenda/PDF generation remains Phase 5 |
| Pilot slide count | Consolidate from 28 to about 16? | **Decided:** keep 28 for now; revisit after the layouts exist |
| README role | Keep the long README as the reference, or make the notes the reference? | **Decided:** notes-first; the README becomes a landing page (pilot: `surfaces`) |

## 7. Conversion tracker

| Deck | Slides now | Target engine | State | Evidence |
|---|---|---|---|---|
| surfaces | 28 | native | Pilot complete: 28 of 28; standard slides and patterns extracted to `native/frames.js` and `native/patterns.js` (deck keeps 6 deck-only scenes); notes-first: 28 slides of notes, README slimmed to a landing page | `validate:native` passes (28 slides, 28 PDF pages); pixel-identical to pre-extraction baseline |
| agentic-lifecycle | 36 | native | Not started | — |
| copilot-on-github | 39 | native | Not started | — |
| copilot-primitives | 33 | native | Not started | — |
| custom-agents | 25 | native | Not started | — |
| harness-fundamentals | 31 | native | Not started | — |
| local-agentic-sdlc | 28 | native | Not started | — |
| vscode-latest | 24 | native | Selected next; source review complete; paused before recipe proposal or conversion | See resume point |
| exec-strategy | 20 | Slidev | Out of scope: executive talk | Scope decision recorded below |

## 8. Decision log

| Date | Question | Answer and rationale | Consequences |
|---|---|---|---|
| 2026-10-30 | Can we reuse the reference code directly? | No license is published, so all rights are reserved. | Independent implementation of the general techniques |
| 2026-10-30 | Engine, palette, motion, pilot scope | Shared `slides/native/` engine; current brand palette; animate once on entry; keep 28 slides with identical content; pilot starts with the engine plus title, matrix, and routes. | Consolidation and new layouts follow once the scenes exist; numeric links stay compatible |
| 2026-10-30 | Where does the teaching content live? | Notes-first: `slides.js` notes carry the spoken argument, facts, and sources; the README is a landing page. `research.md` holds approved evidence and is never published. | Refreshes patch notes, not a long README; the notes page is the handout |
| 2026-10-30 | Scope of the refactor | Practitioner tech talks only (the one-hour show and tell). Workshop and exec decks stay on Slidev. | Legacy Slidev agent and skills remain for those decks and for unconverted talks |
| 2026-10-30 | Template action horizons and agenda | Today / This Week / This Month, mirroring the `today` slide; native decks carry the agenda in the core-question notes. | Converted talks drop the agenda slide |

## References

- [Reference experience](https://digitarald.github.io/slides/agent-has-left-the-chat/#s2-intro)
- [Reference source](https://github.com/digitarald/slides/tree/gh-pages/agent-has-left-the-chat)
- [Speaker notes reference](https://digitarald.github.io/slides/agent-has-left-the-chat/notes.html)
- Repository policy: `AGENTS.md`
- Current deployment: `.github/workflows/deploy-slides.yml`
- Current local bulk build: `slides/scripts/build-all.sh`
- Current slide-link fallback: `slides/404.html`
