---
description: Sync MakeIt Knowledge Base → Serena memories (one-way)
---

# Sync MakeIt Knowledge → Serena Memories

## Overview

One-way sync từ MakeIt Knowledge Base (`.makeit/knowledge/`) sang Serena memories (`.serena/memories/`).

- **Direction:** KB → Serena (KB là source of truth)
- **Idempotent:** Safe to re-run — overwrites previous sync
- **Scope:** Chỉ sync `technical/` và `architecture/` categories (code-relevant)

## Workflow

### Step 1: Check Knowledge Base exists

```bash
ls .makeit/knowledge/INDEX.md
```

Nếu không có → KB chưa được tạo. Sử dụng `/makeit:create-doc` trước.

### Step 2: Read INDEX.md

Đọc `.makeit/knowledge/INDEX.md` để lấy danh sách available docs.

Filter chỉ giữ categories:
- ✅ `architecture/` — Architecture decisions, patterns
- ✅ `technical/` — Technical decisions, coding conventions
- ❌ `business/` — Skip (không liên quan đến code)
- ❌ `operational/` — Skip (không liên quan đến code)

### Step 3: Extract L1 summaries

Với mỗi doc relevant, đọc file và extract **L1 Summary** section (không lấy full L2 detail).

> L1 Summary đủ cho Serena context. L2 Detail quá chi tiết cho memory files.

### Step 4: Generate Serena memory files

Tạo/overwrite các files trong `.serena/memories/`:

#### File 1: `makeit-architecture.md`
```markdown
# Auto-generated from MakeIt Knowledge Base — do not edit manually
# Last sync: <TIMESTAMP>

## Architecture Decisions & Patterns

<Aggregated L1 summaries from architecture/ docs>
```

#### File 2: `makeit-conventions.md`
```markdown
# Auto-generated from MakeIt Knowledge Base — do not edit manually
# Last sync: <TIMESTAMP>

## Coding Conventions & Standards

<Aggregated L1 summaries from technical/ docs related to conventions>
```

#### File 3: `makeit-technical.md`
```markdown
# Auto-generated from MakeIt Knowledge Base — do not edit manually
# Last sync: <TIMESTAMP>

## Technical Decisions & Constraints

<Aggregated L1 summaries from technical/ docs related to decisions>
```

### Step 5: Verify sync

```bash
ls .serena/memories/
# Expected: makeit-architecture.md, makeit-conventions.md, makeit-technical.md
```

Kiểm tra mỗi file:
- [ ] Có header `# Auto-generated from MakeIt Knowledge Base`
- [ ] Có timestamp
- [ ] Có nội dung (không empty)

## Important Notes

- **Do NOT edit memory files manually** — chúng sẽ bị overwrite khi re-sync
- **KB là source of truth** — nếu cần thay đổi, update KB docs trước rồi re-sync
- **Serena đọc memories tự động** khi project activate — không cần manual load
- **Nếu KB rỗng** (chưa có docs), tạo memory files rỗng với note "KB chưa có docs relevant"

## When to Re-sync

- Sau khi create/update knowledge docs (`/makeit:create-doc`, `/makeit:update-doc`)
- Khi bắt đầu sprint mới (optional — thường sync 1 lần là đủ)
- Khi architecture/technical decisions thay đổi đáng kể
