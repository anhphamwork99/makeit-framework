---
name: po-stage-verify-work
description: PO sprint deliverables verification — validate all backlog items and review decisions against SPECS.md
---

<purpose>
Validate entire sprint output — all backlog items, refined goals, sprint plan, and PR review decisions meet SPECS.md criteria. UAT-like final check before sprint completion.
</purpose>

<required_reading>
@po-verification/stage-verify-phase.md
@po-lifecycle/stage-complete.md
@_shared/references/quality-gates.md
</required_reading>

<rules>
1. Verify against SPECS.md — spec is source of truth
2. Check ALL deliverables — don't skip any
3. PO-specific quality — goals, context, AC must meet quality bar
4. Don't fix during verification — only check, don't modify
5. One re-verification allowed — after fixing, re-run once
6. AI Verification — PO reviews verification report, never rubber-stamp
</rules>

<output>
Verification report:
- ALL PASS → route to `/makeit:complete`
- GAPS → route back to fix with specific action items
</output>

<process>
  <step name="load_sprint_context">
    1. Read SPECS.md → deliverables list, success criteria, sprint goal
    2. Read STATE.md → confirm all phases complete
    3. List `deliverables/` folder → actual files
  </step>

  <step name="po_deliverable_check">
    For EACH expected deliverable:

    **Backlog Items Check (Mode 1):**
    - [ ] All feature goals covered by backlog items
    - [ ] Each item has clear WHY goal (not WHAT or HOW)
    - [ ] Context sufficient for BA breakdown
    - [ ] Priority set with rationale
    - [ ] Constraints and edge cases documented
    - [ ] Design coordination status noted

    **Sprint Plan Check (Mode 1):**
    - [ ] Sprint goal clear and achievable
    - [ ] Items properly prioritized (P1/P2/P3)
    - [ ] P1 items ≤ 60% capacity
    - [ ] Dependencies explicitly listed
    - [ ] Carry-over items addressed

    **PR Review Check (Mode 2):**
    - [ ] Review decisions reference original story/AC
    - [ ] Issues are specific (expected vs actual)
    - [ ] Override decisions have follow-up tasks
    - [ ] Feedback actionable for Dev team
  </step>

  <step name="cross_deliverable_consistency">
    | Check | Description |
    |-------|-------------|
    | Goal coverage | All PO goals addressed by backlog items |
    | Priority alignment | Priority rationale consistent across items |
    | Dependency completeness | All dependencies identified and flagged |
    | Design coordination | Designer status tracked for design-related items |
    | Gate 1 readiness | PO items (5-7) pass for all items |
    | Downstream usability | BA can use these to create user stories |
  </step>

  <step name="route_results">
    **ALL PASS ✅:** Display verification report with deliverable counts, success criteria status,
    cross-checks. Suggest: `/makeit:complete`.

    **GAPS FOUND ❌:** List specific gaps → suggest which phase to revisit → re-run after fixing.
  </step>
</process>

<edge_cases>

**Khi cross-deliverable check phát hiện AI outputs dùng generic language thay vì product-specific terminology:** Flag trong verification: "⚠️ Terminology inconsistent — backlog items nên dùng domain-specific terms từ PRODUCT-CONTEXT.md." Đề xuất update items.

**Khi phát hiện multiple backlog items có conflicting timing dependencies hoặc resource needs (FE/BE cùng depend 1 API):** Flag dependency conflict: "Items X và Y có dependency chồng chéo." Đề xuất PO re-prioritize hoặc tách thành sprints khác nhau.

</edge_cases>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] PO-specific quality checks applied (mode-aware)
- [ ] Cross-deliverable consistency verified
- [ ] STATE.md updated with verification result
- [ ] User informed of next steps
</success_criteria>
