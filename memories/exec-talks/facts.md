# exec-talks / facts

Confirmed facts specific to executive-audience talk structure, build patterns, and component usage.

---

## Executive briefings are self-contained (updated 2026-09-16)

`schema_version: 1` | `date: 2026-09-16`

The shared `exec-spine` was retired after the executive portfolio consolidated to one active briefing. Executive recipes default to `preamble: []`. Add a preamble only when multiple active briefings genuinely share context that cannot live cleanly in each deck.

---

## TOC slide numbers: $nav.go() is 0-indexed (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

The `TocSlide` `slide:` values use `$nav.go(N)` navigation, which is **0-indexed** (slide 0 = first slide).

**Formula for self-contained exec talks:**
- First SectionOpener = slide **3** (0=Title, 1=CoreQuestion, 2=TOC)
- Second SectionOpener = first opener + (body slides in Part 1) + 1 (for the opener itself)
- Third SectionOpener = previous + (body slides in Part 2) + 1
- Fourth SectionOpener = previous + (body slides in Part 3) + 1

**Common mistake:** Using 1-indexed counts or forgetting that the SectionOpener slide itself counts toward the total when computing subsequent section slide numbers.

---

## exec-talk closing slides: BeforeAfterSlide is NOT used in exec-talks (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

Unlike standard tech-talk decks (which always end with BeforeAfterSlide → WhatYouCanDoTodaySlide → ReferencesSlide → ThankYouSlide), exec-talks use a different closing structure. The BeforeAfterSlide is a practitioner-facing component and does not fit the executive decision-making framing.

**Typical exec-talk closing sequence (from exec-labor):**
- BeforeAfterMetricsSlide (data summary — fits exec framing)
- WhatYouCanDoTodaySlide
- ReferencesSlide
- ThankYouSlide

The `WhatYouCanDoTodaySlide`, `ReferencesSlide`, and `ThankYouSlide` prop schemas are the same as in standard tech-talks — see `slides/facts.md` for full prop documentation.

---

## ThankYouSlide :cards must be on a single line (2026-04-24)

`schema_version: 1` | `date: 2026-04-24`

`ThankYouSlide :cards` is an array prop and must be written on a **single line** — multiline array props break the Vue template parser in Slidev. See `slides/facts.md` → "Multiline `:prop` array bindings break Vue template parser."

**Correct:**
```html
<ThankYouSlide :cards="[{ icon: '⏱️', value: '...', detail: '...', subdetail: '...' }, ...]" />
```

**Wrong:**
```html
<ThankYouSlide :cards="[
  { icon: '⏱️', value: '...' },
]" />
```
