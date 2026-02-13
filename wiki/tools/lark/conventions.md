# Lark Conventions

> **Mục đích:** Quy tắc sử dụng Lark hằng ngày — khi nào move task, Messenger channels, @mention rules, notification settings.

---

## Status Transitions — Khi nào move task

Mỗi role có trách nhiệm move task ở thời điểm phù hợp. Không move hộ người khác trừ khi đã trao đổi.

### Transition Rules

| From | To | Ai move | Trigger |
|------|-----|---------|---------|
| — | **Todo** | Techlead | Sau Sprint Planning, assign task cho Dev |
| **Todo** | **In Progress** | Dev | Khi bắt đầu implement task |
| **In Progress** | **Review** | Dev | Khi tạo PR và sẵn sàng review |
| **Review** | **Done** | Reviewer | Khi PR đã approve và merge |
| **Review** | **In Progress** | Dev | Khi reviewer yêu cầu sửa, cần re-work |

### Nguyên tắc

1. **Move ngay, không đợi cuối ngày** — Status phải phản ánh trạng thái thực tại
2. **1 task = 1 owner tại 1 thời điểm** — Ai đang giữ task thì có trách nhiệm move
3. **Comment trước khi move ngược** — Nếu move task từ Review → In Progress, comment lý do
4. **Không skip column** — Không move trực tiếp từ Todo → Review (phải qua In Progress)

---

## Messenger Conventions

### Channel Types

Team MakeIt sử dụng 3 loại channels chính:

| Channel | Mục đích | Ai ở đây | Ví dụ |
|---------|----------|----------|-------|
| **#general** | Thông báo chung, announcements | Cả team | Thông báo nghỉ, link tài liệu |
| **#sprint-current** | Discussion sprint hiện tại | Cả team | "Story X cần clarify", "API contract" |
| **#dev-chat** | Technical discussion | Dev FE, Dev BE, Techlead | Code review, bug discussion |

### Khi nào dùng channel nào

| Tình huống | Channel | Ví dụ message |
|------------|---------|---------------|
| Announce sprint start/end | #general | "Sprint 3 bắt đầu hôm nay" |
| Handoff (BA → TL) | #sprint-current | "Stories Sprint 3 ready, @TL review" |
| Task blocked | #sprint-current | "Task X blocked vì thiếu API contract" |
| Code question | #dev-chat | "Cách handle auth token refresh?" |
| PR ready for review | #sprint-current | "PR #42 ready, @Reviewer please review" |
| General chat, off-topic | Direct Message | — |

### Message Format

Khi gửi message quan trọng (handoff, blocker, update), format rõ ràng:

```
📋 [Loại thông báo]
- Nội dung chính
- Link (nếu có)
@mention (nếu cần ai đó action)
```

**Ví dụ:**

```
📋 Handoff: BA → Techlead
- 4 User Stories Sprint 3 ready for review
- Link Bitable: [link]
@TL xin review trước thứ 4
```

---

## @Mention Rules

### Khi nào tag ai

| Tình huống | Tag ai | Tại sao |
|------------|--------|---------|
| Handoff hoàn tất | Người nhận tiếp theo | Để họ biết input đã sẵn sàng |
| Task bị blocked | Techlead | Techlead quyết định unblock |
| PR ready | Reviewer | Reviewer biết cần review |
| Cần clarify requirement | BA hoặc PO | Là nguồn thông tin |
| Bug critical | Techlead + Dev owner | Cần resolve nhanh |
| General question | Không tag | Ai biết thì trả lời |

### Nguyên tắc @mention

1. **Chỉ tag khi cần action** — Đừng tag nếu chỉ thông báo chung
2. **Tag đúng người** — Không tag @all trừ khi thực sự cần cả team
3. **1 mention = 1 notification** — Tôn trọng attention của người khác
4. **Reply trong thread** — Khi discussion dài, dùng thread thay vì flood channel

---

## Meeting Notes

### Khi nào tạo Meeting Notes

| Meeting | Ai tạo notes | Template |
|---------|-------------|-----------|
| Sprint Refinement | BA | [Refinement Template](../../workflows/sprint-refinement.md) |
| Sprint Planning | Techlead | [Planning Template](../../workflows/sprint-planning.md#meeting-notes-template) |
| Weekly Sync-up | Techlead (hoặc rotate) | [Sync-up Template](../../workflows/sprint-sync.md) |
| Ad-hoc discussion | Ai tổ chức meeting | Free-form |

### Cách tạo Meeting Notes trên Lark Docs

1. Mở **Docs** → Create New Document
2. Đặt tên theo format: `[Meeting Type] — [Date]` (ví dụ: "Sprint Planning — 2026-02-10")
3. Copy template tương ứng vào document
4. Fill nội dung real-time hoặc sau meeting
5. Share link lên **#sprint-current** channel

### Meeting Notes Structure

```markdown
## [Tên Meeting]

**Ngày:** YYYY-MM-DD
**Participants:** [Ai tham gia]
**Facilitator:** [Ai điều hành]

### Agenda
1. [Topic 1]
2. [Topic 2]

### Discussion
- [Key point 1]
- [Key point 2]

### Decisions
- [Decision 1] — đã đồng ý bởi [ai]

### Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [Việc cần làm] | [Ai] | [Khi nào] |
```

---

## Notification Settings

### Recommended Settings

| Category | Desktop | Mobile | Lý do |
|----------|---------|--------|-------|
| **Direct Messages** | ✅ On | ✅ On | Personal → luôn cần biết |
| **@Mentions** | ✅ On | ✅ On | Ai đó cần bạn action |
| **Channel messages** | ✅ On | ⬜ Off | Desktop đủ, mobile quá ồn |
| **Task updates** | ✅ On | ⬜ Off | Quan trọng nhưng không urgent |
| **Bitable changes** | ⬜ Off | ⬜ Off | Quá nhiều noise khi team update |

### Cách cấu hình

1. Mở Lark → Settings → Notifications
2. Thiết lập theo bảng trên
3. Cho từng channel: Right-click → Notification Settings → chọn mức phù hợp

> 💡 **Tip:** Mute channel mà bạn chỉ cần đọc chứ không cần react ngay (ví dụ #general). Unmute channel mà bạn cần respond nhanh (#sprint-current).

---

## File Sharing — Lark Drive

### Tổ chức folders

```
Lark Drive (Team Shared)
├── 📁 Sprint Notes
│   ├── Sprint 1 — Planning.md
│   ├── Sprint 1 — Retro.md
│   └── Sprint 2 — Planning.md
│
├── 📁 Documents
│   ├── Product Requirements
│   └── Technical Specs
│
└── 📁 Templates
    ├── Meeting Notes Template
    └── Sprint Review Template
```

### Quy tắc chia sẻ

1. **Team-wide docs** → Upload lên Lark Drive shared folder
2. **Sprint-specific docs** → Đặt trong folder Sprint tương ứng
3. **Code/design files** → Không upload lên Lark — dùng Git (code) và Figma (design)
4. **Naming convention:** `[Type] — [Description] — [Date]`

---

## Sprint Cadence — Weekly Updates

Mỗi tuần, team sync qua Messenger với format chuẩn:

### Weekly Sync Format

Mỗi thành viên post update lên **#sprint-current** vào đầu tuần:

```
📊 Weekly Update — [Tên]
✅ Tuần trước: [Hoàn thành gì]
🔨 Tuần này: [Làm gì]
🚧 Blockers: [Nếu có] / Không có
```

> 💡 **Async-first:** Team MakeIt ưu tiên async updates qua Messenger. Weekly sync meeting chỉ bổ sung cho async updates, không thay thế.

---

## Summary

| Aspect | Convention |
|--------|-----------|
| **Task status** | Move ngay khi thay đổi, không đợi cuối ngày |
| **Messenger** | 3 channels chính, message format rõ ràng |
| **@Mention** | Chỉ tag khi cần action, reply trong thread |
| **Meeting notes** | Lark Docs, theo template, share link lên channel |
| **Notifications** | On cho mentions + DM, off cho batch updates |
| **File sharing** | Lark Drive cho docs, Git cho code, Figma cho design |
| **Weekly sync** | Async update format trên #sprint-current |

---

## Related Documents

- [Task Board](./task-board.md) — Fields, views, sprint lifecycle
- [Setup Guide](./setup.md) — Tạo account và Bitable
- [Sprint Sync-up](../../workflows/sprint-sync.md) — Weekly meeting runbook
- [Team Workflow](../../workflows/team-workflow.md) — End-to-end process

---
*Conventions: Lark · [← Lark](./README.md)*
