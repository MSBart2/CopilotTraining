---
status: active
updated: 2026-09-16
section: "Extend and Embed"
audience: [platform-engineer, architect, security]
level: applied
duration: 45
format: case-study
decision: "How should agents act on live domain state with least-privilege authority?"
prerequisites: [copilot-cli]
related: [mcp-apps, copilot-with-foundry]
references:
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices
    label: "Best practices for GitHub Copilot CLI"
    verified: 2026-03-17
  - url: https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started
    label: "Get started with the Azure MCP Server"
    verified: 2026-03-17
  - url: https://github.com/Azure/azure-mcp
    label: "Azure MCP Server GitHub Repository"
    verified: 2026-03-17
  - url: https://devblogs.microsoft.com/all-things-azure/announcing-the-azure-skills-plugin/
    label: "Announcing the Azure Skills Plugin"
    verified: 2026-04-27
  - url: https://github.com/microsoft/azure-skills
    label: "Azure Skills GitHub Repository"
    verified: 2026-04-27
---

# GitHub Copilot + Azure Skills Plugin: Conversational Azure Prototyping and Deployment

> **The Question This Talk Answers:**
> *"How do I prototype and deploy Azure solutions conversationally — with AI that follows real Azure workflows, knows what's already running in my subscriptions, and executes changes through 200+ live Azure tools?"*

**Duration:** 45 minutes | **Target Audience:** Azure Developers / DevOps Engineers / Cloud Architects

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Azure developers spend significant time context-switching between terminal, portal, and docs to understand current state before making changes — this pattern eliminates that friction |
| **Compelling** | 🟢 High | Prototype loop compression: from "45 min of portal clicks + guesswork" to "8 min conversational deployment with live context" — infrastructure becomes conversational |
| **Actionable** | 🟢 High | Setup takes 10 minutes; immediately usable for querying live Azure state, scaffolding configs from existing resources, and deploying with AI-validated parameters |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Deploy Azure solutions end-to-end without portal clicks**
  Describe what you want — "deploy a Python API to Azure" — and the Azure Skills Plugin activates the right workflow: prepare, validate, deploy. AI follows real Azure best practices, not generic guidance

- **Query live Azure state conversationally**
  Ask "What storage accounts exist in my subscription?" or "Show me Cosmos DB databases with their throughput settings" directly in terminal chat — no portal tab-switching

- **Scaffold infrastructure from existing resources**
  Generate ARM templates, Bicep files, or Terraform configs by describing what you see running: "Create a similar App Service config for the staging environment"

- **Validate configurations before deployment**
  AI checks your proposed changes against actual running state: "Will this app config change break the production deployment?" gets answered with live resource analysis

- **Prototype with real context, not assumptions**
  Plan Mode combined with Azure MCP means AI knows what resources exist, their current configs, and valid parameter ranges — guesswork drops to near-zero

### The Emerging Practice

The traditional Azure prototyping workflow involves substantial context gathering: open the portal, navigate resource groups, check configurations, copy values into a text editor, search documentation for valid parameters, write infrastructure code, deploy, troubleshoot errors, repeat. Each cycle averages 20-45 minutes and requires switching between 4-6 different tools[^1].

Azure MCP Server changes this fundamentally by giving GitHub Copilot CLI direct awareness of your Azure environment through the Model Context Protocol. Instead of describing what you *think* exists, the AI queries what *actually* exists. When asked to scaffold a new resource, it can examine similar running resources, extract their configurations, and propose variants validated against current subscription state[^2].

Early adopters report prototype-to-deployment cycles compressing from hours to minutes. A DevOps engineer scaffolding a new microservice environment can now ask "What does the production App Service configuration look like?" and receive structured output with networking rules, app settings, and scaling parameters — all sourced from live resources. This becomes the foundation for a staging environment config, generated and validated conversationally, deployed in a single cycle[^3].

The pattern is **infrastructure-as-conversation**: complex Azure operations become natural language interactions with full environmental awareness, maintained across an entire terminal session.

---

## How It Works: Copilot CLI + Azure MCP

### What It Does

GitHub Copilot CLI provides terminal-native AI assistance. The **Azure Skills Plugin** layers curated Azure expertise on top — 21 skills encoding real workflows, decision trees, and guardrails that teach agents how Azure work actually gets done. Below the skills, the **Azure MCP Server** acts as the execution layer with 200+ tools across 40+ Azure services, giving the AI direct read/write access to your environment. Together, these three components enable conversational workflows where AI reasons through Azure scenarios with real knowledge, queries your actual environment, generates infrastructure code from live state, and validates configurations against running resources — all without leaving the terminal[^4].

### Key Capabilities

- **Azure Skills (Brain Layer)**: 21 curated skills — `azure-prepare`, `azure-validate`, `azure-deploy`, `azure-diagnostics`, `azure-cost-optimization`, `azure-observability`, `azure-rbac`, `azure-ai`, and more — encode real Azure workflows and decision logic that agents invoke by intent[^13]
- **Live Resource Discovery**: Query Cosmos DB accounts, Storage containers, Log Analytics workspaces, App Configuration stores, and Resource Groups through natural language
- **Configuration Extraction**: Read live resource properties, settings, and metadata to inform infrastructure-as-code generation
- **Log Analysis with KQL**: Execute Kusto queries against Azure Monitor directly from chat conversations
- **DevOps Integration**: Access work items, pull requests, builds, and pipelines through conversational commands
- **Azure CLI Delegation**: Execute `az` and `azd` commands through AI with JSON output formatting and validation
- **Foundry MCP Integration**: Deploy and manage Azure AI models, endpoints, and agent workflows through Foundry MCP Server
- **RBAC-Scoped Access**: MCP server operates within authenticated user's permissions — no elevation, respects subscription boundaries

### Architecture Overview

The **Azure Skills Plugin** introduces a three-layer stack that separates knowing from doing:

| Layer | Component | Role |
|-------|-----------|------|
| Brain | **Azure Skills** (21 curated skills) | Encodes Azure workflows, decision trees, and guardrails as Markdown instructions agents can invoke by intent |
| Hands | **Azure MCP Server** (200+ tools, 40+ services) | Executes live Azure SDK calls — resource discovery, configuration reads, log queries, deployments |
| AI Specialist | **Foundry MCP Server** | Model deployment, endpoint management, agent orchestration for Azure AI Foundry scenarios |

When Copilot CLI receives a prompt like "deploy a Python API to Azure," the Skills layer activates `azure-prepare` and `azure-validate` to reason through the right sequence of steps. The MCP layer then executes those steps using structured tool calls against live Azure APIs — no raw `az` commands, no guesswork[^5].

For direct resource queries ("List all Cosmos databases"), the flow bypasses the skills layer and hits the MCP Server directly, translating natural language to Azure SDK calls, executing with your RBAC permissions, and returning structured results to the AI.

Copilot CLI maintains conversational context across the session — previous queries, discovered resources, and configuration patterns stay in memory. Plan Mode (activated with Shift+Tab) enables collaborative planning: the AI asks clarifying questions about intended changes *before* generating infrastructure code, using live resource queries to validate assumptions[^6].

Cloud delegation (prefixing prompts with `&`) offloads long-running analysis tasks — like "audit all storage accounts for public access" or "generate Bicep modules for every resource in this resource group" — to background execution while the terminal remains free[^7].

**Official Documentation:**
- 📖 [Get started with Azure MCP Server](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started) — Installation, authentication, and first queries
- 📖 [Azure MCP Server Documentation](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/) — Service coverage, API reference, configuration options
- 📖 [Best practices for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices) — Permissions, custom instructions, MCP integration

---

## 📽️ Visual Assets

*This talk does not include extracted diagrams from source documentation. Visual content will be generated during slide creation using styled HTML components for architecture diagrams and workflow illustrations.*

**Potential visual assets to generate:**
- Copilot CLI + Azure MCP architecture diagram showing authentication flow
- Prototype loop comparison: traditional vs MCP-aware workflow
- RBAC scoping visualization for trust boundaries
- MCP tool discovery and invocation sequence

---

## 📦 Key Artifacts

**Primary Artifacts** — *Shown inline in major sections with detailed explanation*

- **`interactive-azure-query-session.md`** — Terminal conversation demonstrating live resource discovery and configuration extraction
- **`plan-mode-deployment-workflow.md`** — Using Plan Mode to scaffold and validate an App Service deployment with live context
- **`azure-mcp-config.json`** — MCP server configuration with service selection and authentication
- **`rbac-scoped-setup.md`** — Configuring read-only access and subscription boundaries for safe exploration

### Supporting Files

*Available in documentation references*

- **[Installing Azure MCP Server](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started)** — Step-by-step setup for VS Code, npm, pip, and Docker
- **[MCP server integration with Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server)** — Connecting external MCP servers to Copilot CLI
- **[Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)** — Source code, examples, and community contributions

---

## 🎯 Mental Model Shift

> **The Core Insight:** Azure infrastructure work becomes conversational end-to-end — the Azure Skills Plugin provides the workflow knowledge (what to do and when), Azure MCP provides the execution reach (200+ live tools across 40+ services), and together they turn natural-language intent into validated, deployed Azure resources

### Move Toward (Embrace These Patterns)

- ✅ **Query Before You Guess**: Start infrastructure work by asking what exists: "Show me all App Services in this resource group" → AI returns live configs you can use as templates, eliminating assumption-based errors
- ✅ **Plan With Live Context**: Use Plan Mode to validate ideas against actual subscription state before writing any code → "Will adding this setting break compatibility with the existing database?" gets answered with real resource inspection
- ✅ **Scaffold From Reality**: Generate new resource configs by describing variations of existing ones → "Create a similar storage account but with geo-redundancy" produces validated configs from live templates, not generic examples
- ✅ **Validate in Conversation**: Before deploying, ask "Is this Bicep file compatible with our current networking setup?" → AI queries VNets, subnets, and security groups to verify, catching errors pre-deployment

### Move Away From (Retire These Habits)

- 🔄 **Portal-First Discovery → Terminal-First Conversation**: Opening Azure Portal to check what exists, manually copying values, and switching back to terminal is the old path. Start with conversational queries in Copilot CLI — the AI retrieves current state faster and keeps it in session context for follow-up questions
- 🔄 **Documentation Example Copy-Paste → Live Resource Templating**: Copying ARM/Bicep examples from docs and manually adjusting parameters works, but produces generic configs. Ask AI to extract configs from your actual running resources — you get production-validated starting points with correct networking, SKUs, and conventions already applied
- 🔄 **Deploy-Then-Debug → Validate-Then-Deploy**: Deploying infrastructure to discover configuration mismatches (wrong region, incompatible SKU, missing dependency) is expensive. Use Plan Mode with Azure MCP to validate *before* deployment — AI checks proposed configs against live resources and subscription limits

### Move Against (Active Resistance)

- 🛑 **Unrestricted MCP Access on Production Subscriptions**: Giving Azure MCP full read/write access to production environments without RBAC scoping is dangerous → Start with read-only mode or dedicated dev subscriptions; production access requires explicit role boundaries and approval workflows
- 🛑 **Trusting Generated Configs Without Review**: AI-generated infrastructure code validated against live resources is far more accurate than generic examples, but it's not infallible → Always review Bicep/ARM/Terraform output before deployment, especially for production changes; treat AI as a skilled junior engineer, not an authority

> **What This Looks Like:** A developer needs to add a staging environment for a new microservice. They open Copilot CLI, ask "What does the production App Service look like?", receive full config including networking and app settings, then prompt "Create a similar config for staging with half the scale." Plan Mode asks clarifying questions about database connections and environment-specific settings, validates the proposed changes against subscription limits, and generates a Bicep file. The developer reviews and deploys — entire cycle takes 8 minutes, zero portal visits.

---

## When to Use This Pattern

### Decision Tree

```
Q: Are you working with Azure infrastructure or services?
├─ Yes, and I need to understand current state → Use: Copilot CLI + Azure MCP for discovery
│  └─ Best for: Exploratory work, troubleshooting, inventory analysis
│
├─ Yes, and I need to create/modify resources → Use: Copilot CLI + Azure MCP with Plan Mode
│  └─ Best for: Prototyping, scaffolding configs from live templates, deployment validation
│
└─ No, working with other cloud providers → Use: Provider-specific MCP servers (AWS, GCP)
   └─ Best for: Multi-cloud teams can apply same conversational pattern with different MCP servers
```

### Use This Pattern When

- Rapidly prototyping new Azure services or resources where understanding current environment state accelerates design
- Scaffolding infrastructure-as-code from existing resources (create staging/dev variants of production configs)
- Troubleshooting deployments or configurations where querying live state is faster than portal navigation
- Generating or validating ARM/Bicep/Terraform code with awareness of actual subscription constraints and networking
- Learning Azure service configurations by exploring real examples from your own environment instead of generic docs

### Don't Use This Pattern When

- Making production changes without peer review — AI-generated configs should go through standard approval processes
- Working in highly restricted environments where MCP server network access to Azure APIs is blocked or prohibited
- Your workflow requires compliance audit trails that MCP conversational interactions don't yet provide
- Team members lack Azure RBAC understanding — this pattern requires knowing what permissions the MCP server inherits

### Comparison with Related Approaches

| Aspect | Copilot CLI + Azure MCP | Azure Portal + Copilot Chat | Azure CLI Only |
|--------|-------------------------|----------------------------|----------------|
| **Best For** | Conversational prototyping with live context | Visual exploration and guided workflows | Scripted automation and CI/CD |
| **Strengths** | Terminal-native, maintains session context, validates against live state | Visual resource relationships, click-through discovery | Fully scriptable, version-controlled, audit-friendly |
| **Limitations** | Requires MCP setup, inherits user RBAC (no elevation) | Context-switching between portal and terminal | No conversational AI, manual state inspection |
| **Setup Time** | 10 minutes (install + auth) | Instant (if portal access exists) | 5 minutes (Azure CLI install) |

---

<!-- 🎬 MAJOR SECTION: Live Context -->
## Live Azure Context in Terminal Conversations

This is where the mental model shift happens: instead of switching to the portal to see what exists, ask the terminal. Azure MCP Server translates natural language into Azure SDK calls, executing them with your authenticated permissions and returning structured results that stay in conversational context.

### Interactive Resource Discovery

The most immediate capability is **asking what's running**. Open Copilot CLI, ensure the Azure MCP Server is connected, and query your environment:

```markdown
**Artifact: `interactive-azure-query-session.md`**

# Session: Discovering Existing Azure Resources

## Query 1: What storage accounts exist?

**Prompt:**
> List all storage accounts in my subscription with their locations and SKUs

**Response:**
Found 4 storage accounts:

1. **proddata001** (East US)
   - SKU: Standard_GRS
   - Created: 2025-08-12
   - Public access: Disabled

2. **stagingdata001** (West US 2)
   - SKU: Standard_LRS
   - Created: 2025-11-03
   - Public access: Enabled (blob only)

3. **devlogs** (East US 2)
   - SKU: Standard_LRS
   - Created: 2026-01-15
   - Public access: Disabled

4. **backuparchive** (Central US)
   - SKU: Standard_RAGRS
   - Created: 2024-03-20
   - Public access: Disabled

---

## Query 2: Show me Cosmos DB configuration

**Prompt:**
> What Cosmos DB databases exist and what are their throughput settings?

**Response:**
Found 2 Cosmos DB accounts:

**cosmos-prod-eastus**
- Databases:
  - `user-profiles` → 10,000 RU/s (autoscale max: 40,000)
  - `transaction-logs` → 5,000 RU/s (manual)
  - `analytics-cache` → Serverless

**cosmos-dev-westus**
- Databases:
  - `test-data` → 400 RU/s (manual)

---

## Query 3: Extract specific resource configuration

**Prompt:**
> Show me the network configuration for proddata001 storage account

**Response:**
**proddata001 Network Configuration:**

- **Virtual Network Rules:**
  - prod-vnet/app-subnet (East US)
  - prod-vnet/db-subnet (East US)

- **Firewall Rules:**
  - Allow: 203.0.113.0/24 (office IP range)
  - Allow: 198.51.100.50 (CI/CD agent)

- **Private Endpoints:**
  - prod-storage-pe01 → prod-vnet/private-subnet

- **Public Network Access:** Disabled
- **Minimum TLS Version:** 1.2
- **Shared Key Access:** Enabled
```

**Key Points:**
- AI returns structured data sourced from live Azure APIs — not cached, not documentation examples
- Conversational context persists — follow-up questions reference previous results without re-querying
- Responses include actionable details (SKUs, RU/s, networking rules) that inform next steps

### Configuration Extraction for Templating

Once resources are discovered, extract configurations as templates for new resources:

**Prompt:**
> Create a similar storage account config for a new staging environment

**AI Response:**
Based on `proddata001`, here's a staging-appropriate configuration:

```json
{
  "name": "stagingdata002",
  "location": "West US 2",
  "sku": "Standard_LRS",  // Changed from GRS for cost savings
  "networkRules": {
    "virtualNetworkRules": [
      "staging-vnet/app-subnet"
    ],
    "ipRules": [
      "203.0.113.0/24"  // Retained office access
    ],
    "bypass": "AzureServices",
    "defaultAction": "Deny"
  },
  "minimumTlsVersion": "TLS1_2",
  "allowBlobPublicAccess": false
}
```

**Differences from production:**
- SKU downgraded to LRS (staging doesn't need geo-redundancy)
- VNet points to staging-vnet instead of prod-vnet
- CI/CD agent IP removed (staging uses different pipeline)

This becomes a Bicep or Terraform module with one more prompt.

---

<!-- 🎬 MAJOR SECTION: Prototype Loop -->
## The Prototype Loop: Plan → Generate → Deploy

The traditional prototype loop has 4-6 iterations on average: guess config → deploy → fail → check portal → adjust → redeploy. With Plan Mode and Azure MCP, this compresses to 1-2 iterations by validating assumptions *before* deployment.

### Plan Mode: Clarify Before Code

Plan Mode (Shift+Tab in Copilot CLI) enables collaborative planning. The AI asks clarifying questions about intent, queries live resources to validate assumptions, and proposes a strategy before generating any infrastructure code[^8].

```markdown
**Artifact: `plan-mode-deployment-workflow.md`**

# Plan Mode Workflow: Deploying a New App Service

## Step 1: State the Goal

**Prompt (Shift+Tab to enter Plan Mode):**
> I need to deploy a new App Service for the payments API. It should be similar to the existing orders API but with its own database connection.

---

## Step 2: AI Asks Clarifying Questions

**Copilot CLI Plan Mode:**

I'll help plan this deployment. A few questions to validate the approach:

1. **Region preference?** The existing orders API runs in East US. Should the payments API be co-located for latency, or in a different region for redundancy?

2. **App Service Plan?** Should this share the existing `prod-asp-001` plan (currently running orders API), or get a dedicated plan for isolation?

3. **Database type?** You mentioned "database connection" — is this:
   - A new Azure SQL database?
   - A new Cosmos DB database?
   - A connection to an existing database?

4. **Networking?** The orders API uses VNet integration with `prod-vnet/app-subnet`. Should payments API use the same subnet or a separate one?

5. **Scaling requirements?** Orders API is set to autoscale 3-10 instances. Similar needs for payments?

---

## Step 3: Provide Answers

**Developer response:**
> 1. Same region (East US) for latency
> 2. Dedicated App Service Plan for isolation
> 3. New Azure SQL database with firewall rules for the app subnet
> 4. Same VNet but separate subnet (prod-vnet/payments-subnet)
> 5. Start with 2-5 instance autoscale, we can adjust after load testing

---

## Step 4: AI Validates Against Live Resources

**Copilot CLI Plan Mode:**

Validated against current subscription:

✅ **East US capacity:** Available for Standard S2 App Service Plan
✅ **prod-vnet/payments-subnet exists:** 10.0.3.0/24, currently empty
✅ **Azure SQL quota:** 8 of 20 databases used, can create new
⚠️ **Firewall rule:** payments-subnet (10.0.3.0/24) not currently in SQL firewall allowlist — will add

**Proposed Architecture:**

```
App Service Plan: payments-asp-001 (S2, East US, autoscale 2-5)
 └─ App Service: payments-api
     └─ VNet Integration: prod-vnet/payments-subnet

Azure SQL Server: prod-sqlserver-eastus (existing)
 └─ New Database: payments-db (Standard S1)
     └─ Firewall: Allow prod-vnet/payments-subnet
```

**Estimated cost:** ~$150/month (plan + database + egress)

Approve this plan to generate Bicep modules? (y/n)

---

## Step 5: Generate Infrastructure Code

**Developer:** `y`

**Copilot CLI generates:**

```bicep
// payments-infrastructure.bicep

param location string = 'eastus'
param appServicePlanName string = 'payments-asp-001'
param appServiceName string = 'payments-api'
param vnetName string = 'prod-vnet'
param subnetName string = 'payments-subnet'
param sqlServerName string = 'prod-sqlserver-eastus'
param databaseName string = 'payments-db'

// App Service Plan (dedicated for payments API)
resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'S2'
    tier: 'Standard'
    capacity: 2
  }
  properties: {
    reserved: false
  }
}

// App Service with VNet integration
resource appService 'Microsoft.Web/sites@2022-03-01' = {
  name: appServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    virtualNetworkSubnetId: resourceId('Microsoft.Network/virtualNetworks/subnets', vnetName, subnetName)
    siteConfig: {
      alwaysOn: true
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
    }
  }
}

// Autoscale configuration
resource autoscaleSettings 'Microsoft.Insights/autoscalesettings@2022-10-01' = {
  name: '${appServicePlanName}-autoscale'
  location: location
  properties: {
    targetResourceUri: appServicePlan.id
    enabled: true
    profiles: [
      {
        name: 'Auto scale condition'
        capacity: {
          minimum: '2'
          maximum: '5'
          default: '2'
        }
        rules: [
          {
            metricTrigger: {
              metricName: 'CpuPercentage'
              metricResourceUri: appServicePlan.id
              operator: 'GreaterThan'
              threshold: 70
              timeAggregation: 'Average'
              timeGrain: 'PT1M'
              timeWindow: 'PT5M'
            }
            scaleAction: {
              direction: 'Increase'
              type: 'ChangeCount'
              value: '1'
              cooldown: 'PT5M'
            }
          }
        ]
      }
    ]
  }
}

// Azure SQL Database
resource sqlDatabase 'Microsoft.Sql/servers/databases@2022-05-01-preview' = {
  name: '${sqlServerName}/${databaseName}'
  location: location
  sku: {
    name: 'S1'
    tier: 'Standard'
  }
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: 268435456000 // 250 GB
  }
}

// SQL Firewall Rule for App Subnet
resource sqlFirewallRule 'Microsoft.Sql/servers/firewallRules@2022-05-01-preview' = {
  name: '${sqlServerName}/Allow-payments-subnet'
  properties: {
    startIpAddress: '10.0.3.0'
    endIpAddress: '10.0.3.255'
  }
}

// Output connection string for app settings
output appServiceName string = appService.name
output databaseConnectionString string = 'Server=tcp:${sqlServerName}.database.windows.net,1433;Database=${databaseName};Authentication=Active Directory Default;'
```

**Copilot CLI:**
Bicep file generated. Review before deploying with:
```bash
az deployment group create \
  --resource-group prod-rg \
  --template-file payments-infrastructure.bicep
```

---

## What Just Happened

1. **Plan Mode asked domain-specific questions** — region, plan sharing, database type, networking, scaling
2. **AI queried live Azure state** — validated VNet/subnet existence, checked SQL quota, retrieved existing App Service configs for templating
3. **Proposed architecture was validated pre-deployment** — subnet firewall gap identified before it caused a deployment failure
4. **Generated Bicep matched production conventions** — TLS 1.2, FTPS disabled, autoscale rules consistent with existing services

**Traditional workflow:** 45 minutes (portal discovery + config guesswork + 2-3 failed deployments)
**With Plan Mode + Azure MCP:** 8 minutes (conversational planning + one successful deployment)
```

**Key Points:**
- Plan Mode shifts validation to *before* code generation — misconfigurations are caught in conversation, not post-deployment
- AI references live resources (existing VNet, SQL server, App Service configs) to propose consistent, production-validated infrastructure
- Developer maintains control — approves plan, reviews generated code, executes deployment manually

---

<!-- 🎬 MAJOR SECTION: Configuration -->
## Configuration and Setup

Wiring Azure MCP Server to Copilot CLI takes 10 minutes and requires three steps: install the MCP server, authenticate with Azure, and configure service access.

### Installation Options

Azure MCP Server can be installed via VS Code extension, package managers, or Docker[^9]:

**Option 1: VS Code Extension (Recommended for Getting Started)**

1. Install [Azure MCP Server extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azure-mcp-server) from VS Code Marketplace
2. Open Command Palette (Ctrl+Shift+P), search "MCP: List Servers"
3. Start Azure MCP Server — confirm it appears in Output tab

**Option 2: Package Manager**

```bash
# Node.js / npm
npm install -g @azure/mcp

# Python
pip install msmcp-azure

# .NET
dotnet add package Azure.Mcp
```

**Option 3: Docker**

```bash
docker pull mcr.microsoft.com/azure-mcp-server:latest
docker run -d --name azure-mcp mcr.microsoft.com/azure-mcp-server:latest
```

### Authentication

Azure MCP Server uses your existing Azure credentials — no separate authentication required. Sign in with Azure CLI:

```bash
az login
az account set --subscription "Your-Subscription-Name"
```

The MCP server inherits these credentials and operates within your RBAC permissions. No elevation occurs.

### Connecting to Copilot CLI

Once installed and authenticated, connect Azure MCP Server to Copilot CLI:

```markdown
**Artifact: `azure-mcp-config.json`**

# Azure MCP Server Configuration for Copilot CLI

Create or update `~/.copilot/mcp-servers.json`:

```json
{
  "mcpServers": [
    {
      "name": "azure-mcp",
      "command": "npx",
      "args": ["@azure/mcp"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id-here"
      }
    }
  ]
}
```

**For VS Code Extension Users:**

The extension handles configuration automatically. Verify connection in Copilot CLI:

```bash
copilot /tools
```

Expected output should include:

```
Available MCP Tools:
  - azure-mcp
    ├─ azure.storage.list-accounts
    ├─ azure.cosmosdb.list-databases
    ├─ azure.monitor.query-logs
    ├─ azure.appconfig.list-stores
    ├─ azure.resources.list-groups
    └─ ... (40+ tools available)
```

---

## Service Selection and Scope

By default, Azure MCP Server exposes all 40+ supported Azure services. For focused workflows or to reduce token usage, limit enabled services:

```json
{
  "mcpServers": [
    {
      "name": "azure-mcp",
      "command": "npx",
      "args": ["@azure/mcp"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id",
        "AZURE_MCP_ENABLED_SERVICES": "storage,cosmosdb,monitor,appconfig"
      }
    }
  ]
}
```

**Available services:** `storage`, `cosmosdb`, `monitor`, `appconfig`, `resources`, `devops`, `sql`, `keyvault`, `aks`, `functions`, `appservice`, and more[^10].

Restart Copilot CLI after configuration changes:

```bash
copilot /reset
```
```

**Key Points:**
- Azure MCP Server requires no separate Azure authentication — uses existing `az login` session
- Configuration is a single JSON file; changes take effect after Copilot CLI restart
- Service selection is optional but recommended for focused workflows (reduces noise in tool suggestions)

### Verification

Test the connection:

```bash
copilot
```

**Prompt:**
> List all resource groups in my subscription

**Expected behavior:** AI invokes `azure.resources.list-groups` tool and returns live results. If this works, Azure MCP is properly connected.

---

<!-- 🎬 MAJOR SECTION: Azure Skills Plugin -->
## Azure Skills Plugin: Adding the Brain Layer

The Azure MCP Server gives agents execution capability \u2014 200+ tools to act on Azure. The **Azure Skills Plugin** adds the reasoning layer on top: 21 curated skills that encode how Azure work actually gets done. Where MCP tools answer "can I list storage accounts?", skills answer "when deploying a Python API to Azure, what's the right sequence of validation and deployment steps?" [^13]

Skills are plain-text Markdown files that activate by agent intent. There's no separate invocation syntax \u2014 when Copilot recognizes a deployment scenario, the relevant skills are automatically in context.

### What's in the Plugin

The plugin installs to `.github/plugins/azure-skills/` and bundles all three layers in one operation:

| Component | What It Provides |
|-----------|-----------------|
| **Azure Skills** (21 curated) | Workflow logic, decision trees, guardrails for the full Azure app lifecycle |
| **Azure MCP Server** | 200+ structured tools across 40+ Azure services (execution layer) |
| **Foundry MCP Server** | Model deployment, endpoint management, agent workflows for Azure AI Foundry |

### The 21 Curated Skills

Skills cover the full Azure lifecycle, organized by phase:

**Build and Deploy**
- `azure-prepare` \u2014 Project analysis, infra code generation, Dockerfile scaffolding, deployment config
- `azure-validate` \u2014 Pre-deployment checks, configuration guardrails, compatibility verification
- `azure-deploy` \u2014 Full automated deployment pipeline with rollback handling

**Operate and Troubleshoot**
- `azure-diagnostics` \u2014 Log-based troubleshooting with real telemetry from Application Insights and Azure Monitor
- `azure-observability` \u2014 Instrumentation patterns, alerting, and operational dashboards
- `azure-compliance` \u2014 Policy checks, regulatory requirements, governance guardrails

**Optimize and Design**
- `azure-cost-optimization` \u2014 Cost review, SKU right-sizing, savings recommendations with live pricing
- `azure-compute` \u2014 Compute SKU selection, autoscaling configuration, container guidance
- `azure-resource-visualizer` \u2014 Architecture diagram generation from live subscription state

**Platform and Data Services**
- `azure-storage` \u2014 Storage account patterns, tiering, lifecycle management, security configuration
- `azure-kusto` \u2014 KQL query construction, Log Analytics, data exploration
- `azure-rbac` \u2014 Role assignment, principle of least privilege, service principal management

**AI and Advanced Scenarios**
- `azure-ai` \u2014 Azure OpenAI, Cognitive Services, and AI service integration patterns
- `azure-aigateway` \u2014 APIM-based AI gateway configuration, rate limiting, token management
- `microsoft-foundry` \u2014 Azure AI Foundry model deployment, evaluation, catalog management

**Migration and Identity**
- `azure-cloud-migrate` \u2014 On-premises to Azure migration assessment and workload transition
- `entra-app-registration` \u2014 App registration, OAuth flows, permission scopes, managed identity setup[^14]

### Installing the Plugin

**Via Copilot CLI:**

```bash
/plugin marketplace add microsoft/azure-skills
/plugin install azure@azure-skills
```

**Via VS Code:**

Install the **Azure MCP** extension from the VS Code Marketplace \u2014 the Skills Plugin is bundled and auto-configured for Copilot Chat.

**Via Claude Code:**

```bash
/plugin marketplace add microsoft/azure-skills
/plugin install azure@azure-skills
```

The plugin works identically across all three hosts because the skills layer is host-agnostic Markdown, and the MCP layer speaks a standardized protocol[^13].

### Skills in Action

Without the skills plugin, a prompt like "deploy my Python API to Azure" produces generic guidance. With skills, the agent follows the correct sequence:

1. **`azure-prepare` activates** \u2014 analyzes the project, generates `azd`-compatible infra code, creates a Dockerfile if needed
2. **`azure-validate` activates** \u2014 checks subscription quotas, VNet availability, and naming conflicts before touching anything
3. **`azure-deploy` activates** \u2014 executes the deployment in the right order, surfaces any errors with context-aware remediation
4. **`azure-diagnostics` available on request** \u2014 queries Application Insights and logs if something went wrong

The skills are version-controlled and extensible \u2014 teams can add organization-specific skills for internal conventions and governance patterns.

---

<!-- 🎬 MAJOR SECTION: Guardrails -->
## Guardrails and Trust Boundaries

Azure MCP Server operates with your authenticated permissions, which means it can read (and potentially modify) any Azure resource you have access to. Trust builds incrementally — start with read-only mode and dedicated subscriptions before enabling write access on production environments.

### Understanding RBAC Inheritance

Azure MCP Server does **not** elevate privileges. It executes Azure SDK calls using your current `az login` session, respecting all RBAC boundaries:

- If you have **Reader** role on a subscription → MCP can query resources but not modify
- If you have **Contributor** role → MCP can create, update, delete resources
- If you have **Owner** role → MCP can manage RBAC itself (dangerous for conversational workflows)

**Recommendation:** Create a dedicated service principal with scoped permissions for MCP workflows rather than using your personal Owner-level account.

### Read-Only Mode for Safe Exploration

Enable read-only mode to prevent accidental modifications during exploration:

```markdown
**Artifact: `rbac-scoped-setup.md`**

# Read-Only Azure MCP Configuration

## Step 1: Create Read-Only Service Principal

```bash
# Create service principal with Reader role
az ad sp create-for-rbac \
  --name "copilot-mcp-readonly" \
  --role "Reader" \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID
```

Output:
```json
{
  "appId": "12345678-1234-1234-1234-123456789abc",
  "password": "generated-password-here",
  "tenant": "your-tenant-id"
}
```

---

## Step 2: Authenticate MCP with Service Principal

Update `~/.copilot/mcp-servers.json`:

```json
{
  "mcpServers": [
    {
      "name": "azure-mcp-readonly",
      "command": "npx",
      "args": ["@azure/mcp"],
      "env": {
        "AZURE_TENANT_ID": "your-tenant-id",
        "AZURE_CLIENT_ID": "12345678-1234-1234-1234-123456789abc",
        "AZURE_CLIENT_SECRET": "generated-password-here",
        "AZURE_SUBSCRIPTION_ID": "your-subscription-id"
      }
    }
  ]
}
```

---

## Step 3: Verify Read-Only Behavior

**Test Query (should succeed):**
> List all storage accounts

**Test Modification (should fail with permission error):**
> Create a new storage account named "test-account"

Expected error:
```
Error: Insufficient permissions. The service principal 'copilot-mcp-readonly'
has 'Reader' role and cannot perform write operations.
```

---

## Benefits of Read-Only Mode

- ✅ Safe for production subscription exploration
- ✅ No risk of accidental resource deletion or modification
- ✅ Ideal for learning Azure MCP capabilities
- ✅ Can be enabled for entire teams without governance concerns

---

## When to Upgrade to Write Access

Grant Contributor role only when:

1. **Prototyping in dedicated dev/staging subscriptions** — isolated from production
2. **Deployment workflows are peer-reviewed** — AI-generated configs go through PR approval before execution
3. **Team has established conventions** — custom instructions guide AI toward compliant resource patterns
4. **Cost guardrails exist** — subscription spending limits prevent runaway resource creation
```

**Key Points:**
- Start with Reader role service principal — enables discovery and configuration extraction without modification risk
- Production subscriptions should remain read-only until team establishes trust and review processes
- Dedicated dev subscriptions with Contributor access enable full prototype-to-deployment workflows safely

### Subscription Boundaries

For teams working across multiple environments, configure separate MCP connections per subscription:

```json
{
  "mcpServers": [
    {
      "name": "azure-mcp-production",
      "command": "npx",
      "args": ["@azure/mcp"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "prod-subscription-id",
        "AZURE_CLIENT_ID": "readonly-sp-client-id",
        "AZURE_CLIENT_SECRET": "readonly-sp-secret"
      }
    },
    {
      "name": "azure-mcp-dev",
      "command": "npx",
      "args": ["@azure/mcp"],
      "env": {
        "AZURE_SUBSCRIPTION_ID": "dev-subscription-id",
        "AZURE_CLIENT_ID": "contributor-sp-client-id",
        "AZURE_CLIENT_SECRET": "contributor-sp-secret"
      }
    }
  ]
}
```

In Copilot CLI, specify which MCP server to use:

```bash
copilot --mcp azure-mcp-production
> List all App Services  # Read-only query on production

copilot --mcp azure-mcp-dev
> Create a new storage account  # Write-enabled on dev subscription
```

### What the MCP Server Sees

Azure MCP Server has access to:

- ✅ Resource configurations (networking, SKUs, settings)
- ✅ Resource metadata (tags, creation dates, locations)
- ✅ Logs and metrics (if you have Log Analytics Reader role)
- ✅ DevOps artifacts (work items, repos, pipelines — if enabled and authenticated)
- ❌ Secrets stored in Key Vault (requires separate Key Vault access policy)
- ❌ Data inside resources (database contents, storage blobs) — only metadata

**Implication:** Azure MCP can see *how* resources are configured but not sensitive data within them, unless you explicitly grant Key Vault or data-plane permissions.

---

## Real-World Use Cases

### Use Case 1: Rapid Environment Cloning

**The Scenario:** A developer needs to create a complete staging environment that mirrors production App Service, Storage, and Cosmos DB configurations — normally a 2-hour task involving portal navigation, manual config extraction, and parameter translation.

**How It Works:** In Copilot CLI with Azure MCP connected to production (read-only) and staging (write-enabled) subscriptions, the developer asks "Show me all resources in the production resource group" to retrieve configurations, then prompts "Generate Bicep modules for staging equivalents with cost-optimized SKUs." Plan Mode validates subscription quotas and VNet availability before generating code.

**Example:**
```bash
copilot --mcp azure-mcp-production

> List all resources in prod-rg resource group with their configurations

# AI returns full inventory with SKUs, networking, scaling rules

> Generate Bicep modules for a staging environment with these changes:
  - Standard_LRS instead of Premium_GRS for storage
  - S1 instead of P2 for App Service
  - 1000 RU/s instead of 10000 for Cosmos DB
  - VNet integration with staging-vnet

# Plan Mode validates staging subscription capacity

> Deploy preview shows cost reduction: $1200/month → $180/month

# Developer reviews generated Bicep, deploys to staging subscription
```

**What You Get:** Complete staging environment in 15 minutes with production-validated configurations and cost optimizations — no portal tab-switching, no manual SKU lookups.

---

### Use Case 2: Log Analysis and Troubleshooting

**The Scenario:** A production API is experiencing intermittent 500 errors. The DevOps engineer needs to query Application Insights logs, correlate with resource health events, and identify the failing component — traditionally requires Azure Portal query editor, KQL knowledge, and manual correlation.

**How It Works:** Azure MCP Server includes Azure Monitor integration with KQL query execution. The engineer uses natural language to describe what they're investigating; AI generates and executes KQL queries, interprets results, and suggests next steps.

**Example:**
```bash
copilot --mcp azure-mcp-production

> Show me all HTTP 500 errors from the payments-api App Service in the last 2 hours

# AI generates and executes KQL:
# requests
# | where timestamp > ago(2h)
# | where name == "payments-api"
# | where resultCode == "500"
# | summarize count() by bin(timestamp, 5m), operation_Name

# Returns timeline showing spike at 14:30 UTC in /checkout endpoint

> What exceptions occurred in /checkout around 14:30?

# AI executes:
# exceptions
# | where timestamp between (datetime(2026-03-17 14:25) .. datetime(2026-03-17 14:35))
# | where operation_Name contains "checkout"
# | project timestamp, type, outerMessage, innermostMessage

# Returns: "SqlException: Connection timeout to payments-db"

> Check the connection pool settings for payments-db

# AI queries SQL database resource configuration
# Returns: maxPoolSize=100, connectionTimeout=30s

> What's the recommended connection pool size for this workload?

# AI analyzes request volume (from previous query) and suggests:
# "At 450 req/min during the spike, with average query time of 200ms,
# you need ~15 concurrent connections. Pool size of 100 is adequate.
# The timeout of 30s is too aggressive for this query pattern.
# Recommendation: Increase connectionTimeout to 60s."
```

**What You Get:** Root cause identified in 8 minutes through conversational log analysis — no manual KQL writing, no context-switching to query editors, AI-guided troubleshooting with live resource correlation.

---

### Use Case 3: Infrastructure-as-Code Validation

**The Scenario:** A developer has written a Bicep file for deploying a new Azure Function with Event Hub triggers. Before deploying, they want to validate that networking, permissions, and Event Hub partitioning are compatible with the existing environment.

**How It Works:** Azure MCP queries the target VNet, Event Hub namespace, and Function App plan to validate the proposed configuration against live resources. Plan Mode identifies mismatches before deployment.

**Example:**
```bash
copilot --mcp azure-mcp-dev

> I have a Bicep file for a new Azure Function (order-processor-func) that
  consumes from the existing orders-eventhub Event Hub. Can you validate
  the configuration against current resources?

# AI reads the Bicep file (via @filepath reference), extracts key config:
# - VNet integration: prod-vnet/functions-subnet
# - Event Hub: orders-eventhub (namespace: prod-events-ns)
# - Function Plan: functions-plan-001 (consumption tier)

# AI queries live resources:

✅ **VNet validation:** prod-vnet/functions-subnet exists (10.0.5.0/24),
   currently has 12 IPs allocated, 243 available

⚠️ **Event Hub validation:** orders-eventhub has 8 partitions.
   Your Bicep specifies 4 consumer instances — this will leave 4 partitions
   idle unless you implement partition distribution logic.

❌ **Function Plan validation:** functions-plan-001 is consumption tier.
   VNet integration requires Premium (EP1+) or Dedicated (App Service Plan).
   Deployment will fail.

**Recommendations:**
1. Change function plan to Premium EP1 or reuse existing premium plan
2. Reduce consumer instances to match partition count (8) or implement custom distribution
3. Add managed identity for Event Hub access (currently missing in Bicep)

Would you like me to update the Bicep file with these fixes?
```

**What You Get:** Deployment validation in conversation before `az deployment` is executed — catches VNet, Event Hub, and plan incompatibilities that would otherwise require 3-4 failed deployments to discover.

---

## What You Can Do Today

### 15-Minute Quick Start

**Goal:** Install the Azure Skills Plugin, connect to Copilot CLI, and execute your first live Azure query with full skills + MCP capability

1. **Install the Azure Skills Plugin** (installs skills + Azure MCP + Foundry MCP in one step)
   - VS Code: Install [Azure MCP extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azure-mcp-server) from the VS Code Marketplace — Skills Plugin is bundled
   - Copilot CLI: `# /plugin marketplace add microsoft/azure-skills` then `/plugin install azure@azure-skills`
   - Direct MCP only: `npm install -g @azure/mcp`

2. **Authenticate with Azure**
   ```bash
   az login
   az account set --subscription "Your-Subscription-Name"
   ```

3. **Verify MCP connection and skills in Copilot CLI**
   ```bash
   copilot /tools
   # Confirm azure-mcp appears in available tools
   copilot /plugins
   # Confirm azure-skills plugin is installed
   ```

4. **Run first query**
   ```bash
   copilot
   > List all resource groups in my subscription
   ```

**Success criteria:** AI returns live resource group list sourced from your Azure subscription

---

### 1-Hour Deep Dive

**Goal:** Set up read-only production access and write-enabled dev access, explore resource discovery, scaffold a simple infrastructure config

1. **Complete 15-minute quick start** (above)

2. **Create read-only service principal for production**
   ```bash
   az ad sp create-for-rbac \
     --name "copilot-mcp-prod-readonly" \
     --role "Reader" \
     --scopes /subscriptions/PROD_SUBSCRIPTION_ID
   ```

3. **Configure multi-subscription MCP access**
   - Update `~/.copilot/mcp-servers.json` with separate prod (read-only) and dev (contributor) connections
   - Reference `rbac-scoped-setup.md` artifact above

4. **Explore production resources conversationally**
   ```bash
   copilot --mcp azure-mcp-production
   > Show me all App Services and their configurations
   > What storage accounts exist and what are their network rules?
   ```

5. **Scaffold infrastructure from live templates**
   ```bash
   copilot --mcp azure-mcp-dev
   > Based on the production storage account config, create a Bicep file
     for a similar dev storage account with Standard_LRS SKU
   ```

**Success criteria:** You can query production resources safely (read-only) and generate infrastructure code for dev environments

---

### 2-4 Hour Mastery Path

**Goal:** Integrate Azure MCP into real prototype-to-deployment workflows with Plan Mode, automated validation, and custom instructions

1. **Complete 1-hour deep dive** (above)

2. **Configure custom instructions for team conventions**
   - Create `.github/copilot-instructions.md` in your repository
   - Document Azure naming conventions, required tags, networking patterns
   - Example:
     ```markdown
     ## Azure Infrastructure Conventions

     - All resource names use kebab-case: `app-service-name`
     - All resources must have tags: `environment`, `cost-center`, `owner`
     - App Services require VNet integration with prod-vnet or dev-vnet
     - Storage accounts must disable public access
     - SQL databases minimum SKU: Standard S1
     ```

3. **Run end-to-end deployment with Plan Mode**
   - Choose a real task: "Deploy a new containerized API with Azure Container Apps"
   - Use Plan Mode (Shift+Tab) to collaborate on architecture
   - Let AI query existing Container Apps environments for templating
   - Generate Bicep with validation against live VNet/subnet availability
   - Review and deploy

4. **Set up organization-level MCP governance** (if applicable)
   - Configure [MCP Registry](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry) for organization-wide tool discovery
   - Define approved MCP servers and service boundaries
   - Document team workflows in shared repository

**Success criteria:** You've completed a real deployment using conversational Azure MCP workflows, validated configs against live state, and integrated team conventions into AI behavior

---

## Related Patterns

### Complementary Tech Talks

- **[GitHub Copilot CLI](../copilot-cli/README.md)** — Foundational understanding of terminal-native AI workflows, Plan Mode, and cloud delegation
- **[MCP Apps](../mcp-apps/README.md)** — Building custom MCP servers for internal tools and proprietary systems
- **[Agentic Lifecycle Orchestration](../agentic-lifecycle/)** — Coordinating recurring repository judgments through evidence-gated workflows
- **[MCP Servers](../mcp-servers/README.md)** — Deep dive on Model Context Protocol and how tools like the Azure MCP Server expose structured capabilities to agents

### Features That Work Together

- **Copilot CLI Plan Mode** — Validates Azure infrastructure ideas before code generation; Azure MCP provides live resource context for that validation
- **Custom Instructions** — Encode team Azure conventions (naming, tagging, networking) so AI-generated configs match production patterns automatically
- **Cloud Delegation (`&` prefix)** — Offload long-running Azure analysis (security audits, cost optimization reports) to background agents while terminal stays free

### Architectural Extensions

- **Multi-cloud MCP integration** — Combine Azure MCP with AWS and GCP MCP servers for unified conversational cloud management
- **CI/CD automation** — Use programmatic mode (`copilot -p`) with Azure MCP in GitHub Actions for deployment validation and infrastructure testing
- **Custom MCP tools** — Build organization-specific MCP servers that wrap internal Azure management APIs or governance checks

---

## 📚 References

### Official Documentation

[^1]: **[Get started with Azure MCP Server](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started)** — Installation, authentication, and first queries
[^2]: **[Azure MCP Server Documentation](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/)** — Service coverage, API reference, configuration options
[^3]: **[Introducing the Azure MCP Server](https://devblogs.microsoft.com/azure-sdk/introducing-the-azure-mcp-server/)** — Launch announcement, use cases, and design rationale
[^4]: **[Azure MCP Server GitHub Repository](https://github.com/Azure/azure-mcp)** — Source code, examples, community contributions
[^5]: **[Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)** — MCP standard, tool discovery, and client-server architecture

### Copilot CLI Integration

[^6]: **[Best practices for GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)** — Custom instructions, permissions, MCP integration
[^7]: **[Add an MCP server to Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli#add-an-mcp-server)** — Connection configuration and verification
[^8]: **[Using GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)** — Interactive mode, Plan Mode, cloud delegation

### Deployment and Security

[^9]: **[Azure MCP Server - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azure-mcp-server)** — VS Code extension setup and usage
[^10]: **[Azure MCP Server - MCP Registry](https://mcpservers.org/servers/github-com-microsoft-mcp)** — Complete service list and capability matrix

### Community Resources

[^11]: **[How to Use Azure DevOps MCP Server with GitHub Copilot](https://dev.to/devbyrayray/how-to-use-azure-devops-mcp-server-with-github-copilot-in-vs-code-complete-setup-guide-3ala)** — Step-by-step DevOps integration guide
[^12]: **[Building an MCP Server with Azure Functions](https://ajtech.nl/blog/create-your-own-mcp-server/)** — Extending GitHub Copilot with custom Azure tools

### Azure Skills Plugin

[^13]: **[Announcing the Azure Skills Plugin](https://devblogs.microsoft.com/all-things-azure/announcing-the-azure-skills-plugin/)** — Official announcement covering the three-layer architecture, skills list, and supported hosts (GitHub Copilot, Copilot CLI, Claude Code)
[^14]: **[Azure Skills GitHub Repository](https://github.com/microsoft/azure-skills)** — Source code, skills catalog, and installation instructions for the full plugin

---

## 🎭 Behind the Scenes

*For those who want to understand the deeper mechanics*

### How Azure MCP Server Translates Natural Language to Azure SDK Calls

When Copilot CLI receives a prompt like "List all storage accounts," it doesn't directly execute Azure commands. Instead:

1. **Tool Discovery**: Copilot CLI queries Azure MCP Server for available tools using MCP's `tools/list` protocol method
2. **Intent Matching**: The AI model determines that "list storage accounts" maps to the `azure.storage.list-accounts` tool
3. **Parameter Inference**: AI extracts parameters from conversational context (subscription ID from config, optional resource group filter from previous queries)
4. **Tool Invocation**: Copilot CLI sends a `tools/call` request to Azure MCP Server with tool name and parameters
5. **Azure SDK Execution**: MCP Server translates the tool call into Azure SDK methods (`StorageManagementClient.list_accounts()`), authenticates with inherited credentials, and executes
6. **Result Transformation**: Raw SDK response (JSON) is formatted into natural language by the AI for conversational display

**Why This Matters:** You're not running arbitrary `az` commands — you're invoking type-safe, permission-scoped SDK methods through an abstraction layer. This enables validation, retry logic, and structured error handling that raw CLI execution lacks.

### Context Compaction and Token Management

Azure MCP queries return substantial JSON payloads — a single "list all resources" query might yield 50KB of configuration data. Without management, conversational sessions would hit token limits after 3-4 queries.

Copilot CLI's auto-compaction activates at 95% token capacity:

1. **Semantic Summarization**: Previous query results are compressed into summaries — "4 storage accounts in East US with GRS replication" instead of full JSON
2. **Artifact Extraction**: Large configs are moved to referenced artifacts — "App Service config saved as `appservice-001.json`" with key points retained in context
3. **Relevance Pruning**: Queries >10 exchanges old are removed unless referenced in recent conversation

**Practical Implication:** You can have 30-40 minute Azure exploration sessions without manually clearing context. The AI retains relevant summaries while discarding stale details.

### RBAC Permission Scope and Elevation Prevention

Azure MCP Server **never** elevates permissions. It operates strictly within the RBAC boundaries of the authenticated principal (user or service principal). Here's how that's enforced:

1. **Authentication Binding**: MCP Server uses `DefaultAzureCredential` chain — checks environment variables, managed identity, then Azure CLI session
2. **No Credential Storage**: MCP Server doesn't store passwords or tokens — it requests fresh tokens from Azure Identity on each SDK call
3. **RBAC Enforcement**: Every Azure SDK call includes the current principal's token; Azure Resource Manager evaluates permissions server-side before executing
4. **Denial Logging**: Permission-denied errors surface in Copilot CLI as natural language explanations: "You don't have Contributor access to modify this resource"

**Security Boundary:** Even if AI generates a "delete all storage accounts" command, execution fails unless your principal has Delete permissions. MCP is a translation layer, not a privilege escalation vector.

---

**🎯 Final Note:** This tech talk is ready for slide generation. The README provides the canonical deep-dive content; the accompanying `deck.recipe.yml` captures slide-adaptation defaults for this talk.
