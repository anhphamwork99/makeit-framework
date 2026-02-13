---
name: fe-workflow-implement
description: Internal FE workflow — Figma-to-code implementation with design token extraction, component building, and state handling
---

<purpose>
Transform Figma designs into production-ready React components — extract design specs via MCP, define component interface, implement all interaction states, and ensure design token compliance.
</purpose>

<context>
Internal workflow — called by `stage-execute-phase.md`, NOT a standalone command.
Source of truth: BA user stories → Techlead tasks → Figma designs.
</context>

<rules>
1. Figma MCP first — extract specs before writing any code
2. Design tokens — use CSS variables or theme tokens, never hardcode colors/spacing
3. All interaction states — default, hover, active, disabled, error, empty, loading
4. Component-based — single responsibility, reusable, typed props
5. STOP mechanism active — inherited from execute-phase
6. Responsive — all breakpoints defined in SPECS
</rules>

<process>
  <step name="extract_design_specs">
    Use Figma MCP tools to extract:
    1. Component tree structure (parent/child hierarchy)
    2. Layout properties (auto-layout, spacing, padding)
    3. Design tokens (colors, typography, spacing, border-radius)
    4. Interaction states (from variant properties)
    5. Responsive behavior hints (constraints, resizing)

    Output: Design spec notes for reference during implementation.
  </step>

  <step name="check_api_contract">
    Before implementing API-dependent components:

    1. Check if API contract exists for this feature:
       - From TL handoff (initial contract in task breakdown)
       - From BE notification (refined contract via Telegram)
    2. If contract available:
       - Create mock data matching contract schema exactly (in `src/mocks/`)
       - Implement components with mock data first
       - Note integration sync point in STATE.md: "Waiting for Sync Point 2 (API Ready)"
    3. If no contract yet:
       - Flag dependency: "Waiting for BE API contract"
       - Implement UI-only components first (layout, states, interactions)
       - Skip API-dependent data fetching until contract arrives

    > Coordinate with BE on API contracts — sync point for request/response schema.
  </step>

  <step name="create_implementation_plan">
    Before coding, plan using template `@fe-execution/templates/implementation-plan.md`:
    - Component breakdown (which components to create)
    - Props interface definition
    - State management approach
    - File structure
    - Implementation order (bottom-up: atoms → molecules → organisms)
  </step>

  <step name="define_component_interface">
    Define TypeScript interface for component props:
    - Required vs optional props
    - Event handlers (onClick, onChange, etc.)
    - Children/slot patterns
    - Variant types mapped from Figma
  </step>

  <step name="implement_component">
    Build the component:
    1. Create component file with proper structure
    2. Implement default state first
    3. Add all interaction states (hover, active, disabled, error, empty, loading)
    4. Apply design tokens (not hardcoded values)
    5. Implement responsive behavior
    6. Add accessibility attributes (ARIA, semantic HTML, keyboard nav)
  </step>

  <step name="verify_implementation">
    Quick self-check:
    - [ ] Component renders without errors
    - [ ] All interaction states implemented
    - [ ] Design tokens used (no hardcoded colors/spacing)
    - [ ] Props typed correctly
    - [ ] Responsive on target breakpoints
    - [ ] No console errors/warnings
  </step>
</process>

## ⚠️ STOP — After Approved

When user confirms a destructive operation that was STOP'd:

1. **Log action in STATE.md:**
   ```
   STOP approved: [action description] at [timestamp]
   ```

2. **Note rollback command** (if applicable):
   - `git push --force` → note previous HEAD commit: `git reset --hard <commit>`
   - Delete files → note file paths for recovery: `git checkout HEAD -- <path>`
   - Overwrite existing files → save backup or note git ref

3. **Proceed with operation**

<edge_cases>

**Khi implementation thất bại sau 2 lần thử** (component render lỗi, logic sai, layout broken): Đếm retry count cho mỗi component. Sau 2 lần thất bại → ⚠️ STOP — Component quá phức tạp cho AI. Báo cáo user: đã thử gì, lỗi cụ thể, đề xuất tách nhỏ component hoặc approach khác. Log vào STATE.md.

**Khi Figma component hierarchy không map cleanly sang React components:** Nếu Figma dùng flattened layers nhưng code cần nested components, hoặc Figma variants không map sang React props → tài liệu hóa mapping decisions trong implementation plan. Ưu tiên code maintainability over Figma hierarchy. Ghi rõ: "Figma structure: [X] → Code structure: [Y] — Lý do: [Z]" trong STATE.md.

**Khi responsive breakpoints xung đột với breakpoints hiện có:** Trước khi implement responsive, kiểm tra breakpoint values trong Figma vs CSS breakpoints đã có. Nếu xung đột (ví dụ: Figma dùng 768px nhưng code dùng 840px) → ⚠️ STOP — Breakpoint conflict. Hỏi user dùng breakpoints nào. Nếu mobile layout yêu cầu component structure khác hoàn toàn → ghi nhận vào plan và tách thành task riêng.

**Khi API contract đã thay đổi so với lúc bắt đầu implement:** Trước bước integration, re-check API contract. Nếu BE đã cập nhật response schema → cập nhật mock data và TypeScript interfaces trước khi connect. Log changes vào STATE.md: "API contract updated: [field changes]."

**Khi Figma MCP không kết nối hoặc trả về data thiếu:** Chuyển sang fallback: (1) Yêu cầu user cung cấp screenshot hoặc specs thủ công. (2) Dùng text-based design notes từ task/story. (3) Implement theo best-guess rồi flag cho compare-ui verification sau. Ghi nhận: "MCP unavailable — implemented from [fallback source]" trong STATE.md.

</edge_cases>
