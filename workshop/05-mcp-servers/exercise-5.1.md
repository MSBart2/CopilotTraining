# Exercise 5.1: Connect to FanHub Character Data

## 🔨 Exercise

### Exercise 5.1: Connect to FanHub Character Data — "Bring Live Character Context into Chat"

**Lead:** Marcus ⭐ | **Support:** Elena 🤝, David 🤝 | **Time:** 15 min

#### 📖 The Challenge

The team has been working on character-detail improvements across the workshop, but every database question still forces a context switch. Marcus has to open a database client to confirm what lives in the `characters` table. Elena needs to know what real optional data exists before deciding what tests need to change. David wants to verify that the character-detail experience matches the actual data model, not an outdated diagram.

Right now, live FanHub data still sits outside Copilot's reach. That means:

- schema lookups happen in another tool
- sample data has to be inspected manually
- questions about real null/empty values interrupt flow
- feature work starts with lookup time instead of delivery time

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Marcus needs to understand how character detail data is stored. He opens a database tool, checks table names, inspects columns, and copies notes back into VS Code. Takes 5 minutes before he can even ask the next question. | Marcus asks Copilot: `Show me the schema and sample rows for character-related tables.` Copilot queries FanHub data through MCP and returns the live answer directly in chat. Takes 30 seconds and keeps him in flow. |
| **Lookup time:** 2-5 min/query<br>**Context switches:** 2-3 per question<br>**Schema confidence:** depends on manual inspection | **Lookup time:** ~30 sec/query<br>**Context switches:** 0<br>**Schema confidence:** live data and schema in chat |

#### 🎯 Your Goal

Configure an MCP server that gives Copilot direct access to FanHub's character-related data so the team can inspect schema and sample records without leaving VS Code.

#### 📋 Steps

1. **Create MCP configuration**

   In the workspace root, create `.vscode/mcp.json`:

   ```json
      {
      "servers": {
         "fanhub-db": {
            "command": "npx",
            "args": [
            "-y",
            "mcp-sqlite",
            "${workspaceFolder}/dotnet/Backend/fanhub.db"
            ]
         }
      }
      }
   ```

2. **Point the server at your FanHub database**

   When VS Code prompts for `db_path`, provide the path to the FanHub development database.

3. **Start the MCP server**

   Open Copilot Chat in Agent mode and start the `fanhub-db` server from the MCP server list.

4. **Query live character data**

   Try prompts like:

   ```
   @workspace #mcp-fanhub-db Show me the schema for character-related tables.
   ```

   ```
   @workspace #mcp-fanhub-db Show me sample character rows and highlight optional fields or empty values.
   ```

   ```
   @workspace #mcp-fanhub-db Which columns look most relevant to the character detail experience?
   ```

5. **Capture what the team learned**

   Note which tables, columns, and real data patterns matter for the character-detail work in Modules 4 and 5.

#### ✅ Success Criteria

- [ ] `.vscode/mcp.json` includes a working `fanhub-db` MCP server
- [ ] Copilot can query FanHub schema and sample character data directly in chat
- [ ] The team can identify character-detail fields without leaving VS Code
- [ ] Live data is now easier to reference during feature, test, and readiness work

#### 📚 Official Docs

- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [SQLite MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite)
- [Agent Mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers#_use-mcp-tools-in-chat)

---

## 🔗 What You Built

**In this exercise:**
- `.vscode/mcp.json` — MCP configuration connecting Copilot to FanHub data
- **Live character-data access** — schema and records available in chat

**How it compounds:**

| Previous Modules | This Module | Combined Power |
|------------------|-------------|----------------|
| Module 4: Character test-review skill | MCP database access | Skills define the workflow; MCP gives the workflow real data |
| Module 2: Character-detail feature planning | Live FanHub schema/data | Planned character work can now be grounded in actual records |

---

## ➡️ Next Up

**[Exercise 5.2: Upgrade Character Test Workflow with MCP](exercise-5.2.md)** — Now that Copilot can see real character data, upgrade the Module 4.2 skill so it can investigate duplicate character records and recommend the right follow-up work.

> *"Module 4 gave us the workflow. Module 5 makes that same workflow smarter with live data."*
> — Marcus, handing off to Elena

---
