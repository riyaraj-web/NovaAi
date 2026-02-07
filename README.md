# Nova AI - Personal AI Assistant Platform

A full-stack web application that combines AI capabilities with productivity tools. Users can chat with an AI assistant, manage tasks, notes, calendar events, and track analytics.

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Password**: Bcryptjs
- **Validation**: Zod
- **Language**: TypeScript

### Frontend

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI Components**: Custom components + Radix UI
- **Icons**: Lucide React
- **Language**: TypeScript
- **Build Tool**: Vite

## Project Structure

```
NovaAI/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files (database, env)
│   │   ├── middleware/      # Express middleware (auth, error handling)
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Main server entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── App.tsx          # Main App component
│   │   └── main.tsx         # Entry point
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── .env.example
└── README.md
```

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Password hashing with bcryptjs

### Chat

- Real-time chat with AI assistant
- Message history
- User and assistant message differentiation

### Task Management

- Create, read, update, delete tasks
- Task priority levels (low, medium, high)
- Task categories and due dates
- Task completion tracking

### Notes

- Create colorful notes
- Edit and delete notes
- Organize notes by color

### Calendar

- Schedule events
- Event details (title, description, location, time)
- Color-coded events
- Event management (create, update, delete)

### User Profile

- View and update profile information
- Profile avatar and bio

### Preferences

- Theme selection (light, dark, system)
- Language preferences
- Notification settings
- Timezone configuration

### Analytics

- Track usage statistics
- Monitor chat history
- Task completion metrics
- Overall productivity insights

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (local or cloud instance)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your PostgreSQL connection string and other configs

5. Generate Prisma client:

```bash
npm run prisma:generate
```

6. Run database migrations:

```bash
npm run prisma:migrate
```

7. Start the development server:

```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

4. Update `.env.local` if needed (default is usually fine for local development)

5. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:8080`

## Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Create and apply database migrations
- `npm run prisma:studio` - Open Prisma Studio (database UI)
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Chat

- `GET /api/chat` - Get chat messages
- `POST /api/chat` - Send a message

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Notes

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Calendar Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

### Preferences

- `GET /api/preferences` - Get user preferences
- `PUT /api/preferences` - Update preferences

### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag
- `DELETE /api/tags/:id` - Delete tag

### Notifications

- `GET /api/notifications` - Get notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### Analytics

- `GET /api/analytics` - Get analytics
- `POST /api/analytics/track` - Track event

## Database Schema

The database includes the following models:

- `User` - User account information
- `UserPreferences` - User settings and preferences
- `ChatMessage` - Chat history
- `CalendarEvent` - Calendar events
- `Task` - Tasks and to-dos
- `Note` - Notes and memos
- `Tag` - Tags for organizing items
- `Notification` - User notifications
- `Analytics` - Usage analytics

## Authentication Flow

1. User registers or logs in via the frontend
2. Frontend sends credentials to the backend
3. Backend validates and returns a JWT token
4. Frontend stores the token in localStorage
5. Frontend includes the token in all subsequent API requests
6. Backend validates the token via auth middleware

## Error Handling

- Validation errors return 400 Bad Request
- Authentication errors return 401 Unauthorized
- Not found errors return 404 Not Found
- Server errors return 500 Internal Server Error

All errors include a JSON response with an error message.

## Development Notes

### Adding New Routes

1. Create a new file in `backend/src/routes/`
2. Import `Router` from express and `authMiddleware`
3. Define route handlers
4. Export the router
5. Import and use in `backend/src/index.ts`

### Adding New Components

1. Create a new file in `frontend/src/components/`
2. Use TypeScript and React hooks
3. Import necessary UI components
4. Use Tailwind CSS for styling

### Database Modifications

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:migrate` and give migration a name
3. Prisma client auto-regenerates

## Deployment

### Backend Deployment

1. Set up PostgreSQL on your hosting provider
2. Set environment variables in deployment environment
3. Build: `npm run build`
4. Start: `npm start`

### Frontend Deployment

1. Build: `npm run build`
2. Deploy the `dist` folder to a static hosting service (Vercel, Netlify, etc.)
3. Set the API URL to your backend URL

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.
