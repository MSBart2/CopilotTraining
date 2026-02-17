# GitHub Copilot Training & Thought Leadership

> Hands-on training, technical deep-dives, and executive strategy for AI-assisted development

---

## 🎯 What's Inside

Three content tracks for different audiences, each with accompanying [Slidev presentations](slides/):

### 🏗️ [Workshop Training](workshop/) — 7 Modules

Hands-on, story-driven training with progressive skill-building for developers and teams.

| Module | Topic |
|--------|-------|
| [00 — Orientation](workshop/00-orientation/) | Training philosophy and the Shift |
| [01 — Instructions](workshop/01-instructions/) | Repository instructions and architecture docs |
| [02 — Agent Plan Mode](workshop/02-agent-plan-mode/) | Structured AI collaboration |
| [03 — Custom Prompts](workshop/03-custom-prompts/) | Reusable prompt workflows |
| [04 — Agent Skills](workshop/04-agent-skills/) | Skills for targeted capabilities |
| [05 — MCP Servers](workshop/05-mcp-servers/) | External system integration |
| [06 — Custom Agents](workshop/06-custom-agents/) | Autonomous agent workflows |

Uses persona-driven narratives and a production application template ([FanHub](https://github.com/MSBart2/FanHub)).

---

### 💼 [Executive Talks](exec-talks/) — 3 Talks

Thought leadership for technical leaders making strategic decisions about AI adoption.

| Talk | Focus |
|------|-------|
| [Agentic Delivery](exec-talks/agentic-delivery/) | Agents with instruments and guardrails |
| [Agentic Labor](exec-talks/agentic-labor/) | What missions agents can fly beyond code generation |
| [Agentic Economics](exec-talks/agentic-economics/) | Economic models for AI-assisted development ROI |

---

### 🔧 [Technical Deep-Dives](tech-talks/)

Technical presentations for practitioners exploring specific capabilities and patterns.

#### 💬 Copilot Surfaces

| Talk | Focus |
|------|-------|
| [Copilot Chat](tech-talks/copilot-chat/) | Context mastery for AI collaboration — #file, @workspace, #codebase |
| [Copilot Chat Internals](tech-talks/copilot-chat-internals/) | Under the hood diagnostics and Chat Debug View |
| [Copilot CLI](tech-talks/copilot-cli/) | Natural language to shell commands and scripting workflows |
| [Copilot Web](tech-talks/copilot-web/) | AI assistance beyond the IDE — PR reviews, issue triage |
| [Copilot Memory](tech-talks/copilot-memory/) | Cross-session context persistence and workflow patterns |
| [Terminal Sandboxing](tech-talks/terminal-sandboxing/) | Safe agentic execution with network and filesystem controls |

#### 🧩 Context & Customization

| Talk | Focus |
|------|-------|
| [Copilot Hooks](tech-talks/copilot-hooks/) | Programmable governance — prevention, audit trails, compliance |
| [Copilot SDK](tech-talks/copilot-sdk/) | Embedding AI agents in custom tools and applications |
| [Copilot Primitives](tech-talks/copilot-primitives/) | The 4 configuration primitives — instructions, prompts, skills, agents |
| [MCP Apps](tech-talks/mcp-apps/) | Rich UI in chat responses with component-based MCP tools |

#### 🤖 Agent Architecture

| Talk | Focus |
|------|-------|
| [Agent Teams](tech-talks/agent-teams/) | Coordinated specialists — planners, reviewers, testers collaborating |
| [Multi-Step Tasks](tech-talks/multi-step-tasks/) | Context isolation with subagents for complex workflows |
| [Parallel Execution](tech-talks/parallel-execution/) | Simultaneous agents on different branches via Git worktree |

#### 🚀 Agentic Transformation

| Talk | Focus |
|------|-------|
| [Agentic Journey](tech-talks/agentic-journey/) | The 5-phase path from "assign to copilot" to full SDLC automation |
| [Agentic SDLC](tech-talks/agentic-sdlc/) | Rewire repos, PRs, and CI/CD for AI-as-labor delivery agents |
| [Enterprise Patterns](tech-talks/enterprise-patterns/) | Scaling Copilot across organizations with measurable ROI |

See [DECISION-GUIDE.md](tech-talks/DECISION-GUIDE.md) for choosing the right talk for your audience.

---

## 📽️ Slide Decks

All content has accompanying [Slidev presentations](slides/) deployed to [GitHub Pages](https://MSBart2.github.io/CopilotTraining/).

| Category | Decks | Live URL Pattern |
|----------|-------|-----------------|
| Workshop | 7 | `/CopilotTraining/workshop/{module}/` |
| Tech Talks | 16 | `/CopilotTraining/tech-talks/{topic}/` |
| Exec Talks | 3 | `/CopilotTraining/exec-talks/{topic}/` |

Slides are built and deployed automatically on push to `main`. PRs that touch slides are validated with a build check before merge.

---

## 🚀 Getting Started

| If you want to... | Start here |
|-------------------|------------|
| Build hands-on AI skills | [Workshop Module 00](workshop/00-orientation/) |
| Understand strategic implications | [Agentic Delivery](exec-talks/agentic-delivery/) |
| Deep-dive a specific capability | [Tech Talk Decision Guide](tech-talks/DECISION-GUIDE.md) |

---

## 🏗️ Training Philosophy

### The Shift: Syntax Wizards → Markdown Whisperers

| Old Metrics | New Metrics |
|------------|-------------|
| Syntax memorization | Clear articulation of intent |
| Clever code only you understand | Code anyone can maintain |
| Fast typing | Fast thinking and design |
| Being the "only expert" | Scaling knowledge across the team |

In the age of AI assistance, the bottleneck isn't "can you write the code?" — it's "do you know what to build?"

> 💡 **Markdown Is the Medium**: Every `.md` file you write—instructions, prompts, agents, skills—is a direct conversation with AI. The most effective teams won't be those with the most elegant syntax; they'll be those with the best prose. Syntax is what AI writes for you. Markdown is what you write for AI.

### Four Principles

| Principle | Core Message |
|-----------|-------------|
| 🔍 **Clarity Beats Cleverness** | Understandable code trumps clever code |
| 🎯 **Intent Over Implementation** | Describe WHAT, not HOW |
| 📚 **Documentation Is Leverage** | Write once, benefit infinitely |
| ⚖️ **Human Judgment Is Non-Negotiable** | AI proposes, you decide |

---

## 🔧 Content Development

New tech talks are generated through an automated 4-phase workflow:

1. **Research** — Copilot CLI gathers source material and examples from URLs
2. **Plan** — Content outline committed for review
3. **Build** — README.md generated from approved plan (`/approve-plan`)
4. **Slides** — Slidev deck generated from README

See the [Tech Talks Creation Guide](tech-talks/README.md) for detailed instructions on both the issue-based and local IDE workflows.

### Copilot Agents & Skills

Content development is powered by custom Copilot agents and skills that run inside VS Code:

| Agent / Skill | Purpose |
|---------------|--------|
| `@Module Creator` | End-to-end workshop module generation |
| `@Module Planner` | Research and plan module outlines |
| `@Tech Talk Generator` | Research and generate tech talk content |
| `@Slide Generator` | Create Slidev slides from README files |
| `@exercise-author` skill | Create exercise files from module plans |

Agent definitions live in `.github/agents/` and skills in `.github/skills/`.

### Authoring Resources

- [Tech Talk Template](tech-talks/TEMPLATE.md) — Structure and guidelines for tech talks
- [Tech Talk Decision Guide](tech-talks/DECISION-GUIDE.md) — Choosing the right talk for your audience
- [Workshop Personas](workshop/00-orientation/PERSONAS.md) — Meet the training team members
- [Slide Deployment](slides/DEPLOYMENT.md) — How slides are built and deployed
- [Copilot Instructions](.github/copilot-instructions.md) — Repo-level conventions for Copilot

---

## 📚 Official Documentation

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Custom Instructions for Repositories](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [Custom Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Creating Custom Agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents)
- [Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

---

## 📜 License

This content is open source under the MIT License.

---

**Built with ❤️ by developers who believe clarity beats cleverness**
