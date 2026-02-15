# Handoff: Dev BE → Techlead (Code Review)

> Agent: Điền template này khi BE hoàn thành sprint deliverables và sẵn sàng handoff cho TL code review.
> HANDOFF.md là **routing document** — trỏ đến files, KHÔNG inline nội dung deliverables.

## Sprint Info

- **Sprint:** SPRINT-{NNN}
- **Date:** {YYYY-MM-DD}
- **Sender:** Dev BE
- **Receiver:** Techlead (Code Review)
- **Sprint Issue:** [Lark Sprint Issue link]

---

## Summary

[1 câu tóm tắt: BE đã implement APIs, schema, và business logic — TL cần review code + approve PR.]

---

## What I've Done

- [x] {API endpoints implemented} — `src/api/{resource}/route.ts`
- [x] {Database schema migrated} — `prisma/migrations/NNN_{description}/`
- [x] {Business logic tested} — `src/services/{feature}.ts`
- [x] {Security checked} — auth, validation, injection prevention verified
- [x] {API documentation updated} — `docs/api/{feature}.md`

> Agent: Mỗi deliverable 1 dòng checklist + file path.

---

## Pull Request

- **PR:** #{PR number} — [PR title]
- **Branch:** `feat/SPRINT-{NNN}-{short-description}`
- **Files changed:** [N files]
- **Tests:** [N tests passed, N new tests added]

---

## Implementation Summary

| Area | Status | Notes |
|------|--------|-------|
| API endpoints | ✅ Implemented | [N endpoints — list names] |
| Database schema | ✅ Migrated | [Tables created/modified] |
| Business logic | ✅ Tested | [Key business rules implemented] |
| Security | ✅ Checked | [Auth, validation, injection prevention] |
| Performance | ✅ Acceptable | [Query benchmarks, N+1 checks] |

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

---

## Tasks For Receiver

> AI Agent tự fill tất cả — human chỉ review + approve.

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {Review PR #{N} — check code quality + architecture compliance} | {LARK-XXXX} | {Display name} | — |
| 2 | {Check API contracts match specs} | {LARK-XXXX} | {Display name} | LARK-XXXX |
| 3 | {Verify security + performance} | {LARK-XXXX} | {Display name} | — |
| 4 | {Approve/reject code quality} | {LARK-XXXX} | {Display name} | LARK-XXXX |

> ⚠️ Nếu Lark MCP không available, ghi "Pending" thay vì Lark IDs. Retry sau hoặc tạo manual.

---

## Shared Context

### Key Decisions

- {Decision 1 — API design, schema choices, business logic approach}
- {Decision 2 — performance optimization decisions}

### Links

| Type | Link |
|------|------|
| Pull Request | [PR link] |
| Lark Sprint Issue | [Lark link] |
| API Documentation | [API docs link nếu có] |
| Previous Handoff | [Path to TL HANDOFF.md đã nhận] |

---

## Gate 4 Status (BE)

- ✅ API contracts match specs
- ✅ Input validation đầy đủ
- ✅ Error handling proper
- ✅ Security checked
- ✅ Database queries efficient
- ✅ Migrations reversible
- ✅ No sensitive data in logs
- ✅ API documentation updated

**Verdict:** PASS — ready for Techlead code review

## Git Path

```
.makeit/sprint/SPRINT-{NNN}/be/HANDOFF.md
```

> Commit file này vào product repo khi chạy `stage-complete`.
> TL sẽ đọc file này khi chạy `/makeit:check-handoff`.

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
