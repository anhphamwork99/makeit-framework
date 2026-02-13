# Phase Plan: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** PO
**Date:** [YYYY-MM-DD]
**Mode:** [Backlog Creation / PR Review]
**Complexity:** [S/M/L/XL — from assess_complexity step]

---

## Objective

[Phase goal from ROADMAP.md — 1-2 sentences describing what this phase delivers]

## Context

- **Sprint Goal:** [From SPECS.md — business outcome]
- **Mode:** [Mode 1 — Backlog Creation (full lifecycle) / Mode 2 — PR Review (streamlined)]
- **Phase Dependencies:** [Prior phases this builds on, or "None"]
- **SPECS Reference:** [Relevant success criteria IDs, e.g., SC1, SC3]

## Tasks

<!-- Max 3 tasks. Each task = one deliverable, one workflow, one verification. -->

| # | Task | Workflow | Spawn | Files |
|---|------|----------|-------|-------|
| 1 | [Task name — action-oriented, e.g., "Draft backlog items for auth feature"] | [PO workflow, e.g., draft-backlog] | [Inline/Spawn — from spawn decision matrix] | [Output file path] |
| 2 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |
| 3 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |

### Task Details

**Task 1: [Task name]**
- **Files:** [Output file path(s)]
- **Workflow:** [Internal PO workflow reference]
- **Action:** [Specific action description — what the agent does]
- **Verify:** [How to verify this task is done correctly]
- **Done:** [Criteria for task completion]

**Task 2: [Task name]**
- **Files:** [Output file path(s)]
- **Workflow:** [Internal PO workflow reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

**Task 3: [Task name]**
- **Files:** [Output file path(s)]
- **Workflow:** [Internal PO workflow reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | [Draft backlog / Refine goal / Prepare sprint / Review PR / Check gate] | [Inline / Spawn] | [Single item → inline / Multiple items → spawn] |
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
2. **Context:** Include mode (Backlog Creation / PR Review), SPECS.md success criteria IDs
3. **Tasks:** Max 3 tasks — each maps to one PO workflow (draft-backlog, refine-goal, prepare-sprint, review-pr, check-gate)
4. **Spawn Decisions:** Use the PO spawn decision matrix from stage-plan-phase.md
5. **Verification:** Each check must trace to a SPECS.md success criterion

**PO task type reference:**
- Draft backlog → produces backlog items with goal, context, AC
- Refine goal → produces improved goal clarity + SMART criteria
- Prepare sprint → produces sprint plan with prioritized items
- Review PR → produces review feedback with business logic check
- Check gate → produces Gate 1/5 verification report
- Manage sprint goal → produces updated/split sprint goals

**Dual-mode awareness:**
- Mode 1 (Backlog Creation): All task types available, full lifecycle
- Mode 2 (PR Review): Typically 1-2 tasks — review-pr + check-gate only

---

## Filled Example

```markdown
# Phase Plan: Phase 02 — Backlog Drafting

**Sprint:** SPRINT-005
**Phase:** 02 — Backlog Drafting
**Role:** PO
**Date:** 2026-02-18
**Mode:** Backlog Creation
**Complexity:** M

---

## Objective

Draft prioritized backlog items for user authentication feature with acceptance criteria and business context.

## Context

- **Sprint Goal:** Deliver backlog items for authentication feature set ready for BA breakdown
- **Mode:** Mode 1 — Backlog Creation (full lifecycle)
- **Phase Dependencies:** Phase 01 — Goal Refinement (goals defined, AC standard set)
- **SPECS Reference:** SC2 (all items have AC), SC3 (priorities documented)

## Tasks

| # | Task | Workflow | Spawn | Files |
|---|------|----------|-------|-------|
| 1 | Draft login + signup backlog items | draft-backlog | Inline | deliverables/TASK-001-login.md, TASK-002-signup.md |
| 2 | Set priorities with rationale | refine-goal | Inline | Updated in backlog items |
| 3 | Gate 1 sender self-check | check-gate | Inline | deliverables/GATE-1-CHECK.md |

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | Draft backlog | Inline | 2 items (≤3 threshold) |
| 2 | Refine goal | Inline | Quick priority assignment |
| 3 | Check gate | Inline | Standard self-check |

## Verification

- [ ] SC2 — All backlog items have ≥3 checkable acceptance criteria
- [ ] SC3 — Priority rationale documented for each item
- [ ] SC4 — Gate 1 sender items 3-5 all pass
```
