---
name: be-stage-verify-work
description: BE sprint deliverables verification — validate all output against SPECS.md with BE-specific API, DB, security quality checks
---

<purpose>
Validate entire sprint output — all API implementations, DB migrations, tests, and documentation meet SPECS.md criteria. UAT-like final check before sprint completion.
</purpose>

<required_reading>
@be-verification/stage-verify-phase.md
@be-lifecycle/stage-complete.md
@_shared/references/quality-gates.md
@_shared/references/coding-standards.md
</required_reading>

<rules>
1. Verify against SPECS.md — spec is source of truth
2. Check ALL deliverables — don't skip any
3. BE-specific quality — API contracts, migrations, tests must meet quality bar
4. Don't fix during verification — only check, don't modify
5. One re-verification allowed — after fixing, re-run once
</rules>

<output>
Verification report:
- ALL PASS → route to `/makeit:complete`
- GAPS → route back to fix with specific action items
</output>

<process>
  <step name="load_sprint_context">
    1. Read SPECS.md → deliverables list, success criteria, sprint goal
    2. Read STATE.md → confirm all phases complete
    3. List `deliverables/` folder → actual files
    4. Review git log → verify commits follow conventional format
  </step>

  <step name="be_deliverable_check">
    For EACH expected deliverable:

    **API Contract Check:**
    - [ ] All endpoints documented with request/response schemas
    - [ ] Error codes standardized per error response standard
    - [ ] Authentication/authorization per endpoint specified
    - [ ] Pagination format consistent (if list endpoints)
    - [ ] Contract shared with Dev FE (handoff done)

    **Implementation Check:**
    - [ ] Code committed per layer (models, migrations, services, controllers)
    - [ ] Conventional commit format used
    - [ ] No hardcoded secrets — environment variables
    - [ ] Error handling proper with meaningful messages
    - [ ] Correct HTTP status codes

    **Database Check:**
    - [ ] Migrations reversible — rollback tested
    - [ ] No data loss risks
    - [ ] Indexes on foreign keys and frequently queried columns
    - [ ] No N+1 queries
    - [ ] Naming conventions followed (snake_case, plural tables)

    **Security Check:**
    - [ ] Input validation on all external endpoints
    - [ ] SQL injection prevention (parameterized queries)
    - [ ] Authentication middleware on protected routes
    - [ ] Authorization checks (role-based if needed)
    - [ ] No sensitive data in logs
    - [ ] Rate limiting on public endpoints

    **Testing Check:**
    - [ ] Unit tests for each service method
    - [ ] Integration tests for each API endpoint
    - [ ] Edge cases tested (empty, null, boundary, unauthorized)
    - [ ] All tests passing

    **Documentation Check:**
    - [ ] API documentation updated (Swagger/OpenAPI if applicable)
    - [ ] README updated if needed
  </step>

  <step name="cross_deliverable_consistency">
    | Check | Description |
    |-------|-------------|
    | Contract-Code alignment | Implementation matches API contract schemas |
    | Schema-Code alignment | Models match schema design documents |
    | Story-Code alignment | Code fulfills BA user story acceptance criteria |
    | Test-Code coverage | Tests cover all implemented endpoints and logic |
    | Downstream usability | Reviewer can assess quality, FE can integrate |
  </step>

  <step name="route_results">
    **ALL PASS ✅:** Display verification report with deliverable counts, success criteria status,
    cross-checks. Suggest: `/makeit:complete`.

    **GAPS FOUND ❌:** List specific gaps → suggest which phase to revisit → re-run after fixing.
  </step>
</process>

<edge_cases>

**Khi verify work mà chưa check environment parity (dev/staging/prod config khác nhau):** Trước khi PASS final verification, kiểm tra: (1) tất cả env vars mới đã có trong `.env.example`, (2) migration compatible với staging/prod DB version, (3) third-party API credentials có cho tất cả environments. Flag missing env config là FAIL — không pass verification khi config chưa sẵn sàng cho deploy.

</edge_cases>

<success_criteria>
- [ ] All deliverables validated against SPECS.md
- [ ] BE-specific quality checks applied (API, DB, security, tests)
- [ ] Cross-deliverable consistency verified
- [ ] STATE.md updated with verification result
- [ ] User informed of next steps
</success_criteria>
