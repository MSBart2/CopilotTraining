---
name: lore-accuracy-check
description: >
  Use this skill when asked to verify, validate, or fact-check a lore entry, character
  description, seed data record, or any Breaking Bad content against the canonical
  reference in docs/breaking-bad-universe.md. Triggers on: check lore, verify lore,
  fact-check, canon check, lore accuracy, is this correct, seed data accuracy.
---

## Lore Accuracy Check — Breaking Bad Canon Verifier

Use this skill to fact-check any FanHub lore entry, seed data record, character bio, or
Breaking Bad content claim against the canonical reference document at
`docs/breaking-bad-universe.md`.

---

## What to check

Identify every factual claim in the content under review:

- Character names, actors, statuses (alive/deceased), and types (hero/villain/antihero)
- Relationships between characters
- Locations and their significance
- Episode references, season numbers, air dates
- Quotes and who said them
- Plot events and their sequence
- Production and behind-the-scenes facts
- Awards, viewership numbers, legacy claims

---

## Verification process

1. Read the content to check carefully
2. Read the relevant sections of `docs/breaking-bad-universe.md`
3. For each claim, find the corresponding fact in the reference — or note that it is absent
4. Flag discrepancies with the exact correct information from the reference
5. Note any claims the reference cannot confirm or deny (mark as Unverifiable)
6. If all claims check out, confirm that explicitly — do not invent issues

---

## Output format

Always respond using this structure:

**Status**: `Accurate` / `Inaccurate` / `Partially Accurate` / `Unverifiable`

**Issues** (if any):

- Specific problem → what the correct information is per `breaking-bad-universe.md`

**Verified claims**:

- Brief list of facts confirmed correct

---

## Common error patterns to watch for

These mistakes appear frequently in FanHub seed data and lore entries:

| Wrong                                       | Correct                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| "university professor" or "college teacher" | High school chemistry teacher                                               |
| Purity "over 99%" (vague)                   | Exactly 99.1% purity                                                        |
| "blue color from the synthesis method"      | Blue color from a cooking impurity introduced by the P2P/methylamine method |
| Jesse described as Walt's "friend" early on | Former student, small-time dealer — not a friend initially                  |
| Gus Fring killed by a gunshot               | Killed by a pipe bomb hidden in Hector Salamanca's wheelchair               |
| Hank killed by Walt                         | Hank executed by Jack Welker's gang — Walt tried to stop it                 |
| Jane died of an overdose (Walt uninvolved)  | Walt watched Jane choke and deliberately did not intervene                  |
| Mike described as Gus's "bodyguard"         | Fixer / cleaner / enforcer — not a bodyguard                                |
| Saul's real name is Saul Goodman            | Real name Jimmy McGill — Saul Goodman is a pseudonym                        |

---

## Confidence levels

When citing the reference, be precise about confidence:

- **Confirmed**: The reference document states this explicitly
- **Consistent**: The reference doesn't state it explicitly but nothing contradicts it
- **Unverifiable**: The reference has no information on this claim
- **Contradicted**: The reference directly contradicts this claim
