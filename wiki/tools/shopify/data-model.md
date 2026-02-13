# Data Model — Product Personalizer

Mô hình dữ liệu tổng quan của Product Personalizer app — cách dữ liệu được tổ chức, lưu trữ, và liên kết với nhau.

> 📌 **Lưu ý:** Trang này mô tả khái niệm và cấu trúc dữ liệu ở mức team understanding. Chi tiết implementation (schema code, migration files) nằm trong codebase.

## Khái niệm cốt lõi

Product Personalizer cho phép merchant thêm tính năng cá nhân hóa vào sản phẩm Shopify. Khách hàng (buyer) có thể tùy chỉnh sản phẩm trước khi mua — ví dụ thêm text, chọn màu, upload hình ảnh.

### Shopify Product và Custom Data

Dữ liệu trong app chia thành 2 nguồn:

| Nguồn | Quản lý bởi | Ví dụ |
|-------|-------------|-------|
| **Shopify Product** | Shopify Platform | Tên sản phẩm, giá, hình ảnh, variants, inventory |
| **Custom Data** | Product Personalizer App | Personalization fields, templates, buyer inputs |

```
┌──────────────────────────┐     ┌──────────────────────────┐
│     Shopify Platform     │     │   Product Personalizer   │
│                          │     │        (Our App)         │
│  ┌────────────────────┐  │     │  ┌────────────────────┐  │
│  │ Product            │  │     │  │ Personalization    │  │
│  │ - title            │◄─┼─────┼─▶│ - fields[]         │  │
│  │ - description      │  │     │  │ - templates[]      │  │
│  │ - images[]         │  │     │  │ - preview config   │  │
│  │ - variants[]       │  │     │  └────────────────────┘  │
│  │ - price            │  │     │                          │
│  └────────────────────┘  │     │  ┌────────────────────┐  │
│                          │     │  │ Buyer Input        │  │
│  ┌────────────────────┐  │     │  │ - text values      │  │
│  │ Order              │  │     │  │ - image uploads    │  │
│  │ - line items       │◄─┼─────┼─▶│ - selected options │  │
│  │ - customer         │  │     │  └────────────────────┘  │
│  └────────────────────┘  │     │                          │
└──────────────────────────┘     └──────────────────────────┘
```

## Entity Relationship

Các entity chính và mối quan hệ:

```
┌─────────────────┐       ┌─────────────────────┐
│     Product     │ 1───N │  PersonalizationSet  │
│  (Shopify)      │       │  (Custom)            │
│                 │       │                      │
│  - shopifyId    │       │  - id                │
│  - title        │       │  - productId (FK)    │
│  - handle       │       │  - name              │
│                 │       │  - isActive          │
└─────────────────┘       └──────────┬───────────┘
                                     │
                                     │ 1───N
                                     ▼
                          ┌─────────────────────┐
                          │  PersonalizeField   │
                          │  (Custom)            │
                          │                      │
                          │  - id                │
                          │  - setId (FK)        │
                          │  - type              │
                          │  - label             │
                          │  - required          │
                          │  - options           │
                          │  - position          │
                          └──────────┬───────────┘
                                     │
                                     │ 1───N
                                     ▼
                          ┌─────────────────────┐
                          │   BuyerInput        │
                          │   (Custom)           │
                          │                      │
                          │  - id                │
                          │  - fieldId (FK)      │
                          │  - orderId           │
                          │  - value             │
                          │  - fileUrl           │
                          └─────────────────────┘
```

### Giải thích entities

| Entity | Mô tả | Lưu ở đâu |
|--------|-------|-----------|
| **Product** | Sản phẩm trên Shopify store | Shopify Platform |
| **PersonalizationSet** | Bộ cấu hình personalization cho 1 product | App database |
| **PersonalizeField** | Một trường input cá nhân hóa (text, image, dropdown) | App database |
| **BuyerInput** | Giá trị buyer nhập khi mua sản phẩm | App database |

## Personalization Field Types

Các loại field mà merchant có thể cấu hình cho sản phẩm:

| Type | Mô tả | Ví dụ |
|------|-------|-------|
| `TEXT` | Input text tự do | Tên, lời chúc, ghi chú |
| `TEXTAREA` | Input text nhiều dòng | Đoạn văn dài, thơ |
| `IMAGE` | Upload hình ảnh | Ảnh chân dung, logo |
| `DROPDOWN` | Chọn từ danh sách | Màu sắc, font chữ |
| `CHECKBOX` | Tùy chọn có/không | Thêm viền, bọc quà |
| `COLOR` | Chọn màu | Màu text, màu nền |

## Data Storage

### App Database (Prisma + SQLite/PostgreSQL)

App sử dụng Prisma ORM để quản lý custom data:

- **PersonalizationSet** — cấu hình personalization
- **PersonalizeField** — định nghĩa các fields
- **BuyerInput** — lưu giá trị buyer nhập
- **Session** — Shopify session management

> 💡 Database chính trong development là SQLite (file local). Production có thể dùng PostgreSQL.

### Shopify Metafields

Ngoài database riêng, app có thể dùng [Shopify Metafields](https://shopify.dev/docs/api/admin-graphql/latest/objects/Metafield) để lưu data gắn trực tiếp vào Shopify resources:

| Khi nào dùng Metafields | Khi nào dùng App Database |
|-------------------------|--------------------------|
| Data cần hiển thị trên storefront | Data chỉ dùng trong app admin |
| Data gắn chặt vào Shopify resource | Data có quan hệ phức tạp |
| Ít fields, cấu trúc đơn giản | Nhiều records, cần query phức tạp |

## GraphQL API Patterns

App tương tác với Shopify data qua GraphQL API:

### Query — Đọc dữ liệu

```graphql
# Lấy danh sách sản phẩm
query GetProducts {
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        variants(first: 5) {
          edges {
            node {
              id
              title
              price
            }
          }
        }
      }
    }
  }
}
```

### Mutation — Ghi dữ liệu

```graphql
# Tạo metafield cho product
mutation SetMetafield {
  metafieldsSet(metafields: [{
    ownerId: "gid://shopify/Product/123"
    namespace: "personalizer"
    key: "config"
    type: "json"
    value: "{\"fields\": [...]}"
  }]) {
    metafields {
      id
      key
      value
    }
  }
}
```

> 💡 Shopify API dùng **Relay-style pagination** (edges/nodes) thay vì offset-based pagination thông thường.

### API Version

Shopify API có version theo ngày (ví dụ: `2024-01`, `2024-04`). Mỗi version supported trong 1 năm. Cấu hình version trong `shopify.app.toml`.

## Data Flow

Luồng dữ liệu từ merchant cấu hình → buyer sử dụng:

```
1. Merchant setup        2. Buyer personalizes     3. Order created
   ┌──────────┐             ┌──────────┐              ┌──────────┐
   │ Merchant │             │  Buyer   │              │  Order   │
   │ Admin    │             │ Storefront│              │  Admin   │
   └────┬─────┘             └────┬─────┘              └────┬─────┘
        │                        │                         │
        ▼                        ▼                         ▼
   Create fields            Fill in values            View inputs
   Set options              Upload images             Fulfill order
   Preview                  Add to cart               Print/produce
```

## Tham khảo thêm

- [Architecture](architecture.md) — kiến trúc tổng thể Remix + Polaris + App Bridge
- [Shopify GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql) — API reference chính thức
- [Prisma Documentation](https://www.prisma.io/docs) — ORM documentation

---
*Section: Tools > Shopify > Data Model · [← Shopify](README.md) · [Wiki Home](../../README.md)*
