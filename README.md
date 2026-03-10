# PeerSupport - Mentorship Platform

A full-stack mentorship platform built with Next.js, Express.js, Prisma, and PostgreSQL. Connects mentors and mentees for personalized guidance and career development.

## 🏗️ Architecture

### Frontend (Next.js 15 + TypeScript)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom dark theme
- **State Management**: Zustand (authStore, mentorStore, adminStore)
- **Validation**: Zod v4
- **HTTP Client**: Axios with interceptors
- **Notifications**: Sonner (toast notifications)
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend (Express.js + Prisma)
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with httpOnly cookies
- **Payments**: Razorpay integration
- **Email**: Nodemailer
- **Validation**: Zod

---

## 📱 Features by Role

### 🎓 Mentee Features
- Browse and search mentors by expertise
- Book sessions (video/audio/chat)
- Profile management with education and CAT scores
- Resume uploads
- Session history and ratings

### 👨‍🏫 Mentor Features
- **Dashboard**: Stats overview, upcoming sessions, earnings
- **Inbox**: Notifications and session reminders
- **Calendar**: Monthly view with booking management
- **Availability & Pricing**: 
  - Day/week-wise slot management
  - Dynamic pricing per session
  - Toggle availability
  - Free session option
- **Payouts**: 
  - Earnings dashboard
  - Transaction history
  - Withdrawal requests (Bank/UPI)
  - Pending earnings tracking
- **Profile**: 
  - Bio, headline, expertise tags
  - Education and work experience
  - Social links
  - Certifications
  - CAT score display
- **Help Center**: FAQ accordion with support contact

### 👔 Admin Features
- **Dashboard**: Platform statistics and quick actions
- **User Management**:
  - List all users with search and filters (role, status)
  - Verify users
  - Activate/deactivate accounts
  - Delete users
  - Role-based filtering
  - Pagination support
- **Mentor Applications**:
  - Review pending applications
  - View detailed application info
  - Approve applications (converts user to MENTOR)
  - Reject with reason
  - Filter by status (PENDING/APPROVED/REJECTED)
- **Settings**: Platform configuration (placeholder)

---

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin sidebar layout with auth guard
│   │   │   ├── dashboard/page.tsx  # Stats overview
│   │   │   ├── users/page.tsx      # User management table
│   │   │   ├── applications/page.tsx # Mentor application review
│   │   │   └── settings/page.tsx   # Platform settings
│   │   ├── mentor/
│   │   │   ├── layout.tsx          # Mentor sidebar layout
│   │   │   ├── dashboard/page.tsx  # Mentor stats & sessions
│   │   │   ├── inbox/page.tsx      # Notifications & upcoming
│   │   │   ├── calendar/page.tsx   # Monthly calendar view
│   │   │   ├── availability/page.tsx # Slot & pricing management
│   │   │   ├── payouts/page.tsx    # Earnings & withdrawals
│   │   │   ├── help/page.tsx       # FAQ & support
│   │   │   └── profile/page.tsx    # Profile editing
│   │   ├── login/page.tsx          # Login with Google OAuth
│   │   ├── register/page.tsx       # Registration
│   │   ├── onboarding/page.tsx     # Role selection (Mentee/Mentor)
│   │   ├── apply-mentor/page.tsx   # 7-step mentor application
│   │   ├── application-status/page.tsx # Application status view
│   │   └── page.tsx                # Home with role-based redirect
│   ├── lib/
│   │   ├── api.ts                  # Axios instance with interceptors
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── utils.ts                # cn() helper
│   │   └── validators/
│   │       ├── auth.ts             # Login/register schemas
│   │       └── mentor.ts           # Mentor application schemas
│   ├── stores/
│   │   ├── authStore.ts            # Auth & user state
│   │   ├── mentorStore.ts          # Mentor operations
│   │   └── adminStore.ts           # Admin operations
│   └── app/globals.css             # Dark theme + Tailwind

backend/
├── src/
│   ├── controllers/
│   │   ├── AuthController.js       # Login, register, OAuth
│   │   ├── UserController.js       # User & profile CRUD
│   │   ├── MentorController.js     # Slots, bookings, dashboard
│   │   ├── MenteeController.js     # Mentee operations
│   │   └── PaymentController.js    # Razorpay integration
│   ├── services/                   # Business logic
│   ├── routes/                     # API routes
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   └── auth.middleware.js      # Role authorization
│   ├── validators/                 # Zod schemas
│   └── utils/
│       ├── apiError.js
│       └── apiResponse.js
└── prisma/
    └── schema.prisma               # Database schema
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout (clear httpOnly cookie)
- `GET /api/auth/google` - Google OAuth redirect
- `GET /api/auth/google/callback` - OAuth callback

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (admin)
- `PATCH /api/users/:id/status` - Toggle user status (admin)
- `PATCH /api/users/:id/verify` - Verify user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Mentor Applications
- `POST /api/users/mentor-applications` - Submit application
- `GET /api/users/mentor-applications/my` - Get own application
- `GET /api/users/mentor-applications` - Get all applications (admin)
- `PATCH /api/users/mentor-applications/:id/approve` - Approve (admin)
- `PATCH /api/users/mentor-applications/:id/reject` - Reject (admin)

### Mentor Operations
- `GET /api/mentor/dashboard` - Dashboard stats
- `POST /api/mentor/slots` - Create time slots
- `GET /api/mentor/slots` - Get slots
- `PATCH /api/mentor/slots/:id` - Update slot
- `DELETE /api/mentor/slots/:id` - Delete slot
- `GET /api/mentor/bookings` - Get bookings
- `PATCH /api/mentor/bookings/:id/complete` - Mark completed
- `PATCH /api/mentor/bookings/:id/cancel` - Cancel booking
- `GET /api/mentor/earnings` - Earnings history
- `GET /api/mentor/transactions` - Transaction history
- `GET /api/mentor/withdrawals` - Withdrawal history
- `POST /api/mentor/withdrawals` - Request withdrawal
- `GET /api/mentor/incentives` - Get incentives
- `PATCH /api/mentor/incentives/:id/claim` - Claim incentive

### Profiles
- `POST /api/users/profile/mentor` - Create/update mentor profile
- `GET /api/users/profile/mentor` - Get mentor profile
- `POST /api/users/profile/mentee` - Create/update mentee profile
- `GET /api/users/profile/mentee` - Get mentee profile

---

## 🎨 Design System

### Color Palette (Dark Theme)
```css
--background: #09090b      /* Main background */
--foreground: #fafafa      /* Text color */
--card: #18181b            /* Card background */
--primary: #6d28d9         /* Purple accent */
--secondary: #27272a       /* Secondary elements */
--border: #27272a          /* Border color */
--muted-foreground: #a1a1aa /* Subtle text */
```

### Components
- **Cards**: Rounded-xl borders with hover states
- **Buttons**: Primary (purple), secondary, and danger variants
- **Forms**: Dark inputs with focus rings
- **Tables**: Striped rows with hover effects
- **Modals**: Backdrop blur with centered cards
- **Toasts**: Sonner with rich colors (top-right position)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd PeerSupport
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Configure database URL and secrets in .env
npx prisma migrate dev
npx prisma db seed  # Optional: seed with test data
npm run dev  # Runs on port 8080
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev  # Runs on port 3000
```

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/peersupport"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## 🗄️ Database Schema

### Core Models
- **User** - Base user with role (ADMIN/MENTOR/MENTEE)
- **MentorProfile** - Mentor details, pricing, earnings, availability
- **MenteeProfile** - Mentee profile with education and goals
- **AdminProfile** - Admin metadata
- **MentorApplication** - 7-step application with status
- **Slot** - Time slots with status (AVAILABLE/BOOKED)
- **Booking** - Session bookings with mentor/mentee
- **Earnings** - Mentor earnings per session
- **Transaction** - Financial transactions
- **Withdrawal** - Payout requests
- **Incentive** - Platform incentives
- **Notification** - User notifications
- **MentorResume** - Mentor resume uploads
- **MenteeResume** - Mentee resume uploads

### Enums
- **Role**: ADMIN, MENTOR, MENTEE
- **ApplicationStatus**: PENDING, APPROVED, REJECTED
- **SlotStatus**: AVAILABLE, BOOKED, CANCELLED
- **BookingStatus**: PENDING, CONFIRMED, COMPLETED, CANCELLED
- **SessionMode**: VIDEO, AUDIO, CHAT
- **TransactionType**: EARNING, WITHDRAWAL, PAYOUT, REFUND, INCENTIVE, PLATFORM_FEE
- **TransactionStatus**: PENDING, COMPLETED, FAILED, CANCELLED

---

## 🔐 Authentication Flow

1. User registers with email/password or Google OAuth
2. JWT token stored in httpOnly cookie (secure, XSS protection)
3. Axios interceptor attaches cookie to all requests
4. Backend middleware verifies JWT and injects `req.user`
5. Role-based guards protect routes (ADMIN, MENTOR, MENTEE)
6. 401 errors trigger automatic redirect to /login

---

## 🧪 Testing Accounts

After seeding the database:
- **Admin**: admin@peersupport.com / password123
- **Mentor**: mentor@peersupport.com / password123
- **Mentee**: mentee@peersupport.com / password123

---

## 📊 Key Features Implementation

### Mentor Application (7 Steps)
1. Personal Details (bio, headline, location, social links)
2. Expertise (tag selection + custom tags)
3. Education (10th, 12th, bachelors, masters)
4. Work Experience (dynamic add/remove)
5. CAT Score (score, year, percentile)
6. Certifications (list of certifications)
7. Resumes & Pricing (upload + set session price)

### Availability Management
- Select day of week
- Set start/end time (hour:minute)
- Create recurring slots
- Delete available slots (booked slots locked)
- Visual slot status: AVAILABLE (green), BOOKED (blue)

### Payout System
- Earnings automatically credited after session completion
- Pending clearance period (2-3 days)
- Withdraw to bank account or UPI
- Transaction history with filters
- Platform fee deduction

### Admin Application Review
- View all applications with pagination
- Filter by status (PENDING/APPROVED/REJECTED)
- Approve: Creates MentorProfile, updates user role to MENTOR
- Reject: Stores rejection reason, user can reapply

---

## 🔧 Development

### Build for Production
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
npm run build
npm start
```

### Type Safety
- All API responses typed with TypeScript interfaces
- Zod schemas validate requests/responses
- Prisma generates type-safe database client

### Code Quality
- ESLint configured
- Tailwind CSS IntelliSense
- Consistent code formatting

---

## 📦 Dependencies

### Frontend
- next: 16.1.6
- react: 19.x
- zustand: State management
- zod: 4.3.6 (validation)
- axios: HTTP client
- sonner: Toast notifications
- lucide-react: Icons
- date-fns: Date formatting
- tailwindcss: 4.x

### Backend
- express: Web framework
- @prisma/client: Database ORM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- passport: OAuth strategies
- razorpay: Payment gateway
- nodemailer: Email sending
- zod: Request validation

---

## 🎯 Future Enhancements

- [ ] Mentee dashboard and booking flow
- [ ] Real-time chat with Socket.io
- [ ] Video call integration (Agora/WebRTC)
- [ ] Advanced analytics dashboard
- [ ] Email notification preferences
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-powered mentor recommendations
- [ ] Group sessions/webinars
- [ ] Subscription plans

---

## 📄 License

MIT License - feel free to use this project for learning or production.

---

## 👥 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

## 📞 Support

For questions or issues:
- Email: support@peersupport.com
- GitHub Issues: [Create an issue]
- Documentation: [Wiki]

---

**Built with ❤️ for the mentorship community**
