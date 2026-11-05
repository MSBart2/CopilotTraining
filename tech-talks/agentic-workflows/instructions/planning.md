# Planning Contract

## Inputs

- Triggering issue and `lifecycle:triaged` label event
- Phase 1 intake evidence comment
- Versioned repository instructions and build, test, and lint commands
- Relevant source files, tests, ownership rules, and similar merged pull requests

## Required Decision

Produce a bounded implementation plan that another actor can execute without inventing scope. Separate observed repository facts from assumptions and unresolved questions.

## Success Output

Post one comment with this structure:

```markdown
<!-- lifecycle:phase=planning result=awaiting-approval -->
## Lifecycle plan
### Intended outcome
### In scope / out of scope
### Files and ownership
### Ordered implementation steps
### Validation commands and expected signals
### Risks, rollback, and unresolved assumptions
### Evidence inspected
### Planning completed: ISO-8601 timestamp
### Approval
Named plan approver: @handle or team
Comment exactly `/approve-plan` to authorize this plan.
```

Then request `lifecycle:planned`. The label means “plan available,” not “plan approved.”

## Stop Conditions

- Acceptance criteria conflict or remain materially incomplete
- No repository-supported validation command exists
- The change crosses repositories or ownership boundaries not represented in the issue
- Rollback is unsafe or requires production authority
- A required dependency, credential, or environment is unavailable

Request `lifecycle:needs-input` for clarifiable gaps or `lifecycle:blocked` for authority and safety boundaries. Name the plan approver or platform owner who can recover the work.

## Recovery

Publish a new complete plan after context changes. Only the latest Phase 2 plan preceding `/approve-plan` is executable.
