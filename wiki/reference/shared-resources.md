# Shared Resources

## Overview

Tài liệu này mô tả cách team MakeIt cộng tác trên các tài nguyên dùng chung — đặc biệt là file `GEMINI.md` (AI assistant configuration). Nguyên tắc chung: **trust-based, lean process, open access**.

Ai cũng có thể đóng góp. Không cần permission đặc biệt. Chỉ cần follow protocol bên dưới.

---

## GEMINI.md Collaboration Protocol

### Structure

- `GEMINI.md` ở repo root: shared team configuration — apply cho tất cả team members
- Personal customization: team members tự quản lý ngoài repo (local files, IDE settings)

### Khi bạn muốn thay đổi GEMINI.md

1. Tạo branch: `docs/update-gemini-md-[mô-tả-ngắn]`
2. Sửa `GEMINI.md` — chỉ sửa phần liên quan đến thay đổi của bạn
3. Tạo PR với description rõ ràng:
   - **What:** Thay đổi gì (section nào, nội dung gì)
   - **Why:** Vì sao cần thay đổi (cải thiện gì, fix gì)
4. Cần **1 approval** từ bất kỳ team member nào
5. Merge và thông báo team trên Telegram: "Đã update GEMINI.md — [mô tả ngắn]"

**Ví dụ branch names:**
- ✅ `docs/update-gemini-md-add-linting-rules`
- ✅ `docs/update-gemini-md-fix-api-conventions`
- ❌ `update-gemini` (thiếu prefix `docs/`, thiếu mô tả)

### Khi bạn gặp conflict với PR của người khác

1. **Tag cả 2 người** trên Telegram — ai tạo PR trước và ai tạo PR sau
2. **Discuss và align** trước khi resolve — đồng ý cách merge nào hợp lý
3. **Người tạo PR sau** chịu trách nhiệm resolve conflict
4. **Re-request review** sau khi resolve — đảm bảo không mất changes của người kia

> 💡 **Tip:** Nếu 2 người sửa sections khác nhau, conflict thường dễ resolve. Nếu sửa cùng section, discuss trên Telegram trước để align approach.

### Khi bạn muốn thêm section mới vào GEMINI.md

1. Tạo PR như bình thường
2. Trong PR description, giải thích **vì sao** cần section mới
3. **Khuyến khích** tag thêm 1 team member có liên quan để review
4. Merge follow quy trình bình thường (1 approval)

---

## Principles

| Principle | Description |
|-----------|-------------|
| **Open access** | Ai cũng sửa được, không cần permission đặc biệt |
| **1 approval** | Trust-based cho team 8 người — 1 approve là đủ |
| **No CODEOWNERS** | Team nhỏ, flexible review — không cần automate reviewer assignment |
| **Telegram first** | Conflict → discuss trên Telegram trước → resolve code sau |
| **Repo-level only** | 1 file GEMINI.md chung trong repo. Personal customization tự quản lý ngoài repo |

### Why Trust-Based?

Team MakeIt có 8 members, làm việc part-time. Thêm process (CODEOWNERS, multiple approvals, mandatory reviewers) chỉ tạo thêm bottleneck mà không tăng thêm quality đáng kể.

- **CODEOWNERS:** Không cần — team nhỏ, ai cũng có context chung
- **Multiple approvals:** Không cần — 1 approval đủ để catch issues rõ ràng
- **Mandatory reviewers:** Không cần — bất kỳ ai available review đều ok

> Nếu team scale lên > 15 người hoặc chuyển full-time, reconsider adding CODEOWNERS.

---

## Skills & Prompts

Skills và prompts follow collaboration model tương tự GEMINI.md:
- PR-based changes
- 1 approval
- Telegram discussion khi conflict

Mỗi role có skills riêng trong `templates/roles/{role}/skills/`.

Xem thêm: `templates/roles/` trong repo root cho GEMINI.md templates.

---

## FAQ

### "Ai approve PR sửa GEMINI.md?"

Bất kỳ team member nào. Không có designated owner hay mandatory reviewer. Ai available và có context thì approve.

### "Nếu 2 người sửa GEMINI.md cùng lúc thì sao?"

Tag cả 2 người trên Telegram → discuss approach → người tạo PR sau resolve conflict → re-request review. Trong thực tế, việc này hiếm khi xảy ra vì GEMINI.md không thay đổi thường xuyên.

### "Personal customization thế nào?"

Tự quản lý ngoài repo. Ví dụ:
- IDE local settings (không push vào repo)
- Personal prompt files (gitignore nếu cần)
- Không push personal preferences vào shared GEMINI.md

### "Khi nào nên update GEMINI.md vs tạo file riêng?"

- **Update GEMINI.md** khi thay đổi apply cho **toàn bộ team** (conventions, standards, shared rules)
- **Tạo file riêng** khi nội dung chỉ apply cho **1 role** hoặc **1 project** cụ thể

### "Review GEMINI.md PR mất bao lâu?"

Không có SLA chính thức. Nhưng vì chỉ cần 1 approval, thường xong trong 24h. Nếu urgent, tag trên Telegram để nhờ review nhanh.

---

*Document: wiki/reference/shared-resources.md*
*Phase: 01 — Wiki Foundation & Conventions*
*Last updated: 2026-02-10*
