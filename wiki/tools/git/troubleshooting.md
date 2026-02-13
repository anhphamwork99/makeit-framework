# Troubleshooting Git

Hướng dẫn xử lý các vấn đề thường gặp khi làm việc với Git. Mỗi vấn đề được trình bày theo format: **Vấn đề → Nguyên nhân → Giải pháp**.

---

## Merge Conflicts

### Vấn đề

Khi tạo Pull Request hoặc rebase, Git báo conflict — không thể tự động merge 2 phiên bản khác nhau.

### Nguyên nhân

Hai người cùng sửa **cùng dòng code** trong cùng file. Git không biết giữ phiên bản nào.

### Giải pháp

**Bước 1: Fetch và rebase**

```bash
git fetch origin
git rebase origin/main
```

**Bước 2: Mở file có conflict — tìm markers:**

```
<<<<<<< HEAD
Phiên bản code của bạn
=======
Phiên bản code từ main
>>>>>>> origin/main
```

**Bước 3: Chọn code đúng, xóa tất cả markers** (`<<<<<<<`, `=======`, `>>>>>>>`)

**Bước 4: Stage và tiếp tục rebase**

```bash
git add .
git rebase --continue
```

**Bước 5: Push (force-with-lease vì history thay đổi)**

```bash
git push --force-with-lease origin {branch-name}
```

> 💡 **Phòng tránh:** Pull main thường xuyên, rebase branch trước khi tạo Pull Request.

---

## Detached HEAD

### Vấn đề

Terminal hiển thị `HEAD detached at abc1234` — bạn không ở trên branch nào cả.

### Nguyên nhân

Bạn đã checkout một commit cụ thể (thay vì branch), hoặc rebase bị gián đoạn.

### Giải pháp

**Nếu chưa commit gì mới:**

```bash
# Quay lại branch cũ
git checkout main
# Hoặc quay lại branch đang làm
git checkout feat/TASK-42-add-upload
```

**Nếu đã commit trên detached HEAD (muốn giữ lại):**

```bash
# Tạo branch mới từ vị trí hiện tại
git checkout -b recovery-branch
```

---

## Stale Branches — Branch cũ tích tụ

### Vấn đề

Repository có quá nhiều branch cũ đã merge nhưng chưa xóa.

### Nguyên nhân

Không xóa branch sau khi merge Pull Request.

### Giải pháp

**Xóa local branches đã merge:**

```bash
# Xem branches đã merge vào main
git branch --merged main

# Xóa tất cả branches đã merge (trừ main)
git branch --merged main | grep -v "main" | xargs git branch -d
```

**Xóa remote branches đã merge:**

```bash
# Prune remote references
git fetch --prune

# Hoặc xóa remote branch cụ thể
git push origin --delete feat/TASK-old-branch
```

> 💡 **Thói quen tốt:** Xóa branch ngay sau khi Pull Request được merge. GitHub có option "Delete branch" tự động.

---

## Authentication — Lỗi xác thực

### Vấn đề

```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

### Nguyên nhân

SSH key chưa setup hoặc hết hạn, hoặc SSH agent chưa chạy.

### Giải pháp

**Bước 1: Kiểm tra SSH key có tồn tại:**

```bash
ls -la ~/.ssh/
# Tìm file id_ed25519 và id_ed25519.pub
```

**Bước 2: Kiểm tra SSH agent đang chạy:**

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Bước 3: Test kết nối:**

```bash
ssh -T git@github.com
```

**Nếu vẫn lỗi:**
- Kiểm tra key đã add vào GitHub chưa (GitHub → Settings → SSH keys)
- Tạo key mới nếu cần (xem [Setup guide](setup.md#bước-3-tạo-ssh-key))

---

## Large Files — File quá lớn

### Vấn đề

```
remote: error: File xxx.zip is 150.00 MB; this exceeds GitHub's file size limit of 100.00 MB
```

### Nguyên nhân

Commit file lớn (ảnh, video, zip) vượt quá giới hạn 100MB của GitHub.

### Giải pháp

**Bước 1: Xóa file khỏi commit (nhưng giữ file trên máy):**

```bash
git rm --cached path/to/large-file.zip
```

**Bước 2: Thêm vào .gitignore:**

```bash
echo "path/to/large-file.zip" >> .gitignore
git add .gitignore
git commit -m "chore: add large file to gitignore"
```

**Phòng tránh — .gitignore best practices:**

```gitignore
# Thường nên có trong .gitignore
node_modules/
.env
.env.local
*.zip
*.tar.gz
*.mp4
.DS_Store
dist/
build/
```

---

## Accidentally Committed Sensitive Data — Lỡ commit dữ liệu nhạy cảm

### Vấn đề

Lỡ commit file chứa mật khẩu, API key, hoặc secret token.

### Nguyên nhân

File `.env` hoặc config chứa secrets không có trong `.gitignore`.

### Giải pháp

> ⚠️ **KHẨN CẤP:** Nếu đã push lên remote, secret đã bị lộ. Phải rotate (thay đổi) secret ngay lập tức, bất kể bạn có xóa commit hay không.

**Bước 1: Rotate secret ngay** — Đổi mật khẩu, tạo API key mới, revoke token cũ.

**Bước 2: Xóa file khỏi Git history:**

```bash
# Nếu chưa push — reset commit
git reset HEAD~1
# Thêm file vào .gitignore rồi commit lại

# Nếu đã push — liên hệ Techlead
# Cần dùng git filter-branch hoặc BFG Repo-Cleaner
```

**Bước 3: Thêm vào .gitignore:**

```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: add env files to gitignore"
```

**Phòng tránh:**
- Luôn có `.env` trong `.gitignore` từ đầu
- Dùng `.env.example` (không chứa giá trị thật) để document biến cần thiết
- Review diff trước khi commit: `git diff --staged`

---

## Undo Last Commit — Hoàn tác commit cuối

### Vấn đề

Commit nhầm hoặc commit chưa hoàn chỉnh.

### Nguyên nhân

Commit quá sớm, thiếu file, hoặc message sai.

### Giải pháp

**Giữ lại changes (unstage):**

```bash
git reset --soft HEAD~1
# Files vẫn staged, sẵn sàng commit lại
```

**Bỏ changes hoàn toàn:**

```bash
git reset --hard HEAD~1
# ⚠️ NGUY HIỂM: Mất hết thay đổi trong commit đó
```

**Chỉ sửa commit message:**

```bash
git commit --amend -m "feat: correct commit message"
```

> ⚠️ Nếu đã push, cần `git push --force-with-lease` sau khi amend/reset. Chỉ làm trên branch cá nhân, **KHÔNG** trên main.

---

## Quick Reference — Cheat Sheet

| Vấn đề | Giải pháp nhanh |
|--------|----------------|
| Merge conflict | `git rebase origin/main` → resolve → `git add .` → `git rebase --continue` |
| Detached HEAD | `git checkout main` hoặc `git checkout -b recovery-branch` |
| Branch cũ | `git branch --merged main \| grep -v "main" \| xargs git branch -d` |
| SSH lỗi | `eval "$(ssh-agent -s)"` → `ssh-add ~/.ssh/id_ed25519` |
| File quá lớn | `git rm --cached {file}` → thêm `.gitignore` |
| Commit nhạy cảm | Rotate secret ngay → `git reset HEAD~1` → `.gitignore` |
| Undo commit | `git reset --soft HEAD~1` (giữ changes) |

---

## Khi nào cần hỗ trợ

| Tình huống | Liên hệ ai |
|-----------|-----------|
| Conflict phức tạp (nhiều files) | Tag Techlead trên Telegram |
| Secrets bị lộ, đã push | Techlead + xoay secrets ngay |
| Repository hỏng, không thể fix | Techlead sẽ hỗ trợ recovery |
| Không chắc chắn command nào an toàn | Hỏi trước, chạy sau |

---

## Liên kết

- [Setup lần đầu](setup.md) — cài đặt Git lại từ đầu
- [Branching Strategy](branching.md) — quy tắc branch
- [Pull Request & Review](pr-review.md) — quy trình tạo Pull Request
- [Automation](automation.md) — Agent tự động làm gì
- [Git Overview](README.md) — tổng quan

---

*Thuộc Phase 6: Tool Guides*
*Cập nhật: 2026-02-13*
