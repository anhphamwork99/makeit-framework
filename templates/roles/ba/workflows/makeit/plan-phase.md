---
name: makeit:plan-phase
description: Create PLAN.md with tasks for current phase — break down phase goal into executable steps
---

<objective>
Create a detailed execution plan (PLAN.md) for the current or specified phase. Breaks down the phase goal from ROADMAP.md into specific, ordered tasks with done criteria.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-planning/stage-plan-phase.md
@.agent/skills/makeit-ba/_shared/references/quality-gates.md
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
    - SPECS.md — sprint scope and PO goals
    - ROADMAP.md — phase dependencies and prior phases
    - Any RESEARCH.md or CONTEXT.md in the phase directory
    - Deliverables from previous phases (for dependency awareness)
  </step>

  <step name="create_plan">
    Follow skill instructions to create PLAN.md:
    - Break phase goal into 3-7 atomic tasks
    - Each task has: description, done criteria, estimated effort
    - Order tasks by dependency
    - Write to `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
  </step>

  <step name="update_state">
    Update `.makeit/sprint/SPRINT-*/STATE.md`:
    - Set phase status to "planned"
    - Record plan creation timestamp
  </step>

  <step name="report">
    Display plan summary: task count, estimated effort, dependencies.
    Suggest next command:
    ```
    /makeit:execute-phase    → execute the plan
    /makeit:discuss-phase    → gather more context first
    ```
  </step>
</process>

<success_criteria>
- [ ] Sprint state loaded and phase validated
- [ ] PLAN.md created with atomic tasks and done criteria
- [ ] Tasks ordered by dependency
- [ ] STATE.md updated with plan status
- [ ] User informed of next steps
</success_criteria>
