# Exercise 6.6: The Show-Expert Agent

## 🔨 Exercise

### Exercise 6.6: The Show-Expert Agent — "Five Modules, One Agent, Zero Setup"

**Lead:** Sarah ⭐ | **Support:** David 🤝, Elena 🤝, Marcus 🤝, Rafael 🤝 | **Time:** 20 min

#### 📖 The Challenge

It's 4:55 PM on the last day of the workshop. The team is looking at what they've built.

Sarah pulls up a list. Universe file in `copilot-instructions.md`. Accuracy-check prompt in `.github/prompts/`. Lore skill in `.github/skills/`. MCP server connected. Agent workflows wired. Each piece works exactly the way it's supposed to.

And then she tries to start a new Copilot Chat session and use all of them together.

Four minutes later, she's still assembling the context. She mentioned the universe file. She referenced the lore skill. She tried to invoke the accuracy-check prompt. She's not sure the MCP connection is active. She can feel the group losing momentum waiting for her to get the session live.

"This is the same problem we solved in Module 3 for prompts," she says. "We have all the right pieces. We're missing the wrapper that makes it one thing."

She's looking at five modules of progressive customization and realizing they've built everything *except* the entry point that bundles it all. The expertise is in the files. The tools are connected. What's missing is the agent that shows up already knowing — the one that doesn't need four minutes of setup because it was configured to arrive ready.

David nods: "In Module 4, we encoded lore so Copilot wouldn't have to guess. Now we need to encode the *workflow* so the team doesn't have to reconstruct it from memory every session."

Elena: "And when it catches a canon error without me asking, that's the accuracy-check prompt running inside the agent."

Marcus: "The MCP query. The lore skill. The handoff to `@implement`. It's already all there. We just need an `.agent.md`."

Rafael is already typing.

*"This is what five modules of progressive customization feels like when it snaps together. Everything we built is in here — and it just knows."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Each session: Sarah spends 4+ minutes reconstructing context — referencing the universe file, invoking the lore skill, checking MCP connectivity, pulling up the accuracy-check prompt. The setup tax recurs every time. | Sarah types `@breaking-bad-expert` and the agent arrives with everything loaded: lore resources, accuracy-check standards, MCP connectivity, and read-only content constraints. Setup time: 0. |
| **Session setup time:** 4 min avg, every session | **Session setup time:** ~0 |
| **Knowledge assembly:** Manual, from memory, by whoever is running the session | **Knowledge assembly:** Encoded in the agent config, available to the whole team identically |
| **Tool orchestration:** Sarah remembers which prompt, skill, and server to invoke and in what order | **Tool orchestration:** The agent handles it — lore skill, MCP query, and accuracy validation happen in a single response |
| **Handoff to implementation:** Manual copy-paste between sessions | **Handoff to implementation:** One-click `@implement` handoff configured in the agent |

**Time saved:** 4 min setup × 3 sessions/day × 20 working days/sprint = **240 min/sprint** in setup overhead eliminated. More importantly: the team's accumulated expertise is now accessible to every member without reconstruction — a new teammate can invoke `@breaking-bad-expert` on day one and get the same quality as Sarah gets on day fifty.

#### 🎯 Your Goal

Create `.github/agents/[show]-expert.agent.md` — a custom agent that bundles every show-specific capability built across the workshop: universe context, accuracy-check standards, lore skill, and live MCP data access. Then walk through four interaction scenarios that demonstrate each contributing module. This agent is the capstone artifact of the entire workshop.

#### 📋 Steps

1. **Create the agent file**

   Create `.github/agents/breaking-bad-expert.agent.md` (substitute your show name):

   ````markdown
   ---
   name: breaking-bad-expert
   description: "Expert in Breaking Bad canon, character arcs, and FanHub content accuracy. Use for reviewing content, answering lore questions, validating live data, and generating show-accurate copy. This agent does not write or edit code — use @implement for that."
   tools:
     - type: skill
       path: .github/skills/breaking-bad-lore
     - type: mcp
       server: fanhub-db
   mode: ask
   ---

   # Breaking Bad Expert Agent

   You are an expert on Breaking Bad canon and the FanHub fan site project. Your purpose is to ensure that all FanHub content is accurate, show-specific, and consistent with established canon.

   ## What You Know

   - Breaking Bad canon: character arcs, episode events, timeline, relationships — all documented in `.github/skills/breaking-bad-lore/resources/`
   - FanHub content standards: tone, accuracy rules, and universe context from `docs/breaking-bad-universe.md`
   - Live FanHub data: query the `fanhub-db` MCP server for current database state

   ## How You Work

   When asked a lore question:
   1. Consult `breaking-bad-lore` skill resources before responding
   2. Cite the resource you're drawing from: "According to `canon-facts.md`..."
   3. If the answer isn't in the resources, say so — do not guess at undocumented facts

   When asked to review content for accuracy:
   1. Apply the accuracy standards from `docs/breaking-bad-universe.md`
   2. Flag any violation with: what's wrong, why it's wrong, and the correct information
   3. Pass content that meets the standards without unnecessary changes

   When asked about live site data:
   1. Query the `fanhub-db` MCP server for current state
   2. Evaluate the results against show knowledge — not just field completeness
   3. Identify both technical gaps (empty fields) and content gaps (wrong information)

   ## What You Do Not Do

   - Do not write or edit application code, React components, API routes, or database migrations
   - Do not open files in the editor or run shell commands
   - If asked to implement something, redirect: "I can describe what needs to change. Use @implement to apply it."

   ## Handoff

   When you've identified content changes, character data fixes, or copy to add — offer the handoff:
   > "Ready to apply this? Hand off to @implement."
   ````

   For non-Breaking Bad shows, replace the show name throughout and update the MCP server reference if you used a different server name.

2. **Add the `handoffs` configuration**

   Add to the agent's YAML frontmatter:

   ```yaml
   handoffs:
     - agent: implement
       label: "Apply this to FanHub"
       prompt: "Based on the expert's review above, implement the recommended content changes in the FanHub site."
   ```

   The full frontmatter block looks like:

   ```yaml
   ---
   name: breaking-bad-expert
   description: "Expert in Breaking Bad canon, character arcs, and FanHub content accuracy..."
   tools:
     - type: skill
       path: .github/skills/breaking-bad-lore
     - type: mcp
       server: fanhub-db
   mode: ask
   handoffs:
     - agent: implement
       label: "Apply this to FanHub"
       prompt: "Based on the expert's review above, implement the recommended content changes in the FanHub site."
   ---
   ```

3. **Scenario 1 — Cold invocation (Module 1 capability)**

   Open a fresh Copilot Chat. Type:

   ```
   @breaking-bad-expert Who are the main factions in this show and which
   FanHub characters would belong to each one?
   ```

   Then, in a *separate* bare Copilot Chat session (no `@` invocation), ask the same question.

   Compare the two responses:
   - Does the expert agent cite the lore resources?
   - Does it reflect the faction structure from your `characters.md` resource?
   - Is the bare Copilot response generic or show-specific?

   **What this demonstrates:** Module 1's universe context + Module 4's lore skill, combined in an agent that arrives already knowing the show's structure. The show knowledge doesn't have to be re-explained — it's in the agent's configured resources.

4. **Scenario 2 — Accuracy validation (Module 3 capability)**

   Paste a character bio into the agent with a seeded error:

   ```
   @breaking-bad-expert Review this character bio for accuracy against the show's canon:

   "Jesse Pinkman is a former college student of Walter White's who becomes his partner
   in the methamphetamine business after Walt's cancer diagnosis. Jesse is street-smart
   but academically underprepared, which is why Walt initially underestimates him."
   ```

   The bio contains a deliberate error: Jesse was Walter's former *high school* student, not a college student. Look for the agent to catch this, cite `canon-facts.md` or `characters.md`, and provide the correction.

   > 💡 Elena's note: "This is the accuracy-check prompt from Exercise 3.3, but it's running inside the agent without needing to be invoked separately. That's the compounding effect — the module 3 standard is now part of the agent's default behavior."

5. **Scenario 3 — Live data + canon cross-check (Modules 4 + 5 capability)**

   Ask the agent:

   ```
   @breaking-bad-expert Query the FanHub database for all characters currently
   marked as alive. Does that match how Breaking Bad Season 1 actually ends?
   ```

   Look for the agent to:
   1. Query the `fanhub-db` MCP server (Module 5 capability)
   2. Return the live character list
   3. Evaluate the results against Breaking Bad canon (Module 4 lore skill)
   4. Identify any discrepancies — characters alive in the database who are dead in canon, or vice versa

   This is the pattern from Exercise 5.4, but bundled: Copilot retrieves *and* evaluates in a single agent turn. Without the agent, this required two steps and manual context stitching. With the agent, it's one request.

6. **Scenario 4 — Constrained content generation (all modules)**

   Ask the agent:

   ```
   @breaking-bad-expert Write a 3-sentence intro paragraph for the FanHub
   homepage that sets the tone for a Breaking Bad fan site.
   ```

   Then ask a bare Copilot Chat the same thing. Compare:
   - Is the expert's output show-specific, on-voice, and accurate?
   - Is the bare Copilot output generic or approximate?
   - Does the expert's paragraph reflect the tone from `docs/breaking-bad-universe.md`?

   Then try to make the agent do something outside its scope:

   ```
   @breaking-bad-expert Update the React component to add this intro paragraph
   to the homepage.
   ```

   Look for the agent to decline and redirect to `@implement`. Verify this happens.

7. **The debrief — map scenarios to modules**

   With the group, walk through this mapping. Ask each participant to fill in the blank:

   | Scenario | Module that enabled it | Artifact that made it work |
   |----------|----------------------|---------------------------|
   | Scenario 1: Faction knowledge, no setup | **Module 1** | `docs/[show]-universe.md` + pointer in `copilot-instructions.md` |
   | Scenario 2: Bio accuracy catch | **Module 3** | `.github/prompts/[show]-accuracy-check.prompt.md` |
   | Scenario 3: MCP query + canon evaluation in one turn | **Modules 4 + 5** | `.github/skills/[show]-lore/` + `fanhub-db` MCP server |
   | Scenario 4: Show-specific content, wrong-request redirect | **All modules + Module 6** | The `.agent.md` itself — mode, constraints, and handoff |
   | Handoff button fires correctly | **Module 6** | `handoffs:` config in the agent frontmatter |

   The goal: we want every participant to be able to name the module behind each capability. The agent isn't magic — it's the sum of deliberate decisions made across five modules, now accessible in a single entry point.

#### ✅ Success Criteria

- [ ] `.github/agents/[show]-expert.agent.md` created with show-branded name and description
- [ ] Agent configured with `mode: ask`, lore skill reference, and MCP server
- [ ] `handoffs:` block configured to pass to `@implement`
- [ ] All four scenarios attempted — agent demonstrates accurate show knowledge in each
- [ ] Scenario 2: Agent catches the seeded bio error and cites the resource it drew from
- [ ] Scenario 3: Agent queries MCP *and* evaluates against canon in a single turn
- [ ] Agent declines code-editing requests and redirects to `@implement`
- [ ] Each participant can name which module enabled each scenario
- [ ] Handoff to `@implement` fires correctly from the agent

#### 📚 Official Docs

- [Custom Agents in VS Code](https://code.visualstudio.com/docs/copilot/customization/copilot-customization#_chat-agents)
- [Agent Skills](https://code.visualstudio.com/docs/copilot/customization/copilot-customization#_agent-skills)
- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

---

## 🔗 What You Built

**In this exercise:**
- `.github/agents/[show]-expert.agent.md` — The capstone artifact: a custom agent bundling every show-specific capability built across the workshop

**How it compounds — the complete picture:**

| Module | What It Created | How It Powers the Expert Agent |
|--------|----------------|-------------------------------|
| **Module 1** — Instructions | `docs/[show]-universe.md` + pointer in `copilot-instructions.md` | The agent's baseline show awareness; tone, style, and context it arrives with |
| **Module 2** — Agent Plan Mode | "Universe at a Glance" homepage feature; real show data populated | The live FanHub site the agent can reason about; the data it queries |
| **Module 3** — Custom Prompts | `.github/prompts/[show]-accuracy-check.prompt.md` | The accuracy standards the agent applies when reviewing any content piece |
| **Module 4** — Agent Skills | `.github/skills/[show]-lore/` with characters, seasons, quotes, canon-facts | The deep reference layer; what the agent cites when making factual claims |
| **Module 5** — MCP Servers | `fanhub-db` MCP server + `fanhub-api` validation | Live data access; the agent can query current site state and evaluate it |
| **Module 6** — Custom Agents | `.github/agents/[show]-expert.agent.md` + `@implement` handoff | The entry point that bundles everything; where progressive customization becomes a single invocation |

**Why this matters:** Every module in this workshop was a deliberate investment. Module 1 wasn't just about writing instructions — it was planting the seed of show awareness that the Module 6 agent would draw from. Module 3's accuracy-check prompt didn't just catch one error — it encoded an accuracy standard that now runs inside an agent without needing to be invoked separately. This is what compounding looks like in practice: not a bigger and bigger single tool, but a series of focused artifacts that combine into something more capable than any one of them alone.

The expert agent is also an answer to one of the most common objections to AI-assisted development: *"But it doesn't know our domain."* After five modules, it does. And now that knowledge is in files, accessible to everyone, persistent across sessions, and extensible as the show or the site evolves.

---

## ➡️ Workshop Complete

There's no next exercise. This is the end.

Take a moment before closing your editor. Look at the `.github/` directory:

```
.github/
  copilot-instructions.md         ← Module 1
  prompts/
    [show]-accuracy-check.prompt.md  ← Module 3
  skills/
    [show]-lore/                      ← Module 4
      SKILL.md
      resources/
  agents/
    [show]-expert.agent.md            ← Module 6
```

Everything in that directory is yours. You wrote the canon facts. You populated the character roster. You defined what "accurate" means for your show. Copilot didn't do that — you did. What you built here is a template for how you'd do this for any domain where you have expertise and Copilot doesn't: your company's internal tools, your team's coding standards, your industry's regulatory requirements, your product's design language.

**Group reflection prompt:**

> *"What would your work's `@[domain]-expert` agent know? What files would you write to teach it?"*

Think about a domain where your team has expertise that Copilot doesn't. Sketch the equivalent of:
- A `[domain]-universe.md` describing the context
- A `[domain]-lore/resources/canon-facts.md` listing established truths and common misconceptions
- A `[domain]-accuracy-check.prompt.md` that applies your quality standards

That's the pattern. You've built it once. You can build it for anything.

---

> *"This is what five modules of progressive customization feels like when it snaps together. Everything we built is in here — and it just knows."*
> — Sarah, closing her laptop
