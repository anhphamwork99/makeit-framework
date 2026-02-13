# Handoff Format Standard

> Tài liệu quy định format chuẩn cho tất cả handoff documents trong MakeIt AI Team.
> Mọi role PHẢI tuân thủ format này khi hoàn thành sprint và bàn giao cho role tiếp theo.

## Cơ chế Handoff

Team sử dụng **Git-based HANDOFF.md** — commit vào product repo tại `.makeit/sprint/SPRINT-{NNN}/{role}/HANDOFF.md`:

```
.makeit/sprint/SPRINT-{NNN}/
├── po/HANDOFF.md      ← PO → BA
├── ba/HANDOFF.md      ← BA → TL
├── tl/HANDOFF.md      ← TL → FE/BE
├── fe/HANDOFF.md      ← FE → Review
└── be/HANDOFF.md      ← BE → Review
```

### Flow:

1. **Sender** hoàn thành sprint → chạy `/makeit:complete` → tạo HANDOFF.md → `git commit` + `git push`
2. **Sender** tag receiver trên Telegram (notification only)
3. **Receiver** chạy `/makeit:check-handoff` → `git pull` → đọc HANDOFF.md → bắt đầu sprint

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
| 2 | **Deliverables Summary** | Danh sách deliverables đã tạo (tên, status, path/link) |
| 3 | **Key Decisions Made** | Các quyết định ảnh hưởng downstream work |
| 4 | **Open Questions** | Items chưa resolve, cần receiver xử lý |
| 5 | **Next Steps** | Hành động cụ thể cho receiver |

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

### FE/BE → Review Handoff

| Data | Mô tả |
|------|--------|
| PR Link | Pull request URL |
| Test Results Summary | Tests passed/failed/skipped |
| Implementation Notes | Key decisions trong implementation |
| Known Limitations | Những gì chưa cover, tech debt |
| Self-Review Evidence | Checklist đã tự review |
| Screenshots (FE) | Visual evidence so sánh Figma vs Implementation |

## Lark Integration

Handoff được tạo trong Git. Lark Sprint Issue chứa **link đến HANDOFF.md**, không paste nội dung:

- HANDOFF.md trỏ đến Lark issue link (reference)
- Lark issue comment chứa path đến HANDOFF.md trong repo

> 💡 Lark link is included IN the HANDOFF.md as reference — no need to paste content to Lark.

## Related

- Template: `@_shared/skills/makeit-shared/templates/HANDOFF-TEMPLATE.md`
- Quality Gates: [quality-gates.md](./quality-gates.md)
- Team Workflow: [team-workflow.md](../workflows/team-workflow.md)

---
*Reference: Handoff Format Standard*
*Last updated: 2026-02-13*
