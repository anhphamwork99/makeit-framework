# Lark Troubleshooting

> **Mục đích:** Giải quyết các vấn đề thường gặp khi sử dụng Lark và Lark MCP.

---

## Format

Mỗi issue theo format:
- **Vấn đề** — Mô tả issue
- **Nguyên nhân** — Tại sao xảy ra
- **Giải pháp** — Cách fix

---

## Issue 1: Lark MCP không connect được

**Vấn đề:** Agent báo lỗi khi thử kết nối Lark MCP — "Connection failed", "Authentication error", hoặc "Server unavailable".

**Nguyên nhân:**
- Token hết hạn (Lark tokens có thời gian sống giới hạn)
- App ID hoặc App Secret không đúng
- Lark MCP server chưa được cấu hình trong Antigravity IDE
- Network issues (VPN, firewall)

**Giải pháp:**

1. **Kiểm tra credentials:**
   - Mở Antigravity IDE → MCP settings
   - Verify App ID và App Secret đúng
   - Nếu không chắc → tạo lại credentials trên Lark Developer Console

2. **Refresh token:**
   - Restart Antigravity IDE
   - Agent sẽ tự động refresh token khi reconnect
   - Nếu vẫn fail → xóa cache và re-configure

3. **Check network:**
   - Tắt VPN nếu đang dùng
   - Verify bạn có thể truy cập Lark web app bình thường
   - Thử ping Lark API endpoint

4. **Fallback:** Nếu không fix được ngay → dùng [Manual Fallback Pattern](./automation.md#manual-fallback-pattern)

---

## Issue 2: Bitable data không sync

**Vấn đề:** Agent đọc Bitable nhưng data không khớp với gì bạn thấy trên Lark UI — thiếu records, fields trống, hoặc data cũ.

**Nguyên nhân:**
- Field mapping không đúng — Agent tìm field "Status" nhưng trên Bitable tên là "Trạng thái"
- Bitable có nhiều views — Agent đọc view khác với view bạn đang xem
- Cache — data chưa sync real-time
- Permission — Agent không có quyền đọc một số fields

**Giải pháp:**

1. **Kiểm tra field names:**
   - Mở Bitable → xem tên chính xác của từng field
   - Đảm bảo field names match với config trong Lark MCP
   - Dùng English names cho fields để tránh encoding issues

2. **Verify view:**
   - Agent đọc raw data, không phải filtered view
   - Nếu bạn dùng filter trên UI → data sẽ khác
   - Check: records bạn tìm có bị filter bởi view không?

3. **Force refresh:**
   - Chạy lại command — Agent sẽ fetch fresh data
   - Nếu vẫn cũ → đợi vài phút cho cache clear

4. **Check permissions:**
   - Mở Bitable → Settings → Permissions
   - Verify Lark App có quyền đọc database

---

## Issue 3: Notification quá nhiều

**Vấn đề:** Nhận quá nhiều notifications từ Lark — bao gồm cả Bitable changes, channel messages, và system notifications.

**Nguyên nhân:**
- Default settings cho mọi notifications đều ON
- Bitable change notifications gửi cho mọi field update
- Agent gửi messages → trigger notifications

**Giải pháp:**

1. **Tối ưu notification settings:**

   | Category | Action |
   |----------|--------|
   | Bitable changes | ⬜ Tắt — quá nhiều noise |
   | Channel messages | ✅ Bật cho #sprint-current, 🔇 Mute #general |
   | @Mentions | ✅ Bật — luôn cần biết |
   | Direct Messages | ✅ Bật |
   | System updates | ⬜ Tắt |

2. **Set quiet hours:**
   - Lark Settings → Notifications → Quiet Hours
   - Set 22:00 — 08:00 (hoặc theo schedule của bạn)

3. **Mute specific channels:**
   - Right-click channel → Mute
   - Chọn "Mute until I unmute" cho channels ít quan trọng

→ Xem chi tiết: [Conventions — Notification Settings](./conventions.md#notification-settings)

---

## Issue 4: Meeting notes template không đúng

**Vấn đề:** Tạo meeting notes trên Lark Docs nhưng template format không khớp với team conventions.

**Nguyên nhân:**
- Dùng template cá nhân thay vì team template
- Copy template từ nguồn cũ (trước khi update)
- Chưa biết templates nằm ở đâu

**Giải pháp:**

1. **Dùng đúng template:**

   | Meeting | Template location |
   |---------|-------------------|
   | Sprint Refinement | [sprint-refinement.md](../../workflows/sprint-refinement.md) |
   | Sprint Planning | [sprint-planning.md](../../workflows/sprint-planning.md#meeting-notes-template) |
   | Weekly Sync-up | [sprint-sync.md](../../workflows/sprint-sync.md) |

2. **Cách apply template:**
   - Mở Lark Docs → New Document
   - Đặt tên: `[Meeting Type] — [Date]`
   - Copy template content từ link trên → paste vào Docs
   - Fill sections real-time

3. **Lưu team template:**
   - Tạo 1 folder "Templates" trên Lark Drive
   - Lưu templates đã fill mẫu để reuse

---

## Issue 5: Agent không tìm thấy Sprint Issue

**Vấn đề:** Chạy `/makeit:clarify` nhưng Agent báo "Sprint Issue not found" hoặc "No matching records".

**Nguyên nhân:**
- Filter search không đúng — Agent tìm theo tên nhưng tên không match
- Sprint Issue chưa được tạo trên Bitable
- Type field không đúng — record có Type = "Task" thay vì "Sprint Issue"
- Sprint Issue ở database khác

**Giải pháp:**

1. **Verify Sprint Issue tồn tại:**
   - Mở Bitable → check record bạn muốn Agent đọc
   - Check field **Type** = "Sprint Issue" (đúng chính tả)

2. **Check search criteria:**
   - Agent thường tìm theo Sprint name + Type
   - Đảm bảo Sprint field value match chính xác
   - Ví dụ: "Sprint 3" vs "sprint 3" → case-sensitive

3. **Provide manual context:**
   - Nếu Agent không tìm được → copy Sprint Issue content thủ công
   - Paste vào chat cho Agent: "Sprint Issue content: [paste here]"
   - Agent sẽ tạo SPECS.md từ content bạn cung cấp

4. **Check database ID:**
   - Lark MCP cần đúng Bitable database ID
   - Mở Bitable → URL chứa database ID
   - Verify ID trong Lark MCP config

---

## Issue 6: Agent gửi message sai channel

**Vấn đề:** Agent gửi handoff message hoặc notification tới channel sai (ví dụ: gửi vào #general thay vì #sprint-current).

**Nguyên nhân:**
- Channel ID trong config không đúng
- Channel đã đổi tên nhưng config chưa update
- Agent chọn channel theo tên — nếu có nhiều channels tương tự, có thể chọn nhầm

**Giải pháp:**

1. **Verify channel IDs:**
   - Mở channel trên Lark → URL hoặc Info panel chứa channel ID
   - Update Lark MCP config với đúng channel IDs

2. **Dùng channel ID thay vì tên:**
   - Config Lark MPC bằng channel ID (stable) thay vì channel name (có thể đổi)

3. **Test trước khi dùng production:**
   - Tạo test channel → configure Agent gửi vào test channel
   - Verify message format và nội dung
   - Đổi sang production channel khi đã confirm

---

## Issue 7: Lark Docs content bị truncated

**Vấn đề:** Agent đọc Lark Docs nhưng chỉ lấy được một phần nội dung — phần cuối bị cắt.

**Nguyên nhân:**
- Lark API có limit response size
- Document quá dài (>10,000 characters)
- Nested elements (tables, embedded images) có thể bị skip

**Giải pháp:**

1. **Chia nhỏ document:**
   - Nếu document quá dài → chia thành nhiều sections
   - Mỗi section là 1 Lark Doc riêng

2. **Copy thủ công:**
   - Nếu Agent chỉ lấy được 1 phần → copy phần còn lại thủ công
   - Paste vào chat cho Agent

3. **Dùng plain text:**
   - Complex formatting (tables, images) có thể gây truncation
   - Dùng plain text format cho documents quan trọng

---

## Quick Reference — Error → Action

| Error Message | Action nhanh |
|---------------|-------------|
| "Connection failed" | Check credentials, restart IDE |
| "Authentication error" | Refresh token, re-configure |
| "Record not found" | Verify record exists, check Type field |
| "Permission denied" | Check Bitable permissions cho App |
| "Timeout" | Retry — network có thể tạm slow |
| "Invalid field" | Check field name chính xác trên Bitable |
| "Channel not found" | Verify channel ID trong config |

---

## Khi nào nên escalate

Nếu bạn đã thử troubleshooting mà vẫn không fix được:

1. **Try manual fallback** — [Automation](./automation.md#manual-fallback-pattern) hướng dẫn cách làm thủ công
2. **Post trên #dev-chat** — Mô tả error + steps đã thử
3. **Tag Admin/Team Lead** — Nếu issue liên quan đến permissions hoặc config
4. **Ghi lesson learned** — Dùng `/makeit:lesson-learned` để ghi nhận cho team

---

## Related Documents

- [Automation](./automation.md) — Agent làm gì vs Bạn làm gì
- [Setup Guide](./setup.md) — Setup Lark MCP từ đầu
- [Lark Overview](./README.md) — Tổng quan Lark
- [Task Board](./task-board.md) — Board fields và views

---
*Troubleshooting: Lark · [← Lark](./README.md)*
