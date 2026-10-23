# Exercise 2.2: Plan the Lore Card & Page

## 🔨 Exercise

### Exercise 2.2: Plan the Lore Card & Page — "Before the First File"

**Lead:** Jessica ⭐ | **Support:** Elena 🤝, Marcus 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 10:00 AM. The FanHub homepage already shows four cards: Characters, Episodes, Seasons, and Network — each with live counts. Jessica is adding the fifth: a **Lore card** that shows the count of lore facts for the show and navigates to a new `/lore` page listing them in a card layout.

She's immediately excited. It's visible, it's interactive, and users will notice it. *"I know exactly what I want,"* she says. *"A card just like the others, a new page, done."*

But Jessica has learned — sometimes the hard way — that "just like the others" has a way of hiding surprises. A new page means new routing. The count means a new API endpoint. The card layout means reading the existing card component structure. And all of it needs to work with the `lore_entries` table that doesn't have entries yet.

Plan mode maps all of that before a single file is touched.

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Start coding the Lore card → routing config missed, new page added without layout wrapper, API endpoint uses different naming than existing routes, discovered during integration | Run plan mode first → routing, component structure, API naming convention, and DB schema all surfaced before coding. Implementation follows the plan. |
| **Missed files discovered during coding:** 3–4<br>**Time to identify and fix:** 45–60 min<br>**Rework after integration:** High | **Files surfaced by plan mode before coding:** 4–6<br>**Surprises during implementation:** 0<br>**Rework:** None |

**Time saved:** 45 min of mid-sprint discovery → 90 seconds of plan mode reading the codebase

#### 🎯 Your Goal

Run plan mode to produce a complete implementation roadmap for the Lore card and Lore page. Then compare the plan's file count to your initial guess — and save the plan for Exercise 2.3.

#### 📋 Steps

1. **Make a Guess First**

   Before running anything, write down your estimate: *how many files will this change touch?* Most participants guess 2–3. Keep your answer — you'll compare it to the plan output.

2. **Switch to Plan Mode**

   In Copilot Chat, change the mode selector to **Plan**. Or just use `/plan` at the start of your prompt — it switches automatically.

3. **Enter the Lore Card Prompt**

   ```
   /plan Add a Lore card to the FanHub homepage that shows the count of lore facts for the show. Clicking the card navigates to a new /lore page that lists all lore facts in a card layout.
   ```

   Wait for the plan to generate. Watch the chat window as it runs — you'll see Copilot reading `ARCHITECTURE.md`, the existing card components, routing config, and DB schema. It's learning the pattern of the existing cards before proposing how to add a new one.

   This takes 60–120 seconds. No files are modified.

4. **Read the Plan**

   When the plan finishes, count the files it identified. Compare to your guess. Look for:

   - The `lore_entries` DB migration (or confirmation the table already exists)
   - `GET /api/lore-entries` — the count and list endpoint
   - A new `/lore` page component
   - Homepage card update (adding the Lore card to the existing grid)
   - Routing configuration update

   Note at least one thing you'd refine or question — a file the plan missed, an assumption you'd clarify, or a decision it surfaced that requires your judgment.

5. **Save the Plan**

   Click **Open in Editor** when the plan finishes. A **Save As Prompt File** button will appear in the lower-right of the document. Click it to save as a `.prompt.md` file.

   David will use this file in Exercise 2.3 — he'll spot what Jessica missed and add a second plan on top of it.

#### ✅ Success Criteria

- [ ] Plan mode ran without modifying any file
- [ ] Plan identifies DB migration (or existing table), `GET /api/lore-entries`, Lore page component, homepage card update
- [ ] File-count guess recorded and compared (most guess 2–3, plan shows 4–6)
- [ ] At least one refinement or open question noted
- [ ] Plan saved as a `.prompt.md` file for Exercise 2.3

#### 📚 Official Docs

- [Planning in VS Code Chat](https://code.visualstudio.com/docs/copilot/chat/chat-planning) — How plan mode researches before proposing changes
- [Copilot Chat Mode Selector](https://code.visualstudio.com/docs/copilot/chat/chat-modes) — Switching between Ask, Plan, and Agent modes

---

## 🔗 What You Built

**In this exercise:**
- A complete pre-implementation roadmap for the Lore card and Lore page
- A file-count comparison that shows how much planning surfaces before coding starts

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| `copilot-instructions.md` (Module 1) | Plan research | The plan proposes endpoint names and component structure that already match your team's conventions |
| Existing card pattern | Plan continuity | Copilot reads the existing cards and proposes the Lore card to match — no manual "match the style" instruction needed |

**Why this matters:** Jessica is focused on the display — and that's exactly why the gap she misses is significant. The Lore page will exist. The card will show a count. But there's no form to add lore entries. David will find that in Exercise 2.3 — because the plan made the feature visible enough to inspect.

---

## ➡️ Next Exercise

**[Exercise 2.3: Plan the Show Lore Form](exercise-2.3.md)** — David opens the Lore page and finds it empty. The card works, the page loads — but there's no way to add anything. He plans the missing form with Jessica's plan file open, and VS Code combines the two.

> *"The Lore page loaded. It just... listed nothing. There's no way to add anything."*
> — David, ready for Exercise 2.3

---