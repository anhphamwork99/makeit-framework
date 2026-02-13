# Automation — Agent tự động làm gì và Bạn cần làm gì

Phân tách rõ ràng giữa những gì AI Agent (Antigravity) có thể tự động hóa và những gì bạn cần tự tay thực hiện khi làm việc với Shopify App.

> 📌 **Nguyên tắc chung:** Agent xử lý code và logic. Bạn xử lý configuration, testing, và deployment.

## Bảng phân chia Agent và Human

| Loại công việc | Agent tự động | Bạn cần làm |
|---------------|---------------|-------------|
| **Remix Routes** | ✅ Generate route files, loaders, actions | ❌ — |
| **Polaris UI** | ✅ Tạo components với Polaris library | 👁️ Review UI trên dev store |
| **Prisma Schema** | ✅ Viết schema, tạo migration files | ▶️ Chạy `npx prisma migrate dev` |
| **API Endpoints** | ✅ Implement loaders/actions cho CRUD | 👁️ Test API qua app UI |
| **GraphQL Queries** | ✅ Viết queries/mutations cho Shopify API | ❌ — |
| **Tests** | ✅ Generate unit tests, integration tests | ▶️ Chạy `npm test` verify |
| **Code Review** | ✅ Self-review theo checklist | 👁️ Final review trước merge |
| **Shopify Account** | ❌ — | ✅ Tạo Partner account (một lần) |
| **Dev Store** | ❌ — | ✅ Tạo và cấu hình dev store |
| **API Credentials** | ❌ — | ✅ Tạo app, copy API keys vào `.env` |
| **App Installation** | ❌ — | ✅ Cài app vào dev store lần đầu |
| **Manual Testing** | ❌ — | ✅ Test app UI, kiểm tra flow |
| **Deployment** | ❌ — | ✅ Deploy app lên production |
| **App Review** | ❌ — | ✅ Submit app review (nếu public app) |
| **Error Monitoring** | ❌ — | ✅ Monitor lỗi production |

### Legend

| Icon | Ý nghĩa |
|------|---------|
| ✅ | Chịu trách nhiệm chính |
| ▶️ | Chạy command do Agent chuẩn bị |
| 👁️ | Review/kiểm tra output của Agent |
| ❌ | Không tham gia |

---

## Chi tiết: Agent tự động làm gì

### 1. Generate Remix Routes

Agent tạo complete route files bao gồm:
- `loader` function — đọc dữ liệu từ Shopify API hoặc database
- `action` function — xử lý form submissions
- React component — render UI với Polaris

### 2. Tạo Polaris UI Components

Agent sử dụng Polaris component library để:
- Xây dựng giao diện theo Figma design
- Dùng đúng Polaris components (Page, Card, DataTable, Form...)
- Handle interaction states (loading, error, empty)

### 3. Viết Prisma Schema và Migrations

Agent tạo:
- Schema definitions trong `prisma/schema.prisma`
- Migration files (nhưng **bạn cần chạy migration command**)

### 4. Implement API Endpoints

Agent xây dựng:
- GraphQL queries/mutations cho Shopify API
- REST endpoints cho internal app logic
- Error handling và validation

### 5. Generate Tests

Agent viết:
- Unit tests cho utility functions
- Integration tests cho API endpoints
- Component tests cho Polaris UI

### 6. Self-review Code

Agent tự kiểm tra code theo checklist:
- Code quality và conventions
- Security (xác thực, phân quyền)
- Performance (query efficiency)

---

## Chi tiết: Bạn cần làm gì

### One-time Setup (làm một lần)

1. **Tạo Shopify Partner account** — [partners.shopify.com](https://partners.shopify.com/)
2. **Tạo development store** — để test app free
3. **Tạo app trên Partner Dashboard** — lấy API credentials
4. **Cấu hình `.env`** — điền API key, secret, scopes

> 🔗 Chi tiết: xem [Setup Guide](setup.md)

### Per-feature Tasks (mỗi tính năng)

1. **Chạy migration** — khi Agent thay đổi Prisma schema
   ```bash
   npx prisma migrate dev --name descriptive_name
   ```
2. **Test trên dev store** — mở app, kiểm tra flow hoạt động
3. **Review code** — đọc qua code Agent generate, đặc biệt logic nghiệp vụ
4. **Chạy tests** — verify Agent tests pass
   ```bash
   npm test
   ```

### Deployment (khi release)

1. **Build app** — `npm run build`
2. **Deploy** — theo quy trình deployment team đã chốt
3. **Verify production** — kiểm tra app hoạt động trên production store
4. **Monitor** — theo dõi errors trong logs

---

## Tips hiệu quả

| Tip | Giải thích |
|-----|-----------|
| **Mô tả rõ requirement** | Agent code tốt hơn khi bạn mô tả rõ ràng feature cần làm gì |
| **Cho Agent context** | Share Figma link, user story, data model — càng nhiều context càng tốt |
| **Test sớm, test thường xuyên** | Sau mỗi task Agent hoàn thành, test trên dev store ngay |
| **Không sửa code Agent generate bằng tay** | Nếu cần thay đổi, yêu cầu Agent sửa → giữ code consistent |
| **Report lỗi đầy đủ** | Paste error message, screenshot, steps to reproduce → Agent fix nhanh hơn |

---

## Tham khảo thêm

- [Troubleshooting](troubleshooting.md) — xử lý lỗi thường gặp
- [Setup](setup.md) — hướng dẫn setup ban đầu

---
*Section: Tools > Shopify > Automation · [← Shopify](README.md) · [Wiki Home](../../README.md)*
