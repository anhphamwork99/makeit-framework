# Shopify

Hướng dẫn tổng quan về Shopify platform trong team MakeIt — dùng để làm gì, ai làm gì, và cách team tương tác với Shopify.

## Shopify là gì?

Shopify là nền tảng thương mại điện tử (e-commerce platform) hàng đầu thế giới. Thay vì tự xây dựng toàn bộ hệ thống bán hàng từ đầu, Shopify cung cấp sẵn:

- **Storefront** — giao diện cửa hàng online cho người mua
- **Admin dashboard** — nơi chủ cửa hàng quản lý sản phẩm, đơn hàng, khách hàng
- **API ecosystem** — bộ API cho phép developer mở rộng chức năng
- **App Store** — marketplace cho các ứng dụng bổ sung tính năng

> 💡 **Tóm lại:** Shopify giống như một "hệ điều hành" cho e-commerce. Team MakeIt xây dựng ứng dụng chạy trên hệ điều hành này.

## Shopify App và Shopify Store — khác nhau thế nào?

Đây là điểm quan trọng cần hiểu rõ:

| | Shopify Store | Shopify App |
|---|---|---|
| **Là gì** | Một cửa hàng online | Một ứng dụng mở rộng tính năng |
| **Ai dùng** | Chủ shop (merchant) | Merchant cài vào store của họ |
| **Ai build** | Merchant tự setup | **Developer (team MakeIt)** |
| **Ví dụ** | shop-abc.myshopify.com | Product Personalizer app |
| **Tech stack** | Liquid templates (Shopify themes) | Remix + Polaris + App Bridge |

**Team MakeIt build Shopify App** — cụ thể là **Product Personalizer**, một embedded app chạy bên trong Shopify Admin. Merchant cài app này vào store của họ để thêm tính năng cá nhân hóa sản phẩm.

### Embedded App là gì?

Embedded app là ứng dụng chạy trực tiếp bên trong giao diện Shopify Admin (không mở tab/cửa sổ riêng). Khi merchant truy cập app, nó hiển thị như một phần của Shopify Admin — giữ trải nghiệm liền mạch.

```
┌─────────────────────────────────────────┐
│  Shopify Admin                          │
│  ┌──────────┬──────────────────────────┐│
│  │ Sidebar  │                          ││
│  │          │  ┌────────────────────┐  ││
│  │ Home     │  │                    │  ││
│  │ Orders   │  │  Product           │  ││
│  │ Products │  │  Personalizer App  │  ││
│  │ Apps ←── │  │  (embedded here)   │  ││
│  │          │  │                    │  ││
│  │          │  └────────────────────┘  ││
│  └──────────┴──────────────────────────┘│
└─────────────────────────────────────────┘
```

## Vai trò từng role với Shopify

| Role | Tương tác với Shopify |
|------|----------------------|
| **Dev Frontend** | Xây dựng giao diện app bằng Remix + Polaris. Tương tác trực tiếp với Shopify API qua App Bridge |
| **Dev Backend** | Xây dựng logic nghiệp vụ, xử lý data, Prisma schema, API endpoints |
| **Techlead** | Thiết kế architecture, review code, quyết định technical approach cho Shopify integration |
| **Business Analyst** | Viết user stories liên quan tính năng Shopify (personalization features, merchant workflows) |
| **Product Owner** | Định hướng product features, review từ góc độ merchant experience |
| **Designer** | Thiết kế UI trong Figma — lưu ý dùng Polaris design system cho consistency |

> 📌 Dev Frontend và Dev Backend là hai role tương tác trực tiếp nhất với Shopify platform. Các role khác cần hiểu tổng quan để collaborate hiệu quả.

## Nội dung chi tiết

| Trang | Mô tả |
|-------|-------|
| [Setup](setup.md) | Hướng dẫn setup development environment từ đầu |
| [Architecture](architecture.md) | Kiến trúc Remix + Polaris + App Bridge |
| [Data Model](data-model.md) | Mô hình dữ liệu Product Personalizer |
| [Automation](automation.md) | Agent tự động làm gì và bạn cần làm gì |
| [Troubleshooting](troubleshooting.md) | Các lỗi thường gặp và cách xử lý |

## Tài nguyên hữu ích

- [Shopify Developer Documentation](https://shopify.dev/) — tài liệu chính thức cho developer
- [Shopify Polaris](https://polaris.shopify.com/) — design system và component library
- [Shopify App Bridge](https://shopify.dev/docs/api/app-bridge) — communication layer cho embedded apps
- [Remix Documentation](https://remix.run/docs/) — framework cho Shopify apps

---
*Section: Tools > Shopify · [← Tools](../README.md) · [Wiki Home](../../README.md)*
