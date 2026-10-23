<!-- Reference implementation for Module 3, Exercise 3.2: Referencing Standards and Docs -->
<!-- This example demonstrates: Documentation-linked prompt that references copilot-instructions.md -->

---

name: react-review
description: 'Review React component against team standards'
agent: 'ask'

---

Review the React component in ${file} against our coding standards documented in [.github/copilot-instructions.md](../../../../../.github/copilot-instructions.md).

## Standards Validation

### React Component Standards

Check compliance with documented React patterns:

**Component Structure**:

- Uses functional components (not class components)
- Proper hooks usage (useState, useEffect, custom hooks)
- Props destructuring in component signature
- No direct DOM manipulation (React handles rendering)

**TypeScript/PropTypes**:

- All props have type definitions
- All state variables have type definitions
- Return type specified for component functions
- No `any` types (use specific types or unions)

**Error Handling**:

- Error boundaries implemented for user-facing components
- Try/catch blocks around async operations
- Graceful error UI states (not just console.error)
- Error messages are user-friendly, not technical

**Accessibility**:

- Semantic HTML elements (button, nav, main, section)
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Alt text for images

**Performance**:

- Memoization for expensive computations (useMemo)
- Callback memoization (useCallback) for child props
- Lazy loading for large components
- Avoiding unnecessary re-renders

### Architecture Compliance

Verify component follows [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md) patterns:

**File Location**:

- Page components in `frontend/src/pages/`
- Reusable components in `frontend/src/components/`
- Matches naming conventions (PascalCase for files)

**State Management**:

- Local state for UI-only data
- Fetch from API for server data (not hardcoded)
- Uses centralized API service layer (`frontend/src/services/api.js`)

**Styling**:

- CSS Modules for scoped styles
- Consistent class naming conventions
- No inline styles for complex styling
- Responsive design patterns

## Review Output Format

Provide a structured review with four sections:

### 1. ✅ Compliance Summary

List which standards are met and which are violated:

```
Met: Functional component, hooks usage, TypeScript types
Violated: Missing error boundary, no ARIA labels, not memoized
```

### 2. ❌ Specific Issues

For each violation, provide:

- Line number where issue occurs
- Exact problem description
- Which standard is violated (reference copilot-instructions.md section)

Example:

```
Line 47: <div> → <section> for semantic HTML
  Standard: Accessibility > Semantic HTML

Line 82: onClick handler missing aria-label
  Standard: Accessibility > ARIA labels

Component: Not wrapped in error boundary
  Standard: Error Handling > Error boundaries for user-facing components
```

### 3. 🔧 Fix Recommendations

Provide specific code changes to fix issues:

- Show before/after code snippets
- Explain why the fix improves code quality
- Reference patterns from existing components

Example:

```javascript
// Before (Line 47):
<div className={styles.container}>

// After:
<section className={styles.container} aria-label="Character details">
```

### 4. 🚨 Priority Assessment

Classify issues by priority:

- **Critical** (blocks merge): Missing error handling, accessibility violations, security issues
- **High** (fix before merge): Performance issues, type safety gaps
- **Medium** (nice to have): Style consistency, minor optimizations
- **Low** (optional): Future enhancements, alternative approaches

## FanHub-Specific Checks

- TV show/character/episode data fetched from API (not hardcoded)
- Error states for "not found" scenarios (404 responses)
- Loading states during data fetching
- Consistent with other FanHub page layouts and styling
