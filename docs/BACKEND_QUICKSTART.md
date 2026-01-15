# Backend Quick Start Guide

## Phase 1 Implementation: Replace Mock Authentication (2 Weeks)

This guide provides step-by-step instructions for implementing production-ready authentication to replace the current mock implementation in `lib/auth.tsx`.

---

## Prerequisites

**Required:**
- Azure subscription (free tier works)
- Node.js 20+ and npm
- Azure CLI installed: `brew install azure-cli` (Mac) or [download](https://learn.microsoft.com/cli/azure/install-azure-cli)
- Azure Functions Core Tools: `npm install -g azure-functions-core-tools@4`

**Optional (for local development):**
- Docker Desktop (for local Cosmos DB/Redis emulators)
- Postman or similar API testing tool

---

## Step 1: Provision Azure Resources (30 minutes)

### 1.1 Login to Azure
```bash
az login
az account set --subscription "<your-subscription-id>"
```

### 1.2 Create Resource Group
```bash
# Choose a region close to your users (eastus, westus2, westeurope, etc.)
az group create \
  --name rg-toolsinc-prod \
  --location eastus
```

### 1.3 Create Cosmos DB Account (NoSQL API)
```bash
# This takes ~5 minutes
az cosmosdb create \
  --name cosmos-toolsinc-prod \
  --resource-group rg-toolsinc-prod \
  --default-consistency-level Session \
  --locations regionName=eastus failoverPriority=0 isZoneRedundant=False \
  --enable-free-tier true  # Free tier: 1000 RU/s, 25 GB storage
```

### 1.4 Create Cosmos Database and Containers
```bash
# Create database
az cosmosdb sql database create \
  --account-name cosmos-toolsinc-prod \
  --resource-group rg-toolsinc-prod \
  --name toolsinc-db

# Create Users container (partitioned by userId)
az cosmosdb sql container create \
  --account-name cosmos-toolsinc-prod \
  --database-name toolsinc-db \
  --resource-group rg-toolsinc-prod \
  --name Users \
  --partition-key-path "/id" \
  --throughput 400

# Get connection string (save this!)
az cosmosdb keys list \
  --name cosmos-toolsinc-prod \
  --resource-group rg-toolsinc-prod \
  --type connection-strings \
  --query "connectionStrings[0].connectionString" -o tsv
```

### 1.5 Create Azure Cache for Redis
```bash
# Basic tier: 250 MB, ~$16/month
az redis create \
  --name redis-toolsinc-prod \
  --resource-group rg-toolsinc-prod \
  --location eastus \
  --sku Basic \
  --vm-size c0

# Get Redis connection info (save this!)
az redis list-keys \
  --name redis-toolsinc-prod \
  --resource-group rg-toolsinc-prod
```

### 1.6 Create Azure Key Vault
```bash
az keyvault create \
  --name kv-toolsinc-prod \
  --resource-group rg-toolsinc-prod \
  --location eastus

# Store secrets (replace <values> with actual connection strings from above)
az keyvault secret set \
  --vault-name kv-toolsinc-prod \
  --name CosmosDBConnectionString \
  --value "<cosmos-connection-string>"

az keyvault secret set \
  --vault-name kv-toolsinc-prod \
  --name RedisConnectionString \
  --value "<redis-connection-string>"

# Generate JWT secret (use a strong random string)
az keyvault secret set \
  --vault-name kv-toolsinc-prod \
  --name JWTSecret \
  --value "$(openssl rand -base64 64)"
```

---

## Step 2: Set Up Local Development Environment (15 minutes)

### 2.1 Install Dependencies
```bash
cd api
npm install @azure/cosmos @azure/identity redis argon2 jsonwebtoken
npm install -D @types/jsonwebtoken
```

### 2.2 Configure Local Settings
Create `api/local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_CONNECTION_STRING": "<your-cosmos-connection-string>",
    "REDIS_CONNECTION_STRING": "<your-redis-connection-string>",
    "JWT_SECRET": "<your-jwt-secret>",
    "JWT_ACCESS_EXPIRY": "15m",
    "JWT_REFRESH_EXPIRY": "7d",
    "COOKIE_DOMAIN": "localhost",
    "COOKIE_SECURE": "false"
  },
  "Host": {
    "CORS": "*"
  }
}
```

**IMPORTANT:** Add `api/local.settings.json` to `.gitignore` (should already be there).

### 2.3 Start Local Development Services (Optional)
If you want to develop without using Azure resources:

**Cosmos DB Emulator:**
```bash
docker run -d -p 8081:8081 \
  -e AZURE_COSMOS_EMULATOR_PARTITION_COUNT=10 \
  -e AZURE_COSMOS_EMULATOR_ENABLE_DATA_PERSISTENCE=true \
  --name cosmos-emulator \
  mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest

# Use connection string: AccountEndpoint=https://localhost:8081/;AccountKey=C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==
```

**Redis:**
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
# Use connection string: localhost:6379
```

---

## Step 3: Implement Auth Functions (2 hours)

### 3.1 Create Shared Utilities

**`api/src/shared/database.ts`:**
```typescript
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
const database = client.database("toolsinc-db");

export const usersContainer = database.container("Users");
```

**`api/src/shared/redis.ts`:**
```typescript
import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_CONNECTION_STRING
});

client.on("error", (err) => console.error("Redis Error:", err));
client.connect();

export { client as redis };
```

**`api/src/shared/jwt.ts`:**
```typescript
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || "15m";
const REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

export function generateAccessToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { 
      expiresIn: ACCESS_EXPIRY,
      issuer: "toolsinc-api",
      audience: "toolsinc-web"
    }
  );
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: REFRESH_EXPIRY }
  );
}

export function verifyToken(token: string): { userId: string; role?: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}
```

**`api/src/shared/http.ts`:**
```typescript
import { HttpResponseInit } from "@azure/functions";

export function ok(data: any, status = 200): HttpResponseInit {
  return {
    status,
    jsonBody: data,
    headers: { "Content-Type": "application/json" }
  };
}

export function fail(code: string, message: string, status = 400): HttpResponseInit {
  return {
    status,
    jsonBody: { error: { code, message } }
  };
}

export function setCookie(response: HttpResponseInit, name: string, value: string, maxAge: number) {
  const cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Strict${
    process.env.COOKIE_SECURE === "true" ? "; Secure" : ""
  }`;
  
  response.headers = {
    ...response.headers,
    "Set-Cookie": cookie
  };
}
```

### 3.2 Create Auth Signup Function

**`api/src/functions/auth-signup/index.ts`:**
```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";
import { usersContainer } from "../../shared/database";
import { generateAccessToken, generateRefreshToken } from "../../shared/jwt";
import { ok, fail, setCookie } from "../../shared/http";
import { redis } from "../../shared/redis";

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export async function authSignup(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const body: SignupRequest = await req.json() as any;
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return fail("validation_error", "Missing required fields: email, password, name", 400);
    }

    if (password.length < 8) {
      return fail("validation_error", "Password must be at least 8 characters", 400);
    }

    const emailLower = email.toLowerCase().trim();

    // Check if user exists
    const { resources: existingUsers } = await usersContainer.items
      .query({
        query: "SELECT * FROM c WHERE c.email = @email",
        parameters: [{ name: "@email", value: emailLower }]
      })
      .fetchAll();

    if (existingUsers.length > 0) {
      return fail("user_exists", "Email already registered", 409);
    }

    // Hash password with argon2
    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    });

    // Create user
    const userId = uuid();
    const user = {
      id: userId,
      email: emailLower,
      passwordHash,
      name: name.trim(),
      role: "user",
      status: "active",
      emailVerified: false,
      avatar: null,
      enrolledCourses: [],
      completedLessons: [],
      preferences: {
        notifications: true,
        emailUpdates: true,
        theme: "dark"
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: null
      }
    };

    await usersContainer.items.create(user);
    context.log(`User created: ${userId}`);

    // Generate tokens
    const accessToken = generateAccessToken(userId, user.role);
    const refreshToken = generateRefreshToken(userId);

    // Store refresh token in Redis (7 day TTL)
    await redis.set(`refresh:${refreshToken}`, userId, { EX: 7 * 24 * 60 * 60 });

    // Set cookies
    const response = ok({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar
      },
      accessToken
    }, 201);

    setCookie(response, "refreshToken", refreshToken, 7 * 24 * 60 * 60);

    return response;

  } catch (error: any) {
    context.error("Signup error:", error);
    return fail("server_error", "An error occurred during signup", 500);
  }
}

app.http("auth-signup", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "v1/auth/signup",
  handler: authSignup
});
```

**`api/src/functions/auth-signup/function.json`:**
```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["post"],
      "route": "v1/auth/signup"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

### 3.3 Create Auth Login Function

**`api/src/functions/auth-login/index.ts`:**
```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import argon2 from "argon2";
import { usersContainer } from "../../shared/database";
import { generateAccessToken, generateRefreshToken } from "../../shared/jwt";
import { ok, fail, setCookie } from "../../shared/http";
import { redis } from "../../shared/redis";

interface LoginRequest {
  email: string;
  password: string;
}

export async function authLogin(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const body: LoginRequest = await req.json() as any;
    const { email, password } = body;

    if (!email || !password) {
      return fail("validation_error", "Missing email or password", 400);
    }

    const emailLower = email.toLowerCase().trim();

    // Find user
    const { resources: users } = await usersContainer.items
      .query({
        query: "SELECT * FROM c WHERE c.email = @email",
        parameters: [{ name: "@email", value: emailLower }]
      })
      .fetchAll();

    if (users.length === 0) {
      return fail("invalid_credentials", "Invalid email or password", 401);
    }

    const user = users[0];

    // Verify password
    const isValid = await argon2.verify(user.passwordHash, password);
    if (!isValid) {
      return fail("invalid_credentials", "Invalid email or password", 401);
    }

    // Check account status
    if (user.status === "suspended") {
      return fail("account_suspended", "Your account has been suspended", 403);
    }

    // Update last login
    user.metadata.lastLogin = new Date().toISOString();
    await usersContainer.item(user.id, user.id).replace(user);

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token in Redis
    await redis.set(`refresh:${refreshToken}`, user.id, { EX: 7 * 24 * 60 * 60 });

    context.log(`User logged in: ${user.id}`);

    // Set cookies
    const response = ok({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      accessToken
    });

    setCookie(response, "refreshToken", refreshToken, 7 * 24 * 60 * 60);

    return response;

  } catch (error: any) {
    context.error("Login error:", error);
    return fail("server_error", "An error occurred during login", 500);
  }
}

app.http("auth-login", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "v1/auth/login",
  handler: authLogin
});
```

### 3.4 Create Auth Logout Function

**`api/src/functions/auth-logout/index.ts`:**
```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok, fail, setCookie } from "../../shared/http";
import { redis } from "../../shared/redis";

export async function authLogout(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    // Get refresh token from cookie
    const cookies = req.headers.get("cookie")?.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>) || {};

    const refreshToken = cookies["refreshToken"];

    if (refreshToken) {
      // Delete refresh token from Redis
      await redis.del(`refresh:${refreshToken}`);
      context.log("Refresh token invalidated");
    }

    // Clear cookie
    const response = ok({ message: "Logged out successfully" });
    setCookie(response, "refreshToken", "", 0); // Max-Age=0 deletes cookie

    return response;

  } catch (error: any) {
    context.error("Logout error:", error);
    return fail("server_error", "An error occurred during logout", 500);
  }
}

app.http("auth-logout", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "v1/auth/logout",
  handler: authLogout
});
```

### 3.5 Create Refresh Token Function

**`api/src/functions/auth-refresh/index.ts`:**
```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { usersContainer } from "../../shared/database";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../shared/jwt";
import { ok, fail, setCookie } from "../../shared/http";
import { redis } from "../../shared/redis";

export async function authRefresh(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    // Get refresh token from cookie
    const cookies = req.headers.get("cookie")?.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>) || {};

    const oldRefreshToken = cookies["refreshToken"];

    if (!oldRefreshToken) {
      return fail("missing_token", "No refresh token provided", 401);
    }

    // Verify token
    const decoded = verifyToken(oldRefreshToken);
    if (!decoded) {
      return fail("invalid_token", "Invalid refresh token", 401);
    }

    // Check if token exists in Redis (not revoked)
    const storedUserId = await redis.get(`refresh:${oldRefreshToken}`);
    if (!storedUserId || storedUserId !== decoded.userId) {
      return fail("token_revoked", "Refresh token has been revoked", 401);
    }

    // Get user
    const { resource: user } = await usersContainer.item(decoded.userId, decoded.userId).read();
    if (!user) {
      return fail("user_not_found", "User not found", 404);
    }

    // Generate new tokens (token rotation)
    const newAccessToken = generateAccessToken(user.id, user.role);
    const newRefreshToken = generateRefreshToken(user.id);

    // Store new refresh token and delete old one (token rotation)
    await redis.set(`refresh:${newRefreshToken}`, user.id, { EX: 7 * 24 * 60 * 60 });
    await redis.del(`refresh:${oldRefreshToken}`);

    context.log(`Token refreshed for user: ${user.id}`);

    // Set cookies
    const response = ok({
      accessToken: newAccessToken
    });

    setCookie(response, "refreshToken", newRefreshToken, 7 * 24 * 60 * 60);

    return response;

  } catch (error: any) {
    context.error("Refresh error:", error);
    return fail("server_error", "An error occurred during token refresh", 500);
  }
}

app.http("auth-refresh", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "v1/auth/refresh",
  handler: authRefresh
});
```

---

## Step 4: Update Frontend Auth Context (30 minutes)

**`lib/auth.tsx` (Production Version):**
```typescript
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "/api/v1"; // Azure SWA automatically proxies /api to Functions

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Try to use existing session (refresh token in cookie)
      const response = await fetch(`${API_URL}/users/me`, {
        credentials: "include" // Include httpOnly cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, name })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error?.message || "Signup failed");
        return false;
      }

      const { user: userData } = await response.json();
      setUser(userData);
      return true;
    } catch (err: any) {
      setError(err.message || "Network error");
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error?.message || "Login failed");
        return false;
      }

      const { user: userData } = await response.json();
      setUser(userData);
      return true;
    } catch (err: any) {
      setError(err.message || "Network error");
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

---

## Step 5: Test Locally (15 minutes)

### 5.1 Start Azure Functions
```bash
cd api
npm start
```

You should see:
```
Functions:
  auth-login: [POST] http://localhost:7071/api/v1/auth/login
  auth-logout: [POST] http://localhost:7071/api/v1/auth/logout
  auth-refresh: [POST] http://localhost:7071/api/v1/auth/refresh
  auth-signup: [POST] http://localhost:7071/api/v1/auth/signup
```

### 5.2 Test Signup
```bash
curl -X POST http://localhost:7071/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "name": "Test User"
  }'
```

Expected response:
```json
{
  "user": {
    "id": "abc-123-xyz",
    "email": "test@example.com",
    "name": "Test User",
    "avatar": null
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 5.3 Test Login
```bash
curl -X POST http://localhost:7071/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }' \
  -c cookies.txt  # Save cookies
```

### 5.4 Start Frontend (in separate terminal)
```bash
npm run dev
```

Visit http://localhost:3000/portal/auth and test signup/login through the UI.

---

## Step 6: Deploy to Production (20 minutes)

### 6.1 Configure GitHub Secrets
In your GitHub repository, go to Settings > Secrets and variables > Actions, and add:

```
COSMOS_CONNECTION_STRING=<from Step 1.4>
REDIS_CONNECTION_STRING=<from Step 1.5>
JWT_SECRET=<from Step 1.6>
```

### 6.2 Update Azure Function App Settings
```bash
# Get your function app name from Azure portal or:
FUNCTION_APP_NAME=$(az functionapp list --resource-group rg-toolsinc-prod --query "[0].name" -o tsv)

# Set application settings
az functionapp config appsettings set \
  --name $FUNCTION_APP_NAME \
  --resource-group rg-toolsinc-prod \
  --settings \
    COSMOS_CONNECTION_STRING="@Microsoft.KeyVault(SecretUri=https://kv-toolsinc-prod.vault.azure.net/secrets/CosmosDBConnectionString/)" \
    REDIS_CONNECTION_STRING="@Microsoft.KeyVault(SecretUri=https://kv-toolsinc-prod.vault.azure.net/secrets/RedisConnectionString/)" \
    JWT_SECRET="@Microsoft.KeyVault(SecretUri=https://kv-toolsinc-prod.vault.azure.net/secrets/JWTSecret/)" \
    COOKIE_SECURE="true" \
    COOKIE_DOMAIN=".azurestaticapps.net"
```

### 6.3 Enable Managed Identity (for Key Vault access)
```bash
az functionapp identity assign \
  --name $FUNCTION_APP_NAME \
  --resource-group rg-toolsinc-prod

# Get the identity's principal ID
PRINCIPAL_ID=$(az functionapp identity show \
  --name $FUNCTION_APP_NAME \
  --resource-group rg-toolsinc-prod \
  --query principalId -o tsv)

# Grant Key Vault access
az keyvault set-policy \
  --name kv-toolsinc-prod \
  --object-id $PRINCIPAL_ID \
  --secret-permissions get list
```

### 6.4 Deploy via GitHub Actions
```bash
git add .
git commit -m "feat: implement production authentication"
git push origin main
```

GitHub Actions will automatically:
1. Build the Next.js frontend
2. Build the Azure Functions API
3. Deploy both to Azure Static Web Apps

### 6.5 Verify Deployment
Visit your Azure Static Web Apps URL (e.g., `https://blue-desert-08d808f10.azurestaticapps.net`) and test signup/login.

---

## Step 7: Implement User Profile Endpoint (Bonus, 30 minutes)

**`api/src/shared/auth-middleware.ts`:**
```typescript
import { HttpRequest } from "@azure/functions";
import { verifyToken } from "./jwt";
import { usersContainer } from "./database";

export async function authenticateRequest(req: HttpRequest): Promise<any | null> {
  // Get token from Authorization header
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) return null;

  // Verify JWT
  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Get user from database
  const { resource: user } = await usersContainer.item(decoded.userId, decoded.userId).read();
  return user || null;
}
```

**`api/src/functions/users-me/index.ts`:**
```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { authenticateRequest } from "../../shared/auth-middleware";
import { ok, fail } from "../../shared/http";

export async function usersMe(
  req: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const user = await authenticateRequest(req);

    if (!user) {
      return fail("unauthorized", "Authentication required", 401);
    }

    // Don't return sensitive data
    const { passwordHash, ...safeUser } = user;

    return ok(safeUser);

  } catch (error: any) {
    context.error("Get user error:", error);
    return fail("server_error", "An error occurred", 500);
  }
}

app.http("users-me", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "v1/users/me",
  handler: usersMe
});
```

Update frontend `checkAuth()` function to pass access token:
```typescript
const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`  // Temporary
      },
      credentials: "include"
    });

    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    }
  } catch (err) {
    console.error("Auth check failed:", err);
  } finally {
    setLoading(false);
  }
};
```

---

## Troubleshooting

### Issue: "Cannot connect to Cosmos DB"
**Solution:**
- Verify connection string is correct
- Check firewall settings (allow Azure services)
- Try using IP-based firewall rule temporarily

### Issue: "Redis connection timeout"
**Solution:**
- Check Redis firewall settings
- Verify connection string format: `redis-name.redis.cache.windows.net:6380,password=KEY,ssl=True`
- Enable non-SSL port (6379) for local testing

### Issue: "CORS error when calling API"
**Solution:**
- Ensure `Host.CORS = "*"` in `local.settings.json`
- For production, Azure SWA handles CORS automatically
- Check that API routes start with `/api/v1/`

### Issue: "Function cold start takes too long"
**Solution:**
- Upgrade to Premium plan (eliminates cold starts)
- Enable "Always Ready" instances (1-2 minimum)
- Reduce function bundle size

---

## Next Steps

✅ **Phase 1 Complete!** You now have:
- Production-ready authentication with JWT
- httpOnly cookies for security
- Password hashing with argon2
- Refresh token rotation
- Protected API endpoints

**Proceed to Phase 2:**
- Implement user profile updates (`PATCH /api/v1/users/me`)
- Implement course catalog (`GET /api/v1/courses`)
- Add file upload for avatars
- Set up Redis caching

See `docs/BACKEND_ARCHITECTURE.md` for full implementation roadmap.

---

**Questions?** Open an issue or contact the dev team.
