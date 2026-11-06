---
status: active
updated: 2026-11-06
---

# FanHub #202 rehearsal run

The record from one real run of the FanHub agent team on [FanHub #202](https://github.com/MSBart2/FanHub/issues/202), copied verbatim from `.team/` with one local path made repo-relative. Parts 2 and 3 of the deck teach from these files; Part 4 runs the same team live.

| What | Value |
|---|---|
| Started from | FanHub `2a05c25` with the agent files from [`aeb78a9`](https://github.com/MSBart2/FanHub/tree/aeb78a9/.github/agents) |
| Command | `copilot --agent orchestrator --max-ai-credits 50 -i "Fix FanHub issue #202. Start at step 1."` |
| Model | GPT-6.1 Sol, for the orchestrator and every worker |
| Duration | 11 min 21 s, including about 1 min for the person to approve `task.md` |
| AI credits | 39.88 of 50 at the reviewer's accept (1 AI credit = $0.01 USD, so about $0.40) |
| Result | 9 tests, check-2 passed 9/9, ESLint clean, reviewer **accept**; nothing committed |

## What happened

1. The orchestrator read the issue, drafted `task.md` with A1 to A3, and stopped. A person approved it.
2. Planner, implementer, and test-writer each wrote their file. The implementer removed the 30-second cache and added a request counter so a late response cannot overwrite a newer selection. The planner named the cost: more requests.
3. Check-1 passed 9/9. The orchestrator also ran ESLint on the changed files, which failed on four `globalThis` errors in the test, and routed them to the test-writer.
4. Check-2 passed 9/9 with lint clean. The reviewer accepted.

The orchestrator improvised the lint step and the reviewer worked without a diff. The [current FanHub agent files](https://github.com/MSBart2/FanHub/tree/main/.github/agents) list lint under Check in `task.md`, paste the diff into the reviewer's call, and give each issue its own `issue-N` branch. Since [`74b040b`](https://github.com/MSBart2/FanHub/commit/74b040b2c9b075cbe848c377ddf6ee9385a1e998) they also list defects found outside the task and write `E#` edge tests; the [fusion run](../fanhub-202-fusion/README.md) shows why.

## Files

- [team/](team/): `task.md`, `plan.md`, `changes.md`, `tests.md`, `review.md`, `status.md`, and `evidence/` (check-1, check-2, lint-1, lint-2).
- [source/](source/): the uncommitted change the team left: `Episodes.js.diff` and the new `Episodes.test.js`.
