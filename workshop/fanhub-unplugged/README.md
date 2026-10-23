---
status: active
updated: 2026-04-16
section: "Workshop"
references:
  - url: https://github.com/MSBart2/FanHub
    label: "FanHub Workshop Starter Repository"
    verified: 2026-04-16
  - url: https://x.com/karpathy/status/1886192184808149383
    label: "Andrej Karpathy — original vibe coding post (Feb 2025)"
    verified: 2026-04-16
  - url: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli
    label: "Copilot /init and agent orientation"
    verified: 2026-04-16
  - url: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
    label: "METR study: AI tools and developer productivity (July 2025)"
    verified: 2026-04-16
  - url: https://tools.simonwillison.net/colophon
    label: "Simon Willison's 204 vibe-coded tools — inspiration for what one-shot agent sessions can produce"
    verified: 2026-04-16
---

# FanHub Unplugged: Fix It, Ship It, Vibe It

> **The Question This Talk Answers:**
> *"How much can you actually ship in 60 minutes when an AI agent is doing the coding and you're doing the directing — and what does it feel like to fully give in to the vibes?"*

**Duration:** 60 minutes | **Target Audience:** Developers (all levels, any stack — VS Code or CLI)

---

## 📊 Content Fitness

| Criterion | Assessment | Notes |
|-----------|-----------|-------|
| **Relevant** | 🟢 High | Demonstrates the real ceiling of AI-assisted development velocity in a bounded, observable window |
| **Compelling** | 🟢 High | Timed sprint + unknown codebase + visible output = high engagement and instant credibility |
| **Actionable** | 🟢 High | Participants leave with muscle memory for agent-mode workflows they can apply the same day |

**Overall Status:** 🟢 Ready to use

---

<!-- 🎬 MAJOR SECTION: The Setup -->
## The Setup: What Is FanHub?

FanHub is a deliberately broken, underdocumented, multi-language fan site starter. It's not a toy example — it's a realistic mess. Four complete implementations (Node.js, .NET, Java, Go) all share the same intentional problems:

- **No documentation** — AI agents can't orient without context
- **Known bugs** — duplicate characters, broken filters, inconsistent API patterns
- **Generic UI** — unstyled, unthemed, crying out for personality
- **Incomplete features** — scaffolding everywhere, implementations nowhere

The point of FanHub is not to teach you the codebase. It's to give you a real target to point an agent at.

> *"This is exactly the kind of codebase I'd spend three days onboarding a new hire to. Let's see if the agent does it in three minutes."*
> — **Sarah**, looking at the zero-documentation starter for the first time

> *"Four languages, same bugs. That's actually kind of beautiful in a terrible way."*
> — **Marcus**, tabbing through the track folders

> *"The Jesse Pinkman duplicate is my favorite. Someone wrote that seed file, committed it, and shipped it. Without tests."*
> — **Elena**, already in BUGS.md

**Repository:** [github.com/MSBart2/FanHub](https://github.com/MSBart2/FanHub)
**Tracks:** Node.js (Express + React), .NET (ASP.NET Core + Blazor), Java (Spring Boot + React), Go (Gin + React)

---

<!-- 🎬 MAJOR SECTION: How to Work — Two Surfaces, Same Approach -->
## How to Work: VS Code Agent Mode or Copilot CLI

This sprint works identically whether you use **VS Code with Copilot Chat in agent mode** or **Copilot CLI** in your terminal. Both give you the same thing: a conversational interface where you describe what you want, the agent reads the codebase, writes the code, runs it, and iterates — while you direct from a high altitude.

Your job here is writing prompts. Leave the source files unread and the code untouched by hand.

### VS Code: Agent Mode in Copilot Chat

In VS Code, open Copilot Chat and set the mode to **Agent** (not Ask, not Edit). This activates full tool access — the agent can read files, write files, run terminals, and respond to errors it encounters on its own.

The workflow:
1. Open the repo in your dev container (Codespaces or local)
2. Switch Copilot Chat to Agent mode
3. Describe the task in natural language — the agent handles the rest
4. Watch the agent's tool calls in real time; steer with follow-up messages if it goes sideways

### Copilot CLI: The Terminal-Native Path

In the terminal, `copilot` gives you the same agent loop. Use Plan Mode (`Shift+Tab`) to collaborate on strategy before the agent starts writing. Use autopilot for the build sprint when direction is clear.

The workflow:
1. Open your Codespace terminal or local shell in the repo root
2. `cd` into your language track folder
3. Run `copilot` and describe the task — or use `/init` first to orient the agent
4. For longer tasks, use `--autopilot` or prefix with `&` to delegate and free the terminal

Both surfaces share the same model, the same tool access, and the same interaction model — describe what you want, let the agent work, steer when needed.

---

<!-- 🎬 MAJOR SECTION: Phase 1 — Pick, Init, Run -->
## Phase 1: Pick, Orient, and Run (0:00 – 0:20)

### Pick Your Stack (0:00 – 0:03)

Three minutes. One decision. Don't overthink it — pick the language you're most comfortable with and don't look back. The bugs are identical across all four tracks; the only variable is which agent prompts feel natural to you.

| Track | Stack | Codespace Config |
|-------|-------|-----------------|
| Node.js | Express + React + PostgreSQL | FanHub – Node.js |
| .NET | ASP.NET Core + Blazor + PostgreSQL | FanHub – .NET |
| Java | Spring Boot + React + PostgreSQL | FanHub – Java |
| Go | Gin + React + PostgreSQL | FanHub – Go |

**Recommended:** GitHub Codespaces eliminates setup friction entirely. "Codespaces" tab → "New codespace" → pick your dev container config. 2-core is sufficient.

### /init and Orient (0:03 – 0:10)

Before the agent does anything useful, it needs to understand the codebase. Run `/init` in Copilot Chat (agent mode) or in the CLI — and specify your language track so the agent scopes its orientation to the right folder rather than reading all four implementations.

```
/init I'm working in the node/ track — Node.js + Express + React + PostgreSQL
```

```
/init I'm working in the dotnet/ track — ASP.NET Core + Blazor + PostgreSQL
```

```
/init I'm working in the java/ track — Spring Boot + React + PostgreSQL
```

```
/init I'm working in the go/ track — Gin + React + PostgreSQL
```

Without the language hint, the agent reads the entire multi-language repo and produces a broad orientation. With it, it focuses on your working tree — the routes, models, and frontend components the agent will actually be touching.

After `/init`, ask: *"What are the three most impactful things I could fix or build in the next 45 minutes?"* The answer will be grounded, specific, and ranked — not generic.

**The unlock:** An oriented agent that has read your codebase produces dramatically better code than one guessing from zero context. `/init` is not optional.

### Build and Run (0:10 – 0:20)

Get the app running. Follow the track's `SETUP.md` — or just ask the agent: *"Walk me through getting this running from the beginning."*

Use the agent to fix any setup errors. This is not a detour; it's the first real demonstration of the loop — the agent reads the error, identifies the cause, and fixes it without you touching a file.

Common setup gotchas by track:
- **Node:** `npm run install:all` at the root, not `npm install` in a subfolder
- **.NET:** `docker-compose up -d db` before `dotnet run` — database must be running first
- **Java:** Frontend and backend run on different ports (3000 and 5265)
- **Go:** `docker-compose up --build` — Go requires the full compose stack

Once running, explore the visible bugs briefly — not to fix them yet, but to give the agent something to work from. Two Jesse Pinkmans in the character list. A season filter that doesn't filter. That's enough context to start.

---

<!-- 🎬 MAJOR SECTION: Phase 2 — Choose Your Adventure -->
## Phase 2: Choose Your Adventure (0:20 – 0:48)

### Pick a Path (0:20 – 0:25)

> *"I'm going straight to Path A. I want to see if it finds the root cause or just patches the symptom."*
> — **Sarah**, opening BUGS.md with forensic intent

> *"Rebrand. All day. I'm making this a Ted Lasso site and I don't want to hear about it."*
> — **Marcus**, who has already decided

> *"I'm doing the trivia game. Rafael already called it a 'delightful engagement mechanic' and we haven't even started."*
> — **Jessica**, heading for Path D

> *"The auth scaffolding is the most architecturally interesting gap. The middleware exists but nothing is wired. That's the kind of thing that bites you in production."*
> — **David**, predictably

Five minutes to pick a direction, then hand it to the agent. The goal is to give the agent a clear enough mandate that it can run for 20+ minutes with minimal interruption. Vague prompts produce meandering work; specific prompts with clear success criteria produce shippable output.

**🐛 Path A: Bug Blitz**

Open `BUGS.md` (or ask the agent to list the highest-severity bugs) and pick a cluster. Give the agent a batch — not one at a time:

> *"Fix the three highest-severity bugs in BUGS.md. For each one, explain the root cause before writing the fix."*

Some satisfying clusters from the actual BUGS.md:
- **The Jesse Problem** — Bug #1 duplicates Jesse Pinkman in the seed data; Bug #2 breaks the season filter because the cache ignores the season parameter. Fix both and the Characters page goes from embarrassing to functional.
- **API Consistency** — Bugs #3, #6, #9, #17: mixed URL prefixes, wrong HTTP status codes, inconsistent response shapes. One prompt to standardize the whole API surface.
- **Auth scaffolding** — Bug #21 defines `authMiddleware` and `adminMiddleware` but they're never wired up. Bug #22 lists logout, token refresh, and password reset as TODO. Get the agent to finish what was started.
- **Security sweep** — Bugs #7, #18, #19, #20: weak passwords, error details exposed in production, no input validation, CORS wide open. One prompt to harden the API.

Batching is critical — single-bug prompts waste context on back-and-forth. Give the agent a thematic cluster and let it run.

**🎨 Path B: Full Rebrand**

Pick a show — any show you care about. Then give the agent a complete brief in one shot. The key is specificity: colors, tone, flavor text, and named UI elements all in the same prompt.

> *"Rebrand this entire app as a [YOUR SHOW] fan site. Use a color palette that matches the show's visual identity — [describe the colors or mood]. Replace every generic label and placeholder with flavor text from the show's universe. Update the character cards to feel on-brand. Add a tagline to the header that a fan would recognize. Make the footer reference something iconic from the show. Do everything — CSS, components, and copy — in one pass."*

The more specific you are about the show's aesthetic, the better the output. *"Dark and gritty"* is weaker than *"deep charcoal with acid-green accents."* *"Funny"* is weaker than *"dry British office humor with awkward silences."*

The agent will touch a dozen files simultaneously. You don't review mid-run. When it's done, evaluate the whole thing at once and redirect from there.

**✨ Path C: Build Something That Doesn't Exist Yet**

FanHub is missing an entire tier of features — the README documents them explicitly as gaps. Pick one and give the agent a complete, end-to-end spec:

> *"Add full-text search across characters and episodes. The search box lives in the navbar. Results appear in a dropdown as the user types. The API gets a `?q=` parameter. Build both layers — API endpoint and frontend — and wire them together end-to-end."*

> *"Build a character detail page. Clicking a character card navigates to `/characters/:id`. The detail page shows their full bio, actor name, all their quotes, and the episodes they appeared in. Build the route, the API endpoint if needed, and the page component."*

> *"Add episode ratings. Each episode card has a 1–5 star rating widget. Ratings persist in the database. The API needs a PATCH endpoint. Build the whole thing."*

End-to-end specs produce end-to-end features. Under-specified prompts produce stubs.

**💅 Path D: Delight Mode — Fun Extensions**

These are the ideas that make people laugh or lean forward in their chairs. All are grounded in what FanHub actually has (characters, episodes, quotes, a live API):

> *"Build a 'Who Said It?' trivia game. Show a random quote from the database. Give the player four character options (one correct, three wrong). Track score across rounds. Build it as a new page at `/trivia`."*

> *"Add a 'Quote of the Day' feature to the home page. Pick a random quote from the database each day (seeded by date so it's consistent for all users). Display it prominently with the character's name and a one-click share button that copies formatted text to clipboard."*

> *"Build a character relationship graph. Use D3.js (or Recharts) to visualize which characters share episodes together. Each node is a character; edges appear when two characters appear in the same episode. Make it interactive — click a character to highlight their connections."*

> *"Add 'Heisenberg Mode' — a dramatic dark-theme toggle in the header. When activated, the whole UI shifts to a high-contrast dark palette with a subtle color-shift animation. Persist the preference in localStorage."*

> *"Build a shareable quote card generator. Each quote gets a 'Share' button that renders a styled card (show branding, character name, quote text) as a canvas element and lets the user download it as a PNG."*

> *"Add pagination to the characters and episodes lists. Neither endpoint currently limits results. Add page size, page number, and total count to every list response, and build a pagination UI component that works across all list pages."*

The common thread: all of these are **scoped features with a clear done state**. The agent can build any of them start-to-finish in 20 minutes with a well-written prompt. The fun is picking the one that sounds most interesting to you and watching it appear.

#### 💡 Good Idea Fairy: More Sparks for Path D

Don't want any of the above? Shout one of these at the agent and see what comes back:

**Show some personality**
- *"Make the 404 page in-character — 'You didn't see this. — Mike Ehrmantraut'"*
- *"Replace the loading spinner with the show's most iconic visual — the RV, the yellow umbrella, the throne, whatever fits"*
- *"Add a dramatic entrance animation where character cards slide in like a standoff cutscene"*
- *"Make the page title update to the currently hovered character's most famous catchphrase"*

**Data toys**
- *"Add a 'who would win in a fight' random matchup generator — coin flip, two character cards, one-line justification"*
- *"Build a mood-based episode recommender — pick three words and get an episode suggestion"*
- *"Add a 5-question trivia quiz seeded from existing characters and episode titles"*

**UX that was waiting to exist**
- *"Add a spoiler mode toggle that blurs character names and bios until hover"*
- *"Add keyboard shortcuts: `/` to focus search, `Escape` to clear, arrow keys to navigate results"*
- *"Add a 'recently viewed' section in the sidebar that persists across page reloads with localStorage"*

**The 'wait, does that actually work?' tier**
- *"Write a Playwright smoke test suite that visits every route and takes a screenshot"*
- *"Generate OpenAPI docs from the existing routes, served at `/api/docs`"*
- *"Build a CLI seed script that takes any TV show cast as a JSON file and populates the database"*

**Heisenberg Mode (earned — ship one thing first)**

Heisenberg Mode is an earned unlock. Ship one working feature from any path above, then come back and ask the agent to go completely unhinged:

- *"Rebuild the entire CSS around the aesthetic of the RV from season 1"*
- *"Rewrite every character bio from Walter's point of view — he has opinions about everyone"*
- *"Replace all API error messages with in-character quotes from the show"*

> *"I want to do Heisenberg Mode first. I understand the rule. I still want to do it first."*
> — **Rafael**, immediately

### The Build Sprint (0:25 – 0:48)

Twenty-three minutes of agent output. Your job is to **direct, not implement**.

**The right interaction pattern:**
- Describe the goal clearly upfront — don't give the agent half a prompt and expect it to infer the rest
- Let it run without interrupting for at least 5 minutes — multi-file operations take time
- When it pauses for input, answer with specifics: *"yes, include the API layer"* or *"no, use the existing auth middleware, don't build new"*
- When it goes wrong, don't fix the code manually — tell the agent what's wrong and let it fix itself

**The wrong interaction pattern:**
- Reading the generated code line by line before the agent finishes
- Manually editing files the agent is mid-way through
- Asking the agent to explain code it just wrote — save explanations for after it ships

> *"I just pasted a stack trace into the chat with zero explanation and it fixed it. I've been a developer for fifteen years and that felt wrong and correct at the same time."*
> — **Sarah**, twelve minutes into the sprint

> *"I caught myself opening the file to fix a typo. Closed it. Asked the agent instead. It fixed the typo and three related issues I hadn't noticed."*
> — **Elena**, reporting a near-relapse

**The error-paste pattern (Karpathy's original workflow):**
When you get an error message, paste it into the chat with no additional comment. Just the error. No preamble. The agent has the context; it knows what it just built; it will almost always fix it. The instinct to pre-analyze the error before asking is slower than just dumping it into the conversation and watching what happens.

**If you're stuck more than 2 minutes, it's a prompt problem — not a Copilot problem.**
Restate the goal more specifically. Add constraints. Show the agent the error output. The response to friction is better prompting, not switching tools.

**VS Code users:** Use agent mode with Copilot Edits for multi-file changes. The agent can stage changes across the whole frontend + backend in a single turn.

**CLI users:** Use `--autopilot` once direction is set. Use Plan Mode (`Shift+Tab`) if you want to review the strategy before the agent starts writing. Use `/fleet` to decompose the feature into parallel workstreams if you're ambitious.

---

<!-- 🎬 MAJOR SECTION: Phase 3 — MCP Power Move -->
## Phase 3: MCP Power Move and Ship (0:48 – 1:00)

### MCP Power Move (0:48 – 0:53)

FanHub ships with `fanhub-api-server` — an MCP server that exposes the app's own live API as tools Copilot can call directly from chat. This isn't a demo gimmick; it's the point where the agent stops being a code writer and starts being a system operator.

What changes with MCP connected:
- **Query the live database** — *"How many characters are in the database right now? Are there any duplicates?"*
- **Add data without leaving chat** — *"Add a quote from Walter White: 'I am the danger.'"*
- **Verify your own work** — *"You just added search. Use the API to run a few test queries and tell me if the results look correct."*
- **Debug with live context** — *"The character detail page is returning 500. Check the API response for character ID 42 and tell me what's wrong."*

Without MCP: Copilot suggests code → you run it → you read the output → you paste it back → you ask the next question.

With MCP: Copilot calls the tool, reads the response, incorporates it into reasoning, and acts — without leaving the chat window. The agent can observe and verify its own work against the live system.

This is the difference between an agent that writes code in isolation and an agent that closes the feedback loop.

### Polish (0:53 – 0:57)

Ask the agent to write the README update for everything it just built. Give it no instructions — it knows what changed because it changed it:

> *"Write a README section documenting what we built in this session — what the feature/fix is, how to use it, and any relevant technical details."*

Then ask it to find anything that looks rough:

> *"Review what we built. What's the most brittle or incomplete part? Fix it."*

### Show and Tell (0:57 – 1:00)

Everyone demos one thing. Most creative use of the agent wins bragging rights.

Strong demos:
- Show the prompt that generated the most code — one sentence, dozens of files changed
- A bug fix where the agent found the root cause faster than you would have
- An MCP moment where the agent used live data to verify its own output
- Before/after that makes the old version look embarrassing

---

## Mental Model: Director, Not Implementer

The sprint teaches one mental shift that transfers to every future AI-assisted project:

**Your job is to hold the vision and communicate it clearly. The agent's job is to implement it.**

This is Andrej Karpathy's original framing for vibe coding — "you fully give in to the vibes, embrace exponentials, and forget that the code even exists." His description of his own workflow: *"I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."* It was Collins Dictionary's Word of the Year for 2025. It's not a joke; it's a serious shift in how development works.

The failure mode is getting pulled back into implementation — reading generated code, making manual edits, debugging line by line. Every minute you spend in the code is a minute you're not directing the agent. The agent is faster at implementation than you are. Your advantage is judgment: knowing what to build, what success looks like, and when to redirect.

### The Honest Tradeoffs

Vibe coding is genuinely useful for prototyping, sprints, and exploratory work. It is not a free lunch in production:

- **METR's 2025 study** found experienced developers were 19% *slower* with AI tools on complex open-source tasks — despite predicting they'd be 24% faster and still believing afterward they had been faster. The perception gap is real.
- **CodeRabbit's 2025 analysis** of 470 PRs found AI co-authored code had 1.7x more "major" issues than human-written code, with 2.74x more security vulnerabilities and 75% more misconfigurations.
- Simon Willison's line is the clearest: *"Vibe coding your way to a production codebase is clearly risky."*

> *"The METR study is doing a lot of work in this conversation. 'Experienced developers on complex open-source tasks' is not the same as 'me telling an agent to finish a trivia game in 20 minutes.'"*
> — **Rafael**, accurately

> *"I accept the tradeoffs for a sprint. I would not accept them for the auth layer in a production system. Those are different problems."*
> — **David**, drawing the correct line

> *"I verified every fix the agent made against the actual bug description in BUGS.md. Three out of four were correct and one needed a follow-up prompt. That's not magic but it's also not nothing."*
> — **Elena**, who ran the numbers

What this means for the sprint: FanHub is the right context for vibe coding. It's a workshop app, intentionally broken, safe to experiment with. The goal is to build the skill of directing agents effectively — including knowing when to slow down and review, which you'll learn by doing it fast first.

### The Practical Discipline

1. **Write complete prompts** — specify the goal, the constraints, and what done looks like
2. **Let it run** — resist the urge to interrupt mid-task
3. **Steer with words** — when it goes wrong, describe the problem in plain language and let the agent correct
4. **Use MCP to close the loop** — have the agent verify its own work against the live system

---

## What You Can Do Today

The habits from this sprint transfer immediately:

- **Use `/init` before every agent session** on any unfamiliar codebase
- **Write complete prompts** — goal + constraints + success criteria in one message
- **Batch your requests** — clusters of related changes beat single-item back-and-forth
- **Connect MCP servers** to let the agent observe and verify, not just generate
- **Direct, don't implement** — if you're editing code manually, the agent could be doing it

---

## Vibe-Coding Ground Rules

1. **Phase 1 is non-negotiable.** Nothing ships until the app builds. Getting it running is the first deliverable.
2. **Phase 2 is yours.** No wrong choices. The only failure is shipping nothing.
3. **If you're stuck more than 2 minutes, it's a prompt problem.** Restate the goal, add constraints, show the agent the error. Don't Google.
4. **Don't read the code.** If you're reading source files to understand what the agent wrote, you're in the wrong mode. Ask the agent to explain it in chat — then move on.
