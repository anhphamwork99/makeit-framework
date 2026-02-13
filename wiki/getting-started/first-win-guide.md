# First Win Guide

Hướng dẫn giúp bạn hoàn thành task AI-assisted đầu tiên. Mỗi role có section riêng — tìm role của bạn và follow steps bên dưới.

> **Yêu cầu:** Đã hoàn thành [Ngày 1 Setup](first-week-checklist.md) — IDE đã cài, repo đã clone, GEMINI.md đã copy.

---

## Product Owner (PO)

**Mục tiêu:** Dùng AI draft 1 backlog item trong 10 phút
**Thời gian ước tính:** ~10 phút

### Steps:
1. Mở Antigravity IDE, mở project folder
2. Mở AI chat (Cmd+L)
3. Gõ `/makeit:help` — xem danh sách commands có sẵn cho PO
4. Gõ `/makeit:start-sprint` — AI hướng dẫn bạn bắt đầu một sprint
5. Thử draft 1 backlog item: describe feature idea → AI format thành structured item

### Kết quả mong đợi:
- Bạn thấy danh sách commands PO dùng được
- AI trả lời đúng context PO (không phải Dev hay BA)
- Bạn có 1 backlog item draft (dù chưa hoàn chỉnh)

### Tiếp theo:
📖 [PO Workflow chi tiết](../roles/po/)

---

## Business Analyst (BA)

**Mục tiêu:** Dùng AI draft 1 user story summary trong 10 phút
**Thời gian ước tính:** ~10 phút

### Steps:
1. Mở Antigravity IDE, mở project folder
2. Mở AI chat (Cmd+L)
3. Gõ `/makeit:help` — xem danh sách commands BA
4. Mô tả 1 tính năng đơn giản cho AI (ví dụ: "Tính năng cho user thêm sản phẩm vào giỏ hàng")
5. Yêu cầu AI draft user story theo format: "As a [role], I want [action], so that [benefit]"

### Kết quả mong đợi:
- AI trả lời đúng context BA
- Bạn có 1 user story draft với Acceptance Criteria
- Bạn hiểu cách AI hỗ trợ phân tích feature

### Tiếp theo:
📖 [BA Workflow chi tiết](../roles/ba/)

---

## Designer

**Mục tiêu:** Hiểu cách AI agents trong team consume design từ Figma
**Thời gian ước tính:** ~10 phút

> **Note:** Designer không cần dùng Antigravity IDE trực tiếp. "First win" = hiểu workflow, hiểu cách output của bạn được AI agents sử dụng.

### Steps:
1. Đọc qua [Figma Guide](../tools/figma/README.md) — hiểu conventions team dùng
2. Hiểu flow: Designer tạo design trong Figma → BA/Dev dùng Figma MCP trong IDE để đọc design specs
3. Xem ví dụ: Khi Dev cần implement UI, họ gõ lệnh trong IDE → AI đọc Figma file qua MCP → trả về design specs (colors, spacing, typography)
4. Review checklist "Ready for Dev" — những gì cần chuẩn bị trước khi handoff

### Kết quả mong đợi:
- Bạn hiểu MCP là gì và cách AI đọc Figma designs
- Bạn biết conventions team dùng trong Figma (naming, structure, component organization)
- Bạn biết checklist "Ready for Dev" cần check những gì

### Tiếp theo:
📖 [Designer Workflow chi tiết](../roles/designer/)
📖 [Figma Tool Guide](../tools/figma/README.md)

---

## Tech Lead (TL)

**Mục tiêu:** Dùng AI review 1 task breakdown trong 10 phút
**Thời gian ước tính:** ~10 phút

### Steps:
1. Mở Antigravity IDE, mở project folder
2. Mở AI chat (Cmd+L)
3. Gõ `/makeit:help` — xem danh sách commands TL
4. Mô tả 1 feature đơn giản → yêu cầu AI break thành FE/BE tasks
5. Review output: AI phải chia task rõ ràng — mỗi task có scope, dependencies, acceptance criteria

### Kết quả mong đợi:
- AI trả lời đúng context Techlead
- Bạn thấy task breakdown structured (không phải list chung chung)
- Bạn hiểu cách AI hỗ trợ technical planning

### Tiếp theo:
📖 [TL Workflow chi tiết](../roles/techlead/)
📖 [Coding Standards](../reference/coding-standards.md)

---

## Dev Frontend (FE)

**Mục tiêu:** Dùng AI chạy 1 code-related task trong project context
**Thời gian ước tính:** ~15 phút (lâu hơn do cần setup project context)

### Steps:
1. Mở Antigravity IDE, mở project folder (product repo, không phải framework repo)
2. Mở AI chat (Cmd+L)
3. Gõ `/makeit:help` — xem danh sách commands Dev FE
4. Yêu cầu AI giải thích codebase: "Mô tả kiến trúc frontend của project này"
5. Thử 1 task đơn giản: "Tạo 1 component Button đơn giản với variants primary/secondary" (hoặc task phù hợp project)

### Kết quả mong đợi:
- AI hiểu project context (đọc được codebase)
- AI generate code phù hợp project conventions
- Bạn hiểu flow: nhận task → AI hỗ trợ implement → self-review → PR

### Tiếp theo:
📖 [Dev FE Workflow chi tiết](../roles/dev-fe/)
📖 [Git Guide](../tools/git/README.md)

---

## Dev Backend (BE)

**Mục tiêu:** Dùng AI chạy 1 code-related task trong project context
**Thời gian ước tính:** ~15 phút (lâu hơn do cần setup project context)

### Steps:
1. Mở Antigravity IDE, mở project folder (product repo, không phải framework repo)
2. Mở AI chat (Cmd+L)
3. Gõ `/makeit:help` — xem danh sách commands Dev BE
4. Yêu cầu AI giải thích codebase: "Mô tả kiến trúc backend của project này"
5. Thử 1 task đơn giản: "Tạo 1 API endpoint GET /api/health trả về status OK" (hoặc task phù hợp project)

### Kết quả mong đợi:
- AI hiểu project context (đọc được codebase)
- AI generate code phù hợp project conventions
- Bạn hiểu flow: nhận task → AI hỗ trợ implement → self-review → PR

### Tiếp theo:
📖 [Dev BE Workflow chi tiết](../roles/dev-be/)
📖 [Git Guide](../tools/git/README.md)

---
*Section: Getting Started · [← Wiki Home](../README.md)*
