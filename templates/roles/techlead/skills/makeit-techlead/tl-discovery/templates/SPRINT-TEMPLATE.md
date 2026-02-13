# Sprint Workspace Template — Techlead

<!-- 
  This document is READ by stage-clarify to know WHAT directories and files to create
  when bootstrapping a new sprint workspace.
  
  It is an INSTRUCTION document — not itself copied into the sprint.
-->

## Directory Structure

When creating a new sprint workspace, generate the following structure:

```
.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
├── STATE.md              ← Copy from @tl-discovery/templates/STATE-TEMPLATE.md, fill placeholders
├── SPECS.md              ← Create during clarify stage (from @tl-discovery/templates/SPECS-TEMPLATE.md)
├── ROADMAP.md            ← Create during clarify stage (from @tl-discovery/templates/ROADMAP-TEMPLATE.md)
├── CODEBASE-SNAPSHOT.md  ← Create during clarify stage (from @tl-discovery/templates/CODEBASE-SNAPSHOT.md)
├── phases/               ← Created per phase during plan-phase stage
│   └── {NN}-{name}/
│       ├── CONTEXT.md    ← Optional, from @tl-planning/templates/CONTEXT-TEMPLATE.md
│       ├── RESEARCH.md   ← Optional, from @tl-planning/templates/RESEARCH-TEMPLATE.md
│       ├── PLAN.md       ← Created by plan-phase from @tl-planning/templates/PLAN-TEMPLATE.md
│       ├── VERIFICATION-REPORT.md ← Created by verify-phase from @tl-verification/templates/VERIFICATION-REPORT.md
│       └── SUMMARY.md    ← Created after phase execution
└── deliverables/         ← Final output files — ONLY this folder gets committed to git
    ├── tasks/            ← FE/BE task breakdowns
    ├── contracts/        ← API contracts
    ├── architecture/     ← Architecture decision records
    └── ESTIMATION-*.md   ← Estimation reports
```

## File Sources

| File | Source Template | Created By | When |
|------|---------------|------------|------|
| `STATE.md` | `@tl-discovery/templates/STATE-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `SPECS.md` | `@tl-discovery/templates/SPECS-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `ROADMAP.md` | `@tl-discovery/templates/ROADMAP-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `CODEBASE-SNAPSHOT.md` | `@tl-discovery/templates/CODEBASE-SNAPSHOT.md` | stage-clarify | Sprint bootstrap |
| `phases/{NN}/CONTEXT.md` | `@tl-planning/templates/CONTEXT-TEMPLATE.md` | stage-discuss-phase | Optional |
| `phases/{NN}/RESEARCH.md` | `@tl-planning/templates/RESEARCH-TEMPLATE.md` | stage-research-phase | Optional |
| `phases/{NN}/PLAN.md` | `@tl-planning/templates/PLAN-TEMPLATE.md` | stage-plan-phase | Per phase |
| `phases/{NN}/VERIFICATION-REPORT.md` | `@tl-verification/templates/VERIFICATION-REPORT.md` | stage-verify-phase | Per phase |
| `phases/{NN}/SUMMARY.md` | — (generated) | stage-execute-phase | After phase done |
| `deliverables/*` | — (role output) | stage-execute-phase | During execution |

## Sprint Naming Convention

Format: `SPRINT-{NNN}-{DDMMYYYY}`

- **NNN:** Sequential counter padded to 3 digits (001, 002, 003...)
- **DDMMYYYY:** Creation date in day-month-year format
- **Example:** `SPRINT-001-11022026`

To determine the next NNN:
1. List existing folders in `.makeit/sprint/`
2. Find the highest NNN value
3. Increment by 1
4. If no existing sprints, start at 001

## Ephemeral vs Persistent

| Category | Files | Git Sync |
|----------|-------|----------|
| **Process files** | STATE.md, SPECS.md, ROADMAP.md, CODEBASE-SNAPSHOT.md, phases/ | ❌ Local only |
| **Deliverables** | deliverables/* (tasks, contracts, architecture, estimations) | ✅ Committed to git |

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

**TL in the handoff chain:**
- **Receives from:** BA (`ba/HANDOFF.md`)
- **Sends to:** FE + BE (`tl/HANDOFF.md` with `## For FE` and `## For BE` sections)

**Rules:**
- Each role creates own subfolder when running `stage-clarify`
- Only HANDOFF.md files go here — no STATE.md, PLAN.md, or deliverables
- Cleanup: delete shared folder when sprint complete (Git history preserves)

## Bootstrap Checklist

Stage-clarify uses this checklist to create a sprint workspace:

- [ ] Create sprint folder: `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`
- [ ] Copy STATE-TEMPLATE.md → `STATE.md` and fill sprint-id, role, dates
- [ ] Verify Gate 2 (BA → TL) — all 7 items checked
- [ ] Create SPECS.md from SPECS-TEMPLATE.md using Lark Sprint issue + BA stories
- [ ] Create ROADMAP.md from ROADMAP-TEMPLATE.md with initial phases
- [ ] Run discover-tech-context → create CODEBASE-SNAPSHOT.md
- [ ] Create empty `phases/` directory
- [ ] Create empty `deliverables/` directory with subdirectories (tasks/, contracts/, architecture/)
- [ ] Update STATE.md status to "clarifying" and set current position
