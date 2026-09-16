# topics / agent-mode

**Topic:** Agent Mode / Agentic Workflows

---

## Canonical description

Agent Mode is GitHub Copilot's capability to autonomously plan and execute multi-step tasks — reading files, running terminal commands, calling MCP tools, and iterating toward a goal with minimal per-step human approval. In VS Code, it is invoked via the chat panel's agent toggle. The broader agentic ecosystem includes: multi-agent coordination (agent teams), protocol-level composition (ACP), lifecycle integration (agentic SDLC), and organizational adoption patterns (enterprise patterns). "Agent mode" the feature vs "agentic" as an architectural pattern are distinct — agent mode is one entry point into a larger agentic capability set.

---

## Coverage map

| Artifact | Depth | Notes |
|---|---|---|
| `slides/tech-talks/agentic-lifecycle.md` | Primary | Workflow selection, compilation, safe outputs, and evidence-gated issue-to-PR handoffs |
| `slides/tech-talks/agentic-sdlc.md` | Primary | Agent mode integrated across the full SDLC: intake, implementation, review, release |
| `slides/tech-talks/multi-agent-coordination.md` | Primary | Deciding when to split work, isolating workstreams, steering sessions, and integrating results |
| `slides/tech-talks/copilot-acp.md` | Primary | ACP (Agent Communication Protocol) — how agents communicate and compose |
| `slides/tech-talks/enterprise-patterns.md` | Major section | Agent governance, approval gates, org-scale adoption of agent mode |
| `slides/tech-talks/vscode-latest.md` | Secondary | Agent mode UI improvements per VS Code release; new tool integrations |
| `slides/tech-talks/context-engineering.md` | Secondary | Agents, skills, prompts, and instructions as context-placement choices |
| `slides/tech-talks/copilot-sdk.md` | Secondary | SDK APIs for building, invoking, and composing agents programmatically |
| `slides/tech-talks/copilot-hooks.md` | Secondary | Hooks fire on agent lifecycle events; used for guardrails and audit |
| `workshop/02-agent-plan-mode/` | Primary | Hands-on workshop: using agent plan mode for task planning |
| `workshop/06-custom-agents/` | Primary | Hands-on workshop: building custom agents with instructions and tools |

---

## Framing notes

- **`agentic-lifecycle`** owns recurring repository workflow selection and the evidence-gated handoff model
- **`agentic-sdlc`** is the highest-level view: agent mode as a transformation of *how teams work*, not just how individuals code
- **`multi-agent-coordination`** owns specialist composition and parallel session operation; it pairs with `agentic-lifecycle` when a phase needs isolated workstreams
- **`copilot-acp`** is the most protocol-focused; it assumes agent mode familiarity and goes deep on the communication layer

## Drift risks

- VS Code agent mode UI changes frequently (`vscode-latest` captures these) — reverify operating-surface mechanics in `multi-agent-coordination` when the UI changes
- The "approval gates" and "YOLO mode" (auto-approval) framing in `enterprise-patterns` and `agentic-sdlc` is sensitive to policy changes — verify against current VS Code docs before delivery
- `copilot-acp` is tightly coupled to the ACP spec version; if the protocol evolves, the tool-call and message format slides need updating
