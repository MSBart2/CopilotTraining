---
status: active
updated: 2026-11-02
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
  - url: https://code.visualstudio.com/docs/agent-customization/custom-instructions
    label: "Use custom instructions in VS Code"
    verified: 2026-11-02
  - url: https://code.visualstudio.com/docs/agent-customization/prompt-files
    label: "Use prompt files in VS Code"
    verified: 2026-11-02
  - url: https://code.visualstudio.com/docs/agent-customization/agent-skills
    label: "Use Agent Skills in VS Code"
    verified: 2026-11-02
  - url: https://code.visualstudio.com/docs/agent-customization/custom-agents
    label: "Custom agents in VS Code"
    verified: 2026-11-02
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
> *"How can I teach Copilot how we work—and put it to work?"*

**Duration:** 50 minutes | **Audience:** Developers / Team Leads / Platform Engineers

**Thesis:** Make reviewed team know-how reusable, keep it useful, and choose the smallest fitting primitive for the next task. Inspect the work and keep acceptance human-led.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-primitives/index.html)**: 34 animated slides. Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-primitives/notes.html)**: the talk track, facts and boundaries, demo cues, first-party sources, and a time budget for every slide. The notes print as the handout.

Estimated delivery: **46:40**, leaving **3:20** for questions within the 50-minute session. Confirm pacing in a presenter run-through.

The deck and notes live in [`slides.js`](../../slides/tech-talks/copilot-primitives/slides.js). All teaching content belongs there; this page is the landing page.

## 1. Instructions

Bring product, accessibility, engineering, and operations knowledge into reviewed guidance. Keep the shared baseline concise: use explicit task directions to point Copilot to detailed documents, then add focused `applyTo` guidance where it matches the work. Follow one deployment request as the supported VS Code baseline arrives automatically, a matching runbook rule applies, and Copilot is told when to read the deployment guide; unrelated accessibility guidance stays outside that task. After a significant change, ask Copilot whether existing guidance needs a targeted update, have an owner review it, retry the same task, and troubleshoot discovery or scope from observable evidence.

## 2. Custom Prompts

Work with Copilot until a documentation review is useful, then capture the approach as `/refresh-docs`: a human-invoked workflow with a change input, linked current guidance, and an evidence-shaped output. Reuse it for a deployment-command change and a configuration rename, inspect and refine the second result, then share the versioned prompt. The function analogy helps design reuse; model output still needs review. A prompt is a valid destination.

## 3. Skills

Make relevant expertise discoverable during work. Follow name/description discovery into `SKILL.md`, then consult maintained references as needed. A knowledge-only documentation-review skill reads the same guide as the prompt; optional templates organize findings and optional scripts check bounded properties. Inspect actual selection and output, invoke `/docs-review` explicitly when useful, and leave acceptance with the maintainer. Prompts and skills can coexist without a maturity ladder.

## 4. Agents

Select Documentation Reviewer for a recurring responsibility: review significant changes for documentation impact and propose evidence-backed updates. The role adds a remit, read/search/edit tools, a deliverable, and stopping conditions while referencing the existing documentation-review skill and maintained guide. Follow the same configuration rename into a cited doc patch and an unanswered default-value question. The optional `/refresh-docs` agent target provides a deliberate entry in a supported prompt host; direct role selection also works. Use only the primitives that help, and keep human acceptance separate from tool access and check status. These assets and traces are illustrative, not an installed sample or an observed run.

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

- **Pilot:** Capture a useful task as a shared prompt; use a skill when task-relevant discovery adds value, with or without supporting resources.
- **Success measure:** Record whether the recipe is reused, which checks pass, and what review changes remain. Treat any target as unmeasured until collected.
- **Boundary:** Pause when the selector misses, a script’s effects are unclear, host support differs, or no accountable reviewer is available.

### Apply It to Your Work

- **Candidate task:** A repeated documentation, requirements, quality, or release review in one of your repositories.
- **Decisive context:** The relevant files, repository conventions, test commands, and runtime support.
- **Delegation and authority:** Copilot may propose or execute only within the configured and environmental controls; a named person owns acceptance.
- **Evidence:** Inspect selector eligibility, loaded context, tools used, independent checks, the diff, and the acceptance decision.

## Key Artifacts

- **[Repository instructions example](examples/copilot-instructions.md)**: shared coding, build, and test guidance.
- **[Path-specific instructions example](examples/models.instructions.md)**: Prisma conventions scoped to `src/models/**/*.ts`.
- **[Additional prompt example](examples/component.prompt.md)**: a React component workflow, separate from the deck’s illustrative `/refresh-docs` file.
- **[Additional skill example](examples/test-runner-skill.md)**: a test workflow, separate from the deck’s knowledge-only documentation-review skill.
- **[Agent example](examples/database.agent.md)**: database role with constrained tools and model preferences.
- **[Example collection](examples/)**: supporting files and patterns. Review examples against current host support before adoption.

## Related Patterns

- **[Repository to feature](../repo-to-feature/README.md)**: connect repository context to a feature workflow.
- **[Copilot hooks](../copilot-hooks/README.md)**: inspect execution-time control points and boundaries.
- **[Enterprise patterns](../enterprise-patterns/README.md)**: apply ownership and governance across teams.
- **[MCP Apps](../mcp-apps/)**: a complementary pattern for external tools and data.

## References

First-party sources for claims are listed in the [speaker notes](../../slides/tech-talks/copilot-primitives/notes.html) and above. Their `verified` dates are source-check dates, not a guarantee of current feature availability. Check documentation for the VS Code or GitHub Copilot host and version you use.
