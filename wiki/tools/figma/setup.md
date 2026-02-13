# Cài đặt và truy cập Figma

## Bước 1: Tạo tài khoản Figma

1. Truy cập [figma.com](https://figma.com) và đăng ký tài khoản
2. Dùng email công việc của bạn để đăng ký
3. Xác nhận email qua link trong inbox
4. Hoàn thành profile (tên, avatar)

> 💡 **Free tier là đủ** cho viewer và developer. Designer cần Professional plan để sử dụng đầy đủ tính năng (shared libraries, branching).

---

## Bước 2: Request access vào team project

1. Liên hệ Designer hoặc team lead qua Telegram
2. Cung cấp email Figma của bạn
3. Chờ nhận invite vào team workspace
4. Accept invite trong email hoặc notification trên Figma

**Quyền truy cập theo vai trò:**

| Vai trò | Quyền Figma | Mô tả |
|---------|-------------|-------|
| Designer | Editor | Tạo, chỉnh sửa, quản lý design files |
| Business Analyst | Viewer | Xem design, inspect specs, để lại comments |
| Dev Frontend | Viewer + Dev Mode | Xem design, inspect specs, extract tokens |
| Dev Backend | Viewer | Xem design khi cần hiểu context |
| Techlead | Viewer | Xem design để review và break tasks |
| Product Owner | Viewer | Xem design để review và approve |

> 📌 **Dev Mode** yêu cầu quyền riêng. Nếu bạn là Dev Frontend và chưa thấy Dev Mode toggle, hãy liên hệ Designer để được cấp quyền.

---

## Bước 3: Làm quen giao diện Figma

### Khu vực chính

```
┌─────────────────────────────────────────────────┐
│  Toolbar (trên cùng)                            │
│  - Move, Frame, Shape, Text, Comment tools      │
├──────────┬──────────────────────┬───────────────┤
│          │                      │               │
│  Layers  │    Canvas            │  Properties   │
│  Panel   │    (khu vực thiết kế │  Panel        │
│  (trái)  │     chính)           │  (phải)       │
│          │                      │               │
│  - List  │                      │  - Design     │
│    các   │                      │  - Prototype  │
│    layers│                      │  - Inspect    │
│    và    │                      │               │
│    pages │                      │               │
├──────────┴──────────────────────┴───────────────┤
│  Pages (tabs ở góc trái trên)                   │
└─────────────────────────────────────────────────┘
```

### Thao tác cơ bản cho viewer

| Thao tác | Cách dùng |
|----------|----------|
| Di chuyển canvas | Kéo bằng chuột giữa hoặc giữ Space + kéo |
| Zoom in/out | Scroll chuột hoặc `Cmd/Ctrl` + `+/-` |
| Zoom to fit | `Shift` + `1` |
| Chọn element | Click trực tiếp vào element |
| Xem properties | Chọn element → xem panel bên phải |
| Để lại comment | Click icon comment (hoặc `C`) → click vào vị trí |
| Copy text | Chọn text element → `Cmd/Ctrl` + `C` |

---

## Figma Desktop vs Web

Figma có thể dùng trên trình duyệt web hoặc ứng dụng Desktop:

| Tiêu chí | Figma Web | Figma Desktop |
|----------|-----------|---------------|
| **Truy cập** | Bất kỳ trình duyệt nào | Cài app riêng |
| **Performance** | Tốt cho file nhỏ-vừa | Tốt hơn cho file lớn |
| **Offline** | Không hỗ trợ | Hỗ trợ hạn chế |
| **Font local** | Cần Figma Font Helper | Tự động detect |
| **Khuyên dùng** | Viewer, comment, inspect nhanh | Designer, file lớn |

> 💡 **Khuyến nghị:** Dùng **Figma Web** cho việc xem và comment hàng ngày. Dùng **Figma Desktop** khi cần performance tốt hơn cho file lớn.

---

## Cài đặt Figma Desktop (tuỳ chọn)

1. Truy cập [figma.com/downloads](https://www.figma.com/downloads/)
2. Tải phiên bản phù hợp với hệ điều hành (macOS / Windows)
3. Cài đặt và đăng nhập bằng tài khoản đã tạo
4. Mở team project từ sidebar

---

## Plugins khuyên dùng

Hiện tại team dùng **Figma MCP Official** (read-only, qua API) nên không cần cài thêm plugin đặc biệt. Xem thêm tại [Agent Automation](automation.md).

> 📌 Nếu trong tương lai cần plugin cho workflow mới, Designer sẽ thông báo qua Telegram.

---

## Checklist sau khi setup

- [ ] Tạo tài khoản Figma
- [ ] Nhận invite vào team project
- [ ] Truy cập được design files
- [ ] Biết cách zoom, di chuyển canvas, xem properties
- [ ] (Nếu là Dev Frontend) Có quyền Dev Mode

---

## Bước tiếp theo

Sau khi setup xong, đọc tiếp:
- [Quy trình handoff](handoff.md) — hiểu cách Designer giao design cho Dev
- [Conventions](conventions.md) — quy tắc team khi dùng Figma

---

*Document: wiki/tools/figma/setup.md*
*Phase: 06 — Tool Guides*
*Last updated: 2026-02-13*
