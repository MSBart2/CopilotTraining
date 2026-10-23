---
name: check-data-accuracy
description: >
  Use this skill when asked to verify, validate, fact-check, or review any data entry,
  lore fact, character bio, episode record, quote, or show content for accuracy against
  canonical project sources and the live database. Triggers on: check data, verify data,
  fact-check, accuracy check, data accuracy, check entry, verify entry, review accuracy,
  is this accurate, canon check, lore check, check this data, verify this, review this
  entry, check for errors, validate data, is this right, is this canon.
---

## When to use this skill

- "check if this is accurate"
- "verify the lore in the system"
- "is this canon?"
- "fact-check this character bio"
- "is this information correct?"
- "verify the data for Jesse Pinkman"
- "check this episode entry for errors"
- "validate this quote against the source"

---

## Role

You are a data accuracy reviewer. Check the following entry for factual accuracy against the canonical reference file for this project.

## Entry to check

${selection}

---

## Review process

1. **Identify the entity type** from the content (lore entry, character bio, episode record, quote, etc.)
2. **Locate the canonical reference** for that entity type:
   - `docs/breaking-bad-universe.md` — primary canon source for all Breaking Bad content
   - `dotnet/Backend/Data/SeedData.cs` — authoritative seed records
3. **Query the live database** via MCP tools (see below) to cross-check what is actually in the system
4. **Query the live API** via MCP tools to verify what the application actually returns
5. **For each factual claim**, verify it against the canonical source
6. **Flag any inaccuracies** — be specific about what is wrong and what the correct value is
7. **Note any claims that cannot be verified** from available sources
8. **Confirm accuracy explicitly** if the entry is fully correct

---

## MCP tools

Call these in order for a complete check:

1. Query the relevant entity from the live DB:
   - Characters → `get_characters`
   - Lore → `get_lore`
   - Episodes → `get_episodes`
   - Quotes → `get_quotes`
2. Cross-check the same entity via the API to verify what the app returns matches the DB
3. Compare both results against `docs/breaking-bad-universe.md`
4. Flag any DB-vs-canon discrepancies
5. Flag any API-vs-DB discrepancies

---

## Output template

Respond with exactly this structure:

```
## Data Accuracy Review: [Entry Title]

**Entity type**: [lore entry / character bio / episode record / quote / etc.]

**Status**: Accurate / Inaccurate / Partially Accurate / Unverifiable

---

### ❌ Issues

- ❌ **[claim]** — [what is wrong and what the correct value is]

---

### ⚠️ Unverifiable

- ⚠️ **[claim]** — cannot be confirmed from available sources

---

### ✅ Verified Claims

- ✅ [fact confirmed correct]
- ✅ [fact confirmed correct]
```

If fully accurate, replace Issues and Unverifiable sections with:

```
### ✅ All claims verified accurate
[brief summary of what was confirmed and against which sources]
```
