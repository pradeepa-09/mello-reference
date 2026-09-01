# Mello Backend Developer Guide

This document contains everything a backend developer needs to connect databases, CRMs, webhooks, and production API services to the Mello landing page.

---

## 1. Quick Start

### Environment Setup
Copy the `.env.example` template:
```bash
cp .env.example .env.local
```

To switch from client-side mocks to real backend API execution, set:
```env
NEXT_PUBLIC_USE_MOCKS="false"
```

---

## 2. API Endpoints

### `POST /api/waitlist`
Join the desktop waitlist for macOS or Windows.

**Request:**
```http
POST /api/waitlist
Content-Type: application/json

{
  "email": "developer@mello.app",
  "platform": "macOS"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "wl_7f1c1822-10f5-4a11-8e01-d9a2a3f72e3d",
    "email": "developer@mello.app",
    "platform": "macOS",
    "status": "accepted",
    "createdAt": "2026-09-01T12:00:00.000Z"
  }
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid waitlist submission.",
    "details": {
      "email": ["Please provide a valid email address."],
      "platform": ["Platform must be either 'macOS' or 'Windows'."]
    }
  }
}
```

---

### `GET /api/health`
Health check endpoint for Docker, Kubernetes, and uptime monitoring.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-09-01T12:00:00.000Z",
  "uptime": 124.5,
  "version": "1.0.0",
  "environment": "production"
}
```

---

### `POST /api/contact`
Support and partnership contact form endpoint.

**Request:**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Sarah Miller",
  "email": "sarah@company.com",
  "subject": "Enterprise deployment inquiry",
  "message": "We would like to test Mello across our engineering team."
}
```

---

## 3. Database Integration (PostgreSQL / Supabase / Neon)

The SQL migration schema is located at:
`lib/backend/schema.sql`

To run it directly against your PostgreSQL database:
```bash
psql $DATABASE_URL -f lib/backend/schema.sql
```

---

## 4. Architecture & File Structure

```
├── app/
│   └── api/
│       ├── waitlist/route.ts       # Waitlist submission handler
│       ├── contact/route.ts        # Contact form handler
│       └── health/route.ts         # Service health check
├── lib/
│   └── backend/
│       ├── types.ts                # Backend DTOs & database interfaces
│       ├── validators.ts           # Input sanitization & regex validators
│       ├── waitlist.service.ts     # Business logic & repository handler
│       └── schema.sql              # PostgreSQL DDL migration script
├── src/
│   └── services/
│       └── api/
│           ├── client.ts           # HTTP ApiClient
│           └── landing.api.ts      # Client-side API caller
├── .env.example                    # Environment template
└── BACKEND_INTEGRATION.md          # Backend developer documentation
```

---

## 5. Connecting External Services

- **Resend / Loops**: To send transactional welcome emails, integrate your API key in `lib/backend/waitlist.service.ts`.
- **Slack / Discord**: Set `SLACK_WEBHOOK_URL` in `.env.local` to receive real-time notifications on waitlist signups.
