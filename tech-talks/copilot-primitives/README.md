---
status: active
updated: 2026-10-30
section: "Foundations"
audience: [developer, team-lead, platform-engineer]
level: foundational
duration: 50
format: core-talk
decision: "Which primitive best encodes each piece of shared Copilot behavior?"
prerequisites: [surfaces]
related: [repo-to-feature, copilot-hooks, enterprise-patterns]
references:
  - url: https://code.visualstudio.com/docs/copilot/copilot-customization
    label: "Customize AI in Visual Studio Code"
    verified: 2026-02-08
  - url: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
    label: "Use custom instructions in VS Code"
    verified: 2026-02-08
  - url: https://code.visualstudio.com/docs/copilot/customization/prompt-files
    label: "Use prompt files in VS Code"
    verified: 2026-02-08
  - url: https://code.visualstudio.com/docs/copilot/customization/agent-skills
    label: "Use Agent Skills in VS Code"
    verified: 2026-02-08
  - url: https://code.visualstudio.com/docs/copilot/customization/custom-agents
    label: "Custom agents in VS Code"
    verified: 2026-02-08
  - url: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot
    label: "Adding repository custom instructions for GitHub Copilot"
    verified: 2026-02-08
  - url: https://docs.github.com/en/copilot/reference/custom-instructions-support
    label: "Custom instructions support reference"
    verified: 2026-02-08
  - url: https://agents.md/
    label: "AGENTS.md open format"
    verified: 2026-03-23
  - url: https://code.visualstudio.com/updates/v1_122
    label: "VS Code release notes: June 2026 (v1.122)"
    verified: 2026-09-15
  - url: https://code.visualstudio.com/docs/copilot/customization/language-models
    label: "Configure language models in VS Code"
    verified: 2026-09-15
---

# Copilot Configuration Primitives: Making AI Understand Your Codebase

> **The Question This Talk Answers:**
> *"How can I make GitHub Copilot understand my codebase better?"*

**Duration:** 50 minutes | **Audience:** Developers / Team Leads / Platform Engineers

**Thesis:** Encode stable context with the smallest fitting primitive, then prove delivery, execution, validation, and human acceptance separately.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-primitives/index.html)**: 33 animated slides. Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-primitives/notes.html)**: the talk track, facts and boundaries, demo cues, first-party sources, and a time budget for every slide. The notes print as the handout.

The deck and notes live in [`slides.js`](../../slides/tech-talks/copilot-primitives/slides.js). All teaching content belongs there; this page is the landing page.

## 1. Instructions

Place repository-wide, path-scoped, or directory guidance by owner and selector. Use `/init` as a draft, inspect whether the expected context arrived, and keep delivery evidence distinct from tests and human acceptance.

## 2. Custom Prompts

Capture a task that already worked as a parameterized `/command`. Link shared instructions rather than copying them, and keep the prompt human-triggered unless the workflow earns more structure.

## 3. Skills

Graduate a proven prompt when task matching, scripts, or templates add value. Inspect linked resources before execution, validate the result independently, and leave acceptance with the accountable person.

## 4. Agents

Use an agent when a selected role needs its own configured tools or handoff. A tool list and handoff shape the workflow; neither substitutes for execution controls or human approval.

## What You Can Do Today

### Today

- **Try:** Draft one concise repository instruction and ask Copilot for a bounded task.
- **Expected signal:** The client identifies the instruction file in References or diagnostics.
- **Validate:** Compare the diff with repository conventions, run the relevant checks, and name the reviewer.

### This Week

- **Build:** Add one path-specific instruction with an explicit `applyTo` selector.
- **Expected signal:** The matching file and a non-matching file receive the intended scope.
- **Validate:** Inspect loaded context, run checks for the target area, and review the change.

### This Month

- **Pilot:** Turn a task your team already solved into a shared prompt; add a skill only if linked resources improve the workflow.
- **Success measure:** Record whether the recipe is reused, which checks pass, and what review changes remain. Treat any target as unmeasured until collected.
- **Boundary:** Pause when the selector misses, a script’s effects are unclear, host support differs, or no accountable reviewer is available.

### Apply It to Your Work

- **Candidate task:** A repeated code or test workflow in one of your repositories.
- **Decisive context:** The relevant files, repository conventions, test commands, and runtime support.
- **Delegation and authority:** Copilot may propose or execute only within the configured and environmental controls; a named person owns acceptance.
- **Evidence:** Inspect selector eligibility, loaded context, tools used, independent checks, the diff, and the acceptance decision.

## Key Artifacts

- **[Repository instructions example](examples/copilot-instructions.md)**: shared coding, build, and test guidance.
- **[Path-specific instructions example](examples/models.instructions.md)**: Prisma conventions scoped to `src/models/**/*.ts`.
- **[Prompt example](examples/component.prompt.md)**: React component workflow with reusable inputs.
- **[Skill example](examples/test-runner-skill.md)**: test execution and failure-analysis workflow.
- **[Agent example](examples/database.agent.md)**: database role with constrained tools and model preferences.
- **[Example collection](examples/)**: supporting files and patterns. Review examples against current host support before adoption.

## Related Patterns

- **[Repository to feature](../repo-to-feature/README.md)**: connect repository context to a feature workflow.
- **[Copilot hooks](../copilot-hooks/README.md)**: inspect execution-time control points and boundaries.
- **[Enterprise patterns](../enterprise-patterns/README.md)**: apply ownership and governance across teams.
- **[MCP Apps](../mcp-apps/)**: a complementary pattern for external tools and data.

## References

First-party sources for claims are listed in the [speaker notes](../../slides/tech-talks/copilot-primitives/notes.html) and above. Their `verified` dates are source-check dates, not a guarantee of current feature availability. Check documentation for the VS Code or GitHub Copilot host and version you use.
