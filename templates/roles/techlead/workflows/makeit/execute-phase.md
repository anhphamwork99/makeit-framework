---
name: makeit:execute-phase
description: Execute plan tasks using TL internal workflows (break-tasks, design-solution, review-code, etc.)
---

<objective>
Execute tasks defined in PLAN.md using internal Techlead workflows — story verification, task breakdown, solution design, estimation, assignment, and code review. Updates STATE.md after each task.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-execution/stage-execute-phase.md
@.agent/skills/makeit-techlead/_shared/references/quality-gates.md
@.agent/skills/makeit-techlead/_shared/references/coding-standards.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → error: "Run /makeit:clarify first"
  </step>

  <step name="discover_tasks">
    Read `.makeit/sprint/SPRINT-*/phases/{NN}-{name}/PLAN.md`
    Parse tasks: description, input, output, workflow, execution mode.
    Identify: which tasks done, which remain.
  </step>

  <step name="execute">
    For each remaining task:
    1. Check dependencies
    2. Execute using internal TL workflow (break-tasks, design-solution, etc.)
    3. Write deliverable to specified path
    4. Update STATE.md progress
    For spawn tasks → follow sub-agent spawning method.
  </step>

  <step name="report">
    Display: tasks completed, deliverables created.
    Suggest: `/makeit:verify-phase`
  </step>
</process>

<success_criteria>
- [ ] Sprint loaded and PLAN.md parsed
- [ ] All tasks executed using appropriate TL workflows
- [ ] Deliverables written to specified paths
- [ ] STATE.md updated after each task
- [ ] User informed of results and next steps
</success_criteria>
