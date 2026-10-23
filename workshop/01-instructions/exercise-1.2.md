# Exercise 1.2: Create copilot-instructions.md

## 🔨 Exercise

### Exercise 1.2: Create copilot-instructions.md — "Standardize Patterns Automatically"

**Lead:** Sarah ⭐ | **Support:** All 🤝 | **Time:** 10 min

#### 📖 The Challenge

Sarah looks at three recent PRs and sees the same problem: inconsistent code patterns. One developer uses `try/catch`, another uses `.then().catch()`, a third mixes both. The backend has three different async patterns from the contractor who had no style guide. Every PR review includes the same feedback: *"Use async/await, not promises."* *"Wrap API calls in try/catch."* *"Use functional components, not classes."*

David agrees: *"We know our patterns—async/await everywhere, functional React components, proper error handling. But we keep explaining them in every PR review. It's like onboarding the same developer over and over."*

Elena adds the testing perspective: *"And generated tests don't follow our Jest patterns because Copilot doesn't know we mock external APIs and test error cases. Every test suite needs manual revision."*

Sarah has the solution: *"Let's document our standards once in `.github/copilot-instructions.md`. Then every Copilot suggestion—code, tests, everything—will follow our patterns from the start. Document once, enforce automatically."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Developer asks Copilot to generate error handling → Suggests `.then().catch()` → Sarah reviews PR: "Please use async/await" → Developer revises → 2nd review round → 45 minutes total | Developer asks Copilot to generate error handling → Copilot reads copilot-instructions.md → Suggests `try/catch` with async/await → Sarah reviews PR: "Perfect" → Approved in 5 minutes |
| **Pattern Violations:** 8 per PR<br>**Review Rounds:** 3<br>**Review Time:** 45 min per PR | **Pattern Violations:** 0 per PR<br>**Review Rounds:** 1<br>**Review Time:** 5 min per PR |

#### 🎯 Your Goal

Create `.github/copilot-instructions.md` that automatically enforces FanHub's coding standards in every Copilot suggestion.

#### 📋 Steps

1. **Identify your team's key patterns**

   Review the FanHub codebase and note patterns you want enforced:
   - **Async patterns:** Are we using async/await consistently?
   - **React style:** Functional components or class components?
   - **Error handling:** How are errors caught and handled?
   - **Testing approach:** What framework, what patterns?
   - **Import preferences:** Named imports vs default imports?

   List 5-7 patterns that cause the most PR review comments.

2. **Generate copilot-instructions.md using Copilot**

   Open Copilot Chat and run:
   ```
   @workspace Analyze the FanHub codebase and create .github/copilot-instructions.md
   that enforces our coding standards. Include:

   - Language and framework conventions (async/await, React patterns)
   - Error handling patterns (try/catch usage, error middleware)
   - Testing standards (Jest, mocking, error cases)
   - Import preferences (named vs default)
   - Code style (formatting, naming conventions)

   Be specific and actionable—these instructions will be automatically
   included in every Copilot prompt.
   ```

   **Expected behavior:** Copilot generates a structured instruction file with sections for each category, written as directives (e.g., "Always use async/await", "Prefer functional React components").

3. **Customize with your team's specific standards**

   Open `.github/copilot-instructions.md` and refine:

   - Add any patterns Copilot missed from your list in step 1
   - Make instructions more specific (e.g., "Use named imports for React components")
   - Add examples if a pattern needs clarification
   - Remove any generic advice that doesn't apply to your project

   Keep it under 100 lines—specific and actionable, not exhaustive.

4. **Test that standards are being enforced**

   In Copilot Chat, test with specific scenarios:
   ```
   Create an API call to fetch show details from the backend
   ```

   **Expected result:** Generated code uses async/await (not promises), includes try/catch error handling, follows your documented patterns.

   Try another:
   ```
   Create a test for the ShowList component
   ```

   **Expected result:** Uses Jest (per your instructions), mocks API calls, includes error case testing.

5. **Share with team and refine**

   Have each team member generate code with Copilot and verify:
   - Are suggestions following the documented patterns?
   - Any patterns being violated that need to be added?
   - Any instructions too vague that need clarification?

   Make adjustments based on actual usage.

#### ✅ Success Criteria

- [ ] `.github/copilot-instructions.md` exists and is under 100 lines
- [ ] Includes sections for: language conventions, error handling, testing, imports, code style
- [ ] Test code generation shows patterns being followed (try 3 different prompts)
- [ ] Team generates code and sees 0 pattern violations (or very few requiring instructions updates)
- [ ] PR reviews now focus on logic, not style corrections

> 📂 **Compare Your Work**: [`examples/completed-config/.github/copilot-instructions.md`](../../.github/copilot-instructions.md)

#### 📚 Official Docs

- [VS Code: Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) — Complete guide to repository custom instructions
- [GitHub Docs: Repository Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) — Official documentation for configuring custom instructions

---

## 🔗 What You Built

**In this exercise:**
- `.github/copilot-instructions.md` — Automated standards enforcement that ensures every Copilot suggestion follows your team's patterns

**Impact metrics:**
- Pattern violations per PR: 8 → 0
- Review rounds: 3 → 1
- Review time per PR: 45 min → 5 min
- Time saved per week (3 PRs): 2 hours back

**Combined with Exercise 1.1:**
- ARCHITECTURE.md tells Copilot WHERE (structure)
- copilot-instructions.md tells Copilot HOW (patterns)
- Together = consistent, contextually aware suggestions

---

## ➡️ Next Up

**[Module 2: Agent Plan Mode](../02-agent-plan-mode/README.md)** — Monday 11:30 AM

Now that Copilot knows your structure and patterns, let's teach it to think through problems before coding.

> *"Copilot knows our patterns now. But can it think through complex problems like we do?"*
> — David, ready to test Copilot's reasoning capabilities

---
