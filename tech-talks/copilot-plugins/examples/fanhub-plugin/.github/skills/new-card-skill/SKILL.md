---
name: create-card-and-page skill
description: >
  Use this skill when asked to add a new entity type with a card grid page to FanHub.
  It scaffolds the full stack: backend model, DbContext registration, seed data,
  EF Core migration, REST controller (GET + POST), frontend model, homepage stat
  card + nav-card, and a Blazor list page with an inline add form.
---

## New Card Skill — FanHub Full-Stack Entity Scaffold

Use this skill when the user asks to add a new type of data (e.g. Locations, Factions, Characters, Themes) to FanHub as a browsable card page, following the same pattern used to add the Lore feature.

---

## What to ask the user before starting

If any of the following are not clear from context, ask before proceeding:

1. **Entity name** — singular PascalCase (e.g. `Location`, `Faction`, `Theme`)
2. **Properties** — beyond `Id` and `ShowId`, what fields does this entity have? (e.g. `string Title`, `string Description`, `string Category`)
3. **Form fields** — which properties do you want in the add form on the page?
4. **Nav card label** — plural display label for the homepage (e.g. "Locations", "Lore Facts")
5. **Nav card icon** — emoji for the homepage nav-card (e.g. 📍, 📖, ⚗️)
6. **Seed source** — which file to draw seed data from (default: `docs/breaking-bad-universe.md`)

---

## Implementation steps

Follow these steps in order. Complete and verify each before moving to the next.

### Step 1 — Backend model

Create `dotnet/Backend/Models/{EntityName}.cs` using the template in [`templates/BackendModel.cs`](templates/BackendModel.cs).

Replace the example properties with the ones requested. Rules:

- No navigation properties, no data annotations
- All string properties are non-nullable (no `?`) to match existing model style

### Step 2 — Register DbSet

In `dotnet/Backend/Data/FanHubContext.cs`, add after the last existing `DbSet`:

```csharp
public DbSet<{EntityName}> {EntityName}s { get; set; }
```

Do not modify `OnModelCreating` or anything else in this file.

### Step 3 — Seed data

In `dotnet/Backend/Data/SeedData.cs`, add a new seed block immediately after the last existing seed block using the template in [`templates/SeedBlock.cs`](templates/SeedBlock.cs).

All records must use `ShowId = 1`. Draw content faithfully from the seed source file. Generate 12–15 records.

### Step 3.5 — Pre-migration check

Before running the migration, verify all files are in place:

```powershell
.github/skills/create-card-and-page skill/scripts/check-scaffold.ps1 -EntityName {EntityName}
```

Fix any missing items reported before continuing.

### Step 4 — EF migration

Run the migration script:

```powershell
.github/skills/create-card-and-page skill/scripts/run-migration.ps1 -EntityName {EntityName}
```

Or run manually in `dotnet/Backend/`:

```bash
dotnet ef migrations add Add{EntityName}
dotnet ef database update
```

Stop and report any errors — do not continue to later steps if migration fails.

### Step 5 — Controller

Create `dotnet/Backend/Controllers/{EntityName}Controller.cs` using the template in [`templates/Controller.cs`](templates/Controller.cs).

No authentication attribute. No services layer. No DTO.

### Step 6 — Frontend model

Create `dotnet/Frontend/Models/{EntityName}.cs` using the template in [`templates/FrontendModel.cs`](templates/FrontendModel.cs).

Mirror the backend model exactly — same properties, same types, same order. No EF attributes, no navigation properties.

### Step 7 — Update Home.razor (stat card)

Apply the snippets from [`templates/HomeStatCard.razor.txt`](templates/HomeStatCard.razor.txt) to `dotnet/Frontend/Components/Pages/Home.razor`:

- The `@code` field goes in the `@code` block
- The `OnInitializedAsync` line goes inside that method
- The `<div class="summary-stat">` block goes after the last existing stat in `<div class="summary-card">`

Do not touch any other stat card.

### Step 8 — Update Home.razor (nav card)

Apply the template from [`templates/HomeNavCard.razor.txt`](templates/HomeNavCard.razor.txt) to the `<section class="nav-cards">` in `Home.razor`, after the last existing `<a class="nav-card">` block. Do not alter any other nav card.

### Step 9 — Create list page with add form

Create `dotnet/Frontend/Components/Pages/{EntityName}.razor` using the template in [`templates/ListPage.razor.txt`](templates/ListPage.razor.txt).

Adjust bound fields and card markup to match the actual properties requested. Do not use `<EditForm>`. Do not add authentication.

---

## Conventions to follow

- Namespace pattern: `Backend.Controllers`, `Backend.Models`, `Frontend.Models`
- Async pattern: `FindAsync`, `ToListAsync`, `SaveChangesAsync`
- Frontend data fetch: `await Http.GetFromJsonAsync<T>("api/endpoint")`
- No repository pattern — controllers inject `FanHubContext` directly
- POST returns `Ok()` (matches existing controller pattern)
- See `.github/copilot-instructions.md` for full conventions reference

---

## Verification checklist

After all steps are complete, run the endpoint verification script (requires the backend to be running):

```powershell
.github/skills/create-card-and-page skill/scripts/verify-endpoints.ps1 -EntityName {EntityName}
```

Then confirm manually:

- [ ] `GET /api/{entityname}` returns seeded records
- [ ] `POST /api/{entityname}` creates a new record and returns it
- [ ] Homepage shows the new stat count and nav card
- [ ] Navigating to `/{entityname}` shows the card grid
- [ ] Submitting the form adds a card to the grid without a page reload
- [ ] No existing pages or routes are broken

---

## Scripts

| Script                                                         | When to use                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`scripts/check-scaffold.ps1`](scripts/check-scaffold.ps1)     | After Steps 1–3 and 5–6, before the migration — verifies all files exist |
| [`scripts/run-migration.ps1`](scripts/run-migration.ps1)       | Step 4 — runs EF migration with clear error reporting                    |
| [`scripts/verify-endpoints.ps1`](scripts/verify-endpoints.ps1) | After the backend is running — confirms GET and POST work correctly      |
