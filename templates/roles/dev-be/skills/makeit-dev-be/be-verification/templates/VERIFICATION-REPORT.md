# Phase Verification Report: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev BE
**Date:** [YYYY-MM-DD]
**Verdict:** [✅ PASS / ⚠️ GAPS FOUND / ❌ FAIL]

---

## Goal-Backward Check

**Phase Goal:** [Copy from ROADMAP.md]

| # | Success Criterion | Status | Evidence |
|---|-------------------|--------|----------|
| 1 | [From SPECS.md — SC1] | [✅/❌] | [Specific evidence — file, test, output] |
| 2 | [SC2] | [✅/❌] | [Evidence] |
| 3 | [SC3] | [✅/❌] | [Evidence] |

**Meta-question:** Would reviewer/PO approve this with confidence? [Yes/No — why]

## 3-Level Verification

### Level 1 — Existence

| Deliverable | Path | Exists | Non-empty |
|-------------|------|--------|-----------|
| [API implementation] | [file path] | [✅/❌] | [✅/❌] |
| [Migration file] | [file path] | [✅/❌] | [✅/❌] |
| [Test file] | [file path] | [✅/❌] | [✅/❌] |

### Level 2 — Substantive

| Deliverable | Real Content | No TBD/TODO | Required Sections |
|-------------|-------------|-------------|-------------------|
| [API implementation] | [✅/❌] | [✅/❌] | [✅/❌ — list missing] |
| [Migration file] | [✅/❌] | [✅/❌] | [✅/❌] |
| [Test file] | [✅/❌] | [✅/❌] | [✅/❌] |

### Level 3 — Wired

| Deliverable | SPECS Goal | Upstream Input | Downstream Usable |
|-------------|-----------|----------------|-------------------|
| [API implementation] | [Maps to SC?] | [References BA story?] | [FE can integrate?] |
| [Migration file] | [Maps to SC?] | [References schema design?] | [Reversible?] |
| [Test file] | [Maps to SC?] | [Covers AC?] | [CI-ready?] |

## API Compliance Check

<!-- Verify API implementation matches contract -->

| Endpoint | Method | Contract Match | Status Codes | Validation | Auth |
|----------|--------|---------------|-------------|------------|------|
| [/api/v1/resource] | [GET] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] |
| [/api/v1/resource] | [POST] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] |
| [/api/v1/resource/:id] | [PUT] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] |

## Database Safety Check

<!-- Verify migration safety and query performance -->

| Check | Status | Details |
|-------|--------|---------|
| Migrations reversible | [✅/❌] | [Rollback tested?] |
| No data loss risk | [✅/❌] | [Destructive operations?] |
| Indexes appropriate | [✅/❌] | [Missing / Redundant?] |
| No N+1 queries | [✅/❌] | [Where found?] |
| Foreign keys indexed | [✅/❌] | [Which FK?] |

## Security Audit

<!-- BE-specific security verification -->

| Check | Status | Details |
|-------|--------|---------|
| No hardcoded secrets | [✅/❌] | [Env variables used?] |
| Input validation complete | [✅/❌] | [All endpoints validated?] |
| SQL injection prevention | [✅/❌] | [Parameterized queries?] |
| No data exposure in responses | [✅/❌] | [Sensitive fields filtered?] |
| Rate limiting configured | [✅/❌] | [Public endpoints protected?] |
| Authentication enforced | [✅/❌] | [Per-endpoint check] |
| Authorization checks | [✅/❌] | [Role-based access verified?] |
| Error messages safe | [✅/❌] | [No stack traces / internal info leaked?] |

## Code Quality

<!-- From self-review workflow -->

| Check | Status | Details |
|-------|--------|---------|
| Proper error handling | [✅/❌] | [Meaningful messages, correct HTTP codes] |
| No console.log/debug code | [✅/❌] | [Cleaned up?] |
| No sensitive data in logs | [✅/❌] | [Passwords, tokens, PII filtered?] |
| Consistent naming | [✅/❌] | [Follows project conventions?] |
| Tests pass | [✅/❌] | [All passing? Coverage %] |

## Gate 4 Formal Check

<!-- Binary pass/fail from check-gate workflow -->

| # | Gate 4 Check | Status |
|---|-------------|--------|
| 1 | API contracts match specs | [✅/❌] |
| 2 | Input validation complete | [✅/❌] |
| 3 | Error handling proper | [✅/❌] |
| 4 | Security verified | [✅/❌] |
| 5 | DB queries efficient | [✅/❌] |
| 6 | Migrations reversible | [✅/❌] |
| 7 | No sensitive data in logs | [✅/❌] |
| 8 | API documentation updated | [✅/❌] |

**Gate 4 Verdict:** [ALL PASS ✅ / HAS FAILURES ❌ — list failures]

## Issues Found

<!-- List any issues discovered during verification -->

| # | Issue | Severity | Fix | Status |
|---|-------|----------|-----|--------|
| 1 | [Issue description] | [Critical/High/Medium/Low] | [Fix description] | [Fixed/Pending] |

## Verdict

**Phase Verification:** [✅ PASS / ⚠️ GAPS FOUND]

<!-- If PASS: -->
Phase goal achieved. Ready for next phase or verify-work.

<!-- If GAPS: -->
**Gaps to resolve:**
1. [Gap description — specific fix instruction]
2. [Gap description]

**Revision:** [0/1 — max 1 revision allowed]

---

## Instructions

**How to fill this template:**

1. **Goal-backward first** — Start with "Did we achieve the goal?" not "Did we complete tasks?"
2. **3-level verification** — Existence → Substantive → Wired for each deliverable
3. **API compliance** — Check every endpoint against the contract document
4. **DB safety** — Verify migration reversibility and query performance
5. **Security audit** — Check OWASP-relevant items for this phase
6. **Gate 4** — Binary pass/fail — ALL must pass for handoff readiness
7. **Issues** — Auto-fix what you can, flag security/data concerns for user
