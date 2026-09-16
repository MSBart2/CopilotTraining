# Slide Component Archetypes — Specification Catalog

> Generated from a fresh, deck-by-deck audit of all 17 active tech-talk slide decks (~198 content slides) on 2026-04-17.
> **Methodology:** Visual-variant split — same structural shape with distinct visual treatment becomes a separate component.
> **Goal:** every content slide renders via one of these components passing only **content** props. Components own *all* styling (light/dark, color, layout, spacing).

---

## Authoring Rules (apply to every component)

1. **No style props.** Components must NOT accept `class`, `style`, `color`, `colorScheme`, `accent`, `gradient`, or any other style/layout pass-through. All visual treatment is hardcoded inside the component.
2. **Light/dark via `isDark` ref.** Every component defines `DARK_THEME` and `LIGHT_THEME` constants and a `t = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME)` binding. See `slides/tech-talks/components/useTheme.ts`.
3. **Three-layer styling.** Layer 1 = layout/positioning in `slides/style.css`. Layer 2 = non-color Tailwind in template. Layer 3 = colors via theme object. Never put colors in CSS, never inline-style, never accept color props.
4. **Code as data.** Code is always a prop, never a slot: `code: { language: string; content: string; filename?: string }`.
5. **File order.** Top doc comment block → `<script setup>` (imports, theme, props) → `<template>`. No exceptions.
6. **Required props.** No silent fallback `default: ''`. If content is structurally required by the visual, mark it `required: true`.

## Visual Language

The component system follows the same restrained visual direction as `index-custom.html`:

1. **Neutral surfaces, sectional accents.** Dark cards use a shared slate surface; light cards use white. Section colors belong on borders, labels, rules, and key text rather than flooding whole panels.
2. **Editorial hierarchy.** Titles are left-led, high contrast, and materially larger than supporting copy. Compact uppercase kickers orient the audience without becoming decorative pills.
3. **Crisp geometry.** Cards and labels use modest corner radii. Avoid capsule-shaped text containers except for true statuses or compact metadata.
4. **No decorative glow circles.** Do not add blurred orbs, bokeh, or logo glows. Use subtle gradients, hairlines, or grid texture to create depth.
5. **Purposeful gradients.** Reserve gradients for title text, section transitions, and restrained canvas atmosphere. Content panels remain readable neutral surfaces.
6. **Sparse decoration.** Icons support scanning but should not compete with the evidence, artifact, or decision shown on the slide.

The shared implementation lives in `slides/style.css` and `slides/tech-talks/components/useSectionTheme.ts`. Component-specific styles should build on those primitives instead of reintroducing a separate visual theme.

---

## Existing Structural Components (already built — out of scope)

These 8 already-shipped components in `slides/tech-talks/components/` cover non-content slides and are excluded from this audit:

`TitleSlide`, `SectionOpenerSlide`, `TocSlide`, `BeforeAfterSlide`, `CoreQuestionSlide`, `ReferencesSlide`, `WhatYouCanDoTodaySlide`, `ThankYouSlide`.

---

## Summary

30 archetypes covering 198 content slides across 17 decks. Grouped by family for navigation; each is its own component.

| # | Component | Family | Count | One-line description |
|---|-----------|--------|------:|----------------------|
| 1 | `BeforeAfterPanelsSlide` | Comparison | 12 | 2-col red/green opposition panels, no metrics |
| 2 | `BeforeAfterMetricsSlide` | Comparison | 14 | 2-col red/green + metric tile row below |
| 3 | `UseCaseBeforeAfterSlide` | Comparison | 9 | 2-col before/after + outcome metric + optional code block |
| 4 | `MoveTowardAgainstSlide` | Comparison | 6 | Green checklist vs red/amber checklist + optional bottom callout |
| 5 | `TwoColPairedConceptsSlide` | Comparison | 10 | 2-col paired concepts (no opposition coloring; cool palette) |
| 6 | `TwoColCheckmarkSlide` | Comparison | 6 | Green ✓ vs red ✗ capability split |
| 7 | `ProblemSolutionOutcomeSlide` | Narrative | 10 | 3-col red→blue→green narrative |
| 8 | `ProgressionLevelDetailSlide` | Narrative | 6 | 3-col red loss / green changes / cyan checks (Level N detail) |
| 9 | `ThreeColumnMindsetSlide` | Narrative | 3 | 3-col toward/away/stop |
| 10 | `CodeWithFeaturesSlide` | Code | 12 | Code block + 2–4 feature cards adjacent or below |
| 11 | `CodeWithMetricSlide` | Code | 6 | Code block + bottom green success-metric bar |
| 12 | `DualCodeBlocksSlide` | Code | 4 | Two side-by-side code blocks (compare config / impl) |
| 13 | `CodeShowcaseSlide` | Code | 3 | Single code block in gradient frame, no annotations |
| 14 | `TerminalWithSideCardsSlide` | Terminal | 6 | Terminal frame + 3–4 right-side annotation cards |
| 15 | `TerminalDemoSlide` | Terminal | 3 | Full-bleed scrollable terminal alone |
| 16 | `FourCardGridSlide` | Grid | 10 | 2×2 gradient cards (cyan→purple progression) |
| 17 | `FourColumnRowSlide` | Grid | 8 | 4 equal cards in single horizontal row |
| 18 | `ThreeColumnCardSlide` | Grid | 10 | 3 equal cards (capability/tier/option) |
| 19 | `SixCardGridSlide` | Grid | 5 | 2×3 or 3×2 card grid |
| 20 | `EightCardGridSlide` | Grid | 2 | 4×2 lifecycle/event grid |
| 21 | `FiveColumnProgressionSlide` | Grid | 3 | 5-col single row (e.g. L1–L5 levels) |
| 22 | `HorizontalStepFlowSlide` | Flow | 5 | Numbered horizontal steps with → connectors |
| 23 | `VerticalStepListSlide` | Flow | 4 | Numbered vertical list of step cards |
| 24 | `VerticalPipelineSlide` | Flow | 4 | Vertical pipeline (4–5 stages with ↓) |
| 25 | `BranchingFlowSlide` | Flow | 3 | Process flow with green/red/yellow outcome branches |
| 26 | `HeroStatSlide` | Hero | 4 | One giant stat + supporting cards |
| 27 | `TwoStatContrastSlide` | Hero | 3 | Two big numbers dramatically contrasted |
| 28 | `DecisionMatrixTableSlide` | Decision | 5 | Full table (option rows × criteria columns) |
| 29 | `DecisionQuadrantSlide` | Decision | 3 | 2×2 decision quadrant |
| 30 | `DecisionTreeSlide` | Decision | 3 | ASCII decision tree, often paired with summary table |

**Coverage: 188 / 198 slides. 10 outliers documented at end.**

---

## Family: Comparison (57 slides, 6 components)

### 1. `BeforeAfterPanelsSlide` — 12 slides

**Visual treatment:** Two equal columns, left in red/orange palette (✗/❌ glyph in header), right in green/emerald palette (✓ in header). Each panel shows 3–6 bullet items or sub-paragraphs. **No metrics row.** Opposition is communicated purely by color and glyph.

**Distinct from `BeforeAfterMetricsSlide`** because there is no quantified metric tile row.

```ts
interface Props {
  title: string
  subtitle?: string
  before: { header: string; items: Array<{ icon?: string; text: string; detail?: string }> }
  after:  { header: string; items: Array<{ icon?: string; text: string; detail?: string }> }
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-acp` Before ACP vs After ACP · `copilot-azure-mcp` Compression Effect · `agentic-sdlc` Coordination Tax · `agentic-sdlc` Enforced Module Boundaries · `copilot-memory` Memory Hygiene · `copilot-cli` Plan Mode Fundamental Shift.

---

### 2. `BeforeAfterMetricsSlide` — 14 slides

**Visual treatment:** Same red/green 2-col panels as above, **plus** a row of 2–4 numeric metric tiles below (large value + small label, accent color per tile). Optional bottom insight bar.

**Distinct from `BeforeAfterPanelsSlide`** by mandatory metric row; **distinct from `UseCaseBeforeAfterSlide`** because there is no embedded code block.

```ts
interface Props {
  title: string
  subtitle?: string
  before: { header: string; items: string[] }
  after:  { header: string; items: string[] }
  metrics: Array<{ value: string; label: string; icon?: string }>  // 2–4 tiles
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-hooks` HIPAA Compliance · `copilot-hooks` SOC 2 Enforcement · `copilot-hooks` Multi-Tenant Quality Gates · `agentic-journey` Coding Metrics · `agentic-journey` Planning Metrics · `enterprise-patterns` Traditional Problem.

---

### 3. `UseCaseBeforeAfterSlide` — 9 slides

**Visual treatment:** Red Before / green After panels at top, full-width syntax-highlighted code block in the middle, single bottom outcome metric pill (large green callout). The code is a **mandatory** part of the visual.

**Distinct from `BeforeAfterMetricsSlide`** by mandatory code block and single (not multi-tile) outcome.

```ts
interface Props {
  title: string
  subtitle?: string
  before: { items: string[] }
  after:  { items: string[] }
  code: { language: string; content: string; filename?: string }
  outcome: { value: string; label: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-sdk` Use Case 1/2/3 (Release Engineering, Test Infra, Code Review Bots) · `mcp-apps` Use Case 1/2/3 (Metrics Dashboard, DB Queries, Form Scaffolding) · `copilot-web` Image-Based Issue Creation.

---

### 4. `MoveTowardAgainstSlide` — 6 slides

**Visual treatment:** Centered italicized quote/header in pill at top. Two columns: left green "Move Toward" checklist (✓ glyphs), right amber/red "Move Away From" or "Move Against" checklist. Optional third bottom-spanning red box for an absolute "stop doing" rule.

**Distinct from `BeforeAfterPanelsSlide`** by the prescriptive checklist framing (✓/⛔ per item) and the centered quote header.

```ts
interface Props {
  title: string
  quote: string
  toward: { items: string[] }
  awayFrom: { items: string[] }
  stopDoing?: { items: string[] }    // bottom-span red
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agent-teams` Mental Model Shift · `copilot-cli` Mental Model Shift · `copilot-azure-mcp` Mental Model Shift · `agentic-sdlc` Economic Shift.

---

### 5. `TwoColPairedConceptsSlide` — 10 slides

**Visual treatment:** Two equal columns in **cool palette only** (cyan/blue/indigo/purple — never red/green opposition). Each column has a header pill, icon, and 3–6 items. Used when comparing two non-opposed concepts (e.g. "two patterns", "two modes", "store vs retrieve").

**Distinct from `BeforeAfterPanelsSlide`** by absence of red/green opposition; both columns are equally "good".

```ts
interface Props {
  title: string
  subtitle?: string
  left:  { header: string; icon?: string; items: Array<{ text: string; detail?: string }>; code?: { language: string; content: string } }
  right: { header: string; icon?: string; items: Array<{ text: string; detail?: string }>; code?: { language: string; content: string } }
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agent-teams` Two Invocation Patterns · `agent-teams` Two Modes (Collaborative vs Adversarial) · `copilot-memory` Memory Tool Architecture (Store vs Retrieve) · `copilot-memory` Semantic Retrieval & Sync · `vscode-latest` Background Agents & Worktrees · `vscode-latest` Agent Plugins.

---

### 6. `TwoColCheckmarkSlide` — 6 slides

**Visual treatment:** Two columns where left = green ✅ "do this" / "Copilot handles" checklist and right = blue or red ❌ "humans handle" / "don't do this". Every item has a leading checkmark or X glyph. Header is an icon + role label.

**Distinct from `MoveTowardAgainstSlide`** by absence of centered quote and by role-based (not directive) framing.

```ts
interface Props {
  title: string
  subtitle?: string
  left:  { header: string; icon?: string; items: string[] }   // ✅
  right: { header: string; icon?: string; items: string[] }   // 👤 or ❌
  law?: { icon?: string; text: string }    // bottom centered constraint
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-code-review` Balancing Automation and Human Review · `copilot-web` What to Delegate · `copilot-web` Separation of Duties · `copilot-memory` Storage Decision Logic · `copilot-acp` Permission Model.

---

## Family: Narrative (19 slides, 3 components)

### 7. `ProblemSolutionOutcomeSlide` — 10 slides

**Visual treatment:** Three columns left-to-right: red Problem → blue Solution → green Outcome. Each column has icon, header, and 3–5 bullet items. Solution column may contain a small code snippet. Optional bottom insight.

```ts
interface Props {
  title: string
  subtitle?: string
  problem:  { items: string[] }
  solution: { items: string[]; code?: { language: string; content: string } }
  outcome:  { items: string[]; metrics?: Array<{ value: string; label: string }> }
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-acp` Use Case Zed Editor · `copilot-acp` Use Case CI/CD Dashboard · `copilot-acp` Use Case Polyrepo · `agentic-journey` Use Case Duplicate Elimination · `agentic-workflows` Use Case Issue Triage · `copilot-chat-internals` Custom Instructions Not Loading · `copilot-chat-internals` Thinking Reveals Prompt Ambiguity.

---

### 8. `ProgressionLevelDetailSlide` — 6 slides

**Visual treatment:** Three columns: red "What's Lost" / green "What Changes" / cyan "Key Checks". Header includes a level badge (Level 1, Level 2…). Color triplet is **distinct** from Problem/Solution/Outcome (cyan replaces green; semantic is "checklist", not "win"). Often paired with a top-of-deck progression strip showing N of 5 levels active.

**Distinct from `ProblemSolutionOutcomeSlide`** by the cyan check column and the level-badge header.

```ts
interface Props {
  level: { number: number; label: string; icon?: string }
  whatLost:    { items: string[] }
  whatChanges: { items: string[] }
  keyChecks:   { items: string[] }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agentic-sdlc` Level 1 Functional · Level 2 Documented · Level 3 Standardized · Level 4 Optimized · Level 5 Autonomous (5 slides) · `copilot-memory` Quantified Time Savings (variant).

---

### 9. `ThreeColumnMindsetSlide` — 3 slides

**Visual treatment:** Three columns in semantic order: green "Move Toward" / yellow "Move Away From" / red "Stop Doing". Each column has 3–5 bullets. Heavier emphasis than `MoveTowardAgainstSlide` because it has three explicit zones.

```ts
interface Props {
  title: string
  subtitle?: string
  moveToward:  { items: string[] }
  moveAway:    { items: string[] }
  stopDoing:   { items: string[] }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agentic-workflows` Mental Model Shift · `agent-teams` Mental Model Shift (3-zone variant) · `copilot-azure-mcp` Move Away/Toward Matrix.

---

## Family: Code (25 slides, 4 components)

### 10. `CodeWithFeaturesSlide` — 12 slides

**Visual treatment:** Syntax-highlighted code block on one side (left or top) paired with 2–4 small feature/explanation cards on the other side or below. Cards have icon + title + 1–2 line description.

```ts
interface Props {
  title: string
  subtitle?: string
  code: { language: string; content: string; filename?: string }
  codePosition: 'left' | 'top'
  features: Array<{ icon?: string; title: string; description: string }>   // 2–4
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-primitives` AGENTS.md Playbook · `copilot-primitives` Repository-Wide Instructions · `copilot-primitives` Path-Specific Instructions · `copilot-primitives` Custom Prompts Component Generator · `copilot-hooks` Context Injection · `copilot-hooks` JSON Lines Logging · `copilot-hooks` Complete Audit Configuration · `copilot-hooks` Hook Configuration Format.

---

### 11. `CodeWithMetricSlide` — 6 slides

**Visual treatment:** Code block dominating the slide with a single full-width green success-metric bar at the bottom (large value + label). No side cards. **Distinct from `CodeWithFeaturesSlide`** by absence of feature cards and presence of the bottom metric bar.

```ts
interface Props {
  title: string
  subtitle?: string
  code: { language: string; content: string; filename?: string }
  metric: { value: string; label: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-sdk` Pattern 1 CLI Tool · Pattern 2 Web API · Pattern 3 Scheduled Automation · `mcp-apps` Dashboard Pattern · Drill-Down Pattern · Form-Driven Workflow.

---

### 12. `DualCodeBlocksSlide` — 4 slides

**Visual treatment:** Two side-by-side code blocks, each with its own filename label. Used for comparing config-vs-impl or two implementation styles.

```ts
interface Props {
  title: string
  subtitle?: string
  left:  { label: string; code: { language: string; content: string } }
  right: { label: string; code: { language: string; content: string } }
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-code-review` Custom Guidance with Instruction Files · `copilot-acp` SDK Ecosystem (Python + MCP) · `copilot-primitives` Custom Agents Planner · `agent-teams` Squad Production Implementation.

---

### 13. `CodeShowcaseSlide` — 3 slides

**Visual treatment:** Single bordered code block in gradient container, no annotations. The code IS the slide. Header pill + maybe one-line subtitle.

```ts
interface Props {
  title: string
  subtitle?: string
  code: { language: string; content: string; filename?: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agentic-workflows` Markdown to YAML Example · `copilot-hooks` Security Check Implementation · `copilot-acp` Streaming & Results.

---

## Family: Terminal (9 slides, 2 components)

### 14. `TerminalWithSideCardsSlide` — 6 slides

**Visual treatment:** `TerminalFrame` (existing leaf component) on left ~60%, 3–4 stacked annotation cards on right ~40%. Each card has icon + title + 1–2 lines describing what's happening in the terminal.

```ts
interface Props {
  title: string
  subtitle?: string
  terminal: { command?: string; output: string; maxHeight?: string }
  cards: Array<{ icon?: string; title: string; description: string }>   // 3–4
  badges?: string[]
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-cli` /fleet Fan-Out · Cloud Delegation · Context Management · How --remote Works · Log Forensics · Infra Patrol & Multi-Machine.

---

### 15. `TerminalDemoSlide` — 3 slides

**Visual treatment:** Full-bleed `TerminalFrame` dominating the slide with optional header pill above. No side cards. Used when the terminal output is long enough to warrant the full canvas.

```ts
interface Props {
  title: string
  subtitle?: string
  terminal: { command?: string; output: string; maxHeight?: string }
  badges?: string[]
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-cli` Docker Debugging Demo · `copilot-cli` CI/CD Automation · `copilot-azure-mcp` Compression Effect demo.

---

## Family: Grid (38 slides, 6 components)

### 16. `FourCardGridSlide` — 10 slides

**Visual treatment:** 2×2 grid of equal cards. Each card uses a distinct gradient from a fixed cyan→blue→indigo→purple progression. Card content: large emoji/icon + title + 1–2 line description.

```ts
interface Props {
  title: string
  subtitle?: string
  cards: [Card, Card, Card, Card]   // exactly 4
  bottomBar?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
type Card = { icon: string; title: string; description: string }
```

**Examples:** `copilot-acp` Key Capabilities · `copilot-cli` Operating Modes · `vscode-latest` Four Agent Types · `vscode-latest` Chat UX Improvements · `copilot-web` The Evidence Bundle · `copilot-memory` Ideal Candidates · `enterprise-patterns` What to Standardize · `agentic-workflows` Intent-Driven Automation.

---

### 17. `FourColumnRowSlide` — 8 slides

**Visual treatment:** Single horizontal row of 4 equal-width cards (no wrapping to second row, unlike 4-card 2×2 grid). Used for tier breakdowns and 4-way enumerations where horizontal reading order matters.

**Distinct from `FourCardGridSlide`** by single-row layout and emphasis on horizontal progression.

```ts
interface Props {
  title: string
  subtitle?: string
  columns: [Col, Col, Col, Col]
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
type Col = { icon?: string; title: string; description?: string; items?: string[] }
```

**Examples:** `copilot-cli` Reasoning Models (Low/Med/High/Extra) · `copilot-code-review` Phased Rollout Strategy · `copilot-code-review` Six Capability Categories (4 of 6) · `copilot-hooks` Querying Audit Logs · `copilot-hooks` Integration Patterns · `agentic-sdlc` Key Takeaways · `agentic-journey` Expected ROI · `copilot-web` Effective Issue Anatomy categories.

---

### 18. `ThreeColumnCardSlide` — 10 slides

**Visual treatment:** 3 equal-width cards in a single row. Each has icon + title + items list or short description. Colors typically progress cyan/blue/indigo or cyan/indigo/purple.

```ts
interface Props {
  title: string
  subtitle?: string
  columns: [Col, Col, Col]
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
type Col = { icon?: string; title: string; description?: string; items?: string[] }
```

**Examples:** `copilot-primitives` Instructions Three Selectors · `enterprise-patterns` Flexible Licensing · `enterprise-patterns` Metrics Framework · `copilot-acp` ACP vs MCP vs LSP · `copilot-web` Triggering the Agent · `vscode-latest` Session Management · `vscode-latest` Agentic Browser Tools · `copilot-cli` Extensibility · `copilot-cli` Why --remote Matters · `copilot-memory` Quantified Time Savings.

---

### 19. `SixCardGridSlide` — 5 slides

**Visual treatment:** 2×3 or 3×2 grid (6 cards total). Same card style as `FourCardGridSlide` but extended palette (cyan/blue/indigo/purple/pink/rose).

```ts
interface Props {
  title: string
  subtitle?: string
  cards: [Card, Card, Card, Card, Card, Card]
  layout: '2x3' | '3x2'
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-code-review` Six Capability Categories · `copilot-chat-internals` What Agent Debug Panel Shows · `agentic-workflows` Safe Output Types · `agentic-workflows` Proven Patterns · `copilot-acp` Start ACP Server (6-step grid).

---

### 20. `EightCardGridSlide` — 2 slides

**Visual treatment:** 4×2 grid of 8 cards covering full lifecycle/event taxonomies. Extended gradient palette across all 8 cells (cyan→orange).

```ts
interface Props {
  title: string
  subtitle?: string
  cards: [Card, Card, Card, Card, Card, Card, Card, Card]   // exactly 8
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-hooks` The 8 Lifecycle Events · `copilot-web` Inside the Sandbox (8-step expanded variant).

---

### 21. `FiveColumnProgressionSlide` — 3 slides

**Visual treatment:** 5 equal columns in a single row showing a graduated progression (e.g. levels, phases). Each column has a level badge + label + short description. Colors progress along the row.

```ts
interface Props {
  title: string
  subtitle?: string
  levels: [Level, Level, Level, Level, Level]   // exactly 5
  progressDots?: { current: number; total: number }
}
type Level = { number: number; label: string; icon?: string; description?: string }
```

**Examples:** `agentic-sdlc` AgentRC Levels overview · `agentic-sdlc` How to Achieve Fast CI · `copilot-cli` The Distance Model.

---

## Family: Flow (16 slides, 4 components)

### 22. `HorizontalStepFlowSlide` — 5 slides

**Visual treatment:** 3–6 numbered cards arranged left-to-right with `→` connectors between them. Each card has number badge, title, and short description. Optional bottom row of supplementary cards.

```ts
interface Props {
  title: string
  subtitle?: string
  steps: Array<{ number: number; title: string; description: string; icon?: string }>   // 3–6
  supplementary?: Array<{ icon?: string; title: string; description: string }>
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-code-review` Hybrid Analysis Approach · `copilot-sdk` How SDK Works · `copilot-acp` Start Server & Connect SDK · `copilot-web` Evidence-First Review · `agent-teams` The Hand-Off Workflow.

---

### 23. `VerticalStepListSlide` — 4 slides

**Visual treatment:** 4–6 step cards stacked vertically, each with a left-side number badge, title, and description on the right. No connector arrows. Used when steps are too detailed for horizontal layout.

```ts
interface Props {
  title: string
  subtitle?: string
  steps: Array<{ number: number; title: string; description: string; icon?: string }>   // 4–6
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agentic-journey` Triage Workflow & Metrics · `copilot-cli` Combination Patterns · `copilot-web` Mobile Review & Custom Agents · `enterprise-patterns` Self-Service Onboarding Kit.

---

### 24. `VerticalPipelineSlide` — 4 slides

**Visual treatment:** 4–5 stages stacked vertically with downward `↓` connectors between each stage. Each stage card spans full width with icon + title + description. Distinct from `VerticalStepListSlide` by mandatory connector arrows and emphasis on transformation.

```ts
interface Props {
  title: string
  subtitle?: string
  stages: Array<{ icon?: string; title: string; description: string }>   // 4–5
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-chat-internals` Chat Debug View Pipeline · `agentic-sdlc` Intent-Based PRs · `agentic-workflows` Three-Phase Architecture (vertical variant) · `copilot-web` copilot-setup-steps pipeline.

---

### 25. `BranchingFlowSlide` — 3 slides

**Visual treatment:** Linear horizontal flow that branches at the end into 2–3 outcome boxes with distinct outcome colors (green = allow, red = block, yellow = warn). Used for decision-pipeline visualizations.

```ts
interface Props {
  title: string
  subtitle?: string
  flow: Array<{ icon?: string; label: string }>   // linear stages
  outcomes: Array<{ icon?: string; label: string; tone: 'allow' | 'block' | 'warn' }>   // 2–3 branches
  progressDots?: { current: number; total: number }
}
```

**Examples:** `copilot-hooks` Execution Flow · `copilot-hooks` Permission Decisions · `copilot-acp` Core Message Flow.

---

## Family: Hero (7 slides, 2 components)

### 26. `HeroStatSlide` — 4 slides

**Visual treatment:** One oversized statistic (gradient text, very large font) dominates the left/center. 2–4 smaller supporting cards on the right.

```ts
interface Props {
  title: string
  hero: { value: string; label: string; source: string }
  supporting: Array<{ icon: string; title: string; description: string }>   // 2–4
  insight: { icon: string; text: string }
  progressDots: { current: number; total: number }
}
```

**All props required** (no optional fields — pass `""` for `source` or `icon` when unused).

**Examples:** `copilot-cli` The 84% Problem · `agentic-workflows` Mental Model Shift (callout variant) · `agent-teams` Mental Model Shift (callout variant) · `agentic-journey` ROI hero.

---

### 27. `TwoStatContrastSlide` — 3 slides

**Visual treatment:** Two giant numbers placed side-by-side with a center-aligned `vs` or `→` divider. Each side has its own color (red old / green new). Often a small impact-calculation row below.

**Distinct from `HeroStatSlide`** by dual-stat layout and absence of supporting cards.

```ts
interface Props {
  title: string
  left:  { value: string; label: string }    // red tone
  right: { value: string; label: string }    // green tone
  separator?: 'vs' | 'arrow'
  impact?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agentic-sdlc` The 10-Minute Rule (60min vs 8min) · `copilot-memory` Time Savings contrast · `agentic-journey` Before/After hero.

---

## Family: Decision (11 slides, 3 components)

### 28. `DecisionMatrixTableSlide` — 5 slides

**Visual treatment:** Tabular grid where rows are options/situations and columns are criteria. Cells contain ✓/✗ glyphs, color badges, or short text. Header row has accent background.

```ts
interface Props {
  title: string
  subtitle?: string
  columns: string[]   // criteria headers
  rows: Array<{
    label: string
    icon?: string
    cells: Array<{ value: string; tone?: 'good' | 'bad' | 'neutral' }>
  }>
  recommendation?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agent-teams` When to Use AgentCouncil vs. Squad · `copilot-acp` ACP vs MCP vs LSP · `copilot-primitives` Choosing the Right Primitive · `enterprise-patterns` Compliance Automation matrix · `agentic-journey` When to Graduate.

---

### 29. `DecisionQuadrantSlide` — 3 slides

**Visual treatment:** 2×2 quadrant grid where each quadrant represents a decision outcome based on two axes. Axes are labeled at top and side.

```ts
interface Props {
  title: string
  axisX: { left: string; right: string }
  axisY: { top: string; bottom: string }
  quadrants: [Quad, Quad, Quad, Quad]   // TL, TR, BL, BR
  progressDots?: { current: number; total: number }
}
type Quad = { icon?: string; title: string; description: string }
```

**Examples:** `agent-teams` When to Use Agent Teams · `mcp-apps` Component Decision Tree · `copilot-web` Firewall Configuration Levels.

---

### 30. `DecisionTreeSlide` — 3 slides

**Visual treatment:** Monospace ASCII decision tree on left (indented branches with `├──` / `└──`), summary table or rule cards on right. The ASCII art IS the visual.

```ts
interface Props {
  title: string
  subtitle?: string
  tree: string   // monospace ASCII
  summary?: {
    columns: string[]
    rows: Array<{ label: string; cells: string[] }>
  }
  insight?: { icon?: string; text: string }
  progressDots?: { current: number; total: number }
}
```

**Examples:** `agent-teams` When to Use Agent Teams (decision tree variant) · `copilot-web` copilot-setup-steps decision · `enterprise-patterns` Monorepo Nested Playbooks.

---

## Outliers — Custom HTML (10 slides)

These slides have unique visual treatments that appear only once or twice and don't justify a dedicated component. Author them as raw HTML using the global Slidev layout. If a future deck reuses one of these patterns, promote it to an archetype.

| Deck | Slide | Why outlier |
|------|-------|-------------|
| `agentic-sdlc` | The Governance Pyramid | Custom SVG/CSS pyramid diagram — geometric visual, no parallel pattern elsewhere |
| `agent-teams` | The Coordinator Pattern | Central node + radiating roles + tools + memory box — bespoke org diagram |
| `agent-teams` | The Ensemble | Coordinator + specialist columns + comparison grid — composite custom layout |
| `agent-teams` | Combining AgentCouncil + Squad | Layered architecture diagram with install snippet — unique |
| `agent-teams` | Squad: Memory & Persistence | Table + emoji growth-stage panel — single-deck narrative device |
| `agent-teams` | Git Worktree Isolation | File tree + lifecycle benefits panel — bespoke IDE-like rendering |
| `copilot-acp` | ACP Agent Orchestrator | Stack table + 2 image placeholders — image-driven, not card-driven |
| `copilot-azure-mcp` | Subscription Boundaries | Multi-sub config code + trust path + warning panels — composite |
| `enterprise-patterns` | Federated Governance & ROI | Investment vs returns + 3 metric tiles + law bar — nearly fits BeforeAfterMetrics but with mandatory law/governance bar |
| `vscode-latest` | Org-Level Instructions & Controls | Org/custom split + code + cyan/blue summary bar — composite |

---

## Cross-Component Conventions

Every component receives an optional `progressDots` and supports the global `<SlideNumber />`. Section accent colors come from the deck's frontmatter and are read by `SectionOpenerSlide` / `useTheme.ts`, **not** passed per slide.

```ts
interface BaseProgressProps {
  progressDots?: { current: number; total: number }
}
```

---

## Coverage Verification

| Deck | Total | Mapped | Outliers |
|------|------:|-------:|---------:|
| agent-teams | 15 | 9 | 6 |
| agentic-journey | 12 | 12 | 0 |
| agentic-sdlc | 14 | 13 | 1 |
| agentic-workflows | 13 | 13 | 0 |
| copilot-acp | 12 | 11 | 1 |
| copilot-azure-mcp | 11 | 10 | 1 |
| copilot-chat-internals | 8 | 8 | 0 |
| copilot-cli | 19 | 19 | 0 |
| copilot-code-review | 10 | 10 | 0 |
| copilot-hooks | 14 | 14 | 0 |
| copilot-memory | 13 | 13 | 0 |
| copilot-primitives | 11 | 11 | 0 |
| copilot-sdk | 9 | 9 | 0 |
| copilot-web | 12 | 11 | 1 |
| enterprise-patterns | 11 | 10 | 1 |
| mcp-apps | 14 | 14 | 0 |
| vscode-latest | 14 | 13 | 1 |
| **Total** | **198** | **188** | **10** |

---

## Implementation Status

### Tier 1 — ✅ SHIPPED (2026-04-17)

All 7 highest-coverage components built, plus shared `useSectionTheme.ts` helper. All 27/27 decks build clean.

| Component | Status | First production usage |
|---|---|---|
| `BeforeAfterMetricsSlide` (14) | ✅ shipped | copilot-hooks.md — "HIPAA Compliance Audit Trail" |
| `BeforeAfterPanelsSlide` (12) | ✅ shipped | copilot-acp.md — "Before vs After ACP" |
| `CodeWithFeaturesSlide` (12) | ✅ shipped | copilot-primitives.md — "Repository-Wide / Path-Specific / AGENTS.md" (×3) |
| `ThreeColumnCardSlide` (10) | ✅ shipped | copilot-primitives.md — "Instructions: Three Selectors" |
| `FourCardGridSlide` (10) | ✅ shipped | copilot-acp.md — "Key Capabilities" |
| `TwoColPairedConceptsSlide` (10) | ✅ shipped | agent-teams.md — "Two Modes" · copilot-primitives.md — "Skills: Scripts" |
| `ProblemSolutionOutcomeSlide` (10) | ✅ shipped | copilot-acp.md — "Use Case: Zed Editor Integration" |

**Conventions established for the helper (`useSectionTheme.ts`):**
- Required `partNumber: 1–4` prop on every component, validated at runtime
- DARK_CHROME[4] / LIGHT_CHROME[4] arrays drive ambient bg, orb, pill, divider, accent — keyed off SectionOpenerSlide's color progression (cyan→blue→indigo / blue→indigo→purple / indigo→purple→pink / purple→pink→rose)
- DARK_CARDS[4][4] / LIGHT_CARDS[4][4] supply per-section card palettes for non-semantic grids
- Semantic palettes (red=problem/before, green=outcome/after, blue=solution) are HARDCODED inside the component — partNumber never tints them
- Tailwind JIT requires literal class strings: `GRID_COLS = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }` lookup constants for any dynamic column count

### Remaining Build Order

**Tier 1 follow-on — sweep remaining ~68 slides:**

8. `UseCaseBeforeAfterSlide` (9)
9. `FourColumnRowSlide` (8)

**Tier 2 — High-value mid-coverage:**

10. `TerminalWithSideCardsSlide` (6)
11. `MoveTowardAgainstSlide` (6)
12. `TwoColCheckmarkSlide` (6)
13. `CodeWithMetricSlide` (6)
14. `ProgressionLevelDetailSlide` (6) — agentic-sdlc relies on this
15. `SixCardGridSlide` (5)
16. `HorizontalStepFlowSlide` (5)
17. `DecisionMatrixTableSlide` (5)

**Tier 3 — Niche but reusable:**

18. `DualCodeBlocksSlide` (4)
19. `VerticalStepListSlide` (4)
20. `VerticalPipelineSlide` (4)
21. `HeroStatSlide` (4)
22. `TerminalDemoSlide` (3)
23. `CodeShowcaseSlide` (3)
24. `ThreeColumnMindsetSlide` (3)
25. `FiveColumnProgressionSlide` (3)
26. `BranchingFlowSlide` (3)
27. `TwoStatContrastSlide` (3)
28. `DecisionQuadrantSlide` (3)
29. `DecisionTreeSlide` (3)
30. `EightCardGridSlide` (2)
