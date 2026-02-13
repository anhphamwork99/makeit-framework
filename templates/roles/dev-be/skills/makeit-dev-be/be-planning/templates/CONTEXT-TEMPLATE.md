# Phase Context: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev BE
**Date:** [YYYY-MM-DD]
**Discussion with:** [User/PO/Techlead]

---

## Phase Boundary

<!-- What IS in scope vs what is NOT for this phase -->

**In scope:**
- [Specific deliverable or feature]
- [Specific deliverable or feature]

**Out of scope (deferred):**
- [Feature deferred to later phase]
- [Feature deferred to later phase]

## Implementation Decisions

### Infrastructure

<!-- Cache strategy, queue system, cron scheduling, deployment approach -->

| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Cache strategy] | [Redis / Memcached / In-memory / None] | [Why this choice] |
| [Queue system] | [Bull / RabbitMQ / SQS / None] | [Why this choice] |
| [Scheduling] | [Cron / Bull repeatable / node-cron / None] | [Why this choice] |

### Performance Requirements

<!-- Expected load, response time SLA, batch processing needs -->

| Metric | Target | Notes |
|--------|--------|-------|
| [Response time] | [< 200ms p95 / < 500ms p95 / best effort] | [Critical endpoints] |
| [Concurrent users] | [Expected number] | [Peak vs average] |
| [Batch processing] | [Volume/frequency] | [Background jobs needed?] |

### Security Considerations

<!-- Auth method, role-based access, data encryption, rate limiting -->

| Aspect | Decision | Details |
|--------|----------|---------|
| [Authentication] | [JWT / Session / OAuth / API Key] | [Token expiry, refresh strategy] |
| [Authorization] | [RBAC / ABAC / Simple] | [Roles defined, permission model] |
| [Data encryption] | [At rest / In transit / Both / N/A] | [Sensitive fields] |
| [Rate limiting] | [Per endpoint / Global / None] | [Limits per tier] |
| [Input validation] | [Schema validation / Manual / Both] | [Library: Zod, Joi, class-validator] |

### Integration Complexity

<!-- Third-party APIs, webhooks, OAuth flows -->

| Integration | Type | Complexity | Notes |
|-------------|------|------------|-------|
| [Service name] | [REST API / Webhook / OAuth / SDK] | [Low/Med/High] | [Rate limits, auth method, docs link] |

### Data Modeling

<!-- Schema design approach, normalization, soft deletes, versioning -->

| Decision | Choice | Rationale |
|----------|--------|-----------|
| [Normalization] | [3NF / Denormalized / Hybrid] | [Query patterns, write frequency] |
| [Soft deletes] | [Yes / No] | [Compliance needs, audit trail] |
| [Timestamps] | [created_at + updated_at / created_at only] | [Audit requirements] |
| [Versioning] | [Table versioning / Audit log / None] | [Data history needs] |

### Migration Strategy

<!-- Zero-downtime, rollback plan, data seeding -->

| Aspect | Decision | Details |
|--------|----------|---------|
| [Migration approach] | [Zero-downtime / Maintenance window] | [Deployment strategy] |
| [Rollback plan] | [Auto-rollback / Manual / None] | [Reversibility requirements] |
| [Data seeding] | [Required / Not needed] | [Seed data for dev/staging] |

### Error Handling

<!-- Retry strategy, dead letter queue, alert thresholds -->

| Aspect | Decision | Details |
|--------|----------|---------|
| [Retry strategy] | [Exponential backoff / Fixed / None] | [Max retries, intervals] |
| [Dead letter queue] | [Yes / No] | [Failed job handling] |
| [Alerting] | [Error rate threshold / Latency / Both] | [Notification channel] |

## Agent's Discretion

<!-- Decisions the agent can make without asking -->

- [Naming conventions for internal modules — agent decides]
- [Test file organization — agent decides]
- [Internal helper function patterns — agent decides]

## Specific Ideas

<!-- Concrete ideas mentioned during discussion -->

- [Specific implementation idea from user]
- [Specific idea for optimization or pattern]

## Deferred Ideas

<!-- Out-of-scope ideas saved for future phases or sprints -->

| Idea | Defer to | Reason |
|------|----------|--------|
| [Deferred feature/optimization] | [Phase/Sprint] | [Why not now] |

---

## Instructions

**How to fill this template:**

1. **Phase Boundary:** Be explicit about scope — prevents scope creep during execution
2. **Implementation Decisions:** Fill only sections relevant to the phase (skip empty sections)
3. **Agent's Discretion:** List what the agent can decide alone vs what needs confirmation
4. **Specific Ideas:** Capture concrete ideas verbatim — don't summarize away details
5. **Deferred Ideas:** Track everything out-of-scope so nothing is lost

**BE-specific areas to explore:**
- Infrastructure: cache, queue, scheduling, deployment
- Performance: SLA, load, batch processing
- Security: auth, authz, encryption, rate limiting
- Integration: third-party APIs, webhooks, OAuth
- Data modeling: normalization, soft deletes, versioning
- Migration: zero-downtime, rollback, seeding
- Error handling: retries, dead letter queue, alerting
