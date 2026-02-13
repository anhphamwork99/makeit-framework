---
name: makeit:lesson-learned
description: Capture what went well/wrong for structured improvement
---

<objective>
Capture PO sprint lessons — positive or negative events with root cause analysis and structured prevention actions. Records to sprint LESSONS.md for team improvement.
</objective>

<execution_context>
@.agent/skills/makeit-po/po-support/lesson-learned.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If active → load context.
    If no sprint → still proceed.
  </step>

  <step name="capture">
    Follow skill instructions to:
    1. Ask what happened
    2. Classify category (process/quality/communication/decision/tool)
    3. Record in LESSONS.md
    4. Suggest prevention action
  </step>
</process>

<success_criteria>
- [ ] Event captured with factual description
- [ ] Root cause identified
- [ ] Prevention action suggested
</success_criteria>
