# Sprint Workspace Template — Dev BE

<!-- 
  This document is READ by stage-clarify to know WHAT directories and files to create
  when bootstrapping a new sprint workspace.
  
  It is an INSTRUCTION document — not itself copied into the sprint.
-->

## Directory Structure

When creating a new sprint workspace, generate the following structure:

```
.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
├── STATE.md              ← Copy from STATE-TEMPLATE.md, fill placeholders
├── SPECS.md              ← Create during clarify stage (from SPECS-TEMPLATE.md)
├── ROADMAP.md            ← Create during clarify stage (from ROADMAP-TEMPLATE.md)
├── CODEBASE-SNAPSHOT.md  ← Auto-generated during clarify (from CODEBASE-SNAPSHOT.md)
├── phases/               ← Created per phase during plan-phase stage
│   └── {NN}-{name}/
│       ├── PLAN.md       ← Created by plan-phase (from PLAN-TEMPLATE.md)
│       ├── CONTEXT.md    ← Optional, from discuss-phase (CONTEXT-TEMPLATE.md)
│       ├── RESEARCH.md   ← Optional, from research-phase (RESEARCH-TEMPLATE.md)
│       └── SUMMARY.md    ← Created after phase execution
└── deliverables/         ← Final output files — ONLY this folder gets committed to git
    ├── api/              ← API contract documents
    │   └── API-CONTRACT-{feature}.md
    ├── schema/           ← Schema design documents
    │   └── SCHEMA-{feature}.md
    └── migrations/       ← Migration documentation (if separate from code)
```

## File Sources

| File | Source Template | Created By | When |
|------|---------------|------------|------|
| `STATE.md` | `@be-discovery/templates/STATE-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `SPECS.md` | `@be-discovery/templates/SPECS-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `ROADMAP.md` | `@be-discovery/templates/ROADMAP-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `CODEBASE-SNAPSHOT.md` | `@be-discovery/templates/CODEBASE-SNAPSHOT.md` | stage-clarify | Sprint bootstrap |
| `phases/{NN}/PLAN.md` | `@be-planning/templates/PLAN-TEMPLATE.md` | stage-plan-phase | Per phase |
| `phases/{NN}/CONTEXT.md` | `@be-planning/templates/CONTEXT-TEMPLATE.md` | stage-discuss-phase | Optional |
| `phases/{NN}/RESEARCH.md` | `@be-planning/templates/RESEARCH-TEMPLATE.md` | stage-research-phase | Optional |
| `phases/{NN}/SUMMARY.md` | — (generated) | stage-execute-phase | After phase done |
| `deliverables/api/*` | `@be-execution/templates/API-CONTRACT-TEMPLATE.md` | design-api workflow | During execution |
| `deliverables/schema/*` | — (generated) | design-schema workflow | During execution |
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

## BE File Naming Conventions

| File Type | Convention | Example |
|-----------|-----------|---------|
| API contract | API-CONTRACT-{feature}.md | API-CONTRACT-auth.md |
| Schema design | SCHEMA-{feature}.md | SCHEMA-users.md |
| Migration docs | MIGRATION-{NNN}-{description}.md | MIGRATION-001-create-users.md |

## Ephemeral vs Persistent

| Category | Files | Git Sync |
|----------|-------|----------|
| **Process files** | STATE.md, SPECS.md, ROADMAP.md, phases/ | ❌ Local only |
| **Deliverables** | deliverables/* | ✅ Committed to git |
| **Code changes** | src/, tests/, migrations/ | ✅ Committed to git |

> **Rule:** Only the `deliverables/` folder and actual code changes get committed to the repository.
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

**BE in the handoff chain:**
- **Receives from:** TL (`tl/HANDOFF.md` — read `## For BE` section)
- **Sends to:** PO Review (`be/HANDOFF.md`)

**Rules:**
- Each role creates own subfolder when running `stage-clarify`
- Only HANDOFF.md files go here — no STATE.md, PLAN.md, or deliverables
- Cleanup: delete shared folder when sprint complete (Git history preserves)

## Bootstrap Checklist

Stage-clarify uses this checklist to create a sprint workspace:

- [ ] Create sprint folder: `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`
- [ ] Copy STATE-TEMPLATE.md → `STATE.md` and fill sprint-id, role, dates
- [ ] Create SPECS.md from SPECS-TEMPLATE.md using Lark Sprint issue content
- [ ] Create ROADMAP.md from ROADMAP-TEMPLATE.md with initial phases
- [ ] Generate CODEBASE-SNAPSHOT.md via discover-be-context workflow
- [ ] Create empty `phases/` directory
- [ ] Create `deliverables/` directory with `api/` and `schema/` subdirs
- [ ] Update STATE.md status to "clarifying" and set current position
