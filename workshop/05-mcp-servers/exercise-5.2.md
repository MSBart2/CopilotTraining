# Exercise 5.2: Upgrade Character Test Workflow with MCP

## 🔨 Exercise

### Exercise 5.2: Upgrade Character Test Workflow with MCP — "From Local Review Logic to Live Duplicate Investigation"

**Lead:** Elena ⭐ | **Support:** Marcus 🤝 | **Time:** 15 min

#### 📖 The Challenge

In Module 4.2, the team created `character-change-test-workflow` to answer a useful question:

**what tests need to change when the character-detail experience changes?**

That workflow was helpful, but it still depended on whatever context the developer provided. Now the team knows something more concrete:

- FanHub has duplicate character records
- those duplicates can make character-detail behavior inconsistent
- fallback behavior can hide the problem
- tests and cleanup decisions are grounded in the real data, not guesses

So the next step is not to replace the skill. It is to **upgrade the skill** so it can use live FanHub data through MCP.

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Elena uses the Module 4.2 skill with a description of the problem. It helps, but the workflow still depends on memory and hand-written context. Duplicate records are easy to miss unless someone manually checks the database first. | Elena updates `character-change-test-workflow` so it can use `#mcp-fanhub-db` during duplicate investigations. Now the same skill can inspect real conflicting records, explain which fields differ, and recommend tests or cleanup actions based on live data. |
| **Investigation time:** 15 min<br>**Confidence:** partial<br>**Live data awareness:** manual | **Investigation time:** 3 min<br>**Confidence:** higher<br>**Live data awareness:** built into the workflow |

#### 🎯 Your Goal

Update the `character-change-test-workflow` skill from Module 4.2 so it can use FanHub database MCP to investigate duplicate character records and recommend the right tests, cleanup steps, or guardrails.

#### 📋 Steps

1. **Update the Module 4.2 skill**

   Open `.github/skills/character-change-test-workflow/SKILL.md` and revise it so the workflow can use `#mcp-fanhub-db` when character-detail changes may be affected by live data issues.

   The updated skill helps Copilot:

   - inspect real character records
   - identify duplicate or conflicting rows
   - decide what tests need to change
   - recommend cleanup or guardrails before the PR

2. **Add MCP-aware workflow guidance**

   Extend the skill instructions so they include steps like:

   - query FanHub data for affected character records
   - compare duplicate rows or conflicting optional fields
   - identify risks to the character-detail UI
   - recommend test changes, cleanup work, or follow-up checks

3. **Create a reusable prompt for the upgraded workflow**

   Create `.github/prompts/investigate-character-duplicates.prompt.md`:

   ````markdown
   ---
   mode: ask
   description: Use the upgraded character-change-test-workflow with live FanHub data to investigate duplicate character records.
   ---

   Use the `character-change-test-workflow` skill together with `#mcp-fanhub-db`.

   Your job:
   1. Identify likely duplicate character records in FanHub
   2. Compare the duplicate rows and summarize how they differ
   3. Explain how those differences could affect the character-detail experience
   4. Recommend the right tests, cleanup actions, or guardrails before the PR

   Return:
   - likely duplicates
   - differing fields
   - UI/test risks
   - recommended next steps
   ````

4. **Run the upgraded workflow**

   ```
   @workspace /investigate-character-duplicates Use the upgraded character-change-test-workflow
   to investigate duplicate character records and tell me what tests, cleanup, or
   guardrails we need before the next PR.
   ```

5. **Review the upgrade**

   Confirm that the skill is now stronger than the Module 4 version because it can operate on live FanHub data instead of user-supplied descriptions alone.

#### ✅ Success Criteria

- [ ] `character-change-test-workflow` is updated to reference `#mcp-fanhub-db`
- [ ] The upgraded skill can investigate duplicate character records using live data
- [ ] `.github/prompts/investigate-character-duplicates.prompt.md` exists
- [ ] The workflow now recommends tests, cleanup, or guardrails from real records instead of assumptions

#### 📚 Official Docs

- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Prompt Files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

---

## 🔗 What You Built

**In this exercise:**
- An upgraded `character-change-test-workflow` skill that can use live FanHub data
- `.github/prompts/investigate-character-duplicates.prompt.md` — MCP-backed duplicate investigation workflow

**How it compounds:**

| Previous Modules | This Module | Combined Power |
|------------------|-------------|----------------|
| Module 4.2: Character change test workflow | FanHub DB MCP | The same skill now works with live data instead of guesses |
| Exercise 5.1: FanHub character data access | MCP-aware skill upgrade | MCP becomes part of a reusable workflow, not just a one-off query |

---

## ➡️ Next Up

**[Exercise 5.3: Validate Running Character Detail API](exercise-5.3.md)** — Once the upgraded skill can reason about messy live data, validate whether the running FanHub API is also exposing those problems to the frontend.

> *"Now the skill can see the data. The next question is whether the running API is surfacing the same issues to the UI."*
> — Elena, handing off to Marcus

---
