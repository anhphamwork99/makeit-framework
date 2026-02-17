---
name: whats-new
description: Check framework updates and guide user through applying changes to current workspace
trigger: /makeit:whats-new
---

# What's New — Framework Update Assistant

> Scan blueprint repo, phát hiện workspace gaps, và hướng dẫn user sync workspace với blueprint mới nhất.

## Purpose

Khi framework maintainer release thay đổi mới (thêm skills, fix bugs, thêm knowledge docs), user cần biết **workspace thiếu gì** và **cần sync gì**. Skill này đóng vai trò "sync assistant" — scan blueprint repo, so sánh trực tiếp với workspace files, và hướng dẫn copy/update.

> 🔑 **Source of truth = blueprint repo files, NOT version number.**
> Version chỉ là thông tin hiển thị. Luôn check thực tế files từ repo.

## When to Use

- Khi muốn kiểm tra workspace có đầy đủ files không
- Sau khi maintainer thông báo release mới
- Khi nghi ngờ workspace thiếu files
- Định kỳ (weekly/bi-weekly)

## Prerequisites

Workspace cần có:
- `.makeit/BLUEPRINT-PATH` — đường dẫn tới blueprint repo (tạo bởi `install.sh`)
- `.makeit/FRAMEWORK-VERSION` — version hiển thị (optional, dùng cho display)

## Process

### Step 1: Detect Current State + Resolve Variables

Đọc thông tin workspace và tự động detect tất cả biến cần thiết:

<process>
1. Read `.makeit/BLUEPRINT-PATH` → `BLUEPRINT_PATH`
2. Read `.makeit/FRAMEWORK-VERSION` → `LOCAL_VERSION` (optional — display only)
3. If BLUEPRINT-PATH missing → Ask user for blueprint repo path
4. If FRAMEWORK-VERSION missing → set LOCAL_VERSION = "unknown"
5. **Auto-sync blueprint repo** (ensure latest):
   ```bash
   git -C {BLUEPRINT_PATH} pull --ff-only 2>/dev/null
   ```
   - If pull fails → warn user but continue with local files
6. Read `{BLUEPRINT_PATH}/templates/VERSION` → `BLUEPRINT_VERSION` (display only)
7. **Auto-detect workspace variables:**
   - `WORKSPACE` = workspace root (thư mục chứa `.makeit/`)
   - `BLUEPRINT` = giá trị từ `.makeit/BLUEPRINT-PATH`
   - `ROLE` = detect từ `.agent/skills/makeit-{role}/` folder name:
     - `makeit-po` → ROLE=`po`
     - `makeit-ba` → ROLE=`ba`
     - `makeit-techlead` → ROLE=`techlead`
     - `makeit-dev-fe` → ROLE=`dev-fe`
     - `makeit-dev-be` → ROLE=`dev-be`
   - `SKILL` = tên folder skill chính (vd: `makeit-po`, `makeit-ba`...)
   - Detect bằng: `ls .agent/skills/ | grep makeit-`
</process>

> ⚠️ Agent PHẢI resolve hết variables **trước khi** hiển thị instructions cho user. User KHÔNG BAO GIỜ phải tự thay `{BLUEPRINT}`, `{WORKSPACE}`, `{SKILL}`, hay `{ROLE}`.

### Step 2: Scan Blueprint → Detect Workspace Gaps

Scan trực tiếp files trong blueprint repo và so sánh với workspace.

<process>
**2A. Build expected file list từ blueprint repo:**

1. Knowledge base docs:
   - List files in `{BLUEPRINT}/.makeit/knowledge/product/*.md` → target: `.makeit/knowledge/product/`
   - Check `{BLUEPRINT}/.makeit/knowledge/INDEX.md` → target: `.makeit/knowledge/INDEX.md`

2. Knowledge templates (in skill dir):
   - `{BLUEPRINT}/templates/roles/_shared/knowledge/*` → target: `.agent/skills/{SKILL}/_shared/knowledge/`

3. Shared skills:
   - List folders in `{BLUEPRINT}/templates/roles/_shared/skills/` → target: `.agent/skills/{name}/`

4. Role workflows:
   - List files in `{BLUEPRINT}/templates/roles/{ROLE}/workflows/makeit/*.md` → target: `.agent/workflows/makeit/{name}.md`

5. Role skill files (SKILL.md):
   - `{BLUEPRINT}/templates/roles/{ROLE}/skills/{SKILL}/SKILL.md` → target: `.agent/skills/{SKILL}/SKILL.md`

6. Shared agents:
   - List files in `{BLUEPRINT}/templates/roles/_shared/agents/*.md` → target: `.agent/agents/{name}.md`

**2B. Check workspace → classify each file:**

For each expected file/folder, check workspace:
- EXISTS in workspace? → ✅ `present_files[]`
- MISSING in workspace? → ❌ `missing_files[]`

**2C. Report results:**

```
## 🔍 Workspace Scan Results

**Workspace:** {WORKSPACE}
**Blueprint:** {BLUEPRINT}
**Local version:** v{LOCAL_VERSION} | **Blueprint version:** v{BLUEPRINT_VERSION}
**Role:** {ROLE} | **Skill:** {SKILL}

### Files Status
| Status | Count |
|--------|-------|
| ✅ Present | {N} |
| ❌ Missing | {N} |

{If missing_files is NOT empty:}
### ❌ Missing Files
| File | Loại | Source |
|------|------|--------|
| .makeit/knowledge/product/PRODUCT-OVERVIEW.md | Knowledge doc | {BLUEPRINT}/.makeit/knowledge/product/ |
| .agent/workflows/makeit/create-doc.md | Workflow | {BLUEPRINT}/templates/roles/{ROLE}/workflows/makeit/ |
| ... | ... | ... |
```

**2D. Decide next action:**

- If `missing_files[]` is empty AND LOCAL_VERSION == BLUEPRINT_VERSION:
  → "✅ Workspace đầy đủ, đang dùng phiên bản mới nhất!"
  → DONE

- If `missing_files[]` is NOT empty:
  → "Tôi sẽ copy {N} file thiếu từ blueprint. Tiếp tục?"
  → User confirms → Go to Step 4

- If LOCAL_VERSION < BLUEPRINT_VERSION (có version mới):
  → Show CHANGELOG (Step 3) → then copy missing + update modified (Step 4-7)

- If LOCAL_VERSION unknown:
  → Copy missing files first, then set version
</process>

### Step 3: Show What's New (when version updated)

Chỉ hiển thị khi có version mới. Parse CHANGELOG.md:

<display_format>
## 📦 What's New in v{BLUEPRINT_VERSION}

{For each version newer than LOCAL_VERSION, show:}

### v{VERSION} — {DATE}

**Summary:** {one-line summary from CHANGELOG}

**Changes:** {brief list from CHANGELOG}
</display_format>

> 🔑 **Variable Resolution Rule:** Khi hiển thị "Update Instructions" từ CHANGELOG, agent PHẢI thay thế:
> - `{BLUEPRINT}` → giá trị thực từ `.makeit/BLUEPRINT-PATH`
> - `{WORKSPACE}` → đường dẫn absolute tới workspace root
> - `{SKILL}` → tên skill folder detected (vd: `makeit-po`)
> - `{ROLE}` → role name detected (vd: `po`, `ba`, `techlead`, `dev-fe`, `dev-be`)
>
> Kết quả: user nhận được commands **ready-to-run**, chỉ cần copy-paste và chạy.

### Step 4: Copy Missing Files

For each file in `missing_files[]`:

<process>
1. Resolve source path (from Step 2A mapping)
2. Create target directory if needed
3. Read source file content from blueprint
4. Write to target in workspace
5. Report: "✅ Copied: {target_path}"

Categories:
- **Knowledge docs** → copy directly, create category dirs if needed
- **Shared skills** → copy entire folder
- **Workflow routers** → copy .md file
- **Skill files** → copy with care (don't overwrite user-modified SKILL.md)
- **Agents** → copy .md file
</process>

### Step 5: Update Modified Core Files

For files that EXIST in workspace but are OUTDATED (when version changed):

<process>
- SKILL.md, help.md, skill logic files → safe to overwrite
- Read CHANGELOG update instructions for exact changes
- Apply specific additions (new table rows, new entries)
- Report: "✅ Updated: {filename}"
</process>

### Step 6: Merge USER FILEs (⚠️ careful)

Files user may have customized: GEMINI.md, rules/:

<process>
1. Read CHANGELOG for exact content to add
2. Read user's current file
3. Find insertion point
4. Add new content at correct location (DO NOT overwrite entire file)
5. Show user what was added
6. Ask: "Kiểm tra thay đổi trong GEMINI.md giúp?"
</process>

> ⚠️ NEVER overwrite GEMINI.md or rules files entirely. Only ADD specific new entries.

### Step 7: Finalize

<process>
1. Write BLUEPRINT_VERSION to `.makeit/FRAMEWORK-VERSION`
2. Show summary of all changes applied
3. Suggest running `/makeit:health-check` to verify workspace integrity
</process>

<report_format>
## ✅ Sync Complete

**Workspace:** {WORKSPACE}
**Version:** v{LOCAL_VERSION} → v{BLUEPRINT_VERSION}

### Changes Applied
| Category | Files | Status |
|----------|-------|--------|
| ❌ → ✅ Missing files copied | {N} | ✅ Copied |
| 📝 Core files updated | {N} | ✅ Updated |
| 📚 Knowledge docs | {N} | ✅ Copied (skipped existing) |
| ⚠️ User files merged | {N} | ✅ Merged (review recommended) |

### Files Changed
{list of all files with action taken}

### Next Steps
- Review GEMINI.md changes if flagged
- Run `/makeit:health-check` to verify workspace
</report_format>

## Edge Cases

| Scenario | Handling |
|----------|----------|
| Blueprint path invalid | Ask user to provide correct path |
| FRAMEWORK-VERSION missing | Set to "unknown", still scan files normally |
| No missing files + same version | "✅ Workspace đầy đủ!" |
| File already exists (in missing list) | Skip, report as "already present" |
| User declines a change | Skip that file, note in report |
| Blueprint repo can't pull | Warn but continue with local blueprint files |

## Integration

- Gọi bởi: `/makeit:whats-new` command
- Có thể suggest sau `/makeit:health-check` nếu phát hiện missing files
- Kết hợp với `check-update.sh` (CLI alternative ngoài agent)
