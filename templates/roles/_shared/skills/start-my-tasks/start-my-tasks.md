---
name: start-my-tasks
description: Select personal tasks from HANDOFF, optionally query Lark for details, create focused workspace
trigger: /makeit:start-my-tasks
---

# Start My Tasks — Task Selection & Workspace Creation

> Đọc HANDOFF.md từ upstream role, hiển thị danh sách tasks, cho user chọn tasks của mình, tạo workspace tập trung.

## Purpose

Thay thế `clarify` như entry point cho receivers (BA, TL, Dev FE, Dev BE). Thay vì đọc toàn bộ handoff rồi tự phân tích, user chọn cụ thể Lark Tasks được assign cho mình và nhận workspace tập trung chỉ chứa tasks đã chọn.

## When to Use

- Sau khi chạy `/makeit:check-handoff` và đã preview handoff summary
- Khi muốn bắt đầu work trên tasks được assign
- Khi nhận notification từ upstream role và muốn start ngay

## Parameters (from role wrapper)

| Parameter | Description | Example |
|-----------|-------------|---------|
| `upstream_role` | Role that sent the handoff | `po`, `ba`, `tl` |
| `handoff_path` | Path to HANDOFF.md | `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md` |
| `section_filter` | Optional — filter specific section | `§ For FE`, `§ For BE` |
| `next_command` | What to recommend after workspace creation | `/makeit:plan-phase` |

## Process

### Step 1: Read HANDOFF

Find and read the HANDOFF.md from upstream role:

```
Read file at: {handoff_path}
```

The `handoff_path` is provided by the role-specific wrapper:
- BA reads: `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md`
- TL reads: `.makeit/sprint/SPRINT-{NNN}/ba/HANDOFF.md` (Mode 1) or `fe/HANDOFF.md` + `be/HANDOFF.md` (Mode 2)
- Dev FE reads: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`
- Dev BE reads: `.makeit/sprint/SPRINT-{NNN}/tl/HANDOFF.md`

Sprint number: detect from latest sprint folder in `.makeit/sprint/` or ask user.

If HANDOFF.md NOT found:
```
❌ No HANDOFF.md found at {handoff_path}.

Verify upstream role has completed `/makeit:complete` and committed HANDOFF.md.
Run `/makeit:check-handoff` first to pull and verify.
```

### Step 2: Extract Task Table

Parse the "Tasks For Receiver" section from HANDOFF.md.

**Expected format (5-column table):**
```
| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | Analyze login user stories | LRK-001 | Anh Pham | — |
| 2 | Design API contracts | LRK-002 | — | LRK-001 |
| 3 | Create user flow docs | LRK-003 | Minh Tran | — |
```

If `section_filter` is provided (e.g., `§ For FE`):
- Only parse the subsection matching the filter
- TL handoff has `### For FE` and `### For BE` subsections

If no task table found (legacy format):
- Fall back to showing the full handoff summary
- Warn: `⚠️ Legacy handoff format — no task table found. Showing full handoff instead.`
- Recommend: `/makeit:clarify` instead (old flow)

### Step 3: Smart Defaults

Read user identity from `.makeit/config.md`:
```yaml
user_name: "Anh Pham"
```

Match `user_name` against `Assignee` column in task table.

**Display task list with smart highlighting:**

```
📋 Tasks from {upstream_role} — Sprint SPRINT-{NNN}

Your tasks (matched by user_name "{user_name}"):
✅ 1. Analyze login user stories (LRK-001)
✅ 2. Design API contracts (LRK-002)

Other tasks:
○ 3. Create user flow docs (LRK-003) — Assigned to: Minh Tran
○ 4. Setup CI pipeline (LRK-004) — Unassigned

Select tasks: [Enter] to confirm highlighted, or type numbers (e.g., "1,2,4")
```

**Auto-confirm rule:** If ALL tasks are assigned to current user → skip selection, auto-confirm:
```
📋 All {N} tasks are assigned to you. Auto-confirming selection.
```

**No match rule:** If no tasks match user_name and all are assigned to others:
```
⚠️ No tasks assigned to you in this handoff.

All tasks are assigned to other team members:
○ 1. Task A — Assigned to: Minh Tran
○ 2. Task B — Assigned to: Duc Nguyen

Do you want to claim any tasks? Type numbers (e.g., "1,2") or "skip" to exit.
```

### Step 4: Auto-Assign

For each selected task that has **no assignee**:
1. Auto-assign to current user's Lark display name
2. Update Lark Task assignee via Lark MCP (if available):
   ```
   🔄 Auto-assigning "Setup CI pipeline" (LRK-004) to you...
   ✅ Assigned via Lark MCP
   ```
3. If Lark MCP unavailable:
   ```
   ⚠️ Lark MCP not available — task noted as yours locally.
   📝 Remember to manually assign LRK-004 in Lark.
   ```

No confirmation needed for auto-assign — reduces friction (CONTEXT.md Decision #10).

### Step 5: Create Focused Workspace

Create sprint workspace scoped to selected tasks only:

```
.makeit/sprint/SPRINT-{NNN}/{role}/
├── MY-TASKS.md      ← Selected tasks with full details
├── SPECS.md         ← Scoped acceptance criteria for selected tasks
├── STATE.md         ← Initialized with task list
└── phases/          ← Empty, populated during plan-phase
```

**MY-TASKS.md content:**
```markdown
# My Tasks — Sprint SPRINT-{NNN}

Selected: {N} of {total} tasks from {upstream_role} handoff

| # | Task | Lark ID | Dependencies | Status |
|---|------|---------|--------------|--------|
| 1 | {task} | {id} | {deps} | 🔘 Not started |
| 2 | {task} | {id} | {deps} | 🔘 Not started |

## Source
- HANDOFF: `.makeit/sprint/SPRINT-{NNN}/{upstream}/HANDOFF.md`
- Sprint: SPRINT-{NNN}
- Date selected: {timestamp}
```

**SPECS.md content:** Extract relevant acceptance criteria from HANDOFF.md's shared context and upstream deliverables. Scope to selected tasks only.

**STATE.md content:** Initialize with selected task list as the working scope. No full ROADMAP needed — selected tasks = the roadmap.

### Step 6: Recommend Next Action

```
✅ Workspace created with {N} tasks.

📁 Files created:
- .makeit/sprint/SPRINT-{NNN}/{role}/MY-TASKS.md
- .makeit/sprint/SPRINT-{NNN}/{role}/SPECS.md
- .makeit/sprint/SPRINT-{NNN}/{role}/STATE.md

💡 Next step: Run `{next_command}` to plan implementation for your tasks.
```

## Edge Cases

<edge_cases>

**Legacy handoff format (no task table):**
Fall back to showing full handoff summary. Recommend `/makeit:clarify` instead. Do NOT block — gracefully degrade.

**All tasks assigned to current user:**
Skip selection prompt, auto-confirm all tasks. Show: "All {N} tasks are assigned to you. Auto-confirming."

**No tasks match and all assigned:**
Show warning. Ask if user wants to claim any tasks. Allow "skip" to exit without creating workspace.

**Lark Task IDs are "Pending":**
Note that Lark sync is pending. Use sequential task numbers (#1, #2...) as identifiers instead. Add reminder to STATE.md:
```
⚠️ Lark task IDs pending — run /makeit:sync-scope when Lark MCP available.
```

**Config file missing user_name:**
Show all tasks without smart highlighting. Warn: "Set user_name in .makeit/config.md for auto-filtering next time."

**Empty task table:**
Show warning: "No tasks found in handoff. Check if upstream completed task breakdown." Don't create workspace.

**Multiple handoffs from same sprint (TL Mode 2 — both FE and BE):**
Read both `fe/HANDOFF.md` and `be/HANDOFF.md`. Merge task tables. Let TL select from combined list.

</edge_cases>

## Integration

This skill is called by role-specific wrappers:
- `ba-discovery/start-my-tasks.md`
- `tl-discovery/start-my-tasks.md`
- `fe-discovery/start-my-tasks.md`
- `be-discovery/start-my-tasks.md`

Each wrapper sets `upstream_role`, `handoff_path`, `section_filter`, and `next_command`.

**Not available for PO** — PO uses `/makeit:start-sprint` with Mode 2 detection (CONTEXT.md Decision #11).
