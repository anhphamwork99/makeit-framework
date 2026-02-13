---
name: makeit:plan-phase
description: Create PLAN.md for the current phase with atomic tasks and spawn decisions
---

<objective>
Create a detailed execution plan for the current phase — define atomic tasks, determine inline vs sub-agent execution, and assess complexity. The plan drives execute-phase.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-planning/stage-plan-phase.md
@.agent/skills/makeit-techlead/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="gather_context">
    Read ROADMAP.md → phase goal, dependencies.
    Read CONTEXT.md → locked decisions (if discuss-phase was run).
    Read RESEARCH.md → research findings (if research-phase was run).
    Read SPECS.md → sprint scope, BA stories.
  </step>

  <step name="create_plan">
    Follow skill instructions to create PLAN.md:
    - Define atomic tasks (max 3-5 per plan)
    - Map each task to a TL internal workflow
    - Determine spawn decisions (inline vs sub-agent)
    - Set success criteria
    Save to: `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
  </step>

  <step name="update_state">
    Update STATE.md: phase status → "planned"
  </step>

  <step name="report">
    Display plan summary: task count, complexity, spawn decisions.
    Suggest: `/makeit:execute-phase`
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and phase context gathered
- [ ] PLAN.md created with atomic tasks
- [ ] Spawn decisions made per task
- [ ] STATE.md updated
- [ ] User informed of next steps
</success_criteria>
