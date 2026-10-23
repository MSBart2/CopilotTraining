# Exercise 3.1: Creating a Docs Refresh Prompt

## 🔨 Exercise

### Exercise 3.1: Creating a Docs Refresh Prompt — "Keep the Source of Truth Current"

**Lead:** Sarah ⭐ | **Support:** David 🤝 | **Time:** 6 min

#### 📖 The Challenge

After every meaningful code change, the team needs to refresh `ARCHITECTURE.md` and `.github/copilot-instructions.md` so that Copilot's guidance stays aligned with the actual codebase. That is exactly the kind of repeated, high-value work a reusable prompt handles well.

Without a saved prompt, Sarah finds herself retyping the same careful request each time: "Review the workspace and update ARCHITECTURE.md and copilot-instructions.md to reflect what changed." It's clear, it works, and it needs to happen regularly — which means it belongs in a prompt file instead of her memory.

💭 *Sarah: "If we do this after every code change, the rest of our prompts get smarter without extra effort."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|---|---|
| Sarah retypes the docs-refresh request by hand after each meaningful code change. Source-of-truth docs drift as the codebase evolves. | Sarah invokes `/Refresh-Docs` in seconds. The prompt reviews the workspace and updates only the sections that changed. |
| **Setup:** Re-explain the task from scratch each time | **Setup:** One invocation, docs stay current |
| **Risk:** Docs fall behind, Copilot's context degrades | **Result:** Evergreen docs that make all other prompts more accurate |

#### 🎯 Your Goal

Create a workspace prompt that updates `ARCHITECTURE.md` and `.github/copilot-instructions.md` after any meaningful code change, and is reusable by the entire team.

#### 📋 Steps

1. **Create `refresh-docs.prompt.md`**

   Create `.github/prompts/refresh-docs.prompt.md` in the workspace:

   ```markdown
   ---
   name: Refresh Docs
   description: Update ARCHITECTURE.md and copilot-instructions.md after code changes
   mode: agent
   ---

   Review the current workspace and update the two foundational docs if the codebase has changed since they were last written.

   ## What to update

   - **ARCHITECTURE.md**: Any new modules, file relationships, or workflow boundaries
   - **.github/copilot-instructions.md**: Team expectations, review patterns, naming conventions

   ## Rules

   - Only update sections that have actually changed
   - Do not rewrite sections that are still accurate
   - Keep both files concise and actionable
   ```

2. **Tell the prompt to stay focused**

   The key design choice: the prompt updates the docs *when the codebase has changed* — not rewrite them from scratch every time. The rules section enforces this so the output stays surgical instead of becoming a full-document rewrite.

3. **Invoke it after a change and verify**

   Make a small change to a file in the workspace (add a route, update a component, or rename something meaningful), then in Copilot Chat:

   ```
   /Refresh-Docs
   ```

   Confirm that:
   - The prompt reviews the workspace for what changed
   - It updates only the relevant sections
   - It keeps the rest of the docs intact

#### ✅ Success Criteria

- [ ] The prompt is reusable after any meaningful code change
- [ ] It updates the two source-of-truth docs without turning into a generic repo rewrite
- [ ] The team sees evergreen docs as leverage, not cleanup

---

## 🔗 What You Built

**In this exercise:** `.github/prompts/refresh-docs.prompt.md` — a reusable prompt that keeps `ARCHITECTURE.md` and `.github/copilot-instructions.md` aligned with the current codebase.

**Why it matters:** Every other prompt in the team's workflow links to these docs for standards and architecture context. When the docs stay current, the accuracy of every other prompt improves automatically — without anyone manually updating those references.

---

## ➡️ Next Up

**[Exercise 3.2: Creating a Context-Aware Prompt File](exercise-3.2.md)** — save one strong team prompt that links to living docs and uses variables so the team's best review expertise is always one invocation away.

---
