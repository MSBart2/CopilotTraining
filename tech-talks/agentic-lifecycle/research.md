---
status: active
updated: 2026-10-06
---

# Agentic Lifecycle Orchestration Research

## Current pilot evidence (2026-10-06)

The [canonical talk](README.md) follows four [compiled, exercised FanHub sources](https://github.com/MSBart2/FanHub/tree/800c8ec/.github/workflows). A maintainer independently applies `gh-aw-research-requested`, `lifecycle:plan-requested`, and `lifecycle:implement-approved` to an issue, then `lifecycle:review-requested` to its draft PR. Status labels record results and do not start another workflow. The sources take their target from each label event; FanHub [issue #110](https://github.com/MSBart2/FanHub/issues/110) is the observed pilot, not a fixed target. The [complete research example](examples/fanhub-issue-research.md) matches the live source at that commit.

The research [run](https://github.com/MSBart2/FanHub/actions/runs/37379341400) identified the CSS scope choice. The [revised plan](https://github.com/MSBart2/FanHub/issues/110#issuecomment-6004332537) followed a correction to an unrunnable solution command and named a working Frontend build and human approver. The implementation [run](https://github.com/MSBart2/FanHub/actions/runs/37483070499) produced [draft PR #193](https://github.com/MSBart2/FanHub/pull/193) with exactly the two approved layout files. The [Frontend build](https://github.com/MSBart2/FanHub/actions/runs/37492880031) and [CodeQL](https://github.com/MSBart2/FanHub/actions/runs/37492871610) passed on its current head. The advisory [review run](https://github.com/MSBart2/FanHub/actions/runs/37495235841) posted a `COMMENT` review and `lifecycle:reviewed`; it did not approve or merge. A local browser comparison matched the baseline layout at 1024px and 300px on three routes, while induced Blazor error recovery remains untested. A human still owns acceptance and merge.

The following research brief and state-machine proposal record the **earlier, uncompiled local sketches** under `workflows/` and `instructions/`. Their automatic handoffs and issue-comment approval trigger are historical design notes; use the compiled FanHub sources and the canonical talk for the current manual-label procedure.

## Historical proposal (through 2026-10-05)

## Research Brief

**Decision:** How do I build and verify one GitHub Agentic Workflow, then connect bounded workflows across an issue-to-PR lifecycle?

**Audience:** Developers, team leads, and platform engineers operating repository automation with explicit human authority boundaries.

**Judgment developed:** Context, delegation, verification, and authority. The talk teaches which judgments fit workflow execution, where each workflow may act, what evidence permits the next handoff, who owns approval, and which visible condition stops the lifecycle.

## Portfolio Basis

The `adoption-pathway` decision is approved. Its coverage experiment found that distributing adoption guidance across existing talks would lose the integrated issue intake, planning, coding, and review state machine. WP4 therefore creates a lifecycle-orchestration owner before `agentic-journey` can be archived.

The replacement owns orchestration only:

| Concern | Canonical owner | Boundary retained here |
|---|---|---|
| Surface selection | `surfaces` | Route work before lifecycle enrollment |
| Reusable repository context | `agent-dev-loop` | Require versioned context before planning |
| Bounded issue-to-PR delegation | `copilot-web` | Coding receives only an approved, bounded plan |
| Recurring repository judgment | `agentic-lifecycle` | Select bounded judgments, triggers, permissions, and safe outputs as part of the lifecycle contract |
| Specialist composition | `agent-teams` | Escalate when one lifecycle phase needs isolated parallel workstreams |
| Trust infrastructure | `agentic-sdlc` | Rely on repository rulesets, CI, and CODEOWNERS for merge authority |

WP12 approves `agentic-lifecycle` as the active replacement for the durable content in `agentic-workflows`. The absorption preserves workflow selection, Markdown-source-to-lock compilation, trigger choice, permission isolation, and safe-output boundaries. It retires the broad ten-use-case catalog because unrelated examples do not expose handoff evidence, stop behavior, recovery ownership, and human authority as clearly as one concrete lifecycle. `agentic-workflows` remains unchanged; this work package does not archive it.

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

The four files under `workflows/` are source templates, not generated lock files. They remain uncompiled candidates: no generated lock file or runtime result was inspected **for those four sources**. A separate, simpler FanHub workflow has now been compiled and run, as documented below. A lifecycle pilot still needs to copy the four sources and their instructions, compile each against its installed release, review the generated locks, and exercise the intended handoffs.

The source-to-runtime chain has four distinct evidence states:

1. Markdown source records trigger, read permissions, safe outputs, and the phase instruction contract.
2. `gh aw compile` produces a generated `.lock.yml`; that generated file remains unedited.
3. Repository review verifies the lock file's jobs and effective permissions against the source intent.
4. A bounded run supplies runtime evidence through Actions logs and repository artifacts.

Only the first state is present for the four lifecycle sources in this talk directory. The independent FanHub intake pilot has evidence for all four states.

## 2026-10-05 FanHub Pilot Evidence

The [complete source](examples/fanhub-intake-pilot.md), [committed FanHub source](https://github.com/MSBart2/FanHub/blob/9468f40/.github/workflows/gh-aw-intake-pilot.md), and [generated lock](https://github.com/MSBart2/FanHub/blob/9468f40/.github/workflows/gh-aw-intake-pilot.lock.yml) form an inspectable single-issue teaching example. `gh-aw v0.89.21` compiled the source with `--validate` on native Windows. The lock requests `contents: read`, `issues: read`, and `copilot-requests: write` for the agent job and separates safe-output writes into handler jobs.

The [first run](https://github.com/MSBart2/FanHub/actions/runs/37343521333) failed in the agent job under the default `auto` model with `400 Unsupported Responses custom tool '(unknown)'`. The workflow initially used a numeric `target` and `max-labels` key that the installed compiler rejected; after quoting the target and dropping the key, compilation passed. Pinning `gpt-5` and recompiling resolved the observed runtime failure in this pilot.

The [second run](https://github.com/MSBart2/FanHub/actions/runs/37344610247) completed all five jobs and posted a [pilot comment on issue #175](https://github.com/MSBart2/FanHub/issues/175#issuecomment-5999154557) plus the `gh-aw-pilot-reviewed` label. The comment reports issue-body evidence, asks for a serialization policy, and says it could not inspect code because the source permitted only paths identified in the issue. This is observed intake behavior; no four-phase transition, code change, plan approval, or PR review has been exercised. The source-to-result gap motivates teaching the full file before the larger lifecycle.

## 2026-10-05 Reusable Research Revision

The [revised source](examples/fanhub-issue-research.md) and [compiled FanHub lock](https://github.com/MSBart2/FanHub/blob/b757063/.github/workflows/gh-aw-intake-pilot.lock.yml) replace manual issue #175 dispatch with `issues.labeled` filtered by `names: [gh-aw-research-requested]`. The agent now searches up to ten relevant repository source, test, documentation, and caller files even when an issue names no paths. One safe-output comment is restricted by both `target: triggering` and `required-labels: [gh-aw-research-requested]`; there is no arbitrary issue target, PR creation, or code-writing output. The label remains on the issue, so a deliberate remove-and-reapply action is required for a new run.

`gh-aw v0.89.21` compiled this revision with `--validate` and zero warnings. The generated lock guards pre-activation on the request label, gives the agent `contents: read`, `issues: read`, and `copilot-requests: write`, and gives a separate handler write permissions with the triggering-issue/required-label constraint. Treat the compiler result, the Actions run, and the issue comment as distinct proof levels. An effort range remains a provisional estimate, not an achieved measurement or approved plan.

The [label-triggered run](https://github.com/MSBart2/FanHub/actions/runs/37349096029) completed six jobs and posted a [second issue #175 comment](https://github.com/MSBart2/FanHub/issues/175#issuecomment-5999739896). It identified six Go model files and four handler files, direct JSON response serialization, and no Go test files in the Go tree. It proposed serialization policy, tests, and compatibility review, with a conditional 4–8 person-hour estimate. An adjacent `PasswordHash` JSON exposure was verified in `go/backend/models/user.go` and `go/backend/handlers/auth_handler.go`; it needs separate maintainer triage, not automatic scope expansion. The comment cited two documentation paths in addition to ten code paths; the ten-file instruction was not a tool-enforced ceiling. The observation proves one research comment, not implementation, approval, or the four-phase lifecycle.

## Workflow-Selection Judgment

A recurring task is a workflow candidate when all four conditions hold:

- the decision needs repository context rather than only deterministic computation;
- one trigger can define the input scope;
- outputs can be restricted by type, count, target, and state;
- repository policy names the human or team that approves, recovers, or accepts the result.

Deterministic build, test, and deployment steps remain conventional Actions. Judgments with unbounded production effects or no named authority remain human-led. This narrows the source talk's broad catalog to one inspectable lifecycle rather than treating every repository task as an agentic-workflow opportunity.

Event triggers fit this lifecycle because every run begins from one observable repository transition. Intake starts from an opened issue; planning starts from the triage label event; coding starts from an exact approval comment; review starts from a draft pull-request event. A schedule is a valid alternative for periodic synthesis, but it broadens the discovery window and does not model these causal handoffs.

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
| Event and schedule triggers begin different input scopes | GitHub Actions workflow syntax[^6] | Verified | This lifecycle chooses events; it does not claim scheduled discovery was exercised |
| The four candidate sources compile with the current `gh-aw` schema | No compilation result for those four | Unverified | `gh aw` is installed; compile all four in a target repository before adoption |
| The four candidate workflows execute the intended lifecycle | No local run result | Unverified | Run a bounded pilot after compilation; source inspection is not runtime validation |
| Source workflow timing and accuracy figures generalize | No first-party or local evidence | Unsupported | Replaced with local measurement guidance |
| `copilot -p @file` plus `COPILOT_GITHUB_TOKEN` is a supported CI executor | No current source supplied | Unsupported | Omitted; use a compiled gh-aw workflow or a separately validated executor adapter |

## Structural Proposal Selected

The reader-first structure now begins with one exercised artifact so the audience sees the mechanism before its proposed composition:

1. read the complete FanHub source with its frontmatter and instruction body;
2. follow compilation, a failed runtime attempt, the successful run, and its limited issue evidence;
3. compose four independently governed candidate phases and make approval, stop, and ownership explicit;
4. pilot and measure the next handoff locally.

## Artifact Plan

- `workflows/1-intake.md` + `instructions/intake.md`
- `workflows/2-planning.md` + `instructions/planning.md`
- `workflows/3-coding.md` + `instructions/coding.md`
- `workflows/4-review.md` + `instructions/review.md`
- `examples/fanhub-intake-pilot.md` — compiled and exercised single-issue prerequisite

Each workflow declares a trigger, read permissions, constrained outputs, a required instruction contract, and `noop` behavior. Each instruction names inputs, output evidence, stop conditions, recovery, and handoff owner.

| Source candidate | Trigger | Read boundary | Safe-output boundary | Human authority retained |
|---|---|---|---|---|
| `workflows/1-intake.md` | issue opened | contents and issues | one comment; up to two allowlisted labels | issue triage owner supplies missing context or resolves routing |
| `workflows/2-planning.md` | issue labeled | contents, issues, pull requests | one comment; up to two allowlisted labels | named plan approver authorizes or returns the plan |
| `workflows/3-coding.md` | issue comment created | contents, issues, pull requests | one draft pull request, one comment, one stop label | authorized commenter grants scope; implementation owner recovers failures |
| `workflows/4-review.md` | pull request opened, reopened, or synchronized | contents, issues, pull requests | one comment review, up to ten inline comments, two state labels | CODEOWNER or named reviewer accepts residual risk and merge eligibility |

Source inspection confirms these declarations and contracts are represented in the eight candidate files. It does not confirm that the current `gh-aw` compiler accepts every key or that GitHub Actions executes the intended behavior.

## References

[^1]: [GitHub Agentic Workflows overview](https://github.github.com/gh-aw/introduction/overview/)
[^2]: [How GitHub Agentic Workflows work](https://github.github.com/gh-aw/introduction/how-they-work/)
[^3]: [GitHub Agentic Workflows security architecture](https://github.github.com/gh-aw/introduction/architecture/)
[^4]: [GitHub Agentic Workflows safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/)
[^5]: [About the GitHub Copilot coding agent](https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent)
[^6]: [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
[^7]: [About code owners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
