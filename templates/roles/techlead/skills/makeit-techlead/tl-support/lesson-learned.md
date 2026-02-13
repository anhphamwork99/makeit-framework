---
name: tl-lesson-learned
description: TL lesson-learned — capture what went well/wrong during sprint execution for future improvement
---

<purpose>
Capture what went well/wrong during TL sprint execution for structured improvement tracking with categorized prevention actions.
</purpose>

<process>
  <step name="ask_what_happened">
    Ask:
    - "What happened?" — Get the factual event
    - "Was it positive or negative?" — Classify direction
    - "Which part of the process was it?" — Classify category
  </step>

  <step name="classify_category">
    | Category | Examples |
    |----------|---------|
    | process | Skipped verification, wrong execution order |
    | quality | Task breakdown below standard, missed dependencies |
    | communication | BA intent misunderstood, handoff incomplete to Dev |
    | technical | Wrong architecture choice, missing API constraint |
    | tool | Sub-agent returned poor output, template mismatch |
    | estimation | Over/under estimation, missed risk factor |
  </step>

  <step name="record_lesson">
    Record in sprint's `LESSONS.md`:
    ```markdown
    ## LL-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Category:** {process|quality|communication|technical|tool|estimation}
    - **What happened:** {factual description}
    - **Root cause:** {why it happened}
    - **Lesson:** {what to do differently}
    - **Action item:** {specific change to make}
    ```
  </step>

  <step name="suggest_prevention">
    Based on root cause, suggest one of:
    - **Process fix:** Add/modify a step in the workflow
    - **Checklist item:** Add to Gate 2 or Gate 3 checklist
    - **Template update:** Improve template to prevent recurrence
    - **Skill update:** Modify skill instructions
    - **Estimation update:** Adjust risk factors or scoring
  </step>
</process>

<success_criteria>
- [ ] Event captured with factual description
- [ ] Category classified
- [ ] Root cause identified
- [ ] Prevention action suggested
</success_criteria>
