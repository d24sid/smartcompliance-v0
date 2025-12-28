# SmartCompliance – UI PRD (MVP, Mock-Data Only)

## 1. Scope & Philosophy

### Scope

- Web app (desktop-first)
- UI implementation only
- Uses mock JSON responses identical to DATA_CONTRACT.md
- No backend integration logic required

### Core Principles

- Simplicity > flexibility
- Readability > density
- Predictability > clever UX
- Explicit actions > automation

## 2. Global UI Standards

### Layout

- Fixed left sidebar
- Top header with firm + user context
- Content area uses tables and simple cards

### Header (persistent)

- Firm name
- Logged-in user name
- Role badge (ADMIN / STAFF)
- Logout button

### Sidebar Navigation

**Order matters:**

1. Home
2. Clients
3. My Tasks
4. Document Vault
5. Client Activity
6. Notifications
7. Audit Logs (Admin only)
8. Settings

## 3. Mock Data Conventions

- All dates shown as: **DD MMM YYYY**
- Status values shown exactly as enums
- Use realistic but static mock data
- Empty states must be explicit and instructional

**Example empty state copy:**
> "No overdue compliances for the selected period."

## 4. Screen-by-Screen PRD

### 4.1 Login Screen

**Purpose:** Secure entry point.

**UI Elements:**
- Email input
- Password input
- Primary CTA: Login
- Secondary link: Forgot password

**Mock Behavior:**
- On login → load `/home`
- No validation logic required

---

### 4.2 Home / Today Screen

**Purpose:** Answer one question: "What needs attention today?"

**Data Source (mock):** `GET /api/home/today`

**Sections (vertical stack):**
1. Due Today
2. Overdue
3. Waiting for Client
4. Recently Updated

**Each Row Shows:**
- Client name
- Entity name
- Compliance name
- Due date
- Status (badge)
- Owner

**Interactions:**
- Clicking a row → Compliance Detail screen

**Empty State:**
- Explain why section is empty (not just "No data").

---

### 4.3 Clients List Screen

**Purpose:** Navigate clients.

**Data Source:** `GET /api/clients`

**Table Columns:**
- Client name
- Entities count
- Active compliances
- Overdue compliances
- Last activity date

**Actions:**
- Row click → Client Detail

**Admin Only:**
- "Create Client" button (UI only)

---

### 4.4 Client Detail Screen

**Tabs:**
1. Overview
2. Entities
3. Documents

#### 4.4.1 Overview Tab

**Fields:**
- Client name
- Contact email
- Assigned partner
- Status (Active / Archived)

**Admin Only:**
- Edit button (non-functional placeholder)

#### 4.4.2 Entities Tab

**Data Source:** `GET /api/clients/{clientId}/entities`

**Table Columns:**
- Entity name
- Entity type
- Financial year
- Overdue compliances count

**Interaction:**
- Row click → Entity Detail

#### 4.4.3 Documents Tab (Read-only)

**Purpose:** Partner-friendly aggregated view.

**Data Source:** `GET /api/clients/{clientId}/documents`

**Table Columns:**
- Document name
- Document type
- Entity
- Compliance
- Period type
- Period value
- Version
- Status
- Uploaded by
- Uploaded on

**Actions:**
- View
- Download

**Explicitly NOT allowed:**
- Upload
- Edit
- Delete

---

### 4.5 Entity Detail Screen

**Purpose:** Entity-specific compliance overview.

**Data Sources:**
- `GET /api/entities/{entityId}`
- `GET /api/entities/{entityId}/compliances`

**Header Section:**
- Entity name
- CIN / LLPIN
- Entity type
- Incorporation date
- Financial year

**Compliance Table:**
- Compliance name
- Period label
- Due date
- Status
- Owner
- Last updated

**Interaction:**
- Row click → Compliance Detail

---

### 4.6 Compliance Detail Screen (Core)

**This is the most important screen.**

#### 4.6.1 Overview Section

**Data Source:** `GET /api/compliances/{complianceId}`

**Fields:**
- Compliance name
- Statutory due date
- Overridden due date (if any)
- Override reason (if any)
- Status badge
- Owner

#### 4.6.2 Task Workflow Section

**Data Source:** `GET /api/compliances/{complianceId}/tasks`

**Layout:**
5 fixed columns:
1. NOT_STARTED
2. IN_PROGRESS
3. WAITING_FOR_CLIENT
4. UNDER_REVIEW
5. FILED

**Task Card Shows:**
- Task name
- Assignee
- Due date

**Interactions:**
- Move task → next stage only
- Add internal note (UI only)

**Constraints:**
- No skipping stages
- No custom stages

#### 4.6.3 Documents Section

**Data Source:** `GET /api/compliances/{complianceId}/documents`

**Table Columns:**
- Document name
- Document type
- Period type
- Period value
- Version
- Status
- Uploaded by
- Uploaded on

**Actions:**
- Upload new version (mock)
- View version history (modal)
- Download

#### 4.6.4 Status Actions

**Buttons:**
- Mark Waiting for Client
- Mark Under Review
- Mark Filed (Admin only)

**Behavior:**
- Confirmation modal
- Optional comment field
- UI-only state change

---

### 4.7 My Tasks Screen

**Purpose:** Staff productivity view.

**Data Source:** `GET /api/tasks/my`

**Table Columns:**
- Task name
- Client
- Entity
- Compliance
- Due date
- Status

**Interaction:**
- Row click → Compliance Detail

---

### 4.8 Document Vault Screen

**Purpose:** Firm-wide document visibility.

**Data Source:** `GET /api/documents`

**Table Columns:**
- Document name
- Client
- Entity
- Compliance
- Document type
- Period
- Version
- Status
- Uploaded by
- Uploaded on

**Actions:**
- View
- Download
- Upload new version
- Soft delete (Admin only, modal with reason)

---

### 4.9 Client Activity Screen

**Purpose:** Passive monitoring of client behavior.

**Content:**
- Client name
- Last login
- Recent uploads
- Pending approvals

**Layout:**
- Simple list
- No interactions beyond navigation

---

### 4.10 Notifications Screen

**Data Source:** `GET /api/notifications`

**Table Columns:**
- Type
- Trigger
- Recipient email
- Channel
- Delivery status
- Sent at

**Actions:**
- Resend (UI only)

---

### 4.11 Audit Logs Screen (Admin Only)

**Purpose:** Legal traceability.

**Data Source:** `GET /api/audit-logs`

**Table Columns:**
- Timestamp
- User
- Action
- Entity type
- Entity ID
- Before value (JSON preview)
- After value (JSON preview)

**Actions:**
- Filter
- Export (UI only)

---

### 4.12 Settings Screen

**Sections:**
1. Firm Profile
2. Users & Roles

**Users Table:**
- Name
- Email
- Role
- Status

**Actions:**
- Add user (modal)
- Deactivate user
- Change role

---

## 5. Non-Goals (Explicit)

**Cursor must NOT implement:**
- AI features
- Analytics
- Custom workflows
- Bulk edits
- Mobile layouts
- Real API calls

---

## 6. Definition of Done (UI)

The UI is complete when:
- ✅ Every screen renders using mock data
- ✅ Navigation flows correctly
- ✅ No missing fields vs PRD
- ✅ Empty states are explicit
- ✅ No invented features appear

---

## Final Note (Important)

**This PRD is intentionally boring.**

If at any point you feel:
> "This could be smarter / more flexible"

**That is a design failure, not a missing feature.**

