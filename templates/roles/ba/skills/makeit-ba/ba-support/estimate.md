---
name: ba-estimate
description: BA estimate — assess user story complexity using t-shirt sizing with rationale
---

<purpose>
Estimate user story complexity using t-shirt sizing with structured 5-dimension assessment and ceiling rule.
</purpose>

<rules>
1. Ceiling rule — overall size = highest dimension size
2. Dependency amplifier — if deps ≥ 3, bump up one size
3. Unknown discount — if any dimension uncertain, flag with `?` and note assumption
</rules>

<process>
  <step name="identify_stories">
    Read deliverables folder for existing stories.
    Or estimate stories being planned (from PLAN.md).
  </step>

  <step name="assess_dimensions">
    For each story, evaluate against 5 dimensions:

    | Dimension | S | M | L | XL |
    |-----------|---|---|---|-----|
    | Screens/flows | 1 | 2-3 | 4-5 | 6+ |
    | Edge cases | 1-2 | 3-4 | 5-7 | 8+ |
    | AC count | 3 | 4-5 | 6-7 | 8+ |
    | Dependencies | 0 | 1 | 2-3 | 4+ |
    | Design complexity | Simple | Moderate | Complex | Very complex |

    Use highest dimension as the overall size (ceiling rule).
  </step>

  <step name="display_output">
    ```
    📊 Complexity Assessment

    | Story | Screens | Edges | Deps | Design | → Size |
    |-------|---------|-------|------|--------|--------|
    | US-001 | 1 | 2 | 0 | Simple | S |
    | US-002 | 3 | 5 | 2 | Complex | L |

    Total: {N}S + {N}M + {N}L + {N}XL
    Sprint complexity: {overall assessment}
    ```
  </step>
</process>

<edge_cases>

**Khi total complexity vượt sprint capacity sau estimation:** Nếu tổng kết quả > 3L hoặc > 8 stories → flag rõ: "⚠️ Sprint overcommitment risk — total: {summary}. Suggest: PO tham gia scope negotiation — ưu tiên stories nào deliver value cao nhất, defer phần còn lại." Cung cấp priority suggestion dựa trên PO goal importance, nhưng PO quyết định final.

</edge_cases>

<success_criteria>
- [ ] All stories assessed across 5 dimensions
- [ ] Ceiling rule and amplifiers applied
- [ ] Complexity summary displayed
</success_criteria>
