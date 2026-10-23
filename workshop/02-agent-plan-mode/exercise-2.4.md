# Exercise 2.4: Execute the Plan and Populate Your Universe

## 🔨 Exercise

### Exercise 2.4: Execute the Plan and Populate Your Universe — "From Roadmap to Reality"

**Lead:** Sarah ⭐ | **Support:** Marcus 🤝, David 🤝 | **Time:** 15 min

#### 📖 The Challenge

It's 11:30 AM. Sarah reviews the combined plan file — the most thorough pre-implementation roadmap the team has produced. Two plans merged: Jessica's Lore card and page, David's Show Lore entry form. A sequenced dependency chain. Open questions already answered. And zero lines of code written.

The homepage already has Characters, Episodes, Seasons, and Network. After execution, the **Lore card** will complete the set — and the form will let anyone add lore entries so the count is never zero again.

*"Plans don't ship product,"* Sarah says. *"But a plan this specific means execution is calmer. I know exactly what gets built and in what order."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Start coding from memory → DB route created with wrong table name, counter doesn't refresh, form discovered to be broken during integration | Execute from plan file → every step in order, Show Lore form works on first attempt, counter reflects real content immediately |
| **Runtime errors from skipped steps:** 1–2<br>**Time from "code done" to "Show Lore in DB":** Manual SQL inserts, 20+ min<br>**Sense of ownership:** Low | **Runtime errors:** 0 (followed plan)<br>**Time from "code done" to "Show Lore in DB":** Minutes (used the form)<br>**Sense of ownership:** High — your show's lore, in your site |

**Time saved:** Hours of debugging and manual DB work → minutes of form submission

#### 🎯 Your Goal

Switch from plan mode to agent mode, run the combined plan file, verify the Show Lore form works, and populate your site with at least 3 real Show Lore entries from your chosen show.

#### 📋 Steps

1. **Switch from Plan Mode to Agent Mode**

   In Copilot Chat, switch the mode selector from **Plan** to **Agent**. Agent mode can now write files, run terminal commands, and modify the codebase. The research phase is over.

2. **Run the Plan File**

   Run the combined plan file directly:

   ```
   /universe-dashboard-plan.prompt.md
   ```

   Watch the agent work step by step: migration → API route → React component → homepage wiring. Look for it to follow the dependency sequence from the plan.

   **Your job during execution:** Monitor for deviations. If the agent:

   - Creates a table named differently than `lore_entries` → flag it and redirect to the plan
   - Adds a feature not in the plan (e.g., search, filtering) → decide whether to accept or revert
   - Skips a step → point it back to the roadmap

3. **Verify the Running Feature**

   Start the FanHub app and confirm:

   - **Homepage Lore card** appears alongside Characters, Episodes, Seasons, and Network
   - **Lore card shows `0`** — the table exists but no entries yet
   - **Clicking the Lore card** navigates to `/lore` and shows an empty card layout
   - **The Show Lore form** appears with title and description fields
   - **Form submits successfully** — open the browser Network tab, submit the form, confirm a `POST` to `/api/lore-entries` returns `200`
   - **Lore card count refreshes** after submit — increments by 1, Lore page shows the new entry

   If anything fails, check the plan for the step that was skipped or misimplemented. Ask the agent to revisit that specific step.

4. **Populate Your Show Lore (The Payoff)**

   Open the form and add at least 3 Show Lore entries from your show. Use details only a real fan would know:

   **Breaking Bad examples:**
   - "Walt's chemistry knowledge predates his cancer diagnosis — his meth quality reflects decades of academic expertise, not desperation"
   - "The blue color of Heisenberg's product is a deliberate visual shorthand for purity — 99.1%, chemically impossible in reality"
   - "Saul Goodman's real name is Jimmy McGill — 'Better Call Saul' was Jesse's suggestion, not a pre-existing alias"

   **For any other show:** Add at least 3 entries with show-specific details — not Wikipedia summaries. The specificity matters; it's what makes the accuracy check in Module 3 meaningful.

   After each submission, watch the Show Lore counter increment. Characters and Locations stay the same. *Only Show Lore changes* — because that's exactly what you built.

5. **Answer the Debrief Question**

   Before moving on, write your answer:

   > *Did Copilot follow the plan faithfully? Where did it deviate — and was the deviation an improvement or a mistake?*

   At least one deviation is likely. Name one you accepted and one you overrode (or explain why no overrides were needed).

#### ✅ Success Criteria

- [ ] Agent mode used (not plan mode) for all code execution
- [ ] Lore card appears on homepage alongside the existing four cards
- [ ] Lore page (`/lore`) renders lore facts in a card layout
- [ ] Show Lore form posts to `lore_entries` and the Lore card count refreshes
- [ ] Lore card count goes from `0` to real numbers (≥ 3 entries added)
- [ ] Network tab confirms `POST /api/lore-entries` on form submit
- [ ] You can describe one decision Copilot made that you accepted — and one you overrode (or explain why no overrides were needed)

#### 📚 Official Docs

- [Agent Mode in VS Code Chat](https://code.visualstudio.com/docs/copilot/chat/chat-agent) — How agent mode executes multi-step tasks
- [Planning in VS Code Chat](https://code.visualstudio.com/docs/copilot/chat/chat-planning) — The full plan → execute workflow end to end

---

## 🔗 What You Built

**In this exercise:**
- A working Show Lore form that writes to `lore_entries` and refreshes the counter
- Real Show Lore entries from your chosen show now in the database

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| `copilot-instructions.md` (Module 1) | Agent execution | The agent followed your naming and styling conventions without being reminded |
| Exercise 2.2 (Lore card plan) | Execution fidelity | The Lore card, Lore page, and form all followed the plan — every step had a defined reason and sequence |
| Show Lore entries added here | Module 3 foundation | The lore entries you added become the target data for Elena's accuracy-check prompt in Module 3 |

**Why this matters:** The data you entered in Step 4 isn't busywork. In Module 3, Elena builds a reusable accuracy-check prompt that validates whether FanHub's content matches real show canon. The Show Lore entries you added here — the ones that require fan knowledge, not Wikipedia knowledge — are exactly what that prompt will test.

---

## ➡️ Next Module

**[Module 3: Custom Prompts](../03-custom-prompts/README.md)** — Elena has been running the same show-accuracy validation by hand five times a sprint. Module 3 turns that repeated check into a reusable `.prompt.md` file — and the first thing it validates is the Show Lore you just added.

> *"I've typed the same accuracy check into Copilot so many times I could write it in my sleep. There has to be a way to save it."*
> — Elena, ready for Module 3

---