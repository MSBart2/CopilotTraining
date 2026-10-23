# Exercise 1.3: Path-Specific Instructions

## 🔨 Exercise

### Exercise 1.3: Path-Specific Instructions — "Right Guidance, Right Layer"

**Lead:** Sarah ⭐ | **Support:** David 🤝 | **Time:** 10 min

#### 📖 The Challenge

It's 1:15 PM. Sarah is reviewing a frontend component and Copilot keeps suggesting backend patterns: database queries in UI components, Express middleware patterns in React hooks, API error handling where she needs user-facing messages. She spends 3 minutes per file correcting these context mismatches. With 15 frontend files per sprint, that's 45 minutes wasted on suggestions that don't belong.

David has the opposite problem in backend files—Copilot suggests React state management in API routes, JSX syntax in Express controllers, and component lifecycle methods where he needs database transactions.

The issue: `.github/copilot-instructions.md` applies to *everything*. It can't distinguish between UI layer and API layer. Sarah and David need instructions that activate based on architectural boundaries.

Sarah realizes: *"We need path-specific guidance that automatically applies based on where we're working. Frontend files see only frontend patterns. Backend files see only backend patterns."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Copilot suggests backend patterns (database queries, Express middleware) in React components. Sarah spends 3 minutes per file correcting context mismatches, explaining "this is UI code, not API code." 15 frontend files per sprint = 45 minutes wasted. | Frontend files automatically apply `frontend.instructions.md` with React patterns. Backend files automatically apply `backend.instructions.md` with API patterns. 0 context mismatches, 0 minutes correcting layer violations. |
| **Context mismatches:** 5 per file<br>**Correction time:** 3 min/file<br>**Files per sprint:** 15<br>**Total waste:** 45 min/sprint | **Context mismatches:** 0<br>**Correction time:** 0 min/file<br>**Files per sprint:** 15<br>**Total waste:** 0 min/sprint |

**Time saved:** 45 minutes/sprint × 26 sprints/year = **19.5 hours/year** per developer

#### 🎯 Your Goal

Create path-specific instruction files that automatically apply React patterns to frontend code and API patterns to backend code, eliminating cross-layer context pollution.

#### 📋 Steps

1. **Create the instructions directory**

   Create `.github/instructions/` to store path-based instruction files:

   ```bash
   mkdir -p .github/instructions
   ```

   This separates path-based instructions (`.instructions.md`) from repository-wide defaults (`copilot-instructions.md`) and invokable functions (`prompts/*.prompt.md`).

2. **Create frontend-specific instructions**

   Create `.github/instructions/frontend.instructions.md`:

   ```markdown
   ---
   name: frontend-ui-patterns
   description: 'React component patterns and UI-specific conventions'
   applyTo: 'frontend/**'
   ---

   # Frontend UI Development Standards

   You are working in the **UI layer**. Apply frontend-specific patterns:

   ## Component Architecture
   - **Functional components only** — No class components, use hooks
   - **Component-per-file** — One component per file, named exports
   - **Props with TypeScript** — Define interface above component

   ## State Management
   - **Local state:** `useState` for component-specific state
   - **Server state:** React Query for API data fetching
   - **Global state:** Context API only for truly global concerns (theme, auth)
   - **Never:** Direct database access, Express patterns, or SQL in components

   ## Data Flow
   - **API calls:** Use centralized `services/` layer (e.g., `characterService.js`)
   - **Error handling:** User-facing messages ("Failed to load characters"), not technical errors
   - **Validation:** Client-side validation for UX, never trust as security boundary

   ## UI-Specific Patterns
   - **Accessibility:** Every interactive element needs `aria-label`, use semantic HTML
   - **Performance:** Memoize with `useMemo`/`useCallback`, lazy load with `React.lazy`
   - **Styling:** Use CSS modules or styled-components, no inline styles

   **Do NOT suggest:**
   - ❌ Database queries (`db.query`, `mongoose.find`)
   - ❌ Express middleware (`req`, `res`, `next`)
   - ❌ Server-side authentication logic
   - ❌ Direct environment variable access (use config service)
   ```

   **Key element:** `applyTo: 'frontend/**'` means this only activates when editing files under `frontend/` directory.

3. **Create backend-specific instructions**

   Create `.github/instructions/backend.instructions.md`:

   ```markdown
   ---
   name: backend-api-patterns
   description: 'REST API conventions and backend-specific patterns'
   applyTo: 'backend/**'
   ---

   # Backend API Development Standards

   You are working in the **API layer**. Apply backend-specific patterns:

   ## API Structure
   - **RESTful routes** — Use standard HTTP methods (GET, POST, PUT, DELETE)
   - **Route-per-file** — Organize routes by resource (`characters.js`, `episodes.js`)
   - **Controller pattern** — Handlers in `routes/`, business logic in `services/`

   ## Error Handling
   - **HTTP status codes:** 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
   - **Error responses:** Consistent format `{ error: "message", code: "ERROR_CODE" }`
   - **Logging:** Log all errors with context (user ID, request ID, stack trace)

   ## Data Layer
   - **Database queries:** Use parameterized queries to prevent SQL injection
   - **Transactions:** Wrap multi-step operations in database transactions
   - **Validation:** Validate all inputs, never trust client data

   ## Security
   - **Authentication:** Verify JWT tokens in middleware for protected routes
   - **Authorization:** Check user permissions before data access
   - **Input sanitization:** Escape user inputs, validate types and formats
   - **Secrets:** Load from environment variables, never hardcode

   **Do NOT suggest:**
   - ❌ React hooks (`useState`, `useEffect`, `useContext`)
   - ❌ JSX syntax or component patterns
   - ❌ Browser APIs (`localStorage`, `fetch` for CORS)
   - ❌ UI state management libraries
   ```

   **Key element:** `applyTo: 'backend/**'` means this only activates when editing files under `backend/` directory.

4. **Test layer-specific activation**

   a) **Open a frontend file:**

   Open `frontend/src/components/CharacterCard.js` and ask in Copilot Chat:

   ```
   What's the best way to fetch character data in this component?
   ```

   **Expected response:** Mentions React Query, services layer, user-facing error handling. **Does NOT mention** database queries, Express routes, or server patterns.

   Check References section in chat response—look for `frontend.instructions.md` was applied.

   b) **Open a backend file:**

   Open `backend/src/routes/characters.js` and ask:

   ```
   How do I implement this GET endpoint?
   ```

   **Expected response:** Mentions RESTful patterns, database queries, parameterized SQL, HTTP status codes. **Does NOT mention** React hooks, components, or JSX.

   Check References section—look for `backend.instructions.md` was applied.

5. **Verify layered context**

   Edit a frontend file and examine the context Copilot is using:

   - ✅ `.github/copilot-instructions.md` — General standards (TypeScript, testing)
   - ✅ `.github/instructions/frontend.instructions.md` — UI-specific patterns
   - ❌ `.github/instructions/backend.instructions.md` — NOT applied (wrong layer)

   Then edit a backend file:

   - ✅ `.github/copilot-instructions.md` — General standards
   - ✅ `.github/instructions/backend.instructions.md` — API-specific patterns
   - ❌ `.github/instructions/frontend.instructions.md` — NOT applied (wrong layer)

   **This is conditional context:** Instructions activate automatically based on file path. No manual selection, no global noise.

#### ✅ Success Criteria

- [ ] `.github/instructions/frontend.instructions.md` created with `applyTo: 'frontend/**'` pattern
- [ ] `.github/instructions/backend.instructions.md` created with `applyTo: 'backend/**'` pattern
- [ ] Opening frontend files applies frontend patterns (check References in chat response)
- [ ] Opening backend files applies backend patterns (check References in chat response)
- [ ] Frontend suggestions no longer include database queries or Express middleware
- [ ] Backend suggestions no longer include React hooks or JSX syntax

> 📂 **Compare Your Work**:
> - [`frontend.instructions.md`](../examples/completed-config/.github/instructions/frontend.instructions.md)
> - [`backend.instructions.md`](../examples/completed-config/.github/instructions/backend.instructions.md)

#### 📚 Official Docs

- [Custom Instructions - applyTo Patterns](https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_instructions-file-format) — How to use glob patterns to target specific files
- [Path-Specific Instructions Tutorial](https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions/your-first-custom-instructions) — GitHub's guide to creating conditional instructions

---

## 🔗 What You Built

**In this exercise:**
- `.github/instructions/frontend.instructions.md` — React-specific patterns that activate only in UI layer
- `.github/instructions/backend.instructions.md` — API-specific patterns that activate only in server layer

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| Module 1: copilot-instructions.md (repository-wide) | Path-specific instructions (conditional) | General standards + context-specific patterns = comprehensive guidance without noise |
| Module 1: ARCHITECTURE.md documents layers | Instructions enforce layer boundaries automatically | Architecture documented once, enforced through path-based patterns |
| Module 3: Prompt files for specific tasks | Instructions for ongoing context | Functions for tasks (/test-suite) + automatic context (layer patterns) = complete guidance system |

**Why this matters:** Sarah was spending 45 minutes per sprint correcting context mismatches—backend patterns leaking into UI code. Now frontend files automatically get frontend-only context, backend files get backend-only context. **Zero context pollution, zero correction time.** Architectural boundaries enforced automatically through file paths.

---

## ➡️ Next Up

**[Exercise 1.4: Language-Specific Standards](exercise-1.4.md)** — Extend conditional instructions beyond architectural layers to language-specific conventions—Python, JavaScript, TypeScript each get their own standards.

> *"The layer separation is brilliant, but we write Python, JavaScript, and TypeScript. Each language has different style guides that we want applied automatically based on file extension."*
> — Elena, about to create language-specific instructions

---
