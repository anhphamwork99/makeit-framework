# Techlead Templates

Templates sẵn sàng copy-paste cho Tech Lead. Copy template → fill in → done.

---

## Task Breakdown Template

```markdown
### [TASK-ID] [Tên ngắn gọn]

**Type:** [FE / BE]
**User Story:** [Link đến user story của BA — source of truth]
**Priority:** [High / Medium / Low]
**Estimate:** [S / M / L / XL]

#### Scope

Mô tả rõ cần implement cái gì:
- [Component/endpoint cụ thể]
- [Behavior mong đợi]
- [Boundary — cái gì KHÔNG nằm trong scope]

#### Technical Constraints

- [API limit / browser support / third-party dependency]
- [Performance requirement nếu có]
- [Compatibility requirement nếu có]

#### API Contract

- **Endpoint:** [Nếu task cần gọi/tạo API — link đến API contract]
- **N/A** nếu không liên quan

#### Acceptance Criteria (Technical)

- [ ] [Criterion 1 — specific, checkable]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

#### Dependencies

- **Blocked by:** [Task khác cần hoàn thành trước, hoặc "None"]
- **Blocks:** [Task nào phụ thuộc vào task này, hoặc "None"]

#### Notes

- [Hướng dẫn implementation nếu cần]
- [Decision context nếu có]
```

### Ví dụ sử dụng

```markdown
### FE-042 Login form component

**Type:** FE
**User Story:** US-042 Login với email
**Priority:** High
**Estimate:** M

#### Scope

- Tạo LoginForm component với email + password fields
- Validate email format client-side
- Call POST /api/auth/login endpoint
- Handle success (redirect to Dashboard) và error states
- KHÔNG bao gồm: forgot password flow, social login

#### Technical Constraints

- Dùng React Hook Form cho form management
- Zod cho validation schema
- shadcn/ui Input + Button components

#### API Contract

- Endpoint: POST /api/auth/login — See API-CONTRACT-AUTH.md

#### Acceptance Criteria (Technical)

- [ ] LoginForm renders email + password inputs + submit button
- [ ] Client-side validation: email format, password min 8 chars
- [ ] Loading state khi submitting (button disabled + spinner)
- [ ] Error toast khi API trả 401
- [ ] Redirect đến /dashboard khi login success

#### Dependencies

- **Blocked by:** BE-042 (API endpoint must exist)
- **Blocks:** None
```

---

## API Contract Template

```markdown
## API Contract: [Tên Feature/Endpoint Group]

**Created by:** [Techlead name]
**Date:** [YYYY-MM-DD]
**Related Stories:** [Story IDs]
**Status:** [Draft / Reviewed / Locked]

---

### [METHOD] [/api/path]

**Description:** [Endpoint này làm gì]
**Auth:** [Required / Optional / None]

#### Request

**Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer {token} | Yes/No |
| Content-Type | application/json | Yes |

**Body (JSON):**
```json
{
  "field1": "string — description",
  "field2": 0,
  "field3": true
}
```

**Query Params (nếu GET):**
| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| page | number | No | 1 | Page number |
| limit | number | No | 20 | Items per page |

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "field1": "string"
  }
}
```

**Error (4xx):**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message"
  }
}
```

#### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid input |
| UNAUTHORIZED | 401 | Missing/invalid token |
| NOT_FOUND | 404 | Resource not found |

#### Notes

- [Rate limit nếu có]
- [Pagination info]
- [Special behavior]
```

### Ví dụ sử dụng

```markdown
## API Contract: Authentication

**Created by:** Techlead
**Date:** 2026-02-10
**Related Stories:** US-042, US-043
**Status:** Locked

---

### POST /api/auth/login

**Description:** Authenticate user with email + password
**Auth:** None

#### Request

**Body:**
```json
{
  "email": "string — valid email format",
  "password": "string — min 8 characters"
}
```

#### Response

**Success (200):**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-string",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name"
    }
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email hoặc password không đúng"
  }
}
```

**Error (429):**
```json
{
  "success": false,
  "error": {
    "code": "ACCOUNT_LOCKED",
    "message": "Tài khoản bị khóa, thử lại sau 15 phút"
  }
}
```
```

---

## Code Review Checklist

Checklist Techlead dùng khi review PRs. Copy vào PR comment hoặc dùng làm mental checklist.

```markdown
## Code Review — [PR Title]

**PR:** #[number]
**Author:** [name]
**Reviewer:** Techlead
**Date:** [YYYY-MM-DD]

### Architecture Alignment

- [ ] Code structure follows established project patterns
- [ ] New patterns (nếu có) đã được discuss/approve trước
- [ ] Dependencies hợp lý — không thêm library không cần thiết
- [ ] Separation of concerns đúng (FE logic ≠ BE logic)
- [ ] File placement đúng folder structure conventions

### Code Quality

- [ ] Follows [Coding Standards](../../reference/coding-standards.md)
- [ ] Naming conventions consistent (variables, functions, files)
- [ ] Error handling appropriate và specific
- [ ] No commented-out code hoặc debug logs (`console.log`)
- [ ] No hardcoded values (magic numbers, URLs, keys)
- [ ] Commit messages follow conventional format

### Functionality

- [ ] Acceptance criteria from user story met
- [ ] Edge cases handled (empty state, error state, boundary)
- [ ] Input validation present (client + server side)
- [ ] API responses match defined contract

### AI-Generated Code Check

- [ ] AI output đã được author review, không phải raw paste
- [ ] Logic complete — không phải partial/stub/TODO
- [ ] Edge cases handled (AI thường miss edge cases)
- [ ] Security checked (injection, XSS, auth bypass)
- [ ] Performance acceptable (no unnecessary O(n²), memory leaks)
- [ ] Code style consistent với rest of codebase

### Final

- [ ] PR description đầy đủ theo template
- [ ] Screenshots/video attached (nếu UI changes)
- [ ] Self-reviewed trước khi request review

**Verdict:** [ ] ✅ Approve  [ ] 🔄 Request Changes  [ ] ❌ Reject
**Comments:** [Ghi chú nếu có]
```

---

*Templates: Tech Lead · [← Techlead Workflow](./README.md) · [← Roles](../README.md)*
