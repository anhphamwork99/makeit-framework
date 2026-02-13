---
name: makeit:execute-phase
description: Execute plan tasks with PO domain workflows (draft-backlog, refine-goal, prepare-sprint, review-pr)
---

<objective>
Execute PLAN.md tasks using PO's internal domain workflows. Core engine that turns plans into deliverables — backlog items, sprint plans, review feedback. Handles task sequencing, sub-agent spawning for complex tasks, and deliverable tracking. Enforces AI Verification rule: PO reads and evaluates all outputs.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-execution/stage-execute-phase.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → "No active sprint. Run /makeit:start-sprint to start."
    Read STATE.md → current phase, mode.
    Read `phases/{NN}-{name}/PLAN.md` → task list, spawn decisions.
    If no PLAN.md → "No plan found. Run /makeit:plan-phase first."
  </step>

  <step name="execute">
    Follow stage skill to:
    1. Route each task to appropriate domain workflow
    2. Execute inline or spawn sub-agent per spawn decisions
    3. Verify each task output (existence + content)
    4. Present for PO review at checkpoints (AI Verification rule)
    5. Log progress in STATE.md
  </step>

  <step name="suggest_next">
    All tasks complete → `/makeit:verify-phase`
    Task blocked → document blocker, suggest resolution
    Need more tasks → revisit plan
  </step>
</process>

<success_criteria>
- [ ] All PLAN.md tasks executed
- [ ] PO reviewed outputs (AI Verification)
- [ ] STATE.md updated
- [ ] Phase ready for verification
</success_criteria>
