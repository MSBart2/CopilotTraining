---
status: active
updated: 2026-06-30
section: "Developers"
references:
  - url: https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode
    label: "Copilot agent mode in VS Code"
    verified: 2026-06-30
  - url: https://code.visualstudio.com/docs/copilot/copilot-customization
    label: "Customizing GitHub Copilot in VS Code"
    verified: 2026-06-30
  - url: https://code.visualstudio.com/docs/copilot/copilot-chat
    label: "GitHub Copilot Chat in VS Code"
    verified: 2026-06-30
---

# The Agent Dev Loop: From Repo to Feature with Copilot in VS Code

> **The Question This Talk Answers:**
> *"How do we go from opening an unfamiliar repo to a fully implemented, risk-reviewed feature — and build reusable team tools along the way?"*

**Duration:** 45 minutes | **Target Audience:** Developers using GitHub Copilot in VS Code

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Any team using Copilot in VS Code applies this loop immediately — no new tools, no infrastructure changes |
| **Compelling** | 🟢 High | The loop produces lasting team assets (prompts, skills, plans) that compound in value across every feature |
| **Actionable** | 🟢 High | Four working artifacts copy into any repo today; the full loop completes in under two hours |

**Overall Status:** 🟢 Ready to use

---

## The Opportunity

### What's Now Possible

- **Instant workspace context**
  A single `/init` prompt analyzes a repo and generates a thorough `AGENTS.md` — giving Copilot the project knowledge it needs to make accurate, convention-aware suggestions from the first message.

- **Reusable evaluation prompts**
  Work item analysis that once required a senior developer's 20 minutes runs as a structured prompt in seconds, surfacing every completeness gap before a line of code is written.

- **Team-encoded skills**
  Domain knowledge that lives in one developer's head — "here's how we add a page to this SPA" — becomes a callable `.skill.md` file that any developer on the team invokes by name.

- **Risk-reviewed plans**
  Before implementation begins, a plan gets stress-tested for technical and delivery risk, producing a triage table that makes the go/no-go call explicit.

### The Emerging Practice

The most capable Copilot users aren't using it as faster autocomplete. They're running a loop: **orient → evaluate → build tools → plan → risk-check → implement**. Each pass through the loop produces both a working feature and a set of reusable artifacts — prompts and skills — that make the next iteration faster.

The nonogram puzzle SPA we walk through here is the vehicle, not the destination. It demonstrates that the loop works on any codebase, any domain, any team. The reusable assets accumulate across projects.

What makes this pattern compelling is the compounding return. The first time a team encodes "how we add a page" as a skill, it costs a few minutes. Every subsequent developer who invokes that skill gets the benefit of accumulated conventions, skips the wrong turns, and ships consistent code — without a senior developer in the loop.

---

## How It Works: The Agent Dev Loop

### What It Does

Copilot agent mode in VS Code supports a set of slash commands and customization files that turn Copilot into a project-aware collaborator.[^1] The agent dev loop chains five of these capabilities into a repeatable workflow that takes a developer from "I just cloned this repo" to "I have a merged, risk-reviewed feature."

### Key Capabilities

- **`/init` (workspace analysis prompt)**: Analyzes the workspace and generates an `AGENTS.md` with project context, tech stack, commands, and conventions[^2]
- **`.prompt.md` files**: Reusable, parameterized prompt templates stored in the repo, invokable as slash commands in Copilot Chat[^3]
- **`.skill.md` files (custom skills)**: Domain-specific agents that encode team patterns and project conventions[^2]
- **`/plan`**: Generates a structured implementation plan before any code is written — tasks, files, scope, and open questions[^1]
- **Plan review prompts**: Structured risk triage of plans that separates genuine blockers from noise before committing to implementation

### Architecture Overview

The loop has a natural sequence: context first, then evaluation, then tooling, then planning, then implementation. Each step feeds the next. The `AGENTS.md` generated during initialization improves every subsequent interaction. The prompts and skills created during feature work accumulate into a growing team toolkit.

All artifacts live in the repo. Prompts go in `.github/prompts/`. Skills live in `.github/skills/`. Plans are Markdown files committed alongside code. The entire workflow is version-controlled and shareable.[^3]

Custom prompts and skills are invoked as slash commands once saved to recognized locations. A file at `.github/prompts/evaluate-issue.prompt.md` becomes `/evaluate-issue` in Copilot Chat. A skill at `.github/skills/create-spa-page.skill.md` becomes `/create-spa-page`. The naming is the invocation.

**Official Documentation:**
- 📖 [Copilot agent mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) — Agent mode, slash commands, tool invocation, and the `/plan` capability[^1]
- 📖 [Customizing GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization) — `.prompt.md` and `.skill.md` file formats, storage locations, and invocation patterns[^2]
- 📖 [GitHub Copilot Chat in VS Code](https://code.visualstudio.com/docs/copilot/copilot-chat) — Chat interface, participants, and the slash command system[^3]

---

## 📦 Key Artifacts

### Primary Artifacts

- **`AGENTS.md`** — Workspace context file generated by the `/init` prompt; improves all subsequent Copilot interactions
- **`evaluate-issue.prompt.md`** — Reusable prompt that checks any bug report or feature request for completeness and actionability before work begins
- **`create-spa-page.skill.md`** — Domain-encoded skill that creates a fully wired new page in the SPA (component + CSS module + route + nav link + test)
- **`review-plan.prompt.md`** — Prompt that stress-tests a plan for technical and delivery risk and returns a severity-sorted triage table

### Supporting Files

- **[`examples/nonogram-plan.md`](examples/nonogram-plan.md)** — Complete example plan output for the alphabet puzzle navigation feature referenced in Step 4

---

<!-- 🎬 MAJOR SECTION: Workspace Context -->

## Step 1: Workspace Context First

Copilot is only as good as the context it receives. Walking into a new repo and immediately asking Copilot to write code is like asking a contractor to start framing before the blueprints arrive. The `/init` prompt generates the blueprints.

### Sending the `/init` Prompt

In VS Code Copilot Chat, send the following as a message — or save it as `.github/prompts/init.prompt.md` to invoke it as `/init`:

```
Analyze this entire workspace and generate thorough guidance for agents.

Include:
- A concise project overview (purpose, domain, target users)
- The tech stack — languages, frameworks, libraries, and package manager
- The folder structure with a one-line description of each major directory
- The exact build, run, test, lint, and debug commands (reference real scripts, not generic examples)
- Coding conventions and patterns actually used (naming, formatting, error handling)
- Key architectural decisions and how major components interact
- Setup steps, required environment variables, or non-obvious gotchas a new contributor must know
- Pointers to entry-point files for common tasks (adding a route, component, or test)

Keep the output concise, specific to this repository, and avoid generic boilerplate advice.
```

Copilot analyzes the workspace and produces a draft `AGENTS.md`. Review it, fill any gaps, and commit it to the repo root.

### Example Output: `AGENTS.md` for a Nonogram SPA

```markdown
# Workspace Agent Instructions

## Project Overview
A browser-based nonogram (picross) puzzle SPA. Players solve logic grid puzzles from 5×5
to 20×20. Target users: puzzle enthusiasts and educators using nonograms in classroom settings.

## Tech Stack
- **Framework**: React 18 + TypeScript 5
- **Build**: Vite 5
- **Styling**: CSS Modules + CSS custom properties (no Tailwind)
- **State**: React Context + useReducer (no Redux)
- **Testing**: Vitest + React Testing Library
- **Package manager**: npm

## Project Structure
src/
  components/   — Shared UI components (Nav, Button, Modal)
  pages/        — One folder per route (Home, Puzzle, Settings)
  hooks/        — Custom hooks (usePuzzle, useTimer, useLocalStorage)
  utils/        — Pure functions (solver, validator, generator)
  types/        — TypeScript interfaces and enums
  App.tsx       — Root component and React Router v6 config
  main.tsx      — Vite entry point

## Commands
npm run dev      — Start Vite dev server (localhost:5173)
npm run build    — Production build to dist/
npm run test     — Run Vitest in watch mode
npm run lint     — ESLint + TypeScript type check
npm run preview  — Preview production build locally

## Conventions
- Components: PascalCase, co-located with .module.css and .test.tsx
- Hooks: camelCase, prefix with 'use'
- Types: PascalCase interfaces, exported from src/types/index.ts
- Error handling: Results pattern (not thrown exceptions) for puzzle logic
- No default exports except pages — named exports everywhere else

## Key Entry Points
- Adding a new page: src/pages/ + new route in App.tsx + nav link in components/Nav/Nav.tsx
- Adding a hook: src/hooks/ + export from src/hooks/index.ts
- Adding a utility: src/utils/ + unit test in same folder
```

With this file committed, every subsequent Copilot interaction knows the conventions, the entry points, and the test patterns. The `AGENTS.md` improves accuracy for *every* prompt that follows — it's a permanent multiplier, not a one-time cost.[^4]

---

<!-- 🎬 MAJOR SECTION: Evaluating Work Items -->

## Step 2: Evaluating Work Items with Prompts

A vague ticket is a trap. "Puzzles don't show me what I've done wrong, only a 'keep trying' message" is a real complaint — but it doesn't say which cells were wrong, what the expected feedback is, whether this is desktop-only, or when it regressed. The `/evaluate-issue` prompt fills those gaps before implementation begins.[^5]

### Creating the Prompt

Ask Copilot to generate the prompt file:

```
/create-prompt this prompt should evaluate a bug or issue or feature request
for completeness and correctness.
```

Save the output to `.github/prompts/evaluate-issue.prompt.md`.

### The `evaluate-issue.prompt.md` Artifact

```markdown
---
description: Evaluate a bug report, feature request, or work item for
  completeness and actionability before implementation begins.
---

Review the following issue for completeness and correctness.

## For Bug Reports, check:
- [ ] Problem statement: Is the unexpected behavior clearly described?
- [ ] Expected behavior: Is what the app does instead clearly stated?
- [ ] Reproduction steps: Are numbered, repeatable steps provided?
- [ ] Environment context: Browser, OS, app version noted?
- [ ] Severity or impact: How many users are affected? Is it a blocker?

## For Feature Requests, check:
- [ ] User goal: Is the underlying need (not just the solution) stated?
- [ ] Acceptance criteria: Are there testable success conditions?
- [ ] Scope: Is it clear what is in and out of scope?
- [ ] Priority signals: Business value or urgency indicated?

## Output Format

Return a structured evaluation:

**Type**: Bug / Feature / Enhancement / Unclear

**Completeness**: X of 5 criteria present

**Missing elements** (each with a one-line explanation of why it matters):
- [gap 1]
- [gap 2]

**Suggested additions** (proposed content for each gap):
- [gap 1]: "[suggested text]"
- [gap 2]: "[suggested text]"

**Ready to implement?**: Yes / No
**Rationale**: [one sentence]

---

Issue to evaluate:

{{ISSUE}}
```

### Running It

```
/evaluate-issue "Puzzles don't show me what I've done wrong, only a 'keep trying' message."
```

Copilot responds with a structured evaluation — in this case identifying that the issue is missing expected behavior (what feedback *should* appear instead), reproduction steps, and severity. Those gaps go back to the reporter as specific questions, before a developer touches any code.

The pattern generalizes. This same prompt works for any issue in any project. The team doesn't carry the checklist in their heads — it's encoded in the file.

---

<!-- 🎬 MAJOR SECTION: Skills as Team Tooling -->

## Step 3: Skills as Team Tooling

Prompts answer "evaluate this thing." Skills answer "do this thing." The difference is that skills are parameterized, domain-specific actions that encode the team's conventions — not just instructions for the model, but institutional knowledge made callable.[^6]

### Creating a Skill

```
/create-skill to create new pages in the SPA app
```

Copilot generates a `.skill.md` file. Save it to `.github/skills/create-spa-page.skill.md`.

### The `create-spa-page.skill.md` Artifact

```markdown
---
description: Create a new page in the SPA, including the component, CSS module,
  route entry, navigation link, and basic test.
---

Create a new page in the nonogram SPA application.

## Files to create

1. **Page component**: `src/pages/{{PAGE_NAME}}/{{PAGE_NAME}}.tsx`
2. **CSS module**: `src/pages/{{PAGE_NAME}}/{{PAGE_NAME}}.module.css`
3. **Test file**: `src/pages/{{PAGE_NAME}}/{{PAGE_NAME}}.test.tsx`

## Files to update

4. **Route**: Add a `<Route>` entry in `src/App.tsx` following the React Router v6
   pattern already present
5. **Navigation**: Add a `<NavLink>` in `src/components/Nav/Nav.tsx` following
   the existing link pattern

## Conventions to follow

- Match the structure of `src/pages/Home/Home.tsx` as the reference implementation
- Use PascalCase for component and file names
- Use CSS Modules: `import styles from './{{PAGE_NAME}}.module.css'`
- Page wrapper: `<div className={styles.page}>`
- Named exports only (no default export)
- Test file: render test + one interaction test using React Testing Library

## Input

PAGE_NAME: {{PAGE_NAME}}
PAGE_DESCRIPTION: {{PAGE_DESCRIPTION}}
```

### Running It

```
/create-spa-page Add a "how to play nonograms" page that is linked to from the home page
```

Copilot creates all five files — component, CSS module, test, route entry, and nav link — following the project conventions encoded in the skill. A developer unfamiliar with the codebase gets the same output as one who has been on the project for a year.

**The compounding value.** After the first skill is created, the pattern is clear. Teams accumulate a library: `create-spa-page`, `add-puzzle-type`, `create-api-route`, `add-localization-key`. Each skill encodes a decision that doesn't need to be made again.[^6]

---

<!-- 🎬 MAJOR SECTION: Plan-Driven Implementation -->

## Step 4: Plan-Driven Implementation

Agent mode's `/plan` command separates "what are we building" from "write the code." Before writing implementation, we generate a structured breakdown of the work — tasks, files, scope, and open questions — creating a coordination artifact the whole team can read and pressure-test.[^1]

### Making a Plan

```
/plan let's add a navigation item that automatically generates a 10x10 puzzle
for each letter of the alphabet. ask questions if you aren't clear on what to do.
```

Copilot asks clarifying questions (Are the puzzles pre-generated or dynamic? Does the nav show all 26 letters or a single "Alphabet" entry?) and then generates a structured plan:

### Example Plan: Alphabet Puzzle Navigator

```markdown
# Plan: Alphabet Puzzle Navigation

## Goal
Add a navigation section giving access to a 10×10 nonogram puzzle for each letter A–Z.
Each letter maps to a unique, deterministic puzzle generated from the letter's shape.

## Clarifications Applied
- Puzzles are generated at runtime (deterministic seed = letter char code)
- Navigation shows a single "Alphabet" entry that routes to an index page
- Index page shows A–Z as a grid of letter tiles
- Each tile links to `/puzzle/alpha/:letter`

## Tasks

### 1. Puzzle Generator Update
- [ ] Add `generateLetterPuzzle(letter: string): PuzzleGrid` to `src/utils/generator.ts`
- [ ] Use letter charCode as deterministic seed for the puzzle shape
- [ ] Add unit tests for all 26 letters in `src/utils/generator.test.ts`

### 2. New Pages
- [ ] Create `AlphabetIndex` page at `src/pages/AlphabetIndex/`
      — Grid of 26 letter tiles (A–Z), each linking to `/puzzle/alpha/:letter`
- [ ] Extend `Puzzle` page to accept `/puzzle/alpha/:letter` route
      — Read `:letter` param, call `generateLetterPuzzle()`, render puzzle

### 3. Routing
- [ ] Add route `/alphabet` → `AlphabetIndex` in `src/App.tsx`
- [ ] Add route `/puzzle/alpha/:letter` → `Puzzle` in `src/App.tsx`

### 4. Navigation
- [ ] Add "Alphabet" nav link in `src/components/Nav/Nav.tsx`

### 5. Tests
- [ ] AlphabetIndex: render test + letter count test
- [ ] Puzzle with `:letter` param: render test + puzzle generation integration test

## Estimated scope
~8 files touched, ~200 lines net new code

## Open questions
- Should invalid letter params (e.g., `/puzzle/alpha/1`) show an error page or redirect?
- Should completed alphabet puzzles persist to localStorage?
```

A plan like this makes the implementation reviewable before it starts. Any developer on the team can read it and flag issues — which is exactly the next step.

---

<!-- 🎬 MAJOR SECTION: Risk Before Code -->

## Step 5: Risk Before Code

A plan is a hypothesis, not a commitment. The `/review-plan` prompt treats it that way — running a structured risk triage that separates genuine blockers from manageable concerns before any implementation begins.

### Creating the Prompt

```
/create-prompt "review plan". a prompt that reviews a plan file for technical and
delivery risks. run triage and return high/med/low risks to both implementation and
delivery. report the findings in a markdown table so that it's easy to read.
```

Save the output to `.github/prompts/review-plan.prompt.md`.

### The `review-plan.prompt.md` Artifact

```markdown
---
description: Review a plan file for technical and delivery risks. Returns a
  severity-sorted triage table and a go/no-go recommendation.
---

Review the following implementation plan for risk. Evaluate both dimensions:

**Implementation Risks** — Technical concerns that could prevent or complicate delivery:
- Missing architectural decisions or unresolved design questions
- Unknown or unproven integrations and dependencies
- Test coverage gaps or hard-to-test logic
- Performance, security, or accessibility blind spots
- Assumptions that may not hold in the actual codebase

**Delivery Risks** — Scope, timing, or coordination concerns:
- Scope that is likely to grow during implementation
- Missing or ambiguous acceptance criteria
- External dependencies (APIs, data, other teams, environments)
- No rollback or feature-flag strategy for risky changes
- Skill or knowledge gaps on the implementing team

## Output Format

Return a markdown table, sorted by severity (High first):

| Risk | Type | Severity | Description | Suggested Mitigation |
|------|------|----------|-------------|----------------------|
| [Short name] | Implementation / Delivery | High / Med / Low | [What could go wrong and why] | [Specific guard or action] |

Then provide:

**Top 3 risks to address before starting implementation**

**Recommendation**: Go / No-go
**Rationale**: [one sentence]

---

Plan to review:

{{PLAN}}
```

### What the Review Surfaces

Running `/review-plan` against the alphabet puzzle plan above produces:

| Risk | Type | Severity | Description | Suggested Mitigation |
|------|------|----------|-------------|----------------------|
| Puzzle determinism algorithm | Implementation | **High** | "Deterministic from charCode" is underspecified — same seed must produce identical grids across sessions and builds | Define and test the seed algorithm explicitly before Tasks 2–5 depend on it |
| Invalid param handling | Delivery | **Med** | Plan leaves open whether `/puzzle/alpha/1` errors or redirects — a UX decision that causes rework if resolved late | Add explicit acceptance criteria to the plan before starting Task 3 |
| localStorage persistence | Delivery | **Med** | Open question in the plan; answered "yes" late, it adds a cross-cutting concern across multiple components | Decide before Task 3 (Routing); update plan scope if in scope |
| 26-puzzle test matrix | Implementation | **Low** | Testing all 26 letters sounds cheap but could be slow if the generator is complex | Use snapshot tests for determinism; profile generator performance on first run |

**Top 3 risks:** Puzzle determinism algorithm, invalid param handling decision, localStorage scope.

**Recommendation:** No-go on current plan.
**Rationale:** The determinism algorithm must be specified before Tasks 2–5 can be implemented correctly — resolving it now avoids rework across all downstream tasks.

This is the loop's guard rail. The plan gets updated, the determinism question gets answered, and *then* implementation starts with confidence.

---

## 🎯 Mental Model Shift

> **The Core Insight:** The agent dev loop's real output isn't the feature — it's the growing toolkit of prompts, skills, and plans that make every future feature faster and more consistent.

### Move Toward (Embrace These Patterns)

- ✅ **Context before requests**: Always run the workspace analysis on a new repo before making substantive requests → Every subsequent prompt becomes more accurate and project-aware
- ✅ **Prompts as team standards**: Encode review checklists, evaluation criteria, and output formats in `.prompt.md` files → Standards become executable, not just documented
- ✅ **Skills as pattern libraries**: Use `/create-skill` to encode any "how we do this here" pattern → Domain knowledge accumulates in the repo, not in individuals
- ✅ **Plan before implement**: Generate and review a plan before writing implementation code → Scope is explicit, risks are visible, coordination is easier

### Move Away From (Retire These Habits)

- 🔄 **Ad-hoc issue review → structured evaluation**: Running tickets through the evaluation prompt surfaces completeness gaps before they become rework → less context-switching back to reporters mid-sprint
- 🔄 **Tribal knowledge → encoded skills**: When someone explains "here's how we do X," turning it into a skill file makes it invokable, not just memorable → new developers benefit immediately
- 🔄 **Code-first → plan-first**: Starting with the plan and reviewing for risk addresses concerns when they're cheap to fix → risk surfaces before code review, not during

### Move Against (Active Resistance)

- 🛑 **Skipping workspace analysis to save time**: Copilot without context makes generic suggestions that conflict with project conventions → more rework than the analysis would have cost
- 🛑 **Treating prompts as one-offs**: Writing a great prompt in chat and not saving it as a `.prompt.md` means the next developer starts from zero — the team's accumulated knowledge evaporates

> **What This Looks Like:** A developer joins a team, clones the repo, runs the workspace analysis, and thirty seconds later Copilot knows the tech stack, naming conventions, entry points, and test patterns. Their first PR follows project conventions without a senior review cycle to correct the basics.

---

## When to Use This Pattern

### Decision Tree

```
Q: Is this a new or unfamiliar codebase?
├─ Yes → Run /init (workspace analysis) before any other prompts
│
Q: Is there a work item or ticket to implement?
├─ Vague or incomplete → Run /evaluate-issue first; get gaps filled before starting
└─ Clear and complete → Proceed to /plan
│
Q: Is the feature more than ~1 hour of work?
├─ Yes → Generate a /plan, then run /review-plan before implementation
└─ No → Implement directly with Copilot Chat; skip the plan step
│
Q: Does the feature follow a pattern used before?
├─ Pattern already encoded as a skill → Invoke the skill
└─ No skill exists → Implement manually, then /create-skill to encode it
```

### Use This Pattern When

- Onboarding a developer to an existing codebase (workspace analysis is the first move)
- Implementing a feature from a ticket or work item (evaluate + plan before code)
- Any work that involves a structural pattern the team repeats (use or create a skill)
- Features with more than ~200 lines of change (plan + risk review before implementation)

### Don't Use This Pattern When

- Making a small, localized bug fix with a clear reproduction case — skip planning, go straight to implementation
- Exploring or prototyping new ideas — `/plan` adds overhead when the goal is discovery, not delivery
- The codebase already has a mature `AGENTS.md` and skills library — skip workspace analysis, start at `/evaluate-issue`

### Comparison with Related Approaches

| Aspect | Agent Dev Loop | Ad-hoc Copilot Chat | GitHub Copilot Coding Agent |
|--------|---------------|---------------------|------------------------------|
| **Best For** | Feature work on a known codebase | Exploration, one-off tasks | Issue-to-PR automation on simple, well-specified tasks |
| **Key Asset** | Accumulated prompt/skill library | None (ephemeral) | GitHub Actions workflows |
| **Risk Handling** | Explicit plan review step | None | CI validation after the fact |
| **Team Benefit** | Shared artifacts in repo | Individual only | Shared workflows in `.github/` |
| **Ramp-up** | 30 min for workspace analysis | Zero | 2–3 hours for workflow setup |

---

## Real-World Use Cases

### Use Case 1: New Developer Onboarding

**Before:** A new developer spent the first week asking teammates "where does X go?" and "what's the naming convention for Y?" — interrupting others and shipping code that failed review for style violations.

**With the loop:** Workspace analysis generates `AGENTS.md` on day one. Copilot answers convention questions inline. The first PR passes review on conventions; reviewers focus on logic, not style. **First merged PR: down from 5 days to 2.**

### Use Case 2: Taming a Backlog of Vague Tickets

**Before:** A backlog of 40 tickets had 15 with incomplete information. Developers kept starting work, hitting gaps, and context-switching back to the reporter.

**With the loop:** The `/evaluate-issue` prompt runs against each ticket in a batch. The 15 incomplete tickets are flagged with specific missing fields. Reporters fill the gaps in one pass. **Mid-sprint context switches from incomplete tickets: eliminated.**

### Use Case 3: Accelerating a Complex Feature

**Before:** A developer estimated 3 days for a complex navigation feature. Midway through, they discovered an unresolved architectural question that required a design review, adding 2 days.

**With the loop:** `/plan` surfaces the architectural question before implementation. The design review happens on the plan, not on partially-written code. **Architectural rework eliminated; feature shipped on the original estimate.**

### Use Case 4: Scaling a Skill Library

**Before:** Three developers on a team each solved "add a new page" differently. Code review caught the inconsistencies, but added back-and-forth. A standards document existed but wasn't followed.

**With the loop:** `/create-skill` turns the standard into the path of least resistance. All three developers invoke the same skill. **Page creation consistency: 100% the following sprint; structural review comments: zero.**

---

## What We Can Do Today

### In 15 Minutes

- [ ] Clone any repo and send the `/init` prompt to Copilot Chat — see what it produces as a draft `AGENTS.md`
- [ ] Review the generated output and fill any gaps (tech stack, commands, conventions it missed)
- [ ] Commit the `AGENTS.md` to the repo root

### In 1 Hour

- [ ] Save the `evaluate-issue.prompt.md` artifact above to `.github/prompts/` in the current project
- [ ] Run it against 3–5 real tickets from the current backlog
- [ ] Note which gaps appear most often — those are the checklist items the team forgets most
- [ ] Save the `review-plan.prompt.md` artifact above to `.github/prompts/`

### In 2–4 Hours

- [ ] Identify one recurring structural pattern in the codebase ("how we add a route", "how we create a service", "how we wire a test")
- [ ] Run `/create-skill` to encode it and save to `.github/skills/`
- [ ] Use `/plan` on the next non-trivial feature, then run `/review-plan` against the output
- [ ] After implementation, rerun the workspace analysis and update `AGENTS.md` to reflect what changed

---

## Related Patterns

- **[The Agentic Journey](../agentic-journey/README.md)** — The GitHub Actions / PR automation complement to this talk: where the agent dev loop covers the VS Code interactive workflow, the Agentic Journey covers the async CI pipeline that picks up after a PR is opened
- **[Agent Architecture](../agent-architecture/README.md)** — How the underlying Copilot agent processes context, manages the conversation window, and selects tools — useful background for understanding why `AGENTS.md` quality directly affects suggestion accuracy
- **[MCP Servers](../mcp-servers/README.md)** — Extending the loop with external tools: if skills encode team patterns, MCP servers encode external capabilities (databases, APIs, monitoring systems)

---

## 📎 References

### Official Documentation

[^1]: **[Copilot agent mode in VS Code](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)** — Agent mode overview, `/plan`, tool invocation, and autonomous task execution in VS Code Copilot Chat

[^2]: **[Customizing GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)** — `.prompt.md` and `.skill.md` file formats, recognized storage locations (`.github/prompts/`, `.github/skills/`), and how they become slash commands

[^3]: **[GitHub Copilot Chat in VS Code](https://code.visualstudio.com/docs/copilot/copilot-chat)** — Chat interface, slash command invocation, participants, and context management

[^4]: **[Copilot Instructions and Context](https://code.visualstudio.com/docs/copilot/copilot-instructions)** — How `AGENTS.md`, `.github/copilot-instructions.md`, and instruction files influence the model's project-aware responses

### Blog Posts & Announcements

[^5]: **[GitHub Copilot: Smarter Issue Resolution with Agent Mode](https://github.blog/changelog/2025-02-06-github-copilot-agent-mode-available-in-public-preview-in-vs-code/)** — Announcement of agent mode in VS Code with overview of the skill, plan, and instruction file capabilities

[^6]: **[Reusable Prompt Files in VS Code](https://code.visualstudio.com/blogs/2025/03/26/custom-instructions)** — Design rationale for `.prompt.md` and `.skill.md`, explaining how they differ from inline instructions and why they belong in version control

### Community & Discussions

[^7]: **[DietrichGebert/ponytail AGENTS.md](https://github.com/DietrichGebert/ponytail/blob/main/AGENTS.md)** — A real-world AGENTS.md for a production web app; referenced as a model for comprehensive workspace context files

[^8]: **[Prompt Engineering for GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)** — Principles behind writing effective prompts for Copilot; directly applicable to crafting `.prompt.md` files that produce consistent, accurate output
