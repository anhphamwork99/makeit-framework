---
name: po-stage-verify-phase
description: PO phase verification — goal-backward check with Gate 1 sender verification and PR review quality checks
---

<purpose>
Verify phase output using goal-backward methodology with PO-specific quality checks: Gate 1 sender-side verification (backlog mode) and business logic review quality (PR review mode).
</purpose>

<required_reading>
@po-execution/stage-execute-phase.md
@po-planning/stage-plan-phase.md
@po-verification/stage-verify-work.md
@po-verification/workflows/review-pr.md
@po-verification/workflows/check-gate.md
@_shared/references/quality-gates.md
</required_reading>

<rules>
1. Goal-backward first — "Did we achieve the goal?" not "Did we complete tasks?"
2. Gate 1 sender check for backlog mode — PO items 3-5 must pass
3. Business logic accuracy for PR review mode — decisions must be evidence-based
4. Max 1 revision — second failure escalates to human
5. Always update STATE.md — record verification result
6. AI Verification — PO reviews verification results, never rubber-stamp
</rules>

<output>
Verification result → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/VERIFICATION-REPORT.md`

Template: `@po-verification/templates/VERIFICATION-REPORT.md`

- **PASS** → mark phase complete, suggest next phase or `/makeit:verify-work`
- **GAPS** → list gaps with fix instructions, route to re-plan (max 1 revision)
</output>

<process>
  <step name="gather_context">
    1. Read STATE.md → current phase, mode, execution summary
    2. Read `phases/{NN}-{name}/PLAN.md` → task list, verification criteria
    3. Read SPECS.md → sprint-level success criteria
    4. Read ROADMAP.md → phase goal description
    5. List deliverables produced
  </step>

  <step name="run_3_level_verification">
    For each deliverable:

    **Level 1 — Existence:** File exists at expected path? File is not empty?
    **Level 2 — Substantive:** Has real content (not stubs)? No "TBD"/"TODO"? Required sections present?
    **Level 3 — Wired:** Connects to SPECS.md goals? References upstream inputs? Downstream (BA/Designer) can use it?
  </step>

  <step name="po_quality_check">
    Mode-specific quality verification.

    **Mode 1 — Backlog Creation Quality:**
    For each backlog item:
    1. Goal answers WHY (not WHAT or HOW)
    2. Context sufficient for BA to understand and breakdown
    3. Priority set with rationale (not just "important")
    4. Constraints documented
    5. Edge cases identified (PO awareness items)
    6. Design coordination status noted
    Run Gate 1 sender verification (items 3-5) via `@po-verification/workflows/check-gate.md`.

    **Mode 2 — PR Review Quality:**
    For each review feedback:
    1. Decision references original user story/AC
    2. Issues are specific (expected vs actual behavior)
    3. Override decisions have follow-up tasks
    4. Feedback specific enough for Dev to fix without additional clarification
  </step>

  <step name="goal_backward_check">
    The critical step — catches "all green but wrong outcome":
    1. State the phase GOAL (from ROADMAP.md)
    2. For each success criterion: Is this now TRUE? Evidence?
    3. Meta-question: "Would BA/Designer be able to proceed with confidence using these deliverables?"
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

**Khi phát hiện AI outputs bị cookie-cutter — backlog items lặp lại template, thiếu product-specific context:** Flag trong verification report: "⚠️ AI quality issue — outputs generic, cần PO provide thêm domain context." Đề xuất re-execute phase với enriched context.

**Khi sprint goal đã thay đổi giữa chừng (check Decision Log trong sprint workspace):** Verify deliverables against UPDATED goal, không phải goal gốc. Flag nếu deliverables vẫn reference goal cũ.

**Khi AI tạo acceptance criteria quá obvious hoặc không testable:** Flag trong quality check: "AC [X] is not testable" hoặc "AC [Y] too generic". Suggest PO refine AC trước khi mark as pass.

</edge_cases>

<success_criteria>
- [ ] 3-level verification applied to all deliverables
- [ ] PO-specific quality checks completed (mode-aware)
- [ ] Gate 1 sender check passed (Mode 1)
- [ ] Goal-backward check confirms phase goal achieved
- [ ] STATE.md updated with verification result
</success_criteria>
