# Figma MCP Reference (Dev FE)

> Hướng dẫn sử dụng Figma MCP Server cho Dev FE — extract design specs và verify visual accuracy.

---

## Figma MCP Server

**Server URL:** `https://mcp.figma.com/mcp`

Figma MCP cho phép AI truy cập trực tiếp vào Figma designs — không cần manually copy-paste design specs.

---

## Available Tools

| Tool | Mô tả | Khi nào dùng |
|------|--------|-------------|
| `get_design_context` | Fetch structured design data: tokens, specs, layout, component hierarchy | Khi cần extract component specs để implement |
| `get_screenshot` | Capture screenshot của Figma frame/component | Khi cần visual reference để compare UI |
| `get_metadata` | Get design file metadata (lighter than full context) | Khi `get_design_context` response quá lớn |

---

## Use Case 1: Extract Component Specs (implement workflow)

Khi implement component mới, dùng `get_design_context` để extract:

1. **Component structure** — hierarchy, layers, grouping
2. **Design tokens** — colors, typography, spacing, border radius
3. **Layout** — flex direction, alignment, gaps, padding
4. **States** — hover, active, disabled visual properties

**Workflow:**
```
1. Get Figma link từ task/story
2. Call get_design_context(figma_link)
3. Extract tokens → map to code variables
4. Build component structure following Figma hierarchy
5. Apply styles using extracted tokens
```

**Example token mapping:**
| Figma Token | Code Variable |
|-------------|--------------|
| `color/primary/500` | `var(--color-primary-500)` |
| `spacing/md` | `var(--spacing-md)` |
| `font/body/regular` | `var(--font-body-regular)` |

---

## Use Case 2: Visual Comparison (compare-ui workflow)

Khi cần verify UI matches Figma design:

1. **Capture Figma screenshot** — `get_screenshot(figma_frame_link)`
2. **Capture browser screenshot** — chụp implementation
3. **Compare** — visual diff on:
   - ✅ Layout structure (positioning, alignment)
   - ✅ Colors & gradients (exact token values)
   - ✅ Typography (font family, size, weight, line height)
   - ✅ Spacing (padding, margins, gaps)
   - ✅ Border radius & shadows
   - ✅ Icon sizes & colors
4. **Report** — list matches và mismatches

**Workflow:**
```
1. Call get_screenshot(figma_frame) → save reference
2. Build/verify component in browser
3. Capture browser screenshot
4. Compare side-by-side
5. Report: match/mismatch list
6. Fix mismatches hoặc document accepted deviations
```

---

## Best Practices

1. **Always extract tokens, don't hardcode** — Dùng `get_design_context` để lấy exact values
2. **Compare early, compare often** — Chạy `compare-ui` sau mỗi major UI change
3. **Use `get_metadata` first** — Nếu file lớn, check metadata trước khi full context
4. **Document deviations** — Nếu intentionally khác Figma → ghi rõ lý do trong PR
