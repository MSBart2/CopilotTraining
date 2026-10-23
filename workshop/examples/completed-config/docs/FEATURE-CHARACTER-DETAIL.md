<!-- Reference implementation for Module 2, Exercise 2.1 & 2.2: Plan Mode -->
<!-- This example demonstrates: AI-generated implementation plan with validation refinements -->

# Implementation Plan: Character Detail Page

**Generated:** Plan Agent Analysis  
**Status:** Validated & Ready for Implementation  
**Estimated Effort:** 3-4 hours (senior developer)

---

## Summary

This plan implements a comprehensive Character Detail page feature for FanHub that displays character information, episode appearances, and memorable quotes. The implementation follows a layered approach: database → backend API → frontend component → testing.

**Key architectural decisions:**

- Use existing database schema with new query for character details
- Follow REST API patterns from `/api/shows` endpoints
- Implement React functional component with hooks for data fetching
- Add Redis caching (5-minute TTL) to reduce database load
- Include comprehensive error handling for 404 and network failures

**Why this approach:**

- Consistent with ARCHITECTURE.md structure (database → routes → controllers → frontend)
- Follows copilot-instructions.md patterns (async/await, functional components, error middleware)
- Reuses existing patterns from shows feature to minimize new code
- Implements caching early to prevent performance issues at scale

---

## Implementation Steps

### Step 1: Database Query Layer

**File:** `backend/src/database/queries.js`

**Objective:** Create database query to fetch comprehensive character information

**Implementation:**

```javascript
// Add to existing queries.js
async getCharacterById(characterId) {
  const query = `
    SELECT
      c.id,
      c.name,
      c.actor,
      c.biography,
      c.image_url,
      c.show_id,
      s.title as show_title,
      COUNT(DISTINCT ce.episode_id) as episode_count,
      json_agg(DISTINCT jsonb_build_object(
        'id', e.id,
        'title', e.title,
        'season', e.season_number,
        'episode', e.episode_number
      )) as episodes,
      json_agg(DISTINCT jsonb_build_object(
        'id', q.id,
        'text', q.quote_text,
        'episode_id', q.episode_id
      )) as quotes
    FROM characters c
    INNER JOIN shows s ON c.show_id = s.id
    LEFT JOIN character_episodes ce ON c.id = ce.character_id
    LEFT JOIN episodes e ON ce.episode_id = e.id
    LEFT JOIN quotes q ON c.id = q.character_id
    WHERE c.id = $1
    GROUP BY c.id, s.title
  `;

  const result = await this.pool.query(query, [characterId]);
  return result.rows[0];
}
```

**Success criteria:**

- [ ] Query returns all character data in single database round trip (no N+1 queries)
- [ ] Uses parameterized query to prevent SQL injection ($1 placeholder)
- [ ] Returns null if character doesn't exist (handled by backend layer)
- [ ] Aggregates episodes and quotes efficiently with json_agg

**Dependencies:** None (uses existing database schema)

---

### Step 2: Backend API Endpoint

**File:** `backend/src/routes/characters.js`

**Objective:** Create REST API endpoint for character detail with error handling and caching

**Implementation:**

```javascript
const express = require("express");
const router = express.Router();
const queries = require("../database/queries");
const cache = require("../middleware/cache");
const { NotFoundError } = require("../middleware/errorHandler");

// GET /api/characters/:id - Fetch character details
router.get("/:id", cache.get(300), async (req, res, next) => {
  try {
    const characterId = parseInt(req.params.id, 10);

    // Validate ID format
    if (isNaN(characterId) || characterId < 1) {
      throw new NotFoundError(`Character with ID ${req.params.id} not found`);
    }

    const character = await queries.getCharacterById(characterId);

    if (!character) {
      throw new NotFoundError(`Character with ID ${characterId} not found`);
    }

    // Cache the response
    cache.set(req.url, character, 300); // 5 minutes TTL

    res.json({
      success: true,
      data: character,
    });
  } catch (error) {
    next(error); // Pass to error handler middleware
  }
});

module.exports = router;
```

**Success criteria:**

- [ ] Endpoint follows existing API pattern (success/data wrapper)
- [ ] Returns 404 with standard error format for invalid/missing characters
- [ ] Uses async/await (per copilot-instructions.md)
- [ ] Validates input (prevents invalid IDs from hitting database)
- [ ] Implements caching with 5-minute TTL
- [ ] Delegates error handling to middleware (consistent with other routes)

**Dependencies:** Step 1 (requires getCharacterById query)

---

### Step 3: Backend Route Registration

**File:** `backend/src/app.js`

**Objective:** Register character routes with Express app

**Implementation:**

```javascript
// Add with other route imports
const charactersRouter = require("./routes/characters");

// Add with other route registrations
app.use("/api/characters", charactersRouter);
```

**Success criteria:**

- [ ] Routes accessible at `/api/characters/:id`
- [ ] Maintains consistent URL structure with other API endpoints

**Dependencies:** Step 2 (requires characters router)

---

### Step 4: Frontend Component - Character Detail

**File:** `frontend/src/pages/CharacterDetail.jsx`

**Objective:** Create React component to display character information

**Implementation:**

```jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCharacterById } from "../services/api";
import styles from "./CharacterDetail.module.css";

function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacter() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (err) {
        if (err.status === 404) {
          setError("Character not found");
        } else {
          setError("Failed to load character details. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadCharacter();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading character details...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>{error}</h2>
        <button onClick={() => navigate("/characters")}>
          Back to Characters
        </button>
      </div>
    );
  }

  if (!character) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {character.image_url && (
          <img
            src={character.image_url}
            alt={character.name}
            className={styles.image}
          />
        )}
        <div className={styles.info}>
          <h1>{character.name}</h1>
          <p className={styles.actor}>Played by {character.actor}</p>
          <Link to={`/shows/${character.show_id}`} className={styles.showLink}>
            {character.show_title}
          </Link>
        </div>
      </div>

      <section className={styles.biography}>
        <h2>Biography</h2>
        <p>{character.biography || "No biography available."}</p>
      </section>

      <section className={styles.episodes}>
        <h2>Episode Appearances ({character.episode_count})</h2>
        {character.episodes && character.episodes.length > 0 ? (
          <ul>
            {character.episodes.map((episode) => (
              <li key={episode.id}>
                <Link to={`/episodes/${episode.id}`}>
                  S{episode.season}E{episode.episode} - {episode.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No episode information available.</p>
        )}
      </section>

      <section className={styles.quotes}>
        <h2>Memorable Quotes</h2>
        {character.quotes && character.quotes.length > 0 ? (
          <div className={styles.quoteList}>
            {character.quotes.map((quote) => (
              <blockquote key={quote.id} className={styles.quote}>
                "{quote.text}"
              </blockquote>
            ))}
          </div>
        ) : (
          <p>No quotes available.</p>
        )}
      </section>
    </div>
  );
}

export default CharacterDetail;
```

**Success criteria:**

- [ ] Uses functional component with hooks (per copilot-instructions.md)
- [ ] Destructures props and hooks at component signature
- [ ] Implements loading state during data fetch
- [ ] Implements error state for 404 and network failures
- [ ] Shows "No X available" for missing data (edge case handling)
- [ ] Uses CSS modules for scoped styling (consistent with other components)
- [ ] Includes accessible image alt text
- [ ] Links back to show and episodes for navigation

**Dependencies:** Step 5 (requires API service function)

---

### Step 5: Frontend API Service

**File:** `frontend/src/services/api.js`

**Objective:** Add API client function for character detail endpoint

**Implementation:**

```javascript
// Add to existing api.js
export async function fetchCharacterById(characterId) {
  const response = await fetch(`${API_BASE_URL}/characters/${characterId}`);

  if (!response.ok) {
    const error = new Error("Failed to fetch character");
    error.status = response.status;
    throw error;
  }

  const result = await response.json();
  return result.data;
}
```

**Success criteria:**

- [ ] Uses async/await pattern (per copilot-instructions.md)
- [ ] Throws error with status code for error handling in component
- [ ] Extracts data from standard API response format (success/data wrapper)
- [ ] Uses existing API_BASE_URL constant

**Dependencies:** Step 2 (requires backend endpoint)

---

### Step 6: Frontend Routing

**File:** `frontend/src/App.jsx`

**Objective:** Add route for character detail page

**Implementation:**

```jsx
import CharacterDetail from "./pages/CharacterDetail";

// Add to existing Route configuration
<Route path="/characters/:id" element={<CharacterDetail />} />;
```

**Success criteria:**

- [ ] Route uses dynamic :id parameter
- [ ] Follows existing routing patterns
- [ ] Accessible at `/characters/{id}` path

**Dependencies:** Step 4 (requires CharacterDetail component)

---

### Step 7: Backend Tests

**File:** `backend/__tests__/routes/characters.test.js`

**Objective:** Test API endpoint with success, error, and edge cases

**Implementation:**

```javascript
const request = require("supertest");
const app = require("../../src/app");
const queries = require("../../src/database/queries");

jest.mock("../../src/database/queries");

describe("GET /api/characters/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns character details for valid ID", async () => {
    const mockCharacter = {
      id: 1,
      name: "Walter White",
      actor: "Bryan Cranston",
      biography: "High school chemistry teacher turned drug lord",
      show_title: "Breaking Bad",
      episode_count: 62,
      episodes: [{ id: 1, title: "Pilot", season: 1, episode: 1 }],
      quotes: [{ id: 1, text: "I am the one who knocks" }],
    };

    queries.getCharacterById.mockResolvedValue(mockCharacter);

    const response = await request(app).get("/api/characters/1");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockCharacter);
    expect(queries.getCharacterById).toHaveBeenCalledWith(1);
  });

  test("returns 404 for non-existent character", async () => {
    queries.getCharacterById.mockResolvedValue(null);

    const response = await request(app).get("/api/characters/999");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain("not found");
  });

  test("returns 404 for invalid character ID format", async () => {
    const response = await request(app).get("/api/characters/invalid");

    expect(response.status).toBe(404);
    // Skips the database call for invalid input
    expect(queries.getCharacterById).not.toHaveBeenCalled();
  });

  test("handles database errors gracefully", async () => {
    queries.getCharacterById.mockRejectedValue(
      new Error("Database connection failed"),
    );

    const response = await request(app).get("/api/characters/1");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
```

**Success criteria:**

- [ ] Tests success case (200 response with character data)
- [ ] Tests 404 for non-existent character
- [ ] Tests 404 for invalid ID format (prevents database call)
- [ ] Tests database error handling (500 response)
- [ ] Mocks database queries (no actual database calls in tests)
- [ ] Uses Jest patterns from copilot-instructions.md

**Dependencies:** Step 2 (requires API endpoint)

---

### Step 8: Frontend Tests

**File:** `frontend/__tests__/pages/CharacterDetail.test.jsx`

**Objective:** Test component rendering, loading, error, and data display states

**Implementation:**

```javascript
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CharacterDetail from "../../src/pages/CharacterDetail";
import * as api from "../../src/services/api";

jest.mock("../../src/services/api");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
  useNavigate: () => jest.fn(),
}));

describe("CharacterDetail", () => {
  const mockCharacter = {
    id: 1,
    name: "Walter White",
    actor: "Bryan Cranston",
    biography: "High school chemistry teacher",
    show_title: "Breaking Bad",
    show_id: 1,
    episode_count: 62,
    episodes: [{ id: 1, title: "Pilot", season: 1, episode: 1 }],
    quotes: [{ id: 1, text: "I am the one who knocks" }],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    api.fetchCharacterById.mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays character details after loading", async () => {
    api.fetchCharacterById.mockResolvedValue(mockCharacter);

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Walter White")).toBeInTheDocument();
    });

    expect(screen.getByText(/Played by Bryan Cranston/i)).toBeInTheDocument();
    expect(screen.getByText(/Breaking Bad/i)).toBeInTheDocument();
    expect(
      screen.getByText(/High school chemistry teacher/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Episode Appearances \(62\)/i)).toBeInTheDocument();
  });

  test("displays error message for failed fetch", async () => {
    api.fetchCharacterById.mockRejectedValue(new Error("Network error"));

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });

  test("displays 404 message for non-existent character", async () => {
    const error = new Error("Not found");
    error.status = 404;
    api.fetchCharacterById.mockRejectedValue(error);

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/character not found/i)).toBeInTheDocument();
    });
  });

  test("handles empty biography gracefully", async () => {
    const characterWithoutBio = { ...mockCharacter, biography: null };
    api.fetchCharacterById.mockResolvedValue(characterWithoutBio);

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/no biography available/i)).toBeInTheDocument();
    });
  });

  test("handles character with no episodes", async () => {
    const characterWithoutEpisodes = { ...mockCharacter, episodes: [] };
    api.fetchCharacterById.mockResolvedValue(characterWithoutEpisodes);

    render(
      <BrowserRouter>
        <CharacterDetail />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/no episode information/i)).toBeInTheDocument();
    });
  });
});
```

**Success criteria:**

- [ ] Tests loading state rendering
- [ ] Tests successful data display
- [ ] Tests network error handling
- [ ] Tests 404 error handling
- [ ] Tests edge cases (empty biography, no episodes)
- [ ] Mocks API calls (no actual network requests)
- [ ] Uses React Testing Library patterns from copilot-instructions.md

**Dependencies:** Step 4 (requires CharacterDetail component)

---

## Open Questions

### Resolved (updated after validation in Exercise 2.2)

1. **Error handling for invalid character IDs** ✅
   - **Resolution:** Return 404 with standard error format matching existing API patterns
   - **Validation:** Checked backend/src/routes/shows.js for error response format

2. **Caching strategy** ✅
   - **Resolution:** Implement Redis caching with 5-minute TTL
   - **Rationale:** Character data rarely changes; caching reduces database load significantly

3. **Test file locations** ✅
   - **Resolution:** Added Steps 7 & 8 with explicit test file paths and comprehensive test cases
   - **Coverage:** Success cases, 404 errors, edge cases (empty data), database errors

4. **Edge case: missing biography or episodes** ✅
   - **Resolution:** Display "No X available" message for missing data
   - **Validation:** Added to component implementation and test cases

### Remaining Open Questions

1. **Character biography formatting**
   - **Question:** Does biography support Markdown or rich text formatting?
   - **Current approach:** Plain text only
   - **Decision needed by:** Frontend implementation (Step 4)
   - **Impact:** Medium (affects component rendering and possibly backend storage)

2. **Image handling**
   - **Question:** What happens if image_url is broken or slow to load?
   - **Current approach:** Basic <img> tag with alt text
   - **Suggestions:** Add loading placeholder, error fallback image, lazy loading
   - **Decision needed by:** Before production deployment
   - **Impact:** Low (UX enhancement, not blocking)

3. **Related characters feature**
   - **Question:** Original spec mentions "related characters from same show"—implement now or later?
   - **Current approach:** Not included in this plan
   - **Suggestions:** Add as follow-up feature after basic implementation works
   - **Decision needed by:** Product prioritization
   - **Impact:** High (requires additional database query and UI section)

---

## Dependencies & Execution Order

### Critical Path

```
Step 1 (Database)
  ↓
Step 2 (API Endpoint) → Step 7 (Backend Tests)
  ↓
Step 3 (Route Registration)
  ↓
Step 5 (API Service)
  ↓
Step 4 (Frontend Component) → Step 8 (Frontend Tests)
  ↓
Step 6 (Routing)
```

### Recommended Implementation Strategy

**Phase 1: Backend (Steps 1-3, 7)** — ~90 minutes

- Implement and test backend first for independent verification
- Can test with curl/Postman before frontend exists
- Validates database query performance and caching behavior

**Phase 2: Frontend (Steps 4-6, 8)** — ~90 minutes

- Frontend consumes completed backend API
- Can work in parallel if multiple developers
- Component can be developed with mocked API responses

**Phase 3: Integration Testing** — ~30 minutes

- Verify end-to-end functionality
- Test error cases (404, network failures)
- Performance testing with caching enabled

---

## Risk Assessment

### Low Risk ✅

- Database query reuses existing patterns and tables
- API endpoint follows established conventions
- Component structure matches existing pages

### Medium Risk ⚠️

- **Caching implementation** — If Redis isn't configured, may need fallback strategy
  - _Mitigation:_ Add environment check; degrade gracefully to no caching
- **Episode query performance** — json_agg could be slow for characters in 100+ episodes
  - _Mitigation:_ Add LIMIT to episodes query, paginate if needed

### High Risk 🔴

- **None identified** — All components follow proven patterns and existing architecture

---

## Success Metrics

### Development Velocity

- [ ] Backend implementation: ≤ 90 minutes
- [ ] Frontend implementation: ≤ 90 minutes
- [ ] Total development time: ≤ 4 hours (with testing)

### Quality Metrics

- [ ] Zero integration issues (frontend + backend work together immediately)
- [ ] Test coverage: ≥ 85% for new code
- [ ] Zero pattern violations (passes copilot-instructions.md standards)
- [ ] First PR review: ≤ 1 round (no architectural changes needed)

### Performance Targets

- [ ] Page load time: < 500ms (with caching)
- [ ] Database query time: < 100ms
- [ ] API response time: < 200ms (including network)

---

## Notes from Validation Review

**Architectural Review (David):** ✅ Plan follows ARCHITECTURE.md layering. Added caching to prevent database bottleneck. Confirmed error handling matches existing patterns.

**Quality Review (Elena):** ✅ Added Steps 7 & 8 for comprehensive testing. Included edge case tests for empty data. Test coverage targets set at 85%.

**Standards Review (Sarah):** ✅ Verified async/await patterns, functional components, and error middleware usage. All steps follow copilot-instructions.md conventions.

**Team consensus:** Plan is production-ready and approved for implementation.

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Project structure and data flow
- [.github/copilot-instructions.md](../.github/copilot-instructions.md) — Coding standards
- [character-detail-challenge.md](./character-detail-challenge.md) — Progress tracker for this feature

---

**Ready to implement?** Review this plan with the team, then proceed to Exercise 2.3 to execute.
