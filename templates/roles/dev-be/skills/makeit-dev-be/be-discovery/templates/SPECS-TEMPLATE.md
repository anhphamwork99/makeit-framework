---
sprint-id: "SPRINT-{NNN}"
title: "{Sprint title from Lark}"
role: "dev-be"
created: "{YYYY-MM-DD}"
---

# Sprint Specifications

<!-- 
  This file captures WHAT needs to be delivered in this sprint.
  
  Created by: stage-clarify (from SPECS-TEMPLATE.md)
  Source: Lark Sprint issue content + Techlead task breakdown
  
  The orchestrator reads this to:
  - Understand what deliverables are expected
  - Break down into phases (ROADMAP.md)
  - Verify completion against success criteria
-->

## Goal

<!-- Extract this from the Lark Sprint issue description -->
<!-- Answer: What is the backend outcome of this sprint? -->

{From Lark Sprint issue — what backend system is being built/changed?}

## Context

<!-- Background information needed to execute this sprint -->
<!-- Include: API contracts, schema requirements, security constraints -->

{Background, constraints, dependencies from Techlead task breakdown}

### Upstream Input

<!-- What was handed off from the previous stage? -->
<!-- For BE: Techlead tasks + BA user stories + (optional) Designer API mockups -->

- **From:** Techlead (Stage 3)
- **Handoff:** {description of tasks received}
- **User Stories:** {BA story IDs for requirement traceability}
- **Reference:** {link to handoff document or Lark issue}

## Deliverables

<!-- List ALL expected outputs with enough detail to verify completion -->
<!-- Each deliverable should be checkable — clear format, destination -->

- [ ] {API contract} — {endpoints documented, shared with FE}
- [ ] {Database schema/migration} — {tables, relationships, indexes}
- [ ] {API implementation} — {controllers, services, models — PR submitted}
- [ ] {Integration tests} — {test coverage target, key scenarios}
- [ ] {API documentation} — {endpoint docs updated}

<!-- 
  BE deliverable examples:
  - "Auth API contract — 4 endpoints documented, shared with FE at Sync Point 1"
  - "Users table migration — create_users with indexes, reversible"
  - "Auth service + controllers — login, register, refresh, logout endpoints"
  - "Auth integration tests — >80% coverage, happy + error paths"
  - "API documentation — OpenAPI/Swagger or markdown endpoint docs"
-->

## Success Criteria

<!-- Specific, checkable conditions that must ALL be true for sprint to be complete -->
<!-- These are VERIFIED by stage-verify-phase and stage-complete -->

1. {API endpoints return correct HTTP status codes per contract}
2. {All migrations reversible — rollback tested}
3. {Integration tests pass with >{coverage}% coverage}
4. {Security checks pass — auth, input validation, no data exposure}
5. {No N+1 queries — database performance verified}

<!-- 
  Good BE criteria examples:
  - "All 4 auth endpoints return correct HTTP status codes"
  - "Migrations reversible — rollback tested in dev"
  - "Integration tests cover all endpoints with >80% coverage"
  - "JWT tokens expire correctly, refresh rotation works"
  - "No sensitive data in API responses (password, tokens filtered)"
  
  Bad criteria examples:
  - "API works" (too vague)
  - "Code is clean" (not checkable)
-->

## References

<!-- Links to source materials and upstream artifacts -->
<!-- The orchestrator and sub-agents use these for context -->

- **Lark Sprint Issue:** {link or ID}
- **Techlead Task Breakdown:** {link or description}
- **BA User Stories:** {story IDs or links}
- **API Contract (if pre-existing):** {link or "To be designed"}
- **Schema Design (if pre-existing):** {link or "To be designed"}
- **FE Coordination:** {FE dev contact, Sync Point timeline}
- **Related Issues:** {links to related Lark issues}

## Acceptance Notes

<!-- Any additional notes on what "done" means for THIS specific sprint -->
<!-- Include edge cases, out-of-scope items, and quality expectations -->

{Any notes on what "done" means for this sprint}

### Out of Scope

<!-- Explicitly list what is NOT included in this sprint -->
<!-- Prevents scope creep during execution -->

- {item explicitly excluded — e.g., "Admin endpoints deferred to Sprint N+1"}
- {item deferred to future sprint}

### ⚠️ STOP Awareness

<!-- List any operations that require STOP mechanism confirmation -->

- {Destructive migration? — e.g., "DROP existing_table NOT in scope"}
- {Shared database impact? — e.g., "Users table is shared with Service X"}
