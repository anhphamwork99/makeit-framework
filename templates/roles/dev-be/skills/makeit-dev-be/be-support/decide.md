---
name: be-decide
description: BE decide — document technical decision with context, options, and rationale
---

<purpose>
Record technical decision with full context, options considered, and rationale. Saved in task file or standalone.
</purpose>

<process>
  <step name="gather_context">
    1. **What decision is needed?** — Specific technical issue
    2. **Why now?** — Why decide at this point
    3. **Impact:** — Effect on API, database, performance
    4. **Task reference:** — LARK-ID if applicable
  </step>

  <step name="list_options">
    | Option | Pros | Cons |
    |--------|------|------|
    | Option A: [description] | [benefits] | [tradeoffs] |
    | Option B: [description] | [benefits] | [tradeoffs] |

    > 💡 Architecture-level decisions → discuss with Techlead first.
  </step>

  <step name="record_decision">
    ```markdown
    ## Decision Record
    - **Decision:** [Summary]
    - **Chosen option:** [Option X]
    - **Rationale:** [Why this option]
    - **Trade-offs accepted:** [What we accept]
    - **Date:** [YYYY-MM-DD]
    - **Impact:** [APIs/tables/services affected]
    ```
  </step>

  <step name="save">
    1. If task-related → add to Decisions section in task file
    2. If standalone → save decision record
    3. Suggest: update API contract/schema if needed
  </step>
</process>

<success_criteria>
- [ ] Decision context documented
- [ ] Options listed with trade-offs
- [ ] Decision recorded with rationale
</success_criteria>
