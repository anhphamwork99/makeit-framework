# Handoff: Dev BE → PO (Review)

> Agent: Điền template này khi BE hoàn thành sprint deliverables và sẵn sàng handoff cho PO review.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** Dev BE
- **Receiver:** PO (Review)
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1-2 câu tóm tắt: BE đã implement gì — APIs, schema, migrations. PO cần review và approve.]

---

## Implementation Summary

| Area | Status | Notes |
|------|--------|-------|
| API endpoints | ✅ Implemented | [N endpoints — list names] |
| Database schema | ✅ Migrated | [Tables created/modified] |
| Business logic | ✅ Tested | [Key business rules implemented] |
| Security | ✅ Checked | [Auth, validation, injection prevention] |
| Performance | ✅ Acceptable | [Query benchmarks, N+1 checks] |

## Deliverable Paths

> PO agent: Dùng `view_file` để đọc từng file bên dưới.

| # | Path | Type | Description |
|---|------|------|-------------|
| 1 | `deliverables/api/API-CONTRACT-{feature}.md` | API Contract | [Brief description] |
| 2 | `deliverables/schema/SCHEMA-{feature}.md` | Schema Design | [Brief description] |
| 3 | `deliverables/migrations/MIGRATION-NNN.md` | Migration Doc | [Brief description] |

## Pull Request

- **PR:** #{PR number} — [PR title]
- **Branch:** `feat/SPRINT-{NNN}-{short-description}`
- **Files changed:** [N files]
- **Tests:** [N tests passed, N new tests added]

## API Endpoints Implemented

| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| POST | `/api/v1/{resource}` | ✅ | [Brief] |
| GET | `/api/v1/{resource}/:id` | ✅ | [Brief] |
| PUT | `/api/v1/{resource}/:id` | ✅ | [Brief] |

## Test Results Summary

| Category | Pass | Fail | Skip | Coverage |
|----------|------|------|------|----------|
| Unit tests | [N] | 0 | 0 | [N%] |
| Integration | [N] | 0 | 0 | — |
| E2E (API) | [N] | 0 | 0 | — |

## Known Limitations

- [Any intentional deviation from spec with reason]
- [Performance notes or caveats]
- [Migration rollback considerations]

## External Links

| Type | Link |
|------|------|
| Pull Request | [PR link] |
| Lark Sprint Issue | [Lark link] |
| API Documentation | [API docs link nếu có] |
| TL Handoff (received) | [Path to TL HANDOFF.md đã nhận] |

## Gate 4 Status (BE)

- ✅ API contracts match specs
- ✅ Input validation đầy đủ
- ✅ Error handling proper
- ✅ Security checked
- ✅ Database queries efficient
- ✅ Migrations reversible
- ✅ No sensitive data in logs
- ✅ API documentation updated

**Verdict:** PASS — ready for PO review

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md
```

> Commit file này vào product repo khi chạy `stage-complete`.
> PO sẽ đọc file này khi chạy `/makeit:check-handoff`.

---

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
| {e.g., adr-003} | {e.g., Architecture decision that shaped this implementation} |
| {e.g., lesson-012} | {e.g., Lesson learned from previous API implementation} |

> 💡 Populate during deliverable creation. Use `/makeit:search-kb` to find relevant docs.
> Leave empty if no relevant knowledge docs exist yet.
