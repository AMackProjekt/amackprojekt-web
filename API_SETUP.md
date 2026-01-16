# A MackProjekt API - Setup Guide

## New Features Added

### 1. **Azure Functions Backend** ✅
- RESTful API with TypeScript
- Serverless architecture for scalability

### 2. **Azure Cosmos DB Integration** ✅
- NoSQL database for user data
- Collections: users, contacts, sessions

### 3. **Real Authentication System** ✅
- JWT-based authentication
- Secure password hashing with bcrypt
- Endpoints:
  - `POST /api/auth/signup` - Create new user
  - `POST /api/auth/login` - Login and get JWT token

### 4. **Contact Form Backend** ✅
- Save submissions to Cosmos DB
- Email notifications via Azure Communication Services
- Endpoint: `POST /api/contact`

### 5. **Application Insights** ✅
- Performance monitoring
- Error tracking
- User analytics

### 6. **PWA (Progressive Web App)** ✅
- Installable on mobile/desktop
- Offline support with service worker
- App manifest for native-like experience

## Azure Resources Needed

### 1. Create Azure Cosmos DB
```bash
az cosmosdb create \
  --name mackprojekt-db \
  --resource-group mackprojekt-rg \
  --locations regionName="East US"
```

### 2. Create Azure Communication Services (for email)
```bash
az communication create \
  --name mackprojekt-comm \
  --resource-group mackprojekt-rg \
  --data-location "United States"
```

### 3. Create Application Insights
```bash
az monitor app-insights component create \
  --app mackprojekt-insights \
  --location eastus \
  --resource-group mackprojekt-rg
```

## Configuration

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your Azure credentials:**
   - Get Cosmos DB connection from Azure Portal → Cosmos DB → Keys
   - Get Communication Services connection from Azure Portal → Communication Services → Keys
   - Get Application Insights connection from Azure Portal → Application Insights → Properties

3. **Update GitHub Secrets:**
   Add these as repository secrets:
   - `COSMOS_DB_ENDPOINT`
   - `COSMOS_DB_KEY`
   - `JWT_SECRET`
   - `COMMUNICATION_SERVICES_CONNECTION_STRING`
   - `APPLICATIONINSIGHTS_CONNECTION_STRING`

## Local Development

```bash
cd api
npm install
npm run build
npm start
```

API will be available at `http://localhost:7071/api`

## API Endpoints

### Authentication
- **POST** `/api/auth/signup` - Create new user
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }
  ```

- **POST** `/api/auth/login` - Login
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Contact Form
- **POST** `/api/contact` - Submit contact form
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Inquiry",
    "message": "Your message here"
  }
  ```

## Deployment

The API will deploy automatically when you push to GitHub. Make sure to:

1. Enable API deployment in workflow:
   ```yaml
   api_location: "api"
   ```

2. Add environment variables to Azure Static Web App:
   - Go to Azure Portal → Static Web Apps → Configuration
   - Add all environment variables from `.env`

## Next Steps

- [ ] Create Azure resources
- [ ] Configure environment variables
- [ ] Update frontend to use real API endpoints
- [ ] Test authentication flow
- [ ] Test contact form
- [ ] Monitor with Application Insights
- [ ] Install PWA on mobile device

## Security Notes

- Never commit `.env` file
- Rotate JWT_SECRET regularly
- Use Azure Key Vault for production secrets
- Enable CORS for your domain only
- Implement rate limiting
