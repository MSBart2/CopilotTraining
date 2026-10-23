<#
.SYNOPSIS
    Runs the EF Core migration for a new FanHub entity (create-card-and-page skill Step 4).

.PARAMETER EntityName
    Singular PascalCase entity name (e.g. "Location", "Faction").

.EXAMPLE
    .\run-migration.ps1 -EntityName Location
#>
param(
    [Parameter(Mandatory)]
    [string]$EntityName
)

$BackendPath = Join-Path $PSScriptRoot "..\..\..\..\dotnet\Backend"

if (-not (Test-Path $BackendPath)) {
    Write-Error "Backend project not found at: $BackendPath"
    exit 1
}

Push-Location $BackendPath
try {
    Write-Host "Adding migration: Add$EntityName" -ForegroundColor Cyan
    dotnet ef migrations add "Add$EntityName"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Migration add failed. Fix the errors above before continuing."
        exit 1
    }

    Write-Host "Updating database..." -ForegroundColor Cyan
    dotnet ef database update
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Database update failed. Fix the errors above before continuing."
        exit 1
    }

    Write-Host "Migration complete." -ForegroundColor Green
}
finally {
    Pop-Location
}
