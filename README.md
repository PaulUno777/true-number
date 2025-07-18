# TrueNumber Game

A modern full-stack web application built with Next.js, NestJS, and TypeScript.

## Features

### Frontend (Next.js 15.4.1)

- Modern UI with Tailwind CSS v4
- Internationalization (English/French)
- Dark/Light theme support
- Fully responsive design
- Gamification with animations and confetti
- Real-time updates with React Query
- TypeScript for type safety

### Backend (NestJS)

- JWT Authentication with refresh tokens
- Internationalization support
- Pagination with custom service
- Swagger API documentation
- MongoDB with Prisma ORM
- Role-based access control
- Validation with class-validator

### Game Features

- Random number generation (0-100)
- Points system (+50 for win, -35 for loss)
- Statistics tracking
- Game history with pagination
- Admin dashboard
- User management

## Tech Stack

### Frontend

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form
- Zod validation
- React Query
- next-intl
- Lucide React icons

### Backend

- NestJS
- TypeScript
- Prisma ORM
- MongoDB
- Passport.js
- JWT
- Swagger
- class-validator
- nestjs-i18n

## Installation

### Prerequisites

- Node.js 18+
- MongoDB (cluster setup for prisma)

### Backend Setup

1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
DATABASE_URL="mongodb://localhost:27017/truenumber"
JWT_SECRET=your-jwt-secret-here
JWT_REFRESH_SECRET=your-refresh-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
PORT=8000
```

4. Generate Prisma client and push schema

```bash
yarn prisma generate
yarn prisma db push
```

5. Start the development server

```bash
yarn start:dev
```

### Frontend Setup

1. Navigate to frontend directory

```bash
cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Start the development server

```bash
npm run dev
```

## Development

### Code Structure

```
frontend/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── game/             # Game-related components
│   ├── admin/            # Admin components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── messages/             # i18n messages
└── middleware.ts         # Next.js middleware

backend/
├── src/
│   ├── auth/             # Authentication module
│   ├── users/            # Users module
│   ├── game/             # Game logic module
│   ├── prisma/           # Database service
│   ├── generated/        # Generated file
│   └── i18n/             # Internationalization files
├── prisma/               # Database schema
└── test/                 # Test files
```

## Deployment

### Backend Deployment

- Can be deployed to any Node.js hosting service
- Configure environment variables
- Ensure MongoDB is accessible

### Frontend Deployment

- Deploy to Vercel, Netlify, or any static hosting
- Set up environment variables
- Configure domain for API calls

## License

This project is licensed under the MIT License.
