---
name: fe-workflow-compare-ui
description: Internal FE workflow — visual comparison of implemented UI against Figma designs using Figma MCP screenshots
---

<purpose>
Compare built UI against original Figma designs — capture screenshots, run pixel-level comparison, check responsive behavior, and generate deviation report.
</purpose>

<context>
Internal workflow — called by `stage-execute-phase.md` or `stage-verify-phase.md`, NOT a standalone command.
Requires Figma MCP connection for screenshots.
</context>

<required_reading>
@fe-execution/templates/UI-COMPARISON-TEMPLATE.md
@_shared/references/figma-mcp.md
</required_reading>

<rules>
1. Figma MCP screenshots — use `figma_capture_screenshot` or `figma_get_component_image`
2. Component-by-component — compare each component individually, not full pages
3. All breakpoints — check responsive layouts per design
4. Document ALL deviations — even "minor" ones (spacing, color, font)
5. Action items required — each deviation needs fix instruction
</rules>

<output>
Comparison report → `.makeit/sprint/SPRINT-{NNN}/phases/{NN}-{name}/UI-COMPARISON.md`

Use template: `@fe-execution/templates/UI-COMPARISON-TEMPLATE.md`
</output>

<process>
  <step name="load_design_references">
    1. Gather Figma links from SPECS.md or current task
    2. Use Figma MCP to capture design screenshots at required scales
    3. Note design tokens and expected values for reference
  </step>

  <step name="capture_implementation">
    1. Run the development server (or use build output)
    2. Capture implementation screenshots at same scales/breakpoints
    3. If browser screenshots not available, document visual comparison verbally
  </step>

  <step name="compare_visuals">
    For EACH component/screen:

    **Layout Comparison:**
    - [ ] Overall structure matches design
    - [ ] Spacing between elements (margins, padding)
    - [ ] Alignment (horizontal, vertical, grid)
    - [ ] Z-index / layering correct

    **Visual Properties:**
    - [ ] Colors match design tokens (not approximate)
    - [ ] Typography (font-family, size, weight, line-height)
    - [ ] Border-radius matches
    - [ ] Shadows/effects match

    **Interaction States:**
    - [ ] Default state matches
    - [ ] Hover state matches
    - [ ] Active/pressed state matches
    - [ ] Disabled state matches
    - [ ] Error state matches
    - [ ] Empty state matches
    - [ ] Loading state matches

    **Responsive:**
    - [ ] Desktop layout matches
    - [ ] Tablet layout matches
    - [ ] Mobile layout matches
  </step>

  <step name="visual_comparison_fallback">
    If implementation screenshot cannot be captured automatically:

    **Method 1 — Manual screenshot:**
    - Ask user to take screenshot of implemented component
    - User provides screenshot path or pastes image
    - Compare against Figma screenshot side-by-side

    **Method 2 — Checklist comparison:**
    Compare against Figma using structured checklist (no screenshot needed):
    - [ ] Layout matches (flex direction, alignment, spacing)
    - [ ] Colors match design tokens (not approximate hex values)
    - [ ] Typography matches (font-family, size, weight, line-height)
    - [ ] Border radius matches design spec
    - [ ] Shadow/elevation matches
    - [ ] Icon sizes and placement match
    - [ ] Responsive behavior matches breakpoints
    - [ ] Interaction states match (hover, active, disabled)

    **Method 3 — Figma overlay (if available):**
    - Export Figma frame as PNG at 1x scale
    - User overlays on implementation screenshot
    - Check pixel-level alignment at key reference points
    - Focus on spacing and proportions rather than exact pixels
  </step>

  <step name="generate_report">
    Create comparison report:

    | Component | Aspect | Expected | Actual | Severity | Fix |
    |-----------|--------|----------|--------|----------|-----|
    | Button | Color | #1A73E8 | #2196F3 | Medium | Update to design token |
    | Card | Padding | 24px | 16px | High | Fix padding value |

    Severity: Critical (blocks deployment) > High (noticeable) > Medium (minor) > Low (polish)
  </step>
</process>

<edge_cases>

**Khi Figma design đã được cập nhật sau khi implementation bắt đầu:** So sánh thời điểm bắt đầu implement (từ STATE.md) với last-modified date của Figma frame. Nếu design mới hơn → cảnh báo user: "Design đã cập nhật — compare-ui đang so sánh với version mới. Kết quả có thể khác so với specs ban đầu." Ghi nhận trong comparison report.

**Khi visual deviations nằm trong ngưỡng nhỏ** (≤2px spacing, ≤5% opacity, ≤1pt font size): Phân loại tự động — deviations ≤2px: Low severity (polish). Deviations 3-5px: Medium severity (should fix). Deviations >5px: High severity (must fix). Ghi rõ mức tolerance trong report để Designer review hiệu quả hơn.

**Khi Figma MCP không kết nối hoặc trả về dữ liệu không đầy đủ:** Chuyển sang fallback methods theo thứ tự: (1) Yêu cầu user chụp screenshot từ Figma → so sánh manual. (2) Dùng checklist comparison (Method 2) thay vì pixel comparison. (3) Nếu không có screenshot nào → thực hiện code-level verification (design tokens, spacing values) và ghi nhận: "Visual comparison skipped — MCP unavailable. Code-level check only." trong report.

</edge_cases>
