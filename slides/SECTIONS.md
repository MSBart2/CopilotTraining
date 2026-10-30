# Slide Index Sections

> **AUTHORITATIVE SOURCE:** `slides/index-custom.html` is the source of truth for what talks exist and their sections.
> This file describes what's currently deployed in the HTML.
>
> Used by:
> - `.github/agents/slide-generator.agent.md` (card placement logic)
> - `.github/copilot-instructions.md` (valid `section:` frontmatter values)
>
> **To add/remove/deprecate a section:**
> 1. Edit `slides/index-custom.html` (add/remove `<div class="sub-group">` or `<a class="card">` elements)
> 2. Then update this file to match what's deployed
> 3. Agents read this file at runtime — they pick up the reference

---

## Section Map

Each entry defines:
- **Section name** — the exact string used in README frontmatter `section:` field
- **Icon** — emoji used in the index sub-group header
- **Parent container** — which top-level `<div class="section ...">` block it belongs to
- **Contents** — what talks belong here (informational, not exhaustive)

---

### 🔬 Tech Talks

Top-level container class: `section tech-talks`

| Section Name | Icon | Slug | Tagline | Contents |
|---|---|---|---|---|
| `Foundations` | 🧱 | `foundations` | Choose the surface and encode the context every agent shares | Surfaces, Configuration Primitives, Custom Agents |
| `Agents at Your Keyboard` | ⌨️ | `agents-at-your-keyboard` | Run, steer, and verify agents locally in VS Code and the CLI | CLI, What's New in VS Code, local SDLC orchestration |
| `Agents on GitHub` | ☁️ | `agents-on-github` | Hand work to agents GitHub runs, and inspect the evidence they return | Coding agent, Code Review, Code Quality, GitHub Agentic Workflows |
| `Trust and Govern` | 🛡️ | `trust-and-govern` | Measure readiness, decide what blocks, and name who may approve or override | Agentic SDLC, Enterprise Patterns |
| `Extend and Embed` | 🧩 | `extend-and-embed` | Add capabilities, interfaces, protocols, and governed domain context | Plugins, Harness Fundamentals, Azure MCP, Foundry |

> **Taxonomy:** sections answer *where the agent runs and who starts it*. The judgment lenses — Context, Delegation, Verification, Authority — apply inside every talk; they are not sections.
>
> **Legacy sections:** `Choose and Configure`, `Delegate and Coordinate`, and `Verify and Govern` remain valid **only** on archived talks, whose frontmatter is frozen. Active talks must use a section from the table above.

---

### 💼 Executive Talks

Top-level container class: `section exec-talks`

| Section Name | Icon | Slug | Contents |
|---|---|---|---|
| `Executive Talks` | 💼 | `exec-talks` | The Agentic Operating Model |

> Executive Talks have no sub-groups — cards go directly in the `exec-talks` section grid.

---

### 🎓 Workshop

Top-level container class: `section workshop`

| Section Name | Icon | Slug | Contents |
|---|---|---|---|
| `Workshop` | 🎓 | `workshop` | Modules 00–06 (numbered, no sub-groups) |

> Workshop modules are numbered, not grouped into sub-groups.

---

## Card Lifecycle

Cards in `index-custom.html` can have multiple states:

| State | Badge | Meaning | Example |
|---|---|---|---|
| **Active** | none | Current, in production, recommended | Copilot CLI, Agent Teams |
| **Deprecated** | `<span class="badge-deprecated">Merged</span>` | Superseded by another talk; content archived into that talk | Multi-Step Tasks (merged into Agent Teams) |

Deprecated cards remain in the HTML for link preservation and historical records, but are visually muted (opacity 0.45, grayscale filter) and non-clickable.

**Archived talks** (`status: archived`) leave the card grid and appear in the **Archived Talks** list at the bottom of the page as a title link plus the talk's last card description. Their decks still build and deploy, so every archived URL stays reachable for reference. Archived content is frozen: add a list entry when a talk is archived, and leave the talk itself untouched. The list sits between `<!-- ARCHIVED-TALKS:START -->` and `<!-- ARCHIVED-TALKS:END -->`, which the portfolio inventory excludes from the active catalog count.

---

## index-custom.html Structure Reference

```
<div class="section tech-talks">
  <div class="sub-group">  ← Foundations (🧱)
  <div class="sub-group">  ← Agents at Your Keyboard (⌨️)
  <div class="sub-group">  ← Agents on GitHub (☁️)
  <div class="sub-group">  ← Trust and Govern (🛡️)
  <div class="sub-group">  ← Extend and Embed (🧩)
  <div class="sub-group">  ← Executive (💼) — executive framing talks inside tech-talks section

<div class="section exec-talks">
  <div class="grid">       ← Executive Talks (no sub-groups)

<div class="section workshop">
  <div class="grid">       ← Workshop modules (no sub-groups)

<div class="section repos">
  <div class="grid">       ← Related Repos (external links, not talk slides)

<div class="section archived">
  <ul class="archived-list"> ← Archived Talks (title + description, reference only)
```

---

## Changing Sections

When you add, rename, or deprecate a section:

1. **Edit `slides/index-custom.html`** — add/remove `<div class="sub-group">` blocks or `<a class="card">` elements
2. **Then update this file** — keep the table in sync with what's actually deployed
3. **Agents pick up the change automatically** — they read this file at runtime

> **Key rule:** The `section:` field in README and slide frontmatter must exactly match a **Section Name** in the table above (case-sensitive). `npm run portfolio:check` rejects mismatches.
