---
status: active
updated: 2026-07-24
section: "Agentic Systems"
references:
  - url: https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent
    label: "Quickstart: Deploy your first hosted agent - Microsoft Foundry"
    verified: 2026-07-24
  - url: https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent
    label: "Quickstart: Add a Foundry IQ knowledge base to a hosted agent with a toolbox"
    verified: 2026-07-24
---

# GitHub Copilot with Microsoft Foundry: Organizational Memory for Coding Agents

> **The Question This Talk Answers:**
> *"When does a GitHub Copilot agent need Microsoft Foundry — and how do we wire it up?"*

**Duration:** 45 minutes | **Target Audience:** Principal Engineers, Platform Architects, GitHub SEs

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Every engineering team with legacy systems has lost organizational memory; this solves it directly |
| **Compelling** | 🟢 High | The "Why does this code exist?" demo is concrete, immediate, and unlike any typical agent demo |
| **Actionable** | 🟢 High | Two complete quickstarts, working artifacts, and a decision framework that applies today |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### Start Here: Why Does This Code Exist?

Every engineer has encountered code like this:

```csharp
if (customer.IsPremium)
{
    bypassFraudChecks();
}
```

The first reaction is nearly universal: *"What were they thinking?"*

A GitHub Copilot agent reviewing this PR can tell us exactly what happened at the code level. It finds the commit history, traces the PR, surfaces the related issue[^1]:

```
Introduced in PR #413
Author: Alice Mendez
Related Issue: #9021
Last modified: 8 months ago
```

That's useful. But it doesn't answer the question that actually matters before anyone touches this code:

**Was this intentional? And is the original reason still valid?**

That question lives somewhere else entirely — in an architecture review, a Teams thread, a decision document. It's organizational memory. And that's exactly where Microsoft Foundry IQ enters the picture.

When a Copilot agent has access to a Foundry IQ knowledge base, the same query returns something fundamentally different:

```
Architecture Review — March 2023

The fraud service was introducing 30-second checkout delays.
Premium customers were abandoning purchases at high rates.

Legal approved a temporary bypass pending fraud platform migration.
The decision was scheduled for review after migration completion.
```

The agent can then reason: *"The original constraint may no longer exist. Create a validation issue?"*

This is the difference between **implementation memory** and **organizational memory**. GitHub Copilot provides the first. Microsoft Foundry provides the infrastructure to add the second.

### What's Now Possible

- **Intent recovery at query time** — Copilot agents retrieve the *reasoning* behind architectural decisions, not just the code that implemented them
- **Hosted agents with dedicated identity** — Foundry Agent Service deploys containerized agents with Entra ID and RBAC, fitting cleanly alongside the GitHub Copilot Extension model
- **Knowledge bases as MCP tools** — Foundry IQ exposes organizational memory as Model Context Protocol endpoints; agents call them the same way they call any other tool[^5]
- **Agentic RAG with 40%+ relevance improvement** — Foundry IQ's agentic retrieval engine plans, decomposes, and synthesizes complex queries against multiple data sources — not just keyword matching[^2]

### The Emerging Practice

The pattern taking shape in engineering-forward organizations is **context layering**: GitHub Copilot handles the implementation layer — code, PRs, issues, CI/CD, and documentation. When an agent encounters a question it can't answer from the repo alone, it reaches to a context provider that holds organizational knowledge.

This is architecturally different from building "a big agent that knows everything." The winning model is composable context — each provider authoritative in its own domain, connected through open protocols.

The practical implication: most coding agents never need Foundry. GitHub and a handful of operational MCP tools cover 90–95% of software engineering work. But the remaining 5–10% — the "architecture archaeology" moments — can cost engineering teams days of effort to resolve manually. Foundry IQ makes those moments answerable in seconds[^3].

---

## How It Works: Copilot + Foundry

### What It Does

Microsoft Foundry Agent Service is a managed runtime for deploying containerized agents with enterprise-grade identity, RBAC, and lifecycle management[^4]. Foundry IQ is its knowledge platform — a retrieval system that exposes organizational content (architecture reviews, decision records, ADRs, Teams recordings) as MCP tool endpoints that any connected agent can query[^5].

Together they let us build agents that reason across both codebases and the human decisions that produced them.

### Key Capabilities

- **`azd`-based deployment** — `azd ai agent init` + `azd deploy` handles containerization, ACR push, RBAC, and Entra ID assignment in a single workflow
- **MCP toolbox interface** — Foundry IQ knowledge bases are accessed as MCP tool endpoints; the agent authenticates with managed identity, no API keys required
- **Agentic retrieval** — The IQ engine plans multi-step queries, reranks results, and cites sources rather than returning raw search hits
- **Source diversity** — Foundry IQ aggregates across Work IQ (M365), Fabric IQ (data estates), Web IQ, and custom document indexes in a unified retrieval surface[^6]

### Architecture Overview

The architecture follows three clean layers, each answering a different category of question:

```
GitHub Copilot Agent
        │
        ├── GitHub MCP ──────── Implementation memory
        │                       What exists? What changed? How does it work?
        │
        ├── Operational MCPs ─── Operational memory
        │   (Jira, ServiceNow)   What's happening? What action can be taken?
        │
        └── Foundry IQ MCP ───── Organizational memory
                                 Why was it built? Who decided? What constraint existed?
```

Foundry Agent Service sits behind the Foundry IQ MCP endpoint, managing the knowledge base, running the agentic retrieval engine, and handling authentication through Azure-managed identity. The Copilot agent never handles credentials — it calls the MCP tool, the Foundry runtime resolves the knowledge query, and the result flows back as grounded context[^4].

**Official Documentation:**
- 📖 [Quickstart: Deploy your first hosted agent](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent) — Core setup and `azd` workflow[^4]
- 📖 [Quickstart: Add a Foundry IQ knowledge base to a hosted agent](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent) — Knowledge base + toolbox wiring[^5]

---

## 📦 Key Artifacts

### Primary Artifacts

- **`azure.yaml`** — Hosted agent deployment manifest: defines the project, model, source, and environment variables for `azd deploy`
- **`setup-foundry-iq.py`** — Provisions a Foundry IQ knowledge base: creates the AI Search index, seeds source documents, registers the MCP toolbox endpoint
- **`combined-context-agent.py`** — The organizational memory pattern: wires GitHub MCP + Foundry IQ MCP into a single agent reasoning loop
- **`context-layer-reference.md`** — Quick-reference card: which context layer to reach for, what questions each answers

### Supporting Files

- **[`examples/`](examples/)** — Complete working examples ready to copy
- **[Microsoft Foundry Agent Samples](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents)** — Official baseline samples including the Foundry IQ toolbox example[^7]

---

## 🎯 Mental Model Shift

> **The Core Insight:** GitHub answers "What?" — Foundry answers "Why?" — and the separation is the point.

The temptation when reaching for Foundry is to think of it as "more context." That framing undersells it and overpromises it simultaneously. The cleaner model:

- **GitHub** = System of implementation — evidence of what was built, when, by whom
- **Foundry IQ** = System of justification — evidence of why decisions were made, what alternatives were rejected, what constraints existed

These are fundamentally different things. A codebase can be perfectly legible and completely opaque about intent at the same time.

### Move Toward (Embrace These Patterns)

- ✅ **Composable context providers**: Wire GitHub MCP + Foundry IQ MCP as separate tools in a single agent → each provider stays authoritative in its own domain
- ✅ **Intent-first issue creation**: When an agent surfaces a potentially stale decision, create a validation issue rather than modifying code → avoids archaeology-driven incidents
- ✅ **Managed identity for knowledge access**: Use Entra ID and the MCP toolbox interface throughout → no credential management in agent code

### Move Away From (Retire These Habits)

- 🔄 **Embedding organizational docs in the repo**: README archaeology is a fragile pattern → move decision records into indexed Foundry IQ sources where they're retrievable at query time
- 🔄 **Building one massive agent**: Agents that try to know everything become maintenance burdens → lean on composable providers, each doing one thing well
- 🔄 **Adding Foundry to every agent**: Most coding agents don't need organizational memory → add it only when intent problems actually appear

### Move Against (Active Resistance)

- 🛑 **Changing code without recovering intent**: The most expensive mistakes in legacy systems come from removing things whose purpose wasn't understood → always query organizational context before touching "obviously wrong" code
- 🛑 **Storing credentials in agent code**: Foundry's managed identity model exists to eliminate this → any agent passing API keys to a knowledge base is a security regression

> **What This Looks Like:** A principal engineer asks a Copilot agent: "Is this fraud bypass still intentional?" The agent calls GitHub MCP, surfaces the PR history, then calls Foundry IQ MCP, retrieves the March 2023 architecture review, and responds: "The original constraint was fraud service latency. The fraud platform migration completed Q4 2023. This exception may no longer be required — create a validation issue?"

---

## When to Use This Pattern

### Decision Tree

```
Q: Is the agent encountering questions about WHY the software was built?
├─ No → Stay in GitHub
│  └─ GitHub MCP + operational MCPs cover 90-95% of coding agent work
│
├─ Yes → Is the organizational memory documented somewhere?
│  ├─ No → Foundry IQ won't help yet; consider capturing decisions going forward
│  └─ Yes → Is that content indexed in a Foundry IQ knowledge base?
│     ├─ No → Run setup-foundry-iq.py to provision and index it
│     └─ Yes → Wire the Foundry IQ MCP tool → intent questions become answerable
│
Q: Does the agent need enterprise-grade identity and RBAC in production?
├─ Yes → Use Foundry Agent Service for hosting (azd deploy)
└─ No → A local prototype may be sufficient to validate the pattern first
```

### Use This Pattern When

- Teams say things like "nobody remembers why this exists" or "the architect retired"
- Onboarding new engineers who lack institutional context on a complex system
- Evaluating technical debt where the original business driver is unclear
- Planning migrations where historical constraints might still apply

### Don't Use This Pattern When

- The work is purely code generation, review, or refactoring — GitHub Copilot alone is sufficient
- Organizational memory doesn't exist in any accessible form — indexing noise adds cost without value
- The team is early-stage with no legacy decision history to recover

### Comparison with Related Approaches

| Aspect | GitHub MCP alone | GitHub + Foundry IQ | Foundry standalone |
|--------|-----------------|--------------------|--------------------|
| **Best For** | Code-centric agents | Agents that hit intent problems | Non-GitHub workloads |
| **Answers** | What / How / Who | What + Why + Who decided | Enterprise knowledge search |
| **Setup Complexity** | Low | Moderate | Low–Moderate |
| **When to Reach For** | Always start here | When "why?" questions appear | When GitHub isn't the center |

---

<!-- 🎬 MAJOR SECTION: The Two Memories -->
## The Two Memories: Implementation vs. Organizational Context

Every engineering system accumulates two kinds of memory, and they decay at very different rates.

**Implementation memory** lives in the repo. It's durable, queryable, and gets richer over time. Git history, PRs, issues, CI results — this is what GitHub Copilot is optimized to reason about. When an agent needs to understand what a system does, how it works, or what changed last Tuesday, implementation memory is the right source[^1].

**Organizational memory** lives in conversations, reviews, and decisions. It's fragile. People leave. Meetings end and recordings expire. The Teams thread that explains why the architecture looks the way it does gets buried under thousands of subsequent messages. Decision records, when they exist at all, are often disconnected from the code they influenced[^3].

The practical consequence: technical debt is frequently not caused by bad code. It's caused by lost justification. Once the "why" disappears, everything in the codebase looks arbitrary — and engineers start removing things they shouldn't, because they have no way to know whether there was a reason.

### The Three-Layer Model

```
Layer                   Provider              Questions Answered
──────────────────────────────────────────────────────────────────
Implementation Context  GitHub MCP            What exists? What changed? Who changed it?
Operational Context     Jira / ServiceNow MCP What's happening? Can I take action?
Intent Context          Foundry IQ MCP        Why? Who decided? What was rejected?
```

The third layer is used rarely — but when it's needed, it's often the most important piece of information in the system. The value of organizational memory is not that it's always relevant; it's that when it's relevant, recovering it manually can cost days.

### Context Layer Quick Reference

```markdown
# context-layer-reference.md

## Which Context Layer Do We Need?

| If the question is...                           | Reach for...     |
|------------------------------------------------|-----------------|
| What does this code do?                         | GitHub MCP      |
| When was this changed, and by whom?             | GitHub MCP      |
| What PR introduced this behavior?               | GitHub MCP      |
| What ticket tracks this feature?                | GitHub MCP      |
| Is there an open incident related to this?     | Operational MCP |
| Can I create a ticket for this finding?        | Operational MCP |
| Why was this architectural decision made?      | Foundry IQ MCP  |
| What alternatives were considered?             | Foundry IQ MCP  |
| Who approved this exception, and why?          | Foundry IQ MCP  |
| Is this technical debt intentional?            | Foundry IQ MCP  |
```

---

<!-- 🎬 MAJOR SECTION: Deploying a Hosted Agent -->
## Deploying a Foundry Hosted Agent

Foundry Agent Service deploys containerized agents with dedicated Entra ID and RBAC. The `azd` workflow handles everything from containerization to ACR push to role assignment in a single command[^4].

### Prerequisites

```bash
# Install azd and the Foundry extension
winget install microsoft.azd           # Windows; use brew on macOS/Linux
azd ext install microsoft.foundry

# Python dependencies for the agent runtime
pip install "azure-ai-projects>=2.3.0" azure-identity python-dotenv

# Authenticate
az login
azd auth login
```

### Project Initialization

```bash
# Initialize from the official Foundry samples baseline
azd ai agent init \
  -m "https://github.com/microsoft-foundry/foundry-samples/blob/main/samples/python/hosted-agents/agent-framework/responses/01-basic/azure.yaml" \
  --deploy-mode code
```

The init wizard prompts for agent name, Foundry project, tenant, subscription, region, and model deployment. It creates the project scaffold with a working `azure.yaml`[^7].

### The `azure.yaml` Manifest

This is the primary artifact that `azd deploy` reads. Every hosted agent needs one.

```yaml
# azure.yaml — Foundry hosted agent deployment manifest
name: org-memory-agent
metadata:
  description: "GitHub Copilot agent with Foundry IQ organizational memory"

services:
  agent:
    host: azure.ai.agent
    project: my-foundry-project
    source: ./src
    environment: python
    model:
      name: gpt-4.1
      deployment: gpt-4.1-deployment
    endpoint: /api/agent
    env:
      - key: GITHUB_MCP_ENDPOINT
        value: ${GITHUB_MCP_ENDPOINT}
      - key: TOOLBOX_ENDPOINT
        value: ${TOOLBOX_ENDPOINT}

dependencies:
  - name: model
    host: azure.ai.model
    deployment: gpt-4.1-deployment
    location: eastus
```

**Key Points:**
- `host: azure.ai.agent` signals to `azd` that this is a Foundry hosted agent — not a Function or Container App
- The `env` block maps environment variables the agent runtime resolves at startup; `TOOLBOX_ENDPOINT` is how the agent discovers the Foundry IQ MCP tool
- `azd deploy` builds the container, pushes it to ACR, registers the agent with a dedicated Entra ID, and wires RBAC assignments — no manual portal steps required[^4]

### Deploy

```bash
azd up        # provision infrastructure + deploy agent (first time)
azd deploy    # redeploy after code changes
```

---

<!-- 🎬 MAJOR SECTION: Connecting Foundry IQ -->
## Connecting Foundry IQ as Organizational Memory

Foundry IQ turns a collection of documents — architecture reviews, meeting recordings, ADRs, decision records — into a queryable MCP endpoint. The hosted agent calls it like any other tool[^5].

### Provisioning the Knowledge Base

```python
# setup-foundry-iq.py — provision and register a Foundry IQ knowledge base
import os
from pathlib import Path
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient


def provision_knowledge_base(
    project_endpoint: str,
    index_name: str,
    data_directory: str,
    kb_name: str = "org-decisions-kb"
) -> str:
    """
    Creates an AI Search index, seeds it with documents from data_directory,
    and registers a Foundry IQ knowledge base.
    Returns the MCP toolbox endpoint URL.
    """
    credential = DefaultAzureCredential()
    client = AIProjectClient(endpoint=project_endpoint, credential=credential)

    # Create the knowledge base with auto-indexing enabled
    kb = client.knowledge_bases.create(
        name=kb_name,
        description="Architecture reviews, ADRs, and decision records",
        index_name=index_name,
        auto_refresh=True          # keeps the index current as documents update
    )

    # Seed with documents from the provided directory
    for doc_path in Path(data_directory).glob("**/*"):
        if doc_path.suffix in {".md", ".pdf", ".docx", ".txt"}:
            with open(doc_path, "rb") as f:
                client.knowledge_bases.upload_document(kb.id, f, doc_path.name)
            print(f"Indexed: {doc_path.name}")

    # Register the MCP toolbox endpoint — agent uses Entra ID, no API keys
    toolbox = client.toolboxes.create(
        name=f"{kb_name}-toolbox",
        knowledge_base_id=kb.id,
        auth_type="managed_identity"
    )

    print(f"\nKnowledge base ready. MCP endpoint: {toolbox.url}")
    return toolbox.url


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Provision a Foundry IQ knowledge base")
    parser.add_argument("--project", required=True, help="Foundry project endpoint URL")
    parser.add_argument("--index", required=True, help="AI Search index name")
    parser.add_argument("--data", required=True, help="Directory containing documents to index")
    parser.add_argument("--name", default="org-decisions-kb", help="Knowledge base name")
    args = parser.parse_args()

    endpoint = provision_knowledge_base(args.project, args.index, args.data, args.name)
    print(f"\nAdd to azure.yaml env section:\n  TOOLBOX_ENDPOINT: {endpoint}")
```

**Key Points:**
- `auth_type="managed_identity"` means the deployed agent authenticates with its Foundry-assigned Entra ID — no secrets to rotate[^5]
- `auto_refresh=True` keeps the index current as new decision records are added
- The script prints the `TOOLBOX_ENDPOINT` value to paste into `azure.yaml` — this MCP URL is everything the agent needs at runtime

### What to Index

The quality of organizational memory scales directly with the quality of indexed sources:

| Source Type | Signal | Example |
|------------|--------|---------|
| Architecture Decision Records (ADRs) | Why X was chosen over Y | `docs/decisions/ADR-042-kafka-vs-servicebus.md` |
| Architecture review notes | What constraints existed at the time | Teams meeting recordings + transcripts |
| RFC documents | What alternatives were rejected | `docs/rfcs/RFC-2023-fraud-platform.md` |
| Engineering postmortems | What failures shaped the current design | Incident review documents |
| Onboarding guides | What context new engineers consistently need | `docs/onboarding/platform-overview.md` |

---

<!-- 🎬 MAJOR SECTION: The Organizational Memory Pattern -->
## The Organizational Memory Pattern

With the hosted agent deployed and Foundry IQ provisioned, both are wired together into the core pattern: an agent that calls GitHub MCP for implementation context and Foundry IQ MCP for organizational context in a single reasoning loop.

```python
# combined-context-agent.py — organizational memory pattern
import os
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
from azure.ai.projects.models import AgentRuntime, ToolDefinition, McpTool


def create_org_memory_agent(project_endpoint: str) -> AgentRuntime:
    """
    Creates an agent with two context tools:
    - GitHub MCP:    implementation memory (what the code does)
    - Foundry IQ MCP: organizational memory (why it was built)
    """
    credential = DefaultAzureCredential()
    client = AIProjectClient(endpoint=project_endpoint, credential=credential)

    # GitHub MCP — implementation memory
    github_tool = McpTool(
        name="github",
        server_url=os.environ["GITHUB_MCP_ENDPOINT"],
        description="Query GitHub for code, PRs, issues, and commit history"
    )

    # Foundry IQ MCP — organizational memory
    foundry_iq_tool = McpTool(
        name="org_memory",
        server_url=os.environ["TOOLBOX_ENDPOINT"],
        description=(
            "Query organizational records for architecture decisions, "
            "design rationale, and historical context"
        )
    )

    agent = client.agents.create(
        name="org-memory-agent",
        model="gpt-4.1-deployment",
        instructions="""
You have access to two context sources:

1. github — use this to understand what code exists, what changed, and when.
   Call this first for any code-level question.

2. org_memory — use this to understand WHY decisions were made.
   Call this when implementation context alone is insufficient to answer
   questions about design intent, historical constraints, or architectural choices.

When you find evidence that a historical justification may no longer apply,
surface it clearly and offer to create a tracking issue.
        """,
        tools=[
            ToolDefinition(tool=github_tool),
            ToolDefinition(tool=foundry_iq_tool)
        ]
    )

    return agent


def query_agent(agent_id: str, question: str, project_endpoint: str) -> str:
    """Run a question through the organizational memory agent."""
    credential = DefaultAzureCredential()
    client = AIProjectClient(endpoint=project_endpoint, credential=credential)

    thread = client.agents.threads.create()
    client.agents.messages.create(
        thread_id=thread.id,
        role="user",
        content=question
    )

    run = client.agents.runs.create_and_process(
        thread_id=thread.id,
        agent_id=agent_id
    )

    messages = client.agents.messages.list(thread_id=thread.id)
    return messages[-1].content[0].text.value


if __name__ == "__main__":
    endpoint = os.environ["AZURE_AI_PROJECT_ENDPOINT"]
    agent = create_org_memory_agent(endpoint)

    # The canonical "Why does this code exist?" query
    response = query_agent(
        agent.id,
        "Why does the checkout service bypass fraud checks for premium customers? "
        "Is there a documented reason, and is it still valid?",
        endpoint
    )
    print(response)
```

**Key Points:**
- The agent instructions explicitly tell the model *when* to call each tool: GitHub first for implementation context, Foundry IQ when intent questions arise
- Both tools use MCP — there's no different code path for different providers[^5]
- The standing directive to "surface stale justifications and offer to create a tracking issue" turns organizational memory into action, not just information

### The Agent Reasoning Loop

When asked "Why does the checkout service bypass fraud checks for premium customers?", the agent:

1. **Calls `github`** — finds PR #413, the commit history, the linked issue
2. **Recognizes the context is incomplete** — knows *what* but not *why*
3. **Calls `org_memory`** — retrieves the March 2023 architecture review
4. **Synthesizes** — combines implementation evidence with decision rationale
5. **Evaluates currency** — notes the fraud platform migration referenced in the decision completed Q4 2023
6. **Proposes action** — offers to create a validation issue

This loop is what distinguishes organizational memory from retrieval. The agent isn't just searching — it's reasoning about the *relationship* between current code and historical intent.

---

<!-- 🎬 MAJOR SECTION: Recognizing Intent Problems -->
## Recognizing Intent Problems: The 5–10% Sweet Spot

Foundry IQ adds genuine value for a specific class of problems. Recognizing them is half the work.

### Signal Words to Listen For

These phrases in customer or team conversations indicate an intent problem — the space where organizational memory becomes valuable:

| Signal Phrase | What It Likely Means |
|--------------|---------------------|
| "Nobody remembers why this exists" | Lost implementation rationale |
| "The architect who built this retired" | Key institutional context is gone |
| "We're afraid to touch this" | Unknown constraints, unknown risk |
| "It works, we just don't know why" | Undocumented behavior |
| "Why are there six databases?" | Accumulated decisions without audit trail |
| "We need to onboard new engineers fast" | Intent recovery at scale |
| "This migration keeps hitting surprises" | Historical constraints blocking progress |

### The 5–10% Rule

For most GitHub Copilot deployments, organizational memory is irrelevant:

- **90–95% of coding agent work** — Code generation, review, refactoring, test creation, PR automation, documentation: GitHub MCP alone covers these
- **5–10% of coding agent work** — Questions that require understanding *why* the organization made past decisions: intent problems, where Foundry IQ pays off[^3]

The 5–10% framing prevents both over-indexing (adding Foundry to every agent) and under-indexing (dismissing Foundry because "we do code, not enterprise search"). When intent matters, it matters a lot. When it doesn't, GitHub alone is the right answer.

### Estimating Value

The value of organizational memory scales with:

| Factor | Lower Value | Higher Value |
|--------|-------------|--------------|
| **System age** | < 2 years | 5+ years, especially with team turnover |
| **Architecture complexity** | Simple, well-documented | Multiple subsystems, historical tradeoffs |
| **Decision documentation** | Little documented | ADRs, RFCs, design reviews exist |
| **Team continuity** | Stable team, knowledge intact | High turnover, "nobody remembers" |
| **Stakes of misunderstanding** | Low-cost mistakes | Compliance, security, or contractual risk |

When the right column describes the situation, Foundry IQ is worth adding. When the left column dominates, GitHub Copilot alone is the correct answer[^3].

---

## Real-World Use Cases

### Use Case 1: Legacy Migration Planning Agent

**The Scenario:** An engineering team is migrating a 7-year-old payments service to a new platform. The codebase has multiple exception paths — fraud bypasses, rate limits, vendor-specific handling — and no one on the current team was present for the original design decisions.

**How It Works:** The agent calls GitHub MCP to enumerate all special-case branches and exception paths. For each one, it calls Foundry IQ MCP against an index of architecture reviews, postmortems, and ADRs from the service's history. It produces a decision inventory: which exceptions have documented rationale, which appear to be undocumented workarounds, and which were explicitly flagged as temporary.

**What We Get:** Migration planning moves from "exploratory archaeology" (days to weeks per subsystem) to "agent-assisted decision review" (hours). Teams can see, for each exceptional code path, whether the historical justification still applies.

---

### Use Case 2: Engineering Onboarding Agent

**The Scenario:** A senior engineer joins a team with a complex microservices platform. Standard onboarding covers architecture diagrams and README files, but the "why" behind major design choices — service boundaries, communication patterns, technology selections — isn't captured anywhere easily browsable.

**How It Works:** The agent has access to GitHub MCP (for the current codebase) and a Foundry IQ knowledge base indexing engineering wiki pages, RFC documents, and architecture review recordings. When the engineer asks "Why do we use synchronous calls between these two services when everything else is async?", the agent retrieves the relevant RFC discussion from 2021.

**What We Get:** Answers that previously required tracking down specific people are available on-demand. Time-to-productivity for new engineers can improve measurably.

---

### Use Case 3: Technical Debt Evaluation Agent

**The Scenario:** Engineering leadership wants to understand which technical debt items are genuinely risky to address vs. which are purely cosmetic. The concern is that some debt exists for compliance, contractual, or security reasons that aren't obvious from the code.

**How It Works:** The agent reviews open technical debt issues via GitHub MCP, then cross-references each against Foundry IQ's index of compliance reviews, security decisions, and vendor agreements. Items with active organizational justifications are flagged; items with expired or unclear justifications are surfaced for review.

**What We Get:** A prioritized technical debt backlog with confidence signals — "This pattern exists due to a vendor SLA in place through 2027" vs. "This pattern has no documented rationale and can be safely refactored."

---

### Use Case 4: Compliance-Aware Code Review

**The Scenario:** A PR modifies a subsystem that was, years ago, subject to specific regulatory requirements. The current reviewer doesn't know this, and the code comment just says "DO NOT CHANGE — see Alice."

**How It Works:** The agent calls GitHub MCP to understand the PR diff and affected code paths. When it encounters the constraint comment, it calls Foundry IQ MCP against a knowledge base including compliance review records. It retrieves the original regulatory requirement and evaluates whether the current compliance posture still applies.

**What We Get:** PR reviews that surface compliance relevance before a potentially problematic change is merged — not after.

---

## What We Can Do Today

### 15 Minutes

- [ ] Read both quickstarts: [Deploy your first hosted agent](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent)[^4] and [Add Foundry IQ to a hosted agent](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent)[^5]
- [ ] Map a current or planned agent stack against the three-layer model: implementation / operational / intent
- [ ] Identify one signal phrase from the "Recognizing Intent Problems" table that matches a real situation

### 1 Hour

- [ ] Install `azd` and the Foundry extension: `azd ext install microsoft.foundry`
- [ ] Run `azd ai agent init` against the basic hosted-agent sample and deploy a working agent[^7]
- [ ] Identify one knowledge source (a document folder, ADR collection, or engineering wiki) that could serve as an initial Foundry IQ index

### 2–4 Hours

- [ ] Run `setup-foundry-iq.py` against a real document collection — even 10–20 ADRs or architecture notes
- [ ] Wire `combined-context-agent.py` with both GitHub MCP and the Foundry IQ toolbox endpoint
- [ ] Test with a real "why does this code exist?" question from an actual codebase
- [ ] Evaluate: did the agent recover intent that would otherwise have required manual research?

---

## Related Patterns

- **GitHub MCP + Copilot Extensions** — The implementation memory layer that Foundry extends
- **Agentic SDLC** — The broader framework within which organizational memory fits as one context layer
- **MCP Apps** — How to expose tools to Copilot agents generally; Foundry IQ follows the same protocol

---

## 📚 References

### Official Documentation

[^1]: **[GitHub Copilot in VS Code — MCP Servers](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)** — How Copilot agents discover and call MCP tools; the same mechanism Foundry IQ uses

[^4]: **[Quickstart: Deploy your first hosted agent — Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent)** — `azd`-based deployment of a containerized Foundry hosted agent with dedicated Entra ID

[^5]: **[Quickstart: Add a Foundry IQ knowledge base to a hosted agent with a toolbox](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent)** — Provisioning Foundry IQ and wiring the MCP toolbox endpoint

[^8]: **[Deploy a hosted agent — Microsoft Foundry how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent)** — Full deployment workflow including RBAC and managed identity setup

[^9]: **[Connect agents to Foundry IQ knowledge bases](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/foundry-iq-connect)** — Connecting knowledge bases as tools with MCP toolbox interface

### Deep-Dive Resources

[^2]: **[From RAG to Agentic Retrieval: Foundry IQ at Ignite 2025](https://medium.com/@pkmsp09/from-rag-to-agentic-retrieval-what-microsofts-foundry-iq-really-introduced-at-ignite-2025-416aafbaa86a)** — What agentic RAG means in practice, including the 40%+ relevance improvement

[^3]: **[Work IQ overview — Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/work-iq/)** — Organizational memory as a service: the M365 intelligence layer that surfaces through Foundry IQ agents

[^6]: **[Foundry IQ System — DeepWiki](https://deepwiki.com/azure-ai-foundry/microsoft-ignite-25-demos/2-foundry-iq-system)** — Architecture breakdown: how Work IQ, Fabric IQ, Web IQ, and custom documents unify in one retrieval surface

[^7]: **[Microsoft Foundry Agent Samples — GitHub](https://github.com/microsoft-foundry/foundry-samples/tree/main/samples/python/hosted-agents)** — Reference implementations including the basic hosted agent and the Foundry IQ toolbox example (sample 17)
