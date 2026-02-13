---
name: be-workflow-create-pr
description: BE PR creation workflow — generate complete PR description with API changes, DB migrations, test results
---

<purpose>
Create complete PR description for backend changes including API endpoint changes, database migrations, testing summary, and BE-specific checklist.
</purpose>

<process>
  <step name="gather_context">
    1. **Diff changes** — `git diff` or `git log --oneline`
    2. **Task specs** + linked user story
    3. **API contract changes** — endpoints added/modified
    4. **Database migration files** — tables/columns changed
    5. **Test results** — unit + integration test pass
  </step>

  <step name="generate_pr">
    Use `@be-lifecycle/templates/pr-description.md`:

    1. **PR title** — conventional format: `feat: [description]`
    2. **Summary** — 2-3 sentences describing changes + rationale
    3. **API Endpoints Changed:**

    | Method | Path | Change Type | Description |
    |--------|------|-------------|-------------|
    | [verb] | /api/v1/[resource] | [New/Modified] | [Description] |

    4. **Database Changes:**

    | Migration | Description | Reversible |
    |-----------|-------------|------------|
    | [name] | [What it does] | ✅/❌ |

    5. **Testing Done:**

    | Type | Coverage | Notes |
    |------|----------|-------|
    | Unit tests | [N tests] | [Scenarios] |
    | Integration | [N tests] | [Endpoints] |

    6. **Checklists** (general + BE-specific + AI review)
  </step>
</process>
