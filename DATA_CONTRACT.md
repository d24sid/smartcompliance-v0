# Data Contract - Compliance Workflow SaaS

**IMPORTANT:**
- This document defines the SINGLE SOURCE OF TRUTH for database schema and REST APIs.
- All future UI pages must use ONLY the JSON structures defined here.
- Do NOT invent new fields, rename keys, or change nesting later.
- No AI, no analytics, no derived magic fields.

## Core Design Principles

- Simplicity
- Reliability
- Auditability
- Deterministic behavior
- Explicit relationships

## Database Schema (Logical)

### FIRM

```typescript
Firm {
  id: string (uuid)
  name: string
  created_at: timestamp
}
```

### USER

```typescript
User {
  id: string (uuid)
  firm_id: string
  name: string
  email: string
  role: "ADMIN" | "STAFF"
  is_active: boolean
  last_login_at: timestamp | null
  created_at: timestamp
}
```

### CLIENT

```typescript
Client {
  id: string (uuid)
  firm_id: string
  name: string
  contact_email: string
  assigned_partner_id: string
  status: "ACTIVE" | "ARCHIVED"
  created_at: timestamp
}
```

### ENTITY

```typescript
Entity {
  id: string (uuid)
  client_id: string
  firm_id: string
  name: string
  entity_type: "COMPANY" | "LLP" | "INDIVIDUAL"
  cin_or_llpin: string | null
  incorporation_date: date
  financial_year: string   // e.g. "2024-25"
  created_at: timestamp
}
```

### COMPLIANCE

```typescript
Compliance {
  id: string (uuid)
  entity_id: string
  firm_id: string
  name: string            // e.g. "AOC-4"
  period_label: string    // e.g. "FY 2024-25"
  statutory_due_date: date
  overridden_due_date: date | null
  override_reason: string | null
  status: "NOT_STARTED" |
          "IN_PROGRESS" |
          "WAITING_FOR_CLIENT" |
          "UNDER_REVIEW" |
          "FILED" |
          "OVERDUE"
  owner_id: string
  last_updated_at: timestamp
}
```

### TASK

```typescript
Task {
  id: string (uuid)
  compliance_id: string
  firm_id: string
  name: string
  stage: "NOT_STARTED" |
         "IN_PROGRESS" |
         "WAITING_FOR_CLIENT" |
         "UNDER_REVIEW" |
         "FILED"
  assignee_id: string
  due_date: date
  created_at: timestamp
}
```

### DOCUMENT

```typescript
Document {
  id: string (uuid)
  firm_id: string
  client_id: string
  entity_id: string
  compliance_id: string | null
  document_name: string
  document_type: "ROC_FILING" |
                 "BOARD_RESOLUTION" |
                 "FINANCIAL_STATEMENT" |
                 "GST_RETURN" |
                 "KYC_DOCUMENT" |
                 "SUPPORTING_ATTACHMENT"
  period_type: "ANNUAL" | "QUARTERLY" | "EVENT"
  period_value: string   // e.g. "FY 2024-25", "Q1 2024-25", "2024-08-12"
  version: number
  status: "DRAFT" | "FILED"
  uploaded_by: string
  uploaded_at: timestamp
}
```

### NOTIFICATION

```typescript
Notification {
  id: string (uuid)
  firm_id: string
  type: string
  trigger: string
  recipient_email: string
  channel: "EMAIL" | "IN_APP"
  delivery_status: "SENT" | "FAILED"
  sent_at: timestamp
}
```

### AUDIT_LOG

```typescript
AuditLog {
  id: string (uuid)
  firm_id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string
  before_value: object | null
  after_value: object | null
  created_at: timestamp
}
```

## REST API Definitions + Mock Responses

### GET /api/me

**Response:**
```json
{
  "id": "user-uuid",
  "name": "Rahul Sharma",
  "email": "rahul@firm.com",
  "role": "ADMIN",
  "firm": {
    "id": "firm-uuid",
    "name": "Sharma & Co"
  }
}
```

### GET /api/home/today

**Response:**
```json
{
  "due_today": [
    {
      "client_name": "ABC Pvt Ltd",
      "entity_name": "ABC Pvt Ltd",
      "compliance_name": "AOC-4",
      "due_date": "2025-10-30",
      "status": "IN_PROGRESS",
      "owner": "Neha Jain"
    }
  ],
  "overdue": [],
  "waiting_for_client": [],
  "recent_updates": []
}
```

### GET /api/clients

**Response:**
```json
[
  {
    "id": "client-uuid",
    "name": "ABC Pvt Ltd",
    "entities_count": 2,
    "active_compliances": 12,
    "overdue_compliances": 1,
    "last_activity_at": "2025-09-12T14:32:00Z"
  }
]
```

### GET /api/clients/{clientId}

**Response:**
```json
{
  "id": "client-uuid",
  "name": "ABC Pvt Ltd",
  "contact_email": "finance@abc.com",
  "assigned_partner": "Rahul Sharma",
  "status": "ACTIVE"
}
```

### GET /api/clients/{clientId}/entities

**Response:**
```json
[
  {
    "id": "entity-uuid",
    "name": "ABC Pvt Ltd",
    "entity_type": "COMPANY",
    "financial_year": "2024-25",
    "overdue_compliances": 1
  }
]
```

### GET /api/clients/{clientId}/documents

**READ-ONLY AGGREGATED VIEW**

**Response:**
```json
[
  {
    "document_name": "AOC-4 Filing",
    "document_type": "ROC_FILING",
    "entity_name": "ABC Pvt Ltd",
    "compliance_name": "AOC-4",
    "period_type": "ANNUAL",
    "period_value": "FY 2024-25",
    "version": 2,
    "status": "FILED",
    "uploaded_by": "Neha Jain",
    "uploaded_at": "2025-09-20T11:10:00Z"
  }
]
```

### GET /api/entities/{entityId}

**Response:**
```json
{
  "id": "entity-uuid",
  "name": "ABC Pvt Ltd",
  "entity_type": "COMPANY",
  "cin_or_llpin": "U12345KA2020PTC",
  "incorporation_date": "2020-06-15",
  "financial_year": "2024-25"
}
```

### GET /api/entities/{entityId}/compliances

**Response:**
```json
[
  {
    "id": "compliance-uuid",
    "name": "AOC-4",
    "period_label": "FY 2024-25",
    "due_date": "2025-10-30",
    "status": "IN_PROGRESS",
    "owner": "Neha Jain",
    "last_updated_at": "2025-09-25T09:45:00Z"
  }
]
```

### GET /api/compliances/{complianceId}

**Response:**
```json
{
  "id": "compliance-uuid",
  "name": "AOC-4",
  "statutory_due_date": "2025-10-30",
  "overridden_due_date": null,
  "override_reason": null,
  "status": "IN_PROGRESS",
  "owner": "Neha Jain"
}
```

### GET /api/compliances/{complianceId}/tasks

**Response:**
```json
[
  {
    "id": "task-uuid",
    "name": "Prepare draft",
    "stage": "IN_PROGRESS",
    "assignee": "Neha Jain",
    "due_date": "2025-10-10"
  }
]
```

### GET /api/compliances/{complianceId}/documents

**Response:**
```json
[
  {
    "document_name": "Draft AOC-4",
    "document_type": "ROC_FILING",
    "period_type": "ANNUAL",
    "period_value": "FY 2024-25",
    "version": 1,
    "status": "DRAFT",
    "uploaded_by": "Neha Jain",
    "uploaded_at": "2025-09-18T16:20:00Z"
  }
]
```

### GET /api/tasks/my

**Response:**
```json
[
  {
    "task_name": "Prepare AOC-4 Draft",
    "client_name": "ABC Pvt Ltd",
    "entity_name": "ABC Pvt Ltd",
    "compliance_name": "AOC-4",
    "due_date": "2025-10-10",
    "status": "IN_PROGRESS"
  }
]
```

### GET /api/documents

**Response:**
```json
[
  {
    "document_name": "MGT-7 Filing",
    "client_name": "XYZ LLP",
    "entity_name": "XYZ LLP",
    "compliance_name": "MGT-7",
    "document_type": "ROC_FILING",
    "period_value": "FY 2024-25",
    "version": 1,
    "status": "FILED",
    "uploaded_by": "Amit Shah",
    "uploaded_at": "2025-08-30T10:00:00Z"
  }
]
```

### GET /api/audit-logs

**Response:**
```json
[
  {
    "timestamp": "2025-09-25T10:15:00Z",
    "user": "Rahul Sharma",
    "action": "MARKED_FILED",
    "entity_type": "COMPLIANCE",
    "entity_id": "compliance-uuid",
    "before": { "status": "UNDER_REVIEW" },
    "after": { "status": "FILED" }
  }
]
```

