---
applyTo: "**/routes/**"
---

# API Route Standards for FanHub

> **Note**: This is a sample custom instructions file that Copilot will automatically include when working with API route files.

When generating or modifying files under `routes/`, follow RESTful conventions.

## Route Structure

```javascript
// Express route pattern
router.get('/:id', authenticate, validate(schema), asyncHandler(controller));
```

Every route has:
1. HTTP method matching the operation (GET=read, POST=create, PUT=replace, PATCH=update, DELETE=remove)
2. Authentication middleware where required
3. Input validation middleware
4. Async error handling wrapper

## HTTP Status Codes

Use appropriate status codes:

| Scenario | Code | Response |
|----------|------|----------|
| Success (with data) | 200 | `{ data: ... }` |
| Created | 201 | `{ data: ..., id: ... }` |
| No Content | 204 | (empty) |
| Bad Request | 400 | `{ error: 'Validation failed', details: [...] }` |
| Unauthorized | 401 | `{ error: 'Authentication required' }` |
| Forbidden | 403 | `{ error: 'Insufficient permissions' }` |
| Not Found | 404 | `{ error: 'Resource not found' }` |
| Conflict | 409 | `{ error: 'Resource already exists' }` |
| Server Error | 500 | `{ error: 'Internal server error' }` |

## Response Format (FanHub Standard)

Always use consistent response structure:

```javascript
// Success
res.status(200).json({
  success: true,
  data: result,
  meta: { count, page, totalPages }  // for lists
});

// Error
res.status(404).json({
  success: false,
  error: 'Quote not found',
  code: 'NOT_FOUND'
});
```

## FanHub-Specific Patterns

For character/episode/show/quote endpoints:
- Always return 404 (not empty object) when resource not found
- Include related data IDs for client-side linking
- Support `?include=character` style query params for embedded data

```javascript
// Quote of the Day example
router.get('/random', asyncHandler(async (req, res) => {
  const quote = await db.getRandomQuote();
  if (!quote) {
    return res.status(404).json({
      success: false,
      error: 'No quotes available',
      code: 'NOT_FOUND'
    });
  }
  res.json({
    success: true,
    data: {
      ...quote,
      characterId: quote.character_id,  // For linking to character
      showId: quote.show_id  // For linking to show
    }
  });
}));
```

## Input Validation

Validate all inputs before processing:

```javascript
// Validate ID parameters
router.get('/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id < 1) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      code: 'VALIDATION_ERROR'
    });
  }
  // ... continue with valid ID
}));
```

## Error Handling

Use async wrapper and custom errors:

```javascript
// asyncHandler catches async errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Custom errors for specific cases
throw new NotFoundError('Quote not found');
throw new ValidationError('Invalid quote ID format');
```

## Documentation

Include JSDoc comments for API routes:

```javascript
/**
 * Get random quote (Quote of the Day)
 * @route GET /api/quotes/random
 * @returns {Object} Random quote with character and show info
 * @throws {NotFoundError} No quotes available
 */
```
