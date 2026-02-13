# Quy trình Handoff — "Ready for Dev"

## Overview

Handoff là quy trình Designer giao design cho team phát triển. Khi design hoàn thiện, Designer đánh dấu "Ready for Dev" — signal cho Business Analyst bắt đầu phân tích, và Dev Frontend bắt đầu implement.

Handoff đúng cách giúp tránh tình trạng:
- Dev implement sai vì design chưa hoàn thiện
- Business Analyst phân tích thiếu vì design còn placeholder
- Team mất thời gian hỏi lại Designer về details đã có trong design

---

## Luồng handoff tổng thể

```
┌──────────────────┐
│  Designer hoàn   │
│  thiện design    │
│  trên Figma      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐     ┌────────────────────────────────────┐
│  Designer chạy   │────▶│  Handoff Checklist (bên dưới)      │
│  qua checklist   │     │  Đảm bảo design đủ thông tin      │
└────────┬─────────┘     └────────────────────────────────────┘
         │
         ▼
┌──────────────────┐
│  Mark screens    │
│  "Ready for Dev" │
│  trong Figma     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Thông báo trên  │
│  Telegram:       │
│  "Design ready"  │
└────────┬─────────┘
         │
    ┌────┴────────────────────┐
    ▼                         ▼
┌──────────────┐     ┌──────────────┐
│  BA phân tích│     │  Dev FE      │
│  design →    │     │  inspect     │
│  user stories│     │  design →    │
│              │     │  implement   │
└──────────────┘     └──────────────┘
```

---

## Designer Handoff Checklist

Trước khi mark design là "Ready for Dev", Designer cần đảm bảo:

### Design Content

- [ ] **Tất cả screens hoàn thiện** — không còn placeholder text, images, hoặc "TODO"
- [ ] **Interaction states đầy đủ** — mỗi element có đủ states:
  - Default, Hover, Active/Pressed, Disabled
  - Error state (nếu là form element)
  - Empty state (nếu là list/content area)
  - Loading state (nếu có async operation)
- [ ] **Copy/text đã finalize** — nội dung chữ là bản chính thức, không phải lorem ipsum
- [ ] **Edge cases được cover** — empty state, error state, long text overflow

### Design System

- [ ] **Design tokens consistent** — colors, typography, spacing dùng shared styles (không hardcode)
- [ ] **Components đúng naming convention** — theo [conventions](conventions.md)
- [ ] **Auto Layout đúng** — spacing, padding consistent

### Organization

- [ ] **Frames đặt tên rõ ràng** — mô tả màn hình, không phải "Frame 42"
- [ ] **Pages tổ chức gọn gàng** — theo cấu trúc project
- [ ] **Comments từ trước đã resolved** — không còn open comments chưa xử lý
- [ ] **Design tagged "Ready for Dev"** — dùng label, status marker, hoặc comment cố định

---

## Dev Mode — Cách inspect design

Dev Mode là chế độ đặc biệt trong Figma dành cho developer. Nó hiển thị thông tin technical thay vì design tools.

### Cách bật Dev Mode

1. Mở Figma file
2. Tìm toggle **"Dev Mode"** ở góc phải trên cùng (icon `< >`)
3. Click để chuyển sang Dev Mode

> 📌 Nếu không thấy toggle Dev Mode, bạn cần được cấp quyền. Liên hệ Designer.

### Thông tin có trong Dev Mode

| Tab | Thông tin | Ví dụ |
|-----|----------|-------|
| **Inspect** | CSS properties | `width: 320px; border-radius: 8px;` |
| **Code** | Code snippets (CSS, iOS, Android) | `background-color: #1E40AF;` |
| **Design** | Spacing, dimensions | Padding: 16px, Gap: 8px |
| **Assets** | Exportable assets | Icon SVG, Image PNG |

### Cách extract thông tin

1. **Spacing:** Click vào element → xem padding/margin ở panel phải
2. **Colors:** Click vào element → xem fill color (hex, RGB)
3. **Typography:** Click vào text → xem font family, size, weight, line-height
4. **Export assets:** Chọn element → click "Export" ở panel phải → chọn format (SVG, PNG)

---

## Design Tokens — Extract cho implementation

Design tokens là các giá trị design được đặt tên và tái sử dụng. Khi implement, Dev FE nên dùng token names thay vì hardcode giá trị.

### Các loại tokens

| Loại | Ví dụ trong Figma | Ví dụ trong code |
|------|-------------------|-----------------|
| **Color** | `brand/primary` = `#1E40AF` | `var(--color-brand-primary)` |
| **Spacing** | `spacing/md` = `16px` | `var(--spacing-md)` |
| **Typography** | `heading/h1` = Inter 32px Bold | `font: var(--heading-h1)` |
| **Border Radius** | `radius/md` = `8px` | `border-radius: var(--radius-md)` |

> 💡 **Agent Automation:** AI Agent có thể tự động extract design tokens từ Figma qua Figma MCP. Xem [Agent Automation](automation.md).

---

## Comment Protocol trong handoff

### Designer annotates

Khi design có phần phức tạp hoặc cần lưu ý đặc biệt, Designer nên:
- Để lại **comment** trực tiếp trên element cần annotation
- Ghi rõ behavior mong muốn (ví dụ: "Khi hover, đổi màu background")
- Tag member liên quan (ví dụ: tag BA hoặc Dev)

### BA/Dev hỏi lại

Khi phân tích hoặc implement, nếu gặp điểm chưa rõ:
1. Để lại **comment trên Figma** — ngay tại element cần hỏi
2. Mô tả rõ câu hỏi: "Button này khi disabled thì có tooltip không?"
3. Tag Designer hoặc PO
4. Chờ reply trước khi tiếp tục

### Resolve comments

- Khi đã trả lời và cả hai bên đồng ý → **Resolve comment**
- Comments đã resolve vẫn xem lại được (không bị xoá)
- Đừng xoá comments — hãy resolve để giữ lịch sử discussion

---

## Liên kết

- [Team Workflow — Stage 1](../../workflows/team-workflow.md#stage-1-design--po-preparation) — context đầy đủ về Design preparation
- [Quality Gates](../../reference/quality-gates.md) — checklist tại mỗi handoff point
- [Conventions](conventions.md) — quy tắc đặt tên và tổ chức trong Figma
- [Agent Automation](automation.md) — Agent tự động extract thông tin từ Figma

---

*Document: wiki/tools/figma/handoff.md*
*Phase: 06 — Tool Guides*
*Last updated: 2026-02-13*
