# topics / copilot-memory

**Topic:** Copilot Memory

---

## Canonical description

Copilot Memory is a persistent context layer that stores facts, preferences, and project state across chat sessions. Delivered via an MCP memory server (`@memory` tool in chat). Memory entries are created by the user (explicit) or by Copilot after significant exchanges (implicit, with confirmation). Memory is surfaced in subsequent sessions as injected context — effectively a dynamic instruction source. In multi-agent and team contexts, "squad memory" describes shared memory accessible to all agents working on a project. Copilot Memory is distinct from the Copilot Chat context window (session-scoped) and from the VS Code workspace state (file-scoped).

---

## Coverage map

| Artifact | Depth | Notes |
|---|---|---|
| `slides/tech-talks/context-engineering.md` | Primary | Canonical owner for memory placement, scope, lifecycle, delivery evidence, and authority boundaries |
| `slides/tech-talks/agent-teams.md` | Secondary | Squad memory as shared context for coordinated agent teams |
| `slides/tech-talks/mcp-apps.md` | Mention | Storing dashboard preferences for future queries as a memory use case |
| `slides/tech-talks/copilot-acp.md` | Mention | Memory as a cross-agent context-sharing mechanism in ACP workflows |
| `slides/tech-talks/copilot-sdk.md` | Mention | SDK APIs for reading and writing memory programmatically |
| `workshop/05-mcp-servers/` | Secondary | Memory MCP server setup and configuration covered as a practical example |

---

## Framing notes

- **`context-engineering`** is the canonical talk for deciding where durable memory belongs and how its delivery is verified
- **`agent-teams`** uses memory specifically in the "squad memory" framing — shared state that persists across agent handoffs; this is a *coordination* use case, not a *personalization* use case
- The memory MCP server (`@memory`) is distinct from the general MCP infrastructure — it's worth clarifying in `copilot-memory` that this is one specific MCP server, not a core MCP feature
- Memory and custom instructions overlap in effect but differ in ownership and lifecycle; `context-engineering` owns that placement decision and its inspection evidence
- "Copilot Memory" the feature name vs generic "memory" (as in agent squad memory) creates terminology collision — `copilot-memory` the talk uses "Memory" (capitalized) for the product feature; watch for lowercase "memory" being misread as the product

## Drift risks

- The memory MCP server's tool name and API have changed between preview releases; verify current docs before changing the mechanism taught in `context-engineering`
- `agent-teams` squad memory section assumes memory persistence works a certain way — if the underlying mechanism changes (e.g., from MCP to a native VS Code API), the framing in `agent-teams` may become misleading
