# PicksOffice - Sports Betting Picks Platform

A modern sports betting picks and analysis platform built with Next.js and Strapi.

## 🚀 Features

### Security & Authentication
- ✅ JWT authentication with httpOnly cookies
- ✅ OAuth integration (Google, Apple)
- ✅ CORS restricted to specific domains
- ✅ Security headers (CSP, XSS Protection, etc.)
- ✅ Environment variable protection

### User Features
- ✅ User dashboard with statistics
- ✅ Authentication flow (login/register/logout)
- ✅ Stripe payment integration for Telegram bot
- ✅ Responsive design for all devices

### Content Management
- ✅ Sports picks with detailed analysis
- ✅ Blog system for betting insights
- ✅ Search functionality across picks
- ✅ League-based filtering (NBA, NFL, MLB, etc.)
- ✅ Pagination for large datasets

### Performance
- ✅ Server-side caching (5-minute TTL)
- ✅ Static page generation with ISR
- ✅ Service Worker for offline support
- ✅ Optimized database queries

### Developer Experience
- ✅ TypeScript support
- ✅ Jest & React Testing Library
- ✅ ESLint & Prettier configuration
- ✅ Git hooks with Husky
- ✅ Comprehensive test suite

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.0
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Authentication**: Context API with httpOnly cookies
- **Testing**: Jest, React Testing Library

### Backend
- **CMS**: Strapi v5.12.4
- **Database**: PostgreSQL
- **Authentication**: JWT with secure cookies
- **Caching**: In-memory cache service

## 📋 Prerequisites

- Node.js 18.x - 22.x
- PostgreSQL database
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/picksoffice.git
cd picksoffice
```

### 2. Backend Setup

```bash
cd backend

# Copy environment example
cp .env.example .env

# Generate secure secrets
node ../scripts/generate-secrets.js

# Install dependencies
npm install

# Run database migrations
npm run build

# Start development server
npm run develop
```

### 3. Frontend Setup

```bash
cd frontend

# Copy environment example
cp .env.example .env.local

# Install dependencies
npm install

# Run development server
npm run dev
```

### 4. Access the application

- Frontend: http://localhost:3000
- Backend Admin: http://localhost:1337/admin

## 🔐 Security Configuration

### Generate Secure Secrets

Run the provided script to generate secure secrets:

```bash
node scripts/generate-secrets.js
```

This will generate:
- APP_KEYS
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- TRANSFER_TOKEN_SALT
- JWT_SECRET

### Environment Variables

#### Backend (.env)
```env
# Server
HOST=0.0.0.0
PORT=1337

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=your-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password

# Security (use generated values)
APP_KEYS=your-generated-keys
API_TOKEN_SALT=your-generated-salt
ADMIN_JWT_SECRET=your-generated-secret
JWT_SECRET=your-generated-jwt-secret

# Frontend URL
FRONTEND_URL=https://picksoffice.com

# CORS
CORS_ALLOWED_ORIGINS=https://picksoffice.com,https://www.picksoffice.com
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=https://picksoffice.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

## 🧪 Testing

### Run tests
```bash
# Frontend tests
cd frontend
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting and Formatting
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 📦 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

### Deployment Checklist

1. ✅ Generate production secrets
2. ✅ Set NODE_ENV=production
3. ✅ Configure production database
4. ✅ Set up SSL certificates
5. ✅ Configure CDN for static assets
6. ✅ Enable monitoring (optional)
7. ✅ Set up backup strategy

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/picks` - Get paginated picks
- `GET /api/picks/:slug` - Get single pick
- `GET /api/picks/stats` - Get statistics
- `GET /api/blogs` - Get blog posts

### Protected Endpoints
- `POST /api/auth/local` - Login
- `POST /api/auth/local/register` - Register
- `POST /api/auth/logout` - Logout
- `GET /api/users/me` - Get current user

### Pagination & Filtering
```
GET /api/picks?page=1&pageSize=10&league=NBA&search=Lakers
```

## 🏗️ Project Structure

```
picksoffice/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── pick/
│   │   │   ├── blog/
│   │   │   └── test/
│   │   ├── config/
│   │   └── extensions/
│   ├── config/
│   └── public/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── picks/
│   │   │   ├── dashboard/
│   │   │   ├── success/
│   │   │   └── cancel/
│   │   ├── components/
│   │   ├── lib/
│   │   └── hooks/
│   ├── public/
│   └── tests/
└── scripts/
    └── generate-secrets.js
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For support, email support@picksoffice.com or contact via Telegram bot.

## 🔄 Recent Updates

### Security Improvements
- Implemented httpOnly cookie authentication
- Added comprehensive security headers
- Restricted CORS to specific domains
- Generated secure secrets script

### Features Added
- User dashboard with statistics
- Stripe payment pages for Telegram bot
- Search functionality with debouncing
- API pagination
- Performance caching (5-minute TTL)

### Developer Experience
- Jest testing framework
- ESLint & Prettier configuration
- Git hooks with Husky
- TypeScript improvements

---

Built with ❤️ by PicksOffice Team 
