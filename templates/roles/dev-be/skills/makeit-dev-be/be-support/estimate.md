---
name: be-estimate
description: BE estimate — assess implementation effort with complexity factors and t-shirt sizing
---

<purpose>
Evaluate implementation effort for task using BE-specific complexity factors — API endpoints, business logic, DB changes, integrations.
</purpose>

<process>
  <step name="identify_scope">
    1. **Task name** + short description
    2. **Scope boundaries** — what's in, what's out
    3. **Known complexities** — known risks upfront
  </step>

  <step name="assess_factors">
    | Factor | Rating (1-5) | Notes |
    |--------|-------------|-------|
    | API endpoints count | [1-5] | [1 endpoint → 5+ endpoints] |
    | Business logic complexity | [1-5] | [CRUD → Complex workflow] |
    | Database changes | [1-5] | [None → New tables + migrations] |
    | External integrations | [1-5] | [None → Multiple APIs] |
    | Error handling complexity | [1-5] | [Standard → Many edge cases] |
    | Testing effort | [1-5] | [Simple → Complex scenarios] |
  </step>

  <step name="provide_estimate">
    | Size | Description | Effort |
    |------|-------------|--------|
    | **S** | 1-2 endpoints, simple CRUD, no migrations | ~0.5-1 day |
    | **M** | 3-4 endpoints, some logic, minor migrations | ~1-2 days |
    | **L** | 5+ endpoints, complex logic, significant DB | ~3-5 days |
    | **XL** | Many endpoints, complex integrations | >5 days |

    > ⚠️ XL → suggest breaking into smaller tasks. Discuss with Techlead.
  </step>

  <step name="output">
    - 📦 Task: [name]
    - 📏 Estimate: [S/M/L/XL]
    - 📊 Rationale: [Key factors]
    - ⚠️ Risks: [Factors that could increase estimate]
  </step>
</process>

<success_criteria>
- [ ] Complexity factors assessed
- [ ] T-shirt estimate provided with rationale
- [ ] Risks identified
</success_criteria>
