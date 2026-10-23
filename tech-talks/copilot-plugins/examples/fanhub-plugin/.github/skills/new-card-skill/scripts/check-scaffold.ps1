<#
.SYNOPSIS
    Checks that all files expected by create-card-and-page skill exist before running the EF migration.
    Run this after Steps 1-3 and 5-6, before Step 4 (migration).

.PARAMETER EntityName
    Singular PascalCase entity name (e.g. "Location", "Faction").

.EXAMPLE
    .\check-scaffold.ps1 -EntityName Location
#>
param(
    [Parameter(Mandatory)]
    [string]$EntityName
)

$Root = Join-Path $PSScriptRoot "..\..\..\.."

$expected = @(
    "dotnet\Backend\Models\$EntityName.cs"
    "dotnet\Backend\Controllers\${EntityName}Controller.cs"
    "dotnet\Frontend\Models\$EntityName.cs"
    "dotnet\Frontend\Components\Pages\$EntityName.razor"
)

$missing = @()
foreach ($rel in $expected) {
    $full = Join-Path $Root $rel
    if (Test-Path $full) {
        Write-Host "  [OK] $rel" -ForegroundColor Green
    }
    else {
        Write-Host "  [MISSING] $rel" -ForegroundColor Red
        $missing += $rel
    }
}

# Check DbSet registration
$contextPath = Join-Path $Root "dotnet\Backend\Data\FanHubContext.cs"
$contextContent = Get-Content $contextPath -Raw
if ($contextContent -match "DbSet<$EntityName>") {
    Write-Host "  [OK] FanHubContext.cs — DbSet<$EntityName> registered" -ForegroundColor Green
}
else {
    Write-Host "  [MISSING] FanHubContext.cs — DbSet<$EntityName> not found" -ForegroundColor Red
    $missing += "DbSet<$EntityName> in FanHubContext.cs"
}

# Check seed block
$seedPath = Join-Path $Root "dotnet\Backend\Data\SeedData.cs"
$seedContent = Get-Content $seedPath -Raw
if ($seedContent -match "context\.${EntityName}s") {
    Write-Host "  [OK] SeedData.cs — seed block present" -ForegroundColor Green
}
else {
    Write-Host "  [MISSING] SeedData.cs — no seed block for $EntityName" -ForegroundColor Red
    $missing += "Seed block for $EntityName in SeedData.cs"
}

Write-Host ""
if ($missing.Count -eq 0) {
    Write-Host "All files present. Safe to run migration." -ForegroundColor Green
}
else {
    Write-Host "$($missing.Count) item(s) missing. Fix them before running the migration." -ForegroundColor Red
    exit 1
}
