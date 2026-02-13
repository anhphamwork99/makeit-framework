# Git Automation — Agent vs Bạn

Hướng dẫn này giải thích rõ phần nào trong Git workflow được **Agent tự động hóa** (qua Antigravity IDE và MakeIt framework) và phần nào **bạn cần làm thủ công**.

---

## Tổng quan phân chia

```
┌────────────────────────────────────────┬────────────────────────────────────────┐
│         🤖 Agent tự động               │          👤 Bạn cần làm                │
│                                        │                                        │
│  • Commit deliverables                 │  • Tạo branch mới                      │
│  • Format commit messages              │  • Review Pull Request                 │
│  • Git sync khi hoàn thành sprint      │  • Approve hoặc request changes        │
│  • Tạo HANDOFF.md trên product repo    │  • Resolve merge conflicts             │
│  • Stage files đúng                    │  • Push code lên remote                │
│                                        │  • Tạo Pull Request trên GitHub        │
│                                        │  • Final merge vào main                │
│                                        │  • Xóa branch sau merge                │
└────────────────────────────────────────┴────────────────────────────────────────┘
```

---

## Chi tiết: Agent tự động làm gì

### 1. Auto-commit trong `/makeit:complete`

Khi bạn chạy lệnh `/makeit:complete` (hoàn thành sprint), Agent tự động:

| Bước | Agent làm | Kết quả |
|------|----------|---------|
| Stage files | `git add` các deliverable files | Files sẵn sàng commit |
| Format message | Tạo commit message theo format chuẩn | `docs: complete sprint SPRINT-NNN` |
| Commit | `git commit` với message đã format | Deliverables được lưu |

> 💡 Agent chỉ commit **deliverable files** — không commit process files (drafts, notes, temporary).

### 2. HANDOFF.md Commit

Khi sprint hoàn thành, Agent tạo file `HANDOFF.md` chứa:
- Summary công việc đã hoàn thành
- Output files và locations
- Thông tin cho role tiếp theo trong pipeline

File này được commit vào thư mục sprint trong product repo:
```
.makeit/sprint/SPRINT-NNN/HANDOFF.md
```

### 3. Commit Message Formatting

Agent luôn format commit messages theo [Coding Standards](../../reference/coding-standards.md):

```bash
# Agent tự format — bạn không cần lo
docs: complete sprint SPRINT-042
feat: add user upload component
chore: update sprint state
```

### 4. Git Sync

Agent tự động đồng bộ deliverables cuối sprint:
- Xác nhận files đúng
- Stage và commit
- Chuẩn bị cho bạn push

> ⚠️ **Agent KHÔNG push lên remote.** Bạn luôn là người quyết định push.

---

## Chi tiết: Bạn cần làm gì

### 1. Tạo branch mới

Agent không tạo branch cho bạn. Trước khi bắt đầu code:

```bash
git checkout main
git pull origin main
git checkout -b feat/TASK-42-add-upload-flow
```

> Xem [Branching Strategy](branching.md) cho naming convention chi tiết.

### 2. Push code lên remote

Sau khi Agent commit (hoặc bạn tự commit):

```bash
git push origin feat/TASK-42-add-upload-flow
```

### 3. Tạo Pull Request

Mở GitHub → Click "Compare & pull request" → Điền template.

> Xem [Pull Request & Review](pr-review.md) cho quy trình chi tiết.

### 4. Review Pull Request

Khi nhận Pull Request từ người khác:
- Đọc description
- Check code quality
- Hoàn thành review checklist
- Approve hoặc request changes

### 5. Resolve Merge Conflicts

Khi branch của bạn conflict với main:

```bash
git fetch origin
git rebase origin/main
# Resolve conflicts trong IDE
git add .
git rebase --continue
git push --force-with-lease origin {branch}
```

### 6. Final Merge

Sau khi Pull Request được approve:
- Click "Squash and merge" trên GitHub
- Confirm merge
- Xóa branch (GitHub hỏi tự động)

---

## Bảng tổng hợp theo stage

| Sprint Stage | Agent tự động | Bạn cần làm |
|-------------|--------------|-------------|
| Bắt đầu task | — | Tạo branch, setup environment |
| Đang code | Format commit messages | Commit thường xuyên, push |
| Self-review | — | Self-review code, check quality |
| Khi chạy `/makeit:complete` | Commit deliverables, tạo HANDOFF.md | Push lên remote |
| Tạo Pull Request | — | Tạo Pull Request, điền template |
| Review | — | Review code, approve/reject |
| Merge | — | Click merge, xóa branch |

---

## Khi nào Agent cần Git access?

| Tình huống | Agent cần Git? | Giải thích |
|-----------|---------------|-----------|
| `/makeit:complete` | ✅ Cần | Agent commit deliverables |
| `/makeit:execute-phase` | ✅ Cần | Agent có thể commit từng task |
| Writing code thường | ❌ Không | Agent viết code, bạn quyết định commit |
| Review Pull Request | ❌ Không | Agent có thể đọc code, bạn approve |
| Resolve conflicts | ❌ Không | Bạn tự resolve |

---

## Tips thực tế

1. **Để Agent handle commits** — Agent format commit messages tốt hơn, ít lỗi format hơn
2. **Bạn handle reviews** — Chỉ con người mới hiểu business context để review đúng
3. **Push là quyền của bạn** — Agent commit local, bạn quyết định khi nào push lên remote
4. **Review AI commits** — Trước khi push, `git log` để xem Agent commit những gì
5. **Branch là việc của bạn** — Agent không tạo/xóa branch, bạn quản lý hoàn toàn

---

## Liên kết

- [Branching Strategy](branching.md) — quy tắc tạo branch
- [Pull Request & Review](pr-review.md) — quy trình review
- [Troubleshooting](troubleshooting.md) — xử lý lỗi Git
- [Git Overview](README.md) — tổng quan

---

*Thuộc Phase 6: Tool Guides*
*Cập nhật: 2026-02-13*
