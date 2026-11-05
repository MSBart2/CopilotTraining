---
status: active
portfolioState: deployed
updated: 2026-10-30
section: "Agents on GitHub"
audience: [platform-engineer, team-lead, developer]
level: advanced
duration: 55
format: core-talk
decision: "What can agents run continuously in my repository, and how do I keep them in bounds?"
prerequisites: [copilot-primitives]
related: [copilot-on-github, copilot-hooks, agentic-sdlc]
references:
  - url: https://github.github.com/gh-aw/
    label: "GitHub Agentic Workflows docs home"
    verified: 2026-10-21
  - url: https://githubnext.github.io/gh-aw-wizard/
    label: "GitHub Agentic Workflow Generator (wizard)"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/patterns/issue-ops/
    label: "IssueOps pattern"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/
    label: "Welcome to Peli's Agent Factory"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/introduction/overview/
    label: "GitHub Agentic Workflows overview"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/introduction/architecture/
    label: "GitHub Agentic Workflows security architecture"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/frontmatter/
    label: "Frontmatter reference"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/triggers/
    label: "Triggers and repository access roles"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/command-triggers/
    label: "Command triggers"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/engines/
    label: "AI engines"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/tools/
    label: "Tools"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/network/
    label: "Network permissions"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/safe-outputs/
    label: "Safe outputs"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/staged-mode/
    label: "Staged mode"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/copilot-cloud-agent/
    label: "Safe outputs for the Copilot cloud agent"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/integrity/
    label: "Integrity filtering"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/cost-management/
    label: "Cost management"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/outcomes/
    label: "Outcomes"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/experimental/trace-graders/
    label: "Graders (experimental)"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/experimental/experiments/
    label: "A/B experiments and evals (experimental)"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/setup/cli/
    label: "gh aw CLI commands"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/patterns/chat-ops/
    label: "ChatOps pattern"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/patterns/research-plan-assign-ops/
    label: "ResearchPlanAssignOps pattern"
    verified: 2026-10-21
  - url: https://github.github.com/gh-aw/reference/faq/
    label: "GitHub Agentic Workflows FAQ"
    verified: 2026-10-21
  - url: https://github.com/github/gh-aw/releases
    label: "gh-aw releases"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/issues/202
    label: "FanHub /triage run on issue #202"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/193
    label: "FanHub issue-to-draft-PR lifecycle pilot"
    verified: 2026-10-21
---

# GitHub Agentic Workflows: Continuous AI for Your Repository

> **The Question This Talk Answers:**
> *"What can agents run continuously in my repository, and how do I keep them in bounds?"*

**Duration:** 55 minutes | **Audience:** Platform engineers, maintainers, and team leads who own a repository's `.github/workflows`

**Thesis:** An agentic workflow is a readable contract: frontmatter grants authority, safe outputs are its only write path, and the source, compiled lock, and run audit expose the authority chain.

## Present and Study

- **[Open the deck](../../slides/tech-talks/agentic-workflows/index.html):** 38 animated slides. Press `N` to open speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/agentic-workflows/notes.html):** talk track, questions to prepare for, demo cues, first-party evidence, and a time budget for every slide. The notes print as a handout.

The deck and notes live in [`slides.js`](../../slides/tech-talks/agentic-workflows/slides.js). Edit talk content there; this page stays a short landing page.

## 1. Why and When

Use the recurring + judgment + bounded-write test to choose work. Issue triage is the running example; a gallery shows event-driven and scheduled patterns, with a human owning each handoff to implementation.

## 2. Read the Contract

Read the real FanHub workflow source, body, compiled lock, safe outputs, and staged mode. The authority chain stays visible from the declaration through the run audit, including its deliberate trust choices and boundaries.

## 3. Build One Live

Use the wizard to turn task intent into a prompt, then let repository context inform a draft. The reviewer narrows allowed outputs, limits, target, and staging before compiling and inspecting a preview.

## 4. Run and Troubleshoot

Separate job status from domain results. Use run Summary, `gh aw audit`, `gh aw logs`, experimental evals, and Outcomes for distinct evidence, know when another tool fits better, and tell Copilot automations apart from agentic workflows.

## What You Can Do Today

### Today

- **Try:** Choose one recurring repository task and write down its judgment, initiator, and smallest useful write.
- **Expected signal:** A wizard prompt that states the task, trigger, and output without granting unrelated authority.
- **Validate:** Review the prompt with the five questions in the speaker notes before copying it to a coding agent.

### This Week

- **Build:** Draft the workflow in a test repository, compile the lock, and enable staged mode.
- **Expected signal:** A staged preview that a maintainer can compare with their own expected labels or comment.
- **Validate:** Inspect the run Summary and `gh aw audit`; compare the proposal with a maintainer's decision.

### This Month

- **Pilot:** Run staged triage across representative issues and collect corrections, accepted outputs, and run cost.
- **Success measure:** Agreement with maintainer decisions and accepted Outcomes; treat any target as unmeasured until the pilot produces evidence.
- **Boundary:** Pause when evidence is weak, output exceeds the declared boundary, nobody owns review, or the task is deterministic.

### Apply It to Your Work

- **Candidate task:** A recurring issue, failure report, backlog digest, or research-to-plan handoff in your repository.
- **Decisive context:** Relevant code, issue history, existing labels, repository conventions, and the team's trust and network policies.
- **Delegation and authority:** Let the agent read and propose; a separate job applies only declared writes; a named maintainer accepts, adjusts, or stops the result.
- **Evidence:** Inspect the staged output, compiled permissions, audit, and later Outcomes; narrow the contract or choose another tool when evidence fails.

## Key Artifacts

- [`examples/example-flow-prompt.md`](examples/example-flow-prompt.md): saved wizard prompt and its FanHub intent.
- [`examples/triage-wizard.md`](examples/triage-wizard.md): repository-aware workflow example, including frontmatter and judgment instructions.
- [`examples/triage-wizard.lock.yml`](examples/triage-wizard.lock.yml): compiled lock used to inspect jobs and permissions.
- [`examples/fanhub-issue-research.md`](examples/fanhub-issue-research.md): supporting repository research.
- [`examples/fanhub-intake-pilot.md`](examples/fanhub-intake-pilot.md): supporting pilot context.

## Related Patterns

- [Copilot on GitHub](../copilot-on-github/README.md): coding agent, code review, and Code Quality after planned work is handed off.
- [Copilot Hooks](../copilot-hooks/README.md): deterministic controls around agent sessions.
- [Agentic SDLC](../agentic-sdlc/README.md): repository readiness and the path to more autonomous delivery.

## References

First-party sources for each slide claim are linked in the [speaker notes](../../slides/tech-talks/agentic-workflows/notes.html). The full reference inventory remains in this page's frontmatter.
