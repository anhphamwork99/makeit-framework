# API Contract Convention

> Convention over documentation — only document what deviates from the standard.

## Principle

Most CRUD APIs follow identical patterns. Instead of writing full contracts for every endpoint, follow these conventions by default and **only document what's unique**.

This reduces TL effort from ~30 min per API to ~5 min, while keeping contracts precise where it matters.

## Default Conventions (DON'T document these)

These are assumed for all APIs unless stated otherwise:

| Aspect | Convention |
|--------|-----------|
| **Style** | RESTful: `GET /resources`, `POST /resources`, `GET /resources/:id`, `PUT /resources/:id`, `DELETE /resources/:id` |
| **Format** | JSON request/response |
| **Field naming** | `snake_case` for all fields |
| **Pagination** | `?page=1&limit=20` → `{ data: [], meta: { total, page, limit } }` |
| **Auth** | Bearer JWT in `Authorization` header |
| **Errors** | `{ error: { code: "VALIDATION_ERROR", message: "...", details?: [...] } }` |
| **Status codes** | `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized, `403` Forbidden, `404` Not Found, `422` Unprocessable Entity, `500` Internal Server Error |
| **Timestamps** | ISO 8601 format (`2026-02-12T10:30:00Z`) |
| **IDs** | UUID v4 string |
| **Soft delete** | `deleted_at` timestamp (null = active) |

## Contract Template (document only what's unique)

```markdown
## [Feature Name] API Contract

**Base path:** `/api/v1/[resource]`

**Follows standard conventions.** Deviations below:

| Endpoint | Notes |
|----------|-------|
| `GET /api/v1/products` | Filter: `?status=active&category_id=X` |
| `POST /api/v1/products` | Body: `{ name, price, category_id }` — price in cents (integer) |
| `GET /api/v1/products/:id/variants` | Nested resource — includes variant options |
```

> 💡 If a CRUD endpoint follows all conventions exactly, you don't need to list it at all.

## When to Write FULL Contract

Write a detailed contract (request/response schema, examples, error cases) when:

| Scenario | Why |
|----------|-----|
| **Non-CRUD operations** | Batch operations, import/export, aggregations |
| **Complex query parameters** | Multiple filters, sorting, full-text search |
| **WebSocket / real-time** | Connection lifecycle, event schemas |
| **Third-party webhooks** | Payload format, retry logic, signature verification |
| **File upload/download** | Multipart, streaming, size limits |
| **Multi-step operations** | Workflows, state machines, approval chains |

## Example: Minimal vs Full Contract

### ✅ Minimal (standard CRUD)

```
## User Management API
Base: /api/v1/users
Standard CRUD. Filter: ?role=admin&status=active
```

### 📋 Full (complex operation)

```
## Bulk Product Import API

POST /api/v1/products/import
Content-Type: multipart/form-data

Body:
- file: CSV file (max 10MB, UTF-8)
- mode: "create_only" | "upsert"

Response (202 Accepted):
{ job_id: "uuid", status: "processing", estimated_time: 30 }

GET /api/v1/products/import/:job_id
Response: { status: "completed" | "failed", processed: 100, errors: [...] }
```

## Integration

- **TL break-tasks:** Reference this convention when defining API tasks
- **Dev BE design-api:** Start from conventions, document only deviations
- **Dev FE:** Assume conventions for mock data and API integration
