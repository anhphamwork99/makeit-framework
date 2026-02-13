# Figma

## Overview

Figma là design tool chính của team MakeIt — nơi Designer tạo giao diện, và là **source of truth cho UI** trong toàn bộ workflow.

Mọi thứ liên quan đến thiết kế giao diện đều bắt đầu từ Figma: screen layouts, component designs, interaction states, design tokens (colors, typography, spacing), và responsive breakpoints. Khi Designer hoàn thiện design, các roles khác sẽ dựa vào Figma để phân tích, triển khai, và kiểm tra kết quả.

---

## Figma trong pipeline MakeIt

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Stage 1     │    │  Stage 2     │    │  Stage 3     │    │  Stage 4     │
│              │    │              │    │              │    │              │
│  Designer    │───▶│  BA phân     │───▶│  Techlead    │───▶│  Dev FE      │
│  tạo design  │    │  tích design │    │  break tasks │    │  implement   │
│  trên Figma  │    │  từ Figma    │    │  từ specs    │    │  từ Figma    │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
      ▲                                                           │
      │              Figma là source of truth cho UI              │
      └───────────────────────────────────────────────────────────┘
                    Stage 5: Review so sánh UI vs Design
```

**Luồng thông tin từ Figma:**

| Stage | Vai trò | Dùng Figma để làm gì |
|-------|---------|---------------------|
| Stage 1 | Designer | Tạo và hoàn thiện design screens, mark "Ready for Dev" |
| Stage 2 | Business Analyst | Phân tích design screens, document user flow, identify edge cases |
| Stage 3 | Techlead | Review design specs để break technical tasks |
| Stage 4 | Dev Frontend | Extract design tokens, implement UI theo design |
| Stage 5 | Reviewer + Designer | So sánh implementation với design gốc |

---

## Ai dùng Figma nhiều nhất

### Designer (tạo và quản lý)
- Tạo screen designs, define interaction states
- Quản lý design system (components, styles, tokens)
- Mark screens "Ready for Dev" khi hoàn thiện
- Review implementation so với design gốc

### Business Analyst (phân tích)
- Phân tích design screens kết hợp với PO goals
- Document user flows từ design (entry point → happy path → edge cases)
- Extract requirements từ design specs (spacing, colors, states)

### Dev Frontend (implement)
- Inspect design trong Dev Mode (spacing, colors, typography)
- Extract design tokens cho implementation
- So sánh UI đã implement với Figma gốc

### Techlead, Dev Backend, Product Owner
- Xem design để hiểu scope feature
- Review UI implementation khi cần

---

## Thuật ngữ Figma cơ bản

| Thuật ngữ | Giải thích |
|-----------|-----------|
| **Frame** | Khung chứa design — tương tự một "screen" hay "section" |
| **Component** | Element có thể tái sử dụng (button, input, card) |
| **Variant** | Các phiên bản khác nhau của cùng một component (size, state) |
| **Auto Layout** | Tính năng tự động sắp xếp elements (giống CSS Flexbox) |
| **Design Token** | Giá trị design được đặt tên (color, spacing, typography) |
| **Dev Mode** | Chế độ dành cho developer — hiện specs, CSS properties |
| **Prototype** | Bản demo tương tác giữa các screens |

---

## Hướng dẫn chi tiết

| Trang | Nội dung |
|-------|---------|
| [Cài đặt và truy cập](setup.md) | Tạo tài khoản, request access, làm quen giao diện |
| [Quy trình handoff](handoff.md) | "Ready for Dev" process — Designer giao cho Dev |
| [Conventions](conventions.md) | Quy tắc đặt tên file, component, comment |
| [Agent Automation](automation.md) | Agent tự động làm gì vs bạn cần làm gì |
| [Xử lý sự cố](troubleshooting.md) | Các vấn đề thường gặp và cách giải quyết |

---

## Liên kết hữu ích

- [Team Workflow](../../workflows/team-workflow.md) — quy trình tổng thể của team
- [Role Workflows](../../roles/) — chi tiết quy trình từng role
- [Quality Gates](../../reference/quality-gates.md) — checklist tại mỗi handoff point

---

*Document: wiki/tools/figma/README.md*
*Phase: 06 — Tool Guides*
*Last updated: 2026-02-13*
