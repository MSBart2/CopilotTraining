---
name: build-slidev-decks
description: Fast validation of Slidev deck changes. Correct invocation, output interpretation, and common issues.
infer: true
---

# Build Slidev Decks Skill

Quick validation protocol for Slidev presentation changes.

---

## Triggers

Load this skill when you need to:
- **Validate component changes** — ensure modified Vue components don't break any deck builds
- **Check slide edits** — confirm `.md` file changes produce valid builds
- **Bulk rebuild for deployment** — rebuild all decks before commit/release

---

## The Quick Procedure

### 1. Detect your OS and navigate to `slides/`

**Windows PowerShell:**
```powershell
cd C:\Users\hobob\source\CopilotTraining\slides
```

**Linux/macOS Bash:**
```bash
cd /path/to/CopilotTraining/slides
chmod +x build.sh scripts/build-all.sh  # First time only
```

### 2. Run the build command

| Goal | Windows | Linux/macOS |
|------|---------|------------|
| Validate single deck | `.\build.ps1 -Deck copilot-cli` | `./build.sh --deck copilot-cli` |
| Validate tech-talks | `.\build.ps1 -Folder Tech-talks` | `./build.sh --folder tech-talks` |
| Validate workshop | `.\build.ps1 -Folder workshop` | `./build.sh --folder workshop` |
| Validate exec-talks | `.\build.ps1 -Folder exec-talks` | `./build.sh --folder exec-talks` |
| Rebuild all | `.\build.ps1` | `./build.sh` |

### 3. Read the `[DONE]` line

```
[DONE] 17 presentations built, 0 archived skipped.
```

✅ **If you see this**, builds passed. Done.
❌ **If count is lower**, one or more decks failed. See troubleshooting.

---

## Single-Deck Builds (Faster Validation)

When editing a single `.md` file or component that affects only one deck, build just that deck to save time:

```powershell
# Windows: build only copilot-cli
.\build.ps1 -Deck copilot-cli

# Also verbose for debugging:
.\build.ps1 -Deck copilot-cli -Verbose
```

```bash
# Linux/macOS: build only copilot-cli
./build.sh --deck copilot-cli
```

The script will:
1. Auto-detect the category (workshop/tech-talks/exec-talks)
2. Build only that one `.md` file
3. Output the same `[DONE]` and `[CLOCK]` lines

**When to use:**
- ✅ After editing a single `.md` file or its frontmatter
- ✅ After modifying a component only used by one deck
- ✅ Quick validation before pushing to a branch
- ❌ Don't use after shared component changes — use category or full rebuild instead

---

## Expected Output

### Success (all decks passed)
```
[SCIENCE] Building tech-talks slides...
   [HAMMER] tech-talks/agent-teams... [OK] 4.3s
   [HAMMER] tech-talks/agentic-journey... [OK] 2.3s
   ...
   [HAMMER] tech-talks/vscode-latest... [OK] 4.2s

[DONE] 17 presentations built, 0 archived skipped.
[CLOCK] Total time: 1m 0.8s
```

### What to Ignore
- `node.exe : [Slidev] Ignored provided index.html` warnings in stderr
- Any warning that doesn't prevent an `[OK]` status on the next line

---

## Common Issues

### One deck shows `[FAILED]` or count is wrong

**Check the failing deck:**
```powershell
# Windows
.\build.ps1 Tech-talks -Verbose

# Linux/macOS
./build.sh tech-talks --verbose
```

Look for error message in output. Usually:
- Unclosed `<template>` tag
- Mismatched Vue prop syntax
- Invalid HTML comments
- Broken component import

**Fix and retry** — the build command.

### Vue SyntaxError pointing to a specific `__slidev_N.md` file

The `N` in `__slidev_N.md` is the slide number (1-indexed). `__slidev_1` = slide 1 (Title), `__slidev_5` = slide 5, etc.

| Error / symptom | Root cause | Fix |
|---|---|---|
| `Error parsing JavaScript expression: Unexpected token` | Apostrophe or quote character inside a JS string expression | All array/object props need **single outer quotes** (`:prop='[...]'`). Use `&#39;` for apostrophes inside double-quoted string values. Never `\"` or `&quot;` |
| `Module not found: ./components/TitleSlide.vue` | Structural component imported from wrong path | Structural components live in `./components/structure/X.vue`; body components in `./components/X.vue` |
| Blank slide, no build error | Non-existent prop passed to a component (e.g., `section` on `SectionOpenerSlide`) | Check exact prop names in `slides/tech-talks/template.md` — the component silently ignores unknown props, producing an empty slide |
| `[plugin vite:vue] ... Unexpected end of input` | Unbalanced single/double quotes in a `:prop='...'` attribute | Check for unescaped `'` characters; use `&#39;` inside single-quoted outer props |

### `Permission denied` on Linux/macOS

```bash
chmod +x build.sh scripts/build-all.sh
./build.sh tech-talks
```

### Build takes >3 minutes

First build after major dependency changes. Clear cache and retry:
```bash
npm cache clean --force
npm install
# Then run build command
```

---

## Reference: Category Counts

Verify your builds using these expected counts:

| Category | Expected Count | Approx Time |
|----------|---|---|
| Tech-talks | 17 | ~60s |
| Workshop | 7 | ~30s |
| Exec-talks | 4 | ~20s |
| All decks | 28 | ~2m |

---

## Advanced: Platform Syntax Differences

If you need to script or automate builds:

| Aspect | Windows | Linux/macOS |
|--------|---------|------------|
| Category case | `Tech-talks` | `tech-talks` |
| Verbose flag | `-Verbose` | `--verbose` |
| Script location | `slides/build.ps1` | `slides/build.sh` |

---

## One More Thing

Both wrapper scripts (`build.ps1`, `build.sh`) automatically handle path resolution. **Never run from `scripts/` directly** — always invoke from `slides/` directory. The wrappers detect their own location and navigate for you.
