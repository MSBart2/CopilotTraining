# Review Contract

## Inputs

- Triggering draft pull request and linked issue
- Latest approved Phase 2 plan and exact approval comment
- Pull-request diff, changed-file ownership, and deterministic CI results
- Repository review guidance, CODEOWNERS, rulesets, and acceptance criteria

## Required Decision

Determine whether the draft matches the approved plan and whether evidence is sufficient for a named human reviewer to accept residual risk. Agent findings remain advisory; deterministic required checks and repository rules retain their configured authority.

## Success Output

Submit a `COMMENT` review with this structure:

```markdown
<!-- lifecycle:phase=review result=pass|changes-requested|blocked -->
## Lifecycle review
- Plan alignment: pass | drift detected
- Deterministic checks: names and results
- Findings: severity, file/line, evidence, remediation
- Acceptance evidence: issue criteria mapped to proof
- Residual risk: concise statement
- Review completed: ISO-8601 timestamp
- Human acceptance owner: @CODEOWNER or named reviewer
```

Request `lifecycle:reviewed` only when the evidence is ready for human acceptance. This label does not approve or merge the pull request.

## Stop Conditions

- Any required status check is failing or absent
- The diff departs materially from the approved plan
- A high-confidence security, correctness, or data-loss finding remains
- The pull request lacks a linked issue, approval evidence, or named review owner
- Changed files cross an unacknowledged ownership boundary

Request `lifecycle:changes-requested` for reparable findings or `lifecycle:blocked` for missing authority or evidence. Do not request `lifecycle:reviewed` in the same run.

## Recovery

The implementation owner pushes a bounded correction, which retriggers review. Plan drift returns to planning for a revised plan and fresh approval. Only the named human reviewer may approve; repository rules determine merge eligibility.
