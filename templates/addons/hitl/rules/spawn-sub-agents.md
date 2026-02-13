---
trigger: always_on
description: Transform Task() spawn calls into manual HITL prompts for Antigravity IDE (không hỗ trợ native sub-agent spawning)
output: Sub-agent prompt file (.makeit/sprint/SPRINT-NNN/orchestration-tracking/SPAWN-{id}-{description}.md)
---

# Human-in-the-Loop Orchestration Rule

**Applies to:** Tất cả workflows, skills có spawn sub-agents

---

## Trigger

Rule này kích hoạt khi:
- Workflow chứa `Task(` syntax
- Workflow đề cập "spawn agent", "spawn subagent", "spawn researcher", etc.
- Skill yêu cầu parallel agent execution
- Bất kỳ instruction nào yêu cầu tạo sub-agent session

---

## Core Rule

> **Antigravity IDE không hỗ trợ native sub-agent spawning.**
> 
> Thay vì execute `Task()` trực tiếp, chuyển thành **spawn prompt** cho human copy sang session mới.

---

## Transformation Pattern

### Khi gặp Task() call:

```
Task(prompt="...", subagent_type="...", model="...", description="...")
```

### Transform thành:

**Step 1:** Create spawn prompt file

```bash
# MANDATORY: Tạo file spawn prompt (KHÔNG display trong chat)
# Path: trong thư mục orchestration-tracking của sprint hiện tại
.makeit/sprint/SPRINT-NNN/orchestration-tracking/SPAWN-{id}-{kebab-description}.md

# Ví dụ:
.makeit/sprint/SPRINT-001/orchestration-tracking/SPAWN-01-design-research.md
.makeit/sprint/SPRINT-001/orchestration-tracking/SPAWN-02-story-writing.md
```

**Step 2:** File content với 5 sections

```xml
<agent_role>
<!-- INLINE toàn bộ nội dung từ agent file được reference -->
<!-- Không dùng @ syntax vì không work cross-session -->
</agent_role>

<project_context>
<!-- MINIMAL inline — chỉ 2-3 dòng critical:
- Project name
- Current phase number + name
- Phase goal
-->
</project_context>

<files_to_read>
<!-- LIST file paths cho subagent tự đọc:
- .makeit/sprint/SPRINT-NNN/SPECS.md
- .makeit/sprint/SPRINT-NNN/STATE.md
- .makeit/sprint/SPRINT-NNN/ROADMAP.md
- {task-specific files: PLAN.md, etc.}
-->
</files_to_read>

<your_task>
<!-- COPY nội dung prompt từ Task() call -->
</your_task>

<output_requirements>
<!-- Output file paths và formats expected -->
</output_requirements>

<when_complete>
✅ {AGENT_TYPE} COMPLETE

📁 Files Created:
- [list output files]

📝 Summary:
- [Key outcome 1]
- [Key outcome 2]

🔙 Quay lại orchestrator session và nói: "{return_trigger}"
</when_complete>
```

**Step 3:** Display spawn instruction (ngắn gọn)

```
┌─────────────────────────────────────────────────────────────┐
│ SPAWN: {description}                                        │
│                                                             │
│ 📄 Prompt file: .makeit/sprint/SPRINT-NNN/                  │
│    orchestration-tracking/SPAWN-xx.md                       │
│                                                             │
│ 1. Mở new Antigravity session                               │
│ 2. Mở file trên và copy toàn bộ content vào session mới    │
│ 3. Để agent hoàn thành task                                 │
│ 4. Quay lại session này và nói: "{return_trigger}"          │
└─────────────────────────────────────────────────────────────┘
```

**Step 4:** Wait for return trigger

**Step 5:** Verify output

```bash
ls -la {expected_output_file}
```

**Step 6:** Continue workflow

---

## Parallel Spawns

Khi workflow yêu cầu parallel agent execution:

1. Generate TẤT CẢ spawn prompts
2. Display với labels (Spawn 1/4, Spawn 2/4, etc.)
3. Inform human: "Có thể mở N sessions song song hoặc làm tuần tự"
4. Wait for ALL return triggers trước khi continue

---

## State Tracking

Maintain state trong `orchestration-tracking/` folder của sprint hiện tại:

### Folder Structure

```
.makeit/sprint/SPRINT-NNN/
├── orchestration-tracking/
│   ├── STATE.md                      # Orchestration state tracking
│   ├── SPAWN-01-design-research.md   # Spawn prompt file
│   ├── SPAWN-02-story-writing.md     # Spawn prompt file
│   └── ...
├── SPECS.md
├── STATE.md
├── ROADMAP.md
└── ...
```

### STATE.md Format (orchestration-tracking/)

```markdown
# Orchestration State

## Pending Spawns
| ID | Type | Prompt File | Status | Return Trigger |
|----|------|-------------|--------|----------------|
| 01 | Researcher | SPAWN-01-design-research.md | pending | "research complete" |

## Completed Spawns
| ID | Type | Prompt File | Completed | Output |
|----|------|-------------|-----------|--------|
| 01 | Researcher | SPAWN-01-design-research.md | 2026-02-14 | .makeit/sprint/SPRINT-001/RESEARCH.md |
```

---

## Return Trigger Format

| Agent Type | Return Trigger |
|------------|----------------|
| Researcher | "{topic} research complete" |
| Planner | "planning complete" |
| Executor | "execution complete" |
| Checker | "check complete" |
| Verifier | "verification complete" |

---

## Agent File Reference

Agent definitions trong `.agent/agents/`:

```bash
ls .agent/agents/makeit-*.md
```

Mỗi role có bộ agents riêng (researcher, planner, executor, verifier).

---

## Resume from Checkpoint

Khi session restart:

1. Check `orchestration-tracking/STATE.md` trong sprint hiện tại
2. For each pending spawn:
   - Ask: "Did {spawn_type} complete?"
   - If yes → Verify output, move to Completed
   - If no → Re-display spawn prompt
3. Continue from current position

---

## Exceptions

Rule này **KHÔNG** apply khi:
- Workflow explicitly says "execute in current session"
- Task is simple enough to do inline (e.g., file operations)
- User explicitly requests single-session execution

---

## Context Efficiency Rule

**NEVER inline full file contents in spawn prompts.** Instead:

| Section | What to Include | What NOT to Include |
|---------|----------------|---------------------|
| `<agent_role>` | Full agent definition (MUST inline — can't cross-reference) | — |
| `<project_context>` | Project name, current phase, phase goal (2-3 lines) | Full STATE.md, ROADMAP.md, SPECS.md |
| `<files_to_read>` | List of files subagent needs | File contents |
| `<your_task>` | Task description + output paths | Full file contents |
| `<output_requirements>` | Output file paths + formats | — |

**Why:** Subagents run in fresh 200K context. They can read files themselves.
Inlining wastes the orchestrator's context and makes spawn prompts 2-3x larger than needed.

---

*Package: MakeIt HITL Addon*
*Adapted from GSD Framework HITL patterns*
