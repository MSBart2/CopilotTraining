---
status: active
updated: 2026-10-27
section: "Extend and Embed"
---

# Harness Fundamentals: Plan (Revision 2, SDK-led)

**Proposal status:** Draft for approval. Revision 2 replaces the hook-and-SDK pairing with an SDK-led talk: the audience builds its own Copilot-powered tools, and hooks become the repository layer those tools inherit. The first revision's evidence remains valid and is carried forward.

**Why the revision:** The first build taught seams and controls around one maintenance helper, but never showed how to start an SDK app from zero, what the SDK promises, or what is worth building with it. Three cuts compounded: the plan scoped SDK patterns to one helper, the README dropped the baseline runs and the "what the host takes on" material, and the four-section recipe compressed what remained.

## Research Brief

### Audience and consequential decision

Application developers and platform engineers have used Copilot in an editor or the CLI and now want the agent inside their own tools. They write and test code comfortably; the SDK and harness internals are new. Their decision: which workflow deserves its own agent host, and what that host decides about what the agent sees, uses, and does.

**Question this talk answers:**
> How do I get inside the agent loop and change how it behaves?

**Thesis:** The Copilot SDK hands an application the same agent loop that runs Copilot CLI. Planning, tool calling, and file edits come with it. The application supplies everything around the loop: the task, the persona, the tool set, the permission decisions, and the evidence. Those choices turn a general coding agent into a specific, trustworthy tool. Repository hooks keep applying underneath, so team-wide rules travel with the repository while each app adds the rules its purpose needs.

**Tension:** Controlling what the agent *sees* is as powerful as controlling what it *does*. Withholding source code turns the agent into an independent tester; withholding everything except the docs turns it into a new hire. Every such choice is behavior the host team owns, tests, and explains.

**Judgment lenses:** Context and delegation, proven through verification.

### What stands out

1. The SDK promise: "the same engine behind Copilot CLI" with the application defining agent behavior. Getting started takes five lines and one install.
2. Information control is a design tool. Permission handlers and the tool set shape the agent's view of the world, which unlocks use cases a full-access agent cannot serve.
3. Repository hooks load in SDK sessions when the host opts in, and a repository deny holds even when the host approves. Hooks are the floor; the app builds on it.
4. Authentication route, billing, model availability, and organization policy decide who can run the app and what it costs.


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

## Recommended Structural Proposal

### Planning defaults

- **Title and slug:** Harness Fundamentals / `harness-fundamentals` (unchanged).
- **Duration:** 60 minutes. **Level:** applied. **Section:** Extend and Embed.
- **Language:** TypeScript only, run with `tsx`. SDK `@github/copilot-sdk` 1.0.26, pinned.
- **Prerequisites:** A Copilot subscription (or BYOK), Node 20+, comfort with async TypeScript. No SDK experience required.
- **Running repository:** FanHub (`node/` track), cloned at a pinned commit so every run starts clean.
- **Anchor:** The fresh-eyes friction report. An agent restricted to the documentation finds that FanHub's two Node.js guides disagree on the backend port and on Docker, without opening a source file. The blind test writer remains the section 3 climax, including the undocumented `seasonId` / `season_id` mismatch the referee confirmed.

### The mental model

```text
Your app (host)                       Copilot runtime (same loop as the CLI)
  task + persona  ── systemMessage ──▶  plan
  tool set        ── availableTools ─▶  pick a tool
  custom tools    ── defineTool ─────▶  call it
  permissions     ◀─ onPermissionRequest ─ every read, write, shell
  evidence        ◀─ session events ───  deltas, tool calls, results
                                        ▲
Repository hooks (.github/hooks) ───────┘  apply inside your session too
Organization: who may use Copilot, which models, what it costs
```

| Seam | The host decides | SDK lever |
|---|---|---|
| **Who the agent is** | Role, goal, done criteria | `systemMessage` (`append` / `customize`) |
| **What it can use** | Built-in tools, domain tools | `availableTools`, `excludedTools`, `defineTool` |
| **What it can see and do** | Per-call allow, reject, or ask | `onPermissionRequest`, `hooks.onPreToolUse` |
| **What you keep** | Report, logs, audit trail | `session.on(...)`, tool handlers |

### Section spine (max four)

| Time | Section and audience question | Artifact and proof | Boundary or recovery |
|---|---|---|---|
| 10 min | **Why Host the Agent** — What do I get from the SDK, and what is worth building? | The promise, the mental model above, and the two apps as goals. **Hooks coverage:** the two ways into the loop (hooks attach to an existing harness; the SDK hosts it), hook events and the decision contract, fail-closed/fail-open behavior, and the FanHub database hook as the repository floor every app inherits. | A hook reaches existing harnesses with no host; the SDK makes you the host with its auth, versioning, and lifecycle duties. |
| 18 min | **Build It From Zero** — How do I go from `npm install` to a working agent tool? | `examples/sdk-quickstart/` steps 01-05 (hello, stream, persona, tools, permissions), each a short diff. Ends with the **fresh-eyes onboarding check** running against a clean FanHub clone and producing a friction report. | Installs and network access happen for real: run in a container or Codespace. A permission handler governs mediated tools; it is not a sandbox. |
| 20 min | **Decide What It Sees** (climax) — How do I shape the agent's view to get a result a full-access agent cannot give me? | **Blind test writer.** Host hides `node/backend/src/**`, `BUGS.md`, and the database; serves an `api_contract` tool built from `SETUP.md` endpoints with bug hints stripped; allows writes only under `__tests__/blind/`. Live log shows denied reads, the shell workaround caught, the tests written, and the post-session reveal mapping failures to `BUGS.md`. Repo hook still blocks the database inside the session. | A failing blind test is a disagreement between spec and code; the API owner decides which side is wrong. Hidden paths hold only for mediated calls. |
| 12 min | **Prove and Own It** — What do I need before someone else runs my tool? | Correlated hook log and SDK event stream. **Governance coverage:** the Surrounding Controls map below — who may use Copilot, model availability versus requested model, usage and billing per auth route, tool/MCP policy, policy-level hooks administrators install, evidence retention, and who accepts results — closed by a pre-flight checklist. | Requested model ≠ guaranteed model; usage reporting ≠ enforced budget; BYOK has its own applicability. Name the owner who accepts results. |

The two apps share one host scaffold, so section 3 reuses everything built in section 2 and adds only the visibility rules.

## Demonstration and Artifact Plan

### `examples/sdk-quickstart/` (section 2)

1. `01-hello.ts` — `CopilotClient`, `createSession({ model: "auto" })`, `sendAndWait`, `disconnect`, `stop`.
2. `02-stream.ts` — `streaming: true`, `assistant.message_delta`, `session.idle`, tool-call events.
3. `03-persona.ts` — `systemMessage` in `customize` mode; same question, different answer.
4. `04-tools.ts` — `availableTools` narrowing plus one `defineTool` with a JSON schema.
5. `05-permissions.ts` — `onPermissionRequest` that logs every request kind and approves reads, asks on shell.

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
| [Copilot Governance](../copilot-governance/README.md) | Decision ownership, model availability, usage, and control map | Fold into Prove and Own It as the pre-flight for shipping an app | Detailed PR protection walkthrough |

## Delivery Plan and Approval Gates

1. **Approve this revision.** Confirm the core question, section spine, and both app designs.
2. **Build and run the examples.** Quickstart steps, both apps, shared host kit, tests; record live output against a pinned FanHub clone.
3. **Rewrite the README** around the observed results; approve.
4. **New recipe** with an independent cross-model critique; approve.
5. **Regenerate the deck and companions** (60-minute agenda), sync the index, regenerate the portfolio.
6. **Commit** through the Deploy workflow with the archive cutover already in the working tree.


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
- **Compelling:** Watching an agent produce useful, independent results *because* of what it was not allowed to see changes how the audience thinks about agent design.
- **Actionable:** The audience leaves with a five-step quickstart, a reusable host scaffold, and two apps they can point at their own repository today.

**Transfer prompt:** Pick one workflow where a fresh, constrained perspective would help: docs, tests, reviews, or onboarding. What does your agent need to see, what must it never see, what tools does it get, and who reads its report?

