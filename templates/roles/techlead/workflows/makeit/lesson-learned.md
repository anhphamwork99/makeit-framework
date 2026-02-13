---
name: makeit:lesson-learned
description: Capture a lesson learned from current sprint work — what went well, what to improve
---

<objective>
Document a lesson learned during TL sprint work. Captures what happened, what was learned, and what to do differently next time. Persists to LESSONS.md.
</objective>

<execution_context>
@.agent/skills/makeit-techlead/tl-support/lesson-learned.md
</execution_context>

<process>
  <step name="gather_context">
    Ask: What happened? Positive or negative? Which process area?
    Find active sprint if exists.
  </step>

  <step name="classify_and_record">
    Classify: process, quality, communication, technical, tool, estimation.
    Record in LESSONS.md with root cause and prevention action.
  </step>

  <step name="suggest_prevention">
    Suggest prevention approach:
    Process fix, checklist item, template update, skill update, or estimation adjustment.
  </step>
</process>

<success_criteria>
- [ ] Event captured with description
- [ ] Category classified
- [ ] Root cause identified
- [ ] Lesson recorded
</success_criteria>
