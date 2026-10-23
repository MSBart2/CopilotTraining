# FanHub Workshop Plugin — Demo Walkthrough

**Time:** 5 minutes
**When:** Module 00 closing reveal — after the "frustration" moment, before diving into Module 01
**Goal:** Show participants what they're building, in one command, before they build it

---

## Prerequisites

```bash
# Install APM once (if not already installed)
npm install -g @github/apm
apm --version
```

---

## Step 1 — Clone FanHub Unplugged (bare repo, no AI config)

```bash
git clone https://github.com/your-org/fanhub-unplugged fanhub
cd fanhub
```

Open VS Code. Open Copilot Chat. Ask:

> **"What is this codebase? What tech stack does it use?"**

👉 Generic answer. Copilot has no project context — no instructions, no architecture doc, nothing.
This is the Module 00 frustration.

---

## Step 2 — Install the plugin

```bash
# Local install from this demo folder:
apm install /path/to/CopilotTraining/tech-talks/copilot-plugins/examples/fanhub-plugin

# Once published to the registry:
# apm install @fanhub/workshop
```

Watch what appears:

```
.github/
├── copilot-instructions.md        ← Module 01
├── prompts/                       ← Module 03
│   ├── check-data-accuracy.prompt.md
│   ├── good-idea.prompt.md
│   ├── plan-loreCardAndLorePage.prompt.md
│   ├── prompt-to-skill.prompt.md
│   ├── refresh-docs.prompt.md
│   └── risk-prioritizer.prompt.md
├── skills/                        ← Module 04
│   ├── check-data-accuracy/
│   ├── lore-accuracy-check/
│   └── new-card-skill/            (includes scripts/ + templates/)
└── agents/                        ← Module 06
    ├── scaffold-entity.agent.md
    └── plan.agent.md

docs/
├── architecture.md                ← Copilot reads this as codebase context
└── breaking-bad-universe.md       ← canon reference for lore skills

mcp-servers/
└── fanhub-api-server.js           ← Module 05

.vscode/
└── mcp.json                       ← wires fanhub-api + fanhub-db to Copilot
```

---

## Step 3 — Ask Copilot the same question

Reload VS Code (or wait a moment for workspace indexing). Ask again:

> **"What is this codebase? What tech stack does it use?"**

👉 Copilot now answers accurately:
- ASP.NET Core 10 Web API backend + Blazor Server frontend
- SQLite via Entity Framework Core 10
- FanHub Breaking Bad fan site with characters, episodes, quotes, lore
- References team conventions from `.github/copilot-instructions.md`

**Why:** `docs/architecture.md` is now in the workspace. Copilot reads it automatically.
The instructions file gives it layer-specific coding standards before you write a single line.

---

## Step 4 — Show the lockfile

```bash
cat apm-lock.yml
```

Exact versions pinned. Every developer who clones this repo and runs `apm install` gets
the same configuration — no "which prompts do you have?" conversations, no missing skills.
This is `package-lock.json` for your AI layer.

---

## Step 5 — The pivot

> *"We installed everything in one command. For the next five modules, we're going to
> build every single piece of this — so when you ship your own plugin for your own
> codebase, you understand exactly what you're distributing."*

Open `.github/copilot-instructions.md`. That's Module 01. Let's start there.

---

## Facilitator Notes

**MCP server caveat:**
`apm install` copies `mcp-servers/fanhub-api-server.js` and wires `.vscode/mcp.json`,
but the server needs the backend running first:
```bash
cd dotnet/Backend && dotnet run   # must be running
node mcp-servers/fanhub-api-server.js
```
Don't demo live MCP calls here — save that for Module 05.

**Local path for demo:**
Replace `/path/to/CopilotTraining/tech-talks/copilot-plugins/examples/fanhub-plugin` with the actual absolute path on your machine.
The `apm install <local-path>` experience is identical to a registry install — participants
see the same output.

**ARCHITECTURE.md timing:**
If Copilot doesn't immediately reflect the architecture context, close and reopen the
workspace. VS Code re-indexes on open.

**What NOT to explain here:**
Don't walk through what each file does. The power of this moment is the *quantity* —
6 prompts, 3 skills with templates, 2 agents, an MCP server, an architecture doc — all
as a coherent unit. The understanding comes from building them one at a time in the modules.
