# Sub-agent Spawning Guide (Dev FE)

> Reference cho FE orchestrator — khi nào và cách spawn sub-agents để protect main session context.

---

## Concept

Sub-agent spawning là **mandatory** cho complex work — nó bảo vệ orchestrator context khỏi degradation. Đây là architectural pattern, không phải optional.

**Spawning method** (HITL, native, etc.) là **rule riêng** — xem `.agent/rules/spawn sub-agents.md`.

## When to Spawn

### Spawn a Sub-agent When:

| Scenario | Why Spawn |
|----------|-----------|
| Implementation of >3 components | Burns context with Figma MCP + code generation |
| Figma design analysis for >3 screens | Heavy MCP calls consume context fast |
| Research for library evaluation or pattern investigation | Deep investigation needs fresh context |
| Compare-UI across multiple screens | Screenshot comparison + analysis burns context |
| Quality verification (formal self-review + gate check) | Independent verification benefits from fresh eyes |

### Execute Inline When:

| Scenario | Why Inline |
|----------|------------|
| Simple component implementation (1-2 components) | Quick, <30% context |
| Single screen Figma extraction | Manageable MCP call |
| Status checks, decisions, estimates | Lightweight operations |
| Gate checks (quick pass/fail) | Small checklist verification |
| Fix-feedback (targeted fixes) | Scoped changes |

**Rule of thumb:** If task will consume >30% of context or produce >50 lines of output → spawn sub-agent.

## FE Sub-agent Types

| Agent | Definition | Purpose | Return Trigger |
|-------|-----------|---------|----------------|
| FE Researcher | `.agent/agents/makeit-fe-researcher.md` | Research Figma design context, patterns, library evaluation | "{topic} research complete" |
| FE Planner | `.agent/agents/makeit-fe-planner.md` | Plan component implementation order and batches | "planning complete" |
| FE Executor | `.agent/agents/makeit-fe-executor.md` | Implement components, states, responsive behavior | "execution complete" |
| FE Verifier | `.agent/agents/makeit-fe-verifier.md` | Verify FE implementation quality (goal-backward) | "verification complete" |

## Full Routing Decision Table

Complete decision table for when to spawn vs. execute directly:

| Situation | Action | Reason |
|-----------|--------|--------|
| Quick clarification question | Use `fe-support/decide.md` directly | Too small for spawn overhead |
| Sprint status check | Use `fe-support/status.md` directly | Just read STATE.md |
| Figma design analysis (≤2 screens) | Use `fe-execution/workflows/implement.md` inline | Small enough for inline |
| Figma design analysis (>3 screens) | **Spawn researcher** | Complex, needs fresh context for Figma MCP |
| Research component patterns or libraries | **Spawn researcher** | May consume >30% context |
| Plan implementation order for ≥3 components | **Spawn planner** | Breakdown needs clean context |
| Implement single component | Use `fe-execution/workflows/implement.md` directly | Small enough for inline |
| Implement ≥3 components with states | **Spawn executor** | Complex multi-file creation |
| Compare UI vs Figma (quick check) | Use `fe-execution/workflows/compare-ui.md` directly | Single comparison |
| Thorough visual + responsive + states verification | **Spawn verifier** | Fresh perspective required |
| Create PR | Use `fe-lifecycle/workflows/create-pr.md` directly | Template-based generation |
| Fix review feedback | Use `fe-lifecycle/workflows/fix-feedback.md` directly | Specific, targeted changes |
| Self-review code | Use `fe-verification/workflows/self-review.md` directly | Focused checklist |
| Check quality gate | Use `fe-verification/workflows/check-gate.md` directly | Quick pass/fail |
| Handoff to Designer review | Use `fe-lifecycle/stage-complete.md` directly | Template-based generation |
| Record a decision | Use `fe-support/decide.md` directly | Single table row update |
| Estimate complexity | Use `fe-support/estimate.md` directly | Quick assessment |

**FE-specific routing notes:**
- Figma MCP calls for >3 screens should ALWAYS go through researcher (context-heavy)
- Single component with all states → direct with `implement.md`
- Multi-component with shared state management → spawn executor
- Quick visual spot-check → direct `compare-ui.md`
- Full visual audit (all breakpoints + states) → spawn verifier

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
