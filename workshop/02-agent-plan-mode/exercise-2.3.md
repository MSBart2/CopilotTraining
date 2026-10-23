# Exercise 2.3: Plan the Show Lore Form

## 🔨 Exercise

### Exercise 2.3: Plan the Show Lore Form — "Continuity Is the Test"

**Lead:** David ⭐ | **Support:** Elena 🤝, Sarah 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 10:30 AM. Jessica has just shared her plan output with the group. David reads it line by line — all the way through. The Lore card, the `/lore` page, the migration, the API route. Everything looks right. Then he gets to the end. *There's no step for adding entries.* The table gets created. The page reads from it. Nothing writes to it.

*"The plan creates the table and reads from it,"* David says. *"But how do entries ever get in there?"*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Plan the form independently → different table name assumed, form posts to wrong endpoint, conflict discovered during integration | Run the second plan with Jessica's plan file open → Copilot detects context, references `lore_entries` correctly, proposes `POST /api/lore-entries` as the connected endpoint |
| **Integration conflicts from drift:** 1–2 per feature pair<br>**Time to discover:** During testing, 45 min in | **Integration conflicts:** 0<br>**Human judgment calls surfaced:** 1–2 deliberately<br>**Rework required:** None |

**Time saved:** 45 min integration debugging → 0, replaced by 2 min reading the combined plan

#### 🎯 Your Goal

With Jessica's plan file open in VS Code, run a second plan mode prompt to design the Show Lore quick-add form. Verify the combined plan correctly references `lore_entries` — and identify at least one decision the plan surfaced that required your judgment.

#### 📋 Steps

1. **Open Jessica's Plan File in VS Code**

   Open the `.prompt.md` file Jessica saved in Exercise 2.2. Having this file open is how VS Code detects the existing plan context. You do not need to be in the same chat session — the file is the context.

2. **Enter the Form Plan Prompt**

   Enter this prompt in plan mode:

   ```
   /plan Add a form to the /lore page that lets me add a new lore entry. The form has a title and description field. On submit, save the new entry and refresh the list so the new card appears immediately. The Lore count on the homepage card also updates.
   ```

   When the plan generates, VS Code will ask whether to combine with the open plan or keep them separate. Choose **Combine**.

3. **Run the Continuity Check**

   When the combined plan arrives, search for `lore_entries`. Look for a plan that does the following:

   - Reference `lore_entries` as the target table (not a new table)
   - Propose a `POST /api/lore-entries` endpoint
   - Use the same `type` column enum values defined in Jessica's plan

   If the plan proposes a different table name — that's drift. Note it. This is the exact failure mode David described.

4. **Find the Open Question**

   Every good plan surfaces at least one decision it couldn't make without human input:

   - *"Do you want the counter to refresh optimistically or wait for the POST to return success?"*
   - *"What do you want to happen if a duplicate lore entry title is submitted?"*
   - *"Do you want the form to stay open or close after a successful add?"*

   Pick one. Write your answer. This is the human judgment that plan mode deliberately leaves for you.

5. **Save the Combined Plan**

   Click **Open in Editor**, then click **Save As Prompt File** (lower-right of the document). This combined plan is what Sarah will execute in Exercise 2.4.

#### ✅ Success Criteria

- [ ] Jessica's plan file open in VS Code before running the second plan
- [ ] Combined plan references `lore_entries` — no new table invented
- [ ] `POST /api/lore-entries` endpoint identified in the plan
- [ ] At least one open question answered with your own judgment
- [ ] Combined plan saved as a `.prompt.md` file

#### 📚 Official Docs

- [Planning in VS Code Chat](https://code.visualstudio.com/docs/copilot/chat/chat-planning#_how-to-plan-a-task) — Iterating on plans and maintaining context
- [Configure Tools for Agents](https://code.visualstudio.com/docs/copilot/chat/chat-tools) — Understanding what plan mode can and cannot infer

---

## 🔗 What You Built

**In this exercise:**
- A second plan covering the Show Lore form, `POST /api/lore-entries`, form state, and counter-refresh pattern
- A continuity check result: the combined plan references the same `lore_entries` table from Exercise 2.2

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| `copilot-instructions.md` (Module 1) | Form naming conventions | The plan proposes endpoint names that match your team's conventions — without you specifying them |
| Exercise 2.2 plan | Plan continuity | The Show Lore form plan inherits the table schema from the stat card plan — one decision, not two |

**Why this matters:** David didn't run the app — he read the plan. A read-only feature with no write path is a gap you can catch in 60 seconds of careful reading, before a single file is touched. That's the habit plan mode is training.

---

## ➡️ Next Exercise

**[Exercise 2.4: Execute the Plan](exercise-2.4.md)** — Sarah runs the combined plan in agent mode and watches every file change. When it's done, she adds Show Lore entries from her show and watches the counter go from 0 to real numbers.

> *"Plans don't ship product. But a plan this specific makes execution calmer."*
> — Sarah, ready to execute

---