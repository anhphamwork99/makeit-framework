# Dev FE Templates

Templates copy-paste cho Frontend Developer. Copy template → điền thông tin → dùng trong workflow.

---

## Component Development Checklist

Sử dụng trước khi coi component là "done":

```markdown
## Component: [Tên Component]

### Structure
- [ ] Component có props interface rõ ràng (TypeScript)
- [ ] Props có default values hợp lý
- [ ] Component tách biệt logic/presentation (custom hook nếu cần)
- [ ] File naming đúng convention: PascalCase cho component, camelCase cho hooks

### Styling
- [ ] Sử dụng design tokens (colors, typography, spacing) — không hardcode values
- [ ] Responsive: hoạt động đúng trên tất cả breakpoints
- [ ] CSS/styles không leak ra ngoài component scope

### States
- [ ] Default state
- [ ] Hover state
- [ ] Active/pressed state
- [ ] Disabled state
- [ ] Loading state (nếu applicable)
- [ ] Empty state (nếu applicable)
- [ ] Error state (nếu applicable)

### Accessibility
- [ ] Semantic HTML (button, input, nav, etc. — không dùng div cho tất cả)
- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] ARIA labels cho interactive elements (nếu cần)
- [ ] Focus visible styles

### Quality
- [ ] Không có console errors/warnings
- [ ] No hardcoded text (dùng props hoặc constants)
- [ ] Component render đúng khi nhận edge case data (null, undefined, empty array)
```

---

## PR Checklist for UI Changes

Sử dụng khi tạo PR có thay đổi giao diện:

```markdown
## PR Checklist — Frontend

### Visual
- [ ] Screenshot/video attached cho mỗi UI change
- [ ] UI matches Figma design (pixel-level check cho major components)
- [ ] Colors, typography, spacing đúng design tokens
- [ ] Icons/images đúng và đúng size

### Interaction States
- [ ] Hover states hoạt động đúng
- [ ] Active/pressed states hoạt động đúng
- [ ] Disabled states hiển thị đúng và không interactive
- [ ] Loading states hiển thị đúng (skeleton, spinner, etc.)
- [ ] Error states hiển thị đúng với error messages
- [ ] Empty states hiển thị đúng

### Responsive
- [ ] Mobile breakpoint: hoạt động và đẹp
- [ ] Tablet breakpoint: hoạt động và đẹp
- [ ] Desktop breakpoint: hoạt động và đẹp
- [ ] No horizontal scroll ở bất kỳ breakpoint nào
- [ ] Touch targets đủ lớn trên mobile (min 44x44px)

### Performance
- [ ] Không import library lớn không cần thiết
- [ ] Images optimized (format, size, lazy loading)
- [ ] No unnecessary re-renders (check React DevTools Profiler)
- [ ] Bundle size check — new dependencies size hợp lý

### Integration
- [ ] API integration hoạt động đúng (nếu có)
- [ ] Error handling cho API calls (network error, server error)
- [ ] State management đúng (không duplicate state, sync đúng)
- [ ] Route navigation hoạt động đúng (nếu có)

### Standards
- [ ] Code follows [Coding Standards](../../reference/coding-standards.md)
- [ ] AI Review Checklist completed
- [ ] Self-reviewed diff
- [ ] Lark task linked
```

---

*Templates cho: Frontend Developer · [← Dev FE Workflow](./README.md)*
