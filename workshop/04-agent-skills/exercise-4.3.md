# Exercise 4.3: Character Detail Readiness Checker

## 🔨 Exercise

### Exercise 4.3: Character Detail Readiness Checker — "From Manual Handoff Checks to Automated Readiness Review"

**Lead:** Marcus ⭐ | **Support:** Elena 🤝, Sarah 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 4:00 PM on Monday. Marcus is almost ready to open a PR for the character-detail work. The code looks good. The tests pass. But the team still does the same final sweep by hand:

- Did the roadmap item get reflected in the actual files?
- Were `ARCHITECTURE.md` and team instructions refreshed if needed?
- Did the UI, API, and tests all move together?
- Are fallback states and review notes still aligned?

That last check is valuable, but it is slow and easy to do unevenly:

- 6 minutes scanning changed files
- 5 minutes checking docs and roadmap references
- 7 minutes confirming nothing obvious was missed before handoff

Marcus realizes: *"This is another specialized workflow. We already know what 'ready' means for character-detail work. A skill can teach Copilot to run that readiness review the same way every time."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Before every PR, Marcus manually inspects files, roadmap notes, docs, and test coverage. Sometimes the code is done but the handoff artifacts lag behind. Total: 18 minutes of uneven final review per change. | Marcus invokes the `character-detail-readiness-checker` skill. Copilot loads a verification script, readiness checklist, and example report. It reviews the character-detail change against the team’s expected handoff surfaces in a few guided steps. Total: 4 minutes per change. |
| **Readiness review:** 18 min/change<br>**Missed handoff steps:** occasional<br>**Confidence before PR:** inconsistent | **Readiness review:** 4 min/change<br>**Missed handoff steps:** reduced<br>**Confidence before PR:** more consistent |

**Time saved:** 14 minutes per change × 4 changes per sprint = **56 minutes saved per sprint**

#### 🎯 Your Goal

Create a `character-detail-readiness-checker` agent skill that teaches Copilot how to verify whether a character-detail enhancement is ready for handoff using the installed `make-skill-template` scaffold, a checklist, a simple verification script, and example reports.

#### 📋 Steps

1. **Bootstrap the skill from the installed template**

   Duplicate `make-skill-template` into:

   ```bash
   cp -r .github/skills/make-skill-template .github/skills/character-detail-readiness-checker
   ```

   Then adapt the scaffold so the new skill is specifically about pre-PR readiness review.

2. **Create a readiness checklist**

   Create `.github/skills/character-detail-readiness-checker/readiness-checklist.md` with questions such as:

   - did backend, frontend, and tests move together?
   - were fallback states reviewed?
   - do the changed files match the planned enhancement?
   - do docs need refreshing after the change?

3. **Create a lightweight verification script**

   Create `.github/skills/character-detail-readiness-checker/scripts/check-character-detail-change.js` that inspects the current diff or changed files and reports obvious signals such as:

   - files touching character detail UI
   - tests present or absent
   - docs changed or unchanged

   The script does not decide correctness by itself. It gives Copilot structured evidence to review.

4. **Create an example readiness report**

   Add `.github/skills/character-detail-readiness-checker/examples/ready-report.md` showing a good final summary:

   - changed files
   - checklist outcomes
   - missing follow-up items
   - recommendation: ready / needs follow-up

5. **Create the `SKILL.md` file**

   Create `.github/skills/character-detail-readiness-checker/SKILL.md`:

   ````markdown
   ---
   name: character-detail-readiness-checker
   description: Review whether a character detail enhancement is ready for handoff by checking changed files, documentation updates, and test coverage. Use before opening a PR or handing work to another developer.
   ---

   # Character Detail Readiness Checker

   ## When to Use This Skill

   - Before opening a PR for character detail work
   - Before handing a change to another engineer
   - When checking whether docs, tests, and code stayed aligned

   ## Workflow

   1. Run [check-character-detail-change.js](./scripts/check-character-detail-change.js)
   2. Review the output against [readiness-checklist.md](./readiness-checklist.md)
   3. Compare the final summary to [ready-report.md](./examples/ready-report.md)
   4. Recommend follow-up work or confirm readiness

   ## References

   - [Verification script](./scripts/check-character-detail-change.js)
   - [Readiness checklist](./readiness-checklist.md)
   - [Example report](./examples/ready-report.md)
   ````

6. **Test the skill**

   Ask Copilot:

   ```
   Use the character-detail-readiness-checker skill to review whether this change is
   ready for handoff. Check changed files, tests, and whether docs or roadmap notes
   need updates before we open a PR.
   ```

#### ✅ Success Criteria

- [ ] Skill directory `.github/skills/character-detail-readiness-checker/` created from the template scaffold, with `SKILL.md`, checklist, script, and example report
- [ ] The checklist captures the team’s real definition of “ready”
- [ ] The script provides useful evidence about changed files and surfaces
- [ ] The example report shows a consistent handoff summary
- [ ] Copilot can help review readiness before a PR with less manual scanning

#### 📚 Official Docs

- [Use Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [About Agent Skills (GitHub)](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

---

## 🔗 What You Built

**In this exercise:**
- `.github/skills/character-detail-readiness-checker/SKILL.md` — Instructions for pre-handoff review
- `readiness-checklist.md` — Shared definition of “ready”
- `scripts/check-character-detail-change.js` — Lightweight evidence gathering for changed files
- `examples/ready-report.md` — Example of a clean readiness summary

**How it compounds:**

| Previous Modules | This Module | Combined Power |
|------------------|-------------|----------------|
| Module 3 created docs-refresh and review prompts | Module 4 adds a fuller readiness workflow with script support | The team moves from “ask for review” to “run a repeatable handoff capability” |
| Module 2 produced a roadmap for character-detail enhancements | Module 4 helps confirm the actual change still matches the planned story | Planning and execution stay connected all the way to handoff |

---

## ➡️ Next Up

Module 4 taught Copilot specialized local capabilities for the same character-detail story: start from the right scaffold, test with the right edge cases, and verify readiness before handoff.

> *"We taught Copilot our local workflow. Next, what happens when the workflow also needs data or actions from systems outside the repo?"*
> — Marcus, setting up Module 5

---
