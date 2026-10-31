---
name: inspect-slide
description: Visually inspect individual Slidev slides for overflow, missing progress dots, and color inconsistency. Uses a live slidev dev server and Playwright screenshots for fast edit/verify loops — no full build required. For native tech-talk folders (slides/tech-talks/{slug}/slides.js), use validate-native-deck with --only and --shots instead.
infer: true
triggers:
  - inspect slide
  - review slide
  - check slide
  - slide overflow
  - slide review
  - inspect deck
  - review deck
---

# Inspect Slide Skill

Use this skill whenever you need to visually inspect, diagnose, or fix issues in a Slidev slide deck. It drives a live `slidev dev` session via Playwright screenshots, enabling a tight edit → view → fix loop without a full build.

---

## When to Invoke This Skill

Invoke automatically when:
- The user asks to inspect, review, or fix a specific slide
- The user reports a slide is overflowing, has wrong colors, or is missing progress dots
- You are about to make structural changes to a slide and want to verify before and after
- You finish editing a slide and want to confirm the fix worked

---

## Setup — Fully Automatic

The harness starts `slidev dev` automatically if it's not already running. No manual setup needed — just call inspect or scan and it handles everything.

---

## Per-Slide Inspection Loop

### Step 1 — Inspect

```powershell
cd slides
node scripts/inspect-slide.js <deck-slug> <slide-number>
```

The command outputs:
- **stderr**: human-readable summary (✅ no issues / 🔴 issues found / 🚨 wrong deck)
- **stdout**: full JSON report
- **Screenshot**: saved to `slides/.harness/<deck>-<N>.png`

### Step 2 — View the screenshot

After running inspect, use the `view` tool on the screenshot path from the JSON report:
```
view: slides/.harness/<deck>-<N>.png
```
Visual inspection catches issues that DOM analysis can't (cramped layout, visual imbalance, structural munges).

### Step 3 — Interpret the JSON report

| Field | Meaning | Action |
|-------|---------|--------|
| `wrongDeck: true` | Slidev dev is serving a different deck | Run `start <deck-slug>` to launch the correct deck |
| `overflow: true` | Content bleeds below slide boundary | Tighten `p-*`, `mb-*`, `gap-*`; convert stacked to grid if needed |
| `missingDots: true` | Part 2/3/4 slide lacks progress dots | Add `w-2 h-2 rounded-full` dot row in the pill breadcrumb |
| `colorInconsistent: true` | Slide's pill `from-*` color ≠ section reference | Change pill gradient to match `colorExpected` |
| All false | No detected issues | Confirm visually from screenshot; mark slide done |

### Step 4 — Edit the MD file

Make targeted changes to the slide in the source `.md` file. Do NOT restart slidev dev.

### Step 5 — Wait for hot reload

After saving the file, wait ~1.5 seconds for Slidev's hot reload to apply the change.

### Step 6 — Re-inspect to verify

```powershell
node scripts/inspect-slide.js <deck-slug> <slide-number>
```

View the new screenshot. Confirm the issue is resolved before moving to the next slide.

---

## Common Fixes Reference

### Overflow
```
p-5 → p-3    mb-4 → mb-2    gap-6 → gap-4
space-y-3 → space-y-1    py-2 → py-1 (table rows)    p-3 → p-2 (code blocks)
```
If two rounds of tightening don't fix it → convert stacked cards to `grid grid-cols-2 gap-3`.

### Missing progress dots
Add to the pill breadcrumb row (inside the `flex items-center gap-3` div):
```html
<div class="flex items-center gap-2">
  <div class="w-2 h-2 rounded-full bg-white/20"></div>       <!-- inactive -->
  <div class="w-2 h-2 rounded-full bg-{accent}-400 shadow-lg shadow-{accent}-500/50"></div>  <!-- active -->
  <span class="text-white/40 text-xs ml-1">N of M</span>
</div>
```
After adding dots to a new slide, update ALL earlier slides in the section to reflect the new `M` total.

### Color inconsistency
Change the pill gradient's `from-*` and `to-*` classes to match `colorExpected` from the report.
Also update: background gradient, divider line color, active dot color.

### Wrong deck
```powershell
node scripts/inspect-slide.js start <correct-deck-slug>
```
This starts a new slidev dev for the correct deck on port 3030.
If you need both decks simultaneously, use `--port 3031` for the second one.

---

## Slide Naming Reference

Slide N = the Nth `<!-- SLIDE: -->` comment in the file (1-indexed).  
The JSON report includes `name` (from the comment) and `totalSlides`.

To find a slide by name:
```powershell
Select-String -Path slides/tech-talks/<deck>.md -Pattern "<!-- SLIDE:" | Select-Object LineNumber, Line
```

---

## Notes

- Screenshots are saved to `slides/.harness/` which is gitignored — they are ephemeral
- The slidev dev process writes its PID to `slides/.harness/slidev.pid` for reference
- Playwright 1.58.1 is already installed in `slides/node_modules` — no install needed
- Detection works on MD source (dots, color) + live DOM (overflow) — both must agree for a clean bill of health
