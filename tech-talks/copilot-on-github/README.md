---
status: active
portfolioState: deployed
updated: 2026-10-23
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

> **The question this talk answers:** Copilot can write, review, and check my code. What's automatic, and where does my judgment come in?

**Duration:** 60 minutes | **Audience:** Developers and team leads who own a repository's pull request flow, and the platform engineers who configure it

GitHub builds three agents into the pull request. Each does one job and returns one kind of evidence:

| Job | Agent | Value | Returns |
|---|---|---|---|
| **Produce** | Copilot cloud agent (formerly Copilot coding agent) | Turns a well-written issue into a draft pull request with tests while you work on something else | Commits on its own `copilot/` branch, a PR description, session logs |
| **Reason** | Copilot code review | Reads the change for intent and catches what passing tests miss | An assessment (🟢 approval recommended or 🟡 changes recommended), inline comments, an open-issues list |
| **Measure** | GitHub Code Quality | Scores every new commit against fixed rules and thresholds, and can block a merge | Rule findings with Autofix, Reliability and Maintainability ratings, coverage results |

> **Core insight:** The three agents respond to events rather than running as a pipeline. A person's action starts the work, every push wakes review and measurement, rework creates another push, and a person ends the loop. Know which event wakes which agent and you can read any pull request's history at a glance.

### The whole flow on one page

Every step in the flow is one of three kinds:

- **👤 Human-invoked:** a person starts it (assign, comment, resolve, commit a suggestion, merge).
- **⚡ Automatic:** an event starts it (a push, a ruleset, a mention).
- **⏸ Waits for a person:** the flow pauses until someone decides.

```mermaid
sequenceDiagram
    autonumber
    actor P as 👤 Person
    participant A as 🛠️ Cloud agent (Produce)
    participant R as 🔎 Code review (Reason)
    participant Q as 📏 Code Quality (Measure)
    P->>A: Assign issue
    A->>A: Open draft PR + plan commit
    par every push
        A-->>Q: ⚡ scan within seconds
    and
        A-->>R: ⚡ review (ruleset; new pushes if enabled)
    end
    A->>A: Push the change
    Note over R,Q: Both re-run on the new commit
    R-->>P: Assessment + comments
    Q-->>P: Findings + Autofix
    P->>A: 👤 @copilot / Fix with Copilot / @Copilot on a finding
    A->>A: Push rework
    Note over R,Q: Both re-run again
    P->>P: ⏸ Mark ready, approve, merge
```

| Event | 🛠️ Cloud agent | 🔎 Code review | 📏 Code Quality |
|---|---|---|---|
| 👤 Issue assigned to Copilot | ⚡ opens a draft with a plan commit, then pushes the change | — | — |
| ⚡ Pull request opened | — | ⚡ reviews if a ruleset or user setting enables automatic review | ⚡ scans |
| ⚡ Any new push (agent or person) | — | ⚡ re-reviews **only when Review new pushes is on**; Copilot approvals are dismissed | ⚡ rescans |
| 👤 `@copilot` comment, Fix with Copilot, or `@Copilot` on a finding | ⚡ pushes rework → becomes "any new push" | — | — |
| 👤 Commit an Autofix suggestion | — (the person commits) → becomes "any new push" | — | — |
| ⏸ Ready, approve, merge | Cannot do any of these | Can approve only when Copilot approvals (preview) are on | Can block when a quality rule is Active |

Four roles meet on every pull request, and the same person may hold more than one:

| Role | Owns |
|---|---|
| **Requester** | The issue's intent and the decision to delegate it |
| **PR owner** | Responding to findings and updating the head |
| **Reviewer** | Validating behavior and accepting the residual risk at merge |
| **Platform owner** | Automatic invocation, permissions, required evidence, and rollback |

The first three parts teach each agent on its own, using the same seven questions: what it is for, what triggers it, how to set it up, what context it reads, how to use it, how to troubleshoot it, and where its authority ends. Part 4 wires them together on one issue. FanHub examples appear as drill-downs; swap in your own repository as you read.

---

<!-- 🎬 MAJOR SECTION: Produce -->
## 1. Produce: Copilot Cloud Agent

### What it is for

The cloud agent turns a bounded issue into a draft pull request. It works in an ephemeral environment powered by GitHub Actions, runs your build and tests there, and hands back commits you can inspect. Good fits: bug fixes with a known location and a testable symptom, test coverage, documentation, accessibility and UI tweaks, and tech debt with a clear acceptance check. Keep broad cross-repository refactors, deep domain logic, production-critical or security-sensitive changes, and ambiguous requests human-led.

### What triggers it

| How | Who invokes | What happens |
|---|---|---|
| Assign an issue to Copilot | 👤 | ⚡ A draft PR opens within seconds with an empty "Initial plan" commit, then the change arrives as later pushes |
| Agents tab: research and plan first | 👤 | ⚡ The agent proposes a plan; a person corrects it, then asks for a pull request |
| `@copilot` in a PR comment, Fix with Copilot on a review comment, or `@Copilot` on a Code Quality finding | 👤 | ⚡ The agent pushes a plan commit and then the rework to the same branch |

Only users with write access can invoke it, and comments from other users never reach it.

> **Example (FanHub #221):** issue #159 was assigned at 15:30:24 UTC; draft [#221](https://github.com/MSBart2/FanHub/pull/221) opened at 15:30:31 with the plan commit `e046f52`; the fix arrived as `6159164` at 15:37:13.

### Set it up

- **`.github/workflows/copilot-setup-steps.yml`** installs dependencies before the agent starts. The job must be named `copilot-setup-steps` and live on the default branch.
- **The firewall** is on by default and limits outbound traffic to GitHub hosts plus a recommended allowlist of registries.
- **MCP servers** are configured per repository; GitHub and Playwright are on by default. Code review shares this configuration.
- **Custom agents** in `.github/agents/*.agent.md` give the cloud agent a named role, tools, and model.

### Give it context: the issue is the prompt

GitHub's [best-results guide](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results) treats the issue as the prompt. We want an issue the agent can finish and a reviewer can check, so every delegated issue carries four parts:

```markdown
## Problem
What is wrong, with file and line pointers.

## Acceptance criteria
- [ ] Observable behavior that proves the fix
- [ ] Tests to add, and the command that must pass

## Scope
In scope: the files and the size of change you expect.
Out of scope: neighboring problems with their own issues.
```

Repository instructions (`copilot-instructions.md`, `*.instructions.md` with `applyTo`, `AGENTS.md`) add the conventions every task shares.

> **Example (FanHub #159):** the original issue was one sentence. The rewrite listed the five leaking handlers in a table, named the response shape to preserve, required tests that assert the internal error text never reaches the client, and put the neighboring `BUG:` comments out of scope.

### Use it

Before reading the diff, the PR owner runs a short acceptance check:

1. Does the plan match the issue's intent?
2. Which commit contains the implementation?
3. Did anything change outside the expected paths?
4. Which tests were added, and has anyone outside the agent executed them?
5. Which workflow runs still wait for **Approve and run**?
6. What evidence is still absent?

Steer with comments rather than by rewriting the branch. Each `@copilot` request becomes a plan commit plus a rework push, and every push wakes review and measurement.

> **Example (FanHub #210):** the agent opened a draft 12 seconds after assignment and pushed a two-file fix with eight regression tests three and a half minutes later. These timings are one observed run.

### Troubleshoot it

| Signal | Likely cause | Move |
|---|---|---|
| The first commit is empty | Normal: the agent opens the PR with a plan commit before it writes code | Wait for the implementation push; read the PR description for the plan |
| A commit touches unexpected files | A setup step or tool side effect | Comment on it, or let the next push correct it; check the final diff |
| An out-of-scope dependency or formatting change | Tool defaults such as `go mod tidy` or `gofmt` | Ask the agent to justify or revert it in the PR description |
| The agent cannot build or reach a registry | Missing setup step or firewall allowlist | Fix `copilot-setup-steps.yml` or the allowlist; read the session log |

The session log lives in the **Copilot cloud agent** workflow run in the Actions tab. It records every command the agent ran, including its own test runs.

> **Example (FanHub #221):** the agent's second commit `7686606` changed only a frontend lockfile. Code review flagged it, and the agent's next push reverted it with no person involved. The fix also bumped `golang.org/x/crypto`; asked to justify it, the agent kept the bump because Gin 1.10.0 requires it and recorded that in the PR description.

### Where its authority ends

Authority is fixed by the platform. The agent pushes only to its own `copilot/` branch, subject to branch protection. It cannot mark its pull request ready, approve it, or merge it, and the person who requested the work cannot approve it either. Workflow runs on its pull requests wait for **Approve and run** by default.

---

<!-- 🎬 MAJOR SECTION: Reason -->
## 2. Reason: Copilot Code Review

### What it is for

Code review reads the diff with repository context and reasons about intent: unreachable states, missing wiring, scope drift, and changes that do not match the issue. It returns an **assessment** (🟢 approval recommended or 🟡 changes recommended), inline comments, and a running list of open issues.

### What triggers it

| How | Who invokes | Notes |
|---|---|---|
| Request Copilot from the Reviewers sidebar | 👤 | Any time; reviews the current head |
| Pull request opened | ⚡ | When a repository ruleset, organization ruleset, or the author's user setting enables automatic review |
| New push to the pull request | ⚡ | **Only when Review new pushes is on.** Without it, the first automatic review is the only one |
| Draft pull request | ⚡ | Only when Review draft pull requests is on |

When several sources apply, Copilot still posts one review. User settings cannot disable push or draft reviews a ruleset enabled.

> **Example (FanHub #221):** with Review new pushes on, code review ran on all eight pushes, roughly two minutes after each one, including the empty plan commits.

### Set it up

- **Automatic review** in a repository or organization ruleset, with **Review new pushes** and **Review draft pull requests** as explicit choices.
- **Review effort:** **Lite** (about $0.05 to $1 of AI credits per review) or **Balanced** (about $0.25 to $5). On private repositories, reviews also use Actions minutes for context gathering.
- **Who can request:** **Only allow Copilot code review to be triggered by authorized users** limits who can start a review that the organization pays for.
- **Runners:** reviews run on standard GitHub-hosted runners by default; larger or self-hosted runners are options.

### Give it context

Code review reads the same instruction files as the cloud agent, from the pull request's head branch. `excludeAgent: "code-review"` or `excludeAgent: "coding-agent"` in an instruction file's frontmatter keeps a rule away from one of them, so a test-writing convention can guide the producer without joining the reviewer's checklist. Path-scoped `*.instructions.md` files with `applyTo` let a team add review rules for one area, such as authentication handlers.

### Use it

1. **Check which commit the review saw.** Every review names the commit it analyzed. A review of a plan commit says it could not review any files.
2. **Read the assessment and the open-issues list together.** The list carries forward unresolved threads from earlier pushes and reports what was resolved since the last review.
3. **Send fixes back.** **Fix with Copilot** (public preview) hands a comment to the cloud agent, which pushes a commit or opens a new pull request. A plain `@copilot` comment works too.
4. **Close threads deliberately.** Resolve a fixed thread, or mark it **Won't fix** or **Incorrect** with a reason.
5. **Run what the review left unexecuted.** Every assessment states whether tests ran during the review.

> **Example (FanHub #198):** four component tests passed and the build was green. Code review still found that the Retry button had no interactive render mode, so its click handler never wired up, and that clearing the error too early made the retrying state unreachable. The author added a render-mode test that failed against the original draft, then passed 6 of 6.

### Troubleshoot it

| Signal | Likely cause | Move |
|---|---|---|
| "Copilot wasn't able to review any files" | The review analyzed a plan-only commit | Turn on Review new pushes, or re-request after the implementation push |
| 🟢 with "1 open issue" | An outdated thread from an earlier commit is still unresolved | Resolve it if the newer commit fixed it |
| No review after the agent's fix | Review new pushes is off | Re-request from the Reviewers sidebar |
| Comments the team does not care about | Instructions are missing or too broad | Add path-scoped review instructions; use `excludeAgent` to separate producer and reviewer rules |

> **Example (FanHub #210 and #221):** on #210, Review new pushes was off; the only automatic review saw the plan commit, and the maintainer re-requested Copilot to get a review of the fix. On #221, a review recommended approval while still listing one open issue: the outdated lockfile thread. It cleared once a person resolved the thread.

### Where its authority ends

Every review is advisory until a team promotes it. Since September 2026, admins can opt in to [Copilot approvals](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/) (public preview). Those approvals count toward required reviews and are dismissed on new pushes, like a human's. Turn it on only for paths where a reasoning review is the bar the team actually holds, and keep at least one human approval wherever behavior, security, or data is at stake.

---

<!-- 🎬 MAJOR SECTION: Measure -->
## 3. Measure: GitHub Code Quality

### What it is for

[GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality) became generally available on 2026-07-20 for GitHub Enterprise Cloud and Team. It measures each commit against CodeQL quality rules and team thresholds, and it is the only one of the three agents whose result can block a merge on its own.

| | Standard findings | AI findings |
|---|---|---|
| **Source** | CodeQL quality rules | Model review of recently changed files |
| **Reproducibility** | Stable for the same code, rules, and tool version | Model-mediated |
| **Status** | GA | Public preview |
| **Where** | Pull requests and default branch | Default branch only |
| **Can gate a merge** | Yes, by severity threshold | No |

Findings roll up into **Reliability** and **Maintainability** ratings of Excellent, Good, Fair, or Poor.

### What triggers it

| How | Who invokes | Notes |
|---|---|---|
| Any push to a pull request | ⚡ | Runs as the **CodeQL - Code Quality** check; findings arrive as inline comments from `github-code-quality[bot]` |
| Push to the default branch | ⚡ | Feeds the Standard findings dashboard |
| AI findings | ⚡ | Default branch only |

> **Example (FanHub #221):** Code Quality started within about five seconds of every push, including the empty plan commits, and never waited for **Approve and run**. On the one push that introduced a problem, the finding appeared about 100 seconds later.

### Set it up

1. Enable Code Quality for the repository. Each language uses its own [CodeQL query list](https://docs.github.com/en/code-security/reference/code-quality/codeql-detection), with a category and severity per rule.
2. Add a quality ruleset: a severity threshold, and optionally a coverage minimum fed by a coverage upload such as Cobertura.
3. Start every rule in **Evaluate** mode, which reports what would have blocked while letting merges through. Promote it to **Active** once the team trusts the signal.

### Use it

- **Read the inline finding.** Each names the rule, the category, and the line.
- **Commit the Autofix yourself (👤).** **Commit suggestions** applies the changeset as your commit.
- **Hand it to the cloud agent (👤 → ⚡).** Reply `@Copilot` on the finding, or bulk-assign backlog findings from the Code Quality dashboard. That handoff is GA.
- **Dismiss with a reason** when the rule does not apply.

> **Example (FanHub #201):** Code Quality flagged a generic catch clause around `int.Parse` and offered a changeset using `int.TryParse`. The author read it and clicked **Commit suggestions**, creating `0b33cda`; the new head's build and analyses passed.

> **Example (FanHub #199):** a ruleset required a 27% coverage minimum. The first head reported 26.7% and the ruleset blocked merge. Two more tests raised it to 30% and the same pull request's gate turned green.

### Troubleshoot it

| Signal | Likely cause | Move |
|---|---|---|
| No findings | The change introduced nothing the rules recognize | Treat it as one kind of evidence; behavior still needs tests and review |
| Two CodeQL checks on the PR | **CodeQL** (security) and **CodeQL - Code Quality** are separate analyses | Read each for its own purpose |
| A gate blocks unexpectedly | A rule moved to Active, or coverage was not uploaded | Check the ruleset mode and the coverage upload step |
| A finding does not apply | The rule's pattern matched intentional code | Dismiss it with a reason |

### Where its authority ends

Rules cover specified patterns. A clean run says the change introduced nothing the rules recognize; the code's behavior still needs executed tests and a reviewer's judgment. Standard findings can gate a merge at the threshold the team set; AI findings stay advisory. Security review and secret scanning stay separate.

---

<!-- 🎬 MAJOR SECTION: Wire It Together -->
## 4. Wire It Together

### One issue, start to finish

This part follows one issue through all three agents. Each step states the general rule first, then what happened on FanHub draft [#221](https://github.com/MSBart2/FanHub/pull/221) on 2026-10-23, with **Review new pushes** on. One step was staged to guarantee a Code Quality finding; it is labelled below.

| # | Rule | Invoked | In practice on #221 (UTC) |
|---|---|---|---|
| 1 | A person writes a delegable issue and assigns it | 👤 | 15:30:24: #159 rewritten with scope and acceptance criteria, then assigned |
| 2 | The agent opens a draft with an empty plan commit | ⚡ | 15:30:31: draft #221, `e046f52` |
| 3 | Code Quality scans every push within seconds | ⚡ | 15:30:36: scan of `e046f52` |
| 4 | Automatic review runs on the opened PR, even if only the plan exists | ⚡ | 15:30:42: "Copilot wasn't able to review any files" |
| 5 | The agent pushes; review and measurement run again on that commit | ⚡ | 15:32:08 `7686606` changed only a lockfile → 15:34:31 🟡 Changes recommended |
| 6 | The agent's next push corrects course; both run again | ⚡ | 15:37:13 `6159164` fix + tests → no Code Quality findings → 15:39:35 🟢 with "1 open issue" (the outdated lockfile thread) |
| 7 | A person resolves stale threads and asks for rework | 👤 | 15:46:05 resolved the thread; 15:46:06 `@copilot` asked for a shared helper and a justification for the `x/crypto` bump |
| 8 | The agent pushes rework; both run again | ⚡ | 15:49:46 `5444980` helper → 15:52:18 🟢 "No open issues", "1 resolved since last review" |
| 9 | A person's push wakes both agents too | 👤 | 15:54:34 `8a752d2` **staged**: a nil guard whose result is immediately overwritten |
| 10 | Code Quality and code review flag it independently | ⚡ | 15:56:18 Code Quality: "Useless assignment to local variable" + Autofix; 15:57:20 review: "Optional cleanup … `Error()` called twice" |
| 11 | A person hands the finding to the agent | 👤 | 15:58:28 `@Copilot` reply on the Code Quality finding |
| 12 | The agent fixes it; both run again; threads resolve | ⚡ | 16:01:56 `6a512c1` → 16:06:08 🟢 "No open issues"; all three threads resolved |
| 13 | A person decides | ⏸ | Every review stated "tests were not executed"; the agent ran `go test` in its own session. The decision stays with the reviewer |

The run shows four facts worth carrying into any repository:

- **Measurement is immediate; reasoning follows.** Code Quality started within seconds of each push; code review followed about two minutes later.
- **Every push re-opens the question.** Agent pushes and person pushes alike wake both agents, which is why Review new pushes matters for delegated work.
- **The two agents see the same line differently.** On the staged commit, Code Quality named a rule and offered a changeset; code review explained the cost. One fix cleared both.
- **Threads carry state across pushes.** An outdated, unresolved thread stays on the open-issues list until a person resolves it.

### What ends the loop

The loop review → rework → push → review can repeat, and three things bound it. The cloud agent cannot approve or merge, so every loop ends with a person. The person decides when another round of rework stops paying for itself. Every pass spends AI credits and Actions minutes for the review and the agent session, attributed to the PR author or the cloud agent's human co-author.

### The evidence on the final head

| Evidence | Produced by | Consumed by |
|---|---|---|
| The patch, its tests, and the agent's own test runs in the session log | Copilot cloud agent | PR owner and reviewer |
| An assessment, the open-issues list, and resolved threads | Copilot code review | Reviewer |
| A Code Quality run with no findings, and the CodeQL security result | GitHub Code Quality | Reviewer and platform owner |
| An executed test run and a judgment about residual risk | A person | Reviewer |

Each row answers a different question. Write the decision down before acting:

| | Record |
|---|---|
| **Evidence available** | What each agent returned, on which commit |
| **Evidence absent** | What none of them checked, such as a browser pass or an independent test run |
| **Policy satisfied** | Rulesets, required checks, quality gates |
| **Judgment applied** | Why the residual risk is acceptable |
| **Action and recovery** | Merge, and how to revert if it regresses |

> **Example (FanHub #210):** with the patch, a 🟢 assessment, a clean Code Quality run, and 8 of 8 tests executed by the maintainer on `02ddaf3`, the maintainer recorded the absent browser check, squash-merged as `803254f`, and named reverting the squash commit as the recovery.

### Know which surface configures what

| Surface | Lives in | Shapes |
|---|---|---|
| **Agent context** | `copilot-instructions.md`, `*.instructions.md` with `applyTo`, `AGENTS.md`, custom agents | What the cloud agent and code review know |
| **Invocation and permissions** | `copilot-setup-steps.yml`, firewall, MCP configuration, workflow approval settings | Where the cloud agent can run and connect |
| **Review policy** | Rulesets: automatic review, review new pushes, review drafts, Copilot approvals, effort level | When code review runs and whether its approval counts |
| **Merge evidence** | Code Quality settings, CodeQL, coverage upload, quality rulesets | Which findings and thresholds can block merge |
| **Economics** | AI credits, Actions minutes, Code Quality licenses | What each promotion costs |

### Promote advice to authority one step at a time

| Step | Cloud agent | Code review | Code Quality |
|---|---|---|---|
| **Observe** | Assign a few well-scoped issues; read every draft | Request reviews manually | Enable on one repository; read the backlog |
| **Evaluate** | Add `copilot-setup-steps` and custom agents | Ruleset auto-review with **Review new pushes** | Quality and coverage rules in Evaluate mode |
| **Enforce** | Platform-fixed: produces drafts only; a person approves and merges | Count Copilot approvals (preview) on chosen paths | Active rules at a severity and coverage the team accepts; AI findings stay advisory |

The ladder is uneven on purpose. The team can **permit** the cloud agent to produce, **count** a review's assessment, and **enforce** a quality threshold. Promote one setting at a time, with a named owner, an observation period, and a rollback condition. Recovery stays cheap at every step: revert a ruleset to Evaluate, dismiss a finding with a reason, resolve a review thread as **Won't fix** or **Incorrect**, or close the draft and reassign the issue.

### Cost belongs in the decision

Since June 2026, Copilot usage bills in **AI Credits** (1 credit = $0.01). A code review uses about $0.05 to $1 of credits at Lite effort and $0.25 to $5 at Balanced, plus Actions minutes for context gathering on private repositories. Review new pushes multiplies that by the number of pushes. Cloud agent sessions also run on Actions. Code Quality is a separate product at **$10 per active committer per month**, plus AI credits for AI findings and Actions minutes for CodeQL scans. Budget for the agents you promote, and watch usage during the Evaluate step.

### Where it stops fitting

Built-in agents respond to a person or a push. When the team wants recurring judgment on a schedule or on repository events, with its own authority contract, move to [GitHub Agentic Workflows](../agentic-lifecycle/). When the work needs a multi-step plan, implement, and verify loop on a developer's machine, move to [Local Agentic SDLC](../local-agentic-sdlc/). When a team wants a readiness score and a maturity path for the whole delivery lifecycle, see [Agentic SDLC](../agentic-sdlc/).

### What you can do today

1. Rewrite one open bug with problem, acceptance criteria, and scope. Assign it to Copilot and watch the plan commit arrive.
2. Turn on **Review new pushes** in your review ruleset, then read which commit each Copilot review analyzed.
3. Enable Code Quality on one repository and put one rule in Evaluate mode.
4. Reply `@Copilot` on one Code Quality finding and watch review and measurement run again on the agent's push.
5. Run the agent's tests yourself before trusting a 🟢 assessment.

### Apply it to your work

Take the last pull request your team merged and replay it against the event map. For each push, write down which agents ran, which were human-invoked, and which commit each one saw. Mark where a ⚡ step was missing, such as a fix commit with no review. That missing step is the first setting to change.

---

## Related Talks

- [GitHub Agentic Workflows](../agentic-lifecycle/) — scheduled and event-driven repository judgment with its own authority contract
- [Copilot Governance](../copilot-governance/) — policies, budgets, and who may promote agent authority
- [Copilot Hooks](../copilot-hooks/) — deterministic checks around agent sessions

## References

- [About Copilot cloud agent](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent)
- [Get the best results from Copilot cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results)
- [About Copilot code review](https://docs.github.com/en/copilot/concepts/agents/code-review)
- [Configure automatic Copilot code review](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-code-review)
- [Changelog: Copilot code review can approve pull requests (preview)](https://github.blog/changelog/2026-09-01-copilot-code-review-can-now-approve-pull-requests/)
- [Changelog: agent-specific instructions with excludeAgent](https://github.blog/changelog/2025-11-12-copilot-code-review-and-coding-agent-now-support-agent-specific-instructions/)
- [About GitHub Code Quality](https://docs.github.com/en/code-security/concepts/code-quality/code-quality)
- [CodeQL-powered analysis for Code Quality](https://docs.github.com/en/code-security/reference/code-quality/codeql-detection)
- [Changelog: GitHub Code Quality is generally available](https://github.blog/changelog/2026-07-20-github-code-quality-is-now-generally-available/)
- [GitHub Code Quality billing](https://docs.github.com/en/billing/concepts/product-billing/github-code-quality)
- FanHub examples: [#221](https://github.com/MSBart2/FanHub/pull/221), [#210](https://github.com/MSBart2/FanHub/pull/210), [#198](https://github.com/MSBart2/FanHub/pull/198), [#199](https://github.com/MSBart2/FanHub/pull/199), [#201](https://github.com/MSBart2/FanHub/pull/201)
