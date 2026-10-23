# Exercise 6.2: Create Character Review Agent

## 🎯 Objective

Create a `@character-review` custom agent with read-only tools that bundles the character-review workflow from Modules 3.2, 4.2, and 5.2 into one reusable role preset.

> **Note:** This exercise builds on concepts from [Exercise 6.1](exercise-6.1.md), where you analyzed the default plan agent.

**Lead:** Elena ⭐ | **Support:** Sarah 🤝

---

## 📖 The Story

### ❌ The "Before" — Manual Character Review Setup

**Monday 3:50 PM** — Elena is reviewing the next Character Detail change. She already has a strong workflow:

- the `character-review-prompt` from Module 3.2
- the `character-change-test-workflow` skill from Module 4.2
- the FanHub database MCP from Module 5.2

But every review still starts with manual setup:

1. Opens Copilot Chat
2. Remembers the prompt wording from Module 3.2
3. Hopes Copilot notices the testing workflow from Module 4.2
4. Remembers to pull in live data from Module 5.2 when duplicate records might matter
5. Repeats the same setup instructions for the next character-detail PR

**Time breakdown:**
- **5 minutes** — Rebuilding the same context before each review
- **Inconsistent behavior** — Sometimes the prompt is reused well, other times MCP isn't consulted even when duplicate data is the real issue
- **Mental overhead** — Elena has to remember which customization layer helps with which part of the review

Sarah watches Elena retype the same review framing again: *"You've already built the workflow. Why not turn it into an agent so the same review behavior is ready instantly?"*

---

### ✨ The "After" — Review Agent with Prompt + Skill + MCP

**The transformation:**

Elena creates `.github/agents/character-review.agent.md` with:

- **Read-only review tools** — enough to inspect code and project context without making accidental edits
- **Prompt-aware instructions** — centers the same character-review framing from Module 3.2
- **Skill-aware workflow** — explicitly uses the `character-change-test-workflow` from Module 4.2
- **MCP-aware escalation** — reaches for `#mcp-fanhub-db` when duplicate or conflicting character records might affect behavior

**New workflow:**
1. Selects `@character-review` from the agent dropdown
2. Asks for a review of the latest character-detail change
3. Agent follows the established review workflow automatically
4. If duplicate data might matter, the agent investigates with live FanHub data
5. Returns tests to update, edge cases, and cleanup or guardrails before the PR

**Results:**
- **Setup time**: 5→0 minutes (workflow preset instead of repeated setup)
- **Review consistency**: ad hoc → repeatable
- **Live-data usage**: easy to forget → built into the review role

---

### 💭 Elena's Realization

> *"This is the payoff of everything we built earlier. The prompt gave us reusable wording. The skill gave us a repeatable testing workflow. MCP gave us live FanHub data when the code alone wasn't enough. The agent is what makes all of that feel like one role instead of three separate things I have to remember."*

---

## 🔨 Steps

### Step 1: Create Character Review Agent Configuration

**Context:** The `@character-review` agent is analysis-only. Its job is to review character-detail changes using the workflow you already established across Modules 3.2, 4.2, and 5.2.

**Task:**

1. Create `.github/agents/character-review.agent.md` with this structure:

```markdown
---
description: Review character-detail changes using the prompt, skill, and MCP-backed duplicate investigation workflow
name: Character Review
tools: ['search', 'fetch', 'usages', 'problems']
model: Claude Sonnet 4
handoffs:
  - label: Fix Character Issues
    agent: implement
    prompt: Fix the character-detail issues identified in the review above.
    send: false
---
# Character Review Mode Instructions

You are a CHARACTER REVIEW AGENT specialized in reviewing FanHub character-detail changes before a PR.

You are in analysis-only mode. Do not modify files, create files, or implement fixes directly.

## Review Workflow

When reviewing a character-detail change:

1. Start from the same workflow as the `character-review-prompt`
2. Use the `character-change-test-workflow` skill to determine what tests need to change
3. Review the changed code, related files, and likely regressions
4. If duplicate or conflicting data may affect the behavior, use `#mcp-fanhub-db`
5. Return:
   - what changed
   - tests to update
   - tests to add
   - edge cases
   - cleanup or guardrails before the PR

## MCP Guidance

Use `#mcp-fanhub-db` when:
- duplicate character records are suspected
- optional fields may differ across real rows
- fallback UI could be hiding a data quality issue
- test fixtures may not match live FanHub data

## Constraints

- Analysis only
- No code edits
- Prefer the established character-review workflow over inventing a new one
```

2. Save the file

**Validation:** The agent file exists at `.github/agents/character-review.agent.md` and clearly bundles the earlier prompt, skill, and MCP-backed review flow into one analysis-only agent.

---

### Step 2: Test the Character Review Agent

**Context:** Verify the agent behaves like a reusable role preset for the character-review workflow.

**Task:**

1. Open Copilot Chat panel
2. Select **@character-review** from the agent dropdown
3. Verify the chat input placeholder shows: "Review character-detail changes using the prompt, skill, and MCP-backed duplicate investigation workflow"
4. Type this prompt:

```
Review the character detail change and tell me what tests, edge cases, or follow-up work we need before opening the PR.
```

5. Observe Copilot:
   - reviews the change in a character-detail frame
   - follows the established test-review workflow
   - identifies likely regressions and edge cases
   - reaches for live FanHub data when duplicate records might explain the risk
6. Ask the agent to make a code change directly
7. Confirm it refuses because it is in review-only mode

**Validation:**
- ✅ Agent behaves like a specialized character-review role
- ✅ Agent output reflects the workflow from Modules 3.2, 4.2, and 5.2
- ✅ Agent recommends tests, edge cases, and follow-up work
- ✅ Agent refuses to modify code directly

---

### Step 3: Compare Before and After Metrics

**Context:** Measure the improvement from manual review setup versus the review agent preset.

**Task:**

Document these comparisons:

**Before (Manual Review Setup):**
- Setup time: 5 minutes rebuilding context
- Prompt reuse: manual and inconsistent
- Skill usage: depends on good discovery
- Live data checks: easy to forget unless duplicate data is obvious

**After (@character-review Agent):**
- Setup time: 0 minutes
- Prompt reuse: built into the role
- Skill usage: expected as part of the workflow
- Live data checks: promoted when duplicate or conflicting rows matter

**Workflow improvement:**
- Review starts from the same proven character workflow every time
- Agent behavior matches the story arc across Modules 3.2, 4.2, and 5.2
- Elena spends less time reconstructing context and more time making decisions

**Validation:** You can explain how the agent turns three separate customizations into one reusable review mode.

---

## ✅ Success Criteria

- [ ] `.github/agents/character-review.agent.md` exists with complete YAML frontmatter
- [ ] Agent specifies read-only review tools
- [ ] Agent instructions explicitly reuse the established character-review workflow
- [ ] Agent references the `character-change-test-workflow`
- [ ] Agent includes MCP guidance for duplicate-data investigation
- [ ] Agent includes handoff to `@implement`
- [ ] Agent appears in VS Code agent dropdown as "Character Review"
- [ ] Agent successfully reviews a character-detail change without editing code
- [ ] You can document the 5→0 minute setup-time improvement

---

## 🚀 Challenge Extension

**Enhance the character-review agent:**

1. **Argument hints** — Add `argument-hint: "Describe the character-detail change or PR to review"` so the interaction style is clearer

2. **Prompt alignment** — Update the instructions so the agent explicitly mirrors the output sections from `character-review-prompt`

3. **Model comparison** — Try a different `model` value and compare how well the agent balances code review with duplicate-data investigation

4. **Review severity levels** — Add output categories like blockers, warnings, and follow-up items to make the report easier to triage

---

## 📚 Key Concepts

**Agents turn stacked customizations into one role:**
- Prompt gives reusable phrasing
- Skill gives repeatable workflow
- MCP gives live external context
- Agent bundles them into an instant working mode

**Tool restrictions enforce review boundaries:**
- Read-only tools preserve analysis mode
- No edit tools means no accidental fixes during review
- Handoff handles the transition to implementation

**This is orchestration, not replacement:**
- You are not throwing away the prompt, skill, or MCP work
- You are packaging their combined value into a reusable agent role

---

## 🔗 Official Docs

- 📖 [Custom agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/custom-agents) — Complete agent structure and configuration guide
- 📖 [Custom prompts](https://code.visualstudio.com/docs/copilot/customization/prompt-files) — Reusable prompts that agents can build on
- 📖 [MCP servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) — Live data access for agents and chat workflows

---

## ➡️ What's Next?

In [Exercise 6.3](exercise-6.3.md), you'll create the `@implement` agent and hand off directly into `@character-review`, so implementation and review become one connected workflow.

> *"The review workflow is finally packaged. Now let's make implementation hand off to it automatically so quality checks happen as part of the same flow, not as a separate reminder."*
> — Sarah, ready to connect build and review
