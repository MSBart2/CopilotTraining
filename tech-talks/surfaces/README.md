---
status: active
updated: 2026-10-30
section: "Foundations"
audience: [developer, team-lead, platform-engineer, architect]
level: foundational
duration: 45
format: core-talk
decision: "Which Copilot surface fits this work, context, and reviewer?"
prerequisites: []
related: [copilot-cli, copilot-web, multi-agent-coordination]
references:
  - url: https://docs.github.com/en/copilot
    label: "GitHub Copilot documentation"
    verified: 2026-09-14
  - url: https://code.visualstudio.com/docs/copilot/overview
    label: "GitHub Copilot in VS Code"
    verified: 2026-09-14
  - url: https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
    label: "About GitHub Copilot CLI"
    verified: 2026-09-14
  - url: https://docs.github.com/en/copilot/concepts/agents/github-copilot-app
    label: "About the GitHub Copilot app"
    verified: 2026-09-14
  - url: https://github.com/github/copilot-sdk
    label: "GitHub Copilot SDK"
    verified: 2026-09-14
  - url: https://docs.github.com/en/copilot/concepts/agents/code-review
    label: "GitHub Copilot Code Review"
    verified: 2026-09-14
  - url: https://code.visualstudio.com/updates/v1_109
    label: "VS Code release notes: v1.109"
    verified: 2026-09-15
---

# Which Copilot Where? A Practical Surface Router

> **The Question This Talk Answers:**
> *"Which Copilot surface fits this work, its constraints, and its desired outcome — and what capability does the team build next?"*

**Duration:** 45 minutes | **Audience:** Cross-functional teams choosing where agentic work happens

**Thesis:** Start with eligible surfaces, preserve the work's decisive context, then match control, review ownership, and delivery model.

## Present and Study

- **[Open the deck](../../slides/tech-talks/surfaces/index.html)**: 28 animated slides. Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/surfaces/notes.html)**: the talk track, facts for questions, first-party sources, and a time budget for every slide. The notes are the reference for this talk; they print as a handout.

The deck and notes live in [`slides/tech-talks/surfaces/slides.js`](../../slides/tech-talks/surfaces/slides.js). Edit talk content there; this page stays a short landing page.

## 1. Map the Surfaces

Seven Copilot experiences on two axes, where you steer and where the work runs, plus a routing tree from desired outcome to decisive context.

## 2. Start by Role

Each role gets one useful first task, one reviewable artifact, and one clear handoff to the next surface.

## 3. Build Adoption Maturity

Four phases (activate, standardize, delegate, orchestrate), each crossed with reviewed evidence from normal work and tracked on a per-workflow scorecard.

## 4. Compose the Surfaces

A production incident routed across the CLI, VS Code, and the coding agent, plus three handoff patterns and five boundary signals for changing surfaces.

## What You Can Do Today

### Today

- **Try:** Pick one task in flight and name its decisive context, its delivery artifact, and the reviewer who accepts it.
- **Expected signal:** The three answers point at one surface from the routing tree.
- **Validate:** Ask the named reviewer whether that artifact is what they would accept.

### This Week

- **Build:** Classify three recent tasks with [`surface-decision-tree.mmd`](surface-decision-tree.mmd) and add your team's constraints to [`surface-contracts.yml`](surface-contracts.yml).
- **Expected signal:** One documented handoff trigger, such as "the issue is ready to implement".
- **Validate:** Compare the router's picks with the surfaces the team actually chose, and record where they differ.

### This Month

- **Pilot:** Baseline the team across the four phases and practice all three lifecycle patterns on normal work.
- **Success measure:** Local thresholds set before advancing a phase: minimum sample size, acceptance signal, quality guardrail, and escalation limit.
- **Boundary:** When a boundary signal fires, change surfaces at the transition and name the artifact, evidence, reviewer, and escalation trigger.

### Apply It to Your Work

- **Candidate task:** A piece of work your team routes by habit today.
- **Decisive context:** Where its strongest context lives: open files, a terminal session, an issue, or a product runtime.
- **Delegation and authority:** Which surface does the work, what stays human-led, and who approves the delivery artifact.
- **Evidence:** The reviewed artifact, and whether the reviewer accepted it without re-routing.

## Key Artifacts

- **[`surface-contracts.yml`](surface-contracts.yml)**: comparable contracts for all seven Copilot experiences.
- **[`surface-decision-tree.mmd`](surface-decision-tree.mmd)**: Mermaid source for the routing flowchart.
- **[`role-goal-scenarios.yml`](role-goal-scenarios.yml)**: test cases showing how roles, goals, and constraints resolve to a surface.
- **[`adoption-roadmap.yml`](adoption-roadmap.yml)**: training paths from first engagement through multi-agent operation.

## Related Patterns

- **[GitHub Copilot CLI](../copilot-cli/README.md)**: terminal execution, planning, sessions, and remote operation.
- **[Local Agentic SDLC](../local-agentic-sdlc/)**: parallel specialist work, session control, and integration ownership in one orchestrated local run.
- **[Copilot SDK](../copilot-sdk/README.md)**: programmatic embedding and application-defined agent experiences.
- **[Copilot on GitHub](../copilot-on-github/)**: delegating issues to the cloud agent, with code review and Code Quality on every push.
- **[What's New in VS Code](../vscode-latest/README.md)**: current editor-side agent capabilities and workflows.

## References

First-party sources for every claim are listed per slide in the [speaker notes](../../slides/tech-talks/surfaces/notes.html) and in the `references` frontmatter above.