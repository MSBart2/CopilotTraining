# Documentation Archive

This directory contains the full, detailed documentation for GitHub Copilot Workspace agents and skills that was too large to keep in `.github/` due to the 30,000 character context limit.

## Context Limit Issue

GitHub Copilot Workspace loads all markdown files from `.github/` as context for issue assignments. The original documentation totaled **207,921 characters** (almost 7x the 30,000 char limit), causing "prompt over 30,000 characters" errors when assigning issues to Copilot.

## Solution

We condensed the agent and skill files in `.github/` to essential definitions (targeting ~1,000-3,000 chars each) and moved the full documentation here. Each condensed file references its full documentation.

**Result:** Reduced total context to **23,002 characters** (88% reduction), staying well under the 30,000 char limit.

## File Mapping

### Agents (Full Documentation)

- `agents-module-creator-FULL.md` → Referenced by `.github/agents/module-creator.agent.md`
- `agents-module-planner-FULL.md` → Referenced by `.github/agents/module-planner.agent.md`
- `agents-tech-talk-generator.agent.md` → Referenced by `.github/agents/tech-talk-generator.agent.md`
- `slide-generator-FULL.md` → Referenced by `.github/agents/slide-generator.agent.md`

### Skills (Full Documentation)

- `skills-exercise-author-SKILL.md` → Referenced by `.github/skills/exercise-author/SKILL.md`
- `skills-module-author-SKILL.md` → Referenced by `.github/skills/module-author/SKILL.md`
- `skills-tech-talk-author-SKILL.md` → Referenced by `.github/skills/tech-talk-author/SKILL.md`

## When to Use This Documentation

- **Agents working on issues:** The condensed files in `.github/` provide sufficient context
- **Detailed implementation:** Agents can read full docs here when more detail is needed
- **Troubleshooting:** Complete patterns, examples, and edge cases are documented here
- **Adding new agents/skills:** Reference these full docs for comprehensive guidance

## Maintenance

When updating agents or skills:
1. Update the condensed version in `.github/` (keep under ~3,000 chars)
2. Update the full version here in `docs/` with complete details
3. Ensure the condensed version references the full docs path

This keeps context loading fast while maintaining comprehensive documentation for when it's needed.
