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

## [0.7.0] — 2026-02-17

### Summary
- **Paradigm shift:** `/makeit:whats-new` giờ scan trực tiếp files từ blueprint repo thay vì dựa vào version number
- Source of truth = blueprint repo files, NOT version number
- `install.sh` thêm Step 7d: copy `_shared/knowledge/` templates vào skill directory (fix KB commands thiếu INDEX-TEMPLATE)
- Tất cả 5 workflow routers updated theo tư duy file-based

### 📝 Modified

| File | Roles | Thay đổi | ⚠️ |
|------|-------|----------|-----|
| `_shared/skills/whats-new/whats-new.md` | [ALL] | Complete rewrite — file-based scan, version chỉ là display info | |
| `{role}/workflows/makeit/whats-new.md` | [ALL] | Updated objective + process steps + success criteria theo file-based flow | |
| `install.sh` | Framework | Thêm Step 7d: copy `_shared/knowledge/` → `.agent/skills/{SKILL}/_shared/knowledge/` + verify KB templates + verify product docs | |

### 🔧 Fixed

| Issue | Mô tả |
|-------|--------|
| whats-new exit sớm khi version match | Trước: `LOCAL == REMOTE` → exit, không check files thiếu. Giờ: luôn scan files |
| KB commands thiếu INDEX-TEMPLATE | `install.sh` chỉ copy `_shared/knowledge/` vào `.makeit/knowledge/_templates/` nhưng KB commands đọc từ `.agent/skills/{SKILL}/_shared/knowledge/`. Giờ copy vào cả 2 nơi |
| Workflow routers mô tả sai flow | Routers vẫn nói "compare version → show changes". Giờ mô tả đúng: "scan blueprint → detect gaps → copy missing" |

### 📋 Update Instructions

**Áp dụng cho mỗi role workspace đã cài đặt:**

> 💡 Thay `{BLUEPRINT}` = path tới makeit-framework repo, `{WORKSPACE}` = path tới project workspace, `{SKILL}` = tên skill folder (vd: `makeit-po`, `makeit-ba`...), `{ROLE}` = `po`|`ba`|`techlead`|`dev-fe`|`dev-be`

#### Bước 1: Update whats-new skill (⭐ quan trọng nhất)

```bash
# Copy skill mới (file-based scan)
cp -r {BLUEPRINT}/templates/roles/_shared/skills/whats-new/ \
      {WORKSPACE}/.agent/skills/whats-new/
```

#### Bước 2: Update workflow router

```bash
cp {BLUEPRINT}/templates/roles/{ROLE}/workflows/makeit/whats-new.md \
   {WORKSPACE}/.agent/workflows/makeit/whats-new.md
```

#### Bước 3: Copy _shared/knowledge/ templates (fix KB commands)

```bash
mkdir -p {WORKSPACE}/.agent/skills/{SKILL}/_shared/knowledge/
cp {BLUEPRINT}/templates/roles/_shared/knowledge/* \
   {WORKSPACE}/.agent/skills/{SKILL}/_shared/knowledge/
```

#### Bước 4: Update version

```bash
echo "0.7.0" > {WORKSPACE}/.makeit/FRAMEWORK-VERSION
```

> 💡 Sau update này, chạy `/makeit:whats-new` sẽ tự động detect gaps trong tương lai — không cần manual update nữa!

---

## [0.6.0] — 2026-02-17

### Summary
- Thêm `product/` làm category thứ 5 trong Knowledge Base + 4 shared product docs
- Rename `/makeit:what-new` → `/makeit:whats-new` (fix typo)
- `/makeit:whats-new` giờ auto `git pull` blueprint trước khi check → luôn nhận update mới nhất
- `install.sh` tạo 5 KB categories + copy shared knowledge docs cho workspace mới

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
| `_shared/skills/kb-management/_rebuild-index.md` | [ALL] | Thêm `product/` vào scan dirs + Quick Stats (4→5 categories) | |
| `_shared/knowledge/INDEX-TEMPLATE.md` | [ALL] | Thêm `Product` row trong template + example | |
| `{role}/GEMINI.md` | [ALL] | Thêm `product` vào knowledge docs path + INDEX update rule | ⚠️ USER FILE |
| `_shared/skills/whats-new/whats-new.md` | [ALL] | Rename từ `what-new` + auto git-pull blueprint | |
| `{role}/workflows/makeit/whats-new.md` | [ALL] | Rename từ `what-new.md` | |
| `{role}/skills/{skill}/SKILL.md` | [ALL] | Update reference `what-new` → `whats-new` | |
| `{role}/skills/{skill}/{prefix}-support/help.md` | [ALL] | Update command name in help | |
| `install.sh` | Framework | Thêm `product/` folder + copy shared knowledge docs + INDEX.md | |

### 📋 Update Instructions

**Áp dụng cho mỗi role workspace đã cài đặt:**

> 💡 Thay `{BLUEPRINT}` = path tới makeit-framework repo, `{WORKSPACE}` = path tới project workspace, `{SKILL}` = tên skill folder (vd: `makeit-po`, `makeit-ba`...)

#### Bước 1: Copy knowledge docs vào workspace

```bash
# Tạo product/ folder + copy shared docs
mkdir -p {WORKSPACE}/.makeit/knowledge/product/
cp {BLUEPRINT}/.makeit/knowledge/product/*.md {WORKSPACE}/.makeit/knowledge/product/
cp {BLUEPRINT}/.makeit/knowledge/INDEX.md {WORKSPACE}/.makeit/knowledge/INDEX.md
```

#### Bước 2: Update skills (copy đè — an toàn)

```bash
# 2a. Copy _rebuild-index (đã thêm product/)
cp {BLUEPRINT}/templates/roles/_shared/skills/kb-management/_rebuild-index.md \
   {WORKSPACE}/.agent/skills/{SKILL}/_shared/skills/kb-management/_rebuild-index.md

# 2b. Copy INDEX-TEMPLATE (đã thêm Product row)
cp {BLUEPRINT}/templates/roles/_shared/knowledge/INDEX-TEMPLATE.md \
   {WORKSPACE}/.agent/skills/{SKILL}/_shared/knowledge/INDEX-TEMPLATE.md

# 2c. Rename what-new → whats-new (skill + workflow)
rm -rf {WORKSPACE}/.agent/skills/what-new 2>/dev/null
cp -r {BLUEPRINT}/templates/roles/_shared/skills/whats-new/ {WORKSPACE}/.agent/skills/whats-new/

# 2d. Rename workflow router (thay {ROLE} = po|ba|techlead|dev-fe|dev-be)
rm -f {WORKSPACE}/.agent/workflows/makeit/what-new.md 2>/dev/null
cp {BLUEPRINT}/templates/roles/{ROLE}/workflows/makeit/whats-new.md \
   {WORKSPACE}/.agent/workflows/makeit/whats-new.md
```

#### Bước 3: Merge thay đổi vào GEMINI.md (⚠️ manual — user đã customize)

Mở `{WORKSPACE}/GEMINI.md`:

1. Tìm `## Knowledge Base` → sửa Knowledge docs line:
```markdown
- **Knowledge docs:** `.makeit/knowledge/{architecture,business,product,technical,operational}/`
```

2. Thêm sau dòng "Agent tự động load...":
```markdown
> 📝 **Update rule:** Khi tạo, sửa nội dung, hoặc xóa file trong `.makeit/knowledge/`, PHẢI update INDEX.md (qua `/makeit:update-doc` hoặc `/makeit:create-doc`).
```

3. Tìm `/makeit:what-new` → đổi thành `/makeit:whats-new`

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
