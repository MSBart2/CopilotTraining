# FanHub Workshop Plugin

A complete GitHub Copilot configuration package for the FanHub Breaking Bad fan-site workshop.
Install with a single `apm install` command to get every instruction file, prompt, skill,
agent, and MCP server that participants build across modules 01–06.

## What's included

| Module | Type | Files |
|--------|------|-------|
| 01 | Instructions | `.github/copilot-instructions.md`, `docs/architecture.md`, `docs/breaking-bad-universe.md` |
| 03 | Prompts | 6 prompt files (check-data-accuracy, good-idea, plan-loreCardAndLorePage, prompt-to-skill, refresh-docs, risk-prioritizer) |
| 04 | Skills | 3 skills (check-data-accuracy, lore-accuracy-check, new-card-skill) |
| 05 | MCP | `mcp-servers/fanhub-api-server.js` + `.vscode/mcp.json` |
| 06 | Agents | 2 agents (scaffold-entity, plan) |

## Quick install

```bash
# From inside a cloned fanhub-unplugged repo
apm install ./path/to/fanhub-plugin

# Or once published:
apm install @fanhub/workshop
```

## What happens on install

```
fanhub/
├── .github/
│   ├── copilot-instructions.md      ← module 01
│   ├── prompts/                     ← module 03
│   │   ├── check-data-accuracy.prompt.md
│   │   ├── good-idea.prompt.md
│   │   ├── plan-loreCardAndLorePage.prompt.md
│   │   ├── prompt-to-skill.prompt.md
│   │   ├── refresh-docs.prompt.md
│   │   └── risk-prioritizer.prompt.md
│   ├── skills/                      ← module 04
│   │   ├── check-data-accuracy/SKILL.md
│   │   ├── lore-accuracy-check/SKILL.md
│   │   └── new-card-skill/SKILL.md + scripts/ + templates/
│   └── agents/                      ← module 06
│       ├── scaffold-entity.agent.md
│       └── plan.agent.md
├── docs/
│   ├── architecture.md              ← loaded by Copilot as codebase context
│   └── breaking-bad-universe.md     ← canon reference for lore skills
├── mcp-servers/
│   └── fanhub-api-server.js         ← module 05
└── .vscode/
    └── mcp.json                     ← wires up fanhub-api + fanhub-db MCP servers
```

## After install

Start the MCP server (required for module 05 exercises):
```bash
dotnet run --project dotnet/Backend   # must be running first
node mcp-servers/fanhub-api-server.js
```

The `.vscode/mcp.json` also wires up `mcp-sqlite` pointing at `dotnet/Backend/fanhub.db`
for direct database querying via Copilot.
