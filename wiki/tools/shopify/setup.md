# Setup Development Environment

Hướng dẫn setup môi trường phát triển Shopify App từ đầu. Sau khi hoàn thành, bạn có thể chạy app trên development store và bắt đầu code.

## Prerequisites

Trước khi bắt đầu, đảm bảo bạn đã có:

| Thứ cần có | Version tối thiểu | Kiểm tra |
|------------|-------------------|----------|
| **Node.js** | v18 trở lên | `node --version` |
| **npm** hoặc **yarn** | npm 9+ hoặc yarn 1.22+ | `npm --version` |
| **Git** | Bất kỳ | `git --version` |
| **Trình duyệt** | Chrome hoặc Firefox (DevTools cần thiết) | — |

> 💡 Nếu chưa có Node.js, xem hướng dẫn tại [nodejs.org](https://nodejs.org/). Khuyến khích dùng nvm để quản lý versions.

## Bước 1: Tạo Shopify Partner Account

Shopify Partner account là tài khoản developer — miễn phí, cho phép bạn tạo development stores và build apps.

1. Truy cập [partners.shopify.com](https://partners.shopify.com/)
2. Click **Join now** (hoặc **Sign up**)
3. Điền thông tin:
   - Email cá nhân
   - Password
   - Thông tin cơ bản (tên, quốc gia)
4. Xác nhận email
5. Đăng nhập vào Partner Dashboard

> ⚠️ **Lưu ý:** Dùng email cá nhân, không dùng email công ty. Mỗi người cần Partner account riêng.

## Bước 2: Tạo Development Store

Development store là một Shopify store miễn phí dùng để test app trong quá trình development. Không tốn phí, không giới hạn thời gian.

1. Trong Partner Dashboard, vào **Stores** (menu bên trái)
2. Click **Add store**
3. Chọn **Development store**
4. Chọn purpose: **Create a store to test and build** (hoặc tương tự)
5. Điền thông tin:
   - **Store name:** `dev-{tên bạn}` (ví dụ: `dev-anhpham`)
   - **Store URL:** tự tạo từ store name
   - **Country/Region:** chọn bất kỳ (thường chọn Vietnam hoặc US)
6. Click **Save** → chờ store được tạo

Sau khi tạo xong, bạn có thể truy cập store tại: `dev-anhpham.myshopify.com/admin`

> 💡 Bạn có thể tạo nhiều development stores. Khuyến khích có 1 store riêng cho mỗi dự án hoặc tính năng lớn.

## Bước 3: Cài đặt Shopify CLI

Shopify CLI là công cụ command-line chính thức để phát triển Shopify apps.

```bash
# Cài đặt Shopify CLI qua npm (khuyến khích)
npm install -g @shopify/cli @shopify/app

# Kiểm tra cài đặt thành công
shopify version
```

Kết quả mong đợi:

```
@shopify/cli/3.x.x
```

### Đăng nhập Shopify CLI

```bash
# Đăng nhập vào Partner account
shopify auth login

# CLI sẽ mở trình duyệt để bạn đăng nhập
# Sau khi đăng nhập, quay lại terminal
```

> ⚠️ Nếu gặp lỗi `command not found: shopify`, thử chạy với npx: `npx shopify version`

## Bước 4: Clone và Setup Project

```bash
# Clone repository
git clone <repository-url>
cd <project-folder>

# Cài dependencies
npm install
```

## Bước 5: Cấu hình Environment Variables

Tạo file `.env` từ template:

```bash
# Copy file mẫu
cp .env.example .env
```

Mở file `.env` và điền các giá trị:

```env
# Shopify App credentials (lấy từ Partner Dashboard > Apps > App setup)
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here

# App scopes — quyền app cần truy cập
SCOPES=read_products,write_products,read_orders

# App URL — sẽ update khi chạy ngrok
HOST=https://your-ngrok-url.ngrok-free.app

# Database
DATABASE_URL=file:./dev.db
```

### Lấy API credentials từ đâu?

1. Vào [Partner Dashboard](https://partners.shopify.com/) → **Apps**
2. Chọn app của bạn (hoặc tạo mới: **Create app** → Manual)
3. Tab **App setup** → phần **Client credentials**
4. Copy **Client ID** (= `SHOPIFY_API_KEY`) và **Client secret** (= `SHOPIFY_API_SECRET`)

## Bước 6: Chạy Development Server

```bash
# Start development server
shopify app dev

# Hoặc nếu dùng npm scripts
npm run dev
```

Khi chạy lần đầu, CLI sẽ hỏi:
- **Which store?** → chọn development store bạn đã tạo ở Bước 2
- **Create this app?** → Yes

CLI sẽ tự động:
- Tạo ngrok tunnel (hoặc Cloudflare tunnel) cho local server
- Update app URL trên Partner Dashboard
- Mở app preview URL

```
╭─ success ─────────────────────────────────────────────────────────╮
│                                                                   │
│   Preview URL: https://abc123.ngrok-free.app                      │
│                                                                   │
│   GraphiQL: https://abc123.ngrok-free.app/graphiql                │
│                                                                   │
╰───────────────────────────────────────────────────────────────────╯
```

## Bước 7: Verify Setup

Kiểm tra app đã chạy đúng:

1. **Mở Preview URL** từ terminal → trình duyệt mở trang Shopify Admin
2. **Đăng nhập** bằng development store account
3. **Xác nhận cài app** → click Install
4. **App hiển thị** trong Shopify Admin → embedded app load thành công

### Checklist verify

- [ ] `shopify version` trả về version number
- [ ] `shopify auth login` đăng nhập thành công
- [ ] `shopify app dev` start server không lỗi
- [ ] Preview URL mở được trong trình duyệt
- [ ] App hiển thị trong Shopify Admin
- [ ] Console không có error nghiêm trọng

## Troubleshooting Setup

| Vấn đề | Giải pháp |
|--------|-----------|
| `command not found: shopify` | Cài lại: `npm install -g @shopify/cli @shopify/app` |
| Tunnel không kết nối | Kiểm tra firewall, thử restart `shopify app dev` |
| "App not installed" khi mở | Vào dev store Admin → Apps → cài lại app |
| Database error | Chạy `npx prisma migrate dev` để tạo/update database |
| Port conflict | Đổi port: `shopify app dev --port 3001` |

> 🔗 Xem thêm: [Troubleshooting](troubleshooting.md) cho các lỗi phức tạp hơn.

---
*Section: Tools > Shopify > Setup · [← Shopify](README.md) · [Wiki Home](../../README.md)*
