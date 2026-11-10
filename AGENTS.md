# CopilotTraining Agent Instructions

`AGENTS.md` is the canonical source for editorial policy across workshops, practitioner tech talks, executive talks, and slides. Format-specific agents, skills, and templates may add constraints but must not weaken or contradict it.

---

## 1. North Star

> Great Copilot education helps capable people form better judgment about context, delegation, verification, and authority, then lets them prove that judgment in their own work.

Treat the audience as capable peers calibrating a new way of working, not converts waiting to be convinced. Product knowledge earns space when it improves a decision or enables useful practice.

This repository serves real people doing real work in real environments. Every artifact must stay grounded in a recognizable person, a consequential task, the constraints surrounding that task, and an outcome that matters in practice.

- **Show capability in motion** — use working artifacts, commands, configurations, workflows, and observable results. Let the audience see what becomes possible and how it behaves.
- **Teach through proof** — connect explanation to a demonstration, inspection, or validation that the audience can reproduce. Documentation summaries provide supporting context; they are never the main event.
- **Build practical judgment** — help the audience decide what to try, what context it needs, what evidence makes it acceptable.

Academic framing, abstract taxonomies, and product-documentation tours do not earn space on their own. Include theory or feature detail only when it clarifies a real decision, explains observed behavior, or enables successful practice.

---

## 2. The Core Question

The core question (the README's "question this talk answers" and the Core Question slide) exists to give the learner an immediately recognizable question in their own voice. We want the reader to think "yes, that's my question" before the first section starts.

- **Ask from the learner's seat.** Write in first person or plain second person about something the learner wants more of (speed, confidence, fewer interruptions, better results) or wants less of (rework, surprises, risk, waiting).
- **Make it instantly understood.** One short sentence, everyday words, no product taxonomy, no internal framing labels such as "produce, reason, measure", and no list of features.
- **Keep it straightforward.** Typical shapes: "How do I get X without Y?", "How can I trust X?", "When does X help me, and when does it get in the way?"
- **Leave the cleverness to the answer.** The thesis, tension, and section structure carry the insight; the question only has to be one the learner already has.
- **Test it:** Would a member of the target audience ask this, word for word, of a colleague? If it needs the talk to make sense, rewrite it.

---

## 3. Relevant, Compelling, Actionable

Apply these three tests from the first content decision onward. Use them to select the topic, shape the thesis, choose the artifact and proof, allocate time, and revise the draft. Reapply them as a hard gate before publication.

Every talk or module must be all three:

- **Relevant** — begins with a concrete practitioner role, team, or sourced person in a recognizable situation, facing a consequential decision in a realistic workflow. Establish who needs the judgment, when they need it, and what outcome the decision affects. Product breadth, novelty, and release timing alone do not establish relevance.
- **Compelling** — earns attention by changing how the audience understands or approaches that decision. Use a useful insight, honest tension, consequential tradeoff, or working demonstration that offers more than a feature inventory or documentation tour.
- **Actionable** — enables the audience to transfer the judgment into its own environment. Provide a decision method, usable artifact or concrete next step, observable evidence. Content proves transfer when the audience can:
  1. make a decision rather than repeat a feature description,
  2. produce or inspect observable evidence,
  3. adapt the decision to a real repository, workflow, or organization.

Evaluate the content throughout creation and again before publication:

1. **Relevant:** Can the artifact identify the practitioner role or team, workflow, decision, and consequence?
2. **Compelling:** Can it state the insight that earns attention without listing product features?
3. **Actionable:** Can the audience produce or inspect evidence in its own environment?

Revise or reconsider content that misses any dimension. Feature coverage, novelty, and presentation polish cannot compensate for a weak decision or missing transfer.

---

## 4. Judgment Lenses

Each artifact must develop at least one relevant judgment lens. Select the lenses the topic genuinely needs; do not force all four into every section.

| Lens | Question the audience becomes better able to answer |
|---|---|
| **Context** | What information, environment, and constraints make this task ready for Copilot? |
| **Delegation** | What can be handed off, what stays human-led, and how is the handoff bounded? |
| **Verification** | What observable evidence makes the result acceptable, and how do we recover when it is wrong? |
| **Authority** | Who may propose, execute, approve, reject, or escalate this work? |

---

## 5. Voice and Prose

- **Respectful** — preserve dignity, use no gatekeeping, and write for capable peers calibrating a practice. Treat successful existing approaches as valid context rather than something the audience must renounce.
- **Optimistic curiosity** — lead with what becomes possible. Use opportunity and discovery framing, invite useful experimentation, and show progress without hype or manufactured urgency.
- **Practical** — focus on what works. Prefer concrete decisions, artifacts, examples, and observable checks over abstractions or feature inventories.
- **Honest** — acknowledge limitations and tradeoffs. Name failure signals, recovery paths, authority boundaries, and escalation routes as useful operating constraints.
- **Encouraging** — celebrate demonstrated progress and normalize learning, iteration, and recovery. Give the audience a credible next move when an attempt fails.
- **Direct-positive prose** — state the desired behavior or useful claim directly. Avoid rhetorical flips such as "not X, but Y," comparative negativity, and deficit framing.
- **Never use "should"** — it hides obligation inside friendliness and leaves the reader guessing whether something is required, recommended, or merely expected. Say what you mean: a requirement (`must`, or an imperative such as "Pin the model"), a condition ("When the eval says NO, tighten that instruction"), a capability ("can"), or a decision with a named owner ("The reviewer decides…"). In questions, ask the real question: "Which chores fit an agent?" rather than "Which chores should you hand to an agent?" This applies to every artifact: READMEs, slides, speaker notes, exercises, and agent instructions.
  - **Pull, don't push.** When it fits, frame the sentence around what we want: start where the win lives and work backward to the step that earns it. "We want a triage comment a maintainer can verify in ten seconds, so every label carries a SHA-pinned link" pulls the reader toward the outcome. "You should add a link to every label" pushes a duty onto them. Lead with the desired result ("We want…", "The goal is…", "Success looks like…"), then name the move that gets there.
- **Evidence discipline** — distinguish sourced facts, observed results, estimates, and proposed targets. Never invent metrics or present a target as an achieved result.
  - **Label once, where it matters.** A worked example with fictional names reads as an example; say so once (in the section opener's speaker notes or the README), not on every slide. Put an on-slide label only on a number, timing, or behavior the audience could mistake for a measured or observed result. Repeated subtitles and footnotes such as "illustrative · fictional · no call was made" crowd out the point; never stack them.
- **Clear language** — front-load the point, use active voice, keep sentences purposeful, and remove prose that exists only to sound impressive.

Avoid shame, threat framing, unsupported superlatives, frictionless success stories, and claims whose confidence is unclear in every format.

| Format | Framing | Voice | Lead with |
|---|---|---|---|
| **Workshop** | A realistic attempt, inspection, adjustment, and validation | Respectful across experience levels; persona-authentic | What participants build, test, and validate |
| **Practitioner tech talk** | Opportunity and discovery | Optimistic curiosity; expert-to-expert | What this unlocks, what is now possible, and how it works |
| **Executive talk** | The technical decision maker's platform choice and its delivery outcome | Authoritative, persuasive, evidence-led, and third-person | Why GitHub Copilot is the right AI platform for this organization's SDLC, and how to prove it |

---

## 6. Format Notes

### Workshop

Use an attempt → inspect → adjust → rerun → validate loop. Planned metrics are targets until participants produce evidence. End with an explicit transfer question about their own work.

### Practitioner tech talk

A practitioner tech talk is a coherent argument for one consequential decision. The template supplies coverage prompts; it does not supply the narrative or require its headings to become the running order. Teach a decision model, demonstrate it through a working artifact, validate the outcome, and name when the pattern stops fitting. Leave practitioners with a concrete application to their own repository or workflow.

- **Begin with a practitioner in motion** — identify the concrete role or team, the real workflow, the decision in front of them, and the consequence of that decision. Do not invent named personas for practitioner tech talks; use a real, authorized person only when the source material supports it.
- **Build around one useful tension** — choose an honest tradeoff, boundary, or surprising mechanism that changes how the audience approaches the decision. Every section must advance that thesis.
- **Give the section spine momentum** — use escalating audience questions or practitioner moves rather than a taxonomy of product parts, control types, or settings pages.
- **Follow an earned arc** — move from situation and question → insight or decision model → technical mechanism → working artifact or demonstration → observable evidence and boundaries → transfer to the audience's work. A strong demonstration may serve as the cold open when seeing the result first makes the later architecture matter.
- **Make the artifact carry the argument** — use a real configuration, command, workflow, or code path to expose the mechanism. Show the result, failure signal, and recovery path.
- **Choose one memorable anchor** — identify the demonstration, result, number, or technical reveal we want the audience to repeat after the talk, then build the surrounding explanation to earn it.
- **Spend time according to value** — give the strongest insight and demonstration the most room. Consolidate supporting mechanics and remove sections that do not change a decision or strengthen proof.

For a new talk, approve a research brief and structural proposal before drafting. The proposal must identify the audience, question, thesis, tension, artifact, evidence, boundary, and intended transfer, and pass the Section 3 gate. Skip this gate only when the user explicitly requests it.

### Executive talk

The audience is always a technical decision maker (TDM): a CTO, VP of Engineering, or head of platform engineering or developer experience who chooses and standardizes the AI coding platform. The posture is always persuasive: make the case for choosing GitHub Copilot as the AI platform for an AI-enabled SDLC that ships better software, faster.

Persuasion earns its credibility from evidence. Build the case on first-party sourced capabilities and labeled data, give the TDM criteria they can hold any vendor to, and answer them with Copilot. Name a competitor only with a current, cited source; label vendor and commercially interested numbers once. State the boundary where the case is weaker, the decision and owner, and a measured way to prove the choice (a pilot with thresholds dated before launch). Distinguish sourced facts, observed results, estimates, and proposed targets.

---

## 7. Repository, Agents, and Content Hygiene

| Content | Location | Agents |
|---|---|---|
| Workshop modules (personas, exercises, metrics) | `workshop/` | `module-planner`, `module-creator`; decks: **Slide Generator** (Slidev) |
| Practitioner tech talks (the 1-hour show-and-tell) | `tech-talks/` | **Tech Talk Generator** (research, landing README, recipe), then **Native Deck Author** (deck and speaker notes in `slides/tech-talks/<slug>/slides.js`); unconverted Slidev decks: **Tech Talk Slide Generator** (legacy, patches only) |
| Executive talks | `tech-talks/exec-*` | **Tech Talk Generator** in executive mode (research, landing README, recipe), then **Native Deck Author** (deck and speaker notes in `slides/tech-talks/<slug>/slides.js`) |

Native tech talks and executive talks are notes-first: the speaker notes are the teaching source and the README is a landing page. Deck authoring rules live in `.github/instructions/native-decks.instructions.md` and `.github/instructions/slidev-decks.instructions.md`.

**Archived content is frozen.** Any file with `status: archived` in frontmatter must never be modified by any agent. Stop and inform the user.

**All content files require frontmatter:**

```yaml
status: active # or "archived"
updated: YYYY-MM-DD
```

Tech talks and exec talks also require `section:` matching a valid value from `slides/SECTIONS.md`.

---

## 8. Workflows

### Announcement-driven tech talk refresh

Keep live talks current without turning them into release notes. The Microsoft Developer Changelog feed is for discovery only; first-party docs and release notes are the source of truth, and `.github/content-routing/ledger.json` is the work queue. Start with `npm run content:route -- --since <README updated>`, then follow the `content-refresh` and `ledger-tech-talk-refresh` skills. Full guide: [docs/announcement-feed/README.md](docs/announcement-feed/README.md).

### Shipping slides

Before committing slide or companion changes, invoke the **Deploy** agent (`.github/agents/deploy.agent.md`). It refuses to commit stale or missing Slidev companions or a failing native validation, then commits and pushes.
