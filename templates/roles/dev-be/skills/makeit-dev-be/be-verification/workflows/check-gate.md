---
name: be-workflow-check-gate
description: BE gate check workflow — verify Gate 4 items with BE-specific checks for API docs and security
---

<purpose>
Verify Dev BE output meets Gate 4 standard before PR submission — check all items in Gate 4 checklist including BE-specific items.
</purpose>

<process>
  <step name="load_gate_checklist">
    Read from `@_shared/references/quality-gates.md`, focus Dev BE items:

    **PR Items:**
    - [ ] PR follows template
    - [ ] Lark task linked
    - [ ] AI Review Checklist completed
    - [ ] Self-reviewed diff
    - [ ] Conventional commits

    **BE-Specific Items:**
    - [ ] API documentation updated ⭐
    - [ ] No console errors/warnings
    - [ ] Code follows coding standards
  </step>

  <step name="check_items">
    1. Evaluate each item: ✅ Pass / ❌ Fail / ⚠️ Partial
    2. For failures, note specifically what's missing
  </step>

  <step name="generate_report">
    ```markdown
    ## 🚦 Gate 4 Check — Dev BE Output

    | # | Item | Status | Notes |
    |---|------|--------|-------|
    | 1 | PR follows template | ✅/❌ | [detail] |
    | ... | ... | ... | ... |

    **Result:** ✅ PASS / ❌ FAIL
    ```

    - ✅ Pass → ready for PR submission
    - ❌ Fail → fix items, then re-check
  </step>
</process>
