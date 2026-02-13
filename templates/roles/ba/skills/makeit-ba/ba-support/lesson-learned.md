---
name: ba-lesson-learned
description: BA lesson-learned — capture what went well/wrong during sprint execution for future improvement
---

<purpose>
Capture what went well/wrong during BA sprint execution for structured improvement tracking with categorized prevention actions.
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
    | quality | Stories below AC standard, missed edge cases |
    | communication | PO intent misunderstood, handoff incomplete |
    | tool | Figma MCP returned stale data, template mismatch |
  </step>

  <step name="record_lesson">
    Record in sprint's `LESSONS.md`:
    ```markdown
    ## LL-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Category:** {process|quality|communication|tool}
    - **What happened:** {factual description}
    - **Root cause:** {why it happened}
    - **Lesson:** {what to do differently}
    - **Action item:** {specific change to make}
    ```
  </step>

  <step name="suggest_prevention">
    Based on root cause, suggest one of:
    - **Process fix:** Add/modify a step in the workflow
    - **Checklist item:** Add to Gate 1 or Gate 2 checklist
    - **Template update:** Improve template to prevent recurrence
    - **Skill update:** Modify skill instructions
  </step>
</process>

<edge_cases>

**Khi nhận thấy pattern lặp lại của quality issues qua nhiều lessons:** Nếu ≥3 lessons cùng category (e.g., quality) trong 1 sprint → đây là systemic issue, không phải incident đơn lẻ. Suggest: "Pattern detected — {N} quality issues cùng loại. Root cause có thể là skill instructions thiếu, context không đủ, hoặc AI capability limit. Suggest: review và update skill file liên quan thay vì chỉ ghi lesson."

</edge_cases>

<success_criteria>
- [ ] Event captured with factual description
- [ ] Category classified
- [ ] Root cause identified
- [ ] Prevention action suggested
</success_criteria>
