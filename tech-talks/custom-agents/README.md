---
status: active
portfolioState: deployed
updated: 2026-10-21
section: "Foundations"
audience: [developer, platform-engineer, team-lead]
level: applied
duration: 45
format: core-talk
decision: "How should a team design one custom agent that behaves the way it intends in every runtime it reaches?"
prerequisites: [copilot-primitives]
related: [local-agentic-sdlc, copilot-on-github, agentic-lifecycle, copilot-hooks]
references:
  - url: https://docs.github.com/en/copilot/reference/custom-agents-configuration
    label: "Custom agents configuration reference"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/customizations/custom-agents
    label: "About custom agents"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations
    label: "Comparing GitHub Copilot customizations"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli
    label: "Create custom agents for Copilot CLI"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents
    label: "Create custom agents for Copilot cloud agent"
    verified: 2026-10-21
  - url: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
    label: "Customize the cloud agent environment (copilot-setup-steps.yml)"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agent-customization/custom-agents
    label: "VS Code: custom agents"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference
    label: "VS Code: custom agent file reference"
    verified: 2026-10-21
  - url: https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view
    label: "VS Code: Chat Debug view and Agent Debug Log"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md
    label: "FanHub test-writer.agent.md"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/216
    label: "FanHub #216: test-writer in VS Code"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/215
    label: "FanHub #215: test-writer in Copilot CLI"
    verified: 2026-10-21
  - url: https://github.com/MSBart2/FanHub/pull/214
    label: "FanHub #214: test-writer in Copilot cloud agent"
    verified: 2026-10-21
---

# Custom Agents: One File, Every Runtime

> **The question this talk answers:** How should a team design one custom agent that behaves the way it intends in every runtime it reaches?

**Duration:** 45 minutes | **Audience:** Developers and platform engineers who write custom agents the whole team shares, and the team leads who rely on them

A FanHub platform engineer wants a specialist: an agent that writes Jest tests for the Node frontend, edits only test files, runs what it writes, and escalates suspected production defects to a person. Developers will call it from VS Code and the Copilot CLI, and maintainers will assign issues to it on GitHub. The engineer writes one file, `.github/agents/test-writer.agent.md`, and commits it. The decision is how to write that file so the agent the team designed is the agent that runs, wherever someone starts it.

> **Core insight:** One agent file carries a shared role across runtimes, and each runtime resolves that file in its own context: which fields it reads, which tools the aliases become, which model runs, and which environment the agent works in. Unsupported fields are skipped quietly by design, which is what makes one file portable. Write the portable core first, add runtime-specific fields on purpose, and read the resolved run in every runtime the team uses.

### The same file in three runtimes

FanHub ran `test-writer` on the same kind of task in three places on 2026-10-21: tests for one small component each.

| | VS Code (Local session) | Copilot CLI 1.0.100 | Copilot cloud agent |
|---|---|---|---|
| **Issue → PR** | #213 → [#216](https://github.com/MSBart2/FanHub/pull/216) | #212 → [#215](https://github.com/MSBart2/FanHub/pull/215) | #211 → [#214](https://github.com/MSBart2/FanHub/pull/214) |
| **How it started** | Agent picker, typed prompt | `copilot --agent test-writer -p …` | `gh agent-task create --custom-agent test-writer` |
| **`model: Claude Sonnet 5.5 (copilot)`** | Requests ran `gpt-6.1-sol`; cause unresolved | Resolved to `claude-sonnet-5.5` and logged it | Unobserved: the session log names no model |
| **`tools` (6 aliases)** | Expanded to 23 VS Code tools | Expanded to 14 CLI tools | Ran as a subagent; tool count unobserved |
| **`handoffs`** | "Review these tests" button appeared and worked | Skipped; nothing logged | Skipped; nothing logged |
| **`argument-hint`** | Shown once the session type was Local | Skipped | Skipped |
| **Tests run by the agent** | 14 passed | 10 passed | First run stopped at `Cannot find module 'react'`; after setup steps, 6 passed |
| **Where you see it** | Chat Debug export | `--log-level debug` log | PR description + session log |

Each observed cell comes from an artifact the team can open; "unobserved" marks what the available artifacts leave open. All three runtimes recognized and invoked the agent. The tool counts describe each runtime's own expansion of the same six aliases, so they compare resolution, and they leave capability unranked. Three cells hold a surprise, and only the CLI wrote its model decision into a log.

<!-- 🎬 MAJOR SECTION: Design the Portable Core -->
## 1. Design the Portable Core

### When a role earns its own agent file

GitHub describes customizations as a set with distinct jobs ([comparing customizations](https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations)):

| Primitive | Carries | Reach for it when |
|---|---|---|
| **Instructions** (`copilot-instructions.md`, `*.instructions.md`, `AGENTS.md`) | Conventions that apply to everyone | Every agent should follow the rule |
| **Prompt file** (`*.prompt.md`) | One repeatable task | A person starts a known task by name |
| **Skill** (`SKILL.md` folder) | A method plus scripts and resources loaded on demand | Any agent may need the capability for a kind of task |
| **Custom agent** (`*.agent.md`) | A persistent role: identity, tool boundary, method, and model preference | The work needs a different *who*: different tools, a narrower write boundary, a hand-off point |

`test-writer` earns a file because its boundary differs from the default agent: it edits test files only, runs one command family, and reports production bugs for a person to fix. A convention ("tests sit beside the component") belongs in instructions; a reusable method ("how FanHub mocks the API layer") belongs in a skill the agent can load.

### Anatomy: description selects, tools bound, body teaches

```markdown
---
name: test-writer
description: Writes focused Jest tests for one FanHub Node frontend component or page,
  runs them, and reports any production behavior that looks wrong. Edits test files only.
argument-hint: "Component or page to test, e.g. src/components/QuoteDisplay.jsx"
tools: ["read", "search", "edit", "execute", "todo", "web"]
model: "Claude Sonnet 5.5 (copilot)"
handoffs:
  - label: Review these tests
    agent: test-reviewer
    prompt: Review the tests test-writer just added. ...
    send: false
---
# Test writer for the FanHub Node frontend
You write tests. You do not change production code.
## Scope ... ## Method ... ## Final summary ...
```

- **`description`** is the only required field. Pickers show it, and the CLI and VS Code use it to choose an agent automatically, so write it as a selection rule: what the agent does and the boundary it keeps.
- **`tools`** takes aliases that each runtime maps to its own tools: `read`, `edit`, `search`, `execute`, `agent`, `web`, `todo`, plus MCP tools as `server/tool` or `server/*`. `tools: []` grants none; omitting the field grants all.
- **The body** carries the method and the output contract, up to 30,000 characters. Every runtime reads it, which makes it the most portable place for behavior.

### Write the output contract into the body

`test-writer` ends every run with the same five-line summary: agent, tests added, command and result, suspected bugs, files changed. That contract made the cloud run inspectable: the agent's own summary carried the execution failure ("could not run tests because react was missing"), and the pull request description covered the behaviors tested.

### Publish it where it should load

| Scope | Location | Who gets it |
|---|---|---|
| **Repository** | `.github/agents/*.agent.md` | Everyone working in the repo, in every runtime |
| **Personal (CLI)** | `~/.copilot/agents/` | One developer, every repo, in the CLI |
| **Personal (VS Code)** | VS Code profile storage | One developer, in VS Code |
| **Organization / enterprise** | `agents/` at the root of the org's `.github` or `.github-private` repo | Every repo in the org; the cloud agent and VS Code discover it |

The filename is the agent's ID. When two scopes define the same ID, **the most local definition wins**: personal, then repository, then organization, then enterprise. A developer's personal `test-writer.agent.md` therefore replaces the team's version for that developer only. That makes experiments easy. When teammates see different behavior from the same agent, identify the winning file before debugging the prompt.

The cloud agent reads agents from the **default branch**. FanHub committed `test-writer` to `main` ([df50ea1](https://github.com/MSBart2/FanHub/commit/df50ea1)) before assigning the first issue.

### Choose who can start it

- **`target: vscode | github-copilot`** limits an agent to IDE runtimes or to GitHub. Omit it to offer the agent everywhere.
- **`user-invocable: false`** hides the agent from pickers and keeps it available as a subagent: a good fit for a reviewer that only an orchestrator should call.
- **`disable-model-invocation: true`** stops automatic selection; a person or an orchestrator must name the agent. (It supersedes the retired `infer` field.)

<!-- 🎬 MAJOR SECTION: Run One File in Three Runtimes -->
## 2. Run One File in Three Runtimes

### Quiet skipping is the portability design

The configuration reference states it directly: runtimes ignore tool names and fields they do not support, so one profile can serve several products without errors ([reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration)). The documented field support on 2026-10-21:

| Field | VS Code | Copilot CLI | Cloud agent |
|---|---|---|---|
| `name`, `description`, `tools`, `target`, `user-invocable`, `disable-model-invocation` | ✅ | ✅ | ✅ |
| `model` | ✅ | ✅ | Documented for IDE use |
| `handoffs`, `agents`, `argument-hint` | ✅ Local session | — | — |
| `hooks` (agent-scoped) | ✅ | ✅ ([hooks reference](https://docs.github.com/en/copilot/reference/hooks-reference)) | — |
| `reasoning-effort` | ✅ | — | — |
| `include-custom-instructions` | — | ✅ subagent runs | — |
| `mcp-servers`, `metadata` | — | — | ✅ |
| `web`, `todo` tool aliases | ✅ | ✅ | Not applicable |

That table is **documented support**. The FanHub runs below are **observed resolution**: what each runtime actually did with the same file.

### VS Code: handoffs worked, and the run used a different model

In a **Local** session, VS Code honored the most fields. The `argument-hint` placeholder appeared once the session type was Local; in the first attempt, the chat box showed no hint. After `test-writer` finished, the **Review these tests** button appeared, and one click switched to `test-reviewer` with the prefilled prompt. The request log shows the tool boundary following the agent: `test-writer` ran with **23 tools** (`apply_patch`, `create_file`, `run_in_terminal`, `fetch_webpage`, `manage_todo_list`, plus VS Code's own `runSubagent` and `vscode_askQuestions`), and `test-reviewer`, declared with `["read", "search"]`, ran with **10 read-only tools**. Tests: 14 passed; reviewer verdict: accept.

The same log shows every request running on **`gpt-6.1-sol`**. The agent declared `Claude Sonnet 5.5 (copilot)`, and the available evidence does not identify why the run used a different model. Treat it as an **unresolved discrepancy**: the declared model and the executed model differed, and only the request log revealed it. That is reason enough to read the model from the run whenever the model matters.

### Copilot CLI: the model resolved and logged; handoffs skipped

The CLI's debug log names its decision:

```text
Using model "claude-sonnet-5.5" from custom agent "test-writer"
  (resolved from "Claude Sonnet 5.5 (copilot)")
```

The six aliases became **14 tools**, including `web_fetch` and `update_todo`. The log has no entry for `handoffs` or `argument-hint`. Tests: 10 passed, test file only, 8.65 AI Credits in 2 minutes 14 seconds.

### Cloud agent: the agent ran; the environment came from setup steps

The pull request description recorded **"Custom agent used: test-writer"**, and the session log shows the cloud agent starting it as a subagent (`▶️ Begin subagent: test-writer`) after launching its GitHub and Playwright MCP servers. The agent wrote six tests and ran its command, which stopped at `Cannot find module 'react'`. The cloud runner starts from a fresh clone, and FanHub had no setup steps installing the frontend dependencies; the agent's own `npm ci` attempt could not reach its package proxy. This is an **execution-environment dependency** of the cloud agent: any cloud task that runs Jest needs it, custom agent or not.

The agent's summary carried the failure. The pull request description covered the behaviors tested. Run locally, the suite gave **5 passed, 1 failed**: one test asserted the card never mentions "Joey" when attribution is hidden, and the quote's context line mentions Joey. "The agent created tests" and "the tests are valid" are separate claims, each with its own proof.

**Recovery, observed.** FanHub added `.github/workflows/copilot-setup-steps.yml` to install the frontend dependencies ([e1675df](https://github.com/MSBart2/FanHub/commit/e1675df); the validation run passed), then commented on [#214](https://github.com/MSBart2/FanHub/pull/214) asking `@copilot` to fix the Joey test and report exact counts. The follow-up session started `test-writer` again, and this time Jest ran in the cloud: **1 suite passed, 6 tests passed**. Copilot's built-in code review subagent reran the file with the same result. The fix ([bf7e2c3](https://github.com/MSBart2/FanHub/commit/bf7e2c3)) asserts on the `.attribution` element, and the local rerun matched: 6 of 6. The agent merged `main` into its branch to avoid a force-push and reported the counts in its reply comment; the pull request description kept its original text, so the comment thread is where the evidence lives.

**This is the memorable moment:** all three runtimes recognized and invoked the same custom agent, and the cloud run still needed something the file cannot carry. A setup workflow outside the agent profile turned "could not run" into "6 passed." An agent profile describes a role; the runtime supplies the environment.

<!-- 🎬 MAJOR SECTION: Prove the Run and Place Each Requirement -->
## 3. Prove the Run and Place Each Requirement

### A load report for every runtime

The table at the top of this talk is the practice. For each runtime the team uses, record what the agent actually received:

| Question | VS Code | Copilot CLI | Cloud agent |
|---|---|---|---|
| Which agent ran? | Agent picker; Agent Debug Log "Load Agents" event | `/agent` list; `agent_name` in the debug log | "Custom agent used" in the PR description |
| Which model ran? | Chat Debug view or prompt export, per request | `Using model … from custom agent` log line | Session log, when shown |
| Which tools resolved? | Tool list sent with each request | `tool_names` in the debug log | Session log tool calls |
| Did the agent's own checks run? | Terminal output in chat | Session output | Session log commands and exit codes |
| What did the agent report? | Final summary | Final summary | Agent summary in the log, compared with the PR description |

How to open each source:

- **VS Code:** `Developer: Show Chat Debug View` shows the exact system prompt and tool definitions per request; the Agent Debug Log (preview) adds a chronological view, including which agents and instructions loaded.
- **Copilot CLI:** run with `--log-level debug --log-dir <dir>`, and use `--share <path>` to keep a transcript.
- **Cloud agent:** `gh agent-task view <session> --log` prints the session log; the PR description names the agent.

### Place each requirement in the layer that owns it

The closing practice is a loop: **load, compare, place, rerun.** Read the resolved run, compare it with the profile, place each missing behavior in the layer that owns it, and rerun the same proof.

| Gap in the load report | Owning layer | Recovery | Who owns it |
|---|---|---|---|
| A field the runtime skips (`handoffs`, `argument-hint`) | Agent body | Restate the behavior in the body ("when finished, recommend running test-reviewer") so every runtime carries it | Agent producer |
| Declared and executed model differ | Launch controls | Treat `model` as a preference; pin the model where the run starts (VS Code picker, `--model`) when it matters | Developer starting the run |
| A tool alias the runtime maps away (`web` in the cloud) | Agent body or `target` | Build the method on capabilities every supported runtime provides, or scope the agent with `target` | Agent producer |
| The environment lacks dependencies | Runtime environment | Prepare it outside the profile: `copilot-setup-steps.yml` for the cloud agent, a dev container or setup script locally | Repository maintainer |
| A summary or PR description leaves out a result | Output contract and review | Keep the output contract in the body; accept work on command evidence alongside generated prose | Reviewer accepting the PR |
| Teammates disagree about acceptable variance | Team policy | Agree which runtimes the agent supports and which differences need escalation | Team lead |
### Compose agents with explicit boundaries

`test-writer` hands off to `test-reviewer`, which can only read. That pairing is the smallest useful composition: a producer with a narrow write boundary and a checker with none. Two mechanisms connect agents:

- **Handoffs** (VS Code Local) put a person between steps: a button with a prefilled prompt, sent when the person chooses.
- **Subagents** let one agent call another. In VS Code, the `agents` field plus the `agent` tool limits which agents a coordinator may call. In the CLI, the main agent delegates by description, and subagents skip repository instructions unless the profile sets `include-custom-instructions: true`. The cloud agent ran `test-writer` itself as a subagent.

A custom agent shapes what the agent attempts. Authority over what it may change stays with the systems around it: rulesets and branch protection on GitHub, hooks and permission flags locally, and the firewall in the cloud.

### Where it stops fitting

- **A full local SDLC loop** of plan, implement, review, and stop conditions, with an orchestrator calling several agents in worktrees, is the subject of [Local Agentic SDLC](../local-agentic-sdlc/README.md).
- **Event-triggered judgment** that runs on a schedule or a label, with safe outputs, belongs to [GitHub Agentic Workflows](../agentic-lifecycle/README.md).
- **The pull request decision** across cloud agent, code review, and Code Quality is in [Copilot on GitHub](../copilot-on-github/README.md).

### What you can do today

1. Pick one agent your team already shares and check its frontmatter fields against the support table above.
2. Run it once in each runtime the team uses, with the debug sources on, and fill in the load report.
3. Move one behavior that lives only in a runtime-specific field into the body, and run again.
4. For cloud use, add or check `copilot-setup-steps.yml` so the agent's own verification commands can run.

### Apply it to your work

Which of your agents would behave differently tomorrow if a teammate started it from a different runtime, and which line of its load report would show that first?

## Related Talks

- [Copilot Primitives](../copilot-primitives/README.md): where custom agents sit among instructions, prompts, skills, and hooks
- [Copilot on GitHub](../copilot-on-github/README.md): the cloud agent, code review, and Code Quality on one pull request
- [GitHub Agentic Workflows](../agentic-lifecycle/README.md): event-triggered agents with safe outputs
- [Copilot Hooks](../copilot-hooks/README.md): enforcing boundaries a profile can only request

## References

- [Custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [About custom agents](https://docs.github.com/en/copilot/concepts/customizations/custom-agents)
- [Comparing GitHub Copilot customizations](https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations)
- [Create custom agents for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/create-custom-agents-for-cli)
- [Create custom agents for Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents)
- [Customize the cloud agent environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment)
- [VS Code: custom agents](https://code.visualstudio.com/docs/agent-customization/custom-agents)
- [VS Code: custom agent file reference](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference)
- [VS Code: Chat Debug view](https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view)
- FanHub evidence: [test-writer.agent.md](https://github.com/MSBart2/FanHub/blob/main/.github/agents/test-writer.agent.md), [#216](https://github.com/MSBart2/FanHub/pull/216), [#215](https://github.com/MSBart2/FanHub/pull/215), [#214](https://github.com/MSBart2/FanHub/pull/214)
