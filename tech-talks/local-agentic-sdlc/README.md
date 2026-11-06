---
status: active
portfolioState: deployed
updated: 2026-11-06
section: "Agents at Your Keyboard"
audience: [developer, team-lead]
level: applied
duration: 45
format: core-talk
decision: "How do I build local agents that can work together on a coding task?"
prerequisites: [custom-agents]
related: [custom-agents, copilot-cli, copilot-hooks, agentic-workflows, copilot-on-github]
references:
  - url: https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/local-agentic-sdlc/evidence/fanhub-202-rehearsal
    label: "FanHub #202 rehearsal: every .team/ file, check output, and diff from one real run"
    verified: 2026-11-06
  - url: https://github.com/MSBart2/CopilotTraining/tree/main/tech-talks/local-agentic-sdlc/evidence/fanhub-202-fusion
    label: "FanHub #202 fusion run: Luna, 1.79 credits, accepted with the All Seasons crash still live"
    verified: 2026-11-06
  - url: https://github.com/MSBart2/FanHub/commit/74b040b2c9b075cbe848c377ddf6ee9385a1e998
    label: "FanHub 74b040b: Found defects and edge tests in the agent files"
    verified: 2026-11-06
  - url: https://github.com/MSBart2/FanHub/tree/61bf87964b964c2c0c9e098cf6ebb1900501315b/.github/agents
    label: "FanHub agent team: five agent files (pinned)"
    verified: 2026-11-06
  - url: https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
    label: "Copilot models and pricing (1 AI credit = $0.01)"
    verified: 2026-11-06
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
  - url: https://github.com/MSBart2/FanHub/blob/54e9c79276cbffde54167078a8b14cbbaf75b686/.github/agents/sdlc-orchestrator.agent.md
    label: "FanHub sdlc-orchestrator.agent.md (pinned)"
    verified: 2026-11-06
  - url: https://github.com/MSBart2/FanHub/blob/54e9c79276cbffde54167078a8b14cbbaf75b686/scripts/copilot-hooks/verify-before-stop.mjs
    label: "FanHub verify-before-stop.mjs (pinned)"
    verified: 2026-11-06
  - url: https://github.com/MSBart2/FanHub/blob/main/.github/agents/orchestrator.agent.md
    label: "FanHub orchestrator.agent.md (talk team, live)"
    verified: 2026-11-06
  - url: https://github.com/MSBart2/FanHub/pull/217
    label: "FanHub #217: integrated draft PR for #4 and #5"
    verified: 2026-10-22
  - url: https://github.com/bradygaster/squad
    label: "bradygaster/squad: human-led AI agent teams for any project"
    verified: 2026-11-06
---

# Local Agentic SDLC: Build the Crew, Run the Loop

> **The Question This Talk Answers:** *"How do I build local agents that can work together on a coding task?"*

**Duration:** 45 minutes | **Audience:** Developers and tech leads who use Copilot CLI and want to build a local workflow for implementing, testing, and reviewing a bounded coding task

A developer picks Season 2 on FanHub's Episodes page and still sees every episode ([FanHub #202](https://github.com/MSBart2/FanHub/issues/202)). Five agent files and one shared folder fix it, and every step leaves a file a person can read.

> **Core insight:** Agent files define the team. An orchestrator, a shared `.team/` folder with one writer per file, and tests plus a reviewer turn them into a run a person can trace, resume, and decide on.

The [approved recipe](deck.recipe.yml) defines 39 slides and 40 minutes of speaking, leaving five minutes for discussion. Parts 1–3 teach from the [rehearsal record](evidence/fanhub-202-rehearsal/README.md); Part 4 runs the same team live.

**Run the talk:** [Native deck](../../slides/tech-talks/local-agentic-sdlc/index.html) · [Speaker notes and handout](../../slides/tech-talks/local-agentic-sdlc/notes.html)

## 1. The Team, Top Down

Start from the bug, then read every file before anything runs: the crew map, the shape of an agent file, the whole orchestrator, and its seven steps with the tool and file each one uses. Branch, wait, route, and resume are sentences in that file. The `.team/` folder names one writer per file; the four workers share three tools and differ in the one file each may write.

## 2. How a Run Works

Follow the real rehearsal. One command switches to branch `issue-202`, reads the issue, drafts `task.md`, and stops until a person approves acceptance criteria A1–A3. Planner finds three problems behind one symptom; implementer removes the cache and guards stale responses; test-writer adds nine tests. Check-1 passes 9 of 9, lint finds four errors in the test file, step 5 routes them to test-writer, and check-2 is clean. The reviewer **accepts** and names what it could not see. `status.md` tells the run in ten rows.

## 3. Trust the Record

Answer every question about the run from a file. Separate what tests, the reviewer, and a person each prove. Label each limit as enforced by the CLI or as an instruction the diff must confirm. Compare a cheaper run: on Luna through fusion, the same team spent 1.79 credits, drafted only the criteria the issue named, passed every check, and left the All Seasons crash that the Sol rehearsal fixed. The agent files now ask for that coverage. Resume a stopped run from `status.md` after a fresh rerun.

## 4. Run It Live

Ask the room: *how much do you think this will cost?* The rehearsal used 39.88 AI credits on GPT-6.1 Sol, about forty cents at one cent per credit, for eleven unattended minutes of planning, coding, testing, and review. Then run the same team on the same bug with a 50-credit limit set in the session and watch `.team/` fill in. Verify the result by rerunning the check and reading the diff. The close scales the team with a branch per issue, a worktree per stream, a Stop hook, and an integrated review; the merge stays with a person. Then it shows how far the idea goes: in [Squad](https://github.com/bradygaster/squad), one sentence casts a team that builds in parallel, and a work monitor keeps the backlog moving while you are away.

## Apply it to your work

Pick one bug with an affordable test command. Run the team, approve `task.md`, answer each permission prompt, then read `status.md` and the diff and rerun the check yourself. The first win is a run you can explain from its files.

## Run it live in FanHub

FanHub `main` carries the bug ([#202](https://github.com/MSBart2/FanHub/issues/202), reopened for demos) and the five agents. The deck teaches from the files [pinned at `61bf879`](https://github.com/MSBart2/FanHub/tree/61bf87964b964c2c0c9e098cf6ebb1900501315b/.github/agents); `main` adds [`74b040b`](https://github.com/MSBart2/FanHub/commit/74b040b2c9b075cbe848c377ddf6ee9385a1e998), where the planner lists defects found outside the task and the test-writer adds `E#` edge tests. The orchestrator reads the issue with `gh issue view`, switches to branch `issue-<N>`, and runs the Check from `AGENTS.md`: frontend Jest plus ESLint on changed files. `.team/` is gitignored. From a FanHub clone in PowerShell:

```powershell
git switch main; git pull                # reset: remove .team/ and delete branch issue-202 from a prior run
npm --prefix node/backend install        # Node 22, 24, or 26
npm --prefix node/frontend install
npm --prefix node/backend start          # API on :5265
npm --prefix node/frontend start         # before: pick Season 2 right after load
copilot
```

Inside the session, pick the agent, the model, and the budget, then give the first prompt:

```text
/agent                                   # choose orchestrator
/model                                   # choose GPT-6.1 Sol, the rehearsal model
/limits set max-ai-credits 50            # session limit; the CLI minimum is 30
Fix FanHub issue #202. Start at step 1.
```

The one-line equivalent is `copilot --agent orchestrator --model gpt-6.1-sol --max-ai-credits 50 -i "Fix FanHub issue #202. Start at step 1."`. Run `/usage` at the end to read the credits spent ([session limits](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit)).

Approve `gh`, `git switch`, and the Check commands; decline installs, commits, and pushes. Edit `.team/task.md` to `Status: approved` when the orchestrator stops, then reply to continue. When `plan.md` lists Found defects, the orchestrator stops again: add each one to `task.md` as a new A# or under Out of scope, then reply to continue. The run ends with a report and a `status.md` row naming the person as next.

The [rehearsal record](evidence/fanhub-202-rehearsal/README.md) holds every `.team/` file, check and lint output, and the resulting diff from one real run on GPT-6.1 Sol: 11 minutes 21 seconds and 39.88 AI credits. One AI credit is one US cent ([pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)), so the run cost about $0.40. Credits per call vary by model; select GPT-6.1 Sol with `/model` to compare like for like. A live run differs in wording and cost; the 50-credit limit caps it. The [fusion run record](evidence/fanhub-202-fusion/README.md) shows the same team on Luna for 1.79 credits, and the coverage it missed. The fix that closed #202 the first time is [PR #210](https://github.com/MSBart2/FanHub/pull/210) if you want an answer key.

## FanHub reference evidence

- [Issue #4: character detail page and plan](https://github.com/MSBart2/FanHub/issues/4)
- [Issue #5: episode detail page and plan](https://github.com/MSBart2/FanHub/issues/5)
- [Orchestrator agent file used for that run](https://github.com/MSBart2/FanHub/blob/54e9c79276cbffde54167078a8b14cbbaf75b686/.github/agents/sdlc-orchestrator.agent.md)
- [Stop-hook implementation used for that run](https://github.com/MSBart2/FanHub/blob/54e9c79276cbffde54167078a8b14cbbaf75b686/scripts/copilot-hooks/verify-before-stop.mjs)
- [Integrated draft PR #217](https://github.com/MSBart2/FanHub/pull/217)
- [Security-advisory loop example](examples/loop-starter/README.md) — a separate workflow; sample values are placeholders, and capped `/every` compatibility remains untested.

FanHub's router-context failure led to a scoped test repair and **47 final passing tests**, including added coverage. Its integrated review added a contrast regression, moving **95 → 96 passing tests**. Its ledger is **one observed run**: about 380 AI credits across four sessions; developer time and a manual baseline were not measured. These records support the mechanism rather than a productivity guarantee.

## Related talks

- [Custom Agents](../custom-agents/README.md): design an agent file that resolves across runtimes
- [Copilot CLI](../copilot-cli/README.md): the terminal surface for the local loop
- [Copilot Hooks](../copilot-hooks/README.md): hook events and policy enforcement
- [GitHub Agentic Workflows](../agentic-workflows/README.md): event-triggered agents with safe outputs
- [Copilot on GitHub](../copilot-on-github/README.md): hosted work assigned for review
