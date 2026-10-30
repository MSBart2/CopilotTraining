---
status: active
updated: 2026-10-30
section: "Extend and Embed"
---

# Harness Fundamentals: Plan (Revision 4, five jobs twice)

**SDK framing update (2026-10-30):** The five-job mirror remains. The primary SDK value statement is embedding AI in an existing tool or app: a named custom-tool handler calls an app method, the existing service validates and authorizes the app user, and SDK events feed its UI and telemetry. Section 2 now follows a release-dashboard integration sketch from question to method call to visible result, with permission decisions distinct from resource authorization and business approval. Sketches are labeled illustrative; quickstarts and the observed fresh-eyes run remain supporting README material. This supersedes the earlier requirement to put one quickstart file on each SDK slide and make fresh-eyes the section payoff. The closing ideas and transfer slide ask which existing app method the audience could expose, what authority it retains, and what evidence its users need.

**Proposal status:** Draft for approval. Revision 3 opens the talk by defining a harness from working code. [pi](https://github.com/earendil-works/pi) (MIT) is the readable reference harness; the Copilot SDK is GitHub's harness, which the audience then hosts from its own code. Revision 2's apps, evidence, and host kit carry forward unchanged.

**Why Revision 4:** Revision 3 had the right spine (a harness does five jobs) but spent it unevenly: section 1 gave tools two slides and evidence none, and section 2 packed five quickstart steps onto two noisy slides with two or three code blocks each. Revision 4 walks the five jobs twice in the same order, one slide per job: section 1 in pi, section 2 in the Copilot SDK. Each quickstart file now carries one job and its number (01 loop, 02 context, 03 tools, 04 control, 05 evidence), so every SDK slide shows exactly one file. Hooks fold into the Control slide; pi's `find` becomes a callout on the Tools slide. The persona card is relabeled so documented behavior and observed behavior stay distinct.

**Why Revision 3:** Revision 2 taught the SDK levers without ever showing the loop those levers reach into, because the Copilot runtime keeps its loop out of view. pi's loop is one readable function, so the audience can see every job a harness does before learning which of those jobs GitHub's harness hands to them. The new anchor is that reveal; the fresh-eyes report becomes the payoff of section 2.

**Why Revision 2:** The first build taught seams and controls around one maintenance helper, but never showed how to start an SDK app from zero, what the SDK promises, or what is worth building with it. Three cuts compounded: the plan scoped SDK patterns to one helper, the README dropped the baseline runs and the "what the host takes on" material, and the four-section recipe compressed what remained.

## Research Brief

### Audience and consequential decision

Application developers and platform engineers have used Copilot in an editor or the CLI and now want the agent inside their own tools. They write and test code comfortably; the SDK and harness internals are new. Their decision: which existing app capability to expose through an AI tool, which permissions and approvals the app retains, and what its users need to see in the UI and telemetry.

**Question this talk answers:**
> How do I get inside the agent loop and change how it behaves?

**Thesis:** A harness is a loop with five jobs: run the **loop**, assemble the **context**, offer the **tools**, **control** which calls run, and record the **evidence**. pi shows all five in plain TypeScript. The Copilot SDK embeds GitHub's harness in an existing application. Custom tools call selected app methods; the app retains service authorization and approval gates, and wires events into its UI and telemetry. Repository hooks add rules in sessions that load them. Each layer has a clear job, and the app team verifies the resulting behavior.

**Tension:** Controlling what the agent *sees* is as powerful as controlling what it *does*. Withholding source code turns the agent into an independent tester; withholding everything except the docs turns it into a new hire. Every such choice is behavior the host team owns, tests, and explains. The boundary is visible in the first section: a tool such as pi's `find` hands work to an external program, and the harness sees only the call and its result.

**Judgment lenses:** Context and delegation, proven through verification; authority in the closing section.

### What stands out

1. **A harness fits on a screen.** pi's whole loop is `runLoop`, about 170 lines. Every hook and SDK callback in this talk fills one of five jobs in a loop like it.
2. The SDK promise: "the same engine behind Copilot CLI" with the application defining agent behavior. Getting started takes five lines and one install.
3. Information control is a design tool. Permission handlers and the tool set shape the agent's view of the world, which unlocks use cases a full-access agent cannot serve.
4. Repository hooks load in SDK sessions when the host opts in, and a repository deny holds even when the host approves. Hooks are the floor; the app builds on it.
5. Authentication route, billing, model availability, and organization policy decide who can run the app and what it costs.


### Evidence map

Documentary findings checked on 2026-10-26; rows marked "Observed" come from live SDK runs on a FanHub copy.

| Claim or mechanism | First-party evidence | Confidence and boundary |
|---|---|---|
| Application -> SDK -> JSON-RPC -> Copilot CLI server; managed or external server lifecycle | [SDK repository](https://github.com/github/copilot-sdk) | Documented. Pin SDK and CLI versions before implementing examples. |
| Standard Copilot access and BYOK have different authentication paths | [SDK repository](https://github.com/github/copilot-sdk), [authentication docs](https://github.com/github/copilot-sdk/tree/main/docs/auth) | Documented at overview level. Verify exact provider, billing, and policy implications for the chosen route. |
| CLI and cloud hooks have different execution environments and event coverage | [Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) | Documented. Do not copy a CLI configuration into an SDK example without checking applicability. |
| Hook compatibility follows the selected harness, including differences from older Local sessions | [VS Code hooks](https://code.visualstudio.com/docs/agent-customization/hooks) | Documented; editor experience is labeled Preview. Shared locations alone do not establish compatibility. |
| Enterprise and organization policies control access to features, agents, and models | [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) | Documented. Licensing, policy conflicts, and supported surfaces affect applicability. |
| Policy-level hooks load machine-wide before other hooks and cannot be disabled by `disableAllHooks` (CLI only) | [Copilot hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference) | Documented. Not supported in cloud agent. |
| SDK permission callbacks, lifecycle callbacks, telemetry fields, approval flow, and cancellation | Exact versioned SDK API and runtime behavior | Research gate. Establish supported contracts before writing executable examples. |
| Repository hooks fire in SDK-hosted sessions | Observed 2026-10-26 (SDK 1.0.26, CLI 1.0.102) | Confirmed when the host sets `enableFileHooks: true`; `sessionStart` and `preToolUse` fired with `hook.start`/`hook.end` events. |
| SDK host overriding a repository hook decision | Observed 2026-10-26 | A repo `preToolUse` deny held while the SDK `onPreToolUse` returned `allow`; SDK callbacks were not invoked for that call. The talk presents the SDK as a tightening layer and grants the role exception through the `schema_summary` tool. |

Existing talks are reuse candidates, rather than a substitute for current API evidence. In particular, retire unsupported claims about complete audit coverage, universal hook event counts, hooks as the sole preventive mechanism, secret injection, production readiness, and achieved ROI.



Revision 2 adds these evidence gates, all to be observed before the README claims them:

| Claim | Gate |
|---|---|
| Five-line first session runs with `model: "auto"` and streams deltas | Run `examples/sdk-quickstart` step 01-02 live; record output. |
| `systemMessage` customize changes persona while keeping SDK guardrails | Run step 03 live; diff against step 01 answer. |
| `availableTools` narrows what the agent can request | Inspect `session.tools_updated` or tool-search events in a live run. |
| Fresh-eyes run produces at least one real doc mismatch | Run against a clean FanHub clone at a pinned commit; record the friction report. |
| Blind test writer never reads hidden paths and its tests fail on real API gaps | Live run with hidden-path denials logged; run the produced tests; map failures to `BUGS.md` after the session. |

Revision 3 adds source-reading evidence from pi at commit [`f9daca3`](https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d), read 2026-10-26. These are claims about pi's code only.

| Claim | Source (pinned) | Confidence and boundary |
|---|---|---|
| The core loop is one function, `runLoop`, about 170 lines | `packages/agent/src/agent-loop.ts` L172-341 (file is 959 lines including tool execution) | Read from source. Excerpts on slides stay under 25 lines and carry the MIT attribution. |
| Inner loop runs until no tool calls and no queued steering; outer loop resumes for follow-up messages | `agent-loop.ts` L188-330 (`while (true)`, `getSteeringMessages`, `getFollowUpMessages` at L311) | Read from source. |
| Context is assembled every turn | `transformContext` L400, `convertToLlm` L404 | Read from source. |
| A host can block a call before it runs | `beforeToolCall` result `{ block, reason }` at L755 becomes an error tool result | Read from source. Maps to SDK `onPreToolUse` / `onPermissionRequest` by role; the APIs differ. |
| The product supplies policy through the loop's hook | `packages/coding-agent/src/core/agent-session.ts` L652-682: `_installAgentToolHooks` assigns `agent.beforeToolCall`, which routes each call to extension `tool_call` handlers | Read from source. The `Agent` class (`packages/agent/src/agent.ts` L446, L490) only passes the hooks through to `runAgentLoop`. |
| A reply cut off at the token limit never executes its tool calls | `stopReason === "length"` at L277 fails the whole batch | Read from source. A detail of pi; no claim about Copilot's behavior. |
| `write` is fully in-process and swappable | `packages/coding-agent/src/core/tools/write.ts` (97 lines): schema, prompt snippet, per-file mutation queue, abort checks, pluggable `WriteOperations` | Read from source. |
| `find` delegates to an external program | `packages/coding-agent/src/core/tools/find.ts` (318 lines): `ensureTool("fd")` L172 downloads `fd` on demand; `spawn` L216; custom `glob` operations L116 replace it | Read from source. The harness sees the call and its output; it has no view inside `fd`. |

**Accuracy rule for pi:** pi is one readable harness. The talk claims Copilot's harness does the same five jobs only where the SDK exposes them (session options, callbacks, events, hooks). It makes no claim about the Copilot runtime's internal loop.

## Recommended Structural Proposal

### Planning defaults

- **Title and slug:** Harness Fundamentals / `harness-fundamentals` (unchanged).
- **Duration:** 60 minutes. **Level:** applied. **Section:** Extend and Embed.
- **Language:** TypeScript only, run with `tsx`. SDK `@github/copilot-sdk` 1.0.26, pinned.
- **Prerequisites:** A Copilot subscription (or BYOK), Node 20+, comfort with async TypeScript. No SDK experience required.
- **Running repository:** FanHub (`node/` track), cloned at a pinned commit so every run starts clean.
- **Anchor:** The loop reveal. pi's entire agent loop is one ~170-line function, and every hook or SDK callback in this talk fills one of its five jobs. The audience sees the loop once, then recognizes each later lever as a job they are taking over.
- **Payoff and climax:** The fresh-eyes friction report closes section 2: an agent restricted to the documentation finds that FanHub's two Node.js guides disagree on the backend port and on Docker, without opening a source file. The blind test writer is the section 3 climax, including the `seasonId` / `season_id` mismatch the referee labeled undocumented.

### The mental model: five harness jobs

| Job | What it decides | In pi (read only) | In GitHub's harness (SDK + runtime) |
|---|---|---|---|
| **Loop** | Keep going until the work is done | `runLoop`: stream reply → run tool calls → repeat; steering and follow-up queues | The runtime runs it; the app drives it with `sendAndWait` and watches it through events |
| **Context** | What the model sees each turn | `transformContext`, `convertToLlm`, `prepareRequest` | `systemMessage` (`append` / `customize`), prompt, attachments |
| **Tools** | What the agent can do | `write` (in-process), `find` (spawns `fd`) | Built-in tools, `availableTools`, `excludedTools`, `defineTool` |
| **Control** | Which calls run | `beforeToolCall` → `{ block, reason }` | `onPermissionRequest`, `hooks.onPreToolUse`, repository hooks |
| **Evidence** | What happened | `emit()` events, `afterToolCall` | `session.on(...)`, tool handlers, hook logs |

```text
Your app (host)                       Copilot runtime (the loop)
  context   ── systemMessage ───────▶  plan
  tools     ── availableTools/defineTool ▶ pick and call a tool
  control   ◀─ onPermissionRequest ──  every read, write, shell
  evidence  ◀─ session events ──────  deltas, tool calls, results
                                        ▲
Repository hooks (.github/hooks) ───────┘  control + evidence inside your session too
Organization: who may use Copilot, which models, what it costs
```

### Section spine (max four)

| Time | Section and audience question | Artifact and proof | Boundary or recovery |
|---|---|---|---|
| 18 min | **What a Harness Is** — What is actually running when an agent works, and where can I reach in? | pi at `f9daca3`, read as pinned excerpts (no install, no live run). Six slides: the five jobs, then one slide per job in order. **Loop:** `runLoop` annotated (**anchor**). **Context:** assembled every turn. **Tools:** `write` anatomy (schema, prompt snippet, mutation queue, swappable operations) with `find` delegating to `fd` as a callout. **Control:** `beforeToolCall` blocking a call, the truncated-reply rule, and agent-session wiring. **Evidence:** `emit` vocabulary, `afterToolCall`, and `subscribe`. | `find` is the first boundary: the harness mediates the call and sees the result; work inside the external program is outside its view. pi is a reference; Copilot claims stay at the SDK surface. |
| 20 min | **Drive GitHub's Harness** — How do I take over those jobs in Copilot, starting from zero? | Mapping table (the five jobs above). **Hooks coverage:** the two ways in — repository hooks as configuration that fills control and evidence in every harness that loads them, the SDK as code that fills all four host jobs; hook decision contract and fail-closed/fail-open behavior; the FanHub database hook as the floor. Then one slide per job, each showing one `examples/sdk-quickstart/` file: **Loop** 01, **Context** 02, **Tools** 03, **Control** 04 (with repository hooks folded in), **Evidence** 05. Ends with the **fresh-eyes onboarding check** (payoff). | Installs and network access happen for real: run in a container or Codespace. A permission handler governs mediated tools; it is not a sandbox. |
| 15 min | **Decide What It Sees** (climax) — How do I shape the agent's view to get a result a full-access agent cannot give me? | **Blind test writer** on one slide: hidden `node/backend/src/**`, `BUGS.md`, and the database; `api_contract` tool from `SETUP.md` with bug hints stripped; writes only under `__tests__/blind/`; denied reads, the shell check, host rerun, referee mapping. Then what the host cannot see (calls back to `find` → `fd`), and the correlated hook log plus SDK event stream as the evidence you keep. | A failing blind test is a disagreement between spec and code; the API owner decides which side is wrong. Hidden paths hold only for mediated calls. |
| 7 min | **Own It** — What has to be true before someone else runs my harness? | **Governance coverage:** the Surrounding Controls map below on one slide — who may use Copilot, model availability versus requested model, usage and billing per auth route, tool/MCP policy, policy-level hooks, evidence retention. Second slide: the owner who accepts results and the pre-flight checklist. | Requested model ≠ guaranteed model; usage reporting ≠ enforced budget; BYOK has its own applicability. Name the owner who accepts results. |

About 19 content slides (6 + 7 + 4 + 2), about 30 with generated structural slides. The two apps share one host scaffold, so section 3 reuses everything built in section 2 and adds only the visibility rules. Slides consolidated from Revision 2: "What the SDK Gives You", "What Is Worth Building", and "Hook or Host" become the mapping and two-ways-in slides; the two blind-test slides merge into one.

## Demonstration and Artifact Plan

### pi excerpts (section 1)

Read-only, pinned to `f9daca3`, each excerpt under 25 lines with "pi · MIT · earendil-works/pi@f9daca3 · path#Lx-Ly" on the slide. No `examples/` code and no pi install.

1. **The loop:** `agent-loop.ts` L188-330, trimmed to the inner and outer `while` with the five jobs labeled in the margin.
2. **Context:** L399-404, `transformContext` then `convertToLlm`, run before every model call.
3. **Control:** L738-760, `beforeToolCall` returning `{ block, reason }`; plus L275-281, the truncated-reply rule; plus `agent-session.ts` L652-682, where pi's coding agent installs its extensions into that hook (loop owns the hook point, product supplies the policy).
4. **`write`:** the tool definition and `execute` body, showing schema, prompt snippet, mutation queue, and `WriteOperations`.
5. **`find`:** `ensureTool("fd")` and `spawn`, plus the custom `glob` operations that replace them (a callout on the Tools slide).
6. **Evidence:** `agent-loop.ts` L880-912 `afterToolCall` and L929-937 `emitToolExecutionEnd`, plus `agent.ts` L275-278 `subscribe`.

Slide order follows the jobs: loop, context, tools (`write` + `find`), control, evidence.

### `examples/sdk-quickstart/` (section 2)

Numbered in job order; one file per slide.

1. `01-loop.ts` — **Loop:** `CopilotClient`, `createSession({ model: "auto" })`, `sendAndWait` (60 s default wait; `abort()` stops the loop), `disconnect`, `stop`.
2. `02-context.ts` — **Context:** `systemMessage` in `customize` mode; the three modes and section actions are Documented, the citations Observed.
3. `03-tools.ts` — **Tools:** `tools` adds `lookup_owner`; `availableTools` allowlists four names.
4. `04-control.ts` — **Control:** `onPermissionRequest` approves reads and rejects everything else with feedback; repository hooks and the precedence probe on the same slide.
5. `05-evidence.ts` — **Evidence:** `streaming: true`, `assistant.message_delta`, `tool.execution_start`, `session.idle`.

### Fresh-eyes onboarding check (section 2 payoff)

- Host clones FanHub at a pinned commit into a temp folder.
- Persona: first-day engineer who knows only what the docs say; goal: get the Node track running and call `/api/characters`.
- Reads allowed for Markdown, `.env.example`, and `package.json`; reads under `src/` rejected with feedback "a new hire follows the docs."
- Custom tool `report_friction({ step, docSays, reality, doc })` collects findings; the host writes `friction-report.md`.
- Bounded by `sendAndWait` timeout and a tool-call budget; the docs owner triages the report.

### Blind test writer (section 3)

- Context: `api_contract` tool returns the `SETUP.md` endpoint list as structured data with parenthetical bug hints removed.
- Hidden: `node/backend/src/**`, `BUGS.md`, `**/BUGS.md`, `.copilot-loop/`, and database files. Enforced in `onPermissionRequest` for reads, plus command-text checks on shell calls (`cat`, `grep`, `type`, `Get-Content`).
- Writes allowed only under `node/backend/__tests__/blind/`. Shell allowed for starting the server and running `node --test`.
- Repo hook overlay (database protection) loaded through `enableFileHooks: true`, showing the repository floor holding inside a custom app.
- Post-session reveal: the host runs the tests, then (outside the session) matches failures to `BUGS.md` entries and prints the mapping.

### Shared pieces and retirements

- Keep: hook overlay, `apply-overlay.mjs`, path-resolution and telemetry logic (moved into a shared `host-kit` module), and their tests.
- Retire: the repository-maintenance `sdk-host` and `schema_summary` demo. Their precedence evidence stays in the evidence map and the README.
- Tests: deterministic unit tests for every visibility rule, plus recorded live runs labeled observed.

### Proof and failure requirements

- Label test-runner status separately from domain result (`test: FAIL — contract mismatch`).
- Show a denied read never reaches the tool, and the agent's recovery after it.
- Record timeouts, budget exhaustion, and unavailable approval as explicit outcomes.
- State what the host cannot stop: unmediated operations, other actors, and anything the OS permits.


## Surrounding Controls

| Decision | Owner and enforcement surface | Evidence and limitation |
|---|---|---|
| Who can use Copilot? | License/access administrator; applicable seat and feature/client policies | Effective entitlement and access result for the demonstrated identity and surface. |
| Which models are available, and which is requested? | Enterprise/organization administrators set availability; application or practitioner requests a model | Inspect effective availability and session metadata. Do not equate a requested model with a verified effective model. |
| Which tools or MCP servers can run? | Platform administrator and application owner; applicable managed settings, registration, and permission handling | A declared tool/server is separate from permission to execute it. Verify each surface's policy support. |
| What constrains filesystem, network, and credentials? | Platform/service owner; OS, container/sandbox, network, and identity controls | Test actual access boundaries. Workspace paths and prompt instructions alone do not establish isolation. |
| How is usage accounted for and bounded? | Billing administrator and application owner; provider accounting plus supported budget or application limits | Name the auth/provider route. Distinguish alerts, estimated cost, request limits, and hard execution stops. |
| What evidence is retained? | Application operator and audit owner; redacted local events, durable sink, and applicable enterprise audit logs | Local telemetry and enterprise audit logs serve different purposes. Name retention, access, and coverage gaps. |
| Who accepts or publishes the result? | Repository/service owner; required checks, approval, and protected publication path | Give a concise endpoint and link to Copilot on GitHub for the full pull-request evidence and merge story. |

For GitHub-authenticated and BYOK routes, document applicability separately. Do not claim that GitHub subscription policy controls arbitrary direct-provider traffic.


## Migration Map

| Original | Keep | Rewrite or consolidate | Omit from the core talk |
|---|---|---|---|
| [Copilot SDK](../copilot-sdk/README.md) | Runtime reuse, host lifecycle, domain tools, auth routes, the "build your own tool" ambition | Rebuild as a from-zero TypeScript path ending in two working apps | Multi-language tour, unsourced savings, blanket production-readiness claims |
| [Copilot Hooks](../copilot-hooks/README.md) | Repository hooks as the floor every session inherits; policy-level hooks for administrators | Show hooks loading inside the SDK apps and holding a deny | Universal event counts, complete-compliance claims, secret-injection recipes |
| [Copilot Governance](../copilot-governance/README.md) | Decision ownership, model availability, usage, and control map | Fold into Own It as the pre-flight for shipping a harness | Detailed PR protection walkthrough |

## Delivery Plan and Approval Gates

1. **Approve this revision.** Confirm the five-jobs definition, the section spine, and the pi excerpt list.
2. **Re-verify the pi excerpts** at `f9daca3` and record exact line ranges in the README's Behind the Scenes. No new runs are needed: the apps, quickstart, and recorded evidence from Revision 2 carry forward.
3. **Rewrite the README:** new section 1 (What a Harness Is), section 2 absorbs the old "Why Host the Agent" and "Build It From Zero", section 3 gains the `find` callback and the evidence slide content, section 4 becomes Own It. Approve.
4. **New recipe** from the deck-recipe-review skill; approve.
5. **Regenerate the deck and companions** (60-minute agenda), sync the index, regenerate the portfolio.
6. **Commit** through the Deploy workflow.


### Completion and archival checklist

- [ ] New talk passes relevance, evidence, runnable-artifact, and slide/companion checks.
- [ ] Add the new homepage entry and remove the three original entries during cutover.
- [ ] Update the decision guide, surface/adoption roadmap, taxonomy references, and active prerequisites/related links that point readers to the originals.
- [ ] Add routing redirects from `copilot-governance`, `copilot-hooks`, and `copilot-sdk` to `harness-fundamentals`; reconcile coverage and regenerate the portfolio inventory.
- [ ] Close relevant routing-ledger work only if this consolidation actually consumes an existing decision; do not invent feed work.
- [ ] Add successor notices and archive the original content in the same final transition, then leave archived files frozen.
- [ ] Preserve original folders, artifact links, deck URLs, and existing companions for inbound links.
- [ ] Run the existing portfolio and content-routing tests, inventory generation/check, and strict companion checks for the completed cutover.
- [ ] Use the required Deploy workflow before any slide/companion commit. Commit or push only in the authorized delivery phase.

The worktree already contains portfolio restructuring and edits to the Hooks and SDK READMEs. Integrate those changes during implementation; do not revert them or overwrite generated/shared files during planning.

## Publication Gate and Transfer

- **Relevant:** A developer can name a workflow in their own repository that deserves a dedicated agent tool and the person who consumes its output.
- **Compelling:** Seeing the whole loop on one screen turns hooks and SDK callbacks from settings into jobs the audience recognizes, and watching an agent produce useful, independent results *because* of what it was not allowed to see changes how the audience thinks about agent design.
- **Actionable:** The audience leaves with the five-jobs checklist, a five-step quickstart, a reusable host scaffold, and two apps they can point at their own repository today.

**Transfer prompt:** Pick one workflow where a fresh, constrained perspective would help: docs, tests, reviews, or onboarding. Which of the five jobs do you take over? What does your agent need to see, what must it never see, what tools does it get, and who reads its report?
