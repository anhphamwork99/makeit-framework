# Lark Setup Guide

> **Mục đích:** Hướng dẫn tạo Lark account, join workspace, và cài đặt Bitable cho Sprint board từ đầu.

---

## Bước 1: Tạo Lark Account

1. Truy cập [Lark](https://www.larksuite.com/) (bản quốc tế) hoặc [Feishu](https://www.feishu.cn/) (bản Trung Quốc)
2. Đăng ký bằng email team hoặc số điện thoại
3. Xác nhận email để kích hoạt account
4. Đặt tên hiển thị theo format: **Tên thật + Role** (ví dụ: "Anh — Dev FE")

> 💡 **Team MakeIt dùng Lark (bản quốc tế)**, không phải Feishu. Đảm bảo đăng ký đúng platform.

---

## Bước 2: Join Team Workspace

1. Nhận **invite link** từ Team Lead hoặc Admin qua Telegram
2. Click link → Accept invitation
3. Bạn sẽ thấy workspace "MakeIt Team" trên sidebar
4. Kiểm tra: bạn có thể thấy các channels trong Messenger

**Nếu không nhận được invite:**
- Liên hệ Admin trên Telegram
- Cung cấp email đã đăng ký Lark
- Admin sẽ gửi lại invite hoặc thêm thủ công

---

## Bước 3: Hiểu Workspace Structure

Sau khi join, workspace bao gồm các thành phần chính:

```
MakeIt Team Workspace
├── 📨 Messenger
│   ├── #general              — Thông báo chung
│   ├── #sprint-current       — Discussion sprint hiện tại
│   └── #dev-chat             — Technical discussion
│
├── 📊 Bitable
│   └── Sprint Board          — Database quản lý tasks
│
└── 📄 Docs
    ├── Meeting Notes          — Notes các buổi họp
    └── Shared Documents       — Tài liệu chia sẻ
```

> Xem chi tiết về Messenger channels và Docs tại [Conventions](./conventions.md).

---

## Bước 4: Cài đặt Bitable — Sprint Board

Bitable là thành phần quan trọng nhất — nơi toàn bộ tasks được quản lý.

### Tạo Sprint Board Database

1. Mở **Bitable** từ sidebar trái
2. Tạo database mới → đặt tên "Sprint Board"
3. Thêm các fields theo chuẩn:

### Standard Fields (bắt buộc)

| Field | Type | Mô tả | Ví dụ |
|-------|------|--------|-------|
| **Title** | Text | Tên issue/task | "User đăng nhập bằng email" |
| **Type** | Single Select | Loại issue | Sprint Issue, User Story, Tech Task |
| **Status** | Single Select | Trạng thái hiện tại | Todo, In Progress, Review, Done |
| **Priority** | Single Select | Mức ưu tiên | High, Medium, Low |
| **Sprint** | Single Select | Sprint nào | Sprint 1, Sprint 2... |
| **Assignee** | Person | Ai phụ trách | Chọn member |
| **Created Date** | Date | Ngày tạo | Tự động |

### Optional Fields (khuyến khích)

| Field | Type | Mô tả | Dùng khi |
|-------|------|--------|----------|
| **Story Reference** | Text/Link | Link tới User Story gốc | Tech Task cần trỏ về Story |
| **Figma Link** | URL | Link Figma design | User Story có design |
| **Estimated Hours** | Number | Dự kiến mất bao lâu | Dev estimate trong Sprint Planning |
| **Start Date** | Date | Ngày bắt đầu sprint | Sprint Issue |
| **End Date** | Date | Ngày kết thúc sprint | Sprint Issue |
| **Acceptance Criteria** | Long Text | Tiêu chí chấp nhận | User Story |

> 📖 **Chi tiết về fields per issue type:** Xem [Task Board](./task-board.md#standard-fields-per-issue-type) để biết cụ thể mỗi loại issue cần fields nào.

---

## Bước 5: Thiết lập Views

Bitable cho phép tạo nhiều views khác nhau từ cùng 1 database:

| View | Mục đích | Setup |
|------|----------|-------|
| **Board View** | Xem tasks theo columns (Todo → In Progress → Review → Done) | Group by: Status |
| **List View** | Xem toàn bộ tasks dạng bảng, dễ filter | Default view |
| **Calendar View** | Xem tasks theo timeline | Group by: Sprint, sort by date |

**Cách tạo Board View:**
1. Click "Add View" → chọn "Kanban"
2. Group by field: **Status**
3. Columns sẽ tự tạo: Todo | In Progress | Review | Done

---

## Bước 6: Invite Members và Set Permissions

### Invite Members
1. Vào **Bitable** → Settings → Members
2. Thêm members bằng email hoặc tên
3. Set quyền phù hợp

### Permission Levels

| Level | Ai cần | Quyền |
|-------|--------|-------|
| **Admin** | Team Lead | Full access — tạo/xoá database, manage members |
| **Editor** | PO, BA, TL | Tạo/sửa records, manage views |
| **Viewer** | Dev (nếu chỉ cần xem) | Xem records, filter, không sửa |

> 💡 **Thực tế:** Thường tất cả members đều có quyền **Editor** để tự update task status.

---

## Bước 7: Cài đặt App

Lark có cả desktop app và mobile app:

| Platform | Download | Khuyến khích |
|----------|----------|-------------|
| **Desktop** (macOS/Windows) | [Download](https://www.larksuite.com/download) | ✅ Dùng cho daily work |
| **Mobile** (iOS/Android) | App Store / Google Play | ✅ Dùng cho notifications |
| **Web** | [app.larksuite.com](https://app.larksuite.com) | Backup khi không cài app |

**Thiết lập notification:**
- Desktop: Bật notification cho Messenger mentions và task updates
- Mobile: Bật push notification để nhận thông báo kịp thời
- Xem chi tiết tại [Conventions — Notification Settings](./conventions.md#notification-settings)

---

## Bước 8: Lark MCP App Setup (cho Agent Integration)

Nếu bạn sử dụng Antigravity IDE với AI agents, cần setup Lark MCP để agent có thể đọc/ghi Lark:

### Yêu cầu

- Antigravity IDE đã cài đặt
- GEMINI.md template đã copy (xem [Templates](../../templates/))
- Lark workspace account hoạt động

### Cài đặt

1. Trong Antigravity IDE, mở MCP settings
2. Thêm Lark MCP server theo config template
3. Cung cấp authentication credentials:
   - App ID
   - App Secret
4. Verify connection: Agent sẽ thử đọc 1 record từ Bitable

> ⚠️ **Credentials bảo mật:** Không share App ID/App Secret qua Messenger. Lưu trong environment variables hoặc secret manager.

### Agent có thể làm gì với Lark MCP

Sau khi setup, AI agent trong Antigravity IDE có thể:
- Đọc Sprint issues từ Bitable
- Tạo/update Bitable records
- Gửi messages tới channels
- Đọc Lark Docs content

→ Chi tiết: [Automation](./automation.md)

---

## Checklist Setup Hoàn Tất

- [ ] Tạo Lark account và join MakeIt workspace
- [ ] Thấy được các channels trong Messenger
- [ ] Sprint Board database tồn tại trên Bitable với đầy đủ standard fields
- [ ] Board View đã tạo với columns: Todo → In Progress → Review → Done
- [ ] Cài desktop app + mobile app
- [ ] Notification settings đã cấu hình
- [ ] (Optional) Lark MCP đã connect cho Antigravity IDE

---

## Related Documents

- [Task Board](./task-board.md) — Chi tiết columns, fields, views
- [Conventions](./conventions.md) — Quy tắc sử dụng hằng ngày
- [Lark Overview](./README.md) — Tổng quan Lark trong workflow

---
*Setup Guide: Lark · [← Lark](./README.md)*
