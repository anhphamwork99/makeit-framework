# Phase Context: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Techlead
**Date:** [YYYY-MM-DD]
**Discussed with:** [User/PO/Team]

---

## Phase Boundary

<!-- What is IN scope and OUT of scope for this phase -->

**In scope:**
- [Deliverable or activity 1 — specific]
- [Deliverable or activity 2 — specific]

**Out of scope (deferred):**
- [Item deferred to future phase — reason]
- [Item explicitly excluded — reason]

## Implementation Decisions

<!-- Key decisions made during discuss-phase that constrain planning -->

### Architecture Approach
- [Monolith or microservice boundary for this feature?]
- [State management approach — server-side vs client-side?]
- [Data flow pattern — sync vs async?]
- [Design patterns to apply — repository, service layer, CQRS?]

### API Design
- [REST or GraphQL for this feature?]
- [Pagination strategy — cursor vs offset?]
- [Error response format — RFC 7807 or custom?]
- [Versioning approach — URL path vs header?]

### FE/BE Task Split
- [Where does validation live — client, server, or both?]
- [SSR vs CSR for this feature?]
- [Component complexity — atomic or composite?]
- [Shared types/interfaces — where to define?]

### Technical Stack Decisions
- [New library needed? Which one and why?]
- [Existing pattern sufficient or needs extension?]
- [Third-party service integration approach?]

### Performance & Security
- [Caching strategy — Redis, in-memory, CDN?]
- [Query optimization scope — indexes, pagination, denormalization?]
- [Auth/authz requirements — role-based, permission-based?]
- [Data sensitivity level — encryption, masking needed?]

### Estimation Method
- [Story points vs time-based?]
- [Risk factor multiplier?]
- [Buffer allocation strategy?]

## Agent's Discretion

<!-- Areas where the agent can make decisions without asking -->

- [Area 1 — e.g., "Task naming convention — follow existing pattern"]
- [Area 2 — e.g., "Estimation buffer — agent applies standard 1.3x multiplier"]
- [Area 3 — e.g., "API contract format — agent uses convention from api-contract-convention.md"]

## ADR Candidates

<!-- Architecture Decision Records that should be formally created -->

| Topic | Trigger | Priority |
|-------|---------|----------|
| [Topic — e.g., "Auth session management"] | [Why ADR needed — significant trade-offs] | [High/Med/Low] |
| [Topic] | [Trigger] | [Priority] |

## Specific Ideas

<!-- Concrete ideas from the discussion that should be incorporated -->

- [Idea 1 — specific implementation suggestion from user]
- [Idea 2 — specific approach agreed upon]

## Deferred Ideas

<!-- Good ideas that don't belong in this phase — saved for future -->

| Idea | Reason Deferred | Future Phase |
|------|----------------|--------------|
| [Idea description] | [Out of current scope] | [Phase or "backlog"] |
| [Idea description] | [Dependency not ready] | [Phase or "backlog"] |

---

## Instructions

**How to fill this template:**

1. **Phase Boundary:** Clearly state what's in and out of scope — prevents scope creep during execution
2. **Implementation Decisions:** Capture decisions per TL-specific area (architecture, API, FE/BE split, tech stack, performance, estimation)
3. **Agent's Discretion:** List areas where agent can decide freely — reduces unnecessary user questions
4. **ADR Candidates:** Track topics needing formal Architecture Decision Records — TL-specific
5. **Specific Ideas:** Record concrete suggestions from the discussion session
6. **Deferred Ideas:** Track good ideas that don't fit this phase — use table with future phase reference

**Rule:** Max 3-5 questions at a time, then check with user before continuing. Include "You decide" option when agent discretion is reasonable. Architecture decisions MUST be locked before plan-phase.

---

## Filled Example

```markdown
# Phase Context: Phase 01 — Task Breakdown

**Sprint:** SPRINT-003
**Phase:** 01 — Task Breakdown
**Role:** Techlead
**Date:** 2026-02-15
**Discussed with:** PO (Anh)

---

## Phase Boundary

**In scope:**
- Break login and registration stories into FE/BE tasks
- Define API contracts for auth endpoints
- Estimate effort for all tasks

**Out of scope (deferred):**
- Password recovery flow — separate story, next sprint
- Social OAuth integration — out of MVP scope

## Implementation Decisions

### Architecture Approach
- REST API with Express.js — existing project pattern
- JWT auth with refresh tokens — stateless approach for scalability
- Repository pattern for data access — consistent with existing codebase

### API Design
- REST endpoints: POST /auth/login, POST /auth/register, POST /auth/refresh
- Error format: { error: { code, message, details } } — matches existing API
- No versioning needed — internal API for single frontend

### FE/BE Task Split
- Validation: both (FE for UX, BE for security)
- CSR for auth pages — no SEO needed
- Shared types in `@types/auth.ts`

### Estimation Method
- Story points (relative sizing) — team standard
- Risk multiplier: 1.3x for auth (security-sensitive)
- 10% buffer for integration testing

## Agent's Discretion

- Task naming: follow `TASK-{feature}-{fe|be}.md` pattern
- API contract format: use convention from api-contract-convention.md
- Estimation breakdown: agent decides sub-task granularity

## ADR Candidates

| Topic | Trigger | Priority |
|-------|---------|----------|
| JWT session management | Refresh token rotation vs sliding expiry | High |

## Deferred Ideas

| Idea | Reason Deferred | Future Phase |
|------|----------------|--------------|
| Rate limiting on auth endpoints | Infrastructure concern, not feature scope | Phase 03 |
| Biometric login | Out of MVP | Backlog |
```
