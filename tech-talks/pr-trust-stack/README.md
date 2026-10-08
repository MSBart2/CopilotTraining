---
status: active
updated: 2026-10-08
section: "Verify and Govern"
audience: [developer, team-lead, platform-engineer]
level: applied
duration: 50
format: core-talk
decision: "How can a team join agentic delivery, advisory review, and an enforceable quality gate into a human-owned merge decision?"
prerequisites: [agentic-lifecycle, copilot-code-review, copilot-code-quality]
related: [agentic-sdlc, copilot-web]
references:
  - url: https://github.github.com/gh-aw/introduction/overview/
    label: "GitHub Agentic Workflows overview"
    verified: 2026-10-07
  - url: https://github.github.com/gh-aw/reference/safe-outputs/
    label: "GitHub Agentic Workflows safe outputs"
    verified: 2026-10-07
  - url: https://docs.github.com/en/copilot/concepts/agents/code-review
    label: "About GitHub Copilot code review"
    verified: 2026-10-07
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review
    label: "Configure automatic Copilot code review"
    verified: 2026-10-07
  - url: https://docs.github.com/en/code-security/concepts/code-quality/code-quality
    label: "About GitHub Code Quality"
    verified: 2026-10-07
  - url: https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality
    label: "Enable GitHub Code Quality"
    verified: 2026-10-07
  - url: https://github.com/MSBart2/FanHub/pull/197
    label: "FanHub scope-boundary example and automatic Copilot review"
    verified: 2026-10-07
  - url: https://github.com/MSBart2/FanHub/issues/95
    label: "FanHub silent error issue and bounded maintainer decision"
    verified: 2026-10-07
  - url: https://github.com/MSBart2/FanHub/security/quality
    label: "FanHub Code Quality default-branch findings"
    verified: 2026-10-07
  - url: https://github.com/MSBart2/FanHub/pull/193
    label: "FanHub agentic lifecycle draft"
    verified: 2026-10-08
  - url: https://github.com/MSBart2/FanHub/pull/199
    label: "FanHub coverage gate demonstration"
    verified: 2026-10-08
  - url: https://github.com/MSBart2/FanHub/pull/201
    label: "FanHub Code Quality Autofix demonstration"
    verified: 2026-10-08
---

# From Issue to Merge Decision

> **Decision:** How can a team connect approved agentic work, independent review, a quality fix, and an enforceable gate without surrendering its merge decision?

**Duration:** 50 minutes | **Audience:** Developers, team leads, and platform engineers

A maintainer can approve a bounded issue and let an agent offer a draft while independent tools inspect it. The advantage comes when the teammate opening the PR can tell **which evidence is advice, which change needed a human click, which rule can stop a merge, and what remains unproved**. This capstone joins the [agentic lifecycle](../agentic-lifecycle/README.md), [Copilot Code Review](../copilot-code-review/README.md), and [Code Quality](../copilot-code-quality/README.md) talks at the merge decision. Deployment and production feedback are the next boundary, not observed outcomes here.

### Four proofs, not one synthetic PR

| FanHub artifact | Observed result | What it does **not** prove |
|---|---|---|
| [Issue #110](https://github.com/MSBart2/FanHub/issues/110) → [draft #193](https://github.com/MSBart2/FanHub/pull/193) | A maintainer corrected the build command, approved a two-file CSS move, and the workflow offered a built draft; browser comparisons checked the layout. | A draft or passing build is not merge approval; Blazor error recovery was not exercised. |
| [Draft #198](https://github.com/MSBart2/FanHub/pull/198) | Automatic Copilot review found an inert Retry and disappearing alert despite four reported passing component tests; a human tested the correction. | An advisory review is not an automatic gate or fresh review of every later head. |
| [Draft #199](https://github.com/MSBart2/FanHub/pull/199) | An active, branch-scoped 27% coverage rule blocked a 26.7% head; two **manually written** tests brought the displayed result to 30% and the gate passed. | This rule did not govern #198 or #201; the tests were not Autofix. |
| [Draft #201](https://github.com/MSBart2/FanHub/pull/201) | Code Quality flagged a generic catch, generated a `TryParse` changeset, and the author accepted it; new-head build and C# analyses passed. | No coverage gate or frontend test suite ran on this PR; Copilot Code Review did not generate the Autofix. |

All four PRs remain draft and unmerged. These are independent demonstrations, not four heads of a single automated pipeline. Each check and finding belongs to its own branch and commit.

### Who can do what?

The requesting human approves the current plan; the workflow may create a bounded draft. Copilot Code Review may comment automatically on eligible PRs; a human checks and disposes of its advice. Code Quality can post rules-based findings and propose Autofix; the author decides whether to commit the suggested change. **Only an active, correctly scoped ruleset with its required evidence can enforce a threshold.** A passing gate does not click Merge. Dedicated security checks are separate from this Code Quality maintainability/coverage story.

The memorable result is a useful split: **#198's green component tests missed a broken browser action, while #199's configured gate actually blocked a merge**. #201 adds an AI-generated correction, but only after a person inspected and accepted it. Each is valuable because its limit is visible.

## Why This Is Worth Trying

| Test | What a practitioner gets |
|---|---|
| **Relevant** | A maintainer approves work and a reviewer needs evidence for a real merge decision on that PR's current head. |
| **Compelling** | Advice can find a missed browser failure; a configured rule can block merge; a proposed fix still needs a human click. |
| **Actionable** | Check the plan and diff, reproduce changed behavior, dispose of advice, inspect findings and ruleset status, then accept or hold the draft. |

### One operating model, distinct evidence

The opening visual follows **human-approved issue → bounded draft → independent review and quality signals → human merge decision**. The second view maps FanHub's four separate PRs onto those decision points; it does not imply that #193 went through #199's gate or #201's Autofix. Where a runner is skipped, a finding is unanswered, or a behavior is untested, the PR stays draft until its owner chooses the next check.

<!-- 🎬 MAJOR SECTION: Authorize the Work -->
## 1. Authorize the Work

On [FanHub issue #110](https://github.com/MSBart2/FanHub/issues/110), research identified layout rules worth moving to Blazor CSS isolation. The maintainer narrowed the job to `.main-content` and `.footer` in `MainLayout.razor` and `MainLayout.razor.css`. The first planning command, `dotnet build dotnet/FanHub.sln`, failed before compilation because the checked-in solution referenced missing projects. The human requested a corrected plan; `dotnet build dotnet/Frontend/Frontend.csproj --nologo --verbosity quiet` ran and produced zero errors with seven existing nullable warnings. A plausible-looking plan became an executable one **before** approval.

The latest plan named the two files, build, browser comparison, rollback, and @rbmathis as approver. A status label recorded that the plan was ready; the maintainer checked it and applied a separate `lifecycle:implement-approved` request label. The trusted workflow verifies the label actor and plan provenance. This distinction matters: **the agent may plan, but a named person authorizes implementation**.

Before piloting several requests, check file overlap, the acceptance check, and who approves each plan. Two or three independent issues are a reasonable proposed start; 10–15 is an **intake experiment**, not observed throughput.

<!-- 🎬 MAJOR SECTION: Inspect the Draft -->
## 2. Inspect the Draft

The implementation workflow's safe output permits **one draft PR, never a merge**. [FanHub draft #193](https://github.com/MSBart2/FanHub/pull/193) changed the two approved layout files. A Frontend project build passed with zero errors and seven pre-existing warnings. Local baseline-to-draft browser comparisons of `/`, `/characters`, and `/episodes` at 1024px and 300px showed the relevant main-content and footer presentation unchanged. Those six comparisons exercise the promised visible result, while **Blazor error recovery remained unexercised**; the accepting reviewer owns that residual question.

Bot-created PR CI initially required human approval before the read-only build could run. A stopped run is neither a pass nor a failure of the changed behavior; the owner approves the safe check and inspects its result on the current head.

The distinct [Home-page draft #198](https://github.com/MSBart2/FanHub/pull/198) shows why the next layer matters: four author-reported passing bUnit tests and a passing Frontend build still missed an inert browser Retry. Do not borrow #193's browser comparison or #198's focused tests as proof for the other PR. GitHub documents how [`GITHUB_TOKEN`-created PRs can produce approval-required downstream runs](https://docs.github.com/en/actions/concepts/security/github_token#when-github_token-triggers-workflow-runs).

<!-- 🎬 MAJOR SECTION: Review, Remediate, and Enforce -->
## 3. Review, Remediate, and Enforce

These tools become useful when a reviewer can name the producer, trigger, artifact, and limit of each result. Configure them before a batch of drafts, then show evidence on the actual branch and head.

| Signal | Setup and trigger | Artifact to inspect | Human follow-up |
|---|---|---|---|
| **Build and tests** | Project-specific CI or recorded local run on a known head | Command, result, and behavior covered | Exercise the uncovered request and recovery path |
| **Copilot Code Review** | Request a PR review or configure automatic review for eligible drafts and pushes in a repository ruleset | `COMMENTED` review, inline threads, analyzed head | Verify each suggestion against the real code and approved scope; respond, test, and seek fresh review after a change |
| **GitHub Code Quality** | Enable Code Quality; let rules-based CodeQL scan the default branch and eligible new PR activity | Dashboard rule, file/line, severity, branch/commit; any PR-specific result | Separate existing debt from a new regression; inspect the next scan |
| **Code Quality Autofix** | Inspect a finding's generated Suggested changeset | Proposed code, author-accepted commit, new-head result | Reject or commit the fix, then verify its behavior; it does not commit itself |
| **Active quality ruleset** | Set a scoped threshold and require the coverage upload check | PR coverage result and pass/block decision | Add tests or adjust the change; passing the gate does not merge the PR |
| **Other CodeQL / CI** | Configure a separate code-scanning or build workflow | Check result on the PR head | Diagnose skipped or blocked jobs; a successful runner proves only its configured checks |

### Watch Copilot Find a Browser Gap on the Agent's Draft

FanHub's [active ruleset](https://github.com/MSBart2/FanHub/settings/rules/24661887) requests automatic Copilot review for eligible drafts and new pushes targeting `main`, without adding a merge gate. The [review run on draft #198](https://github.com/MSBart2/FanHub/actions/runs/37666368734) started after PR creation. [Copilot's `COMMENTED` review on `ba0764f`](https://github.com/MSBart2/FanHub/pull/198#pullrequestreview-5446574440) left **two open inline findings**, each tied to the intended Retry behavior:

1. [Enable interactivity](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210466991): Home had no interactive render mode, and `Routes.razor` did not set one globally. Static SSR displayed the Retry button without wiring `@onclick`. **A passing bUnit click test did not cover this browser boundary.**
2. [Keep the alert during retry](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210467074): clearing `loadError` before the first awaited request removed the alert and made the disabled/“Retrying...” state unreachable. Leave the alert visible until both requests succeed.

These corrections fit #95's approved Home-only error/retry behavior. The human added `@rendermode InteractiveServer`, a render-mode regression test, and a test that holds the quote response pending while the alert and disabled Retry remain visible. The render-mode test **failed against the initial draft**, then 6/6 tests passed locally on `edeadee`. A real local browser with a controllable API returned HTTP 503: the alert appeared and the server logged the exception. After the API returned 200, a click on Retry restored the quote and count, removed the alert, and kept the page at the same URL with **one total navigation**. The [PR follow-up comment](https://github.com/MSBart2/FanHub/pull/198#issuecomment-6044316557) records the evidence. This is a local mock-backed observation, not a claim that production was exercised.

Keep the distinction between **advice and authority**: Copilot's `COMMENTED` review is not a human approval. On #198, the new-head Code Quality run completed, but its successful runner status alone cannot certify that every finding cleared. The original Copilot review remains tied to the initial head; one thread was still open, and no new-head Copilot review was observed.

### Watch Code Quality Turn a Baseline Finding Into a Testable Request

GitHub Code Quality was enabled for FanHub with the user's approval of its recurring and usage-based charges. Its [first scan](https://github.com/MSBart2/FanHub/actions/runs/37650878859) succeeded on **`main` at `800c8ec`**. The [dashboard](https://github.com/MSBart2/FanHub/security/quality) reports **71 maintainability and 9 reliability findings** across nine rule groups. Open the C# [“Poor error handling: empty catch block”](https://github.com/MSBart2/FanHub/security/quality/rules/cs%2Fempty-catch-block) reliability rule and inspect the **`Home.razor:332`** occurrence. A short code pattern has a concrete product consequence: a failed API call silently becomes zero characters or an absent quote. The human selects the issue and approves the intended UX; the tool did not design the fix or authorize the agent.

Code Quality's rules-based CodeQL quality analysis is distinct from Copilot's contextual PR suggestions and FanHub's separate CodeQL code-scanning check. [GitHub's enablement guide](https://docs.github.com/en/code-security/how-tos/maintain-quality-code/enable-code-quality#scan-frequency-after-enablement) describes a default-branch scan and new PR/push activity. The [PR-specific quality run](https://github.com/MSBart2/FanHub/actions/runs/37666353555) **completed on draft #198's initial head `ba0764f`**. It reported a [generic catch in `Home.razor`](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210467081) and **four** [test-client disposal findings](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210466994), one per new bUnit test. The existing empty-catch finding came from `main` at `800c8ec`; this PR removed that exact pattern but introduced a broad catch and unmanaged test clients. **The new-PR scan and the old baseline have different provenance.**

On `edeadee`, the human replaced the generic catch with specific HTTP, JSON, unsupported-content, and timeout catches, kept explicit logging, and made the bUnit service container own each `HttpClient`. The newly added test project's transitive AngleSharp 1.2.0 produced a NuGet vulnerability warning, so its package reference now selects patched 1.5.0; local tests no longer emit that warning. The [Code Quality rerun](https://github.com/MSBart2/FanHub/actions/runs/37667624143) **completed successfully on the new head**; inspect remaining PR findings before declaring them resolved. A successful scan alone cannot establish interactivity, logging, or Retry; the focused tests and induced-failure browser observation address those behaviors. PR #197, opened before quality enablement, had no PR-specific quality run after a close/reopen attempt; its older CodeQL security check does not fill that gap.

Code Quality's **AI quality scans are off** in this pilot. Coverage requires its own workflow; the local [Python Cobertura example](examples/.github/workflows/pr-evidence.yml) and [evaluate-mode ruleset example](examples/rulesets/pr-trust-stack.evaluate.json) are illustrative, not the observed FanHub .NET coverage gate. FanHub subsequently configured a real **27% threshold and required upload check for an isolated demo base** in draft #199; it does not apply to #198 or #201.

### Watch the Gate Enforce the Bar on a Separate PR

On [FanHub draft #199](https://github.com/MSBart2/FanHub/pull/199), the first head passed six tests and uploaded Cobertura, but GitHub reported **26.7% against a branch-scoped 27% minimum**, so the active ruleset blocked merge. The author **manually added** two Home-page tests; eight tests then passed, GitHub displayed **30%**, and the same PR's gate passed. A quality result that was merely informative became a configured automatic merge condition. The corrected PR remains draft: the rule checks the threshold, while a person still accepts the change. The tests did not come from Autofix.

### Watch a Human Accept an Autofix on Another PR

On [FanHub draft #201](https://github.com/MSBart2/FanHub/pull/201), targeting `main`, Code Quality posted a [Generic catch clause finding](https://github.com/MSBart2/FanHub/pull/201#discussion_r4220907309) with a generated changeset. The first head used `int.Parse` and `catch (Exception)` in the Episodes season handler; the suggested `int.TryParse` preserves the fallback for invalid or overflowing input without swallowing unrelated exceptions. After inspection, the author clicked **Commit suggestions**, creating [Autofix commit `0b33cda`](https://github.com/MSBart2/FanHub/commit/0b33cdabbd5ab12cc59ea833c643cc47ba400689). The corrected head's build and C# analyses passed, and the original Code Quality finding became outdated. Copilot Code Review also commented on the catch, but **Code Quality generated the fix**. No frontend test suite ran on this `main`-targeting PR, and its branch has no coverage gate. The draft is unmerged.

<!-- 🎬 MAJOR SECTION: Make the Merge Decision -->
## 4. Make the Merge Decision

The accepting reviewer brings the request, artifact, and signals together **on one PR head at a time**. #193 proves a bounded agent-created draft with a scoped build and browser comparison; #198 shows advisory review catching a missed behavior; #199 demonstrates actual merge enforcement; #201 demonstrates human-accepted AI remediation. None supplies the others' missing evidence. All remain draft and unmerged. Code Quality's maintainability/coverage findings do not replace a dedicated security review, dependency check, or secret scan; configure those separately if the repository needs them.

| Question for any PR | Evidence to show | Next move when it fails |
|---|---|---|
| Was this work authorized? | Approved plan version, request actor, scope | Return to the approver |
| What did the agent deliver? | Draft diff, head SHA, changed behavior | Revise the draft or narrow scope |
| What actually ran? | Behavioral test, CI, Code Review, Code Quality finding, Autofix, and gate **with distinct provenance** | Run the missing check, reproduce the failure, or investigate a finding |
| Who accepts the result? | Human reviewer, residual risk, rollback/recovery route | Keep draft until that person decides |

Start with **two or three independent issues**. Measure stops, review dispositions, would-block and actual gate results, rerun time, head freshness, and human triage capacity. Expand toward 10–15 only when a team can inspect the resulting queue and resolve its exceptions. These are proposed measurements, not pilot results. No unattended merge is part of this strategy.

### Transfer This to Your Repository

Take one issue from tomorrow's queue. Identify its person, consequence, and acceptance check; write an approved, runnable plan with a named human; constrain the agent's output to a draft. Inspect its diff and current-head build. Request or configure Copilot review, inspect Code Quality findings and any offered Autofix, and test a coverage rule in evaluate mode before making it active. Ask which evidence would earn this PR a human merge decision. When a check is missing or a risk exceeds scope, keep the draft and name its owner. After an eventual merge, a separate deployment and production-feedback loop begins; these FanHub demos do not claim to validate it.
