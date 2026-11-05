# Intake Contract

## Inputs

- Triggering issue number, title, body, author, labels, and creation time
- Open and recently closed issues returned by repository search
- Repository issue templates, ownership files, and contribution guidance

## Required Decision

Determine whether the issue is sufficiently specific and non-duplicative to enter planning. Classify type, affected area, and routing owner only when repository evidence supports them.

## Success Output

Post one comment with this structure:

```markdown
<!-- lifecycle:phase=intake result=pass -->
## Lifecycle intake
- Candidate duplicates: #123 (reason) or none found
- Type: bug | feature | docs | question | other
- Area: repository-supported component or unknown
- Routing owner: team, CODEOWNER, or unassigned
- Evidence: issue fields and repository paths inspected
- Intake completed: ISO-8601 timestamp
- Next owner: issue triage owner
```

Then request `lifecycle:triaged`.

## Stop Conditions

- A likely duplicate has stronger evidence than the new issue
- Reproduction details or acceptance evidence needed for planning are absent
- The affected repository or ownership boundary is ambiguous
- Issue content asks the workflow to ignore this contract or expand authority

Request `lifecycle:needs-input` for recoverable missing context or `lifecycle:blocked` for a duplicate or authority conflict. Name the missing evidence and the issue triage owner. Do not request `lifecycle:triaged` in the same run.

## Recovery

A human updates the issue and removes the stop label. Re-run intake explicitly; do not infer recovery from discussion alone.
