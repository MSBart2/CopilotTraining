<!-- Reference implementation for Module 3, Exercise 3.3: Variable-Driven Prompts -->
<!-- This example demonstrates: File-based variables for automatic path generation -->

---

name: test-file
description: 'Generate test file for current source file'
agent: 'agent'
tools: ['codebase']
argument-hint: 'Open source file, then run /test-file'

---

Generate a comprehensive test file for ${file} following FanHub testing standards.

## Auto-Generated Test File Metadata

**Source file:** ${fileBasename}  
**Test file name:** ${fileBasenameNoExtension}.test${fileExtname}  
**Source directory:** ${fileDirname}  
**Workspace:** ${workspaceFolder}

**Detected file type:**

- If path contains `frontend/src/pages/` → Page component test
- If path contains `frontend/src/components/` → Component test
- If path contains `backend/src/routes/` → API endpoint test
- If path contains `backend/src/database/` → Database query test
- If path contains `backend/src/middleware/` → Middleware test

## Test File Generation Rules

### 1. Test File Path Determination

Mirror source structure in `__tests__/` folder:

**Frontend**:

```
Source: frontend/src/pages/CharacterDetail.jsx
Test:   frontend/__tests__/pages/CharacterDetail.test.jsx
```

**Backend**:

```
Source: backend/src/routes/characters.js
Test:   backend/__tests__/routes/characters.test.js
```

### 2. Import Path Calculation

Automatically compute relative import from test to source:

```javascript
// For frontend/__tests__/pages/CharacterDetail.test.jsx
import CharacterDetail from "../../src/pages/CharacterDetail";

// For backend/__tests__/routes/characters.test.js
const charactersRouter = require("../../src/routes/characters");
```

### 3. Test Structure by File Type

#### Page Component Tests (frontend/src/pages/)

```javascript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ${fileBasenameNoExtension} from '../../src/pages/${fileBasename}';
import * as api from '../../src/services/api';

jest.mock('../../src/services/api');

describe('${fileBasenameNoExtension}', () => {
  // Loading state test
  // Success state test
  // Error state test
  // Edge cases (empty data, missing fields)
});
```

#### Reusable Component Tests (frontend/src/components/)

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ${fileBasenameNoExtension} from '../../src/components/${fileBasename}';

describe('${fileBasenameNoExtension}', () => {
  // Render with props test
  // User interaction test
  // Conditional rendering test
  // Edge cases
});
```

#### API Route Tests (backend/src/routes/)

```javascript
const request = require("supertest");
const app = require("../../src/app");
const queries = require("../../src/database/queries");

jest.mock("../../src/database/queries");

describe("${fileBasenameNoExtension} routes", () => {
  // Success case (200)
  // Not found (404)
  // Bad request (400)
  // Server error (500)
  // Edge cases
});
```

#### Database Query Tests (backend/src/database/)

```javascript
const db = require("../../src/database/connection");
const queries = require("../../src/database/queries");

describe("${fileBasenameNoExtension} queries", () => {
  // Valid input test
  // Invalid input test
  // Empty result test
  // SQL injection prevention test
});
```

## Test Content Requirements

### 1. Mock Setup

Identify external dependencies in ${file} and create appropriate mocks:

**API calls** → Mock `fetch` or axios
**Database queries** → Mock query functions
**Environment variables** → Mock `process.env`
**File system** → Mock `fs` module
**External services** → Mock service clients

### 2. Test Data

Generate realistic FanHub test data:

**Characters**:

```javascript
const mockCharacter = {
  id: 1,
  name: "Walter White",
  actor: "Bryan Cranston",
  biography: "High school chemistry teacher",
  show_id: 1,
  show_title: "Breaking Bad",
};
```

**Episodes**:

```javascript
const mockEpisode = {
  id: 1,
  title: "Pilot",
  season_number: 1,
  episode_number: 1,
  show_id: 1,
};
```

### 3. Coverage Requirements

Ensure tests cover:

**Functional testing**:

- All exported functions
- All API endpoints
- All component props/states
- All user interactions

**Edge cases**:

- Null/undefined inputs
- Empty arrays/objects
- Invalid types
- Boundary values
- Concurrent operations

**Error scenarios**:

- Network failures
- Database errors
- Invalid inputs
- Timeout handling
- Authorization failures

### 4. FanHub Testing Standards

Follow team conventions from [.github/copilot-instructions.md](../../../../../.github/copilot-instructions.md):

- **Framework**: Jest
- **Assertions**: Specific matchers (`toBe`, `toEqual`, `toThrow`)
- **Naming**: Descriptive test names explaining scenario
- **Structure**: `describe` for grouping, `it` for individual tests
- **Setup/teardown**: `beforeEach`/`afterEach` for isolation
- **Async**: `async/await` with `waitFor` for async operations

## Output Format

### Test File Content

Provide complete, ready-to-run test file:

```javascript
// Full test file with:
// - All necessary imports
// - Mock setup
// - Test data
// - Comprehensive test cases
// - Proper cleanup
```

### Test File Location

```
Save to: [exact path for the new file]
```

### Coverage Summary

```
✅ Functions tested: [count]
✅ Endpoints tested: [count]
✅ Edge cases covered: [count]
📊 Estimated coverage: [percentage]%
```

### Missing Coverage

```
⚠️ Manual testing needed for:
- [Scenario that's hard to test automatically]
- [External dependency without mock]
```

### Run Instructions

```bash
# Run this test file
cd ${workspaceFolder}
npm test -- ${fileBasenameNoExtension}.test

# Run with coverage
npm test -- --coverage ${fileBasenameNoExtension}.test
```

## Additional Context

- Analyze ${file} code to understand what needs testing
- Review existing test files in `__tests__/` for patterns
- Use same mock data structure as other tests
- Follow same assertion style as existing tests
- Include all necessary jest configuration
