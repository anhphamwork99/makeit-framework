---
name: po-workflow-prepare-sprint
description: PO internal workflow — survey pending items, prioritize by business value+urgency, create sprint plan
---

<purpose>
Prepare sprint backlog by surveying pending items, prioritizing by business value and urgency, and creating a structured sprint plan.
</purpose>

<rules>
1. Sprint goal must be clear and achievable in 1 sprint
2. P1 items ≤ 60% capacity — buffer for unplanned work
3. All items must have priority rationale
4. Dependencies explicitly listed
5. Carry-over from previous sprint must be addressed
6. PO reviews and confirms — never auto-finalize sprint plan
</rules>

<output>
Sprint plan → `deliverables/SPRINT-PLAN-{sprint}.md`
Template: `@po-execution/templates/sprint-plan.md`
</output>

<process>
  <step name="survey_items">
    1. List tasks from `.makeit/tasks/` — all files with status `pending` or `in-progress`
    2. Parse metadata: status, priority, sprint, dependencies
    3. Display list for PO review:
       | # | Title | Priority | Status | Dependencies |
       |---|-------|----------|--------|--------------|
    4. Flag items that haven't passed Gate 1
  </step>

  <step name="prioritize">
    Sort items by framework:
    | Priority | Description | Capacity Impact |
    |----------|-------------|----------------|
    | **P1** (must have) | Business-critical, deadline-driven | High |
    | **P2** (should have) | Important but can defer 1 sprint | Medium |
    | **P3** (nice to have) | Low urgency, if capacity allows | Low |

    Actions:
    1. Sort P1 → P2 → P3
    2. Ask PO to confirm or adjust order
    3. Flag items with unresolved dependencies
    4. Identify items that need breaking down (XL → multiple)
  </step>

  <step name="create_plan">
    1. Use template `@po-execution/templates/sprint-plan.md`
    2. Fill: Sprint Info, Items table, Capacity notes, Priority Rationale
    3. Add known risks: holidays, tech debt, dependencies, carry-over
    4. Save sprint plan file
  </step>

  <step name="present_output">
    Show sprint summary:
    - Items needing `/makeit:draft-backlog` (no backlog item yet)
    - Items needing refine-goal (goal unclear)
    - Items ready for handoff (Gate 1 passed)
    - Total sprint capacity estimate
  </step>
</process>

<edge_cases>

**Khi phát hiện nhiều items có conflicting resource needs hoặc timing dependencies khi prioritize:** Flag dependency conflict cụ thể — "Item A (FE) cần API từ Item B (BE) nhưng B chưa started." Đề xuất thứ tự execution hoặc tách sprint.

**Khi 2 sessions cùng chuẩn bị sprint plan cho cùng sprint (shared resource conflict):** Kiểm tra file lock trước khi tạo sprint plan. Nếu phát hiện conflict → ⚠️ STOP — "Sprint plan đang được tạo bởi session khác." Log vào STATE.md.

**Khi survey phát hiện items có scope XL (quá lớn cho 1 sprint):** Tự động flag và suggest split — reference `manage-sprint-goal` workflow. Không add item XL vào sprint plan mà không có PO explicit confirmation.

</edge_cases>

## Anti-patterns

- ❌ **Overcommit:** Pack too many items — always keep buffer
- ❌ **No sprint goal:** Sprint is just a task list, no business objective
- ❌ **Skip dependency check:** Items with unresolved deps → blocked
- ❌ **All P1:** Everything is P1 = no prioritization
- ❌ **Ignore carry-over:** Previous sprint items must be addressed
