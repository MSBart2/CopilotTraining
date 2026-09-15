---
name: workbench
description: Read from and write to the Workbench project memory store. Use when starting complex content work (query for prior context) or finishing a session that changed content (record drawer entries). Never invoke during agent pre-flight gates.
infer: false
---

# Workbench Skill

The Workbench is the project-level semantic memory store for CopilotTraining authoring decisions, patterns, and cross-reference knowledge. It is **separate from Copilot Memory** (which is personal/cross-project). The Workbench = _this repo's_ institutional knowledge.

**Cardinal rule: the Workbench suggests; repo files confirm.**

The store is organized as **benches** (top-level domain folders under `memories/`) containing **drawers** (typed `.md` files inside each bench). Filenames drop the prefixes — a fact drawer in the slides bench is `memories/slides/facts.md`.

---

## When to Use This Skill

### READ — Query the Workbench BEFORE generating content

Invoke after pre-flight gates complete, before starting content generation:

| Trigger                                         | Query to run                                                |
| ----------------------------------------------- | ----------------------------------------------------------- |
| Generating slides for a talk                    | `"What patterns or gotchas exist for [topic]?"`             |
| Writing a new tech-talk                         | `"What voice/framing decisions exist for this section?"`    |
| Creating workshop exercises                     | `"What persona voice and arc decisions apply to [module]?"` |
| Placing a card in index-custom.html             | `"Which section does [topic] belong in?"`                   |
| Updating content that overlaps another artifact | Check cross-reference table: `"What else covers [topic]?"`  |
| Editing any content that touches a cross-cutting topic (MCP, agent mode, CLI, instructions, memory) | Read `topics/<topic>.md` — check coverage map for drift risk before editing |

**Never query the Workbench during pre-flight.** Pre-flight gates (README exists → not archived → TEMPLATE.md → SECTIONS.md) must complete first using live repo files. The Workbench comes after.

### WRITE — Update the Workbench at session END

After completing content work, record drawer entries for anything future sessions should know:

| What changed                            | Drawer to write      | Example                                                           |
| --------------------------------------- | -------------------- | ----------------------------------------------------------------- |
| Discovered a recurring build gotcha     | `facts`       | `"BOM at file start breaks Slidev frontmatter"`                   |
| Archived a talk                         | `events`      | `"multi-step-tasks archived 2026-04-07: merged into agent-teams"` |
| Found a pattern that consistently works | `discoveries` | `"cockpit wrapper div eliminates 90% of HTML balance errors"`     |
| Made a framing/voice decision           | `preferences` | `"agentic-sdlc opener: lead with the 10-15 features/day stat"`    |
| Identified a cross-reference drift      | `facts`       | Cross-reference table entry update                                |

**Never write during a session mid-stream.** Drawer writes happen at session END only — after the work is saved and verified.

**Write mechanism: always edit the drawer `.md` files directly** (e.g. `memories/slides/facts.md`). Never use the `memory` tool with `/memories/` paths — that routes to Copilot's personal memory service, not the workspace files, and the entries will be invisible in the repo.

---

## What NEVER to Write

- Archived talk content (rationale only, as `events`)
- Slide deck CSS or Slidev layout details (too volatile, too noisy)
- Secrets, tokens, credentials
- Speculation — only write confirmed facts and decisions
- Anything that duplicates what's in the repo file itself ("copilot-memory is about memory" is useless; "copilot-memory uses a 3-layer model, not 4" is useful)

---

## Bench Reference

Queries and writes should target the appropriate bench:

| Bench                   | What lives here                                                       |
| ----------------------- | --------------------------------------------------------------------- |
| `topics`                | Cross-cutting feature index — topics that appear in 3+ artifacts (MCP, agent mode, CLI, instructions, memory) |
| `copilot_tools`         | Chat, CLI, Azure MCP, Code Review, Web, VS Code talks                 |
| `customization_context` | Primitives, Hooks, Memory, SDK, MCP Apps talks                        |
| `agent_architecture`    | Agent Teams, ACP talks                                                |
| `agentic_sdlc`          | Workflows, Journey, SDLC, Enterprise Patterns talks                   |
| `workshop`              | All workshop modules + persona decisions + module milestones          |
| `slides`                | Slidev patterns, Vue component schemas, build gotchas, prop linter rules |
| `exec-talks`            | exec-spine structure, TOC indexing, exec-talk voice rules, deck milestones |
| `tech-talks`            | Tech-talk pipeline, component catalog exclusions, content milestones  |
| `rmathis`               | Editorial voice, framing philosophy, author taste decisions           |

---

## Drawer Reference

| Drawer        | Use for                                                                                 |
| ------------- | --------------------------------------------------------------------------------------- |
| `facts`       | Locked, confirmed decisions — build rules, encoding gotchas, transport protocol choices |
| `events`      | Milestones, archival decisions, major restructures with dates                           |
| `discoveries` | Breakthroughs — patterns that solved persistent problems                                |
| `preferences` | Author taste — framing choices, voice decisions, style calls                            |
| `advice`      | Patterns that consistently work — opener structures, slide counts, card descriptions    |

---

## Content Change → Workbench Update Protocol

When you update a content artifact, ask:

1. **Does this change a confirmed fact?** → Update or add `facts` entry
2. **Does this retire or archive something?** → Write `events` with date and rationale
3. **Does this affect a cross-reference?** → Update the cross-reference table in `memories/slides/facts.md`
4. **Did you discover something new that would save time next session?** → Write `discoveries` or `advice`
5. **Topic-specific gate — did this session change anything about *this deck's content* that an agent reading only the deck would miss?** (framing decisions, audience misreads, ordering constraints, why a section was rejected) → Write to the matching topic bench (e.g. `agent_architecture/discoveries.md`). If the answer is just "we used component X" or "we fixed a Slidev gotcha," that belongs in `slides`, not the topic bench.

If none of the above apply, no write is needed. **Empty topic benches are acceptable** — do not pre-create folders or invent thin entries to fill them.

---

## Cross-Reference Table

Maintained in `memories/slides/facts.md`. Topics covered in multiple artifacts — check for drift when updating either.

For cross-cutting topics (MCP, agent mode, CLI, custom instructions, memory), use the **`topics/` bench** instead — each has a dedicated drawer with full coverage maps and drift risk notes. The `memories/slides/facts.md` table covers artifact-pair relationships not captured by a topic drawer:

- **MCP transport:** `05-mcp-servers`, `mcp-apps` → see `topics/mcp.md`
- **Instructions files:** `01-instructions`, `copilot-primitives` → see `topics/custom-instructions.md`
- **Agent sessions:** `vscode-latest`, `06-custom-agents` → see `topics/agent-mode.md`
- **Memory layers:** `copilot-memory`, `05-mcp-servers` → see `topics/copilot-memory.md`

---

## Example Workflow (Slide Generator)

```
1. Pre-flight completes:
   README exists ✓ → not archived ✓ → TEMPLATE.md ✓ → SECTIONS.md ✓ → deck.recipe.yml ✓

2. QUERY the Workbench (now):
   "What patterns or gotchas exist for [talk-slug]?"
   → Returns: "cockpit wrapper eliminates HTML balance errors" (discoveries)
   → Returns: "Thank-you slide pattern: blur-2xl double-logo, gradient h1" (advice)
   Apply these to generation.

3. Generate slides.

4. Session END — WRITE drawer entry:
   "Discovered: agentic-sdlc opener stat (10-15 features/day) works best as hero number on slide 2"
   → agentic_sdlc / discoveries
```

---

## The Workbench Is NOT

- ❌ A replacement for reading repo files — always confirm against source
- ❌ A wake-up injection context (don't front-load sessions with workbench dumps)
- ❌ Copilot Memory (that's personal/cross-project preferences)
- ❌ A content archive (use git history for that)
