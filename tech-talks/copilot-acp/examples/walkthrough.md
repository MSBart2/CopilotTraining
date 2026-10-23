# Demo: GitHub Copilot ACP — Multi-Repo Agent Orchestration

**Source talk:** [GitHub Copilot ACP: Your Tool Just Got an AI Agent](../README.md)
**Core question:** I build tools outside VS Code — how do I give them Copilot's full agent capabilities without months of custom integration?
**Demo repo:** [github.com/MSBart2/cli-acp](https://github.com/MSBart2/cli-acp) — a working ACP orchestrator web app
**Worker repos:** FanHub's four language tracks — Node.js, .NET, Java, Go

---

## What You're Working With

`cli-acp` is a web interface that runs one `copilot --acp --stdio` process per repository and connects them through the Agent Client Protocol. An **orchestrator** agent coordinates work across multiple **worker** agents. You broadcast prompts to all workers simultaneously; the orchestrator synthesizes the results.

FanHub's four language tracks (all with the same bugs across different stacks) are perfect worker repos — you can ask the same question across all four and compare answers.

---

## Prerequisites

- Copilot CLI installed and authenticated (`copilot` command on PATH)
- Node.js 18+
- Git

---

## Exercise 1: Start the Orchestrator and Launch Workers

Clone and start `cli-acp`:

```bash
git clone https://github.com/MSBart2/cli-acp
cd cli-acp/webapp
npm run install:all
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Launch an orchestrator:**
Enter a coordination repo URL — your fork of `github.com/MSBart2/FanHub` works, or any repo you own. Click **Launch Orchestrator**. Wait for the card to show **Ready**.

**Add workers:**
Click **Add Worker** and enter the URL for each FanHub language track. Start with two:
- `github.com/MSBart2/FanHub` (Node.js track will be cloned)
- A second fork or branch if you have one, or any second repo

Wait until both worker cards show **Ready**. Under the hood, each card has spawned a `copilot --acp --stdio` process and created an isolated ACP session scoped to that repo's working directory.

**What to notice:** Each agent has its own context window, scoped to its own repo. They don't share context with each other — only the orchestrator receives their synthesized outputs. This is the architecture: N independent agents, one coordinator.

---

## Exercise 2: First Broadcast — Ask the Same Question Everywhere

With the orchestrator and workers running, send a broadcast prompt. This is the core operator loop: one prompt goes to every worker simultaneously.

In the broadcast input, type:

```
Summarize this repository for a new engineer.

Return:
1. One-sentence purpose
2. Main technologies
3. How to run it locally
4. The biggest unknown or risk you found
```

In the **Orchestrator Focus** field, add:

```
Combine the worker summaries into a comparison table. Call out shared setup gaps,
major differences in stack, and the top 3 follow-up questions a new engineer
wants answered next.
```

Click **Broadcast**.

Watch:
- Each worker card streams its own answer in real time
- The **Broadcast Results** panel fills with coalesced output from all workers
- After workers complete, the orchestrator synthesizes everything into the comparison table you requested

**What to notice:** The broadcast prompt tells workers what to do in their repos. Orchestrator Focus tells the coordinator what to do with the combined results. These are two separate instructions in one wave — keep them distinct.

---

## Exercise 3: Targeted Follow-Up to One Worker

After synthesis, pick one worker card and send a direct prompt — not a broadcast. This is how you drill into a specific repo without re-running everything:

In the worker card for the Node.js track, click the targeted prompt field and send:

```
The duplicate Jesse Pinkman bug — trace exactly where it originates.
Is it in the seed data, the API response, or a display-layer issue?
Show me the specific file and line.
```

Only that one agent responds. The other workers and the orchestrator are unaffected.

**What to notice:** Broadcast = same job everywhere. Target = specific follow-up to one repo. Learning to switch between these is the core operator skill the tool is designed to build.

---

## Exercise 4: Dependency-Aware Context with `acp-manifest.json`

When repos have relationships — one depends on another's API contract — you can declare that in an `acp-manifest.json` and the orchestrator will inject cross-repo context into worker prompts automatically.

Create an `acp-manifest.json` in your FanHub Node.js fork:

```json
{
  "name": "fanhub-node",
  "description": "FanHub Node.js backend — Express API + PostgreSQL",
  "dependsOn": []
}
```

And in a hypothetical FanHub frontend repo:

```json
{
  "name": "fanhub-web",
  "description": "FanHub React frontend",
  "dependsOn": ["fanhub-node"]
}
```

With both repos loaded as workers and the manifests present, broadcast a change prompt:

```
The characters API response shape is changing — the `name` field will be split
into `firstName` and `lastName`. Assess the impact on this repo.
```

The `fanhub-node` worker assesses the API change. The `fanhub-web` worker receives the same prompt plus injected context about its `dependsOn` relationship — so it also evaluates how the frontend needs to change.

**What to notice:** Without manifests, you'd have to manually re-explain the dependency in every prompt. With `acp-manifest.json`, the orchestrator injects it automatically into downstream prompts. The graph does the routing.

---

## Exercise 5: Save and Resume a Session

Multi-repo operations often span more than one sitting. Save the current session so you can restore it later without re-cloning repos or re-launching agents.

In the header bar, click **Sessions** → **Save as…** → give it a name like `fanhub-audit`.

Close the browser tab.

Later, reopen [http://localhost:5173](http://localhost:5173) and click **Sessions**. Find `fanhub-audit` in the list. Two options:

| Option | What it does |
|--------|-------------|
| **▶ Restore** | Restores agent cards, work items, and broadcast history as display state. Agents appear as **Stopped** — no new `copilot` processes are launched. Use this to review what happened. |
| **⟳ Re-spawn** | Restores display state AND re-launches a `copilot --acp --stdio` process for each saved agent. Use this when you want to continue the work with live agents. |

Re-spawn the session. Send a follow-up broadcast:

```
Based on the prior analysis, which of the known bugs in BUGS.md has the highest
risk if left unaddressed? One sentence per repo.
```

**What to notice:** The session saves agent roster, work items, broadcast history, and settings — but not the live process state. Restore shows you what happened; Re-spawn continues the work. The distinction is operationally important for long-running cross-repo campaigns.

---

## Key Takeaways

| Concept | Detail |
|---------|--------|
| Under the hood | One `copilot --acp --stdio` process per repo; isolated ACP sessions |
| Broadcast | Same prompt to all workers simultaneously; orchestrator synthesizes |
| Orchestrator Focus | Separate from broadcast — tells the coordinator what to do with results |
| Targeted prompt | Direct to one worker card; other agents unaffected |
| Dependency context | `acp-manifest.json` with `dependsOn`/`dependedBy`; orchestrator injects cross-repo context automatically |
| Session persistence | Save → Restore (review) or Re-spawn (continue live work) |

**The through-line:** ACP is the protocol that makes "one agent per repo, coordinated across all of them" possible. `cli-acp` makes that concrete — and the five scenarios in its docs are the full operator playbook.

## References

- [MSBart2/cli-acp — ACP Agent Orchestrator](https://github.com/MSBart2/cli-acp)
- [Scenario docs index](https://github.com/MSBart2/cli-acp/blob/main/SCENARIO.md)
- [Copilot CLI ACP Server reference](https://docs.github.com/en/copilot/reference/acp-server)
- [ACP protocol specification](https://agentclientprotocol.com/protocol/overview)
- [ACP support in Copilot CLI — public preview announcement](https://github.blog/changelog/2026-01-28-acp-support-in-copilot-cli-is-now-in-public-preview/)
