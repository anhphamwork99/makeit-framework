---
name: ba-stage-execute-phase
description: BA phase execution — execute plan tasks using internal BA workflows (analyze-design, write-stories, document-flow, identify-edges)
---

<purpose>
Execute PLAN.md tasks for the current BA phase using domain-specific workflows — design analysis, story writing, flow documentation, and edge case identification.
</purpose>

<required_reading>
@ba-execution/workflows/analyze-design.md
@ba-execution/workflows/write-stories.md
@ba-execution/workflows/document-flow.md
@ba-execution/workflows/identify-edges.md
@ba-execution/templates/figma-analysis.md
@ba-execution/templates/user-story.md
@ba-execution/templates/user-flow.md
@_shared/references/sub-agent-spawning.md
@_shared/references/figma-mcp.md
</required_reading>

<rules>
1. Follow PLAN.md order — execute tasks as sequenced in the plan
2. Verify after each task — existence + substantive content check before moving on
3. Templates co-located — use templates from `@ba-execution/templates/`
4. Always update STATE.md — log progress after each task
5. Spawn vs inline per plan's Spawn Decisions table
</rules>

<output>
Phase deliverables:
- Figma analysis reports → `deliverables/ANALYSIS-{feature}.md` (template: `@ba-execution/templates/figma-analysis.md`)
- User stories → `deliverables/US-NNN-{feature}.md` (template: `@ba-execution/templates/user-story.md`)
- User flow docs → `deliverables/FLOW-{feature}.md` (template: `@ba-execution/templates/user-flow.md`)
- Edge cases integrated into story AC

Updated STATE.md with execution progress.
</output>

<process>
  <step name="read_plan">
    Read `phases/{NN}-{name}/PLAN.md` → extract task list.
    For each task, identify: domain workflow, inline vs spawn, expected output.
    Present execution overview to user.
  </step>

  <step name="execute_tasks">
    For each task in PLAN.md:
    1. Route to appropriate domain workflow from `<required_reading>`:
       - Design analysis tasks → `@ba-execution/workflows/analyze-design.md`
       - Story creation tasks → `@ba-execution/workflows/write-stories.md`
       - Flow documentation tasks → `@ba-execution/workflows/document-flow.md`
       - Edge case tasks → `@ba-execution/workflows/identify-edges.md`
    2. Execute inline or spawn sub-agent per plan's Spawn Decisions table
    3. Verify task output — existence + substantive content check
    4. Log completion in STATE.md
  </step>

  <step name="ensure_traceability">
    After stories are written, verify EVERY user story includes a traceability block:

    ```
    **Traceability:**
    - PO Goal: [goal reference from SPECS.md]
    - Figma: [Figma link or "No UI change"]
    - Expected Tasks: FE: [count], BE: [count]
    ```

    **Checklist:**
    - ↑ PO Goal Reference — link to PO sprint goal that drives this story
    - ↓ Expected TL Tasks — anticipated technical breakdown (FE/BE count)
    - Figma Reference — link to relevant Figma screens or "No UI change"

    If any story is missing traceability, add it before proceeding.
    This enables bi-directional linking: PO Goal ↔ BA Story ↔ TL Task.
  </step>

  <step name="update_state">
    After all tasks complete:
    - Phase status → `verifying`
    - Log all deliverables created
    - Suggest: `/makeit:verify-phase`
  </step>
</process>

## Execution Flow Summary

Typical BA phase execution follows this order:

```
1. Analyze Design (input)
   └── Produces: ANALYSIS-{feature}.md
2. Document Flow (supporting)
   └── Produces: FLOW-{feature}.md
3. Write Stories (core deliverable)
   └── Produces: US-NNN-{feature}.md
4. Identify Edge Cases (quality enhancement)
   └── Produces: edge cases integrated into story AC
```

Not all phases include all workflows. PLAN.md specifies which workflows to execute.

<edge_cases>

**Khi mid-execution nhận thấy output không align với phase goal:** Sau mỗi task, tự kiểm tra: "Output này có đưa phase gần hơn tới goal không?" Nếu phát hiện lệch hướng → dừng execution, báo user: "Task {N} output có vẻ không align với phase goal. Review trước khi tiếp tục?" Log vào STATE.md.

**Khi design trong Figma thay đổi giữa chừng execution:** Nếu phát hiện Figma content khác với analysis đã làm (screens mới, layout thay đổi) → ⚠️ STOP — Design đã thay đổi sau khi analyze. Cần re-run `analyze-design` cho screens affected trước khi tiếp tục write stories. Log vào STATE.md: "Design change detected mid-execution"

**Khi AI không thể produce quality output dù đã spawn sub-agent:** Nếu sub-agent output vẫn không đạt chất lượng sau khi spawn → ⚠️ STOP — Task vượt quá khả năng AI. Escalate cho human BA: cung cấp tất cả context + partial output đã có, suggest human complete task. Log vào STATE.md: "AI capability limit reached at task {N}"

</edge_cases>

<success_criteria>
- [ ] All PLAN.md tasks executed
- [ ] Each deliverable verified (existence + content)
- [ ] STATE.md updated with progress
- [ ] Phase status set to `verifying`
</success_criteria>
