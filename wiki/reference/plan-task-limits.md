# Plan Task Limits per Role

## Why Different Limits?

Each role has different task granularity based on the nature of their work:

| Role | Limit | Rationale |
|------|-------|-----------| 
| PO | 3-5 tasks | Conceptual work — each task = 1 backlog item or goal |
| BA | 3-5 tasks | Analytical work — each task = 1 story or flow |
| TL | 3-5 tasks | Planning work — each task = 1 solution design or task breakdown |
| FE | max 3 tasks | Component-based — each task = 1 component or screen |
| BE | 3-7 tasks | Layer-based — natural 6-layer ordering needs more granular tasks |

## BE Layer Ordering (why 3-7)

BE implementation follows a natural layer ordering where each layer builds on the previous:

1. API contract design
2. Schema design
3. Model/entity creation
4. Database migrations
5. Service layer
6. Controller/routes
7. Tests + API docs

Each layer = 1 atomic commit. This natural ordering produces 3-7 tasks depending on feature complexity. Simple CRUDs may only need 3 tasks (schema + service + controller), while complex features touch all 7 layers.

## FE Component Pattern (why max 3)

FE tasks are larger in scope but fewer in number:

1. **Component implementation** — includes styles, states, responsive behavior
2. **State management + API integration** — connects component to data layer
3. **Polish + interaction states** — hover, active, disabled, error, loading

Each component task encompasses multiple files (component, styles, tests, stories) but represents one logical unit. Splitting further fragments the component context and reduces cohesion.

## Key Principle

> **1 task = 1 atomic commit = 1 logical unit of work**

The limit difference is by design, not inconsistency. It reflects how each role naturally decomposes work.
