# NovaAI Backend

Express.js TypeScript backend for NovaAI personal assistant application.

## Features

- User authentication with JWT
- Chat message management
- Calendar event management
- Task management
- Notes and tags
- Notifications system
- User preferences
- Analytics tracking
- Prisma ORM with PostgreSQL

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment:
```bash
cp .env.example .env
# Edit .env with your database URL and secret
```

3. Setup database:
```bash
npm run prisma:migrate
npm run prisma:generate
```

### Development

```bash
npm run dev
```

Server runs on `http://localhost:3001`

### Build

```bash
npm run build
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Chat
- `GET /api/chat` - Get chat messages
- `POST /api/chat` - Create message

### Events
- `GET /api/events` - Get events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Tasks
- `GET /api/tasks` - Get tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Notes
- `GET /api/notes` - Get notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Tags
- `GET /api/tags` - Get tags
- `POST /api/tags` - Create tag
- `DELETE /api/tags/:id` - Delete tag

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### Preferences
- `GET /api/preferences` - Get preferences
- `PUT /api/preferences` - Update preferences

### Analytics
- `GET /api/analytics` - Get analytics
- `POST /api/analytics/track` - Track event

## Database

Uses Prisma with PostgreSQL. Schema includes:
- Users
- Chat Messages
- Calendar Events
- Tasks
- Notes
- Tags
- Notifications
- User Preferences
- Analytics
