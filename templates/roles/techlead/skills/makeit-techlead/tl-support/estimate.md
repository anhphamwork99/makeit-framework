---
name: tl-estimate
description: TL estimate — assess task complexity using 7-factor scoring, t-shirt sizing, and risk-adjusted estimation
---

<purpose>
Estimate task complexity using Techlead's specialized 7-factor methodology with t-shirt sizing, risk assessment, and FE/BE split analysis. Overrides shared estimate skill.
</purpose>

<rules>
1. 7-factor scoring model — comprehensive complexity assessment
2. Ceiling rule — overall size = highest factor size
3. Risk multiplier applied — 1.0x to 2.0x based on risk factors
4. FE/BE split required — separate effort for each developer
5. XL tasks flagged — must be broken down further
</rules>

<process>
  <step name="identify_tasks">
    Read task breakdowns from sprint deliverables.
    Or estimate tasks being planned (from PLAN.md).
  </step>

  <step name="assess_factors">
    For each task, evaluate against 7 factors:

    | Factor | 1 (Low) | 2 (Medium) | 3 (High) | 4 (Very High) | 5 (Extreme) |
    |--------|---------|------------|----------|----------------|-------------|
    | Scope (lines/files) | < 50 LOC | 50-200 | 200-500 | 500-1000 | > 1000 |
    | Complexity (logic) | CRUD | Moderate logic | Complex logic | Algorithm | Distributed |
    | Dependencies | 0 | 1-2 | 3-4 | 5+ | External API |
    | Uncertainty | Clear spec | Small gaps | Moderate gaps | Significant | Prototype |
    | Integration | None | Internal API | External API | Multi-service | Legacy |
    | Testing | Unit only | + Integration | + E2E | + Performance | + Security |
    | Risk | Low | Medium | High | Very High | Critical |

    **Complexity Score** = Sum of all factors (7–35)

    | Score | T-shirt Size | Effort Estimate |
    |-------|-------------|-----------------|
    | 7–10 | S | < 2h |
    | 11–15 | M | 2-4h |
    | 16–22 | L | 4-8h |
    | 23–28 | XL | 1-2 days |
    | 29–35 | XXL | > 2 days → MUST SPLIT |
  </step>

  <step name="risk_assessment">
    | Risk Factor | Multiplier |
    |-------------|------------|
    | All clear, familiar stack | 1.0x |
    | Some unknowns, new patterns | 1.3x |
    | Significant unknowns, new library | 1.5x |
    | First-time tech, external dependency | 2.0x |
  </step>

  <step name="fe_be_split">
    For each story/feature:
    - Calculate FE effort vs BE effort separately
    - Identify critical path (which side blocks the other)
    - Note parallel work opportunities
  </step>

  <step name="display_output">
    ```
    📊 Estimation Report

    | Task | Score | Size | Risk | FE | BE | Total |
    |------|-------|------|------|----|----|-------|
    | Task-1 | 12 | M | 1.0x | 2h | 3h | 5h |
    | Task-2 | 18 | L | 1.3x | 4h | 6h | 13h |

    Summary:
    - FE Total: {N}h (risk-adjusted: {N}h)
    - BE Total: {N}h (risk-adjusted: {N}h)
    - Sprint Total: {N}h
    - Critical Path: {description}

    ⚠️ Flags:
    - {XL tasks needing split}
    - {High-risk items}
    ```

    Template: `tl-execution/templates/estimation-report.md`
  </step>
</process>

<edge_cases>

**Khi task quá phức tạp để estimate chính xác (uncertainty quá cao):** Nếu Uncertainty factor = 5 (Prototype) và >3 factors ở High+ → flag task là "Estimate unreliable — spike needed." Đề xuất timebox spike (2-4h) để giảm uncertainty trước khi commit estimate. Không ép estimate chính xác cho tasks mà team chưa hiểu rõ.

**Khi estimate sai lệch lớn (>2x) so với actual effort sau execution:** Nếu Dev report actual effort >> estimate → review lại 7-factor scoring cho task đó. Identify factor nào bị đánh giá sai. Cập nhật calibration notes để future estimates chính xác hơn. Nếu systematic (nhiều tasks bị sai) → điều chỉnh risk multiplier baseline.

</edge_cases>

<success_criteria>
- [ ] All tasks assessed across 7 factors
- [ ] Complexity scores calculated
- [ ] Risk multipliers applied
- [ ] FE/BE split calculated
- [ ] XL/XXL tasks flagged for splitting
- [ ] Summary displayed with totals
</success_criteria>
