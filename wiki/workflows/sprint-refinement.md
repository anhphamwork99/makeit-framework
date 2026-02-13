# Sprint Refinement

> **Mục đích:** Họp để hiểu rõ việc sắp làm — PO trình bày goals, team clarify requirements.

| | Detail |
|---|---|
| **Facilitator** | Product Owner (PO) |
| **Participants** | Cả team (PO, Designer, BA, Techlead, Dev FE, Dev BE) |
| **Format** | Online — Google Meet / Telegram call |
| **Time-box** | ~30 phút |
| **Cadence** | Đầu sprint (trước Sprint Planning) |

---

## Trước họp — PO chuẩn bị

- [ ] Xác định **sprint goals** — 1-2 mục tiêu rõ ràng cho sprint tới
- [ ] Chuẩn bị backlog items cần discuss (goal + context đã viết trong Lark)
- [ ] Attach **Figma links** cho items có design sẵn
- [ ] Gửi agenda lên **Telegram** trước ít nhất 2 giờ để team đọc trước
- [ ] Tag Designer confirm design nào đã "Ready for Dev"

## Trong họp

1. **PO mở đầu** (~5 phút)
   - Recap sprint trước (đã xong gì, còn gì carry-over)
   - Trình bày sprint goals — WHY cần build

2. **PO presents backlog items** (~15 phút)
   - Từng item: goal → context → constraints
   - Designer bổ sung design updates nếu có
   - BA hỏi clarification → ghi lại câu trả lời

3. **Team thảo luận** (~10 phút)
   - Techlead raise technical concerns
   - Dev hỏi feasibility questions
   - BA confirm đủ thông tin để break stories

> ⚠️ **Không estimate trong Refinement.** Estimation thuộc về Sprint Planning.

## Sau họp

- [ ] PO đảm bảo backlog items đã update theo discussion
- [ ] BA bắt đầu **story breakdown** cho items đã clarify
- [ ] Techlead bắt đầu suy nghĩ technical approach
- [ ] PO post **summary lên Telegram** (dùng template bên dưới)

---

## Meeting Notes Template

```markdown
## 📋 Sprint Refinement Notes

**Ngày:** [YYYY-MM-DD]
**Sprint:** [Sprint N]
**Participants:** [Danh sách tên]

### Sprint Goals
- [ ] Goal 1: [mô tả]
- [ ] Goal 2: [mô tả]

### Items Discussed
| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | [Tên item] | ✅ Clear / ❓ Cần clarify | [Ghi chú] |
| 2 | [Tên item] | ✅ Clear / ❓ Cần clarify | [Ghi chú] |

### Decisions
- [Quyết định 1]
- [Quyết định 2]

### Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [Việc cần làm] | [Ai] | [Khi nào] |

### Questions / Unknowns
- [Câu hỏi chưa trả lời được]
```

---

## Related Documents

- [Team Workflow](./team-workflow.md) — Quy trình end-to-end
- [PO Role](../roles/po/README.md) — Chi tiết vai trò PO
- [Sprint Planning](./sprint-planning.md) — Ceremony tiếp theo sau Refinement

---
*Ceremony: Sprint Refinement · [← Workflows](./README.md)*
