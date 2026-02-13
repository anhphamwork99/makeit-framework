# FE ↔ BE Coordination Protocol

## API Contract Flow

```
TL defines initial contract (source of truth) → BE refines during implementation → FE consumes
```

**Ownership chain:**
1. **Techlead** — defines initial API contract in task breakdown (break-tasks workflow)
2. **Dev BE** — refines contract during implementation, notifies FE of any changes
3. **Dev FE** — consumes contract, creates mock data, verifies integration

---

## Sync Points

### Sync Point 1: Contract Sharing

| | |
|---|---|
| **When** | BE completes API design (`design-api` workflow) |
| **Who triggers** | Dev BE |
| **Action** | BE notifies FE via Telegram with contract doc link |
| **FE Response** | Review contract, confirm field names/types match UI needs |

**If FE finds issues with contract** → Flag immediately, tag BE + TL in Telegram.

### Sync Point 2: API Ready

| | |
|---|---|
| **When** | BE completes implementation + tests pass |
| **Who triggers** | Dev BE (via `stage-complete`) |
| **Action** | BE notifies FE: "API ready for integration" with endpoint details |
| **FE Response** | Switch from mock data to real API endpoint |

### Sync Point 3: Integration Verification

| | |
|---|---|
| **When** | FE integrates with real API |
| **Who triggers** | Dev FE |
| **Action** | FE verifies actual responses match contract |
| **If mismatch** | Flag to Telegram, tag BE + TL |

---

## Contract Mismatch Detection

When FE integrates with real API, verify these areas:

| Check | FE verifies | BE verifies |
|-------|------------|-------------|
| Field names | Response JSON matches UI bindings | Response matches contract |
| Data types | Correct type for rendering (string, number, date) | Correct type from DB |
| Error codes | UI handles all documented error states | API returns documented errors |
| Pagination | Params work (page, limit, infinite scroll) | Correct total/page/limit in response |
| Auth | Token sent correctly in headers | Token validated correctly |
| Empty states | UI handles empty arrays/null correctly | API returns consistent empty format |

**If mismatch found:**
1. FE creates specific bug description (endpoint, expected vs actual)
2. Tags BE + TL in Telegram
3. BE fixes and re-notifies when ready

---

## Mock Data Convention

FE creates mock data **matching API contract schema exactly** so switching to real API is seamless.

**Rules:**
- Mock file location: `src/mocks/` or `__mocks__/` (project convention)
- Mock data MUST match contract schema (same field names, types, nesting)
- Include edge cases: empty arrays, null fields, max-length strings
- Use realistic data (not "test123")

**Example structure:**
```
src/mocks/
├── feature-name/
│   ├── list-response.json    # GET /api/v1/resources
│   ├── detail-response.json  # GET /api/v1/resources/:id
│   └── error-responses.json  # Error scenarios
```

---

## Telegram Protocol

Standardized messages for each sync point:

### BE → FE: Contract Ready (Sync Point 1)
```
📡 API Contract ready: [Feature Name]
From: Dev BE → To: Dev FE
Task: [LARK-ID]
Endpoints: [list of endpoints]
📎 Contract file: [path or link]
```

### BE → FE: API Ready (Sync Point 2)
```
🟢 API Ready for Integration: [Feature Name]

Endpoints:
- [METHOD] /api/v1/[endpoint] — [description]

Contract doc: [link]
Base URL: [dev/staging URL]
Auth: [Bearer token / API key / none]

@[FE dev] — ready to switch from mocks
```

### FE → BE: Mismatch Found (Sync Point 3)
```
⚠️ Contract Mismatch: [Feature Name]

Endpoint: [METHOD] /api/v1/[endpoint]
Expected: [what contract says]
Actual: [what API returns]
Impact: [what breaks in UI]

@[BE dev] @[TL] — needs fix before integration
```

---

## Timeline Expectation

```
Sprint Start
    │
    ├── TL defines initial contracts (break-tasks)
    │
    ├── BE receives tasks
    │   ├── design-api → Sync Point 1 (share with FE)
    │   └── implement → Sync Point 2 (notify FE ready)
    │
    ├── FE receives tasks
    │   ├── implement with mocks (using contract)
    │   └── integrate real API → Sync Point 3 (verify)
    │
    └── Both ready for review
```

**Key principle:** FE can start implementing UI with mock data as soon as contract is shared (Sync Point 1). No need to wait for BE to finish implementation.
