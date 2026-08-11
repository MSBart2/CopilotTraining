# CopilotTraining

> Open training content for teams adopting GitHub Copilot, customizations, agent workflows, and AI-assisted software delivery.

## Start Here

The easiest way to use this repository is the live site:

- [Browse CopilotTraining on GitHub Pages](https://msbart2.github.io/CopilotTraining/)

That is the fastest way to find the right workshop module, tech talk, or executive talk without learning the repository structure first.

## Choose Your Path

| If you are trying to... | Start here | Why |
|-------------------------|------------|-----|
| Build hands-on skill with Copilot customizations and agent workflows | [Workshop](workshop/) | Best for structured learning, team training, and experiential practice |
| Understand a specific capability or technical pattern | [Tech Talks](tech-talks/) | Best for engineers, architects, and technical champions who need depth |
| Explain the organizational or economic implications to leadership | [Executive Talks](exec-talks/) | Best for leaders making adoption, investment, and operating-model decisions |
| Just browse the material quickly | [Live Site](https://msbart2.github.io/CopilotTraining/) | Best for first-time visitors who want the easiest navigation |

If you want the simplest recommendation: start on the live site, then choose a workshop, tech talk, or executive talk based on your audience.

## Why This Repo Exists

Most Copilot material explains features one at a time. This repository is organized around a more useful question: **how do teams actually get better results from AI-assisted development?**

Copilot becomes much more valuable when people move beyond one-off prompting and start shaping context, workflows, guardrails, and operating models. The bottleneck is no longer only code production — it is clarity, context, judgment, and system design. The content here reflects that: instructions, prompts, skills, agents, workflows, repository design, and operating models.

## Live Site vs. Repository

Use the [live site](https://msbart2.github.io/CopilotTraining/) for the easiest browsing experience. Use the repository directly to read source Markdown, adapt material for your team, or contribute new content.

## Repository Layout

| Path | Purpose |
|------|---------|
| [workshop](workshop/) | Hands-on training modules and persona-driven exercises |
| [tech-talks](tech-talks/) | Reader-first technical deep dives |
| [exec-talks](exec-talks/) | Leadership-focused thought leadership content |
| [slides](slides/) | Slidev slide decks for workshop, tech talks, and executive talks |
| [docs](docs/) | Supporting authoring documentation and internal guides |

## For Contributors

- [tech-talks/README.md](tech-talks/README.md) — tech talk authoring workflow
- [docs/announcement-feed/README.md](docs/announcement-feed/README.md) — feed-driven refresh workflow for existing tech talks
- [.github/skills/content-refresh/SKILL.md](.github/skills/content-refresh/SKILL.md) — verify feed items and draft a talk refresh plan
- [.github/skills/ledger-tech-talk-refresh/SKILL.md](.github/skills/ledger-tech-talk-refresh/SKILL.md) — intake routing queue, approval flow, and full talk refresh execution
- [slides/TEMPLATE.md](slides/TEMPLATE.md) — slide design patterns
- [AGENTS.md](AGENTS.md) — repo-wide Copilot guidance
- [workshop/README.md](workshop/README.md) — workshop narrative and module structure

### First step for existing tech talks

When a live talk may be stale, start with the announcement-feed refresh workflow before writing anything:

```bash
npm run content:route
```

Then review the generated report and the routing ledger, and use the `content-refresh` or `ledger-tech-talk-refresh` skill to decide whether a talk needs a README, recipe, or slide refresh.

## License

This content is open source under the MIT License.
