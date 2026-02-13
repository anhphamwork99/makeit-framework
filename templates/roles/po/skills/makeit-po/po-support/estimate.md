---
name: po-estimate
description: PO estimate — assess backlog item complexity and effort using business-oriented sizing
---

<purpose>
Estimate backlog item complexity using business-oriented t-shirt sizing to inform sprint capacity planning and priority decisions.
</purpose>

<rules>
1. Ceiling rule — overall size = highest dimension size
2. PO estimates business complexity, not technical—Techlead does technical estimation
3. If any dimension uncertain, flag with `?` and note assumption
</rules>

<process>
  <step name="identify_items">
    Read deliverables folder for existing backlog items.
    Or estimate items being planned (from PLAN.md).
  </step>

  <step name="assess_dimensions">
    For each backlog item, evaluate against 5 business dimensions:

    | Dimension | S | M | L | XL |
    |-----------|---|---|---|-----|
    | User flows | 1 | 2-3 | 4-5 | 6+ |
    | Edge cases | 1-2 | 3-4 | 5-7 | 8+ |
    | Stakeholders | 1 | 2 | 3 | 4+ |
    | Dependencies | 0 | 1 | 2-3 | 4+ |
    | Goal clarity | Clear | Mostly clear | Some unknowns | Ambiguous |

    Use highest dimension as the overall size (ceiling rule).
  </step>

  <step name="display_output">
    ```
    📊 Business Complexity Assessment

    | Item | Flows | Edges | Stakeholders | Deps | Clarity | → Size |
    |------|-------|-------|-------------|------|---------|--------|
    | TASK-001 | 1 | 2 | 1 | 0 | Clear | S |
    | TASK-002 | 3 | 5 | 2 | 2 | Some unknowns | L |

    Total: {N}S + {N}M + {N}L + {N}XL
    Sprint complexity: {overall assessment}
    ```

    > Note: This is business complexity. Technical estimation is done by Techlead.
  </step>
</process>

<edge_cases>

**Khi estimation cho thấy item XL trên nhiều dimensions (scope vượt 1 sprint):** Tự động flag: "⚠️ Item quá lớn — recommend split trước khi add vào sprint." Reference `manage-sprint-goal` workflow cho split process. Không finalize estimate XL mà không có PO acknowledgment.

</edge_cases>

<success_criteria>
- [ ] All items assessed across 5 business dimensions
- [ ] Ceiling rule applied
- [ ] Complexity summary displayed
</success_criteria>
