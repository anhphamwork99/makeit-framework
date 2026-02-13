# Git trong MakeIt Workflow

## Tổng quan

Git là hệ thống quản lý phiên bản (version control) mà team MakeIt sử dụng để theo dõi thay đổi code, phối hợp làm việc giữa các thành viên, và đảm bảo chất lượng qua quy trình review. Team sử dụng **GitHub** làm nền tảng lưu trữ repository.

### Git giải quyết 3 vấn đề chính

| Vấn đề | Git giải quyết như thế nào |
|--------|---------------------------|
| **Nhiều người cùng sửa code** | Mỗi người làm việc trên branch riêng, merge khi hoàn thành |
| **Cần review trước khi deploy** | Pull Request (PR) bắt buộc review trước khi merge vào main |
| **Rollback khi có lỗi** | Mỗi commit lưu lại snapshot, có thể quay lại bất kỳ thời điểm nào |

---

## Vai trò Git trong 5-Stage Pipeline

Team MakeIt vận hành theo [5-stage pipeline](../../workflows/team-workflow.md). Git tham gia xuyên suốt nhưng **đặc biệt quan trọng** ở Stage 4 (Implementation) và Stage 5 (Review).

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
│ Stage 1  │    │ Stage 2  │    │ Stage 3  │    │  Stage 4     │    │  Stage 5     │
│ Design/  │───▶│ BA Story │───▶│ Techlead │───▶│  FE/BE       │───▶│  Review &    │
│ PO       │    │ Breakdown│    │ Task     │    │  Implement   │    │  Feedback    │
└──────────┘    └──────────┘    └──────────┘    └──────────────┘    └──────────────┘
                                                  🔧 Git heavy        🔍 Git heavy
                                                  - Create branch     - PR review
                                                  - Commit code       - Approve/merge
                                                  - Push & create PR  - Resolve feedback
```

### Git ở từng stage

| Stage | Ai dùng Git | Làm gì |
|-------|------------|--------|
| Stage 1 — Design/PO | Ít dùng | PO có thể update docs trong wiki |
| Stage 2 — BA | Ít dùng | BA commit user stories nếu dùng Git-based handoff |
| Stage 3 — Techlead | Trung bình | Techlead commit task breakdowns, API contracts |
| Stage 4 — Dev FE/BE | **Nhiều nhất** | Tạo branch, commit code, push, tạo Pull Request |
| Stage 5 — Review | **Nhiều** | Review Pull Request, approve, merge vào main |

---

## Mục lục hướng dẫn

| Trang | Nội dung | Dành cho ai |
|-------|---------|-------------|
| [Setup lần đầu](setup.md) | Cài đặt Git, SSH key, clone repo | Thành viên mới |
| [Branching Strategy](branching.md) | Quy tắc đặt tên branch, workflow tạo branch | Dev FE/BE, Techlead |
| [Pull Request & Review](pr-review.md) | Tạo Pull Request, quy trình review, checklist | Tất cả roles |
| [Automation](automation.md) | Agent tự động làm gì vs Bạn cần làm gì | Tất cả roles |
| [Troubleshooting](troubleshooting.md) | Xử lý lỗi thường gặp với Git | Tất cả roles |

---

## Conventions nhanh

Team MakeIt tuân theo các conventions đã được define trong [Coding Standards](../../reference/coding-standards.md):

- **4 loại branch:** `feat/`, `fix/`, `docs/`, `chore/`
- **Branch format:** `{type}/TASK-{id}-short-desc`
- **Commit format:** `{type}: description` hoặc `{type}(scope): description`
- **Pull Request:** Sử dụng PR template có sẵn trên GitHub
- **Review:** Bắt buộc có AI Review Checklist (Output Verification + Context Completeness)

> 📖 Chi tiết đầy đủ: [Coding Standards](../../reference/coding-standards.md)

---

## Bắt đầu từ đâu?

**Nếu bạn mới tham gia team:**
1. Đọc trang này để hiểu tổng quan
2. Làm theo [Setup lần đầu](setup.md) để cài đặt
3. Đọc [Branching Strategy](branching.md) khi bắt đầu code

**Nếu bạn đã setup xong:**
- Xem [Pull Request & Review](pr-review.md) trước khi tạo Pull Request đầu tiên
- Xem [Automation](automation.md) để hiểu Agent tự động hóa phần nào
- Tra cứu [Troubleshooting](troubleshooting.md) khi gặp vấn đề

---

*Thuộc Phase 6: Tool Guides*
*Cập nhật: 2026-02-13*
