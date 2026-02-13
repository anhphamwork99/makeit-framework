# Sprint Workspace Template

<!-- 
  This document is READ by stage-start-sprint to know WHAT directories and files to create
  when bootstrapping a new sprint workspace.
  
  It is an INSTRUCTION document — not itself copied into the sprint.
-->

## Directory Structure

When creating a new sprint workspace, generate the following structure:

```
.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
├── STATE.md              ← Copy from STATE-TEMPLATE.md, fill placeholders
├── SPECS.md              ← Create during start-sprint stage (from SPECS-TEMPLATE.md)
├── ROADMAP.md            ← Create during start-sprint stage (from ROADMAP-TEMPLATE.md)
├── phases/               ← Created per phase during plan-phase stage
│   └── {NN}-{name}/
│       ├── PLAN.md       ← Created by plan-phase (from PLAN-TEMPLATE.md)
│       └── SUMMARY.md    ← Created after phase execution
└── deliverables/         ← Final output files — ONLY this folder gets committed to git
    ├── backlog/          ← Backlog items (Mode 1)
    │   ├── TASK-001-{feature}.md
    │   └── TASK-002-{feature}.md
    └── reviews/          ← PR review feedback (Mode 2)
        └── REVIEW-{pr-id}.md
```

## File Sources

| File | Source Template | Created By | When |
|------|---------------|------------|------|
| `STATE.md` | `@po-discovery/templates/STATE-TEMPLATE.md` | stage-start-sprint | Sprint bootstrap |
| `SPECS.md` | `@po-discovery/templates/SPECS-TEMPLATE.md` | stage-start-sprint | Sprint bootstrap |
| `ROADMAP.md` | `@po-discovery/templates/ROADMAP-TEMPLATE.md` | stage-start-sprint | Sprint bootstrap |
| `PRODUCT-CONTEXT.md` | `@po-discovery/templates/PRODUCT-CONTEXT.md` | stage-start-sprint | Sprint bootstrap (optional) |
| `phases/{NN}-{name}/PLAN.md` | `@po-planning/templates/PLAN-TEMPLATE.md` | stage-plan-phase | Per phase |
| `phases/{NN}-{name}/SUMMARY.md` | — (generated) | stage-execute-phase | After phase done |
| `deliverables/*` | — (role output) | stage-execute-phase | During execution |

## Sprint Naming Convention

Format: `SPRINT-{NNN}-{DDMMYYYY}`

- **NNN:** Sequential counter padded to 3 digits (001, 002, 003...)
- **DDMMYYYY:** Creation date in day-month-year format
- **Example:** `SPRINT-001-15022026`

To determine the next NNN:
1. List existing folders in `.makeit/sprint/`
2. Find the highest NNN value
3. Increment by 1
4. If no existing sprints, start at 001

## PO File Naming Conventions

<!-- PO-specific file naming for deliverables -->

| File Type | Convention | Example |
|-----------|-----------|---------|
| Backlog Item | `TASK-{NNN}-{feature-name}.md` | `TASK-001-user-auth.md` |
| Sprint Plan | `SPRINT-PLAN-{sprint}.md` | `SPRINT-PLAN-001.md` |
| PR Review | `REVIEW-{pr-id}.md` | `REVIEW-PR-42.md` |
| Goal Definition | Updated in backlog item files | — |
| Gate Check | `GATE-{N}-CHECK.md` | `GATE-1-CHECK.md` |

## Ephemeral vs Persistent

| Category | Files | Git Sync |
|----------|-------|----------|
| **Process files** | STATE.md, SPECS.md, ROADMAP.md, phases/ | ❌ Local only |
| **Deliverables** | deliverables/* | ✅ Committed to git |

> **Rule:** Only the `deliverables/` folder gets committed to the repository.
> Everything else is ephemeral working state that lives in the local workspace.

## Shared Sprint Folder (Product Repo)

Handoff files live in the **product repo** (shared across roles) at:

```
.makeit/sprint/SPRINT-{NNN}/
├── po/HANDOFF.md      ← PO → BA+Designer
├── ba/HANDOFF.md      ← BA → TL
├── tl/HANDOFF.md      ← TL → FE/BE
├── fe/HANDOFF.md      ← FE → Review
└── be/HANDOFF.md      ← BE → Review
```

**PO in the handoff chain:**
- **Sends to:** BA + Designer (`po/HANDOFF.md`)
- **Receives from (review):** FE (`fe/HANDOFF.md`) + BE (`be/HANDOFF.md`)

**Rules:**
- Each role creates own subfolder when running `stage-start-sprint` (or `stage-clarify`)
- Only HANDOFF.md files go here — no STATE.md, PLAN.md, or deliverables
- Cleanup: delete shared folder when sprint complete (Git history preserves)

## Bootstrap Checklist

Stage-start-sprint uses this checklist to create a sprint workspace:

- [ ] Create sprint folder: `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`
- [ ] Copy STATE-TEMPLATE.md → `STATE.md` and fill sprint-id, role, mode, dates
- [ ] Create SPECS.md from SPECS-TEMPLATE.md using Lark Sprint issue content
- [ ] Create ROADMAP.md from ROADMAP-TEMPLATE.md with initial phases
- [ ] Create empty `phases/` directory
- [ ] Create `deliverables/backlog/` directory (Mode 1) or `deliverables/reviews/` (Mode 2)
- [ ] Update STATE.md status to "starting" and set current position
- [ ] Detect mode (Backlog Creation / PR Review) and set in STATE.md
