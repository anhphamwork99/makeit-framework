---
name: makeit-dev-be
description: MakeIt Backend Developer skill catalogue — GSD-aligned skills for BE sprint lifecycle
---

# MakeIt Dev BE Skill Catalogue

## Sprint Lifecycle

```
start-my-tasks → [discuss-phase] → [research-phase] → plan-phase → execute-phase → verify-phase → verify-work → complete
```

6-stage base lifecycle + 2 optional stages (discuss-phase, research-phase). Use optional stages for complex features involving infrastructure decisions, third-party integrations, or unfamiliar domains. STOP mechanism active.

## Skills by Domain

### be-discovery/
Sprint entry and Gate 3 input verification.

| Skill | Mô tả |
|-------|--------|
| `stage-clarify.md` | Select BE tasks from TL handoff → verify Gate 3 → create workspace → extract API/DB/security requirements |

| Template | Mô tả |
|----------|--------|
| `templates/ROADMAP-TEMPLATE.md` | Sprint roadmap with BE deliverable types and phase examples |
| `templates/SPECS-TEMPLATE.md` | Sprint specs with API/DB/security deliverables and STOP awareness |
| `templates/STATE-TEMPLATE.md` | Sprint state with endpoint/migration tracking and STOP log |
| `templates/SPRINT-TEMPLATE.md` | Sprint workspace structure with BE directory conventions |
| `templates/CODEBASE-SNAPSHOT.md` | Codebase snapshot focused on DB schema, API routes, middleware |

### be-planning/
Phase preparation and execution planning.

| Skill | Mô tả |
|-------|--------|
| `stage-plan-phase.md` | Create PLAN.md — API design, migration strategy, dependency analysis, layer ordering |
| `stage-discuss-phase.md` | ⭐ OPTIONAL — Gather BE context: infrastructure decisions, performance requirements, integration complexity |
| `stage-research-phase.md` | ⭐ OPTIONAL — Deep research: library evaluation, architecture patterns, scalability |

| Template | Mô tả |
|----------|--------|
| `templates/PLAN-TEMPLATE.md` | Phase plan with layer ordering, migration plan, STOP flags |
| `templates/CONTEXT-TEMPLATE.md` | Discussion context with 7 BE areas (infra, perf, security, integration, data, migration, error) |
| `templates/RESEARCH-TEMPLATE.md` | Research document with library eval, architecture patterns, security analysis |

### be-execution/
Phase execution with BE domain workflows.

| Skill | Mô tả |
|-------|--------|
| `stage-execute-phase.md` | Execute PLAN.md tasks — routes to implement, design-api, design-schema workflows |

| Workflow | Mô tả |
|----------|--------|
| `workflows/implement.md` | Layer-by-layer implementation (models → migrations → services → controllers → tests) |
| `workflows/design-api.md` | API contract design — endpoints, schemas, error codes, FE handoff |
| `workflows/design-schema.md` | Database schema design — tables, relationships, indexes, migration plan |

| Template | Mô tả |
|----------|--------|
| `templates/API-CONTRACT-TEMPLATE.md` | API contract with endpoints, schemas, error codes, pagination, rate limits |
| `templates/implementation-plan.md` | Implementation task breakdown |
| `templates/schema-design.md` | Schema design document |

### be-verification/
Phase and sprint output verification.

| Skill | Mô tả |
|-------|--------|
| `stage-verify-phase.md` | Goal-backward check + Gate 4 + API compliance + DB safety + security + self-review |
| `stage-verify-work.md` | Validate ALL sprint deliverables vs SPECS.md — API, DB, tests, docs |

| Workflow | Mô tả |
|----------|--------|
| `workflows/self-review.md` | BE code quality self-review — Gate 4, API, DB, security checks |
| `workflows/check-gate.md` | Formal Gate 4 verification checklist |

| Template | Mô tả |
|----------|--------|
| `templates/VERIFICATION-REPORT.md` | Phase verification with API compliance, DB safety, security audit, Gate 4 |
| `templates/self-review-checklist.md` | Self-review verification checklist |

### be-lifecycle/
Sprint completion, context management, and progress tracking.

| Skill | Mô tả |
|-------|--------|
| `stage-complete.md` | Package deliverables, create PR, git sync, handoff for review |
| `pause-work.md` | Save sprint context for later resume (includes migration status check) |
| `resume-work.md` | Restore sprint context from STATE.md, continue from pause point |
| `progress.md` | Display sprint progress with deliverable status |

| Workflow | Mô tả |
|----------|--------|
| `workflows/create-pr.md` | Generate PR description with API/DB changes, tests, checklists |
| `workflows/fix-feedback.md` | Address review comments, prioritize fixes, re-verify |

| Template | Mô tả |
|----------|--------|
| `templates/pr-description.md` | PR description template with BE sections |

### be-debugging/
Systematic issue diagnosis.

| Skill | Mô tả |
|-------|--------|
| `debug.md` | Hypothesis-driven debugging — API errors, DB issues, migration failures, performance |

### be-management/
Roadmap phase management.

| Skill | Mô tả |
|-------|--------|
| `stage-add-phase.md` | Add new phase to end of sprint ROADMAP |
| `stage-insert-phase.md` | Insert urgent work as decimal phase (e.g., 2.1) |
| `stage-remove-phase.md` | Remove future phase and renumber |

### be-support/
Utility operations.

| Skill | Mô tả |
|-------|--------|
| `help.md` | Display all BE commands |
| `status.md` | Quick sprint status with next action |
| `decide.md` | Document technical decision |
| `estimate.md` | Assess implementation complexity |
| `lesson-learned.md` | Capture lesson learned |
| `sync-scope.md` | Pull scope changes from upstream TL |

### kb-management/ — Knowledge Base Management
| Skill | Mô tả |
|-------|--------|
| `create-doc.md` | `/makeit:create-doc` — Create knowledge document with HITL approval |
| `search-kb.md` | `/makeit:search-kb` — Search knowledge base via Deep Query |
| `update-doc.md` | `/makeit:update-doc` — Update existing knowledge document |
| `archive-doc.md` | `/makeit:archive-doc` — Archive deprecated knowledge document |

> KB skills located at `templates/roles/_shared/skills/kb-management/`. Shared across all roles — installed by `install.sh`.

### _shared/references/
Shared references across BE skills.

| File | Mô tả |
|------|--------|
| `coding-standards.md` | Commit format, branch naming, code conventions |
| `quality-gates.md` | Gate 3 + Gate 4 checklists |
| `team-workflow.md` | Pipeline position, handoff points |
| `skills/kb-management/` | Knowledge base CRUD skills (shared) |
| `skills/health-check/` | Workspace health check — broken reference detection (shared) |
| `skills/what-new/` | Framework update assistant — check & apply updates (shared) |

## Template Registry

All BE templates in one view:

| # | Template | Domain | Purpose |
|---|----------|--------|---------|
| 1 | `ROADMAP-TEMPLATE.md` | be-discovery | Sprint roadmap with BE deliverable types |
| 2 | `SPECS-TEMPLATE.md` | be-discovery | Sprint specs with API/DB/security deliverables |
| 3 | `STATE-TEMPLATE.md` | be-discovery | Sprint state with endpoint tracking + STOP log |
| 4 | `SPRINT-TEMPLATE.md` | be-discovery | Workspace structure with BE directory conventions |
| 5 | `CODEBASE-SNAPSHOT.md` | be-discovery | Codebase snapshot for BE context |
| 6 | `PLAN-TEMPLATE.md` | be-planning | Phase plan with layer ordering + STOP flags |
| 7 | `CONTEXT-TEMPLATE.md` | be-planning | Discussion context for infrastructure decisions |
| 8 | `RESEARCH-TEMPLATE.md` | be-planning | Research with library eval + security analysis |
| 9 | `API-CONTRACT-TEMPLATE.md` | be-execution | API contract — endpoints, schemas, error codes |
| 10 | `implementation-plan.md` | be-execution | Implementation task breakdown |
| 11 | `schema-design.md` | be-execution | Schema design document |
| 12 | `VERIFICATION-REPORT.md` | be-verification | Phase verification report |
| 13 | `self-review-checklist.md` | be-verification | Self-review checklist |
| 14 | `pr-description.md` | be-lifecycle | PR description with BE sections |

## ⚠️ STOP Mechanism

AI MUST stop before:
- `DROP TABLE`, `DROP COLUMN` — data loss
- `git push --force`, `git reset --hard` — history loss
- Run migrations on shared database — team impact
- Delete/overwrite existing files — code loss
- Modify shared config (`.env`, docker-compose) — environment impact

## Pipeline Position

```
PO + Designer → BA (Stage 2) → Techlead (Stage 3) → ★ Dev BE (Stage 4) ★ → TL Code Review (Stage 5) → PO Review (Stage 6)
```

## Notes

- Domain skills (implement, design-api, design-schema, self-review, check-gate, create-pr, fix-feedback) are internal workflows — called within stage skills during `/makeit:execute-phase`.
- Templates co-located within their domain folder.
- Sub-agents spawned for complex work to protect orchestrator context.
- Shared references at `_shared/references/` — not duplicated per domain.
- Zero `@_shared/` template dependencies — BE role is fully self-contained.

