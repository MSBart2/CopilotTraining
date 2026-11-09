---
status: active
updated: 2026-11-09
section: "Extend and Embed"
audience: [platform-engineer, architect, engineering-leader]
level: advanced
duration: 45
format: case-study
decision: "When is repository context insufficient for organizational knowledge?"
prerequisites: [copilot-sdk]
related: [copilot-azure-mcp, enterprise-patterns]
references:
  - url: https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-overview
    label: "What is a knowledge source? Indexed and remote kinds - Azure AI Search"
    verified: 2026-11-09
  - url: https://learn.microsoft.com/en-us/azure/search/agentic-knowledge-source-how-to-work-iq
    label: "Create a Work IQ knowledge source (preview) - Azure AI Search"
    verified: 2026-11-09
  - url: https://devblogs.microsoft.com/foundry/microsoft-foundry-azure-developer-cli-ga/
    label: "Microsoft Foundry extension for Azure Developer CLI is generally available"
    verified: 2026-11-06
  - url: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/azure-yaml-reference
    label: "azure.yaml reference - Microsoft Foundry"
    verified: 2026-11-06
  - url: https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-how-to-retrieve
    label: "Query a knowledge base via API or MCP - Azure AI Search"
    verified: 2026-11-09
  - url: https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent
    label: "Quickstart: Add a Foundry IQ knowledge base to a hosted agent with a toolbox"
    verified: 2026-11-09
---

# GitHub Copilot with Microsoft Foundry: Organizational Memory for Coding Agents

> **The Question This Talk Answers:**
> *"When does my Copilot agent need organizational memory?"*

**Duration:** 45 minutes | **Audience:** Principal engineers, platform architects, and GitHub solution engineers

**Thesis:** Add an organizational-memory provider only when a consequential why-question needs evidence beyond the repository; keep permission, verification, and human approval distinct.

## Present and Study

- **[Open the native deck](../../slides/tech-talks/copilot-with-foundry/index.html)**: 27 slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-with-foundry/notes.html)**: talk track, artifact details, evidence boundaries, first-party sources, and per-slide timing.

The deck and notes are the teaching source in [`slides.js`](../../slides/tech-talks/copilot-with-foundry/slides.js). The supplied PR, dates, migration facts, and response excerpts are explicitly illustrative; this conversion contains no observed deployment or agent run. Setup and SDK details are snapshots to verify against current first-party documentation.

## 1. The Two Memories

Trace what repository evidence can establish, distinguish it from organizational rationale, and route the question to the authority that owns the answer.

## 2. Connecting Foundry IQ

Treat Foundry as infrastructure: `azd provision` and a postprovision hook build the knowledge base, crawl the decision records, and output one MCP endpoint for Copilot. Copilot stays the only agent and calls as the developer, so identity, read access, and human approval stay separate.

## 3. The Organizational Memory Pattern

Compare repository-only evidence with a retrieved decision excerpt, check the source date against current state, and stop at a proposal for owner review. Expect the connection to surface more than the answer: expired time-boxes, unfinished follow-ups, and conflicting guidance, each routed to its owner.

## 4. Recognizing Intent Problems

Listen for the why-questions your team already asks, route each one to the place that can answer it, and run four readiness checks, none of which need Foundry, before piloting one source for two weeks.

## What You Can Do Today

### Today

- **Try:** Pick one real why-question from an active repository workflow and identify its authoritative decision source.
- **Expected signal:** The source has an owner, date, scope, and a review condition that can be inspected.
- **Validate:** Compare the source with the current system state and ask the accountable owner to confirm its relevance.

### This Week

- **Build:** Compare a repository-only response with a response that has read access to a bounded, approved organizational source.
- **Expected signal:** Citations identify the source and date; misses, false matches, and changed decisions are recorded.
- **Validate:** Review the evidence and permission scope with the source owner; keep the run proposal-only.

### This Month

- **Pilot:** Test a scoped workflow with a local task sample, an owner, and an explicit stop condition.
- **Success measure:** Collect local evidence on task frequency, citation correctness, freshness, false matches, reviewer effort, and decision impact; these are measures to collect, not achieved results.
- **Boundary:** Pause expansion when the source is stale, access is unclear, evidence conflicts, or a required human approval is missing.

### Apply It to Your Work

- **Candidate task:** A real code change whose rationale affects migration, operations, compliance, or service ownership.
- **Decisive context:** The code history, current system state, authoritative decision record, and the source's owner and scope.
- **Delegation and authority:** Let the agent request approved read tools and draft a proposal; the resource owner grants access and the designated human reviewer approves any consequential change.
- **Evidence:** Preserve source citations and dates, verify current conditions, and record the reviewer decision and recovery path.

## Key Artifacts

- **[`azure.yaml` deployment manifest](../../slides/tech-talks/copilot-with-foundry/notes.html#deployment-manifest)**: Foundry project and model deployment plus a postprovision hook that builds the knowledge base and outputs its MCP endpoint; no hosted agent.
- **[Knowledge sources](../../slides/tech-talks/copilot-with-foundry/notes.html#source-quality)**: which decision records to crawl into the index and which Microsoft 365 sources to query live.
- **[`org-memory.agent.md` Copilot agent file](../../slides/tech-talks/copilot-with-foundry/notes.html#agent-tools)**: GitHub and Foundry IQ MCP servers, routing instructions, and the `mcp.json` entry for the knowledge base endpoint.
- **[`context-layer-reference.md` question router](../../slides/tech-talks/copilot-with-foundry/notes.html#context-router)**: question-to-provider guide preserved in the deck and notes.
- **[Foundry IQ quickstart](https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-foundry-iq-hosted-agent)**: the first-party `azd provision` and postprovision-hook flow; this talk stops before its hosted-agent steps.

## Related Patterns

- **[Copilot with Azure MCP](../copilot-azure-mcp/README.md)**: complementary tool-provider and permission patterns.
- **[Enterprise Patterns](../enterprise-patterns/README.md)**: broader authority and governance context.

## References

First-party sources for setup and tool behavior are listed in the [speaker notes](../../slides/tech-talks/copilot-with-foundry/notes.html) and `references` frontmatter above.
