# Lark

## Overview

Lark là nền tảng workspace all-in-one mà team MakeIt sử dụng cho **task tracking** và **team communication**. Trong workflow hằng ngày, Lark đóng vai trò trung tâm — nơi tạo, theo dõi, và quản lý tất cả công việc từ Sprint issues đến Tech tasks.

> 📌 **Lark = Layer 1 trong Source of Truth.** Xem [Source of Truth Hierarchy](../../workflows/team-workflow.md#source-of-truth-hierarchy) để hiểu vị trí của Lark trong hệ thống.

---

## Lark trong MakeIt Workflow

Team MakeIt vận hành theo mô hình **3-Layer Source of Truth**:

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 1: Lark (Task Tracking)                                  │
│  ─────────────────────────────                                  │
│  • Sprint Issues (PO tạo)                                       │
│  • User Story Issues (BA tạo)                                   │
│  • Tech Task Issues (Techlead tạo)                              │
│  • Team communication (Messenger)                               │
│  • Meeting notes (Docs)                                         │
│                                                                 │
│  → Source of truth cho: ai đang làm gì, task ở trạng thái nào  │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2: Local Workspace (Working Files)                       │
│  → SPECS, ROADMAP, PLAN — ephemeral, AI agent dùng             │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3: Git (Final Deliverables)                              │
│  → Code, documentation — committed artifacts                    │
└─────────────────────────────────────────────────────────────────┘
```

**Tóm tắt:** Lark giữ trạng thái "hiện tại" của mọi công việc. Local workspace là nơi AI agent xử lý. Git là nơi lưu kết quả cuối cùng.

---

## Ai dùng Lark, dùng để làm gì

Mọi thành viên trong team đều sử dụng Lark, nhưng mỗi role tạo loại issue khác nhau:

| Role | Tạo gì trên Lark | Mục đích |
|------|-------------------|----------|
| **Product Owner** | Sprint Issues | Định nghĩa Sprint Goal, scope, timeline |
| **Business Analyst** | User Story Issues | Chia nhỏ PO Goal thành stories có acceptance criteria |
| **Techlead** | Tech Task Issues | Break stories thành FE/BE tasks, assign cho Dev |
| **Dev FE / Dev BE** | Update task status | Chuyển task qua các columns: Todo → In Progress → Done |
| **Designer** | Comment, share links | Chia sẻ Figma links, feedback trên design |
| **Tất cả roles** | Messenger, Docs | Communication hằng ngày, meeting notes |

> 💡 **Agent cũng dùng Lark.** AI agents trong Antigravity IDE đọc/ghi Lark qua Lark MCP — tự động đọc Sprint issues, tạo/update tasks, gửi messages. Xem chi tiết tại [Automation](./automation.md).

---

## Lark gồm những gì

Team MakeIt sử dụng 3 tính năng chính của Lark:

### 1. Bitable (Task Board)

Bitable là database dạng bảng (tương tự Notion database) — dùng để quản lý Sprint board với columns, fields, và views.

→ Chi tiết: [Task Board Setup](./task-board.md)

### 2. Messenger

Messenger là nơi team communication hằng ngày — channels, group chats, direct messages.

→ Chi tiết: [Conventions](./conventions.md)

### 3. Docs

Lark Docs dùng cho meeting notes, shared documents, và collaboration.

→ Chi tiết: [Conventions](./conventions.md#meeting-notes)

---

## Quick Links

| Trang | Nội dung |
|-------|----------|
| [Setup Guide](./setup.md) | Tạo account, join workspace, cài đặt Bitable |
| [Task Board](./task-board.md) | Columns, fields, views, sprint lifecycle trên board |
| [Conventions](./conventions.md) | Khi nào move task, Messenger channels, @mention rules |
| [Automation](./automation.md) | Agent tự động làm gì vs Bạn cần làm gì |
| [Troubleshooting](./troubleshooting.md) | Common issues và cách giải quyết |

---

## Related Documents

- [Team Workflow](../../workflows/team-workflow.md) — Quy trình 5 stages end-to-end
- [Sprint Planning](../../workflows/sprint-planning.md) — Ceremony phân chia công việc
- [Quality Gates](../../reference/quality-gates.md) — Checklist tại mỗi handoff point

---
*Tool: Lark · [← Tools](../README.md)*
