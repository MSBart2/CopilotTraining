---
name: prompt-to-skill
description: "Convert an existing .prompt.md file into a reusable, auto-discoverable Agent Skill. Use when asked to promote, upgrade, or convert a prompt to a skill, or to make a prompt reusable as a skill."
agent: agent
---

Follow the **make-template-skill** skill for all structure, frontmatter rules, validation checklist, and directory conventions.

Convert `.github/prompts/${input:promptName}.prompt.md` into a well-structured, auto-discoverable skill at `.github/skills/${input:promptName}/SKILL.md`.

## Step 1 — Read the source prompt

Read `.github/prompts/${input:promptName}.prompt.md` in full before proceeding. Do not paraphrase — preserve every instruction, step, rule, condition, and output format exactly.

## Step 2 — Craft the SKILL.md frontmatter

Using the **make-template-skill** description guidelines:

- `name`: use `${input:promptName}` (must match folder name exactly)
- `description`: 2–4 sentences that are keyword-rich and include:
  - Synonyms and verb forms of the core action (e.g. verify, validate, fact-check, canon check)
  - Domain entity types the skill operates on
  - ≥5 trigger phrases a team member might naturally type
  - Clear WHAT + WHEN structure

## Step 3 — Write the SKILL.md body

Include these sections (per make-template-skill conventions):

1. **`## When to use this skill`** — ≥5 concrete trigger phrases
2. **`## Prerequisites`** — any required files, MCP servers, or context
3. **Preserved logic** — copy every instruction, step, and rule from the source prompt verbatim under appropriate headings
4. **`## Output template`** — if the source prompt produces structured output (status fields, bullet lists, tables), reproduce the exact format here
5. **`## MCP tools`** — if the skill queries live data, list the relevant tools (e.g. `get_characters`, `get_lore`, `get_episodes`, `get_quotes`) with a one-line description of when each is used

## Step 4 — Create the skill file

Write the complete, validated skill to `.github/skills/${input:promptName}/SKILL.md`.

Run through the make-template-skill **Validation Checklist** before finishing.

## Step 5 — Confirm

Report:

- **Preserved**: what instructions/logic were carried over unchanged
- **Added**: what structure, triggers, or templates were introduced and why
- **Validation**: checklist pass/fail summary
