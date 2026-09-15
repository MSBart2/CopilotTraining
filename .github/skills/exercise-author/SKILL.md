---
name: exercise-author
description: Reads a module's README.md, identifies missing exercise files from the planning table, and creates standalone exercise files using TEMPLATE.md format. Use when exercises are planned but not yet implemented as individual files.
infer: true
---

# Exercise Author Skill

You generate missing exercise files from a module's README.md planning table.

## Judgment and Transfer Contract

Apply the universal contract in `AGENTS.md`. Preserve the plan's selected judgment lenses through an attempt → inspect → adjust → rerun → validate loop. End with a bounded own-work application, observable evidence, and a review owner. Do not force every lens into every exercise.

## When to Use This Skill

Invoke this skill when:

- A module README.md has an exercise planning table but missing exercise files
- User asks to "create missing exercises" or "generate exercise files"
- User points to a module directory and wants all planned exercises implemented

**Example invocations:**

- "@exercise-author create missing exercises for module 99"
- "Generate all exercise files for workshop/06-custom-agents/"
- "Look at module 5 and create any exercises that don't exist yet"

## How It Works

### Step 1: Read Module README.md

1. Locate the module directory (e.g., `workshop/04-agent-skills/`)
2. Read the `README.md` file
3. Find the "📋 Exercise Planning Table" section
4. Parse each row to extract:
   - Exercise number (e.g., "99.1", "99.2")
   - Exercise filename from link (e.g., "exercise-01.md")
   - Exercise title
   - Lead persona
   - Support personas
   - Problem description with metrics
   - Solution description
   - Key metrics (before→after)
   - Artifacts created

### Step 2: Check Which Files Exist

For each exercise in the planning table:

1. Check if the file exists in the module directory
2. If the file exists, skip it
3. If the file is missing, add to creation list

### Step 3: Create Missing Exercise Files

For each missing exercise file:

1. **Use the TEMPLATE.md structure** from `.github/skills/exercise-author/TEMPLATE.md`

2. **Fill in the template with data from the planning table:**
   - Exercise number and title from table
   - Lead persona
   - Support personas
   - Problem metrics from "Problem" column
   - Solution approach from "Solution" column
   - Before/After metrics from "Key Metrics" column
   - Artifacts from "Artifacts" column

3. **Generate realistic content:**
   - 📖 The Challenge: 2-3 paragraphs showing the problem through persona lenses
   - 🔄 The Transformation: Table with Before/After scenarios using metrics from planning table
   - 🎯 Your Goal: Single sentence objective derived from solution
   - 📋 Steps: 3-4 detailed steps to implement the solution
   - ✅ Success Criteria: 3-4 checkboxes for verifiable outcomes
   - 📚 Official Docs: 2-3 relevant documentation links
   - 🔗 What You Built: List artifacts with purposes
   - ➡️ Next Up: Link to next exercise or module
   - A validation loop in which participants run or inspect the result, record what happened, and explain one adjustment
   - Apply It to Your Work: choose the two relevant judgment prompts and name one bounded real-work application

4. **Create the file** at `workshop/[module-dir]/[exercise-filename]`

## Important Guidelines

### Metrics Must Be Concrete

Every Before/After comparison must include:

- **Time metrics** (e.g., "45 minutes → 5 minutes")
- **Count metrics** (e.g., "12 violations → 0 violations")
- **Round/cycle metrics** (e.g., "3 review rounds → 1 round")

Use the metrics from the planning table's "Key Metrics" column.

Treat planned improvements as targets until the participant runs the exercise. Include the baseline measurement and the exact command, inspection, or behavior used to validate the target. Never invent an observed result.

### Persona Voice Authenticity

Write in the persona's voice (see `workshop/00-orientation/PERSONAS.md` and its linked profiles):

- **Sarah (Skeptical Senior)**: ROI-focused, validates with metrics, "I tested this by..."
- **David (Seasoned Architect)**: Expertise validation, AI amplifies experience
- **Marcus (DevOps Developer)**: Infrastructure focus, workflow friction removal
- **Elena (Quality Champion)**: Quality validation, edge case coverage
- **Rafael (Product Visionary)**: Business value, stakeholder communication
- **Jessica (Eager Junior)**: Quiet determination, learning through explanation and visible evidence

### File Structure

Each exercise file must:

1. Start with `# Exercise N.X: [Title]`
2. Include all sections from TEMPLATE.md
3. Use proper emoji vocabulary (📖, ❌, ✨, 🎯, 📋, ✅, 📚, 🔗, ➡️)
4. Have horizontal rules (`---`) between major sections
5. Reference artifacts created (from planning table's "Artifacts" column)

### Official Documentation Links

Prioritize documentation in this order:

1. VS Code Copilot docs (for editor features)
2. GitHub Docs (for Copilot concepts, best practices)
3. Microsoft Learn (for Azure/enterprise features if relevant)

Never use third-party blog posts as primary documentation.

### Example File Generation

**CRITICAL**: Whenever an exercise asks users to create a file, automatically generate a reference implementation in `examples/completed-config/` to provide copy-paste scaffolding and validation.

#### Detecting File Creation Instructions

Scan exercise content (especially Steps section) for patterns indicating file creation:

- "Create `.github/instructions/frontend.instructions.md`"
- "Add `docs/ARCHITECTURE.md`"
- "Create a new file at `path/to/file.ext`"
- "Set up `.github/agents/feature-plan.agent.md`"
- Artifacts listed in planning table's "Artifacts" column

#### Example File Location Mapping

Mirror the repository structure in `examples/completed-config/`:

| User Creates                                    | Example Location                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| `.github/copilot-instructions.md`               | `examples/completed-config/.github/copilot-instructions.md`               |
| `.github/instructions/frontend.instructions.md` | `examples/completed-config/.github/instructions/frontend.instructions.md` |
| `.github/prompts/test-suite.prompt.md`          | `examples/completed-config/.github/prompts/test-suite.prompt.md`          |
| `.github/skills/api-endpoint-design/SKILL.md`   | `examples/completed-config/.github/skills/api-endpoint-design/SKILL.md`   |
| `.github/agents/feature-plan.agent.md`          | `examples/completed-config/.github/agents/feature-plan.agent.md`          |
| `.github/hooks/security.json`                   | `examples/completed-config/hooks/security.json`                           |
| `fanhub/docs/ARCHITECTURE.md`                   | `examples/completed-config/docs/ARCHITECTURE.md`                          |

**Note:** `.github/` maps to `examples/completed-config/.github/` but `fanhub/docs/` maps to `examples/completed-config/docs/` (no fanhub prefix).

#### Example Content Generation Guidelines

Create **complete, realistic implementations** that:

1. **Match the exercise's learning objectives** — Demonstrate the exact technique being taught
2. **Use persona-specific scenarios** — Reference FanHub domain (TV shows, characters, episodes)
3. **Include inline explanations** — Add comments/notes explaining key decisions
4. **Show concrete patterns** — No placeholders like `[YOUR CODE HERE]` or `TODO: implement`
5. **Reflect module progression** — Later modules build on earlier artifacts

#### Auto-Insert Compare Your Work Section

When exercises involve file creation, automatically add this to the Success Criteria section:

```markdown
> 📂 **Compare Your Work**: [`examples/completed-config/{relative-path}`](../../examples/completed-config/{relative-path})
```

**Path calculation rules:**

- Use relative path from module directory to examples folder (typically `../../examples/`)
- Include the full path within `completed-config/`
- Link text should show the path for clarity

#### Example File Metadata

Add frontmatter comments to generated example files linking back to source exercise:

```markdown
<!-- Reference implementation for Module X, Exercise X.Y: [Title] -->
<!-- This example demonstrates: [brief description of what's being taught] -->

[Actual content starts here]
```

## Example Workflow

User says: "@exercise-author create missing exercises for module 99"

You:

1. Read `workshop/04-agent-skills/README.md`
2. Parse exercise planning table
3. Check which files exist:
   - `exercise-01.md` ✅ exists
   - `exercise-02.md` ❌ missing
   - `exercise-03.md` ❌ missing
4. Create `workshop/04-agent-skills/exercise-02.md` using planning table data + TEMPLATE.md structure
5. **Detect file creation instructions** in exercise-02.md:
   - Step 2 says "Create `.github/skills/bug-analyzer/SKILL.md`"
   - Artifacts list includes `.github/skills/bug-analyzer/examples/sample-bug.js`
6. **Generate example files**:
   - Create `examples/completed-config/.github/skills/bug-analyzer/SKILL.md` with complete skill definition
   - Create `examples/completed-config/.github/skills/bug-analyzer/examples/sample-bug.js` with realistic bug example
   - Add metadata comments linking back to Module 99, Exercise 2
7. **Add Compare Your Work section** to exercise-02.md Success Criteria
8. Create `workshop/04-agent-skills/exercise-03.md` (repeat steps 5-7)
9. Report: "Created 2 missing exercises and 3 example files"

## Quality Checklist

Before creating each file, verify:

- [ ] All metrics from planning table are included
- [ ] Lead and support personas match the table
- [ ] Steps are actionable (commands, paths, expected results)
- [ ] Success criteria are verifiable checkboxes
- [ ] Artifacts listed in planning table appear in "What You Built"
- [ ] Official docs links are first-party (GitHub, VS Code, Microsoft)
- [ ] Persona voice is authentic to their background
- [ ] Before/After transformation shows measurable improvement
- [ ] Participants produce evidence, interpret it, and make or explain one adjustment
- [ ] "Apply It to Your Work" transfers the practice to a bounded task, evidence signal, and review owner
- [ ] **Example files generated** for all artifacts users create
- [ ] **Compare Your Work sections** added when files are created
