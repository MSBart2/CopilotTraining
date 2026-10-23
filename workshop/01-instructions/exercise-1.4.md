# Exercise 1.4: Language-Specific Standards

## 🔨 Exercise

### Exercise 1.4: Language-Specific Standards — "Right Style, Right Language"

**Lead:** Elena ⭐ | **Support:** Marcus 🤝 | **Time:** 8 min

#### 📖 The Challenge

It's 1:45 PM. Elena is writing Python test utilities and Copilot suggests JavaScript patterns: camelCase naming instead of snake_case, missing type hints, JavaScript-style error handling with try/catch instead of Python's context managers. She spends 5 minutes per Python file fixing style violations.

Marcus has the opposite problem—his JavaScript infrastructure scripts get Python-style snake_case suggestions, missing semicolons, and improper async/await patterns. Every language has its own conventions, but Copilot mixes them together.

The team uses multiple languages:
- **Python** — Backend utilities, test frameworks, data processing
- **JavaScript** — Node.js services, build scripts, frontend logic (pre-transpile)
- **TypeScript** — Frontend components, type-safe services

Each language has established style guides (PEP 8, Airbnb, TypeScript strict), but `.github/copilot-instructions.md` can't differentiate between them.

Elena realizes: *"We need language-specific instructions that activate based on file extension. Python files follow PEP 8 automatically. JavaScript follows Airbnb. TypeScript enforces strict types."*

#### 🔄 The Transformation

| Before ❌ | After ✨ |
|-----------|----------|
| Python files get JavaScript patterns (camelCase, missing type hints, improper error handling). Elena spends 5 minutes per file fixing style violations. 8 Python files per sprint = 40 minutes fixing language-specific issues. | Python files automatically apply `python.instructions.md` with PEP 8 standards. JavaScript applies Airbnb style. TypeScript enforces strict types. 0 cross-language contamination. |
| **Style violations:** 8 per file<br>**Fix time:** 5 min/file<br>**Files per sprint:** 8 Python files<br>**Total waste:** 40 min/sprint | **Style violations:** 0<br>**Fix time:** 0 min/file<br>**Convention consistency:** 100%<br>**Total waste:** 0 min/sprint |

**Time saved:** 40 minutes/sprint × 26 sprints/year = **17.3 hours/year** of style fixing eliminated

#### 🎯 Your Goal

Create language-specific instruction files that automatically apply Python, JavaScript, and TypeScript conventions based on file extension, ensuring 100% style consistency without manual correction.

#### 📋 Steps

1. **Create Python-specific instructions**

   Create `.github/instructions/python.instructions.md`:

   ```text
   ---
   name: python-standards
   description: 'PEP 8 style guide and Python best practices'
   applyTo: '**/*.py'
   ---

   # Python Development Standards (PEP 8)

   You are writing **Python code**. Follow Python-specific conventions:

   ## Naming Conventions
   - **Variables and functions:** `snake_case` (e.g., `user_count`, `get_character_by_id`)
   - **Classes:** `PascalCase` (e.g., `CharacterService`, `DatabaseConnection`)
   - **Constants:** `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`, `DEFAULT_TIMEOUT`)
   - **Private:** Prefix with single underscore (e.g., `_internal_method`)

   ## Type Hints (Required)
   - **Function signatures:** Always include type hints
     def get_character(character_id: int) -> Optional[Character]:
         pass
   - **Variable annotations:** For complex types
     characters: List[Character] = []

   ## Error Handling
   - **Context managers:** Use `with` statements for resource management
     with open('data.txt', 'r') as f:
         content = f.read()
   - **Specific exceptions:** Catch specific exceptions, not bare `except:`
   - **EAFP:** "Easier to Ask Forgiveness than Permission" — use try/except, not if/else for existence checks

   ## Code Style
   - **Indentation:** 4 spaces (no tabs)
   - **Line length:** Max 88 characters (Black formatter standard)
   - **Imports:** Standard library, third-party, local — each group separated by blank line
   - **Docstrings:** Use triple quotes for function documentation

   ## Testing (pytest)
   - **Test naming:** `test_<function>_<scenario>` (e.g., `test_get_character_not_found`)
   - **Fixtures:** Use pytest fixtures for setup
   - **Assertions:** Use `assert` statements, not unittest methods

   **Do NOT suggest:**
   - ❌ camelCase (use snake_case)
   - ❌ Semicolons at line end
   - ❌ JavaScript-style try/catch without context managers
   - ❌ Function declarations without type hints
   ```

   **Key element:** `applyTo: '**/*.py'` matches all Python files anywhere in the workspace.

2. **Create JavaScript-specific instructions**

   Create `.github/instructions/javascript.instructions.md`:

   ```text
   ---
   name: javascript-standards
   description: 'Airbnb JavaScript style guide'
   applyTo: '**/*.{js,jsx}'
   ---

   # JavaScript Development Standards (Airbnb Style)

   You are writing **JavaScript code**. Follow JavaScript-specific conventions:

   ## Naming Conventions
   - **Variables and functions:** `camelCase` (e.g., `userCount`, `getCharacterById`)
   - **Classes and components:** `PascalCase` (e.g., `CharacterService`, `UserProfile`)
   - **Constants:** `SCREAMING_SNAKE_CASE` (e.g., `MAX_RETRIES`, `API_BASE_URL`)
   - **Private:** Prefix with underscore (e.g., `_internalMethod`)

   ## Modern JavaScript
   - **Variable declarations:** Use `const` by default, `let` when reassignment needed, never `var`
   - **Arrow functions:** Prefer arrow functions for callbacks and non-method functions
   - **Template literals:** Use backticks for string interpolation
     const message = `Hello, ${userName}`;
   - **Destructuring:** Use object and array destructuring
     const { id, name } = character;

   ## Async Patterns
   - **Promises:** Use `async/await` syntax, not raw `.then()` chains
   - **Error handling:** Always use try/catch with async/await
     async function getCharacter(id) {
       try {
         const data = await fetch(`/api/characters/${id}`);
         return data;
       } catch (error) {
         console.error('Failed to fetch character:', error);
         throw error;
       }
     }

   ## Code Style
   - **Semicolons:** Always use semicolons
   - **Quotes:** Single quotes for strings, double quotes for JSX attributes
   - **Trailing commas:** Use trailing commas in multi-line objects/arrays
   - **Line length:** Max 100 characters

   **Do NOT suggest:**
   - ❌ snake_case (use camelCase)
   - ❌ Python-style context managers (`with` statements)
   - ❌ Type hints (use JSDoc comments or TypeScript instead)
   - ❌ Python-style decorators
   ```

3. **Create TypeScript-specific instructions**

   Create `.github/instructions/typescript.instructions.md`:

   ```text
   ---
   name: typescript-standards
   description: 'TypeScript strict mode and type safety guidelines'
   applyTo: '**/*.{ts,tsx}'
   ---

   # TypeScript Development Standards (Strict Mode)

   You are writing **TypeScript code**. Enforce strict type safety:

   ## Type Safety
   - **Explicit types:** Define interfaces for all objects
     interface Character {
       id: number;
       name: string;
       species: string;
     }
   - **No `any`:** Never use `any` — use `unknown` if type is truly unknown, then narrow with type guards
   - **Return types:** Explicitly declare function return types
     function getCharacter(id: number): Promise<Character | null> {
       // ...
     }
   - **Null safety:** Use `Optional<T>`, `| null`, or `| undefined` explicitly

   ## Naming (same as JavaScript)
   - **Variables and functions:** `camelCase`
   - **Interfaces and types:** `PascalCase` (prefix interfaces with `I` only for disambiguation)
   - **Type aliases:** `PascalCase`
   - **Enums:** `PascalCase` for enum name, `SCREAMING_SNAKE_CASE` for values

   ## Advanced Types
   - **Union types:** Use when value can be multiple types
     type Status = 'loading' | 'success' | 'error';
   - **Generics:** Use for reusable type-safe functions
     function getData<T>(key: string): Promise<T> { ... }
   - **Type guards:** Use for runtime type narrowing
     function isCharacter(obj: unknown): obj is Character {
       return typeof obj === 'object' && obj !== null && 'id' in obj;
     }

   ## React with TypeScript
   - **Component props:** Always define interface for props
     interface CharacterCardProps {
       character: Character;
       onSelect: (id: number) => void;
     }
   - **Event handlers:** Use React event types
     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { ... }

   **Do NOT suggest:**
   - ❌ `any` type (use proper types or `unknown`)
   - ❌ Missing return type annotations
   - ❌ Non-null assertions (`!`) without justification
   - ❌ Type casting with `as` when type guards would work
   ```

   **Key element:** `applyTo: '**/*.{ts,tsx}'` matches both `.ts` and `.tsx` files.

4. **Test language-specific activation**

   a) **Open a Python file:**

   Open `backend/src/database/connection.py` (or create a test `.py` file) and ask:

   ```
   Write a function to connect to the database
   ```

   **Expected:** snake_case naming, type hints, context managers, PEP 8 style. No camelCase or JavaScript patterns.

   b) **Open a JavaScript file:**

   Open `backend/src/index.js` and ask:

   ```
   Write a function to fetch user data
   ```

   **Expected:** camelCase naming, async/await, semicolons, Airbnb style. No snake_case or Python patterns.

   c) **Open a TypeScript file:**

   Open `frontend/src/services/characterService.ts` and ask:

   ```
   Write a function to fetch character by ID
   ```

   **Expected:** Explicit interfaces, return types, no `any`, strict type safety. camelCase naming like JavaScript.

5. **Verify multi-layered context**

   Open `frontend/src/components/CharacterCard.tsx` (TypeScript + Frontend):

   - ✅ `.github/copilot-instructions.md` — General standards
   - ✅ `.github/instructions/frontend.instructions.md` — React patterns (from Exercise 1.3)
   - ✅ `.github/instructions/typescript.instructions.md` — Type safety rules

   Ask Copilot to generate a component. Look for:
   - React hooks (frontend context)
   - Interface for props (TypeScript context)
   - camelCase naming (TypeScript context)
   - No database queries (frontend context excludes backend patterns)

   **This is layered conditional context:** Multiple `.instructions.md` files combine based on file characteristics.

#### ✅ Success Criteria

- [ ] `.github/instructions/python.instructions.md` created with PEP 8 standards
- [ ] `.github/instructions/javascript.instructions.md` created with Airbnb style guide
- [ ] `.github/instructions/typescript.instructions.md` created with strict type safety rules
- [ ] Python files use snake_case, type hints, and context managers automatically
- [ ] JavaScript files use camelCase, async/await, and semicolons automatically
- [ ] TypeScript files enforce interfaces, explicit types, and no `any` automatically
- [ ] Frontend TypeScript files combine both frontend patterns AND TypeScript patterns

> 📂 **Compare Your Work**:
> - [`python.instructions.md`](../examples/completed-config/.github/instructions/python.instructions.md)
> - [`javascript.instructions.md`](../examples/completed-config/.github/instructions/javascript.instructions.md)
> - [`typescript.instructions.md`](../examples/completed-config/.github/instructions/typescript.instructions.md)

#### 📚 Official Docs

- [Glob Patterns in VS Code](https://code.visualstudio.com/docs/editor/glob-patterns) — Understanding pattern syntax like `**/*.{ts,tsx}` for multiple extensions
- [Custom Instructions Examples](https://github.com/github/awesome-copilot/blob/main/docs/README.instructions.md) — Community-contributed language-specific instructions

---

## 🔗 What You Built

**In this exercise:**
- `.github/instructions/python.instructions.md` — PEP 8 standards that activate for all `.py` files
- `.github/instructions/javascript.instructions.md` — Airbnb style that activates for `.js` and `.jsx` files
- `.github/instructions/typescript.instructions.md` — Strict type safety that activates for `.ts` and `.tsx` files

**How it compounds:**

| Previous Modules | This Exercise | Combined Power |
|------------------|---------------|----------------|
| Exercise 1.3: Path-specific (frontend/backend) | Language-specific (Python/JS/TS) | Architecture layers + language conventions = precise contextual guidance |
| Module 1: Repository-wide standards | Language standards per file extension | General standards + language-specific rules = 100% convention consistency |
| Module 3: Task-specific prompt functions | Language-aware automatic context | Functions for tasks + language context = comprehensive development environment |

**Why this matters:** Elena was spending 40 minutes per sprint fixing language-specific style violations—camelCase in Python, snake_case in JavaScript. Now each language automatically gets its own style guide. **100% convention consistency, zero manual style fixes.** Python looks like Python. JavaScript looks like JavaScript. TypeScript enforces strict types. All automatic.

---

## ➡️ Next Up

**[Exercise 1.5: File-Type Specialized Guidance](exercise-1.5.md)** — Beyond layers and languages, target specific file types: tests need different rules than source code, Docker files need container patterns, docs need writing style.

> *"We've got layers and languages covered, but test files need completely different guidance than production code. Same with Docker files, documentation, and config files. Can we target by file type too?"*
> — Marcus, about to create file-type-specific instructions

---
