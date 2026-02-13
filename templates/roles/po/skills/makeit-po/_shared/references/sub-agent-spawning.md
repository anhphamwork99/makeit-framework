# Sub-agent Spawning Guide (PO)

> Reference cho PO orchestrator — khi nào và cách spawn sub-agents để protect main session context.

---

## Concept

Sub-agent spawning là **mandatory** cho complex work — nó bảo vệ orchestrator context khỏi degradation. Đây là architectural pattern, không phải optional.

**Spawning method** (HITL, native, etc.) là **rule riêng** — xem `.agent/rules/spawn sub-agents.md`.

## When to Spawn

### Spawn a Sub-agent When:

| Scenario | Why Spawn |
|----------|-----------|
| Large backlog creation (>5 items) | Burns context with template filling + prioritization |
| Complex PR review (multi-feature or cross-cutting) | Deep analysis needs fresh context |
| Market/competitor research | External research may consume >30% context |
| Large-scale prioritization (>5 items) | Multi-factor analysis needs clean context |
| Formal quality verification | Independent verification benefits from fresh eyes |

### Execute Inline When:

| Scenario | Why Inline |
|----------|------------|
| Draft 1-2 backlog items | Small, manageable output |
| Single goal refinement | Focused, single output |
| Quick gate check | Small checklist verification |
| Decision recording | Lightweight operation |
| Sprint status check | Just read STATE.md |
| Simple PR review (single feature) | Structured template, PO must be hands-on |

**Rule of thumb:** If task will consume >30% of context or produce >50 lines of output → spawn sub-agent.

## PO Sub-agent Types

| Agent | Definition | Purpose | Return Trigger |
|-------|-----------|---------|----------------|
| PO Researcher | `.agent/agents/makeit-po-researcher.md` | Research market context, competitor analysis, user feedback | "{topic} research complete" |
| PO Planner | `.agent/agents/makeit-po-planner.md` | Plan backlog item creation order and priority batches | "planning complete" |
| PO Executor | `.agent/agents/makeit-po-executor.md` | Draft backlog items, refine goals, set acceptance criteria | "execution complete" |
| PO Verifier | `.agent/agents/makeit-po-verifier.md` | Verify PO deliverables quality (goal-backward) | "verification complete" |

## Full Routing Decision Table

Complete decision table for when to spawn vs. execute directly:

| Situation | Action | Reason |
|-----------|--------|--------|
| Simple clarification question | Use `po-support/decide.md` directly | Too small for spawn overhead |
| Sprint status check | Use `po-support/status.md` directly | Just read STATE.md |
| Draft 1-2 backlog items | Use `po-execution/workflows/draft-backlog.md` inline | Small enough for inline |
| Draft ≥3 backlog items or complex feature | **Spawn executor** | Complex deliverable creation |
| Refine existing goal | Use `po-execution/workflows/refine-goal.md` inline | Focused, single output |
| Prepare sprint backlog | Use `po-execution/workflows/prepare-sprint.md` inline | Template-based process |
| Market/user research needed | **Spawn researcher** | External research, may consume >30% context |
| Competitor analysis | **Spawn researcher** | Research-heavy, needs fresh context |
| Prioritize large backlog (>5 items) | **Spawn planner** | Multi-factor analysis needs clean context |
| Complex feature definition | **Spawn planner** + **spawn executor** | Breakdown + creation |
| Goal-quality verification | **Spawn verifier** | Fresh perspective required |
| PR review | Use `po-execution/workflows/review-pr.md` directly | Structured template, PO must be hands-on |
| Quality gate check | Use `po-execution/workflows/check-gate.md` directly | Template-based checklist |
| Handoff to BA+Designer | Use `po-lifecycle/stage-complete.md` directly | Template-based generation |
| Record a decision | Use `po-support/decide.md` directly | Single table row update |

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
