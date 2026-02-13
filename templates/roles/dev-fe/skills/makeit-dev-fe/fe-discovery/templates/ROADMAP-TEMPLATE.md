# Sprint Roadmap: SPRINT-{NNN}

**Sprint:** SPRINT-{NNN}
**Role:** Dev FE
**Sprint Goal:** [From SPECS.md — business outcome this sprint delivers]
**Created:** [YYYY-MM-DD]
**Last Updated:** [YYYY-MM-DD]

---

## Phases

<!-- Each phase = one logical chunk of work. Phases execute sequentially. -->

| # | Phase Name | Deliverable Type | Status | Plan |
|---|-----------|-----------------|--------|------|
| 01 | [Phase name — action-oriented] | [Deliverable type] | [⬚ Not Started / 🔄 In Progress / ✅ Complete] | [PLAN.md link or "Not planned"] |
| 02 | [Phase name] | [Deliverable type] | [Status] | [Link] |
| 03 | [Phase name] | [Deliverable type] | [Status] | [Link] |

## FE Deliverable Types

<!-- Reference for filling the "Deliverable Type" column -->

| Type | Description | Example Files |
|------|-------------|---------------|
| **Design Extraction** | Extract tokens, component specs, layout grids from Figma | Token map, component spec sheets |
| **Component Implementation** | Build React components with all interaction states | `*.tsx`, `*.module.css`, `*.types.ts` |
| **UI Comparison** | Compare implementation against Figma designs | UI-COMPARISON.md |
| **Page/Layout** | Assemble components into pages with routing and layout | Page components, layout wrappers |
| **Integration** | Connect components to APIs, add real data flow | API hooks, data transformers |
| **Responsive Polish** | Verify and fix responsive behavior across breakpoints | CSS adjustments, layout fixes |
| **Accessibility** | Add ARIA, keyboard nav, screen reader support | ARIA attrs, focus management |
| **Self-Review** | FE quality gate verification — Gate 4 | VERIFICATION-REPORT.md |

## Phase Examples

<!-- Typical FE sprint phase progression -->

```
Phase 01 — Design Extraction
  └── Extract tokens, map to CSS variables, document component specs

Phase 02 — Core Components
  └── Implement shared UI components (Button, Input, Card, etc.)

Phase 03 — Feature Components
  └── Build feature-specific components (LoginForm, ProductCard, etc.)

Phase 04 — Pages & Layout
  └── Wire components into pages, add routing, implement layouts

Phase 05 — API Integration
  └── Connect to backend APIs, add loading/error states

Phase 06 — Responsive & Polish
  └── Verify breakpoints, fix layout issues, add animations

Phase 07 — UI Comparison & Self-Review
  └── Compare against Figma, run quality checks, fix discrepancies
```

## Dependencies

<!-- External dependencies that affect phase ordering -->

| Phase | Depends On | Type | Status |
|-------|-----------|------|--------|
| [Phase #] | [Dependency description — e.g., "BE API for auth endpoints"] | [Backend / Design / Cross-team] | [Available / In Progress / Blocked] |

## Notes

- [Phase ordering rationale — why this sequence?]
- [Known risks or constraints affecting the roadmap]

---

## Instructions

**How to fill this template:**

1. **Phases:** List 3-7 phases in execution order — each phase is one planned-then-executed chunk
2. **Deliverable Type:** Use FE deliverable types from reference table above
3. **Status:** Update as phases progress — ⬚ / 🔄 / ✅
4. **Dependencies:** Map external dependencies that affect ordering (BE APIs, design readiness)
5. **Notes:** Document why phases are ordered this way

**FE-specific roadmap rules:**
- Design extraction FIRST — always extract tokens/specs before implementing components
- Components before pages — build shared components, then assemble into pages
- API integration after components — use mock data during component development
- UI comparison LAST — compare after all implementation is complete
- Responsive verification can be separate phase or integrated per component

---

## Filled Example

```markdown
# Sprint Roadmap: SPRINT-003

**Sprint:** SPRINT-003
**Role:** Dev FE
**Sprint Goal:** Deliver authentication UI matching Figma designs with full interaction states
**Created:** 2026-02-15
**Last Updated:** 2026-02-15

---

## Phases

| # | Phase Name | Deliverable Type | Status | Plan |
|---|-----------|-----------------|--------|------|
| 01 | Design Extraction | Design Extraction | ✅ Complete | phases/01-design-extraction/PLAN.md |
| 02 | Auth Components | Component Implementation | 🔄 In Progress | phases/02-auth-components/PLAN.md |
| 03 | Auth Pages | Page/Layout | ⬚ Not Started | Not planned |
| 04 | API Integration | Integration | ⬚ Not Started | Not planned |
| 05 | UI Comparison | UI Comparison | ⬚ Not Started | Not planned |

## Dependencies

| Phase | Depends On | Type | Status |
|-------|-----------|------|--------|
| 04 | BE auth API endpoints (login, register) | Backend | In Progress |
| 01 | Figma auth screens marked "Ready for Dev" | Design | Available |
```
