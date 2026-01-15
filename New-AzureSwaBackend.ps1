<#
.SYNOPSIS
  Creates an Azure Static Web Apps backend (Azure Functions API) + Agent/Bot kit.

.DESCRIPTION
  Scaffolds:
    - api/ Azure Functions (Node.js + TypeScript) suitable for SWA "api" integration
    - /api/healthz, /api/readyz, /api/v1/projects sample endpoints
    - agents/ role definitions + tasks/ workflow
    - docs/BACKEND_PLAN.md describing Azure SWA backend approach
  Optional:
    - git init

.NOTES
  This does not require Azure login to scaffold.
  To run locally later:
    - Install Azure Functions Core Tools + Node 20
    - func start (from api/)
#>

[CmdletBinding()]
param(
  [Parameter(Mandatory=$false)]
  [string]$RootPath = (Get-Location).Path,

  [Parameter(Mandatory=$false)]
  [switch]$InitGit
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Section([string]$Title) {
  Write-Host ""
  Write-Host "============================================================" -ForegroundColor DarkCyan
  Write-Host $Title -ForegroundColor Cyan
  Write-Host "============================================================" -ForegroundColor DarkCyan
}

function Ensure-Dir([string]$Path) {
  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path | Out-Null
  }
}

function New-TextFile([string]$Path, [string]$Content, [switch]$NoClobber) {
  Ensure-Dir (Split-Path $Path -Parent)
  if ($NoClobber -and (Test-Path $Path)) { return }
  $Content | Out-File -FilePath $Path -Encoding utf8 -Force
}

function Test-Command([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Normalize-Path([string]$Path) {
  return (Resolve-Path -Path $Path).Path
}

$RootPath = Normalize-Path $RootPath

$ApiRoot   = Join-Path $RootPath "api"
$AgentRoot = Join-Path $RootPath "agents"
$TaskRoot  = Join-Path $RootPath "tasks"
$DocsRoot  = Join-Path $RootPath "docs"

Write-Section "Creating folders"
Ensure-Dir $ApiRoot
Ensure-Dir $AgentRoot
Ensure-Dir $TaskRoot
Ensure-Dir $DocsRoot

Ensure-Dir (Join-Path $TaskRoot "backlog")
Ensure-Dir (Join-Path $TaskRoot "in-progress")
Ensure-Dir (Join-Path $TaskRoot "done")

# -------------------------------------------------------------------
# Agent/Bot kit (Azure-focused)
# -------------------------------------------------------------------
Write-Section "Creating agent definitions (Azure-focused)"

$agents = @(
  @{
    id="architect"
    name="Azure Backend Architect"
    purpose="Define SWA API architecture, routing, auth, and data approach for Azure."
    deliverables=@(
      "docs/BACKEND_PLAN.md refined with decisions",
      "API route map under /api/*",
      "Hosting decision: SWA Functions vs separate API"
    )
    first_tasks=@(
      "Confirm the backend runs as SWA integrated Azure Functions (api/).",
      "Define API conventions and versioning (/api/v1/*).",
      "Choose data storage approach: Cosmos DB vs Azure SQL vs Postgres (Azure Database)."
    )
  },
  @{
    id="api"
    name="Azure Functions API Engineer"
    purpose="Implement functions, request validation, errors, and a sample resource."
    deliverables=@(
      "Functions: healthz, readyz, v1/projects",
      "Consistent JSON error envelope",
      "Request ID and logging"
    )
    first_tasks=@(
      "Implement /api/healthz and /api/readyz functions.",
      "Implement /api/v1/projects (GET/POST) sample with in-memory store first.",
      "Add standard error responses and input validation."
    )
  },
  @{
    id="data"
    name="Azure Data Engineer"
    purpose="Select and wire data persistence + local dev strategy."
    deliverables=@(
      "Data model for Projects/Users/ActivityLog",
      "Connection strategy via env vars",
      "Local dev guidance (Azurite/Cosmos emulator where applicable)"
    )
    first_tasks=@(
      "Recommend the best Azure data store for your use case (cost + complexity).",
      "Define schema + indexing strategy for the chosen store.",
      "Add repository abstraction layer in api/src/shared."
    )
  },
  @{
    id="devops"
    name="Azure DevOps / CI Engineer"
    purpose="Wire CI/CD expectations for SWA and backend checks."
    deliverables=@(
      "Lint/typecheck/test scripts for api/",
      "CI notes for SWA build pipeline",
      "Environment variable strategy"
    )
    first_tasks=@(
      "Add npm scripts for lint/typecheck/test in api/package.json.",
      "Document SWA build expectations: app_location, api_location, output_location.",
      "Add a lightweight predeploy validation script."
    )
  },
  @{
    id="security"
    name="Azure Security Engineer"
    purpose="AuthN/AuthZ plan (Entra ID), secrets, dependency hygiene."
    deliverables=@(
      "Threat model notes",
      "Auth strategy: Entra ID (Easy Auth) vs custom JWT",
      "Audit and vulnerability workflow"
    )
    first_tasks=@(
      "Propose auth approach for SWA (Entra ID recommended for org).",
      "Define RBAC claims mapping and minimum API protections.",
      "Set dependency audit cadence and remediation workflow."
    )
  }
)

foreach ($a in $agents) {
  $agentPath = Join-Path $AgentRoot "$($a.id).json"
  $json = [pscustomobject]@{
    id          = $a.id
    name        = $a.name
    purpose     = $a.purpose
    deliverables= $a.deliverables
    first_tasks = $a.first_tasks
    prompt      = @"
You are $($a.name).
Goal: $($a.purpose)

Operating rules:
- Produce concrete deliverables (files, code, commands).
- Prefer Azure-native patterns. Assume this is an SWA + Next.js app with integrated Functions API.
- Keep endpoints under /api/*; version under /api/v1/*.
- Use secure defaults; document assumptions and env vars.

First tasks:
$($a.first_tasks | ForEach-Object { "- $_" } | Out-String)
"@
  } | ConvertTo-Json -Depth 6

  New-TextFile -Path $agentPath -Content $json
}

# Seed tasks
Write-Section "Seeding task backlog"
foreach ($a in $agents) {
  $taskFile = Join-Path (Join-Path $TaskRoot "backlog") ("{0}-first-tasks.md" -f $a.id)
  $taskBody = @"
# $($a.name) - First Tasks

Owner: $($a.id)
Status: backlog

## Tasks
$($a.first_tasks | ForEach-Object { "- [ ] $_" } | Out-String)

## Notes
- Link PRs here:
- Link docs here:
"@
  New-TextFile -Path $taskFile -Content $taskBody
}

# -------------------------------------------------------------------
# docs/BACKEND_PLAN.md tailored for SWA + Functions
# -------------------------------------------------------------------
Write-Section "Creating Azure backend plan"

$backendPlan = @"
# Backend Plan (Azure Static Web Apps + Azure Functions) - v1

## Objective
Provide a stable API backend integrated with Azure Static Web Apps (SWA) for the Next.js frontend.

## Hosting Model
- Frontend: Azure Static Web Apps
- Backend: Azure Functions (Integrated SWA API) located in `/api`
- API base: `/api/*`
- Versioning: `/api/v1/*`

## Endpoints (v1)
- GET /api/healthz
- GET /api/readyz
- GET /api/v1/projects
- POST /api/v1/projects

## Auth Options (pick one)
1) SWA built-in authentication (recommended for org):
   - Use Entra ID as identity provider
   - Enforce auth at routes or function level
2) Custom JWT:
   - Only if you need a non-identity-provider flow

## Data Options (choose based on needs)
- Cosmos DB (NoSQL): fast iteration, flexible schemas
- Azure SQL: structured relational, reporting-friendly
- Azure Database for PostgreSQL: relational + ecosystem

## Engineering Standards
- Standard error envelope:
  { "error": { "code": "...", "message": "...", "details": [...] } }
- Include request ID in logs
- Environment variables only; no secrets committed

## Milestones
1) API skeleton + health endpoints
2) Sample resource + validation + error standardization
3) Data layer abstraction + chosen database integration
4) Auth enforcement + RBAC sketch
5) Tests + CI checks + security review
"@
New-TextFile -Path (Join-Path $DocsRoot "BACKEND_PLAN.md") -Content $backendPlan

# -------------------------------------------------------------------
# Azure Functions (Node + TypeScript) scaffold
# -------------------------------------------------------------------
Write-Section "Scaffolding Azure Functions API (Node + TypeScript)"

Ensure-Dir (Join-Path $ApiRoot "src")
Ensure-Dir (Join-Path $ApiRoot "src\functions")
Ensure-Dir (Join-Path $ApiRoot "src\shared")

# host.json - standard
New-TextFile -Path (Join-Path $ApiRoot "host.json") -Content @"
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  }
}
"@

# local.settings.json template (do not commit real secrets)
New-TextFile -Path (Join-Path $ApiRoot "local.settings.json") -Content @"
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "NODE_ENV": "development"
  }
}
"@ -NoClobber

# package.json
New-TextFile -Path (Join-Path $ApiRoot "package.json") -Content @"
{
  "name": "toolsinc-swa-api",
  "version": "1.0.0",
  "private": true,
  "main": "dist/src/index.js",
  "scripts": {
    "build": "tsc -p .",
    "start": "func start",
    "typecheck": "tsc -p . --noEmit",
    "test": "node -e \"console.log('tests placeholder'); process.exit(0);\""
  },
  "dependencies": {
    "@azure/functions": "^4.5.0"
  },
  "devDependencies": {
    "typescript": "^5.6.3"
  }
}
"@

# tsconfig.json
New-TextFile -Path (Join-Path $ApiRoot "tsconfig.json") -Content @"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "outDir": "dist",
    "rootDir": ".",
    "strict": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"]
}
"@

# shared helpers
New-TextFile -Path (Join-Path $ApiRoot "src\shared\http.ts") -Content @"
export type ErrorEnvelope = { error: { code: string; message: string; details?: unknown[] } };

export function ok(body: unknown, status = 200) {
  return {
    status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  };
}

export function fail(code: string, message: string, status = 400, details?: unknown[]) {
  const payload: ErrorEnvelope = { error: { code, message, details } };
  return {
    status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  };
}
"@

# healthz function
Ensure-Dir (Join-Path $ApiRoot "src\functions\healthz")
New-TextFile -Path (Join-Path $ApiRoot "src\functions\healthz\function.json") -Content @"
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [ "get" ],
      "route": "healthz"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
"@
New-TextFile -Path (Join-Path $ApiRoot "src\functions\healthz\index.ts") -Content @"
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok } from "../../shared/http";

export async function healthz(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("healthz check");
  return ok({ status: "ok" });
}

app.http("healthz", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "healthz",
  handler: healthz
});
"@

# readyz function
Ensure-Dir (Join-Path $ApiRoot "src\functions\readyz")
New-TextFile -Path (Join-Path $ApiRoot "src\functions\readyz\function.json") -Content @"
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [ "get" ],
      "route": "readyz"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
"@
New-TextFile -Path (Join-Path $ApiRoot "src\functions\readyz\index.ts") -Content @"
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok } from "../../shared/http";

export async function readyz(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  // Wire DB readiness checks later (Cosmos/SQL/Postgres)
  context.log("readyz check");
  return ok({ status: "ready" });
}

app.http("readyz", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "readyz",
  handler: readyz
});
"@

# v1/projects sample (GET/POST)
Ensure-Dir (Join-Path $ApiRoot "src\functions\v1-projects")
New-TextFile -Path (Join-Path $ApiRoot "src\functions\v1-projects\function.json") -Content @"
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [ "get", "post" ],
      "route": "v1/projects"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
"@

New-TextFile -Path (Join-Path $ApiRoot "src\functions\v1-projects\index.ts") -Content @"
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok, fail } from "../../shared/http";

// Temporary in-memory store for local dev (replace with Cosmos/SQL/Postgres)
const projects: { id: string; name: string; createdAt: string }[] = [];

export async function v1Projects(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const method = req.method?.toUpperCase();

  if (method === "GET") {
    return ok({ items: projects });
  }

  if (method === "POST") {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return fail("invalid_json", "Request body must be valid JSON.", 400);
    }

    const name = (body?.name ?? "").toString().trim();
    if (!name) return fail("validation_error", "Field 'name' is required.", 422);

    const item = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString() };
    projects.unshift(item);
    context.log('created project ' + item.id);
    return ok(item, 201);
  }

  return fail("method_not_allowed", "Unsupported method.", 405);
}

app.http("v1-projects", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "v1/projects",
  handler: v1Projects
});
"@

# api README
New-TextFile -Path (Join-Path $ApiRoot "README.md") -Content @"
# SWA API (Azure Functions)

## Local run prerequisites
- Node.js 20+
- Azure Functions Core Tools (func)

## Install + run
``````
cd api
npm install
npm run build
npm start
``````

## Endpoints
- GET  /api/healthz
- GET  /api/readyz
- GET  /api/v1/projects
- POST /api/v1/projects   { "name": "My Project" }

## Notes
In Azure Static Web Apps, requests to /api/* route to this Functions app.
"@

# .gitignore additions for api
$gitignoreContent = @"

# Azure Functions local settings
api/local.settings.json

# Node
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
"@
Add-Content -Path (Join-Path $RootPath ".gitignore") -Value $gitignoreContent

# -------------------------------------------------------------------
# Optional git init
# -------------------------------------------------------------------
if ($InitGit) {
  Write-Section "Initializing git (optional)"
  if (-not (Test-Path (Join-Path $RootPath ".git"))) {
    if (Test-Command "git") {
      Push-Location $RootPath
      git init | Out-Null
      Pop-Location
    }
    else {
      Write-Warning "git not found on PATH; skipping git init."
    }
  }
}

Write-Section "Done"
Write-Host "Created Azure SWA backend scaffold in: api/" -ForegroundColor Green
Write-Host "Created agent kit in: agents/ and tasks/" -ForegroundColor Green
Write-Host ""
Write-Host "Next actions:" -ForegroundColor Cyan
Write-Host "1) cd api; npm install" -ForegroundColor Cyan
Write-Host "2) Install Azure Functions Core Tools if needed, then: npm start" -ForegroundColor Cyan
Write-Host "3) Assign agents by using agents/<role>.json prompts + tasks/backlog" -ForegroundColor Cyan
