# Setup Git lần đầu

Hướng dẫn này giúp bạn cài đặt Git, cấu hình SSH key, clone repository, và xác nhận mọi thứ hoạt động. Chỉ cần làm **một lần** khi mới tham gia team.

---

## Yêu cầu trước khi bắt đầu

| Yêu cầu | Chi tiết |
|----------|---------|
| Git đã cài đặt | macOS: có sẵn hoặc cài qua `brew install git`. Windows: tải từ [git-scm.com](https://git-scm.com) |
| Tài khoản GitHub | Đăng ký tại [github.com](https://github.com) nếu chưa có |
| Được mời vào GitHub organization | Liên hệ Techlead để được invite vào organization của team |
| Terminal hoặc IDE | Antigravity IDE có terminal tích hợp |

---

## Bước 1: Kiểm tra Git đã cài đặt

Mở terminal và chạy:

```bash
git --version
```

Kết quả mong đợi (version có thể khác):

```
git version 2.44.0
```

Nếu chưa có Git:

```bash
# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git
```

---

## Bước 2: Cấu hình thông tin cá nhân

Git cần biết tên và email của bạn để gắn vào mỗi commit:

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email-github@example.com"
```

> ⚠️ **Quan trọng:** Dùng email trùng với email đăng ký GitHub để commit được liên kết đúng với tài khoản.

Kiểm tra lại:

```bash
git config --global --list
```

---

## Bước 3: Tạo SSH Key

SSH key giúp bạn kết nối với GitHub mà không cần nhập mật khẩu mỗi lần push/pull.

### 3.1. Tạo key mới

```bash
ssh-keygen -t ed25519 -C "email-github@example.com"
```

- Nhấn **Enter** để chấp nhận đường dẫn mặc định (`~/.ssh/id_ed25519`)
- Nhập passphrase (hoặc để trống nếu muốn bỏ qua)

### 3.2. Thêm key vào SSH agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3.3. Copy public key

```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux
cat ~/.ssh/id_ed25519.pub
# Copy output thủ công
```

### 3.4. Thêm key vào GitHub

1. Mở **GitHub.com** → Settings → SSH and GPG keys
2. Click **New SSH key**
3. Title: ghi tên máy của bạn (ví dụ: "MacBook Pro — Work")
4. Paste key đã copy
5. Click **Add SSH key**

### 3.5. Kiểm tra kết nối

```bash
ssh -T git@github.com
```

Kết quả mong đợi:

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## Bước 4: Clone Repository

```bash
# Di chuyển đến thư mục bạn muốn lưu code
cd ~/Development

# Clone repo (thay bằng URL thực tế của team)
git clone git@github.com:your-org/your-repo.git

# Di chuyển vào repo
cd your-repo
```

Kiểm tra clone thành công:

```bash
git status
```

Kết quả mong đợi:

```
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

---

## Bước 5: Cấu hình Git nâng cao (khuyến nghị)

Các settings này giúp trải nghiệm dùng Git mượt mà hơn:

```bash
# Dùng rebase thay vì merge khi pull (giữ history sạch)
git config --global pull.rebase true

# Tự động prune remote branches đã xóa
git config --global fetch.prune true

# Default branch là main
git config --global init.defaultBranch main

# Hiển thị diff dễ đọc hơn
git config --global diff.colorMoved zebra
```

---

## Bước 6: Antigravity IDE — Git Integration

Antigravity IDE có tích hợp Git sẵn:

- **Source Control panel** (sidebar trái): xem thay đổi, stage, commit
- **Terminal tích hợp**: chạy Git commands trực tiếp
- **Git Lens** (nếu có): xem ai sửa dòng nào, khi nào

> 💡 **Tip:** Antigravity IDE tự động detect repository khi mở folder đã clone. Không cần cấu hình thêm.

Bạn có thể dùng Git qua:
- **GUI** trong IDE (click chuột) — phù hợp cho stage/commit đơn giản
- **Terminal** — phù hợp cho branch, merge, resolve conflict

---

## Verify Setup thành công

Chạy checklist sau để xác nhận mọi thứ hoạt động:

| # | Kiểm tra | Command | Kết quả mong đợi |
|---|----------|---------|-------------------|
| 1 | Git version | `git --version` | Hiển thị version |
| 2 | User config | `git config user.name` | Hiển thị tên bạn |
| 3 | Email config | `git config user.email` | Hiển thị email |
| 4 | SSH connection | `ssh -T git@github.com` | "Hi username!" |
| 5 | Repo cloned | `git status` (trong repo) | "On branch main" |

✅ Nếu tất cả 5 bước đều pass — bạn đã sẵn sàng!

---

## Bước tiếp theo

- Đọc [Branching Strategy](branching.md) để hiểu quy tắc đặt tên branch
- Xem [Coding Standards](../../reference/coding-standards.md) cho commit message format
- Quay lại [Git Overview](README.md) nếu cần xem tổng quan

---

*Thuộc Phase 6: Tool Guides*
*Cập nhật: 2026-02-13*
