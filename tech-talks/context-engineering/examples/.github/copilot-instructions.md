# Orders API Context

Owner: Orders API maintainers
Reviewer: Orders API code owner
Review trigger: Any change to response contracts, validation, or required checks

## Scope

Apply these instructions to work on `src/orders/**` and `tests/orders/**`.

## Response Contract

- Return domain outcomes as `Result<T, OrderError>`.
- Map domain errors to HTTP responses only in the route adapter.
- Preserve the existing public response schema unless the API owner approves a contract change.

## Required Evidence

- Run `npm test -- orders` after changing order behavior.
- Run `npm run typecheck` after changing TypeScript contracts.
- Report the commands run, their exit status, and any remaining uncertainty.

## Data Boundary

- Never place credentials, tokens, customer records, or production payloads in prompts, memory, instructions, fixtures, or logs.
- Use synthetic order IDs and redacted diagnostic output in examples.
