---
name: health-check
description: Agent-powered workspace health check — scan for broken references, missing files, registry mismatches, and structural issues
trigger: /makeit:health-check
---

# Health Check — Workspace Integrity Validator

> Quét workspace để phát hiện broken references, missing files, và registry mismatches. Agent tự chẩn đoán và đề xuất fixes.

## Purpose

Khi workspace phát triển qua nhiều sprints, file renames/moves/deletes có thể tạo ra **broken references** — silent failures khiến agent không tìm được skill, template, hay agent definition. Health check phát hiện và báo cáo những vấn đề này.

## When to Use

- Sau khi hoàn thành major phase (4.x, 5.x)
- Khi agent behavior bất thường (skill not found, template missing)
- Trước khi chạy `/makeit:complete` cho milestone lớn
- Periodic maintenance (weekly/bi-weekly)

## Process

### Step 1: Scan Workspace Structure

Quét các thư mục chính và xác nhận structure:

```
Expected structure:
.agent/
├── skills/{role-skill-name}/
│   ├── SKILL.md
│   ├── {domain-prefix}-discovery/
│   ├── {domain-prefix}-planning/
│   ├── {domain-prefix}-execution/
│   ├── {domain-prefix}-verification/
│   ├── {domain-prefix}-lifecycle/
│   ├── {domain-prefix}-management/
│   ├── {domain-prefix}-support/
│   ├── {domain-prefix}-debugging/
│   └── _shared/
│       ├── references/
│       └── skills/
├── workflows/makeit/
├── rules/
├── agents/
.makeit/
├── sprint/
└── knowledge/
```

<check>
- [ ] .agent/skills/ directory exists with skill set
- [ ] Each expected domain folder exists
- [ ] SKILL.md exists at skill root
- [ ] .agent/workflows/makeit/ exists with router files
- [ ] .agent/rules/ exists with universal + role-specific rules
- [ ] .agent/agents/ exists with agent definitions
- [ ] .makeit/ directory structure present
</check>

### Step 2: Check @path References

Scan all `.md` files in `.agent/skills/` for `@path` references and verify targets exist:

**Reference patterns to check:**
| Pattern | Resolves to |
|---------|-------------|
| `@_shared/...` | `.agent/skills/{skill-name}/_shared/...` |
| `@{domain}/...` | `.agent/skills/{skill-name}/{domain}/...` |
| `@skills/...` | `.agent/skills/...` |
| `@rules/...` | `.agent/rules/...` |

<process>
1. Find all `.md` files under `.agent/skills/`
2. Extract `@path` references using pattern: `@[a-zA-Z._-]+/[a-zA-Z0-9/._-]+`
3. Resolve each reference against filesystem
4. Report found vs missing
</process>

### Step 3: Check GEMINI.md ↔ Skill Files

Verify every `/makeit:xxx` command in GEMINI.md has a corresponding skill file:

<process>
1. Read GEMINI.md (the active GEMINI.md, not template)
2. Extract all `/makeit:xxx` commands
3. For each command, find corresponding skill file:
   - Stage commands → `stage-{name}.md`
   - Support commands → `{name}.md`
   - KB commands → `_shared/skills/kb-management/{name}.md`
4. Report commands without skill files
</process>

### Step 4: Check SKILL.md Catalogue

Verify files referenced in SKILL.md actually exist:

<process>
1. Read SKILL.md
2. Extract all backtick-quoted `.md` filenames
3. Search skill tree for each file
4. Report missing files
</process>

### Step 5: Check help.md Sync

Compare commands listed in help.md with GEMINI.md:

<process>
1. Extract `/makeit:xxx` from both files
2. Identify commands in GEMINI.md but NOT in help.md (missing from help)
3. Identify commands in help.md but NOT in GEMINI.md (orphaned in help)
4. Report mismatches
</process>

### Step 6: Check Agent Files

Verify agent definitions referenced in GEMINI.md exist:

<process>
1. Extract `makeit-{role}-xxx` patterns from GEMINI.md
2. Check `.agent/agents/{name}.md` exists for each
3. Report missing agent files
4. Report orphaned agent files (exist but not referenced)
</process>

### Step 7: Check Template References

Verify templates referenced in skills actually exist:

<process>
1. Scan skill files for `@{domain}/templates/xxx.md` patterns
2. Resolve paths relative to skill root
3. Report missing templates
</process>

### Step 8: Generate Report

<report_format>
## 🏥 Health Check Report

**Date:** {timestamp}
**Role:** {detected role}
**Workspace:** {workspace path}

### Summary
| Category | Passed | Failed | Warnings |
|----------|--------|--------|----------|
| Structure | X | X | X |
| @path References | X | X | X |
| Commands ↔ Skills | X | X | X |
| SKILL.md Catalogue | X | X | X |
| help.md Sync | X | X | X |
| Agent Files | X | X | X |
| Templates | X | X | X |
| **Total** | **X** | **X** | **X** |

### ❌ Errors (fix required)
{list of broken errors with file + line}

### ⚠️ Warnings (review recommended)
{list of warnings}

### 💡 Suggested Fixes
{actionable fix suggestions}

### Overall Health Score: X/100
</report_format>

## Output

Hiển thị report trực tiếp trong chat. Nếu có nhiều issues, tạo file:
- `.makeit/HEALTH-CHECK-{date}.md`

## Self-Healing (Optional)

Nếu phát hiện issue đơn giản và user đồng ý:
- **Missing help.md entry** → Thêm command vào help.md
- **Missing SKILL.md entry** → Thêm entry vào catalogue
- **Orphaned agent file** → Suggest cleanup
- **Broken @path** → Tìm file đã move và update reference

> ⚠️ Self-healing PHẢI hỏi user trước khi thay đổi bất kỳ file nào.

## Integration

Skill này có thể được gọi bởi:
- `/makeit:health-check` command trực tiếp
- Stage-complete (optional step cuối)
- Milestone audit
