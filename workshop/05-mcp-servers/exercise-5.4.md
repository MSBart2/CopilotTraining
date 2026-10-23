# Exercise 5.4: Live Data + Show Knowledge

## 🔨 Exercise

### Exercise 5.4: Live Data + Show Knowledge — "Your Domain Expertise as a Quality Gate"

**Lead:** Rafael ⭐ | **Support:** Marcus 🤝 | **Time:** 12 min

#### 📖 The Challenge

It's 2:30 PM. Rafael has been heads-down in the MCP exercises all morning and he's genuinely enjoying talking to the database. But something feels off.

The queries work. The data comes back. But every result is abstract — row counts, field names, IDs. Zero context. He asked for "all characters where faction is NULL" and got back a list of names, and he genuinely couldn't tell if that was a bug or correct behavior. Are these characters *supposed* to have no faction? Are they missing data? Is the database reflecting the show, or just reflecting whatever got typed into the seed file?

Marcus leans over: "You've been staring at that data for twenty minutes. What do you actually *know* about these characters?"

Rafael stops. He knows a lot. He knows that Jesse Pinkman in Season 1 is technically independent — not formally part of any faction — and that's *intentional*. He knows that Skyler White has no faction because she's not in the drug world yet. He knows that one of the characters currently marked "alive" in the database is wrong for how the show's arc plays out. He knows Gustavo Fring has a nearly empty bio in the database, and Gus is one of the most important characters in the show.

He's been querying a dataset he knows better than Copilot does. And he hasn't used that knowledge once.

Marcus: "Use Copilot to retrieve the data, then use what you know about the show to evaluate whether it's right. That's a capability software teams don't usually think about — domain expertise as a quality gate."

*Rafael runs the first query. The data comes back. He reads the character list and immediately spots something the query can't: a classification that's technically valid but factually wrong for anyone who's actually seen the show.*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Rafael runs MCP queries and gets raw data. He can confirm the database returned rows, but can't evaluate whether the content is accurate. Show-specific quality issues go unnoticed until a fan visits the site. | Rafael combines MCP queries with show knowledge as an evaluation layer. Copilot retrieves the data; Rafael evaluates correctness against what he knows. Together they surface data quality issues no automated tool could find. |
| **Data quality visibility:** Low — technically valid rows, unknown content accuracy | **Data quality visibility:** High — factual errors caught before they reach users |
| **Content errors caught pre-launch:** 0–1 per sprint | **Content errors caught pre-launch:** 3–4 per sprint |
| **Who can evaluate:** Only someone who also knows the show | **Who can evaluate:** Rafael's show knowledge is now a structured, repeatable quality pass |

**Time saved:** Catching 3–4 content errors pre-launch vs. post-launch saves an average of 45 min per error in user-reported bug triage, PR back-and-forth, and content correction. **~180 min/sprint in avoided rework.** More importantly: fan trust doesn't erode from visible inaccuracies on the live site.

#### 🎯 Your Goal

Run four targeted MCP queries against the FanHub database, use your show knowledge to evaluate the results, identify at least one data gap that requires show knowledge to recognize, and create a prioritized remediation plan. The MCP server from exercises 5.1–5.3 is already connected — this exercise is about querying with purpose.

#### 📋 Steps

1. **Challenge 1 — Alive/Dead Audit**

   Ask Copilot in Agent mode:

   ```
   Query the FanHub database for all characters currently marked as alive.
   List them sorted by name. How many total?
   ```

   When results come back, evaluate against your show knowledge:

   - Does the alive/dead breakdown match how **Season 1** of your show ends?
   - Are there any characters listed as alive who need to be marked as deceased by the end of the seeded season?
   - Are there characters whose status is ambiguous in the data but clear if you know the show?

   **For Breaking Bad:** Nobody major dies in Season 1, but Emilio Koyama and Krazy-8 both die. Check whether they appear in the database and how they're classified. If either is missing from the database entirely, that's a coverage gap.

   > 💡 **For Stranger Things Season 1:** Will Byers is listed as missing/dead for most of the season but is found alive at the end. Barb Holland dies and is not recovered. How does the database represent this ambiguity?

   > 💡 **For The Office Season 1:** No deaths (it's a comedy), but characters like Ed Truck are referenced as former manager — does the database include referenced-but-unseen characters?

2. **Challenge 2 — Missing Bio Detection**

   Ask Copilot:

   ```
   Query all characters in the FanHub database where the bio field is empty
   or less than 20 characters. List them with their names.
   ```

   When results come back, apply show knowledge as a priority ranking:

   - Which of these characters are *major* characters who deserve full bios?
   - Which are minor enough that a sparse bio is acceptable?
   - Which have the biggest gap between their importance to the show and the quality of their database entry?

   **For Breaking Bad:** Gustavo Fring has a sparse bio in the seed data. He's one of the show's most important antagonists. If his bio shows up here, it's a high-priority gap. Jesse Pinkman also needs a complete bio — if he's in this list, that's a critical error.

   Note at least one character where you can say: **"Copilot can't prioritize this by importance — but I can, because I know the show."** That's the insight the exercise is designed to surface.

3. **Challenge 3 — Faction/Classification Check**

   Ask Copilot:

   ```
   Which characters have no faction or affiliation listed in the FanHub database?
   List them with any other classification fields that are populated.
   ```

   Evaluate the results:

   - For each character with no faction: is this **intentional** (the character legitimately has no affiliation at this point in the show) or a **data gap** (they belong to a documented group but it wasn't captured)?
   - Are any characters *mis-classified* — assigned to a faction they don't actually belong to in the seeded season?

   **For Breaking Bad:** Skyler White in Season 1 has no faction — she's "family," which is correct. Jesse Pinkman in Season 1 is technically independent, not formally Cartel or DEA or Heisenberg's operation — also correct. But if Walter White is listed without a faction when he's already operating as Heisenberg's cook, that's a classification gap.

   Document your finding in this format:
   ```
   Character: [Name]
   Database faction: [what the DB says]
   Actual status: [what the show says]
   Gap type: missing data / wrong classification / intentionally empty
   ```

4. **Challenge 4 — Character Count Sanity Check**

   Ask Copilot:

   ```
   How many characters are currently in the FanHub database?
   How many locations? How many canon facts?
   Return the counts.
   ```

   Then evaluate against your mental model of the show:

   - Given that this is a one-season dataset, does the character count seem like complete coverage?
   - Who is missing that belongs there?
   - Are the location count and canon fact count proportional to the show's complexity?

   **For Breaking Bad Season 1:** Key characters include Walter White, Jesse Pinkman, Skyler White, Walter White Jr., Hank Schrader, Marie Schrader, Jane Margolis (wait — Jane doesn't appear until Season 2), Emilio Koyama, Krazy-8, and Gomez. That's roughly 8–10 core characters. If the database has 3, it's underpopulated. If it has 40, the seeding added non-Season-1 characters or invented extras.

   Name at least one character who is missing from the database but belongs there. This is a finding Copilot cannot make — it requires knowing the show.

5. **Prioritized remediation plan**

   After running all four challenges, ask Copilot:

   ```
   Based on the data quality issues we found in the FanHub database, create a
   prioritized remediation plan. Order by: (1) most important characters with
   empty or wrong bios, (2) incorrect classifications, (3) missing characters
   who belongs in the database.

   For each item: character name, issue type, suggested fix, priority (high/medium/low).
   ```

   Review the plan. Add any items that required your show knowledge to identify — Copilot can structure the plan, but you supplied the show-specific criteria for what matters.

#### ✅ Success Criteria

- [ ] All four challenge queries completed using the connected MCP server
- [ ] At least one finding is: "Copilot returned data X, but I know the show well enough to know it needs to be Y"
- [ ] Challenge 2 identifies at least one character whose bio gap is a *priority* based on show importance, not just field emptiness
- [ ] Challenge 3 distinguishes between intentionally empty factions and data gaps — using show knowledge, not query logic
- [ ] Challenge 4 names at least one character who belongs in the database but isn't
- [ ] Remediation plan created with at least 3 items, ordered by priority

#### 📚 Official Docs

- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

---

## 🔗 What You Built

**In this exercise:**
- Four structured data quality challenges that combine MCP queries with show knowledge
- A prioritized remediation plan for FanHub content accuracy
- A repeatable pattern: **Copilot retrieves → participant evaluates → together they find what neither could alone**

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| Module 1 encoded show knowledge in `docs/[show]-universe.md` | Exercise 5.4 applies show knowledge as a live data quality layer | The universe doc isn't just for Copilot's context — it's a reference for what the database *needs to* contain |
| Module 4's lore skill documented character facts and common misconceptions | Exercise 5.4 checks those facts against the running database | The lore skill told Copilot what's true; this exercise reveals what the *database* got wrong |
| Exercises 5.1–5.3 established MCP queries against the FanHub database | Exercise 5.4 gives those queries purpose: evaluating correctness, not just returning data | Raw database access becomes a content QA capability |

**Why this matters:** The FanHub database has deliberate seeding errors — characters with wrong classifications, missing bios for important people, coverage gaps. Automated tools can find *technical* gaps: empty fields, NULL values, constraint violations. Only someone who knows the show can find *content* gaps: the field that's populated but wrong, the character who's missing because they matter, the faction classification that's technically valid but factually inaccurate. Rafael's show knowledge, applied systematically through Copilot's query capability, is a quality gate that wasn't available to the team before.

---

## ➡️ Next Module

**[Module 6: Custom Agents](../06-custom-agents/README.md)** — The lore skill, the live database, the accuracy-check prompt — each is powerful on its own. Module 6 is where you stop invoking them manually and bundle everything into one agent that knows your show, queries live data, and validates content in a single `@[show]-expert` invocation.

> *"Every session I'm fishing around for the right prompt, the right skill, the right MCP connection. I want one thing I can invoke that just... knows. All of it."*
> — Sarah, already writing the agent spec in her head
