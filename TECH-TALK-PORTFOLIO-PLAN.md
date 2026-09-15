---
status: active
updated: 2026-09-15
---

# Tech-Talk Portfolio Restructure Plan

## Purpose

Reorganize the practitioner tech-talk portfolio around decisions learners need to make, reduce duplicated instruction, and preserve focused product deep dives only when they teach a distinct decision, require different evidence, or serve a meaningfully different audience.

This plan covers the 24 active practitioner decks. Executive talks are out of scope.

## Portfolio Rule

A talk earns a separate place when it has all four:

1. **Distinct decision** — the learner leaves better able to make a decision not already taught elsewhere.
2. **Distinct evidence** — the talk produces or inspects an artifact that demonstrates that decision.
3. **Distinct boundary** — the talk clarifies a different stopping condition, authority boundary, or failure mode.
4. **Substantial depth** — the topic warrants at least 25 focused minutes without relying on a feature inventory.

If only the implementation mechanism differs, make it a section, clinic, demo, or reference guide rather than a separate core talk.

## Target Information Architecture

Use one stable axis for catalog placement: **the decision being taught**. Treat audience, adoption maturity, product surface, and duration as metadata and learning-path filters.

### 1. Choose and Configure

**Question:** What context does Copilot need, where should the work run, and how should the experience be configured?

- Which Copilot Where? — route work by context, control, artifact, and reviewer.
- Copilot Configuration — encode shared repository knowledge and reusable behavior.
- Copilot Memory — place personal, team, project, and organizational knowledge in the right layer.
- Debugging Copilot — inspect context assembly and diagnose unexpected behavior.
- Copilot CLI — operate where shell and runtime state are decisive.

### 2. Delegate and Coordinate

**Question:** What work can be delegated, how should it be decomposed, and how much autonomy fits?

- Agent Dev Loop — turn solved work into reusable team capability.
- From Issue to Pull Request — delegate bounded repository work through GitHub.
- Agent Teams — compose specialized agents with isolation and review ownership.
- GitHub Agentic Workflows — automate recurring repository judgments.
- Loop Engineering — design reliable loops with explicit stop conditions.
- GitHub Copilot App — coordinate parallel sessions and agent fleets.

### 3. Verify and Govern

**Question:** What evidence permits work to proceed, who may approve it, and where must execution stop?

- PR Trust Stack — combine AI review, deterministic quality signals, coverage, and human acceptance.
- Copilot Hooks — enforce policy at agent execution boundaries.
- Agentic SDLC — build repository and CI infrastructure that manufactures trustworthy evidence.
- Enterprise Patterns — standardize ownership, rollout, measurement, and governance across teams.

### 4. Extend and Embed

**Question:** When should Copilot gain a new capability, interface, protocol boundary, or domain context?

- Plugins and APM — package and distribute team capabilities reproducibly.
- Copilot SDK — embed agent behavior in an application-owned runtime.
- ACP — connect Copilot agents to external clients while preserving permission boundaries.
- MCP Apps — return interactive interfaces through MCP.
- Azure MCP and Skills — apply domain tools, live state, and least-privilege authority.
- Copilot with Foundry — add governed organizational knowledge beyond repository context.

These are catalog homes, not rigid learner sequences. A talk may be linked from several pathways but has one canonical home.

## Proposed Portfolio Disposition

| Current talk | Decision | Disposition | Target artifact |
|---|---|---|---|
| `surfaces` | Where should this work happen? | **Keep as catalog entry point** | Which Copilot Where? |
| `copilot-primitives` | How should shared Copilot behavior be encoded? | **Keep; rename and narrow** | Copilot Configuration |
| `copilot-memory` | Where should durable knowledge live? | **Narrow; keep separate provisionally** | Copilot Memory: Placement and Lifecycle |
| `copilot-chat-internals` | Why did Copilot behave this way? | **Narrow to diagnostic clinic** | Debugging Copilot |
| `copilot-cli` | When is the terminal the correct control surface? | **Keep** | Copilot CLI |
| `vscode-latest` | What changed in recent releases? | **Retire as a talk** | Rolling release brief; durable guidance moves to owning talks |
| `agent-dev-loop` | How does completed work become reusable team capability? | **Keep** | Agent Dev Loop |
| `copilot-web` | What repository work is bounded enough to delegate? | **Keep; rename** | From Issue to Pull Request |
| `agent-teams` | When should work be split among specialized agents? | **Keep; sharpen composition boundary** | Agent Teams |
| `agentic-workflows` | Which recurring repository judgments should run as workflows? | **Keep; narrow** | GitHub Agentic Workflows |
| `loopy-agents` | How does an autonomous loop verify and stop safely? | **Keep** | Loop Engineering |
| `copilot-app` | When does work require fleet coordination? | **Keep** | GitHub Copilot App |
| `agentic-journey` | How should a team sequence adoption? | **Absorb into pathways and SDLC** | Adoption roadmap, not a standalone talk |
| `copilot-code-review` | How should AI findings enter human review? | **Pilot merge** | PR Trust Stack |
| `copilot-code-quality` | Which deterministic signals should block merge? | **Pilot merge** | PR Trust Stack |
| `copilot-hooks` | Which agent actions should policy allow or deny? | **Keep** | Copilot Hooks |
| `agentic-sdlc` | What infrastructure creates trustworthy agent throughput? | **Keep; remove adoption duplication** | Agentic SDLC |
| `enterprise-patterns` | How should organizations standardize and govern adoption? | **Keep; remove SDLC implementation depth** | Enterprise Patterns |
| `copilot-plugins` | How should extensions and configuration be distributed? | **Keep; narrow** | Plugins and APM |
| `copilot-sdk` | When should an application own the agent runtime? | **Keep; rebuild evidence** | Copilot SDK |
| `copilot-acp` | When should an external client connect to a Copilot agent? | **Keep** | ACP |
| `mcp-apps` | When does an MCP response need interactive UI? | **Keep as advanced clinic** | MCP Apps |
| `copilot-azure-mcp` | How should agents act on live domain state safely? | **Keep as domain case study** | Azure MCP and Skills |
| `copilot-with-foundry` | When is repository context insufficient? | **Keep; sharpen organizational-memory boundary** | Copilot with Foundry |

### Expected Result

- **19 durable talks** if both proposed consolidations proceed.
- **20 durable talks** if Code Review and Code Quality remain separate after the pilot.
- Product releases no longer create permanent catalog entries by default.

## Merge Decisions to Test

### Experiment A: PR Trust Stack

Combine `copilot-code-review` and `copilot-code-quality` into one 50-minute decision-centered talk.

**Unifying decision:** Which signals should advise, which should block, and who accepts the residual risk before merge?

**Required evidence:**

- One pull request containing Copilot review findings, deterministic quality findings, and a coverage delta.
- A ruleset shown first in evaluate mode, then active mode.
- A human disposition for one accepted finding, one rejected finding, and one blocking signal.
- Separate billing and enablement boundaries retained explicitly.

**Pass condition:** At least 70% of each current talk's unique decision content survives without exceeding 50 minutes, and the audience can explain the difference between an advisory review and a merge gate.

**Fail condition:** Commercial boundaries, setup paths, or evidence become too compressed. If so, retain two talks under one shared pathway and remove duplicated introductions, ROI framing, and adoption guidance.

### Experiment B: Context Foundations

Do not immediately merge Memory, Primitives, and Chat Internals. First prototype a 55-minute outline with three decisions:

1. Where should this information live?
2. How should shared behavior be encoded?
3. How do I inspect what context was actually used?

**Pass condition:** The outline contains one coherent artifact that moves through all three decisions, each topic retains a meaningful failure boundary, and the result is usable by both individual developers and team leads.

**Likely outcome:** Keep Configuration as the core talk; retain Memory and Debugging as 20–30 minute clinics. The current subjects are adjacent, but their authority, persistence, and evidence models differ.

### Experiment C: Adoption Story

Move `agentic-journey` from standalone talk to a learner pathway spanning `surfaces`, `agent-dev-loop`, `copilot-web`, `agentic-workflows`, `agent-teams`, and `agentic-sdlc`.

**Pass condition:** Every maturity step names an observable exit artifact and routes to one owning talk. No workflow implementation content is lost.

## Learning Paths

Catalog sections answer “what decision am I making?” Paths answer “what should I attend next?”

### Individual Developer

`surfaces` → `copilot-primitives` → `agent-dev-loop` → choose `copilot-cli` or `copilot-web` → `copilot-chat-internals`

### Team Delegation

`surfaces` → `agent-dev-loop` → `copilot-web` → `agent-teams` → `loopy-agents`

### Repository Automation

`surfaces` → `agentic-workflows` → PR Trust Stack → `copilot-hooks` → `agentic-sdlc`

### Platform and Governance

`enterprise-patterns` → `copilot-plugins` → `copilot-hooks` → PR Trust Stack → `agentic-sdlc`

### Product and Tool Builders

`surfaces` → `copilot-sdk` → choose `copilot-acp`, `mcp-apps`, or `copilot-azure-mcp` → `copilot-with-foundry`

## Topic Intake Gate

Before creating a new talk, record:

| Field | Required answer |
|---|---|
| Learner decision | What decision becomes easier after this talk? |
| Existing owner | Which current talk already comes closest? |
| Distinct evidence | What artifact can the learner produce or inspect here that no current talk provides? |
| Boundary | When should the learner avoid, stop, roll back, or escalate this pattern? |
| Audience delta | Does this require a genuinely different audience or prerequisite? |
| Expected shelf life | Is this durable practice, a release update, or a temporary preview? |
| Format | Core talk, clinic, demo, reference guide, release brief, or workshop exercise? |

Create a new core talk only when the first five answers establish a distinct educational contract. Route release announcements to existing owners. Use a clinic or reference guide when the subject is useful but cannot sustain a full decision-and-evidence arc.

## Metadata Model

Keep one canonical `section` value based on decision family. Add portfolio metadata to each active talk during migration:

```yaml
section: "Choose and Configure"
audience:
  - developer
  - team-lead
level: foundational
duration: 45
format: core-talk
decision: "Where should durable project guidance live?"
prerequisites: []
related:
  - surfaces
  - agent-dev-loop
```

Recommended controlled values:

- `level`: `foundational`, `applied`, `advanced`, `strategic`
- `format`: `core-talk`, `clinic`, `case-study`, `release-brief`
- `audience`: `developer`, `team-lead`, `platform-engineer`, `security`, `architect`, `engineering-leader`

Do not use maturity or audience as the primary section axis. They change by pathway; the decision family remains stable.

## Migration Plan

### Phase 0: Freeze and Baseline

**Goal:** Make restructuring reversible and measurable.

- Freeze new practitioner talk creation except urgent release corrections.
- Capture the current 24-talk inventory, links, section, duration, grade, and companion paths.
- Add a redirect/deprecation convention for merged slugs.
- Define portfolio checks for duplicate decisions, missing evidence, invalid relationships, and orphaned cards.

**Exit evidence:** A machine-readable inventory accounts for every active talk and every deployed card.

### Phase 1: Approve the Architecture

**Goal:** Confirm the classification model before rewriting content.

- Review the four decision families and controlled metadata.
- Run the three merge experiments as outlines only.
- Decide the final disposition of Memory, Debugging, Code Review, Code Quality, Agentic Journey, and VS Code Latest.
- Assign one canonical owner for every recurring topic: surfaces, memory, MCP, autonomy, verification, and governance.

**Exit evidence:** All 24 talks have an approved `keep`, `narrow`, `merge`, `reposition`, or `retire` decision and a target owner.

### Phase 2: Build the Navigation Layer

**Goal:** Improve discoverability before changing many decks.

- Replace the stale `tech-talks/README.md` inventory with the live portfolio.
- Rewrite `tech-talks/DECISION-GUIDE.md` around decision families and pathways.
- Update `slides/index-custom.html` and `slides/SECTIONS.md` together.
- Add metadata validation and generate catalog views from frontmatter where practical.
- Remove or resolve the empty `copilot-surface-router` placeholder.

**Exit evidence:** A learner can select a talk by decision or follow a role-based path without encountering missing or retired content.

### Phase 3: Consolidate the Highest-Overlap Material

**Goal:** Remove duplication while preserving unique evidence.

Work in this order:

1. Retire `vscode-latest` as a durable talk; route durable content to owning talks.
2. Move `agentic-journey` into the adoption roadmap and owning implementation talks.
3. Pilot PR Trust Stack from Code Review + Code Quality.
4. Narrow Memory and Chat Internals into clinics; keep Configuration focused on team-owned context.

For each consolidation:

- Build a source-to-target coverage matrix before editing.
- Preserve current files until the replacement README, recipe, deck, and companions validate.
- Mark superseded source artifacts `status: archived`; never rewrite them afterward.
- Keep old catalog entries as labeled merged/retired records or redirects where supported.

**Exit evidence:** No unique decision, artifact, caveat, or verified source disappears during consolidation.

### Phase 4: Sharpen Adjacent Talks

**Goal:** Make every remaining talk own one decision.

- Separate `agent-dev-loop` from `copilot-primitives`: applying a configuration stack versus designing that stack.
- Separate `agent-teams` from `loopy-agents`: composition versus runtime reliability and stopping.
- Separate `agentic-workflows` from `copilot-web`: recurring event-driven automation versus one bounded issue delegation.
- Separate `agentic-sdlc` from `enterprise-patterns`: delivery infrastructure versus organizational operating model.
- Separate SDK, ACP, plugins, and MCP Apps with one shared extension-selection matrix.
- Reframe Azure MCP as a domain-authority case study rather than a catalog of Azure tools.

**Exit evidence:** The opening question, primary artifact, validation method, and stopping boundary differ for every adjacent pair.

### Phase 5: Rebuild Evidence and Transfer

**Goal:** Raise the weakest portfolio dimension: observable proof.

Each durable talk must contain:

- One visible input artifact.
- One visible execution or inspection result.
- One failure, rejected output, or recovery path.
- One named reviewer or authority boundary.
- One bounded task the learner can apply to their own work.

Prioritize `copilot-sdk`, `copilot-plugins`, `copilot-acp`, `copilot-memory`, and `vscode-latest` replacement content based on the slide-only grading baseline.

**Exit evidence:** Every deck passes the Judgment and Transfer Contract using visible slide content alone.

### Phase 6: Validate and Publish

**Goal:** Ship without broken links or stale companions.

- Regrade the portfolio using the same five-dimension rubric.
- Build every changed deck with the repository Slidev build wrapper.
- Inspect changed slides at desktop and mobile sizes.
- Regenerate agendas and PDFs for changed or merged decks.
- Run strict companion checks, index-date sync, link validation, content-generation tests, and routing tests.
- Record archive and ownership decisions in the Workbench.

**Exit evidence:** No active/deployed mismatch, stale companion, broken cross-link, or undocumented archive remains.

## Work Packages

| Package | Scope | Dependencies | Expected outcome |
|---|---|---|---|
| WP1 Portfolio schema | Inventory, controlled metadata, validation | None | One source of truth for catalog state |
| WP2 Navigation | README, decision guide, index sections, pathways | WP1 | Decision-first discoverability |
| WP3 Retire volatile talks | `vscode-latest`, release brief pattern | WP1–2 | Releases update owners instead of growing catalog |
| WP4 Adoption consolidation | `agentic-journey`, roadmap, cross-links | WP1–2 | One evidence-based adoption pathway |
| WP5 PR trust pilot | Code Review + Code Quality prototype | WP1 | Merge/no-merge decision supported by an outline and evidence map |
| WP6 Context clinics | Primitives, Memory, Chat Internals | WP1 | Clear ownership of team context, personal memory, diagnostics |
| WP7 Agentic boundaries | Dev Loop, Teams, Workflows, Loops, App | WP2 | Distinct delegation and coordination decisions |
| WP8 Extension boundaries | Plugins, SDK, ACP, MCP Apps, Azure MCP, Foundry | WP2 | One extension-selection model with focused deep dives |
| WP9 Evidence upgrade | Visible proof and transfer across retained decks | WP3–8 | Portfolio meets the new north star |
| WP10 Publish | Builds, visual QA, companions, redirects, archive records | All | Coherent deployed portfolio |

## Measures of Success

### Portfolio health

- Active practitioner talks reduced from 24 to a defensible 19–20.
- Every talk has one unique primary decision and one canonical catalog home.
- No pair shares the same decision, evidence artifact, and audience without an explicit merge rationale.
- Every active catalog card resolves to an active README, deck, and companions.

### Educational quality

- Portfolio average rises from 82.7 to at least 88 on the slide-only rubric.
- No durable talk scores below 80.
- Observable proof averages at least 17/20.
- Every talk names a transfer task, reviewer or authority, expected signal, and stopping boundary.

### Maintainability

- Release announcements update existing owners unless the topic intake gate proves a new decision.
- Catalog and pathways derive from validated metadata rather than hand-maintained duplicate lists where feasible.
- Merged and retired talks preserve link history and rationale without remaining in the active learning path.

## Approval Gates

Do not begin bulk rewrites until these decisions are approved:

1. Are the four decision families the right canonical catalog axis?
2. Should PR Trust Stack replace both Code Review and Code Quality, or should they remain paired talks?
3. Should Memory and Debugging become clinics while Configuration remains the core talk?
4. Should Agentic Journey become a pathway rather than a standalone talk?
5. Should VS Code Latest become a rolling release brief rather than a durable talk?

Once approved, implement WP1 and WP2 first. They create the control plane for all later content work and prevent the catalog from drifting during migration.
