# MakeIt — User Journeys

> **Last updated:** 2026-02-17 | **Version:** 1.0
> **Status:** Skeleton — high-level flows only. Chi tiết sẽ refine khi build từng feature
> **Maintained by:** PO + BA

---

## Summary

> MakeIt có **2 personas chính**: Seller (người dùng trực tiếp) và Buyer (người mua hàng).
> Document này mô tả user journeys chi tiết của từng persona, giúp AI agents hiểu flow khi build features.

---

## 1. Seller Journeys

> **Seller** = chủ store Shopify bán sản phẩm cá nhân hóa (Print-On-Demand).
> Seller tương tác trực tiếp với MakeIt Admin App.

### 1.1 Onboarding Journey

> Seller mới — từ cài app đến tạo campaign đầu tiên.

```
┌──────────────────────────────────────────────────────────┐
│                   SELLER ONBOARDING                       │
│                                                          │
│  1. Discover MakeIt                                      │
│     • Shopify App Store / Landing page / Referral        │
│                    │                                     │
│                    ▼                                     │
│  2. Install App                                          │
│     • Kết nối Shopify Store                              │
│     • Chọn plan ($49/mo)                                 │
│                    │                                     │
│                    ▼                                     │
│  3. Chuẩn bị Assets                                     │
│     • Upload cliparts → Clipart Library                  │
│       (upload by file = auto-create Collection           │
│        upload by folder = folder name = Collection)      │
│                    │                                     │
│                    ▼                                     │
│  4. Tạo Campaign đầu tiên                               │
│     → Xem Journey 1.2                                   │
│                    │                                     │
│                    ▼                                     │
│  5. Publish & bắt đầu bán                               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Key Screens:** App Store listing → Install flow → Dashboard → Clipart Library → Create Campaign

---

### 1.2 Campaign Creation Journey ⭐

> **Core journey** — flow chính của Seller trên MakeIt.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      CAMPAIGN CREATION FLOW                              │
│                                                                          │
│  Step 1: TẠO ARTWORK                                                    │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ a. Tạo Layouts (bố cục)                                │              │
│  │    VD: Layout "1 nhân vật", "2 nhân vật", "3 nhân vật" │              │
│  │                                                        │              │
│  │ b. Thêm Customize Tools vào mỗi layout                │              │
│  │    • Text input (tên, quote...)                        │              │
│  │    • Clipart selector (từ Library > Collection)        │              │
│  │    • Image upload (ảnh gia đình...)                    │              │
│  │    • Crossword, Spotify barcode, v.v.                  │              │
│  │                                                        │              │
│  │ c. ➜ Hệ thống AUTO-GENERATE Option Set từ layers      │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 2: CHỌN PRODUCT BASE(s)                                           │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Chọn từ Shopify Products (MakeIt không quản lý base) │              │
│  │ • Có thể gắn nhiều bases (1 Campaign : N Bases)        │              │
│  │ VD: Mug 11oz + Mug 15oz + Travel Mug                  │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 3: THIẾT LẬP MOCKUP(s)                                           │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ a. Upload ảnh base (ảnh sản phẩm thật)                 │              │
│  │ b. Define Print Area (vùng artwork hiển thị)           │              │
│  │    → Xác định vị trí, kích thước, hình dạng            │              │
│  │ c. Preview: artwork composite lên print area           │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 4: CẤU HÌNH OPTION SET                                           │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Option Set đã auto-generated từ Artwork              │              │
│  │ • Seller tinh chỉnh: labels, rules, defaults           │              │
│  │ • Thiết lập Conditional Logic:                         │              │
│  │   VD: Chọn "1 nhân vật" → chỉ hiện options 1 nhân vật │              │
│  │ • Preview: xem như buyer sẽ thấy trên storefront       │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 5: REVIEW & PUBLISH                                               │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Review toàn bộ: Artwork + Bases + Mockups + Options  │              │
│  │ • Campaign status: Draft → Ready → Active              │              │
│  │ • Publish → Live trên storefront                       │              │
│  └────────────────────────────────────────────────────────┘              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Key Decisions per Step:**

| Step | Seller quyết định | System hỗ trợ |
|:----:|-------------------|---------------|
| 1 | Chọn layouts, thêm customize tools nào | Auto-generate Option Set |
| 2 | Chọn product base(s) nào từ Shopify | Hiển thị danh sách Shopify Products |
| 3 | Upload ảnh, vẽ print area | Preview composite |
| 4 | Tinh chỉnh options, thiết lập conditionals | Preview storefront view |
| 5 | Confirm & publish | Status flow: Draft → Ready → Active |

---

### 1.3 Campaign Management Journey

> Seller quản lý campaigns đã tạo.

```
Campaign List
     │
     ├── View Campaign Details
     │     • Status: Draft / Ready / Active / Paused
     │     • Artwork preview
     │     • Linked product bases
     │     • Option Set config
     │
     ├── Edit Campaign
     │     • Sửa artwork, mockups, options
     │     • Thay đổi product bases
     │
     ├── Pause Campaign
     │     • Active → Paused (tạm ẩn khỏi storefront)
     │     • Có thể Resume → Active
     │
     └── Delete Campaign
           • Xóa vĩnh viễn
```

---

### 1.4 Order & Printfile Management Journey

> Seller xử lý đơn hàng và printfiles.

```
┌──────────────────────────────────────────────────────────┐
│                ORDER MANAGEMENT FLOW                      │
│                                                          │
│  1. Buyer checkout trên Shopify                          │
│     (Shopify checkout chạy bình thường)                  │
│                    │                                     │
│                    ▼ (bất đồng bộ)                       │
│  2. MakeIt nhận order data (webhook)                     │
│     • Order status: Pending                              │
│                    │                                     │
│                    ▼                                     │
│  3. Printfile Engine sinh printfile (server-side)        │
│     • Status: Generating                                │
│     • Artwork + buyer customize data → print-ready file  │
│                    │                                     │
│               ┌────┴─────┐                               │
│               ▼          ▼                               │
│         ┌─────────┐ ┌─────────┐                          │
│         │ Success │ │ Failed  │                          │
│         └────┬────┘ └────┬────┘                          │
│              │           │                               │
│              ▼           ▼                               │
│     [Attach to Order] [Retry / Manual fix]               │
│              │                                           │
│              ▼                                           │
│  4. Seller review & download printfile                   │
│     • Xem chi tiết order + customization data            │
│     • Download printfile → gửi fulfillment partner       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Key Points:**
- Printfile generation **bất đồng bộ** — không block Shopify checkout
- Seller thấy order ngay, printfile update sau
- Failed → có thể retry hoặc manual fix

---

### 1.5 Clipart Library Management Journey

> Seller quản lý clipart assets.

```
Clipart Library
     │
     ├── Upload Cliparts
     │     ├── By File → auto-create Collection
     │     └── By Folder → folder name = Collection name
     │
     ├── Manage Collections
     │     • Tạo / sửa / xóa collections
     │     • Di chuyển cliparts giữa collections
     │
     └── Use in Artwork
           • Khi tạo Artwork → chọn cliparts từ Library
           • Via Customize Tool: Clipart Selector
```

---

## 2. Buyer Journeys

> **Buyer** = người mua sản phẩm cá nhân hóa trên Shopify store cua seller.
> Buyer **KHÔNG** biết đến MakeIt — chỉ tương tác với Storefront Widget.
> **📱 80% traffic từ mobile** — mọi UI phải mobile-first.

### 2.1 Product Discovery → Purchase Journey ⭐

> **Core buyer journey** — từ browse đến checkout.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        BUYER PURCHASE FLOW                               │
│                     (📱 80% mobile users)                                │
│                                                                          │
│  Step 1: BROWSE & DISCOVER                                              │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Shopify store / Google Search / Social Media         │              │
│  │ • Landing trên Product Page                            │              │
│  │ • Thấy mockup preview + "Personalize" CTA              │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 2: CHỌN LAYOUT                                                    │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Storefront Widget hiển thị layout options            │              │
│  │ • VD: "1 nhân vật" / "2 nhân vật" / "3 nhân vật"      │              │
│  │ • Chọn layout → Conditional Logic kích hoạt            │              │
│  │   → Chỉ hiện options phù hợp layout đã chọn           │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 3: TÙY CHỈNH OPTIONS                                             │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Nhập text (tên, quote, date...)                      │              │
│  │ • Chọn cliparts (từ seller's collection)               │              │
│  │ • Upload ảnh (ảnh gia đình, pet...)                    │              │
│  │ • Chọn màu, font, size...                              │              │
│  │ • Mỗi option thay đổi → Live Preview cập nhật ngay    │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 4: LIVE PREVIEW                                                   │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Server-side rendering                                │              │
│  │ • Preview realtime trên mockup                         │              │
│  │ • Buyer thấy sản phẩm CHÍNH XÁC như sẽ nhận           │              │
│  │ • Tăng confidence → tăng conversion                    │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 5: ADD TO CART & CHECKOUT                                         │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Add to Shopify cart (kèm customization data)         │              │
│  │ • Shopify checkout bình thường                         │              │
│  │ • Payment qua Shopify                                  │              │
│  │ → Printfile sinh bất đồng bộ SAU checkout              │              │
│  └────────────────────────────────────────────────────────┘              │
│                         │                                                │
│                         ▼                                                │
│  Step 6: NHẬN SẢN PHẨM                                                 │
│  ┌────────────────────────────────────────────────────────┐              │
│  │ • Seller nhận printfile → in + ship                    │              │
│  │ • Buyer nhận sản phẩm đúng như preview                 │              │
│  │ • Sản phẩm = output của toàn bộ MakeIt pipeline       │              │
│  └────────────────────────────────────────────────────────┘              │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Buyer Emotion Map:**

| Step | Buyer cảm thấy | Design goal |
|:----:|----------------|------------|
| 1 | Hứng thú, tò mò | Mockup đẹp → attract |
| 2 | Đơn giản, rõ ràng | Layout options dễ hiểu (mobile-first) |
| 3 | Sáng tạo, thích thú | Smooth form UX, instant feedback |
| 4 | Tự tin, hài lòng | Preview chính xác, realistic |
| 5 | Nhanh, thuận tiện | Shopify checkout quen thuộc |
| 6 | Vui, hài lòng | Sản phẩm đúng kỳ vọng |

---

### 2.2 Buyer Interaction Pattern (Widget Detail)

> Chi tiết tương tác buyer với Storefront Widget.

| Action | Widget Response | Technical |
|--------|----------------|-----------|
| Mở product page | Widget load, hiển thị mockup + options | App Block embed |
| Chọn Layout | Conditional Logic → hiện/ẩn options tương ứng | Client-side logic |
| Nhập text | Live Preview cập nhật ngay | Server-side rendering |
| Chọn clipart | Preview cập nhật với clipart đã chọn | Load từ Library > Collection |
| Upload ảnh | Preview composite ảnh lên artwork | Upload + server-side render |
| Thay đổi bất kỳ option | Preview cập nhật realtime | SSR per change |
| Click "Add to Cart" | Customization data gắn vào Shopify cart item | Metafield / line item properties |
| Checkout | Shopify checkout bình thường | Buyer không thấy MakeIt |

---

## 3. Journey Comparison: Seller vs Buyer

| Aspect | Seller | Buyer |
|--------|--------|-------|
| **Biết MakeIt** | ✅ Yes — dùng MakeIt Admin App | ❌ No — chỉ thấy Widget |
| **Device** | Desktop (admin work) | 📱 80% Mobile |
| **Interaction** | Setup & configure (complex) | Customize & buy (simple) |
| **Time spent** | 30-60 min setup per campaign | 2-5 min customize per purchase |
| **Goal** | Tạo trải nghiệm cá nhân hóa tốt | Mua sản phẩm unique, đúng sở thích |
| **Pain point** | Setup phức tạp, lỗi printfile | Options confusing, preview chậm/không chính xác |
| **Success metric** | Nhiều orders, ít lỗi printfile | Sản phẩm đúng preview, nhận nhanh |

---

## 4. Edge Cases & Error Flows

### 4.1 Seller Edge Cases

| Scenario | Expected Behavior | Fallback |
|----------|-------------------|----------|
| Artwork không có Layout | Đặt default 1 layout | Warn seller |
| Không có Customize Tool | Option Set rỗng — campaign vẫn tạo được | Nhưng buyer không customize được gì |
| Product Base bị xóa trên Shopify | Campaign affected → cần xử lý | ⚠️ PO: Behavior khi base bị xóa? |
| Printfile generation failed | Hiển thị Failed status, cho phép Retry | Manual fix option |
| Upload clipart quá lớn | Giới hạn size / resize tự động | ⚠️ PO: Giới hạn cụ thể? |

### 4.2 Buyer Edge Cases

| Scenario | Expected Behavior | Fallback |
|----------|-------------------|----------|
| Upload ảnh resolution thấp | Warn buyer, vẫn cho tiếp tục | Suggest ảnh lớn hơn |
| Text quá dài | Enforce max length theo option rule | Hiện lỗi inline |
| Slow connection (mobile) | Progressive loading, skeleton UI | Offline: không customize được |
| Preview không load | Retry với loading indicator | Error message + vẫn cho add to cart |
| Buyer quay lại edit sau khi add to cart | ⚠️ PO: Cho edit hay phải remove & re-add? | |

---

## Domain Reference

> Cross-references sang documents khác trong Product Context Hub.

| Topic | Document | Section |
|-------|----------|---------|
| Domain concepts | `DOMAIN-MODEL.md` | Core Concepts (15 terms) |
| Feature inventory | `FEATURE-MAP.md` | Feature Inventory |
| Product overview | `PRODUCT-OVERVIEW.md` | Seller/Buyer Personas |
| Technical architecture | `SYSTEM-ARCHITECTURE.md` | Component Overview |

---

<!-- 
  PO REVIEW CHECKLIST (v1.0 — 2026-02-17)
  
  ☐ Section 1 — Seller journeys: flow chính xác chưa?
  ☐ Section 2 — Buyer journey: đúng trải nghiệm mong muốn?
  ☐ Section 4 — Edge cases: behavior khi Product Base bị xóa trên Shopify?
  ☐ Section 4 — Upload clipart giới hạn size bao nhiêu?
  ☐ Section 4 — Buyer edit sau add to cart: cho edit hay remove & re-add?
═══════════════════════════════════════════════════
-->
