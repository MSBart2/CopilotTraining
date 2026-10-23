# Exercise 6.1: Understand the Default Plan Agent

## 🎯 Objective

Analyze the built-in `@plan` agent to understand how custom agents work, including frontmatter configuration, tool restrictions, handoffs, and instruction design—preparing you to build your own specialized agents.

**Lead:** All ⭐ | **Support:** All 🤝

---

## 📖 The Story

### 💭 Sarah's Question

**Monday 3:45 PM** — The team has just finished Module 5 (MCP Servers) and is ready to learn about custom agents.

Sarah asks: *"Before we start building our own agents, I want to understand how the `@plan` agent that comes with Copilot actually works. What makes it different from regular chat? Why does it only research and never implement? How do those handoff buttons work?"*

David agrees: *"Good instinct. Let's reverse-engineer the default plan agent. Understanding the patterns used by Microsoft's team will teach us best practices for building our own."*

---

## 🧠 Mindful Moment: Learning from the Defaults

The default `@plan` agent is a masterclass in agent design. It demonstrates:

- **Role enforcement through tool restrictions** — Can't edit files, only research
- **Workflow automation** — Uses a subagent to gather context autonomously
- **Clear stopping rules** — Prevents accidentally starting implementation
- **Handoff patterns** — Seamless transitions to implementation
- **Instruction clarity** — Tells the AI what it is and what it's NOT

By understanding these patterns, you'll build better custom agents for your team.

---

## 🔨 Steps

### Step 1: Review the Agent Frontmatter

**Context:** Every custom agent starts with YAML frontmatter that defines its configuration. Let's examine what the plan agent declares.

**Task:**

1. Open the default plan agent file: `examples/completed-config/.github/agents/default-plan.agent.md`

2. Study the frontmatter (lines 1-13):

```yaml
---
name: Plan
description: Researches and outlines multi-step plans
argument-hint: Outline the goal or problem to research
tools: ['search', 'github/github-mcp-server/get_issue', ...]
handoffs:
  - label: Start Implementation
    agent: agent
    prompt: Start implementation
  - label: Open in Editor
    agent: agent
    prompt: '#createFile the plan as is...'
    showContinueOn: false
    send: true
---
```

**Answer these questions:**

<table>
<tr>
<th>Question</th>
<th>Your Answer</th>
</tr>
<tr>
<td>What tools are available to this agent?</td>
<td><em>List the categories: search tools, GitHub tools, etc.</em></td>
</tr>
<tr>
<td>What tools are <strong>missing</strong>? (Hint: file editing)</td>
<td><em>What can't this agent do?</em></td>
</tr>
<tr>
<td>How many handoffs are defined?</td>
<td><em>Count them</em></td>
</tr>
<tr>
<td>Which handoff auto-sends (<code>send: true</code>)?</td>
<td><em>Find the one that immediately executes</em></td>
</tr>
<tr>
<td>What does <code>argument-hint</code> do?</td>
<td><em>Where does this text appear in the UI?</em></td>
</tr>
</table>

### Step 2: Analyze the Stopping Rules

**Context:** The plan agent has explicit "stopping rules" that prevent it from accidentally starting implementation. This is critical for role enforcement.

**Task:**

1. Find the `<stopping_rules>` section in the agent instructions

2. Read the rules carefully:

```markdown
<stopping_rules>
STOP IMMEDIATELY if you consider starting implementation, switching to
implementation mode or running a file editing tool.

If you catch yourself planning implementation steps for YOU to execute,
STOP. Plans describe steps for the USER or another agent to execute later.
</stopping_rules>
```

**Answer these questions:**

| Question | Your Answer |
|----------|-------------|
| Why are explicit stopping rules necessary? | *What would happen without them?* |
| What specific actions does it prohibit? | *List them* |
| Who executes the plan steps—the plan agent or someone else? | *Find the answer in the rules* |

**💡 Key Insight:** Stopping rules make the agent's workflow **explicit and enforceable**. Without them, the AI might drift into implementation. This is how you create focused, workflow-based agents.

### Step 3: Understand the Workflow

**Context:** The plan agent uses a sophisticated workflow that loops through research and drafting. Let's trace it.

**Task:**

1. Find the `<workflow>` section

2. Trace the three phases:

**Phase 1: Context Gathering**
```markdown
## 1. Context gathering and research:

MANDATORY: Run #tool:runSubagent tool, instructing the agent to work
autonomously without pausing for user feedback...
```

**Phase 2: Present Plan**
```markdown
## 2. Present a concise plan to the user for iteration:

1. Follow <plan_style_guide>...
2. MANDATORY: Pause for user feedback, framing this as a draft for review.
```

**Phase 3: Handle Feedback**
```markdown
## 3. Handle user feedback:

Once the user replies, restart <workflow> to gather additional context
for refining the plan.
```

**Answer these questions:**

| Question | Your Answer |
|----------|-------------|
| What tool does the plan agent use for autonomous research? | *Find it in Phase 1* |
| Does the plan agent pause for feedback after presenting a plan? | *Yes/No and why?* |
| What happens when the user provides feedback? | *Does it loop back? Where?* |
| Why use a subagent instead of doing research directly? | *Hint: autonomy and iteration* |

**💡 Key Insight:** The workflow is **iterative and collaborative**. The agent researches → presents → gathers feedback → repeats. This is superior to "research everything then write a massive plan."

### Step 4: Study the Plan Style Guide

**Context:** The `<plan_style_guide>` defines the output format. This ensures consistent, scannable plans.

**Task:**

1. Find the `<plan_style_guide>` section

2. Study the template structure

**Answer these questions:**

| Question | Your Answer |
|----------|-------------|
| How many steps does a plan have? | *Find the range (3–6 steps)* |
| How long is each step (in words)? | *Find the constraint (5–20 words)* |
| Do steps include code blocks? | *Find the explicit rule about this* |
| What goes in "Further Considerations"? | *Purpose of this section* |

**💡 Key Insight:** Constraining the format makes plans **actionable and scannable**. No massive walls of text. No premature code. Just clear steps with file references.

### Step 5: Understand Tool Selection Strategy

**Context:** The plan agent has specific tools for specific purposes. Let's categorize them.

**Task:**

Create a table categorizing the plan agent's tools:

| Tool Category | Example Tools | Purpose |
|---------------|---------------|---------|
| **Code Search** | `'search'`, `'usages'` | *Finding related code and references* |
| **GitHub Integration** | `'github/github-mcp-server/get_issue'` | *Querying issues, PRs, comments* |
| **Web Research** | `'fetch'`, `'githubRepo'` | *Fetching docs, external resources* |
| **Problem Analysis** | `'problems'`, `'testFailure'` | *Checking for errors and test failures* |
| **Change Detection** | `'changes'` | *Seeing what's been modified* |
| **Autonomous Research** | `'runSubagent'` | *Delegating deep research* |

**Answer these questions:**

| Question | Your Answer |
|----------|-------------|
| Why include `'problems'` and `'testFailure'` tools? | *What planning scenario needs these?* |
| What's the difference between `'search'` and `'usages'`? | *When would you use each?* |
| Why allow `'changes'` during planning? | *What context does this provide?* |
| What tools are conspicuously absent? | *Hint: editing, creating, deleting* |

**💡 Key Insight:** Tool selection is **strategic**. Every tool serves the planning role. No tools that enable implementation.

### Step 6: Analyze the Handoffs

**Context:** Handoffs create smooth transitions between agents. Let's see how the plan agent sets these up.

**Task:**

Study the two handoffs:

**Handoff 1: Start Implementation**
```yaml
- label: Start Implementation
  agent: agent
  prompt: Start implementation
  send: false
```

**Handoff 2: Open in Editor**
```yaml
- label: Open in Editor
  agent: agent
  prompt: '#createFile the plan as is into an untitled file...'
  showContinueOn: false
  send: true
```

**Answer these questions:**

| Question | Your Answer |
|----------|-------------|
| Which handoff targets the default agent? | *Both do—what does `agent: agent` mean?* |
| Which handoff auto-submits the prompt? | *Look for `send: true`* |
| What does "Open in Editor" do specifically? | *Read the prompt carefully* |
| Why does "Start Implementation" use `send: false`? | *What control does this give?* |
| What is `showContinueOn: false` for? | *When does the button appear?* |

**💡 Key Insight:** Handoffs can target specific agents OR the default agent. Auto-send (`send: true`) is useful for automated workflows. Manual send (`send: false`) lets users review before proceeding.

---

## ✅ Success Criteria

- [ ] Identified all tool categories in the plan agent's `tools` array
- [ ] Understood why file editing tools are excluded
- [ ] Explained the purpose of explicit stopping rules
- [ ] Traced the three-phase workflow (research → present → iterate)
- [ ] Analyzed the plan style guide constraints and their purpose
- [ ] Categorized tools by their role in planning
- [ ] Compared the two handoffs and their different behaviors
- [ ] Answered all reflection questions in the exercise

---

## 📊 Metrics

| Metric | Target |
|--------|--------|
| **Questions answered** | 100% (all tables filled in) |
| **Understanding level** | Can explain each section's purpose |
| **Ready to build custom agents** | Yes—you now have a reference template |

---

## 💭 Persona Reactions

**Sarah:** *"This is well-designed. The stopping rules prevent scope creep, the workflow is iterative, the style guide keeps output consistent. These are the patterns we want for our own agents."*

**David:** *"The tool selection is strategic—everything supports research, nothing enables implementation. That's architectural discipline applied to AI configuration."*

**Marcus:** *"I like the subagent pattern. Delegate the deep research so the main agent can focus on presenting plans. We could use this for infrastructure analysis."*

**Elena:** *"The explicit style guide is brilliant. Without it, plans would be inconsistent. Let's create similar templates for test generation and security review agents."*

**Rafael:** *"The handoffs are genius. One click to move from planning to implementation. We need this for product analysis to engineering handoff."*

---

## 📚 Official Docs

- [Custom Agents Overview](https://code.visualstudio.com/docs/copilot/copilot-custom-agents)
- [Agent Handoffs](https://code.visualstudio.com/docs/copilot/copilot-custom-agents#_agent-handoffs)
- [Agent Tool Selection](https://code.visualstudio.com/docs/copilot/copilot-custom-agents#_tool-selection)

---

## ➡️ What's Next

Now that you understand how agents work, you're ready to build your own:

**[Exercise 6.2](exercise-6.2.md)** — Create a character-review agent for FanHub (customized for your story arc)

**[Exercise 6.3](exercise-6.3.md)** — Build an implementation agent with full editing tools and handoff

---

## 🎭 Behind the Scenes: Why This Exercise Matters

**For instructors and curious learners:**

This exercise teaches agent design principles through reverse-engineering, not abstract theory:

1. **Role enforcement** — Stopping rules + tool restrictions create focused agents
2. **Workflow design** — Iterative loops (research → present → feedback) beat one-shot generation
3. **Output constraints** — Style guides create consistent, actionable deliverables
4. **Strategic tool selection** — Every tool serves the agent's specific role
5. **Smooth transitions** — Handoffs preserve context across workflow phases

By studying the default plan agent, learners see **production-quality agent design** that they can adapt for their own needs. This is faster and more effective than "here's the schema, go build something."
