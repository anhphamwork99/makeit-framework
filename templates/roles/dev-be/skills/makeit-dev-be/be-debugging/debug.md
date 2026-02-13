---
name: be-debug
description: BE systematic debugging — diagnose API errors, DB issues, migration failures, and performance problems
---

<purpose>
Systematic diagnosis and resolution of issues during BE sprint execution — API errors, database issues, migration failures, security vulnerabilities, and performance problems.
</purpose>

<rules>
1. Hypothesis-driven — don't fix randomly
2. Smallest fix first — minimal changes
3. Log everything — future sessions benefit from debug history
4. Max 3 attempts — escalate after 3 failed hypotheses
5. ⚠️ STOP before destructive debug operations — no DROP, no force actions
</rules>

<process>
  <step name="define_problem">
    1. **What is failing?** Specific error, status code, or unexpected behavior
    2. **When did it start?** After which commit/migration/change
    3. **Expected vs actual:** What should happen vs what happens
  </step>

  <step name="gather_evidence">
    Read current state:
    1. STATE.md → execution history
    2. Latest phase PLAN.md → task specifications
    3. Error logs, stack traces, API responses
    4. Database state (migration status, data integrity)
    5. Git log — recent changes
  </step>

  <step name="form_hypothesis">
    BE-specific hypotheses:

    | Category | Typical Issue | Investigation |
    |----------|--------------|---------------|
    | **API errors** | Wrong status code, missing validation, auth failure | Check controller, middleware, error handler |
    | **Database** | Migration failed, FK constraint, data integrity | Check migration files, rollback status, constraints |
    | **N+1 queries** | Performance degradation | Check ORM queries, add eager loading |
    | **Security** | Injection, data exposure, auth bypass | Review input validation, parameterized queries |
    | **Integration** | Third-party API failure, timeout | Check error handling, retry logic, fallbacks |
    | **Environment** | Config mismatch, missing env vars | Compare .env files, check docker setup |
  </step>

  <step name="test_hypothesis">
    1. Try the smallest possible fix
    2. Re-run the failing check/test
    3. If still failing → revise hypothesis
  </step>

  <step name="apply_fix">
    1. Make the correction
    2. Re-verify (run tests, check API responses)
    3. Log the fix in STATE.md

    > ⚠️ STOP: If fix requires DROP/DELETE on production data → confirm first
  </step>

  <step name="log_debug_session">
    Record in `phases/{NN}/DEBUG.md`:
    ```markdown
    ## Debug: {issue description}
    - **Date:** {YYYY-MM-DD}
    - **Problem:** {what failed}
    - **Root cause:** {why it failed}
    - **Fix applied:** {what was changed}
    - **Prevention:** {how to avoid in future}
    ```
  </step>
</process>

<edge_cases>

**Khi đã thử 3 hypothesis mà vẫn không fix được bug:** ⚠️ STOP — Đã thử 3 lần debug không thành công. Tổng hợp: (1) problem definition, (2) 3 hypotheses đã thử, (3) evidence collected. Escalate cho human developer với full debug context thay vì tiếp tục thử random.

**Khi issue liên quan đến third-party API (payment, auth, notification service):** Phân biệt: (1) API hoàn toàn down → implement fallback/queue, (2) API trả response khác expected → kiểm tra API version/changelog, (3) rate limited → implement backoff. Log external API issues riêng trong DEBUG.md với timestamp để track pattern.

</edge_cases>

<success_criteria>
- [ ] Problem clearly defined
- [ ] Hypothesis formed and tested
- [ ] Fix applied and verified
- [ ] Debug session logged
</success_criteria>
