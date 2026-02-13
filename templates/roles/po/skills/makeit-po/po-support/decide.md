---
name: po-decide
description: PO decide — record a business decision with context, alternatives, rationale, and implications
---

<purpose>
Record business decisions made by PO during sprint execution with structured context, alternatives considered, and rationale for traceability.
</purpose>

<process>
  <step name="ask_decision">
    Ask:
    - "What's the decision?" — Get the specific choice made
    - "What alternatives were considered?" — At least 2 alternatives
    - "Why this choice?" — Business rationale
    - "What's the impact?" — Implications for BA/Designer/Dev
  </step>

  <step name="record_decision">
    Record in sprint's `DECISIONS.md`:
    ```markdown
    ## DEC-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Sprint:** SPRINT-{NNN}
    - **Category:** {priority|scope|design|timeline|technical}
    - **Decision:** {what was decided}
    - **Alternatives:** {what was considered and rejected}
    - **Rationale:** {business reasoning}
    - **Impact:** {who/what is affected}
    - **Reversible:** {yes/no — and cost of reversal}
    ```
  </step>

  <step name="notify_impact">
    If decision impacts other roles:
    - BA → flag in handoff: context change
    - Designer → flag: design implication
    - Techlead → flag: technical constraint
    Draft notification for affected parties.
  </step>
</process>

<edge_cases>

**Khi TL/Dev escalate feedback nói PO goal không khả thi — cần quyết định nhanh:** Classify: modify goal, split goal, hoặc accept technical constraint. Record decision với impact assessment. Notify tất cả downstream roles.

**Khi Designer và PO có conflicting vision về feature direction:** PO là final authority theo team-workflow.md. Record quyết định với rationale, note Designer's concerns. Nếu conflict nghiêm trọng → suggest sync meeting thay vì quyết định unilateral.

</edge_cases>

<success_criteria>
- [ ] Decision recorded with rationale
- [ ] Alternatives documented
- [ ] Impact identified and flagged
</success_criteria>
