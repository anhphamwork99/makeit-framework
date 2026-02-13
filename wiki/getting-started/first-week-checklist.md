# First Week Checklist

Checklist giúp bạn setup môi trường và bắt đầu làm việc trong team MakeIt. **Ngày 1** là shared steps cho mọi role — hoàn thành 5 bước dưới đây trước. **Từ Ngày 2+**, follow branch phù hợp role của bạn.

> ⏱️ **Ngày 1 mất khoảng 30-60 phút.** Sau đó bạn sẵn sàng cho role-specific steps.

---

## Ngày 1: Setup Môi Trường (Shared — Mọi Role)

### Step 1: Install Antigravity IDE

- [ ] Download Antigravity IDE từ [antigravity.dev](https://antigravity.dev) (macOS / Windows / Linux)
- [ ] Cài đặt và mở IDE
- [ ] Đăng nhập account (hoặc tạo account mới)
- [ ] **Verify:** IDE mở được, hiển thị welcome screen

### Step 2: Clone Repository

- [ ] Mở terminal trong Antigravity IDE (Terminal → New Terminal)
- [ ] Clone repo:
  ```bash
  git clone <repo-url>
  ```
  > 💡 Hỏi Techlead hoặc PO để lấy repo URL nếu chưa có.
- [ ] Mở folder project trong IDE (File → Open Folder)
- [ ] **Verify:** Folder project hiển thị trong IDE file explorer — thấy các folders `wiki/`, `templates/`, `.github/`

### Step 3: Copy GEMINI.md Theo Role

- [ ] Mở terminal trong IDE
- [ ] Chạy install script:
  ```bash
  cd templates && bash install.sh
  ```
- [ ] Script sẽ hỏi role của bạn → **chọn đúng role** (PO, BA, Designer, Techlead, Dev FE, Dev BE)
- [ ] Script tự động copy `GEMINI.md` + skills + workflows vào workspace của bạn
- [ ] **Verify:** File `.agent/GEMINI.md` tồn tại trong project root — chạy `ls .agent/GEMINI.md`

### Step 4: Verify AI Setup

- [ ] Mở file bất kỳ trong project (ví dụ: `wiki/README.md`)
- [ ] Mở AI chat trong IDE (`Cmd+L` trên macOS hoặc tương đương)
- [ ] Gõ vào chat:
  ```
  Bạn là ai? Mô tả role và capabilities của bạn.
  ```
- [ ] **Verify:** AI respond đúng role context — ví dụ: "Tôi là BA agent..." hoặc "Tôi là Dev FE agent..."
- [ ] Nếu AI không nhận diện role → kiểm tra lại Step 3

### Step 5: Join Communication Channels

- [ ] Join **Telegram** group chat của team (hỏi PO hoặc Techlead link invite)
- [ ] Đăng nhập **Lark** workspace (hỏi admin gửi invite)
- [ ] Post message giới thiệu bản thân trong Telegram group:
  ```
  Chào team! Mình là [Tên], role [Role] 👋
  ```
- [ ] **Verify:** Nhận được welcome message từ team members

---

## Ngày 2+: Your Next Steps (Chọn Role Của Bạn)

> Sau khi hoàn thành 5 shared steps ở Ngày 1, tiếp tục với branch phù hợp role của bạn.

---

### 🎯 Product Owner (PO)

- [ ] Đọc [How We Work](how-we-work.md) — hiểu team overview và cách vận hành
- [ ] Đọc [PO Workflow](../roles/po/README.md) — hiểu responsibilities và quy trình
- [ ] Hoàn thành [First Win Guide — PO](first-win-guide.md#product-owner-po) — thực hành task đầu tiên
- [ ] Explore Lark task board — hiểu sprint structure và backlog items

---

### 📋 Business Analyst (BA)

- [ ] Đọc [How We Work](how-we-work.md) — hiểu team overview và cách vận hành
- [ ] Đọc [BA Workflow](../roles/ba/README.md) — hiểu responsibilities và quy trình
- [ ] Hoàn thành [First Win Guide — BA](first-win-guide.md#business-analyst-ba) — thực hành task đầu tiên
- [ ] Đọc [Team Workflow](../workflows/team-workflow.md) — hiểu vị trí BA trong pipeline

---

### 🎨 Designer

> ℹ️ Designer không sử dụng Antigravity IDE trực tiếp. Xem [Figma Guide](../tools/figma/README.md) để hiểu conventions team dùng và cách chuẩn bị design cho handoff.

---

### 🏗️ Tech Lead (TL)

- [ ] Đọc [How We Work](how-we-work.md) — hiểu team overview và cách vận hành
- [ ] Đọc [TL Workflow](../roles/techlead/README.md) — hiểu responsibilities và quy trình
- [ ] Hoàn thành [First Win Guide — TL](first-win-guide.md#tech-lead-tl) — thực hành task đầu tiên
- [ ] Đọc [Coding Standards](../reference/coding-standards.md) — hiểu Git conventions

---

### 💻 Dev Frontend (FE)

- [ ] Đọc [How We Work](how-we-work.md) — hiểu team overview và cách vận hành
- [ ] Đọc [Dev FE Workflow](../roles/dev-fe/README.md) — hiểu responsibilities và quy trình
- [ ] Hoàn thành [First Win Guide — Dev FE](first-win-guide.md#dev-frontend-fe) — thực hành task đầu tiên
- [ ] Đọc [Git Guide](../tools/git/README.md) — hiểu branching strategy và PR workflow

---

### ⚙️ Dev Backend (BE)

- [ ] Đọc [How We Work](how-we-work.md) — hiểu team overview và cách vận hành
- [ ] Đọc [Dev BE Workflow](../roles/dev-be/README.md) — hiểu responsibilities và quy trình
- [ ] Hoàn thành [First Win Guide — Dev BE](first-win-guide.md#dev-backend-be) — thực hành task đầu tiên
- [ ] Đọc [Git Guide](../tools/git/README.md) — hiểu branching strategy và PR workflow

---

## Cần Help?

| Vấn đề | Liên hệ |
|--------|---------|
| Không clone được repo | Techlead — kiểm tra Git access |
| Install script lỗi | Techlead — kiểm tra repo version |
| AI không nhận role | Techlead — kiểm tra GEMINI.md setup |
| Không vào được Lark | PO hoặc Admin — gửi lại invite |
| Câu hỏi về workflow | Post vào Telegram group chat |

---
*Section: Getting Started · [← Wiki Home](../README.md)*
