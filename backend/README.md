# PeerSupport — Booking & Availability System

A real-time booking and availability management system for peer-to-peer mentoring.

## Architecture

- **Backend**: Node.js + Express + Prisma + PostgreSQL
- **Frontend**: React (Next.js 14) + Tailwind CSS
- **Real-time**: Socket.io

### Key Design Decisions

- **Slots are never stored** — they are generated on-demand from availability windows minus existing bookings
- **SELECT FOR UPDATE** — PostgreSQL row-level locking prevents double-booking under concurrency
- **UTC storage** — all datetimes stored in UTC, converted to/from IST at the API boundary
- **Service table** — 6 fixed services seeded in the database (not enum-based)

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL (or Neon serverless)

### Environment Variables

**Backend** (`backend/.env`):

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=8080
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:3000
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
```

**Frontend** (`frontend/.env`):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
```

### Installation

```bash
# Backend
cd backend
npm install
npx prisma db push
npm run db:seed    # Seeds the 6 fixed services
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
cd backend
npm test   # Runs slot generation unit tests (Node.js test runner)
```

## API Endpoints (V2)

All V2 endpoints are prefixed with `/api/v2`.

### Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v2/services` | List all 6 seeded services |

### Mentor (auth + MENTOR role)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v2/mentor/services` | Get mentor's configured services |
| PUT | `/v2/mentor/services` | Upsert service configs |
| GET | `/v2/mentor/availability` | Get availability windows |
| PUT | `/v2/mentor/availability` | Replace availability windows |

### Slots & Bookings (auth required)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v2/mentors/:id/slots?serviceId=&date=` | Generate available slots |
| POST | `/v2/bookings` | Create booking (MENTEE) |
| GET | `/v2/bookings/:id` | Get booking details |
| PATCH | `/v2/bookings/:id/cancel` | Cancel booking (MENTOR) |
| PATCH | `/v2/bookings/:id/reschedule` | Reschedule booking |

### Socket.io Events

**Client → Server:**
- `join-mentor-room(mentorProfileId)` — Join a mentor's room for real-time updates
- `leave-mentor-room(mentorProfileId)` — Leave a mentor's room

**Server → Client (room: `mentor:{mentorId}`):**
- `slot-update` — `{ event: 'slot-update', startTime, endTime, serviceId, action: 'taken'|'released' }`

## Slot Generation Algorithm

```
for each availability window matching the date:
  cursor = window.startTime
  while cursor + duration <= window.endTime:
    slot = [cursor, cursor + duration]
    if slot is >= 15 minutes from now AND
       no existing booking overlaps (startA < endB AND endA > startB):
      → include slot
    cursor += duration + buffer
```

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                # Seeds 6 fixed services
├── src/
│   ├── config/
│   │   ├── database.js        # Prisma client
│   │   └── socket.js          # Socket.io server
│   ├── utils/
│   │   ├── slotGenerator.js   # On-demand slot generation
│   │   ├── conflictGuard.js   # SELECT FOR UPDATE locking
│   │   └── timezoneUtils.js   # IST ↔ UTC conversion
│   ├── validators/
│   │   └── v2.validator.js    # Zod schemas
│   ├── services/v2/           # Business logic
│   ├── controllers/v2/        # Route handlers
│   ├── routes/v2/             # Route definitions
│   └── __tests__/
│       └── slotGenerator.test.js
│
frontend/
├── lib/
│   ├── api.js                 # API client (v2Api)
│   └── useSocket.js           # Socket.io React hook
├── components/
│   ├── mentor/v2/
│   │   ├── ServiceConfigPanel.js
│   │   └── AvailabilityCalendar.js
│   └── mentee/v2/
│       └── MentorBookingPage.js
└── app/
    ├── mentor/availability/   # Mentor dashboard
    └── mentee/book/[id]/      # Mentee booking flow
```
