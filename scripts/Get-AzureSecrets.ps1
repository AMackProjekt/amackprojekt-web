# Get-AzureSecrets.ps1
# Script to retrieve all connection strings and keys for MackProjekt API

$resourceGroup = "mackprojekt-rg"
$cosmosName = "mackprojekt-db"
$appInsightsName = "mackprojekt-insights"

Write-Host "🔍 Retrieving Azure connection strings..." -ForegroundColor Cyan
Write-Host ""

# 1. Cosmos DB
Write-Host "1️⃣ Cosmos DB" -ForegroundColor Yellow
try {
    $cosmosKeys = az cosmosdb keys list --name $cosmosName --resource-group $resourceGroup --query "{endpoint: documentEndpoint, key: primaryMasterKey}" -o json | ConvertFrom-Json
    
    Write-Host "   ✅ Endpoint: $($cosmosKeys.endpoint)" -ForegroundColor Green
    Write-Host "   ✅ Key: $($cosmosKeys.key.Substring(0, 20))..." -ForegroundColor Green
    
    $env:COSMOS_DB_ENDPOINT = $cosmosKeys.endpoint
    $env:COSMOS_DB_KEY = $cosmosKeys.key
} catch {
    Write-Host "   ⏳ Cosmos DB still provisioning or not found" -ForegroundColor Yellow
}

Write-Host ""

# 2. Application Insights
Write-Host "2️⃣ Application Insights" -ForegroundColor Yellow
try {
    $appInsights = az monitor app-insights component show --app $appInsightsName --resource-group $resourceGroup -o json | ConvertFrom-Json
    
    Write-Host "   ✅ Connection String: $($appInsights.connectionString.Substring(0, 50))..." -ForegroundColor Green
    
    $env:APPLICATIONINSIGHTS_CONNECTION_STRING = $appInsights.connectionString
} catch {
    Write-Host "   ❌ Failed to get Application Insights" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Generate JWT Secret
$jwtSecret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
$env:JWT_SECRET = $jwtSecret

Write-Host "🔐 Generated JWT Secret (save this!):" -ForegroundColor Magenta
Write-Host "   $jwtSecret" -ForegroundColor White
Write-Host ""

# Create .env file
$envContent = @"
# Azure Cosmos DB
COSMOS_DB_ENDPOINT=$($env:COSMOS_DB_ENDPOINT)
COSMOS_DB_KEY=$($env:COSMOS_DB_KEY)

# JWT Authentication
JWT_SECRET=$jwtSecret

# Azure Communication Services (for email)
# TODO: Set up Azure Communication Services and Email domain
COMMUNICATION_SERVICES_CONNECTION_STRING=
SENDER_EMAIL=noreply@mackprojekt.com

# Application Insights
APPLICATIONINSIGHTS_CONNECTION_STRING=$($env:APPLICATIONINSIGHTS_CONNECTION_STRING)
"@

$envPath = Join-Path $PSScriptRoot "..\api\.env"
$envContent | Out-File -FilePath $envPath -Encoding utf8

Write-Host "✅ Created api/.env file" -ForegroundColor Green
Write-Host ""

# Display GitHub Secrets commands
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📦 GitHub Secrets Setup" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run these commands to add secrets to GitHub:" -ForegroundColor White
Write-Host ""
Write-Host "gh secret set COSMOS_DB_ENDPOINT --body `"$($env:COSMOS_DB_ENDPOINT)`"" -ForegroundColor Cyan
Write-Host "gh secret set COSMOS_DB_KEY --body `"$($env:COSMOS_DB_KEY)`"" -ForegroundColor Cyan
Write-Host "gh secret set JWT_SECRET --body `"$jwtSecret`"" -ForegroundColor Cyan
Write-Host "gh secret set APPLICATIONINSIGHTS_CONNECTION_STRING --body `"$($env:APPLICATIONINSIGHTS_CONNECTION_STRING)`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Note: Communication Services setup requires domain verification." -ForegroundColor Yellow
Write-Host "   For now, contact form will save to DB but won't send emails." -ForegroundColor Yellow
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
