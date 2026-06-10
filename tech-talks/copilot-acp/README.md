---
status: active
updated: 2025-07-25
section: "Agentic Systems"
references:
  - url: https://docs.github.com/en/copilot/reference/acp-server
    label: "Copilot CLI ACP Server reference"
    verified: 2026-02-11
  - url: https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started
    label: "Getting started with Copilot CLI"
    verified: 2026-02-11
  - url: https://agentclientprotocol.com/protocol/overview
    label: "ACP protocol specification overview"
    verified: 2026-02-11
  - url: https://github.com/agentclientprotocol/agent-client-protocol
    label: "ACP spec repository and SDKs"
    verified: 2026-02-11
  - url: https://agentclientprotocol.com/get-started/architecture
    label: "ACP four-layer architecture"
    verified: 2026-02-11
  - url: https://github.blog/changelog/2026-01-28-acp-support-in-copilot-cli-is-now-in-public-preview/
    label: "ACP support in Copilot CLI public preview announcement"
    verified: 2026-02-11
  - url: https://github.blog/ai-and-ml/github-copilot/power-agentic-workflows-in-your-terminal-with-github-copilot-cli/
    label: "Power agentic workflows in your terminal"
    verified: 2026-02-11
---

# GitHub Copilot ACP: Your Tool Just Got an AI Agent

> **The Question This Talk Answers:**
> *"I build tools outside VS Code — how do I give them Copilot's full agent capabilities without months of custom integration?"*

**Duration:** 45 minutes | **Target Audience:** Developers / Platform Engineers / Tool Builders

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Three concrete builder stories (editor, pipeline, orchestrator) show ACP solving real integration problems today |
| **Compelling** | 🟢 High | Each section advances — from "connect in 2 weeks" to "ship safely" to "coordinate many agents" |
| **Actionable** | 🟢 High | One flag starts the server (`--acp`), 14 lines connect a client, three permission strategies cover production |

**Overall Status:** 🟢 Ready to use

---


## Use ACP If…

Before we go further — here's the quick decision:

| Your situation | Use ACP? | Alternative |
|---------------|----------|-------------|
| Building or using a **non-VS Code editor** that wants Copilot agent features | ✅ Yes | — |
| Building **CI/CD or automation** that needs multi-turn agent conversations | ✅ Yes | `copilot -p` for single-shot commands |
| Coordinating **multiple AI agents** across repositories | ✅ Yes | — |
| Already using **VS Code + Copilot** and happy | ❌ No | Built-in integration is simpler |
| Building **tools that agents can use** | ❌ No | Use MCP instead (see [MCP Apps](../mcp-apps/)) |

> **This is overkill if:** You just want Copilot in VS Code. The built-in extension already uses ACP under the hood — you don't need to touch the protocol yourself.

---

<!-- 🎬 MAJOR SECTION: Meet a Zed Developer -->
## Builder 1: A Zed Developer Gets Full Copilot Agent Access

*From "locked out" to "full agent experience" in 2 weeks*

### The Painful Moment

A developer using Zed wants Copilot's agent experience — streaming code generation, tool use, multi-turn context. Before ACP, this meant reverse-engineering VS Code's extension protocol and maintaining custom glue code that breaks with every Copilot update. Estimated cost: 3+ months, with ongoing maintenance. [^6]

### The Unlock

One command turns Copilot CLI into a protocol server any editor can connect to:

```bash
copilot --acp --stdio
```

That's it. Zed implements an ACP client, connects to this process, and gets the full agent experience — streaming responses, permission requests, session context — through a standard protocol. [^1] [^6]

### How the Connection Works

```typescript
import * as acp from "@agentclientprotocol/sdk";
import { spawn } from "node:child_process";
import { Readable, Writable } from "node:stream";

async function main() {
  // Start Copilot CLI as ACP server
  const copilot = spawn("copilot", ["--acp", "--stdio"], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  // Create NDJSON stream over stdio
  const stream = acp.ndJsonStream(
    Writable.toWeb(copilot.stdin!) as WritableStream<Uint8Array>,
    Readable.toWeb(copilot.stdout!) as ReadableStream<Uint8Array>
  );

  // Define what the client handles
  const client: acp.Client = {
    async requestPermission(params) {
      return { outcome: { outcome: "cancelled" } }; // More on this in Builder 2
    },
    async sessionUpdate(params) {
      const update = params.update;
      if (update.sessionUpdate === "agent_message_chunk"
          && update.content.type === "text") {
        process.stdout.write(update.content.text);
      }
    },
  };

  // Connect, create session, send prompt
  const connection = new acp.ClientSideConnection((_agent) => client, stream);
  await connection.initialize({
    protocolVersion: acp.PROTOCOL_VERSION,
    clientCapabilities: {},
  });

  const session = await connection.newSession({
    cwd: process.cwd(),
    mcpServers: [],
  });

  await connection.prompt({
    sessionId: session.sessionId,
    prompt: [{ type: "text", text: "Explain the purpose of this project" }],
  });

  copilot.stdin!.end();
  copilot.kill("SIGTERM");
}

main().catch(console.error);
```

14 lines of SDK code to connect. Streaming response chunks arrive in real-time. The full agent experience, in any editor. [^1] [^5]

### What the Protocol Gives You

The connection above uses JSON-RPC 2.0 over stdio — the same transport pattern as LSP. The client and agent negotiate capabilities, create stateful sessions, stream responses, and mediate permissions. The protocol handles: [^4]

- **Capability negotiation** — client and agent agree on what each supports
- **Stateful sessions** — conversation context persists across prompts
- **Bidirectional streaming** — responses arrive chunk by chunk; the agent can ask permission mid-response
- **Multiple concurrent sessions** — one connection, many workspaces

### The Result

Zed shipped full Copilot agent support in 2 weeks instead of 3+ months. No maintenance burden when Copilot updates — the protocol is versioned and stable. [^6]

**Official Documentation:**
- 📖 [Copilot CLI ACP Server Reference](https://docs.github.com/en/copilot/reference/acp-server) — Server modes, integration examples [^1]
- 📖 [ACP Protocol Overview](https://agentclientprotocol.com/protocol/overview) — Full specification [^4]
- 📖 [Zed ACP Agent: GitHub Copilot](https://zed.dev/acp/agent/github-copilot) — Zed's implementation [^6]

---

<!-- 🎬 MAJOR SECTION: Meet a Platform Engineer -->
## Builder 2: A Platform Engineer Ships ACP Safely

*From "can I trust this?" to "policy-enforced deployment" in three permission strategies*

### The Painful Moment

A platform engineer hears about ACP and immediately asks: "Can I ship this? What can the agent do to our systems? Who approves what?" The agent experience is compelling — but without a permission model, it's a non-starter for production.

### The Contract

Every action an ACP agent takes flows through the client's `requestPermission` callback. The agent **proposes**, the client **mediates**, the user or policy **decides**. Agents never bypass this — it's architecturally enforced, not optional. [^1]

```
Agent: "I need to run `npm test` to verify changes"
  ↓
Client: Applies permission policy
  ↓
Policy: Approved (testing is safe) / Denied (destructive op blocked)
  ↓
Agent: Proceeds or adapts approach
```

### Three Permission Strategies

**Strategy 1: Interactive approval** — Human reviews each request (editor sessions):
```typescript
async requestPermission(params) {
  console.log(`Agent wants to: ${params.tool}`);
  const approved = await promptUser(`Allow ${params.tool}?`);
  return { outcome: { outcome: approved ? "approved" : "cancelled" } };
}
```

**Strategy 2: Policy-based** — Automated rules for CI/CD (the "whoa" moment — three lines):
```typescript
const SAFE_TOOLS = ["read_file", "list_directory", "search_code"];
const BLOCKED_TOOLS = ["delete_file", "execute_command"];

async requestPermission(params) {
  if (SAFE_TOOLS.includes(params.tool)) return { outcome: { outcome: "approved" } };
  if (BLOCKED_TOOLS.includes(params.tool)) return { outcome: { outcome: "cancelled" } };
  return await promptUser(params);  // Ask for everything else
}
```

**Strategy 3: Tiered by environment** — Different policies per deployment context:

| Context | Read ops | Write ops | Execute ops |
|---------|----------|-----------|-------------|
| Developer editor | Auto-approve | Prompt user | Prompt user |
| CI/CD pipeline | Auto-approve | Auto-approve (scoped) | Block all |
| Production review | Auto-approve | Block all | Block all |

### Enterprise Security Table

| Concern | How ACP Addresses It |
|---------|---------------------|
| **Unauthorized file access** | Permission callback gates every file operation |
| **Arbitrary command execution** | Shell commands require explicit approval per policy |
| **Data exfiltration** | Network operations mediated through client |
| **Scope creep** | Session-scoped permissions; new session resets all |
| **Audit trail** | Client logs all permission requests and outcomes |

### The Result

The platform engineer can define exactly what the agent is allowed to do per environment. Sessions are isolated (permissions don't leak between workspaces). Every action is auditable. The agent is powerful *because* it's constrained — not despite it. [^1]

> **Key insight:** Permissions aren't a limitation on ACP — they're the adoption enabler. Without this model, no enterprise ships AI agents to production.

---

<!-- 🎬 MAJOR SECTION: Meet a Multi-Agent Orchestrator -->
## Builder 3: A Multi-Agent Orchestrator Coordinates Across Repos

*From "one agent, one repo" to "many agents, coordinated work" — proof ACP composes*

### The Painful Moment

A team manages 4 repositories (`api-gateway`, `billing-service`, `web-dashboard`, `infra-config`). They want to audit documentation across all of them — but a single Copilot session only sees one repo at a time. Running 4 separate sessions produces 4 disconnected results with no synthesis.

### The Integration

The [**ACP Agent Orchestrator**](https://github.com/MSBart2/cli-acp) spawns one `copilot --acp --stdio` process per repository. An orchestrator agent sits above them, broadcasts prompts to all workers, and synthesizes cross-repo results. [^12]

![Multiple agents working simultaneously across repositories](images/acp-orchestrator-agents.png)

**The architecture is simple because ACP sessions compose:**

```typescript
// Launch one ACP agent per repo
const workers = repos.map(repo => ({
  process: spawn("copilot", ["--acp", "--stdio"]),
  session: null,
  repo,
}));

// Each worker gets its own ACP session
for (const worker of workers) {
  const connection = new acp.ClientSideConnection((_) => client, stream);
  await connection.initialize({ protocolVersion: acp.PROTOCOL_VERSION, clientCapabilities: {} });
  worker.session = await connection.newSession({
    cwd: worker.repo.path,
    mcpServers: [filesystemServer(worker.repo.path)],
  });
}

// Broadcast a prompt to all workers simultaneously
const results = await Promise.all(workers.map(w =>
  w.connection.prompt({
    sessionId: w.session.sessionId,
    prompt: [{ type: "text", text: "Audit README completeness and accuracy" }],
  })
));

// Synthesize results through the orchestrator
await orchestrator.prompt({
  sessionId: orchestratorSession.sessionId,
  prompt: [{ type: "text", text: `Synthesize findings:\n${results.map(formatResult).join("\n")}` }],
});
```

### What the Orchestrator Does

1. **Broadcasts** audit prompts to all worker agents
2. **Coalesces** worker outputs automatically
3. **Synthesizes** cross-repo findings via the orchestrator agent
4. **Creates issues** in each repo with coordinated tracking
5. **Generates PRs** for documentation updates across all repos

![Coalesced broadcast results panel showing cross-repo synthesis](images/acp-orchestrator-results.png)

### Why This Matters

This pattern works because ACP is just a protocol — not a product tied to one editor or one session model. Each worker is a standard ACP connection. The orchestrator is a standard ACP client that happens to manage many connections. Permissions flow through each worker's callback independently. No special "multi-agent mode" is needed. [^12]

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express + Socket.IO |
| Frontend | React + Vite + Tailwind CSS |
| ACP Integration | `@agentclientprotocol/sdk` |

**Try it yourself:**
```bash
git clone https://github.com/MSBart2/cli-acp.git
cd cli-acp/webapp
npm run install:all
npm run dev
# Open http://localhost:5173
```

---

## 🎯 Mental Model Shift

> **The Core Insight:** ACP isn't a protocol to learn — it's a superpower your tool gains. One flag, one connection, full agent capabilities.

### The Three-Builder Progression

| Builder | Question | ACP Answer |
|---------|----------|-----------|
| **Editor developer** | "How do I give my users Copilot?" | Implement ACP client → connect to `copilot --acp --stdio` |
| **Platform engineer** | "How do I trust an agent in production?" | Permission callbacks enforce policy per environment |
| **Orchestrator builder** | "How do I coordinate many agents?" | Each agent is a standard ACP session; compose freely |

### Move Toward

- ✅ **Show, then explain** — Start the server, see the response, then understand the protocol
- ✅ **Permission-first design** — Define what the agent CAN'T do before what it can
- ✅ **Session composition** — Multiple ACP connections as building blocks for complex systems
- ✅ **Protocol over plugin** — One standard interface instead of N editor-specific integrations [^3]

### Move Away From

- ⚠️ **Editor lock-in** — Requiring VS Code for full Copilot agent features [^6]
- ⚠️ **Auto-approve everything** — Defeats the security model that enables enterprise adoption [^1]
- ⚠️ **Single-session thinking** — ACP sessions compose; don't limit yourself to one agent, one repo

---

## ACP vs. Alternatives

*"Wait — another protocol?"*

| Option | When to Use | Trade-off |
|--------|-------------|-----------|
| **ACP** | Editor ↔ Agent communication; multi-turn, stateful, permission-mediated | Requires implementing ACP client |
| **MCP** | Agent ↔ Tool integration (filesystem, APIs, databases) | Complementary to ACP, not a replacement [^11] |
| **Copilot Extensions** | Extend Copilot within VS Code/GitHub | Locked to GitHub's platforms |
| **`copilot -p`** | Simple single-shot CLI commands | No sessions, no streaming, no permissions |
| **Direct API** | Full control over model interaction | No agent capabilities, no tool use |

**ACP + MCP together:** ACP defines how your editor talks to the agent. MCP defines how the agent accesses tools. You configure MCP servers *through* ACP sessions. They're complementary layers. [^4] [^11]

---

## ✅ What You Can Do Today

**Immediate Actions (15 minutes):**
- [ ] Verify Copilot CLI is installed: `copilot --version` [^2]
- [ ] Start an ACP server: `copilot --acp --stdio` and confirm it launches [^1]
- [ ] Read the [official ACP server docs](https://docs.github.com/en/copilot/reference/acp-server) [^1]

**Short-Term Implementation (1 hour):**
- [ ] Install TypeScript SDK: `npm install @agentclientprotocol/sdk` [^5]
- [ ] Run the [basic client example](examples/basic-client.ts) against Copilot ACP
- [ ] Implement a policy-based `requestPermission` for your environment
- [ ] Try the [multi-turn example](examples/multi-turn.ts) to see session context in action

**Advanced Exploration (2-4 hours):**
- [ ] Clone and run the [ACP Agent Orchestrator](https://github.com/MSBart2/cli-acp) to see multi-agent coordination
- [ ] Build an ACP client for your team's preferred editor or tool
- [ ] Implement tiered permission policies (dev vs CI/CD vs production)
- [ ] Integrate MCP servers through ACP sessions for extended tool access

---

## Related Patterns

- **[Copilot CLI](../copilot-cli/)** — Terminal-native AI; ACP is the protocol that makes CLI capabilities available to other editors [^2]
- **[MCP Apps](../mcp-apps/)** — Build tools that agents access through MCP; ACP sessions configure MCP servers [^11]
- **[Copilot SDK](../copilot-sdk/)** — Lower-level API for Copilot-powered applications; ACP provides higher-level protocol abstraction

See [DECISION-GUIDE.md](../DECISION-GUIDE.md) for complete navigation help.

---

## 📖 References

### Official Documentation

[^1]: **[Copilot CLI ACP Server — GitHub Docs](https://docs.github.com/en/copilot/reference/acp-server)** — Server modes, integration examples, TypeScript client code
[^2]: **[Getting Started with Copilot CLI — GitHub Docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-getting-started)** — Installation, authentication, and first steps

### Protocol Specification

[^3]: **[Agent Client Protocol (ACP) Explained — Code Standup](https://codestandup.com/posts/2025/agent-client-protocol-acp-explained/)** — Comprehensive explainer comparing ACP to LSP
[^4]: **[ACP Protocol Overview — agentclientprotocol.com](https://agentclientprotocol.com/protocol/overview)** — Full specification with message types and session lifecycle
[^5]: **[ACP Spec Repository — GitHub](https://github.com/agentclientprotocol/agent-client-protocol)** — Protocol schema, SDKs, and community libraries (2K+ stars, Apache 2.0)

### Integrations & Ecosystem

[^6]: **[Zed ACP Agent: GitHub Copilot — Zed](https://zed.dev/acp/agent/github-copilot)** — Zed's native Copilot integration via ACP
[^7]: **[ACP Architecture — agentclientprotocol.com](https://agentclientprotocol.com/get-started/architecture)** — Four-layer architecture design and principles
[^8]: **[ACP Python SDK — PyPI](https://pypi.org/project/agent-client-protocol/)** — Python client/agent library
[^9]: **[ACP Rust SDK — crates.io](https://crates.io/crates/agent-client-protocol)** — Rust client/agent library
[^10]: **[ACP Kotlin SDK — GitHub](https://github.com/agentclientprotocol/kotlin-sdk)** — JVM client library with samples

### Blog Posts & Announcements

[^11]: **[ACP Support in Copilot CLI — Public Preview — GitHub Blog](https://github.blog/changelog/2026-01-28-acp-support-in-copilot-cli-is-now-in-public-preview/)** — Launch announcement and motivation
[^12]: **[Power Agentic Workflows in Your Terminal — GitHub Blog](https://github.blog/ai-and-ml/github-copilot/power-agentic-workflows-in-your-terminal-with-github-copilot-cli/)** — Copilot CLI agentic workflow patterns

### Community & Analysis

[^13]: **[ACP Protocol Specification — DeepWiki](https://deepwiki.com/zed-industries/agent-client-protocol/2-protocol-specification)** — Community deep-dive on protocol internals
[^14]: **[Agent Client Protocol: The LSP for AI Agents — PromptLayer Blog](https://blog.promptlayer.com/agent-client-protocol-the-lsp-for-ai-coding-agents/)** — Industry analysis of ACP's significance
[^15]: **[ACP in Kiro CLI — Kiro Docs](https://kiro.dev/docs/cli/acp/)** — Additional ACP agent implementation reference
