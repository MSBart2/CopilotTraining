# slides / discoveries

Breakthroughs — patterns that solved persistent problems in Slidev slide authoring.

---

## `CARDS_MAX`/`SECTIONS_MAX` prop-lint false positive when a card component also has an `insight` prop (2026-07-24)

`schema_version: 1` | `date: 2026-07-24`

`build-all.ps1`'s `Invoke-PropLint` counts `CARDS_MAX` (and `SECTIONS_MAX`) by regex-matching every `icon:\s*"[^"]+"` occurrence inside the **whole** `<ComponentName ... />` block — not just inside the `:cards` array. Components like `FourCardGridSlide` that also accept an optional `:insight='{ icon: "...", text: "..." }'` prop get their insight's own `icon:` field counted as a 5th "card", producing `[WARN] line N: CARDS_MAX exceeded (5 items, max 4)` even when `:cards` genuinely contains exactly 4 items.

**How to confirm it's a false positive, not a real bug:** count the `{ icon: ..., title: ..., description: ... }` entries inside `:cards='[...]'` only. If that count matches the component's actual max, the warning is a linter artifact — the component's own runtime `validationError` guard (`cards.length !== 4`) is the ground truth, and the Slidev build still reports `[OK]`.

**Not fixed this session** (regex fix is in `scripts/build-all.ps1`, out of scope for content-only work) — but future sessions should recognize this pattern immediately rather than re-auditing card counts from scratch. Seen in `slides/tech-talks/copilot-code-quality.md` (2 instances, both false positives).

---

## Raw HTML slides in Slidev decks can use `isDark` via deck-level `<script setup>` (2026-04-26)

`schema_version: 1` | `date: 2026-04-26`

Raw HTML slides (not Vue components) in a Slidev `.md` file ARE compiled as part of the Vue template. The deck-level `<script setup>` block is shared scope across all slides, including raw HTML ones. Any ref imported there — including `isDark` — is available for `:class` bindings directly in the HTML.

**Pattern:**
```js
// In the deck's <script setup>:
import { isDark } from './components/useTheme'
```
```html
<!-- Then in any raw HTML slide: -->
<div :class="isDark ? 'text-white' : 'text-gray-900'">...</div>
```

**Session context:** `vscode-latest.md` had 3 raw HTML slides (Session Management, /create-* Commands, Org-Level Instructions) with hardcoded dark classes. Adding the `isDark` import and converting classes to `:class` ternaries fixed all three.

**Color upgrade pattern for raw HTML slides:**
- Titles: `text-white` → `:class="isDark ? 'text-white' : 'text-gray-900'"`
- Subdued text: `text-white/50` → `:class="isDark ? 'text-white/50' : 'text-gray-500'"`
- Panel backgrounds: `bg-*/900/30` → `:class="isDark ? 'bg-*/900/30' : 'bg-*-50'"`
- Panel borders: `border-*/500/30` → `:class="isDark ? 'border-*/500/30' : 'border-*-300'"`
- Panel title text: `text-*-300` → `:class="isDark ? 'text-*-300' : 'text-*-700'"`
- Item bg: `bg-*/900/30` → `:class="isDark ? 'bg-*/900/30' : 'bg-white/70'"`
- Code blocks: `bg-gray-950/80 border-gray-700/30` → `:class="isDark ? 'bg-gray-950/80 border-gray-700/30 text-gray-200' : 'bg-white border-gray-300 text-gray-800'"`
- Inactive dots: `bg-white/20` → `:class="isDark ? 'bg-white/20' : 'bg-gray-300'"`

---

## component-test.md must cover all prop paths, not just all components (2026-04-26)

`schema_version: 1` | `date: 2026-04-26`

Light-mode bug slipped through `component-test.md` coverage because the test deck had one instance of `TwoColPairedConceptsSlide` with no `code` prop. The `code` prop renders a `<pre>` block with its own background/border classes — a separate code path that had hardcoded dark classes (`bg-gray-950/80 border-gray-700/50`).

**Rule:** When adding a new optional prop to any component that has its own markup (not just a value interpolation), add a second test slide to `component-test.md` exercising that prop. One slide per component is insufficient if the component has optional prop paths that render distinct markup regions.

**Fixed:** Added a second `TwoColPairedConceptsSlide` instance with `code` prop in the right column. Updated the section opener to describe both variants.

---

## Light mode fix: opacity-modified Tailwind classes are invisible on white slide backgrounds (2026-04-25)

`schema_version: 1` | `date: 2026-04-25`

All tech-talk Vue components had faint/invisible panels in light mode. Root causes (in order of impact):

**1. `useTheme.ts` had `isDark = ref(true)` hardcoded** — ALL components were always dark. Fixed in a prior session to `import { useDarkMode } from '@slidev/client'; export const isDark = useDarkMode().isDark`.

**2. LIGHT_THEME used opacity-modified classes** (`from-red-100/40`, `bg-red-100/50`, `bg-gray-100/80`). On a white slide background these are virtually invisible. Fix: use solid base colors (`from-red-50 to-orange-50`, `bg-red-100`).

**3. The contrast inversion rule:** lighter panel + darker items. `from-red-50` panel with `bg-red-100` items gives visible depth. Reversed (`from-red-100` panel + `bg-red-50` items) looks flat.

**Components fixed this session:**
- `structure/BeforeAfterSlide.vue` — solid panel + metric tile backgrounds
- `structure/ReferencesSlide.vue` — itemBgStyle inline approach
- `BeforeAfterMetricsSlide.vue` — metric tiles switched to `:style` bgColor/borderColor
- `useSectionTheme.ts` LIGHT_CARDS — bumped from `/80` opacity to solid `-200` shades
- CoreQuestionSlide, TocSlide, SectionOpenerSlide, WorkflowShowdownSteps, BeforeAfterPanels, ProblemSolutionOutcome, MaturityJourneyRoadmap, MaturityLevelDrilldown — all LIGHT themes given solid colors

**The reliable fix pattern for any panel/card that uses light mode color:**
1. Check if the Tailwind class computes to transparent via Playwright (`getComputedStyle(el).backgroundColor === 'rgba(0,0,0,0)'`)
2. If yes: add a `:style` binding with an inline `background: 'rgb(...)'` value — this bypasses UnoCSS entirely

---

## Static prop linting in build-all.ps1 replaces runtime overlays for content limits (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

`slidev build` is a pure Vite bundle — **component code never executes at build time**. `console.warn()` inside `<script setup>` is completely silent during builds. Only the browser dev console receives these signals.

**The breakthrough:** static regex parsing of `.md` source in `build-all.ps1` via `Invoke-PropLint`. This fires before Slidev runs and emits yellow `[WARN] line N:` messages for any prop violations, with a summary count at the end. The Slidev build still reports `[OK]` — warnings are non-blocking — but the violation is surfaced with filename, line number, slide title, and char count.

**The pattern (PowerShell function in `scripts/build-all.ps1`):**
```powershell
# Regex: match component invocation block (non-greedy, handles '/' in content)
$slideMatches = [regex]::Matches($content, '(?s)<FrameworkMappingRowsSlide\b.*?/>')
# Binary search char offset → line number via pre-computed $lineStarts list
$getLine = { param([int]$pos) ... binary search ... return $lo + 1 }
# Emit: [WARN] line N: ComponentName 'SlideTitle': label too long (15 chars, max 13): "Labels & Assign"
```

**When to use this vs. the ⛔ overlay:**
- `⛔ overlay` — use for hard constraints that make a slide unusable (wrong partNumber, wrong item count). Renders as a visible error block in the browser.
- `Invoke-PropLint` — use for layout limits (label/description character counts) where the slide still renders but may look wrong. Keeps the slide usable; build script catches it.

**Key regex gotcha:** `<Component[^/]*/>` stops at the first `/` inside the block (e.g. `"pull-requests: write"`). Use `<Component\b.*?/>` with `(?s)` flag instead.

---

## Visual prop error guard: ⛔ overlay replaces `throw` for authoring feedback (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

Vue SSR silently swallows errors thrown inside `<script setup>`. A `throw` when a required prop is wrong produces a **blank slide with no visual indication** of the problem — the Vite build passes with exit code 0.

**The breakthrough:** replace every `throw` with a `validationError` computed that returns an error string or null, then show a visible red ⛔ overlay in the template when it's non-null.

**Canonical pattern — script:**
```js
const validationError = computed(() => {
  if (!props.cards || props.cards.length !== 3)
    return `[ComponentName] ❌ cards must contain exactly 3 items (got ${props.cards?.length ?? 'none'})`
  return null
})
```

**Canonical pattern — template** (immediately after outer wrapper `<div>` opens):
```html
<div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
  <div class="text-red-400 text-4xl mb-4">⛔</div>
  <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
</div>
<template v-else>
  ...normal content...
</template>
```

**TitleSlide special case** — it has two root elements and `<template>` comes before `<script setup>`. The error div is NOT `absolute inset-0`; use `class="h-full bg-red-950 ..."` as the sole root element, wrapping both sibling divs in `<template v-else>`.

**Applied to all 20 components** as of 2026-04-21.

---

## Contractions inside single-quoted prop bindings cause `Unterminated string constant` (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

English contractions (can't, couldn't, didn't, doesn't, weren't, won't, etc.) contain an apostrophe (`'`) which terminates a single-quoted Vue prop attribute early.

**Fix:** Rewrite to full words before encoding in a `:prop='...'` binding:
- `can't` → `cannot`
- `couldn't` → `could not`
- `didn't` → `did not`
- `doesn't` → `does not`
- `weren't` → `were not`

**Pre-build checklist rule:** After writing any new component invocation with `:prop='...'` bindings that contain prose text, grep for `n't`, `'ve`, `'re`, `'ll`, `'d ` before running the build.

---

## YAML `---` frontmatter delimiters are safe inside JS string prop bindings (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

When a code slide contains YAML with `---` frontmatter delimiters, those are **safe inside a `:code='...'` JS string binding** because they are within quotes, not bare lines in the Markdown document.

Only bare `---` lines on their own line in the Markdown file act as Slidev slide separators. Once wrapped in a JS string, the dashes are just string content. **No `&#45;&#45;&#45;` escaping needed** when the `---` appears inside a prop value string.

---

## `&#34;` and `&quot;` are forbidden inside ANY prop value, not just single-quoted arrays (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

Vue decodes HTML entities in attribute values **before** the JS expression parser runs. A `&#34;` (or `&quot;`) inside a prop value decodes to a literal `"`, which terminates the JSON string mid-value and crashes the build.

**Fix when display text needs quotation marks:** use Unicode curly quotes (`"` U+201C, `"` U+201D) — read better typographically anyway.

**One-shot repair pattern (PowerShell, alternates open/close curly):**
```powershell
$content = Get-Content path/to/deck.md -Raw
$script:i = 0
$content = [regex]::Replace($content, '&#34;', { param($m); $script:i++; if ($script:i % 2 -eq 1) { [char]0x201C } else { [char]0x201D } })
Set-Content path/to/deck.md -Value $content -NoNewline
```

---

## `useSectionTheme.ts` helper: shared partNumber palette eliminates per-component theme duplication (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

When building the 7 Tier-1 slide components, the breakthrough was extracting the SectionOpenerSlide partNumber color progression into a single shared helper. Before: each new component would have duplicated DARK_THEME[4] / LIGHT_THEME[4] arrays inline.

**Helper exports (`slides/tech-talks/components/useSectionTheme.ts`):**
- `validatePartNumber(partNumber, componentName)` — runtime guard
- `useSectionChrome(() => partNumber)` — returns reactive `{ ambientBg, orb, pill, pillText, divider, accent }`
- `useSectionCards(() => partNumber)` — returns reactive card style arrays
- DARK_CHROME[4]/LIGHT_CHROME[4], DARK_CARDS[4][4]/LIGHT_CARDS[4][4] constants

**Why this matters next time:** any new content component should `import { useSectionChrome, useSectionCards } from './useSectionTheme'` rather than redefining its own DARK/LIGHT arrays.

---

## `slidev export --format png --range` for targeted slide screenshots (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

The reliable way to capture individual slide screenshots is `slidev export`, not Playwright MCP or manual browser automation.

**Working command:**
```bash
cd slides && npx slidev export tech-talks/{deck}.md --format png --range "12,13,15" \
  --executable-path "C:\Program Files\Google\Chrome\Application\chrome.exe" \
  --output "../captures/twocol-conformance/export-{deck}" --dark
```

**Prerequisites:**
- `playwright-chromium` must be installed in the `slides/` workspace (`npm install --no-save playwright-chromium`)
- Chrome installed via `npx playwright install chrome`
- The `--executable-path` flag is required

**Failed approaches (avoid):**
1. Playwright MCP browser tools — Chrome path hardcoded to wrong user
2. `npx serve -s` on built dist — SPA mode redirects all routes to root index.html
3. `file://` protocol on built dist — asset paths don't resolve
4. Hash-based routing on served dist — blank white pages

---

## Section color audit: parse-then-check pattern catches drift across all decks (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

A reliable pattern for auditing content slide colors across all decks:

1. Parse deck → find `:partNumber="N"` lines to identify section boundaries
2. Between each pair of boundaries, regex-match the 5 structural elements (bg gradient, orb, pill, dot, accent line)
3. Extract the primary color token from each match
4. Compare against the expected color for that partNumber (1=cyan, 2=blue, 3=indigo, 4=purple)

**Key lesson:** The initial fix script caught 4 of 5 elements but **missed accent lines**. Always check ALL 5 structural element types when doing bulk color changes.

---

## Build script wrapper solves agent invocation path context issues (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

Creating a simple wrapper script at `slides/build.ps1` that delegates to `scripts/build-all.ps1` solves path resolution issues for agents invoking the build system from various working directories.

**The pattern:**
```powershell
# slides/build.ps1
$ScriptsDir = Join-Path $PSScriptRoot scripts
Push-Location $ScriptsDir
& .\build-all.ps1 @args
Pop-Location
```

---

## SectionOpenerSlide: multi-part rollout via per-part regex replacement (2026-04-16)

`schema_version: 1` | `date: 2026-04-16`

Rolling out a component that appears 4 times per deck (Part 1–4 section openers) requires a per-part regex loop, not a single block replacement:

```js
function buildPartRegex(partNumber) {
  return new RegExp(
    `(<!-- SLIDE: Part ${partNumber}[^\\n]*-->)\\n\\n<div[\\s\\S]*?(?=\\n---)`,
    ''
  )
}
```

**Key differences from TocSlide rollout:**
- One deck has **4 section openers** → loop over parts, accumulate replacements
- **Skip guard:** `if (content.includes('<SectionOpenerSlide'))` catches already-converted decks
- Apostrophes in prop values use Unicode right-single-quote `\u2019` in the JS data constants

---

## TocSlide rollout script pattern for bulk component injection (2026-04-14)

`schema_version: 1` | `date: 2026-04-14`

Bulk-replacing a Slidev slide block across 17 decks with a component works reliably with this pattern:

1. **Regex to match the block:** `<!-- SLIDE: Table of Contents -->\n[\s\S]*?(?=\n---\n)`
2. **Add import idempotently:** check `content.includes("import TocSlide")` before inserting
3. **Attribute syntax:** `:sections='[{ icon: "...", title: "..." }]'` — outer single quotes, inner double quotes
4. **Script location:** `slides/scripts/rollout-toc-slide.mjs` — idempotent, safe to re-run

---

## `multi_replace_string_in_file` across adjacent slides can absorb neighboring content (2026-04-17)

`schema_version: 1` | `date: 2026-04-17`

When converting multiple consecutive raw-HTML slides to component invocations in a single `multi_replace_string_in_file` call, mismatched closing `</div>` counts in the oldString patterns can absorb the **next** slide's wrapper divs silently. Symptom: build fails downstream with Vue parser errors like `Illegal '/' in tags`.

**Safe approaches:**
1. Convert one slide per call, verify the surrounding `<!-- SLIDE: ... -->` markers are intact afterward
2. OR rewrite the **entire affected region** in one replacement that includes ALL the original content end-to-end

---

## Slide Generator agent produces HTML balance errors requiring manual fixes (2026-04-13)

`schema_version: 1` | `date: 2026-04-13`

The Slide Generator agent produces decks with HTML balance errors that require manual correction before building. Common error patterns:
1. **Missing wrapper div** — First column of a 2-col grid missing its wrapper
2. **Extra closing `</div>`** — Blank line followed by duplicate closing tags
3. **Duplicated content blocks** — Same grid section repeated twice

**Post-generation checklist (PowerShell div balance check):**
```powershell
$content = Get-Content "slides/tech-talks/<deck>.md" -Raw
$slides = $content -split '\r\n---\r\n'
for ($i = 0; $i -lt $slides.Count; $i++) {
    $opens = ([regex]::Matches($slides[$i], '<div[^>]*>')).Count
    $closes = ([regex]::Matches($slides[$i], '</div>')).Count
    if ($opens -ne $closes) { Write-Host "Slide $i: $opens opens, $closes closes" }
}
```

---

## Scrollable code block: the correct fix for code-heavy overflow (2026-04-10)

`schema_version: 1` | `date: 2026-04-10`

When a slide has a large fenced code block that overflows, **do not tighten spacing or reduce font size** — the code is already at minimum readable size. Instead, make the code container vertically scrollable.

**Pattern:** add `flex flex-col flex-1 min-h-0` to the parent container, then `overflow-y-auto` to the code wrapper:
```html
<div class="relative z-10 flex-1 min-h-0 flex flex-col gap-3">
  <div class="flex flex-col flex-1 min-h-0">
    <pre class="... overflow-y-auto flex-1 min-h-0">...</pre>
  </div>
</div>
```

`flex-1 min-h-0` on both the outer flex column and the pre element is required — without `min-h-0`, flexbox does not constrain the child's scroll boundary.

**User preference (confirmed):** This is the explicitly preferred approach for code-heavy slides. Scrollable is always better than illegibly small.

---

## Tip banners cause overflow on slides with 2-col cards + code block (2026-04-09)

`schema_version: 1` | `date: 2026-04-09`

A consistent overflow pattern: slides with a 2-column card grid PLUS a settings code block PLUS a green tip/info banner at the bottom reliably exceed slide height.

**Fix strategy (in order of preference):**
1. Remove the tip banner entirely — they are supplemental and not missed
2. Change `gap-4` → `gap-3` on the card grid (saves 4px)
3. Reduce `mt-3` → `mt-2` on the code section (saves 4px)
4. If still overflowing, add explicit `max-h-*` to the pre element

---

## research.md is the hallucination antidote for tech-talks (2026-04-10)

`schema_version: 1` | `date: 2026-04-10`

When a tech-talk README contains hallucinated content (fabricated APIs, non-existent config schemas, made-up metrics), the correct fix is to **regenerate from research.md**, not to patch the README.

**Why:** `research.md` is created from verified URLs and contains facts extracted directly from official docs. Complete regeneration is faster and more reliable than patching.

**Process:**
1. Check if `tech-talks/<slug>/research.md` exists
2. If yes: Instruct Tech Talk Generator to regenerate README from research.md
3. After generation: Manually remove any remaining broken links
4. Delete slides and regenerate fresh

---

## Persona architecture decision: hub+leaf + Persona-as-Prompt (2026-04-09)

`schema_version: 1` | `date: 2026-04-09`

Agent Council session produced a persona architecture plan (saved as `persona-update-plan.md` in repo root). Key decisions:

**File structure:**
- `workshop/00-orientation/PERSONAS.md` → hub/index (keeps team table, story arc, self-assessment)
- `workshop/00-orientation/personas/sarah.md` etc. → leaf files with YAML frontmatter

**Tech-talks:** Use personas as archetypes, not characters. Pattern: "Sarah *types*" not "Sarah *says*". Three lightweight patterns: "Who This Hits" box (top), Reaction Line (max 3/talk), Impact Table (before/after).
