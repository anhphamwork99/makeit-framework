---
name: discover-product-context
description: PO context discovery — scan existing product features, sprint history, business metrics, and user feedback before planning
---

<purpose>
Gather existing product context at the start of a sprint so PO decisions are informed by what already exists. Runs during `/makeit:start-sprint` after gate verification. Output saves to `PRODUCT-CONTEXT.md` in the sprint workspace.
</purpose>

<when_to_use>
- Automatically during `/makeit:start-sprint` (discover_context step)
- Manually when PO needs to refresh product understanding
- When switching product areas or working on unfamiliar features
</when_to_use>

<process>
  <step name="scan_existing_features">
    Scan the codebase and documentation for existing product features:

    1. **README / docs** — Read project README, any product docs
    2. **Route/page structure** — Scan routes or pages to identify existing screens
    3. **Feature folders** — Look for feature-based directory structure
    4. **Previous sprint deliverables** — Check `.makeit/sprint/` for past sprint outputs

    Record findings in "Existing Features" under Product Context section.
  </step>

  <step name="review_sprint_history">
    Check for recent sprint context:

    1. **Previous SPECS.md files** — What was the sprint goal?
    2. **Previous ROADMAP.md files** — What phases were planned?
    3. **Decisions logged** — Any decisions that affect current work?
    4. **Lark sprint issues** — Ask user about recent sprint outcomes

    Record key context that affects current sprint decisions.
  </step>

  <step name="check_business_context">
    Gather business metrics and KPI context (ask user if not findable):

    1. **Analytics setup** — Any tracking/analytics in codebase?
    2. **Business goals** — What KPIs does PO track?
    3. **User segments** — Target audience definitions?
    4. **Revenue model** — How does product generate value?

    > If product is early-stage, note "No metrics yet" — this is valid context.
  </step>

  <step name="check_user_feedback">
    Look for user feedback sources:

    1. **User research docs** — Any research findings in repo?
    2. **Feedback channels** — Where does user feedback come from?
    3. **Known pain points** — What issues have been reported?
    4. **Feature requests** — Outstanding requests from users?

    > Ask user for context if nothing found in codebase.
  </step>

  <step name="save_to_snapshot">
    Save all findings to `PRODUCT-CONTEXT.md` in sprint workspace:
    - Fill "Product Context" section (Existing Features, User Journeys, Business Metrics)
    - Fill "Notes for This Sprint" with PO-relevant observations
    - Fill "Project Structure" with high-level directory overview

    Path: `.makeit/sprint/SPRINT-{NNN}/PRODUCT-CONTEXT.md`

    > Copy template from `@po-discovery/templates/PRODUCT-CONTEXT.md`
  </step>
</process>

<output>
- `.makeit/sprint/SPRINT-{NNN}/PRODUCT-CONTEXT.md` — filled with product context
- Summary of key findings presented to user
</output>

<success_criteria>
- [ ] Existing features scanned and documented
- [ ] Sprint history reviewed (if available)
- [ ] Business context gathered (or noted as unavailable)
- [ ] User feedback sources identified (or noted as unavailable)
- [ ] PRODUCT-CONTEXT.md saved in sprint workspace
</success_criteria>
