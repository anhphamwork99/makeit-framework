# MakeIt — Domain Model

> **Last updated:** 2026-02-16 | **Version:** 1.1
> **Status:** Active — PO reviewed
> **Maintained by:** PO + BA

---

## Summary

> MakeIt operates in the **Print-On-Demand personalization** domain on Shopify.
> This document defines all domain concepts and their relationships.
> AI agents **MUST** use these term definitions consistently across all deliverables.
> When a term has ambiguity, this document is the **single source of truth**.

---

## 1. Core Concepts (Glossary)

| # | Term (EN) | Tiếng Việt | Definition | Example |
|---|-----------|-----------|------------|---------|
| 1 | **Campaign** | Chiến dịch | Đơn vị sản phẩm cá nhân hóa hoàn chỉnh, kết hợp Artwork + Product Base(s) + Mockup(s) + Option Set. Một Campaign = một sản phẩm cá nhân hóa mà buyer có thể mua trên storefront | Campaign "Personalized Family Mug" — chứa artwork cây gia phả, gắn với base mug trắng, có options nhập tên từng thành viên |
| 2 | **Artwork** | Artwork / Thiết kế | File design gốc mà seller tạo trong MakeIt, chứa **Layouts** (các bố cục) + **Customize Tools** (các elements tùy chỉnh). Khi seller tạo Artwork xong, hệ thống tự động generate Option Set từ các layers trong Artwork | Artwork "Family Portrait" chứa 3 layouts (1/2/3 nhân vật), mỗi layout có text inputs cho tên + clipart selections |
| 3 | **Product Base** | Sản phẩm gốc | Sản phẩm vật lý mà artwork sẽ được in lên. **Được tạo và quản lý trên Shopify**, MakeIt không quản lý product base — chỉ liên kết | Mug trắng 11oz, T-shirt đen size S-XXL, Canvas 16x20 |
| 4 | **Mockup** | Ảnh mô phỏng | Ảnh preview sản phẩm, gồm **ảnh base + Print Area** (vùng hiển thị artwork). Seller thiết lập mockup bằng cách upload ảnh base và define print area trên đó | Ảnh chiếc mug trắng + vùng print area hình chữ nhật ở giữa mug |
| 5 | **Print Area** | Vùng in | Vùng trên mockup dùng để hiển thị artwork. Được seller thiết lập khi tạo Mockup: xác định vị trí, kích thước, hình dạng vùng artwork sẽ xuất hiện trên product base | Hình chữ nhật 3x4 inch ở giữa mặt trước mug, vùng lưng trên T-shirt |
| 6 | **Layout** | Bố cục | Một biến thể bố cục trong Artwork. Cho phép cùng 1 artwork có nhiều cấu hình khác nhau — buyer chọn layout phù hợp nhu cầu | Layout "1 nhân vật", "2 nhân vật", "3 nhân vật" — buyer chọn số nhân vật muốn in |
| 7 | **Customize Tool** | Công cụ tùy chỉnh | Element trong Artwork cho phép tạo các thành phần có thể customization. Gồm nhiều loại: text input, clipart, image upload, crossword, Spotify barcode, v.v. | Text input cho tên, Clipart selector cho icon, Image upload cho ảnh gia đình, Crossword generator |
| 8 | **Option Set** | Bộ tùy chỉnh | Tập hợp các customize options mà buyer tương tác khi mua. **Được tự động generate** khi seller tạo Artwork — gồm options gắn với Layer (từ Layout & Customize Tools) + Library (đối với Clipart Libraries) | Auto-generated từ Artwork: 3 text inputs (tên) + 1 clipart selector (icon) + 1 image upload |
| 9 | **Customize Option** | Tùy chọn tuỳ chỉnh | Một option đơn lẻ trong Option Set, tương ứng với 1 layer/element trong Artwork. Có type và rules | Text input: max 20 ký tự, required, default font: Arial |
| 10 | **Printfile** | File in | File output cuối cùng, đạt chuẩn sản xuất (print-ready). Được **sinh bất đồng bộ** sau khi buyer checkout — Shopify checkout chạy bình thường, MakeIt update printfile sau | File PNG 300 DPI, 4500x5400px — artwork đã ghép customize data của buyer |
| 11 | **Clipart** | Clipart | Asset đồ họa (icon, illustration, sticker) trong thư viện, seller dùng khi tạo Artwork hoặc buyer chọn qua Customize Tool | Icon trái tim, sticker ngôi sao, illustration cây Giáng sinh |
| 12 | **Collection** | Bộ sưu tập | Nhóm cliparts trong Clipart Library. **Cấu trúc:** Library → Collections → Cliparts. Upload bằng folder = folder là Collection; upload bằng file = hệ thống tự động tạo Collection | Collection "Christmas Icons", "Family Characters", "Pet Icons" |
| 13 | **Conditional Logic** | Logic điều kiện | Seller thiết lập luồng điều kiện cho options trên storefront: chọn option A → hiện/ẩn option B. Giúp đơn giản hóa trải nghiệm buyer | Chọn Layout "1 nhân vật" → chỉ hiện options cho 1 nhân vật |
| 14 | **Storefront Widget** | Widget cửa hàng | UI component nhúng vào trang sản phẩm Shopify, cho phép buyer tùy chỉnh + xem live preview | Khu vực trên product page hiển thị preview sản phẩm + form nhập tên, chọn màu |
| 15 | **Live Preview** | Xem trước trực tiếp | Khả năng hiển thị realtime sản phẩm đã tùy chỉnh trên storefront. Buyer thay đổi option → preview cập nhật ngay | Buyer gõ "John" → preview trên mug cập nhật ngay lập tức hiển thị "John" |

### Concept Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│                          CAMPAIGN                                │
│  (Đơn vị sản phẩm cá nhân hóa hoàn chỉnh)                      │
│                                                                  │
│  ┌─────────────────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │        ARTWORK          │  │ Product Base │  │ Option Set │  │
│  │         (1:1)           │  │(1:N, Shopify)│  │(1:1, auto) │  │
│  │                         │  └──────┬───────┘  └─────┬──────┘  │
│  │ ┌────────┐ ┌─────────┐  │         │                │         │
│  │ │Layouts │ │Customize│  │  ┌──────▼───────┐  ┌─────▼───────┐│
│  │ │ (1:N)  │ │ Tools   │  │  │  Mockup(s)   │  │ Customize   ││
│  │ │        │ │ (1:N)   │──┼──│  (1:N)       │  │ Options     ││
│  │ └────────┘ └────┬────┘  │  │ Base + Print │  │ (1:N, auto- ││
│  │                 │       │  │    Area      │  │  generated) ││
│  │  ┌──────────┐   │       │  └──────────────┘  └─────────────┘│
│  │  │ Clipart  │◄──┘       │                                    │
│  │  │ Library  │           │                                    │
│  │  └──────────┘           │                                    │
│  └─────────────────────────┘                                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
             [Campaign Published]
                       │
                       ▼
              ┌────────────────┐
              │   Storefront   │   Buyer chọn Layout + tùy chỉnh Options
              │    Widget      │   + Live Preview
              └───────┬────────┘
                      │
               [Buyer Checkout on Shopify]
                      │
                      ▼ (bất đồng bộ — Shopify checkout chạy bình thường)
              ┌────────────────┐
              │  Printfile     │   MakeIt generate printfile async
              │  Generation    │   → update vào Order sau
              └───────┬────────┘
                      │
                      ▼
              ┌────────────────┐
              │ Shopify Order  │   Printfile attached to order
              └────────────────┘
```

**Key Flow Insight:**
- Seller tạo **Artwork** (chứa Layouts + Customize Tools) → hệ thống **auto-generate Option Set**
- **Mockup** = ảnh base + Print Area (seller define vùng artwork hiển thị)
- **Product Base** được quản lý trên Shopify, MakeIt chỉ liên kết
- Sau buyer checkout, **Printfile sinh bất đồng bộ** — không block Shopify checkout

**Cardinality Summary:**

| Relationship | Cardinality | Notes |
|-------------|:-----------:|-------|
| Campaign → Artwork | 1:1 | Mỗi campaign dùng đúng 1 artwork |
| Campaign → Product Base | **1:N** | ✅ PO confirmed: 1 campaign gắn được nhiều product bases. Base quản lý trên Shopify |
| Campaign → Mockup | 1:N | Nhiều ảnh mockup cho mỗi campaign |
| Campaign → Option Set | 1:1 | Mỗi campaign có 1 option set (**auto-generated từ Artwork**) |
| Mockup → Print Area | 1:1 | Mỗi mockup có 1 print area define vùng hiển thị artwork |
| Artwork → Layout | 1:N | 1 artwork có nhiều layouts (biến thể bố cục) |
| Artwork → Customize Tool | 1:N | 1 artwork chứa nhiều customize tools (text, clipart, upload...) |
| Artwork → Clipart Library | N:N | Artwork dùng cliparts từ library, clipart dùng ở nhiều artworks |
| Option Set → Customize Option | 1:N | Auto-generated: options gắn với Layer (từ Layout & Tools) + Library (cliparts) |
| Order → Printfile | 1:N | Mỗi order item cá nhân hóa → 1 printfile (**sinh bất đồng bộ**) |

---

## 2. User-Facing Concepts

> Những khái niệm **buyer nhìn thấy** trên storefront. Buyer KHÔNG biết internal concepts.

| Buyer sees as | Internal concept | Buyer experience |
|--------------|-----------------|------------------|
| "Sản phẩm cá nhân hóa" | Campaign | Trang sản phẩm trên Shopify store |
| "Form tùy chỉnh" | Storefront Widget + Option Set | Khu vực nhập tên, chọn màu, upload ảnh |
| "Preview" | Live Preview | Hình ảnh sản phẩm cập nhật realtime |
| "Customize Options" (text, ảnh, màu...) | Customize Options | Form controls mà buyer tương tác |
| "Thiết kế sản phẩm" | Artwork (processed) | Kết quả cuối cùng buyer nhìn thấy trong preview |

> 🔑 **Design Principle:** Buyer KHÔNG BAO GIỜ thấy thuật ngữ "Campaign", "Artwork", "Option Set", "Printfile". Giao diện buyer chỉ nói ngôn ngữ shopping: "Tùy chỉnh sản phẩm", "Xem trước", "Thêm vào giỏ hàng".

---

## 3. Internal/Technical Concepts

> Những khái niệm **chỉ team MakeIt dùng** — không visible cho end user.

| Term | Definition | Used by |
|------|-----------|---------|
| **Clipart Library** | Kho clipart assets tập trung, seller quản lý và dùng khi compose artwork (via Customize Tools) | PO, Dev FE, Dev BE |
| **Printfile Engine** | Hệ thống tự động sinh printfile **bất đồng bộ** từ artwork + buyer customize data sau checkout. Shopify checkout chạy bình thường, MakeIt update printfile sau | TL, Dev BE |
| **Campaign Status** | Trạng thái lifecycle của campaign (xem Section 5) | PO, BA, Dev |
| **Layer** | Tầng trong Artwork — mỗi Customize Tool / element tương ứng 1 layer. Option Set được generate từ layers | Dev FE, Dev BE |
| **Customization Data** | Dữ liệu buyer nhập qua Storefront Widget (text, images, colors...) được lưu và truyền tới Printfile Engine | Dev BE |
| **Render Pipeline** | Quy trình kỹ thuật từ customization data → preview image / printfile. **Server-side rendering** | TL, Dev |

---

## 4. Shopify Integration Concepts

> Mapping giữa Shopify concepts và MakeIt concepts.

| Shopify Concept | MakeIt sử dụng cho | Notes |
|----------------|-------------------|----|
| **Product** | Product Base | MakeIt Campaign gắn với Shopify Product |
| **Variant** | ⚠️ **PO confirm:** MakeIt dùng Variants thế nào? Size/Color là variant hay customize option? | Phân biệt variant (Shopify-managed) vs customize option (MakeIt-managed) |
| **Metafield** | ⚠️ **TL confirm:** Lưu customization data? Campaign config? Printfile URL? | Key integration point |
| **App Block / Theme Extension** | Storefront Widget | Cách nhúng widget vào storefront |
| **Order** | Order integration | Receive order data → trigger printfile generation |
| **Line Item** | ⚠️ **TL confirm:** Customization data attach vào line item properties? | Critical cho order fulfillment flow |
| **Webhooks** | ⚠️ **TL confirm:** `orders/create` trigger printfile generation? Webhook nào khác? | Event-driven architecture |
| **Files API** | ⚠️ **TL confirm:** Dùng cho artwork/printfile storage? Hay external storage (S3...)? | Storage strategy |
| **App Bridge** | Admin Dashboard | MakeIt Admin embedded trong Shopify Admin |

---

## 5. Concept Lifecycle

### Campaign Lifecycle

```
                    ┌────────┐
                    │  Draft │  ← Campaign vừa tạo, chưa đầy đủ thông tin
                    └───┬────┘
                        │ (Seller hoàn thiện setup)
                        ▼
                    ┌────────┐
                    │ Ready  │  ← Đủ Artwork + Base + Mockup + Options
                    └───┬────┘
                        │ (Seller publish)
                        ▼
                    ┌────────┐
                    │ Active │  ← Live trên storefront, buyer có thể mua
                    └───┬────┘
                        │
                   ┌────┴─────┐
                   ▼          ▼
              ┌────────┐ ┌──────────┐
              │ Paused │ │ Deleted  │
              └───┬────┘ └──────────┘
                  │
                  │ (Resume)
                  ▼
              [Active]
```

> ✅ **PO confirmed:**
> - **Không** có Scheduled (hẹn giờ publish)
> - **Không** có Expired (tự động hết hạn)
> - Có **Delete** (xóa campaign) và **Pause** (tạm dừng, có thể Resume)
> - Không có Archived state

### Printfile Lifecycle

```
Buyer Checkout (Shopify)     ← Shopify checkout chạy bình thường
        │
        ▼ (async — bất đồng bộ)
Order received → Pending → Generating → Success / Failed
                                           │        │
                                           ▼        ▼
                                       [Attach    [Retry / Manual fix]
                                        to Order]
```

> ✅ **PO confirmed:** Printfile generation chạy **bất đồng bộ** với order. Shopify checkout không bị block. MakeIt update printfile vào order sau khi generate xong.

### Clipart Lifecycle

```
Upload → Active → Deleted
```

> ✅ **PO confirmed:** Không có Archived state cho Clipart — chỉ Active hoặc Deleted.
> ✅ **Clipart Library Management đã Done** — lifecycle này đã implement.

---

## 6. Glossary Quick Reference

> Bảng tra nhanh cho AI agents — dùng khi gặp thuật ngữ trong deliverables.

| Thuật ngữ thường bị nhầm | ĐÚNG trong MakeIt | SAI / Cần tránh |
|--------------------------|-------------------|-----------------|
| Campaign | Đơn vị sản phẩm cá nhân hóa = Artwork + Base(s) + Mockup(s) + Option Set | ≠ Marketing campaign, ≠ Ad campaign |
| Artwork | File design gốc seller tạo trong MakeIt, chứa Layouts + Customize Tools | ≠ Finished product image, ≠ User-generated content |
| Layout | Biến thể bố cục TRONG Artwork (VD: 1/2/3 nhân vật) | ≠ Page layout, ≠ CSS layout |
| Customize Tool | Element tùy chỉnh TRONG Artwork (text, clipart, upload, crossword, spotify...) | ≠ Software tool, ≠ Shopify settings |
| Print Area | Vùng in TRÊN Mockup — nơi artwork sẽ hiển thị | ≠ Print settings, ≠ Paper size |
| Option Set | **Auto-generated** từ Artwork layers — buyer tương tác trên storefront | ≠ Shopify variant options |
| Collection | Nhóm cliparts TRONG Library (Library → Collections → Cliparts) | ≠ Shopify collection |
| Conditional Logic | Luồng điều kiện hiện/ẩn options dựa trên lựa chọn của buyer | ≠ Shopify Liquid conditionals |
| Template | **Tránh dùng** — dễ nhầm với Shopify theme template. Dùng "Artwork" | ≠ Shopify template |
| Product | Shopify Product = Product Base trong MakeIt (quản lý trên Shopify) | ≠ Campaign (Campaign > Product) |
| Customization | Buyer tùy chỉnh options trên storefront | ≠ Store customization (theme editing) |
| Preview | Live preview cho buyer xem sản phẩm tùy chỉnh | ≠ Shopify theme preview |
| Printfile | File print-ready output, KHÔNG phải artwork input | ≠ Artwork, ≠ Mockup |
| Widget | Storefront Widget = UI component embedded trên product page | ≠ Shopify theme section/block (mặc dù technically là App Block) |

---

## Domain Reference

> Cross-references sang documents khác trong Product Context Hub.

| Topic | Document | Section |
|-------|----------|---------|
| Feature inventory per concept | `FEATURE-MAP.md` | Feature Inventory |
| User flows using these concepts | `USER-JOURNEYS.md` | Seller/Buyer Journeys |
| Technical implementation | `SYSTEM-ARCHITECTURE.md` | Component Overview |
| Product overview & personas | `PRODUCT-OVERVIEW.md` | All sections |

---

<!-- 
  PO REVIEW STATUS (v1.2 — 2026-02-17)
  ✅ Section 1 — Core concepts reviewed + 3 new terms added (Print Area, Customize Tools, Layout)
  ✅ Section 1 — Cardinality confirmed (Campaign:Base = 1:N, Base on Shopify)
  ✅ Section 1 — Artwork contains Layouts + Customize Tools, auto-generates Option Set
  ✅ Section 3 — Print Area confirmed, Template term removed
  ✅ Section 3 — Render Pipeline confirmed: server-side
  ✅ Section 5 — Campaign lifecycle confirmed: Draft→Ready→Active→Paused/Deleted (no Scheduled/Expired/Archived)
  ✅ Section 5 — Printfile lifecycle confirmed (async with order)
  ✅ Section 5 — Clipart lifecycle confirmed (no Archive)
  
  REMAINING (cần TL input):
  ☐ Section 4 — Shopify integration concepts
═══════════════════════════════════════════════════
-->
