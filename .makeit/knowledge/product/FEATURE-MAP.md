# MakeIt — Feature Map

> **Last updated:** 2026-02-17 | **Version:** 1.0
> **Status:** Draft — awaiting PO review
> **Maintained by:** PO

---

## Summary

> **Total features:** 11 modules | **Shipped:** 1 | **In Progress:** 1 | **Planned:** 9
> **Last feature shipped:** Clipart Library Management
> **Current focus:** Campaign Management

---

## 1. Feature Inventory

### 1.1 Clipart Library Management ✅

> Quản lý kho clipart assets cho artwork composition.
> **Cấu trúc:** Library → Collections → Cliparts

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Upload cliparts (file) | ✅ Shipped | Upload clipart bằng file → hệ thống tự động tạo Collection | Auto-create collection |
| Upload cliparts (folder) | ✅ Shipped | Upload bằng folder → folder name = Collection name | Folder = Collection |
| Collection Management | ✅ Shipped | Quản lý collections trong library (tạo, sửa, xóa) | Library chứa Collections, Collection chứa Cliparts |
| Organize cliparts | ✅ Shipped | Quản lý, phân loại cliparts trong collections | |
| Delete cliparts | ✅ Shipped | Xóa cliparts khỏi library | Lifecycle: Active → Deleted (không có Archive) |
| Use in Artwork | ✅ Shipped | Cliparts available khi tạo Artwork (via Customize Tools) | |

### 1.2 Campaign Management 🚧

> Core flow: Chọn Artwork → chọn Product Base(s) → chọn Mockup(s) → Option Set auto-generated → Publish.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Create Campaign | 🚧 Building | Tạo campaign mới với full flow | Core feature |
| Edit Campaign | ⏳ Planned | Chỉnh sửa campaign đã tạo | |
| Pause Campaign | ⏳ Planned | Tạm dừng campaign (Active → Paused) | Có thể Resume |
| Resume Campaign | ⏳ Planned | Kích hoạt lại campaign đã pause | Paused → Active |
| Delete Campaign | ⏳ Planned | Xóa campaign | |
| Campaign Status Flow | ⏳ Planned | Draft → Ready → Active → Paused / Deleted | Xem DOMAIN-MODEL.md Section 5 |

### 1.3 Artwork Management ⏳

> Quản lý artwork/design assets. Artwork chứa Layouts + Customize Tools → auto-generate Option Set.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Create Artwork | ⏳ Planned | Seller tạo artwork với Layouts + Customize Tools | Core creation flow |
| Layout Management | ⏳ Planned | Tạo/sửa layouts trong artwork (VD: 1/2/3 nhân vật) | Buyer chọn layout trên storefront |
| Customize Tools | ⏳ Planned | Thêm elements: text input, clipart, image upload, crossword, Spotify barcode... | Auto-generate options khi xong |
| Edit Artwork | ⏳ Planned | Chỉnh sửa artwork đã tạo | |
| Delete Artwork | ⏳ Planned | Xóa artwork | |

### 1.4 Mockup Management ⏳

> Quản lý mockup templates. Mockup = ảnh base + Print Area.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Upload Mockup Base | ⏳ Planned | Seller upload ảnh base sản phẩm | |
| Define Print Area | ⏳ Planned | Seller xác định vùng in (vị trí, kích thước) trên mockup | Core UX challenge |
| Preview Mockup | ⏳ Planned | Xem mockup với artwork composite lên print area | |
| Edit Mockup | ⏳ Planned | Chỉnh sửa mockup/print area | |
| Delete Mockup | ⏳ Planned | Xóa mockup | |

### 1.5 Option Set Management ⏳

> Quản lý customize option sets cho campaigns. **Auto-generated từ Artwork layers.**

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Auto-generate Options | ⏳ Planned | Tự động tạo option set từ Artwork layers (Layout + Customize Tools + Clipart Library) | Core automation |
| Edit Options | ⏳ Planned | Seller tinh chỉnh options sau khi auto-generate (rules, defaults, labels) | |
| Option Types | ⏳ Planned | Support các types: text input, image upload, clipart selector, color picker, crossword, Spotify barcode... | Xem Customize Tools trong DOMAIN-MODEL |
| **Conditional Logic** | ⏳ Planned | Seller thiết lập luồng điều kiện: chọn option A → hiện/ẩn option B trên storefront. VD: chọn Layout "1 nhân vật" → chỉ hiện options của 1 nhân vật | UX: đơn giản hóa trải nghiệm buyer |
| Preview Options | ⏳ Planned | Xem options như buyer sẽ thấy trên storefront (bao gồm conditional flow) | |

### 1.6 Order Management ⏳

> Quản lý đơn hàng + tự động sinh printfile + attach vào Shopify Order.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Receive Orders | ⏳ Planned | Nhận order data từ Shopify (webhook/API) | |
| Auto-generate Printfiles | ⏳ Planned | Sinh printfile từ Artwork + buyer customize data | **Bất đồng bộ** — không block Shopify checkout |
| Attach to Shopify Order | ⏳ Planned | Gắn printfile vào Shopify Order | Update sau khi generate xong |
| View Order Details | ⏳ Planned | Xem chi tiết order + customization data + printfile | |
| Download Printfiles | ⏳ Planned | Seller download printfiles để gửi fulfillment | |
| Retry Failed Printfiles | ⏳ Planned | Retry khi printfile generation failed | |

### 1.7 Storefront Widget ⏳

> Live preview + customization UI cho buyer trên product page. **80% mobile users.**

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Widget Embed | ⏳ Planned | Nhúng widget vào Shopify product page (App Block) | |
| Layout Selector | ⏳ Planned | Buyer chọn layout (VD: số nhân vật) | |
| Customize Form | ⏳ Planned | Form nhập tên, chọn màu, upload ảnh... theo Option Set | |
| Live Preview | ⏳ Planned | Realtime preview sản phẩm khi buyer thay đổi options | **Server-side rendering** |
| Mobile Responsive | ⏳ Planned | Optimized cho 80% mobile users | Critical UX |
| Add to Cart | ⏳ Planned | Buyer thêm sản phẩm đã customize vào giỏ hàng Shopify | |

### 1.8 Pricing & Subscription ⏳

> Billing, plan management, usage tracking.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Subscription Plans | ⏳ Planned | $49/mo base price (premium positioning) | Tương tự Customily |
| Transaction Fee | ⏳ Planned | Per-order fee (TBD cụ thể) | |
| Volume Deals | ⏳ Planned | Custom deals cho high-volume sellers | |
| Usage Tracking | ⏳ Planned | Track orders, usage metrics | |
| Shopify Billing API | ⏳ Planned | Integration với Shopify Billing | |

### 1.9 Store Setting ⏳

> Cấu hình store-level settings.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Store Configuration | ⏳ Planned | Cấu hình settings cho store | ⚠️ PO: Chi tiết settings nào? |
| Branding | ⏳ Planned | Custom branding cho widget | ⚠️ PO: Có custom branding? |

### 1.10 Demo Store ⏳

> Store mẫu để showcase cho sellers tiềm năng.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Demo Store Setup | ⏳ Planned | Store Shopify mẫu với campaigns đã setup sẵn | Marketing/Sales tool |
| Sample Campaigns | ⏳ Planned | Campaigns demo cho các use cases phổ biến | |

### 1.11 Landing Page ⏳

> Marketing page giới thiệu MakeIt.

| Feature | Status | Description | Notes |
|---------|:------:|-------------|-------|
| Landing Page | ⏳ Planned | Trang marketing giới thiệu MakeIt, features, pricing | |
| App Store Listing | ⏳ Planned | Shopify App Store listing content | |

---

## 2. Feature Dependencies

> Thứ tự build dựa trên dependencies giữa các modules.

```
Clipart Library  ✅ Done
       │
       ▼
   Artwork Mgmt  ─────────────────┐
       │                           │
       ▼                           ▼
  Campaign Mgmt ◄── Mockup Mgmt  Option Set Mgmt
       │               (auto-generated from Artwork)
       ▼
 Storefront Widget
       │
       ▼
 Order Management ──► Printfile Engine (server-side)
       │
       ▼
 Pricing & Subscription
       │
       ▼
 Store Setting ─► Demo Store ─► Landing Page
```

**Critical Path:**

| Order | Module | Depends on | Why first |
|:-----:|--------|-----------|-----------|
| 1 | ✅ Clipart Library | — | Foundation asset cho Artwork |
| 2 | 🚧 Campaign Management | Clipart Library | Core product feature |
| 3 | Artwork Management | Clipart Library | Cần trước để tạo Campaign |
| 4 | Mockup Management | — | Cần trước để tạo Campaign |
| 5 | Option Set Management | Artwork | Auto-generated từ Artwork |
| 6 | Storefront Widget | Campaign + Option Set | Buyer-facing — cần Campaign ready |
| 7 | Order Management | Storefront Widget | Cần buyer có thể order trước |
| 8 | Pricing & Subscription | — | Có thể build song song |
| 9 | Store Setting | — | Có thể build song song |
| 10 | Demo Store | Storefront Widget | Cần product hoạt động trước |
| 11 | Landing Page | — | Có thể build bất kỳ lúc nào |

---

## 3. Technical Debt & Known Issues

| # | Issue | Severity | Affects | Workaround |
|---|-------|:--------:|---------|------------|
| 1 | AI Feature roadmap chưa defined | Medium | Product strategy | Gap acknowledged — cần PO define |
| 2 | Transaction fee chưa xác định | Low | Pricing & Subscription | $49/mo base confirmed, fee TBD |
| — | *Chưa có thêm tech debt (MVP stage)* | — | — | — |

> ⚠️ **Note:** Product đang ở MVP stage nên tech debt tối thiểu. Sẽ track khi codebase grow.

---

## 4. Feature Requests (Backlog)

> Ideas và requests chưa được prioritize vào MVP.

| # | Request | Source | Priority | Feasibility | Notes |
|---|---------|:------:|:--------:|:-----------:|-------|
| 1 | AI-assisted design | Market trend | P2 | Medium | Competitors (Customily) đã có basic AI. Chi tiết TBD |
| 2 | Multi-store sync | Market (Teeinblue có) | P3 | Hard | Sau MVP |
| 3 | Fulfillment partner integration | Market | P2 | Medium | Kết nối trực tiếp với print partners |
| 4 | A/B test campaigns | Internal | P3 | Medium | Test different designs/options |
| 5 | Analytics dashboard | Internal | P2 | Easy | Conversion rate, popular options |

> ⚠️ **PO:** Review backlog — thêm/sửa priority, thêm requests mới.

---

## Domain Reference

> Cross-references sang documents khác trong Product Context Hub.

| Topic | Document | Section |
|-------|----------|---------|
| Domain concepts used here | `DOMAIN-MODEL.md` | Core Concepts |
| Product overview & personas | `PRODUCT-OVERVIEW.md` | All sections |
| User flows per feature | `USER-JOURNEYS.md` | Seller/Buyer Journeys |
| Technical implementation | `SYSTEM-ARCHITECTURE.md` | Component Overview |

---

<!-- 
  PO REVIEW CHECKLIST (v1.0 — 2026-02-17)
  
  ☐ Section 1 — Review feature inventory per module
  ☐ Section 2 — Confirm dependency order
  ☐ Section 3 — Add known tech debt / issues
  ☐ Section 4 — Review/add backlog items
  ☐ Store Setting — Chi tiết settings nào cần?
  ☐ Branding — Có custom branding cho widget?
═══════════════════════════════════════════════════
-->
