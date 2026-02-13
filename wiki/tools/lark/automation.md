# Lark Automation — Agent vs Human

> **Mục đích:** Phân rõ ranh giới — AI Agent tự động xử lý gì qua Lark MCP, và bạn cần làm gì thủ công.

---

## Overview

Trong MakeIt workflow, AI agents (chạy trong Antigravity IDE) có thể tương tác với Lark thông qua **Lark MCP** (Model Context Protocol). Agent tự động đọc/ghi Lark để hỗ trợ bạn trong sprint lifecycle.

Tuy nhiên, **không phải mọi thứ đều tự động**. Bảng dưới đây phân rõ phần nào Agent xử lý và phần nào bạn cần tự làm.

---

## Agent tự động làm gì vs Bạn cần làm gì

| Agent tự động (qua Lark MCP) | Bạn cần làm |
|-------------------------------|-------------|
| ✅ Đọc Sprint Issues từ Bitable | 📝 Tạo workspace structure ban đầu |
| ✅ Gửi messages tới channels/groups | 📝 Manage permissions, invite members |
| ✅ Tạo/update Bitable records | 📝 Conduct meetings, take meeting notes |
| ✅ Đọc Lark Docs content | 📝 Review và approve task transitions |
| ✅ Tìm kiếm tasks theo filters | 📝 Configure notification preferences |
| ✅ Đọc file attachments từ Lark | 📝 Manually update tasks khi Lark MCP fails |
| ✅ Tạo comments trên records | 📝 Resolve conflicts giữa team members |

---

## Chi tiết: Agent tự động (Lark MCP)

### Đọc Sprint Issues từ Bitable

Khi bạn chạy `/makeit:clarify`, Agent sẽ:
1. Kết nối tới Bitable Sprint Board qua Lark MCP
2. Đọc Sprint Issue record (goal, timeline, priority)
3. Tạo SPECS.md từ thông tin đọc được
4. Bạn xác nhận SPECS.md → Agent tiếp tục workflow

**Tool dùng:** `lark_bitable_search_records`, `lark_bitable_get_record`

### Gửi Messages tới Channels

Khi bạn chạy `/makeit:complete`, Agent sẽ:
1. Tạo handoff message theo template
2. Gửi notification tới channel phù hợp (#sprint-current)
3. Tag người nhận tiếp theo trong pipeline

**Tool dùng:** `lark_im_send_message`

### Tạo/Update Bitable Records

Agent có thể tự động:
- Tạo mới records trên Bitable (ví dụ: tạo User Story issues)
- Update status fields (ví dụ: chuyển task sang "Done")
- Cập nhật fields (ví dụ: fill Acceptance Criteria)

**Tool dùng:** `lark_bitable_create_record`, `lark_bitable_update_record`

### Đọc Lark Docs Content

Agent đọc shared documents để lấy context:
- Meeting notes từ Sprint Planning
- Shared specs documents
- Previous handoff notes

**Tool dùng:** `lark_docx_get_document_content`

### Tìm kiếm Tasks theo Filters

Agent search Bitable records theo điều kiện:
- Tìm tất cả tasks trong Sprint hiện tại
- Tìm tasks assigned cho member cụ thể
- Tìm tasks theo status hoặc priority

**Tool dùng:** `lark_bitable_search_records`

---

## Chi tiết: Bạn cần làm (Manual)

### Tạo Workspace Structure

Một lần duy nhất khi setup team:
- Tạo Bitable database, define fields
- Tạo Messenger channels (#general, #sprint-current, #dev-chat)
- Mời team members vào workspace

→ Hướng dẫn chi tiết: [Setup Guide](./setup.md)

### Manage Permissions

- Invite/remove members
- Set role permissions trên Bitable
- Quản lý channel access

### Meeting và Notes

Agent không thể thay thế meeting interactions:
- Facilitate discussions
- Take real-time notes
- Clarify misunderstandings giữa team members

### Review và Approve

Các quyết định cần human judgment:
- Approve task transitions (ví dụ: PO approve "Done")
- Review PR quality
- Verify story acceptance criteria met

### Configure Notifications

Cài đặt theo sở thích cá nhân:
- Chọn channel nào mute/unmute
- Set quiet hours
- Configure mobile push notifications

→ Xem [Conventions — Notification Settings](./conventions.md#notification-settings)

---

## Lark MCP trong Sprint Lifecycle

Agent sử dụng Lark MCP ở 2 thời điểm chính trong mỗi sprint:

```
Sprint Lifecycle (per role)
──────────────────────────────────────────────────────────

📥 /makeit:clarify ─────────── Agent ĐỌC Lark
│                               • Đọc Sprint Issue từ Bitable
│                               • Lấy context từ Lark Docs
│                               • Tạo SPECS.md local
│
├── /makeit:plan-phase           (local workspace - không dùng Lark)
├── /makeit:execute-phase        (local workspace - không dùng Lark)
├── /makeit:verify-phase         (local workspace - không dùng Lark)
│
📤 /makeit:complete ────────── Agent GHI Lark
                                 • Gửi handoff message
                                 • Update Bitable record status
                                 • Notify next role
```

> 💡 **Phần giữa (plan → execute → verify)** diễn ra hoàn toàn trong local workspace. Agent chỉ cần Lark ở đầu (đọc input) và cuối (ghi output).

---

## Manual Fallback Pattern

Khi Lark MCP không hoạt động (API fails, token expired, network issues), team sử dụng **manual fallback**:

### Khi nào dùng Fallback

```
Agent thử Lark MCP → Fail → Thông báo cho bạn → Bạn làm thủ công
```

### Fallback Steps

1. **Agent thông báo lỗi** — hiển thị error message cụ thể
2. **Bạn nhận Telegram notification** — Agent gửi message qua Telegram để thông báo
3. **Bạn thao tác thủ công trên Lark:**
   - Mở Bitable → tìm record cần update
   - Sửa fields thủ công
   - Copy handoff message từ Agent output → paste vào Messenger

### Fallback Cheat Sheet

| Thao tác Agent thất bại | Bạn làm gì thủ công |
|--------------------------|---------------------|
| Đọc Sprint Issue | Mở Bitable → copy thông tin Sprint Issue → paste cho Agent |
| Gửi handoff message | Copy Agent output → paste vào #sprint-current trên Messenger |
| Update task status | Mở Bitable → chọn record → đổi Status field |
| Tạo Bitable record | Mở Bitable → thêm record mới → fill fields theo Agent output |
| Đọc Lark Docs | Mở Docs → copy content → paste cho Agent |

> ⚠️ **Fallback là tạm thời.** Nếu Lark MCP liên tục fail, xem [Troubleshooting](./troubleshooting.md) để fix root cause.

---

## Summary

| Category | Method |
|----------|--------|
| **Đọc dữ liệu từ Lark** | Agent tự động qua Lark MCP |
| **Ghi dữ liệu lên Lark** | Agent tự động qua Lark MCP |
| **Workspace management** | Bạn làm thủ công (1 lần setup) |
| **Decision-making** | Bạn quyết định (approve, review) |
| **Khi MCP fail** | Fallback thủ công + fix root cause |

---

## Related Documents

- [Setup Guide](./setup.md) — Setup Lark MCP cho Agent
- [Troubleshooting](./troubleshooting.md) — Fix Lark MCP issues
- [Lark Overview](./README.md) — Tổng quan Lark trong workflow
- [Conventions](./conventions.md) — Quy tắc sử dụng hằng ngày

---
*Automation: Lark · [← Lark](./README.md)*
