# Tech Talks Decision Guide

**Not sure which talk to start with?** Find the right content for your role and goals.

---

## 🪜 Choose by Adoption Phase

Use the [Copilot Adoption and Maturity Roadmap](surfaces/README.md#4-build-adoption-maturity) when prescribing a sequence rather than selecting one talk. It maps four 28-day engagement signals — passive, code-first, agent-first, and multi-agent — to core training paths, role-specific branches, and observable exit evidence.

The machine-readable curriculum is in [adoption-roadmap.yml](surfaces/adoption-roadmap.yml). Engagement identifies a likely starting point; demonstrated outcomes determine advancement.

---

## 🧱 The Foundation: Chat + Primitives

Every Copilot journey starts with two essentials:

| Step | Talk | Why it matters |
|------|------|----------------|
| **1. Learn to talk to Copilot** | [Copilot Chat](copilot-chat/) | Master context mechanisms — #file, @workspace, #codebase |
| **2. Teach Copilot your codebase** | [Copilot Primitives](copilot-primitives/) | The 4 configuration primitives (instructions, prompts, skills, agents) that transform Copilot from a generic assistant into a team-specific development partner |

> 💡 **Everything else builds on these two.** Chat teaches you how to collaborate with Copilot. Primitives teaches you how to configure Copilot to work the way your team needs. Start here regardless of role.

---

## 🚀 Quick Start (After the Foundation)

| I want to... | Go to |
|--------------|-------|
| Understand how Copilot works under the hood | [Copilot Chat Internals](copilot-chat-internals/) — debug view, system prompts |
| Use Copilot in the terminal | [Copilot CLI](copilot-cli/) — natural language to shell, Plan Mode |
| Use Copilot in the browser | [Copilot Web](copilot-web/) — cross-device, PR reviews, issue triage |
| Integrate Copilot into any editor or tool | [Copilot ACP](copilot-acp/) — Agent Client Protocol for universal AI integration |
| Embed Copilot in my own apps | [Copilot SDK](copilot-sdk/) — programmatic agent integration |
| Get quick wins with agents | [Agentic Journey](agentic-journey/) — issue-to-PR automation in hours |
| Implement agent safety controls | [Terminal Sandboxing](terminal-sandboxing/) + [Copilot Hooks](copilot-hooks/) |

---

## 🗺️ By Role

All paths start with [Copilot Chat](copilot-chat/) → [Copilot Primitives](copilot-primitives/), then branch:

| Role | After the foundation, continue with... |
|------|----------------------------------------|
| **Individual Developer** | [Copilot CLI](copilot-cli/) → [Multi-Step Tasks](multi-step-tasks/) → [Parallel Execution](parallel-execution/) |
| **Team / Tech Lead** | [Agent Teams](agent-teams/) → [Chat Internals](copilot-chat-internals/) → [Agentic SDLC](agentic-sdlc/) (Part 2) → [Enterprise Patterns](enterprise-patterns/) |
| **Security / Compliance** | [Terminal Sandboxing](terminal-sandboxing/) → [Copilot Hooks](copilot-hooks/) → [Agentic SDLC](agentic-sdlc/) (Part 3) → [Enterprise Patterns](enterprise-patterns/) |
| **Platform Engineer** | [Agentic SDLC](agentic-sdlc/) (all parts) → [Agent Teams](agent-teams/) → [Parallel Execution](parallel-execution/) → [Copilot ACP](copilot-acp/) → [Copilot SDK](copilot-sdk/) |
| **Executive / Leadership** | See [exec-talks/](../exec-talks/) — [Agentic Delivery](../exec-talks/agentic-delivery/), [Agentic Economics](../exec-talks/agentic-economics/), [Agentic Labor](../exec-talks/agentic-labor/) |

---

## 🧭 Learning Paths

### Path 0 — Quick Wins with Agents
> [Chat](copilot-chat/) → [Primitives](copilot-primitives/) → [Agentic Journey](agentic-journey/) Phases 1-4 → Evaluate → [Agentic SDLC](agentic-sdlc/) when hitting limits

### Path 1 — Individual Productivity
> [Chat](copilot-chat/) → [Primitives](copilot-primitives/) → [Copilot CLI](copilot-cli/) → [Multi-Step Tasks](multi-step-tasks/) → [Parallel Execution](parallel-execution/)

### Path 2 — Team Orchestration
> [Chat](copilot-chat/) → [Primitives](copilot-primitives/) → [Multi-Step Tasks](multi-step-tasks/) → [Agent Teams](agent-teams/) → [Chat Internals](copilot-chat-internals/)

### Path 3 — Enterprise Governance
> [Chat](copilot-chat/) → [Primitives](copilot-primitives/) → [Terminal Sandboxing](terminal-sandboxing/) → [Copilot Hooks](copilot-hooks/) → [Agentic SDLC](agentic-sdlc/) (Part 3) → [Enterprise Patterns](enterprise-patterns/)

### Path 4 — Platform Engineering
> [Chat](copilot-chat/) → [Primitives](copilot-primitives/) → [Agentic SDLC](agentic-sdlc/) (all parts) → [Agent Teams](agent-teams/) → [Parallel Execution](parallel-execution/) → [Copilot ACP](copilot-acp/) → [Copilot SDK](copilot-sdk/)

---

## 📊 Comparison Tables

### Copilot Interfaces

| Interface | Best For | Talk |
|-----------|----------|------|
| **VS Code Chat** | Interactive development, complex tasks, exploration | [Copilot Chat](copilot-chat/) |
| **Terminal (CLI)** | DevOps automation, Plan Mode, scripting | [Copilot CLI](copilot-cli/) |
| **Browser/Mobile** | Cross-device, lightweight queries, web workflows | [Copilot Web](copilot-web/) |
| **Any Editor (ACP)** | Universal agent access, custom tools, multi-agent systems | [Copilot ACP](copilot-acp/) |
| **Programmatic (SDK)** | Custom apps, embedded agents, specialized tools | [Copilot SDK](copilot-sdk/) |

### Agent Patterns

| Pattern | When to Use | Talk |
|---------|-------------|------|
| **Multi-Step Tasks** | Phased work needing context isolation (research → analysis → implementation) | [Multi-Step Tasks](multi-step-tasks/) |
| **Agent Teams** | Specialized roles working together (planner / coder / reviewer) | [Agent Teams](agent-teams/) |
| **Parallel Execution** | Independent features running simultaneously on different branches | [Parallel Execution](parallel-execution/) |

### Governance Controls

| Tool | Controls | Talk |
|------|----------|------|
| **Terminal Sandboxing** | _What_ agents can access — network, filesystem restrictions | [Terminal Sandboxing](terminal-sandboxing/) |
| **Copilot Hooks** | _When_ agents act — lifecycle gates, approval policies, audit trails | [Copilot Hooks](copilot-hooks/) |

💡 **Defense in depth:** Use both together — sandboxing for baseline safety, hooks for policy enforcement.

### Agentic SDLC Stages

| Stage | Scope | Talk | Expected ROI |
|-------|-------|------|-------------|
| **Try agents** | Issue triage automation | [Agentic Journey](agentic-journey/) (Phase 1) | 6× faster triage |
| **Automate workflows** | Full issue-to-PR lifecycle | [Agentic Journey](agentic-journey/) (Phases 1-4) | 10-20× throughput |
| **Transform SDLC** | Repos, PRs, CI/CD for AI velocity | [Agentic SDLC](agentic-sdlc/) | 100× at scale |
| **Scale organization** | Enterprise-wide adoption | [Enterprise Patterns](enterprise-patterns/) | Measurable org ROI |
| **Need executive buy-in?** | Business case first | [Agentic Labor](../exec-talks/agentic-labor/) | — |

---

## ❓ Common Questions

| Question | Answer |
|----------|--------|
| "I just want to be more productive" | [Copilot Chat](copilot-chat/) → [Copilot Primitives](copilot-primitives/) → [Copilot CLI](copilot-cli/) |
| "How do I make Copilot understand my codebase?" | [Copilot Primitives](copilot-primitives/) — instructions, prompts, skills, agents |
| "I need agents to work together" | [Multi-Step Tasks](multi-step-tasks/) (phases) or [Agent Teams](agent-teams/) (roles) |
| "I'm worried about security" | [Terminal Sandboxing](terminal-sandboxing/) + [Copilot Hooks](copilot-hooks/) |
| "Agents are shipping too fast and things break" | [Agentic SDLC](agentic-sdlc/) (all three parts) |
| "I want cross-session memory" | [Copilot Memory](copilot-memory/) |
| "I want rich UI in chat responses" | [MCP Apps](mcp-apps/) |
| "I want Copilot in a non-VS Code editor" | [Copilot ACP](copilot-acp/) — Agent Client Protocol for universal editor integration |