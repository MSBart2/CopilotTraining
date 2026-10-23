<!-- Reference implementation for Module 3, Exercise 3.1: Creating Your First Prompt File -->
<!-- This example demonstrates: Reusable prompt with YAML frontmatter and ${file} variable -->

---

name: test-suite
description: 'Generate comprehensive test suite following team standards'
agent: 'agent'
tools: ['codebase']

---

Generate a comprehensive test suite for ${file} following our testing standards in [.github/copilot-instructions.md](../../../../../.github/copilot-instructions.md).

## Requirements

### Unit Tests

- Test all public functions with valid inputs
- Test return values and side effects
- Mock external dependencies (APIs, databases, file system)
- Use descriptive test names that explain the scenario

### Integration Tests

- Test API endpoints with request/response validation
- Test database operations with test fixtures
- Test error middleware and error handling paths
- Verify HTTP status codes and response formats

### Edge Cases

- **Empty inputs**: null, undefined, empty strings, empty arrays
- **Invalid inputs**: Wrong types, out-of-range values, malformed data
- **Concurrent operations**: Race conditions, parallel requests
- **Timeouts**: Network delays, slow database queries
- **Error conditions**: Network failures, database connection loss

### Framework & Style

- **Framework**: Jest for all tests
- **Naming pattern**: `describe` blocks for components/functions, `it` blocks for specific behaviors
- **Assertions**: Use specific matchers (`toBe`, `toEqual`, `toThrow`, `toHaveBeenCalledWith`)
- **Setup/teardown**: Use `beforeEach`/`afterEach` for test isolation
- **Async patterns**: Use `async/await` with proper error handling

### FanHub-Specific Patterns

- Mock TV show data with realistic examples (Breaking Bad, The Office, etc.)
- Mock character objects with name, actor, show_id, biography fields
- Mock episode data with season/episode numbers and titles
- Test error responses match our standard format: `{ success: false, error: string }`

## Analysis Steps

1. Examine ${file} to identify:
   - All exported functions
   - All API endpoints (if route file)
   - All React components (if frontend)
   - All database queries (if database file)

2. Review existing test files in the workspace to learn:
   - Test file naming conventions
   - Mock data structure and patterns
   - Test organization and grouping
   - Common test utilities

3. Generate test file that:
   - Covers all identified test scenarios
   - Follows discovered patterns
   - Includes comprehensive edge case coverage
   - Uses team-specific mock data

## Output Format

Provide:

1. **Test file path** — Where to save the test (e.g., `__tests__/routes/characters.test.js`)
2. **Complete test code** — Ready to run with all imports, mocks, and assertions
3. **Coverage summary** — List of what's tested and estimated coverage percentage
4. **Missing coverage** — Scenarios that may need manual attention

Example test structure:

```javascript
const request = require("supertest");
const app = require("../../src/app");

describe("CharacterRoutes", () => {
  describe("GET /api/characters/:id", () => {
    it("returns character details for valid ID", async () => {
      // Test implementation
    });

    it("returns 404 for non-existent character", async () => {
      // Test implementation
    });

    it("handles database errors gracefully", async () => {
      // Test implementation
    });
  });
});
```
