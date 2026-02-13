# Agent Automation — Figma MCP

## Overview

Trong workflow MakeIt, AI Agent có thể tự động tương tác với Figma thông qua **Figma MCP** (Model Context Protocol). Điều này giúp tự động hoá nhiều tác vụ lặp lại như extract design specs, phân tích screens, và generate code từ design.

Document này giải thích rõ **Agent tự động làm gì** và **bạn cần làm gì** — để team biết ranh giới và không trùng lặp công việc.

---

## Agent tự động làm gì vs Bạn cần làm gì

| Agent tự động (qua Figma MCP) | Bạn cần làm (thủ công) |
|-------------------------------|------------------------|
| Extract design specs (colors, typography, spacing) | Tạo và chỉnh sửa designs trên Figma |
| Phân tích design screens (layout, components, structure) | Mark screens "Ready for Dev" |
| Generate component code từ Figma nodes | Review và approve design revisions |
| So sánh UI implementation với Figma design (parity check) | Để lại comments và feedback trên Figma |
| Đọc design tokens và variables | Quản lý file access permissions |
| Tạo design system documentation | Resolve comments và discussions |
| Extract node tree và component metadata | Tạo prototypes và interaction flows |
| Inspect specific node properties | Quyết định design direction |

### Chi tiết khả năng của Agent

**Extract design specs:**
- Agent đọc được chính xác giá trị colors (hex), typography (font, size, weight), spacing (padding, margin, gap)
- Kết quả tương đương với việc bạn inspect thủ công trong Dev Mode
- Nhanh hơn nhiều khi cần extract specs cho nhiều elements cùng lúc

**Phân tích design screens:**
- Agent xem được cấu trúc layer tree của mỗi screen
- Nhận diện components, frames, groups, và mối quan hệ parent-child
- Hiểu layout direction (horizontal, vertical), alignment, constraints

**Generate code:**
- Agent generate HTML/CSS/React code dựa trên Figma node data
- Code phản ánh cấu trúc và styling từ design
- Dev vẫn cần review và adjust code cho production quality

**Parity check:**
- Agent so sánh implementation hiện tại với Figma design
- Phát hiện sai lệch về colors, spacing, typography
- Báo cáo discrepancies để Dev fix

---

## Figma MCP Official

Team MakeIt sử dụng **Figma MCP Official** — phiên bản read-only, kết nối qua Figma REST API.

| Đặc điểm | Chi tiết |
|-----------|---------|
| **Truy cập** | Qua Figma REST API — cần Personal Access Token |
| **Quyền** | Read-only — chỉ đọc, không chỉnh sửa design |
| **Yêu cầu** | Chỉ cần token, không cần Figma Desktop |
| **Khả năng** | Extract specs, generate code, đọc tokens, đọc components |

### Ai dùng Figma MCP

| Vai trò | Cách dùng |
|---------|----------|
| Business Analyst | Phân tích design screens, extract specs cho user stories |
| Dev Frontend | Extract tokens, generate code, kiểm tra design-code parity |
| Techlead | Review design specs khi break tasks |

---

## Khi nào Agent dùng Figma MCP

### Business Analyst — `analyze-design` workflow

Agent tự động:
1. Đọc design screens từ Figma file
2. Phân tích layout, components, interaction states
3. Extract key design decisions (colors, spacing, typography)
4. Tổng hợp thông tin cho user story writing

> BA không cần mở Figma thủ công để đo spacing hay note colors — Agent extract tự động.

### Dev Frontend — `implement` workflow

Agent tự động:
1. Extract design tokens (colors, typography, spacing)
2. Generate initial component code từ Figma nodes
3. So sánh implementation với Figma (parity check)

> Dev vẫn cần review code Agent generate và adjust cho context cụ thể.

### Checking Design-Code Parity

Agent tự động:
1. Capture current implementation
2. So sánh với Figma design specs
3. Báo cáo mismatches (spacing sai, color sai, font sai)

> Hữu ích trong Stage 5 (Review) để verify UI matches design.

---

## Setup Figma MCP cho Agent

1. Tạo **Personal Access Token** trong Figma:
   - Vào Figma → Settings → Personal Access Tokens
   - Tạo token mới → copy token
2. Thêm token vào cấu hình MCP trong IDE (Antigravity)
3. Agent sẵn sàng đọc Figma files

---

## Lưu ý quan trọng

- **Agent không thay thế Designer.** Agent extract và phân tích, nhưng mọi quyết định design thuộc về Designer.
- **Agent output cần review.** Code generate từ Figma là starting point, không phải production-ready.
- **Figma file phải "Ready for Dev"** trước khi Agent phân tích — nếu design chưa hoàn thiện, Agent output cũng không chính xác.
- **Quyền truy cập:** Agent cần được cấp quyền đọc Figma file (qua token hoặc file permissions).

---

## Liên kết

- [Quy trình handoff](handoff.md) — khi nào design "Ready for Dev"
- [Cài đặt Figma](setup.md) — tạo tài khoản và truy cập
- [Xử lý sự cố](troubleshooting.md) — khi Agent không đọc được Figma

---

*Document: wiki/tools/figma/automation.md*
*Phase: 06 — Tool Guides*
*Last updated: 2026-02-13*
