---
status: active
updated: 2026-09-15
---

# Agentic Lifecycle Orchestration Research

## Research Brief

**Decision:** How should independently governed workflows hand work off across an issue-to-PR lifecycle?

**Audience:** Developers, team leads, and platform engineers operating repository automation with explicit human authority boundaries.

**Judgment developed:** Delegation, verification, and authority. The talk teaches where each workflow may act, what evidence permits the next handoff, who owns approval, and which visible condition stops the lifecycle.

## Portfolio Basis

The `adoption-pathway` decision is approved. Its coverage experiment found that distributing adoption guidance across existing talks would lose the integrated issue intake, planning, coding, and review state machine. WP4 therefore creates a lifecycle-orchestration owner before `agentic-journey` can be archived.

The replacement owns orchestration only:

| Concern | Canonical owner | Boundary retained here |
|---|---|---|
| Surface selection | `surfaces` | Route work before lifecycle enrollment |
| Reusable repository context | `agent-dev-loop` | Require versioned context before planning |
| Bounded issue-to-PR delegation | `copilot-web` | Coding receives only an approved, bounded plan |
| Recurring repository judgment | `agentic-workflows` | Use compiled Markdown workflows and constrained safe outputs |
| Specialist composition | `agent-teams` | Escalate when one lifecycle phase needs isolated parallel workstreams |
| Trust infrastructure | `agentic-sdlc` | Rely on repository rulesets, CI, and CODEOWNERS for merge authority |

## Source Assessment

The source talk contributes four useful contracts:

1. intake produces classification, routing, duplicate evidence, and `status:triaged`;
2. planning produces a repository-grounded plan and `status:planned`;
3. coding starts only after explicit `/approve-plan` approval and produces a draft pull request;
4. review produces advisory findings before a named human reviewer accepts or returns the work.

The source YAML is not a current deployable baseline. It references prompt files at `.github/prompts/` that are absent there, invokes `copilot -p @file` without a cited supported CI authentication contract, parses model prose with shell text matching, and performs repository writes directly from the agent job. The replacement does not repeat those claims.

The source timing, accuracy, throughput, and savings figures are illustrative and lack a local measurement record. They are not carried forward as expected outcomes. The replacement defines repository-local timestamps and counts so a pilot can establish its own intake, planning, coding, and review baselines.

## Current Mechanism

GitHub Agentic Workflows (`gh-aw`) provides the supported mechanism used by the replacement candidate:

- workflow intent is authored in Markdown;
- `gh aw compile` generates a GitHub Actions lock file;
- the agent job is read-only;
- repository writes pass through declared safe-output handlers;
- workflow markers and Actions logs provide an audit trail;
- `noop` makes a deliberate stop observable.[^1][^2][^3][^4]

The four files under `workflows/` are source templates, not generated lock files. A repository pilot copies them to `.github/workflows/`, compiles them with the locally installed `gh-aw` release, reviews the generated lock files, and commits both source and lock files. Safe-output keys can evolve; compilation is the compatibility check rather than an assumption in this talk.

## State-Machine Contract

| Phase | Trigger | Required prior evidence | Success label | Stop conditions | Handoff owner |
|---|---|---|---|---|---|
| Intake | Issue opened | Structured issue body | `lifecycle:triaged` | duplicate, missing reproduction or acceptance evidence, routing ambiguity | issue triage owner |
| Planning | `lifecycle:triaged` added | Intake comment and versioned repository context | `lifecycle:planned` | unresolved scope, missing test command, unsafe rollback, cross-repository dependency | plan approver |
| Coding | Exact `/approve-plan` issue comment | `lifecycle:planned`, approved plan, authorized approver | `lifecycle:in-review` | unauthorized approval, stale or ambiguous plan, unavailable environment, failing required checks | implementation owner |
| Review | Pull request opened or synchronized | Linked issue, approved plan, draft PR evidence | `lifecycle:reviewed` | blocking deterministic signal, plan drift, unresolved high-confidence finding | CODEOWNER or named reviewer |

Labels are durable audit milestones, not proof by themselves. Each handoff also requires the preceding workflow comment or pull-request evidence. `lifecycle:blocked`, `lifecycle:needs-input`, and `lifecycle:changes-requested` are terminal stop labels until a human resolves and records the recovery.

## Evidence Map

| Claim or mechanism | First-party source | Confidence | Boundary |
|---|---|---|---|
| Markdown agentic workflows compile to Actions lock files | gh-aw overview and how-it-works docs[^1][^2] | Verified from repository baseline | Compile with the installed release; do not hand-author lock files |
| Agent decisions and write execution can be separated with safe outputs | gh-aw architecture and safe-output reference[^3][^4] | Verified from repository baseline | Exact safe-output schema is release-sensitive and compilation-gated |
| Coding agent returns repository work through a pull request | GitHub Copilot coding-agent concepts[^5] | Verified from repository baseline | Task must be bounded and repository-hosted; merge remains governed |
| GitHub Actions events, permissions, and expressions control deterministic triggering | GitHub Actions workflow syntax[^6] | Verified | Compiled lock file remains the executable Actions artifact |
| CODEOWNERS can identify review ownership | GitHub CODEOWNERS documentation[^7] | Verified | Rulesets and branch protection determine whether that review blocks merge |
| Source workflow timing and accuracy figures generalize | No first-party or local evidence | Unsupported | Replaced with local measurement guidance |
| `copilot -p @file` plus `COPILOT_GITHUB_TOKEN` is a supported CI executor | No current source supplied | Unsupported | Omitted; use a compiled gh-aw workflow or a separately validated executor adapter |

## Structural Proposal Selected

The work package fixes the title, decision, preservation contract, and outputs, so the standard proposal pause is intentionally bypassed. The selected reader-first structure is:

1. establish the lifecycle contract and visible state machine;
2. inspect four independently governed workflow and instruction pairs;
3. make approval, stop, recovery, and reviewer ownership explicit;
4. measure each handoff locally and route adjacent decisions to canonical talks.

## Artifact Plan

- `workflows/1-intake.md` + `instructions/intake.md`
- `workflows/2-planning.md` + `instructions/planning.md`
- `workflows/3-coding.md` + `instructions/coding.md`
- `workflows/4-review.md` + `instructions/review.md`

Each workflow declares a trigger, read permissions, constrained outputs, a required instruction contract, and `noop` behavior. Each instruction names inputs, output evidence, stop conditions, recovery, and handoff owner.

## References

[^1]: [GitHub Agentic Workflows overview](https://github.github.com/gh-aw/introduction/overview/)
[^2]: [How GitHub Agentic Workflows work](https://github.github.com/gh-aw/introduction/how-they-work/)
[^3]: [GitHub Agentic Workflows security architecture](https://github.github.com/gh-aw/introduction/architecture/)
[^4]: [GitHub Agentic Workflows safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/)
[^5]: [About the GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent)
[^6]: [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
[^7]: [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
