---
status: active
portfolioState: deployed
updated: 2026-11-04
section: "Agents on GitHub"
audience: [developer, team-lead, platform-engineer]
level: applied
duration: 60
format: core-talk
decision: "Which pull request steps can run automatically through the cloud agent, code review, and Code Quality, and where do I steer the rework and approve the merge?"
prerequisites: [copilot-primitives]
related: [agentic-lifecycle, copilot-governance, copilot-hooks]
references:
  - url: https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent
    label: "About Copilot cloud agent"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results
    label: "Get the best results from Copilot cloud agent"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/
    label: "Changelog: research, plan, and code with Copilot cloud agent"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/agents/code-review
    label: "About Copilot code review"
    verified: 2026-10-23
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review
    label: "Configure automatic Copilot code review"
    verified: 2026-10-23
  - url: https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/
    label: "Changelog: Copilot code review can approve pull requests (preview)"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/
    label: "Changelog: agent-specific instructions with excludeAgent"
    verified: 2026-10-21
  - url: https://docs.github.com/en/code-security/concepts/code-quality/code-quality
    label: "About GitHub Code Quality"
    verified: 2026-10-21
  - url: https://docs.github.com/en/code-security/reference/code-quality/codeql-detection
    label: "CodeQL-powered analysis for Code Quality"
    verified: 2026-10-23
  - url: https://docs.github.com/en/code-security/reference/code-quality/codeql-queries/go-queries
    label: "Go CodeQL queries for Code Quality"
    verified: 2026-10-23
  - url: https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/
    label: "Changelog: GitHub Code Quality is generally available"
    verified: 2026-10-21
  - url: https://docs.github.com/en/billing/concepts/product-billing/github-code-quality
    label: "GitHub Code Quality billing"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/221
    label: "FanHub draft #221: one issue through all three agents"
    verified: 2026-10-23
  - url: https://github.com/MSBart2/FanHub/pull/210
    label: "FanHub draft #210 from Copilot cloud agent"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/198
    label: "FanHub #198 Copilot review finding a browser gap"
    verified: 2026-10-08
  - url: https://github.com/MSBart2/FanHub/pull/199
    label: "FanHub #199 coverage gate demonstration"
    verified: 2026-10-08
  - url: https://github.com/MSBart2/FanHub/pull/201
    label: "FanHub #201 Code Quality Autofix demonstration"
    verified: 2026-10-08
---

# Copilot on GitHub: Produce, Reason, Measure

> **The Question This Talk Answers:**
> *"Copilot can write, review, and check my code. What’s automatic, and where does my judgment come in?"*

**Duration:** 60 minutes | **Audience:** Developers and team leads who own a repository's pull request flow, and platform engineers who configure it

**Thesis:** The three agents respond to events rather than running as a pipeline: a person starts the work, pushes wake review and measurement, rework creates another push, and a person ends the loop.

## Present and Study

- **[Open the native deck](../../slides/tech-talks/copilot-on-github/index.html):** 32 slides. Press `N` to open the notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-on-github/notes.html):** the complete talk track, evidence, facts for questions, and estimated time for each slide. The notes print as a handout.

The deck and notes are the teaching source in [`slides.js`](../../slides/tech-talks/copilot-on-github/slides.js). Speaking time is estimated at 47:05, leaving about 13 minutes for live demos and questions; a presenter run-through will calibrate the estimate.

## 1. Produce: Copilot Cloud Agent

Shape a bounded issue with observable acceptance criteria, then inspect the cloud agent's plan, branch, diff, tests, and session log. The FanHub issue rewrite and lockfile correction show how to steer without taking over the branch.

## 2. Reason: Copilot Code Review

Configure when review runs, then read the assessment alongside its commit and open-issues list. The FanHub Retry example shows why passing tests and a green build can coexist with a browser interaction gap.

## 3. Measure: GitHub Code Quality

Use Evaluate mode to learn what a rule would block before activating a trusted threshold. Standard findings, AI findings, and security analysis have distinct status and authority.

## 4. Wire It Together

Trace one observed FanHub pull request through its human actions, pushes, reviews, quality scans, and rework. End with a decision record that separates evidence available, evidence missing, policy, human judgment, and recovery.

## What You Can Do Today

### Today

- **Try:** Run one issue through all three agents. The developer rewrites one bug with scope and acceptance criteria and assigns it to the cloud agent; the platform owner turns on Review new pushes at Balanced effort and Code Quality with rules in Evaluate on that repository.
- **Expected signal:** Every push on the draft produces a review and a Code Quality run tied to its commit.
- **Validate:** The team lead reads the pull request with who acted, which SHA each agent saw, and what evidence is still missing, then writes the decision record.

### This Week

- **Build:** Pick one missing review or evidence step and change one repository setting.
- **Expected signal:** The next qualifying push produces the expected review or check on its new head.
- **Validate:** Confirm the trigger, commit SHA, result, and owner from the PR record.

### This Month

- **Pilot:** Observe a small set of bounded issues and rules in Evaluate mode before promoting any enforcement.
- **Success measure:** Record the team’s acceptance criteria as a target, then measure the evidence produced during the pilot.
- **Boundary:** Return a rule to Evaluate or close and reassign a task when the signal or scope falls outside the agreed boundary.

### Apply It to Your Work

- **Candidate task:** A real pull request from a repository your team owns.
- **Decisive context:** The issue, changed paths, commit history, test and workflow results, review threads, and active rulesets.
- **Delegation and authority:** The cloud agent may draft and push; the reviewer and platform owner retain their configured decisions; a person approves and merges.
- **Evidence:** Identify the SHA each agent saw, what each result establishes, what remains untested, and the recovery path.

## Key Artifacts

- **[Native deck and notes](../../slides/tech-talks/copilot-on-github/):** reusable event map, decision record, and role-by-role next moves.
- **[FanHub issue #159](https://github.com/MSBart2/FanHub/issues/159):** example of rewriting a one-sentence bug as a bounded task with acceptance criteria and scope.
- **[FanHub draft #221](https://github.com/MSBart2/FanHub/pull/221):** one observed event history through all three agents; it remained a draft with no merge decision.
- **[FanHub #210](https://github.com/MSBart2/FanHub/pull/210):** separate maintainer merge decision and evidence record.

## Related Patterns

- **[GitHub Agentic Workflows](../agentic-lifecycle/README.md):** scheduled and event-driven repository judgment with its own authority contract.
- **[Copilot Governance](../copilot-governance/README.md):** policies, budgets, and who may promote agent authority.
- **[Copilot Hooks](../copilot-hooks/README.md):** deterministic checks around agent sessions.

## References

First-party product sources and observed examples are listed in the `references` frontmatter and beside claims in the [speaker notes](../../slides/tech-talks/copilot-on-github/notes.html). Preview status, pricing, and product availability are dated; verify current documentation before operational use.
