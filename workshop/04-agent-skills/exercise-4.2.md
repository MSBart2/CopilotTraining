# Exercise 4.2: Character Change Test Workflow

## 🔨 Exercise

### Exercise 4.2: Character Change Test Workflow — "From Repeated Test Guesswork to a Reusable Review Workflow"

**Lead:** Elena ⭐ | **Support:** Marcus 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 3:15 PM on Monday. The team is ready to validate the character-detail enhancements from their roadmap. Elena knows the code change is only half the story. After each character-detail update, someone still has to answer:

- which existing tests need to change
- whether new coverage is needed
- which edge cases matter for this change
- whether the PR is safe from obvious regressions

Right now, Elena works that out manually every time:

- 7 minutes listing likely edge cases
- 8 minutes deciding which tests to update or add
- 5 minutes remembering the same fallback and empty-state questions

The `character-review.prompt.md` file helps initiate the review, but it doesn't teach Copilot the complete testing workflow by itself.

Elena realizes: *"A prompt can ask for tests. A skill can teach how to review a character-detail change and decide what test updates it needs before we open a PR."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Each character-detail change starts with manual test review. Elena has to decide what changed, which tests need updates, which new tests are needed, and whether important edge cases are covered. Edge cases are easy to miss when moving quickly. Total: 20 minutes of test-impact review per change. | Elena invokes the `character-change-test-workflow` skill. Copilot loads a shared review workflow, example patterns, and an edge case checklist. The team can quickly identify what tests need to change and then generate or update them from that plan. Total: 5 minutes of setup per change. |
| **Review time:** 20 min/change<br>**Edge cases missed:** common under time pressure<br>**Coverage decisions:** inconsistent | **Review time:** 5 min/change<br>**Edge case coverage:** consistent<br>**Coverage decisions:** more repeatable |

**Time saved:** 15 minutes per character-detail change × 4 changes per sprint = **60 minutes saved per sprint**

#### 🎯 Your Goal

Create a `character-change-test-workflow` agent skill that teaches Copilot how to review a character-detail change, identify what tests need to change, and then help generate or update those tests using a shared review workflow, examples, and an edge case checklist.

#### 📋 Steps

1. **Use `make-skill-template` to create a character-test skill**

   Ask Copilot to use the installed `make-skill-template` skill to scaffold a new skill named `character-change-test-workflow` in `.github/skills/`.

   A good prompt is:

   ```text
   Use the make-skill-template skill to create a new agent skill named
   character-change-test-workflow in .github/skills/.
   This skill helps Copilot review any character detail change and decide
   what tests to add or update. It covers new fields, changed
   rendering rules, fallback UI, empty states, missing values, partial data,
   and regression risks before a PR.
   ```

   Then review the generated scaffold and refine the frontmatter and instructions so the skill is optimized for character-change test review.

2. **Create a reusable review template**

   Create `.github/skills/character-change-test-workflow/character-change-test-template.md` with sections such as:

   - what changed
   - tests to update
   - tests to add
   - edge cases to verify
   - regression risks

3. **Create example review patterns**

   Add examples such as:

   - `.github/skills/character-change-test-workflow/examples/new-field-coverage.test.ts`
   - `.github/skills/character-change-test-workflow/examples/fallback-rendering.test.ts`

   These examples demonstrate how the team decides what tests to update when new fields, optional data, partial responses, or fallback states change.

4. **Create an edge case checklist**

   Create `.github/skills/character-change-test-workflow/edge-cases.md` documenting the cases we want Copilot to always consider:

   - optional field present
   - optional field absent
   - empty string or empty array
   - backend value exists but UI hides it incorrectly
   - UI displays fallback when data is truly missing

5. **Strengthen the generated `SKILL.md` file**

   Review the generated `.github/skills/character-change-test-workflow/SKILL.md`.

   Make the `description` keyword-rich so Copilot has a better chance of discovering the skill automatically when prompts mention character detail test review work, even if the user does not name the skill explicitly.

   Update it to look like this:

    ````markdown
    ---
    name: character-change-test-workflow
    description: 'Review what tests need to change for character detail updates using the team workflow, edge case checklist, and example patterns. Use when adding or updating character fields, rendering rules, fallback UI, empty states, missing values, partial character data, API/UI alignment, regression risks, or reviewing test coverage before a PR.'
    ---

   # Character Change Test Workflow

   ## When to Use This Skill

   - Adding or updating character detail fields
   - Changing rendering rules for existing data
   - Reviewing fallback behavior for partial character data
   - Deciding what tests need to change before a PR

   ## Workflow

   1. Start from [character-change-test-template.md](./character-change-test-template.md)
   2. Apply the checklist in [edge-cases.md](./edge-cases.md)
   3. Reference patterns in [examples](./examples/)
   4. Identify which tests to update or add
   5. Generate or review those tests if needed

   ## References

   - [Test workflow template](./character-change-test-template.md)
   - [Edge case checklist](./edge-cases.md)
   - [Examples](./examples/)
    ````

6. **Test the skill**

   Ask Copilot explicitly:

   ```
    Use the character-change-test-workflow skill to review this character detail
    change and tell me what tests to update or add, including changed
    fields, fallback behavior, missing data, rendering rules, and regressions.
    ```

   Then test discovery more naturally:

   ```
   I just changed the character detail experience. Review what tests need to change
   before I open a PR, then help me update the highest-priority ones.
   ```

#### ✅ Success Criteria

- [ ] Skill directory `.github/skills/character-change-test-workflow/` created from the template scaffold, with `SKILL.md`, workflow template, checklist, and examples
- [ ] The template gives Copilot a repeatable structure for character-detail test review
- [ ] The edge case checklist captures the team’s most important failure modes
- [ ] Example tests demonstrate the expected style and coverage
- [ ] The `description` includes enough character-detail and testing keywords to improve skill discovery
- [ ] Copilot can identify the right test updates with less setup and fewer missed cases

#### 📚 Official Docs

- [Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [About Agent Skills (GitHub)](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

---

## 🔗 What You Built

**In this exercise:**
- `.github/skills/character-change-test-workflow/SKILL.md` — Testing workflow instructions for character-detail changes
- `character-change-test-template.md` — Shared structure for deciding what tests to update or add
- `edge-cases.md` — The recurring cases the team never wants to forget
- `examples/` — Concrete patterns for common change types and regressions

**How it compounds:**

| Previous Modules | This Module | Combined Power |
|------------------|-------------|----------------|
| Module 3 created a reusable character review prompt | Module 4 teaches a complete character-change test review workflow behind that invocation | Prompt + skill together create faster, more consistent quality checks |
| Module 2 scoped small enhancements | Module 4 ensures those small enhancements get complete coverage | Small changes still get disciplined validation |

---

## ➡️ Next Up

**[Exercise 4.3: Character Detail Readiness Checker](exercise-4.3.md)** — The team can now review test impact consistently for character-detail changes. Next: teach Copilot how to verify that a change is truly ready before it becomes a PR.

> *"The implementation is scoped and the tests are better. But we still do one last manual sweep for docs, roadmap, touched files, and handoff quality. That feels like another workflow we want to package."*
> — Elena, handing off to Marcus

---
