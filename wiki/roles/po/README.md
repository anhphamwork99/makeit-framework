# Product Owner (PO)

## Role Overview

Product Owner là người đứng đầu chuỗi giá trị của team MakeIt. PO định hình **vision**, cung cấp **context** cho toàn bộ feature/epic, và là **final authority** trong review process.

**Vị trí trong workflow:**

```
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
│  ★ BẠN ★     │───▶│  BA      │───▶│ Techlead │───▶│  FE/BE   │───▶│  TL Code     │───▶│ ★ PO Review ★│
│  PO          │    │ (Stage 2)│    │ (Stage 3)│    │ (Stage 4)│    │  Review      │    │  (Stage 6)   │
│  (Stage 1)   │    └──────────┘    └──────────┘    └──────────┘    │  (Stage 5)   │    └──────────────┘
└──────────────┘                                                    └──────────────┘
```

> 📖 **Tổng quan quy trình team:** Xem [Team Workflow](../../workflows/team-workflow.md) để hiểu end-to-end flow.

PO tham gia **2 thời điểm** trong workflow:
- **Stage 1** — Chuẩn bị backlog items (đầu vào)
- **Stage 6** — Review kết quả deploy từ TL (đầu ra, final authority)

---

## Responsibilities

### 1. Vision & Strategy
- Xác định **mục tiêu business** cho mỗi feature/epic
- Ưu tiên backlog dựa trên business value và user impact
- Quyết định scope: cái gì build, cái gì không

### 2. Backlog Management
- Tạo backlog items với **goal rõ ràng** và **context đầy đủ** trong Lark
- Set priority và sprint cho mỗi item
- Đảm bảo backlog luôn có đủ items cho 1-2 sprint tiếp

### 3. Context Provider
- Cung cấp background, user needs, constraints cho mỗi feature
- Trả lời câu hỏi clarification từ BA, Techlead, Dev
- Là nguồn truth cho "WHY" — tại sao build feature này

### 4. Final Review Authority
- Approve hoặc reject PRs dựa trên business logic
- Quyền quyết định cuối cùng: approve trực tiếp, yêu cầu Designer verify, hoặc override minor issues
- Tham gia feedback loop tối đa 3 rounds trước khi escalate

---

## Daily Workflow

### Buổi sáng — Check & Respond

1. **Review Telegram notifications** — Xem có ai tag PO không (câu hỏi, PRs cần review)
2. **Check Lark board** — Xem trạng thái các items đang in-progress
3. **Respond to blockers** — Trả lời câu hỏi clarification từ team trong vòng nửa ngày

### Khi chuẩn bị feature mới — Stage 1

1. **Xác định goal** — Viết mục tiêu business rõ ràng (dùng [Backlog Item Template](./templates.md#backlog-item-template))
2. **Cung cấp context** — Background, user needs, constraints, edge cases biết trước
3. **Set priority** — Xếp hạng trong Lark backlog
4. **Coordinate với Designer** — Đảm bảo Designer (nếu có) có đủ thông tin để design
5. **Hoàn thành sprint → Tạo HANDOFF.md** — Commit vào `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md` trong product repo
6. **Notify BA** — Tag BA trên Telegram + BA chạy `/makeit:check-handoff` để pull HANDOFF.md

> ⚠️ **Gate 1:** BA sẽ verify output của bạn theo [Gate 1 checklist](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown). Đảm bảo goal rõ ràng, context đầy đủ, priority đã set.

### Khi review kết quả — Stage 6

Sau khi TL code review (Stage 5) và deploy, PO review kết quả:

1. **Nhận notification** — TL gửi review result qua HANDOFF.md (Mode 2)
2. **Check business logic** — Logic có match specs/goal ban đầu không?
3. **Check acceptance criteria** — Các tiêu chí đã được đáp ứng chưa?
4. **Quyết định:**
   - ✅ **Approve** — Logic đúng, criteria met → done
   - 🔄 **Request changes** — Comment rõ cần sửa gì, reference lại user story hoặc goal
   - ⏭️ **Override minor** — Deadline tight → approve + tạo follow-up task trong Lark

> 📋 **Review checklist:** Sử dụng [PO Review Checklist](./templates.md#po-review-checklist) để không miss items quan trọng.

---

## Handoff Points

### Cơ chế Handoff

Team sử dụng **Git-based HANDOFF.md** làm cơ chế giao tiếp chính giữa các roles:

1. PO hoàn thành sprint → chạy `/makeit:complete` → commit `HANDOFF.md` vào product repo
2. Tag BA trên Telegram → BA chạy `/makeit:check-handoff` → pull và đọc HANDOFF.md

> 📖 **Format chuẩn:** Xem [Handoff Format](../../reference/handoff-format.md)

### PO Delivers (Stage 1 → BA)

| What | Format | Where |
|------|--------|-------|
| Sprint goal + business context | HANDOFF.md | `.makeit/sprint/SPRINT-{NNN}/po/HANDOFF.md` |
| Figma design links | Links trong HANDOFF.md | Product repo (Git) |
| Priority order | Sprint + priority level | Lark task fields |
| Acceptance criteria overview | High-level criteria | HANDOFF.md |

> 🚦 **Quality gate:** BA verify theo [Gate 1 checklist](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown)

### PO Receives (Stage 6 — Review)

| What | From | What PO Checks |
|------|------|----------------|
| Review result + deploy URL | TL (Mode 2) | Business logic matches specs |
| HANDOFF.md từ TL | TL (tl-review/HANDOFF.md) | Review notes, deploy status, known limitations |

> 🚦 **Quality gate:** PO verify theo [Gate 5 checklist](../../reference/quality-gates.md#gate-5-review--done-approved-for-merge)

> 📖 **Pipeline update (Phase 8.1):** Dev FE/BE giờ gửi output cho TL (Stage 5: code review) trước. TL review xong → deploy → gửi kết quả cho PO (Stage 6). PO không nhận trực tiếp từ Dev nữa.

### Feedback Loop

Khi PO phát hiện issue trong review:
1. Comment trên PR — ghi rõ cần sửa gì
2. Author fix → re-request review
3. **Max 3 rounds**, sau đó escalate lên sync meeting

> 📖 Chi tiết iteration protocol: [Team Workflow — Stage 6](../../workflows/team-workflow.md#stage-6-po-review--approval)

---

## AI Usage with Antigravity

PO sử dụng Antigravity IDE cho mọi công việc text-based. Dưới đây là các use cases cụ thể:

### 1. Draft Backlog Items

Dùng Antigravity để soạn nhanh backlog items có cấu trúc:

```
Prompt: "Tôi cần tạo backlog item cho feature [tên feature].
Goal: [mô tả ngắn mục tiêu].
User cần: [nhu cầu user].
Constraints: [giới hạn biết trước].

Hãy giúp tôi viết backlog item theo format: Goal, Context, Constraints, Priority rationale."
```

### 2. Refine Goals & Context

Khi goal còn mơ hồ, nhờ AI challenge:

```
Prompt: "Review backlog item này và đặt 5 câu hỏi clarification mà BA có thể hỏi.
Giúp tôi identify gaps trong context:

[paste backlog item draft]"
```

### 3. Review PRs — Business Logic Check

Dùng AI-assisted review để verify logic:

```
Prompt: "Review PR này dựa trên user story sau:
[paste user story + acceptance criteria]

Kiểm tra:
1. Logic có match acceptance criteria không?
2. Có edge case nào bị miss không?
3. Business flow có đúng specs không?"
```

### 4. Prepare Sprint Items

Batch-prepare backlog cho sprint tiếp:

```
Prompt: "Từ product roadmap item [tên], break thành 2-3 backlog items.
Mỗi item cần: goal rõ ràng, context cho BA, và priority rationale.
Đảm bảo items đủ nhỏ để hoàn thành trong 1 sprint."
```

### ⚠️ AI Verification Rules

| AI Output | Rule |
|-----------|------|
| Specs & plans (backlog items, goals) | **Phải human verify** trước khi share với team |
| PR review suggestions | **PO đọc và đánh giá** — không auto-approve based on AI |

> 💡 **Nguyên tắc:** AI giúp draft nhanh và catch gaps, nhưng **PO luôn là người quyết định cuối cùng**. Không bao giờ gửi AI output trực tiếp cho team mà chưa đọc kỹ.

---

## Quick Reference

| Situation | Action |
|-----------|--------|
| BA hỏi clarification | Trả lời trong vòng nửa ngày qua Telegram |
| Designer cần context để design | Cung cấp goal + constraints + user context |
| PR chờ review | Review business logic + acceptance criteria |
| Conflict giữa design và goal | PO quyết định — goal wins |
| Sau 3 rounds review không align | Escalate lên sync meeting với PO + Designer + BA + Dev |

---

## Related Documents

- [Team Workflow](../../workflows/team-workflow.md) — Quy trình end-to-end của team
- [Quality Gates](../../reference/quality-gates.md) — Checklist tại mỗi handoff point
- [Handoff Format](../../reference/handoff-format.md) — Format chuẩn cho HANDOFF.md
- [PO Templates](./templates.md) — Backlog Item Template + Review Checklist
- [Roles Overview](../README.md) — Tổng quan tất cả roles

---
*Role: Product Owner · [← Roles](../README.md) · [Templates →](./templates.md)*
*Phase: 02 — Role Workflows*
*Last updated: 2026-02-15*
