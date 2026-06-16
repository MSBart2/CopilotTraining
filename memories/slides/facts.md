# slides / facts

Confirmed, locked facts about Slidev infrastructure, build rules, and structural gotchas.

---

## Component content validator limits — character maximums per component (2026-06-16)

`schema_version: 1` | `date: 2026-06-16`

The build validator enforces per-component character limits that are NOT documented in `template.md`. Exceed them → `[WARN]` lines in build output (deck still builds `[OK]` but content may overflow visually).

| Component | Constraint | Max |
|---|---|---|
| `FourCardGridSlide` | `:cards` items | exactly 4 (insight prop counts toward limit — remove it if you have 4 cards) |
| `ThreeColumnCardSlide` | `description` per column | 100 chars |
| `MaturityJourneyRoadmapSlide` | `description` per stage | 100 chars |
| `FrameworkMappingRowsSlide` | `label` per row | 13 chars |
| `FrameworkMappingRowsSlide` | `description` per row | 70 chars |

**`FourCardGridSlide` + insight:** The validator counts `:insight` as an item alongside `:cards`. If you have 4 cards + insight = 5 items → CARDS_MAX warning. Workaround: remove `:insight` when you need all 4 cards.

---

## Blank line required between `---` and `<!-- SLIDE: -->` (2026-05-05)

`schema_version: 1` | `date: 2026-05-05`

Every `---` slide separator must be followed by a **blank line** before the `<!-- SLIDE: Name -->` comment. Missing the blank line causes Slidev to misparse the slide boundary.

✅ Correct:
```
/>

---

<!-- SLIDE: Next Slide -->
<ComponentName
```

❌ Wrong (what the generator produced on 2026-05-05):
```
/>

---
<!-- SLIDE: Next Slide -->
<ComponentName
```

**Fix:** Use PowerShell to repair all occurrences at once:
```powershell
$file = "slides/tech-talks/{slug}.md"
$content = [System.IO.File]::ReadAllText($file)
$fixed = $content -replace "---\r?\n(<!--)", "---`r`n`r`n`$1"
[System.IO.File]::WriteAllText($file, $fixed, [System.Text.UTF8Encoding]::new($false))
```

**Root cause:** The tech-talk-slide-generator agent's "Common mistakes" list said `---` must be on its own line but did not explicitly require the blank line after it. Fixed by adding the rule to `.github/agents/tech-talk-slide-generator.agent.md`.

---

## TwoColPairedConceptsSlide `code` prop block was hardcoded dark (2026-04-26)

`schema_version: 1` | `date: 2026-04-26`

The `<pre>` rendered by the optional `code` prop in `TwoColPairedConceptsSlide.vue` had hardcoded dark classes (`bg-gray-950/80 border-gray-700/50`). Fixed by adding `codeBg`/`codeBorder`/`codeText` to `DARK`/`LIGHT` theme objects and applying via `:class`:

```js
const DARK = { ..., codeBg: 'bg-gray-950/80', codeBorder: 'border-gray-700/50', codeText: 'text-gray-200' }
const LIGHT = { ..., codeBg: 'bg-gray-100',    codeBorder: 'border-gray-300',    codeText: 'text-gray-800' }
```
```html
<pre :class="[t.codeBg, t.codeBorder, t.codeText]">...</pre>
```

**Root cause of slip-through:** `component-test.md` had no instance of this component with a `code` prop, so the code path was never visually tested.

---

## UnoCSS does NOT reliably scan `.ts` files or pick up HMR class additions (2026-04-25)

`schema_version: 1` | `date: 2026-04-25`

UnoCSS scans `.vue` and `.md` files for class strings at dev-server start. Two failure modes confirmed:

**1. Classes in `.ts` files are not compiled into the CSS bundle.**
`useSectionTheme.ts` defines `LIGHT_CARDS` with Tailwind class strings (`bg-cyan-200`, `border-blue-400`). Because UnoCSS does not scan `.ts` files, these classes produce no effect at runtime — the element renders as transparent. **Fix:** use `:style` with raw CSS values (`bgColor`/`borderColor` inline rgba strings) instead of `:class` with Tailwind names.

**2. New classes added to `.vue` files via HMR are not injected into the CSS bundle.**
If a class string appears in a component *after* dev-server start (via file edit + HMR), it does not get compiled. The class is in the DOM but `getComputedStyle()` returns `rgba(0,0,0,0)`. **Fix:** restart the dev server to force a full UnoCSS rebuild, OR use `:style` with inline CSS values to bypass UnoCSS entirely.

**Diagnostic:** Use Playwright `page.evaluate()` to check `getComputedStyle(el).backgroundColor`. If `rgba(0,0,0,0)` despite a bg class being present, the class is not in the bundle.

**Pattern for bypassing UnoCSS in LIGHT_THEME objects:**
```js
// In DARK_THEME: use Tailwind class strings (they were in the original bundle)
itemBg: 'bg-gray-900/50 border-gray-700/50',
itemBgStyle: {},

// In LIGHT_THEME: use inline style object
itemBg: 'border-gray-200',
itemBgStyle: { background: 'rgb(243,244,246)' },  // = gray-100
```
Then in the template: `:class="t.itemBg" :style="t.itemBgStyle"`.

---

## slide 37 in component-test.md is BeforeAfterSlide, not BeforeAfterMetricsSlide (2026-04-25)

`schema_version: 1` | `date: 2026-04-25`

The component-test deck has two consecutive Before/After slides close together. When debugging slide N, always confirm the component by reading the DOM (`page.innerHTML`) rather than guessing from the slide number and component name similarity. Use Playwright `page.evaluate()` to find the active slide container and read its `innerHTML` or `textContent` to confirm which Vue component is rendering.

---

## Do NOT use runSubagent for slide generation — use direct agent invocation (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

The Tech Talk Slide Generator produces a full slide deck (18–24 slides + build commands). This consistently exceeds the subagent response length cap, causing the task to fail with "response hit the length limit."

**Never use `runSubagent` for slide generation.** Instead, tell the user to invoke the agent directly in a new Copilot Chat session:

```
@Tech Talk Slide Generator tech-talks/{topic}
```

Same applies to any other agent that produces large file outputs (Tech Talk Generator, Module Creator).

---

## Slide validation MUST use `.\build.ps1 -Deck {slug}`, not `npm run build` (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

`npm run build -- tech-talks/{slug}.md` compiles the deck but **skips prop linting**. It will exit `[OK]` even when component guards are violated (e.g., `TocSlide` sections ≠ 4, `DESC_MAX` overflow, `LABEL_MAX` overflow).

The only build command that runs `Invoke-PropLint` is the wrapper at `slides/build.ps1`:

```powershell
# from slides/ directory:
.\build.ps1 -Deck {slug}
```

This delegates to `scripts/build-all.ps1`, which runs `Invoke-PropLint` after every successful Vite build and emits yellow `[WARN] line N:` messages for violations.

**If dispatching slide generation as a general-purpose agent** (because `Tech Talk Slide Generator` is not an available task agent type), the prompt MUST specify `.\build.ps1 -Deck {slug}` — not `npm run build`. Giving the wrong command causes all prop violations to pass through silently.

---

## Multiline `:prop` array bindings break Vue template parser in Slidev (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

Writing a `:cards` (or any array prop) as a multiline attribute value causes `Error parsing JavaScript expression: Unexpected token, expected ","` in the Vite/Vue compiler. Slidev processes `.md` files as Vue SFCs — newlines inside a dynamic attribute value are invalid.

**Broken:**
```
:cards="[
  { icon: '⏱️', value: '...' },
]"
```

**Fixed:** collapse to a single line:
```
:cards="[{ icon: '⏱️', value: '...' }, { icon: '🎯', value: '...' }]"
```

Also: `&#39;` HTML entities inside `:prop` bindings cause attribute-name parse errors. Use escaped single quotes (`\'`) instead, or rewrite to avoid apostrophes.

**Applies to:** `ThankYouSlide :cards`, `CoreQuestionSlide :cards`, any component that takes an array prop. The slide generator must always write array props on a single line.

---

## Slide generator MUST emit blank line between --- and <!-- SLIDE: --> (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

Every `---` slide separator **must be followed by a blank line** before the `<!-- SLIDE: Name -->` comment. Writing `---\n<!-- SLIDE:` (no blank line) causes slides to render blank — Slidev's renderer requires `---\n\n<!-- SLIDE:`.

**Broken (causes blank slides):**
```
/>

---
<!-- SLIDE: Core Question -->
```

**Correct:**
```
/>

---

<!-- SLIDE: Core Question -->
```

**Bulk fix in PowerShell:**
```powershell
$content = [System.IO.File]::ReadAllText($path)
$fixed = $content -replace "---`n(<!-- SLIDE:)", "---`n`n`$1"
[System.IO.File]::WriteAllText($path, $fixed, [System.Text.UTF8Encoding]::new($false))
```

---

## Apostrophes and contractions in single-quoted props always break builds (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

Any `'` character inside a single-quoted HTML attribute (`:prop='[...]'`) terminates the attribute — HTML parsing happens before Vue template compilation. There is no valid escape: `\'` passes the `\` as literal but the `'` still ends the attribute; `&#39;` works for display text but causes attribute-name parse errors inside JS expressions.

**Rule: rewrite to avoid apostrophes entirely.** Contractions → full words (`don't` → `do not`, `can't` → `cannot`, `won't` → `will not`). For possessives, rephrase (`the agent's context` → `the agent context`).

---

## Commas in `tag` prop values break UnoCSS CSS generation (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

`FrameworkMappingRowsSlide` (and any component that uses a `tag` prop for UnoCSS attribute selectors) must **not have commas** in `tag` values. UnoCSS maps the value directly into a CSS attribute selector; a comma inside produces an unparseable `[rows~="\$2\,250\/mo\\"]` which crashes the Vite dev server.

**Broken (crash at dev-server startup):**
```
{ label: "Revert rate", tag: "$2,250/mo" }
```

**Fixed:**
```
{ label: "Revert rate", tag: "$2.25K/mo" }
```

Rule: use `.` separators, abbreviate (K/M), or drop the number entirely.

---

## SectionOpenerSlide prop limits: title ≤40 chars, subtitle ≤120 chars (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

`SectionOpenerSlide` uses `text-5xl font-bold` for the title and `text-2xl font-normal opacity-70` for the subtitle. At slide width:
- **title** wraps at ~40 chars — anything longer causes visible text overflow
- **subtitle** overflows the slide height at >120 chars (crowding the card row)

Both limits are enforced in `build-all.ps1` `Invoke-PropLint` as non-blocking `[WARN] line N:` warnings.

The recipe `sectionModes[].note` values are typically 150–165 chars — always condense to ≤120 when using as subtitle.

---

## Prop linter calibrated limits in build-all.ps1 (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

The `Invoke-PropLint` function in `scripts/build-all.ps1` enforces these limits:

| Component | Prop | Max | Notes |
|---|---|---|---|
| `FrameworkMappingRowsSlide` | `label` | 13 | `w-28` column at `text-sm font-bold` wraps at ~13 chars |
| `FrameworkMappingRowsSlide` | `description` | 70 | Center column overflow threshold |
| `SectionOpenerSlide` | `card.blurb` | 75 | Template says 60, raised to 75 after real-deck calibration |
| `SectionOpenerSlide` | `card.title` | 30 | |
| `CoreQuestionSlide` | `card.title` | 40 | |
| `CoreQuestionSlide` | `card.description` | 90 | |
| `TocSlide` | `section.title` | 49 | Template says 40, raised to 49 after real-deck calibration |
| `TocSlide` | `section.blurb` | 100 | |
| All 13 Tier-1 body components | `title` | 80 | |

Warnings are **non-blocking** — build reports `[OK]`, violations appear as `[WARN] line N:` in yellow.

---

## FrameworkMappingRowsSlide layout limits: label ≤13 chars, description ≤70 chars (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

`FrameworkMappingRowsSlide` uses a `w-28` (7rem) fixed-width label column at `text-sm font-bold`. Labels longer than 13 chars **will visually wrap to two lines**, breaking the row layout.

- `label` max: **13 chars** (enforced by `Invoke-PropLint` in `build-all.ps1`)
- `description` max: **70 chars** (enforced by same linter)

**Examples:**
- `"Code Review"` (11 chars) ✔
- `"Pull Requests"` (13 chars) ✔ borderline
- `"Labels & Assign"` (15 chars) ✘ wraps

---

## `throw` inside Vue `<script setup>` is useless — Vite build passes, slide goes blank (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

Vue SSR's error boundary silently catches any exception thrown inside `<script setup>`. The Vite build reports exit code 0 with no warnings. The slide renders blank. There is no console output visible to the deck author.

**Replacement:** use `validationError = computed(...)` + `<div v-if="validationError">` overlay in the template. See `slides/discoveries.md` → "Visual prop error guard" for the canonical pattern.

**All 20 components updated** (13 body + 7 structure) as of 2026-04-21. `validatePartNumber()` in `useSectionTheme.ts` still exists but is no longer called by any component.

---

## Structure component authoring edges: TitleSlide, SectionOpenerSlide.terminal (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

**TitleSlide file order is reversed** — `<template>` block appears before `<script setup>` (unusual; all other components follow script-first order). It also has **two sibling root elements** (`sv-title-slide` + `sv-title-meta`) — a Vue 3 fragment. When wrapping in an error guard, you cannot use `absolute inset-0`; instead give the error div `class="h-full bg-red-950 ..."` and wrap both sibling divs in `<template v-else>`.

**SectionOpenerSlide.terminal is required and must be an object** — passing it as `undefined` or omitting it causes a Vue TypeError (`Cannot read properties of undefined (reading 'context')`). The slide goes silently blank. Shape: `{ context: string, detail: string }`. This is the most common authoring mistake — check every SectionOpenerSlide invocation for a valid `:terminal` binding.

**ThankYouSlide correct props** — `title`, `subtitle`, `cards` (array of 2–4 items with `{ icon, value, detail, subdetail }`), and `prompt`. Props `message` and `links` do NOT exist; using them causes a blank slide with no error. The `cards` array must be 2–4 items.

---

## Tier-1 body component catalog: 13 components, inline HTML forbidden (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

As of 2026-04-21, there are **13 Tier-1 body-content components** (up from 8). All 13 are in `slides/tech-talks/components/`. Using inline HTML for body slides is **forbidden**.

**Original 8:** `BeforeAfterMetricsSlide`, `BeforeAfterPanelsSlide`, `ProblemSolutionOutcomeSlide`, `TwoColPairedConceptsSlide`, `ThreeColumnCardSlide`, `FourCardGridSlide`, `CodeWithFeaturesSlide`, `HeroStatSlide`

**5 new additions (2026-04-21):**
- `WorkflowShowdownStepsSlide` — before/after workflow step comparison
- `MaturityJourneyRoadmapSlide` — horizontal maturity arc with level callouts
- `AITerminalTranscriptSlide` — AI terminal transcript display
- `MaturityLevelDrilldownSlide` — single maturity-level drilldown with bullets
- `FrameworkMappingRowsSlide` — taxonomy/classification row grid

**All 13 require** `partNumber` (1–4) and `progressDots: { current, total, activeColor }`. Full prop schemas in `slides/tech-talks/template.md`. Visual reference deck: `slides/tech-talks/component-test.md`.

---

## ALL Tier-1 body components require `progressDots` (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

All 13 Tier-1 body-content components require `progressDots: { current: N, total: M, activeColor: string }`. No exceptions.

**`activeColor` by partNumber** (Tailwind class string passed verbatim):
| Part | activeColor |
|------|-------------|
| 1 | `bg-cyan-400 shadow-lg shadow-cyan-500/50` |
| 2 | `bg-blue-400 shadow-lg shadow-blue-500/50` |
| 3 | `bg-indigo-400 shadow-lg shadow-indigo-500/50` |
| 4 | `bg-purple-400 shadow-lg shadow-purple-500/50` |

**Additional:** `HeroStatSlide.insight` is **required** (not optional). `HeroStatSlide` also requires both `subtitle` and `insight` — neither is optional.

**Retroactive impact:** Vue does not fail builds for missing required props. Always supply `progressDots` on every body component invocation.

---

## Slidev component registration when running decks from subdirectories (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

When running `slidev tech-talks/agentic-journey.md`, Slidev treats `tech-talks/` as the project root, not `slides/`. Consequences:

- `<script setup>` blocks in the markdown file **only apply to slide 1**
- Slides 2+ rely on global component registration via `setup/main.ts`
- Slidev looks for `tech-talks/setup/main.ts`, NOT `slides/setup/main.ts`
- Components must be in `tech-talks/components/`, NOT `slides/components/`

Without this pattern, components only render on slide 1; slides 2+ fail with `[Vue warn]: Failed to resolve component: TitleSlide`.

---

## Tailwind JIT requires literal class strings: dynamic `grid-cols-${N}` is silently dropped (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

Any component that needs a variable column count must use a lookup constant containing literal class names. Tailwind's JIT scanner reads source as text and cannot resolve runtime concatenation.

**Wrong:** `<div :class="'grid-cols-' + count">` — class is generated at runtime, JIT never sees it, no CSS emitted.

**Right:**
```ts
const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}
const gridClass = computed(() => GRID_COLS[props.count] ?? 'grid-cols-2')
```

---

## Content slide colors must match their section's partNumber color scheme (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

Every content slide between two SectionOpenerSlide boundaries must use colors matching that section's `partNumber`.

| Part | Primary | Secondary | Background | Orb | Pill | Dot | Accent Line |
|------|---------|-----------|------------|-----|------|-----|-------------|
| 1 | cyan | blue | `from-cyan-900/20 via-blue-900/10` | `from-cyan-500/10` | `from-cyan-600/80 to-blue-600/80` | `bg-cyan-400` | `from-cyan-400/60` |
| 2 | blue | indigo | `from-blue-900/20 via-indigo-900/10` | `from-blue-500/10` | `from-blue-600/80 to-indigo-600/80` | `bg-blue-400` | `from-blue-400/60` |
| 3 | indigo | purple | `from-indigo-900/20 via-purple-900/10` | `from-indigo-500/10` | `from-indigo-600/80 to-purple-600/80` | `bg-indigo-400` | `from-indigo-400/60` |
| 4 | purple | pink | `from-purple-900/20 via-pink-900/10` | `from-purple-500/10` | `from-purple-600/80 to-pink-600/80` | `bg-purple-400` | `from-purple-400/60` |

**Card content colors** (borders, text accents within cards) may vary for semantic purposes — only the 5 structural elements (bg, orb, pill, dot, accent line) must conform.

---

## Build script wrapper pattern: delegates from slides/ root to scripts/ directory (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

The main build orchestrator (`scripts/build-all.ps1`) must run from the `scripts/` directory. A wrapper script at `slides/build.ps1` enables calling from any context.

**Usage from any directory:**
```powershell
.\build.ps1 Tech-talks          # all tech-talk decks
.\build.ps1 Tech-talks -Parallel  # parallel build (4 concurrent, ~26s vs ~86s)
```

**Parameters:** All parameters forwarded unchanged via `@args`. (`exec-talks` removed 2026-04-23 — exec talks are now in `tech-talks/`.)

---

## Build script: exit code check replaces Test-Path for success detection (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

The build script uses `$LASTEXITCODE` immediately after the `npx slidev build` call as the success indicator. `Test-Path` on the output folder is **wrong** — if a prior build succeeded, the folder exists even when the current build fails.

```powershell
$buildOutput = npx slidev build ... 2>&1
$buildExitCode = $LASTEXITCODE   # capture before anything else
if ($buildExitCode -eq 0) { ... }
```

**Note:** `| Out-Null` discards exit code; `2>&1` capture preserves it.

---

## Build script: parallel mode with live progress (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

The build script supports `-Parallel` flag (PowerShell 7+) using `Start-ThreadJob -ThrottleLimit 4`. Key gotchas:

- `$using:hashtable` doesn't work reliably across thread runspaces — extract scalar values before the job
- `ForEach-Object -Parallel` blocks until all complete (no live progress) — use `Start-ThreadJob` + `Wait-Job -Any` drain loop instead

---

## Slidev generates index.html in category dirs — exclude from git (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

Slidev regenerates `slides/workshop/index.html` and `slides/tech-talks/index.html` on every build. These are not used (the repo uses `slides/index-custom.html` instead) and produce build warnings. Add all three paths to `.gitignore`.

---

## PowerShell emoji parser errors: use ASCII text equivalents (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

PowerShell's `Write-Host` sometimes fails to parse emoji Unicode characters in string literals.

**Mapping:** 🚀→`[ROCKET]` | ✅→`[OK]` | ❌→`[FAILED]` | ⏭️→`[SKIP]` | ✨→`[DONE]` | ⏱️→`[CLOCK]` | 📁→`[FOLDER]`

All `scripts/build-all.ps1` output uses ASCII equivalents throughout.

---

## SectionOpenerSlide: props, constraints, and color architecture (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

`SectionOpenerSlide` is a **structural** component (lives in `components/structure/`), not a Tier-1 body component — it does **not** take `progressDots`.

**Props (all required):**
| Prop | Type | Constraint |
|------|------|-----------|
| `partNumber` | Number | 1–4 |
| `title` | String | ≤40 chars |
| `subtitle` | String | ≤120 chars |
| `cards` | Array | Exactly 3 items: `{ icon, title, blurb }` |
| `terminal` | Object | `{ context, detail }` — REQUIRED, omitting causes blank slide |

**Color architecture:** Colors keyed by `partNumber` in `DARK_THEMES` / `LIGHT_THEMES` arrays indexed by `partNumber - 1`. Never hardcode gradients in the template.

| Part | h1 gradient |
|------|-------------|
| 1 | `from-cyan-400 via-blue-300 to-indigo-400` |
| 2 | `from-blue-400 via-indigo-300 to-purple-400` |
| 3 | `from-indigo-400 via-purple-300 to-pink-400` |
| 4 | `from-purple-400 via-pink-300 to-rose-400` |

**Do NOT** move part colors to `style.css` — breaks `isDark` reactivity and `partNumber` logic.

---

## useTheme.ts pattern: how dark/light mode works in tech-talk components (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

All tech-talk components share a single `isDark` reactive ref from `slides/tech-talks/components/useTheme.ts`.

**To activate dark/light mode:** Edit `useTheme.ts` — replace `ref(true)` with `useDark()` from `@slidev/client`.

**Pattern used in every component:**
```ts
import { computed } from 'vue'
import { isDark } from './useTheme'

const DARK_THEME = { ambientBg: '...', orb: '...', pill: '...', ... }
const LIGHT_THEME = { ambientBg: '...', orb: '...', pill: '...', ... }
const t = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME)
```

Keep `DARK_THEMES` / `LIGHT_THEMES` entries — even though light mode is currently disabled, the arrays are already authored and must stay for future dark/light switching.

---

## ReferencesSlide uses :groups not :items (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

`ReferencesSlide` prop is `:groups` (array of group objects), not `:items`. Using `:items` causes a visual error overlay.

**Correct shape:**
```
:groups='[{"title":"📖 Official Documentation","color":"cyan","items":[{"label":"...","href":"https://...","description":"..."}]}]'
```

`color` accepts: `cyan`, `purple`, `blue`, `indigo`, `green`, `pink`, `orange`, `rose`, `amber`, `teal`. Omit `href` for cross-references (internal talks).

---

## Component guard requirements: console.warn + *_MAX constants + build-all.ps1 extractor (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

**Every component — new or edited — must guard all inputs.** Two-part requirement:

### 1. Component-side: `console.warn` + `*_MAX` constants

```ts
const TITLE_MAX    = 80
const CARD_TITLE_MAX = 40
const DESC_MAX     = 100
const ITEMS_MAX    = 5
```

Then add runtime warnings. The `const *_MAX = N` constants are the source of truth picked up by `build-all.ps1` at build time.

### 2. `build-all.ps1`: add extractor entry for new constant names

`scripts/build-all.ps1` scans all `.vue` files for `const *_MAX = N` patterns. **Current `$PROP_EXTRACTORS` keys:**

| Constant name | Extraction type | Pattern |
|---|---|---|
| `TITLE_MAX` | `attr` | `title="([^"]+)"` |
| `SUBTITLE_MAX` | `attr` | `subtitle="([^"]+)"` |
| `LABEL_MAX` | `match` | `label:\s*"([^"]+)"` |
| `DESC_MAX` | `match` | `description:\s*"([^"]+)"` |
| `CARD_TITLE_MAX` | `match` | `title:\s*"([^"]+)"` |
| `CARD_BLURB_MAX` | `match` | `blurb:\s*"([^"]+)"` |
| `ROW_MAX` | `count` | `label:\s*"[^"]+"` |
| `HEADER_MAX` | `attr` | `header="([^"]+)"` |
| `PROMPT_MAX` | `attr` | `prompt="([^"]+)"` |
| `FOOTER_MAX` | `attr` | `footer="([^"]+)"` |
| `TAGLINE_MAX` | `attr` | `tagline="([^"]+)"` |

---

## Tech Talk Slide Generator: no `---` separator between `</script>` and the Title slide (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

The Tech Talk Slide Generator must **not** place a `---` slide separator between the closing `</script>` tag and the first `<!-- SLIDE: Title -->` comment. An extra `---` before the TitleSlide creates a blank slide 1 and shifts all TOC slide numbers off by one.

**Correct:**
```markdown
</script>

<!-- SLIDE: Title -->
<TitleSlide ... />
```

The first `---` separator belongs **after** the TitleSlide closing `/>`, not before it.

---

## Tech-talk component convention: no style pass-through props (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

All tech-talk components use **hardcoded styles only** — no style props are accepted or passed from deck files. Never add `backgroundClass`, `headingClass`, `pillClass`, or similar style-string props. Put all color/gradient decisions inside the component's constants.

**TitleSlide current props:** `title` (required), `subtitle` (required), `tagline` (default `""`), `meta` (default `""`).

---

## CoreQuestionSlide component: props, constraints, and usage (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

The `CoreQuestionSlide` component is **REQUIRED as slide 2** in all tech-talk decks.

**Props:**
| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `question` | String | ✅ | Max 100 chars |
| `subtext` | String | — | Setup sentence before the highlight |
| `highlight` | String | ✅ | Bold colored punchline. `subtext`+`highlight` ≤ 160 chars combined |
| `:cards` | Array (6) | ✅ | Exactly 6 `{ icon?, title, description }` objects |

- `title` ≤ 40 chars; `description` ≤ 90 chars
- Cards 0-2: audience/use-case cards — include `icon`
- Cards 3-5: insight/stat cards — `icon` optional
- Exactly 6 cards required

---

## TocSlide component: props, constraints, and apostrophe/quote gotcha (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

The `TocSlide` component is **REQUIRED as slide 3** in all tech-talk decks.

**Props:**
| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `:sections` | Array (4) | ✅ | Exactly 4 `{ icon, title, subtitle, blurb, slide }` objects |

- `title` ≤ 40 chars; `subtitle` ≤ 80 chars; `blurb` ≤ 100 chars
- `slide` = the `$nav.go()` slide number for that section's Part opener — **0-indexed**

**Color progression:** fixed cyan → blue → indigo → purple (card 1 → 4). Cannot be changed per-deck.

---

## WhatYouCanDoTodaySlide component: props, constraints, and usage (2026-04-15)

`schema_version: 1` | `date: 2026-04-15`

The `WhatYouCanDoTodaySlide` component is **REQUIRED as slide N-2** (immediately before References) in all tech-talk decks.

**Props:**
| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `:today` | Array | ✅ | Items for the "Today" column. Max 5 |
| `:thisWeek` | Array | ✅ | Items for the "This Week" column. Max 5 |
| `:thisMonth` | Array | ✅ | Items for the "This Month" column. Max 5 |
| `footer` | String | ✅ | Single-sentence Key Takeaway |

**Hardcoded:** Column labels Today / This Week / This Month. Icons ⚡ / 🗓️ / 🚀. Colors green/blue/purple.

---

## Tech-talk deck structure: 6 fixed slides (2026-04-15)

`schema_version: 1` | `date: 2026-04-15`

All tech-talk decks share a canonical 6-slide frame:

```
Slide 1   — Title               ← TitleSlide
Slide 2   — Core Question       ← CoreQuestionSlide (REQUIRED)
Slide 3   — Table of Contents   ← TocSlide (REQUIRED)
...content slides...
Slide N-2 — What You Can Do Today ← WhatYouCanDoTodaySlide (REQUIRED)
Slide N-1 — References          ← ReferencesSlide (REQUIRED)
Slide N   — Thank You           ← ThankYouSlide (REQUIRED)
```

All 6 imports go in a **single** `<script setup>` block at the top of the deck.

---

## Tech-talk template.md is the authoritative prop/usage reference (2026-04-15)

`schema_version: 1` | `date: 2026-04-15`

`slides/tech-talks/template.md` is the single authoritative source for all component prop schemas, escaping rules, and usage examples. The slide-generator agent defers to it with a pointer rather than duplicating content. **Do not duplicate prop schemas in both files** — update `template.md` only.

---

## TitleSlide and ThankYouSlide must use `./components/` import path (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

All tech-talk deck `.md` files must import components using `./components/` (relative to `slides/tech-talks/`). Using `../components/` resolves to the root `slides/components/` folder which does NOT contain these components — build fails with `UNRESOLVED_IMPORT`.

**Correct:**
```js
import ThankYouSlide from './components/ThankYouSlide.vue'
import TitleSlide from './components/TitleSlide.vue'
```

---

## `TitleSlide` and `ThankYouSlide`: `logoSrc`/`logoAlt` props removed (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

Both `TitleSlide.vue` and `ThankYouSlide.vue` no longer accept `logoSrc` or `logoAlt` props. The logo is hardcoded. **`logoClass` prop is KEPT** (default `"w-64"`) because `parallel-execution.md` overrides it with `logoClass="w-20"`.

---

## `section:` frontmatter is required in all tech-talk decks (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

All tech-talk `.md` files must include a `section:` field in YAML frontmatter matching a valid value from `slides/SECTIONS.md`.

**Valid values (as of 2026-04-14):**
- `Copilot Tools`
- `Customization & Context`
- `Agentic Engineering`

---

## ReferencesSlide component: apostrophe escaping required in single-quoted attribute (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

The `<ReferencesSlide :groups='[...]' />` prop uses single-quoted attribute syntax. Any apostrophe in item string values will **terminate the attribute early**, causing `Unterminated string constant`.

**Fix:** escape apostrophes in all item `label` and `description` strings as `&#39;`.

---

## BeforeAfterSlide component: props, constraints, and usage (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

The `BeforeAfterSlide` component is **REQUIRED as slide N-3** (immediately before What You Can Do Today) in all **standard tech-talk** decks. Labels are hardcoded as "Before" and "After" — do not pass them as props.

**Props:**
| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `header` | String | ✅ | Transformation title. Max 80 chars |
| `:leftItems` | Array (4) | ✅ | Exactly 4 bullets describing the "before" state. Max 100 chars per item |
| `:rightItems` | Array (4) | ✅ | Exactly 4 bullets describing the "after" state. Max 100 chars per item |
| `:metrics` | Array (3) | ✅ | Exactly 3 quantified outcomes: `[{ value: string, detail: string }]` |

**Slide comment:** must use `<!-- SLIDE: Before/After -->`.

---

## VS Code Remote (legacy-4): dev tunnel URL for Slidev on port 3030 (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

When running `npm run dev` from `slides/` on remote machine **legacy-4**, the dev tunnel URL is:
```
https://9gbdmjtg-3030.use2.devtunnels.ms/21
```

Connect to VS Code on the remote: `https://vscode.dev/tunnel/legacy-4`

---

## Slidev dev server: `--remote` flag in devcontainer requires `--remote=` (2026-04-13)

`schema_version: 1` | `date: 2026-04-13`

In the CopilotTraining devcontainer, Slidev's `--remote` flag must be passed as `--remote=` (with explicit empty `=`) when other positional args follow it. Without `=`, yargs consumes the next positional argument (the entry filename) as the remote password, breaking the dev server.

**Correct `package.json` scripts entry:**
```json
"dev": "slidev --remote= --open"
```
