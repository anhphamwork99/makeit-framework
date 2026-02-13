---
name: tl-decide
description: TL decide — facilitate and document technical decisions on architecture, patterns, or implementation approach
---

<purpose>
Facilitate and document technical decisions on architecture, implementation approach, library choices, or API design with rationale and source of truth hierarchy.
</purpose>

<rules>
1. Source of truth hierarchy: PO Goal & Context > Designer Specs > BA Stories > Techlead Tasks
2. Higher level wins in conflicts
3. Always record rationale — future sessions need to understand "why"
4. Technical Decision Authority levels apply (see below)
5. Notify affected roles when decision has cross-role impact
</rules>

<process>
  <step name="identify_decision">
    Ask:
    - What needs to be decided? (architecture, library, API pattern, implementation approach)
    - Who's involved? (PO, BA, Designer, Dev)
    - What triggered this? (ambiguity, conflict, new requirement, tech constraint)
  </step>

  <step name="assess_decision_level">
    | Level | Techlead Action |
    |-------|----------------|
    | Minor (naming, pattern within module) | Decide directly |
    | Medium (library choice, refactor scope) | Discuss with Dev first |
    | Major (architecture, stack change) | Team discussion + ADR |
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
    - **Level:** {Minor/Medium/Major}
    - **Context:** {What triggered the decision}
    - **Decision:** {What was decided}
    - **Rationale:** {Why — reference source of truth}
    - **Trade-offs:** {What was accepted/rejected}
    - **Impact:** {What changes as a result}
    - **Decided by:** {TL/Team/escalated}
    ```
  </step>

  <step name="draft_notification">
    If decision affects other roles:
    ```
    📝 Technical decision: {title}
    Level: {Minor/Medium/Major}
    Impact: {who is affected}
    Details: {1-line summary}
    @{role} FYI
    ```
  </step>
</process>

<edge_cases>

**Khi architecture decision cần consensus nhưng team async (không thể họp ngay):** Nếu decision level = Major nhưng team members không available → draft ADR proposal, gửi qua Telegram với deadline rõ ràng (24-48h). Nếu hết deadline mà chưa có feedback → ghi "No objection received within deadline" và proceed. Nếu có objection → schedule sync meeting. Không block sprint vô thời hạn chờ consensus.

</edge_cases>

<success_criteria>
- [ ] Decision identified with context
- [ ] Decision level assessed
- [ ] Source of truth hierarchy applied
- [ ] Decision recorded in DECISIONS.md
- [ ] Affected roles notified (if any)
</success_criteria>
