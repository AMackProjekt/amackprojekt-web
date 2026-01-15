# SWA API (Azure Functions)

## Local run prerequisites
- Node.js 20+
- Azure Functions Core Tools (func)

## Install + run
```
cd api
npm install
npm run build
npm start
```

## Endpoints
- GET  /api/healthz
- GET  /api/readyz
- GET  /api/v1/projects
- POST /api/v1/projects   { "name": "My Project" }

## Notes
In Azure Static Web Apps, requests to /api/* route to this Functions app.
