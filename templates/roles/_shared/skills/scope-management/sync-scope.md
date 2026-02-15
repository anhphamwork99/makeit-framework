---
name: sync-scope
description: Pull latest scope changes from upstream HANDOFF.md, show diff, update workspace
trigger: /makeit:sync-scope
roles: [po, ba, techlead, dev-fe, dev-be]
---

# Sync Scope — Receiver Pulls Scope Changes

> Receiver pulls latest HANDOFF.md changes from product repo, detects scope modifications, shows diff, and updates local workspace (MY-TASKS.md).

## Purpose

When a sender updates the scope via `/makeit:update-scope`, the receiver needs to pull those changes and see what's different. This skill provides a clear diff view and updates the local task list accordingly.

## When to Use

- After receiving a "⚠️ Scope Update" Telegram notification
- Periodically to check if upstream made changes
- Before starting a new task to ensure list is current
- **All roles:** PO, BA, TL, Dev FE, Dev BE

## Pipeline Context

| Receiver | Syncs from |
|----------|-----------|
| BA | PO |
| TL | BA (Mode 1) or Dev FE/BE (Mode 2) |
| Dev FE | TL |
| Dev BE | TL |
| PO | TL (Mode 2 — result review) |

## Process

### Step 1: Git Pull

Pull latest changes from product repo:

```bash
git pull origin main
```

<process>
1. Check if inside product repo (has `.makeit/` folder)
2. Run `git pull`
3. Check for merge conflicts
   - If conflicts in HANDOFF.md: ⚠️ "Merge conflict detected — resolve manually before continuing"
   - If clean pull: continue
4. If nothing to pull: proceed to Step 2 (changes may already be local)
</process>

### Step 2: Detect Changes

Compare current workspace tasks (MY-TASKS.md) with updated HANDOFF.md:

<process>
1. Read STATE.md to determine current sprint and upstream sender
2. Locate upstream HANDOFF.md:
   - Path: `.makeit/sprint/SPRINT-{NNN}/{sender-role}/HANDOFF.md`
3. Read HANDOFF.md task table — look for scope update markers:
   - `<!-- Scope updated: {date} by {role} -->` comment
   - `❌ ~~...~~` cancelled tasks
   - `[UPDATED]` modified tasks
   - New rows since last sync
4. Read current MY-TASKS.md from local workspace:
   - Path: `.makeit/sprint/SPRINT-{NNN}/MY-TASKS.md`
5. Compare task lists:
   - Tasks in HANDOFF but not in MY-TASKS → **Added**
   - Tasks cancelled in HANDOFF but active in MY-TASKS → **Removed**
   - Tasks with `[UPDATED]` marker → **Modified**
   - Task order different → **Reprioritized**
6. If no differences found: inform user and exit early
</process>

### Step 3: Show Diff

Display changes in a clear, actionable format:

```
📋 Scope Changes Detected — Sprint SPRINT-{NNN}
From: {sender role}
Updated: {date from comment}

➕ Added:
- Task 5: Add rate limiting middleware (⚠️ Pending) — Assignee: unassigned

❌ Removed:
- Task 2: Setup database schema (LRK-002) — CANCELLED

✏️ Modified:
- Task 4: "Setup OAuth" → "Implement OAuth integration [UPDATED]" (LRK-004)

🔀 Reprioritized: No

📊 Impact: 4 total tasks → 4 active tasks (1 cancelled, 1 added)
```

**If no changes detected:**
```
✅ No scope changes found — HANDOFF is up to date.
Last checked: {timestamp}
```

### Step 4: Update Workspace

Ask receiver to confirm and apply changes:

<process>
1. Show summary of proposed changes to MY-TASKS.md
2. Ask for confirmation:
   ```
   Apply these scope changes to your workspace?
   - ➕ Add {N} new task(s)
   - ❌ Remove {N} cancelled task(s)
   - ✏️ Update {N} modified task(s)
   
   [Y/n]
   ```
3. On confirmation:
   - **Added tasks assigned to current user**: Auto-add to MY-TASKS.md
   - **Added tasks NOT assigned to current user**: Add to MY-TASKS.md but mark as "available" (user can pick up later)
   - **Removed tasks NOT started**: Remove from MY-TASKS.md cleanly
   - **Removed tasks IN PROGRESS**: ⚠️ Warning — show special handling:
     ```
     ⚠️ Task 2 was CANCELLED but you have work in progress.
     Options:
     1. Discard WIP and remove task
     2. Keep WIP as reference (mark as cancelled in MY-TASKS.md)
     3. Discuss with sender before proceeding
     ```
   - **Modified tasks**: Update description/assignee in MY-TASKS.md
4. Update MY-TASKS.md with changes applied
5. Record sync timestamp:
   ```
   <!-- Last scope sync: {date} -->
   ```
</process>

### Step 5: Update Lark (if applicable)

If Lark MCP is available and there are Lark Task changes:

| Change | Lark Action |
|--------|-------------|
| **New tasks self-assigned** | Update Lark Task assignee to current user |
| **Removed tasks** | No action (sender already cancelled in Lark) |
| **Status changes** | Sync local status with Lark Task status |

<lark_mcp_fallback>
If Lark MCP is NOT available:
- Skip Lark sync step
- Note in output: "Lark sync skipped — check Lark Tasks manually if needed"
</lark_mcp_fallback>

## Edge Cases

<edge_cases>
- **Receiver has already started removed tasks**: Show warning with 3 options (discard, keep as reference, discuss with sender). NEVER auto-delete WIP
- **No changes detected**: "No scope changes found. HANDOFF is up to date." — exit cleanly
- **HANDOFF format is legacy (no task table)**: Fall back to full `git diff` view of HANDOFF.md. Show raw diff and let user interpret
- **No MY-TASKS.md exists**: First time receiving — treat all HANDOFF tasks as new. Create MY-TASKS.md from scratch (suggest `/makeit:start-my-tasks` instead)
- **Multiple senders (TL receiving from BA + Dev)**: Check both sender HANDOFF paths. Show changes grouped by sender
- **Merge conflicts in HANDOFF.md**: Block sync — user must resolve merge conflict first
- **Stale workspace (multiple scope updates missed)**: Show all accumulated changes since last sync timestamp
</edge_cases>

## Output

Display diff summary in chat. If changes were applied, confirm with updated task count:

```
✅ Scope synced — Sprint SPRINT-{NNN}
Active tasks: {N} (was {M})
Changes applied: +{added} -{removed} ~{modified}
```

## Integration

- Called by `/makeit:sync-scope` workflow router
- Pair with `/makeit:update-scope` (sender-side)
- References MY-TASKS.md from workspace
- References HANDOFF.md from product repo
