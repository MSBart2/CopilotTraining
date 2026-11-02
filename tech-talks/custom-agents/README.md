---
status: active
portfolioState: deployed
updated: 2026-10-31
section: "Foundations"
audience: [developer, platform-engineer, team-lead]
level: applied
duration: 45
format: core-talk
decision: "How can a team design one custom agent that behaves the way it intends in every runtime it reaches?"
prerequisites: [copilot-primitives]
related: [local-agentic-sdlc, copilot-on-github, agentic-lifecycle, copilot-hooks]
references:
  - url: https://docs.github.com/en/copilot/reference/custom-agents-configuration
    label: "Custom agents configuration reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/customizations/custom-agents
    label: "About custom agents"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations
    label: "Comparing GitHub Copilot customizations"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
    label: "Create custom agents for Copilot CLI"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents
    label: "Create custom agents for Copilot cloud agent"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
    label: "Customize the cloud agent environment (copilot-setup-steps.yml)"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agent-customization/custom-agents
    label: "VS Code: custom agents"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference
    label: "VS Code: custom agent file reference"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view
    label: "VS Code: Chat Debug view and Agent Debug Log"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md
    label: "FanHub test-writer.agent.md"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/216
    label: "FanHub #216: test-writer in VS Code"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/215
    label: "FanHub #215: test-writer in Copilot CLI"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/214
    label: "FanHub #214: test-writer in Copilot cloud agent"
    verified: 2026-10-21
---

# Custom Agents: One File, Every Runtime

> **The Question This Talk Answers:**
> *"How do I make one shared agent behave as intended across the runtimes my team uses?"*

**Duration:** 45 minutes | **Audience:** Developers and platform engineers who write custom agents the team shares, and team leads who rely on them

**Thesis:** One agent file carries a shared role across runtimes, and each runtime resolves that file in its own context. Write portable behavior in the body, add runtime-specific fields on purpose, and read the resolved run in every runtime the team uses.

## Present and Study

- **[Open the deck](../../slides/tech-talks/custom-agents/index.html):** 30 animated slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/custom-agents/notes.html):** the complete talk track, facts for questions, live cues, first-party sources, and a time budget for every slide. The notes print as the handout.

The teaching source is [`slides.js`](../../slides/tech-talks/custom-agents/slides.js). Update slide content and notes there; this page stays a landing page.

## 1. Design the Portable Core

Choose a custom agent when the work needs a persistent role and distinct tool boundary. Put the portable method and output contract in the body, then publish the profile at the intended scope.

## 2. Run One File in Three Runtimes

Compare documented field support with observed FanHub resolution in VS Code, Copilot CLI, and cloud agent. The dated examples keep unobserved evidence and the unresolved VS Code model discrepancy visible.

## 3. Prove the Run and Place Each Requirement

Use each runtime's own artifacts to check agent identity, model, tools, checks, and report. Place each gap with its owning layer and a named producer, developer, maintainer, reviewer, or team lead.

## 4. Take It to Your Agents

Predict which line in a shared agent's load report will change, run the same task, and assign one observed gap to its owner. Rerun the same proof after one targeted change.

## What You Can Do Today

- **Today:** Check one shared profile against documented fields, find the winning file for its ID, and open one runtime's debug source.
- **This week:** Run that agent in the runtimes your team uses, fill in the five-question report, and rerun after one owned change.
- **With the team:** Name the profile producer, environment maintainer, reviewer, and policy owner; agree which runtime differences need escalation.
- **Apply it to your work:** Which shared agent would behave differently in another runtime, and which report line would show it first?

## Key Artifacts

- [FanHub `test-writer.agent.md`](https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md): the example profile and its shared role.
- [FanHub pull request #216](https://github.com/MSBart2/FanHub/pull/216), [#215](https://github.com/MSBart2/FanHub/pull/215), and [#214](https://github.com/MSBart2/FanHub/pull/214): dated runtime evidence.
- [Cloud environment setup guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment): the setup workflow used for the cloud recovery.

## Related Talks

- [Copilot Primitives](../copilot-primitives/README.md): where custom agents sit among instructions, prompts, skills, and hooks.
- [Local Agentic SDLC](../local-agentic-sdlc/README.md): orchestration across agents and worktrees.
- [Copilot on GitHub](../copilot-on-github/README.md): cloud agent, code review, and Code Quality on one pull request.
- [GitHub Agentic Workflows](../agentic-lifecycle/README.md): event-triggered agents with safe outputs.
- [Copilot Hooks](../copilot-hooks/README.md): controls that can enforce boundaries beyond the profile.

## References

The evidence and first-party sources appear on the relevant slides and in the [speaker notes](../../slides/tech-talks/custom-agents/notes.html). Reference verification dates remain 2026-10-21; the FanHub results are dated observations, not a product-news refresh.
