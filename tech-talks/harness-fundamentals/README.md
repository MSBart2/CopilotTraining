---
status: active
updated: 2026-11-18
section: "Extend and Embed"
audience: [developer, platform-engineer, architect]
level: applied
duration: 45
format: core-talk
decision: "How do I add an agent to my app without owning another harness?"
prerequisites: [copilot-cli]
related: [copilot-primitives, custom-agents, copilot-on-github, enterprise-patterns]
references:
  - url: https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d
    label: "pi coding agent (MIT), pinned at f9daca3"
    verified: 2026-10-26
  - url: https://github.com/earendil-works/pi/blob/f9daca3480732d0042b1df3a6e27221f597a620d/packages/coding-agent/docs/sdk.md
    label: "pi TypeScript SDK documentation at pinned commit f9daca3"
    verified: 2026-11-18
  - url: https://github.com/microsoft/copilot-sdk
    label: "Microsoft Copilot SDK repository (2.0)"
    verified: 2026-11-18
  - url: https://www.npmjs.com/package/@microsoft/copilot-sdk
    label: "@microsoft/copilot-sdk (2.0.0, used by every example)"
    verified: 2026-11-18
  - url: https://github.com/microsoft/copilot-sdk/blob/main/docs/migration/v2.md
    label: "Microsoft Copilot SDK 2.0 migration guide"
    verified: 2026-11-18
  - url: https://github.com/microsoft/copilot-sdk/tree/main/docs/auth
    label: "Microsoft Copilot SDK authentication documentation"
    verified: 2026-11-18
  - url: https://github.com/microsoft/copilot-sdk/blob/main/docs/setup/in-process-runtime.md
    label: "Microsoft Copilot SDK in-process runtime"
    verified: 2026-11-18
  - url: https://docs.github.com/en/copilot/reference/hooks-reference
    label: "GitHub Copilot hooks reference"
    verified: 2026-10-26
  - url: https://code.visualstudio.com/docs/agent-customization/hooks
    label: "VS Code agent hooks (Preview)"
    verified: 2026-10-26
  - url: https://docs.github.com/en/copilot/concepts/enterprise/policies
    label: "GitHub Copilot policies for enterprises and organizations"
    verified: 2026-10-26
  - url: https://docs.github.com/en/copilot/reference/ai-models/supported-models
    label: "Supported AI models in GitHub Copilot"
    verified: 2026-10-26
  - url: https://blogs.microsoft.com/blog/2026/10/28/introducing-the-microsoft-copilot-harness-unlocking-the-potential-of-truly-multi-model-agentic-work/
    label: "Official Microsoft Blog: Introducing the Microsoft Copilot harness"
    verified: 2026-11-18
  - url: https://commandline.microsoft.com/microsoft-copilot-sdk-2-0-github/
    label: "Introducing Microsoft Copilot SDK 2.0"
    verified: 2026-11-18
  - url: https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry
    label: "Microsoft Copilot harness in Foundry Agent Service (public preview)"
    verified: 2026-11-18
  - url: https://learn.microsoft.com/en-us/microsoft-copilot-studio/harnesses-overview
    label: "Copilot Studio harness choices"
    verified: 2026-11-18
  - url: https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/
    label: "Evaluating the GitHub Copilot agentic harness across models and tasks (GitHub Blog)"
    verified: 2026-11-05
  - url: https://benchmarks.github.com/
    label: "GitHub Copilot Benchmarks (provisional data, updated 2026-10-21)"
    verified: 2026-11-05
---

# Harness Fundamentals: Add an Agent Without Owning Another Harness

> **The Question This Talk Answers:**
> *"How do I add an agent to my app without owning another harness?"*

**Duration:** 45 minutes | **Audience:** Developers and platform engineers who already use Copilot in the editor or CLI and want the agent inside their own tools

**Thesis:** Microsoft Copilot SDK supplies a maintained harness loop for an app. The app retains user authorization, business approval, UI, and evidence; a five-job map and one-method spike help teams test whether that fit outweighs owning another harness.

## Present and Study

- **[Open the deck](../../slides/tech-talks/harness-fundamentals/index.html):** 29 native slides, with 40:25 of planned speaking time plus discussion. Press `N` to open the notes beside it.
- **[Speaker notes](../../slides/tech-talks/harness-fundamentals/notes.html):** complete talk track, evidence, technical boundaries, sources, and per-slide timing. The notes are the handout.
- **[Teaching source](../../slides/tech-talks/harness-fundamentals/slides.js):** slide data and notes together.

Each example occupies one slide with its purpose, key configuration, result, boundary, and follow-up link. No live demo is planned; the detailed walkthroughs and runnable samples support additional learning afterward. Timing is a planning budget until a presenter rehearses it.

## 1. What a Harness Is

Read pi’s loop as source and name its five jobs: loop, context, tools, control, and evidence. The source is pinned at `f9daca3`; it is a readable example, not a claim that every harness shares its implementation.

## 2. Drive the Microsoft Copilot SDK

Map the five harness jobs to SDK configuration, then inspect a single-page release-dashboard integration sketch: a named tool calls an existing service method and returns facts for an answer. The SDK permission decision, app-user authorization, business approval, UI, and telemetry remain distinct. The five runnable quickstarts and detailed notes cover the wiring afterward. Current API examples use `@microsoft/copilot-sdk` 2.0.0.

**Do my app's users each need a Copilot license?** It depends on the authentication route. User-token sessions require the applicable Copilot subscription; BYOK bypasses Copilot authentication and bills your model provider directly. A shared server can attach a GitHub token to each session for per-user identity. Check current terms in [SDK authentication documentation](https://github.com/microsoft/copilot-sdk/tree/main/docs/auth).

## 3. Decide What It Sees

Meet the blind-tests app ([`examples/apps/blind-tests/app.ts`](./examples/apps/blind-tests/app.ts)), which tests FanHub's API without seeing its code. The run shown is from 2026-11-18 on SDK 2.0.0: the tester wrote 14 tests from the API contract alone, the host reran them (12 pass, 2 fail), and a separate read-only referee mapped the failures to `BUGS.md` as leads for the API owner. In-process hosting is not isolation; `permissions.sandbox` is experimental and untested here.

The fresh-eyes app ([`examples/apps/fresh-eyes/app.ts`](./examples/apps/fresh-eyes/app.ts)) gets its own single-page example: docs-only configuration, a structured friction tool, and the observed setup recovery from Node 26 to cached Node 20. The docs owner separates documentation gaps from policy denials. A standalone concept slide explains the execution boundary shared by both examples.

## 4. Controls and the Choice

Microsoft says it has adopted the harness company-wide and is standardizing its Copilot experiences on it; the Official Microsoft Blog names Copilot Code, Copilot Studio, the GitHub Copilot app, the CLI, and VS Code. Foundry Agent Service is a separate managed public preview, and Copilot Studio lists three harness choices. Close with one result from GitHub's same-model study, then use a scorecard and a one-method spike to decide whether SDK 2.0 fits your app better than owning another harness. This is a vendor-attributed case, not a claim that the SDK is the default in every Microsoft experience.

## What You Can Do Today

### Today

- **Score:** Compare the SDK with a team-owned harness for one workflow.
- **Expected signal:** You can name who maintains the loop, the user and execution boundaries, model reach, and what evidence you need.
- **Validate:** Use the scorecard in the deck; it is a decision aid, not a measured result.

### This Week

- **Spike:** Wrap one existing read-only method with SDK 2.0.0 in a disposable environment.
- **Expected signal:** An allowed call returns current facts; a refused request is visible; UI, service audit, and telemetry remain distinct.
- **Validate:** From [`examples/`](./examples/), run `npm test` and inspect the output. All five quickstarts and both apps ran live on SDK 2.0.0 on 2026-11-18; your spike needs its own evidence.

### This Month

- **Review:** Bring the spike evidence to the service and platform owners.
- **Decision:** Extend or stop based on whether identity, execution limits, and evidence meet the team's needs.
- **Boundary:** Keep app-user authorization and any human approval in the existing service; route missing facts to its owner.

### Apply It to Your Work

- **Candidate task:** Choose a recurring question in a repository or service your team owns.
- **Decisive context:** Identify the runtime facts, files, identity, and policy the answer depends on.
- **Delegation and authority:** Name the one method the agent may request, the user check it needs, and the action a person retains.
- **Evidence:** Decide what the UI, telemetry, service audit, and report owner will show when the result succeeds, fails, or is unfavorable.

## Key Artifacts

- **[`examples/sdk-quickstart/`](./examples/sdk-quickstart/):** five small SDK examples, one per harness job.
- **[`examples/apps/blind-tests/app.ts`](./examples/apps/blind-tests/app.ts):** contract-only test writer, host rerun, and separate referee session.
- **[`examples/apps/fresh-eyes/app.ts`](./examples/apps/fresh-eyes/app.ts):** docs-only onboarding check with a structured friction report.
- **[`examples/host-kit/visibility.ts`](./examples/host-kit/visibility.ts):** shared, unit-tested visibility policy for both apps.
- **[`examples/host-kit/run-log.ts`](./examples/host-kit/run-log.ts):** redacted event log joining hooks, host policy, and runtime activity.
- **[`examples/fanhub-overlay/`](./examples/fanhub-overlay/):** repository hook overlay used as a policy floor in both apps.
- **[`examples/test/`](./examples/test/):** deterministic tests for hook decisions and visibility rules.

## Related Patterns

- [Copilot Primitives](../copilot-primitives/README.md): instructions, prompts, agents, and hooks.
- [Custom Agents](../custom-agents/README.md): define reusable roles and workflows.
- [Copilot on GitHub](../copilot-on-github/README.md): review and accept agent output in pull requests.
- [Enterprise Patterns](../enterprise-patterns/README.md): govern controls across an organization.

## References

First-party sources for each claim are listed per slide in the [speaker notes](../../slides/tech-talks/harness-fundamentals/notes.html) and in the `references` frontmatter above.
