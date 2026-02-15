# PO Templates

Copy-paste các templates dưới đây khi cần. Điền vào các phần `[...]` theo context cụ thể.

---

## Backlog Item Template

Dùng template này khi tạo backlog item mới trong Lark:

```markdown
## [Tên Feature / Epic]

### Goal
[Mô tả mục tiêu business — 1-2 câu rõ ràng]
Ví dụ: "Cho phép customer preview sản phẩm đã personalize trước khi add to cart, giúp tăng conversion rate."

### Context
**Background:** [Tại sao feature này quan trọng, context business]
**User Need:** [User cần gì, pain point hiện tại]
**Target User:** [Ai sẽ dùng feature này]

### Constraints
- [Giới hạn kỹ thuật — ví dụ: phải work trên Shopify embedded app]
- [Giới hạn thời gian — ví dụ: cần ship trong sprint này]
- [Giới hạn khác — ví dụ: phải tương thích với flow hiện tại]

### Priority Rationale
**Priority:** [High / Medium / Low]
**Sprint:** [Sprint number]
**Why this priority:** [Lý do xếp hạng — business impact, user demand, urgency]

### References
- Figma: [link nếu có]
- Related items: [link backlog items liên quan]
```

---

## PO Review Checklist

Dùng checklist này khi review kết quả deploy ở Stage 6. Copy vào comment hoặc dùng như mental checklist:

```markdown
### PO Review — Business Logic Check

**Feature:** [tên feature / user story reference]

#### Business Logic
- [ ] Logic implementation match goal ban đầu của backlog item
- [ ] Acceptance criteria trong user story đều được đáp ứng
- [ ] Edge cases đã documented được handle đúng

#### User Experience
- [ ] Flow phù hợp với user need đã mô tả
- [ ] Không có behavior bất ngờ từ góc nhìn user

#### Scope
- [ ] Không có scope creep — chỉ implement những gì đã plan
- [ ] Không thiếu phần nào so với specs

#### Decision
- [ ] **APPROVE** — Merge ready
- [ ] **REQUEST CHANGES** — Ghi comment cụ thể bên dưới
- [ ] **OVERRIDE** — Accept minor issues + tạo follow-up task

**Notes:** [Ghi chú nếu có, reference user story hoặc design]
```

---

## Sprint Preparation Checklist

Dùng khi chuẩn bị backlog cho sprint tiếp:

```markdown
### Sprint [N] Preparation

- [ ] Đã review và prioritize tất cả items trong backlog
- [ ] Top items có goal rõ ràng và context đầy đủ
- [ ] Designer đã được brief về features cần design
- [ ] Có đủ items cho sprint capacity của team
- [ ] Dependencies giữa các items đã identified
- [ ] Items sẵn sàng cho BA breakdown (Gate 1 ready)
```

---

> 📖 **Quay lại:** [PO Workflow](./README.md) · [← Roles](../README.md)

---
*Role: Product Owner — Templates*
*Phase: 02 — Role Workflows*
*Last updated: 2026-02-10*
