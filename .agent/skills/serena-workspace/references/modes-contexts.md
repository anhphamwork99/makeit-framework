# Serena Contexts & Modes — MakeIt Mapping

## Overview

Serena sử dụng **contexts** (môi trường hoạt động) và **modes** (behavior refinement) để tùy chỉnh cách tools hoạt động. Document này map Serena concepts sang MakeIt workflow.

## Contexts

| Context | Mô tả | Khi nào dùng |
|---------|--------|-------------|
| `desktop-app` | Full GUI client | ❌ Không dùng trong MakeIt |
| `claude-code` | Claude Code terminal | ❌ Không dùng trong MakeIt |
| `codex` | OpenAI Codex | ❌ Không dùng trong MakeIt |
| `ide` | IDE integration | ✅ Khi dùng Serena qua IDE MCP |
| `agent` | Generic agent context | ✅ **Default cho MakeIt** — phù hợp nhất |

> **Recommendation:** Luôn sử dụng context `agent` cho MakeIt integration.

## Modes

| Mode | Behavior | Capabilities |
|------|----------|-------------|
| `planning` | Read-only analysis | `find_symbol`, `find_referencing_symbols`, `get_symbols_overview`, `read_file` |
| `editing` | Full code modification | All planning tools + `rename_symbol`, `replace_symbol_body`, `insert_after_symbol` |
| `interactive` | Conversational | Cho interactive sessions |
| `one-shot` | Single task execution | Cho automated tasks |
| `no-onboarding` | Skip memory load | Khi không cần context load |
| `onboarding` | Re-run onboarding | Khi cần refresh memory |
| `no-memories` | Disable memory system | Khi memory không relevant |

## MakeIt Stage → Serena Mode Mapping

| MakeIt Stage | Role(s) | Serena Mode | Rationale |
|-------------|---------|-------------|-----------|
| `map-codebase` | All | `planning` | Chỉ cần đọc code, không sửa |
| `discuss-phase` | All | `planning` | Analysis và discussion, không edit |
| `research-phase` | All | `planning` | Research codebase structure |
| `review-code` | Techlead | `planning` | Code review chỉ đọc, không sửa trực tiếp |
| `execute-phase` | Dev FE, Dev BE | `editing` | Implement code — need full write access |
| `execute-phase` | Techlead | `planning` | TL execute = task breakdown, không write code |
| `execute-phase` | BA | N/A | BA không interact với code |
| `execute-phase` | PO | N/A | PO không interact với code |

## Mode Switching Strategy

### Principle: Least Privilege
Luôn bắt đầu với `planning` mode. Chỉ switch sang `editing` khi:
1. Agent cần thực sự modify code
2. Stage là `execute-phase` cho Dev role
3. User đã confirm intent to edit

### Auto-switch Rules (for future automation)

```
IF stage == "execute-phase" AND role IN ["dev-fe", "dev-be"]:
    mode = "editing"
ELIF stage IN ["map-codebase", "discuss-phase", "research-phase", "review-code"]:
    mode = "planning"
ELSE:
    mode = "planning"  # default safe
```

## Memory + Mode Interaction

| Scenario | Mode | Memory |
|----------|------|--------|
| First time setup | `onboarding` | Auto-load all memories |
| Routine code work | `editing` or `planning` | Auto-load (default) |
| Quick symbol search | `no-onboarding` | Skip memory for faster response |
| Fresh analysis needed | `no-memories` | Ignore cached context |

## Role-Specific Guidelines

### Dev FE / Dev BE
- Start with `planning` khi đọc specs/stories
- Switch to `editing` khi bắt đầu implement
- Sử dụng `find_symbol` + `find_referencing_symbols` trước khi rename/refactor

### Techlead
- Luôn ở `planning` mode
- Focus on `find_referencing_symbols` cho impact analysis
- `get_symbols_overview` cho code review context

### BA / PO
- Thường không cần Serena trực tiếp
- Nếu cần hiểu code structure → `planning` mode với `get_symbols_overview`
