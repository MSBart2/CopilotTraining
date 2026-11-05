---
status: active
updated: 2026-11-05
section: "Extend and Embed"
audience: [developer, platform-engineer, architect]
level: applied
duration: 60
format: core-talk
decision: "Which of the five harness jobs do I take over for this workflow, and what does my host let the agent see, use, and do?"
prerequisites: [copilot-cli]
related: [copilot-primitives, custom-agents, copilot-on-github, enterprise-patterns]
references:
  - url: https://github.com/earendil-works/pi/tree/f9daca3480732d0042b1df3a6e27221f597a620d
    label: "pi coding agent (MIT), pinned at f9daca3"
    verified: 2026-10-26
  - url: https://github.com/github/copilot-sdk
    label: "GitHub Copilot SDK repository"
    verified: 2026-10-26
  - url: https://www.npmjs.com/package/@github/copilot-sdk
    label: "@github/copilot-sdk on npm (1.0.26 used in this talk)"
    verified: 2026-10-26
  - url: https://github.com/github/copilot-sdk/tree/main/docs/auth
    label: "Copilot SDK authentication documentation"
    verified: 2026-10-26
  - url: https://github.com/github/copilot-sdk/blob/main/docs/auth/authenticate.md
    label: "Copilot SDK authentication methods and subscription requirements"
    verified: 2026-11-04
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
    label: "Introducing the Microsoft Copilot harness (Microsoft Blog)"
    verified: 2026-11-05
  - url: https://github.blog/ai-and-ml/github-copilot/evaluating-performance-and-efficiency-of-the-github-copilot-agentic-harness-across-models-and-tasks/
    label: "Evaluating the GitHub Copilot agentic harness across models and tasks (GitHub Blog)"
    verified: 2026-11-05
  - url: https://benchmarks.github.com/
    label: "GitHub Copilot Benchmarks (provisional data, updated 2026-10-21)"
    verified: 2026-11-05
---

# Harness Fundamentals: Getting Inside the Agent Loop

> **The Question This Talk Answers:**
> *"What is an agent harness, and why do I care?"*

**Duration:** 60 minutes | **Audience:** Developers and platform engineers who already use Copilot in the editor or CLI and want the agent inside their own tools

**Thesis:** A harness is a loop with five jobs; the Copilot SDK lets an existing app expose selected methods while the app retains authorization, approval, UI, and telemetry.

## Present and Study

- **[Open the deck](../../slides/tech-talks/harness-fundamentals/index.html):** 39 native slides. Press `N` to open the notes beside it.
- **[Speaker notes](../../slides/tech-talks/harness-fundamentals/notes.html):** complete talk track, evidence, technical boundaries, sources, and per-slide timing. The notes are the handout.
- **[Teaching source](../../slides/tech-talks/harness-fundamentals/slides.js):** slide data and notes together.

## 1. What a Harness Is

Read pi’s loop as source and name its five jobs: loop, context, tools, control, and evidence. The source is pinned at `f9daca3`; it is a readable example, not a claim that every harness shares its implementation.

## 2. Drive GitHub’s Harness

Follow a release-dashboard integration sketch from a question to an existing service method and its result. The SDK permission decision, app-user authorization, business approval, UI, and telemetry remain distinct.

**Do my app's users each need a Copilot license?** Yes, unless you bring your own key. When sessions run with each user's GitHub token (signed-in user or OAuth), every user needs a Copilot subscription and usage counts against their plan. Bring your own key (BYOK) bypasses Copilot authentication and bills your model provider directly. Source: [SDK authentication methods](https://github.com/github/copilot-sdk/blob/main/docs/auth/authenticate.md).

## 3. Decide What It Sees

Meet the blind-tests app ([`examples/apps/blind-tests/app.ts`](./examples/apps/blind-tests/app.ts)), which tests FanHub's API without seeing its code. Follow one observed run, then the exact lines that keep the tester blind: the host reran the suite and a separate referee classified its failures. The API owner still decides what changes.

## 4. Controls and Ideas

Check the controls other teams already own around a harness, run a concrete pre-flight, and pick the first existing app and method to embed it in. Close with the evidence behind the harness itself: Microsoft now runs every Copilot surface on the same harness the SDK exposes, GitHub tests it by holding the model fixed against each vendor's own harness, and the benchmarks show how model and effort choices trade resolution against cost.

## What You Can Do Today

### Today

- **Try:** Read pi’s `runLoop` and label the five jobs.
- **Expected signal:** You can point to the tool result and the stop condition.
- **Validate:** Compare your labels with the pinned source excerpt in the deck notes.

### This Week

- **Build:** Run `01-loop.ts` and `04-control.ts` from `examples/sdk-quickstart/` in a disposable environment.
- **Expected signal:** The first session returns an answer; the control example rejects a shell request and recovers through approved reads.
- **Validate:** Run `npm test` and inspect the output.

### This Month

- **Pilot:** Wrap one existing read-only method as a named tool.
- **Success measure:** An authorized user sees current facts and an unauthorized request gets a visible refusal. Treat these as acceptance checks, not measured outcomes.
- **Boundary:** Keep app-user authorization and any human approval in the existing service; stop and route missing facts to its owner.

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
