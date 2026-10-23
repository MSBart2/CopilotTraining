---
applyTo: "**/*.test.{js,ts,jsx,tsx}"
---

# Testing Standards for FanHub

> **Note**: This is a sample custom instructions file that Copilot will automatically include when working with test files.

When generating or modifying test files, follow these standards.

## Test Structure

- Use `describe` blocks to group related tests by feature/function
- Use `it` for individual test cases (not `test`)
- Follow pattern: `it('[expected behavior] when [condition]')` (e.g., `it('shows error when not found')`)
- One assertion focus per test (related assertions OK)

## Test Categories

Every function/component must have tests for:

1. **Happy path** — Normal successful operation
2. **Edge cases** — Boundary conditions, empty inputs, max values
3. **Error handling** — Invalid inputs, failures, exceptions
4. **Integration points** — Mocked external dependencies

## FanHub-Specific Test Patterns

For character/episode/show data:

- Test with complete data AND partial data (missing optional fields)
- Test empty arrays (character with no episodes, show with no quotes)
- Test loading states and error states
- Test "not found" scenarios (404 responses)

## Mocking Standards

- Mock external dependencies (APIs, databases), not internal modules
- Use `jest.mock()` at module level for consistent mocking
- Reset mocks in `beforeEach` to prevent test pollution
- Prefer `jest.spyOn()` when you need to verify calls

```javascript
// ✅ Good - mock external dependency at module level
jest.mock("axios");
import axios from "axios";

beforeEach(() => {
  jest.clearAllMocks();
});

// ❌ Bad - inconsistent inline mocking
it("fetches data", () => {
  jest.mock("axios"); // Don't mock inside tests
});
```

## Assertion Patterns

```javascript
// ✅ Test behavior, not implementation
it("displays character episodes when data loads", async () => {
  axios.get.mockResolvedValue({ data: mockCharacterWithEpisodes });
  render(<CharacterDetail id="1" />);

  await waitFor(() => {
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
  });
});

// ❌ Don't test implementation details
it("calls fetchCharacter once", async () => {
  await getCharacter(1);
  expect(fetchCharacter).toHaveBeenCalledTimes(1); // Brittle!
});
```

## Error Testing (Required for FanHub)

```javascript
// Always test error scenarios for data-fetching components
it("shows error message when character not found", async () => {
  axios.get.mockRejectedValue({ response: { status: 404 } });
  render(<CharacterDetail id="999" />);

  await waitFor(() => {
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});

it("shows error message when network fails", async () => {
  axios.get.mockRejectedValue(new Error("Network error"));
  render(<CharacterDetail id="1" />);

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Test Data

- Use factories or fixtures for complex test data
- Create mock data that matches FanHub's data structure
- Avoid magic numbers—use named constants
- Each test sets up its own data (no shared mutable state)

## Coverage Expectations

- Aim for meaningful coverage, not 100%
- Cover all public API methods
- Cover all error branches
- Skip testing trivial getters/setters
