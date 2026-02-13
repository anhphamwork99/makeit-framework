---
name: discover-be-context
description: BE context discovery — scan ORM/DB patterns, auth middleware, error handling, API versioning, migrations, testing, and env config before implementation
---

<purpose>
Gather existing backend context at the start of a sprint so BE implementation follows established patterns and integrates cleanly. Runs during `/makeit:clarify` after gate verification. Output saves to `CODEBASE-SNAPSHOT.md` in the sprint workspace.
</purpose>

<when_to_use>
- Automatically during `/makeit:clarify` (discover_context step)
- Manually when BE Dev needs to understand existing backend patterns
- When implementing features that extend existing API or DB patterns
</when_to_use>

<process>
  <step name="scan_orm_db_patterns">
    Identify database and ORM patterns:

    1. **ORM / DB client** — Prisma? TypeORM? Drizzle? Knex? Raw SQL?
    2. **Schema location** — schema.prisma? entities/? models/?
    3. **Query patterns** — Repository pattern? Direct queries? Service layer?
    4. **Relations** — How relationships are modeled
    5. **Seed data** — Seed scripts, fixtures, test data approach

    Record for consistency in new implementations.
  </step>

  <step name="scan_auth_middleware">
    Review authentication and authorization stack:

    1. **Auth strategy** — JWT? Session? OAuth? API keys?
    2. **Auth middleware** — Where/how auth is applied
    3. **Authorization** — RBAC? ABAC? Permission checks?
    4. **Protected routes** — Which endpoints require auth
    5. **Token management** — Refresh tokens, expiry, storage

    > ⚠️ Security patterns are critical — new endpoints MUST follow established auth patterns.
  </step>

  <step name="scan_error_handling">
    Identify error handling patterns:

    1. **Error response format** — `{ error: { code, message } }`? RFC 7807?
    2. **HTTP status codes** — How codes are used (400 vs 422, etc.)
    3. **Error classes** — Custom error types? Error hierarchy?
    4. **Global error handler** — Middleware/catch-all?
    5. **Logging** — Logger library, log levels, structured logging?
    6. **Validation** — Zod? Joi? Class-validator? Where applied?
  </step>

  <step name="scan_service_layer">
    Review service layer conventions:

    1. **Layer structure** — Controller → Service → Repository?
    2. **Dependency injection** — Manual? Framework-provided?
    3. **Transaction handling** — How DB transactions are managed
    4. **Business logic location** — Services? Models? Use cases?
    5. **Cross-cutting concerns** — Caching, rate limiting, pagination
  </step>

  <step name="check_api_versioning">
    Determine API versioning strategy:

    1. **Versioning approach** — URL path (/v1/)? Header? None?
    2. **Endpoint naming** — RESTful? RPC-style? Mixed?
    3. **Request/response** — JSON? Content-Type handling?
    4. **Pagination** — Cursor? Offset? Page-based?
    5. **Filtering/sorting** — Query params convention?
  </step>

  <step name="check_migration_tool">
    Review migration setup:

    1. **Migration tool** — Prisma migrate? Knex migrations? Flyway?
    2. **Migration naming** — Timestamp? Sequential? Descriptive?
    3. **Rollback support** — Down migrations exist?
    4. **Shared DB concerns** — Multiple services using same DB?
    5. **Migration testing** — How migrations are tested/verified

    > ⚠️ STOP mechanism applies — flag any destructive migration patterns.
  </step>

  <step name="check_testing_patterns">
    Identify testing patterns:

    1. **Test framework** — Jest? Vitest? Mocha? pytest?
    2. **Test types** — Unit? Integration? E2E? API tests?
    3. **Test file location** — co-located? __tests__/? test/?
    4. **Mocking approach** — In-memory DB? Mocks? Fixtures?
    5. **Coverage** — Coverage config? Minimum thresholds?
    6. **CI integration** — Tests run in CI? Pre-commit hooks?
  </step>

  <step name="check_env_config">
    Review environment configuration:

    1. **Config management** — dotenv? Config service? env-cmd?
    2. **Environment files** — .env.example? .env.development?
    3. **Secrets handling** — How secrets are managed
    4. **Feature flags** — Any feature flag system?
    5. **Config validation** — Schema validation on startup?
  </step>

  <step name="save_to_snapshot">
    Save all findings to `CODEBASE-SNAPSHOT.md` in sprint workspace:
    - Fill "Project Structure" with BE directory tree
    - Fill "Tech Stack" table (ORM, framework, DB, runtime)
    - Fill "Conventions Found" (naming, patterns, architecture)
    - Fill "Key Files" (entry point, routes, schema, config)
    - Fill "Existing Patterns" (auth, error handling, data flow, testing)
    - Fill "Notes for This Sprint" with BE-relevant observations

    Path: `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`

    > Copy template from `@be-discovery/templates/CODEBASE-SNAPSHOT.md`
  </step>
</process>

<output>
- `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md` — filled with BE context
- Summary of key findings presented to user
</output>

<edge_cases>

**Khi phát hiện environment configuration drift giữa dev/staging/prod:** Khi scan env config, so sánh `.env.example` với `.env.development`/`.env.staging` nếu có. Flag missing env vars hoặc khác biệt giữa environments. Ghi vào CODEBASE-SNAPSHOT.md section "⚠️ Environment Drift" để implementation biết trước.

</edge_cases>

<success_criteria>
- [ ] ORM/DB patterns identified
- [ ] Auth middleware stack documented
- [ ] Error handling patterns mapped
- [ ] Service layer conventions recorded
- [ ] API versioning strategy determined
- [ ] Migration tool and conventions checked
- [ ] Testing patterns identified
- [ ] Environment config approach documented
- [ ] CODEBASE-SNAPSHOT.md saved in sprint workspace
</success_criteria>
