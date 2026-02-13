# Phase Plan: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** BA
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

## Tasks

<!-- Max 3 tasks. Each task = one deliverable, one workflow, one verification. -->

| # | Task | Workflow | Spawn | Files |
|---|------|----------|-------|-------|
| 1 | [Task name — action-oriented, e.g., "Analyze login screens"] | [BA workflow, e.g., analyze-design] | [Inline/Spawn — from spawn decision matrix] | [Output file path] |
| 2 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |
| 3 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |

### Task Details

**Task 1: [Task name]**
- **Files:** [Output file path(s)]
- **Workflow:** [Internal BA workflow reference]
- **Action:** [Specific action description — what the agent does]
- **Verify:** [How to verify this task is done correctly]
- **Done:** [Criteria for task completion]

**Task 2: [Task name]**
- **Files:** [Output file path(s)]
- **Workflow:** [Internal BA workflow reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

**Task 3: [Task name]**
- **Files:** [Output file path(s)]
- **Workflow:** [Internal BA workflow reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | [Design analysis / Story writing / Flow doc / Edge cases] | [Inline / Spawn] | [≤3 screens → inline / >3 screens → spawn] |
| 2 | [Type] | [Decision] | [Reason based on spawn decision matrix] |
| 3 | [Type] | [Decision] | [Reason] |

## Verification

<!-- Maps back to SPECS.md success criteria -->

- [ ] [SC reference] — [Verification check, specific and checkable]
- [ ] [SC reference] — [Verification check]
- [ ] [SC reference] — [Verification check]

---

## Instructions

**How to fill this template:**

1. **Objective:** Copy phase goal verbatim from ROADMAP.md
2. **Context:** Reference SPECS.md success criteria IDs and CONTEXT.md decisions
3. **Tasks:** Max 3 tasks — each maps to one BA workflow (analyze-design, write-stories, document-flow, identify-edges)
4. **Spawn Decisions:** Use the BA spawn decision matrix from stage-plan-phase.md
5. **Verification:** Each check must trace to a SPECS.md success criterion

**BA task type reference:**
- Analyze design → produces Figma analysis report
- Write stories → produces user stories with AC
- Document flows → produces user flow documentation
- Identify edges → produces edge case analysis
- Self-review → produces Gate 2 verification

---

## Filled Example

```markdown
# Phase Plan: Phase 02 — Story Creation

**Sprint:** SPRINT-003
**Phase:** 02 — Story Creation
**Role:** BA
**Date:** 2026-02-15
**Complexity:** M

---

## Objective

Write user stories with acceptance criteria for login and registration features based on Phase 1 Figma analysis.

## Context

- **Sprint Goal:** Deliver user stories for authentication feature set
- **Phase Dependencies:** Phase 01 — Design Analysis (Figma analysis complete)
- **SPECS Reference:** SC2 (all stories have ≥3 AC), SC3 (flows documented)
- **CONTEXT.md:** Decided atomic stories per screen, not epic-level

## Tasks

| # | Task | Workflow | Spawn | Files |
|---|------|----------|-------|-------|
| 1 | Write login stories | write-stories | Inline | deliverables/US-001-login.md, US-002-signup.md |
| 2 | Document auth flow | document-flow | Inline | deliverables/FLOW-authentication.md |
| 3 | Identify auth edge cases | identify-edges | Inline | Integrated into story AC |

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | Story writing | Inline | 2 stories (≤3 threshold) |
| 2 | Flow doc | Inline | Single flow |
| 3 | Edge cases | Inline | Few obvious cases from Figma analysis |

## Verification

- [ ] SC2 — All user stories have ≥3 checkable acceptance criteria
- [ ] SC3 — Auth flow documented with happy + alternative paths
- [ ] SC4 — Edge cases identified and integrated into story AC
```
