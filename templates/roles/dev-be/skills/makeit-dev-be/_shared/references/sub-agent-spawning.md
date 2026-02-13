# Sub-agent Spawning Guide (Dev BE)

> Reference cho BE orchestrator — khi nào và cách spawn sub-agents để protect main session context.

---

## Concept

Sub-agent spawning là **mandatory** cho complex work — nó bảo vệ orchestrator context khỏi degradation. Đây là architectural pattern, không phải optional.

**Spawning method** (HITL, native, etc.) là **rule riêng** — xem `.agent/rules/spawn sub-agents.md`.

## When to Spawn

### Spawn a Sub-agent When:

| Scenario | Why Spawn |
|----------|-----------|
| Complex API design (≥3 endpoints + business logic) | Large design surface, many trade-offs |
| Multi-table schema design (≥4 tables with relationships) | Normalization analysis needs fresh context |
| Security audit (formal review) | Independent verification, fresh perspective |
| Multi-endpoint implementation (≥3 APIs) | Large code output, multi-file changes |
| Research on patterns/libraries | Deep investigation consumes >30% context |
| Migration planning with destructive ops | Need careful analysis, STOP mechanism prep |

### Execute Inline When:

| Scenario | Why Inline |
|----------|------------|
| Single endpoint implementation | Quick, <30% context |
| Simple schema design (1-3 tables) | Template-based, manageable |
| API design (1-2 endpoints) | Small scope, straightforward |
| Fix review feedback | Targeted fixes, known scope |
| PR creation | Template-based generation |
| Status checks, decisions, estimates | Lightweight operations |
| Gate checks (quick pass/fail) | Small checklist verification |
| Simple CRUD implementation | Standard pattern, minimal context |

**Rule of thumb:** If task will consume >30% of context or produce >50 lines of output → spawn sub-agent.

## BE Sub-agent Types

| Agent | Definition | Purpose | Return Trigger |
|-------|-----------|---------|----------------|
| BE Researcher | `.agent/agents/makeit-be-researcher.md` | Research API patterns, security best practices, integration approaches | "{topic} research complete" |
| BE Planner | `.agent/agents/makeit-be-planner.md` | Plan implementation order, dependency mapping, batch grouping | "planning complete" |
| BE Executor | `.agent/agents/makeit-be-executor.md` | Implement APIs, schema, migrations, write tests | "execution complete" |
| BE Verifier | `.agent/agents/makeit-be-verifier.md` | Verify contracts, security, data integrity, performance | "verification complete" |

## Full Routing Decision Table

Complete decision table for when to spawn vs. execute directly:

| Situation | Action | Reason |
|-----------|--------|--------|
| Simple clarification question | Use `be-support/decide.md` directly | Too small for spawn overhead |
| Sprint status check | Use `be-support/status.md` directly | Just read STATE.md |
| API design for 1-2 endpoints | Use `be-execution/workflows/design-api.md` inline | Small scope, inline work |
| API pattern research (REST vs gRPC, pagination) | **Spawn researcher** | Needs thorough analysis, fresh context |
| Database schema design (simple, ≤3 tables) | Use `be-execution/workflows/design-schema.md` inline | Template-based, manageable |
| Database schema design (complex, ≥4 tables) | **Spawn researcher** | Needs research on normalization, indexes |
| Plan implementation order (≥3 APIs) | **Spawn planner** | Breakdown needs clean context |
| Single endpoint implementation | Use `be-execution/workflows/implement.md` inline | Focused, single endpoint |
| Multi-endpoint implementation (≥3 endpoints) | **Spawn executor** | Complex, multi-file changes |
| Security audit, API contract validation | **Spawn verifier** | Fresh perspective required |
| Fix review feedback | Use `be-lifecycle/workflows/fix-feedback.md` directly | Targeted fixes, known scope |
| PR creation | Use `be-lifecycle/workflows/create-pr.md` directly | Template-based generation |
| Handoff to Techlead | Use `be-lifecycle/stage-complete.md` directly | Template-based generation |
| Record a decision | Use `be-support/decide.md` directly | Single table row update |
| Estimate complexity | Use `be-support/estimate.md` directly | Quick assessment |

## Spawn Prompt Structure

Follow `.agent/rules/spawn sub-agents.md` for prompt format. Key sections:

1. **`<agent_role>`** — INLINE full agent definition (can't cross-reference)
2. **`<project_context>`** — Minimal: project name, sprint ID, current phase
3. **`<files_to_read>`** — List paths: STATE.md, SPECS.md, ROADMAP.md, PLAN.md
4. **`<your_task>`** — Specific task from PLAN.md
5. **`<output_requirements>`** — Expected output files + templates to use
6. **`<when_complete>`** — Return trigger + file list

## Context Efficiency Rule

**NEVER inline full file contents in spawn prompts.** Sub-agents can read files themselves.

| Section | Include | Don't Include |
|---------|---------|---------------|
| `<agent_role>` | Full agent definition | — |
| `<project_context>` | Sprint ID, phase, goal (2-3 lines) | Full STATE.md content |
| `<files_to_read>` | File paths list | File contents |
| `<your_task>` | Task description + output paths | Full PLAN.md |

## ⚠️ STOP Mechanism in Sub-agents

All BE sub-agents are **STOP-aware**:
- **Executor** has Rule 4 (STOP for destructive ops) as highest priority
- **Researcher** flags destructive operations in recommendations
- **Planner** marks destructive migrations in plan
- **Verifier** checks for unauthorized destructive operations

When a sub-agent encounters STOP conditions, it returns to the orchestrator with a warning — the orchestrator then escalates to the human.
