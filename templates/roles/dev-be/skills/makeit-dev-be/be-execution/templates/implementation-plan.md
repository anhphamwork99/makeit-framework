# Implementation Plan: [Feature Name]

**Task:** [LARK-ID]
**User Story:** [Link to BA user story — source of truth]
**API Contract:** [Link to api-contract.md nếu đã tạo]
**Sprint:** [Sprint N]

---

## Scope

**Implement:** [Mô tả ngắn cần implement cái gì]
**Out of scope:** [Cái gì KHÔNG implement trong task này]

## API Endpoints to Implement

| # | Method | Path | Description | Status |
|---|--------|------|-------------|--------|
| 1 | [GET/POST/PUT/DELETE] | /api/v1/[resource] | [Description] | [ ] |

## Data Models / Entities

| Entity | Table | Key Fields | Notes |
|--------|-------|------------|-------|
| [Entity name] | [table_name] | [field1, field2] | [New/Modified] |

## Business Logic Steps

1. [ ] [Step 1 — cụ thể action]
2. [ ] [Step 2]
3. [ ] [Step 3]

## File Structure

```
src/
├── controllers/
│   └── [resource].controller.ts    # Route handlers
├── services/
│   └── [resource].service.ts       # Business logic
├── models/
│   └── [resource].model.ts         # Data model / entity
├── migrations/
│   └── [timestamp]_[description].ts # DB migration
├── validators/
│   └── [resource].validator.ts     # Input validation
└── tests/
    ├── [resource].service.test.ts  # Unit tests
    └── [resource].e2e.test.ts      # Integration tests
```

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| [External service / shared library] | [External/Internal] | [Available/Pending] |

## Checklist

- [ ] API contract documented
- [ ] Database schema designed (if needed)
- [ ] Models created
- [ ] Services implemented with business logic
- [ ] Controllers with route handlers
- [ ] Input validation
- [ ] Error handling (proper HTTP status codes)
- [ ] Authentication/authorization
- [ ] Unit tests
- [ ] Integration tests
- [ ] Self-review completed
