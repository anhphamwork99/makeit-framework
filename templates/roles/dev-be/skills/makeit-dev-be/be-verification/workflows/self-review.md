---
name: be-workflow-self-review
description: BE self-review workflow — check Gate 4, API compliance, database safety, security before PR
---

<purpose>
Self-review code before creating PR — check Gate 4 items, API compliance, database safety, and security. Produces pass/fail report using `@be-verification/templates/self-review-checklist.md`.
</purpose>

<process>
  <step name="load_review_context">
    1. All changed files (diff) — `git diff` or user paste
    2. API contract (if exists)
    3. Gate 4 checklist — `@_shared/references/quality-gates.md`
    4. Task specs + acceptance criteria
    5. `@_shared/references/coding-standards.md` — conventions
  </step>

  <step name="check_gate_4">
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | PR follows template (all sections filled) | ✅/❌ |
    | 2 | Lark task linked in PR description | ✅/❌ |
    | 3 | AI Review Checklist completed | ✅/❌ |
    | 4 | Self-reviewed diff | ✅/❌ |
    | 5 | Conventional commits | ✅/❌ |
    | 6 | API documentation updated | ✅/❌ |
    | 7 | No console errors/warnings | ✅/❌ |
    | 8 | Code follows coding standards | ✅/❌ |
  </step>

  <step name="check_api_compliance">
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | API responses match contract schema | ✅/❌ |
    | 2 | All endpoints have input validation | ✅/❌ |
    | 3 | Authentication correct per endpoint | ✅/❌ |
    | 4 | Authorization checks in place | ✅/❌ |
    | 5 | Error responses follow standard format | ✅/❌ |
  </step>

  <step name="check_database">
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | Migrations reversible (rollback works) | ✅/❌ |
    | 2 | No data loss risks | ✅/❌ |
    | 3 | Indexes appropriate | ✅/❌ |
    | 4 | No N+1 queries | ✅/❌ |
    | 5 | Foreign keys have indexes | ✅/❌ |
  </step>

  <step name="check_security">
    | # | Check Item | Status |
    |---|-----------|--------|
    | 1 | Input validation (type, required, boundaries) | ✅/❌ |
    | 2 | SQL injection prevention | ✅/❌ |
    | 3 | No data exposure in responses | ✅/❌ |
    | 4 | Rate limiting on public endpoints | ✅/❌ |
  </step>

  <step name="generate_report">
    Overall: PASS / FAIL
    - PASS → Ready for PR creation
    - FAIL → Fix issues first, then re-run
  </step>
</process>

<edge_cases>

**Khi phát hiện AI-generated code có tech debt patterns (working nhưng low-quality):** Chủ động scan cho: N+1 query patterns (loop DB calls), missing indexes trên FK/frequent columns, hardcoded magic numbers, copy-paste code blocks, overly complex functions (>50 lines). Nếu phát hiện → auto-fix trước khi report PASS.

</edge_cases>
