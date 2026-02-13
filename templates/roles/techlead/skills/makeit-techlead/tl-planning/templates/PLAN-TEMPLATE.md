# Phase Plan: [Phase NN — Name]

**Sprint:** SPRINT-{NNN}
**Phase:** [NN] — [Phase Name]
**Role:** Techlead
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

## Tasks

<!-- Max 3-5 tasks. Each task = one deliverable, one internal workflow, one verification. -->

| # | Task | Internal Workflow | Spawn | Files |
|---|------|-------------------|-------|-------|
| 1 | [Task name — action-oriented, e.g., "Break login stories into FE/BE tasks"] | [TL workflow, e.g., break-tasks] | [Inline/Spawn — from spawn decision matrix] | [Output file path] |
| 2 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |
| 3 | [Task name] | [Workflow] | [Inline/Spawn] | [Output file path] |

### Task Details

**Task 1: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [break-tasks / design-solution / assign-tasks / estimate / review-code]
- **Action:** [Specific action description — what the agent does]
- **Verify:** [How to verify this task is done correctly]
- **Done:** [Criteria for task completion]

**Task 2: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [TL workflow reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

**Task 3: [Task name]**
- **Files:** [Output file path(s)]
- **Internal Workflow:** [TL workflow reference]
- **Action:** [Specific action description]
- **Verify:** [Verification method]
- **Done:** [Completion criteria]

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | [Task breakdown / Solution design / Assignment / Estimation / Code review] | [Inline / Spawn] | [≤3 stories → inline / >3 stories → spawn] |
| 2 | [Type] | [Decision] | [Reason based on spawn decision matrix] |
| 3 | [Type] | [Decision] | [Reason] |

## Complexity Assessment

| Factor | Value | Level |
|--------|-------|-------|
| Stories in scope | [N] | [Low/Med/High] |
| API contracts needed | [N] | [Low/Med/High] |
| Cross-team dependencies | [N] | [Low/Med/High] |
| Architecture decisions | [N] | [Low/Med/High] |
| Estimation complexity | [Description] | [Low/Med/High] |
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
2. **Context:** Reference SPECS.md success criteria IDs, CONTEXT.md decisions, and RESEARCH.md findings
3. **Tasks:** Max 3-5 tasks — each maps to one TL internal workflow (break-tasks, design-solution, assign-tasks, estimate, review-code)
4. **Spawn Decisions:** Use the TL spawn decision matrix from stage-plan-phase.md
5. **Complexity Assessment:** Evaluate 5 factors to determine overall complexity (S/M/L/XL)
6. **Verification:** Each check must trace to a SPECS.md success criterion

**TL task type reference:**
- Break tasks → produces FE/BE task breakdown with estimates
- Design solution → produces architecture decision record
- Assign tasks → produces FE/BE assignment with context
- Estimate → produces estimation report with risk factors
- Review code → produces code review feedback

**TL spawn decision matrix:**
- ≤3 stories + ≤2 API contracts → Inline
- >3 stories OR >2 API contracts OR architecture decision needed → Spawn executor

---

## Filled Example

```markdown
# Phase Plan: Phase 01 — Task Breakdown

**Sprint:** SPRINT-003
**Phase:** 01 — Task Breakdown
**Role:** Techlead
**Date:** 2026-02-15
**Complexity:** M

---

## Objective

Break login and registration stories into FE/BE tasks with estimates and API contracts.

## Context

- **Sprint Goal:** Deliver authentication feature set
- **Phase Dependencies:** None — first phase
- **SPECS Reference:** SC1 (tasks separated FE/BE), SC2 (API contracts)
- **CONTEXT.md:** REST API chosen over GraphQL, JWT auth approach
- **RESEARCH.md:** N/A — no research-phase

## Tasks

| # | Task | Internal Workflow | Spawn | Files |
|---|------|-------------------|-------|-------|
| 1 | Break login stories into FE/BE tasks | break-tasks | Inline | deliverables/tasks/TASK-login-fe.md, TASK-login-be.md |
| 2 | Design auth solution | design-solution | Inline | deliverables/architecture/ADR-001-auth.md |
| 3 | Estimate all tasks | estimate | Inline | deliverables/ESTIMATION-sprint-003.md |

## Spawn Decisions

| Task | Type | Decision | Reason |
|------|------|----------|--------|
| 1 | Task breakdown | Inline | 2 stories (≤3 threshold) |
| 2 | Solution design | Inline | Single architecture decision |
| 3 | Estimation | Inline | Straightforward estimation |

## Complexity Assessment

| Factor | Value | Level |
|--------|-------|-------|
| Stories in scope | 2 | Low |
| API contracts needed | 2 | Med |
| Cross-team dependencies | 1 (FE↔BE) | Low |
| Architecture decisions | 1 (auth) | Med |
| Estimation complexity | Moderate | Med |
| **Overall** | | **M** |

## Verification

- [ ] SC1 — All tasks clearly separated into FE and BE
- [ ] SC2 — API contracts defined for login and registration
- [ ] SC3 — Effort estimated with risk factors
```
