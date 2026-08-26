# Repository Instructions

This repository uses TypeScript with strict type checking enabled.

## Build and Test

- Always run `npm install` before building
- Build: `npm run build`
- Tests are in `__tests__/` directories co-located with source files
- Use Vitest — never Mocha or Jest
- Run tests: `npm test`
- Required: tests must pass before committing

## Coding Standards

When suggesting code changes:

- Prefer functional programming patterns
- Use explicit return types for all functions
- Add JSDoc comments for exported functions
- Use named exports (avoid default exports)
- Follow ESLint config in `.eslintrc.json`

## File Structure

```
src/
  components/       # React components
  utils/           # Utility functions
  services/        # API clients
  __tests__/       # Tests co-located with source
```

## Error Handling

- Use custom error classes that extend Error
- Always include error context in messages
- Log errors with structured logging (use logger.error())
- Never swallow errors silently
