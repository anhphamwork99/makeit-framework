# Shopify App Architecture

Kiến trúc ứng dụng Shopify App trong team MakeIt — tech stack, cách các thành phần kết nối, và folder structure.

## Tech Stack Overview

Product Personalizer được xây dựng trên tech stack chính thức của Shopify cho embedded apps:

```
┌─────────────────────────────────────────────────────────────┐
│                    Shopify Admin (Browser)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    App Bridge                          │ │
│  │         (Communication Layer — iframe ←→ host)         │ │
│  └───────────────────────┬────────────────────────────────┘ │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    ┌──────┴──────┐
                    │  Remix App  │
                    │  (Server)   │
                    ├─────────────┤
                    │  Polaris UI │       ┌───────────────┐
                    │ (Components)│──────▶│  Shopify API  │
                    ├─────────────┤       │  (GraphQL)    │
                    │   Prisma    │       └───────────────┘
                    │ (Database)  │
                    └─────────────┘
```

### Luồng hoạt động

1. Merchant mở app trong **Shopify Admin**
2. **App Bridge** tạo kết nối giữa Shopify Admin (host) và Remix App (iframe)
3. **Remix App** xử lý request — load data từ Shopify API hoặc database
4. **Polaris UI** render giao diện — trông giống Shopify Admin (consistency)
5. User interactions được xử lý qua Remix loaders/actions

---

## Remix — Full-stack Framework

[Remix](https://remix.run/) là framework full-stack cho web apps. Shopify chọn Remix làm framework chính thức cho Shopify Apps (thay thế Next.js từ 2023).

### Tại sao dùng Remix?

- **Server-side rendering** — trang load nhanh, tốt cho merchant experience
- **File-based routing** — mỗi file trong `app/routes/` tương ứng 1 URL
- **Loaders và Actions** — pattern rõ ràng cho đọc/ghi dữ liệu
- **Progressive enhancement** — app vẫn hoạt động khi JavaScript chưa load xong

### File-based Routing

```
app/routes/
├── _index.tsx              → /                    (trang chủ app)
├── app.products.tsx        → /app/products        (danh sách sản phẩm)
├── app.products.$id.tsx    → /app/products/:id    (chi tiết sản phẩm)
├── app.settings.tsx        → /app/settings        (cài đặt)
└── auth.$.tsx              → /auth/*              (OAuth callback)
```

> 💡 Tên file = URL path. `$id` là dynamic parameter. `_index` là trang mặc định.

### Loaders và Actions

Mỗi route file có thể export 2 hàm chính:

| Function | Mục đích | HTTP Method | Ví dụ |
|----------|---------|-------------|-------|
| **loader** | Đọc dữ liệu để hiển thị | GET | Load danh sách sản phẩm từ Shopify API |
| **action** | Xử lý form submissions | POST, PUT, DELETE | Lưu cài đặt personalization |

```typescript
// Ví dụ đơn giản trong một route file

// loader — chạy trên server khi user truy cập trang
export async function loader({ request }) {
  const products = await getProducts(request);
  return json({ products });
}

// action — chạy khi user submit form
export async function action({ request }) {
  const formData = await request.formData();
  await saveSettings(formData);
  return redirect("/app/settings");
}

// Component — render UI
export default function ProductsPage() {
  const { products } = useLoaderData();
  return <ProductList products={products} />;
}
```

---

## Polaris — Shopify Design System

[Polaris](https://polaris.shopify.com/) là design system chính thức của Shopify. Cung cấp React components có sẵn, đảm bảo app trông nhất quán với Shopify Admin.

### Tại sao dùng Polaris?

- **Consistency** — app trông như một phần của Shopify Admin
- **Accessibility** — components đã được test accessibility
- **Responsive** — hoạt động tốt trên mobile và desktop
- **Update tự động** — Shopify update Polaris → app tự động cập nhật giao diện

### Các components thường dùng

| Component | Dùng khi |
|-----------|---------|
| `Page` | Container chính cho mỗi trang |
| `Layout` | Chia layout thành sections |
| `Card` | Nhóm nội dung liên quan |
| `Button` | Nút bấm (primary, secondary, destructive) |
| `DataTable` | Hiển thị dữ liệu dạng bảng |
| `TextField` | Input text |
| `Select` | Dropdown select |
| `Banner` | Thông báo (info, warning, error, success) |
| `Modal` | Pop-up dialog |
| `Toast` | Thông báo tạm thời (auto-dismiss) |

### Polaris và Custom Components

| Trường hợp | Dùng gì |
|-------------|---------|
| UI chuẩn Shopify (form, table, page layout) | **Polaris** — dùng component có sẵn |
| UI đặc thù product (personalization preview, drag-drop editor) | **Custom component** — build riêng |
| Kết hợp | Custom component bọc trong Polaris layout |

> 📌 **Nguyên tắc:** Ưu tiên Polaris components trước. Chỉ build custom khi Polaris không có component phù hợp (ví dụ: image editor, drag-drop personalization preview).

---

## App Bridge — Communication Layer

[App Bridge](https://shopify.dev/docs/api/app-bridge) là thư viện JavaScript kết nối embedded app (chạy trong iframe) với Shopify Admin (host page).

### App Bridge làm gì?

Vì app chạy trong iframe bên trong Shopify Admin, nó cần App Bridge để:

```
┌────────────────────────────┐
│  Shopify Admin (host)      │
│                            │
│  ┌──────────────────────┐  │
│  │  Your App (iframe)   │  │    App Bridge giúp:
│  │                      │──│──▶ Navigation (đổi URL admin)
│  │  App Bridge ←────────│──│──▶ Modal, Toast (UI overlay)
│  │                      │──│──▶ Session Token (auth)
│  │                      │──│──▶ Resource Picker (chọn product)
│  └──────────────────────┘  │
└────────────────────────────┘
```

### Các chức năng chính

| Chức năng | Mô tả |
|-----------|-------|
| **Navigation** | Điều hướng trong Shopify Admin (breadcrumbs, title bar) |
| **Toast** | Hiển thị thông báo ngắn ở góc dưới màn hình |
| **Modal** | Mở dialog bên ngoài iframe (full Shopify Admin width) |
| **Resource Picker** | Cho phép merchant chọn products, collections từ store |
| **Session Token** | Authentication — không cần cookies, dùng JWT token |

### Authentication Flow

Shopify Apps sử dụng OAuth 2.0 để xác thực:

```
Merchant cài app → Shopify redirect tới app OAuth URL
                 → App xác nhận scopes (quyền truy cập)
                 → Shopify cấp access token
                 → App dùng token để gọi Shopify API
                 → Session tokens cho subsequent requests
```

> 💡 Bạn không cần tự implement OAuth flow — Shopify CLI và `@shopify/shopify-app-remix` package xử lý tự động.

---

## Folder Structure

Cấu trúc thư mục chính của project:

```
project-root/
├── app/
│   ├── routes/              # File-based routing (Remix)
│   │   ├── _index.tsx       # Trang chủ
│   │   ├── app.*.tsx        # Các trang app chính
│   │   └── auth.*.tsx       # Authentication routes
│   │
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   └── features/        # Feature-specific components
│   │
│   ├── models/              # Data models & business logic
│   │
│   ├── utils/               # Helper functions
│   │
│   └── shopify.server.ts    # Shopify API client setup
│
├── prisma/
│   └── schema.prisma        # Database schema
│
├── public/                  # Static assets
│
├── .env                     # Environment variables (local)
├── shopify.app.toml         # Shopify app configuration
├── remix.config.js          # Remix configuration
└── package.json             # Dependencies
```

### Các file quan trọng

| File | Vai trò |
|------|---------|
| `shopify.app.toml` | Cấu hình Shopify app (scopes, URLs, API version) |
| `app/shopify.server.ts` | Khởi tạo Shopify API client |
| `prisma/schema.prisma` | Database schema (Prisma ORM) |
| `.env` | API keys, database URL, secrets |
| `app/routes/_index.tsx` | Trang chủ app — entry point cho merchant |

---

## Tham khảo thêm

- [Data Model](data-model.md) — mô hình dữ liệu Product Personalizer
- [Setup](setup.md) — hướng dẫn setup development environment
- [Shopify Remix App Template](https://github.com/Shopify/shopify-app-template-remix) — template chính thức

---
*Section: Tools > Shopify > Architecture · [← Shopify](README.md) · [Wiki Home](../../README.md)*
