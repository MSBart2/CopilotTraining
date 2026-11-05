---
status: active
portfolioState: deployed
updated: 2026-11-04
section: "Foundations"
audience: [developer, platform-engineer, team-lead]
level: applied
duration: 45
format: core-talk
decision: "How do I write one agent file that works in every Copilot surface my team uses?"
prerequisites: [copilot-primitives]
related: [local-agentic-sdlc, copilot-on-github, agentic-lifecycle, copilot-hooks]
references:
  - url: https://docs.github.com/en/copilot/reference/custom-agents-configuration
    label: "Custom agents configuration reference"
    verified: 2026-11-04
  - url: https://docs.github.com/en/copilot/concepts/customizations/custom-agents
    label: "About custom agents"
    verified: 2026-11-04
  - url: https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations
    label: "Comparing GitHub Copilot customizations"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
    label: "Create custom agents for Copilot CLI"
    verified: 2026-11-04
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents
    label: "Create custom agents for Copilot cloud agent"
    verified: 2026-11-04
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
    label: "Customize the cloud agent environment (copilot-setup-steps.yml)"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/github-copilot-app/customize-github-copilot-app
    label: "Customizing the GitHub Copilot app"
    verified: 2026-11-04
  - url: https://code.visualstudio.com/docs/agent-customization/custom-agents
    label: "VS Code: custom agents"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference
    label: "VS Code: custom agent file reference"
    verified: 2026-11-04
  - url: https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view
    label: "VS Code: Chat Debug view and Agent Debug Log"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md
    label: "FanHub test-writer.agent.md (example file)"
    verified: 2026-10-21
---

# Custom Agents: One File, Every Surface

> **The Question This Talk Answers:**
> *"How do I write one agent file that works in every Copilot surface my team uses?"*

**Duration:** 45 minutes | **Audience:** Developers and platform engineers who write custom agents the team shares, and team leads who rely on them

**Thesis:** Every Copilot surface reads an agent's description and body, and each surface honors its own set of frontmatter fields. Write the role, boundary, and output contract in the body with portable tool aliases, then add surface fields on purpose where you know they apply.

## Present and Study

- **[Open the deck](../../slides/tech-talks/custom-agents/index.html):** 30 animated slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/custom-agents/notes.html):** the complete talk track, facts for questions, live cues, first-party sources, and a time budget for every slide. The notes print as the handout.

The teaching source is [`slides.js`](../../slides/tech-talks/custom-agents/slides.js). Update slide content and notes there; this page stays a landing page.

## 1. Choose the Custom Agent

A custom agent earns its file when the work needs a persistent role. Inside the file, the description selects the agent, the tools set its boundary, and the body teaches its method and output contract.

## 2. Write the Portable Core

Put the file in `.github/agents/` or `~/.copilot/agents/`, where every surface looks. Give it a stable ID, a description that selects well, and portable tool aliases. Carry the boundary, next step, and output contract in the body, and treat the model as a preference written in each surface's format.

## 3. Add Surface Fields on Purpose

Read the what-works-where table for VS Code Local, VS Code Copilot, Copilot CLI, Copilot cloud agent, and the GitHub Copilot app. Check fields whose meaning differs by surface, then place Local-only, Copilot runtime, and cloud agent fields where they apply. Hooks, permissions, and review decide what changes.

## 4. Confirm the Load and Apply It

Confirm which agent, model, and tools loaded on each surface your team uses. Start new agents from a portable skeleton and audit one shared agent with four checks: location, core, fields placed, load confirmed.

## What You Can Do Today

- **Today:** Move one shared agent into `.github/agents/` and check each of its frontmatter fields against the what-works-where table.
- **This week:** Restate any Local-only field's intent in the body, then confirm the agent, model, and tools on each surface your team uses.
- **With the team:** Agree which surfaces the team supports, and name who owns the shared agent files and the surface checks.
- **Apply it to your work:** Which field in your shared agent works on one surface only?

## Key Artifacts

- [FanHub `test-writer.agent.md`](https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md): a complete agent file you can read, with a portable body and a few surface-specific fields.
- [Custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) and [VS Code custom agent file reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference): the field definitions behind the what-works-where table.

## Related Talks

- [Copilot Primitives](../copilot-primitives/README.md): where custom agents sit among instructions, prompts, skills, and hooks.
- [Local Agentic SDLC](../local-agentic-sdlc/README.md): orchestration across agents and worktrees.
- [Copilot on GitHub](../copilot-on-github/README.md): cloud agent, code review, and Code Quality on one pull request.
- [GitHub Agentic Workflows](../agentic-lifecycle/README.md): event-triggered agents with safe outputs.
- [Copilot Hooks](../copilot-hooks/README.md): controls that can enforce boundaries beyond the profile.

## References

First-party sources appear on the relevant slides and in the [speaker notes](../../slides/tech-talks/custom-agents/notes.html). Field support was checked against the references on 2026-11-04.
