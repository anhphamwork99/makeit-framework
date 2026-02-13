# PR: [type]: [short description]

**Task:** [LARK-ID]
**Type:** feat / fix / docs / chore
**Branch:** [branch-name]

---

## Summary

[Mô tả ngắn gọn thay đổi + lý do — 2-3 câu]

## Changes

### API Endpoints Changed

| Method | Path | Change Type | Description |
|--------|------|-------------|-------------|
| [GET/POST/PUT/DELETE] | /api/v1/[resource] | [New/Modified/Removed] | [Description] |

### Database Changes

| Migration | Description | Reversible |
|-----------|-------------|------------|
| [migration_name] | [What it does] | ✅/❌ |

### Business Logic

- [Change 1 — mô tả logic thay đổi]
- [Change 2]

## Testing Done

| Type | Coverage | Notes |
|------|----------|-------|
| Unit tests | [N tests] | [Key scenarios tested] |
| Integration tests | [N tests] | [API endpoints tested] |
| Manual testing | [Done/N/A] | [What was tested manually] |

## Checklist

### General
- [ ] PR follows template
- [ ] Lark task linked
- [ ] Commit messages follow conventional commits (feat, fix, docs, chore)
- [ ] Self-reviewed diff before requesting review

### ⚙️ Backend Specific
- [ ] API documentation updated for endpoint changes
- [ ] Input validation on all external-facing endpoints
- [ ] Error handling proper (meaningful messages, correct HTTP status codes)
- [ ] No hardcoded secrets — environment variables used
- [ ] Database migrations reversible
- [ ] No N+1 queries
- [ ] Authentication/authorization correct for each endpoint

### AI Review Checklist
- [ ] No hallucinated imports — packages exist in project
- [ ] No incorrect API usage — correct method signatures
- [ ] No hardcoded values that should be config/env
- [ ] AI output matches plan/specs — không thêm/bớt scope
- [ ] Acceptance criteria met
- [ ] Edge cases handled


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
