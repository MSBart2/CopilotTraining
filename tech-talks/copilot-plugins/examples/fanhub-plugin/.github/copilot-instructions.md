# FanHub Copilot Instructions

> **Active implementation**: `dotnet/` — ASP.NET Core Web API backend + Blazor Server frontend
> **Purpose**: Workshop codebase with intentional bugs. The goal is to fix them using GitHub Copilot.

---

## Project Overview

FanHub is a Breaking Bad fan site. It serves characters, episodes, quotes, lore, and show data through a REST API consumed by a Blazor Server frontend.

- **Backend**: ASP.NET Core 10 Web API — `dotnet/Backend/`
- **Frontend**: Blazor Server — `dotnet/Frontend/`
- **Database**: SQLite via Entity Framework Core 10 (file: `fanhub.db`)
- **ORM**: Direct `FanHubContext` injection — no repository layer

Other language implementations (`node/`, `go/`, `java/`) exist but are **not the focus**.

> For deep implementation details — routes, models, conventions, EF setup, seed data, configuration, and security notes — see [`docs/architecture.md`](../docs/architecture.md).

---

## Key Conventions

- Controllers inject `FanHubContext` directly — no services, no repositories
- Routes follow `[Route("api/[controller]")]` — controller class name = route segment
- Async: `FindAsync()`, `ToListAsync()`, `SaveChangesAsync()`
- Frontend fetches: `await Http.GetFromJsonAsync<T>("api/endpoint")`
- No `[Authorize]` middleware enforced anywhere

---

## Reference Docs

| Document                                                                                | Purpose                                                              |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`docs/architecture.md`](../docs/architecture.md)                                                 | Full architecture: routes, models, EF, conventions, config, security |
| [`dotnet/BUGS.md`](../dotnet/BUGS.md)                                                   | Bug catalog with evidence and fix guidance                           |
| [`dotnet/SETUP.md`](../dotnet/SETUP.md)                                                 | Detailed setup instructions                                          |
| [`dotnet/docs/FEATURE-CHARACTER-DETAIL.md`](../dotnet/docs/FEATURE-CHARACTER-DETAIL.md) | Spec for the next feature to build                                   |
| [`docs/breaking-bad-universe.md`](../docs/breaking-bad-universe.md)                     | Domain lore: characters, locations, show history                     |
