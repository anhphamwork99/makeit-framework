# Phase Research: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev BE
**Date:** [YYYY-MM-DD]
**Researcher:** [Agent / Sub-agent ID]

---

## Research Objective

[What needs to be investigated and why — 1-2 sentences]

## Architecture Patterns

<!-- Evaluate architecture approaches relevant to this phase -->

### Option Analysis

| Pattern | Fit | Pros | Cons |
|---------|-----|------|------|
| [Pattern A — e.g., Layered architecture] | [Good/Fair/Poor] | [Benefits] | [Tradeoffs] |
| [Pattern B — e.g., Hexagonal] | [Good/Fair/Poor] | [Benefits] | [Tradeoffs] |

### Recommendation

**Use:** [Specific pattern — prescriptive, not "consider"]
**Reason:** [Why this pattern fits this phase]

## Library Evaluation

<!-- Evaluate libraries for the specific need (ORM, auth, queue, cache, validation) -->

### [Category — e.g., ORM]

| Library | Version | Stars | Maintained | Fit |
|---------|---------|-------|------------|-----|
| [Library A] | [version] | [GitHub stars] | [Yes/No — last release] | [Good/Fair/Poor] |
| [Library B] | [version] | [Stars] | [Maintained] | [Fit] |

**Recommendation:** Use [Library Name] v[version]
**Reason:** [Prescriptive — why this library, not alternatives]
**Install:** `npm install [package-name]`

### [Category — e.g., Authentication]

| Library | Version | Stars | Maintained | Fit |
|---------|---------|-------|------------|-----|
| [Library A] | [version] | [Stars] | [Maintained] | [Fit] |

**Recommendation:** Use [Library Name]
**Reason:** [Why]

## Performance Considerations

<!-- Query optimization, caching strategy, connection pooling, batch processing -->

| Area | Current State | Recommendation | Impact |
|------|--------------|----------------|--------|
| [Query optimization] | [Current approach] | [Specific optimization] | [Expected improvement] |
| [Caching] | [No cache / Existing cache] | [Cache strategy + TTL] | [Latency reduction] |
| [Connection pooling] | [Current config] | [Pool size + timeout] | [Throughput improvement] |
| [Batch processing] | [Current approach] | [Batch strategy] | [Processing time] |

## Security Analysis

<!-- Auth patterns, input validation, encryption, OWASP compliance -->

| Risk | Severity | Mitigation | Implementation |
|------|----------|------------|----------------|
| [SQL injection] | [Critical/High/Medium] | [Parameterized queries] | [ORM handles / manual] |
| [XSS] | [Severity] | [Output encoding] | [Implementation approach] |
| [CSRF] | [Severity] | [Token validation] | [Implementation approach] |
| [Auth bypass] | [Severity] | [JWT validation] | [Implementation approach] |

**OWASP Top 10 relevance:** [Which OWASP risks apply to this phase]

## Integration Research

<!-- Third-party API patterns, webhook handling, rate limits -->

### [Service Name]

- **API Docs:** [Link to documentation]
- **Auth Method:** [API Key / OAuth / JWT / HMAC]
- **Rate Limits:** [Requests per minute/hour]
- **Error Handling:** [Retry strategy, status codes to watch]
- **SDK:** [Official SDK available? Version?]
- **Webhook:** [Webhook support? Verification method?]

## Scalability Considerations

<!-- Horizontal scaling, database strategy, message queues -->

| Concern | Current Limit | Strategy | When to Apply |
|---------|--------------|----------|---------------|
| [Database reads] | [Current bottleneck] | [Read replicas / Caching] | [Threshold trigger] |
| [Write throughput] | [Current limit] | [Queue / Batch / Shard] | [Threshold trigger] |
| [API load] | [Current capacity] | [Horizontal scaling / Load balancer] | [Threshold trigger] |

## Recommendations Summary

<!-- Prescriptive decisions — "Use X" not "Consider X or Y" -->

| Area | Decision | Confidence |
|------|----------|------------|
| [Architecture] | Use [specific pattern] | [High/Medium] |
| [Library — category] | Use [specific library v.X] | [High/Medium] |
| [Performance] | Implement [specific optimization] | [High/Medium] |
| [Security] | Apply [specific measures] | [High/Medium] |
| [Integration] | Use [specific approach] | [High/Medium] |

---

## Instructions

**How to fill this template:**

1. **Architecture:** Evaluate patterns relevant to the phase — not all patterns, just applicable ones
2. **Library Evaluation:** Compare 2-3 options max, then recommend ONE (prescriptive)
3. **Performance:** Focus on optimizations relevant to this phase's work
4. **Security:** OWASP-aware — check Top 10 against phase scope
5. **Integration:** Only include if phase involves third-party services
6. **Scalability:** Consider future scale but recommend only what's needed now
7. **Recommendations:** Must be prescriptive — "Use X" not "Consider X or Y"

**BE research focus areas:**
- Architecture patterns — API design, service layer, data access patterns
- Library evaluation — ORM, cache, queue, auth, validation libraries
- Performance — query optimization, caching, connection pooling, batch processing
- Security — auth patterns, encryption, API security, OWASP compliance
- Integration — third-party API patterns, webhook handling, error recovery
- Scalability — horizontal scaling, database strategy, message queues
