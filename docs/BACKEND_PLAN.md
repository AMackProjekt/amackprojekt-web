# Backend Plan (Azure Static Web Apps + Azure Functions) - v1

## Objective
Provide a stable API backend integrated with Azure Static Web Apps (SWA) for the Next.js frontend.

## Hosting Model
- Frontend: Azure Static Web Apps
- Backend: Azure Functions (Integrated SWA API) located in /api
- API base: /api/*
- Versioning: /api/v1/*

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
