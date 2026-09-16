# exec-talks / events

Milestones for executive-audience talk decks and infrastructure.

---

## Three executive talks consolidated into The Agentic Operating Model (2026-09-16)

`schema_version: 1` | `date: 2026-09-16`

`exec-delivery`, `exec-economics`, and `exec-labor` were archived after their distinct material was consolidated into active `exec-strategy`, retitled **The Agentic Operating Model**. The replacement preserves one decision journey: authorize a bounded operating-model pilot, test external claims against an independent local baseline, retain explicit human authority, use fully burdened economics, and apply a falsifiable scale-once / adjust-once / stop gate. The catalog now exposes one executive card. The shared executive spine was retired because a single active briefing no longer justified a shared preamble.

---

## exec-labor tone rewrite: alarmism and inversions removed (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

`slides/tech-talks/exec-labor.md` underwent a comprehensive tone rewrite to remove two banned patterns (see `exec-talks/preferences.md`):
1. "Not X, it's Y" rhetorical inversions — 11 instances removed
2. Alarmist urgency framing — 10+ instances removed

**Slide titles changed:**
- "The Cost of Every Deferred Quarter" → "Why This Quarter"
- "Governance: The Highest Financial Exposure" → "Governance: The Clearest ROI Case"
- "What Each Quarter Costs" → "Three Compounding Factors"

**Build:** ✓ clean, zero warnings after rewrite.

**Still to retrofit:** `slides/tech-talks/exec-delivery.md`, `slides/tech-talks/exec-economics.md`, and the corresponding `tech-talks/exec-*/README.md` files.

---

## exec-labor deck created (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

New exec-talk added: **"The Labor Multiplier: What Agents Actually Do"**

**Files created:** `slides/tech-talks/exec-labor.md` (25 slides, builds clean)

**Structure:** Title → exec-spine (6) → CoreQuestion → TOC → Part1/Hidden Labor Bill (3 body) → Part2/Exposure Ledger (3 body) → Part3/Multiplier Model (3 body) → Part4/Decision Window (2 body) → BeforeAfterMetricsSlide → WhatYouCanDoTodaySlide → ReferencesSlide → ThankYouSlide

**TOC 0-indexed slide numbers:** Hidden Labor Bill=9, Exposure Ledger=13, Multiplier Model=17, Decision Window=21

**index-custom.html:** Card added to "Executive Framing" sub-group — "Agentic Labor — AI tools addressed 33% of the labor problem. The multiplier model for capturing the other 67%."

---

## exec-economics deck created (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

New exec-talk added: **"The Agentic Economics: Making the Business Case"**

**Files created:** `slides/tech-talks/exec-economics.md` (builds clean)

**TOC 0-indexed slide numbers:** The Arbitrage=9, The Catch=12, The Returns=16, The Decision=21

**index-custom.html:** Card added to "Executive Framing" sub-group — "Agentic Economics — The $2–5/hour agent reality. Making the business case — ROI math, the J-curve, and three concrete asks."

---

## exec-delivery deck created (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

New exec-talk added: **"No Instruments, No Delivery: The Enterprise Agentic Imperative"**

**Files created:** `slides/tech-talks/exec-delivery.md` (builds clean)

**TOC 0-indexed slide numbers:** The Shift=9, The Flight Model=14, The Risk=18, The Decision=22

**index-custom.html:** Card added — "Agentic Delivery — No instruments, no delivery. The enterprise agentic imperative — why verification infrastructure is the real investment."

---

## "Executive Framing" sub-group added to index-custom.html (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

`slides/index-custom.html` updated: new "Executive Framing" sub-group added to the Tech Talks section with cards for exec-delivery, exec-economics, exec-labor. Old dead `/exec-talks/` section (pointing to non-existent paths) removed entirely.

---

## exec-talks folder retired — exec talks unified into tech-talks (2026-04-23)

`schema_version: 1` | `date: 2026-04-23`

The `slides/exec-talks/` folder no longer exists. All executive talk slide decks (`exec-delivery.md`, `exec-labor.md`, `exec-economics.md`, `exec-spine.md`, `exec-strategy.md`) have moved to `slides/tech-talks/`. Executive talks are now treated identically to tech-talks for slide generation and building — the only distinction is the recipe review skill (`exec-recipe-review` vs `deck-recipe-review`).

`build-all.ps1` and `build.ps1` updated: `exec-talks` removed from `[ValidateSet]`, `$Categories`, `$CategoryConfig`, and output dir creation.
