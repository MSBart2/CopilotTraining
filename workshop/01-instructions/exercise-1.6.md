# Exercise 1.6: Define Your Universe

## 🔨 Exercise

### Exercise 1.6: Define Your Universe — "Give Copilot the Mental Model"

**Lead:** Sarah ⭐ | **Support:** David 🤝 | **Time:** 15 min

#### 📖 The Challenge

It's 4:45 PM. Sarah's `copilot-instructions.md` is polished — coding standards, architecture context, path-specific rules, language guidance. Copilot handles the code beautifully. Then she opens a character bio page and asks Copilot to write a description for Gustavo Fring.

Copilot returns something technically correct but hollow. It calls him "a restaurant owner." It misses that he's the methodical, terrifying regional distributor for a drug cartel, hiding behind a fast-food franchise as cover. It doesn't know the show. The bio needs a full rewrite.

Sarah tracks it: every content task — character bio, episode description, lore entry — takes 5–8 minutes of re-explaining show context before Copilot can be useful. She's answered "What is Breaking Bad about?" in chat at least twelve times this week. Multiply that across a team of five working on content additions, and it's hours of repeated setup.

**David** connects it to a pattern he's seen in enterprise work: *"This is the same problem healthcare teams have with HIPAA terminology. Or fintech teams with regulatory definitions. Copilot doesn't know your domain. You have to tell it — and we want to tell it only once."*

Sarah realizes: *"The instructions file handles code context. I need a companion file that handles show context — a universe file that Copilot can consult whenever it's writing anything about the show."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Sarah re-explains show premise, characters, and canon facts in every content-related chat. Copilot produces generic descriptions that need full rewrites. | Copilot consults `docs/breaking-bad-universe.md` automatically. Character descriptions, episode summaries, and lore entries are accurate on the first pass. |
| **Content setup time:** 5–8 min/task re-explaining context | **Content setup time:** 0 min — universe context already loaded |
| **Rewrite rate:** ~80% of Copilot content drafts need major corrections | **Rewrite rate:** ~10% — minor tone adjustments only |
| **"What is Breaking Bad?" answers given:** 12 this week | **"What is Breaking Bad?" answers given:** 0 — it's in the file |

**Time saved:** 6 min avg × 15 content tasks/sprint = **90 min/sprint** = **39 hours/year** across the team — plus elimination of canon accuracy errors that reach production.

#### 🎯 Your Goal

Create a standalone `docs/[show]-universe.md` file that captures your show's premise, characters, terminology, and canon accuracy rules — then add a pointer section in `.github/copilot-instructions.md` linking to it. Copilot will consult this file automatically whenever it generates show-related content, giving you first-draft accuracy without repeated context setup.

#### 📋 Steps

1. **Open Agent mode and scaffold the universe file**

   In GitHub Copilot Chat, switch to **Agent mode** (the mode selector in the chat input). Paste the following prompt, substituting your show name and slug:

   ````
   I'm building a FanHub fan site for [Show Name].

   Create a new file at `docs/[show-slug]-universe.md`
   (e.g. `docs/breaking-bad-universe.md`) with the following sections:

   ## [Show Name] Universe

   ### Premise
   A one-paragraph summary of what the show is about.

   ### Characters
   A markdown table with columns: Name | Role | One-line description
   Include all major recurring characters.

   ### Terminology
   A bullet list of terms, locations, factions, or concepts unique to this universe
   that a content writer would need to know. Include a one-line definition for each.

   ### Canon Accuracy Rules
   3–5 rules written as directives we want Copilot to follow when generating
   any content about this show. Examples:
   - "Never describe [Character] as [inaccurate trait]"
   - "Always refer to [Location] by its in-universe name, not [common mistake]"
   - "Events from Season X are not yet canon in the FanHub timeline — do not reference them"

   Write everything as instructions we want Copilot to follow when helping build this fan site.
   ````

   **Breaking Bad example:** The prompt will produce `docs/breaking-bad-universe.md`. Look for Copilot to include Walter White, Jesse Pinkman, Skyler White, Hank Schrader, Gustavo Fring, Saul Goodman, Mike Ehrmantraut, and Marie Schrader in the Characters table, plus terms like "Blue Sky," "The Superlab," "Los Pollos Hermanos," and "the cartel."

   **Other shows:** For Stranger Things, the slug is `stranger-things`; for The Office (US), use `the-office`. Copilot will use its training data to populate the file — your job in Step 2 is to verify and correct it.

2. **Review and correct the draft — this is the critical step**

   Read the generated file carefully. Copilot's training data is broad but imperfect, and the FanHub seed data contains deliberate errors that mirror real inaccuracies. Check each section:

   - **Premise:** Is the show's premise actually accurate in one paragraph? Does it capture the right tone?
   - **Characters:** Are roles correctly attributed? The seeded Breaking Bad data misidentifies at least one character's relationship to Walter — find it and fix it.
   - **Terminology:** Are definitions accurate? Check season-specific terms — Copilot sometimes conflates early-season and late-season details.
   - **Canon Accuracy Rules:** Do the rules reflect the show's actual canon? Are there important accuracy rules missing?

   **Breaking Bad participants:** Look specifically at Jesse Pinkman's role description in the Characters table. The seed data describes him as "Walter's former *college* student" — he was Walter's former *high school* student. If Copilot reproduced this error, correct it. This is the teaching moment: Copilot brought first-draft velocity; you brought domain judgment.

   **Other shows:** Apply the same critical read. You know your show — Copilot doesn't. Every correction you make is domain knowledge that will now live in the file permanently.

   After correcting, make a note (mental or written) of at least one change you made. You'll reference it in the Success Criteria.

3. **Verify the file has the required sections and depth**

   Before moving on, confirm your `docs/[show]-universe.md` contains:

   - [ ] **Premise** — 1 paragraph, accurate and specific to the show
   - [ ] **Characters** — At least 5 characters with Name, Role, and One-line description columns
   - [ ] **Terminology** — At least 3 show-specific terms with one-line definitions
   - [ ] **Canon Accuracy Rules** — At least 2 directives stated as rules for Copilot to follow

   If any section is thin, ask Copilot in Agent mode to expand it:

   ```
   Expand the Terminology section in docs/breaking-bad-universe.md.
   Add at least 5 more terms with accurate one-line definitions.
   ```

4. **Add a `## Universe` pointer section to copilot-instructions.md**

   Open `.github/copilot-instructions.md` and add the following section at the end. Substitute your show's filename:

   ```markdown
   ## Universe
   For all questions about show canon, characters, terminology, and accuracy rules,
   refer to [docs/breaking-bad-universe.md](docs/breaking-bad-universe.md).
   ```

   **Why a pointer, not inline content?** Three reasons:
   - `copilot-instructions.md` stays clean and focused on code standards — mixing show lore with TypeScript guidelines creates a file that does neither job well
   - The universe file can be `#file`-referenced directly from chat prompts, skill instructions, and agent prompts later in the workshop
   - It mirrors real-world practice: engineering standards and domain knowledge live in separate documents; one links to the other

   **Breaking Bad example — the full pointer section:**

   ```markdown
   ## Universe
   For all questions about show canon, characters, terminology, and accuracy rules,
   refer to [docs/breaking-bad-universe.md](docs/breaking-bad-universe.md).
   ```

5. **Validate the connection**

   In Copilot Chat (Ask mode), test that the universe context is now active:

   ```
   Write a two-sentence bio for Jesse Pinkman for the FanHub character page.
   ```

   Look for Copilot to describe him accurately as Walter's former *high school* student, reference his role as Walter's cook and distributor, and avoid the seed-data error. If it still produces the wrong answer, check that the pointer section in `copilot-instructions.md` is saved and uses the correct filename.

   **Try a terminology check:**

   ```
   What is "Blue Sky" in the FanHub context?
   ```

   The answer reflects your Terminology definition, not a generic web search result.

---

💡 **Facilitator callout: This is business domain logic in the instructions**

This exercise is not a fan-site trick. The skill being built here — encoding domain knowledge as a structured reference file linked from `copilot-instructions.md` — is exactly what production teams do with real business domains:

- **Healthcare teams** encode clinical terminology and HIPAA accuracy rules so Copilot doesn't suggest non-compliant phrasing in patient-facing content
- **Fintech teams** encode regulatory definitions (APR, Reg E, KYC) so generated content reflects the correct legal meaning, not a generic definition
- **E-commerce brands** encode product taxonomy, brand voice rules, and prohibited claims so AI-generated copy stays on-brand and legally safe
- **Legal tech companies** encode jurisdiction-specific rules and citation formats so generated documents use correct legal language

The pattern is always the same: a structured domain reference file, linked from the instructions file, consulted automatically. The fan site just makes the learning concrete and memorable.

---

#### ✅ Success Criteria

- [ ] `docs/[show]-universe.md` exists and was drafted by Copilot in Agent mode
- [ ] The universe file has been reviewed and corrected — at least one error was found and fixed
- [ ] Characters table has at least 5 characters with Name, Role, and One-line description
- [ ] Terminology section has at least 3 show-specific terms with definitions
- [ ] At least 2 canon accuracy rules are stated as directives
- [ ] `.github/copilot-instructions.md` has a `## Universe` section linking to the file
- [ ] A bio test in Copilot Chat returns an accurate, show-specific description
- [ ] Participant can name one specific correction they made to Copilot's draft

#### 📚 Official Docs

- [GitHub Copilot customization](https://code.visualstudio.com/docs/copilot/customization/copilot-customization) — Overview of instruction files, prompt files, and how Copilot loads context from the workspace

---

## 🔗 What You Built

**In this exercise:**
- `docs/[show]-universe.md` — A structured canon reference: premise, characters, terminology, and accuracy rules, drafted by Copilot and corrected by you
- A `## Universe` pointer section in `.github/copilot-instructions.md` linking to the universe file

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| Exercise 1.1–1.4: Code standards, architecture, path-specific + language guidance | Show-specific domain context | Code quality guidance + domain accuracy = Copilot that writes correct code *and* correct content |
| Exercise 1.5: File-type-specific instructions | Universe file as separate domain document | `copilot-instructions.md` owns code rules; `[show]-universe.md` owns content rules — clean separation of concerns |
| Modules 3–4 (upcoming): Prompt files and agent skills | Universe file becomes a `#file:` reference target | Skills and prompts can `#file:docs/breaking-bad-universe.md` to pull domain context into any specialized workflow |

**Why this matters:** Every team that uses AI for content generation faces this exact problem — Copilot is a brilliant generalist that knows nothing about your specific domain until you tell it. The universe file is the pattern for telling it once, correctly, and having that knowledge compound across every subsequent interaction. The fan site makes the lesson vivid; the skill transfers directly to any domain-specific content problem in production.

---

## ➡️ Next Module

**[Module 2: Agent Plan Mode](../02-agent-plan-mode/README.md)** — You've given Copilot deep context about your codebase and your show's universe. Now you'll use Agent Plan Mode to plan and build a full Universe Dashboard feature — letting Copilot propose the implementation approach before a single line of code is written.

> *"We've got all this universe data in a structured file — characters, terminology, the whole canon. What if we built a dashboard page that displayed it? I want to see Copilot plan the whole feature before we touch any code."*
> — Marcus, about to discover Agent Plan Mode

---
