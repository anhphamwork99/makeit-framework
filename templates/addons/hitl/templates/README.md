# HITL (Human-in-the-Loop) Templates

Templates cho Human-in-the-Loop orchestration pattern trong Antigravity IDE.

---

## Overview

Antigravity IDE không hỗ trợ native custom subagent spawning.
HITL pattern cho phép human đóng vai trò orchestrator thủ công:

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Orchestrator  │────▶│    Human     │────▶│   Sub-agent     │
│    Session      │     │  (open file) │     │    Session      │
└─────────────────┘     └──────────────┘     └─────────────────┘
        │                                            │
        │                                            │
        │◀───────────────────────────────────────────┘
        │         (return trigger + files)
```

---

## Files in Directory

| File | Purpose |
|------|---------|
| `spawn-prompt.md` | Template cấu trúc cho spawn prompts |
| `completion-signal.md` | Format chuẩn khi sub-agent hoàn thành |
| `orchestration-state-schema.md` | Schema cho state tracking |
| `examples/` | Example spawn prompts |

---

## Quick Start

### 1. Tạo Spawn Prompt File (MANDATORY)

Orchestrator **PHẢI tạo file** thay vì display trong chat:

```bash
# Tạo spawn prompt file (trong sprint hiện tại)
.makeit/sprint/SPRINT-NNN/orchestration-tracking/SPAWN-01-xxx.md

# Update state
.makeit/sprint/SPRINT-NNN/orchestration-tracking/STATE.md
```

### 2. Human Executes Spawn

1. Mở file spawn prompt từ `orchestration-tracking/`
2. Mở new Antigravity session
3. Copy toàn bộ file content vào session mới
4. Let agent complete task
5. Agent shows completion signal
6. Close session, return to orchestrator

### 3. Update Orchestration State

Nói return trigger với orchestrator:
- "research complete"
- "planning complete"
- "execution complete"
- "verification complete"

---

## Agent Reference

Agent files nằm trong `.agent/agents/`. Liệt kê:
```bash
ls .agent/agents/makeit-*.md
```

Template không maintain danh sách agents — mỗi workflow biết nó cần spawn agent nào.

---

## Inline vs Reference

### Trong cùng session (@ works):
```xml
<agent_role>
@.agent/agents/makeit-ba-researcher.md
</agent_role>
```

### Cross-session (phải INLINE):
```xml
<agent_role>
<!-- Đọc file và paste nội dung trực tiếp -->
You are a MakeIt researcher agent. You investigate...
[full content from agent file]
</agent_role>
```

**Quy tắc:** @ syntax chỉ work trong cùng session. Khi copy sang session mới, phải inline tất cả content.

---

## Workflow Integration

| MakeIt Command | Spawns Needed |
|----------------|---------------|
| `/makeit:execute-phase` | Executor ×N → Verifier |
| `/makeit:research-phase` | Researcher → (optional) Synthesizer |
| `/makeit:plan-phase` | Planner → Checker |

---

## Troubleshooting

### Sub-agent không hiểu context
- ✅ Đảm bảo INLINE đủ content (không dùng @ cross-session)
- ✅ Include project summary, phase info, key decisions

### Output file không đúng format
- ✅ Cung cấp clear output_requirements
- ✅ Reference template/example nếu có

### Orchestrator mất track state
- ✅ Luôn update orchestration-tracking/STATE.md
- ✅ Verify output files exist trước khi continue

### Agent bị blocked
- ✅ Đọc blocker details từ completion signal
- ✅ Provide missing info/resources
- ✅ Re-spawn với additional context

---

*Package: MakeIt HITL Addon*
