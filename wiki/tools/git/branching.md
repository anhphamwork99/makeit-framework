# Branching Strategy

Hướng dẫn này mô tả quy tắc đặt tên branch, workflow làm việc với branch, và chiến lược merge mà team MakeIt áp dụng.

---

## Branch Naming Convention

Team sử dụng format chuẩn cho tất cả branch names:

```
{type}/TASK-{id}-{short-description}
```

### Các thành phần

| Phần | Mô tả | Ví dụ |
|------|--------|-------|
| `{type}` | Loại công việc — chỉ 4 loại cho phép | `feat`, `fix`, `docs`, `chore` |
| `TASK-{id}` | Mã task từ Lark task board | `TASK-42` |
| `{short-description}` | Mô tả ngắn, kebab-case, 2-3 từ | `add-upload-flow` |

### 4 loại branch

| Type | Khi nào dùng | Ví dụ |
|------|-------------|-------|
| `feat/` | Tính năng mới — thay đổi behavior của app | `feat/TASK-42-add-upload-flow` |
| `fix/` | Sửa bug — fix lỗi đã biết | `fix/TASK-108-button-alignment` |
| `docs/` | Documentation — thay đổi docs, README, wiki | `docs/TASK-55-update-api-docs` |
| `chore/` | Maintenance — upgrade dependencies, config | `chore/TASK-70-upgrade-vite` |

### Ví dụ đúng và sai

```
✅ feat/TASK-42-add-upload-flow
✅ fix/TASK-108-button-alignment
✅ docs/TASK-55-update-api-docs
✅ chore/TASK-70-upgrade-vite

❌ feature/add-new-upload-flow      — sai prefix, thiếu TASK ID
❌ fix/fix-bug                      — thiếu TASK ID, mô tả không rõ
❌ TASK-42-upload                   — thiếu type prefix
❌ feat/task-42-add-upload-flow     — TASK phải viết hoa
```

### Khi không có Lark Task ID

Nếu việc nhỏ chưa tạo task trên Lark (ví dụ: fix typo):

```bash
# Bỏ qua phần TASK-{id}, vẫn giữ type prefix
docs/fix-readme-typo
chore/cleanup-unused-imports
```

> 💡 Khuyến khích tạo task trên Lark trước để tracking. Chỉ bỏ qua khi việc thực sự nhỏ (dưới 15 phút).

> 📖 Chi tiết conventions: [Coding Standards](../../reference/coding-standards.md)

---

## Branch Workflow

### Quy trình từ tạo branch đến merge

```
  main
    │
    ├── feat/TASK-42-add-upload    ← Bạn tạo branch mới
    │     │
    │     ├── commit 1: feat: add upload component
    │     ├── commit 2: feat: add upload validation
    │     ├── commit 3: fix: handle empty file error
    │     │
    │     └── → Push → Tạo PR → Review → Approve → Merge
    │
    ├── (merged) ← Code vào main
    │
    └── ... (branches khác)
```

### Step-by-step

**1. Cập nhật main trước khi tạo branch mới:**

```bash
git checkout main
git pull origin main
```

**2. Tạo branch mới từ main:**

```bash
git checkout -b feat/TASK-42-add-upload-flow
```

**3. Code và commit thường xuyên:**

```bash
# Stage changes
git add .

# Commit với message theo format
git commit -m "feat: add upload dropzone component"
```

**4. Push branch lên remote:**

```bash
git push origin feat/TASK-42-add-upload-flow
```

**5. Tạo Pull Request trên GitHub** (xem chi tiết ở [Pull Request & Review](pr-review.md))

**6. Sau khi merge, xóa branch:**

```bash
git checkout main
git pull origin main
git branch -d feat/TASK-42-add-upload-flow
```

---

## Khi nào tạo branch mới?

| Tình huống | Hành động |
|-----------|-----------|
| Bắt đầu task mới từ Lark | Tạo branch mới từ main |
| Fix bug liên quan đến task đang làm | Commit vào branch hiện tại |
| Fix bug không liên quan | Tạo branch `fix/` mới |
| Update docs riêng biệt | Tạo branch `docs/` mới |
| Hotfix khẩn cấp trên production | Tạo branch `fix/` mới từ main |

**Quy tắc chung:** Mỗi task trên Lark = 1 branch. Không mix nhiều tasks vào 1 branch.

---

## Merge Strategy

Team MakeIt sử dụng **squash merge** làm default:

```
Feature branch:     commit A → commit B → commit C → commit D
                                    │
                    ┌───────────────┘ (squash merge)
                    ▼
Main branch:     ... → [squashed commit] → ...
```

### Squash Merge (default)

- **Khi nào:** Mọi Pull Request thông thường
- **Cách làm:** GitHub tự động squash khi merge Pull Request
- **Kết quả:** Tất cả commits trong branch gộp thành 1 commit trên main
- **Lợi ích:** History trên main sạch, dễ đọc

### Merge Commit (đặc biệt)

- **Khi nào:** Merge branches lớn cần giữ lại history chi tiết (hiếm khi)
- **Quyết định:** Techlead quyết định

### Rebase

- **Khi cần cập nhật branch với main mới nhất:**

```bash
# Đang ở feature branch
git fetch origin
git rebase origin/main
```

- **Nếu có conflict khi rebase:** Xem [Troubleshooting — Merge Conflicts](troubleshooting.md#merge-conflicts)

---

## Protected Branch: main

Branch `main` được bảo vệ (protected) với các rules:

| Rule | Mô tả |
|------|--------|
| No direct push | Không push thẳng vào main — phải qua Pull Request |
| Require review | Phải có ít nhất 1 approval trước khi merge |
| Status checks | CI/CD checks phải pass (nếu có) |

> ⚠️ Không bao giờ push trực tiếp lên main. Luôn tạo Pull Request.

---

## Quick Reference

```
# Tạo branch mới
git checkout main && git pull
git checkout -b feat/TASK-42-add-upload

# Commit
git add . && git commit -m "feat: add upload component"

# Push
git push origin feat/TASK-42-add-upload

# Sau khi merge (cleanup)
git checkout main && git pull
git branch -d feat/TASK-42-add-upload
```

---

## Liên kết

- [Coding Standards](../../reference/coding-standards.md) — commit format, conventions chi tiết
- [Pull Request & Review](pr-review.md) — tạo Pull Request, review process
- [Git Overview](README.md) — tổng quan Git trong workflow

---

*Thuộc Phase 6: Tool Guides*
*Cập nhật: 2026-02-13*
