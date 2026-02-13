# Sub-agent Spawning Guide (BA)

> Reference cho BA orchestrator — khi nào và cách spawn sub-agents để protect main session context.

---

## Concept

Sub-agent spawning là **mandatory** cho complex work — nó bảo vệ orchestrator context khỏi degradation. Đây là architectural pattern, không phải optional.

**Spawning method** (HITL, native, etc.) là **rule riêng** — xem `.agent/rules/spawn sub-agents.md`.

## When to Spawn

### Spawn a Sub-agent When:

| Scenario | Why Spawn |
|----------|-----------|
| Design analysis for >3 screens | Burns context with Figma MCP calls |
| Story writing for >3 stories | Large output + template filling |
| Research needed for unknowns | Deep investigation needs fresh context |
| Edge case analysis (systematic) | Comprehensive check across categories |
| Quality verification (formal) | Independent verification benefits from fresh eyes |

### Execute Inline When:

| Scenario | Why Inline |
|----------|------------|
| Simple design analysis (1-2 screens) | Quick, <30% context |
| Story writing (1-2 stories) | Manageable output |
| Status checks, decisions, estimates | Lightweight operations |
| Gate checks (quick pass/fail) | Small checklist verification |

**Rule of thumb:** If task will consume >30% of context or produce >50 lines of output → spawn sub-agent.

## BA Sub-agent Types

| Agent | Definition | Purpose | Return Trigger |
|-------|-----------|---------|----------------|
| BA Researcher | `.agent/agents/makeit-ba-researcher.md` | Research design context, PO intent, domain unknowns | "{topic} research complete" |
| BA Planner | `.agent/agents/makeit-ba-planner.md` | Plan story creation order, batch grouping | "planning complete" |
| BA Executor | `.agent/agents/makeit-ba-executor.md` | Create stories, flows, edge cases | "execution complete" |
| BA Verifier | `.agent/agents/makeit-ba-verifier.md` | Verify BA output quality (goal-backward) | "verification complete" |

## Full Routing Decision Table

Complete decision table for when to spawn vs. execute directly:

| Situation | Action | Reason |
|-----------|--------|--------|
| Simple clarification question | Use `ba-support/decide.md` directly | Too small for spawn overhead |
| Sprint status check | Use `ba-support/status.md` directly | Just read STATE.md |
| Figma design analysis (≤3 screens) | Use `ba-execution/workflows/analyze-design.md` inline | Small enough for inline |
| Figma design analysis (>3 screens) | **Spawn researcher** | Complex, needs fresh context for Figma MCP |
| Research domain unknowns | **Spawn researcher** | May consume >30% context |
| Plan story creation order for ≥3 stories | **Spawn planner** | Breakdown needs clean context |
| Write 1-2 stories | Use `ba-execution/workflows/write-stories.md` inline | Small enough for inline |
| Write ≥3 stories + flows + edges | **Spawn executor** | Complex deliverable creation |
| Document single user flow | Use `ba-execution/workflows/document-flow.md` inline | Focused, single output |
| Goal-backward verification | **Spawn verifier** | Fresh perspective required |
| Handoff to Techlead | Use `ba-lifecycle/stage-complete.md` directly | Template-based generation |
| Record a decision | Use `ba-support/decide.md` directly | Single table row update |
| Estimate complexity | Use `ba-support/estimate.md` directly | Quick assessment |

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
