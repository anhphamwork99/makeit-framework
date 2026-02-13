---
name: makeit:plan-phase
description: Create PLAN.md with component-focused tasks for current FE phase
---

<objective>
Create a detailed execution plan (PLAN.md) for the current FE phase. Breaks down the phase goal into component-focused tasks with Figma extraction steps, implementation order, and spawn decisions.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-planning/stage-plan-phase.md
@.agent/skills/makeit-dev-fe/_shared/references/quality-gates.md
@.agent/skills/makeit-dev-fe/_shared/references/figma-mcp.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Parse current phase number, plan status, blockers.
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="validate_phase">
    Read ROADMAP.md. Locate target phase. Extract phase goal.
    Check if PLAN.md already exists → offer: replan or continue.
  </step>

  <step name="gather_context">
    Read: SPECS.md, ROADMAP.md, RESEARCH.md, CONTEXT.md, previous phase deliverables.
  </step>

  <step name="create_plan">
    Follow skill instructions to create PLAN.md:
    - Break phase goal into ≤3 atomic tasks
    - Each task: description, done criteria, estimated effort
    - Order by dependency (Figma extraction first)
    - Include spawn decisions
    - Write to `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
  </step>

  <step name="update_state">
    Update STATE.md: phase status to "planned".
  </step>

  <step name="report">
    Display plan summary: task count, complexity, spawn decisions.
    Suggest: `/makeit:execute-phase` or `/makeit:discuss-phase`.
  </step>
</process>

<success_criteria>
- [ ] PLAN.md created with ≤3 atomic tasks
- [ ] Tasks ordered by dependency
- [ ] STATE.md updated with plan status
- [ ] User informed of next steps
</success_criteria>
