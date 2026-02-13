# Conventions — Quy tắc Figma trong team

## Overview

Document này quy định các conventions khi team sử dụng Figma — từ cách đặt tên file, tổ chức pages, đặt tên components, đến quy tắc comment. Mục tiêu là giữ cho Figma workspace consistent và dễ navigate cho tất cả members.

---

## File Naming

### Quy tắc đặt tên file

Mỗi Figma file nên đặt tên theo format:

```
[Project] — [Feature/Epic Name]
```

**Ví dụ:**
- `MakeIt — Homepage Redesign`
- `MakeIt — Checkout Flow`
- `MakeIt — Design System`
- `MakeIt — User Dashboard`

**Lưu ý:**
- Dùng dấu ` — ` (em dash có khoảng trắng) để ngăn cách project và feature
- Không dùng abbreviation: `MKI — HP` ❌ → `MakeIt — Homepage` ✅
- Không thêm date hoặc version vào tên file (Figma đã có version history)

---

## Page Organization

### Cách tổ chức pages trong một Figma file

Mỗi Figma file nên có structure nhất quán:

```
📄 Cover                    ← Trang bìa: tên project, status, last updated
📄 ---                      ← Separator
📄 Design System            ← Colors, typography, components (nếu file riêng)
📄 ---                      ← Separator
📄 [Screen Group 1]         ← Ví dụ: "Homepage"
📄 [Screen Group 2]         ← Ví dụ: "Product Page"
📄 [Screen Group 3]         ← Ví dụ: "Checkout"
📄 ---                      ← Separator
📄 Archive                  ← Designs cũ, không dùng nữa
```

**Lưu ý:**
- Dùng `---` (separator page) để nhóm các pages liên quan
- Page đầu tiên luôn là Cover với thông tin tổng quan
- Archive page ở cuối cùng — chứa designs cũ thay vì xoá

---

## Component Naming

### Quy tắc đặt tên component

Figma components nên đặt tên theo hệ thống phân cấp:

```
Category / Component Name / Variant
```

**Ví dụ:**

| Component | Tên trong Figma |
|-----------|----------------|
| Primary button, large | `Button / Primary / Large` |
| Text input, error state | `Input / Text / Error` |
| Navigation bar, mobile | `Navigation / Bar / Mobile` |
| Card, product type | `Card / Product / Default` |
| Icon, arrow right | `Icon / Arrow Right` |

**Quy tắc:**
- Dùng `/` (slash) để phân cấp
- Mỗi cấp viết hoa chữ cái đầu (Title Case)
- Category ở cấp cao nhất: Button, Input, Card, Icon, Navigation, Layout
- Variant properties dùng cho states: Default, Hover, Active, Disabled, Error

### Variant Properties

Khi component có nhiều variants, dùng Figma's variant properties:

| Property | Giá trị ví dụ | Mô tả |
|----------|--------------|-------|
| **Size** | Small, Medium, Large | Kích thước component |
| **State** | Default, Hover, Active, Disabled | Interaction state |
| **Type** | Primary, Secondary, Tertiary | Visual style |
| **Status** | Default, Error, Success, Warning | Validation state |

---

## Comment Protocol

### Khi nào để lại comment

| Tình huống | Ai comment | Mục đích |
|------------|-----------|---------|
| Design cần annotation | Designer | Giải thích behavior phức tạp |
| Câu hỏi về design | BA, Dev | Hỏi rõ requirement |
| Feedback sau review | Reviewer, PO | Góp ý về implementation |
| Design change request | PO, BA | Yêu cầu thay đổi design |

### Cách comment hiệu quả

**Nên làm:**
- Comment ngay tại element liên quan (đừng comment ở góc trống)
- Ghi rõ ràng: "Button này cần hover state với background #E5E7EB"
- Tag member liên quan bằng `@mention`
- Một comment = một chủ đề (đừng gom nhiều chủ đề vào một comment)

**Không nên:**
- Comment chung chung: "Cái này sai" ❌ → "Border radius nên là 8px thay vì 4px" ✅
- Comment ở vị trí không liên quan tới element đang thảo luận
- Xoá comment khi xong — hãy **resolve** thay vì xoá

### Quy trình resolve comment

```
Comment tạo mới → Thảo luận (reply) → Đồng ý → Resolve ✅
```

- Chỉ người tạo comment hoặc Designer mới nên resolve
- Comments đã resolve vẫn xem lại được (filter "Show resolved comments")
- Đảm bảo tất cả comments resolved trước khi mark "Ready for Dev"

---

## Version History

### Khi nào save version

Figma tự động save mọi thay đổi, nhưng bạn nên **tạo named version** tại các mốc quan trọng:

| Mốc | Tên version ví dụ |
|-----|-------------------|
| Design draft hoàn thành | `v1.0 — Initial Design` |
| Sau feedback round 1 | `v1.1 — PO Feedback Applied` |
| Ready for Dev | `v2.0 — Ready for Dev` |
| Sau design revision | `v2.1 — Dev Feedback Applied` |

### Cách tạo named version

1. Mở file cần save version
2. Vào menu **File** → **Save to Version History** (hoặc `Cmd/Ctrl` + `Option/Alt` + `S`)
3. Đặt tên version theo format trên
4. Thêm mô tả ngắn nếu cần

---

## Color và Style Organization

### Shared Styles

Team nên dùng **shared styles** thay vì hardcode giá trị:

| Loại | Naming convention | Ví dụ |
|------|-------------------|-------|
| **Color** | `category/shade` | `brand/primary`, `neutral/gray-100` |
| **Typography** | `category/size` | `heading/h1`, `body/regular` |
| **Effect** | `category/type` | `shadow/sm`, `shadow/lg` |

**Quy tắc:**
- Luôn dùng shared styles cho colors — không hardcode hex values
- Typography styles bao gồm font family, size, weight, line-height
- Effect styles cho shadows, blurs phổ biến
- Khi cần color mới, thêm vào shared styles trước, rồi mới apply

### Design Token Naming

Nếu team dùng design tokens (variables), naming convention:

```
category/subcategory/variant
```

Ví dụ:
- `color/brand/primary` → `#1E40AF`
- `color/neutral/gray-100` → `#F3F4F6`
- `spacing/sm` → `8px`
- `spacing/md` → `16px`
- `radius/sm` → `4px`
- `radius/md` → `8px`

---

## Liên kết

- [Quy trình handoff](handoff.md) — checklist trước khi mark "Ready for Dev"
- [Agent Automation](automation.md) — Agent extract design tokens tự động
- [Xử lý sự cố](troubleshooting.md) — khi gặp vấn đề với Figma

---

*Document: wiki/tools/figma/conventions.md*
*Phase: 06 — Tool Guides*
*Last updated: 2026-02-13*
