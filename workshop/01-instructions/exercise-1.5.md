# Exercise 1.5: File-Type Specialized Guidance

## 🔨 Exercise

### Exercise 1.5: File-Type Specialized Guidance — "Right Rules, Right Purpose"

**Lead:** Marcus ⭐ | **Support:** Elena 🤝, David 🤝 | **Time:** 12 min

#### 📖 The Challenge

It's 2:15 PM. The team has layer-specific instructions (frontend/backend) and language-specific standards (Python/JS/TS), but they still have context mismatches:

**Marcus** edits `Dockerfile` and Copilot suggests application code patterns instead of container best practices—missing multi-stage builds, insecure base images, no health checks. He spends 8 minutes per Dockerfile correcting container-specific issues.

**Elena** writes test files and needs different conventions than production code: descriptive test names, mocking patterns, edge case focus, assertion-specific syntax. But production code instructions leak into tests—encouraging DRY when tests need to be explicit, suggesting optimization when tests prioritize readability. She spends 10 minutes per test file refactoring to match testing conventions.

**David** writes documentation in `docs/**/*.md` files that needs stakeholder-friendly language, but Copilot suggests technical jargon appropriate for code comments. He spends 12 minutes per doc file making it business-audience appropriate.

The issue: instructions target layers and languages, but not **file purposes**. Test files, config files, documentation, and infrastructure code each need specialized guidance beyond just "what language" or "what layer."

Marcus realizes: *"We need file-type-specific instructions. Test files focus on clarity and edge cases. Docker files enforce container security. Documentation targets business stakeholders. Each file type has its own purpose."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Test files get production code patterns (DRY, optimization, abstraction). Elena spends 10 minutes per test file refactoring to testing conventions. Docker files miss container best practices. Docs use technical jargon. | Test files automatically apply testing-specific conventions (descriptive names, explicit assertions, edge cases). Docker files enforce container security. Docs target business audience. 0 file-purpose mismatches. |
| **Test refactoring:** 10 min/file × 12 files/sprint = 120 min<br>**Docker issues:** 8 min/file × 2 files/sprint = 16 min<br>**Doc rewrites:** 12 min/file × 3 files/sprint = 36 min<br>**Total:** 172 min/sprint | **Test refactoring:** 0 min<br>**Docker issues:** 0 min<br>**Doc rewrites:** 0 min<br>**Total:** 0 min/sprint |

**Time saved:** 172 minutes/sprint = **2.9 hours/sprint** = **75 hours/year** across the team

#### 🎯 Your Goal

Create file-type-specific instruction files for tests, Docker configs, and documentation that automatically apply specialized guidance based on file patterns, ensuring each file type follows its purpose-driven conventions.

#### 📋 Steps

1. **Create testing-specific instructions**

   Create `.github/instructions/tests.instructions.md`:

   ```text
   ---
   name: testing-conventions
   description: 'Testing best practices and assertion patterns'
   applyTo: '**/{__tests__,tests,test}/**'
   ---

   # Testing Standards

   You are writing **test code**. Testing conventions differ from production code:

   ## Test Naming
   - **Descriptive names:** Tests read like specifications
     test('returns 404 when character does not exist')
     test('creates character with valid data and returns 201')
     test('rejects character creation when name exceeds 100 characters')
   - **Pattern:** `test('does ... when ...')`  or  `test('returns ... given ...')`

   ## Test Structure (Arrange-Act-Assert)
     test('example test', async () => {
       // Arrange: Set up test data and mocks
       const mockCharacter = { id: 1, name: 'Test' };
       mockDb.findById.mockResolvedValue(mockCharacter);

       // Act: Execute the function under test
       const result = await getCharacter(1);

       // Assert: Verify expected behavior
       expect(result).toEqual(mockCharacter);
       expect(mockDb.findById).toHaveBeenCalledWith(1);
     });

   ## Testing Priorities
   - **Clarity over DRY:** Tests are explicit and readable, even if repetitive
   - **Edge cases are critical:** Empty arrays, null values, boundary conditions, concurrent operations
   - **Isolation:** Each test is independent, no shared state
   - **Fast execution:** Mock external dependencies (databases, APIs, file system)

   ## Mock Patterns
   - **Mock external services:** Database, APIs, file system, timers
   - **Spy on internal functions:** Verify they were called with correct arguments
   - **Stub return values:** Control what dependencies return
     jest.mock('../services/characterService');
     characterService.getCharacter.mockResolvedValue({ id: 1, name: 'Test' });

   ## Assertion Best Practices
   - **Specific matchers:** `toBe()` for primitives, `toEqual()` for objects, `toThrow()` for errors
   - **Negative cases:** Test error conditions explicitly
   - **Multiple assertions:** One test can have multiple assertions if testing same scenario

   ## Edge Cases to Always Test
   - Empty inputs (empty array, empty string, null, undefined)
   - Boundary values (0, -1, maximum allowed value)
   - Concurrent operations (race conditions, simultaneous requests)
   - Network failures (timeouts, connection errors)
   - Invalid data (malformed JSON, wrong types, SQL injection attempts)

   **Do NOT suggest in tests:**
   - ❌ Complex abstractions (keep tests simple)
   - ❌ Production-style DRY (repetition aids clarity)
   - ❌ Performance optimization (focus on correctness)
   - ❌ Real database/API calls (use mocks)
   ```

   **Key element:** `applyTo: '**/{__tests__,tests,test}/**'` matches files in any directory named `__tests__`, `tests`, or `test`.

2. **Create Docker-specific instructions**

   Create `.github/instructions/docker.instructions.md`:

   ```text
   ---
   name: docker-container-standards
   description: 'Docker and containerization best practices'
   applyTo: '**/{Dockerfile,Dockerfile.*,docker-compose.yml,docker-compose.*.yml}'
   ---

   # Docker Container Standards

   You are writing **container configuration**. Apply containerization best practices:

   ## Dockerfile Best Practices

   ### Multi-Stage Builds
     # Stage 1: Build
     FROM node:18-alpine AS builder
     WORKDIR /app
     COPY package*.json ./
     RUN npm ci --only=production
     COPY . .
     RUN npm run build

     # Stage 2: Runtime
     FROM node:18-alpine
     WORKDIR /app
     COPY --from=builder /app/dist ./dist
     COPY --from=builder /app/node_modules ./node_modules
     CMD ["node", "dist/index.js"]

   ### Security
   - **Non-root user:** Always run as non-root user
     RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
     USER nodejs
   - **Minimal base images:** Use Alpine Linux when possible (`node:18-alpine` not `node:18`)
   - **No secrets in images:** Use environment variables, not hardcoded secrets
   - **Scan for vulnerabilities:** Include image scanning in CI/CD

   ### Optimization
   - **Layer caching:** Copy `package.json` before source code
   - **`.dockerignore`:** Exclude `node_modules`, `.git`, `tests`
   - **Combine RUN commands:** Reduce layers
     RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

   ## docker-compose.yml Best Practices

   ### Service Definition
     services:
       backend:
         build: ./backend
         ports:
           - "3000:3000"
         environment:
           - NODE_ENV=production
         healthcheck:
           test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
           interval: 30s
           timeout: 3s
           retries: 3
         restart: unless-stopped

   ### Required Elements
   - **Health checks:** Define for all services
   - **Restart policy:** Use `unless-stopped` for production
   - **Resource limits:** Set memory and CPU limits
   - **Named volumes:** For persistent data
   - **Networks:** Isolate services appropriately

   **Do NOT suggest:**
   - ❌ Running containers as root
   - ❌ Large base images (prefer Alpine)
   - ❌ Hardcoded secrets in Dockerfiles
   - ❌ Missing health checks in compose files
   ```

3. **Create documentation-specific instructions**

   Create `.github/instructions/docs.instructions.md`:

   ```text
   ---
   name: documentation-style
   description: 'User-facing documentation writing standards'
   applyTo: '**/docs/**/*.md'
   ---

   # Documentation Writing Standards

   You are writing **user-facing documentation**. Target business stakeholders and developers:

   ## Writing Style
   - **Audience-first:** Assume reader is unfamiliar with implementation details
   - **Active voice:** "Click the button" not "The button is to be clicked"
   - **Present tense:** "The system validates" not "The system will validate"
   - **Concise:** Use short sentences and paragraphs

   ## Structure
   - **Start with why:** Explain purpose before details
   - **Examples first:** Show code/screenshots before explaining
   - **Progressive disclosure:** Simple concepts first, advanced topics later
   - **Scannable:** Use headings, lists, and callouts

   ## Content Guidelines

   ### Business Value
   Every feature explains:
   - **What** it does (one sentence)
   - **Why** it matters (business benefit)
   - **How** to use it (step-by-step with examples)

   ### Code Examples
   - **Complete and runnable:** Don't use pseudo-code or "..."
   - **Annotated:** Add comments explaining non-obvious parts
   - **Real data:** Use realistic example data, not foo/bar

   ### Avoid
   - ❌ Jargon without definition ("idempotent", "eventual consistency")
   - ❌ Implementation details unless necessary
   - ❌ Passive voice and future tense
   - ❌ Assumptions about reader's knowledge

   ## Formatting
   - **Code blocks:** Always specify language for syntax highlighting
     // Good
     const result = await fetchData();
   - **Callouts:** Use for warnings, tips, notes
     > ⚠️ **Warning:** This will delete all data permanently
     > 💡 **Tip:** Use keyboard shortcuts for faster navigation

   - **Links:** Use descriptive text, not "click here"

   **Do NOT suggest:**
   - ❌ Technical jargon without business context
   - ❌ Implementation details (class names, function signatures) unless teaching API usage
   - ❌ Incomplete code examples
   - ❌ Assuming reader knowledge of system internals
   ```

4. **Test file-type-specific activation**

   a) **Test file context:**

   Create or open `backend/src/routes/__tests__/characters.test.js` and ask:

   ```
   Write tests for the GET /characters/:id endpoint
   ```

   **Expected:** Descriptive test names, Arrange-Act-Assert structure, edge cases (not found, invalid ID), mocking patterns. No production abstractions or DRY patterns.

   b) **Docker file context:**

   Open `backend/Dockerfile` and ask:

   ```
   Optimize this Dockerfile for production
   ```

   **Expected:** Multi-stage builds, Alpine base image, non-root user, layer optimization. No application-code patterns.

   c) **Documentation context:**

   Open `docs/ARCHITECTURE.md` and ask:

   ```
   Explain how the character detail feature works
   ```

   **Expected:** Business-focused language, examples first, scannable structure. No technical jargon without context.

5. **Verify complex file matching**

   The test instructions use a complex glob pattern: `**/{__tests__,tests,test}/**`

   This matches files in directories named:
   - `__tests__/` (Jest convention)
   - `tests/` (generic)
   - `test/` (singular)

   Test that it works:
   - Create `backend/src/__tests__/example.test.js` → Applies test conventions
   - Create `backend/tests/integration.test.js` → Applies test conventions
   - Create `backend/src/routes/characters.js` → Test conventions stay out

   **Glob patterns are powerful for targeting file structures.**

#### ✅ Success Criteria

- [ ] `.github/instructions/tests.instructions.md` created with testing conventions
- [ ] `.github/instructions/docker.instructions.md` created with container best practices
- [ ] `.github/instructions/docs.instructions.md` created with documentation style guide
- [ ] Test files automatically use descriptive naming, Arrange-Act-Assert, and focus on edge cases
- [ ] Docker files automatically suggest multi-stage builds, Alpine images, and non-root users
- [ ] Documentation files automatically use business-focused language and examples-first structure
- [ ] Production code does NOT receive testing-specific or Docker-specific guidance

> 📂 **Compare Your Work**:
> - [`tests.instructions.md`](../examples/completed-config/.github/instructions/tests.instructions.md)
> - [`docker.instructions.md`](../examples/completed-config/.github/instructions/docker.instructions.md)
> - [`docs.instructions.md`](../examples/completed-config/.github/instructions/docs.instructions.md)

#### 📚 Official Docs

- [Glob Pattern Syntax](https://code.visualstudio.com/docs/editor/glob-patterns) — Advanced pattern matching including `{option1,option2}` for multiple names
- [Custom Instructions FAQ](https://code.visualstudio.com/docs/copilot/customization/custom-instructions#_frequently-asked-questions) — Troubleshooting applyTo patterns

---

## 🔗 What You Built

**In this exercise:**
- `.github/instructions/tests.instructions.md` — Testing conventions for files in test directories
- `.github/instructions/docker.instructions.md` — Container best practices for Dockerfile and docker-compose files
- `.github/instructions/docs.instructions.md` — Writing style guide for documentation in docs folders

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| Exercise 1.3: Path-specific (frontend/backend) | File-type-specific (tests/Docker/docs) | Architectural layers + file purposes = precision contextual targeting |
| Exercise 1.4: Language-specific (Python/JS/TS) | File-type overrides language defaults | Python test files get both Python style AND testing conventions |
| Module 1: Repository-wide baseline | Layer + Language + File-type all combine | Four-level guidance system: baseline → layer → language → file type |

**Complete instruction hierarchy:**

Editing `backend/src/routes/__tests__/characters.test.js`:
1. ✅ `.github/copilot-instructions.md` — Repository-wide baseline (general standards)
2. ✅ `.github/instructions/backend.instructions.md` — API layer patterns
3. ✅ `.github/instructions/javascript.instructions.md` — JavaScript style (camelCase, async/await)
4. ✅ `.github/instructions/tests.instructions.md` — Testing conventions (descriptive names, edge cases)

**Result:** Backend + JavaScript + Testing conventions = perfectly contextualized guidance.

**Why this matters:** Marcus was spending 172 minutes per sprint fixing file-purpose mismatches. Now test files automatically focus on clarity and edge cases (not DRY optimization). Docker files enforce container security (not application patterns). Docs target stakeholders (not developers). **Every file type gets purpose-appropriate guidance, automatically.**

---

## ➡️ Next Module

**[Module 4: Agent Skills](../04-agent-skills/README.md)** — You've layered comprehensive context through instructions (what to do) and prompts (how to invoke tasks). Next: give Copilot new capabilities through agent skills—custom tools and functions that extend what agents can do beyond built-in features.

> *"We've got incredible context now—layer-specific, language-specific, file-type-specific. But Copilot can't validate against our custom API schema or check our deployment requirements. Can we teach it new capabilities?"*
> — David, about to discover agent skills

---
