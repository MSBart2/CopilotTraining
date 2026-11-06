---
status: archived
updated: 2026-10-31
section: "Extend and Embed"
audience: [developer, platform-engineer]
level: applied
duration: 25
format: core-talk
decision: "How can teams package and distribute Copilot extensions and configuration?"
prerequisites: [copilot-primitives]
related: [copilot-sdk, mcp-apps]
references:
  - url: https://code.visualstudio.com/docs/copilot/customization/agent-plugins
    label: "Agent plugins for Copilot customization"
    verified: 2026-04-17
  - url: https://github.com/github/copilot-plugins
    label: "Official Copilot Plugins Repository"
    verified: 2026-04-17
  - url: https://microsoft.github.io/apm/introduction/what-is-apm/
    label: "APM - Agent Package Manager Documentation"
    verified: 2026-04-17
  - url: https://github.com/github/awesome-copilot
    label: "Awesome GitHub Copilot - Community Curated List"
    verified: 2026-04-17
  - url: https://github.blog/changelog/2026-08-03-enterprise-team-specialization-for-managed-settings
    label: "Enterprise team specialization for managed settings"
    verified: 2026-08-10
---

# Copilot Plugins & APM: Composable AI Extensions

> **The Question This Talk Answers:**
> *"How do I extend Copilot with custom capabilities and share them across teams and repositories?"*

**Duration:** 25 minutes | **Audience:** Developers and platform engineers deciding how Copilot configuration travels with a repository

**Thesis:** Try an extension against a real task, then package only the reviewed project configuration whose source, scope, resolution, and owner are clear.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-plugins/index.html)**: 36 slides. Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-plugins/notes.html)**: the talk track, facts for questions, demo boundaries, first-party sources, and a time budget for every slide. The notes print as a handout.

The deck and notes live in [`slides.js`](../../slides/tech-talks/copilot-plugins/slides.js). The notes are the teaching source; this page is the landing page.

## 1. The Opportunity

Separate a personal plugin trial from team-owned repository configuration. A manifest and lockfile make project intent and resolution visible for review.

## 2. CLI-First Plugin Management

Use discovery commands as a starting point, then inspect source, permissions, and task evidence. Catalog output is a lead, not proof of trust or fit.

## 3. Building an APM Manifest

Walk from illustrative `apm.yml` examples to a lockfile review and CI consistency check. Enterprise managed settings are a separate governance layer, not APM inheritance.

## 4. What You Can Do Today

Try one capability against a real task in an approved boundary. Record the evidence, identify the repository owner, and let that person decide whether to adopt it.

## Transfer Actions

- **Today:** Select one task, inspect one candidate source, and write down a check for its result.
- **This week:** Run an approved bounded trial; record output, permissions, and the owner’s decision.
- **This month:** Pilot one repository manifest and review the manifest-lockfile pair with an update and rollback owner.
- **Apply it to your work:** Name the repository, decisive context, allowed scope, observable acceptance evidence, and person who approves or escalates.

These are suggested planning horizons, not measured completion times. The source talk’s 15-minute, one-hour, and two-to-four-hour estimates remain estimates.

## Key Artifacts

- **`apm.yml` and `apm-lock.yml`**: illustrative configuration examples are shown and explained in the deck and notes; check current APM documentation before applying them.
- **[Discovery and install walkthrough](examples/walkthrough.md)**: command shapes, manifest and lockfile examples, and fresh-clone checks.
- **[FanHub plugin package](examples/fanhub-plugin/README.md)** and its [walkthrough](examples/fanhub-plugin/WALKTHROUGH.md): an existing package example with agents, prompts, skills, and an MCP server.
- **[Awesome GitHub Copilot](https://github.com/github/awesome-copilot)**: community-curated plugins, tools, and integrations.

No plugin was installed and no trust or repository configuration was changed during this conversion. The CLI transcripts and package outputs in the deck are explicitly illustrative.

## Related Patterns

- **[Copilot Primitives](../copilot-primitives/README.md)**: instructions, skills, and MCP servers that APM can package.
- **[Copilot CLI](../copilot-cli/README.md)**: command-line workflows and plugin management.

## References

Slide-specific sources are linked in the [speaker notes](../../slides/tech-talks/copilot-plugins/notes.html). The plugin and APM references above were marked verified on 2026-04-17; the managed-settings changelog was marked verified on 2026-08-10. This conversion does not revalidate current product behavior; check the linked documentation before use.
