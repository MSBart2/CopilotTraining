---
status: active
updated: 2026-09-15
portfolioState: deployed
section: "Choose and Configure"
audience: [developer, team-lead, platform-engineer]
level: applied
duration: 55
format: core-talk
decision: "Where should Copilot context live, how should it be encoded, and how do we verify it was used?"
prerequisites: [surfaces]
related: [agent-dev-loop, copilot-hooks, enterprise-patterns]
references:
  - url: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
    label: "Use custom instructions in VS Code"
    verified: 2026-09-15
  - url: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
    label: "Adding repository custom instructions for GitHub Copilot"
    verified: 2026-02-08
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory
    label: "Copilot Memory"
    verified: 2026-02-01
  - url: https://code.visualstudio.com/docs/copilot/chat/chat-debug-view
    label: "Chat Debug View"
    verified: 2026-03-05
  - url: https://code.visualstudio.com/docs/copilot/troubleshooting
    label: "Troubleshoot AI in VS Code"
    verified: 2026-03-05
  - url: https://code.visualstudio.com/docs/copilot/customization/mcp-servers
    label: "Use MCP servers in VS Code"
    verified: 2026-03-05
  - url: https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction
    label: "Manage context for AI"
    verified: 2026-03-05
---

# Copilot Context Engineering

> **The Question This Talk Answers:**
> *"Where should Copilot context live, how should it be encoded, and how do we verify it was used?"*

**Duration:** 55 minutes | **Target Audience:** Developers / Team Leads / Platform Engineers

---

## Content Fitness

| Criterion | Assessment | Notes |
|---|---|---|
| **Relevant** | Green | Context now spans personal memory, repository files, reusable workflows, agent tools, and live request state. |
| **Compelling** | Green | Correct information can still fail when it has the wrong owner, lifetime, scope, or evidence path. |
| **Actionable** | Green | One repository instruction travels from repeated preference to reviewed policy with observable load and compliance checks. |

**Overall Status:** Green - ready to use

---

## The Opportunity

Context engineering turns Copilot customization into a lifecycle rather than a collection of files. A team can decide who owns a fact, how long it remains useful, which requests need it, and what evidence confirms that it affected the work.

This unlocks a practical operating model:

- Personal preferences remain user-controlled and reviewable.
- Shared rules live in version control with a named reviewer.
- Reusable work graduates only when repetition justifies a stronger primitive.
- Diagnostics locate a broken load, request, or tool path before prompts are rewritten.
- Deterministic checks and human review prove the result independently of configuration loading.

The artifact journey follows one rule for an Orders API: domain operations return `Result<T, OrderError>`, while HTTP mapping stays in the route adapter. The rule begins as repeated context, is placed and encoded, fails once because its scope is wrong, then becomes reviewed repository guidance only after the team can verify both loading and output.

---

## How It Works: A Context Lifecycle

Every context item carries four design properties:

| Property | Decision |
|---|---|
| **Owner** | Is this an individual's preference, a repository policy, or an organizational control? |
| **Lifetime** | Does it last for one request, several sessions, or the life of the codebase? |
| **Selector** | Does it apply everywhere, to a path, to an invoked task, or to one agent role? |
| **Evidence** | What observable signal proves loading, execution, and acceptance? |

Context then moves through five stages:

1. **Place** by owner and lifecycle.
2. **Encode** with the smallest fitting primitive.
3. **Inspect** loaded customizations and the request/tool path.
4. **Repair and verify** the first failed boundary.
5. **Promote** only after repeated value and owner approval.

These stages are intentionally separate. A loaded file proves that one delivery step worked. It does not prove that the model followed every instruction, that a tool returned authoritative data, or that the result is acceptable.[^1][^4]

---

## Key Artifacts

### Primary Artifacts

- **[`examples/.github/copilot-instructions.md`](examples/.github/copilot-instructions.md)** - The Orders API rule after it earns repository scope, review ownership, and explicit verification steps.
- **[`examples/selectors/orders-context.broken.instructions.md`](examples/selectors/orders-context.broken.instructions.md)** - The valid rule with a selector that excludes the Orders task.
- **[`examples/selectors/orders-context.fixed.instructions.md`](examples/selectors/orders-context.fixed.instructions.md)** - The repaired selector used to verify eligible loading before output checks.

### Observable Evidence

- A visible task request naming the Orders API file and acceptance criteria.
- A loaded-customization signal naming `.github/copilot-instructions.md`.
- A request/tool trace recording file reads, edits, and test execution.
- Test, type-check, diff, and reviewer evidence proving compliance separately.

---

## Mental Model Shift

> **The Core Insight:** Context earns trust through correct placement, bounded authority, and observable verification, not through persistence alone.

### Move Toward

- **Place before writing:** Decide owner, lifetime, selector, and reviewer before choosing a file or feature.
- **Use the smallest fitting primitive:** Keep one-off facts in the request; promote repeated, shared rules into reviewed repository files.
- **Verify in layers:** Check loading, inspect tool activity, validate the artifact, then obtain the required approval.
- **Review persistence:** Inspect personal memory and shared instructions on a regular trigger such as a release, ownership change, or policy update.

### Move Away From

- **Duplicated guidance:** One rule copied into memory, instructions, prompts, and agents creates conflict without adding authority.
- **Feature-first configuration:** Starting with an agent or skill before the task is stable makes the context harder to inspect and maintain.
- **Prompt-only debugging:** Rewording a request before checking loaded context and tool failures hides the actual broken stage.

### Move Against

- **Sensitive persistence:** Credentials, tokens, customer records, production payloads, and private incident details remain outside prompts, memory, and repository examples.
- **Implicit authority:** A personal preference cannot become team policy without the repository owner's review.
- **Compliance by assumption:** A loaded instruction is never acceptance evidence for generated code.

---

## When to Use Each Context Primitive

```text
Q: Who owns this information, and how long must it live?
|
+-- One request or experiment
|   `-- Put it in the request with explicit files and acceptance evidence.
|
+-- One person's durable preference
|   `-- Use personal memory when available; review and delete it through current account controls.
|
+-- Shared repository rule
|   +-- Applies broadly -> .github/copilot-instructions.md
|   `-- Applies to matching files -> .github/instructions/*.instructions.md with applyTo
|
+-- Repeated, human-invoked task
|   `-- Use a prompt file.
|
+-- Proven capability with scripts or resources
|   `-- Use a skill.
|
`-- Specialized role with bounded tools
    `-- Use a custom agent; keep approval outside the tool list.
```

### Boundaries Worth Knowing

- Memory availability, scope, and controls vary by plan and client. The current product documentation and account UI are the authority.[^3]
- Path matching makes an instruction eligible; it does not make contradictory guidance resolve predictably. Remove conflicts instead of depending on precedence.[^1]
- A tool allowlist constrains available actions, but repository permissions and human approval remain separate authority boundaries.[^6]
- MCP server health does not prove tool selection or useful output. Inspect the individual invocation and result.[^6]
- Context capacity varies by model and session. Avoid fixed thresholds or truncation-order assumptions; use the current indicator and validate after compaction.[^7]

---

<!-- 🎬 MAJOR SECTION: Place Context -->
## Place Context by Owner and Lifecycle

The Orders API rule first appears during a review: “Domain operations return `Result<T, OrderError>`; route adapters map errors to HTTP.” Before encoding it, the team classifies it.

| Candidate home | Fit | Decision |
|---|---|---|
| Current request | Good for trying the rule once | Start here while the rule remains experimental. |
| Personal memory | Good only if this is an individual's cross-session preference | Reject for team policy; one person cannot silently govern the repository. |
| Repository instructions | Good for a stable, shared rule | Promote here after repeated value and code-owner approval. |
| Path-specific instructions | Good when only Orders files need the rule | Use when the installed client and target surface support the selector. |
| Prompt, skill, or agent | Good for a repeatable task, packaged capability, or role boundary | Not yet; the information is a rule, not a workflow or persona. |

### Personal Versus Shared Authority

A personal memory can record a communication preference such as “summarize test failures before proposing edits.” It remains under the individual's control and cannot define the team's API contract. The Orders API rule belongs in a reviewed repository artifact because it affects every contributor and generated change.

**Named authority boundary:** The Orders API code owner reviews changes to the response contract, validation rules, and required checks. Contributors and Copilot can propose changes. Only the designated reviewer can approve the policy change; repository merge controls remain authoritative.

### Review Personal Memory

Memory is useful only while it is accurate and appropriate for its scope.[^3]

1. Open the current Copilot memory management surface for the account.
2. Inspect stored entries for stale project facts or preferences that became team policy.
3. Correct or delete stale entries using the controls exposed in that surface.
4. Move a shared rule through repository review rather than copying it into more personal memories.

Memory controls and retention can change across plans and clients. This talk makes no fixed expiration, automatic storage, sync, export, or implementation claim.

### Reject Sensitive and Transient Data

Do not store credentials, tokens, customer records, production payloads, private incident details, or temporary debugging state in memory or instructions. Use secret management, access-controlled systems of record, and redacted fixtures. When a request contains sensitive data, stop, remove it from the conversation and artifacts where possible, rotate exposed credentials through the owning security process, and resume with synthetic data.

---

<!-- 🎬 MAJOR SECTION: Encode Context -->
## Encode with the Smallest Fitting Primitive

The rule earns promotion after it succeeds in multiple Orders changes and the code owner agrees that it represents repository policy. The final artifact is intentionally short:

```markdown
# Orders API Context

Owner: Orders API maintainers
Reviewer: Orders API code owner

## Scope
Apply these instructions to work on `src/orders/**` and `tests/orders/**`.

## Response Contract
- Return domain outcomes as `Result<T, OrderError>`.
- Map domain errors to HTTP responses only in the route adapter.
- Preserve the public response schema unless the API owner approves a change.

## Required Evidence
- Run `npm test -- orders`.
- Run `npm run typecheck` after changing TypeScript contracts.
- Report commands, exit status, and remaining uncertainty.
```

The [complete example](examples/.github/copilot-instructions.md) also carries the sensitive-data boundary. Its content is reviewable in a pull request, and its expected evidence is visible before work begins.[^1][^2]

### Primitive Selection Test

Use the first primitive that meets the need:

| Need | Primitive | Promotion signal |
|---|---|---|
| One task | Request context | None; discard after the task. |
| Personal recurring preference | Memory | It remains personal, useful, and safe to retain. |
| Shared baseline | Repository instruction | A named owner accepts the rule. |
| File-pattern rule | Path-specific instruction | The rule is irrelevant outside a stable path pattern. |
| Repeated task recipe | Prompt | Several successful runs follow the same human-invoked sequence. |
| Recipe plus scripts/resources | Skill | The prompt is proven and packaging reduces repeated setup. |
| Specialized role | Agent | The role needs a distinct tool boundary and handoff. |

### Bound Tools and Approval

A read-only context reviewer can receive search and file-read tools without edit or terminal access. An implementation agent can receive file editing and the minimum test commands needed for the bounded task. Neither role receives merge approval merely because a tool appears in its configuration. The code owner remains the approver, and policy-enforcing hooks or repository rules can add execution gates where required.

---

<!-- 🎬 MAJOR SECTION: Inspect Context -->
## Inspect Loaded Context and the Request Path

### Visible Input

```text
Update src/orders/update-order.ts so a missing order returns the existing
OrderError.notFound outcome. Preserve the HTTP response schema. Run the
Orders tests and TypeScript check, then report the evidence.
```

This request names the target, expected domain behavior, compatibility boundary, and verification commands. It does not repeat the repository's full architecture.

### Expected Inspection Result

The exact labels vary by VS Code build, but a supported loaded-customizations or chat debugging surface can provide an observation like this:[^4][^5]

```text
Observed customization
  file: .github/copilot-instructions.md
  state: loaded

Observed request path
  context reference: src/orders/update-order.ts
  file read: completed
  file edit: completed
  terminal: npm test -- orders -> exit 0
  terminal: npm run typecheck -> exit 0
```

This is inspection evidence, not a guaranteed literal UI transcript. The durable questions are:

1. Did the intended customization load?
2. Did the request include the decisive file and acceptance criteria?
3. Which tools ran, and what did each return?
4. Did context pressure or compaction remove a required constraint?

### Inspect MCP Failures

For an MCP-backed tool, inspect server status and server output first, then inspect the individual tool event.[^6] Distinguish four states:

| Signal | Meaning | Next action |
|---|---|---|
| Server failed to start | No tool path exists | Correct configuration, dependency, or authentication failure. |
| Server healthy, tool absent | Discovery or enablement failed | Confirm the tool is enabled for the active role and surface. |
| Tool invoked, error returned | Request reached the server | Repair input, authorization, timeout, or server behavior. |
| Tool succeeded, answer still wrong | Transport worked | Validate source authority, returned data, and model use separately. |

### Inspect Context Pressure

Context windows are finite. Current VS Code experiences can expose context usage and compaction controls.[^7] After compaction or a long tool trace, restate decisive constraints and rerun the acceptance check. Do not rely on a universal percentage threshold, fixed truncation order, or a claim that a particular category can never be removed.

---

<!-- 🎬 MAJOR SECTION: Repair and Verify -->
## Repair the Misroute, Then Verify Compliance

### Failed or Misrouted Context

The first version of the Orders rule was placed in a path-specific file with this selector:

```yaml
---
applyTo: "src/payments/**/*.ts"
---
```

The committed [broken selector](examples/selectors/orders-context.broken.instructions.md) makes this failure reproducible by inspection. Compare it with the [repaired selector](examples/selectors/orders-context.fixed.instructions.md). The task targeted `src/orders/update-order.ts`. The rule itself was valid, but its selector made it ineligible. The loaded-customizations inspection did not show the expected instruction for the Orders request, and the generated implementation threw an HTTP-shaped error from the domain layer.

### Recovery

1. Confirm the target file and active workspace.
2. Inspect loaded customizations; observe that the intended rule is absent.
3. Correct the selector to `src/orders/**/*.ts`, or move a broadly applicable rule to `.github/copilot-instructions.md`.
4. Start a fresh bounded request or explicitly re-anchor the corrected rule.
5. Inspect loading again.
6. Run Orders tests and type checking.
7. Review the diff against the response contract.
8. Ask the Orders API code owner to approve any policy or public-contract change.

### Prove Compliance Separately

Use an evidence ladder:

| Evidence | What it proves | What it does not prove |
|---|---|---|
| Instruction appears as loaded | VS Code found and selected the artifact | The model followed it. |
| Request trace names the file | The client assembled relevant request context | Every provider-side transformation is visible. |
| Tool event reports success | The tool completed and returned a result | The result is correct or authoritative. |
| Tests and type check pass | Defined executable constraints hold | Product intent and public compatibility are fully satisfied. |
| Code-owner approval | The authorized reviewer accepts the change | Future context remains correct forever. |

The limit matters: loaded configuration is necessary evidence for diagnosing delivery, but it never proves model compliance. Compliance comes from inspecting the output and running independent checks.

### Promote Only Proven Context

Promotion is a repository change, not a memory trick. The Orders rule becomes shared context only when:

- multiple bounded tasks demonstrate that the rule is stable;
- the rule has a clear owner and scope;
- tests or review criteria make compliance observable;
- sensitive or transient details have been removed; and
- the Orders API code owner approves the pull request.

If any condition fails, keep the context in the request, revise it, or retire it.

---

## Real-World Use Cases

### Monorepo Policy Routing

A platform team places baseline build evidence in repository instructions and service-specific contracts in path-scoped files. Validation compares the active file with loaded customizations, then runs each service's own checks. Success means the correct service rule is visible and no contradictory baseline remains.

### Personal Preference Graduation

A developer keeps a concise-response preference in personal memory while a repeatedly useful error-handling rule moves through a repository pull request. Success means personal style remains user-controlled and the shared rule gains a named reviewer, version history, and tests.

### MCP-Assisted Change

An agent queries an approved schema tool before editing an adapter. Validation records server health, the individual tool result, the generated diff, and contract tests. A successful transport without authoritative schema data is treated as a failed evidence path.

### Long-Running Refactor

A team compacts a long session, restates the public-contract and test constraints, and reruns validation. Success means the post-compaction result still satisfies the same checks; continuity is not inferred from the chat history alone.

---

## What We Can Do Today

### In 15 Minutes

- Pick one repeated repository fact and classify its owner, lifetime, selector, and reviewer.
- Put it in the smallest fitting location.
- Run one request and inspect whether the intended context loaded.
- **Expected signal:** the intended artifact is visible in the available references or diagnostic surface.
- **Validation:** compare the response or diff against one explicit acceptance criterion.

### In 1 Hour

- Use the Orders example as a pattern for one real repository rule.
- Create a failed-scope check by targeting a file outside the selector, then correct it.
- Record the request path, tool results, executable checks, and reviewer decision.
- **Expected signal:** the failed selector is observable, the repaired selector loads, and independent checks pass.
- **Boundary:** remove the artifact if it duplicates or contradicts an existing source of truth.

### In 2-4 Hours

- Inventory a small set of repeated context across chat, memory, repository instructions, prompts, skills, and agents.
- Delete stale personal entries through current account controls and reject sensitive data.
- Consolidate each shared rule under one owner; add path scope only where it reduces irrelevant context.
- Define read-only and write-capable roles with distinct tools and a human approval boundary.
- **Expected signal:** each retained item has one owner, one intended lifetime, one selector, and one verification path.
- **Rollback:** revert the repository change when diagnostics show unexpected loading or repository checks regress.

### Apply It to Our Work

Choose one candidate task from the current repository where Copilot repeatedly misses a convention. Name the decisive files and constraints, decide whether Copilot may only propose or may also edit and run tests, identify the reviewer who can accept the change, and define observable evidence before moving the context into a durable primitive.

---

## Related Patterns

- **Agent Dev Loop:** Turns a verified solution into reusable team capability.
- **Copilot Hooks:** Adds executable policy at tool boundaries where instructions alone are insufficient.
- **Enterprise Patterns:** Governs ownership and rollout across repositories.
- **Copilot with Foundry:** Fits organizational knowledge that exceeds repository context and needs a governed retrieval boundary.

---

## References

### Official Documentation

[^1]: **Use custom instructions in VS Code** - https://code.visualstudio.com/docs/copilot/customization/custom-instructions
[^2]: **Adding repository custom instructions for GitHub Copilot** - https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
[^3]: **Copilot Memory** - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/copilot-memory
[^4]: **Chat Debug View** - https://code.visualstudio.com/docs/copilot/chat/chat-debug-view
[^5]: **Troubleshoot AI in VS Code** - https://code.visualstudio.com/docs/copilot/troubleshooting
[^6]: **Use MCP servers in VS Code** - https://code.visualstudio.com/docs/copilot/customization/mcp-servers
[^7]: **Manage context for AI: context compaction** - https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context#_context-compaction
