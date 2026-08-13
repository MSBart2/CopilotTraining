# Tech-Talk Profile

Use this profile when generating `slides/tech-talks/*.md` from content under `tech-talks/`.

## Purpose

Tech talks are practitioner-facing. They should feel concrete, current, and capability-led.

- Audience: developers, platform engineers, DevOps engineers, architects
- Tone: technical, direct, outcome-based
- Goal: show what changed, why it matters now, and how it fits into real workflows

## Visual System

- Primary gradient: `from-cyan-400 via-blue-400 to-indigo-400`
- Background gradient: `from-cyan-900/20 via-blue-900/10 to-indigo-900/20`
- Pill/accent gradient: `from-cyan-600/80 to-blue-600/80`
- Close progression: cyan → blue → indigo → purple → pink

---

## Deck Structure

Every tech-talk deck has 6 fixed slides — 3 opening, 3 closing — with content slides in between.

```
Slide 1 — Title              ← TitleSlide
Slide 2 — Core Question      ← CoreQuestionSlide (REQUIRED)
Slide 3 — Table of Contents  ← TocSlide (REQUIRED)
...content slides...
N-3     — Before/After       ← BeforeAfterSlide (REQUIRED)
N-2     — What You Can Do Today  ← WhatYouCanDoTodaySlide (REQUIRED)
N-1     — References             ← ReferencesSlide (REQUIRED)
N       — Thank You              ← ThankYouSlide (REQUIRED)
```

Do **not** add an Agenda slide. Outcome framing belongs in Core Question / TOC; a separate AgendaSlide is retired.

All component imports go in a single `<script setup>` block at the top of the deck. Import only what the deck uses:

```html
<script setup>
// Required scaffold (all decks)
import TitleSlide from './components/structure/TitleSlide.vue'
import CoreQuestionSlide from './components/structure/CoreQuestionSlide.vue'
import TocSlide from './components/structure/TocSlide.vue'
import SectionOpenerSlide from './components/structure/SectionOpenerSlide.vue'
import BeforeAfterSlide from './components/structure/BeforeAfterSlide.vue'
import WhatYouCanDoTodaySlide from './components/structure/WhatYouCanDoTodaySlide.vue'
import ReferencesSlide from './components/structure/ReferencesSlide.vue'
import ThankYouSlide from './components/structure/ThankYouSlide.vue'

// Tier-1 body-content components (import the ones you use; see catalog below)
import BeforeAfterMetricsSlide from './components/BeforeAfterMetricsSlide.vue'
import BeforeAfterPanelsSlide from './components/BeforeAfterPanelsSlide.vue'
import ProblemSolutionOutcomeSlide from './components/ProblemSolutionOutcomeSlide.vue'
import TwoColPairedConceptsSlide from './components/TwoColPairedConceptsSlide.vue'
import ThreeColumnCardSlide from './components/ThreeColumnCardSlide.vue'
import FourCardGridSlide from './components/FourCardGridSlide.vue'
import CodeWithFeaturesSlide from './components/CodeWithFeaturesSlide.vue'
import HeroStatSlide from './components/HeroStatSlide.vue'
import WorkflowShowdownStepsSlide from './components/WorkflowShowdownStepsSlide.vue'
import MaturityJourneyRoadmapSlide from './components/MaturityJourneyRoadmapSlide.vue'
import AITerminalTranscriptSlide from './components/AITerminalTranscriptSlide.vue'
import MaturityLevelDrilldownSlide from './components/MaturityLevelDrilldownSlide.vue'
import FrameworkMappingRowsSlide from './components/FrameworkMappingRowsSlide.vue'
</script>
```

## Opening Slides (1–3)

### Slide 1 — Title

```html
<!-- SLIDE: Title -->
<TitleSlide
  title="{TITLE}"
  subtitle="{SUBTITLE}"
  tagline="{TAGLINE}"
  meta="{FOOTER_TEXT}"
/>
```

### Slide 2 — Core Question (REQUIRED)

```html
<!-- SLIDE: Core Question -->
<CoreQuestionSlide
  question="{THE_CORE_QUESTION}"
  subtext="{SETUP_TEXT_WITHOUT_HIGHLIGHT}"
  highlight="{BOLD_COLORED_PUNCHLINE}"
  :cards='[
    { icon: "🔧", title: "Audience Persona 1", description: "What this persona gets from this talk" },
    { icon: "👥", title: "Audience Persona 2", description: "What this persona gets from this talk" },
    { icon: "🚀", title: "Audience Persona 3", description: "What this persona gets from this talk" },
    { title: "Key Pain / Stat 1", description: "Concrete number or constraint driving the problem" },
    { title: "Key Pain / Stat 2", description: "Concrete number or constraint driving the problem" },
    { title: "Key Pain / Stat 3", description: "Concrete number or constraint driving the problem" }
  ]'
/>
```

- Cards 0–2 (row 1): audience/use-case — include `icon` (renders as ghost watermark)
- Cards 3–5 (row 2): insight/stat/pain — `icon` optional
- Exactly 6 cards required
- `title` ≤ 40 chars · `description` ≤ 90 chars · `question` ≤ 100 chars · `subtext`+`highlight` ≤ 160 chars

### Slide 3 — Table of Contents (REQUIRED)

```html
<!-- SLIDE: Table of Contents -->
<TocSlide
  :sections='[
    { icon: "🔧", title: "Section One",   subtitle: "One-line description", blurb: "What the audience learns", slide: 4  },
    { icon: "⚙️", title: "Section Two",   subtitle: "One-line description", blurb: "What the audience learns", slide: 8  },
    { icon: "🚀", title: "Section Three", subtitle: "One-line description", blurb: "What the audience learns", slide: 12 },
    { icon: "🎯", title: "Section Four",  subtitle: "One-line description", blurb: "What the audience learns", slide: 16 },
  ]'
/>
```

- Exactly 4 sections required
- `slide` values point at section openers (Title=1, Core Question=2, TOC=3, first opener typically 4)
- `slide` must be the actual slide number of that section's Part opener — count after generating
- `title` ≤ 40 chars · `subtitle` ≤ 80 chars · `blurb` ≤ 100 chars
- Outer attribute uses single quotes; inner JSON uses double quotes

---

## Closing Slides (N-3 to N)

### Slide N-3 — Before/After (REQUIRED)

```html
<!-- SLIDE: Before/After -->
<BeforeAfterSlide
  header="{TRANSFORMATION_TITLE}"
  :leftItems='["item 1", "item 2", "item 3", "item 4"]'
  :rightItems='["item 1", "item 2", "item 3", "item 4"]'
  :metrics='[
    { value: "{VALUE_1}", detail: "{DETAIL_1}" },
    { value: "{VALUE_2}", detail: "{DETAIL_2}" },
    { value: "{VALUE_3}", detail: "{DETAIL_3}" }
  ]'
/>
```

- `header`: transformation title describing the before→after journey (e.g., "From Manual Reviews to Scalable Quality")
- `leftItems`: exactly 4 bullets describing the "before" state (no need for labels — "Before" is hardcoded)
- `rightItems`: exactly 4 bullets describing the "after" state (no need for labels — "After" is hardcoded)
- `metrics`: exactly 3 quantified outcomes showing impact (value + detail pair)
- Placed immediately before What You Can Do Today (N-3 position)

### Slide N-2 — What You Can Do Today (REQUIRED)

```html
<!-- SLIDE: What You Can Do Today -->
<WhatYouCanDoTodaySlide
  :today='["item 1", "item 2", "item 3"]'
  :thisWeek='["item 1", "item 2", "item 3"]'
  :thisMonth='["item 1", "item 2", "item 3"]'
  footer="Single-sentence key takeaway for this deck."
/>
```

- Column labels hardcoded: **Today / This Week / This Month** — do not pass labels or icons
- Colors enforced by column position (green / blue / purple) — no color props
- Max 5 items per column; `footer` must be a single sentence
- Items should be concrete, actionable, imperative verbs

### Slide N-1 — References (REQUIRED)

```html
<!-- SLIDE: References -->
<ReferencesSlide
  :groups='[
    { title: "📖 Official Documentation", color: "cyan", items: [
        { href: "https://...", label: "{LINK_LABEL}", description: "{DESCRIPTION}" }
    ] },
    { title: "🛠️ Related Content", color: "purple", items: [
        { label: "{TALK_OR_RESOURCE_TITLE}", description: "{DESCRIPTION}" }
    ] }
  ]'
/>
```

- Use `href` for external links; omit `href` for cross-references to other talks
- `color` accepts: `cyan`, `purple`, `blue`, `indigo`, `green`, `pink`, `orange`, `rose`, `amber`, `teal`

### Slide N — Thank You (REQUIRED)

```html
<!-- SLIDE: Thank You -->
<ThankYouSlide
  title="{TALK_TITLE}"
  subtitle="{TALK_FULL_TITLE}"
  :cards="[
    { value: '{CALL_OUT_1}', detail: '{DETAIL_1}' },
    { value: '{CALL_OUT_2}', detail: '{DETAIL_2}' },
    { value: '{CALL_OUT_3}', detail: '{DETAIL_3}' },
  ]"
  prompt="{DISCUSSION_PROMPT}"
/>
```

---

## Section Openers (REQUIRED for each Part N slide)

Every Part N slide uses `SectionOpenerSlide`. The component handles the full centered layout, ambient orb, color progression, 3-column card preview, and terminal callout.

```html
<!-- SLIDE: Part 1 — {SECTION_TITLE} -->
<SectionOpenerSlide
  :partNumber="1"
  title="{SECTION_TITLE}"
  subtitle="{ONE_LINE_DESCRIPTION_OF_WHAT_THIS_PART_COVERS}"
  :cards='[
    { icon: "{EMOJI}", title: "{CARD_TITLE}", blurb: "{SHORT_BLURB}" },
    { icon: "{EMOJI}", title: "{CARD_TITLE}", blurb: "{SHORT_BLURB}" },
    { icon: "{EMOJI}", title: "{CARD_TITLE}", blurb: "{SHORT_BLURB}" },
  ]'
  :terminal='{ context: "{CONTEXT_LINE}", detail: "{METRIC_OR_OUTCOME}" }'
/>
```

- `partNumber`: 1–4 (controls the color scheme — 1=cyan, 2=blue, 3=indigo, 4=purple)
- `title`: the Part title (matches the `<!-- SLIDE: Part N — {title} -->` comment)
- `subtitle`: one sentence describing what this part teaches
- `cards`: exactly 3 items; `blurb` ≤ 60 chars; titles ≤ 30 chars
- `terminal.context`: descriptive setup line
- `terminal.detail`: the metric/outcome (e.g., "X → Y" or a punchline)
- Section openers do **not** get progress dots
- Apostrophes inside single-quoted `:cards='[...]'` and `:terminal='...'` must use `&#39;`

---

## Common Rules (All Component Slides)

- Apostrophes inside single-quoted array props (`:prop='[...]'`) must use `&#39;`
- Always include a blank line between `/>` and the next `---` separator
- **Never** use `&quot;` or `&#34;` (HTML entity for double quote) inside any prop value — Vue decodes the entity *before* JS-parses the JSON, which terminates the string and breaks the build with a `SyntaxError: Unexpected token`. If you need a double-quote glyph in display text, use Unicode curly quotes (`“` / `”`) or single quotes (`&#39;`). Never `\"` either — the backslash survives the HTML decode and confuses the parser.
- Use double quotes inside the JSON array (single quotes outside, double quotes inside)

---

## Tier-1 Body-Content Components (REQUIRED — no inline HTML)

All 13 body-slide archetypes. **Every body content slide must use one of these components** — do not write inline HTML for body content. Components handle the cockpit wrapper, section chrome (ambient bg, orb, pill, divider), color progression, and dark/light theming. Do NOT pass color/style/class props; all colors derive from `partNumber` (1–4) via `useSectionTheme.ts`.

See `slides/COMPONENT-ARCHETYPES.md` for the full selection matrix, overflow thresholds, and usage examples. If content does not fit a single component, adapt or split the slide — there is no inline HTML fallback.

### Selection Quick-Reference

| Situation                                                              | Component                      |
| ---------------------------------------------------------------------- | ------------------------------ |
| Before → After with quantified metrics (2–4 metric tiles)              | `BeforeAfterMetricsSlide`      |
| Before → After without metrics (just two-panel opposition)             | `BeforeAfterPanelsSlide`       |
| 3-column narrative: Problem → Solution → Outcome (hardcoded red→blue→green) | `ProblemSolutionOutcomeSlide`  |
| Two non-opposed concepts side-by-side (cool palette, no red/green)     | `TwoColPairedConceptsSlide`    |
| Exactly 3 options/tiers/capabilities in cards                          | `ThreeColumnCardSlide`         |
| Exactly 4 items in a 2×2 taxonomy grid                                 | `FourCardGridSlide`            |
| Code block + 2–4 feature cards (left layout or stacked)                | `CodeWithFeaturesSlide`        |
| One dominant statistic + 2–4 supporting context cards                  | `HeroStatSlide`                |
| Old vs new workflow, mirrored numbered steps (red/green)               | `WorkflowShowdownStepsSlide`   |
| 2–5 maturity/adoption stages in horizontal progression with TARGET     | `MaturityJourneyRoadmapSlide`  |
| AI terminal conversation: prompt → thinking → response → outcome       | `AITerminalTranscriptSlide`    |
| Deep-dive into one maturity level: blockquote + 3-column diagnostic    | `MaturityLevelDrilldownSlide`  |
| Multi-row concept→explanation→tag taxonomy (section card colors)       | `FrameworkMappingRowsSlide`    |

**Universal props (every Tier-1 body component):**
- `partNumber` (1–4, required) — drives ambient bg, orb, pill, divider, and card progression
- `pillIcon` (string, required) — emoji or short glyph for the pill
- `pillLabel` (string, required) — breadcrumb text (e.g., `"Subagents: Core Mechanism"`)
- `title` (string, required) — slide headline (≤ 80 chars)
- `progressDots` (object, required) — `{ current, total, activeColor }`. `activeColor` is a Tailwind class; match the section color:
  - Part 1 (cyan): `"bg-cyan-400 shadow-lg shadow-cyan-500/50"`
  - Part 2 (blue): `"bg-blue-400 shadow-lg shadow-blue-500/50"`
  - Part 3 (indigo): `"bg-indigo-400 shadow-lg shadow-indigo-500/50"`
  - Part 4 (purple): `"bg-purple-400 shadow-lg shadow-purple-500/50"`
- `insight` (optional object `{ icon, text }`) — optional bottom insight bar

### `BeforeAfterMetricsSlide`

```html
<BeforeAfterMetricsSlide
  :partNumber="2"
  pillIcon="⚖️"
  pillLabel="Impact: Measured"
  title="From Manual Reviews to Scalable Quality"
  :before='{
    header: "Before",
    items: [
      { title: "Hours per PR", detail: "Avg 45 min senior-engineer time" },
      "Scattered review checklists",
      { title: "Security gaps", detail: "Caught post-merge" }
    ]
  }'
  :after='{
    header: "After",
    items: [
      "Review in 8 min",
      { title: "Consistent rubric", detail: "Driven by Copilot skill" },
      "Security caught pre-merge"
    ]
  }'
  :metrics='[
    { value: "82%", label: "faster first pass" },
    { value: "3.1×", label: "throughput" },
    { value: "0", label: "post-merge security bugs" }
  ]'
  :insight='{ icon: "🎯", text: "Key Insight: reviewers shift from gatekeepers to architects." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
```

- `before` / `after`: `{ header, items }`. `items` accepts strings or `{ title, detail }` objects (mixing allowed).
- `metrics`: 2–4 required; component logs an error if outside that range.

### `BeforeAfterPanelsSlide`

Same prop shape as `BeforeAfterMetricsSlide` but **no `metrics` prop**. Use when the comparison speaks for itself without numbers.

```html
<BeforeAfterPanelsSlide
  :partNumber="1"
  pillIcon="🧱"
  pillLabel="Subagents: Two Patterns"
  title="Implicit vs Explicit Invocation"
  :before='{ header: "Implicit (chat hints)", items: ["Auto-triggered", "Harder to debug"] }'
  :after='{ header: "Explicit (@agent)", items: ["Deterministic", "Visible in transcript"] }'
  :progressDots='{ current: 1, total: 2, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
```

### `ProblemSolutionOutcomeSlide`

3-column narrative with **hardcoded semantic colors** (red Problem → blue Solution → emerald Outcome). Section `partNumber` only tints the chrome; do not use this for non-problem/solution content.

```html
<ProblemSolutionOutcomeSlide
  :partNumber="3"
  pillIcon="🚀"
  pillLabel="Autonomous: Use Case"
  title="Polyrepo Dependency-Aware Development"
  :problem='{
    header: "The Problem",
    items: [
      "Context lost across repos",
      { title: "Manual coordination", detail: "Slack threads + PR pings" }
    ]
  }'
  :solution='{
    header: "The Solution",
    items: ["`acp-manifest.json` declares dependsOn"],
    code: { language: "json", content: "{\"dependsOn\": [\"api\", \"shared-ui\"]}" }
  }'
  :outcome='{
    header: "The Outcome",
    items: ["Cross-repo context flows automatically"],
    metrics: [{ value: "4×", label: "faster polyrepo tasks" }]
  }'
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>
```

- `solution.code` (optional): `{ language, content }` renders as a monospace block.
- `outcome.metrics` (optional): array of `{ value, label }` tiles under the outcome column.

### `TwoColPairedConceptsSlide`

Two equal columns in the section's **cool palette** — no red/green opposition. For "two modes," "two patterns," "store vs retrieve."

```html
<TwoColPairedConceptsSlide
  :partNumber="4"
  pillIcon="🎭"
  pillLabel="Multi-Model: Modes"
  title="Collaborative vs Adversarial Deliberation"
  :left='{
    header: "Collaborative",
    icon: "🤝",
    items: [
      { title: "Agents build on each other", detail: "Parallel synthesis" },
      "Best for novel solutions"
    ]
  }'
  :right='{
    header: "Adversarial",
    icon: "⚔️",
    items: ["Agents debate", "Best for stress-testing"],
    code: { language: "bash", content: "@council --mode adversarial \"...\"" }
  }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-purple-400 shadow-lg shadow-purple-500/50" }'
/>
```

- `left.icon` / `right.icon` optional; shown before the header.
- `left.code` / `right.code` optional; renders below the items list.

### `ThreeColumnCardSlide`

Exactly 3 cards. Each card can be description-only or include an `items` sub-list.

```html
<ThreeColumnCardSlide
  :partNumber="2"
  pillIcon="🛠️"
  pillLabel="Distribution: Three Tiers"
  title="Personal → Team → Organization"
  :columns='[
    { icon: "👤", title: "Personal", description: "copilot plugin install — local, exploratory" },
    { icon: "👥", title: "Team", description: "apm.yml in repo — versioned, shared", items: ["Lock file", "CI install"] },
    { icon: "🏢", title: "Org", description: "Private marketplace + signing policy" }
  ]'
  :progressDots='{ current: 2, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
```

- Exactly 3 columns required.

### `FourCardGridSlide`

Exactly 4 cards in a 2×2 grid with the full section card palette (each card gets a distinct tint).

```html
<FourCardGridSlide
  :partNumber="1"
  pillIcon="🧱"
  pillLabel="Extension Points"
  title="Four Ways to Customize Copilot"
  :cards='[
    { icon: "📜", title: "Instructions",  description: "Persistent repo context via AGENTS.md and custom instructions" },
    { icon: "🎯", title: "Prompts",       description: "Reusable prompts for common workflows" },
    { icon: "🧠", title: "Agents",        description: "Role-scoped specialists with their own toolset" },
    { icon: "🔌", title: "Plugins & MCP", description: "External capabilities wired via CLI or MCP server" }
  ]'
  :insight='{ icon: "💡", text: "Start small: instructions before agents, agents before plugins." }'
  :progressDots='{ current: 1, total: 4, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
```

- Exactly 4 cards required. Each needs `icon`, `title`, `description`.

### `CodeWithFeaturesSlide`

Code block + 2–4 feature cards. Two layouts via `codePosition`:

- `"left"` — code on the left (~60%), features stacked on the right (~40%)
- `"top"` — code on top, features in a row below

```html
<CodeWithFeaturesSlide
  :partNumber="2"
  pillIcon="📦"
  pillLabel="APM Manifest"
  title="apm.yml — The Agent Supply Chain"
  codePosition="left"
  :code='{ language: "yaml", filename: "apm.yml", content: "name: my-team-config\nagents:\n  - @backend-reviewer@1.2.0\ninstructions:\n  - ./AGENTS.md\nplugins:\n  - github/copilot-plugin-jira@0.5.1" }'
  :features='[
    { icon: "🔒", title: "Versioned",  description: "Lock file pins exact versions" },
    { icon: "🌲", title: "Composable", description: "Agents, instructions, plugins — one manifest" },
    { icon: "🔁", title: "Reproducible", description: "apm install hydrates a fresh clone" }
  ]'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
```

- `code`: `{ language, content, filename? }`. `content` is raw text (no syntax highlighting beyond Slidev default).
- `features`: 2–4 items required.
- `codePosition`: must be `"left"` or `"top"`.

### `HeroStatSlide`

One oversized statistic on the left (section-tinted gradient, `text-8xl`) with 2–4 supporting context cards on the right. All props required.

```html
<HeroStatSlide
  :partNumber="1"
  pillIcon="📊"
  pillLabel="Why the Terminal?"
  title="The IDE Only Sees Code"
  subtitle="The terminal sees everything else"
  :hero='{ value: "68%", label: "of developer time is spent outside the IDE", source: "Source: Stripe, The Developer Coefficient (2018)" }'
  :supporting='[
    { icon: "🔍", title: "Container logs & process state", description: "Runtime diagnostics live in the terminal" },
    { icon: "🌐", title: "Network traffic & env vars", description: "Connectivity checked at the shell" },
    { icon: "📁", title: "File system & disk state", description: "Storage, permissions, deployment artifacts" },
    { icon: "⚙️", title: "CI/CD pipelines & deploys", description: "Build failures, test results, deployment validation" }
  ]'
  :insight='{ icon: "💡", text: "The key insight goes here." }'
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
```

- `hero`: `{ value, label, source }` — all three fields always rendered; use empty string for `source` if no citation.
- `supporting`: exactly 2–4 items; each needs `icon`, `title`, `description`.
- `insight`: `{ icon, text }` — always rendered; use an empty string icon (`""`) if no icon needed.
- `progressDots`: see universal props above.

### `WorkflowShowdownStepsSlide`

Two-column numbered step comparison — the "before" path (red/problem) vs the "after" path (green/outcome). Steps are mirrored so the audience follows the divergence beat by beat. The strongest tension → catharsis layout.

```html
<WorkflowShowdownStepsSlide
  :partNumber="1"
  pillIcon="🎯"
  pillLabel="Section · Concept"
  title="Traditional Workflow vs. Plan Mode"
  subtitle="From trial-and-error to collaborative strategy"
  leftLabel="Traditional Workflow"
  rightLabel="With Plan Mode"
  :steps='[
    { left: { label: "Make request", note: "Describe what you need" }, right: { label: "Make request", note: "Describe what you need" } },
    { left: { label: "AI generates solution", note: "Assumes intent, one interpretation" }, right: { label: "AI asks questions", note: "Clarifies intent before acting" } },
    { left: { label: "You review and fix", note: "Discover wrong assumptions" }, right: { label: "Collaborate on plan", note: "Review strategy before any code" } },
    { left: { label: "Repeat until it works", note: "Average: 8 attempts" }, right: { label: "Execute with confidence", note: "Ambiguity resolved upfront" } }
  ]'
  :outcomeLeft='{ icon: "🔄", label: "Repeat ×8 — average attempts before success" }'
  :outcomeRight='{ icon: "✓", label: "Done in ~2 attempts" }'
  summaryMetric="8 debugging attempts → 2 with Plan Mode"
  :progressDots='{ current: 1, total: 3, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
```

- `steps`: 2–5 items; each step is an object with `left` and `right` sides, each having `label` (required) and `note` (optional detail line).
- `outcomeLeft` / `outcomeRight`: `{ icon?, label }` — the ending stamp for each column.
- `summaryMetric`: optional bottom bar for a single key number (e.g., `"8 attempts → 2"`).
- Red/green semantic colors are hardcoded — do not fight them with `accentMode`.

### `MaturityJourneyRoadmapSlide`

Horizontal stage progression with chevron separators. One stage can be marked `isTarget: true` to receive a "TARGET" badge. Supports 2–5 stages; the internal color palette (slate → blue → indigo → cyan → emerald) is distributed automatically.

```html
<MaturityJourneyRoadmapSlide
  :partNumber="2"
  pillIcon="📐"
  pillLabel="AgentRC Maturity Model"
  title="5 Levels of Repository Readiness"
  subtitle="Each level unlocks a new class of agent capability"
  :stages='[
    { label: "L1", name: "Functional",   description: "Reliable scripts and baseline CI",          icon: "🔧", isTarget: false },
    { label: "L2", name: "Documented",   description: "Explicit conventions agents can follow",     icon: "📖", isTarget: false },
    { label: "L3", name: "Standardized", description: "CI/CD policies and auditable review",        icon: "⚙️", isTarget: false },
    { label: "L4", name: "Optimized",    description: "MCP tools and multi-step workflows",         icon: "🤖", isTarget: false },
    { label: "L5", name: "Autonomous",   description: "Agents as primary producers",                icon: "🚀", isTarget: true  }
  ]'
  caption="L1–L4 are prerequisites — each level must stay healthy as you reach L5"
  :progressDots='{ current: 1, total: 1, activeColor: "bg-blue-400 shadow-lg shadow-blue-500/50" }'
/>
```

- `stages`: 2–5 items; each needs `label`, `name`, `description`. `icon` and `isTarget` are optional.
- Only one stage should have `isTarget: true`. It receives the emerald highlight ring and "TARGET" badge.
- `caption`: optional bottom-center italic text (e.g., a key constraint about the journey).

### `AITerminalTranscriptSlide`

A cinematic terminal block rendering a multi-turn AI conversation. Terminal color grammar is hardcoded (green=prompt, cyan=user, yellow=thinking, white=response, green=outcome) — never override these semantics.

```html
<AITerminalTranscriptSlide
  :partNumber="3"
  pillIcon="🎯"
  pillLabel="Section · Demo"
  title="Plan Mode in Action: Docker Debugging"
  subtitle="Root cause in 8 minutes instead of 45"
  :transcript='[
    { type: "prompt",   text: "copilot" },
    { type: "user",     text: "Debug why the backend container will not start" },
    { type: "thinking", label: "🤔 Copilot (Plan Mode):" },
    { type: "response", lines: ["Before I start, a few questions:", "1. Check docker-compose config, logs, or both?", "2. Include environment variable analysis?"] },
    { type: "user",     text: "Start with logs, then check config if needed" },
    { type: "divider" },
    { type: "outcome",  text: "Found: Port 5000 mapped to 5001 in docker-compose.yml" },
    { type: "outcome",  text: "Fix applied. Container starts successfully." }
  ]'
  footerMetric="8 min → 45 min reduction"
  :progressDots='{ current: 2, total: 4, activeColor: "bg-indigo-400 shadow-lg shadow-indigo-500/50" }'
/>
```

Turn types:
- `prompt` — `{ type: "prompt", text }` renders green `$ text`
- `user` — `{ type: "user", text }` renders cyan `> "text"`
- `thinking` — `{ type: "thinking", label? }` renders yellow label (defaults to `"🤔 Copilot:"`)
- `response` — `{ type: "response", lines: string[] }` renders white indented lines
- `divider` — `{ type: "divider" }` renders a thin cyan separator line
- `outcome` — `{ type: "outcome", text }` renders green `✅ text`

### `MaturityLevelDrilldownSlide`

Deep-dive into one level/stage of a sequence. Structure: chrome header → title → italic blockquote → 3-column diagnostic grid. Pairs with `MaturityJourneyRoadmapSlide` (roadmap = wide shot; drilldown = close-up per level).

```html
<MaturityLevelDrilldownSlide
  :partNumber="1"
  pillIcon="📐"
  pillLabel="AgentRC Maturity Model"
  title="🔧 Functional"
  subtitle="Safe for AI-assisted development with close human review"
  quote="A repo at Level 1 is safe for AI-assisted development. Agents can produce output, but need close human review because there are no enforced conventions or CI gates."
  :lossItems='["PRs fail due to fragile build paths", "CI babysitting and setup and debug time", "Agent PRs arrive without context, require back-and-forth"]'
  :changeItems='["Build and test paths become explicit and measurable", "CI setup and debug time reduced", "Linting removes style review churn"]'
  :checkItems='["Linting configured", "Build and test scripts present", "README present", "Lockfile committed"]'
  :progressDots='{ current: 1, total: 5, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
```

- `quote`: the level's defining sentence — rendered as a full-width italic blockquote.
- `lossItems` / `changeItems` / `checkItems`: string arrays, bullet-prefixed automatically.
- `lossesLabel` / `changesLabel` / `checksLabel`: optional header overrides (defaults shown below).
- Column colors: red (losses), green (changes), `chrome.accent` (checks — harmonizes with section).
- Default column headers: `"⏳ Where Time Is Lost"`, `"✅ What Changes"`, `"🔍 Key Checks"`.

### `FrameworkMappingRowsSlide`

Labeled row taxonomy: fixed-width concept label on the left → explanation text in the center → monospace tag on the right. Row colors come from `useSectionCards()` and cycle through the section's 4-card palette automatically. Supports 2–6 rows.

```html
<FrameworkMappingRowsSlide
  :partNumber="1"
  pillIcon="🧠"
  pillLabel="The Distance Model"
  title="Five Distances Copilot CLI Removes"
  subtitle="Each section removes a different kind of distance between you and the work"
  :rows='[
    { label: "Intent",     description: "AI stops guessing and starts asking — Plan Mode clarifies before acting", tag: "Plan Mode"      },
    { label: "Complexity", description: "One task becomes many, run in parallel across independent workstreams",   tag: "/fleet fan-out" },
    { label: "Context",    description: "Session survives compaction and remembers decisions across sessions",     tag: "Auto-compact"   },
    { label: "Time",       description: "Work outlives your attention — background delegation frees the terminal", tag: "& delegation"   },
    { label: "Geography",  description: "AI meets the problem where it lives — remote sessions cross any distance", tag: "--remote"      }
  ]'
  footnote="The session is the unit of work, not the shell"
  :progressDots='{ current: 1, total: 1, activeColor: "bg-cyan-400 shadow-lg shadow-cyan-500/50" }'
/>
```

- `rows`: 2–6 items; each needs `label`, `description`, `tag`. Row color cycles through section cards.
- `footnote`: optional bottom-center italic caption.
- Do not hardcode colors in `rows` — the section card palette provides automatic visual distinction.

**There is no inline HTML fallback.** If content does not fit any of the 13 components, adapt the content to the closest archetype or split it across two component slides. Components own all styling — do not add inline Tailwind for colors, layout, or theming. The 13 components cover terminal transcripts (`AITerminalTranscriptSlide`), maturity models (`MaturityJourneyRoadmapSlide`, `MaturityLevelDrilldownSlide`), workflow comparisons (`WorkflowShowdownStepsSlide`), and framework taxonomies (`FrameworkMappingRowsSlide`) in addition to the original 8 archetypes.

---

## Content Slides

### Preferred Archetypes

- Capability reveal
- Workflow before/after
- Architecture breakdown
- Tool comparison with constraints
- Sequence/flow slide
- Operational demo framing
- Metrics and impact

### Avoid

- Abstract strategy language without concrete workflow evidence
- Long instructional walkthroughs better suited for workshop decks
- Executive ROI framing as the primary narrative

---

## Recipe Integration

Tech talks should also load `deck.recipe.yml` when present. The recipe controls per-talk framing and emphasis, but this profile controls the visual system and the allowed archetype family.