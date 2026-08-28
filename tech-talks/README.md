# Tech Talks — Creation Guide

This directory contains practitioner-focused technical deep dives. Each talk lives in its own subdirectory (e.g., `copilot-cli/`, `agent-teams/`) and follows a consistent structure defined by [TEMPLATE.md](TEMPLATE.md).

---

## 📁 Directory Structure

Every tech talk produces:

```
tech-talks/{topic}/
├── research.md          # Phase 1 — raw research and source analysis
├── plan.md              # Optional working outline / review notes before drafting
├── README.md            # Final reader-first tech talk
├── deck.recipe.yml      # Per-talk slide recipe for fast single-deck regeneration
├── images/              # Downloaded or referenced visuals
└── examples/            # Standalone code samples
```

The final `README.md` is the canonical, reader-first artifact for the talk. It follows the structure in [TEMPLATE.md](TEMPLATE.md) and is meant to stand on its own as a technical reference, not as a slide outline.

---

## 💻 Creating Tech Talks with the IDE Agent

Create a tech talk interactively in VS Code using Copilot Chat agents. This gives you more control — you can review and iterate between phases.

### First Step for Existing Talks: Check the Announcement Feed

Before editing a live talk, start with the feed-driven refresh workflow. This is the first step for stale or partially outdated talks:

```bash
npm run content:route
```

Then review `.github/content-routing/latest-report.md` and `.github/content-routing/ledger.json`. If a talk is affected, invoke the `content-refresh` skill to draft a `content.refresh.yml`, or use the `ledger-tech-talk-refresh` skill to process the queued update end to end.

This workflow is the repo's standard way to identify announcement-driven updates before we write README changes or regenerate slides.

### How to Start

Open Copilot Chat and invoke:

```
@Tech Talk Generator create tech talk for [topic] using [URLs]
```

### The Three Phases

The agent follows a research-first workflow and pauses at the structure-selection point before it writes the README:

#### Phase 1: Research
- Agent fetches URLs, runs web searches, downloads images
- Synthesizes a compact research brief: topic signal, likely audience, artifacts, and decision areas

#### Phase 2: Structure Choice
- Agent proposes **one recommended outline** for the major sections
- Offers up to **two** bounded structural toggles and, only when justified, one alternate outline
- **⏸️ Pauses** — waits for you to choose `A`, apply a toggle, pick `B`, or request one structural tweak

#### Phase 3: Build
- Agent locks the selected structure and generates `README.md`
- Sets frontmatter (`status`, `updated`, `section`)
- **Invokes the deck-recipe-review skill** to run a mandatory Rubber Duck critique and produce `deck.recipe.yml`
- **⏸️ Pauses** — shows the completed talk and recipe, offers handoff to slides

### Generating Slides (Separate Step)

Slides are **not** part of the tech-talk generator's workflow. After Phase 3, use the handoff buttons or invoke directly:

```
@Tech Talk Slide Generator tech-talks/{topic}
```

The slide deck is a **separate artifact** at `slides/tech-talks/{topic}.md`. The slide generator requires a `deck.recipe.yml` — if one is missing it will stop and prompt you to run the deck-recipe-review skill first.

For tech talks, the per-talk slide control point is `tech-talks/{topic}/deck.recipe.yml`. Re-run the deck-recipe-review skill when you want to revise section structure or narrative arc, then re-invoke the slide generator.

### What the Structure Proposal Looks Like

Before drafting, the generator now shows:

- A compact **Research Brief** summarizing what the URLs actually support
- **Recommended Structure — A** with the framing question and major sections
- Up to **two** structural toggles that change emphasis or order without redesigning the whole talk
- **Alternate Structure — B** only if the sources genuinely support a different narrative arc

That means the agent does the background reading first, then gives you a small, meaningful decision before it writes the README.

### Deck Recipe Workflow

The three-agent pipeline is:

1. **Tech Talk Generator** — writes `README.md`, then invokes the deck-recipe-review skill as its final step
2. **Deck Recipe Review skill** — runs a primary analysis plus mandatory cross-model Rubber Duck critique, determines section weighting and narrative arc (`arcToc`, `arcNarrative`), and writes `deck.recipe.yml`
3. **Tech Talk Slide Generator** — reads `deck.recipe.yml` to scaffold the full slide structure in Phase A, then fills body content from the README in Phase B

The recipe is always freshly generated from the README — it is never patched from a prior version. To revise a talk's structure, re-run the deck-recipe-review skill, then re-invoke the slide generator.

See the recipe schema: [DECK-RECIPE-TEMPLATE.yml](../.github/skills/deck-recipe-review/DECK-RECIPE-TEMPLATE.yml)

---

## 📄 TEMPLATE.md — The Source of Truth

[TEMPLATE.md](TEMPLATE.md) defines the canonical structure. Every tech talk README must include these sections:

1. **Title + Primary Question** — the ONE question the talk answers
2. **📊 Content Fitness** — quality rubric (Relevant / Compelling / Actionable)
3. **The Opportunity** — what this capability unlocks for practitioners
4. **How It Works** — the mechanism, architecture, and key capabilities
5. **🔑 Key Artifacts** — configs, files, commands, or workflows to know
6. **🧠 Mental Model Shift** — the core insight and concrete behavioral shift
7. **🎬 Major Sections** (3-6) — deep technical content with examples
8. **Use Cases** — real-world scenarios with measurable outcomes
9. **✅ What You Can Do Today** — immediate, short-term, and advanced actions
10. **Related Patterns** — adjacent talks and combination guidance
11. **📖 References** — numbered citations (`[^1]`, `[^2]`, etc.)

### Minimum README Contract for Slide Generation

The Slide Generator does **not** require a visible slide-mapping section. For new talks, it relies on:

- YAML frontmatter (`status`, `updated`, `section`, and `references` when available)
- The H1 title, guiding question, and duration/audience block
- Core narrative sections such as Opportunity, How It Works, Key Artifacts, Mental Model Shift, Use Cases, and References
- `<!-- 🎬 MAJOR SECTION: ... -->` comments before the deepest sections
- A strong `> **The Core Insight:** ...` line inside the mental model section

---

## 🗂️ Existing Tech Talks

| Directory | Topic |
|-----------|-------|
| `agentrc-maturity/` | AgentRC maturity model for AI-ready SDLC |
| `agent-teams/` | Multi-agent collaboration patterns |
| `agentic-journey/` | The evolution toward agentic development |
| `agentic-sdlc/` | AI across the software development lifecycle |
| `context-engineering-foundations/` | Foundational context engineering patterns |
| `copilot-chat/` | GitHub Copilot Chat fundamentals |
| `copilot-chat-internals/` | Under-the-hood: debug view, system prompts |
| `copilot-cli/` | Terminal-native AI with Copilot CLI |
| `copilot-hooks/` | Pre/post-processing hooks for Copilot |
| `copilot-acp/` | Agent Client Protocol for universal AI integration |
| `copilot-memory/` | Copilot memory and persistent context |
| `copilot-primitives/` | Core Copilot building blocks |
| `copilot-sdk/` | Programmatic Copilot integration |
| `copilot-web/` | Browser and mobile Copilot workflows |
| `enterprise-patterns/` | Enterprise-scale adoption patterns |
| `mcp-apps/` | Model Context Protocol applications |
| `multi-step-tasks/` | Complex multi-step agent tasks |
| `parallel-execution/` | Parallel agent execution strategies |
| `terminal-sandboxing/` | Sandboxed terminal execution |

For help choosing which talk to explore, see [DECISION-GUIDE.md](DECISION-GUIDE.md).
