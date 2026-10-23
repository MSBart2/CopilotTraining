# Feature Request Template

> **Note**: This is a sample of what Copilot might generate when you ask it to create a feature request prompt. Your output will vary based on your specific requirements.

Structure and refine a feature request into an actionable specification.

## Context

Use this prompt to transform vague feature ideas into well-structured specifications that can be handed to developers (or Copilot!) for implementation.

## Instructions

When given a feature idea:

1. **Clarify the user value**
   - Who benefits from this feature?
   - What problem does it solve?
   - How will success be measured?

2. **Define scope**
   - What's included in v1?
   - What's explicitly out of scope?
   - What are the dependencies?

3. **Write acceptance criteria**
   - Testable, specific conditions
   - Cover happy path and edge cases
   - Include error scenarios

4. **Identify technical considerations**
   - New endpoints needed
   - Database changes
   - Third-party integrations
   - Performance implications

5. **Estimate complexity**
   - T-shirt size (S/M/L/XL)
   - Key risks or unknowns

## Template

```markdown
# Feature: [Name]

## Summary
[One-sentence description]

## User Story
As a [type of user],
I want [goal/desire],
So that [benefit/value].

## Acceptance Criteria
- [ ] Given [context], when [action], then [outcome]
- [ ] Given [context], when [action], then [outcome]
- [ ] Given [error condition], then [error handling]

## Out of Scope
- [Feature/behavior explicitly not included]
- [Future enhancement noted but deferred]

## Technical Notes
- API: [Endpoints needed]
- Database: [Schema changes]
- Frontend: [Components/pages affected]
- Dependencies: [External services]

## Mockups/Examples
[Screenshots, wireframes, or detailed descriptions]

## Estimation
- Size: [S/M/L/XL]
- Risks: [Key unknowns]
- Dependencies: [Blockers]
```

---

## Example Input

"Let's add a way for users to save their favorite characters"

---

## Example Output

# Feature: Favorite Characters

## Summary
Allow authenticated users to mark characters as favorites and view a personalized favorites list.

## User Story
As a registered fan,
I want to save my favorite characters,
So that I can quickly access them without searching.

## Acceptance Criteria
- [ ] Given I'm logged in, when I click the heart icon on a character, then it's added to my favorites
- [ ] Given I've favorited a character, when I click the heart again, then it's removed from favorites
- [ ] Given I have favorites, when I visit /favorites, then I see my favorited characters
- [ ] Given I'm not logged in, when I click favorite, then I'm prompted to log in
- [ ] Given the favorites API fails, then I see an error toast (not a crash)

## Out of Scope
- Favorite episodes (future feature)
- Sharing favorites with other users
- Sorting/organizing favorites

## Technical Notes
- API: POST/DELETE /api/users/:id/favorites/:characterId
- Database: New `user_favorites` junction table
- Frontend: FavoriteButton component, FavoritesPage
- Dependencies: Authentication must be working

## Estimation
- Size: M
- Risks: Need to handle offline/sync scenarios
- Dependencies: User auth (Module 1)
