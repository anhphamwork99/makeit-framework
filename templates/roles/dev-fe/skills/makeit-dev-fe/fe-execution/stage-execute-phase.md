---
name: fe-stage-execute-phase
description: FE phase execution — implement components from Figma designs using internal workflows (implement, compare-ui), manage STOP mechanism, update sprint state
---

<purpose>
Execute FE phase plan tasks using internal domain workflows — transform Figma designs into production-ready components with visual verification.
</purpose>

<required_reading>
@fe-planning/stage-plan-phase.md
@fe-execution/workflows/implement.md
@fe-execution/workflows/compare-ui.md
@_shared/references/sub-agent-spawning.md
@_shared/references/figma-mcp.md
@_shared/references/coding-standards.md
</required_reading>

<rules>
1. Follow the plan — execute tasks from PLAN.md in order
2. One task at a time — complete and verify before moving to next
3. STOP mechanism ACTIVE — pause before any destructive operation:
   - ⚠️ DELETE existing files or overwrite implementations
   - ⚠️ Force push to shared branches
   - ⚠️ Install packages that affect shared dependencies
   - ⚠️ Modify shared/global styles or configurations
4. Spawn for complex tasks — respect spawn decisions from plan
5. Always update STATE.md — track progress after each task
6. Figma-first implementation — extract design specs before writing code
</rules>

<output>
Per-task deliverables (type depends on task):
- React components with interaction states
- Design token mappings (CSS variables / theme)
- Compare-UI reports
- Implementation notes in STATE.md
</output>

<process>
  <step name="load_plan">
    Read `phases/{NN}-{name}/PLAN.md` → task list.
    Read STATE.md → determine current task (first incomplete).
    Read SPECS.md → success criteria for reference.
  </step>

  <step name="execute_task">
    For each task in plan:

    **If spawn decision = spawn:**
    Spawn sub-agent using `@_shared/references/sub-agent-spawning.md`.
    Wait for return trigger → verify output → continue.

    **If inline execution:**
    Route to the appropriate internal workflow:

    | Task Type | Internal Workflow | Description |
    |-----------|------------------|-------------|
    | Figma extraction + component build | `@fe-execution/workflows/implement.md` | Extract design → build component |
    | Visual comparison | `@fe-execution/workflows/compare-ui.md` | Compare built UI vs Figma design |
    | Integration work | Direct implementation | API connection, data flow |
    | Bug fix / iteration | Direct implementation | Fix specific issues |
  </step>

  <step name="stop_mechanism_check">
    ⚠️ Before ANY of these actions, PAUSE and ask user for confirmation:
    - Deleting/overwriting existing implementation files
    - Installing new npm packages
    - Modifying shared/global CSS or config files
    - Force pushing to any branch
    - Modifying shared routing or navigation configuration

    Format: "⚠️ STOP: About to {action}. Continue? (yes/no)"
  </step>

  <step name="update_state_per_task">
    After each task:
    1. Mark task as complete in STATE.md
    2. Log what was produced
    3. Note any issues or decisions made
    4. Check if more tasks remain
  </step>

  <step name="phase_completion">
    When all tasks complete:
    1. Summarize deliverables produced
    2. List any issues encountered
    3. Update STATE.md phase status
    4. Suggest: `/makeit:verify-phase` to verify output
  </step>
</process>

## FE Execution Flow (Typical)

```
1. Figma Extraction → Design tokens, component specs, screen layout
2. Component Implementation → Build components with interaction states
3. Responsive Behavior → Apply breakpoint-specific layouts
4. API Integration → Connect to data sources (if applicable)
5. Compare-UI → Visual comparison with Figma original
```

<edge_cases>

**Khi kết quả implementation lệch so với plan** (component hierarchy sai, thiếu states): Dừng tại task hiện tại, so sánh output với Figma design gốc. Nếu plan sai → quay lại `/makeit:plan-phase` để re-plan trước khi tiếp tục. Log deviation vào STATE.md.

**Khi Figma design đã thay đổi so với lúc bắt đầu sprint:** Trước mỗi task, kiểm tra Figma link trong SPECS.md — nếu design có cập nhật mới (layout, component, states khác so với specs ban đầu) → ⚠️ STOP — Design đã thay đổi giữa chừng. Thông báo user và chờ xác nhận: tiếp tục với design cũ hay cập nhật specs. Log vào STATE.md.

**Khi task implementation thất bại liên tiếp** (output lỗi sau 2 lần thử): Đếm số lần retry cho mỗi task. Sau 2 lần thất bại → ⚠️ STOP — Task có thể quá phức tạp cho AI. Escalate cho user với mô tả: đã thử gì, lỗi gì, đề xuất cách tiếp cận khác hoặc tách nhỏ task. Log vào STATE.md.

**Khi task yêu cầu thay đổi shared resources** (global CSS, shared components, routing config): Kiểm tra file sắp sửa có được dùng bởi module/team khác không. Nếu file là shared resource → ⚠️ STOP — Sửa file chia sẻ có thể ảnh hưởng team khác. Liệt kê files bị ảnh hưởng, chờ user xác nhận trước khi tiếp tục.

**Khi API contract đã thay đổi sau khi bắt đầu implement:** Trước integration task, re-verify API contract từ BE. Nếu response schema, endpoint path, hoặc auth mechanism khác với mock data đang dùng → ⚠️ STOP — API contract đã thay đổi. Cập nhật mock data và component interfaces trước khi tiếp tục. Log vào STATE.md.

</edge_cases>

<success_criteria>
- [ ] All plan tasks executed in order
- [ ] STOP mechanism respected for destructive operations
- [ ] Internal workflows invoked correctly
- [ ] Components match Figma designs (visual check)
- [ ] STATE.md updated after each task
- [ ] User informed of next steps
</success_criteria>
