# T.O.O.L.S Inc & MackChat Backend Architecture Plan

## Executive Summary

This document outlines a comprehensive, production-ready backend architecture for:
1. **T.O.O.L.S Inc Platform** - Learning portal, user management, form submissions
2. **MackChat** - Real-time messaging application

The architecture leverages Azure services (already in use), follows microservices patterns where appropriate, and provides clear migration paths from the current mock implementation.

---

## 1. Technology Stack Recommendations

### 1.1 Backend Framework
**Recommendation: Node.js + TypeScript with Azure Functions v4**

**Rationale:**
- ✅ Already set up (`api/` folder with Azure Functions v4)
- ✅ Seamless Azure Static Web Apps integration (single deployment)
- ✅ Shared TypeScript codebase with frontend (types, validation)
- ✅ Serverless = cost-effective for variable workloads
- ✅ Excellent for justice-involved services (sporadic traffic patterns)
- ✅ Easy scaling without infrastructure management

**Alternative Considered:** ASP.NET Core (C#)
- Pros: Strong typing, mature ecosystem, Azure-native
- Cons: Separate deployment, heavier runtime, steeper learning curve for JS/TS team

### 1.2 Database Strategy
**Primary Database: Azure Cosmos DB (NoSQL) with PostgreSQL hybrid**

| Data Type | Database | Rationale |
|-----------|----------|-----------|
| **User Profiles** | Cosmos DB | Global distribution, flexible schema, high availability |
| **Courses & Content** | Cosmos DB | Document model fits course structure (nested lessons) |
| **Messages (MackChat)** | Cosmos DB | Low-latency reads, partition by conversation_id |
| **Form Submissions** | Azure SQL / Postgres | Relational integrity, reporting, compliance audits |
| **File Metadata** | Cosmos DB | Fast lookups, references to Blob Storage |

**Why Cosmos DB Primary:**
- 99.999% SLA with multi-region writes
- Partition by `userId`, `conversationId` for horizontal scaling
- Change feed for real-time updates (WebSocket broadcasting)
- TTL for automatic message expiration (compliance)

**Why PostgreSQL for Forms:**
- Regulatory compliance (audit trails, GDPR/HIPAA)
- Complex queries for reporting (referral analytics)
- Row-level security for sensitive data

### 1.3 Real-Time Messaging Infrastructure
**Recommendation: Azure Web PubSub (WebSocket managed service)**

**Architecture:**
```
Client (WebSocket) ←→ Azure Web PubSub ←→ Azure Functions (Event Handler)
                            ↓
                      Cosmos DB (Messages)
```

**Why Not SignalR or Socket.io directly:**
- Web PubSub = fully managed, auto-scaling, 100k+ concurrent connections
- No server management for WebSocket state
- Built-in authentication via JWT tokens
- Integrates with Azure Functions via triggers

**Message Flow:**
1. Client connects via WebSocket to Web PubSub
2. User sends message → Function validates & saves to Cosmos DB
3. Function publishes to Web PubSub group (conversation ID)
4. Web PubSub broadcasts to all connected clients in group

### 1.4 Authentication Strategy
**Recommendation: JWT Tokens + Azure AD B2C (hybrid)**

**Tier 1 - Platform Users (Learning Portal):**
- **Azure AD B2C** for identity management
- Social login (Google, Microsoft) + email/password
- Custom policies for user flows (signup, password reset)
- JWT tokens (15min access, 7day refresh)

**Tier 2 - MackChat (Optional External Users):**
- Custom JWT implementation via Azure Functions
- Support for guest/anonymous users (temporary accounts)
- Rate limiting via Azure API Management

**Token Flow:**
```
1. User logs in → Azure Function validates credentials
2. Function calls Azure AD B2C (or custom validator)
3. Returns: { accessToken (JWT), refreshToken, user }
4. Frontend stores in httpOnly cookie (not localStorage)
5. All API calls include Authorization: Bearer <token>
```

**Security Enhancements:**
- ✅ httpOnly, Secure, SameSite cookies (XSS protection)
- ✅ Refresh token rotation (compromise detection)
- ✅ Azure Key Vault for JWT signing keys
- ✅ Token blacklist in Redis for logout/revocation

### 1.5 API Design Pattern
**Recommendation: REST + GraphQL Hybrid**

**REST for CRUD Operations:**
- `/api/v1/auth/*` - Login, signup, refresh
- `/api/v1/users/*` - Profile management
- `/api/v1/courses/*` - Course catalog
- `/api/v1/forms/*` - Contact, interest, referral submissions
- `/api/v1/files/*` - Upload/download

**GraphQL for Complex Queries (Future):**
- Dashboard analytics (multiple data sources)
- Course progress with nested lessons
- MackChat message threads with pagination

**Why Hybrid:**
- REST = simple, cacheable, well-understood
- GraphQL = prevents over-fetching for rich dashboards
- Start with REST, migrate heavy endpoints to GraphQL

### 1.6 Caching Strategy
**Multi-Layer Caching:**

| Layer | Technology | Use Case | TTL |
|-------|-----------|----------|-----|
| **CDN** | Azure Front Door | Static assets, images | 1 year |
| **API Cache** | Azure Redis Cache | Course catalog, user profiles | 5-15 min |
| **Client Cache** | React Query / SWR | Dashboard data, messages | 30 sec |
| **Database** | Cosmos DB partition cache | Hot data (recent messages) | Auto |

**Cache Invalidation:**
- User profile update → Redis DELETE key `user:{userId}`
- New message → No cache (real-time via WebSocket)
- Course content update → Invalidate `courses:*` pattern

### 1.7 File Storage Solution
**Recommendation: Azure Blob Storage (Hot + Cool tiers)**

**Storage Strategy:**
| File Type | Tier | CDN | Max Size |
|-----------|------|-----|----------|
| **User Avatars** | Hot | ✅ Yes | 2 MB |
| **Course Videos** | Hot | ✅ Yes | 500 MB |
| **Course Documents** | Cool | ❌ No | 50 MB |
| **Form Attachments** | Cool | ❌ No | 10 MB |
| **Message Attachments** | Hot | ✅ Yes | 25 MB |

**Upload Flow (Signed URLs):**
```
1. Client requests upload → Function validates file type/size
2. Function generates SAS token (Shared Access Signature)
3. Client uploads directly to Blob Storage (no backend proxy)
4. Client notifies Function → saves metadata to Cosmos DB
```

**Why Signed URLs:**
- Offload bandwidth from Functions (cost savings)
- Parallel uploads (better UX)
- Security (time-limited, scoped permissions)

---

## 2. High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14)                        │
│                    Azure Static Web Apps (CDN)                      │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ Landing  │  │  Portal  │  │ MackChat │  │  Admin Dashboard │  │
│  │  Pages   │  │ (Auth'd) │  │ (WS)     │  │   (Future)       │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
         ┏━━━━━━━━━━▼━━━━━━━━━━┓     ┏━━━━━━━━▼━━━━━━━━┓
         ┃ Azure Front Door    ┃     ┃ Azure Web PubSub ┃
         ┃  (API Gateway)      ┃     ┃  (WebSocket)     ┃
         ┃  - Rate Limiting    ┃     ┃  - 100k+ conns   ┃
         ┃  - WAF Security     ┃     ┃  - Auto-scale    ┃
         ┗━━━━━━━━━┳━━━━━━━━━━┛     ┗━━━━━━━━┳━━━━━━━━━┛
                   │                          │
         ┌─────────┴─────────────────────────┴──────────┐
         │                                                │
┏━━━━━━━━▼━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━▼━━━━━━┓
┃           Azure Functions v4 (Consumption Plan)               ┃
┃                     Node.js 20 + TypeScript                   ┃
┃                                                                ┃
┃  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  ┃
┃  │ Auth Service │  │ User Service │  │  Course Service   │  ┃
┃  │              │  │              │  │                   │  ┃
┃  │ - Login      │  │ - Profile    │  │ - Catalog         │  ┃
┃  │ - Signup     │  │ - Progress   │  │ - Enrollment      │  ┃
┃  │ - Refresh    │  │ - Settings   │  │ - Lessons         │  ┃
┃  └──────────────┘  └──────────────┘  └───────────────────┘  ┃
┃                                                                ┃
┃  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  ┃
┃  │ Form Service │  │ File Service │  │ Message Service   │  ┃
┃  │              │  │              │  │                   │  ┃
┃  │ - Contact    │  │ - Upload     │  │ - Send/Receive    │  ┃
┃  │ - Interest   │  │ - Download   │  │ - Conversations   │  ┃
┃  │ - Referral   │  │ - Delete     │  │ - Typing Status   │  ┃
┃  └──────────────┘  └──────────────┘  └───────────────────┘  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
                         │
         ┌───────────────┼───────────────┐
         │               │               │
┏━━━━━━━━▼━━━━━━━┓ ┏━━━━▼━━━━━┓ ┏━━━━━▼━━━━━━━┓
┃ Azure Cosmos DB┃ ┃ Azure SQL┃ ┃ Azure Redis ┃
┃  (NoSQL)       ┃ ┃ Database ┃ ┃   Cache     ┃
┃                ┃ ┃          ┃ ┃             ┃
┃ - Users        ┃ ┃ - Forms  ┃ ┃ - Sessions  ┃
┃ - Courses      ┃ ┃ - Audits ┃ ┃ - API Cache ┃
┃ - Messages     ┃ ┃ - Reports┃ ┃ - Counters  ┃
┃ - Files Meta   ┃ ┃          ┃ ┃             ┃
┗━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━┛ ┗━━━━━━━━━━━━━┛

         ┏━━━━━━━━━━━━━━━━━━┓       ┏━━━━━━━━━━━━━━━━━━┓
         ┃ Azure Blob Store ┃       ┃ Azure Key Vault  ┃
         ┃                  ┃       ┃                  ┃
         ┃ - Avatars        ┃       ┃ - JWT Keys       ┃
         ┃ - Course Videos  ┃       ┃ - DB Strings     ┃
         ┃ - Documents      ┃       ┃ - API Secrets    ┃
         ┃ - Attachments    ┃       ┃ - Encryption     ┃
         ┗━━━━━━━━━━━━━━━━━━┛       ┗━━━━━━━━━━━━━━━━━━┛

         ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
         ┃      Azure Application Insights           ┃
         ┃   - Logging | Metrics | Alerts | Tracing  ┃
         ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 3. Detailed Service Architecture

### 3.1 Authentication Service

**Endpoints:**
```typescript
POST   /api/v1/auth/signup          // Create new account
POST   /api/v1/auth/login           // Email/password login
POST   /api/v1/auth/social          // OAuth (Google, Microsoft)
POST   /api/v1/auth/refresh         // Refresh access token
POST   /api/v1/auth/logout          // Invalidate refresh token
POST   /api/v1/auth/forgot-password // Send reset email
POST   /api/v1/auth/reset-password  // Confirm reset with token
GET    /api/v1/auth/verify-email    // Email verification link
```

**Data Models:**
```typescript
// Cosmos DB - Users Collection
{
  id: string;                    // Partition key
  email: string;                 // Unique, lowercase
  passwordHash: string;          // bcrypt/argon2
  name: string;
  avatar?: string;               // Blob Storage URL
  role: "user" | "admin" | "mentor";
  status: "active" | "suspended" | "pending_verification";
  emailVerified: boolean;
  enrolledCourses: string[];     // Course IDs
  completedLessons: string[];    // Lesson IDs
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: "dark" | "light";
  };
  metadata: {
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    ip?: string;                 // For security audits
  };
}

// Redis - Refresh Tokens (key: token, value: userId, TTL: 7 days)
{
  userId: string;
  deviceId: string;              // Track multiple devices
  expiresAt: Date;
}

// Redis - Blacklisted Tokens (key: accessToken, TTL: token expiry)
{
  reason: "logout" | "security";
  timestamp: Date;
}
```

**Security Implementation:**
```typescript
// Password Hashing (argon2id recommended over bcrypt)
import argon2 from "argon2";

async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,      // 64 MB
    timeCost: 3,            // Iterations
    parallelism: 4,
  });
}

// JWT Generation (access token)
import jwt from "jsonwebtoken";

function generateAccessToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,        // From Key Vault
    { 
      expiresIn: "15m",
      issuer: "tools-inc-api",
      audience: "tools-inc-web"
    }
  );
}

// Middleware for protected routes
async function authenticate(req: HttpRequest): Promise<User | null> {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return null;
  
  // Check blacklist
  const isBlacklisted = await redis.exists(`blacklist:${token}`);
  if (isBlacklisted) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await getUserById(decoded.userId);
  } catch {
    return null;
  }
}
```

### 3.2 User Service

**Endpoints:**
```typescript
GET    /api/v1/users/me                    // Current user profile
PATCH  /api/v1/users/me                    // Update profile
GET    /api/v1/users/me/progress           // Course progress
POST   /api/v1/users/me/avatar             // Upload avatar
DELETE /api/v1/users/me                    // Delete account (GDPR)
GET    /api/v1/users/me/activity           // Activity log
```

**Data Models:**
```typescript
// Cosmos DB - User Progress Collection
{
  id: string;                    // userId (partition key)
  courses: {
    [courseId: string]: {
      enrolledAt: Date;
      progress: number;          // 0-100
      completedLessons: string[];
      lastAccessedAt: Date;
      timeSpent: number;         // Minutes
    };
  };
  achievements: {
    id: string;
    title: string;
    unlockedAt: Date;
  }[];
  stats: {
    totalCoursesCompleted: number;
    totalLessonsCompleted: number;
    totalTimeSpent: number;
    loginStreak: number;         // Consecutive days
    lastLoginAt: Date;
  };
}
```

### 3.3 Course Service

**Endpoints:**
```typescript
GET    /api/v1/courses                     // List all courses
GET    /api/v1/courses/:id                 // Course details
POST   /api/v1/courses/:id/enroll          // Enroll in course
GET    /api/v1/courses/:id/lessons         // List lessons
GET    /api/v1/courses/:id/lessons/:lid    // Lesson content
POST   /api/v1/courses/:id/lessons/:lid/complete // Mark complete
```

**Data Models:**
```typescript
// Cosmos DB - Courses Collection
{
  id: string;                    // Partition key
  title: string;
  description: string;
  category: "job-readiness" | "education" | "life-skills" | "tech";
  thumbnail: string;             // Blob Storage URL
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  duration: number;              // Minutes
  level: "beginner" | "intermediate" | "advanced";
  lessons: {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;           // Blob Storage URL
    duration: number;
    order: number;
    content: string;             // Markdown
    resources: {
      title: string;
      url: string;
      type: "pdf" | "link" | "download";
    }[];
  }[];
  metadata: {
    enrolledCount: number;
    completionRate: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
```

### 3.4 Message Service (MackChat)

**Endpoints:**
```typescript
// REST Endpoints
GET    /api/v1/conversations               // User's conversations
POST   /api/v1/conversations               // Create conversation
GET    /api/v1/conversations/:id           // Get conversation details
GET    /api/v1/conversations/:id/messages  // List messages (paginated)
POST   /api/v1/conversations/:id/messages  // Send message
DELETE /api/v1/messages/:id                // Delete message
POST   /api/v1/conversations/:id/read      // Mark as read
POST   /api/v1/conversations/:id/typing    // Typing indicator

// WebSocket Events (via Azure Web PubSub)
- message.new                              // New message received
- message.deleted                          // Message deleted
- typing.start                             // User started typing
- typing.stop                              // User stopped typing
- conversation.updated                     // Conversation metadata changed
```

**Data Models:**
```typescript
// Cosmos DB - Conversations Collection (partitioned by conversationId)
{
  id: string;                    // conversationId (partition key)
  type: "direct" | "group";
  participants: {
    userId: string;
    name: string;
    avatar: string;
    role: "admin" | "member";
    joinedAt: Date;
  }[];
  metadata: {
    name?: string;               // For group chats
    avatar?: string;             // Group avatar
    lastMessage: {
      text: string;
      senderId: string;
      timestamp: Date;
    };
    unreadCount: {               // Per user
      [userId: string]: number;
    };
    createdAt: Date;
    updatedAt: Date;
  };
}

// Cosmos DB - Messages Collection (partitioned by conversationId)
{
  id: string;                    // messageId
  conversationId: string;        // Partition key (enables efficient queries)
  senderId: string;
  text: string;
  attachments: {
    id: string;
    name: string;
    url: string;                 // Blob Storage URL
    size: number;
    mimeType: string;
  }[];
  metadata: {
    readBy: {                    // Track read receipts
      [userId: string]: Date;
    };
    editedAt?: Date;
    deletedAt?: Date;            // Soft delete
    timestamp: Date;
  };
  ttl?: number;                  // Auto-delete after N seconds (optional)
}
```

**WebSocket Connection Flow:**
```typescript
// 1. Client connects to Web PubSub
const connection = new WebSocket(
  "wss://mackchat.webpubsub.azure.com/client/hubs/mackchat",
  { headers: { Authorization: `Bearer ${accessToken}` } }
);

// 2. Server-side: Azure Function handles WebSocket events
import { app, InvocationContext } from "@azure/functions";

// WebSocket connect event
app.generic("webpubsub-connect", {
  trigger: { type: "webPubSubTrigger", eventName: "connect" },
  handler: async (request, context) => {
    const userId = request.connectionContext.userId;
    await redis.sadd(`online_users`, userId);  // Track online status
    return { success: true };
  }
});

// WebSocket message event
app.generic("webpubsub-message", {
  trigger: { type: "webPubSubTrigger", eventName: "message" },
  handler: async (request, context) => {
    const { conversationId, text, attachments } = request.data;
    const senderId = request.connectionContext.userId;
    
    // Save to Cosmos DB
    const message = await saveMessage({
      conversationId,
      senderId,
      text,
      attachments,
      timestamp: new Date()
    });
    
    // Broadcast to conversation group
    await webPubSubService.sendToGroup(conversationId, {
      event: "message.new",
      data: message
    });
    
    return { success: true };
  }
});
```

### 3.5 Form Service

**Endpoints:**
```typescript
POST   /api/v1/forms/contact               // Contact form submission
POST   /api/v1/forms/interest              // Interest form submission
POST   /api/v1/forms/referral              // Referral form submission
GET    /api/v1/forms/:id                   // Get submission (admin)
GET    /api/v1/forms                       // List submissions (admin)
```

**Data Models:**
```typescript
// Azure SQL / PostgreSQL - Forms Table (relational for compliance)
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type VARCHAR(50) NOT NULL,           -- 'contact', 'interest', 'referral'
  data JSONB NOT NULL,                       -- Form fields (flexible)
  attachments JSONB,                         -- Array of file URLs
  metadata JSONB,                            -- IP, user agent, referrer
  status VARCHAR(20) DEFAULT 'pending',      -- 'pending', 'reviewed', 'resolved'
  assigned_to UUID REFERENCES users(id),     -- Admin assignment
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_form_type ON form_submissions(form_type);
CREATE INDEX idx_status ON form_submissions(status);
CREATE INDEX idx_created_at ON form_submissions(created_at DESC);

-- Example data for referral form
{
  "form_type": "referral",
  "data": {
    "referrer_name": "John Doe",
    "referrer_email": "john@example.com",
    "referrer_phone": "555-0123",
    "participant_name": "Jane Smith",
    "participant_contact": "jane@example.com",
    "services_needed": ["job-readiness", "housing"],
    "notes": "Recently released, needs immediate support"
  },
  "attachments": [
    {
      "name": "referral_form.pdf",
      "url": "https://storage.blob.core.windows.net/forms/abc123.pdf",
      "size": 102400
    }
  ],
  "metadata": {
    "ip": "203.0.113.42",
    "user_agent": "Mozilla/5.0...",
    "submitted_from": "/referral"
  }
}
```

### 3.6 File Service

**Endpoints:**
```typescript
POST   /api/v1/files/upload-url            // Get signed upload URL
POST   /api/v1/files/complete              // Confirm upload completion
GET    /api/v1/files/:id                   // Get file metadata
DELETE /api/v1/files/:id                   // Delete file
```

**Upload Flow (Direct to Blob Storage):**
```typescript
// Step 1: Client requests upload URL
const response = await fetch("/api/v1/files/upload-url", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}` },
  body: JSON.stringify({
    fileName: "avatar.jpg",
    fileType: "image/jpeg",
    fileSize: 204800,
    category: "avatar"
  })
});

// Server generates SAS token
import { BlobServiceClient, generateBlobSASQueryParameters } from "@azure/storage-blob";

async function generateUploadUrl(fileName: string, fileType: string) {
  const blobClient = containerClient.getBlockBlobClient(fileName);
  const sasToken = generateBlobSASQueryParameters({
    containerName: "uploads",
    blobName: fileName,
    permissions: "cw",              // Create, Write
    startsOn: new Date(),
    expiresOn: new Date(Date.now() + 15 * 60 * 1000), // 15 min
  }, sharedKeyCredential);
  
  return `${blobClient.url}?${sasToken}`;
}

// Step 2: Client uploads directly to Blob Storage
await fetch(uploadUrl, {
  method: "PUT",
  headers: { "x-ms-blob-type": "BlockBlob" },
  body: file
});

// Step 3: Client notifies backend to save metadata
await fetch("/api/v1/files/complete", {
  method: "POST",
  body: JSON.stringify({
    fileId: "abc123",
    fileName: "avatar.jpg",
    url: uploadUrl.split("?")[0]
  })
});
```

---

## 4. Security Considerations

### 4.1 OWASP Top 10 Mitigations

| Threat | Mitigation |
|--------|-----------|
| **Injection** | Parameterized queries, input validation with Zod/Joi |
| **Broken Auth** | argon2id hashing, JWT rotation, httpOnly cookies |
| **Sensitive Data** | Encryption at rest (Cosmos DB), TLS 1.3 in transit |
| **XXE** | Disable XML parsing, use JSON exclusively |
| **Broken Access Control** | Role-based authorization, row-level security |
| **Security Misconfiguration** | Azure Security Center, least-privilege IAM |
| **XSS** | Content Security Policy, sanitize inputs |
| **Insecure Deserialization** | Validate JSON schemas before parsing |
| **Known Vulnerabilities** | Dependabot alerts, automated npm audit |
| **Insufficient Logging** | Application Insights with alerting |

### 4.2 Rate Limiting Strategy

**Implementation via Azure API Management:**
```xml
<!-- Apply per-IP rate limiting -->
<policies>
  <inbound>
    <rate-limit-by-key calls="100" renewal-period="60" 
                       counter-key="@(context.Request.IpAddress)" />
    
    <!-- Stricter limits for auth endpoints -->
    <choose>
      <when condition="@(context.Request.Url.Path.StartsWith('/api/v1/auth'))">
        <rate-limit-by-key calls="5" renewal-period="60" 
                           counter-key="@(context.Request.IpAddress)" />
      </when>
    </choose>
  </inbound>
</policies>
```

### 4.3 Data Encryption

**At Rest:**
- Cosmos DB: Automatic encryption (AES-256)
- Blob Storage: Server-side encryption enabled
- Azure SQL: Transparent Data Encryption (TDE)

**In Transit:**
- TLS 1.3 required for all HTTPS connections
- WebSocket connections over WSS (TLS)
- Azure Front Door enforces HTTPS redirect

**Secrets Management:**
- Azure Key Vault for all sensitive configuration
- Managed Identity for Functions (no connection strings)
- Automatic key rotation (90 days)

### 4.4 Compliance (GDPR/HIPAA)

**GDPR Requirements:**
- Right to access: `GET /api/v1/users/me/data-export`
- Right to deletion: `DELETE /api/v1/users/me`
- Data minimization: TTL on messages, automatic log purging
- Consent tracking: Store in user preferences

**HIPAA Considerations (if handling health data):**
- BAA (Business Associate Agreement) with Azure
- Audit logs in Azure SQL (immutable)
- PHI encryption in Cosmos DB (customer-managed keys)
- Access controls (role-based, least privilege)

---

## 5. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
**Goal: Replace mock authentication with production-ready auth**

**Tasks:**
- [ ] Set up Azure Cosmos DB account (Free tier: 1000 RU/s)
- [ ] Set up Azure Redis Cache (Basic tier: 250 MB)
- [ ] Set up Azure Key Vault
- [ ] Implement Auth Service functions:
  - [ ] `POST /api/v1/auth/signup` (with argon2 hashing)
  - [ ] `POST /api/v1/auth/login` (JWT generation)
  - [ ] `POST /api/v1/auth/refresh` (token rotation)
  - [ ] `POST /api/v1/auth/logout` (token blacklisting)
- [ ] Update frontend `lib/auth.tsx` to call real API
- [ ] Implement JWT middleware for protected routes
- [ ] Add httpOnly cookie support (replace localStorage)

**Deliverables:**
- Secure authentication flow (no localStorage)
- User registration/login working end-to-end
- JWT-based authorization

**Testing:**
```bash
# Test signup
curl -X POST https://your-site.azurestaticapps.net/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!","name":"Test User"}'

# Test login
curl -X POST https://your-site.azurestaticapps.net/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'
```

### Phase 2: User & Course Management (Weeks 3-4)
**Goal: Enable profile management and course catalog**

**Tasks:**
- [ ] Implement User Service functions:
  - [ ] `GET /api/v1/users/me` (profile retrieval)
  - [ ] `PATCH /api/v1/users/me` (profile updates)
  - [ ] `GET /api/v1/users/me/progress` (course progress)
- [ ] Implement Course Service functions:
  - [ ] `GET /api/v1/courses` (catalog with caching)
  - [ ] `GET /api/v1/courses/:id` (course details)
  - [ ] `POST /api/v1/courses/:id/enroll` (enrollment)
  - [ ] `GET /api/v1/courses/:id/lessons/:lid` (lesson content)
  - [ ] `POST /api/v1/courses/:id/lessons/:lid/complete` (progress tracking)
- [ ] Set up Azure Blob Storage (Hot tier)
- [ ] Implement file upload (avatars, course thumbnails)
- [ ] Update frontend portal pages to use real data
- [ ] Implement Redis caching for course catalog

**Deliverables:**
- Functional user dashboard with real data
- Course enrollment and progress tracking
- Avatar upload working

### Phase 3: Form Submissions & File Handling (Week 5)
**Goal: Production-ready form processing**

**Tasks:**
- [ ] Set up Azure SQL Database (or Azure Database for PostgreSQL)
- [ ] Create `form_submissions` table with audit columns
- [ ] Implement Form Service functions:
  - [ ] `POST /api/v1/forms/contact`
  - [ ] `POST /api/v1/forms/interest`
  - [ ] `POST /api/v1/forms/referral`
- [ ] Implement file uploads for form attachments
- [ ] Add email notifications (Azure Communication Services)
- [ ] Create admin endpoints for form review (if needed)

**Deliverables:**
- All public forms saving to database
- Email notifications on submission
- File attachments working

### Phase 4: Real-Time Messaging (MackChat) (Weeks 6-8)
**Goal: Launch MackChat MVP**

**Tasks:**
- [ ] Set up Azure Web PubSub (Free tier: 20 units)
- [ ] Implement Message Service functions:
  - [ ] `POST /api/v1/conversations` (create conversation)
  - [ ] `GET /api/v1/conversations` (list user conversations)
  - [ ] `POST /api/v1/conversations/:id/messages` (send message)
  - [ ] `GET /api/v1/conversations/:id/messages` (paginated)
- [ ] Implement WebSocket handlers:
  - [ ] `connect` - User authentication
  - [ ] `message` - Real-time message broadcasting
  - [ ] `typing` - Typing indicators
  - [ ] `disconnect` - Cleanup
- [ ] Build MackChat frontend UI (conversation list, message threads)
- [ ] Implement file sharing in messages
- [ ] Add message search (Cosmos DB full-text)

**Deliverables:**
- Functional 1-on-1 messaging
- Real-time message delivery (< 100ms latency)
- File sharing in chats
- Typing indicators

### Phase 5: Optimization & Monitoring (Week 9)
**Goal: Production-ready with observability**

**Tasks:**
- [ ] Set up Azure Application Insights
- [ ] Implement structured logging (all functions)
- [ ] Add performance monitoring (custom metrics)
- [ ] Set up alerting:
  - [ ] API error rate > 5%
  - [ ] Response time > 1s (P95)
  - [ ] Auth failures > 10/min
- [ ] Implement health checks:
  - [ ] `/api/healthz` (existing)
  - [ ] `/api/readyz` (existing)
- [ ] Load testing (Azure Load Testing)
- [ ] Optimize database queries (add indexes)
- [ ] Implement Azure Front Door (CDN + WAF)

**Deliverables:**
- Full observability stack
- Alert system for incidents
- Performance baseline established

### Phase 6: Advanced Features (Weeks 10+)
**Goal: Scale and enhance**

**Tasks:**
- [ ] Group messaging (MackChat)
- [ ] Video calls (Azure Communication Services)
- [ ] Push notifications (Azure Notification Hubs)
- [ ] GraphQL API for dashboards
- [ ] Multi-region deployment (Cosmos DB global distribution)
- [ ] Admin dashboard for platform management
- [ ] Analytics and reporting (Power BI integration)
- [ ] AI chatbot improvements (Azure OpenAI integration)

---

## 6. Cost Estimation (Azure)

### Monthly Costs (Startup Scale: 1,000 active users)

| Service | Tier | Usage | Cost/Month |
|---------|------|-------|-----------|
| **Static Web Apps** | Free | 100 GB bandwidth | $0 |
| **Azure Functions** | Consumption | 1M requests, 400k GB-s | $0 (free tier) |
| **Cosmos DB** | Serverless | 10 GB storage, 50M RUs | $25 |
| **Azure SQL Database** | Basic | 2 GB storage | $5 |
| **Redis Cache** | Basic C0 | 250 MB | $16 |
| **Blob Storage** | Hot tier | 50 GB storage, 10k ops | $2 |
| **Web PubSub** | Free | 20 concurrent units | $0 |
| **Key Vault** | Standard | 10k operations | $1 |
| **Application Insights** | Pay-as-you-go | 5 GB logs/month | $0 (free tier) |
| **Front Door** | Standard | 100 GB bandwidth | $35 |
| **Total** | | | **~$84/month** |

### Growth Scale (10,000 active users)

| Service | Tier | Usage | Cost/Month |
|---------|------|-------|-----------|
| **Static Web Apps** | Standard | 1 TB bandwidth | $9 |
| **Azure Functions** | Consumption | 10M requests, 4M GB-s | $20 |
| **Cosmos DB** | Provisioned | 50 GB storage, 400 RU/s | $95 |
| **Azure SQL Database** | Standard S2 | 10 GB storage | $75 |
| **Redis Cache** | Standard C1 | 1 GB | $75 |
| **Blob Storage** | Hot + Cool | 500 GB storage | $15 |
| **Web PubSub** | Standard | 100 units | $49 |
| **Key Vault** | Standard | 100k operations | $3 |
| **Application Insights** | Pay-as-you-go | 50 GB logs/month | $115 |
| **Front Door** | Standard | 1 TB bandwidth | $135 |
| **Total** | | | **~$591/month** |

**Cost Optimization Tips:**
- Use Cosmos DB serverless until consistent throughput (cheaper for variable workloads)
- Enable auto-scale on Functions (scale to zero during off-hours)
- Implement aggressive caching (reduce database queries by 70%)
- Use Cool tier for archival data (form attachments > 30 days old)
- Monitor with Azure Cost Management (set budgets and alerts)

---

## 7. Migration Plan from Mock Auth

### Step-by-Step Migration (Zero Downtime)

**Step 1: Deploy Backend Infrastructure (Week 1)**
```bash
# 1. Create resource group
az group create --name rg-toolsinc-prod --location eastus

# 2. Create Cosmos DB account
az cosmosdb create --name cosmos-toolsinc-prod --resource-group rg-toolsinc-prod

# 3. Create Redis Cache
az redis create --name redis-toolsinc-prod --resource-group rg-toolsinc-prod --sku Basic --vm-size C0

# 4. Create Key Vault
az keyvault create --name kv-toolsinc-prod --resource-group rg-toolsinc-prod

# 5. Deploy Functions (already integrated with Azure SWA)
cd api && npm run build && func azure functionapp publish <function-app-name>
```

**Step 2: Implement Auth API (Week 1-2)**
```typescript
// api/src/functions/auth-signup/index.ts
import { app, HttpRequest, HttpResponseInit } from "@azure/functions";
import argon2 from "argon2";
import { v4 as uuid } from "uuid";

export async function authSignup(req: HttpRequest): Promise<HttpResponseInit> {
  const { email, password, name } = await req.json();
  
  // Validate input
  if (!email || !password || !name) {
    return { status: 400, jsonBody: { error: "Missing required fields" } };
  }
  
  // Check if user exists
  const existingUser = await cosmosContainer.items
    .query({ query: "SELECT * FROM c WHERE c.email = @email", parameters: [{ name: "@email", value: email.toLowerCase() }] })
    .fetchNext();
  
  if (existingUser.resources.length > 0) {
    return { status: 409, jsonBody: { error: "Email already registered" } };
  }
  
  // Hash password
  const passwordHash = await argon2.hash(password);
  
  // Create user
  const user = {
    id: uuid(),
    email: email.toLowerCase(),
    passwordHash,
    name,
    role: "user",
    status: "active",
    emailVerified: false,
    enrolledCourses: [],
    completedLessons: [],
    preferences: { notifications: true, emailUpdates: true, theme: "dark" },
    metadata: { createdAt: new Date(), lastLogin: null }
  };
  
  await cosmosContainer.items.create(user);
  
  // Generate tokens
  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);
  
  // Store refresh token in Redis
  await redis.set(`refresh:${refreshToken}`, user.id, "EX", 7 * 24 * 60 * 60);
  
  return {
    status: 201,
    jsonBody: { 
      user: { id: user.id, email: user.email, name: user.name },
      accessToken,
      refreshToken
    }
  };
}

app.http("auth-signup", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "v1/auth/signup",
  handler: authSignup
});
```

**Step 3: Update Frontend Auth Context (Week 2)**
```typescript
// lib/auth.tsx (Updated)
"use client";
import { createContext, useContext, useState, useEffect } from "react";

// API base URL (automatically uses /api for Azure SWA)
const API_URL = "/api/v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        credentials: "include" // Include httpOnly cookies
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, name })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Signup failed");
      }
      
      const { user } = await response.json();
      setUser(user);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) return false;
      
      const { user } = await response.json();
      setUser(user);
      return true;
    } catch (error) {
      console.error("Login error:", error);
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

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Step 4: Feature Flag Rollout (Week 2)**
```typescript
// Gradual rollout with feature flag
const USE_REAL_AUTH = process.env.NEXT_PUBLIC_ENABLE_REAL_AUTH === "true";

const signup = async (email: string, password: string, name: string) => {
  if (USE_REAL_AUTH) {
    // Call real API
    return await signupWithAPI(email, password, name);
  } else {
    // Use mock implementation
    return await mockSignup(email, password, name);
  }
};
```

**Step 5: Data Migration (if needed)**
```typescript
// Migrate existing localStorage users to Cosmos DB
async function migrateLocalStorageUsers() {
  const users = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("pwd-")) {
      const email = key.replace("pwd-", "");
      const password = atob(localStorage.getItem(key) || "");
      users.push({ email, password });
    }
  }
  
  // Bulk import to backend
  await fetch("/api/v1/admin/migrate-users", {
    method: "POST",
    body: JSON.stringify({ users })
  });
  
  // Clear localStorage
  localStorage.clear();
}
```

---

## 8. Development Workflow

### Local Development Setup
```bash
# 1. Install Azure Functions Core Tools
npm install -g azure-functions-core-tools@4

# 2. Install dependencies
cd api && npm install
cd .. && npm install

# 3. Set up local environment variables (api/local.settings.json)
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "COSMOS_ENDPOINT": "https://localhost:8081",  # Cosmos DB Emulator
    "COSMOS_KEY": "<emulator-key>",
    "REDIS_HOST": "localhost",
    "REDIS_PORT": "6379",
    "JWT_SECRET": "your-dev-secret-change-in-production"
  }
}

# 4. Start Cosmos DB Emulator (Docker)
docker run -p 8081:8081 -p 10251:10251 -p 10252:10252 \
  mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest

# 5. Start Redis (Docker)
docker run -d -p 6379:6379 redis:alpine

# 6. Start Azure Functions
cd api && npm start

# 7. Start Next.js (in separate terminal)
npm run dev
```

### CI/CD Pipeline (GitHub Actions)
```yaml
# .github/workflows/azure-deploy.yml (Enhanced)
name: Deploy to Azure

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Frontend build
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build frontend
        run: npm run build
        env:
          NODE_OPTIONS: --max_old_space_size=4096
      
      # Backend build
      - name: Build API
        run: cd api && npm ci && npm run build
      
      # Run tests
      - name: Run API tests
        run: cd api && npm test
      
      # Deploy to Azure Static Web Apps
      - name: Deploy to Azure
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "out"
          api_location: "api"
          skip_app_build: true
      
      # Database migrations (if using SQL)
      - name: Run database migrations
        run: |
          cd api
          npx prisma migrate deploy  # If using Prisma
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 9. Monitoring & Observability

### Application Insights Configuration
```typescript
// api/src/shared/telemetry.ts
import appInsights from "applicationinsights";

appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .start();

export const client = appInsights.defaultClient;

// Custom tracking
export function trackEvent(name: string, properties?: Record<string, any>) {
  client.trackEvent({ name, properties });
}

export function trackMetric(name: string, value: number) {
  client.trackMetric({ name, value });
}
```

### Key Metrics to Track
```typescript
// In each function
import { trackEvent, trackMetric } from "../../shared/telemetry";

export async function handler(req: HttpRequest) {
  const startTime = Date.now();
  
  try {
    // Business logic
    const result = await processRequest(req);
    
    // Track success
    trackEvent("auth.login.success", { userId: result.userId });
    trackMetric("auth.login.duration", Date.now() - startTime);
    
    return { status: 200, jsonBody: result };
  } catch (error) {
    // Track error
    trackEvent("auth.login.error", { 
      error: error.message,
      stack: error.stack
    });
    
    return { status: 500, jsonBody: { error: "Internal server error" } };
  }
}
```

### Alert Rules (Azure Portal)
```json
{
  "alerts": [
    {
      "name": "High Error Rate",
      "condition": "requests/failed > 5% over 5 minutes",
      "action": "Send email to ops@toolsinc.org"
    },
    {
      "name": "Slow Response Time",
      "condition": "requests/duration (P95) > 1000ms over 10 minutes",
      "action": "Create incident in PagerDuty"
    },
    {
      "name": "Auth Failures Spike",
      "condition": "customEvents/auth.login.error > 10 over 1 minute",
      "action": "Send SMS to on-call engineer"
    },
    {
      "name": "Database Throttling",
      "condition": "dependencies/cosmos-db/429 > 0 over 5 minutes",
      "action": "Auto-scale Cosmos DB RU/s"
    }
  ]
}
```

---

## 10. Security Checklist

Before going to production, ensure:

### Authentication & Authorization
- [ ] Passwords hashed with argon2id (not bcrypt)
- [ ] JWT tokens stored in httpOnly, Secure, SameSite cookies
- [ ] Refresh token rotation implemented
- [ ] Token blacklist for logout/revocation
- [ ] Rate limiting on auth endpoints (5 req/min per IP)
- [ ] Account lockout after 5 failed login attempts
- [ ] Email verification required before full access
- [ ] Password reset with time-limited tokens (15 min expiry)

### Data Protection
- [ ] TLS 1.3 enforced (no TLS 1.2 or lower)
- [ ] Cosmos DB encryption at rest enabled
- [ ] Azure Key Vault for all secrets (no env vars)
- [ ] Managed Identity for Functions (no connection strings)
- [ ] PII fields encrypted (if applicable)
- [ ] GDPR compliance (data export, deletion endpoints)

### API Security
- [ ] CORS configured (whitelist only your domains)
- [ ] Content Security Policy headers
- [ ] Input validation on all endpoints (Zod/Joi schemas)
- [ ] SQL injection protection (parameterized queries)
- [ ] NoSQL injection protection (sanitize Cosmos queries)
- [ ] File upload validation (type, size, malware scan)
- [ ] Rate limiting via API Management
- [ ] Azure WAF (Web Application Firewall) enabled

### Infrastructure
- [ ] Azure Security Center enabled (threat detection)
- [ ] DDoS Protection enabled (Standard tier for production)
- [ ] Network Security Groups configured
- [ ] Private endpoints for Cosmos DB (no public access)
- [ ] VNet integration for Functions (if needed)
- [ ] Regular security audits (quarterly)
- [ ] Incident response plan documented

### Monitoring
- [ ] Application Insights with alerting
- [ ] Failed login attempts logged
- [ ] Sensitive actions audited (password changes, deletions)
- [ ] Anomaly detection enabled (ML-based)
- [ ] Log retention policy (90 days minimum)

---

## 11. FAQ & Troubleshooting

### Q: Why Azure Functions over Express.js on App Service?
**A:** Serverless = pay only for execution time, auto-scaling, zero server management. For variable workloads (justice services have unpredictable traffic), Functions are 60-80% cheaper than always-on App Service.

### Q: Why Cosmos DB over PostgreSQL for everything?
**A:** Cosmos DB excels at global distribution, low-latency reads, and flexible schemas (great for user profiles, courses). PostgreSQL is better for relational data (forms, reporting). Use both strategically.

### Q: How to handle Function cold starts?
**A:** 
1. Use "Always Ready" instances (1-2 instances stay warm)
2. Implement health check pinging (Azure Logic Apps)
3. Optimize bundle size (tree-shaking, code splitting)
4. Consider Premium plan for production (no cold starts)

### Q: How much does Azure Web PubSub cost at scale?
**A:** Free tier = 20 units (20k messages/day). Standard = $1/unit/day. For 10k concurrent users, ~$150/month. Still cheaper than managing Socket.io servers.

### Q: Can I migrate to AWS later?
**A:** Yes, but Azure-native services (Cosmos DB, Web PubSub) would need replacements:
- Cosmos DB → DynamoDB (or MongoDB Atlas)
- Web PubSub → AWS AppSync (or self-hosted Socket.io)
- Azure Functions → AWS Lambda
- Blob Storage → S3

Stick with Azure for now (already committed via Static Web Apps).

---

## 12. Next Steps

1. **Review this architecture** with your team (especially security/compliance)
2. **Provision Azure resources** (start with free tiers)
3. **Implement Phase 1** (authentication) using the code samples
4. **Set up monitoring** (Application Insights from day 1)
5. **Schedule code reviews** (security-focused for auth/data handling)
6. **Document API contracts** (OpenAPI/Swagger for frontend integration)
7. **Load test** before launch (Azure Load Testing)

---

## Appendix: Useful Resources

- [Azure Functions TypeScript Guide](https://learn.microsoft.com/azure/azure-functions/functions-reference-node)
- [Cosmos DB Best Practices](https://learn.microsoft.com/azure/cosmos-db/nosql/best-practice-dotnet)
- [Azure Web PubSub Quickstart](https://learn.microsoft.com/azure/azure-web-pubsub/quickstart-serverless)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
- [Azure Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Maintained By:** T.O.O.L.S Inc Development Team
