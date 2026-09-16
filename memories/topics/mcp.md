# topics / mcp

**Topic:** Model Context Protocol (MCP)

---

## Canonical description

MCP is an open protocol for connecting AI models to external data sources and tools via a standardized client-server architecture. In the VS Code / GitHub Copilot context: Copilot acts as an MCP client; MCP servers expose tools that Copilot can call during chat and agent sessions. Transport options are stdio (local process) and SSE/HTTP (remote). VS Code discovers servers via `.vscode/mcp.json`. The VS Code extension of MCP — **MCP Apps** — allows server tools to return rich interactive UI components (charts, tables, forms, trees) that render inline in chat rather than returning plain text.

---

## Coverage map

| Artifact | Depth | Notes |
|---|---|---|
| `slides/tech-talks/copilot-azure-mcp.md` | Primary | Azure MCP server — `@azure` tool, stdio transport, authentication |
| `slides/tech-talks/mcp-apps.md` | Primary | MCP Apps rich UI — charts, tables, forms, trees, custom components |
| `slides/tech-talks/copilot-acp.md` | Secondary | ACP builds on MCP primitives; MCP tool calls are how ACP agents act |
| `slides/tech-talks/copilot-sdk.md` | Secondary | SDK includes MCP server/client APIs; Part 2 covers integration |
| `slides/tech-talks/vscode-latest.md` | Secondary | MCP server configuration UI, discovery improvements in recent releases |
| `slides/tech-talks/multi-agent-coordination.md` | Mention | MCP servers can provide bounded tool access to specialist workstreams |
| `slides/tech-talks/context-engineering.md` | Mention | Memory placement and delivery are context-engineering decisions |
| `workshop/05-mcp-servers/` | Primary | Hands-on workshop: build and configure MCP servers |

---

## Framing notes

- **`copilot-azure-mcp`** leads with the practical UX (connect Azure once, query in natural language) — MCP is the mechanism, not the hero
- **`mcp-apps`** flips this: MCP is the vehicle, but rich UI components are the hero; the talk is explicitly about what you get *back*, not the protocol itself
- These two talks are often paired in delivery — azure-mcp shows data retrieval, mcp-apps shows what you do with the result
- The VS Code configuration entry point (`.vscode/mcp.json`) is covered in depth in `copilot-azure-mcp`; `mcp-apps` assumes it and moves straight to implementation
- Workshop `05-mcp-servers` covers both ends: building a server AND configuring it in VS Code — it complements both talks

## Drift risks

- If the `.vscode/mcp.json` schema changes, `copilot-azure-mcp`, `mcp-apps`, and `05-mcp-servers` all need updating
- If the MCP Apps component API changes (chart types, form field types), `mcp-apps` Part 1 slides are the primary maintenance target
- `vscode-latest` gets updated per VS Code release — check for MCP server management UI changes that may make `copilot-azure-mcp`'s setup walkthrough stale
