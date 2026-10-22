# Local schedule — Copilot CLI `/every`

Run the loop on your own machine with Copilot CLI. Each pass runs in your local CLI session using your credentials, your network, and your working tree.

## What the session provides

| | Copilot CLI session |
|---|---|
| Kickoff | One prompt by hand, or `/every 1h` for recurring passes |
| Schedule lasts | Until the CLI session exits |
| Permissions boundary | `--allow-tool` / `--deny-tool` for the session; deny wins |
| Acts as | You (`gh` and git credentials) |
| Branch and PR | `git switch -c loop/<GHSA ID>`; `gh pr create --draft` |
| State | `.github/loop-state.json` in the loop's worktree, visible to the next pass immediately |
| Log | The CLI session transcript |

## Start the session

Work in a separate worktree so loop passes and your own edits stay apart:

```bash
git worktree add ../myrepo-loop main
cd ../myrepo-loop
gh auth status            # the orchestrator uses gh for alerts and PRs

copilot --experimental --agent=loop-orchestrator \
  --allow-tool='read, write, shell(npm:*), shell(npx:*), shell(git:*), shell(gh:*), shell(date)' \
  --deny-tool='shell(gh pr merge), shell(gh pr review)'
```

- `--experimental` turns on `/every` (you can also use `/experimental on` inside a session).
- `--agent=loop-orchestrator` makes the orchestrator the session's agent, so its instructions apply to every scheduled pass.
- `--allow-tool` lets passes run without a permission prompt for each command. `--deny-tool` keeps the merge and review decision with a human. Deny rules win over allow rules.

## Run one pass first

Type the pass prompt once by hand and read the transcript:

```text
Run one pass of the security-advisory loop from .github/loop-state.json.
```

Confirm each worker shows up as its own custom-agent call, `history` gains one entry per dispatch, and the draft PR body matches `results.pr.body`. If the CLI asks for a permission you did not expect, decide whether the pass needs it. Then add it to `--allow-tool` for the next session, or leave it denied and adjust the agent's instructions.

## Schedule it

```text
/every 1h Run one pass of the security-advisory loop from .github/loop-state.json.
```

- The footer shows "1 scheduled" while the schedule is active.
- Type `/every` with no arguments to open the schedule manager; select the entry and press `x` to remove it.
- Passes run only while the CLI session is open and your machine is awake; exiting the CLI ends the schedule. Restarting the session and rerunning `/every` picks up from `loop-state.json`. A run that stopped part-way escalates as `stale_run` once its lock is 45 minutes old, so a person decides whether to retry it.

## Cap spend

The orchestrator counts iterations and time itself. For a cap the agent cannot talk its way past, run the pass as an autopilot objective with an AI-credit limit:

```text
/goal Run one pass of the security-advisory loop from .github/loop-state.json. --max-ai-credits 5
```

When the objective reaches 5 credits, autopilot pauses and shows credits used against the cap. Enter a new amount to continue, or dismiss the panel to leave it paused; the next pass escalates the stranded run. Watch one capped pass by hand to calibrate the number before you rely on it.

Untested: whether `/every` accepts `/goal` as a scheduled command, and how `/goal` combines with `--agent`. The CLI reference says `/every` takes "a prompt, skill, or schedulable slash command" without listing which commands qualify. Try `/every 1h /goal Run one pass … --max-ai-credits 5`, then open `/every` to confirm the schedule manager lists it before you leave it running.

## What to plan for

- **State stays in your worktree.** `loop-state.json` changes are visible to the next pass immediately; there is no PR branch to merge between passes. Commit the state file with the fix only when you want reviewers to see the run's evidence.
- **Your credentials, your attribution.** PRs open as you. Branch protection still blocks you from approving your own PR, and CODEOWNERS still routes review to the security team.
- **CI runs normally.** Workflows on the PR start as they do for any PR you open, and required status checks gate the merge.

`/every` is an experimental feature of Copilot CLI and may change. Check the [CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference) for current behavior.
