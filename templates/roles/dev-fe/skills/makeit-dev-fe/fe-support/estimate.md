---
name: fe-estimate
description: FE task estimation — assess implementation complexity for components and features
---

<purpose>
Estimate FE task complexity considering component count, interaction states, responsive requirements, and integration needs.
</purpose>

<process>
  <step name="identify_task">
    What needs estimation? Component, feature, or full sprint.
    Load context from SPECS.md or user description.
  </step>

  <step name="assess_dimensions">
    | Dimension | S (1-2h) | M (3-4h) | L (5-8h) | XL (>8h) |
    |-----------|----------|----------|----------|----------|
    | Components | 1 simple | 2-3 standard | 4-5 complex | 5+ nested |
    | States | 2-3 basic | 4-5 standard | All 7 states | Custom animations |
    | Responsive | Same layout | Minor adjustments | Per-breakpoint | Complex reflows |
    | Integration | None | 1-2 endpoints | Multiple | Real-time |
    | Design fidelity | Standard | Custom | Pixel-perfect | Motion design |
  </step>

  <step name="calculate_estimate">
    Sum dimensions → overall complexity: S/M/L/XL.
    Add buffer: +20% for unknowns, +30% if first time with pattern.
    Present estimate with confidence level and risks.
  </step>
</process>
