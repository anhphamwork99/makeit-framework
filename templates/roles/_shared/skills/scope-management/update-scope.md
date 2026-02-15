---
name: update-scope
description: Update task scope in committed HANDOFF.md — add/remove/modify tasks, update Lark, notify receiver
trigger: /makeit:update-scope
roles: [po, ba, techlead]
---

# Update Scope — Post-Handoff Task Modification

> Sender modifies committed HANDOFF.md task table after initial handoff. Adds/removes/modifies tasks, updates Lark Tasks, commits changes, and drafts Telegram notification for receiver.

## Purpose

After handoff, scope sometimes changes — new tasks emerge, existing tasks become irrelevant, or priorities shift. Instead of creating a new handoff, the sender updates the existing HANDOFF.md and the receiver syncs changes via `/makeit:sync-scope`.

## When to Use

- New requirement discovered after handoff → add task
- Task no longer needed → cancel task
- Task description needs clarification → modify task
- Priority order changed → reprioritize tasks
- **Senders only:** PO, BA, Techlead

## Pipeline Context

| Sender | Updates HANDOFF for | Receiver |
|--------|-------------------|----------|
| PO | BA | BA |
| BA | TL | TL |
| TL | Dev FE/BE | Dev FE, Dev BE |

## Process

### Step 1: Identify HANDOFF

Find the sender's committed HANDOFF.md in product repo:

```
Path: .makeit/sprint/SPRINT-{NNN}/{sender-role}/HANDOFF.md
```

<process>
1. Read STATE.md to determine current sprint number
2. Determine sender role from GEMINI.md context
3. Locate HANDOFF.md file at expected path
4. If not found: check if handoff was committed yet
   - If no handoff exists: ❌ "Chưa có HANDOFF — hãy hoàn thành sprint trước (`/makeit:complete`)"
   - If path differs: search `.makeit/sprint/` for recent HANDOFF files
</process>

### Step 2: Show Current Tasks

Display the current "Tasks For Receiver" table from HANDOFF.md:

```
📋 Current Tasks — Sprint SPRINT-{NNN}
Receiver: {role}

| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | Implement login API | LRK-001 | Anh Pham | — |
| 2 | Setup database schema | LRK-002 | — | — |
| 3 | Write unit tests | LRK-003 | Anh Pham | LRK-001 |

Total: 3 tasks (2 assigned, 1 unassigned)
```

### Step 3: Collect Changes

Ask sender what changed:

```
🔄 What scope changes do you need?

1. ➕ add — Add new task(s)
2. ❌ remove — Cancel task(s) 
3. ✏️ modify — Change task description, assignee, or dependencies
4. 🔀 reprioritize — Reorder tasks

Enter numbers (e.g., "1" or "1,3") or describe changes in natural language.
```

**For each change type, collect:**

- **add**: Task description, assignee (optional), dependencies (optional)
- **remove**: Task number(s) to cancel + reason
- **modify**: Task number + what to change + new value
- **reprioritize**: New order or specific moves (e.g., "Task 3 before Task 1")

### Step 4: Update HANDOFF

Modify the task table in HANDOFF.md following these rules:

| Change | Action | Marker |
|--------|--------|--------|
| **Add** | Append to table with next `#` | New row |
| **Remove** | Strikethrough text + prefix | `❌ ~~Task description~~` |
| **Modify** | Update in place | `[UPDATED]` suffix |
| **Reprioritize** | Reorder rows | Renumber `#` column |

**Traceability rules:**
- NEVER delete rows — cancelled tasks stay with ❌ prefix for traceability
- Modified tasks include `[UPDATED]` marker so receiver can spot changes
- Added tasks appear at bottom with new sequential number
- Comment line added above table: `<!-- Scope updated: {date} by {role} -->`

**Example after update:**
```markdown
<!-- Scope updated: 2026-02-15 by TL -->
| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | Implement login API | LRK-001 | Anh Pham | — |
| 2 | ❌ ~~Setup database schema~~ | LRK-002 | — | — |
| 3 | Write unit tests | LRK-003 | Anh Pham | LRK-001 |
| 4 | Implement OAuth integration [UPDATED] | LRK-004 | — | LRK-001 |
| 5 | Add rate limiting middleware | — | — | LRK-001 |
```

### Step 5: Update Lark Tasks

If Lark MCP is available:

| Change | Lark Action |
|--------|-------------|
| **New tasks** | Create Lark Task → get ID → write to table |
| **Removed tasks** | Close/cancel existing Lark Task |
| **Modified tasks** | Update Lark Task title/assignee/description |

<lark_mcp_fallback>
If Lark MCP is NOT available:
1. Continue with HANDOFF update (don't block)
2. Mark new tasks with `⚠️ Pending` instead of Lark ID
3. Log pending action in STATE.md:
   ```
   ### Pending Lark Actions
   - [ ] Create Lark Tasks for scope update (Sprint SPRINT-{NNN})
   ```
4. Inform user: "Lark Tasks chưa được tạo — cần tạo manual hoặc retry khi Lark MCP available"
</lark_mcp_fallback>

### Step 6: Git Commit + Push

Commit the updated HANDOFF.md:

```bash
git add .makeit/sprint/SPRINT-{NNN}/{role}/HANDOFF.md
git commit -m "scope({role}): Sprint {NNN} — scope update: {brief description}"
git push
```

**Commit message examples:**
- `scope(tl): Sprint 001 — scope update: added OAuth task, cancelled DB schema task`
- `scope(ba): Sprint 002 — scope update: modified 2 story descriptions`
- `scope(po): Sprint 003 — scope update: added onboarding feature stories`

### Step 7: Draft Notification

Generate Telegram message for receiver:

```
⚠️ Scope Update — Sprint SPRINT-{NNN}
From: {sender role}

Changes:
➕ Added: {N} task(s)
❌ Removed: {N} task(s)
✏️ Modified: {N} task(s)
🔀 Reprioritized: {yes/no}

Summary: {brief description of what changed and why}

Action: Run `/makeit:sync-scope` to pull changes
```

Display the message for sender to copy to Telegram.

## Edge Cases

<edge_cases>
- **Multiple receivers (TL → FE + BE)**: Update affects both receivers. Draft separate notifications if changes are role-specific
- **Receiver already completed task**: If a removed task was already done, note in HANDOFF comment: `<!-- Task 2 cancelled but already completed by receiver -->`
- **No HANDOFF found**: Block — cannot update scope without existing handoff
- **HANDOFF format legacy (no task table)**: Warn user that scope update requires new HANDOFF format. Suggest re-running `/makeit:complete` with updated template
- **Lark Task ID mismatch**: If Lark Task referenced in table no longer exists in Lark, log warning and clear the ID field
</edge_cases>

## Integration

- Called by `/makeit:update-scope` workflow router
- Pair with `/makeit:sync-scope` (receiver-side)
- References HANDOFF.md format from `templates/handoff/`
