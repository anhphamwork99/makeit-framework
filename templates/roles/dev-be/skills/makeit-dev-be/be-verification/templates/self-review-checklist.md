# Self-Review Report: [Feature Name]

**Task:** [LARK-ID]
**PR:** [PR link]
**Date:** [YYYY-MM-DD]

---

## Gate 4 Checklist

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | PR follows template (all sections filled) | ✅/❌ | |
| 2 | Lark task linked in PR description | ✅/❌ | |
| 3 | AI Review Checklist completed | ✅/❌ | |
| 4 | Self-reviewed diff | ✅/❌ | |
| 5 | Conventional commits (feat, fix, docs, chore) | ✅/❌ | |
| 6 | BE: API documentation updated | ✅/❌ | |
| 7 | No console errors/warnings | ✅/❌ | |
| 8 | Code follows coding standards | ✅/❌ | |

## Code Quality

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | No hardcoded secrets — env variables used | ✅/❌ | |
| 2 | Proper error handling — meaningful messages | ✅/❌ | |
| 3 | Correct HTTP status codes | ✅/❌ | |
| 4 | No console.log / debug code left | ✅/❌ | |
| 5 | No sensitive data in logs | ✅/❌ | |

## API Compliance

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | API responses match contract schema | ✅/❌ | |
| 2 | All endpoints have input validation | ✅/❌ | |
| 3 | Authentication correct per endpoint | ✅/❌ | |
| 4 | Authorization checks in place | ✅/❌ | |
| 5 | Error responses follow standard format | ✅/❌ | |

## Database

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | Migrations reversible (rollback works) | ✅/❌ | |
| 2 | No data loss risks | ✅/❌ | |
| 3 | Indexes appropriate (no missing, no redundant) | ✅/❌ | |
| 4 | No N+1 queries | ✅/❌ | |
| 5 | Foreign keys have indexes | ✅/❌ | |

## Security

| # | Check Item | Status | Notes |
|---|-----------|--------|-------|
| 1 | Input validation (type, required, boundaries) | ✅/❌ | |
| 2 | SQL injection prevention (parameterized queries) | ✅/❌ | |
| 3 | No data exposure in responses | ✅/❌ | |
| 4 | Rate limiting on public endpoints | ✅/❌ | |

## Result

**Overall:** ✅ PASS / ❌ FAIL
**Issues found:** [N issues — list nếu fail]
**Action:** Ready for PR → `/makeit:create-pr`
