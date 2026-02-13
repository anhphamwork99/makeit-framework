---
name: po-lesson-learned
description: PO lesson-learned — capture what went well/wrong during PO sprint execution for structured improvement
---

<purpose>
Capture what went well/wrong during PO sprint execution for structured improvement tracking with categorized prevention actions.
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
    | process | Skipped Gate 1 check, wrong mode detected |
    | quality | Goal too vague, missing context for BA |
    | communication | Designer misalignment, BA feedback loop |
    | decision | Priority changed mid-sprint, scope creep |
    | tool | Lark task stale, template mismatch |
  </step>

  <step name="record_lesson">
    Record in sprint's `LESSONS.md`:
    ```markdown
    ## LL-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Category:** {process|quality|communication|decision|tool}
    - **What happened:** {factual description}
    - **Root cause:** {why it happened}
    - **Lesson:** {what to do differently}
    - **Action item:** {specific change to make}
    ```
  </step>

  <step name="suggest_prevention">
    Based on root cause, suggest one of:
    - **Process fix:** Add/modify a step in the PO workflow
    - **Checklist item:** Add to Gate 1 or Gate 5 checklist
    - **Template update:** Improve template to prevent recurrence
    - **Skill update:** Modify skill instructions
    - **Communication fix:** Improve handoff or coordination
  </step>
</process>

<success_criteria>
- [ ] Event captured with factual description
- [ ] Category classified
- [ ] Root cause identified
- [ ] Prevention action suggested
</success_criteria>
