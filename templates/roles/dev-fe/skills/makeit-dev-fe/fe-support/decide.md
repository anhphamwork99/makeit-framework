---
name: fe-decide
description: FE implementation decision — record and track FE-specific decisions made during sprint
---

<purpose>
Record implementation decisions (component patterns, library choices, responsive strategy) with context and rationale for future reference.
</purpose>

<process>
  <step name="capture_decision">
    Ask for decision details:
    1. **What:** The decision made
    2. **Why:** Rationale / trade-offs considered
    3. **Alternatives:** What was NOT chosen and why
    4. **Impact:** Which components/features affected
  </step>

  <step name="record_decision">
    Append to `.makeit/sprint/SPRINT-{NNN}/DECISIONS.md`:
    ```markdown
    ## DEC-{NNN}: {Title}
    - **Date:** {YYYY-MM-DD}
    - **Decision:** {what was decided}
    - **Rationale:** {why}
    - **Alternatives rejected:** {what wasn't chosen}
    - **Impact:** {components/features affected}
    - **Decided by:** {user/agent}
    ```
  </step>

  <step name="confirm">
    Display recorded decision.
    Continue with current work.
  </step>
</process>
