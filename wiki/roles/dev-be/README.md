# Backend Developer (Dev BE)

Trang workflow chi tiết cho vai trò **Backend Developer** trong team MakeIt. Dev BE là người xây dựng backend systems — implement APIs, quản lý database, xử lý business logic, và đảm bảo hệ thống hoạt động đúng, bảo mật, và hiệu quả.

> 📖 **Vị trí trong workflow:** Dev BE đảm nhận **Stage 4** trong [Team Workflow](../../workflows/team-workflow.md) — nhận tasks từ Techlead, output code + PR để review.

---

## Role Overview

| | Detail |
|---|---|
| **Stage** | Stage 4: FE/BE Implementation |
| **Nhận từ** | Techlead (BE tasks + API contracts) |
| **Giao cho** | TL (code + PR cho review) |
| **Gate kiểm tra input** | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) — Dev verify Techlead tasks |
| **Gate kiểm tra output** | [Gate 4](../../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) — Reviewer verify PR |
| **Tool hỗ trợ** | Antigravity IDE, GitHub, Lark, Telegram |

---

## Responsibilities

1. **Verify tasks** — Kiểm tra tasks từ Techlead đạt chuẩn trước khi implement
2. **Implement APIs** — Build endpoints, handle requests, return responses theo API contracts
3. **Manage database** — Design schema, viết migrations, optimize queries
4. **Handle business logic** — Implement rules, validations, và workflows phía server
5. **Ensure security** — Authentication, authorization, input validation, data protection
6. **Self-review** — Review code trước khi request review từ team
7. **Create PR** — Tạo PR với API docs updated, follow PR template

---

## Implementation Workflow

Đây là quy trình step-by-step mỗi khi Dev BE nhận tasks mới từ Techlead:

### Step 1: Nhận thông báo

Techlead tag Dev BE trên Telegram khi tasks ready (Gate 3 passed) → Dev BE biết có tasks mới.

### Step 2: Verify tasks (Gate 3)

Kiểm tra tasks theo [Gate 3 checklist](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation):

- [ ] Task được break rõ ràng: BE tasks tách biệt FE tasks
- [ ] Scope cụ thể: mô tả rõ cần implement cái gì
- [ ] User story reference: link đến user story của BA (source of truth)
- [ ] Technical constraints noted (API limits, third-party integrations)
- [ ] API contract defined (endpoint, request/response schema)
- [ ] Estimation hợp lý
- [ ] Lark task assigned đúng

> ⚠️ Nếu bất kỳ item nào **fail** → tag Techlead trên Telegram, ghi rõ task nào thiếu thông tin gì. **Không bắt đầu** implement cho đến khi tất cả pass.

### Step 3: Discuss unclear tasks

Nếu tasks cần clarification:
1. Tag Techlead trên Telegram
2. Ghi rõ task nào, question cụ thể gì
3. Chờ Techlead trả lời (Techlead có thể cần check với BA)
4. Ghi lại clarification đã nhận

### Step 4: Cross-check với BA user story

> 🔑 **Source of Truth:** BA user stories là source of truth cho implementation, không phải task description của Techlead.

Trước khi implement, đọc lại user story gốc của BA:
- Acceptance criteria có gì?
- Edge cases đã document những gì?
- Nếu task description conflict với user story → **user story wins** → hỏi BA/Techlead

### Step 5: Implement

Thực hiện implement theo task scope:
1. Follow [Coding Standards](../../reference/coding-standards.md) — branch naming, commit format
2. Implement API endpoints theo API contract
3. Create/update database schema nếu cần (migrations)
4. Implement business logic và validation rules
5. Handle error cases và edge cases
6. Commit theo conventional commits format (`feat:`, `fix:`, `docs:`, `chore:`)

### Step 6: Self-review

Trước khi request review, Dev BE tự kiểm tra:
- [ ] API responses đúng schema (success + error)
- [ ] Input validation đầy đủ (type, required fields, boundaries)
- [ ] Error handling proper (meaningful error messages, correct HTTP status codes)
- [ ] Database queries efficient (no N+1, indexes tại chỗ)
- [ ] Authentication/authorization đúng cho mỗi endpoint
- [ ] Không có console errors, no sensitive data in logs
- [ ] Đã diff toàn bộ changes

### Step 7: Create PR

1. Tạo PR theo [PR template](../../../.github/pull_request_template.md)
2. Điền đầy đủ summary, link Lark task
3. Mở section ⚙️ Backend Specific và hoàn thành checklist
4. **Update API documentation** cho endpoint changes
5. Hoàn thành AI Review Checklist
6. Request review

> 📋 **Chi tiết PR flow:** Xem [Coding Standards — Pull Requests](../../reference/coding-standards.md#pull-requests)

---

## Backend-Specific Expertise

Kiến thức chuyên môn dành riêng cho Dev BE trong team MakeIt:

### API Development (REST)

- Follow RESTful conventions: đúng HTTP methods (GET, POST, PUT, DELETE)
- Response format nhất quán: `{ data, message, error }` hoặc theo team convention
- API versioning nếu cần: `/api/v1/` prefix
- Pagination cho list endpoints: `page`, `limit`, `total`
- Filtering và sorting conventions nhất quán
- API documentation updated mỗi khi thay đổi endpoints

### Database Conventions

- **Schema design:**
  - Table/column naming: snake_case
  - Luôn có `id`, `created_at`, `updated_at` cho mỗi table
  - Foreign keys có indexes
  - Nullable columns chỉ khi thực sự cần thiết

- **Migrations:**
  - Mỗi schema change = 1 migration file
  - Migration phải reversible (có rollback)
  - Không sửa migration đã run — tạo migration mới

- **Queries:**
  - Tránh N+1 queries (dùng eager loading/joins)
  - Index cho columns frequently queried
  - Dùng query builder hoặc ORM — tránh raw SQL trừ khi cần optimize

### Authentication & Authorization

- Authentication: verify identity (JWT, session, etc.)
- Authorization: verify permissions (role-based, resource-based)
- Luôn validate token trên mỗi protected route
- Hash passwords (bcrypt, argon2) — **never** store plaintext
- Sensitive data: encrypt at rest, secure in transit (HTTPS)
- Rate limiting trên auth endpoints (prevent brute force)

### Error Handling & Logging

- **Error responses** — consistent format:
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Email is required",
      "details": [{ "field": "email", "issue": "required" }]
    }
  }
  ```
- **HTTP status codes** đúng: 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (internal error)
- **Logging** — log errors with context (request ID, user ID, endpoint)
- **Never** log sensitive data (passwords, tokens, personal info)

### Performance

- Caching cho frequently accessed data (Redis, in-memory)
- Database query optimization: EXPLAIN, indexes, denormalization khi cần
- Async processing cho heavy tasks (queues, background jobs)
- Connection pooling cho database connections
- Response compression (gzip)

---

## Handoff Points

### Cơ chế Handoff

Dev BE sử dụng **Git-based HANDOFF.md** — cơ chế giao tiếp chính:

1. BE chạy `/makeit:check-handoff` → pull HANDOFF.md từ TL (section `## For BE`)
2. BE hoàn thành → chạy `/makeit:complete` → commit HANDOFF.md cho TL (code review)
3. Telegram dùng để **notify**, Git dùng để **truyền nội dung**

### Nhận từ (Input)

| Từ ai | Nhận gì | Cách nhận | Verify bằng |
|-------|---------|----------|-------------|
| Techlead | HANDOFF.md `## For BE` (BE tasks + API contracts) | `git pull` + `/makeit:check-handoff` | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |

### Giao cho (Output)

| Giao cho ai | Giao gì | Cách giao | Được verify bằng |
|-------------|---------|----------|-------------------|
| TL (Code Review) | HANDOFF.md (implementation notes, PRs, known issues) | `/makeit:complete` + `git push` | [Gate 4](../../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) |

> 📖 **Pipeline update (Phase 8.1):** Dev BE giờ gửi output cho TL (Stage 5: code review) thay vì trực tiếp cho PO. TL review xong → deploy → gửi kết quả cho PO (Stage 6).

> 🔑 **Source of Truth reminder:** BA user stories > Techlead tasks. Khi có doubt → check user story → check PO goal → hỏi PO.

---

## AI Usage with Antigravity

Dev BE sử dụng **Antigravity IDE** để tăng tốc implementation. Dưới đây là playbook cụ thể:

### 1. API implementation từ contract

```
Tôi cần implement API endpoint theo contract:

Endpoint: [method] [path]
Request: [schema]
Response: [schema]
Business logic: [mô tả]
Validation rules: [danh sách]

Hãy tạo:
- Route handler
- Input validation
- Business logic
- Error handling (các error cases cần handle)
- Response format theo team convention
```

### 2. Database schema design

```
Cho feature: [mô tả feature]
Data requirements: [data cần store]
Relationships: [quan hệ giữa entities]

Hãy draft:
- Database schema (tables, columns, types, constraints)
- Migration file
- Indexes cần thiết
- Seed data (nếu cần cho testing)
```

### 3. Self-review trước PR

```
Review code backend này trước khi tạo PR:
[paste diff hoặc file contents]

Kiểm tra:
1. API responses đúng schema không?
2. Input validation đầy đủ chưa?
3. Error handling proper? (HTTP status codes, error messages)
4. Security issues? (injection, auth bypass, data exposure)
5. Performance? (N+1 queries, missing indexes)
6. Acceptance criteria met? [paste AC]
```

### 4. Debug backend issues

```
API endpoint [path] không hoạt động đúng:
- Expected response: [mô tả]
- Actual response: [mô tả]
- Error message (nếu có): [error]
- Request payload: [data]

[paste relevant code]

Hãy analyze root cause và suggest fix.
```

### AI Verification Rules

| AI Output | Rule |
|-----------|------|
| Generated API code/logic | **Agent tự verify** — test endpoints, verify responses, check edge cases |
| Suggested schema changes | **Phải discuss với Techlead** trước khi run migration |
| PR review suggestions | **Dev đọc và đánh giá** — không auto-apply |

> 💡 **Nguyên tắc:** AI giúp implement nhanh, nhưng Dev BE phải **verify output** — test API endpoints, check database queries, verify security. Code AI-generated cũng phải pass [AI Review Checklist](../../reference/coding-standards.md#ai-review-checklist).

---

## Quick Reference

| Hành động | Xem tài liệu |
|-----------|---------------|
| Xem vị trí Dev BE trong workflow | [Team Workflow — Stage 4](../../workflows/team-workflow.md#stage-4-febe-implementation) |
| Tra checklist verify tasks | [Gate 3](../../reference/quality-gates.md#gate-3-techlead--febe-tasks-ready-for-implementation) |
| Tra checklist tạo PR | [Gate 4](../../reference/quality-gates.md#gate-4-febe--review-code-ready-for-review) |
| Coding standards | [Coding Standards](../../reference/coding-standards.md) |
| Source of truth hierarchy | [Team Workflow — Source of Truth](../../workflows/team-workflow.md#source-of-truth-hierarchy) |
| Templates | [Dev BE Templates](./templates.md) |

---

*Role: Backend Developer · [← Roles](../README.md) · [Templates →](./templates.md)*
