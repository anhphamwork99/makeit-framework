---
name: lark-task-reference
description: Reference guide for creating Lark Tasks via Lark MCP during stage-complete
---

<purpose>
Shared reference for creating Lark Tasks via Lark MCP at sprint completion. All stage-complete skills reference this guide when creating tasks for receivers.
</purpose>

## When to Create

Create Lark Tasks at `stage-complete`, **AFTER** the handoff template is filled but **BEFORE** git commit.

```
package_deliverables → git_sync → create_handoff → ★ create_lark_tasks ★ → commit_handoff_to_git
```

## Creation Pattern

All tasks are created **simultaneously** (batch) — not one-by-one.

```
For each task in HANDOFF "Tasks For Receiver" table:
  1. Call Lark MCP to create task
     - Title: task description from table
     - Assignee: Lark display name (if known) or empty
     - Description: "Sprint SPRINT-{NNN} task from {role}. See HANDOFF: .makeit/sprint/SPRINT-{NNN}/{role}/HANDOFF.md"
  2. Receive Lark Task ID from API response
  3. Write Lark Task ID back to HANDOFF task table "Lark ID" column
```

## Core Fields

| Field | Required | Description |
|-------|----------|-------------|
| `Title` | ✅ | Task name from HANDOFF task table |
| `Assignee` | ❌ | Lark display name (e.g., `Anh Pham`) or empty |
| `Description` | ✅ | 1-2 sentence context + link to HANDOFF.md path |

> Role-specific fields (Figma link, PR link, API contract, etc.) are defined in each role's handoff template. Core fields above are the minimum for Lark Task creation.

## Assignee Behavior

- Sender **CAN** pre-assign if they know who should do it
- If no assignee specified → leave Assignee column = `—`
- Receiver will self-assign via `start-my-tasks` command
- Agent queries Lark MCP using user's Lark display name from `.makeit/config.yml`

## Fallback Pattern

If Lark MCP is unavailable (error, timeout, not configured):

```
1. Mark all task Lark IDs as "Pending" in HANDOFF task table
2. Add note to HANDOFF.md:
   "⚠️ Lark Tasks chưa tạo — Lark MCP unavailable. Tạo manual hoặc retry sau."
3. Log todo in STATE.md:
   "TODO: Create Lark tasks for SPRINT-{NNN} manually"
4. Continue with git commit normally — handoff is still valid
```

> The handoff process is NOT blocked by Lark MCP unavailability. HANDOFF.md is always created and committed regardless.

## Pipeline Targets

| Sender | Receiver | Example Tasks |
|--------|----------|---------------|
| PO | BA + Designer | Story breakdown, Design analysis |
| BA | TL | Task breakdown from stories, Estimate |
| TL (Mode 1) | Dev FE/BE | Implement component, Build API endpoint |
| TL (Mode 2) | PO | Review deployed feature, Verify AC |
| Dev FE | TL | Review PR, Check component quality |
| Dev BE | TL | Review PR, Verify API security, Check test coverage |

## Integration with HANDOFF.md

HANDOFF.md task table format (5 columns):

```markdown
| # | Task | Lark ID | Assignee | Dependencies |
|---|------|---------|----------|--------------|
| 1 | {task description} | LRK-xxx | {name or —} | — |
| 2 | {task description} | LRK-yyy | {name or —} | LRK-xxx |
```

After Lark Task creation, the `Lark ID` column is populated with actual IDs.
After fallback, the `Lark ID` column shows `Pending`.
