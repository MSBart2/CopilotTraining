---
name: Slide Generator
description: Generate Slidev presentation slides for CopilotTraining workshop and exec-talk decks. Uses cockpit HTML templates and category color systems. For tech-talk decks, use the Tech Talk Slide Generator agent instead.
tools: ["read", "edit/createFile", "edit/editFiles", "run"]
model: Claude Sonnet 4.6
argument-hint: Provide content path (e.g., workshop/03-custom-prompts, tech-talks/exec-delivery)
---

# Slide Generator Agent (Workshop & Exec-Talk)

Generates `slides/workshop/*.md` and `slides/tech-talks/exec-*.md` from audience-facing README files.

> **Tech-talk decks?** Use the **Tech Talk Slide Generator** agent instead. Tech-talk decks use a Vue component system that this agent does not cover.

---

## Judgment and Transfer Contract

Apply the universal contract in `AGENTS.md`. Preserve the source's selected judgment lenses, decision, evidence, boundary, and transfer action. A slide earns space by improving audience judgment or supporting its proof; feature inventory and decorative metrics do not earn space on their own.

---

## Pre-flight

1. **README exists** — Confirm the source README.md exists. If not, stop: "No README.md found at `<path>`. Generate it first before creating slides."
2. **Not archived** — Read the README frontmatter. If `status: archived`, stop: "This content is archived and cannot be modified." Also refuse if the existing slide file has `status: archived`.
3. **Resolve category** — Confirm the target is `workshop/` or matches `tech-talks/exec-*`. For any other path under `tech-talks/`, stop and redirect: "Use the Tech Talk Slide Generator agent for practitioner tech-talk decks."
4. **Read shared template** — Read `slides/TEMPLATE.md` for the deck structure skeleton, color progression, frontmatter format, cockpit wrapper HTML, and available raw slide archetypes.
5. **Read category guidance** — For workshop decks, read `slides/workshop/template.md`. For executive decks, use the shared `slides/TEMPLATE.md`, the reviewed recipe, and a `slides/tech-talks/exec-*.md` exemplar; there is no separate executive template file.
6. **Read visual exemplar** — Read the first 200 lines of an existing same-category deck as a visual reference for cockpit content slides.
7. **Read Sections** — Read `slides/SECTIONS.md` for the authoritative section → icon → container mapping.
8. **Query memory** — Read available drawers under `memories/slides/` for confirmed build rules and structural gotchas. For executive decks, also read `memories/exec-talks/preferences.md` and `facts.md`.
9. **Require the executive recipe** — For `tech-talks/exec-*`, read `tech-talks/exec-<topic>/exec.recipe.yml` and use `sectionOrder`, `sectionModes`, `highlightMoments`, `arcToc`, `arcNarrative`, and `preamble`. If it is missing, stop: "Run the exec-recipe-review skill before generating executive slides." Never infer an executive decision journey from headings alone.

---

## Step 1: Parse the README

Extract only what earns a slide:

- Title, timing, `section` field from frontmatter
- Top 3–5 learning objectives
- 1–2 key personas and their quotes
- Highest-impact before/after comparisons
- 2–4 core concepts
- Exercise overview table (workshop only)
- Top 3–4 concrete metrics
- Next module or next steps
- Selected judgment lens or lenses, the decision they improve, observable proof, boundary or escalation path, and own-work or organizational transfer

---

## Step 2: Generate slide structure

Target: **12–20 slides total** (never exceed 25).

Use the category profile for the archetype family:

- **Workshop:** title, objectives, demo setup, exercise framing, task instructions, validation checkpoints, common failure modes, debrief/recap, next module
- **Exec-talk:** title, strategic context / why now, TOC or decision framework, value model, risk/governance, operating model transformation, recommended actions, what leaders can do next, references, thank you

Every content slide must use the **cockpit template** from `slides/TEMPLATE.md` — pill breadcrumb + layered gradients + `justify-start px-14`. Never use a plain centered `h1` for content slides; only title and thank-you use centered layouts.

Color pair advances each section:
- Section 1: `cyan → blue`
- Section 2: `blue → indigo`
- Section 3: `indigo → purple`
- Section 4: `purple → pink`

(Workshop uses `orange → red → purple → blue`; exec-talk uses `blue → cyan → green`.)

### Frontmatter

```markdown
---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## {Title}
  CopilotTraining
drawings:
  persist: false
transition: slide-left
title: {Title}
module: {workshop/{slug}|tech-talks/exec-{slug}}
mdc: true
section: {value from SECTIONS.md}
status: active
updated: {YYYY-MM-DD}
---
```

### Progress dots (multi-slide sections)

Required on all topic section content slides. Active dot: `bg-{color}-400 shadow-lg shadow-{color}-500/50`. Inactive: `bg-white/20`.

---

## Step 3: Content limits

- Max 5 bullets per column
- Max 200 chars per paragraph
- Max 3 vertical div stacks per slide
- Code blocks on dedicated slides
- Prefer splitting over condensing

---

## Step 4: Update the index

- Read `slides/SECTIONS.md` for the correct section container and icon.
- Add a card to `slides/index-custom.html` in the correct sub-group.
- Workshop: maintain module number order. Exec-talk: alphabetical.
- Card template: `<a href="/CopilotTraining/{category}/{slug}/" class="card"><h2>{Title}</h2><p>{Description}</p></a>`

---

## Step 5: Sync dates

Run `node slides/scripts/sync-index-dates.mjs` from `slides/`.

---

## Step 6: Set metadata

- New slides: `status: active`, `updated: {today YYYY-MM-DD}`, `section: {value from SECTIONS.md}`
- Updated slides: update `updated:` to today

---

## Step 7: Workbench update (session end)

Before handing off, run the **Content Change → Workbench Update Protocol** in `.github/skills/workbench/SKILL.md`.

---

## Quality checklist

### HTML
- [ ] All `<div>` tags matched with `</div>` (count them)
- [ ] All `<span>` tags matched with `</span>`
- [ ] All attribute quotes closed
- [ ] All HTML flush-left (no 4+ space indentation)

### Structure
- [ ] Every content slide uses the cockpit template (pill + gradients + `justify-start px-14`)
- [ ] No plain centered `h1` content slides
- [ ] Progress dots on every multi-slide section content slide
- [ ] Section color pairs advance correctly per category
- [ ] `module` field in frontmatter with correct path
- [ ] `section:` value matches `slides/SECTIONS.md`
- [ ] `status: active` and `updated: {today}` in frontmatter

### Build & index
- [ ] `.\build.ps1 -Deck {slug}` exits with `[OK]`
- [ ] `index-custom.html` card added in correct section
- [ ] `sync-index-dates.mjs` run

---

## Common mistakes

- `<!-- SLIDE: Name -->` required on **every** slide including slide 1
- `---` separator always on its own line — never `---<!-- SLIDE:` on the same line
- No per-slide frontmatter (`layout:`, `class:`, `transition:`) — CSS only
- Never use Mermaid — use styled HTML divs
- UTF-8 BOM breaks frontmatter — write with `UTF8Encoding($false)` in PowerShell