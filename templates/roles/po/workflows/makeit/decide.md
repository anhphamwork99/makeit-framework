---
name: makeit:decide
description: Record a business decision with rationale and context
---

<objective>
Capture and persist a business decision made during PO sprint work. Records the decision, rationale, alternatives considered, and impact on downstream teams. Saves to sprint DECISIONS.md for traceability.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-support/decide.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If active sprint → load for context (current phase, recent work).
    If no sprint → still proceed (decision can be captured without sprint context).
  </step>

  <step name="capture_decision">
    Follow skill instructions to structure the decision:
    - What was decided
    - Why (business rationale)
    - Alternatives considered
    - Impact on BA/Designer/Dev
    - Decision maker (PO / discussed with team)
  </step>

  <step name="persist">
    If active sprint exists:
    - Append to `.makeit/sprint/SPRINT-*/DECISIONS.md`
    If no sprint:
    - Display formatted decision for user to record manually
  </step>
</process>

<success_criteria>
- [ ] Decision captured with rationale
- [ ] Decision persisted to DECISIONS.md (or displayed for manual recording)
- [ ] Impact on downstream teams identified
</success_criteria>
