# Troubleshooting — Shopify App

Các lỗi thường gặp khi phát triển Shopify App và cách xử lý. Mỗi mục theo format: **Vấn đề → Nguyên nhân → Giải pháp**.

---

## 1. App không load trong Shopify Admin

### Vấn đề
Mở app trong Shopify Admin nhưng thấy trang trắng, loading mãi, hoặc báo lỗi "This app can't be reached".

### Nguyên nhân
- **Tunnel đã tắt** — ngrok/Cloudflare tunnel không chạy, Shopify không kết nối được tới local server
- **App URL sai** — URL app trên Partner Dashboard không khớp với tunnel URL hiện tại
- **Dev server chưa chạy** — `shopify app dev` hoặc `npm run dev` chưa start

### Giải pháp

```bash
# 1. Đảm bảo dev server đang chạy
shopify app dev

# 2. Kiểm tra tunnel URL trong terminal output
# Nó sẽ hiện dạng: https://abc123.ngrok-free.app

# 3. Nếu tunnel bị disconnect, restart dev server
# Ctrl+C để dừng, rồi chạy lại shopify app dev

# 4. Hard refresh browser (Cmd+Shift+R hoặc Ctrl+Shift+R)
```

> 💡 Mỗi lần restart `shopify app dev`, tunnel URL có thể thay đổi. CLI tự update URL trên Partner Dashboard.

---

## 2. Polaris Components không render

### Vấn đề
Polaris components (Button, Card, Page...) hiển thị sai, không có style, hoặc báo lỗi "AppProvider not found".

### Nguyên nhân
- **AppProvider missing** — Polaris yêu cầu wrap toàn bộ app trong `<AppProvider>`
- **Polaris CSS chưa import** — thiếu CSS file cho Polaris styles
- **Version mismatch** — `@shopify/polaris` version không tương thích với `@shopify/app-bridge-react`

### Giải pháp

Kiểm tra file root layout (`app/root.tsx` hoặc tương tự):

```tsx
// Đảm bảo AppProvider wrap toàn bộ app
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

export default function App() {
  return (
    <AppProvider i18n={{}}>
      {/* ... app content ... */}
    </AppProvider>
  );
}
```

Nếu vẫn lỗi, kiểm tra version:

```bash
# Kiểm tra versions
npm list @shopify/polaris @shopify/app-bridge-react

# Update nếu cần
npm update @shopify/polaris @shopify/app-bridge-react
```

---

## 3. Authentication Loop (vòng lặp đăng nhập)

### Vấn đề
App liên tục redirect về trang đăng nhập Shopify, không bao giờ vào được app. Hoặc hiện lỗi "Session expired".

### Nguyên nhân
- **Session token hết hạn** — Shopify session tokens có thời hạn ngắn
- **Cookie issues** — browser chặn third-party cookies (embedded app chạy trong iframe)
- **OAuth redirect misconfigured** — redirect URL không khớp

### Giải pháp

```bash
# 1. Clear browser cookies cho domain shopify
#    Chrome: Settings → Privacy → Cookies → tìm shopify → xóa

# 2. Kiểm tra App setup trên Partner Dashboard:
#    - App URL phải khớp với tunnel URL
#    - Allowed redirect URLs phải có: {tunnel-url}/auth/callback

# 3. Restart dev server (session mới)
shopify app dev

# 4. Thử Incognito/Private window (bypass cookie issues)
```

> ⚠️ **Quan trọng:** Embedded apps dùng session tokens (JWT), không dùng cookies truyền thống. Nếu team dùng `@shopify/shopify-app-remix`, package này xử lý tự động.

---

## 4. GraphQL Query thất bại

### Vấn đề
Gọi Shopify GraphQL API trả về lỗi: "Access denied", "Field not found", hoặc lỗi 403 Forbidden.

### Nguyên nhân
- **API version mismatch** — query dùng field chỉ có ở version mới hơn
- **Scopes không đủ** — app chưa xin đủ quyền truy cập resource
- **Rate limiting** — quá nhiều requests trong thời gian ngắn

### Giải pháp

**Kiểm tra scopes:**

```bash
# Xem scopes hiện tại trong shopify.app.toml
cat shopify.app.toml | grep scopes

# Ví dụ: cần đọc products → phải có read_products
# scopes = "read_products,write_products,read_orders"
```

Sau khi thay đổi scopes:
1. Restart `shopify app dev`
2. Vào dev store → Apps → re-install app (để cấp quyền mới)

**Kiểm tra API version:**

```bash
# Xem API version trong shopify.app.toml
cat shopify.app.toml | grep api_version

# Đổi sang version mới nhất nếu cần
# api_version = "2024-10"
```

**Rate limiting:**

```
# Shopify API có rate limit:
# - REST: 40 requests/second
# - GraphQL: 1000 cost points/second
#
# Nếu bị rate limit (HTTP 429), thêm delay giữa các requests
```

---

## 5. Prisma Migration lỗi

### Vấn đề
Chạy `npx prisma migrate dev` báo lỗi: database locked, migration failed, hoặc schema conflict.

### Nguyên nhân
- **Dev server đang chạy** — database file bị lock khi server đang dùng
- **Migration conflict** — nhiều người thay đổi schema song song
- **Database file bị corrupt** — SQLite file lỗi

### Giải pháp

```bash
# 1. Dừng dev server trước khi migrate
# Ctrl+C để dừng shopify app dev

# 2. Chạy migration
npx prisma migrate dev --name descriptive_name

# 3. Nếu vẫn lỗi, reset database (MẤT TOÀN BỘ DATA local)
npx prisma migrate reset

# 4. Nếu schema conflict, xóa file migration cũ rồi tạo lại
# (Chỉ làm trên development, KHÔNG làm trên production)

# 5. Với database bị corrupt, xóa file dev.db và migrate lại
rm prisma/dev.db
npx prisma migrate dev
```

> ⚠️ `prisma migrate reset` sẽ xóa toàn bộ data local. Chỉ dùng khi development.

---

## 6. Hot Reload không hoạt động

### Vấn đề
Thay đổi code nhưng browser không tự động cập nhật. Phải refresh thủ công hoặc restart server.

### Nguyên nhân
- **Vite config issue** — HMR (Hot Module Replacement) bị disable hoặc cấu hình sai
- **File watcher limit** — hệ điều hành giới hạn số file có thể watch
- **Tunnel latency** — thay đổi mất thời gian đi qua tunnel

### Giải pháp

```bash
# 1. Restart dev server
# Ctrl+C → shopify app dev

# 2. Trên macOS — tăng file watcher limit
echo kern.maxfiles=524288 | sudo tee -a /etc/sysctl.conf
echo kern.maxfilesperproc=524288 | sudo tee -a /etc/sysctl.conf

# 3. Hard refresh browser (xóa cache)
# macOS: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# 4. Kiểm tra vite.config.ts — đảm bảo HMR enabled
# (Thường đã cấu hình sẵn trong Shopify template)
```

---

## 7. "App not found" sau khi thay đổi app configuration

### Vấn đề
Sau khi thay đổi `shopify.app.toml` (scopes, URLs), app báo lỗi "App not found" hoặc redirect sai.

### Nguyên nhân
- **Config chưa deploy** — thay đổi toml chỉ áp dụng local, chưa push lên Shopify
- **Cache cũ** — browser hoặc Shopify Admin cache config cũ

### Giải pháp

```bash
# 1. Deploy config changes
shopify app deploy

# 2. Restart dev server
shopify app dev

# 3. Clear browser cache và re-install app
# Vào dev store → Apps → Xóa app → Cài lại
```

---

## Quick Reference

| Lỗi | Kiểm tra đầu tiên |
|-----|-------------------|
| App không load | `shopify app dev` đang chạy? Tunnel hoạt động? |
| UI sai | `<AppProvider>` có wrap app? Polaris CSS imported? |
| Auth loop | Cookies? App URL khớp tunnel? |
| API error | Scopes đủ? API version đúng? |
| DB error | Dev server đã dừng? Chạy `prisma migrate dev` |
| No hot reload | Restart dev server, hard refresh browser |
| App not found | Chạy `shopify app deploy` cập nhật config |

---

## Tham khảo thêm

- [Setup Guide](setup.md) — cấu hình ban đầu
- [Architecture](architecture.md) — hiểu kiến trúc để debug tốt hơn
- [Shopify CLI Troubleshooting](https://shopify.dev/docs/apps/tools/cli/troubleshoot) — tài liệu chính thức

---
*Section: Tools > Shopify > Troubleshooting · [← Shopify](README.md) · [Wiki Home](../../README.md)*
