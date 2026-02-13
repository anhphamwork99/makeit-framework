# Figma MCP Tools Reference (BA)

> Reference cho BA khi sử dụng **Figma MCP Server** để analyze design screens.

---

## Available Tools

### `get_design_context`

**Purpose:** Extract structured design data từ Figma frame — components, styles, layout, tokens.

**When to use:**
- Khi nhận design specs "Ready for Dev" từ Designer
- Khi cần phân tích chi tiết UI components và interaction states
- Trước khi bắt đầu document user flow hoặc viết stories

**What to look for:**
- **Components:** Tên, type, nested structure
- **Styles:** Colors, typography, spacing (design tokens)
- **Layout:** Auto-layout settings, constraints, responsive behavior
- **States:** Hover, active, disabled, error, empty, loading variants
- **Text content:** Copy/labels — check if finalized

**Usage:**
```
Dùng get_design_context trên Figma frame [link/name].
Cần extract: components, interaction states, data requirements.
```

### `get_screenshot`

**Purpose:** Capture visual reference cho screen/flow — dùng để attach vào stories.

**When to use:**
- Sau khi analyze design context — capture visual evidence
- Khi document user flow — attach screenshots cho từng step
- Khi viết stories — attach design reference

**Usage:**
```
Capture screenshot cho Figma frame [link/name] ở scale 2x.
```

### `get_metadata`

**Purpose:** Get high-level metadata khi `get_design_context` response quá lớn.

**When to use:**
- Khi design file phức tạp, nhiều frames
- Khi chỉ cần overview ban đầu trước khi deep-dive

---

## Example Workflow

BA phân tích design cho feature mới:

1. **Select frame** — User cung cấp Figma link hoặc frame name
2. **`get_design_context`** — Extract components, styles, interaction states
3. **Analyze** — Identify:
   - Tất cả screens trong feature
   - UI components + states cho mỗi screen
   - Data requirements per component
   - Flow transitions giữa screens
   - Edge cases từ design (missing states, unclear interactions)
4. **`get_screenshot`** — Capture visual reference cho từng screen
5. **Document** — Fill `@ba-execution/templates/figma-analysis.md` với findings
6. **Proceed** — Dùng analysis để document user flow → viết stories

---

## Important Notes

- **Luôn dùng `get_design_context` trước khi viết stories** — không dựa trên memory hay description
- **Check interaction states** — Designer phải define hover, active, disabled, error, empty, loading. Nếu thiếu → fail Gate 1
- **Extract edge cases từ design** — Empty states, error states, loading states thường visible trong design
- **Không hardcode design values** — Extract từ Figma qua MCP, không copy-paste pixel values
