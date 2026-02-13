---
name: ba-workflow-analyze-design
description: Analyze Figma design screens via MCP — extract components, interaction states, data requirements, flow transitions, and edge cases
---

<purpose>
Analyze Figma design screens using MCP tools to extract UI components, interaction states, data requirements, flow transitions, and design edge cases into a structured analysis report.
</purpose>

<required_reading>
@ba-execution/templates/figma-analysis.md
@_shared/references/figma-mcp.md
</required_reading>

<rules>
1. Always confirm which Figma screens/frames are in scope before starting
2. Use MCP tools (`get_design_context`, `get_metadata`, `get_screenshot`) — never manual interpretation alone
3. Flag missing interaction states (hover, active, disabled, error, empty, loading) explicitly
4. Capture screenshots for visual reference in the report
5. Gate 1 should have verified Figma access — if access fails, escalate
</rules>

<output>
Figma analysis report → `.makeit/sprint/SPRINT-*/deliverables/ANALYSIS-{feature}.md`
Template: `@ba-execution/templates/figma-analysis.md`
</output>

<process>
  <step name="gather_input">
    Get Figma link from SPECS.md or user.
    Confirm which screens/frames to analyze.
    Verify Figma access (Gate 1 should have checked this).
  </step>

  <step name="extract_design_context">
    Use `get_design_context` on each Figma frame.
    Extract: components, styles, layout, tokens, states.
    For complex files: use `get_metadata` first for overview.
  </step>

  <step name="analyze_components">
    List all UI components with type and states.
    For each component identify:
    - Default, hover, active, disabled, error, loading states
    - Data fields required
    - Interaction behaviors
  </step>

  <step name="map_flow_transitions">
    Identify screen-to-screen navigation.
    Document: `[Screen A] ──(action)──▶ [Screen B]`
    Note branching points and error flows.
  </step>

  <step name="identify_design_edge_cases">
    Flag missing interaction states.
    Flag empty states not shown.
    Flag error states undefined.
    Flag loading states missing.
  </step>

  <step name="capture_screenshots">
    Use `get_screenshot` for visual reference.
    Attach to analysis report.
  </step>

  <step name="generate_report">
    Fill `@ba-execution/templates/figma-analysis.md`.
    Include: screens, components, states, data, flows, edge cases, screenshots.
  </step>
</process>

<edge_cases>

**Khi Figma design đã thay đổi sau lần analysis trước:** Nếu re-analyze và phát hiện screens/components khác với report trước → ghi rõ trong report: "⚠️ Design updated since last analysis — sections X, Y changed." Flag cho write-stories biết stories cần cập nhật theo design mới.

**Khi design pass Gate 1 nhưng screens cụ thể thiếu states (hover, error, empty, loading):** Liệt kê screens incomplete vào report mục "Design Gaps". Analyze được gì thì analyze — không block vì một vài screens thiếu. Draft Telegram message cho Designer: "Screens {list} thiếu interaction states — cần bổ sung để BA hoàn thành stories."

**Khi MCP tools fail, return error hoặc data không khớp Figma hiện tại:** Fallback: yêu cầu user share screenshot hoặc mô tả screen manually. Ghi trong report: "MCP unavailable/unreliable — analysis dựa trên manual input." Nếu MCP return partial data → sử dụng phần data có, flag phần thiếu. Không bỏ qua screen vì MCP fail.

</edge_cases>

<success_criteria>
- [ ] All in-scope screens analyzed
- [ ] Components listed with all interaction states
- [ ] Flow transitions mapped
- [ ] Design edge cases flagged
- [ ] Screenshots captured
- [ ] Report generated using template
</success_criteria>
