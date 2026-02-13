# Phase Plan: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Dev FE
**Date:** [YYYY-MM-DD]
**Complexity:** [S/M/L/XL — from assess_complexity step]

---

## Objective

[Phase goal from ROADMAP.md — 1-2 sentences describing what this phase delivers]

## Context

- **Sprint Goal:** [From SPECS.md — business outcome]
- **Phase Dependencies:** [Prior phases this builds on, or "None"]
- **SPECS Reference:** [Relevant success criteria IDs, e.g., SC1, SC3]
- **CONTEXT.md:** [Key decisions from discuss-phase, or "N/A — no discuss-phase"]
- **RESEARCH.md:** [Key research findings, or "N/A — no research-phase"]
- **Figma:** [Figma link(s) for this phase's screens/components]
- **Design Tokens:** [Token availability — extracted / pending / partial]

## Tasks

<!-- Max 3 tasks. Each task = one component/feature, one workflow, one verification. -->

| # | Task | Internal Workflow | Spawn | Files |
|---|------|-------------------|-------|-------|
| 1 | [Task name — action-oriented, e.g., "Implement login form component"] | [FE workflow, e.g., implement] | [Inline/Spawn — from spawn decision matrix] | [Output file path] |
| 2 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |
| 3 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |

### Task Details

**Task 1: [Task name]**
- **Files:** [Output file path(s) — component files, styles, types]
- **Internal Workflow:** [implement / compare-ui / self-review]
- **Figma Screen:** [Specific Figma frame/component reference]
- **Action:** [Specific action description — what the agent does]
- **Verify:** [How to verify this task is done correctly]
- **Done:** [Criteria for task completion]

**Task 2: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [FE workflow reference]
- **Figma Screen:** [Figma reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

**Task 3: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [FE workflow reference]
- **Figma Screen:** [Figma reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | [Figma extraction / Component impl / UI comparison / Integration] | [Inline / Spawn] | [≤2 components → inline / >2 → spawn] |
| 2 | [Type] | [Decision] | [Reason based on spawn decision matrix] |
| 3 | [Type] | [Decision] | [Reason] |

## Complexity Assessment

| Dimension | Value | Level |
|-----------|-------|-------|
| Components | [N — count] | [S/M/L/XL] |
| Interaction states | [N — states per component] | [S/M/L/XL] |
| Responsive | [Description — same/minor/different/complex] | [S/M/L/XL] |
| API integration | [N — endpoints] | [S/M/L/XL] |
| Design fidelity | [Description — standard/custom/pixel-perfect] | [S/M/L/XL] |
| **Overall** | | [S/M/L/XL] |

## Verification

<!-- Maps back to SPECS.md success criteria -->

- [ ] [SC reference] — [Verification check, specific and checkable]
- [ ] [SC reference] — [Verification check]
- [ ] [SC reference] — [Verification check]

---

## Instructions

**How to fill this template:**

1. **Objective:** Copy phase goal verbatim from ROADMAP.md
2. **Context:** Reference SPECS.md success criteria IDs, CONTEXT.md decisions, RESEARCH.md findings, and Figma links
3. **Tasks:** Max 3 tasks — each maps to one FE internal workflow (implement, compare-ui, self-review)
4. **Spawn Decisions:** Use the FE spawn decision matrix from stage-plan-phase.md
5. **Complexity Assessment:** Evaluate 5 FE dimensions to determine overall complexity
6. **Verification:** Each check must trace to a SPECS.md success criterion

**FE task type reference:**
- Figma extraction → produces design token mapping + component specs
- Component implementation → produces React components with interaction states
- UI comparison → produces match/mismatch report (compare-ui workflow)
- Integration → produces connected components with API data
- Self-review → produces Gate 4 verification

**FE spawn decision matrix:**
- ≤3 screens → Inline Figma extraction
- ≤2 components → Inline implementation
- >2 components OR complex states OR multiple breakpoints → Spawn executor

---

## Filled Example

```markdown
# Phase Plan: Phase 02 — Component Implementation

**Sprint:** SPRINT-003
**Phase:** 02 — Component Implementation
**Role:** Dev FE
**Date:** 2026-02-15
**Complexity:** M

---

## Objective

Implement login and registration form components from Figma designs with all interaction states and responsive behavior.

## Context

- **Sprint Goal:** Deliver authentication UI matching Figma designs
- **Phase Dependencies:** Phase 01 — Design Extraction (token mapping complete)
- **SPECS Reference:** SC1 (UI matches Figma), SC2 (all states), SC3 (responsive)
- **CONTEXT.md:** CSS Modules chosen, mobile-first responsive strategy
- **RESEARCH.md:** N/A — no research-phase
- **Figma:** https://figma.com/file/abc123/Auth-Screens
- **Design Tokens:** Extracted — mapped to CSS variables

## Tasks

| # | Task | Internal Workflow | Spawn | Files |
|---|------|-------------------|-------|-------|
| 1 | Implement login form component | implement | Inline | src/components/auth/LoginForm.tsx, LoginForm.module.css |
| 2 | Implement registration form component | implement | Inline | src/components/auth/RegisterForm.tsx, RegisterForm.module.css |
| 3 | Compare UI against Figma | compare-ui | Inline | .makeit/sprint/.../COMPARISON-auth.md |

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | Component implementation | Inline | Single component with standard states |
| 2 | Component implementation | Inline | Single component, similar pattern to Task 1 |
| 3 | UI comparison | Inline | 2 screens only |

## Complexity Assessment

| Dimension | Value | Level |
|-----------|-------|-------|
| Components | 2 | M |
| Interaction states | 5 (default, focus, error, loading, disabled) | M |
| Responsive | Minor adjustments (stack on mobile) | S |
| API integration | 0 (Phase 3) | S |
| Design fidelity | Custom design | M |
| **Overall** | | **M** |

## Verification

- [ ] SC1 — Login and register forms visually match Figma at desktop breakpoint
- [ ] SC2 — All 5 interaction states implemented and visible
- [ ] SC3 — Forms stack correctly on mobile breakpoint
```
