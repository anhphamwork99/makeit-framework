---
name: makeit:lesson-learned
description: Capture a lesson learned from current sprint work — what went well, what to improve
---

<objective>
Document a lesson learned during BA sprint work. Captures what happened, what was learned, and what to do differently next time. Persists to a lessons file for future reference across sprints.
</objective>

<execution_context>
@.agent/skills/makeit-ba/ba-support/lesson-learned.md
</execution_context>

<process>
  <step name="gather_context">
    Find active sprint: `.makeit/sprint/SPRINT-*/STATE.md`
    If active → include sprint phase context in the lesson.
    If no sprint → still proceed (lesson can be captured independently).
  </step>

  <step name="capture_lesson">
    Follow skill instructions:
    - What happened (situation)
    - What was learned (insight)
    - What to do differently (action for future)
    - Category: process, technical, communication, estimation
  </step>

  <step name="persist">
    Append lesson to `.makeit/lessons-learned.md` (cross-sprint file).
    If file doesn't exist, create it with header.
    Include date, sprint reference, and phase context.
  </step>
</process>

<success_criteria>
- [ ] Lesson captured with situation, insight, and future action
- [ ] Lesson persisted to lessons-learned.md
</success_criteria>
