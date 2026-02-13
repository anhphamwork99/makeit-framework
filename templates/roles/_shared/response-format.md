# MakeIt Response Output Standard

> Mọi response từ AI agent trong MakeIt framework phải tuân theo format này.
> Mục tiêu: nhất quán, dễ scan, dễ action.

---

## Response Structure

Mỗi response từ Agent bao gồm tối đa **5 sections** (4 bắt buộc + 1 tùy ngữ cảnh):

### 1. 💭 Reasoning

```
## 💭 Reasoning
[Agent's thinking process — tại sao chọn approach này, đã cân nhắc gì]
```

**Khi nào cần chi tiết:**
- Khi deviate từ standard approach
- Khi có trade-off cần giải thích
- Khi có nhiều options và cần justify lựa chọn

**Khi nào có thể ngắn gọn:**
- Standard execution, không có gì bất thường

### 2. 📋 Summary

```
## 📋 Summary
- [Outcome 1]
- [Outcome 2]
- [Outcome 3]
```

**Rules:**
- Luôn có — không bao giờ bỏ qua
- Tối đa **5 bullet points**
- Mỗi bullet = 1 dòng, rõ ràng
- Ưu tiên: kết quả > chi tiết kỹ thuật

### 3. 📄 Deliverable

```
## 📄 Deliverable
- `path/to/file.md` — Created
- `path/to/another.ts` — Modified (thêm validation)
[Hoặc: inline content nếu không cần tạo file]
```

**Rules:**
- Luôn có
- Nếu tạo/sửa files: list paths + action (Created/Modified/Deleted)
- Nếu output là content inline: show trực tiếp trong section này
- Nếu output dài: save to file, show summary ở đây

### 4. ➡️ Next Steps

```
## ➡️ Next Steps
1. [Action item 1]
2. [Action item 2]
3. Chạy `/makeit:{next-command}` để tiếp tục
```

**Rules:**
- Luôn có
- 1-3 action items cụ thể
- Gợi ý `/makeit:` command phù hợp nếu có
- Không vague ("review if needed") — phải specific ("review user stories in TASK-003.md")

### 5. 💬 Communication *(khi cần)*

```
## 💬 Communication
[Auto-generated Telegram/Lark message — ready to copy-paste]
```

**Khi nào include:**
- Handoff cho role khác (dùng Handoff template)
- Cần clarification từ teammate (dùng Clarification template)
- PR ready for review (dùng PR Review template)

**Khi nào KHÔNG include:**
- Task nội bộ, không cần communication
- Step trung gian chưa cần handoff

---

## When to Include Each Section

| Section | Include? | Condition |
|---------|----------|-----------|
| 💭 Reasoning | **Luôn có** | Chi tiết khi deviate, ngắn gọn khi standard |
| 📋 Summary | **Luôn có** | Max 5 bullets |
| 📄 Deliverable | **Luôn có** | Files created HOẶC inline content |
| ➡️ Next Steps | **Luôn có** | Gợi ý next `/makeit:` command |
| 💬 Communication | **Khi cần** | Handoff, clarification, hoặc PR review |

---

## Language Rules

| Context | Language | Example |
|---------|----------|---------|
| Response body | **Tiếng Việt** là chính | "Đã tạo component LoginForm..." |
| Technical terms | **English** — giữ nguyên | component, API, endpoint, quality gate, handoff |
| Code / commands | **English** | `/makeit:self-review`, `npm run build` |
| Communication templates | **Tiếng Việt hoặc English** | Tùy team preference (configurable) |

**Ví dụ tốt:**
> "Đã implement LoginForm component theo Figma specs. Cần clarify edge case khi user submit form trống — đã tạo message template bên dưới."

**Ví dụ xấu:**
> "Đã cài đặt thành phần đăng nhập theo thiết kế. Cần hỏi thêm về trường hợp biên."
> *(Dịch technical terms → mất nghĩa)*
