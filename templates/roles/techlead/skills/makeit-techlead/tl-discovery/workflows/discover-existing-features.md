---
name: discover-existing-features
description: Discover and document existing features that will be modified or extended in the current sprint
---

# Existing Feature Discovery

## When to Use

When sprint involves **modifying or extending existing features** (not greenfield). Skipping discovery leads to:
- Missed breaking changes
- Underestimated effort
- Rework from unexpected dependencies

## Process

### 1. Identify Affected Features

- Parse BA stories for feature references (keywords, module names)
- Search codebase for related modules, routes, components
- Ask: *"What existing behavior does this story change?"*

Output: list of affected features with confidence level (certain/likely/possible).

### 2. Map Current Implementation

For each affected feature, document:

| Aspect | What to Map |
|--------|------------|
| **Entry points** | Routes (FE), API endpoints (BE), navigation paths |
| **Data flow** | API → Service → Repository → Database |
| **UI components** | Component tree, shared components, state management |
| **Test coverage** | Existing tests, coverage gaps |
| **Dependencies** | Libraries, external services, shared utilities |

### 3. Assess Impact

For each modification:

| Question | Answer |
|----------|--------|
| New build vs. modification? | % new code vs. existing code changes |
| Breaking change risk? | High / Medium / Low — who is affected |
| Migration needed? | DB migration, data transformation, API versioning |
| Rollback strategy? | Feature flag, API version, DB rollback |

### 4. Document in CODEBASE-SNAPSHOT.md

Add **"Existing Features Analysis"** section to the sprint's CODEBASE-SNAPSHOT.md:

```markdown
## Existing Features Analysis

### [Feature Name]
- **Current state:** [Brief description of current behavior]
- **Proposed change:** [What BA story requires]
- **Entry points:** [Routes/endpoints affected]
- **Impact level:** High / Medium / Low
- **Breaking changes:** [List or "None"]
- **Migration:** [Required / Not required] — [details if required]
- **Risk notes:** [Anything unexpected]
```

## Output

- Section in `CODEBASE-SNAPSHOT.md`: "Existing Features Analysis"
- Integration with task breakdown — tasks reference existing features
- Risk assessment informs estimation (higher complexity for modifications)

## Integration with Other Workflows

- **break-tasks** — use discovery data to identify modification vs. creation tasks
- **design-solution** — existing architecture informs solution design
- **estimate** — modification complexity adjusts effort scores
