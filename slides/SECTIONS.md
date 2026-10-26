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
| `Foundations` | 🧱 | `foundations` | Choose the surface and encode the context every agent shares | Surfaces, Configuration Primitives, Custom Agents, Harness Fundamentals |
| `Agents at Your Keyboard` | ⌨️ | `agents-at-your-keyboard` | Run, steer, and verify agents locally in VS Code and the CLI | CLI, What's New in VS Code, local SDLC orchestration |
| `Agents on GitHub` | ☁️ | `agents-on-github` | Hand work to agents GitHub runs, and inspect the evidence they return | Coding agent, Code Review, Code Quality, GitHub Agentic Workflows |
| `Trust and Govern` | 🛡️ | `trust-and-govern` | Measure readiness, decide what blocks, and name who may approve or override | Agentic SDLC, Enterprise Patterns |
| `Extend and Embed` | 🧩 | `extend-and-embed` | Add capabilities, interfaces, protocols, and governed domain context | Plugins, ACP, MCP Apps, Azure MCP, Foundry |

> **Taxonomy:** each section answers *who starts the agent and where its work applies*. Foundations is the context every agent shares. Agents at Your Keyboard run locally because a developer starts them in VS Code or the CLI. Agents on GitHub start from a GitHub event or a person on github.com. Trust and Govern holds the rules that apply whichever section an agent comes from. Extend and Embed puts agents inside other products and protocols. The judgment lenses — Context, Delegation, Verification, Authority — apply inside every talk; they are not sections.
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

Cards in `index-custom.html` have one visible state; archived talks leave the homepage:

| State | On the homepage | Meaning | Example |
|---|---|---|---|
| **Active** | Card in its section | Current, in production, recommended | Copilot CLI, Local Agentic SDLC |
| **Archived** | Card removed | README frontmatter is `status: archived` (frozen); `.github/content-routing/portfolio-redirects.json` names the successor talk | Agent Teams → Local Agentic SDLC |

Archived talks keep their folders and deck URLs, so existing links still resolve. The `.badge-deprecated` style remains in `index-custom.html` but no card uses it.

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
```

---

## Changing Sections

When you add, rename, or deprecate a section:

1. **Edit `slides/index-custom.html`** — add/remove `<div class="sub-group">` blocks or `<a class="card">` elements
2. **Then update this file** — keep the table in sync with what's actually deployed
3. **Agents pick up the change automatically** — they read this file at runtime

> **Key rule:** The `section:` field in README and slide frontmatter must exactly match a **Section Name** in the table above (case-sensitive). `npm run portfolio:check` rejects mismatches.
