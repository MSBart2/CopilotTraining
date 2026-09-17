# topics / copilot-memory

**Topic:** Copilot Memory

---

## Canonical description

Copilot Memory is a persistent context layer that stores facts, preferences, and project state across chat sessions. Delivered via an MCP memory server (`@memory` tool in chat). Memory entries are created by the user (explicit) or by Copilot after significant exchanges (implicit, with confirmation). Memory is surfaced in subsequent sessions as injected context — effectively a dynamic instruction source. In multi-agent and team contexts, "squad memory" describes shared memory accessible to all agents working on a project. Copilot Memory is distinct from the Copilot Chat context window (session-scoped) and from the VS Code workspace state (file-scoped).

---

## Coverage map

| Artifact | Depth | Notes |
|---|---|---|
| `slides/tech-talks/copilot-primitives.md` | Boundary / route owner | Distinguishes personal memory and one-request context from durable repository configuration using owner, lifetime, selector, and evidence checks |
| `slides/tech-talks/multi-agent-coordination.md` | Secondary | Shared context contracts across isolated coordinated workstreams |
| `slides/tech-talks/mcp-apps.md` | Mention | Storing dashboard preferences for future queries as a memory use case |
| `slides/tech-talks/copilot-acp.md` | Mention | Memory as a cross-agent context-sharing mechanism in ACP workflows |
| `slides/tech-talks/copilot-sdk.md` | Mention | SDK APIs for reading and writing memory programmatically |
| `workshop/05-mcp-servers/` | Secondary | Memory MCP server setup and configuration covered as a practical example |
| `slides/tech-talks/context-engineering.md` | Archived | Historical memory-placement model; redirects to `copilot-primitives` |

---

## Framing notes

- **`copilot-primitives`** owns the practical boundary decision between durable repository configuration, personal memory, and request-local context
- **`multi-agent-coordination`** treats shared state as an explicit workstream contract rather than implicit team memory
- The memory MCP server (`@memory`) is distinct from the general MCP infrastructure — it's worth clarifying in `copilot-memory` that this is one specific MCP server, not a core MCP feature
- Memory and custom instructions overlap in effect but differ in ownership and lifecycle; `copilot-primitives` owns that placement decision and its inspection evidence
- "Copilot Memory" the feature name vs generic "memory" (as in agent squad memory) creates terminology collision — `copilot-memory` the talk uses "Memory" (capitalized) for the product feature; watch for lowercase "memory" being misread as the product

## Drift risks

- The memory MCP server's tool name and API have changed between preview releases; verify current docs before changing memory-boundary guidance in `copilot-primitives`
- Reverify the shared-context mechanism in `multi-agent-coordination` if memory persistence or agent handoff behavior changes
