# Authentication Backend

A complete authentication backend built with Node.js, Express, Prisma, and Passport.js supporting both email/password and Google OAuth authentication.

## Features

- ✅ Email/Password Authentication
- ✅ Google OAuth 2.0 Integration
- ✅ JWT-based Authorization
- ✅ Secure Password Hashing (bcrypt)
- ✅ User Profile Management
- ✅ Password Change Functionality
- ✅ PostgreSQL Database with Prisma ORM
- ✅ Session Management

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Google OAuth credentials (for Google authentication)

## Installation

1. **Clone and navigate to the project:**
   ```bash
   cd auth-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: Strong secret for JWT tokens
   - `SESSION_SECRET`: Secret for session management
   - `GOOGLE_CLIENT_ID`: From Google Cloud Console
   - `GOOGLE_CLIENT_SECRET`: From Google Cloud Console
   - `FRONTEND_URL`: Your frontend application URL

4. **Set up Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (development)
     - Your production callback URL

5. **Set up database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

## Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Public Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Google OAuth
```http
GET /api/auth/google
```
Redirects to Google sign-in page.

### Protected Endpoints (Require JWT Token)

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get Profile (Role-based)
```http
GET /api/users/me
```
Returns user info and role-specific profile (mentee, mentor, or admin profile).

#### Update Profile (Role-based)
```http
PUT /api/users/me
Content-Type: application/json

{
  "bio": "Updated bio",
  "skills": ["JavaScript", "React"],
  ... (other role-specific fields)
}
```

#### Change Password
```http
POST /api/auth/change-password
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### Logout
```http
POST /api/auth/logout
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": { ... },
    "token": "jwt-token"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

## Database Schema

### User Model
```prisma
model User {
  id             String    @id @default(uuid())
  email          String    @unique
  password       String?
  name           String?
  googleId       String?   @unique
  provider       String    @default("local")
  profilePicture String?
  isVerified     Boolean   @default(false)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Tokens**: Secure token-based authentication
- **CORS Protection**: Configured for specific origins
- **Session Security**: HTTP-only cookies in production
- **Input Validation**: Email and password validation
- **Password Requirements**: Minimum 6 characters

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | Secret key for JWT tokens | Yes |
| JWT_EXPIRES_IN | Token expiration time (e.g., "7d") | No |
| SESSION_SECRET | Secret for session management | Yes |
| GOOGLE_CLIENT_ID | Google OAuth client ID | Yes* |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | Yes* |
| GOOGLE_CALLBACK_URL | OAuth callback URL | Yes* |
| PORT | Server port (default: 5000) | No |
| NODE_ENV | Environment (development/production) | No |
| FRONTEND_URL | Frontend URL for CORS | Yes |

*Required only if using Google OAuth

## Project Structure

```
auth-backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   ├── database.js        # Database connection
│   │   └── passport.js        # Passport strategies
│   ├── controllers/
│   │   └── AuthController.js  # Auth endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── routes/
│   │   └── auth.js            # Auth routes
│   ├── services/
│   │   └── AuthService.js     # Business logic
│   └── server.js              # Express app
├── .env.example               # Environment template
├── package.json
└── README.md
```

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### Google OAuth Errors
- Verify credentials in Google Cloud Console
- Check authorized redirect URIs
- Ensure GOOGLE_CALLBACK_URL matches

### JWT Token Issues
- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure proper Authorization header format

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
