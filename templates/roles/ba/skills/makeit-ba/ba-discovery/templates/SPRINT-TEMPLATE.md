# Sprint Workspace Template (BA)

<!-- 
  This document is READ by stage-clarify to know WHAT directories and files to create
  when bootstrapping a new BA sprint workspace.
  
  It is an INSTRUCTION document — not itself copied into the sprint.
-->

## Directory Structure

When creating a new BA sprint workspace, generate the following structure:

```
.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/
├── STATE.md              ← Copy from STATE-TEMPLATE.md, fill placeholders
├── SPECS.md              ← Create during clarify stage (from SPECS-TEMPLATE.md)
├── ROADMAP.md            ← Create during clarify stage (from ROADMAP-TEMPLATE.md)
├── PRODUCT-CONTEXT.md  ← Auto-generated during clarify
├── phases/               ← Created per phase during plan-phase stage
│   └── {NN}-{name}/
│       ├── PLAN.md       ← Created by plan-phase (from PLAN-TEMPLATE.md)
│       ├── CONTEXT.md    ← Optional, from discuss-phase (CONTEXT-TEMPLATE.md)
│       ├── RESEARCH.md   ← Optional, from research-phase (RESEARCH-TEMPLATE.md)
│       └── SUMMARY.md    ← Created after phase execution
└── deliverables/         ← Final output files — ONLY this folder gets committed to git
    ├── stories/          ← User stories (US-NNN-{feature}.md)
    ├── flows/            ← User flow docs (FLOW-{feature}.md)
    ├── analysis/         ← Figma analysis reports (ANALYSIS-{feature}.md)
    └── HANDOFF.md        ← Final handoff document for Techlead
```

## File Sources

| File | Source Template | Created By | When |
|------|---------------|------------|------|
| `STATE.md` | `ba-discovery/templates/STATE-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `SPECS.md` | `ba-discovery/templates/SPECS-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `ROADMAP.md` | `ba-discovery/templates/ROADMAP-TEMPLATE.md` | stage-clarify | Sprint bootstrap |
| `PRODUCT-CONTEXT.md` | `ba-discovery/templates/PRODUCT-CONTEXT.md` | stage-clarify | Sprint bootstrap |
| `phases/{NN}/PLAN.md` | `ba-planning/templates/PLAN-TEMPLATE.md` | stage-plan-phase | Per phase |
| `phases/{NN}/CONTEXT.md` | `ba-planning/templates/CONTEXT-TEMPLATE.md` | stage-discuss-phase | Optional |
| `phases/{NN}/RESEARCH.md` | `ba-planning/templates/RESEARCH-TEMPLATE.md` | stage-research-phase | Optional |
| `deliverables/stories/*` | `ba-execution/templates/user-story.md` | write-stories | During execution |
| `deliverables/flows/*` | `ba-execution/templates/user-flow.md` | document-flow | During execution |
| `deliverables/analysis/*` | `ba-execution/templates/figma-analysis.md` | analyze-design | During execution |
| `deliverables/HANDOFF.md` | `ba-lifecycle/templates/handoff.md` | stage-complete | Sprint completion |

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

## BA File Naming Conventions

| Deliverable | Convention | Example |
|-------------|-----------|---------|
| User Story | `US-NNN-{feature-name}.md` | `US-001-login.md` |
| User Flow | `FLOW-{feature-name}.md` | `FLOW-authentication.md` |
| Figma Analysis | `ANALYSIS-{feature-name}.md` | `ANALYSIS-login-screens.md` |
| Edge Cases | `EDGES-{feature-name}.md` | `EDGES-authentication.md` |
| Handoff | `HANDOFF.md` | `HANDOFF.md` |

## Ephemeral vs Persistent

| Category | Files | Git Sync |
|----------|-------|----------|
| **Process files** | STATE.md, SPECS.md, ROADMAP.md, PRODUCT-CONTEXT.md, phases/ | ❌ Local only |
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

**BA in the handoff chain:**
- **Receives from:** PO (`po/HANDOFF.md`)
- **Sends to:** Techlead (`ba/HANDOFF.md`)

**Rules:**
- Each role creates own subfolder when running `stage-clarify`
- Only HANDOFF.md files go here — no STATE.md, PLAN.md, or deliverables
- Cleanup: delete shared folder when sprint complete (Git history preserves)

## Bootstrap Checklist

Stage-clarify uses this checklist to create a BA sprint workspace:

- [ ] Create sprint folder: `.makeit/sprint/SPRINT-{NNN}-{DDMMYYYY}/`
- [ ] Copy STATE-TEMPLATE.md → `STATE.md` and fill sprint-id, role=ba, dates
- [ ] Create SPECS.md from SPECS-TEMPLATE.md using Lark Sprint issue content
- [ ] Create ROADMAP.md from ROADMAP-TEMPLATE.md with initial phases
- [ ] Run product context discovery → PRODUCT-CONTEXT.md
- [ ] Create `phases/` directory
- [ ] Create `deliverables/` directory with subdirectories (stories/, flows/, analysis/)
- [ ] Update STATE.md status to "clarifying" and set current position
