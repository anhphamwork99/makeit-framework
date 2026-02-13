# API Contract: [Feature Name]

**Sprint:** SPRINT-{NNN}
**Version:** v1
**Base Path:** /api/v1/[resource]
**Author:** Dev BE
**Date:** [YYYY-MM-DD]
**Status:** [Draft / Review / Approved]

---

## API Metadata

| Property | Value |
|----------|-------|
| API Version | v1 |
| Base URL | /api/v1 |
| Content-Type | application/json |
| Authentication | [Bearer JWT / API Key / None] |
| Rate Limit | [Requests per minute — e.g., 60 req/min] |

## Authentication Flow

<!-- How clients authenticate with these endpoints -->

**Method:** [JWT Bearer Token / API Key / OAuth 2.0]

**Token Lifecycle:**
1. [Client sends credentials to login endpoint]
2. [Server returns access token + refresh token]
3. [Client includes `Authorization: Bearer {token}` in requests]
4. [When access token expires, use refresh token to get new pair]

**Headers Required:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

## Endpoints Table

| # | Method | Path | Description | Auth | Rate Limit |
|---|--------|------|-------------|------|------------|
| 1 | [POST] | /api/v1/[resource] | [Create resource] | [Required] | [60/min] |
| 2 | [GET] | /api/v1/[resource] | [List resources] | [Required] | [120/min] |
| 3 | [GET] | /api/v1/[resource]/:id | [Get single resource] | [Required] | [120/min] |
| 4 | [PUT] | /api/v1/[resource]/:id | [Update resource] | [Required] | [60/min] |
| 5 | [DELETE] | /api/v1/[resource]/:id | [Delete resource] | [Required] | [30/min] |

## Endpoint Details

### [Endpoint 1 — e.g., POST /api/v1/resource]

**Description:** [What this endpoint does]
**Auth:** [Required / Public]
**Rate Limit:** [Requests per minute]

**Request:**

Path Parameters:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| — | — | — | — |

Query Parameters:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| — | — | — | — | — |

Request Body:
```json
{
  "field_name": "[type — string/number/boolean]",
  "field_name": "[type]"
}
```

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| [field_name] | [string] | [Yes/No] | [max 255 chars, email format, etc.] | [What this field represents] |

**Response — Success (2xx):**

```json
{
  "data": {
    "id": "[uuid/number]",
    "field_name": "[value]",
    "created_at": "2026-02-15T10:30:00Z"
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| [data.id] | [uuid] | [Unique identifier] |
| [data.field_name] | [string] | [Description] |

**Response — Error (4xx/5xx):**

```json
{
  "error": {
    "code": "[ERROR_CODE]",
    "message": "[Human-readable message]",
    "details": [{ "field": "[field]", "issue": "[validation issue]" }]
  }
}
```

### [Endpoint 2 — e.g., GET /api/v1/resource]

<!-- Repeat the same structure for each endpoint -->
<!-- For list endpoints, include pagination section -->

## Pagination

<!-- For list endpoints -->

**Format:** Offset-based pagination

**Query Parameters:**
| Parameter | Type | Default | Max | Description |
|-----------|------|---------|-----|-------------|
| page | number | 1 | — | Page number (1-based) |
| per_page | number | 20 | 100 | Items per page |
| sort | string | created_at | — | Sort field |
| order | string | desc | — | Sort direction (asc/desc) |

**Response Envelope:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

## Error Codes

<!-- Standardized error codes across all endpoints -->

| HTTP Status | Error Code | Description | When |
|-------------|------------|-------------|------|
| 400 | VALIDATION_ERROR | Request body validation failed | Missing/invalid fields |
| 401 | UNAUTHORIZED | Authentication required | No/invalid token |
| 403 | FORBIDDEN | Insufficient permissions | Valid token, wrong role |
| 404 | NOT_FOUND | Resource not found | Invalid ID |
| 409 | CONFLICT | Resource already exists | Duplicate unique field |
| 422 | UNPROCESSABLE_ENTITY | Business rule violation | Logic constraint failed |
| 429 | RATE_LIMITED | Too many requests | Rate limit exceeded |
| 500 | INTERNAL_ERROR | Server error | Unexpected failure |

**Error Response Format:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "field": "email", "issue": "Invalid email format" },
      { "field": "password", "issue": "Must be at least 8 characters" }
    ]
  }
}
```

## Rate Limits

| Endpoint Group | Limit | Window | Scope |
|---------------|-------|--------|-------|
| [Auth endpoints] | [10 req] | [per minute] | [per IP] |
| [Read endpoints] | [120 req] | [per minute] | [per user] |
| [Write endpoints] | [60 req] | [per minute] | [per user] |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1670000000
```

## Example Requests

### Create Resource

```bash
curl -X POST https://api.example.com/api/v1/resource \
  -H "Authorization: Bearer eyJ..." \
  -H "Content-Type: application/json" \
  -d '{
    "field_name": "value",
    "field_name": "value"
  }'
```

**Response (201 Created):**
```json
{
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "field_name": "value",
    "created_at": "2026-02-15T10:30:00Z"
  }
}
```

### List Resources (with pagination)

```bash
curl -X GET "https://api.example.com/api/v1/resource?page=1&per_page=20&sort=created_at&order=desc" \
  -H "Authorization: Bearer eyJ..."
```

---

## Instructions

**How to fill this template:**

1. **API Metadata:** Set base path, auth method, global rate limit
2. **Authentication Flow:** Document how clients get and use tokens
3. **Endpoints Table:** List ALL endpoints with methods, paths, auth, rate limits
4. **Endpoint Details:** For EACH endpoint: request schema, response schema, error cases
5. **Pagination:** Include for all list endpoints — default 20 items, max 100
6. **Error Codes:** Use standard HTTP codes + app-specific error codes
7. **Rate Limits:** Define per endpoint group — auth stricter, reads more lenient
8. **Example Requests:** Include curl examples for key endpoints

**Naming conventions:**
- URL paths: kebab-case (`/api/v1/user-profiles`)
- JSON fields: snake_case (`created_at`, `user_id`)
- Error codes: UPPER_SNAKE_CASE (`VALIDATION_ERROR`)

**Design principles:**
- RESTful: nouns for resources, verbs via HTTP methods
- Versioning: URL path versioning (`/api/v1/`)
- Consistent pagination: offset-based, max 100 items
- Consistent error format: `{ error: { code, message, details } }`

**FE handoff checklist:**
- [ ] All endpoints documented with request/response schemas
- [ ] Error codes listed with handling guidance
- [ ] Pagination format documented
- [ ] Auth flow documented — how FE gets and refreshes tokens
- [ ] Example curl requests for FE developers to test


## Knowledge Pointers

<!-- 
  Knowledge Pointers: Cross-reference this deliverable with knowledge base docs.
  - Add relevant ADR IDs if architecture decisions apply
  - Add lesson IDs if past experiences influenced this work  
  - Add pattern IDs if established patterns were used
  - Leave empty if this is the first sprint or no relevant docs exist
-->

<!-- Link related knowledge documents from .makeit/knowledge/ -->
<!-- This section helps future sprints find relevant context -->

| Doc ID | Relevance |
|--------|-----------|
| {e.g., adr-003} | {e.g., Architecture decision that shaped this deliverable} |
| {e.g., lesson-012} | {e.g., Lesson learned from previous implementation} |

> 💡 Populate during deliverable creation. Use `/makeit:search-kb` to find relevant docs.
> Leave empty if no relevant knowledge docs exist yet.
