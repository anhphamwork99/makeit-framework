# Figma Analysis: [Screen/Feature Name]

## Metadata

- **Figma Link:** [URL to Figma frame/page]
- **Feature:** [Feature name]
- **Date:** [YYYY-MM-DD]
- **Analyzed by:** BA
- **MCP Tools Used:** `get_design_context`, `get_screenshot`

## Screens Identified

| # | Screen Name | Purpose | Figma Frame |
|---|-------------|---------|-------------|
| 1 | [Screen name] | [Mục đích screen] | [Frame ID/link] |
| 2 | [Screen name] | [Mục đích screen] | [Frame ID/link] |

## UI Components

| Component | Type | States | Data Required |
|-----------|------|--------|---------------|
| [Component name] | [Button/Input/Card/...] | [default, hover, active, disabled, error, loading] | [Data fields needed] |
| [Component name] | [Type] | [States] | [Data] |

## Interaction States

### [Screen 1 Name]

| Element | Default | Hover | Active | Disabled | Error | Empty | Loading |
|---------|---------|-------|--------|----------|-------|-------|---------|
| [Element] | ✅ | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] | [✅/❌/N/A] |

## Data Requirements

| Component/Screen | Data Field | Source | Required? | Validation |
|-----------------|------------|--------|-----------|------------|
| [Component] | [Field name] | [API endpoint / local state] | [Yes/No] | [Rules] |

## Flow Transitions

```
[Screen A] ──(action)──▶ [Screen B] ──(action)──▶ [Screen C]
                │
                └──(error)──▶ [Error State]
```

## Edge Cases from Design

| # | Observation | Impact | Story Implication |
|---|------------|--------|-------------------|
| 1 | [Design observation — empty state not shown] | [Risk] | [Need to define behavior] |
| 2 | [Observation — error state missing for X] | [Risk] | [Add to AC] |

## Screenshots Captured

| # | Screen | Screenshot | Notes |
|---|--------|------------|-------|
| 1 | [Screen name] | [Captured via get_screenshot] | [Key observations] |
