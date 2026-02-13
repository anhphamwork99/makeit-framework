---
name: be-workflow-implement
description: BE implementation workflow — layer-by-layer code implementation with STOP mechanism for destructive operations
---

<purpose>
Implement backend feature according to task scope — layer-by-layer with atomic commits, STOP mechanism for destructive operations, and security checklist.
</purpose>

<process>
  <step name="load_context">
    1. Task specs + linked user story (source of truth)
    2. API contract (from `design-api` workflow)
    3. DB schema (from `design-schema` workflow)
    4. Existing codebase patterns — scan project structure
    5. `@_shared/references/coding-standards.md` — commit format, branch naming
  </step>

  <step name="create_implementation_plan">
    Use `@be-execution/templates/implementation-plan.md`:
    1. List API endpoints to implement
    2. List data models / entities
    3. Define business logic steps
    4. Plan file structure
    5. Identify dependencies
    6. Estimate per-step effort
  </step>

  <step name="implement_by_layers">
    Execute sequentially — each layer committed separately:

    **Layer 1 — Models/Entities:**
    - Create data models, types, interfaces
    - Define relationships, constraints
    - Commit: `feat: add [resource] model`

    **Layer 2 — Database:**
    - Create migrations (must be reversible)
    - Seed data (if needed for development)
    - Commit: `feat: add [resource] migration`

    > ⚠️ **STOP:** Before running migration on shared DB → wait for confirmation

    **Layer 3 — Services:**
    - Business logic, validations
    - External service integrations
    - Commit: `feat: add [resource] service with business logic`

    **Layer 4 — Controllers:**
    - Route handlers, input validation
    - Authentication/authorization middleware
    - Commit: `feat: add [resource] controller with route handlers`

    **Layer 5 — Tests:**
    - Unit tests for services
    - Integration tests for API endpoints
    - Commit: `test: add [resource] unit tests`

    **Layer 6 — Documentation:**
    - API docs update (Swagger/OpenAPI if applicable)
    - README update if needed
    - Commit: `docs: update API documentation for [resource]`
  </step>

  <step name="error_handling">
    All endpoints MUST have proper error handling:
    ```json
    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Email is required",
        "details": [{ "field": "email", "issue": "required" }]
      }
    }
    ```

    HTTP status codes: 200 (GET/PUT), 201 (POST), 204 (DELETE),
    400 (validation), 401 (unauthorized), 403 (forbidden), 404 (not found),
    409 (conflict), 422 (business rule), 500 (server error).
  </step>

  <step name="security_checklist">
    Before considering implementation done:
    - [ ] No hardcoded secrets — environment variables used
    - [ ] Input validation on all external endpoints
    - [ ] Authentication middleware on protected routes
    - [ ] Authorization checks (role-based if needed)
    - [ ] SQL injection prevention (parameterized queries)
    - [ ] Rate limiting on public endpoints
    - [ ] No sensitive data in logs
    - [ ] CORS configured properly
  </step>
</process>

## ⚠️ STOP — Destructive Operations

| Trigger | Impact |
|---------|--------|
| `DROP TABLE`, `DROP COLUMN` | Data loss, non-reversible |
| Delete/overwrite existing files | Code loss |
| `git push --force`, `git reset --hard` | History loss |
| Run migrations on shared database | Team impact |
| Modify shared config (`.env`, docker-compose) | Environment impact |

```
⚠️ STOP — Destructive operation detected
Action: [Description]
Impact: [What could be affected]
Reversible: [Yes/No]
→ Confirm "proceed" to continue
→ Or "cancel" to abort
```

### After STOP Approved

When user confirms a destructive operation:

1. **Log action in STATE.md:**
   ```
   STOP approved: [action description] at [timestamp]
   ```

2. **Note rollback command** (if applicable):
   - `DROP TABLE` → provide `CREATE TABLE` rollback SQL
   - `DROP COLUMN` → note column definition for re-add
   - `git push --force` → note previous HEAD commit: `git reset --hard <commit>`
   - Delete files → note file paths for recovery: `git checkout HEAD -- <path>`
   - Migration on shared DB → note rollback migration command: `npm run migrate:rollback`
   - Modify shared config → save backup of original values

3. **Proceed with operation**

<edge_cases>

**Khi AI tạo code đúng cấu trúc nhưng sai business logic:** Dừng lại, đối chiếu implementation với acceptance criteria trong user story. Nếu logic không khớp — sửa trước khi tiếp tục layer tiếp theo. Log vào STATE.md: "Business logic corrected: [mô tả]".

**Khi requirement thay đổi giữa chừng implementation:** ⚠️ STOP — Requirement đã thay đổi sau khi implementation bắt đầu. Đánh giá impact lên code/migration đã viết. Nếu migration đã chạy → cần rollback plan. Log vào STATE.md và thông báo Techlead qua Telegram.

**Khi phát hiện spec sai trong lúc implement:** ⚠️ STOP — Phát hiện spec không khớp thực tế khi coding (acceptance criteria mâu thuẫn, API contract thiếu field, business rule không rõ). Ghi rõ vấn đề, escalate lên Techlead/BA để clarify trước khi code tiếp.

**Khi AI tạo code chạy được nhưng chất lượng thấp (missing indexes, N+1 queries, inefficient logic):** Chủ động kiểm tra query patterns khi viết service layer — dùng eager loading thay vì lazy loading trong loops. Kiểm tra index coverage cho mọi FK và frequent query filters trước khi commit.

**Khi task implementation vượt quá khả năng AI (business logic quá phức tạp):** ⚠️ STOP — Task quá phức tạp để implement tự động. Mô tả phần nào AI không tự tin, đề xuất pair-programming mode hoặc chia nhỏ task. Log vào STATE.md.

**Khi cần modify shared config (.env, docker-compose, CI/CD) mà có thể conflict với dev khác:** ⚠️ STOP — Shared resource conflict tiềm ẩn. Liệt kê files cần thay đổi, kiểm tra xem dev khác có đang modify cùng file không. Thông báo team qua Telegram trước khi sửa.

**Khi migration không thể rollback (data transformation, column type change, data deletion):** ⚠️ STOP — Migration không reversible. Tạo backup plan: snapshot data trước khi chạy, viết rollback SQL thủ công nếu cần. KHÔNG chạy migration irreversible mà chưa có Techlead approve.

**Khi third-party API không available hoặc trả response khác expected:** Implement fallback: retry logic (max 3 lần, exponential backoff), circuit breaker pattern, và meaningful error responses cho client. Nếu API critical cho transaction → implement compensation/rollback logic.

</edge_cases>
