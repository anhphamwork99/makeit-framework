# Knowledge Base — Index

> **Auto-read instruction:** Agent PHẢI đọc file này khi bắt đầu sprint hoặc khi cần context.
> Sau khi đọc INDEX, chỉ mở file nào **liên quan trực tiếp** đến task hiện tại.
> **KHÔNG load tất cả files** — chỉ load on-demand.

---

## Product Context

> Domain knowledge, feature scope, user personas — đọc khi cần hiểu **sản phẩm đang build cái gì**.

| File | Chứa gì | Đọc khi |
|------|---------|---------|
| `product/PRODUCT-OVERVIEW.md` | Product identity, buyer/seller personas, competitive landscape, USP, pricing model | Cần hiểu sản phẩm là gì, target user là ai, khác biệt gì với competitor |
| `product/DOMAIN-MODEL.md` | 15 domain terms (Campaign, Artwork, Layout, Customize Tool, Collection, Conditional Logic...), concept relationships, cardinality, lifecycles | Cần hiểu thuật ngữ domain, quan hệ giữa các concepts, lifecycle states |
| `product/FEATURE-MAP.md` | 11 feature modules, 60+ features chi tiết, dependency graph, build order, tech debt, backlog | Cần biết feature nào đã ship/đang build/planned, dependency giữa modules |
| `product/USER-JOURNEYS.md` | Seller journeys (onboarding, campaign creation, order mgmt), Buyer purchase flow, edge cases | Cần hiểu user flow khi build UI/UX, xử lý edge cases — ⚠️ Skeleton, sẽ refine theo feature |
| `product/SYSTEM-ARCHITECTURE.md` | ⏳ Chưa tạo — System components, tech stack, integration points | Cần hiểu kiến trúc kỹ thuật |

### Quick Lookup: Thuật ngữ → File

| Nếu gặp thuật ngữ | Đọc file |
|-------------------|----------|
| Campaign, Artwork, Layout, Customize Tool, Option Set, Mockup, Print Area, Printfile, Collection, Conditional Logic, Clipart, Live Preview, Storefront Widget | `product/DOMAIN-MODEL.md` |
| Buyer persona, Seller persona, pricing, competitor, USP | `product/PRODUCT-OVERVIEW.md` |
| Feature list, module dependencies, build order, tech debt | `product/FEATURE-MAP.md` |
| User flow, checkout flow, onboarding, edge cases | `product/USER-JOURNEYS.md` |

---

## Architecture & Technical

> ⏳ Sẽ bổ sung khi có docs.

---

## Business & Operational

> ⏳ Sẽ bổ sung khi có docs.

---

<!-- 
  INDEX MAINTENANCE RULES:
  - Update INDEX.md mỗi khi tạo/xóa/đổi tên knowledge doc
  - Mỗi entry phải có: File path, Chứa gì (1 dòng), Đọc khi (trigger condition)
  - Giữ file này NGẮN — agent sẽ đọc toàn bộ INDEX mỗi sprint
  - Không inline nội dung docs vào đây — chỉ summary + pointer
-->
