# PeerSupport Frontend

A minimal Next.js frontend with a black and white theme to test all PeerSupport backend API routes.

## Features

- **Authentication**: Login, Register, JWT token management
- **Posts**: Create, view, update, and delete posts
- **Comments**: Add, edit, and delete comments on posts
- **User Profile**: View and update user profile
- **Notifications**: View and manage notifications
- **Admin Panel**: Create reports, manage users, and moderate content
- **Clean UI**: Minimalist black and white theme with proper spacing

## Getting Started

### Prerequisites

- Node.js 16+ installed
- Backend server running on `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/` - Home page with API health check
- `/login` - Login page
- `/register` - Registration page
- `/posts` - View all posts and create new ones
- `/posts/[id]` - View individual post with comments
- `/profile` - User profile page
- `/notifications` - Notifications page
- `/admin` - Admin panel (for admins/moderators only)

## API Configuration

The frontend connects to the backend at `http://localhost:8080/api` by default. 

To change this, edit the `API_URL` constant in `lib/api.js`.

## Testing Routes

### Authentication Routes
- Register a new account at `/register`
- Login with credentials at `/login`
- Logout using navigation button

### Post Routes
- View all posts at `/posts`
- Create post (requires authentication)
- Click post title to view details
- Delete your own posts

### Comment Routes
- View comments on post detail page
- Add comments (requires authentication)
- Delete your own comments

### User Routes
- View your profile at `/profile`
- Edit profile information

### Notification Routes
- View notifications at `/notifications`
- Mark notifications as read
- Mark all as read

### Admin Routes
- Access admin panel at `/admin` (requires ADMIN or MODERATOR role)
- Create reports for posts/comments/users
- View and resolve reports
- View all users
- Ban users

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **Pure CSS** - No external CSS frameworks for minimal footprint
