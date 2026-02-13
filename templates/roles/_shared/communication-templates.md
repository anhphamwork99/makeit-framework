# Communication Templates

> Agent tự động generate các message templates này khi chạy handoff, clarification, hoặc PR review workflows.
> User chỉ cần **copy message → paste vào Telegram/Lark** — không cần chỉnh sửa.

---

## 1. Handoff Notification

Dùng khi hoàn thành task và chuyển deliverable cho role tiếp theo.

### Template

```
📦 Handoff: [Feature name]

From: [Role] → To: [Role]
Task: [LARK-ID]

✅ Deliverable: [What was delivered]
📎 Links: [Figma / Lark / PR]
⚠️ Notes: [Key things receiver should know]

Action needed: [What receiver should do next]
```

### Example

```
📦 Handoff: Login Screen

From: BA → To: Techlead
Task: LARK-1234

✅ Deliverable: 5 user stories với acceptance criteria
📎 Links: https://lark.suite.com/task/1234
⚠️ Notes:
- Social login chưa có design → chỉ email/password
- Edge case: user quên password có flow riêng (story 5)

Action needed: Review stories → break thành FE/BE tasks
```

### Triggered By

- `/makeit:handoff`
- Bất kỳ workflow nào kết thúc stage và cần chuyển cho role tiếp

---

## 2. Clarification Request

Dùng khi cần thông tin thêm từ teammate để tiếp tục task.

### Template

```
❓ Clarification needed: [Feature name]

From: [Role] → To: [Role]
Task: [LARK-ID]

Question:
[Specific question — 1-2 câu rõ ràng]

Context:
[Why this matters / what's blocked]

Prefer response by: [deadline if any]
```

### Example

```
❓ Clarification needed: Login Screen

From: Dev FE → To: Techlead
Task: LARK-1234

Question:
API endpoint `/auth/login` trả về token ở header hay body? API contract chưa specify.

Context:
Đang implement login form, cần biết để handle response correctly. Blocked ở step 4/6.

Prefer response by: Chiều nay (15:00)
```

### Triggered By

- `/makeit:clarify`
- Khi agent detect missing info trong Quality Gate Check

---

## 3. PR Review Request

Dùng khi PR đã ready và cần review từ team.

### Template

```
🔍 PR Review: [PR title]

PR: [GitHub link]
Task: [LARK-ID]
Type: [FE UI / BE API / both]

Changes:
- [Summary of changes — 2-4 bullets]

Reviewer needed: [Techlead / Designer / PO]
```

### Example

```
🔍 PR Review: feat: login form implementation

PR: https://github.com/makeit/app/pull/42
Task: LARK-1234
Type: FE UI

Changes:
- LoginForm component với email/password fields
- Form validation (react-hook-form)
- API integration với /auth/login endpoint
- Responsive layout (mobile-first)

Reviewer needed: Techlead (code) + Designer (UI match)
```

### Triggered By

- `/makeit:create-pr`
- `/makeit:handoff` khi deliverable là PR

---

## Usage Notes

1. **Auto-generate, not manual:** Agent tạo message tự động dựa trên task context — user không cần type
2. **Copy-paste ready:** Message đã format sẵn cho Telegram/Lark — copy nguyên block
3. **Consistent format:** Mọi người trong team đều nhận message cùng structure → dễ scan, dễ action
4. **Embedded in response:** Message templates xuất hiện trong section `💬 Communication` của response format
