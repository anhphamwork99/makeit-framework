# BA Templates

Templates sẵn sàng copy-paste cho Business Analyst. Copy template → fill in → done.

---

## User Story Template

```markdown
### [STORY-ID] [Tên ngắn gọn]

**As a** [role/persona],
**I want** [action/feature],
**So that** [benefit/value].

#### Acceptance Criteria

- [ ] [Specific, checkable criterion 1]
- [ ] [Specific, checkable criterion 2]
- [ ] [Specific, checkable criterion 3]
- [ ] [Edge case criterion nếu có]

#### References

- **PO Goal:** [Link/reference đến PO backlog item]
- **Figma Design:** [Figma link đến screens liên quan]
- **User Flow:** [Link đến user flow document nếu có]

#### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| [Empty state] | [System response] |
| [Error case] | [Error message/handling] |
| [Boundary condition] | [System response] |

#### Notes

- [Clarification từ PO/Designer nếu có]
- [Technical consideration nếu biết]
```

### Ví dụ sử dụng

```markdown
### US-042 Login với email

**As a** registered user,
**I want** đăng nhập bằng email và password,
**So that** tôi có thể truy cập tài khoản cá nhân.

#### Acceptance Criteria

- [ ] User nhập email + password → click Login → chuyển đến Dashboard
- [ ] Email format validation (hiện error nếu format sai)
- [ ] Password sai → hiện error message "Email hoặc password không đúng"
- [ ] Sau 5 lần sai → lock account 15 phút

#### References

- **PO Goal:** LARK-123 — User authentication for personalized experience
- **Figma Design:** https://figma.com/file/xxx/login-screen
- **User Flow:** See user-flow-authentication.md

#### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Email chưa đăng ký | Error: "Email không tồn tại" |
| Account bị lock | Error: "Tài khoản bị khóa, thử lại sau 15 phút" |
| Empty fields | Disable Login button, hiện inline validation |
| Password có special chars | Accept bình thường |
```

---

## Spec Verification Checklist

Checklist BA dùng **trước khi** bắt đầu story breakdown. Cross-check với [Gate 1](../../reference/quality-gates.md#gate-1-designpo--ba-design--backlog-ready-for-story-breakdown).

```markdown
## Spec Verification — [Feature/Epic Name]

**Date:** [YYYY-MM-DD]
**PO Backlog Item:** [Lark link]
**Figma File:** [Figma link]

### Design Output Check

- [ ] Screens marked "Ready for Dev" trong Figma
- [ ] Interaction states defined (hover, active, disabled, error, empty, loading)
- [ ] Design tokens consistent với design system
- [ ] Copy/text finalized (không còn placeholder)

### PO Backlog Check

- [ ] Goal rõ ràng — PO mô tả rõ mục tiêu business
- [ ] Context đầy đủ — background, user needs, constraints
- [ ] Priority + sprint xác định trong Lark

### Verdict

- [ ] ✅ **PASS** — Bắt đầu story breakdown
- [ ] ❌ **FAIL** — Cần bổ sung (ghi chi tiết bên dưới)

### Items cần bổ sung (nếu FAIL)

| Item | Cần từ ai | Đã tag? | Status |
|------|-----------|---------|--------|
| [Mô tả item thiếu] | PO / Designer | ☐ | Pending |
```

---

## User Flow Documentation Template

> 🔑 **BA sở hữu user flow documentation.** Template này dùng để document flow từ Figma analysis + PO context.

```markdown
## User Flow: [Tên Feature/Flow]

**Feature:** [Tên feature]
**Date:** [YYYY-MM-DD]
**Related Stories:** [Story IDs]
**Figma Screens:** [Figma link]

### Entry Point

User bắt đầu từ: [screen/action/URL cụ thể]
Preconditions: [user đã login, có data X, etc.]

### Happy Path

1. User [action 1] → System [response 1]
2. User [action 2] → System [response 2]
3. User [action 3] → System [response 3]
4. **Result:** [Outcome mong đợi]

### Alternative Paths

**Path A: [Tên scenario]**
- Trigger: [Điều kiện rẽ nhánh]
- Flow: [Steps khác happy path]
- Result: [Outcome]

**Path B: [Tên scenario]**
- Trigger: [Điều kiện rẽ nhánh]
- Flow: [Steps khác happy path]
- Result: [Outcome]

### Edge Cases

| # | Scenario | Trigger | Expected Behavior |
|---|----------|---------|-------------------|
| 1 | Empty state | [Khi nào xảy ra] | [System hiện gì] |
| 2 | Error state | [Khi nào xảy ra] | [Error message/handling] |
| 3 | Max limit | [Boundary condition] | [System response] |

### Error Handling

| Error | Trigger | User sees | Recovery |
|-------|---------|-----------|----------|
| [Tên error] | [Khi nào] | [Message/UI] | [User có thể làm gì] |

### Notes

- [Clarification từ PO/Designer]
- [Assumptions cần confirm]
```

---

*Templates: Business Analyst · [← BA Workflow](./README.md) · [← Roles](../README.md)*
