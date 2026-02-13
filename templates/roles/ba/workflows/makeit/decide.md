---
name: makeit:decide
description: Document a decision with rationale and context — saves to sprint STATE decisions table
---

<objective>
Capture and persist a decision made during BA sprint work. Records the decision, rationale, alternatives considered, and decision maker. Saves to the sprint STATE.md decisions section for traceability.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-support/decide.md
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
    - Why (rationale)
    - Alternatives considered
    - Impact on current work
    - Decision maker (BA / escalated from PO / discussed with Techlead)
  </step>

  <step name="persist">
    If active sprint exists:
    - Append to `.makeit/sprint/SPRINT-*/STATE.md` decisions table
    If no sprint:
    - Display formatted decision for user to record manually
  </step>
</process>

<success_criteria>
- [ ] Decision captured with rationale
- [ ] Decision persisted to STATE.md (or displayed for manual recording)
- [ ] Decision traceable to current phase/context
</success_criteria>
