# GitHub Pages View/Popularity Tracking Plan

## Goal
Track which CopilotTraining pages/decks are actually used so we can prioritize updates, retire low-value content, and measure adoption trends.

## Constraints
- Site is static and hosted on GitHub Pages (no native server-side analytics).
- We should avoid adding operational overhead where possible.
- Privacy and transparency matter for training audiences.

## Recommended Approach
Use a lightweight client-side analytics provider and instrument both:
1. **Homepage card clicks** (intent/popularity of topics)
2. **Deck page views** (actual consumption)

Recommended provider order:
- **Option A (lowest friction):** Cloudflare Web Analytics
- **Option B (most flexibility):** Plausible (managed or self-hosted)
- **Option C (enterprise standard):** GA4

## What to Track
- `page_view` for:
  - `/` (homepage)
  - `/workshop/<deck>/`
  - `/tech-talks/<deck>/`
  - `/exec-talks/<deck>/`
- `card_click` on homepage cards with metadata:
  - category (workshop / tech-talks / exec-talks)
  - deck slug
  - section/group (if applicable)
- Optional quality metrics:
  - unique visitors
  - returning visitors
  - referrer/source
  - top entry pages

## Implementation Plan

### Phase 1 — Analytics foundation
- Select provider (Cloudflare, Plausible, or GA4) and confirm privacy requirements.
- Create analytics property/site and capture required IDs/tokens.
- Add tracking snippet to the shared HTML entrypoints used in deployment:
  - `slides/index-custom.html`
  - `slides/404.html` (if needed for route redirects)
- Ensure workflow deployment copies the updated files (already done today via `deploy-slides.yml`).

### Phase 2 — Event instrumentation
- Add homepage click tracking for each content card before navigation.
- Add deck-load tracking for each built deck page view.
- Standardize event naming (`page_view`, `card_click`) and parameter schema.

### Phase 3 — Reporting and visibility
- Build a small recurring report (weekly/monthly) with:
  - top viewed decks
  - top clicked homepage cards
  - least-used decks (retire/refresh candidates)
  - trend deltas period-over-period
- Store report output in a shared location (issue, discussion, or docs page) for editorial planning.

### Phase 4 — Governance and quality
- Add a short note in deployment/docs explaining analytics behavior.
- Add a lightweight validation step to confirm analytics snippet is present in deployed HTML.
- Review data quality after first 1–2 weeks and adjust event metadata if needed.

## Success Criteria
- We can identify the top and bottom 20% of decks by real usage.
- We can see homepage interest (clicks) versus true deck consumption (views).
- We can make monthly content decisions using measured engagement instead of anecdotal feedback.

## First Action
Decide the analytics provider and privacy posture, then implement Phase 1 in the next PR.
