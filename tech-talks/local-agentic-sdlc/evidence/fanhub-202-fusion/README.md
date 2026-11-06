---
status: active
updated: 2026-11-06
---

# FanHub #202 fusion run

A second run of the same agent team on [FanHub #202](https://github.com/MSBart2/FanHub/issues/202), with the model choice left to fusion. The files are copied verbatim from `.team/`. The run passed every check and was accepted, but it missed a crash that the [GPT-6.1 Sol rehearsal](../fanhub-202-rehearsal/) found and fixed. The deck's Part 3 compares the two runs.

| What | Value |
|---|---|
| Agent files | FanHub [`61bf879`](https://github.com/MSBart2/FanHub/tree/61bf87964b964c2c0c9e098cf6ebb1900501315b/.github/agents), started on `main` |
| Model | Fusion, which routed the work to Luna |
| AI credits | 1.79, read from the CLI by the person who ran it |
| Result | 2 tests, check-1 passed 2/2, ESLint clean, reviewer **accept** on round 1; nothing committed |
| Missed | Clicking **All Seasons** still throws: `handleSeasonClick(null)` compares `selectedSeason` with `undefined`, then reads `season.id` on null |

## Why the tests missed it

- The orchestrator drafted A1 and A2 from the issue text. The issue describes only Season 2, so All Seasons never became a criterion. Sol's draft added A3 for All Seasons after reading the code.
- The planner named the risk ("could regress all-seasons behavior"), but a risk had no path to a test.
- The test-writer wrote one test per criterion, and the reviewer checked each criterion. Every agent followed its file.

FanHub [`74b040b`](https://github.com/MSBart2/FanHub/commit/74b040b) closes the gap in the agent files. The planner lists defects found outside the task, and the orchestrator stops so the person can scope them. The test-writer adds `E#` edge tests for every control that reaches the changed code and for each risk. The reviewer returns revise when a risk has no test.

## Files

- [team/](team/): `task.md`, `plan.md`, `changes.md`, `tests.md`, `review.md`, `status.md`, and `evidence/check-1.txt`.
- [source/](source/): the uncommitted change the team left: `Episodes.js.diff` and the new `Episodes.test.js`.
