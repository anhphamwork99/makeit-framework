# Codebase Snapshot

> Auto-generated during `/makeit:clarify` — reusable across all phases in this sprint.
> Only re-run if sprint scope changes significantly.

**Sprint:** SPRINT-{NNN}
**Generated:** {date}
**Role:** Dev BE

---

## Project Structure

<!-- Directory tree summary — key folders and their purpose -->

```
{project-root}/
├── src/
│   ├── controllers/    ← API route handlers
│   ├── services/       ← Business logic layer
│   ├── models/         ← ORM models / entities
│   ├── middleware/      ← Auth, validation, error handling
│   ├── routes/         ← Route definitions
│   ├── utils/          ← Shared utilities
│   └── config/         ← Configuration files
├── migrations/         ← Database migration files
├── tests/
│   ├── unit/           ← Unit tests
│   └── integration/    ← Integration / API tests
├── docs/               ← API documentation
└── ...
```

## Tech Stack

<!-- Framework, language, runtime, key dependencies -->

| Category | Value |
|----------|-------|
| Language | |
| Framework | |
| Runtime | |
| Package Manager | |
| Database | |
| ORM / Query Builder | |
| Auth Library | |
| Validation Library | |
| Test Framework | |
| Key Dependencies | |

## Conventions Found

<!-- Naming patterns, architecture style, code organization rules -->

- **Naming:** {kebab-case / camelCase / PascalCase for models}
- **Architecture:** {MVC / layered / hexagonal / clean architecture}
- **File Organization:** {by feature / by type / by layer}
- **Import Style:** {absolute / relative / aliases}
- **API Versioning:** {URL path /api/v1 / Header / None}

## Key Files

<!-- Entry points, configs, critical modules that affect sprint work -->

| File | Purpose |
|------|---------|
| | Entry point / server start |
| | Main config / env loader |
| | Routes / API registry |
| | Database connection |
| | Migration config |
| | Auth middleware |
| | Error handler |

## Database Schema

<!-- Existing tables/collections relevant to sprint scope -->

| Table/Collection | Key Columns | Relationships |
|-----------------|-------------|---------------|
| | | |

<!-- Include foreign key relationships and indexes -->

## Existing Patterns

### API Routes & Controllers

<!-- How routes are defined, controller patterns, middleware usage -->

### Authentication & Authorization

<!-- How auth works — JWT, sessions, API keys, middleware chain -->

### Error Handling

<!-- Error patterns, response formats, error codes, logging -->

### Service Layer

<!-- Business logic patterns, dependency injection, transaction handling -->

### Database Access

<!-- ORM usage, query patterns, connection pooling, migration approach -->

### Middleware Stack

<!-- Order of middleware, custom middleware, third-party middleware -->

### Queue / Worker Patterns

<!-- Background jobs, queue system, worker patterns (if applicable) -->

### Existing Integrations

<!-- Third-party services already integrated — APIs, SDKs, webhooks -->

| Service | Type | Usage |
|---------|------|-------|
| | | |

### Testing

<!-- Test framework, coverage approach, test file locations, fixtures -->

## Environment Configuration

<!-- Environment variables, config files, secrets management -->

| Variable | Purpose | Example |
|----------|---------|---------|
| DATABASE_URL | DB connection | postgres://... |
| JWT_SECRET | Token signing | ... |
| | | |

## Notes for This Sprint

<!-- Relevant observations specific to current sprint scope -->
<!-- What existing code/patterns should this sprint build on or be aware of? -->

- 
