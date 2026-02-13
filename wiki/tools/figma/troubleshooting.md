# Xử lý sự cố — Figma

## Overview

Trang này liệt kê các vấn đề thường gặp khi dùng Figma trong team MakeIt, kèm nguyên nhân và cách giải quyết.

Format: **Vấn đề** → **Nguyên nhân** → **Giải pháp**

---

## 1. Không thấy Dev Mode

**Vấn đề:** Mở Figma file nhưng không thấy toggle Dev Mode (icon `< >`) ở thanh công cụ phía trên.

**Nguyên nhân:**
- Tài khoản Figma free tier không có quyền Dev Mode
- File owner chưa cấp quyền Dev Mode cho bạn
- Bạn đang dùng Figma ở chế độ view-only hạn chế

**Giải pháp:**
1. Kiểm tra quyền truy cập: bạn cần ít nhất role "Viewer" với Dev Mode enabled
2. Liên hệ Designer hoặc file owner để cấp quyền Dev Mode
3. Nếu team dùng Figma Professional plan, Dev Mode đã bao gồm cho viewer seats
4. Dùng Figma MCP Agent như giải pháp thay thế — Agent extract specs không cần Dev Mode

---

## 2. Design specs không khớp implementation

**Vấn đề:** Khi implement, UI trông khác so với design trên Figma — spacing sai, colors lệch, typography không đúng.

**Nguyên nhân:**
- Inspect sai element (chọn parent thay vì child element)
- Design dùng auto layout nhưng Dev hardcode pixels
- Colors trong design là design tokens, Dev dùng sai hex value
- Font weight render khác nhau giữa Figma và browser

**Giải pháp:**
1. **Double-check element:** Trong Dev Mode, click chính xác vào element cần inspect (dùng `Cmd/Ctrl + Click` để deep-select)
2. **Dùng design tokens:** Extract tokens thay vì copy hex values — tokens đảm bảo consistency
3. **So sánh visual:** Đặt screenshot Figma bên cạnh implementation
4. **Dùng Agent parity check:** Agent có thể so sánh tự động — chạy workflow `compare-ui`
5. **Font rendering:** Đảm bảo cùng font family, check font-display strategy

---

## 3. Comments bị mất

**Vấn đề:** Comments trên Figma không thấy nữa — tưởng bị xoá.

**Nguyên nhân:**
- Comments đã được **resolved** (không phải deleted)
- Đang filter chỉ hiện "Unresolved" comments
- Comments nằm ở page khác trong file

**Giải pháp:**
1. Mở panel Comments (icon 💬 hoặc `Shift + C`)
2. Toggle filter "Show resolved comments" — comments đã resolve sẽ hiện lại
3. Kiểm tra đúng page — comments chỉ hiện ở page chứa chúng
4. Search trong comments panel bằng keyword

> 💡 **Lưu ý:** Resolved comments khác với deleted comments. Resolved vẫn giữ lại lịch sử, deleted thì mất vĩnh viễn. Luôn **resolve** thay vì **delete**.

---

## 4. Fonts không hiển thị đúng

**Vấn đề:** Mở Figma file thấy text hiển thị sai font — bị thay thế bằng font mặc định hoặc hiện warning "Missing fonts".

**Nguyên nhân:**
- Font chưa được cài trên máy local
- Figma Web không access được fonts local (cần Font Helper)
- Font là premium/paid font mà bạn chưa có license

**Giải pháp:**
1. **Figma Web:** Cài [Figma Font Helper](https://www.figma.com/downloads/) — ứng dụng nhỏ cho phép Figma Web truy cập fonts trên máy
2. **Figma Desktop:** Fonts local tự động được detect — không cần Font Helper
3. **Google Fonts:** Nếu team dùng Google Fonts, Figma đã tích hợp sẵn — không cần cài thêm
4. **Premium Fonts:** Liên hệ Designer để biết font nào đang dùng và cách truy cập

---

## 5. Agent không đọc được Figma

**Vấn đề:** Chạy AI Agent workflow nhưng Agent báo lỗi không kết nối được Figma hoặc không đọc được file.

**Nguyên nhân:**
- Personal Access Token hết hạn hoặc sai
- File không có quyền truy cập cho token owner
- URL Figma file sai format

**Giải pháp:**
1. Kiểm tra Personal Access Token:
   - Figma → Settings → Personal Access Tokens
   - Tạo token mới nếu token cũ hết hạn
   - Copy token mới vào cấu hình MCP
2. Kiểm tra file permissions:
   - Bạn phải có quyền view file
   - Thử mở file trên Figma Web — nếu không mở được, cần request access
3. Kiểm tra URL format:
   - URL phải có dạng: `https://www.figma.com/design/FILE_KEY/...`
   - Copy URL trực tiếp từ browser khi mở file

---

## 6. File Figma quá nặng, load chậm

**Vấn đề:** Mở Figma file rất chậm, canvas lag khi scroll hoặc zoom.

**Nguyên nhân:**
- File chứa quá nhiều pages và frames
- Images resolution quá cao
- Nhiều hidden layers không dùng nữa
- History file quá dài

**Giải pháp:**
1. **Xoá hidden layers:** Layers ẩn vẫn ảnh hưởng performance — xoá nếu không cần
2. **Compress images:** Dùng plugin "Downsize" hoặc export/re-import images ở resolution thấp hơn
3. **Split file:** Tách file lớn thành nhiều files nhỏ theo feature/section
4. **Archive old designs:** Move designs cũ sang page "Archive" riêng
5. **Dùng Figma Desktop:** Performance tốt hơn Figma Web cho file lớn

---

## 7. Export asset không đúng kích thước

**Vấn đề:** Export icon hoặc image từ Figma nhưng kích thước không như mong đợi.

**Nguyên nhân:**
- Element chưa được set export settings
- Export scale factor sai (1x thay vì 2x)
- Frame có padding ẩn hoặc constraints lạ

**Giải pháp:**
1. Chọn element cần export
2. Ở panel phải, mở section "Export"
3. Set format phù hợp:
   - Icons → **SVG** (vector, scale freely)
   - Photos → **PNG** hoặc **JPG** ở 2x scale
4. Check kích thước preview trước khi export
5. Nếu có padding thừa: group element vào frame mới → export frame

---

## Tóm tắt nhanh

| Vấn đề | Giải pháp nhanh |
|--------|----------------|
| Không thấy Dev Mode | Liên hệ Designer cấp quyền |
| Specs không khớp UI | Double-check element, dùng Agent parity check |
| Comments mất | Filter "Show resolved" trong panel Comments |
| Font sai | Cài Font Helper (Web) hoặc dùng Desktop |
| Agent không đọc Figma | Check Personal Access Token, file permissions |
| File load chậm | Xoá hidden layers, compress images, dùng Desktop |
| Export sai kích thước | Check export settings và scale factor |

---

## Liên kết

- [Cài đặt Figma](setup.md) — setup ban đầu
- [Agent Automation](automation.md) — cách Agent tương tác với Figma
- [Conventions](conventions.md) — quy tắc tổ chức Figma

---

*Document: wiki/tools/figma/troubleshooting.md*
*Phase: 06 — Tool Guides*
*Last updated: 2026-02-13*
