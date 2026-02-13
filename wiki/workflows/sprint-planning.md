# Sprint Planning

> **Mục đích:** Họp để phân chia công việc — Techlead break tasks, Dev estimate, team align assignments.

| | Detail |
|---|---|
| **Facilitator** | Tech Lead |
| **Participants** | Cả team (PO, Designer, BA, Techlead, Dev FE, Dev BE) |
| **Format** | Online — Google Meet / Telegram call |
| **Time-box** | ~45 phút |
| **Cadence** | Đầu sprint (sau Sprint Refinement) |

---

## Trước họp — Techlead chuẩn bị

- [ ] Review **refined backlog** — đọc lại items đã clarify trong Refinement
- [ ] Pre-break stories thành **draft FE + BE tasks** (để meeting nhanh hơn)
- [ ] Check **Lark board** — carry-over tasks từ sprint trước?
- [ ] Chuẩn bị meeting link và gửi **Telegram reminder**

## Trong họp

1. **Techlead recap** (~5 phút)
   - Sprint goals (từ Refinement)
   - Carry-over tasks (nếu có)

2. **Task breakdown + review** (~25 phút)
   - Techlead trình bày draft task breakdown cho từng story
   - **Review cùng Dev** — Dev góp ý, điều chỉnh scope
   - Define API contracts nếu FE/BE cần coordinate

3. **Estimation** (~10 phút)
   - **Dev tự estimate** bằng **giờ (hours)**
   - Techlead confirm — nếu lệch nhiều thì discuss
   - **Capacity:** linh hoạt, sprint nào biết sprint đó (ai rảnh nhận thêm)

4. **Assign tasks** (~5 phút)
   - Dev tự pick hoặc Techlead suggest
   - Update assignments trên **Lark board**

> 💡 **Estimation flow:** Dev estimate → Techlead confirm. Không phải Techlead estimate rồi inform.

## Sau họp

- [ ] Techlead **update Lark board** — tasks, assignments, estimates
- [ ] Dev **confirm tasks trên Telegram** — reply "đã nhận" hoặc raise concerns
- [ ] Techlead post **summary lên Telegram** (dùng template bên dưới)

---

## Meeting Notes Template

```markdown
## 📋 Sprint Planning Notes

**Ngày:** [YYYY-MM-DD]
**Sprint:** [Sprint N]
**Capacity:** [Ghi chú capacity team sprint này]

### Stories → Tasks
| Story | Task | Type | Assignee | Estimate |
|-------|------|------|----------|----------|
| [User story 1] | [Task 1a] | FE | [Ai] | [X giờ] |
| [User story 1] | [Task 1b] | BE | [Ai] | [X giờ] |
| [User story 2] | [Task 2a] | FE | [Ai] | [X giờ] |

### Total Estimates
- FE: [X giờ] | BE: [X giờ] | Total: [X giờ]

### Blockers
- [Blocker 1 — owner: [ai], deadline: [khi nào]]

### Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [Việc cần làm] | [Ai] | [Khi nào] |
```

---

## Related Documents

- [Team Workflow](./team-workflow.md) — Quy trình end-to-end
- [Techlead Role](../roles/techlead/README.md) — Chi tiết vai trò Techlead
- [Coding Standards](../reference/coding-standards.md) — Conventions cho Dev
- [Sprint Refinement](./sprint-refinement.md) — Ceremony trước Planning

---
*Ceremony: Sprint Planning · [← Workflows](./README.md)*
