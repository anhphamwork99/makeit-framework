# Phase Context: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev FE
**Date:** [YYYY-MM-DD]
**Discussed with:** [User/Techlead/Designer]

---

## Phase Boundary

<!-- What is IN scope and OUT of scope for this phase -->

**In scope:**
- [Component or feature 1 — specific]
- [Component or feature 2 — specific]

**Out of scope (deferred):**
- [Item deferred to future phase — reason]
- [Item explicitly excluded — reason]

## Implementation Decisions

<!-- Key decisions made during discuss-phase that constrain planning -->

### Component Architecture
- [Atomic design or feature-based component structure?]
- [Component granularity — where to split components?]
- [Shared vs feature-specific components?]
- [Component naming convention — PascalCase folders, index exports?]

### Responsive Strategy
- [Mobile-first or desktop-first?]
- [Breakpoint behavior — stack, hide, reflow?]
- [Container queries or media queries?]
- [Responsive image strategy — srcset, picture, CSS?]

### State Management
- [Local state (useState) vs context vs global store?]
- [Server state management — React Query, SWR, or manual?]
- [Form state — controlled, uncontrolled, form library?]
- [Loading/error state pattern — per-component or global?]

### Styling Approach
- [CSS Modules, Tailwind, styled-components, or vanilla CSS?]
- [Design token consumption — CSS variables, theme object, or utility classes?]
- [Theming approach — CSS custom properties, theme provider?]
- [Naming convention — BEM, camelCase, or framework-specific?]

### Animation & Interaction
- [Animation approach — CSS transitions, Framer Motion, or none?]
- [Performance budget for animations — only essential or rich?]
- [Interaction states priority — which states to implement first?]
- [Micro-interactions — hover effects, transitions, loading indicators?]

### Accessibility
- [ARIA patterns — which components need custom ARIA?]
- [Keyboard navigation — tab order, focus management approach?]
- [Screen reader support — level of support?]
- [Color contrast — WCAG AA or AAA?]

### Design Token Mapping
- [How to map Figma tokens to code — CSS variables, JS theme, or both?]
- [Token naming convention — match Figma or adapt?]
- [Token scope — colors only, or spacing/typography/shadows too?]
- [Token update strategy — manual or automated sync?]

## Agent's Discretion

<!-- Areas where the agent can make decisions without asking -->

- [Area 1 — e.g., "Component file structure — follow existing project convention"]
- [Area 2 — e.g., "CSS class naming — match existing codebase pattern"]
- [Area 3 — e.g., "TypeScript interfaces — agent defines based on Figma props"]

## Specific Ideas

<!-- Concrete ideas from the discussion that should be incorporated -->

- [Idea 1 — specific implementation suggestion from user]
- [Idea 2 — specific approach agreed upon]

## Deferred Ideas

<!-- Good ideas that don't belong in this phase — saved for future -->

| Idea | Reason Deferred | Future Phase |
|------|----------------|--------------|
| [Idea description] | [Out of current scope] | [Phase or "backlog"] |
| [Idea description] | [Dependency not ready] | [Phase or "backlog"] |

---

## Instructions

**How to fill this template:**

1. **Phase Boundary:** Clearly state what's in and out of scope — prevents scope creep during implementation
2. **Implementation Decisions:** Capture decisions per FE-specific area (components, responsive, state, styling, animation, a11y, tokens)
3. **Agent's Discretion:** List areas where agent can decide freely — reduces unnecessary user questions
4. **Specific Ideas:** Record concrete suggestions from the discussion session
5. **Deferred Ideas:** Track good ideas that don't fit this phase — use table with future phase reference

**Rule:** Max 3-5 questions at a time, then check with user. Include "You decide" option when agent discretion is reasonable. Component architecture decisions MUST be locked before plan-phase.

**FE-specific gray areas to always consider:**
- Component hierarchy (flat vs nested, container vs presentational)
- Responsive behavior per breakpoint (layout shifts, content changes)
- Design token consumption method (how Figma tokens become code)
- Interaction state coverage (which of the 7 states are needed)
- Accessibility requirements (WCAG level, screen reader testing)

---

## Filled Example

```markdown
# Phase Context: Phase 02 — Component Implementation

**Sprint:** SPRINT-003
**Phase:** 02 — Component Implementation
**Role:** Dev FE
**Date:** 2026-02-15
**Discussed with:** Techlead (Minh)

---

## Phase Boundary

**In scope:**
- Login form component with validation
- Registration form component with password strength
- Shared input and button components

**Out of scope (deferred):**
- Password recovery flow — separate story, next sprint
- Social OAuth login buttons — out of MVP scope

## Implementation Decisions

### Component Architecture
- Feature-based structure: src/features/auth/components/
- Shared UI components in src/components/ui/
- Each component: ComponentName/index.tsx + ComponentName.module.css

### Responsive Strategy
- Mobile-first — base styles for mobile, media queries for desktop
- Stack form fields on mobile, side-by-side labels on desktop
- No container queries needed — standard media queries sufficient

### State Management
- React Hook Form for form state — existing project convention
- Zod for validation — type-safe, composable
- Loading state managed per-form with useState

### Styling Approach
- CSS Modules — existing project pattern
- Design tokens as CSS custom properties in :root
- BEM naming within modules for clarity

### Animation & Interaction
- CSS transitions only — no animation library needed
- Focus: form validation feedback (shake on error, green on success)
- Standard hover/focus states on buttons and inputs

## Agent's Discretion

- Component file structure: follow existing src/features/ convention
- TypeScript interfaces: derive from Figma component props
- Error message placement: below field, red text — standard pattern

## Deferred Ideas

| Idea | Reason Deferred | Future Phase |
|------|----------------|--------------|
| Skeleton loading states | Polish scope, not MVP | Phase 04 |
| Storybook stories | Documentation, not feature | Backlog |
```
