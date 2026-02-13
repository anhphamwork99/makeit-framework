---
name: makeit:verify-work
description: Validate ALL sprint deliverables against SPECS.md — final check before completion
---

<objective>
Validate entire sprint output — all backlog items, sprint plans, and review decisions meet SPECS.md criteria. UAT-like final check. Not per-phase, but sprint-wide cross-deliverable consistency check.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-verification/stage-verify-work.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If no active sprint → "No active sprint. Run /makeit:start-sprint to start."
    Read STATE.md → verify all phases complete.
    If phases not complete → "Not all phases complete. Finish remaining phases first."
  </step>

  <step name="execute">
    Follow stage skill to:
    1. Load SPECS.md → expected deliverables + success criteria
    2. Check each deliverable (PO-specific quality)
    3. Run cross-deliverable consistency checks
    4. Present verification report for PO review
  </step>

  <step name="suggest_next">
    ALL PASS → `/makeit:complete`
    GAPS → list gaps, suggest which phase to revisit
  </step>
</process>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] Cross-deliverable consistency verified
- [ ] PO reviewed final results
- [ ] Ready for sprint completion
</success_criteria>
