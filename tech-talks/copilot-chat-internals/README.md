---
status: active
updated: 2026-11-06
section: "Agents at Your Keyboard"
audience: [developer, team-lead, platform-engineer]
level: applied
duration: 55
format: clinic
decision: "How do I inspect the context Copilot used and diagnose unexpected behavior?"
prerequisites: [copilot-primitives]
related: [copilot-memory, copilot-hooks]
references:
  - url: https://code.visualstudio.com/docs/agents/agent-troubleshooting/chat-debug-view
    label: "Debug chat interactions (Chat Debug view and Agent Debug Logs)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting
    label: "Troubleshoot agents (/troubleshoot and customization diagnostics)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/agent-troubleshooting/cache-explorer
    label: "Cache Explorer"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agent-customization/overview
    label: "Agent customization overview (Agent Customizations editor)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/concepts/context
    label: "Context in agent sessions (compaction)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/run/subagents
    label: "Subagents"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/run/agents-window
    label: "Use the Agents window"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agent-customization/hooks
    label: "Hooks"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/run/manage-mcp-servers
    label: "Manage MCP servers (troubleshooting)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/docs/agents/guides/monitoring-agents
    label: "Monitor agents with OpenTelemetry"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/updates/v1_110
    label: "VS Code release notes: v1.110 (Agent Debug panel, context compaction)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/updates/v1_112
    label: "VS Code release notes: v1.112 (JSONL debug logs, export and import, /troubleshoot)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/updates/v1_116
    label: "VS Code release notes: v1.116 (Agent Debug Logs rename, persistent file logging)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/updates/v1_119
    label: "VS Code release notes: v1.119 (OpenTelemetry tracing for agent sessions)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/updates/v1_128
    label: "VS Code release notes: v1.128 (managed OpenTelemetry export)"
    verified: 2026-11-06
  - url: https://code.visualstudio.com/updates/v1_145
    label: "VS Code release notes: v1.145 (agent verbosity)"
    verified: 2026-11-06
---

# Copilot Chat Internals: Read the Evidence Every Agent Run Leaves

> **The Question This Talk Answers:**
> *"Why didn't the agent do what I expected, and how do I find out?"*

**Duration:** 55 minutes: about 51 minutes estimated talk and about 4 minutes for questions | **Audience:** Developers, team leads, and platform engineers who run agents in VS Code and need to explain a surprising result

**Thesis:** Every agent run leaves evidence: what loaded, what the model received, what the agent did, and a trail you can keep. Read it in that order and a surprise becomes a located fault.

## Present and Study

- **[Open the deck](../../slides/tech-talks/copilot-chat-internals/index.html)**: 38 slides that follow one ignored team rule through four questions. Press `N` to open the speaker notes beside it.
- **[Speaker notes](../../slides/tech-talks/copilot-chat-internals/notes.html)**: the talk track, facts for questions, demo cues, first-party sources, and a time budget for every slide. The notes are the reference for this talk; they print as a handout.

The deck and notes live in [`slides/tech-talks/copilot-chat-internals/slides.js`](../../slides/tech-talks/copilot-chat-internals/slides.js). Edit talk content there; this page stays a short landing page. Facts cover VS Code 1.110 through 1.145.

## 1. Did My Setup Load?

The Agent Customizations editor (**Chat: Open Customizations**) lists every instruction, prompt, agent, skill, hook, MCP server, and plugin with its source and errors. Discovery events in Agent Debug Logs say loaded, skipped, or rejected, with the reason; the worked example is an `applyTo` glob that misses the edited file.

## 2. What Did the Model Receive?

**Developer: Show Chat Debug View** shows the system prompt, user prompt, context, response, and tool responses for each model request; search the system prompt for your rule text. The context indicator, compaction (`/compact`, a new chat in the session, subagents), output compression, and Cache Explorer explain what fit in the window and what was reused.

## 3. What Did the Agent Do?

**Developer: Open Agent Debug Logs** (Preview) has Logs, Summary, the agent flow chart, and Cache Explorer. `/troubleshoot` reads the same events and explains the run; confirm its answer in the Logs view before acting on it. MCP server output and hook events locate failures outside the model.

## 4. Keep the Trail

File logging writes JSONL that persists across sessions, export produces OTLP JSON a teammate can import, and OpenTelemetry sends `invoke_agent`, `chat`, `execute_tool`, and `execute_hook` spans to a collector. Admins can set the endpoint in managed settings, so the organization decides where traces go.

## What You Can Do Today

### Today

- **Try:** On your next surprising run, open **Developer: Open Agent Debug Logs** and ask `/troubleshoot Which customizations were loaded, and did any fail?`
- **Expected signal:** An answer that names specific files as loaded, skipped, or rejected.
- **Validate:** Find the matching Discovery event in the Logs view.

### This Week

- **Build:** Turn on `github.copilot.chat.agentDebugLog.fileLogging.enabled` and check the Discovery status of every team instruction file.
- **Expected signal:** Each team rule shows as loaded on the files it targets, and its text appears in the Chat Debug view's system prompt.
- **Validate:** Reopen a past run with `/troubleshoot #session`.

### This Month

- **Pilot:** Send OpenTelemetry spans from a few volunteers to a team collector.
- **Success measure:** A teammate can locate the failing step of a run they did not watch, from the trace alone (a target until measured).
- **Boundary:** Agree with your admin where traces go and who can read them before enabling export; traces carry prompts and code context.

### Apply It to Your Work

- **Candidate task:** The last time an agent ignored a team rule or skipped a tool in your repository.
- **Decisive context:** The instruction files, their `applyTo` patterns, and the files the agent edited.
- **Delegation and authority:** `/troubleshoot` proposes an explanation; you confirm it in the events; the rule's owner approves any change to its scope.
- **Evidence:** The Discovery event and the system prompt before and after the fix.

## Related Patterns

- **[Copilot Primitives](../copilot-primitives/README.md)**: the instructions, agents, skills, and hooks whose loading this talk inspects.
- **[Copilot Hooks](../copilot-hooks/README.md)**: hook design; this talk shows how to read hook outcomes in logs and traces.
- **[Copilot Memory](../copilot-memory/README.md)**: what persists across sessions, alongside the logs that persist here.

## References

First-party sources for every claim are listed per slide in the [speaker notes](../../slides/tech-talks/copilot-chat-internals/notes.html) and in the `references` frontmatter above.