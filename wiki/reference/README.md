# Reference

Tập hợp các chuẩn mực, quy ước, và protocols mà team MakeIt tuân theo. Đây là nơi bạn tìm câu trả lời cho "Cách đúng để làm việc X là gì?".

Mọi thành viên nên đọc qua section này ít nhất một lần. Sau đó, quay lại bất cứ khi nào cần tra cứu conventions trước khi tạo PR, review code, hoặc handoff công việc.

## When to Use This Section

- **Khi tạo Pull Request** → Kiểm tra coding standards và commit format
- **Khi review code** → Tra cứu AI review checklist và PR template
- **Khi handoff công việc** → Xem quality gates và handoff format
- **Khi sửa GEMINI.md** → Đọc shared resource protocol
- **Khi không chắc convention** → Tra cứu branch naming, file naming rules
- **Khi design API** → Xem API contract conventions
- **Khi FE↔BE cần phối hợp** → Xem FE-BE coordination protocol

## Contents

| Document | Description | Status |
|----------|-------------|--------|
| [coding-standards.md](./coding-standards.md) | Branch naming, commit format, PR template, AI review checklist | ✅ Ready |
| [quality-gates.md](./quality-gates.md) | Checklists cho 5 handoff points: Design/PO→BA, BA→TL, TL→Dev, Dev→Review, Review→Done | ✅ Ready |
| [shared-resources.md](./shared-resources.md) | Protocol quản lý GEMINI.md chung: PR-based changes, conflict resolution | ✅ Ready |
| [api-contract-convention.md](./api-contract-convention.md) | Quy ước API contract: request/response schema, error format, versioning | ✅ Ready |
| [fe-be-coordination.md](./fe-be-coordination.md) | Protocol phối hợp Frontend ↔ Backend: shared types, mock data, integration flow | ✅ Ready |
| [handoff-format.md](./handoff-format.md) | Chuẩn format cho HANDOFF.md — Git-based handoff giữa các roles | ✅ Ready |
| [lifecycle-types.md](./lifecycle-types.md) | Các loại lifecycle trong framework: sprint, phase, task states | ✅ Ready |
| [plan-task-limits.md](./plan-task-limits.md) | Giới hạn tasks per plan, context budget rules cho AI execution | ✅ Ready |

## Quick Start

> **Đọc đầu tiên:** `coding-standards.md` — đây là tài liệu bạn sẽ reference nhiều nhất trong công việc hằng ngày.

## How These Documents Connect

```
coding-standards.md ──→ Áp dụng khi viết code, tạo branch, commit
        │
        ▼
quality-gates.md ────→ Checklist kiểm tra trước mỗi handoff
        │
        ▼
handoff-format.md ───→ Format chuẩn cho HANDOFF.md khi chuyển giao
        │
        ▼
shared-resources.md ─→ Protocol khi sửa shared files (GEMINI.md)
```

```
api-contract-convention.md ──→ Quy ước API design
        │
        ▼
fe-be-coordination.md ──────→ FE↔BE integration workflow
```

Các documents bổ trợ lẫn nhau: follow coding standards khi làm việc, dùng quality gates khi handoff, tuân theo shared resource protocol khi cập nhật configs chung, và follow API conventions khi FE↔BE coordinate.

---
*Section: Reference · [← Wiki Home](../README.md)*
