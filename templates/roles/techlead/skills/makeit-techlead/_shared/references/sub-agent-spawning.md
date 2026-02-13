# Sub-agent Spawning Guide (Techlead)

> Reference cho TL orchestrator — khi nào và cách spawn sub-agents để protect main session context.

---

## Concept

Sub-agent spawning là **mandatory** cho complex work — nó bảo vệ orchestrator context khỏi degradation. Đây là architectural pattern, không phải optional.

**Spawning method** (HITL, native, etc.) là **rule riêng** — xem `.agent/rules/spawn sub-agents.md`.

## When to Spawn

### Spawn a Sub-agent When:

| Scenario | Why Spawn |
|----------|-----------|
| Solution design for complex architecture | Burns context with codebase analysis + trade-off evaluation |
| Task breakdown for >5 stories | Large output + dependency mapping |
| Research for architecture/library unknowns | Deep investigation needs fresh context |
| Cross-feature impact analysis | Comprehensive check across modules |
| Quality verification (formal) | Independent verification benefits from fresh eyes |

### Execute Inline When:

| Scenario | Why Inline |
|----------|------------|
| Quick estimation (1-2 stories) | Lightweight, <30% context |
| Single story breakdown | Manageable output |
| Verify BA stories (gate check) | Template-based checklist |
| Status checks, decisions, assignments | Lightweight operations |
| Code review (single PR) | Focused, checklist-based |

**Rule of thumb:** If task will consume >30% of context or produce >50 lines of output → spawn sub-agent.

## TL Sub-agent Types

| Agent | Definition | Purpose | Return Trigger |
|-------|-----------|---------|----------------|
| TL Researcher | `.agent/agents/makeit-tl-researcher.md` | Research architecture, tech unknowns, integration patterns | "{topic} research complete" |
| TL Planner | `.agent/agents/makeit-tl-planner.md` | Plan task breakdown order, dependency mapping, batch grouping | "planning complete" |
| TL Executor | `.agent/agents/makeit-tl-executor.md` | Break tasks, design solutions, assign to FE/BE | "execution complete" |
| TL Verifier | `.agent/agents/makeit-tl-verifier.md` | Verify TL output quality (goal-backward) | "verification complete" |

## Full Routing Decision Table

Complete decision table for when to spawn vs. execute directly:

| Situation | Action | Reason |
|-----------|--------|--------|
| Verify BA user stories | Gate 2 check is built into `stage-clarify` | Template-based, focused check |
| Simple clarification question | Use `tl-support/decide.md` directly | Too small for spawn overhead |
| Sprint status check | Use `tl-support/status.md` directly | Just read STATE.md |
| Architecture/library investigation | **Spawn researcher** | May consume >30% context, needs deep analysis |
| Technical debt assessment | **Spawn researcher** | Requires codebase investigation |
| Plan task breakdown for ≥3 stories | **Spawn planner** | Complex breakdown needs clean context |
| Task breakdown for 1-2 stories | Use `tl-execution/` break-tasks workflow directly | Small enough for inline |
| Task breakdown for ≥3 stories | **Spawn executor** | Complex deliverable creation |
| Simple solution design | Use `tl-execution/` design-solution workflow directly | Single feature, no architecture changes |
| Complex solution design (new patterns/infra) | **Spawn researcher** + **executor** | Architecture research + spec creation |
| Code review | Use `tl-execution/` review-code workflow directly | Focused, checklist-based review |
| Assign tasks to Dev | Use `tl-execution/` assign-tasks workflow directly | Template-based assignment |
| Technical verification | **Spawn verifier** | Fresh perspective required |
| Estimate complexity | Use `tl-support/estimate.md` directly | Quick assessment |
| Handoff to Dev FE/BE | Use `tl-lifecycle/stage-complete.md` directly | Template-based generation |
| Record a decision | Use `tl-support/decide.md` directly | Single table row update |

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
