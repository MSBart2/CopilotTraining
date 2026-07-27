# Exercise 1.1: Create ARCHITECTURE.md

## 🔨 Exercise

### Exercise 1.1: Create ARCHITECTURE.md — "Reduce Context Waste with Structural Documentation"

**Lead:** David ⭐ | **Support:** All 🤝 | **Time:** 12 min

#### 📖 The Challenge

David looks at the FanHub codebase and sees what every architect fears—a project with no map. The frontend is React, the backend is Express, but nowhere is this documented. Every time someone asks Copilot a simple question like "where should database queries go?" it has to analyze hundreds of files to figure out the structure.

Sarah chimes in: *"I timed it. Without architecture docs, Copilot takes 8 seconds to answer 'where do routes live?' because it's scanning the entire codebase. That's wasted time and wasted tokens on every query."* Marcus adds: *"And when I ask about database patterns, it gives me three different approaches because it can't tell which one we're actually using."*

David knows the solution: *"Before we write another line of code, we need ARCHITECTURE.md. Not a detailed spec—just enough structure so Copilot (and new developers) understand what goes where and why."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Ask Copilot "where do database queries go?" → Analyzes 847 files → Response in 8 seconds → Suggests 3 different patterns | Ask Copilot "where do database queries go?" → References ARCHITECTURE.md → Response in 2 seconds → Suggests correct `src/database/` pattern |
| **Response Time:** 8 seconds<br>**Files Analyzed:** 847<br>**Suggestions:** Inconsistent (3 patterns) | **Response Time:** 2 seconds<br>**Files Analyzed:** 1 (architecture doc)<br>**Suggestions:** Consistent (documented pattern) |

#### 🎯 Your Goal

Create `fanhub/docs/ARCHITECTURE.md` that gives Copilot (and humans) structural understanding of the FanHub project in under 2 minutes of reading.

#### 📋 Steps

1. **Open Copilot Chat and use `@workspace` to analyze the structure**

   ```
   @workspace Analyze the FanHub project structure. Create an ARCHITECTURE.md
   that includes:
   - Tech stack (frontend, backend, database)
   - Folder structure (what goes where)
   - Data flow (how requests move through the system)
   - Key patterns (how we handle routes, database queries, API calls)

   Keep it concise—focus on structure, not implementation details.
   Save to fanhub/docs/ARCHITECTURE.md
   ```

   **Expected behavior:** Copilot analyzes the workspace and generates documentation covering the React frontend, Express backend, SQLite database, and folder organization.

2. **Review the generated ARCHITECTURE.md**

   Open `fanhub/docs/ARCHITECTURE.md` and verify it includes:
   - **Tech Stack** section listing React, Express, SQLite, Docker
   - **Folder Structure** section showing `/frontend`, `/backend`, `/docs`
   - **Data Flow** section explaining request routing
   - **Key Patterns** section describing how routes, database access, and error handling work

   Look for any inaccuracies (files that don't exist, wrong patterns) and correct them.

3. **Stress-test the Data Flow section on a route that isn't straightforward**

   `@workspace`'s first pass at "Data Flow" usually documents the easy, linear case — a `GET` that goes straight from route to database and back. `GET /api/quotes/spotlight` isn't that case, and it's a good test of whether your documentation actually holds up: the response depends on *which show* the request is about, and that isn't passed as a parameter anywhere in the URL.

   Ask Copilot to trace it explicitly:

   ```
   @workspace Trace exactly how the app determines which show a request to
   GET /api/quotes/spotlight (and GET /api/characters) is about. There is no
   show_id in the URL or query string. Follow the request through every layer
   — middleware, service/business logic, controller, response shape, and
   frontend — and tell me what this "which show" concept is called at each
   layer. Add your findings to the Data Flow section of ARCHITECTURE.md as a
   table: Layer | Name Used | File.
   ```

   **Expected behavior:** Copilot has to actually open the middleware/interceptor, not just the controller, to answer this — a plain grep for `show_id` won't surface the answer, because the name changes at every hop. Don't accept a vague answer ("it's passed through context"); push Copilot to name the exact variable, header, or dictionary key at each layer.

   **Verify Copilot's table against the code yourself** — this is the point of the exercise, not a formality. Open the middleware file for your track and confirm the terminology map is complete and accurate:

   | Layer | Node.js | .NET | Java | Go |
   |---|---|---|---|---|
   | Request signal | `X-Show-Slug` header | `X-Show-Slug` header | `X-Show-Slug` header | `X-Show-Slug` header |
   | Middleware/interceptor | `req.universe` | `HttpContext.Items["Universe"]` | request attribute `"universe"` | `c.Set("universe", ...)` |
   | Service/controller variable | `activeSeries` | `activeSeries` | `activeSeries` | `activeSeries` |
   | API response field | `program.programId` | `program.programId` | `program.programId` | `program.programId` |
   | Frontend state | `currentShow` | `currentShow` | `currentShow` | `currentShow` |

   If Copilot's table is missing a hop or invents a name that isn't actually in the code, correct it — a wrong terminology map is worse than no map, because the next person (or the next Copilot session) will trust it.

   > ⚠️ **Don't confuse this with Exercise 1.6.** The middleware/interceptor layer happens to be called `universe` in the code (`req.universe`, `HttpContext.Items["Universe"]`, etc.) — that's an unrelated, unfortunate naming coincidence with the `docs/[show]-universe.md` canon file you'll build later in this module. One is a request-scoped "which show is this about" flag; the other is a static reference document about the show's characters and lore. If your terminology map conflates the two, that's exactly the kind of ambiguity this exercise exists to catch.

   > 💡 **Why this matters more than it looks like it should:** this isn't a contrived puzzle — it's the single most common reason AI coding agents (and new hires) give confidently wrong answers in real codebases. The concept never changed; only its name did, at every layer, with no rosetta stone. Once you write the terminology map down in ARCHITECTURE.md, every future Copilot session in this repo inherits it for free.

4. **Test the improvement with a query**

   In Copilot Chat, ask:
   ```
   @workspace Where should I add a new database query for retrieving show details?
   ```

   **Expected result:** Copilot references ARCHITECTURE.md and immediately suggests `backend/src/database/` following the documented pattern. Response should be faster (2-3 seconds) and more specific than before.

5. **Refine based on team feedback**

   Share the ARCHITECTURE.md with the team. Ask:
   - Is the tech stack complete?
   - Does the folder structure match reality?
   - Are the key patterns accurate?
   - Does the active-show terminology map hold up — did anyone find a layer it missed?

   Make any necessary adjustments before committing.

#### ✅ Success Criteria

- [ ] `fanhub/docs/ARCHITECTURE.md` exists and is under 200 lines (concise, not exhaustive)
- [ ] Document includes: Tech Stack, Folder Structure, Data Flow, Key Patterns
- [ ] Data Flow section includes the active-show terminology map (Layer | Name Used | File) covering middleware, service/controller, API response, and frontend
- [ ] The terminology map was verified against the actual code, not just accepted from Copilot's first draft
- [ ] Test query shows faster response time (compare before/after with timer)
- [ ] Copilot now references ARCHITECTURE.md when answering structural questions (visible in chat responses)
- [ ] Team agrees document is accurate (no major corrections needed)

> 📂 **Compare Your Work**: [`examples/completed-config/docs/ARCHITECTURE.md`](../examples/completed-config/docs/ARCHITECTURE.md)

#### 📚 Official Docs

- [VS Code: Copilot Chat Context](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-context) — How `@workspace` provides project-wide context
- [GitHub Docs: Prompt Engineering](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-using-github-copilot) — Best practices for effective prompts

---

## 🔗 What You Built

**In this exercise:**
- `fanhub/docs/ARCHITECTURE.md` — Project structure documentation that reduces context waste and speeds up AI queries
- An active-show terminology map (Layer | Name Used | File) documenting the naming drift across middleware, service/controller, API response, and frontend for `/api/quotes` and `/api/characters`

**Impact metrics:**
- Query response time: 8s → 2s (75% faster)
- Files analyzed per query: 847 → 1
- Consistency: 3 conflicting patterns → 1 documented pattern
- Active-show naming: 5 undocumented names for one concept → 1 documented map, reusable by every future Copilot session in this repo

---

## ➡️ Next Up

**[Exercise 1.2: Create copilot-instructions.md](exercise-1.2.md)** — Now that Copilot knows your structure, teach it your standards

> *"Architecture documentation tells Copilot WHERE things go. Now we need to tell it HOW to write them."*
> — Sarah, ready to enforce React patterns automatically

---
