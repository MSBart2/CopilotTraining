# tech-talks / facts

Confirmed facts specific to the tech-talk content pipeline, workflow, and catalog.

---

## copilot-code-review deck regenerated — Lite/Balanced effort + calculator anchor (2026-08-10)

`schema_version: 1` | `date: 2026-08-10`

`tech-talks/copilot-code-review/` is a complete, building tech-talk in the **Developers** section. 25 slides.

**Three non-negotiable framing points** (from content refresh 2026-08-10 + approved recipe):
1. **Lite and Balanced are the GA names (not Low and Medium).** Low/Medium carry forward to Lite/Balanced for existing configurations. These effort levels are available on Copilot Pro, Pro+, Max, Business, and Enterprise. Org admins set a default; repos inherit; individual reviews can override per-review (applies only to that review). PR timeline and overview show which effort level was used.
2. **The interactive time-savings calculator is the ROI anchor, not YAML or SQL.** The calculator at https://copilot-code-review--clee1211.github.app/ takes real PR analytics + review-time assumptions and produces cycle-time improvement, hours saved, and a prewritten executive summary. The key distinction: it separates cycle-time (days open) from review effort (minutes spent) — that makes the savings claim defensible to engineering leadership and finance.
3. **"Best Practices and Team Adoption" is deliberately kept as Part 2** (not "The Solution: GitHub Copilot Code Review"). Practitioner audience framing: "adopt → measure" flows more naturally than "solution → adopt." If future presenter audiences skew decision-maker, swap to "The Solution" framing per the recipe OPEN DECISION note.

**Deck structure:** Configuration and Quick Start (high, 4 slides) → Best Practices and Adoption (medium-high, 3 slides) → ROI and Business Impact (high, 4 slides) → Compliance and Regulatory Guidance (medium, 2 slides). 78.9% cycle-time improvement stat at Part 3 (HeroStatSlide) is the persuasion peak.

---

## copilot-code-quality deck regenerated — billing boundary + onboarding framing (2026-08-10)

`schema_version: 1` | `date: 2026-08-10`

`tech-talks/copilot-code-quality/` is a complete, building tech-talk in the **Developers** section. 24 slides.

**Three non-negotiable framing points** (from content refresh + revised recipe):
1. **Code Quality does NOT auto-enable Copilot review.** GitHub disabled auto-review in GitHub-generated rulesets; edited/user-authored rulesets were untouched. Copilot review requires its own repository or org ruleset and is billed to the Copilot plan, not the Code Quality per-committer charge.
2. **Agent-generated coverage PR is optional onboarding.** In public preview on github.com, Code Quality settings can open a reviewable PR with a least-privilege workflow. Manual workflow authoring remains the full-control path and is never blocked.
3. **Active-committer billing is org-wide, not per-repo.** 50 committers across 12 repos = same bill as 50 committers on 1 repo. The "same 50 people" insight is the key educational moment for platform teams.

**Deck structure:** Coverage Gates (high, 4 slides) → Autofix + Review Boundary (medium, 2 slides) → Reading the Bill (high, 4 slides) → Rolling Out Without Surprises (medium, 2 slides). $500+/month worked example at Part 3 slide 2 (HeroStatSlide) is the number audiences repeat.

---

## copilot-app deck complete — Trust Ladder framing (2026-06-16)

`schema_version: 1` | `date: 2026-06-16`

`tech-talks/copilot-app/` is a complete, building tech-talk in the **Agentic Systems** section. 25 slides.

**Trust Ladder structuring principle** (from council-improved recipe): each of the 4 sections answers one escalating trust question:
1. "What is this?" (The Fleet Model)
2. "Is it safe?" (Safe Parallelism)
3. "How much control do I keep?" (Control Surfaces)
4. "What does done look like at scale?" (Sessions to Systems)

This pattern is reusable for any talk that introduces new infrastructure tooling where audience skepticism is the core blocker.

**Key cross-references:** overlaps with Agent Teams (worktree architecture), Agentic Workflows (workflow/trigger patterns), MCP Apps (Canvas MCP surface).

---

## component-test.md is a visual testing harness — not a tech-talk (2026-04-21)

`schema_version: 1` | `date: 2026-04-21`

`slides/tech-talks/component-test.md` exists solely as a **visual testing harness** for the 13 Tier-1 body components. It is **not a tech-talk**. Never include it when listing tech-talks, counting tech-talks, generating content for tech-talks, or running conformance sweeps. Exclude it from any "all tech-talks" enumeration.

---

## Content refresh cheap path vs reviewed recipe pipeline (2026-08-27)

`schema_version: 1` | `date: 2026-08-27`

Cross-model recipe review + wipe-and-regen is **greenfield or structural only** (new talk or `slideImpact: replace-demo` / `recipeImpact: restructure`).

Named-talk refresh (`content-refresh` / `ledger-tech-talk-refresh`):

- Empty ledger ≠ talk is current. Continue from README `updated` + first-party product sources.
- Route with `npm run content:route -- --since <cutoff>`. Default 7-day lookback misses older talks.
- `recipeReview.required: false` unless structural / restructure / replace-demo. Do not run cross-model review to confirm a recipe you already intend to keep.
- Default slide work is **patch** the existing deck. File-clear (`<!-- generating -->`) is regenerate-only.
- Required recipe reviews use primary analysis + an automatic independent Rubber Duck critique + reconciliation. If Rubber Duck is unavailable, use a different-model-family subagent or fail closed.
- One network/subagent failure: retry once, then proceed. Do not restart the whole refresh.

## Tech-talk pipeline: 3-stage sequence with deck-recipe-review skill (updated 2026-08-27)

`schema_version: 1` | `date: 2026-08-27`

The **greenfield** tech-talk authoring pipeline is a strict 3-stage sequence:

1. **Tech Talk Generator** — writes `README.md`. Final step invokes the deck-recipe-review skill. Does NOT create `deck.recipe.yml` itself.
2. **Deck Recipe Review skill** — owns recipe creation entirely. Runs primary analysis, requires an independent cross-model Rubber Duck critique, reconciles the feedback, and produces a **complete, fresh** `deck.recipe.yml` with ALL fields. Always overwrites — never patches. The generic AgentCouncil agent and skill were retired; callers must not ask the user to invoke review manually.
3. **Tech Talk Slide Generator** — reads `deck.recipe.yml` as the sole Phase A input. If recipe is missing, **hard stops**: "Run the deck-recipe-review skill first."

**Key change from prior workflow:** File-clear gate promoted to pre-flight in slide generator: `Set-Content ... "<!-- generating -->"` runs BEFORE Phase A, not inside it. Refresh work must not use this wipe unless `slideImpact` is `regenerate` or `replace-demo`.

---

## research.md prevents hallucination recurrence in tech-talks (2026-04-10)

`schema_version: 1` | `date: 2026-04-10`

When regenerating a tech-talk README, always check for `tech-talks/<slug>/research.md`. If it exists, instruct Tech Talk Generator to use it as primary source. research.md contains facts verified from official URLs.

The `copilot-code-review` README had pervasive hallucinations (fictional `copilot-review.yml` config schema, non-existent cross-references). Fixed by complete regeneration from `research.md`. Any deck with a `research.md` file has gone through hallucination-antidote treatment.
