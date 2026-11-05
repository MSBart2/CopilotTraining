# Coding Contract

## Inputs

- Triggering issue and exact `/approve-plan` comment
- Commenter's repository association and the repository's plan-approval policy
- Latest Phase 2 plan preceding the approval comment
- Versioned repository instructions, source, tests, and validation commands

## Required Decision

First verify authority and plan freshness. Then implement only the approved scope, preserving repository conventions and collecting validation evidence.

## Success Output

Create one draft pull request containing:

```markdown
<!-- lifecycle:phase=coding result=pass -->
## Approved plan
- Issue: #123
- Approved by: @handle
- Approval comment: URL

## Implementation
- Plan steps completed
- Files changed and rationale
- Explicit deviations: none or listed with reason

## Verification
- Command: exact command
- Result: pass/fail plus concise output
- Missing checks: none or named
- Coding completed: ISO-8601 timestamp

## Review owner
- CODEOWNER, team, or named reviewer
```

The pull request remains draft and receives `lifecycle:in-review` through the constrained output handler.

## Stop Conditions

- Approval is not exact, is stale, or comes from an unauthorized actor
- The plan is missing, ambiguous, or superseded
- Implementation requires files, services, secrets, or authority outside the plan
- A required deterministic check fails and cannot be repaired within scope
- No meaningful repository change results

Request `lifecycle:needs-input` for plan clarification or `lifecycle:blocked` for environment, authority, or validation failure. Post the failed command or missing prerequisite. Never weaken tests, rulesets, or security controls to continue.

## Recovery

Planning publishes a revised plan when scope changes. The named implementation owner can retry only after a new explicit approval. Review owns all subsequent change requests on the draft pull request.
