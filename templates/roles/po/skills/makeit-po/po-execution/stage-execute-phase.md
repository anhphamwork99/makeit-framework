---
name: po-stage-execute-phase
description: PO phase execution — execute plan tasks using internal PO workflows (draft-backlog, refine-goal, prepare-sprint, review-pr)
---

<purpose>
Execute PLAN.md tasks for the current PO phase using domain-specific workflows — backlog drafting, goal refinement, sprint preparation, and PR review. Adapts to PO dual-mode operation.
</purpose>

<required_reading>
@po-execution/workflows/draft-backlog.md
@po-execution/workflows/refine-goal.md
@po-execution/workflows/prepare-sprint.md
@po-execution/templates/backlog-item.md
@po-execution/templates/sprint-plan.md
@_shared/references/sub-agent-spawning.md
</required_reading>

<rules>
1. Follow PLAN.md order — execute tasks as sequenced in the plan
2. Verify after each task — existence + substantive content check before moving on
3. Templates co-located — use templates from `@po-execution/templates/`
4. Always update STATE.md — log progress after each task
5. Spawn vs inline per plan's Spawn Decisions table
6. AI Verification — PO reads and evaluates all AI-generated outputs, never auto-approve
</rules>

<output>
Phase deliverables (Mode 1 — Backlog Creation):
- Backlog items → `deliverables/TASK-NNN-{feature}.md` (template: `@po-execution/templates/backlog-item.md`)
- Sprint plan → `deliverables/SPRINT-PLAN-{sprint}.md` (template: `@po-execution/templates/sprint-plan.md`)
- Refined goals → updated backlog items with SMART criteria

Phase deliverables (Mode 2 — PR Review):
- Review feedback → `deliverables/REVIEW-{pr-id}.md` (template: `@po-verification/templates/review-feedback.md`)
- Approve/reject decisions

Updated STATE.md with execution progress.
</output>

<process>
  <step name="read_plan">
    Read `phases/{NN}-{name}/PLAN.md` → extract task list.
    For each task, identify: domain workflow, inline vs spawn, expected output.
    Detect mode from STATE.md (Backlog Creation vs PR Review).
    Present execution overview to user.
  </step>

  <step name="execute_tasks">
    For each task in PLAN.md:
    1. Route to appropriate domain workflow from `<required_reading>`:
       - Backlog drafting tasks → `@po-execution/workflows/draft-backlog.md`
       - Goal refinement tasks → `@po-execution/workflows/refine-goal.md`
       - Sprint preparation tasks → `@po-execution/workflows/prepare-sprint.md`
       - PR review tasks → `@po-verification/workflows/review-pr.md`
       - Gate check tasks → `@po-verification/workflows/check-gate.md`
    2. Execute inline or spawn sub-agent per plan's Spawn Decisions table
    3. Verify task output — existence + substantive content check
    4. **PO Checkpoint:** Present output for PO review before marking complete
    5. Log completion in STATE.md
  </step>

  <step name="update_state">
    After all tasks complete:
    - Phase status → `verifying`
    - Log all deliverables created
    - Suggest: `/makeit:verify-phase`
  </step>
</process>

## Execution Flow Summary

**Mode 1 — Backlog Creation (typical order):**

```
1. Refine Goals (input clarity)
   └── Produces: refined goals with SMART criteria
2. Draft Backlog Items (core deliverable)
   └── Produces: TASK-NNN-{feature}.md
3. Prepare Sprint (synthesis)
   └── Produces: SPRINT-PLAN-{sprint}.md
```

**Mode 2 — PR Review (typical order):**

```
1. Load PR Context (input)
   └── Reads: PR description, user story, PO goal
2. Review Business Logic (core deliverable)
   └── Produces: REVIEW-{pr-id}.md
```

Not all phases include all workflows. PLAN.md specifies which workflows to execute.

> ⚠️ **AI Verification:** AI drafts all outputs, but PO must read and evaluate. PO is the final
> authority on business decisions. Never auto-approve AI-generated backlog items or PR decisions.

<edge_cases>

**Khi AI phát hiện output của mình chất lượng thấp (vague goals, thiếu AC, generic content):** Tự flag trước khi trình PO review — highlight vấn đề cụ thể, đề xuất cải thiện. Không mark task complete với output kém.

**Khi task quá phức tạp — AI không thể produce adequate output bất kể inline hay spawn:** ⚠️ STOP — "Task vượt khả năng AI, cần PO tham gia trực tiếp." Chuyển sang chế độ assistant. Log vào STATE.md.

**Khi sprint goal thay đổi giữa lúc đang execute phase:** Pause execution → reference `manage-sprint-goal` workflow để assess impact. Không tiếp tục execute với goal cũ khi goal đã thay đổi.

**Khi PR review phát hiện requirement misunderstanding (không phải code bug mà là hiểu sai specs):** ⚠️ STOP — đây không phải request changes bình thường. Escalate lên BA để re-specs. Route tới PO với note: "Fundamental requirement gap — cần BA review lại story chain."

</edge_cases>

<success_criteria>
- [ ] All PLAN.md tasks executed
- [ ] Each deliverable verified (existence + content)
- [ ] PO reviewed AI outputs (AI Verification rule applied)
- [ ] STATE.md updated with progress
- [ ] Phase status set to `verifying`
</success_criteria>
