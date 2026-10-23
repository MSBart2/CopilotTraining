# Exercise 3.2: Creating a Context-Aware Prompt File

## 🔨 Exercise

### Exercise 3.2: Feature Kickoff Brief — "Save One Strong Team Prompt"

**Lead:** Marcus ⭐ | **Support:** Sarah 🤝 | **Time:** 12 min

#### 📖 The Challenge

Before Marcus starts any new feature, he reassembles the same context from scratch: which files to touch, which patterns from `copilot-instructions.md` to follow, which architecture dependencies to sequence first. He rebuilds this from memory every time — and the brief is never quite the same twice.

The missing piece is a prompt file that accepts a feature name as a variable, pulls in the current architecture and team standards automatically, and always returns the same structured kickoff brief. One invocation, consistent output, zero manual context assembly.

💭 *Marcus: "Same prompt, different feature name, same reliable structure every time — that's the workflow I wanted."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|---|---|
| Marcus rebuilds implementation context from memory before each feature. Different structure every time, occasionally misses a dependency. | Marcus runs `/Feature-Kickoff "Lore Quick-Add Form"`. Gets files, patterns, sequencing, open questions, and suggested first PR scope — in under 10 seconds. |
| **Setup:** Manual, inconsistent, from memory | **Setup:** One variable, one invocation |
| **Risk:** Missed dependencies, stale patterns, inconsistent scope | **Result:** Always current architecture, always current standards |

#### 🎯 Your Goal

Create a workspace prompt file that takes a feature name as input, references living architecture and instruction docs, and returns a consistent structured kickoff brief for any feature.

#### 📋 Steps

1. **Create `feature-kickoff.prompt.md`**

   Create `.github/prompts/feature-kickoff.prompt.md`:

   ```markdown
   ---
   name: Feature Kickoff
   description: Generate a structured implementation brief for any named feature
   mode: ask
   ---

   Generate a feature kickoff brief for: **${input:featureName}**

   ## Context sources
   - [Architecture guide](./ARCHITECTURE.md): file structure, module boundaries, data flow
   - [Team instructions](./.github/copilot-instructions.md): patterns, naming, review habits

   ## Output

   **Files you'll touch**
   List likely affected files with create/extend/modify labels.

   **Patterns to follow**
   Pull relevant conventions from copilot-instructions.md for this feature.

   **Dependencies to sequence first**
   Based on ARCHITECTURE.md, what must land before this feature?

   **Open questions before you start**
   What decisions need to be made before coding begins?

   **Suggested first PR scope**
   The smallest reviewable slice to ship first.
   ```

   **Key design choices:**
   - **`${input:featureName}`** — VS Code prompts for the feature name at invocation time; same prompt, different brief every sprint
   - **Markdown links to living docs** — when architecture or standards evolve, every future kickoff reflects the change automatically
   - **Structured output** — consistent format makes briefs comparable and reviewable across features

2. **Invoke it for a real feature**

   In Copilot Chat:

   ```
   /Feature-Kickoff "Lore Quick-Add Form"
   ```

   VS Code will prompt for `featureName`, then pass it along with the linked doc content. Check the output: are the files, patterns, and sequencing correct for this feature?

3. **Run it again for a second feature**

   ```
   /Feature-Kickoff "Character Detail Stats Card"
   ```

   Compare the two outputs. Look for identical structure and completely different content. That's the variable doing its job.

#### ✅ Success Criteria

- [ ] Prompt exists with `${input:featureName}` variable
- [ ] References `ARCHITECTURE.md` and `copilot-instructions.md` via markdown links
- [ ] Output includes files, patterns, sequencing, open questions, and first PR scope
- [ ] Running it twice with different feature names produces consistent structure, different content

---

## 🔗 What You Built

**In this exercise:** `.github/prompts/feature-kickoff.prompt.md` — a reusable prompt that takes any feature name and returns a structured implementation brief grounded in current architecture and team standards.

**Why it matters:** The brief is only as good as the docs it reads. Because the prompt links to living sources of truth, it stays accurate as the codebase evolves — without anyone updating the prompt file.

---

## ➡️ Next Up

**Exercise 3.3: Show-Accuracy Check Prompt** — encode domain knowledge (your universe file) into a prompt that applies canon rules automatically to any content piece.