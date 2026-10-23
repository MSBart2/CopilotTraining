# Exercise 4.1: Install `make-skill-template`

## 🔨 Exercise

### Exercise 4.1: Install `make-skill-template` — "From Blank-Page Setup to Repeatable Skill Scaffolding"

**Lead:** Sarah ⭐ | **Support:** David 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 2:45 PM on Monday. The team is ready to build its first real skill for the character-detail story arc. But there is still one annoying problem before the useful work begins:

- What does the folder structure look like?
- What belongs in `SKILL.md`?
- Which optional directories are worth creating now versus later?
- How do they avoid rebuilding the same skill scaffold from scratch every time?

The team already understands the idea of skills, but blank-page setup is still friction. Sarah knows they can teach Copilot specialized workflows, but David points out that the team can skip inventing the starter structure from memory when a strong community template already exists.

He realizes: *"Before we build our own character-detail skills, let's install a proven starter. `make-skill-template` from `github/awesome-copilot` can give us the right scaffolding so the next two exercises start faster and cleaner."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Every new skill starts from a blank folder. The team has to remember frontmatter rules, naming conventions, and optional directories before they can even start teaching a workflow. Total: 12 minutes of setup and second-guessing per skill scaffold. | The team installs `make-skill-template` from `github/awesome-copilot`, reviews its structure, and uses it as the starting point for future skills. New skills begin from a proven scaffold instead of a blank page. Total: 3 minutes to duplicate and adapt the template. |
| **Scaffold time:** 12 min/skill<br>**Blank-page friction:** high<br>**Starter quality:** inconsistent | **Scaffold time:** 3 min/skill<br>**Blank-page friction:** low<br>**Starter quality:** consistent |

**Time saved:** 9 minutes per skill × 3 skills = **27 minutes saved across this module**

#### 🎯 Your Goal

Install the `make-skill-template` skill from the `github/awesome-copilot` repository, study how it is structured, and use it as the bootstrap for the character-detail skills you will create next.

#### 📋 Steps

1. **Create the local skills directory if needed**

   ```bash
   mkdir -p .github/skills
   ```

2. **Install or copy the template skill**

   Use the `make-skill-template` folder from `github/awesome-copilot` and place it in:

   ```text
   .github/skills/make-skill-template/
   ```

   At minimum, bring over its `SKILL.md` file so the team has a reusable local copy of the template.

3. **Inspect what the template teaches**

   Read `SKILL.md` and identify the parts it standardizes:

   - required frontmatter (`name`, `description`)
   - recommended body structure
   - optional directories like `scripts/`, `references/`, `assets/`, and `templates/`
   - validation ideas such as matching the folder name to the skill name

4. **Practice the bootstrap workflow**

   Duplicate the template into a scratch folder name for your next skill idea and note what you would change first:

   - folder name
   - frontmatter
   - description keywords
   - supporting resources

5. **Verify that this improves the next exercise**

   Confirm that the team can start the next skill from a proven scaffold rather than creating every folder and section manually.

#### ✅ Success Criteria

- [ ] `make-skill-template` is available locally under `.github/skills/`
- [ ] The team understands what the template standardizes for future skills
- [ ] The template reduces blank-page setup for the next exercises
- [ ] The skill structure now feels reusable rather than improvised

#### 📚 Official Docs

- [Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [About Agent Skills (GitHub)](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)

---

## 🔗 What You Built

**In this exercise:**
- `.github/skills/make-skill-template/SKILL.md` — A reusable starter for future skills
- A repeatable bootstrap pattern for naming, structuring, and describing new skills
- A cleaner on-ramp for the character-detail skills coming next

**How it compounds:**

| Previous Modules | This Module | Combined Power |
|------------------|-------------|----------------|
| Module 3 taught the team to turn repeated requests into reusable prompt files | Module 4 starts by turning skill creation itself into a reusable setup pattern | The team reuses not just outcomes, but the creation workflow too |
| Earlier modules depended on stronger docs and prompts | This module now starts with a scaffold that makes future skills easier to build well | Better foundations reduce friction before the real capability work begins |

---

## ➡️ Next Up

**[Exercise 4.2: Character Change Test Workflow](exercise-4.2.md)** — The team now has a proven skill scaffold. Next: use that bootstrap to create a reusable skill for testing any character-detail change.

> *"Good — now we don't have to invent the shape of the skill. Let's use the template to build something the team will actually call every sprint."*
> — Sarah, handing off to Elena

---
