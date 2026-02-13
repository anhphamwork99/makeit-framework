---
name: ba-workflow-identify-edges
description: Systematically identify ALL edge cases for a feature or user story set — ensures no scenario missed before handoff
---

<purpose>
Systematically identify ALL edge cases for a feature or user story set across 5 categories (data, state, UI, business logic, error), assess priority, and integrate into story acceptance criteria.
</purpose>

<required_reading>
@ba-execution/workflows/write-stories.md
@ba-execution/workflows/document-flow.md
@ba-execution/workflows/analyze-design.md
@ba-execution/templates/EDGE-CASES-TEMPLATE.md
</required_reading>

<rules>
1. Every feature has edge cases — never skip ("simple feature" is not an excuse)
2. Always assess impact + likelihood for each edge case
3. Don't keep edge cases separate — integrate into story AC
4. Flag edge cases that need PO decision separately
5. Critical edge cases must become acceptance criteria
</rules>

<output>
Edge case analysis document using template: @ba-execution/templates/EDGE-CASES-TEMPLATE.md

Edge cases are also integrated into story AC. Separate stories created for complex edge case handling.
Edge cases needing PO decision flagged in handoff.
</output>

<process>
  <step name="gather_inputs">
    Collect:
    - User stories (from write-stories output)
    - User flow documentation (from document-flow output)
    - Figma analysis (from analyze-design output)
    - PO context and constraints (from SPECS.md)
  </step>

  <step name="analyze_by_category">
    Systematic analysis across 5 categories:

    **Category A: Data Edge Cases**
    - Empty/null data, maximum length inputs
    - Special characters (unicode, emoji, HTML)
    - Negative numbers, zero values
    - Date boundaries (leap year, timezone, DST)

    **Category B: State Edge Cases**
    - First-time user (no history), returning user (stale data)
    - Concurrent users (race conditions)
    - Session expired mid-action, offline → online transition

    **Category C: UI Edge Cases**
    - Long text overflow, missing images/avatars
    - Slow network (loading states), screen size extremes
    - Right-to-left languages (if applicable)

    **Category D: Business Logic Edge Cases**
    - Permission boundaries (can vs cannot)
    - Subscription tier limits, feature flag combinations
    - Cross-feature interactions

    **Category E: Error Edge Cases**
    - Network timeout, server 500 errors
    - Partial data save (mid-submission failure)
    - Duplicate submissions (double-click)
    - Invalid state transitions
  </step>

  <step name="priority_assessment">
    For each edge case:
    - **Impact:** What happens if not handled? (data loss, bad UX, security risk)
    - **Likelihood:** How often will this occur? (rare, occasional, frequent)
    - **Priority:** Critical / Important / Nice-to-have
  </step>

  <step name="integrate_into_stories">
    - Add critical edge cases as AC in relevant stories
    - Create separate stories for complex edge case handling
    - Flag edge cases that need PO decision
  </step>
</process>

<edge_cases>

**Khi phát hiện nhiều stories cùng tác động tới shared resource (API endpoint, DB table, component):** Thêm edge case category "Cross-Story Dependency Conflicts" vào analysis. Cho mỗi shared resource: liệt kê stories affected, potential race conditions, và suggest coordination approach. Flag trong report để Techlead biết khi break tasks cho FE/BE.

</edge_cases>

<success_criteria>
- [ ] All 5 categories analyzed
- [ ] Each edge case has impact + likelihood assessment
- [ ] Critical edge cases integrated into story AC
- [ ] PO-decision edge cases flagged separately
- [ ] No "simple feature" shortcuts taken
</success_criteria>
