# copilot_tools / facts

Confirmed facts about Copilot Tools tech-talk decks — framing, structure, and decisions an agent reading only the deck would miss.

---

## copilot-cli.md: Deck structure and section mapping (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

**Slide count:** 28 slides. The recipe explicitly states the 25-slide ceiling does not apply for this 45-minute talk. Section opener slide numbers: Part 1=4, Part 2=10, Part 3=15, Part 4=20.

**Section arc (recipe-driven):**
- Part 1 "The Terminal Sees Reality" (cyan, 5 body): HeroStat (84%/16% problem) → FrameworkMappingRows (Distance Model: Intent/Complexity/Context/Time/Geography) → AITerminalTranscript (Plan Mode Docker debug: 45min→8min) → BeforeAfterMetrics (8 attempts→2) → FourCardGrid (4 operating modes)
- Part 2 "Range and Delegation" (blue, 4 body): AITerminalTranscript (/fleet fan-out: 3 workstreams in parallel) → BeforeAfterMetrics (sequential vs /fleet) → TwoColPaired (cloud delegation & vs blocking) → FourCardGrid (infinite sessions: auto-compact, repo memory, /compact, additive instructions)
- Part 3 "Work Where the Problem Is" (indigo, 4 body): HeroStat (--remote intro, public preview 2026-04-13) → AITerminalTranscript (walking-to-meeting debug demo) → TwoColPaired (Geography + Compliance closing together) → FrameworkMappingRows (4 combination patterns)
- Part 4 "Patterns That Actually Stick" (purple, 4 body): BeforeAfterPanels (log forensics — compliance violation prevented) → WorkflowShowdown (infra patrol vs traditional monitoring) → TwoColPaired (GitHub.com integration — context loss prevented) → CodeWithFeatures (CI/CD headless copilot -p)

**Key framing decisions:**
- "The Distance Model" (5 named gaps: Intent, Complexity, Context, Time, Geography) is the structural spine — each section closes at least one distance explicitly
- S1 is the live-demo peak (Plan Mode Docker debug), S3 is the marquee reveal (--remote walking-to-meeting), S2 is the deliberate breath between them
- Geography + Compliance close simultaneously in S3 — not separated; compliance is by architecture, not policy
- S4 slides each headline a failure mode prevented, not a feature — transforms feature catalog into practitioner guidance
- Recipe note preserved: DO NOT cut to 25 slides on regeneration — 28 is correct for a 45-minute talk

**Required trailer — always append after ThankYouSlide:**
The deck must end with a Slidev `src:` include that pulls in the reference slide file:
```
---
src: ./copilot-cli-reference.md
---
```
This must appear as the final block in the file, after `ThankYouSlide`. It is not a `<!-- SLIDE: -->` component — it is a raw Slidev frontmatter include. Do not omit it when regenerating.

**Source:** `slides/tech-talks/copilot-cli.md`, `tech-talks/copilot-cli/deck.recipe.yml`

---

## copilot-web.md: Deck regenerated — trigger distinction + reasoning level framing (2026-08-11)

`schema_version: 1` | `date: 2026-08-11`

**Slide count:** 25 slides. Section opener slide numbers: Part 1=5, Part 2=10, Part 3=15, Part 4=18.

**Section arc (recipe-driven):**
- Part 1 "Delegation Loop" (cyan, 4 body): FrameworkMappingRows (three-layer model: Intelligence/Environment/Governance) → TwoColPaired (direct delegation vs configured automation) → ThreeColumnCard (reasoning levels: default/higher/requirements) → HeroStat (2 required reviewers / draft-PR-only / assigner≠approver)
- Part 2 "Writing Issues" (blue, 4 body): ProblemSolutionOutcome (vague→structured→consistent PRs) → BeforeAfterPanels (underspecified vs structured issue side-by-side) → HeroStat (2 min image-based creation, 95% detail capture) → ThreeColumnCard (acceptance criteria/scope/context+constraints)
- Part 3 "Trust and Configuration" (indigo, 2 body): CodeWithFeatures (copilot-setup-steps.yml: job name contract + runs before firewall) → CodeWithFeatures (Agent Firewall blocked-call log + three allowlist levels)
- Part 4 "Review Workflow" (purple, 3 body): BeforeAfterMetrics (without vs with evidence bundle; <3 min/30 min/2-3 min) → FrameworkMappingRows (What to Delegate: well-bounded/design-only/multi-repo/local-or-DB, labels max 13 chars) → HeroStat (12 min lodash upgrade, 23 files)

**Three non-negotiable framing points:**
1. **Trigger distinction is load-bearing.** Automation trigger comments (Agents → Automations) START a new configured run. Comments left on an existing draft PR REFINE that in-progress implementation. These are different interactions — do not collapse them.
2. **Reasoning level boundary.** Higher reasoning = more tokens + more premium-request credits per run. Supporting models only. Requires a paid Copilot plan that includes the cloud agent. Do not imply it applies to all models or all plans.
3. **Separation of duties.** The person who assigned the issue cannot approve the resulting PR — enforced by GitHub, not configurable. The agent always opens a draft PR and can never merge. Platform invariants, not policies.

**Source:** `slides/tech-talks/copilot-web.md`, `tech-talks/copilot-web/deck.recipe.yml`

---

## copilot-chat-internals.md: Deck structure and section mapping (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

**Slide count:** 24 slides. Section opener slide numbers: Part 1=4, Part 2=9, Part 3=14, Part 4=17.

**Section arc (recipe-driven):**
- Part 1 “Agent Debug Panel: Real-Time Events” (cyan, 4 body): FourCardGrid (4 event stream types) → AITerminalTranscript (YAML syntax error caught in 90 sec) → TwoColPaired (Chart View + Loaded Customizations) → WorkflowShowdown (reload-and-pray vs panel-first)
- Part 2 “Chat Debug View: Full Pipeline” (blue, 4 body): FrameworkMappingRows (5-stage request pipeline) → AITerminalTranscript (wrong file in context demo) → FourCardGrid (thinking token insights) → BeforeAfterMetrics (/compact + /fork context management)
- Part 3 “Customization Diagnostics” (indigo, 2 body): FrameworkMappingRows (4 failure modes + fixes) → TwoColPaired (Diagnostics View vs Extension Logs)
- Part 4 “Systematic Troubleshooting” (purple, 3 body): FrameworkMappingRows (4 symptom → tool decision map) → WorkflowShowdown (ad-hoc vs systematic) → HeroStat (4 min diagnosis)

**Key framing decisions:**
- Core stat: 45 min → 4 min (config error diagnosis) — appears in BeforeAfterSlide, HeroStat, terminal detail on Part 3 opener
- Part 1 is the wow-moment section — Agent Debug Panel (v1.110) is the entry hook; LSP analogy not used here
- Part 2 unifies 3 sub-features (Chat Debug View, Thinking Tokens, Context Management) into one pipeline mental model
- Part 3 is intentionally short (2 slides) — config diagnostics are the bridge between wow and systematic patterns
- Decision map in Part 4 slide 18 maps 4 symptoms to 4 tools — this is the practitioner take-home artifact

**Source:** `slides/tech-talks/copilot-chat-internals.md`, `tech-talks/copilot-chat-internals/deck.recipe.yml`

---

## copilot-azure-mcp.md: Deck structure and section mapping (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

**Slide count:** 24 slides. Section opener slide numbers: Part 1=4, Part 2=9, Part 3=14, Part 4=17.

**Section arc (recipe-driven):**
- Part 1 "Live Azure Context" (cyan, 4 body): FourCardGrid (4 capabilities) → AITerminalTranscript (live query demo) → TwoColPaired (config extraction old vs new) → BeforeAfterMetrics (environment clone)
- Part 2 "Prototype Loop" (blue, 4 body): WorkflowShowdown (traditional vs Plan Mode) → AITerminalTranscript (Plan Mode demo with firewall gap catch) → CodeWithFeatures (generated Bicep) → HeroStat (82% time reduction)
- Part 3 "Configuration & Setup" (indigo, 2 body): CodeWithFeatures (install + config) → ThreeColumnCard (40+ services, scope 3 categories)
- Part 4 "Guardrails & Trust" (purple, 3 body): FrameworkMappingRows (RBAC model) → TwoColPaired (read-only vs write strategies) → WorkflowShowdown (escalation path)

**Key framing decisions:**
- "Hook → value → adoption → trust" is the narrative arc — config before guardrails is deliberate (practitioners need the how before they sell the safe)
- The 45 min → 8 min stat is the anchor number; appears in TocSlide blurb, Part 2 opener, WorkflowShowdown, and HeroStat
- Part 3 (Setup) is intentionally short (2 slides) — it's the adoption enabler, not the value story

**Source:** `slides/tech-talks/copilot-azure-mcp.md`, `tech-talks/copilot-azure-mcp/deck.recipe.yml`

---

## copilot-code-review.md: Deck structure and section mapping (2026-04-22)

`schema_version: 1` | `date: 2026-04-22`

**Slide count:** 22 slides. Section opener slide numbers: Part 1=4, Part 2=8, Part 3=12, Part 4=16.

**Section arc (recipe-driven):**
- Part 1 "Configuration and Quick Start" (cyan, 3 body): WorkflowShowdown (manual vs Copilot setup: 3.2-day wait → 1-2 min) → CodeWithFeatures (.github/copilot-instructions.md file contents + 3 scope levels) → TwoColPaired (branch protection gate + @github-copilot mentions)
- Part 2 "Best Practices and Team Adoption" (blue, 3 body): FourCardGrid (6 capability categories, 4 shown + insight for remaining 2) → BeforeAfterMetrics (hybrid analysis: 73% fewer false positives, 84% better vulnerability coverage) → FrameworkMappingRows (12-week phased rollout: Pilot/Tune/Expand/Scale)
- Part 3 "Measuring ROI and Business Impact" (indigo, 3 body): TwoColPaired (calculator: inputs vs outputs) → HeroStat (78.9% cycle-time improvement, March 2026 example: $88K current / $491K incremental) → FrameworkMappingRows (4 quality metrics: incidents/revert-rate/security/onboarding)
- Part 4 "Compliance and Regulatory Guidance" (purple, 3 body): ThreeColumnCard (HIPAA/PCI-DSS/SOC2 instruction patterns) → FrameworkMappingRows (5-step deploy pattern: Audit/Translate/Severity/Educate/Iterate) → FourCardGrid (built-in audit trail: 4 stages)

**Key framing decisions:**
- Section value is `Copilot Tools` — README frontmatter says "Copilot Agents" which is stale; index-custom.html confirms the correct value
- The calculator example (78.9% improvement, $88K/$491K) is a March 2026 live customer example — explicitly framed as illustrative with visible assumptions, not universal benchmarks
- Compliance section is positioned last because practitioners need the "how" (Part 1) and proof (Parts 2-3) before they will engage with regulatory details
- ThreeColumnCard chosen for Part 4 slide 1 because HIPAA/PCI-DSS/SOC2 are exactly 3 non-overlapping regulatory regimes — perfect fit
- The audit trail FourCardGrid (Finding → Response → Resolution → Merge) is the take-home artifact — shows auditors get enforcement evidence, not sampling

**Build gotcha encountered:** `tag` prop value `$2,250/mo` (with comma) caused UnoCSS to generate invalid CSS `[rows~="\$2\,250\/mo\\"]` with an unclosed bracket in PostCSS. Fixed to `$2.25K/mo`. Do not use commas in `tag` prop values — UnoCSS feeds them directly into CSS attribute selectors.

**Source:** `slides/tech-talks/copilot-code-review.md`, `tech-talks/copilot-code-review/deck.recipe.yml`
