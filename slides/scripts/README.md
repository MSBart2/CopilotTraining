# Slidev Build System Documentation

## Overview

The CopilotTraining slide deck build system consists of two PowerShell scripts:

- **`scripts/build-all.ps1`** — The main build orchestrator (run from scripts/ directory)
- **`build.ps1`** — Wrapper script in slides/ root (calls build-all.ps1 automatically)

## Quick Start

```powershell
cd slides

# Build only tech-talks
.\build.ps1 Tech-talks

# Build all categories
.\build.ps1

# Build with verbose output
.\build.ps1 Tech-talks -Verbose
```

## Architecture

### Why Two Scripts?

The `scripts/build-all.ps1` script reads the `.md` files relative to the `slides/` directory. If you run it from `slides/scripts/`, it uses `Split-Path -Parent $PSScriptRoot` to navigate back to `slides/`. This works, but creates a constraint: the script must be executed from its own directory to have correct path resolution.

The `build.ps1` wrapper in the `slides/` root solves this by:

1. **Capturing PSScriptRoot** — Captures the slides/ directory location
2. **Pushing to scripts/** — Changes into the scripts/ directory
3. **Delegating** — Calls build-all.ps1 with all arguments
4. **Restoring directory** — Returns to the original working directory via finally block

This pattern enables:
- ✅ Running from anywhere: `C:\Projects> slides\build.ps1 Tech-talks`
- ✅ Running from slides/: `slides> .\build.ps1 Tech-talks`
- ✅ Automation/agent tools calling reliably without path context issues
- ✅ Consistent parameter passing (`@args` forwards all arguments)

### Script Responsibilities

**`scripts/build-all.ps1`:**
- Discovers .md files in workshop/, tech-talks/, exec-talks/
- Checks for archived status (skips archived decks)
- Invokes `npm run build` for each deck with correct output paths
- Handles success/failure detection
- Displays timing and summary

**`build.ps1`:**
- Wrapper only
- Handles directory navigation
- Forwards all parameters unchanged

## Usage Examples

### Build specific categories

```powershell
# Tech-talks only
.\build.ps1 Tech-talks

# Workshop only
.\build.ps1 workshop

# Exec-talks only
.\build.ps1 exec-talks
```

### Build everything

```powershell
.\build.ps1
```

### Verbose output (for debugging builds)

```powershell
.\build.ps1 Tech-talks -Verbose
.\build.ps1 -Verbose
```

## Output

After a successful build:

```
[ROCKET] Building Tech-talks Slidev presentations...
[FOLDER] Slides directory: <repo>/slides
[BOX] Output directory: <repo>/slides/dist
[OPEN_FOLDER] Folder filter: Tech-talks

[SCIENCE] Building tech-talks slides...
   [HAMMER] tech-talks/agent-teams... [OK] 4.3s
   [HAMMER] tech-talks/agentic-journey... [OK] 4.2s
   ...
   [HAMMER] tech-talks/vscode-latest... [OK] 4.2s

[DOC] Copying index-custom.html to dist root...

[DONE] 17 presentations built, 0 archived skipped.
[CLOCK] Total time: 1m 12s
[BOX] Output location: <repo>/slides/dist
```

Built decks are in `slides/dist/<category>/<deck-name>/`.

## Previewing Locally

### Homepage + companions (fast)

From `slides/`:

```powershell
npm run sync-index
npm run generate-agendas -- copilot-cli --from-slides  # timed agenda from TocSlide
npm run generate-agendas -- copilot-cli --html-only    # after hand-tuning agenda.md
npm run export-pdf -- copilot-cli                      # optional deck.pdf
npm run preview:index                                 # http://127.0.0.1:8080/
```

Agendas are a simple timed run-of-show (`Agenda (45 min)` + numbered items),
seeded from the Slidev deck. Edit `agenda.md` for real room timing, then
`--html-only`. Companions live under `slides/companions/<category>/<slug>/`
and are **not** built in CI — `copy-companions` only copies files that already
exist.

### Full site after a build

```powershell
.\build.ps1 Tech-talks
cd dist
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Troubleshooting

**Script won't run:**
```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Path errors:**
- Always run from the `slides/` directory or use the full path to `build.ps1`
- The wrapper handles navigation automatically

**Build failures:**
- Run with `-Verbose` flag to see detailed build output
- Check `slides/dist/<category>/<deck-name>/` exists after build

## Implementation Notes

- Scripts use `@args` to forward all parameters correctly
- Archived decks (status: archived in frontmatter) are skipped
- Exit code reflects success/failure for automation
- Output is color-coded for readability (Cyan/Green/Yellow/Red)

## Companion artifacts (agenda + PDF)

Local-only generation. CI/build copies committed files under `slides/companions/`.

| Script | npm | Purpose |
|--------|-----|---------|
| `generate-agendas.mjs` | `npm run generate-agendas` | Timed agenda.md + agenda.html from deck TOC |
| `export-pdfs.mjs` | `npm run export-pdf` | Compact deck.pdf (JPEG pipeline; `--native` opt-in) |
| `copy-companions.mjs` | `npm run copy-companions` | Mirror companions into `dist/<cat>/<slug>/` |
| `check-companions.mjs` | `npm run check-companions` | Missing/stale vs deck mtime (`--strict` exits 1) |
| `verify-companions-dist.mjs` | `npm run verify-companions-dist` | Fail if copy dropped a file |
| `preview-index.mjs` | `npm run preview:index` | Local homepage + companions |

Ship gate: **Deploy** agent (`.github/agents/deploy.agent.md`). See `slides/companions/README.md`.
