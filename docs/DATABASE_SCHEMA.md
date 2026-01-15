# Database Schema Reference

Complete schema documentation for T.O.O.L.S Inc Platform & MackChat.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   DATABASE LAYER                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐         ┌───────────────────┐   │
│  │  Azure Cosmos DB │         │   Azure SQL DB    │   │
│  │     (NoSQL)      │         │  (Relational)     │   │
│  │                  │         │                   │   │
│  │ • Users          │         │ • form_submissions│   │
│  │ • Courses        │         │ • audit_logs      │   │
│  │ • Progress       │         │ • reports         │   │
│  │ • Conversations  │         │                   │   │
│  │ • Messages       │         │                   │   │
│  │ • Files Metadata │         │                   │   │
│  └──────────────────┘         └───────────────────┘   │
│                                                         │
│  ┌──────────────────┐         ┌───────────────────┐   │
│  │  Azure Redis     │         │  Azure Blob Store │   │
│  │   (Cache)        │         │   (Files)         │   │
│  │                  │         │                   │   │
│  │ • Sessions       │         │ • Avatars         │   │
│  │ • Tokens         │         │ • Course Videos   │   │
│  │ • API Cache      │         │ • Documents       │   │
│  │ • Counters       │         │ • Attachments     │   │
│  └──────────────────┘         └───────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Azure Cosmos DB Collections

### Database: `toolsinc-db`

### Collection: `Users`
**Partition Key:** `/id`  
**Throughput:** 400 RU/s (autoscale to 4000)  
**Indexes:** email (unique composite index)

```typescript
interface User {
  // Primary Key
  id: string;                          // UUID, partition key
  
  // Authentication
  email: string;                       // Lowercase, unique
  passwordHash: string;                // argon2id hash
  
  // Profile
  name: string;
  avatar: string | null;               // Blob Storage URL
  role: "user" | "admin" | "mentor";
  status: "active" | "suspended" | "pending_verification";
  emailVerified: boolean;
  
  // Learning Data
  enrolledCourses: string[];           // Array of course IDs
  completedLessons: string[];          // Array of lesson IDs
  
  // Preferences
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme: "dark" | "light";
  };
  
  // Metadata
  metadata: {
    createdAt: string;                 // ISO 8601 timestamp
    updatedAt: string;
    lastLogin: string | null;
    ip?: string;                       // Last login IP (for audits)
  };
}
```

**Example Document:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "passwordHash": "$argon2id$v=19$m=65536,t=3,p=4$...",
  "name": "John Doe",
  "avatar": "https://storage.blob.core.windows.net/avatars/550e8400.jpg",
  "role": "user",
  "status": "active",
  "emailVerified": true,
  "enrolledCourses": ["course-1", "course-2"],
  "completedLessons": ["lesson-1", "lesson-2", "lesson-3"],
  "preferences": {
    "notifications": true,
    "emailUpdates": false,
    "theme": "dark"
  },
  "metadata": {
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-20T14:22:00.000Z",
    "lastLogin": "2024-01-20T14:22:00.000Z",
    "ip": "203.0.113.42"
  }
}
```

**Queries:**
```sql
-- Find user by email (most common)
SELECT * FROM c WHERE c.email = "john@example.com"

-- Find suspended users
SELECT * FROM c WHERE c.status = "suspended"

-- Find users enrolled in course
SELECT * FROM c WHERE ARRAY_CONTAINS(c.enrolledCourses, "course-1")
```

---

### Collection: `Courses`
**Partition Key:** `/id`  
**Throughput:** 400 RU/s (shared with Users)  
**Indexes:** category, level

```typescript
interface Course {
  // Primary Key
  id: string;                          // UUID, partition key
  
  // Basic Info
  title: string;
  description: string;
  category: "job-readiness" | "education" | "life-skills" | "tech";
  thumbnail: string;                   // Blob Storage URL
  duration: number;                    // Total minutes
  level: "beginner" | "intermediate" | "advanced";
  
  // Instructor
  instructor: {
    name: string;
    avatar: string;                    // Blob Storage URL
    bio: string;
  };
  
  // Lessons
  lessons: {
    id: string;                        // lesson-{n}
    title: string;
    description: string;
    videoUrl?: string;                 // Blob Storage URL (optional)
    duration: number;                  // Minutes
    order: number;                     // Display order (1, 2, 3...)
    content: string;                   // Markdown content
    resources: {
      title: string;
      url: string;                     // Blob Storage URL or external link
      type: "pdf" | "link" | "download";
    }[];
  }[];
  
  // Metadata
  metadata: {
    enrolledCount: number;
    completionRate: number;            // Percentage (0-100)
    rating: number;                    // Average rating (0-5)
    createdAt: string;
    updatedAt: string;
  };
}
```

**Example Document:**
```json
{
  "id": "course-1",
  "title": "Resume Writing Essentials",
  "description": "Learn to create a professional resume that stands out to employers.",
  "category": "job-readiness",
  "thumbnail": "https://storage.blob.core.windows.net/courses/course-1-thumb.jpg",
  "duration": 90,
  "level": "beginner",
  "instructor": {
    "name": "Sarah Johnson",
    "avatar": "https://storage.blob.core.windows.net/instructors/sarah.jpg",
    "bio": "Career coach with 10+ years experience."
  },
  "lessons": [
    {
      "id": "lesson-1",
      "title": "Understanding Employer Needs",
      "description": "What employers look for in candidates.",
      "videoUrl": "https://storage.blob.core.windows.net/courses/lesson-1.mp4",
      "duration": 15,
      "order": 1,
      "content": "# Lesson Content\n\nEmployers are looking for...",
      "resources": [
        {
          "title": "Sample Resume Template",
          "url": "https://storage.blob.core.windows.net/resources/template.pdf",
          "type": "pdf"
        }
      ]
    }
  ],
  "metadata": {
    "enrolledCount": 342,
    "completionRate": 78,
    "rating": 4.7,
    "createdAt": "2023-06-15T10:00:00.000Z",
    "updatedAt": "2024-01-10T08:30:00.000Z"
  }
}
```

**Queries:**
```sql
-- Get all beginner job-readiness courses
SELECT * FROM c 
WHERE c.category = "job-readiness" AND c.level = "beginner"

-- Get top-rated courses
SELECT * FROM c 
WHERE c.metadata.rating >= 4.5
ORDER BY c.metadata.rating DESC

-- Find courses by instructor
SELECT * FROM c 
WHERE c.instructor.name = "Sarah Johnson"
```

---

### Collection: `Progress`
**Partition Key:** `/userId`  
**Throughput:** 400 RU/s

```typescript
interface Progress {
  // Primary Key
  id: string;                          // Same as userId (partition key)
  userId: string;                      // For indexing
  
  // Course Progress
  courses: {
    [courseId: string]: {
      enrolledAt: string;              // ISO 8601
      progress: number;                // Percentage (0-100)
      completedLessons: string[];      // Array of lesson IDs
      lastAccessedAt: string;
      timeSpent: number;               // Total minutes
    };
  };
  
  // Achievements
  achievements: {
    id: string;                        // achievement ID
    title: string;
    description?: string;
    unlockedAt: string;
  }[];
  
  // Statistics
  stats: {
    totalCoursesCompleted: number;
    totalLessonsCompleted: number;
    totalTimeSpent: number;            // Total minutes across all courses
    loginStreak: number;               // Consecutive days
    lastLoginAt: string;
  };
}
```

**Example Document:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "courses": {
    "course-1": {
      "enrolledAt": "2024-01-10T08:00:00.000Z",
      "progress": 45,
      "completedLessons": ["lesson-1", "lesson-2", "lesson-3"],
      "lastAccessedAt": "2024-01-20T10:15:00.000Z",
      "timeSpent": 320
    }
  },
  "achievements": [
    {
      "id": "first-course",
      "title": "First Steps",
      "description": "Completed your first course",
      "unlockedAt": "2024-01-10T09:00:00.000Z"
    }
  ],
  "stats": {
    "totalCoursesCompleted": 2,
    "totalLessonsCompleted": 15,
    "totalTimeSpent": 1200,
    "loginStreak": 7,
    "lastLoginAt": "2024-01-20T14:22:00.000Z"
  }
}
```

---

### Collection: `Conversations`
**Partition Key:** `/id`  
**Throughput:** 400 RU/s (autoscale for MackChat)  
**TTL:** Optional (compliance - auto-delete after N days)

```typescript
interface Conversation {
  // Primary Key
  id: string;                          // UUID, partition key
  
  // Type
  type: "direct" | "group";
  
  // Participants
  participants: {
    userId: string;
    name: string;
    avatar: string | null;
    role: "admin" | "member";          // For group chats
    joinedAt: string;
  }[];
  
  // Metadata
  metadata: {
    name?: string;                     // Group chat name (optional)
    avatar?: string;                   // Group avatar (optional)
    lastMessage: {
      text: string;
      senderId: string;
      timestamp: string;
    };
    unreadCount: {                     // Per-user unread counts
      [userId: string]: number;
    };
    createdAt: string;
    updatedAt: string;
  };
}
```

**Example Document:**
```json
{
  "id": "conv-1",
  "type": "direct",
  "participants": [
    {
      "userId": "user-1",
      "name": "John Doe",
      "avatar": "https://storage.blob.core.windows.net/avatars/user-1.jpg",
      "role": "member",
      "joinedAt": "2024-01-15T10:00:00.000Z"
    },
    {
      "userId": "user-2",
      "name": "Jane Smith",
      "avatar": "https://storage.blob.core.windows.net/avatars/user-2.jpg",
      "role": "member",
      "joinedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "metadata": {
    "lastMessage": {
      "text": "Thanks for the help!",
      "senderId": "user-2",
      "timestamp": "2024-01-20T16:30:00.000Z"
    },
    "unreadCount": {
      "user-1": 2,
      "user-2": 0
    },
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-20T16:30:00.000Z"
  }
}
```

**Queries:**
```sql
-- Get user's conversations
SELECT * FROM c 
WHERE ARRAY_CONTAINS(c.participants, {"userId": "user-1"}, true)
ORDER BY c.metadata.updatedAt DESC

-- Get unread conversations for user
SELECT * FROM c 
WHERE c.metadata.unreadCount["user-1"] > 0
```

---

### Collection: `Messages`
**Partition Key:** `/conversationId`  
**Throughput:** 1000 RU/s (high write volume)  
**TTL:** 90 days (optional, compliance)

```typescript
interface Message {
  // Primary Key
  id: string;                          // UUID
  conversationId: string;              // Partition key (enables efficient queries)
  
  // Content
  senderId: string;                    // User ID
  text: string;                        // Message text
  attachments: {
    id: string;
    name: string;
    url: string;                       // Blob Storage URL
    size: number;                      // Bytes
    mimeType: string;
  }[];
  
  // Metadata
  metadata: {
    readBy: {                          // Track read receipts
      [userId: string]: string;        // ISO 8601 timestamp
    };
    editedAt?: string;                 // If message was edited
    deletedAt?: string;                // Soft delete (hide from UI)
    timestamp: string;                 // ISO 8601
  };
  
  // Auto-deletion (optional)
  ttl?: number;                        // Seconds until auto-delete
}
```

**Example Document:**
```json
{
  "id": "msg-1",
  "conversationId": "conv-1",
  "senderId": "user-2",
  "text": "Thanks for the help!",
  "attachments": [
    {
      "id": "file-1",
      "name": "document.pdf",
      "url": "https://storage.blob.core.windows.net/messages/file-1.pdf",
      "size": 102400,
      "mimeType": "application/pdf"
    }
  ],
  "metadata": {
    "readBy": {
      "user-1": "2024-01-20T16:35:00.000Z",
      "user-2": "2024-01-20T16:30:00.000Z"
    },
    "timestamp": "2024-01-20T16:30:00.000Z"
  }
}
```

**Queries:**
```sql
-- Get recent messages in conversation (paginated)
SELECT * FROM c 
WHERE c.conversationId = "conv-1"
ORDER BY c.metadata.timestamp DESC
OFFSET 0 LIMIT 50

-- Get unread messages for user
SELECT * FROM c 
WHERE c.conversationId = "conv-1" 
  AND NOT IS_DEFINED(c.metadata.readBy["user-1"])
ORDER BY c.metadata.timestamp ASC
```

**Indexing Policy:**
```json
{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [
    {
      "path": "/conversationId/?",
      "indexes": [{ "kind": "Hash", "dataType": "String" }]
    },
    {
      "path": "/metadata/timestamp/?",
      "indexes": [{ "kind": "Range", "dataType": "String" }]
    }
  ],
  "excludedPaths": [
    { "path": "/text/*" },
    { "path": "/attachments/*" }
  ]
}
```

---

### Collection: `Files`
**Partition Key:** `/userId`  
**Throughput:** 400 RU/s

```typescript
interface File {
  // Primary Key
  id: string;                          // UUID
  userId: string;                      // Partition key (owner)
  
  // File Info
  fileName: string;
  url: string;                         // Blob Storage URL
  size: number;                        // Bytes
  mimeType: string;
  category: "avatar" | "document" | "attachment" | "course-video";
  
  // Metadata
  metadata: {
    uploadedAt: string;
    expiresAt?: string;                // Optional expiration (temp files)
  };
}
```

---

## Azure SQL Database

### Database: `toolsinc-reports`

### Table: `form_submissions`
**Purpose:** Store all form submissions (contact, interest, referral) for compliance and reporting.

```sql
CREATE TABLE form_submissions (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Form Type
  form_type VARCHAR(50) NOT NULL,           -- 'contact', 'interest', 'referral'
  
  -- Form Data (flexible JSONB)
  data JSONB NOT NULL,
  
  -- Attachments
  attachments JSONB,                         -- Array of file URLs
  
  -- Request Metadata
  metadata JSONB,                            -- IP, user agent, referrer, etc.
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending',      -- 'pending', 'reviewed', 'resolved'
  assigned_to UUID REFERENCES users(id),     -- Admin assignment
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_form_type ON form_submissions(form_type);
CREATE INDEX idx_status ON form_submissions(status);
CREATE INDEX idx_created_at ON form_submissions(created_at DESC);
CREATE INDEX idx_form_type_created ON form_submissions(form_type, created_at DESC);

-- Full-text search on data (PostgreSQL)
CREATE INDEX idx_data_gin ON form_submissions USING GIN (data);
```

**Example Row:**
```sql
INSERT INTO form_submissions (form_type, data, attachments, metadata, status)
VALUES (
  'referral',
  '{
    "referrer_name": "John Doe",
    "referrer_email": "john@example.com",
    "referrer_phone": "555-0123",
    "participant_name": "Jane Smith",
    "participant_contact": "jane@example.com",
    "services_needed": ["job-readiness", "housing"],
    "notes": "Recently released, needs immediate support"
  }'::jsonb,
  '[
    {
      "name": "referral_form.pdf",
      "url": "https://storage.blob.core.windows.net/forms/abc123.pdf",
      "size": 102400
    }
  ]'::jsonb,
  '{
    "ip": "203.0.113.42",
    "user_agent": "Mozilla/5.0...",
    "submitted_from": "/referral"
  }'::jsonb,
  'pending'
);
```

**Queries:**
```sql
-- Get all pending referrals
SELECT * FROM form_submissions 
WHERE form_type = 'referral' AND status = 'pending'
ORDER BY created_at DESC;

-- Search for participant by name
SELECT * FROM form_submissions 
WHERE form_type = 'referral' 
  AND data->>'participant_name' ILIKE '%Jane%';

-- Get submissions in last 30 days
SELECT form_type, COUNT(*) as count
FROM form_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY form_type;
```

---

### Table: `audit_logs`
**Purpose:** Immutable audit trail for compliance (GDPR, HIPAA).

```sql
CREATE TABLE audit_logs (
  -- Primary Key
  id BIGSERIAL PRIMARY KEY,
  
  -- Event Info
  event_type VARCHAR(100) NOT NULL,          -- 'user.login', 'user.delete', 'data.export'
  user_id UUID,                               -- User who performed action
  resource_type VARCHAR(50),                  -- 'user', 'course', 'message', etc.
  resource_id VARCHAR(255),                   -- ID of affected resource
  
  -- Event Details
  details JSONB,                              -- Full event context
  
  -- Request Metadata
  ip_address VARCHAR(45),                     -- IPv4 or IPv6
  user_agent TEXT,
  
  -- Timestamp (immutable)
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_event_type ON audit_logs(event_type);
CREATE INDEX idx_user_id ON audit_logs(user_id);
CREATE INDEX idx_created_at ON audit_logs(created_at DESC);

-- Prevent updates/deletes (immutable)
CREATE RULE no_update AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE no_delete AS ON DELETE TO audit_logs DO INSTEAD NOTHING;
```

**Example Row:**
```sql
INSERT INTO audit_logs (event_type, user_id, resource_type, resource_id, details, ip_address)
VALUES (
  'user.delete',
  '550e8400-e29b-41d4-a716-446655440000',
  'user',
  '550e8400-e29b-41d4-a716-446655440000',
  '{
    "reason": "GDPR right to deletion",
    "initiated_by": "user",
    "data_exported": true
  }'::jsonb,
  '203.0.113.42'
);
```

---

## Azure Redis Cache

### Key Patterns

**Refresh Tokens:**
```
Key:   refresh:{token}
Value: {userId}
TTL:   604800 seconds (7 days)

Example:
SET refresh:eyJhbGciOiJIUzI1NiIs... "550e8400-e29b-41d4-a716-446655440000" EX 604800
```

**Blacklisted Access Tokens:**
```
Key:   blacklist:{token}
Value: {reason}
TTL:   900 seconds (15 min, token expiry)

Example:
SET blacklist:eyJhbGciOiJIUzI1NiIs... "logout" EX 900
```

**User Sessions (Online Status):**
```
Key:   session:{userId}
Value: {lastActivity}
TTL:   900 seconds (15 min)

Example:
SET session:550e8400-e29b-41d4-a716-446655440000 "2024-01-20T16:30:00Z" EX 900
```

**API Cache (Course Catalog):**
```
Key:   cache:courses:all
Value: JSON array of courses
TTL:   900 seconds (15 min)

Example:
SET cache:courses:all "[{\"id\":\"course-1\",\"title\":\"...\"}]" EX 900
```

**Rate Limiting:**
```
Key:   ratelimit:{ip}:{endpoint}
Value: {requestCount}
TTL:   60 seconds

Example:
INCR ratelimit:203.0.113.42:/api/v1/auth/login
EXPIRE ratelimit:203.0.113.42:/api/v1/auth/login 60
```

**Online Users (Set):**
```
Key:   online_users
Type:  Set
Members: Array of userIds

Example:
SADD online_users "user-1" "user-2" "user-3"
SMEMBERS online_users
```

---

## Azure Blob Storage

### Container: `avatars`
**Access:** Public read, authenticated write  
**Tier:** Hot  
**Lifecycle:** Retain indefinitely

```
avatars/
  ├── {userId}.jpg
  ├── {userId}.png
  └── ...
```

### Container: `courses`
**Access:** Public read, admin write  
**Tier:** Hot  
**CDN:** Azure Front Door

```
courses/
  ├── {courseId}-thumb.jpg
  ├── {courseId}/
  │   ├── lesson-1.mp4
  │   ├── lesson-2.mp4
  │   └── ...
  └── ...
```

### Container: `documents`
**Access:** Authenticated read/write  
**Tier:** Cool (accessed infrequently)  
**Lifecycle:** Move to archive after 90 days

```
documents/
  ├── {userId}/
  │   ├── file-1.pdf
  │   ├── file-2.docx
  │   └── ...
  └── ...
```

### Container: `messages`
**Access:** Authenticated read/write  
**Tier:** Hot  
**Lifecycle:** Delete after 90 days (compliance)

```
messages/
  ├── {conversationId}/
  │   ├── {messageId}-file-1.jpg
  │   ├── {messageId}-file-2.pdf
  │   └── ...
  └── ...
```

### Container: `forms`
**Access:** Admin only  
**Tier:** Cool  
**Lifecycle:** Retain for 7 years (legal requirement)

```
forms/
  ├── {submissionId}/
  │   ├── attachment-1.pdf
  │   ├── attachment-2.jpg
  │   └── ...
  └── ...
```

---

## Data Retention Policies

| Data Type | Retention | Rationale |
|-----------|-----------|-----------|
| **User Accounts** | Until deletion request | GDPR compliance |
| **Course Progress** | Until deletion request | Learning continuity |
| **Messages** | 90 days | Compliance (configurable) |
| **Form Submissions** | 7 years | Legal requirement |
| **Audit Logs** | 7 years | Compliance (immutable) |
| **Uploaded Files** | Varies by type | See Blob Storage lifecycle |

---

## Backup Strategy

### Cosmos DB
- **Continuous Backup:** Enabled (30-day retention)
- **Point-in-Time Restore:** Available
- **Geo-Replication:** Secondary read region (optional)

### Azure SQL
- **Automated Backups:** Daily (7-day retention)
- **Long-Term Retention:** Monthly (12 months)
- **Geo-Replication:** Read replicas in secondary region

### Redis Cache
- **Data Persistence:** RDB snapshots (hourly)
- **No long-term backup:** Cache is ephemeral by design

### Blob Storage
- **Soft Delete:** 7-day retention
- **Versioning:** Enabled
- **Geo-Redundant Storage:** GRS (6 copies across 2 regions)

---

## Migration Scripts

### Initial Cosmos DB Setup
```bash
# Create database
az cosmosdb sql database create \
  --account-name cosmos-toolsinc-prod \
  --name toolsinc-db \
  --resource-group rg-toolsinc-prod

# Create Users container
az cosmosdb sql container create \
  --account-name cosmos-toolsinc-prod \
  --database-name toolsinc-db \
  --name Users \
  --partition-key-path "/id" \
  --throughput 400

# Create unique index on email
az cosmosdb sql container update \
  --account-name cosmos-toolsinc-prod \
  --database-name toolsinc-db \
  --name Users \
  --idx '{
    "indexingMode": "consistent",
    "includedPaths": [{"path": "/*"}],
    "excludedPaths": [{"path": "/\"_etag\"/?"}],
    "compositeIndexes": [[
      {"path": "/email", "order": "ascending"}
    ]]
  }'
```

### Initial SQL Setup
```sql
-- Connect to Azure SQL
-- Create tables
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type VARCHAR(50) NOT NULL,
  data JSONB NOT NULL,
  attachments JSONB,
  metadata JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  assigned_to UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  user_id UUID,
  resource_type VARCHAR(50),
  resource_id VARCHAR(255),
  details JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_form_type ON form_submissions(form_type);
CREATE INDEX idx_status ON form_submissions(status);
CREATE INDEX idx_created_at_desc ON form_submissions(created_at DESC);
CREATE INDEX idx_event_type ON audit_logs(event_type);
CREATE INDEX idx_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at DESC);
```

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained By:** T.O.O.L.S Inc Development Team
