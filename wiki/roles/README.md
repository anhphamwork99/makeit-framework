# Roles

Tổng hợp workflow chi tiết cho từng vai trò trong team MakeIt. Mỗi role có trang riêng mô tả responsibilities, quy trình hằng ngày, cách sử dụng AI (Antigravity), handoff points, và templates.

> 📖 **Quy trình tổng thể:** Xem [Team Workflow](../workflows/team-workflow.md) để hiểu end-to-end flow và vị trí của từng role.

---

## All Roles

| Role | Folder | Stage | Key Focus |
|------|--------|-------|-----------|
| [Product Owner](./po/) | `po/` | Stage 1 & 6 | Vision, backlog goals & context, final review authority |
| [Business Analyst](./ba/) | `ba/` | Stage 2 | Story breakdown, Figma analysis, user flow documentation |
| [Tech Lead](./techlead/) | `techlead/` | Stage 3 & 5 | Task breakdown (FE+BE), API contracts, code review, deploy |
| [Frontend Developer](./dev-fe/) | `dev-fe/` | Stage 4 | Component development, Figma-to-code, UI implementation |
| [Backend Developer](./dev-be/) | `dev-be/` | Stage 4 | API development, database conventions, backend patterns |

---

## How to Use

Mỗi role page là **self-contained** — bạn chỉ cần đọc trang của role mình:

1. **Tìm role của bạn** trong bảng trên → click link
2. **Đọc README.md** — workflow chi tiết, responsibilities, AI usage, handoff points
3. **Bookmark templates.md** — copy-paste templates khi cần dùng

### Mỗi role page bao gồm

| Section | Nội dung |
|---------|----------|
| Role Overview | Vị trí trong workflow, input/output, gates |
| Responsibilities | Danh sách trách nhiệm chính |
| Process/Workflow | Quy trình step-by-step hằng ngày |
| Handoff Points | Nhận gì từ ai, giao gì cho ai (Git-based HANDOFF.md) |
| AI Usage | Playbook cụ thể dùng Antigravity cho từng task |
| Templates | Checklists, templates copy-paste-able |

---

## Workflow Overview

```
┌──────────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
│  Stage 1     │    │  Stage 2 │    │  Stage 3 │    │  Stage 4 │    │  Stage 5     │    │  Stage 6     │
│  PO          │───▶│  BA      │───▶│ Techlead │───▶│  FE/BE   │───▶│  TL Code     │───▶│  PO Review   │
└──────────────┘    └──────────┘    └──────────┘    └──────────┘    │  Review      │    └──────────────┘
                                                                    └──────────────┘
```

> 📖 Chi tiết: [Team Workflow](../workflows/team-workflow.md) · [Quality Gates](../reference/quality-gates.md) · [Handoff Format](../reference/handoff-format.md)

---
*Section: Roles · [← Wiki Home](../README.md)*
