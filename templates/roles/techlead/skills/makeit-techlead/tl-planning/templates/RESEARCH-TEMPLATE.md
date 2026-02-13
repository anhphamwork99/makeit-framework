# Phase Research: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Techlead
**Date:** [YYYY-MM-DD]
**Researcher:** [Sub-agent / Manual]

---

## Architecture Analysis

<!-- Architecture patterns evaluated for this phase -->

### Pattern Options

| Pattern | Pros | Cons | Fit for This Feature |
|---------|------|------|---------------------|
| [Pattern 1 — e.g., "Repository Pattern"] | [Benefits] | [Drawbacks] | [Good/Poor — reason] |
| [Pattern 2 — e.g., "Service Layer"] | [Benefits] | [Drawbacks] | [Good/Poor — reason] |

### Recommendation
- **Use:** [Specific pattern] because [reason]
- **Avoid:** [Pattern] because [reason for this context]

## Library Evaluation

<!-- Comparison of libraries/tools for this feature -->

| Criteria | [Library A] | [Library B] | [Library C] |
|----------|-------------|-------------|-------------|
| Bundle size | [KB] | [KB] | [KB] |
| Community (stars/maintenance) | [Active/Inactive] | [Active/Inactive] | [Active/Inactive] |
| TypeScript support | [Native/Partial/None] | [Native/Partial/None] | [Native/Partial/None] |
| Learning curve | [Low/Med/High] | [Low/Med/High] | [Low/Med/High] |
| Existing codebase fit | [Good/Poor] | [Good/Poor] | [Good/Poor] |

### Recommendation
- **Use:** [Library] because [reason — specific to project context]

## Integration Patterns

<!-- How this feature integrates with existing codebase -->

### Existing API Contracts
- [Endpoint 1 — method, path, current behavior]
- [Endpoint 2 — method, path, current behavior]

### Database Schema Impact
- [Table/Collection changes needed]
- [Migration complexity — simple/moderate/complex]
- [Backward compatibility considerations]

### Cross-Service Dependencies
| Service | Dependency | Status | Risk |
|---------|-----------|--------|------|
| [Service name] | [What depends on it] | [Available/In progress/Unknown] | [Low/Med/High] |

## Performance Considerations

<!-- Performance impact analysis -->

### Query Performance
- [Expected query patterns — frequency, complexity]
- [Index requirements — which fields, types]
- [Caching opportunities — TTL, invalidation strategy]

### Scalability
- [Horizontal scaling implications]
- [Rate limiting approach]
- [Connection pooling needs]

## Security Analysis

<!-- Security implications of the feature -->

| Concern | Risk Level | Mitigation |
|---------|-----------|------------|
| [Concern 1 — e.g., "SQL injection"] | [Critical/High/Med/Low] | [Specific mitigation] |
| [Concern 2 — e.g., "Data exposure"] | [Risk level] | [Mitigation] |

### OWASP Compliance
- [Relevant OWASP items for this feature]
- [Compliance measures to implement]

## Existing Codebase Constraints

<!-- What the current codebase requires or limits -->

### Patterns to Follow
- [Pattern 1 — location in codebase, why important]
- [Pattern 2 — existing convention to maintain]

### Technical Debt Considerations
- [Debt item 1 — impact on this feature]
- [Debt item 2 — should we address now or defer?]

## Recommendations

<!-- Prescriptive — "Use X" not "Consider X or Y" -->

1. **[Area]:** Use [specific approach] because [reason]
2. **[Area]:** Use [specific approach] because [reason]
3. **[Area]:** Use [specific approach] because [reason]

---

## Instructions

**How to fill this template:**

1. **Architecture Analysis:** Evaluate relevant architecture patterns — include comparison table with pros/cons
2. **Library Evaluation:** Compare libraries with 5+ criteria relevant to the project
3. **Integration Patterns:** Map existing APIs, database schema, and cross-service dependencies
4. **Performance:** Assess query patterns, caching, and scalability needs
5. **Security:** Identify OWASP-relevant concerns with specific mitigations
6. **Existing Codebase:** Document patterns to follow and tech debt considerations
7. **Recommendations:** Always prescriptive ("Use X" not "Consider X or Y") — planner will follow these

**Rule:** Research is optional but recommended for complex phases with architecture decisions, new libraries, or integration with unfamiliar systems.

---

## Filled Example

```markdown
# Phase Research: Phase 01 — Auth Implementation

**Sprint:** SPRINT-003
**Phase:** 01 — Auth Implementation
**Role:** Techlead
**Date:** 2026-02-15
**Researcher:** TL Sub-agent

---

## Architecture Analysis

### Pattern Options

| Pattern | Pros | Cons | Fit |
|---------|------|------|-----|
| Middleware auth | Consistent, reusable | Single point of failure | Good — matches Express patterns |
| Decorator auth | Fine-grained | Verbose, scattered | Poor — not Express-native |

### Recommendation
- **Use:** Middleware pattern — consistent with existing Express codebase

## Library Evaluation

| Criteria | jose | jsonwebtoken | passport-jwt |
|----------|------|-------------|-------------|
| Bundle size | 47KB | 32KB | 85KB |
| TypeScript | Native | @types needed | @types needed |
| Edge runtime | ✅ | ❌ | ❌ |
| Codebase fit | Good | Good | Overkill |

### Recommendation
- **Use:** jose — native TypeScript, Edge-compatible, smaller API surface

## Recommendations

1. **Auth library:** Use jose for JWT operations — Edge-compatible, native TypeScript
2. **Password hashing:** Use bcrypt with 10 salt rounds — industry standard, sufficient for our scale
3. **Session storage:** Use database-backed refresh tokens — enables revocation, auditing
```
