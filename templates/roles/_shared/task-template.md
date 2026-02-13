# Task File Template — TASK-NNN.md

> **Usage:**
> - Created by `/makeit:start-task` — lifecycle entry point (Path A)
> - Updated throughout Mini-GSD lifecycle by orchestrator agent
> - Archived to `.makeit/tasks/archive/` when status = `handed_off`
> - Resume context: chạy `/makeit:status` để AI đọc file này và tiếp tục
>
> **Lifecycle:** `received` → `clarifying` → `specifying` → `executing` → `verifying` → `complete` → `handed_off`

---

## Template

```markdown
---
task-id: TASK-{NNN}
title: "{title}"
role: {role}
status: received          # received | clarifying | specifying | executing | verifying | complete | handed_off
lifecycle-stage: 0        # 0=pre, 1=clarify, 2=specs, 3=iterate, 4=handoff
priority: {P1|P2|P3}
sprint: Sprint {N}
source: "{LARK-ID}"      # External reference (Lark task ID)
created: {YYYY-MM-DD}
updated: {YYYY-MM-DD}
---

# TASK-{NNN}: {title}

## Context
<!-- Tóm tắt task — paste từ Lark hoặc upstream handoff -->
- **Goal:** [From PO/BA — mục tiêu của task này]
- **User Story ref:** [Link to BA story nếu có]
- **Design ref:** [Figma link nếu có]
- **API contract:** [Link nếu có]
- **Upstream handoff:** [Key notes từ sender — ai gửi, gửi gì, cần chú ý gì]

## Current Position
<!-- Updated by orchestrator at each state transition -->
- **Stage:** 0 — Pre-stage (received)
- **Step:** Awaiting initial review
- **Last activity:** {YYYY-MM-DD} — Task created

## Clarifications
<!-- Questions asked during clarifying stage (Stage 1) -->
| # | Question | Asked To | Answer | Date |
|---|----------|----------|--------|------|
| 1 | {question} | {PO/Designer/Techlead} | {answer} | {date} |

## Quality Gate Check
<!-- Auto-filled by /makeit:verify-input -->
- [ ] Task scope rõ ràng
- [ ] User story reference linked
- [ ] Design reference available (nếu FE)
- [ ] API contract defined (nếu FE/BE)
- [ ] Acceptance criteria clear
- **Result:** [✅ All passed / ⚠️ {item} missing → đã clarify với {role}]

## Plan
<!-- Auto-filled during specifying stage (Stage 2) -->
1. [ ] Step 1 — {description}
2. [ ] Step 2 — {description}
3. [ ] Step 3 — {description}
4. [ ] Self-review against Gate {N}

## Deliverables
<!-- Populated during specifying stage, checked off during executing (Stage 3) -->
- [ ] {deliverable-1} — {description} — `{output-path}`
- [ ] {deliverable-2} — {description} — `{output-path}`

## Progress Log
<!-- Updated by agent during execution -->
| Time | Step | Note |
|------|------|------|
| {HH:MM} | Step {N} | {What was done / What happened} |

## Decisions
<!-- Quyết định taken during execution -->
- {Decision description} ({who approved / why})

## Sub-agent History
<!-- Logged by orchestrator when spawning sub-agents via HITL -->
| # | Type | Prompt File | Status | Return Trigger | Date |
|---|------|-------------|--------|----------------|------|
| 1 | {researcher/planner/executor/verifier} | {SPAWN-file.md} | {pending/complete} | "{trigger}" | {date} |

## Output
<!-- Files created/modified during this task -->
- `{path/to/file}` — {Created | Modified | Deleted}

## Handoff
<!-- Filled when status = complete, by /makeit:handoff -->
- **Deliverable:** {What was delivered — PR, document, design, etc.}
- **Gate check:** {✅ All items passed / ⚠️ Items noted}
- **Telegram message:** (auto-generated from communication-templates.md)
```

---

## Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `task-id` | ✅ | Auto-generated: TASK-001, TASK-002... |
| `title` | ✅ | Short descriptive title |
| `role` | ✅ | `po`, `ba`, `designer`, `techlead`, `dev-fe`, `dev-be` |
| `status` | ✅ | Current lifecycle state (see status flow below) |
| `lifecycle-stage` | ✅ | Mini-GSD stage: 0=pre, 1=clarify, 2=specs, 3=iterate, 4=handoff |
| `priority` | ✅ | P1 (critical), P2 (normal), P3 (low) |
| `sprint` | ✅ | Current sprint name |
| `source` | Optional | External reference (Lark task ID, Jira, etc.) |
| `created` | ✅ | Date task was created |
| `updated` | ✅ | Date task was last modified |

## Status Flow (Mini-GSD Lifecycle)

```
received ──→ clarifying ──→ specifying ──→ executing ──→ verifying ──→ complete ──→ handed_off
                                              │                            │
                                              └── SCOPE CHANGE ──→ STOP   │
                                                                           │
                                              verifying ── GAPS FOUND ──→ specifying (max 1 revision)
```

- **received:** Task assigned to role, awaiting initial review
- **clarifying:** Gathering requirements, resolving ambiguities (Stage 1)
- **specifying:** Creating role-specific deliverable specs and plan (Stage 2)
- **executing:** Creating deliverables per plan (Stage 3 — execute)
- **verifying:** Goal-backward verification of output (Stage 3 — verify)
- **complete:** All verification passed, ready for handoff (Stage 4)
- **handed_off:** Output delivered to downstream role (Stage 4 — terminal)

## Section Reference

| Section | When Updated | By Whom |
|---------|-------------|---------|
| Context | Task creation | User / start-task |
| Current Position | Every state transition | Orchestrator |
| Clarifications | Stage 1 (clarifying) | Orchestrator / clarify skill |
| Quality Gate Check | Stage 1 (end) | verify-input skill |
| Plan | Stage 2 (specifying) | Planner sub-agent |
| Deliverables | Stage 2 (specifying) | Planner sub-agent |
| Progress Log | Stage 3 (executing) | Executor sub-agent |
| Decisions | Any stage | Orchestrator / decide skill |
| Sub-agent History | Stage 3 (when spawning) | Orchestrator |
| Output | Stage 3-4 | Executor / orchestrator |
| Handoff | Stage 4 (complete) | handoff skill |
