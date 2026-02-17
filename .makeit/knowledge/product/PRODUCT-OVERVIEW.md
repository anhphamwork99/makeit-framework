# MakeIt — Product Overview

> **Last updated:** 2026-02-16 | **Version:** 1.1
> **Status:** Active — PO reviewed
> **Maintained by:** PO

---

## Summary

> **Product:** MakeIt — Shopify App cho phép sellers tạo sản phẩm cá nhân hóa với live preview và tự động sinh printfiles chuẩn sản xuất.
> **Users:** Seller teams trên Shopify trong ngành Print-On-Demand (fulfillment ops, designers).
> **Value:** Tăng conversion rate qua live preview + Giảm lỗi vận hành qua tự động hóa printfiles.
> **Stage:** 🔨 Building MVP — đã hoàn thiện Clipart Library, đang build Campaign flow
> **Platform:** Shopify App (Embedded)

---

## 1. Product Identity

### Sản phẩm là gì?

MakeIt là một công cụ cá nhân hóa sản phẩm trên Shopify, phục vụ ngành Print-On-Demand (POD).

**Chức năng chính:**

- Hiển thị **storefront widget** trên trang sản phẩm Shopify, cho phép buyer tùy chỉnh thiết kế realtime (chọn options, nhập text, upload ảnh).
- Sellers thiết lập **campaigns** — ghép artwork với product bases — để tạo sản phẩm cá nhân hóa có live preview.
- Khi buyer đặt hàng, MakeIt **tự động tạo printfiles** chất lượng cao, chuẩn sản xuất, để sellers sử dụng cho fulfillment.

**Hai vế giá trị cốt lõi:**

| Vế | Cho ai | Giá trị |
|----|--------|---------|
| **Tăng chuyển đổi** | Seller (gián tiếp qua buyer experience) | Live preview trực tiếp giảm lo lắng, tăng tự tin đặt hàng → higher CR |
| **Tối ưu vận hành** | Seller (trực tiếp) | Tự động tạo printfiles chuẩn sản xuất, giảm lỗi thủ công và thời gian xử lý |

### Sản phẩm KHÔNG phải là gì?

<!-- ⚠️ PO INPUT NEEDED
Liệt kê những gì MakeIt KHÔNG phải — giúp AI agents giới hạn scope, không suggest features ngoài phạm vi.

Gợi ý (confirm/reject/thêm):
-->

| MakeIt KHÔNG phải | Giải thích |
|-------------------|-----------|
| Design tool / Editor phức tạp | MakeIt không phải Canva hay Photoshop. Sellers setup artwork sẵn, buyer chỉ tùy chỉnh theo options defined trước |
| Print fulfillment service | MakeIt không in, không ship. MakeIt tạo printfiles → sellers tự in hoặc dùng fulfillment partner |
| General Shopify page builder | MakeIt chỉ focus vào personalization workflow, không phải landing page hay store builder |
| Marketplace | MakeIt không kết nối buyer với seller. Widget chạy trên store của seller |

> ⚠️ **PO:** Review bảng trên — có đúng không? Cần thêm/sửa gì?

### Vị trí trong hệ sinh thái

```
┌──────────────────────────────────────────────────────────┐
│                    SHOPIFY ECOSYSTEM                     │
│                                                          │
│  ┌──────────┐    ┌───────────┐    ┌───────────┐         │
│  │  Shopify  │    │  MakeIt   │    │ Fulfiller │         │
│  │  Store    │◄──►│   App     │    │ / Printer │         │
│  │(Storefront)│   │ (Admin +  │    │           │         │
│  │           │    │  Widget)  │    │           │         │
│  └──────────┘    └─────┬─────┘    └───────────┘         │
│       ▲                │                ▲                │
│       │           ┌────▼─────┐          │                │
│       │           │  Buyer   │          │                │
│       └───────────│(End User)│──────────┘                │
│                   └────┬─────┘   (receives product)      │
│                        │                                  │
│                   [Checkout]                              │
│                        │                                  │
│               ┌────────▼────────┐                        │
│               │ MakeIt analyzes │                        │
│               │ customize opts  │                        │
│               │ → Generate      │                        │
│               │   Printfile     │                        │
│               │ → Attach to     │                        │
│               │   Shopify Order │                        │
│               └─────────────────┘                        │
└──────────────────────────────────────────────────────────┘

Flow: Seller setup MakeIt → Buyer tùy chỉnh trên store → 
      Buyer checkout → MakeIt phân tích customize options → 
      Generate printfile → Gửi printfile vào Order trên Shopify
```

**MakeIt nằm ở đâu trong POD value chain:**

| Stage | Responsibility | MakeIt's role |
|-------|---------------|---------------|
| Design | Seller/Designer tạo artwork | ✅ Host & manage artworks |
| Storefront | Buyer xem & tùy chỉnh sản phẩm | ✅ Cung cấp widget + live preview |
| Order | Buyer đặt hàng qua Shopify checkout | ⬜ Shopify handles checkout |
| Post-Order | MakeIt phân tích customize options từ buyer | ✅ Analyze options → generate printfile → attach to Shopify Order |
| Printfile | Sinh file in từ customization data | ✅ Tự động sinh printfiles |
| Fulfillment | In ấn & ship sản phẩm | ⬜ Seller/Partner handles |

---

## 2. Users & Personas

### Primary Persona: Seller Team

| Attribute | Detail |
|-----------|--------|
| **Who** | Seller teams trên Shopify — đội vận hành/fulfillment, designers |
| **Industry** | Print-On-Demand (POD): áo, mug, canvas, phone case, phụ kiện |
| **Size** | Small-to-medium Shopify stores bán sản phẩm cá nhân hóa |
| **Tech level** | Trung bình — quen Shopify admin, không phải developer |

**Pain Points:**

| # | Pain Point | Hiện trạng thị trường | Impact |
|---|-----------|----------------------|--------|
| 1 | **Công cụ hiện tại quá phức tạp** — Sellers phải tách riêng 1 bộ phận chỉ để setup campaigns trên Customily/Teeinblue. Phải tuyển dụng & đào tạo nhân sự chuyên sử dụng tool | Customily bị merchants review: "not intuitive, clunky", learning curve cao | 💰 Tốn nhân sự + thời gian đào tạo. Triển khai campaign chậm → mất nguồn lực để test ý tưởng |
| 2 | **Solo seller không thể tự dùng** — Một seller đơn lẻ rất khó sử dụng các tool hiện tại mà không có team hỗ trợ | Các tool thiết kế cho team operation, không phải individual seller | 🚫 Bỏ mất phân khúc solo/micro sellers — nhóm user lớn trên Shopify |
| 3 | **Bị giới hạn trong templates có sẵn** — Sellers phụ thuộc vào customized templates do Customily/Teeinblue cung cấp, không thể sáng tạo designs riêng theo ý tưởng mới | Pain point toàn ngành: tools cung cấp template library nhưng sellers bị "nhốt" trong khuôn đó | 🎨 Ý tưởng sáng tạo không khả thi → mất cơ hội khác biệt hóa sản phẩm, khó test ý tưởng mới |
| 4 | **Tạo printfiles thủ công** — Mỗi đơn hàng phải xử lý thủ công, tốn thời gian, dễ sai | Chỉ Customily, Teeinblue, Inkybay có auto printfiles | ⚙️ Tốn thời gian, dễ lỗi, khó scale khi volume lớn |
| 5 | **Buyer không tự tin khi mua** — Không có live preview realtime → buyer lo lắng sản phẩm thực tế khác preview | 76% consumers có xu hướng mua hơn từ brands có personalized experience (DemandSage 2026) | 📉 Giảm conversion rate |

**JTBD (Jobs-to-be-Done):**

> *"Khi mình bán sản phẩm cá nhân hóa trên Shopify, mình cần một cách thiết lập nhanh và chuẩn để người mua tự xem trước thiết kế của họ ngay trên trang sản phẩm và sau khi đặt hàng hệ thống tự tạo printfiles đạt chuẩn sản xuất, để mình vừa tăng chuyển đổi vừa giảm lỗi vận hành và giao hàng đúng như khách mong đợi."*

**Seller User Journey (High-Level):**

```
1. Khám phá lợi ích
    ↓
2. Kết nối Shopify & chuẩn bị assets
    ↓
3. Tạo Artwork (design template)
    ↓
4. Tạo Campaign:
   a. Chọn Artwork
   b. Chọn Product Base
   c. Chọn Mockup images
   d. Tạo Customize Options (option set)
    ↓
5. Publish Campaign lên storefront
    ↓
6. Vận hành đơn hàng (printfiles tự động sinh)
```

> Chi tiết từng journey: xem `USER-JOURNEYS.md`

### Secondary Persona: Buyer (End Customer)

| Attribute | Detail |
|-----------|--------|
| **Who** | Người mua trên Shopify store của seller |
| **Behavior** | Browse → chọn sản phẩm → tùy chỉnh → preview → mua |
| **Expectation** | Preview chính xác, UX mượt, kết quả nhận được đúng như preview |

**Buyer Persona — Chi tiết:**

| Attribute | Detail |
|-----------|--------|
| **Demographics** | Millennials và Elders (người lớn tuổi) |
| **Geography** | Chủ yếu Mỹ và Châu Âu |
| **Motivation** | Mua quà tặng cho người thân, gia đình, bạn bè trong các dịp lễ và ngày quan trọng |
| **Family context** | Số lượng thành viên gia đình thường nhiều (bao gồm cả pets) — ảnh hưởng đến nhu cầu personalization nhiều items |
| **Price sensitivity** | Sẵn sàng trả giá cao cho sản phẩm cá nhân hóa đẹp, phù hợp cá tính. Tuy nhiên do cạnh tranh cao → vẫn nhạy cảm về giá |
| **Design taste** | Cần thiết kế đẹp, phù hợp đặc trưng, cá tính và sở thích cá nhân |
| **Primary device** | 📱 **80% mobile** — buyer chủ yếu mua hàng trên điện thoại |

**Key Insight cho Product Development:**

> Buyer thường cá nhân hóa cho **nhiều người** (gia đình lớn + pets) → cần UX hỗ trợ batch/multi-item customization tốt. Họ mua theo **mùa/dịp lễ** (Christmas, Mother's Day, Valentine...) → traffic có seasonal peaks.

### Ai KHÔNG phải user?

<!-- ⚠️ PO INPUT NEEDED — confirm/reject/add -->

| Anti-Persona | Tại sao |
|-------------|---------|
| Seller không bán POD | MakeIt designed cho personalization workflow, không phải general ecommerce |
| Developer muốn build custom widget | MakeIt là sản phẩm dùng ngay (no-code setup), không phải SDK/API platform |
| Enterprise brands với quy trình in phức tạp | MakeIt focus vào SMB POD sellers, không phải enterprise production pipeline |

> ⚠️ **PO:** Bảng trên đúng không? Có anti-persona nào quan trọng hơn?

---

## 3. Value Proposition

### Core JTBD — Expanded

| # | JTBD | Primary Beneficiary |
|---|------|-------------------|
| 1 | **Setup:** "Khi mình có design mới, mình muốn thiết lập campaign nhanh để nó lên store sớm nhất có thể" | Seller/Designer |
| 2 | **Preview:** "Khi buyer vào trang sản phẩm, mình muốn họ thấy preview realtime để họ tự tin mua hàng" | Seller (via Buyer experience) |
| 3 | **Fulfillment:** "Khi có đơn hàng, mình muốn printfile tự động tạo đúng chuẩn để mình chỉ cần download và gửi in" | Seller/Fulfillment ops |

### Competitive Landscape

| Competitor | Pricing | Rating | Key Strength | Weakness |
|-----------|---------|:------:|-------------|----------|
| **Customily** | $49/mo + $0.10-$1/order | ⭐ 4.6 (237 reviews) | Phổ biến nhất, first-mover, multi-platform (Shopify + Etsy + WooCommerce + Amazon + Walmart), có AI features miễn phí (remove bg, face cutout), Canva import, print-ready files | UX clunky & không intuitive, learning curve cao, $49 đắt cho small sellers, 2D only, 9-day trial ngắn |
| **Teeinblue** | $19/mo + fee/order từ order 51 | ⭐ 4.8 (250+ reviews) | Nhiều tính năng nhất: quản lý product + đơn hàng + kết nối fulfillment partners, sync multi-store | Feature bloat — complex hơn mức cần cho POD personalization thuần |
| **Customall** | Free / $19 / $79 / $159 / $549 + $0.30-$0.60/order | ⭐ 4.8 (32 reviews) | Auto-generate QR code từ music link, auto-generate crossword từ multiple names, processed 2M+ orders, integration with fulfillment partners | Ít reviews (32), tính năng unique nhưng niche, nhiều tier phức tạp |
| **CustoMeow** | Free / $9 / $19 / $49 + $0.10-$0.80/item | ⭐ 4.6 (5 reviews) | 40+ component types, real-time preview, multi-language, add-on pricing, song/map/crossword widgets | Rất ít reviews (5), chưa proven market fit, complex setup cho beginners |
| **Customix** | From $10/mo (Lite $10, Basic $15, Pro $30) | ⭐ 5.0 (7 reviews) | Simple drag-and-drop, real-time preview, free plan (3 products), integrates with Shopify themes | Rất ít reviews (7), ít POD integration & automation, limited custom products trên plans thấp |

**MakeIt Differentiators (USPs):**

| # | Differentiator | Why it matters |
|---|---------------|---------------|
| 1 | **Setup cực nhanh, learning curve thấp** — UI/UX tinh gọn, khác biệt, AI hỗ trợ setup thông minh → seller không cần thao tác nhiều | Customily bị review là "not intuitive, clunky". MakeIt giải quyết pain point lớn nhất của market leader |
| 2 | **Seller sáng tạo & tự tạo customized templates** — không phụ thuộc vào templates có sẵn do tool cung cấp | Hầu hết competitors cung cấp template library → sellers bị giới hạn. MakeIt empower sellers tự design |

> **USP:** *"The fastest, simplest way to launch personalized POD products — with AI-powered setup and unlimited creative freedom."*

### Key Metrics / Success Criteria

> ℹ️ **Status: Not tracked yet.** Metrics chưa được setup do đang build MVP. Bảng dưới là metrics framework dự kiến khi launch.

| Metric | Current | Target (Post-Launch) | Priority |
|--------|:-------:|:-------------------:|:--------:|
| Monthly Active Sellers | N/A (MVP) | TBD | P0 |
| Campaigns Created / Month | N/A | TBD | P0 |
| Buyer Conversion Rate (with widget) | N/A | TBD | P1 |
| Printfile Generation Success Rate | N/A | TBD | P0 |
| Average Setup Time (Campaign) | N/A | < 10 min (target) | P0 |
| Churn Rate | N/A | TBD | P1 |

---

## 4. Product Stage & Roadmap Context

### Current Stage

| Stage | Description | Check |
|-------|------------|:-----:|
| **🔨 Building MVP** | Đang build version đầu tiên, chưa có user | ✅ |
| 🧪 Internal Beta | Có product nhưng chỉ internal testing | |
| 🚀 Early Access / Beta | Một số sellers đã dùng, đang iterate | |
| 📈 Growth | Nhiều sellers, focus scale & optimize | |
| 🏛 Mature | Stable product, focus retention & expand | |

**MVP Progress:**

| Feature | Status | Notes |
|---------|:------:|-------|
| Clipart Library Management | ✅ Done | Quản lý clipart assets cho artwork |
| Campaign Management | 🚧 Building | Chọn artwork → chọn base → chọn mockup → tạo customize options |
| Artwork Management | ⏳ Planned | Quản lý artwork/design assets |
| Mockup Management | ⏳ Planned | Quản lý mockup templates |
| Option Set Management | ⏳ Planned | Quản lý customize option sets cho campaigns |
| Order Management | ⏳ Planned | Quản lý đơn hàng + attach printfile vào Shopify Order |
| Storefront Widget | ⏳ Planned | Live preview + customization UI cho buyer |
| Pricing & Subscription | ⏳ Planned | Billing, plan management, usage tracking |
| Store Setting | ⏳ Planned | Cấu hình store-level settings |
| Demo Store | ⏳ Planned | Store mẫu để showcase cho sellers tiềm năng |
| Landing Page | ⏳ Planned | Marketing page giới thiệu MakeIt |

### Revenue Model

**MakeIt Pricing Strategy:**

| Aspect | Detail |
|--------|--------|
| **Pricing model** | Subscription + Transaction fee (tương tự Customily) |
| **Base price** | **$49/mo** — ngang Customily, định vị ở top thị trường về chất lượng |
| **Transaction fee** | Per-order fee (TBD cụ thể) |
| **Volume deals** | Sellers có volume bán lớn sẽ có **custom deal** riêng |
| **Positioning** | Premium tier — chất lượng cao, UX vượt trội, AI-assisted |

**Industry Pricing Benchmark (Direct Competitors):**

| App | Model | Monthly Fee | Per-order Fee | Free Trial |
|-----|-------|:-----------:|:-------------:|:----------:|
| **Customily** | Sub + Transaction | $49/mo | $0.10-$1/item | 9 days |
| **Teeinblue** | Sub + Transaction | $19/mo | Fee from order 51+ | 14 days |
| **Customall** | Sub + Transaction | Free / $19 / $79 / $159 / $549 | $0.30-$0.60/order (after free tier) | 14 days |
| **CustoMeow** | Sub + Transaction | Free / $9 / $19 / $49 | $0.10-$0.80/item | 9 days |
| **Customix** | Sub only | From $10/mo | None | Free plan (3 products) |

**Key Observations:**
- MakeIt ở ngang Customily ($49/mo) — premium positioning
- Competitors rẻ hơn (Teeinblue $19, CustoMeow $9-$49) nhưng MakeIt differentiates bằng UX/AI
- Custom deal cho high-volume sellers — competitive advantage vs fixed pricing
- Free trial: industry standard, cần có khi launch

### Recent Milestones

| Date | Milestone | Impact |
|------|----------|--------|
| 2026 | ✅ Clipart Library Management hoàn thiện | Foundation cho artwork creation |
| TBD | 🎯 Release app trên Shopify App Store | Get first users |
| TBD | 🎯 Get first paying seller | Validate product-market fit |

### Known Gaps / Limitations

| # | Gap / Limitation | Impact | Priority |
|---|-----------------|--------|:--------:|
| 1 | **Chưa có giải pháp xây dựng các tính năng AI rõ ràng** | AI là differentiator chính ("AI hỗ trợ setup") nhưng chưa có roadmap cụ thể cho AI features | 🔴 High — cần clarify trước khi build AI-dependent flows |
| 2 | MVP chưa hoàn thiện Campaign flow | Core feature chưa ready → chưa thể test với real users | 🔴 High |
| 3 | Chưa có metrics tracking / analytics | Không measure được impact của features | 🟡 Medium — cần trước launch |

---

## 5. Product Sản Phẩm Cá Nhân Hóa — Quick Domain Reference

> Chi tiết: xem `DOMAIN-MODEL.md`. Phần này chỉ liệt kê concept chính để quick reference.

| Concept | One-line Definition |
|---------|-------------------|
| **Campaign** | Đơn vị sản phẩm cá nhân hóa: artwork + product bases → 1 Shopify product |
| **Artwork** | Design template có các layer có thể tùy chỉnh (text, image, color) |
| **Product Base** | Sản phẩm gốc trên Shopify (áo, mug...) được gắn artwork lên |
| **Print Area** | Vùng trên product base nơi artwork được render / in |
| **Option Set** | Bộ tùy chọn buyer thấy trên storefront (text input, image upload, dropdown...) |
| **Printfile** | File in chuẩn sản xuất, tự động sinh khi buyer đặt hàng |
| **Storefront Widget** | UI component trên trang sản phẩm Shopify cho buyer tùy chỉnh + xem preview |
| **Mockup** | Ảnh mẫu hiển thị sản phẩm với artwork — dùng cho product listing |

---

<!-- 
  PO REVIEW STATUS (v1.1 — 2026-02-16)
  ✅ ALL SECTIONS REVIEWED — PO approved
═══════════════════════════════════════════════════
-->
