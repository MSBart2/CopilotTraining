---
status: active
updated: 2026-10-31
section: "Extend and Embed"
audience: [platform-engineer, architect, security]
level: applied
duration: 45
format: case-study
decision: "How can agents act on live domain state with least-privilege authority?"
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
> *"How do I use Azure context without handing over the decision?"*

**Duration:** 45 minutes | **Audience:** Azure developers, platform engineers, cloud architects, and security practitioners

**Thesis:** Azure context can inform a reviewable infrastructure proposal when scope, evidence, identity, and human authority remain explicit.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-azure-mcp/index.html)**: 32 animated slides. Press `N` to open the notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-azure-mcp/notes.html)**: talk track, scenario boundaries, evidence notes, first-party sources, and per-slide timing. The notes are the handout and teaching source.

The source README's deployment transcripts, configuration examples, and named inline artifacts are represented in the slides and notes as illustrative material; they are not claims of live results or separately published configuration files. Product and service details are time-sensitive. The Skills-in-Plan-Mode question remains unverified, and the conversion performed no Azure access or provisioning.

## 1. Query Azure with Live Context

See how a scoped question can return structured resource context. Carry the identity, subscription, requested fields, and query time with the answer; inspect the result before using it as a template.

## 2. Plan Before Any Change

Use the source's payments API scenario to surface region, plan, database, network, and scale assumptions. Treat the sample checks, generated Bicep, and 45-to-8-minute comparison as illustrative or unmeasured, not observed.

## 3. Compose Skills, MCP, and Azure

Trace workflow guidance, tool discovery and calls, server credentials, and Azure authorization as separate responsibilities. Verify installation commands and capabilities against the current host and server documentation.

## 4. Keep Authority Explicit

Separate authentication, Azure authorization, host confirmation, service-owner approval, and deployment. Use a scoped identity and approved environment; pause when evidence or authority is unclear.

## What You Can Do Today

### Today

- **Try:** Ask one bounded, read-only question in a subscription your organization already approves.
- **Expected signal:** The answer identifies the resource and returns the fields the question requested.
- **Validate:** Record the principal, subscription, query time, and source; compare one result with an approved Azure view.

### This Week

- **Build:** Map one production-read and development-write workflow, with distinct identities and review owners.
- **Expected signal:** A reviewer can identify the selected server, environment, role scope, expected output, and stop condition.
- **Validate:** Review the host configuration and role assignments with the relevant platform or service owner.

### This Month

- **Pilot:** Compare one scoped query-and-proposal workflow with the existing process in an authorized non-production environment.
- **Success measure:** Record comparable task time, evidence quality, rework, and approvals; treat any target as a target until measured.
- **Boundary:** Stop before provisioning when identity, scope, cost, policy, or review ownership is unclear.

### Apply It to Your Work

- **Candidate task:** A real Azure resource discovery or infrastructure review that begins with a read-only query.
- **Decisive context:** Subscription and resource scope, service constraints, team conventions, and current state.
- **Delegation and authority:** Copilot may help query and draft; the configured principal limits tool actions; the service owner approves changes through the team's deployment path.
- **Evidence:** A timestamped result, reviewed configuration diff, validation output, and named owner determine whether to keep, adjust, or stop the pattern.

## Key Artifacts

- **[Hands-on walkthrough](examples/walkthrough.md):** Source companion covering MCP connection, resource queries, Plan Mode, configuration scaffolding, and background audit concepts. Treat its transcripts as examples; verify current commands and permissions before any use.
- **[Deck teaching source](../../slides/tech-talks/copilot-azure-mcp/slides.js):** Slide claims, notes, cue, facts, evidence links, and timing.
- **[Speaker handout](../../slides/tech-talks/copilot-azure-mcp/notes.html):** Presenter-ready notes with the limits and status of each example.

The original README's `interactive-azure-query-session.md`, `plan-mode-deployment-workflow.md`, `azure-mcp-config.json`, and `rbac-scoped-setup.md` were inline examples, not separate files. Their useful decision points and limitations now live in the deck notes.

## Related Patterns

- **[GitHub Copilot CLI](../copilot-cli/README.md):** Terminal-native workflows, Plan Mode, and cloud delegation.
- **[MCP Apps](../mcp-apps/README.md):** Building custom MCP servers for internal tools.
- **[GitHub Copilot with Foundry](../copilot-with-foundry/README.md):** Complementary Azure AI Foundry work.
- **[MCP Servers workshop](../../workshop/05-mcp-servers/):** Hands-on protocol and server configuration practice.

## References

First-party reference links and their recorded verification dates are retained in the frontmatter; slide-specific evidence links appear in the [speaker notes](../../slides/tech-talks/copilot-azure-mcp/notes.html).
