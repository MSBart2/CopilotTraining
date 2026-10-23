<#
.SYNOPSIS
    Verifies GET and POST endpoints for a newly scaffolded FanHub entity (create-card-and-page skill verification checklist).

.PARAMETER EntityName
    Singular PascalCase entity name (e.g. "Location", "Faction").

.PARAMETER BaseUrl
    Backend base URL. Defaults to http://localhost:5265.

.EXAMPLE
    .\verify-endpoints.ps1 -EntityName Location
    .\verify-endpoints.ps1 -EntityName Location -BaseUrl http://localhost:5265
#>
param(
    [Parameter(Mandatory)]
    [string]$EntityName,

    [string]$BaseUrl = "http://localhost:5265"
)

$route = $EntityName.ToLower()
$getUrl = "$BaseUrl/api/$route"
$postUrl = "$BaseUrl/api/$route"

Write-Host ""
Write-Host "Verifying endpoints for: $EntityName" -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl"
Write-Host ""

# --- GET ---
Write-Host "GET $getUrl" -ForegroundColor Yellow
try {
    $getResponse = Invoke-RestMethod -Uri $getUrl -Method GET -ErrorAction Stop
    $count = if ($getResponse -is [array]) { $getResponse.Count } else { 1 }
    Write-Host "  [OK] Returned $count record(s)" -ForegroundColor Green
}
catch {
    Write-Host "  [FAIL] GET failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# --- POST ---
$testPayload = @{
    showId      = 1
    title       = "Verify Test — $(Get-Date -Format 'HH:mm:ss')"
    description = "Created by verify-endpoints.ps1"
    category    = "Test"
} | ConvertTo-Json

Write-Host "POST $postUrl" -ForegroundColor Yellow
try {
    $postResponse = Invoke-RestMethod -Uri $postUrl -Method POST `
        -Body $testPayload -ContentType "application/json" -ErrorAction Stop
    if ($postResponse.id -gt 0) {
        Write-Host "  [OK] Created record with Id=$($postResponse.id)" -ForegroundColor Green
    }
    else {
        Write-Host "  [WARN] POST succeeded but response had no Id. Check the controller." -ForegroundColor Yellow
    }
}
catch {
    Write-Host "  [FAIL] POST failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Done. If both checks passed, the backend is working correctly." -ForegroundColor Cyan
