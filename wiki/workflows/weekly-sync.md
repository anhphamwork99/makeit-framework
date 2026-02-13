# Weekly Sync-up

> **Mục đích:** Họp để cập nhật tiến độ — mỗi người share progress, escalate blockers.

| | Detail |
|---|---|
| **Facilitator** | Tech Lead |
| **Participants** | Cả team (PO, Designer, BA, Techlead, Dev FE, Dev BE) |
| **Format** | Online — Google Meet / Telegram call |
| **Time-box** | Max 15-20 phút |
| **Cadence** | 1 lần/tuần (giữa sprint) |

---

## Async Updates (bổ sung meeting)

Ai xong phần nào sớm → **post lên Telegram** không cần đợi meeting.

**Format async update:**
```
✅ [Tên] — Sprint [N]
- Xong: [Việc đã hoàn thành]
- Tiếp: [Việc tiếp theo]
- Block: [Không có / Mô tả blocker]
```

> 💡 Async updates **bổ sung** cho weekly sync, không thay thế. Meeting vẫn giữ để team align và escalate blockers nhanh.

---

## Trước họp

Mỗi người chuẩn bị **3 điểm** (viết sẵn, không cần soạn lâu):

- [ ] **Đã làm gì** — Tasks hoàn thành từ lần sync trước
- [ ] **Đang làm gì** — Task hiện tại, progress %
- [ ] **Bị block gì** — Blocker cụ thể (hoặc "không có")

## Trong họp

1. **Mỗi người update** (~2-3 phút/người)
   - Đã làm → Đang làm → Bị block
   - Ngắn gọn, đi thẳng vào điểm chính

2. **Techlead ghi nhận blockers** (~3 phút)
   - Assign owner cho mỗi blocker
   - Set deadline giải quyết
   - Escalate nếu cần (tag PO hoặc BA)

3. **PO confirm priorities** (~2 phút)
   - Có thay đổi priority so với planning không?
   - Có item mới cần thêm vào sprint không?

> ⚠️ **Không discuss chi tiết technical trong sync.** Nếu cần deep-dive → book riêng sau meeting.

## Sau họp

- [ ] Techlead **post summary lên Telegram** (dùng template bên dưới)
- [ ] Mỗi blocker có **owner** và **deadline**
- [ ] Nếu priority thay đổi → Techlead update **Lark board**

---

## Meeting Notes Template

```markdown
## 📋 Weekly Sync Notes

**Ngày:** [YYYY-MM-DD]
**Sprint:** [Sprint N]

### Per-person Updates
| Thành viên | Đã làm | Đang làm | Blocked? |
|------------|--------|----------|----------|
| [Tên 1] | [Tasks xong] | [Task hiện tại] | ❌ / ⚠️ [mô tả] |
| [Tên 2] | [Tasks xong] | [Task hiện tại] | ❌ / ⚠️ [mô tả] |

### Blockers
| Blocker | Owner | Deadline | Status |
|---------|-------|----------|--------|
| [Mô tả] | [Ai] | [Khi nào] | 🔴 Open / 🟢 Resolved |

### Priority Changes
- [Thay đổi priority nếu có, hoặc "Không có"]

### Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [Việc cần làm] | [Ai] | [Khi nào] |
```

---

## Related Documents

- [Team Workflow](./team-workflow.md) — Quy trình end-to-end
- [Sprint Refinement](./sprint-refinement.md) — Ceremony clarify requirements
- [Sprint Planning](./sprint-planning.md) — Ceremony phân chia công việc

---
*Ceremony: Weekly Sync-up · [← Workflows](./README.md)*
