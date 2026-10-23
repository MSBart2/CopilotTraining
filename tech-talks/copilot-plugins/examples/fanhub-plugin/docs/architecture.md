# FanHub Architecture

> Deep-dive reference for the `dotnet/` implementation. For project overview and quick orientation, see [`.github/copilot-instructions.md`](../.github/copilot-instructions.md).

---

## Stack

| Layer       | Technology               | Notes                                                  |
| ----------- | ------------------------ | ------------------------------------------------------ |
| Backend API | ASP.NET Core 10 Web API  | `dotnet/Backend/`                                      |
| Frontend    | Blazor Server            | `dotnet/Frontend/`                                     |
| Database    | SQLite via EF Core 10    | File: `fanhub.db` (created by migration)               |
| ORM         | Entity Framework Core 10 | Direct `FanHubContext` injection — no repository layer |
| Auth        | Stub only                | `AuthController` exists but middleware not enforced    |

---

## Build & Run

```bash
# Backend
cd dotnet/Backend
dotnet restore
dotnet ef database update     # creates fanhub.db from migrations
dotnet run                    # http://localhost:5265

# Frontend
cd dotnet/Frontend
dotnet restore
dotnet run                    # http://localhost:3000

# Tests
cd dotnet/Backend.Tests
dotnet test

# Docker (runs both)
cd dotnet
docker compose up -d
```

---

## Backend Structure

```
dotnet/Backend/
├── Controllers/          # API endpoints — direct DbContext injection
├── Data/
│   ├── FanHubContext.cs  # DbContext — DbSet registrations, no OnModelCreating
│   └── SeedData.cs       # Seed data — runs on every startup via SeedData.Initialize(context)
├── Migrations/           # EF Core migrations
├── Models/               # EF Core entity classes
├── Properties/
│   └── launchSettings.json
├── appsettings.json
├── appsettings.Development.json
└── Program.cs            # Service registration, middleware, CORS, seeding
```

### API Routes

| Controller             | Route             | Endpoints                                               |
| ---------------------- | ----------------- | ------------------------------------------------------- |
| `CharactersController` | `/api/characters` | GET (list), GET `{id}`, POST, PUT `{id}`, DELETE `{id}` |
| `ShowsController`      | `/api/shows`      | GET (list), GET `{id}`, POST, PUT `{id}`, DELETE `{id}` |
| `EpisodesController`   | `/api/episodes`   | GET (`?season={id}` optional), GET `{id}`, POST         |
| `QuotesController`     | `/api/quotes`     | GET (list), GET `{id}`, POST, POST `{id}/like`          |
| `LoreController`       | `/api/lore`       | GET (list), POST                                        |
| `AuthController`       | `/api/auth`       | POST `/register`, POST `/login`                         |

### Coding conventions

- **Namespace**: `Backend.Controllers`, `Backend.Models`, `Backend.Data`
- **Route attribute**: `[Route("api/[controller]")]` — controller class name maps to route segment
- **Controller naming**: `{Entity}Controller.cs`
- **Async pattern**: `FindAsync()`, `ToListAsync()`, `SaveChangesAsync()`
- **No repository pattern** — controllers inject `FanHubContext` directly
- **No services layer** — business logic (minimal) lives in controllers
- **No authentication middleware** — `AuthController` is a stub; no `[Authorize]` enforced

### DbContext

`FanHubContext` registers the following `DbSet` properties:

| DbSet                    | Entity                  |
| ------------------------ | ----------------------- |
| `Shows`                  | `Show`                  |
| `Characters`             | `Character`             |
| `Episodes`               | `Episode`               |
| `Seasons`                | `Season`                |
| `Quotes`                 | `Quote`                 |
| `Users`                  | `User`                  |
| `CharacterRelationships` | `CharacterRelationship` |
| `Lores`                  | `Lore`                  |

> **Known issue**: `OnModelCreating` is not overridden — no foreign key relationships, cascade rules, or indexes are configured. Navigation properties exist on models but EF treats them as unmapped.

---

## Models Reference

```csharp
Character  { Id, ShowId, Name, ActorName, Bio, Tagline, CharacterType,
             IsMainCharacter, Status, ImageUrl }

Show       { Id, Title, Description, Genre, StartYear, EndYear, Network }

Episode    { Id, ShowId, SeasonId, EpisodeNumber, Title, Description,
             RuntimeMinutes, AirDate }

Season     { Id, ShowId, SeasonNumber, Title, EpisodeCount }

Quote      { Id, ShowId, CharacterId, EpisodeId, QuoteText, IsFamous, Likes }

User       { Id, Email, PasswordHash, Username, DisplayName, Role }

CharacterRelationship  { Id, CharacterId, RelatedCharacterId, RelationshipType }

Lore       { Id, ShowId, Title, Description, Category }
```

All string properties are non-nullable. No `[Required]` or `[MaxLength]` attributes are applied (intentional bug — missing validation).

---

## Frontend Structure

```
dotnet/Frontend/
├── Components/
│   ├── Layout/
│   │   ├── MainLayout.razor
│   │   ├── NavBar.razor
│   │   └── NavMenu.razor
│   └── Pages/
│       ├── Home.razor        # Hero + stat cards + nav-cards
│       ├── Characters.razor  # Character grid + detail modal
│       ├── Episodes.razor    # Episode list with season filter
│       └── Lore.razor        # Lore facts grid + add form
├── Models/                   # C# mirror of backend models (no EF attributes)
├── appsettings.json
├── appsettings.Development.json
└── Program.cs
```

### HttpClient configuration

Base URL is read from `appsettings.Development.json` → `BackendUrl` key (default: `http://localhost:5265`). Injected into Razor components via:

```razor
@inject HttpClient Http
```

### Frontend data fetch pattern

```csharp
var items = await Http.GetFromJsonAsync<List<T>>("api/endpoint");
var response = await Http.PostAsJsonAsync("api/endpoint", payload);
var created = await response.Content.ReadFromJsonAsync<T>();
```

### Component conventions

- `@rendermode InteractiveServer` on interactive pages
- `@using Frontend.Models` for model access
- Plain HTML `<form @onsubmit="Handler" @onsubmit:preventDefault>` — no `<EditForm>`
- `StateHasChanged()` called after in-memory list mutations (no full re-fetch)
- No authentication checks on any frontend route

---

## Seed Data

`SeedData.Initialize(context)` runs on every backend startup (`Program.cs`). Each entity type is guarded by an `Any()` check to prevent re-seeding.

Seeded entities (in order):

1. `Show` — Breaking Bad
2. `Seasons` — 5 seasons
3. `Episodes` — all 62
4. `Characters` — main and supporting cast
5. `Quotes` — famous quotes
6. `Lores` — key locations, factions, story beats, production notes
7. `CharacterRelationships` — relationship graph

> **Known bug**: Jesse Pinkman is inserted twice (indices 1 and 4). One quote references the duplicate entry.

---

## EF Migrations

Migrations live in `dotnet/Backend/Migrations/`. To add a new entity:

```bash
cd dotnet/Backend
dotnet ef migrations add Add{EntityName}
dotnet ef database update
```

Current migrations:

- `20260327003316_InitialCreate` — baseline schema
- `20260327012936_AddLore` — adds `Lores` table

---

## Configuration

| Setting                  | File                                          | Notes                                                      |
| ------------------------ | --------------------------------------------- | ---------------------------------------------------------- |
| SQLite connection string | `Program.cs` (hardcoded)                      | **Bug** — belongs in `appsettings.json`                  |
| Backend URL (frontend)   | `appsettings.Development.json` → `BackendUrl` |                                                            |
| CORS policy              | `Program.cs`                                  | `AllowAnyOrigin` — **lock down in production** |
| Ports                    | `Properties/launchSettings.json`              | Backend: 5265, Frontend: 3000                              |

---

## Security Notes

| Issue                            | Location               | Status                               |
| -------------------------------- | ---------------------- | ------------------------------------ |
| MD5 password hashing             | `AuthController.cs:93` | **Unfixed** — replace with BCrypt    |
| No authentication middleware     | `Program.cs`           | Intentional stub                     |
| Hardcoded connection string      | `Program.cs`           | **Unfixed** — move to config         |
| Wide-open CORS                   | `Program.cs`           | Intentional for dev, fix for prod    |
| Password hash returned to client | `AuthController.cs`    | **Unfixed** — omit from response DTO |

---

## Known Intentional Bugs

> Full catalog: [`dotnet/BUGS.md`](../dotnet/BUGS.md)

### Critical

| Bug                         | Location                     | Issue                               |
| --------------------------- | ---------------------------- | ----------------------------------- |
| NullReferenceException      | `CharactersController.cs:30` | No null check on `FindAsync` result |
| NullReferenceException      | `CharactersController.cs:62` | `Remove(null)` crashes EF Core      |
| NullReferenceException      | `ShowsController.cs:28,66`   | Same pattern as above               |
| MD5 password hashing        | `AuthController.cs:93`       | Completely insecure — use BCrypt    |
| Hardcoded connection string | `Backend/Program.cs`         | Move to `appsettings.json`          |
| Duplicate Jesse Pinkman     | `SeedData.cs:94,128`         | Character inserted twice            |

### High Priority

| Bug                            | Location                                  | Issue                                       |
| ------------------------------ | ----------------------------------------- | ------------------------------------------- |
| `SaveChangesAsync` not awaited | `CharactersController`, `ShowsController` | Fire-and-forget update                      |
| Wide-open CORS                 | `Backend/Program.cs`                      | `AllowAnyOrigin` — lock down in production  |
| N+1 queries                    | `ShowsController`, `QuotesController`     | Missing `.Include()` calls                  |
| Season filter ignored          | `Episodes.razor`                          | Caching bug returns all episodes regardless |
| Static event leak              | `Characters.razor`                        | `OnCharacterSelected` never unsubscribed    |
| Wrong HTTP status              | Multiple controllers                      | POST returns 200; expected 201             |
| Missing DELETE                 | `QuotesController`                        | No delete endpoint                          |

---

## Related Docs

| Document                                                                             | Purpose                                          |
| ------------------------------------------------------------------------------------ | ------------------------------------------------ |
| [`dotnet/BUGS.md`](../dotnet/BUGS.md)                                                   | Full bug catalog with evidence and fix guidance  |
| [`dotnet/SETUP.md`](../dotnet/SETUP.md)                                                 | Detailed setup instructions                      |
| [`dotnet/docs/FEATURE-CHARACTER-DETAIL.md`](../dotnet/docs/FEATURE-CHARACTER-DETAIL.md) | Spec for the next feature to build               |
| [`breaking-bad-universe.md`](breaking-bad-universe.md)                     | Domain lore: characters, locations, show history |
| [`.github/skills/new-card-skill/SKILL.md`](../.github/skills/new-card-skill/SKILL.md)   | Skill for scaffolding new entity card pages      |
