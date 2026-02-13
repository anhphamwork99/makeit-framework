---
name: fe-lesson-learned
description: FE lesson learned — record insights from FE sprint execution for future improvement
---

<purpose>
Capture FE-specific lessons learned during sprint execution — implementation patterns, tooling issues, design-code gaps, process improvements.
</purpose>

<process>
  <step name="capture_lesson">
    Ask for lesson details:
    1. **What happened:** The situation or problem
    2. **What was learned:** The insight or takeaway
    3. **What to do differently:** Actionable improvement
    4. **Category:** Component pattern / Tooling / Design gap / Process / Performance
  </step>

  <step name="record_lesson">
    Append to `.makeit/sprint/SPRINT-{NNN}/LESSONS.md`:
    ```markdown
    ## LL-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Category:** {component/tooling/design/process/performance}
    - **Situation:** {what happened}
    - **Lesson:** {what was learned}
    - **Action:** {what to do differently next time}
    ```
  </step>

  <step name="confirm">
    Display recorded lesson.
    Continue with current work.
  </step>
</process>
