---
name: makeit:plan-phase
description: Create PLAN.md with API design planning, migration strategy, dependency analysis, and layer ordering
---

<objective>
Create a detailed execution plan (PLAN.md) for the current or specified phase. Breaks down the phase goal into specific, ordered tasks with API design steps, migration strategy, and dependency analysis.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-planning/stage-plan-phase.md
@.agent/skills/makeit-dev-be/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase number, plan status, blockers.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="validate_phase">
    Read `.makeit/sprint/SPRINT-*/ROADMAP.md`
    Locate target phase (from argument or current phase from STATE.md).
    Extract phase goal and description.
    Check if PLAN.md already exists for this phase → offer: replan or continue.
  </step>

  <step name="gather_context">
    Read available context for planning:
    - SPECS.md — sprint scope and task requirements
    - ROADMAP.md — phase dependencies and prior phases
    - API contract (if exists from prior design)
    - BA user story — source of truth for requirements
    - Existing codebase patterns — scan project structure
  </step>

  <step name="create_plan">
    Follow skill instructions to create PLAN.md:
    - Break phase goal into 3-7 atomic tasks following BE layer ordering
    - Each task has: description, workflow to use, done criteria, estimated effort
    - Order tasks by dependency (models → migrations → services → controllers → tests)
    - Flag destructive operations for STOP mechanism
    - Write to `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
  </step>

  <step name="update_state">
    Update `.makeit/sprint/SPRINT-*/STATE.md`:
    - Set phase status to "planned"
    - Record plan creation timestamp
  </step>

  <step name="report">
    Display plan summary: task count, estimated effort, dependencies, migration warnings.
    Suggest next command:
    ```
    /makeit:execute-phase    → execute the plan
    /makeit:status           → review progress
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint state loaded and phase validated
- [ ] PLAN.md created with atomic tasks and done criteria
- [ ] Tasks ordered by dependency (layer ordering)
- [ ] Destructive operations flagged
- [ ] STATE.md updated with plan status
- [ ] User informed of next steps
</success_criteria>
