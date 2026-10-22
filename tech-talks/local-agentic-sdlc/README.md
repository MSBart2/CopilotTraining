---
status: active
portfolioState: deployed
updated: 2026-10-22
section: "Agents at Your Keyboard"
audience: [developer, team-lead]
level: applied
duration: 45
format: core-talk
decision: "How can a developer run plan, implement, test, review, and integrate locally with custom agents, and know when the run is done?"
prerequisites: [custom-agents]
related: [custom-agents, copilot-cli, copilot-hooks, agentic-lifecycle, copilot-on-github]
references:
  - url: https://code.visualstudio.com/docs/agents/run/subagents
    label: "VS Code: subagents and orchestration patterns"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/reference/custom-agents-configuration
    label: "Custom agents configuration reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
    label: "Create custom agents for Copilot CLI"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/reference/hooks-reference
    label: "Hooks reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode
    label: "Copilot CLI: autopilot mode"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions
    label: "Copilot CLI: work with multiple sessions"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference
    label: "Copilot CLI command reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents
    label: "Delegating and parallelizing work with agents"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md
    label: "FanHub sdlc-orchestrator.agent.md"
    verified: 2026-10-22
  - url: https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs
    label: "FanHub verify-before-stop.mjs"
    verified: 2026-10-22
  - url: https://github.com/MSBart2/FanHub/pull/217
    label: "FanHub #217: integrated draft PR for #4 and #5"
    verified: 2026-10-22
---

# Local Agentic SDLC: A Loop with a Contract

> **The question this talk answers:** How can a developer run plan, implement, test, review, and integrate locally with custom agents, and know when the run is done?

**Duration:** 45 minutes | **Audience:** Developers and tech leads who already use agent mode and want to hand a whole issue to a crew of local agents, from plan through a reviewable pull request

A FanHub developer has two open issues: [#4](https://github.com/MSBart2/FanHub/issues/4) adds a character detail page and [#5](https://github.com/MSBart2/FanHub/issues/5) adds an episode detail page. Both are real features with tests, and both touch the router in `App.js`. The developer wants agents to take each issue from plan to a reviewable pull request on their own machine, in parallel, without supervising every turn. The decision is how to set up that loop so it splits the work sensibly, keeps going while evidence says the work is unfinished, stops within a budget, and hands the result to a person.

> **Core insight:** A local agentic SDLC is a loop with a contract. An orchestrator agent owns the sequence, and each subagent owns one role. Tests decide when the work is done, a budget decides when to give up, and a person decides what merges. Write those four answers down before the first run, and each one becomes something you can inspect afterwards.

### The run, end to end

FanHub ran the loop on 2026-10-22 with Copilot CLI 1.0.100, using one orchestrator agent and four role agents committed to the repository.

| Stage | Command shape | Observed result | AI credits |
|---|---|---|---|
| **Plan** (main checkout) | `copilot --agent sdlc-orchestrator --mode autopilot -p "plan #4 #5"` | Two plans posted as issue comments, with risks named before any code was written; split into two workstreams; `App.js`, `App.test.js`, and `node/README.md` named as seams | 47.15 |
| **Implement #4** (worktree `char-detail`) | `copilot --worktree char-detail … -p "implement #4"` | Commit `bee5680`; 56/56 tests; reviewer accepted after one round of requested changes | 104.12 |
| **Implement #5** (worktree `episode-detail`, in parallel) | `copilot --worktree episode-detail … -p "implement #5"` | Commit `24b6a6c`; first suite run 8 failed, final 47/47; reviewer accepted after revisions | 102.55 |
| **Integrate** (worktree `detail-pages`) | `-p "integrate char-detail episode-detail into feat/node-detail-pages for #4 #5"` | Seam conflicts resolved; reviewer caught a post-merge contrast defect; 96/96; draft [#217](https://github.com/MSBart2/FanHub/pull/217) | 126.13 |

Two features went from issue to an integrated draft pull request for about 380 AI credits. That is one observed run: developer time and a manual baseline were not measured. The orchestrator never edited code itself. Every stage left an artifact a person can open: issue comments, local commits, a hook decision log, a session transcript, and a pull request whose body is the integration record.

---

## 1. Write the Loop Contract First

### Four answers before the first run

The orchestrator's prompt states the contract, and the agent repeats it in its first message and in its final summary:

| Question | FanHub's answer | Where it is enforced |
|---|---|---|
| **Who does what?** | planner plans (read-only), implementer edits source, test-writer edits tests, test-reviewer gives a verdict (read-only) | Each agent's `tools` list and body |
| **When is it done?** | The frontend Jest suite passes and the reviewer accepts | A Stop hook runs the suite; the orchestrator calls the reviewer |
| **When does it give up?** | `--max-autopilot-continues`, `--max-ai-credits`, and three blocked stops | CLI flags and the hook's counter |
| **Who decides what merges?** | A person reviewing a draft pull request | `--deny-tool 'shell(git push)'` while implementing; draft PR at integration |

Writing the contract first turns "let the agents handle it" into four checks a person can verify afterwards.

### A plan with risks before code

The planner reads the issue and the code it touches, then returns a fixed shape: goal, files to change, files to create, **risks before code**, tests to add, and done-when. The orchestrator posts each plan as an issue comment, so the plan lives where the team already reviews work.

The #5 plan named the risk that later materialized: the existing `Episodes.test.js` renders the page without a router, so adding navigation would break it. The #4 plan noted that `Characters.jsx` is a class component, so navigation had to use `Link` wrappers in place of hooks. Both risks were recorded before any code was written.

### The split test

The orchestrator decides whether two issues become two workstreams:

- **Split** when the file sets are disjoint apart from named seams, and each workstream can pass the suite on its own.
- **Keep together** when both plans edit the same component, or one depends on the other's output.
- **Name every seam** and its owner. FanHub's seams were `App.js` (both add a route), `App.test.js` (both add route tests), and `node/README.md`. The integration step owns all three.

The planner also kept each page self-contained ("related entities remain noninteractive") so neither workstream needed the other to exist. That one line is what made parallel work safe.

---

## 2. Build the Orchestrator and Its Crew

### The orchestrator owns sequence and delegates everything else

```yaml
---
name: sdlc-orchestrator
description: Runs one FanHub Node frontend issue through plan, implement, test, review, and integrate using narrow subagents. Owns sequence and the loop contract; never writes code itself.
tools: ["agent", "read", "search", "execute", "todo"]
agents: ["planner", "implementer", "test-writer", "test-reviewer"]
hooks:
  Stop:
    - type: command
      command: node scripts/copilot-hooks/verify-before-stop.mjs
      timeoutSec: 300
---
```

- **`agents`** is an allow-list: the orchestrator may call these four and no others.
- **`tools`** omits `edit`. The orchestrator can run commands and read files, and every change goes through a role agent.
- **`hooks`** scopes the Stop hook to this agent, so the gate applies whenever the orchestrator tries to finish.
- **The body** defines three modes (`plan`, `implement`, `integrate`) with numbered steps, including "two rounds at most before you stop and report."

### Each role agent gets one boundary

| Agent | `tools` | Boundary that held in the run |
|---|---|---|
| `planner` | `read`, `search` | Wrote no files; returned plans to the orchestrator |
| `implementer` | `read`, `search`, `edit`, `execute` | Edited no tests. In #5 it reported "8 failed, 8 total" and left the test fix to test-writer |
| `test-writer` | reused from [Custom Agents](../custom-agents/README.md) | Edited only `*.test.js` files |
| `test-reviewer` | read-only | Returned request-changes or accept with findings |

`planner` and `implementer` set `user-invocable: false`, so they serve the orchestrator and stay out of the agent picker. Subagents start with no conversation history: the orchestrator passes each one the plan, the failing output, or the reviewer's findings as its prompt.

### One worktree per workstream

```powershell
copilot --worktree char-detail --agent sdlc-orchestrator --mode autopilot `
  --max-autopilot-continues 15 --max-ai-credits 150 `
  --allow-all-tools --deny-tool 'shell(git push)' `
  --share .\evidence\impl4.md --log-dir .\evidence\impl4-logs -p "implement #4"
```

`--worktree <name>` creates a sibling `FanHub.worktrees\<name>` folder on a new branch, so two sessions can edit the same files without colliding. A fresh worktree has no `node_modules`, so a repository `sessionStart` hook (`.github/hooks/sdlc-loop.json`) links the main checkout's `node/frontend/node_modules` into it. Both worktrees came up ready to run Jest.

Permissions need the same care as roles. The first plan session allowed `shell(gh:*)`, and the agent's compound PowerShell command (create a folder, write a file, post a comment) fell outside that rule. Autopilot stopped after repeated turns without progress, at 38.67 of its 40 credits. The working configuration was `--allow-all-tools` with an explicit `--deny-tool 'shell(git push)'`. Deny rules take precedence over every allow rule.

---

## 3. Let Evidence Decide When to Stop

### The Stop hook turns "done" into a test result

```javascript
// scripts/copilot-hooks/verify-before-stop.mjs (core)
const run = spawnSync('npx react-scripts test --watchAll=false', { cwd: frontend, shell: true, env: { ...process.env, CI: 'true' } });
if (run.status === 0) return allow();
if (blocks >= 3) return escalate();          // write escalation note, then allow
saveBlocks(blocks + 1);
print({ decision: 'block', reason: `Stop hook (block ${blocks + 1} of 3): suite failing.\n${failures}\nRoute the failure to implementer or test-writer, rerun, then finish.` });
```

When the orchestrator tries to finish, the hook runs Jest. On failure it returns `decision: "block"` with the failing lines as `reason`, and the CLI feeds that reason back as the agent's next prompt. On success it returns `allow`. Every decision is appended to `.copilot-loop/hook-log.jsonl`, which is gitignored local evidence.

Two details from the run:

- **Agent-scoped Stop hooks receive snake_case input.** The logged keys were `hook_event_name`, `session_id`, `timestamp`, `cwd`, `transcript_path`, `stop_reason`, `stop_hook_active`. The first version read `sessionId` and keyed every counter as `unknown`. Logging the raw input keys found the problem in one run.
- **The counter is per session.** Two parallel worktrees each kept their own three strikes.

### What the gate saw across the real runs

| Run | Hook decisions | What caught failures |
|---|---|---|
| Plan, implement #4, implement #5, integrate | **11 allow, 0 block** | The orchestrator's own step: run the suite, route failures, rerun |
| #5 inside the loop | n/a | `useNavigate() may be used only in the context of a <Router> component` → 8 failed → test-writer added router context → 47/47 |
| Integrate inside the loop | n/a | Reviewer found white headings on new white panels after the merge → implementer fixed `CharacterDetail.jsx`, test-writer added a 4.5:1 contrast regression → 96/96 |

The orchestrator's contract tells it to run the suite before finishing, so by the time it tried to stop, the suite was green. The hook confirmed it each time. The gate earns its place on the run that skips that step.

### The backstop, demonstrated

A staged run showed that path. A commit renamed the season filter label from "Season" to "Series", and the prompt told the orchestrator to skip tests and finish:

```json
{"branch":"hook-demo","decision":"block","blocksSoFar":0,"tests":"Tests: 7 failed, 1 passed, 8 total","seconds":5}
{"branch":"hook-demo","decision":"allow","blocksSoFar":1,"tests":"Tests: 8 passed, 8 total","seconds":4}
```

The block arrived with the failing assertions. The orchestrator routed them to test-writer, which updated the label expectations, and the next stop passed. The orchestrator committed locally (`33163d2`) for 26.89 credits in total.

That run also marks the gate's boundary. The agent treated the rename as intended and changed the tests to match. **The hook proves the code and its tests agree; whether the change was wanted is a person's call.** That decision belongs at review.

### Budgets decide when to give up

| Control | Scope | Observed |
|---|---|---|
| `--max-ai-credits N` (minimum 30) | Whole session, subagents included; warnings at 50/75/90% | Integration stopped at 113.4 of 120 while trying to commit a gitignored record |
| `--max-autopilot-continues N` | Autopilot continuation turns | Set to 15 for implementation; neither implementation run needed the cap |
| Autopilot no-progress stop | Repeated turns without successful tool calls | Plan session stopped when permissions blocked publishing |
| Hook strike counter | Blocked stops per session | Three, then an escalation note; agent-scoped Stop hooks also stop forcing after 8 consecutive blocks |

Both budget stops were useful. Each left a clean state, a transcript, and a stated reason. For the integration run, a person read the summary, clarified that the integration record is the pull request body, and resumed the session with `--resume` and a 140-credit cap. The orchestrator's instructions now say so explicitly.

---

## 4. Integrate, Then Hand It to a Person

### Integration resolves seams and records what happened

The integrate mode merges each workstream branch with `--no-ff`, resolves conflicts only in named seams, runs the full suite, calls the reviewer on the whole diff against `main`, and writes an integration record:

- **Seams:** `App.js` merged automatically with both routes; `App.test.js` had the expected add/add conflict and kept all six character and five episode route tests; README kept both feature sections.
- **Outside the seams:** "No conflicts occurred outside these named seams." The contrast fix to `CharacterDetail.jsx` is listed as a reviewer correction with its regression test.
- **Counts:** 56 and 47 before merging; 95 after; 96 after the contrast regression. Shared tests are counted once.
- **Open risks:** strict CI builds still fail on pre-existing lint warnings; live-backend and deep-link refresh behavior are unverified.

The record becomes the body of draft pull request [#217](https://github.com/MSBart2/FanHub/pull/217), with `Fixes #4` and `Fixes #5`.

### The handoff

The loop ends where human authority begins. The orchestrator pushed one feature branch and opened a draft. It left merging, marking ready, and closing issues to a person. The reviewer reads a pull request that arrives with its plan (issue comments), its evidence (suite counts, hook log, transcripts), and its open risks named. Whatever rules protect `main` apply to it like any other pull request.

Ownership stays explicit after the run: the reviewer owns the merge decision and the intent behind every change, and the team lead owns the budget and escalation policy the next run will use.

### Where it stops fitting

- **Work that should start from an event**, such as a label, a schedule, or a failed check, with no developer present, belongs to [GitHub Agentic Workflows](../agentic-lifecycle/README.md).
- **Work a developer wants to assign and walk away from** belongs to the cloud agent in [Copilot on GitHub](../copilot-on-github/README.md), which runs in an Actions environment and opens its own pull request.
- **Small, single-file changes** cost more in plan-and-review overhead than they save. The plan stage alone used 47 credits here.
- **Verification without a fast command** weakens the Stop hook. The FanHub suite runs in about five seconds; a gate that takes minutes changes the economics of every blocked stop.

### What you can do today

1. Write a loop contract for one issue in your repository: roles, split decision, done-when command, budget, and merge owner.
2. Create the orchestrator with an `agents` allow-list and no `edit` tool, plus one read-only planner.
3. Add a Stop hook that runs your fastest meaningful test command, logs every decision, and stops forcing after a few blocks.
4. Run it once with `--max-ai-credits` and `--share`, then read the hook log and transcript before reading the diff.

### Apply it to your work

Pick the next issue you would hand to an agent. Which command would your Stop hook run, how many credits is the issue worth, and who reads the draft before it merges?

## Related Talks

- [Custom Agents](../custom-agents/README.md): designing one agent file that resolves well in every runtime
- [Copilot CLI](../copilot-cli/README.md): the terminal surface this loop runs in
- [Copilot Hooks](../copilot-hooks/README.md): hook events, decisions, and policy enforcement in depth
- [GitHub Agentic Workflows](../agentic-lifecycle/README.md): event-triggered agents with safe outputs
- [Copilot on GitHub](../copilot-on-github/README.md): the cloud agent, code review, and Code Quality on one pull request

## References

- [VS Code: subagents and orchestration patterns](https://code.visualstudio.com/docs/agents/run/subagents)
- [Custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Create custom agents for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
- [Hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference)
- [Copilot CLI: autopilot mode](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/use-autopilot-mode)
- [Copilot CLI: work with multiple sessions](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/work-with-multiple-sessions)
- [Copilot CLI command reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference)
- [Delegating and parallelizing work with agents](https://docs.github.com/en/copilot/concepts/agent-capabilities/choosing-and-delegating-agent-work/delegating-and-parallelizing-work-with-agents)
- FanHub evidence: [sdlc-orchestrator.agent.md](https://github.com/MSBart2/FanHub/blob/main/.github/agents/sdlc-orchestrator.agent.md), [verify-before-stop.mjs](https://github.com/MSBart2/FanHub/blob/main/scripts/copilot-hooks/verify-before-stop.mjs), [#4 plan](https://github.com/MSBart2/FanHub/issues/4#issuecomment-6331066431), [#5 plan](https://github.com/MSBart2/FanHub/issues/5#issuecomment-6331066686), [#217](https://github.com/MSBart2/FanHub/pull/217)
