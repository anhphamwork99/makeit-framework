---
name: be-stage-execute-phase
description: BE phase execution — execute plan tasks using internal BE workflows (implement, design-api, design-schema)
---

<purpose>
Execute PLAN.md tasks for the current BE phase using domain-specific workflows — API design, schema design, and layer-by-layer implementation with STOP mechanism for destructive operations.
</purpose>

<required_reading>
@be-execution/workflows/implement.md
@be-execution/workflows/design-api.md
@be-execution/workflows/design-schema.md
@be-execution/templates/implementation-plan.md
@be-execution/templates/schema-design.md
@_shared/references/sub-agent-spawning.md
@_shared/references/coding-standards.md
</required_reading>

<rules>
1. Follow PLAN.md order — execute tasks as sequenced in the plan
2. Verify after each task — existence + substantive content check before moving on
3. Templates co-located — use templates from `@be-execution/templates/`
4. Always update STATE.md — log progress after each task
5. Spawn vs inline per plan's Spawn Decisions table
6. ⚠️ STOP before destructive operations — DROP TABLE, force push, shared DB migration
</rules>

<output>
Phase deliverables:
- API contracts → `deliverables/API-{resource}.md` (from design-api workflow)
- Schema designs → `deliverables/SCHEMA-{resource}.md` (from design-schema workflow)
- Working code committed per layer (from implement workflow)
- Test results documented

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
       - API contract design → `@be-execution/workflows/design-api.md`
       - Schema design → `@be-execution/workflows/design-schema.md`
       - Implementation (models, services, controllers, tests) → `@be-execution/workflows/implement.md`
    2. Execute inline or spawn sub-agent per plan's Spawn Decisions table
    3. ⚠️ Check for STOP triggers before executing:
       - DROP TABLE, DROP COLUMN
       - delete/overwrite existing files
       - git push --force, git reset --hard
       - run migrations on shared database
       - modify shared config (.env, docker-compose)
    4. Verify task output — existence + substantive content check
    5. Log completion in STATE.md
  </step>

  <step name="update_state">
    After all tasks complete:
    - Phase status → `verifying`
    - Log all deliverables created
    - Suggest: `/makeit:verify-phase`
  </step>
</process>

## ⚠️ STOP Mechanism

Before any destructive operation:
```
⚠️ STOP — Destructive operation detected
Action: [Description]
Impact: [What could be affected]
Reversible: [Yes/No]
→ Confirm "proceed" to continue
→ Or "cancel" to abort
```

## Execution Flow Summary

Typical BE phase execution follows this order:

```
1. Design API (contract)
   └── Produces: API-{resource}.md
2. Design Schema (database)
   └── Produces: SCHEMA-{resource}.md
3. Implement per layer
   ├── Layer 1: Models/Entities
   ├── Layer 2: Database migrations (⚠️ STOP if shared DB)
   ├── Layer 3: Services
   ├── Layer 4: Controllers
   ├── Layer 5: Tests
   └── Layer 6: Documentation
```

Not all phases include all workflows. PLAN.md specifies which workflows to execute.

<edge_cases>

**Khi AI thực hiện task đúng quy trình nhưng output không đạt mục tiêu phase:** Dừng execution, so sánh output với phase goal trong ROADMAP.md. Nếu đang đi sai hướng — flag issue, đề xuất re-plan task hiện tại thay vì tiếp tục implement sai.

**Khi requirement thay đổi trong lúc đang execute phase:** ⚠️ STOP — Yêu cầu đã thay đổi (BA story updated, TL task modified). Đánh giá impact lên tasks đã hoàn thành và tasks còn lại. Nếu cần re-plan → pause execution, update SPECS.md, và chạy lại `/makeit:plan-phase`.

**Khi task quá phức tạp cho AI xử lý inline (context overflow, logic phức tạp):** Kiểm tra sub-agent spawning rules trong `@_shared/references/sub-agent-spawning.md`. Nếu task consume >30% context → spawn sub-agent. Nếu vẫn quá phức tạp → ⚠️ STOP — escalate cho human.

</edge_cases>

<success_criteria>
- [ ] All PLAN.md tasks executed
- [ ] Each deliverable verified (existence + content)
- [ ] STOP mechanism applied for destructive operations
- [ ] STATE.md updated with progress
- [ ] Phase status set to `verifying`
</success_criteria>
