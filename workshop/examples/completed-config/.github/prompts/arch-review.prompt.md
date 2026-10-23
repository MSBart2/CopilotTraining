<!-- Reference implementation for Module 3, Exercise 3.2: Referencing Standards and Docs -->
<!-- This example demonstrates: Architecture validation prompt that references ARCHITECTURE.md -->

---

name: arch-review
description: 'Validate code against architecture patterns'
agent: 'ask'
tools: ['codebase']

---

Review ${file} for compliance with our architecture patterns documented in [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).

## Architecture Pattern Validation

### Layer Separation

Verify code follows the three-tier architecture:

**Frontend Layer** (`frontend/`):

- Components only handle UI rendering
- No direct database access
- API calls go through `services/api.js`
- No business logic in components (belongs in services or backend)

**Backend Layer** (`backend/`):

- Routes define endpoints only (delegate to controllers/services)
- Business logic in service layer or controllers
- Database queries in dedicated `database/` folder
- No frontend concerns in backend code

**Database Layer** (`backend/src/database/`):

- All SQL queries centralized here
- No raw SQL in route handlers
- Parameterized queries (prevent SQL injection)
- Connection pooling and transaction management

### Folder Structure Compliance

Check file location matches documented structure:

**Frontend**:

```
frontend/
├── src/
│   ├── pages/          # Route-level components (HomePage, CharacterDetail)
│   ├── components/     # Reusable UI (CharacterCard, EpisodeList, Header)
│   ├── services/       # API client (api.js, auth.js)
│   └── styles/         # Global styles
└── __tests__/          # Test files mirror src/ structure
```

**Backend**:

```
backend/
├── src/
│   ├── routes/         # Express route definitions
│   ├── middleware/     # Auth, validation, error handling
│   ├── database/       # Queries, schema, migrations
│   └── utils/          # Helpers, formatters
└── __tests__/          # Test files mirror src/ structure
```

### Data Flow Validation

Verify request flow matches architecture:

**Correct flow**:

```
User Action → Frontend Component → API Service → Backend Route →
Controller/Service → Database Query → Response
```

**Common violations to check**:

- Frontend component making direct database calls ❌
- Backend routes containing business logic ❌ (belongs in service layer)
- Frontend components with complex business logic ❌ (belongs in backend)
- Hardcoded data instead of API calls ❌

### Technology Stack Compliance

Ensure file uses documented technologies:

**Frontend**:

- React 18 (functional components, hooks)
- React Router for navigation
- CSS Modules for styling
- No jQuery, no class components

**Backend**:

- Node.js + Express
- PostgreSQL for database (not SQLite, not MongoDB)
- JWT for authentication (if applicable)
- Standard error middleware

**Testing**:

- Jest for all tests
- React Testing Library for frontend
- Supertest for API tests

### API Design Standards

For backend route files, verify REST conventions:

**Endpoint naming**:

- Plural nouns: `/api/characters`, `/api/episodes`
- Resource IDs in path: `/api/characters/:id`
- No verbs in URLs (use HTTP methods)

**HTTP methods**:

- GET for reading
- POST for creating
- PUT/PATCH for updating
- DELETE for removing

**Response format**:

```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "Error message" }
```

**Status codes**:

- 200 for success
- 201 for created
- 400 for bad request
- 404 for not found
- 500 for server error

### Error Handling Patterns

Check proper error handling:

**Backend**:

- Try/catch around async operations
- Errors passed to `next(error)` middleware
- No `throw` in route handlers (use `next()`)
- Custom error classes (NotFoundError, ValidationError)

**Frontend**:

- Try/catch around API calls
- Error boundaries for component crashes
- User-friendly error messages
- Loading and error states in UI

## Review Output Format

### 1. ✅ Architecture Compliance

```
Met: Proper layer separation, folder structure, error handling
Violated: Contains business logic in route handler; it belongs in service layer
```

### 2. 📂 File Location Issues

```
Current: frontend/src/components/pages/HomePage.js
Expected: frontend/src/pages/HomePage.jsx
Reason: Page components belong in pages/, not components/
```

### 3. 🔄 Data Flow Issues

```
Line 45-67: Component makes direct database query
  Violation: Frontend bypassing API layer
  Fix: Move query to backend route, call via api.js service

Line 102: Business logic in route handler
  Violation: Route handler skips delegating to service
  Fix: Extract logic to service function, call from route
```

### 4. 🛠️ Technology Stack Issues

```
Line 12: Importing jQuery
  Violation: Not in documented tech stack
  Fix: Use React state and refs for DOM manipulation

Line 34: Using MongoDB query syntax
  Violation: Project uses PostgreSQL
  Fix: Rewrite using SQL parameterized query
```

### 5. 🚨 Priority & Impact

- **Critical**: Security issues, wrong database, layer violations that break architecture
- **High**: File location errors, incorrect patterns
- **Medium**: Style inconsistencies, minor deviations
- **Low**: Optimization opportunities

### 6. 🎯 Recommended Actions

Provide step-by-step fixes:

1. Move file from X to Y
2. Extract business logic to service/function
3. Update imports and tests
4. Verify integration still works

## Cross-Reference Validation

Compare against similar files in codebase:

- Find similar components/routes that follow correct patterns
- Highlight differences between current file and good examples
- Reference specific files as patterns: "See `backend/src/routes/shows.js` for correct pattern"
