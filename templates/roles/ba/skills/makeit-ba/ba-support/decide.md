---
name: ba-decide
description: BA decide — facilitate and document decisions on requirements, scope, or analysis approach
---

<purpose>
Facilitate and document decisions on requirements, scope, or analysis approach with rationale and source of truth hierarchy.
</purpose>

<rules>
1. Source of truth hierarchy: PO Goal & Context > Designer Specs > BA Stories > Techlead Tasks
2. Higher level wins in conflicts
3. Always record rationale — future sessions need to understand "why"
4. Notify affected roles when decision has cross-role impact
</rules>

<process>
  <step name="identify_decision">
    Ask:
    - What needs to be decided? (scope, requirement interpretation, edge case handling)
    - Who's involved? (PO, Designer, Techlead)
    - What triggered this? (ambiguity, conflict, gap)
  </step>

  <step name="apply_hierarchy">
    Apply Source of Truth Hierarchy:
    ```
    PO Goal & Context > Designer Specs > BA Stories > Techlead Tasks
    ```
    Higher level wins in conflicts.
  </step>

  <step name="record_decision">
    Record in sprint's `DECISIONS.md`:
    ```markdown
    ## DEC-{NNN}: {Decision Title}
    - **Date:** {YYYY-MM-DD}
    - **Context:** {What triggered the decision}
    - **Decision:** {What was decided}
    - **Rationale:** {Why — reference source of truth}
    - **Impact:** {What changes as a result}
    - **Decided by:** {PO/BA/Team}
    ```
  </step>

  <step name="draft_notification">
    If decision affects other roles:
    ```
    📝 Decision made: {title}
    Impact: {who is affected}
    Details: {1-line summary}
    @{role} FYI
    ```
  </step>
</process>

<edge_cases>

**Khi decision cần nhưng root cause là PO goal mơ hồ/mâu thuẫn:** Nếu conflict phát sinh vì PO goal không đủ rõ ràng → không tự interpret. Draft câu hỏi cụ thể cho PO qua Telegram: "PO goal nói [{A}] nhưng sprint context imply [{B}]. Confirm: approach nào đúng?" Block decision cho đến khi PO respond. Ghi vào DECISIONS.md: "Pending PO clarification."

</edge_cases>

<success_criteria>
- [ ] Decision identified with context
- [ ] Source of truth hierarchy applied
- [ ] Decision recorded in DECISIONS.md
- [ ] Affected roles notified (if any)
</success_criteria>
