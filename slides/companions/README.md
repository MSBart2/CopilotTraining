# Companion artifacts (agenda + PDF)

Locally authored handouts that ship **alongside** decks. CI/deploy **never**
generates these — it only copies files that already exist here into `dist/`.

## Layout

```text
slides/companions/<category>/<slug>/
  agenda.md      # source of truth (edit freely)
  agenda.html    # beautified page (generated from MD)
  deck.pdf       # Slidev PDF export (optional)
```

## Agenda format

Simple timed run-of-show (presenter handout), not takeaway cards:

```markdown
# GitHub Copilot CLI: AI at the Point of Work

Agenda (45 min)

1. Think Before You Build (10 min)
2. Work From Anywhere (8 min)
3. Sessions That Learn (10 min)
4. Scale Beyond Yourself (11 min)
5. Before/After & What You Can Do Today (4 min)
6. References (2 min)
```

## Author workflow

```powershell
cd slides

# Seed/refresh agenda.md from the Slidev deck (TocSlide + closing slides)
npm run generate-agendas -- copilot-cli --from-slides

# Hand-tune titles/minutes in agenda.md, then rebuild HTML only
npm run generate-agendas -- copilot-cli --html-only

# Optional PDF
npm run export-pdf -- copilot-cli

# Local homepage + companions
npm run preview:index
```

### Flags

| Flag | Meaning |
|------|---------|
| *(none)* | Seed `agenda.md` only when missing; always refresh HTML from MD |
| `--from-slides` | Overwrite `agenda.md` from the deck (alias: `--from-recipe`) |
| `--html-only` | Rebuild HTML from existing MD (no deck parse) |
| `--duration N` | Default total minutes when seeding (default **45**) |

Minutes are estimated from TOC slide spans when seeding. **Edit `agenda.md` for the real room timing** — that file is the source of truth after the first pass.

Homepage chips stay dim until the companion file exists. Commit only what you inspected.

## Ship gate (Deploy agent)

Companions are **not** generated on GitHub Actions. If they aren't committed,
Pages has nothing to copy and the Agenda/PDF chips 404.

Use the **Deploy** agent (`.github/agents/deploy.agent.md`) before shipping
slide changes. It will:

1. `npm run check-companions -- --strict` — hard fail on missing/stale
2. Regen agendas (`generate-agendas`) and compact PDFs (`export-pdf`) for scope
3. `npm run sync-index` when decks changed
4. Re-check, then **snarky commit** including `slides/companions/**`
5. **Refuse** a bare commit when companions lag their decks
6. Push only if you ask

Manual equivalent:

```powershell
cd slides
npm run check-companions -- --strict
npm run generate-agendas -- <slug> --from-slides
npm run export-pdf -- <slug>
npm run check-companions -- --strict
npm run copy-companions          # optional local dist mirror
npm run verify-companions-dist   # after a build + copy
```

### Deploy path

| Artifact | Built | Shipped by |
|----------|-------|------------|
| Deck HTML | CI `slidev build` | `deploy-slides.yml` |
| `agenda.md` / `agenda.html` / `deck.pdf` | **Local only** | `copy-companions.mjs` into `dist/<cat>/<slug>/` |

URL shape on Pages: `/CopilotTraining/<category>/<slug>/agenda.html` and
`.../deck.pdf` next to the deck.
