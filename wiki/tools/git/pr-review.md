# Pull Request & Review

Hướng dẫn tạo Pull Request (PR), quy trình review, và checklist đảm bảo chất lượng code trước khi merge.

---

## Tạo Pull Request

### Khi nào tạo Pull Request?

Tạo Pull Request khi:
- Hoàn thành code cho 1 task trên Lark
- Đã self-review code của mình
- Tất cả commits follow [Coding Standards](../../reference/coding-standards.md)

### Cách tạo Pull Request

**1. Push branch lên remote:**

```bash
git push origin feat/TASK-42-add-upload-flow
```

**2. Mở GitHub → Repository → Click "Compare & pull request"**

**3. Điền thông tin theo PR template:**

PR template tự động load khi tạo Pull Request trên GitHub. Điền tất cả các section bắt buộc:

| Section | Nội dung cần điền |
|---------|------------------|
| **Summary** | Mô tả ngắn: thay đổi gì, tại sao |
| **Type** | Tick 1 loại: feat, fix, docs, chore |
| **Lark Task** | Paste URL task từ Lark |
| **General Checklist** | 4 items kiểm tra cơ bản |
| **AI Review Checklist** | 8 items kiểm tra AI-generated code |
| **Role-specific section** | Mở section phù hợp (Frontend/Backend/Design-BA) |

### PR Title Format

```
{type}: {description ngắn gọn}
```

Ví dụ:
- `feat: add product upload dropzone`
- `fix: resolve cart empty state crash`
- `docs: update API endpoint documentation`

> 💡 PR title nên giống commit message nếu Pull Request chỉ chứa 1 commit.

---

## PR Description Template

Khi tạo Pull Request, GitHub sẽ tự động load template. Nếu cần viết thủ công, follow format sau:

```markdown
## Summary
Mô tả ngắn thay đổi là gì và tại sao.

## Type
- [x] feat
- [ ] fix
- [ ] docs
- [ ] chore

## Lark Task
[TASK-42: Add upload flow](link-to-lark)

## Changes
- Thay đổi 1
- Thay đổi 2
- Thay đổi 3

## How to Test
1. Bước 1
2. Bước 2
3. Xác nhận kết quả mong đợi

## Screenshots (nếu có UI changes)
| Before | After |
|--------|-------|
| screenshot | screenshot |
```

> 📄 Template đầy đủ: xem [PR Template](../../../.github/pull_request_template.md) trong repo

---

## Quy trình Review

### Ai review gì?

| Reviewer | Kiểm tra | Khi nào |
|----------|----------|--------|
| **Techlead** | Code quality, architecture, conventions | Tất cả Pull Request |
| **Designer** | UI matches Figma, interaction states, responsive | Pull Request có UI changes |
| **PO** | Business logic, acceptance criteria | Pull Request có logic changes |

### Timeline kỳ vọng

| Bước | Thời gian |
|------|----------|
| Author tạo Pull Request | — |
| Reviewer nhận notification | Ngay lập tức (GitHub) + Tag trên Telegram |
| Review lần đầu | Trong 24 giờ làm việc |
| Author fix feedback | Trong 24 giờ làm việc |
| Re-review | Trong 12 giờ làm việc |

> ⚠️ Nếu chưa nhận review sau 24 giờ → nhắc nhở trên Telegram.

### Flow chi tiết

```
Author tạo PR
    │
    ▼
Reviewer review
    │
    ├── ✅ Approve → Merge vào main
    │
    └── ❌ Request Changes
            │
            ▼
        Author fix code
            │
            ▼
        Author re-request review
            │
            ▼
        Reviewer re-review
            │
            ├── ✅ Approve → Merge
            │
            └── ❌ Request Changes (Round 2)
                    │
                    ▼
                Author fix → Re-review (Round 3)
                    │
                    └── Nếu vẫn chưa align → ESCALATE
                        (Meeting sync: PO + Designer + BA + Dev)
```

> ⚠️ **Tối đa 3 rounds.** Xem chi tiết tại [Team Workflow — Iteration Protocol](../../workflows/team-workflow.md#iteration-protocol).

---

## Code Review Checklist

Khi bạn review code người khác, kiểm tra các mục sau:

### General Checklist

- [ ] Code follow [Coding Standards](../../reference/coding-standards.md)
- [ ] Author đã self-review
- [ ] Lark task đã link trong Pull Request
- [ ] Đã test locally

### Logic Review

- [ ] Logic đúng với requirements (user story)
- [ ] Edge cases đã handle
- [ ] Error handling đầy đủ

### Code Quality Review

- [ ] Tên biến, hàm, file rõ ràng và nhất quán
- [ ] Code structure clean, dễ đọc
- [ ] Không có code thừa, dead code

### Role-Specific Review

**Frontend:**
- [ ] UI matches Figma design
- [ ] Interaction states: hover, active, disabled, error, empty, loading
- [ ] Responsive behavior đúng
- [ ] Design tokens — không hardcode colors/spacing

**Backend:**
- [ ] API contracts đúng (request/response schema)
- [ ] Input validation đầy đủ
- [ ] Security: auth, authz, no injection
- [ ] Database queries hiệu quả (no N+1)

---

## AI Review Checklist

Khi code được tạo hoặc hỗ trợ bởi AI (Antigravity IDE), kiểm tra thêm 2 nhóm:

### Output Verification — AI output có chính xác không?

| # | Item | Cách verify |
|---|------|------------|
| 1 | No hallucinated imports | Kiểm tra `package.json`, search import paths |
| 2 | No incorrect API usage | So sánh với API docs/types hiện tại |
| 3 | No hardcoded values | Search URLs, keys, secrets — phải nằm trong `.env` |
| 4 | Type safety | Search `as any`, `: any`, generic error catches |

### Context Completeness — AI có đủ context không?

| # | Item | Cách verify |
|---|------|------------|
| 5 | Output matches plan/specs | So sánh với task description |
| 6 | Specs requirements covered | Check từng acceptance criteria |
| 7 | Edge cases handled | Đọc edge cases trong specs |
| 8 | Integrations correct | Kiểm tra imports, props, hooks compile đúng |

> ⏱️ Mỗi item phải **binary** (yes/no) và **verify được trong dưới 1 phút**. 1 item fail → yêu cầu author fix.

> 📖 Chi tiết: [Coding Standards — AI Review Checklist](../../reference/coding-standards.md#ai-review-checklist)

---

## Merge Pull Request

### Trước khi merge

1. ✅ Có approval từ reviewer
2. ✅ AI Review Checklist pass
3. ✅ CI/CD checks pass (nếu có)
4. ✅ Không có unresolved conversations

### Merge

- Click **"Squash and merge"** trên GitHub (default)
- Xóa branch sau khi merge (GitHub tự hỏi)

### Sau khi merge

```bash
# Update local main
git checkout main
git pull origin main

# Xóa local branch (nếu chưa xóa)
git branch -d feat/TASK-42-add-upload-flow
```

---

## Resolve Merge Conflict

Khi Pull Request có conflict với main:

**1. Fetch và rebase:**

```bash
git fetch origin
git rebase origin/main
```

**2. Git sẽ báo file nào conflict — mở file đó và tìm markers:**

```
<<<<<<< HEAD
Code hiện tại trên branch của bạn
=======
Code từ main
>>>>>>> origin/main
```

**3. Giữ lại code đúng, xóa markers:**

```
Code đúng sau khi resolve
```

**4. Stage và continue rebase:**

```bash
git add .
git rebase --continue
```

**5. Force push (vì history đã thay đổi):**

```bash
git push --force-with-lease origin feat/TASK-42-add-upload-flow
```

> 💡 `--force-with-lease` an toàn hơn `--force` — nó sẽ từ chối push nếu remote có commits bạn chưa pull.

> Xem thêm: [Troubleshooting — Merge Conflicts](troubleshooting.md#merge-conflicts)

---

## Quick Reference

| Bước | Command / Action |
|------|-----------------|
| Push branch | `git push origin {branch}` |
| Tạo Pull Request | GitHub → "Compare & pull request" |
| Điền template | Summary, Type, Lark Task, Checklists |
| Review | General + Logic + Role-specific + AI Review |
| Merge | "Squash and merge" trên GitHub |
| Cleanup | `git checkout main && git pull && git branch -d {branch}` |

---

## Liên kết

- [Coding Standards](../../reference/coding-standards.md) — commit format, conventions
- [Branching Strategy](branching.md) — branch naming, workflow
- [Team Workflow](../../workflows/team-workflow.md) — 5-stage pipeline, review process
- [Git Overview](README.md) — tổng quan Git trong MakeIt workflow

---

*Thuộc Phase 6: Tool Guides*
*Cập nhật: 2026-02-13*
