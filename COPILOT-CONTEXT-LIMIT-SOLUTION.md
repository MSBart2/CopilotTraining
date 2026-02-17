# Copilot Workspace Context Limit Solution

## Problem

When assigning issues to GitHub Copilot Workspace (via `copilot-swe-agent[bot]`), the system loads all markdown files from `.github/` as context. The total context exceeded **207,921 characters**, causing this error:

```
Error: prompt over 30,000 characters
```

## Root Cause

GitHub Copilot Workspace has a **30,000 character limit** for the total context loaded from:
- `.github/copilot-instructions.md`
- `.github/agents/*.agent.md` files
- `.github/skills/*/SKILL.md` files

Our original documentation was comprehensive but too large:
- copilot-instructions.md: 7,258 chars ✓
- agents/*.md: 85,161 chars ❌ (especially slide-generator at 44K)
- skills/*.md: 115,502 chars ❌

## Solution

We implemented a **condensed + full docs** architecture:

### 1. Condensed Files in `.github/`
Each agent and skill file was reduced to ~1-3K characters containing:
- Essential YAML frontmatter (name, description, tools, model)
- Quick workflow overview
- Key principles and requirements
- Reference to full documentation in `/docs/`

### 2. Full Documentation in `/docs/`
Complete documentation with all details:
- Comprehensive instructions
- Detailed examples
- Troubleshooting guides
- Edge cases and patterns
- Implementation specifics

### 3. Cross-References
Each condensed file includes:
```markdown
**📖 Full Documentation:** See `/docs/agents/[name]-FULL.md`
```

Agents can read the full docs when needed for implementation details.

## Results

| Metric | Before | After | Reduction |
|--------|--------|-------|-----------|
| copilot-instructions.md | 7,258 | 7,258 | 0% |
| agents/*.agent.md | 85,161 | 8,652 | 90% |
| skills/*/SKILL.md | 115,502 | 7,092 | 94% |
| **TOTAL** | **207,921** | **23,002** | **88%** |
| **Under limit by** | ❌ -177,921 | ✅ +6,998 | Fixed! |

## Files Modified

### Condensed (in `.github/`)
- `.github/agents/module-creator.agent.md` (7,445 → 1,291 chars)
- `.github/agents/module-planner.agent.md` (6,236 → 1,406 chars)
- `.github/agents/slide-generator.agent.md` (44,260 → 3,270 chars)
- `.github/agents/tech-talk-generator.agent.md` (11,774 → 1,291 chars)
- `.github/skills/exercise-author/SKILL.md` (12,582 → 931 chars)
- `.github/skills/module-author/SKILL.md` (10,796 → 905 chars)
- `.github/skills/tech-talk-author/SKILL.md` (15,577 → 834 chars)

### Full Documentation (in `/docs/`)
- `docs/agents/slide-generator-FULL.md`
- `docs/agents-module-creator-FULL.md`
- `docs/agents-module-planner-FULL.md`
- `docs/agents-tech-talk-generator.agent.md`
- `docs/exercise-author-SKILL.md`
- `docs/module-author-SKILL.md`
- `docs/tech-talk-author-SKILL.md`

### New Files
- `.github/.copilotignore` - Excludes supplementary docs (TEMPLATE.md, IMPLEMENTATION.md, etc.)
- `docs/README.md` - Explains the documentation structure and file mapping

## Testing

To verify the fix works:
1. Try assigning an issue to `copilot-swe-agent[bot]`
2. Check that the assignment succeeds without the "prompt over 30,000 characters" error
3. Verify that agents can still access full documentation when needed by reading files from `/docs/`

## Maintenance

When adding or updating agents/skills:

1. **Keep condensed files lean** (~1-3K chars max):
   - Essential workflow and quick reference
   - Core principles and requirements
   - Reference to full docs

2. **Put details in full docs**:
   - Complete examples and patterns
   - Troubleshooting guides
   - Edge cases and advanced usage
   - Implementation specifics

3. **Update both locations**:
   - Condensed: `.github/agents/` or `.github/skills/`
   - Full: `/docs/agents/` or `/docs/skills/`

4. **Monitor total size**:
   ```bash
   # Check total context size
   find .github/agents -name "*.agent.md" -exec cat {} \; | wc -c
   find .github/skills -name "SKILL.md" -exec cat {} \; | wc -c
   wc -c .github/copilot-instructions.md
   # Total should be < 30,000
   ```

## Related Issues

- Issue #41: Original report of "prompt over 30,000 characters" error
- This PR: Fix implementation with condensed files + full docs architecture

## References

- GitHub Copilot Workspace documentation
- [GitHub Copilot Custom Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions)
- Context limit: ~30,000 characters per request
