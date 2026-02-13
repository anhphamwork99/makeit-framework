# Phase Research: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev FE
**Date:** [YYYY-MM-DD]
**Researcher:** [Sub-agent / Manual]

---

## Design Context

<!-- Figma analysis — components, hierarchy, states, tokens via MCP -->

### Component Hierarchy

<!-- Map Figma frames to React component structure -->

| Figma Frame | Proposed Component | Props/Variants | States |
|-------------|-------------------|----------------|--------|
| [Frame name] | [ComponentName] | [key props] | [default, hover, active, disabled, error, loading] |
| [Frame name] | [ComponentName] | [key props] | [states covered in design] |

### Design Tokens

<!-- Tokens extracted from Figma via MCP or manual inspection -->

| Category | Token Name | Value | CSS Variable |
|----------|-----------|-------|-------------|
| Color | [primary] | [#hex] | [--color-primary] |
| Spacing | [gap-md] | [16px] | [--spacing-md] |
| Typography | [heading-lg] | [24px/600] | [--font-heading-lg] |
| Border Radius | [radius-md] | [8px] | [--radius-md] |

### Interaction States

<!-- Which states are designed in Figma, which are missing -->

| Component | Default | Hover | Active | Disabled | Error | Empty | Loading |
|-----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| [Component] | ✅ | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] | [✅/❌] |

## Library Evaluation

<!-- Comparison of component/utility libraries for this feature -->

| Criteria | [Library A] | [Library B] | [Library C] |
|----------|-------------|-------------|-------------|
| Bundle size | [KB] | [KB] | [KB] |
| TypeScript support | [Native/Partial/None] | [Native/Partial/None] | [Native/Partial/None] |
| SSR/SSG compatible | [Yes/No] | [Yes/No] | [Yes/No] |
| Customization | [Easy/Moderate/Hard] | [Easy/Moderate/Hard] | [Easy/Moderate/Hard] |
| Existing codebase fit | [Good/Poor] | [Good/Poor] | [Good/Poor] |
| Community (stars) | [N] | [N] | [N] |

### Recommendation
- **Use:** [Library] because [reason — specific to project context]

## Implementation Patterns

<!-- Patterns from existing codebase or industry best practices -->

### Similar Components in Codebase
- [Component 1 — path, pattern used, can reuse?]
- [Component 2 — path, pattern used, can adapt?]

### Responsive Patterns
- [Pattern — e.g., "Stack on mobile, grid on desktop"]
- [Breakpoint behavior — existing responsive patterns in project]
- [CSS approach — media queries, container queries, or clamp()]

### Accessibility Patterns
- [ARIA pattern needed — e.g., "dialog", "combobox", "tabs"]
- [Keyboard navigation — required key interactions]
- [Focus management — where focus should move on state changes]

## Performance Considerations

<!-- Bundle size, rendering, and optimization analysis -->

### Bundle Size Impact
| Addition | Estimated Size | Justification |
|----------|---------------|---------------|
| [Library/component] | [KB gzipped] | [Why needed] |
| [Component code] | [KB gzipped] | [Estimated size] |

### Rendering Concerns
- [Re-render triggers — props, state, context changes]
- [Memoization opportunities — useMemo, React.memo]
- [Lazy loading candidates — below-fold components, modals]

### Image & Asset Optimization
- [Image format — WebP, AVIF, SVG for icons]
- [Loading strategy — lazy, eager, priority]
- [Responsive images — srcset / sizes approach]

## Dependencies

<!-- API readiness, shared components, design token availability -->

| Dependency | Type | Status | Risk |
|-----------|------|--------|------|
| [API endpoint] | Backend | [Available/In progress/Unknown] | [Low/Med/High] |
| [Shared component] | Cross-team | [Available/In progress/Unknown] | [Low/Med/High] |
| [Design tokens] | Design | [Extracted/Partial/Pending] | [Low/Med/High] |

## Recommendations

<!-- Prescriptive — "Use X" not "Consider X or Y" -->

1. **[Area]:** Use [specific approach] because [reason]
2. **[Area]:** Use [specific approach] because [reason]
3. **[Area]:** Use [specific approach] because [reason]

---

## Instructions

**How to fill this template:**

1. **Design Context:** Extract from Figma via MCP — component hierarchy, tokens, interaction states
2. **Library Evaluation:** Compare libraries with 6+ criteria relevant to the FE context
3. **Implementation Patterns:** Find similar components in codebase, document responsive/a11y patterns
4. **Performance:** Assess bundle size impact, rendering concerns, lazy loading opportunities
5. **Dependencies:** Map API readiness, shared components, and design token availability
6. **Recommendations:** Always prescriptive ("Use X" not "Consider X or Y") — planner will follow these

**Rule:** Research is optional but recommended for complex UI with unfamiliar component patterns, animation requirements, or third-party library evaluation.

---

## Filled Example

```markdown
# Phase Research: Phase 02 — Auth Components

**Sprint:** SPRINT-003
**Phase:** 02 — Auth Components
**Role:** Dev FE
**Date:** 2026-02-15
**Researcher:** FE Sub-agent

---

## Design Context

### Component Hierarchy

| Figma Frame | Proposed Component | Props/Variants | States |
|-------------|-------------------|----------------|--------|
| Login Form | LoginForm | onSubmit, loading | default, focus, error, loading, disabled |
| Input Field | TextInput | label, error, type | default, focus, error, disabled |

### Design Tokens

| Category | Token Name | Value | CSS Variable |
|----------|-----------|-------|-------------|
| Color | brand-primary | #1A73E8 | --color-primary |
| Color | error-red | #D93025 | --color-error |
| Spacing | input-gap | 16px | --spacing-md |

## Library Evaluation

| Criteria | React Hook Form | Formik | Native |
|----------|----------------|--------|--------|
| Bundle size | 9KB | 44KB | 0KB |
| TypeScript | Native | Good | N/A |
| Re-renders | Minimal | Per-field | Manual |
| Codebase fit | Good (already installed) | Not used | Always works |

### Recommendation
- **Use:** React Hook Form — already installed, minimal re-renders, native TypeScript

## Recommendations

1. **Form library:** Use React Hook Form — already in project, proven pattern
2. **Validation:** Use Zod with RHF resolver — type-safe, composable schemas
3. **Styling:** Use CSS Modules — matches existing project convention
```
