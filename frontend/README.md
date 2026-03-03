# PeerSupport Frontend

A minimal Next.js frontend for the PeerSupport platform.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (Minimal Design)
- Zustand (State Management)
- Zod (Validation)
- Axios (API Client)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Features

- Authentication (Login/Register)
- Google OAuth Integration
- User Profile Management
- Role-based Access (Mentor/Mentee/Admin)
- Minimal, Clean UI
