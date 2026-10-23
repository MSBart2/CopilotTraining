<!-- Reference implementation for Module 3, Exercise 3.3: Variable-Driven Prompts -->
<!-- This example demonstrates: Input-driven prompts with custom variables -->

---

name: feature-estimate
description: 'Estimate feature effort with codebase analysis'
agent: 'agent'
tools: ['codebase', 'search/codebase']
argument-hint: 'feature-estimate <feature description>'

---

Estimate the development effort for this feature in FanHub:

**Feature description:** ${input:featureDescription}

**Project context:** FanHub TV show fan site  
**Workspace:** ${workspaceFolder}

## Analysis Process

### 1. Requirement Breakdown

Parse the feature description into specific implementation tasks:

**Frontend tasks**:

- New pages needed?
- New components needed?
- Routing changes?
- State management updates?
- API integration points?

**Backend tasks**:

- New API endpoints?
- Database schema changes?
- Business logic/services?
- Middleware updates?
- Authentication/authorization?

**Database tasks**:

- New tables/columns?
- Migrations required?
- Query optimization?
- Index updates?
- Seed data needed?

**Testing tasks**:

- Unit tests?
- Integration tests?
- E2E tests?
- Test fixtures/mocks?

### 2. Codebase Analysis

Search for similar existing features to benchmark effort:

**Find similar implementations**:

```
Search for: [relevant keywords from feature description]
- Existing pages with similar UI patterns
- API endpoints with similar data structures
- Database queries with similar complexity
```

**Analyze complexity**:

- How many files were modified in similar features?
- What patterns already exist that can be reused?
- What's net new vs. following existing patterns?

**Identify dependencies**:

- What modules/services will this interact with?
- Any blockers (missing infrastructure, external APIs)?
- Prerequisites (other features must be done first)?

### 3. Pattern Matching

Reference [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) to ensure estimate includes:

- All three layers (frontend, backend, database)
- Standard error handling
- Standard testing coverage
- Documentation updates

### 4. FanHub-Specific Considerations

Check against FanHub patterns:

**Data model**:

- Does this use shows/characters/episodes/quotes tables?
- Relationships to existing data?
- Need new database entities?

**UI patterns**:

- Card layouts for list views (CharacterCard, EpisodeCard)?
- Detail pages with similar structure?
- Search/filter components?

**API patterns**:

- RESTful endpoints following `/api/resource/:id` convention?
- Standard response format `{ success, data }`?
- Pagination for lists?

## Estimation Output

### 📋 Task Breakdown

List all implementation tasks with effort:

#### Frontend (X hours)

- [ ] Create `[Page/Component]` — 2h
  - Files: `frontend/src/pages/[Name].jsx`, `frontend/src/pages/[Name].module.css`
  - Similar to: [existing similar component]
  - Complexity: Low/Medium/High
- [ ] Update routing — 0.5h
  - Files: `frontend/src/App.jsx`
  - Add route: `/path/to/feature`

- [ ] Create API service function — 1h
  - Files: `frontend/src/services/api.js`
  - New function: `fetch[Resource]()`

#### Backend (Y hours)

- [ ] Create API endpoint — 2h
  - Files: `backend/src/routes/[resource].js`
  - Endpoint: `GET/POST /api/resource`
  - Validation, error handling

- [ ] Business logic/controller — 1.5h
  - Files: `backend/src/controllers/[Resource]Controller.js`
  - Logic: [description]

#### Database (Z hours)

- [ ] Schema migration — 1h
  - Files: `backend/src/database/migrations/[timestamp]_[name].sql`
  - Changes: [description]
- [ ] Queries — 1.5h
  - Files: `backend/src/database/queries.js`
  - Add functions: `get[Resource]()`, `create[Resource]()`

#### Testing (W hours)

- [ ] Backend tests — 2h
  - Files: `backend/__tests__/routes/[resource].test.js`
  - Coverage: Success cases, 404, edge cases

- [ ] Frontend tests — 2h
  - Files: `frontend/__tests__/pages/[Page].test.jsx`
  - Coverage: Render, loading, error states

### 🎯 Total Estimate

```
Frontend:  X hours
Backend:   Y hours
Database:  Z hours
Testing:   W hours
-----------------------
Total:     N hours (A-B days for senior dev)
```

**Confidence level**: High/Medium/Low  
**Why**: [Explanation of confidence level]

### 🔗 Dependencies & Blockers

**Prerequisites** (must be done first):

- [Feature or infrastructure that must exist]

**Blockers** (may delay):

- [External dependency, API access, design mockups]

**Parallel work possible?**

- Frontend and backend can be developed simultaneously if API contract is defined upfront
- Do database changes first

### ⚠️ Risk Factors

**Technical risks**:

- [Complexity, performance, unknown patterns]

**Scope risks**:

- Feature description may be incomplete (clarify with product)
- Edge cases not specified (could add X hours)
- Security/privacy considerations not addressed

### 📊 Comparison to Similar Features

**Most similar existing feature**: [Feature name]

- Files modified: [count]
- Actual effort: [hours]
- This feature comparison: [More/less/similar complexity because...]

### 🚀 Quick vs. Complete Approach

**MVP (Minimum Viable)**: [Reduced scope estimate]

- What's included: [Core functionality only]
- What's deferred: [Nice-to-haves]
- Effort: [X hours, Y days]

**Full Feature** (recommended estimate): [Complete scope]

- Includes: [All requirements, testing, edge cases]
- Effort: [N hours, M days]

### ✅ Definition of Done

This feature is complete when:

- [ ] All frontend pages/components implemented and styled
- [ ] All backend endpoints return correct responses
- [ ] Database migrations applied
- [ ] Test coverage ≥ 85%
- [ ] Documentation updated (ARCHITECTURE.md if needed)
- [ ] PR reviewed and merged
- [ ] Works in staging environment

### 📝 Recommended Next Steps

1. Review estimate with product team (confirm scope)
2. Create feature branch: `feature/${input:featureDescription}`
3. Use [plan mode](https://code.visualstudio.com/docs/copilot/chat/chat-planning) for detailed implementation plan
4. Break into subtasks/PRs if estimate > 2 days
5. Schedule dev time based on priority
