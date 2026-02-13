---
name: discover-fe-context
description: FE context discovery — scan components, design tokens, CSS approach, state management, routing, and Figma mapping before implementation
---

<purpose>
Gather existing frontend context at the start of a sprint so FE implementation follows established patterns and doesn't duplicate work. Runs during `/makeit:clarify` after gate verification. Output saves to `CODEBASE-SNAPSHOT.md` in the sprint workspace.
</purpose>

<when_to_use>
- Automatically during `/makeit:clarify` (discover_context step)
- Manually when FE Dev needs to understand existing component library
- When implementing features that extend existing UI patterns
</when_to_use>

<process>
  <step name="scan_components_inventory">
    Scan for existing UI components:

    1. **Components directory** — List all component files (components/, ui/, shared/)
    2. **Component patterns** — Atomic design? Feature-based? Flat?
    3. **Shared vs feature components** — What's reusable vs page-specific?
    4. **Component complexity** — Simple presentational? Smart containers?
    5. **Props patterns** — TypeScript interfaces? PropTypes? JSDoc?

    Record component inventory for reuse decisions.
  </step>

  <step name="scan_design_tokens">
    Check for design token / theme setup:

    1. **Theme files** — theme.ts, tokens.ts, variables.css
    2. **Color system** — CSS custom properties? JS constants? Design tokens?
    3. **Typography** — Font families, sizes, weights defined
    4. **Spacing** — Spacing scale (4px, 8px, 16px...)
    5. **Breakpoints** — Responsive breakpoint definitions

    > Cross-reference with Figma design tokens if available via Figma MCP.
  </step>

  <step name="identify_css_approach">
    Determine styling approach:

    1. **CSS strategy** — Vanilla CSS? CSS Modules? Tailwind? Styled-components?
    2. **Naming convention** — BEM? Utility-first? Component-scoped?
    3. **Global vs scoped** — Global styles location, reset/normalize
    4. **Animation patterns** — CSS transitions? Framer Motion? GSAP?

    New components should follow the established approach.
  </step>

  <step name="check_state_management">
    Identify state management pattern:

    1. **State library** — Zustand? Redux? Jotai? React Context only?
    2. **Store structure** — Single store? Multiple stores? Slices?
    3. **Async data** — TanStack Query? SWR? Manual fetch?
    4. **Form state** — React Hook Form? Formik? Controlled inputs?

    Record patterns for consistency.
  </step>

  <step name="check_routing_setup">
    Review routing configuration:

    1. **Router** — React Router? TanStack Router? Next.js pages/app?
    2. **Route structure** — File-based? Centralized config?
    3. **Layout patterns** — Nested layouts? Shared headers/sidebars?
    4. **Protected routes** — Auth-guarded routes pattern?
    5. **Navigation** — How navigation is handled (Link, navigate, etc.)
  </step>

  <step name="map_folder_conventions">
    Document FE-specific folder structure:

    1. **Directory tree** — src/ structure overview
    2. **Naming conventions** — File naming, export patterns
    3. **Index files** — barrel exports? direct imports?
    4. **Test file location** — co-located? __tests__/? *.test.tsx?
    5. **Asset management** — images, icons, fonts location
  </step>

  <step name="check_figma_mapping">
    Check existing Figma ↔ code mapping:

    1. **Design tokens sync** — Any automated token sync?
    2. **Component naming alignment** — Figma names match code names?
    3. **Figma MCP usage** — Previously used for extraction?
    4. **Screenshot comparison** — Any visual regression tooling?

    > This helps the `compare-ui` workflow during verification.
  </step>

  <step name="save_to_snapshot">
    Save all findings to `CODEBASE-SNAPSHOT.md` in sprint workspace:
    - Fill "Project Structure" with FE directory tree
    - Fill "Tech Stack" table
    - Fill "Conventions Found" with FE-specific patterns
    - Fill "Key Files" (entry point, routes, theme, store)
    - Fill "Existing Patterns" → State Management section
    - Fill "Notes for This Sprint" with FE-relevant observations

    Path: `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`

    > Copy template from `@fe-discovery/templates/CODEBASE-SNAPSHOT.md`
  </step>
</process>

<edge_cases>

**Khi Figma component names không khớp với code component names:** Trong bước check_figma_mapping, nếu phát hiện naming mismatch (ví dụ: Figma gọi "Card/Product" nhưng code dùng "ProductListItem") → tạo mapping table trong CODEBASE-SNAPSHOT.md: "Figma Name → Code Name" để tham chiếu khi implement. Cảnh báo trong summary: "Component naming alignment cần attention — xem mapping table."

</edge_cases>

<output>
- `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md` — filled with FE context
- Summary of key findings presented to user
</output>

<success_criteria>
- [ ] Component inventory documented
- [ ] Design tokens / theme setup identified
- [ ] CSS/styling approach determined
- [ ] State management pattern identified
- [ ] Routing setup documented
- [ ] Folder conventions mapped
- [ ] Figma ↔ code mapping checked
- [ ] CODEBASE-SNAPSHOT.md saved in sprint workspace
</success_criteria>
