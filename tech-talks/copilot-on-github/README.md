---
status: active
portfolioState: deployed
updated: 2026-10-21
section: "Agents on GitHub"
audience: [developer, team-lead, platform-engineer]
level: applied
duration: 50
format: core-talk
decision: "Which built-in GitHub agent fits each moment of a pull request, and what evidence does each one hand the person who decides?"
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
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review
    label: "Configure automatic Copilot code review"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/
    label: "Changelog: Copilot code review can approve pull requests (preview)"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/
    label: "Changelog: agent-specific instructions with excludeAgent"
    verified: 2026-10-21
  - url: https://docs.github.com/en/code-security/concepts/code-quality/code-quality
    label: "About GitHub Code Quality"
    verified: 2026-10-21
  - url: https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/
    label: "Changelog: GitHub Code Quality is generally available"
    verified: 2026-10-21
  - url: https://docs.github.com/en/billing/concepts/product-billing/github-code-quality
    label: "GitHub Code Quality billing"
    verified: 2026-10-21
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

> **The question this talk answers:** Which built-in GitHub agent fits each moment of a pull request, and what evidence does each one hand the person who decides?

**Duration:** 50 minutes | **Audience:** Developers and team leads who own a repository's pull request flow, and the platform engineers who configure it

A FanHub maintainer has a confirmed bug: issue [#7](https://github.com/MSBart2/FanHub/issues/7), where the Node frontend's episode cache returns the wrong episodes after a season filter. An agentic workflow already triaged a duplicate report, cited the cache lines, and linked the two issues. The fix is small, well-located, and testable. The maintainer's decision is who writes it, who checks it, and what evidence must be on the pull request before anyone clicks Merge.

GitHub ships three agents for that moment, each built into the pull request:

- **Copilot cloud agent** (formerly Copilot coding agent) **produces** the change: assign an issue and it opens a draft pull request from an ephemeral Actions environment.
- **Copilot code review** **reasons** about intent: it reads the diff with repository context and leaves comments, and in preview it can approve.
- **GitHub Code Quality** **measures** against rules and thresholds: CodeQL findings, ratings, coverage minimums, and Autofix suggestions on every eligible head.

> **Core insight:** Produce, reason, measure. Then a person decides. Each agent hands the decider a different kind of evidence, and the team chooses which evidence can affect merge eligibility: permit the cloud agent to produce, count a review's approval, or enforce a quality threshold. Each promotion needs an owner and a way back.

Four roles meet on every pull request, and the same person may hold more than one:

| Role | Owns |
|---|---|
| **Requester** | The issue's intent and the decision to delegate it |
| **PR owner** | Responding to findings and updating the head |
| **Reviewer** | Validating behavior and accepting the residual risk at merge |
| **Platform owner** | Automatic invocation, permissions, required evidence, and rollback |

### The evidence on #210's final head

Before tracing how it got there, look at what the maintainer had in front of them on commit `02ddaf3` of FanHub draft [#210](https://github.com/MSBart2/FanHub/pull/210):

| Evidence | Produced by | Consumed by |
|---|---|---|
| A two-file patch with eight new regression tests | Copilot cloud agent | PR owner and reviewer |
| "🟢 Approval recommended … tests were not executed" | Copilot code review | Reviewer |
| A Code Quality run with no findings | GitHub Code Quality | Reviewer and platform owner |
| An executed test run: 8 of 8 passed | The maintainer | Reviewer |

Each row answers a different question. The rest of this talk follows how each one arrived, which head it inspected, and who may rely on it.

---

<!-- 🎬 MAJOR SECTION: Delegate the Change -->
## 1. Delegate the Change

### One assignment, one draft, four minutes

At 20:31:19 the maintainer assigned #7 to Copilot. Twelve seconds later the cloud agent opened draft [#210](https://github.com/MSBart2/FanHub/pull/210) with an "Initial plan" commit. At 20:34:55 it pushed the fix:

- `node/frontend/src/pages/Episodes.js` caches only unfiltered responses, restores season controls on cache hits, and ignores stale or unmounted requests;
- a new `Episodes.test.js` adds eight regression tests covering filter transitions, cache expiry, remounts, and request races;
- the PR body says `Fixes #7` and summarizes the change in three bullets (+203 / −7 lines).

The request was one assignment. The draft, the branch, and the tests came from the agent. The merge stays with a person. These timings are one observed FanHub run; treat them as an illustration of the flow.

Before reading the diff, the PR owner runs a short acceptance check:

1. Does the plan match the issue's intent?
2. Which commit contains the implementation?
3. Did anything change outside the expected paths?
4. Which tests were added, and has anyone executed them?
5. Which workflow runs still wait for approval?
6. What evidence is still absent?

```text
issue #7 → assign Copilot → draft #210 (plan) → fix + 8 tests → review → quality → maintainer decides
```

### What makes an issue delegable

GitHub's [best-results guide](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) treats the issue as the prompt. #7 was a good candidate because the triage comment had already done the expensive reading.

| Delegate | Keep human-led |
|---|---|
| Bug fixes with a known location and a testable symptom | Broad or cross-repository refactors |
| Test coverage, documentation, accessibility, UI tweaks | Deep domain logic that lives in people's heads |
| Tech debt with a clear acceptance check | Production-critical or security-sensitive changes |
| Work you can describe with scope, file pointers, and "done" | Ambiguous requests that need a conversation first |

For anything larger, ask the agent to research and plan in the Agents tab first, correct the plan, and then ask for a pull request.

### The boundary the cloud agent runs inside

The agent works in an ephemeral environment powered by GitHub Actions. Four settings shape it:

- **`.github/workflows/copilot-setup-steps.yml`** installs dependencies before the agent starts. The job must be named `copilot-setup-steps` and live on the default branch.
- **The firewall** is on by default and limits outbound traffic to GitHub hosts plus a recommended allowlist of registries.
- **MCP servers** are configured per repository; GitHub and Playwright are on by default. Code review shares this configuration.
- **Custom agents** in `.github/agents/*.agent.md` give the cloud agent a named role, tools, and model.

Authority is fixed by the platform. Only users with write access can assign the agent, and comments from other users never reach it. It pushes only to its own `copilot/` branch, subject to branch protection. It cannot mark its pull request ready, approve it, or merge it, and the person who requested the work cannot approve it either. Workflow runs on its pull requests wait for **Approve and run** by default.

<!-- 🎬 MAJOR SECTION: Reason About Intent -->
## 2. Reason About Intent

### Read which head the review saw

FanHub's ruleset requests an automatic Copilot review on every pull request to `main`, including drafts. On #210 that review [arrived at 20:31:37](https://github.com/MSBart2/FanHub/pull/210#pullrequestreview-5605836471), six seconds after the draft opened, and reported that Copilot "wasn't able to review any files." It had analyzed commit `919b158`, the plan-only head. The ruleset has `review_on_push: false`, so the fix commit three minutes later drew no automatic review.

The maintainer re-requested Copilot from the Reviewers sidebar. The [second review](https://github.com/MSBart2/FanHub/pull/210#pullrequestreview-5605940436) analyzed `02ddaf3`:

> 🟢 **Approval recommended.** No blocking issues were identified in the focused changes; regression tests cover the affected behavior but were not executed.

Two pieces of evidence sit in that result. The review reasoned about the diff and judged it sound. It also named the step it left for someone else: running the tests. The maintainer ran them on the pull request head:

```text
$ CI=true npx react-scripts test --watchAll=false src/pages/Episodes.test.js
PASS src/pages/Episodes.test.js
  √ filtered responses do not overwrite the all-episodes cache when returning via All Seasons
  √ cache hits restore season controls on remount and expire after 30 seconds
  √ a late filtered response cannot replace a newer all-seasons cache hit
  √ an unmounted request cannot overwrite the shared cache
  ... 4 more
Tests: 8 passed, 8 total
```

**Practical rule:** for any team that delegates to the cloud agent, turn on **Review new pushes** in the review ruleset, or treat the first automatic review as a review of the plan.

### When review catches what tests missed

On FanHub draft [#198](https://github.com/MSBart2/FanHub/pull/198), four component tests passed and the build was green. Copilot's automatic review still found two real problems with the Home page's Retry button:

1. **[No interactivity](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210466991):** the page had no interactive render mode, so static rendering showed a Retry button whose click handler never wired up. The bUnit click test could not see this browser boundary.
2. **[Alert cleared too early](https://github.com/MSBart2/FanHub/pull/198#discussion_r4210467074):** clearing the error before the first awaited request made the "Retrying..." state unreachable.

The author added `@rendermode InteractiveServer` and a render-mode test that **failed against the original draft**, then passed 6 of 6 tests. A local browser against an API returning HTTP 503 showed the alert; after the API recovered, Retry restored the page. That is the value of a reasoning reviewer: it reads intent, and intent is where component tests often stop.

### Hand fixes back, and choose who approves

Review comments can go straight back to the producer. **Fix with Copilot** (public preview) sends a comment to the cloud agent, which pushes a commit or opens a new pull request. Review reads the same instruction files and MCP configuration as the cloud agent, so one setup shapes both.

Every review now includes an **approval assessment**. Since September 2026, admins can opt in to [Copilot approvals](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/) (public preview). Those approvals count toward required reviews and are dismissed on new pushes, like a human's. That is a real promotion of authority. Turn it on only for paths where a reasoning review is the bar the team actually holds, and keep at least one human approval wherever behavior, security, or data is at stake.

<!-- 🎬 MAJOR SECTION: Measure Against Rules -->
## 3. Measure Against Rules and Thresholds

### Two kinds of finding

[GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality) became generally available on 2026-07-20 for GitHub Enterprise Cloud and Team. It produces two kinds of finding:

| | Standard findings | AI findings |
|---|---|---|
| **Source** | CodeQL quality rules | Model review of recently changed files |
| **Reproducibility** | Stable for the same code, rules, and tool version | Model-mediated |
| **Status** | GA | Public preview |
| **Where** | Pull requests and default branch | Default branch only |
| **Can gate a merge** | Yes, by severity threshold | No |

Findings roll up into **Reliability** and **Maintainability** ratings of Excellent, Good, Fair, or Poor. On pull requests, `github-code-quality[bot]` posts each finding inline with a suggested Autofix.

On #210, the [Code Quality run](https://github.com/MSBart2/FanHub/actions/runs/39671549745) analyzed `02ddaf3` and posted no findings; CodeQL reported no new alerts. That is measured evidence: the change introduced nothing the rules recognize. Rules cover specified patterns; the cache logic's behavior still needs the executed tests and a reviewer's judgment beside it.

### Autofix proposes, the author commits

On draft [#201](https://github.com/MSBart2/FanHub/pull/201), Code Quality flagged a [generic catch clause](https://github.com/MSBart2/FanHub/pull/201#discussion_r4220907309) around `int.Parse` in the Episodes season handler and offered a changeset using `int.TryParse`. The suggested code kept the fallback for invalid input without swallowing unrelated exceptions. The author read it and clicked **Commit suggestions**, creating [`0b33cda`](https://github.com/MSBart2/FanHub/commit/0b33cdabbd5ab12cc59ea833c643cc47ba400689). The new head's build and analyses passed. Copilot code review supplied commentary on the same catch; Code Quality supplied the actionable changeset.

Findings can also go to the cloud agent: comment `@Copilot` on a pull request finding, or bulk-assign backlog findings from the Code Quality dashboard. That handoff is GA.

### A gate that blocked, then passed

On draft [#199](https://github.com/MSBart2/FanHub/pull/199), an active ruleset required a Cobertura coverage upload and a 27% minimum on its target branch. The first head passed six tests and reported **26.7%**, and the ruleset blocked merge. The author wrote two more Home page tests by hand; eight tests passed, GitHub displayed **30%**, and the same pull request's gate turned green. A measurement became a merge condition because someone configured it to be one.

Start every new rule in **Evaluate** mode, which reports what would have blocked while letting merges through, and promote it to **Active** once the team trusts the signal.

<!-- 🎬 MAJOR SECTION: Decide What Gets Authority -->
## 4. Decide What Gets Authority

### Three kinds of evidence on one head

| Agent | Evidence it hands the decider | What it catches | What stays with people |
|---|---|---|---|
| **Cloud agent** | A draft diff, its own tests, a linked issue | Well-scoped implementation work | Whether the scope was right and the tests prove the behavior |
| **Code review** | Inline comments and an approval assessment | Intent gaps, unreachable states, missing wiring | Whether each comment is right; running the tests it names |
| **Code Quality** | Rule findings, ratings, coverage, Autofix | Recognizable reliability and maintainability patterns | Behavior and design; security review and secret scanning stay separate |

Each agent supplies its own kind of evidence and only that kind. #210 carried all three on `02ddaf3`: the agent's eight tests, a review recommending approval, and a clean quality run. The maintainer added the one thing none of them did, an executed test run, before deciding.

### Know which surface configures what

The platform owner works across five configuration surfaces:

| Surface | Lives in | Shapes |
|---|---|---|
| **Agent context** | `copilot-instructions.md`, `*.instructions.md` with `applyTo`, `AGENTS.md`, custom agents | What the cloud agent and code review know |
| **Invocation and permissions** | `copilot-setup-steps.yml`, firewall, MCP configuration, workflow approval settings | Where the cloud agent can run and connect |
| **Review policy** | Rulesets: automatic review, review new pushes, Copilot approvals | When code review runs and whether its approval counts |
| **Merge evidence** | Code Quality settings, CodeQL, coverage upload, quality rulesets | Which findings and thresholds can block merge |
| **Economics** | AI Credits, Actions minutes, Code Quality licenses | What each promotion costs |

Agent context is the one surface the producer and the reviewer share. Code review and the cloud agent read instruction files from the pull request's head branch, and `excludeAgent: "code-review"` or `"coding-agent"` in an instruction file's frontmatter keeps a rule away from one of them. A test-writing convention can guide the producer while staying out of the reviewer's checklist. Code Quality uses its CodeQL rules and its own settings.

### Promote advice to authority one step at a time

| Step | Cloud agent | Code review | Code Quality |
|---|---|---|---|
| **Observe** | Assign a few well-scoped issues; read every draft | Request reviews manually | Enable on one repository; read the backlog |
| **Evaluate** | Add `copilot-setup-steps` and custom agents | Ruleset auto-review with **Review new pushes** | Quality and coverage rules in Evaluate mode |
| **Enforce** | Platform-fixed: produces drafts only; a person approves and merges | Count Copilot approvals (preview) on chosen paths | Active rules at a severity and coverage the team accepts; AI findings stay advisory |

The ladder is uneven on purpose. The team can **permit** the cloud agent to produce, **count** a review's assessment, and **enforce** a quality threshold. Promote one setting at a time, with a named owner, an observation period, and a rollback condition. Recovery stays cheap at every step: revert a ruleset to Evaluate, dismiss a finding with a reason, resolve a review thread as **Won't fix** or **Incorrect**, or close the draft and reassign the issue.

### Cost belongs in the decision

Since June 2026, Copilot usage bills in **AI Credits** (1 credit = $0.01). A code review at the default Balanced effort uses roughly 25 to 500 credits depending on pull request size and instructions, and on private repositories it also consumes Actions minutes. Code Quality is a separate product at **$10 per active committer per month**, plus AI credits for AI findings and Actions minutes for CodeQL scans. Budget for the agents you promote, and watch usage during the Evaluate step.

### The decision on #210

The maintainer wrote the decision down before acting:

| | On `02ddaf3` |
|---|---|
| **Evidence available** | Agent patch and tests, Copilot's approval assessment, a clean Code Quality run, 8 of 8 tests executed |
| **Evidence absent** | A browser check of the season filter; the Node frontend has no coverage gate |
| **Policy satisfied** | Default-branch ruleset; CodeQL with no new alerts |
| **Judgment applied** | The change is confined to one page and its tests, and the tests exercise the reported symptom |
| **Action and recovery** | Mark ready and squash-merge; revert the squash commit and reopen #7 if the filter regresses |

The maintainer marked the draft ready and squash-merged it as [`803254f`](https://github.com/MSBart2/FanHub/commit/803254f74e8fa4ffbd141b25fbe5605d3c4f5ccf) at 21:28:43Z on 2026-10-21; #7 closed two seconds later.

### Where it stops fitting

Built-in agents respond to a person: an assignment, a review request, a push. When the team wants recurring judgment on a schedule or on repository events, with its own authority contract, move to [GitHub Agentic Workflows](../agentic-lifecycle/). When the work needs a multi-step plan, implement, and verify loop on a developer's machine, move to the local orchestration patterns in the Agents at Your Keyboard section. When a team wants a readiness score and a maturity path for the whole delivery lifecycle, see [Agentic SDLC](../agentic-sdlc/).

### What you can do today

1. Pick one open bug with a known location and a testable symptom. Assign it to Copilot and time the draft.
2. Check your review ruleset for **Review new pushes**, and read which commit each Copilot review analyzed.
3. Run the agent's tests yourself before trusting a green assessment.
4. Enable Code Quality on one repository and put one coverage rule in Evaluate mode.
5. Add one `excludeAgent` rule to an instruction file and watch it change one agent's behavior.

### Apply it to your work

Take the last pull request your team merged. Write down which evidence was on its final head: a producer's tests, a reasoning review, a deterministic measurement, a human's executed check. Decide which of the three agents would have added the missing kind of evidence, and which single setting you would promote first. That setting is your pilot.

---

## Related Talks

- **[GitHub Agentic Workflows](../agentic-lifecycle/)**: recurring repository judgment as a reviewable Markdown contract; the `/triage` run that found #7's duplicate starts there.
- **[Copilot Governance](../copilot-governance/)**: organization policies, rulesets, and audit for the settings this talk promotes.
- **[Copilot Hooks](../copilot-hooks/)**: deterministic guardrails around agent sessions.

## References

- [About Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results)
- [Changelog: research, plan, and code with Copilot cloud agent](https://github.blog/changelog/2026-04-01-research-plan-and-code-with-copilot-cloud-agent/)
- [About Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- [Configure automatic Copilot code review](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
- [Changelog: Copilot code review can approve pull requests (preview)](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/)
- [Changelog: agent-specific instructions with excludeAgent](https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/)
- [About GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality)
- [Changelog: GitHub Code Quality is generally available](https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/)
- [GitHub Code Quality billing](https://docs.github.com/en/billing/concepts/product-billing/github-code-quality)
- FanHub evidence: [#210](https://github.com/MSBart2/FanHub/pull/210), [#198](https://github.com/MSBart2/FanHub/pull/198), [#199](https://github.com/MSBart2/FanHub/pull/199), [#201](https://github.com/MSBart2/FanHub/pull/201)
