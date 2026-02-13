---
name: be-stage-verify-phase
description: BE phase verification — goal-backward check with Gate 4, API compliance, DB safety, security checks, and self-review integrated
---

<purpose>
Verify phase output using goal-backward methodology with integrated Gate 4 quality checks, API compliance verification, database safety checks, and BE self-review — catches "all green but wrong outcome".
</purpose>

<required_reading>
@be-execution/stage-execute-phase.md
@be-planning/stage-plan-phase.md
@be-verification/stage-verify-work.md
@be-verification/workflows/self-review.md
@be-verification/workflows/check-gate.md
@_shared/references/quality-gates.md
</required_reading>

<rules>
1. Goal-backward first — "Did we achieve the goal?" not "Did we complete tasks?"
2. Gate 4 is mandatory — BE output must pass quality gate before handoff
3. Self-review before gate — auto-fix issues before formal check
4. Max 1 revision — second failure escalates to human
5. Always update STATE.md — record verification result
6. ⚠️ STOP check — verify no destructive operations pending
</rules>

<output>
Verification result:
- **PASS** → mark phase complete, suggest next phase or `/makeit:verify-work`
- **GAPS** → list gaps with fix instructions, route to re-plan (max 1 revision)

Template: @be-verification/templates/VERIFICATION-REPORT.md
</output>

<process>
  <step name="gather_context">
    1. Read STATE.md → current phase, execution summary
    2. Read `phases/{NN}-{name}/PLAN.md` → task list, verification criteria
    3. Read SPECS.md → sprint-level success criteria
    4. Read ROADMAP.md → phase goal description
    5. List deliverables produced
  </step>

  <step name="run_3_level_verification">
    For each deliverable:

    **Level 1 — Existence:** File exists at expected path? File is not empty?
    **Level 2 — Substantive:** Has real content (not stubs)? No "TBD"/"TODO"? Required sections present?
    **Level 3 — Wired:** Connects to SPECS.md goals? References upstream inputs? Downstream (reviewer) can use it?
  </step>

  <step name="be_self_review">
    Internal quality check using `@be-verification/workflows/self-review.md`.

    **Code Quality:**
    - [ ] No hardcoded secrets — env variables used
    - [ ] Proper error handling — meaningful messages
    - [ ] Correct HTTP status codes
    - [ ] No console.log/debug code left
    - [ ] No sensitive data in logs

    **API Compliance:**
    - [ ] API responses match contract schema
    - [ ] All endpoints have input validation
    - [ ] Authentication correct per endpoint
    - [ ] Authorization checks in place
    - [ ] Error responses follow standard format

    **Database Safety:**
    - [ ] Migrations reversible (rollback works)
    - [ ] No data loss risks
    - [ ] Indexes appropriate (no missing, no redundant)
    - [ ] No N+1 queries
    - [ ] Foreign keys have indexes

    **Security:**
    - [ ] Input validation (type, required, boundaries)
    - [ ] SQL injection prevention (parameterized queries)
    - [ ] No data exposure in responses
    - [ ] Rate limiting on public endpoints

    Auto-fix: Code formatting, missing validation, error messages.
    Flag for user: Security issues, data loss risks, migration concerns.
  </step>

  <step name="gate_4_formal_check">
    Binary pass/fail gate using `@be-verification/workflows/check-gate.md`.
    Run Gate 4 verification using formal checklist from `@_shared/references/quality-gates.md`.
    ALL PASS ✅ → Ready for handoff. HAS FAILURES ❌ → List failures with fix instructions.
  </step>

  <step name="goal_backward_check">
    The critical step — catches "all green but wrong outcome":
    1. State the phase GOAL (from ROADMAP.md)
    2. For each success criterion: Is this now TRUE? Evidence?
    3. Meta-question: "Would reviewer/PO be able to verify and approve this with confidence?"
  </step>

  <step name="route_results">
    **ALL PASS ✅:**
    Mark phase complete in STATE.md. Check ROADMAP.md for more phases.
    Suggest: `/makeit:plan-phase` (next phase) or `/makeit:verify-work` (all phases done).

    **GAPS FOUND ⚠️:**
    If 0 revisions → list gaps, suggest re-plan, increment revision counter.
    If 1 revision done → ESCALATE to user (max 1 revision rule).
  </step>
</process>

<edge_cases>

**Khi verification phát hiện code đúng cấu trúc nhưng sai business logic:** Không chỉ kiểm tra completeness — đối chiếu implementation logic với acceptance criteria trong user story. Nếu logic sai → flag as FAIL với mô tả cụ thể business rule nào bị vi phạm.

**Khi verification phát hiện spec ban đầu không chính xác:** ⚠️ STOP — Verification reveal spec inconsistency (acceptance criteria mâu thuẫn nhau, hoặc không khớp PO intent). Ghi rõ inconsistency, escalate lên BA/Techlead để clarify trước khi continue. Không tự sửa spec.

**Khi API contract thay đổi breaking backward compatibility với FE đang dùng:** Flag API breaking changes cụ thể (field renamed, type changed, endpoint removed). Đánh giá impact lên FE implementation hiện tại. Đề xuất API versioning hoặc deprecation strategy thay vì break trực tiếp.

</edge_cases>

<success_criteria>
- [ ] 3-level verification applied to all deliverables
- [ ] BE self-review completed with auto-fixes applied
- [ ] Gate 4 formal check passed
- [ ] Goal-backward check confirms phase goal achieved
- [ ] STATE.md updated with verification result
</success_criteria>
