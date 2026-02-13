---
name: be-workflow-design-api
description: BE API design workflow — design API contracts with endpoints, schemas, error codes, and FE handoff
---

<purpose>
Design API contract before implementation — document endpoints, request/response schemas, error codes, and share with Dev FE.
</purpose>

<output>
API Contract → `.makeit/sprint/SPRINT-NNN/deliverables/API-CONTRACT-{feature}.md`

Template: @be-execution/templates/API-CONTRACT-TEMPLATE.md
</output>

<process>
  <step name="gather_input">
    1. **Story AC from BA** — source of truth for requirements
    2. **Techlead's technical notes** + task constraints
    3. **Existing API patterns** in project — maintain consistency
    4. **Related endpoints** — compare current conventions
  </step>

  <step name="design_endpoints">
    For each endpoint, define:
    1. **Method + Path:** RESTful convention
    2. **Description:** Short description
    3. **Auth requirement:** Public / Required / Role-based
    4. **Request schema:** Body, query params, path params
    5. **Response schema:** Success + error responses
    6. **Error codes:** Standardized error format
  </step>

  <step name="document_contract">
    **Endpoints Table:**

    | Method | Path | Description | Auth |
    |--------|------|-------------|------|
    | POST | /api/v1/[resource] | Create resource | Required |
    | GET | /api/v1/[resource] | List resources | Required |
    | GET | /api/v1/[resource]/:id | Get single | Required |
    | PUT | /api/v1/[resource]/:id | Update | Required |
    | DELETE | /api/v1/[resource]/:id | Delete | Required |

    **API Design Principles:**
    - RESTful: nouns for resources, verbs via HTTP methods
    - Consistent naming: snake_case for JSON fields, kebab-case for URLs
    - Versioning: URL path versioning (`/api/v1/`)
    - Pagination: default 20 items/page, max 100
    - Authentication: JWT Bearer token (or project standard)
  </step>

  <step name="share_with_fe">
    Share API contract with Dev FE (Sync Point 1):

    1. **Structured contract format** — include in handoff:
       - Endpoints table (method, path, description, auth)
       - Request/response schemas with field types
       - Error codes and messages
       - Pagination format (if applicable)
       - Auth mechanism details

    2. **Generate Telegram notification:**
       ```
       📡 API Contract ready: [Feature Name]
       From: Dev BE → To: Dev FE
       Task: [LARK-ID]

       Endpoints:
       - [METHOD] /api/v1/[endpoint] — [description]

       📎 Contract file: [path]

       👉 FE: Please create mock data matching this schema
          so you can start UI implementation immediately.
       ```

    3. **Timeline expectation:**
       FE can implement UI with mock data now.
       Integration when API ready (Sync Point 2 — via stage-complete notification).

    > Sync Point 1: Coordinate with FE on API contracts — share schema before implementation begins.
  </step>
</process>

<edge_cases>

**Khi API contract cần revision sau khi đã share với FE:** ⚠️ STOP — API contract đã shared (Sync Point 1) nhưng cần thay đổi. Liệt kê breaking changes cụ thể (field renamed, type changed, endpoint removed). Thông báo FE qua Telegram TRƯỚC khi implement thay đổi để FE chuẩn bị update.

**Khi FE đã build UI với assumptions khác về API contract:** Kiểm tra API contract đã share có mâu thuẫn với FE implementation không (khác pagination format, khác field names, khác auth flow). Nếu conflict → ⚠️ STOP — coordinate với FE để align trước khi implement.

**Khi thiết kế API mới mà break backward compatibility với existing FE implementation:** Đánh giá impact: liệt kê endpoints bị ảnh hưởng, field changes, type changes. Đề xuất API versioning (`/v2/`) hoặc deprecation header thay vì break `/v1/` trực tiếp. Nếu không thể version → ⚠️ STOP — cần team alignment.

</edge_cases>
