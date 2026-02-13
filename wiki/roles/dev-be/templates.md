# Dev BE Templates

Templates copy-paste cho Backend Developer. Copy template → điền thông tin → dùng trong workflow.

---

## API Endpoint Checklist

Sử dụng trước khi coi endpoint là "done":

```markdown
## Endpoint: [METHOD] [/api/path]

### Route & Contract
- [ ] HTTP method đúng (GET/POST/PUT/DELETE)
- [ ] Path naming RESTful (nouns, plural: `/api/users`, `/api/orders`)
- [ ] Request schema validated (required fields, types, boundaries)
- [ ] Response schema match API contract (success + error responses)
- [ ] API documentation updated

### Validation
- [ ] Required fields validated
- [ ] Data types checked (string, number, boolean, date)
- [ ] Boundaries enforced (min/max length, min/max value, allowed values)
- [ ] SQL injection prevented (parameterized queries hoặc ORM)
- [ ] XSS inputs sanitized (strip HTML/scripts nếu applicable)

### Error Handling
- [ ] 400 Bad Request — invalid input, validation errors
- [ ] 401 Unauthorized — missing/expired authentication
- [ ] 403 Forbidden — authenticated but not authorized
- [ ] 404 Not Found — resource doesn't exist
- [ ] 500 Internal Error — unexpected server errors (with logging)
- [ ] Error response format consistent: `{ error: { code, message, details } }`

### Security
- [ ] Authentication required (nếu protected endpoint)
- [ ] Authorization checked (user has permission for this resource)
- [ ] Rate limiting configured (nếu public-facing)
- [ ] Sensitive data not in response (passwords, tokens, internal IDs)
- [ ] CORS configured correctly

### Database
- [ ] Queries efficient (no N+1, proper JOINs)
- [ ] Indexes exist cho queried columns
- [ ] Migration created (nếu schema change)
- [ ] Migration reversible (có rollback)
- [ ] Connection handling clean (no leaked connections)

### Quality
- [ ] Không có console errors
- [ ] Logging có context (request ID, user, endpoint)
- [ ] No sensitive data in logs
- [ ] Edge cases handled (empty data, null, concurrent access)
```

---

## PR Checklist for Backend Changes

Sử dụng khi tạo PR có thay đổi backend:

```markdown
## PR Checklist — Backend

### API
- [ ] API documentation updated cho mỗi endpoint change
- [ ] Request/response schemas documented
- [ ] Breaking changes flagged (nếu có) — notify FE team
- [ ] Backward compatible (hoặc đã coordinate với FE)

### Database
- [ ] Migration file included (nếu schema change)
- [ ] Migration tested: up + down (reversible)
- [ ] Seed data updated (nếu cần)
- [ ] No destructive changes without explicit approval
- [ ] Indexes reviewed cho new queries

### Security
- [ ] No secrets/keys hardcoded (dùng env vars)
- [ ] Input validation present cho tất cả user input
- [ ] Auth/authz checks present trên protected endpoints
- [ ] No SQL injection vulnerabilities
- [ ] Sensitive data handling correct (hashing, encryption)

### Performance
- [ ] Database queries reviewed (EXPLAIN nếu complex)
- [ ] No N+1 query patterns
- [ ] Caching considered cho heavy reads
- [ ] Async processing cho long-running tasks

### Testing
- [ ] API endpoints tested locally (request/response correct)
- [ ] Error cases tested (invalid input, unauthorized, not found)
- [ ] Edge cases tested (empty data, boundary values)

### Standards
- [ ] Code follows [Coding Standards](../../reference/coding-standards.md)
- [ ] AI Review Checklist completed
- [ ] Self-reviewed diff
- [ ] Lark task linked
```

---

*Templates cho: Backend Developer · [← Dev BE Workflow](./README.md)*
