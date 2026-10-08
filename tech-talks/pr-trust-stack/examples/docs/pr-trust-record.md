# AI-Created PR Trust: Evidence Record

The main trace is .NET issue #95 → workflow-created draft #198. Code Quality's existing default-branch reliability finding led to a Home-only human scope decision. Initial PR-head Copilot review and Code Quality each returned distinct findings; a human corrected the draft and verified the Retry path locally. Draft #197 is a separate scope-boundary contrast with two unresolved Copilot findings; #193 contrasts a manually requested zero-finding review. These are same-day observations, not an overnight batch. All drafts remain unmerged.

## .NET issue #95: quality-led, Home-only handoff

| Stage | Observed evidence | Boundary / next human decision |
|---|---|---|
| Existing quality signal | [Code Quality scan of `main` at `800c8ec`](https://github.com/MSBart2/FanHub/actions/runs/37650878859), [C# empty-catch reliability rule](https://github.com/MSBart2/FanHub/security/quality/rules/cs%2Fempty-catch-block), `dotnet/Frontend/Components/Pages/Home.razor:332` | Baseline finding, not a finding introduced by a future PR; verify the visible failed-request behavior |
| Research | [Workflow run](https://github.com/MSBart2/FanHub/actions/runs/37655909578) and [research comment](https://github.com/MSBart2/FanHub/issues/95#issuecomment-6042804396) confirmed the empty catch; provisional plan widened to three pages | [Maintainer comment](https://github.com/MSBart2/FanHub/issues/95#issuecomment-6043796181) selected Home only, accessible error plus Retry, logging, and focused success/failure/recovery tests |
| Planning | [Successful plan run](https://github.com/MSBart2/FanHub/actions/runs/37663821385) posted the [Home-only plan](https://github.com/MSBart2/FanHub/issues/95#issuecomment-6043895786), with bUnit tests, focused commands, rollback, and @rbmathis; `lifecycle:plan-ready` appeared | Planning runner reported NuGet `NU1301`; attempt restore in implementation environment and distinguish unrun tests from passes |
| Approval request | The named maintainer reviewed the plan and applied `lifecycle:implement-approved`; [implementation run](https://github.com/MSBart2/FanHub/actions/runs/37665633837) completed successfully | Trusted event/actor and plan freshness produced one draft; no merge authority |
| Workflow output | [Draft #198](https://github.com/MSBart2/FanHub/pull/198) was created on `ba0764f` with three changed files; its author reported restore/build success and 4/4 focused component tests | CI and browser behavior are separate from author-reported tests |
| Initial PR checks | [Frontend CI](https://github.com/MSBart2/FanHub/actions/runs/37666357664) initially stopped at `action_required` for the bot-created PR; human approval let the read-only build pass on `ba0764f` | CI builds Frontend; it does not run the new test project |
| Automatic Copilot review | [Run](https://github.com/MSBart2/FanHub/actions/runs/37666368734) returned [`COMMENTED` with two findings](https://github.com/MSBart2/FanHub/pull/198#pullrequestreview-5446574440): [static SSR prevents Retry clicks](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210466991) and [the alert clears before retry finishes](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210467074) | Passing bUnit clicks did not prove the real page was interactive; both findings fit the approved scope |
| Code Quality on initial PR head | [PR-specific run](https://github.com/MSBart2/FanHub/actions/runs/37666353555) succeeded on `ba0764f`: [generic catch](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210467081) and four test `HttpClient` disposal patterns, including [this example](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210466994) | These are PR findings, distinct from the existing `main` empty catch; success-shaped scan completion does not mean zero findings |
| Human correction | [Commit `edeadee`](https://github.com/MSBart2/FanHub/commit/edeadee65c291cdb7d0feb2ac49d394289112c96) enables InteractiveServer, keeps the alert until success, catches specific expected failures, gives DI ownership of test clients, and pins patched AngleSharp 1.5.0 | Render-mode regression test failed on original head (1 failed, 4 passed), then 6/6 focused tests passed locally on the correction |
| Runtime and next head | [PR evidence comment](https://github.com/MSBart2/FanHub/pull/198#issuecomment-6044316557): local browser with mocked HTTP 503 showed the alert and server log; after mock recovery, Retry showed quote/count, cleared alert, and caused no navigation. [Frontend CI on `edeadee`](https://github.com/MSBart2/FanHub/actions/runs/37667626770) passed | [Code Quality rerun](https://github.com/MSBart2/FanHub/actions/runs/37667624143) and separate [CodeQL scan](https://github.com/MSBart2/FanHub/actions/runs/37667623935) completed successfully. The scan status does not supply a remaining-finding count; no new-head Copilot review appeared. One initial Copilot thread remains open for the human reviewer. |

The mock-backed browser check is an observed local demonstration, not a production test. The initial Code Quality scan ran on `main` at `800c8ec`; the two PR scan heads are `ba0764f` and `edeadee`. Keep provenance attached to every screenshot or claim.

## .NET issue #58 to draft PR #197: main worked case

| Stage | Observed evidence | Boundary / next human decision |
|---|---|---|
| Approval | [Issue #58](https://github.com/MSBart2/FanHub/issues/58), [approved plan](https://github.com/MSBart2/FanHub/issues/58#issuecomment-6041270982), and verified approval event recorded in the [PR body](https://github.com/MSBart2/FanHub/pull/197) | Confirm the latest approved API-only scope before any change to request types or database schema |
| Agentic output | [Implementation run](https://github.com/MSBart2/FanHub/actions/runs/37646472169) created [draft #197](https://github.com/MSBart2/FanHub/pull/197) on head `e7aa1bc`; five model files and a test project (seven files total) | Inspect the diff; draft has no merge authority |
| Validation | PR author reports restore/build success and 16 focused xUnit tests passing; [PR-head CodeQL](https://github.com/MSBart2/FanHub/actions/runs/37647143678) succeeded | Model tests do not exercise the registration request or EF migration path; the CodeQL check is separate from Code Quality |
| Automatic Copilot Code Review | [Review run](https://github.com/MSBart2/FanHub/actions/runs/37647161018) began 10 seconds after PR creation; [review](https://github.com/MSBart2/FanHub/pull/197#pullrequestreview-5444824422) returned `COMMENTED` with two open findings | Respond to [EF metadata/snapshot mismatch](https://github.com/MSBart2/FanHub/pull/197#discussion_r4208977701) and [registration request bypass](https://github.com/MSBart2/FanHub/pull/197#discussion_r4208977787); no fix or human acceptance observed |
| PR lifecycle | Draft #197 was closed and reopened once after Code Quality activation to attempt a PR scan; it remains open, draft, and on the same head | The attempt produced no new Code Quality check or PR quality finding at the last check; avoid repeated lifecycle churn |

FanHub's [automatic Copilot review ruleset](https://github.com/MSBart2/FanHub/settings/rules/24661887) applies to eligible drafts and new pushes to `main` and has no additional merge gate. The review of this new bot-created draft is observed; future pushes still need a head-specific review check.

## Code Quality: observed default-branch baseline, missing PR result

FanHub Code Quality was enabled with explicit user consent to its recurring and usage-based charges. The [initial Code Quality scan](https://github.com/MSBart2/FanHub/actions/runs/37650878859) completed successfully on `main` at `800c8ec`; [standard findings](https://github.com/MSBart2/FanHub/security/quality) show **71 maintainability and 9 reliability findings**, grouped under nine CodeQL quality rules. Existing C# examples include generic catch clauses (four) and a possible null dereference (one). These **80 findings are pre-existing baseline debt**, not new PR #197 findings.

No Code Quality PR-specific run or inline quality finding was observed on #197 before or after its close/reopen. The older [PR-head CodeQL security run](https://github.com/MSBart2/FanHub/actions/runs/37647143678) is a distinct check. AI quality scans are off; coverage requires a separate workflow; no quality threshold or merge gate is configured. The [local Python coverage example](../.github/workflows/pr-evidence.yml) and [illustrative evaluate-mode ruleset](../rulesets/pr-trust-stack.evaluate.json) are not FanHub .NET coverage or a measured 80% target. A future approved substantive PR update can establish PR-level quality behavior without another lifecycle toggle.

## .NET issue #110 to draft PR #193: observed lifecycle

| Stage | Evidence | Next human decision |
|---|---|---|
| Research and plan | [Issue #110](https://github.com/MSBart2/FanHub/issues/110) and its [revised plan](https://github.com/MSBart2/FanHub/issues/110#issuecomment-6004332537) name two files, build command, and approver | Approve the latest scope |
| Implementation | [Draft PR #193](https://github.com/MSBart2/FanHub/pull/193) moves the approved CSS declarations into `MainLayout.razor.css` | Inspect the diff against the plan |
| Validation | Scoped Frontend build: 0 errors, seven pre-existing warnings; current-head [Frontend build](https://github.com/MSBart2/FanHub/actions/runs/37492880031) and [CodeQL](https://github.com/MSBart2/FanHub/actions/runs/37492871610) pass after a human branch update | Exercise induced Blazor error recovery or name the accepted uncertainty |
| Advisory review | [Agentic workflow run](https://github.com/MSBart2/FanHub/actions/runs/37495235841) posts a `COMMENT` and `lifecycle:reviewed` | Human accepts, asks for more evidence, or keeps draft |
| Copilot Code Review | [Manual review request on draft #193](https://github.com/MSBart2/FanHub/pull/193#pullrequestreview-5444758662) returned `COMMENTED`, “approval recommended,” and 0 open findings at Balanced effort; no inline threads | Keep the PR draft until induced Blazor error recovery and human acceptance are resolved; this review is not a formal approval |

The [active default-branch ruleset](https://github.com/MSBart2/FanHub/settings/rules/24661887) now requests automatic Copilot review on eligible drafts and new pushes. The existing review on #193 was requested **manually** after the PR was created. New bot-created #197 supplies the observed automatic-review example; eligibility and quota should still be checked for other PR authors and future pushes.

Open [issues #82](https://github.com/MSBart2/FanHub/issues/82) and [#109](https://github.com/MSBart2/FanHub/issues/109) are low-severity .NET candidates, **not** approved implementation requests. [#111](https://github.com/MSBart2/FanHub/issues/111) shares `Characters.razor` with #109; sequence or coordinate before an evening batch. No 10–15 issue cohort has run.

## Separate Node PR #194: observed Copilot Code Review

[Draft PR #194](https://github.com/MSBart2/FanHub/pull/194) addresses [issue #7](https://github.com/MSBart2/FanHub/issues/7). This PR was human-authored; it is not a .NET agentic-workflow output. Local test results are separate from GitHub checks and proposed gates.

### Advisory findings

| Finding | Disposition | Evidence | Owner |
|---|---|---|---|
| Late rejection after returning to All Seasons lacks a test | Accepted | [Copilot comment](https://github.com/MSBart2/FanHub/pull/194#discussion_r4200550818); [new regression test](https://github.com/MSBart2/FanHub/commit/c520e812c58053d7ea5ca30874ca1be37d464811) and [author reply](https://github.com/MSBart2/FanHub/pull/194#discussion_r4200586524) | PR author |
| Old component instance can overwrite the shared cache after remount | Accepted | [Copilot re-review](https://github.com/MSBart2/FanHub/pull/194#pullrequestreview-5434761327); [cleanup and remount test](https://github.com/MSBart2/FanHub/commit/df72e3dfa58918278408ec842e9e9a7793095351) | PR author |
| Local browser walkthrough | Mocked API passed | Chromium showed only Season 2 when filtered, then both episodes without error on All Seasons; two sample API responses were intercepted | PR author |
| Real-backend browser walkthrough | Pending | Repeat Season 2 to All Seasons against the FanHub API | Human reviewer |

### Blocking signals

| Signal | State | Remediation |
|---|---|---|
| Local Jest | 5 of 5 pass | Runner result: focused component tests; domain results: both seasons stay visible without a stale error and an old instance cannot overwrite the cache |
| GitHub PR check | No check run observed | Add and run CI before treating this as a required check |
| Code Quality threshold | Not configured on PR 194 | Separate teaching example; validate in a target tenant before enabling |

### Residual risk

- Human reviewer: not yet assigned
- Browser walkthrough: mocked API passed locally; real backend pending
- Override used: none observed
- Decision: draft remains open; no human merge approval
- Rationale: Both Copilot findings addressed; local tests and mocked-API browser flow pass. PR checks and real-backend browser evidence remain outstanding