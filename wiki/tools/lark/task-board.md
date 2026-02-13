# Lark Task Board

> **Mục đích:** Hướng dẫn cài đặt và sử dụng Sprint Board trên Bitable — columns, fields, views, và sprint lifecycle.

---

## Board Overview

Sprint Board là nơi quản lý tất cả tasks trong mỗi sprint. Board sử dụng **Bitable** (tính năng database của Lark) với 4 columns chính theo workflow:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│              │    │              │    │              │    │              │
│    Todo      │───▶│ In Progress  │───▶│   Review     │───▶│    Done      │
│              │    │              │    │              │    │              │
│  Tasks sẵn   │    │  Đang làm    │    │  Chờ review  │    │  Hoàn thành  │
│  sàng pick   │    │              │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### Column Definitions

| Column | Mô tả | Ai move vào đây |
|--------|--------|------------------|
| **Todo** | Tasks đã assign, sẵn sàng bắt đầu | Techlead assign sau Sprint Planning |
| **In Progress** | Đang được implement | Dev tự move khi bắt đầu làm |
| **Review** | Code xong, đang chờ review | Dev move khi tạo PR |
| **Done** | Đã review, đã merge | Reviewer move sau khi approve |

> 💡 **Quy tắc:** Chỉ người đang thực hiện mới move task. Không move hộ người khác trừ khi đã trao đổi.

---

## Standard Fields per Issue Type

Mỗi loại issue trên Lark Bitable có bộ fields riêng. Đây là bộ fields đầy đủ cho từng loại:

### Sprint Issue (PO tạo)

Sprint Issue đại diện cho 1 sprint — chứa Sprint Goal và thông tin timeline.

| Field | Type | Required | Mô tả | Ví dụ |
|-------|------|----------|--------|-------|
| **Title** | Text | ✅ | Tên sprint | "Sprint 3: User Authentication" |
| **Type** | Single Select | ✅ | Loại issue | "Sprint Issue" |
| **Sprint Goal** | Long Text | ✅ | Mục tiêu business | "User đăng nhập, đăng ký, quên MK" |
| **Start Date** | Date | ✅ | Ngày bắt đầu | 2026-02-10 |
| **End Date** | Date | ✅ | Ngày kết thúc | 2026-02-24 |
| **Status** | Single Select | ✅ | Trạng thái sprint | Planning / Active / Complete |
| **Priority** | Single Select | ⬜ | Mức ưu tiên sprint | High / Medium / Low |
| **Notes** | Long Text | ⬜ | Ghi chú thêm | Context, constraints |

### User Story (BA tạo)

User Story là yêu cầu từ góc nhìn người dùng — BA tạo sau khi phân tích PO Goal + Design.

| Field | Type | Required | Mô tả | Ví dụ |
|-------|------|----------|--------|-------|
| **Title** | Text | ✅ | Tên story (format chuẩn) | "User đăng nhập bằng email" |
| **Type** | Single Select | ✅ | Loại issue | "User Story" |
| **Status** | Single Select | ✅ | Trạng thái | Todo / In Progress / Review / Done |
| **Priority** | Single Select | ✅ | Mức ưu tiên | High / Medium / Low |
| **Sprint** | Single Select | ✅ | Thuộc sprint nào | "Sprint 3" |
| **Acceptance Criteria** | Long Text | ✅ | Tiêu chí chấp nhận (≥3) | "Given... When... Then..." |
| **Figma Link** | URL | ✅ | Link design screens | https://figma.com/file/... |
| **Assignee** | Person | ⬜ | BA phụ trách | Chọn member |
| **PO Goal Reference** | Text | ⬜ | Goal gốc từ PO | "Sprint Goal: Authentication" |
| **Edge Cases** | Long Text | ⬜ | Scenarios đặc biệt | "Email không hợp lệ, locked account" |

### Tech Task (Techlead tạo)

Tech Task là task kỹ thuật — Techlead break từ User Story thành FE hoặc BE tasks.

| Field | Type | Required | Mô tả | Ví dụ |
|-------|------|----------|--------|-------|
| **Title** | Text | ✅ | Tên task kỹ thuật | "[FE] Login form + validation" |
| **Type** | Single Select | ✅ | Loại issue | "Tech Task" |
| **Status** | Single Select | ✅ | Trạng thái | Todo / In Progress / Review / Done |
| **Assignee** | Person | ✅ | Dev phụ trách | Chọn member |
| **Sprint** | Single Select | ✅ | Thuộc sprint nào | "Sprint 3" |
| **Story Reference** | Text/Link | ✅ | Link tới User Story gốc | "User đăng nhập bằng email" |
| **Estimated Hours** | Number | ✅ | Estimate effort | 4 (giờ) |
| **Task Type** | Single Select | ✅ | FE hay BE | FE / BE / Full-stack |
| **Priority** | Single Select | ⬜ | Mức ưu tiên | High / Medium / Low |
| **Technical Notes** | Long Text | ⬜ | Ghi chú kỹ thuật | "API endpoint: POST /auth/login" |
| **API Contract** | Long Text | ⬜ | Contract nếu FE/BE coordinate | Request/Response schema |

---

## Views

Bitable cho phép tạo nhiều views — mỗi view phục vụ mục đích khác nhau:

### Board View (Kanban) — Primary

Dùng hằng ngày để xem task flow.

- **Group by:** Status (Todo → In Progress → Review → Done)
- **Filter:** Sprint = current sprint
- **Color coding:** Task Type (FE = xanh, BE = tím)

```
Board View — Sprint 3
┌─────────────────────────────────────────────────────────┐
│  Todo (3)    │ In Progress (2)│ Review (1)  │ Done (4) │
│──────────────│────────────────│─────────────│──────────│
│ [FE] Search  │ [BE] Auth API  │ [FE] Login  │ [BE] DB  │
│ [BE] Cache   │ [FE] Register  │             │ [FE] Nav │
│ [FE] Profile │                │             │ [BE] JWT │
│              │                │             │ [FE] UI  │
└─────────────────────────────────────────────────────────┘
```

### List View — cho filtering và sorting

Dùng khi cần filter, sort, hoặc export data.

- **Columns hiện:** Title, Type, Status, Assignee, Sprint, Priority
- **Sort:** Priority (High → Low), sau đó Status
- **Filter presets:**
  - "My Tasks" — Assignee = mình
  - "Current Sprint" — Sprint = sprint hiện tại
  - "Blocked" — Status = Blocked (nếu có)

### Calendar View — cho timeline

Dùng khi cần xem tasks theo ngày, đặc biệt Sprint Issues.

- **Date field:** Start Date — End Date
- **Group by:** Sprint
- **Dùng cho:** Sprint timeline overview, deadline tracking

---

## Sprint Lifecycle trên Board

Mỗi sprint đi qua 4 phases trên board:

### Phase 1: Sprint Planning

```
Who: Techlead + Dev
What: Tạo Tech Tasks từ User Stories
Board: Tasks xuất hiện ở column "Todo"
```

1. Techlead tạo Tech Tasks trên Bitable
2. Assign cho Dev FE/BE
3. Dev confirm nhận tasks
4. Board hiện tất cả tasks ở **Todo**

### Phase 2: Sprint Execution

```
Who: Dev FE + Dev BE  
What: Implement tasks
Board: Tasks move Todo → In Progress → Review
```

1. Dev pick task → move sang **In Progress**
2. Dev implement → tạo PR → move sang **Review**
3. Nếu task bị block → comment trên Bitable + tag Techlead

### Phase 3: Sprint Review

```
Who: Reviewer + Designer + PO
What: Review PRs, verify implementation
Board: Tasks move Review → Done (hoặc quay lại In Progress)
```

1. Reviewer review PR
2. Nếu approve → merge → move task sang **Done**
3. Nếu cần sửa → comment → Dev fix → re-review

### Phase 4: Sprint Retrospective

```
Who: Cả team
What: Review sprint, rút kinh nghiệm
Board: Tất cả tasks ở "Done" (lý tưởng)
```

1. Check: bao nhiêu tasks Done vs bao nhiêu carry-over
2. Carry-over tasks giữ nguyên status, đẩy sang sprint mới
3. Archive sprint view

---

## Board Flow Diagram

```
                    Sprint Planning
                         │
                         ▼
              ┌─────────────────────┐
              │                     │
              │      📋 Todo        │ ← Techlead tạo tasks
              │                     │
              └─────────┬───────────┘
                        │
                Dev pick task
                        │
                        ▼
              ┌─────────────────────┐
              │                     │
              │   🔨 In Progress    │ ← Dev đang implement
              │                     │
              └─────────┬───────────┘
                        │
               Dev tạo PR
                        │
                        ▼
              ┌─────────────────────┐
              │                     │        ┌──── Needs fixes ────┐
              │   👀 Review         │ ───────│                     │
              │                     │        │  Back to            │
              └─────────┬───────────┘        │  In Progress        │
                        │                    └─────────────────────┘
               Approved + Merged
                        │
                        ▼
              ┌─────────────────────┐
              │                     │
              │      ✅ Done        │ ← Feature shipped
              │                     │
              └─────────────────────┘
```

---

## Tips sử dụng Board

1. **Filter by "My Tasks"** — Bookmark filter Assignee = mình để nhanh chóng thấy việc cần làm
2. **Không tạo task riêng lẻ** — Mọi tasks phải link tới User Story (truy vết ngược được)
3. **Update status kịp thời** — Move task ngay khi bắt đầu/xong, không đợi cuối ngày
4. **Comment trên task** — Nếu bị block hoặc cần thêm thông tin, comment trực tiếp trên Bitable record thay vì Messenger
5. **Sprint carry-over** — Nếu task chưa xong hết sprint, giữ status hiện tại và đẩy sang sprint mới

---

## Related Documents

- [Setup Guide](./setup.md) — Cách tạo Sprint Board từ đầu
- [Conventions](./conventions.md) — Quy tắc sử dụng hằng ngày
- [Sprint Planning](../../workflows/sprint-planning.md) — Ceremony phân chia tasks
- [Team Workflow](../../workflows/team-workflow.md) — Quy trình 5 stages

---
*Task Board: Lark · [← Lark](./README.md)*
