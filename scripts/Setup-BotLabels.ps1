#Requires -Version 5.1
<#
.SYNOPSIS
    Creates the GitHub issue labels required by the bot-agent workflows.

.DESCRIPTION
    Uses the 'gh' CLI to create labels in the repository.
    Labels are idempotent — if a label already exists the script
    updates its color and description instead of failing.

.EXAMPLE
    .\scripts\Setup-BotLabels.ps1
    .\scripts\Setup-BotLabels.ps1 -Repo "owner/repo"
#>

param(
    [string]$Repo = "AMackProjekt/amackprojekt-web"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Set-GhLabel {
    param(
        [string]$Name,
        [string]$Color,
        [string]$Description
    )

    $exists = gh label list --repo $Repo --json name --jq ".[] | select(.name == `"$Name`") | .name" 2>$null

    if ($exists) {
        Write-Host "  Updating : $Name" -ForegroundColor Cyan
        gh label edit $Name --repo $Repo --color $Color --description $Description
    } else {
        Write-Host "  Creating : $Name" -ForegroundColor Green
        gh label create $Name --repo $Repo --color $Color --description $Description
    }
}

Write-Host ""
Write-Host "Setting up bot labels for $Repo" -ForegroundColor Yellow
Write-Host "--------------------------------------"

$labels = @(
    @{ Name = "bot-site-down";    Color = "d73a4a"; Description = "Site is returning a non-200 HTTP status" },
    @{ Name = "incident";         Color = "e4e669"; Description = "Active service incident" },
    @{ Name = "bot-slow-response";Color = "f9d0c4"; Description = "Site responded above the 10 000ms threshold" },
    @{ Name = "security";         Color = "e11d48"; Description = "Security-related finding from automated audit" },
    @{ Name = "needs-review";     Color = "0075ca"; Description = "Item flagged by bot for human review" }
)

foreach ($label in $labels) {
    Set-GhLabel -Name $label.Name -Color $label.Color -Description $label.Description
}

Write-Host ""
Write-Host "Done. Current labels in $Repo :" -ForegroundColor Yellow
gh label list --repo $Repo
