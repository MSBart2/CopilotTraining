# Exercise 1.0: Bootstrap Instructions with /init

## 🔨 Exercise

### Exercise 1.0: Bootstrap Instructions with /init — "Let AI Analyze Your Codebase First"

**Lead:** David ⭐ | **Support:** Sarah, Elena 🤝 | **Time:** 8 min

#### 📖 The Challenge

The team stares at the FanHub codebase. David knows they need to document patterns and conventions, but where to start? Writing instructions from scratch means analyzing every folder, every file pattern, every convention already embedded in the code. That's hours of manual work.

Sarah is skeptical: *"Last time I tried to write comprehensive instructions, I spent 90 minutes and still missed half our patterns. The codebase had conventions I'd forgotten existed."*

Elena points out the irony: *"We're about to teach Copilot about our codebase... by manually reading our codebase. Why not let AI do the analysis part?"*

David realizes the opportunity: *"VS Code 1.109 added `/init`—a slash command that analyzes the codebase and generates initial instructions automatically. Let's start there, then refine what it creates."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Manually analyze 50+ files to identify patterns | `/init` analyzes codebase in seconds |
| Write instructions from scratch: 60-90 min | Review and refine generated instructions: 15 min |
| Miss patterns you've forgotten about | AI discovers patterns across entire codebase |
| **Time:** 90 min<br>**Patterns Found:** ~60% (human memory)<br>**Confidence:** Low | **Time:** 15 min<br>**Patterns Found:** ~90% (systematic analysis)<br>**Confidence:** High |

#### 🎯 Your Goal

Use the `/init` slash command to generate initial workspace instructions, then review and customize the output before proceeding to manual refinement in Exercise 1.1.

#### 📋 Steps

1. **Open Copilot Chat and run /init**

   In the Chat panel, type:
   ```
   /init
   ```

   **What happens:** The agent enters a structured discovery workflow:
   1. **Discovery** — Scans project structure, package files, configuration
   2. **Alignment** — May ask clarifying questions about your project
   3. **Design** — Drafts comprehensive instructions based on analysis
   4. **Refinement** — Presents the result for your review

   💡 **Tip:** Answer any clarifying questions honestly—this improves the generated instructions.

2. **Review the generated output**

    `/init` will create or update one of these files:
    - `.github/copilot-instructions.md` (recommended location)
    - `AGENTS.md` (open agent-playbook format)

   Open the generated file and look for:
   - **Discovered patterns:** Does it mention React, Express, SQLite correctly?
   - **Coding conventions:** Did it identify your async patterns, error handling?
   - **Folder structure:** Does it understand where things belong?
   - **Missing context:** What did it miss that you know about?

3. **Note what needs refinement**

   Create a mental (or written) checklist of:
   - ✅ What `/init` got right (keep these sections)
   - 🔄 What needs adjustment (conventions it misread)
   - ❌ What's missing (team-specific patterns, library preferences)
   - ➕ What to add (testing requirements, security rules)

   **Don't edit yet**—the next exercises will guide systematic refinement.

4. **Verify the file is created**

   Check that one of these files now exists:
   ```
   .github/copilot-instructions.md
   ```
   or
   ```
   AGENTS.md
   ```

   If `/init` created `AGENTS.md`, don't assume it is "wrong." Decide based on the job:

   - Keep **`.github/copilot-instructions.md`** when you want repo-wide GitHub Copilot standards
   - Keep **`AGENTS.md`** when the content reads like agent operating guidance that could work across tools
   - Keep **both** when you want a GitHub-wide baseline plus a portable agent playbook

   💡 **Good heuristic:** Commands, test steps, and PR conventions often belong in `AGENTS.md`. Coding standards and repository-wide GitHub guidance usually belong in `.github/copilot-instructions.md`.

#### ✅ Success Criteria

- [ ] Ran `/init` command successfully in Copilot Chat
- [ ] Agent discovered project tech stack (React, Express, SQLite)
- [ ] Generated instructions file exists (`.github/copilot-instructions.md` or `AGENTS.md`)
- [ ] Identified 2-3 items that need refinement (preparation for Exercise 1.1)
- [ ] Understood the difference between AI-generated baseline and team-specific customization
- [ ] Chose intentionally whether the generated content belongs in `.github/copilot-instructions.md`, `AGENTS.md`, or both

#### 💡 Understanding /init

The `/init` command is implemented as a contributed prompt file, which means:

- **It's customizable:** You can modify its behavior by editing the underlying prompt
- **It's context-aware:** It uses `@workspace` internally to analyze your entire project
- **It's iterative:** You can run it again after making changes to update instructions
- **It respects existing files:** If instructions already exist, it will update rather than overwrite

**When to re-run /init:**
- After major architectural changes
- When adding new languages or frameworks
- When project conventions evolve significantly

**What `/init` will not decide for you:**
- Whether GitHub-specific standards belong in `.github/copilot-instructions.md`
- Whether directory-local agent workflow guidance belongs in `AGENTS.md`
- Whether you need extra `.instructions.md` files for frontend, backend, tests, or docs

#### 🧠 Mindful Moment: AI-Generated vs. Human-Refined

**The /init output is a starting point, not the final product.**

Think of `/init` like having a new team member analyze your codebase on their first day. They'll identify obvious patterns and structure, but they won't know:
- Why you chose certain conventions over others
- Team-specific preferences that aren't visible in code
- Historical context ("we use Pattern X because Pattern Y caused issues")
- Security requirements not encoded in the codebase

The next exercises (1.1, 1.2) will add this human knowledge layer.

#### 📚 Official Docs

- [VS Code: /init Command](https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_set-up-your-workspace-for-ai-with-init) — Generate workspace instructions from codebase analysis
- [VS Code: Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions) — Complete guide to instruction files

---

## 🔗 What You Built

**In this exercise:**
- AI-generated baseline instructions from codebase analysis
- Foundation for refinement in subsequent exercises

**How it compounds:**

| This Exercise | Next Exercises | Combined Power |
|---------------|----------------|----------------|
| `/init` discovers patterns | Exercise 1.1 adds architecture context | Complete structural understanding |
| AI identifies conventions | Exercise 1.2 adds team preferences | Baseline + customization |
| Systematic codebase scan | Human review adds judgment | 90% discovery + 100% accuracy |

---

## ➡️ Next Up

**[Exercise 1.1: Create ARCHITECTURE.md](exercise-1.1.md)** — Add the structural context that `/init` can't discover on its own.

> *"The AI found our patterns—now let's document why they exist."*
> — David, ready to add architectural context

---
