---
name: makeit:execute-phase
description: Execute plan tasks with BE domain workflows (implement, design-api, design-schema) and STOP mechanism
---

<objective>
Execute all tasks in the current phase PLAN.md using BE domain workflows. Routes each task to the appropriate workflow (implement, design-api, design-schema) with STOP mechanism for destructive operations.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-execution/stage-execute-phase.md
@.agent/skills/makeit-dev-be/_shared/references/coding-standards.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Confirm current phase has status `planned`.
    If no active sprint → error: "Run /makeit:clarify first"
    If not planned → error: "Run /makeit:plan-phase first"
  </step>

  <step name="discover_tasks">
    Read `phases/{NN}-{name}/PLAN.md` → extract task list.
    For each task, identify: domain workflow, inline vs spawn, expected output.
    Present execution overview to user.
  </step>

  <step name="execute_tasks">
    For each task in order:
    1. Route to domain workflow:
       - API design → `@be-execution/workflows/design-api.md`
       - Schema design → `@be-execution/workflows/design-schema.md`
       - Implementation → `@be-execution/workflows/implement.md`
    2. ⚠️ Check STOP triggers before destructive operations
    3. Verify task output (existence + content)
    4. Update STATE.md with task completion
  </step>

  <step name="update_state">
    After all tasks complete:
    - Phase status → `verifying`
    - Log all deliverables created
  </step>

  <step name="report">
    Display execution summary: tasks completed, deliverables created.
    Suggest: `/makeit:verify-phase`
  </step>
</process>

<success_criteria>
- [ ] All PLAN.md tasks executed
- [ ] Each deliverable verified
- [ ] STOP mechanism applied for destructive operations
- [ ] STATE.md updated with progress
- [ ] Phase status set to `verifying`
</success_criteria>
