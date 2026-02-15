# Handoff Format Standard

> Tài liệu quy định format chuẩn cho tất cả handoff documents trong MakeIt AI Team.
> Mọi role PHẢI tuân thủ format này khi hoàn thành sprint và bàn giao cho role tiếp theo.

## Cơ chế Handoff

Team sử dụng **Git-based HANDOFF.md** — commit vào product repo tại `.makeit/sprint/SPRINT-{NNN}/{role}/HANDOFF.md`:

```
.makeit/sprint/SPRINT-{NNN}/
├── po/HANDOFF.md      ← PO → BA
├── ba/HANDOFF.md      ← BA → TL
├── tl/HANDOFF.md      ← TL → FE/BE (Mode 1)
├── fe/HANDOFF.md      ← FE → TL (code review)
├── be/HANDOFF.md      ← BE → TL (code review)
└── tl-review/HANDOFF.md  ← TL → PO (Mode 2, review result)
```

### Flow:

1. **Sender** hoàn thành sprint → chạy `/makeit:complete` → tạo HANDOFF.md + Lark Tasks → `git commit` + `git push`
2. **Sender** tag receiver trên Telegram (notification only)
3. **Receiver** chạy `/makeit:check-handoff` → `git pull` → xem preview handoff
4. **Receiver** chạy `/makeit:start-my-tasks` → chọn tasks → tạo workspace → bắt đầu sprint

> 💡 **Telegram = notification. Git = content.** Nội dung handoff luôn nằm trong Git, không paste vào Telegram hay Lark.

## Nguyên tắc

1. **Actionable** — Receiver đọc handoff phải có thể bắt đầu ngay, không cần hỏi lại
2. **Traceable** — Mọi deliverable có link/path cụ thể
3. **Routing document** — HANDOFF.md trỏ đến files, KHÔNG inline nội dung deliverables
4. **Consistent** — Tất cả roles dùng cùng template cơ bản

## Template

Sử dụng shared template: `@_shared/skills/makeit-shared/templates/HANDOFF-TEMPLATE.md`

Mỗi role có template riêng tại: `@{role}-lifecycle/templates/handoff.md`

## Universal Sections (tất cả roles)

Mọi handoff document bắt buộc có 5 sections sau:

| # | Section | Mô tả |
|---|---------|--------|
| 1 | **Sprint Goal** | Mục tiêu sprint — trích từ SPECS.md |
| 2 | **What I've Done** | Danh sách deliverables đã tạo (tên, status, path/link) |
| 3 | **Key Decisions Made** | Các quyết định ảnh hưởng downstream work |
| 4 | **Tasks For Receiver** | Tasks cụ thể cho receiver, với Lark Task IDs |
| 5 | **Shared Context** | Context chung cần biết (constraints, assumptions, open items) |

## Role-Specific Sections

Ngoài 5 sections chung, mỗi handoff direction có thêm data riêng:

### PO → BA Handoff

| Data | Mô tả |
|------|--------|
| Sprint Goal + Business Context | Why we're building this, PO intent |
| Figma Design Links | Screens marked "Ready for Dev" |
| Business KPIs / Success Metrics | Cách đo thành công |
| Priority Order | Thứ tự ưu tiên features |
| Acceptance Criteria Overview | High-level criteria từ PO perspective |

### BA → Techlead Handoff

| Data | Mô tả |
|------|--------|
| User Stories List | Stories with Lark issue links |
| Acceptance Criteria Summary | AC cho từng story |
| Edge Cases Documented | Các trường hợp đặc biệt đã phân tích |
| User Flow References | Flow diagrams / flow documents |
| Figma References per Story | Design links mapped to stories |

### TL → Dev FE Handoff (section `## For FE`)

| Data | Mô tả |
|------|--------|
| FE Task List | Tasks with Lark issue links, priority, size |
| Figma Links per Task | Design reference cho từng task |
| API Contracts | Endpoints FE cần consume (if BE dependent) |
| Component Breakdown | Suggested component structure |
| Interaction States | States cần handle (hover, disabled, loading...) |
| Responsive Requirements | Breakpoint requirements |

### TL → Dev BE Handoff (section `## For BE`)

| Data | Mô tả |
|------|--------|
| BE Task List | Tasks with Lark issue links, priority, size |
| API Contracts to Implement | Endpoint specs (request/response) |
| Schema Changes | Database migrations cần tạo |
| Security Requirements | Auth, authz, validation rules |
| Integration Points | External services, 3rd party APIs |

### FE/BE → TL Handoff (code review)

| Data | Mô tả |
|------|--------|
| PR Link | Pull request URL |
| Test Results Summary | Tests passed/failed/skipped |
| Implementation Notes | Key decisions trong implementation |
| Known Limitations | Những gì chưa cover, tech debt |
| Self-Review Evidence | Checklist đã tự review |
| Screenshots (FE) | Visual evidence so sánh Figma vs Implementation |

### TL → PO Handoff (review result)

| Data | Mô tả |
|------|--------|
| Code Review Result | Approve/Request Changes + comment summary |
| Deploy Status | URL của deployed version |
| Test Summary | Functional tests, e2e results |
| Demo Checklist | Steps để PO verify features |

## Lark Task Integration

Khi `/makeit:complete` được chạy, sender tự động:

1. **Tạo Lark Tasks** cho mỗi deliverable trong section "Tasks For Receiver"
2. **Gán Lark Task IDs** vào HANDOFF.md (task table)
3. **Receiver** chạy `/makeit:start-my-tasks` → query Lark Tasks → chọn tasks assigned cho mình

> 💡 Lark Tasks là **source of truth** cho task assignment và tracking. HANDOFF.md chỉ chứa IDs để reference.

## Scope Changes After Handoff

| Command | Who | Purpose |
|---------|-----|---------|
| `/makeit:update-scope` | Sender | Cập nhật scope tasks sau khi handoff (thêm/xóa/sửa tasks) |
| `/makeit:sync-scope` | Receiver | Pull scope changes từ sender về workspace của mình |

> ⚠️ Chỉ **sender** mới được dùng `update-scope`. Receiver chỉ dùng `sync-scope` để pull changes.

## Related

- Template: `@_shared/skills/makeit-shared/templates/HANDOFF-TEMPLATE.md`
- Quality Gates: [quality-gates.md](./quality-gates.md)
- Team Workflow: [team-workflow.md](../workflows/team-workflow.md)

---
*Reference: Handoff Format Standard*
*Last updated: 2026-02-15*
