---
name: ba-workflow-write-stories
description: Transform PO goals, design analysis, and user flow documentation into actionable user stories with acceptance criteria
---

<purpose>
Transform PO goals, design analysis, and user flow documentation into actionable user stories with acceptance criteria — BA's core deliverable that becomes the source of truth for Dev implementation.
</purpose>

<required_reading>
@ba-execution/templates/user-story.md
@ba-execution/workflows/analyze-design.md
@ba-execution/workflows/document-flow.md
</required_reading>

<rules>
1. Every story must trace to a PO goal — no orphan stories
2. Minimum 3 checkable, specific acceptance criteria per story
3. Always attach specific Figma frame link to each story
4. Follow vertical slice principle — each story delivers user value
5. Never write vague AC like "works correctly" — be specific
6. AC < 3 items is never acceptable
</rules>

<output>
User stories → `.makeit/sprint/SPRINT-*/deliverables/US-NNN-{feature}.md`
Template: `@ba-execution/templates/user-story.md`
</output>

<process>
  <step name="gather_inputs">
    Three input sources required:
    - **PO Goal + Context:** Business value, target users, success metrics (from SPECS.md)
    - **Figma Analysis:** Components, states, data requirements (from analyze-design output)
    - **User Flow:** If documented, use as story decomposition guide
  </step>

  <step name="decompose_into_stories">
    One story per meaningful user interaction.
    Follow vertical slice principle — each story delivers user value.
    Group by user flow or feature area.
  </step>

  <step name="write_stories">
    Format each story:
    ```
    As a [role/persona],
    I want [action/feature],
    So that [benefit/value].
    ```
  </step>

  <step name="define_acceptance_criteria">
    Minimum 3 checkable, specific items per story.
    Cover: happy path, validation, edge case.
    Use Given/When/Then or checklist format.
    Reference Figma screens for visual criteria.
  </step>

  <step name="attach_context">
    For each story:
    - Figma design link (specific frame)
    - PO Goal reference (Lark ID or goal summary)
    - Edge cases (from design analysis or identify-edges output)
    - Dependencies (APIs, components, data sources)
  </step>

  <step name="cross_reference">
    Verify all PO goals covered by at least one story.
    Check for gaps between design screens and stories.
    Ensure story set is complete (no orphan screens).
  </step>
</process>

<edge_cases>

**Khi stories không align với PO goals trong quá trình viết:** Tại bước `cross_reference`, nếu phát hiện story không trace được về PO goal → xóa hoặc merge story đó. Nếu PO goal không có story nào cover → tạo story bổ sung. Kiểm tra TRƯỚC khi submit, không để đến verification mới phát hiện.

**Khi story bị trả về với feedback từ Techlead/Dev:** Đọc feedback cụ thể. Phân loại: (a) AC thiếu rõ ràng → sửa AC, (b) scope sai → re-check với PO goal, (c) technical infeasible → discuss với Techlead qua `/makeit:decide`. Mỗi story chỉ sửa 1 lần — lần thứ 2 cần align meeting.

**Khi AI generate AC vague/boilerplate đạt count nhưng thiếu substance:** Tự kiểm tra mỗi AC: "Dev có thể test AC này bằng 1 action cụ thể không?" Nếu AC chứa "works correctly", "displays properly", "handles well" → rewrite với expected behavior cụ thể, điều kiện rõ ràng, và expected result đo lường được.

**Khi nhiều stories share cùng dependencies (API, component, data source):** Ghi nhận dependency overlap trong mỗi story affected. Tạo warning section trong handoff: "⚠️ Stories US-{X} và US-{Y} share dependency trên {resource} — Techlead cần coordinate FE↔BE để tránh conflict." Đây là input quan trọng cho Techlead khi break tasks.

**Khi số lượng stories vượt quá scope planned:** Nếu decomposition tạo ra > số stories dự kiến trong PLAN.md → dừng lại, assess: stories nào là core (must-have), stories nào là nice-to-have. Báo user: "Story count ({N}) vượt planned scope ({M}). Suggest: defer {list nice-to-have stories} sang sprint sau."

</edge_cases>

<success_criteria>
- [ ] All PO goals covered by at least one story
- [ ] Each story has ≥3 checkable AC
- [ ] Figma links attached to all stories
- [ ] Stories follow correct format
- [ ] No gaps between design screens and stories
- [ ] Dependencies listed per story
</success_criteria>
