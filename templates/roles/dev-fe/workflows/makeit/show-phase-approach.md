---
name: makeit:show-phase-approach
description: Surface Agent assumptions about FE implementation for user approval before planning
---

<objective>
Present Agent's planned approach for an FE phase — component-first vs page-first, responsive strategy, risk areas, dependencies — so user can approve or correct before planning begins.
</objective>

<execution_context>
@.agent/skills/makeit-dev-fe/fe-planning/stage-show-phase-approach.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Validate target phase exists and is pending/planning.
  </step>

  <step name="analyze">
    Form assumptions across: implementation strategy, component architecture, responsive approach, risk areas, dependencies.
    Mark confidence levels (fairly confident / assuming / unclear).
  </step>

  <step name="present_and_gather_feedback">
    Present approach. Ask user for corrections.
    Offer next steps: discuss-phase, plan-phase, re-examine, done.
  </step>
</process>

<success_criteria>
- [ ] Assumptions surfaced with confidence levels
- [ ] User feedback gathered
- [ ] Next steps offered
</success_criteria>
