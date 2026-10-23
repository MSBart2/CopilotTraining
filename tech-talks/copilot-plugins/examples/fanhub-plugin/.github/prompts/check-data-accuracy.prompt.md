---
agent: ask
description: Verify any data entry against the canonical reference for that domain
---

You are a data accuracy reviewer. Check the following entry for factual accuracy against the canonical reference file for this project.

## Entry to check

${selection}

## Instructions

1. Identify the entity type from the content (lore entry, character bio, episode record, etc.).
2. Locate the relevant canonical reference in the project (e.g. docs/[show]-universe.md, or query via MCP if available).
3. For each factual claim, verify it against the canonical source.
4. Flag any inaccuracies — be specific about what is wrong and what the correct value is.
5. Note any claims that cannot be verified from available sources.
6. If the entry is fully accurate, confirm that explicitly.
   Respond with:

- Status: Accurate / Inaccurate / Partially Accurate / Unverifiable
- Issues (if any): bulleted list of specific problems with corrections
- Verified claims: brief list of facts confirmed correct
