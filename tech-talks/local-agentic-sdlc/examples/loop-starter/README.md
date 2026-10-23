---
status: active
updated: 2026-10-22
---

# Loop Starter — Security Advisory Response

These five agent files are the working starter for the stop conditions, credit caps, and scheduled passes in [Local Agentic SDLC](../../README.md), written as custom agents with a shared state file. Copy them into a repository, run the loop once by hand, and inspect the evidence before you let a schedule fire it.

The loop runs in a **Copilot CLI** session on your machine. You start a pass with one prompt to the orchestrator, or let `/every 1h` repeat that prompt while the session stays open. The orchestrator and every worker it invokes run in that session against the same working tree, so `loop-state.json` carries each pass's state to the next.

The sample values (the `@example/*` packages, `GHSA-xxxx-xxxx-xxxx`, PR #318, and the timings) are placeholders for illustration. Run the loop against your own repository to produce real ones.

## What's here

```
loop-starter/
  .github/
    agents/
      loop-orchestrator.agent.md      ← reads state, dispatches workers, verifies goals, enforces limits
      vuln-scan-agent.agent.md        ← confirms the advisory, maps call sites → affected_files_report
      fix-proposal-agent.agent.md     ← smallest safe upgrade + tests → proposed_diff, test_results
      security-critic-agent.agent.md  ← re-verifies independently, no edit tool → approve / reject
      pr-author-agent.agent.md        ← writes the draft PR title and body from recorded evidence
    loop-state.json                   ← empty state store to copy into your repository
  loop-state.example-run.json         ← what the state looks like after a run with one critic rejection
  local-schedule.md                   ← trigger: Copilot CLI session, one pass by hand, then /every 1h
```

The examples assume an npm project. For another ecosystem, swap the audit and dependency-tree commands (`pip-audit`, `dotnet list package --vulnerable`, `mvn dependency:tree`) in the scan, fix, critic, and orchestrator files.

## How the five components map to the files

| Loop component | Where it lives |
|---|---|
| **Trigger** | A pass started by hand, or `/every 1h` in [local-schedule.md](./local-schedule.md); the orchestrator's step 0 turns "new alert?" into a run |
| **Goal** | `goal.conditions` in `loop-state.json`: `pr_opened`, `ci_passing`, `cve_resolved`, `no_new_cves`, each with an `evidence` field |
| **Execution** | The four workers, invoked by the orchestrator through the `agent` tool with a task envelope |
| **Verification** | The critic's independent re-run, then the orchestrator's own audit and test commands before any condition is marked met |
| **Controls** | Agent-counted: `max_iterations: 8`, `timeout_minutes: 45`, `critic.max_rejections: 2`. CLI-enforced: `/goal … --max-ai-credits` and `--deny-tool`. Next-pass: a `lock` older than 45 minutes escalates as `stale_run` |

## Who can do what

Two layers of tool scoping keep each agent's reach matched to its job.

| Actor | Can | Cannot |
|---|---|---|
| CLI session (outer boundary) | The `--allow-tool` list | Anything on the `--deny-tool` list (merge, review) |
| `loop-orchestrator` | Read state, run commands, invoke workers, open the draft PR | Approve or merge |
| `vuln-scan-agent` | Read code, run audit commands, write its report | Change dependencies or source |
| `fix-proposal-agent` | Edit dependency files, source, and tests; run tests | Open PRs or invoke other agents |
| `security-critic-agent` | Read code, run read-only commands, return a verdict | Edit any file |
| `pr-author-agent` | Write the PR title and body to state | Open the PR or change code |
| `security-team` (human) | Review, request changes, merge | — |

The `tools` list in each agent file sets what that agent can use. The session's shell allowlist (`shell(gh:*)`, for example) applies to every agent that has `execute`, so "only the orchestrator opens the PR" rests on the agents' instructions; the `--deny-tool` entries keep merge and review out of reach for all of them.

GitHub adds the final control. The PR opens under your account, branch protection keeps you from approving your own PR, and `CODEOWNERS` routes the review to the security team.

## Run it

1. Copy `.github/agents/` and `.github/loop-state.json` into the root `.github/` of a test repository.
2. Replace `@your-org/security-team` in `loop-state.json` with your team handle.
3. Add the [review routing](#review-routing) entry to `CODEOWNERS`.
4. Start a Copilot CLI session in a separate worktree as described in [local-schedule.md](./local-schedule.md).
5. Run one pass by hand and inspect the evidence below. When it looks right, schedule it with `/every 1h`.

## Inspect the evidence

After the first run, check these before enabling the schedule:

| Look at | Healthy result |
|---|---|
| `history` in `loop-state.json` | One entry per dispatch; `iteration_count` matches its length |
| `goal.conditions.*.evidence` | Command output from the orchestrator, timestamped after the last fix |
| `critic.last_verdict.verified` | Lists the checks the critic reproduced itself |
| The PR diff | Only files in `constraints.touch_only` (plus `loop-state.json` if you commit it) |
| The PR body | Numbers match `results.test_results`, including skipped tests |

Compare with [loop-state.example-run.json](./loop-state.example-run.json), where the critic rejected the first fix because its test asserted on parser internals, and approved the second.

## When the evidence looks wrong

| Signal | Likely cause | Next move |
|---|---|---|
| Workers don't appear as separate custom-agent calls in the transcript | The session isn't loading the repository's agent files | Start the CLI from the repository root, run `/agent` to confirm the workers are listed, and check each file's frontmatter |
| `status: escalated` with `max_iterations` | The fix and critic disagree repeatedly | Read the critic's `feedback` in `history`; tighten the fix agent's instructions for that case |
| `status: escalated` with `timeout` | `npm ci` or the test suite is slow | Raise `timeout_minutes`, or point the fix agent at targeted tests and leave the full suite to the orchestrator |
| `status: escalated` with `stale_run` | A pass stopped part-way: the session exited, the machine slept, or the credit cap paused it | Read the last `history` entry and the worktree's `git status`; clean up the branch, and the next pass resets to `idle` |
| Autopilot pauses with a credits panel | The pass reached its `--max-ai-credits` cap | Decide whether the run deserves more spend. Enter a new cap to continue, or dismiss the panel and let the next pass escalate the run |
| `/every` passes stop overnight | The CLI session exited or the machine slept | Expected: the schedule lives as long as the session. Restart the session and rerun `/every`; the loop resumes from `loop-state.json` |
| Two PRs for the same advisory | The dedupe search missed the first PR | Confirm the PR title contains the GHSA ID; the orchestrator searches for it |
| State changes missing on the next pass | The pass ran in a different worktree or branch | Run every pass from the same worktree, and have the orchestrator switch back to the default branch after it opens a PR |

## Review routing

Route every dependency change to the security team with one `CODEOWNERS` entry. GitHub requests the review automatically when the PR opens, independent of the agents.

```
# .github/CODEOWNERS
package.json        @your-org/security-team
package-lock.json   @your-org/security-team
```

## Scale it up

A fuller design adds a separate `test-runner-agent` and a deeper goal watchdog. This starter folds test runs into the fix agent and the critic's re-verification. When you want a runtime that enforces turn, time, and write limits for you, the [GitHub Agentic Workflows](../../../agentic-lifecycle/README.md) talk covers it.
