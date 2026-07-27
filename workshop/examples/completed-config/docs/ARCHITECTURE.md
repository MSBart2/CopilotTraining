# FanHub Architecture

> **Note**: This is a sample of what Copilot might generate when you ask it to analyze the codebase and create architecture documentation. Your output will vary based on your specific codebase state.

## Overview

FanHub is a full-stack web application for TV show fan communities. It follows a traditional client-server architecture with a React frontend and Node.js/Express backend.

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React Frontend                        │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │  Pages  │  │Components│  │Services │  │  Hooks  │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          Server                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Express Backend                        │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │ Routes  │  │Middleware│  │Controllers│ │  Utils  │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ SQL
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        PostgreSQL                                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │  shows  │  │characters│  │episodes │  │ quotes  │            │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### Frontend (React)

| Layer | Purpose | Key Files |
|-------|---------|-----------|
| **Pages** | Route-level components | `Home.jsx`, `Characters.jsx`, `Episodes.jsx` |
| **Components** | Reusable UI elements | `CharacterCard.jsx`, `EpisodeList.js`, `Header.jsx` |
| **Services** | API communication | `api.js`, `auth.js` |
| **Styles** | Visual styling | CSS Modules, theme variables |

**Key Patterns:**
- Functional components with hooks
- React Router for navigation
- CSS Modules for scoped styling
- Centralized API service layer

### Backend (Express)

| Layer | Purpose | Key Files |
|-------|---------|-----------|
| **Routes** | API endpoint definitions | `shows.js`, `characters.js`, `episodes.js` |
| **Middleware** | Request processing | `auth.js`, `errorHandler.js`, `validation.js` |
| **Database** | Data access | `connection.js`, `schema.sql`, `seed.sql` |

**Key Patterns:**
- RESTful API design
- Middleware chain for cross-cutting concerns
- Parameterized queries (SQL injection prevention)
- Centralized error handling

### Database (PostgreSQL)

**Entity Relationships:**

```
shows
  │
  ├──< seasons (one-to-many)
  │      │
  │      └──< episodes (one-to-many)
  │
  ├──< characters (one-to-many)
  │      │
  │      └──< quotes (one-to-many)
  │
  └──< users (favorites - many-to-many)
```

**Core Tables:**
- `shows` — TV series metadata
- `seasons` — Season groupings
- `episodes` — Individual episodes
- `characters` — Show characters
- `quotes` — Famous character quotes
- `users` — User accounts
- `favorites` — User-show relationships

## Data Flow

### Read Operation (Get Characters)

```
1. User visits /characters
2. React Router renders Characters page
3. useEffect triggers fetchCharacters()
4. API service sends GET /api/shows/:id/characters
5. Express route handler queries database
6. Database returns character rows
7. Backend formats response JSON
8. Frontend receives data, updates state
9. React re-renders CharacterCard components
```

### Write Operation (Add Quote)

```
1. User submits quote form
2. Form handler calls api.post('/quotes', data)
3. Backend validates request body
4. Auth middleware verifies user token
5. Route handler inserts into database
6. Database returns new quote with ID
7. Backend sends success response
8. Frontend shows success message, refreshes list
```

### Active-Show Context (`/api/quotes`, `/api/characters`)

Requests to these two routes don't carry an explicit `show_id` — the active show is resolved implicitly by a middleware layer and threaded through the request. The same concept is named differently at every layer; this table is the rosetta stone so no one (human or Copilot) has to rediscover it by reading five files:

| Layer | Name Used | File |
|---|---|---|
| Request signal | `X-Show-Slug` header | client request |
| Middleware/interceptor | `universe` | `middleware/universeContext.*` |
| Service/controller variable | `activeSeries` | route/controller for `/quotes`, `/characters` |
| API response field | `program.programId` | JSON response body |
| Frontend state | `currentShow` | homepage component |

> ⚠️ Not to be confused with the `docs/[show]-universe.md` canon file from Exercise 1.6 — same word, unrelated concept. That file is static show lore; `universe` here is a request-scoped context flag.

Every other route (`/api/shows`, `/api/episodes`, `/auth`) takes `show_id` explicitly and does **not** go through this middleware — this is a partial rollout, not a repo-wide convention. Check the route registration (not just the controller) before assuming a route has this behavior.

## Security Considerations

| Concern | Mitigation |
|---------|------------|
| SQL Injection | Parameterized queries only |
| XSS | React's automatic escaping |
| CSRF | SameSite cookies |
| Auth | JWT tokens, httpOnly cookies |
| Secrets | Environment variables, never committed |

## Scaling Considerations

**Current State (Development):**
- Single database instance
- In-memory session storage
- No caching layer

**Future Improvements:**
- Connection pooling (pg-pool)
- Redis for session/cache
- CDN for static assets
- Database read replicas

## Development Environment

```bash
# Start all services
docker-compose up

# Services available at:
# - Frontend: http://localhost:3000
# - Backend:  http://localhost:3001
# - Database: localhost:5432
```

## Key Decisions Log

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| PostgreSQL over MongoDB | Relational data (shows→episodes) fits SQL | MongoDB, SQLite |
| REST over GraphQL | Simpler for this scope, team familiarity | GraphQL, tRPC |
| CSS Modules over styled-components | Smaller bundle, team preference | styled-components, Tailwind |
| Express over Fastify | Ecosystem maturity, team familiarity | Fastify, Koa |
