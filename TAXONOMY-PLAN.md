---
status: active
updated: 2026-10-21
---

# Tech-Talk Taxonomy Restructure — Implementation Plan

## Decisions (approved)

- **Taxonomy:** sections organized by where the agent runs and who starts it. The four judgment lenses (Context, Delegation, Verification, Authority) become a per-talk checklist instead of section names.
- **Custom agents:** new standalone talk in Foundations. Trim the custom-agent material in `copilot-primitives`.
- **Scope:** restructure every section now. Rewrite content in sections 2–3 first. Merge section 4 talks later.
- **Slugs:** replacement talks get new folders; the talks they replace are archived with redirects.

## Target map (21 active talks → 19 after this plan; → 18 after the deferred section 4 merge)

| # | Section | Slug | Who starts the agent, and where it runs | Talks |
|---|---|---|---|---|
| 1 | Foundations 🧱 | `foundations` | Context shared by every agent | surfaces, copilot-primitives, **custom-agents (NEW)** |
| 2 | Agents at Your Keyboard ⌨️ | `agents-at-your-keyboard` | A developer runs it locally in VS Code or the CLI | copilot-cli, vscode-latest, **local-agentic-sdlc (NEW)** |
| 3 | Agents on GitHub ☁️ | `agents-on-github` | A GitHub event or a person on github.com starts it | **copilot-on-github (NEW: coding agent + code review + Code Quality)**, **agentic-lifecycle → full GitHub Agentic Workflows talk** |
| 4 | Trust and Govern 🛡️ | `trust-and-govern` | Rules that apply whichever section the agent comes from | copilot-hooks, agentic-sdlc, copilot-governance, enterprise-patterns *(merge deferred)* |
| 5 | Extend and Embed 🧩 | `extend-and-embed` | Agents built into other products | unchanged |

**Archived by this plan:** agent-dev-loop, loopy-agents, multi-agent-coordination, copilot-web, pr-trust-stack. Total archived goes from 9 to 14.

**Mirror anchor:** sections 2 and 3 both run FanHub issue #110 from research to a draft PR, once locally with custom agents and once on GitHub. The audience can compare the tradeoffs on the same task.

**Section 3 split:**
- **copilot-on-github:** built-in agents that someone invokes and whose results someone reviews. Each one's value shows up at a different step of the same pull request.
- **agentic-lifecycle:** automation the team writes itself, started by repository events. This is the talk with real depth.

---

## Phase 0 — Taxonomy infrastructure (no content rewrites)

1. `scripts/portfolio-inventory-lib.mjs`
   - Replace `CURRENT_SECTIONS` with the five new names.
   - Add `LEGACY_SECTIONS` (the four old names). Accept them **only when `status: archived`**, because archived READMEs and decks are frozen and can't be edited.
2. `.github/content-routing/portfolio-schema.json`: update the `section` / `deckSection` enums to new + legacy names.
3. `scripts/portfolio-inventory.test.mjs`: update the expected counts (`archivedTalks` 9 → 14 once Phase 4 lands) and add a test that rejects a legacy section on an active talk.
4. `slides/SECTIONS.md`: new table rows (name, icon, slug, tagline, contents) and the `index-custom.html` structure reference.
5. `slides/index-custom.html`: rebuild the tech-talk sub-groups into five groups and move the cards.
6. Re-section the active talks that change section. Update `section:` and `updated:` in **both** the README and the deck frontmatter:
   - Foundations: surfaces, copilot-primitives
   - Keyboard: copilot-cli, vscode-latest (agent-dev-loop, loopy-agents and multi-agent-coordination stay where they are until archived)
   - GitHub: agentic-lifecycle (copilot-web stays where it is until archived)
   - Trust: copilot-hooks, agentic-sdlc, copilot-governance, enterprise-patterns (pr-trust-stack stays where it is until archived)
   - Extend: unchanged name. Verify only.
7. `tech-talks/README.md` and `tech-talks/DECISION-GUIDE.md`: rewrite the section narrative around the runtime axis and state the lens checklist once.
8. Regenerate `tech-talks/portfolio.generated.json`, run the inventory tests, and run `node slides/scripts/sync-index-dates.mjs`.

**Gate:** the inventory validator passes and the homepage renders five tech-talk groups.

### Phase 0 — as implemented (2026-10-21)

These steps differed from the plan above:

- **Every active talk was re-sectioned now, including the ones that will be archived later.** The validator rejects legacy sections on active talks, so agent-dev-loop, loopy-agents and multi-agent-coordination moved to Agents at Your Keyboard. copilot-web and pr-trust-stack moved to **Agents on GitHub**, not Trust: pr-trust-stack is about the issue-to-merge flow, which belongs with the other GitHub-hosted agents.
- **`updated:` was not bumped** on talks whose only change was the section. Content refresh uses that date as `--since`, so bumping it would hide feed items. Deck mtimes were restored so their companions don't show as stale.
- **Rendered meta text was fixed** in two decks: pr-trust-stack and copilot-governance still showed the old section name in their title meta. Their PDFs and agenda HTML were regenerated. agenda.md was restored from git, because `--from-slides` overwrites hand-tuned agenda content.
- **Temporary validator exception:** `STATUS_MISMATCH_EXCEPTIONS` in `scripts/portfolio-inventory-lib.mjs` allows copilot-code-review and copilot-code-quality to have an archived README with an active deck. Commit 5a35fe3 put their cards back on the homepage. **Remove the exception in Phase 4**, once those decks are archived and their redirects point to copilot-on-github.
- Test counts: `catalogCards` is 22 (the old assertion of 20 was already failing). Added a test that active talks use a current section and only archived talks may use a legacy section.
- The onboarding "Start here" path and the DECISION-GUIDE learning paths still link to talks that will be archived. Phase 4 updates them.

## Phase 1 — Agents on GitHub: expand agentic-lifecycle into the full GitHub Agentic Workflows talk

**Why this phase is needed:** the `agentic-workflows` redirect says agentic-lifecycle covers "workflow selection, compilation, permissions, and safe outputs," but today it shows only one pattern: four workflows, each started when a person adds a label.

- **Keep:** the FanHub #110 → draft PR #193 journey as the anchor.
- **Add, re-verified against current gh-aw docs and release notes:**
  - when to use gh-aw versus the coding agent versus plain Actions;
  - the trigger catalog: schedule, slash command, `workflow_dispatch`, continuous/daily patterns;
  - the frontmatter → compile → `.lock.yml` model and its review discipline;
  - the security model: read-only default permissions, safe outputs as the only write path, network/firewall settings, threat detection;
  - tools and MCP, imports and shared components;
  - operating cost and observability (`gh aw logs`/audit);
  - when the pattern stops fitting.
- **Retitle** to "GitHub Agentic Workflows" (slug unchanged). Update the `decision:` field.
- **Tie to copilot-on-github:** copilot-on-github covers built-in agents that someone invokes; this talk covers automation the team writes, triggered by repository events. Each talk links to the other once.
- **Process:** structural change → `deck-recipe-review` (with cross-model critique) → full deck regeneration.

### Phase 1 — as implemented (2026-10-21)

- **New FanHub evidence on gh-aw v0.92.6, which is a pre-release:**
  - `/triage` (slash command) on #202: 4 labels, cited code and duplicate #7, for 1.22 AI credits;
  - `daily-backlog-digest` (schedule): digest #209, which closed the older #207.
  - The #110 → #193 journey stays as the closing capstone; #202 opens the talk.
- **Restructured into 4 sections:** Choose the Judgment and Its Owner, Write a Reviewable Authority Contract, Test the Contract Against Real Work, Operate the Boundary.
- **Owned integrity exception:** the MCP gateway rated every FanHub issue `none`, even maintainer-authored ones, and `trusted-users` had no effect. The workflows therefore use `min-integrity: none` with an explicit bash allowlist, which strict mode requires. The talk presents this as an owned exception that gets retested after each upgrade. The bug has not been reported upstream.
- **Pin `engine.model`:** the `auto` setting resolved to an unpriced model, and the run failed.
- **Deck:** 27 slides, above the 20–25 target; the user approved loosening it. The agenda, PDF, homepage card and the title in related links were updated.

## Phase 1b — Agents on GitHub: new `copilot-on-github` talk (coding agent + code review + Code Quality)

The archived `copilot-code-review` and `copilot-code-quality` folders can't be edited, so this is a new folder. `copilot-web` is archived and redirected here (Phase 4). Reuse its strongest material: guidance on writing delegable issues, `copilot-setup-steps`, and the firewall.

**Why one talk:** each of these agents on its own is "invoke it, then review the results," and a separate talk for each would become a feature tour. Together they make one argument, with each value proposition shown at a different step of the same pull request. They also share setup: the same instruction files shape all three, so it gets taught once.

- **Proposal gate:** research brief + structural proposal approved before drafting. Start the talk as `portfolioState: candidate`.
- **Decision:** "Which built-in GitHub agent fits each moment of a pull request, and what evidence does each one give the person who decides?"
- **Duration:** 50–55 min, with one demo segment per agent.
- **Anchor:** one FanHub journey:
  1. a bounded issue is assigned to the coding agent, which opens a draft PR;
  2. Copilot code review posts advisory findings on intent and design;
  3. Code Quality posts deterministic, gateable maintainability findings;
  4. one fix of each kind (Copilot Autofix, and a handoff back to the coding agent);
  5. a rerun comes back clean;
  6. a person makes the merge decision.

  Reuse draft PR #193 if it fits; otherwise record a new run.
- **Value proposition per agent (the job the talk must show):**
  - **Coding agent:** turns a well-bounded issue into a reviewable draft PR in an isolated, firewalled environment. Covers what makes an issue delegable, plus `copilot-setup-steps` and the firewall on one compact slide.
  - **Code review:** in-context advisory findings on intent, design and correctness. Covers triggers (manual, automatic via rulesets, on new pushes); tuning with `copilot-instructions.md`, `*.instructions.md` with `applyTo`, and `excludeAgent`; agentic context gathering.
  - **Code Quality:** deterministic and AI-detected maintainability findings (verify which are current), quality gates through rulesets, and Copilot Autofix.
- **Shared section:** one instructions setup shapes all three. Make a change and show its effect on more than one agent.
- **Comparison slide:** what each agent catches or produces, what it's blind to, and where the agents overlap.
- **Operations:** a rollout path (observe → evaluate → enforce), billing and premium requests, which settings to turn on first.
- **Boundaries:**
  - findings are advisory until a ruleset makes a check required;
  - none of these agents can approve;
  - when a change needs more than one handoff, move to Agentic Workflows or the local orchestration talk.
- **Harvest pr-trust-stack's recorded FanHub evidence (it's archived in Phase 4):**
  - code review catching a missed behavior: #197 and #198;
  - Code Quality PR findings and a fix by a person: #198;
  - a ruleset coverage gate blocking at 26.7% and passing at 30%: #199;
  - a Copilot Autofix accepted by a person: #201.

  Re-verify each link and state before reuse. This gives the talk real proof for every agent without new demo runs.
- **Closing beat — the merge decision:** each agent produced a different kind of evidence on its PR head; a person reviews it and decides. This replaces pr-trust-stack's capstone role. State the boundary once: Code Quality doesn't replace security review, dependency checks or secret scanning.
- **Process:** `content-refresh`-style verification against current docs and changelog for all three features → recipe review (cross-model) → full deck generation.

## Phase 2 — Foundations: new `custom-agents` talk

- **Proposal gate:** follow the AGENTS.md rule for new talks (research brief + structural proposal approved before drafting). Start the talk as `portfolioState: candidate`.
- **Decision:** "How should a team design one custom agent that behaves correctly in every runtime it runs in?"
- **Anchor artifact:** one `.agent.md` (e.g., a FanHub `reviewer` or `planner`) run in VS Code, the CLI, and the coding agent. Show what changes between runtimes: available tools, model selection, MCP, handoffs, being called as a subagent.
- **Covers:** anatomy (frontmatter, tools allow-list, model, handoffs); scope (repo, org, `.github-private`, user); how the agent is invoked; verification (inspecting what loaded); boundaries.
- **Trim `copilot-primitives`:** cut its custom-agent material to a short definition plus a link to this talk.

## Phase 3 — Agents at Your Keyboard: new `local-agentic-sdlc` talk

- **Proposal gate:** same as Phase 2. Start the talk as a candidate.
- **Decision:** "How can a developer run research → plan → implement → review locally with custom agents, and know when to stop?"
- **Anchor:** FanHub #110 run locally. An orchestrator agent calls planner, implementer, and reviewer subagents. Workstreams that need it run in their own worktrees. Hooks and verification commands decide when to continue and when to stop. Output: the same kind of draft PR as Phase 1.
- **Harvest only what serves this decision:**
  - agent-dev-loop: the plan artifact and the risk-before-code step. Its instruction, prompt, and skill material already lives in primitives.
  - loopy-agents: stop conditions, budgets, verifiable completion. Drop the third-party loop-audit tooling and the YAML topology catalog.
  - multi-agent-coordination: the split test and the integration record.
- **Proof requirement:** build the orchestrator and subagents in FanHub and record a real run (session log, commits, PR) before drafting the slides.
- **Link to copilot-cli:** copilot-cli covers the surface; this talk covers the orchestration pattern.

## Phase 4 — Archive and redirect

Do this only after each replacement talk is `active` + `deployed`, because redirect targets must be active and deployed.

1. Set `status: archived` on agent-dev-loop, loopy-agents, multi-agent-coordination, copilot-web and pr-trust-stack (README + deck). These talks are still active, so this edit is allowed.
2. `portfolio-redirects.json`:
   - add agent-dev-loop, loopy-agents, multi-agent-coordination → `local-agentic-sdlc`;
   - add copilot-web and pr-trust-stack → `copilot-on-github`;
   - **retarget** agent-teams and copilot-app (currently → multi-agent-coordination) → `local-agentic-sdlc`;
   - rewrite the `agentic-workflows` reason so it is accurate after Phase 1;
   - retarget `copilot-code-review` and `copilot-code-quality` (both currently → pr-trust-stack) → `copilot-on-github`.
3. Remove the archived talks' cards from `index-custom.html`, including the copilot-code-review and copilot-code-quality cards. Set those two decks to `status: archived` and delete the slugs from `STATUS_MISMATCH_EXCEPTIONS`.

## Phase 5 — Link hygiene across active talks

Fix `prerequisites` / `related` and any inline links:

- agentic-sdlc: `prerequisites: [agentic-workflows]` (archived) → `[agentic-lifecycle]`
- copilot-on-github: `prerequisites: [custom-agents]` (new talk)
- agentic-lifecycle: `prerequisites: [agent-dev-loop, copilot-web]` → `[copilot-on-github]`; related: `multi-agent-coordination` → `local-agentic-sdlc`
- surfaces, copilot-cli: replace links to copilot-web → `copilot-on-github`; agentic-sdlc, copilot-governance, copilot-hooks: replace links to pr-trust-stack → `copilot-on-github`
- surfaces, vscode-latest, copilot-primitives: replace links to agent-dev-loop and multi-agent-coordination
- copilot-hooks, copilot-governance, copilot-with-foundry, agentic-sdlc: re-check related links

Finally, grep the whole repo (agents, skills, workshop modules) for the archived slugs and old section names.

## Phase 6 — Slides, companions, ship

For each new or changed deck: recipe → generate → `npm run build` check → `sync-index-dates` → Deploy agent (`check-companions --strict`, regenerate agendas and PDFs, commit). Ship one phase per commit so the homepage never shows a broken section.

## Deferred — section 4 consolidation

- copilot-governance + enterprise-patterns → a single governance talk.
- **agentic-sdlc stays as a standalone talk.** It is the portfolio's "how to get there from here" talk:
  - `agentrc` produces a report card of the repository's current readiness;
  - five maturity levels lay out the path forward.

  It's worth a later improvement pass:
  - lead with the report card as the anchor artifact;
  - map each maturity level to the talk in this portfolio that teaches it, so it becomes the entry point that routes people across sections;
  - tighten the 90-minute runtime;
  - remove material now covered by copilot-on-github (rulesets and gates) and copilot-hooks.

## Revisit after all phases land — agentic-sdlc placement

If agentic-sdlc's five maturity levels end up mapped to talks in every section, consider moving it out of Trust and Govern. It would become the portfolio's entry point, probably as a "Start Here" slot ahead of Foundations: take the `agentrc` report card, find your level, and go to the talk for your next level. Decide this after the improvement pass, because placement depends on how well each level maps to a talk. Changing it touches `SECTIONS.md`, `index-custom.html`, the validator's section list, and the talk's README and deck frontmatter.

## Risks

- **gh-aw moves fast:** re-verify every frontmatter key at implementation time; don't trust the archived talk's syntax.
- **The local talk depends on a working demo:** if the orchestrator run isn't reliable, Phase 3 slips. Start building the FanHub agents early, in parallel with Phase 1.
- **Inbound links:** archived slugs keep their URLs, and redirects cover catalog references.
