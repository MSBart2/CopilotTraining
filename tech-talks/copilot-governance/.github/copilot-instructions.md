# Repository development guide

## Runtime and structure

- Use Node.js 22 and the committed npm lockfile.
- Application code lives in `src/`; tests live in `test/`.
- Keep changes scoped to the requested behavior and preserve existing public APIs unless the request requires a contract change.

## Validation

- Run focused tests for the changed area.
- Run `npm run lint` before opening a pull request.
- For broader changes, run the full `npm test` suite.
- Report the commands run, their outcomes, and any unresolved findings.

## Authority

- Prepare changes for review through a pull request.
- Treat CODEOWNERS and repository rulesets as the source of truth for required approval and merge authority.
