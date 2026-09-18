---
applyTo: "src/auth/**"
---

# Authentication code

- Preserve deny-by-default authentication and existing authorization checks.
- Use fixtures or mocks instead of credentials, customer data, production keys, or `.env` contents.
- Explain the behavior change and identify affected trust boundaries.
- Test successful authentication, missing and invalid credentials, timeouts, and downstream failure.
- Run `npm test -- --runInBand test/auth` and `npm run lint`.
- Route changes under `src/auth/policy/` to the authentication service owner.