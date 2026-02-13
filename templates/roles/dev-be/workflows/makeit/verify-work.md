---
name: makeit:verify-work
description: Validate ALL sprint deliverables against SPECS.md — API contracts, DB migrations, tests, security
---

<objective>
Validate entire sprint output — all API implementations, DB migrations, tests, and documentation meet SPECS.md criteria. Final check before sprint completion.
</objective>

<execution_context>
@.agent/skills/makeit-dev-be/be-verification/stage-verify-work.md
@.agent/skills/makeit-dev-be/_shared/references/quality-gates.md
</execution_context>

<process>
  <step name="load_sprint">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    Confirm all phases complete. Load SPECS.md for deliverables list.
    If phases incomplete → error: "Complete all phases first"
  </step>

  <step name="verify_deliverables">
    Follow skill instructions to check ALL deliverables:
    - API contract check — endpoints, schemas, error codes
    - Implementation check — code quality, commits, error handling
    - Database check — migrations reversible, indexes, no N+1
    - Security check — validation, auth, no injection
    - Testing check — unit + integration passing
    - Documentation check — API docs updated
  </step>

  <step name="cross_check">
    Verify cross-deliverable consistency:
    - Contract-Code alignment
    - Schema-Code alignment
    - Story-Code alignment
    - Test-Code coverage
  </step>

  <step name="route_results">
    **ALL PASS ✅:** Suggest `/makeit:complete`.
    **GAPS FOUND ❌:** List gaps → suggest which phase to revisit.
  </step>
</process>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] BE-specific quality checks applied
- [ ] Cross-deliverable consistency verified
- [ ] User informed of next steps
</success_criteria>
