# API Reference - T.O.O.L.S Inc Platform

> **Base URL:** `https://your-site.azurestaticapps.net/api/v1`  
> **Authentication:** Bearer token in `Authorization` header + httpOnly cookies

---

## Table of Contents
1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Courses & Learning](#courses--learning)
4. [Forms & Submissions](#forms--submissions)
5. [Messaging (MackChat)](#messaging-mackchat)
6. [File Management](#file-management)
7. [Error Codes](#error-codes)

---

## Authentication

### POST `/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Sets Cookie:** `refreshToken` (httpOnly, 7 days)

**Errors:**
- `400` - Validation error (missing fields, weak password)
- `409` - Email already registered

---

### POST `/auth/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://storage.blob.core.windows.net/avatars/550e8400.jpg",
    "role": "user"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Sets Cookie:** `refreshToken` (httpOnly, 7 days)

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `403` - Account suspended

---

### POST `/auth/refresh`
Refresh expired access token using refresh token.

**Request Headers:**
```
Cookie: refreshToken=<token>
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Sets Cookie:** New `refreshToken` (token rotation)

**Errors:**
- `401` - Missing, invalid, or revoked refresh token

---

### POST `/auth/logout`
Invalidate refresh token and log out user.

**Request Headers:**
```
Cookie: refreshToken=<token>
```

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

**Clears Cookie:** `refreshToken`

---

### POST `/auth/forgot-password`
*(Phase 2 - Not Yet Implemented)*

Request password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "If an account exists, a reset email has been sent"
}
```

---

### POST `/auth/reset-password`
*(Phase 2 - Not Yet Implemented)*

Reset password using token from email.

**Request Body:**
```json
{
  "token": "abc123xyz",
  "newPassword": "NewSecurePassword456!"
}
```

**Response (200 OK):**
```json
{
  "message": "Password reset successfully"
}
```

---

## User Management

### GET `/users/me`
Get current user profile (requires authentication).

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "John Doe",
  "avatar": "https://storage.blob.core.windows.net/avatars/550e8400.jpg",
  "role": "user",
  "status": "active",
  "emailVerified": true,
  "enrolledCourses": ["course-1", "course-2"],
  "completedLessons": ["lesson-1", "lesson-2"],
  "preferences": {
    "notifications": true,
    "emailUpdates": false,
    "theme": "dark"
  },
  "metadata": {
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:22:00Z",
    "lastLogin": "2024-01-20T14:22:00Z"
  }
}
```

**Errors:**
- `401` - Missing or invalid access token

---

### PATCH `/users/me`
*(Phase 2 - Not Yet Implemented)*

Update current user profile.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body (partial update):**
```json
{
  "name": "Jane Doe",
  "preferences": {
    "notifications": false
  }
}
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "name": "Jane Doe",
  "preferences": {
    "notifications": false,
    "emailUpdates": false,
    "theme": "dark"
  }
}
```

**Errors:**
- `401` - Unauthorized
- `400` - Validation error

---

### GET `/users/me/progress`
*(Phase 2 - Not Yet Implemented)*

Get user's course progress and statistics.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "courses": {
    "course-1": {
      "enrolledAt": "2024-01-10T08:00:00Z",
      "progress": 45,
      "completedLessons": ["lesson-1", "lesson-2", "lesson-3"],
      "lastAccessedAt": "2024-01-20T10:15:00Z",
      "timeSpent": 320
    }
  },
  "achievements": [
    {
      "id": "first-course",
      "title": "First Steps",
      "unlockedAt": "2024-01-10T09:00:00Z"
    }
  ],
  "stats": {
    "totalCoursesCompleted": 2,
    "totalLessonsCompleted": 15,
    "totalTimeSpent": 1200,
    "loginStreak": 7,
    "lastLoginAt": "2024-01-20T14:22:00Z"
  }
}
```

---

### DELETE `/users/me`
*(Phase 5 - GDPR Compliance)*

Delete user account and all associated data.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (204 No Content)**

**Errors:**
- `401` - Unauthorized

---

## Courses & Learning

### GET `/courses`
*(Phase 2 - Not Yet Implemented)*

List all available courses.

**Query Parameters:**
- `category` (optional): Filter by category (`job-readiness`, `education`, `life-skills`, `tech`)
- `level` (optional): Filter by level (`beginner`, `intermediate`, `advanced`)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 100)

**Example Request:**
```
GET /api/v1/courses?category=job-readiness&level=beginner&page=1&limit=10
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "course-1",
      "title": "Resume Writing Essentials",
      "description": "Learn to create a professional resume that stands out.",
      "category": "job-readiness",
      "level": "beginner",
      "thumbnail": "https://storage.blob.core.windows.net/courses/course-1-thumb.jpg",
      "duration": 90,
      "instructor": {
        "name": "Sarah Johnson",
        "avatar": "https://storage.blob.core.windows.net/instructors/sarah.jpg"
      },
      "metadata": {
        "enrolledCount": 342,
        "completionRate": 78,
        "rating": 4.7
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

### GET `/courses/:id`
*(Phase 2 - Not Yet Implemented)*

Get detailed course information.

**Response (200 OK):**
```json
{
  "id": "course-1",
  "title": "Resume Writing Essentials",
  "description": "Learn to create a professional resume that stands out to employers in competitive job markets.",
  "category": "job-readiness",
  "level": "beginner",
  "thumbnail": "https://storage.blob.core.windows.net/courses/course-1-thumb.jpg",
  "duration": 90,
  "instructor": {
    "name": "Sarah Johnson",
    "avatar": "https://storage.blob.core.windows.net/instructors/sarah.jpg",
    "bio": "Career coach with 10+ years experience helping justice-involved individuals."
  },
  "lessons": [
    {
      "id": "lesson-1",
      "title": "Understanding Employer Needs",
      "description": "What employers look for in candidates.",
      "duration": 15,
      "order": 1
    },
    {
      "id": "lesson-2",
      "title": "Formatting Your Resume",
      "description": "Professional formatting techniques.",
      "duration": 20,
      "order": 2
    }
  ],
  "metadata": {
    "enrolledCount": 342,
    "completionRate": 78,
    "rating": 4.7,
    "createdAt": "2023-06-15T10:00:00Z",
    "updatedAt": "2024-01-10T08:30:00Z"
  }
}
```

**Errors:**
- `404` - Course not found

---

### POST `/courses/:id/enroll`
*(Phase 2 - Not Yet Implemented)*

Enroll in a course.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "message": "Successfully enrolled in course",
  "enrollment": {
    "courseId": "course-1",
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "enrolledAt": "2024-01-20T15:30:00Z",
    "progress": 0
  }
}
```

**Errors:**
- `401` - Unauthorized
- `409` - Already enrolled

---

### GET `/courses/:id/lessons/:lessonId`
*(Phase 2 - Not Yet Implemented)*

Get lesson content (requires enrollment).

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "id": "lesson-1",
  "courseId": "course-1",
  "title": "Understanding Employer Needs",
  "description": "What employers look for in candidates.",
  "videoUrl": "https://storage.blob.core.windows.net/courses/lesson-1-video.mp4",
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
```

**Errors:**
- `401` - Unauthorized
- `403` - Not enrolled in course
- `404` - Lesson not found

---

### POST `/courses/:id/lessons/:lessonId/complete`
*(Phase 2 - Not Yet Implemented)*

Mark lesson as completed.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "message": "Lesson marked as complete",
  "progress": {
    "courseId": "course-1",
    "completedLessons": 3,
    "totalLessons": 8,
    "percentage": 37.5
  }
}
```

---

## Forms & Submissions

### POST `/forms/contact`
*(Phase 3 - Not Yet Implemented)*

Submit contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in partnering with T.O.O.L.S Inc..."
}
```

**Response (201 Created):**
```json
{
  "id": "submission-123",
  "message": "Thank you for contacting us. We'll respond within 24 hours.",
  "submittedAt": "2024-01-20T16:45:00Z"
}
```

---

### POST `/forms/interest`
*(Phase 3 - Not Yet Implemented)*

Submit interest form (for program enrollment).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "interests": ["job-readiness", "education"],
  "availability": "weekends",
  "notes": "Released 2 months ago, need immediate support"
}
```

**Response (201 Created):**
```json
{
  "id": "submission-124",
  "message": "Thank you for your interest. A program coordinator will contact you soon.",
  "submittedAt": "2024-01-20T17:00:00Z"
}
```

---

### POST `/forms/referral`
*(Phase 3 - Not Yet Implemented)*

Submit referral for justice-involved individual.

**Request Body:**
```json
{
  "referrer": {
    "name": "Sarah Smith",
    "email": "sarah@agency.org",
    "phone": "555-0456",
    "organization": "Reentry Services Inc"
  },
  "participant": {
    "name": "John Doe",
    "contact": "john@example.com",
    "phone": "555-0789"
  },
  "services": ["job-readiness", "housing", "mental-health"],
  "urgency": "high",
  "notes": "Recently released, high motivation",
  "attachments": [
    {
      "name": "referral_form.pdf",
      "url": "https://storage.blob.core.windows.net/forms/abc123.pdf"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "referral-125",
  "message": "Referral received. Our team will review and contact the participant within 48 hours.",
  "submittedAt": "2024-01-20T17:30:00Z",
  "trackingNumber": "REF-2024-125"
}
```

---

## Messaging (MackChat)

### GET `/conversations`
*(Phase 4 - Not Yet Implemented)*

List user's conversations.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "conv-1",
      "type": "direct",
      "participants": [
        {
          "userId": "user-2",
          "name": "Jane Smith",
          "avatar": "https://storage.blob.core.windows.net/avatars/user-2.jpg"
        }
      ],
      "lastMessage": {
        "text": "Thanks for the help!",
        "senderId": "user-2",
        "timestamp": "2024-01-20T16:30:00Z"
      },
      "unreadCount": 2,
      "updatedAt": "2024-01-20T16:30:00Z"
    }
  ]
}
```

---

### POST `/conversations`
*(Phase 4 - Not Yet Implemented)*

Create new conversation.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "type": "direct",
  "participantIds": ["user-2"]
}
```

**Response (201 Created):**
```json
{
  "id": "conv-2",
  "type": "direct",
  "participants": [
    {
      "userId": "user-1",
      "name": "John Doe",
      "role": "admin"
    },
    {
      "userId": "user-2",
      "name": "Jane Smith",
      "role": "member"
    }
  ],
  "createdAt": "2024-01-20T18:00:00Z"
}
```

---

### GET `/conversations/:id/messages`
*(Phase 4 - Not Yet Implemented)*

Get messages in conversation (paginated).

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Query Parameters:**
- `limit` (optional): Messages per page (default: 50, max: 100)
- `before` (optional): Cursor for pagination (message timestamp)

**Response (200 OK):**
```json
{
  "items": [
    {
      "id": "msg-1",
      "conversationId": "conv-1",
      "senderId": "user-2",
      "text": "Thanks for the help!",
      "attachments": [],
      "readBy": {
        "user-1": "2024-01-20T16:35:00Z",
        "user-2": "2024-01-20T16:30:00Z"
      },
      "timestamp": "2024-01-20T16:30:00Z"
    }
  ],
  "pagination": {
    "hasMore": true,
    "nextCursor": "2024-01-20T16:00:00Z"
  }
}
```

---

### POST `/conversations/:id/messages`
*(Phase 4 - Not Yet Implemented)*

Send message in conversation.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "text": "Hello! How can I help you today?",
  "attachments": [
    {
      "id": "file-1",
      "name": "document.pdf",
      "url": "https://storage.blob.core.windows.net/messages/file-1.pdf",
      "size": 102400,
      "mimeType": "application/pdf"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "msg-2",
  "conversationId": "conv-1",
  "senderId": "user-1",
  "text": "Hello! How can I help you today?",
  "attachments": [
    {
      "id": "file-1",
      "name": "document.pdf",
      "url": "https://storage.blob.core.windows.net/messages/file-1.pdf",
      "size": 102400,
      "mimeType": "application/pdf"
    }
  ],
  "timestamp": "2024-01-20T18:15:00Z"
}
```

**WebSocket Event Broadcasted:**
```json
{
  "event": "message.new",
  "data": { /* message object */ }
}
```

---

### WebSocket Connection (MackChat Real-Time)
*(Phase 4 - Not Yet Implemented)*

**Connection URL:**
```
wss://<web-pubsub-endpoint>/client/hubs/mackchat
```

**Authentication:**
```
Authorization: Bearer <accessToken>
```

**Events Received:**
```json
// New message
{
  "event": "message.new",
  "data": {
    "id": "msg-3",
    "conversationId": "conv-1",
    "senderId": "user-2",
    "text": "Message content",
    "timestamp": "2024-01-20T18:20:00Z"
  }
}

// Typing indicator
{
  "event": "typing.start",
  "data": {
    "conversationId": "conv-1",
    "userId": "user-2"
  }
}

// Message deleted
{
  "event": "message.deleted",
  "data": {
    "messageId": "msg-3",
    "conversationId": "conv-1"
  }
}
```

---

## File Management

### POST `/files/upload-url`
*(Phase 3 - Not Yet Implemented)*

Request signed URL for direct file upload to Blob Storage.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "fileName": "avatar.jpg",
  "fileType": "image/jpeg",
  "fileSize": 204800,
  "category": "avatar"
}
```

**Response (200 OK):**
```json
{
  "uploadUrl": "https://storage.blob.core.windows.net/uploads/abc123.jpg?sv=2021-10-04&se=2024-01-20T19%3A00%3A00Z&sr=b&sp=w&sig=...",
  "fileId": "abc123",
  "expiresAt": "2024-01-20T19:00:00Z"
}
```

**Upload Flow:**
1. Request upload URL from this endpoint
2. Upload file directly to returned `uploadUrl` (PUT request)
3. Call `/files/complete` to finalize

---

### POST `/files/complete`
*(Phase 3 - Not Yet Implemented)*

Confirm file upload completion.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Request Body:**
```json
{
  "fileId": "abc123",
  "fileName": "avatar.jpg"
}
```

**Response (200 OK):**
```json
{
  "id": "abc123",
  "url": "https://storage.blob.core.windows.net/uploads/abc123.jpg",
  "fileName": "avatar.jpg",
  "size": 204800,
  "mimeType": "image/jpeg",
  "uploadedAt": "2024-01-20T18:45:00Z"
}
```

---

### DELETE `/files/:id`
*(Phase 5 - Not Yet Implemented)*

Delete uploaded file.

**Request Headers:**
```
Authorization: Bearer <accessToken>
```

**Response (204 No Content)**

**Errors:**
- `401` - Unauthorized
- `403` - Not file owner
- `404` - File not found

---

## Error Codes

All error responses follow this format:

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `validation_error` | 400 | Invalid request body or parameters |
| `missing_token` | 401 | No access token provided |
| `invalid_token` | 401 | Access token is invalid or expired |
| `token_revoked` | 401 | Refresh token has been revoked |
| `invalid_credentials` | 401 | Email or password is incorrect |
| `unauthorized` | 401 | Authentication required |
| `forbidden` | 403 | Insufficient permissions |
| `account_suspended` | 403 | User account is suspended |
| `not_found` | 404 | Resource not found |
| `user_exists` | 409 | Email already registered |
| `already_enrolled` | 409 | User already enrolled in course |
| `server_error` | 500 | Internal server error |

### Rate Limiting

**Headers in all responses:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705773600
```

**Rate limit exceeded (429):**
```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests. Please try again in 60 seconds.",
    "retryAfter": 60
  }
}
```

### Retry Logic

For `500` and `503` errors, implement exponential backoff:
- 1st retry: 1 second
- 2nd retry: 2 seconds
- 3rd retry: 4 seconds
- Max retries: 3

---

## Versioning

API version is specified in the URL path: `/api/v1/`

Breaking changes will introduce new versions (`/api/v2/`). Deprecated versions will be maintained for 12 months with advance notice.

---

## OpenAPI Specification

Full OpenAPI 3.0 spec available at:
```
GET /api/openapi.json
```

Use with tools like Swagger UI, Postman, or Insomnia.

---

**Last Updated:** January 2025  
**Version:** 1.0.0  
**Maintained By:** T.O.O.L.S Inc Development Team
