# Demo: GitHub Copilot CLI + Azure MCP — Conversational Azure

**Source talk:** [GitHub Copilot + Azure Skills Plugin](../README.md)
**Core question:** How do I prototype and deploy Azure solutions conversationally — with AI that follows real Azure workflows, knows what's already running in my subscriptions, and executes changes through 200+ live Azure tools?
**Target repo:** [github.com/MSBart2/FanHub](https://github.com/MSBart2/FanHub) — imagining FanHub deployed to Azure (App Service + Cosmos DB)

---

## Prerequisites

- Copilot CLI installed and authenticated
- Azure CLI installed and authenticated: `az login`
- An Azure subscription with at least one resource group
- Azure MCP Server: follow [get-started guide](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started)

---

## Exercise 1: Configure Azure MCP and Connect Copilot

Azure MCP Server runs locally and gives Copilot CLI direct read/write access to your Azure environment through the MCP protocol. Configure it in Copilot's MCP settings:

```json
// ~/.copilot/mcp.json (or your repo-level .copilot/mcp.json)
{
  "servers": {
    "azure": {
      "command": "npx",
      "args": ["-y", "@azure/mcp@latest", "server", "start"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "<your-subscription-id>"
      }
    }
  }
}
```

Verify the connection:

```bash
copilot
```

```
What Azure resources are available in my subscription?
```

Copilot routes the query through Azure MCP and returns a live list of your resource groups and resources — not documentation, not your memory, the actual current state of your subscription.

**What to notice:** No portal tab-switching. No `az resource list` + copy-paste into a chat window. The AI has live context. Every answer it gives from here is grounded in what actually exists.

---

## Exercise 2: Query Live Resources to Understand a Deployment

Assume FanHub's Node.js backend is deployed as an Azure App Service with a Cosmos DB backing store. Ask Copilot about the running configuration without opening the portal:

```bash
copilot
```

```
Show me the App Service configuration for the FanHub app — app settings, connection strings, and the current Node.js version it's running.
```

```
What Cosmos DB accounts exist in my subscription, and what are their throughput settings and consistency levels?
```

```
Are there any App Service deployment slots configured for FanHub? What's the difference between the production and staging slot configs?
```

Copilot uses the Azure MCP tools to query your live resources and returns structured answers.

**What to notice:** These are questions that normally require 3-4 portal screens or 4-5 `az` CLI commands with JSON parsing. Here they're natural language. The value is speed — not that it's easier to type, but that you stay in context.

---

## Exercise 3: Use Plan Mode Before Infrastructure Changes

Plan Mode (Shift+Tab) is especially valuable for infrastructure work — before changing anything, Copilot asks what it needs to know to avoid breaking production.

```bash
copilot
```

Press **Shift+Tab** to enter Plan Mode, then:

```
I need to add a new environment variable to FanHub's App Service for a third-party API key. Walk me through the safest way to do this.
```

Copilot will ask before acting:
- *"Which fits better here: App Service application settings or Key Vault references?"*
- *"Do you want this change applied to production, staging slot, or both?"*
- *"Do you want me to check if this variable name conflicts with any existing settings?"*

Answer the questions. Copilot will then query your actual App Service config (via Azure MCP) and propose a specific `az webapp config appsettings set` command tailored to your real resource names and slot configuration.

**What to notice:** The AI isn't guessing at your resource names or slot configuration — it looked them up. Plan Mode plus live Azure context means proposals are specific, not generic.

---

## Exercise 4: Scaffold Infrastructure from a Running Resource

You want to spin up a staging environment that mirrors FanHub's production App Service configuration. Instead of recreating it from memory, ask Copilot to read production and generate the Bicep:

```bash
copilot
```

```
Read the production FanHub App Service configuration and generate a Bicep template I can use to deploy a staging environment with the same settings — but with a different app name and a smaller SKU.
```

Copilot queries the live resource via Azure MCP, extracts the relevant configuration properties, and generates a Bicep template with your customizations applied.

**What to notice:** "Scaffold from running state" is a different workflow than "write infrastructure from documentation." The generated template reflects what's actually deployed — not what the docs list as the defaults.

---

## Exercise 5: Cloud Delegation for Long-Running Audits

Some Azure operations are too broad to wait for interactively. Use the `&` prefix to delegate to the background cloud agent:

```bash
copilot
```

```
& Audit all storage accounts in my subscription for public blob access, missing encryption settings, or overly permissive CORS rules. Produce a summary report.
```

The `&` prefix hands the task off to GitHub's coding agent. Copilot confirms the delegation and your terminal is immediately free. The agent runs the Azure MCP queries in the background and returns a summary when complete.

**What to notice:** Long-running infrastructure analysis — the kind that touches 10+ resources across a subscription — is a poor fit for a blocking interactive session. Cloud delegation keeps the terminal available while the work continues asynchronously.

---

## Key Takeaways

| Pattern | What it enables |
|---------|----------------|
| MCP config in `~/.copilot/mcp.json` | Copilot gets live read/write access to Azure via MCP tools |
| Natural language resource queries | Ask about running state without portal or `az` commands |
| Plan Mode before infrastructure changes | AI asks clarifying questions, then uses live config to generate specific proposals |
| Scaffold from running state | Generate Bicep/ARM from actual resource properties, not documentation |
| `&` cloud delegation | Offload broad subscription audits to the background |

**The through-line:** Infrastructure becomes conversational when the AI has live context. The pattern is "query what exists, generate from what you find, validate before you apply."

## References

- [Get started with Azure MCP Server](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started)
- [Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)
- [Best practices for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
