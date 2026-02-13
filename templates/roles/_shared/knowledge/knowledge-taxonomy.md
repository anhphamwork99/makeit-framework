# Knowledge Document Taxonomy

Reference document listing all document types in the Product Memory System.
Use this to determine the correct type, prefix, and category when creating knowledge documents.

---

## Document Types by Category

### Architecture (Techlead owned)

Documents about system design decisions, structure, and module organization.

| Doc Type | Prefix | File Pattern | Owner | When to Create |
|----------|--------|-------------|-------|----------------|
| Architecture Decision Record | `adr-` | `adr-{NNN}-{kebab-title}.md` | Techlead | When making significant architecture/technology decisions |
| System Map | `system-map` | `system-map.md` | Techlead | When system architecture needs visual documentation |
| Module Registry | `module-` | `module-{NNN}-{kebab-title}.md` | Techlead | When adding a new module/service to the system |

**Examples:**
- `adr-001-auth-strategy.md` — Decision to use Shopify App Bridge tokens
- `adr-002-database-choice.md` — Why PostgreSQL over MongoDB
- `system-map.md` — Overall system architecture diagram
- `module-001-payment-processing.md` — Payment module boundaries and API

### Business (PO, BA owned)

Documents about domain knowledge, business rules, user journeys, and feature evolution.

| Doc Type | Prefix | File Pattern | Owner | When to Create |
|----------|--------|-------------|-------|----------------|
| Domain Glossary | `glossary` | `glossary.md` | PO, BA | Once per project, updated as domain terms emerge |
| Business Rule | `rule-` | `rule-{NNN}-{kebab-title}.md` | BA | When business logic needs explicit documentation |
| User Journey | `journey-` | `journey-{NNN}-{kebab-title}.md` | BA | When documenting end-to-end user flows |
| Feature Evolution | `feature-` | `feature-{NNN}-{kebab-title}.md` | PO | When tracking how a feature changes over time |

**Examples:**
- `glossary.md` — Domain terms: "merchant", "storefront", "metafield"
- `rule-001-subscription-logic.md` — Tier limits and billing rules
- `rule-002-refund-policy.md` — Conditions and process for refunds
- `journey-001-first-purchase.md` — New customer buying flow
- `feature-001-product-personalizer.md` — Evolution of personalization feature

### Technical (Dev FE, Dev BE owned)

Documents about API contracts, data schemas, integration points, and component architecture.

| Doc Type | Prefix | File Pattern | Owner | When to Create |
|----------|--------|-------------|-------|----------------|
| API Contract | `api-` | `api-{NNN}-{kebab-title}.md` | Dev BE | When creating or significantly changing API endpoints |
| Data Schema | `schema-` | `schema-{NNN}-{kebab-title}.md` | Dev BE | When adding/modifying database tables or models |
| Integration Point | `integration-` | `integration-{NNN}-{kebab-title}.md` | Dev BE | When integrating with external services |
| Frontend Component Map | `component-` | `component-{NNN}-{kebab-title}.md` | Dev FE | When documenting complex component trees |

**Examples:**
- `api-001-products-endpoint.md` — Products CRUD endpoint contract
- `api-002-auth-endpoints.md` — Login/logout/refresh token endpoints
- `schema-001-users-table.md` — Users table with relationships
- `schema-002-orders-table.md` — Orders table and constraints
- `integration-001-shopify-admin-api.md` — Shopify Admin API usage
- `component-001-product-editor.md` — Product editor component tree

### Operational (All roles)

Documents about lessons learned, established patterns, tech debt, and known issues.

| Doc Type | Prefix | File Pattern | Owner | When to Create |
|----------|--------|-------------|-------|----------------|
| Lesson Learned | `lesson-` | `lesson-{NNN}-{kebab-title}.md` | All | After encountering and resolving significant issues |
| Pattern Library Entry | `pattern-` | `pattern-{NNN}-{kebab-title}.md` | Techlead | When establishing reusable code/process patterns |
| Tech Debt Item | `debt-` | `debt-{NNN}-{kebab-title}.md` | Techlead | When identifying technical debt worth tracking |
| Known Issue | `issue-` | `issue-{NNN}-{kebab-title}.md` | All | When documenting known but deferred issues |

**Examples:**
- `lesson-001-n-plus-one.md` — N+1 query found and fixed in products API
- `lesson-002-csp-inline-styles.md` — CSP violations from inline styles
- `pattern-001-error-handling.md` — Standard error handling approach
- `pattern-002-api-pagination.md` — Cursor-based pagination pattern
- `debt-001-legacy-migration.md` — Old API v1 needs deprecation
- `issue-001-slow-bulk-import.md` — Bulk import takes >30s for 1000 items

---

## Summary Table

| Category | Doc Types | Count | Primary Owners |
|----------|-----------|-------|----------------|
| Architecture | ADR, System Map, Module Registry | 3 | Techlead |
| Business | Glossary, Business Rule, User Journey, Feature Evolution | 4 | PO, BA |
| Technical | API Contract, Data Schema, Integration Point, Component Map | 4 | Dev FE, Dev BE |
| Operational | Lesson Learned, Pattern Library, Tech Debt, Known Issue | 4 | All |
| **Total** | | **15** | |

---

## Getting Started

**Start with these two types — highest ROI, easiest to produce:**

### 1. Architecture Decision Records (ADRs) — Start here

ADRs capture the "WHY" behind technical decisions. They prevent repeated debates and help new team members understand context.

**When:** After any significant architecture/technology decision
**Effort:** 15-30 minutes per ADR
**Value:** Prevents hours of re-discussion, gives AI agents full context

### 2. Lessons Learned — Add these next

Lessons capture mistakes and solutions. They prevent the team from repeating the same errors.

**When:** After resolving any non-trivial bug or issue
**Effort:** 10-20 minutes per lesson
**Value:** Prevents repeated mistakes, builds institutional knowledge

### After that, grow organically

Other document types should emerge naturally from sprint work:
- **API Contracts** — when Dev BE creates new endpoints
- **Business Rules** — when BA documents complex business logic
- **Patterns** — when Techlead establishes reusable approaches

> 💡 **Tip:** Don't try to backfill everything. Create docs as sprints produce them.
> The `/makeit:create-doc` command (coming in Phase 4.9) will make this easy.

---

## Naming Convention

```
{type}-{NNN}-{kebab-title}.md
```

| Part | Description | Example |
|------|-------------|---------|
| `{type}` | Document type prefix from tables above | `adr`, `lesson`, `api` |
| `{NNN}` | Sequential number (zero-padded to 3 digits) | `001`, `012`, `100` |
| `{kebab-title}` | Lowercase, hyphen-separated title | `auth-strategy` |

**Special cases (singleton docs):**
- `glossary.md` — No number needed (one per project)
- `system-map.md` — No number needed (one per project)

**Numbering is per-type:** `adr-001`, `adr-002` is separate from `lesson-001`, `lesson-002`.
