---
status: active
portfolioState: deployed
updated: 2026-10-31
section: "Agents at Your Keyboard"
audience: [developer, team-lead]
level: applied
duration: 45
format: core-talk
decision: "How do I hand an issue to local agents and know when the work is ready for my review?"
prerequisites: [custom-agents]
related: [custom-agents, copilot-cli, copilot-hooks, agentic-workflows, copilot-on-github]
references:
  - url: https://code.visualstudio.com/docs/agents/run/subagents
    label: "VS Code: subagents and orchestration patterns"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/reference/custom-agents-configuration
    label: "Custom agents configuration reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
    label: "Create custom agents for Copilot CLI"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/reference/hooks-reference
    label: "Hooks reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode
    label: "Copilot CLI: autopilot mode"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions
    label: "Copilot CLI: work with multiple sessions"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    label: "Copilot CLI command reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents
    label: "Delegating and parallelizing work with agents"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md
    label: "FanHub sdlc-orchestrator.agent.md"
    verified: 2026-10-22
  - url: https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs
    label: "FanHub verify-before-stop.mjs"
    verified: 2026-10-22
  - url: https://github.com/MSBart2/FanHub/pull/217
    label: "FanHub #217: integrated draft PR for #4 and #5"
    verified: 2026-10-22
---

# Local Agentic SDLC: A Loop with a Contract

> **The Question This Talk Answers:** *"How do I hand an issue to local agents and know when the work is ready for my review?"*

**Duration:** 45 minutes | **Audience:** Developers and tech leads who use agent mode and want local agents to take an issue from plan to a reviewable pull request

A FanHub developer wanted local agents to take two real issues from plan through implementation, tests, review, and integration. The issues both touched the router, so the developer needed an intentional split, visible evidence, bounded sessions, and a human decision before merge.

> **Core insight:** A local agentic SDLC is a loop with a contract. The orchestrator owns sequence, role agents own bounded tasks, tests provide completion evidence, budgets bound each run, and a person decides what merges. Each answer becomes something the team can inspect.

**Run the talk:** [Native deck](../../slides/tech-talks/local-agentic-sdlc/index.html) · [Speaker notes and handout](../../slides/tech-talks/local-agentic-sdlc/notes.html)

## 1. Write the Loop Contract First

Name who plans, edits source, edits tests, and reviews; define the passing evidence, stop budget, and merge owner. Post a risk-first plan and split only across independent files with named integration seams.

## 2. Build the Orchestrator and Its Crew

Keep the orchestrator read-and-delegate only, give each role one boundary, isolate parallel streams in worktrees, and put budget and permission limits on the session.

## 3. Let Evidence Decide When to Stop

Follow the predicted router risk through eight failing tests and a routed repair. See how the Stop hook returns allow or block, what the real and staged records prove, where tests stop short of judging intent, and how budgets hand control to a person.

## 4. Integrate, Then Hand It to a Person

Review the merged whole, record seam resolution and open risks, and give the reviewer an integrated draft with its evidence. Apply the same contract to recurring work only with file-based state and a clear stale-run escalation.

## Apply it to your work

For one issue in your repository, write down:

1. Who plans, edits source, edits tests, and reviews?
2. Which command provides meaningful completion evidence?
3. What credit or turn budget applies, and when does a person take over?
4. Who judges intent and decides what merges?

Then inspect the plan, diff, test output, hook record, and reviewer findings. Route a failed check to its owner or pause for a person.

## FanHub artifacts

- [Issue #4: character detail page and plan](https://github.com/MSBart2/FanHub/issues/4)
- [Issue #5: episode detail page and plan](https://github.com/MSBart2/FanHub/issues/5)
- [Orchestrator agent file](https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md)
- [Stop-hook implementation](https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs)
- [Integrated draft PR #217](https://github.com/MSBart2/FanHub/pull/217)
- [Loop-starter example](examples/loop-starter/README.md) — a separate illustrative starter; sample values are placeholders, and capped `/every` compatibility remains untested.

The FanHub ledger is **one observed run**: about 380 AI credits across four sessions. Developer time and a manual baseline were not measured.

## Related talks

- [Custom Agents](../custom-agents/README.md): design an agent file that resolves across runtimes
- [Copilot CLI](../copilot-cli/README.md): the terminal surface for the local loop
- [Copilot Hooks](../copilot-hooks/README.md): hook events and policy enforcement
- [GitHub Agentic Workflows](../agentic-workflows/README.md): event-triggered agents with safe outputs
- [Copilot on GitHub](../copilot-on-github/README.md): hosted work assigned for review
