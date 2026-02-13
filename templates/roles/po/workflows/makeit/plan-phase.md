---
name: makeit:plan-phase
description: Create PLAN.md for current phase with PO-specific complexity assessment
---

<objective>
Create a structured, executable PLAN.md for the current PO phase. Assesses business complexity, creates max 3 atomic tasks, and determines spawn decisions. Adapts to PO dual-mode (Backlog Creation vs PR Review).
</objective>

<execution_context>
@.agent/skills/makeit-po/po-planning/stage-plan-phase.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → "No active sprint. Run /makeit:start-sprint to start."
    Read STATE.md → current phase, mode, sprint goal.
    Read ROADMAP.md → phase name, goal, dependencies.
    Read SPECS.md → deliverables, acceptance criteria.
  </step>

  <step name="execute">
    Follow stage skill to:
    1. Assess business complexity (PO-specific dimensions)
    2. Create PLAN.md with ≤3 atomic tasks
    3. Determine spawn decisions per task
    4. Present plan for PO review
  </step>

  <step name="suggest_next">
    PO approves plan → `/makeit:execute-phase`
    Plan needs revision → modify plan inline
    Phase too complex → suggest splitting in ROADMAP.md
  </step>
</process>

<success_criteria>
- [ ] PLAN.md created with ≤3 atomic tasks
- [ ] Complexity assessed
- [ ] Spawn decisions determined
- [ ] STATE.md updated
</success_criteria>
