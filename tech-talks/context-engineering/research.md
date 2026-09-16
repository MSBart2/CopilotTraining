---
status: active
updated: 2026-09-15
---

# Copilot Context Engineering Research

## Work Package

- **Work package:** WP6
- **Decision:** Consolidate Copilot Configuration, Memory, and Chat Internals into one replacement candidate.
- **Reader question:** Where should Copilot context live, how should it be encoded, and how do we verify it was used?
- **Artifact:** `.github/copilot-instructions.md`
- **Audience:** Developers, team leads, and platform engineers
- **Format:** 55-minute core talk

## Research Brief

The strongest shared mechanism is not a catalog of customization features. It is a context lifecycle: place information according to owner and lifetime, encode it in the smallest fitting primitive, inspect the observable load and request path, repair the first broken boundary, and promote only context that earns shared authority.

The talk therefore follows one Orders API rule from a developer's repeated preference into a reviewed repository instruction. This preserves the distinct authority, persistence, and diagnostic decisions from all three source talks without presenting memory, instructions, or debugging as interchangeable.

### Judgment This Builds

- **Context:** Match information to owner, scope, lifetime, and task.
- **Verification:** Separate evidence that context loaded from evidence that the result complied.
- **Authority:** Require a named owner and reviewer before personal or experimental context becomes shared policy.

### Content Fitness

| Criterion | Assessment | Evidence |
|---|---|---|
| Relevant | Green | Teams need one decision path across personal memory, repository configuration, and diagnostics. |
| Compelling | Green | The same artifact can be correct in content but wrong in placement, scope, or authority. |
| Actionable | Green | The repository example includes a visible request, expected diagnostic signals, a recovery path, and acceptance evidence. |

## Evidence Map

First-party pages below are the durable verification targets named by the current source catalog. Where a current mechanism cannot be established from that baseline, the talk narrows the claim and marks the UI or availability as variable rather than preserving stale details.

Live web retrieval was unavailable in this work session. Verification dates therefore come from the supplied source talks: configuration was checked on 2026-09-15, memory on 2026-02-01, and debugging mechanisms on 2026-03-05. Claims that require fresher confirmation are labeled directional or variable, and the demo boundary requires a current-doc and installed-build check before delivery.

| Claim or mechanism | First-party source | Confidence | Boundary retained in the talk |
|---|---|---|---|
| Repository-wide and path-specific instruction files provide shared, versioned context; path-specific files use `applyTo`. | https://code.visualstudio.com/docs/copilot/customization/custom-instructions | Verified in current source baseline | Matching determines eligibility. Overlapping instructions can combine; no conflict-resolution precedence is promised. |
| GitHub surfaces support repository custom instructions, with support varying by Copilot feature. | https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot and https://docs.github.com/en/copilot/reference/custom-instructions-support | Verified in current source baseline | A file supported in one surface is not assumed to load in every surface. |
| Prompt files, skills, and custom agents cover reusable tasks, packaged capabilities, and role/tool boundaries. | https://code.visualstudio.com/docs/copilot/customization/prompt-files, https://code.visualstudio.com/docs/copilot/customization/agent-skills, and https://code.visualstudio.com/docs/copilot/customization/custom-agents | Verified in current source baseline | Use the smallest primitive that fits; tool lists bound available actions but do not replace human authorization. |
| Copilot Memory exposes review and deletion controls for stored memories. | https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory | Directional; availability and exact controls can vary by plan and client | The talk makes no fixed retention, automatic inference, cross-client sync, encryption, export, or MCP implementation claim. Confirm the current account UI before a live demo. |
| VS Code exposes chat debugging information for requests and tool activity. | https://code.visualstudio.com/docs/copilot/chat/chat-debug-view | Verified in current source baseline | Treat the view as an implementation diagnostic, not a complete disclosure of provider-side processing or hidden reasoning. |
| Customization diagnostics can reveal loaded customizations and load failures in supported VS Code builds. | https://code.visualstudio.com/docs/copilot/troubleshooting | Verified in current source baseline | Labels, commands, and detail vary by build. The durable test is whether the intended file appears and whether a parse/load error is visible. |
| MCP server status and output logs expose startup, authentication, and tool-call failures. | https://code.visualstudio.com/docs/copilot/customization/mcp-servers | Verified in current source baseline | A healthy server does not prove a tool was selected, authorized, or returned useful data. Inspect the individual tool event. |
| Context windows are finite and long sessions can be compacted. | https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction | Verified in current source baseline | No exact warning threshold, truncation order, or percentage reduction is claimed. Re-anchor required constraints after compaction. |

## Mechanisms Replaced or Retired

| Source claim | Disposition | Rationale |
|---|---|---|
| Memory always expires after 28 days. | Retired | A universal retention period is not established by the current baseline. Use the account's current memory controls and documentation. |
| Memory always syncs across VS Code, GitHub.com, and CLI through an MCP server. | Retired | Delivery and client support can change. The decision concerns personal persistence and user control, not an assumed transport. |
| Personal instructions have a fixed precedence over repository and organization instructions. | Replaced | Scope and applicability are documented; relying on conflict precedence is brittle. Remove contradictions and inspect what loaded. |
| Diagnostics expose complete model context and internal reasoning. | Retired | Client diagnostics expose observable request and tool events, not proof of every provider-side transformation or hidden reasoning. |
| Context truncation follows a fixed five-level order or an 80 percent threshold. | Retired | Model and client behavior vary. Use the current context indicator, compaction controls, and post-compaction validation. |
| Loaded instructions prove model compliance. | Explicitly rejected | Loading is necessary evidence, not sufficient evidence. Validate the produced artifact with deterministic and human checks. |

## Coverage Traceability

| Coverage row | Preserved location | Observable evidence |
|---|---|---|
| `config-team-authority` | README: Place Context by Owner and Lifecycle | Orders API code owner approves the pull request. |
| `config-graduation` | README: Encode with the Smallest Fitting Primitive | The rule moves from chat or memory to repository instructions only after repeated value and review. |
| `config-tool-authority` | README: Bound Tools and Approval | Reviewer is read-only; implementer can edit and test; merge remains human-owned. |
| `memory-placement` | README: Place Context by Owner and Lifecycle | Personal preference and repository policy are contrasted. |
| `memory-lifecycle` | README: Review Personal Memory | Stored preferences are reviewed, corrected, or deleted. |
| `memory-sensitive-data` | README: Reject Sensitive and Transient Data | Secrets, customer data, and temporary debugging state are rejected. |
| `debug-loaded-context` | README: Inspect the Loaded Context | Expected loaded-customization signal names the instruction file. |
| `debug-request-pipeline` | README: Inspect the Request and Tool Path | The example records context reference, tool event, result, and validation. |
| `debug-observability-limit` | README: Prove Compliance Separately | Load evidence is explicitly separated from output compliance. |

## Structural Decision

The approved structure is a single artifact journey:

1. Place context by owner and lifecycle.
2. Encode it with the smallest fitting primitive.
3. Inspect loaded context and the request/tool path.
4. Repair the misroute and verify the result.
5. Promote only proven context through a named reviewer.

No alternate structure is retained because a feature-by-feature arrangement would recreate the catalog overlap this replacement resolves.

## Demo Boundary

The demo uses the UI labels available in the installed VS Code build. Before delivery, the presenter confirms the current commands against the linked documentation. If the loaded-customizations view, request inspector, memory controls, MCP output, or context indicator is absent, the presenter names that availability limit and uses response references plus extension/MCP output as the narrower observable evidence. No substitute is presented as proof of model compliance.
