---
name: what-new
description: Check framework updates and guide user through applying changes to current workspace
trigger: /makeit:what-new
---

# What's New — Framework Update Assistant

> Kiểm tra phiên bản framework, hiển thị thay đổi mới, và hướng dẫn user apply updates vào workspace hiện tại.

## Purpose

Khi framework maintainer release version mới (thêm skills, fix bugs, cải thiện workflows), user cần biết **có gì mới** và **cần update gì**. Skill này đóng vai trò "update assistant" — đọc CHANGELOG, so sánh version, và hướng dẫn từng bước.

## When to Use

- Khi muốn kiểm tra có bản cập nhật nào không
- Sau khi maintainer thông báo release mới
- Khi nghi ngờ workspace đang dùng version cũ
- Định kỳ (weekly/bi-weekly)

## Prerequisites

Workspace cần có:
- `.makeit/FRAMEWORK-VERSION` — version hiện tại (tạo bởi `install.sh`)
- `.makeit/BLUEPRINT-PATH` — đường dẫn tới blueprint repo (tạo bởi `install.sh`)

## Process

### Step 1: Detect Current State

Đọc thông tin workspace:

```
Required files:
.makeit/FRAMEWORK-VERSION  → version hiện tại (e.g. "0.4.0")
.makeit/BLUEPRINT-PATH     → path tới blueprint repo
```

<process>
1. Read `.makeit/FRAMEWORK-VERSION` → `LOCAL_VERSION`
2. Read `.makeit/BLUEPRINT-PATH` → `BLUEPRINT_PATH`
3. If either file missing:
   - Ask user for blueprint repo path
   - If FRAMEWORK-VERSION missing → assume version "0.0.0" (needs full update)
4. **Auto-sync blueprint repo** (ensure latest version):
   ```bash
   git -C {BLUEPRINT_PATH} pull --ff-only 2>/dev/null
   ```
   - If pull fails (no internet, merge conflict) → warn user but continue with local version
   - If pull succeeds → blueprint is now up-to-date
5. Read `{BLUEPRINT_PATH}/templates/VERSION` → `REMOTE_VERSION`
6. Read `{BLUEPRINT_PATH}/templates/CHANGELOG.md` → `CHANGELOG`
</process>

### Step 2: Compare Versions

<process>
- If LOCAL_VERSION == REMOTE_VERSION → "✅ Bạn đang dùng phiên bản mới nhất!"
- If LOCAL_VERSION < REMOTE_VERSION → Continue to Step 3
- If LOCAL_VERSION unknown → Continue to Step 3 (show all versions)
</process>

### Step 3: Show What's New

Parse CHANGELOG.md và hiển thị tất cả versions từ LOCAL_VERSION đến REMOTE_VERSION.

<display_format>
## 📦 What's New

**Workspace:** {workspace path}
**Your version:** v{LOCAL_VERSION}
**Latest:** v{REMOTE_VERSION}

---

{For each version newer than LOCAL_VERSION, show:}

### v{VERSION} — {DATE}

**Summary:** {one-line summary from CHANGELOG}

**✨ New files:** {count}
{list new files relevant to user's role}

**📝 Modified files:** {count}
{list modified files, highlight ⚠️ USER FILEs}

---
</display_format>

### Step 4: Detect User's Role

Xác định role của workspace hiện tại:

<process>
1. Read GEMINI.md — look for role indicators
2. Check `.agent/skills/` — folder name reveals role:
   - `makeit-ba` → BA
   - `makeit-dev-be` → Dev BE  
   - `makeit-dev-fe` → Dev FE
   - `makeit-po` → PO
   - `makeit-techlead` → Techlead
3. Set ROLE and SKILL_NAME accordingly
4. Set ROLE_PREFIX:
   - BA → `ba`, Dev BE → `be`, Dev FE → `fe`, PO → `po`, Techlead → `tl`
</process>

### Step 5: Apply Updates (Interactive)

Hướng dẫn user qua từng version, từng category thay đổi.

<process>
For each version (oldest → newest):

**Category A: New Files (safe to copy)**
- These files don't exist in workspace yet → safe to copy directly
- Agent reads file from blueprint → writes to correct location in workspace
- Ask user: "Tôi sẽ copy {N} file mới. Tiếp tục?"

**Category B: Modified Files (core — safe to overwrite)**
- Files user normally doesn't customize (SKILL.md, help.md, skill logic files)
- Agent reads latest version → compares with local → applies changes
- Ask user: "Tôi sẽ update {N} file. Tiếp tục?"

**Category C: Modified USER FILEs (⚠️ manual merge)**
- Files user may have customized: GEMINI.md, rules/
- Show EXACTLY what needs to be added (not full file replacement)
- Agent adds the specific new content to existing file
- Ask user to review: "Tôi đã thêm {change}. Kiểm tra giúp?"

After all changes applied:
- Update `.makeit/FRAMEWORK-VERSION` to latest version
</process>

### Step 6: Apply — New Files

For each new file listed in CHANGELOG's "✨ New" section:

<process>
1. Resolve source path in blueprint repo:
   - `_shared/skills/{name}/` → `{BLUEPRINT}/templates/roles/_shared/skills/{name}/`
   - `{role}/workflows/makeit/{name}.md` → `{BLUEPRINT}/templates/roles/{ROLE}/workflows/makeit/{name}.md`

2. Resolve target path in workspace:
   - `_shared/skills/{name}/` → `.agent/skills/{SKILL_NAME}/_shared/skills/{name}/`
   - `{role}/workflows/makeit/{name}.md` → `.agent/workflows/makeit/{name}.md`

3. Read source file content
4. Write to target (create directories if needed)
5. Report: "✅ Copied: {filename}"
</process>

### Step 7: Apply — Modified Core Files

For SKILL.md, help.md, and other non-user files:

<process>
1. Read CHANGELOG update instructions for exact changes needed
2. Read current local file
3. Apply the specific additions (new table rows, new entries)
4. Write updated file
5. Report: "✅ Updated: {filename} — added {what}"
</process>

### Step 8: Apply — USER FILEs (GEMINI.md, rules)

<process>
1. Read CHANGELOG for exact content to add
2. Read user's current file
3. Find insertion point (e.g., "### Support Commands" table)
4. Add new content at correct location
5. Show user what was added
6. Ask: "Kiểm tra thay đổi trong GEMINI.md giúp?"
</process>

> ⚠️ NEVER overwrite GEMINI.md or rules files entirely. Only ADD specific new entries.

### Step 9: Finalize

<process>
1. Write REMOTE_VERSION to `.makeit/FRAMEWORK-VERSION`
2. Show summary of all changes applied
3. Suggest running `/makeit:health-check` to verify workspace integrity
</process>

<report_format>
## ✅ Update Complete

**Updated:** v{LOCAL_VERSION} → v{REMOTE_VERSION}

### Changes Applied
| Category | Files | Status |
|----------|-------|--------|
| ✨ New files | {N} | ✅ Copied |
| 📝 Core files | {N} | ✅ Updated |
| ⚠️ User files | {N} | ✅ Merged (review recommended) |

### Files Changed
{list of all files with action taken}

### Next Steps
- Review GEMINI.md changes if flagged
- Run `/makeit:health-check` to verify workspace
- Xem chi tiết: `{BLUEPRINT_PATH}/templates/CHANGELOG.md`
</report_format>

## Edge Cases

| Scenario | Handling |
|----------|----------|
| Blueprint path invalid | Ask user to provide correct path |
| FRAMEWORK-VERSION missing | Treat as "0.0.0", offer to set current version |
| Multiple versions to apply | Apply sequentially oldest → newest |
| File already exists (new) | Skip, report as "already present" |
| CHANGELOG missing instructions | Show raw CHANGELOG, let user apply manually |
| User declines a change | Skip that file, note in report |

## Integration

- Gọi bởi: `/makeit:what-new` command
- Có thể suggest sau `/makeit:health-check` nếu phát hiện outdated version
- Kết hợp với `check-update.sh` (CLI alternative ngoài agent)
