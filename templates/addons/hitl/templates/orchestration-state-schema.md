# Orchestration State Schema

Định nghĩa cấu trúc cho `orchestration-tracking/STATE.md` — file tracking spawn status trong mỗi sprint.

---

## Folder Structure

```
.makeit/sprint/SPRINT-NNN/
├── orchestration-tracking/       # HITL tracking (created when first spawn)
│   ├── STATE.md                  # Orchestration state (file này)
│   ├── SPAWN-01-xxx.md           # Spawn prompt files
│   ├── SPAWN-02-xxx.md
│   └── ...
├── SPECS.md
├── STATE.md                      # Sprint state (different from orchestration STATE)
├── ROADMAP.md
└── ...
```

---

## STATE.md Structure

```markdown
# 🎭 Orchestration State

**Sprint:** SPRINT-NNN
**Pattern:** Human-in-the-Loop (HITL)

---

## Current Position

| Field | Value |
|-------|-------|
| Command | /makeit:{command} |
| Phase | {N} |
| Step | {step_name} |
| Status | {status} |

---

## Pending Spawns

| ID | Type | Prompt File | Status | Output File | Return Trigger |
|----|------|-------------|--------|-------------|----------------|
| 01 | {type} | SPAWN-01-xxx.md | {pending/in_progress} | {path} | "{trigger}" |

---

## Completed Spawns

| ID | Type | Prompt File | Completed At | Output File | Notes |
|----|------|-------------|--------------|-------------|-------|
| 01 | {type} | SPAWN-01-xxx.md | {datetime} | {path} | {notes} |

---

## Spawn Queue

**Next:** {description or "None"}

**Prompt file:** {path if applicable}
**Expected output:** {expected_file}

---

## Session Continuity

| Field | Value |
|-------|-------|
| Last Updated | {datetime} |
| Next Action | {description} |
| Resume Note | {instruction} |

---

## History

| Timestamp | Event |
|-----------|-------|
| {datetime} | {event_description} |
```

---

## Field Definitions

### Current Position

| Field | Type | Description |
|-------|------|-------------|
| Command | string | Active command (execute-phase, plan-phase, etc.) |
| Phase | number | Current phase number |
| Step | string | Current step within workflow |
| Status | enum | `planning`, `spawning`, `waiting`, `verifying`, `complete` |

### Pending Spawns Table

| Field | Type | Description |
|-------|------|-------------|
| ID | string | Unique spawn identifier (01, 02, ...) |
| Type | string | Agent type (researcher, planner, executor, etc.) |
| Prompt File | string | Spawn prompt file name in orchestration-tracking/ |
| Status | enum | `pending`, `in_progress`, `waiting_return` |
| Output File | string | Expected output file path |
| Return Trigger | string | Phrase user should say when done |

### Completed Spawns Table

| Field | Type | Description |
|-------|------|-------------|
| ID | string | Spawn identifier |
| Type | string | Agent type |
| Prompt File | string | Spawn prompt file name (keep for history) |
| Completed At | datetime | Completion timestamp (YYYY-MM-DD HH:MM) |
| Output File | string | Actual output file path |
| Notes | string | Success, blocked, or issue notes |

---

## State Transitions

```
spawn created      → pending (in Pending table)
human copies prompt → in_progress
sub-agent starts    → in_progress
sub-agent completes → waiting_return
human says trigger  → completed (move to Completed table)
all spawns done     → step advances
```

---

## Usage by Orchestrator

### At Session Start:
1. Read `orchestration-tracking/STATE.md` trong sprint hiện tại
2. Check `Current Position` for context
3. Check `Pending Spawns` for in_progress items
4. If in_progress exists → ask user for status

### After Spawn Generation:
1. Add entry to `Pending Spawns`
2. Update `Current Position.Status` to "spawning"
3. Update `Spawn Queue` with next spawn info

### After User Returns:
1. Move spawn from Pending → Completed
2. Verify output file exists
3. Update `Current Position.Step`
4. Check if more spawns needed

---

*Package: MakeIt HITL Addon*
