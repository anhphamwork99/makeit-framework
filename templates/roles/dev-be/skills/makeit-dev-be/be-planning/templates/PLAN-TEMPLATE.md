# Phase Plan: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev BE
**Date:** [YYYY-MM-DD]
**Complexity:** [S/M/L/XL — from assess_complexity step]

---

## Objective

[Phase goal from ROADMAP.md — 1-2 sentences describing what this phase delivers]

## Context

- **Sprint Goal:** [From SPECS.md — business outcome]
- **Phase Dependencies:** [Prior phases this builds on, or "None"]
- **SPECS Reference:** [Relevant success criteria IDs, e.g., SC1, SC3]
- **CONTEXT.md:** [Key decisions from discuss-phase, or "N/A — no discuss-phase"]
- **RESEARCH.md:** [Key research findings, or "N/A — no research-phase"]
- **API Contract:** [Existing contract reference, or "To be designed in this phase"]
- **Schema Design:** [Existing schema reference, or "To be designed in this phase"]

## Tasks

<!-- Max 3 tasks. Each task = one layer/endpoint, one workflow, one verification. -->
<!-- Follow BE layer ordering: models → migrations → services → controllers → tests -->

| # | Task | Internal Workflow | Spawn | Files |
|---|------|-------------------|-------|-------|
| 1 | [Task name — action-oriented, e.g., "Design auth API contract"] | [BE workflow, e.g., design-api] | [Inline/Spawn — from spawn decision matrix] | [Output file path] |
| 2 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |
| 3 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |

### Task Details

**Task 1: [Task name]**
- **Files:** [Output file path(s) — API contracts, schemas, code]
- **Internal Workflow:** [implement / design-api / design-schema]
- **Layer:** [model / migration / service / controller / test / docs]
- **Action:** [Specific action description — what the agent does]
- **Verify:** [How to verify this task is done correctly]
- **Done:** [Criteria for task completion]
- **⚠️ STOP:** [Destructive operations in this task? YES — describe / NO]

**Task 2: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [BE workflow reference]
- **Layer:** [Layer in stack]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]
- **⚠️ STOP:** [Destructive flag]

**Task 3: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [BE workflow reference]
- **Layer:** [Layer in stack]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]
- **⚠️ STOP:** [Destructive flag]

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | [API design / Schema design / Implementation / Testing] | [Inline / Spawn] | [≤1 endpoint → inline / >1 → spawn] |
| 2 | [Type] | [Decision] | [Reason based on spawn decision matrix] |
| 3 | [Type] | [Decision] | [Reason] |

## Migration Plan

<!-- Flag any destructive operations for STOP mechanism -->

| Migration | Type | Reversible | ⚠️ STOP |
|-----------|------|------------|---------|
| [migration-name] | [create/alter/drop] | [Yes/No — rollback plan] | [Yes if DROP/destructive] |

<!-- If no migrations: "No database migrations in this phase." -->

## Verification

<!-- Maps back to SPECS.md success criteria -->

- [ ] [SC reference] — [Verification check, specific and checkable]
- [ ] [SC reference] — [Verification check]
- [ ] [SC reference] — [Verification check]

---

## Instructions

**How to fill this template:**

1. **Objective:** Copy phase goal verbatim from ROADMAP.md
2. **Context:** Reference SPECS.md success criteria IDs, CONTEXT.md decisions, RESEARCH.md findings, and API/schema references
3. **Tasks:** Max 3 tasks — each maps to one BE internal workflow (implement, design-api, design-schema)
4. **Layer:** Specify which layer in the stack this task targets — ensures correct ordering
5. **STOP flag:** Mark YES on any task with destructive DB operations (DROP TABLE, DROP COLUMN, DELETE data)
6. **Migration Plan:** Document all DB migrations with reversibility status
7. **Verification:** Each check must trace to a SPECS.md success criterion

**BE task type reference:**
- Design API contract → produces API contract document (endpoints, schemas, error codes)
- Design schema → produces schema design document (tables, relationships, indexes)
- Implement model/entity → produces ORM models or entity definitions
- Implement migration → produces DB migration files (⚠️ flag destructive)
- Implement service → produces business logic layer
- Implement controller → produces API route handlers
- Write tests → produces integration/unit test files
- Self-review → produces Gate 4 verification

**BE layer ordering:** models → migrations → services → controllers → tests → docs

---

## Filled Example

```markdown
# Phase Plan: Phase 02 — Auth API Implementation

**Sprint:** SPRINT-003
**Phase:** 02 — Auth API Implementation
**Role:** Dev BE
**Date:** 2026-02-15
**Complexity:** M

---

## Objective

Implement authentication API endpoints based on Phase 1 API contract — login, register, refresh token, logout.

## Context

- **Sprint Goal:** Deliver auth API with JWT + refresh token rotation
- **Phase Dependencies:** Phase 01 — API Design (contract complete)
- **SPECS Reference:** SC1 (endpoints match contract), SC2 (tests pass), SC4 (security)
- **CONTEXT.md:** JWT + refresh rotation chosen, bcrypt for hashing
- **RESEARCH.md:** jose library recommended for JWT
- **API Contract:** deliverables/API-CONTRACT-auth.md
- **Schema Design:** deliverables/SCHEMA-users.md

## Tasks

| # | Task | Internal Workflow | Spawn | Files |
|---|------|-------------------|-------|-------|
| 1 | Implement User model + migration | implement | Inline | src/models/User.ts, migrations/001_create_users.ts |
| 2 | Implement auth service + controllers | implement | Inline | src/services/auth.ts, src/controllers/auth.ts |
| 3 | Write auth integration tests | implement | Inline | tests/integration/auth.test.ts |

## Migration Plan

| Migration | Type | Reversible | ⚠️ STOP |
|-----------|------|------------|---------|
| 001_create_users | create table | Yes — DROP TABLE users | No |

## Verification

- [ ] SC1 — All 4 auth endpoints return correct HTTP status codes
- [ ] SC2 — Integration tests pass with >80% coverage
- [ ] SC4 — JWT tokens have proper expiry and refresh rotation works
```
