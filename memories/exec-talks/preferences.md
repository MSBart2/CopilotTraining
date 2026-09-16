# exec-talks / preferences

Voice, tone, and framing preferences for executive-audience talks.

---

## Exec-talk voice rules: no alarmism, no "not X it's Y", no you/yours (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

These rules were established by reviewing exec-labor slides. Apply to all exec-talk slide generation and README writing.

### Banned: Second-person framing (you / your / yours)

Never address the audience as "you" or "your". Executive briefings speak in the third person about organizations, leaders, teams, and developers.

**Examples of what NOT to write:**
- "whether **your** organization can capture this change"
- "Are **your** developers equipped to fly?"
- "agentic AI is **your** autopilot"
- "the cheapest line in **your** risk budget"
- "**Your** developers are becoming pilots"
- "**You** cannot fly multiple aircraft without instruments"
- "That data is **your** business case"

**Fix:** Reframe with "an organization", "the organization", "developers", "leaders", "the team", or passive constructions.
- ✅ "whether **an organization** can capture this change"
- ✅ "Are developers equipped to fly?"
- ✅ "agentic AI is **the** autopilot"
- ✅ "the most cost-effective line in **an organization's** risk budget"
- ✅ "Developers are becoming pilots"
- ✅ "Instrument coverage is the prerequisite for multi-session flight"
- ✅ "That data is the business case for scaling"

**First applied:** exec-delivery README (2026-04-24). Also needs retrofit on exec-economics and exec-labor READMEs.

---

### Banned: "Not X, it's Y" constructions

Never use this rhetorical pattern. Rewrite to state only the positive claim.

**Examples of what NOT to write:**
- "The organizations moving fastest are **not** those with the most developers — **they are** those who..."
- "**These are not** technology failure costs. **They are** structural labor gaps."
- "**These are not** projections. **They are** what organizations are measuring."
- "Automated governance pays for itself — **manual review does not scale**."
- "**Inaction is not neutral**..."
- "**The gap is not paused** while you decide."
- "**not** after audit" / "**not** API cost" / "**not** next year"
- "**not** a catch-up response" / "**not** a future state"
- "The **absence of policy is itself a policy**" (same rhetorical move)

**Fix:** State the positive claim directly and move on.

### Banned: Alarmist urgency framing

Never frame inaction as threat. Never imply the audience is falling behind or at risk if they don't act now. Present opportunity, not fear.

**Patterns to avoid:**
- "risk surface you are carrying **undefended**"
- "**gap widens** every deferred quarter" / "every quarter of deferral"
- "**The Cost of Every Deferred Quarter**" (slide title pattern)
- "**Inaction does not hold position**" / "**Inaction is not neutral**"
- "**the window is now**" / "**the window is closing**"
- "**compounding cost** of delay" / "**compound silently**"
- "**exposure**" used as a threat label (e.g. "$4.88M exposure" — say "$4.88M avg breach cost")
- "**carrying undefended**"
- "**catch-up necessity**"
- "**structural cost advantage**" framing competitors as a threat

**Fix:** State the same data as opportunity or factual context. "Elite teams deploy 208x more frequently" — not "the gap widens every quarter you delay."

### Preferred voice for exec-talks

- **Factual and direct.** State what is true. Trust the executive to draw implications.
- **Opportunity-framed.** "The 67% is ready to move" — not "67% is still untouched."
- **Positive comparison.** "Organizations that have started have an 18–24 month head start" — not "you are 18–24 months behind."
- **Data as context, not threat.** DORA 208x is a benchmark, not a warning. $4.88M is a cost structure, not a scare stat.
- **Section titles describe what the audience gets**, not what they are losing. "The Business Case" or "The ROI Evidence" — not "The Exposure Ledger" or "What Each Quarter Costs."

### Applied in exec-labor (2026-04-24)

These patterns were removed from `slides/tech-talks/exec-labor.md` and the replacement style is visible there. Use exec-labor as the reference for correct exec-talk voice.

**Still to retrofit:** `slides/tech-talks/exec-delivery.md`, `slides/tech-talks/exec-economics.md`, and the corresponding `tech-talks/exec-*/README.md` files.

---

## Executive content fitness is decision quality (2026-09-15)

`schema_version: 1` | `date: 2026-09-15`

An executive briefing is ready when it is relevant, compelling, decision-ready, and credible. Decision-ready actions name what can be authorized, an owner, a time horizon, a tradeoff, and an observable success signal. Credibility requires an evidence map that distinguishes primary evidence, vendor evidence, analysis, and estimates while keeping assumptions visible. Timing context explains what changed and which decision is available; it must not manufacture urgency or threaten leaders with inaction.

---

## Executive posture differs deliberately from practitioner talks (2026-09-16)

`schema_version: 1` | `date: 2026-09-16`

Executive briefings advise an investment or authorizing body. Lead with the decision, business outcome, accountable owner, authority boundary, tradeoff, and observable gate. Technical mechanisms earn airtime only when they change an investment, control, or accountability decision. Distinguish external observation, internal baseline, modeled scenario, and proposed threshold. Preserve third-person, factual, opportunity-framed language; avoid tutorials, feature inventories, labor-unit framing, unsupported ROI, and disconnected asks.
