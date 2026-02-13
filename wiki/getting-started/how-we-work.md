# How We Work

Chào mừng bạn đến team MakeIt! Đây là tổng quan về cách team vận hành — từ cấu trúc team, quy trình làm việc, đến công cụ sử dụng. Document này giúp bạn hiểu big picture trong 5 phút. Click các deep-links để tìm hiểu chi tiết từng phần.

> 💡 **Team MakeIt:** 8 thành viên, part-time, remote, AI-augmented — toàn bộ team dùng Antigravity IDE làm công cụ chính.

---

## Team Structure

Team gồm 6 roles chuyên biệt, mỗi người có vai trò rõ ràng trong pipeline phát triển sản phẩm:

| Role | Số lượng | Stage | Focus chính |
|------|----------|-------|-------------|
| Product Owner (PO) | 1 | Stage 1 & 5 | Vision, backlog, final review |
| Designer | 2 | Stage 1 & 5 | UI/UX design, UI verification |
| Business Analyst (BA) | 1 | Stage 2 | User stories, Figma analysis |
| Tech Lead (TL) | 1 | Stage 3 | Task breakdown, code review |
| Dev Frontend (FE) | 2 | Stage 4 | Component development, UI implementation |
| Dev Backend (BE) | 1 | Stage 4 | API development, backend patterns |

Mỗi role page là self-contained — bạn chỉ cần đọc trang của role mình để hiểu responsibilities, quy trình, và cách dùng AI.

📖 Chi tiết: [Roles Overview](../roles/README.md)

---

## Team Workflow Pipeline

Team vận hành theo quy trình 5 stages — từ Design/PO chuẩn bị đến feature shipped. Mỗi stage có input/output rõ ràng, handoff đi qua Git với quality gates tại mỗi điểm chuyển giao.

```
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
│  Stage 1     │    │  Stage 2 │    │  Stage 3 │    │  Stage 4 │    │  Stage 5     │
│  Design/PO   │───▶│  BA      │───▶│ Techlead │───▶│  FE/BE   │───▶│  Review      │
└──────────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────────┘
  PO + Designer        BA            Techlead         Dev FE/BE      Reviewer + PO
```

Receiver verify input tại mỗi gate — nếu thiếu thông tin, tag người giao trên Telegram để bổ sung trước khi tiếp tục.

📖 Chi tiết: [Team Workflow](../workflows/team-workflow.md)

---

## Sprint Cadence

Team chạy sprint với 3 ceremonies chính, tối ưu cho part-time và async-first:

| Ceremony | Facilitator | Time-box | Mục đích |
|----------|------------|----------|----------|
| **Refinement** | PO | ~30 phút | PO đưa vision, team clarify requirements |
| **Planning** | Techlead | ~45 phút | Break tasks, estimate, assign |
| **Sync-up** | Techlead | ~15-20 phút | Weekly status update |

Ceremonies lean — team part-time nên giữ meeting ngắn, ưu tiên async updates qua Telegram giữa các buổi sync.

📖 Chi tiết: [Sprint Planning](../workflows/sprint-planning.md)

---

## Tool Stack

| Tool | Mục đích | Ai dùng |
|------|----------|---------|
| **Antigravity IDE** | AI-augmented work — mọi tasks | Toàn team |
| **Lark** | Task management, sprint tracking | Toàn team |
| **Figma** | Design, handoff cho Dev | Designer, BA, Dev FE |
| **Git (GitHub)** | Version control, PR review | Dev FE, Dev BE, Techlead |
| **Telegram** | Communication, notifications | Toàn team |
| **Shopify** | E-commerce platform (Product Personalizer) | Dev FE, Dev BE |

Mỗi tool có guide riêng: setup, daily usage, conventions, agent automation, và troubleshooting.

📖 Chi tiết: [Tool Guides](../tools/README.md)

---

## AI-Augmented Workflow Philosophy

Toàn team dùng **Antigravity IDE** — từ PO draft backlog items, BA phân tích design, Techlead break tasks, đến Dev implement code. AI là công cụ hỗ trợ tăng productivity, **không thay thế tư duy và quyết định của con người**.

Mỗi role có file `GEMINI.md` riêng — chứa skills, workflows, và prompts phù hợp với responsibilities của role đó. Khi clone repo và chạy install script, bạn sẽ nhận được bộ công cụ AI phù hợp với role.

**Quy trình AI-augmented:**
1. Nhận task từ pipeline (qua Lark hoặc Git handoff)
2. AI hỗ trợ phân tích, draft, hoặc implement
3. **Human verify** — kiểm tra output trước khi finalize
4. Handoff cho stage tiếp theo

> ⚠️ **AI-generated output luôn cần human review.** AI draft nhanh, nhưng con người là người quyết định cuối cùng.

---

## Communication Norms

**Telegram** là kênh communication chính của team. Team part-time hoạt động **async-first** — không yêu cầu online cùng lúc, mỗi người làm việc theo thời gian rảnh.

**Conventions:**
- Updates quan trọng (handoff, blockers, questions) → post vào Telegram group chat
- Handoff giữa stages → tag người nhận trên Telegram
- **Lark** cho task tracking formal — status updates, sprint board, meeting notes
- Max 3 rounds feedback trên PR — nếu chưa align → escalate lên sync meeting

---

## Getting Started

Sẵn sàng bắt đầu? Follow các bước dưới đây:

1. 📋 [**First Week Checklist**](first-week-checklist.md) — Setup môi trường và hoàn thành Day 1
2. 🏆 [**First Win Guide**](first-win-guide.md) — Thực hành AI-assisted task đầu tiên theo role

---
*Section: Getting Started · [← Wiki Home](../README.md)*
