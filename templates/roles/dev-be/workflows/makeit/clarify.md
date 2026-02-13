---
name: makeit:clarify
description: Receive TL tasks → verify Gate 3 input → create sprint workspace with API contracts and schema requirements
---

<objective>
Receive Techlead task assignments, verify Gate 3 input quality (task clarity, story link, API contract, security), and create structured sprint workspace for BE implementation.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-discovery/stage-clarify.md
@.agent/skills/makeit-dev-be/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="receive_input">
    Ask user for Techlead task assignments (paste, Lark link, or structured input).
    Extract: Task ID, linked user story, API contracts needed, DB changes, priority, dependencies.
  </step>

  <step name="verify_gate_3">
    Run Gate 3 verification from skill instructions:
    - Task clarity — BE scope separated from FE
    - Scope specifics — endpoints, tables, logic clear
    - User story linked — BA story reference
    - API contract defined or design needed
    - Security requirements identified
    If Gate 3 fails → block with clarification message for Techlead.
  </step>

  <step name="bootstrap_workspace">
    After Gate 3 passes, create sprint workspace:
    `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/` with STATE.md, SPECS.md, ROADMAP.md.
    Populate with task data, deliverables, and phased execution plan.
  </step>

  <step name="present_summary">
    Display workspace summary with Gate 3 status, expected deliverables,
    workspace path. Suggest: `/makeit:plan-phase`.
  </step>
</process>

<success_criteria>
- [ ] Gate 3 verified — all checks pass or failures flagged
- [ ] Sprint workspace created with STATE.md, SPECS.md, ROADMAP.md
- [ ] API/DB/security requirements identified
- [ ] User informed of next steps
</success_criteria>
