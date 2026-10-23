# Exercise 4.4: Show-Lore Skill

## 🔨 Exercise

### Exercise 4.4: Show-Lore Skill — "Put Your Domain Expertise Into the System"

**Lead:** David ⭐ | **Support:** Rafael 🤝 | **Time:** 15 min

#### 📖 The Challenge

It's 3:45 PM. David is reviewing the FanHub character detail pages. On a whim, he asks Copilot to write a short bio for Gustavo Fring.

Copilot produces something plausible-sounding. Confidently written. Mostly wrong.

The bio implies that Gus built his meth distribution network *after* meeting Walter White — which inverts one of the show's central dramatic ironies. It drops his origin story entirely: the Chilean-born Pollos Hermanos executive who had infrastructure in place years before Walt walked into the picture. And it refers to him as a "cautious businessman" without any of the menace that defines the character.

David knows this is wrong. He's seen the show. But Copilot hasn't — and nothing in the project tells it the truth. The `copilot-instructions.md` from Module 1 points at `docs/breaking-bad-universe.md`, but that file captures high-level theme and tone, not deep lore: episode facts, character arc beats, common misconceptions, and the things the show *implies* versus what it *confirms*.

The accuracy-check prompt from Exercise 3.3 can flag errors *after* the fact. But what David wants is for Copilot to generate *correctly in the first place* — by having access to structured reference material it can look up before it writes, the way a knowledgeable writer would.

He thinks about how this actually works on experienced cross-functional teams. The senior engineer doesn't just *correct* the documentation after the fact — they make their domain knowledge available up front so the whole team generates correct output from the start. A lore skill is that same capability: David's expertise encoded as resources that Copilot can cite instead of guess.

*"The accuracy-check prompt taught Copilot to catch what I already know is wrong. This teaches it what's actually right — before it has a chance to get it wrong."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Copilot generates show content from training data — plausible, confident, often wrong in show-specific ways. David catches errors manually. | Copilot consults the `[show]-lore` skill resources before generating. It cites the resource it drew from. David's domain knowledge is in the system, not just in his head. |
| **Hallucination rate:** 3–4 show-specific errors per session | **Hallucination rate:** Near zero for facts documented in resources |
| **Correction time:** 5–10 min per error (finding the right prompt, explaining the canon, re-running) | **Correction time:** ~0 — correct on first generation |
| **Knowledge location:** David's memory | **Knowledge location:** `.github/skills/[show]-lore/resources/` — accessible to anyone on the team |

**Time saved:** 5–10 min × 3–4 errors/session × 3 sessions/sprint = **45–120 min/sprint** reclaimed. More importantly, accuracy no longer degrades when David isn't in the room.

#### 🎯 Your Goal

Create `.github/skills/[show]-lore/` — a custom agent skill that gives Copilot access to structured, human-authored reference material about your show. The skill teaches Copilot *when* to consult the resources and *how* to cite them. You write the resources yourself — this is the exercise in the workshop where your domain knowledge is the input, not Copilot's.

#### 📋 Steps

1. **Create the skill directory structure**

   In Agent mode, scaffold the directory:

   ```
   Create the directory structure for a new agent skill at .github/skills/breaking-bad-lore/
   with the following layout:
   - SKILL.md (top-level instructions)
   - resources/characters.md
   - resources/seasons.md
   - resources/quotes.md
   - resources/canon-facts.md

   Create each file with a placeholder heading only — I will fill in the content myself.
   ```

   For non-Breaking Bad shows, substitute your show name: `.github/skills/stranger-things-lore/`, `.github/skills/the-office-lore/`, etc.

2. **Write the `SKILL.md`**

   This file tells Copilot how and when to use the lore resources. Create it with this structure:

   ````markdown
   ---
   name: breaking-bad-lore
   description: "Reference skill for Breaking Bad canon, character arcs, and established facts. Use when generating or reviewing any show-related content in FanHub."
   ---

   # Breaking Bad Lore Skill

   ## When to Use This Skill

   - When generating character bios, episode summaries, or any FanHub show content
   - When answering questions about character relationships, timeline, or plot events
   - When reviewing content for accuracy against established canon
   - When a question touches on show history, character motivations, or episode facts

   ## How to Use These Resources

   Always consult the resources folder before generating show-related content:

   1. Check [characters.md](./resources/characters.md) for character-specific facts and arc summaries
   2. Check [canon-facts.md](./resources/canon-facts.md) for established truths and common misconceptions
   3. Check [seasons.md](./resources/seasons.md) for timeline and major story events
   4. Check [quotes.md](./resources/quotes.md) for dialogue attribution

   ## Citation Requirements

   When making a factual claim about the show, cite the resource:
   - "According to `canon-facts.md`, Gustavo Fring's Pollos Hermanos operation predates his meeting with Walter White."
   - "Per `characters.md`, Jesse Pinkman was Walter's former *high school* student — not a college acquaintance."

   ## When You Don't Know

   If a question falls outside the documented resources, say so explicitly:
   - "This isn't documented in the lore resources. Based on general show knowledge..."
   - Do not guess at facts not covered by the resources.
   ````

   Adapt the skill name and show title for your show.

3. **Populate `resources/characters.md` — write this yourself**

   This step is intentionally manual. Copilot cannot fill this in correctly — that's the whole point. Open the file and write real character entries from your own knowledge of the show.

   Format each character like this:

   ```markdown
   # Breaking Bad — Characters

   ## Walter White
   - **Role:** High school chemistry teacher turned methamphetamine manufacturer
   - **Appears:** Seasons 1–5 (all episodes)
   - **Arc:** Diagnosed with lung cancer in Season 1; partners with Jesse Pinkman to cook meth; transforms from desperate father into Heisenberg, a feared drug kingpin; dies in the Season 5 finale
   - **Key relationships:** Jesse Pinkman (partner/student), Skyler White (wife), Hank Schrader (DEA brother-in-law)

   ## Gustavo Fring
   - **Role:** Fast food entrepreneur and methamphetamine distributor; major antagonist of Seasons 2–4
   - **Appears:** Seasons 2–4
   - **Arc:** Chilean-born owner of the Pollos Hermanos chain; had a sophisticated drug distribution network in place before meeting Walter; his personal history with the Cartel drives Season 4's central conflict; killed by Hector Salamanca's bell bomb at the end of Season 4
   - **Key relationships:** Mike Ehrmantraut (enforcer), Walter White (cook/rival), Hector Salamanca (nemesis)

   ## Jesse Pinkman
   - **Role:** Walter's former high school student; co-manufacturer and street distributor
   - **Appears:** Seasons 1–5 (all episodes)
   - **Arc:** Petty drug dealer recruited by Walt; undergoes significant moral trauma over the series; survivor; escapes in the finale
   - **Key fact:** Was Walter's student at J.P. Wynne High School — not a college student or acquaintance
   ```

   Include at least 5 characters. The more specific, the more useful the skill.

   > 💡 **For Stranger Things:** Your characters might include Eleven (powers, Hawkins Lab origins, Season 1 arc), Chief Hopper (Hawkins PD, Hawkins Lab deal), Dr. Brenner (Lab director, "Papa"), the Demogorgon (Upside Down predator, Season 1 antagonist), and Will Byers (abducted in Season 1, connection to the Upside Down).

4. **Add `resources/canon-facts.md` — with at least 5 truths and 3 misconceptions**

   This is the most important resource. Breaking Bad's seeded FanHub data has deliberate errors that stem from exactly the kinds of misconceptions this file captures. Write it yourself:

   ```markdown
   # Breaking Bad — Canon Facts

   ## Established Truths
   - Walter White was a high school chemistry teacher in Albuquerque, not a college professor
   - Jesse Pinkman was Walter's former *high school* student, not a college acquaintance
   - Gustavo Fring is Chilean-born; his Pollos Hermanos restaurant chain predates his meeting with Walt
   - The blue tint of Heisenberg's meth comes from the methylamine synthesis route, not coloring
   - Hank Schrader works for the DEA, not the FBI or local police
   - The car wash where Walt works is "A1A Car Wash" — not "Blue Sky Car Wash" or any other name
   - Walter's cancer is lung cancer, diagnosed in Season 1, Episode 1

   ## Common Misconceptions to Correct
   - Walt did NOT start cooking before Season 1; his cancer diagnosis is the inciting event
   - Saul Goodman's real name is Jimmy McGill (established in Better Call Saul continuity)
   - The RV used in early cooking is not Walt's — it was borrowed from Jesse's friend Combo
   - Gus Fring did not work *for* the Cartel; he had an antagonistic history with them
   ```

   > 💡 **For Stranger Things:** Established truths might include "The Upside Down is an alternate dimension that mirrors Hawkins, Indiana — not a separate planet or timeline." Misconceptions: "Eleven's real name is not Eleven — it is Jane Hopper (née Ives), as revealed in Season 2."

   > 💡 **For The Office:** Truths: "Dunder Mifflin is a mid-sized regional paper company, not a national corporation." Misconceptions: "Michael Scott did not own the Scranton branch — he was the regional manager, an employee of corporate."

5. **Add `resources/quotes.md` — at least 5 attributed quotes with episode context**

   ```markdown
   # Breaking Bad — Notable Quotes

   ## Walter White
   - "I am the danger." — S04E06 "Cornered"; said to Skyler to assert his identity as Heisenberg
   - "I did it for me. I liked it. I was good at it. And I was really... I was alive." — S05E16 "Felina" (finale); Walt's admission to Skyler, the most honest moment of the series
   - "Say my name." — S05E07 "Say My Name"; establishing his dominance over Declan's crew

   ## Jesse Pinkman
   - "Yeah, science!" — S01E07 "A No-Rough-Stuff-Type Deal"; said in the RV during a successful cook
   - "Yeah, Mr. White! Yeah, science, bitch!" — commonly misquoted; see above for accurate phrasing

   ## Gustavo Fring
   - "I hide in plain sight, same as you." — S03E11 "Abiquiu"; to Walter, about their parallel public and private lives
   ```

   Include speaker, episode reference, and a brief note on context. The episode reference is what makes this useful — it lets Copilot distinguish between early-season and late-season characterization.

6. **Add `resources/seasons.md` — season-by-season summaries**

   Write brief summaries for each season you need (at minimum Season 1, since that's the FanHub seed data):

   ```markdown
   # Breaking Bad — Season Summaries

   ## Season 1 (7 episodes)
   **Major events:** Walt's cancer diagnosis; recruits Jesse; first cook in the RV; Emilio killed; Krazy-8 held captive then killed by Walt; Hank pursues "Heisenberg" lead; Walt's son (Flynn) born (actually Walt Jr. — the baby is Holly, born later)
   **Character status at season end:** Walt alive and cooking; Jesse alive; Krazy-8 dead; Emilio dead; Hank unaware of Walt's involvement
   **Tone:** Character study of Walt's moral descent beginning

   ## Season 2 (13 episodes)
   **Major events:** Tuco Salamanca conflict and death; introduction of Gustavo Fring; Jane Margolis introduced and dies (Walt allows it); plane crash over Albuquerque caused by Jane's father's grief
   **Character status at season end:** Jane dead; Walt more deeply committed to the life; Gus established as major player
   **Tone:** Walt's choices start producing consequences beyond himself
   ```

7. **Test: ask Copilot to generate a character bio**

   In Copilot Chat, ask:

   ```
   Use the breaking-bad-lore skill to write a 3-sentence bio for Gustavo Fring
   for the FanHub character detail page.
   ```

   Check: Does it cite `characters.md` or `canon-facts.md`? Does it correctly place Gus's operation *before* his meeting with Walt? Does it mention his Chilean origin?

8. **Cross-test with the accuracy-check prompt**

   Take the Copilot-generated bio and run it through the prompt from Exercise 3.3:

   ```
   /breaking-bad-accuracy-check [paste the Gus Fring bio here]
   ```

   A well-populated lore skill means the accuracy check now passes cleanly — or at worst flag minor stylistic issues rather than factual errors. The two exercises complement each other: the lore skill prevents errors at generation; the accuracy-check prompt catches any that slip through.

#### ✅ Success Criteria

- [ ] `.github/skills/[show]-lore/` created with `SKILL.md` and at least 3 resource files
- [ ] `SKILL.md` instructs Copilot to cite the resource it's drawing from when making factual claims
- [ ] `resources/characters.md` has at least 5 characters written by the participant (not auto-generated)
- [ ] `resources/canon-facts.md` has at least 5 established truths and 3 common misconceptions
- [ ] `resources/quotes.md` has at least 5 attributed quotes with episode context
- [ ] Copilot cites the skill resources when answering show lore questions
- [ ] Copilot correctly describes Gustavo Fring (or equivalent key character) without hallucination
- [ ] Accuracy-check prompt from Exercise 3.3 passes cleanly on Copilot-generated content

#### 📚 Official Docs

- [Agent Skills in VS Code](https://code.visualstudio.com/docs/copilot/customization/copilot-customization#_agent-skills)

---

## 🔗 What You Built

**In this exercise:**
- `.github/skills/[show]-lore/SKILL.md` — Instructions for when and how Copilot uses the resources
- `resources/characters.md` — Human-authored character roster with arc summaries
- `resources/seasons.md` — Season-by-season timeline and character status
- `resources/quotes.md` — Attributed dialogue with episode context
- `resources/canon-facts.md` — Established truths and explicit misconception corrections

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| Module 1 created `docs/[show]-universe.md` with high-level theme and tone | Exercise 4.4 adds deep-lore resources that Copilot can cite | Copilot now has both *context* (what this show feels like) and *facts* (what is actually true) |
| Module 3's accuracy-check prompt flags errors after generation | Exercise 4.4 prevents errors at the point of generation | The two form a defense-in-depth: correct first, then verify |
| Exercises 4.1–4.3 taught Copilot technical workflows | Exercise 4.4 teaches Copilot show knowledge | Copilot is now both a capable developer *and* a knowledgeable contributor for this project |

**Why this matters:** This is the first exercise in the workshop where you are the source of truth — not Copilot. The resources in `.github/skills/[show]-lore/` contain knowledge that no AI has reliably encoded, because it requires caring about a specific show, recalling specific episodes, and knowing what's commonly gotten wrong. When Copilot cites your resources correctly, you've experienced what it feels like for domain expertise to scale through AI: not AI replacing your knowledge, but AI applying it consistently.

---

## ➡️ Next Module

**[Module 5: MCP Servers](../05-mcp-servers/README.md)** — Now that Copilot knows your show's canon, let's see if the *live database* matches. The FanHub SQLite data was seeded with one season of Breaking Bad — but with deliberate errors. Module 5 connects the MCP server and lets you find them.

> *"The lore skill tells Copilot what the show says is true. I want to know if the database agrees."*
> — Rafael, already planning what he's going to query first
