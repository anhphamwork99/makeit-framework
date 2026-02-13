---
name: discover-tech-context
description: TL context discovery — scan architecture, tech stack, code patterns, ADRs, and folder conventions before solution design
---

<purpose>
Gather existing technical context at the start of a sprint so Techlead's solution design and task breakdown build on established patterns. Runs during `/makeit:clarify` after gate verification. Output saves to `CODEBASE-SNAPSHOT.md` in the sprint workspace.
</purpose>

<when_to_use>
- Automatically during `/makeit:clarify` (discover_context step)
- Manually when TL needs to refresh architecture understanding
- When working on features that touch unfamiliar parts of the codebase
</when_to_use>

<process>
  <step name="scan_architecture_overview">
    Scan for architecture documentation:

    1. **README.md** — Project overview, setup instructions, architecture notes
    2. **docs/ folder** — Architecture diagrams, design docs
    3. **ADRs** — Architecture Decision Records (docs/adr/, decisions/)
    4. **CHANGELOG** — Recent changes and version history

    Record architecture style (monolith, microservices, modular monolith, etc.).
  </step>

  <step name="inventory_tech_stack">
    Extract tech stack from project files:

    1. **package.json / requirements.txt / go.mod** — Dependencies and versions
    2. **Framework** — Next.js, Express, Django, etc.
    3. **Language + Runtime** — TypeScript, Python, Go + Node version, etc.
    4. **Build tools** — Vite, Webpack, esbuild, etc.
    5. **Key libraries** — ORM, auth, testing, utility libraries
    6. **Infrastructure** — Docker, CI/CD config, deployment target

    Fill "Tech Stack" table in CODEBASE-SNAPSHOT.md.
  </step>

  <step name="scan_code_patterns">
    Identify established code patterns by scanning source:

    **API Conventions:**
    - REST? GraphQL? RPC?
    - Naming: `/api/v1/users` style? Nested resources?
    - Versioning strategy?
    - Request/response format?

    **Database Patterns:**
    - ORM (Prisma, TypeORM, Drizzle)? Query builder? Raw SQL?
    - Migration tool (Prisma migrate, Knex, Flyway)?
    - Seed data approach?

    **Auth/Authz:**
    - JWT? Session? OAuth?
    - Middleware pattern?
    - Role-based access control?

    **Error Handling:**
    - Centralized error handler?
    - Error response format?
    - Logging approach?

    **Testing:**
    - Test framework (Jest, Vitest, pytest)?
    - Test file naming and location?
    - Coverage setup?
    - Integration vs unit test patterns?

    Fill "Existing Patterns" section in CODEBASE-SNAPSHOT.md.
  </step>

  <step name="analyze_folder_structure">
    Map folder structure conventions:

    1. **Root structure** — src/, app/, lib/, utils/
    2. **Organization style** — by feature? by type? by layer?
    3. **Naming conventions** — kebab-case, camelCase, PascalCase
    4. **Config files** — .env, tsconfig.json, eslint, prettier
    5. **Entry points** — main.ts, index.ts, app.ts

    Fill "Project Structure" and "Key Files" sections.
  </step>

  <step name="review_existing_adrs">
    If ADRs exist, extract key decisions:

    1. **List all ADRs** with status (accepted, superseded, deprecated)
    2. **Extract decisions** relevant to current sprint scope
    3. **Note constraints** — what options were ruled out and why
    4. **Check for open ADRs** — pending decisions that might affect new work

    > If no ADRs exist, note this — TL may want to start ADR practice.
  </step>

  <step name="save_to_snapshot">
    Save all findings to `CODEBASE-SNAPSHOT.md` in sprint workspace:
    - Fill "Tech Stack" table
    - Fill "Conventions Found"
    - Fill "Key Files"
    - Fill "Existing Patterns" (auth, error handling, data flow, testing)
    - Fill "Project Structure" with directory tree
    - Fill "Notes for This Sprint" with TL-relevant observations

    Path: `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md`

    > Copy template from `@tl-discovery/templates/CODEBASE-SNAPSHOT.md`
  </step>
</process>

<output>
- `.makeit/sprint/SPRINT-{NNN}/CODEBASE-SNAPSHOT.md` — filled with tech context
- Summary of key findings presented to user
</output>

<success_criteria>
- [ ] Architecture overview documented
- [ ] Tech stack inventoried (framework, dependencies, versions)
- [ ] Code patterns identified (API, DB, auth, error handling, testing)
- [ ] Folder structure conventions mapped
- [ ] Existing ADRs reviewed (if any)
- [ ] CODEBASE-SNAPSHOT.md saved in sprint workspace
</success_criteria>
