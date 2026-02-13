# Spawn Prompt Template

Template cho việc tạo spawn prompts trong HITL orchestration pattern.

---

## Overview

Khi cần spawn một sub-agent session, **PHẢI tạo spawn prompt thành file** trong folder `orchestration-tracking/` của sprint hiện tại.

### File Naming Convention

```
.makeit/sprint/SPRINT-NNN/orchestration-tracking/SPAWN-{ID}-{kebab-description}.md

# Ví dụ:
SPAWN-01-design-research.md
SPAWN-02-story-writing.md
SPAWN-03-task-breakdown.md
```

### Important Notes

1. **KHÔNG display prompt dài trong chat** — tạo file và chỉ reference file path
2. **INLINE content** — Khi copy sang session mới, @ syntax không work cross-session
3. **Update STATE.md** — Sau khi tạo spawn file, update `orchestration-tracking/STATE.md`

---

## Template Structure

```xml
<agent_role>
<!-- Reference existing agent file, sau đó INLINE nội dung khi copy -->
@.agent/agents/{agent-file}.md

<!-- Hoặc inline trực tiếp nếu copy sang session mới -->
</agent_role>

<project_context>
**Project:** {project_name}
**Current Phase:** {phase_number} - {phase_name}
**Phase Goal:** {phase_goal}
</project_context>

<files_to_read>
Read these files at execution start using the Read tool:
- .makeit/sprint/SPRINT-NNN/SPECS.md
- .makeit/sprint/SPRINT-NNN/STATE.md
- .makeit/sprint/SPRINT-NNN/ROADMAP.md
- {additional task-specific files}

Do NOT skip file reading — your context is fresh, use it.
</files_to_read>

<your_task>
{task_description}

**Output files cần tạo:**
- {output_file_1}
- {output_file_2}
</your_task>

<output_requirements>
**File paths:**
- {output_path_1}
- {output_path_2}

**Format requirements:**
- {format_requirement_1}
- {format_requirement_2}
</output_requirements>

<when_complete>
Sử dụng completion signal format:

✅ {AGENT_TYPE} COMPLETE

📁 Files Created:
- {list files}

📝 Summary:
- {key outcome 1}
- {key outcome 2}

🔙 Return and say: "{return_trigger}"
</when_complete>
```

---

## Placeholders Reference

| Placeholder | Source | Description |
|-------------|--------|-------------|
| `{agent-file}` | `.agent/agents/` | File name của agent definition |
| `{project_name}` | SPECS.md | Tên project/sprint |
| `{phase_number}` | ROADMAP.md | Phase hiện tại |
| `{phase_name}` | ROADMAP.md | Tên phase |
| `{task_description}` | Workflow logic | Mô tả cụ thể task |
| `{return_trigger}` | Completion signal | Phrase để nói khi done |

---

## Cross-Session Usage

**Khi tạo spawn prompt cho session mới:**

1. ✅ INLINE nội dung từ agent file (đọc và paste — can't cross-reference)
2. ✅ INLINE minimal project context (name, phase, goal — 3 lines only)
3. ✅ LIST file paths cho subagent tự đọc (trong `<files_to_read>`)
4. ❌ KHÔNG inline full file contents (SPECS.md, STATE.md, etc.)
5. ❌ KHÔNG dùng @ syntax (không work cross-session)

**Why paths instead of inline:**
- Subagent có 200K fresh context — đủ để đọc files
- Inline bloats spawn prompt 2-3x (waste orchestrator context)
- Subagent đọc files = freshest data (không stale từ orchestrator cache)

---

## Return Triggers

| Agent Type | Success Trigger | Blocked Trigger |
|------------|-----------------|-----------------|
| Researcher | "research complete" | "research blocked" |
| Planner | "planning complete" | "planning blocked" |
| Executor | "execution complete" | "execution blocked" |
| Verifier | "verification complete" | "verification blocked" |

---

*Package: MakeIt HITL Addon*
