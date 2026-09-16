# PR Trust Record

## Advisory findings

| Finding | Disposition | Evidence | Owner |
|---|---|---|---|
| Missing authorization check | Accepted | Added policy test `denies_cross_tenant_read` | PR author |
| Cache invalidation race | Rejected | Cache key is request-scoped; see ADR-014 | Service owner |

## Blocking signals

| Signal | State | Remediation |
|---|---|---|
| Coverage threshold | Blocked | Add branch test or request documented override |

## Residual risk

- Domain reviewer: @payments-owner
- Security escalation required: no
- Override used: no
- Decision: accept for merge
- Rationale: deterministic checks pass and domain behavior matches ADR-014