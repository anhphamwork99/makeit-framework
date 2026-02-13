# Config Template — .makeit/config.md

> Được tạo bởi `install.sh` hoặc `/makeit:init`.
> Agent đọc file này để biết role, sprint hiện tại, và task number tiếp theo.

---

## Template

```markdown
---
role: {role}              # po | ba | designer | techlead | dev-fe | dev-be
team: MakeIt              # Team name — fixed
sprint: Sprint {N}        # Current sprint (update mỗi đầu sprint)
lark-board: "{url}"       # Link tới Lark board/project
next-task-number: 1       # Auto-increment — agent tăng sau mỗi task mới
---
```

## Field Descriptions

| Field | Set By | Description |
|-------|--------|-------------|
| `role` | `install.sh` | Role được chọn khi install — determines skills/workflows |
| `team` | `install.sh` | Team name, mặc định `MakeIt` |
| `sprint` | User / `/makeit:init` | Sprint hiện tại, update mỗi đầu sprint mới |
| `lark-board` | User / `/makeit:init` | URL tới Lark project board |
| `next-task-number` | Agent (auto) | Tăng tự động mỗi khi tạo task mới (TASK-001 → TASK-002...) |
