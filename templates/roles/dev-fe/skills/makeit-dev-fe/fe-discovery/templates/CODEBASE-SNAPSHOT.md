# Codebase Snapshot: SPRINT-{NNN}

**Sprint:** SPRINT-{NNN}
**Role:** Dev FE
**Generated:** [YYYY-MM-DD]
**Purpose:** Context for phase planning and research — what the codebase looks like before sprint starts

---

## Project Overview

- **Project:** [Project name]
- **Framework:** [React / Next.js / Vue / Svelte / etc.]
- **Language:** [TypeScript / JavaScript]
- **Build Tool:** [Vite / Webpack / Turbopack / etc.]
- **Styling:** [CSS Modules / Tailwind / Styled Components / etc.]
- **State Management:** [Context / Redux / Zustand / React Query / etc.]
- **Package Manager:** [npm / yarn / pnpm]

## FE Architecture Overview

<!-- High-level FE architecture relevant to this sprint -->

### Component Library

| Category | Components | Pattern | Notes |
|----------|-----------|---------|-------|
| UI Primitives | [Button, Input, Card, ...] | [Atomic design / Feature-based] | [Shared across features] |
| Layout | [Header, Sidebar, Footer, ...] | [Layout components] | [App shell] |
| Feature-specific | [LoginForm, ProductCard, ...] | [Feature folders] | [Scoped to feature] |

### Routing

- **Router:** [React Router / Next.js App Router / etc.]
- **Route Structure:** [file-based / config-based]
- **Key Routes:** [List key routes relevant to sprint]

### Design Token System

| Status | Description |
|--------|-----------|
| Token file | [Path — e.g., `src/styles/tokens.css` / "Not set up yet"] |
| Token format | [CSS variables / JS theme / Tailwind config] |
| Token coverage | [Colors / Spacing / Typography / Shadows — which are defined?] |
| Figma sync | [Manual / Automated / Not synced] |

## Existing Patterns

<!-- Patterns already established in the codebase that new code should follow -->

### Component Pattern

```
[Example component structure from existing codebase]
// Location: src/components/ui/Button/index.tsx
// Pattern: named export, CSS Modules, TypeScript interface
```

### Styling Pattern

```
[Example CSS/styling pattern from existing codebase]
// Location: src/components/ui/Button/Button.module.css
// Pattern: BEM within modules, CSS variables for tokens
```

### Hook Pattern

```
[Example custom hook pattern]
// Location: src/hooks/useAuth.ts
// Pattern: return object, error handling, loading state
```

## Dependencies (FE Focus)

<!-- Key FE dependencies and their versions -->

| Package | Version | Purpose | Notes |
|---------|---------|---------|-------|
| [react] | [18.x] | [Core framework] | [—] |
| [react-hook-form] | [7.x] | [Form management] | [Used in all forms] |
| [React Query] | [5.x] | [Server state] | [API data fetching] |
| [framer-motion] | [11.x] | [Animation] | [Optional — used in some components] |

## Backend API Context

<!-- API endpoints relevant to this sprint — for FE integration -->

| Endpoint | Method | Status | Used By |
|----------|--------|--------|---------|
| [/api/auth/login] | [POST] | [Available / In Progress] | [LoginForm] |
| [/api/auth/register] | [POST] | [Status] | [RegisterForm] |

## File Statistics

<!-- Quick overview of codebase size and structure -->

| Metric | Value |
|--------|-------|
| Total components | [N] |
| Total pages | [N] |
| Total hooks | [N] |
| CSS files | [N] |
| TypeScript coverage | [N% or "Full" / "Partial" / "None"] |
| Test coverage | [N% or "None"] |

---

## Instructions

**How to fill this template:**

1. **Project Overview:** Fill from `package.json`, framework config, and project structure
2. **FE Architecture:** Document existing component library, routing, and design token system
3. **Existing Patterns:** Copy 1-2 real examples from codebase — agent should match these patterns
4. **Dependencies:** List FE-relevant packages from `package.json` with purpose
5. **Backend API Context:** List API endpoints this sprint's FE work will integrate with
6. **File Statistics:** Quick metrics for codebase size awareness

**FE-specific snapshot focus:**
- Component patterns are CRITICAL — new components must match existing conventions
- Design token system status determines if extraction phase is needed
- API readiness affects phase ordering (mock data vs real integration)
- This snapshot is optional but recommended for new sprints or unfamiliar codebases

**De-emphasized for FE:**
- Database schema, migration details → BE concern
- Server configuration, deployment → DevOps concern
- Business logic layer → BE concern
