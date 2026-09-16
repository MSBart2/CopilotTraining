---
applyTo: "src/payments/**/*.ts"
---

# Orders API Context

- Return domain outcomes as `Result<T, OrderError>`.
- Map domain errors to HTTP responses only in the route adapter.
- Preserve the public response schema unless the API owner approves a change.