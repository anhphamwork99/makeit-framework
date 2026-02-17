# MakeIt AI Workspace — Changelog

Tất cả thay đổi đáng chú ý của framework được ghi tại đây.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## Cách đọc

- **✨ New** — Files hoàn toàn mới, cần copy vào workspace
- **📝 Modified** — Files đã tồn tại, cần merge thay đổi
- **🗑️ Removed** — Files đã xóa, có thể xóa trong workspace
- **🔧 Fixed** — Bug fixes, không thay đổi behavior
- **⚠️ USER FILE** — File user có thể đã customize → đọc kỹ hướng dẫn, KHÔNG copy đè
- **Roles** — `[BA]` `[TL]` `[FE]` `[BE]` `[PO]` `[ALL]` — roles bị ảnh hưởng

---

## [0.6.0] — 2026-02-17

### Summary
Thêm `product/` làm category thứ 5 trong Knowledge Base. Agents giờ scan product docs khi rebuild INDEX.md và được nhắc update INDEX khi thay đổi knowledge files. Kèm theo 4 product knowledge docs cho makeit-framework.

### ✨ New

| File | Roles | Mô tả |
|------|-------|--------|
| `.makeit/knowledge/INDEX.md` | Framework | Master index cho Knowledge Base |
| `.makeit/knowledge/product/PRODUCT-OVERVIEW.md` | Framework | Tổng quan sản phẩm makeit-framework |
| `.makeit/knowledge/product/DOMAIN-MODEL.md` | Framework | Domain model: entities, relationships |
| `.makeit/knowledge/product/FEATURE-MAP.md` | Framework | Feature map chi tiết theo modules |
| `.makeit/knowledge/product/USER-JOURNEYS.md` | Framework | User journeys cho các roles |

### 📝 Modified

| File | Roles | Thay đổi | ⚠️ |
|------|-------|----------|-----|
| `_shared/skills/kb-management/_rebuild-index.md` | [ALL] | Thêm `product/` vào scan directories, find command, Quick Stats (4→5 categories) | |
| `_shared/knowledge/INDEX-TEMPLATE.md` | [ALL] | Thêm `Product` row trong template + example | |
| `{role}/GEMINI.md` | [ALL] | Thêm `product` vào knowledge docs path + INDEX update rule | ⚠️ USER FILE |
| `.gitignore` | Framework | Un-ignore `.makeit/knowledge/` (shared team resource) | |

### 📋 Update Instructions

**Áp dụng cho mỗi role workspace đã cài đặt:**

#### Bước 1: Copy files mới (an toàn)

```bash
# Thay {BLUEPRINT} = path tới makeit-framework repo
# Thay {WORKSPACE} = path tới project workspace

# 1a. Copy _rebuild-index skill (đã update)
cp {BLUEPRINT}/templates/roles/_shared/skills/kb-management/_rebuild-index.md \
   {WORKSPACE}/.agent/skills/{SKILL}/_shared/skills/kb-management/_rebuild-index.md

# 1b. Copy INDEX-TEMPLATE (đã update)  
cp {BLUEPRINT}/templates/roles/_shared/knowledge/INDEX-TEMPLATE.md \
   {WORKSPACE}/.agent/skills/{SKILL}/_shared/knowledge/INDEX-TEMPLATE.md
```

#### Bước 2: Merge thay đổi vào GEMINI.md (⚠️ manual — user đã customize)

Mở `{WORKSPACE}/GEMINI.md`, tìm `## Knowledge Base` section:

1. Sửa Knowledge docs line:
```markdown
- **Knowledge docs:** `.makeit/knowledge/{architecture,business,product,technical,operational}/`
```

2. Thêm sau dòng "Agent tự động load...":
```markdown
> 📝 **Update rule:** Khi tạo, sửa nội dung, hoặc xóa file trong `.makeit/knowledge/`, PHẢI update INDEX.md (qua `/makeit:update-doc` hoặc `/makeit:create-doc`).
```

#### Bước 3: Tạo product/ folder (optional — cho projects mới)

```bash
mkdir -p {WORKSPACE}/.makeit/knowledge/product/
```

---

## [0.5.0] — 2026-02-13

### Summary
Thêm Health Check skill cho tất cả roles. Health check giúp agent tự scan workspace tìm broken references, missing files, registry mismatches.

### ✨ New

| File | Roles | Mô tả |
|------|-------|--------|
| `_shared/skills/health-check/health-check.md` | [ALL] | Agent-powered workspace health check skill |
| `{role}/workflows/makeit/health-check.md` | [ALL] | Workflow router cho `/makeit:health-check` |
| `scripts/validate-references.sh` | Framework | Bash script kiểm tra broken references (chạy từ blueprint repo) |
| `templates/VERSION` | Framework | Version tracking file |
| `templates/CHANGELOG.md` | Framework | File này |

### 📝 Modified

| File | Roles | Thay đổi | ⚠️ |
|------|-------|----------|-----|
| `{role}/GEMINI.md` | [ALL] | Thêm `/makeit:health-check` vào Support Commands | ⚠️ USER FILE |
| `{role}/skills/{skill}/SKILL.md` | [ALL] | Thêm `_shared/skills/health-check/` vào shared resources | |
| `{role}/skills/{skill}/{prefix}-support/help.md` | [ALL] | Thêm `health-check` vào command list | |

### 📋 Update Instructions

**Áp dụng cho mỗi role workspace đã cài đặt:**

#### Bước 1: Copy files mới (an toàn — không ảnh hưởng customizations)

```bash
# Thay {BLUEPRINT} = path tới makeit-framework repo
# Thay {WORKSPACE} = path tới project workspace
# Thay {ROLE} = ba|dev-be|dev-fe|po|techlead
# Thay {SKILL} = makeit-ba|makeit-dev-be|makeit-dev-fe|makeit-po|makeit-techlead

# 1a. Copy health-check skill (shared)
cp -r {BLUEPRINT}/templates/roles/_shared/skills/health-check/ \
      {WORKSPACE}/.agent/skills/{SKILL}/_shared/skills/health-check/

# 1b. Copy workflow router
cp {BLUEPRINT}/templates/roles/{ROLE}/workflows/makeit/health-check.md \
   {WORKSPACE}/.agent/workflows/makeit/health-check.md
```

#### Bước 2: Merge thay đổi vào GEMINI.md (⚠️ manual — user đã customize)

Mở `{WORKSPACE}/GEMINI.md`, tìm `### Support Commands` table, thêm dòng:

```markdown
| `/makeit:health-check` | Quét workspace tìm broken references, missing files |
```

#### Bước 3: Update help.md

Mở `{WORKSPACE}/.agent/skills/{SKILL}/{prefix}-support/help.md`, thêm vào section phù hợp:

```
    /makeit:health-check     Scan workspace for broken references
```

#### Bước 4: Update SKILL.md (optional — reference chỉ)

Mở `{WORKSPACE}/.agent/skills/{SKILL}/SKILL.md`, tìm `_shared` section, thêm:

```markdown
| `skills/health-check/` | Workspace health check — broken reference detection (shared) |
```

---

## [0.4.0] — 2026-02-12

### Summary
Product Memory System — Knowledge Base cho agent trí nhớ dài hạn across sprints.

### ✨ New
- `_shared/skills/kb-management/` — 4 KB skills (create-doc, search-kb, update-doc, archive-doc)
- `_shared/agents/makeit-document-agent.md` — Document Agent cho KB operations
- `_shared/templates/KNOWLEDGE-DOC-TEMPLATE.md` — Knowledge document template
- `_shared/templates/INDEX-TEMPLATE.md` — Knowledge index template
- `_shared/templates/knowledge-taxonomy.md` — 4-domain taxonomy

### 📝 Modified
- `{role}/GEMINI.md` — Thêm KB Commands section `[ALL]` ⚠️ USER FILE
- `{role}/skills/{skill}/SKILL.md` — Thêm kb-management domain `[ALL]`
- `{role}/skills/{skill}/{prefix}-support/help.md` — Thêm KB commands `[ALL]`
- `{role}/skills/{skill}/{prefix}-discovery/stage-clarify.md` — Thêm knowledge loading step `[ALL]`
- `{role}/skills/{skill}/{prefix}-lifecycle/stage-complete.md` — Thêm knowledge extraction step `[ALL]`
- `templates/install.sh` — Bootstrap knowledge folder structure

> ℹ️ Retrospective entry — detailed update instructions not available for this version.

---

## [0.3.0] — 2026-02-12

### Summary  
Role Content Polish — sync command registries, fix stale references, clarify naming.

> ℹ️ Retrospective entry — see git history for detailed changes.

---

## [0.2.0] — 2026-02-12

### Summary
Template Coverage Completion — all workflows have dedicated templates, shared templates cloned per role.

> ℹ️ Retrospective entry — see git history for detailed changes.

---

## [0.1.0] — 2026-02-11

### Summary
Initial framework structure — 5 roles, sprint lifecycle, skill domains, workflow routers.

> ℹ️ Initial release — use `install.sh` for fresh installation.
